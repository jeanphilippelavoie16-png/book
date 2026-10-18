"""Tome 2 : le cadre au mur (JP, 18 octobre 2026 : « mets un cadre sur le mur, que c'est cette photo, mais dans le style
de la photo »). La photo de JP (le lac, le drapeau, les deux enfants sur le sentier), regravée dans les encres de
l'image, se pose dans un cadre de bois foncé à passe-partout crème, pendu à un clou par une ficelle, à droite de « LE »,
au-dessus de « CORPS » ; une ombre plate le détache du mur.
    python3 cadre_mur.py SOURCE GRAVURE.png SORTIE
Les coordonnées sont celles de l'image 768 × 960 ; elles se multiplient par K (4 sur l'image agrandie)."""
import sys
from PIL import Image, ImageDraw

src, grav, dst = sys.argv[1], sys.argv[2], sys.argv[3]
im = Image.open(src).convert('RGB')
K = im.width / 768
S = 2
big = im.resize((im.width * S, im.height * S), Image.LANCZOS)
d = ImageDraw.Draw(big)
k = lambda v: int(round(v * K * S))
FONCE = (45, 12, 10); CERNE = (30, 7, 6); CREME = (238, 224, 203); OMBRE = (70, 18, 14); MOYEN = (128, 52, 38)

# le cadre : 262 × 172 dehors ; bois de 10, filet crème, passe-partout de 9 ; la gravure au milieu
X0, Y0, X1, Y1 = 392, 128, 654, 300
BOIS, PP = 10, 9
d.rectangle([k(X0 + 5), k(Y0 + 6), k(X1 + 5), k(Y1 + 6)], fill=OMBRE)                     # l'ombre, à droite et en bas
clou = ((X0 + X1) / 2, Y0 - 34)                                                             # la ficelle et le clou
for coin in ((X0 + 40, Y0 + 2), (X1 - 40, Y0 + 2)):
    d.line([(k(clou[0]), k(clou[1])), (k(coin[0]), k(coin[1]))], fill=CERNE, width=k(1.3))
d.ellipse([k(clou[0] - 3), k(clou[1] - 3), k(clou[0] + 3), k(clou[1] + 3)], fill=FONCE, outline=CERNE, width=k(0.8))
d.rectangle([k(X0), k(Y0), k(X1), k(Y1)], fill=FONCE, outline=CERNE, width=k(1.2))      # le bois
for i, (a, b, c, e) in enumerate(((X0, Y0, X1, Y0 + BOIS), (X0, Y1 - BOIS, X1, Y1))):     # le fil du bois, à la gouge
    for t in (0.35, 0.7):
        y = b + (e - b) * t
        d.line([(k(a + 6 + i * 20), k(y)), (k(c - 30 + i * 12), k(y))], fill=MOYEN, width=k(0.7))
d.rectangle([k(X0 + BOIS - 1.5), k(Y0 + BOIS - 1.5), k(X1 - BOIS + 1.5), k(Y1 - BOIS + 1.5)], fill=CREME)   # le filet
d.rectangle([k(X0 + BOIS), k(Y0 + BOIS), k(X1 - BOIS), k(Y1 - BOIS)], fill=FONCE)
d.rectangle([k(X0 + BOIS + 1), k(Y0 + BOIS + 1), k(X1 - BOIS - 1), k(Y1 - BOIS - 1)], fill=CREME)           # le passe-partout
gx0, gy0, gx1, gy1 = X0 + BOIS + PP, Y0 + BOIS + PP, X1 - BOIS - PP, Y1 - BOIS - PP
g = Image.open(grav).convert('RGB')
# la gravure garde ses proportions : on la recadre au centre pour remplir la fenêtre
fw, fh = k(gx1 - gx0), k(gy1 - gy0)
r = max(fw / g.width, fh / g.height)
g = g.resize((int(g.width * r + 0.5), int(g.height * r + 0.5)), Image.LANCZOS)
ox, oy = (g.width - fw) // 2, (g.height - fh) // 2
big.paste(g.crop((ox, oy, ox + fw, oy + fh)), (k(gx0), k(gy0)))
d.rectangle([k(gx0) - k(0.6), k(gy0) - k(0.6), k(gx1) + k(0.6), k(gy1) + k(0.6)], outline=CERNE, width=k(0.9))
big.resize(im.size, Image.LANCZOS).save(dst, quality=95)
print('ok', dst)
