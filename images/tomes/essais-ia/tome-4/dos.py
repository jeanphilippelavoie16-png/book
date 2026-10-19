# -*- coding: utf-8 -*-
"""Tome 4, De la bête au garde-manger : des éléments de l'image du devant dans les trous de la quatrième.

JP, 19 octobre 2026 : « j'aime que pour le tome 1 on retrouve des éléments de la couverture en arrière (les étoiles),
fais-le pour les autres » ; puis : « mets-en dans les trous sur la page en arrière, faut juste pas que ça touche au
texte ». Le ciel du tome 4 n'a presque pas d'étoiles ; ce qu'on reconnaît d'un coup d'œil, c'est le séchoir et le feu.

  le séchoir   la perche et la rangée du haut de ses truites, à droite des deux dernières lignes de la présentation,
               au-dessus du titre du sommaire, calé sur le bord droit de la colonne
  le feu       les flammes, les bûches et le lit de braises, sous la colonne de droite du sommaire (après le ch. 81),
               au-dessus du titre des auteurs, calé lui aussi sur le bord droit

Les deux sont découpés dans titre-tome-4.jpg elle-même (mêmes encres, même gravure), puis réduits : aucun trait
redessiné, sauf les ficelles du séchoir, retracées de la perche à la tête de chaque truite à la couleur des ficelles de
l'image (leur haut s'y perd dans la colline sombre, qui ne passe pas au dos). Les trous se trouvent à partir des boîtes
du texte (info['rects']) : chaque texte, chaque filet et chaque photo, élargis de 0,14 po (0,16 po pour un filet), sont
interdits ; une découpe rapetisse tant qu'un seul de ses pixels y tombe, et elle saute si son trou devient trop petit.

Appelé par images/tomes/essais-ia/tome-1/couverture.py (motif_dos) : motif(can, info) dessine sur le fond de la
quatrième et de la tranche et rend le fond. Les coordonnées des découpes sont celles de titre-tome-4.jpg (3072 × 3840,
retouchée le 18 octobre 2026) : une autre image de titre demande de les reprendre.
"""
import sys

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

LAC = np.array([51, 81, 88], np.float32)          # le lac derrière les truites ; le ciel est à 1 ou 2 près
FICELLE = np.array([19, 27, 36], np.float32)      # médiane des ficelles de l'image
TAILLE_IMAGE = (3072, 3840)


# ------------------------------------------------------------------ les découpes, en px de l'image du devant
# Chacune rend (fg, al) : la couleur prémultipliée par l'alpha, et l'alpha (0 à 1), recadrés sur ce qui est dessiné.

def _recadrer(fg, al):
    ys, xs = np.nonzero(al > 0.01)
    s = (slice(ys.min(), ys.max() + 1), slice(xs.min(), xs.max() + 1))
    return fg[s], al[s]


def sechoir(img):
    """La perche du séchoir et la rangée du haut de ses truites. La perche suit le brun de l'image, son contour sombre
    compris ; les poteaux, la colline derrière et le rang du bas restent dans l'image."""
    x0, y0, x1, y1 = 150, 1900, 1400, 2900
    a = np.asarray(img, np.float32)[y0:y1, x0:x1]
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
    poteau = ((cols >= 150) & (cols <= 235)) | ((cols >= 1040) & (cols <= 1135))
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
    # les truites : ce qui n'est pas le lac, sous la perche ; une ouverture sépare les poissons de leurs ficelles
    zone = np.zeros((H, W), bool)
    zone[190:900, 255:1050] = True
    lab, _ = ndi.label(ndi.binary_opening((d > 22) & zone, structure=np.ones((11, 11))))
    al = np.zeros((H, W), np.float32)
    fils = []
    for i, s in enumerate(ndi.find_objects(lab)):
        if s[0].stop - s[0].start < 80 or s[0].start > 400:          # la rangée du haut
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
    return _recadrer(fg, al)


def feu(img):
    """Le feu : les flammes, les bûches et le lit de braises. Le pré, le lac, le poteau du séchoir et les ombres
    sombres derrière les flammes restent dans l'image."""
    x0, y0, x1, y1 = 1150, 2700, 1800, 3430
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


# ------------------------------------------------------------------ les trous
def interdit(info, marge=0.14, marge_filet=0.16):
    """Ce qu'on ne touche pas, en px du fond : chaque texte, chaque filet, chaque photo, élargi de la marge (po).
    Les blocs qui ne font que regrouper (présentation, sommaire, auteurs) comptent par leur contenu ; les filets des
    lignes du sommaire, qui n'ont pas de boîte, sont refaits ligne par ligne ; un titre à filet (l'en-tête, les titres
    du sommaire et des auteurs) compte par son texte et par son filet du bas. Rend le masque et les titres à filet."""
    ppp, H, xf = info['ppp'], info['H'], info['xf']
    k = ppp / 96
    R = [r for r in info['rects'] if r[0] * k < xf]
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
                        c0, c1 = (b[0], mid - 0.17 * 96) if t[0] < mid else (mid + 0.17 * 96, b[2])
                        garder.append(((c0, t[3], c1, t[3] + 0.08 * 96, 0), marge_filet))
            continue
        if b[3] - b[1] < 0.4 * 96 and b[2] - b[0] > 0.8 * larg:
            filets.append(b)
            garder.append(((b[0], b[3] - 0.04 * 96, b[2], b[3], 0), marge_filet))
            continue
        garder.append((b, marge))
    m = np.zeros((H, xf), bool)
    for (x0, y0, x1, y1, _), mg in garder:
        mp = mg * ppp
        a, b = max(0, int(y0 * k - mp)), min(H, int(np.ceil(y1 * k + mp)))
        c, d = max(0, int(x0 * k - mp)), min(xf, int(np.ceil(x1 * k + mp)))
        m[a:b, c:d] = True
    return m, sorted(filets, key=lambda r: r[1])


def plus_grand_vide(libre, y0, y1, x0, x1, pas=4):
    """Le plus grand rectangle libre de la fenêtre (px du fond) : (y0, x0, y1, x1), ou None."""
    g = libre[y0:y1:pas, x0:x1:pas]
    h, w = g.shape
    col = np.zeros(w, int)
    best = (0, None)
    for i in range(h):
        col = np.where(g[i], col + 1, 0)
        pile = []
        for j in range(w + 1):
            cur = col[j] if j < w else 0
            debut = j
            while pile and pile[-1][1] >= cur:
                debut, hh = pile.pop()
                if hh * (j - debut) > best[0]:
                    best = (hh * (j - debut), (i - hh + 1, debut, i + 1, j))
            pile.append((debut, cur))
    if not best[1]:
        return None
    a, b, c, d = best[1]
    return (y0 + a * pas, x0 + b * pas, y0 + c * pas, x0 + d * pas)


# ------------------------------------------------------------------ poser
def reduire(fg, al, s):
    """Réduit une découpe prémultipliée d'un facteur s (Lanczos, couche par couche)."""
    h, w = al.shape
    W, H = max(1, round(w * s)), max(1, round(h * s))
    r = lambda c: np.asarray(Image.fromarray(c.astype(np.float32), 'F').resize((W, H), Image.LANCZOS))
    al2 = np.clip(r(al), 0, 1)
    fg2 = np.clip(np.stack([r(fg[..., c]) for c in range(3)], -1), 0, 255 * al2[..., None])
    return fg2, al2


POSES = []          # (y, x, masque) de chaque découpe posée


def poser(can, m, decoupe, trou, haut_max, haut_min, ou='droite'):
    """Pose la découpe dans le trou (y0, x0, y1, x1), pas plus haute que haut_max (px), centrée en hauteur et calée à
    droite (ou centrée) ; elle rapetisse tant qu'un seul de ses pixels tombe sur le masque interdit, et ne se pose
    pas si elle passe sous haut_min. Rend (x, y, l, h) ou None."""
    if trou is None:
        return None
    fg, al = decoupe
    ya, xa, yb, xb = trou
    s = min((yb - ya) / al.shape[0], (xb - xa) / al.shape[1], haut_max / al.shape[0])
    while al.shape[0] * s >= haut_min:
        fg2, al2 = reduire(fg, al, s)
        al2[al2 < 0.01] = 0
        h, w = al2.shape
        x = xb - w if ou == 'droite' else xa + (xb - xa - w) // 2
        y = ya + (yb - ya - h) // 2
        if not (m[y:y + h, x:x + w] & (al2 > 0)).any():
            zone = can[y:y + h, x:x + w].astype(np.float32)
            can[y:y + h, x:x + w] = np.clip(np.rint(fg2 + zone * (1 - al2[..., None])), 0, 255).astype(np.uint8)
            POSES.append((y, x, al2 > 0))
            return x, y, w, h
        s *= 0.97
    return None


def proteger(g):
    """couverture.py passe nettoyer() APRÈS motif_dos() : elle retire du fond les petites taches claires près du texte
    (les étoiles du tome 1), et prendrait pour des étoiles le bout des flammes, la queue des truites et le haut de la
    perche (vérifié : flammes rognées, queues barbouillées). On enveloppe la nettoyer() du script appelant pour remettre,
    après elle, les pixels des découpes posées ici. Si le script nettoie avant d'appeler le motif, ceci ne change rien."""
    orig = g.get('nettoyer')
    if orig is None or getattr(orig, 'protege_dos', False):
        return
    poses = list(POSES)

    def nettoyer(can, rects, ppp):
        avant = can.copy()
        out, n = orig(can, rects, ppp)
        for y, x, mq in poses:
            mq = ndi.binary_dilation(mq, iterations=6)
            h, w = mq.shape
            out[y:y + h, x:x + w][mq] = avant[y:y + h, x:x + w][mq]
        return out, n
    nettoyer.protege_dos = True
    g['nettoyer'] = nettoyer


# ------------------------------------------------------------------ le motif
def motif(can, info):
    img = info['image']
    if img.size != TAILLE_IMAGE:
        img = img.resize(TAILLE_IMAGE, Image.LANCZOS)
    ppp, xf = info['ppp'], info['xf']
    k = ppp / 96
    del POSES[:]
    m, filets = interdit(info)
    if len(filets) < 3:
        print('    dos : la quatrième n\'a pas ses trois titres à filet, rien n\'est posé')
        return can
    libre = ~m
    hd, toc, aut = filets[:3]                           # l'en-tête, le titre du sommaire, le titre des auteurs
    x_g, x_d = int(min(r[0] for r in filets) * k), int(max(r[2] for r in filets) * k)    # la colonne de texte
    haut = plus_grand_vide(libre, int(hd[3] * k), int(toc[3] * k), x_g, x_d)     # à droite de la présentation
    bas = plus_grand_vide(libre, int(toc[3] * k), int(aut[3] * k), x_g, x_d)     # après le sommaire
    poses = [('séchoir', poser(can, m, sechoir(img), haut, 0.8 * ppp, 0.5 * ppp)),
             ('feu', poser(can, m, feu(img), bas, 0.62 * ppp, 0.4 * ppp))]
    for nom, p in poses:
        if p:
            x, y, w, h = p
            print('    dos : %s, %.2f × %.2f po, à %.2f po du bord gauche et %.2f po du haut (fond perdu compris)'
                  % (nom, w / ppp, h / ppp, x / ppp, y / ppp))
        else:
            print('    dos : %s, pas de trou assez grand, rien de posé' % nom)
    proteger(sys._getframe(1).f_globals)
    return can
