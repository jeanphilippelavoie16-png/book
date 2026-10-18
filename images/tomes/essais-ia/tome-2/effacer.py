"""Effacer une fausse signature posée sur un fond sombre (herbe, terre) : le rectangle reçoit le morceau d'image de
même taille pris juste au-dessus, pour garder la texture du fond. Pour une signature sur la neige ou le papier, c'est
`trois-encres.py` qui la repeint.

    python3 effacer.py <entrée> <sortie.png> x0,y0,x1,y1 [x0,y0,x1,y1 ...]
"""
import sys
from PIL import Image

im = Image.open(sys.argv[1]).convert("RGB")
for r in sys.argv[3:]:
    x0, y0, x1, y1 = map(int, r.split(","))
    h = y1 - y0
    im.paste(im.crop((x0, y0 - h, x1, y0)), (x0, y0))
im.save(sys.argv[2])
print(sys.argv[2], im.size)
