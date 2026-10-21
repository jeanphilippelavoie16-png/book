"""notice_corps.py — têtes et personnages au style notice, construits par formes simples.

Méthode : chaque tête ou membre est une union douce de formes élémentaires (cercle, ellipse,
capsule) calculée en 2D ; on en tire le contour, puis quelques courbes de Bézier franches
(courbes.py). Les pièces se superposent dans l'ordre de profondeur, chacune peinte en blanc :
ce qui passe devant cache le trait de ce qui est derrière, comme à l'encrage.
"""
import numpy as np, os, sys, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from courbes import courbes, svg_d
from skimage import measure

NOIR = '#1A1A1A'; TS = 1.6; TI = 1.05
OUT = os.environ.get('NOTICE_SORTIE', '/home/user/book/_reprise/scratchpad/modeles/notice'); os.makedirs(OUT, exist_ok=True)

# ── formes 2D (distance signée) ───────────────────────────────────────────────
def smin(a, b, k):
    h = np.clip(0.5 + 0.5*(b-a)/k, 0, 1); return b*(1-h) + a*h - k*h*(1-h)
def cercle(X, Y, cx, cy, r): return np.hypot(X-cx, Y-cy) - r
def ellipse(X, Y, cx, cy, rx, ry, ang=0):
    c, s = np.cos(np.radians(ang)), np.sin(np.radians(ang))
    x = (X-cx)*c + (Y-cy)*s; y = -(X-cx)*s + (Y-cy)*c
    k0 = np.hypot(x/rx, y/ry); k1 = np.hypot(x/rx**2, y/ry**2)
    return k0*(k0-1)/np.maximum(k1, 1e-9)
def capsule(X, Y, a, b, ra, rb=None):
    rb = ra if rb is None else rb; a = np.array(a, float); b = np.array(b, float); ba = b - a
    t = np.clip(((X-a[0])*ba[0] + (Y-a[1])*ba[1]) / (ba @ ba), 0, 1)
    return np.hypot(X - a[0] - t*ba[0], Y - a[1] - t*ba[1]) - (ra + (rb-ra)*t)
def chaine(X, Y, pts, rs, k=4):
    d = None
    for i in range(len(pts)-1):
        c = capsule(X, Y, pts[i], pts[i+1], rs[i], rs[i+1])
        d = c if d is None else smin(d, c, k)
    return d

def contours(f, boite, pas=0.25):
    x0, x1, y0, y1 = boite
    X, Y = np.meshgrid(np.arange(x0, x1, pas), np.arange(y0, y1, pas))
    F = f(X, Y)
    out = []
    for c in measure.find_contours(np.pad(F, 1, constant_values=1e3), 0.0):
        if len(c) < 10: continue
        out.append(np.stack([x0 + (c[:, 1]-1)*pas, y0 + (c[:, 0]-1)*pas], 1))
    return out

def forme(f, boite, tol=0.6, sigma=0.8, ep=TS, remplir='#fff'):
    return [f'<path d="{svg_d(courbes(c, tol, True, sigma=sigma), True)}" fill="{remplir}" stroke="{NOIR}" stroke-width="{ep}" stroke-linejoin="round"/>' for c in contours(f, boite)]

def ligne(pts, tol=0.5, ep=TI):
    return f'<path d="{svg_d(courbes(np.array(pts, float), tol, False, sigma=0.6))}" fill="none" stroke="{NOIR}" stroke-width="{ep}" stroke-linecap="round" stroke-linejoin="round"/>'

def lisse(pts, n=12):
    """Catmull-Rom : passe par les points donnés (pour les traits intérieurs)."""
    P = np.array(pts, float); P = np.vstack([2*P[0]-P[1], P, 2*P[-1]-P[-2]]); out = []
    for i in range(1, len(P)-2):
        p0, p1, p2, p3 = P[i-1:i+3]
        for t in np.linspace(0, 1, n, endpoint=False):
            out.append(0.5*((2*p1) + (-p0+p2)*t + (2*p0-5*p1+4*p2-p3)*t*t + (-p0+3*p1-3*p2+p3)*t**3))
    out.append(P[-2]); return np.array(out)

# ── la tête, de profil vers la droite ─────────────────────────────────────────
# Dessinée comme un illustrateur : une suite de repères placés sur la grille du canon
# (sommet 0, menton 100 ; adulte : sourcils à 40, œil à 47, bas du nez à 67), puis une seule
# courbe lisse qui passe par eux. Le canon fait la justesse, la courbe fait le trait.
PROFILS = {
    'adulte': dict(
        contour=[(22, 82), (9, 68), (2, 50), (6, 30), (20, 12), (44, 1), (66, 5), (80, 16), (85, 30), (84, 40), (82, 45), (87, 53),
                 (93, 62), (89, 66), (84, 67), (85.5, 74), (84.5, 82), (83, 92), (76, 99.5), (62, 100), (52, 97)],
        cou=[((22, 82), (26, 128)), ((57, 98.5), (62, 128))],
        oreille=[(40, 40), (46, 41), (48, 50), (46, 60), (41, 65)], oreille_int=[(42, 47), (44, 52), (42, 57)],
        oeil=(72, 47), cheveux=[(79, 15), (64, 19), (54, 28), (49, 39)]),
    'enfant': dict(
        contour=[(24, 84), (8, 70), (1, 50), (6, 28), (22, 10), (46, 1), (68, 6), (84, 20), (90, 38), (90, 50), (88, 56), (93, 64),
                 (90, 69), (86, 70), (87, 77), (85, 86), (80, 94), (70, 99), (57, 99), (48, 95)],
        cou=[((24, 84), (27, 122)), ((54, 97), (57, 122))],
        oreille=[(41, 48), (46, 49), (48, 57), (46, 65), (42, 69)], oreille_int=[(43, 55), (44, 59), (43, 63)],
        oeil=(75, 57), cheveux=[(83, 19), (66, 22), (56, 32), (50, 46)]),
    'bebe': dict(
        contour=[(26, 84), (8, 72), (0, 50), (5, 26), (22, 8), (48, 0), (72, 6), (88, 22), (95, 42), (95, 56), (93, 62), (97, 69),
                 (94, 73), (89, 74), (89.5, 80), (86, 88), (78, 95), (64, 98), (53, 95)],
        cou=[((26, 84), (29, 108)), ((55, 96), (57, 108))],
        oreille=[(43, 56), (48, 57), (50, 64), (48, 71), (44, 74)], oreille_int=[(45, 62), (46, 65), (45, 68)],
        oeil=(79, 62), cheveux=None),
}

def tete(x, y, h, age='adulte', avec_cou=True):
    """Tête de profil vers la droite. h = hauteur sommet-menton ; (x, y) = milieu du crâne."""
    A = PROFILS[age]; k = h/100
    T = lambda pts: [(x + (px - 48)*k, y + (py - 50)*k) for px, py in pts]
    out = []
    if avec_cou:
        for a_, b_ in A['cou']: out.append(ligne(T([a_, b_]), ep=TS))
    c = lisse(T(A['contour']))
    out.append(f'<path d="{svg_d(courbes(c, 0.35, False, sigma=0.4))}" fill="#fff" stroke="{NOIR}" stroke-width="{TS}" stroke-linecap="round" stroke-linejoin="round"/>')
    out.append(ligne(lisse(T(A['oreille']))))
    out.append(ligne(lisse(T(A['oreille_int'])), ep=TI*0.8))
    if A['cheveux']: out.append(ligne(lisse(T(A['cheveux']))))
    ox, oy = T([A['oeil']])[0]
    out.append(f'<circle cx="{ox:.2f}" cy="{oy:.2f}" r="{1.9*k:.2f}" fill="{NOIR}"/>')
    return out

# ── le personnage ─────────────────────────────────────────────────────────────
# Canon notice : 6,5 têtes de haut ; épaules à 2 têtes de large ; bras jusqu'à mi-cuisse ;
# membres en tubes pleins, plus gros en haut ; mains en moufle simple ; chaussures arrondies.
def personnage(x, y, H, pose='debout'):
    """De profil vers la droite. (x, y) = sol sous les pieds, H = hauteur debout (unités)."""
    t = H/6.5   # hauteur de tête
    if pose == 'debout':
        J = dict(hanche=(0, -3.35), epaule=(0.05, -5.2), cou=(0.12, -5.5), tete=(0.18, -6.0),
                 genou_l=(-0.35, -1.75), cheville_l=(-0.45, -0.2), pied_l=(0.2, -0.12),
                 genou_p=(0.1, -1.75), cheville_p=(0.08, -0.2), pied_p=(0.75, -0.12),
                 coude_l=(-0.05, -4.05), main_l=(0.0, -3.05), coude_p=(0.18, -4.05), main_p=(0.3, -3.05))
    elif pose == 'genoux':
        J = dict(hanche=(0, -1.85), epaule=(0.75, -3.55), cou=(0.95, -3.8), tete=(1.15, -4.25),
                 genou_l=(0.45, -0.25), cheville_l=(-1.0, -0.2), pied_l=(-1.45, -0.12),
                 genou_p=(0.7, -0.25), cheville_p=(-0.75, -0.2), pied_p=(-1.2, -0.12),
                 coude_l=(1.2, -2.6), main_l=(1.8, -1.9), coude_p=(1.45, -2.65), main_p=(2.05, -1.9))
    else:   # accroupi
        J = dict(hanche=(-0.3, -1.25), epaule=(0.45, -3.05), cou=(0.6, -3.3), tete=(0.8, -3.75),
                 genou_l=(0.6, -1.7), cheville_l=(0.05, -0.2), pied_l=(0.6, -0.12),
                 genou_p=(0.85, -1.75), cheville_p=(0.25, -0.2), pied_p=(0.85, -0.12),
                 coude_l=(1.0, -2.3), main_l=(1.6, -1.6), coude_p=(1.25, -2.35), main_p=(1.85, -1.6))
    P = {k: (x + v[0]*t, y + v[1]*t) for k, v in J.items()}
    b = (x - 4*t, x + 4*t, y - 7*t, y + 0.5*t)
    jambe = lambda s: (lambda X, Y: smin(chaine(X, Y, [P['hanche'], P['genou_'+s], P['cheville_'+s]], [0.42*t, 0.36*t, 0.27*t], 0.1*t),
                                         capsule(X, Y, P['cheville_'+s], P['pied_'+s], 0.2*t, 0.17*t), 0.08*t))
    bras = lambda s: (lambda X, Y: smin(chaine(X, Y, [P['epaule'], P['coude_'+s], P['main_'+s]], [0.26*t, 0.22*t, 0.19*t], 0.08*t),
                                        cercle(X, Y, *P['main_'+s], 0.21*t), 0.06*t))
    def tronc(X, Y):
        hx, hy = P['hanche']; ex, ey = P['epaule']
        return smin(capsule(X, Y, (hx, hy - 0.2*t), (ex, ey + 0.35*t), 0.6*t, 0.62*t), cercle(X, Y, ex, ey + 0.25*t, 0.55*t), 0.2*t)
    out = []
    out += forme(bras('l'), b) + forme(jambe('l'), b)
    out += forme(lambda X, Y: capsule(X, Y, P['epaule'], P['cou'], 0.2*t), b)
    out += forme(tronc, b)
    out += forme(jambe('p'), b)
    out += forme(bras('p'), b)
    tx, ty = P['tete']
    out += tete(tx, ty, t, 'adulte', avec_cou=False)
    return out

def svg(fichier, l, h, elems):
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {l} {h}" width="{l}" height="{h}">', f'<rect width="{l}" height="{h}" fill="#fff"/>'] + elems + ['</svg>']
    open(fichier + '.svg', 'w').write('\n'.join(s))
    subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', fichier + '.svg', fichier + '.png'], capture_output=True)
    return fichier + '.png'

if __name__ == '__main__':
    print(svg(f'{OUT}/tetes', 780, 300, tete(150, 135, 210, 'adulte') + tete(420, 150, 175, 'enfant') + tete(640, 165, 135, 'bebe')))
    print(svg(f'{OUT}/corps', 860, 470, personnage(130, 450, 420, 'debout') + personnage(360, 450, 420, 'genoux') + personnage(660, 450, 420, 'accroupi')))
