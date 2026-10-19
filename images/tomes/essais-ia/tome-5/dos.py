# -*- coding: utf-8 -*-
"""Le dos du tome 5 (couverture C) : les nuages et le soleil du devant reviennent sur la quatrième et la tranche.

JP, 19 octobre 2026 : « j'aime que pour le tome 1 on retrouve des éléments de la couverture en arrière (les étoiles),
fais-le pour les autres » ; puis : « mets-en dans les trous sur la page en arrière, faut juste pas que ça touche au
texte ».

Le ciel du tome 5 est brun, avec des bancs de nuages taillés à la gouge en orange et le soleil qui se couche sur la
colline. Au dos, tout est découpé dans l'image du devant, à la même échelle que sur le devant :
  - le banc de nuages de gauche (trois traits), dans le trou entre le sommaire et « Les auteurs » : le trait du haut
    entre par le bord extérieur de la quatrième comme il entre par le bord du devant, celui du milieu passe dessous,
    décalé à droite, et le trait du bas, taillé en pointe au bout que le bord de l'image coupait, revient sur la
    rangée du haut, à droite ;
  - le soleil, plein (le bas caché par la colline est refait en miroir du haut), sur la tranche, entre le titre et
    « Le Manuel du Nord ».

Les trous se trouvent à partir des boîtes du texte (info['rects']) : rien ne se pose à moins de MARGE d'un texte, d'un
filet, d'une photo ou de la barre des tomes, et rien ne passe le pli du devant.

Le nettoyage des étoiles de couverture.py passe après ce motif : il efface les petites taches claires qui touchent le
texte ou les raccords du miroir du ciel, et une crête de nuage taillée trop fin pour son filtre y passerait (une
bosse floue sur le trait). On simule ce nettoyage ici, avec le code de couverture.py, et on arrondit à sa mesure les
quelques pixels qu'il prendrait : il ne touche plus rien du motif.

Appelé par motif_dos() de images/tomes/essais-ia/tome-1/couverture.py.
"""
import os
import sys
import importlib.util

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ORANGE = np.array([246, 119, 26], np.float32)      # l'orange plat des nuages et du soleil du devant

# les nuages du devant (coordonnées de titre-tome-5.jpg, 3072 × 3840) : boîte (y0, y1, x0, x1)
NUAGES = {
    'haut': (1752, 1820, 0, 1006),     # entre par le bord gauche
    'milieu': (1875, 1957, 440, 1886),  # libre aux deux bouts
    'bas': (1965, 2025, 0, 686),        # entre par le bord gauche
}
SOLEIL = (1600, 2240, 2020, 2680)      # boîte de recherche du soleil

MARGE = 0.14                           # po : distance minimale entre un nuage et une boîte de texte ou un bloc
PLI = 0.12                             # po : rien à moins de ça du pli du devant
SOLEIL_MAX = 0.46                      # po : diamètre du soleil de la tranche, au plus


# ------------------------------------------------------------------ extraction dans l'image du devant
def _alpha_orange(a):
    """Part d'orange de chaque pixel, mesurée contre la couleur du fond local (les bandes du ciel changent de brun)."""
    rb = a[..., 0] - a[..., 2]
    fond = rb < 100
    idx = ndi.distance_transform_edt(~fond, return_distances=False, return_indices=True)
    bg = a[idx[0], idx[1]]
    bg = np.stack([ndi.uniform_filter(bg[..., c], 9) for c in range(3)], -1)
    v = ORANGE - bg
    al = ((a - bg) * v).sum(-1) / np.maximum((v * v).sum(-1), 1)
    return np.clip(al, 0, 1)


def _nuage(arr, nom):
    y0, y1, x0, x1 = NUAGES[nom]
    p = 6
    Y0, Y1, X0, X1 = max(0, y0 - p), y1 + p, max(0, x0 - p), x1 + p
    al = _alpha_orange(arr[Y0:Y1, X0:X1])
    # seulement le trait de ce nuage (pas un bout du voisin qui entre dans la boîte)
    lab, n = ndi.label(al > 0.5)
    if n > 1:
        sz = np.bincount(lab.ravel())
        sz[0] = 0
        al = al * ndi.binary_dilation(lab == int(np.argmax(sz)), iterations=4)
    return al


def _soleil(arr):
    """Le contour du soleil : rayon par angle (en fraction du rayon), lu sur le haut et les côtés ; le bas, derrière
    la colline, est le miroir du haut, et les angles où un nuage touche le bord sont pris entre leurs voisins."""
    y0, y1, x0, x1 = SOLEIL
    al = _alpha_orange(arr[y0:y1, x0:x1])
    m = al > 0.5
    # le cercle, ajusté sur le bord du haut et de la gauche (ni la colline, ni les nuages qui touchent à droite)
    b = m & ~ndi.binary_erosion(m)
    ys, xs = np.nonzero(b)
    ys, xs = ys.astype(float), xs.astype(float)
    k = (xs + x0 < 2590) & (ys + y0 < 2025)
    for _ in range(2):
        A = np.c_[2 * xs[k], 2 * ys[k], np.ones(k.sum())]
        c = np.linalg.lstsq(A, xs[k] ** 2 + ys[k] ** 2, rcond=None)[0]
        cx, cy = c[0], c[1]
        r0 = np.sqrt(c[2] + cx ** 2 + cy ** 2)
        k &= np.abs(np.hypot(xs - cx, ys - cy) - r0) < 12
    # le bord, rayon par angle, lu sur l'image
    ang = np.linspace(-np.pi, np.pi, 720, endpoint=False)
    ray = np.full_like(ang, np.nan)
    rr = np.arange(0.8 * r0, 1.2 * r0, 0.25)
    for i, t in enumerate(ang):
        yy = np.clip(np.rint(cy + rr * np.sin(t)).astype(int), 0, m.shape[0] - 1)
        xx = np.clip(np.rint(cx + rr * np.cos(t)).astype(int), 0, m.shape[1] - 1)
        v = al[yy, xx]
        hors = np.nonzero(v < 0.5)[0]
        if len(hors) and hors[0] > 0:
            j = hors[0]
            a_, b_ = v[j - 1], v[j]
            ray[i] = rr[j - 1] + (a_ - 0.5) / max(a_ - b_, 1e-3) * (rr[j] - rr[j - 1])
    bon = (np.sin(ang) < 0.3) & (np.abs(ray - r0) < 0.02 * r0)
    ray[~bon] = np.nan
    for i in np.nonzero(np.sin(ang) >= 0.3)[0]:
        j = int(np.argmin(np.abs(np.angle(np.exp(1j * (ang + ang[i]))))))
        ray[i] = ray[j]
    ok = ~np.isnan(ray)
    ray = np.interp(np.arange(len(ang)), np.nonzero(ok)[0], ray[ok], period=len(ang))
    ray = ndi.median_filter(ray, 5, mode='wrap')
    return ray / r0, ang


def _disque(ray, ang, d, sur=4):
    """Le soleil à d px de diamètre : dessiné à sur fois la taille, puis réduit."""
    n = (int(np.ceil(d * 1.08)) + 4) * sur
    R = d * sur / 2
    yy, xx = np.mgrid[0:n, 0:n].astype(np.float32) + 0.5
    t = np.arctan2(yy - n / 2, xx - n / 2)
    r = np.hypot(yy - n / 2, xx - n / 2)
    m = (r <= np.interp(t, ang, ray, period=2 * np.pi) * R).astype(np.float32)
    im = Image.fromarray((m * 255).astype(np.uint8)).resize((n // sur, n // sur), Image.LANCZOS)
    return np.asarray(im).astype(np.float32) / 255


def _effiler(al, long_px):
    """Taille en pointe le bout gauche d'un nuage coupé par le bord de l'image : chaque colonne est resserrée vers le
    milieu du trait, de rien à la pointe jusqu'à sa hauteur entière à long_px, comme les bouts libres du devant (les
    deux traits de la gouge se rejoignent en une pointe)."""
    h, w = al.shape
    ys = np.arange(h, dtype=np.float32)[:, None]
    yc = (al * ys).sum(0) / np.maximum(al.sum(0), 1e-6)
    zone = slice(0, min(w, int(1.5 * long_px)))
    yc = yc.copy()
    yc[zone] = ndi.uniform_filter1d(yc[zone], max(3, int(0.3 * long_px)), mode='nearest')
    x = np.arange(w, dtype=np.float32)
    f = np.maximum(np.sin(np.clip(x / long_px, 0, 1) * np.pi / 2) ** 0.8, 1e-3)
    yy = yc[None, :] + (ys - yc[None, :]) / f[None, :]
    out = ndi.map_coordinates(al, [yy, np.broadcast_to(x[None, :], (h, w))], order=1, mode='constant', cval=0)
    return out[:, 1:]


def _bande(al):
    """La couche sans ses lignes vides du haut et du bas."""
    l = np.nonzero(al.max(1) > 0.02)[0]
    return al[l[0]:l[-1] + 1]


def _reduire(al, s):
    h, w = al.shape
    im = Image.fromarray(np.clip(al * 255, 0, 255).astype(np.uint8))
    return np.asarray(im.resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS)).astype(np.float32) / 255


# ------------------------------------------------------------------ les trous
def _boites(info):
    """Les boîtes du texte, sans le bloc du texte de présentation (« Six tomes… ») : il ne porte ni filet ni image, ses
    lignes suffisent. On le reconnaît à sa première ligne, qui commence au même point que lui ; les autres blocs
    (en-tête, sommaire, auteurs, barre des tomes) commencent au-dessus ou au-dessous de leur texte et gardent leurs
    filets."""
    r = info['rects']
    lignes = [b for b in r if b[4] > 0]
    return [b for b in r if b[4] != 0 or not any(abs(l[0] - b[0]) < 1 and abs(l[1] - b[1]) < 1 for l in lignes)]


def _interdit(info, H, W):
    """Où rien ne se pose : chaque boîte élargie de MARGE, et le devant avec PLI de plus."""
    q, po = info['ppp'] / 96, info['ppp']
    z = np.zeros((H, W), bool)
    mg = MARGE * po
    for x0, y0, x1, y1, fs in _boites(info):
        if fs < 0:
            continue
        z[max(0, int(y0 * q - mg)):min(H, int(np.ceil(y1 * q + mg))),
          max(0, int(x0 * q - mg)):min(W, int(np.ceil(x1 * q + mg)))] = True
    z[:, info['xf'] - int(PLI * po):] = True
    return z


def _trous_verticaux(info, x0, x1):
    """Les intervalles en y (px CSS) libres de toute boîte entre les colonnes x0 et x1 (px CSS), du plus grand au plus
    petit."""
    occ = sorted((r[1], r[3]) for r in _boites(info) if r[4] >= 0 and r[2] > x0 and r[0] < x1)
    trous, bas = [], 0.0
    for a, b in occ:
        if a > bas:
            trous.append((bas, a))
        bas = max(bas, b)
    return sorted(trous, key=lambda t: t[0] - t[1])


def _marge_nettoyage(fs):
    """La marge (x, y) en px CSS que le nettoyage des étoiles de couverture.py met autour d'une ligne de texte."""
    po = 96
    return min(max(1.0 * fs, .15 * po), .3 * po), min(max(.5 * fs, .12 * po), .2 * po)


# ------------------------------------------------------------------ poser
def _ajouter(couche, al, y, x, interdit, nom):
    """Ajoute al (0..1) à la couche orange, en haut à gauche (y, x) ; coupe ce qui sort du fond, refuse ce qui touche
    une zone interdite."""
    H, W = couche.shape
    h, w = al.shape
    ya, xa, yb, xb = max(0, y), max(0, x), min(H, y + h), min(W, x + w)
    if ya >= yb or xa >= xb:
        return False
    a = al[ya - y:yb - y, xa - x:xb - x]
    if (interdit[ya:yb, xa:xb] & (a > 0.02)).any():
        print('    dos : %s touche le texte, pas posé' % nom)
        return False
    couche[ya:yb, xa:xb] = 1 - (1 - couche[ya:yb, xa:xb]) * (1 - a)
    return True


def _peindre(fond, couche):
    out = fond.astype(np.float32)
    out[:, :couche.shape[1]] = out[:, :couche.shape[1]] * (1 - couche[..., None]) + ORANGE * couche[..., None]
    return np.clip(np.rint(out), 0, 255).astype(np.uint8)


def _couverture():
    """Le module couverture.py qui nous appelle (pour simuler son nettoyage), ou None."""
    for m in list(sys.modules.values()):
        if os.path.basename(getattr(m, '__file__', None) or '') == 'couverture.py' and \
                all(hasattr(m, a) for a in ('nettoyer', 'composer', 'mesures', 'palette', 'couleur_du_ciel')):
            return m
    f = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'tome-1', 'couverture.py')
    try:
        spec = importlib.util.spec_from_file_location('couverture_tome_1', f)
        m = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(m)
        return m
    except Exception as e:                      # noqa: BLE001
        print('    dos : nettoyage non simulé (%s)' % e)
        return None


def _proteger(fond, couche, info):
    """Simule le nettoyage des étoiles sur le dos peint ; chaque pixel du motif qu'il changerait est une crête trop
    fine pour son filtre (un carré de 0,09 po) : on l'arrondit à ce carré, à cet endroit seulement, et on recommence
    jusqu'à ce que le nettoyage ne touche plus rien du motif."""
    cv = _couverture()
    if cv is None:
        return couche
    k, v, ppp = info['tome'], info['variante'], info['ppp']
    m = cv.mesures(k)
    img = info['image']
    pal = cv.palette(v, k, cv.couleur_du_ciel(img))
    import io, contextlib
    with contextlib.redirect_stdout(io.StringIO()):
        _, bandes = cv.composer(v, m, img, pal, ppp)
    t = int(0.09 * ppp) | 1
    for essai in range(6):
        peint = _peindre(fond, couche)
        net, _ = cv.nettoyer(peint.copy(), list(info['rects']) + bandes, ppp)
        pris = (np.abs(net.astype(np.int16) - peint.astype(np.int16)).sum(-1) > 0)[:, :couche.shape[1]]
        pris &= ndi.binary_dilation(couche > 0.01, iterations=8)
        if not pris.any():
            if essai:
                print('    dos : %d passe(s) pour mettre les crêtes à l\'abri du nettoyage' % essai)
            return couche
        zone = ndi.binary_dilation(pris, iterations=t // 2 + 2)
        ouv = ndi.grey_opening(couche, size=(t, t))
        couche = np.where(zone, np.minimum(couche, ouv), couche)
    print('    dos : attention, le nettoyage touche encore le motif')
    return couche


# ------------------------------------------------------------------ le motif
def motif(can, info):
    img = info['image']
    arr = np.asarray(img.convert('RGB')).astype(np.float32)
    H, W = can.shape[:2]
    ppp, xf, xt = info['ppp'], info['xf'], info['xt']
    q = ppp / 96
    s = max((W - xf) / img.width, H / img.height)       # l'échelle de l'image sur le devant
    interdit = _interdit(info, H, W)
    couche = np.zeros((H, xf), np.float32)

    # 1. le banc de nuages dans le plus grand trou de la quatrième, entre le sommaire et les auteurs
    ya, yb = _trous_verticaux(info, 0.625 * 96, 7.625 * 96)[0]
    ya, yb = int(np.ceil(ya * q + MARGE * ppp)) + 1, int(yb * q - MARGE * ppp) - 1
    haut = _bande(_reduire(_nuage(arr, 'haut'), s))
    milieu = _bande(_reduire(_nuage(arr, 'milieu'), s))
    bas = _bande(_effiler(_reduire(_nuage(arr, 'bas'), s), 0.5 * ppp))
    y_haut = ya
    y_mil = yb - milieu.shape[0]
    x_mil = int(round((NUAGES['milieu'][2] - NUAGES['haut'][2]) * s))     # le décalage du devant
    x_bas = min(int(round(x_mil + milieu.shape[1] + 0.6 * ppp)), xt - int(0.45 * ppp) - bas.shape[1])
    print('    dos : banc de nuages entre %.2f et %.2f po' % (ya / ppp, yb / ppp))
    _ajouter(couche, haut, y_haut, 0, interdit, 'le nuage du haut')
    _ajouter(couche, milieu, y_mil, x_mil, interdit, 'le nuage du milieu')
    _ajouter(couche, bas, y_haut + (haut.shape[0] - bas.shape[0]) // 2, x_bas, interdit, 'le nuage effilé')

    # 2. le soleil sur la tranche, dans son plus grand trou (entre le titre et « Le Manuel du Nord ») : centré entre
    #    les deux textes, assez petit pour rester hors de la marge du nettoyage des étoiles
    xa_, xb_ = xt / q, xf / q
    ta, tb = _trous_verticaux(info, xa_, xb_)[0]
    dessus = [r for r in info['rects'] if r[4] > 0 and r[2] > xa_ and r[0] < xb_ and abs(r[3] - ta) < 0.5]
    dessous = [r for r in info['rects'] if r[4] > 0 and r[2] > xa_ and r[0] < xb_ and abs(r[1] - tb) < 0.5]
    za = ta + max([_marge_nettoyage(r[4])[1] for r in dessus] + [MARGE * 96])
    zb = tb - max([_marge_nettoyage(r[4])[1] for r in dessous] + [MARGE * 96])
    c = (ta + tb) / 2
    d = min(SOLEIL_MAX * 96, 2 * (c - za), 2 * (zb - c), (xb_ - xa_) - 2 * PLI * 96 - 0.2 * 96) * 0.97
    ray, ang = _soleil(arr)
    sol = _disque(ray, ang, d * q)
    _ajouter(couche, sol, int(round(c * q - sol.shape[0] / 2)), int(round((xt + xf) / 2 - sol.shape[1] / 2)), interdit,
             'le soleil')
    print('    dos : soleil de %.2f po sur la tranche, centré à %.2f po du haut' % (d / 96, c / 96))

    couche = _proteger(can, couche, info)
    out = _peindre(can, couche)
    assert (out[:, xf:] == can[:, xf:]).all()
    return out
