"""La corde de bois du dos de la couverture du tome 2, plus longue que celle du devant (JP, 19 octobre 2026 : « ajoute
plus de bois, pas plus haut, mais sur une plus grande largeur »). Les mêmes bûches que la corde sous le poêle (corde.py :
ronds, demies, quartiers, un bouleau de temps en temps, deux rangs), à la même hauteur, mais sur N bûches de large au
lieu de sept. Écrit ../objet-corde-dos.png (8 points par unité, transparent, passé au même grain que les objets du
devant), que dos.py pose sur le filet du sommaire.
    python3 corde_dos.py [N]       (il faut Chromium dans /opt/pw-browsers)
"""
import os, sys, random
from PIL import Image

ICI = os.path.dirname(os.path.abspath(__file__))
os.chdir(ICI); sys.path.insert(0, ICI)
import corde
from svgkit import rendre
import numpy as np
from scipy import ndimage

def grain(o, sigma=1.1):
    """Le grain de objets_bas.py : un flou léger sur les couleurs prémultipliées (pas de frange)."""
    a = np.asarray(o).astype(float)
    al = a[..., 3:] / 255
    pre = a[..., :3] * al
    pre = np.stack([ndimage.gaussian_filter(pre[..., c], sigma) for c in range(3)], -1)
    al2 = ndimage.gaussian_filter(al[..., 0], sigma)[..., None]
    rgb = np.where(al2 > 1e-3, pre / np.maximum(al2, 1e-3), 0)
    out = np.concatenate([np.clip(rgb, 0, 255), np.clip(al2 * 255, 0, 255)], -1)
    return Image.fromarray(out.round().astype(np.uint8), 'RGBA')

N = int(sys.argv[1]) if len(sys.argv) > 1 else 12     # bûches au rang du bas
PAS = 26.4                                              # l'écart des bûches du devant
R = random.Random(19)

# le motif du rang du bas du devant, repris en boucle, chaque bûche un peu différente (rayon, angle de la fente)
BAS = [dict(t='rond', R=12), dict(t='demi', R=13, th=-95), dict(t='quart', R=16, th=-60, al=95),
       dict(t='rond', R=12, bouleau=True), dict(t='demi', R=13, th=-100), dict(t='quart', R=16, th=-55, al=95),
       dict(t='rond', R=12)]
HAUT = [dict(t='quart', R=12, th=-120, al=90), dict(t='rond', R=10), dict(t='demi', R=11, th=-80, pale=True),
        dict(t='quart', R=12, th=-100, al=90), dict(t='rond', R=10), dict(t='demi', R=11, th=-85)]

def varier(p):
    q = dict(p)
    q['R'] = p['R'] + R.choice((-1, 0, 0, 1))
    if 'th' in q:
        q['th'] = p['th'] + R.uniform(-12, 12)
    return q

x0 = corde.X0 + 14
pieces = [dict(varier(BAS[i % len(BAS)]), x=x0 + i * PAS) for i in range(N)]
# un seul bout crème au deuxième rang, comme au devant : les autres « pale » partent
haut = [dict(varier(HAUT[i % len(HAUT)]), x=x0 + 13 + i * PAS) for i in range(N - 1)]
for i, p in enumerate(haut):
    if p.get('pale') and i != (N - 1) // 2:
        p.pop('pale')
pieces += haut

corde.X1 = int(x0 + (N - 1) * PAS + 20)
corps, poses = corde.construire(pieces, seed=3)
rendre(corps, corde.X0, corde.Y0, corde.X1, corde.Y1, 'objet-corde-dos.png')
o = grain(Image.open('objet-corde-dos.png').convert('RGBA'))
os.remove('objet-corde-dos.png')
o = o.crop(o.getbbox())
o.save(os.path.join(os.path.dirname(ICI), 'objet-corde-dos.png'))
print('objet-corde-dos.png', o.size, '%d bûches' % len(poses))
