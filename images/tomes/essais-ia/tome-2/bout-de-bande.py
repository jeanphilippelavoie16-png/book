"""Redessiner le bout d'une bande de coton roulée, quand le générateur y a fait une spirale qui se lit comme une lettre
(« h », « g », « @ »). Chaque bout devient un ovale de papier cerné d'encre, avec deux tours d'enroulement et un petit
trou au centre. Le dessin se fait à quatre fois la taille puis se réduit, pour que le trait reste lisse.

    python3 bout-de-bande.py <entrée> <sortie.png> cx,cy,rx,ry [cx,cy,rx,ry ...]
"""
import sys
from PIL import Image, ImageDraw

PAPIER, ENCRE = (243, 234, 220), (46, 11, 8)
F = 4
im = Image.open(sys.argv[1]).convert("RGB")
for r in sys.argv[3:]:
    cx, cy, rx, ry = map(float, r.split(","))
    x0, y0, x1, y1 = int(cx - rx - 3), int(cy - ry - 3), int(cx + rx + 4), int(cy + ry + 4)
    morceau = im.crop((x0, y0, x1, y1)).resize(((x1 - x0) * F, (y1 - y0) * F), Image.LANCZOS)
    d = ImageDraw.Draw(morceau)
    ox, oy = (cx - x0) * F, (cy - y0) * F
    e = lambda a, b: [ox - a * F, oy - b * F, ox + a * F, oy + b * F]
    d.ellipse(e(rx, ry), fill=PAPIER, outline=ENCRE, width=int(1.6 * F))
    d.ellipse(e(rx * 0.62, ry * 0.66), outline=ENCRE, width=int(1.0 * F))
    d.ellipse(e(rx * 0.3, ry * 0.32), outline=ENCRE, width=int(0.9 * F))
    d.ellipse(e(rx * 0.1, ry * 0.1), fill=ENCRE)
    im.paste(morceau.resize((x1 - x0, y1 - y0), Image.LANCZOS), (x0, y0))
im.save(sys.argv[2])
print(sys.argv[2], im.size)
