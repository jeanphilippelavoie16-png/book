"""Image de départ du tome 6, L'atelier : un soir d'hiver, l'atelier en planches à côté du chalet, la grande porte
ouverte sur la lueur d'une petite forge. Elle sert seulement de composition imposée au générateur (img2img) : le
ciel du haut reste vide pour le titre, collines basses, la scène dans la moitié du bas.

    python3 scene_atelier.py A      écrit ref-atelier-A.svg  (atelier de face, chalet à gauche derrière)
    python3 scene_atelier.py B      écrit ref-atelier-B.svg  (appentis ouvert, forgeron en silhouette lointaine)

Les épinettes viennent de images/tomes/scene_titre.py (importé, pas modifié). 768 × 960 px.
"""
import math
import os
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(ICI, "..", "..")))
from scene_titre import Scene, W, H, f, pts  # noqa: E402

K = dict(sky0="#2C2A28", sky1="#363432", far="#4A4743", mid="#3E3B38", band="#2F2D2B", front="#1E1C1B",
         snow="#F1ECE2", snow2="#E2DBCE", snow3="#CFC6B6", wall="#2A2725", plank="#47423D", or_="#EE7219",
         or2="#F7B062", or3="#FBD9A8", smoke="#8E8984", star="#F1ECE2", iron="#1A1817")


def epinette_neige(s, x, bas, h, l):
    s.epinette(x, bas, h, l, K["front"], neige=True)


def ciel(s, A, lune=True):
    A(f'<defs><linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{K["sky0"]}"/>'
      f'<stop offset=".55" stop-color="{K["sky1"]}"/><stop offset="1" stop-color="#3C3A37"/></linearGradient></defs>')
    A(f'<rect x="-20" y="-40" width="{W + 60}" height="{H + 80}" fill="url(#ciel)"/>')
    # quelques étoiles, rares et loin du titre (le titre occupe x 40-700, y 40-480)
    for _ in range(70):
        x, y = s.u(0, W), s.u(0, 560)
        if 30 < x < 720 and 30 < y < 470 and s.r.random() < 0.93:
            continue
        rr = s.u(0.5, 1.4)
        A(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(rr)}" fill="{K["star"]}" opacity="{f(s.u(.4, .9))}"/>')
    if lune:     # un mince croissant, bas à droite, sous le bloc du titre
        A(f'<circle cx="668" cy="468" r="20" fill="{K["snow"]}"/>')
        A(f'<circle cx="677" cy="462" r="18" fill="{K["sky1"]}"/>')


def collines(s, A):
    loin = s.onde(532, [(10, 0.8), (6, 1.9), (2, 6)])
    A(f'<polygon points="{pts(loin + [(W + 40, 760), (-20, 760)])}" fill="{K["far"]}"/>')
    # stries claires taillées à la gouge sur la colline du fond
    for k in range(7):
        y0 = 548 + k * 7
        d = s.onde(y0, [(4, 1.1), (2, 3)], x0=-20, x1=W + 40, pas=12)
        A(f'<polyline points="{pts(d)}" fill="none" stroke="{K["snow3"]}" stroke-width="1" opacity=".18"/>')
    mil = s.onde(578, [(8, 1.2), (4, 2.8)])
    A(f'<polygon points="{pts(mil + [(W + 40, 760), (-20, 760)])}" fill="{K["mid"]}"/>')
    ym = lambda x: min(y for xx, y in mil if abs(xx - x) <= 6)
    s.rangee(ym, -10, W + 30, 10, 20, K["mid"], dens=0.9)
    s.rangee(lambda x: 612, -10, W + 30, 18, 40, K["band"], dens=1.5)
    A(f'<rect x="-20" y="610" width="{W + 60}" height="40" fill="{K["band"]}"/>')


def neige(s, A):
    n1 = s.onde(640, [(6, 0.9), (3, 2.2), (1.2, 6)])
    A(f'<polygon points="{pts(n1 + [(W + 40, H + 40), (-20, H + 40)])}" fill="{K["snow"]}"/>')
    for _ in range(16):        # lignes de congère taillées
        x, y = s.u(-20, W), s.u(670, 950)
        w = s.u(50, 160)
        A(f'<path d="M{f(x)} {f(y)} q{f(w / 2)} {f(-s.u(3, 8))} {f(w)} 0" fill="none" stroke="{K["snow3"]}" '
          f'stroke-width="{f(s.u(1.2, 2.4))}" stroke-linecap="round" opacity=".8"/>')


def bouffee(A, x, y, sens=1):
    """Une fumée courte : trois volutes pâles juste au-dessus du tuyau."""
    for dx, dy, rx, ry, op in [(0, -10, 9, 8, .22), (8 * sens, -24, 12, 9, .16), (20 * sens, -36, 15, 9, .1)]:
        A(f'<ellipse cx="{x + dx}" cy="{y + dy}" rx="{rx}" ry="{ry}" fill="{K["smoke"]}" opacity="{op}"/>')


def fumee(A, x, y, sens=1, haut=180):
    if haut <= 60:
        return bouffee(A, x, y, sens)
    d = (f"M{x} {y} C{x - 8 * sens} {y - 30} {x + 22 * sens} {y - 42} {x + 16 * sens} {y - 70} "
         f"C{x + 10 * sens} {y - 98} {x + 50 * sens} {y - 112} {x + 80 * sens} {y - 122} "
         f"C{x + 112 * sens} {y - 132} {x + 140 * sens} {y - haut + 30} {x + 165 * sens} {y - haut}")
    for w, op in [(18, .10), (10, .16), (5, .25)]:
        A(f'<path d="{d}" fill="none" stroke="{K["smoke"]}" stroke-width="{w}" stroke-linecap="round" opacity="{op}"/>')


def etincelles(s, A, x0, x1, y0, y1, n, monte=True):
    for _ in range(n):
        x, y = s.u(x0, x1), s.u(y0, y1)
        L = s.u(2, 7)
        a = math.radians(s.u(-115, -65) if monte else s.u(0, 360))
        A(f'<path d="M{f(x)} {f(y)} l{f(L * math.cos(a))} {f(L * math.sin(a))}" stroke="{K["or_"] if s.r.random() < .7 else K["or2"]}" '
          f'stroke-width="{f(s.u(1.2, 2.2))}" stroke-linecap="round"/>')


def chalet(s, A, cx, base, larg=110, lumiere=True):
    """Petit chalet en rondins, de face, une fenêtre allumée."""
    h = larg * 0.45
    A(f'<rect x="{f(cx + larg * 0.22)}" y="{f(base - h - larg * 0.46)}" width="9" height="{f(larg * 0.25)}" fill="{K["wall"]}"/>')
    A(f'<polygon points="{f(cx - larg / 2)},{f(base - h)} {f(cx + larg / 2)},{f(base - h)} {f(cx + larg / 2)},{f(base)} {f(cx - larg / 2)},{f(base)}" fill="{K["wall"]}"/>')
    for i in range(6):
        y = base - h + 4 + i * (h - 4) / 6
        A(f'<path d="M{f(cx - larg / 2 - 3)} {f(y)} H{f(cx + larg / 2 + 3)}" stroke="{K["plank"]}" stroke-width="1"/>')
    A(f'<polygon points="{f(cx - larg / 2 - 10)},{f(base - h + 2)} {f(cx)},{f(base - h - larg * 0.36)} {f(cx + larg / 2 + 10)},{f(base - h + 2)}" fill="{K["wall"]}"/>')
    A(f'<path d="M{f(cx - larg / 2 - 13)} {f(base - h + 3)} L{f(cx)} {f(base - h - larg * 0.39)} L{f(cx + larg / 2 + 13)} {f(base - h + 3)} '
      f'Q{f(cx + larg / 2)} {f(base - h + 7)} {f(cx + larg / 2 - 4)} {f(base - h + 2)} L{f(cx)} {f(base - h - larg * 0.28)} '
      f'L{f(cx - larg / 2 + 4)} {f(base - h + 2)} Q{f(cx - larg / 2)} {f(base - h + 7)} {f(cx - larg / 2 - 13)} {f(base - h + 3)}Z" fill="{K["snow"]}"/>')
    if lumiere:
        A(f'<rect x="{f(cx - larg * 0.3)}" y="{f(base - h * 0.75)}" width="{f(larg * 0.17)}" height="{f(larg * 0.15)}" fill="{K["or_"]}"/>')
        A(f'<path d="M{f(cx - larg * 0.3 + larg * 0.085)} {f(base - h * 0.75)} v{f(larg * 0.15)}" stroke="{K["wall"]}" stroke-width="1.4"/>')
    A(f'<rect x="{f(cx + larg * 0.08)}" y="{f(base - h * 0.8)}" width="{f(larg * 0.14)}" height="{f(h * 0.8)}" fill="{K["iron"]}"/>')


def atelier(s, A, x0, base, larg=230, hmur=118, fumee_h=125):
    """L'atelier en planches, le pignon de face, la grande porte double ouverte sur la forge."""
    x1 = x0 + larg
    cx = (x0 + x1) / 2
    faite = base - hmur - larg * 0.42
    # la lueur sur la neige, devant la porte
    A('<defs><linearGradient id="flaque" x1="0" y1="0" x2="0" y2="1">'
      f'<stop offset="0" stop-color="{K["or2"]}" stop-opacity=".95"/><stop offset=".55" stop-color="{K["or_"]}" stop-opacity=".55"/>'
      f'<stop offset="1" stop-color="{K["or_"]}" stop-opacity="0"/></linearGradient>'
      '<radialGradient id="feu"><stop offset="0" stop-color="#FFF1D6"/><stop offset=".35" stop-color="' + K["or2"] + '"/>'
      f'<stop offset="1" stop-color="{K["or_"]}"/></radialGradient></defs>')
    dl, dr = cx - 62, cx + 62
    A(f'<polygon points="{f(dl)},{f(base)} {f(dr)},{f(base)} {f(dr + 120)},{f(base + 120)} {f(dl - 110)},{f(base + 120)}" fill="url(#flaque)"/>')
    # le mur de pignon en planches verticales
    A(f'<polygon points="{f(x0)},{f(base)} {f(x0)},{f(base - hmur)} {f(cx)},{f(faite)} {f(x1)},{f(base - hmur)} {f(x1)},{f(base)}" fill="{K["wall"]}"/>')
    x = x0 + 9
    while x < x1 - 4:
        ytop = base - hmur - (larg * 0.42) * (1 - abs(x - cx) / (larg / 2))
        A(f'<path d="M{f(x)} {f(ytop + 3)} V{f(base)}" stroke="{K["plank"]}" stroke-width="{f(s.u(.9, 1.6))}"/>')
        x += s.u(10, 14)
    # le toit et sa neige, qui déborde
    A(f'<path d="M{f(x0 - 18)} {f(base - hmur + 6)} L{f(cx)} {f(faite - 14)} L{f(x1 + 18)} {f(base - hmur + 6)} '
      f'Q{f(x1 + 8)} {f(base - hmur + 14)} {f(x1 + 2)} {f(base - hmur + 6)} Q{f(x1 - 6)} {f(base - hmur + 14)} {f(x1 - 12)} {f(base - hmur + 4)} '
      f'L{f(cx)} {f(faite + 4)} L{f(x0 + 12)} {f(base - hmur + 4)} Q{f(x0 + 4)} {f(base - hmur + 13)} {f(x0 - 4)} {f(base - hmur + 7)} '
      f'Q{f(x0 - 10)} {f(base - hmur + 13)} {f(x0 - 18)} {f(base - hmur + 6)}Z" fill="{K["snow"]}"/>')
    # le tuyau du poêle de forge, sur le versant droit
    tx = cx + larg * 0.24
    ty = base - hmur - (larg * 0.42) * (1 - abs(tx - cx) / (larg / 2))
    A(f'<rect x="{f(tx)}" y="{f(ty - 46)}" width="9" height="50" fill="{K["iron"]}"/>')
    A(f'<path d="M{f(tx - 4)} {f(ty - 50)} h17 l-3 5 h-11z" fill="{K["iron"]}"/>')
    fumee(A, tx + 4, ty - 52, sens=-1, haut=fumee_h)
    etincelles(s, A, tx - 6, tx + 22, ty - 110, ty - 52, 14)
    # la petite fenêtre du grenier
    A(f'<rect x="{f(cx - 11)}" y="{f(faite + 34)}" width="22" height="18" fill="{K["or_"]}"/>')
    A(f'<path d="M{f(cx)} {f(faite + 34)} v18 M{f(cx - 11)} {f(faite + 43)} h22" stroke="{K["wall"]}" stroke-width="2"/>')
    # la baie de la porte : l'intérieur allumé
    dt = base - 112
    A(f'<rect x="{f(dl)}" y="{f(dt)}" width="{f(dr - dl)}" height="112" fill="{K["or_"]}"/>')
    A(f'<ellipse cx="{f(dl + 34)}" cy="{f(base - 44)}" rx="70" ry="62" fill="url(#feu)"/>')
    # au fond à gauche : la forge en pierre, son feu, la hotte et son tuyau
    A(f'<path d="M{f(dl + 6)} {f(base - 14)} v-34 h52 v34z" fill="{K["iron"]}"/>')
    A(f'<path d="M{f(dl + 13)} {f(base - 48)} q12 -16 19 -4 q7 -16 15 2z" fill="#FFF1D6"/>')
    A(f'<path d="M{f(dl + 4)} {f(dt + 40)} h56 l-14 -18 h-28z M{f(dl + 25)} {f(dt + 22)} v-22 h14 v22z" fill="{K["iron"]}"/>')
    # au mur du fond à droite : des pinces, un marteau, une égoïne
    for ox, lg in [(dr - 50, 38), (dr - 42, 44)]:
        A(f'<path d="M{f(ox)} {f(dt + 12)} l-3 {lg} M{f(ox)} {f(dt + 12)} l3 {lg}" stroke="{K["iron"]}" stroke-width="2" stroke-linecap="round"/>')
    A(f'<path d="M{f(dr - 30)} {f(dt + 12)} v34" stroke="{K["iron"]}" stroke-width="2.6"/><path d="M{f(dr - 36)} {f(dt + 12)} h12 v6 h-12z" fill="{K["iron"]}"/>')
    A(f'<path d="M{f(dr - 18)} {f(dt + 10)} h12 v10 l-4 40 h-8z" fill="{K["iron"]}"/>')
    # l'enclume sur sa bille, dans l'embrasure, en contre-jour : bigorne à gauche, table plate, talon, pied évasé
    ax, ay = cx + 38, base
    A(f'<path d="M{f(ax - 13)} {f(ay)} v-30 h26 v30z" fill="{K["iron"]}"/>')
    A(f'<path d="M{f(ax - 40)} {f(ay - 50)} q14 -1 22 -5 h40 v10 h-6 q-4 0 -6 4 l-2 6 h4 l4 6 h-34 l4 -6 h4 l-2 -6 q-2 -4 -8 -5 q-12 -1 -20 -4z" fill="{K["iron"]}"/>')
    # les deux battants ouverts vers l'extérieur
    A(f'<polygon points="{f(dl)},{f(dt)} {f(dl - 34)},{f(dt + 10)} {f(dl - 34)},{f(base + 8)} {f(dl)},{f(base)}" fill="{K["wall"]}"/>')
    A(f'<polygon points="{f(dr)},{f(dt)} {f(dr + 34)},{f(dt + 10)} {f(dr + 34)},{f(base + 8)} {f(dr)},{f(base)}" fill="{K["wall"]}"/>')
    for k in range(1, 4):
        A(f'<path d="M{f(dl - 34 * k / 4)} {f(dt + 10 * k / 4 + 1)} V{f(base + 8 * k / 4)}" stroke="{K["plank"]}" stroke-width="1"/>')
        A(f'<path d="M{f(dr + 34 * k / 4)} {f(dt + 10 * k / 4 + 1)} V{f(base + 8 * k / 4)}" stroke="{K["plank"]}" stroke-width="1"/>')
    # des étincelles qui sortent par la porte
    etincelles(s, A, dl, dr + 30, dt - 30, dt + 50, 22, monte=False)
    # la neige au pied du mur
    A(f'<path d="M{f(x0 - 6)} {f(base + 2)} q{f(larg * 0.12)} -8 {f(larg * 0.25)} -2 L{f(dl - 34)} {f(base + 9)} '
      f'L{f(x0 - 6)} {f(base + 9)}z" fill="{K["snow"]}"/>')
    A(f'<path d="M{f(dr + 34)} {f(base + 9)} q{f(larg * 0.1)} -10 {f(x1 + 6 - dr - 34)} -6 L{f(x1 + 6)} {f(base + 9)}z" fill="{K["snow"]}"/>')
    return cx, dl, dr


def bille_hache(A, x, y):
    A(f'<path d="M{x - 18} {y} v-24 q18 -6 36 0 v24 q-18 5 -36 0z" fill="{K["wall"]}"/>')
    A(f'<ellipse cx="{x}" cy="{y - 24}" rx="18" ry="5" fill="{K["snow"]}"/>')
    A(f'<path d="M{x + 2} {y - 26} l20 -30" stroke="{K["iron"]}" stroke-width="3.2" stroke-linecap="round"/>')
    A(f'<path d="M{x - 6} {y - 30} l12 -6 l4 10z" fill="{K["iron"]}"/>')


def corde_bois(A, x, y, n=7, rangs=4):
    for r_ in range(rangs):
        for k in range(n - r_):
            xx = x + k * 9 + r_ * 4.5
            yy = y - r_ * 8
            A(f'<circle cx="{f(xx)}" cy="{f(yy)}" r="4.3" fill="{K["wall"]}"/><circle cx="{f(xx)}" cy="{f(yy)}" r="2" fill="{K["plank"]}"/>')
    A(f'<path d="M{x - 6} {y - rangs * 8 + 2} q{n * 4.5} -8 {n * 9 + 2} -1 q{-n * 4.5} 4 {-n * 9 - 2} 1z" fill="{K["snow"]}"/>')


def raquettes(A, x, y):
    for dx in (0, 14):
        A(f'<ellipse cx="{x + dx}" cy="{y}" rx="9" ry="24" fill="none" stroke="{K["wall"]}" stroke-width="3" '
          f'transform="rotate({8 + dx * .4} {x + dx} {y})"/>')
        A(f'<path d="M{x + dx - 6} {y - 8} l12 8 M{x + dx - 6} {y + 4} l12 -8" stroke="{K["wall"]}" stroke-width="1"/>')


def traces(s, A, depart, arrivee):
    (x0, y0), (x2, y2) = depart, arrivee
    x1, y1 = (x0 + x2) / 2 - 60, (y0 + y2) / 2 + 10
    t, i = 0.0, 0
    while t < 0.96:
        x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t * t * x2
        y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y1 + t * t * y2
        sc = 0.35 + 0.65 * (1 - t)
        off = (5 if i % 2 else -5) * sc
        A(f'<ellipse cx="{f(x + off)}" cy="{f(y)}" rx="{f(5.5 * sc)}" ry="{f(2.4 * sc)}" fill="{K["snow3"]}"/>')
        t += 0.035
        i += 1


def scene_A():
    s = Scene(6006)
    A = s.add
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    ciel(s, A)
    collines(s, A)
    neige(s, A)
    chalet(s, A, 150, 700, larg=104)
    fumee(A, 150 + 104 * 0.22 + 4, 700 - 104 * 0.45 - 104 * 0.46, sens=1, haut=40)
    corde_bois(A, 214, 704, n=6, rangs=3)
    cx, dl, dr = atelier(s, A, 300, 826, larg=280, hmur=134)
    raquettes(A, 602, 800)
    bille_hache(A, 236, 858)
    traces(s, A, (300, 990), (cx, 832))
    for x, bas, h, l in [(-6, 1000, 470, 112), (62, 985, 270, 66), (118, 965, 150, 40),
                         (726, 1010, 430, 104), (668, 980, 230, 56), (628, 950, 110, 28)]:
        epinette_neige(s, x, bas, h, l)
    A('</svg>')
    return "\n".join(s.out)


def scene_B():
    """Deuxième idée : un appentis ouvert accoté à l'atelier, la forge dehors sous le toit, une silhouette lointaine
    qui frappe sur l'enclume, les étincelles en gerbe."""
    s = Scene(6106)
    A = s.add
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    ciel(s, A, lune=False)
    collines(s, A)
    neige(s, A)
    # l'atelier fermé, à gauche, une fenêtre allumée
    chalet(s, A, 210, 770, larg=190)
    # l'appentis : un toit en pente sur deux poteaux, accoté au mur droit
    x0, x1, base = 305, 520, 800
    A('<defs><radialGradient id="feu2"><stop offset="0" stop-color="#FFF1D6"/><stop offset=".3" stop-color="' + K["or2"] + '"/>'
      f'<stop offset=".7" stop-color="{K["or_"]}" stop-opacity=".9"/><stop offset="1" stop-color="{K["or_"]}" stop-opacity="0"/></radialGradient></defs>')
    A(f'<ellipse cx="410" cy="770" rx="150" ry="95" fill="url(#feu2)" opacity=".9"/>')
    A(f'<polygon points="{x0},{base - 118} {x1 + 14},{base - 82} {x1 + 14},{base - 72} {x0},{base - 106}" fill="{K["wall"]}"/>')
    A(f'<path d="M{x0 - 2} {base - 121} L{x1 + 18} {base - 85} q-6 6 -12 2 q-5 5 -11 0 L{x0} {base - 112}z" fill="{K["snow"]}"/>')
    for px in (x1 - 4, x1 + 8):
        A(f'<rect x="{px}" y="{base - 78}" width="6" height="80" fill="{K["wall"]}"/>')
    # la forge (foyer en pierre) et son tuyau
    A(f'<path d="M330 {base} v-38 h56 v38z" fill="{K["iron"]}"/>')
    A(f'<path d="M336 {base - 38} q14 -16 22 -4 q8 -16 18 2z" fill="#FFF1D6"/>')
    A(f'<rect x="352" y="{base - 160}" width="9" height="90" fill="{K["iron"]}"/>')
    fumee(A, 356, base - 162, sens=1, haut=210)
    # l'enclume sur sa bille, et la silhouette qui frappe (lointaine, sans visage)
    ax = 440
    A(f'<path d="M{ax - 10} {base} v-26 h20 v26z" fill="{K["iron"]}"/>')
    A(f'<path d="M{ax - 24} {base - 40} q8 -2 12 -2 h26 v8 h-24 q-10 0 -14 -6z" fill="{K["iron"]}"/>')
    A(f'<path d="M{ax - 6} {base - 26} l3 -8 h6 l3 8z" fill="{K["iron"]}"/>')
    px, py = 478, base
    A(f'<path d="M{px - 8} {py} l4 -40 h10 l4 40 h-6 l-3 -30 l-3 30z" fill="{K["iron"]}"/>')
    A(f'<path d="M{px - 10} {py - 38} q2 -30 9 -34 h4 q8 4 9 34z" fill="{K["iron"]}"/>')
    A(f'<circle cx="{px - 1}" cy="{py - 80}" r="8" fill="{K["iron"]}"/>')
    A(f'<path d="M{px - 6} {py - 66} l-18 -18 l-6 -10" stroke="{K["iron"]}" stroke-width="5" stroke-linecap="round" fill="none"/>')
    A(f'<path d="M{px - 34} {py - 100} l10 -4 l3 8 l-10 4z" fill="{K["iron"]}"/>')
    A(f'<path d="M{px - 8} {py - 60} l-26 14" stroke="{K["iron"]}" stroke-width="5" stroke-linecap="round"/>')
    etincelles(s, A, ax - 40, ax + 30, base - 90, base - 40, 40, monte=False)
    corde_bois(A, 560, 800, n=8, rangs=4)
    bille_hache(A, 620, 850)
    traces(s, A, (420, 990), (450, 812))
    for x, bas, h, l in [(-6, 1000, 470, 112), (62, 985, 270, 66), (118, 965, 150, 40),
                         (726, 1010, 430, 104), (668, 980, 230, 56), (690, 760, 110, 28)]:
        epinette_neige(s, x, bas, h, l)
    A('</svg>')
    return "\n".join(s.out)


def scene_A2():
    """Deuxième tour : sans lune (le générateur la montait dans la zone du titre), fumée courte (il en faisait un
    éclair), l'atelier agrandi pour que la forge et l'enclume aient de la place dans la porte."""
    s = Scene(6016)
    A = s.add
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    ciel(s, A, lune=False)
    collines(s, A)
    neige(s, A)
    chalet(s, A, 120, 700, larg=100)
    corde_bois(A, 182, 704, n=6, rangs=3)
    k, cx0, base = 1.22, 430, 846
    A(f'<g transform="translate({cx0} {base}) scale({k}) translate({-cx0} {-base})">')
    atelier(s, A, cx0 - 140, base, larg=280, hmur=134, fumee_h=40)
    A('</g>')
    raquettes(A, 640, 812)
    bille_hache(A, 214, 866)
    traces(s, A, (330, 1000), (cx0, 852))
    for x, bas, h, l in [(-6, 1000, 440, 104), (58, 985, 250, 62), (110, 975, 140, 38),
                         (736, 1010, 400, 98), (686, 985, 210, 52), (650, 960, 100, 26)]:
        epinette_neige(s, x, bas, h, l)
    A('</svg>')
    return "\n".join(s.out)


def scene_B2():
    s = Scene(6116)
    A = s.add
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    ciel(s, A, lune=False)
    collines(s, A)
    neige(s, A)
    chalet(s, A, 200, 770, larg=200)
    x0, x1, base = 300, 540, 806
    A('<defs><radialGradient id="feu2"><stop offset="0" stop-color="#FFF1D6"/><stop offset=".3" stop-color="' + K["or2"] + '"/>'
      f'<stop offset=".7" stop-color="{K["or_"]}" stop-opacity=".9"/><stop offset="1" stop-color="{K["or_"]}" stop-opacity="0"/></radialGradient></defs>')
    A(f'<ellipse cx="420" cy="780" rx="160" ry="90" fill="url(#feu2)" opacity=".9"/>')
    # le toit de l'appentis, épais, sous sa neige, sur trois poteaux
    A(f'<polygon points="{x0},{base - 132} {x1 + 16},{base - 96} {x1 + 16},{base - 80} {x0},{base - 114}" fill="{K["wall"]}"/>')
    A(f'<path d="M{x0 - 2} {base - 136} L{x1 + 20} {base - 100} q-6 7 -12 2 q-5 6 -11 0 L{x0} {base - 126}z" fill="{K["snow"]}"/>')
    for px in (x0 + 110, x1 - 2, x1 + 10):
        A(f'<rect x="{px}" y="{base - 92 + (px - x0) * 0.0}" width="7" height="94" fill="{K["wall"]}"/>')
    # la forge (foyer en pierre), son feu et son tuyau court
    A(f'<path d="M320 {base} v-42 h64 v42z" fill="{K["iron"]}"/>')
    A(f'<path d="M327 {base - 42} q16 -20 25 -5 q9 -20 22 2z" fill="#FFF1D6"/>')
    A(f'<rect x="347" y="{base - 168}" width="10" height="44" fill="{K["iron"]}"/>')
    fumee(A, 352, base - 170, sens=1, haut=40)
    # l'enclume et la silhouette qui frappe, plus grande, de profil, sans visage
    ax = 446
    A(f'<path d="M{ax - 11} {base} v-30 h22 v30z" fill="{K["iron"]}"/>')
    A(f'<path d="M{ax - 34} {base - 48} q12 -1 18 -4 h34 v9 h-5 q-4 0 -5 4 l-2 5 h4 l3 5 h-28 l3 -5 h4 l-2 -5 q-2 -4 -7 -4 q-10 -1 -17 -5z" fill="{K["iron"]}"/>')
    px, py = 492, base
    A(f'<path d="M{px - 10} {py} l5 -50 h12 l5 50 h-7 l-4 -38 l-4 38z" fill="{K["iron"]}"/>')
    A(f'<path d="M{px - 12} {py - 48} q2 -36 11 -42 h5 q10 5 11 42z" fill="{K["iron"]}"/>')
    A(f'<circle cx="{px - 1}" cy="{py - 100}" r="10" fill="{K["iron"]}"/>')
    A(f'<path d="M{px - 8} {py - 84} l-22 -20 l-6 -14" stroke="{K["iron"]}" stroke-width="6" stroke-linecap="round" fill="none"/>')
    A(f'<path d="M{px - 42} {py - 124} l13 -5 l4 10 l-13 5z" fill="{K["iron"]}"/>')
    A(f'<path d="M{px - 10} {py - 76} l-32 18" stroke="{K["iron"]}" stroke-width="6" stroke-linecap="round"/>')
    etincelles(s, A, ax - 50, ax + 30, base - 100, base - 44, 46, monte=False)
    corde_bois(A, 576, 806, n=8, rangs=4)
    bille_hache(A, 640, 860)
    traces(s, A, (420, 1000), (460, 816))
    for x, bas, h, l in [(-6, 1000, 440, 104), (58, 985, 250, 62), (110, 975, 140, 38),
                         (736, 1010, 400, 98), (686, 985, 210, 52), (700, 770, 100, 26)]:
        epinette_neige(s, x, bas, h, l)
    A('</svg>')
    return "\n".join(s.out)


if __name__ == "__main__":
    v = sys.argv[1] if len(sys.argv) > 1 else "A"
    svg = {"A": scene_A, "B": scene_B, "A2": scene_A2, "B2": scene_B2}[v]()
    out = os.path.join(ICI, f"ref-atelier-{v}.svg")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(svg + "\n")
    print(out)
