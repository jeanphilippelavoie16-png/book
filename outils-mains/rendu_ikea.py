# Rendu « notice » : silhouette 3D très lissée, un seul poids de trait, manche de chandail, peu de lignes.
import sys, numpy as np, pickle, subprocess
sys.path.insert(0, '/home/user/book/outils-mains')
import main3d as M
from main3d import *
from scipy.ndimage import gaussian_filter1d
J = pickle.load(open(sys.argv[1], 'rb')); vue = sys.argv[2]; out = sys.argv[3]
tour = float(sys.argv[4]); incl = float(sys.argv[5]); M.MANCHON = -25
R = 16.0; C = np.array([84., 2, -33]); AXE = unit([0.28, 1, 0])
J['ongles'] = []   # pas d'ongles dans une notice
pcs = pieces(J, manche=(C, AXE, R, 160))
up = AXE
cam = np.array([0, 0, -1.]) if vue == 'paume' else np.array([0, 0, 1.])
cam = rot((1, 0, 0), -tour) @ cam; cam = rot((0, 1, 0), incl) @ cam
if vue == 'profil': cam = unit(AXE); up = np.array([0, 0, 1.])
w = -unit(cam); v_ = unit(-(up - (up @ w)*w)); u_ = np.cross(v_, w)
if u_ @ np.array([1., 0, 0]) < 0 and vue != 'profil': u_ = -u_
if vue == 'profil': u_ = -u_
Rv = np.stack([u_, v_, w], 0)
pts = np.vstack([np.array(J[k]) for k in ['index','majeur','annul','auric','pouce']] + [[[-60, 0, 0]], [C + 70*AXE], [C - 70*AXE]])
uv = pts @ Rv[:2].T
cad = (uv[:, 0].min()-25, uv[:, 0].max()+25, uv[:, 1].min()-25, uv[:, 1].max()+25)
px = 0.3
depth, ident, hit = rendre(pcs, Rv, cad, px=px)
sil, lig = traits(depth, ident, hit, px, cad, seuil_meme=6.0)
def doux(c, s, ferme):
    mode = 'wrap' if ferme else 'nearest'
    return np.stack([gaussian_filter1d(c[:, 0], s, mode=mode), gaussian_filter1d(c[:, 1], s, mode=mode)], -1)
W = cad[1]-cad[0]; H = cad[3]-cad[2]; K = 3
man = [np.stack([cad[0] + (c[:, 1]-1)*px, cad[2] + (c[:, 0]-1)*px], -1) for c in measure.find_contours(np.pad((ident == 9).astype(float), 1), 0.5) if len(c) > 8]
T = 1.25
sv = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W*K:.0f} {H*K:.0f}" width="{W*K:.0f}" height="{H*K:.0f}">',
      f'<rect width="{W*K:.0f}" height="{H*K:.0f}" fill="#fff"/>', f'<g transform="scale({K}) translate({-cad[0]:.1f},{-cad[2]:.1f})">',
      '<defs><pattern id="hb" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4" stroke="#1A1A1A" stroke-width="0.35"/></pattern></defs>']
for c in man: sv.append(f'<path d="{svg_chemin(doux(c, 2, True), True)}" fill="url(#hb)" stroke="none"/>')
for c in lig:
    if len(c) * px < 4: continue
    sv.append(f'<path d="{svg_chemin(doux(c, 6, False))}" fill="none" stroke="#1A1A1A" stroke-width="{T}" stroke-linecap="round" stroke-linejoin="round"/>')
for c in sil: sv.append(f'<path d="{svg_chemin(doux(c, 7, True), True)}" fill="none" stroke="#1A1A1A" stroke-width="{T}" stroke-linejoin="round"/>')
sv.append('</g></svg>')
open(out.replace('.png', '.svg'), 'w').write('\n'.join(sv))
subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', out.replace('.png', '.svg'), out], capture_output=True)
print('ok', out)
