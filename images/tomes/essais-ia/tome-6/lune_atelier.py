"""Tome 6 : le croissant de lune remonté dans le coin du ciel, en haut à droite (JP, 18 octobre 2026 : « rajoute la lune
dans l'atelier en haut à droite »). Il touchait la fin du titre et on l'avait retiré de la couverture. On découpe le
croissant de l'image, on rebouche sa place avec le ciel voisin (le grain du ciel est recopié, pas lissé), et on le pose
dans le coin, sous l'en-tête, loin du titre.
    python3 lune_atelier.py SOURCE SORTIE
Coordonnées de l'image 3072 × 3840."""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
a = np.asarray(im).astype(int)
L = a.mean(2)
X0, Y0, X1, Y1 = 2740, 960, 3060, 1290                          # la boîte du croissant
boite = np.zeros(L.shape, bool); boite[Y0:Y1, X0:X1] = True
lune = boite & (L > 60)
lune = ndimage.binary_closing(lune, iterations=3)
lab, n = ndimage.label(lune)
tailles = ndimage.sum(lune, lab, range(1, n + 1))
lune = lab == (1 + int(np.argmax(tailles)))
lune = ndimage.binary_fill_holes(lune)
ys, xs = np.nonzero(lune)
y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
halo = ndimage.binary_dilation(lune, iterations=8)
# la découpe, avec un bord doux (le contour antialiasé de la gravure)
alpha = ndimage.gaussian_filter(ndimage.binary_dilation(lune, iterations=2).astype(float), 1.2)
coupe = np.dstack([a[y0 - 6:y1 + 6, x0 - 6:x1 + 6], (alpha[y0 - 6:y1 + 6, x0 - 6:x1 + 6] * 255).astype(int)]).astype(np.uint8)
# reboucher : le ciel juste à gauche de la boîte, recopié par bandes
dx = (x1 - x0) + 40
out = a.copy()
src_zone = a[:, :] 
for y in range(y0 - 12, y1 + 12):
    row = halo[y]
    xs_r = np.nonzero(row)[0]
    if not len(xs_r): continue
    for x in xs_r:
        out[y, x] = a[y, x - dx]
img = Image.fromarray(out.astype(np.uint8))
# le poser dans le coin du ciel, en haut à droite
cx, cy = 2850, 545
img.paste(Image.fromarray(coupe, 'RGBA'), (cx - coupe.shape[1] // 2, cy - coupe.shape[0] // 2), Image.fromarray(coupe, 'RGBA'))
img.save(dst, quality=95)
print('ok', dst, 'croissant', x1 - x0, 'x', y1 - y0)
