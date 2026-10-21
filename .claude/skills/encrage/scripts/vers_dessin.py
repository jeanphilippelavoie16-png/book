"""vers_dessin.py — d'un décalque (masques) au « dessin » que l'encreur repasse."""
import numpy as np, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.join(HERE, '..', '..', 'dessin-notice', 'scripts'))
from skimage import measure
from skimage.morphology import skeletonize
from scipy.ndimage import gaussian_filter1d
from encrer import Dessin, Trait, Aplat, reech
from decalque import chemins_squelette

def adoucir(P, sigma, ferme=False):
    if len(P) < 5 or sigma <= 0: return P
    mode = 'wrap' if ferme else 'nearest'
    Q = np.stack([gaussian_filter1d(P[:, 0], sigma, mode=mode), gaussian_filter1d(P[:, 1], sigma, mode=mode)], 1)
    if not ferme: Q[0] = P[0]; Q[-1] = P[-1]
    return Q

def traits_de(masque, ech, ergot_px, sigma=1.6, role='interieur'):
    out = []
    for c in chemins_squelette(skeletonize(masque), long_min=6):
        if np.sum(np.linalg.norm(np.diff(c, axis=0), axis=1)) < ergot_px: continue
        P = np.stack([c[:, 1], c[:, 0]], 1)*ech
        ferme = len(P) > 12 and np.linalg.norm(P[0] - P[-1]) < 1.5
        P = reech(P, 0.5, ferme)
        out.append(Trait(adoucir(P, sigma/0.5, ferme), role, ferme))
    return out

def aplats_de(masque, ech, couleur, contour=True, aire_min=40, sigma=1.8):
    out = []
    for c in measure.find_contours(np.pad(masque.astype(float), 1), 0.5):
        if len(c) < 20: continue
        P = np.stack([c[:, 1] - 1, c[:, 0] - 1], 1)*ech
        if abs(np.sum(P[:-1, 0]*P[1:, 1] - P[1:, 0]*P[:-1, 1]))/2 < aire_min: continue
        P = reech(P, 0.5, True)
        out.append(Aplat(adoucir(P, sigma/0.5, True), couleur, contour))
    return out
