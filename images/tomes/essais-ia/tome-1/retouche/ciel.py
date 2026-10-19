"""Tome 1, page de titre : le ciel. Les étoiles redevenues des points taillés et la lune regravée (JP, 19 octobre 2026 :
« reprends exactement la même image, mais applique la même rigueur de qualité que les autres tomes »).

Ce qui change, dans la boîte 0,0 à 768,478 (coordonnées 768 × 960), et seulement sur les étoiles et sur la lune :
- chaque étoile garde sa place et sa grosseur (quatre grosseurs, les plus grosses de 6 à 9 unités) et devient un disque
  net et plein, rien dedans, d'une seule encre : le blanc bleuté de la majorité (#CFDFE7). Les étoiles en forme de signe
  (le glyphe sous le titre, le S, le chevron, la barre, la goutte, la petite croix) deviennent un point rond à leur
  centre. L'ancienne étoile est d'abord effacée avec le ciel recopié à côté d'elle (le grain est recopié, pas lissé,
  comme lune_atelier.py au tome 6), puis le point est posé dessus ;
- la lune garde son centre, son rayon et son blanc (#EAEDEF), avec un bord net ; ses mers deviennent des formes plates
  bleu-gris pâle aux bords taillés, avec quelques entailles fines qui suivent la courbe du disque. Le bas de la lune
  s'arrête à la ligne de neige des crêtes (le module cretes.py prolonge cette ligne jusqu'au fond du creux).
Ce qui ne change pas : le fond du ciel, son dégradé, ses taches sombres et sa marbrure (un ciel lissé ferait du flou).

Les étoiles et la lune se relèvent sur l'image d'origine (titre-tome-1-original.jpg, dans le dossier parent) ; la ligne
de neige vient de cretes.contours().

    appliquer(a, K) : a = image RVB uint8 (3840 × 3072), K = 4 pixels par unité 768 × 960 ; rend une copie retouchée.
    python3 ciel.py [SOURCE] SORTIE   (essai du module seul)
"""
import functools
import importlib.util
import math
import os
import sys

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

ICI = os.path.dirname(os.path.abspath(__file__))
ORIGINAL = os.path.normpath(os.path.join(ICI, '..', 'titre-tome-1-original.jpg'))

U = 4
Y_BAS = 478 * U                     # le bas de la zone du ciel
ENCRE = np.array([0xCF, 0xDF, 0xE7], float)      # le blanc bleuté des étoiles
BLANC_LUNE = np.array([0xEA, 0xED, 0xEF], float)
MER = np.array([0xC4, 0xCE, 0xD7], float)        # bleu-gris pâle des mers et des entailles

# La lune, mesurée sur l'image d'origine (cercle ajusté sur le bord du haut, écart moyen 1,8 pixel) : unités 768.
LUNE_X, LUNE_Y, LUNE_R = 585.46, 448.64, 48.94

# Les mers : les deux taches grises de la lune d'origine (seuil sur la luminance lissée, contour taillé en facettes),
# et une petite au centre droit, là où la lune d'origine avait sa troisième tache. Unités 768.
MERS = [
    [(592.5, 436.3), (585.5, 430.2), (574.2, 427.4), (566.9, 420.2), (567.3, 417.5), (574.2, 409.2), (579.7, 405.2),
     (589.0, 405.5), (589.7, 408.2), (586.3, 413.5), (587.0, 416.3), (596.5, 419.5), (606.2, 425.4), (610.1, 430.8),
     (610.1, 433.0), (608.5, 434.5), (599.8, 431.9)],
    [(576.0, 469.8), (547.2, 469.5), (542.7, 459.0), (541.9, 448.5), (543.8, 448.0), (553.8, 454.2), (560.8, 456.3),
     (563.3, 455.8), (564.6, 450.2), (568.8, 444.5), (572.2, 450.6), (578.8, 449.6), (582.7, 451.0), (585.2, 453.5),
     (585.5, 456.5), (583.5, 458.7), (575.6, 461.8), (577.2, 468.5)],
    [(600.2, 443.6), (604.8, 440.6), (611.0, 441.2), (614.6, 444.9), (613.2, 449.8), (607.4, 452.3), (601.6, 450.6),
     (599.3, 447.1)],
]
# Les entailles : des arcs fins, concentriques au disque, sur le bord droit (rayon relatif, angle de début et de fin
# en degrés, y vers le bas : -90 est le haut de la lune).
ENTAILLES = [(0.93, -78, -18), (0.86, -66, -26), (0.79, -52, -34), (0.93, -150, -128)]
LARG_ENTAILLE = 0.6                 # unités

# Les quatre grosseurs d'étoile (diamètre, unités) et leurs bornes, mesurées sur les étoiles d'origine (diamètre du
# disque de même surface que la tache au-dessus de 40 % de son éclat).
GROSSEURS = [(0.0, 1.2), (1.5, 2.1), (2.75, 3.5), (5.0, 0.0)]   # (borne basse du diamètre mesuré, diamètre posé)
GROSSE_MIN, GROSSE_MAX = 6.0, 9.0   # la plus grosse grosseur garde son diamètre (mesuré + 0,5), entre 6 et 9 unités
# Les étoiles en forme de signe, relevées une à une (unités 768) : toutes leurs taches à moins de 6 unités (la barre du
# glyphe, la queue de la goutte, le pied du chevron) deviennent un seul point rond, au centre du signe.
SIGNES = [(160, 268), (616, 131), (240, 59), (535, 17), (145, 114), (346, 97)]
ECLAT_MIN = 35                      # sous cet éclat (au-dessus du ciel), une tache n'est pas une étoile : on n'y touche pas


@functools.lru_cache(maxsize=1)
def _original():
    return np.asarray(Image.open(ORIGINAL).convert('RGB'))


@functools.lru_cache(maxsize=1)
def _cretes():
    spec = importlib.util.spec_from_file_location('t1_retouche_cretes', os.path.join(ICI, 'cretes.py'))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def ligne_de_neige():
    """Le haut des crêtes, en pixels de l'image, par colonne (le creux de la lune compris)."""
    return _cretes().contours()[0]


def _grosseur(d):
    """Le diamètre posé (unités) pour un diamètre mesuré d (unités)."""
    if d >= GROSSEURS[-1][0]:
        return float(np.clip(d + 0.5, GROSSE_MIN, GROSSE_MAX))
    pose = GROSSEURS[0][1]
    for borne, diam in GROSSEURS[:-1]:
        if d >= borne:
            pose = diam
    return pose


@functools.lru_cache(maxsize=1)
def etoiles():
    """Les étoiles de l'image d'origine : (x, y, diamètre posé, rayon à effacer, diamètre mesuré), en pixels de
    l'image ; et les taches pâles qui ne sont pas des étoiles (un trait flou, une virgule) : (x, y, rayon à effacer)."""
    a = _original()[:Y_BAS].astype(np.float32)
    L = a.mean(2)
    H, W = L.shape
    fond = ndimage.grey_opening(L, size=(31, 31))
    fond = ndimage.uniform_filter(fond, 15)
    d = L - fond
    yy, xx = np.mgrid[0:H, 0:W]
    T = ligne_de_neige()
    lx, ly, lr = LUNE_X * U, LUNE_Y * U, LUNE_R * U
    valide = (yy < T[None, :] - 3 * U) & (np.hypot(xx - lx, yy - ly) > lr + 6 * U)
    m = (d > 18) & valide
    lab, n = ndimage.label(ndimage.binary_dilation(m, iterations=1))
    objs = ndimage.find_objects(lab)
    brut = []
    for i, sl in enumerate(objs):
        reg = lab[sl] == i + 1
        dd = np.where(reg, d[sl], 0)
        pic = dd.max()
        w = np.clip(dd - 10, 0, None)
        cy, cx = ndimage.center_of_mass(w)
        cy += sl[0].start
        cx += sl[1].start
        plein = ndimage.binary_fill_holes(dd > max(0.4 * pic, 18))
        diam = 2 * math.sqrt(plein.sum() / math.pi) / U
        ys, xs = np.nonzero(ndimage.binary_dilation(reg, iterations=1) & (np.abs(d[sl]) > 6))
        ext = np.hypot(xs + sl[1].start - cx, ys + sl[0].start - cy).max() if len(xs) else 2
        brut.append([cx, cy, diam, ext, pic])
    for sx, sy in SIGNES:
        parts = [e for e in brut if math.hypot(e[0] - sx * U, e[1] - sy * U) < 6 * U]
        if not parts:
            continue
        poids = [max(e[2], 0.5) ** 2 * e[4] for e in parts]
        cx = sum(p_ * e[0] for p_, e in zip(poids, parts)) / sum(poids)
        cy = sum(p_ * e[1] for p_, e in zip(poids, parts)) / sum(poids)
        ext = max(math.hypot(e[0] - cx, e[1] - cy) + e[3] for e in parts)
        brut = [e for e in brut if e not in parts] + [[cx, cy, max(e[2] for e in parts), ext, max(e[4] for e in parts)]]
    # deux taches qui appartiennent à la même étoile (une facette, la queue d'une goutte, le pied d'un chevron) se
    # fondent dans la plus grosse ; une tache pâle isolée n'est pas une étoile : elle s'efface, sans point
    vraies = sorted([e for e in brut if e[4] >= ECLAT_MIN], key=lambda e: -e[2])
    pales = [e for e in brut if e[4] < ECLAT_MIN]
    gardees, taches = [], []
    for e in vraies + pales:
        for g in gardees:
            if math.hypot(e[0] - g[0], e[1] - g[1]) < g[2] * U / 2 + 3 * U:
                g[3] = max(g[3], math.hypot(e[0] - g[0], e[1] - g[1]) + e[3])
                break
        else:
            (gardees if e[4] >= ECLAT_MIN else taches).append(e)
    # le rayon à effacer couvre aussi le halo sombre que l'agrandissement a laissé autour des grosses étoiles
    return ([(cx, cy, _grosseur(diam), ext + 3 + min(6.0, diam * 1.2), diam) for cx, cy, diam, ext, pic in gardees],
            [(cx, cy, ext + 4) for cx, cy, diam, ext, pic in taches])


def _disque(R, cx, cy, r):
    """La couverture (0..1) d'un disque net, à l'antialiasing d'un pixel, sur la grille de la boîte R = (y0, y1, x0, x1)."""
    y0, y1, x0, x1 = R
    yy, xx = np.mgrid[y0:y1, x0:x1]
    return np.clip(r - np.hypot(xx + 0.5 - cx, yy + 0.5 - cy) + 0.5, 0, 1)


def _effacer(out, a, ciel_ok, cx, cy, re):
    """Remplace la tache par le ciel recopié à côté (le décalage le plus proche dont la source est du ciel sans étoile),
    ramené au ton moyen de l'anneau autour de la tache. Bord fondu sur 3 pixels."""
    H, W = ciel_ok.shape
    rb = int(math.ceil(re + 16))
    y0, y1, x0, x1 = int(cy) - rb, int(cy) + rb + 1, int(cx) - rb, int(cx) + rb + 1
    if y0 < 0 or x0 < 0 or y1 > H or x1 > W:
        y0, x0, y1, x1 = max(0, y0), max(0, x0), min(H, y1), min(W, x1)
    yy, xx = np.mgrid[y0:y1, x0:x1]
    rr = np.hypot(xx + 0.5 - cx, yy + 0.5 - cy)
    poids = np.clip((re + 3 - rr) / 3, 0, 1)
    anneau = (rr > re + 4) & (rr < re + 14)
    pas = int(2 * re + 30)
    for k in range(1, 6):
        for ddx, ddy in [(-1, 0), (1, 0), (0, -1), (-1, -1), (1, -1), (0, 1), (-1, 1), (1, 1)]:
            sx, sy = ddx * pas * k, ddy * pas * k
            if y0 + sy < 0 or y1 + sy > H or x0 + sx < 0 or x1 + sx > W:
                continue
            if not ciel_ok[y0 + sy:y1 + sy, x0 + sx:x1 + sx].all():
                continue
            src = a[y0 + sy:y1 + sy, x0 + sx:x1 + sx].astype(np.float32)
            tgt = a[y0:y1, x0:x1].astype(np.float32)
            src = src - np.median(src[anneau], 0) + np.median(tgt[anneau], 0)
            blk = out[y0:y1, x0:x1].astype(np.float32)
            blk = blk * (1 - poids[..., None]) + src * poids[..., None]
            out[y0:y1, x0:x1] = np.clip(np.round(blk), 0, 255).astype(np.uint8)
            return True
    return False


def _lune(out, a, T):
    """La lune regravée, sur la ligne de neige des crêtes."""
    lx, ly, lr = LUNE_X * U, LUNE_Y * U, LUNE_R * U
    y0, y1 = int(ly - lr - 20), int(min(Y_BAS + 4 * U, ly + lr + 20))
    x0, x1 = int(lx - lr - 20), int(lx + lr + 21)
    yy, xx = np.mgrid[y0:y1, x0:x1]
    rr = np.hypot(xx + 0.5 - lx, yy + 0.5 - ly)
    dessus = yy < (T[np.clip(xx, 0, len(T) - 1)] + 3)        # au-dessus de la neige (la neige recouvre le reste)
    # 1. Le halo flou d'origine, sur 3 unités autour du disque, est remplacé par le ciel pris plus loin sur le même
    #    rayon (ou plus haut, si ce point tombe sur une crête).
    halo = dessus & (rr > lr - 2) & (rr < lr + 3 * U)
    hy, hx = np.nonzero(halo)
    py, px = hy + y0 + 0.5, hx + x0 + 0.5
    ux, uy = (px - lx) / rr[hy, hx], (py - ly) / rr[hy, hx]
    sx = np.round(px + ux * 4.5 * U).astype(int)
    sy = np.round(py + uy * 4.5 * U).astype(int)
    tomb = sy >= T[np.clip(sx, 0, len(T) - 1)] - 2 * U
    sy = np.where(tomb, sy - 6 * U, sy)
    fond = out[y0:y1, x0:x1].astype(np.float32)
    fond[hy, hx] = a[np.clip(sy, 0, a.shape[0] - 1), np.clip(sx, 0, a.shape[1] - 1)]
    # 2. Le disque, net ; les mers et les entailles, dessinées au quadruple puis réduites.
    S = 4
    h, w = y1 - y0, x1 - x0
    im = Image.new('L', (w * S, h * S), 0)
    dr = ImageDraw.Draw(im)
    for mer in MERS:
        dr.polygon([((x * U - x0) * S, (y * U - y0) * S) for x, y in mer], fill=255)
    for (rel, a0, a1) in ENTAILLES:
        n = 60
        r0 = rel * lr
        g, dd = [], []
        for k in range(n + 1):
            t = k / n
            ang = math.radians(a0 + (a1 - a0) * t)
            larg = LARG_ENTAILLE * U * math.sin(math.pi * t) ** 0.6
            for lst, sgn in ((g, 1), (dd, -1)):
                rp = r0 + sgn * larg / 2
                lst.append(((lx + rp * math.cos(ang) - x0) * S, (ly + rp * math.sin(ang) - y0) * S))
        dr.polygon(g + dd[::-1], fill=255)
    mer = np.asarray(im, np.float32).reshape(h, S, w, S).mean((1, 3)) / 255.0
    disque = np.clip(lr - rr + 0.5, 0, 1)
    couleur = BLANC_LUNE * (1 - mer[..., None]) + MER * mer[..., None]
    res = fond * (1 - disque[..., None]) + couleur * disque[..., None]
    zone = dessus & (rr < lr + 3 * U)
    blk = out[y0:y1, x0:x1]
    blk[zone] = np.clip(np.round(res[zone]), 0, 255).astype(np.uint8)


def appliquer(a, K=4):
    assert K == U, 'le module est réglé pour K = 4'
    a = np.asarray(a)
    out = a.copy()
    T = ligne_de_neige()
    H = Y_BAS
    W = a.shape[1]
    # le ciel qu'on a le droit de recopier : au-dessus des crêtes, loin de la lune et de toute étoile
    yy, xx = np.mgrid[0:H, 0:W]
    ciel_ok = (yy < T[None, :] - 4 * U) & (np.hypot(xx - LUNE_X * U, yy - LUNE_Y * U) > (LUNE_R + 8) * U)
    points, taches = etoiles()
    for cx, cy, re in [(e[0], e[1], e[3]) for e in points] + taches:
        yb, xb = int(cy), int(cx)
        rb = int(re + 3)
        ciel_ok[max(0, yb - rb):yb + rb + 1, max(0, xb - rb):xb + rb + 1] = False
    for cx, cy, re in taches:
        _effacer(out, a, ciel_ok, cx, cy, re)
    for cx, cy, diam, re, _ in points:
        _effacer(out, a, ciel_ok, cx, cy, re)
    # tout est effacé avant de poser le premier point : l'effacement d'une étoile ne mord jamais le point d'une voisine
    for cx, cy, diam, re, _ in points:
        r = diam * U / 2
        rb = int(math.ceil(r + 2))
        R = (max(0, int(cy) - rb), min(H, int(cy) + rb + 1), max(0, int(cx) - rb), min(W, int(cx) + rb + 1))
        c = _disque(R, cx, cy, r)[..., None]
        blk = out[R[0]:R[1], R[2]:R[3]].astype(np.float32)
        out[R[0]:R[1], R[2]:R[3]] = np.clip(np.round(blk * (1 - c) + ENCRE * c), 0, 255).astype(np.uint8)
    _lune(out, a, T)
    return out


if __name__ == '__main__':
    src = sys.argv[1] if len(sys.argv) > 2 else ORIGINAL
    dst = sys.argv[-1]
    a = np.asarray(Image.open(src).convert('RGB'))
    Image.fromarray(appliquer(a, 4)).save(dst)
    print('ok', dst, len(etoiles()[0]), 'étoiles', len(etoiles()[1]), 'taches pâles effacées')
