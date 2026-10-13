"""Un morceau d'un modèle, agrandi sur une grille de 10 px (étiquettes aux 50) :
   python3 zone_modele.py h01 x0 y0 x1 y1 [échelle]   → scratchpad/zone-<id>-<x0>-<y0>.png"""
import re, sys, subprocess, os
TMP = os.environ.get('NOTICE_TMP', '/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/scratchpad')
ident, x0, y0, x1, y1 = sys.argv[1], *map(float, sys.argv[2:6]); k = float(sys.argv[6]) if len(sys.argv) > 6 else 3
t = open(f'/home/user/book/images/modeles/{ident}.svg').read()
de = re.search(r'id="encre"[^>]*\sd="([^"]*)"', t).group(1); ds = re.search(r'id="silhouette"[^>]*\sd="([^"]*)"', t).group(1)
W, H = (x1 - x0) * k, (y1 - y0) * k; m = 34
els = [f'<rect width="{W+2*m}" height="{H+2*m}" fill="#FFFFFF"/><g transform="translate({m},{m})">']
for gx in range(int(x0 // 10 * 10), int(x1) + 1, 10):
    if gx < x0: continue
    X = (gx - x0) * k; fort = gx % 50 == 0
    els.append(f'<line x1="{X}" y1="0" x2="{X}" y2="{H}" stroke="#7FB2E5" stroke-width="{1.4 if fort else 0.5}"/>')
    if fort: els.append(f'<text x="{X}" y="-8" font-size="14" text-anchor="middle" fill="#2266AA">{gx}</text>')
for gy in range(int(y0 // 10 * 10), int(y1) + 1, 10):
    if gy < y0: continue
    Y = (gy - y0) * k; fort = gy % 50 == 0
    els.append(f'<line x1="0" y1="{Y}" x2="{W}" y2="{Y}" stroke="#7FB2E5" stroke-width="{1.4 if fort else 0.5}"/>')
    if fort: els.append(f'<text x="-4" y="{Y+5}" font-size="14" text-anchor="end" fill="#2266AA">{gy}</text>')
els.append(f'<g transform="scale({k}) translate({-x0},{-y0})"><path fill="#F1D9C9" d="{ds}"/><path fill="#1A1A1A" d="{de}"/></g></g>')
f = f'{TMP}/zone-{ident}-{int(x0)}-{int(y0)}'
open(f + '.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W+2*m} {H+2*m}" width="{W+2*m}" height="{H+2*m}">' + ''.join(els) + '</svg>')
subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', f + '.svg', f + '.png'], capture_output=True)
from PIL import Image
im = Image.open(f + '.png'); im = im.resize((im.width // 2, im.height // 2), Image.LANCZOS); im.save(f + '.png'); print(f + '.png', im.size)
