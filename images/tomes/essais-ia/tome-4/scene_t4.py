"""Image de départ du tome 4 (De la bête au garde-manger) : la composition imposée au générateur (img2img).

Soir de fin d'automne, première neige. Le ciel calme occupe les deux cinquièmes du haut ; collines basses ; au
premier plan, le fumoir en planches (porte entrouverte, lueur orange, fumée), la perche entre deux épinettes avec
trois quartiers enveloppés, la porte du caveau dans la butte ; le chalet plus loin, fenêtre orange.

    PYTHONDONTWRITEBYTECODE=1 python3 scene_t4.py [variante]     écrit t4-depart[-variante].svg

Variante « sechoir » : le bord du lac, le séchoir à poisson au-dessus du feu, le fumoir, le canot renversé.
Réutilise les épinettes de images/tomes/scene_titre.py (lecture seule).
"""
import math
import os
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(ICI, "..", "..")))
from scene_titre import Scene, f, pts, W, H  # noqa: E402

C = dict(sky0="#1A3140", sky1="#22404F", sky2="#2C4D5C", star="#ECE6D8", moon="#F1EBDD",
         far="#3A5C6C", mid="#2F5060", near="#1E3846", front="#152A35",
         snow="#EFE9DC", snow2="#DCD7CB", snow3="#C4C6C2", wood="#1B323E", wood2="#2A4553",
         orange="#EE7219", orange2="#F6A764", smoke="#8EA3AD", bag="#E7E0D0", bag2="#C9C2B2", lake="#3E6070")


def ciel(s, A):
    A('<defs>'
      f'<linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{C["sky0"]}"/>'
      f'<stop offset=".6" stop-color="{C["sky1"]}"/><stop offset="1" stop-color="{C["sky2"]}"/></linearGradient>'
      f'<radialGradient id="lueur"><stop offset="0" stop-color="{C["orange2"]}" stop-opacity=".6"/>'
      f'<stop offset="1" stop-color="{C["orange"]}" stop-opacity="0"/></radialGradient>'
      '</defs>')
    A(f'<rect x="-20" y="-40" width="{W + 60}" height="{H + 80}" fill="url(#ciel)"/>')
    # peu d'étoiles, et aucune dans le tiers du haut à gauche où se pose le titre
    for _ in range(46):
        x, y = s.u(0, W), s.u(20, 470)
        if x < 560 and y < 380:
            continue
        A(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(s.u(0.6, 1.5))}" fill="{C["star"]}" opacity="{f(s.u(.4, .9))}"/>')
    # un mince croissant de lune, bas à droite
    A(f'<path d="M640 360 a26 26 0 1 0 22 40 a21 21 0 1 1 -22 -40z" fill="{C["moon"]}"/>')


def collines(s, A, base=500):
    loin = s.onde(base, [(10, 0.7), (6, 1.6), (2, 5)])
    A(f'<polygon points="{pts(loin + [(W + 40, 700), (-20, 700)])}" fill="{C["far"]}"/>')
    milieu = s.onde(base + 40, [(9, 1.0), (5, 2.4), (2, 6)])
    A(f'<polygon points="{pts(milieu + [(W + 40, 700), (-20, 700)])}" fill="{C["mid"]}"/>')
    ym = lambda x: min(y for xx, y in milieu if abs(xx - x) <= 6)
    s.rangee(ym, -10, W + 30, 8, 15, C["mid"], dens=0.9)
    return milieu


def foret(s, A, y):
    bande = s.onde(y, [(3, 2), (1.5, 5)])
    A(f'<polygon points="{pts(bande + [(W + 40, y + 30), (-20, y + 30)])}" fill="{C["near"]}"/>')
    s.rangee(lambda x: y + 4, -10, W + 30, 18, 40, C["near"], dens=1.5)


def neige(s, A, y, trous=()):
    n1 = s.onde(y, [(5, 0.9), (3, 2.2), (1, 6)])
    A(f'<polygon points="{pts(n1 + [(W + 40, H + 40), (-20, H + 40)])}" fill="{C["snow"]}"/>')
    for _ in range(16):            # lignes de congères taillées
        x, yy = s.u(0, W), s.u(y + 30, H - 10)
        if any(a < x < b and c < yy < d for a, b, c, d in trous):
            continue
        w = s.u(40, 130)
        A(f'<path d="M{f(x)} {f(yy)} q{f(w / 2)} {f(-s.u(3, 7))} {f(w)} 0" fill="none" stroke="{C["snow3"]}" '
          f'stroke-width="{f(s.u(1.5, 3))}" stroke-linecap="round"/>')


def fumee(A, x, y, dx=1, haut=260):
    """Une volute qui monte, dérive et s'élargit en pâlissant."""
    h = haut
    d = (f"M{x} {y} C{x - 6 * dx} {y - h * .2} {x + 16 * dx} {y - h * .32} {x + 10 * dx} {y - h * .5} "
         f"S{x + 34 * dx} {y - h * .78} {x + 70 * dx} {y - h}")
    for w, op in [(36, .14), (22, .24), (10, .4)]:
        A(f'<path d="{d}" fill="none" stroke="#C9D3D6" stroke-width="{w}" stroke-linecap="round" opacity="{op}"/>')


def chalet(A, cx, cy, k=1.0):
    A(f'<g transform="translate({cx} {cy}) scale({k})">')
    A(f'<rect x="40" y="-62" width="8" height="20" fill="{C["wood"]}"/>')
    A(f'<polygon points="-2,-30 62,-30 62,0 -2,0" fill="{C["wood"]}"/>')
    A(f'<polygon points="-10,-28 30,-60 70,-28" fill="{C["wood"]}"/>')
    A(f'<path d="M-12 -27 L30 -63 L72 -27 Q66 -24 62 -27 L30 -52 L-2 -26 Q-7 -23 -12 -27Z" fill="{C["snow"]}"/>')
    A(f'<rect x="10" y="-22" width="13" height="11" fill="{C["orange"]}"/>')
    A(f'<rect x="36" y="-20" width="10" height="20" fill="{C["wood2"]}"/>')
    A('</g>')
    A(f'<ellipse cx="{cx + 16 * k}" cy="{cy + 4}" rx="{60 * k}" ry="{10 * k}" fill="url(#lueur)"/>')
    fumee(A, cx + 44 * k, cy - 62 * k, dx=1, haut=120 * k)


def fumoir(A, x, bas, l=118, h=128):
    """Petit fumoir en planches verticales, toit à deux pans enneigé, porte entrouverte sur la lueur orange."""
    toit = bas - h
    A(f'<ellipse cx="{x + l * 0.62}" cy="{bas + 4}" rx="{l * 0.9}" ry="18" fill="url(#lueur)"/>')
    A(f'<polygon points="{x},{bas} {x + l},{bas} {x + l},{toit} {x},{toit}" fill="{C["wood"]}"/>')
    for i in range(1, 9):          # les planches
        xx = x + i * l / 9
        A(f'<path d="M{f(xx)} {toit + 4} V{bas}" stroke="{C["wood2"]}" stroke-width="2"/>')
    A(f'<polygon points="{x - 12},{toit + 2} {x + l / 2},{toit - 52} {x + l + 12},{toit + 2}" fill="{C["wood"]}"/>')
    A(f'<path d="M{x - 15} {toit + 4} L{x + l / 2} {toit - 56} L{x + l + 15} {toit + 4} Q{x + l + 8} {toit + 8} '
      f'{x + l + 2} {toit + 3} L{x + l / 2} {toit - 40} L{x - 2} {toit + 4} Q{x - 8} {toit + 9} {x - 15} {toit + 4}Z" '
      f'fill="{C["snow"]}"/>')
    # la porte entrouverte : l'ouverture orange, le battant ouvert vers l'extérieur
    dx, dl, dh = x + l * 0.42, l * 0.36, h * 0.72
    A(f'<rect x="{f(dx)}" y="{f(bas - dh)}" width="{f(dl)}" height="{f(dh)}" fill="{C["orange"]}"/>')
    A(f'<rect x="{f(dx + 4)}" y="{f(bas - dh + 6)}" width="{f(dl - 8)}" height="{f(dh - 6)}" fill="{C["orange2"]}" opacity=".7"/>')
    A(f'<polygon points="{f(dx + dl)},{f(bas - dh)} {f(dx + dl + 24)},{f(bas - dh + 8)} {f(dx + dl + 24)},{f(bas + 6)} '
      f'{f(dx + dl)},{f(bas)}" fill="{C["wood2"]}"/>')
    # la fumée sort par le faîte
    fumee(A, x + l / 2 + 4, toit - 50, dx=1, haut=250)


def quartier(A, cx, haut, w, h, s):
    """Un quartier enveloppé dans un sac de coton : une longue goutte pâle, un lien en haut."""
    d = (f"M{f(cx)} {f(haut)} C{f(cx + w * 0.7)} {f(haut + h * 0.12)} {f(cx + w * 0.62)} {f(haut + h * 0.8)} "
         f"{f(cx + w * 0.1)} {f(haut + h)} C{f(cx - w * 0.5)} {f(haut + h * 0.86)} {f(cx - w * 0.6)} {f(haut + h * 0.2)} "
         f"{f(cx)} {f(haut)}Z")
    A(f'<path d="{d}" fill="{C["bag"]}"/>')
    A(f'<path d="M{f(cx - w * 0.3)} {f(haut + h * 0.3)} Q{f(cx)} {f(haut + h * 0.36)} {f(cx + w * 0.34)} {f(haut + h * 0.28)}" '
      f'fill="none" stroke="{C["bag2"]}" stroke-width="2"/>')
    A(f'<path d="M{f(cx - w * 0.25)} {f(haut + h * 0.6)} Q{f(cx + 2)} {f(haut + h * 0.68)} {f(cx + w * 0.3)} {f(haut + h * 0.58)}" '
      f'fill="none" stroke="{C["bag2"]}" stroke-width="2"/>')


def perche(s, A, x0, x1, y):
    # un fourré d'épinettes sombres derrière, pour que les sacs blancs se détachent
    A(f'<path d="M{x0 - 10} {y + 130} L{x0 - 10} {y + 10} Q{(x0 + x1) / 2} {y - 40} {x1 + 10} {y + 10} L{x1 + 10} {y + 130}Z" '
      f'fill="{C["front"]}"/>')
    for k in range(6):
        s.epinette(x0 + 12 + k * (x1 - x0 - 24) / 5, y + 130, s.u(150, 200), 50, C["front"], neige=False)
    # deux épinettes qui portent la perche
    for x in (x0, x1):
        s.epinette(x, y + 140, 250, 64, C["front"], neige=True)
    A(f'<path d="M{x0 - 18} {y} L{x1 + 18} {y + 4}" stroke="#6E8792" stroke-width="8" stroke-linecap="round"/>')
    for i, cx in enumerate([x0 + (x1 - x0) * t for t in (0.28, 0.5, 0.72)]):
        yy = y + 2 + (cx - x0) / (x1 - x0) * 4
        A(f'<path d="M{f(cx)} {f(yy)} v12" stroke="#6E8792" stroke-width="3"/>')
        quartier(A, cx, yy + 10, 44 + 4 * (i % 2), 96 + 10 * ((i + 1) % 2), s)


def caveau(A, x, bas):
    """La butte enneigée et la porte du caveau, cadre de rondins."""
    A(f'<path d="M{x - 150} {bas + 6} C{x - 110} {bas - 90} {x - 20} {bas - 122} {x + 50} {bas - 118} '
      f'C{x + 130} {bas - 112} {x + 190} {bas - 80} {x + 240} {bas + 6}Z" fill="{C["snow2"]}"/>')
    # les pierres qui retiennent la terre de chaque côté de la porte
    for sx in (-1, 1):
        for k in range(4):
            px = x + 30 + sx * (48 + k * 13)
            py = bas - 8 - (3 - k) * 10
            A(f'<ellipse cx="{px}" cy="{py}" rx="9" ry="6" fill="{C["wood2"]}"/>')
    A(f'<path d="M{x - 110} {bas - 6} C{x - 80} {bas - 66} {x - 20} {bas - 90} {x + 50} {bas - 86}" fill="none" '
      f'stroke="{C["snow3"]}" stroke-width="3"/>')
    # le cadre et la porte
    A(f'<polygon points="{x - 6},{bas} {x + 66},{bas} {x + 66},{bas - 76} {x - 6},{bas - 76}" fill="{C["wood"]}"/>')
    A(f'<rect x="{x - 14}" y="{bas - 86}" width="88" height="12" rx="4" fill="{C["wood"]}"/>')
    A(f'<rect x="{x + 4}" y="{bas - 68}" width="52" height="68" fill="{C["wood2"]}"/>')
    for i in range(1, 4):
        A(f'<path d="M{x + 4 + i * 13} {bas - 68} V{bas}" stroke="{C["wood"]}" stroke-width="1.6"/>')
    A(f'<path d="M{x + 4} {bas - 56} H{x + 56} L{x + 4} {bas - 12} H{x + 56}" fill="none" stroke="{C["wood"]}" stroke-width="4"/>')
    A(f'<path d="M{x - 18} {bas - 88} Q{x + 30} {bas - 100} {x + 78} {bas - 88} Q{x + 30} {bas - 92} {x - 18} {bas - 88}Z" fill="{C["snow"]}"/>')


def scene_fumoir():
    s = Scene(4004)
    A = s.add
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    ciel(s, A)
    collines(s, A, base=512)
    foret(s, A, 598)
    neige(s, A, 632, trous=[(90, 700, 640, 900)])
    chalet(A, 540, 664, k=0.85)
    perche(s, A, 290, 470, 686)
    caveau(A, 560, 876)
    fumoir(A, 108, 858)
    # le cadre : grandes épinettes chargées de neige
    for x, bas, h, l in [(-14, 1000, 520, 118), (52, 990, 290, 70), (742, 1000, 500, 112), (690, 980, 260, 62)]:
        s.epinette(x, bas, h, l, C["front"], neige=True)
    A('</svg>')
    return "\n".join(s.out)


def scene_sechoir():
    s = Scene(4044)
    A = s.add
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    ciel(s, A)
    collines(s, A, base=520)
    # le lac et ses rides
    A(f'<rect x="-20" y="590" width="{W + 60}" height="80" fill="{C["lake"]}"/>')
    foret(s, A, 584)
    for _ in range(22):
        x, y = s.u(0, W), s.u(616, 664)
        A(f'<path d="M{f(x)} {f(y)} h{f(s.u(10, 40))}" stroke="{C["snow3"]}" stroke-width="1.4" stroke-linecap="round" opacity=".6"/>')
    chalet(A, 560, 616, k=0.6)
    neige(s, A, 668, trous=[(150, 640, 700, 900)])
    # le séchoir : deux chevalets de perches, trois traverses, les truites ouvertes ; le feu dessous
    x0, x1, yb = 250, 520, 860
    A(f'<ellipse cx="{(x0 + x1) / 2}" cy="{yb - 6}" rx="150" ry="30" fill="url(#lueur)"/>')
    for x in (x0, x1):
        A(f'<path d="M{x - 26} {yb} L{x + 4} {yb - 150} L{x + 30} {yb}" fill="none" stroke="{C["wood"]}" stroke-width="6" stroke-linecap="round"/>')
    for k, y in enumerate((yb - 140, yb - 112, yb - 84)):
        A(f'<path d="M{x0 - 10} {y} L{x1 + 10} {y}" stroke="{C["wood"]}" stroke-width="4" stroke-linecap="round"/>')
        for i in range(9):
            cx = x0 + 16 + i * (x1 - x0 - 30) / 8 + (k % 2) * 8
            A(f'<path d="M{f(cx)} {y} q8 4 7 22 q-7 6 -14 0 q-1 -18 7 -22z" fill="{C["wood2"]}"/>')
            A(f'<path d="M{f(cx)} {y + 3} v17" stroke="{C["orange2"]}" stroke-width="1.2" opacity=".6"/>')
    # le feu
    fx = (x0 + x1) / 2
    A(f'<path d="M{fx - 40} {yb - 4} q20 -46 40 -60 q20 14 40 60z" fill="{C["orange"]}"/>')
    A(f'<path d="M{fx - 18} {yb - 4} q10 -26 18 -34 q10 8 18 34z" fill="{C["orange2"]}"/>')
    A(f'<path d="M{fx - 60} {yb} L{fx + 60} {yb - 10} M{fx - 60} {yb - 10} L{fx + 60} {yb}" stroke="{C["wood"]}" stroke-width="7" stroke-linecap="round"/>')
    fumee(A, fx + 6, yb - 150, dx=-1, haut=230)
    # le canot renversé
    A(f'<path d="M560 896 Q640 852 740 884 Q650 900 560 896z" fill="{C["wood"]}"/>')
    A(f'<path d="M566 896 Q650 906 736 886" fill="none" stroke="{C["snow3"]}" stroke-width="2"/>')
    fumoir(A, 70, 860, l=110, h=120)
    for x, bas, h, l in [(-14, 1000, 520, 118), (742, 1000, 500, 112), (692, 980, 240, 60)]:
        s.epinette(x, bas, h, l, C["front"], neige=True)
    A('</svg>')
    return "\n".join(s.out)


if __name__ == "__main__":
    var = sys.argv[1] if len(sys.argv) > 1 else "fumoir"
    svg = scene_sechoir() if var == "sechoir" else scene_fumoir()
    out = os.path.join(ICI, "t4-depart.svg" if var == "fumoir" else f"t4-depart-{var}.svg")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(svg + "\n")
    print(out)
