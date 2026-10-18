"""Image de départ du tome 5 (La forêt, le jardin et le chalet), à repeindre par un générateur (img2img).

Elle impose la composition : grand ciel brun calme en haut (le titre s'y pose), soleil orange bas à droite, collines
basses, forêt d'épinettes et de bouleaux, chalet en rondins, abri à bois plein, jardin en rangs au premier plan,
billot de fente avec la hache plantée. Deux ambiances : « ete » (soir d'été) et « automne » (corde qui monte,
courges orange, bouleaux jaunis).

    PYTHONDONTWRITEBYTECODE=1 python3 scene_tome5.py ete      écrit depart-ete.svg
    PYTHONDONTWRITEBYTECODE=1 python3 scene_tome5.py automne  écrit depart-automne.svg

Repère : 768 × 960 px, comme la page rognée. Reprend l'épinette de images/tomes/scene_titre.py.
"""
import math
import os
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(ICI, "..", ".."))
from scene_titre import Scene, f, pts  # noqa: E402

W, H = 768, 960
C = dict(sky0="#3F3021", sky1="#4B3A28", sky2="#5C4630", glow="#EE7219", sun="#EE7219", sun2="#F49A4E",
         far="#6B5238", mid="#5A4430", near="#3E2F20", front="#33261A", paper="#F2EBDF", paper2="#E3D6C3",
         soil="#4B3A28", leaf="#3E2F20", log="#4B3A28", logend="#E3C9A6", birch="#F2EBDF", win="#EE7219")


def bouleau(s, cx, bas, h, coul_feuille, feuilles_orange=False):
    """Bouleau blanc : tronc mince clair avec des marques foncées, couronne arrondie en grappes."""
    A = s.add
    tw = h * 0.035
    A(f'<path d="M{f(cx - tw)} {f(bas)} L{f(cx - tw * 0.5)} {f(bas - h * 0.92)} L{f(cx + tw * 0.5)} {f(bas - h * 0.92)} '
      f'L{f(cx + tw)} {f(bas)}Z" fill="{C["birch"]}"/>')
    for _ in range(int(h / 9)):
        y = s.u(bas - h * 0.85, bas - 3)
        w = s.u(0.6, 1.6) * tw
        A(f'<path d="M{f(cx - w)} {f(y)} h{f(w * 2 * s.u(0.4, 1))}" stroke="{C["near"]}" stroke-width="{f(s.u(1, 2.2))}" '
          'stroke-linecap="round"/>')
    for _ in range(9):
        r = s.u(0.1, 0.17) * h
        x = cx + s.u(-0.22, 0.22) * h
        y = bas - h * s.u(0.62, 0.95)
        coul = C["sun"] if feuilles_orange and s.r.random() < 0.55 else coul_feuille
        A(f'<ellipse cx="{f(x)}" cy="{f(y)}" rx="{f(r)}" ry="{f(r * 0.8)}" fill="{coul}"/>')


def scene(ambiance="ete"):
    s = Scene(5005 if ambiance == "ete" else 5105)
    A = s.add
    automne = ambiance == "automne"
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    A('<defs>'
      f'<linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{C["sky0"]}"/>'
      f'<stop offset=".5" stop-color="{C["sky1"]}"/><stop offset="1" stop-color="{C["sky2"]}"/></linearGradient>'
      f'<radialGradient id="halo"><stop offset=".35" stop-color="{C["glow"]}" stop-opacity=".45"/>'
      f'<stop offset="1" stop-color="{C["glow"]}" stop-opacity="0"/></radialGradient>'
      '</defs>')
    A(f'<rect x="0" y="0" width="{W}" height="{H}" fill="url(#ciel)"/>')

    # le soleil bas, ses anneaux taillés, quelques longues lignes de ciel près de l'horizon
    sx, sy = (585, 478) if not automne else (175, 470)
    A(f'<circle cx="{sx}" cy="{sy}" r="190" fill="url(#halo)"/>')
    for k, r in enumerate([150, 118, 92]):
        A(f'<circle cx="{sx}" cy="{sy}" r="{r}" fill="none" stroke="{C["sun2"]}" stroke-width="{2.4 - k * 0.4}" opacity="{.28 + k * .1}"/>')
    A(f'<circle cx="{sx}" cy="{sy}" r="62" fill="{C["sun"]}"/>')
    for i in range(7):
        y = 395 + i * 11
        x0 = s.u(-20, 120) if i % 2 else s.u(250, 380)
        A(f'<path d="M{f(x0)} {f(y)} h{f(s.u(160, 300))}" stroke="{C["paper2"]}" stroke-width="{f(s.u(1.2, 2))}" '
          f'stroke-linecap="round" opacity="{f(s.u(.18, .32))}"/>')

    # collines basses, la plus loin d'abord, avec des sillons taillés
    loin = s.onde(500, [(10, 0.8), (6, 1.9), (2, 6)])
    A(f'<polygon points="{pts(loin + [(W + 40, 700), (-20, 700)])}" fill="{C["far"]}"/>')
    for i in range(10):
        y = 512 + i * 7
        A(f'<path d="M{f(s.u(-20, 300))} {f(y)} q{f(s.u(80, 160))} {f(s.u(-6, 6))} {f(s.u(200, 420))} {f(s.u(-4, 4))}" fill="none" '
          f'stroke="{C["sun2"]}" stroke-width="1.2" opacity=".35"/>')
    milieu = s.onde(548, [(9, 1.1), (5, 2.7), (2, 7)])
    A(f'<polygon points="{pts(milieu + [(W + 40, 720), (-20, 720)])}" fill="{C["mid"]}"/>')
    ym = lambda x: min(y for xx, y in milieu if abs(xx - x) <= 6)
    s.rangee(ym, -10, W + 30, 10, 20, C["mid"], dens=0.9)

    # la forêt derrière le chalet : épinettes et bouleaux
    bord = s.onde(640, [(4, 1.7), (2, 4.4)])
    A(f'<polygon points="{pts(bord + [(W + 40, 720), (-20, 720)])}" fill="{C["near"]}"/>')
    s.rangee(lambda x: 646, -10, W + 30, 50, 110, C["near"], dens=1.3)
    for x, h in [(95, 120), (300, 110), (545, 125), (600, 100), (180, 95)]:
        bouleau(s, x, 650, h, C["far"], feuilles_orange=automne)

    # la clairière, papier
    sol = s.onde(660, [(3, 1.2), (1.5, 3.5)])
    A(f'<polygon points="{pts(sol + [(W + 40, H + 40), (-20, H + 40)])}" fill="{C["paper"]}"/>')

    # le chalet en rondins
    cx, cy = 418, 676
    A(f'<g transform="translate({cx} {cy})">')
    A(f'<rect x="70" y="-92" width="13" height="34" fill="{C["front"]}"/>')
    A(f'<polygon points="-4,-46 104,-46 105,2 -5,3" fill="{C["log"]}"/>')
    for i in range(9):
        y = -42 + i * 5.1
        A(f'<path d="M-6 {f(y)} H106" stroke="{C["front"]}" stroke-width="1.3"/>')
        A(f'<circle cx="-6" cy="{f(y + 1)}" r="2.6" fill="{C["logend"]}"/><circle cx="106" cy="{f(y + 1)}" r="2.6" fill="{C["logend"]}"/>')
    A(f'<polygon points="-16,-44 50,-92 116,-44" fill="{C["front"]}"/>')
    A(f'<path d="M-18 -42 L50 -94 L118 -42" fill="none" stroke="{C["paper2"]}" stroke-width="2"/>')
    A(f'<rect x="14" y="-32" width="20" height="17" fill="{C["win"]}"/>')
    A(f'<path d="M24 -32 v17 M14 -23.5 h20" stroke="{C["front"]}" stroke-width="1.6"/>')
    A(f'<rect x="58" y="-30" width="15" height="30" fill="{C["front"]}"/>')
    A(f'<path d="M-8 2 H108" stroke="{C["front"]}" stroke-width="3"/>')
    A('</g>')
    d = (f"M{cx + 76} {cy - 94} C{cx + 70} {cy - 120} {cx + 98} {cy - 128} {cx + 92} {cy - 152} "
         f"C{cx + 86} {cy - 176} {cx + 120} {cy - 190} {cx + 150} {cy - 196}")
    for w, op in [(14, .10), (8, .16), (3.5, .25)]:
        A(f'<path d="{d}" fill="none" stroke="{C["paper"]}" stroke-width="{w}" stroke-linecap="round" opacity="{op}"/>')

    # l'abri à bois : petit toit en appentis, la corde de bois pleine (plus haute à l'automne)
    bx, by = 222, 676
    nrang = 7 if not automne else 9
    larg = 128
    A(f'<path d="M{bx - 8} {by - nrang * 8 - 22} L{bx + larg + 10} {by - nrang * 8 - 8} L{bx + larg + 10} {by - nrang * 8 - 2} '
      f'L{bx - 8} {by - nrang * 8 - 16}Z" fill="{C["front"]}"/>')
    for x in (bx - 2, bx + larg + 2):
        A(f'<rect x="{x - 3}" y="{by - nrang * 8 - 14}" width="6" height="{nrang * 8 + 14}" fill="{C["front"]}"/>')
    A(f'<rect x="{bx + 2}" y="{by - nrang * 8 - 6}" width="{larg - 4}" height="{nrang * 8 + 6}" fill="{C["front"]}"/>')
    for row in range(nrang):
        for k in range(int(larg / 9.2)):
            x = bx + 7 + k * 9.2 + (4.6 if row % 2 else 0) + s.u(-1, 1)
            y = by - 5 - row * 8 + s.u(-0.8, 0.8)
            if x > bx + larg - 6:
                continue
            r = s.u(3.2, 4.4)
            A(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{C["logend"]}"/>')
            A(f'<path d="M{f(x - r * 0.5)} {f(y)} a{f(r * 0.5)} {f(r * 0.5)} 0 1 0 {f(r)} 0" fill="none" stroke="{C["log"]}" stroke-width=".7" opacity=".7"/>')

    # le jardin en rangs, en perspective vers le chalet
    vx, vy = 460, 560
    top = 700
    A(f'<path d="M-20 {top - 6} H{W + 20}" stroke="{C["near"]}" stroke-width="1.5" opacity=".5"/>')
    rangs = []
    for i in range(-9, 12):
        xb = vx + i * 120                        # où le rang touche le bas de l'image
        rangs.append(xb)
    for i, xb in enumerate(rangs):
        # le sillon foncé entre deux rangs
        def at(y, xb=xb):
            t = (y - vy) / (H + 40 - vy)
            return vx + (xb - vx) * t
        w0, w1 = 13, 1.5
        yb = H + 40
        A(f'<polygon points="{f(at(top) - w1)},{top} {f(at(top) + w1)},{top} {f(at(yb) + w0)},{yb} {f(at(yb) - w0)},{yb}" '
          f'fill="{C["soil"]}"/>')
        # les plants sur la butte, entre ce sillon et le suivant
        if i + 1 < len(rangs):
            xb2 = rangs[i + 1]
            y = top + 6
            while y < H + 20:
                t = (y - vy) / (H + 40 - vy)
                xm = vx + ((xb + xb2) / 2 - vx) * t
                sc = 0.25 + 1.6 * (y - top) / (H - top)
                if automne and i % 3 == 1 and s.r.random() < 0.35 and y > 760:
                    A(f'<ellipse cx="{f(xm)}" cy="{f(y)}" rx="{f(7 * sc)}" ry="{f(5 * sc)}" fill="{C["sun"]}"/>')
                    A(f'<path d="M{f(xm)} {f(y - 5 * sc)} v{f(-3 * sc)}" stroke="{C["near"]}" stroke-width="{f(1.2 * sc)}"/>')
                else:
                    for a in (-1, 0, 1):
                        A(f'<path d="M{f(xm)} {f(y)} q{f(a * 5 * sc)} {f(-6 * sc)} {f(a * 7 * sc)} {f(-10 * sc + abs(a) * 3 * sc)}" '
                          f'fill="none" stroke="{C["leaf"]}" stroke-width="{f(2.2 * sc)}" stroke-linecap="round"/>')
                y += 9 + 26 * (y - top) / (H - top)

    # le billot de fente, la hache plantée, des bûches fendues autour
    kx, ky = 150, 868
    A(f'<ellipse cx="{kx}" cy="{ky + 52}" rx="70" ry="14" fill="{C["paper2"]}"/>')
    A(f'<path d="M{kx - 46} {ky} L{kx - 50} {ky + 52} Q{kx} {ky + 64} {kx + 50} {ky + 52} L{kx + 46} {ky}Z" fill="{C["log"]}"/>')
    for i in range(6):
        x = kx - 40 + i * 16
        A(f'<path d="M{x} {ky + 6} v{s.u(30, 44)}" stroke="{C["front"]}" stroke-width="1.6"/>')
    A(f'<ellipse cx="{kx}" cy="{ky}" rx="46" ry="12" fill="{C["logend"]}"/>')
    for r in (34, 24, 14, 6):
        A(f'<ellipse cx="{kx + 2}" cy="{ky}" rx="{r}" ry="{r * 0.26}" fill="none" stroke="{C["log"]}" stroke-width="1"/>')
    # la hache : fer planté dans le billot, manche qui monte vers la droite
    A(f'<path d="M{kx - 8} {ky - 2} L{kx + 62} {ky - 74}" stroke="{C["front"]}" stroke-width="7" stroke-linecap="round"/>')
    A(f'<path d="M{kx - 24} {ky + 2} L{kx - 6} {ky - 14} L{kx + 8} {ky - 2} L{kx - 6} {ky + 6}Z" fill="{C["front"]}"/>')
    for (x, y, a) in [(kx + 70, ky + 40, -20), (kx + 96, ky + 50, 10), (kx - 92, ky + 44, 25), (kx + 60, ky + 58, -5)]:
        A(f'<g transform="rotate({a} {x} {y})"><path d="M{x - 22} {y - 7} L{x + 22} {y - 7} L{x + 22} {y + 6} L{x - 22} {y + 6}Z" '
          f'fill="{C["log"]}"/><path d="M{x + 22} {y - 7} L{x + 28} {y - 0.5} L{x + 22} {y + 6}Z" fill="{C["logend"]}"/></g>')

    # les grandes épinettes du premier plan, de chaque côté
    for x, bas, h, l in [(-14, 1000, 400, 104), (48, 990, 250, 64), (726, 1010, 420, 108), (668, 985, 220, 56)]:
        s.epinette(x, bas, h, l, C["front"])
    A('</svg>')
    return "\n".join(s.out)


if __name__ == "__main__":
    amb = sys.argv[1] if len(sys.argv) > 1 else "ete"
    out = os.path.join(ICI, f"depart-{amb}.svg")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(scene(amb) + "\n")
    print(out)
