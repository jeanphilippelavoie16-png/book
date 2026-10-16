"""Frises des pages de titre des tomes (plan de match, point 30 ; JP, 16 octobre 2026).

Composées avec des pictogrammes de jeux professionnels sous licence libre (images/tomes/icones/, crédits dans
images/tomes/LISEZMOI.md), pas dessinées à la main : JP a refusé l'essai dessiné avec nos formes simples.
    python3 images/tomes/frise.py 1   →  images/tomes/tome-1.svg
"""
import os, re, sys
from svgpathtools import parse_path

ICI = os.path.dirname(os.path.abspath(__file__))
NOIR, GRIS, OR = "#1A1A1A", "#BCC4CA", "#EE7219"
W, H, SOL = 2100, 630, 604


def icone(nom):
    s = open(os.path.join(ICI, "icones", nom + ".svg")).read()
    ds = re.findall(r' d="([^"]+)"', s)
    x0 = y0 = 1e9; x1 = y1 = -1e9
    for d in ds:
        a, b, c, e = parse_path(d).bbox()
        x0, x1, y0, y1 = min(x0, a), max(x1, b), min(y0, c), max(y1, e)
    return ds, (x0, y0, x1, y1)


def poser(nom, x, bas, haut, coul, miroir=False, coupe=None):
    """L'icône, sa boîte de contenu posée avec le coin bas gauche en (x, bas), haute de `haut`.
    coupe=(y_icone, coul_dessous) : sous cette ligne (en unités de l'icône), une autre couleur."""
    ds, (x0, y0, x1, y1) = icone(nom)
    k = haut / (y1 - y0); l = (x1 - x0) * k
    if miroir:
        t = f"translate({x + l:.1f} {bas - haut:.1f}) scale({-k:.4f} {k:.4f}) translate({-x0:.3f} {-y0:.3f})"
    else:
        t = f"translate({x:.1f} {bas - haut:.1f}) scale({k:.4f}) translate({-x0:.3f} {-y0:.3f})"
    corps = "".join(f'<path d="{d}"/>' for d in ds)
    if not coupe:
        return f'<g transform="{t}" fill="{coul}">{corps}</g>', l
    yc, c2 = coupe
    i = abs(hash((nom, x)))
    return (f'<g transform="{t}"><clipPath id="h{i}"><rect x="-1e4" y="-1e4" width="2e4" height="{1e4 + yc}"/></clipPath>'
            f'<clipPath id="b{i}"><rect x="-1e4" y="{yc}" width="2e4" height="2e4"/></clipPath>'
            f'<g fill="{coul}" clip-path="url(#h{i})">{corps}</g><g fill="{c2}" clip-path="url(#b{i})">{corps}</g></g>'), l


def tome1():
    o = []
    o.append(poser("game-icons--mushroom-cloud", 60, SOL, 520, GRIS)[0])
    o.append(poser("mdi--transmission-tower-off", 520, SOL, 330, GRIS)[0])
    o.append(poser("mdi--weather-snowy-heavy", 600, 240, 210, GRIS)[0])
    o.append(poser("fa6-solid--house-fire", 1470, SOL, 170, GRIS)[0])
    o.append(poser("game-icons--burning-forest", 1690, SOL, 400, GRIS)[0])
    # la famille, serrée, devant le feu
    g, l = poser("mdi--human-male-female-child", 850, SOL, 400, NOIR)
    o.append(g)
    o.append(poser("mdi--campfire", 1285, SOL, 185, OR, coupe=(14.9, NOIR))[0])
    o.append(f'<rect x="0" y="{SOL}" width="{W}" height="5" fill="{NOIR}"/>')
    return o


if __name__ == "__main__":
    t = sys.argv[1] if len(sys.argv) > 1 else "1"
    o = {"1": tome1}[t]()
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">\n' + "\n".join(o) + "\n</svg>\n"
    open(os.path.join(ICI, f"tome-{t}.svg"), "w").write(svg)
    print(f"images/tomes/tome-{t}.svg")
