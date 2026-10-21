"""Les six encres et ce qui sert à les poser : le drapeau dessiné, les enfants en aplats, les zones de la photo.
Module importé par guide.py et gravure.py."""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi

CREME = (238, 224, 203)
OCRE = (205, 142, 70)
ORANGE = (240, 122, 30)
BRIQUE = (128, 52, 38)
SANG = (96, 28, 22)
NOIR = (45, 12, 10)
ENCRES = np.array([CREME, OCRE, ORANGE, BRIQUE, SANG, NOIR], float)
C, O, OR, B, S, N = range(6)

PHOTO = (1206, 676)


def lum(rgb):
    rgb = np.asarray(rgb, float)
    return rgb[..., 0] * 0.299 + rgb[..., 1] * 0.587 + rgb[..., 2] * 0.114


# ---------------------------------------------------------------------------------------------- le drapeau
def _bezier(p0, p1, p2, p3, n=60):
    t = np.linspace(0, 1, n)[:, None]
    return ((1 - t) ** 3 * np.array(p0) + 3 * (1 - t) ** 2 * t * np.array(p1) + 3 * (1 - t) * t ** 2 * np.array(p2)
            + t ** 3 * np.array(p3))


def _trait(d, pts, r0, r1, fill):
    """Un trait qui s'amincit : des disques posés le long de la courbe, du rayon r0 au rayon r1."""
    for k, (x, y) in enumerate(pts):
        r = r0 + (r1 - r0) * k / (len(pts) - 1)
        d.ellipse([x - r, y - r, x + r, y + r], fill=fill)


def fleur_de_lys(d, cx, cy, s, fill):
    """Une fleur de lys droite, centrée en (cx, cy), haute d'environ 1,2 × s."""
    def P(x, y):
        return (cx + (x - 50) * s / 100, cy + (y - 60) * s / 100)
    # le pétale du centre, en fer de lance
    gauche, droite = [], []
    for y in np.linspace(0, 64, 40):
        hw = 16 * np.sin(np.pi * min(y / 76, 1)) ** 0.9
        gauche.append(P(50 - hw, y))
        droite.append(P(50 + hw, y))
    d.polygon(gauche + droite[::-1], fill=fill)
    k = s / 100
    for sg in (-1, 1):
        # les pétales de côté, qui montent puis retombent vers l'extérieur
        pts = _bezier((50 + sg * 10, 68), (50 + sg * 16, 34), (50 + sg * 46, 14), (50 + sg * 41, 56))
        _trait(d, [P(x, y) for x, y in pts], 9 * k, 2.6 * k, fill)
        # les petites volutes du bas
        pts = _bezier((50 + sg * 6, 74), (50 + sg * 14, 80), (50 + sg * 26, 84), (50 + sg * 24, 98))
        _trait(d, [P(x, y) for x, y in pts], 5 * k, 1.8 * k, fill)
    # le pied du centre et la bande
    d.polygon([P(43, 70), P(57, 70), P(53, 100), P(50, 106), P(47, 100)], fill=fill)
    d.rectangle([P(27, 64), P(73, 74)], fill=fill)


def drapeau_plat(L=1500, fond=SANG, croix=CREME, bord=0.0):
    """Le fleurdelisé à plat, 3 × 2, la hampe à gauche : croix et quatre lys droits. `bord` : un ourlet de l'encre du
    fond tout autour (part de la hauteur), pour que la croix crème ne se fonde pas dans le ciel crème."""
    H = L * 2 // 3
    im = Image.new('RGB', (L, H), fond)
    d = ImageDraw.Draw(im)
    e = H // 5                       # largeur des bras de la croix
    d.rectangle([L // 2 - e // 2, 0, L // 2 + e // 2, H], fill=croix)
    d.rectangle([0, H // 2 - e // 2, L, H // 2 + e // 2], fill=croix)
    qx, qy = (L - e) / 4, (H - e) / 4
    for cx in (qx, L - qx):
        for cy in (qy, H - qy):
            fleur_de_lys(d, cx, cy + qy * 0.02, (H - e) / 2 * 0.62, croix)
    if bord:
        t = max(1, int(round(bord * H)))
        d.rectangle([0, 0, L - 1, t - 1], fill=fond); d.rectangle([0, H - t, L - 1, H - 1], fill=fond)
        d.rectangle([0, 0, t - 1, H - 1], fill=fond); d.rectangle([L - t, 0, L - 1, H - 1], fill=fond)
    return im


def _homographie(src, dst):
    """Coefficients PIL (sortie → entrée) qui envoient le quadrilatère dst sur src."""
    A, bb = [], []
    for (x, y), (u, v) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); bb.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); bb.append(v)
    return np.linalg.solve(np.array(A, float), np.array(bb, float))


def poser_drapeau(img, quad, fond=SANG, croix=CREME, vague=0.0, bord=0.0):
    """Pose le drapeau dans le quadrilatère quad = (hampe haut, bout haut, bout bas, hampe bas), en coordonnées de img.
    La hampe du drapeau plat est à gauche ; elle va au premier et au dernier coin."""
    plat = drapeau_plat(fond=fond, croix=croix, bord=bord)
    L, H = plat.size
    if vague:
        # une ondulation douce : chaque colonne descend ou monte un peu, plus loin de la hampe plus elle bouge
        a = np.asarray(plat)
        out = np.empty_like(a)
        for x in range(L):
            dy = int(round(vague * H * (x / L) * np.sin(2 * np.pi * x / L * 1.1)))
            out[:, x] = np.roll(a[:, x], dy, axis=0)
            if dy > 0:
                out[:dy, x] = 0
            elif dy < 0:
                out[dy:, x] = 0
        plat = Image.fromarray(out)
        masque_plat = Image.fromarray((out.sum(-1) > 0).astype(np.uint8) * 255)
    else:
        masque_plat = Image.new('L', plat.size, 255)
    src = [(0, 0), (L, 0), (L, H), (0, H)]
    co = _homographie(src, quad)
    w, h = img.size
    tr = plat.transform((w, h), Image.PERSPECTIVE, tuple(co), Image.BICUBIC)
    m = masque_plat.transform((w, h), Image.PERSPECTIVE, tuple(co), Image.BILINEAR)
    img.paste(tr, (0, 0), m)
    return np.asarray(m) > 127


# ---------------------------------------------------------------------------------------------- les zones
def zones(labels_png, taille):
    lab = Image.open(labels_png)
    return np.asarray(lab.resize(taille, Image.NEAREST)).astype(int)


def carte_vers_rgb(carte):
    return ENCRES[carte].astype(np.uint8)


def nettoyer(carte, petit=12, garde=None):
    """Les îlots d'encre plus petits que `petit` pixels prennent l'encre qui les entoure."""
    carte = carte.copy()
    for _ in range(2):
        for k in range(6):
            m = carte == k
            lbl, n = ndi.label(m)
            if not n:
                continue
            tailles = ndi.sum(m, lbl, range(1, n + 1))
            petits = np.isin(lbl, [i + 1 for i, t in enumerate(tailles) if t < petit])
            if garde is not None:
                petits &= ~garde
            if not petits.any():
                continue
            # l'encre voisine la plus fréquente : un filtre de mode sur la carte, les petits îlots masqués
            autre = carte.copy()
            autre[petits] = 255
            im = Image.fromarray(autre.astype(np.uint8))
            for r in (5, 9, 15):
                mode = np.asarray(im.filter(ImageFilter.ModeFilter(r)))
                ok = petits & (mode != 255)
                carte[ok] = mode[ok]
                petits &= ~ok
                if not petits.any():
                    break
    return carte


# ---------------------------------------------------------------------------------------------- les enfants
# chaque enfant est une liste de pièces (encre, polygone en coordonnées de la photo 1206 × 676), posées dans l'ordre ;
# aucun trait de visage, aucun cheveu : une casquette en aplat, la peau en aplat
def _arc(cx, cy, rx, ry, a0, a1, n=24):
    """Les points d'un arc d'ellipse (angles en degrés, 180 à gauche, 270 en haut)."""
    t = np.radians(np.linspace(a0, a1, n))
    return [(cx + rx * np.cos(a), cy + ry * np.sin(a)) for a in t]


ENFANT_FOND = [   # l'enfant du fond, bras ouverts, qui monte vers nous
    (O, [(542, 489), (530, 497), (519, 506), (517, 511), (522, 512), (533, 505), (545, 499)]),      # bras gauche
    (O, [(578, 489), (586, 495), (592, 500), (591, 505), (585, 503), (576, 498)]),                  # bras droit
    (O, [(552, 536), (565, 536), (564, 556), (553, 556)]),                                          # jambe gauche
    (O, [(568, 536), (580, 536), (579, 555), (569, 556)]),                                          # jambe droite
    (N, [(551, 553), (565, 553), (566, 560), (549, 561)]),                                          # soulier gauche
    (N, [(568, 552), (580, 551), (582, 558), (568, 560)]),                                          # soulier droit
    (C, [(541, 484), (551, 478), (566, 478), (578, 484), (581, 495), (577, 500), (578, 512),
         (546, 512), (546, 500), (539, 495)]),                                                     # chandail
    (B, [(548, 486), (552, 486), (553, 494), (571, 494), (573, 486), (577, 487), (577, 522),
         (581, 540), (566, 541), (564, 534), (561, 541), (546, 540), (548, 522)]),                  # salopette
    (O, [(549, 466), (566, 466), (567, 476), (563, 482), (557, 485), (551, 482), (548, 475)]),      # visage, sans traits
    (B, _arc(558, 467, 10.5, 13.5, 180, 360)),                                                      # casquette
    (B, [(541, 471), (546, 466), (568, 466), (566, 470), (552, 471)]),                              # sa palette
]
ENFANT_DEVANT = [   # l'enfant du devant, tête penchée, une main sur la bretelle
    (O, [(652, 636), (670, 636), (669, 676), (651, 676)]),                                          # jambe gauche
    (O, [(676, 636), (694, 636), (693, 662), (677, 662)]),                                          # jambe droite
    (OR, [(673, 657), (695, 656), (700, 664), (701, 672), (671, 674), (670, 664)]),                 # soulier
    (O, [(625, 546), (639, 548), (638, 572), (638, 590), (633, 600), (624, 598), (621, 586),
         (624, 566)]),                                                                              # bras gauche
    (C, [(633, 516), (648, 504), (698, 503), (712, 508), (719, 522), (718, 540), (705, 546),
         (700, 562), (646, 562), (641, 552), (622, 552), (623, 534)]),                              # chandail
    (S, [(647, 503), (654, 502), (661, 526), (688, 526), (695, 504), (701, 505), (700, 540),
         (706, 580), (709, 636), (688, 641), (676, 630), (665, 641), (643, 637), (642, 592),
         (645, 560), (647, 530)]),                                                                  # salopette
    (O, [(706, 536), (712, 541), (704, 549), (692, 540), (680, 532), (673, 524), (678, 513),
         (689, 515), (696, 527)]),                                                                  # bras droit, la main
    (O, [(658, 494), (692, 496), (690, 507), (676, 512), (662, 508)]),                              # menton et cou
    (N, _arc(676, 480, 25, 23, 175, 365) + [(700, 490), (694, 499), (662, 498), (652, 490)]),       # casquette
    (N, [(655, 484), (643, 485), (632, 489), (630, 493), (640, 496), (656, 497), (667, 499)]),      # sa palette
]


# les entailles taillées dans les enfants : (encre, points, largeur en pixels de la photo)
TRAITS = [
    (C, [(650, 486), (657, 492), (665, 498)], 1.3),      # la couture entre la palette et la calotte, enfant du devant
]


def dessiner_enfants(img, echelle, contour=2.2):
    """Pose les deux enfants sur img (échelle = largeur de img / 1206). Rend le masque des deux silhouettes.
    Le contour est taillé comme sur une gravure : brun noir sur un fond clair, crème sur un fond sombre (la tête de
    l'enfant du fond se découpe sur l'eau)."""
    w, h = img.size
    d = ImageDraw.Draw(img)
    masque = Image.new('L', (w, h), 0)
    dm = ImageDraw.Draw(masque)
    for enfant in (ENFANT_FOND, ENFANT_DEVANT):
        sil = Image.new('L', (w, h), 0)
        ds = ImageDraw.Draw(sil)
        for _, pts in enfant:
            ds.polygon([(x * echelle, y * echelle) for x, y in pts], fill=255)
        r = max(1, int(round(contour * echelle)))
        gros = sil.filter(ImageFilter.MaxFilter(2 * r + 1))
        fond = lum(np.asarray(img)).astype(float)
        fond = ndi.uniform_filter(fond, max(3, int(6 * echelle)))
        anneau = (np.asarray(gros) > 127) & ~(np.asarray(sil) > 127)
        a = np.asarray(img).copy()
        a[anneau & (fond >= 95)] = NOIR
        a[anneau & (fond < 95)] = CREME
        a[np.asarray(sil) > 127] = NOIR
        img.paste(Image.fromarray(a))
        dm.bitmap((0, 0), gros, fill=255)
        for encre, pts in enfant:
            d.polygon([(x * echelle, y * echelle) for x, y in pts], fill=tuple(ENCRES[encre].astype(int)))
    for encre, pts, larg in TRAITS:
        d.line([(x * echelle, y * echelle) for x, y in pts], fill=tuple(ENCRES[encre].astype(int)),
               width=max(1, int(round(larg * echelle))), joint='curve')
    return np.asarray(masque) > 127
