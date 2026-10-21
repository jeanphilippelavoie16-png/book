"""Tome 2 : la n° 1 du troisième tour, retouchée et enrichie (JP, 18 octobre 2026 : « finalement, pimp celle-là, je l'aime
plus »). On retire ce qui fait IA : les taches roses qui flottent sur le mur comme des nuages, le rectangle clair coupé
d'un trait sur le flanc de la bouilloire. Puis on ajoute, dans les encres de l'image (le mur sang de bœuf, le brun presque
noir des meubles, le crème, l'ocre) et seulement sous le titre : le tuyau du poêle, qui manquait, avec ses joints et sa
clé ; trois bouquets de plantes qui sèchent, pendus sous le bord de la table ; une tablette sous la table, avec du linge
plié, un panier d'achillée séchée et une cruche de grès ; une chaudière d'eau au pied de la table ; une corde de bois
sous le poêle ; le feu dans le poêle.
    python3 pimp_soin1.py SOURCE SORTIE
Les coordonnées sont celles de l'image 768 × 960 ; elles se multiplient par K (4 sur l'image agrandie).

Le bas refait (JP, 19 octobre 2026 : « le bois en dessous du foyer, l'étage du bas et le seau ne sont pas assez de
qualité à mon goût ») : les sections 4 à 7 posent six PNG transparents, rangés à côté de ce script, à 8 points par unité.
Chacun se pose à sa boîte (coin en haut à gauche, coin en bas à droite) :
    objet-bouquets.png    206,740.5 à 260,794.5     les trois bouquets pendus à leur corde      généré
    objet-linge.png       90,754.625 à 190,805      le linge plié                               généré
    objet-panier.png      301,747.625 à 373,805.5   le panier d'achillée séchée                 généré
    objet-cruche.png      430,755.125 à 463,805.5   la cruche de grès                           généré
    objet-chaudiere.png   30,794 à 136,916          la chaudière d'eau, en bois cerclé de fer   dessin vectoriel
    objet-corde.png       596,812 à 768,926         la corde de bois fendu                      dessin vectoriel
Les objets générés le sont un par un par AI Horde (Flux.1-Schnell, le modèle de l'image) sur un fond rouge uni, puis
détourés et ramenés aux encres de l'image. La chaudière et la corde sont dessinées à la main, en vectoriel, et rendues
par Chromium ; leurs cernes sont amincis à l'épaisseur de ceux des objets générés. Tous passent par le même léger flou,
celui des bords du générateur. objets-bas/objets_bas.py les refait (il garde les images générées, le texte de chaque
demande, les dessins et leurs SVG). La planche de la tablette, les ombres plates et les deux clous se dessinent ici.
Le titre ne doit pas cacher le cadre (JP, même jour) : les sections 4 à 7 ne touchent rien au-dessus de la table ; le
cadre au mur est posé ensuite par cadre_mur.py, et le titre de la couverture est remonté au-dessus de lui (CENTRE_BAS de
essais-ia/tome-1/couverture.py)."""
import sys, os, math, random
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
# fondu sur 30 unités au haut et à droite de la zone : le mur d'origine n'a pas tout à fait MUR0, et le bord dur faisait
# une ligne que la texture du mur (texture_mur.py) rendait visible
fondu = (np.clip((yy - 440) / 30, 0, 1) * np.clip((470 - xx) / 30, 0, 1))[..., None]
a[mur_l] = (a * (1 - fondu) + (MUR0 + lueur[..., None] * seg) * fondu)[mur_l]

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

# 4 à 7. Le bas de l'image, refait (JP, 19 octobre 2026 : « le bois en dessous du foyer, l'étage du bas et le seau ne
#    sont pas assez de qualité à mon goût »). Les objets sont des PNG transparents à 8 points par unité (la taille du
#    dessin ici), faits par objets-bas/objets_bas.py et rangés à côté de ce script ; chacun se pose à sa boîte, le coin
#    en haut à gauche en coordonnées 768 × 960. Sur une source d'une autre taille, ils se mettent à l'échelle.
ICI = os.path.dirname(os.path.abspath(__file__))
def poser(nom, x0, y0):
    o = Image.open(os.path.join(ICI, nom)).convert('RGBA')
    if abs(K * S - 8) > 1e-6:
        o = o.resize((round(o.width * K * S / 8), round(o.height * K * S / 8)), Image.LANCZOS)
    im.paste(o, (round(k(x0)), round(k(y0))), o)

# 4. trois bouquets de plantes qui sèchent, la tête en bas, sur une corde tendue sous le bord de la table. La corde est
#    nouée à deux clous plantés par en dessous dans le tablier : la tige du clou, sa tête en bas, un tour de corde
poser('objet-bouquets.png', 206, 740.5)
for x in (211, 255.5):
    poly([(x - 0.55, 740.6), (x + 0.55, 740.6), (x + 0.55, 744.4), (x - 0.55, 744.4)], FONCE, w=0.6)
    d.ellipse(P([(x - 1.6, 743.9), (x + 1.6, 745.3)]), fill=FONCE, outline=CERNE, width=max(1, int(k(0.6) / 1.6)))
    ligne((x - 0.9, 741.9), (x + 0.9, 742.6), fill=OCRE, w=0.7)

# 5. la tablette sous la table, entre les pieds : la planche (le dessus en brique, le chant en brun), le linge plié, le
#    panier d'achillée séchée et la cruche de grès. Sous chacun, une ombre plate, un aplat net qui déborde à droite
#    (la lampe est à gauche)
poly([(34, 802), (516, 802), (516, 818), (34, 818)], FONCE)
poly([(34, 802), (516, 802), (516, 806), (34, 806)], MOYEN, w=1.2)
for y_, xa, xb in ((810.5, 60, 300), (814, 220, 490)):
    ligne((xa, y_), (xb, y_), fill=MOYEN, w=0.7)
for xa, xb in ((92, 196), (311, 381), (436, 468)):
    d.ellipse(P([(xa, 803.3), (xb, 806.3)]), fill=FONCE)
poser('objet-linge.png', 90, 754.625)
poser('objet-panier.png', 301, 747.625)
poser('objet-cruche.png', 430, 755.125)

# 6. la chaudière d'eau au pied de la table, à gauche, avec son ombre sur le plancher ; descendue de 4 unités par
#    rapport au dessin de départ, pour que la poignée de l'anse passe sous le chant de la tablette
poser('objet-chaudiere.png', 30, 794)

# 7. la corde de bois fendu rangée sous le poêle, entre ses pattes (JP : « le bois, mets-le en dessous du foyer »), vue
#    de trois quarts : les bouts (écorce, cernes, fentes), le côté qui fuit et l'ombre au fond de la pile
poser('objet-corde.png', 588, 836)
BOIS = (214, 160, 92); BOIS2 = (186, 124, 62)                    # les bouts des bûches du feu (section 8) les reprennent

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
