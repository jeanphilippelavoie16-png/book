"""Calque fidèle d'un dessin au trait : l'image agrandie, coupée en tons (trait foncé, trait pâle,
aplats), chaque ton passé à potrace en courbes de Bézier. Le trait garde l'épaisseur que le
dessinateur lui a donnée ; rien n'est redessiné, symétrisé ni « encré » par-dessus."""
import numpy as np, potrace
from PIL import Image
from scipy import ndimage as ndi
from skimage.morphology import remove_small_objects, disk


def gris(chemin, boite=None, k=4, sigma=0.5):
    """Luminance 0–255 agrandie k fois (bicubique), adoucie de sigma pixels d'origine."""
    im = Image.open(chemin).convert('RGB')
    if boite:
        im = im.crop(boite)
    g = im.convert('L').resize((im.width * k, im.height * k), Image.BICUBIC)
    G = np.asarray(g, float)
    return ndi.gaussian_filter(G, sigma * k) if sigma else G


def nettoyer(m, k, aire_min):
    """Enlève les miettes plus petites que aire_min pixels d'origine."""
    return remove_small_objects(m, max_size=int(aire_min * k * k))


def tons(G, k, fonce=150, pale=205, halo=0.6, miette_fonce=2.0, miette_pale=8.0):
    """Trait foncé = G < fonce ; trait pâle = G < pale, moins la frange des traits foncés."""
    f = nettoyer(G < fonce, k, miette_fonce)
    p = (G < pale) & ~ndi.binary_dilation(G < fonce, structure=disk(max(1, int(halo * k))))
    return f, nettoyer(p, k, miette_pale)


def chemin(masque, k, dx=0.0, dy=0.0, alphamax=1.0, opttol=0.2):
    """Masque → attribut d d'un path SVG, en pixels d'origine (remplissage evenodd)."""
    if not masque.any():
        return ''
    pl = potrace.Bitmap(~masque).trace(turdsize=2, alphamax=alphamax, opticurve=True, opttolerance=opttol)
    q = lambda p: f'{p.x / k + dx:.2f},{p.y / k + dy:.2f}'
    d = []
    for c in pl:
        d.append('M' + q(c.start_point))
        for s in c.segments:
            d.append(f'L{q(s.c)}L{q(s.end_point)}' if s.is_corner else f'C{q(s.c1)} {q(s.c2)} {q(s.end_point)}')
        d.append('Z')
    return ''.join(d)


def svg(fichier, l, h, couches, fond='#FFFFFF', rendre=True):
    """couches : liste de (d, couleur). Écrit fichier.svg et, si rendre, fichier.png (×2)."""
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {l:.0f} {h:.0f}" width="{l:.0f}" height="{h:.0f}">',
         f'<rect width="{l:.0f}" height="{h:.0f}" fill="{fond}"/>']
    s += [f'<path fill="{c}" fill-rule="evenodd" d="{d}"/>' for d, c in couches if d]
    s.append('</svg>')
    open(fichier + '.svg', 'w').write('\n'.join(s))
    if rendre:
        import subprocess
        subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js',
                        fichier + '.svg', fichier + '.png'], capture_output=True)
    return fichier + '.png'


def calque_tons(G, k, niveaux, cmax=219.0, rayon=2.2, miette=2.0, frac=0.5):
    """Calque d'un dessin au trait à plusieurs gris.

    Chaque trait est coupé à mi-chemin entre son cœur et le fond (seuil adaptatif), ce qui lui
    garde sa vraie épaisseur qu'il soit foncé ou pâle ; un cœur plus pâle que cmax est un
    filigrane et saute. frac < 0,5 amincit (petite image dont l'agrandissement épaissit le trait).
    Chaque pixel prend le gris du centre du trait le plus proche, puis le
    gris est ramené au niveau le plus proche de niveaux = [(borne_haute, couleur), …] (foncé
    d'abord). Rend [(masque, couleur)] du plus pâle au plus foncé, chaque couche pâle débordant
    un peu sous la plus foncée pour qu'aucun jour ne reste entre deux gris."""
    from skimage.morphology import skeletonize
    coeur = ndi.minimum_filter(G, footprint=disk(int(rayon * k)))
    encre = (G < coeur + frac * (255 - coeur)) & (coeur < cmax)
    encre = nettoyer(ndi.binary_opening(encre, structure=disk(1)), k, miette)
    sq = skeletonize(encre)
    vs = ndi.grey_erosion(G, footprint=disk(2))                                # gris au centre du trait
    # Un trait garde un seul gris d'une jonction à l'autre : un filigrane ou une compression ne
    # font que pâlir, donc on prend le gris le plus foncé qui revient (15e centile) sur la branche.
    nb = ndi.convolve(sq.astype(np.uint8), np.ones((3, 3), np.uint8), mode='constant') - 1
    jonc = ndi.binary_dilation(sq & (nb >= 3), structure=np.ones((3, 3))) & sq
    br, n = ndi.label(sq & ~jonc, structure=np.ones((3, 3)))
    ton_br = np.full(n + 1, 255.0)
    if n:
        idx = br[br > 0]; val = vs[br > 0]
        o = np.lexsort((val, idx)); idx, val = idx[o], val[o]
        debut = np.searchsorted(idx, np.arange(1, n + 1)); fin = np.searchsorted(idx, np.arange(1, n + 1), 'right')
        ton_br[1:] = val[np.minimum(debut + ((fin - debut) * 0.15).astype(int), fin - 1)]
    tsq = np.where(br > 0, ton_br[br], np.inf)
    for _ in range(3):                                                         # les jonctions prennent la branche la plus foncée
        tsq = np.where(jonc & np.isinf(tsq), ndi.grey_erosion(tsq, size=3), tsq)
    tsq[np.isinf(tsq) & sq] = vs[np.isinf(tsq) & sq]
    _, (iy, ix) = ndi.distance_transform_edt(~sq, return_indices=True)
    ton = np.where(sq, tsq, np.nan)[iy, ix]
    bornes = [b for b, _ in niveaux]
    niv = np.searchsorted(bornes, ton)                                         # 0 = le plus foncé
    niv[~encre] = -1
    couches = []
    for i in range(len(niveaux) - 1, -1, -1):
        m = niv == i
        if not m.any():
            continue
        plus_fonce = (niv >= 0) & (niv < i)
        m = m | (ndi.binary_dilation(m, structure=disk(3)) & plus_fonce)
        couches.append((m, niveaux[i][1]))
    return couches


def blanchir(chemin, boites, sortie):
    """Copie de l'image avec des rectangles passés au blanc (interface de navigateur, signature
    posée hors du dessin). Rend le chemin de la copie."""
    im = Image.open(chemin).convert('RGB')
    a = np.asarray(im).copy()
    for x0, y0, x1, y1 in boites:
        a[y0:y1, x0:x1] = 255
    Image.fromarray(a).save(sortie)
    return sortie


def calque_encre_ombre(chemin, k=6, sigma=0.35, cmax=160.0, rayon=2.0, miette=1.5,
                       sat_min=6, ombre_lisse=0.8, ombre_min=6.0):
    """Dessin à l'encre avec aplats d'ombre colorés (planche de croquis) : rend (encre, ombre),
    deux masques à l'échelle k. L'encre est coupée à mi-chemin cœur-fond ; l'ombre est ce qui
    est teinté sans être de l'encre, lissé, et passe un peu sous l'encre pour ne laisser aucun jour."""
    im = Image.open(chemin).convert('RGB')
    W, H = im.size
    big = im.resize((W * k, H * k), Image.BICUBIC)
    a = np.asarray(big, float)
    if sigma:
        a = ndi.gaussian_filter(a, (sigma * k, sigma * k, 0))
    G = a.mean(2); S = a.max(2) - a.min(2)
    coeur = ndi.minimum_filter(G, footprint=disk(int(rayon * k)))
    encre = (G < (coeur + 255) / 2) & (coeur < cmax)
    encre = nettoyer(ndi.binary_opening(encre, structure=disk(1)), k, miette)
    om = (S >= sat_min) & (G > 150) & (G < 243) & ~encre
    r = max(1, int(ombre_lisse * k))
    om = ndi.binary_closing(ndi.binary_opening(om, structure=disk(r)), structure=disk(r))
    om = nettoyer(om, k, ombre_min)
    om = om | (ndi.binary_dilation(om, structure=disk(int(1.2 * k))) & encre)
    return encre, om


def morceaux(masques, k, colle=3.0, part_min=0.04, marge=4):
    """Coupe une planche de modèles en dessins séparés. masques : liste de masques à l'échelle k
    (encre, ombre…). Deux taches à moins de colle pixels d'origine font partie du même dessin ;
    un groupe plus petit que part_min du plus grand (trait de mouvement, onomatopée, poussière)
    saute. Rend [(x0, y0, x1, y1)] en pixels d'origine, de gauche à droite puis de haut en bas
    par rangée."""
    tout = np.zeros_like(masques[0])
    for m in masques:
        tout |= m
    H, W = tout.shape[0] // k, tout.shape[1] // k
    petit = tout[:H * k, :W * k].reshape(H, k, W, k).any(axis=(1, 3))
    lab, n = ndi.label(ndi.binary_dilation(petit, structure=disk(max(1, int(colle)))))
    if not n:
        return [], lab
    aires = ndi.sum(petit, lab, index=np.arange(1, n + 1))
    boites = []
    for i, sl in enumerate(ndi.find_objects(lab)):
        if aires[i] < part_min * aires.max():
            continue
        y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        boites.append((max(0, x0 - marge), max(0, y0 - marge), min(W, x1 + marge), min(H, y1 + marge), i + 1))
    # rangées : un dessin dont le centre tombe dans la hauteur d'un autre est sur la même rangée
    boites.sort(key=lambda b: (b[1] + b[3]) / 2)
    rangees = []
    for b in boites:
        cy = (b[1] + b[3]) / 2
        if rangees and cy < max(r[3] for r in rangees[-1]) - 0.25 * (b[3] - b[1]):
            rangees[-1].append(b)
        else:
            rangees.append([b])
    ordre = [b for r in rangees for b in sorted(r, key=lambda b: b[0])]
    return ordre, lab


def isoler(masques, lab, etiquette, boite, k):
    """Les masques d'un seul dessin (son groupe), recadrés sur sa boîte, à l'échelle k."""
    x0, y0, x1, y1 = boite[:4]
    grp = np.kron(lab[y0:y1, x0:x1] == etiquette, np.ones((k, k), bool))
    return [m[y0 * k:y1 * k, x0 * k:x1 * k] & grp for m in masques]
