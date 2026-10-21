"""Tome 5, version d'été : le ciel refait (JP, 18 octobre 2026 : « tome 5, retravaille le ciel »). Le ciel du générateur
est un aplat brun traversé de longues lignes orange tirées à la règle, et d'anneaux pointillés autour du soleil. On le
regrave au-dessus de la crête de la colline (relevée à la main) ; les arbres qui dépassent la crête restent.
    python3 ciel_ete.py SOURCE SORTIE VARIANTE
VARIANTE : calme (le ciel uni, deux bandes plus chaudes au ras des collines, le soleil seul),
nuages (des bancs de nuages effilés, taillés à la gouge, de part et d'autre du soleil),
rayons (le soleil entouré de rayons courts et effilés, comme sur une gravure ancienne).
Les coordonnées sont celles de l'image 768 × 960 ; elles se multiplient par K (4 sur l'image agrandie)."""
import sys, math, random
import numpy as np
from PIL import Image, ImageDraw

src, dst, var = sys.argv[1], sys.argv[2], sys.argv[3]
im = Image.open(src).convert('RGB')
K = im.width / 768
R = random.Random(21)
O = np.asarray(im).astype(int)
H, W = O.shape[:2]
yy, xx = np.mgrid[0:H, 0:W] / K
k = lambda v: v * K
P = lambda pts: [(k(x), k(y)) for x, y in pts]
CIEL = (77, 50, 24); CHAUD1 = (90, 58, 27); CHAUD2 = (108, 66, 29); ORANGE = (246, 118, 26); GRAVURE = (88, 59, 30)
# la crête de la colline (le filet orange du haut reste à la colline), relevée sur l'image 768
CRETE = [(0, 529), (80, 535), (110, 539), (200, 539), (300, 538), (400, 535), (440, 532), (480, 524), (510, 515),
         (530, 510), (560, 510), (600, 518), (640, 534), (680, 542), (720, 542), (768, 545)]
crete = np.interp(xx[0], [x for x, _ in CRETE], [y for _, y in CRETE])
ciel = (yy < crete[None, :] - 2.5) & ~((O.mean(2) < 42) & (yy > 490) & (xx > 60) & (xx < 125))   # les cimes qui dépassent restent

def trait(d, pts, w0, w1, fill, wmax=None):
    """Une entaille effilée ; si wmax est donné, elle s'épaissit au milieu (un banc de nuage)."""
    g, dr = [], []
    n_ = len(pts)
    for i, (x, y) in enumerate(pts):
        a = pts[min(i + 1, n_ - 1)]; b = pts[max(i - 1, 0)]
        dx, dy = a[0] - b[0], a[1] - b[1]; n = math.hypot(dx, dy) or 1
        t = i / (n_ - 1)
        w = (wmax * math.sin(math.pi * t) ** 0.8 + 0.3) / 2 if wmax else (w0 + (w1 - w0) * t) / 2
        g.append((x - dy / n * w, y + dx / n * w)); dr.append((x + dy / n * w, y - dx / n * w))
    d.polygon(P(g + dr[::-1]), fill=fill)

ciel_im = Image.new('RGB', im.size, CIEL); d = ImageDraw.Draw(ciel_im)
# deux bandes plus chaudes au ras des collines, aux bords ondulés comme taillés
for haut, coul in ((470, CHAUD1), (500, CHAUD2)):
    pts = [(x, haut + 3 * math.sin(x / 37 + haut) + 2 * math.sin(x / 13)) for x in range(-10, 790, 8)]
    d.polygon(P(pts + [(790, 560), (-10, 560)]), fill=coul)
# le grain de la gravure : de courtes entailles dans le bas du ciel seulement (le haut reste calme pour le titre)
for _ in range(110):
    x = R.uniform(0, 768); y = R.uniform(330, 520); L = R.uniform(6, 22)
    if math.hypot(x - 586, y - 480) < 80: continue
    trait(d, [(x, y), (x + L / 2, y - 0.4), (x + L, y)], 0.3, R.uniform(0.8, 1.6), GRAVURE if y < 470 else CHAUD1 if y < 500 else CHAUD2)
cx, cy, r = 586, 480, 66
if var == 'nuages':
    for x0, x1, y, e in ((-20, 250, 448, 9), (110, 470, 478, 12), (-20, 170, 500, 7),
                         (668, 800, 440, 8), (630, 800, 468, 10)):
        pts = [(x, y + 2.5 * math.sin(x / 41 + y) + 1.2 * math.sin(x / 11)) for x in np.linspace(x0, x1, 60)]
        trait(d, pts, 0, 0, ORANGE, wmax=e)
        for j in range(2):                                     # deux entailles dans le nuage, comme à la gouge
            a_, b_ = sorted(R.sample(range(8, 52), 2))
            if b_ - a_ < 10: b_ = min(56, a_ + 14)
            dy = R.uniform(-1, 1) * e * 0.16                   # un décalage pour toute l'entaille : un trait lisse
            trait(d, [(px, py + dy) for px, py in pts[a_:b_]], 0, 0, CHAUD1, wmax=e * 0.22)
elif var == 'rayons':
    for i in range(18):
        a = math.radians(180 + i * 10 + R.uniform(-2, 2))
        if math.sin(a) > -0.08: continue
        r0 = r + R.uniform(9, 13); r1 = r0 + R.uniform(22, 42)
        trait(d, [(cx + r0 * math.cos(a), cy + r0 * math.sin(a)), (cx + r1 * math.cos(a), cy + r1 * math.sin(a))],
              R.uniform(3.2, 4.4), 0.3, ORANGE)
# le soleil : un aplat au bord coupé à la main
ang = np.arctan2(yy - cy, xx - cx); dist = np.hypot(xx - cx, yy - cy)
bord = r + 0.5 * np.sin(ang * 7 + 1.1) + 0.35 * np.sin(ang * 13)
arr = np.asarray(ciel_im).copy(); arr[dist <= bord] = ORANGE
out = O.copy(); out[ciel] = arr[ciel]
Image.fromarray(out.astype(np.uint8)).save(dst, quality=95)
print('ok', dst, var)
