"""Tome 4 : la candidate 2 retravaillée (JP, 18 octobre 2026 : « la 2, mais retravaille ombre, soleil et objets pour
moins l'air AI »). Ce qui faisait IA : le soleil lisse en dégradé et son halo, le reflet en échelle de barres floues,
les ombres molles sur la neige, la chaloupe aux poignées de traîneau et aux rames croisées, la fumée en S parfait, les
seize poissons identiques en rangs, deux sapins miniatures posés sur la neige. On les refait comme une linogravure :
aplats, bords nets, entailles de gouge.
    python3 retouche_lac.py SOURCE SORTIE
Les coordonnées sont celles de l'image 768 × 960 ; elles se multiplient par K (4 sur l'image agrandie)."""
import sys, random, math
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
K = im.width / 768
R = random.Random(4)
ORIG = np.asarray(im).astype(int)
CIEL = (51, 82, 89); PAPIER = (245, 234, 204); ORANGE = (246, 128, 32); ENCRE = (20, 28, 36); OMBRE = (104, 124, 120)
d = ImageDraw.Draw(im)
k = lambda v: v * K
P = lambda pts: [(k(x), k(y)) for x, y in pts]
def lum(x, y):
    return ORIG[int(k(y)), int(k(x))].mean()

def trait(pts, w0, w1, fill):
    """Une entaille effilée : largeur w0 au départ, w1 au bout (en px de l'image 768)."""
    gauche, droite = [], []
    for i, (x, y) in enumerate(pts):
        a = pts[min(i + 1, len(pts) - 1)]; b = pts[max(i - 1, 0)]
        dx, dy = a[0] - b[0], a[1] - b[1]; n = math.hypot(dx, dy) or 1
        w = (w0 + (w1 - w0) * i / (len(pts) - 1)) / 2
        gauche.append((x - dy / n * w, y + dx / n * w)); droite.append((x + dy / n * w, y - dx / n * w))
    d.polygon(P(gauche + droite[::-1]), fill=fill)

# 1. le soleil : un aplat orange au bord net, sans halo, barré de trois entailles couleur du ciel
cx, cy, r = 478, 481, 53
H, W = ORIG.shape[:2]
yy, xx = np.mgrid[0:H, 0:W] / K
dist = np.hypot(xx - cx, yy - cy)
colline = ORIG.mean(2) < 45
arr = np.asarray(im).copy()
halo = (dist < r + 10) & (yy < 520) & ~colline
arr[halo] = CIEL
ang = np.arctan2(yy - cy, xx - cx)
bord_main = r + 0.5 * np.sin(ang * 7 + 1.3) + 0.35 * np.sin(ang * 13)      # le bord coupé à la main, pas au compas
arr[(dist <= bord_main) & (yy < 520) & ~colline] = ORANGE
im = Image.fromarray(arr.astype(np.uint8)); d = ImageDraw.Draw(im)
# la colline repasse devant
arr = np.asarray(im).copy(); arr[colline & (yy < 520) & (dist < r + 12)] = ORIG[colline & (yy < 520) & (dist < r + 12)]
im = Image.fromarray(arr.astype(np.uint8)); d = ImageDraw.Draw(im)

# 2. le reflet : le lac remis à plat, puis des traits orange effilés qui raccourcissent en descendant
d.rectangle(P([(386, 523), (488, 642)]), fill=CIEL)
y = 525.0
while y < 640:
    t = (y - 525) / 115; demi = 34 * (1 - t * 0.75); x = 470 - demi * R.uniform(0.7, 1.1)
    while x < 470 + demi * R.uniform(0.7, 1.1):                 # chaque rangée : deux à quatre morceaux, pas une barre
        L = R.uniform(5, 22) * (1 - t * 0.5); e = R.uniform(1.4, 2.6) * (1 - t * 0.45)
        if R.random() > t * 0.55:
            trait([(x, y + R.uniform(-0.6, 0.6)), (x + L / 2, y + R.uniform(-0.5, 0.5)), (x + L, y + R.uniform(-0.6, 0.6))], 0.3, e, ORANGE)
        x += L + R.uniform(3, 10)
    y += R.uniform(3.8, 7.5) + t * 3

# 3. la fumée : le S parfait part, deux filets qui ondulent et s'amincissent montent du feu
zf = (xx > 334) & (xx < 406) & (yy > 575) & (yy < 700)
fum = zf & (np.abs(ORIG - np.array(CIEL)).sum(2) > 30) & (ORIG[:, :, 0] - ORIG[:, :, 2] < 70)      # pas la flamme
fum |= (xx > 364) & (xx < 394) & (yy >= 684) & (yy < 697) & (ORIG.min(2) > 175)          # le bout blanc du S sur la flamme
ra, rb = 717, 705                                            # la rive à x = 348 et à x = 408
lac = yy < ra + (rb - ra) * (xx - 348) / 60 - 0.5
arr = np.asarray(im).copy(); arr[ndimage.binary_dilation(fum, iterations=int(2 * K)) & lac] = CIEL
im = Image.fromarray(arr.astype(np.uint8)); d = ImageDraw.Draw(im)
# la fumée penche vers les poissons : un ruban large d'une encre à peine plus claire que le lac, qui ondule et
# s'amincit, plutôt qu'un trait blanc
FUMEE = (84, 110, 116)
pts = [(380 - 64 * u + 7 * math.sin(1.2 + 7 * u), ra + (rb - ra) * 0.5 - 2 - 108 * u) for u in np.linspace(0, 1, 40)]
trait(pts, 11, 3, FUMEE)
pts = [(384 - 40 * u + 5 * math.sin(3.0 + 9 * u), ra + (rb - ra) * 0.5 - 14 - 70 * u) for u in np.linspace(0, 1, 30)]
trait(pts, 5, 1.2, FUMEE)

# 4. la chaloupe part ; un canot de profil sur la neige, l'intérieur éclairé par le feu, son ombre en aplat
zone_c = Image.new('L', im.size, 0)
ImageDraw.Draw(zone_c).polygon(P([(433, 707), (468, 702), (540, 724), (604, 737), (618, 800), (612, 884), (442, 884), (434, 840)]), fill=255)
vieux = (np.asarray(zone_c) > 0) & (np.abs(ORIG - np.array(PAPIER)).sum(2) > 60)      # la chaloupe, ses rames, son ombre
arr = np.asarray(im).copy(); arr[ndimage.binary_dilation(vieux, iterations=int(2 * K))] = PAPIER
im = Image.fromarray(arr.astype(np.uint8)); d = ImageDraw.Draw(im)
for _ in range(9):                                            # la neige garde ses entailles d'ombre
    x, yv = R.uniform(430, 590), R.uniform(745, 875); L = R.uniform(8, 18)
    trait([(x, yv), (x + L / 2, yv - 0.8), (x + L, yv)], 0.4, 1.8, OMBRE)
BOIS = (171, 108, 77)
x0, y0, x1, y1 = 442, 806, 606, 790                           # les deux bouts du canot, au-dessus du bloc des tomes
def base(t): return x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
def plat_bord(t):                                             # le bord proche : bas au milieu, relevé en pointe aux bouts
    bx, by = base(t); u = abs(2 * t - 1); return bx, by - 20 - 26 * u ** 3.5
def plat_bord_loin(t):                                        # le bord du fond, vu un peu d'en haut
    bx, by = plat_bord(t); return bx, by - 7 * (1 - abs(2 * t - 1) ** 2.4)
def fond(t):                                                  # la coque : un peu de bascule, qui remonte rejoindre la pointe
    bx, by = base(t); u = abs(2 * t - 1); return bx, by - 45 * u ** 6
ts = np.linspace(0, 1, 90)
tsb = np.linspace(0.08, 0.92, 60)
d.polygon(P([(base(t)[0] + 12, base(t)[1] + 5) for t in tsb] + [(base(t)[0] - 3, base(t)[1] + 0.5) for t in tsb[::-1]]), fill=OMBRE)
d.polygon(P([plat_bord_loin(t) for t in ts] + [plat_bord(t) for t in ts[::-1]]), fill=BOIS)            # l'intérieur, au feu
for t in (0.33, 0.5, 0.67):                                                                          # les traverses
    (ax, ay), (bx_, by_) = plat_bord(t), plat_bord_loin(t); trait([(ax - 1.5, ay), (bx_ + 1.5, by_)], 2.2, 1.6, ENCRE)
d.polygon(P([plat_bord(t) for t in ts] + [fond(t) for t in ts[::-1]]), fill=ENCRE)                     # la coque
trait([(plat_bord(t)[0], plat_bord(t)[1] + 3.2) for t in np.linspace(0.06, 0.94, 50)], 1.0, 1.0, PAPIER)  # le plat-bord, à la gouge
for a_, b_, dec in ((0.2, 0.45, 10), (0.55, 0.82, 10), (0.3, 0.7, 16)):                              # les bordages
    trait([(plat_bord(t)[0], plat_bord(t)[1] + dec + 2 * math.sin(math.pi * t)) for t in np.linspace(a_, b_, 20)], 0.3, 1.2, PAPIER)

# 5. les deux sapins miniatures posés sur la neige partent
for b in ((26, 868, 64, 930), (486, 868, 514, 906), (424, 722, 435, 735)):      # et un reste de la poignée de la chaloupe
    d.rectangle(P([(b[0], b[1]), (b[2], b[3])]), fill=PAPIER)

# 6. les poissons : seize identiques en rangs ; on les reprend un à un, en garde treize, chacun un peu différent
X0, Y0, X1, Y1 = 98, 521, 303, 702
box = [int(k(v)) for v in (X0, Y0, X1, Y1)]
zone = ORIG[box[1]:box[3], box[0]:box[2]]
fond = np.abs(zone - np.array(CIEL)).sum(2) > 70
fond = ndimage.binary_opening(fond, iterations=max(2, int(1.6 * K)))
fond = ndimage.binary_fill_holes(fond)
lab, n = ndimage.label(fond)
gabarits = []                                                 # les poissons qui ne touchent pas leurs voisins
for s_ in ndimage.find_objects(lab):
    h_, w_ = s_[0].stop - s_[0].start, s_[1].stop - s_[1].start
    if 60 * K < h_ < 90 * K and 18 * K < w_ < 28 * K:
        m = lab[s_] == lab[s_][h_ // 2, w_ // 2]
        gabarits.append(Image.fromarray(np.dstack([zone[s_], m * 255]).astype(np.uint8), 'RGBA'))
poissons = [gabarits[i % len(gabarits)] for i in range(15)]
d.rectangle(P([(X0, Y0), (X1, Y1)]), fill=CIEL)
rangs = [(8, 527, 110, 294), (7, 612, 118, 288)]
k_ = 0; a_poser = []
for nb, haut, xa, xb in rangs:
    pas = (xb - xa) / (nb - 1)
    for j in range(nb):
        if k_ >= len(poissons): break
        p = poissons[k_]; k_ += 1
        if R.random() < 0.07: continue                                  # un poisson déjà décroché
        f = R.uniform(0.92, 1.16); p = p.resize((int(p.width * f), int(p.height * f)), Image.LANCZOS)
        if R.random() < 0.3: p = p.transpose(Image.FLIP_LEFT_RIGHT)
        p = p.rotate(R.uniform(-8, 8), resample=Image.BICUBIC, expand=True)
        x = xa + j * pas + R.uniform(-6, 6); y = haut + R.uniform(-4, 12)
        trait([(x + R.uniform(-1, 1), 519), (x, y + 3)], 1.1, 1.0, ENCRE)                         # la ficelle
        a_poser.append((p, x, y))
for p, x, y in a_poser:                                       # les poissons par-dessus les ficelles du rang du bas
    im.paste(p, (int(k(x) - p.width / 2), int(k(y))), p)

# 7. les ombres de la neige : les dégradés gris deviennent un aplat, comme une encre de plus
arr = np.asarray(im).astype(int)
sous = yy > 690
sat = arr.max(2) - arr.min(2); L = arr.mean(2)
gris = sous & (sat < 45)
arr[gris & (L >= 185)] = PAPIER
arr[gris & (L >= 85) & (L < 185)] = OMBRE
Image.fromarray(arr.astype(np.uint8)).save(dst, quality=95)
print('ok', dst)
