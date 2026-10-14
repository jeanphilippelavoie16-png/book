# -*- coding: utf-8 -*-
"""Polices de secours du livre : les quelques caractères qu'IBM Plex n'a pas, pris chez ses voisins et
posés sous deux familles, « Secours Serif » et « Secours Sans », que les piles --serif et --sans du gabarit
nomment juste après Plex (interieur.tpl.html). Sans elles, Edge les prenait dans Georgia, Times ou Segoe
(28 septembre 2026, « tout le livre homogène »).

    python design/outils/polices-secours.py

- ᵉ ʳ ⁺ (exposants : 55ᵉ, 1ʳᵉ, Fe²⁺) : Noto Serif sous le texte en serif, Noto Sans sous le texte en sans ;
- Ω α μ (kΩ, α-linolénique, 1 μm) : Noto Serif en serif, IBM Plex Sans en sans ;
- ∅ : Noto Sans Math ; ⚠ : Noto Sans Symbols 2 (un seul poids : déclaré sous les deux plages, pour que le gras
  ne soit pas un faux gras) ;
- ≥ ≤ ≈ → ₂ … sont DANS Plex : c'est le lien Google « text= » du gabarit qui les recharge, pas ce fichier.

Les fontes sont des instances fixes (pas des fontes variables : Edge incorpore une fonte variable en
Type 3, sans nom), réduites aux seuls caractères voulus et incorporées en data: dans le gabarit, entre
les repères /* polices-secours:debut */ et /* polices-secours:fin */. Toutes sous licence SIL OFL 1.1
(Google Fonts). Les fichiers source sont gardés dans design/polices/.
"""
import os, re, io, base64, urllib.request
from fontTools import subset
from fontTools.ttLib import TTFont

def _racine_livre():
    # Windows (le PC de JP) : le dossier d'origine ; ailleurs (session dans le nuage) : le dépôt qui contient ce fichier
    if os.name == "nt":
        return r"C:\Users\jeanp\New folder"
    d = os.path.dirname(os.path.abspath(__file__))
    while d != os.path.dirname(d) and not os.path.exists(os.path.join(d, "CLAUDE.md")):
        d = os.path.dirname(d)
    return d
ROOT = _racine_livre()
POL = os.path.join(ROOT, "design", "polices")
TPL = os.path.join(ROOT, "design", "directions", "1-manuel-de-terrain", "outils", "interieur.tpl.html")
EXP, GREC, VIDE, AVERT = "ᵉʳ⁺", "Ωαμ", "∅", "⚠"

# (famille Google, fichier local) ; les URL viennent de l'API css2 interrogée sans navigateur (TTF fixes)
SOURCES = {
    "Noto Serif": "Noto+Serif:ital,wght@0,400;0,700;1,400;1,700",
    "Noto Sans": "Noto+Sans:ital,wght@0,400;0,700;1,400;1,700",
    "IBM Plex Sans": "IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700",
    "Noto Sans Math": "Noto+Sans+Math",
    "Noto Sans Symbols 2": "Noto+Sans+Symbols+2",
}

def telecharger():
    os.makedirs(POL, exist_ok=True)
    out = {}
    for fam, q in SOURCES.items():
        css = urllib.request.urlopen("https://fonts.googleapis.com/css2?family=" + q, timeout=60).read().decode()
        for bloc in re.findall(r"@font-face\s*\{(.*?)\}", css, re.S):
            style = re.search(r"font-style:\s*(\w+)", bloc).group(1)
            w = int(re.search(r"font-weight:\s*(\d+)", bloc).group(1))
            u = re.search(r"url\((https://[^)]+\.ttf)\)", bloc).group(1)
            nom = f"{fam.replace(' ', '')}-{w}{'i' if style == 'italic' else ''}.ttf"
            f = os.path.join(POL, nom)
            if not os.path.exists(f):
                open(f, "wb").write(urllib.request.urlopen(u, timeout=60).read())
            out[(fam, style, w)] = f
    return out

def reduire(f, texte):
    t = TTFont(f)
    if "fvar" in t:
        raise SystemExit(f"{f} est une fonte variable : Edge l'incorporerait en Type 3")
    opt = subset.Options()
    opt.layout_features = []; opt.hinting = False; opt.notdef_outline = True
    s = subset.Subsetter(opt)
    s.populate(text=texte)
    s.subset(t)
    b = io.BytesIO(); t.save(b)
    return base64.b64encode(b.getvalue()).decode()

def face(famille, src, texte, style, poids):
    rng = ",".join(f"U+{ord(c):04X}" for c in texte)
    return (f"@font-face{{font-family:'{famille}';font-style:{style};font-weight:{poids};font-display:block;"
            f"unicode-range:{rng};src:url(data:font/ttf;base64,{src}) format('truetype')}}")

def main():
    f = telecharger()
    css = ["/* polices-secours:debut — écrit par design/outils/polices-secours.py, ne pas modifier à la main */"]
    for fam_css, exp_de, grec_de in (("Secours Serif", "Noto Serif", "Noto Serif"), ("Secours Sans", "Noto Sans", "IBM Plex Sans")):
        for style in ("normal", "italic"):
            for w, plage in ((400, "100 550"), (700, "551 900")):
                if exp_de == grec_de:
                    css.append(face(fam_css, reduire(f[(exp_de, style, w)], EXP + GREC), EXP + GREC, style, plage))
                else:
                    css.append(face(fam_css, reduire(f[(exp_de, style, w)], EXP), EXP, style, plage))
                    css.append(face(fam_css, reduire(f[(grec_de, style, w)], GREC), GREC, style, plage))
                # ∅ et ⚠ n'existent qu'en un poids : la même fonte sous les deux plages. Toutes les faces d'une
                # famille doivent porter les mêmes plages de poids : le navigateur ne retient que le jeu de
                # descripteurs le plus proche, et une face « 100 900 » à côté de « 100 550 » était ignorée.
                for fam_src, txt in (("Noto Sans Math", VIDE), ("Noto Sans Symbols 2", AVERT)):
                    css.append(face(fam_css, reduire(f[(fam_src, "normal", 400)], txt), txt, style, plage))
    css.append("/* polices-secours:fin */")
    bloc = "\n".join(css)
    tpl = open(TPL, encoding="utf-8").read()
    if "/* polices-secours:debut" in tpl:
        tpl = re.sub(r"/\* polices-secours:debut.*?/\* polices-secours:fin \*/", lambda m: bloc, tpl, flags=re.S)
    else:
        i = tpl.index("<style>") + len("<style>")
        tpl = tpl[:i] + "\n" + bloc + "\n" + tpl[i:]
    open(TPL, "w", encoding="utf-8").write(tpl)
    print(f"{len(css) - 2} @font-face, {len(bloc) // 1024} Ko, dans {TPL}")

if __name__ == "__main__":
    main()
