"""Image de départ du tome 3 (Prélever) pour le générateur : l'aube d'automne sur un lac de la forêt boréale.

Composition imposée, trois encres : vert forêt très foncé #1D392E, papier blanc cassé, orange #EE7219. Le ciel du
haut reste foncé et vide (le titre s'y pose en clair) ; le soleil se lève derrière des collines basses ; brume sur
l'eau ; mélèzes dorés parmi les épinettes noires ; un orignal sur la rive d'en face ; un canot tiré sur la grève ; le
bas reste clair (la série des tomes s'y pose en foncé).

    python3 scene_tome3.py lac       écrit depart-lac.svg
    python3 scene_tome3.py fleuve    écrit depart-fleuve.svg

Les épinettes viennent de images/tomes/scene_titre.py (importé, pas modifié).
"""
import math
import os
import sys

sys.dont_write_bytecode = True
ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(ICI, "..", "..")))
from scene_titre import Scene, f, pts, W, H  # noqa: E402

V = "#1D392E"       # vert forêt du tome 3
V2 = "#2E5444"      # le même vert, plus clair : seulement pour la profondeur de l'image de départ
P = "#EFE8D8"       # papier blanc cassé
O = "#EE7219"       # orange


def rayures(s, y0, y1, x0=-20, x1=W + 20, soleil=None):
    """Ciel de linogravure : des traits de gouge horizontaux, de plus en plus larges vers l'horizon ; orange près
    du soleil."""
    y = y0
    k = 0
    while y < y1:
        t = (y - y0) / (y1 - y0)
        ep = 0.6 + 7.5 * t ** 1.6
        x = x0 + s.u(-30, 10)
        while x < x1:
            long = s.u(60, 260)
            yy = y + s.u(-1.2, 1.2)
            coul = P
            if soleil:
                sx, sy, sr = soleil
                d = math.hypot((x + long / 2 - sx) / 1.6, yy - sy)
                if d < sr * (1.0 + 2.2 * t):
                    coul = O
            s.add(f'<path d="M{f(x)} {f(yy)} q{f(long / 2)} {f(s.u(-1.5, 1.5))} {f(long)} 0" stroke="{coul}" '
                  f'stroke-width="{f(ep * s.u(0.6, 1.1))}" stroke-linecap="round" fill="none"/>')
            x += long + s.u(6, 40) * (1.2 - t)
        y += 4 + 10 * (1 - t) ** 1.5
        k += 1


def melezes(s, ybas, x0, x1, hmin, hmax, dens=1.0, p_orange=0.35, foncee=V):
    """Rive d'épinettes noires, avec des mélèzes dorés (cône étroit et clair, en orange) mêlés."""
    x = x0
    while x < x1:
        h = s.u(hmin, hmax)
        if s.r.random() < p_orange:
            larg = h * s.u(0.32, 0.4)
            bas = ybas(x) + 2
            d = (f"M{f(x)} {f(bas - h)} Q{f(x + larg * 0.2)} {f(bas - h * 0.55)} {f(x + larg / 2)} {f(bas - 2)} "
                 f"L{f(x - larg / 2)} {f(bas - 2)} Q{f(x - larg * 0.2)} {f(bas - h * 0.55)} {f(x)} {f(bas - h)}Z")
            s.add(f'<path d="{d}" fill="{O}"/>')
            for i in range(int(h / 7)):      # étages des mélèzes, gravés
                yy = bas - h + 6 + i * 7
                ww = (yy - (bas - h)) / h * larg * 0.45
                s.add(f'<path d="M{f(x - ww)} {f(yy)} q{f(ww)} 3 {f(2 * ww)} 0" stroke="{V}" stroke-width=".9" fill="none" opacity=".7"/>')
            s.add(f'<path d="M{f(x)} {f(bas - h)} V{f(bas)}" stroke="{V}" stroke-width=".8"/>')
        else:
            s.epinette(x, ybas(x) + 2, h, h * s.u(0.2, 0.28), foncee)
        x += h * s.u(0.16, 0.34) / dens


def orignal(x, y, e=1.0, coul=V):
    """Silhouette d'orignal mâle de profil, tourné vers la gauche ; (x, y) = sol sous les sabots avant."""
    corps = [(-2, -52), (0, -59), (6, -62), (14, -66), (19, -71), (26, -76), (34, -80), (42, -83), (52, -80),
             (64, -75), (76, -73), (85, -70), (89, -62), (88, -52), (85, -44), (82, -30), (85, -21), (83, 0),
             (79, 0), (78, -20), (75, -34), (68, -42), (56, -43), (44, -42), (40, -35), (39, 0), (35, 0),
             (33, -34), (30, -44), (26, -44), (24, -36), (21, -36), (20, -45), (14, -49), (7, -48), (1, -48)]
    pal1 = [(13, -69), (4, -73), (-4, -79), (-9, -86), (-6, -88), (-3, -84), (-1, -91), (3, -86), (5, -94),
            (8, -86), (11, -91), (13, -82), (16, -73)]
    pal2 = [(18, -72), (24, -79), (27, -89), (30, -84), (33, -93), (36, -85), (40, -90), (41, -81), (37, -76),
            (28, -73)]
    jambes = [(45, -40), (47, 0), (50, 0), (49, -40), (70, -40), (73, -22), (72, 0), (75, 0), (77, -24), (74, -40)]
    out = []
    for poly in (corps, pal1, pal2):
        out.append(f'<polygon points="{pts([(x + a * e, y + b * e) for a, b in poly])}" fill="{coul}"/>')
    # les jambes du côté loin
    for k in (0, 4):
        q = jambes[k:k + 4] if k == 0 else jambes[4:10]
        out.append(f'<polygon points="{pts([(x + a * e, y + b * e) for a, b in q])}" fill="{coul}"/>')
    return out


def canot(cx, cy, L, coul=V):
    """Canot d'écorce tiré sur la grève, de profil, la pince relevée aux deux bouts."""
    h = L * 0.085
    d = (f"M{f(cx - L / 2)} {f(cy - h * 1.9)} "
         f"C{f(cx - L * 0.47)} {f(cy - h * 0.6)} {f(cx - L * 0.38)} {f(cy + h * 0.15)} {f(cx - L * 0.2)} {f(cy + h * 0.2)} "
         f"L{f(cx + L * 0.2)} {f(cy + h * 0.2)} "
         f"C{f(cx + L * 0.38)} {f(cy + h * 0.15)} {f(cx + L * 0.47)} {f(cy - h * 0.6)} {f(cx + L / 2)} {f(cy - h * 1.9)} "
         f"C{f(cx + L * 0.44)} {f(cy - h * 1.1)} {f(cx + L * 0.36)} {f(cy - h * 0.95)} {f(cx + L * 0.25)} {f(cy - h * 0.95)} "
         f"Q{f(cx)} {f(cy - h * 0.8)} {f(cx - L * 0.25)} {f(cy - h * 0.95)} "
         f"C{f(cx - L * 0.36)} {f(cy - h * 0.95)} {f(cx - L * 0.44)} {f(cy - h * 1.1)} {f(cx - L / 2)} {f(cy - h * 1.9)}Z")
    out = [f'<path d="{d}" fill="{coul}"/>']
    # le plat-bord et les coutures d'écorce, gravés dans le noir
    out.append(f'<path d="M{f(cx - L * 0.46)} {f(cy - h * 1.35)} C{f(cx - L * 0.35)} {f(cy - h * 0.75)} {f(cx + L * 0.35)} '
               f'{f(cy - h * 0.75)} {f(cx + L * 0.46)} {f(cy - h * 1.35)}" stroke="{P}" stroke-width="1.6" fill="none"/>')
    for k in (-0.3, -0.12, 0.06, 0.24):
        xx = cx + L * k
        out.append(f'<path d="M{f(xx)} {f(cy - h * 0.7)} q2 {f(h * 0.4)} 0 {f(h * 0.8)}" stroke="{P}" stroke-width=".9" fill="none" opacity=".8"/>')
    # l'aviron couché contre le canot
    out.append(f'<path d="M{f(cx - L * 0.15)} {f(cy + h * 0.9)} L{f(cx + L * 0.32)} {f(cy - h * 0.2)}" stroke="{coul}" stroke-width="3" stroke-linecap="round"/>')
    out.append(f'<ellipse cx="{f(cx + L * 0.36)}" cy="{f(cy - h * 0.35)}" rx="{f(L * 0.07)}" ry="{f(h * 0.45)}" '
               f'transform="rotate(-14 {f(cx + L * 0.36)} {f(cy - h * 0.35)})" fill="{coul}"/>')
    return out


def lac(gros=False):
    """gros : l'orignal et le canot plus grands, le soleil à gauche (pour qu'ils survivent à l'img2img)."""
    s = Scene(3003)
    A = s.add
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    A('<defs><filter id="grain" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".9" '
      'numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .2  0 0 0 0 .15  0 0 0 .22 0"/></filter></defs>')
    A(f'<rect x="-20" y="-20" width="{W + 40}" height="{H + 40}" fill="{V}"/>')
    sx, sy, sr = (250, 566, 30) if gros else (520, 566, 30)
    # le ciel : vide en haut, rayé de gouge près de l'horizon
    rayures(s, 430, 590, soleil=(sx, sy, sr))
    # le soleil qui se lève derrière les collines, et ses anneaux gravés
    for rr, w in [(sr + 22, 2.2), (sr + 12, 2.8)]:
        A(f'<circle cx="{sx}" cy="{sy}" r="{rr}" fill="none" stroke="{O}" stroke-width="{w}"/>')
    A(f'<circle cx="{sx}" cy="{sy}" r="{sr}" fill="{O}"/>')
    # les collines du fond, basses et rondes, en demi-teinte (traits de papier gravés)
    loin = s.onde(574, [(9, 0.8), (6, 1.9), (2, 5)])
    A(f'<polygon points="{pts(loin + [(W + 40, 700), (-20, 700)])}" fill="{V2}"/>')
    A(f'<clipPath id="colline"><polygon points="{pts(loin + [(W + 40, 700), (-20, 700)])}"/></clipPath><g clip-path="url(#colline)">')
    for i in range(16):
        yy = 566 + i * 3.6
        x = -20 + s.u(0, 40)
        while x < W:
            long = s.u(40, 160)
            A(f'<path d="M{f(x)} {f(yy)} h{f(long)}" stroke="{P}" stroke-width="{f(s.u(.8, 1.6))}" opacity=".55"/>')
            x += long + s.u(6, 30)
    A('</g>')
    milieu = s.onde(604, [(6, 1.2), (4, 2.9)])
    A(f'<polygon points="{pts(milieu + [(W + 40, 700), (-20, 700)])}" fill="{V2}"/>')
    ym = lambda x: min(y for xx, y in milieu if abs(xx - x) <= 6)
    s.rangee(ym, -10, W + 30, 6, 12, V2, dens=0.9)
    # la rive d'en face : épinettes noires et quelques mélèzes dorés
    rive = lambda x: 640 + 2 * math.sin(x / 40)
    A(f'<rect x="-20" y="630" width="{W + 40}" height="16" fill="{V}"/>')
    melezes(s, rive, -10, W + 30, 14, 46, dens=1.4, p_orange=0.16)
    # le lac : papier, traits de gouge horizontaux
    A(f'<rect x="-20" y="644" width="{W + 40}" height="200" fill="{P}"/>')
    for i in range(34):
        yy = 650 + i * 5.2
        x = -20 + s.u(0, 60)
        while x < W:
            long = s.u(20, 120)
            if not (sx - 30 < x + long / 2 < sx + 30) or s.r.random() < 0.3:
                A(f'<path d="M{f(x)} {f(yy + s.u(-1, 1))} h{f(long)}" stroke="{V}" stroke-width="{f(s.u(.8, 2.2) * (1.3 - i / 40))}" stroke-linecap="round"/>')
            x += long + s.u(10, 50)
    # la brume sur l'eau, en bandes de papier
    for y0, op in [(636, .55), (646, .8), (662, .5)]:
        b = s.onde(y0, [(3, 1.3), (2, 3.1)], pas=8)
        A(f'<path d="M{pts(b)} L{W + 40} {y0 + 9} L-20 {y0 + 9}Z" fill="{P}" opacity="{op}"/>')
    # le reflet du soleil
    for i in range(18):
        yy = 652 + i * 6
        w = 54 - i * 2.2 + s.u(-6, 6)
        A(f'<path d="M{f(sx - w / 2 + s.u(-4, 4))} {f(yy)} h{f(w)}" stroke="{O}" stroke-width="{f(s.u(2, 3.4))}" stroke-linecap="round"/>')
    # l'orignal sur la rive d'en face, dans l'eau jusqu'aux sabots, et son reflet
    ox, oy, oe = (520, 736, 1.15) if gros else (590, 704, 0.72)
    for p in orignal(ox, oy, e=oe):
        A(p.replace("<polygon", f'<polygon transform="translate(0 {2 * oy}) scale(1 -1)" opacity=".3"', 1))
    A(f'<rect x="{ox - 10}" y="{oy - 2}" width="{f(100 * oe)}" height="{f(60 * oe)}" fill="{P}" opacity=".55"/>')
    for p in orignal(ox, oy, e=oe):
        A(p)
    for i in range(4):
        A(f'<path d="M{f(ox - 14 - i * 6)} {f(oy + 2 + i * 5)} h{f(90 * oe + i * 12)}" stroke="{V}" stroke-width="1.4" stroke-linecap="round"/>')
    # la grève de ce côté-ci, à gauche, qui avance dans le lac
    greve = [(-20, 760), (60, 752), (180, 758), (300, 776), (420, 802), (520, 826), (640, 846), (W + 40, 852),
             (W + 40, H + 40), (-20, H + 40)]
    A(f'<polygon points="{pts(greve)}" fill="{P}"/>')
    for k in range(3):
        A(f'<path d="M-20 {758 - k * 7} C120 {746 - k * 7} 260 {768 - k * 7} 420 {800 - k * 7} S640 {844 - k * 7} {W + 40} {850 - k * 7}" '
          f'stroke="{V}" stroke-width="{2.4 - k * 0.6}" stroke-dasharray="{30 + k * 10} {8 + k * 9}" fill="none"/>')
    for _ in range(170):        # les galets, gravés
        x, y = s.u(0, W), s.u(770, 950)
        if y < 760 + (x / W) * 90 + 6:
            continue
        if 176 < x < 600 and y > 860:
            continue                  # la série des tomes se pose ici
        r = s.u(1.5, 5)
        A(f'<ellipse cx="{f(x)}" cy="{f(y)}" rx="{f(r * 1.6)}" ry="{f(r)}" fill="none" stroke="{V}" stroke-width="1.1" opacity=".75"/>')
    for i in range(6):            # quelques traits de sable
        y = 880 + i * 12
        A(f'<path d="M{f(s.u(170, 260))} {y} h{f(s.u(120, 300))}" stroke="{V}" stroke-width=".9" opacity=".35"/>')
    # le canot d'écorce tiré sur la grève, la pince vers l'eau
    for p in (canot(300, 836, 320) if gros else canot(345, 818, 230)):
        A(p)
    # les grands arbres du premier plan : épinettes noires à gauche, un mélèze doré et des épinettes à droite
    for x, bas, h, l in [(-4, 990, 430, 104), (64, 960, 300, 70), (118, 880, 150, 38)]:
        s.epinette(x, bas, h, l, V)
    for x, bas, h, l in [(726, 1000, 400, 98), (668, 960, 250, 60)]:
        s.epinette(x, bas, h, l, V)
    # mélèze doré, haut, à droite
    x, bas, h = 168, 846, 250
    for i in range(16):
        yy = bas - h + 12 + i * 13
        ww = 6 + (yy - (bas - h)) / h * 44
        A(f'<path d="M{f(x)} {f(yy - 6)} q{f(-ww * 0.5)} 2 {f(-ww)} 10 q{f(ww * 0.6)} -2 {f(ww)} -4 '
          f'q{f(ww * 0.4)} 2 {f(ww)} 4 q{f(-ww * 0.5)} -8 {f(-ww)} -10z" fill="{O}"/>')
    A(f'<path d="M{x} {bas - h} V{bas}" stroke="{V}" stroke-width="3"/>')
    A(f'<rect x="-20" y="-20" width="{W + 40}" height="{H + 40}" filter="url(#grain)"/>')
    A('</svg>')
    return "\n".join(s.out)


def outarde(x, y, e=1.0, ang=0, coul=V):
    """Outarde en vol, de profil, ailes en haut ; (x, y) = le corps."""
    corps = [(-14, 0), (-8, -2), (6, -2), (12, -1), (16, -3), (20, -3), (21, -2), (17, 0), (10, 2), (-6, 2), (-12, 3)]
    aile = [(-4, -1), (-8, -12), (-14, -18), (-6, -14), (2, -2)]
    aile2 = [(-2, 1), (-4, 10), (-10, 14), (-2, 10), (4, 1)]
    out = []
    for poly in (corps, aile, aile2):
        out.append(f'<polygon points="{pts([(x + a * e, y + b * e) for a, b in poly])}" fill="{coul}" '
                   f'transform="rotate({ang} {x} {y})"/>')
    return out


def phoque(x, y, e=1.0, coul=V):
    """Phoque couché sur une roche, la tête relevée vers la gauche ; (x, y) = le dessous du ventre."""
    d = [(-30, -16), (-34, -19), (-37, -18), (-38, -15), (-34, -11), (-26, -6), (-14, -2), (0, 0), (14, 0), (26, -1),
         (34, 2), (40, 0), (36, -4), (28, -6), (16, -10), (0, -13), (-14, -14), (-22, -16)]
    return [f'<polygon points="{pts([(x + a * e, y + b * e) for a, b in d])}" fill="{coul}"/>']


def fleuve():
    s = Scene(3013)
    A = s.add
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    A('<defs><filter id="grain" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".9" '
      'numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .2  0 0 0 0 .15  0 0 0 .22 0"/></filter></defs>')
    A(f'<rect x="-20" y="-20" width="{W + 40}" height="{H + 40}" fill="{V}"/>')
    hz = 590
    sx, sy, sr = 410, hz, 34
    rayures(s, 440, hz + 4, soleil=(sx, sy, sr))
    for rr, w in [(sr + 24, 2.2), (sr + 13, 2.8)]:
        A(f'<circle cx="{sx}" cy="{sy}" r="{rr}" fill="none" stroke="{O}" stroke-width="{w}"/>')
    A(f'<circle cx="{sx}" cy="{sy}" r="{sr}" fill="{O}"/>')
    # l'eau salée, large comme la mer
    A(f'<rect x="-20" y="{hz}" width="{W + 40}" height="{H}" fill="{P}"/>')
    # la côte d'en face, mince et basse, à gauche
    cote = s.onde(hz - 6, [(3, 1.4), (1.5, 4)], x0=-20, x1=300)
    A(f'<polygon points="{pts(cote + [(300, hz + 1), (-20, hz + 1)])}" fill="{V2}"/>')
    for i in range(46):
        yy = hz + 6 + i * (3 + i * 0.12)
        x = -20 + s.u(0, 60)
        while x < W:
            long = s.u(20, 140)
            if not (sx - 34 - i < x + long / 2 < sx + 34 + i) or s.r.random() < 0.25:
                A(f'<path d="M{f(x)} {f(yy + s.u(-1, 1))} h{f(long)}" stroke="{V}" stroke-width="{f(s.u(.7, 1.8) * (0.8 + i / 50))}" stroke-linecap="round"/>')
            x += long + s.u(10, 60)
    for i in range(24):       # le chemin de lumière du soleil sur l'eau
        yy = hz + 6 + i * 6.5
        w = 60 - i * 1.6 + s.u(-8, 8)
        A(f'<path d="M{f(sx - w / 2 + s.u(-5, 5))} {f(yy)} h{f(w)}" stroke="{O}" stroke-width="{f(s.u(2, 3.6))}" stroke-linecap="round"/>')
    # les outardes en V, au ras de l'eau
    for k in range(9):
        side = 1 if k % 2 else -1
        rang = (k + 1) // 2
        x = 220 - rang * 22
        y = 618 + side * rang * 7
        for p in outarde(x, y, e=0.62, ang=-4):
            A(p)
    # la pointe rocheuse à droite, ses épinettes et ses mélèzes
    pointe = [(430, 700), (470, 676), (520, 664), (580, 650), (640, 640), (W + 40, 630), (W + 40, 760), (430, 760)]
    A(f'<polygon points="{pts(pointe)}" fill="{V}"/>')
    for x, y, w in [(460, 690, 30), (520, 676, 44), (610, 664, 50), (700, 654, 60)]:
        A(f'<path d="M{x - w / 2} {y + 8} q{w * 0.2} -14 {w / 2} -14 q{w * 0.3} 2 {w / 2} 14" stroke="{P}" stroke-width="1.3" fill="none" opacity=".7"/>')
    xs = lambda x: 640 if x > 620 else (660 if x > 540 else 674)
    melezes(s, xs, 500, W + 30, 50, 130, dens=1.0, p_orange=0.25)
    # le phoque sur sa roche
    A(f'<path d="M318 768 q10 -20 46 -20 q36 0 46 20z" fill="{V}"/>')
    A(f'<path d="M331 760 q20 -10 40 -6" stroke="{P}" stroke-width="1.2" fill="none" opacity=".7"/>')
    for p in phoque(366, 748, e=0.95):
        A(p)
    # la pêche à fascines : une ligne de piquets dans l'eau, le filet entre eux
    for k in range(10):
        x = 60 + k * 23
        y = 742 - k * 3.2
        hh = 40 - k * 1.4
        A(f'<path d="M{f(x)} {f(y)} v{f(-hh)}" stroke="{V}" stroke-width="{f(3 - k * 0.1)}" stroke-linecap="round"/>')
        if k:
            A(f'<path d="M{f(x - 23)} {f(y + 3.2 - hh * 0.8)} q11.5 4 23 {f(-0.2)}" stroke="{V}" stroke-width=".8" fill="none"/>')
            A(f'<path d="M{f(x - 23)} {f(y + 3.2 - hh * 0.3)} q11.5 3 23 0" stroke="{V}" stroke-width=".8" fill="none"/>')
    # la grève à marée basse, galets et varech
    greve = [(-20, 790), (140, 782), (300, 792), (460, 808), (620, 820), (W + 40, 826), (W + 40, H + 40), (-20, H + 40)]
    A(f'<polygon points="{pts(greve)}" fill="{P}"/>')
    for k in range(3):
        A(f'<path d="M-20 {788 - k * 7} C140 {778 - k * 7} 300 {790 - k * 7} 460 {806 - k * 7} S640 {820 - k * 7} {W + 40} {824 - k * 7}" '
          f'stroke="{V}" stroke-width="{2.4 - k * 0.6}" stroke-dasharray="{30 + k * 10} {8 + k * 9}" fill="none"/>')
    for _ in range(150):
        x, y = s.u(0, W), s.u(800, 950)
        if y < 790 + (x / W) * 36 + 8 or (176 < x < 600 and y > 860):
            continue
        r = s.u(1.5, 5)
        A(f'<ellipse cx="{f(x)}" cy="{f(y)}" rx="{f(r * 1.6)}" ry="{f(r)}" fill="none" stroke="{V}" stroke-width="1.1" opacity=".75"/>')
    for _ in range(9):        # le varech
        x, y = s.u(20, 740), s.u(810, 850)
        A(f'<path d="M{f(x)} {f(y)} q{f(s.u(8, 16))} -6 {f(s.u(20, 40))} 2 q-12 4 {f(-s.u(20, 40))} -2z" fill="{O}" opacity=".85"/>')
    # la chaloupe tirée sur la grève, à gauche
    for p in canot(190, 842, 200):
        A(p)
    # deux épinettes au bord gauche
    for x, bas, h, l in [(-6, 990, 360, 90), (54, 960, 220, 54)]:
        s.epinette(x, bas, h, l, V)
    A(f'<rect x="-20" y="-20" width="{W + 40}" height="{H + 40}" filter="url(#grain)"/>')
    A('</svg>')
    return "\n".join(s.out)


if __name__ == "__main__":
    quoi = sys.argv[1] if len(sys.argv) > 1 else "lac"
    svg = {"lac": lac, "lac2": lambda: lac(True), "fleuve": fleuve}[quoi]()
    out = os.path.join(ICI, f"depart-{quoi}.svg")
    open(out, "w", encoding="utf-8").write(svg + "\n")
    print(out)
