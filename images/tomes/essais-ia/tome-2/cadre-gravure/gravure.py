"""Ramener la linogravure repeinte par AI Horde aux six encres, zone par zone, puis y poser ce que le générateur ne
sait pas dessiner juste : le mât, le drapeau et les deux enfants. Sortie 1070 × 600.
    python3 gravure.py <image Horde> <labels.png> <sortie.png>
Chaque zone de la photo n'a droit qu'à certaines encres (le ciel au crème, l'eau aux encres sombres et à ses
entailles claires...) ; chaque pixel prend, parmi elles, l'encre la plus proche en couleur perçue. Le calcul se fait
au double de la taille, se nettoie des grains isolés, puis se réduit de moitié (un peu d'anticrénelage aux bords)."""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi
from skimage.color import rgb2lab
from encres import *
import regions

TAILLE = (1070, 600)
X2 = (TAILLE[0] * 2, TAILLE[1] * 2)
Z = regions.Z

PERMISES = {
    'ciel': [C],
    'crete': [S],
    'collines': [N, B, O],
    'eau': [N, B, C],
    'buissons': [N, S, B, O, OR, C],
    'sentier': [S, B, O, C],
    'mat': [C, O],
    'drapeau': [C, B],
    'enfant1': [N, S, B, O, C],
    'enfant2': [N, S, B, O, C, OR],
    'bateau': [B],
}
LAB_ENCRES = rgb2lab(ENCRES[None].astype(np.uint8))[0]


def quantifier(rgb, lab_z, poids_l=1.4):
    lab = rgb2lab(rgb)
    d = np.stack([np.sqrt((poids_l * (lab[..., 0] - e[0])) ** 2 + (lab[..., 1] - e[1]) ** 2 + (lab[..., 2] - e[2]) ** 2)
                  for e in LAB_ENCRES], -1)
    for nom, ok in PERMISES.items():
        m = lab_z == Z[nom]
        interdit = [k for k in range(6) if k not in ok]
        for k in interdit:
            d[..., k][m] = 1e9
    return np.argmin(d, -1)


def mode(carte, k):
    return np.asarray(Image.fromarray(carte.astype(np.uint8) * 40).filter(ImageFilter.ModeFilter(k))).astype(int) // 40


def poser_mat(img, echelle):
    """Le mât : une perche crème, son côté droit à l'ombre en ocre, son pied de bois en ocre."""
    d = ImageDraw.Draw(img)
    P = lambda pts: [(x * echelle, y * echelle) for x, y in pts]
    d.polygon(P(regions.MAT), fill=CREME)
    # l'ombre, le tiers droit de la perche
    (x0, y0), (x1, _), (x2, y2), (x3, _) = regions.MAT
    d.polygon(P([(x0 + (x1 - x0) * 0.62, y0), (x1, y0), (x2, y2), (x3 + (x2 - x3) * 0.62, y2)]), fill=OCRE)
    # le pied, plus large, en bois gris : ocre, cerné de brun noir
    d.polygon(P([(229, 382), (243, 382), (248, 452), (232, 452)]), fill=NOIR)
    d.polygon(P([(231, 384), (241, 384), (245, 452), (234, 452)]), fill=OCRE)


def rive(carte, lab_z, ep=4, encre=O, graine=3):
    """La ligne claire de la rive, taillée à la gouge : un filet d'ocre entre les collines et l'eau, coupé çà et là."""
    rng = np.random.default_rng(graine)
    eau = lab_z == Z['eau']
    haut = np.zeros_like(eau)
    haut[ep:] = lab_z[:-ep] == Z['collines']
    ligne = eau & haut
    # des coupures : quelques bandes verticales où le filet s'interrompt
    xs = np.arange(carte.shape[1])
    coupe = np.zeros(carte.shape[1], bool)
    x = 0
    while x < carte.shape[1]:
        x += int(rng.uniform(60, 220))
        coupe[x:x + int(rng.uniform(6, 22))] = True
    ligne &= ~coupe[None, :]
    carte[ligne] = encre
    return carte


def entailles(carte, lab_z, zone, n, encre, graine, long_=(30, 90), ep=(2.0, 3.6), loin=10, ciel=None):
    """Quelques entailles de gouge claires dans une masse foncée : des fuseaux couchés, posés au hasard sur la pente
    ouverte (l'encre de la masse, à plus de `loin` pixels de l'encre la plus foncée), inclinés comme la ligne du ciel
    au-dessus d'eux."""
    rng = np.random.default_rng(graine)
    h, w = carte.shape
    m = lab_z == Z[zone]
    ouvert = m & (carte != N) & (ndi.distance_transform_edt(carte != N) > loin)
    calque = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(calque)
    ys, xs = np.nonzero(ouvert)
    if not len(ys):
        return carte
    for _ in range(n):
        k = rng.integers(len(ys))
        y, x = ys[k], xs[k]
        L = rng.uniform(*long_)
        e = rng.uniform(*ep)
        if ciel is not None:
            x0, x1 = int(np.clip(x - L / 2, 0, w - 1)), int(np.clip(x + L / 2, 0, w - 1))
            pente = (ciel[x1] - ciel[x0]) / max(x1 - x0, 1)
        else:
            pente = 0.0
        haut_, bas_ = [], []
        for t in np.linspace(0, 1, 16):
            px = x - L / 2 + L * t
            py = y + pente * (px - x)
            haut_.append((px, py - e * np.sin(np.pi * t)))
            bas_.append((px, py + 0.5 * e * np.sin(np.pi * t)))
        d.polygon(haut_ + bas_[::-1], fill=255)
    t = (np.asarray(calque) > 127) & ouvert
    carte[t] = encre
    return carte


def tiges_et_pointes(carte, lab_z):
    """Dans l'eau, le crème ne garde que les entailles couchées. Les tiges des petits bouleaux, à gauche, passent à
    l'ocre, et les entailles qui les touchent s'arrêtent avant elles (sinon elles se croisent en forme de lettres).
    Tout autre morceau de crème dans l'eau (un bout de quai, une tache sans objet) prend l'encre de l'eau autour.
    Dans les buissons du haut, le crème des pointes d'herbe passe à l'ocre comme les feuilles."""
    h, w = carte.shape
    eau = lab_z == Z['eau']
    c = (carte == C) & eau
    # une tige : du crème qui file à la verticale sur plus de 18 pixels (au double de la taille), à gauche
    vert = ndi.binary_opening(c, np.ones((18, 1)))
    vert = ndi.binary_dilation(vert, np.ones((3, 3))) & c
    vert[:, int(0.26 * w):] = False
    carte[vert] = O
    pres = ndi.binary_dilation(vert, np.ones((5, 9))) & (carte == C) & eau
    carte[pres] = N
    # les morceaux de crème qui ne sont pas des entailles couchées
    c = (carte == C) & eau
    lbl, n = ndi.label(c)
    autour = mode(np.where(c, N, carte), 15)
    for k, sl in enumerate(ndi.find_objects(lbl)):
        hh, ww = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        if ww < 2.6 * hh:
            m = lbl[sl] == k + 1
            carte[sl][m] = autour[sl][m]
    # les bouts d'ocre perdus au milieu de l'eau (loin des tiges) prennent aussi l'encre de l'eau
    o = (carte == O) & eau
    o[:, : int(0.26 * w)] = False
    lbl, n = ndi.label(o)
    if n:
        tailles = ndi.sum(o, lbl, range(1, n + 1))
        petits = np.isin(lbl, [i + 1 for i, t in enumerate(tailles) if t < 400])
        carte[petits] = mode(np.where(petits, N, carte), 15)[petits]
    bu = lab_z == Z['buissons']
    carte[bu & (carte == C)] = O
    # les feuilles en traits fins du haut des buissons se lisent comme des lettres (m, n, z) : on les referme en
    # feuilles pleines
    haut = np.zeros_like(eau)
    haut[int(0.40 * h): int(0.66 * h)] = True
    zone = bu & haut
    o = carte == O
    ferme = ndi.binary_closing(o, structure=_disque(6)) & zone & ~o
    carte[ferme] = O
    return carte


def taches_flottantes(carte, lab_z):
    """Sur la pente des collines, une tache foncée qui ne tient pas à la forêt et qui n'est ni un point de gouge ni
    une ligne de crête (un oiseau, une barque en l'air) prend l'encre de la pente."""
    m = (carte == N) & (lab_z == Z['collines'])
    lbl, n = ndi.label(m)
    if not n:
        return carte
    tailles = ndi.sum(m, lbl, range(1, n + 1))
    foret = 1 + int(np.argmax(tailles))
    for k, sl in enumerate(ndi.find_objects(lbl)):
        if k + 1 == foret:
            continue
        hh, ww = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        if tailles[k] > 60 and ww < 5 * hh and tailles[k] < 4000:
            # elle touche la masse de la forêt ? on la garde (une cime)
            sl2 = (slice(max(sl[0].start - 2, 0), sl[0].stop + 2), slice(max(sl[1].start - 2, 0), sl[1].stop + 2))
            if (lbl[sl2] == foret).any():
                continue
            mm = lbl[sl] == k + 1
            carte[sl][mm] = B
    return carte


def _disque(r):
    y, x = np.ogrid[-r:r + 1, -r:r + 1]
    return x * x + y * y <= r * r


FOND_DRAPEAU = SANG


def graver(src, labels_png, sortie=None, retouches=None, efface=None, gouges=True):
    im = Image.open(src).convert('RGB').resize(X2, Image.LANCZOS)
    lab_z = zones(labels_png, X2)
    rgb = np.asarray(im)
    carte = quantifier(rgb, lab_z)
    if efface:
        # ce que le générateur a peint à la place des enfants part : chaque pixel prend l'encre du pixel le plus
        # proche hors de la zone ; les enfants dessinés couvrent ensuite presque tout
        z = np.asarray(Image.open(efface).resize(X2, Image.NEAREST)) > 127
        _, (iy, ix) = ndi.distance_transform_edt(z, return_indices=True)
        carte = carte[iy, ix]
    # ce qui sera dessiné par-dessus n'a pas besoin d'être propre ; le reste se nettoie
    carte = mode(carte, 5)
    carte[lab_z == Z['ciel']] = C
    carte = nettoyer(carte, petit=40)
    carte = tiges_et_pointes(carte, lab_z)
    carte = taches_flottantes(carte, lab_z)
    if gouges:
        carte = rive(carte, lab_z)
        ciel = (lab_z == Z['ciel']).sum(0)
        carte = entailles(carte, lab_z, 'collines', 16, O, 5, long_=(50, 130), ep=(2.4, 4.2), ciel=ciel)
    out = Image.fromarray(carte_vers_rgb(carte))
    e = X2[0] / PHOTO[0]
    poser_mat(out, e)
    poser_drapeau(out, [(x * e, y * e) for x, y in regions.DRAPEAU], fond=FOND_DRAPEAU, vague=0.04, bord=0.03)
    dessiner_enfants(out, e)
    if retouches:
        retouches(out, e)
    out = out.reduce(2)
    if sortie:
        out.save(sortie)
    return out


if __name__ == '__main__':
    import os
    out = graver(sys.argv[1], sys.argv[2], sys.argv[3], efface=os.environ.get('GRAV_EFFACE'))
    a = np.asarray(out).reshape(-1, 3)
    exact = (np.abs(a[:, None, :].astype(int) - ENCRES[None].astype(int)).sum(-1) == 0).any(-1).mean()
    print(sys.argv[3], out.size, f'pixels aux encres exactes : {exact:.1%}')
