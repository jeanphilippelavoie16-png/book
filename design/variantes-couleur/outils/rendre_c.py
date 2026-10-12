# -*- coding: utf-8 -*-
# Monte des chapitres complets dans le design retenu (variante C) : PDF + une PNG par page.
#   python rendre_c.py 12 27 43 ...   -> design/epreuves-livre/C/NN.pdf et C/NN/page-XX.png
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import variante as v

bc = v.bc
SRC = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "..", "epreuves-livre"))
bc.OUTD = os.path.join(SRC, "C")
os.makedirs(bc.OUTD, exist_ok=True)
# le constructeur lit placements.json dans son dossier de sortie : on y garde la copie du jour
import shutil
if os.path.exists(os.path.join(SRC, "placements.json")):
    shutil.copy(os.path.join(SRC, "placements.json"), os.path.join(bc.OUTD, "placements.json"))
for num in sys.argv[1:]:
    bc.OUTD = SRC                      # variante.build prend placements.json là, puis déplace OUTD
    dst = v.build(num, "C", 0)
    bc.OUTD = os.path.join(SRC, "C")   # le rendu (PDF, PNG) va dans epreuves-livre/C
    bc.rendu(num, dst)
