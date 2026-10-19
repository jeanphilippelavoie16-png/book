# -*- coding: utf-8 -*-
"""Tome 6, L'atelier : le dos de la couverture C reprend la nuit du devant (JP, 19 octobre 2026 : « j'aime que pour le
tome 1 on retrouve des éléments de la couverture en arrière, fais-le pour les autres » ; « mets-en dans les trous sur
la page en arrière, faut juste pas que ça touche au texte » ; puis, sur le dos du tome 3 : « ça, j'aime ça, le style »).

Dans le grand trou de la quatrième, entre le sommaire et « Les auteurs », l'horizon du devant, en miroir comme le ciel :
  - les collines enneigées, avec leurs traits de gouge : la crête est celle du devant, lue en miroir (la grande colline
    de droite vient à gauche, la petite colline de gauche vient à droite ; le toit de l'atelier est sauté), un peu
    aplatie pour tenir dans le trou ; les traits sont ceux de l'image, lus à la même profondeur sous la crête ;
  - la lisière d'épinettes enneigées au pied des collines : les cimes de la lisière de gauche du devant, découpées une à
    une d'un creux à l'autre, avec leur neige, remises côte à côte ; deux grandes épinettes du devant la coupent ;
  - le croissant de lune, en haut à droite du trou, au-dessus de la petite colline, comme sur le devant.
Tout est découpé dans l'image du devant (images/tomes/titre-tome-6.jpg) et réduit, rien n'est agrandi ni redessiné ;
une seule encre est posée, le crème de l'image, sur le ciel du dos. Le noir des épinettes est le ciel lui-même : sous
la crête, on retire les étoiles. La lisière finit à droite là où la colline redescend derrière elle.

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
CRETE = [(3057, 1700), (1290, 0), (0, 520), (520, 120)]     # les colonnes lues de gauche à droite du dos : la
                                 # grande colline de droite, en miroir ; puis la petite de gauche (le toit sauté) ;
                                 # puis la petite colline aller et retour, pour finir la bande
LISIERE = (1700, 2200)           # les lignes de la lisière de gauche
CIMES = [(116, 281), (281, 360), (360, 473), (473, 573), (573, 645), (645, 716)]   # les colonnes de chaque cime,
                                 # d'un creux à l'autre (la première, la plus haute, sert moins souvent)
SOL = 2100                       # la ligne de l'image où la lisière touche le sol
GRANDES = [(1395, 2150, 2765, 3008), (3045, 3560, 2632, 2995)]    # deux grandes épinettes : celle de droite derrière
                                 # l'atelier, puis celle du premier plan à droite (y0, y1, x0, x1)
SOL_GRANDES = [2150, 3540]
LUNE = (380, 715, 2700, 3020)    # y0, y1, x0, x1

# ---- au dos (pouces)
MARGE = 0.18                     # autour de ce qui est écrit ou tracé
G = 0.80                         # l'échelle des pièces, par rapport au devant
RELIEF = 0.55                    # la hauteur de la crête, de la grande colline à la petite
LUNE_H = 0.50                    # la hauteur du croissant
LUNE_X = 7.05                    # le centre du croissant, depuis le bord perdu
FIN = 7.55                       # la bande finit ici : la colline redescend derrière la lisière
DESCENTE = 1.10                  # sur cette longueur avant FIN
GRAINE = 11
SS = 2                           # on compose à double taille
TAILLE = 1.35                    # les épinettes de la lisière, par rapport à G
NEIGE = 0.07                     # po : la neige des branches s'arrête à peu près à cette hauteur du pied


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


def _piece(L, y0, y1, x0, x1, grande=False):
    """Une épinette (ou une cime de la lisière) : (alpha du crème, masque de la pièce), à la taille de l'image.
    La pièce est le noir relié au bas du bloc et tout ce qui est sous son contour (la neige des branches) ; au-dessus,
    rien (la colline du dos s'y voit). Pour une grande épinette, seulement le plus gros noir qui touche le bas."""
    S = L[y0:y1, x0:x1]
    noir = S < 110
    lab, n = ndi.label(noir)
    bas = np.unique(lab[-1])
    bas = bas[bas > 0]
    if grande:                                         # le plus gros morceau qui touche le bas
        i = bas[np.argmax(ndi.sum(noir, lab, bas))]
        F = lab == i
    else:
        F = np.isin(lab, bas)
    haut = np.where(F.any(0), np.argmax(F, axis=0), S.shape[0])
    rr = np.arange(S.shape[0])[:, None]
    M = rr >= haut[None, :] - 2                         # deux lignes au-dessus : le bord adouci de l'image
    return _alpha(S), M


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
    return u, seg, bornes


def _sans_etoiles(can, masque, ppp):
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
    cand = ((L - ouvert) > 10) & (ouvert < 80)
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
def motif(can, info):
    rng = np.random.default_rng(GRAINE)
    ppp, xf, xt = info['ppp'], info['xf'], info['xt']
    H, W = can.shape[:2]
    q = ppp / 96.0
    avant = can.copy()
    img = info['image']
    src = np.asarray(img.convert('RGB'))
    if src.shape[:2] != (3840, 3072):
        raise ValueError('dos du tome 6 : image du devant attendue en 3072 × 3840')
    L = _lum(src)
    s_dev = max((W - xf) / src.shape[1], H / src.shape[0])     # l'échelle de l'image au devant (celle de composer)
    f = s_dev * G                                              # px du fond par px de l'image

    occ = _occupe(info['rects'], q, (H, W), MARGE * ppp)
    ga, gb = _trou(occ, xt, H)
    yS, traits = _crete_et_traits(L)

    # ---- la toile : les rangs du trou, de 0 à la tranche, à double taille
    oy = ga
    hh, ww = (gb - ga + int(0.1 * ppp)) * SS, xt * SS
    yy = (np.arange(hh)[:, None] + 0.5) / SS + oy              # px du fond
    xx = (np.arange(ww) + 0.5) / SS
    fin = FIN * ppp
    sol = gb + 0.05 * ppp                                      # le pied de la lisière : sous la dernière neige

    # ---- la crête : celle du devant, en miroir, aplatie de RELIEF ; elle redescend derrière la lisière avant FIN
    u, seg, bornes = _lire(CRETE, ww, 1 / (f * SS))
    ys_ = yS[np.clip(np.rint(u).astype(int), 0, len(yS) - 1)].astype(np.float64)
    # le raccord du toit sauté : la marche entre les deux segments s'étale sur 0,4 po
    j0 = np.searchsorted(seg, 1)
    marche = ys_[j0] - ys_[j0 - 1]
    d = np.abs(np.arange(ww) - j0 + 0.5) / (0.35 * ppp * SS)
    poids = np.clip(1 - d, 0, 1) ** 2 * 0.5
    ys_ = ys_ + np.where(np.arange(ww) < j0, marche, -marche) * poids
    ys_ = ndi.gaussian_filter1d(ys_, 0.03 * ppp * SS)
    k = RELIEF * ppp / (ys_.max() - ys_.min())
    crete = oy + (ys_ - ys_.min()) * k
    t = np.clip((xx - (fin - DESCENTE * ppp)) / (DESCENTE * ppp), 0, 1)
    crete = crete + (sol - 0.12 * ppp - crete) * (t * t * (3 - 2 * t))
    crete[xx > fin] = np.inf

    # ---- les collines et leurs traits : chaque colonne lit sa colonne de l'image, à la même profondeur sous la crête
    crete_ = np.where(np.isfinite(crete), crete, 1e6)
    prof = (yy - crete_[None, :]) / f                          # px de l'image sous la crête
    v = yS[np.clip(np.rint(u).astype(int), 0, len(yS) - 1)][None, :] + prof
    tr = ndi.map_coordinates(traits, [v, np.broadcast_to(u[None, :], v.shape)], order=1, mode='constant')
    a = np.clip((yy - crete_[None, :]) * SS + 0.5, 0, 1).astype(np.float32) * (1 - tr)

    # ---- la lisière : les cimes côte à côte, le pied sur le sol, la pointe toujours sous la crête
    cimes = [_piece(L, LISIERE[0], LISIERE[1], x0, x1) for x0, x1 in CIMES]
    poses = []
    x, der = -0.15 * ppp, -1
    while x < fin + 0.1 * ppp:
        p = [0.35] + [1.0] * (len(CIMES) - 1)
        p[der] = 0 if der >= 0 else p[der]
        p = np.array(p) / sum(p)
        j = int(rng.choice(len(CIMES), p=p))
        der = j
        g = TAILLE * rng.uniform(0.88, 1.12)
        poses.append((j, x, g, rng.random() < 0.5, rng.uniform(-0.03, 0.03) * ppp))
        x += (CIMES[j][1] - CIMES[j][0]) * f * g * rng.uniform(0.70, 0.85)
    pieces = []
    for j, x0, g, mir, dy in poses:
        A, M = cimes[j]
        pieces.append((A, M, x0, g, mir, LISIERE[0], SOL, dy, False))
    # deux grandes épinettes, devant la lisière
    for (y0, y1, x0, x1), s0, xc, gg in zip(GRANDES, SOL_GRANDES, (1.55, 4.15), (0.72, 1.0)):
        A, M = _piece(L, y0, y1, x0, x1, grande=True)
        pieces.append((A, M, xc * ppp - (x1 - x0) * f * gg / 2, gg, False, y0, s0, 0.0, True))

    neige_tot = np.zeros((hh, ww), np.float32)
    foret = np.zeros((hh, ww), bool)
    for A, M, x0, g, mir, y0, s0, dy, grande in pieces:
        fs = f * g * SS
        Ae, Me = _echelle(A, fs, mir), _echelle(M.astype(np.float32), fs, mir)
        py = int(round((sol + dy - oy) * SS - (s0 - y0) * fs))    # la ligne s0 de l'image tombe sur le sol
        px = int(round(x0 * SS))
        # la pointe sous la crête : sinon on descend la pièce
        cols = np.nonzero((Me > 0.5).any(0))[0]
        if not len(cols):
            continue
        hautp = np.argmax(Me > 0.5, axis=0)
        cc = np.clip(px + cols, 0, ww - 1)
        ecart = ((crete[cc] - oy) * SS + 0.06 * ppp * SS) - (py + hautp[cols])
        ecart = ecart[np.isfinite(ecart)]
        if len(ecart) and ecart.max() > 0:
            py += int(np.ceil(ecart.max()))
        h_, w_ = Ae.shape
        r0, r1, c0, c1 = max(0, py), min(hh, py + h_), max(0, px), min(ww, px + w_)
        if r0 >= r1 or c0 >= c1:
            continue
        Ae_, Me_ = Ae[r0 - py:r1 - py, c0 - px:c1 - px], Me[r0 - py:r1 - py, c0 - px:c1 - px]
        a[r0:r1, c0:c1] = a[r0:r1, c0:c1] * (1 - Me_) + Ae_ * Me_
        foret[r0:r1, c0:c1] |= Me_ > 0.5

    # ---- la neige des branches : rien sous le pied ; une tache qui descend trop bas part en entier
    ysol = (sol - oy) * SS
    bas_neige = ysol - NEIGE * ppp * SS
    sous = foret & (np.arange(hh)[:, None] > 0)
    lab, n = ndi.label((a > 0.35) & sous & ((np.arange(hh)[:, None] - (crete[None, :] - oy) * SS) > 3))
    if n:
        cy = np.array(ndi.center_of_mass(np.ones_like(lab), lab, range(1, n + 1)))
        bas_ = np.array([s[0].stop for s in ndi.find_objects(lab)])
        lim = bas_neige + rng.uniform(-0.05, 0.03, n) * ppp * SS
        part = np.concatenate([[False], (cy[:, 0] > lim) | (bas_ > ysol - 0.02 * ppp * SS) |
                               (cy[:, 1] > (fin - 0.05 * ppp) * SS)])
        ote = ndi.binary_dilation(part[lab], iterations=2) & sous & ~ndi.binary_dilation(
            (~part[lab]) & (lab > 0), iterations=1)
        a[ote] = 0
    a[np.arange(hh) >= ysol - 0.02 * ppp * SS] = 0
    a[:, xx > fin] = 0

    # ---- le croissant de lune
    lune = _lune(src, L)
    fl = LUNE_H * ppp * SS / lune.shape[0]
    Le = _echelle(lune, fl)
    ly, lx = int(0.0 * ppp * SS), int(LUNE_X * ppp * SS - Le.shape[1] / 2)
    zone_lune = np.zeros((hh, ww), bool)
    a[ly:ly + Le.shape[0], lx:lx + Le.shape[1]] = np.maximum(a[ly:ly + Le.shape[0], lx:lx + Le.shape[1]], Le)
    zone_lune[max(0, ly - 30):ly + Le.shape[0] + 30, max(0, lx - 30):lx + Le.shape[1] + 30] = True

    # ---- sur le fond : d'abord les étoiles qui tomberaient dans la forêt ou contre la lune, puis le crème
    hA, wA = hh // SS, ww // SS
    sous_crete = np.zeros((H, W), bool)
    cr = crete[:wA * SS].reshape(-1, SS).min(1)
    rr = np.arange(oy, min(H, oy + hA))[:, None]
    sous_crete[oy:oy + len(rr), :wA] = (rr > cr[None, :] - 0.02 * ppp) | (rr > sol - 0.45 * ppp)
    sous_crete[oy:oy + hA, int(fin + 0.15 * ppp):] = False
    zl = zone_lune.reshape(hA, SS, wA, SS).any((1, 3))
    sous_crete[oy:oy + hA, :wA] |= zl
    sous_crete &= ~occ
    n_et = _sans_etoiles(can, sous_crete, ppp)
    A = np.asarray(Image.fromarray(np.ascontiguousarray(a)).resize((wA, hA), Image.LANCZOS))
    A = np.clip(A, 0, 1)[..., None]
    z = can[oy:oy + hA, :wA].astype(np.float32)
    can[oy:oy + hA, :wA] = np.clip(np.rint(z * (1 - A) + CREME * A), 0, 255).astype(np.uint8)

    # ---- contrôle : rien sur la tranche ni le devant, rien dans la marge du texte
    chg = (can != avant).any(2)
    chg_motif = np.zeros_like(chg)
    chg_motif[oy:oy + hA, :wA] = A[..., 0] > 0.004
    if chg[:, xt:].any() or (chg & occ).any():
        print('    dos 6 : ATTENTION, le motif touche la tranche ou la marge du texte')
    ys_, xs_ = np.nonzero(chg_motif)
    print('    dos 6 : collines et lisière de %.2f à %.2f po du haut (le trou, marges ôtées : %.2f à %.2f po), de %.2f à '
          '%.2f po du bord perdu ; %d étoiles retirées sous la crête' % (
              ys_.min() / ppp, ys_.max() / ppp, ga / ppp, gb / ppp, xs_.min() / ppp, xs_.max() / ppp, n_et))
    return can
