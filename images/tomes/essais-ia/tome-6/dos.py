# -*- coding: utf-8 -*-
"""Tome 6, L'atelier : le dos de la couverture C reprend le paysage du devant (JP, 19 octobre 2026 : « j'aime que pour
le tome 1 on retrouve des éléments de la couverture en arrière, fais-le pour les autres » ; « mets-en dans les trous
sur la page en arrière, faut juste pas que ça touche au texte »).

Dans le grand trou de la quatrième, entre le sommaire et « Les auteurs », une bande de paysage : les collines
enneigées et leurs traits de gouge, une ligne de crête, et la forêt d'épinettes enneigées qui s'enfonce dans la nuit.
Rien n'est dessiné à la main : les traits des collines et les épinettes sont découpés dans l'image du devant
(images/tomes/titre-tome-6.jpg), à son échelle. Les traits suivent le profil des nouvelles collines ; les épinettes
sont les trois arbres isolés de l'image, retournés et mis à l'échelle. On compose à double taille, puis on réduit.

La bande se loge dans le plus grand trou de la quatrième, mesuré sur les boîtes du texte (info['rects']), avec une
marge nette au-dessus (le dernier filet du sommaire) et au-dessous (« Les auteurs »). Elle part du fond perdu à gauche
et finit avant la tranche : la tranche et le devant ne changent pas.

    motif(can, info) : appelé par images/tomes/essais-ia/tome-1/couverture.py (motif_dos)
"""
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

CREME = np.array([252, 238, 211], np.float32)   # médiane du crème des collines de l'image du devant
LC, LD = 240.0, 20.0                            # luminance du crème et du noir de l'encre, dans l'image
SS = 2                                          # on compose à double taille
MARGE_HAUT = 0.25                               # po entre le dernier filet du sommaire et le haut des collines
MARGE_BAS = 0.22                                # po entre la dernière tache de neige et « Les auteurs »
GRAINE = 6


def _lum(a):
    return a.astype(np.float32) @ np.array([.2126, .7152, .0722], np.float32)


def _encre(L):
    """1 sur le noir de l'encre, 0 sur le crème."""
    return np.clip((LC - L) / (LC - LD), 0, 1)


# ------------------------------------------------------------------ le trou
def _trou(info):
    """Le plus grand trou vertical de la quatrième (en px du fond) : entre deux blocs de texte."""
    k = info['ppp'] / 96
    xt = info['xt'] / k
    iv = sorted((r[1], r[3]) for r in info['rects'] if r[4] >= 0 and (r[0] + r[2]) / 2 < xt)
    xs = [(r[0], r[2]) for r in info['rects'] if r[4] >= 0 and (r[0] + r[2]) / 2 < xt]
    best, fin = (0, 0, 0), iv[0][1]
    for a, b in iv[1:]:
        if a - fin > best[0]:
            best = (a - fin, fin, a)
        fin = max(fin, b)
    return best[1] * k, best[2] * k, min(x for x, _ in xs) * k, max(x for _, x in xs) * k


# ------------------------------------------------------------------ ce qu'on découpe dans l'image du devant
def _source(img):
    a = np.asarray(img.convert('RGB'))
    if a.shape[:2] != (3840, 3072):
        raise ValueError('dos du tome 6 : image du devant attendue en 3072 × 3840')
    L = _lum(a)
    # le profil des collines contre le ciel (les petites étoiles ôtées par une ouverture)
    Lo = ndi.grey_opening(L[1150:2000], size=(7, 7))
    yS = (np.argmax(Lo > 150, axis=0) + 1150).astype(np.float32)
    yS[:20] = yS[20]
    yS = ndi.gaussian_filter1d(yS, 6)
    # les traits de gouge des collines : petites taches noires entourées de crème, ni arbre, ni toit, ni crête
    y0, y1 = 1220, 1880
    S = L[y0:y1]
    noir, creme = S < 150, S > 185
    lab, n = ndi.label(noir)
    sz = np.bincount(lab.ravel())
    garde = np.zeros(n + 1, bool)
    for i, s in enumerate(ndi.find_objects(lab), 1):
        h, w = s[0].stop - s[0].start, s[1].stop - s[1].start
        if sz[i] < 60 or sz[i] > 6000 or w > 560 or h > 150:
            continue
        a_, b_ = max(0, s[0].start - 4), min(S.shape[0], s[0].stop + 4)
        c_, d_ = max(0, s[1].start - 4), min(S.shape[1], s[1].stop + 4)
        m = lab[a_:b_, c_:d_] == i
        anneau = ndi.binary_dilation(m, iterations=3) & ~ndi.binary_dilation(m, iterations=1)
        if anneau.any() and creme[a_:b_, c_:d_][anneau].mean() >= 0.97:
            garde[i] = True
    traits = np.zeros(L.shape, np.float32)
    zone = ndi.binary_dilation(garde[lab], iterations=2)
    traits[y0:y1][zone] = _encre(S)[zone]
    # les trois épinettes isolées de l'image (bas à droite, et la petite au milieu à gauche)
    noir = L < 120
    noir[:1300] = False
    lab, n = ndi.label(noir)
    arbres = []
    for x, y in ((2790, 3600), (2490, 3700), (672, 2740)):          # un point du tronc de chacune
        i = lab[y, x]
        s = ndi.find_objects((lab == i).astype(int))[0]
        b = (max(0, s[0].start - 6), s[0].stop + 6, max(0, s[1].start - 6), s[1].stop + 6)
        m = lab[b[0]:b[1], b[2]:b[3]] == i
        plein = ndi.binary_fill_holes(m)
        e = _encre(L[b[0]:b[1], b[2]:b[3]])
        silh = ndi.binary_dilation(plein, iterations=2)
        noirceur = np.where(silh, e, 0).astype(np.float32)                      # l'arbre, avec son bord doux
        neige = np.where(ndi.binary_erosion(plein, iterations=2), 1 - e, 0).astype(np.float32)   # les taches de neige
        arbres.append((noirceur, neige, silh.astype(np.float32)))
    return yS, traits, arbres


# ------------------------------------------------------------------ outils
def _courbe(points, xs):
    """Profil lisse par des points (x, y) : interpolation monotone par morceaux (pas de bosse parasite)."""
    px, py = np.array(points, np.float64).T
    return np.interp(xs, px, py) if len(px) < 3 else _pchip(px, py, xs)


def _pchip(x, y, xs):
    h = np.diff(x)
    d = np.diff(y) / h
    m = np.zeros_like(y)
    for i in range(1, len(x) - 1):
        if d[i - 1] * d[i] > 0:
            w1, w2 = 2 * h[i] + h[i - 1], h[i] + 2 * h[i - 1]
            m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i])
    m[0], m[-1] = d[0], d[-1]
    xs = np.clip(xs, x[0], x[-1])
    i = np.clip(np.searchsorted(x, xs) - 1, 0, len(x) - 2)
    t = (xs - x[i]) / h[i]
    h00, h10, h01, h11 = 2 * t**3 - 3 * t**2 + 1, t**3 - 2 * t**2 + t, -2 * t**3 + 3 * t**2, t**3 - t**2
    return h00 * y[i] + h10 * h[i] * m[i] + h01 * y[i + 1] + h11 * h[i] * m[i + 1]


def _poser(dst, pat, y, x, op):
    """Pose le motif pat (2D) dans dst à (y, x) (coin haut gauche), rogné aux bords, avec op(dst_zone, pat_zone)."""
    H, W = dst.shape
    h, w = pat.shape
    a, b, c, d = max(0, y), min(H, y + h), max(0, x), min(W, x + w)
    if a >= b or c >= d:
        return
    dst[a:b, c:d] = op(dst[a:b, c:d], pat[a - y:b - y, c - x:d - x])


def _echelle(p, f, miroir=False):
    if miroir:
        p = p[:, ::-1]
    h, w = p.shape
    im = Image.fromarray(np.ascontiguousarray(p, np.float32)).resize((max(1, round(w * f)), max(1, round(h * f))), Image.LANCZOS)
    return np.clip(np.asarray(im), 0, 1)


# ------------------------------------------------------------------ le motif
def motif(can, info):
    rng = np.random.default_rng(GRAINE)
    ppp = info['ppp']
    haut, bas, xg, xd = _trou(info)                    # le trou, et la colonne du texte (px du fond)
    Yt = haut + MARGE_HAUT * ppp                       # rien plus haut
    Yb = bas - MARGE_BAS * ppp                         # aucune tache claire plus bas
    H = Yb - Yt
    xt = info['xt']
    Xe = xt - 0.06 * ppp                               # rien sur la tranche
    img = info['image']
    # l'échelle de l'image du devant (celle de composer)
    Hp, Wp = can.shape[:2]
    s_dev = max((Wp - info['xf']) / img.width, Hp / img.height)
    yS, traits, arbres = _source(img)

    # la toile, à double taille : de Yt - 0,1 po à Yb + 0,05 po, de 0 à la tranche
    oy = int(Yt - 0.1 * ppp)
    hh, ww = int((Yb + 0.05 * ppp - oy) * SS), int(xt * SS)
    X = (np.arange(ww) + 0.5) / SS                     # en px du fond
    Y = (np.arange(hh) + 0.5) / SS + oy

    def prof(points):                                  # points en (x px du fond, fraction de H)
        return Yt + H * _courbe([(x, f) for x, f in points], X)

    W_ = Xe
    # la colline de devant, basse, à gauche ; la grande colline derrière, qui monte, s'arrondit et redescend
    near = prof([(-40, .30), (.06 * W_, .25), (.14 * W_, .23), (.21 * W_, .28), (.30 * W_, .42),
                 (.40 * W_, .60), (.47 * W_, .78)])
    far = prof([(.10 * W_, .70), (.19 * W_, .40), (.30 * W_, .16), (.40 * W_, .04), (.48 * W_, .0),
                (.57 * W_, .02), (.67 * W_, .10), (.78 * W_, .24), (.88 * W_, .42), (.96 * W_, .64), (1.02 * W_, .90)])
    # un léger tremblé de gouge sur le bord des collines
    trem = ndi.gaussian_filter1d(rng.normal(0, 1, ww), 18 * SS) * 9
    near = near + trem
    far = far + ndi.gaussian_filter1d(rng.normal(0, 1, ww), 22 * SS) * 9
    dessus = np.minimum(near, far)

    YY = Y[:, None]
    a = np.clip((YY - dessus[None, :]) * SS + .5, 0, 1).astype(np.float32)     # 1 = crème (la colline)

    # les traits de gouge : chaque colonne de la bande lit une colonne de l'image, à la même profondeur sous le
    # profil (les traits suivent la pente des nouvelles collines) ; deux lectures, une par colline
    q = 1 / (s_dev * SS)                               # px de l'image par px de la toile
    def lecture(u0, segments, prof_c, sens=1):
        # segments : [(u_debut, u_fin)] de l'image, mis bout à bout le long de la bande
        us, ys = [], []
        long_ = np.cumsum([0] + [abs(b - a_) for a_, b in segments])
        t = (np.arange(ww) * q * 1.0 + u0) % long_[-1]
        u = np.zeros(ww, np.float32)
        for j, (a_, b) in enumerate(segments):
            m = (t >= long_[j]) & (t < long_[j + 1])
            u[m] = a_ + (t[m] - long_[j]) * (1 if b > a_ else -1)
        v = yS[np.clip(u.astype(int), 0, len(yS) - 1)][None, :] + (YY - prof_c[None, :]) * SS * q
        from scipy.ndimage import map_coordinates
        return map_coordinates(traits, [v, np.broadcast_to(u[None, :], v.shape)], order=1, mode='constant')
    A_big, B = (560, 1277), (1728, 3057)
    t_far = lecture(0, [A_big, B, (3057, 1728)], far)
    t_near = lecture(0, [(56, 560), (2320, 3057), (560, 56)], near)
    devant = YY >= near[None, :]                       # sous le profil de la colline de devant
    tr = np.where(devant, t_near, t_far)
    a *= 1 - tr

    # la crête de la colline de devant, là où elle passe devant la grande colline : un trait de gouge effilé
    vis = (near > far + 2) & (near < Yt + .70 * H)
    ep = np.zeros(ww, np.float32)
    if vis.any():
        idx = np.nonzero(vis)[0]
        i0, i1 = idx[0], idx[-1]
        tt = np.clip((np.arange(ww) - i0) / max(1, i1 - i0), 0, 1)
        ep = (2.4 * SS) * np.sin(np.pi * tt) ** .35 * (1 + .18 * ndi.gaussian_filter1d(rng.normal(0, 1, ww), 30 * SS))
        ep[~vis] = 0
    dist = np.abs(YY - near[None, :]) * SS
    a *= 1 - np.clip(ep[None, :] / 2 - dist + .5, 0, 1)

    # la forêt : trois rangs d'épinettes, des petites au pied des collines aux grandes devant
    fond_foret = np.zeros_like(a)                      # 1 là où un arbre couvre
    rangs = []
    # rang du fond : petites épinettes serrées, qui ferment le pied des collines
    x = -30.0
    while x < Xe + 40:
        rangs.append((0, x, rng.uniform(.30, .40), rng.uniform(.64, .70)))
        x += rng.uniform(16, 30)
    x = -60.0
    while x < Xe + 60:
        rangs.append((1, x, rng.uniform(.42, .58), rng.uniform(.42, .56)))
        x += rng.uniform(70, 125)
    x = 20.0
    while x < Xe + 60:
        rangs.append((2, x, rng.uniform(.62, .80), rng.uniform(.58, .68)))
        x += rng.uniform(150, 260)
    neige_tot = np.zeros_like(a)
    for rang, xc, g, f_tip in rangs:
        if rang == 0:
            choix = 2 if rng.random() < .6 else 1
        else:
            choix = 0 if rng.random() < .55 else 1
        noirceur, neige, silh = arbres[choix]
        f = s_dev * SS * g * (0.55 if rang == 0 and choix != 2 else 1)
        mir = rng.random() < .5
        N = _echelle(noirceur, f, mir)
        Ng = _echelle(neige, f, mir)
        h, w = N.shape
        # la pointe : sous le dessus des collines, avec du crème au-dessus
        cx = int(xc * SS)
        col = np.clip(cx, 0, ww - 1)
        tip = Yt + H * f_tip + rng.normal(0, .025) * H
        tip = max(tip, dessus[col] + .14 * H)
        ty = int((tip - oy) * SS)
        lo = np.nonzero(N.max(axis=1) > .5)[0][0]       # la première ligne de l'arbre
        py, px = ty - lo, cx - w // 2
        _poser(a, N, py, px, lambda d, p: d * (1 - p))
        if rang == 0:
            Ng = Ng * 0
        _poser(neige_tot, N, py, px, lambda d, p: d * (1 - p))
        _poser(neige_tot, Ng, py, px, lambda d, p: np.maximum(d, p))
        _poser(fond_foret, N, py, px, np.maximum)
    # la neige des arbres : seulement dans le haut de la forêt, et rien sous Yb
    lab, n = ndi.label(neige_tot > .5)
    if n:
        cy = np.array(ndi.center_of_mass(neige_tot > .5, lab, range(1, n + 1)))
        lim = (Yt + H * rng.uniform(.80, .93, n) - oy) * SS
        ok = np.concatenate([[False], (cy[:, 0] < lim) & (cy[:, 1] < (Xe - oy * 0) * SS)])
        garde = ok[lab]
        garde = ndi.binary_dilation(garde, iterations=2)
        a = np.maximum(a, np.where(garde, neige_tot, 0))
    # sous le pied des collines, la forêt est noire : pas de crème qui passe entre les troncs
    pied = (Yt + H * .80 - oy) * SS
    a[int(pied):] = np.where(neige_tot[int(pied):] > 0, np.minimum(a[int(pied):], neige_tot[int(pied):]), 0)
    a[int((Yb - oy) * SS):] = 0
    a[:, int(Xe * SS):] = 0

    # réduire, puis poser sur le fond : le ciel sans étoiles sous la bande, la crème des collines
    A = np.asarray(Image.fromarray(np.ascontiguousarray(a, np.float32)).resize((ww // SS, hh // SS), Image.LANCZOS))
    A = np.clip(A, 0, 1)[..., None]
    zone = can[oy:oy + A.shape[0], :A.shape[1]].astype(np.float32)
    plat = np.stack([ndi.grey_opening(zone[..., c], size=(9, 9)) for c in range(3)], -1)
    d1 = dessus[:A.shape[1] * SS].reshape(-1, SS).mean(1)
    ciel = ((oy + np.arange(A.shape[0]) + .5)[:, None] < d1[None, :] - 4)[..., None]
    sous = np.where(ciel, zone, plat)
    can[oy:oy + A.shape[0], :A.shape[1]] = np.clip(np.rint(sous * (1 - A) + CREME * A), 0, 255).astype(np.uint8)
    return can
