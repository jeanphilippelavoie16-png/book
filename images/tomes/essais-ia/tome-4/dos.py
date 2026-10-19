# -*- coding: utf-8 -*-
"""Tome 4 : des éléments de l'image du devant au dos de la couverture (essai v1)."""
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

LAC = np.array([51, 81, 88], np.float32)      # le lac derrière les poissons (presque le ciel)


def _gris(a):
    return a @ np.array([.2126, .7152, .0722], np.float32)


# ------------------------------------------------------------------ les découpes, à la taille de l'image du devant
def sechoir(img):
    """La perche du séchoir et la rangée du haut de ses truites, découpées dans l'image ; les ficelles sont retracées
    de la perche à la tête de chaque poisson (dans l'image, leur haut se perd dans la colline sombre)."""
    x0, y0, x1, y1 = 150, 1900, 1400, 2900
    a = np.asarray(img, np.float32)[y0:y1, x0:x1]
    R, G = a[..., 0], a[..., 1]
    H, W = R.shape
    d = np.sqrt(((a - LAC) ** 2).sum(-1))
    brun = (R > G + 25) & (R > 70)
    cols = np.arange(W)
    haut = np.full(W, np.nan)
    bas = np.full(W, np.nan)
    for x in range(W):
        ys = np.nonzero(brun[30:230, x])[0]
        if len(ys):
            haut[x], bas[x] = ys.min() + 30, ys.max() + 30
    poteau = ((cols >= 150) & (cols <= 235)) | ((cols >= 1040) & (cols <= 1135))
    ok = ~np.isnan(haut) & ~poteau
    xa, xb = cols[ok].min(), cols[ok].max()
    # les joints sombres entre les tronçons ne coupent pas la perche : on prend le bord le plus large sur 25 px
    bas_brut = np.interp(cols, cols[ok], bas[ok])
    haut = ndi.minimum_filter1d(np.interp(cols, cols[ok], haut[ok]), 25)
    bas = ndi.maximum_filter1d(bas_brut, 25)
    yy = np.arange(H)[:, None]
    # la perche et son contour sombre, sans le lac ni le haut des ficelles du rang du bas qui passent dessous
    barre = (yy >= haut[None] - 6) & (yy <= bas[None] + 5) & ((cols >= xa) & (cols <= xb))[None]
    barre &= ~((yy > bas[None] + 1) & (d < 40))
    dessous = barre & (yy > bas_brut[None] + 1)          # sous le brun : le contour reste, les bouts de ficelle partent
    barre = (barre & ~dessous) | ndi.binary_opening(dessous, structure=np.ones((1, 15)))
    # aux deux bouts, la coupe franche de la bûche suit le brun de l'image
    bc = ndi.binary_dilation(ndi.binary_fill_holes(ndi.binary_closing(brun, iterations=6)), iterations=7)
    bouts = (cols < xa + 90) | (cols > xb - 90)
    barre &= bc | ~bouts[None]
    # les poissons : tout ce qui n'est pas le lac, sous la perche ; les ficelles partent à l'ouverture
    pm = d > 22
    zone = np.zeros_like(pm)
    zone[190:900, 255:1050] = True
    ouv = ndi.binary_opening(pm & zone, structure=np.ones((11, 11)))
    lab, n = ndi.label(ouv)
    alpha = np.zeros((H, W), np.float32)
    fils = []
    for i, s in enumerate(ndi.find_objects(lab)):
        if s[0].stop - s[0].start < 80 or s[0].start > 400:      # la rangée du haut seulement
            continue
        m = ndi.binary_dilation(lab == i + 1, iterations=7) & (d > 10)
        m = ndi.binary_fill_holes(m)
        alpha = np.maximum(alpha, m * np.clip((d - 6) / 34, 0, 1))
        ys, xs = np.nonzero(lab == i + 1)
        tete = ys.min()
        xc = xs[ys < tete + 6].mean()
        fils.append((xc, tete))
    rgb = a.copy()
    # premultiplié, le lac retiré des bords
    fg = rgb - (1 - alpha[..., None]) * LAC
    fg[alpha == 0] = 0
    # la perche
    ab = ndi.gaussian_filter(barre.astype(np.float32), 0.8)
    fg = fg * (1 - ab[..., None]) + rgb * ab[..., None]
    alpha = alpha * (1 - ab) + ab
    # les ficelles, tracées à 4x puis réduites
    k = 4
    fil = Image.new('L', (W * k, H * k), 0)
    dr = ImageDraw.Draw(fil)
    for xc, tete in fils:
        yb = bas[int(round(xc))] + 2
        dr.line([(xc * k, yb * k), (xc * k, (tete + 4) * k)], fill=255, width=int(3.2 * k))
    fil = np.asarray(fil.resize((W, H), Image.LANCZOS), np.float32) / 255
    couleur_fil = np.array([20, 27, 34], np.float32)
    fg = fg * (1 - fil[..., None]) + couleur_fil * fil[..., None]
    alpha = alpha * (1 - fil) + fil
    # recadrer sur ce qui est dessiné
    ys, xs = np.nonzero(alpha > 0.01)
    s = (slice(ys.min(), ys.max() + 1), slice(xs.min(), xs.max() + 1))
    return fg[s], alpha[s]


def feu(img):
    """Le feu : les flammes, les bûches et le lit de braises, découpés dans l'image ; le pré, le lac, le poteau du
    séchoir et l'ombre derrière les flammes restent dans l'image."""
    x0, y0, x1, y1 = 1150, 2700, 1800, 3430
    a = np.asarray(img, np.float32)[y0:y1, x0:x1]
    R, G, B = a[..., 0], a[..., 1], a[..., 2]
    H, W = R.shape
    yy, xx = np.mgrid[:H, :W]
    fond = ((G > R + 8) & (G > 34)) | (np.abs(a - LAC).sum(-1) < 30)
    flamme = ndi.binary_fill_holes(ndi.binary_closing((R > 140) & (R > B + 60), iterations=3))
    bas = ndi.binary_opening(~fond & (yy >= 440), structure=np.ones((9, 9)))
    lab, n = ndi.label(bas)
    bas = ndi.binary_fill_holes(ndi.binary_closing(lab == lab[560, 300], iterations=4))
    m = (flamme | bas) & ~((xx < 190) & (yy < 458))
    lab, n = ndi.label(m)
    t = np.bincount(lab.ravel())
    t[0] = 0
    m = np.isin(lab, np.nonzero(t > 400)[0])
    al = ndi.gaussian_filter(m.astype(np.float32), 0.7)
    fg = a * al[..., None]
    ys, xs = np.nonzero(al > 0.01)
    s = (slice(ys.min(), ys.max() + 1), slice(xs.min(), xs.max() + 1))
    return fg[s], al[s]


# ------------------------------------------------------------------ placer et coller
def reduire(fg, al, s):
    """Réduit une découpe prémultipliée d'un facteur s (Lanczos sur chaque couche)."""
    h, w = al.shape
    W, H = max(1, round(w * s)), max(1, round(h * s))
    r = lambda c: np.asarray(Image.fromarray(c.astype(np.float32), 'F').resize((W, H), Image.LANCZOS))
    al2 = np.clip(r(al), 0, 1)
    fg2 = np.stack([r(fg[..., c]) for c in range(3)], -1)
    fg2 = np.clip(fg2, 0, 255 * al2[..., None])
    return fg2, al2


def coller(can, fg, al, x, y):
    h, w = al.shape
    zone = can[y:y + h, x:x + w].astype(np.float32)
    out = fg + zone * (1 - al[..., None])
    can[y:y + h, x:x + w] = np.clip(np.rint(out), 0, 255).astype(np.uint8)


def interdit(info, marge=0.14, marge_filet=0.16):
    """Le masque de ce qu'on ne touche pas, en px du fond : chaque texte, chaque filet, chaque photo, élargi d'une
    marge (en po). Les blocs qui ne servent qu'à regrouper (texte, sommaire, auteurs) ne comptent que par leur
    contenu ; les filets des lignes du sommaire, qui ne sont pas dans les boîtes, sont refaits ligne par ligne ; un
    titre à filet (l'en-tête, les titres du sommaire et des auteurs) compte par son texte et par son filet du bas.
    Rend le masque et les titres à filet, de haut en bas."""
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
        if n >= 3 and (b[3] - b[1]) > 0.5 * 96:
            if n >= 15:          # le sommaire : chaque ligne porte un filet sur toute la largeur de sa colonne
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
    """Le plus grand rectangle libre dans la fenêtre (px du fond), par histogramme sur une grille réduite."""
    g = libre[y0:y1:pas, x0:x1:pas]
    h, w = g.shape
    hauteurs = np.zeros(w, int)
    best = (0, None)
    for i in range(h):
        hauteurs = np.where(g[i], hauteurs + 1, 0)
        pile = []
        for j in range(w + 1):
            cur = hauteurs[j] if j < w else 0
            debut = j
            while pile and pile[-1][1] >= cur:
                debut, hh = pile.pop()
                aire = hh * (j - debut)
                if aire > best[0]:
                    best = (aire, (i - hh + 1, debut, i + 1, j))
            pile.append((debut, cur))
    if not best[1]:
        return None
    a, b, c, d = best[1]
    return (y0 + a * pas, x0 + b * pas, y0 + c * pas, x0 + d * pas)


def poser(can, m, decoupe, trou, haut_max=None, ou='centre'):
    """Réduit la découpe pour qu'elle tienne dans le trou (y0, x0, y1, x1) et pas plus haute que haut_max (px), la
    place (centrée, ou calée à droite), et la rapetisse encore tant qu'un seul de ses pixels tombe sur le masque."""
    fg, al = decoupe
    ya, xa, yb, xb = trou
    s = min((yb - ya) / al.shape[0], (xb - xa) / al.shape[1])
    if haut_max:
        s = min(s, haut_max / al.shape[0])
    while True:
        fg2, al2 = reduire(fg, al, s)
        al2[al2 < 0.01] = 0
        h, w = al2.shape
        x = xb - w if ou == 'droite' else xa + (xb - xa - w) // 2
        y = ya + (yb - ya - h) // 2
        if not (m[y:y + h, x:x + w] & (al2 > 0)).any():
            break
        s *= 0.97
    coller(can, fg2, al2, x, y)
    PROTEGE.append((y, x, al2 > 0))
    return x, y, w, h


PROTEGE = []          # (y, x, masque) de chaque découpe posée


def proteger(xf):
    """couverture.py passe nettoyer() APRÈS motif_dos() : elle retire du fond les petites taches claires près du texte,
    et prendrait pour des étoiles le bout des flammes, la queue des truites, le haut de la perche. On enveloppe la
    nettoyer() du script en cours pour remettre, après elle, les pixels des découpes posées ici. Rien ne change si
    le script nettoie avant d'appeler le motif."""
    import sys
    principal = sys.modules.get('__main__')
    orig = getattr(principal, 'nettoyer', None)
    if orig is None or getattr(orig, 'protege_dos', False):
        return
    masques = list(PROTEGE)

    def nettoyer(can, rects, ppp):
        avant = can.copy()
        out, n = orig(can, rects, ppp)
        for y, x, mq in masques:
            mq = ndi.binary_dilation(mq, iterations=6)
            h, w = mq.shape
            out[y:y + h, x:x + w][mq] = avant[y:y + h, x:x + w][mq]
        return out, n
    nettoyer.protege_dos = True
    principal.nettoyer = nettoyer


def motif(can, info):
    img = info['image']
    ppp, xf, xt = info['ppp'], info['xf'], info['xt']
    k = ppp / 96
    del PROTEGE[:]
    m, filets = interdit(info)
    libre = ~m
    x_g = min(r[0] for r in filets) * k                 # la colonne de la quatrième
    x_d = max(r[2] for r in filets) * k
    hd, toc, aut = filets[0], filets[1], filets[2]
    poses = []
    haut = plus_grand_vide(libre, int(hd[3] * k), int(toc[3] * k), int(x_g), int(x_d))     # à droite de la présentation
    bas = plus_grand_vide(libre, int(toc[3] * k), int(aut[3] * k), int(x_g), int(x_d))     # sous le sommaire
    pli = ppp / 16 + 0.06 * ppp                                                             # tolérance de coupe
    tr = plus_grand_vide(libre, 0, info['H'], int(xt + pli), int(xf - pli))                # la tranche
    import os
    choix = os.environ.get('MOTIFS', 'sechoir,feu-bas').split(',')
    if 'sechoir' in choix:
        poses.append(('séchoir', poser(can, m, sechoir(img), haut, haut_max=0.8 * ppp, ou='droite')))
    if 'feu-bas' in choix:
        poses.append(('feu', poser(can, m, feu(img), bas)))
    if 'feu-tranche' in choix:
        poses.append(('feu', poser(can, m, feu(img), tr)))
    for nom, (x, y, w, h) in poses:
        print('    %s : %.2f × %.2f po, à %.2f, %.2f po' % (nom, w / ppp, h / ppp, x / ppp, y / ppp))
    proteger(xf)
    return can
