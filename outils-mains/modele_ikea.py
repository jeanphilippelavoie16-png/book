# Les mains-modèles au style notice : poses, objets, rendu. Usage : python3 modele_ikea.py <pose> [<vue>]
import sys, numpy as np, pickle, subprocess, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import main3d as M
from main3d import *
from scipy.ndimage import gaussian_filter1d
OUT = '/home/user/book/_reprise/scratchpad/modeles/ikea'; os.makedirs(OUT, exist_ok=True)
T = 1.25   # le seul poids de trait

def plan_boite(P, zh, x0, x1, y0, y1, ep=18):
    c = np.array([(x0+x1)/2, (y0+y1)/2, zh - ep/2]); h = np.array([(x1-x0)/2, (y1-y0)/2, ep/2])
    q = np.abs(P - c) - h
    return np.linalg.norm(np.maximum(q, 0), axis=-1) + np.minimum(np.max(q, axis=-1), 0)
def sphere(P, c, r): return np.linalg.norm(P - c, axis=-1) - r

def pose(nom):
    """Renvoie J (articulations), objets, et la liste des vues (nom, cam, up)."""
    if nom == 'prise':
        J = pickle.load(open('/tmp/claude-0/J.pkl', 'rb'))
        C = np.array([84., 2, -33]); AXE = unit([0.28, 1, 0])
        obj = [lambda P: cylindre(P, C, AXE, 16.0, 85)]
        cams = [('dos', rot((0,1,0), 15) @ rot((1,0,0), -30) @ np.array([0,0,1.]), AXE),
                ('paume', rot((1,0,0), -20) @ np.array([0,0,-1.]), AXE),
                ('profil', unit(AXE + 0.7*np.array([0,0,1.])), np.array([1.,0,0]))]
        return J, obj, cams
    if nom == 'pince':
        ang = {'index': (28, 40, 15), 'majeur': (75, 95, 50), 'annul': (80, 95, 50), 'auric': (82, 95, 50)}
        J = {D['nom']: doigt_joints(D, ang[D['nom']]) for D in DOIGTS}
        I = J['index']; dI = unit(I[3]-I[2]); dors = unit(np.cross(dI, [0, 1, 0]))
        pulpe_i = I[2] + 0.72*(I[3]-I[2]) - dors*(DOIGTS[0]['r'][3]*0.9)
        cible = pulpe_i - dors*(POUCE['r'][3]*0.95) + np.array([0, 3, 0])
        pp = ajuster_pouce(J, None, None, None, cible, poids_cible=10)
        J = finir(J, pp)
        dn = unit(rot([0, 1, 0], 55) @ dI)
        obj = [lambda P, c=pulpe_i - dors*2.0: capsule(P, c - 45*dn, c + 40*dn, 1.3, 0.8)]
        cams = [('profil', np.array([0, 1., 0]), np.array([0, 0, 1.])), ('avant', unit([0.5, 1., -0.5]), np.array([0, 0, 1.])), ('dessous', unit([0.2, 0.6, -1.]), np.array([1., 0, 0]))]
        return J, obj, cams
    if nom == 'boule':
        c = np.array([66., 0, -52]); r = 35.
        surf = lambda Q: np.linalg.norm(Q - c) - r
        pl = {n: (range(0, 61, 4), range(0, 81, 4), range(0, 61, 5)) for n in ('index', 'majeur', 'annul', 'auric')}
        ang = ajuster_doigts_surf(surf, pl)
        J = {D['nom']: doigt_joints(D, ang[D['nom']]) for D in DOIGTS}
        cible = c + (r + POUCE['r'][3]) * unit([0.25, 0.8, -0.55])
        pp = ajuster_pouce(J, None, None, None, cible, poids_cible=8, surf=surf)
        J = finir(J, pp)
        obj = [lambda P: sphere(P, c, r)]
        cams = [('profil', np.array([0, 1., 0]), np.array([0, 0, -1.])), ('cote', unit([0.4, -1., -0.6]), np.array([0, 0, -1.])), ('face', unit([1., 0.3, -0.8]), np.array([0, 0, -1.]))]
        return J, obj, cams
    if nom == 'appui':
        zp = -15.5
        surf = lambda Q: Q[2] - zp
        pl = {n: (range(-6, 21, 2), range(0, 21, 2), range(0, 16, 3)) for n in ('index', 'majeur', 'annul', 'auric')}
        ang = ajuster_doigts_surf(surf, pl)
        J = {D['nom']: doigt_joints(D, ang[D['nom']]) for D in DOIGTS}
        cible = np.array([62., 66, zp + POUCE['r'][3]])
        pp = ajuster_pouce(J, None, None, None, cible, poids_cible=8, surf=surf, cible_ip=np.array([48., 56, zp + POUCE['r'][2] + 1]))
        J = finir(J, pp)
        obj = [lambda P: plan_boite(P, zp, -60, 190, -90, 120)]
        cams = [('profil', np.array([0, 1., 0.25]), np.array([0, 0, 1.])),
                ('dos', rot((0,1,0), 20) @ np.array([0, 0, 1.]), np.array([1., 0, 0]))]
        return J, obj, cams
    raise SystemExit('pose inconnue')

def doux(c, s, ferme):
    mode = 'wrap' if ferme else 'nearest'
    return np.stack([gaussian_filter1d(c[:, 0], s, mode=mode), gaussian_filter1d(c[:, 1], s, mode=mode)], -1)

def rendu(nom, J, obj, vue, cam, up, px=0.3, flip=None):
    M.MANCHON = -25
    J = dict(J); J['ongles'] = []
    pcs = pieces(J, None, obj)
    w = -unit(cam); v_ = unit(-(up - (up @ w)*w)); u_ = np.cross(v_, w)
    # les doigts vers la droite de l'image
    if u_ @ np.array([1., 0, 0]) < -0.05: u_ = -u_
    if flip: u_ = -u_
    Rv = np.stack([u_, v_, w], 0)
    pts = np.vstack([np.array(J[k]) for k in ['index','majeur','annul','auric','pouce']] + [[[-55, 0, 0]], [[-55, 0, -20]], [[-55, 0, 20]]])
    uv = pts @ Rv[:2].T
    cad = (uv[:, 0].min()-30, uv[:, 0].max()+30, uv[:, 1].min()-30, uv[:, 1].max()+30)
    depth, ident, hit = rendre(pcs, Rv, cad, px=px)
    sil, lig = traits(depth, ident, hit, px, cad, seuil_meme=6.0, avec_objet=False)
    objm = (ident >= 90) & (ident < 100)
    man = [np.stack([cad[0] + (c[:, 1]-1)*px, cad[2] + (c[:, 0]-1)*px], -1) for c in measure.find_contours(np.pad(objm.astype(float), 1), 0.5) if len(c) > 8]
    W = cad[1]-cad[0]; H = cad[3]-cad[2]; K = 3
    sv = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W*K:.0f} {H*K:.0f}" width="{W*K:.0f}" height="{H*K:.0f}">',
          f'<rect width="{W*K:.0f}" height="{H*K:.0f}" fill="#fff"/>', f'<g transform="scale({K}) translate({-cad[0]:.1f},{-cad[2]:.1f})">',
          '<defs><pattern id="hb" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4" stroke="#1A1A1A" stroke-width="0.35"/></pattern></defs>']
    for c in man:
        sv.append(f'<path d="{svg_chemin(doux(c, 7, True), True)}" fill="url(#hb)" stroke="#1A1A1A" stroke-width="{T}" stroke-linejoin="round"/>')
    for c in lig:
        if len(c)*px < 5: continue
        sv.append(f'<path d="{svg_chemin(doux(c, 6, False))}" fill="none" stroke="#1A1A1A" stroke-width="{T}" stroke-linecap="round" stroke-linejoin="round"/>')
    for c in sil: sv.append(f'<path d="{svg_chemin(doux(c, 7, True), True)}" fill="none" stroke="#1A1A1A" stroke-width="{T}" stroke-linejoin="round"/>')
    sv.append('</g></svg>')
    f = f'{OUT}/{nom}-{vue}'
    open(f + '.svg', 'w').write('\n'.join(sv))
    subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', f + '.svg', f + '.png'], capture_output=True)
    return f + '.png'

if __name__ == '__main__':
    nom = sys.argv[1]
    J, obj, cams = pose(nom)
    pickle.dump(J, open(f'{OUT}/{nom}.pkl', 'wb'))
    for vue, cam, up in cams:
        if len(sys.argv) > 2 and vue != sys.argv[2]: continue
        print(rendu(nom, J, obj, vue, cam, up))
