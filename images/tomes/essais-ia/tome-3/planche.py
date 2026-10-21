"""Planche de choix : les candidates côte à côte, numéro au-dessus de chacune.
    python3 planche.py sortie.png a.png b.png ...      (5 par rangée)"""
import sys
from PIL import Image, ImageDraw, ImageFont

out, ims = sys.argv[1], sys.argv[2:]
cw, ch, bande, gap, par = 384, 480, 44, 6, 5
rangs = (len(ims) + par - 1) // par
cols = min(par, len(ims))
pl = Image.new("RGB", (cols * cw + (cols - 1) * gap, rangs * (ch + bande) + (rangs - 1) * gap), "white")
d = ImageDraw.Draw(pl)
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)
except OSError:
    font = ImageFont.load_default()
for k, p in enumerate(ims):
    r, c = divmod(k, par)
    x, y = c * (cw + gap), r * (ch + bande + gap)
    d.text((x + 6, y + 4), str(k + 1), fill="black", font=font)
    pl.paste(Image.open(p).convert("RGB").resize((cw, ch), Image.LANCZOS), (x, y + bande))
pl.save(out)
print(out, pl.size)
