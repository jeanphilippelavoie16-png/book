"""L'image de départ de l'img2img : le lièvre et la grève dessinés grossièrement sur le coin bas gauche de l'image.
    python3 guide.py SOURCE SORTIE_PLEINE.png GUIDE.png MASQUE.png
SORTIE_PLEINE : l'image entière avec le dessin ; GUIDE : le carré 768 x 0-256, y 704-960 (1024 × 1024 sur l'image
3072) ; MASQUE : le masque du dessin (blanc) sur ce carré. Coordonnées de l'image 768 × 960, multipliées par K × S."""
import sys, math, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
sys.path.insert(0, '/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/scratchpad/lievre/horde')
import forme as F

src, out_full, out_guide, out_mask = sys.argv[1:5]
S = 2
im0 = Image.open(src).convert('RGB')
K = im0.width / 768
im = im0.resize((im0.width * S, im0.height * S), Image.LANCZOS)
mk = Image.new('L', im.size, 0)
d = ImageDraw.Draw(im); dm = ImageDraw.Draw(mk)
R = random.Random(3)
FONCE = (32, 23, 8); VERT = (29, 36, 31); CREME = (230, 220, 186); SABLE = (214, 202, 166); ORANGE = (245, 131, 44)
k = lambda v: v * K * S
P = lambda pts: [(k(x), k(y)) for x, y in pts]
w = lambda v: max(1, int(round(k(v))))

# la grève : une bande au pied des épinettes, du bord gauche jusque sous le bloc des tomes
EAU = F.chemin([((98, 889), (112, 893), (124, 897), (136, 902)), ((136, 902), (156, 910), (190, 926), (222, 939)),
                ((222, 939), (246, 949), (268, 957), (292, 966))])
HAUT = F.chemin([((-6, 902), (24, 896), (60, 891), (98, 889))])          # le pied des épinettes
GREVE = HAUT + EAU + [(292, 966), (-6, 966)]
d.polygon(P(GREVE), fill=SABLE); dm.polygon(P(GREVE), fill=255)
# le bord du sous-bois : de courtes touffes foncées qui sortent du pied des épinettes
for (x, y) in HAUT[::2]:
    h = R.uniform(2, 6)
    d.polygon(P([(x - 2.2, y - 1), (x + R.uniform(-1.5, 1.5), y + h), (x + 2.2, y - 1)]), fill=VERT)
# la bande de sable mouillé le long de l'eau, et la vaguelette crème qui lèche le bord
d.line(P(EAU), fill=FONCE, width=w(2.6))
d.line(P([(x + 2.5, y - 3.0) for x, y in EAU[3:]]), fill=CREME, width=w(1.3))
d.line(P([(x + 4.5, y - 5.2) for x, y in EAU[8:]]), fill=FONCE, width=w(0.9))
# les galets : petits ovales cernés, plus gros vers le bas à gauche (plus près de nous)
for _ in range(150):
    x = R.uniform(0, 250); y = R.uniform(886, 958)
    pt = (x, y)
    # dans la grève, loin du bord
    if mk.getpixel((int(k(x)), int(k(y)))) == 0 or mk.getpixel((int(k(x + 5)), int(k(y - 5)))) == 0:
        continue
    t = (y - 886) / 74
    r = 0.8 + 2.6 * t * R.uniform(0.6, 1.2)
    a = R.uniform(-0.3, 0.3)
    if R.random() < 0.3:
        d.ellipse(P([(x - r * 1.4, y - r * 0.8), (x + r * 1.4, y + r * 0.8)]), fill=FONCE)
    else:
        d.ellipse(P([(x - r * 1.4, y - r * 0.8), (x + r * 1.4, y + r * 0.8)]), fill=(196, 182, 146), outline=FONCE, width=w(0.6))

# le lièvre
cx, base, s = 129, 918, 60
H = lambda pts: P(F.place(pts, cx, base, s))
BRUN = (58, 40, 22)
for part in (F.OREILLE_G, F.CORPS, F.TETE, F.OREILLE_D):
    d.polygon(H(part), fill=BRUN); dm.polygon(H(part), fill=255)
d.polygon(H(F.BOUT_D), fill=FONCE)
for l in F.LISERE:
    d.line(H(l), fill=ORANGE, width=w(0.9))
d.line(H(F.BORD_OREILLE), fill=CREME, width=w(0.8))
x, y, r = F.OEIL
(ex, ey), = F.place([(x, y)], cx, base, s); rr = r * s / 100
d.ellipse(P([(ex - rr, ey - rr), (ex + rr, ey + rr)]), outline=CREME, width=w(0.5))
d.polygon(H(F.QUEUE_DESSOUS), fill=CREME)
for x, y, a, l in F.POILS:
    (px, py), = F.place([(x, y)], cx, base, s)
    L = l * s / 100; t = math.radians(a)
    d.line(P([(px, py), (px + L * math.cos(t), py + L * math.sin(t))]), fill=(150, 120, 90), width=w(0.6))

im = im.resize(im0.size, Image.LANCZOS)
mk = mk.resize(im0.size, Image.LANCZOS)
im.save(out_full)
box = (0, int(704 * K), int(256 * K), int(960 * K))
im.crop(box).save(out_guide)
mk.crop(box).save(out_mask)
print('ok')
