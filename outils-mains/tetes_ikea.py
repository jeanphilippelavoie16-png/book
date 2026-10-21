# Têtes et corps au style notice : contours lisses, un seul trait, aucun détail anatomique.
import numpy as np, subprocess, os
OUT = '/home/user/book/_reprise/scratchpad/modeles/ikea'; os.makedirs(OUT, exist_ok=True)
T = 1.25; N = '#1A1A1A'

def cr(pts, ferme=False, n=10):
    """Catmull-Rom centripète → polyligne lisse passant par les points."""
    P = np.array(pts, float)
    if ferme: P = np.vstack([P[-1], P, P[0], P[1]])
    else: P = np.vstack([2*P[0]-P[1], P, 2*P[-1]-P[-2]])
    out = []
    for i in range(1, len(P)-2):
        p0, p1, p2, p3 = P[i-1], P[i], P[i+1], P[i+2]
        def tj(ti, a, b): return ti + max(np.linalg.norm(b-a), 1e-6)**0.5
        t0 = 0; t1 = tj(t0, p0, p1); t2 = tj(t1, p1, p2); t3 = tj(t2, p2, p3)
        for t in np.linspace(t1, t2, n, endpoint=False):
            A1 = (t1-t)/(t1-t0)*p0 + (t-t0)/(t1-t0)*p1; A2 = (t2-t)/(t2-t1)*p1 + (t-t1)/(t2-t1)*p2; A3 = (t3-t)/(t3-t2)*p2 + (t-t2)/(t3-t2)*p3
            B1 = (t2-t)/(t2-t0)*A1 + (t-t0)/(t2-t0)*A2; B2 = (t3-t)/(t3-t1)*A2 + (t-t1)/(t3-t1)*A3
            out.append((t2-t)/(t2-t1)*B1 + (t-t1)/(t2-t1)*B2)
    if not ferme: out.append(P[-2])
    return np.array(out)

def chemin(pts, ferme=False, fill='none'):
    d = 'M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in pts) + (' Z' if ferme else '')
    return f'<path d="{d}" fill="{fill}" stroke="{N}" stroke-width="{T}" stroke-linecap="round" stroke-linejoin="round"/>'

def tete(x, y, e=1.0, age='adulte', miroir=False):
    """Tête de profil tournée vers la droite ; e = échelle (unités par mm)."""
    if age == 'adulte':
        sil = [(-40, 128), (-62, 70), (-88, 20), (-96, -35), (-78, -90), (-30, -118), (30, -116), (72, -90), (92, -48), (97, -14),
               (93, 4), (106, 28), (118, 46), (101, 56), (100, 70), (99, 86), (95, 108), (80, 122), (50, 122), (34, 130), (36, 150)]
        oreille = [(-6, -6), (8, -14), (16, 2), (12, 26), (2, 40), (-8, 42)]
        cheveux = [(88, -60), (62, -66), (38, -54), (22, -30), (16, -14)]
        oeil = (70, -4); oe = 3.2
    elif age == 'enfant':
        sil = [(-34, 130), (-50, 66), (-84, 30), (-102, -30), (-88, -96), (-36, -132), (30, -134), (76, -106), (96, -60), (100, -10),
               (98, 18), (108, 36), (99, 46), (97, 60), (92, 78), (74, 92), (46, 94), (30, 104), (30, 134)]
        oreille = [(-14, 8), (-2, 0), (6, 14), (2, 32), (-8, 42), (-16, 42)]
        cheveux = [(92, -70), (66, -80), (40, -66), (24, -40), (18, -20)]
        oeil = (72, 10); oe = 3.6
    else:  # bébé
        sil = [(-24, 112), (-40, 64), (-82, 40), (-104, -20), (-92, -92), (-40, -128), (26, -130), (74, -104), (98, -56), (102, -4),
               (100, 22), (108, 36), (99, 46), (96, 60), (84, 76), (62, 84), (38, 86), (26, 96), (26, 112)]
        oreille = [(-16, 22), (-4, 14), (4, 28), (0, 44), (-10, 52), (-18, 50)]
        cheveux = None
        oeil = (74, 22); oe = 3.4
    sx = -1 if miroir else 1
    tr = lambda pts: np.array([(x + sx*px*e, y + py*e) for px, py in pts])
    out = [chemin(tr(cr(sil)), False, '#fff'), chemin(tr(cr(oreille)))]
    if cheveux: out.append(chemin(tr(cr(cheveux))))
    ox, oy = oeil
    out.append(f'<circle cx="{x + sx*ox*e:.2f}" cy="{y + oy*e:.2f}" r="{oe*e:.2f}" fill="{N}"/>')
    return out

def membre(pts, r, n=8):
    """Un membre en tube à contour : deux passes, noir large puis blanc."""
    P = cr(pts, n=n)
    d = 'M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in P)
    return (f'<path d="{d}" fill="none" stroke="{N}" stroke-width="{2*r + 2*T:.2f}" stroke-linecap="round" stroke-linejoin="round"/>',
            f'<path d="{d}" fill="none" stroke="#fff" stroke-width="{2*r:.2f}" stroke-linecap="round" stroke-linejoin="round"/>')

def corps(x, y, e, pose='debout'):
    """Personnage de notice, de profil vers la droite. Couches : bras loin, jambe loin, tronc, jambe près, bras près, tête."""
    S = lambda pts: [(x + px*e, y + py*e) for px, py in pts]
    if pose == 'debout':
        jl = [(-30, -900), (-34, -480), (-40, -70)]; jp = [(20, -900), (24, -480), (26, -70)]
        pl = [(-40, -40), (80, -36)]; pp = [(26, -40), (150, -36)]
        epaule = (10, -1330); hanche = (0, -900)
        bl = [(-10, -1310), (-40, -1060), (-30, -820)]; bp = [(20, -1310), (50, -1060), (60, -820)]
        tete_xy = (25, -1530)
    else:  # à genoux, penché sur le travail
        jl = [(-40, -470), (60, -60), (-330, -55)]; jp = [(10, -470), (130, -60), (-280, -55)]
        pl = []; pp = []
        epaule = (190, -990); hanche = (-10, -480)
        bl = [(180, -960), (320, -760), (450, -620)]; bp = [(210, -960), (360, -740), (500, -600)]
        tete_xy = (290, -1150)
    out = []
    out += membre(S(bl), 36*e)                                           # bras loin
    out += membre(S(jl), 56*e)                                           # jambe loin
    for p in (pl,):
        if p: out += membre(S(p), 30*e)
    # tronc : un bloc plus large aux épaules qu'à la taille
    ex, ey = epaule; hx, hy = hanche
    d = np.array([ex-hx, ey-hy], float); L = np.linalg.norm(d); d /= L; n = np.array([-d[1], d[0]])
    tr = [np.array([hx, hy]) + n*95 + d*0, np.array([hx, hy]) + d*L*0.55 + n*100, np.array([ex, ey]) + n*115 - d*40,
          np.array([ex, ey]) + d*40, np.array([ex, ey]) - n*115 - d*40, np.array([hx, hy]) + d*L*0.55 - n*105, np.array([hx, hy]) - n*95, np.array([hx, hy]) - d*60]
    out.append(chemin(np.array([(x + px*e, y + py*e) for px, py in cr([tuple(p) for p in tr], True)]), True, '#fff'))
    out += membre(S(jp), 56*e)                                           # jambe près
    if pp: out += membre(S(pp), 30*e)
    out += membre(S(bp), 36*e)                                           # bras près
    out += tete(x + tete_xy[0]*e, y + tete_xy[1]*e, e*1.0, 'adulte')
    return out

def svg(fichier, l, h, elems):
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {l} {h}" width="{l}" height="{h}">', f'<rect width="{l}" height="{h}" fill="#fff"/>'] + elems + ['</svg>']
    open(fichier + '.svg', 'w').write('\n'.join(s))
    subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', fichier + '.svg', fichier + '.png'], capture_output=True)
    print(fichier + '.png')

if __name__ == '__main__':
    svg(f'{OUT}/tetes', 760, 300, tete(130, 150, 1.0, 'adulte') + tete(380, 160, 0.82, 'enfant') + tete(610, 175, 0.62, 'bebe'))
    svg(f'{OUT}/corps', 700, 480, corps(160, 460, 0.26, 'debout') + corps(460, 460, 0.26, 'genoux'))
