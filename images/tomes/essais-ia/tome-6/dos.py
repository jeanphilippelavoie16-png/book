# -*- coding: utf-8 -*-
"""Tome 6, L'atelier : le dos de la couverture C reprend la nuit du devant (JP, 19 octobre 2026 : « j'aime que pour le
tome 1 on retrouve des éléments de la couverture en arrière, fais-le pour les autres » ; « mets-en dans les trous sur
la page en arrière, faut juste pas que ça touche au texte » ; puis, sur le dos du tome 3 : « ça, j'aime ça, le style »).

Dans le grand trou de la quatrième, entre le sommaire et « Les auteurs », l'horizon du devant, en miroir comme le ciel :
  - les collines enneigées, avec leurs traits de gouge : la crête est celle du devant, lue en miroir (la grande colline
    de droite vient à gauche, la petite colline de gauche vient à droite ; le toit de l'atelier est sauté), un peu
    aplatie pour tenir dans le trou ; les traits sont ceux de l'image, lus à la même profondeur sous la crête ;
  - la lisière d'épinettes enneigées au pied des collines : les six cimes de la lisière de gauche du devant, découpées
    une à une d'un creux à l'autre avec leur neige, remises côte à côte dans un ordre tiré au sort (jamais deux fois la
    même de suite), retournées une fois sur deux ; chacune s'approche de la précédente jusqu'à ce que leurs flancs se
    couvrent, pour qu'aucun bord de découpe ne se voie sur la colline ;
  - le croissant de lune, en haut à droite du trou, au-dessus de la colline qui redescend, comme sur le devant.
À droite, la colline redescend derrière la lisière ; les épinettes rapetissent avec elle, le pied toujours au bas du
trou, et le crème finit en pointe entre les dernières cimes.
Tout est découpé dans l'image du devant (images/tomes/titre-tome-6.jpg) et réduit : rien n'est redessiné. Les collines
seules sont étirées de LARGE en largeur pour couvrir la quatrième ; les épinettes et la lune gardent leurs proportions.
Une seule encre est posée, le crème de l'image, sur le ciel du dos ; le noir des épinettes est le ciel lui-même, et on
retire les étoiles qui tomberaient dans la forêt ou contre la lune. La neige des branches ne descend pas jusqu'au bas
du trou, et une tache de neige qu'un bord de découpe couperait net part en entier.

Rien ne touche le texte : on cherche le trou dans les boîtes mesurées par Chromium (info['rects']), élargies de MARGE,
et on vérifie à la fin qu'aucun pixel changé n'y entre ni ne passe sur la tranche.

    motif(can, info) : appelé par motif_dos() de images/tomes/essais-ia/tome-1/couverture.py
"""
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

LUM = np.array([.2126, .7152, .0722], np.float32)
CREME = np.array([253, 239, 211], np.float32)     # le crème des collines, de la neige et de la lune (médiane, l'image)
LC, LN = 236.0, 40.0                              # luminance du crème et du noir de l'encre, pour l'alpha

# ---- dans l'image d'origine (3072 × 3840 px)
CIEL = (1150, 2000)              # les lignes où l'on cherche la crête des collines contre le ciel
TRAITS = (1220, 1880)            # les lignes des traits de gouge
CRETE = [(3057, 1700), (1290, 0)]   # les colonnes lues de gauche à droite du dos : la grande colline de droite, en
                                 # miroir, puis la petite de gauche (le toit de l'atelier sauté)
LISIERE = (1700, 2200)           # les lignes de la lisière de gauche
CIMES = [(116, 281), (281, 360), (360, 473), (473, 573), (573, 645), (645, 716)]   # les colonnes de chaque cime,
                                 # d'un creux à l'autre (la première, la plus haute, sert moins souvent)
SOL = 2180                       # la ligne de la lisière qui tombe au bas du trou (la forêt y est pleine)
LUNE = (380, 715, 2700, 3020)    # le croissant, en haut à droite : y0, y1, x0, x1

# ---- au dos (pouces)
MARGE = 0.18                     # autour de ce qui est écrit ou tracé
G = 0.80                         # l'échelle des pièces, par rapport au devant
RELIEF = 0.45                    # la hauteur de la crête, de la grande colline à la petite
LUNE_H = 0.50                    # la hauteur du croissant
LUNE_X = 7.00                    # le centre du croissant, depuis le bord perdu
FIN = 7.45                       # po du bord perdu : la colline redescend jusqu'au pied de la lisière
DESCENTE = 1.60                  # po : sur cette longueur
LARGE = 1.30                     # les collines sont étirées en largeur d'autant (les épinettes, non)
GRAINE = 11
SS = 2                           # on compose à double taille
TAILLE = 1.40                    # les épinettes de la lisière, par rapport à G
PLUS_PETITE = 0.25               # une cime ne rapetisse pas plus que ça : la lisière finit avant
NEIGE = 0.05                     # po : la neige des branches s'arrête à peu près à cette hauteur du pied


def _lum(a):
    return a.astype(np.float32) @ LUM


def _alpha(L):
    """1 sur le crème, 0 sur le noir."""
    return np.clip((L - LN) / (LC - LN), 0, 1).astype(np.float32)


# ---------------------------------------------------------------- le trou
def _occupe(rects, q, shape, marge):
    """Ce qui est écrit ou tracé, élargi de la marge (px du fond). Le bloc de la présentation compte par ses lignes."""
    occ = np.zeros(shape, bool)
    lignes = [r for r in rects if r[4] > 0]
    for r in rects:
        if r[4] < 0:
            continue
        if r[4] == 0:
            dedans = [t[4] for t in lignes if t[0] >= r[0] - 1 and t[2] <= r[2] + 1 and t[1] >= r[1] - 1 and
                      t[3] <= r[3] + 1]
            if len(dedans) >= 2 and all(abs(f - 17.33) < 0.1 for f in dedans):
                continue
        a, b = max(0, int(r[1] * q - marge)), int(np.ceil(r[3] * q + marge))
        c, d = max(0, int(r[0] * q - marge)), int(np.ceil(r[2] * q + marge))
        occ[a:b, c:d] = True
    return occ


def _trou(occ, xt, H):
    """Le plus haut des rangs libres sur toute la largeur de la quatrième, sous le tiers du haut : (début, fin)."""
    rangs = ~occ[:, :xt].any(1)
    pleins = np.nonzero(~rangs)[0]
    rangs[:max(int(0.3 * H), pleins.min())] = False
    rangs[pleins.max():] = False
    lab, n = ndi.label(rangs)
    t = max(ndi.find_objects(lab), key=lambda s: s[0].stop - s[0].start)[0]
    return t.start, t.stop


# ---------------------------------------------------------------- ce qu'on découpe dans l'image du devant
def _crete_et_traits(L):
    """La crête des collines contre le ciel (une ligne par colonne) et les traits de gouge (0 à 1), à la taille de
    l'image. Un trait est une tache noire couchée, entourée de crème : ni arbre, ni toit, ni crête."""
    y0, y1 = CIEL
    Lo = ndi.grey_opening(L[y0:y1], size=(7, 7))           # les étoiles ôtées
    yS = (np.argmax(Lo > 150, axis=0) + y0).astype(np.float32)
    yS[:40] = yS[40]                                       # le bord gauche de l'image est noir
    yS = ndi.gaussian_filter1d(yS, 6)
    y0, y1 = TRAITS
    S = L[y0:y1]
    noir, creme = S < 150, S > 185
    lab, n = ndi.label(noir)
    taille = np.bincount(lab.ravel())
    garde = np.zeros(n + 1, bool)
    for i, s in enumerate(ndi.find_objects(lab), 1):
        h, w = s[0].stop - s[0].start, s[1].stop - s[1].start
        if taille[i] < 60 or taille[i] > 6000 or w > 560 or h > 150 or w < 1.6 * h:
            continue
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
    traits[y0:y1][zone] = (1 - _alpha(S))[zone]
    return yS, traits


def _piece(L, y0, y1, x0, x1):
    """Une cime de la lisière : (alpha du crème, masque de la pièce), à la taille de l'image. La pièce est le noir relié
    au bas du bloc et tout ce qui est sous son contour (la neige des branches) ; au-dessus, rien (la colline du dos s'y
    voit)."""
    S = L[y0:y1, x0:x1]
    noir = S < 110
    lab, n = ndi.label(noir)
    bas = np.unique(lab[-1])
    F = np.isin(lab, bas[bas > 0])
    haut = np.where(F.any(0), np.argmax(F, axis=0), S.shape[0])
    rr = np.arange(S.shape[0])[:, None]
    M = rr >= haut[None, :] - 2                         # deux lignes au-dessus : le bord adouci de l'image
    return _alpha(S), M


def _contour(Me):
    """La première ligne de la pièce dans chaque colonne (le bas si la colonne est vide)."""
    return np.where((Me > 0.5).any(0), np.argmax(Me > 0.5, axis=0), Me.shape[0]).astype(np.float64)


def _lune(src, L):
    y0, y1, x0, x1 = LUNE
    A = _alpha(L[y0:y1, x0:x1])
    lab, n = ndi.label(A > 0.5)
    i = 1 + int(np.argmax(ndi.sum(A > 0.5, lab, index=np.arange(1, n + 1))))
    A = np.where(ndi.binary_dilation(lab == i, iterations=3), A, 0)
    ys, xs = np.nonzero(A > 0.02)
    return A[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


# ---------------------------------------------------------------- outils
def _echelle(A, f, miroir=False):
    if miroir:
        A = A[:, ::-1]
    h, w = A.shape
    im = Image.fromarray(np.ascontiguousarray(A, np.float32)).resize((max(1, round(w * f)), max(1, round(h * f))),
                                                                     Image.LANCZOS)
    return np.clip(np.asarray(im), 0, 1)


def _lire(segments, n, pas):
    """Les colonnes de l'image lues le long de la bande : n colonnes de la bande, pas colonnes d'image par colonne de
    bande, segment après segment (début, fin), dans le sens de chaque segment."""
    longs = np.array([abs(b - a) for a, b in segments], np.float64)
    bornes = np.concatenate([[0], np.cumsum(longs)])
    t = np.minimum(np.arange(n) * pas, bornes[-1] - 1e-3)
    u = np.zeros(n, np.float64)
    seg = np.zeros(n, int)
    for j, (a, b) in enumerate(segments):
        m = (t >= bornes[j]) & (t < bornes[j + 1])
        u[m] = a + (t[m] - bornes[j]) * (1 if b > a else -1)
        seg[m] = j
    return u, seg


def _sans_etoiles(can, masque, ppp, seuil=10):
    """Retire les étoiles (petites taches claires sur le ciel) dans le masque, bouchées à la moyenne du ciel voisin."""
    ys, xs = np.nonzero(masque)
    if not len(ys):
        return 0
    p = int(0.2 * ppp)
    a, b = max(0, ys.min() - p), min(can.shape[0], ys.max() + p)
    c, d = max(0, xs.min() - p), min(can.shape[1], xs.max() + p)
    z = can[a:b, c:d].astype(np.float32)
    L = _lum(z)
    t = int(0.09 * ppp) | 1
    ouvert = ndi.grey_opening(L, size=(t, t))
    cand = ((L - ouvert) > seuil) & (ouvert < 80)
    lab, n = ndi.label(cand)
    ids = np.unique(lab[cand & masque[a:b, c:d]])
    ids = ids[ids > 0]
    if not len(ids):
        return 0
    m = ndi.binary_dilation(np.isin(lab, ids), iterations=max(2, round(0.012 * ppp)))
    poids = (~(cand | m)).astype(np.float32)
    sig = 0.04 * ppp
    den = np.maximum(ndi.gaussian_filter(poids, sig), 1e-3)
    for ch in range(3):
        moy = ndi.gaussian_filter(z[..., ch] * poids, sig) / den
        z[..., ch][m] = moy[m]
    can[a:b, c:d] = np.clip(np.rint(z), 0, 255).astype(np.uint8)
    return len(ids)


# ---------------------------------------------------------------- le motif
def _poser_piece(M, fs, mir, s0, y0, x, crete, sol_c, marge_c):
    """La pièce M (masque, à la taille de l'image) mise à l'échelle fs, la ligne s0 de l'image sur le sol, son bord
    gauche à la colonne x de la toile : si une pointe passe à moins de marge_c sous la crête, la pièce rapetisse, le pied
    toujours sur le sol. Rend (masque réduit, ligne du haut, colonne de gauche, échelle)."""
    for _ in range(8):
        Me = _echelle(M.astype(np.float32), fs, mir)
        py = sol_c - (s0 - y0) * fs
        px = int(round(x))
        haut = np.where((Me > 0.5).any(0), np.argmax(Me > 0.5, axis=0), Me.shape[0]).astype(np.float64)
        cols = np.nonzero(haut < Me.shape[0])[0]
        cc = np.clip(np.rint(px + cols).astype(int), 0, len(crete) - 1)
        r = ((sol_c - crete[cc] - marge_c) / np.maximum(sol_c - (py + haut[cols]), 1)).min()
        if r >= 1:
            break
        fs *= max(r, 0.5)
    return Me, py, px, fs


def motif(can, info):
    rng = np.random.default_rng(GRAINE)
    ppp, xf, xt = info['ppp'], info['xf'], info['xt']
    H, W = can.shape[:2]
    q = ppp / 96.0
    avant = can.copy()
    src = np.asarray(info['image'].convert('RGB'))
    if src.shape[:2] != (3840, 3072):
        raise ValueError('dos du tome 6 : image du devant attendue en 3072 × 3840')
    L = _lum(src)
    s_dev = max((W - xf) / src.shape[1], H / src.shape[0])     # l'échelle de l'image au devant (celle de composer)
    f = s_dev * G                                              # px du fond par px de l'image

    occ = _occupe(info['rects'], q, (H, W), MARGE * ppp)
    ga, gb = _trou(occ, xt, H)
    yS, traits = _crete_et_traits(L)

    # ---- la toile : les rangs du trou, de 0 à la tranche, à double taille (px de la toile : px du fond × SS)
    oy = ga
    hh, ww = (gb - ga) * SS, xt * SS
    sol_c = (gb - oy) * SS                                     # le bas du trou : la ligne SOL de la lisière y tombe

    # ---- la crête : celle du devant, en miroir, aplatie à RELIEF
    u, seg = _lire(CRETE, ww, 1 / (f * SS * LARGE))
    ys_ = yS[np.clip(np.rint(u).astype(int), 0, len(yS) - 1)].astype(np.float64)
    j0 = np.searchsorted(seg, 1)                               # le raccord du toit sauté : la marche s'étale
    marche = ys_[j0] - ys_[j0 - 1]
    d = np.abs(np.arange(ww) - j0 + 0.5) / (0.35 * ppp * SS)
    ys_ = ys_ + np.where(np.arange(ww) < j0, marche, -marche) * np.clip(1 - d, 0, 1) ** 2 * 0.5
    ys_ = ndi.gaussian_filter1d(ys_, 0.03 * ppp * SS)
    crete = (ys_ - ys_.min()) * RELIEF * ppp * SS / (ys_.max() - ys_.min())     # px de la toile
    fin = FIN * ppp * SS
    t = np.clip((np.arange(ww) - fin + DESCENTE * ppp * SS) / (DESCENTE * ppp * SS), 0, 1)
    crete = crete + (sol_c - 0.16 * ppp * SS - crete) * (1 - np.cos(np.pi * t)) / 2
    marge_c = 0.05 * ppp * SS                                  # une pointe reste à cette distance sous la crête

    # ---- la lisière : les cimes côte à côte, le pied sur le sol ; une cime trop haute pour la crête rapetisse
    cimes = [_piece(L, LISIERE[0], LISIERE[1], x0, x1) for x0, x1 in CIMES]
    poses = []                                                 # (A, M réduit, py, px, fs, miroir)
    x, der = -0.15 * ppp * SS, -1
    while True:
        p = np.array([0.35] + [1.0] * (len(CIMES) - 1))
        if der >= 0:
            p[der] = 0
        j = int(rng.choice(len(CIMES), p=p / p.sum()))
        der = j
        A, M = cimes[j]
        mir = rng.random() < 0.5
        fs0 = f * SS * TAILLE * rng.uniform(0.85, 1.15)
        Me, py, px, fs = _poser_piece(M, fs0, mir, SOL, LISIERE[0], x, crete, sol_c, marge_c)
        if fs < PLUS_PETITE * fs0 and poses:          # la colline est trop basse : la lisière finit ici
            break
        if poses:
            # la cime se rapproche de la précédente jusqu'à ce que chacune couvre le flanc de l'autre : sinon le
            # bord de la pièce, coupé droit, se verrait sur la colline
            _, Ma, pya, pxa, _, _ = poses[-1]
            ha, hb = _contour(Ma) + pya, _contour(Me) + py
            ea = pxa + Ma.shape[1] - 1
            xb = int(round(px))
            while xb > pxa + Ma.shape[1] // 2:
                c1 = ea + 1 - xb                       # les colonnes de B juste après le bord droit de A
                c2 = xb - 1 - pxa                      # la colonne de A juste avant le bord gauche de B
                b1, a2 = hb[max(0, c1):c1 + 3], ha[max(0, c2 - 2):max(0, c2 + 1)]
                if (not len(b1) or b1.max() <= ha[-1] - 1) and (not len(a2) or a2.max() <= hb[0] - 1):
                    break
                xb -= 1
            if xb != int(round(px)):
                Me, py, px, fs = _poser_piece(M, fs, mir, SOL, LISIERE[0], xb, crete, sol_c, marge_c)
        poses.append((A, Me, py, px, fs, mir))
        x = px + Me.shape[1] * rng.uniform(0.70, 0.88)
        if x + Me.shape[1] > fin:
            break

    # ---- le masque de la forêt, et les bords des pièces
    foret = np.zeros((hh, ww), bool)
    couture = np.zeros((2, hh, ww), bool)                      # les bords gauches et droits des pièces
    boites = []
    for A, Me, py, px, fs, mir in poses:
        py, px = int(round(py)), int(round(px))
        r0, r1, c0, c1 = max(0, py), min(hh, py + Me.shape[0]), max(0, px), min(ww, px + Me.shape[1])
        boites.append((r0, r1, c0, c1, py, px))
        if r0 < r1 and c0 < c1:
            foret[r0:r1, c0:c1] |= Me[r0 - py:r1 - py, c0 - px:c1 - px] > 0.5
            for c, cm, k in ((px, 0, 0), (px + Me.shape[1] - 1, Me.shape[1] - 1, 1)):    # les deux bords
                if 1 <= c < ww - 1:
                    couture[k][r0:r1, c] |= Me[r0 - py:r1 - py, cm] > 0.5

    # ---- la fin, à droite : rien après la dernière cime de la lisière ; juste avant, la crête rejoint le haut de la
    # forêt, et le crème finit en pointe entre les cimes
    bout = boites[-1][3] - 1
    haut_f = np.where(foret.any(0), np.argmax(foret, axis=0), hh).astype(np.float64)
    long_ = max(2 * poses[-1][1].shape[1], 0.12 * ppp * SS)
    t = np.clip((np.arange(ww) - (bout - long_)) / long_, 0, 1)
    crete = crete + (np.maximum(crete, haut_f[min(bout, ww - 1)] + 3) - crete) * t * t
    crete[np.arange(ww) > bout] = np.inf

    # ---- les collines et leurs traits : chaque colonne lit sa colonne de l'image, à la même profondeur sous la crête
    crete_ = np.where(np.isfinite(crete), crete, 1e7)
    prof = (np.arange(hh)[:, None] + 0.5 - crete_[None, :]) / (f * SS)      # px de l'image sous la crête
    v = yS[np.clip(np.rint(u).astype(int), 0, len(yS) - 1)][None, :] + prof
    tr = ndi.map_coordinates(traits, [v, np.broadcast_to(u[None, :], v.shape)], order=1, mode='constant')
    lab, n = ndi.label(tr > 0.3, structure=np.ones((3, 3)))      # un bout de trait trop court se lirait comme une
    if n:                                                        # poussière : il part
        objs = ndi.find_objects(lab)
        court = np.array([False] + [o[1].stop - o[1].start < 0.04 * ppp * SS for o in objs])
        tr = np.where(ndi.binary_dilation(court[lab], iterations=2), 0, tr)
    a = np.clip(np.arange(hh)[:, None] + 0.5 - crete_[None, :], 0, 1).astype(np.float32) * (1 - tr)

    # ---- les épinettes, par-dessus : le noir et la neige de l'image
    for (A, Me, _, _, fs, mir), (r0, r1, c0, c1, py, px) in zip(poses, boites):
        if r0 >= r1 or c0 >= c1:
            continue
        Ae = _echelle(A, fs, mir)
        Ae_, Me_ = Ae[r0 - py:r1 - py, c0 - px:c1 - px], Me[r0 - py:r1 - py, c0 - px:c1 - px]
        a[r0:r1, c0:c1] = a[r0:r1, c0:c1] * (1 - Me_) + Ae_ * Me_

    # ---- la neige des branches : une tache qui descend trop bas, qu'un bord de pièce coupe ou qui passe le bout
    # part en entier
    rr = np.arange(hh)[:, None]
    lab, n = ndi.label((a > 0.35) & foret & (rr - crete_[None, :] > 3))
    if n:
        objs = ndi.find_objects(lab)
        cy = np.array(ndi.center_of_mass(np.ones_like(lab), lab, range(1, n + 1)))
        bas_ = np.array([s_[0].stop for s_ in objs])
        droite = np.array([s_[1].stop for s_ in objs])
        lim = sol_c - (NEIGE + rng.uniform(-0.04, 0.03, n)) * ppp * SS
        # une tache coupée net par le bord d'une pièce (le crème d'un côté, le noir de l'autre, sur plus d'un pixel
        # du fond de haut) se lirait comme une découpe : elle part
        net = np.zeros((hh, ww), bool)
        g = couture[0] & (np.abs(a - np.roll(a, 1, axis=1)) > 0.5)
        d_ = couture[1] & (np.abs(a - np.roll(a, -1, axis=1)) > 0.5)
        net |= g | np.roll(g, -1, axis=1) | d_ | np.roll(d_, 1, axis=1)
        coupe = np.bincount(lab[net].ravel(), minlength=n + 1) >= 2 * SS
        coupe[0] = False
        colline = np.zeros(n + 1, bool)               # le crème qui touche la colline est la colline : il reste
        colline[np.unique(lab[ndi.binary_dilation(~foret & (a > 0.35), iterations=2)])] = True
        part = np.concatenate([[False], ((cy[:, 0] > lim) | (bas_ > sol_c - 0.03 * ppp * SS) | (droite > bout) |
                                         coupe[1:]) & ~colline[1:]])
        garde = (~part[lab]) & (lab > 0)
        ote = ndi.binary_dilation(part[lab], iterations=2) & foret & ~ndi.binary_dilation(garde, iterations=1)
        a[ote] = 0
    a[:, int(bout) + 1:] = 0
    a[sol_c - 2:] = 0

    # ---- le croissant de lune, en haut à droite du trou
    lune = _lune(src, L)
    Le = _echelle(lune, LUNE_H * ppp * SS / lune.shape[0])
    ly, lx = 0, int(LUNE_X * ppp * SS - Le.shape[1] / 2)
    a[ly:ly + Le.shape[0], lx:lx + Le.shape[1]] = np.maximum(a[ly:ly + Le.shape[0], lx:lx + Le.shape[1]], Le)

    # ---- sur le fond : d'abord les étoiles qui tomberaient dans la forêt ou contre la lune, puis le crème
    # (une étoile collée à la crête ou à la lune se lirait comme une poussière : on la retire aussi dans la marge du
    # texte, jamais dans la boîte du texte elle-même)
    hA, wA = hh // SS, ww // SS
    cr = crete_[:wA * SS].reshape(-1, SS).min(1) / SS + oy
    p_ = int(0.1 * ppp)
    r0_ = max(0, oy - p_)
    rr = np.arange(r0_, oy + hA)[:, None]
    zone = np.zeros((H, W), bool)
    zone[r0_:oy + hA, :wA] = (rr > cr[None, :] - p_) & (np.arange(wA)[None, :] < bout / SS + p_)
    zone[oy:oy + hA, :wA] |= ((np.arange(oy, oy + hA)[:, None] > oy + hA - 0.3 * ppp) &
                              (np.arange(wA)[None, :] < bout / SS + 2 * p_))
    zone[r0_:oy + Le.shape[0] // SS + p_, max(0, lx // SS - p_):(lx + Le.shape[1]) // SS + p_] = True
    boites_texte = _occupe(info['rects'], q, (H, W), 0.06 * ppp)
    zone &= ~boites_texte
    avant_et = can.copy()
    n_et = _sans_etoiles(can, zone, ppp, seuil=6)
    etoiles = (can != avant_et).any(2)
    A = np.asarray(Image.fromarray(np.ascontiguousarray(a)).resize((wA, hA), Image.LANCZOS))
    A = np.clip(A, 0, 1)[..., None]
    z = can[oy:oy + hA, :wA].astype(np.float32)
    can[oy:oy + hA, :wA] = np.clip(np.rint(z * (1 - A) + CREME * A), 0, 255).astype(np.uint8)

    # ---- contrôle : rien sur la tranche ni le devant ; rien du motif dans la marge du texte, aucune étoile retirée
    # dans une boîte de texte
    chg = (can != avant).any(2)
    if chg[:, xt:].any() or (chg & ~etoiles & occ).any() or (etoiles & boites_texte).any():
        print('    dos 6 : ATTENTION, le motif touche la tranche ou la marge du texte')
    ys_, xs_ = np.nonzero(A[..., 0] > 0.004)
    print('    dos 6 : collines, lisière et lune de %.2f à %.2f po du haut (le trou, marges ôtées : %.2f à %.2f po), '
          'de %.2f à %.2f po du bord perdu ; %d étoiles retirées' % (
              (ys_.min() + oy) / ppp, (ys_.max() + oy) / ppp, ga / ppp, gb / ppp, xs_.min() / ppp, xs_.max() / ppp,
              n_et))
    return can
