"""Tome 2 : des éléments ajoutés à la n° 11 retouchée (JP, 18 octobre 2026 : « le tome 2, ajoute des éléments, c'est
vide »). Dans le style de l'image, des aplats brique cernés avec des filets clairs, et seulement là où le titre et le
bloc des tomes ne les cachent pas : le tuyau du poêle, qui manquait (un poêle à bois sans tuyau ne tire pas), avec ses
joints et sa clé ; une tablette sous la table avec du linge plié, un panier de plantes séchées et une cruche ; une
chaudière de bois sur le plancher, à gauche ; des bûches fendues devant le poêle.
    python3 ajouts_soin.py SOURCE SORTIE      (SOURCE : la sortie de retouche_soin.py)
Les coordonnées sont celles de l'image 768 × 960 ; elles se multiplient par K (4 sur l'image agrandie)."""
import sys, math, random
import numpy as np
from PIL import Image, ImageDraw

src, dst = sys.argv[1], sys.argv[2]
S = 2                                                  # dessin à double taille, puis réduit : bords nets
im0 = Image.open(src).convert('RGB')
K = im0.width / 768
im = im0.resize((im0.width * S, im0.height * S), Image.LANCZOS)
d = ImageDraw.Draw(im)
R = random.Random(2)
BRIQUE = (100, 32, 26); CERNE = (78, 22, 18); CLAIR = (238, 226, 204); MOYEN = (150, 64, 46)
OCRE = (214, 150, 72); ORANGE = (240, 120, 28)
k = lambda v: v * K * S
P = lambda pts: [(k(x), k(y)) for x, y in pts]
def poly(pts, fill, cerne=CERNE, w=2.2):
    d.polygon(P(pts), fill=fill)
    if cerne: d.line(P(pts + [pts[0]]), fill=cerne, width=max(1, int(k(w) / 1.6)), joint='curve')
def ligne(a, b, fill=CLAIR, w=1.3):
    d.line(P([a, b]), fill=fill, width=max(1, int(k(w) / 1.6)))
def ellipse(x0, y0, x1, y1, fill, cerne=CERNE, w=2.0):
    d.ellipse(P([(x0, y0), (x1, y1)]), fill=fill, outline=cerne, width=max(1, int(k(w) / 1.6)))

# 1. le tuyau du poêle, du dessus du poêle jusqu'en haut de l'image
x0, x1 = 689, 715
poly([(x0 - 5, 566), (x1 + 5, 566), (x1 + 5, 580), (x0 - 5, 580)], BRIQUE)        # le collet
poly([(x0, -4), (x1, -4), (x1, 567), (x0, 567)], BRIQUE)
ligne((x0 + 3.5, 0), (x0 + 3.5, 562)); ligne((x1 - 3.5, 0), (x1 - 3.5, 562), w=0.8)
for y in (150, 330):                                                                  # les joints des longueurs
    poly([(x0 - 2.5, y), (x1 + 2.5, y), (x1 + 2.5, y + 7), (x0 - 2.5, y + 7)], BRIQUE)
    ligne((x0 - 1, y + 3.5), (x1 + 1, y + 3.5), w=0.8)
ligne((x0 + 1, 462), (x1 + 9, 459), fill=CLAIR, w=1.6)                               # la clé
ellipse(x1 + 7, 455, x1 + 15, 463, BRIQUE)

# 2. la tablette sous la table, entre les pieds
poly([(38, 798), (440, 798), (440, 810), (38, 810)], BRIQUE)
ligne((42, 802), (436, 802), fill=(136, 68, 60), w=1.0)
# le linge plié : trois serviettes, chacune avec sa rayure
for i, (xa, xb) in enumerate(((58, 158), (62, 154), (56, 152))):
    yb = 798 - i * 13; ya = yb - 13
    poly([(xa + 3, ya), (xb - 3, ya), (xb, ya + 3), (xb, yb), (xa, yb), (xa, ya + 3)], CLAIR, w=1.8)
    ligne((xa + 4, ya + 4.5), (xb - 4, ya + 4.5), fill=ORANGE if i == 1 else MOYEN, w=1.4)
# le panier de plantes séchées : les tiges et les feuilles dépassent
for j in range(9):
    bx = 212 + j * 8 + R.uniform(-2, 2); tx = bx + R.uniform(-9, 9); ty = 728 + R.uniform(-6, 8)
    ligne((bx, 762), (tx, ty), fill=MOYEN, w=1.4)
    for t in (0.35, 0.6, 0.85):
        px, py = bx + (tx - bx) * t, 762 + (ty - 762) * t
        s = 1 if j % 2 else -1
        poly([(px, py), (px + s * 6, py - 3), (px + s * 1.5, py + 2)], OCRE, cerne=None)
poly([(198, 760), (300, 760), (292, 798), (206, 798)], OCRE, w=2.0)
for t in np.linspace(0.12, 0.88, 7):                                                  # le tressage
    ligne((198 + 102 * t, 761), (206 + 86 * t, 797), fill=MOYEN, w=1.0)
for y in (770, 781, 791):
    ligne((200 + (y - 760) * 0.2, y), (298 - (y - 760) * 0.2, y), fill=MOYEN, w=1.0)
poly([(196, 755), (302, 755), (302, 762), (196, 762)], MOYEN, w=1.6)                 # le rebord
# la cruche de grès : un profil de demi-largeurs, du goulot au pied
profil = [(744, 11), (750, 19), (758, 26), (768, 29), (780, 28), (790, 25), (798, 21)]
droite = [(362 + w, y) for y, w in profil]; gauche = [(362 - w, y) for y, w in profil[::-1]]
d.arc(P([(381, 750), (401, 782)]), -80, 80, fill=CERNE, width=max(1, int(k(3.4) / 1.6)))   # l'anse, derrière
poly(droite + gauche, CLAIR, w=2.0)
poly([(351, 733), (373, 733), (374, 745), (350, 745)], BRIQUE, w=1.8)                # le goulot
ligne((336, 772), (388, 772), fill=MOYEN, w=3.0); ligne((335, 779), (389, 779), fill=MOYEN, w=1.2)

# 3. la chaudière de bois sur le plancher, à gauche, devant le pied de la table
poly([(44, 834), (124, 834), (116, 898), (52, 898)], MOYEN, w=2.2)
for t in np.linspace(0.18, 0.82, 5):                                                  # les douves
    ligne((44 + 80 * t, 836), (52 + 64 * t, 896), fill=BRIQUE, w=1.0)
for y in (848, 884):                                                                  # les cercles
    xa = 44 + (y - 834) * 8 / 64; xb = 124 - (y - 834) * 8 / 64
    poly([(xa - 1, y - 3), (xb + 1, y - 3), (xb + 1, y + 3), (xa - 1, y + 3)], BRIQUE, w=1.4)
    ligne((xa + 2, y), (xb - 2, y), fill=CLAIR, w=0.8)
ellipse(44, 829, 124, 840, (205, 196, 176), w=2.0)                                    # l'eau
d.arc(P([(52, 800), (116, 860)]), 200, 340, fill=CERNE, width=max(1, int(k(2.4) / 1.6)))    # l'anse de corde

# 4. des bûches fendues empilées devant le poêle, à droite : les bouts montrent leurs cernes
def buche(cx, cy, r):
    pts = [(cx + r * math.cos(a) * (1 + R.uniform(-0.07, 0.04)), cy + r * 0.92 * math.sin(a) * (1 + R.uniform(-0.05, 0.04)))
           for a in np.linspace(0, 2 * math.pi, 15)[:-1]]
    poly(pts, BRIQUE, w=2.2)                                                          # l'écorce
    inner = [(cx + (x - cx) * 0.78, cy + (y - cy) * 0.78) for x, y in pts]
    poly(inner, MOYEN, cerne=None)                                                    # le bois du bout
    for f in (0.5, 0.24):                                                             # les cernes
        d.arc(P([(cx - r * f, cy - r * f * 0.92), (cx + r * f, cy + r * f * 0.92)]), R.uniform(0, 70), R.uniform(240, 340),
              fill=CLAIR, width=max(1, int(k(0.9) / 1.6)))
    if R.random() < 0.5:                                                              # une fente
        a = R.uniform(0, 6.28); ligne((cx, cy), (cx + r * 0.7 * math.cos(a), cy + r * 0.65 * math.sin(a)), fill=BRIQUE, w=1.1)
for cx, cy, r in ((636, 892, 15), (668, 893, 16), (700, 892, 15), (732, 893, 16), (652, 866, 15), (684, 866, 15), (716, 866, 15)):
    buche(cx, cy, r)

im = im.resize(im0.size, Image.LANCZOS)
im.save(dst, quality=95)
print('ok', dst)
