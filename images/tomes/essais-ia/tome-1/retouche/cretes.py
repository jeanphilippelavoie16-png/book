"""Tome 1, page de titre : les crêtes orange recoupées en linogravure (JP, 19 octobre 2026 : « reprends exactement la
même image, mais applique la même rigueur de qualité que les autres tomes »).

Ce qui change, dans la boîte 0,398 à 768,528 (coordonnées 768 × 960), et seulement dans le masque des crêtes :
- l'intérieur des crêtes est refait : le noir de la crête et des traits de gouge orange parallèles qui descendent de
  l'arête vers le pied en suivant la pente, au pas de la crête de gauche d'origine (5 unités) ; chaque trait est plein
  au départ et effilé au bout, d'une seule encre ; le flanc à l'ombre (à droite de chaque sommet) porte des traits plus
  espacés (un pas et demi) et plus courts ; aucun trait n'en touche un autre : plus de cellules, d'ovales ni de trous ;
- la neige est une bande crème nette d'épaisseur régulière, plus épaisse aux sommets, effilée dans les creux ;
- au creux de la lune, les deux lignes de neige continuent en ligne droite jusqu'au fond du creux : la lune passe
  derrière les crêtes au lieu de couler jusqu'à la colline sombre.
Ce qui ne change pas : le contour du haut et du bas de chaque crête, relevé sur l'image d'origine, et les couleurs
(noir #060F1A, orange #C77044, crème de la neige d'origine).

Le contour se relève toujours sur l'image d'origine (titre-tome-1-original.jpg, dans le dossier parent), jamais sur
l'image reçue : le module du ciel, appliqué avant, a déjà refait la lune, et la neige ne s'en distingue plus.

    appliquer(a, K) : a = image RVB uint8 (3840 × 3072), K = 4 pixels par unité 768 × 960 ; rend une copie retouchée.
    python3 cretes.py SOURCE SORTIE   (essai du module seul)
"""
import functools
import math
import os
import sys

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

ICI = os.path.dirname(os.path.abspath(__file__))
ORIGINAL = os.path.normpath(os.path.join(ICI, '..', 'titre-tome-1-original.jpg'))

NOIR = np.array([0x06, 0x0F, 0x1A], float)
ORANGE = np.array([0xC7, 0x70, 0x44], float)
NEIGE = np.array([0xF0, 0xE0, 0xD9], float)      # la crème de la neige des crêtes d'origine (médiane)

U = 4                      # pixels de l'image par unité 768 (l'image fait 3072 × 3840)
Y0, Y1 = 1540, 2170        # la bande de travail, en pixels de l'image : la boîte 398..528 et sa marge
S = 4                      # suréchantillonnage du rendu (bords nets, sans escalier)

# Le creux de la lune (unités 768) : de X_LUNE_G à X_LUNE_D, la lune touche la neige ; la neige y est prolongée en
# ligne droite, ancrée sur la neige mesurée juste à côté, à la pente du haut de l'orange.
X_LUNE_G, X_LUNE_D = 534.75, 635.5
PENTE_G = (540, 588)
PENTE_D = (606, 630)

# Les traits (unités 768)
PAS = 5.0                  # le pas, perpendiculaire aux traits : celui de la crête de gauche d'origine
LARG = 4.3                 # la largeur au départ
PLEIN = 0.72               # la part du trait qui garde sa pleine largeur, avant de s'effiler
PENCHE = 38.0              # l'angle depuis la verticale sur un flanc presque plat (degrés)
OMBRE_RAIDE = 0.6          # sur le flanc à l'ombre, l'angle depuis la verticale est réduit d'autant
JOUR = 0.25                # le jour minimum entre deux traits voisins (unités)


@functools.lru_cache(maxsize=1)
def _original():
    return np.asarray(Image.open(ORIGINAL).convert('RGB'))


@functools.lru_cache(maxsize=1)
def contours():
    """Le contour du haut T et du bas B de la bande des crêtes, en pixels de l'image (float), une valeur par colonne ;
    l'épaisseur de neige (pixels) par colonne ; la pente lissée de l'arête."""
    a = _original()[Y0:Y1].astype(np.int32)
    R, B = a[..., 0], a[..., 2]
    L = a.mean(2)
    orange = (R - B > 45) & (R > 90)
    P = orange | (L > 110)
    H, W = L.shape
    oc = ndimage.binary_closing(orange, structure=np.ones((7, 1), bool))
    otop = np.where(oc.any(0), oc.argmax(0), -1)

    # Le haut : le premier pixel de neige ou d'orange (quatre de suite, pour sauter une étoile), dans les 10 unités
    # au-dessus du haut de l'orange.
    T = np.zeros(W)
    run = ndimage.uniform_filter1d(P.astype(float), 4, axis=0, origin=-1) > 0.99
    for x in range(W):
        y0 = max(0, otop[x] - 10 * U)
        idx = np.nonzero(run[y0:otop[x] + 1, x])[0]
        T[x] = y0 + idx[0] if len(idx) else otop[x]
    T = ndimage.median_filter(T, 5, mode='nearest')

    # Le creux de la lune : deux droites qui se rejoignent au fond du creux.
    xs = np.arange(W)

    def pente(r):
        xx = np.arange(r[0] * U, r[1] * U)
        return np.polyfit(xx, otop[xx].astype(float), 1)[0]
    xl, xr = int(X_LUNE_G * U), int(X_LUNE_D * U)
    gl = T[xl - 14:xl - 2].mean() + pente(PENTE_G) * (xs - (xl - 8))
    dr = T[xr + 2:xr + 14].mean() + pente(PENTE_D) * (xs - (xr + 8))
    dans_v = (xs >= xl - 2) & (xs <= xr + 2)
    T = np.where(dans_v, np.minimum(gl, dr), T)
    T = ndimage.gaussian_filter1d(T, 1.5, mode='nearest')

    # Le bas : la fin de l'orange (fermé) sous le haut ; au creux, jusqu'à la colline sombre.
    oc2 = ndimage.binary_closing(orange, structure=np.ones((5, 5), bool))
    Bt = np.zeros(W)
    for x in range(W):
        t0 = int(T[x])
        idx = np.nonzero(oc2[t0:t0 + 75 * U, x])[0]
        Bt[x] = t0 + idx[-1] + 1 if len(idx) else t0 + 3 * U
    sombre = L < 70
    for x in np.nonzero(dans_v)[0]:
        t0 = int(T[x]) + 2
        r6 = np.convolve(sombre[t0:t0 + 20 * U, x].astype(int), np.ones(6, int), 'valid')
        j = np.nonzero(r6 == 6)[0]
        if len(j):
            Bt[x] = max(Bt[x], t0 + j[0] + 2)
    Bt = ndimage.median_filter(Bt, 9, mode='nearest')
    # les encoches étroites du bas (le noir qui remontait entre deux bouts de fils) se referment
    Bt = ndimage.minimum_filter1d(ndimage.maximum_filter1d(Bt, 6 * U + 1, mode='nearest'), 6 * U + 1, mode='nearest')
    Bt = ndimage.gaussian_filter1d(Bt, 3.0, mode='nearest')

    # La pente de l'arête, lissée sur une dizaine d'unités : elle décide du sens des traits et du flanc à l'ombre.
    pente_lisse = np.gradient(ndimage.gaussian_filter1d(T, 10 * U, mode='nearest'))
    # L'épaisseur de la neige : plus épaisse aux sommets, effilée dans les creux (hauteur de l'arête au-dessus du creux
    # le plus bas à moins de 35 unités).
    Tm = ndimage.gaussian_filter1d(T, 4 * U, mode='nearest')
    bas_local = ndimage.maximum_filter1d(Tm, 70 * U + 1, mode='nearest')
    prom = np.clip((bas_local - Tm) / (16.0 * U), 0, 1)
    ep = (1.4 + 1.6 * prom) * U
    Bt = np.maximum(Bt, T + ep + 1.0 * U)
    return (T + Y0, Bt + Y0, ep, pente_lisse)


def _traits(T, Bt, ep, pente, Hh, Wh):
    """Les traits de gouge, en polygones effilés posés le long de l'arête, dessinés au suréchantillonnage."""
    W = len(T)
    xs = np.arange(W)
    img = Image.new('L', (Wh, Hh), 0)
    dessin = ImageDraw.Draw(img)
    MARGE = 40 * U                                          # les traits qui entrent par les bords de l'image
    rng = np.random.default_rng(19)

    # Les départs suivent l'arête lissée sur 3 unités : une petite bosse de l'arête ne fait pas converger deux traits
    # (la neige recouvre l'attaque de toute façon).
    Ts = ndimage.gaussian_filter1d(T, 3 * U, mode='nearest')

    def Tx(x):
        return float(np.interp(x, xs, Ts)) - Y0

    def Bx(x):
        return float(np.interp(x, xs, Bt)) - Y0

    S0 = 0.04              # un flanc presque plat compte comme éclairé (les traits y penchent à gauche)

    # Le champ des directions, une valeur par colonne. Le sens (gauche ou droite) suit les grands flancs seulement
    # (arête lissée sur 20 unités) : les petites bosses d'une arête ne font pas tourner les traits. Sur un même flanc,
    # tous les traits ont le même angle : ils restent parallèles du haut au bas, au même pas. Ils ne tournent qu'au
    # sommet, en éventail.
    pente20 = np.gradient(ndimage.gaussian_filter1d(T, 20 * U, mode='nearest'))
    a20 = np.degrees(np.arctan(np.abs(pente20)))
    a_loc = np.degrees(np.arctan(np.abs(np.gradient(ndimage.gaussian_filter1d(T, 3 * U, mode='nearest')))))
    signe = np.where(S0 - pente20 > 0, -1.0, 1.0)           # -1 : face éclairée, le trait penche à gauche
    mag = np.zeros(W)
    for seg in np.split(np.arange(W), np.nonzero(np.diff(signe))[0] + 1):
        # plus penché sur un flanc raide, mais toujours plus raide que l'arête (sinon le trait ressort par la neige)
        raide = 90 - np.percentile(np.maximum(a20[seg], a_loc[seg]), 85) - 20
        mag[seg] = max(min(PENCHE + 0.3 * float(np.median(a20[seg])), raide), 10)
    # sur le flanc à l'ombre, le trait descend plus droit : il va chercher le pied au lieu de longer la neige
    alpha = signe * np.radians(mag) * np.where(signe < 0, 1.0, OMBRE_RAIDE)
    alpha = ndimage.gaussian_filter1d(alpha, 4 * U, mode='nearest')     # l'éventail sous un sommet
    ecl_x = 0.5 * (1 + np.tanh((S0 - pente20) / 0.03))   # 1 sur la face éclairée, 0 sur le flanc à l'ombre

    def angle(x):          # depuis la verticale ; négatif = le trait descend vers la gauche
        return float(np.interp(x, xs, alpha))

    def eclaire(x):
        return float(np.interp(x, xs, ecl_x))

    # Les départs, sous la neige, au pas mesuré perpendiculairement aux traits.
    def depart(x):
        return np.array([x, Tx(x) + 0.7 * float(np.interp(x, xs, ep))])

    departs = []
    x, k = -MARGE + 1.0, 0
    while x < W + MARGE - 1:
        al = angle(x)
        departs.append((x, al, eclaire(x), k))
        d = np.array([math.sin(al), math.cos(al)])
        p0 = depart(x)
        # le flanc à l'ombre porte moins de traits : un pas et demi au lieu d'un
        pas = PAS * U * (0.97 + 0.06 * rng.random()) * (1.0 + 0.5 * (1 - eclaire(x)))
        x2 = x + 1.0
        while x2 < W + MARGE:
            v = depart(x2) - p0
            if abs(v[0] * d[1] - v[1] * d[0]) >= pas:
                break
            x2 += 0.5
        x = x2
        k += 1

    # L'encre déjà posée, au pixel de l'image : un nouveau trait s'arrête avant de toucher un voisin (jamais de cellule).
    encre = np.zeros((Y1 - Y0 + 1, W + 2 * MARGE + 1), bool)

    def libre(px, py):
        iy, ix = int(round(py)), int(round(px)) + MARGE
        if iy < 0 or iy >= encre.shape[0] or ix < 0 or ix >= encre.shape[1]:
            return True
        return not encre[iy, ix]

    def poser(poly):
        xs_ = [p_[0] + MARGE for p_ in poly]
        ys_ = [p_[1] for p_ in poly]
        bx0, by0 = int(math.floor(min(xs_))) - 1, int(math.floor(min(ys_))) - 1
        bx1, by1 = int(math.ceil(max(xs_))) + 2, int(math.ceil(max(ys_))) + 2
        im = Image.new('1', (bx1 - bx0, by1 - by0), 0)
        ImageDraw.Draw(im).polygon([(x_ - bx0, y_ - by0) for x_, y_ in zip(xs_, ys_)], fill=1)
        m = np.asarray(im, bool)
        cy0, cx0 = max(0, by0), max(0, bx0)
        cy1, cx1 = min(encre.shape[0], by1), min(encre.shape[1], bx1)
        if cy1 > cy0 and cx1 > cx0:
            encre[cy0:cy1, cx0:cx1] |= m[cy0 - by0:cy1 - by0, cx0 - bx0:cx1 - bx0]

    # La face éclairée d'abord, le flanc à l'ombre ensuite : c'est l'ombre qui cède quand deux traits se rapprochent.
    ordre = [d for d in departs if d[2] >= 0.5] + [d for d in departs if d[2] < 0.5]
    jour = JOUR * U

    def encre_en(px, py):
        iy = np.clip(np.round(py).astype(int), 0, encre.shape[0] - 1)
        ix = np.clip(np.round(px).astype(int) + MARGE, 0, encre.shape[1] - 1)
        return encre[iy, ix]

    def tracer(x0, y0, al, w0, frac_voulue, attaque):
        """Un trait : l'axe depuis (x0, y0) dans la direction al, jusqu'au pied (ou à l'encre d'un voisin), une
        part frac_voulue de cette longueur, plein puis effilé ; attaque : de combien il remonte dans la neige.
        Rend False si le trait ne se pose pas."""
        courbe = -math.copysign(math.radians(4.0), al)    # une légère courbe vers la verticale, la même pour tous
        pts, dirs = [(x0, y0)], [(math.sin(al), math.cos(al))]
        xx, yy = x0, y0
        i = 0
        while True:
            a2 = al + courbe * min(1.0, i / (40.0 * U))
            sx, sy = math.sin(a2), math.cos(a2)
            xx += sx
            yy += sy
            i += 1
            if xx < -MARGE or xx >= W + MARGE - 1 or yy > Bx(xx) + 0.5 * U or yy < Tx(xx) + 0.3 * U:
                break
            if i > 2 and not libre(xx, yy):
                break
            pts.append((xx, yy))
            dirs.append((sx, sy))
        P = np.array(pts)
        D = np.array(dirs)
        Nn = np.stack([-D[:, 1], D[:, 0]], 1)
        # la place libre de chaque côté de l'axe, sondée au demi-pixel : un trait qui s'approche d'un voisin s'amincit
        # pour garder le jour entre les deux, au lieu de s'y coller ou de s'arrêter net
        ks = np.arange(0.5, w0 / 2 + jour + 1.0, 0.5)
        place = []
        for sgn in (1, -1):
            hit = encre_en(P[:, None, 0] + sgn * Nn[:, None, 0] * ks[None, :],
                           P[:, None, 1] + sgn * Nn[:, None, 1] * ks[None, :])
            premier = np.where(hit.any(1), ks[np.argmax(hit, 1)], ks[-1] + 1.0)
            place.append(premier - jour - 0.5)
        place_g, place_d = place
        etroit = np.nonzero((place_g + place_d < 1.5) & (np.arange(len(P)) > 2))[0]
        bloque = len(etroit) > 0
        if bloque:
            n0 = etroit[0]
            P, Nn, place_g, place_d = P[:n0], Nn[:n0], place_g[:n0], place_d[:n0]
        dispo = len(P) - 1
        if dispo < 3.5 * U:
            return False                   # un bout de trait trop court ferait une dent
        frac = 1.0 if bloque else frac_voulue
        n_pts = max(int(dispo * frac), int(3.5 * U)) + 1
        P, Nn, place_g, place_d = P[:n_pts], Nn[:n_pts], place_g[:n_pts], place_d[:n_pts]
        ln = len(P) - 1
        w0 = min(w0, 0.4 * ln)             # un trait court est aussi plus fin (une petite entaille, pas une dent)
        # plein, puis effilé : la largeur tombe sans cassure jusqu'à une pointe (la gouge qui sort du bois) ; la pointe
        # est longue d'au moins trois largeurs, même sur un trait court
        l_eff = max((1 - PLEIN) * ln, min(0.85 * ln, 3.0 * w0))
        jj = np.arange(ln + 1)
        t = np.clip((jj - (ln - l_eff)) / l_eff, 0, 1)
        demi = w0 * (1 - t ** 1.8) / 2
        hg = np.minimum(demi, np.maximum(ndimage.minimum_filter1d(place_g, 5), 0))
        hd = np.minimum(demi, np.maximum(ndimage.minimum_filter1d(place_d, 5), 0))
        hg = np.minimum(ndimage.gaussian_filter1d(hg, 2.0), np.maximum(place_g, 0))
        hd = np.minimum(ndimage.gaussian_filter1d(hd, 2.0), np.maximum(place_d, 0))
        g = P + Nn * hg[:, None]
        d = P - Nn * hd[:, None]
        poly = [tuple(q) for q in g] + [tuple(q) for q in d[::-1]]
        if attaque > 0:                    # l'attaque remonte dans la neige : le trait part de l'arête, sans jour
            hx, hy = -math.sin(al) * attaque, -math.cos(al) * attaque
            poly = [(g[0][0] + hx, g[0][1] + hy)] + poly + [(d[0][0] + hx, d[0][1] + hy)]
        dessin.polygon([(px * S, py * S) for px, py in poly], fill=255)
        poser(poly)
        return True

    for (x0, al, ecl, k) in ordre:
        ombre = ecl < 0.5
        epx = float(np.interp(x0, xs, ep))
        w0 = LARG * U * (0.9 if ombre else 1.0) * (0.95 + 0.10 * rng.random())
        frac = ecl * (0.95 + 0.05 * rng.random()) + (1 - ecl) * (0.80 + 0.15 * rng.random())
        tracer(x0, Tx(x0) + epx * 0.7, al, w0, frac, epx * 0.9)

    return np.asarray(img) > 127


@functools.lru_cache(maxsize=1)
def calque():
    """Les couvertures (0..1) du noir, de l'orange et de la neige, par pixel de la bande Y0..Y1."""
    T, Bt, ep, pente = contours()
    W = len(T)
    Hh, Wh = (Y1 - Y0) * S, W * S
    xh = (np.arange(Wh) + 0.5) / S - 0.5
    Th = (np.interp(xh, np.arange(W), T) - Y0) * S
    Bh = (np.interp(xh, np.arange(W), Bt) - Y0) * S
    eph = np.interp(xh, np.arange(W), ep) * S
    yh = np.arange(Hh, dtype=np.float32)[:, None]
    crete = (yh >= Th[None, :]) & (yh <= Bh[None, :])
    # la neige : à moins de ep de la limite du ciel, mesuré perpendiculairement à l'arête
    dist = ndimage.distance_transform_edt(yh >= Th[None, :])
    neige = crete & (dist <= eph[None, :])
    del dist
    traits = _traits(T, Bt, ep, pente, Hh, Wh)
    lab = np.zeros((Hh, Wh), np.uint8)
    lab[crete] = 1
    lab[crete & traits] = 2
    lab[neige] = 3

    def cov(v):
        return (lab == v).reshape(Hh // S, S, Wh // S, S).mean((1, 3), dtype=np.float32)
    return cov(1), cov(2), cov(3)


def appliquer(a, K=4):
    assert K == U, 'le module est réglé pour K = 4'
    a = np.asarray(a)
    out = a.copy()
    T, Bt, ep, pente = contours()
    c_noir, c_or, c_ne = calque()
    c_tot = c_noir + c_or + c_ne
    band = a[Y0:Y1].astype(np.float32)
    yy = np.arange(Y0, Y1)[:, None]
    # Le fond des pixels de bord : au-dessus de l'arête, le ciel (ou la lune) pris 5 pixels plus haut, pour effacer le
    # liseré flou d'origine ; sous le bas, la colline prise 8 pixels plus bas, pour effacer le halo brun des fils.
    haut = (yy < T[None, :] + 1) & (yy >= T[None, :] - 4)
    bas = (yy > Bt[None, :] - 1) & (yy <= Bt[None, :] + 7)
    dehors = band.copy()
    hi, hj = np.nonzero(haut)
    dehors[hi, hj] = a[np.clip(Y0 + hi - 5, 0, None), hj]
    bi, bj = np.nonzero(bas)
    dehors[bi, bj] = a[np.clip(Y0 + bi + 8, 0, a.shape[0] - 1), bj]
    # Les bouts de fils orange que l'image d'origine laissait traîner sous la crête, dans la colline : ils s'effacent
    # avec la colline recopiée plus bas (12 pixels sous le bout le plus bas de la tache).
    Rb, Bb = dehors[..., 0], dehors[..., 2]
    sous = (yy > Bt[None, :] - 1) & (yy < np.minimum(Bt[None, :] + 12 * U, 528 * U))
    reste = sous & (Rb - Bb > 6) & (Rb > 20)        # la colline est bleue : tout ce qui tire au rouge est un reste
    reste = ndimage.binary_dilation(reste, iterations=3) & (yy > Bt[None, :] - 1) & (yy < 528 * U)
    lab, n = ndimage.label(reste)
    for sl in ndimage.find_objects(lab):
        y_bas = sl[0].stop + 12
        for j in range(sl[1].start, sl[1].stop):
            ii = np.nonzero(reste[sl[0], j])[0] + sl[0].start
            dehors[ii, j] = a[np.clip(Y0 + y_bas + (ii - ii.min()), 0, a.shape[0] - 1), j]
    bas = bas | reste
    res = (dehors * (1 - c_tot)[..., None] + NOIR * c_noir[..., None] + ORANGE * c_or[..., None]
           + NEIGE * c_ne[..., None])
    zone = (c_tot > 0) | haut | bas
    blk = out[Y0:Y1]
    blk[zone] = np.clip(np.round(res[zone]), 0, 255).astype(np.uint8)
    return out


if __name__ == '__main__':
    src = sys.argv[1] if len(sys.argv) > 2 else ORIGINAL
    dst = sys.argv[-1]
    a = np.asarray(Image.open(src).convert('RGB'))
    Image.fromarray(appliquer(a, 4)).save(dst)
    print('ok', dst)
