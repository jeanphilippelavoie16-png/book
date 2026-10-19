# -*- coding: utf-8 -*-
"""Le dos de la couverture du tome 3 (Prélever) : des éléments de l'image du devant dans les trous de la quatrième et
de la tranche (JP, 19 octobre 2026 : « mets-en dans les trous sur la page en arrière, faut juste pas que ça touche au
texte »). Appelé par motif_dos() de images/tomes/essais-ia/tome-1/couverture.py.
"""
import os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

VARIANTE = os.environ.get('DOS3', 'a')
LUM = np.array([.2126, .7152, .0722], np.float32)

# les entailles crème du ciel dans l'image d'origine (3072 × 3840) : la ligne de leur centre, de a à b
LIGNES = {'l1': (1704, 1726), 'l23': (1780, 1800), 'branche': (1830, 1845), 'l4': (1860, 1878),
          'l5': (1902, 1916), 'l6': (1943, 1957), 'l7': (1985, 2000)}
BANDE = (1690, 2018)                    # les lignes de l'image où sont les entailles crème sur le vert
SOLEIL = (2040, 2252, 1790, 2400)        # y0, y1 (coupé à plat au-dessus des collines), x0, x1
MARGE = 0.13                             # po, autour de tout ce qui est écrit ou tracé


# ---------------------------------------------------------------- les pièces de l'image
def _entailles(src):
    """Chaque entaille crème du ciel, seule : {nom: alpha (lignes BANDE, pleine largeur)} et la couleur crème."""
    y0, y1 = BANDE
    a = src[y0:y1].astype(np.float32)
    L = a @ LUM
    alpha = np.clip((L - 50.0) / (240.0 - 50.0), 0, 1)
    creme = np.median(a[L > 200], axis=0)
    coeur = alpha > 0.3
    lab, n = ndi.label(coeur, structure=np.ones((3, 3)))
    dist, (iy, ix) = ndi.distance_transform_edt(lab == 0, return_indices=True)
    proche = lab[iy, ix]                 # chaque pixel du bord adouci va à l'entaille la plus proche
    proche[dist > 4] = 0
    cy = ndi.mean(np.indices(lab.shape)[0] + y0, lab, index=np.arange(1, n + 1))
    taille = ndi.sum(coeur, lab, index=np.arange(1, n + 1))
    out = {}
    for nom, (a_, b_) in LIGNES.items():
        ids = [i + 1 for i in range(n) if a_ <= cy[i] <= b_ and taille[i] > 40]
        A = np.where(np.isin(proche, ids), alpha, 0).astype(np.float32)
        ys = np.nonzero(A.max(1) > 0)[0]
        out[nom] = A[ys.min():ys.max() + 1]
    return out, creme


def _effiler(A, fin, long_, cote='droite'):
    """Finit l'entaille A (une seule ligne) en pointe à la colonne fin, comme un coup de gouge : l'épaisseur décroît
    jusqu'à 0 sur long_ colonnes, autour de la ligne du centre de l'entaille."""
    if cote == 'gauche':
        return _effiler(A[:, ::-1], A.shape[1] - 1 - fin, long_)[:, ::-1]
    h, w = A.shape
    yy = np.arange(h, dtype=np.float32)
    out = A.copy()
    out[:, int(fin):] = 0
    for c in range(max(0, int(fin - long_)), min(w, int(fin))):
        col = A[:, c]
        m = col.sum()
        if m <= 0:
            continue
        cy = (col * yy).sum() / m
        f = ((fin - c) / long_) ** 0.8
        out[:, c] = col * np.clip(f * m / 2 + 0.5 - np.abs(yy - cy), 0, 1)
    return out


def _soleil(src):
    """Le soleil orange de l'image, coupé à plat au-dessus des collines : alpha et couleur, à la résolution d'origine."""
    y0, y1, x0, x1 = SOLEIL
    a = src[y0:y1, x0:x1].astype(np.float32)
    d = a[..., 0] - a[..., 1]
    alpha = np.clip((d - 15.0) / (105.0 - 15.0), 0, 1)
    lab, n = ndi.label(alpha > 0.5)
    i = 1 + int(np.argmax(ndi.sum(alpha > 0.5, lab, index=np.arange(1, n + 1))))
    alpha = np.where(ndi.binary_dilation(lab == i, iterations=3), alpha, 0)
    orange = np.median(a[alpha > 0.95], axis=0)
    coul = np.where((alpha > 0.95)[..., None], a, orange)
    ys, xs = np.nonzero(alpha > 0.5)
    sl = (slice(ys.min() - 2, None), slice(xs.min() - 2, xs.max() + 3))
    return alpha[sl], coul[sl]


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
    """Ce qui est écrit ou tracé, élargi de la marge (px du fond). Le bloc du texte d'ouverture (des lignes toutes de
    la même taille, 13 pt) compte par ses lignes seulement : à droite de sa dernière ligne, il y a un trou."""
    occ = np.zeros(shape, bool)
    lignes = [r for r in rects if r[4] > 0]
    for r in rects:
        if r[4] == -1:
            continue
        if r[4] == 0:
            dedans = [t[4] for t in lignes if t[0] >= r[0] - 1 and t[2] <= r[2] + 1 and t[1] >= r[1] - 1 and
                      t[3] <= r[3] + 1]
            if len(dedans) >= 2 and all(abs(f - 17.33) < 0.1 for f in dedans):
                continue
        a, b = max(0, int((r[1] * q) - marge)), int(np.ceil(r[3] * q + marge))
        c, d = max(0, int((r[0] * q) - marge)), int(np.ceil(r[2] * q + marge))
        occ[a:b, c:d] = True
    return occ


def _sans_miettes(A, cote):
    """Retire de la couche les bouts d'entaille plus courts que cote (px) : un éclat isolé se lit comme une étoile."""
    lab, n = ndi.label(A > 0.15, structure=np.ones((3, 3)))
    if not n:
        return A
    garde = np.zeros(n + 1, bool)
    for i, sl in enumerate(ndi.find_objects(lab), 1):
        garde[i] = (sl[1].stop - sl[1].start) >= cote
    _, (iy, ix) = ndi.distance_transform_edt(lab == 0, return_indices=True)
    return np.where(garde[lab[iy, ix]], A, 0).astype(np.float32)


# ---------------------------------------------------------------- les compositions
def _bande(lignes, noms, pas, s, x_fin, fins, debuts=None):
    """Les entailles noms empilées à pas px (image d'origine), en miroir (le bord gauche de l'image va vers la tranche),
    réduites à l'échelle s ; chacune finit en pointe à sa place (fins, en px du fond depuis le bord perdu). Rend
    l'alpha de la bande et le y (px du fond, dans la bande) du centre de chaque entaille."""
    iw = next(iter(lignes.values())).shape[1]
    hmax = max(lignes[n].shape[0] for n in noms)
    H0 = hmax + pas * (len(noms) - 1) + 4
    couche = np.zeros((H0, iw), np.float32)
    centres = []
    for k, nom in enumerate(noms):
        A = lignes[nom][:, ::-1]
        c = k * pas + hmax / 2
        y = int(round(c - A.shape[0] / 2))
        if fins and fins[k] is not None:
            A = _effiler(A, fins[k] / s, 70)
        if debuts and debuts[k] is not None:
            A = _effiler(A, debuts[k] / s, 70, 'gauche')
        couche[y:y + A.shape[0]] = np.maximum(couche[y:y + A.shape[0]], A)
        centres.append(c * s)
    w = int(round(iw * s))
    h = int(round(H0 * s))
    return _reduire(couche, w, h)[:, :x_fin], centres


def motif(can, info):
    ppp, xf, xt, H = info['ppp'], info['xf'], info['xt'], info['H']
    q = ppp / 96.0                     # px du fond par px CSS
    po = ppp                           # px du fond par pouce
    src = np.asarray(info['image'].convert('RGB'))
    iw = src.shape[1]
    libre = ~_occupe(info['rects'], q, can.shape[:2], MARGE * po)
    lignes, creme = _entailles(src)
    v = VARIANTE

    # le trou entre le sommaire et les auteurs : les rangées libres sur toute la largeur de la quatrième
    rangs = libre[:, :xt].all(1)
    pleins = np.nonzero(~rangs)[0]
    rangs[:max(int(0.3 * H), pleins.min())] = False         # entre deux blocs, pas dans les marges du haut et du bas
    rangs[pleins.max():] = False
    lab, n = ndi.label(rangs)
    t = max(ndi.find_objects(lab), key=lambda s_: s_[0].stop - s_[0].start)[0]
    ga, gb = t.start, t.stop

    # les entailles, du bord perdu jusque sur la tranche ; chacune finit en pointe à sa place, avant la bande du pli
    x_fin = xf - int(0.27 * po)
    s = 0.855
    noms = ['l1', 'l4', 'l5', 'l6']
    fins = [x_fin - int(d * po) for d in (0.0, 0.16, 0.07, 0.24)]
    pas = 38
    A, centres = _bande(lignes, noms, pas, s, x_fin, fins)
    A = _sans_miettes(A, 0.3 * po)
    hb = A.shape[0]
    y0 = int(round((ga + gb) / 2 - hb / 2))
    if 'soleil' not in v:
        _poser(can, A, creme, 0, y0)
    else:
        # le soleil se couche sur la dernière entaille, à la place qu'il a sur le devant, vue en miroir au pli
        sa, sc = _soleil(src)
        base = y0 + centres[-1]
        ss = (base - ga) / sa.shape[0]
        sw, sh = int(round(sa.shape[1] * ss)), int(round(sa.shape[0] * ss))
        sa_, sc_ = _reduire(sa, sw, sh), _reduire_rvb(sc, sw, sh)
        cx_dev = xf + (SOLEIL[2] + sa.shape[1] / 2) * (can.shape[1] - xf) / iw
        cx = int(round(xf - (cx_dev - xf)))
        coupe = int(round(centres[-1] - 0.035 * po))
        haut, bas_ = A.copy(), A.copy()
        haut[coupe:] = 0
        bas_[:coupe] = 0
        _poser(can, haut, creme, 0, y0)                                   # derrière le soleil
        _poser(can, sa_, sc_, cx - sw // 2, int(round(base)) - sh)
        _poser(can, bas_, creme, 0, y0)                                   # l'horizon, devant
        print('    dos 3 : soleil %.2f po de large, centre à %.2f po du bord perdu' % (sw / po, cx / po))
    print('    dos 3 : trou %.0f-%.0f px CSS, bande %.0f-%.0f' % (ga / q, gb / q, y0 / q, (y0 + hb) / q))
    return can
