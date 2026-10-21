"""Formes du lièvre, en coordonnées de l'image 768 × 960 (multipliées par K × S au dessin).
Importé par guide.py (l'image de départ de l'img2img) et par les essais."""
import math
import numpy as np


def bez(p0, p1, p2, p3, n=24):
    t = np.linspace(0, 1, n)[:, None]
    p0, p1, p2, p3 = map(np.array, (p0, p1, p2, p3))
    return list(map(tuple, (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3 * p3))


def chemin(segs):
    """segs : liste de (p0, c1, c2, p3) enchaînés ; rend la liste des points."""
    pts = []
    for s in segs:
        pts += bez(*s)[(1 if pts else 0):]
    return pts


# Le lièvre, dans un repère de 100 unités de haut : le sol à y = 0, le haut des oreilles à y = -100, x vers la droite.
# Vu de dos, assis sur ses pattes arrière, la tête tournée de profil vers la droite (vers le canot).
CORPS = chemin([                                        # le dos et les deux cuisses, vus de derrière
    ((0, 0), (-14, 1), (-27, -2), (-28, -15)),         # la cuisse gauche
    ((-28, -15), (-29, -29), (-23, -41), (-15, -49)),  # le flanc gauche
    ((-15, -49), (-11, -54), (-8, -58), (-6, -61)),    # l'épaule gauche, qui monte dans la nuque
    ((-6, -61), (2, -62), (14, -58), (20, -50)),       # le cou épais, sous la joue
    ((20, -50), (23, -40), (26, -27), (26, -14)),      # le flanc droit
    ((26, -14), (26, -2), (14, 1), (0, 0)),            # la cuisse droite
])
TALON_G = chemin([((-24, -3), (-30, -4), (-34, -1), (-32, 1)), ((-32, 1), (-28, 2), (-22, 2), (-18, 0))])
TALON_D = chemin([((20, -3), (27, -4), (32, -2), (31, 1)), ((31, 1), (26, 2), (20, 2), (16, 0))])
TETE = chemin([                                         # la tête de profil, le nez à droite, un peu levé
    ((-7, -56), (-10, -64), (-7, -73), (2, -77)),      # l'arrière du crâne
    ((2, -77), (11, -80), (21, -77), (27, -72)),       # le front
    ((27, -72), (31, -69), (33, -66), (32.5, -63)),    # le museau, rond
    ((32.5, -63), (32, -60), (29, -58.5), (26, -58)),  # le nez, la lèvre
    ((26, -58), (22, -55), (16, -51), (8, -50)),       # le menton, la gorge
    ((8, -50), (0, -50), (-5, -52), (-7, -56)),
])
OREILLE_G = chemin([                                    # l'oreille de derrière, un peu couchée vers l'arrière
    ((-2, -70), (-7, -80), (-11, -91), (-11, -97)),
    ((-11, -97), (-11, -101), (-6, -101), (-4, -96)),
    ((-4, -96), (-1, -88), (3, -79), (5, -73)),
])
OREILLE_D = chemin([                                    # l'oreille de devant, dressée
    ((4, -73), (3, -83), (3, -94), (6, -99)),
    ((6, -99), (8, -102), (12, -101), (13, -96)),
    ((13, -96), (14, -87), (13, -79), (12, -72)),
])
BOUT_D = chemin([((4.5, -90), (4, -95), (5, -98), (6, -99)), ((6, -99), (8, -102), (12, -101), (13, -96)),
                 ((13, -96), (13.5, -93), (13.5, -91), (13.3, -89))])
BORD_OREILLE = chemin([((7, -76), (6, -83), (6, -88), (6.5, -90))])
OEIL = (16, -68, 3.0)
QUEUE = chemin([((-6, -2), (-8, -8), (-3, -12), (2, -11)), ((2, -11), (7, -10), (7, -4), (5, -2)),
                ((5, -2), (2, -1), (-3, -1), (-6, -2))])
QUEUE_DESSOUS = chemin([((-5, -3), (-3, -6), (3, -6), (5, -3)), ((5, -3), (2, -2), (-2, -2), (-5, -3))])
# petites gouges en V qui suivent le poil : elles descendent du dos vers les cuisses, en éventail
POILS = [(-18, -16, 100, 6), (-21, -27, 80, 6), (-16, -38, 65, 5), (-9, -45, 55, 5), (-13, -22, 95, 5),
         (-8, -32, 80, 5), (-3, -42, 75, 4), (-4, -22, 95, 5), (3, -30, 95, 5), (8, -40, 105, 4),
         (10, -22, 95, 5), (16, -32, 110, 5), (18, -18, 95, 5), (-20, -8, 110, 4), (12, -10, 85, 4)]
LISERE = [chemin([((13, -96), (14, -87), (13, -79), (12, -72))]),
          chemin([((21, -77), (27, -72), (31, -69), (33, -66))]),
          chemin([((20, -50), (23, -40), (26, -27), (26, -14))])]


def place(pts, cx, base, s):
    """Du repère du lièvre (100 unités) à l'image 768 × 960."""
    return [(cx + x * s / 100, base + y * s / 100) for x, y in pts]
