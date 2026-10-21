"""Tome 6 : l'intérieur de l'atelier redessiné (JP, 18 octobre 2026 : « je veux pas que ça fasse AI ; il y a des
détails dans la cabane »). On repart de l'image choisie (candidate 3, agrandie, lune déplacée), on repeint l'ouverture
de la porte en orange uni et on y grave des silhouettes nettes : enclume sur sa bille, forge de pierre avec hotte et
braises, outils de forgeron accrochés. Le chiffon blanc du haut de la porte disparaît.
Deuxième passe (JP, même jour : « le feu qui sort de l'affaire qu'on frappe dessus, ça pas rapport, pi la niche à côté
non plus ») : plus d'étincelles sur l'enclume, et la petite cabane allumée à droite de l'atelier est enlevée ; le mur de
l'appentis descend jusqu'à la neige, avec un banc de neige au pied.
    python3 retouche_atelier.py titre-tome-6-avant-retouche.jpg ../../titre-tome-6.jpg
"""
import sys, random
import numpy as np
from PIL import Image, ImageDraw

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
R = random.Random(6)
NOIR = (30, 28, 27); PAPIER = (247, 235, 211); ORANGE = (246, 117, 16); BRAISE = (255, 196, 74)
X0, Y0, X1, Y1 = 1000, 1990, 2110, 2900          # la zone retouchée
S = 2                                             # dessin à double taille, puis réduit : bords nets
zone = im.crop((X0, Y0, X1, Y1)).resize(((X1 - X0) * S, (Y1 - Y0) * S), Image.LANCZOS)
d = ImageDraw.Draw(zone)
P = lambda x, y: ((x - X0) * S, (y - Y0) * S)
def j(v, a=3):                                    # un peu de main dans le trait
    return v + R.uniform(-a, a)
def poly(pts, fill):
    d.polygon([P(j(x), j(y)) for x, y in pts], fill=fill)
def ligne(a, b, w, fill):
    d.line([P(*a), P(*b)], fill=fill, width=int(w * S))

# 1. l'ouverture : orange uni, puis les joints des planches du fond
ox0, oy0, ox1, oy1 = 1236, 2039, 2042, 2878
poly([(ox0, oy0), (ox1, oy0), (ox1, oy1), (ox0, oy1)], ORANGE)
for x in (1318, 1462, 1604):
    ligne((x, oy0), (j(x, 4), oy1 - 30), 9, NOIR)
ligne((ox0, oy1 - 22), (ox1, oy1 - 22), 10, NOIR)          # le seuil

# 2. le chiffon blanc du haut de la porte de gauche : la porte continue (noir, et les lignes de planches du dessous)
poly([(1004, 2008), (1224, 2008), (1224, 2142), (1004, 2142)], NOIR)
for x0, x1 in ((1040, 1054), (1064, 1078), (1140, 1147), (1210, 1211)):
    ligne((x0, 2012), (x1, 2146), 3, PAPIER)

# 3. les outils accrochés à une barre
ligne((1290, 2150), (1690, 2150), 9, NOIR)
for x in (1340, 1455, 1560, 1650):
    ligne((x, 2150), (x, 2168), 6, NOIR)
# marteau : la tête sur le clou, le manche vers le bas
poly([(1300, 2168), (1382, 2168), (1382, 2206), (1300, 2206)], NOIR)
poly([(1333, 2206), (1349, 2206), (1351, 2370), (1331, 2370)], NOIR)
ligne((1306, 2175), (1376, 2175), 3, PAPIER)
# pinces : deux longues branches, les mors en haut
poly([(1440, 2168), (1470, 2168), (1466, 2210), (1446, 2210)], NOIR)
ligne((1450, 2210), (1432, 2390), 11, NOIR)
ligne((1462, 2210), (1482, 2390), 11, NOIR)
# tisonnier : une anneau en haut, la pointe en crochet en bas
d.ellipse([P(1545, 2168), P(1577, 2200)], outline=NOIR, width=8 * S)
ligne((1561, 2200), (1561, 2385), 10, NOIR)
ligne((1561, 2385), (1583, 2405), 10, NOIR)
# lime
poly([(1640, 2168), (1660, 2168), (1662, 2350), (1638, 2350)], NOIR)
for y in range(2185, 2345, 14):
    ligne((1642, y), (1658, y + 5), 2, PAPIER)

# 4. la forge de pierre, sa hotte et son tuyau, les braises
fx0, fx1 = 1712, 1990
poly([(fx0, 2560), (fx1, 2560), (fx1, oy1 - 22), (fx0, oy1 - 22)], NOIR)
for i, y in enumerate(range(2600, oy1 - 30, 46)):          # les joints des pierres, de longueurs inégales
    ligne((fx0 + 8, y), (fx1 - 8, j(y, 2)), 4, PAPIER)
    x = fx0 + R.uniform(20, 70)
    while x < fx1 - 30:
        ligne((x, y - 44 if y - 44 > 2560 else 2562), (j(x, 2), y), 4, PAPIER)
        x += R.uniform(55, 120)
poly([(fx0 + 10, 2520), (fx1 - 10, 2520), (fx1 - 4, 2562), (fx0 + 4, 2562)], BRAISE)   # le lit de braises
for _ in range(14):
    x = R.uniform(fx0 + 20, fx1 - 30); d.ellipse([P(x, 2528), P(x + R.uniform(14, 30), 2546)], fill=NOIR)
for x in (1780, 1850, 1925):                                # petites flammes
    poly([(x - 18, 2522), (x, 2470 - R.uniform(0, 20)), (x + 18, 2522)], BRAISE)
poly([(fx0 - 12, 2462), (fx1 + 12, 2462), (1902, 2262), (1800, 2262)], NOIR)          # la hotte
ligne((fx0 - 4, 2468), (fx1 + 4, 2468), 4, PAPIER)
for t in (0.25, 0.5, 0.75):                                 # les tôles rivées de la hotte
    ligne((fx0 - 12 + t * (1800 - fx0 + 12), 2462 - t * 200), (fx1 + 12 - t * (fx1 + 12 - 1902), 2462 - t * 200), 3, PAPIER)
poly([(1822, oy0), (1880, oy0), (1880, 2264), (1822, 2264)], NOIR)                     # le tuyau

# 5. l'enclume sur sa bille
cx, by = 1480, 2660
poly([(cx - 120, by), (cx + 120, by), (cx + 114, oy1 - 22), (cx - 116, oy1 - 22)], NOIR)    # la bille
for x in (cx - 90, cx - 45, cx + 10, cx + 70):
    ligne((x, by + 30), (j(x, 4), oy1 - 34), 3, PAPIER)                                       # l'écorce
d.ellipse([P(cx - 120, by - 26), P(cx + 120, by + 26)], fill=NOIR, outline=PAPIER, width=3 * S)
d.arc([P(cx - 84, by - 15), P(cx + 84, by + 15)], 0, 360, fill=PAPIER, width=2 * S)            # les cernes
d.arc([P(cx - 46, by - 8), P(cx + 46, by + 8)], 0, 360, fill=PAPIER, width=2 * S)
face = by - 150
poly([(cx - 205, face + 12), (cx - 150, face + 4), (cx - 92, face), (cx + 118, face), (cx + 118, face + 40),
      (cx + 52, face + 40), (cx + 38, face + 92), (cx + 96, by - 30), (cx + 100, by - 16), (cx - 92, by - 16),
      (cx - 88, by - 30), (cx - 36, face + 92), (cx - 50, face + 40), (cx - 92, face + 40), (cx - 135, face + 30),
      (cx - 175, face + 20)], NOIR)
ligne((cx - 86, face + 7), (cx + 110, face + 7), 4, PAPIER)    # la table, à la gouge
ligne((cx - 190, face + 14), (cx - 96, face + 8), 3, PAPIER)    # la bigorne
d.rectangle([P(cx + 78, face + 12), P(cx + 92, face + 22)], fill=PAPIER)   # le trou carré
zone = zone.resize((X1 - X0, Y1 - Y0), Image.LANCZOS)
im.paste(zone, (X0, Y0))

# 6. la niche à droite de l'atelier : on recopie vers le bas la texture du mur de l'appentis (en miroir une fois sur
# deux, pour que les planches se raccordent) et celle de l'épinette d'à côté, puis la neige au pied
src = im.copy(); copie = im.copy()
def empiler(boite, y0, y1, retourne):
    tuile = src.crop(boite); h = boite[3] - boite[1]; y = y0; k = 0
    while y < y1:
        t = tuile.transpose(retourne) if k % 2 == 0 else tuile
        copie.paste(t.crop((0, 0, t.width, min(h, y1 - y))), (boite[0], y)); y += h; k += 1
empiler((2325, 2130, 2600, 2318), 2290, 2800, Image.FLIP_TOP_BOTTOM)                    # le mur et ses planches
empiler((2600, 2159, 2860, 2286), 2290, 2800, Image.FLIP_LEFT_RIGHT)                    # l'épinette derrière (rangées
                                                                                        # de bord sans neige : aucune tache coupée)
# on ne remplace que la niche : son toit, son corps, et le clair entre elle et l'épinette, qui n'a plus de raison d'être
niche = Image.new('L', im.size, 0)
ImageDraw.Draw(niche).polygon([(2325, 2318), (2560, 2318), (2580, 2266), (2862, 2458), (2862, 2532), (2752, 2532),
                               (2752, 2800), (2325, 2800)], fill=255)
from scipy import ndimage
# le clair entre la niche et l'épinette, avec les trois branches enneigées qui le touchent, part en entier
clair = np.asarray(src.convert('L'))[2470:2785, 2740:3060] > 140
lab, _ = ndimage.label(clair)
fente = Image.fromarray((ndimage.binary_dilation(lab == lab[180, 30], iterations=3) * 255).astype(np.uint8))
niche.paste(fente, (2740, 2470), fente)
# une tache de neige d'origine que le bord coupe disparaît en entier, pour ne pas laisser de bord droit
m = np.asarray(niche)[2300:2790, 2700:2900] > 0
lab, n = ndimage.label(np.asarray(src.convert('L'))[2300:2790, 2700:2900] > 140)
for k in range(1, n + 1):
    c = lab == k
    if c.sum() < 4000 and (c & m).any() and (c & ~m).any():
        m |= ndimage.binary_dilation(c, iterations=2)
niche.paste(255, (2700, 2300), Image.fromarray((m * 255).astype(np.uint8)))
copie.paste((28, 28, 28), (2858, 2300, 3000, 2800))                                       # hors de la tuile : le sombre de l'épinette
im.paste(copie, (0, 0), niche)
X0, Y0, X1, Y1 = 2270, 2300, 2880, 3000
zone = im.crop((X0, Y0, X1, Y1)).resize(((X1 - X0) * S, (Y1 - Y0) * S), Image.LANCZOS)
d = ImageDraw.Draw(zone)
NEIGE = (251, 238, 211)
poly([(2462, 2796), (2500, 2772), (2560, 2758), (2630, 2752), (2690, 2748), (2745, 2742), (2790, 2752),
      (2820, 2768), (2850, 2780), (2880, 2786), (2880, 2990), (2462, 2990)], NEIGE)                   # le banc de neige et le sol
for x, y in ((2590, 2832), (2650, 2860), (2700, 2900), (2600, 2930)):                  # quelques traces dans la neige
    poly([(x, y), (x + 26, y), (x + 26, y + 6), (x, y + 6)], NOIR)
zone = zone.resize((X1 - X0, Y1 - Y0), Image.LANCZOS)
# les pierres du solage restent devant le mur, et la hache plantée plus bas aussi
masque = Image.new('L', (X1 - X0, Y1 - Y0), 0)
md = ImageDraw.Draw(masque)
md.polygon([(p[0] - X0, p[1] - Y0) for p in
    ((2270, 2684), (2392, 2684), (2420, 2730), (2476, 2808), (2478, 2848), (2420, 2890), (2270, 2890))], fill=255)
md.rectangle([0, 2950 - Y0, 2470 - X0, Y1 - Y0], fill=255)
zone.paste(src.crop((X0, Y0, X1, Y1)), (0, 0), masque)
im.paste(zone, (X0, Y0))
im.save(dst, quality=95)
print('ok', dst)
