"""L'image de départ envoyée à AI Horde : la photo du lac déjà posée dans les six encres, zone par zone, pour que le
générateur parte des bonnes couleurs et des bonnes masses et n'ait qu'à graver.
    python3 guide.py <photo> <labels.png> <sortie.png> [largeur hauteur]
Sortie par défaut 1024 × 576 (multiples de 64 pour Horde)."""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi
from encres import *
import regions

rng = np.random.default_rng(7)
import os
DOUX = float(os.environ.get('GUIDE_DOUX', '1'))   # > 1 : des masses plus larges, moins de grain


def par_quantiles(L, m, encres, qs):
    """Dans la zone m, les pixels se répartissent entre les encres selon les quantiles de clarté qs (du sombre au clair)."""
    out = np.full(L.shape, encres[0], int)
    v = L[m]
    seuils = np.percentile(v, qs)
    for k, s in enumerate(seuils):
        out[m & (L > s)] = encres[k + 1]
    return out


def peindre(photo, lab, efface=None):
    a = np.asarray(photo).astype(float)
    L = lum(a)
    Ls = ndi.gaussian_filter(L, 2.0 * DOUX)
    Lb = ndi.gaussian_filter(L, 6.0 * DOUX)
    Z = regions.Z
    carte = np.full(L.shape, C, int)
    # ciel : crème
    # crête du fond : brique
    carte[lab == Z['crete']] = B
    # collines : sang de bœuf, les arbres sombres en brun noir, les cimes au soleil en brique
    m = lab == Z['collines']
    rel = Ls - Lb                    # le relief local : une cime claire, un creux sombre
    carte[m] = S
    carte[m & (rel < -9)] = N
    carte[m & (Ls < np.percentile(Ls[m], 22))] = N
    carte[m & (rel > 10) & (Ls > np.percentile(Ls[m], 45))] = B
    # eau : brun noir, les reflets en sang de bœuf
    m = lab == Z['eau']
    carte[m] = N
    carte[m & (Ls > np.percentile(Ls[m], 70))] = S
    # buissons : brique, ombres en sang de bœuf et brun noir, feuilles au soleil en ocre, fleurs blanches en crème
    m = lab == Z['buissons']
    Lv = ndi.gaussian_filter(L, 3.5 * DOUX)
    carte[m] = par_quantiles(Lv, m, [N, S, B, O], [18, 42, 72])[m]
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    yy = np.arange(L.shape[0])[:, None]
    eau_vue = m & (yy > 262) & (yy < 420) & (b >= r - 2) & (g - b < 14) & (a.mean(-1) > 90)
    eau_vue = ndi.binary_opening(eau_vue, np.ones((2, 2)))
    carte[eau_vue] = N
    blanc = m & ~eau_vue & (yy > 380) & (a.min(-1) > 175) & (np.ptp(a, -1) < 45)
    carte[ndi.binary_dilation(blanc, iterations=1)] = C
    # sentier : ocre, cailloux crème, creux brique
    m = lab == Z['sentier']
    carte[m] = par_quantiles(Ls, m, [S, B, O, C], [8, 25, 80])[m]
    # le mât : crème, ombré d'ocre sur son côté droit ; le pied, en bois gris, en ocre
    m = lab == Z['mat']
    carte[m] = C
    carte[m & (np.arange(L.shape[0])[:, None] > 380)] = O
    # là où les enfants sont effacés : la couleur de fond du sentier ou du buisson, sans forme
    if efface is not None:
        carte[efface & (lab == Z['sentier'])] = O
        carte[efface & (lab == Z['buissons'])] = B
    # aplats francs partout ailleurs
    fige = lab == Z['mat']
    im = Image.fromarray(carte.astype(np.uint8) * 40).filter(ImageFilter.ModeFilter(int(7 * DOUX) | 1))
    lisse = np.asarray(im).astype(int) // 40
    carte = np.where(fige, carte, lisse)
    carte[lab == Z['ciel']] = C
    return carte


def entailles_eau(img, lab, echelle):
    """Des entailles de gouge horizontales dans l'eau : des fuseaux clairs, plus serrés près de la rive."""
    d = ImageDraw.Draw(img)
    m = lab == regions.Z['eau']
    ys, xs = np.nonzero(m)
    y0, y1 = ys.min(), ys.max()
    for _ in range(int(260 * echelle)):
        y = y0 + (y1 - y0) * rng.random() ** 1.6
        x = rng.uniform(0, lab.shape[1])
        long_ = rng.uniform(18, 70) * echelle
        ep = rng.uniform(1.2, 2.6) * echelle
        yi, xi = int(y), int(np.clip(x, 0, lab.shape[1] - 1))
        if not m[yi, xi]:
            continue
        coul = CREME if rng.random() < 0.35 else BRIQUE
        pts = []
        for t in np.linspace(0, 1, 12):
            pts.append((x - long_ / 2 + long_ * t, y - ep * np.sin(np.pi * t)))
        for t in np.linspace(1, 0, 12):
            pts.append((x - long_ / 2 + long_ * t, y + ep * np.sin(np.pi * t) * 0.6))
        d.polygon(pts, fill=coul)


def guide(photo_path, labels_path, taille=(1024, 576), efface=None):
    photo = Image.open(photo_path).convert('RGB')
    lab = np.asarray(Image.open(labels_path)).astype(int)
    carte = peindre(photo, lab, efface)
    img = Image.fromarray(carte_vers_rgb(carte))
    # on remet l'eau hors des zones d'eau (les entailles débordent) en ne gardant que leur partie dans l'eau
    eau = Image.fromarray(((lab == regions.Z['eau']) * 255).astype(np.uint8))
    tmp = img.copy()
    entailles_eau(tmp, lab, 1.0)
    img.paste(tmp, (0, 0), eau)
    # le drapeau, dessiné
    poser_drapeau(img, regions.DRAPEAU, fond=BRIQUE, vague=0.04, bord=0.03)
    # les enfants, dessinés en aplats (sauf si on les a effacés : ils viendront après la gravure)
    if efface is None:
        dessiner_enfants(img, img.size[0] / PHOTO[0])
    return img.resize(taille, Image.LANCZOS), img


if __name__ == '__main__':
    taille = (int(sys.argv[4]), int(sys.argv[5])) if len(sys.argv) > 5 else (1024, 576)
    ef = os.environ.get('GUIDE_EFFACE')
    ef = np.asarray(Image.open(ef)) > 127 if ef else None
    petit, grand = guide(sys.argv[1], sys.argv[2], taille, ef)
    petit.save(sys.argv[3])
    grand.save(sys.argv[3].replace('.png', '-photo.png'))
    print(sys.argv[3], petit.size)
