# -*- coding: utf-8 -*-
"""Le dos de la couverture du tome 5 (La forêt, le jardin et le chalet) : la scène du devant revient au dos, posée sur
le filet du sommaire.

JP, 19 octobre 2026, après avoir vu les six dos : « J'aime le tome 2 et 6 à date. Le tome 4 et 5 seraient à
travailler, c'est les seuls qui manquent d'âme » ; sur le tome 2 : « le bois, colle-le sur la ligne parce qu'il est
coupé ; si le bois du bas touche à la ligne, c'est correct ». L'ancien dos (des bandes de nuages au bord du haut et un
rond orange sur la tranche) était abstrait : il est remplacé par une petite scène, comme le soleil et le canot du
tome 3, la lampe et la corde de bois du tome 2, les collines et la lune du tome 6.

Appelé par motif_dos() de images/tomes/essais-ia/tome-1/couverture.py :

    python3 images/tomes/essais-ia/tome-1/couverture.py --tome 5 --variantes C --sortie DOSSIER

Le trou : le plus grand de la quatrième est sous le texte d'ouverture, à droite de sa dernière ligne (courte) et du
titre « Dans ce tome », au-dessus du filet de ce titre (environ 3,5 × 0,73 po). Entre le sommaire et « Les auteurs », il
ne reste qu'un tiers de pouce une fois les marges ôtées. La scène est posée SUR le filet : la ligne est son sol.

La scène est la bande du devant (images/tomes/titre-tome-5.jpg), découpée dans l'image elle-même, de la crête des
collines à la base du chalet, sur toute sa largeur, réduite d'un bloc (rien n'est redessiné) :
  - la longue cabane et la rangée de pierres du jardin devant elle, qui tombe sur le filet ; le chalet aux fenêtres
    allumées, ses cheminées, les herbes à son pied ; l'épinette au trait de droite ; la forêt derrière (le rideau de
    gouge et la lisière d'épinettes sombres) ; la crête et son liséré orange ;
  - le soleil, posé sur le sommet de la colline comme au devant, mais plus bas : à demi couché (DESCENTE), comme celui
    du tome 3. Ce qu'il couvrait au-dessus de la crête reprend, rangée par rangée, la couleur du bord le plus proche ;
    le nuage de droite, qui passait derrière lui, finit en pointe là où le soleil le coupait ;
  - les nuages orange taillés à la gouge, à leur hauteur. Ceux du haut partent (ils passeraient le haut du trou), et
    celui du bas à gauche aussi (il prolongeait la dernière ligne du texte d'ouverture, comme un tiret) ;
  - les bancs brun clair du ciel du devant, non : sur le ciel uni du dos, ils faisaient un couvercle au-dessus de la
    colline. La crête se lit par son liséré et le rideau de la forêt, comme au devant.
Aux deux bouts, la colline redescend au filet (la crête de chaque colonne suit une courbe douce ; le contenu de la
colonne, lu à la même profondeur sous sa crête, descend avec elle), et chaque nuage finit en pointe, resserré vers sa
ligne du milieu, comme la sortie d'un coup de gouge. À gauche, les colonnes sont celles du bord gauche du devant, en
aller-retour ; à droite, celles du bord droit, en miroir. Sous une certaine profondeur, le bout est du sombre de la
forêt (rien d'une cabane ni d'une épinette coupée). L'épinette au trait du bord gauche du devant est effacée de
l'image avant (elle laissait une pointe seule au bout des pierres).

La tranche ne porte rien : le titre en occupe presque toute la hauteur, et le soleil est dans la scène.

Rien ne touche le texte : chaque ligne et chaque bloc, élargis de MARGE, sont interdits (le filet du titre « Dans ce
tome » excepté : la scène s'y pose) ; on efface ce qui y entrerait et on le dit.
"""
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

CIEL = np.array([77, 50, 23], np.float32)                  # le ciel uni du devant, et du dos (le même, en miroir)
ORANGE = np.array([246, 119, 26], np.float32)              # le soleil et les nuages
BANCS = np.array([[77, 50, 23], [91, 58, 27], [108, 66, 28], [246, 119, 26]], np.float32)   # ciel, bancs, orange

# ---- dans l'image d'origine (3072 × 3840 px)
BAS = 2952                    # la base du chalet (sa dernière rangée de rondins) : elle tombe sur le filet
CENTRE = (60, 3072)           # les colonnes reprises telles quelles, de gauche à droite
GAUCHE = (60, 400)            # les colonnes du bout gauche (aller-retour entre les deux)
DROITE = (2700, 3072)         # les colonnes du bout droit (en miroir depuis le bord)
PROF_G, PROF_D = 560, 2000    # px sous la crête : plus bas, aux bouts, le sombre de la forêt (à gauche, rien
                              # de la longue cabane)
SOLEIL_BOITE = (1600, 2240, 2020, 2680)   # y0, y1, x0, x1 : où chercher le soleil
SOLEIL_COL = (2040, 2660)     # les colonnes du soleil : les cimes pointues de la crête s'y découpent sur lui
CIME_MIN = 9                  # px : une cime de la crête est au moins aussi large
CRETE_SOLEIL = 2030           # au-dessus, le bord sombre du soleil n'est jamais la crête
NUAGES_HAUT = 1840            # un nuage qui commence plus haut part (il passerait le haut du trou)
NUAGES_BAS_G = (1950, 60)     # le nuage du bas à gauche (il commence sous 1950, au bord gauche) part aussi
EPINETTE_G = (2690, 2960, 0, 330)   # y0, y1, x0, x1 : l'épinette au trait du bord gauche, effacée
EPINETTE_D = (2300, 2960, 2740, 3072)   # l'épinette au trait du bord droit (elle reste au centre)
PIERRES = (2858, 2936, 186)   # y0, y1, x0 : la rangée de pierres, qui reste
DESCENTE = 200                # px : le soleil descend d'autant derrière la colline
POINTE = 90                   # px : le nuage que le soleil cachait finit en pointe sur cette longueur

# ---- au dos (pouces)
MARGE = 0.13                  # autour de ce qui est écrit
X_DROITE = 7.60               # le pied droit de la colline (le filet finit à 7,62 po)
L_G, L_D = 0.90, 0.65         # la longueur des bouts, à gauche et à droite
LISSE_CRETE = 0.06            # le lissage de la crête aux bouts
NUAGES_DEBUT, NUAGES_FIN = 0.15, 0.55   # la part du bout où un nuage commence à s'amincir, puis finit
HAUTE = 1.70                  # po : la largeur, à gauche du bout droit, où la scène monte jusqu'en haut du trou
MIETTE = 4000                 # px de l'image : un morceau détaché plus petit part (les traits de gouge du ciel)


# ---------------------------------------------------------------- les couleurs
def _dist(a, couleurs):
    """La distance de chaque point au plus proche des segments entre les couleurs (les bords adoucis passent d'une
    teinte à l'autre)."""
    best = np.full(a.shape[:2], 1e9, np.float32)
    for i in range(len(couleurs)):
        for j in range(i, len(couleurs)):
            p, q = couleurs[i], couleurs[j]
            v = q - p
            t = np.clip(((a - p) @ v) / max(float(v @ v), 1e-6), 0, 1) if i != j else np.zeros(a.shape[:2], np.float32)
            best = np.minimum(best, np.linalg.norm(a - (p + t[..., None] * v), axis=-1))
    return best


def _alpha_orange(a):
    """Part d'orange de chaque point, mesurée contre la couleur du fond voisin (les bandes du ciel changent de brun)."""
    rb = a[..., 0] - a[..., 2]
    idx = ndi.distance_transform_edt(~(rb < 100), return_distances=False, return_indices=True)
    bg = a[idx[0], idx[1]]
    bg = np.stack([ndi.uniform_filter(bg[..., c], 9) for c in range(3)], -1)
    v = ORANGE - bg
    return np.clip(((a - bg) * v).sum(-1) / np.maximum((v * v).sum(-1), 1), 0, 1), a[idx[0], idx[1]]


def _orange_franc(a):
    return np.clip((a[..., 0] - a[..., 2] - 120) / 80, 0, 1)


# ---------------------------------------------------------------- le soleil
def _soleil(arr):
    """Le contour du soleil : centre, rayon, et rayon relatif par angle. Le cercle est ajusté sur le bord du haut et de
    la gauche ; le bas, derrière la colline, est le miroir du haut ; les angles où un nuage touche le bord sont pris
    entre leurs voisins."""
    y0, y1, x0, x1 = SOLEIL_BOITE
    al, _ = _alpha_orange(arr[y0:y1, x0:x1])
    m = al > 0.5
    b = m & ~ndi.binary_erosion(m)
    ys, xs = np.nonzero(b)
    ys, xs = ys.astype(float), xs.astype(float)
    k = (xs + x0 < 2590) & (ys + y0 < 2025)
    for _ in range(2):
        A = np.c_[2 * xs[k], 2 * ys[k], np.ones(k.sum())]
        c = np.linalg.lstsq(A, xs[k] ** 2 + ys[k] ** 2, rcond=None)[0]
        cx, cy = c[0], c[1]
        r0 = np.sqrt(c[2] + cx ** 2 + cy ** 2)
        k &= np.abs(np.hypot(xs - cx, ys - cy) - r0) < 12
    ang = np.linspace(-np.pi, np.pi, 720, endpoint=False)
    ray = np.full_like(ang, np.nan)
    rr = np.arange(0.8 * r0, 1.2 * r0, 0.25)
    for i, t in enumerate(ang):
        yy = np.clip(np.rint(cy + rr * np.sin(t)).astype(int), 0, m.shape[0] - 1)
        xx = np.clip(np.rint(cx + rr * np.cos(t)).astype(int), 0, m.shape[1] - 1)
        v = al[yy, xx]
        hors = np.nonzero(v < 0.5)[0]
        if len(hors) and hors[0] > 0:
            j = hors[0]
            a_, b_ = v[j - 1], v[j]
            ray[i] = rr[j - 1] + (a_ - 0.5) / max(a_ - b_, 1e-3) * (rr[j] - rr[j - 1])
    bon = (np.sin(ang) < 0.3) & (np.abs(ray - r0) < 0.02 * r0)
    ray[~bon] = np.nan
    for i in np.nonzero(np.sin(ang) >= 0.3)[0]:
        j = int(np.argmin(np.abs(np.angle(np.exp(1j * (ang + ang[i]))))))
        ray[i] = ray[j]
    ok = ~np.isnan(ray)
    ray = np.interp(np.arange(len(ang)), np.nonzero(ok)[0], ray[ok], period=len(ang))
    ray = ndi.median_filter(ray, 5, mode='wrap')
    return cx + x0, cy + y0, r0, ray / r0, ang


def _disque(shape, cx, cy, r0, ray, ang, sur=4):
    """Le soleil (alpha de 0 à 1, bord adouci) dans un tableau de la taille shape, centré en cx, cy."""
    H, W = shape
    y0, y1 = max(0, int(cy - 1.2 * r0)), min(H, int(cy + 1.2 * r0) + 1)
    x0, x1 = max(0, int(cx - 1.2 * r0)), min(W, int(cx + 1.2 * r0) + 1)
    out = np.zeros(shape, np.float32)
    if y1 <= y0 or x1 <= x0:
        return out
    yy, xx = np.mgrid[y0 * sur:y1 * sur, x0 * sur:x1 * sur].astype(np.float32)
    yy, xx = (yy + 0.5) / sur, (xx + 0.5) / sur
    t = np.arctan2(yy - cy, xx - cx)
    m = (np.hypot(yy - cy, xx - cx) <= np.interp(t, ang, ray, period=2 * np.pi) * r0).astype(np.float32)
    out[y0:y1, x0:x1] = m.reshape(y1 - y0, sur, x1 - x0, sur).mean((1, 3))
    return out


# ---------------------------------------------------------------- la crête
def crete(src, sol):
    """La crête des collines, une ligne par colonne : le premier point sous les bancs du ciel qui n'est ni ciel, ni
    banc, ni orange. Le bord sombre du soleil, sur ses flancs, compte comme du soleil. Là où le rideau de la forêt a
    la couleur du ciel (pas de liséré), la lecture tombe trop bas : on prend le profil voisin ; hors du soleil, pas de
    pointe (un trait de gouge dans un banc n'est pas une cime)."""
    y0, y1 = 1950, 2450
    a = src[y0:y1].copy()
    cx, cy, r0, ray, ang = sol
    yy, xx = np.mgrid[y0:y1, 0:src.shape[1]].astype(np.float32)
    t = np.arctan2(yy - cy, xx - cx)
    dr = np.hypot(yy - cy, xx - cx) - np.interp(t, ang, ray, period=2 * np.pi) * r0
    a[(np.abs(dr + 1) < 7) & (yy < CRETE_SOLEIL)] = ORANGE
    hors = ndi.binary_opening(_dist(a, BANCS) > 14, structure=np.ones((5, 1)))
    c = (np.where(hors.any(0), np.argmax(hors, 0), y1 - y0) + y0).astype(np.float32)
    lisse = ndi.gaussian_filter1d(ndi.median_filter(c, size=121), 20)
    c = np.where(c > lisse + 40, lisse, c)
    col = np.arange(len(c))
    soleil = (col >= SOLEIL_COL[0]) & (col < SOLEIL_COL[1])
    etroit = ndi.grey_opening(c, size=CIME_MIN)      # une pointe plus étroite qu'une cime (un trait du rideau qui
    return np.where(soleil, etroit, np.maximum(c, lisse - 10))     # monte dans le soleil) part


# ---------------------------------------------------------------- l'image, préparée pour le dos
def preparer(src, cr, sol):
    """Les nuages du haut et celui du bas à gauche partent, l'épinette au trait du bord gauche aussi ; le soleil
    descend de DESCENTE derrière la colline, et le nuage de droite qu'il cachait finit en pointe."""
    w = src.copy()
    H, W = w.shape[:2]
    cx, cy, r0, ray, ang = sol
    vieux = _disque((H, W), cx, cy, r0, ray, ang)
    vieux_d = ndi.binary_dilation(vieux > 0.02, iterations=18)
    # le vrai bord du soleil déborde un peu le contour ajusté sur ses flancs bas : tout l'orange qui touche le disque
    # sous son centre en fait partie (le nuage de droite, plus haut, non)
    o = (_orange_franc(w) > 0.05) & ndi.binary_dilation(vieux > 0.02, iterations=40)
    o[:int(cy)] &= vieux_d[:int(cy)]
    vieux_d |= ndi.binary_dilation(o, iterations=3)

    # 1. les nuages qui partent : remis au ciel uni (ils sont posés sur lui)
    y0n = 1650
    al, _ = _alpha_orange(w[y0n:2100])
    lab, n = ndi.label(al > 0.3)
    for i, sl in enumerate(ndi.find_objects(lab), 1):
        haut_, gauche_ = sl[0].start + y0n, sl[1].start
        if vieux_d[y0n:2100][lab == i].any():
            continue
        if haut_ < NUAGES_HAUT or (haut_ >= NUAGES_BAS_G[0] and gauche_ < NUAGES_BAS_G[1]):
            zone = ndi.binary_dilation(lab[sl] == i, iterations=3)
            ys, xs = np.nonzero(zone)
            if haut_ < NUAGES_HAUT:
                w[ys + sl[0].start + y0n, xs + sl[1].start] = CIEL
            else:                                   # celui du bas est posé sur un banc : il en prend la couleur
                bande = w[ys + sl[0].start + y0n, np.minimum(W - 1, sl[1].stop + 20)]
                w[ys + sl[0].start + y0n, xs + sl[1].start] = bande

    # 2. l'épinette au trait du bord gauche part ; les pierres restent
    ya, yb, xa, xb = EPINETTE_G
    rr, cc = np.mgrid[ya:yb, xa:xb]
    w = _sans_epinette(w, EPINETTE_G, (rr >= PIERRES[0]) & (rr < PIERRES[1]) & (cc >= PIERRES[2]))

    # 3. le soleil : ce qu'il couvrait au-dessus de la crête reprend, rangée par rangée, la couleur du bord le plus
    #    proche (sans le nuage de droite : la bande qui est sous lui)
    dessus = np.arange(H)[:, None] < cr[None, :]
    ys, xs = np.nonzero(vieux_d & dessus)
    xg, xd = int(xs.min()) - 3, int(xs.max()) + 3

    def colonne(x):
        c = w[:, x].copy()
        lab1, n1 = ndi.label((c[:, 0] - c[:, 2]) > 150)
        for j in range(1, n1 + 1):
            yy = np.nonzero(lab1 == j)[0]
            c[yy] = c[min(H - 1, yy.max() + 3)]
        return c
    cg, cd = colonne(xg), colonne(xd)
    w[ys, xs] = np.where((xs < cx)[:, None], cg[ys], cd[ys])

    # 4. le nuage de droite : son bout, coupé par le bord du soleil, finit en pointe (resserré vers sa ligne du
    #    milieu, de rien à sa hauteur entière sur POINTE)
    ya, yb = 1800, 1950
    o, _ = _alpha_orange(w[ya:yb, xd - 5:xd + POINTE + 40])
    yy = np.arange(yb - ya)
    for k in range(o.shape[1]):
        col = o[:, k]
        if col.max() < 0.5:
            continue
        m_ = col.sum()
        c_ = (col * yy).sum() / m_
        f = np.clip((k - 5) / POINTE, 0, 1) ** 0.8
        ote = col * (1 - np.clip(f * m_ / 2 + 0.5 - np.abs(yy - c_), 0, 1))
        x = xd - 5 + k
        w[ya:yb, x] = w[ya:yb, x] * (1 - ote[:, None]) + cd[ya:yb] * ote[:, None]

    # 5. le soleil, plus bas, derrière la colline. Sous la crête, l'orange qui passait entre les cimes reste orange
    #    s'il est dans le nouveau soleil ; sinon il prend la couleur du rideau juste dessous
    neuf = _disque((H, W), cx, cy + DESCENTE, r0, ray, ang)
    ys, xs = np.nonzero(vieux_d & ~dessus & (_orange_franc(w) > 0.2) & (neuf < 0.5))
    if len(ys):
        w[ys, xs] = w[np.minimum(H - 1, cr[xs].astype(int) + 50), xs]
    neuf = neuf * dessus
    w = w * (1 - neuf[..., None]) + ORANGE * neuf[..., None]
    return w


def _sans_epinette(w, boite, garde=None):
    """Une copie de l'image où les traits clairs de l'épinette au trait de la boîte (y0, y1, x0, x1) prennent le sombre
    de la forêt autour (l'épinette a le même sombre dedans) ; garde : un masque de la boîte qui reste."""
    w = w.copy()
    ya, yb, xa, xb = boite
    z = w[ya:yb, xa:xb]
    clair = (z @ np.array([.2126, .7152, .0722], np.float32)) > 75
    garde = np.zeros(clair.shape, bool) if garde is None else garde
    trait = ndi.binary_dilation(clair & ~garde, iterations=2) & ~garde
    z[trait] = np.median(z[~ndi.binary_dilation(clair, iterations=4)].reshape(-1, 3), axis=0)
    return w


def _nuages(w):
    """Les nuages orange (sans le soleil), alpha de 0 à 1 à la taille de l'image : un nuage est un trait couché."""
    out = np.zeros(w.shape[:2], np.float32)
    y0, y1 = 1800, 2100
    al, _ = _alpha_orange(w[y0:y1])
    lab, n = ndi.label(al > 0.3)
    for i, sl in enumerate(ndi.find_objects(lab), 1):
        if sl[0].stop - sl[0].start < 120:
            zone = ndi.binary_dilation(lab == i, iterations=3)
            out[y0:y1] = np.maximum(out[y0:y1], np.where(zone, al, 0))
    return out


def _alpha_ciel(w, haut):
    """1 sur ce qui n'est ni le ciel ni un banc brun clair (les nuages, le soleil, les cimes), sans les petits traits
    de gouge du ciel. Sous la crête, tout compte (voir scene)."""
    d = _dist(w[haut:BAS + 1], BANCS[:3])
    al = np.clip((d - 6) / 10, 0, 1)
    lab, n = ndi.label(al > 0.5)
    taille = ndi.sum(np.ones_like(al), lab, index=np.arange(1, n + 1))
    zone = ndi.binary_dilation(np.concatenate([[False], taille > 3000])[lab], iterations=3)
    return np.where(zone, al, 0).astype(np.float32)


def _aller_retour(z, a, b):
    p = b - a
    m = np.mod(z - a, 2 * p)
    return np.where(m < p, a + m, a + 2 * p - m)


# ---------------------------------------------------------------- la scène, à la taille de l'image
def scene(w, cr_img, haut, s, ppp):
    """La scène, 1 px = 1 px de l'image, de la ligne haut à BAS : RVB et alpha. Au centre, les colonnes de l'image
    telles quelles ; aux bouts, la colline redescend au filet et les nuages finissent en pointe."""
    A = _alpha_ciel(w, haut)
    nuages = _nuages(w)
    lg, ld = int(round(L_G * ppp / s)), int(round(L_D * ppp / s))
    wc = CENTRE[1] - CENTRE[0]
    W = lg + wc + ld
    c = np.arange(W, dtype=np.float32)
    u = np.empty(W, np.float32)
    t = np.zeros(W, np.float32)                       # 0 au centre, 1 au pied de la colline
    g, m, d_ = c < lg, (c >= lg) & (c < lg + wc), c >= lg + wc
    u[g] = _aller_retour(CENTRE[0] - (lg - c[g]), GAUCHE[0], GAUCHE[1])
    t[g] = (lg - c[g]) / lg
    u[m] = CENTRE[0] + (c[m] - lg)
    u[d_] = _aller_retour(DROITE[1] - 1 - (c[d_] - lg - wc), DROITE[0], DROITE[1] - 1)
    t[d_] = (c[d_] - lg - wc) / ld
    ui = np.clip(np.rint(u).astype(int), 0, w.shape[1] - 1)

    # la crête : au centre celle du devant ; aux bouts, lissée, puis elle descend au filet
    cu = cr_img[ui]
    lisse = ndi.gaussian_filter1d(cu, LISSE_CRETE * ppp / s, mode='nearest')
    c0 = cu + (lisse - cu) * np.clip(t / 0.08, 0, 1)
    e = (1 - np.cos(np.pi * np.clip(t, 0, 1))) / 2
    ch = c0 + (BAS + 2 - c0) * e
    prof = np.where(g, PROF_G, np.where(d_, PROF_D, 1e9)).astype(np.float32)

    r = np.arange(haut, BAS + 1, dtype=np.float32)[:, None]
    colline = r >= ch[None, :]
    v = np.where(colline, cu[None, :] + (r - ch[None, :]), r)
    uu = np.broadcast_to(ui[None, :], v.shape)
    vv = np.clip(v, 0, w.shape[0] - 1)
    rgb = np.stack([ndi.map_coordinates(w[..., k], [vv, uu], order=1) for k in range(3)], -1)
    wd = _sans_epinette(w, EPINETTE_D)               # au bout droit, l'épinette au trait ne se répète pas
    rgb_d = np.stack([ndi.map_coordinates(wd[..., k], [vv, uu], order=1) for k in range(3)], -1)
    rgb = np.where(d_[None, :, None], rgb_d, rgb)
    Ap = np.pad(A, ((haut, w.shape[0] - BAS - 1), (0, 0)))
    al = ndi.map_coordinates(Ap, [vv, uu], order=1)
    al = np.where(colline, 1.0, np.where(m[None, :], al, 0.0))
    sombre = colline & ((r - ch[None, :]) > prof[None, :])
    fg = np.median(w[2500:2800, GAUCHE[0]:GAUCHE[0] + 60].reshape(-1, 3), axis=0)
    fd = np.median(w[2500:2800, DROITE[0]:DROITE[0] + 60].reshape(-1, 3), axis=0)
    rgb = np.where((sombre & g[None, :])[..., None], fg, rgb)
    rgb = np.where((sombre & d_[None, :])[..., None], fd, rgb)

    # les nuages des bouts, à leur hauteur, dans leurs colonnes, resserrés vers leur ligne du milieu
    poids = nuages[:, ui]
    cc = (poids * np.arange(nuages.shape[0], dtype=np.float32)[:, None]).sum(0) / np.maximum(poids.sum(0), 1e-6)
    fc = np.where(m, 1.0, np.clip((NUAGES_FIN - t) / (NUAGES_FIN - NUAGES_DEBUT), 0, 1) ** 0.8)
    vn = cc[None, :] + (r - cc[None, :]) / np.maximum(fc[None, :], 1e-3)
    no = ndi.map_coordinates(nuages, [vn, uu], order=1)
    no = np.where(m[None, :] | (fc[None, :] <= 0), 0, no) * (~colline)
    rgb = rgb * (al * (1 - no))[..., None] + ORANGE * no[..., None]
    al = al + no * (1 - al)
    rgb = rgb / np.maximum(al[..., None], 1e-4)

    # sans miettes : un morceau détaché trop petit part
    lab, n = ndi.label(al > 0.3)
    if n > 1:
        taille = ndi.sum(np.ones_like(al), lab, index=np.arange(1, n + 1))
        garde = np.concatenate([[False], taille >= MIETTE])
        al = np.where(ndi.binary_dilation(garde[lab], iterations=2), al, 0)
    return rgb.astype(np.float32), al.astype(np.float32)


def _reduire(rgb, al, s):
    """Réduit la scène à l'échelle s (couleur prémultipliée par l'alpha : le bord ne fonce pas)."""
    h, w = al.shape
    W, H = max(1, round(w * s)), max(1, round(h * s))
    pre = rgb * al[..., None]
    P = np.stack([np.asarray(Image.fromarray(np.ascontiguousarray(pre[..., k])).resize((W, H), Image.LANCZOS))
                  for k in range(3)], -1)
    A = np.clip(np.asarray(Image.fromarray(np.ascontiguousarray(al)).resize((W, H), Image.LANCZOS)), 0, 1)
    return np.clip(P / np.maximum(A[..., None], 1e-4), 0, 255), A


# ---------------------------------------------------------------- le texte
def _titre_sommaire(rects):
    """Le bloc du titre « Dans ce tome » : bas et large, sous le texte d'ouverture."""
    t = [r for r in rects if r[4] == 0 and r[3] - r[1] < 0.4 * 96 and r[2] - r[0] > 5 * 96 and 2.0 * 96 < r[1] < 4 * 96]
    return min(t, key=lambda r: r[1]) if t else None


def _occupe(rects, q, shape, marge, titre):
    """Ce qui est écrit, élargi de la marge (px du fond) : chaque ligne de texte, et chaque bloc qui n'est ni le texte
    d'ouverture (ses lignes suffisent) ni le titre du sommaire (sa ligne compte, et son filet est le sol de la scène)."""
    occ = np.zeros(shape, bool)

    def boite(x0, y0, x1, y1, dessus=True):
        occ[max(0, int(y0 * q - (marge if dessus else 0))):int(np.ceil(y1 * q + marge)),
            max(0, int(x0 * q - marge)):int(np.ceil(x1 * q + marge))] = True

    lignes = [r for r in rects if r[4] > 0]
    for r in lignes:
        boite(*r[:4])
    for b in rects:
        if b[4] != 0 or b == titre:
            continue
        dedans = [l for l in lignes if l[0] >= b[0] - 3 and l[2] <= b[2] + 3 and l[1] >= b[1] - 3 and l[3] <= b[3] + 3]
        if len(dedans) >= 2 and all(abs(l[4] - 17.33) < 0.1 for l in dedans):
            continue
        if titre and abs(b[1] - titre[1]) < 1 and b[3] > titre[3] + 10:
            boite(b[0], titre[3], b[2], b[3], dessus=False)   # le sommaire, sous le filet du titre : la scène est
                                                              # posée sur ce filet, au-dessus
            continue
        boite(*b[:4])
    return occ


# ---------------------------------------------------------------- le motif
def motif(can, info):
    ppp, xf = info['ppp'], info['xf']
    q = ppp / 96.0
    H, Wc = can.shape[:2]
    src = np.asarray(info['image'].convert('RGB')).astype(np.float32)
    if src.shape[:2] != (3840, 3072):
        raise ValueError('dos du tome 5 : image du devant attendue en 3072 × 3840')
    rects = info['rects']
    titre = _titre_sommaire(rects)
    if titre is None:
        print('    dos 5 : titre du sommaire introuvable, rien au dos')
        return can
    filet = int(round((titre[3] - 1.67) * q))           # le haut du filet du titre (1,25 pt)
    occ = _occupe(rects, q, (H, Wc), MARGE * ppp, titre)
    # le haut du trou : sous la plus basse ligne du texte d'ouverture qui passe au-dessus du haut de la scène (le
    # soleil, les chalets, le nuage du milieu) ; la dernière ligne, courte, ne passe qu'au-dessus du bout gauche, bas
    xg, xd = int(round((X_DROITE - L_D - HAUTE) * ppp)), int(round(X_DROITE * ppp))
    au_dessus = np.nonzero(occ[:filet, xg:xd].any(1))[0]
    haut_trou = int(au_dessus.max()) + 1 if len(au_dessus) else filet - int(0.73 * ppp)

    sol = _soleil(src)
    cr = crete(src, sol)
    w = preparer(src, cr, sol)
    # le haut de la scène : le plus haut point de ce qui n'est pas le ciel uni (sans les petits traits de gouge)
    pas_ciel = _dist(w[1600:BAS, CENTRE[0]:CENTRE[1]], BANCS[:3]) > 12
    lab, n = ndi.label(pas_ciel)
    pas_ciel = np.concatenate([[False], ndi.sum(pas_ciel, lab, index=np.arange(1, n + 1)) > 3000])[lab]
    haut = int(np.nonzero(pas_ciel.any(1))[0][0]) + 1600 - 2
    s = (filet - haut_trou) / (BAS - haut + 1)

    rgb, al = scene(w, cr, haut, s, ppp)
    C, A = _reduire(rgb, al, s)
    x0, y0 = int(round(X_DROITE * ppp)) - A.shape[1], filet - A.shape[0]
    # garde : rien dans la marge du texte (la scène est faite pour ne pas y entrer ; on le vérifie)
    zone = occ[y0:y0 + A.shape[0], x0:x0 + A.shape[1]]
    pris = int(((A > 0.02) & zone).sum())
    A = np.where(zone, 0, A)
    z = can[y0:y0 + A.shape[0], x0:x0 + A.shape[1]].astype(np.float32)
    can[y0:y0 + A.shape[0], x0:x0 + A.shape[1]] = np.clip(np.rint(z + A[..., None] * (C - z)), 0, 255).astype(np.uint8)
    if x0 + A.shape[1] > xf - int(0.5 * ppp):
        print('    dos 5 : ATTENTION, la scène passe le bord de la quatrième')
    if pris:
        print('    dos 5 : ATTENTION, %d points de la scène entraient dans la marge du texte (effacés)' % pris)
    print('    dos 5 : scène de %.2f × %.2f po, de %.2f à %.2f po du bord perdu, posée sur le filet à %.2f po du haut '
          '(trou dès %.2f po) ; échelle %.3f de l\'image (le devant : %.3f)' % (
              A.shape[1] / ppp, A.shape[0] / ppp, x0 / ppp, (x0 + A.shape[1]) / ppp, filet / ppp, haut_trou / ppp, s,
              max((Wc - xf) / src.shape[1], H / src.shape[0])))
    return can
