"""La texture du mur du fond (JP, 19 octobre 2026 : « ajoute juste de la texture au mur du fond, subtile mais
présente »). Dernier maillon de la chaîne de l'image de titre du tome 2 :

    python3 pimp_soin1.py tome-2-1-x4.png T1.png
    python3 cadre_mur.py T1.png cadre-gravure/gravure-lac.png T2.png
    python3 texture_mur.py T2.png ../../titre-tome-2.jpg [--style enduit|planches|toile] [--force 1.0]

Le masque du mur : les points dont la couleur suit la gamme du mur (le rouge sombre, jusqu'à l'orangé de la lueur de
la lampe), sur un aplat lisse, en morceaux assez grands ; le cadre est exclu. La texture module la clarté du mur (elle
multiplie la couleur), donc la lueur de la lampe reste entière. Le masque s'arrête un point avant les contours, sous le
trait noir des objets, et ne se voit pas.
"""
import sys, argparse
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('dst')
ap.add_argument('--style', default='enduit', choices=['enduit', 'planches', 'toile'])
ap.add_argument('--force', type=float, default=1.0)
ap.add_argument('--masque', help='écrit aussi le masque (contrôle)')
o = ap.parse_args()

img = Image.open(o.src).convert('RGB')
a = np.asarray(img).astype(np.float32)
H, W = a.shape[:2]
K = W / 768.0                                  # les coordonnées du dessin sont en 768 × 960
rng = np.random.default_rng(2026)

# --- le masque du mur
R, G, B = a[..., 0], a[..., 1], a[..., 2]
gamme = (np.abs(G - (28 + 0.62 * (R - 97))) < 7) & (B > 15) & (B < 34) & (R > 88) & (R < 168)
lisse = ndi.gaussian_filter(a, (1.2, 1.2, 0))
grad = np.abs(ndi.sobel(lisse, 0)).sum(2) + np.abs(ndi.sobel(lisse, 1)).sum(2)
m = gamme & (grad < 40)
m[int(890 * K):] = False                       # le plancher
X0, Y0, X1, Y1 = 468, 355, 698, 501             # le cadre (cadre_mur.py)
m[int((Y0 - 1) * K):int((Y1 + 1) * K), int((X0 - 1) * K):int((X1 + 1) * K)] = False
m = ndi.binary_opening(m, iterations=2)
lab, n = ndi.label(m)
tailles = ndi.sum(m, lab, range(1, n + 1))
m = np.isin(lab, 1 + np.flatnonzero(tailles > 4000 * (K / 4) ** 2))
m = ndi.binary_closing(m, iterations=3) & gamme
trous, nt = ndi.label(~m)                     # les petits trous du mur (taches à peine plus claires) : la texture
tt = ndi.sum(~m, trous, range(1, nt + 1))      # passe dessus, sinon elle laisse des pastilles lisses
m |= np.isin(trous, 1 + np.flatnonzero(tt < 2500 * (K / 4) ** 2))
m = ndi.binary_erosion(m, iterations=1)
ombre = np.zeros_like(m)                       # l'ombre du cadre est sur le mur : les planches passent dessous
ombre[int((Y0 + 6) * K + 2):int((Y1 + 6) * K - 1), int((X0 + 5) * K + 2):int((X1 + 5) * K - 1)] = True
ombre[int((Y0 - 0.5) * K):int((Y1 + 0.5) * K), int((X0 - 0.5) * K):int((X1 + 0.5) * K)] = False
m |= ombre
doux = ndi.gaussian_filter(m.astype(np.float32), 1.2)

def bruit(sy, sx, graine):
    r = np.random.default_rng(graine).standard_normal((H, W)).astype(np.float32)
    r = ndi.gaussian_filter(r, (sy, sx))
    return r / (r.std() + 1e-6)

def nuages(graine, echelles=(220, 90, 36), poids=(1.0, 0.6, 0.35)):
    t = np.zeros((H, W), np.float32)
    for i, (e, p) in enumerate(zip(echelles, poids)):
        h, w = max(2, int(H / e)), max(2, int(W / e))
        r = np.random.default_rng(graine + i).standard_normal((h, w)).astype(np.float32)
        r = np.asarray(Image.fromarray(r).resize((W, H), Image.BICUBIC))
        t += p * r
    return t / t.std()

if o.style == 'enduit':
    # un enduit peint à la brosse : des nuages larges, des passes de brosse couchées, un grain fin
    t = 0.030 * nuages(11) + 0.016 * bruit(1.6 * K, 26 * K, 12) + 0.012 * bruit(0.6, 0.6, 13)
elif o.style == 'planches':
    # des planches verticales peintes : les joints, le fil du bois, une planche un peu plus claire que l'autre
    larg = 68 * K
    x = np.arange(W)
    t = np.zeros((H, W), np.float32)
    bord = (x % larg)
    joint = np.exp(-0.5 * (bord / (1.0 * K)) ** 2) + np.exp(-0.5 * ((larg - bord) / (1.0 * K)) ** 2)
    reflet = np.exp(-0.5 * ((bord - 2.6 * K) / (1.2 * K)) ** 2)
    t += (-0.16 * joint + 0.035 * reflet)[None, :]
    idx = (x // larg).astype(int)
    t += 0.018 * np.random.default_rng(21).standard_normal(idx.max() + 1).astype(np.float32)[idx][None, :]
    t += 0.022 * bruit(40 * K, 0.7 * K, 22) + 0.010 * bruit(0.6, 0.6, 23)
else:
    # une toile : la trame et la chaîne, fines, et un léger nuage
    t = 0.014 * bruit(0.5 * K, 6 * K, 31) + 0.014 * bruit(6 * K, 0.5 * K, 32) + 0.018 * nuages(33) + 0.008 * bruit(0.6, 0.6, 34)

t *= o.force
out = a * (1 + t * doux)[..., None]
Image.fromarray(np.clip(out, 0, 255).round().astype(np.uint8)).save(o.dst, quality=95, subsampling=0)
if o.masque:
    Image.fromarray((doux * 255).astype(np.uint8)).resize((768, 960)).save(o.masque)
print('mur : %.1f %% de l\'image, style %s, force %.2f' % (100 * m.mean(), o.style, o.force))
