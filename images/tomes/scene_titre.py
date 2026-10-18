"""Scène de la page de titre : l'affiche du Nord, la nuit d'hiver (JP, 18 octobre 2026).

Première version en aplats géométriques ; JP : « c'est très carré comme trait, ça manque d'âme ». Celle-ci est
dessinée par le script avec un hasard fixe (graine) : épinettes noires irrégulières, chargées de neige au premier
plan, crêtes qui ondulent, aurore boréale, lune et son reflet sur le fleuve, trace de raquettes jusqu'au chalet,
corde de bois, fumée qui monte en volute, lumière des fenêtres sur la neige.

    python3 images/tomes/scene_titre.py 1      écrit images/tomes/titre-tome-1.svg

Repère : la page rognée, 768 × 960 px (8 × 10 po). Ce qui dépasse à droite et en bas tombe dans le fond perdu.
Aucun filtre SVG (le PDF les rendrait en image) : seulement des tracés et des dégradés.
"""
import math
import os
import random
import sys

W, H = 768, 960
C = dict(sky0="#0E1A22", sky1="#15222B", sky2="#1E3442", star="#E2E7EA", moon="#EEF2F4",
         aur="#7FD9A8", aur2="#5FB7C9", far="#294656", mid="#1F3848", near="#172C38", river="#2C5368",
         refl="#E2E7EA", shore="#0F1E27", front="#0A151B", snow="#DDE5EA", snow2="#C7D3DC", snow3="#B3C2CD",
         chalet="#101D25", log="#2A1E17", win="#EE7219", win2="#F7B062", smoke="#9FB2BF")


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def pts(ps):
    return " ".join(f"{f(x)},{f(y)}" for x, y in ps)


class Scene:
    def __init__(self, seed):
        self.r = random.Random(seed)
        self.out = []

    def u(self, a, b):
        return self.r.uniform(a, b)

    def add(self, s):
        self.out.append(s)

    # -------------------------------------------------------------- lignes qui ondulent
    def onde(self, base, amps, x0=-20, x1=W + 40, pas=6):
        ph = [(a, fr, self.u(0, 6.3)) for a, fr in amps]
        return [(x, base + sum(a * math.sin(fr * x / 100 + p) for a, fr, p in ph)) for x in range(x0, x1 + 1, pas)]

    # -------------------------------------------------------------- épinette noire
    def epinette(self, cx, bas, h, larg, coul, neige=False, tronc=True):
        """Silhouette d'épinette noire : étroite, étages en courbes qui retombent, cime en massue. Avec neige, chaque
        étage porte un coussin blanc sur le dessus."""
        r = self.r
        n = max(4, int(h / self.u(15, 21)))
        haut = bas - h
        etages = []
        for i in range(n):
            t = (i + 1) / n
            y = haut + h * 0.1 + (h * 0.84) * t
            etages.append((t, y))
        d = f"M{f(cx)} {f(haut)}"
        cotes = {}
        for s in (1, -1):
            segs = []
            for t, y in etages:
                hw = larg * (0.2 + 0.8 * t ** 0.9) * self.u(0.7, 1.15)
                if r.random() < 0.1:
                    hw *= 0.6
                th = h / n
                y0 = y - th * self.u(0.75, 0.95)              # où l'étage part du tronc
                tip = (cx + s * hw, y + th * self.u(0.05, 0.3))
                c1 = (cx + s * hw * self.u(0.45, 0.6), y0 - th * 0.05)
                back = (cx + s * hw * self.u(0.3, 0.45), y - th * self.u(0.0, 0.15))
                c2 = (cx + s * hw * self.u(0.75, 0.9), y + th * 0.25)
                segs.append(((cx + s * larg * 0.04, y0), c1, tip, c2, back))
            cotes[s] = segs
        # côté droit, de la cime au pied
        for (p0, c1, tip, c2, back) in cotes[1]:
            d += f" L{f(p0[0])} {f(p0[1])} Q{f(c1[0])} {f(c1[1])} {f(tip[0])} {f(tip[1])} Q{f(c2[0])} {f(c2[1])} {f(back[0])} {f(back[1])}"
        d += f" L{f(cx + larg * 0.05)} {f(bas)} L{f(cx - larg * 0.05)} {f(bas)}"
        for (p0, c1, tip, c2, back) in reversed(cotes[-1]):
            d += f" L{f(back[0])} {f(back[1])} Q{f(c2[0])} {f(c2[1])} {f(tip[0])} {f(tip[1])} Q{f(c1[0])} {f(c1[1])} {f(p0[0])} {f(p0[1])}"
        d += "Z"
        self.add(f'<path d="{d}" fill="{coul}"/>')
        # la cime en massue des épinettes noires
        self.add(f'<ellipse cx="{f(cx + self.u(-1, 1))}" cy="{f(haut + h * 0.06)}" rx="{f(larg * 0.07)}" ry="{f(h * 0.05)}" fill="{coul}"/>')
        if neige:
            for s in (1, -1):
                for (p0, c1, tip, c2, back) in cotes[s]:
                    if r.random() < 0.2:
                        continue
                    e = (tip[1] - p0[1]) * 0.18 + 1.2
                    x0 = cx + s * abs(tip[0] - cx) * self.u(0.12, 0.3)
                    y0 = p0[1] + (tip[1] - p0[1]) * 0.12
                    xt, yt = tip[0] - s * self.u(1, 3), tip[1] - 0.5
                    d = (f"M{f(x0)} {f(y0)} Q{f(c1[0])} {f(c1[1] - e)} {f(xt)} {f(yt)} "
                         f"Q{f(c1[0] + s * 2)} {f(c1[1] + e * 0.5)} {f(x0)} {f(y0 + e * 0.6)}Z")
                    self.add(f'<path d="{d}" fill="{C["snow"]}" opacity="{f(self.u(0.82, 0.97))}"/>')

    def rangee(self, y_de, x0, x1, hmin, hmax, coul, dens=1.0):
        x = x0
        while x < x1:
            h = self.u(hmin, hmax)
            self.epinette(x, y_de(x) + 2, h, h * self.u(0.22, 0.3), coul)
            x += h * self.u(0.18, 0.4) / dens


def scene(tome=1):
    s = Scene(1000 + tome)
    A = s.add
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" overflow="visible">')
    A('<defs>'
      f'<linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{C["sky0"]}"/>'
      f'<stop offset=".55" stop-color="{C["sky1"]}"/><stop offset="1" stop-color="{C["sky2"]}"/></linearGradient>'
      f'<linearGradient id="aur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{C["aur2"]}" stop-opacity="0"/>'
      f'<stop offset=".7" stop-color="{C["aur"]}" stop-opacity=".22"/><stop offset="1" stop-color="{C["aur"]}" stop-opacity=".5"/></linearGradient>'
      f'<linearGradient id="rai" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{C["aur"]}" stop-opacity="0"/>'
      f'<stop offset="1" stop-color="{C["aur"]}" stop-opacity=".35"/></linearGradient>'
      f'<radialGradient id="halo"><stop offset=".55" stop-color="{C["moon"]}" stop-opacity=".22"/>'
      f'<stop offset="1" stop-color="{C["moon"]}" stop-opacity="0"/></radialGradient>'
      f'<radialGradient id="lueur"><stop offset="0" stop-color="{C["win2"]}" stop-opacity=".55"/>'
      f'<stop offset="1" stop-color="{C["win"]}" stop-opacity="0"/></radialGradient>'
      '</defs>')
    A(f'<rect x="-20" y="-40" width="{W + 60}" height="{H + 80}" fill="url(#ciel)"/>')

    # aurore boréale : des voiles qui ondulent, et leurs rayons
    bord = s.onde(300, [(26, 0.9), (12, 2.3), (5, 5.1)], x0=-20, x1=W + 40, pas=8)
    dv = "M" + " L".join(f"{f(x)} {f(y)}" for x, y in bord)
    for k, (w, op) in enumerate([(96, .022), (80, .026), (66, .03), (52, .034), (40, .038), (30, .042), (21, .048), (13, .055), (6, .07)]):
        A(f'<path d="{dv}" transform="translate(0 {-w * 0.45})" fill="none" stroke="{C["aur"]}" stroke-width="{w}" '
          f'stroke-linejoin="round" opacity="{op}"/>')
    for x, y in bord:
        for _ in range(2):
            if s.r.random() < 0.6:
                hh = s.u(50, 180)
                w = s.u(1.2, 4)
                xx = x + s.u(-4, 4)
                A(f'<rect x="{f(xx)}" y="{f(y - hh)}" width="{f(w)}" height="{f(hh)}" fill="url(#rai)" opacity="{f(s.u(.25, .8))}"/>')

    # étoiles : plus rares derrière le titre
    for _ in range(170):
        x, y = s.u(0, W + 10), s.u(0, 520)
        if 40 < x < 520 and 90 < y < 440 and s.r.random() < 0.8:
            continue
        rr = s.u(0.4, 1.5) if s.r.random() < 0.92 else s.u(1.6, 2.2)
        A(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(rr)}" fill="{C["star"]}" opacity="{f(s.u(.35, .95))}"/>')
    for x, y in [(690, 120), (520, 168), (735, 300)]:      # trois étoiles qui scintillent
        a, b = 6.5, 1.1
        A(f'<path d="M{x} {y - a} L{x + b} {y - b} L{x + a} {y} L{x + b} {y + b} L{x} {y + a} L{x - b} {y + b} '
          f'L{x - a} {y} L{x - b} {y - b}Z" fill="{C["star"]}" opacity=".9"/>')

    # la lune et son halo
    A(f'<circle cx="600" cy="440" r="92" fill="url(#halo)"/>')
    A(f'<circle cx="600" cy="440" r="38" fill="{C["moon"]}"/>')
    for cx, cy, rr, op in [(588, 430, 7, .07), (612, 452, 5, .06), (603, 424, 3.5, .06), (583, 455, 4, .05)]:
        A(f'<circle cx="{cx}" cy="{cy}" r="{rr}" fill="#5E7788" opacity="{op}"/>')

    # crêtes : la plus loin, puis la forêt sur la crête du milieu
    loin = s.onde(560, [(16, 0.8), (9, 1.9), (3, 6)])
    A(f'<polygon points="{pts(loin + [(W + 40, 720), (-20, 720)])}" fill="{C["far"]}"/>')
    milieu = s.onde(606, [(12, 1.1), (6, 2.7), (2, 7)])
    A(f'<polygon points="{pts(milieu + [(W + 40, 720), (-20, 720)])}" fill="{C["mid"]}"/>')
    ym = lambda x: min(y for xx, y in milieu if abs(xx - x) <= 6)
    s.rangee(ym, -10, W + 30, 8, 16, C["mid"], dens=0.9)
    # la rive d'en face
    rive = s.onde(642, [(3, 2), (1.5, 5)])
    A(f'<polygon points="{pts(rive + [(W + 40, 660), (-20, 660)])}" fill="{C["near"]}"/>')
    s.rangee(lambda x: 646, -10, W + 30, 14, 34, C["near"], dens=1.6)

    # le fleuve et le reflet de la lune
    A(f'<rect x="-20" y="650" width="{W + 60}" height="46" fill="{C["river"]}"/>')
    for i in range(9):
        y = 656 + i * 4.6
        w = 46 - i * 3.5 + s.u(-5, 5)
        x = 600 + s.u(-4, 4)
        A(f'<path d="M{f(x - w / 2)} {f(y)} H{f(x + w / 2)}" stroke="{C["refl"]}" stroke-width="{f(s.u(1.2, 2.2))}" '
          f'stroke-linecap="round" opacity="{f(.75 - i * .06)}"/>')
    for _ in range(14):
        x, y = s.u(0, W), s.u(658, 690)
        A(f'<path d="M{f(x)} {f(y)} h{f(s.u(8, 30))}" stroke="{C["refl"]}" stroke-width="1" stroke-linecap="round" opacity=".25"/>')

    # la rive de ce côté-ci : épinettes sombres
    pres = s.onde(700, [(4, 1.7), (2, 4.4)])
    A(f'<polygon points="{pts(pres + [(W + 40, 760), (-20, 760)])}" fill="{C["shore"]}"/>')
    s.rangee(lambda x: 702, -10, W + 30, 30, 62, C["shore"], dens=1.4)

    # la neige au premier plan, en congères
    n1 = s.onde(744, [(8, 0.9), (4, 2.2), (1.5, 6)])
    A(f'<polygon points="{pts(n1 + [(W + 40, H + 40), (-20, H + 40)])}" fill="{C["snow"]}"/>')
    n2 = s.onde(842, [(10, 0.7), (5, 1.8)])
    A(f'<polygon points="{pts(n2 + [(W + 40, H + 40), (-20, H + 40)])}" fill="{C["snow2"]}" opacity=".7"/>')
    for _ in range(9):       # ombres bleues des creux
        x, y = s.u(0, W), s.u(770, 940)
        if 160 < x < 610 and y > 815:
            continue
        w = s.u(40, 120)
        A(f'<path d="M{f(x)} {f(y)} q{f(w / 2)} {f(-s.u(3, 7))} {f(w)} 0 q{f(-w / 2)} {f(s.u(2, 4))} {f(-w)} 0Z" fill="{C["snow3"]}" opacity=".55"/>')

    # le chalet en rondins, la neige sur le toit, les fenêtres allumées
    cx, cy = 372, 792
    A(f'<ellipse cx="{cx + 35}" cy="{cy + 10}" rx="110" ry="22" fill="url(#lueur)"/>')
    A(f'<g transform="translate({cx} {cy})">')
    A(f'<rect x="50" y="-74" width="10" height="24" fill="{C["chalet"]}"/>')
    A(f'<path d="M48 -76 h14 v4 h-14z" fill="{C["snow"]}"/>')
    A(f'<polygon points="-2,-38 72,-38 73,1 -3,2" fill="{C["chalet"]}"/>')
    for i in range(7):     # les rondins
        y = -34 + i * 5.2
        A(f'<path d="M-4 {f(y)} H74" stroke="#1C2C36" stroke-width="1.1"/>')
        A(f'<circle cx="-4" cy="{f(y + 1)}" r="2.3" fill="#2B3E4A"/><circle cx="74" cy="{f(y + 1)}" r="2.3" fill="#2B3E4A"/>')
    A(f'<polygon points="-12,-36 35,-74 82,-36" fill="{C["chalet"]}"/>')
    A(f'<path d="M-15 -34 L35 -77 L85 -34 Q80 -30 76 -33 Q73 -28 69 -32 L35 -63 L2 -32 Q-2 -28 -5 -32 Q-10 -29 -15 -34Z" fill="#F4F7F9"/>')
    for wx in (9, 45):
        A(f'<rect x="{wx}" y="-26" width="16" height="14" fill="{C["win"]}"/>')
        A(f'<rect x="{wx + 2}" y="-24" width="12" height="10" fill="{C["win2"]}" opacity=".6"/>')
        A(f'<path d="M{wx + 8} -26 v14 M{wx} -19 h16" stroke="{C["chalet"]}" stroke-width="1.4"/>')
        A(f'<path d="M{wx - 1} -11 h18 q-2 2.5 -9 2.5 q-7 0 -9 -2.5z" fill="#F4F7F9"/>')
    A(f'<rect x="29" y="-22" width="11" height="22" fill="#1B2A33"/>')
    A('</g>')
    # la fumée, en volute vers la droite
    d = (f"M{cx + 55} {cy - 76} C{cx + 50} {cy - 100} {cx + 76} {cy - 108} {cx + 70} {cy - 132} "
         f"C{cx + 64} {cy - 156} {cx + 100} {cy - 170} {cx + 128} {cy - 176} C{cx + 160} {cy - 182} {cx + 190} {cy - 196} {cx + 214} {cy - 214}")
    for w, op in [(16, .08), (9, .12), (4.5, .18)]:
        A(f'<path d="{d}" fill="none" stroke="{C["smoke"]}" stroke-width="{w}" stroke-linecap="round" opacity="{op}"/>')
    # la corde de bois, sous sa neige
    bx, by = cx - 46, cy - 2
    for row in range(3):
        for k in range(5 - row):
            x = bx + k * 7.2 + row * 3.6
            y = by - row * 6.4
            A(f'<circle cx="{f(x)}" cy="{f(y)}" r="3.4" fill="#6B4A33"/><circle cx="{f(x)}" cy="{f(y)}" r="1.4" fill="#A9825F"/>')
    A(f'<path d="M{bx - 5} {by - 15} q18 -7 40 -1 q-20 3 -40 1z" fill="{C["snow"]}"/>')
    # la trace de raquettes qui revient au chalet
    t = 0.0
    trace = lambda t: ((1 - t) ** 2 * 760 + 2 * (1 - t) * t * 640 + t * t * (cx + 34),
                       (1 - t) ** 2 * 990 + 2 * (1 - t) * t * 820 + t * t * (cy + 6))
    i = 0
    while t < 0.97:
        x, y = trace(t)
        x2, y2 = trace(t + 0.01)
        ang = math.degrees(math.atan2(y2 - y, x2 - x))
        sc = 0.35 + 0.65 * (1 - t)
        off = (4.5 if i % 2 else -4.5) * sc
        nx, ny = -math.sin(math.radians(ang)) * off, math.cos(math.radians(ang)) * off
        A(f'<ellipse cx="{f(x + nx)}" cy="{f(y + ny)}" rx="{f(6 * sc)}" ry="{f(2.6 * sc)}" '
          f'transform="rotate({f(ang)} {f(x + nx)} {f(y + ny)})" fill="{C["snow3"]}" opacity=".8"/>')
        t += 0.028 * (0.6 + 0.4 * sc)
        i += 1

    # les grandes épinettes du premier plan, chargées de neige
    for x, bas, h, l in [(-6, 990, 520, 120), (60, 980, 300, 72), (118, 960, 170, 44),
                         (712, 1000, 470, 112), (650, 970, 250, 60), (602, 940, 120, 30)]:
        s.epinette(x, bas, h, l, C["front"], neige=True)
    A('</svg>')
    return "\n".join(s.out)


if __name__ == "__main__":
    tome = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    ici = os.path.dirname(os.path.abspath(__file__))
    out = os.path.join(ici, f"titre-tome-{tome}.svg")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(f"<!-- Page de titre du tome {tome}, la nuit d'hiver : écrit par scene_titre.py, ne pas modifier à la main.\n"
                 "     Repère : la page rognée, 768 × 960 px (8 × 10 po) ; ce qui dépasse à droite et en bas va dans le fond perdu. -->\n")
        fh.write(scene(tome) + "\n")
    print(out)
