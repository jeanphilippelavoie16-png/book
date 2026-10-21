"""Planche de choix : les candidates côte à côte, le numéro au-dessus de chacune.
    python3 planche_choix.py <sortie.png> <image1> <image2> ...
Chaque image est réduite à 384 × 480 (moitié de 768 × 960), cinq par rangée."""
import sys
from PIL import Image, ImageDraw, ImageFont

out, imgs = sys.argv[1], sys.argv[2:]
cw, ch, bande, gap, par = 384, 480, 44, 6, 5
rangs = (len(imgs) + par - 1) // par
cols = min(par, len(imgs))
W = cols * cw + (cols - 1) * gap
H = rangs * (bande + ch) + (rangs - 1) * gap
planche = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(planche)
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)
except OSError:
    font = ImageFont.load_default()
for i, p in enumerate(imgs):
    r, c = divmod(i, par)
    x, y = c * (cw + gap), r * (bande + ch + gap)
    d.text((x + 6, y + 4), str(i + 1), fill="black", font=font)
    im = Image.open(p).convert("RGB").resize((cw, ch), Image.LANCZOS)
    planche.paste(im, (x, y + bande))
planche.save(out)
print(out, planche.size)
