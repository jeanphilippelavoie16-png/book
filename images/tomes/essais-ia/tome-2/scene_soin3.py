"""Images de départ du troisième tour du tome 2 : le coin du soin, en huit compositions.

JP a retenu le coin du soin (n° 4 du deuxième tour) mais le trouve trop à plat. Ici, la gravure est dessinée dans
l'image de départ, comme dans la linogravure du tome 1 : des entailles claires taillées dans les masses foncées (le
poêle, la table, le plancher, le bas du mur), des hachures foncées dans les masses claires (la nappe, le bassin), la
vapeur en lignes taillées plutôt qu'en nuage. Le haut du mur reste uni : aucune entaille au-dessus de 46 % de la
hauteur, aucune vapeur au-dessus de 44 %.

Ce qui change d'une composition à l'autre : le cadrage (près de la table, ou large avec le poêle entier), les objets
(lampe à l'huile, bocaux de plantes, bassin d'eau chaude, linge plié, bandes de coton roulées, mortier et pilon,
sapin baumier, thé du Labrador, bouilloire), la lumière (la lampe seule, le feu du poêle seul, ou les deux) et la
couleur du mur (le sang de bœuf du n° 4, plus foncé, brique, ou le papier).

    python3 -B scene_soin3.py      écrit soin3-A.svg à soin3-H.svg à côté du script
"""
import math
import os
import random

W, H = 768, 960
ICI = os.path.dirname(os.path.abspath(__file__))
PAP, PAP2, ORA, ORA2 = "#F3EADC", "#D9C8B6", "#EE7219", "#F7B062"
MURS = {"sang": "#5C1A15", "fonce": "#3E100C", "brique": "#7B2D21", "papier": "#F1E6D4"}


class Dessin:
    def __init__(self, mur, graine):
        self.o = []
        self.r = random.Random(graine)
        self.mur = MURS[mur]
        self.clair = mur == "papier"
        # l'encre des masses foncées : sur un mur foncé, plus foncée que lui ; sur le papier, le sang de bœuf
        self.dbl = "#5C1A15" if self.clair else "#260807"
        self.entaille = PAP if not self.clair else PAP  # les entailles laissent voir le papier
        self.trait = "#3A0D0A"

    def A(self, s):
        self.o.append(s)

    def u(self, a, b):
        return self.r.uniform(a, b)

    # ------------------------------------------------------------------ le mur et le plancher
    def mur_fond(self, y_table):
        A = self.A
        A(f'<rect width="{W}" height="{H}" fill="{self.mur}"/>')
        # des coups de gouge horizontaux dans le bas du mur, de plus en plus rares en montant ; rien au-dessus de 46 %
        coul = PAP if not self.clair else "#C9B49C"
        for _ in range(60):
            y = self.u(450, y_table - 6)
            t = (y - 450) / max(1, y_table - 456)
            if self.r.random() > 0.15 + 0.85 * t:
                continue
            x = self.u(-20, W)
            l = self.u(18, 70)
            A(f'<path d="M{x:.0f} {y:.0f} q{l / 2:.0f} {self.u(-2, 2):.1f} {l:.0f} 0 q{-l / 2:.0f} {self.u(1, 2.4):.1f} {-l:.0f} 0z" '
              f'fill="{coul}" opacity="{self.u(.12, .3):.2f}"/>')

    def plancher(self, y0):
        A = self.A
        A(f'<rect x="-10" y="{y0}" width="{W + 20}" height="{H - y0 + 10}" fill="{self.dbl}"/>')
        for x in range(-300, 1100, 64):
            A(f'<path d="M{384 + (x - 384) * 0.75:.0f} {y0} L{x} {H}" stroke="{PAP}" stroke-width="1.6" opacity=".55"/>')
        for _ in range(26):
            x, y = self.u(0, W), self.u(y0 + 8, H)
            A(f'<path d="M{x:.0f} {y:.0f} q8 -1 {self.u(14, 30):.0f} 0" fill="none" stroke="{PAP}" stroke-width="1.2" opacity=".45"/>')

    # ------------------------------------------------------------------ la lumière
    def lueur(self, cx, cy, rx, ry, force=1.0):
        self.A('<defs><radialGradient id="lu{0}"><stop offset="0" stop-color="#F7B062" stop-opacity="{1:.2f}"/>'
               '<stop offset=".55" stop-color="#EE7219" stop-opacity="{2:.2f}"/><stop offset="1" stop-color="#EE7219" '
               'stop-opacity="0"/></radialGradient></defs>'.format(len(self.o), .55 * force, .22 * force))
        gid = f"lu{len(self.o) - 1}"
        self.A(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="url(#{gid})"/>')
        # la lumière taillée : des coups de gouge orange autour de la source
        for _ in range(int(26 * force)):
            a = self.u(0, 2 * math.pi)
            d = self.u(0.45, 0.95)
            x, y = cx + math.cos(a) * rx * d, cy + math.sin(a) * ry * d
            if y < 440:
                continue
            l = self.u(10, 26)
            self.A(f'<path d="M{x:.0f} {y:.0f} q{l / 2:.0f} -1.5 {l:.0f} 0" fill="none" stroke="{ORA}" stroke-width="{self.u(1.4, 2.6):.1f}" '
                   f'stroke-linecap="round" opacity=".55"/>')

    # ------------------------------------------------------------------ la table
    def table(self, x0, x1, y, nappe=True, pattes=True):
        A, d = self.A, self.dbl
        if nappe:
            A(f'<polygon points="{x0},{y} {x1},{y} {x1 + 8},{y + 40} {x0},{y + 40}" fill="{PAP}" stroke="{self.trait}" stroke-width="2"/>')
            for k in range(14):       # les plis de la nappe, hachurés
                x = x0 + (x1 - x0) * (k + self.u(0.2, 0.8)) / 14
                A(f'<path d="M{x:.0f} {y + 14} l{self.u(-3, 3):.1f} 26" stroke="{self.trait}" stroke-width="1.4" opacity=".7"/>')
            A(f'<path d="M{x0} {y + 32} H{x1 + 6}" stroke="{self.trait}" stroke-width="1.6"/>')
            haut = y + 40
        else:
            A(f'<rect x="{x0}" y="{y}" width="{x1 - x0}" height="18" fill="{d}"/>')
            for k in range(3):
                A(f'<path d="M{x0 + 6} {y + 5 + k * 5} H{x1 - 6}" stroke="{PAP}" stroke-width="1.2" opacity=".6"/>')
            haut = y + 18
        A(f'<rect x="{x0}" y="{haut}" width="{x1 - x0 + 8}" height="12" fill="{d}"/>')
        A(f'<path d="M{x0 + 4} {haut + 6} H{x1}" stroke="{PAP}" stroke-width="1.2" opacity=".6"/>')
        if pattes:
            for x in (x0 + 26, x1 - 30):
                A(f'<rect x="{x}" y="{haut + 12}" width="22" height="{H}" fill="{d}"/>')
                for k in range(3):
                    A(f'<path d="M{x + 6 + k * 5} {haut + 20} V{H}" stroke="{PAP}" stroke-width="1" opacity=".45"/>')
        return y

    # ------------------------------------------------------------------ les objets
    def vapeur(self, x, y, haut, sens=1, larg=1.0):
        """Deux ou trois lignes de vapeur taillées en S, qui s'arrêtent à `haut` (jamais au-dessus de 44 %)."""
        haut = max(haut, 425)
        for k in range(3):
            x0 = x + (k - 1) * 9 * larg
            h = (y - haut) * self.u(0.6, 1.0)
            d = (f"M{x0:.0f} {y} c{-10 * sens:.0f} {-h * 0.25:.0f} {12 * sens:.0f} {-h * 0.45:.0f} {2 * sens:.0f} {-h * 0.6:.0f} "
                 f"s{10 * sens:.0f} {-h * 0.3:.0f} {6 * sens:.0f} {-h * 0.4:.0f}")
            self.A(f'<path d="{d}" fill="none" stroke="{PAP if not self.clair else "#B9A189"}" stroke-width="{2.6 - k * 0.5:.1f}" '
                   f'stroke-linecap="round" opacity="{0.85 - k * 0.15:.2f}"/>')

    def lampe(self, x, yb, s=1.0, allumee=True):
        A, t = self.A, self.trait
        A(f'<g transform="translate({x} {yb}) scale({s})">')
        A(f'<ellipse cx="0" cy="0" rx="40" ry="8" fill="{self.dbl}"/>')
        A(f'<path d="M-34 -2 Q-40 -48 0 -52 Q40 -48 34 -2Z" fill="{PAP}" stroke="{t}" stroke-width="2"/>')
        for k in range(4):
            A(f'<path d="M-30 {-10 - k * 9} Q0 {-14 - k * 9} 30 {-10 - k * 9}" fill="none" stroke="{t}" stroke-width="1.3" opacity=".55"/>')
        A(f'<rect x="-14" y="-64" width="28" height="14" fill="{self.dbl}"/>')
        A(f'<path d="M-16 -64 Q-26 -108 -12 -132 L-10 -158 H10 L12 -132 Q26 -108 16 -64Z" fill="{PAP}" opacity=".9" stroke="{t}" stroke-width="2"/>')
        A(f'<path d="M-8 -70 Q-16 -104 -6 -128" fill="none" stroke="{PAP2}" stroke-width="3"/>')
        if allumee:
            A(f'<path d="M0 -78 C-9 -94 -4 -110 0 -122 C4 -110 9 -94 0 -78Z" fill="{ORA}"/>')
            A(f'<path d="M0 -82 C-4 -92 -2 -102 0 -108 C2 -102 4 -92 0 -82Z" fill="{ORA2}"/>')
        else:
            A(f'<path d="M-3 -76 h6 v6 h-6z" fill="{self.dbl}"/>')
        A('</g>')

    def bocal(self, x, yb, w, h, plante="sapin"):
        A, t, d = self.A, self.trait, self.dbl
        top = yb - h
        A(f'<rect x="{x}" y="{top}" width="{w}" height="{h}" rx="6" fill="{PAP}" stroke="{t}" stroke-width="2"/>')
        A(f'<rect x="{x - 2}" y="{top - 10}" width="{w + 4}" height="12" rx="2" fill="{d}"/>')
        A(f'<path d="M{x - 2} {top - 5} H{x + w + 2}" stroke="{PAP}" stroke-width="1" opacity=".5"/>')
        cx = x + w / 2
        if plante == "sapin":
            A(f'<path d="M{cx} {yb - 4} V{top + 8}" stroke="{d}" stroke-width="2"/>')
            for yy in range(int(top + 12), int(yb - 6), 6):
                n = 4 + (yy - top) / h * (w / 2 - 6)
                A(f'<path d="M{cx} {yy} l{-n:.1f} -5 M{cx} {yy} l{n:.1f} -5" stroke="{d}" stroke-width="1.8"/>')
        elif plante == "feuilles":
            for j, sx in enumerate((cx - w * 0.22, cx, cx + w * 0.22)):
                A(f'<path d="M{sx:.0f} {yb - 4} L{sx + (j - 1) * 3:.0f} {top + 10}" stroke="{d}" stroke-width="1.6"/>')
                for yy in range(int(top + 16), int(yb - 6), 10):
                    for sg in (1, -1):
                        A(f'<ellipse cx="{sx + sg * 4:.0f}" cy="{yy}" rx="4.6" ry="1.8" transform="rotate({sg * -35} {sx + sg * 4:.0f} {yy})" fill="{d}"/>')
        else:     # des fleurs séchées en têtes rondes
            for j in range(5):
                sx = x + 6 + j * (w - 12) / 4
                hy = top + self.u(10, 26)
                A(f'<path d="M{sx:.0f} {yb - 4} L{sx:.0f} {hy:.0f}" stroke="{d}" stroke-width="1.4"/>')
                A(f'<circle cx="{sx:.0f}" cy="{hy:.0f}" r="4.2" fill="{d}"/>')
        A(f'<path d="M{x + 5} {top + 8} V{yb - 8}" stroke="#FFFFFF" stroke-width="2" opacity=".55"/>')

    def bassin(self, x, yb, w, vapeur_haut=470):
        A, t = self.A, self.trait
        h = w * 0.42
        A(f'<path d="M{x} {yb - h} L{x + w} {yb - h} L{x + w * 0.88} {yb} L{x + w * 0.12} {yb}Z" fill="{PAP}" stroke="{t}" stroke-width="2"/>')
        A(f'<ellipse cx="{x + w / 2}" cy="{yb - h}" rx="{w / 2}" ry="{w * 0.07}" fill="{PAP2}" stroke="{t}" stroke-width="2.4"/>')
        for k in range(3):      # les reflets de l'émail, taillés
            A(f'<path d="M{x + w * (0.2 + k * 0.08):.0f} {yb - h + 12} q4 {h * 0.4:.0f} {w * 0.05:.0f} {h * 0.75:.0f}" fill="none" stroke="{t}" stroke-width="1.3" opacity=".5"/>')
        self.vapeur(x + w / 2, yb - h - 10, vapeur_haut, sens=1, larg=w / 120)

    def linge(self, x, yb, w):
        A, t = self.A, self.trait
        for k, (dx, ww, hh) in enumerate([(0, w, 16), (4, w - 8, 14), (8, w - 16, 12)]):
            y = yb - 16 - k * 14
            A(f'<rect x="{x + dx}" y="{y}" width="{ww}" height="{hh}" rx="4" fill="{PAP}" stroke="{t}" stroke-width="1.8"/>')
            A(f'<path d="M{x + dx + 4} {y + hh / 2} H{x + dx + ww - 4}" stroke="{t}" stroke-width="1" opacity=".5"/>')

    def bandes(self, x, yb, n=3):
        A, t = self.A, self.trait
        for k in range(n):
            cx, r = x + k * 30, 13
            cy = yb - r
            A(f'<rect x="{cx - r}" y="{cy - r}" width="{r * 1.6}" height="{r * 2}" fill="{PAP}" stroke="{t}" stroke-width="1.6"/>')
            A(f'<ellipse cx="{cx + r * 0.6}" cy="{cy}" rx="{r * 0.55}" ry="{r}" fill="{PAP}" stroke="{t}" stroke-width="1.8"/>')
            A(f'<path d="M{cx + r * 0.6} {cy} m0 -2 a3 4 0 1 1 -1 6 a6 8 0 1 1 2 -12" fill="none" stroke="{t}" stroke-width="1.2"/>')

    def mortier(self, x, yb, s=1.0):
        A, d = self.A, self.dbl
        A(f'<g transform="translate({x} {yb}) scale({s})">')
        A(f'<path d="M-36 -46 L36 -46 Q34 -8 18 -2 L18 0 H-18 L-18 -2 Q-34 -8 -36 -46Z" fill="{d}"/>')
        A(f'<ellipse cx="0" cy="-46" rx="36" ry="7" fill="{d}" stroke="{PAP}" stroke-width="1.4" opacity=".95"/>')
        for k in range(4):     # les entailles du mortier de bois
            A(f'<path d="M{-28 + k * 4} {-38 + k * 8} Q0 {-32 + k * 8} {28 - k * 4} {-38 + k * 8}" fill="none" stroke="{PAP}" stroke-width="1.3" opacity=".7"/>')
        A(f'<path d="M6 -48 L44 -96" stroke="{d}" stroke-width="11" stroke-linecap="round"/>')
        A(f'<path d="M14 -56 L40 -90" stroke="{PAP}" stroke-width="1.3" opacity=".7"/>')
        A('</g>')

    def rameau(self, x, y, long, ang):
        a = math.radians(ang)
        dx, dy = math.cos(a), math.sin(a)
        d = self.dbl
        self.A(f'<path d="M{x:.1f} {y:.1f} l{dx * long:.1f} {dy * long:.1f}" stroke="{d}" stroke-width="2.4" stroke-linecap="round"/>')
        for k in range(4, int(long), 5):
            px, py = x + dx * k, y + dy * k
            n = 9 * (1 - 0.5 * k / long)
            for s in (1, -1):
                nx, ny = -dy * s, dx * s
                self.A(f'<path d="M{px:.1f} {py:.1f} l{(nx * 0.9 + dx * 0.4) * n:.1f} {(ny * 0.9 + dy * 0.4) * n:.1f}" '
                       f'stroke="{d}" stroke-width="1.8" stroke-linecap="round"/>')

    def the_labrador(self, x, y, ang):
        a = math.radians(ang)
        dx, dy = math.cos(a), math.sin(a)
        d = self.dbl
        self.A(f'<path d="M{x} {y} l{dx * 70:.1f} {dy * 70:.1f}" stroke="{d}" stroke-width="2"/>')
        for k, t in enumerate(range(30, 74, 6)):
            px, py = x + dx * t, y + dy * t
            for s in (1, -1):
                rot = ang + s * (50 + k * 4)
                self.A(f'<ellipse cx="{px:.1f}" cy="{py:.1f}" rx="9" ry="2.6" transform="rotate({rot:.0f} {px:.1f} {py:.1f}) translate({7 * s} 0)" fill="{d}"/>')
        tx, ty = x + dx * 76, y + dy * 76
        for k in range(6):
            self.A(f'<circle cx="{tx + 5 * math.cos(k * 1.1):.1f}" cy="{ty + 5 * math.sin(k * 1.1):.1f}" r="2.6" fill="{PAP}" stroke="{d}" stroke-width="1"/>')

    def poele(self, x, y, w, h, feu=True, porte="ouverte", bouilloire=True):
        """Le poêle à bois, gravé : des entailles qui dessinent les panneaux de fonte."""
        A, d = self.A, self.dbl
        A(f'<rect x="{x - 10}" y="{y - 12}" width="{w + 20}" height="16" rx="3" fill="{d}"/>')
        A(f'<path d="M{x - 6} {y - 6} H{x + w + 6}" stroke="{PAP}" stroke-width="1.3" opacity=".7"/>')
        A(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{d}"/>')
        A(f'<rect x="{x + 12}" y="{y + 12}" width="{w - 24}" height="{h - 24}" rx="4" fill="none" stroke="{PAP}" stroke-width="1.6" opacity=".75"/>')
        for k in range(5):
            A(f'<path d="M{x + 20} {y + h - 22 - k * 7} H{x + w - 20}" stroke="{PAP}" stroke-width="1" opacity=".4"/>')
        for xx in (x + 10, x + w - 24):
            A(f'<path d="M{xx} {y + h} l-4 46 h16 l4 -46z" fill="{d}"/>')
        wx, wy, ww, wh = x + w * 0.2, y + h * 0.22, w * 0.6, h * 0.42
        if feu:
            A(f'<rect x="{wx}" y="{wy}" width="{ww}" height="{wh}" fill="{ORA}"/>')
            fl = (f"M{wx + ww * 0.12} {wy + wh} C{wx + ww * 0.15} {wy + wh * 0.5} {wx + ww * 0.32} {wy + wh * 0.6} {wx + ww * 0.3} {wy + wh * 0.2} "
                  f"C{wx + ww * 0.5} {wy + wh * 0.45} {wx + ww * 0.52} {wy + wh * 0.6} {wx + ww * 0.58} {wy + wh * 0.35} "
                  f"C{wx + ww * 0.75} {wy + wh * 0.6} {wx + ww * 0.8} {wy + wh * 0.75} {wx + ww * 0.88} {wy + wh}Z")
            A(f'<path d="{fl}" fill="{ORA2}"/>')
            for k in range(3):      # les bûches taillées sous la flamme
                A(f'<path d="M{wx + 8 + k * ww * 0.3:.0f} {wy + wh - 6} h{ww * 0.26:.0f}" stroke="{d}" stroke-width="5" stroke-linecap="round"/>')
        else:
            A(f'<rect x="{wx}" y="{wy}" width="{ww}" height="{wh}" fill="{d}" stroke="{PAP}" stroke-width="1.6" opacity=".9"/>')
        A(f'<rect x="{wx - 6}" y="{wy - 6}" width="{ww + 12}" height="6" fill="{d}"/><rect x="{wx - 6}" y="{wy + wh}" width="{ww + 12}" height="6" fill="{d}"/>')
        if feu and porte == "ouverte":
            A(f'<polygon points="{wx + ww},{wy - 6} {wx + ww + 30},{wy - 14} {wx + ww + 30},{wy + wh + 14} {wx + ww},{wy + wh + 6}" fill="{d}" '
              f'stroke="{PAP}" stroke-width="1.3"/>')
        if bouilloire:
            bx = x + w * 0.42
            A(f'<path d="M{bx - 40} {y - 12} Q{bx - 44} {y - 62} {bx} {y - 64} Q{bx + 44} {y - 62} {bx + 40} {y - 12}Z" fill="{d}"/>')
            A(f'<path d="M{bx - 30} {y - 30} Q{bx} {y - 34} {bx + 30} {y - 30}" fill="none" stroke="{PAP}" stroke-width="1.3" opacity=".7"/>')
            A(f'<path d="M{bx + 38} {y - 36} L{bx + 76} {y - 58} L{bx + 79} {y - 51} L{bx + 42} {y - 24}Z" fill="{d}"/>')
            A(f'<path d="M{bx - 26} {y - 58} Q{bx} {y - 96} {bx + 26} {y - 58}" fill="none" stroke="{d}" stroke-width="6"/>')
            self.vapeur(bx + 82, y - 60, y - 160, sens=1, larg=0.8)


def scene(nom, mur, graine, construire):
    d = Dessin(mur, graine)
    d.A(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
    construire(d)
    d.A('</svg>')
    out = os.path.join(ICI, f"soin3-{nom}.svg")
    open(out, "w", encoding="utf-8").write("\n".join(d.o) + "\n")
    return out


# ---------------------------------------------------------------------- les huit compositions

def A_large_lampe(d):
    """Comme le n° 4, gravé : la lampe et le feu, mur sang de bœuf ; mortier et bandes en plus."""
    d.mur_fond(690)
    d.lueur(170, 650, 230, 120)
    d.poele(560, 600, 230, 250, feu=True)
    d.table(-10, 540, 690)
    d.plancher(890)
    d.lampe(100, 688)
    d.bocal(170, 688, 40, 96, "sapin"); d.bocal(216, 688, 40, 76, "feuilles")
    d.mortier(300, 688, 0.9)
    d.bassin(352, 688, 120, vapeur_haut=500)
    d.bandes(470, 690, 2)
    d.rameau(130, 704, 140, -6); d.the_labrador(290, 706, -6)


def B_pres_lampe(d):
    """Près de la table, la lampe seule : les objets en grand, le poêle coupé par le bord, éteint."""
    d.mur_fond(720)
    d.lueur(150, 640, 260, 150, 1.1)
    d.poele(640, 640, 260, 260, feu=False, bouilloire=False)
    d.table(-20, 640, 720, pattes=False)
    d.lampe(130, 718, 1.35)
    d.bocal(230, 718, 52, 120, "sapin"); d.bocal(290, 718, 52, 96, "fleurs")
    d.bassin(370, 718, 170, vapeur_haut=470)
    d.linge(552, 720, 80)
    d.rameau(150, 736, 190, -4); d.the_labrador(380, 738, -4)


def C_pres_poele(d):
    """Près de la table, le feu du poêle seul, mur plus foncé : le mortier, les bandes, le bassin."""
    d.mur_fond(730)
    d.lueur(600, 700, 300, 170, 1.2)
    d.poele(520, 600, 300, 300, feu=True, bouilloire=True)
    d.table(-20, 500, 730, pattes=False)
    d.bocal(30, 728, 52, 116, "feuilles"); d.bocal(92, 728, 52, 92, "sapin")
    d.mortier(210, 728, 1.25)
    d.bassin(280, 728, 160, vapeur_haut=480)
    d.bandes(440, 730, 2)
    d.rameau(40, 746, 170, -3)


def D_large_poele(d):
    """Large, le poêle entier au centre, le feu seul, mur brique : un tabouret avec le bassin et le linge."""
    d.mur_fond(700)
    d.lueur(400, 760, 320, 160, 1.1)
    d.poele(270, 560, 250, 280, feu=True)
    d.plancher(886)
    # le tabouret à gauche
    dd = d.dbl
    d.A(f'<rect x="60" y="720" width="170" height="16" rx="4" fill="{dd}"/>')
    for x1, x2 in ((74, 62), (216, 228), (114, 108), (176, 184)):
        d.A(f'<path d="M{x1} 736 L{x2} 900" stroke="{dd}" stroke-width="10" stroke-linecap="round"/>')
        d.A(f'<path d="M{x1 + 1} 744 L{x2} 890" stroke="{PAP}" stroke-width="1" opacity=".45"/>')
    d.bassin(70, 718, 150, vapeur_haut=520)
    d.linge(560, 886, 110)
    d.bandes(610, 830, 2)
    # le bois cordé à droite
    for row in range(3):
        for k in range(4 - (row > 1)):
            x, y = 620 + k * 34 + row * 6, 872 - row * 30 - 70
            d.A(f'<circle cx="{x}" cy="{y + 70}" r="15" fill="{dd}"/><circle cx="{x}" cy="{y + 70}" r="9" fill="none" stroke="{PAP}" stroke-width="1.4" opacity=".7"/>')


def E_pres_papier(d):
    """Près de la table, mur de papier : les objets en sang de bœuf, seule la flamme de la lampe en orange."""
    d.mur_fond(720)
    d.lueur(160, 640, 200, 120, 0.8)
    d.table(-20, 788, 720, nappe=False, pattes=False)
    d.A(f'<rect x="-10" y="738" width="{W + 20}" height="{H}" fill="{d.dbl}"/>')
    for k in range(9):
        d.A(f'<path d="M-10 {752 + k * 22} Q384 {746 + k * 22} {W + 10} {752 + k * 22}" fill="none" stroke="{PAP}" stroke-width="1.4" opacity=".55"/>')
    d.lampe(140, 718, 1.3)
    d.bocal(240, 718, 54, 118, "feuilles"); d.bocal(302, 718, 54, 94, "sapin")
    d.mortier(410, 718, 1.2)
    d.bassin(470, 718, 160, vapeur_haut=480)
    d.linge(640, 720, 96)
    d.rameau(260, 700, 0, 0)


def F_large_papier(d):
    """Large, mur de papier, le feu du poêle seul : la table à gauche, le poêle entier à droite."""
    d.mur_fond(700)
    d.lueur(620, 720, 220, 140, 0.9)
    d.poele(500, 590, 240, 260, feu=True)
    d.table(-10, 470, 700, nappe=False)
    d.plancher(880)
    d.bocal(30, 698, 46, 100, "sapin"); d.bocal(84, 698, 46, 80, "fleurs")
    d.mortier(180, 698, 1.0)
    d.bassin(240, 698, 140, vapeur_haut=520)
    d.bandes(400, 700, 2)


def G_large_fonce(d):
    """Large, mur très foncé, la lampe et le feu : le linge et les bandes, le sapin et le thé du Labrador."""
    d.mur_fond(690)
    d.lueur(160, 650, 220, 120)
    d.lueur(660, 720, 200, 140, 0.8)
    d.poele(560, 600, 230, 250, feu=True)
    d.table(-10, 540, 690)
    d.plancher(890)
    d.lampe(110, 688)
    d.bocal(190, 688, 44, 96, "fleurs")
    d.bassin(250, 688, 140, vapeur_haut=500)
    d.linge(400, 690, 76)
    d.bandes(484, 690, 1)
    d.rameau(120, 704, 140, -5); d.the_labrador(300, 706, -3)


def H_pres_brique(d):
    """Près de la table, mur brique, la lampe seule : la lampe au centre, le bassin, le mortier, les bocaux."""
    d.mur_fond(720)
    d.lueur(384, 630, 300, 160, 1.1)
    d.table(-20, 788, 720, pattes=False)
    d.bocal(40, 718, 52, 118, "sapin"); d.bocal(100, 718, 52, 96, "feuilles"); d.bocal(160, 718, 52, 108, "fleurs")
    d.bassin(230, 718, 140, vapeur_haut=500)
    d.lampe(430, 718, 1.35)
    d.mortier(540, 718, 1.15)
    d.bandes(610, 720, 2)
    d.rameau(40, 738, 200, -2); d.the_labrador(520, 738, -4)


COMPOS = [("A", "sang", A_large_lampe), ("B", "sang", B_pres_lampe), ("C", "fonce", C_pres_poele),
          ("D", "brique", D_large_poele), ("E", "papier", E_pres_papier), ("F", "papier", F_large_papier),
          ("G", "fonce", G_large_fonce), ("H", "brique", H_pres_brique)]

if __name__ == "__main__":
    for k, (nom, mur, f) in enumerate(COMPOS):
        print(scene(nom, mur, 3100 + k, f))
