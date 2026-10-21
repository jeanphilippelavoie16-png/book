"""Tome 1, page de titre : la chaîne de retouche (JP, 19 octobre 2026 : « reprends exactement la même image, mais
applique la même rigueur de qualité que les autres tomes »).

La même image, zone par zone, dans cet ordre : le ciel (étoiles et lune), les crêtes orange, les collines et la ligne
d'arbres, le champ de neige et la trace, le chalet, les épinettes du premier plan. Chaque module est dans retouche/ et
dit, en tête, ce qu'il change et ce qu'il laisse. Les modules du ciel et des crêtes relèvent leurs contours sur
l'image d'origine (titre-tome-1-original.jpg, à côté de ce fichier) : la source se donne donc toujours en 3072 × 3840.

    python3 retouche_tome1.py SOURCE SORTIE [--etapes DOSSIER]

SORTIE est un JPEG de qualité 95, sans sous-échantillonnage des couleurs. Avec --etapes, l'image après chaque module
est aussi écrite dans DOSSIER (PNG), pour regarder les raccords d'une zone à l'autre.
"""
import argparse
import importlib.util
import os
import sys
import time

import numpy as np
from PIL import Image

ICI = os.path.dirname(os.path.abspath(__file__))
DOSSIER = os.path.join(ICI, 'retouche')
ORDRE = ('ciel', 'cretes', 'collines', 'neige', 'chalet', 'epinettes')


def module(nom):
    """Le module retouche/NOM.py, chargé par son chemin (le dossier n'a pas à être un paquet)."""
    spec = importlib.util.spec_from_file_location('t1_retouche_' + nom, os.path.join(DOSSIER, nom + '.py'))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def retoucher(a, etapes=None):
    """Applique les six modules dans l'ordre à a (RVB uint8, 3840 × 3072) ; rend l'image retouchée."""
    if a.shape[:2] != (3840, 3072):
        raise SystemExit(f'la source doit faire 3072 × 3840 (elle fait {a.shape[1]} × {a.shape[0]})')
    K = a.shape[1] // 768
    for i, nom in enumerate(ORDRE, 1):
        t0 = time.time()
        b = module(nom).appliquer(a, K)
        b = np.asarray(b, np.uint8)
        assert b.shape == a.shape, nom
        change = np.any(b != a, axis=2)
        print(f'{i}. {nom:<10} {time.time() - t0:6.1f} s, {change.mean() * 100:5.2f} % des pixels touchés', flush=True)
        a = b
        if etapes:
            Image.fromarray(a).save(os.path.join(etapes, f'{i}-{nom}.png'))
    return a


def main():
    p = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    p.add_argument('source')
    p.add_argument('sortie')
    p.add_argument('--etapes', help="dossier où écrire l'image après chaque module")
    o = p.parse_args()
    if o.etapes:
        os.makedirs(o.etapes, exist_ok=True)
    a = np.asarray(Image.open(o.source).convert('RGB'))
    b = retoucher(a, o.etapes)
    Image.fromarray(b).save(o.sortie, quality=95, subsampling=0)
    print('ok', o.sortie)


if __name__ == '__main__':
    sys.exit(main())
