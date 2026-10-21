"""Petits outils communs : couleurs de l'image, chemins lissés, rendu SVG -> PNG transparent par Chromium."""
import math, os, subprocess, tempfile, glob

CREME = '#EEE0CB'; OCRE = '#CD8E46'; ORANGE = '#F07A1E'; MOYEN = '#803426'; MUR = '#601C16'
FONCE = '#2D0C0A'; CERNE = '#1E0706'
PX = 8                      # pixels par unité de l'espace 768 x 960 sur l'image dessinée à double taille (K 4 x S 2)

def f(v):
    return f'{v:.2f}'.rstrip('0').rstrip('.')

def pts(ps):
    return ' '.join(f'{f(x)},{f(y)}' for x, y in ps)

def poly(ps, fill='none', stroke=None, w=1.2, extra=''):
    s = f'<polygon points="{pts(ps)}" fill="{fill}"'
    if stroke: s += f' stroke="{stroke}" stroke-width="{f(w)}" stroke-linejoin="round"'
    return s + f' {extra}/>'

def line(p, q, stroke=CERNE, w=1.0, cap='round', extra=''):
    return f'<line x1="{f(p[0])}" y1="{f(p[1])}" x2="{f(q[0])}" y2="{f(q[1])}" stroke="{stroke}" stroke-width="{f(w)}" stroke-linecap="{cap}" {extra}/>'

def path(d, fill='none', stroke=None, w=1.2, extra=''):
    s = f'<path d="{d}" fill="{fill}"'
    if stroke: s += f' stroke="{stroke}" stroke-width="{f(w)}" stroke-linejoin="round" stroke-linecap="round"'
    return s + f' {extra}/>'

def lisse(ps, ferme=True, t=0.5):
    """Catmull-Rom -> Bézier : une courbe douce qui passe par les points."""
    n = len(ps)
    if n < 3:
        return 'M' + ' L'.join(f'{f(x)},{f(y)}' for x, y in ps)
    d = f'M{f(ps[0][0])},{f(ps[0][1])}'
    rng = range(n) if ferme else range(n - 1)
    for i in rng:
        p0 = ps[(i - 1) % n] if (ferme or i > 0) else ps[0]
        p1 = ps[i]; p2 = ps[(i + 1) % n]
        p3 = ps[(i + 2) % n] if (ferme or i + 2 < n) else ps[-1]
        c1 = (p1[0] + (p2[0] - p0[0]) * t / 3, p1[1] + (p2[1] - p0[1]) * t / 3)
        c2 = (p2[0] - (p3[0] - p1[0]) * t / 3, p2[1] - (p3[1] - p1[1]) * t / 3)
        d += f' C{f(c1[0])},{f(c1[1])} {f(c2[0])},{f(c2[1])} {f(p2[0])},{f(p2[1])}'
    return d + (' Z' if ferme else '')

def chrome():
    return sorted(glob.glob('/opt/pw-browsers/chromium-*/chrome-linux/chrome'))[-1]

def rendre(corps, x0, y0, x1, y1, sortie, defs=''):
    """Rend un SVG (coordonnées de l'espace 768 x 960) en PNG transparent, PX pixels par unité."""
    W = int(round((x1 - x0) * PX)); H = int(round((y1 - y0) * PX))
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="{f(x0)} {f(y0)} {f(x1 - x0)} {f(y1 - y0)}">'
           f'<defs>{defs}</defs>{corps}</svg>')
    src = os.path.splitext(sortie)[0] + '.svg'
    open(src, 'w').write(svg)
    html = os.path.splitext(sortie)[0] + '.html'
    open(html, 'w').write(f'<html><body style="margin:0;background:transparent">{svg}</body></html>')
    subprocess.run([chrome(), '--headless', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', f'--screenshot={sortie}',
                    f'--window-size={W},{H}', '--default-background-color=00000000', 'file://' + os.path.abspath(html)],
                   check=True, capture_output=True)
    os.remove(html)
    return sortie
