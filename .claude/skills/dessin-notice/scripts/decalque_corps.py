"""decalque_corps.py — décalquer un personnage en aplat (peau, cheveux) avec son trait.

Une figure de référence porte trois couches : la peau (aplat clair), les cheveux (aplat foncé,
épais) et le trait (fin, très foncé). On les sépare par la luminosité et l'épaisseur — le trait
est fin, les cheveux sont une masse — puis on décalque chacune : les aplats deviennent des formes
remplies, le trait des courbes (decalque.py).
"""
import numpy as np, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from PIL import Image
from scipy import ndimage as ndi
from skimage import measure
from skimage.morphology import skeletonize, remove_small_objects, disk, binary_opening, binary_dilation, binary_closing
from courbes import courbes, svg_d
from decalque import chemins_squelette

PEAU = '#F3E3D3'; CHEVEUX = '#857565'; NOIR = '#1A1A1A'

def couches(chemin, boite, k=8):
    im = Image.open(chemin).convert('RGBA')
    fond = Image.new('RGBA', im.size, (255, 255, 255, 255)); fond.alpha_composite(im)
    im = fond.convert('RGB').crop(boite)
    im = im.resize((im.width*k, im.height*k), Image.LANCZOS)
    L = np.asarray(im.convert('L')).astype(float)
    figure = L < 240
    # ne boucher que les petits trous (pas le jour entre le bras et le corps)
    trous = ndi.binary_fill_holes(figure) & ~figure
    lab, n = ndi.label(trous)
    if n:
        aires = ndi.sum(trous, lab, range(1, n+1))
        petits = np.isin(lab, 1 + np.nonzero(aires < (6*k)**2)[0])
        figure = figure | petits
    figure = remove_small_objects(figure, max_size=(4*k)**2)
    # les jours étroits (entre les jambes, entre le bras et la taille) se ferment : le trait intérieur dit la séparation
    figure = ndi.binary_closing(figure, structure=disk(int(1.1*k)), iterations=1) | figure
    figure = ndi.binary_fill_holes(figure)          # un jour fermé n'est pas un trou : la séparation, c'est le trait
    foncé = L < 150
    cheveux = ndi.binary_opening(foncé, structure=disk(int(1.6*k)))
    cheveux = remove_small_objects(cheveux, max_size=(3*k)**2)
    cheveux = ndi.binary_fill_holes(ndi.binary_closing(cheveux, structure=disk(k)))
    interieur = ndi.distance_transform_edt(figure) > 2.3*k     # loin du contour : sinon le contour se double
    # deux bords d'un jour étroit + le jour = une seule bande foncée : son squelette donne UN trait au milieu
    sombre = L < 175
    corps = np.arange(L.shape[0])[:, None] >= 58*k        # sous le cou seulement : le visage garde ses petits traits
    sombre = np.where(corps, ndi.binary_closing(sombre, structure=disk(int(1.4*k))), sombre)
    trait = sombre & interieur & ~ndi.binary_dilation(cheveux, structure=disk(int(0.8*k)))
    trait = remove_small_objects(trait, max_size=k*k)
    return figure, cheveux, trait, L

def formes(masque, ech, tol, sigma, remplir, contour=None, ep=1.0, aire_min=200):
    out = []
    for c in measure.find_contours(np.pad(masque.astype(float), 1), 0.5):
        if len(c) < 30: continue
        P = np.stack([c[:, 1]-1, c[:, 0]-1], 1)*ech
        if abs(np.sum(P[:-1, 0]*P[1:, 1] - P[1:, 0]*P[:-1, 1]))/2 < aire_min*ech*ech: continue
        st = f'stroke="{contour}" stroke-width="{ep}"' if contour else 'stroke="none"'
        out.append(f'<path d="{svg_d(courbes(P, tol, True, sigma=sigma), True)}" fill="{remplir}" {st} stroke-linejoin="round"/>')
    return out

def traits(trait, ech, tol, sigma, ep, ergot):
    sq = skeletonize(trait)
    out = []
    for c in chemins_squelette(sq, long_min=6):
        if np.sum(np.linalg.norm(np.diff(c, axis=0), axis=1)) < ergot: continue
        P = np.stack([c[:, 1], c[:, 0]], 1)*ech
        ferme = len(P) > 12 and np.linalg.norm(P[0]-P[-1]) < 4*ech
        d = svg_d(courbes(P, tol, ferme, sigma=sigma), ferme)
        if d: out.append(f'<path d="{d}" fill="none" stroke="{NOIR}" stroke-width="{ep}" stroke-linecap="round" stroke-linejoin="round"/>')
    return out

def figure_svg(chemin, boite, k=8, ech=0.25, ep=1.3, peau=PEAU, cheveux_c=CHEVEUX, masques=None):
    fig, chev, tr, L = masques or couches(chemin, boite, k)
    el = []
    el += formes(fig, ech, 0.7, 1.0, peau, contour=NOIR, ep=ep)
    el += formes(chev, ech, 0.8, 1.5, cheveux_c, contour=NOIR, ep=ep)
    el += traits(tr, ech, 0.7, 1.6, ep, ergot=2.2*k)
    return el, fig.shape

def ecrire(fichier, els_dims):
    """els_dims : liste de (éléments, (h, w), décalage x)."""
    W = sum(int(d[1]*0.25) + 40 for _, d, _ in els_dims) + 40; H = max(int(d[0]*0.25) for _, d, _ in els_dims) + 80
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="#fff"/>']
    x = 40
    for el, d, _ in els_dims:
        s.append(f'<g transform="translate({x},40)">'); s += el; s.append('</g>'); x += int(d[1]*0.25) + 40
    s.append('</svg>')
    open(fichier + '.svg', 'w').write('\n'.join(s))
    import subprocess
    subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', fichier + '.svg', fichier + '.png'], capture_output=True)
    return fichier + '.png'
