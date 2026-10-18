"""Vectorise une image générée (images/tomes/essais-ia/) en aplats nets pour l'impression : chaque couleur est
séparée en masque, tracée avec potrace, puis empilée du plus clair au plus foncé.
    python3 images/tomes/vectoriser.py essais-ia/tome-1-qwen-a.png tome-1.svg
"""
import os, sys
from multiprocessing import Pool
import numpy as np, potrace
from PIL import Image, ImageFilter

ICI = os.path.dirname(os.path.abspath(__file__))
K = 3
# (nom, couleur imprimée, test sur r, g, b, lum)
COUCHES = [
    ("gris-clair", "#BDBDBD", lambda r, g, b, l: (l >= 150) & (l < 225) & (abs(r - b) < 30)),
    ("gris", "#7A7A7A", lambda r, g, b, l: (l >= 70) & (l < 150) & (abs(r - b) < 30)),
    ("sol", "#333333", lambda r, g, b, l: (l >= 28) & (l < 70) & (abs(r - b) < 30)),
    ("orange", "#EE7219", lambda r, g, b, l: (r - b > 90) & (r > 180)),
    ("orange-pale", "#F7A35C", lambda r, g, b, l: (r - b > 90) & (r > 180) & (g > 140)),
    ("noir", "#111111", lambda r, g, b, l: l < 28),
]


def tracer(args):
    m, coul = args
    # le gris clair : seulement les grandes formes (le fil électrique sort en pointillé, on le laisse tomber)
    p = potrace.Bitmap(~m).trace(turdsize=3000 if coul == "#BDBDBD" else 30, alphamax=1.1, opticurve=True, opttolerance=0.4)   # potracer trace le False : on lui donne le négatif
    f = lambda pt: f"{pt.x / K:.2f} {pt.y / K:.2f}"
    d = []
    for c in p:
        d.append("M" + f(c.start_point))
        for s in c.segments:
            d.append(f"L{f(s.c)}L{f(s.end_point)}" if s.is_corner else f"C{f(s.c1)} {f(s.c2)} {f(s.end_point)}")
        d.append("Z")
    return f'<path fill="{coul}" fill-rule="evenodd" d="{"".join(d)}"/>'


if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    im = Image.open(os.path.join(ICI, src)).convert("RGB")
    im = im.resize((im.width * K, im.height * K), Image.LANCZOS).filter(ImageFilter.MedianFilter(5))
    a = np.asarray(im).astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]; l = (r + g + b) / 3
    taches = [(t(r, g, b, l), c) for _, c, t in COUCHES]
    with Pool() as p:
        res = p.map(tracer, taches)
    W, H = im.width // K, im.height // K
    open(os.path.join(ICI, dst), "w").write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">\n' + "\n".join(res) + "\n</svg>\n")
    print(dst)
