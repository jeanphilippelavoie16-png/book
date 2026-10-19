"""Tome 1, page de titre : les épinettes du premier plan (zones 0,560 à 160,960 et 495,585 à 768,960 en 768 x 960).
Retouche demandée par JP le 19 octobre 2026 : « la même image, avec la rigueur des autres tomes ».

Les mêmes épinettes, aux mêmes places, de la même hauteur et de la même largeur (demi-largeurs relevées sur l'image),
refaites comme celles du tome 6 et de scene_titre.py :
- les cinq grandes (la grande coupée par le bord gauche, les deux de gauche, la grande de droite et celle du bord
  droit) sont redessinées en vectoriel : une seule pointe nette, un cœur noir autour du tronc, des étages qui tombent,
  chacun fait d'une ou deux lames d'aiguilles taillées net en noir (#06111F), le dessous dentelé de pointes
  d'aiguilles, et des étages du fond entre ceux de devant pour garder la masse noire des grandes ; sur le dessus de
  chaque étage, une ou deux plaques de neige franches, dans le blanc du champ, au bord du dessous dentelé, avec un
  filet noir au-dessus ; plus de vers, de lettres, de haricot ni de taches en C ; les blancs de la grande de gauche
  qui montaient dans les collines deviennent ses premières branches enneigées ; la cime de la plus haute de gauche,
  posée sur la nuit, porte un filet de neige le long de la flèche ;
- les deux petites de droite gardent leur silhouette d'origine, recoupée net (seuil pris sur l'image agrandie quatre
  fois : bord franc, sans flou ni liseré ; fentes bouchées, miettes et bouts de branches voisines retirés ; cime
  recoupée en cône sous une flèche nette), avec un peu de neige sur le dessus de leurs étages et le tronc au pied.
Ce qui part : tout ce qui était l'ancienne épinette (le noir, ses blancs, le liseré clair de l'agrandissement autour)
est d'abord rebouché avec le fond voisin (la neige du champ sans la trace, la nuit de la rangée, le bleu des collines,
la limite entre ces deux-là relevée sur l'image, colonne par colonne), puis les nouvelles épinettes sont posées
par-dessus, de l'arrière vers l'avant. Rien ne bouge hors des deux zones ; hors de l'ancienne épinette et de la
nouvelle, les pixels reçus restent.

    from epinettes import appliquer ; b = appliquer(a, 4)      (a : numpy RVB uint8, 3072 x 3840 ; K pixels par unité)
    python3 epinettes.py entree.png sortie.png
"""
import functools
import importlib.util
import math
import os
import random
import numpy as np
from scipy import ndimage as ndi
from PIL import Image, ImageDraw

NOIR = np.array([6, 17, 31], np.float32)        # #06111F, le noir des épinettes
SS = 4                                            # suréchantillonnage du dessin
ICI = os.path.dirname(os.path.abspath(__file__))

# Les raccords avec les modules d'avant (la chaîne : ciel, cretes, collines, neige, chalet, epinettes). Là où
# l'ancienne épinette est rebouchée et que la nouvelle ne couvre pas, ce que collines.py et neige.py ont dessiné
# autour continue : la rangée d'arbres (les petites épinettes de collines.py, plantées sur le haut de la nuit), l'ombre
# festonnée au pied de la rangée (neige.py) et la trace de raquettes jusque sous la grande de droite.
T_CLAIR = 0.10                 # l'ombre au pied de la rangée : la part du bleu des collines (neige.py)
PAS_TRACE = 12.2               # deux empreintes de la trace, de la petite du milieu à la grande de droite (unités) :
                               # le décalage de la copie qui la prolonge, pour que les empreintes tombent en quinconce
PENTE_TRAITS = 0.40            # la pente des deux grands traits blancs de la colline, près de la grande de gauche,
TRAITS_G = [(23, 611.1), (23, 627.8)]   # et un point de chacun (unités), relevés sur eux

# --------------------------------------------------------------------------- les épinettes (unités 768 x 960)
# Chaque épinette : cx, cx_bas (le tronc en haut et au pied), pointe (y de la pointe), fleche (longueur de la flèche),
# pied (y du bas du tronc), tronc (demi-largeur au pied), et ses étages :
# - les deux petites de droite gardent leur silhouette : le noir d'origine, recoupé net (seuil pris sur l'image
#   agrandie quatre fois, bord sans flou ni liseré), entre « haut » et « bas » ; la flèche est refaite en pointe
#   nette, et sous la petite de gauche, le tronc sort au pied. Leurs étages, relevés un à un sur l'image (côté, bout
#   x, bout y, haut de l'attache, épaisseur), servent à poser la neige sur le dessus de chaque doigt ;
# - les autres : des étages tirés à pas régulier (pas en haut, pas en bas, avec un peu de main) dont le bout suit la
#   demi-largeur relevée G, D (du tronc au bout des branches, à chaque hauteur), et qui tombent (pente).
EPINETTES = {
    'gauche': [
        # la grande coupée par le bord gauche : seul son côté droit se voit
        dict(nom='grande-g', coeur=0.2, cx=3.0, cx_bas=1.5, pointe=563.0, fleche=7.0, pied=990, tronc=3.2, graine=11,
             pas=(7.0, 26.0), pente=0.42, bas=985, dedans=True,
             D=[(563, 0), (575, 5.0), (590, 9.0), (605, 11.5), (620, 13.5), (640, 19.5), (660, 26.0), (690, 33.0),
                (720, 40.0), (750, 45.0), (790, 48.0), (850, 53.0), (900, 56.0), (985, 60.0)],
             G=[(563, 0), (600, 10), (985, 40)]),
        # la plus haute des deux de gauche
        dict(nom='A', coeur=0.2, cime_nuit=752, cx=73.2, cx_bas=72.0, pointe=704.0, fleche=8.0, pied=990, tronc=2.4, graine=23,
             pas=(6.0, 18.0), pente=0.40, bas=985, dedans=True,
             G=[(704, 0), (716, 3.4), (730, 6.5), (745, 11.0), (760, 17.0), (775, 21.0), (790, 25.0), (810, 29.0),
                (830, 32.0), (860, 35.0), (900, 37.0), (985, 40.0)],
             D=[(704, 0), (716, 3.2), (730, 6.0), (745, 9.0), (760, 12.5), (775, 17.0), (790, 20.0), (810, 23.0),
                (830, 25.5), (860, 28.0), (900, 31.0), (985, 35.0)]),
        # la plus petite des deux de gauche
        dict(nom='B', coeur=0.2, cx=118.3, cx_bas=117.0, pointe=772.0, fleche=7.0, pied=990, tronc=2.0, graine=37,
             pas=(5.5, 15.0), pente=0.36, bas=985, dedans=False,
             G=[(772, 0), (782, 2.8), (795, 5.5), (810, 9.5), (830, 14.0), (850, 18.0), (870, 21.0), (900, 23.5),
                (930, 26.0), (985, 29.0)],
             D=[(772, 0), (782, 2.6), (795, 5.0), (810, 9.5), (830, 14.5), (850, 18.5), (870, 21.5), (900, 24.0),
                (920, 27.0), (945, 30.0), (985, 32.0)]),
    ],
    'droite': [
        # celle du bord droit, derrière la grande : seuls ses bouts de branches gauches entrent dans l'image
        dict(nom='bord-d', coeur=0.2, cx=800.0, cx_bas=800.0, pointe=575.0, fleche=8.0, pied=990, tronc=3.0, graine=53,
             pas=(9.0, 24.0), pente=0.40, bas=985, dedans=True,
             G=[(575, 0), (660, 28), (700, 44), (740, 50), (800, 54), (870, 57), (985, 60)],
             D=[(575, 0), (985, 40)]),
        # la grande de droite
        dict(nom='grande-d', coeur=0.2, cx=697.5, cx_bas=702.0, pointe=586.0, fleche=9.0, pied=990, tronc=3.4, graine=61,
             pas=(7.0, 26.0), pente=0.42, bas=985, dedans=True,
             G=[(586, 0), (598, 5.0), (612, 9.5), (628, 14.5), (645, 19.0), (665, 24.0), (690, 31.0), (715, 37.0),
                (742, 41.5), (770, 46.0), (800, 49.0), (830, 52.0), (860, 54.0), (890, 58.0), (920, 66.0),
                (950, 76.0), (985, 84.0)],
             D=[(586, 0), (598, 5.0), (612, 9.5), (628, 15.0), (645, 20.5), (665, 27.0), (690, 36.0), (715, 43.0),
                (742, 47.0), (790, 56.0), (860, 66.0), (985, 82.0)]),
        # la petite du milieu : ses étages relevés (côté, bout x, bout y, haut de l'attache, épaisseur)
        dict(nom='S2', coeur=0.24, cx=602.3, cx_bas=602.0, pointe=808.5, fleche=10.0, fleche_l=2.0, pied=962, tronc=2.0, graine=71,
             neige=0.75, masque=dict(contour=[(556, 812), (637, 812), (637, 961), (556, 961)], haut=808.0, bas=961, cone=0.25),
             etages=[
                 (-1, 594.5, 836.0, 829.0, 5.0), (1, 612.0, 840.0, 830.5, 5.5),
                 (-1, 590.5, 851.0, 843.0, 5.5), (1, 613.5, 855.0, 845.5, 6.0),
                 (-1, 585.5, 866.0, 857.0, 6.5), (1, 621.5, 869.0, 859.5, 7.0),
                 (-1, 586.5, 874.5, 869.0, 4.5), (1, 620.5, 878.5, 872.5, 6.0),
                 (-1, 585.0, 885.0, 877.5, 6.0), (1, 623.5, 892.0, 883.5, 7.0),
                 (-1, 582.0, 897.0, 889.0, 7.0), (1, 626.0, 904.0, 895.0, 8.0),
                 (-1, 579.0, 908.5, 900.0, 7.0), (1, 629.0, 918.0, 908.0, 8.0),
                 (-1, 575.5, 921.0, 911.5, 8.0), (1, 631.0, 932.0, 921.5, 9.0),
                 (-1, 571.0, 935.0, 925.0, 8.5), (1, 632.5, 945.5, 935.0, 8.5),
                 (-1, 573.5, 944.5, 937.5, 6.0),
                 (-1, 563.0, 953.0, 942.0, 8.0)]),
        # la petite de gauche
        dict(nom='S1', coeur=0.24, cx=524.6, cx_bas=524.2, pointe=878.0, fleche=8.0, fleche_l=1.6, pied=962, tronc=1.8, graine=83,
             neige=0.7, masque=dict(contour=[(497, 880), (552, 880), (552, 953.8), (497, 953.8)], haut=877.0, bas=953.8, cone=0.25),
             etages=[
                 (-1, 519.3, 895.8, 890.0, 3.8), (1, 532.6, 897.2, 891.0, 3.6),
                 (-1, 517.4, 903.4, 898.5, 4.2), (1, 534.8, 906.4, 900.0, 4.4),
                 (-1, 513.4, 910.0, 905.5, 4.8), (1, 536.0, 917.0, 910.0, 5.6),
                 (-1, 511.8, 920.4, 913.0, 6.4), (1, 543.2, 928.2, 921.0, 6.0),
                 (-1, 504.4, 934.8, 925.0, 7.6), (1, 543.8, 937.6, 931.0, 6.0),
                 (-1, 500.0, 950.4, 939.0, 8.6), (1, 545.2, 950.8, 941.0, 8.0)]),
    ],
}

# les zones (unités) : rien ne bouge hors d'elles
BOITES = {'gauche': (0, 560, 160, 960), 'droite': (495, 585, 768, 960)}

# le bas de la rangée d'arbres (au-dessus : la nuit et les collines ; au-dessous : le champ de neige)
# (à gauche, relevé sur la neige du champ entre les épinettes, de 50 à 160 : un horizon plus haut que la neige y faisait
# une marche, et la nuit de la rangée rebouchée en neige au-dessus de l'ombre du pied)
HORIZON = {'gauche': [(0, 756), (50, 755.0), (65, 754.8), (90, 754.3), (110, 754.2), (120, 753.5), (130, 752.2),
                      (140, 750.5), (150, 748.8), (160, 746.8)],
           'droite': [(495, 749), (560, 744), (600, 740), (640, 735.5), (680, 733.5), (768, 733.5)]}

# au-dessus de l'horizon, l'ancienne épinette est ce que la retouche des collines a laissé tel quel (PREMIER_PLAN de
# collines.py, repris ici) : ce contour est rebouché en entier
ANCIEN_HAUT = {
    'gauche': [
        [(0, 556), (9, 556), (13, 575), (15, 600), (19, 616), (23, 634), (27, 645), (32, 651), (35, 668), (34, 690),
         (39, 700), (47, 712), (49, 740), (53, 765), (0, 765)],
        [(66, 699), (84, 699), (90, 765), (60, 765)],
    ],
    'droite': [
        [(659.5, 637.5), (668.0, 637.5), (668.0, 648.0), (659.5, 648.0)],
        [(697, 580), (702, 592), (707, 605), (713, 620), (717, 632), (725, 640), (732, 650), (740, 660), (744, 672),
         (749, 690), (751, 705), (753, 725), (759, 740), (768, 745), (768, 765), (640, 765), (648, 752), (652, 735),
         (655, 722), (660, 710), (665, 698), (667, 684), (672, 670), (679, 657), (681, 640), (681, 622), (684, 606),
         (690, 594)],
    ],
}
# sous l'horizon, l'ancienne épinette est le noir épais (les fils de la trace et de la congère, minces, n'en sont pas)
# à l'intérieur de ces contours larges
ANCIEN_BAS = {
    'gauche': [[(0, 740), (160, 740), (160, 960), (0, 960)]],
    'droite': [
        [(497, 872), (550, 872), (550, 960), (497, 960)],                       # la petite de gauche
        [(556, 800), (644, 800), (644, 960), (556, 960)],                       # la petite du milieu
        [(644, 725), (768, 725), (768, 960), (614, 960), (618, 930), (630, 900), (636, 860), (638, 820),
         (640, 780), (642, 745)],                                               # la grande et celle du bord
    ],
}


# les fils de la trace et du bord de la congère (tracés de neige.py) : un noir mince là-dessus n'est pas de l'épinette
FILS = [[(486, 861.2), (514, 866.0), (540, 870.0), (564, 873.4), (588, 875.8), (612, 876.8), (636, 877.0),
         (650, 877.0), (664, 877.0)],
        [(462, 759.8), (488, 757.0), (514, 756.2), (540, 754.4), (566, 753.8), (592, 752.4), (616, 753.0),
         (638, 754.6), (660, 757.6)]]


# --------------------------------------------------------------------------- géométrie
def _interp(knots, y):
    ys = [k[0] for k in knots]; vs = [k[1] for k in knots]
    return float(np.interp(y, ys, vs))


def _cubique(p0, c1, c2, p1, n=24):
    t = np.linspace(0, 1, n)[:, None]
    p0, c1, c2, p1 = map(np.asarray, (p0, c1, c2, p1))
    return (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * c1 + 3 * (1 - t) * t ** 2 * c2 + t ** 3 * p1


def _quad(p0, c, p1, n=16):
    t = np.linspace(0, 1, n)[:, None]
    p0, c, p1 = map(np.asarray, (p0, c, p1))
    return (1 - t) ** 2 * p0 + 2 * (1 - t) * t * c + t ** 2 * p1


def _croissant(courbe, v0, v1, rim, epais, vers_bas=True, n=40, coussin=False, dents=None):
    """Un croissant de neige posé sous une courbe (le dessus d'une branche) : de la fraction v0 à v1 de sa longueur,
    rim sous la courbe, épaisseur max epais, pointu aux deux bouts."""
    d = np.diff(courbe, axis=0)
    s = np.concatenate([[0], np.cumsum(np.hypot(d[:, 0], d[:, 1]))])
    L = s[-1]
    u = np.linspace(v0, v1, n) * L
    x = np.interp(u, s, courbe[:, 0]); y = np.interp(u, s, courbe[:, 1])
    tx = np.gradient(x); ty = np.gradient(y)
    nn = np.hypot(tx, ty) + 1e-9
    nx, ny = -ty / nn, tx / nn
    sg = np.where(ny < 0, -1.0, 1.0) if vers_bas else 1.0
    nx, ny = nx * sg, ny * sg
    v = np.linspace(0, 1, n)
    if coussin:                                          # monte vite côté tronc, s'effile vers le bout
        ep = np.minimum(1, v / 0.22) ** 0.55 * (1 - v) ** 0.8
        ep = epais * ep / ep.max()
    else:
        ep = epais * np.sin(np.pi * v) ** 0.75
    r = rim(v) if callable(rim) else np.full(n, rim)
    haut = np.stack([x + nx * r, y + ny * r], 1)
    if dents is not None:                                # le bord du dessous dentelé : des pointes vers le bas
        R_, per, prof = dents
        sl = np.concatenate([[0], np.cumsum(np.hypot(np.diff(x), np.diff(y)))])
        off = np.zeros(n)
        pos = per * R_.uniform(0.1, 0.6)
        while pos < sl[-1]:
            p = per * R_.uniform(0.8, 1.25)
            k = (sl >= pos) & (sl < pos + p)
            f = (sl[k] - pos) / p
            off[k] = prof * R_.uniform(0.5, 1.1) * np.clip(1 - np.abs(f - 0.3) / 0.7, 0, 1) ** 1.6
            pos += p
        ep = ep + off * np.sin(np.pi * v) ** 0.5
    bas = np.stack([x + nx * (r + ep), y + ny * (r + ep)], 1)
    return np.concatenate([haut, bas[::-1]])


def _dents(courbe, periode, prof, R, debut=0.0, fin=1.0, sens=1.0):
    """Des pointes d'aiguilles le long d'une courbe : chaque dent monte en pente douce et retombe d'un coup, la
    pointe tournée vers le bout de la branche. La courbe va du bout vers le tronc ; sens choisit le côté (la
    normale qui sort de la branche)."""
    d = np.diff(courbe, axis=0)
    sa = np.concatenate([[0], np.cumsum(np.hypot(d[:, 0], d[:, 1]))])
    Ltot = sa[-1]
    if Ltot < periode * 1.5:
        return courbe
    n = max(40, int(Ltot / periode * 10))
    ss = np.linspace(0, Ltot, n)
    x = np.interp(ss, sa, courbe[:, 0]); y = np.interp(ss, sa, courbe[:, 1])
    tx = np.gradient(x); ty = np.gradient(y)
    nn = np.hypot(tx, ty) + 1e-9
    nx, ny = -ty / nn * sens, tx / nn * sens
    # les dents, à pas un peu irrégulier
    off = np.zeros(n)
    pos = Ltot * debut + periode * R.uniform(0.2, 0.7)
    while pos < Ltot * fin - periode * 0.5:
        p = periode * R.uniform(0.8, 1.25)
        h = prof * R.uniform(0.6, 1.15)
        k = (ss >= pos) & (ss < pos + p)
        f = (ss[k] - pos) / p                         # 0 à la pointe, 1 au creux suivant
        off[k] = np.maximum(off[k], h * np.clip(1 - f / 0.85, 0, 1) ** 1.3)
        pos += p
    # la profondeur s'éteint vers le tronc
    w = np.clip((Ltot * fin - ss) / (periode * 1.5), 0, 1)
    off *= w
    return np.stack([x + nx * off, y + ny * off], 1)


def lame(cx, tw, s, ya, L, ch, ep, R, doigt=False):
    """Une lame d'aiguilles : part du tronc (haut ya, épaisseur ep), le dessus retombe jusqu'au bout pointu, à L du
    tronc et ch plus bas ; le dessous porte des pointes d'aiguilles. doigt : le dessus presque droit et le dessous
    parallèle (les doigts des deux petites épinettes de droite). Rend (polygone, courbe du dessus)."""
    u = R.uniform
    X = lambda f: cx + s * f
    tx, ty = X(L), ya + ch
    if doigt:
        haut = _cubique((X(tw * 0.4), ya), (X(L * 0.38), ya + ch * u(0.10, 0.18)),
                        (X(L * 0.74), ya + ch * u(0.50, 0.60)), (tx, ty), 28)
        bas_ = _cubique((tx, ty), (X(L * u(0.80, 0.86)), ty + ep * u(0.30, 0.40)),
                        (X(L * 0.42), ya + ep * 1.02 + ch * 0.42), (X(tw * 0.4), ya + ep), 28)
        prof_d = min(0.7, 0.07 * ep + 0.25)
    else:
        bombe = L * u(0.015, 0.045) + ep * 0.08          # le dessus monte à peine, puis retombe vers le bout
        haut = _cubique((X(tw * 0.4), ya), (X(L * u(0.32, 0.42)), ya - bombe),
                        (X(L * u(0.78, 0.86)), ya + ch * u(0.22, 0.34)), (tx, ty), 32)
        # le dessous : reste à peu près à l'épaisseur ep jusqu'aux trois quarts, puis remonte vite au bout pointu
        bas_ = _cubique((tx, ty), (X(L * u(0.80, 0.88)), ya + ch * 0.86 + ep * u(0.62, 0.78)),
                        (X(L * 0.38), ya + ep * 1.04 + ch * 0.36), (X(tw * 0.4), ya + ep), 32)
        prof_d = min(1.1, 0.10 * ep + 0.3)
    if L > 4:
        per = min(3.8, max(1.8, 0.10 * L + 1.4))
        bas_ = _dents(bas_, per, prof_d, R, 0.04, 0.72, sens=-s)
    ferme = np.array([(X(-tw * 0.4), ya + ep), (X(-tw * 0.4), ya)])
    return np.concatenate([haut, bas_, ferme]), haut


def etage(cx, tw, s, ya, L, ch, ep, R, gros=1.0, doigt=False):
    """Un étage, d'un côté : une ou deux lames qui partent du tronc, la plus longue en haut, l'autre plus courte et
    plus tombante dessous ; son bout fait une pointe sous l'étage. Rend (polygones, courbes du dessus des lames)."""
    u = R.uniform
    n = 1 if doigt else 2 if L > 5 else 1
    polys, hauts = [], []
    p, haut = lame(cx, tw, s, ya, L, ch, ep * (1.2 if doigt else 0.62) * gros, R, doigt)
    polys.append(p); hauts.append(haut)
    for k in range(1, n):
        f = 0.60 * u(0.88, 1.12)
        yk = ya + ep * (0.30 if k == 1 else 0.52) * u(0.9, 1.1)
        chk = ch * f * u(1.05, 1.3) + ep * 0.25
        p, haut = lame(cx, tw, s, yk, L * f, chk, ep * (0.58 if k == 1 else 0.5) * gros, R)
        polys.append(p); hauts.append(haut)
    return polys, hauts


def epinette(sp):
    """Le dessin d'une épinette : deux couches (les étages du fond, puis ceux de devant), chacune (polygones noirs,
    polygones de neige), en unités."""
    R = random.Random(sp['graine'])
    u = R.uniform
    tip, pied = sp['pointe'], sp['pied']
    cxf = lambda y: sp['cx'] + (sp['cx_bas'] - sp['cx']) * (y - tip) / (pied - tip)
    twf = lambda y: 0.35 + (sp['tronc'] - 0.35) * min(1.0, max(0.0, (y - tip) / (pied - tip))) ** 0.7
    fond, devant = ([], []), ([], [])
    # le tronc, de la pointe au pied, et la flèche : une seule pointe nette
    lf = sp['fleche']
    wf = sp.get('fleche_l', 0.75 + 0.004 * (pied - tip))
    devant[0].append([(cxf(tip + lf) - twf(tip + lf), tip + lf), (cxf(tip + lf) + twf(tip + lf), tip + lf),
                      (cxf(pied) + sp['tronc'], pied), (cxf(pied) - sp['tronc'], pied)])
    devant[0].append(np.concatenate([_quad((cxf(tip), tip), (cxf(tip) + wf * 0.35, tip + lf * 0.5),
                                           (cxf(tip) + wf, tip + lf), 10),
                                     _quad((cxf(tip) - wf, tip + lf), (cxf(tip) - wf * 0.35, tip + lf * 0.5),
                                           (cxf(tip), tip), 10)]))

    if sp.get('cime_nuit'):
        # la cime posée sur la nuit de la rangée : un filet de neige le long de la flèche, côté lune, la dessine
        fl = np.array([(cxf(tip) + 0.05, tip + 1.2), (cxf(tip) + wf * 0.55, tip + lf * 0.62),
                       (cxf(tip) + wf * 0.75, tip + lf * 1.05)])
        devant[1].append(_croissant(_quad(fl[0], fl[1], fl[2], 16), 0.0, 1.0, 0.18, 0.55, n=24))

    def neige(couche, hauts, L, ep, part=0.9, fin=False, doigt=False):
        """La neige posée sur l'étage : un croissant franc sous le bord du dessus de la lame du haut, plus épais au
        milieu, sur une partie de la branche (le bout reste souvent noir), et parfois une tache sur la lame du
        dessous. Un bord noir franc reste au-dessus de chaque tache."""
        if R.random() > part or L < 2:
            return
        bt = (1.2 if doigt else 0.62) * ep               # l épaisseur de la lame du haut, au tronc
        e = (max(0.30 * bt, 0.8) if doigt else min(max(0.62 * bt, 1.0), 3.8)) * u(0.85, 1.15) * (0.9 if fin else 1.0)
        r0 = (max(0.16 * bt + 0.3, 0.75) * 0.8 if doigt else max(0.10 * bt + 0.3, 0.6)) * u(0.85, 1.15)
        if doigt:
            c, dl = u(0.34, 0.55), u(0.20, 0.32)
            couche[1].append(_croissant(hauts[0], max(0.08, c - dl), min(0.9, c + dl), lambda v: r0 * (1 - 0.35 * v),
                                        e, coussin=True))
            return
        # une ou deux plaques de neige posées sur le dessus, à des places inégales ; leur bord du dessous est dentelé
        # (les bouts d'aiguilles qui dépassent de la neige), comme au tome 6
        n = 1 if L < 11 else 2
        if n == 2 and R.random() < 0.2:
            n = 1
        bornes = np.linspace(0.05, 0.93, n + 1)
        for i in range(n):
            lg = (u(0.42, 0.62) if n == 1 else u(0.28, 0.40))
            a_, b_ = bornes[i] + lg / 2, bornes[i + 1] - lg / 2
            c = u(a_, max(a_, b_))
            ee = e * u(0.85, 1.15) * (1.1 if i == 0 else 0.9)
            couche[1].append(_croissant(hauts[0], max(0.04, c - lg / 2), min(0.95, c + lg / 2),
                                        lambda v, r=r0 * u(0.85, 1.15): r * (1 - 0.3 * v), ee, n=40,
                                        dents=(R, min(2.4, max(1.1, 0.07 * L + 0.8)), ee * 0.45)))
        if len(hauts) > 1 and L > 8 and R.random() < 0.65:  # une plaque sur la lame du dessous
            c2 = u(0.40, 0.66); lg = u(0.22, 0.34)
            couche[1].append(_croissant(hauts[1], c2 - lg / 2, c2 + lg / 2, r0 * 0.9, e * 0.7, n=28,
                                        dents=(R, 1.2, e * 0.3)))

    if 'etages' in sp:                                  # la demi-largeur, tirée des étages relevés
        for cle, sg in (('D', 1), ('G', -1)):
            kn = sorted((ty, abs(tx - cxf(ya))) for (s_, tx, ty, ya, ep) in sp['etages'] if s_ == sg)
            sp = dict(sp, **{cle: [(tip, 0.0)] + kn})
        fin_coeur = max(ya + ep for (s_, tx, ty, ya, ep) in sp['etages'])
    else:
        fin_coeur = pied
    if sp.get('coeur') and 'masque' not in sp:
        ys_ = np.linspace(tip + lf, fin_coeur, 50)
        a_ = [(cxf(y) + max(twf(y), sp['coeur'] * _interp(sp['D'], y)), y) for y in ys_]
        b_ = [(cxf(y) - max(twf(y), sp['coeur'] * _interp(sp['G'], y)), y) for y in ys_[::-1]]
        devant[0].append(np.array(a_ + b_))
    if 'etages' in sp:                                  # les étages relevés un à un
        for i_, (s, tx, ty, ya, ep) in enumerate(sp['etages']):
            tx += u(-0.15, 0.15); ty += u(-0.15, 0.15)
            polys, hauts = etage(cxf(ya), twf(ya), s, ya, abs(tx - cxf(ya)), ty - ya, ep, R, doigt=True)
            if 'masque' not in sp:
                devant[0].extend(polys)
            if i_ >= 3:
                neige(devant, hauts, abs(tx - cxf(ya)), ep, sp.get('neige', 0.9), fin=True, doigt=True)
        return [devant]
    h = sp['bas'] - tip
    for s, cle in ((1, 'D'), (-1, 'G')):
        prof = sp[cle]
        y = tip + lf * (0.62 if s > 0 else 0.95)
        k = 0
        while y < sp['bas']:
            t = (y - tip) / h
            pas = (sp['pas'][0] + (sp['pas'][1] - sp['pas'][0]) * t ** 0.8) * u(0.85, 1.15)
            ep = pas * u(0.62, 0.78)
            ch0 = sp['pente'] * _interp(prof, y) + 0.2 * ep
            L = _interp(prof, y + ch0) * u(0.86, 1.06)
            if k > 1 and R.random() < 0.18:
                L *= u(0.70, 0.86)                      # une branche plus courte de temps en temps
            if L > 0.8:
                ch = (sp['pente'] * L + 0.2 * ep) * u(0.85, 1.15)
                cx = cxf(y)
                polys, hauts = etage(cx, twf(y), s, y, L, ch, ep, R)
                devant[0].extend(polys)
                if (k >= 2 and L > 4) or (sp.get('cime_nuit') and L > 1.5):
                    neige(devant, hauts, L, ep, 1.0 if sp.get('cime_nuit') and y < sp['cime_nuit'] else 0.95)
                # un étage du fond entre deux étages de devant : la masse se remplit, de la neige dedans
                if sp.get('dedans') and L > 10 and R.random() < 0.85:
                    yb = y + pas * u(0.40, 0.60)
                    Lb = L * u(0.50, 0.72)
                    chb = (sp['pente'] * Lb + 0.2 * ep) * u(0.85, 1.15)
                    polys, hauts = etage(cxf(yb), twf(yb), s, yb, Lb, chb, ep * 0.8, R)
                    fond[0].extend(polys)
                    neige(fond, hauts, Lb, ep * 0.8, 0.95, fin=True)
            y += pas; k += 1
    return [fond, devant]


# --------------------------------------------------------------------------- rendu
def _raster(polys, boite, K, ss=SS):
    x0, y0, x1, y1 = boite
    W, H = int(round((x1 - x0) * K)), int(round((y1 - y0) * K))
    im = Image.new('L', (W * ss, H * ss), 0)
    d = ImageDraw.Draw(im)
    f = K * ss
    for p in polys:
        p = np.asarray(p, float)
        if len(p) >= 3:
            d.polygon([((x - x0) * f, (y - y0) * f) for x, y in p], fill=255)
    return np.asarray(im.resize((W, H), Image.BOX), np.float32) / 255


def _ruban(pts, demi):
    """Un ruban de demi-largeur demi autour d'une ligne brisée (unités)."""
    pts = np.asarray(pts, float)
    d = np.gradient(pts, axis=0)
    d /= np.hypot(d[:, 0], d[:, 1])[:, None]
    nrm = np.stack([-d[:, 1], d[:, 0]], 1)
    return np.concatenate([pts + nrm * demi, (pts - nrm * demi)[::-1]])


def _disque(r):
    r = max(1, int(round(r)))
    yy, xx = np.mgrid[-r:r + 1, -r:r + 1]
    return xx * xx + yy * yy <= r * r


def _normconv(img, poids, sigma):
    num = np.stack([ndi.gaussian_filter(img[..., c] * poids, sigma) for c in range(3)], -1)
    den = ndi.gaussian_filter(poids, sigma)
    return num / np.maximum(den, 1e-4)[..., None], den


def _masque_ancien(L, m, boite, K, ys, cx):
    """Le noir d'origine d'une épinette, recoupé net : seuil pris sur l'image agrandie quatre fois (bord sans flou ni
    liseré, crénelage doux), dans son contour, entre m['haut'] et m['bas'] ; les fils minces qui la touchent partent,
    les petits trous blancs fermés (fentes de l'agrandissement) se bouchent, les miettes coupées partent."""
    env = _raster([m['contour']], boite, K, 2) > 0.5
    env &= ((ys >= m['haut']) & (ys <= m['bas']))[:, None]
    if 'cone' in m:                                   # la cime recoupée en pointe : rien hors du cône sous la flèche
        xs_ = boite[0] + (np.arange(L.shape[1]) + 0.5) / K
        env &= np.abs(xs_[None, :] - cx) <= m['cone'] * (ys[:, None] - m['pointe'])
    sombre = (L < 150) & env
    epais = ndi.binary_opening(sombre, _disque(1.1 * K))
    garde = ndi.binary_dilation(epais, _disque(1.0 * K)) & env
    r = 4
    L4 = ndi.zoom(np.where(garde, L, 255.0), r, order=3)
    b = L4 < 128
    # les trous blancs fermés de moins de 3 unités² se bouchent ; les miettes de moins de 4 unités² partent
    trous = ndi.binary_fill_holes(b) & ~b
    lab, n = ndi.label(trous)
    if n:
        t = ndi.sum(np.ones_like(lab), lab, range(1, n + 1))
        b |= np.isin(lab, 1 + np.nonzero(t < 3 * (K * r) ** 2)[0])
    # seuls les morceaux qui touchent le tronc restent : un bout de branche d'une voisine coupé par le contour part
    lab, n = ndi.label(b)
    if n:
        j0 = int((cx - 2.5 - boite[0]) * K * r); j1 = int((cx + 2.5 - boite[0]) * K * r)
        garde_ = np.unique(lab[:, max(0, j0):max(0, j1)])
        b = np.isin(lab, garde_[garde_ > 0])
    h, w = L.shape
    return b.astype(np.float32).reshape(h, r, w, r).mean((1, 3))


def _dessus(mo, boite, K, cx, s, ya, tx, ty):
    """Le bord du dessus d'un doigt, relevé sur le masque : de 12 % à 92 % de la longueur, la première rangée noire
    sous la droite qui va de l'attache au bout (cherchée 4 unités au-dessus et au-dessous)."""
    x0, y0 = boite[0], boite[1]
    L = abs(tx - cx)
    pts = []
    for f in np.linspace(0.12, 0.92, 28):
        x = cx + s * f * L
        yl = ya + (ty - ya) * f
        j = int((x - x0) * K)
        i0, i1 = int((yl - 4 - y0) * K), int((yl + 4 - y0) * K)
        if j < 0 or j >= mo.shape[1] or i0 < 0 or i1 >= mo.shape[0]:
            continue
        col = mo[i0:i1, j] > 0.5
        k = np.nonzero(col)[0]
        if len(k):
            pts.append((x, y0 + (i0 + k[0]) / K))
    if len(pts) < 6:
        return None
    pts = np.array(pts)
    pts[:, 1] = ndi.median_filter(pts[:, 1], 5, mode='nearest')
    pts[:, 1] = ndi.gaussian_filter1d(pts[:, 1], 1.5, mode='nearest')
    return pts


def _neige_doigts(sp, mo, boite, K):
    """La neige des deux petites de droite : un croissant franc sous le bord du dessus de chaque doigt, relevé sur
    leur noir d'origine, avec un bord noir au-dessus ; pas sur les trois doigts du haut."""
    R = random.Random(sp['graine'] + 1)
    u = R.uniform
    tip, pied = sp['pointe'], sp['pied']
    cxf = lambda y: sp['cx'] + (sp['cx_bas'] - sp['cx']) * (y - tip) / (pied - tip)
    polys = []
    for i, (s, tx, ty, ya, ep) in enumerate(sp['etages']):
        if i < 3 or R.random() > sp.get('neige', 0.9):
            continue
        pts = _dessus(mo, boite, K, cxf(ya), s, ya, tx, ty)
        if pts is None:
            continue
        c, dl = u(0.40, 0.58), u(0.22, 0.32)
        e = min(max(0.30 * ep, 1.0), 2.2) * u(0.85, 1.15)
        r0 = u(0.75, 1.0)
        polys.append(_croissant(pts, max(0.05, c - dl), min(0.95, c + dl), lambda v: r0 * (1 - 0.3 * v), e,
                                coussin=True))
    return polys


def _haut_nuit(L, xs, ys, haut_old, K):
    """Le haut de la nuit de la rangée d'arbres, colonne par colonne, relevé à côté de l'ancienne épinette : le premier
    pixel, entre 600 et 760, sous lequel 6 unités de suite ne sont pas du bleu des collines (la nuit, ou les traits
    blancs des petites épinettes de la rangée) ; les traits de gouge des collines, minces, ne comptent pas. Derrière
    l'ancienne épinette, une droite d'un bord à l'autre."""
    pas_bleu = (L < 30) | (L > 150)
    n = int(6 * K)
    suite = ndi.minimum_filter1d(pas_bleu.astype(np.uint8), n, axis=0, origin=-(n // 2)) > 0
    fen = (ys >= 600) & (ys <= 760)
    hn = np.full(len(xs), np.nan)
    for j in range(len(xs)):
        k = np.nonzero(suite[:, j] & fen)[0]
        if len(k):
            i = k[0]
            if not haut_old[max(0, i - int(1 * K)):i + n, j].any():
                hn[j] = ys[i] - 0.5 / K
    ok = ~np.isnan(hn)
    if ok.sum() < 4:
        return np.full(len(xs), 650.0)
    hn = np.interp(xs, xs[ok], hn[ok])
    return ndi.median_filter(hn, int(3 * K) | 1, mode='nearest')


@functools.lru_cache(maxsize=1)
def _collines():
    spec = importlib.util.spec_from_file_location('t1_retouche_collines', os.path.join(ICI, 'collines.py'))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def _raster_local(polys, boite, K, h, w, ss=SS):
    """Comme _raster, mais seulement dans la boîte des polygones : rend (alpha, i0, j0) en pixels de la zone, ou None."""
    pts = np.concatenate([np.asarray(p, float) for p in polys])
    x0 = max(boite[0], math.floor(pts[:, 0].min()) - 1); x1 = min(boite[2], math.ceil(pts[:, 0].max()) + 1)
    y0 = max(boite[1], math.floor(pts[:, 1].min()) - 1); y1 = min(boite[3], math.ceil(pts[:, 1].max()) + 1)
    if x1 <= x0 or y1 <= y0:
        return None
    al = _raster(polys, (x0, y0, x1, y1), K, ss)
    i0, j0 = int(round((y0 - boite[1]) * K)), int(round((x0 - boite[0]) * K))
    al = al[:h - i0, :w - j0]
    return al, i0, j0


def _rangee(region, hn, hz, boite, K, graine):
    """La rangée d'arbres de collines.py, continuée là où l'ancienne épinette a été rebouchée au-dessus du champ : des
    petites épinettes noires chargées de neige (le dessin de collines.py), la pointe un peu au-dessus du haut de la
    nuit, à 4,5 à 6,5 unités l'une de l'autre, comme les épinettes de remplissage de la rangée. Rend une liste
    d'épinettes (silhouette, [neiges]) en unités, de la plus haute à la plus basse (l'ordre où on les pose)."""
    col = _collines()
    R = random.Random(graine)
    x0, y0 = boite[0], boite[1]
    w = region.shape[1]
    arbres = []
    x = x0 + R.uniform(0.5, 3.0)
    while x < boite[2] - 0.5:
        j = min(int((x - x0) * K), w - 1)
        i0, i1 = int((hn[j] - 4 - y0) * K), int((hn[j] + 4 - y0) * K)
        if region[max(0, i0):max(0, i1), j].any():
            yt = hn[j] - R.uniform(2.0, 6.0)
            hh = min(R.uniform(22, 34), hz[j] - 5 - yt)
            if hh >= 12:
                arbres.append((hh, x, yt))
                x += R.uniform(4.5, 6.5)
                continue
        x += 1.0
    arbres.sort(key=lambda t: -t[0])
    return [col._epinette(x, yt, hh, R, 1) for hh, x, yt in arbres]


def _ombre_pied(xs, K, graine):
    """L'épaisseur (unités) de l'ombre festonnée au pied de la rangée, colonne par colonne : le dessin de neige.py
    (chaque feston monte vite à droite et s'étire à gauche, la lune est en haut à droite)."""
    R = np.random.RandomState(graine)
    ep = np.full(len(xs), 0.9, np.float32)
    x = float(xs[0]) - 10
    while x < xs[-1]:
        lg = R.uniform(7, 13)
        hmax = R.uniform(1.8, 3.4)
        u = (xs - x) / lg
        uu = np.clip(u, -1, 0.35)
        f = np.where((u > -1) & (u < 0), np.abs(np.sin(np.pi * (uu + 1) / 2)) ** 1.5,
                     np.where((u >= 0) & (u < 0.35), np.cos(np.pi * uu / 0.7), 0))
        ep = np.maximum(ep, 0.9 + hmax * f)
        x += R.uniform(5, 10)
    return ep


def _zone(a, nom, K):
    x0, y0, x1, y1 = BOITES[nom]
    X0, Y0, X1, Y1 = int(x0 * K), int(y0 * K), int(x1 * K), int(y1 * K)
    z = a[Y0:Y1, X0:X1].astype(np.float32)
    h, w = z.shape[:2]
    L = z.mean(2)
    xs = x0 + (np.arange(w) + 0.5) / K
    ys = y0 + (np.arange(h) + 0.5) / K
    hz = np.interp(xs, [p[0] for p in HORIZON[nom]], [p[1] for p in HORIZON[nom]])
    champ = ys[:, None] > hz[None, :]
    boite = (x0, y0, x1, y1)

    # -- l'ancienne épinette
    haut_old = _raster(ANCIEN_HAUT[nom], boite, K, 2) > 0.5
    haut_old = ndi.binary_dilation(haut_old, _disque(0.75 * K))       # le liseré d'anticrénelage du contour
    zone_bas = _raster(ANCIEN_BAS[nom], boite, K, 2) > 0.5
    sombre = L < 150
    epais = ndi.binary_opening(sombre, _disque(1.6 * K))            # les fils minces partent, les branches restent
    epais = ndi.binary_dilation(epais, _disque(1.2 * K)) & sombre    # on retrouve leur bord exact
    noyau = ndi.binary_closing(epais, _disque(3.0 * K))              # les vers blancs entre deux noirs
    noyau = ndi.binary_fill_holes(noyau)
    # le noir mince autour (bouts de branches fins, miettes) part aussi, sauf sur les fils de la trace et de la congère
    fils = _raster([_ruban(f, 3.2) for f in FILS], boite, K, 2) > 0.3
    mince = (L < 185) & ~fils & ndi.binary_dilation(noyau, _disque(6 * K))
    ancien_bas = (ndi.binary_dilation(noyau, _disque(0.8 * K)) | ndi.binary_dilation(mince, _disque(0.6 * K)))
    ancien_bas &= zone_bas & champ
    # les miettes noires de l'ancienne épinette restées juste hors du contour (dans les 3 unités autour) partent aussi
    anneau = ndi.binary_dilation(haut_old, _disque(3 * K)) & ~haut_old & ~champ
    lab, n = ndi.label((L < 30) & anneau)
    if n:
        touche = np.unique(lab[ndi.binary_dilation(haut_old, _disque(2)) & (lab > 0)])
        haut_old = haut_old | np.isin(lab, touche[touche > 0])
    ancien = (haut_old & ~champ) | ancien_bas
    # le liseré clair de l'agrandissement autour de l'ancien noir (s'il est encore là) : plus clair que la neige voisine
    neige_ok = champ & (L > 150) & ~ancien
    loin = neige_ok & (ndi.distance_transform_edt(~sombre) > 6 * K)
    base, _ = _normconv(z, loin.astype(np.float32), 8 * K)
    Lb = base.mean(2)
    pres = ndi.binary_dilation(sombre & (ancien | zone_bas), _disque(5.5 * K))
    lisere = champ & pres & (L > Lb + 2.5) & ~ancien
    ancien |= lisere

    # -- le fond rebouché
    fond = z.copy()
    rang = np.zeros((h, w), np.float32)          # la rangée d'arbres continuée (elle déborde un peu de l'ancienne)
    # la neige : chaque pixel prend la neige valide la plus proche, puis un léger lissage
    # (la trace de raquettes, plus foncée que la neige, ne se recopie pas dans le trou : elle s'y étirerait)
    valide_n = champ & ~ancien & (L > 212)
    if ancien.any():
        _, (iy, ix) = ndi.distance_transform_edt(~valide_n, return_indices=True)
        pn = z[iy, ix]
        pn = np.stack([ndi.gaussian_filter(pn[..., c], 0.8 * K) for c in range(3)], -1)
        # la nuit et les collines : sous le haut de la rangée, la nuit (le noir de l'épinette s'y confond) ; au-dessus,
        # le bleu des collines, en aplat (la couleur moyenne des collines autour, sans leurs traits) ; la limite entre
        # les deux est une ligne nette
        hn = _haut_nuit(L, xs, ys, haut_old, K)
        sous = (ys[:, None] > hn[None, :]).astype(np.float32)
        sous = ndi.gaussian_filter(sous, 0.3 * K)[..., None]
        haut_ok = ~champ & ~ancien
        nuit = haut_ok & (L < 30) & (sous[..., 0] > 0.5)
        bleu = haut_ok & (L > 30) & (L < 110) & (sous[..., 0] < 0.5)
        c_nuit = np.median(z[nuit], 0) if nuit.sum() > 50 else NOIR
        pb_, den = _normconv(z, bleu.astype(np.float32), 6 * K)
        if bleu.sum() > 50:
            pb_ = np.where((den < 0.02)[..., None], np.median(z[bleu], 0), pb_)
        ps = sous * c_nuit + (1 - sous) * pb_
        m = ancien & champ
        fond[m] = pn[m]
        m = ancien & ~champ
        fond[m] = ps[m]

        # -- les raccords avec ce que les modules d'avant ont dessiné autour de l'ancienne épinette
        col = _collines()
        # l'ombre festonnée au pied de la rangée (neige.py), sur la neige rebouchée, sous la limite du champ
        ep = _ombre_pied(xs, K, 5 if nom == 'gauche' else 6)
        a_om = np.clip((ep[None, :] - (ys[:, None] - hz[None, :])) * K + 0.5, 0, 1) * (ancien & champ)
        a_om = a_om[..., None]
        fond = fond * (1 - a_om) + ((1 - T_CLAIR) * fond + T_CLAIR * col.COLLINE) * a_om
        # la trace de raquettes, derrière la petite du milieu et jusque sous la grande de droite : recopiée de deux
        # empreintes plus à gauche, décalée en hauteur comme son tracé
        if nom == 'droite':
            cible = (_raster([_ruban(FILS[0], 4.5)], boite, K, 2) > 0.5) & ancien & champ & (xs[None, :] >= 556)
            dx = int(round(PAS_TRACE * K))
            fx, fy = np.array(FILS[0]).T
            for j in np.nonzero(cible.any(0))[0]:
                if j >= dx:
                    dy = int(round((np.interp(xs[j], fx, fy) - np.interp(xs[j - dx], fx, fy)) * K))
                    ii = np.nonzero(cible[:, j])[0]
                    fond[ii, j] = fond[np.clip(ii - dy, 0, h - 1), j - dx]
        # les deux grands traits blancs de la colline de gauche (collines.py) s'arrêtaient net au bord de l'ancienne
        # épinette : ils continuent dans leur sens jusque sous la nouvelle, recopiés sur leur propre tracé au-delà de
        # 6 unités du bord (le bout coupé et son ergot partent avec) ; rien d'autre ne bouge à plus de 3 unités d'eux
        if nom == 'gauche':
            marge = ndi.binary_dilation(ancien, _disque(6 * K))
            sur_trait = np.zeros((h, w), bool)
            for (x_, y_) in TRAITS_G:
                sur_trait |= np.abs(ys[:, None] - (y_ + PENTE_TRAITS * (xs[None, :] - x_))) < 3.0
            cible = marge & ~champ & sur_trait & (xs[None, :] < 40) & (ys[:, None] < hn[None, :] - 2)
            iy, jx = np.nonzero(cible)
            u = np.array([1.0, PENTE_TRAITS]) / math.hypot(1.0, PENTE_TRAITS)
            sy, sx = iy.astype(float), jx.astype(float)
            dedans = np.ones(len(iy), bool)
            while dedans.any():
                sx[dedans] += u[0]; sy[dedans] += u[1]
                ry = np.clip(np.round(sy).astype(int), 0, h - 1); rx = np.clip(np.round(sx).astype(int), 0, w - 1)
                dedans = marge[ry, rx] & (rx < w - 1) & (ry < h - 1)
            src = fond[ry, rx]
            Lb = pb_[iy, jx].mean(1)
            al = np.clip((src.mean(1) - Lb) / (230.0 - Lb), 0, 1)[:, None]      # la part de blanc de la source
            fond[iy, jx] = pb_[iy, jx] * (1 - al) + src * al
        # la rangée d'arbres, derrière la nouvelle épinette : les petites épinettes de collines.py
        au_dessus = (~champ).astype(np.float32)
        for sil_r, neiges_r in _rangee(ancien & ~champ, hn, hz, boite, K, 17 if nom == 'gauche' else 29):
            for polys, coul in (([sil_r], c_nuit), (neiges_r, col.BLANC)):
                r = _raster_local(polys, boite, K, h, w) if len(polys) else None
                if r is None:
                    continue
                al, i0, j0 = r
                hh_, ww_ = al.shape
                al = al * au_dessus[i0:i0 + hh_, j0:j0 + ww_]
                blk = fond[i0:i0 + hh_, j0:j0 + ww_]
                blk[:] = blk * (1 - al[..., None]) + coul * al[..., None]
                rang[i0:i0 + hh_, j0:j0 + ww_] = np.maximum(rang[i0:i0 + hh_, j0:j0 + ww_], al)

    # -- les nouvelles épinettes, de l'arrière vers l'avant
    neige_coul = np.median(z[loin], 0) if loin.any() else np.array([219, 228, 234], np.float32)
    out = fond
    total = np.zeros((h, w), np.float32)
    for sp in EPINETTES[nom]:
        for noirs, neiges in epinette(sp):
            if not noirs:
                continue
            an = _raster(noirs, boite, K)
            if 'masque' in sp:
                mo = _masque_ancien(L, dict(sp['masque'], pointe=sp['pointe']), boite, K, ys, sp['cx'])
                an = np.maximum(an, mo)
                dedans = ndi.binary_erosion(mo > 0.5, _disque(0.6 * K)).astype(np.float32)
                ab = np.minimum(_raster(_neige_doigts(sp, mo, boite, K), boite, K), dedans)
            else:
                ab = np.minimum(_raster(neiges, boite, K), an)
            out = out * (1 - an[..., None]) + NOIR * an[..., None]
            out = out * (1 - ab[..., None]) + neige_coul * ab[..., None]
            total = np.maximum(total, an)

    # -- la zone : l'ancienne épinette et la nouvelle, rien d'autre
    m = np.maximum(np.maximum(ancien.astype(np.float32), total), rang)
    res = z * (1 - m[..., None]) + out * m[..., None]
    return (Y0, Y1, X0, X1), np.clip(np.round(res), 0, 255).astype(np.uint8)


def appliquer(a, K=4):
    a = np.asarray(a)
    res = a.copy()
    for nom in ('gauche', 'droite'):
        (Y0, Y1, X0, X1), z = _zone(a, nom, K)
        res[Y0:Y1, X0:X1] = z
    return res


if __name__ == '__main__':
    import sys
    src, dst = sys.argv[1], sys.argv[2]
    a = np.asarray(Image.open(src).convert('RGB'))
    Image.fromarray(appliquer(a, a.shape[1] // 768)).save(dst)
    print('ok', dst)
