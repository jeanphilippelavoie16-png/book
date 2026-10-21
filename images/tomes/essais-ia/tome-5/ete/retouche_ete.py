"""Tome 5, version d'été : la n° 2 retouchée (JP, 18 octobre 2026 : « la 2, tome 5 »). Une seule chose y faisait IA :
au pied du bâtiment de gauche, la rangée de pierres était devenue une ligne de fausse écriture. On la remplace par une
rangée de pierres taillées à la main, de tailles et de formes différentes, sur la terre.
    python3 retouche_ete.py SOURCE SORTIE
Les coordonnées sont celles de l'image 768 × 960 ; elles se multiplient par K (4 sur l'image agrandie)."""
import sys, random, math
import numpy as np
from PIL import Image, ImageDraw

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
K = im.width / 768
R = random.Random(8)
O = np.asarray(im).astype(int)
med = lambda x0, y0, x1, y1: tuple(int(v) for v in np.median(O[int(y0 * K):int(y1 * K), int(x0 * K):int(x1 * K)].reshape(-1, 3), 0))
TERRE = med(60, 742, 120, 750); PIERRE = med(250, 655, 300, 660); OMBRE = (44, 28, 18)
k = lambda v: v * K
d = ImageDraw.Draw(im)

# la bande de fausse écriture, du coin du bâtiment jusqu'à la clôture : ses traits clairs prennent la couleur de la terre
# autour (moyenne locale des pixels sombres), puis les pierres se posent par-dessus, serrées comme un solage
from scipy import ndimage
yy, xx = np.mgrid[0:O.shape[0], 0:O.shape[1]] / K
bande = (xx > 44) & (xx < 374) & (yy > 709) & (yy < 741)
clair = bande & (O.mean(2) > 85)
clair = ndimage.binary_dilation(clair, iterations=max(1, int(1.5 * K)))
fonce = ~clair & (O.mean(2) <= 85)
arr = O.copy()
for c in range(3):
    num = ndimage.gaussian_filter(O[:, :, c] * fonce, 4 * K); den = ndimage.gaussian_filter(fonce.astype(float), 4 * K)
    arr[:, :, c] = np.where(clair, num / np.maximum(den, 1e-3), O[:, :, c])
im = Image.fromarray(arr.astype(np.uint8)); d = ImageDraw.Draw(im)
x = 46.0
while x < 366:
    w = R.uniform(12, 22); h = R.uniform(9, 14); cy = 726 + R.uniform(-2, 2)
    pts = []
    for t in np.linspace(0, 2 * math.pi, 12)[:-1]:            # une pierre : un ovale aux bords cassés
        rr = 1 + R.uniform(-0.14, 0.1)
        pts.append((x + w / 2 + math.cos(t) * w / 2 * rr, cy + math.sin(t) * h / 2 * rr))
    d.polygon([(k(px) + k(1.2), k(py) + k(1.5)) for px, py in pts], fill=OMBRE)          # le joint sombre dessous
    v = R.uniform(0.82, 1.04)                                  # chaque pierre a sa teinte
    d.polygon([(k(px), k(py)) for px, py in pts], fill=tuple(int(c * v) for c in PIERRE))
    if R.random() < 0.7:                                       # une ou deux entailles de gouge sur la pierre
        for _ in range(R.choice((1, 2))):
            y0 = cy + R.uniform(-2.5, 2.5)
            d.line([(k(x + w * R.uniform(0.2, 0.35)), k(y0)), (k(x + w * R.uniform(0.55, 0.8)), k(y0 - 0.7))],
                   fill=OMBRE, width=max(1, int(1.0 * K)))
    x += w + R.uniform(-1.5, 1.5)

im.save(dst, quality=95)
print('ok', dst)
