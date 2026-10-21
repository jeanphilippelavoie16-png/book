"""homme.py — adapter une figure de femme décalquée en homme (même dessinateur, même trait).

On ne redessine pas : on déforme le décalque rangée par rangée (épaules et cou plus larges, taille
plus droite, hanches plus étroites), on enlève ce qui est féminin (chignon, seins, lèvres, pubis)
et on ajoute ce qui est masculin (cheveux courts, pectoraux, bouche en un trait, sous-vêtement).
Repères en pixels de la figure source (rangée y depuis le haut du recadrage).
"""
import numpy as np, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from scipy import ndimage as ndi
from skimage.transform import warp
from decalque_corps import couches, formes, traits, PEAU, CHEVEUX, NOIR
from courbes import courbes, svg_d

# largeur relative de l'homme par rapport à la femme, selon la hauteur (rangées de la source)
ECHELLE = [(0, 1.0), (44, 1.0), (47, 1.05), (52, 1.28), (58, 1.16), (66, 1.13), (80, 1.12), (96, 1.10),
           (116, 1.08), (136, 1.0), (152, 0.93), (165, 0.94), (180, 0.96), (200, 0.99), (215, 1.02), (252, 1.0), (300, 1.0)]

def deformer(m, k, cx):
    ys = np.array([a for a, b in ECHELLE], float)*k; ss = np.array([b for a, b in ECHELLE])
    def inv(coords):            # coords : (col, ligne) de la sortie -> source
        x, y = coords[:, 0], coords[:, 1]
        s = np.interp(y, ys, ss)
        return np.stack([cx + (x - cx)/s, y], 1)
    return warp(m.astype(float), inv, order=1, mode='constant', cval=0.0) > 0.5


# ── la transformation du corps : un tronc d'homme, des cuisses d'homme ────────────
# Rangée par rangée, le tronc (entre les bras) prend la demi-largeur d'un homme ; les bras sont
# déplacés tels quels (ils gardent leur forme) ; au-dessus des aisselles et sous l'entrejambe,
# une simple mise à l'échelle autour de l'axe.
TRONC_HOMME = [(92, 21.6), (104, 20.6), (114, 20.2), (126, 20.6), (140, 21.3), (152, 21.3), (164, 21.0)]
CUISSE = [(165, 0.91), (172, 0.90), (182, 0.94), (196, 0.99), (206, 1.0), (215, 1.02), (252, 1.0), (300, 1.0)]
HAUT = [(0, 1.0), (44, 1.0), (47, 1.05), (52, 1.28), (58, 1.16), (66, 1.13), (80, 1.12), (88, 1.11)]

def demi_tronc(fig, k, cx, y0=92, y1=164):
    """Demi-largeur du tronc de la source, rangée par rangée (le bras ôté) ; interpolée là où le bras touche."""
    ys = np.arange(y0, y1 + 1); t = np.full(len(ys), np.nan)
    for i, y in enumerate(ys):
        r = np.nonzero(fig[int(y*k)])[0]
        if not len(r): continue
        runs = np.split(r, np.nonzero(np.diff(r) > 1)[0] + 1)
        if len(runs) >= 3:
            for run in runs:
                if run[0] <= cx <= run[-1]: t[i] = 0.5*((cx - run[0]) + (run[-1] - cx))/k
    ok = ~np.isnan(t)
    t = np.interp(ys, ys[ok], t[ok])
    t = np.convolve(np.pad(t, 3, mode='edge'), np.ones(7)/7, 'valid')
    # demi-largeur hors tout (jusqu'au bord extérieur du bras)
    e = np.zeros(len(ys))
    for i, y in enumerate(ys):
        r = np.nonzero(fig[int(y*k)])[0]
        if len(r): e[i] = 0.5*((cx - r[0]) + (r[-1] - cx))/k
    e = np.clip(e - t, 7.0, 12.5) + t                        # un bras a une largeur de bras, pas une bosse
    e = np.convolve(np.pad(e, 8, mode='edge'), np.ones(17)/17, 'valid')
    return ys, t, e

BRAS = 1.16   # les bras d'un homme : plus épais que ceux de la femme

def deformer_homme(m, k, cx, ys_t, tw, te):
    yh = np.array([a for a, b in HAUT], float)*k; sh = np.array([b for a, b in HAUT])
    yc = np.array([a for a, b in CUISSE], float)*k; sc = np.array([b for a, b in CUISSE])
    yt = np.array([a for a, b in TRONC_HOMME], float)*k; tm_ = np.array([b for a, b in TRONC_HOMME])
    def inv(coords):
        x, y = coords[:, 0], coords[:, 1]
        dx = x - cx; sx = np.sign(dx); ax = np.abs(dx)
        src = x.copy()
        # 1. le haut (tête, cou, épaules) : mise à l'échelle
        h = y <= 88*k
        src[h] = cx + dx[h]/np.interp(y[h], yh, sh)
        # 2. le tronc et les bras
        tr = (y > 88*k) & (y < 165*k)
        if tr.any():
            yy = y[tr]/k
            Tw = np.interp(yy, ys_t, tw)*k; Tm = np.interp(yy, yt/k, tm_)*k
            # raccord doux sous les épaules : de 88 à 96, on passe de l'échelle au tronc
            b = np.clip((yy - 88)/8, 0, 1)
            s_haut = np.interp(88*k, yh, sh)
            a_ = ax[tr]
            Aw = np.maximum(np.interp(yy, ys_t, te)*k - Tw, 1.0)    # largeur du bras dans la source
            dedans = a_ <= Tm
            r = a_ - Tm
            src_bras = np.where(r <= Aw*BRAS, Tw + r/BRAS, Tw + Aw + (r - Aw*BRAS))
            src_t = np.where(dedans, a_*Tw/Tm, src_bras)
            src_e = a_/s_haut
            src[tr] = cx + sx[tr]*(b*src_t + (1 - b)*src_e)
        # 3. les cuisses et les jambes
        c = y >= 165*k
        src[c] = cx + dx[c]/np.interp(y[c], yc, sc)
        return np.stack([src, y], 1)
    return warp(m.astype(float), inv, order=1, mode='constant', cval=0.0) > 0.5

def effacer(m, k, boites):
    m = m.copy()
    for (x0, y0, x1, y1) in boites: m[int(y0*k):int(y1*k), int(x0*k):int(x1*k)] = False
    return m

def homme_masques(src, boite, face=True, k=8, marge=10):
    """Les couches de l'homme (pixels agrandis) et ses ajouts (polylignes en pixels agrandis)."""
    x0, y0, x1, y1 = boite
    fig, chev, tr, L = couches(src, (x0 - marge, y0, x1 + marge, y1), k)
    cols = np.nonzero(fig[int(70*k)])[0]; cx = (cols.min() + cols.max())/2
    cxo = cx/k
    # la silhouette brute, à la résolution de la source (sans les franges de l'agrandissement) : le bras y est séparé du tronc
    from PIL import Image as _I
    _im = _I.open(src).convert('RGBA'); _f = _I.new('RGBA', _im.size, (255, 255, 255, 255)); _f.alpha_composite(_im)
    fig0 = np.asarray(_f.convert('L').crop((x0 - marge, y0, x1 + marge, y1))).astype(float) < 240
    H, W = fig.shape; Y, X = np.mgrid[0:H, 0:W]
    tete = ((X - cx)/(14.4*k))**2 + ((Y - 33.5*k)/(18.0*k))**2 <= 1.0
    calotte = ((X - cx)/(14.7*k))**2 + ((Y - 33.0*k)/(18.8*k))**2 <= 1.0
    chignon = chev & ~tete
    bas = np.full(W, -1)
    for c in np.nonzero(chev.any(0))[0]:
        r = np.nonzero(chev[:, c] & tete[:, c])[0]
        if len(r): bas[c] = r.max()
    from scipy.ndimage import maximum_filter1d
    bas = maximum_filter1d(bas, size=3*k)
    u = (X - cx)/(14.4*k)
    if face:
        ligne = 21.0*k + 6.5*k*u**2
        chev = calotte & (Y <= np.maximum(ligne, np.minimum(bas[None, :], 22*k))) & fig
    else:
        chev = calotte & (Y <= bas[None, :]) & (Y < 45*k - 4*k*u**2) & ~((np.abs(u) > 0.8) & (Y > 27*k))   # coupés court : les oreilles se voient
    tete_fine = ((X - cx)/(13.9*k))**2 + ((Y - 33.5*k)/(18.0*k))**2 <= 1.0
    bande = (Y > 14*k) & (Y < 36*k)               # à la hauteur des tempes, la tête de l'homme est la sienne, pas les cheveux de la femme
    fig = (fig & ~chignon & ~((Y < 22*k) & ~calotte) & ~(bande & ~tete_fine)) | (chev & tete_fine)
    chev = chev & tete_fine
    if face:
        tr = effacer(tr, k, [(cxo - 20, 90, cxo + 20, 104), (cxo - 6, 39, cxo + 6, 47), (cxo - 9, 138, cxo + 9, 162),
                             (cxo - 16, 14, cxo - 8.5, 31), (cxo + 8.5, 14, cxo + 16, 31)])   # les bords des cheveux de la femme sur les tempes
    else:
        tr = effacer(tr, k, [(cxo - 7, 130, cxo + 7, 168)])
    ys_t, tw, te = demi_tronc(fig0, 1, cx/k)
    fig = deformer_homme(fig, k, cx, ys_t, tw, te); chev = deformer_homme(chev, k, cx, ys_t, tw, te); tr = deformer_homme(tr, k, cx, ys_t, tw, te)
    tr = tr & ~ndi.binary_dilation(chev, iterations=k)
    P = lambda pts, sx=1.0: np.array([(cx + (px - cxo)*k*sx, py*k) for px, py in pts])
    ajouts = []   # (polyligne, rôle)
    if face:
        s = 1.10
        ajouts.append((P([(cxo - 2, 96), (cxo - 8, 98.5), (cxo - 14, 97), (cxo - 17, 93)], s), 'interieur'))
        ajouts.append((P([(cxo + 2, 96), (cxo + 8, 98.5), (cxo + 14, 97), (cxo + 17, 93)], s), 'interieur'))
        ajouts.append((P([(cxo - 2.6, 43.5), (cxo + 2.6, 43.5)], 1.05), 'detail'))
    g, d = cxo - 21.9, cxo + 21.9; g2, d2 = cxo - 21.6, cxo + 21.6
    yb = 167 if face else 171
    slip = [(g + 0.3, 139.5), (cxo, 140.5), (d - 0.3, 139.5), (d2 - 0.2, 151), (cxo + 10, 158), (cxo + 3.5, yb - 1), (cxo, yb),
            (cxo - 3.5, yb - 1), (cxo - 10, 158), (g2 + 0.2, 151)]
    slip = np.array([(x*k, y*k) for x, y in slip])
    ajouts.append((np.array([((g + 0.6)*k, 142.5*k), (cx, 143.5*k), ((d - 0.6)*k, 142.5*k)]), 'detail'))
    return fig, chev, tr, cx, slip, ajouts

def homme(src, boite, face=True, k=8, ech=0.25, ep=1.3, marge=10):
    x0, y0, x1, y1 = boite
    fig, chev, tr, L = couches(src, (x0 - marge, y0, x1 + marge, y1), k)
    # repères de la figure (dans le recadrage élargi)
    cols = np.nonzero(fig[int(70*k)])[0]; cx = (cols.min() + cols.max())/2
    cxo = cx/k
    # 1. le chignon s'en va : les cheveux suivent le crâne (ellipse de la tête)
    H, W = fig.shape; Y, X = np.mgrid[0:H, 0:W]
    tete = ((X - cx)/(14.4*k))**2 + ((Y - 33.5*k)/(18.0*k))**2 <= 1.0
    calotte = ((X - cx)/(15.2*k))**2 + ((Y - 33.0*k)/(19.0*k))**2 <= 1.0      # les cheveux courts débordent un peu du crâne
    chignon = chev & ~tete
    # les cheveux de l'homme : la calotte, jusqu'à la naissance des cheveux de la femme (colonne par colonne)
    bas = np.full(W, -1)
    cols = np.nonzero(chev.any(0))[0]
    for c in cols:
        r = np.nonzero(chev[:, c] & tete[:, c])[0]
        if len(r): bas[c] = r.max()
    from scipy.ndimage import maximum_filter1d
    bas = maximum_filter1d(bas, size=3*k)
    u = (X - cx)/(14.4*k)
    if face:   # devant : une naissance des cheveux d'homme, presque droite, qui descend aux tempes
        ligne = 20.5*k + 10*k*u**4
        chev = calotte & (Y <= np.maximum(ligne, np.minimum(bas[None, :], 22*k)))
    else:      # derrière : la nuque coupée court, en courbe
        chev = calotte & (Y <= bas[None, :]) & (Y < 45*k - 4*k*u**2) & ~((np.abs(u) > 0.8) & (Y > 27*k))   # coupés court : les oreilles se voient
    tete_fine = ((X - cx)/(13.9*k))**2 + ((Y - 33.5*k)/(18.0*k))**2 <= 1.0
    bande = (Y > 14*k) & (Y < 36*k)               # à la hauteur des tempes, la tête de l'homme est la sienne, pas les cheveux de la femme
    fig = (fig & ~chignon & ~((Y < 22*k) & ~calotte) & ~(bande & ~tete_fine)) | (chev & tete_fine)
    chev = chev & tete_fine
    # 2. ce qui est féminin sort du trait
    if face:
        tr = effacer(tr, k, [(cxo - 20, 90, cxo + 20, 104),      # le bas des seins
                             (cxo - 6, 39, cxo + 6, 47),          # les lèvres
                             (cxo - 9, 138, cxo + 9, 162)])        # le pubis
    else:
        tr = effacer(tr, k, [(cxo - 7, 130, cxo + 7, 168)])           # le haut de la fesse, sous le slip
    # 3. on élargit les épaules et le cou, on redresse la taille, on resserre les hanches
    fig = deformer(fig, k, cx); chev = deformer(chev, k, cx); tr = deformer(tr, k, cx)
    tr = tr & ~ndi.binary_dilation(chev, iterations=k)
    el = []
    el += formes(fig, ech, 0.7, 1.0, PEAU, contour=NOIR, ep=ep)
    el += formes(chev, ech, 0.8, 1.5, CHEVEUX, contour=NOIR, ep=ep)
    el += traits(tr, ech, 0.7, 1.6, ep, ergot=2.2*k)
    P = lambda pts: np.array([(cx + (px - cxo)*k*sx, py*k) for px, py, sx in pts])*ech
    def trait(pts, e=ep):
        return f'<path d="{svg_d(courbes(P(pts), 0.4, False, sigma=0.6))}" fill="none" stroke="{NOIR}" stroke-width="{e}" stroke-linecap="round"/>'
    # 4. ce qui est masculin entre
    def rangee(y):     # bords du tronc à la rangée y (la plage qui contient le milieu)
        r = np.nonzero(fig[int(y*k)])[0]
        runs = np.split(r, np.nonzero(np.diff(r) > 1)[0] + 1)
        for run in runs:
            if run[0] <= cx <= run[-1]: return run[0]/k, run[-1]/k
        return cxo - 15, cxo + 15
    if face:
        s = 1.10
        el.append(trait([(cxo - 2, 96, s), (cxo - 8, 98.5, s), (cxo - 14, 97, s), (cxo - 17, 93, s)]))   # pectoraux
        el.append(trait([(cxo + 2, 96, s), (cxo + 8, 98.5, s), (cxo + 14, 97, s), (cxo + 17, 93, s)]))
        el.append(trait([(cxo - 2.6, 43.5, 1.05), (cxo + 2.6, 43.5, 1.05)]))                             # la bouche
    # le sous-vêtement : ceinture à la hauteur des hanches, ouvertures des jambes en V
    g, d = cxo - 24.5, cxo + 24.5; g2, d2 = cxo - 22.5, cxo + 22.5      # le tronc, sans les mains posées contre
    yb = 167 if face else 171
    slip = [(g + 0.3, 139.5), (cxo, 140.5), (d - 0.3, 139.5), (d2 - 0.2, 151), (cxo + 10, 158), (cxo + 3.5, yb - 1), (cxo, yb),
            (cxo - 3.5, yb - 1), (cxo - 10, 158), (g2 + 0.2, 151)]
    Q = np.array([(x*k, y*k) for x, y in slip])*ech
    el.append(f'<path d="{svg_d(courbes(Q, 0.3, True, sigma=0.4), True)}" fill="#DDE2E7" stroke="{NOIR}" stroke-width="{ep}" stroke-linejoin="round"/>')
    el.append(f'<path d="M{(g+0.6)*k*ech:.1f},{142.5*k*ech:.1f} Q{cx*ech:.1f},{143.5*k*ech:.1f} {(d-0.6)*k*ech:.1f},{142.5*k*ech:.1f}" fill="none" stroke="{NOIR}" stroke-width="{ep*0.8}"/>')
    return el, fig.shape
