"""Image de départ du tome 5, quatrième version (après le troisième tour, 18 octobre 2026).

Au troisième tour, la corde de bois sous son petit toit, posée seule à gauche, devenait encore un deuxième
bâtiment. Ici, la corde est appuyée contre le mur de gauche du chalet, sous un appentis qui part de l'avant-toit :
il n'y a plus qu'un bâtiment. Le reste vient de la troisième version (jardin foncé aux plants clairs, sentier clair,
billot et hache).

    PYTHONDONTWRITEBYTECODE=1 python3 scene_tome5_v4.py ete      écrit depart4-ete.svg
    PYTHONDONTWRITEBYTECODE=1 python3 scene_tome5_v4.py automne  écrit depart4-automne.svg
"""
import os
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ICI)
from scene_tome5 import C, W, H, Scene, f, pts, bouleau  # noqa: E402


def plant(s, x, y, sc, coul, sorte):
    """Un plant de jardin vu de trois quarts : touffe de feuilles foncées, nervure claire."""
    A = s.add
    if sorte == 0:      # chou : feuilles rondes qui s'ouvrent
        for a, dx, dy in [(-35, -5, -1), (35, 5, -1), (0, 0, -4), (-70, -7, 2), (70, 7, 2)]:
            A(f'<ellipse cx="{f(x + dx * sc)}" cy="{f(y + dy * sc)}" rx="{f(5.5 * sc)}" ry="{f(3.6 * sc)}" '
              f'transform="rotate({a} {f(x + dx * sc)} {f(y + dy * sc)})" fill="{coul}"/>')
        A(f'<circle cx="{f(x)}" cy="{f(y - 2 * sc)}" r="{f(2.4 * sc)}" fill="{C["paper2"]}"/>')
    else:               # pomme de terre, haricot : touffe dressée de feuilles pointues
        for a in (-50, -25, 0, 25, 50):
            L = 9 * sc * s.u(0.8, 1.1)
            A(f'<ellipse cx="{f(x)}" cy="{f(y - L / 2)}" rx="{f(1.9 * sc)}" ry="{f(L / 2)}" '
              f'transform="rotate({a} {f(x)} {f(y)})" fill="{coul}"/>')
            A(f'<path d="M{f(x)} {f(y)} v{f(-L * 0.8)}" transform="rotate({a} {f(x)} {f(y)})" stroke="{C["paper2"]}" '
              f'stroke-width="{f(0.35 * sc)}" opacity=".8"/>')


def scene(ambiance="ete"):
    s = Scene(5205 if ambiance == "ete" else 5305)
    A = s.add
    automne = ambiance == "automne"
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    A('<defs>'
      f'<linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{C["sky0"]}"/>'
      f'<stop offset=".5" stop-color="{C["sky1"]}"/><stop offset="1" stop-color="{C["sky2"]}"/></linearGradient>'
      f'<radialGradient id="halo"><stop offset=".35" stop-color="{C["glow"]}" stop-opacity=".4"/>'
      f'<stop offset="1" stop-color="{C["glow"]}" stop-opacity="0"/></radialGradient>'
      '</defs>')
    A(f'<rect x="0" y="0" width="{W}" height="{H}" fill="url(#ciel)"/>')

    # le soleil bas, ses anneaux, quelques longues lignes de ciel près de l'horizon
    sx, sy = (585, 486) if not automne else (180, 480)
    A(f'<circle cx="{sx}" cy="{sy}" r="180" fill="url(#halo)"/>')
    for k, r in enumerate([140, 110, 86]):
        A(f'<circle cx="{sx}" cy="{sy}" r="{r}" fill="none" stroke="{C["sun2"]}" stroke-width="{2.2 - k * 0.4}" opacity="{.25 + k * .1}"/>')
    A(f'<circle cx="{sx}" cy="{sy}" r="60" fill="{C["sun"]}"/>')
    for i in range(6):
        y = 410 + i * 12
        x0 = s.u(-20, 120) if i % 2 else s.u(250, 380)
        A(f'<path d="M{f(x0)} {f(y)} h{f(s.u(160, 300))}" stroke="{C["paper2"]}" stroke-width="{f(s.u(1.2, 2))}" '
          f'stroke-linecap="round" opacity="{f(s.u(.16, .28))}"/>')

    # collines basses
    loin = s.onde(510, [(9, 0.8), (5, 1.9), (2, 6)])
    A(f'<polygon points="{pts(loin + [(W + 40, 700), (-20, 700)])}" fill="{C["far"]}"/>')
    for i in range(9):
        y = 522 + i * 7
        A(f'<path d="M{f(s.u(-20, 300))} {f(y)} q{f(s.u(80, 160))} {f(s.u(-6, 6))} {f(s.u(200, 420))} {f(s.u(-4, 4))}" fill="none" '
          f'stroke="{C["sun2"]}" stroke-width="1.2" opacity=".32"/>')
    milieu = s.onde(556, [(8, 1.1), (4, 2.7), (2, 7)])
    A(f'<polygon points="{pts(milieu + [(W + 40, 720), (-20, 720)])}" fill="{C["mid"]}"/>')
    ym = lambda x: min(y for xx, y in milieu if abs(xx - x) <= 6)
    s.rangee(ym, -10, W + 30, 10, 20, C["mid"], dens=0.9)

    # la forêt derrière le chalet : épinettes et bouleaux feuillus
    bord = s.onde(646, [(4, 1.7), (2, 4.4)])
    A(f'<polygon points="{pts(bord + [(W + 40, 720), (-20, 720)])}" fill="{C["near"]}"/>')
    s.rangee(lambda x: 652, -10, W + 30, 50, 105, C["near"], dens=1.3)
    for x, h in [(80, 118), (330, 104), (560, 120), (612, 96)]:
        bouleau(s, x, 656, h, C["far"], feuilles_orange=automne)

    # la clairière
    sol = s.onde(664, [(3, 1.2), (1.5, 3.5)])
    A(f'<polygon points="{pts(sol + [(W + 40, H + 40), (-20, H + 40)])}" fill="{C["far"]}"/>')
    for _ in range(320):          # l'herbe de la clairière, en petits coups de gouge clairs et foncés
        x, y = s.u(-10, W + 10), s.u(668, 746)
        h = s.u(3, 8) * (0.6 + (y - 668) / 70)
        coul = C["paper2"] if s.r.random() < 0.45 else C["near"]
        A(f'<path d="M{f(x)} {f(y)} l{f(s.u(-2, 2))} {f(-h)}" stroke="{coul}" stroke-width="1.3" stroke-linecap="round" opacity=".85"/>')

    # le chalet en rondins, toit foncé
    cx, cy = 420, 684
    A(f'<g transform="translate({cx} {cy})">')
    A(f'<rect x="70" y="-94" width="13" height="36" fill="{C["front"]}"/>')
    A(f'<polygon points="-4,-46 104,-46 105,2 -5,3" fill="{C["log"]}"/>')
    for i in range(9):
        y = -42 + i * 5.1
        A(f'<path d="M-6 {f(y)} H106" stroke="{C["front"]}" stroke-width="1.3"/>')
        A(f'<circle cx="-6" cy="{f(y + 1)}" r="2.6" fill="{C["logend"]}"/><circle cx="106" cy="{f(y + 1)}" r="2.6" fill="{C["logend"]}"/>')
    A(f'<polygon points="-18,-42 50,-94 118,-42" fill="{C["front"]}"/>')
    A(f'<rect x="14" y="-32" width="20" height="17" fill="{C["win"]}"/>')
    A(f'<path d="M24 -32 v17 M14 -23.5 h20" stroke="{C["front"]}" stroke-width="1.6"/>')
    A(f'<rect x="58" y="-30" width="15" height="30" fill="{C["front"]}"/>')
    A(f'<path d="M-8 2 H108" stroke="{C["front"]}" stroke-width="3"/>')
    A('</g>')
    d = (f"M{cx + 76} {cy - 96} C{cx + 70} {cy - 122} {cx + 98} {cy - 130} {cx + 92} {cy - 154} "
         f"C{cx + 86} {cy - 178} {cx + 120} {cy - 192} {cx + 150} {cy - 198}")
    for w, op in [(14, .10), (8, .16), (3.5, .25)]:
        A(f'<path d="{d}" fill="none" stroke="{C["paper"]}" stroke-width="{w}" stroke-linecap="round" opacity="{op}"/>')

    # la corde de bois contre le mur de gauche du chalet, sous un appentis qui part de l'avant-toit
    bx, by = 262, 686
    larg = cx - 8 - bx
    nrang = 4 if not automne else 5
    pas = 10.5
    haut = nrang * pas
    A(f'<path d="M{cx - 4} {by - haut - 16} L{bx - 12} {by - haut - 2} L{bx - 12} {by - haut + 4} L{cx - 4} {by - haut - 10}Z" '
      f'fill="{C["front"]}"/>')
    A(f'<rect x="{bx - 9}" y="{by - haut - 2}" width="6" height="{haut + 2}" fill="{C["front"]}"/>')
    A(f'<rect x="{bx}" y="{by - haut}" width="{larg}" height="{haut}" fill="{C["log"]}"/>')
    for row in range(nrang):
        k = 0
        while True:
            x = bx + 6 + k * pas + (pas / 2 if row % 2 else 0) + s.u(-1.2, 1.2)
            if x > bx + larg - 4:
                break
            y = by - 5.5 - row * pas + s.u(-0.8, 0.8)
            r = s.u(4.2, 5.2)
            if s.r.random() < 0.3:
                A(f'<path d="M{f(x - r)} {f(y + r * 0.6)} L{f(x)} {f(y - r)} L{f(x + r)} {f(y + r * 0.6)}Z" fill="{C["logend"]}"/>')
            else:
                A(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{C["logend"]}"/>')
                A(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r * 0.5)}" fill="none" stroke="{C["log"]}" stroke-width=".8" opacity=".7"/>')
            k += 1

    # la clôture de perches devant le jardin
    fy = 734
    A(f'<path d="M-20 {fy - 10} L{W + 20} {fy - 14}" stroke="{C["front"]}" stroke-width="3"/>')
    A(f'<path d="M-20 {fy} L{W + 20} {fy - 4}" stroke="{C["front"]}" stroke-width="3"/>')
    for x in range(10, W, 64):
        A(f'<path d="M{x} {fy + 8} L{x + 1} {fy - 26}" stroke="{C["front"]}" stroke-width="4" stroke-linecap="round"/>')

    # le jardin : terre foncée, rangs de plants clairs en perspective
    vx, vy = 440, 600
    top = 748
    A(f'<rect x="-20" y="{top - 6}" width="{W + 40}" height="{H - top + 50}" fill="{C["soil"]}"/>')
    rangs = [vx + i * 104 for i in range(-10, 13)]
    for i, xb in enumerate(rangs):
        def at(y, xb=xb):
            return vx + (xb - vx) * (y - vy) / (H + 40 - vy)
        A(f'<polygon points="{f(at(top) - 1)},{top} {f(at(top) + 1)},{top} {f(at(H + 40) + 5)},{H + 40} {f(at(H + 40) - 5)},{H + 40}" '
          f'fill="{C["front"]}"/>')
        if i + 1 < len(rangs):
            xb2 = rangs[i + 1]
            sorte = i % 2
            y = top + 4
            while y < H + 20:
                t = (y - vy) / (H + 40 - vy)
                xm = vx + ((xb + xb2) / 2 - vx) * t
                sc = 0.45 + 2.0 * (y - top) / (H - top)
                if automne and sorte == 0 and s.r.random() < 0.3 and y > 800:
                    A(f'<ellipse cx="{f(xm)}" cy="{f(y)}" rx="{f(7 * sc)}" ry="{f(5 * sc)}" fill="{C["sun"]}"/>')
                else:
                    plant(s, xm, y, sc, C["logend"], sorte)
                y += 10 + 30 * (y - top) / (H - top)

    # le sentier clair, du bas de l'image à la porte du chalet (une barrière ouverte dans la clôture)
    A(f'<path d="M478 688 C474 712 470 730 462 748 C440 800 380 880 330 {H + 40} L560 {H + 40} C520 880 496 800 488 748 '
      f'C484 730 484 712 490 688Z" fill="{C["paper"]}"/>')
    for _ in range(40):
        y = s.u(752, 950)
        t = (y - 748) / 200
        x = s.u(462 - 130 * t, 488 + 70 * t)
        A(f'<path d="M{f(x)} {f(y)} h{f(s.u(4, 14) * (0.4 + t))}" stroke="{C["paper2"]}" stroke-width="{f(1 + 1.5 * t)}" stroke-linecap="round"/>')
    # le coin de terre battue autour du billot
    A(f'<ellipse cx="176" cy="905" rx="150" ry="48" fill="{C["paper2"]}"/>')

    # le billot de fente, la hache plantée, des quartiers fendus et des copeaux
    kx, ky = 176, 852
    A(f'<ellipse cx="{kx}" cy="{ky + 66}" rx="86" ry="16" fill="{C["far"]}"/>')
    A(f'<path d="M{kx - 58} {ky} L{kx - 62} {ky + 64} Q{kx} {ky + 80} {kx + 62} {ky + 64} L{kx + 58} {ky}Z" fill="{C["log"]}"/>')
    for i in range(7):
        x = kx - 50 + i * 16.5
        A(f'<path d="M{f(x)} {ky + 8} v{f(s.u(38, 56))}" stroke="{C["front"]}" stroke-width="2"/>')
    A(f'<ellipse cx="{kx}" cy="{ky}" rx="58" ry="15" fill="{C["logend"]}"/>')
    for r in (44, 32, 20, 9):
        A(f'<ellipse cx="{kx + 2}" cy="{ky}" rx="{r}" ry="{f(r * 0.26)}" fill="none" stroke="{C["log"]}" stroke-width="1.1"/>')
    A(f'<path d="M{kx - 6} {ky - 3} L{kx + 78} {ky - 96}" stroke="{C["front"]}" stroke-width="10" stroke-linecap="round"/>')
    A(f'<path d="M{kx - 30} {ky + 3} L{kx - 10} {ky - 20} L{kx + 10} {ky - 4} L{kx - 8} {ky + 8}Z" fill="{C["front"]}"/>')
    A(f'<path d="M{kx - 30} {ky + 3} L{kx - 22} {ky - 6}" stroke="{C["paper"]}" stroke-width="2.5"/>')
    for (x, y, a) in [(kx + 92, ky + 54, -15), (kx + 118, ky + 72, 12), (kx - 104, ky + 58, 20)]:
        A(f'<g transform="rotate({a} {x} {y})"><path d="M{x - 30} {y - 9} L{x + 26} {y - 9} L{x + 26} {y + 8} L{x - 30} {y + 8}Z" '
          f'fill="{C["log"]}"/><path d="M{x + 26} {y - 9} L{x + 34} {y - 0.5} L{x + 26} {y + 8}Z" fill="{C["logend"]}"/></g>')
    for _ in range(14):
        x, y = kx + s.u(-90, 110), ky + s.u(60, 90)
        A(f'<path d="M{f(x)} {f(y)} l{f(s.u(4, 9))} {f(s.u(-2, 2))}" stroke="{C["logend"]}" stroke-width="2.4" stroke-linecap="round"/>')

    # herbe haute et épilobes dans les coins du bas
    for x0, x1 in ((-10, 120), (620, 780)):
        for _ in range(26):
            x = s.u(x0, x1)
            h = s.u(40, 110)
            b = H + 10
            A(f'<path d="M{f(x)} {f(b)} q{f(s.u(-8, 8))} {f(-h / 2)} {f(s.u(-14, 14))} {f(-h)}" fill="none" stroke="{C["front"]}" '
              f'stroke-width="{f(s.u(1.5, 3))}" stroke-linecap="round"/>')

    # les grandes épinettes du premier plan, de chaque côté
    for x, bas, h, l in [(-14, 1000, 400, 104), (44, 990, 240, 62), (728, 1010, 420, 108), (672, 985, 210, 54)]:
        s.epinette(x, bas, h, l, C["front"])
    A('</svg>')
    return "\n".join(s.out)


if __name__ == "__main__":
    amb = sys.argv[1] if len(sys.argv) > 1 else "ete"
    out = os.path.join(ICI, f"depart4-{amb}.svg")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(scene(amb) + "\n")
    print(out)
