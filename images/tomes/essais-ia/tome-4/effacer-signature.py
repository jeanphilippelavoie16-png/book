"""Effacer une fausse signature posée sur un aplat (neige, ciel) en y recopiant un morceau voisin du même aplat.
    python3 effacer-signature.py entree.png sortie.png x0,y0,x1,y1:sx,sy [x0,y0,x1,y1:sx,sy ...]
Chaque zone (x0,y0)-(x1,y1) reçoit le rectangle de même taille pris à (sx,sy). Les bords sont fondus sur 4 px."""
import sys
from PIL import Image, ImageFilter

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
for z in sys.argv[3:]:
    box, s = z.split(':')
    x0, y0, x1, y1 = map(int, box.split(','))
    sx, sy = map(int, s.split(','))
    w, h = x1 - x0, y1 - y0
    morceau = im.crop((sx, sy, sx + w, sy + h))
    masque = Image.new('L', (w, h), 0)
    masque.paste(255, (4, 4, w - 4, h - 4))
    masque = masque.filter(ImageFilter.GaussianBlur(2))
    im.paste(morceau, (x0, y0), masque)
im.save(out)
print(out)
