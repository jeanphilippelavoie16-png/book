# -*- coding: utf-8 -*-
"""Tome 4, De la bête au garde-manger : le dos de la couverture C reprend le soir au bord du lac du devant (JP,
19 octobre 2026 : « j'aime que pour le tome 1 on retrouve des éléments de la couverture en arrière, fais-le pour les
autres » ; « mets-en dans les trous sur la page en arrière, faut juste pas que ça touche au texte » ; puis, devant les
six dos : « le tome 4 et 5 seraient à travailler, c'est les seuls qui manquent d'âme » ; « si le bois du bas touche à
la ligne, c'est correct »).

Deux petites scènes, découpées dans l'image du devant (images/tomes/titre-tome-4.jpg), à ses encres :

  sur la quatrième, dans le trou entre le sommaire et « Les auteurs », posée sur le filet des auteurs :
  - le séchoir : la perche, ses deux poteaux et la rangée du haut de ses truites (le rang du bas reste au devant ; les
    poteaux sont coupés sous les truites). Les ficelles sont retracées de la perche à la tête de chaque truite, à la
    couleur des ficelles de l'image (leur haut s'y perd dans la colline sombre, qui ne passe pas au dos) ;
  - le feu, ses flammes, ses bûches et son lit de braises, au pied du séchoir comme au devant ;
  - le pré au bord de l'eau, sous les deux : une bande prise le long de la rive du devant (le vert sombre du pré, ses
    tiges et ses fleurs blanches, les brins qui dépassent sur l'eau), en butte basse qui naît du filet et y retourne.
    Les poteaux s'y plantent, le feu s'y pose ; son dessous touche le filet.
  Le groupe est en miroir, comme le ciel du dos : le feu passe à gauche du séchoir.

  sur la tranche, entre le titre et « Le Manuel du Nord » : le soleil orange qui se couche derrière sa colline
  sombre, et ses reflets orange sur le lac, sous elle. La colline est celle du devant, lue autour du soleil ; ses deux
  bouts descendent jusqu'à l'eau (une île basse), pour qu'aucun bord de découpe ne se voie. Les épinettes de droite ne
  passent pas : à leur place, la colline continue de son ton.

Tout est réduit depuis l'image d'origine, rien n'est agrandi. Rien ne touche le texte : chaque ligne, chaque filet,
chaque photo et la barre des tomes, élargis de MARGE (MARGE_FILET pour un filet), sont interdits, sauf le filet des
auteurs sous la butte ; on vérifie à la fin qu'aucun point changé n'y entre ni ne passe sur le devant.

Appelé par motif_dos() de images/tomes/essais-ia/tome-1/couverture.py :

    python3 images/tomes/essais-ia/tome-1/couverture.py --tome 4 --variantes C --sortie DOSSIER

Les coordonnées des découpes sont celles de titre-tome-4.jpg (3072 × 3840, retouchée le 18 octobre 2026) : une autre
image de titre demande de les reprendre.
"""
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

LUM = np.array([.2126, .7152, .0722], np.float32)
LAC = np.array([51, 81, 88], np.float32)          # le lac derrière les truites ; le ciel est à 1 ou 2 près
FICELLE = np.array([19, 27, 36], np.float32)      # médiane des ficelles de l'image
COLLINE = np.array([16, 29, 38], np.float32)      # médiane de la colline sombre derrière le soleil
TAILLE_IMAGE = (3072, 3840)

# ---- dans l'image d'origine (px)
SECHOIR = (150, 1900, 1400)       # x0, y0, x1 : la fenêtre du séchoir ; son bas est la coupe des poteaux
POTEAUX = ((116, 262), (1048, 1174))   # les colonnes de la fenêtre où l'on cherche chaque poteau, contour compris
TETE_POTEAU = 1920                # le haut du poteau de gauche, qui dépasse de la perche
BAS_TRUITES = 2400                # le bas de la rangée du haut (la queue la plus longue)
FEU = (1150, 2700, 1800, 3430)
RIVE = ((0, 272, 2950), (410, 1200, 2860), (1780, 1858, 2700))   # les colonnes où la rive du pré se voit (sans poteau,
                                  # feu ni épinette), et la ligne où l'on commence à la chercher (sous les queues)
DESSUS_RIVE = 70                  # les brins qui dépassent sur l'eau : jusqu'à cette hauteur au-dessus de la rive
SOLEIL = (1560, 1715, 2250, 2490) # x0, y0, x1, y1 : le soleil, sa colline et ses reflets
EAU = 2078                        # la ligne de l'eau sous la colline
EPINETTE = 2100                   # dès cette colonne, l'épinette de droite : la colline y est prolongée de son ton

# ---- au dos (po)
MARGE = 0.14                      # autour d'un texte, d'une photo
MARGE_FILET = 0.14                # autour d'un filet
SOUS_TRUITES = 0.10               # le poteau se voit sous les truites sur cette hauteur, avant le pré
BUTTE = 0.10                      # l'épaisseur du pré sous le séchoir
FEU_X = 0.62                      # le feu, à cette fraction de l'échelle du séchoir
DROITE = 0.16                     # le séchoir finit à cette distance du bout du filet des auteurs
PIED_D = 0.12                     # la butte redescend au filet sur cette longueur, à droite du séchoir
PIED_G = 0.55                     # et sur celle-ci, à gauche du feu
ECART_FEU = 0.02                  # entre le feu et le poteau
PLI = 0.085                       # la colline du soleil s'arrête à cette distance des plis de la tranche
HAUT_TRANCHE = 0.46               # le soleil se place à 46 % du trou de la tranche
MIROIR = True


def _lum(a):
    return a.astype(np.float32) @ LUM


def _recadrer(fg, al):
    ys, xs = np.nonzero(al > 0.01)
    s = (slice(ys.min(), ys.max() + 1), slice(xs.min(), xs.max() + 1))
    return fg[s], al[s]


# ------------------------------------------------------------------ les découpes, en px de l'image du devant
# Chacune rend (fg, al) : la couleur prémultipliée par l'alpha, et l'alpha (0 à 1).

def sechoir(img, y_coupe):
    """La perche, ses deux poteaux coupés à la ligne y_coupe de l'image, la rangée du haut des truites et leurs
    ficelles. La perche suit le brun de l'image, son contour sombre compris ; les poteaux sont ce qui n'est pas le lac
    dans leurs colonnes, sous la perche, et le brun de leur tête au-dessus ; la colline derrière et le rang du bas
    restent dans l'image. Rend aussi la colonne (fenêtre) du milieu de chaque poteau."""
    x0, y0, x1 = SECHOIR
    a = np.asarray(img, np.float32)[y0:y_coupe, x0:x1]
    R, G = a[..., 0], a[..., 1]
    H, W = R.shape
    d = np.sqrt(((a - LAC) ** 2).sum(-1))             # écart au lac
    brun = (R > G + 25) & (R > 70)
    cols = np.arange(W)
    haut, bas = np.full(W, np.nan), np.full(W, np.nan)
    for x in range(W):
        ys = np.nonzero(brun[30:230, x])[0]
        if len(ys):
            haut[x], bas[x] = ys.min() + 30, ys.max() + 30
    poteau = np.zeros(W, bool)
    for c0, c1 in POTEAUX:
        poteau[c0 + 30:c1 - 10] = True
    ok = ~np.isnan(haut) & ~poteau
    xa, xb = cols[ok].min(), cols[ok].max()
    # les joints sombres entre les tronçons ne coupent pas la perche : le bord le plus large sur 25 px
    bas_brut = np.interp(cols, cols[ok], bas[ok])
    haut = ndi.minimum_filter1d(np.interp(cols, cols[ok], haut[ok]), 25)
    bas = ndi.maximum_filter1d(bas_brut, 25)
    yy = np.arange(H)[:, None]
    barre = (yy >= haut[None] - 6) & (yy <= bas[None] + 5) & ((cols >= xa) & (cols <= xb))[None]
    barre &= ~((yy > bas[None] + 1) & (d < 40))          # pas de lac sous la perche
    dessous = barre & (yy > bas_brut[None] + 1)          # sous le brun, le contour reste et les bouts de ficelle partent
    barre = (barre & ~dessous) | ndi.binary_opening(dessous, structure=np.ones((1, 15)))
    bc = ndi.binary_dilation(ndi.binary_fill_holes(ndi.binary_closing(brun, iterations=6)), iterations=7)
    barre &= bc | ~((cols < xa + 90) | (cols > xb - 90))[None]     # la coupe des deux bouts suit la bûche
    # les poteaux : sous la perche, ce qui n'est pas le lac dans leurs colonnes ; au-dessus, le brun de leur tête et
    # son contour
    milieux = []
    for c0, c1 in POTEAUX:
        z = np.zeros((H, W), bool)
        z[:, c0:c1] = True
        sous = z & (yy > bas_brut[None] - 4) & (d > 25)
        sous = ndi.binary_opening(sous, structure=np.ones((3, 9)))
        lab, n = ndi.label(sous)
        if n:
            t = np.bincount(lab.ravel())
            t[0] = 0
            sous = lab == int(np.argmax(t))
        sous = ndi.binary_fill_holes(ndi.binary_closing(sous, structure=np.ones((5, 5))))
        tete = ndi.binary_dilation(ndi.binary_fill_holes(ndi.binary_closing(brun & z & (yy < bas[None]), iterations=3)),
                                   iterations=4) & z & (yy >= TETE_POTEAU - y0 - 4)
        barre |= sous | tete
        xs_ = np.nonzero(sous[H - 20:].any(0))[0]
        milieux.append((xs_.min() + xs_.max()) / 2 if len(xs_) else (c0 + c1) / 2)
    # les truites : ce qui n'est pas le lac, sous la perche ; une ouverture sépare les poissons de leurs ficelles
    zone = np.zeros((H, W), bool)
    zone[190:min(H, 900), 255:1050] = True
    lab, _ = ndi.label(ndi.binary_opening((d > 22) & zone, structure=np.ones((11, 11))))
    al = np.zeros((H, W), np.float32)
    fils = []
    for i, s in enumerate(ndi.find_objects(lab)):
        if s is None or s[0].stop - s[0].start < 80 or s[0].start > 400:          # la rangée du haut
            continue
        p = lab == i + 1
        m = ndi.binary_fill_holes(ndi.binary_dilation(p, iterations=7) & (d > 10))
        al = np.maximum(al, m * np.clip((d - 6) / 34, 0, 1))
        ys, xs = np.nonzero(p)
        fils.append((xs[ys < ys.min() + 6].mean(), ys.min()))
    fg = a - (1 - al[..., None]) * LAC                   # prémultiplié, le lac retiré des bords
    fg[al == 0] = 0
    ab = ndi.gaussian_filter(barre.astype(np.float32), 0.8)
    fg = fg * (1 - ab[..., None]) + a * ab[..., None]
    al = al * (1 - ab) + ab
    # les ficelles, tracées à 4 fois la taille puis réduites
    k = 4
    trace = Image.new('L', (W * k, H * k), 0)
    dr = ImageDraw.Draw(trace)
    for xc, tete in fils:
        dr.line([(xc * k, (bas[int(round(xc))] + 2) * k), (xc * k, (tete + 4) * k)], fill=255, width=int(4.5 * k))
    f = np.asarray(trace.resize((W, H), Image.LANCZOS), np.float32) / 255
    fg = fg * (1 - f[..., None]) + FICELLE * f[..., None]
    al = al * (1 - f) + f
    ys, xs = np.nonzero(al > 0.01)
    fg, al = fg[ys.min():, xs.min():xs.max() + 1], al[ys.min():, xs.min():xs.max() + 1]
    return fg, al, [m - xs.min() for m in milieux], ys.min() + y0


def feu(img):
    """Le feu : les flammes, les bûches et le lit de braises. Le pré, le lac, le poteau du séchoir et les ombres
    sombres derrière les flammes restent dans l'image."""
    x0, y0, x1, y1 = FEU
    a = np.asarray(img, np.float32)[y0:y1, x0:x1]
    R, G, B = a[..., 0], a[..., 1], a[..., 2]
    yy, xx = np.mgrid[:a.shape[0], :a.shape[1]]
    fond = ((G > R + 8) & (G > 34)) | (np.abs(a - LAC).sum(-1) < 30)      # le pré vert, le lac
    flamme = ndi.binary_fill_holes(ndi.binary_closing((R > 140) & (R > B + 60), iterations=3))
    lab, _ = ndi.label(ndi.binary_opening(~fond & (yy >= 440), structure=np.ones((9, 9))))
    bas = ndi.binary_fill_holes(ndi.binary_closing(lab == lab[560, 300], iterations=4))   # bûches et braises
    m = (flamme | bas) & ~((xx < 190) & (yy < 458))      # sans le poteau du séchoir
    lab, _ = ndi.label(m)
    t = np.bincount(lab.ravel())
    t[0] = 0
    m = np.isin(lab, np.nonzero(t > 400)[0])
    al = ndi.gaussian_filter(m.astype(np.float32), 0.7)
    return _recadrer(a * al[..., None], al)


def rive(img):
    """Le pré le long de la rive, à plat : chaque colonne de RIVE est décalée pour que sa rive tombe sur la même
    ligne (DESSUS_RIVE), puis les morceaux sont mis bout à bout, chacun suivi de son reflet en miroir (le pré est
    plus long au dos que la rive libre du devant). Rend (fg, al) : le pré plein sous la rive, et au-dessus, les brins
    qui dépassent sur l'eau (ce qui s'écarte du lac)."""
    a = np.asarray(img, np.float32)
    L = _lum(a)
    morceaux = []
    prof = 260                                           # px sous la rive
    for c0, c1, depart in RIVE:
        S = L[depart:depart + 500, c0:c1]
        noir = ndi.binary_opening(S < 61, structure=np.ones((31, 15)))
        yS = np.where(noir.any(0), np.argmax(noir, axis=0), 0).astype(np.float32) + depart
        yS = ndi.gaussian_filter1d(ndi.median_filter(yS, 21, mode='nearest'), 4, mode='nearest')
        bloc = np.zeros((DESSUS_RIVE + prof, c1 - c0, 3), np.float32)
        alb = np.zeros((DESSUS_RIVE + prof, c1 - c0), np.float32)
        for j in range(c1 - c0):
            y = int(round(yS[j]))
            col = a[y - DESSUS_RIVE:y + prof, c0 + j]
            d = np.sqrt(((col - LAC) ** 2).sum(-1))
            al = np.clip((d - 12) / 28, 0, 1)
            al[DESSUS_RIVE:] = 1
            bloc[:, j], alb[:, j] = col, al
        morceaux.append((bloc, alb))
    fg = np.concatenate([b * al[..., None] for b, al in morceaux] + [b[:, ::-1] * al[:, ::-1, None]
                                                                     for b, al in morceaux[::-1]], axis=1)
    al = np.concatenate([al for _, al in morceaux] + [al[:, ::-1] for _, al in morceaux[::-1]], axis=1)
    return fg, al


def soleil(img):
    """Le soleil qui se couche derrière sa colline, et ses reflets sur le lac : alpha de l'orange (le soleil, les
    reflets) et du sombre (la colline, au-dessus de l'eau). Les deux bouts de la colline descendent à l'eau ; à droite
    de EPINETTE, l'épinette ne passe pas : la colline continue à la hauteur de sa dernière colonne lue, de son ton,
    puis descend."""
    x0, y0, x1, y1 = SOLEIL
    a = np.asarray(img, np.float32)[y0:y1, x0:x1]
    H, W = a.shape[:2]
    L = _lum(a)
    orange = np.clip((a[..., 0] - a[..., 1] - 40) / 70, 0, 1)
    yy = np.arange(H)[:, None]
    eau = EAU - y0
    sombre = (L < 48) & (orange < 0.2)
    sombre = ndi.binary_opening(sombre, structure=np.ones((5, 5)))
    crete = np.where(sombre[:eau].any(0), np.argmax(sombre[:eau], axis=0), eau).astype(np.float64)
    e = EPINETTE - x0
    crete = ndi.median_filter(crete, 5, mode='nearest')
    crete[e:] = crete[e - 1]
    # les deux bouts descendent à l'eau : à gauche sur 110 px, à droite après 30 px de palier, sur le reste
    cols = np.arange(W, dtype=np.float64)
    g = np.clip(1 - cols / 110, 0, 1)
    dd = np.clip((cols - (e + 30)) / max(1, W - (e + 30)), 0, 1)
    pente = np.maximum(g, dd)
    pente = pente * pente * (3 - 2 * pente)
    crete = crete + (eau - crete) * pente
    # la colline : le sombre de l'image sous la crête, au-dessus de l'eau ; à droite de l'épinette, le ton de la colline
    col_h = np.clip((yy + 0.5 - crete[None, :]), 0, 1) * (yy < eau)
    al_h = np.where(cols[None, :] < e, col_h * np.clip((70 - L) / 30, 0, 1), col_h)
    al_h = np.where(yy < eau, np.maximum(al_h, col_h * (yy > crete[None, :] + 3)), 0)   # le cœur de la colline, plein
    coul = np.where(((cols[None, :] >= e) | (L > 70))[..., None] & (al_h[..., None] > 0) & (orange[..., None] < 0.5),
                    COLLINE, a)
    # le soleil et ses reflets : l'orange ; à droite de l'épinette, seul l'orange du soleil (au-dessus de l'eau)
    al_o = orange * ((cols[None, :] < e + 30) | (yy < eau))
    al = np.maximum(al_h, al_o)
    fg = coul * al[..., None]
    return fg, al.astype(np.float32)


# ------------------------------------------------------------------ outils
def reduire(fg, al, s):
    """Réduit une découpe prémultipliée d'un facteur s (Lanczos, couche par couche)."""
    h, w = al.shape
    W, H = max(1, round(w * s)), max(1, round(h * s))
    r = lambda c: np.asarray(Image.fromarray(np.ascontiguousarray(c, np.float32), 'F').resize((W, H), Image.LANCZOS))
    al2 = np.clip(r(al), 0, 1)
    fg2 = np.clip(np.stack([r(fg[..., c]) for c in range(3)], -1), 0, 255 * al2[..., None])
    al2[al2 < 0.004] = 0
    return fg2, al2


def poser(can, fg, al, x, y):
    """Pose la découpe prémultipliée (fg, al) au coin x, y du fond."""
    h, w = al.shape
    H, W = can.shape[:2]
    a0, b0, a1, b1 = max(0, -y), max(0, -x), min(h, H - y), min(w, W - x)
    if a1 <= a0 or b1 <= b0:
        return
    z = can[y + a0:y + a1, x + b0:x + b1].astype(np.float32)
    A = al[a0:a1, b0:b1, None]
    can[y + a0:y + a1, x + b0:x + b1] = np.clip(np.rint(fg[a0:a1, b0:b1] + z * (1 - A)), 0, 255).astype(np.uint8)


def miroir(fg, al):
    return fg[:, ::-1], al[:, ::-1]


# ------------------------------------------------------------------ les trous
def interdit(info, marge=MARGE, marge_filet=MARGE_FILET):
    """Ce qu'on ne touche pas, en px du fond : chaque texte, chaque filet, chaque photo, élargi de la marge (po).
    Les blocs qui ne font que regrouper (présentation, sommaire, auteurs) comptent par leur contenu ; les filets des
    lignes du sommaire, qui n'ont pas de boîte, sont refaits ligne par ligne (0,6 pt, 4,8 px CSS sous la ligne, sur la
    largeur de sa colonne) ; un titre à filet (l'en-tête, les titres du sommaire et des auteurs) compte par son texte et
    par son filet du bas. Rend le masque, la liste des titres à filet (boîtes CSS) et le masque de chaque filet de
    titre (pour en libérer un)."""
    ppp, H, xf = info['ppp'], info['H'], info['xf']
    k = ppp / 96
    R = [r for r in info['rects'] if r[0] * k < xf and r[4] >= 0]
    textes = [r for r in R if r[4] > 0]
    blocs = [r for r in R if r[4] == 0]
    dedans = lambda b, r: r[0] >= b[0] - .5 and r[2] <= b[2] + .5 and r[1] >= b[1] - .5 and r[3] <= b[3] + .5
    larg = max(r[2] for r in blocs) - min(r[0] for r in blocs)
    garder = [(r, marge) for r in textes]
    filets = []
    for b in blocs:
        n = sum(dedans(b, t) for t in textes)
        if n >= 3 and b[3] - b[1] > 0.5 * 96:
            if n >= 15:          # le sommaire : chaque ligne a son filet sur la largeur de sa colonne
                mid = (b[0] + b[2]) / 2
                for t in textes:
                    if dedans(b, t) and t[1] > b[1] + 0.3 * 96:
                        c0, c1 = (b[0], mid - 0.18 * 96) if t[0] < mid else (mid + 0.18 * 96, b[2])
                        garder.append(((c0, t[3], c1, t[3] + 6.0, 0), marge_filet))
            continue
        if b[3] - b[1] < 0.4 * 96 and b[2] - b[0] > 0.8 * larg:
            filets.append(b)
            garder.append(((b[0], b[3] - 3.4, b[2], b[3], 0), marge_filet))
            continue
        garder.append((b, marge))
    m = np.zeros((H, xf), bool)
    for (x0, y0, x1, y1, _), mg in garder:
        mp = mg * ppp
        a, b = max(0, int(y0 * k - mp)), min(H, int(np.ceil(y1 * k + mp)))
        c, d = max(0, int(x0 * k - mp)), min(xf, int(np.ceil(x1 * k + mp)))
        m[a:b, c:d] = True
    return m, sorted(filets, key=lambda r: r[1])


# ------------------------------------------------------------------ les deux scènes
def scene_quatrieme(can, img, info, m, aut):
    """Le séchoir, le feu et le pré, posés sur le filet des auteurs, sous le bout droit du sommaire. Rend la boîte
    posée (x0, y0, x1, y1) et un résumé."""
    ppp = info['ppp']
    k = ppp / 96
    y_filet = (aut[3] - 1.67) * k                       # le haut du filet des auteurs (1,25 pt), px du fond
    x_bout = aut[2] * k                                 # le bout droit du filet
    yf = int(np.floor(y_filet))
    crete = y_filet - BUTTE * ppp                       # le dessus du pré sous le séchoir
    # la hauteur libre au-dessus du filet, colonne par colonne : sous le plus bas des interdits du sommaire
    zone = m[:int(aut[1] * k)]                          # au-dessus du bloc du titre des auteurs
    bas_interdit = np.where(zone.any(0), zone.shape[0] - np.argmax(zone[::-1], axis=0), 0)
    # l'échelle : le séchoir, de la tête du poteau à SOUS_TRUITES sous les truites, tient entre le sommaire et le pré
    x_d = int(x_bout - DROITE * ppp)
    haut_dispo = None
    s = None
    for _ in range(6):                                  # la largeur dépend de l'échelle, le plafond de la largeur
        larg = (SECHOIR[2] - SECHOIR[0]) * (s or 0.3)
        plafond = bas_interdit[max(0, int(x_d - larg)):x_d].max()
        haut_dispo = crete - plafond - 1
        s = (haut_dispo - SOUS_TRUITES * ppp) / (BAS_TRUITES - TETE_POTEAU)
    y_coupe = int(np.ceil(TETE_POTEAU + (y_filet + 3 - plafond) / s))   # les poteaux descendent sous le filet
    fg, al, milieux, y_haut = sechoir(img, y_coupe)
    if MIROIR:
        fg, al = miroir(fg, al)
        milieux = [al.shape[1] - 1 - x for x in milieux][::-1]
    S_fg, S_al = reduire(fg, al, s)
    sx, sy = x_d - S_al.shape[1], int(round(plafond + 1 + (y_haut - TETE_POTEAU) * s))
    # le feu, au pied du poteau de gauche (de droite au devant, en miroir)
    ffg, fal = feu(img)
    if MIROIR:
        ffg, fal = miroir(ffg, fal)
    F_fg, F_al = reduire(ffg, fal, s * FEU_X)
    x_poteau = sx + milieux[0] * s                      # le milieu du poteau de gauche
    larg_poteau = 100 * s
    fx = int(round(x_poteau - larg_poteau / 2 - ECART_FEU * ppp - F_al.shape[1] * 0.92))
    fy = int(round(crete + 0.6 * BUTTE * ppp - F_al.shape[0]))
    # le pré : une butte basse, du pied gauche (PIED_G à gauche du feu) au pied droit (PIED_D à droite du séchoir)
    rfg, ral = rive(img)
    R_fg, R_al = reduire(rfg, ral, s)
    y_rive = DESSUS_RIVE * s                             # la rive dans la bande réduite
    xg, xd = int(fx - PIED_G * ppp), int(min(x_bout - 2, sx + S_al.shape[1] + PIED_D * ppp))
    plat_g, plat_d = fx + 0.15 * F_al.shape[1], sx + S_al.shape[1]
    n = xd - xg
    if R_al.shape[1] < n:
        reps = int(np.ceil(n / R_al.shape[1]))
        R_fg, R_al = np.concatenate([R_fg] * reps, 1), np.concatenate([R_al] * reps, 1)
    xs = np.arange(xg, xd, dtype=np.float64)
    t = np.clip(np.minimum((xs - xg) / max(1, plat_g - xg), (xd - xs) / max(1, xd - plat_d)), 0, 1)
    t = t * t * (3 - 2 * t)                              # la butte : 0 aux pieds, 1 sous le feu et le séchoir
    dessus = y_filet - BUTTE * ppp * t                   # le dessus du pré, colonne par colonne
    h_bande = int(np.ceil(y_filet + 3 - (dessus.min() - y_rive))) + 2
    y0b = int(np.floor(dessus.min() - y_rive)) - 1
    rr = np.arange(y0b, y0b + h_bande, dtype=np.float64)[:, None]
    src_r = rr - (dessus[None, :] - y_rive)              # la ligne de la bande réduite qui tombe là
    cc = np.broadcast_to(np.arange(n, dtype=np.float64)[None, :], src_r.shape)
    P_al = ndi.map_coordinates(R_al, [src_r, cc], order=1, mode='constant')
    P_fg = np.stack([ndi.map_coordinates(R_fg[..., c], [src_r, cc], order=1, mode='constant') for c in range(3)], -1)
    sous = rr > y_filet + 3                              # rien sous le filet
    P_al = np.where(sous, 0, P_al).astype(np.float32)
    P_fg = np.where(sous[..., None], 0, P_fg).astype(np.float32)
    poser(can, S_fg, S_al, sx, sy)
    poser(can, P_fg, P_al, xg, y0b)
    poser(can, F_fg, F_al, fx, fy)
    boite = (min(xg, fx, sx), min(sy, fy), max(xd, sx + S_al.shape[1]), int(y_filet + 4))
    res = ('séchoir de %.2f × %.2f po (échelle %.3f), feu de %.2f × %.2f po, pré de %.2f à %.2f po du bord perdu, '
           'posé sur le filet des auteurs à %.2f po du haut' % (S_al.shape[1] / ppp, (y_filet - sy) / ppp, s,
                                                                F_al.shape[1] / ppp, F_al.shape[0] / ppp, xg / ppp,
                                                                xd / ppp, y_filet / ppp))
    return boite, res


def scene_tranche(can, img, info, m):
    """Le soleil, sa colline et ses reflets, dans le trou de la tranche, aussi large que la tranche le permet."""
    ppp, xt, xf = info['ppp'], info['xt'], info['xf']
    H = can.shape[0]
    libre = ~m[:, xt:xf].any(1)
    libre[:int(0.375 * ppp)] = False
    libre[H - int(0.375 * ppp):] = False
    lab, n = ndi.label(libre)
    if not n:
        return None, 'pas de trou sur la tranche'
    t = max(ndi.find_objects(lab), key=lambda s_: s_[0].stop - s_[0].start)[0]
    ga, gb = t.start, t.stop
    fg, al = soleil(img)
    if MIROIR:
        fg, al = miroir(fg, al)
    x_g, x_d = xt + PLI * ppp, xf - PLI * ppp
    s = min(1.0, (x_d - x_g) / al.shape[1], (gb - ga) / al.shape[0])
    T_fg, T_al = reduire(fg, al, s)
    h, w = T_al.shape
    x = int(round((xt + xf) / 2 - w / 2))
    y = int(round(ga + HAUT_TRANCHE * (gb - ga - h)))
    poser(can, T_fg, T_al, x, y)
    return (x, y, x + w, y + h), ('soleil, colline et reflets de %.2f × %.2f po, de %.2f à %.2f po du haut (trou : '
                                  '%.2f à %.2f po)' % (w / ppp, h / ppp, y / ppp, (y + h) / ppp, ga / ppp, gb / ppp))


# ------------------------------------------------------------------ le motif
def motif(can, info):
    img = info['image']
    if img.size != TAILLE_IMAGE:
        img = img.resize(TAILLE_IMAGE, Image.LANCZOS)
    ppp, xf = info['ppp'], info['xf']
    avant = can.copy()
    m, filets = interdit(info)
    if len(filets) < 3:
        print('    dos 4 : la quatrième n\'a pas ses trois titres à filet, rien n\'est posé')
        return can
    aut = filets[2]                                     # l'en-tête, le titre du sommaire, le titre des auteurs
    b4, r4 = scene_quatrieme(can, img, info, m, aut)
    bt, rt = scene_tranche(can, img, info, m)
    print('    dos 4 : ' + r4)
    print('    dos 4 : ' + rt)
    # contrôle : rien sur le devant ; rien dans la marge du texte, sauf la butte sur le filet des auteurs
    chg = (can != avant).any(2)
    k = ppp / 96
    permis = np.zeros_like(m)
    permis[int((aut[3] - 1.67) * k - MARGE_FILET * ppp) - 2:int(np.ceil(aut[3] * k + MARGE_FILET * ppp)) + 2,
           int(aut[0] * k):int(np.ceil(aut[2] * k))] = True
    if chg[:, xf:].any() or (chg[:, :xf] & m & ~permis).any():
        print('    dos 4 : ATTENTION, le motif touche le devant ou la marge du texte')
    if (chg[:, :xf] & permis & (np.arange(chg.shape[0])[:, None] > (aut[3] * k + 1))).any():
        print('    dos 4 : ATTENTION, le pré passe sous le filet des auteurs')
    return can
