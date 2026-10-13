"""Repasse à l'encre les modèles décalqués (mains, femme, homme) et écrit avant/après."""
import numpy as np, os, sys, warnings
warnings.filterwarnings('ignore')
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.join(HERE, '..', '..', 'dessin-notice', 'scripts'))
from encrer import Dessin, Trait, Aplat, encrer, svg
from vers_dessin import traits_de, aplats_de, adoucir
from decalque import charger, masque_trait
from decalque_corps import couches, PEAU, CHEVEUX
from homme import homme_masques
from skimage.morphology import remove_small_objects

IMG = os.environ.get('NOTICE_IMAGES', '/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/images')
OUT = os.environ.get('NOTICE_SORTIE', '/home/user/book/_reprise/scratchpad/modeles/encre'); os.makedirs(OUT, exist_ok=True)
K = 8; ECH = 0.25

def femme(boite):
    fig, chev, tr, L = couches(f'{IMG}/2.png', boite, K)
    cols = np.nonzero(fig[int(70*K)])[0]; cx = (cols.min() + cols.max())/2*ECH
    d = Dessin(aplats=aplats_de(fig, ECH, PEAU) + aplats_de(chev, ECH, CHEVEUX), traits=traits_de(tr, ECH, 2.2*K))
    return d, cx, fig.shape

def homme(boite, face):
    fig, chev, tr, cx, slip, ajouts = homme_masques(f'{IMG}/2.png', boite, face, K)
    d = Dessin(aplats=aplats_de(fig, ECH, PEAU) + aplats_de(chev, ECH, CHEVEUX) + [Aplat(slip*ECH, '#DDE2E7', True)],
               traits=traits_de(tr, ECH, 2.2*K) + [Trait(p*ECH, r, False) for p, r in ajouts])
    return d, cx*ECH, fig.shape

def mains():
    rgb = charger(f'{IMG}/1.png', agrandir=6)
    m = remove_small_objects(masque_trait(rgb), max_size=40)
    d = Dessin(traits=traits_de(m, 0.5, 22, sigma=3.0))
    return d, rgb.shape

if __name__ == '__main__':
    quoi = sys.argv[1:] or ['corps', 'mains']
    if 'corps' in quoi:
        groupes = []; x = 30
        for nom, (d, cx, sh) in [('femme-face', femme((22, 22, 110, 311))), ('femme-dos', femme((148, 22, 236, 311))),
                                 ('homme-face', homme((22, 22, 110, 311), True)), ('homme-dos', homme((148, 22, 236, 311), False))]:
            el = encrer(d, echelle=1.3, sym=cx, lmin=4, djoin=6, dsnap=4, eps=2.0)
            groupes.append((x, 30, el)); x += sh[1]*ECH + 30
        print(svg(f'{OUT}/corps', x, 289*K*ECH + 60, groupes))
    if 'mains' in quoi:
        d, sh = mains()
        el = encrer(d, echelle=2.6, sym=None, lmin=8, djoin=10, dsnap=7, eps=3.0)
        print(svg(f'{OUT}/mains', sh[1]*0.5, sh[0]*0.5, [(0, 0, el)]))
