"""Ramener une image générée aux trois encres du tome 2, comme une vraie linogravure en trois passages :
le rouge sang de bœuf #5C1A15, le papier blanc cassé, l'orange #EE7219. Chaque pixel prend l'encre la plus proche
selon sa clarté, sa saturation et sa teinte ; le calcul se fait au double de la taille puis se réduit, pour garder
des bords nets sans escalier. La taille de sortie est celle de l'entrée (on n'agrandit rien). Le rouge garde deux
valeurs (l'encre, et l'encre passée deux fois là où l'image était plus sombre), pour que les collines se détachent
du ciel et que les rondins gardent leurs traits.

    python3 trois-encres.py <entrée> <sortie.png> [x0,y0,x1,y1 ...]

Chaque rectangle donné est d'abord repeint en papier : c'est pour effacer une fausse signature posée sur la neige.
« g5 » ou « d5 » : la marge crème de 5 px à gauche ou à droite est remplacée par la colonne voisine de l'image.
« bx0,y0,x1,y1 » : dans ce rectangle, l'orange devient papier (une vapeur que le générateur a teintée d'orange, et qui
se lirait comme du feu à la cheminée).
"""
import sys
import numpy as np
from PIL import Image

ENCRE = np.array([0x5C, 0x1A, 0x15], float)
PAPIER = np.array([0xF3, 0xEA, 0xDC], float)
ORANGE = np.array([0xEE, 0x72, 0x19], float)

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
w, h = im.size
a = np.asarray(im).astype(float)
blancs = []
for r in sys.argv[3:]:
    if r[0] == "b":
        blancs.append(tuple(2 * int(v) for v in r[1:].split(",")))
        continue
    if r[0] in "gd":
        n = int(r[1:])
        if r[0] == "g":
            a[:, :n] = a[:, n:n + 1]
        else:
            a[:, w - n:] = a[:, w - n - 1:w - n]
        continue
    x0, y0, x1, y1 = map(int, r.split(","))
    a[y0:y1, x0:x1] = PAPIER
big = Image.fromarray(a.astype(np.uint8)).resize((w * 2, h * 2), Image.LANCZOS)
hsv = np.asarray(big.convert("HSV")).astype(float) / 255.0
H, S, V = hsv[..., 0] * 360, hsv[..., 1], hsv[..., 2]
papier = (V > 0.62) & (S < 0.38)
orange = ~papier & (H > 12) & (H < 52) & (S > 0.45) & (V > 0.72)
for x0, y0, x1, y1 in blancs:
    zone = np.zeros_like(orange)
    zone[y0:y1, x0:x1] = True
    papier |= zone & (orange | (V > 0.55))
    orange &= ~zone
lum = np.asarray(big.convert("L")).astype(float) / 255.0
DOUBLE = np.array([0x33, 0x0C, 0x09], float)
# l'encre passée deux fois : ce qui est franchement sombre, ou plus sombre que son voisinage (un trait, une ombre) ;
# un ciel en dégradé reste d'une seule encre
from PIL import ImageFilter
l2 = lum.copy()
l2[papier | orange] = np.median(lum[~papier & ~orange])       # le blanc et l'orange ne font pas d'ombre autour d'eux
flou = np.asarray(Image.fromarray((l2 * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(24))).astype(float) / 255.0
# le seuil du franchement sombre se règle sur la partie la plus sombre du ciel (le quart du haut), pour qu'un ciel qui
# fonce vers le haut reste d'une seule encre ; le grain du papier est lissé avant de trancher
haut = lum[: lum.shape[0] // 4][~papier[: lum.shape[0] // 4]]
seuil = min(0.115, 0.8 * np.percentile(haut, 5)) if haut.size else 0.115
lisse = np.asarray(Image.fromarray((lum * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3))).astype(float) / 255.0
double = ((lisse < seuil) | (lum - flou < -0.05)) & ~papier & ~orange
# la carte des encres (0 encre deux fois, 1 encre, 2 papier, 3 orange), nettoyée des grains isolés par un filtre de mode
carte = np.where(double, 0, 1).astype(np.uint8)
carte[papier] = 2
carte[orange] = 3
carte = np.asarray(Image.fromarray(carte * 60).filter(ImageFilter.ModeFilter(7))).astype(int) // 60
res = np.array([DOUBLE, ENCRE, PAPIER, ORANGE])[carte]
Image.fromarray(res.astype(np.uint8)).resize((w, h), Image.LANCZOS).save(out)
print(out, (w, h), f"papier {(carte == 2).mean():.0%}, orange {(carte == 3).mean():.1%}")
