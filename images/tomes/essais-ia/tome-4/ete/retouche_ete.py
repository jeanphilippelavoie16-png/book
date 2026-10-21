"""Tome 4, version d'été : la n° 6 retouchée (JP, 18 octobre 2026 : « tome 4, la 6, mais règle ombre, soleil, et varie
grosseur de poisson »). Le soleil devient un aplat orange au bord coupé à la main, sans le liseré sombre ni le dégradé
du bord ; son reflet, une échelle de barres floues, devient des morceaux de traits effilés, de plus en plus rares en
descendant ; les seize poissons pareils deviennent une quinzaine de tailles différentes (de 0,7 à 1,3 fois), penchés
et espacés à la main. Les deux bêtes couchées dans l'herbe, en bas, et l'oiseau du ciel partent.
    python3 retouche_ete.py SOURCE SORTIE
Les coordonnées sont celles de l'image 768 × 960 ; elles se multiplient par K (4 sur l'image agrandie)."""
import sys, random, math
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
K = im.width / 768
R = random.Random(11)
ORIG = np.asarray(im).astype(int)
H, W = ORIG.shape[:2]
yy, xx = np.mgrid[0:H, 0:W] / K
med = lambda x0, y0, x1, y1: tuple(int(v) for v in np.median(ORIG[int(y0 * K):int(y1 * K), int(x0 * K):int(x1 * K)].reshape(-1, 3), 0))
CIEL = med(100, 200, 300, 350); LAC = med(330, 560, 380, 640); ORANGE = (248, 120, 20); ENCRE = (18, 28, 34)
k = lambda v: v * K
P = lambda pts: [(k(x), k(y)) for x, y in pts]

def trait(d, pts, w0, w1, fill):
    """Une entaille effilée : largeur w0 au départ, w1 au bout (en px de l'image 768)."""
    gauche, droite = [], []
    for i, (x, y) in enumerate(pts):
        a = pts[min(i + 1, len(pts) - 1)]; b = pts[max(i - 1, 0)]
        dx, dy = a[0] - b[0], a[1] - b[1]; n = math.hypot(dx, dy) or 1
        w = (w0 + (w1 - w0) * i / (len(pts) - 1)) / 2
        gauche.append((x - dy / n * w, y + dx / n * w)); droite.append((x + dy / n * w, y - dx / n * w))
    d.polygon(P(gauche + droite[::-1]), fill=fill)

arr = ORIG.copy()
# 1. le soleil : aplat net ; la colline et le rivage passent devant
cx, cy, r = 478.5, 492, 57
dist = np.hypot(xx - cx, yy - cy)
colline = (ORIG.mean(2) < 45) | (yy > 519)
ang = np.arctan2(yy - cy, xx - cx)
bord = r + 0.5 * np.sin(ang * 7 + 0.4) + 0.35 * np.sin(ang * 13)
arr[(dist < r + 9) & ~colline] = CIEL
arr[(dist <= bord) & ~colline] = ORANGE
# 2. l'oiseau du ciel part
arr[(xx > 88) & (xx < 132) & (yy > 412) & (yy < 440) & (np.abs(ORIG - np.array(CIEL)).sum(2) > 30)] = CIEL
im = Image.fromarray(arr.astype(np.uint8)); d = ImageDraw.Draw(im)

# 3. le reflet : le lac remis à plat sous le soleil, puis des morceaux de traits effilés
d.rectangle(P([(388, 521), (502, 650)]), fill=LAC)
y = 524.0
while y < 648:
    t = (y - 524) / 124; demi = 40 * (1 - t * 0.7); x = 476 - demi * R.uniform(0.7, 1.1)
    while x < 476 + demi * R.uniform(0.7, 1.1):
        L = R.uniform(5, 22) * (1 - t * 0.5); e = R.uniform(1.4, 2.6) * (1 - t * 0.45)
        if R.random() > t * 0.55:
            trait(d, [(x, y + R.uniform(-0.6, 0.6)), (x + L / 2, y + R.uniform(-0.5, 0.5)), (x + L, y + R.uniform(-0.6, 0.6))], 0.3, e, ORANGE)
        x += L + R.uniform(3, 10)
    y += R.uniform(3.8, 7.5) + t * 3
# les épinettes et le chalet de droite repassent devant le reflet
devant = (xx > 470) & (xx < 510) & (yy > 521) & (yy < 650) & (ORIG.mean(2) < 45)
arr = np.asarray(im).copy(); arr[devant] = ORIG[devant]
im = Image.fromarray(arr.astype(np.uint8)); d = ImageDraw.Draw(im)

# 4. les deux bêtes couchées dans l'herbe : on recouvre de l'herbe voisine, prise juste au-dessus
for x0, y0, x1, y1 in ((125, 850, 228, 910), (590, 858, 700, 915)):
    h = y1 - y0
    pris = Image.fromarray(ORIG.astype(np.uint8)).crop((int(k(x0)), int(k(y0 - h - 6)), int(k(x1)), int(k(y0 - 6))))
    masque = Image.new('L', pris.size, 0)
    ImageDraw.Draw(masque).ellipse([int(k(3)), int(k(3)), pris.width - int(k(3)), pris.height - int(k(3))], fill=255)
    masque = Image.fromarray(ndimage.gaussian_filter(np.asarray(masque).astype(float), 2 * K).astype(np.uint8))
    im.paste(pris, (int(k(x0)), int(k(y0))), masque)
d = ImageDraw.Draw(im)

# 5. les poissons : on relève les gabarits, on vide le séchoir, on les raccroche de tailles différentes
X0, Y0, X1, Y1 = 96, 521, 304, 699
# les poissons se touchent : chaque gabarit est découpé dans une colonne, avec sa queue ; le masque garde ce qui n'est
# pas du lac
gabarits = []
for x0, y0, x1, y1 in ((147, 532, 170, 614), (171, 532, 195, 614), (195, 532, 219, 614),
                       (146, 614, 171, 696), (171, 616, 194, 696), (197, 616, 222, 696)):
    z = ORIG[int(k(y0)):int(k(y1)), int(k(x0)):int(k(x1))]
    m = ndimage.binary_opening(np.abs(z - np.array(LAC)).sum(2) > 60, iterations=max(1, int(K / 2)))
    gabarits.append(Image.fromarray(np.dstack([z, m * 255]).astype(np.uint8), 'RGBA'))
d.rectangle(P([(X0, Y0), (X1, Y1)]), fill=LAC)
R.shuffle(gabarits)
a_poser, gi = [], 0
for haut, xa, xb, f0, f1, fond_max in ((531, 104, 296, 0.62, 1.35, 614), (612, 106, 294, 0.68, 1.08, 703)):
    rang, x, essais = [], xa, 0
    while essais < 40:
        essais += 1
        f = R.uniform(f0, f1)
        p = gabarits[gi % len(gabarits)]; gi += 1
        w_ = p.width * f / K
        if x + w_ > xb: break
        p = p.resize((int(p.width * f), int(p.height * f)), Image.LANCZOS)
        if R.random() < 0.3: p = p.transpose(Image.FLIP_LEFT_RIGHT)
        p = p.rotate(R.uniform(-7, 7), resample=Image.BICUBIC, expand=True)
        yp = haut + R.uniform(-3, 8)
        if yp + p.height / K > fond_max:
            continue
        rang.append([p, x + w_ / 2, yp, w_])
        x += w_ + R.uniform(1.5, 7)
    if rang:                                                  # le rang se centre entre les deux poteaux
        dx = (xa + xb) / 2 - (rang[0][1] - rang[0][3] / 2 + rang[-1][1] + rang[-1][3] / 2) / 2
        for q in rang:
            q[1] += dx
            trait(d, [(q[1] + R.uniform(-1, 1), 517), (q[1], q[2] + 3)], 1.0, 0.9, ENCRE)      # la ficelle
            a_poser.append((q[0], q[1], q[2]))
for p, x, y in a_poser:
    im.paste(p, (int(k(x) - p.width / 2), int(k(y))), p)

im.save(dst, quality=95)
print('ok', dst, len(a_poser), 'poissons', len(gabarits), 'gabarits')
