"""Vectorise source.png (la planche de mains choisie par JP le 18 octobre 2026) : couche des mains (noir), des objets
tenus (vert) et de la main grise, tracées séparément avec potrace, rangée par rangée en parallèle ; puis la version
au trait du livre.
    python3 tracer.py   →  silhouettes.svg, au-trait.svg
"""
import os
from multiprocessing import Pool
import numpy as np, potrace
from PIL import Image

ICI = os.path.dirname(os.path.abspath(__file__))
K = 2


def masques():
    im = Image.open(os.path.join(ICI, "source.png")).convert("RGB")
    im = im.resize((im.width * K, im.height * K), Image.LANCZOS)
    a = np.asarray(im).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    lum = (r + g + b) / 3
    noir = (lum < 110) & (abs(r - g) < 25) & (abs(g - b) < 25)
    vert = (g - r > 18) & (lum < 215) & ~noir
    gris = (lum >= 110) & (lum < 150) & (abs(r - g) < 15) & ~vert      # la main grise de la poignée de main
    return im.width // K, im.height // K, noir, vert, gris


def bandes(tout):
    """Les rangées de mains, séparées par des lignes vides."""
    vide = ~tout.any(axis=1); out = []; y0 = None
    for y, v in enumerate(vide):
        if not v and y0 is None: y0 = y
        if v and y0 is not None: out.append((y0, y)); y0 = None
    if y0 is not None: out.append((y0, len(vide)))
    return out


def tracer1(args):
    masque, dy = args
    p = potrace.Bitmap(masque).trace(turdsize=40, alphamax=1.0, opticurve=True, opttolerance=0.3)
    f = lambda pt: f"{pt.x / K:.2f} {(pt.y + dy) / K:.2f}"
    d = []
    for c in p:
        d.append("M" + f(c.start_point))
        for s in c.segments:
            d.append(f"L{f(s.c)}L{f(s.end_point)}" if s.is_corner else f"C{f(s.c1)} {f(s.c2)} {f(s.end_point)}")
        d.append("Z")
    return "".join(d)


if __name__ == "__main__":
    W, H, noir, vert, gris = masques()
    lots = bandes(noir | vert | gris)
    taches = [(m[a:b], a) for m in (noir, vert, gris) for a, b in lots]
    with Pool() as p:
        res = p.map(tracer1, taches)
    n = len(lots)
    dn, dv, dg = "".join(res[:n]), "".join(res[n:2 * n]), "".join(res[2 * n:])
    tete = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
    open(os.path.join(ICI, "silhouettes.svg"), "w").write(
        f'{tete}<path fill="#6E9580" fill-rule="evenodd" d="{dv}"/><path fill="#5A5A5A" fill-rule="evenodd" d="{dg}"/>'
        f'<path fill="#1A1A1A" fill-rule="evenodd" d="{dn}"/></svg>\n')
    # au trait : la main en blanc cernée de noir, l'objet tenu en gris
    open(os.path.join(ICI, "au-trait.svg"), "w").write(
        f'{tete}<path fill="#C8C8C8" stroke="#1A1A1A" stroke-width="2" fill-rule="evenodd" d="{dv}"/>'
        f'<path fill="#1A1A1A" stroke="#1A1A1A" stroke-width="4.5" stroke-linejoin="round" fill-rule="evenodd" d="{dg}{dn}"/>'
        f'<path fill="#FFFFFF" fill-rule="evenodd" d="{dg}{dn}"/></svg>\n')
    print(n, "rangées", len(dn), len(dv), len(dg))
