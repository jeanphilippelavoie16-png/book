"""Bibliothèque de modèles calqués pour les planches : chaque main (ou tête, ou corps) d'une
planche de référence devient un fichier images/modeles/<id>.svg avec deux chemins, en pixels de
l'image d'origine :

  silhouette  la forme pleine, en blanc dans la planche : elle cache ce qui passe derrière
  encre       le trait du dessinateur, en #1A1A1A

  python3 modeles.py kibbitzer|gestes|tous      écrit les modèles et une planche-contact numérotée

formes.modele() (planches/scripts/formes.js) les pose dans une planche : point d'ancrage, angle,
échelle, miroir, et des rectangles à effacer (le bâton d'origine quand la planche a le sien)."""
import os, sys, json, pickle
import numpy as np
from scipy import ndimage as ndi
from skimage.morphology import disk
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from vectoriser import gris, calque_tons, calque_encre_ombre, blanchir, chemin, morceaux, isoler, nettoyer, svg

IMG = os.environ.get('NOTICE_IMAGES', '/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/images')
TMP = os.environ.get('NOTICE_TMP', '/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/scratchpad')
OUT = '/home/user/book/images/modeles'
K = 6

# Fermetures de silhouette : un poignet laissé ouvert (deux traits qui s'arrêtent) ne se remplit pas
# tout seul ; on lui donne un segment, invisible, qui ne sert qu'au blanc. En pixels du modèle.
FERMER = json.load(open(os.path.join(OUT, 'fermetures.json'))) if os.path.exists(os.path.join(OUT, 'fermetures.json')) else {}


def trace_segment(m, k, a, b, ep=1.2):
    """Ajoute au masque m (échelle k) un segment de a à b (pixels du modèle)."""
    n = int(np.hypot(b[0] - a[0], b[1] - a[1]) * k * 2) + 2
    xs = np.linspace(a[0] * k, b[0] * k, n).astype(int); ys = np.linspace(a[1] * k, b[1] * k, n).astype(int)
    ok = (xs >= 0) & (ys >= 0) & (xs < m.shape[1]) & (ys < m.shape[0])
    t = np.zeros_like(m); t[ys[ok], xs[ok]] = True
    return m | ndi.binary_dilation(t, structure=disk(max(1, int(ep * k))))


def amincir(m, k, facteur=0.72, min_px=0.5):
    """Ramène l'épaisseur de chaque trait à facteur fois la sienne (au moins min_px pixels du
    modèle) : le gras relatif des traits reste, le noir du livre ne pèse pas plus que l'original."""
    from skimage.morphology import skeletonize
    if facteur >= 1 or not m.any():
        return m
    dt = ndi.distance_transform_edt(m)
    sq = skeletonize(m)
    d_sq, (iy, ix) = ndi.distance_transform_edt(~sq, return_indices=True)
    demi = dt[iy, ix]                                  # demi-épaisseur du trait le plus proche
    return m & (d_sq <= np.maximum(min_px * k / 2, facteur * demi))


def trait_px(m, k):
    """L'épaisseur du contour (les traits les plus gras : 90e centile), en pixels du modèle."""
    from skimage.morphology import skeletonize
    if not m.any():
        return 1.0
    dt = ndi.distance_transform_edt(m)
    sq = skeletonize(m)
    w = 2 * dt[sq] / k
    return float(np.percentile(w, 90)) if w.size else 1.0


def silhouette(encre, ombre, k, fermetures=()):
    s = encre | ombre
    for a, b in fermetures:
        s = trace_segment(s, k, a, b)
    s = ndi.binary_closing(s, structure=disk(int(1.2 * k)))
    s = ndi.binary_fill_holes(s)
    return nettoyer(s, k, 30)


def ecrire(ident, encre, ombre, k, boite, source, poids=1.0, sil=None):
    x0, y0, x1, y1 = boite[:4]
    if sil is None:
        sil = silhouette(encre, ombre, k, FERMER.get(ident.split('@')[0], []))
    encre = amincir(encre, k, poids)
    d_sil, d_enc = chemin(sil, k, alphamax=1.2), chemin(encre, k)
    tr = trait_px(encre, k)
    l, h = x1 - x0, y1 - y0
    open(os.path.join(OUT, ident + '.svg'), 'w').write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {l} {h}" width="{l}" height="{h}" '
        f'data-source="{source}" data-boite="{x0} {y0} {x1} {y1}" data-trait="{tr:.2f}">\n'
        f'<path id="silhouette" fill="#FFFFFF" fill-rule="evenodd" d="{d_sil}"/>\n'
        f'<path id="encre" fill="#1A1A1A" fill-rule="evenodd" d="{d_enc}"/>\n</svg>\n')
    return l, h, d_sil, d_enc


# Chaque modèle s'écrit à plusieurs poids de trait (id, id@50, id@35…) : formes.modele() prend
# celui dont le contour, à l'échelle de la planche, tombe le plus près du trait voulu (1,3).
POIDS = {'k': [0.72, 0.5, 0.35, 0.25], 'g': [1.0, 0.7, 0.5], 's': [1.0, 0.75, 0.55, 0.4]}


def serie(prefixe, masques, k, source, colle=3.0, poids=1.0):
    boites, lab = morceaux(masques, k, colle=colle)
    fiches = []
    for i, b in enumerate(boites, 1):
        ident = f'{prefixe}{i:02d}'
        enc, om = (isoler(masques, lab, b[4], b, k) + [np.zeros(1, bool)])[:2] if len(masques) > 1 else (isoler(masques, lab, b[4], b, k)[0], None)
        if om is None or om.shape != enc.shape:
            om = np.zeros_like(enc)
        sil = silhouette(enc, om, k, FERMER.get(ident, []))
        poids_l = POIDS.get(prefixe, [poids])
        l, h, ds, de = ecrire(ident, enc, om, k, b, source, poids_l[0], sil)
        fiches.append((ident, b[:4], l, h, ds, de))
        for p2 in poids_l[1:]:
            ecrire(f'{ident}@{round(p2 * 100)}', enc, om, k, b, source, p2, sil)
        print(ident, b[:4])
    return fiches


def contact(nom, fiches, larg=1400, col=6):
    """Planche-contact : chaque modèle dans sa case, son numéro dessous."""
    case = larg / col
    lignes = (len(fiches) + col - 1) // col
    H = lignes * (case + 24) + 20
    els = [f'<rect width="{larg}" height="{H:.0f}" fill="#FFFFFF"/>']
    for n, (ident, b, l, h, ds, de) in enumerate(fiches):
        cx, cy = (n % col) * case, (n // col) * (case + 24) + 10
        s = min((case - 20) / l, (case - 20) / h)
        tx, ty = cx + (case - l * s) / 2, cy + (case - h * s) / 2
        els.append(f'<g transform="translate({tx:.1f},{ty:.1f}) scale({s:.3f})"><path fill="#E8E8E8" d="{ds}"/><path fill="#1A1A1A" d="{de}"/></g>')
        els.append(f'<text x="{cx + case / 2:.0f}" y="{cy + case + 14:.0f}" font-family="Georgia" font-size="16" text-anchor="middle" fill="#1A1A1A">{ident}</text>')
    f = os.path.join(TMP, nom)
    open(f + '.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {larg} {H:.0f}" width="{larg}" height="{H:.0f}">' + ''.join(els) + '</svg>')
    import subprocess
    subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', f + '.svg', f + '.png'], capture_output=True)
    return f + '.png'


def kibbitzer():
    pk = os.path.join(TMP, 'mains4-masques.pkl')
    if os.path.exists(pk):
        encre, om = pickle.load(open(pk, 'rb'))
    else:
        src = blanchir(f'{IMG}/4.png', [(0, 0, 544, 15), (0, 748, 130, 778), (510, 690, 544, 778), (145, 616, 416, 642)],
                       os.path.join(TMP, 'mains4-propre.png'))
        encre, om = calque_encre_ombre(src, K)
        pickle.dump((encre, om), open(pk, 'wb'))
    return serie('k', [encre, om], K, '4.png (Kibbitzer)')


def gestes():
    pk = os.path.join(TMP, 'mains1-tons.pkl')
    if os.path.exists(pk):
        encre = pickle.load(open(pk, 'rb'))
    else:
        NIV = [(100, '#454545'), (135, '#616161'), (170, '#808080'), (215, '#ABABAB')]
        cs = calque_tons(gris(f'{IMG}/1.png', None, K, sigma=0.2), K, NIV, cmax=215.0, rayon=1.6, miette=0.6, frac=0.36)
        encre = np.zeros_like(cs[0][0])
        for m, _ in cs:
            encre |= m
        pickle.dump(encre, open(pk, 'wb'))
    return serie('g', [encre], K, '1.png (gestes)', colle=2.0)


def shoo():
    """La planche de mains de shoo_arts (iStock, 5.jpg), la plus propre : trait égal et fin. La
    bande du filigrane est ramenée au blanc avant le calque (vectoriser.sous_bande)."""
    from vectoriser import sous_bande
    pk = os.path.join(TMP, 'mains5-tons.pkl')
    if os.path.exists(pk):
        encre = pickle.load(open(pk, 'rb'))
    else:
        src = sous_bande(f'{IMG}/5.jpg', (586, 641, 1001, 725), os.path.join(TMP, 'mains5-propre.png'), masques=[(0, 990, 120, 1024)])
        NIV = [(110, '#2E2E2E'), (165, '#6E6E6E'), (205, '#9C9C9C')]
        cs = calque_tons(gris(src, None, 4, sigma=0.45), 4, NIV, cmax=205.0, rayon=2.0, miette=3.0)
        encre = np.zeros_like(cs[0][0])
        for m, _ in cs:
            encre |= m
        pickle.dump(encre, open(pk, 'wb'))
    return serie('s', [encre], 4, '5.jpg (shoo_arts, iStock)', colle=3.0)


if __name__ == '__main__':
    quoi = sys.argv[1:] or ['tous']
    if quoi[0] in ('kibbitzer', 'tous'):
        print(contact('contact-kibbitzer', kibbitzer(), col=5))
    if quoi[0] in ('gestes', 'tous'):
        print(contact('contact-gestes', gestes(), col=8))
    if quoi[0] in ('shoo', 'tous'):
        print(contact('contact-shoo', shoo(), col=6))
