# Emballe les pages PNG d'un tome en feuilles WebP de 5 pages, rognées au format fini (8 x 10 po).
import sys, glob, re, os
from PIL import Image, ImageChops
T, N, src, dst, q = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3], sys.argv[4], int(sys.argv[5])
W, H, PAR = 1100, 1375, 5
s = 1100 / 576  # px par point
pages = {int(re.search(r'-(\d+)\.png$', f).group(1)): f for f in glob.glob(f'{src}/p-*.png')}
assert len(pages) == N, (len(pages), N)
os.makedirs(dst, exist_ok=True)
tot = 0
for k in range((N + PAR - 1) // PAR):
    feuille = Image.new('RGB', (W, H * PAR), 'white')
    for j in range(PAR):
        p = k * PAR + j + 1
        if p > N: break
        im = Image.open(pages[p]).convert('RGB')
        x0 = 0 if p % 2 else 9
        boite = (round(x0 * s), round(9 * s), round((x0 + 576) * s), round(729 * s))
        im = im.crop(boite)
        if im.size != (W, H): im = im.resize((W, H), Image.LANCZOS)
        feuille.paste(im, (0, j * H))
    nom = f'{dst}/{k:03d}.webp'
    # Texte et trait : 48 couleurs sans perte (net, deux fois plus léger). Photo : WebP avec perte.
    pal = feuille.quantize(48, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert('RGB')
    h = ImageChops.difference(feuille, pal).convert('L').histogram()
    if sum(h[24:]) / sum(h) < 0.002: pal.save(nom, 'WEBP', lossless=True, quality=100, method=4)
    else: feuille.save(nom, 'WEBP', quality=q, method=5)
    tot += os.path.getsize(nom)
print(f'tome {T}: {N} pages, {(N+PAR-1)//PAR} feuilles, {tot/2**20:.1f} Mio')
