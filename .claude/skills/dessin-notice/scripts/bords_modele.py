"""Où passe l'encre d'un modèle sur une ligne : le milieu de chaque trait coupé par y = …
(ou x = …), en pixels du modèle. Sert à poser les bords du poignet (a, b) d'un bras.
   python3 bords_modele.py k11 y=104 y=92   ·   python3 bords_modele.py g16 x=40"""
import re, sys, subprocess, os
import numpy as np
from PIL import Image
TMP = os.environ.get('NOTICE_TMP', '/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/scratchpad')
ident, coupes = sys.argv[1], sys.argv[2:]
t = open(f'/home/user/book/images/modeles/{ident}.svg').read()
W, H = map(float, re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', t).groups())
de = re.search(r'id="encre"[^>]*\sd="([^"]*)"', t).group(1)
k = 8
f = f'{TMP}/bords-{ident}'
open(f + '.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W*k/2} {H*k/2}" width="{W*k/2}" height="{H*k/2}"><rect width="{W*k/2}" height="{H*k/2}" fill="#FFFFFF"/><g transform="scale({k/2})"><path fill="#000000" d="{de}"/></g></svg>')
subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', f + '.svg', f + '.png'], capture_output=True)
a = np.asarray(Image.open(f + '.png').convert('L'), float) < 128
for c in coupes:
    axe, v = c.split('='); v = float(v)
    ligne = a[int(v * k), :] if axe == 'y' else a[:, int(v * k)]
    d = np.diff(np.r_[0, ligne.astype(int), 0]); deb = np.nonzero(d == 1)[0]; fin = np.nonzero(d == -1)[0]
    print(c, ' '.join(f'{(s + e) / 2 / k:.1f}(ép {(e - s) / k:.1f})' for s, e in zip(deb, fin)))
