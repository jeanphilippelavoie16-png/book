# -*- coding: utf-8 -*-
"""Le dos de la couverture du tome 2 (Le corps) : l'image du devant revient au dos, au style du dos du tome 3 (JP,
19 octobre 2026, devant la couverture du tome 3 : « ça, j'aime ça, le style » ; avant : « mets-en dans les trous sur la
page en arrière, faut juste pas que ça touche au texte »).

Appelé par motif_dos() de images/tomes/essais-ia/tome-1/couverture.py :

    python3 images/tomes/essais-ia/tome-1/couverture.py --tome 2 --variantes C --sortie DOSSIER

Le fond du dos est le mur du devant, en planches verticales peintes (texture_mur.py), reflété. Deux trous, deux
groupes, découpés dans l'image du devant elle-même (images/tomes/titre-tome-2.jpg), à ses encres, rien de redessiné :

  la tranche, entre le titre et « Le Manuel du Nord » (le grand trou) :
  - la lampe à huile allumée, de la cheminée au pied, debout sur une tablette ;
  - la tablette : un bout de la planche du bas de la table du devant (son dessus clair, sa face sombre et ses filets),
    aussi large que la tranche le permet ;
  - la ficelle aux trois bouquets d'herbes qui sèchent la tête en bas, avec ses deux crochets, pendue sous la tablette
    comme elle pend sous la table du devant ;
  - la lueur de la lampe sur le mur : celle du devant, mesurée sur l'image (une tache ronde, centrée sur la flamme),
    à la même force, resserrée en largeur pour s'éteindre avant les plis (rien ne passe sur la quatrième ni sur le
    devant). Elle éclaire les planches sans les effacer : elle multiplie la couleur du mur, comme sur le devant.

  la quatrième, sous le texte d'ouverture, à droite du titre « Dans ce tome » et au-dessus de son filet (le seul trou
  de la quatrième où une pièce de l'image se lit : les onze lignes du sommaire ne laissent, entre lui et « Les
  auteurs », qu'un quart de pouce) :
  - la corde de bois rangée sous le poêle, ses bûches de bout (les cernes, le bouleau), calée à droite sur le bout des
    filets, posée au bas du trou. Les bûches que le pied du poêle et le bord de l'image coupaient partent (BOIS_OTES) :
    la corde finit sur des bûches entières.

Tout est réduit depuis l'image d'origine, rien n'est agrandi.

Le miroir du mur porte aussi le clou et le haut du fil de fer du cadre du devant (la dernière rangée reflétée passe
juste sous eux) : deux petits points sombres, en miroir l'un de l'autre, tombaient au dos juste après « Le scorbut et
l'arbre de vie » dans le sommaire. On les efface ici, et toute autre tache que le miroir aurait laissée : chaque point
du dos qui s'écarte de sa colonne de planche est remplacé par la même colonne prise juste au-dessus (les planches sont
verticales : le fil du bois continue).

Rien ne touche le texte : chaque ligne, chaque filet, les photos et la barre des tomes, élargis de MARGE, sont
interdits (_occupe), et on vérifie à la fin qu'aucun point changé, hors des taches effacées du mur, n'y entre.
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
BOIS = (2346, 3405, 3072, 3566)           # la corde de bois sous le poêle, du pied gauche du poêle au bord de l'image,
                                          # du dessous du poêle au plancher
BOIS_OTES = ((2378, 3485), (2359, 3503), (2441, 3457), (2426, 3465), (2419, 3471), (2414, 3479), (2463, 3488),
             (3039, 3532), (2982, 3519), (3034, 3479), (3026, 3486), (2976, 3474), (2923, 3453))
                                          # un point dans chaque morceau de bûche coupé par le pied du poêle (à gauche)
                                          # ou par le bord de l'image (à droite), et dans les bouts de bûche qu'ils
                                          # cachaient à moitié : ils partent, et la corde finit sur des bûches entières
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
BOIS_H = (0.25, 0.34)                     # po : la hauteur de la corde de bois au dos, au moins et au plus
BOIS_L = 0.9                              # po : la largeur libre qu'il lui faut au moins


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
    """Ce qui est écrit ou tracé, élargi de la marge (px du fond) : chaque ligne de texte ; le filet sous chaque titre
    de la quatrième (« Dans ce tome », « Les auteurs »), sur toute sa largeur ; sous ce titre, le bloc entier (le
    sommaire et les auteurs ont des filets entre leurs lignes) ; les photos, la barre des tomes, l'en-tête et le filet
    de la tranche, entiers. À droite d'un titre et au-dessus de son filet, rien n'est écrit : c'est un trou. Le texte
    d'ouverture compte par ses lignes seulement."""
    occ = np.zeros(shape, bool)

    def boite(x0, y0, x1, y1):
        a, b = max(0, int(y0 * q - marge)), int(np.ceil(y1 * q + marge))
        c, d = max(0, int(x0 * q - marge)), int(np.ceil(x1 * q + marge))
        occ[a:b, c:d] = True

    lignes = [r for r in rects if r[4] > 0]
    blocs = [r for r in rects if r[4] == 0]

    def dedans(b):
        return [t for t in lignes if t[0] >= b[0] - 3 and t[2] <= b[2] + 3 and t[1] >= b[1] - 3 and t[3] <= b[3] + 3]

    # un titre : un bloc bas et large dont le texte est à gauche seulement (l'en-tête, avec un texte à chaque bout, est
    # un bloc plein)
    titres = [b for b in blocs if dedans(b) and b[3] - b[1] < 0.4 * 96 and b[2] - b[0] > 1.5 * 96 and
              max(t[2] for t in dedans(b)) < b[0] + 0.6 * (b[2] - b[0])]
    for r in lignes:
        boite(*r[:4])
    for b in blocs:
        x0, y0, x1, y1 = b[:4]
        d = dedans(b)
        if b in titres:                   # un titre : ses lignes (déjà comptées) et son filet, 1,25 pt sous lui
            boite(x0, y1 - 2.5, x1, y1)
            continue
        if len(d) >= 2 and all(abs(t[4] - 17.33) < 0.1 for t in d):
            continue                      # le texte d'ouverture : ses lignes suffisent
        for t in titres:                  # un bloc qui commence par un titre : il commence sous le filet du titre
            if t is not b and abs(t[1] - y0) < 1 and t[0] >= x0 - 1 and t[2] <= x1 + 1:
                y0 = t[3]
        boite(x0, y0, x1, y1)
    return occ


# ---------------------------------------------------------------- le mur du dos
def reparer_mur(can, xf, ppp):
    """Efface du mur reflété ce qui n'est pas des planches : le clou et le fil de fer du cadre, tout grain sombre ou
    clair (un point qui s'écarte de plus de 9 niveaux de la médiane de sa colonne, sur 0,2 po de haut), et les petites
    plaques à peine plus claires, lisses, sans le grain du bois, que l'image du devant porte çà et là sur son mur et que
    le miroir répète (une plaque claire et floue se voyait au bout du filet du ch. 36). Chaque tache, élargie, est
    remplacée par la même colonne prise juste au-dessus (ou au-dessous), fondue sur deux points. Rend le fond et le
    nombre de taches."""
    z = can[:, :xf].astype(np.float32)
    L = z @ LUM
    med = ndi.median_filter(L, size=(int(0.2 * ppp) | 1, 1))
    tache = np.abs(L - med) > 9
    # une plaque à peine plus claire ou plus sombre que sa planche, sur 0,6 po de haut
    # (son cœur passe 2,2 niveaux sur plus de 60 points ; elle s'étend tant qu'elle passe 1 niveau)
    Ls = ndi.gaussian_filter(L, 3)
    d = np.abs(Ls - ndi.median_filter(Ls, size=(int(0.6 * ppp) | 1, 1)))
    lab, n = ndi.label(d > 2.2)
    if n:
        coeur = np.isin(lab, 1 + np.flatnonzero(ndi.sum(d > 2.2, lab, np.arange(1, n + 1)) > 60))
        lab, n = ndi.label(d > 1.0)
        ids = np.unique(lab[coeur])
        tache |= np.isin(lab, ids[ids > 0])
    grain = ndi.gaussian_filter(np.abs(L - ndi.gaussian_filter(L, 1.0)), 3)
    lisse = grain < 0.35 * float(np.median(grain))
    lab, n = ndi.label(lisse)
    if n:
        tache |= np.isin(lab, 1 + np.flatnonzero(ndi.sum(lisse, lab, np.arange(1, n + 1)) > 30))
    lab, n = ndi.label(ndi.binary_dilation(tache, iterations=4))
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
    # la couture du miroir : la rangée du haut de l'image, plus sombre, revient en miroir en une ligne fine sur toute la
    # largeur du dos (sous le filet de « Les auteurs ») ; une rangée qui s'écarte de ses voisines est refaite avec les
    # rangées juste au-dessus (ou au-dessous)
    r = np.median(z @ LUM, axis=1)
    ligne = np.abs(r - ndi.median_filter(r, size=31)) > 0.8
    lab, k = ndi.label(ndi.binary_dilation(ligne, iterations=2))
    for sl in ndi.find_objects(lab):
        y0, y1 = sl[0].start, sl[0].stop
        h = y1 - y0
        src = y0 - h - 4 if y0 - h - 4 >= 0 else y1 + 4
        m = np.ones(h, np.float32)
        m[0] = m[-1] = 0.5
        m = m[:, None, None]
        z[y0:y1] = z[y0:y1] * (1 - m) + z[src:src + h] * m
    n += k
    can[:, :xf] = np.clip(np.rint(z), 0, 255).astype(np.uint8)
    return can, n


# ---------------------------------------------------------------- les pièces de l'image
def _lampe(src):
    """La lampe, de la cheminée au pied : alpha et couleur à la résolution d'origine, et son coin dans l'image.
    Au-dessus de la nappe, la lampe est tout ce qui n'est pas le mur (le pied sombre comme le verre crème), et son bord
    est démêlé du mur ; sur la nappe, on ne garde que le bas du pied, sombre sur le crème, entre les deux bouts du pied
    mesurés juste au-dessus (le trait sombre du bord de la nappe, à côté du pied, n'est pas à la lampe)."""
    x0, y0, x1, y1 = LAMPE
    a = src[y0:y1, x0:x1].astype(np.float32)
    L = a @ LUM
    mur = _mur(a)
    n = NAPPE - y0
    coeur = ~mur
    coeur[n:] = False
    coeur = ndi.binary_opening(coeur, iterations=1)
    lab, k = ndi.label(coeur)
    coeur = ndi.binary_fill_holes(lab == 1 + int(np.argmax(ndi.sum(coeur, lab, np.arange(1, k + 1)))))
    # le bord, au-dessus de la nappe : démêlé du mur
    W = _mur_lisse(a, mur & ~ndi.binary_dilation(coeur, iterations=1))
    _, (iy, ix) = ndi.distance_transform_edt(~coeur, return_indices=True)
    C = a[iy, ix]
    v = C - W
    al = np.clip(((a - W) * v).sum(2) / np.maximum((v * v).sum(2), 1.0), 0, 1)
    al[coeur] = 1
    al[~ndi.binary_dilation(coeur, iterations=2)] = 0
    coul = np.where(coeur[..., None], a, C)
    # le bas du pied, sur la nappe : sombre sur crème
    xs = np.nonzero(coeur[n - 4:n].any(0))[0]
    pied = L < 120
    pied[:n] = False
    pied[PIED - y0:] = False
    pied[:, :xs.min()] = False
    pied[:, xs.max() + 1:] = False
    sombre = np.median(a[pied & (L < 70)], axis=0)
    a_pied = np.clip((235.0 - L) / (235.0 - float(sombre @ LUM)), 0, 1)
    zone = ndi.binary_dilation(pied, iterations=1)
    zone[:n] = False
    zone[:, :xs.min()] = False
    zone[:, xs.max() + 1:] = False
    al[n:] = np.where(zone, a_pied, 0)[n:]
    coul[n:] = np.where(pied[..., None], a, sombre)[n:]
    ys, xs = np.nonzero(al > 0.02)
    sl = (slice(ys.min(), ys.max() + 1), slice(xs.min(), xs.max() + 1))
    return al[sl].astype(np.float32), coul[sl].astype(np.float32), x0 + xs.min(), y0 + ys.min()


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


def _bois(src):
    """La corde de bois sous le poêle, détachée du mur : le mur est ce qui touche le haut de la découpe sans passer un
    trait sombre (le contour de la corde est fermé) ; les morceaux de BOIS_OTES partent avec leurs traits, et il reste
    la plus grande corde d'un seul tenant. Le dessous est droit : la corde est posée sur le plancher. Le bord de la
    corde est démêlé du mur sur un point, entre le mur et le brun des contours."""
    x0, y0, x1, y1 = BOIS
    a = src[y0:y1, x0:x1].astype(np.float32)
    L = a @ LUM
    R, G, B = a[..., 0], a[..., 1], a[..., 2]
    murc = (R > 80) & (R < 125) & (G < 40) & (B < 38)
    lab, n = ndi.label(murc)
    haut = np.unique(lab[:6][murc[:6]])
    mur = np.isin(lab, haut[haut > 0])
    corde = ndi.binary_opening(~mur, iterations=1)
    sombre = L < 62
    pieces, n = ndi.label(corde & ~sombre)
    otes = [pieces[y - y0, x - x0] for x, y in BOIS_OTES]
    garde = (pieces > 0) & ~np.isin(pieces, [o for o in otes if o > 0])
    lg, ng = ndi.label(garde)
    t = ndi.sum(garde, lg, np.arange(1, ng + 1))
    garde = np.isin(lg, 1 + np.flatnonzero(t > 40))
    m = ndi.binary_fill_holes(garde | (sombre & corde & ndi.binary_dilation(garde, iterations=4)))
    m = ndi.binary_opening(m, iterations=1)
    lm, nm = ndi.label(m)
    m = lm == 1 + int(np.argmax(ndi.sum(m, lm, np.arange(1, nm + 1))))
    # le bord : entre le mur (sa couleur médiane) et le brun des contours
    W = np.median(a[mur].reshape(-1, 3), axis=0)
    Dk = np.median(a[sombre & m].reshape(-1, 3), axis=0)
    bord = m & ~ndi.binary_erosion(m)
    v = Dk - W
    al = m.astype(np.float32)
    al[bord] = np.clip(((a[bord] - W) * v).sum(1) / float((v * v).sum()), 0.35, 1)
    coul = np.where(bord[..., None], Dk, a)
    ys, xs = np.nonzero(m)
    sl = (slice(ys.min(), ys.max() + 1), slice(xs.min(), xs.max() + 1))
    return al[sl], coul[sl].astype(np.float32)


def _trou_quatrieme(occ, xt, ppp, h_min, l_min, bord=0.375, x_max=None, y_max=None):
    """Le plus haut rectangle libre de la quatrième d'au moins h_min de haut et l_min de large (px du fond), loin des
    bords du rognage et du pli (bord : po du bord du fond jusqu'à la zone sûre, info['bord']), à gauche de x_max (px du
    fond : le bout des filets, où la corde se cale) et au-dessus de y_max (le bas du texte) : (x0, y0, x1, y1), ou None.
    On cherche sur une grille au centième de pouce. Sur la couverture Lulu, sans ces deux bornes, le plus haut trou
    était à droite du texte d'ouverture (le bloc de texte y est plus large que le texte) ou sous la barre des tomes (la
    zone du code-barres), deux places où la corde ne se pose sur aucun filet."""
    r = 100
    k = ppp / r
    H, W = int(occ.shape[0] / k), int(xt / k)
    ys, xs = (np.arange(H + 1) * k).astype(int), (np.arange(W + 1) * k).astype(int)
    g = ~np.logical_or.reduceat(np.logical_or.reduceat(occ[:ys[-1], :xs[-1]], ys[:-1], 0), xs[:-1], 1)
    # une case est libre si aucun de ses points n'est pris
    m = int(bord * r)
    g[:m], g[-m:], g[:, :m] = False, False, False
    g[:, W - int(0.15 * r):] = False
    if x_max is not None:
        g[:, int(np.ceil(x_max / k)):] = False     # la case du bout des filets reste : la corde s'y cale au px près
    if y_max is not None:
        g[int(y_max / k):] = False
    meilleur, h = None, np.zeros(W, int)
    for y in range(H):
        h = np.where(g[y], h + 1, 0)
        pile = []
        for x in range(W + 1):
            v = h[x] if x < W else 0
            debut = x
            while pile and pile[-1][1] >= v:
                debut, hv = pile.pop()
                if hv >= h_min / k and x - debut >= l_min / k:
                    cle = (hv, x - debut)
                    if meilleur is None or cle > meilleur[0]:
                        meilleur = (cle, (debut, y + 1 - hv, x, y + 1))
            if v and (not pile or pile[-1][1] < v):
                pile.append((debut, v))
    if meilleur is None:
        return None
    x0, y0, x1, y1 = meilleur[1]
    return int(np.ceil(x0 * k)), int(np.ceil(y0 * k)), int(x1 * k), int(y1 * k)


def _lueur(can, cx, cy, s, x_g, x_d, ppp):
    """La lueur de la lampe sur le mur, centrée sur la flamme (cx, cy, px du fond) : la gaussienne mesurée au devant, à
    l'échelle s, resserrée en largeur (LUEUR_X) et éteinte à ESPACE_PLI des deux plis (x_g, x_d). Elle multiplie la
    couleur du mur."""
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


# ---------------------------------------------------------------- le motif
def motif(can, info):
    ppp, xf, xt = info['ppp'], info['xf'], info['xt']
    H = can.shape[0]
    q = ppp / 96.0                        # px du fond par px CSS
    src = np.asarray(info['image'].convert('RGB'))
    occ = _occupe(info['rects'], q, can.shape[:2], MARGE * ppp)

    can, n = reparer_mur(can, xf, ppp)
    avant = can.copy()

    # le trou de la tranche : les rangées où rien n'est écrit entre les plis, la plus longue suite
    libre = ~occ[:, xt:xf].any(1)
    bord = info.get('bord', 0.375)        # po du bord du fond jusqu'à la zone sûre (Blurb 0,375 ; Lulu 1,25)
    libre[:int(bord * ppp)] = False
    libre[H - int(bord * ppp):] = False
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

    # le groupe, de haut en bas : la lampe, son pied posé au fond du dessus clair de la tablette, puis les bouquets sous
    # la tablette (comme sous la table du devant)
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
    _lueur(can, fx, fy, s, xt, xf, ppp)

    _poser(can, PA, PC, cx - PA.shape[1] // 2, y0 + y_tab)
    _poser(can, BA, BC, cx - BA.shape[1] // 2, y0 + y_bq)
    _poser(can, LA, LC, cx - LA.shape[1] // 2, y0)

    # la corde de bois, dans le plus haut trou de la quatrième (à droite du titre du sommaire, sous le texte
    # d'ouverture) : posée au bas du trou, au-dessus du filet du titre, et calée à droite sur le bout des filets
    bois = ''
    posee = []
    droite = int(max(r[2] for r in info['rects'] if r[4] == 0 and r[2] * q < xt) * q)    # le bout des filets
    bas_texte = int(max(r[3] for r in info['rects'] if r[4] >= 0 and r[0] * q < xt) * q)    # le bas de la barre des tomes
    trou = _trou_quatrieme(occ, xt, ppp, BOIS_H[0] * ppp, BOIS_L * ppp, bord, droite, bas_texte)
    if trou:
        qx0, qy0, qx1, qy1 = trou
        oa, oc = _bois(src)
        f_long = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'objet-corde-dos.png')
        if os.path.exists(f_long):        # la corde longue (objets-bas/corde_dos.py) : JP, « plus de bois, pas plus
            lo = np.asarray(Image.open(f_long).convert('RGBA')).astype(np.float32)   # haut, sur une plus grande largeur »
            oa, oc = lo[..., 3] / 255.0, lo[..., :3]
        hb = BOIS_H[1] * ppp
        sb = min(1.0, hb / oa.shape[0], (qx1 - qx0) / oa.shape[1])
        OA, OC = _reduire(oa, oc, sb)
        bx = min(qx1, droite) - OA.shape[1]
        if bx >= qx0:
            # posée SUR le filet du titre « Dans ce tome » : son dessous est coupé droit, il touche la ligne (JP, 19 octobre
            # 2026 : « le bois, colle-le sur la ligne parce qu'il est coupé ; si le bois du bas touche à la ligne, c'est
            # correct »). Le filet est le bas du bloc du titre, 1,25 pt de haut (voir _occupe).
            sous = [r for r in info['rects'] if r[4] == 0 and r[0] * q <= bx and r[2] * q >= bx + OA.shape[1]
                    and r[3] * q >= qy1]
            by = qy1 - OA.shape[0]
            if sous:
                filet = int(round((min(r[3] for r in sous) - 1.67) * q))   # le haut du filet
                by = filet - OA.shape[0] + 1
            _poser(can, OA, OC, bx, by)
            posee.append((bx, by, bx + OA.shape[1], by + OA.shape[0]))
            bois = ' ; corde de bois de %.2f × %.2f po, de %.2f à %.2f po du bord perdu, à %.2f po du haut, sur le filet' % (
                OA.shape[1] / ppp, OA.shape[0] / ppp, bx / ppp, (bx + OA.shape[1]) / ppp, by / ppp)

    # contrôle : rien sur le devant, rien dans la marge du texte (hors des taches effacées du mur)
    chg = (can != avant).any(2)
    for x0_, y0_, x1_, y1_ in posee:      # la corde touche le filet exprès : sa marge ne compte pas
        chg[y0_:y1_, x0_:x1_] = False
    if chg[:, xf:].any() or (chg & occ).any():
        print('    dos 2 : ATTENTION, le motif touche le devant ou la marge du texte')
    print('    dos 2 : %d tache(s) du mur effacée(s) ; groupe de %.2f à %.2f po du haut (trou, marges ôtées : %.2f à '
          '%.2f po), %.2f po de large ; lampe de %.2f × %.2f po ; échelle %.3f de l\'image' % (
              n, (y0) / ppp, (y0 + h) / ppp, ga / ppp, gb / ppp, PA.shape[1] / ppp, LA.shape[1] / ppp,
              LA.shape[0] / ppp, s) + bois)
    return can
