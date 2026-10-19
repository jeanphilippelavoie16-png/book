# -*- coding: utf-8 -*-
"""Le dos de la couverture du tome 2 (Le corps) : l'image du devant revient sur la tranche, au style du dos du tome 3
(JP, 19 octobre 2026, devant la couverture du tome 3 : « ça, j'aime ça, le style » ; avant : « mets-en dans les trous
sur la page en arrière, faut juste pas que ça touche au texte »).

Appelé par motif_dos() de images/tomes/essais-ia/tome-1/couverture.py :

    python3 images/tomes/essais-ia/tome-1/couverture.py --tome 2 --variantes C --sortie DOSSIER

Le dos du tome 2 est le mur du devant, en planches verticales peintes (texture_mur.py), reflété. Le seul grand trou est
la tranche, entre le titre et « Le Manuel du Nord » : la quatrième n'a, entre ses blocs de texte, que des bandes de
0,24 à 0,35 po, où rien de l'image ne se lit. Sur la tranche, un seul groupe, découpé dans l'image du devant elle-même
(images/tomes/titre-tome-2.jpg), aux encres de l'image, rien de redessiné :
  - la lampe à huile allumée, de la cheminée au pied, debout sur une tablette ;
  - la tablette : un bout de la planche du bas de la table du devant (son dessus clair, sa face sombre et ses filets) ;
  - la ficelle aux trois bouquets d'herbes qui sèchent la tête en bas, avec ses deux crochets, pendue sous la tablette
    comme elle pend sous la table du devant ;
  - la lueur de la lampe sur le mur : celle du devant, mesurée sur l'image (une tache ronde, centrée sur la flamme),
    à la même force, resserrée en largeur pour s'éteindre avant les plis (rien ne passe sur la quatrième ni sur le
    devant). Elle éclaire les planches sans les effacer : elle multiplie la couleur du mur, comme sur le devant.
Les trois pièces sont à la même échelle entre elles, la tablette aussi large que la tranche le permet ; tout est réduit
depuis l'image d'origine, rien n'est agrandi.

Le miroir du mur porte aussi le clou et le haut du fil de fer du cadre du devant (la dernière rangée reflétée passe
juste sous eux) : deux petits points sombres, en miroir l'un de l'autre, tombaient au dos juste après « Le scorbut et
l'arbre de vie » dans le sommaire. On les efface ici, et toute autre tache que le miroir aurait laissée : chaque point
du dos qui s'écarte de sa colonne de planche est remplacé par la même colonne prise plus haut ou plus bas (les
planches sont verticales : le fil du bois continue).

Rien ne touche le texte : chaque texte, chaque filet, les photos et la barre des tomes, élargis de MARGE, sont
interdits, et on vérifie à la fin qu'aucun point changé, hors des taches effacées du mur, n'y entre.
"""
import os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

LUM = np.array([.2126, .7152, .0722], np.float32)

# Dans l'image d'origine (3072 × 3840 px) :
LAMPE = (228, 2090, 582, 2792)            # x0, y0, x1, y1 : la lampe, de la cheminée au pied
NAPPE = 2759                              # le haut de la nappe : dessous, seul le pied sombre est à la lampe
PIED = 2786                               # le bas du pied de la lampe
PLANCHE = (790, 3206, 3275)               # la planche du bas de la table : x de départ, haut et bas (dessus clair de
                                          # 3210 à 3221, face sombre et ses deux filets jusqu'à 3274)
DESSUS = 3210                             # le fond du dessus clair de la planche : le pied de la lampe y pose, et tout le
                                          # dessus clair se voit devant lui (le pied sombre ne se perd pas dans la planche)
BOUQUETS = (822, 2967, 1046, 3192)        # la ficelle, ses deux crochets et les trois bouquets, sous la poutre
LUEUR = dict(cx=390, cy=2386,             # la lueur mesurée sur le mur du devant (gaussienne ajustée sur le mur,
             amp=(0.616, 1.392, 0.293),   # rouge, vert, bleu : le vert monte le plus, la lueur est orangée)
             sx=(255, 273, 193), sy=(232, 241, 181))

MARGE = 0.13                              # po, autour de tout ce qui est écrit ou tracé
PLI = 0.085                               # po : la tablette s'arrête à cette distance des plis de la tranche
ESPACE_PLI = 0.03                         # po : la lueur est éteinte à cette distance des plis
DEBORD = 0.09                             # la tablette dépasse le pied de la lampe de 9 % de sa largeur, de chaque côté
BOUQUETS_X = 1.3                          # les bouquets, 1,3 fois l'échelle de la lampe : à l'échelle de la lampe, ils ne
                                          # se lisaient plus (des petits balais)
LUEUR_X = 0.36                            # la lueur, resserrée en largeur : sa largeur à l'échelle, fois LUEUR_X
HAUT = 0.46                               # le groupe se place à 46 % du trou (un peu au-dessus du milieu)


# ---------------------------------------------------------------- outils
def _mur(a):
    """Les points du mur peint : rouge sombre, jusqu'à l'orangé de la lueur (ni crème, ni or, ni brun d'encre)."""
    R, G, B = a[..., 0], a[..., 1], a[..., 2]
    return (R > 70) & (R < 200) & (B < 48) & (G < 0.5 * R) & (R - G > 40)


def _mur_lisse(a, mur, sigma=10):
    """La couleur du mur derrière un objet, de proche en proche : la moyenne des points du mur voisins, à plusieurs
    échelles (le bord de l'objet prend le mur juste à côté, son milieu un mur plus lointain)."""
    out = np.zeros_like(a)
    reste = np.ones(mur.shape, bool)
    for s in (sigma, 4 * sigma, 16 * sigma):
        w = ndi.gaussian_filter(mur.astype(np.float32), s)
        m = np.dstack([ndi.gaussian_filter(a[..., c] * mur, s) for c in range(3)]) / np.maximum(w, 1e-6)[..., None]
        prend = reste & (w > 0.02)
        out[prend] = m[prend]
        reste &= ~prend
    return out


def _decouper(a, mur, coeur_min=80, frange=2):
    """Détache de son mur un objet de l'image : alpha (0 à 1) et couleur. Le cœur de l'objet est tout point à plus de
    coeur_min du mur ; ses bords (frange points autour) sont démêlés du mur : alpha = la part de la couleur du cœur le
    plus proche dans le point, le reste étant le mur."""
    W = _mur_lisse(a, mur)
    d = np.linalg.norm(a - W, axis=2)
    coeur = d > coeur_min
    _, (iy, ix) = ndi.distance_transform_edt(~coeur, return_indices=True)
    C = a[iy, ix]
    v = C - W
    al = np.clip(((a - W) * v).sum(2) / np.maximum((v * v).sum(2), 1.0), 0, 1)
    al[coeur] = 1
    al[~ndi.binary_dilation(coeur, iterations=frange)] = 0
    coul = np.where(coeur[..., None], a, C)
    return al.astype(np.float32), coul.astype(np.float32), coeur


def _garder(al, coeur, pres=6, mini=30):
    """Garde la plus grande pièce de l'objet et ce qui en est à moins de pres points (les fleurs détachées d'un
    bouquet) ; les grains plus petits que mini points, loin d'elle, tombent."""
    lab, n = ndi.label(coeur, structure=np.ones((3, 3)))
    if n == 0:
        return al
    tailles = ndi.sum(coeur, lab, np.arange(1, n + 1))
    grand = lab == 1 + int(np.argmax(tailles))
    proche = ndi.binary_dilation(grand, iterations=pres)
    garde = np.zeros(n + 1, bool)
    for i in range(1, n + 1):
        garde[i] = tailles[i - 1] >= mini or (proche & (lab == i)).any()
    zone = ndi.binary_dilation(garde[lab], iterations=3)
    return np.where(zone, al, 0).astype(np.float32)


def _reduire(al, coul, s):
    """Réduit (LANCZOS) un objet détaché, en couleur prémultipliée : le bord ne fonce ni ne pâlit."""
    h, w = al.shape
    W, H = max(1, int(round(w * s))), max(1, int(round(h * s)))
    pre = np.dstack([coul * al[..., None], al * 255]).astype(np.float32)
    ch = [np.asarray(Image.fromarray(pre[..., c]).resize((W, H), Image.LANCZOS), np.float32) for c in range(4)]
    A = np.clip(ch[3] / 255, 0, 1)
    C = np.dstack(ch[:3]) / np.maximum(A[..., None], 1e-4)
    return A, np.clip(C, 0, 255)


def _poser(can, A, coul, x, y):
    """Pose A (alpha) de couleur coul (image RVB de la taille de A) au coin x, y du fond."""
    h, w = A.shape
    H, W = can.shape[:2]
    a0, b0, a1, b1 = max(0, -y), max(0, -x), min(h, H - y), min(w, W - x)
    if a1 <= a0 or b1 <= b0:
        return
    z = can[y + a0:y + a1, x + b0:x + b1].astype(np.float32)
    al = A[a0:a1, b0:b1, None]
    c = coul[a0:a1, b0:b1]
    can[y + a0:y + a1, x + b0:x + b1] = np.clip(np.rint(z + al * (c - z)), 0, 255).astype(np.uint8)


def _occupe(rects, q, shape, marge):
    """Ce qui est écrit ou tracé, élargi de la marge (px du fond). Les blocs (le texte d'ouverture, le sommaire, les
    auteurs, la barre des tomes) comptent entiers : le sommaire et les auteurs ont des filets entre leurs lignes."""
    occ = np.zeros(shape, bool)
    for r in rects:
        if r[4] == -1:                    # les bandes des raccords du ciel : pas du texte
            continue
        a, b = max(0, int(r[1] * q - marge)), int(np.ceil(r[3] * q + marge))
        c, d = max(0, int(r[0] * q - marge)), int(np.ceil(r[2] * q + marge))
        occ[a:b, c:d] = True
    return occ


# ---------------------------------------------------------------- le mur du dos
def reparer_mur(can, xf, ppp):
    """Efface du mur reflété ce qui n'est pas des planches (le clou et le fil de fer du cadre, tout grain sombre ou
    clair) : un point qui s'écarte de plus de 9 niveaux de la médiane de sa colonne (sur 0,2 po de haut) est une
    tache ; la tache, élargie, est remplacée par la même colonne prise juste au-dessus ou au-dessous, fondue sur
    deux points. Rend le fond et le masque de ce qui a changé."""
    z = can[:, :xf].astype(np.float32)
    L = z @ LUM
    med = ndi.median_filter(L, size=(int(0.2 * ppp) | 1, 1))
    tache = np.abs(L - med) > 9
    lab, n = ndi.label(ndi.binary_dilation(tache, iterations=4))
    change = np.zeros(can.shape[:2], bool)
    for sl in ndi.find_objects(lab):
        y0, y1 = max(0, sl[0].start - 3), min(z.shape[0], sl[0].stop + 3)
        x0, x1 = max(0, sl[1].start - 3), min(xf, sl[1].stop + 3)
        h = y1 - y0
        src = y0 - h - 6 if y0 - h - 6 >= 0 else y1 + 6       # la même colonne, juste au-dessus (ou au-dessous)
        if src + h > z.shape[0]:
            continue
        m = np.zeros((h, x1 - x0), np.float32)
        m[3:-3, 3:-3] = 1
        m = ndi.gaussian_filter(m, 1.2)[..., None]
        z[y0:y1, x0:x1] = z[y0:y1, x0:x1] * (1 - m) + z[src:src + h, x0:x1] * m
        change[y0:y1, x0:x1] = True
    can[:, :xf] = np.clip(np.rint(z), 0, 255).astype(np.uint8)
    return can, change, n


# ---------------------------------------------------------------- les pièces de l'image
def _lampe(src):
    """La lampe, de la cheminée au pied : alpha et couleur à la résolution d'origine, et la colonne de la flamme.
    Au-dessus de la nappe, la lampe se détache du mur ; sur la nappe, on ne garde que son pied sombre, détaché du
    crème de la nappe par sa clarté."""
    x0, y0, x1, y1 = LAMPE
    a = src[y0:y1, x0:x1].astype(np.float32)
    mur = _mur(a)
    al, coul, coeur = _decouper(a, mur)
    n = NAPPE - y0
    al[n:] = 0
    al = _garder(al, coeur & (np.arange(a.shape[0])[:, None] < n))
    # le pied, sur la nappe : sombre sur crème
    L = a @ LUM
    pied = np.zeros_like(al)
    p = (L < 120)
    p[:n - 30] = False
    p[PIED - y0:] = False
    lab, k = ndi.label(p)
    if k:
        ids = np.unique(lab[n - 30:n][p[n - 30:n]])
        p = np.isin(lab, ids[ids > 0])
    sombre = np.median(a[p & (L < 70)], axis=0)
    a_pied = np.clip((235.0 - L) / (235.0 - float(sombre @ LUM)), 0, 1)
    pied[n - 30:PIED - y0] = np.where(ndi.binary_dilation(p, iterations=1), a_pied, 0)[n - 30:PIED - y0]
    pied[:n] = 0
    al = np.maximum(al, pied)
    coul[n:] = np.where(pied[n:, :, None] > 0, sombre, coul[n:])
    ys, xs = np.nonzero(al > 0.02)
    sl = (slice(ys.min(), ys.max() + 1), slice(xs.min(), xs.max() + 1))
    return al[sl], coul[sl], x0 + xs.min(), y0 + ys.min()


def _planche(src, larg):
    """Un bout de la planche du bas de la table du devant, larg points de large (image d'origine), coupé droit aux
    deux bouts : le dessus clair, la face sombre et ses filets. Ses rangées du haut et du bas sont démêlées du mur."""
    x0, y0, y1 = PLANCHE
    a = src[y0 - 2:y1 + 2, x0:x0 + larg].astype(np.float32)
    mur = np.median(src[y0 - 30:y0 - 8, x0:x0 + larg].reshape(-1, 3), axis=0)
    bord = np.median(src[y0 + 1:y0 + 3, x0:x0 + larg].reshape(-1, 3), axis=0)     # le filet sombre du haut
    al = np.ones(a.shape[:2], np.float32)
    for r in (0, 1, 2, a.shape[0] - 3, a.shape[0] - 2, a.shape[0] - 1):
        v = bord - mur
        al[r] = np.clip(((a[r] - mur) * v).sum(1) / max(float((v * v).sum()), 1.0), 0, 1)
    coul = np.where(al[..., None] < 1, bord, a)
    return al, coul.astype(np.float32)


def _bouquets(src):
    """La ficelle aux trois bouquets et ses deux crochets, détachés du mur."""
    x0, y0, x1, y1 = BOUQUETS
    a = src[y0:y1, x0:x1].astype(np.float32)
    al, coul, coeur = _decouper(a, _mur(a), coeur_min=60, frange=2)
    al = _garder(al, coeur, pres=8, mini=12)
    ys, xs = np.nonzero(al > 0.02)
    sl = (slice(0, ys.max() + 1), slice(xs.min(), xs.max() + 1))
    return al[sl], coul[sl]


def _lueur(can, cx, cy, s, x_g, x_d, ppp):
    """La lueur de la lampe sur le mur, centrée sur la flamme (cx, cy, px du fond) : la gaussienne mesurée au devant, à
    l'échelle s, resserrée en largeur (LUEUR_X) et éteinte à ESPACE_PLI des deux plis (x_g, x_d). Elle multiplie la
    couleur du mur. Rend le masque de ce qu'elle change."""
    H = can.shape[0]
    ry = int(3.2 * max(LUEUR['sy']) * s)
    a, b = max(0, cy - ry), min(H, cy + ry)
    xs = np.arange(x_g, x_d, dtype=np.float32)
    ys = np.arange(a, b, dtype=np.float32)
    e = ESPACE_PLI * ppp
    fen = np.clip(np.minimum(xs - x_g - e, x_d - e - xs) / (0.18 * ppp), 0, 1)
    fen = fen * fen * (3 - 2 * fen)                           # s'éteint en douceur avant chaque pli
    z = can[a:b, x_g:x_d].astype(np.float32)
    for c in range(3):
        sx, sy = LUEUR['sx'][c] * s * LUEUR_X, LUEUR['sy'][c] * s
        g = np.exp(-((xs[None, :] - cx) ** 2 / (2 * sx * sx) + (ys[:, None] - cy) ** 2 / (2 * sy * sy)))
        z[..., c] *= 1 + LUEUR['amp'][c] * g * fen[None, :]
    can[a:b, x_g:x_d] = np.clip(np.rint(z), 0, 255).astype(np.uint8)
    m = np.zeros(can.shape[:2], bool)
    m[a:b, x_g:x_d] = True
    return m


# ---------------------------------------------------------------- le motif
def motif(can, info):
    ppp, xf, xt = info['ppp'], info['xf'], info['xt']
    H = can.shape[0]
    q = ppp / 96.0                        # px du fond par px CSS
    src = np.asarray(info['image'].convert('RGB'))
    occ = _occupe(info['rects'], q, can.shape[:2], MARGE * ppp)

    can, repare, n = reparer_mur(can, xf, ppp)
    avant = can.copy()

    # le trou de la tranche : les rangées où rien n'est écrit entre les plis, la plus longue suite
    libre = ~occ[:, xt:xf].any(1)
    libre[:int(0.125 * ppp + 0.25 * ppp)] = False
    libre[H - int(0.125 * ppp + 0.25 * ppp):] = False
    lab, k = ndi.label(libre)
    if not k:
        print('    dos 2 : pas de trou sur la tranche, rien au dos')
        return can
    t = max(ndi.find_objects(lab), key=lambda s_: s_[0].stop - s_[0].start)[0]
    ga, gb = t.start, t.stop

    # les pièces, à la résolution d'origine
    la, lc, lx0, ly0 = _lampe(src)
    deb = int(round(DEBORD * la.shape[1]))
    pa, pc = _planche(src, la.shape[1] + 2 * deb)
    ba, bc_ = _bouquets(src)

    # l'échelle : la tablette aussi large que la tranche le permet, à PLI de chaque pli
    x_g, x_d = xt + int(round(PLI * ppp)), xf - int(round(PLI * ppp))
    s = min(1.0, (x_d - x_g) / pa.shape[1])
    LA, LC = _reduire(la, lc, s)
    PA, PC = _reduire(pa, pc, s)
    BA, BC = _reduire(ba, bc_, min(1.0, s * BOUQUETS_X))

    # le groupe, de haut en bas : la lampe, son pied posé au milieu du dessus de la tablette, puis les bouquets sous la
    # tablette (comme sous la table du devant)
    pose = int(round((DESSUS - (PLANCHE[1] - 2)) * s))       # du haut de la tablette au point où pose le pied
    h_lampe = LA.shape[0]
    y_tab = h_lampe - pose
    y_bq = y_tab + PA.shape[0]
    h = y_bq + BA.shape[0]
    if h > gb - ga:
        print('    dos 2 : trou trop bas pour le groupe (%.2f po), rien au dos' % ((gb - ga) / ppp))
        return can
    y0 = int(round(ga + HAUT * (gb - ga - h)))
    cx = (xt + xf) // 2

    # la lueur, centrée sur la flamme
    fx = int(round(cx - LA.shape[1] / 2 + (LUEUR['cx'] - lx0) * s))
    fy = int(round(y0 + (LUEUR['cy'] - ly0) * s))
    lueur = _lueur(can, fx, fy, s, xt, xf, ppp)

    _poser(can, PA, PC, cx - PA.shape[1] // 2, y0 + y_tab)
    _poser(can, BA, BC, cx - BA.shape[1] // 2, y0 + y_bq)
    _poser(can, LA, LC, cx - LA.shape[1] // 2, y0)

    # contrôle : rien sur le devant ni sur la quatrième, rien dans la marge du texte (hors des taches effacées du mur)
    chg = (can != avant).any(2)
    if chg[:, xf:].any() or chg[:, :xt].any() or (chg & occ).any():
        print('    dos 2 : ATTENTION, le motif touche le devant, la quatrième ou la marge du texte')
    ys_, xs_ = np.nonzero(chg)
    print('    dos 2 : %d tache(s) du mur effacée(s) ; groupe de %.2f à %.2f po du haut (trou, marges ôtées : %.2f à '
          '%.2f po), %.2f po de large ; lampe de %.2f × %.2f po ; échelle %.3f de l\'image' % (
              n, (y0) / ppp, (y0 + h) / ppp, ga / ppp, gb / ppp, PA.shape[1] / ppp, LA.shape[1] / ppp,
              LA.shape[0] / ppp, s))
    return can
