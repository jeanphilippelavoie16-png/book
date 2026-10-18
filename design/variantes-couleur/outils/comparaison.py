# -*- coding: utf-8 -*-
"""Planche de comparaison des trois variantes : une rangée par variante, trois pages par rangée.
    python comparaison.py   -> design/variantes-couleur/comparaison.jpg (< 3 Mo)"""
import os
from PIL import Image, ImageDraw, ImageFont
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
F = r"C:\Windows\Fonts"
def font(style, size):
    # Bahnschrift (DIN étroit, livré avec Windows) : la plus proche du Plex Sans Condensed sous la main
    f = ImageFont.truetype(os.path.join(F, "bahnschrift.ttf"), size)
    try:
        f.set_variation_by_name(style)
    except Exception:
        pass
    return f
BOLD = "Bold Condensed"
REG = "Condensed"

ROWS = [("A", "Discrète", "La couleur du tome en accent :\ncarrés de section, filets,\nnuméros d’étape, titre courant,\néchelle, onglet mince en tête.\nFonds blancs partout."),
        ("B", "Affirmée", "A, plus :\nl’aplat de la couverture du tome\nà l’ouverture, chiffre géant ;\nsection 9 dans la couleur du tome ;\nteintes sous les tableaux et\nles encadrés ; onglet numéroté\nqui se voit livre fermé."),
        ("C", "Avec du caractère", "B, plus :\npictogrammes au trait (lieu,\ndanger, minuteur, thermomètre) ;\nchiffres clés en exergue ;\ntrame fine hachurée sur\nles aplats, comme les planches.")]
COLS = [("1-ouverture", "Ouverture · 13-1"), ("2-procedure", "Procédure · 13-5"), ("3-urgence", "Variante d’urgence · 13-14")]
PW, PH = 600, 750
LW, TOP, GAP, RG, M = 330, 170, 22, 56, 40
W = M + LW + 3 * PW + 2 * GAP + M
H = TOP + 3 * PH + 2 * RG + M
img = Image.new("RGB", (W, H), "#D8DADB")
d = ImageDraw.Draw(img)
d.text((M, 28), "LE MANUEL DU NORD · INTÉRIEUR · TROIS VARIANTES DE COULEUR · CH. 13, TOME 1 (NEIGE)", font=font(BOLD, 40), fill="#15222B")
d.text((M, 80), "Texte courant noir sur blanc dans les trois. Le rouge reste au danger seul. Pages rognées 8 × 10 po.", font=font(REG, 26), fill="#333")
for j, (_, lab) in enumerate(COLS):
    x = M + LW + j * (PW + GAP)
    d.text((x, TOP - 36), lab.upper(), font=font(BOLD, 26), fill="#15222B")
for i, (v, name, desc) in enumerate(ROWS):
    y = TOP + i * (PH + RG)
    d.rectangle([M, y, M + 64, y + 64], fill="#2B5876")
    d.text((M + 32, y + 32), v, font=font(BOLD, 48), fill="#fff", anchor="mm")
    d.text((M, y + 80), name.upper(), font=font(BOLD, 34), fill="#15222B")
    d.multiline_text((M, y + 130), desc, font=font(REG, 23), fill="#333", spacing=7)
    for j, (f, _) in enumerate(COLS):
        x = M + LW + j * (PW + GAP)
        pg = Image.open(os.path.join(OUT, f"{v}-{f}.png")).convert("RGB").resize((PW, PH), Image.LANCZOS)
        d.rectangle([x - 1, y - 1, x + PW, y + PH], outline="#9A9C9E")
        img.paste(pg, (x, y))
dst = os.path.join(OUT, "comparaison.jpg")
for q in (88, 82, 76, 70):
    img.save(dst, quality=q, optimize=True)
    if os.path.getsize(dst) < 3 * 1024 * 1024:
        break
print(dst, img.size, round(os.path.getsize(dst) / 1e6, 2), "Mo, qualité", q)
