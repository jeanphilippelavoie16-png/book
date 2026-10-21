"""Planche de choix : les candidates côte à côte, numérotées au-dessus, cinq par rangée au plus, deux rangées égales au-delà.
    python3 planche.py <sortie.png> <image1> <image2> ...
"""
import sys
from PIL import Image, ImageDraw, ImageFont

out, imgs = sys.argv[1], sys.argv[2:]
cols = min(5, len(imgs)) if len(imgs) <= 5 else (len(imgs) + 1) // 2
rows = (len(imgs) + cols - 1) // cols
tw, th, bande, gap = 384, 480, 44, 6
W = cols * tw + (cols - 1) * gap
H = rows * (th + bande) + (rows - 1) * gap
pl = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(pl)
fnt = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)
for k, p in enumerate(imgs):
    r, c = divmod(k, cols)
    x, y = c * (tw + gap), r * (th + bande + gap)
    im = Image.open(p).convert("RGB").resize((tw, th), Image.LANCZOS)
    pl.paste(im, (x, y + bande))
    d.text((x + 6, y + 4), str(k + 1), fill="black", font=fnt)
pl.save(out)
print(out, pl.size)
