"""feuille.py — monte la feuille d'essai des modèles (mains, têtes, corps) en une image à montrer."""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageOps
D = os.environ.get('NOTICE_SORTIE', '/home/user/book/_reprise/scratchpad/modeles/notice')
F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 26)
def crop(f):
    im = Image.open(os.path.join(D, f + '.png')).convert('L'); bb = ImageOps.invert(im).getbbox(); return im.crop(bb)
mains = [('prise-dos', 'La prise, de trois quarts'), ('prise-paume', 'La prise, côté paume'), ('pince-profil', 'La pince, de profil'),
         ('pince-dessous', 'La pince, de face'), ('boule-cote', 'La boule'), ('appui-dos', 'La main à plat, de dessus'),
         ('appui-profil', 'La main à plat, de profil')]
c = Image.new('L', (1800, 2*440 + 400 + 560), 255); d = ImageDraw.Draw(c)
for k, (f, t) in enumerate(mains):
    x = (k % 4)*450 + 10; y = (k // 4)*440 + 10
    d.text((x, y), t, fill=0, font=F); i = crop(f); i.thumbnail((420, 350)); c.paste(i, (x, y + 44))
y0 = 2*440 + 20; d.text((10, y0), 'Les têtes : adulte, enfant, bébé', fill=0, font=F); i = crop('tetes'); i.thumbnail((1100, 330)); c.paste(i, (10, y0 + 44))
y1 = y0 + 400; d.text((10, y1), 'Le personnage : debout, à genoux, accroupi', fill=0, font=F); i = crop('corps'); i.thumbnail((1000, 480)); c.paste(i, (10, y1 + 44))
out = os.path.join(D, 'feuille-notice.jpg'); c.save(out, quality=90); print(out)
