"""Tome 2 : la candidate 11 du troisième tour retouchée (JP, 18 octobre 2026 : « la 11 »), dans l'esprit de ce qu'il a
demandé aux tomes 4 et 5 (moins l'air IA). Ce qui faisait IA : un halo orange flou sur le mur autour du poêle, des
points qui flottent au bout des vapeurs, des griffonnages qui imitent une écriture sur le mortier et le pilon, des
mouchetures sur le flanc de la bouilloire. Le reste ne bouge pas.
    python3 retouche_soin.py SOURCE SORTIE
Les coordonnées sont celles de l'image 768 × 960 ; elles se multiplient par K (4 sur l'image agrandie)."""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
K = im.width / 768
a = np.asarray(im).astype(int)
H, W = a.shape[:2]
yy, xx = np.mgrid[0:H, 0:W] / K
PAPIER = np.median(a[int(100 * K):int(300 * K), int(100 * K):int(600 * K)].reshape(-1, 3), 0)
R_, G_, B_ = a[:, :, 0], a[:, :, 1], a[:, :, 2]
L = a.mean(2)
def boite(x0, y0, x1, y1):
    return (xx >= x0) & (xx < x1) & (yy >= y0) & (yy < y1)

# 1. le halo : le mur reprend son papier, sauf dans le foyer
foyer = boite(545, 640, 695, 765)
# on retire la teinte (la basse fréquence) et on garde le grain du papier : le mur clair, loin des objets, des vapeurs
# et du bassin, reprend la couleur du papier sans raccord visible
mur = (L > 185) & ~foyer & boite(0, 380, 768, 880)
for b in ((640, 395, 730, 545), (280, 520, 350, 640)):          # les vapeurs : leurs traits seulement, élargis
    mur &= ~ndimage.binary_dilation(boite(*b) & (L < 232), iterations=int(5 * K))
bassin = boite(232, 622, 388, 702) & (L < 150)                    # l'intérieur du bassin garde sa teinte
mur &= ~ndimage.binary_dilation(ndimage.binary_fill_holes(ndimage.binary_closing(bassin, iterations=int(2 * K))), iterations=int(2 * K))
m = mur.astype(float)
sig = 7 * K
poids = ndimage.gaussian_filter(m, sig)
for c in range(3):
    bas = ndimage.gaussian_filter(a[:, :, c] * m, sig) / np.maximum(poids, 1e-3)
    a[:, :, c] = np.where(mur, np.clip(a[:, :, c] - bas + PAPIER[c], 0, 255), a[:, :, c])
R_, G_, B_ = a[:, :, 0], a[:, :, 1], a[:, :, 2]; L = a.mean(2)
halo = (R_ > 215) & (R_ - B_ > 34) & (L > 185) & ~foyer & boite(425, 560, 768, 880)      # ce qui reste, pas les vapeurs
a[halo] = PAPIER

# 2. les points qui flottent au bout des vapeurs : les petites taches isolées au-dessus des volutes
for x0, y0, x1, y1 in ((655, 405, 720, 470), (285, 530, 345, 576)):
    z = boite(x0, y0, x1, y1) & (np.abs(a - PAPIER).sum(2) > 40)
    lab, n = ndimage.label(z)
    tailles = ndimage.sum(z, lab, range(1, n + 1))
    for i, t in enumerate(tailles, 1):
        if t < 40 * K * K:
            a[ndimage.binary_dilation(lab == i, iterations=max(1, int(K)))] = PAPIER

# 3. les griffonnages du mortier et du pilon, les mouchetures et la fausse étiquette de la bouilloire : chaque boîte
#    est prise à l'intérieur de l'objet, qui reprend sa couleur pleine
for x0, y0, x1, y1 in ((186, 666, 210, 688),          # le griffonnage du mortier, à droite
                       (199, 616, 214, 636),          # les traits croisés du pilon
                       (576, 542, 596, 575),          # les mouchetures de la bouilloire
                       (599, 554, 627, 562)):         # la fausse étiquette
    z = boite(x0, y0, x1, y1) & (np.abs(a - PAPIER).sum(2) > 45)          # l'objet seul, pas le mur autour
    z = ndimage.binary_erosion(z, iterations=max(1, int(K))) | (z & ~ndimage.binary_erosion(boite(x0, y0, x1, y1), iterations=1))
    plein = np.median(a[z].reshape(-1, 3), 0)
    a[z & (np.abs(a - plein).sum(2) > 28)] = plein

Image.fromarray(a.astype(np.uint8)).save(dst, quality=95)
print('ok', dst)
