"""Image de départ du tome 2, direction (a) : le coin du soin, une nature morte d'intérieur.

Le haut est le mur foncé uni, sans fenêtre, sans poutre, sans tablette (la place du titre : rien ne dépasse 56 % de la
hauteur sauf la vapeur et la lueur, qui restent sous 45 %). En bas, sur une table de bois près du poêle à bois : la
bouilloire qui fume sur le poêle, le bassin d'eau chaude, le linge plié, les branches de sapin baumier et de thé du
Labrador, trois bocaux de plantes séchées, la lampe à l'huile dont la flamme donne la lumière orange.

    python3 scene_soin.py      écrit soin-reference.svg à côté du script
"""
import math
import os

W, H = 768, 960
ENC, DBL, PAP, ORA, ORA2, PAP2 = "#5C1A15", "#2E0B08", "#F3EADC", "#EE7219", "#F7B062", "#D9C8B6"


def rameau(o, x, y, long, ang, epais=2.4, aig=9, coul=DBL):
    """Une branche de sapin baumier : une tige, des aiguilles plates des deux côtés."""
    a = math.radians(ang)
    dx, dy = math.cos(a), math.sin(a)
    o.append(f'<path d="M{x:.1f} {y:.1f} l{dx * long:.1f} {dy * long:.1f}" stroke="{coul}" stroke-width="{epais}" stroke-linecap="round"/>')
    for k in range(4, int(long), 5):
        px, py = x + dx * k, y + dy * k
        n = aig * (1 - 0.5 * k / long)
        for s in (1, -1):
            nx, ny = -dy * s, dx * s
            o.append(f'<path d="M{px:.1f} {py:.1f} l{(nx * 0.9 + dx * 0.4) * n:.1f} {(ny * 0.9 + dy * 0.4) * n:.1f}" '
                     f'stroke="{coul}" stroke-width="1.8" stroke-linecap="round"/>')


def the_labrador(o, x, y, ang):
    """Un brin de thé du Labrador : une tige et des feuilles étroites, roulées, en grappe au bout."""
    a = math.radians(ang)
    dx, dy = math.cos(a), math.sin(a)
    o.append(f'<path d="M{x} {y} l{dx * 70:.1f} {dy * 70:.1f}" stroke="{DBL}" stroke-width="2"/>')
    for k, t in enumerate(range(30, 74, 6)):
        px, py = x + dx * t, y + dy * t
        for s in (1, -1):
            rot = ang + s * (50 + k * 4)
            o.append(f'<ellipse cx="{px:.1f}" cy="{py:.1f}" rx="9" ry="2.6" transform="rotate({rot:.0f} {px:.1f} {py:.1f}) '
                     f'translate({7 * s} 0)" fill="{DBL}"/>')
    tx, ty = x + dx * 76, y + dy * 76
    for k in range(5):
        o.append(f'<circle cx="{tx + 5 * math.cos(k * 1.3):.1f}" cy="{ty + 5 * math.sin(k * 1.3):.1f}" r="2.6" fill="{PAP}"/>')


def scene():
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">',
         '<defs><radialGradient id="lueur"><stop offset="0" stop-color="#F7B062" stop-opacity=".75"/>'
         '<stop offset=".5" stop-color="#EE7219" stop-opacity=".3"/><stop offset="1" stop-color="#EE7219" stop-opacity="0"/>'
         '</radialGradient></defs>',
         f'<rect width="{W}" height="{H}" fill="{ENC}"/>']
    A = o.append
    # la lueur de la lampe sur le mur et la table, basse
    A(f'<ellipse cx="250" cy="640" rx="230" ry="130" fill="url(#lueur)"/>')
    # le poêle à droite, coupé par le bord
    A(f'<rect x="560" y="600" width="230" height="250" rx="6" fill="{DBL}"/>')
    A(f'<rect x="548" y="590" width="240" height="16" rx="3" fill="{DBL}"/>')
    A(f'<rect x="596" y="660" width="120" height="96" fill="{ORA}"/>')
    A(f'<path d="M612 756 C618 718 640 724 636 690 C660 712 662 728 670 704 C690 728 694 742 700 756Z" fill="{ORA2}"/>')
    A(f'<rect x="590" y="652" width="132" height="8" fill="{DBL}"/><rect x="590" y="756" width="132" height="8" fill="{DBL}"/>')
    A(f'<rect x="578" y="850" width="14" height="40" fill="{DBL}"/><rect x="760" y="850" width="14" height="40" fill="{DBL}"/>')
    # la bouilloire sur le poêle et sa vapeur courte
    A(f'<path d="M612 590 Q608 540 652 538 Q696 540 692 590Z" fill="{DBL}"/>')
    A(f'<path d="M690 566 L728 544 L731 551 L694 578Z" fill="{DBL}"/>')
    A(f'<path d="M626 546 Q652 508 678 546" fill="none" stroke="{DBL}" stroke-width="6"/>')
    for dx, dy, rx, ry, op in [(736, 532, 10, 8, .6), (746, 512, 15, 10, .45), (758, 490, 19, 12, .3), (770, 468, 21, 12, .18)]:
        A(f'<ellipse cx="{dx}" cy="{dy}" rx="{rx}" ry="{ry}" fill="{PAP}" opacity="{op}"/>')
    # la table de bois, couverte d'une nappe de lin (les objets posent dessus, les branches se voient sur le blanc)
    A(f'<polygon points="-10,686 548,686 556,726 -10,726" fill="{PAP}"/>')
    A(f'<path d="M-10 718 H554 M-10 722 H555" stroke="{ENC}" stroke-width="1.6"/>')
    A(f'<rect x="-10" y="726" width="570" height="12" fill="{DBL}"/>')
    for x in (30, 500):
        A(f'<rect x="{x}" y="738" width="22" height="230" fill="{DBL}"/>')
    # le plancher
    A(f'<rect x="-10" y="890" width="{W + 20}" height="80" fill="{DBL}"/>')
    for x in range(-200, 1000, 90):
        A(f'<path d="M{384 + (x - 384) * 0.8:.0f} 890 L{x} 970" stroke="{ENC}" stroke-width="2"/>')
    # la lampe à l'huile
    lx = 110
    A(f'<ellipse cx="{lx}" cy="698" rx="40" ry="8" fill="{DBL}"/>')
    A(f'<path d="M{lx - 34} 696 Q{lx - 40} 650 {lx} 646 Q{lx + 40} 650 {lx + 34} 696Z" fill="{PAP}"/>')
    A(f'<path d="M{lx - 30} 672 H{lx + 30}" stroke="{PAP2}" stroke-width="3"/>')
    A(f'<rect x="{lx - 14}" y="634" width="28" height="14" fill="{DBL}"/>')
    A(f'<path d="M{lx - 16} 634 Q{lx - 26} 590 {lx - 12} 566 L{lx - 10} 540 H{lx + 10} L{lx + 12} 566 '
      f'Q{lx + 26} 590 {lx + 16} 634Z" fill="{PAP}" opacity=".85"/>')
    A(f'<path d="M{lx} 620 C{lx - 9} 604 {lx - 4} 588 {lx} 576 C{lx + 4} 588 {lx + 9} 604 {lx} 620Z" fill="{ORA}"/>')
    A(f'<path d="M{lx} 616 C{lx - 4} 606 {lx - 2} 596 {lx} 590 C{lx + 2} 596 {lx + 4} 606 {lx} 616Z" fill="{ORA2}"/>')
    # les trois bocaux de plantes séchées
    for k, (bx, bh) in enumerate([(178, 92), (226, 74), (266, 100)]):
        top = 700 - bh
        A(f'<rect x="{bx}" y="{top}" width="40" height="{bh}" rx="6" fill="{PAP}" opacity=".9"/>')
        A(f'<rect x="{bx - 2}" y="{top - 10}" width="44" height="12" rx="2" fill="{DBL}"/>')
        for j, sx in enumerate((bx + 11, bx + 20, bx + 29)):     # des tiges de plantes séchées, debout dans le bocal
            A(f'<path d="M{sx} 696 L{sx + (j - 1) * 3} {top + 8}" stroke="{DBL}" stroke-width="1.8"/>')
            for t in range(top + 14, 692, 9):
                for sg in (1, -1):
                    A(f'<ellipse cx="{sx + sg * 4}" cy="{t}" rx="4.5" ry="1.8" transform="rotate({sg * -35} {sx + sg * 4} {t})" fill="{DBL}"/>')
    # le bassin d'eau chaude et sa vapeur
    A(f'<path d="M330 640 L470 640 L452 700 L348 700Z" fill="{PAP}"/>')
    A(f'<ellipse cx="400" cy="640" rx="70" ry="10" fill="{PAP2}"/>')
    A(f'<path d="M330 640 L470 640" stroke="{DBL}" stroke-width="3"/>')
    for dx, dy, rx, ry, op in [(392, 618, 12, 8, .5), (404, 598, 16, 10, .38), (390, 576, 18, 10, .25)]:
        A(f'<ellipse cx="{dx}" cy="{dy}" rx="{rx}" ry="{ry}" fill="{PAP}" opacity="{op}"/>')
    # le linge plié, sur le bord de la table
    A(f'<rect x="470" y="672" width="76" height="28" rx="3" fill="{PAP}"/>')
    A(f'<path d="M470 684 H546 M470 690 H546" stroke="{ENC}" stroke-width="2.5"/>')
    A(f'<rect x="476" y="660" width="66" height="14" rx="3" fill="{PAP}"/>')
    # les branches de sapin baumier et de thé du Labrador, couchées devant
    rameau(o, 150, 712, 150, -8)
    rameau(o, 190, 716, 120, -20)
    the_labrador(o, 300, 714, -14)
    the_labrador(o, 320, 716, -2)
    A('</svg>')
    return "\n".join(o)


if __name__ == "__main__":
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "soin-reference.svg")
    open(out, "w", encoding="utf-8").write(scene() + "\n")
    print(out)
