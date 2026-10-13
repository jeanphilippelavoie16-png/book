"""Bibliothèque de modèles calqués pour les planches : chaque main (ou tête, ou corps) d'une
planche de référence devient un fichier images/modeles/<id>.svg avec deux chemins, en pixels de
l'image d'origine :

  silhouette  la forme pleine, en blanc dans la planche : elle cache ce qui passe derrière
  encre       le trait du dessinateur, en #1A1A1A

  python3 modeles.py kibbitzer|gestes|shoo|poses|tous   écrit les modèles (et une planche-contact numérotée) ;
                                                  poses : les poses construites de poses.json

formes.modele() (planches/scripts/formes.js) les pose dans une planche : point d'ancrage, angle,
échelle, miroir, et des rectangles à effacer (le bâton d'origine quand la planche a le sien)."""
import os, sys, json, pickle
import numpy as np
from scipy import ndimage as ndi
from skimage.morphology import disk
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from vectoriser import gris, calque_tons, calque_encre_ombre, blanchir, chemin, morceaux, isoler, nettoyer, svg

IMG = os.environ.get('NOTICE_IMAGES', '/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/images')
TMP = os.environ.get('NOTICE_TMP', '/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/scratchpad')
OUT = '/home/user/book/images/modeles'
K = 6

# Fermetures de silhouette : un poignet laissé ouvert (deux traits qui s'arrêtent) ne se remplit pas
# tout seul ; on lui donne un segment, invisible, qui ne sert qu'au blanc. En pixels du modèle.
import glob as _glob
FERMER = {}
for _f in sorted(_glob.glob(os.path.join(OUT, 'fermetures*.json'))):
    FERMER.update(json.load(open(_f)))


def trace_segment(m, k, a, b, ep=1.2):
    """Ajoute au masque m (échelle k) un segment de a à b (pixels du modèle)."""
    n = int(np.hypot(b[0] - a[0], b[1] - a[1]) * k * 2) + 2
    xs = np.linspace(a[0] * k, b[0] * k, n).astype(int); ys = np.linspace(a[1] * k, b[1] * k, n).astype(int)
    ok = (xs >= 0) & (ys >= 0) & (xs < m.shape[1]) & (ys < m.shape[0])
    t = np.zeros_like(m); t[ys[ok], xs[ok]] = True
    return m | ndi.binary_dilation(t, structure=disk(max(1, int(ep * k))))


def amincir(m, k, facteur=0.72, min_px=0.5):
    """Ramène l'épaisseur de chaque trait à facteur fois la sienne (au moins min_px pixels du
    modèle) : le gras relatif des traits reste, le noir du livre ne pèse pas plus que l'original."""
    from skimage.morphology import skeletonize
    if facteur >= 1 or not m.any():
        return m
    dt = ndi.distance_transform_edt(m)
    sq = skeletonize(m)
    d_sq, (iy, ix) = ndi.distance_transform_edt(~sq, return_indices=True)
    demi = dt[iy, ix]                                  # demi-épaisseur du trait le plus proche
    return m & (d_sq <= np.maximum(min_px * k / 2, facteur * demi))


def trait_px(m, k):
    """L'épaisseur du contour (les traits les plus gras : 90e centile), en pixels du modèle."""
    from skimage.morphology import skeletonize
    if not m.any():
        return 1.0
    dt = ndi.distance_transform_edt(m)
    sq = skeletonize(m)
    w = 2 * dt[sq] / k
    return float(np.percentile(w, 90)) if w.size else 1.0


def silhouette(encre, ombre, k, fermetures=()):
    s = encre | ombre
    for a, b in fermetures:
        s = trace_segment(s, k, a, b)
    s = ndi.binary_closing(s, structure=disk(int(1.2 * k)))
    s = ndi.binary_fill_holes(s)
    return nettoyer(s, k, 30)


def ecrire(ident, encre, ombre, k, boite, source, poids=1.0, sil=None):
    x0, y0, x1, y1 = boite[:4]
    if sil is None:
        sil = silhouette(encre, ombre, k, FERMER.get(ident.split('@')[0], []))
    encre = amincir(encre, k, poids)
    d_sil, d_enc = chemin(sil, k, alphamax=1.2), chemin(encre, k)
    tr = trait_px(encre, k)
    l, h = x1 - x0, y1 - y0
    open(os.path.join(OUT, ident + '.svg'), 'w').write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {l} {h}" width="{l}" height="{h}" '
        f'data-source="{source}" data-boite="{x0} {y0} {x1} {y1}" data-trait="{tr:.2f}">\n'
        f'<path id="silhouette" fill="#FFFFFF" fill-rule="evenodd" d="{d_sil}"/>\n'
        f'<path id="encre" fill="#1A1A1A" fill-rule="evenodd" d="{d_enc}"/>\n</svg>\n')
    return l, h, d_sil, d_enc


# Chaque modèle s'écrit à plusieurs poids de trait (id, id@50, id@35…) : formes.modele() prend
# celui dont le contour, à l'échelle de la planche, tombe le plus près du trait voulu (1,3).
POIDS = {'k': [0.72, 0.5, 0.35, 0.25], 'g': [1.0, 0.7, 0.5], 's': [1.0, 0.75, 0.55, 0.4], 'h': [1.0, 0.75, 0.55, 0.4], 'c': [1.0, 0.75, 0.55]}


def serie(prefixe, masques, k, source, colle=3.0, poids=1.0):
    boites, lab = morceaux(masques, k, colle=colle)
    fiches = []
    for i, b in enumerate(boites, 1):
        ident = f'{prefixe}{i:02d}'
        enc, om = (isoler(masques, lab, b[4], b, k) + [np.zeros(1, bool)])[:2] if len(masques) > 1 else (isoler(masques, lab, b[4], b, k)[0], None)
        if om is None or om.shape != enc.shape:
            om = np.zeros_like(enc)
        sil = silhouette(enc, om, k, FERMER.get(ident, []))
        poids_l = POIDS.get(prefixe, [poids])
        l, h, ds, de = ecrire(ident, enc, om, k, b, source, poids_l[0], sil)
        fiches.append((ident, b[:4], l, h, ds, de))
        for p2 in poids_l[1:]:
            ecrire(f'{ident}@{round(p2 * 100)}', enc, om, k, b, source, p2, sil)
        print(ident, b[:4])
    return fiches


def contact(nom, fiches, larg=1400, col=6):
    """Planche-contact : chaque modèle dans sa case, son numéro dessous."""
    case = larg / col
    lignes = (len(fiches) + col - 1) // col
    H = lignes * (case + 24) + 20
    els = [f'<rect width="{larg}" height="{H:.0f}" fill="#FFFFFF"/>']
    for n, (ident, b, l, h, ds, de) in enumerate(fiches):
        cx, cy = (n % col) * case, (n // col) * (case + 24) + 10
        s = min((case - 20) / l, (case - 20) / h)
        tx, ty = cx + (case - l * s) / 2, cy + (case - h * s) / 2
        els.append(f'<g transform="translate({tx:.1f},{ty:.1f}) scale({s:.3f})"><path fill="#E8E8E8" d="{ds}"/><path fill="#1A1A1A" d="{de}"/></g>')
        els.append(f'<text x="{cx + case / 2:.0f}" y="{cy + case + 14:.0f}" font-family="Georgia" font-size="16" text-anchor="middle" fill="#1A1A1A">{ident}</text>')
    f = os.path.join(TMP, nom)
    open(f + '.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {larg} {H:.0f}" width="{larg}" height="{H:.0f}">' + ''.join(els) + '</svg>')
    import subprocess
    subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', f + '.svg', f + '.png'], capture_output=True)
    return f + '.png'


def kibbitzer():
    pk = os.path.join(TMP, 'mains4-masques.pkl')
    if os.path.exists(pk):
        encre, om = pickle.load(open(pk, 'rb'))
    else:
        src = blanchir(f'{IMG}/4.png', [(0, 0, 544, 15), (0, 748, 130, 778), (510, 690, 544, 778), (145, 616, 416, 642)],
                       os.path.join(TMP, 'mains4-propre.png'))
        encre, om = calque_encre_ombre(src, K)
        pickle.dump((encre, om), open(pk, 'wb'))
    return serie('k', [encre, om], K, '4.png (Kibbitzer)')


def gestes():
    pk = os.path.join(TMP, 'mains1-tons.pkl')
    if os.path.exists(pk):
        encre = pickle.load(open(pk, 'rb'))
    else:
        NIV = [(100, '#454545'), (135, '#616161'), (170, '#808080'), (215, '#ABABAB')]
        cs = calque_tons(gris(f'{IMG}/1.png', None, K, sigma=0.2), K, NIV, cmax=215.0, rayon=1.6, miette=0.6, frac=0.36)
        encre = np.zeros_like(cs[0][0])
        for m, _ in cs:
            encre |= m
        pickle.dump(encre, open(pk, 'wb'))
    return serie('g', [encre], K, '1.png (gestes)', colle=2.0)


def shoo():
    """La planche de mains de shoo_arts (iStock, 5.jpg), la plus propre : trait égal et fin. La
    bande du filigrane est ramenée au blanc avant le calque (vectoriser.sous_bande)."""
    from vectoriser import sous_bande
    pk = os.path.join(TMP, 'mains5-tons.pkl')
    if os.path.exists(pk):
        encre = pickle.load(open(pk, 'rb'))
    else:
        src = sous_bande(f'{IMG}/5.jpg', (586, 641, 1001, 725), os.path.join(TMP, 'mains5-propre.png'), masques=[(0, 990, 120, 1024)])
        NIV = [(110, '#2E2E2E'), (165, '#6E6E6E'), (205, '#9C9C9C')]
        cs = calque_tons(gris(src, None, 4, sigma=0.45), 4, NIV, cmax=205.0, rayon=2.0, miette=3.0)
        encre = np.zeros_like(cs[0][0])
        for m, _ in cs:
            encre |= m
        pickle.dump(encre, open(pk, 'wb'))
    return serie('s', [encre], 4, '5.jpg (shoo_arts, iStock)', colle=3.0)


# ─── poses construites : un modèle articulé ──────────────────────────────────────────────
# Une pose qui manque se construit à partir d'un modèle qu'on a : on efface ce qui ne va plus (les
# plis d'une paume qu'on ne voit plus), on coupe une partie (le pouce, un doigt) et on la plie
# autour de son articulation, puis elle se recolle par-dessus le reste. images/modeles/poses.json :
#   "s10-plat": { "source": "s10", "effacer": [[x0, y0, x1, y1]],
#                 "parties": [{ "poly": [[x, y], …], "pivot": [x, y], "angle": -28, "rayon": 15 }] }
# angle en degrés (sens horaire à l'écran) ; la rotation monte de 0 au pivot à angle à rayon px :
# l'articulation plie au lieu de casser.
# Deux options de plus (bibliothèque B, 13 oct.) :
#   "couper": [[[x, y], …]]   des polygones ôtés de l'encre ET du blanc (un doigt qu'on retire en entier,
#                             pas seulement ses plis : effacer ne touche que l'encre) ;
#   "greffe": [{ "source": "s17", "poly": [[x, y], …], "pivot": [x, y], "angle": 12, "decalage": [dx, dy] }]
#                             un morceau d'une autre main (ou de la même) recollé par-dessus : le poly et le
#                             pivot sont en pixels de SA source (pivot absent : le centre du poly), le morceau
#                             tourne d'angle autour du pivot puis glisse de decalage, en pixels de la pose.
#                             Comme une partie pliée, il passe devant et son blanc cache ce qui est dessous.
# Une fermeture de poignet propre à la pose se met sous l'id de la pose dans un fermetures*.json.
# Deux options d'une partie (bibliothèque A, 13 oct.), en pixels de la source comme son poly :
#   "charniere": [[x, y], [x, y]]  le segment des jointures : la partie y reste soudée sur toute sa
#                             longueur et la rotation monte avec la distance à ce segment (sur rayon px) ;
#                             sert à plier un bloc large (les quatre doigts) sans fendre la main ;
#   "garder": [[[x, y], …]]   l'encre de ces polygones part avec la partie ET reste en place : le trait
#                             commun à deux morceaux qu'on écarte (le dessous de l'index, le dessus du pouce).
#   "decaler": [[x, dy], …]   au lieu de plier : la partie glisse verticalement de dy(x) (interpolé entre
#                             les stations, en px de la source) ; pivot, angle et rayon sont ignorés ;
#                             avec "axe": "x", les stations sont [[y, dx], …] et la partie glisse de côté.
# Option de la pose (bibliothèque B) : "effacer_apres": [[x0, y0, x1, y1]]  comme effacer, mais après les parties et les
#                             greffes, en px de la pose (marge comprise) : l'amorce d'un trait voisin venue avec une greffe.
# Option de la pose (bibliothèque B) : "cadre": [x0, y0, x1, y1]  recadre le modèle écrit (px de la pose, après
#                             la marge) ; ses coordonnées partent alors de (x0, y0).
# Option de la pose (bibliothèque B) : "lisser": px  un flou léger de l'encre avant le calque, contre les
#                             marches d'escalier qu'une partie tournée laisse sur son trait (0,3 suffit).
# Et deux options de la pose : "polir": [[x0, y0, x1, y1, r], …] lisse le bord du trait dans ces rectangles
#                             (ôte les crans et les bouts plus minces que 2 r, bouche les encoches) ;
#                             "rogner": px  rogne le blanc qui dépasse du trait (la frange qu'une partie
#                             écartée laisse le long du trait gardé) ; le blanc enfermé par le trait reste.
SOURCES = {'s': ('mains5-tons.pkl', 4, 3.0), 'g': ('mains1-tons.pkl', 6, 2.0), 'k': ('mains4-masques.pkl', 6, 3.0),
           'h': ('homme7-encre.pkl', 4, 6.0), 'c': ('corps6-encre.pkl', 8, 2.0)}


def masques_modele(ident):
    """(encre, ombre, silhouette, k, boîte) d'un modèle de la bibliothèque, à l'échelle de son calque."""
    pk, k, colle = SOURCES[ident[0]]
    data = pickle.load(open(os.path.join(TMP, pk), 'rb'))
    masques = list(data) if isinstance(data, tuple) else [data]
    boites, lab = morceaux(masques, k, colle=colle)
    b = boites[int(ident[1:3]) - 1]
    ms = isoler(masques, lab, b[4], b, k)
    enc = ms[0]
    om = ms[1] if len(ms) > 1 else np.zeros_like(enc)
    return enc, om, silhouette(enc, om, k, FERMER.get(ident, [])), k, b


def retour(yy, xx, k, pivot, angle, rayon, charniere=None):
    """Pour chaque pixel d'arrivée (yy, xx), le pixel de départ du pli autour de pivot (inverse exact
    du pli : la rotation ne dépend que de la distance au pivot, que la rotation garde)."""
    cy, cx = pivot[1] * k, pivot[0] * k
    r, phi = np.hypot(xx - cx, yy - cy), np.arctan2(yy - cy, xx - cx)
    if charniere:                                  # distance au segment des jointures
        (ax, ay), (bx, by) = [(q[0] * k, q[1] * k) for q in charniere]
        vx, vy = bx - ax, by - ay
        u = np.clip(((xx - ax) * vx + (yy - ay) * vy) / (vx * vx + vy * vy), 0, 1)
        t = np.clip(np.hypot(xx - ax - u * vx, yy - ay - u * vy) / (rayon * k), 0, 1)
    else:
        t = np.clip(r / (rayon * k), 0, 1)
    th = np.deg2rad(angle) * t * t * (3 - 2 * t)
    return cy + r * np.sin(phi - th), cx + r * np.cos(phi - th)


def zone_poly(m, k, poly):
    from skimage.draw import polygon as remplir
    zone = np.zeros_like(m)
    rr, cc = remplir(np.array([q[1] for q in poly]) * k, np.array([q[0] for q in poly]) * k, m.shape)
    zone[rr, cc] = True
    return zone


def plier(m, k, poly, pivot, angle, rayon, charniere=None, chaine=(), zone=None):
    """(la partie de m dans poly, pliée autour de pivot ; le reste de m). charniere [[x, y], [x, y]] :
    la rotation monte avec la distance à ce segment (la ligne des jointures) au lieu de la distance au
    pivot ; la partie reste soudée tout le long du segment, pas seulement au pivot.
    chaine [(pivot, angle, rayon, charniere), …] : les plis des parties parentes, du parent direct au
    tronc ; la partie est pliée sur elle-même PUIS emportée par eux, en un seul tirage depuis la source
    (rien ne se perd hors du cadre entre deux plis). zone : le masque de la partie, s'il est déjà fait."""
    if zone is None:
        zone = zone_poly(m, k, poly)
    partie, reste = m & zone, m & ~zone
    H, W = m.shape
    yy, xx = np.mgrid[:H, :W].astype(float)
    for pv, a, rr_, ch in reversed(list(chaine)):  # l'arrivée, ramenée par le tronc, puis par le bras…
        yy, xx = retour(yy, xx, k, pv, a, rr_, ch)
    sy, sx = retour(yy, xx, k, pivot, angle, rayon, charniere)   # …puis par la partie elle-même
    src = ndi.map_coordinates(partie.astype(float), [sy, sx], order=1) > 0.5
    return src, reste


def decaler(m, k, poly, stations, M=0, axe='y'):
    """(la partie de m dans poly glissée verticalement de dy(x) ; le reste de m). stations [[x, dy], …]
    en pixels de la source, dy interpolé entre elles (constant au-delà) : ramène un renflement sur une
    ligne (le gras du pouce sur la ligne doigts-poignet) sans fendre la main."""
    from skimage.draw import polygon as remplir
    zone = np.zeros_like(m)
    rr, cc = remplir(np.array([q[1] for q in poly]) * k, np.array([q[0] for q in poly]) * k, m.shape)
    zone[rr, cc] = True
    partie, reste = m & zone, m & ~zone
    H, W = m.shape
    xs = np.array([q[0] + M for q in stations]) * k; ds = np.array([q[1] for q in stations]) * k
    n = W if axe == 'y' else H
    d = ndi.gaussian_filter1d(np.interp(np.arange(n, dtype=float), xs, ds), 2 * k, mode='nearest')   # sans coude
    yy, xx = np.mgrid[:H, :W].astype(float)
    if axe == 'x':                                 # glisser de côté : dx(y)
        return ndi.map_coordinates(partie.astype(float), [yy, xx - d[:, None]], order=1) > 0.5, reste
    return ndi.map_coordinates(partie.astype(float), [yy - d[None, :], xx], order=1) > 0.5, reste


def articuler(ident, spec):
    enc, om, sil, k, b = masques_modele(spec['source'])
    if ident in FERMER:                            # la fermeture propre à la pose (en pixels de la source)
        sil = silhouette(enc, om, k, FERMER.get(spec['source'], []) + FERMER[ident])
    M = spec.get('marge', 0)                       # place autour du modèle pour un bras qui s'écarte (px) ;
    if M:                                          # les coordonnées du nouveau modèle sont décalées de M
        pad = lambda m: np.pad(m, int(M * k))
        enc, om, sil = pad(enc), pad(om), pad(sil)
        b = (b[0] - M, b[1] - M, b[2] + M, b[3] + M) + tuple(b[4:])
        dec = lambda q: [q[0] + M, q[1] + M]
        spec = {**spec, 'effacer': [[x0 + M, y0 + M, x1 + M, y1 + M] for x0, y0, x1, y1 in spec.get('effacer', [])],
                'parties': [{**pt, 'poly': [dec(q) for q in pt['poly']], 'pivot': dec(pt['pivot'])} for pt in spec.get('parties', [])]}
    for x0, y0, x1, y1 in spec.get('effacer', []):
        enc[int(y0 * k):int(y1 * k), int(x0 * k):int(x1 * k)] = False
    from skimage.draw import polygon as remplir
    for poly in spec.get('couper', []):
        q = [[x + M, y + M] for x, y in poly]
        rr, cc = remplir(np.array([y for x, y in q]) * k, np.array([x for x, y in q]) * k, enc.shape)
        enc[rr, cc] = False; sil[rr, cc] = False; om[rr, cc] = False
    # Les parties qui en suivent une autre ("suit": index du parent) : l'avant-bras suit le bras. Leur
    # poly, leur pivot, leur charnière se donnent sur la SOURCE, comme ceux du parent. Le parent part sans
    # elles ; chacune est mise de côté telle qu'à la source, puis tirée d'un coup par son pli et ceux de
    # ses parents (avant le 13 oct., l'avant-bras se pliait sur le bras déjà tourné : ce qui sortait du
    # cadre au premier pli — la main d'un bras levé — était perdu).
    P = spec.get('parties', [])
    enfants = {i: [j for j, q in enumerate(P) if q.get('suit') == i] for i in range(len(P))}
    def descendants(i):
        out = []
        for j in enfants[i]:
            out += [j] + descendants(j)
        return out
    zones = [zone_poly(enc, k, pt['poly']) for pt in P]
    propre = [zones[i] & ~np.any([zones[j] for j in descendants(i)] or [np.zeros_like(enc)], axis=0) for i in range(len(P))]
    mis_de_cote = {}                               # index → (encre, silhouette) de la partie, à la source
    def chaine(i):
        out, j = [], P[i].get('suit')
        while j is not None:
            q = P[j]
            out.append((q['pivot'], q['angle'], q['rayon'], [[c[0] + M, c[1] + M] for c in q['charniere']] if q.get('charniere') else None))
            j = q.get('suit')
        return out
    for i, pt in enumerate(P):
        poly, pv = pt['poly'], pt['pivot']
        for j in descendants(i):                   # les enfants partent avec la source, avant que rien ne bouge
            if j not in mis_de_cote:
                mis_de_cote[j] = (enc & propre[j], sil & propre[j])
                enc, sil = enc & ~propre[j], sil & ~propre[j]
        ch = [[q[0] + M, q[1] + M] for q in pt['charniere']] if pt.get('charniere') else None
        garde = np.zeros_like(enc)                 # "garder" : l'encre de ces polygones part avec la partie
        for gp in pt.get('garder', []):            # ET reste en place (le trait commun au pouce et à l'index)
            rr, cc = remplir(np.array([y + M for x, y in gp]) * k, np.array([x + M for x, y in gp]) * k, enc.shape)
            garde[rr, cc] = True
        garde &= enc
        if pt.get('decaler'):                      # glisser la partie d'une hauteur qui varie le long de x
            ax = pt.get('axe', 'y')
            p_enc, r_enc = decaler(enc, k, poly, pt['decaler'], M, ax)
            p_sil, r_sil = decaler(sil, k, poly, pt['decaler'], M, ax)
        elif i in mis_de_cote:                     # une partie qui suit : tirée de sa source mise de côté
            e0, s0 = mis_de_cote[i]
            tout = np.ones_like(enc)
            p_enc, _ = plier(e0, k, poly, pv, pt['angle'], pt['rayon'], ch, chaine(i), tout)
            p_sil, _ = plier(s0, k, poly, pv, pt['angle'], pt['rayon'], ch, chaine(i), tout)
            r_enc, r_sil = enc, sil
        else:
            p_enc, r_enc = plier(enc, k, poly, pv, pt['angle'], pt['rayon'], ch, (), propre[i])
            p_sil, r_sil = plier(sil, k, poly, pv, pt['angle'], pt['rayon'], ch, (), propre[i])
        dedans = ndi.binary_erosion(p_sil, structure=disk(max(1, int(0.8 * k))))
        enc = (r_enc & ~dedans) | p_enc | garde    # la partie passe devant : son blanc cache le reste
        sil = r_sil | p_sil
    for g in spec.get('greffe', []):
        g_enc, _, g_sil, kg, _ = masques_modele(g['source'])
        poly = g['poly']
        cx_s, cy_s = g.get('pivot', [float(np.mean([q[0] for q in poly])), float(np.mean([q[1] for q in poly]))])
        zone = np.zeros_like(g_enc)
        rr, cc = remplir(np.array([q[1] for q in poly]) * kg, np.array([q[0] for q in poly]) * kg, g_enc.shape)
        zone[rr, cc] = True
        th = np.deg2rad(g.get('angle', 0)); dx, dy = g.get('decalage', [0, 0])
        H, W = enc.shape
        yy, xx = np.mgrid[:H, :W].astype(float)
        u, v = xx / k - (cx_s + dx + M), yy / k - (cy_s + dy + M)          # pose → source, à l'envers
        sx = cx_s + u * np.cos(th) + v * np.sin(th); sy = cy_s - u * np.sin(th) + v * np.cos(th)
        tirer = lambda m: ndi.map_coordinates((m & zone).astype(float), [sy * kg, sx * kg], order=1) > 0.5
        p_enc, p_sil = tirer(g_enc), tirer(g_sil)
        dedans = ndi.binary_erosion(p_sil, structure=disk(max(1, int(0.8 * k))))
        enc = (enc & ~dedans) | p_enc
        sil = sil | p_sil
    for x0, y0, x1, y1 in spec.get('effacer_apres', []):   # après les greffes (px de la pose, marge comprise)
        enc[int(y0 * k):int(y1 * k), int(x0 * k):int(x1 * k)] = False
    if spec.get('lisser'):                         # "lisser": px — le trait d'une partie tournée sort en marches
        s_ = spec['lisser'] * k                    # d'escalier (rééchantillonnage) que potrace suit en bosses :
        enc = ndi.gaussian_filter(enc.astype(float), s_) > 0.5   # un flou léger puis le seuil les efface
    for x0, y0, x1, y1, r_ in spec.get('polir', []):   # "polir": le bord du trait lissé dans un rectangle :
        sl = (slice(int((y0 + M) * k), int((y1 + M) * k)), slice(int((x0 + M) * k), int((x1 + M) * k)))
        dq = disk(max(1, int(r_ * k)))                  # ouverture (ôte les crans qui dépassent),
        z = np.pad(enc[sl], int(2 * r_ * k) + 2, mode='edge')   # puis fermeture (bouche les encoches)
        z = ndi.binary_closing(ndi.binary_opening(z, structure=dq), structure=dq)
        q_ = int(2 * r_ * k) + 2
        enc[sl] = z[q_:-q_, q_:-q_]
    enc = nettoyer(enc, k, 1.0)
    if spec.get('rogner'):                         # "rogner": px — le blanc qui dépasse du trait (une frange
        r_ = max(1, int(spec['rogner'] * k))       # laissée par une partie écartée) est rogné : le blanc
        sil = ndi.binary_erosion(sil, structure=disk(r_)) | ndi.binary_fill_holes(enc)   # s'arrête au trait
    sil = ndi.binary_fill_holes(ndi.binary_closing(sil | enc, structure=disk(max(1, int(1.0 * k)))))   # pas de jour dans le blanc
    if spec.get('cadre'):                          # "cadre": [x0, y0, x1, y1] en px de la pose : recadre le modèle
        x0, y0, x1, y1 = spec['cadre']             # (une main prise seule dans une planche de deux) ; les
        sl = (slice(int(y0 * k), int(y1 * k)), slice(int(x0 * k), int(x1 * k)))   # coordonnées du modèle
        enc, om, sil = enc[sl], om[sl], sil[sl]    # partent alors de (x0, y0)
        b = (b[0] + x0, b[1] + y0, b[0] + x1, b[1] + y1) + tuple(b[4:])
    poids_l = POIDS.get(ident[0]) or POIDS.get(spec['source'][0], [1.0])   # b… : les poids de sa source
    src = f"pose construite sur {spec['source']}"
    ecrire(ident, enc, om, k, b, src, poids_l[0], sil)
    for p2 in poids_l[1:]:
        ecrire(f'{ident}@{round(p2 * 100)}', enc, om, k, b, src, p2, sil)
    print(ident, 'construit sur', spec['source'])


def poses(seuls=()):
    """Les poses de tous les images/modeles/poses*.json ; seuls : ne construire que ces ids."""
    for f in sorted(_glob.glob(os.path.join(OUT, 'poses*.json'))):
        for ident, spec in json.load(open(f)).items():
            if not seuls or ident in seuls:
                articuler(ident, spec)


def personnages():
    """Le personnage habillé (7.png, alamy, face) → h01 ; la planche nu face-dos-profils (6.png) → c01…c04."""
    out = []
    for pref, pk, k, src, colle in (('h', 'homme7-encre.pkl', 4, '7.png (alamy)', 6.0), ('c', 'corps6-encre.pkl', 8, '6.png', 2.0)):
        enc = pickle.load(open(os.path.join(TMP, pk), 'rb'))
        out += serie(pref, [enc], k, src, colle=colle)
    return out


if __name__ == '__main__':
    quoi = sys.argv[1:] or ['tous']
    if quoi[0] in ('kibbitzer', 'tous'):
        print(contact('contact-kibbitzer', kibbitzer(), col=5))
    if quoi[0] in ('gestes', 'tous'):
        print(contact('contact-gestes', gestes(), col=8))
    if quoi[0] in ('shoo', 'tous'):
        print(contact('contact-shoo', shoo(), col=6))
    if quoi[0] in ('personnages', 'tous'):
        print(contact('contact-personnages', personnages(), col=5))
    if quoi[0] in ('poses', 'tous'):
        poses(quoi[1:])
