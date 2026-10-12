# -*- coding: utf-8 -*-
"""Remet les PDF sortis d'Edge aux cotes exactes de Blurb et y pose les boîtes
d'impression (TrimBox, BleedBox). Edge arrondit la page à 585,12 pt au lieu de 585 :
on ramène la MediaBox à la cote juste. Ce qui tombe, c'est 0,12 pt de grand fond,
où il n'y a rien.

    python source/finaliser_pdf.py
"""
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

DIR = Path(__file__).resolve().parent.parent
PT = 72.0
BL = 0.125 * PT


def interieur(src, dst):
    r = PdfReader(src)
    w = PdfWriter()
    # Ordre des pages du fichier : 213 R, 216 V, 217 R, 218 V, 219 R, 222 V, 223 R, puis tome 1 p. 3 R
    cotes = ["R", "V", "R", "V", "R", "V", "R", "R"]
    for i, p in enumerate(r.pages):
        W, H = 8.125 * PT, 10.25 * PT
        p.mediabox = RectangleObject([0, 0, W, H])
        p.bleedbox = RectangleObject([0, 0, W, H])
        if cotes[i] == "R":      # fond perdu au petit fond, à droite
            p.trimbox = RectangleObject([0, BL, 8 * PT, H - BL])
        else:                    # fond perdu à gauche
            p.trimbox = RectangleObject([BL, BL, W, H - BL])
        p.cropbox = RectangleObject([0, 0, W, H])
        w.add_page(p)
    w.compress_identical_objects()
    with open(dst, "wb") as f:
        w.write(f)


def couvertures(src, dst):
    r = PdfReader(src)
    w = PdfWriter()
    for p in r.pages:
        W = round(float(p.mediabox.width) / PT * 8) / 8 * PT
        H = round(float(p.mediabox.height) / PT * 8) / 8 * PT
        p.mediabox = RectangleObject([0, 0, W, H])
        p.cropbox = RectangleObject([0, 0, W, H])
        p.bleedbox = RectangleObject([0, 0, W, H])
        p.trimbox = RectangleObject([BL, BL, W - BL, H - BL])
        w.add_page(p)
    w.compress_identical_objects()
    with open(dst, "wb") as f:
        w.write(f)


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) == 2:
        (interieur if "interieur" in a[1] else couvertures)(a[0], a[1])
    else:
        print("usage : finaliser_pdf.py <pdf brut> <pdf final>")
