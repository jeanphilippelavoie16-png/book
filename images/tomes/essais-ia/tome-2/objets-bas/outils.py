"""Outils communs : détourer un objet généré sur fond uni, le ramener aux encres de l'image."""
import numpy as np
from PIL import Image
from scipy import ndimage
from skimage.color import rgb2lab

CREME = (238, 224, 203); OCRE = (205, 142, 70); ORANGE = (240, 122, 30); MOYEN = (128, 52, 38)
MUR = (96, 28, 22); FONCE = (45, 12, 10); CERNE = (30, 7, 6)

def charger(path, larg=None, crop=None):
    im = Image.open(path).convert('RGB')
    if crop: im = im.crop(crop)
    if larg:
        im = im.resize((larg, round(im.height * larg / im.width)), Image.LANCZOS)
    return np.asarray(im).astype(float)

def fond(a):
    b = np.concatenate([a[:4].reshape(-1, 3), a[-4:].reshape(-1, 3), a[:, :4].reshape(-1, 3), a[:, -4:].reshape(-1, 3)])
    return np.median(b, 0)

def masque(a, seuil=38, ombre=True, lisse=1.5, trou=400, rougeur=0.45):
    """Le fond uni (et l'ombre rouge foncé que le générateur pose dessous), relié au bord, s'enlève."""
    bg = fond(a)
    d = np.linalg.norm(a - bg, axis=2)
    cand = d < seuil
    if ombre:
        # l'ombre : même teinte que le fond, plus foncée (rouge dominant, vert et bleu proches)
        r, g, b = a[..., 0], a[..., 1], a[..., 2]
        rouge = (r - np.maximum(g, b) > rougeur * (bg[0] - max(bg[1], bg[2]))) & (np.abs(g - b) < 22) & (r <= bg[0] + 12)
        cand |= rouge
    lab, n = ndimage.label(cand)
    bords = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    bords = bords[bords > 0]
    fondm = np.isin(lab, bords)
    # les creux fermés (sous une anse, entre deux bûches) qui ont la couleur du fond s'enlèvent aussi
    strict, n2 = ndimage.label(d < seuil * 0.8)
    if n2:
        t = ndimage.sum(np.ones_like(d), strict, range(1, n2 + 1))
        fondm |= np.isin(strict, [i + 1 for i, v in enumerate(t) if v > trou])
    obj = ~fondm
    if lisse:
        obj = ndimage.gaussian_filter(obj.astype(float), lisse) > 0.5
    # garder le plus gros morceau et ceux qui sont gros
    lab, n = ndimage.label(obj)
    if n > 1:
        tailles = ndimage.sum(obj, lab, range(1, n + 1))
        garde = [i + 1 for i, t in enumerate(tailles) if t > 0.02 * tailles.max()]
        obj = np.isin(lab, garde)
    return obj

def encres(a, encres, poids=None, mode=2):
    """Chaque point prend l'encre la plus proche (en Lab) ; un filtre de mode enlève les grains isolés."""
    L = rgb2lab(a / 255.0)
    P = np.array(encres, float)
    PL = rgb2lab(P[None] / 255.0)[0]
    d = ((L[..., None, :] - PL[None, None]) ** 2)
    d = d[..., 0] * 1.0 + d[..., 1] + d[..., 2]
    if poids is not None:
        d = d + np.array(poids)[None, None]
    idx = d.argmin(-1)
    for _ in range(mode):
        # filtre de mode 3×3
        best = np.zeros_like(idx); bestc = np.zeros(idx.shape, int)
        for k in range(len(encres)):
            c = ndimage.uniform_filter((idx == k).astype(float), 3) 
            m = c > bestc
            best[m] = k; bestc = np.where(m, c, bestc)
        idx = best
    return P[idx], idx

def cerne(obj, larg):
    """Le cerne autour de la silhouette : la silhouette grossie de larg points."""
    return ndimage.binary_dilation(obj, iterations=max(1, int(round(larg))))

def rgba(rgb, obj):
    out = np.zeros(rgb.shape[:2] + (4,), np.uint8)
    out[..., :3] = np.clip(rgb, 0, 255).astype(np.uint8)
    out[..., 3] = obj.astype(np.uint8) * 255
    return Image.fromarray(out, 'RGBA')

def boite(obj):
    ys, xs = np.where(obj)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1

def clarte(a):
    return rgb2lab(a / 255.0)[..., 0]

def paliers(a, seuils, encres_, mode=2, flou=0.0):
    """Chaque point prend une encre selon sa clarté L* : seuils croissants, une encre de plus que de seuils."""
    L = clarte(a)
    if flou: L = ndimage.gaussian_filter(L, flou)
    idx = np.digitize(L, seuils)
    for _ in range(mode):
        best = np.zeros_like(idx); bestc = np.zeros(idx.shape, float)
        for k in range(len(encres_)):
            c = ndimage.uniform_filter((idx == k).astype(float), 3)
            m = c > bestc
            best[m] = k; bestc = np.where(m, c, bestc)
        idx = best
    return np.array(encres_, float)[idx], idx

def histo(a, obj):
    L = clarte(a)[obj]
    return np.percentile(L, [2, 10, 25, 40, 50, 60, 75, 90, 98]).round(1)
