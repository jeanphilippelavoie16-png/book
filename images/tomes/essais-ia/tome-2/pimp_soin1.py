"""Tome 2 : la n° 1 du troisième tour, retouchée et enrichie (JP, 18 octobre 2026 : « finalement, pimp celle-là, je l'aime
plus »). On retire ce qui fait IA : les taches roses qui flottent sur le mur comme des nuages, le rectangle clair coupé
d'un trait sur le flanc de la bouilloire. Puis on ajoute, dans les trois encres de l'image (le mur sang de bœuf, le
brun presque noir des meubles, le crème) et seulement sous le titre : le tuyau du poêle, qui manquait, avec ses joints
et sa clé ; une tablette sous la table, avec du linge plié, un panier de plantes séchées et une cruche ; une chaudière
d'eau au pied de la table ; des bûches devant le poêle ; un bouquet de plantes qui sèche, pendu au bord de la table.
    python3 pimp_soin1.py SOURCE SORTIE
Les coordonnées sont celles de l'image 768 × 960 ; elles se multiplient par K (4 sur l'image agrandie)."""
import sys, math, random
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

src, dst = sys.argv[1], sys.argv[2]
im0 = Image.open(src).convert('RGB')
K = im0.width / 768
a = np.asarray(im0).astype(float)
H, W = a.shape[:2]
yy, xx = np.mgrid[0:H, 0:W] / K
def boite(x0, y0, x1, y1):
    return (xx >= x0) & (xx < x1) & (yy >= y0) & (yy < y1)

# 1. les taches roses du mur : pour chaque tache, on estime le mur à partir d'un anneau de mur propre autour d'elle
#    (moyenne pondérée, la lueur de la lampe suit), puis on ne remplace que les points qui s'en écartent
boites = ((8, 590, 66, 610), (0, 610, 42, 634), (205, 545, 240, 558), (240, 570, 282, 584), (334, 602, 378, 630))
L = a.mean(2)
mur = (L > 40) & (L < 150) & (a[:, :, 0] - a[:, :, 2] > 45)
for b in boites:
    z = boite(*b)
    anneau = mur & ndimage.binary_dilation(z, iterations=int(12 * K)) & ~ndimage.binary_dilation(z, iterations=int(2 * K))
    est = np.zeros_like(a)
    den = ndimage.gaussian_filter(anneau.astype(float), 6 * K)
    for c in range(3):
        est[:, :, c] = ndimage.gaussian_filter(a[:, :, c] * anneau, 6 * K) / np.maximum(den, 1e-3)
    ecart = z & mur & (np.abs(a - est).sum(2) > 14)
    ecart = ndimage.binary_dilation(ecart, iterations=max(1, int(K))) & z & mur
    a[ecart] = est[ecart]

# 2. le rectangle clair de la bouilloire : le flanc reprend la couleur du métal
z = boite(625, 541, 700, 593)
L = a.mean(2)
metal = z & (L < 45)
flanc = boite(640, 550, 674, 593) & (L >= 40) & (L < 120)
if metal.any(): a[flanc] = np.median(a[metal], 0)

 # 3. la lueur de la lampe, recentrée sur sa flamme (JP : « la lueur de la lampe à la bonne place ») : on retire la lueur
#    du générateur, posée derrière les bocaux, et on en pose une ronde autour de la flamme, sur le mur seulement
MUR0 = np.array([96, 28, 22]); CHAUD = np.array([178, 78, 32])
seg = CHAUD - MUR0
t_ = np.clip(((a - MUR0) @ seg) / (seg @ seg), 0, 1)
proche = np.linalg.norm(a - (MUR0 + t_[..., None] * seg), axis=2) < 16       # le mur, éclairé ou pas
zone = boite(0, 440, 470, 760)
bp = boite(296, 584, 350, 642)                                      # le pilon : ses rayures ont la couleur du mur
pilon = ndimage.binary_closing(bp & (a.mean(2) < 36), iterations=int(2 * K))
zone &= ~ndimage.binary_dilation(pilon, iterations=max(1, int(K)))
mur_l = zone & proche
fx, fy = 100, 596                                                  # la flamme
r_ = np.hypot(xx - fx, (yy - fy) * 1.1)
lueur = np.clip(1 - r_ / 175, 0, 1) ** 1.6
a[mur_l] = (MUR0 + lueur[..., None] * seg)[mur_l]

im = Image.fromarray(a.astype(np.uint8))
S = 2                                                         # dessin à double taille, puis réduit : bords nets
im = im.resize((W * S, H * S), Image.LANCZOS)
d = ImageDraw.Draw(im)
R = random.Random(4)
MUR = (96, 28, 22); FONCE = (45, 12, 10); CERNE = (30, 7, 6); CREME = (238, 224, 203); MOYEN = (128, 52, 38)
OCRE = (205, 142, 70); ORANGE = (240, 122, 30)
k = lambda v: v * K * S
P = lambda pts: [(k(x), k(y)) for x, y in pts]
def poly(pts, fill, cerne=CERNE, w=2.0):
    d.polygon(P(pts), fill=fill)
    if cerne: d.line(P(pts + [pts[0]]), fill=cerne, width=max(1, int(k(w) / 1.6)), joint='curve')
def ligne(p, q, fill=CREME, w=1.3):
    d.line(P([p, q]), fill=fill, width=max(1, int(k(w) / 1.6)))

# 3. le tuyau du poêle, du dessus du poêle jusqu'en haut, au bord droit (à droite de « Tome 2 »)
x0, x1 = 742, 766
poly([(x0 - 5, 580), (x1 + 5, 580), (x1 + 5, 594), (x0 - 5, 594)], FONCE)        # le collet
poly([(x0, -4), (x1, -4), (x1, 581), (x0, 581)], FONCE)
ligne((x0 + 3.5, 0), (x0 + 3.5, 576), fill=MOYEN, w=1.2)
for y in (150, 340):                                                                  # les joints
    poly([(x0 - 2.5, y), (x1 + 2.5, y), (x1 + 2.5, y + 7), (x0 - 2.5, y + 7)], FONCE)
    ligne((x0 - 1, y + 3.5), (x1 + 1, y + 3.5), fill=MOYEN, w=0.8)
ligne((x0 + 1, 548.5), (x1 - 1, 550), fill=MOYEN, w=1.6)                             # la clé, sous la vapeur
ligne((x0 - 8, 548), (x0 + 1, 548.5), fill=CERNE, w=2.6)
d.ellipse(P([(x0 - 13, 544), (x0 - 6, 552)]), fill=FONCE, outline=CERNE, width=max(1, int(k(1.6) / 1.6)))

# 4. un bouquet de plantes qui sèche, pendu au bord de la table, la tête en bas
for j, bx in enumerate((150, 158, 165)):
    ligne((bx, 738), (bx + R.uniform(-2, 2), 744), fill=CERNE, w=1.2)                 # la ficelle
    for i in range(7):
        tx = bx + R.uniform(-8, 8); ty = 744 + R.uniform(16, 28)
        ligne((bx, 744), (tx, ty), fill=OCRE, w=1.3)
        for t in (0.45, 0.75):
            px, py = bx + (tx - bx) * t, 744 + (ty - 744) * t
            sg = 1 if i % 2 else -1
            poly([(px, py), (px + sg * 4.5, py + 1.5), (px + sg * 1, py + 3)], OCRE, cerne=None)

# 5. la tablette sous la table, entre les pieds
poly([(34, 806), (516, 806), (516, 818), (34, 818)], FONCE)
ligne((38, 809.5), (512, 809.5), fill=MOYEN, w=1.0)
for i, (xa, xb) in enumerate(((52, 150), (56, 146))):                                  # le linge plié, deux serviettes
    yb = 806 - i * 13; ya = yb - 13
    poly([(xa + 3, ya), (xb - 3, ya), (xb, ya + 3), (xb, yb), (xa, yb), (xa, ya + 3)], CREME, w=1.8)
    ligne((xa + 4, ya + 4.5), (xb - 4, ya + 4.5), fill=ORANGE if i == 1 else MOYEN, w=1.4)
for j in range(9):                                                                    # le panier de plantes séchées
    bx = 222 + j * 8 + R.uniform(-2, 2); tx = bx + R.uniform(-9, 9); ty = 738 + R.uniform(-6, 8)
    ligne((bx, 770), (tx, ty), fill=OCRE, w=1.4)
    for t in (0.35, 0.6, 0.85):
        px, py = bx + (tx - bx) * t, 770 + (ty - 770) * t
        sg = 1 if j % 2 else -1
        poly([(px, py), (px + sg * 6, py - 3), (px + sg * 1.5, py + 2)], OCRE, cerne=None)
poly([(208, 768), (310, 768), (302, 806), (216, 806)], CREME, w=2.0)
for t in np.linspace(0.12, 0.88, 7):
    ligne((208 + 102 * t, 769), (216 + 86 * t, 805), fill=MOYEN, w=1.0)
for y in (778, 789, 799):
    ligne((210 + (y - 768) * 0.2, y), (308 - (y - 768) * 0.2, y), fill=MOYEN, w=1.0)
poly([(206, 763), (312, 763), (312, 770), (206, 770)], MOYEN, w=1.6)

# 6. la chaudière d'eau au pied de la table, à gauche
poly([(44, 838), (122, 838), (114, 900), (52, 900)], MOYEN, w=2.2)
for t in np.linspace(0.18, 0.82, 5):
    ligne((44 + 78 * t, 840), (52 + 62 * t, 898), fill=FONCE, w=1.0)
for y in (852, 886):
    xa = 44 + (y - 838) * 8 / 62; xb = 122 - (y - 838) * 8 / 62
    poly([(xa - 1, y - 3), (xb + 1, y - 3), (xb + 1, y + 3), (xa - 1, y + 3)], FONCE, w=1.4)
    ligne((xa + 2, y), (xb - 2, y), fill=CREME, w=0.8)
d.ellipse(P([(44, 833), (122, 844)]), fill=(178, 160, 140), outline=CERNE, width=max(1, int(k(2) / 1.6)))
d.arc(P([(52, 804), (114, 864)]), 200, 340, fill=CERNE, width=max(1, int(k(2.4) / 1.6)))

# 7. la corde de bois devant le poêle (JP : « les bûches mieux faites aussi ») : du bois fendu, vu par les bouts. Une
#    bûche ronde, un quartier ou une demie ; l'écorce en bande foncée sur le côté rond ; le bout du bois en ocre avec ses
#    cernes autour du cœur et une fente ; empilées en rangs croisés
BOIS = (214, 160, 92); BOIS2 = (186, 124, 62)
def bout(cx, cy, r, sorte, rot):
    """Un bout de bûche. sorte : 'rond', 'demi' (le cœur au milieu du côté plat) ou 'quartier' (le cœur à la pointe)."""
    if sorte == 'rond':
        a0, a1, coeur = 0, 360, (cx, cy)
    elif sorte == 'demi':
        a0, a1 = rot, rot + 180; coeur = (cx, cy)
    else:
        a0, a1 = rot, rot + 95; coeur = (cx, cy)
    ang = np.radians(np.linspace(a0, a1, 40))
    ext = [(coeur[0] + r * (1 + R.uniform(-0.04, 0.03)) * math.cos(t), coeur[1] + r * 0.94 * math.sin(t)) for t in ang]
    inn = [(coeur[0] + r * 0.80 * math.cos(t), coeur[1] + r * 0.80 * 0.94 * math.sin(t)) for t in ang]
    if sorte == 'rond':
        poly(ext, FONCE, w=2.0); poly(inn, BOIS, cerne=None)
    else:
        poly(ext + [coeur], FONCE, w=2.0)                                                   # l'écorce, puis le bois
        poly(inn + [coeur], BOIS, cerne=None)
        poly([(coeur[0] + (x - coeur[0]) * 1.0, coeur[1] + (y - coeur[1]) * 1.0) for x, y in [ext[0], coeur, ext[-1]]], BOIS, cerne=None)
        d.line(P([ext[0], coeur, ext[-1]]), fill=CERNE, width=max(1, int(k(2.0) / 1.6)), joint='curve')   # les faces fendues
    for f in (0.62, 0.42, 0.22):                                                            # les cernes, autour du cœur
        rr = r * f
        d.arc(P([(coeur[0] - rr, coeur[1] - rr * 0.94), (coeur[0] + rr, coeur[1] + rr * 0.94)]),
              a0 + R.uniform(5, 25), a1 - R.uniform(5, 25), fill=BOIS2, width=max(1, int(k(1.1) / 1.6)))
    t = math.radians(R.uniform(a0 + 20, a1 - 20))                                            # une fente qui part du cœur
    ligne(coeur, (coeur[0] + r * 0.72 * math.cos(t), coeur[1] + r * 0.68 * math.sin(t)), fill=CERNE, w=1.1)
    for _ in range(3):                                                                      # l'écorce, à la gouge
        t = math.radians(R.uniform(a0 + 5, a1 - 5))
        ligne((coeur[0] + r * 0.86 * math.cos(t), coeur[1] + r * 0.81 * math.sin(t)),
              (coeur[0] + r * 0.97 * math.cos(t), coeur[1] + r * 0.91 * math.sin(t)), fill=MOYEN, w=0.9)
# la corde, serrée : trois rangs qui se touchent ; les quartiers et les demies sont plus grands que les ronds (même
# bois), tournés pour se caser ; le fond de la pile en ombre, pour que les vides se lisent comme des creux
corde = []
for j, (y, xs) in enumerate(((894, (632, 664, 697, 730, 762)), (869, (648, 681, 714, 747)), (845, (664, 697, 730)))):
    for i, x in enumerate(xs):
        sorte = ('rond', 'quartier', 'demi', 'quartier', 'rond', 'demi')[(i + j * 2) % 6]
        r = {'rond': 15.5, 'demi': 19, 'quartier': 23}[sorte]
        rot = {'rond': 0, 'demi': R.choice((150, 190, 200)), 'quartier': R.choice((205, 225, 240, 250))}[sorte]
        cx, cy = x, y
        if sorte == 'demi':                                      # le centre de masse de la demie revient sur la case
            cx -= r * 0.42 * math.cos(math.radians(rot + 90)); cy -= r * 0.42 * 0.94 * math.sin(math.radians(rot + 90))
        if sorte == 'quartier':
            cx -= r * 0.6 * math.cos(math.radians(rot + 47.5)); cy -= r * 0.6 * 0.94 * math.sin(math.radians(rot + 47.5))
        corde.append((cx, cy, r, sorte, rot, x, y))
from scipy.spatial import ConvexHull
pts_c = np.array([(x + 16 * math.cos(t), y + 15 * math.sin(t)) for *_, x, y in corde for t in np.linspace(0, 6.28, 12)])
hull = pts_c[ConvexHull(pts_c).vertices]
poly([tuple(p_) for p_ in hull], CERNE, cerne=None)
for cx, cy, r, sorte, rot, *_ in corde:
    bout(cx, cy, r, sorte, rot)

# 8. le feu dans le poêle (JP : « le foyer mieux fait ») : le fond du foyer, la lueur, deux bûches en croix, les braises,
#    des flammes en langues, la grille devant ; tout est coupé à la fenêtre du poêle
fen = Image.new('L', im.size, 0)
ImageDraw.Draw(fen).rounded_rectangle(P([(603.5, 652.5), (745, 763)]), radius=int(k(4)), fill=255)
feu = Image.new('RGB', im.size, (70, 16, 11)); df = ImageDraw.Draw(feu)
P2 = P
# la lueur du feu sur le fond du foyer : deux aplats aux bords ondulés, plus haut au milieu
for haut, coul, amp in ((676, (150, 48, 20), 9), (698, ORANGE, 7)):
    pts = [(600, 770)] + [(x, haut + amp * (abs(x - 675) / 70) ** 1.5 + 3 * math.sin(x / 7)) for x in range(600, 752, 4)] + [(752, 770)]
    df.polygon(P2(pts), fill=coul)
R2 = random.Random(9)
def langue(bx, base_y, l, hh, pente, ph, coul):
    pts = [(bx - l, base_y)]
    for j in range(1, 10):
        t = j / 10
        pts.append((bx - l * (1 - t) ** 0.75 + pente * t ** 2 + math.sin(t * 6 + ph) * 2.0, base_y - hh * t))
    pts.append((bx + pente, base_y - hh))
    for j in range(9, 0, -1):
        t = j / 10
        pts.append((bx + l * (1 - t) ** 0.9 + pente * t ** 2 + math.sin(t * 5 + ph) * 1.6, base_y - hh * t * 0.93))
    pts.append((bx + l, base_y))
    df.polygon(P2(pts), fill=coul)
# les flammes : cinq langues de hauteurs et de largeurs inégales, penchées, la plus haute au milieu
for bx, hh, l, pente in ((628, 34, 10, -5), (652, 62, 14, 4), (676, 86, 17, -3), (700, 58, 13, 6), (724, 38, 10, -4)):
    ph = R2.uniform(0, 6)
    langue(bx, 742, l, hh, pente, ph, (250, 170, 80))
    langue(bx + 1, 742, l * 0.5, hh * 0.58, pente * 0.6, ph, (246, 226, 180))
for xa, ya, xb, yb in ((614, 751, 712, 731), (638, 731, 740, 751)):               # les bûches en croix, devant le pied des flammes
    n_ = np.array([-(yb - ya), xb - xa], float); n_ = n_ / np.linalg.norm(n_) * 7
    corps_b = [(xa + n_[0], ya + n_[1]), (xb + n_[0], yb + n_[1]), (xb - n_[0], yb - n_[1]), (xa - n_[0], ya - n_[1])]
    df.polygon(P2(corps_b), fill=FONCE)
    for t in (0.2, 0.42, 0.66, 0.85):                                                 # l'écorce, en écailles
        px, py = xa + (xb - xa) * t, ya + (yb - ya) * t
        df.line(P2([(px + n_[0] * 0.2, py + n_[1] * 0.2), (px + n_[0] * 0.75 + 3, py + n_[1] * 0.75)]), fill=(90, 26, 18), width=int(k(1.2)))
    df.line(P2([(xa - n_[0] * 0.7, ya - n_[1] * 0.7), (xb - n_[0] * 0.7, yb - n_[1] * 0.7)]), fill=ORANGE, width=int(k(1.8)))   # la braise dessus
    for cx_, cy_ in ((xa, ya), (xb, yb)):
        df.ellipse(P2([(cx_ - 6.5, cy_ - 7), (cx_ + 6.5, cy_ + 7)]), fill=FONCE)
        df.ellipse(P2([(cx_ - 5, cy_ - 5.5), (cx_ + 5, cy_ + 5.5)]), fill=BOIS)
        for rr in (3.4, 1.6):
            df.ellipse(P2([(cx_ - rr, cy_ - rr * 1.08), (cx_ + rr, cy_ + rr * 1.08)]), outline=BOIS2, width=int(k(0.8)))
        df.line(P2([(cx_, cy_), (cx_ + 4, cy_ - 3)]), fill=CERNE, width=int(k(0.8)))
for x in range(612, 742, 6):                                                          # les braises
    df.ellipse(P2([(x, 753 + R2.uniform(-1, 1)), (x + 5, 758)]), fill=OCRE if R2.random() < 0.5 else ORANGE)
df.rectangle(P2([(610, 750), (740, 754)]), fill=FONCE)                               # la grille, devant
for x in (632, 672, 712):
    df.rectangle(P2([(x, 750), (x + 4, 760)]), fill=FONCE)
im.paste(feu, (0, 0), fen)
d = ImageDraw.Draw(im)

im = im.resize((W, H), Image.LANCZOS)
# la vapeur de la bouilloire repasse devant le tuyau
v = boite(712, 430, 768, 520) & (np.asarray(im0).mean(2) > 115)
out = np.asarray(im).copy(); out[v] = np.asarray(im0)[v]
im = Image.fromarray(out)
im.save(dst, quality=95)
print('ok', dst)
