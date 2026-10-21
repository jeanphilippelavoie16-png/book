"""Tome 3, Prélever : un lièvre d'Amérique en pelage d'été, assis au bord d'une grève au pied des épinettes de gauche,
vu de dos, la tête tournée vers le canot (JP, 18 octobre 2026 : « reprends la même image mais ajoute un lièvre qui
regarde le monde en canot de loin, à partir du bord de la plage »). Le reste de l'image ne change pas (au pixel près,
hors de la grève, de l'ombre et du lièvre).

    python3 lievre.py SOURCE SORTIE [--guide GUIDE.png]

SOURCE : images/tomes/titre-tome-3.jpg (3072 × 3840). SORTIE : JPEG qualité 95, même taille.
Dépendances, dans le dossier de ce script :
  - r2-A-jugg-i58-0.webp : le lièvre, repeint par AI Horde (img2img, Juggernaut XL, force 0,58, texte prompt-lino.txt)
    à partir de guide2-A.png (écrit par guide.py), le carré 768 : x 40 à 232, y 768 à 960, envoyé en 1024 × 1024 ;
  - r3-B-jugg-i55-1.webp : la grève, repeinte de la même façon (force 0,55) à partir de guide3-B.png, le rectangle
    768 : x 0 à 280, y 715 à 960, envoyé en 1024 × 896.
Chaque résultat est ramené aux encres de l'image (le brun noir des traits de l'eau, le papier, l'orange du soleil).
On garde du premier le lièvre seul (la tache foncée qui recouvre le lièvre du guide, avec ses entailles, coupée du
bout de branche qu'il touchait), du second la grève seule (le polygone de la grève, sans le lièvre qu'il avait
repeint). Le liseré orange ne reste que sur les bords du lièvre tournés vers la droite, du côté du soleil. Une ombre
courte, en aplat, pose le lièvre sur le sable.
--guide GUIDE.png : mode du guide (la grève dessinée, DX = 0) ; écrit aussi le rectangle de la grève en 1024 × 896.
C'est ainsi que guide3-B.png a été fait (avec un détourage du lièvre un peu plus simple qu'ici).
Coordonnées de l'image 768 × 960, multipliées par K × S (K = largeur / 768 ; S = 2, calcul à double taille)."""
import math, os, random, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi

ICI = os.path.dirname(os.path.abspath(__file__))
args = [a for a in sys.argv[1:]]
guide_out = None
if '--guide' in args:
    i = args.index('--guide'); guide_out = args[i + 1]; del args[i:i + 2]
src, dst = args
DX = 0 if guide_out else 3                             # le lièvre posé 3 px plus à droite que dans son guide : son cou
                                                       # ne touche plus le bout de la basse branche d'épinette
LIEVRE_RES, LIEVRE_BOITE = os.path.join(ICI, 'r2-A-jugg-i58-0.webp'), (40 + DX, 768, 232 + DX, 960)
GREVE_RES, GREVE_BOITE = os.path.join(ICI, 'r3-B-jugg-i55-1.webp'), (0, 715, 280, 960)
FONCE = np.array([32, 23, 8.]); CREME = np.array([230, 220, 186.]); ORANGE = np.array([245, 131, 44.])
VERT = np.array([29, 36, 31.]); SABLE = (214, 202, 166)
S = 2
im0 = Image.open(src).convert('RGB')
K = im0.width / 768
big = np.asarray(im0.resize((im0.width * S, im0.height * S), Image.LANCZOS)).astype(float)
k = lambda v: v * K * S


def bez(p0, p1, p2, p3, n=24):
    t = np.linspace(0, 1, n)[:, None]
    p0, p1, p2, p3 = map(np.array, (p0, p1, p2, p3))
    return list(map(tuple, (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3 * p3))


def chemin(segs):
    pts = []
    for s in segs:
        pts += bez(*s)[(1 if pts else 0):]
    return pts


def masque(pts):
    m = Image.new('L', (big.shape[1], big.shape[0]), 0)
    ImageDraw.Draw(m).polygon([(k(x), k(y)) for x, y in pts], fill=255)
    return np.asarray(m) > 127


def encres(res, boite, brute=False):
    """Le résultat de l'img2img, à double taille, posé dans le repère de l'image : la carte des encres (0 foncé,
    1 papier, 2 orange, -1 hors de la boîte), nettoyée des grains par un filtre de mode ; brute=True : sans le filtre."""
    X0, Y0, X1, Y1 = (int(round(k(v))) for v in boite)
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
if os.path.exists(GREVE_RES) and guide_out is None:
    carte = encres(GREVE_RES, GREVE_BOITE)
    # le lièvre que ce résultat a repeint s'efface (du sable à sa place) : le lièvre retenu se pose à l'étape 2
    autour = ndi.binary_dilation(lievre_g, iterations=int(k(9)))
    autour |= masque([(122 + 28 * math.cos(a), 919 + 9 * math.sin(a)) for a in np.linspace(0, 6.28, 40)])  # le pied
    labg, n = ndi.label(carte == 0)
    touche = np.unique(labg[autour & (labg > 0)])
    dehors = ndi.sum(~autour, labg, touche)            # la part de chaque tache hors de la zone du lièvre
    petites = touche[(touche > 0) & (dehors < 60 * k(1) ** 2)]
    carte[np.isin(labg, petites)] = 1                  # une petite tache qui touche la zone part au complet
    carte[(carte == 0) & autour] = 1                   # une grande (la ligne de l'eau) perd seulement ce qui y entre
    g = greve & (carte >= 0)
    c = carte[g]; c[c == 2] = 1                        # pas d'orange sur la grève
    big[g] = couleurs[c]
else:                                                  # le dessin du guide : sable, galets, sous-bois, ligne de l'eau
    R = random.Random(5)
    im = Image.fromarray(big.clip(0, 255).astype(np.uint8)); d = ImageDraw.Draw(im)
    P = lambda pts: [(k(x), k(y)) for x, y in pts]
    w = lambda v: max(1, int(round(k(v))))
    d.polygon(P(GREVE), fill=SABLE)
    # le pied des épinettes : une bordure sombre et ondulée, des touffes d'herbe et quelques roches à demi enfouies
    for _ in range(26):
        x = R.uniform(0, 96); y = 901 - x * 0.13 + R.uniform(-1, 3)
        for j in range(R.randint(3, 5)):
            a = math.radians(R.uniform(-35, 35)); L = R.uniform(4, 9)
            d.polygon(P([(x - 0.9, y), (x + L * math.sin(a), y - L * math.cos(a)), (x + 0.9, y)]), fill=tuple(FONCE.astype(int)))
    for (x, y, rx, ry) in ((14, 906, 7, 4), (52, 900, 6, 3.5), (84, 897, 5, 3)):
        d.ellipse(P([(x - rx, y - ry), (x + rx, y + ry)]), fill=(196, 182, 146), outline=tuple(FONCE.astype(int)), width=w(0.9))
    # les galets : de petits éclats foncés, plus gros et plus serrés vers le bas à gauche ; rien contre le lièvre
    zone_l = ndi.binary_dilation(lievre_g, iterations=int(k(6)))
    for _ in range(420):
        x = R.uniform(0, 290); y = R.uniform(904, 960)
        if not greve[min(int(k(y)), greve.shape[0] - 1), int(k(x))] or zone_l[min(int(k(y)), greve.shape[0] - 1), int(k(x))]:
            continue
        if not greve[int(k(y - 4)), int(k(x + 4))]:
            continue
        t = min(1, (y - 900) / 60 + (140 - x) / 400)
        if R.random() > 0.25 + 0.6 * t:
            continue
        r = 0.6 + 2.2 * t * R.uniform(0.5, 1.2)
        a0 = R.uniform(0, 6.28)
        pts = [(x + r * R.uniform(1.1, 1.6) * math.cos(a0 + a), y + r * R.uniform(0.6, 0.9) * math.sin(a0 + a))
               for a in np.linspace(0, 6.28, 7)[:-1]]
        d.polygon(P(pts), fill=tuple(FONCE.astype(int)))
    # l'ombre courte du lièvre, vers nous, à gauche (le soleil est derrière lui, à droite)
    d.ellipse(P([(CX - 26, BASE - 3), (CX + 4, BASE + 4)]), fill=tuple(FONCE.astype(int)))
    # la ligne de l'eau : le sable mouillé foncé, la vaguelette de papier, un trait d'eau qui la suit
    d.line(P(EAU), fill=tuple(FONCE.astype(int)), width=w(2.4))
    d.line(P([(x + 2.4, y - 2.8) for x, y in EAU[3:]]), fill=tuple(CREME.astype(int)), width=w(1.4))
    big = np.asarray(im).astype(float)

# ---- 2. l'ombre courte du lièvre sur le sable, vers nous et un peu à gauche (le soleil est derrière lui, à droite)
OMBRE = [(x + DX, y) for x, y in chemin([((144, 918.5), (139, 922), (128, 924.5), (114, 926.5)),
                                          ((114, 926.5), (104, 928), (97, 927.5), (98, 925.5)),
                                          ((98, 925.5), (102, 922.5), (114, 919), (126, 917))])]
if guide_out is None:
    big[masque(OMBRE)] = FONCE

# ---- 3. le lièvre ----
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
yy, xx = np.indices(lievre.shape)
lisere = (carte == 2) & zone & (dist <= k(1.6)) & (xx - ix > 0.6 * np.abs(yy - iy))
lievre_tout = lievre | lisere
c = carte[lievre_tout]; c[(c == 2) & ~lisere[lievre_tout]] = 0
big[lievre_tout] = couleurs[c]

# hors de la grève, de l'ombre et du lièvre, l'image reste l'originale au pixel près (l'aller-retour à double taille
# ne la touche pas)
touche = greve | lievre_tout
if guide_out is None:
    touche |= masque(OMBRE)
touche = ndi.binary_dilation(touche, iterations=4)
m = Image.fromarray((touche * 255).astype(np.uint8)).resize(im0.size, Image.BILINEAR)
m = Image.fromarray(((np.asarray(m) > 0) * 255).astype(np.uint8))
out = Image.fromarray(big.clip(0, 255).astype(np.uint8)).resize(im0.size, Image.LANCZOS)
out = Image.composite(out, im0, m)
out.save(dst, quality=95)
if guide_out:
    X0, Y0, X1, Y1 = (int(round(v * K)) for v in GREVE_BOITE)
    out.crop((X0, Y0, X1, Y1)).resize((1024, 896), Image.LANCZOS).save(guide_out)
print('ok', dst)
