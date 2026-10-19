# -*- coding: utf-8 -*-
"""Le dos du tome 2 (variante C) : brouillon 2, la tablette de la tranche."""
import math
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

# les encres de l'image du devant (titre-tome-2.jpg), relevées sur l'image
BRUN = (40, 13, 9)          # le tuyau, le cadre, le clou, la fougère du bocal
CREME = (243, 219, 197)     # les bocaux, la lampe, le bassin
OR = (205, 142, 72)         # les herbes qui sèchent sous la table et dans le panier
OMBRE = 0.76                # l'ombre portée : celle du cadre est le mur à 0,70 (69, 18, 14 sur 98, 27, 22) ; à 0,76,
                            # le mur entre une feuille et son ombre ne se lit pas comme une étoile au nettoyage
FILET = (150, 92, 78)       # le liseré clair du bord de la table et des couvercles

S = 4                       # on dessine à quatre fois la taille, puis on réduit

# marges autour de ce qui est écrit ou tracé (po)
M_TEXTE, M_FILET, M_BLOC = 0.22, 0.16, 0.20
M_PLI, M_ROGNE = 0.12, 0.30

# les objets découpés dans l'image du devant (px de titre-tome-2.jpg) : boîte, et dernière rangée de l'objet
BOCAL_FOUGERE = (655, 2300, 856, 2750)
BOCAL_POIS = (857, 2380, 1040, 2750)


class Calque:
    """Une zone du fond, en pouces depuis le coin du fond perdu ; une couche par encre, dessinée à S fois."""

    def __init__(self, x0, y0, x1, y1, ppp):
        self.ppp, self.x0, self.y0 = ppp, x0, y0
        self.w, self.h = int(math.ceil((x1 - x0) * ppp)), int(math.ceil((y1 - y0) * ppp))
        self.c = {}
        self.images = []

    def couche(self, nom):
        if nom not in self.c:
            self.c[nom] = Image.new('L', (self.w * S, self.h * S), 0)
        return ImageDraw.Draw(self.c[nom])

    def px(self, p):
        return ((p[0] - self.x0) * self.ppp * S, (p[1] - self.y0) * self.ppp * S)

    def poly(self, nom, pts, v=255):
        self.couche(nom).polygon([self.px(p) for p in pts], fill=v)

    def rect(self, nom, x0, y0, x1, y1, v=255):
        self.poly(nom, [(x0, y0), (x1, y0), (x1, y1), (x0, y1)], v)

    def disque(self, nom, c, r, v=255):
        x, y = self.px(c)
        r *= self.ppp * S
        self.couche(nom).ellipse([x - r, y - r, x + r, y + r], fill=v)

    def trait(self, nom, pts, e, v=255):
        """Un trait d'épaisseur e (po), bouts et coudes arrondis."""
        d = self.couche(nom)
        q = [self.px(p) for p in pts]
        w = e * self.ppp * S
        for a, b in zip(q, q[1:]):
            dx, dy = b[0] - a[0], b[1] - a[1]
            n = math.hypot(dx, dy) or 1
            ox, oy = -dy / n * w / 2, dx / n * w / 2
            d.polygon([(a[0] + ox, a[1] + oy), (b[0] + ox, b[1] + oy), (b[0] - ox, b[1] - oy), (a[0] - ox, a[1] - oy)], fill=v)
        for p in q:
            d.ellipse([p[0] - w / 2, p[1] - w / 2, p[0] + w / 2, p[1] + w / 2], fill=v)

    def attacher(self, nom, appui):
        """Retire de la couche nom les éclats que la gouge a détachés de la couche appui, jugés à la taille du fond
        (ce qui ne tient que par un fil plus mince qu'un pixel tombe aussi) : un éclat seul sur le mur, le nettoyage
        des étoiles le prendrait pour une étoile et le brouillerait."""
        a, b = self.alpha(nom) > 0.45, self.alpha(appui) > 0.45
        lab, n = ndi.label(a | b)
        bons = np.unique(lab[b])
        perdu = a & ~np.isin(lab, bons[bons > 0])
        if perdu.any():
            gros = np.kron(ndi.binary_dilation(perdu, iterations=1), np.ones((S, S), bool))
            m = np.asarray(self.c[nom]).copy()
            m[gros[:m.shape[0], :m.shape[1]] & ~(np.asarray(self.c[appui]) > 96)] = 0
            self.c[nom] = Image.fromarray(m)

    def image(self, rgba, x, y):
        """Un objet découpé (RGBA, à la taille du fond), son coin haut gauche en (x, y) po."""
        self.images.append((rgba, x, y))

    def alpha(self, nom):
        im = self.c[nom].resize((self.w, self.h), Image.LANCZOS)
        return np.asarray(im, np.float32) / 255

    def encre(self, noms):
        """Les couches nommées (et les objets découpés, si 'images' y est), en alpha."""
        m = np.zeros((self.h, self.w), np.float32)
        for nom in self.c:
            if nom in noms:
                m = np.maximum(m, self.alpha(nom))
        for rgba, x, y in (self.images if 'images' in noms else []):
            a = np.zeros_like(m)
            ox, oy = round((x - self.x0) * self.ppp), round((y - self.y0) * self.ppp)
            h, w = rgba.shape[:2]
            a[oy:oy + h, ox:ox + w] = rgba[..., 3][:max(0, self.h - oy), :max(0, self.w - ox)]
            m = np.maximum(m, a)
        return m

    def poser(self, can, ordre, decal=(0.035, 0.045), ombre=('bois', 'images')):
        """Pose sur le fond : l'ombre portée des couches nommées dans ombre (décalée en bas à droite, comme celle du
        cadre au mur), puis les couches et les objets dans l'ordre donné (un nom de couche avec sa couleur, ou
        'images'). Les herbes, les fils, les clous et les équerres n'ont pas d'ombre, comme les herbes sous la table
        du devant : une ombre en lanières entre des feuilles laisse des points de mur clair que le nettoyage des
        étoiles de couverture.py prendrait pour des étoiles et brouillerait."""
        ox, oy = round(self.x0 * self.ppp), round(self.y0 * self.ppp)
        zone = can[oy:oy + self.h, ox:ox + self.w].astype(np.float32)
        h, w = zone.shape[:2]
        m = self.encre(ombre)
        dx, dy = round(decal[0] * self.ppp), round(decal[1] * self.ppp)
        a = ndi.shift(m, (dy, dx), order=1)[:h, :w, None]
        zone = zone * (1 - a * (1 - OMBRE))
        for nom, coul in ordre:
            if nom == 'images':
                for rgba, x, y in self.images:
                    px, py = round((x - self.x0) * self.ppp), round((y - self.y0) * self.ppp)
                    hh, ww = rgba.shape[:2]
                    sub = zone[py:py + hh, px:px + ww]
                    r = rgba[:sub.shape[0], :sub.shape[1]]
                    al = r[..., 3:4]
                    zone[py:py + hh, px:px + ww] = sub * (1 - al) + r[..., :3] * al
                continue
            if nom not in self.c:
                continue
            a = self.alpha(nom)[:h, :w, None]
            zone = zone * (1 - a) + np.array(coul, np.float32) * a
        can[oy:oy + h, ox:ox + w] = np.clip(np.rint(zone), 0, 255).astype(np.uint8)
        return can


# ------------------------------------------------------------------ objets découpés dans l'image du devant
def decouper(img, boite, echelle):
    """Découpe un objet posé sur le mur : le mur derrière lui (dont la lueur de la lampe) est estimé rangée par rangée
    entre les deux bords de la boîte, puis chaque pixel du bord est démélangé de ce mur. Rend un RGBA flottant
    (couleurs 0 à 255, alpha 0 à 1) réduit à l'échelle donnée (px du fond par px de l'image)."""
    x0, y0, x1, y1 = boite
    a = np.asarray(img.crop((x0, y0, x1, y1)), np.float32)
    h, w = a.shape[:2]
    g, d = a[:, :3].mean(axis=1), a[:, -3:].mean(axis=1)
    t = np.linspace(0, 1, w)[None, :, None]
    mur = g[:, None] * (1 - t) + d[:, None] * t
    ecart = np.linalg.norm(a - mur, axis=2)
    objet = ndi.binary_fill_holes(ndi.binary_opening(ecart > 40, iterations=1))
    lab, n = ndi.label(objet)
    if n > 1:
        tailles = ndi.sum(objet, lab, range(1, n + 1))
        objet = lab == (1 + int(np.argmax(tailles)))
    coeur = ndi.binary_erosion(objet, iterations=2)
    # la couleur de l'objet au bord : celle du point du cœur le plus proche
    _, (iy, ix) = ndi.distance_transform_edt(~coeur, return_indices=True)
    coul = a[iy, ix]
    v = coul - mur
    al = np.clip(((a - mur) * v).sum(axis=2) / np.maximum((v * v).sum(axis=2), 1), 0, 1)
    al[coeur] = 1
    al[~ndi.binary_dilation(objet, iterations=2)] = 0
    rgb = np.where(coeur[..., None], a, coul)
    # réduction en prémultiplié
    W, Hh = max(1, round(w * echelle)), max(1, round(h * echelle))
    pre = np.dstack([rgb * al[..., None], al * 255]).astype(np.float32)
    canaux = [np.asarray(Image.fromarray(pre[..., c]).resize((W, Hh), Image.LANCZOS), np.float32) for c in range(4)]
    A = np.clip(canaux[3] / 255, 0, 1)
    RGB = np.dstack(canaux[:3]) / np.maximum(A[..., None], 1e-4)
    return np.dstack([np.clip(RGB, 0, 255), A])


# ------------------------------------------------------------------ dessin
def contour_feuille(base, ang, L, larg, courbe=0.0, asym=0.0, n=28):
    """Le contour d'une feuille ovale, la base au point donné, la pointe dans la direction ang (radians, 0 = vers le
    bas) ; courbe la plie (la pointe part de côté), asym élargit un côté."""
    g, d = [], []
    for i in range(n + 1):
        t = i / n
        h = larg / 2 * (t ** 0.55) * (1 - t) ** 0.85 / (0.39 ** 0.55 * 0.61 ** 0.85)
        aa = ang + courbe * t
        # le milieu de la feuille, intégré le long de la courbe
        if i == 0:
            cx, cy = base
        else:
            cx += math.sin(aa) * L / n
            cy += math.cos(aa) * L / n
        nx, ny = math.cos(aa), -math.sin(aa)
        g.append((cx + nx * h * (1 + asym), cy + ny * h * (1 + asym)))
        d.append((cx - nx * h * (1 - asym), cy - ny * h * (1 - asym)))
    return g + d[::-1], g, d


def feuille(cal, nom, base, ang, L, larg, courbe=0.0, asym=0.0, gorge=0.007, nervure=True):
    """Une feuille gravée : un liseré du mur la détache de ce qu'elle couvre, et un coup de gouge lui fait sa nervure."""
    pts, g, d = contour_feuille(base, ang, L, larg, courbe, asym)
    if gorge:
        large, _, _ = contour_feuille(base, ang, L * 1.0, larg + 2 * gorge, courbe, asym)
        cal.poly(nom, large, v=0)
    cal.poly(nom, pts)
    if nervure and L > 0.07:
        mil = [((a[0] + b[0]) / 2, (a[1] + b[1]) / 2) for a, b in zip(g, d)]
        n = len(mil) - 1
        cal.trait(nom, mil[int(n * .26):int(n * .66)], max(0.005, larg * 0.1), v=0)


def tige(x0, y0, a, L, courbe=0.0, n=24):
    pts = []
    x, y = x0, y0
    for i in range(n + 1):
        t = i / n
        pts.append((x, y))
        aa = a + courbe * t
        x += math.sin(aa) * L / n
        y += math.cos(aa) * L / n
    return pts


def bouquet(cal, noeud, k=1.0, graine=5, tiges=None):
    """Un bouquet d'herbes qui sèche la tête en bas, lié au point donné, gravé comme les plantes du cadre au mur :
    des feuilles ovales à nervure creusée, qui tombent vers la pointe de leur tige. Les tiges et les queues des
    feuilles sont sur leur propre couche, que la gouge ne coupe jamais : chaque feuille reste attachée."""
    r = np.random.default_rng(graine)
    nx_, ny_ = noeud
    if tiges is None:
        tiges = [(-0.30, 0.95), (-0.17, 1.22), (-0.05, 1.05), (0.06, 1.38), (0.18, 1.12), (0.30, 0.9)]
    et = 0.014 * k if k > 0.6 else 0.011
    # les bouts de tiges coupés au-dessus du lien
    for dx in (-0.034, -0.012, 0.01, 0.03):
        cal.trait('tige', [(nx_ + dx * k * .6, ny_ + 0.03 * k), (nx_ + dx * k * 1.25, ny_ - 0.075 * k)], et * 1.05)
    ordre = sorted(range(len(tiges)), key=lambda j: -tiges[j][1])      # les longues derrière
    for j in ordre:
        a, L = tiges[j]
        a += r.uniform(-0.02, 0.02)
        L *= k
        courbe = -a * 0.35 + r.uniform(-0.05, 0.05)                  # elles pendent : la pointe revient vers l'axe
        pts = tige(nx_ + a * 0.08 * k, ny_ + 0.035 * k, a, L, courbe)
        cal.trait('tige', pts, et)
        n = 7 if L > 1.0 * k else 6
        for i in range(n):
            t = 0.16 + 0.8 * i / (n - 1)
            p = pts[int(round(t * 24))]
            at = a + courbe * t
            cote = 1 if (i + j) % 2 else -1
            fl = (0.21 - 0.09 * t) * k * r.uniform(0.85, 1.1)
            af = at + cote * r.uniform(0.55, 0.8)
            feuille(cal, 'or', p, af, fl, fl * r.uniform(0.38, 0.46), courbe=-cote * r.uniform(0.1, 0.35),
                    asym=r.uniform(-0.12, 0.12), gorge=0.007 if k > 0.6 else 0.005)
            cal.trait('tige', [p, (p[0] + math.sin(af) * fl * .24, p[1] + math.cos(af) * fl * .24)], et * 0.9)
        # la pointe : une petite feuille dans l'axe
        at = a + courbe
        feuille(cal, 'or', pts[-1], at, 0.1 * k, 0.04 * k, courbe=r.uniform(-.2, .2), nervure=False,
                gorge=0.007 if k > 0.6 else 0.005)
        cal.trait('tige', [pts[-1], (pts[-1][0] + math.sin(at) * 0.03 * k, pts[-1][1] + math.cos(at) * 0.03 * k)], et)
    cal.attacher('or', 'tige')
    # le lien : trois tours de ficelle crème
    for i in range(3):
        y = ny_ + (0.0 + 0.03 * i) * k
        cal.trait('ficelle', [(nx_ - 0.05 * k, y), (nx_ + 0.05 * k, y + 0.012 * k)], max(0.017 * k, 0.011))


def tablette(cal, x0, x1, y, k=1.0):
    """Une tablette de bois foncé sur deux équerres, son dessus à la hauteur y ; rend le dessous."""
    ep = 0.055 * k
    cal.rect('bois', x0, y, x1, y + ep)
    cal.rect('liseré', x0, y + 0.012 * k, x1, y + 0.02 * k)
    for xe in (x0 + 0.09 * k, x1 - 0.09 * k):
        cal.poly('equerre', [(xe - 0.018 * k, y + ep), (xe + 0.018 * k, y + ep), (xe + 0.018 * k, y + ep + 0.02 * k),
                          (xe + 0.004 * k, y + ep + 0.15 * k), (xe - 0.018 * k, y + ep + 0.15 * k)])
    return y + ep


# ------------------------------------------------------------------ les trous
def obstacles(info):
    """Ce que rien ne doit toucher, en pouces, marges comprises : les lignes de texte, les filets des titres, les blocs
    pleins (sommaire, auteurs, photos, barre des tomes)."""
    R = [tuple(v / 96 for v in r[:4]) + (r[4],) for r in info['rects']]
    lignes = [r for r in R if r[4] > 0]
    obs = [(x0 - M_TEXTE, y0 - M_TEXTE, x1 + M_TEXTE, y1 + M_TEXTE) for x0, y0, x1, y1, _ in lignes]
    titres = []
    for b in R:
        x0, y0, x1, y1, fs = b
        if fs > 0:
            continue
        dans = [l for l in lignes if l[0] >= x0 - .05 and l[2] <= x1 + .05 and l[1] >= y0 - .05 and l[3] <= y1 + .05]
        if dans and y1 - y0 < 0.4 and x1 - x0 > 1.5:
            titres.append(b)
    for b in R:
        x0, y0, x1, y1, fs = b
        if fs > 0:
            continue
        dans = [l for l in lignes if l[0] >= x0 - .05 and l[2] <= x1 + .05 and l[1] >= y0 - .05 and l[3] <= y1 + .05]
        if b in titres:                                       # un titre : ses lettres et son filet dessous
            obs.append((x0 - M_FILET, y1 - 0.04 - M_FILET, x1 + M_FILET, y1 + M_FILET))
            continue
        if dans and y1 - y0 >= 0.4 and max(l[0] for l in dans) - x0 < 0.5 * (x1 - x0):
            continue                                          # un paragraphe : ses lignes suffisent
        # un bloc plein ; s'il commence par un titre, il commence sous le filet de ce titre
        for t in titres:
            if t is not b and abs(t[1] - y0) < .01 and t[0] >= x0 - .01 and t[2] <= x1 + .01:
                y0 = t[3]
        obs.append((x0 - M_BLOC, y0 - M_BLOC, x1 + M_BLOC, y1 + M_BLOC))
    return obs


def grille(obs, info, r=100):
    """La carte des places libres du dos (quatrième et tranche), r cases par pouce : hors des obstacles, dans la
    zone sûre du rognage, loin des plis."""
    ppp = info['ppp']
    xt, xf, H = info['xt'] / ppp, info['xf'] / ppp, info['H'] / ppp
    g = np.ones((int(H * r), int(xf * r)), bool)
    for a, b, c, d in obs:
        g[max(0, int(b * r)):max(0, int(math.ceil(d * r))), max(0, int(a * r)):max(0, int(math.ceil(c * r)))] = False
    m = int((0.125 + M_ROGNE) * r)
    g[:m] = False
    g[-m:] = False
    g[:, :m] = False
    g[:, int((xt - M_PLI) * r):int(math.ceil((xt + M_PLI) * r))] = False
    g[:, int((xf - M_PLI) * r):] = False
    return g


def rectangles(g, r=100):
    """Les rectangles libres maximaux de la carte (méthode de l'histogramme), en pouces : (x0, y0, x1, y1)."""
    h = np.zeros(g.shape[1], int)
    out = set()
    for y in range(g.shape[0]):
        h = np.where(g[y], h + 1, 0)
        pile = []
        for x in range(g.shape[1] + 1):
            v = h[x] if x < g.shape[1] else 0
            debut = x
            while pile and pile[-1][1] >= v:
                debut, hv = pile.pop()
                if hv > 0:
                    out.add((debut, y + 1 - hv, x, y + 1))
            if v and (not pile or pile[-1][1] < v):
                pile.append((debut, v))
    return [(a / r, b / r, c / r, d / r) for a, b, c, d in out]


def guirlande(cal, x0, x1, y0, y1, graine=8):
    """Une corde clouée aux deux bouts, avec trois bouquets qui sèchent (comme les trois sous la table du devant)."""
    r = np.random.default_rng(graine)
    yn = y0 + 0.035
    fleche = 0.07
    xm, demi = (x0 + x1) / 2, (x1 - x0) / 2
    corde = lambda x: yn + fleche * (1 - ((x - xm) / demi) ** 2)
    xs = np.linspace(x0, x1, 40)
    cal.trait('fil', [(x, corde(x)) for x in xs], 0.011)
    for x in (x0, x1):
        cal.disque('clou', (x, yn), 0.024)
    sortes = [
        [(-0.20, 1.0), (-0.06, 1.22), (0.08, 1.1), (0.21, 0.92)],
        [(-0.24, 1.02), (-0.09, 1.3), (0.04, 1.42), (0.17, 1.2), (0.29, 0.95)],
        [(-0.19, 0.95), (-0.05, 1.18), (0.09, 1.25), (0.22, 1.0)],
    ]
    for i, tiges in enumerate(sortes):
        xb = x0 + (x1 - x0) * (i + 1) / 4
        yc = corde(xb)
        nd = yc + 0.07
        k = (y1 - nd - 0.03) / (max(L for _, L in tiges) + 0.17)
        cal.trait('fil', [(xb, yc), (xb, nd)], 0.01)
        bouquet(cal, (xb, nd), k, graine=graine + i, tiges=tiges)


def nettoyer_mur(can, x1, ppp):
    """Les petites taches sombres du mur (une poussière de l'image, reflétée, tombait contre « l'arbre de vie » du
    sommaire) : bouchées à la couleur du mur autour."""
    zone = can[:, :x1].astype(np.float32)
    L = zone @ np.array([.2126, .7152, .0722], np.float32)
    t = int(0.1 * ppp) | 1
    tache = (ndi.grey_closing(L, size=(t, t)) - L) > 14
    lab, n = ndi.label(tache)
    if not n:
        return can, 0
    tailles = ndi.sum(tache, lab, range(1, n + 1))
    p = int(0.08 * ppp)
    k = 0
    for i, sl in enumerate(ndi.find_objects(lab)):
        if tailles[i] >= (0.08 * ppp) ** 2:
            continue
        a, b = max(0, sl[0].start - p), min(zone.shape[0], sl[0].stop + p)
        c, d = max(0, sl[1].start - p), min(zone.shape[1], sl[1].stop + p)
        m = ndi.binary_dilation(lab[a:b, c:d] == i + 1, iterations=2)
        poids = (~m).astype(np.float32)
        den = np.maximum(ndi.gaussian_filter(poids, 0.02 * ppp), 1e-3)
        for ch in range(3):
            moy = ndi.gaussian_filter(zone[a:b, c:d, ch] * poids, 0.02 * ppp) / den
            zone[a:b, c:d, ch][m] = moy[m]
        k += 1
    can[:, :x1] = np.clip(np.rint(zone), 0, 255).astype(np.uint8)
    return can, k


def motif(can, info):
    ppp = info['ppp']
    xt, xf, H = info['xt'] / ppp, info['xf'] / ppp, info['H'] / ppp
    img = info['image']
    ech = max(8.125 * ppp / img.size[0], 10.25 * ppp / img.size[1])     # l'échelle de l'image sur le devant
    can, n = nettoyer_mur(can, info['xf'], ppp)
    print('    dos : %d tache(s) du mur bouchée(s)' % n)
    obs = obstacles(info)
    g = grille(obs, info)
    libres = rectangles(g)

    # la tranche : la tablette avec le bocal à la fougère, et le bouquet pendu dessous
    tr = [b for b in libres if b[0] >= xt and b[2] <= xf]
    x0, y0, x1, y1 = max(tr, key=lambda b: (b[3] - b[1]) * (b[2] - b[0]))
    cx = (xt + xf) / 2
    bocal = decouper(img, BOCAL_FOUGERE, ech)
    bh, bw = bocal.shape[0] / ppp, bocal.shape[1] / ppp
    k = 0.92
    groupe = bh + 0.055 + 0.2 + 1.52 * k            # bocal, tablette, ficelle, bouquet
    haut = y0 + (y1 - y0 - groupe) * 0.42
    cal = Calque(xt, y0 - 0.1, xf, y1 + 0.1, ppp)
    y_tab = haut + bh
    cal.image(bocal, cx - bw / 2, haut)
    dessous = tablette(cal, cx - 0.31, cx + 0.31, y_tab)
    cal.trait('fil', [(cx - 0.004, dessous), (cx - 0.004, dessous + 0.2)], 0.011)
    bouquet(cal, (cx, dessous + 0.2), k)
    cal.poser(can, [('equerre', BRUN), ('bois', BRUN), ('liseré', FILET), ('images', None), ('fil', BRUN), ('tige', OR), ('or', OR), ('ficelle', CREME)])

    # la quatrième : la corde aux trois bouquets dans le grand trou du haut, à droite du texte
    # (la colonne du texte s'arrête au bord droit des filets : la corde aussi)
    droite = max(r[2] / 96 for r in info['rects'] if r[2] / 96 <= xt)
    q = [(b[0], b[1], min(b[2], droite), b[3]) for b in libres if b[2] <= xt and b[3] < H / 2]
    q = [b for b in q if b[3] - b[1] >= 0.6 and b[2] - b[0] >= 1.6]
    if q:
        x0, y0, x1, y1 = max(q, key=lambda b: (b[3] - b[1]) * (b[2] - b[0]))
        larg = min(x1 - x0, 2.1)
        xa = (x0 + x1) / 2 - larg / 2
        cal = Calque(x0 - 0.05, y0 - 0.05, x1 + 0.05, y1 + 0.05, ppp)
        guirlande(cal, xa + 0.03, xa + larg - 0.03, y0, y1 - 0.05)
        cal.poser(can, [('fil', BRUN), ('tige', OR), ('or', OR), ('ficelle', CREME), ('clou', BRUN)])
    return can
