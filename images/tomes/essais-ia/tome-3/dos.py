# -*- coding: utf-8 -*-
"""Le dos de la couverture du tome 3 (Prélever) : l'image du devant revient dans les trous de la quatrième et de la
tranche (JP, 19 octobre 2026 : « j'aime que pour le tome 1 on retrouve des éléments de la couverture en arrière, fais-le
pour les autres » ; « mets-en dans les trous sur la page en arrière, faut juste pas que ça touche au texte »).

Appelé par motif_dos() de images/tomes/essais-ia/tome-1/couverture.py :

    python3 images/tomes/essais-ia/tome-1/couverture.py --tome 3 --variantes C --sortie DOSSIER

Ce qui revient au dos, découpé dans l'image du devant elle-même (images/tomes/titre-tome-3.jpg), rien de redessiné :
  - les entailles crème du ciel, dans le trou entre le sommaire et les auteurs : quatre des longues lignes de gouge
    qui annoncent l'horizon sur le devant (la ligne cassée du haut, puis trois lignes pleines), à la même échelle que
    le devant à 7 % près, en miroir comme le ciel. Elles partent du bord perdu, passent le pli et finissent en pointe
    sur la tranche, chacune à sa place, à plus de 0,27 po du devant ;
  - le soleil orange, qui se couche sur la dernière entaille : sa place est celle du devant, vue en miroir au pli du
    devant ; les entailles du haut passent derrière lui, la dernière devant (c'est l'horizon).
Le ciel du devant est vide au-dessus des entailles : le dos l'est aussi (le texte d'ouverture, la tranche au-dessus de
la bande).

Rien ne touche le texte : on cherche le trou dans les boîtes mesurées par Chromium (info['rects']), élargies de MARGE,
et on vérifie à la fin qu'aucun pixel changé n'y entre.
"""
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

LUM = np.array([.2126, .7152, .0722], np.float32)

# Dans l'image d'origine (3072 × 3840 px) :
BANDE = (1690, 2018)                     # les lignes de l'image où les entailles crème coupent le ciel vert
ENTAILLES = {'l1': (1704, 1726),         # la ligne cassée du haut (quatre bouts)
             'l4': (1860, 1878),         # puis trois lignes pleines, ondulées
             'l5': (1902, 1916),
             'l6': (1943, 1957)}         # (centre de chaque entaille entre a et b)
SOLEIL = (2040, 2252, 1790, 2400)         # y0, y1 (coupé à plat juste au-dessus des collines), x0, x1

MARGE = 0.13                              # po, autour de tout ce qui est écrit ou tracé
ECHELLE = 0.855                           # l'image en largeur couvre la quatrième et la tranche (0,80 au devant)
PAS = 38                                  # écart entre deux entailles, px de l'image d'origine
DEVANT = 0.27                             # po : les entailles finissent au moins à cette distance du devant
POINTES = (0.0, 0.16, 0.07, 0.24)         # po : le retrait de la pointe de chaque entaille, pour qu'elles ne
                                          # finissent pas en colonne


# ---------------------------------------------------------------- les pièces de l'image
def _entailles(src):
    """Chaque entaille seule, à la résolution d'origine : {nom: alpha (rogné à sa hauteur, pleine largeur)}, et la
    couleur crème des entailles."""
    y0, y1 = BANDE
    a = src[y0:y1].astype(np.float32)
    L = a @ LUM
    alpha = np.clip((L - 50.0) / (240.0 - 50.0), 0, 1)       # 50 : le vert du ciel ; 240 : la crème
    creme = np.median(a[L > 200], axis=0)
    coeur = alpha > 0.3
    lab, n = ndi.label(coeur, structure=np.ones((3, 3)))
    dist, (iy, ix) = ndi.distance_transform_edt(lab == 0, return_indices=True)
    proche = lab[iy, ix]                  # le bord adouci de chaque entaille lui revient
    proche[dist > 4] = 0
    cy = ndi.mean(np.indices(lab.shape)[0] + y0, lab, index=np.arange(1, n + 1))
    taille = ndi.sum(coeur, lab, index=np.arange(1, n + 1))
    out = {}
    for nom, (a_, b_) in ENTAILLES.items():
        ids = [i + 1 for i in range(n) if a_ <= cy[i] <= b_ and taille[i] > 40]
        A = np.where(np.isin(proche, ids), alpha, 0).astype(np.float32)
        ys = np.nonzero(A.max(1) > 0)[0]
        out[nom] = A[ys.min():ys.max() + 1]
    return out, creme


def _soleil(src):
    """Le soleil de l'image, coupé à plat au-dessus des collines : alpha et couleur (les pixels de l'image au cœur,
    l'orange médian sur le bord adouci), à la résolution d'origine, et sa colonne de gauche dans l'image."""
    y0, y1, x0, x1 = SOLEIL
    a = src[y0:y1, x0:x1].astype(np.float32)
    alpha = np.clip((a[..., 0] - a[..., 1] - 15.0) / 90.0, 0, 1)    # rouge moins vert : 105 dans l'orange
    lab, n = ndi.label(alpha > 0.5)
    i = 1 + int(np.argmax(ndi.sum(alpha > 0.5, lab, index=np.arange(1, n + 1))))
    alpha = np.where(ndi.binary_dilation(lab == i, iterations=3), alpha, 0)
    orange = np.median(a[alpha > 0.95], axis=0)
    coul = np.where((alpha > 0.95)[..., None], a, orange)
    ys, xs = np.nonzero(alpha > 0.5)
    sl = (slice(ys.min() - 2, None), slice(xs.min() - 2, xs.max() + 3))
    return alpha[sl], coul[sl], x0 + xs.min() - 2


def _effiler(A, fin, long_):
    """Finit l'entaille A (une seule ligne) en pointe à la colonne fin, comme la sortie d'un coup de gouge :
    l'épaisseur décroît jusqu'à rien sur long_ colonnes, autour de la ligne du centre."""
    yy = np.arange(A.shape[0], dtype=np.float32)
    out = A.copy()
    out[:, int(fin):] = 0
    for c in range(max(0, int(fin - long_)), min(A.shape[1], int(fin))):
        col = A[:, c]
        m = col.sum()
        if m > 0:
            cy = (col * yy).sum() / m
            f = ((fin - c) / long_) ** 0.8
            out[:, c] = col * np.clip(f * m / 2 + 0.5 - np.abs(yy - cy), 0, 1)
    return out


# ---------------------------------------------------------------- outils
def _reduire(A, w, h):
    return np.asarray(Image.fromarray(np.clip(A * 255, 0, 255).astype(np.uint8)).resize((w, h), Image.LANCZOS),
                      np.float32) / 255


def _reduire_rvb(C, w, h):
    return np.asarray(Image.fromarray(np.clip(C, 0, 255).astype(np.uint8)).resize((w, h), Image.LANCZOS), np.float32)


def _poser(can, A, coul, x, y):
    """Pose A (alpha de 0 à 1) de couleur coul (un RVB, ou une image RVB de la taille de A) au coin x, y du fond."""
    h, w = A.shape
    H, W = can.shape[:2]
    a0, b0, a1, b1 = max(0, -y), max(0, -x), min(h, H - y), min(w, W - x)
    if a1 <= a0 or b1 <= b0:
        return
    z = can[y + a0:y + a1, x + b0:x + b1].astype(np.float32)
    al = A[a0:a1, b0:b1, None]
    c = coul[a0:a1, b0:b1] if np.ndim(coul) == 3 else np.asarray(coul, np.float32)[None, None, :]
    can[y + a0:y + a1, x + b0:x + b1] = np.clip(np.rint(z + al * (c - z)), 0, 255).astype(np.uint8)


def _occupe(rects, q, shape, marge):
    """Ce qui est écrit ou tracé, élargi de la marge (px du fond). Le bloc du texte d'ouverture (des lignes toutes en
    13 pt) compte par ses lignes seulement : à droite de sa dernière ligne, sa boîte est vide."""
    occ = np.zeros(shape, bool)
    lignes = [r for r in rects if r[4] > 0]
    for r in rects:
        if r[4] == -1:                    # les bandes des raccords du ciel : pas du texte
            continue
        if r[4] == 0:
            dedans = [t[4] for t in lignes if t[0] >= r[0] - 1 and t[2] <= r[2] + 1 and t[1] >= r[1] - 1 and
                      t[3] <= r[3] + 1]
            if len(dedans) >= 2 and all(abs(f - 17.33) < 0.1 for f in dedans):
                continue
        a, b = max(0, int(r[1] * q - marge)), int(np.ceil(r[3] * q + marge))
        c, d = max(0, int(r[0] * q - marge)), int(np.ceil(r[2] * q + marge))
        occ[a:b, c:d] = True
    return occ


def _sans_miettes(A, cote):
    """Retire de la couche les bouts plus courts que cote (px) : un éclat isolé se lit comme une étoile ou une puce."""
    lab, n = ndi.label(A > 0.05, structure=np.ones((3, 3)))
    if not n:
        return A
    garde = np.zeros(n + 1, bool)
    for i, sl in enumerate(ndi.find_objects(lab), 1):
        garde[i] = (sl[1].stop - sl[1].start) >= cote
    return np.where(garde[lab], A, 0).astype(np.float32)


# ---------------------------------------------------------------- la bande d'entailles
def _bande(lignes, noms, pas, s, x_fin, fins, miette):
    """Les entailles noms empilées à pas px (image d'origine), en miroir (le bord gauche de l'image va vers la
    tranche), réduites à l'échelle s et rognées à x_fin ; chacune finit en pointe à sa colonne de fins (px du fond),
    sans les éclats plus courts que miette (px du fond). Rend une couche alpha par entaille, toutes de la même taille."""
    iw = next(iter(lignes.values())).shape[1]
    hmax = max(lignes[n].shape[0] for n in noms)
    H0 = hmax + pas * (len(noms) - 1) + 4
    w, h = int(round(iw * s)), int(round(H0 * s))
    couches = []
    for k, nom in enumerate(noms):
        A = _effiler(lignes[nom][:, ::-1], fins[k] / s, 70)
        y = int(round(k * pas + hmax / 2 - A.shape[0] / 2))
        C = np.zeros((H0, iw), np.float32)
        C[y:y + A.shape[0]] = A
        couches.append(_sans_miettes(_reduire(C, w, h)[:, :x_fin], miette))
    return couches


def motif(can, info):
    ppp, xf, xt = info['ppp'], info['xf'], info['xt']
    H = can.shape[0]
    q = ppp / 96.0                       # px du fond par px CSS
    avant = can.copy()
    src = np.asarray(info['image'].convert('RGB'))
    iw = src.shape[1]
    occ = _occupe(info['rects'], q, can.shape[:2], MARGE * ppp)

    # le trou sous le sommaire : les rangées libres sur toute la largeur de la quatrième, entre deux blocs
    rangs = ~occ[:, :xt].any(1)
    pleins = np.nonzero(~rangs)[0]
    rangs[:max(int(0.3 * H), pleins.min())] = False
    rangs[pleins.max():] = False
    lab, n = ndi.label(rangs)
    if not n:
        return can
    t = max(ndi.find_objects(lab), key=lambda s_: s_[0].stop - s_[0].start)[0]
    ga, gb = t.start, t.stop

    lignes, creme = _entailles(src)
    noms = list(ENTAILLES)
    x_fin = xf - int(DEVANT * ppp)
    fins = [x_fin - int(d * ppp) for d in POINTES]
    pas = PAS
    while True:                           # un trou plus bas que la bande : les entailles se rapprochent un peu
        couches = _bande(lignes, noms, pas, ECHELLE, x_fin, fins, int(0.3 * ppp))
        tout = np.maximum.reduce(couches)
        ys = np.nonzero(tout.max(1) > 0.02)[0]
        if ys.max() - ys.min() + 1 <= gb - ga or pas <= 28:
            break
        pas -= 2
    if ys.max() - ys.min() + 1 > gb - ga:
        print('    dos 3 : trou trop bas pour la bande (%.2f po), rien au dos' % ((gb - ga) / ppp))
        return can
    couches = [c[ys.min():ys.max() + 1] for c in couches]
    hb = couches[0].shape[0]
    # le jeu e de la bande dans le trou se partage : la bande descend de e/2 sous le centre, le soleil monte à e/2 du
    # haut du trou ; il reste autant de vide au-dessus du soleil que sous la dernière entaille
    e = (gb - ga - hb) / 2
    y0 = int(round(ga + 1.5 * e))
    haut_soleil = ga + 0.5 * e
    haut, horizon = np.maximum.reduce(couches[:-1]), couches[-1]

    # la ligne du centre de l'horizon, colonne par colonne (px du fond)
    yy = np.arange(hb, dtype=np.float32)[:, None]
    m = horizon.sum(0)
    centre = np.where(m > 0.5, (horizon * yy).sum(0) / np.maximum(m, 1e-6), np.nan) + y0

    # le soleil : sa place au devant, en miroir au pli du devant
    sa, sc, sg = _soleil(src)
    cx_dev = xf + (sg + sa.shape[1] / 2) * (can.shape[1] - xf) / iw
    cx = int(round(2 * xf - cx_dev))
    span = slice(max(0, cx - int(0.6 * ppp)), cx + int(0.6 * ppp))      # le soleil fait autour de 1 po de large
    base = np.nanmax(centre[span]) + 1
    ss = (base - haut_soleil) / sa.shape[0]
    sw, sh = int(round(sa.shape[1] * ss)), int(round(sa.shape[0] * ss))
    sa_, sc_ = _reduire(sa, sw, sh), _reduire_rvb(sc, sw, sh)
    sx, sy = cx - sw // 2, int(round(base)) - sh
    # son bas suit l'horizon : rien du soleil sous la ligne du centre de la dernière entaille
    lim = centre[sx:sx + sw] - sy
    lim = np.where(np.isnan(lim), sh, lim)
    sa_ = sa_ * np.clip(lim[None, :] + 0.5 - np.arange(sh)[:, None], 0, 1)

    _poser(can, haut, creme, 0, y0)                # les entailles du haut, derrière le soleil
    _poser(can, sa_, sc_, sx, sy)
    _poser(can, horizon, creme, 0, y0)             # l'horizon, devant

    # contrôle : rien sur le devant, rien dans la marge du texte
    chg = (can != avant).any(2)
    if chg[:, xf:].any() or (chg & occ).any():
        print('    dos 3 : ATTENTION, le motif touche le devant ou la marge du texte')
    ys_, xs_ = np.nonzero(chg)
    print('    dos 3 : entailles et soleil de %.2f à %.2f po du haut (le trou, marges ôtées : %.2f à %.2f po) ; soleil de '
          '%.2f po de large, centré à %.2f po du bord perdu ; entailles jusqu\'à %.2f po du devant' % (
              ys_.min() / ppp, ys_.max() / ppp, ga / ppp, gb / ppp, sw / ppp, cx / ppp, (xf - xs_.max()) / ppp))
    return can
