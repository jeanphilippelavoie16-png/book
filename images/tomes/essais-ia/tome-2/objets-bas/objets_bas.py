"""Les objets du bas de l'image de titre du tome 2 (JP, 19 octobre 2026 : « le bois en dessous du foyer, l'étage du bas
et le seau ne sont pas assez de qualité à mon goût »). Ce script fait les six PNG transparents que pimp_soin1.py pose
aux sections 4 à 7 ; il les écrit dans le dossier du dessus, à côté de pimp_soin1.py.
    python3 objets_bas.py          (il faut Chromium dans /opt/pw-browsers pour la chaudière et la corde)

Chaque PNG est à 8 points par unité de l'image 768 × 960 (la double taille de l'image agrandie ×4, celle où
pimp_soin1.py dessine), et se pose à sa boîte : le coin en haut à gauche, en unités 768 × 960 (BOITES, plus bas).

Deux façons de faire, une par sorte d'objet :
- les bouquets, le linge, le panier et la cruche sont générés un par un par AI Horde (Flux.1-Schnell, le modèle de
  l'image) sur un fond rouge uni (gen/, avec le texte de chaque demande), puis détourés et ramenés aux encres de
  l'image (outils.py) ;
- la chaudière et la corde de bois sont dessinées à la main en vectoriel (seau.py, corde.py, svgkit.py), dans les mêmes
  encres, et rendues par Chromium. Leurs cernes sont amincis (TRAIT, 0,65) pour avoir l'épaisseur de ceux des objets
  générés. Leur SVG reste ici (objet-chaudiere.svg, objet-corde.svg).

Puis tous passent par le même grain (grain(), plus bas) : un léger flou qui donne aux bords la douceur des objets du
générateur, agrandis ×4. Le rendu est déterministe : relancé, il donne les mêmes PNG."""
import os, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

ICI = os.path.dirname(os.path.abspath(__file__))
DEST = os.path.dirname(ICI)
os.chdir(ICI); sys.path.insert(0, ICI)
from outils import *
PX = 8                                         # points par unité de l'image 768 × 960

def finir(rgb, obj, larg_cerne):
    """Le cerne brun presque noir autour de la silhouette, puis l'objet détouré, recadré à sa boîte."""
    c = cerne(obj, larg_cerne)
    rgb = rgb.copy(); rgb[c & ~obj] = CERNE
    return rgba(rgb, c).crop(boite(c))

def a_la_taille(o, larg):
    """L'objet ramené à larg unités de large, à 8 points par unité."""
    w = round(larg * PX); h = round(o.height * w / o.width)
    return o.resize((w, h), Image.LANCZOS)

def grain(o, sigma=1.1):
    """Le bord doux des objets du générateur : un flou léger, fait sur les couleurs prémultipliées (pas de frange)."""
    a = np.asarray(o).astype(float)
    al = a[..., 3:] / 255
    pre = a[..., :3] * al
    pre = np.stack([ndimage.gaussian_filter(pre[..., c], sigma) for c in range(3)], -1)
    al2 = ndimage.gaussian_filter(al[..., 0], sigma)[..., None]
    rgb = np.where(al2 > 1e-3, pre / np.maximum(al2, 1e-3), 0)
    out = np.concatenate([np.clip(rgb, 0, 255), np.clip(al2 * 255, 0, 255)], -1)
    return Image.fromarray(out.round().astype(np.uint8), 'RGBA')

def sauver(o, nom, x0, y_bas=None, y0=None):
    """Écrit l'objet à côté de pimp_soin1.py et rend sa boîte (x0, y0) en unités 768 × 960."""
    if y0 is None: y0 = (round(y_bas * PX) - o.height) / PX
    o.save(os.path.join(DEST, nom))
    print(f'{nom:22s} {o.width:5d} × {o.height:<5d} boîte {x0:g},{y0:g} à {x0 + o.width / PX:g},{y0 + o.height / PX:g}')
    return y0

# 4. Les trois bouquets pendus à une corde (gen/bouq-b-1.webp) ; 54 unités de large, le bas à y 794,5
a = charger('gen/bouq-b-1.webp', 2 * 572, (100, 58, 672, 612))
obj = masque(a, seuil=34, trou=800, lisse=1.0)
rgb, _ = encres(a, [CREME, OCRE, ORANGE, MOYEN, FONCE, CERNE], poids=[150, 0, 900, 0, 0, 0], mode=1)
sauver(grain(a_la_taille(finir(rgb, obj, 2), 54)), 'objet-bouquets.png', 206, y_bas=794.5)

# 5a. Le linge plié, pris à gauche de gen/tab-a-3.webp. Le générateur l'avait posé sur une planche : le bas de la
#     découpe gardait des bouts de cette planche, en petits traits bruns. On coupe le linge à sa base (la dernière
#     rangée où le crème domine), et on referme le dessous d'un cerne droit.
a = charger('gen/tab-a-3.webp', 2 * 404, (88, 145, 492, 352))
obj = masque(a, trou=1500)
rgb, idx = encres(a, [CREME, ORANGE, OCRE, MOYEN, FONCE, CERNE], poids=[0, 0, 300, 0, 0, 0])
creme = obj & (idx <= 2)
lignes = creme.sum(1) / np.maximum(obj.sum(1), 1)
base = max(y for y in range(obj.shape[0]) if lignes[y] > 0.6 and creme[y].sum() > 0.5 * creme.sum(1).max())
obj[base + 1:] = False
c = cerne(obj, 3)
c[base + 1:] = False
cols = np.where(obj[base])[0]
c[base + 1:base + 4, cols.min() - 3:cols.max() + 4] = True                 # le dessous, d'un trait droit
rgb = rgb.copy(); rgb[c & ~obj] = CERNE
o = rgba(rgb, c).crop(boite(c))
sauver(grain(a_la_taille(o, 100)), 'objet-linge.png', 90, y_bas=805)

# 5b. Le panier de plantes séchées (gen/panier-c-1.webp). Le premier panier avait une masse de têtes rondes, comme des
#     pissenlits montés en graine : celui-ci a peu de têtes, nettes, en ombelles plates (l'achillée). Ses trois
#     fleurs du bas, crème à cœur foncé, passent en ocre (des boutons séchés) : le crème reste aux ombelles. 72 unités
#     de large, centré où était l'ancien.
a = charger('gen/panier-c-1.webp', 2 * 661, (180, 56, 841, 592))
obj = masque(a, trou=1500)
rgb, idx = paliers(a, [30, 50, 64, 86], [FONCE, MOYEN, OCRE, OCRE, CREME], flou=0.6)
lab, n = ndimage.label((idx == 4) & obj)
cy = ndimage.center_of_mass(np.ones_like(lab), lab, range(1, n + 1))
bas = np.isin(lab, [i + 1 for i, (y, _) in enumerate(cy) if y > 0.39 * a.shape[0]])
rgb[bas] = OCRE
sauver(grain(a_la_taille(finir(rgb, obj, 4), 72)), 'objet-panier.png', 301, y_bas=805.5)

# 5c. La cruche de grès (gen/cruche-a-0.webp) ; 33 unités de large
a = charger('gen/cruche-a-0.webp', 2 * 450, (140, 60, 590, 710))
obj = masque(a, trou=1500, rougeur=0.3)
rgb, _ = paliers(a, [16, 40, 56, 78], [CERNE, MOYEN, OCRE, OCRE, CREME], flou=0.6)
sauver(grain(a_la_taille(finir(rgb, obj, 5), 33)), 'objet-cruche.png', 430, y_bas=805.5)

# 6 et 7. La chaudière et la corde de bois, en vectoriel, rendues ici puis passées au même grain
from svgkit import rendre
import seau, corde
rendre(seau.seau(), seau.X0, seau.Y0, seau.X1, seau.Y1, 'objet-chaudiere.png')
sauver(grain(Image.open('objet-chaudiere.png').convert('RGBA')), 'objet-chaudiere.png', 30, y0=seau.Y0)
corps, _ = corde.construire()
rendre(corps, corde.X0, corde.Y0, corde.X1, corde.Y1, 'objet-corde.png')
sauver(grain(Image.open('objet-corde.png').convert('RGBA')), 'objet-corde.png', 596, y0=corde.Y0)
for n in ('objet-chaudiere.png', 'objet-corde.png'): os.remove(n)
