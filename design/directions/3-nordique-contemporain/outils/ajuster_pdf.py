# -*- coding: utf-8 -*-
"""Ramene les pages du PDF aux dimensions exactes du calculateur Blurb (Chromium arrondit
au pixel) et pose TrimBox / BleedBox. Interieur : fond perdu 0,125 po en tete, en pied et
au petit fond seulement ; page 1 = belle page (recto). Couvertures : fond perdu 0,306 po."""
import sys, pathlib
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

D = pathlib.Path(__file__).resolve().parents[1]
PT = 72.0


def interieur(path):
    r = PdfReader(path); w = PdfWriter()
    W, H, b = 8.125 * PT, 10.25 * PT, 0.125 * PT
    for i, p in enumerate(r.pages):
        p.mediabox = RectangleObject([0, 0, W, H]); p.cropbox = RectangleObject([0, 0, W, H])
        p.bleedbox = RectangleObject([0, 0, W, H])
        recto = (i % 2 == 0) if FOLIOS is None else (FOLIOS[i] % 2 == 1)
        p.trimbox = RectangleObject([0, b, W - b, H - b] if recto else [b, b, W, H - b])
        w.add_page(p)
    w.write(path)


def couvertures(path):
    r = PdfReader(path); w = PdfWriter()
    b = 0.306 * PT; H = 10.986 * PT
    for i, p in enumerate(r.pages):
        W = 18.347 * PT if float(p.mediabox.width) > 1000 else (8.2495 + 0.306) * PT
        p.mediabox = RectangleObject([0, 0, W, H]); p.cropbox = RectangleObject([0, 0, W, H])
        p.bleedbox = RectangleObject([0, 0, W, H])
        p.trimbox = RectangleObject([b, b, W - b, H - b] if W > 1000 else [0, b, W - b, H - b])
        w.add_page(p)
    w.write(path)


FOLIOS = [11, 311, 312, 313, 314, 315, 318, 319]
if __name__ == '__main__':
    quoi = sys.argv[1]
    if quoi == 'interieur':
        interieur(D / 'interieur.pdf')
    else:
        couvertures(D / 'couvertures.pdf')
    print('ajuste', quoi)
