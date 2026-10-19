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
DEBUG = False
TOURS = 8


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
        if sz[i] < 60 or sz[i] > 6000 or w > 560 or h > 150 or w < 1.6 * h:
            continue                                   # ni arbre, ni crête : un trait est long et couché
        if s[0].start == 0 or s[0].stop >= S.shape[0] - 1:
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
        noir_arbre = float(np.median(e[m]))
        noirceur = np.where(silh, np.clip(e / (.97 * noir_arbre), 0, 1), 0).astype(np.float32)   # bord doux
        neige = np.where(ndi.binary_erosion(plein, iterations=2), np.clip((1 - e - .3) / .45, 0, 1), 0)
        arbres.append((noirceur, neige.astype(np.float32)))
    return yS, traits, arbres


# ------------------------------------------------------------------ couverture.py (lu, jamais écrit)
def _couverture():
    """Le module couverture.py qui nous appelle (ses fonctions, pour savoir ce que sa gomme à étoiles effacera)."""
    import os, sys, importlib.util
    m = sys.modules.get('__main__')
    if m is not None and hasattr(m, 'nettoyer') and hasattr(m, 'composer'):
        return m
    f = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tome-1', 'couverture.py')
    spec = importlib.util.spec_from_file_location('couverture_lue', f)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def _raccords(cv, info, img, ppp):
    """Les bandes des raccords du miroir du ciel, telles que composer les rend à nettoyer."""
    import io, contextlib
    k, v = info['tome'], info['variante']
    with contextlib.redirect_stdout(io.StringIO()):
        _, bandes = cv.composer(v, cv.mesures(k), img, cv.palette(v, k, cv.couleur_du_ciel(img)), ppp)
    return bandes


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


def _echelle(p, f, miroir=False, etir=1.0):
    if miroir:
        p = p[:, ::-1]
    h, w = p.shape
    im = Image.fromarray(np.ascontiguousarray(p, np.float32)).resize((max(1, round(w * f * etir)), max(1, round(h * f))),
                                                                     Image.LANCZOS)
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
                 (.40 * W_, .60), (.47 * W_, .78), (.56 * W_, 1.3)])
    far = prof([(.10 * W_, .70), (.19 * W_, .40), (.30 * W_, .16), (.40 * W_, .04), (.48 * W_, .0),
                (.57 * W_, .02), (.67 * W_, .10), (.77 * W_, .25), (.85 * W_, .44), (.905 * W_, .66), (.95 * W_, .96)])
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

    # la crête de la colline de devant, là où elle passe devant la grande colline : un trait de gouge effilé
    vis = (near > far + 2) & (near < Yt + .70 * H)
    ep = np.zeros(ww, np.float32)
    if vis.any():
        idx = np.nonzero(vis)[0]
        i0, i1 = idx[0], idx[-1]
        tt = np.clip((np.arange(ww) - i0) / max(1, i1 - i0), 0, 1)
        ep = (3.4 * SS) * np.sin(np.pi * tt) ** .35 * (1 + .18 * ndi.gaussian_filter1d(rng.normal(0, 1, ww), 30 * SS))
        ep[~vis] = 0
    dist = np.abs(YY - near[None, :]) * SS

    # la forêt. Trois rangs : au pied des collines, de petites épinettes serrées qui ferment la forêt ; au milieu, des
    # bouquets d'épinettes de tailles variées ; devant, quelques grandes. Plus un arbre est proche, plus il est grand
    # et plus son pied est bas. Aucune pointe ne monte plus haut que le dessus des collines (une pointe dans le ciel ne
    # se verrait pas).
    def hauteur(choix, g):
        return arbres[choix][0].shape[0] * s_dev * g
    poses = []                                         # (ordre, x, pointe, g, choix, miroir, étirement)
    onde = ndi.gaussian_filter1d(rng.normal(0, 1, ww), 90 * SS)
    onde = .035 * onde / (np.abs(onde).max() + 1e-6)   # le pied de la forêt ondule doucement
    x = -20.0
    while x < Xe + 30:
        choix = 2 if rng.random() < .6 else 1
        g = rng.uniform(.26, .42) * (1 if choix == 2 else .5)
        col = int(np.clip(x * SS, 0, ww - 1))
        pointe = max(Yt + H * (rng.uniform(.61, .69) + onde[col]), min(dessus[col] + .10 * H, Yt + .80 * H))
        poses.append((0, x, pointe, g, choix, rng.random() < .5, rng.uniform(.85, 1.15)))
        x += rng.uniform(8, 22) * (g / .34 if choix == 2 else g / .17)
    x = rng.uniform(-90, -30)
    while x < Xe + 40:
        for j in range(int(rng.choice([1, 2, 2, 3, 3, 4]))):
            xi = x + rng.normal(0, 8)
            choix = 0 if rng.random() < .5 else 1
            g = rng.uniform(.36, .64)
            col = int(np.clip(xi * SS, 0, ww - 1))
            pointe = max(Yt + H * rng.uniform(.30, .56), dessus[col] + .12 * H)
            if pointe < Yt + .62 * H:
                pied_ = pointe + hauteur(choix, g)
                poses.append((1 + (Yt + 2 * H - pied_) / H, xi, pointe, g, choix, rng.random() < .5,
                              rng.uniform(.85, 1.15)))
            x += rng.uniform(32, 70)
        x += rng.uniform(40, 190)
    for xi in (rng.uniform(.05, .10) * Xe, rng.uniform(.33, .40) * Xe, rng.uniform(.62, .70) * Xe):
        choix = 0
        pied_ = Yt + H * rng.uniform(1.22, 1.32)
        col = int(np.clip(xi * SS, 0, ww - 1))
        g = min(rng.uniform(.72, .88), (pied_ - (dessus[col] + .14 * H)) / (arbres[choix][0].shape[0] * s_dev))
        poses.append((9, xi, pied_ - hauteur(choix, g), g, choix, rng.random() < .5, rng.uniform(.9, 1.1)))
    poses.sort(key=lambda p: p[0])

    # chaque arbre, mis à l'échelle une fois
    poses_ = []
    for ordre, xc, pointe, g, choix, mir, etir in poses:
        noirceur, neige = arbres[choix]
        f = s_dev * SS * g
        N = _echelle(noirceur, f, mir, etir)
        G = _echelle(neige, f, mir, etir) if ordre > 0 else None
        lo = int(np.nonzero(N.max(axis=1) > .5)[0][0])  # la première ligne de l'arbre
        poses_.append((ordre, N, G, int((pointe - oy) * SS) - lo, int(xc * SS) - N.shape[1] // 2))

    a_coll = a                                         # les collines, avant les traits
    lab_tr, _ = ndi.label(tr > .3)
    lim_dur = int((Yt + .86 * H - oy) * SS)
    lim_neige = (Yt + H * rng.uniform(.86, .98, 4096) - oy) * SS
    cols = np.arange(ww)

    def peindre(sans_traits, sans_arbres, sans_neige):
        """La bande (alpha du crème, à double taille), sans les traits, arbres et taches de neige écartés."""
        t_ = tr
        if sans_traits:
            ote = ndi.binary_dilation(np.isin(lab_tr, list(sans_traits)), iterations=3)
            t_ = np.where(ote, 0, tr)
        a = a_coll * (1 - t_)
        a *= 1 - np.clip(ep[None, :] / 2 - dist + .5, 0, 1)            # la crête
        neige_tot = np.zeros_like(a)
        couv_fond = np.zeros_like(a)                   # ce que couvre le rang du fond
        vus = []
        for j, (ordre, N, G, py, px) in enumerate(poses_):
            if j in sans_arbres:
                continue
            sil = np.zeros((hh, ww), bool)
            _poser(sil, N > .3, py, px, lambda d, p: d | p)
            vus.append((j, sil))
            _poser(a, N, py, px, lambda d, p: d * (1 - p))
            _poser(neige_tot, N, py, px, lambda d, p: d * (1 - p))
            if G is not None:
                _poser(neige_tot, G, py, px, np.maximum)
            else:
                _poser(couv_fond, N, py, px, np.maximum)
        # le pied des collines : dans chaque colonne, là où le rang du fond devient plein ; plus bas, la forêt est
        # noire (le crème ne passe pas entre les troncs). Une colonne sans arbre prend la hauteur de ses voisines.
        run = int(.06 * H * SS)
        bloc = ndi.uniform_filter1d((couv_fond > .5).astype(np.float32), run, axis=0, origin=-(run // 2)) > .999
        bloc[lim_dur:] = True
        debut = np.argmax(bloc, axis=0).astype(np.float32)
        ok = debut < lim_dur
        pied = np.interp(cols, cols[ok], debut[ok]) if ok.any() else np.full(ww, lim_dur, np.float32)
        a[np.arange(hh)[:, None] >= np.minimum(pied, lim_dur)[None, :]] = 0
        # la neige des arbres : seulement dans le haut de la forêt, et pas celle qu'on écarte
        lab, n = ndi.label(neige_tot > .5)
        if n:
            cy = np.array(ndi.center_of_mass(neige_tot > .5, lab, range(1, n + 1)))
            ok = (cy[:, 0] < lim_neige[np.arange(n) % len(lim_neige)]) & (cy[:, 1] < (Xe - .03 * ppp) * SS)
            if sans_neige is not None:
                touche = np.zeros(n + 1, bool)
                touche[np.unique(lab[sans_neige])] = True
                ok &= ~touche[1:]
            garde = ndi.binary_dilation(np.concatenate([[False], ok])[lab], iterations=2)
            a = np.maximum(a, np.where(garde, neige_tot, 0))
        else:
            garde = np.zeros((hh, ww), bool)
        a[int((Yb - oy) * SS):] = 0
        a[:, int(Xe * SS):] = 0
        return a, garde & (neige_tot > .5), vus

    # le ciel sans étoiles sous la bande (une étoile ne doit pas tomber dans un arbre)
    hA, wA = hh // SS, ww // SS
    zone = can[oy:oy + hA, :wA].astype(np.float32)
    plat = np.stack([ndi.grey_opening(zone[..., c], size=(9, 9)) for c in range(3)], -1)
    d1 = dessus[:wA * SS].reshape(-1, SS).mean(1)
    ciel = ((oy + np.arange(hA) + .5)[:, None] < d1[None, :] - 4)[..., None]
    sous = np.where(ciel, zone, plat)

    def poser_sur(a):
        A = np.asarray(Image.fromarray(np.ascontiguousarray(a, np.float32)).resize((wA, hA), Image.LANCZOS))
        A = np.clip(A, 0, 1)[..., None]
        out = can.copy()
        out[oy:oy + hA, :wA] = np.clip(np.rint(sous * (1 - A) + CREME * A), 0, 255).astype(np.uint8)
        return out, A[..., 0]

    # couverture.py passe ensuite sa gomme à étoiles (nettoyer) : elle efface toute petite tache claire sur fond sombre
    # près du texte et dans les bandes des raccords du miroir, qui traversent tout le dos. Dans la bande, elle
    # barbouillerait le crème serré entre deux traits ou la neige d'une épinette. On la passe d'avance sur la bande, et
    # on retire proprement, en entier, chaque trait ou tache de neige qu'elle toucherait, jusqu'à ce qu'elle ne touche
    # plus rien.
    cv = _couverture()
    zones = list(info['rects']) + _raccords(cv, info, img, ppp)
    sans_traits, sans_arbres, sans_neige = set(), set(), np.zeros((hh, ww), bool)
    aire_tr = np.bincount(lab_tr.ravel())
    for tour in range(TOURS):
        a, neige, arbres_vus = peindre(sans_traits, sans_arbres, sans_neige)
        out, A = poser_sur(a)
        taches = [m for m in _taches_gommees(out, zones, ppp, oy, oy + hA, wA) if (A[m] > .5).any()]
        if DEBUG:
            print('    tour %d : %d taches' % (tour, len(taches)))
        if not taches:
            break
        for m in taches:
            M2 = np.zeros((hh, ww), bool)
            M2[:hA * SS, :wA * SS] = np.repeat(np.repeat(m, SS, 0), SS, 1)
            M2 = ndi.binary_dilation(M2, iterations=3 * SS)
            if (M2 & neige).any():                     # une tache de neige : on l'ôte
                sans_neige |= M2
                continue
            ids = [i for i in np.unique(lab_tr[M2]) if i and i not in sans_traits]
            if ids:                                    # du crème serré par un trait : on ôte le plus petit trait
                sans_traits.add(min(ids, key=lambda i: aire_tr[i]))
                continue
            proches = [j for j, sil in arbres_vus if (M2 & sil).any()]
            if proches:                                # entre deux épinettes : on ôte la plus petite
                sans_arbres.add(min(proches, key=lambda j: poses_[j][1].size))
            elif DEBUG:
                ys, xs = np.nonzero(m)
                print('      tache sans cause : y %d-%d x %d-%d' % (ys.min() + oy, ys.max() + oy, xs.min(), xs.max()))
    if DEBUG:
        print('    ôtés : %d traits, %d arbres' % (len(sans_traits), len(sans_arbres)))
    return out


def _taches_gommees(out, zones, ppp, r0, r1, c1):
    """Les taches claires que la gomme à étoiles de couverture.py (nettoyer) effacerait dans les lignes r0:r1 et les
    colonnes 0:c1 du fond : le même calcul, sur un morceau du fond. Rend leurs masques (lignes r0:r1, colonnes 0:c1)."""
    pad = int(.3 * ppp)
    a0, b0, d0 = max(0, r0 - pad), min(out.shape[0], r1 + pad), min(out.shape[1], c1 + pad)
    H, W = b0 - a0, d0
    k, po = 0.0104 * ppp, 96
    zone = np.zeros((H, W), bool)
    for x0, y0, x1, y1, fs in zones:
        if fs < 0:
            mx = my = 0
        elif fs:
            mx, my = min(max(1.0 * fs, .15 * po), .3 * po), min(max(.5 * fs, .12 * po), .2 * po)
        else:
            mx = my = .12 * po
        a, b = max(0, int((y0 - my) * k) - a0), min(H, int(np.ceil((y1 + my) * k)) - a0)
        c, d = max(0, int((x0 - mx) * k)), min(W, int(np.ceil((x1 + mx) * k)))
        if a < b and c < d:
            zone[a:b, c:d] = True
    L = _lum(out[a0:b0, :d0])
    t = int(0.09 * ppp) | 1
    cand = ((L - ndi.grey_opening(L, size=(t, t))) > 12) & (ndi.grey_opening(L, size=(t, t)) < 80)
    lab, n = ndi.label(cand)
    if not n:
        return []
    taille = np.bincount(lab.ravel())
    objets = ndi.find_objects(lab)
    cote = 0.25 * ppp
    res = []
    for i in np.unique(lab[zone & cand]):
        if not i or taille[i] > (0.12 * ppp) ** 2:
            continue
        s = objets[i - 1]
        if s[0].stop - s[0].start > cote or s[1].stop - s[1].start > cote:
            continue
        m = (lab == i)[r0 - a0:r1 - a0, :c1]
        if m.any():
            res.append(m)
    return res
