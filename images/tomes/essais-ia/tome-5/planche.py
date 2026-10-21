"""Planche de choix : les candidates côte à côte, numéro au-dessus de chacune.
    python3 planche.py sortie.png a.png b.png …   (5 par rang, comme titre-nuit-pistes-2.png)"""
import sys
from PIL import Image, ImageDraw, ImageFont

out, files = sys.argv[1], sys.argv[2:]
cw, ch, top, gap, par_rang = 384, 480, 44, 6, 5
rangs = (len(files) + par_rang - 1) // par_rang
cols = min(par_rang, len(files))
W = cols * cw + (cols - 1) * gap
H = rangs * (ch + top) + (rangs - 1) * gap
pl = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(pl)
try:
    fnt = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)
except OSError:
    fnt = ImageFont.load_default()
for i, f in enumerate(files):
    r, c = divmod(i, par_rang)
    x, y = c * (cw + gap), r * (ch + top + gap)
    im = Image.open(f).convert("RGB").resize((cw, ch), Image.LANCZOS)
    pl.paste(im, (x, y + top))
    d.text((x + 6, y + 4), str(i + 1), fill="black", font=fnt)
pl.save(out)
print(out, pl.size)
