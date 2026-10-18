"""Convertit AdobeStock_116570613.ai (un EPS d'Illustrator 16, CMYK, 6000 × 6000) en SVG.
    python3 -I eps2svg.py   →  silhouettes.svg (les couleurs d'origine), au-trait.svg (le style du livre)
Les mains (presque noir) deviennent blanches cernées de noir ; les objets tenus (vert, jaune) deviennent gris cernés.
"""
import os, re
ICI = os.path.dirname(os.path.abspath(__file__))
s = open(os.path.join(ICI, "AdobeStock_116570613.ai"), "rb").read().decode("latin-1")
s = s[s.find("%%EndPageSetup"):s.find("%%PageTrailer")]
NUM = re.compile(r"-?(\d+\.?\d*|\.\d+)")
pile, d, chemins, coul = [], [], [], (0, 0, 0, 0)
for t in s.split():
    if NUM.fullmatch(t): pile.append(t); continue
    if t == "mo": d.append("M" + " ".join(pile[-2:]))
    elif t == "li": d.append("L" + " ".join(pile[-2:]))
    elif t == "cv": d.append("C" + " ".join(pile[-6:]))
    elif t == "cp": d.append("Z")
    elif t == "cmyk": coul = tuple(float(x) for x in pile[-4:])
    elif t in ("f", "ef"):
        if d and not d[0].startswith("M6000 6000"): chemins.append((coul, t == "ef", " ".join(d)))
        d = []
    elif t in ("np", "clp"): d = []
    pile = []


def rgb(c):
    C, M, Y, K = c
    return "#%02x%02x%02x" % tuple(int(255 * (1 - v) * (1 - K)) for v in (C, M, Y))


def main_(c):     # la peau : presque noir, ou le gris de la deuxième main de la poignée
    return c[3] > 0.3 and abs(c[0] - c[1]) < 0.15


tete = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6000 6000" width="6000" height="6000">'
a = [tete] + [f'<path fill="{rgb(c)}" fill-rule="{"evenodd" if e else "nonzero"}" d="{p}"/>' for c, e, p in chemins] + ["</svg>"]
open(os.path.join(ICI, "silhouettes.svg"), "w").write("\n".join(a))
b = [tete]
for c, e, p in chemins:
    r = "evenodd" if e else "nonzero"
    if main_(c): b.append(f'<path fill="#FFFFFF" stroke="#1A1A1A" stroke-width="7" stroke-linejoin="round" fill-rule="{r}" d="{p}"/>')
    else: b.append(f'<path fill="#C8C8C8" stroke="#1A1A1A" stroke-width="5" stroke-linejoin="round" fill-rule="{r}" d="{p}"/>')
open(os.path.join(ICI, "au-trait.svg"), "w").write("\n".join(b + ["</svg>"]))
print(len(chemins), "tracés ;", sorted({rgb(c) for c, _, _ in chemins}))
