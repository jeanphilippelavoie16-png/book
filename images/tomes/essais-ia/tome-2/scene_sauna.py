"""Image de départ (composition imposée) de la page de titre du tome 2, Le corps : le sauna à fumée au bord du lac.

Même moteur que la scène du tome 1 (`images/tomes/scene_titre.py` : épinettes, crêtes qui ondulent), couleurs du
tome 2 : rouge sang de bœuf #5C1A15, papier blanc cassé, orange #EE7219. Le ciel du haut reste vide (le titre s'y
pose) ; collines basses ; le lac gelé ; le chalet au loin, fenêtres allumées ; au premier plan, le sauna en rondins,
la porte entrouverte, la vapeur qui monte.

    python3 -B scene_sauna.py [graine]      écrit sauna-reference.svg à côté du script

Rendu en PNG par Chromium sans écran (fenêtre 768 × 1100, puis recadrage à 768 × 960) : sauna-reference-2.png.
sauna-reference-1.png est la première version, où la vapeur montait en colonne jusqu'au tiers du haut : le générateur
la prolongeait jusqu'en haut de la page, dans la place du titre ; la vapeur est maintenant faite de bouffées courtes.
"""
import math
import os
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(ICI, "..", ".."))
import scene_titre as st  # noqa: E402

W, H = st.W, st.H
f, pts = st.f, st.pts
C = dict(sky0="#4B130F", sky1="#5C1A15", star="#F3EADC", moon="#F3EADC", far="#47110D", mid="#3C0F0B",
         near="#320C09", ice="#EFE6D8", ice2="#D9C8B6", shore="#2A0A07", front="#2A0A07", snow="#F3EADC",
         snow2="#E2D3C2", snow3="#CDB8A4", log="#3A0E0A", log2="#5C1A15", win="#EE7219", win2="#F7B062",
         steam="#F3EADC")
st.C["snow"] = C["snow"]          # les coussins de neige des épinettes


def scene(seed=2002):
    """La scène complète, en SVG."""
    s = st.Scene(seed)
    A = s.add
    A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    A('<defs>'
      f'<linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{C["sky0"]}"/>'
      f'<stop offset="1" stop-color="{C["sky1"]}"/></linearGradient>'
      f'<radialGradient id="lueur"><stop offset="0" stop-color="{C["win2"]}" stop-opacity=".85"/>'
      f'<stop offset=".5" stop-color="{C["win"]}" stop-opacity=".45"/><stop offset="1" stop-color="{C["win"]}" stop-opacity="0"/></radialGradient>'
      f'<radialGradient id="halo"><stop offset=".5" stop-color="{C["moon"]}" stop-opacity=".18"/>'
      f'<stop offset="1" stop-color="{C["moon"]}" stop-opacity="0"/></radialGradient>'
      '</defs>')
    A(f'<rect x="-20" y="-40" width="{W + 60}" height="{H + 80}" fill="url(#ciel)"/>')

    # quelques étoiles, presque aucune dans le haut (le titre)
    for _ in range(70):
        x, y = s.u(0, W), s.u(20, 540)
        if y < 400 and s.r.random() < 0.75:
            continue
        rr = s.u(0.5, 1.4) if s.r.random() < 0.9 else s.u(1.6, 2.1)
        A(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(rr)}" fill="{C["star"]}" opacity="{f(s.u(.4, .9))}"/>')

    # la lune basse, à gauche, à moitié cachée par la colline
    A(f'<circle cx="138" cy="548" r="70" fill="url(#halo)"/>')
    A(f'<circle cx="138" cy="548" r="28" fill="{C["moon"]}"/>')

    # les collines basses : la plus loin a la crête prise dans la lumière orange du soir
    loin = s.onde(580, [(14, 0.8), (7, 1.9), (2, 6)])
    A(f'<polygon points="{pts(loin + [(W + 40, 720), (-20, 720)])}" fill="{C["win"]}"/>')
    loin2 = [(x, y + 7) for x, y in loin]
    A(f'<polygon points="{pts(loin2 + [(W + 40, 720), (-20, 720)])}" fill="{C["far"]}"/>')
    for k in range(5):      # les traits de gouge sur la colline
        yy = s.onde(600 + k * 9, [(6, 1.3), (2, 4)])
        A(f'<polyline points="{pts(yy)}" fill="none" stroke="{C["sky1"]}" stroke-width="1.6" opacity=".7"/>')
    milieu = s.onde(624, [(9, 1.1), (4, 2.7)])
    A(f'<polygon points="{pts(milieu + [(W + 40, 720), (-20, 720)])}" fill="{C["mid"]}"/>')
    ym = lambda x: min(y for xx, y in milieu if abs(xx - x) <= 6)
    s.rangee(ym, -10, W + 30, 8, 15, C["mid"], dens=0.9)

    # la rive d'en face : une rangée d'épinettes, et le chalet
    rive = s.onde(652, [(2, 2), (1, 5)])
    A(f'<polygon points="{pts(rive + [(W + 40, 668), (-20, 668)])}" fill="{C["near"]}"/>')
    s.rangee(lambda x: 656, -10, 470, 12, 30, C["near"], dens=1.5)
    s.rangee(lambda x: 656, 620, W + 30, 12, 30, C["near"], dens=1.5)

    # le chalet au loin, ses fenêtres allumées
    cx, cy = 548, 664
    A(f'<ellipse cx="{cx + 18}" cy="{cy + 6}" rx="46" ry="7" fill="url(#lueur)"/>')
    A(f'<g transform="translate({cx} {cy})">')
    A(f'<rect x="26" y="-38" width="5" height="12" fill="{C["log"]}"/>')
    A(f'<polygon points="0,-18 38,-18 38,0 0,0" fill="{C["log"]}"/>')
    A(f'<polygon points="-6,-17 19,-36 44,-17" fill="{C["log"]}"/>')
    A(f'<path d="M-7 -16 L19 -38 L45 -16 L41 -15 L19 -32 L-3 -15Z" fill="{C["snow"]}"/>')
    for wx in (5, 24):
        A(f'<rect x="{wx}" y="-13" width="8" height="7" fill="{C["win"]}"/>')
    A('</g>')
    A(f'<path d="M{cx + 28} {cy - 40} c-4 -14 10 -18 6 -32 c-3 -12 8 -18 16 -22" fill="none" stroke="{C["steam"]}" '
      f'stroke-width="3" stroke-linecap="round" opacity=".45"/>')

    # le lac gelé, sous la neige, avec les traits de la gouge
    A(f'<rect x="-20" y="666" width="{W + 60}" height="60" fill="{C["ice"]}"/>')
    for _ in range(26):
        x, y = s.u(-20, W), s.u(672, 720)
        A(f'<path d="M{f(x)} {f(y)} h{f(s.u(20, 90))}" stroke="{C["ice2"]}" stroke-width="{f(s.u(1, 2.2))}" stroke-linecap="round"/>')
    # le reflet orange du chalet sur la glace
    for i in range(4):
        A(f'<path d="M{cx + 8 - i} {670 + i * 5} h{22 - i * 3}" stroke="{C["win"]}" stroke-width="1.6" opacity="{f(.55 - i * .1)}"/>')

    # la rive de ce côté-ci, la neige en congères
    n1 = s.onde(722, [(6, 0.9), (3, 2.2)])
    A(f'<polygon points="{pts(n1 + [(W + 40, H + 40), (-20, H + 40)])}" fill="{C["snow"]}"/>')
    A(f'<polyline points="{pts(n1)}" fill="none" stroke="{C["snow3"]}" stroke-width="2"/>')
    for _ in range(40):      # les roches et les arbustes de la rive, sous la neige
        x = s.u(-10, W + 10)
        y = min(yy for xx, yy in n1 if abs(xx - x) <= 6) + s.u(-1, 3)
        w, hh = s.u(6, 22), s.u(3, 8)
        A(f'<path d="M{f(x - w / 2)} {f(y)} q{f(w / 2)} {f(-hh * 2)} {f(w)} 0z" fill="{C["shore"]}"/>')
        A(f'<path d="M{f(x - w / 3)} {f(y - hh * 0.7)} q{f(w / 3)} {f(-hh * 0.9)} {f(w * 0.66)} 0z" fill="{C["snow"]}"/>')
    for k in range(7):
        x, y = s.u(0, W), s.u(760, 940)
        w = s.u(60, 160)
        A(f'<path d="M{f(x)} {f(y)} q{f(w / 2)} {f(-s.u(4, 9))} {f(w)} 0" fill="none" stroke="{C["snow3"]}" '
          f'stroke-width="{f(s.u(1.4, 2.6))}" stroke-linecap="round" opacity=".8"/>')

    # le sauna à fumée, en rondins, la porte entrouverte
    sx, sy = 236, 818        # coin bas gauche de la façade
    fw, fh = 112, 62         # la façade (pignon)
    lw = 58                  # le mur de côté, en fuite vers la droite
    A(f'<g transform="translate({sx + 56} {sy}) scale(1.35) translate({-sx - 56} {-sy})">')
    # la lueur de la porte sur la neige
    A(f'<path d="M{sx + 64} {sy} L{sx + 92} {sy} L{sx + 176} {sy + 70} L{sx + 20} {sy + 70}Z" fill="url(#lueur)" opacity=".45"/>')
    A(f'<ellipse cx="{sx + 80}" cy="{sy + 14}" rx="70" ry="18" fill="url(#lueur)" opacity=".8"/>')
    # mur de côté
    A(f'<polygon points="{sx + fw},{sy} {sx + fw + lw},{sy - 18} {sx + fw + lw},{sy - fh - 14} {sx + fw},{sy - fh}" fill="{C["log"]}"/>')
    for i in range(9):
        y0 = sy - 4 - i * 6.6
        A(f'<path d="M{sx + fw} {f(y0)} L{sx + fw + lw} {f(y0 - 15)}" stroke="{C["log2"]}" stroke-width="1.3"/>')
    # façade
    A(f'<rect x="{sx}" y="{sy - fh}" width="{fw}" height="{fh}" fill="{C["log"]}"/>')
    for i in range(9):
        y0 = sy - 4 - i * 6.6
        A(f'<path d="M{sx - 4} {f(y0)} H{sx + fw + 4}" stroke="{C["log2"]}" stroke-width="1.3"/>')
        A(f'<circle cx="{sx - 4}" cy="{f(y0 - 2)}" r="3" fill="{C["log2"]}"/>')
        A(f'<circle cx="{sx + fw + 3}" cy="{f(y0 - 2)}" r="3" fill="{C["log2"]}"/>')
    # pignon et toit couvert de neige
    px = sx + fw / 2
    A(f'<polygon points="{sx - 8},{sy - fh} {f(px)},{sy - fh - 46} {sx + fw + 8},{sy - fh}" fill="{C["log"]}"/>')
    A(f'<polygon points="{f(px)},{sy - fh - 46} {f(px + lw)},{sy - fh - 60} {sx + fw + lw + 10},{sy - fh - 14} {sx + fw + 8},{sy - fh}" fill="{C["snow"]}"/>')
    A(f'<path d="M{sx - 12} {sy - fh + 2} L{f(px)} {sy - fh - 50} L{sx + fw + 12} {sy - fh + 2} L{sx + fw + 4} {sy - fh + 4} '
      f'L{f(px)} {sy - fh - 40} L{sx - 4} {sy - fh + 4}Z" fill="{C["snow"]}"/>')
    # l'évent sous le faîte, d'où sort la fumée
    A(f'<rect x="{f(px - 7)}" y="{sy - fh - 28}" width="14" height="8" fill="{C["win"]}" opacity=".85"/>')
    # la porte entrouverte : l'intérieur orange, le battant ouvert vers l'extérieur
    dx, dw, dh = sx + 64, 28, 46
    A(f'<rect x="{dx}" y="{sy - dh}" width="{dw}" height="{dh}" fill="{C["win"]}"/>')
    A(f'<rect x="{dx + 4}" y="{sy - dh + 6}" width="{dw - 10}" height="{dh - 6}" fill="{C["win2"]}" opacity=".7"/>')
    A(f'<polygon points="{dx + dw},{sy - dh} {dx + dw + 16},{sy - dh + 6} {dx + dw + 16},{sy + 6} {dx + dw},{sy}" fill="{C["front"]}"/>')
    # le bois cordé contre le mur
    bx, by = sx + fw + 10, sy - 2
    for row in range(3):
        for k in range(6 - row):
            x = bx + k * 7 + row * 3.5
            y = by - row * 6.2 - k * 1.6
            A(f'<circle cx="{f(x)}" cy="{f(y)}" r="3.3" fill="{C["log"]}"/><circle cx="{f(x)}" cy="{f(y)}" r="1.3" fill="{C["win2"]}"/>')
    A(f'<path d="M{bx - 5} {by - 16} q22 -12 46 -8 q-22 5 -46 8z" fill="{C["snow"]}"/>')
    # la vapeur et la fumée qui sortent sous le faîte : des bouffées qui montent peu et se défont vers la droite
    x0, y0 = px + 4, sy - fh - 40
    for k, (ddx, ddy, rx, ry, op) in enumerate([(0, -6, 16, 12, .55), (6, -22, 22, 15, .5), (16, -42, 28, 18, .42),
                                                 (32, -62, 34, 20, .34), (54, -80, 40, 21, .26), (82, -96, 44, 20, .18),
                                                 (112, -108, 46, 17, .11)]):
        A(f'<ellipse cx="{f(x0 + ddx)}" cy="{f(y0 + ddy)}" rx="{rx}" ry="{ry}" fill="{C["steam"]}" opacity="{op}"/>')
    A('</g>')
    # le sentier dans la neige, de la porte vers le bas de la page
    t = 0.0
    tr = lambda t: ((1 - t) ** 2 * (dx + 24) + 2 * (1 - t) * t * 470 + t * t * 560,
                    (1 - t) ** 2 * (sy + 12) + 2 * (1 - t) * t * 870 + t * t * 990)
    i = 0
    while t < 1:
        x, y = tr(t)
        x2, y2 = tr(min(1, t + 0.01))
        ang = math.degrees(math.atan2(y2 - y, x2 - x))
        sc = 0.45 + 0.55 * t
        off = (4 if i % 2 else -4) * sc
        nx, ny = -math.sin(math.radians(ang)) * off, math.cos(math.radians(ang)) * off
        A(f'<ellipse cx="{f(x + nx)}" cy="{f(y + ny)}" rx="{f(5 * sc)}" ry="{f(2.2 * sc)}" '
          f'transform="rotate({f(ang)} {f(x + nx)} {f(y + ny)})" fill="{C["snow3"]}"/>')
        t += 0.03
        i += 1

    # les grandes épinettes enneigées, de chaque côté
    for x, bas, h, l in [(-6, 990, 480, 116), (64, 975, 280, 70), (122, 950, 150, 40),
                         (716, 1000, 450, 110), (652, 972, 240, 60), (606, 945, 120, 30)]:
        s.epinette(x, bas, h, l, C["front"], neige=True)
    A('</svg>')
    return "\n".join(s.out)


if __name__ == "__main__":
    graine = int(sys.argv[1]) if len(sys.argv) > 1 else 2002
    out = os.path.join(ICI, "sauna-reference.svg")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(scene(graine) + "\n")
    print(out)
