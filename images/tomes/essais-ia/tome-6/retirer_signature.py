"""Retirer une fausse signature posée sur de la neige unie : on recopie par-dessus une pièce de neige vide prise
à la même hauteur, juste à côté (vérifiée sans aucun trait). Rien d'autre ne change dans l'image.
    python3 retirer_signature.py <entrée.png> <sortie.png> x0 y0 x1 y1"""
import sys
from PIL import Image, ImageStat

src, out = sys.argv[1], sys.argv[2]
x0, y0, x1, y1 = map(int, sys.argv[3:7])
im = Image.open(src).convert("RGB")
w, h = x1 - x0, y1 - y0
best = None
for dx in list(range(-(x0), 0, 4)) + list(range(w + 4, im.width - x0 - w + 1, 4)):
    sx = x0 + dx
    if sx < 0 or sx + w > im.width:
        continue
    for dy in (0, -4, 4, -8, 8):
        sy = y0 + dy
        if sy < 0 or sy + h > im.height:
            continue
        p = im.crop((sx, sy, sx + w, sy + h)).convert("L")
        lo = p.getextrema()[0]
        m = ImageStat.Stat(p).mean[0]
        if lo > 175 and (best is None or abs(dx) + abs(dy) < best[0]):
            best = (abs(dx) + abs(dy), sx, sy, lo, m)
if not best:
    sys.exit("aucune pièce de neige vide à côté")
_, sx, sy, lo, m = best
im.paste(im.crop((sx, sy, sx + w, sy + h)), (x0, y0))
im.save(out)
print(out, "pièce prise en", sx, sy, "min", lo, "moyenne", round(m))
