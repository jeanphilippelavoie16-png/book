"""Image de départ du tome 2, direction (b) : l'été, le sauna au bord du lac, en fin de journée.

Pas de neige, pas de nuit. Le ciel du haut reste vide (le titre s'y pose) ; collines basses sur l'autre rive ; l'eau
calme ; à gauche, le sauna en rondins sur la rive, la porte entrouverte sur la lueur orange, la vapeur qui monte peu ;
le quai de bois qui part dans l'eau ; des bouleaux à droite ; herbes et roches sur la rive.

    python3 scene_ete.py            ciel foncé (l'encre)      écrit ete-reference-fonce.svg
    python3 scene_ete.py --clair    ciel clair (le papier)    écrit ete-reference-clair.svg
"""
import math
import os
import random
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(ICI, "..", ".."))
import scene_titre as st  # noqa: E402

W, H = 768, 960
ENC, DBL, PAP, ORA, ORA2, PAP2 = "#5C1A15", "#2E0B08", "#F3EADC", "#EE7219", "#F7B062", "#D9C8B6"
f, pts = st.f, st.pts


def scene(clair=False, seed=2207):
    s = st.Scene(seed)
    A = s.add
    ciel = PAP if clair else ENC
    loin = ENC if clair else DBL
    eau = PAP if clair else ENC
    trait_eau = ENC if clair else PAP
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    A('<defs><radialGradient id="lueur"><stop offset="0" stop-color="#F7B062" stop-opacity=".85"/>'
      '<stop offset=".5" stop-color="#EE7219" stop-opacity=".4"/><stop offset="1" stop-color="#EE7219" stop-opacity="0"/>'
      '</radialGradient></defs>')
    A(f'<rect x="-20" y="-20" width="{W + 40}" height="{H + 40}" fill="{ciel}"/>')

    # les collines basses de l'autre rive, la crête prise dans la lumière de fin de journée
    c1 = s.onde(568, [(12, 0.8), (6, 2.0)])
    A(f'<polygon points="{pts(c1 + [(W + 40, 660), (-20, 660)])}" fill="{ORA}"/>')
    c1b = [(x, y + 5) for x, y in c1]
    A(f'<polygon points="{pts(c1b + [(W + 40, 660), (-20, 660)])}" fill="{loin}"/>')
    c2 = s.onde(598, [(7, 1.2), (3, 3)])
    A(f'<polygon points="{pts(c2 + [(W + 40, 660), (-20, 660)])}" fill="{DBL}"/>')
    ym = lambda x: min(y for xx, y in c2 if abs(xx - x) <= 6)
    s.rangee(ym, -10, W + 30, 8, 18, DBL, dens=1.0)
    A(f'<rect x="-20" y="618" width="{W + 40}" height="8" fill="{DBL}"/>')

    # l'eau calme, ses rides gravées, le reflet orange de la crête
    A(f'<rect x="-20" y="624" width="{W + 40}" height="200" fill="{eau}"/>')
    for _ in range(60):
        x, y = s.u(-20, W), s.u(632, 820)
        A(f'<path d="M{f(x)} {f(y)} h{f(s.u(20, 110) * (0.6 + (y - 624) / 200))}" stroke="{trait_eau}" '
          f'stroke-width="{f(s.u(1, 2.4))}" stroke-linecap="round" opacity=".8"/>')
    for i in range(8):
        y = 634 + i * 9
        A(f'<path d="M{f(470 + s.u(-20, 20))} {y} h{f(140 - i * 12)}" stroke="{ORA}" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>')

    # le quai de bois qui part de la rive vers le large
    A(f'<polygon points="300,850 392,850 452,712 418,712" fill="{DBL}"/>')
    for k in range(14):
        t = k / 14
        y = 850 - t * 138
        xl, xr = 300 + t * 118, 392 + t * 60
        A(f'<path d="M{f(xl)} {f(y)} H{f(xr)}" stroke="{ENC if not clair else PAP2}" stroke-width="1.2"/>')
    for t in (0.25, 0.55, 0.85):
        y = 850 - t * 138
        for xx in (300 + t * 118, 392 + t * 60):
            A(f'<rect x="{f(xx - 2)}" y="{f(y)}" width="4" height="{f(14 * (1 - t) + 6)}" fill="{DBL}"/>')

    # la rive de ce côté-ci : la terre, les roches, les herbes hautes
    rive = s.onde(812, [(8, 0.8), (4, 2.4)])
    A(f'<polygon points="{pts(rive + [(W + 40, H + 40), (-20, H + 40)])}" fill="{DBL}"/>')
    for _ in range(14):
        x = s.u(-10, W)
        y = min(yy for xx, yy in rive if abs(xx - x) <= 6) + s.u(0, 10)
        w = s.u(18, 46)
        A(f'<path d="M{f(x - w / 2)} {f(y + 6)} q{f(w / 2)} {f(-w * 0.6)} {f(w)} 0z" fill="{ENC}"/>')
        A(f'<path d="M{f(x - w / 4)} {f(y - w * 0.12)} q{f(w / 5)} {f(-w * 0.12)} {f(w / 2.4)} 0" fill="none" stroke="{PAP2}" stroke-width="1.6"/>')
    for _ in range(90):
        x = s.u(-10, W + 10)
        y = s.u(820, 960)
        hh = s.u(14, 40)
        A(f'<path d="M{f(x)} {f(y)} q{f(s.u(-6, 6))} {f(-hh / 2)} {f(s.u(-8, 8))} {f(-hh)}" fill="none" stroke="{PAP2}" '
          f'stroke-width="1.4" opacity=".75"/>')

    # le sauna en rondins sur la rive, à gauche
    sx, sy, fw, fh, lw = 92, 808, 132, 70, 74
    A(f'<path d="M{sx + 120} {sy} L{sx + 150} {sy} L{sx + 250} {sy + 70} L{sx + 70} {sy + 70}Z" fill="url(#lueur)" opacity=".6"/>')
    A(f'<polygon points="{sx + fw},{sy} {sx + fw + lw},{sy - 22} {sx + fw + lw},{sy - fh - 18} {sx + fw},{sy - fh}" fill="{DBL}"/>')
    A(f'<rect x="{sx}" y="{sy - fh}" width="{fw}" height="{fh}" fill="{DBL}"/>')
    for i in range(10):
        y0 = sy - 4 - i * 6.8
        A(f'<path d="M{sx - 5} {f(y0)} H{sx + fw + 5}" stroke="{ENC}" stroke-width="1.4"/>')
        A(f'<path d="M{sx + fw} {f(y0)} L{sx + fw + lw} {f(y0 - 20)}" stroke="{ENC}" stroke-width="1.4"/>')
        for xx in (sx - 5, sx + fw + 4):
            A(f'<circle cx="{xx}" cy="{f(y0 - 2)}" r="3.2" fill="{ENC}"/><circle cx="{xx}" cy="{f(y0 - 2)}" r="1.4" fill="{PAP2}"/>')
    px = sx + fw / 2
    A(f'<polygon points="{sx - 10},{sy - fh} {f(px)},{sy - fh - 54} {sx + fw + 10},{sy - fh}" fill="{DBL}"/>')
    A(f'<polygon points="{f(px)},{sy - fh - 54} {f(px + lw)},{sy - fh - 74} {sx + fw + lw + 12},{sy - fh - 18} {sx + fw + 10},{sy - fh}" fill="{ENC}"/>')
    for k in range(7):
        t = k / 7
        A(f'<path d="M{f(px + 6 + t * (fw / 2))} {f(sy - fh - 52 + t * 52)} l{lw} -20" stroke="{DBL}" stroke-width="1.4"/>')
    A(f'<rect x="{f(px - 8)}" y="{sy - fh - 32}" width="16" height="9" fill="{ORA}"/>')
    dx, dw, dh = sx + 80, 30, 52
    A(f'<rect x="{dx}" y="{sy - dh}" width="{dw}" height="{dh}" fill="{ORA}"/>')
    A(f'<rect x="{dx + 4}" y="{sy - dh + 6}" width="{dw - 10}" height="{dh - 6}" fill="{ORA2}" opacity=".7"/>')
    A(f'<polygon points="{dx + dw},{sy - dh} {dx + dw + 18},{sy - dh + 8} {dx + dw + 18},{sy + 8} {dx + dw},{sy}" fill="{ENC}"/>')
    A(f'<rect x="{sx + 18}" y="{sy - 48}" width="22" height="16" fill="{ORA}"/>')
    # la vapeur, en bouffées courtes qui se défont vers la droite
    x0, y0 = px + 2, sy - fh - 46
    vap = PAP if not clair else PAP2
    for ddx, ddy, rx, ry, op in [(0, -8, 16, 12, .6), (8, -26, 22, 15, .5), (20, -48, 28, 18, .42), (38, -70, 34, 20, .32),
                                 (62, -90, 38, 20, .22), (92, -104, 40, 18, .13)]:
        A(f'<ellipse cx="{f(x0 + ddx)}" cy="{f(y0 + ddy)}" rx="{rx}" ry="{ry}" fill="{vap}" opacity="{op}"/>')
        if clair:
            A(f'<ellipse cx="{f(x0 + ddx)}" cy="{f(y0 + ddy)}" rx="{rx}" ry="{ry}" fill="none" stroke="{ENC}" stroke-width="1.6" opacity="{op + .2}"/>')
    # deux épinettes derrière le sauna
    s.epinette(40, 812, 230, 56, DBL)
    s.epinette(-6, 830, 300, 70, DBL)

    # les bouleaux à droite : troncs blancs aux marques sombres, feuillage qui retombe, la cime sous 45 % de la hauteur
    for bx, top, wid, pente in [(612, 470, 26, -14), (690, 440, 32, 10), (752, 455, 28, -6)]:
        # le feuillage d'abord, en grappes légères qui retombent, derrière le tronc
        for k in range(70):
            cx, cy = bx + pente + s.u(-70, 70), top + s.u(-10, 150)
            if abs(cx - bx - pente) > 70 - (cy - top) * 0.15:
                continue
            A(f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="{f(s.u(5, 9))}" ry="{f(s.u(2.4, 4))}" '
              f'transform="rotate({f(s.u(-50, 50))} {f(cx)} {f(cy)})" fill="{DBL if clair else PAP2}" opacity="{f(s.u(.55, .95))}"/>')
            if s.r.random() < 0.25:
                A(f'<ellipse cx="{f(cx + 6)}" cy="{f(cy + 4)}" rx="4" ry="2" fill="{ORA}" opacity=".9"/>')
        # le tronc blanc, un peu penché, plus large au pied
        A(f'<path d="M{bx - wid / 2} 990 Q{bx - wid / 2 + pente * 0.4} {(990 + top) / 2} {bx + pente - wid / 3.2} {top} '
          f'L{bx + pente + wid / 3.2} {top} Q{bx + wid / 2 + pente * 0.4} {(990 + top) / 2} {bx + wid / 2} 990Z" fill="{PAP}" '
          f'stroke="{DBL}" stroke-width="1.5"/>')
        for y in range(top + 12, 960, 18):
            t = (990 - y) / (990 - top)
            xc = bx + pente * t * 0.9
            w = s.u(5, wid * 0.7)
            A(f'<path d="M{f(xc - wid * (0.5 - 0.18 * t) + s.u(0, 6))} {y} q{f(w / 2)} {f(s.u(-3, 3))} {f(w)} 0" fill="none" '
              f'stroke="{DBL}" stroke-width="{f(s.u(1.6, 3.4))}" stroke-linecap="round"/>')
        for k in range(3):     # deux ou trois branches qui partent du haut
            y = top + 20 + k * 24
            sg = 1 if k % 2 else -1
            A(f'<path d="M{bx + pente * 0.95} {y} q{sg * 20} -10 {sg * 46} -4" fill="none" stroke="{DBL}" stroke-width="2.4"/>')
    A('</svg>')
    return "\n".join(s.out)


if __name__ == "__main__":
    clair = "--clair" in sys.argv
    out = os.path.join(ICI, f"ete-reference-{'clair' if clair else 'fonce'}.svg")
    open(out, "w", encoding="utf-8").write(scene(clair) + "\n")
    print(out)
