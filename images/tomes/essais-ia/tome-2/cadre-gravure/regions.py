"""Découper la photo du lac en zones : ciel, crête du fond, collines, eau, buissons, sentier, mât, drapeau, enfants.
    python3 regions.py <photo> <sortie labels.png> [aperçu.png]
Les étiquettes sont écrites à la taille de la photo (1206 × 676), une valeur par zone (voir ZONES)."""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi

ZONES = ['ciel', 'crete', 'collines', 'eau', 'buissons', 'sentier', 'mat', 'drapeau', 'enfant1', 'enfant2', 'bateau']
Z = {n: i for i, n in enumerate(ZONES)}

# polygones dessinés sur la photo (coordonnées de la photo 1206 × 676)
MAT = [(218, 0), (231, 0), (246, 452), (233, 452)]
DRAPEAU = [(219, 4), (12, 54), (44, 197), (229, 160)]
# l'enfant du fond (casquette, chandail, salopette, jambes, bras ouverts)
ENFANT1 = [(546, 456), (556, 452), (565, 457), (568, 468), (574, 479), (582, 483), (592, 497), (588, 503),
           (580, 497), (580, 520), (580, 540), (577, 552), (580, 560), (571, 562), (566, 548), (561, 548),
           (558, 560), (548, 561), (552, 548), (548, 538), (547, 518), (544, 500), (532, 506), (520, 512),
           (517, 508), (530, 497), (541, 485), (548, 478), (545, 470)]
# l'enfant du devant (casquette à palette, chandail, salopette, short, jambes coupées par le bas)
ENFANT2 = [(640, 486), (650, 478), (650, 465), (662, 457), (682, 456), (696, 463), (700, 476), (698, 492),
           (712, 502), (719, 520), (716, 538), (705, 545), (707, 590), (708, 636), (692, 641), (690, 676),
           (650, 676), (652, 641), (643, 636), (642, 590), (638, 560), (636, 548), (632, 572), (632, 595),
           (626, 600), (621, 590), (624, 560), (623, 540), (626, 515), (638, 502), (648, 496)]
SENTIER = [(580, 466), (622, 466), (640, 490), (720, 528), (765, 560), (880, 592), (1000, 600), (1206, 604),
           (1206, 676), (462, 676), (505, 612), (538, 556), (562, 500)]
BATEAU = [(582, 455), (604, 452), (620, 455), (616, 466), (590, 468)]


def poly_mask(shape, pts):
    m = Image.new('L', (shape[1], shape[0]), 0)
    ImageDraw.Draw(m).polygon(pts, fill=255)
    return np.asarray(m) > 127


def mode_filter(lab, k):
    im = Image.fromarray(lab.astype(np.uint8) * 20)
    return np.asarray(im.filter(ImageFilter.ModeFilter(k))).astype(int) // 20


def regions(a):
    h, w, _ = a.shape
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = a.mean(-1)
    yy = np.arange(h)[:, None] * np.ones((1, w))
    xx = np.ones((h, 1)) * np.arange(w)[None, :]
    # la ligne du ciel : premier pixel qui n'est plus du ciel pâle, colonne par colonne
    ciel_px = (m > 165) & (b >= r)
    sky = np.zeros(w)
    for x in range(w):
        col = ciel_px[:, x]
        y = 0
        while y < 200 and (col[y] or col[min(y + 1, h - 1)] or col[min(y + 2, h - 1)]):
            y += 1
        sky[x] = y
    # sous le drapeau et le mât, la ligne se raccorde en droite entre les deux côtés
    gauche, droite = np.median(sky[0:8]), np.median(sky[250:262])
    sky[:250] = np.linspace(gauche, droite, 250)
    sky = ndi.median_filter(sky, 9)
    sky = ndi.uniform_filter1d(sky, 5)
    rive = 264.0
    lab = np.full((h, w), Z['collines'], int)
    lab[yy < sky[None, :]] = Z['ciel']
    # la crête du fond : bleutée, au-dessus des collines vertes
    crete = (yy >= sky[None, :]) & (yy < 175) & (b - r > -2) & (g - b < 12)
    crete = ndi.binary_closing(crete, np.ones((5, 9)))
    crete = ndi.binary_opening(crete, np.ones((3, 7)))
    # on garde seulement les bandes qui touchent le ciel
    lbl, n = ndi.label(crete)
    touche = set(np.unique(lbl[(yy == np.ceil(sky[None, :])) & crete])) - {0}
    lab[np.isin(lbl, list(touche))] = Z['crete']
    # sous la rive : l'eau, les buissons, le sentier
    bas = yy >= rive
    eau = bas & (b >= r - 2) & (g - b < 14) & (m > 80)
    eau = ndi.binary_opening(eau, np.ones((3, 3)))
    eau = ndi.binary_closing(eau, np.ones((7, 7)))
    eau &= yy < 470
    lbl, n = ndi.label(eau)
    if n:
        tailles = ndi.sum(eau, lbl, range(1, n + 1))
        eau = np.isin(lbl, [i + 1 for i, t in enumerate(tailles) if t > 2500])
    eau = ndi.binary_fill_holes(eau)
    lab[bas] = Z['buissons']
    lab[eau] = Z['eau']
    lab[poly_mask(a.shape, SENTIER) & ~eau] = Z['sentier']
    lab = mode_filter(lab, 9)
    lab = mode_filter(lab, 9)
    # le sentier : une seule masse, sans trous de buisson isolés
    for k in (Z['sentier'],):
        s = lab == k
        s = ndi.binary_opening(s, np.ones((5, 5)))
        lbl, n = ndi.label(s)
        if n:
            tailles = ndi.sum(s, lbl, range(1, n + 1))
            garde = [i + 1 for i, t in enumerate(tailles) if t > 1500]
            s = np.isin(lbl, garde)
        lab[(lab == k) & ~s] = Z['buissons']
    lab[poly_mask(a.shape, MAT)] = Z['mat']
    lab[poly_mask(a.shape, DRAPEAU)] = Z['drapeau']
    lab[poly_mask(a.shape, ENFANT1)] = Z['enfant1']
    lab[poly_mask(a.shape, ENFANT2)] = Z['enfant2']
    return lab, sky


if __name__ == '__main__':
    a = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int)
    lab, sky = regions(a)
    Image.fromarray(lab.astype(np.uint8)).save(sys.argv[2])
    if len(sys.argv) > 3:
        pal = np.array([(220, 230, 240), (90, 90, 160), (40, 110, 40), (40, 60, 120), (150, 190, 60), (210, 170, 110),
                        (255, 255, 255), (255, 0, 0), (255, 0, 255), (0, 255, 255), (255, 255, 0)])
        Image.fromarray(pal[lab].astype(np.uint8)).save(sys.argv[3])
    print({n: f'{(lab == i).mean():.1%}' for i, n in enumerate(ZONES)})
