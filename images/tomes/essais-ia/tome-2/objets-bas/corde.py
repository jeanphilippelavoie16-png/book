"""La corde de bois sous le poêle, rangée dessous, entre ses pattes (JP, 19 octobre 2026 : « le bois, mets-le en dessous
du foyer ») : deux rangs bas qui restent sous le corps du poêle ; du bois fendu (ronds, demies, quartiers) empilé par gravité, vu de trois quarts ;
les bouts devant (écorce, cernes autour du cœur, fentes), le côté de l'écorce et des faces fendues qui fuit vers le
haut et la gauche, et l'ombre au fond de la pile. Un seul bout reste crème (la demie du deuxième rang) : le bouleau
du bas garde son écorce blanche mais son bois passe en ocre, et le rond du bord droit, près de la porte du poêle,
n'est plus du bouleau ; les bouts crème tiraient l'œil à côté du feu."""
import math, random
import numpy as np
from PIL import Image, ImageDraw
from svgkit import *

D = (-9.0, -5.6)                  # la fuite : le bout arrière de la bûche, vu d'en haut à gauche
SOL = 897.0                       # le bas des bouts, sur le plancher, sous le poêle
X0, Y0, X1, Y1 = 588, 836, 768, 902
TRAIT = 0.65                      # l'épaisseur des cernes : celle du linge, du panier et de la cruche, générés

def contour(p, R0):
    """Le bout d'une pièce : liste de (point, matière du segment qui part de ce point) ; 'e' = écorce, 'f' = fendu."""
    t, px, py, R, th, al = p['t'], p['x'], p['y'], p['R'], p.get('th', 0), p.get('al', 90)
    rr = R0['r']
    def ray(a):
        a_ = math.radians(a)
        return R * (1 + 0.025 * math.sin(2 * a_ + rr[0]) + 0.018 * math.sin(3 * a_ + rr[1]) + 0.01 * math.sin(5 * a_ + rr[2]))
    out = []
    if t == 'rond':
        for a in np.linspace(0, 360, 73)[:-1]:
            r = ray(a); out.append(((px + r * math.cos(math.radians(a)), py + r * math.sin(math.radians(a))), 'e'))
        return out
    if t == 'demi':
        a0, a1 = th - 90, th + 90
    else:
        a0, a1 = th - al / 2, th + al / 2
    n = max(8, int((a1 - a0) / 4))
    for a in np.linspace(a0, a1, n):
        r = ray(a); out.append(((px + r * math.cos(math.radians(a)), py + r * math.sin(math.radians(a))), 'e'))
    out[-1] = (out[-1][0], 'f')
    if t == 'demi':
        # la face fendue passe par le cœur ; un peu d'irrégularité
        out.append(((px + 0.3 * math.cos(math.radians(th)), py + 0.3 * math.sin(math.radians(th))), 'f'))
    else:
        # la pointe du quartier, émoussée (le cœur part souvent avec l'autre morceau)
        e = 1.6
        for s in (1, -1):
            a = math.radians(th + s * al / 2)
            out.append(((px + e * math.cos(a), py + e * math.sin(a)), 'f'))
    return out

def masque(ps, res=4):
    ps = list(ps)
    im = Image.new('L', (int((X1 - X0 + 60) * res), int((Y1 - Y0 + 60) * res)), 0)
    ImageDraw.Draw(im).polygon([((x - X0 + 30) * res, (y - Y0 + 30) * res) for x, y in ps], fill=1)
    return np.asarray(im, bool)

def empiler(pieces, seed=3):
    R = random.Random(seed)
    occ = None
    poses = []
    for p in pieces:
        best = None
        for dx in (0, -2, 2, -4, 4):
            q = dict(p); q['x'] = p['x'] + dx
            q['r'] = [R.uniform(0, 6) for _ in range(3)]
            # on descend la pièce jusqu'au contact : à pas de 1, puis de 0,25
            def libre(y):
                q['y'] = y
                ps = [pt for pt, _ in contour(q, q)]
                if max(v for _, v in ps) > SOL: return None
                m = masque(ps)
                if occ is not None and (m & occ).any(): return None
                return m
            y = Y0 - 30; last = None
            while y < SOL + 40:
                m = libre(y)
                if m is None: break
                last = (y, m); y += 1.0
            if last is not None:
                y = last[0] + 0.25
                while y < last[0] + 1.0:
                    m = libre(y)
                    if m is None: break
                    last = (y, m); y += 0.25
            if last is None: continue
            if best is None or last[0] > best[0][0] + 0.5:
                best = (last, dict(q))
        (y, m), q = best
        q['y'] = y
        occ = m if occ is None else (occ | m)
        poses.append(q)
    return poses

def bout_svg(p, cid):
    """Le bout : écorce, bois, cernes, fentes, cœur."""
    R = random.Random(p['seed'])
    c = contour(p, p)
    ps = [pt for pt, _ in c]
    bouleau = p.get('bouleau', False)
    ecorce = CREME if bouleau else FONCE
    bois = CREME if p.get('pale') else OCRE
    cer = OCRE if p.get('pale') else MOYEN
    s = []
    s.append(poly(ps, fill=ecorce))
    # le bois : l'arc d'écorce rentré de l'épaisseur de l'écorce
    b = p['R'] * (0.07 if bouleau else 0.11)
    px, py = p['x'], p['y']
    inn = []
    for (x, y), m in c:
        dx, dy = x - px, y - py; L = math.hypot(dx, dy)
        if L > b * 1.5 and m == 'e' or (m == 'f' and L > p['R'] * 0.9):
            inn.append((x - dx / L * b, y - dy / L * b))
        else:
            inn.append((x, y))
    s.append(poly(inn, fill=bois))
    if bouleau:   # le liber, le fil foncé entre l'écorce blanche et le bois
        s.append(path(lisse(inn, ferme=True, t=0.0), stroke=FONCE, w=0.6))
    s.append(f'<clipPath id="{cid}">{poly(inn)}</clipPath>')
    g = [f'<g clip-path="url(#{cid})">']
    # les cernes, autour du cœur : trois ou quatre, francs, coupés une ou deux fois ; la croissance n'est pas égale
    # d'un côté à l'autre (le bois de compression) : les cernes s'écartent d'un côté, se serrent de l'autre
    n = 4 if p['R'] > 19 else 3
    ex = R.uniform(0.08, 0.16) * p['R']
    if p['t'] == 'rond':
        ea = R.uniform(0, 2 * math.pi)
    else:
        ea = math.radians(p.get('th', 0) + R.uniform(-30, 30))
    for i in range(1, n + 1):
        f_ = (i / (n + 0.7)) ** 0.9 * (1 + R.uniform(-0.04, 0.04))
        rad = (p['R'] - b) * f_
        ph = [R.uniform(0, 6) for _ in range(2)]
        ox, oy = math.cos(ea) * ex * f_, math.sin(ea) * ex * f_
        ring = [(px + ox + rad * (1 + 0.05 * math.sin(2 * a + ph[0]) + 0.03 * math.sin(3 * a + ph[1])) * math.cos(a),
                 py + oy + rad * (1 + 0.05 * math.sin(2 * a + ph[0]) + 0.03 * math.sin(3 * a + ph[1])) * math.sin(a))
                for a in np.linspace(0, 2 * math.pi, 49)[:-1]]
        L = 2 * math.pi * rad
        if R.random() < 0.5:
            dash = f'{f(L * R.uniform(0.55, 0.8))} {f(L * R.uniform(0.06, 0.12))}'
        else:
            dash = f'{f(L * R.uniform(0.3, 0.45))} {f(L * R.uniform(0.05, 0.1))} {f(L * R.uniform(0.25, 0.4))} {f(L * R.uniform(0.05, 0.1))}'
        wr = 0.95 if i == n else R.choice((0.6, 0.7, 0.8))
        g.append(path(lisse(ring), stroke=cer, w=wr, extra=f'stroke-dasharray="{dash}" stroke-dashoffset="{f(R.uniform(0, L))}"'))
    # les fentes de séchage : larges à l'écorce, fines vers le cœur
    for k_ in range(p.get('fentes', 1)):
        if p['t'] == 'rond':
            a = math.radians(R.uniform(0, 360))
        else:
            al = 180 if p['t'] == 'demi' else p.get('al', 90)
            a = math.radians(p['th'] + R.uniform(-al / 2 + 18, al / 2 - 18))
        r0, r1 = (p['R'] - b) * R.uniform(0.18, 0.35), (p['R'] - b) * 1.02
        ux, uy = math.cos(a), math.sin(a); nx, ny = -uy, ux
        wb = R.uniform(0.7, 1.1)
        cr = [(px + ux * r0, py + uy * r0),
              (px + ux * (r0 + r1) / 2 + nx * 0.25, py + uy * (r0 + r1) / 2 + ny * 0.25),
              (px + ux * r1 + nx * wb, py + uy * r1 + ny * wb),
              (px + ux * r1 - nx * wb, py + uy * r1 - ny * wb),
              (px + ux * (r0 + r1) / 2 - nx * 0.1, py + uy * (r0 + r1) / 2 - ny * 0.1)]
        g.append(poly(cr, fill=CERNE))
    # le cœur
    g.append(f'<circle cx="{f(px)}" cy="{f(py)}" r="0.9" fill="{cer}"/>')
    g.append('</g>')
    s += g
    if not bouleau:   # l'écorce du bout, à la gouge : de petites entailles claires
        for _ in range(int(p['R'] * 0.6)):
            i = R.randrange(len(c) - 1)
            (x, y), m = c[i]
            if m != 'e': continue
            dx, dy = x - px, y - py; L = math.hypot(dx, dy)
            if L < p['R'] * 0.8: continue
            ux, uy = dx / L, dy / L
            s.append(line((x - ux * b * 0.35, y - uy * b * 0.35), (x - ux * b * 0.8, y - uy * b * 0.8), stroke=MOYEN, w=0.55))
    s.append(poly(ps, stroke=CERNE, w=1.15 * TRAIT))
    return '\n'.join(s)

def flanc_svg(p, cid, ombre=False):
    """Le côté qui fuit : pour chaque segment du bout tourné vers la fuite, une bande jusqu'au bout arrière."""
    R = random.Random(p['seed'] + 7)
    c = contour(p, p)
    n = len(c)
    ps = [pt for pt, _ in c]
    # orientation
    A = sum(ps[i][0] * ps[(i + 1) % n][1] - ps[(i + 1) % n][0] * ps[i][1] for i in range(n)) / 2
    sg = 1 if A > 0 else -1
    bouleau = p.get('bouleau', False)
    if ombre:
        col = {'e': CERNE, 'f': FONCE}
    else:
        col = {'e': CREME if bouleau else MOYEN, 'f': OCRE if not p.get('pale') else CREME}
    s = []
    quads = []
    for i in range(n):
        (a, m), (b_, _) = c[i], c[(i + 1) % n]
        ex, ey = b_[0] - a[0], b_[1] - a[1]
        nx, ny = sg * ey, -sg * ex          # normale extérieure
        if nx * D[0] + ny * D[1] <= 0: continue
        q = [a, b_, (b_[0] + D[0], b_[1] + D[1]), (a[0] + D[0], a[1] + D[1])]
        quads.append((q, m))
    for q, m in quads:
        s.append(poly(q, fill=col[m], stroke=col[m], w=0.3))
    if not quads: return ''
    # la texture, coupée au flanc
    s.append(f'<clipPath id="{cid}">' + ''.join(poly(q) for q, _ in quads) + '</clipPath>')
    s.append(f'<g clip-path="url(#{cid})">')
    for q, m in quads:
        a, b_ = q[0], q[1]
        if ombre: continue
        if m == 'e' and not bouleau:
            if R.random() < 0.45:      # les sillons de l'écorce, dans le sens de la bûche
                t0 = R.uniform(0, 0.3); t1 = R.uniform(0.6, 1.0)
                s.append(line((a[0] + D[0] * t0, a[1] + D[1] * t0), (a[0] + D[0] * t1, a[1] + D[1] * t1), stroke=FONCE, w=0.7))
        elif m == 'e' and bouleau:     # les lenticelles du bouleau, en travers
            if R.random() < 0.35:
                t0 = R.uniform(0.1, 0.9)
                ln = R.uniform(1.5, 3.5)
                ex, ey = b_[0] - a[0], b_[1] - a[1]; L = math.hypot(ex, ey) or 1
                s.append(line((a[0] + D[0] * t0, a[1] + D[1] * t0), (a[0] + D[0] * t0 + ex / L * ln, a[1] + D[1] * t0 + ey / L * ln), stroke=CERNE, w=0.75))
        elif m == 'f':                 # le fil du bois fendu
            if R.random() < 0.6:
                t0 = R.uniform(0, 0.2); t1 = R.uniform(0.5, 1.0)
                s.append(line((a[0] + D[0] * t0, a[1] + D[1] * t0), (a[0] + D[0] * t1, a[1] + D[1] * t1), stroke=MOYEN if not p.get('pale') else OCRE, w=0.5))
    s.append('</g>')
    # le cerne : le bout arrière (les segments tournés vers la fuite, décalés), les arêtes du flanc, les arêtes écorce/fendu
    back = []
    for q, m in quads:
        back.append(line(q[3], q[2], stroke=CERNE, w=1.0 * TRAIT))
    s += back
    # les arêtes de la silhouette (premier et dernier point de chaque suite de segments visibles)
    vis = set()
    for i in range(n):
        (a, m), (b_, _) = c[i], c[(i + 1) % n]
        ex, ey = b_[0] - a[0], b_[1] - a[1]
        nx, ny = sg * ey, -sg * ex
        if nx * D[0] + ny * D[1] > 0: vis.add(i)
    for i in vis:
        if (i - 1) % n not in vis:
            a = c[i][0]; s.append(line(a, (a[0] + D[0], a[1] + D[1]), stroke=CERNE, w=1.0 * TRAIT))
        if (i + 1) % n not in vis:
            a = c[(i + 1) % n][0]; s.append(line(a, (a[0] + D[0], a[1] + D[1]), stroke=CERNE, w=1.0 * TRAIT))
        if (i + 1) % n in vis and c[i][1] != c[(i + 1) % n][1]:
            a = c[(i + 1) % n][0]; s.append(line(a, (a[0] + D[0], a[1] + D[1]), stroke=CERNE, w=0.8 * TRAIT))
    return '\n'.join(s)

PIECES = [
    # la rangée du bas, de gauche à droite, entre la patte du poêle et le bord de l'image
    dict(t='rond', x=602, R=12),
    dict(t='demi', x=628, R=13, th=-95),
    dict(t='quart', x=655, R=16, th=-60, al=95),
    dict(t='rond', x=681, R=12, bouleau=True),          # le bouleau : l'écorce blanche, le bois en ocre
    dict(t='demi', x=707, R=13, th=-100),
    dict(t='quart', x=734, R=16, th=-55, al=95),
    dict(t='rond', x=761, R=12),
    # deuxième rang, plus petit : il reste sous le bas du poêle
    dict(t='quart', x=615, R=12, th=-120, al=90),
    dict(t='rond', x=641, R=10),
    dict(t='demi', x=667, R=11, th=-80, pale=True),
    dict(t='quart', x=694, R=12, th=-100, al=90),
    dict(t='rond', x=720, R=10),
    dict(t='demi', x=746, R=11, th=-85),
]

def construire(pieces=PIECES, seed=3):
    R = random.Random(seed)
    for i, p in enumerate(pieces):
        p['seed'] = 100 + i
        p.setdefault('fentes', 1 + (R.random() < 0.4))
    poses = empiler(pieces, seed)
    # l'ordre de dessin des flancs : du bas à droite vers le haut à gauche (le plus en avant en dernier)
    ordre = sorted(range(len(poses)), key=lambda i: poses[i]['x'] * D[0] + poses[i]['y'] * D[1])
    s = []
    # l'ombre au fond : la silhouette de toute la pile, avec la fuite, fermée (les creux entre les bûches sont noirs)
    from scipy import ndimage
    from skimage import measure
    res = 4
    sil = np.zeros((int((Y1 - Y0 + 60) * res), int((X1 - X0 + 60) * res)), bool)
    for p in poses:
        ps = [pt for pt, _ in contour(p, p)]
        sil |= masque(ps + [(x + D[0], y + D[1]) for x, y in ps[::-1]], res)
        for tt in np.linspace(0, 1, 6):
            sil |= masque([(x + D[0] * tt, y + D[1] * tt) for x, y in ps], res)
    yy, xx = np.mgrid[0:sil.shape[0], 0:sil.shape[1]]
    disque = (np.hypot(yy - 24, xx - 24) <= 24)[:49, :49]
    sil = ndimage.binary_closing(np.pad(sil, 40), structure=disque)[40:-40, 40:-40]
    sil = ndimage.binary_fill_holes(sil)
    for cnt in measure.find_contours(sil.astype(float), 0.5):
        pts_ = [(x / res + X0 - 30, y / res + Y0 - 30) for y, x in cnt[::3]]
        s.append(poly(pts_, fill=CERNE, stroke=CERNE, w=1.4))
    for i in ordre:
        s.append(flanc_svg(poses[i], f'fl{i}'))
    for i, p in enumerate(poses):
        s.append(bout_svg(p, f'bt{i}'))
    return '\n'.join(s), poses

if __name__ == '__main__':
    corps, poses = construire()
    rendre(corps, X0, Y0, X1, Y1, 'corde.png')
    for p in poses: print(p['t'], round(p['x']), round(p['y'], 1), p['R'])
