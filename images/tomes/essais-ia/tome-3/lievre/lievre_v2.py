"""Tome 3, Prélever : version 2 du lièvre (corrections du juge sur la version « horde », 19 octobre 2026).
Le lièvre d'Amérique en pelage d'été, assis au bord d'une grève au pied des épinettes de gauche, vu de dos, la tête
tournée vers le canot (JP, 18 octobre 2026 : « reprends la même image mais ajoute un lièvre qui regarde le monde en
canot de loin, à partir du bord de la plage »). Le reste de l'image ne change pas (au pixel près, hors de la grève, de
l'ombre et du lièvre).

    python3 lievre_v2.py SOURCE SORTIE

SOURCE : images/tomes/titre-tome-3.jpg (3072 × 3840). SORTIE : JPEG qualité 95, même taille.
Dépendances, dans le dossier de ce script :
  - r2-A-jugg-i58-0.webp : le lièvre, repeint par AI Horde (img2img, Juggernaut XL, force 0,58, texte prompt-lino.txt)
    à partir de guide2-A.png (écrit par guide.py), le carré 768 : x 40 à 232, y 768 à 960, envoyé en 1024 × 1024 ;
  - r3-B-jugg-i55-1.webp : la grève, repeinte de la même façon (force 0,55) à partir de guide3-B.png (écrit par le
    mode --guide de lievre.py, la version 1), le rectangle 768 : x 0 à 280, y 715 à 960, envoyé en 1024 × 896.
Chaque résultat est ramené aux encres de l'image (le brun noir des traits de l'eau, le papier, l'orange du soleil).
On garde du premier la silhouette du lièvre, sa tête (l'œil cerclé, la bouche), le trait clair de l'oreille et la
collerette du cou ; du second la grève seule. Ce que la version 2 refait à la main, par-dessus :
  - la forme : le haut du dos aminci (les épaules descendent vers le cou), le grand pied arrière posé à plat, qui
    dépasse en avant à droite vers l'eau, et la cuisse gauche marquée par un arc d'entailles ;
  - les entailles du corps : de courts traits crème un peu courbes qui suivent le poil (vers le bas et vers
    l'arrière), serrés le long du bord ombre et de la cuisse, rares au milieu du dos, à la place des points ronds ;
  - un mince bord crème sur l'oreille de devant, qui s'arrête avant le bout pour laisser deviner le bout noir ;
  - l'ombre, plus courte d'un tiers, qui s'amincit et finit en quatre traits couchés ;
  - la crête de la grève au pied de l'épinette de gauche : plus de bande brun noir sous le vert noir, l'épinette de
    l'image d'origine descend jusqu'au sable ;
  - le lièvre agrandi de 10 % (E), autour du point où il touche le sable : 70 px de haut dans l'image 768 au lieu de 64,
    pour qu'il se lise à la taille de la page ; le nez reste à 7 px à gauche du bloc des tomes (x 160 à 596, y 800 à
    912 dans l'image 768), le bout du pied sous ce bloc.
Le liseré orange ne reste que sur les bords du lièvre tournés vers la droite, du côté du soleil.
Le calcul se fait sur le coin bas gauche seulement (CADRE), à double taille ; coordonnées de l'image 768 × 960,
multipliées par K × S (K = largeur / 768 ; S = 2)."""
import math, os, random, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi

ICI = os.path.dirname(os.path.abspath(__file__))
src, dst = sys.argv[1:3]
DX = 3                                                 # le lièvre posé 3 px plus à droite que dans son guide : son cou
                                                       # ne touche plus le bout de la basse branche d'épinette
LIEVRE_RES, LIEVRE_BOITE = os.path.join(ICI, 'r2-A-jugg-i58-0.webp'), (40 + DX, 768, 232 + DX, 960)
GREVE_RES, GREVE_BOITE = os.path.join(ICI, 'r3-B-jugg-i55-1.webp'), (0, 715, 280, 960)
FONCE = np.array([32, 23, 8.]); CREME = np.array([230, 220, 186.]); ORANGE = np.array([245, 131, 44.])
S = 2
CADRE = (0, 700, 330, 960)                             # le coin bas gauche, seule partie de l'image qu'on retouche
im0 = Image.open(src).convert('RGB')
K = im0.width / 768
C0 = tuple(int(round(v * K)) for v in CADRE)
coin0 = im0.crop(C0)
big = np.asarray(coin0.resize((coin0.width * S, coin0.height * S), Image.LANCZOS)).astype(float)
orig = big.copy()
k = lambda v: v * K * S                                # une longueur
kx = lambda x: (x - CADRE[0]) * K * S                  # une abscisse, une ordonnée
ky = lambda y: (y - CADRE[1]) * K * S
ux = lambda X: X / (K * S) + CADRE[0]                  # et le retour
uy = lambda Y: Y / (K * S) + CADRE[1]
yy, xx = np.indices(big.shape[:2])


def bez(p0, p1, p2, p3, n=24):
    t = np.linspace(0, 1, n)[:, None]
    p0, p1, p2, p3 = map(np.array, (p0, p1, p2, p3))
    return list(map(tuple, (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3 * p3))


def chemin(segs):
    pts = []
    for s in segs:
        pts += bez(*s)[(1 if pts else 0):]
    return pts


def masque(*polys):
    """Le masque d'un ou de plusieurs polygones (coordonnées 768)."""
    m = Image.new('L', (big.shape[1], big.shape[0]), 0)
    d = ImageDraw.Draw(m)
    for pts in polys:
        d.polygon([(kx(x), ky(y)) for x, y in pts], fill=255)
    return np.asarray(m) > 127


def trait(p0, p1, larg, courbe=0.0, n=16, entree=0.4, ligne=False):
    """Une entaille de gouge en V : un trait un peu courbe (courbe : la flèche de l'arc, en px 768, positive à gauche
    du sens du trait), pointu aux deux bouts, le plus large (larg) au premier tiers, là où la gouge entre.
    ligne=True : un trait d'épaisseur égale qui ne s'effile qu'au bout, comme les traits de l'eau de l'image."""
    p0, p1 = np.array(p0, float), np.array(p1, float)
    d = p1 - p0; L = np.hypot(*d); t_ = d / L; nrm = np.array([t_[1], -t_[0]])
    c = (p0 + p1) / 2 + nrm * courbe * 2
    t = np.linspace(0, 1, n)[:, None]
    p = (1 - t) ** 2 * p0 + 2 * (1 - t) * t * c + t ** 2 * p1
    dp = 2 * (1 - t) * (c - p0) + 2 * t * (p1 - c)
    nn = np.stack([dp[:, 1], -dp[:, 0]], 1) / np.hypot(dp[:, 0], dp[:, 1])[:, None]
    e = math.log(0.5) / math.log(entree)               # le profil : sin(pi * t^e), maximum à t = entree
    w = larg / 2 * np.sin(np.pi * t[:, 0] ** e) ** 0.8
    if ligne:
        tt = t[:, 0]
        w = larg / 2 * np.clip(np.sqrt(np.clip(tt / 0.06, 0, 1)) * np.clip((1 - tt) / 0.45, 0, 1) ** 0.8, 0, 1)
    return [tuple(v) for v in np.vstack([p + nn * w[:, None], (p - nn * w[:, None])[::-1]])]


def encres(res, boite, brute=False):
    """Le résultat de l'img2img, à double taille, posé dans le repère du coin : la carte des encres (0 foncé,
    1 papier, 2 orange, -1 hors de la boîte), nettoyée des grains par un filtre de mode ; brute=True : sans le filtre."""
    X0, Y0, X1, Y1 = int(round(kx(boite[0]))), int(round(ky(boite[1]))), int(round(kx(boite[2]))), int(round(ky(boite[3])))
    r = Image.open(res).convert('RGB').resize((X1 - X0, Y1 - Y0), Image.LANCZOS)
    hsv = np.asarray(r.convert('HSV')).astype(float) / 255
    H, Sa, V = hsv[..., 0] * 360, hsv[..., 1], hsv[..., 2]
    L = np.asarray(r).astype(float).mean(2) / 255
    orange = (H > 8) & (H < 50) & (Sa > 0.45) & (V > 0.55)
    clair = (L > 0.5) & ~orange
    carte = np.where(clair, 1, np.where(orange, 2, 0)).astype(np.uint8)
    if not brute:
        carte = np.asarray(Image.fromarray(carte * 100).filter(ImageFilter.ModeFilter(5))).astype(int) // 100
    pleine = np.full(big.shape[:2], -1, int)
    pleine[Y0:Y1, X0:X1] = carte
    return pleine


# ---- la grève : au pied des épinettes de gauche, de la ligne de l'eau jusqu'au bas de l'image ----
EAU = chemin([((98, 889), (112, 893), (124, 897), (136, 902)), ((136, 902), (156, 910), (190, 926), (222, 939)),
              ((222, 939), (246, 949), (268, 957), (292, 966))])
HAUT = chemin([((-6, 902), (24, 896), (60, 891), (98, 889))])
GREVE = HAUT + EAU + [(292, 966), (-6, 966)]
greve = masque(GREVE)

# ---- le lièvre du guide (repère de 100 unités, sol à 0, oreilles à -100), pour le retrouver dans le résultat ----
CORPS = chemin([((0, 0), (-14, 1), (-27, -2), (-28, -15)), ((-28, -15), (-29, -29), (-23, -41), (-15, -49)),
                ((-15, -49), (-11, -54), (-8, -58), (-6, -61)), ((-6, -61), (2, -62), (14, -58), (20, -50)),
                ((20, -50), (23, -40), (26, -27), (26, -14)), ((26, -14), (26, -2), (14, 1), (0, 0))])
TETE = chemin([((-7, -56), (-10, -64), (-7, -73), (2, -77)), ((2, -77), (11, -80), (21, -77), (27, -72)),
               ((27, -72), (31, -69), (33, -66), (32.5, -63)), ((32.5, -63), (32, -60), (29, -58.5), (26, -58)),
               ((26, -58), (22, -55), (16, -51), (8, -50)), ((8, -50), (0, -50), (-5, -52), (-7, -56))])
OREILLE_G = chemin([((-2, -70), (-7, -80), (-11, -91), (-11, -97)), ((-11, -97), (-11, -101), (-6, -101), (-4, -96)),
                    ((-4, -96), (-1, -88), (3, -79), (5, -73))])
OREILLE_D = chemin([((4, -73), (3, -83), (3, -94), (6, -99)), ((6, -99), (8, -102), (12, -101), (13, -96)),
                    ((13, -96), (14, -87), (13, -79), (12, -72))])
CX, BASE, TAILLE = 129 + DX, 918, 60
place = lambda pts: [(CX + x * TAILLE / 100, BASE + y * TAILLE / 100) for x, y in pts]
lievre_g = np.zeros(big.shape[:2], bool)
for part in (OREILLE_G, CORPS, TETE, OREILLE_D):
    lievre_g |= masque(place(part))

# ---- 1. la grève ----
couleurs = np.array([FONCE, CREME, ORANGE])
carte = encres(GREVE_RES, GREVE_BOITE)
# le lièvre que ce résultat a repeint s'efface (du sable à sa place) : le lièvre retenu se pose à l'étape 6
autour = ndi.binary_dilation(lievre_g, iterations=int(k(9)))
autour |= masque([(122 + 28 * math.cos(a), 919 + 9 * math.sin(a)) for a in np.linspace(0, 6.28, 40)])  # le pied
labg, n = ndi.label(carte == 0)
touche = np.unique(labg[autour & (labg > 0)])
dehors = ndi.sum(~autour, labg, touche)                # la part de chaque tache hors de la zone du lièvre
petites = touche[(touche > 0) & (dehors < 60 * k(1) ** 2)]
carte[np.isin(labg, petites)] = 1                      # une petite tache qui touche la zone part au complet
carte[(carte == 0) & autour] = 1                       # une grande (la ligne de l'eau) perd seulement ce qui y entre
# la crête de la grève au pied de l'épinette de gauche : le résultat y pose une bande brun noir sous le vert noir de
# l'épinette, une couture de ton ; là où l'image d'origine est l'épinette, on la garde jusqu'au sable, ailleurs la
# bande devient du sable
bande = Image.new('L', (big.shape[1], big.shape[0]), 0)
ImageDraw.Draw(bande).line([(kx(x), ky(y)) for x, y in HAUT], fill=255, width=int(k(2.4)))
bande = np.asarray(bande) > 127
labc, n = ndi.label((carte == 0) & greve)
ids = np.unique(labc[bande & (labc > 0)])
crete = np.isin(labc, ids[ids > 0]) & (uy(yy) < 902.5) & (ux(xx) < 66)   # la bande s'arrête à x = 63
epinette = orig.mean(2) < 110
carte[crete & ~epinette] = 1
g = greve & (carte >= 0) & ~(crete & epinette)
c = carte[g]; c[c == 2] = 1                            # pas d'orange sur la grève
big[g] = couleurs[c]
greve_peinte = g


# ---- 2. le lièvre du résultat ----
carte = encres(LIEVRE_RES, LIEVRE_BOITE)
brute = encres(LIEVRE_RES, LIEVRE_BOITE, brute=True)
zone = ndi.binary_dilation(lievre_g, iterations=int(k(5))) & (carte >= 0)
# la tache du lièvre se cherche sur la carte brute, où le liseré orange le sépare du bout de la branche d'épinette
lab, n = ndi.label((brute == 0) & zone)
garde = np.unique(lab[lievre_g & (lab > 0)])
lievre = ndi.binary_fill_holes(np.isin(lab, garde[garde > 0]))
# un pont mince (les poils du cou) le relie encore au bout de la branche : une ouverture le coupe, et on ne garde que
# le corps du lièvre et ce qui le borde de près
r = int(k(1.0))
coeur, _ = ndi.label(ndi.binary_erosion(lievre, iterations=r))
ids = np.unique(coeur[lievre_g & (coeur > 0)])
lievre &= ndi.binary_dilation(np.isin(coeur, ids[ids > 0]), iterations=r + 2)
lievre = ndi.binary_fill_holes(lievre)
# le liseré orange : seulement là où il borde le lièvre du côté droit (le soleil)
dist, (iy, ix) = ndi.distance_transform_edt(~lievre, return_indices=True)
lisere = (carte == 2) & zone & (dist <= k(1.6)) & (xx - ix > 0.6 * np.abs(yy - iy))
encre = np.full(big.shape[:2], -1, int)               # l'encre de chaque pixel du lièvre (-1 hors du lièvre)
encre[lievre] = carte[lievre]
encre[lievre & (encre == 2)] = 0
encre[lisere] = 2

# ---- 3. la forme reprise : on lit un lièvre d'Amérique, pas un œuf avec des oreilles ----
# (coordonnées 768 du lièvre tel qu'il est posé ; l'agrandissement E se fait à l'étape 4)
Xu, Yu = ux(xx), uy(yy)                                # chaque pixel, en coordonnées 768
R = random.Random(11)
fonce = encre == 0
# 3a. le haut du dos aminci d'environ 10 % : le bord gauche, entre le cou et le plus large du corps, se resserre vers la
# droite, et les épaules descendent vers le cou au lieu de faire une boule ; le bord droit (la poitrine) ne bouge pas
YA, YB, AMPL, XR, XL0 = 883.0, 906.5, 2.9, 146.0, 114.0
dxw = np.where((Yu > YA) & (Yu < YB), AMPL * np.sin(np.pi * np.clip((Yu - YA) / (YB - YA), 0, 1)) ** 1.3, 0.0)
a = dxw / (XR - XL0)
Xs = np.where(Xu < XR, (Xu - a * XR) / (1 - a), Xu)
plein = ndi.binary_fill_holes(encre >= 0) & (encre != 2)  # la silhouette pleine, sans ses entailles ni le liseré
tire = ndi.map_coordinates(ndi.gaussian_filter(plein.astype(float), 1.2), [yy.astype(float), kx(Xs)], order=1) > 0.5
encre[(dxw > 0.05) & (Xu < XR) & (Xu > 105) & plein & ~tire] = -1
# 3b. le corps sous le cou : les points ronds du résultat partent ; la tête (l'œil cerclé, la bouche), le trait clair
# de l'oreille et la collerette du cou, plus haut, restent
corps = (encre >= 0) & (Yu > 884.5)
encre[corps & (encre == 1)] = 0
# 3c. le grand pied arrière, posé à plat, qui dépasse en avant à droite vers l'eau, sous la poitrine : environ 13 px
# du talon (caché sous le corps) aux orteils, le cinquième de la hauteur du lièvre ; la plante un peu plus haute au
# bout qu'au talon, parce que le pied s'éloigne vers l'eau
PIED = chemin([((139.5, 915.2), (143.5, 915.2), (147.6, 915.3), (151.0, 915.45)),      # le dessus, jusqu'aux orteils
               ((151.0, 915.45), (153.3, 915.5), (154.3, 916.4), (154.2, 917.3)),      # le bout, large et arrondi (le
               ((154.2, 917.3), (154.1, 918.3), (152.8, 918.65), (148.6, 918.8)),      # pied à neige) ; la plante, à plat
               ((148.6, 918.8), (144.8, 919.0), (141.0, 919.3), (138.6, 919.0)),       # le talon, qui rentre sous le corps
               ((138.6, 919.0), (137.4, 918.6), (137.6, 916.0), (139.5, 915.2))])
pied = masque(PIED)
encre[pied] = 0
fonce = encre == 0
# 3d. les entailles : de courts traits crème un peu courbes qui suivent le poil, vers le bas et vers l'arrière (la
# gauche) ; serrés le long du bord ombre et de l'arc de la cuisse, rares au milieu du dos
entailles, axes = [], []


def entaille(p0, p1, larg, courbe, ecart=0.95):
    """Ajoute une entaille si elle ne touche pas les autres (ecart : la distance minimale entre les axes, px 768)."""
    p0, p1 = np.array(p0, float), np.array(p1, float)
    axe = p0 + (p1 - p0) * np.linspace(0, 1, 9)[:, None]
    if axes:
        tous = np.vstack(axes)
        if np.min(np.hypot(*(axe[:, None, :] - tous[None, :, :]).transpose(2, 0, 1))) < ecart:
            return
    axes.append(axe)
    entailles.append(trait(p0, p1, larg, courbe=courbe, entree=0.3))


# l'arc de la cuisse gauche, d'abord : c'est lui qui fait lire la croupe ronde
cxq, cyq, rxq, ryq = 124.4, 911.0, 9.0, 8.3            # le centre et les rayons de la cuisse
for rr, pas, L0, L1, larg, dep, fin in ((1.0, 4.1, 3.3, 3.6, 0.58, 0.4, 370), (0.79, 3.8, 2.0, 2.4, 0.46, 2.4, 336)):
    th = math.radians(197) + dep / (rr * (rxq + ryq) / 2)
    while th < math.radians(fin):
        rj = rr * R.uniform(0.98, 1.02)
        p0 = np.array([cxq + rj * rxq * math.cos(th), cyq + rj * ryq * math.sin(th)])
        tg = np.array([-rxq * math.sin(th), ryq * math.cos(th)]); tg /= np.hypot(*tg)
        tg = tg + np.array([0, 0.12]); tg /= np.hypot(*tg)  # le poil tire un peu vers le bas
        L = R.uniform(L0, L1)
        entaille(p0 - tg * L * 0.45, p0 + tg * L * 0.55, larg * R.uniform(0.9, 1.1), 0.2, ecart=0.3)
        th += pas * R.uniform(0.92, 1.08) / (rr * (rxq + ryq) / 2)
# le bord gauche, côté ombre : on suit le contour du cou jusqu'au sol, en trois rangs de plus en plus clairsemés
lignes = np.arange(885.0, 916.0, 0.25)
bord = []
for y in lignes:
    row = np.nonzero(fonce[int(round(ky(y))), int(kx(100)):int(kx(150))])[0]
    bord.append(ux(row[0] + int(kx(100))) if len(row) else np.nan)
P = np.stack([ndi.gaussian_filter1d(np.array(bord), 6), lignes], 1)
dP = np.gradient(P, axis=0); T = dP / np.hypot(dP[:, 0], dP[:, 1])[:, None]
N = np.stack([T[:, 1], -T[:, 0]], 1)                   # vers l'intérieur (la droite)
sl = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(P, axis=0).T))])
for off, pas, L0, L1, larg, dep, ybas in ((1.0, 3.9, 2.8, 3.3, 0.5, 0.6, 914.5), (2.2, 4.0, 2.2, 2.7, 0.45, 2.6, 904.0),
                                          (3.4, 5.2, 1.8, 2.3, 0.42, 1.2, 899.5)):
    s_ = dep
    while s_ < sl[-1] - 1.5 and P[int(np.searchsorted(sl, s_)), 1] < ybas:
        i = int(np.searchsorted(sl, s_)); L = R.uniform(L0, L1)
        ang = math.radians(R.uniform(-3, 9))           # un peu plus vers l'arrière que le contour
        t = T[i]; t = np.array([t[0] * math.cos(ang) - t[1] * math.sin(ang), t[0] * math.sin(ang) + t[1] * math.cos(ang)])
        c = P[i] + N[i] * (off + R.uniform(-0.2, 0.2))
        entaille(c - t * L * 0.45, c + t * L * 0.55, larg * R.uniform(0.9, 1.1), -0.18, ecart=0.75)
        s_ += pas * R.uniform(0.9, 1.1)
# le milieu du dos : quelques entailles seulement
for (x, y) in ((131.5, 889.5), (138.0, 892.0), (128.5, 896.0), (134.5, 898.0), (140.5, 899.0), (131.0, 902.0),
               (137.5, 905.0), (142.8, 893.5), (141.5, 909.0)):
    L = R.uniform(2.6, 3.2); ang = math.radians(R.uniform(100, 110))
    entaille((x, y), (x + math.cos(ang) * L, y + math.sin(ang) * L), 0.42, -0.15, ecart=1.3)
dedans = ndi.binary_erosion(fonce, iterations=int(k(0.55))) & corps & ~ndi.binary_dilation(pied, iterations=int(k(0.5)))
encre[masque(*entailles) & dedans] = 1
# 3e. l'oreille de devant (la droite) : un mince bord crème le long de son bord droit, qui s'arrête au dernier
# cinquième pour laisser deviner le bout noir
bord_o = []
for y in np.arange(859.6, 869.4, 0.25):
    row = np.nonzero(encre[int(round(ky(y))), int(kx(133.6)):int(kx(141.5))] == 0)[0]
    bord_o.append((ux(row[-1] + int(kx(133.6))) - 0.6, y))
bord_o = np.array(bord_o); bord_o[:, 0] = ndi.gaussian_filter1d(bord_o[:, 0], 3)
w = 0.34 * np.clip((bord_o[:, 1] - 859.6) / 1.6, 0, 1) ** 0.7 * np.clip((869.4 - bord_o[:, 1]) / 1.0, 0, 1) ** 0.5
gauche, droite = bord_o.copy(), bord_o.copy(); gauche[:, 0] -= w / 2; droite[:, 0] += w / 2
encre[masque([tuple(v) for v in np.vstack([gauche, droite[::-1]])]) & (encre == 0)] = 1
# 3f. le liseré orange suit la nouvelle silhouette (le dos aminci est du côté de l'ombre, il n'en a pas) et gagne le
# bout du pied, tourné vers le soleil
fonce = encre == 0
dist, (iy, ix) = ndi.distance_transform_edt(~fonce, return_indices=True)
ang = np.degrees(np.arctan2(Yu - 917.0, Xu - 152.6))  # vu du centre du bout du pied
encre[(encre < 0) & (dist > 0) & (dist <= k(0.75)) & (Xu > 152.6) & (ang > -75) & (ang < 50) & (Yu > 914.5)] = 2
encre[(encre == 2) & (dist > k(1.7))] = -1

# ---- 4. l'agrandissement (E), autour du point où le lièvre touche le sable ----
E = 1.1
PIVOT = (132.0, 919.5)
H = lambda pts: [(PIVOT[0] + (x - PIVOT[0]) * E, PIVOT[1] + (y - PIVOT[1]) * E) for x, y in pts]
if E != 1.0:
    sx, sy = kx(PIVOT[0] + (Xu - PIVOT[0]) / E), ky(PIVOT[1] + (Yu - PIVOT[1]) / E)
    couches = [ndi.map_coordinates((encre == v).astype(float), [sy, sx], order=1) for v in (-1, 0, 1, 2)]
    encre = np.argmax(np.stack(couches), 0) - 1

# ---- 5. l'ombre courte du lièvre sur le sable, vers nous et un peu à gauche (le soleil est derrière lui, à droite) :
# un coin qui part de sous le lièvre et s'amincit ; trois entailles couchées le fendent au bout, qui finit ainsi en
# quatre traits, comme une ombre gravée
OMBRE = chemin([((143.5, 917.0), (136, 917.6), (124, 918.0), (119.6, 916.8)),         # le bord du haut, sous le lièvre
                ((119.6, 916.8), (117.0, 918.0), (112.0, 919.5), (107.2, 921.1)),     # jusqu'à la pointe
                ((107.2, 921.1), (106.8, 921.3), (107.0, 921.5), (107.4, 921.5)),
                ((107.4, 921.5), (112.0, 922.5), (118.0, 923.4), (126.0, 923.6)),     # le bord du bas
                ((126.0, 923.6), (133.0, 923.2), (138.6, 921.6), (141.4, 919.9)),     # qui remonte sous le talon
                ((141.4, 919.9), (142.6, 919.0), (143.6, 918.0), (143.5, 917.0))])
FENTES = [((104.5, 920.55), (120.2, 919.75), 0.44), ((104.0, 921.45), (123.2, 920.75), 0.48),
          ((104.5, 922.15), (119.6, 921.85), 0.44)]           # du sable jusqu'à leur pointe, dans l'ombre
ombre = masque(H(OMBRE)) & ~masque(*[trait(*H([a, b]), w * E, ligne=True) for a, b, w in FENTES])
big[ombre & (encre < 0)] = FONCE

# ---- 6. le lièvre peint ----
lievre_tout = encre >= 0
big[lievre_tout] = couleurs[encre[lievre_tout]]

# hors de la grève, de l'ombre et du lièvre, l'image reste l'originale au pixel près
touche = ndi.binary_dilation(greve_peinte | ombre | lievre_tout, iterations=4)
m = Image.fromarray((touche * 255).astype(np.uint8)).resize(coin0.size, Image.BILINEAR)
m = Image.fromarray(((np.asarray(m) > 0) * 255).astype(np.uint8))
coin = Image.fromarray(big.clip(0, 255).astype(np.uint8)).resize(coin0.size, Image.LANCZOS)
out = im0.copy()
out.paste(Image.composite(coin, coin0, m), C0[:2])
out.save(dst, quality=95)
print('ok', dst)
