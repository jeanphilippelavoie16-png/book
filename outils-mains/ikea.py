# Mains au style « notice de montage » : tubes à contour net, trait unique, manche au poignet.
# Les positions viennent de la main 3D (main3d.py) ; le dessin est plat.
import sys, numpy as np, pickle
sys.path.insert(0, '/home/user/book/outils-mains')
from main3d import *

TRAIT = 1.35          # un seul poids de trait, comme une notice
NOIR = '#1A1A1A'

def projeter(Rv, P): P = np.atleast_2d(P); return P @ Rv[:2].T, P @ Rv[2]

def tube(pts, r, z):
    """Un doigt : liste de points 2D et rayons ; rendu en deux passes (noir large puis blanc)."""
    return dict(pts=pts, r=r, z=z)

def svg_tube_passes(t):
    d = 'M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in t['pts'])
    w = 2*np.mean(t['r'])
    return (f'<path d="{d}" fill="none" stroke="{NOIR}" stroke-width="{w + 2*TRAIT:.2f}" stroke-linecap="round" stroke-linejoin="round"/>',
            f'<path d="{d}" fill="none" stroke="#fff" stroke-width="{w:.2f}" stroke-linecap="round" stroke-linejoin="round"/>')

def forme(pts, ferme=True):
    d = 'M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in pts) + (' Z' if ferme else '')
    return f'<path d="{d}" fill="#fff" stroke="{NOIR}" stroke-width="{TRAIT}" stroke-linejoin="round"/>'
