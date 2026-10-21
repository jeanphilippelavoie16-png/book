"""Planche de choix : les candidates en vignettes, le numéro au-dessus de chacune.
    python3 planche.py sortie.png image1.png image2.png ...   (5 par rangée)"""
import sys
from PIL import Image, ImageDraw, ImageFont

out, ims = sys.argv[1], sys.argv[2:]
TW, TH, BAND, GAP, PAR = 384, 480, 44, 6, 5
cols = min(PAR, len(ims)); rows = (len(ims) + PAR - 1) // PAR
W = cols * TW + (cols - 1) * GAP
H = rows * (TH + BAND) + (rows - 1) * GAP
pl = Image.new('RGB', (W, H), 'white')
d = ImageDraw.Draw(pl)
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 30)
for i, p in enumerate(ims):
    r, c = divmod(i, PAR)
    x, y = c * (TW + GAP), r * (TH + BAND + GAP)
    d.text((x + 6, y + 4), str(i + 1), fill='black', font=font)
    im = Image.open(p).convert('RGB').resize((TW, TH), Image.LANCZOS)
    pl.paste(im, (x, y + BAND))
pl.save(out)
print(out, pl.size)
