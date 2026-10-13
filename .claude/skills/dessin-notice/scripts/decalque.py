"""decalque.py — décalquer un dessin au trait (image) en traits vectoriels nets.

Le dessin d'un vrai illustrateur porte la justesse ; ce script n'y ajoute que la netteté :
1. agrandir l'image et isoler le trait (pixels foncés) ;
2. réduire chaque trait à sa ligne centrale (squelette) ;
3. suivre ces lignes de bout en bout (d'extrémité en jonction) ;
4. les lisser et les ajuster en courbes de Bézier (courbes.py) ;
5. les redessiner d'un trait égal, à la taille voulue.
Les aplats (peau, cheveux) se décalquent à part : leur contour devient une forme remplie.
"""
import numpy as np, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from PIL import Image
from skimage.morphology import skeletonize, remove_small_objects
from skimage import measure
from courbes import courbes, svg_d

def charger(chemin, boite=None, agrandir=6):
    im = Image.open(chemin).convert('RGBA')
    fond = Image.new('RGBA', im.size, (255, 255, 255, 255)); fond.alpha_composite(im); im = fond.convert('RGB')
    if boite: im = im.crop(boite)
    im = im.resize((im.width*agrandir, im.height*agrandir), Image.LANCZOS)
    return np.asarray(im).astype(float) / 255.0

def masque_trait(rgb, seuil=0.80):
    L = 0.299*rgb[..., 0] + 0.587*rgb[..., 1] + 0.114*rgb[..., 2]
    sat = rgb.max(-1) - rgb.min(-1)
    return (L < seuil) & (sat < 0.25)          # le trait est foncé et neutre (pas les cheveux bruns)

def masque_aplat(rgb, seuil_blanc=0.93):
    L = 0.299*rgb[..., 0] + 0.587*rgb[..., 1] + 0.114*rgb[..., 2]
    return L < seuil_blanc

VOIS = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]

def chemins_squelette(sq, long_min=6):
    """Suit le squelette : renvoie des listes de points (ligne, colonne) d'un nœud à l'autre."""
    H, W = sq.shape; pts = set(zip(*np.nonzero(sq)))
    def voisins(p):
        return [(p[0]+a, p[1]+b) for a, b in VOIS if (p[0]+a, p[1]+b) in pts]
    deg = {p: len(voisins(p)) for p in pts}
    noeuds = {p for p, d in deg.items() if d != 2}
    vu_arete = set(); out = []
    def marcher(a, b):
        chemin = [a, b]; prev, cur = a, b
        while cur not in noeuds:
            nx = [q for q in voisins(cur) if q != prev and (min(cur, q), max(cur, q)) not in vu_arete]
            if not nx: break
            nxt = nx[0]; vu_arete.add((min(cur, nxt), max(cur, nxt)))
            prev, cur = cur, nxt; chemin.append(cur)
            if cur == a: break
        return chemin
    for n in noeuds:
        for v in voisins(n):
            e = (min(n, v), max(n, v))
            if e in vu_arete: continue
            vu_arete.add(e); c = marcher(n, v)
            if len(c) >= long_min: out.append(np.array(c, float))
    # boucles sans nœud
    reste = {p for p in pts if deg[p] == 2 and not any((min(p, q), max(p, q)) in vu_arete for q in voisins(p))}
    while reste:
        p = reste.pop(); v = voisins(p)
        if not v: continue
        vu_arete.add((min(p, v[0]), max(p, v[0]))); c = marcher(p, v[0])
        for q in c: reste.discard(q)
        if len(c) >= long_min: out.append(np.array(c, float))
    return out

def decalquer(rgb, echelle=1.0, ep=1.0, tol=0.6, aplat=None, couleur_aplat='#F2E2D2', fondre=1.6, ferme_dist=3.0, ergot=22):
    """Renvoie la liste des éléments SVG (coordonnées en pixels agrandis × echelle)."""
    m = masque_trait(rgb)
    m = remove_small_objects(m, max_size=40)
    sq = skeletonize(m)
    paths = chemins_squelette(sq, long_min=8)
    # les ergots : petites branches du squelette qui partent d'un trait (bruit du tracé)
    def longueur(c): return np.sum(np.linalg.norm(np.diff(c, axis=0), axis=1))
    paths = [c for c in paths if longueur(c) >= ergot]
    out = []
    if aplat is not None:
        for c in measure.find_contours(np.pad(aplat.astype(float), 1), 0.5):
            if len(c) < 40: continue
            P = np.stack([c[:, 1]-1, c[:, 0]-1], 1)*echelle
            out.append(f'<path d="{svg_d(courbes(P, tol*2, True, sigma=fondre*2), True)}" fill="{couleur_aplat}" stroke="none"/>')
    for c in paths:
        P = np.stack([c[:, 1], c[:, 0]], 1)*echelle
        ferme = len(P) > 10 and np.linalg.norm(P[0]-P[-1]) < ferme_dist*echelle
        d = svg_d(courbes(P, tol*echelle, ferme, sigma=fondre*echelle), ferme)
        if d: out.append(f'<path d="{d}" fill="none" stroke="#1A1A1A" stroke-width="{ep}" stroke-linecap="round" stroke-linejoin="round"/>')
    return out

def composants(rgb, marge=4, aire_min=400):
    """Les dessins séparés d'une planche (une main, un corps) : boîtes englobantes."""
    m = masque_aplat(rgb, 0.97)
    from scipy.ndimage import binary_dilation, label, find_objects
    m = binary_dilation(m, iterations=marge*3)
    lab, n = label(m)
    boites = [s for s in find_objects(lab) if s is not None]
    return [b for b in boites if (b[0].stop-b[0].start)*(b[1].stop-b[1].start) > aire_min]
