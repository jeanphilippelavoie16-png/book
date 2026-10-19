"""Tome 1, page de titre : le champ de neige et la trace (zone 0,722 à 768,960 en 768 x 960, sans le chalet ni les
épinettes). Retouche demandée par JP le 19 octobre 2026 : « la même image, avec la rigueur des autres tomes ».

Ce qui change, et rien d'autre :
- le halo blanc autour de tout ce qui est fonce_ (la marque d'un agrandissement trop aiguisé) part : la neige voisine
  est recopiée jusqu'au bord des formes fonce_es, sans flou, et le bord lui-même est refait sur la neige ;
- la trace : le fil noir (1 à 2 px, doublé dans la boucle) devient une trace de raquettes taillée sur le même tracé,
  une rigole à deux bords nets qui s'élargit vers l'avant (1 unité près du chalet, 5,5 à droite), son ombre bleu pâle
  dedans et des empreintes ovales à pas régulier ; elle passe derrière la petite épinette et entre dans la grande ;
- le fil droit du toit à la grande épinette (457 à 657, y 757) devient le bord d'une congère : une ligne taillée,
  pleine au milieu et effilée aux deux bouts, avec son ombre bleu pâle sous elle ;
- des ombres courtes et nettes, d'un bleu pâle tiré du bleu des collines, vers l'avant et la gauche (la lune est en
  haut à droite) : une bande festonnée au pied de la rangée d'arbres, une bande serrée sous le chalet, et un coin
  sous la branche la plus basse des épinettes dont le pied tombe sous le bas de la page ;
- quatre entailles fines qui suivent le creux du champ, hors du bloc des tomes (176 à 592, 830 à 925).
La marbrure de la neige (3 niveaux) reste. Les formes fonce_es (chalet, clôture, épinettes, masse de la rangée)
gardent leurs pixels : on ne peint que la neige.

    from neige import appliquer ; b = appliquer(a, 4)      (a : numpy RVB uint8, 3072 x 3840 ; K pixels par unité)
"""
import math
import numpy as np
from scipy import ndimage as ndi
from PIL import Image, ImageDraw

COLLINE = np.array([20, 48, 72], np.float32)        # le bleu des collines, d'où vient le bleu des ombres
NEIGE = np.array([218, 229, 236], np.float32)       # la neige du champ (#DAE5EC), pour mémoire
T_CLAIR, T_OMBRE = 0.10, 0.17                         # part du bleu des collines dans les deux bleus pâles

# le tracé de la trace (unités 768 x 960) : de la clôture, la boucle, puis vers la grande épinette de droite
TRACE = [(336.5, 792.0), (322, 795.2), (306, 799.4), (292, 804.2), (280, 809.4), (271, 814.6), (267, 819.8),
         (269, 824.6), (276, 828.6), (288, 832.2), (304, 835.0), (324, 837.6), (348, 840.6), (374, 844.0),
         (402, 847.8), (430, 852.0), (458, 856.6), (486, 861.2), (514, 866.0), (540, 870.0), (564, 873.4),
         (588, 875.8), (612, 876.8), (636, 877.0), (650, 877.0), (664, 877.0)]
LARG_TRACE = (1.0, 5.6)                                # largeur de la rigole au départ et au bout
# le fil droit qui devient le bord d'une congère
CONGERE = [(457, 760.4), (462, 759.8), (488, 757.0), (514, 756.2), (540, 754.4), (566, 753.8), (592, 752.4), (616, 753.0),
           (638, 754.6), (660, 757.6)]
# les entailles qui suivent le creux du champ (hors du bloc des tomes)
ENTAILLES = [
    [(168, 771), (200, 767.5), (240, 765.5), (280, 765.8), (312, 768)],
    [(204, 787), (230, 782.5), (262, 780.4), (292, 781.5)],
    [(486, 812), (512, 808), (540, 806.4), (566, 807.4), (584, 810)],
    [(536, 790), (566, 786.6), (598, 785.6), (628, 787.6)],
]
# les ombres (polygones en unités, peintes seulement sur la neige)
OMBRES = [
    # sous le chalet et sa clôture, vers l'avant et la gauche
    [(370, 797.0), (456, 797.0), (453, 799.4), (420, 800.6), (378, 801.4), (362, 800.6)],
    # les petites épinettes et la grande de droite ont le pied sous le bas de la page : leur ombre n'en sort qu'un
    # coin, sous la branche la plus basse, vers l'avant et la gauche
    [(495, 955.5), (477, 960.5), (503, 960.5)],
    [(579, 954.5), (561, 960.5), (586, 960.5)],
    [(635, 955.5), (618, 960.5), (642, 960.5)],
]
FERME = 5                                              # rayon qui referme le corps d'un arbre (px pour K = 4)
BLOC = (176, 830, 592, 925)                            # le bloc des tomes de la page de titre : rien de fin dessous
# la neige du toit du chalet (elle est au chalet, pas au champ)
TOIT = [(392, 726), (450, 726), (459, 748), (463, 760), (463, 772), (452, 772), (397, 737)]


def _disque(r):
    r = max(1, int(round(r)))
    yy, xx = np.mgrid[-r:r + 1, -r:r + 1]
    return xx * xx + yy * yy <= r * r


def _raster(polys, H, W, ss=4):
    im = Image.new('L', (W * ss, H * ss), 0)
    d = ImageDraw.Draw(im)
    for p in polys:
        if p is not None and len(p) >= 3:
            d.polygon([(float(x) * ss, float(y) * ss) for x, y in p], fill=255)
    return np.asarray(im.resize((W, H), Image.BOX), np.float32) / 255


def _ellipses(ells, H, W, ss=4):
    """Des ellipses (cx, cy, demi-long, demi-court, angle en radians) avec anticrénelage."""
    polys = []
    t = np.linspace(0, 2 * np.pi, 28, endpoint=False)
    for cx, cy, a, b, th in ells:
        x = a * np.cos(t); y = b * np.sin(t)
        polys.append(np.stack([cx + x * math.cos(th) - y * math.sin(th), cy + x * math.sin(th) + y * math.cos(th)], 1))
    return _raster(polys, H, W, ss)


def _catmull(pts, n=12):
    """Une courbe douce qui passe par les points (Catmull-Rom), échantillonnée."""
    pts = np.asarray(pts, float)
    p = np.vstack([pts[0] * 2 - pts[1], pts, pts[-1] * 2 - pts[-2]])
    out = []
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        for t in np.linspace(0, 1, n, endpoint=False):
            t2, t3 = t * t, t * t * t
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
                              (-p0 + 3 * p1 - 3 * p2 + p3) * t3))
    out.append(pts[-1])
    return np.array(out)


def _abscisse(pts):
    d = np.diff(pts, axis=0)
    return np.concatenate([[0], np.cumsum(np.hypot(d[:, 0], d[:, 1]))])


def _normales(pts):
    tg = np.gradient(pts, axis=0)
    tg /= np.maximum(np.hypot(tg[:, 0], tg[:, 1]), 1e-6)[:, None]
    return tg, np.stack([-tg[:, 1], tg[:, 0]], 1)


def _bande(pts, w_haut, w_bas):
    """Un ruban le long d'une courbe : w_haut au-dessus (côté normale négative en y), w_bas en dessous (tableaux)."""
    tg, nrm = _normales(pts)
    # la normale qui pointe vers le bas de l'image
    nrm = np.where(nrm[:, 1:2] < 0, -nrm, nrm)
    haut = pts - nrm * np.asarray(w_haut)[:, None]
    bas = pts + nrm * np.asarray(w_bas)[:, None]
    return np.concatenate([haut, bas[::-1]])


def _couloir(pts, demi, H, W):
    """Tout ce qui est à moins de demi[i] de la courbe (par la distance au point le plus proche) : sans les plis
    d'un ruban décalé dans un virage serré."""
    fines = []
    for i in range(len(pts) - 1):
        n = max(2, int(np.hypot(*(pts[i + 1] - pts[i]))) + 1)
        t = np.linspace(0, 1, n, endpoint=False)[:, None]
        fines.append(pts[i] * (1 - t) + pts[i + 1] * t)
    fines = np.vstack(fines + [pts[-1:]])
    idx_pt = np.searchsorted(np.arange(len(pts)), np.interp(np.arange(len(fines)), np.linspace(0, len(fines) - 1,
                             len(pts)), np.arange(len(pts))))
    m = np.zeros((H, W), bool)
    ix = np.clip(np.round(fines).astype(int), [0, 0], [W - 1, H - 1])
    m[ix[:, 1], ix[:, 0]] = True
    lab = np.full((H, W), -1, int)
    lab[ix[:, 1], ix[:, 0]] = np.clip(idx_pt, 0, len(pts) - 1)
    d, (iy, jx) = ndi.distance_transform_edt(~m, return_indices=True)
    return d <= np.asarray(demi)[lab[iy, jx]]


def appliquer(a, K=4):
    a = np.asarray(a)
    H, W = a.shape[:2]
    q = K / 4.0
    r0 = int(716 * K)
    z = a[r0:].astype(np.float32)
    h, w = z.shape[:2]
    L = z.mean(2)
    yy = np.arange(h, dtype=np.float32)[:, None]
    Y = lambda v: v * K - r0
    px = lambda pts: np.array([(x * K, Y(y)) for x, y in pts], float)

    # -- ce qui est fonce_ sur la neige, et ce que la retouche efface : le fil de la trace (doublé dans la boucle)
    # et le fil du toit
    sombre = L < 120
    trace = _catmull(px(TRACE), 10)
    s_tr = _abscisse(trace)
    boucle = np.exp(-((trace[:, 1] - Y(818)) / (14 * K)) ** 2) * (trace[:, 0] < 310 * K)
    demi = (3.2 + 8.0 * boucle) * K
    cong = _catmull(px(CONGERE), 10)
    couloir = _couloir(trace, demi, h, w) | _couloir(cong, np.full(len(cong), 2.6 * K), h, w)
    couloir &= yy > Y(745)
    # ce qui est épais (épinettes, chalet) ne s'efface pas, ni la clôture ; dans la boucle, il n'y a que la trace
    epais = ndi.binary_dilation(ndi.binary_opening(sombre, _disque(5 * q)), _disque(3 * q))
    xx_ = np.arange(w, dtype=np.float32)[None, :]
    dans_boucle = (xx_ < 312 * K) & (yy > Y(796)) & (yy < Y(846))
    cloture = (xx_ >= 337.5 * K) & (xx_ <= 522 * K) & (yy > Y(776)) & (yy < Y(804))
    protege = (epais & ~dans_boucle) | cloture
    effacer = couloir & ndi.binary_dilation(sombre & couloir, _disque(3 * q)) & ~protege
    # dans la boucle, tout ce qui est fonce_ et mince est un reste du fil doublé
    effacer |= dans_boucle & ndi.binary_dilation(sombre & ~epais, _disque(3 * q)) & (xx_ > 250 * K)

    # -- le champ : la neige qui touche le bas de l'image, une fois les deux fils enlevés. La neige posée sur les
    # branches des épinettes (le corps de l'arbre, refermé par un disque de 2 unités) et sur le toit du chalet n'est
    # pas le champ : elle ne bouge pas.
    fonce_ = sombre & ~effacer
    pad = int(9 * q) + 1
    corps = ndi.binary_closing(np.pad(fonce_, pad, mode="edge"), _disque(FERME * q))[pad:-pad, pad:-pad]
    corps = ndi.binary_fill_holes(corps)
    corps |= _raster([px(TOIT)], h, w) > 0.5
    lab, n = ndi.label(~corps)
    v = lab[int(Y(900)), int(300 * K)]
    champ = (lab == v)
    neige_ok = (champ | effacer) & (yy >= Y(722))

    # -- la neige du fond : sa marbrure lente (estimée loin de tout ce qui est fonce_) et son grain
    dist = ndi.distance_transform_edt(~fonce_)
    loin = champ & (dist > 18 * q) & ~couloir
    poids = ndi.gaussian_filter(loin.astype(np.float32), 30 * q)
    base = np.stack([ndi.gaussian_filter(z[..., c] * loin, 30 * q) for c in range(3)], -1)
    base = base / np.maximum(poids, 1e-3)[..., None]
    manque = poids < 1e-3
    if manque.any():
        base[manque] = np.median(z[loin], 0)
    # le grain : le résidu d'un carré de neige propre, posé en carreaux
    y0, x0 = int(Y(890)), int(250 * K)
    tuile = z[y0:y0 + int(64 * K), x0:x0 + int(64 * K)] - base[y0:y0 + int(64 * K), x0:x0 + int(64 * K)]
    reps = (h // tuile.shape[0] + 1, w // tuile.shape[1] + 1, 1)
    grain = np.tile(tuile, reps)[:h, :w]
    neuve = base + grain

    out = z.copy()
    # le halo : tout ce qui est clair à moins de 16 px d'une forme fonce_e reprend la neige voisine
    halo = neige_ok & (dist <= 16 * q) & (dist > 2.5 * q)
    out[halo] = neuve[halo]
    # le bord lui-même : le pixel de transition garde sa part de fonce_, posée sur la neige refaite
    bord = neige_ok & (dist <= 2.5 * q) & ~sombre & ~effacer
    Lmax = ndi.maximum_filter(L, int(5 * q) | 1)
    Lmin = ndi.minimum_filter(L, int(5 * q) | 1)
    al = np.clip((Lmax - L) / np.maximum(Lmax - Lmin, 1), 0, 1)
    fonce = np.stack([ndi.minimum_filter(z[..., c], int(5 * q) | 1) for c in range(3)], -1)
    recompo = al[..., None] * fonce + (1 - al[..., None]) * neuve
    out[bord] = recompo[bord]
    # les deux fils : effacés, la neige refaite dessous
    out[effacer] = neuve[effacer]
    # le long des deux fils, la neige est refaite d'un bord à l'autre du couloir (entre les deux fils de la boucle,
    # le blanc trop vif du halo reste sinon)
    refait = couloir & champ & ~protege
    out[refait] = neuve[refait]
    # les miettes : un point fonce_ isolé sur la neige (un reste de fil, une poussière d'agrandissement) part
    lab_m, nm = ndi.label(out.mean(2) < 160)
    tailles = ndi.sum(np.ones_like(lab_m), lab_m, range(1, nm + 1))
    miettes = np.isin(lab_m, 1 + np.nonzero(tailles < 60 * q * q)[0]) & (yy > Y(780))
    miettes = ndi.binary_dilation(miettes, _disque(2 * q)) & ~protege
    out[miettes] = neuve[miettes]
    effacer |= miettes
    neige_ok |= miettes

    # -- les deux bleus pâles des ombres
    clair_b = (1 - T_CLAIR) * neuve + T_CLAIR * COLLINE
    ombre_b = (1 - T_OMBRE) * neuve + T_OMBRE * COLLINE

    def poser(alpha, coul):
        alpha = alpha * neige_ok
        out[:] = out * (1 - alpha[..., None]) + coul * alpha[..., None]

    # -- les ombres au pied de la rangée d'arbres : une bande festonnée sous le bord de la masse noire, chaque feston
    # plus long vers la gauche (la lune est en haut à droite)
    haut_champ = np.where(champ.any(0), np.argmax(champ, 0), h).astype(np.float32)
    xs = np.arange(int(50 * K), int(694 * K))
    ys = ndi.gaussian_filter1d(haut_champ[xs], 2 * K)
    rngs = np.random.RandomState(5)
    ep = np.full(len(xs), 0.9 * K, np.float32)
    x = float(xs[0])
    while x < xs[-1]:
        lg = rngs.uniform(7, 13) * K                   # un feston : monte vite à droite, s'étire à gauche
        hmax = rngs.uniform(1.8, 3.4) * K
        u = (xs - x) / lg
        uu = np.clip(u, -1, 0.35)
        f = np.where((u > -1) & (u < 0), np.abs(np.sin(np.pi * (uu + 1) / 2)) ** 1.5,
                     np.where((u >= 0) & (u < 0.35), np.cos(np.pi * uu / 0.7), 0))
        ep = np.maximum(ep, 0.9 * K + hmax * f)
        x += rngs.uniform(5, 10) * K
    ok = (ys < Y(762)) & ~((xs > 362 * K) & (xs < 474 * K))
    pied = []
    for seg in np.split(np.arange(len(xs)), np.nonzero(np.diff(ok.astype(int)))[0] + 1):
        if len(seg) > 8 and ok[seg[0]]:
            xa, ya, ea = xs[seg], ys[seg], ep[seg]
            ea = ea * np.clip(np.minimum(xa - xa[0], xa[-1] - xa) / (4 * K), 0, 1)
            pied.append(np.concatenate([np.stack([xa, ya - 2 * K], 1), np.stack([xa, ya + ea], 1)[::-1]]))
    poser(_raster(pied, h, w), clair_b)

    # -- les ombres des petites épinettes, de la grande et du chalet
    poser(_raster([px(p) for p in OMBRES], h, w), clair_b)

    # -- le bord de la congère : sa petite ombre dessous, puis la ligne taillée
    s_c = _abscisse(cong); t = s_c / s_c[-1]
    ep = np.sin(np.pi * t) ** 0.8
    vague = 1 + 0.35 * np.sin(2 * np.pi * s_c / (46 * K) + 0.8)
    poser(_raster([_bande(cong, 0.2 * K * ep, 3.6 * K * ep ** 1.3 * vague)], h, w), clair_b)
    poser(_raster([_bande(cong, 0.7 * K * ep, 0.7 * K * ep)], h, w), ombre_b)

    # -- la trace de raquettes : une rigole qui s'élargit vers l'avant, deux bords nets (l'ombre du bord du fond
    # tombe dedans, le bord de devant prend la lumière), et les empreintes ovales en quinconce, à pas régulier
    t = s_tr / s_tr[-1]
    larg = (LARG_TRACE[0] + (LARG_TRACE[1] - LARG_TRACE[0]) * t ** 1.15) * K
    larg = larg * (0.35 + 0.65 * np.clip(s_tr / (2.5 * K), 0, 1))       # le départ, contre la clôture, s'effile
    larg = larg * (0.4 + 0.6 * np.clip((s_tr[-1] - s_tr) / (5 * K), 0, 1))  # la fin, sous la grande épinette
    levre = (1 - 0.6) * neuve + 0.6 * np.array([244, 248, 251], np.float32)
    poser(_raster([_bande(trace, -larg * 0.38, larg * 0.62)], h, w) * (larg[0] >= 0), levre)
    rigole = (1 - 0.16) * neuve + 0.16 * COLLINE
    poser(_raster([_bande(trace, larg / 2, larg / 2)], h, w), rigole)
    poser(_raster([_bande(trace, larg / 2, -larg * 0.08)], h, w), (1 - 0.3) * neuve + 0.3 * COLLINE)
    # le bord du fond, taillé : une ligne nette, effilée aux deux bouts, plus franche vers l'avant
    trait = (0.22 + 0.5 * t) * K * np.clip(np.minimum(s_tr, s_tr[-1] - s_tr) / (6 * K), 0, 1)
    poser(_raster([_bande(trace, larg / 2 + trait * 0.5, -larg / 2 + trait * 0.5)], h, w),
          (1 - 0.5) * neuve + 0.5 * COLLINE)
    tg, nrm = _normales(trace)
    nrm = np.where(nrm[:, 1:2] < 0, -nrm, nrm)
    ells = []
    s = 4 * K
    k = 0
    while s < s_tr[-1] - 2 * K:
        i = int(np.searchsorted(s_tr, s))
        wl = larg[i]
        if wl > 1.8 * K:
            cote = 1 if k % 2 else -1
            c = trace[i] + nrm[i] * cote * wl * 0.17
            ells.append((c[0], c[1], wl * 0.58, wl * 0.25, math.atan2(tg[i, 1], tg[i, 0])))
        s += max(2.4 * K, wl * 1.2)
        k += 1
    creux = (1 - 0.36) * neuve + 0.36 * COLLINE
    poser(_ellipses(ells, h, w), creux)

    # -- les entailles du creux du champ : des traits fins effilés, jamais sous le bloc des tomes
    polys = []
    for e in ENTAILLES:
        c = _catmull(px(e), 10)
        tt = _abscisse(c); tt /= tt[-1]
        ep = 0.5 * K * np.sin(np.pi * tt) ** 0.8
        polys.append(_bande(c, ep, ep))
    a_ent = _raster(polys, h, w)
    bx0, by0, bx1, by1 = BLOC
    a_ent *= 1 - _raster([px([(bx0, by0), (bx1, by0), (bx1, by1), (bx0, by1)])], h, w)
    poser(a_ent, ombre_b)

    # -- la zone : la neige seulement, à partir de 722
    zone = (neige_ok | halo | bord).astype(np.float32) * (yy >= Y(722))
    res = a.copy()
    sl = res[r0:].astype(np.float32)
    sl = sl * (1 - zone[..., None]) + out * zone[..., None]
    res[r0:] = np.clip(np.round(sl), 0, 255).astype(np.uint8)
    return res
