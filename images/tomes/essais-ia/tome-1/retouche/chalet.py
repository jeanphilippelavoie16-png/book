"""Tome 1, page de titre : le chalet, sa cheminée, sa porte et sa clôture (zone 335,705 à 520,800 en 768 x 960 ; la
fumée monte au-dessus, jusqu'à 686). Retouche demandée par JP le 19 octobre 2026 : « la même image, avec la rigueur des
autres tomes ».

Le même chalet, au même endroit, avec la même silhouette et les mêmes encres, redessiné en vectoriel à pleine taille,
comme l'intérieur de l'atelier du tome 6 (retouche_atelier.py), avec un peu de main dans le trait :
- les rondins : des lignes crème taillées sur le noir, horizontales et régulières, six rondins par mur ; leurs bouts
  ronds sortent aux deux coins de devant (anneaux crème) et au coin du fond (bouts noirs qui dépassent sur la neige) ;
- le pignon : en planches debout, sous une sablière ;
- la neige du toit : une forme nette, épaisse au bord, un peu en débord de l'avant-toit, sans la bosse de gauche ; un
  filet de neige sur la rive de gauche ; une ombre noire sous l'avant-toit ;
- la cheminée : un tuyau, son chapeau sur deux pattes et un peu de neige dessus ; une fumée courte, trois volutes
  crème bleuté (la leçon du tome 6 : une fumée longue tourne à l'éclair) ;
- la porte : à sa place et dans son orange, avec son cadre noir cerné de crème, trois planches, deux traverses, une
  poignée ; devant elle, une lueur courte en traits orange taillés sur la neige ;
- la clôture : des poteaux réguliers coiffés de neige, deux perches nettes, une fin propre (plus de poteau détaché ni
  de fil) ;
- une ombre nette au pied du chalet (le même bleu pâle et le même tracé que les ombres de neige.py).

L'ancien chalet (son noir, ses blancs, le liseré clair de l'agrandissement autour) est d'abord rebouché avec le fond
voisin : la nuit de la rangée au-dessus de l'horizon, la neige du champ au-dessous. Rien ne bouge hors de l'ancien
chalet et du nouveau.

    from chalet import appliquer ; b = appliquer(a, 4)      (a : numpy RVB uint8, 3072 x 3840 ; K pixels par unité)
    python3 chalet.py entree.png sortie.png
"""
import math
import random
import numpy as np
from scipy import ndimage as ndi
from PIL import Image, ImageDraw

NOIR = np.array([6, 17, 31], np.float32)          # le noir des épinettes et du chalet (#06111F)
ORANGE = np.array([254, 137, 17], np.float32)     # l'orange de la porte, mesuré (#FE8911)
FUMEE = np.array([192, 207, 219], np.float32)     # la fumée, crème bleuté
COLLINE = np.array([20, 48, 72], np.float32)      # le bleu des collines, d'où vient le bleu des ombres (neige.py)
T_CLAIR = 0.10                                     # part du bleu des collines dans l'ombre (neige.py)
SS = 4                                             # suréchantillonnage du dessin

BOITE = (335, 684, 522, 803)                       # le dessin (unités) : la zone, plus la fumée au-dessus
# l'ancien chalet (toit, murs, cheminée, bosse), rebouché en entier
ANCIENNE_MAISON = [(359.5, 773.0), (361.5, 779.0), (370.5, 779.0), (370.5, 797.5), (429.0, 798.0), (453.5, 797.0),
                   (456.0, 793.0), (456.0, 775.0), (459.5, 770.5), (459.5, 763.0), (456.5, 756.0), (448.0, 744.5),
                   (439.0, 737.0), (430.5, 735.5), (430.5, 710.5), (412.5, 710.5), (412.5, 731.0), (401.0, 729.0),
                   (389.5, 732.0), (384.0, 738.5)]
# la nuit autour de la cheminée et du toit, que la retouche des collines laisse telle quelle (CHALET de collines.py) :
# elle est refaite avec la nuit d'à côté, pour qu'aucune marche ne se voie
NUIT_CHALET = [(406, 703), (438, 703), (438, 728), (470, 728), (470, 765), (370, 765), (370, 728), (406, 728)]
# la clôture : dans ce contour, tout ce qui est foncé est l'ancienne clôture (la trace commence à gauche de 337)
ANCIENNE_CLOTURE = [(337.5, 776.0), (372.0, 776.0), (372.0, 800.0), (337.5, 800.0)]
ANCIENNE_CLOTURE_D = [(451.0, 777.0), (521.0, 777.0), (521.0, 800.5), (451.0, 800.5)]
# l'horizon derrière le chalet : au-dessus, la nuit de la rangée ; au-dessous, le champ
HORIZON = [(335, 734.5), (360, 736.0), (387, 739.5), (420, 742.0), (440, 744.0), (460, 749.5), (522, 751.0)]
# l'ombre au pied du chalet : le tracé de neige.py, remonté jusqu'au bas des murs (sinon le chalet flotte)
OMBRE = [(372.0, 796.0), (453.0, 795.4), (455.4, 796.4), (452.0, 798.4), (420.0, 800.2), (380.0, 800.8),
         (362.0, 800.0), (366.0, 797.4)]

# --------------------------------------------------------------------------- la géométrie du chalet (unités)
BAS = 796.6                  # le bas des murs
MUR_G, MUR_D = 373.2, 427.6  # le mur de devant (le pignon)
SABLIERE = 770.2             # le haut du mur de devant, le bas du pignon
SOMMET = (398.0, 744.2)      # la pointe du pignon (dedans)
FOND_X = 452.6               # le coin du fond du mur de côté
POTEAUX = [(340.5, 781.0), (352.5, 780.7), (364.4, 781.2), (466.4, 781.1), (482.2, 780.7), (498.0, 781.0),
           (514.0, 781.3)]
PORTE = (395.7, 773.4, 406.5, 792.4)


def _cubique(p0, c1, c2, p1, n=24):
    t = np.linspace(0, 1, n)[:, None]
    p0, c1, c2, p1 = map(np.asarray, (p0, c1, c2, p1))
    return (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * c1 + 3 * (1 - t) * t ** 2 * c2 + t ** 3 * p1


def _quad(p0, c, p1, n=16):
    t = np.linspace(0, 1, n)[:, None]
    p0, c, p1 = map(np.asarray, (p0, c, p1))
    return (1 - t) ** 2 * p0 + 2 * (1 - t) * t * c + t ** 2 * p1


def _trait(pts, ep, effile=(0.25, 0.25), n=40):
    """Un trait de gouge le long d'une ligne : épaisseur ep, effilé aux deux bouts (part de la longueur)."""
    pts = np.asarray(pts, float)
    d = np.diff(pts, axis=0)
    s = np.concatenate([[0], np.cumsum(np.hypot(d[:, 0], d[:, 1]))])
    u = np.linspace(0, s[-1], n)
    x = np.interp(u, s, pts[:, 0]); y = np.interp(u, s, pts[:, 1])
    tx = np.gradient(x); ty = np.gradient(y)
    nn = np.hypot(tx, ty) + 1e-9
    nx, ny = -ty / nn, tx / nn
    v = u / s[-1]
    a, b = effile
    w = np.ones(n)
    if a > 0:
        w = np.minimum(w, np.clip(v / a, 0, 1) ** 0.6)
    if b > 0:
        w = np.minimum(w, np.clip((1 - v) / b, 0, 1) ** 0.6)
    w = np.maximum(w * ep / 2, 0.08)
    return np.concatenate([np.stack([x + nx * w, y + ny * w], 1), np.stack([x - nx * w, y - ny * w], 1)[::-1]])


def _croissant(courbe, ep, n=40):
    """Une volute de fumée : un trait courbe, épais au milieu, pointu aux deux bouts."""
    return _trait(courbe, ep, (0.5, 0.5), n)


def _ellipse(cx, cy, rx, ry, n=36):
    t = np.linspace(0, 2 * np.pi, n, endpoint=False)
    return np.stack([cx + rx * np.cos(t), cy + ry * np.sin(t)], 1)


def _rect(x0, y0, x1, y1):
    return [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]


def dessin():
    """Le chalet, en couches de polygones (unités) : [(couleur, [polygones])], dans l'ordre où on les pose."""
    R = random.Random(1907)
    j = lambda a=0.12: R.uniform(-a, a)                 # un peu de main dans le trait
    noir, creme, orange, fumee = [], [], [], []
    couches = []

    # -- la cheminée : le tuyau (sous la neige du toit), son reflet, le chapeau sur deux pattes, la neige dessus
    tx0, tx1 = 419.6, 423.6
    noir.append(_rect(tx0, 717.4, tx1, 739.0))
    noir.append([(417.0, 716.3), (426.2, 716.3), (424.4, 714.5), (418.8, 714.5)])          # le chapeau
    noir.append(_rect(420.0, 716.0, 420.55, 717.8))                                          # les pattes
    noir.append(_rect(422.65, 716.0, 423.2, 717.8))
    noir.append(_rect(tx0 - 0.35, 717.2, tx1 + 0.35, 718.3))                                 # la bague du haut
    couches.append(('noir', noir)); noir = []
    creme.append(_trait([(422.75, 719.6), (422.85, 727.0), (422.9, 733.5)], 0.6, (0.15, 0.3)))   # le reflet, côté lune
    creme.append(np.concatenate([_cubique((418.4, 714.6), (418.6, 713.0), (421.5, 712.4), (422.9, 712.7), 14),
                                 _cubique((422.9, 712.7), (424.3, 712.9), (424.9, 713.6), (424.9, 714.6), 10)]))
    couches.append(('creme', creme)); creme = []
    # la fumée : une colonne courte de bouffées qui se fondent l'une dans l'autre (leur bord fait des bosses), qui
    # grossit en montant et penche à gauche
    axe = _cubique((421.4, 710.6), (421.6, 705.0), (416.4, 701.0), (415.2, 692.6), 80)
    d_ = np.diff(axe, axis=0)
    sa = np.concatenate([[0], np.cumsum(np.hypot(d_[:, 0], d_[:, 1]))])
    pos = 0.0; k_ = 0
    while pos < sa[-1]:
        t = pos / sa[-1]
        r_ = 1.2 + 1.9 * t ** 0.9
        c = axe[int(np.searchsorted(sa, pos)) if pos < sa[-1] else -1]
        dx = (0.36 if k_ % 2 else -0.36) * r_
        fumee.append(_ellipse(c[0] + dx, c[1], r_ * 1.05, r_ * 0.9, 40))
        pos += max(1.2, 0.78 * r_); k_ += 1
    couches.append(('fumee', fumee)); fumee = []

    # -- le mur de côté (à droite) et ses rondins
    haut_c = lambda x: 773.4 + (771.0 - 773.4) * (x - MUR_D) / (FOND_X - MUR_D)          # sous l'avant-toit
    bas_c = lambda x: BAS + (795.8 - BAS) * (x - MUR_D) / (FOND_X - MUR_D)
    noir.append([(MUR_D, haut_c(MUR_D)), (FOND_X, haut_c(FOND_X)), (FOND_X, bas_c(FOND_X)), (MUR_D, bas_c(MUR_D))])
    # les bouts des rondins qui dépassent au coin du fond, sur la neige
    for k in range(6):
        ya = haut_c(FOND_X) + 1.9 + k * (bas_c(FOND_X) - haut_c(FOND_X) - 1.9) / 6
        yb = ya + (bas_c(FOND_X) - haut_c(FOND_X) - 1.9) / 6 - 0.55
        noir.append(np.concatenate([[(FOND_X - 0.5, ya)], _quad((FOND_X + 0.6, ya), (FOND_X + 2.0, (ya + yb) / 2),
                                                                (FOND_X + 0.6, yb), 10), [(FOND_X - 0.5, yb)]]))
    # -- le mur de devant et le pignon (un seul noir)
    noir.append([(MUR_G, BAS), (MUR_G, SABLIERE), SOMMET, (MUR_D + 0.6, SABLIERE + 1.2), (MUR_D + 0.6, BAS)])
    # -- les rives du toit : la rive gauche (épaisse, avec son bout de chevron) et la rive droite
    noir.append([(396.6, 734.4), (399.3, 736.6), (366.0, 777.4), (364.0, 777.6), (362.4, 776.4), (362.6, 774.9)])
    noir.append([(396.6, 734.4), (399.3, 736.6), (430.0, 773.4), (428.4, 775.2), (426.6, 774.9)])
    couches.append(('noir', noir)); noir = []

    # les rondins du devant : des lignes crème, de part et d'autre de la porte
    hauteur = (BAS - SABLIERE) / 6
    for k in range(1, 6):
        y = SABLIERE + k * hauteur + j(0.1)
        creme.append(_trait([(MUR_G + 2.6 + j(), y + j(0.08)), (PORTE[0] - 2.3 + j(), y + j(0.08))], 0.85, (0.06, 0.08)))
        creme.append(_trait([(PORTE[2] + 2.3 + j(), y + j(0.08)), (MUR_D - 2.4 + j(), y + j(0.08))], 0.85, (0.08, 0.06)))
    # les rondins du côté : les lignes suivent la fuite du mur ; le haut reste noir (l'ombre de l'avant-toit)
    for k in range(1, 6):
        f = k / 6
        ya = haut_c(MUR_D) + 2.2 + f * (bas_c(MUR_D) - haut_c(MUR_D) - 2.2)
        yb = haut_c(FOND_X) + 1.9 + f * (bas_c(FOND_X) - haut_c(FOND_X) - 1.9)
        xa, xb = MUR_D + 2.7, FOND_X - 1.0
        creme.append(_trait([(xa + j(), ya + j(0.08)), ((xa + xb) / 2, (ya + yb) / 2 + j(0.1)), (xb + j(), yb + j(0.08))],
                            0.8, (0.05, 0.08)))
    # la sablière, sous le pignon
    creme.append(_trait([(MUR_G + 1.4, SABLIERE + 0.1), (MUR_D - 1.2, SABLIERE + 0.1)], 0.7, (0.03, 0.03)))
    # les planches debout du pignon, dans le triangle (à 1,3 unité des rives)
    gx = lambda y, cote: SOMMET[0] + (MUR_G - SOMMET[0] if cote < 0 else MUR_D - SOMMET[0]) * (y - SOMMET[1]) / (
        SABLIERE - SOMMET[1])
    for x in np.arange(380.0, 425.0, 4.4):
        # le haut de la planche : là où elle touche la rive (moins une marge)
        if x <= SOMMET[0]:
            yh = SOMMET[1] + (x - SOMMET[0]) / (MUR_G - SOMMET[0]) * (SABLIERE - SOMMET[1])
        else:
            yh = SOMMET[1] + (x - SOMMET[0]) / (MUR_D - SOMMET[0]) * (SABLIERE - SOMMET[1])
        yh += 2.4
        if SABLIERE - 1.4 - yh > 1.5:
            creme.append(_trait([(x + j(0.08), yh), (x + j(0.08), SABLIERE - 1.4)], 0.6, (0.12, 0.04)))
    # le filet sous les rives (le bord du pignon taillé en crème)
    creme.append(_trait([(397.6, 740.7), (380.0, 760.2), (368.4, 773.3)], 0.6, (0.04, 0.2)))
    creme.append(_trait([(399.0, 741.6), (414.0, 759.5), (426.4, 773.4)], 0.55, (0.04, 0.2)))
    # le filet de neige sur la rive gauche (le pan de gauche, qu'on voit par la tranche)
    creme.append(_trait([(395.6, 734.4), (385.0, 746.0), (372.0, 760.6)], 1.0, (0.08, 0.5)))
    # les bouts ronds des rondins aux deux coins de devant : des anneaux crème sur le noir
    for k in range(6):
        y = SABLIERE + (k + 0.5) * hauteur
        for x in (MUR_G - 0.2, MUR_D + 0.5):
            noir.append(_ellipse(x, y, 1.95, 1.85))
    couches.append(('creme', creme)); creme = []
    couches.append(('noir', noir)); noir = []
    for k in range(6):
        y = SABLIERE + (k + 0.5) * hauteur
        for x in (MUR_G - 0.2, MUR_D + 0.5):
            anneau = np.concatenate([_ellipse(x, y, 1.3, 1.22), _ellipse(x, y, 0.82, 0.76)[::-1]])
            creme.append(anneau)

    # -- la porte : le cadre noir cerné de crème, l'orange, les planches, les traverses, la poignée
    px0, py0, px1, py1 = PORTE
    creme.append(np.concatenate([np.array(_rect(px0 - 1.75, py0 - 1.6, px1 + 1.75, py1 + 0.9)),
                                 np.array(_rect(px0 - 1.25, py0 - 1.1, px1 + 1.25, py1 + 0.9))[::-1]]))
    couches.append(('creme', creme)); creme = []
    noir.append(_rect(px0 - 1.25, py0 - 1.1, px1 + 1.25, py1 + 0.9))
    couches.append(('noir', noir)); noir = []
    orange.append(_rect(px0, py0, px1, py1))
    couches.append(('orange', orange)); orange = []
    for f in (0.25, 0.5, 0.75):                                   # les joints des quatre planches
        x = px0 + f * (px1 - px0) + j(0.06)
        noir.append(_rect(x - 0.16, py0 + 0.1, x + 0.16, py1))
    noir.append(_rect(px1 - 1.9, (py0 + py1) / 2 + 0.2, px1 - 0.7, (py0 + py1) / 2 + 0.75))   # la poignée
    noir.append(_ellipse(px1 - 1.9, (py0 + py1) / 2 + 0.47, 0.42, 0.42))
    couches.append(('noir', noir)); noir = []

    # -- la neige du toit : une forme nette, épaisse au bord, en débord de l'avant-toit ; son contour noir au fond
    faite = [(399.6, 735.8), (404.0, 733.7), (410.0, 733.1), (416.5, 732.9)]
    tuyau_g = [(tx0 - 0.2, 732.9), (tx0 - 0.1, 737.4), (tx1 + 0.1, 737.4), (tx1 + 0.2, 733.0)]
    dos = _cubique((tx1 + 0.2, 733.0), (437.0, 733.6), (450.5, 746.5), (456.4, 760.5), 30)
    bout = _cubique((456.4, 760.5), (458.6, 765.8), (458.4, 771.6), (454.8, 772.3), 16)    # le bord épais, arrondi
    rive = _cubique((454.8, 772.3), (446.0, 772.9), (436.0, 773.6), (429.8, 774.3), 16)
    pied = [(428.8, 773.6), (400.2, 737.6)]
    toit = np.concatenate([np.array(faite), np.array(tuyau_g), dos, bout, rive, np.array(pied)])
    creme.append(toit)
    couches.append(('creme', creme)); creme = []
    # le contour noir du dos du toit (sur le champ, la neige du toit ne se verrait pas)
    noir.append(_trait(np.concatenate([dos[8:], bout]), 1.1, (0.12, 0.04)))
    # l'avant-toit : la bordure noire sous la neige, et son ombre sur le haut du mur
    noir.append(np.concatenate([rive, np.array([(429.6, 776.0), (446.0, 775.0), (455.4, 773.9)])]))
    # le faîte : un trait noir fin sous la neige, de la pointe au tuyau
    noir.append(_trait([(400.4, 736.6), (408.0, 735.0), (tx0 - 0.3, 735.4)], 0.55, (0.05, 0.05)))
    couches.append(('noir', noir)); noir = []
    # le dessus du tuyau qui sort de la neige (redessiné par-dessus le toit)
    noir.append(_rect(tx0, 731.0, tx1, 735.6))
    noir.append(_cubique((tx0 - 0.6, 735.6), (tx0, 734.6), (tx1, 734.6), (tx1 + 0.6, 735.6), 10))
    couches.append(('noir', noir)); noir = []
    creme.append(_trait([(422.8, 731.4), (422.9, 734.2)], 0.6, (0.1, 0.4)))
    couches.append(('creme', creme)); creme = []

    # -- la clôture : poteaux réguliers coiffés de neige, deux perches nettes, une fin propre
    def poteau(x, haut, bas_=796.6, w=1.45):
        # le poteau, le haut arrondi un peu plus large : la calotte de neige s'y taille
        noir.append(np.concatenate([[(x - w / 2 + 0.1, bas_)], [(x - w / 2, haut + 1.0)],
                                    _cubique((x - w / 2 - 0.25, haut + 0.9), (x - w / 2 - 0.25, haut - 0.4),
                                             (x + w / 2 + 0.25, haut - 0.4), (x + w / 2 + 0.25, haut + 0.9), 16),
                                    [(x + w / 2, haut + 1.0)], [(x + w / 2 - 0.1, bas_)]]))
    def perche(x0, x1, y, ep=1.15):
        noir.append(_trait([(x0, y + j(0.1)), ((x0 + x1) / 2, y + 0.25 + j(0.1)), (x1, y + j(0.1))], ep, (0.02, 0.02)))
    perche(338.9, MUR_G - 1.0, 787.8)
    perche(338.9, MUR_G - 1.0, 792.6)
    for x, h in POTEAUX[:3]:
        poteau(x, h)
    perche(FOND_X + 1.0, 515.2, 787.9)
    perche(FOND_X + 1.0, 515.2, 792.5)
    for x, h in POTEAUX[3:]:
        poteau(x, h)
    couches.append(('noir', noir)); noir = []
    for x, h in POTEAUX:
        creme.append(np.concatenate([_cubique((x - 0.62, h + 0.62), (x - 0.6, h - 0.05), (x + 0.6, h - 0.05),
                                              (x + 0.62, h + 0.62), 14), [(x, h + 0.42)]]))
    couches.append(('creme', creme)); creme = []
    return couches


def lueur():
    """La lueur de la porte sur la neige : quelques traits orange plats et taillés, en éventail court devant le
    seuil, de plus en plus fins et espacés en s'éloignant."""
    cx = (PORTE[0] + PORTE[2]) / 2
    traits = [(-3.4, 797.7, 5.2, 0.95), (3.0, 797.9, 4.6, 0.9),
              (-7.4, 799.3, 5.0, 0.8), (0.4, 799.4, 4.4, 0.85), (7.6, 799.6, 4.0, 0.75),
              (-4.6, 800.9, 4.2, 0.6), (5.0, 801.0, 3.6, 0.55)]
    polys = []
    for dx, y, L, ep in traits:
        m = cx + dx
        polys.append(_trait([(m - L / 2, y + 0.12), (m - L / 6, y - 0.05), (m + L / 2, y + 0.08)], ep, (0.3, 0.45)))
    return polys


# --------------------------------------------------------------------------- rendu
def _raster(polys, K, ss=SS):
    x0, y0, x1, y1 = BOITE
    W, H = int(round((x1 - x0) * K)), int(round((y1 - y0) * K))
    im = Image.new('L', (W * ss, H * ss), 0)
    d = ImageDraw.Draw(im)
    f = K * ss
    for p in polys:
        p = np.asarray(p, float)
        if len(p) >= 3:
            d.polygon([((x - x0) * f, (y - y0) * f) for x, y in p], fill=255)
    return np.asarray(im.resize((W, H), Image.BOX), np.float32) / 255


def _disque(r):
    r = max(1, int(round(r)))
    yy, xx = np.mgrid[-r:r + 1, -r:r + 1]
    return xx * xx + yy * yy <= r * r


def _normconv(img, poids, sigma):
    num = np.stack([ndi.gaussian_filter(img[..., c] * poids, sigma) for c in range(3)], -1)
    den = ndi.gaussian_filter(poids, sigma)
    return num / np.maximum(den, 1e-4)[..., None], den


def appliquer(a, K=4):
    a = np.asarray(a)
    x0, y0, x1, y1 = BOITE
    X0, Y0, X1, Y1 = int(x0 * K), int(y0 * K), int(x1 * K), int(y1 * K)
    z = a[Y0:Y1, X0:X1].astype(np.float32)
    h, w = z.shape[:2]
    L = z.mean(2)
    xs = x0 + (np.arange(w) + 0.5) / K
    ys = y0 + (np.arange(h) + 0.5) / K
    hz = np.interp(xs, [p[0] for p in HORIZON], [p[1] for p in HORIZON])
    champ = ys[:, None] > hz[None, :]

    # -- l'ancien chalet : la maison en entier, le foncé de la clôture, et le liseré clair autour
    maison = _raster([ANCIENNE_MAISON], K, 2) > 0.5
    zone_cl = _raster([ANCIENNE_CLOTURE, ANCIENNE_CLOTURE_D], K, 2) > 0.5
    sombre = L < 170
    cloture = ndi.binary_dilation(sombre & zone_cl, _disque(0.8 * K)) & zone_cl
    nuit_ch = (_raster([NUIT_CHALET], K, 2) > 0.5) & ~champ
    ancien = maison | cloture | nuit_ch
    loin = champ & (L > 150) & (ndi.distance_transform_edt(~(L < 150)) > 6 * K) & ~ancien
    base, _ = _normconv(z, loin.astype(np.float32), 8 * K)
    pres = ndi.binary_dilation((L < 150) & ancien, _disque(5.5 * K))
    lisere = champ & pres & (L > base.mean(2) + 2.5) & ~ancien
    ancien |= lisere

    # -- le fond rebouché : la neige la plus proche sous l'horizon, la nuit de la rangée au-dessus
    fond = z.copy()
    valide_n = champ & ~ancien & (L > 150)
    _, (iy, ix) = ndi.distance_transform_edt(~valide_n, return_indices=True)
    pn = z[iy, ix]
    pn = np.stack([ndi.gaussian_filter(pn[..., c], 0.8 * K) for c in range(3)], -1)
    # la nuit : la moyenne de la nuit d'à côté (hors de l'ancien chalet), qui suit ses lentes variations
    nuit = ~champ & ~ancien & (L < 40)
    c_nuit, den = _normconv(z, nuit.astype(np.float32), 4 * K)
    if nuit.sum() > 50:
        c_nuit = np.where((den < 0.05)[..., None], np.median(z[nuit], 0), c_nuit)
    sous = ndi.gaussian_filter(champ.astype(np.float32), 0.3 * K)[..., None]
    remplace = sous * pn + (1 - sous) * c_nuit
    fond[ancien] = remplace[ancien]

    # -- le nouveau chalet
    neige = np.median(z[loin], 0) if loin.any() else np.array([219, 228, 234], np.float32)
    couleurs = {'noir': NOIR, 'creme': neige, 'orange': ORANGE, 'fumee': FUMEE}
    out = fond
    # l'ombre au pied, sur la neige seulement (le même bleu pâle que neige.py)
    a_om = _raster([OMBRE], K) * champ
    ombre = (1 - T_CLAIR) * base + T_CLAIR * COLLINE
    out = out * (1 - a_om[..., None]) + ombre * a_om[..., None]
    total = a_om.copy()
    # la lueur de la porte, sur la neige
    a_lu = _raster(lueur(), K) * champ
    out = out * (1 - a_lu[..., None]) + ORANGE * a_lu[..., None]
    total = np.maximum(total, a_lu)
    for nom, polys in dessin():
        al = _raster(polys, K)
        out = out * (1 - al[..., None]) + couleurs[nom] * al[..., None]
        total = np.maximum(total, al)

    m = np.maximum(ancien.astype(np.float32), total)
    res = z * (1 - m[..., None]) + out * m[..., None]
    b = a.copy()
    b[Y0:Y1, X0:X1] = np.clip(np.round(res), 0, 255).astype(np.uint8)
    return b


if __name__ == '__main__':
    import sys
    src, dst = sys.argv[1], sys.argv[2]
    a = np.asarray(Image.open(src).convert('RGB'))
    Image.fromarray(appliquer(a, a.shape[1] // 768)).save(dst)
    print('ok', dst)
