"""Fiche d'un modèle : le dessin agrandi sur une grille de 10 px (pixels du modèle), pour lire
l'ancre, les bords du poignet et les rectangles à masquer.   python3 fiche_modele.py k11 k14 …"""
import re, sys, subprocess, os
TMP = os.environ.get('NOTICE_TMP', '/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/scratchpad')
for ident in sys.argv[1:]:
    t = open(f'/home/user/book/images/modeles/{ident}.svg').read()
    W, H = map(float, re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', t).groups())
    ds = re.search(r'id="silhouette"[^>]*\sd="([^"]*)"', t).group(1)
    de = re.search(r'id="encre"[^>]*\sd="([^"]*)"', t).group(1)
    k = 6; m = 30
    els = [f'<rect width="{W*k+2*m}" height="{H*k+2*m}" fill="#FFFFFF"/>', f'<g transform="translate({m},{m})">']
    for gx in range(0, int(W) + 1, 10):
        els.append(f'<line x1="{gx*k}" y1="0" x2="{gx*k}" y2="{H*k}" stroke="#7FB2E5" stroke-width="{1.5 if gx % 50 == 0 else 0.6}"/>')
        els.append(f'<text x="{gx*k}" y="-8" font-size="13" text-anchor="middle" fill="#2266AA">{gx}</text>')
    for gy in range(0, int(H) + 1, 10):
        els.append(f'<line x1="0" y1="{gy*k}" x2="{W*k}" y2="{gy*k}" stroke="#7FB2E5" stroke-width="{1.5 if gy % 50 == 0 else 0.6}"/>')
        els.append(f'<text x="-6" y="{gy*k+4}" font-size="13" text-anchor="end" fill="#2266AA">{gy}</text>')
    els.append(f'<g transform="scale({k})"><path fill="#F1D9C9" d="{ds}"/><path fill="#1A1A1A" d="{de}"/></g></g>')
    f = f'{TMP}/fiche-{ident}'
    open(f + '.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W*k+2*m} {H*k+2*m}" width="{W*k+2*m}" height="{H*k+2*m}">' + ''.join(els) + '</svg>')
    subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', f + '.svg', f + '.png'], capture_output=True)
    print(f + '.png', W, H)
