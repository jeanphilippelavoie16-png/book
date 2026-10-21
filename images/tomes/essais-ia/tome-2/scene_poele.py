"""Image de départ de la deuxième idée du tome 2 : le coin du poêle, la nuit d'hiver. Le mur du haut reste vide (le
titre s'y pose) ; en bas, le poêle à bois et sa porte orange, la bouilloire qui fume, le bassin d'eau chaude et le
linge plié sur un tabouret, une tasse et un rameau de sapin baumier, le bois cordé.

    python3 scene_poele.py      écrit poele-reference.svg à côté du script
"""
import os

W, H = 768, 960
ENC, DBL, PAP, ORA, ORA2, PAP2 = "#5C1A15", "#2E0B08", "#F3EADC", "#EE7219", "#F7B062", "#D9C8B6"


def scene():
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">',
         '<defs><radialGradient id="lueur"><stop offset="0" stop-color="#F7B062" stop-opacity=".9"/>'
         '<stop offset=".55" stop-color="#EE7219" stop-opacity=".45"/><stop offset="1" stop-color="#EE7219" stop-opacity="0"/>'
         '</radialGradient></defs>',
         f'<rect width="{W}" height="{H}" fill="{ENC}"/>']
    A = o.append
    # le bas du mur : quelques rondins à peine marqués, sous la moitié de la page
    for y in range(560, 712, 26):
        A(f'<path d="M0 {y} H{W}" stroke="{DBL}" stroke-width="3" opacity=".55"/>')
    # le plancher en planches, en fuite
    A(f'<polygon points="0,712 {W},712 {W},{H} 0,{H}" fill="{PAP}"/>')
    for x in range(-600, 1500, 70):
        A(f'<path d="M{384 + (x - 384) * 0.45:.0f} 712 L{x} {H}" stroke="{PAP2}" stroke-width="2"/>')
    A(f'<ellipse cx="400" cy="770" rx="250" ry="70" fill="url(#lueur)"/>')
    # le tuyau du poêle, qui entre dans le mur
    A(f'<rect x="452" y="452" width="22" height="80" fill="{DBL}"/>')
    A(f'<path d="M452 462 Q452 440 474 440 L520 440 L520 462 L474 462Z" fill="{DBL}"/>')
    # le poêle
    A(f'<rect x="300" y="530" width="210" height="160" rx="6" fill="{DBL}"/>')
    A(f'<rect x="290" y="522" width="230" height="14" rx="3" fill="{DBL}"/>')
    for x in (310, 488):
        A(f'<path d="M{x} 688 l-6 34 h14 l4 -34z" fill="{DBL}"/>')
    A(f'<rect x="328" y="566" width="112" height="86" fill="{ORA}"/>')
    A(f'<path d="M346 652 C350 620 372 626 368 596 C392 616 392 630 400 610 C418 630 420 640 424 652Z" fill="{ORA2}"/>')
    A(f'<polygon points="440,566 476,556 476,664 440,652" fill="{DBL}"/>')          # la porte entrouverte
    A(f'<rect x="452" y="604" width="16" height="6" fill="{ORA2}"/>')
    # la bouilloire et sa vapeur
    A(f'<path d="M350 522 Q348 482 384 480 Q420 482 418 522Z" fill="{DBL}"/>')
    A(f'<path d="M416 500 L446 482 L448 488 L420 510Z" fill="{DBL}"/>')
    A(f'<path d="M362 486 Q384 452 406 486" fill="none" stroke="{DBL}" stroke-width="5"/>')
    for k, (dx, dy, rx, ry, op) in enumerate([(452, 470, 10, 8, .6), (462, 452, 15, 11, .5), (476, 430, 20, 13, .4),
                                               (494, 408, 24, 14, .3), (516, 388, 26, 13, .2)]):
        A(f'<ellipse cx="{dx}" cy="{dy}" rx="{rx}" ry="{ry}" fill="{PAP}" opacity="{op}"/>')
    # le tabouret, le bassin d'eau chaude et le linge plié
    A(f'<rect x="120" y="640" width="150" height="16" rx="4" fill="{DBL}"/>')
    for x1, x2 in ((134, 122), (256, 268), (170, 166), (220, 226)):
        A(f'<path d="M{x1} 656 L{x2} 760" stroke="{DBL}" stroke-width="9" stroke-linecap="round"/>')
    A(f'<path d="M126 602 L264 602 L250 640 L140 640Z" fill="{PAP}"/>')
    A(f'<ellipse cx="195" cy="602" rx="69" ry="9" fill="{PAP2}"/>')
    A(f'<path d="M206 604 h56 v-10 h-56z" fill="{PAP}" stroke="{DBL}" stroke-width="2"/>')
    for k, (dx, dy, rx, ry, op) in enumerate([(184, 584, 10, 7, .45), (178, 566, 13, 8, .32), (186, 546, 15, 8, .2)]):
        A(f'<ellipse cx="{dx}" cy="{dy}" rx="{rx}" ry="{ry}" fill="{PAP}" opacity="{op}"/>')
    # la tasse et le rameau de sapin baumier sur le coin du poêle
    A(f'<rect x="486" y="494" width="26" height="28" rx="3" fill="{PAP}"/>')
    A(f'<path d="M512 500 q10 2 0 14" fill="none" stroke="{PAP}" stroke-width="4"/>')
    A(f'<path d="M520 520 L580 470" stroke="{DBL}" stroke-width="3"/>')
    for t in range(0, 60, 6):
        x, y = 520 + t, 520 - t * 0.83
        A(f'<path d="M{x} {y} l-8 -9 M{x} {y} l9 4" stroke="{DBL}" stroke-width="2.4"/>')
    # le bois cordé à droite
    for row in range(4):
        for k in range(5 - (row > 2)):
            x, y = 580 + k * 30 + row * 6, 748 - row * 26
            A(f'<circle cx="{x}" cy="{y}" r="14" fill="{DBL}"/><circle cx="{x}" cy="{y}" r="8" fill="{PAP2}"/>'
              f'<circle cx="{x}" cy="{y}" r="3" fill="{DBL}"/>')
    A('</svg>')
    return "\n".join(o)


if __name__ == "__main__":
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "poele-reference.svg")
    open(out, "w", encoding="utf-8").write(scene() + "\n")
    print(out)
