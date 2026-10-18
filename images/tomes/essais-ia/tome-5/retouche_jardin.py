"""Tome 5 : la candidate 4 retouchée (JP, 18 octobre 2026 : « tome 5, la 4 »), dans l'esprit de ce qu'il a demandé au
tome 4 (« moins l'air AI »). Ce qui faisait IA : un halo flou derrière le soleil, des anneaux qui se cassent à angle
droit et se changent en traits du ciel, un œuf orange posé sur la souche, une petite échelle blanche plantée dans la
forêt à gauche. On garde le reste tel quel.
    python3 retouche_jardin.py SOURCE SORTIE
Les coordonnées sont celles de l'image 768 × 960 ; elles se multiplient par K (4 sur l'image agrandie)."""
import sys, math, random
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
K = im.width / 768
R = random.Random(5)
ORIG = np.asarray(im).astype(int)
H, W = ORIG.shape[:2]
yy, xx = np.mgrid[0:H, 0:W] / K
CIEL = (73, 49, 25); ORANGE_SOLEIL = tuple(int(v) for v in np.median(ORIG[int(470 * K):int(500 * K), int(560 * K):int(610 * K)].reshape(-1, 3), 0))
LIGNE = (226, 132, 70); FORET = (61, 42, 28)
k = lambda v: v * K
P = lambda pts: [(k(x), k(y)) for x, y in pts]

def trait(d, pts, w0, w1, fill):
    gauche, droite = [], []
    for i, (x, y) in enumerate(pts):
        a = pts[min(i + 1, len(pts) - 1)]; b = pts[max(i - 1, 0)]
        dx, dy = a[0] - b[0], a[1] - b[1]; n = math.hypot(dx, dy) or 1
        w = (w0 + (w1 - w0) * i / (len(pts) - 1)) / 2
        gauche.append((x - dy / n * w, y + dx / n * w)); droite.append((x + dy / n * w, y - dx / n * w))
    d.polygon(P(gauche + droite[::-1]), fill=fill)

# 1. le soleil : plus de halo ni d'anneaux qui tournent à angle droit ; trois anneaux nets, cassés comme à la gouge
cx, cy, r = 586, 480, 66
dist = np.hypot(xx - cx, yy - cy)
# la colline passe devant : sa crête, relevée à la main sur l'image 768 (le filet clair du haut reste à la colline)
CRETE = [(380, 536.7), (440, 536.7), (460, 530), (486.7, 523.3), (520, 510.7), (540, 509.3), (566.7, 513.3),
         (593.3, 523.3), (620, 531.7), (646.7, 538.3), (673.3, 542.7), (713.3, 544), (768, 545)]
crete = np.interp(xx[0], [x for x, _ in CRETE], [y for _, y in CRETE])
colline = yy >= crete[None, :] - 2.5
arr = ORIG.copy()
zone = (dist > r - 1) & (dist < 175) & ~colline
arr[zone] = CIEL
arr[(dist <= r - 1) & ~colline] = ORANGE_SOLEIL                # le disque, net, sans le liseré du halo
# au-delà, le reste du halo s'efface en douceur dans le ciel (les traits clairs du ciel restent)
w = np.clip((dist - 175) / 70, 0, 1)[..., None]
anneau = (dist >= 175) & (dist < 245) & ~colline & (ORIG.mean(2) < np.mean(CIEL) + 25)
arr[anneau] = (np.array(CIEL) * (1 - w) + ORIG * w)[anneau]
im = Image.fromarray(arr.astype(np.uint8)); d = ImageDraw.Draw(im)
for rr, debut in ((86, 178), (106, 184), (128, 190)):
    a = debut
    while a < 362:
        L = R.uniform(28, 70); fin = min(a + L, 362)
        pts = [(cx + rr * math.cos(math.radians(t)), cy + rr * math.sin(math.radians(t))) for t in np.linspace(a, fin, 30)]
        trait(d, pts, 0.4, 1.9, LIGNE) if R.random() < 0.5 else trait(d, pts, 1.9, 0.4, LIGNE)
        a = fin + R.uniform(6, 16)
arr = np.asarray(im).copy()
arr[colline & (dist < 180)] = ORIG[colline & (dist < 180)]
im = Image.fromarray(arr.astype(np.uint8)); d = ImageDraw.Draw(im)

# 2. la petite échelle blanche plantée dans la forêt à gauche part
d.rectangle(P([(54, 600), (94, 660)]), fill=FORET)

# 3. la souche : l'œuf orange part, le dessus de la souche montre ses cernes
dessus = (xx > 112) & (xx < 238) & (yy > 838) & (yy < 872)
oeuf = dessus & (ORIG[:, :, 0] - ORIG[:, :, 2] > 90) & (ORIG[:, :, 0] > 150)
oeuf = ndimage.binary_dilation(oeuf, iterations=int(1.5 * K))
papier = tuple(int(v) for v in np.median(ORIG[dessus & (ORIG.min(2) > 180)], 0))
arr = np.asarray(im).copy(); arr[oeuf & dessus] = papier
im = Image.fromarray(arr.astype(np.uint8)); d = ImageDraw.Draw(im)
BRUN = (92, 60, 38)
for rx, ry in ((26, 6.5), (16, 4), (7, 2)):
    d.arc(P([(172 - rx, 855 - ry), (172 + rx, 855 + ry)]), 0, 360, fill=BRUN, width=max(1, int(1.1 * K)))
im.save(dst, quality=95)
print('ok', dst)
