"""Tome 1, page de titre : les collines, la vallée pâle, la crête sombre et la ligne d'arbres (zone 0,470 à 768,735 en
768 x 960). Retouche demandée par JP le 19 octobre 2026 : « la même image, avec la rigueur des autres tomes ».

Ce qui change, et rien d'autre :
- la crête sombre sous l'orange et le plan du fond à droite : deux aplats (la nuit, le bleu nuit) séparés par un bord
  net, au lieu d'un aplat qui s'éclaircit en brume ;
- la vallée pâle : même forme, un aplat du bleu des collines ; son haut est une rangée de pointes d'épinettes taillées
  net, et le bois sombre de son pied pointe dans la vallée en épinettes nettes ;
- la colline de gauche : ses bandes sombres, aux mêmes places, deviennent des traits de gouge effilés aux deux bouts,
  en groupes parallèles ; le bois sombre entre les deux collines devient une rangée d'épinettes nettes ;
- la colline de droite : les grands traits blancs du contour restent (bords repassés) ; les petits traits deviennent
  des groupes de traits parallèles qui suivent la pente ; le rectangle blanc (751,545) et la traînée sombre (680 à 707,
  y 550 à 560) disparaissent ;
- la ligne d'arbres : chaque trait blanc pendant devient une petite épinette noire chargée de neige (pointe nette,
  deux à cinq étages qui tombent, crème sur le dessus des étages), à la même place et à la même hauteur ; plus aucune
  goutte ; la masse noire du pied est unie.

Rien ne bouge hors de la zone : les crêtes orange (et tout ce qui est au-dessus), les grandes épinettes du premier
plan, la cheminée et le toit du chalet, la neige du champ gardent les pixels reçus. Les encres sont celles de l'image
(médianes mesurées sur titre-tome-1-original.jpg).

    from collines import appliquer ; b = appliquer(a, 4)      (a : numpy RVB uint8, 3072 x 3840 ; K pixels par unité)
"""
import math
import random
import numpy as np
from scipy import ndimage as ndi
from PIL import Image, ImageDraw

# les encres, mesurées dans l'image d'origine
CRETE = np.array([2, 12, 24], np.float32)       # la nuit de la crête sous l'orange et du bois entre les collines
FOND = np.array([8, 22, 35], np.float32)        # le bleu nuit du plan du fond, à droite
COLLINE = np.array([20, 48, 72], np.float32)    # le bleu des collines et de la vallée (#132F47 à 1 près)
GOUGE = np.array([8, 22, 35], np.float32)       # les traits sombres taillés dans les collines
NUIT = np.array([6, 15, 26], np.float32)        # la nuit des arbres (#060F1A)
BLANC = np.array([232, 244, 252], np.float32)   # le blanc des traits et de la neige sur les arbres

# hors zone (unités 768 x 960) : les grandes épinettes du premier plan, la cheminée et le toit du chalet
PREMIER_PLAN = [
    [(0, 546), (9, 551), (13, 575), (15, 600), (19, 616), (23, 634), (27, 645), (32, 651), (35, 668), (34, 690),
     (39, 700), (47, 712), (49, 740), (53, 765), (0, 765)],
    [(66, 699), (84, 699), (90, 765), (60, 765)],
    [(697, 580), (702, 592), (707, 605), (713, 620), (717, 632), (725, 640), (732, 650), (740, 660), (744, 672),
     (749, 690), (751, 705), (753, 725), (759, 740), (768, 745), (768, 765), (640, 765), (648, 752), (652, 735),
     (655, 722), (660, 710), (665, 698), (667, 684), (672, 670), (679, 657), (681, 640), (681, 622), (684, 606),
     (690, 594)],
]
CHALET = [[(406, 703), (438, 703), (438, 728), (470, 728), (470, 765), (370, 765), (370, 728), (406, 728)]]
# ce qui part sans être remplacé
TRAINEE = [(674, 544), (714, 544), (714, 566), (674, 566)]
RECTANGLE = [(739, 534), (762, 534), (762, 558), (739, 558)]
# le bas de la colline de gauche, sous son bord net (le flou d'arbres gris qui le mangeait part)
GAUCHE_BAS = [(232, 584), (250, 593), (270, 604), (290, 615), (310, 626), (330, 637), (354, 647), (354, 700),
              (232, 700)]
# le pied du bois sombre entre les deux collines (le haut de la colline de droite, de gauche à droite)
BOIS_V = [(262, 680), (285, 671), (305, 664), (325, 657), (345, 650), (356, 646)]


# ---------------------------------------------------------------- outils de dessin

def _disque(r):
    r = max(1, int(round(r)))
    yy, xx = np.mgrid[-r:r + 1, -r:r + 1]
    return xx * xx + yy * yy <= r * r


def _net(f, larg=1.3):
    """Un champ flou (0..1) ramené à un bord net : la transition tient sur ~larg pixels, le contour est celui du
    seuil 0,5 du champ (une forme lissée, jamais baveuse)."""
    gy, gx = np.gradient(f)
    pente = np.maximum(np.hypot(gx, gy), 0.02)
    return np.clip(0.5 + (f - 0.5) / (pente * larg), 0, 1).astype(np.float32)


def _forme(masque, sigma):
    """Un masque binaire lissé (sigma en pixels) puis ramené à un bord net d'un pixel et demi."""
    return _net(ndi.gaussian_filter(masque.astype(np.float32), sigma))


def _raster(polys, H, W, ss=4):
    """Des polygones (coordonnées pixels du tableau H x W) rendus avec anticrénelage (suréchantillonnage ss)."""
    im = Image.new('L', (W * ss, H * ss), 0)
    d = ImageDraw.Draw(im)
    for p in polys:
        if p is not None and len(p) >= 3:
            d.polygon([(float(x) * ss, float(y) * ss) for x, y in p], fill=255)
    return np.asarray(im.resize((W, H), Image.BOX), np.float32) / 255


def _raster_local(polys, H, W, ss=4):
    """Comme _raster, mais seulement dans la boîte des polygones : rend (alpha, y0, x0) ou None."""
    polys = [np.asarray(p, float) for p in polys if p is not None and len(p) >= 3]
    if not polys:
        return None
    pts = np.concatenate(polys)
    x0 = max(0, int(math.floor(pts[:, 0].min())) - 2); x1 = min(W, int(math.ceil(pts[:, 0].max())) + 3)
    y0 = max(0, int(math.floor(pts[:, 1].min())) - 2); y1 = min(H, int(math.ceil(pts[:, 1].max())) + 3)
    if x1 <= x0 or y1 <= y0:
        return None
    return _raster([p - (x0, y0) for p in polys], y1 - y0, x1 - x0, ss), y0, x0


def _poser(c, alpha, coul, y0=0, x0=0):
    """Pose une encre sur le canevas c (float H x W x 3) avec l'alpha donné (local à y0, x0)."""
    h, w = alpha.shape
    sl = c[y0:y0 + h, x0:x0 + w]
    al = alpha[..., None]
    sl[:] = sl * (1 - al) + coul * al


def _bezier2(p0, c, p1, n=8, t0=0.0, t1=1.0):
    t = np.linspace(t0, t1, n)[:, None]
    p0, c, p1 = np.asarray(p0, float), np.asarray(c, float), np.asarray(p1, float)
    return (1 - t) ** 2 * p0 + 2 * (1 - t) * t * c + t * t * p1


def _trait(pts, lmax, puiss=0.75):
    """Un trait de gouge : une ligne médiane (N x 2), large de lmax au milieu, effilé en pointe aux deux bouts."""
    pts = np.asarray(pts, float)
    if len(pts) < 3:
        return None
    d = np.diff(pts, axis=0)
    s = np.concatenate([[0], np.cumsum(np.hypot(d[:, 0], d[:, 1]))])
    if s[-1] < 2:
        return None
    t = s / s[-1]
    tg = np.gradient(pts, axis=0)
    tg /= np.maximum(np.hypot(tg[:, 0], tg[:, 1]), 1e-6)[:, None]
    nrm = np.stack([-tg[:, 1], tg[:, 0]], 1)
    w = 0.5 * lmax * np.sin(np.pi * t) ** puiss
    return np.concatenate([pts + nrm * w[:, None], (pts - nrm * w[:, None])[::-1]])


def _reechantillonner(pts, pas):
    pts = np.asarray(pts, float)
    d = np.diff(pts, axis=0)
    s = np.concatenate([[0], np.cumsum(np.hypot(d[:, 0], d[:, 1]))])
    if s[-1] <= pas:
        return pts[[0, -1]]
    si = np.linspace(0, s[-1], max(2, int(s[-1] / pas) + 1))
    return np.stack([np.interp(si, s, pts[:, 0]), np.interp(si, s, pts[:, 1])], 1)


def _lisser(pts, sigma):
    pts = np.asarray(pts, float)
    if len(pts) < 5:
        return pts
    return np.stack([ndi.gaussian_filter1d(pts[:, 0], sigma, mode='nearest'),
                     ndi.gaussian_filter1d(pts[:, 1], sigma, mode='nearest')], 1)


def _squelette(m):
    from skimage.morphology import skeletonize
    return skeletonize(m)


def _chemins(sq, lmin):
    """Les chemins d'un squelette, du plus long au plus court (le plus long chemin, on l'enlève, on recommence) :
    listes de (y, x) ordonnés, d'au moins lmin pixels."""
    ys, xs = np.nonzero(sq)
    if len(ys) < 2:
        return []
    idx = {(y, x): i for i, (y, x) in enumerate(zip(ys, xs))}
    voisins = [[] for _ in range(len(ys))]
    for i, (y, x) in enumerate(zip(ys, xs)):
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dy or dx:
                    j = idx.get((y + dy, x + dx))
                    if j is not None:
                        voisins[i].append(j)
    vivant = np.ones(len(ys), bool)
    out = []

    def bfs(s):
        dist = {s: 0}; par = {s: None}; file = [s]; k = 0
        while k < len(file):
            u = file[k]; k += 1
            for v in voisins[u]:
                if vivant[v] and v not in dist:
                    dist[v] = dist[u] + 1; par[v] = u; file.append(v)
        return max(dist, key=dist.get), par, file

    while vivant.sum() >= lmin:
        s0 = int(np.nonzero(vivant)[0][0])
        a, _, _ = bfs(s0)
        b, par, morceau = bfs(a)
        ch = []
        u = b
        while u is not None:
            ch.append(u); u = par[u]
        if len(ch) < lmin:
            for u in morceau:            # tout ce morceau est trop court
                vivant[u] = False
            continue
        out.append([(ys[u], xs[u]) for u in ch])
        pris = set(ch)
        for u in ch:                     # le chemin et les épines qui en partent
            pris.update(voisins[u])
        for u in pris:
            vivant[u] = False
    return out


def _tangentes(gy, gx, r):
    """La direction locale d'un nuage de points de squelette, en chacun de ses points."""
    from scipy.spatial import cKDTree
    pts = np.stack([gx, gy], 1).astype(np.float32)
    arbre = cKDTree(pts)
    out = np.zeros_like(pts)
    for i, p in enumerate(pts):
        idx = arbre.query_ball_point(p, r)
        if len(idx) < 3:
            out[i] = (1, 0); continue
        v = pts[idx] - pts[idx].mean(0)
        ev, evec = np.linalg.eigh(v.T @ v)
        out[i] = evec[:, 1] if evec[0, 1] >= 0 else -evec[:, 1]
    return out


def _plus_longue_suite(ok):
    best = None; i = 0; n = len(ok)
    while i < n:
        if ok[i]:
            j = i
            while j < n and ok[j]:
                j += 1
            if best is None or j - i > best[1] - best[0]:
                best = (i, j)
            i = j
        else:
            i += 1
    return best


# ---------------------------------------------------------------- les épinettes

def _epinette(x, yt, h, rng, K, neige=True):
    """Une petite épinette noire, pointe en (x, yt), haute de h pixels : étroite, deux à cinq étages qui tombent, un
    coussin de neige sur le dessus de la plupart des étages (jamais deux côtés pareils), un peu de neige à la pointe.
    Rend (silhouette, [coussins de neige]) en polygones."""
    n = int(np.clip(round(h / (8.5 * K)), 2, 5))
    y_cime = h * rng.uniform(0.17, 0.23)
    ht = (h - y_cime) / n
    lg = min(h * rng.uniform(0.2, 0.24), 9 * K)
    cotes = {1: [], -1: []}
    neiges = []
    ys = [yt + y_cime + i * ht for i in range(n + 1)]
    for s in (1, -1):
        cote = cotes[s]
        cote.append((x, yt))
        for i in range(n):
            ya = ys[i] - 0.22 * ht
            yb = ys[i + 1]
            wi = lg * (0.42 + 0.58 * ((i + 1) / n) ** 0.85) * rng.uniform(0.85, 1.12)
            A = (x + s * 0.05 * wi, ya)
            T = (x + s * wi, yb - 0.08 * ht)
            C1 = (x + s * 0.5 * wi, ya + 0.1 * ht)
            Bp = (x + s * 0.28 * wi, yb - 0.3 * ht)
            C2 = (x + s * 0.65 * wi, yb + 0.05 * ht)
            cote.extend(map(tuple, _bezier2(A, C1, T, 10)))
            cote.extend(map(tuple, _bezier2(T, C2, Bp, 8)[1:]))
            if neige and rng.random() < 0.85:
                seg = _bezier2(A, C1, T, 14, rng.uniform(0.08, 0.22), rng.uniform(0.8, 0.98))
                ep = max(1.7 * K, 0.3 * ht) * rng.uniform(0.85, 1.15)
                u = np.linspace(0, 1, len(seg))
                e = ep * np.sin(np.pi * u) ** 0.5 * (0.75 + 0.25 * u)     # plus chargé vers le bout
                hp = seg.copy(); hp[:, 1] -= e * 0.55
                bp = seg.copy(); bp[:, 1] += e * 0.45
                neiges.append(np.concatenate([hp, bp[::-1]]))
        cote.append((x + s * 0.08 * lg, yt + h + 10 * K))
    sil = np.array(cotes[1] + cotes[-1][::-1])
    if neige:
        s = rng.choice((1, -1))
        cw = max(1.0 * K, y_cime * 0.28)
        neiges.append(np.array([(x, yt + 0.3 * K), (x + s * cw, yt + y_cime * 0.95),
                                (x - s * 0.15 * cw, yt + y_cime * 0.8)]))
    return sil, neiges


def _pointe(x, ybase, h, b):
    """Une pointe d'épinette (crêtes boisées de la vallée) : l'apex en haut, deux petits étages, la base sous ybase."""
    return np.array([(x, ybase - h), (x + b * 0.42, ybase - h * 0.5), (x + b * 0.18, ybase - h * 0.52),
                     (x + b, ybase + 0.05 * h), (x - b, ybase + 0.05 * h), (x - b * 0.18, ybase - h * 0.52),
                     (x - b * 0.42, ybase - h * 0.5)])


def _rangee_pointes(ybase, xmin, xmax, x_de, pas, haut, larg, rng, limite=None):
    """Une rangée de pointes d'épinettes posées sur la courbe ybase (tableau indexé par x - x_de)."""
    polys = []
    x = xmin + rng.uniform(0.3, 1.0) * pas[0]
    while x < xmax - 0.5 * pas[0]:
        i = int(round(x - x_de))
        if 0 <= i < len(ybase):
            hh = rng.uniform(*haut)
            if limite is not None:
                hh = min(hh, limite[i])
            if hh > 0.3 * haut[0]:
                polys.append(_pointe(x, ybase[i], hh, rng.uniform(*larg)))
        x += rng.uniform(*pas)
    return polys


# ---------------------------------------------------------------- la retouche

def appliquer(a, K=4, _debug=None):
    a = np.asarray(a)
    H, W = a.shape[:2]
    q = K / 4.0                                       # les rayons en pixels sont donnés pour K = 4
    r0, r1 = int(462 * K), int(768 * K)              # la bande de travail (un peu plus grande que la zone)
    z = a[r0:r1].astype(np.float32)
    h, w = z.shape[:2]
    R, G, B = z[..., 0], z[..., 1], z[..., 2]
    L = z.mean(2)
    yy = np.arange(h, dtype=np.float32)[:, None]     # ligne du tableau de travail
    Y = lambda v: v * K - r0                          # ordonnée 768 -> ligne du tableau de travail
    poly_px = lambda p: [(x * K, Y(y)) for x, y in p]
    rng = random.Random(7)
    # la nuit des arbres : celle de l'image, mesurée sous la rangée (les pixels gardés autour du chalet et des
    # grandes épinettes s'y raccordent sans couture)
    nuit_px = z[int(Y(712)):int(Y(724)), int(100 * K):int(600 * K)].reshape(-1, 3)
    nuit_px = nuit_px[nuit_px.mean(1) < 40]
    NUIT_L = np.median(nuit_px, 0).astype(np.float32) if len(nuit_px) > 100 else NUIT

    # -- ce qui reste tel quel : l'orange et tout ce qui est au-dessus, le premier plan, le chalet
    orange = (R - B > 35) & (R > 50)
    haut = (orange | ((L > 90) & (yy < Y(505)))) & (yy < Y(548))
    yo = np.where(haut.any(0), h - 1 - np.argmax(haut[::-1], 0), -1).astype(np.float32)
    yo = ndi.maximum_filter1d(yo, int(3 * q) * 2 + 1)
    garde_pp = _raster([poly_px(p) for p in PREMIER_PLAN], h, w)
    arbre_pp = ndi.binary_dilation((ndi.gaussian_filter(B, 1.0 * q) < 40) | (L > 110), _disque(2 * q))
    garde = np.maximum(garde_pp * _forme(arbre_pp, 1.0 * q), _raster([poly_px(p) for p in CHALET], h, w))

    # -- la neige du champ : sa limite haute ferme la masse noire
    # (sur toute la hauteur jusqu'au bas de l'image, et par-dessus les fils minces qui la coupent)
    bas = a[int(690 * K):].astype(np.float32).mean(2)
    clair = ndi.gaussian_filter(bas, 1.0 * q) > 150
    p = int(5 * q) + 1
    clair = ndi.binary_closing(np.pad(clair, p, mode='edge'), _disque(4 * q))[p:-p, p:-p]
    lab, n = ndi.label(clair)
    v = lab[int((900 - 690) * K), int(300 * K)]
    champ = (lab == v) if v else np.zeros_like(clair)
    champ = champ[: h - int(Y(690))]
    y_neige = np.where(champ.any(0), np.argmax(champ, 0) + Y(690), h).astype(np.float32)
    a_neige = np.clip(yy - y_neige[None, :] + 0.5, 0, 1)
    # sous 745, on ne peint que ce qui était déjà foncé (la masse noire au pied des grandes épinettes)
    a_neige = np.maximum(a_neige, ((yy > Y(745)) & (L > 100)).astype(np.float32))

    # -- les plans du fond : la nuit partout, le bleu nuit du plan de droite (un bord net, sans brume)
    Bs = ndi.gaussian_filter(B, 1.5 * q)
    c = np.empty_like(z); c[:] = CRETE
    pres_bleu = ndi.binary_dilation(Bs >= 50, _disque(7 * q))
    fond = (Bs >= 30.5) & (yy < Y(615)) & ~pres_bleu
    lab, n = ndi.label(fond)
    if n:
        tailles = ndi.sum(np.ones_like(lab), lab, range(1, n + 1))
        fond = ndi.binary_fill_holes(lab == (1 + int(np.argmax(tailles))))
    # son haut : une ligne de crête douce ; son pied : la lisière d'un bois sombre, en pointes d'épinettes
    fx = np.nonzero(fond.any(0))[0]
    a_fond = np.zeros((h, w), np.float32)
    if len(fx):
        ft = ndi.gaussian_filter1d(np.argmax(fond[:, fx], 0).astype(np.float32), 6 * K, mode='nearest')
        fb = ndi.gaussian_filter1d((h - 1 - np.argmax(fond[::-1, fx], 0)).astype(np.float32), 3 * K, mode='nearest')
        fm = np.zeros_like(fond)
        for j, xx in enumerate(fx):
            if fb[j] - ft[j] > 3 * K:
                fm[int(round(ft[j])):int(round(fb[j] - 1.5 * K)), xx] = True
        a_fond = _forme(fm, 2 * q)
        _poser(c, a_fond, FOND)
        ep_f = np.maximum(fb - ft, 0)
        lisiere = _rangee_pointes(fb, fx[0] + 4 * K, fx[-1], fx[0], (3.0 * K, 4.6 * K), (4.0 * K, 9.0 * K),
                                  (1.8 * K, 2.6 * K), rng, limite=0.4 * ep_f)
        _poser(c, _raster(lisiere, h, w), CRETE)

    # -- les trois taches bleues de l'image : la colline de gauche, celle de droite, la vallée
    blanc = (ndi.gaussian_filter(L, 0.8 * q) > 110) & ~orange
    bleu = (Bs >= 50) & ~orange
    bande = yy >= Y(640)
    colline = np.where(bande, bleu & (L < 110), bleu | blanc)
    colline = ndi.binary_opening(colline, np.ones((3, 3)))
    lab, n = ndi.label(colline)

    def comp(x, y):
        v = lab[int(Y(y)), int(x * K)]
        return lab == v if v else np.zeros_like(colline)

    gauche_brut, droite_brut, vallee_brut = comp(100, 600), comp(600, 630), comp(330, 575)

    def remplir(m, r):
        p = int(r) + 2
        m2 = ndi.binary_closing(np.pad(m, p), _disque(r))[p:-p, p:-p]
        return ndi.binary_fill_holes(m2 | m)

    # les grandes épinettes du premier plan comptent dans la colline le temps de boucher ses trous (une colline
    # ouverte du côté de l'arbre ne se remplit pas)
    pp = (garde_pp > 0.5) & (yy < Y(690))
    gauche_m = remplir(gauche_brut | pp, 12 * q) & ~(pp & ~remplir(gauche_brut, 12 * q) & (_raster(
        [poly_px(PREMIER_PLAN[2])], h, w) > 0.5))
    gauche_m0 = gauche_m.copy()                      # pour les bandes : sans le bas refait à la main
    gauche_m |= (_raster([poly_px(GAUCHE_BAS)], h, w) > 0.5) & (yy < Y(690))
    droite_m = remplir(droite_brut | (pp & (_raster([poly_px(PREMIER_PLAN[2])], h, w) > 0.5)), 12 * q)
    vallee_m = remplir(vallee_brut, 6 * q)

    # le pied de la masse noire : le bas du bleu des collines, colonne par colonne, lissé
    tout_bleu = gauche_brut | droite_brut
    yb = np.where(tout_bleu.any(0), h - 1 - np.argmax(tout_bleu[::-1], 0), np.nan).astype(np.float32)
    ok = ~np.isnan(yb)
    yb = np.interp(np.arange(W), np.nonzero(ok)[0], yb[ok]).astype(np.float32)
    yb = ndi.gaussian_filter1d(ndi.median_filter(yb, int(40 * q) | 1), 12 * q)

    # -- la vallée : un aplat, son haut en pointes d'épinettes, le bois de son pied en épinettes sombres
    vx = np.nonzero(vallee_m.any(0))[0]
    if len(vx):
        vt = np.argmax(vallee_m[:, vx], 0).astype(np.float32)
        vb = (h - 1 - np.argmax(vallee_m[::-1, vx], 0)).astype(np.float32)
        vt_s = ndi.gaussian_filter1d(vt, 4 * K, mode='nearest')
        vb_s = ndi.gaussian_filter1d(vb, 3 * K, mode='nearest')
        vm = np.zeros_like(vallee_m)
        for j, xx in enumerate(vx):
            a0, b0 = int(round(vt_s[j] + 2.0 * K)), int(round(vb_s[j]))
            if b0 > a0:
                vm[a0:b0, xx] = True
        _poser(c, _forme(vm, 2 * q), COLLINE)
        ep = np.maximum(vb_s - vt_s, 0)
        haut_v = _rangee_pointes(vt_s + 2.4 * K, vx[0] + 2 * K, vx[-1] - 2 * K, vx[0], (3.6 * K, 5.4 * K),
                                 (5.0 * K, 9.0 * K), (2.0 * K, 2.8 * K), rng, limite=0.55 * ep + 2 * K)
        _poser(c, _raster(haut_v, h, w), COLLINE)
        bas_v = _rangee_pointes(vb_s + 1.5 * K, vx[0] + 6 * K, vx[-1] - 1 * K, vx[0], (3.0 * K, 4.8 * K),
                                (5.0 * K, 11.0 * K), (2.0 * K, 3.0 * K), rng, limite=0.45 * ep + 1.5 * K)
        _poser(c, _raster(bas_v, h, w), CRETE)

    # -- les deux collines
    a_g = _forme(gauche_m, 2.5 * q)
    a_d = _forme(droite_m, 2.5 * q)
    _poser(c, a_g, COLLINE)
    # le bois sombre entre les deux collines : des épinettes nettes, pied sur le haut de la colline de droite
    bx = np.array([p[0] for p in BOIS_V], float) * K
    by = np.array([Y(p[1]) for p in BOIS_V], float)
    xs_b = np.arange(int(bx[0]), int(bx[-1]))
    yb_b = np.interp(xs_b, bx, by)
    bois = _rangee_pointes(yb_b + 2 * K, xs_b[0] + 1 * K, xs_b[-1], xs_b[0], (3.4 * K, 5.0 * K), (10 * K, 20 * K),
                           (2.6 * K, 3.6 * K), rng)
    bois.append(np.array([(bx[0], by[0] + 1 * K)] + [(bx[i], by[i] + 1 * K) for i in range(len(bx))] +
                         [(bx[-1], by[-1] + 8 * K), (bx[0], by[0] + 8 * K)]))
    a_bois = _raster(bois, h, w)
    a_bois_couvre = a_bois * (1 - a_d)
    _poser(c, a_bois, CRETE)
    _poser(c, a_d, COLLINE)

    # -- les bandes sombres des collines -> des traits de gouge effilés, aux mêmes places
    interdit = _raster([poly_px(TRAINEE), poly_px(RECTANGLE)], h, w) > 0.01
    for m_plein, m_brut, a_c in ((gauche_m0, gauche_brut, a_g), (droite_m, droite_brut, a_d)):
        sombre = m_plein & ~m_brut & ~ndi.binary_dilation(blanc, _disque(2 * q))
        sombre &= yy < (yb[None, :] - 4 * K)
        sombre &= ~interdit & (garde_pp < 0.01)
        sombre = ndi.binary_opening(sombre, _disque(1.5 * q))
        lab_s, ns = ndi.label(sombre)
        polys = []
        for k, sl in enumerate(ndi.find_objects(lab_s)):
            m = lab_s[sl] == k + 1
            if m.sum() < 150 * q * q:
                continue
            dist = ndi.distance_transform_edt(m)
            for ch in _chemins(_squelette(m), int(10 * K)):
                larg = 2 * float(np.median([dist[y, x] for y, x in ch]))
                if len(ch) < 3.5 * larg:          # une tache, pas une bande : elle part avec le flou
                    continue
                pts = np.array([(x + sl[1].start, y + sl[0].start) for y, x in ch], float)
                pts = _reechantillonner(_lisser(_reechantillonner(pts, 2 * q), 5 * q), 3 * q)
                if len(pts) < 4:
                    continue
                # prolongé un peu à chaque bout : la pointe effilée tombe là où la bande finissait
                d0 = pts[0] - pts[1]; d1 = pts[-1] - pts[-2]
                d0 /= max(np.hypot(*d0), 1e-6); d1 /= max(np.hypot(*d1), 1e-6)
                pts = np.vstack([pts[0] + d0 * 3 * K, pts, pts[-1] + d1 * 3 * K])
                nb = 1 if larg < 15 * q else 2
                lt = float(np.clip(larg / nb * 1.05, 5 * q, 13 * q))
                tg = np.gradient(pts, axis=0)
                tg /= np.maximum(np.hypot(tg[:, 0], tg[:, 1]), 1e-6)[:, None]
                nrm = np.stack([-tg[:, 1], tg[:, 0]], 1)
                for j in range(nb):
                    off = (j - (nb - 1) / 2) * (larg / nb + 2 * q)
                    p = pts + nrm * off
                    nn = len(p)
                    c0 = int(nn * rng.uniform(0.0, 0.15)) if nb > 1 else 0
                    c1 = nn - (int(nn * rng.uniform(0.0, 0.15)) if nb > 1 else 0)
                    polys.append(_trait(p[c0:c1], lt))
        if polys:
            _poser(c, _raster(polys, h, w) * a_c, GOUGE)

    # -- les blancs des collines : les grands traits restent (bords repassés), les petits partent
    a_blanc = np.clip((L - 46) / (238 - 46), 0, 1)
    pendants = ndi.binary_opening(blanc & (yy > Y(628)), np.ones((int(18 * q) | 1, 1), bool))
    pendants = ndi.binary_dilation(pendants, _disque(2 * q))
    blanc_c = blanc & (yy < yb[None, :] - 1 * K) & ~pendants
    labw, nw = ndi.label(blanc_c & (garde < 0.5), np.ones((3, 3)))
    grands = np.zeros_like(blanc)
    petits = []
    for k, sl in enumerate(ndi.find_objects(labw)):
        m = labw[sl] == k + 1
        if m.sum() < 20 * q * q:
            continue
        ys_, xs_ = np.nonzero(m)
        ev, evec = np.linalg.eigh(np.cov(np.vstack([xs_, ys_])))
        longueur = 4 * math.sqrt(max(ev[1], 0))
        cx, cy = xs_.mean() + sl[1].start, ys_.mean() + sl[0].start
        a_gauche = gauche_m[int(min(cy, h - 1)), int(min(cx, w - 1))]
        if longueur >= (30 if a_gauche else 95) * K:
            grands[sl] |= m
        else:
            petits.append((cx, cy, longueur))
    a_gr = _net(ndi.gaussian_filter(a_blanc * ndi.binary_dilation(grands, _disque(3 * q)), 0.9 * q), 1.2)
    _poser(c, a_gr * np.maximum(a_g, a_d), BLANC)

    # -- les petits traits de la colline de droite -> des groupes de traits parallèles qui suivent la pente
    sq_gr = _squelette(grands & droite_m)
    gy, gx = np.nonzero(sq_gr)
    libre = ndi.binary_erosion(droite_m, _disque(6 * q)) & ~ndi.binary_dilation(grands, _disque(10 * q))
    libre &= yy < (yb[None, :] - 10 * K)
    libre &= ~interdit & (garde < 0.01)
    polys = []
    if len(gx):
        tang = _tangentes(gy, gx, 12 * q)
        for cx, cy, lg in petits:
            if lg < 8 * K or not droite_m[int(min(cy, h - 1)), int(cx)]:
                continue
            dd = (gx - cx) ** 2 + (gy - cy) ** 2
            near = np.argsort(dd)[:60]
            wgt = 1 / (np.sqrt(dd[near]) + 20)
            t = (tang[near] * wgt[:, None]).sum(0)
            t /= max(np.hypot(*t), 1e-6)
            nrm = np.array([-t[1], t[0]])
            nb = 3 if lg > 30 * K else 2
            long_t = float(np.clip(lg * 0.7, 20 * K, 40 * K))
            for j in range(nb):
                off = (j - (nb - 1) / 2) * 4.2 * K
                dec = (j - (nb - 1) / 2) * 0.12 * long_t + rng.uniform(-0.08, 0.08) * long_t
                lj = long_t * rng.uniform(0.75, 1.0)
                c0 = np.array([cx, cy]) + nrm * off + t * dec
                s = np.linspace(-lj / 2, lj / 2, 48)
                ligne = c0[None, :] + s[:, None] * t[None, :]
                okl = np.array([0 <= int(py) < h and 0 <= int(px) < w and libre[int(py), int(px)] for px, py in ligne])
                run = _plus_longue_suite(okl)
                if run is None or (run[1] - run[0]) < 20:
                    continue
                polys.append(_trait(_reechantillonner(ligne[run[0]:run[1]], 3 * q), rng.uniform(6.0, 7.0) * q))
    if polys:
        _poser(c, _raster(polys, h, w), BLANC)

    # -- la ligne d'arbres : les pointes sont le haut de chaque trait blanc pendant. Une ouverture par un segment
    # vertical garde les traits pendants et retire les lignes de contour (presque horizontales) qui les touchent.
    tb = blanc & (yy > Y(628)) & (yy < Y(728)) & (garde < 0.5)
    tb = ndi.binary_opening(tb, np.ones((int(18 * q) | 1, 1), bool))
    lab_t, nt = ndi.label(tb, np.ones((3, 3)))
    pointes = []
    for k, sl in enumerate(ndi.find_objects(lab_t)):
        m = lab_t[sl] == k + 1
        if m.sum() < 60 * q * q:
            continue
        ys_, xs_ = np.nonzero(m)
        haut_c = np.where(m.any(0), np.argmax(m, 0), 10 ** 6).astype(float)
        mini = ndi.minimum_filter1d(haut_c, int(4 * K) * 2 + 1, mode='nearest')
        cand = sorted([i for i in range(m.shape[1]) if haut_c[i] < 10 ** 6 and haut_c[i] == mini[i]],
                      key=lambda i: haut_c[i])
        pris = []
        for i in cand:
            if all(abs(i - p) > 4 * K for p in pris):
                pris.append(i)
        for i in pris:
            yt = haut_c[i] + sl[0].start
            pointes.append((i + sl[1].start, float(yt), float(ys_.max() + sl[0].start - yt)))
    pointes.sort()
    # les gouttes détachées sous les traits ne sont pas des pointes : on garde ce qui est près du haut de la rangée
    if pointes:
        px_ = np.array([p[0] for p in pointes]); py_ = np.array([p[1] for p in pointes])
        env = np.array([py_[np.abs(px_ - x) < 22 * K].min() for x in px_])
        pointes = [p for p, e in zip(pointes, env) if p[1] < e + 9 * K]
    filtre = []
    for p in pointes:
        if filtre and p[0] - filtre[-1][0] < 3.0 * K:
            if p[1] < filtre[-1][1]:
                filtre[-1] = p
            continue
        filtre.append(p)

    rng = random.Random(11)
    arbres = []
    for x, yt, lg in filtre:
        hh = float(np.clip(lg + 10 * K, 24 * K, 56 * K)) * rng.uniform(0.95, 1.08)
        arbres.append([x + rng.uniform(-1, 1) * q, yt - rng.uniform(1.0, 3.5) * K, hh])
    # des épinettes de remplissage dans les trous de la rangée (les arbres sont serrés)
    if arbres:
        arbres.sort()
        ajout = []
        for (x0_, y0_, h0_), (x1_, y1_, h1_) in zip(arbres[:-1], arbres[1:]):
            trou = x1_ - x0_
            nb = int(trou // (7.5 * K))
            for j in range(nb):
                f = (j + 1) / (nb + 1) + rng.uniform(-0.08, 0.08)
                xf = x0_ + f * trou
                if garde_pp[int(Y(700)), int(np.clip(xf, 0, W - 1))] > 0.5:
                    continue
                ajout.append([xf, y0_ + f * (y1_ - y0_) + rng.uniform(0.5, 4.0) * K,
                              min(h0_, h1_) * rng.uniform(0.7, 0.95)])
        arbres += ajout
    for t in arbres:
        t[2] = min(t[2], y_neige[int(np.clip(t[0], 0, W - 1))] - 5 * K - t[1])
    arbres = [t for t in arbres if t[2] >= 12 * K]

    # le pied de la masse noire : entre 3 et 7 unités sous les pointes, comme le noir de l'image
    if arbres:
        xa = np.array([t[0] for t in arbres]); ya = np.array([t[1] for t in arbres])
        o = np.argsort(xa)
        y_pointes = ndi.gaussian_filter1d(np.interp(np.arange(W), xa[o], ya[o]), 6 * K).astype(np.float32)
        y_masse = np.clip(yb, y_pointes + 3 * K, y_pointes + 7 * K)
    else:
        y_masse = yb
    y_masse = ndi.gaussian_filter1d(y_masse, 4 * K)
    # aucun bout de la masse noire sans épinettes : dans un trou de la rangée (aux deux bouts surtout), on en ajoute
    # dont la pointe dépasse le haut de la masse
    xs_arbres = np.array(sorted(t[0] for t in arbres)) if arbres else np.array([-1e9])
    x = 0.0
    while x < W:
        i = int(x)
        libre_x = np.min(np.abs(xs_arbres - x)) > 5.5 * K
        ym = int(np.clip(y_masse[i], 0, h - 1))
        visible = garde_pp[ym, i] < 0.5 and y_masse[i] < y_neige[i] - 3 * K
        if libre_x and visible:
            hh = rng.uniform(22, 34) * K
            yt = y_masse[i] - rng.uniform(4, 9) * K
            hh = min(hh, y_neige[i] - 5 * K - yt)
            if hh >= 12 * K:
                arbres.append([x, yt, hh])
                xs_arbres = np.append(xs_arbres, x)
                x += rng.uniform(4.5, 6.5) * K
                continue
        x += 1 * K
    # les collines descendent jusqu'au pied de la masse (pas de trou sombre entre le bleu et les arbres)
    for a_c, m_c in ((a_g, gauche_m), (a_d, droite_m)):
        has = m_c[int(Y(600)):].any(0)
        bas_c = np.where(has, h - 1 - np.argmax(m_c[::-1], 0), -1)
        prol = (yy > bas_c[None, :] - 2 * K) & (yy < y_masse[None, :] + 3 * K) & has[None, :] & (yy > Y(600))
        _poser(c, _forme(prol, 1.5 * q) * (1 - a_bois_couvre), COLLINE)
    a_masse = np.clip(yy - y_masse[None, :] + 0.5, 0, 1)
    _poser(c, a_masse, NUIT_L)
    arbres.sort(key=lambda t: -t[2])
    for x, yt, hh in arbres:
        sil, neiges = _epinette(x, yt, hh, rng, K)
        r = _raster_local([sil], h, w)
        if r is not None:
            al, y0_, x0_ = r
            _poser(c, al, NUIT_L, y0_, x0_)
        r = _raster_local(neiges, h, w)
        if r is not None:
            al, y0_, x0_ = r
            _poser(c, al, BLANC, y0_, x0_)

    # -- la zone : sous l'orange, hors du premier plan et du chalet, au-dessus de la neige du champ
    zone = np.clip((yy - (yo[None, :] + 2 * q)) / (2 * q), 0, 1) * (yy >= Y(470)) * (yy < Y(760))
    zone = zone * (1 - garde) * (1 - a_neige)
    if _debug is not None:
        _debug.update(c=c, zone=zone, garde=garde, droite_m=droite_m, gauche_m=gauche_m, y_masse=y_masse,
                      arbres=arbres, r0=r0)
    out = a.copy()
    sl = out[r0:r1].astype(np.float32)
    sl = sl * (1 - zone[..., None]) + c * zone[..., None]
    out[r0:r1] = np.clip(np.round(sl), 0, 255).astype(np.uint8)
    return out
