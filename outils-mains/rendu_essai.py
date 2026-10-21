import sys, numpy as np, time, subprocess
sys.path.insert(0, '/home/user/book/outils-mains')
from main3d import *
import pickle; J = pickle.load(open('/tmp/claude-0/J.pkl', 'rb'))
R = 16.0; C = np.array([84., 2, -33]); AXE = unit([0.28, 1, 0])
pcs = pieces(J, manche=(C, AXE, R, 160))
vue = sys.argv[1]; out = sys.argv[2]; tour = float(sys.argv[3]) if len(sys.argv) > 3 else 0; incl = float(sys.argv[4]) if len(sys.argv) > 4 else 0
# vues : 'dos' = on regarde le dos de la main (caméra côté +Z), manche vertical à l'écran
up = AXE  # le haut de l'écran = bout index du manche
import math
# caméra : position sur la sphère, en angles depuis le dos de la main (+Z) :
# tour = vers le pouce (+Y), incl = vers les doigts (+X)
if vue == 'paume': cam = np.array([0, 0, -1.])
else: cam = np.array([0, 0, 1.])
cam = rot((1, 0, 0), -tour) @ cam; cam = rot((0, 1, 0), incl) @ cam
if vue == 'profil': cam = unit(AXE); up = np.array([0, 0, 1.])
w = -unit(cam)
v_ = unit(-(up - (up @ w)*w)); u_ = np.cross(v_, w)
if u_ @ np.array([1., 0, 0]) < 0 and vue != 'profil': u_ = -u_; 
Rv = np.stack([u_, v_, w], 0)
# cadre : projette des points de la main
pts = np.vstack([np.array(J[k]) for k in ['index','majeur','annul','auric','pouce']] + [[[-60, 0, 0]], [C + 70*AXE], [C - 70*AXE]])
uv = pts @ Rv[:2].T
cad = (uv[:, 0].min()-25, uv[:, 0].max()+25, uv[:, 1].min()-25, uv[:, 1].max()+25)
px = 0.35; t0 = time.time()
depth, ident, hit = rendre(pcs, Rv, cad, px=px)
print('rendu', time.time()-t0, hit.mean())
sil, lig = traits(depth, ident, hit, px, cad)
W = cad[1]-cad[0]; H = cad[3]-cad[2]
# manche : contours de la zone visible du manche, hachuré
man = [ (np.stack([cad[0] + (c[:, 1]-1)*px, cad[2] + (c[:, 0]-1)*px], -1)) for c in measure.find_contours(np.pad((ident == 9).astype(float), 1), 0.5) if len(c) > 8]
K = 3
sv = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W*K:.0f} {H*K:.0f}" width="{W*K:.0f}" height="{H*K:.0f}">',
      f'<rect width="{W*K:.0f}" height="{H*K:.0f}" fill="#fff"/>', f'<g transform="scale({K}) translate({-cad[0]:.1f},{-cad[2]:.1f})">',
      '<defs><pattern id="hb" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4" stroke="#1A1A1A" stroke-width="0.35"/></pattern></defs>']
for c in man: sv.append(f'<path d="{svg_chemin(chaikin(c,1), True)}" fill="url(#hb)" stroke="none"/>')
for c in lig: sv.append(f'<path d="{svg_chemin(chaikin(lisser(c,4),2))}" fill="none" stroke="#1A1A1A" stroke-width="0.55" stroke-linecap="round" stroke-linejoin="round"/>')
for c in sil: sv.append(f'<path d="{svg_chemin(chaikin(lisser(c,5,True),2,True), True)}" fill="none" stroke="#1A1A1A" stroke-width="1.1" stroke-linejoin="round"/>')
sv.append('</g></svg>')
open(out.replace('.png', '.svg'), 'w').write('\n'.join(sv))
subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', out.replace('.png', '.svg'), out], capture_output=True)
print('ok', out)
