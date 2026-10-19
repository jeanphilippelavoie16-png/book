"""La chaudière d'eau au pied de la table : un seau de bois à douves un peu évasées, deux cercles de fer, deux oreilles
percées et une anse de fer à poignée de bois, couchée vers l'arrière ; l'eau à ras le bord, avec le reflet de la lampe."""
import math, random
import numpy as np
from svgkit import *

X0, Y0, X1, Y1 = 30, 794, 136, 916         # descendu de 4 unités : l'anse passe sous le chant de la tablette (y 818)
C = 83.0                                  # l'axe du seau
YT, RT, ET = 846.0, 37.5, 7.0             # le haut : centre, demi-largeur, demi-hauteur de l'ellipse
YB, RB, EB = 901.0, 31.0, 6.0             # le bas
N = 16                                    # les douves, sur le tour
TRAIT = 0.65                              # l'épaisseur des cernes : celle du linge, du panier et de la cruche, générés

def lvl(t):
    """L'ellipse à la hauteur t (0 en haut, 1 en bas) : centre y, demi-largeur, demi-hauteur."""
    return YT + (YB - YT) * t, RT + (RB - RT) * t, ET + (EB - ET) * t

def arc(t, a0=-90, a1=90, n=40, dr=0.0):
    """L'avant de l'ellipse à la hauteur t ; l'angle 0 est le milieu de l'avant, -90 le bord gauche."""
    yc, r, e = lvl(t)
    return [(C + (r + dr) * math.sin(math.radians(a)), yc + (e + dr * e / r) * math.cos(math.radians(a))) for a in np.linspace(a0, a1, n)]

def seau():
    Rn = random.Random(11)
    s = []
    # l'ombre sur le plancher
    s.append(f'<ellipse cx="{f(C + 5)}" cy="{f(YB + 4)}" rx="{f(RB + 9)}" ry="{f(EB + 3.5)}" fill="{CERNE}"/>')
    # le corps : bord gauche, avant du fond, bord droit, avant du haut
    corps = arc(0, -90, 90) + arc(1, 90, -90)
    s.append(poly(corps, fill=MOYEN))
    s.append(f'<clipPath id="sc">{poly(corps)}</clipPath><g clip-path="url(#sc)">')
    # l'ombre du côté droit, et la lumière de la lampe à gauche
    s.append(poly(arc(0, 38, 90) + arc(1, 90, 38), fill=MUR))
    s.append(poly(arc(0, -62, -44) + arc(1, -44, -62), fill=OCRE))
    s.append(poly(arc(0, -40, -34) + arc(1, -34, -40), fill=OCRE))
    # les joints des douves, et le fil du bois
    off = 360 / N
    for k in range(-N // 2, N // 2 + 1):
        a = k * off + off * 0.35
        if abs(a) >= 89: continue
        p0 = arc(0, a, a, 1)[0]; p1 = arc(1, a, a, 1)[0]
        s.append(line(p0, p1, stroke=CERNE, w=0.75 * TRAIT))
        for _ in range(2):
            b = a + off * Rn.uniform(0.25, 0.75)
            if abs(b) >= 88: continue
            t0, t1 = Rn.uniform(0.0, 0.35), Rn.uniform(0.55, 1.0)
            q0 = arc(t0, b, b, 1)[0]; q1 = arc(t1, b, b, 1)[0]
            col = FONCE if b > 30 else (MOYEN if b < -32 else MUR)
            s.append(line(q0, q1, stroke=col, w=0.45))
    s.append('</g>')
    s.append(poly(corps, stroke=CERNE, w=1.2 * TRAIT))
    # les deux cercles de fer : une bande qui suit la courbe, un filet clair en haut, deux rivets
    for t, h in ((0.16, 0.085), (0.80, 0.085)):
        band = arc(t, -90, 90, 50, dr=0.9) + arc(t + h, 90, -90, 50, dr=0.9)
        s.append(poly(band, fill=FONCE, stroke=CERNE, w=0.9 * TRAIT))
        s.append(path(lisse(arc(t + 0.018, -78, -20, 14, dr=0.9), ferme=False), stroke=MOYEN, w=0.7))
        s.append(path(lisse(arc(t + 0.018, -66, -46, 6, dr=0.9), ferme=False), stroke=CREME, w=0.7))
        for a in (-30, 26):
            x, y = arc(t + h / 2, a, a, 1, dr=0.9)[0]
            s.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="0.75" fill="{MOYEN}"/>')
    # les oreilles : deux douves plus hautes, percées, de chaque côté
    for sg in (-1, 1):
        a = sg * 74
        xm, ym = arc(0, a, a, 1)[0]
        w = 4.2
        ore = [(xm - w, ym + 2), (xm - w, ym - 7), (xm - w + 1.2, ym - 10.2), (xm + w - 1.2, ym - 10.2), (xm + w, ym - 7), (xm + w, ym + 2)]
        s.append(poly(ore, fill=MOYEN if sg < 0 else MUR, stroke=CERNE, w=1.0 * TRAIT))
        s.append(f'<circle cx="{f(xm)}" cy="{f(ym - 6)}" r="1.25" fill="{CERNE}"/>')
    # le haut : le bord des douves (bois de bout, éclairé), la face intérieure des douves du fond, puis l'eau, foncée,
    # un peu sous le bord, avec le reflet de la lampe et deux rides
    yc, r, e = lvl(0)
    s.append(f'<ellipse cx="{f(C)}" cy="{f(yc)}" rx="{f(r)}" ry="{f(e)}" fill="{OCRE}" stroke="{CERNE}" stroke-width="{f(1.1 * TRAIT)}"/>')
    ri, ei = r - 2.8, e - 1.0
    for k in range(N):
        a = math.radians(k * 360 / N + 7)
        s.append(line((C + r * math.sin(a), yc + e * math.cos(a)), (C + ri * math.sin(a), yc + ei * math.cos(a)), stroke=MOYEN, w=0.5))
    s.append(f'<ellipse cx="{f(C)}" cy="{f(yc)}" rx="{f(ri)}" ry="{f(ei)}" fill="{MUR}" stroke="{CERNE}" stroke-width="{f(0.8 * TRAIT)}"/>')
    s.append(f'<clipPath id="ins"><ellipse cx="{f(C)}" cy="{f(yc)}" rx="{f(ri)}" ry="{f(ei)}"/></clipPath><g clip-path="url(#ins)">')
    for k in range(-6, 7):                       # les joints des douves, sur la face intérieure du fond
        x = C + ri * math.sin(math.radians(k * 360 / N + 3))
        s.append(line((x, yc - ei - 1), (x, yc + 1), stroke=FONCE, w=0.45))
    ew = ei - 0.6
    s.append(f'<ellipse cx="{f(C)}" cy="{f(yc + 1.6)}" rx="{f(ri - 0.4)}" ry="{f(ew)}" fill="{FONCE}" stroke="{CERNE}" stroke-width="{f(0.6 * TRAIT)}"/>')
    s.append('</g>')
    yw = yc + 1.6
    s.append(path(f'M{f(C - 22)},{f(yw - 0.6)} Q{f(C - 14)},{f(yw - 2.9)} {f(C - 4)},{f(yw - 2.4)}', stroke=CREME, w=1.0))
    s.append(path(f'M{f(C - 17)},{f(yw + 1.3)} Q{f(C - 11)},{f(yw + 0.1)} {f(C - 5)},{f(yw + 0.3)}', stroke=OCRE, w=0.7))
    s.append(path(f'M{f(C + 6)},{f(yw + 2.4)} Q{f(C + 14)},{f(yw + 1.5)} {f(C + 22)},{f(yw + 1.9)}', stroke=MOYEN, w=0.6))
    # l'anse : un fil de fer couché vers l'arrière, d'une oreille à l'autre, avec sa poignée de bois au milieu
    xl, yl = arc(0, -74, -74, 1)[0]; xr, yr = arc(0, 74, 74, 1)[0]
    yl -= 6; yr -= 6
    top = 822.5
    ans = f'M{f(xl)},{f(yl)} C{f(xl - 1)},{f(yl - 16)} {f(C - 26)},{f(top)} {f(C)},{f(top)} C{f(C + 26)},{f(top)} {f(xr + 1)},{f(yr - 16)} {f(xr)},{f(yr)}'
    s.append(path(ans, stroke=CERNE, w=1.8))
    s.append(path(ans, stroke=FONCE, w=1.0))
    s.append(path(f'M{f(C - 30)},{f(top + 6.5)} C{f(C - 24)},{f(top + 1.5)} {f(C - 16)},{f(top + 0.4)} {f(C - 12)},{f(top + 0.2)}', stroke=MOYEN, w=0.5))
    # la poignée, un petit cylindre tourné
    gx0, gx1, gy = C - 8, C + 8, top
    s.append(f'<rect x="{f(gx0)}" y="{f(gy - 2.3)}" width="{f(gx1 - gx0)}" height="4.6" rx="2.2" fill="{OCRE}" stroke="{CERNE}" stroke-width="{f(0.9 * TRAIT)}"/>')
    s.append(line((gx0 + 2, gy - 1.0), (gx1 - 2, gy - 1.0), stroke=CREME, w=0.6))
    s.append(line((gx0 + 2.2, gy + 1.2), (gx1 - 2.2, gy + 1.2), stroke=MOYEN, w=0.5))
    # les crochets de l'anse dans les oreilles
    for x, y, sg in ((xl, yl, -1), (xr, yr, 1)):
        s.append(path(f'M{f(x)},{f(y - 0.5)} q{f(sg * 2.2)},{f(0.6)} {f(sg * 2.4)},{f(2.6)}', stroke=CERNE, w=1.0 * TRAIT))
    return '\n'.join(s)

if __name__ == '__main__':
    rendre(seau(), X0, Y0, X1, Y1, 'seau.png')
