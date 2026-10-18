# -*- coding: utf-8 -*-
"""Logigramme de décision du Manuel du Nord.

Un arbre de questions oui / non qui mène aux gestes et aux renvois d'un chapitre, aux couleurs et aux polices du
livre, en page simple ou en double page (deux pages face à face : verso à gauche, recto à droite).

    python design/outils/logigramme.py images/logigrammes/04-retombees.json
    python design/outils/logigramme.py FICHIER.json --sortie DOSSIER     ailleurs qu'à côté du JSON
    python design/outils/logigramme.py FICHIER.json --svg                le SVG et le contrôle, sans navigateur
    python design/outils/logigramme.py FICHIER.json --svg --plan         plus la place de chaque boîte, en pouces
    python design/outils/logigramme.py FICHIER.json --sans-entete --svg  NOM-livre.svg, sans titre courant ni onglet :
                                                                         la version que chapitre.js pose dans le livre (clé
                                                                         « logigramme » des placements), sous son titre
                                                                         courant, son onglet et son pied de page

Sorties, sous le nom du JSON :
  NOM.svg  le dessin, fond perdu compris (double : 16,25 × 10,25 po ; simple : 8,125 × 10,25 po) ; polices par
           Google Fonts, comme interieur.tpl.html.
  NOM.pdf  les pages du livre, 8,125 × 10,25 po chacune, fond perdu en tête, en pied et au bord extérieur, rien
           au petit fond ; TrimBox et BleedBox posés comme dans build_chapitre.rendu(). Double : page 1 = verso
           (gauche), page 2 = recto (droite). Polices incorporées, aucune transparence (le contrôle le vérifie).
  NOM.png  la double page vue ouverte, rognée, avec un trait fin au pli ; simple : la page rognée. 192 ppp.

Le contrôle s'imprime à la fin : boîtes qui se chevauchent, flèches qui se croisent ou qui traversent une boîte,
pastille posée sur une autre flèche, boîte ou texte dans la zone du pli ou hors de la zone sûre de Blurb, texte
qui dépasse sa boîte au rendu. Code de sortie 1 s'il trouve une erreur.

Le JSON. Mesures en pouces, origine au coin haut gauche du rognage (double page : du rognage de la page de
gauche ; le pli est à x = 8).
{
  "format": "double" | "simple",      "cote": "recto" | "verso"      (cote : page simple seulement)
  "tome": 1,                                       couleur du tome (couleur.css, body.tN)
  "entete": {"chapitre": "04 · Retombées radioactives", "onglet": "4", "folios": [null, null]},
  "urgent": true,                                  onglet et repère de tranche orange (premières minutes)
  "fleches": "plein" | "pointille",                trait des flèches (plein par défaut)
  "colonnes": {"tronc": [0.5, 3.4], ...},          bord gauche et bord droit
  "rangs": {"r2": 2.05, ...},                      ligne médiane : les boîtes d'un rang sont centrées dessus
  "noeuds": [
    {"id": "q1", "type": "question", "col": "tronc", "rang": "r2", "texte": "…", "precision": "…"},
    {"id": "a1", "type": "urgent", "x": [4.0, 7.375], "y": 2.05, "texte": "**Le geste**, puis la suite.",
     "renvoi": "ch. 4, étape 6", "temps": "10 min"}
  ],
  "liens": [
    {"de": "q1", "vers": "a1", "etiquette": "Oui"},
    {"de": "q2", "vers": "m", "etiquette": "Maison", "icone": "maison", "coude": 3.3, "pos": "fin"},
    {"de": "z", "vers": "b", "sortie": "bas", "entree": "gauche", "via": [[7.0, 8.75], [8.8, 8.75], [8.8, 1.3]]}
  ]
}
Nœuds : depart (aplat du tome, texte blanc), question (cadre du tome, coins ronds, « precision » en italique),
urgent (orange des premières minutes), geste (teinte pâle du tome), danger (cadre et bandeau rouges, « titre »).
Position : « col » ou « x » (intervalle), « rang » ou « y » (ligne médiane ; avec « ancre »: "haut", le haut de
la boîte : les boîtes d'une fourche partent alors de la même hauteur). « renvoi » : l'onglet du coin bas
droit ; « temps » : la pastille du coin haut gauche ; « taille » : corps du texte, pour un nœud.
Liens : « sortie » et « entree » (haut, bas, gauche, droite ; déduites sinon), « sx » / « ex », ou « sy » / « ey » (le point de
sortie ou d'entrée sur son côté : x pour haut et bas, y pour gauche et droite), « coude » (y du palier
horizontal, ou x du palier vertical), « via » (points de passage, tracé orthogonal), « etiquette » (pastille :
Oui en plein, Non en creux, le reste en plein), « icone » (maison, chalet : pictogrammes de variante.py),
« pos » (debut : au départ du premier segment ; palier : au départ du dernier, sous le palier d'une fourche, à
la même hauteur pour toutes ses branches ; fin : au bout du dernier ; milieu : au milieu du premier).

Couleurs et pictogrammes : lus dans interieur.tpl.html (:root), couleur.css (body.tN) et variante.py (ICONES),
jamais recopiés ici. Polices : IBM Plex Sans Condensed et IBM Plex Serif, prises dans design/polices/ si elles
y sont, sinon téléchargées une fois de Google Fonts dans ~/.cache/grand-livre/polices/ ; le texte se mesure avec
elles (Pillow, mise en forme Raqm, crénage compris), puis le navigateur vérifie la mesure au rendu.
Navigateur : Edge sous Windows, Chromium de Playwright ailleurs (comme build_chapitre.py).
"""
import sys, os, re, ast, json, glob, math, html, shutil, tempfile, subprocess, urllib.request, urllib.parse

# ------------------------------------------------------------------ chemins
def _racine_livre():
    d = os.path.dirname(os.path.abspath(__file__))
    while d != os.path.dirname(d) and not os.path.exists(os.path.join(d, "CLAUDE.md")):
        d = os.path.dirname(d)
    return d
ROOT = _racine_livre()
TPL = os.path.join(ROOT, "design", "directions", "1-manuel-de-terrain", "outils", "interieur.tpl.html")
COULEUR = os.path.join(ROOT, "design", "variantes-couleur", "outils", "couleur.css")
VARIANTE = os.path.join(ROOT, "design", "variantes-couleur", "outils", "variante.py")
NAV = (r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" if os.name == "nt"
       else (sorted(glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome")) or ["chromium"])[-1])

# ------------------------------------------------------------------ format (sources/blurb-specifications.md)
PT = 72.0
FP = 0.125 * PT            # fond perdu : tête, pied, bord extérieur ; rien au petit fond
PAGE_W, PAGE_H = 585.0, 738.0
ROG_W, ROG_H = 576.0, 720.0
SUR = 0.25 * PT            # zone sûre, tête, pied, bord extérieur
PLI = 0.625 * PT           # zone sûre au pli : le texte de la page Blurb dit 0,625 po, son tableau 0,5 ; on prend
                           # la plus large des deux
GRILLE = (0.5 * PT, 0.75 * PT, 9.25 * PT)   # bloc du livre : 0,5 po des côtés, de 0,75 à 9,25 po en hauteur

# ------------------------------------------------------------------ jetons du livre
def _bloc(texte, sel):
    m = re.search(re.escape(sel) + r"\s*\{(.*?)\}", texte, re.S)
    if not m:
        sys.exit(f"jetons introuvables : {sel}")
    return dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+?)\s*;", m.group(1) + ";"))

def jetons(tome):
    racine = _bloc(open(TPL, encoding="utf-8").read(), ":root")
    t = _bloc(open(COULEUR, encoding="utf-8").read(), f"body.t{tome}")
    j = {k: racine[k] for k in ("--red", "--or", "--orp", "--k", "--k70")}
    j.update({k: t[k] for k in ("--ta", "--tp", "--tp2", "--tf", "--tfi", "--tsq")})
    return j

def icones():
    """ICONES de variante.py (maison, chalet…), lu sans importer le module : seules les affectations S et ICONES
    sont exécutées."""
    arbre = ast.parse(open(VARIANTE, encoding="utf-8").read())
    ns = {}
    for n in arbre.body:
        if isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id in ("S", "ICONES") for t in n.targets):
            exec(compile(ast.Module([n], []), VARIANTE, "exec"), ns)
    return ns["ICONES"]

# triangle du bandeau danger, tel que chapitre.js le pose (blanc, point d'exclamation rouge)
DSVG = ('<svg viewBox="0 0 34 30"><path d="M17 1.5 L32.5 28.5 H1.5 Z" fill="#fff"/><path d="M15.2 10 H18.8 L18.1 '
        '20.5 H15.9 Z" fill="#9B2C1E"/><rect x="15.4" y="22.3" width="3.2" height="3.2" fill="#9B2C1E"/></svg>')

def icone_svg(src, x, y, h, couleur, rouge=None):
    """Le pictogramme en ligne (pas d'image, pas de masque), mis à la hauteur h, son coin haut gauche en (x, y).
    Rend (svg, largeur)."""
    vb = [float(v) for v in re.search(r"viewBox=['\"]([^'\"]+)['\"]", src).group(1).split()]
    dedans = re.search(r"<svg[^>]*>(.*)</svg>", src, re.S).group(1)
    if rouge:
        dedans = dedans.replace("#9B2C1E", rouge)
    dedans = re.sub(r"#000(?![0-9A-Fa-f])", couleur, dedans)
    s = h / vb[3]
    return (f'<g transform="translate({x:.2f},{y:.2f}) scale({s:.4f}) translate({-vb[0]},{-vb[1]})">{dedans}</g>',
            vb[2] * s)

# ------------------------------------------------------------------ polices
FAM = {"sans": "IBM Plex Sans Condensed", "serif": "IBM Plex Serif"}
VOULUES = [("sans", 400, False), ("sans", 500, False), ("sans", 600, False), ("sans", 700, False),
           ("serif", 400, False), ("serif", 400, True), ("serif", 600, False)]
CACHE = os.path.join(os.path.expanduser("~"), ".cache", "grand-livre", "polices")
GF_CSS = ("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@0,400;0,500;0,600;0,700"
          "&family=IBM+Plex+Serif:ital,wght@0,400;0,600;1,400&display=block")
UA = "GrandLivreDuChalet/1.0 (livre personnel)"

def nom_police(fam, w, it):
    return f"{FAM[fam].replace(' ', '')}-{w}{'i' if it else ''}.ttf"

def polices():
    """{(fam, graisse, italique): chemin du TTF}. design/polices/ d'abord, puis le cache, puis Google Fonts."""
    out, manque = {}, []
    for k in VOULUES:
        n = nom_police(*k)
        for d in (os.path.join(ROOT, "design", "polices"), CACHE):
            if os.path.exists(os.path.join(d, n)):
                out[k] = os.path.join(d, n); break
        else:
            manque.append(k)
    if manque:
        os.makedirs(CACHE, exist_ok=True)
        css = urllib.request.urlopen(urllib.request.Request(GF_CSS, headers={"User-Agent": UA}), timeout=60).read().decode()
        for bloc in re.findall(r"@font-face\s*\{(.*?)\}", css, re.S):
            fam = re.search(r"font-family:\s*'([^']+)'", bloc).group(1)
            it = "italic" in re.search(r"font-style:\s*(\w+)", bloc).group(1)
            w = int(re.search(r"font-weight:\s*(\d+)", bloc).group(1))
            url = re.search(r"url\(([^)]+)\)", bloc).group(1)
            k = ({v: c for c, v in FAM.items()}[fam], w, it)
            if k in manque and url.endswith(".ttf"):
                p = os.path.join(CACHE, nom_police(*k))
                with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r, open(p, "wb") as f:
                    f.write(r.read())
                out[k] = p
        for k in manque:
            if k not in out:
                sys.exit(f"police introuvable : {k} (Google Fonts n'a pas rendu de TTF)")
    return out

_PIL = {}
def _f(fam, w, it):
    from PIL import ImageFont
    k = (fam, w, it)
    if k not in _PIL:
        _PIL[k] = ImageFont.truetype(POL[k], 1000, layout_engine=ImageFont.Layout.RAQM)
    return _PIL[k]

def largeur(t, fam, w, taille, it=False, ls=0.0):
    """Largeur en pt du texte t (crénage compris), plus l'interlettrage ls (en pt) par caractère."""
    return _f(fam, w, it).getlength(t) * taille / 1000.0 + ls * len(t)

# ------------------------------------------------------------------ texte
INS = "\u00a0"
def typo(t):
    """Espaces insécables du français : avant : ; ? ! », après «, entre un nombre et son unité, dans « ch. 4 »,
    « § 8 », « étape 6 »."""
    t = t.replace("'", "\u2019")                    # apostrophe typographique, comme le livre
    t = re.sub(r" ([:;?!»])", INS + r"\1", t)
    t = re.sub(r"« ", "«" + INS, t)
    t = re.sub(r"(\d) (h|min|mg|g|kg|L|mL|°C|ans|an|jours|semaines|mois|cm|mm|m|km|%)(?=[\s,.;:)]|$)", r"\1" + INS + r"\2", t)
    t = re.sub(r"\b(ch\.|étapes?|§) (\d)", r"\1" + INS + r"\2", t)
    t = re.sub(r"(\d) à (\d)", r"\1" + INS + "à" + INS + r"\2", t)
    return t

def mots(t):
    """« **gras** normal » -> [[(fragment, gras), …] par mot]. Les espaces insécables ne coupent pas."""
    t = typo(t)
    frags, gras = [], False
    for i, morceau in enumerate(t.split("**")):
        if morceau:
            frags.append((morceau, i % 2 == 1))
    out, cur = [], []
    for txt, g in frags:
        parties = txt.split(" ")
        for j, p in enumerate(parties):
            if j > 0:
                if cur:
                    out.append(cur)
                cur = []
            if p:
                cur.append((p, g))
    if cur:
        out.append(cur)
    return out

def couper(ms, maxw, st):
    """Coupure gloutonne. Rend [(ligne = [mots], largeur)]."""
    def lw(m):
        return sum(largeur(f, st["fam"], st["wb"] if g else st["w"], st["taille"], st.get("it", False)) for f, g in m)
    esp = largeur(" ", st["fam"], st["w"], st["taille"], st.get("it", False))
    lignes, cur, cw = [], [], 0.0
    for m in ms:
        w = lw(m)
        if cur and cw + esp + w > maxw:
            lignes.append((cur, cw)); cur, cw = [], 0.0
        cw = w if not cur else cw + esp + w
        cur.append(m)
    if cur:
        lignes.append((cur, cw))
    return lignes

def couper_equilibre(ms, maxw, st):
    """Même nombre de lignes que la coupure gloutonne, mais les lignes les plus égales possible (questions,
    départ : pas de mot seul sur la dernière ligne)."""
    base = couper(ms, maxw, st)
    if len(base) < 2:
        return base
    lo, hi = maxw * 0.4, maxw
    for _ in range(18):
        mid = (lo + hi) / 2
        if len(couper(ms, mid, st)) <= len(base):
            hi = mid
        else:
            lo = mid
    return couper(ms, hi + 0.01, st)

def svg_ligne(ligne, x, y, st, ancre, couleur):
    """Une ligne de texte : <text> et un <tspan> par changement de graisse."""
    runs = []
    for i, m in enumerate(ligne):
        for j, (f, g) in enumerate(m):
            txt = (" " if i > 0 and j == 0 else "") + f
            if runs and runs[-1][1] == g:
                runs[-1][0] += txt
            else:
                runs.append([txt, g])
    fam = FAM[st["fam"]]
    it = ' font-style="italic"' if st.get("it") else ""
    corps = "".join(f'<tspan font-weight="{st["wb"] if g else st["w"]}">{html.escape(t, quote=False)}</tspan>' for t, g in runs)
    return (f'<text x="{x:.2f}" y="{y:.2f}" font-family="{fam}" font-size="{st["taille"]}"{it} fill="{couleur}" '
            f'text-anchor="{ancre}" xml:space="preserve">{corps}</text>')

# ------------------------------------------------------------------ styles
def styles(J):
    sans = dict(fam="sans")
    return {
        "depart":   dict(sans, w=700, wb=700, taille=17, lh=20, pad=(10, 14, 11, 14), fond=J["--ta"], trait=None, ep=0,
                         encre="#fff", ancre="start", rayon=0, equilibre=True),
        "question": dict(sans, w=700, wb=700, taille=13, lh=15.5, pad=(8, 12, 8.5, 12), fond="#fff", trait=J["--ta"],
                         ep=1.75, encre=J["--k"], ancre="middle", rayon=10, equilibre=True),
        "urgent":   dict(sans, w=500, wb=700, taille=11, lh=13.5, pad=(7, 9, 7.5, 9), fond=J["--orp"], trait=J["--or"],
                         ep=1.5, encre=J["--k"], ancre="start", rayon=0, onglet=J["--or"], onglet_encre=J["--k"]),
        "geste":    dict(sans, w=500, wb=700, taille=11, lh=13.5, pad=(7, 9, 7.5, 9), fond=J["--tp"], trait=J["--ta"],
                         ep=1.5, encre=J["--k"], ancre="start", rayon=0, onglet=J["--ta"], onglet_encre="#fff"),
        "danger":   dict(sans, w=500, wb=700, taille=10.5, lh=13, pad=(7, 9, 7.5, 9), fond="#fff", trait=J["--red"],
                         ep=1.5, encre=J["--k"], ancre="start", rayon=0, onglet=J["--red"], onglet_encre="#fff"),
    }
PRECISION = dict(fam="serif", w=400, wb=600, taille=9.5, lh=11.5, it=True)
ONGLET = dict(fam="sans", w=700, wb=700, taille=8.5)
TEMPS = dict(fam="sans", w=700, wb=700, taille=9)
PAST = dict(fam="sans", w=700, wb=700, taille=9.5)
TRAIT = 1.5                   # flèches : noir plein
POINTE = (8.0, 3.8)           # longueur, demi-largeur
RAYON_COUDE = 6.0

# ------------------------------------------------------------------ mise en place
class Boite:
    def __init__(s, x0, y0, x1, y1):
        s.x0, s.y0, s.x1, s.y1 = x0, y0, x1, y1
    @property
    def cx(s): return (s.x0 + s.x1) / 2
    @property
    def cy(s): return (s.y0 + s.y1) / 2
    def gonfle(s, d): return Boite(s.x0 - d, s.y0 - d, s.x1 + d, s.y1 + d)
    def coupe(s, o): return s.x0 < o.x1 and o.x0 < s.x1 and s.y0 < o.y1 and o.y0 < s.y1

def placer(D, ST):
    cols = {k: (v[0] * PT, v[1] * PT) for k, v in D.get("colonnes", {}).items()}
    rangs = {k: v * PT for k, v in D.get("rangs", {}).items()}
    N = {}
    for n in D["noeuds"]:
        st = dict(ST[n["type"]])
        if "taille" in n:
            st["taille"] = n["taille"]; st["lh"] = round(n["taille"] * 1.23, 1)
        x0, x1 = cols[n["col"]] if "col" in n else (n["x"][0] * PT, n["x"][1] * PT)
        yc = rangs[n["rang"]] if "rang" in n else n["y"] * PT
        pt_, pd, pb, pg = st["pad"]
        if n.get("temps"):
            pt_ += 4
        if n["type"] == "danger":
            pt_ += 21                                            # le bandeau
        inner = x1 - x0 - pd - pg
        coupe = couper_equilibre if st.get("equilibre") else couper
        lignes = coupe(mots(n["texte"]), inner, st)
        h = pt_ + len(lignes) * st["lh"] + pb
        prec = []
        if n.get("precision"):
            prec = couper_equilibre(mots(n["precision"]), inner, PRECISION)
            h += 2 + len(prec) * PRECISION["lh"]
        onglet = None
        if n.get("renvoi"):
            ow = largeur(typo(n["renvoi"]), "sans", 700, ONGLET["taille"]) + 10
            oh = 13.0
            dernier = lignes[-1][1] if st["ancre"] == "start" else inner
            if dernier + 8 + ow > inner + pg - st["ep"] / 2:     # la dernière ligne toucherait l'onglet
                h += oh - pb + 2.5
            onglet = (ow, oh)
        if n.get("ancre") == "haut":                             # le rang donne le haut de la boîte
            b = Boite(x0, yc, x1, yc + h)
        else:
            b = Boite(x0, yc - h / 2, x1, yc + h / 2)
        N[n["id"]] = dict(n=n, st=st, b=b, lignes=lignes, prec=prec, onglet=onglet, pt=pt_, inner=inner)
    return N

# ------------------------------------------------------------------ liens
def port(b, cote, val=None):
    if cote == "bas":    return (val if val is not None else b.cx, b.y1)
    if cote == "haut":   return (val if val is not None else b.cx, b.y0)
    if cote == "gauche": return (b.x0, val if val is not None else b.cy)
    if cote == "droite": return (b.x1, val if val is not None else b.cy)
    sys.exit(f"côté inconnu : {cote}")

def cotes_par_defaut(a, b):
    if b.y0 >= a.y1 - 1:
        return "bas", "haut"
    if b.x0 >= a.x1 - 1:
        return "droite", "gauche"
    if b.x1 <= a.x0 + 1:
        return "gauche", "droite"
    return "haut", "bas"

def orthogonal(pts, premier_vertical):
    """Rend le tracé orthogonal : un segment oblique devient un coude, d'abord dans le sens du segment précédent."""
    out = [pts[0]]
    vert = premier_vertical
    for p in pts[1:]:
        q = out[-1]
        if abs(p[0] - q[0]) > 0.01 and abs(p[1] - q[1]) > 0.01:
            out.append((q[0], p[1]) if vert else (p[0], q[1]))
        out.append(p)
        vert = abs(out[-1][0] - out[-2][0]) < 0.01
    # points alignés en trop
    net = [out[0]]
    for i in range(1, len(out) - 1):
        a, b, c = net[-1], out[i], out[i + 1]
        if (abs(a[0] - b[0]) < 0.01 and abs(b[0] - c[0]) < 0.01) or (abs(a[1] - b[1]) < 0.01 and abs(b[1] - c[1]) < 0.01):
            continue
        net.append(b)
    net.append(out[-1])
    return net

def tracer(L, N):
    a, b = N[L["de"]]["b"], N[L["vers"]]["b"]
    s0, e0 = cotes_par_defaut(a, b)
    s, e = L.get("sortie", s0), L.get("entree", e0)
    sv, ev = L.get("sx", L.get("sy")), L.get("ex", L.get("ey"))
    p0 = port(a, s, sv * PT if sv is not None else None)
    p1 = port(b, e, ev * PT if ev is not None else None)
    vert0 = s in ("haut", "bas")
    if "via" in L:
        pts = [p0] + [(x * PT, y * PT) for x, y in L["via"]] + [p1]
    elif s in ("haut", "bas") and e in ("haut", "bas"):
        ym = L["coude"] * PT if "coude" in L else (p0[1] + p1[1]) / 2
        pts = [p0, (p0[0], ym), (p1[0], ym), p1]
    elif s in ("gauche", "droite") and e in ("gauche", "droite"):
        xm = L["coude"] * PT if "coude" in L else (p0[0] + p1[0]) / 2
        pts = [p0, (xm, p0[1]), (xm, p1[1]), p1]
    elif s in ("haut", "bas"):
        pts = [p0, (p0[0], p1[1]), p1]
    else:
        pts = [p0, (p1[0], p0[1]), p1]
    pts = orthogonal(pts, vert0)
    # le dernier segment doit arriver perpendiculaire au côté d'entrée
    q, p = pts[-2], pts[-1]
    if (e in ("haut", "bas") and abs(q[0] - p[0]) > 0.01) or (e in ("gauche", "droite") and abs(q[1] - p[1]) > 0.01):
        print(f"  ATTENTION : lien {L['de']} -> {L['vers']} : le dernier segment n'arrive pas d'aplomb sur le côté {e}")
    return pts

def chemin(pts, recul):
    """Le tracé en SVG, coins arrondis, le dernier segment raccourci de « recul » (sous la pointe)."""
    pts = [list(p) for p in pts]
    (x0, y0), (x1, y1) = pts[-2], pts[-1]
    d = math.hypot(x1 - x0, y1 - y0)
    if d > recul:
        pts[-1] = [x1 - (x1 - x0) / d * recul, y1 - (y1 - y0) / d * recul]
    out = f"M{pts[0][0]:.2f},{pts[0][1]:.2f}"
    for i in range(1, len(pts) - 1):
        a, b, c = pts[i - 1], pts[i], pts[i + 1]
        r = min(RAYON_COUDE, math.hypot(b[0] - a[0], b[1] - a[1]) / 2, math.hypot(c[0] - b[0], c[1] - b[1]) / 2)
        da = [(b[0] - a[0]), (b[1] - a[1])]; la = math.hypot(*da) or 1
        dc = [(c[0] - b[0]), (c[1] - b[1])]; lc = math.hypot(*dc) or 1
        p1 = (b[0] - da[0] / la * r, b[1] - da[1] / la * r)
        p2 = (b[0] + dc[0] / lc * r, b[1] + dc[1] / lc * r)
        out += f" L{p1[0]:.2f},{p1[1]:.2f} Q{b[0]:.2f},{b[1]:.2f} {p2[0]:.2f},{p2[1]:.2f}"
    out += f" L{pts[-1][0]:.2f},{pts[-1][1]:.2f}"
    return out

def pointe(pts):
    (x0, y0), (x1, y1) = pts[-2], pts[-1]
    d = math.hypot(x1 - x0, y1 - y0) or 1
    ux, uy = (x1 - x0) / d, (y1 - y0) / d
    lg, dl = POINTE
    bx, by = x1 - ux * lg, y1 - uy * lg
    return f"M{x1:.2f},{y1:.2f} L{bx - uy * dl:.2f},{by + ux * dl:.2f} L{bx + uy * dl:.2f},{by - ux * dl:.2f} Z"

def pastille(L, pts, J, IC):
    """Rend (svg, Boite) de la pastille du lien, ou (None, None)."""
    if not L.get("etiquette"):
        return None, None
    txt = typo(L["etiquette"])
    tw = largeur(txt, "sans", 700, PAST["taille"])
    ih = 10.0
    iw = 0.0
    ic_src = IC.get(L["icone"]) if L.get("icone") else None
    if ic_src:
        vb = [float(v) for v in re.search(r"viewBox=['\"]([^'\"]+)['\"]", ic_src).group(1).split()]
        iw = vb[2] * ih / vb[3]
    h = 15.0
    w = tw + 13 + (iw + 4 if ic_src else 0)
    pos = L.get("pos", "debut")
    if pos in ("fin", "palier"):
        a, b = pts[-2], pts[-1]
    else:
        a, b = pts[0], pts[1]
    d = math.hypot(b[0] - a[0], b[1] - a[1]) or 1
    ux, uy = (b[0] - a[0]) / d, (b[1] - a[1]) / d
    demi = (h / 2) if abs(uy) > 0.5 else (w / 2)
    if pos == "milieu":
        cx, cy = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
    elif pos == "fin":
        cx, cy = b[0] - ux * (POINTE[0] + 4 + demi), b[1] - uy * (POINTE[0] + 4 + demi)
    else:                              # debut : au départ du premier segment ; palier : au départ du dernier
        cx, cy = a[0] + ux * (5 + demi), a[1] + uy * (5 + demi)
    bx = Boite(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2)
    non = L["etiquette"].strip().lower() == "non"
    fond, encre = ("#fff", J["--ta"]) if non else (J["--ta"], "#fff")
    s = (f'<rect x="{bx.x0:.2f}" y="{bx.y0:.2f}" width="{w:.2f}" height="{h:.2f}" rx="{h / 2:.2f}" fill="{fond}"'
         + (f' stroke="{J["--ta"]}" stroke-width="1.25"' if non else "") + "/>")
    tx = bx.x0 + 6.5
    if ic_src:
        g, _ = icone_svg(ic_src, tx, cy - ih / 2 - 0.3, ih, encre)
        s += g; tx += iw + 4
    s += (f'<text x="{tx:.2f}" y="{cy + 3.35:.2f}" font-family="{FAM["sans"]}" font-weight="700" font-size="{PAST["taille"]}" '
          f'fill="{encre}" xml:space="preserve" data-max="{tw + 1.5:.2f}">{html.escape(txt, quote=False)}</text>')
    return s, bx

# ------------------------------------------------------------------ dessin des nœuds
def dessiner_noeud(k, X, J):
    n, st, b = X["n"], X["st"], X["b"]
    out = []
    w, h = b.x1 - b.x0, b.y1 - b.y0
    attr = f'fill="{st["fond"]}"' + (f' stroke="{st["trait"]}" stroke-width="{st["ep"]}"' if st["trait"] else "")
    out.append(f'<rect x="{b.x0:.2f}" y="{b.y0:.2f}" width="{w:.2f}" height="{h:.2f}" rx="{st["rayon"]}" {attr}/>')
    pt_, pd, pb, pg = st["pad"]
    if n["type"] == "danger":
        bh = 19.0
        e = st["ep"] / 2
        out.append(f'<rect x="{b.x0 - e:.2f}" y="{b.y0 - e:.2f}" width="{w + 2 * e:.2f}" height="{bh + e:.2f}" fill="{J["--red"]}"/>')
        g, iw = icone_svg(DSVG, b.x0 + 7, b.y0 + 3, 13, "#fff", J["--red"])
        out.append(g)
        titre = typo(n.get("titre", "Danger")).upper()
        place = w - iw - 22
        corps = 10.0                   # le bandeau du livre est à 12 pt ; ici 10, ramené à ce qui tient (8,5 au moins)
        while corps > 8.5 and largeur(titre, "sans", 700, corps, ls=0.05 * corps) > place * 0.96:   # marge : le rendu crène autrement
            corps -= 0.25
        out.append(f'<text x="{b.x0 + 7 + iw + 6:.2f}" y="{b.y0 + 9.5 + 0.35 * corps:.2f}" font-family="{FAM["sans"]}" font-weight="700" '
                   f'font-size="{corps}" letter-spacing="{0.05 * corps:.3f}" fill="#fff" xml:space="preserve" '
                   f'data-max="{place:.2f}">{html.escape(titre, quote=False)}</text>')
    y = b.y0 + X["pt"]
    x = b.x0 + pd if st["ancre"] == "start" else b.cx
    for ligne, lw in X["lignes"]:
        base = y + st["lh"] / 2 + 0.35 * st["taille"]
        s = svg_ligne(ligne, x, base, st, st["ancre"], st["encre"])
        out.append(s.replace("<text ", f'<text data-max="{X["inner"] + 1.5:.2f}" ', 1))
        y += st["lh"]
    if X["prec"]:
        y += 2
        for ligne, lw in X["prec"]:
            base = y + PRECISION["lh"] / 2 + 0.35 * PRECISION["taille"]
            s = svg_ligne(ligne, b.cx, base, PRECISION, "middle", st["encre"])
            out.append(s.replace("<text ", f'<text data-max="{X["inner"] + 1.5:.2f}" ', 1))
            y += PRECISION["lh"]
    if X["onglet"]:
        ow, oh = X["onglet"]
        e = st["ep"] / 2
        ox, oy = b.x1 + e - ow, b.y1 + e - oh
        out.append(f'<rect x="{ox:.2f}" y="{oy:.2f}" width="{ow:.2f}" height="{oh:.2f}" fill="{st["onglet"]}"/>')
        out.append(f'<text x="{ox + 5:.2f}" y="{oy + oh / 2 + 3.05:.2f}" font-family="{FAM["sans"]}" font-weight="700" '
                   f'font-size="{ONGLET["taille"]}" fill="{st["onglet_encre"]}" xml:space="preserve" data-max="{ow - 8.5:.2f}">'
                   f'{html.escape(typo(n["renvoi"]), quote=False)}</text>')
    if n.get("temps"):
        t = typo(n["temps"])
        tw = largeur(t, "sans", 700, TEMPS["taille"])
        th = 14.0
        fond, encre = (J["--or"], J["--k"]) if n["type"] == "urgent" else (J["--ta"], "#fff")
        if n["type"] == "danger":
            fond, encre = J["--red"], "#fff"
        tx, ty = b.x0 + 8, b.y0 - th / 2
        out.append(f'<rect x="{tx:.2f}" y="{ty:.2f}" width="{tw + 10:.2f}" height="{th:.2f}" fill="{fond}"/>')
        out.append(f'<text x="{tx + 5:.2f}" y="{ty + th / 2 + 3.2:.2f}" font-family="{FAM["sans"]}" font-weight="700" '
                   f'font-size="{TEMPS["taille"]}" fill="{encre}" xml:space="preserve" data-max="{tw + 1.5:.2f}">'
                   f'{html.escape(t, quote=False)}</text>')
    return "\n".join(out)

def boites_annexes(X):
    """Onglet de renvoi et pastille de temps : ce qui dépasse ou s'ajoute à la boîte."""
    b, out = X["b"], [X["b"]]
    if X["n"].get("temps"):
        tw = largeur(typo(X["n"]["temps"]), "sans", 700, TEMPS["taille"])
        out.append(Boite(b.x0 + 8, b.y0 - 7, b.x0 + 18 + tw, b.y0 + 7))
    return out

# ------------------------------------------------------------------ en-tête, onglet, tranche
def entete(D, J, pages):
    """pages : [(cote, x0 du rognage de la page en coordonnées du dessin)]. Titre courant du livre (sans folio si
    folios est vide), onglet de tranche, repère de tranche."""
    E = D.get("entete", {})
    out = []
    urgent = D.get("urgent", False)
    folios = E.get("folios") or [None] * len(pages)
    for i, (cote, px) in enumerate(pages):
        bx0 = px + GRILLE[0]
        bx1 = px + ROG_W - GRILLE[0]
        y_trait = 0.535 * PT - 0.75
        out.append(f'<line x1="{bx0:.2f}" y1="{y_trait:.2f}" x2="{bx1:.2f}" y2="{y_trait:.2f}" stroke="{J["--ta"]}" stroke-width="1.5"/>')
        base = 0.535 * PT - 1.5 - 3 - 1.8
        ch = typo(E.get("chapitre", "")).upper()
        to = typo(E.get("tome", "")).upper()
        fo = folios[i] if i < len(folios) else None
        ls_ch, ls_to = 0.09 * 8.5, 0.09 * 7.5
        wch = largeur(ch, "sans", 600, 8.5, ls=ls_ch)
        wto = largeur(to, "sans", 500, 7.5, ls=ls_to)
        wfo = largeur(fo, "sans", 700, 12.5) if fo else 0
        def t(x, s, w, taille, ls, couleur, ancre="start"):
            return (f'<text x="{x:.2f}" y="{base:.2f}" font-family="{FAM["sans"]}" font-weight="{w}" font-size="{taille}" '
                    f'letter-spacing="{ls:.3f}" fill="{couleur}" text-anchor="{ancre}" xml:space="preserve">{html.escape(s, quote=False)}</text>')
        if cote == "verso":            # folio et chapitre à gauche (bord extérieur), tome à droite
            x = bx0
            if fo:
                out.append(t(x, fo, 700, 12.5, 0, J["--k"])); x += wfo + 10
            out.append(t(x, ch, 600, 8.5, ls_ch, J["--k"]))
            out.append(t(bx1 - wto, to, 500, 7.5, ls_to, J["--ta"]))
        else:                          # tome à gauche, chapitre et folio à droite
            out.append(t(bx0, to, 500, 7.5, ls_to, J["--ta"]))
            x = bx1
            if fo:
                out.append(t(x - wfo, fo, 700, 12.5, 0, J["--k"])); x -= wfo + 10
            out.append(t(x - wch, ch, 600, 8.5, ls_ch, J["--k"]))
        # onglet : 0,5 × 0,84 po depuis le bord du fond perdu, numéro du chapitre (couleur.css, .vB .page::after)
        fond, encre = (J["--or"], J["--k"]) if urgent else (J["--ta"], "#fff")
        oy0, oh = -FP, 0.84 * PT
        if cote == "verso":
            ox0 = px - FP
            out.append(f'<rect x="{ox0:.2f}" y="{oy0:.2f}" width="{0.5 * PT:.2f}" height="{oh:.2f}" fill="{fond}"/>')
            out.append(f'<text x="{ox0 + 0.5 * PT - 6:.2f}" y="{oy0 + oh - 6 - 3:.2f}" font-family="{FAM["sans"]}" font-weight="700" '
                       f'font-size="15" fill="{encre}" text-anchor="end">{html.escape(E.get("onglet", ""))}</text>')
        else:
            ox0 = px + ROG_W + FP - 0.5 * PT
            out.append(f'<rect x="{ox0:.2f}" y="{oy0:.2f}" width="{0.5 * PT:.2f}" height="{oh:.2f}" fill="{fond}"/>')
            out.append(f'<text x="{ox0 + 6:.2f}" y="{oy0 + oh - 6 - 3:.2f}" font-family="{FAM["sans"]}" font-weight="700" '
                       f'font-size="15" fill="{encre}">{html.escape(E.get("onglet", ""))}</text>')
    return out

def tranche(D, J, pages, N):
    """Repère de tranche orange (premières minutes), 0,3 po au bord extérieur, sur toute la hauteur du bloc : la
    page se trouve en feuilletant, comme la série orange des chapitres."""
    if not D.get("urgent"):
        return []
    out = []
    for cote, px in pages:
        y0, y1 = GRILLE[1], GRILLE[2]
        x0 = px - FP if cote == "verso" else px + ROG_W + FP - 0.3 * PT
        out.append(f'<rect x="{x0:.2f}" y="{y0:.2f}" width="{0.3 * PT:.2f}" height="{y1 - y0:.2f}" fill="{J["--or"]}"/>')
    return out

# ------------------------------------------------------------------ contrôle géométrique
def segments(pts):
    return [(pts[i], pts[i + 1]) for i in range(len(pts) - 1)]

def _interieur(v, a, b, tol=0.6):
    lo, hi = min(a, b), max(a, b)
    return lo + tol < v < hi - tol

def croisement(s1, s2):
    (a, b), (c, d) = s1, s2
    h1, h2 = abs(a[1] - b[1]) < 0.01, abs(c[1] - d[1]) < 0.01
    if h1 == h2:
        return None
    if not h1:
        (a, b), (c, d) = (c, d), (a, b)
    # (a, b) horizontal, (c, d) vertical
    x, y = c[0], a[1]
    if _interieur(x, a[0], b[0]) and _interieur(y, c[1], d[1]):
        return (x, y)
    return None

def superpose(s1, s2):
    (a, b), (c, d) = s1, s2
    if abs(a[1] - b[1]) < 0.01 and abs(c[1] - d[1]) < 0.01 and abs(a[1] - c[1]) < 0.5:
        return min(max(a[0], b[0]), max(c[0], d[0])) - max(min(a[0], b[0]), min(c[0], d[0])) > 0.6
    if abs(a[0] - b[0]) < 0.01 and abs(c[0] - d[0]) < 0.01 and abs(a[0] - c[0]) < 0.5:
        return min(max(a[1], b[1]), max(c[1], d[1])) - max(min(a[1], b[1]), min(c[1], d[1])) > 0.6
    return False

def seg_boite(s, b):
    (a, c) = s
    sb = Boite(min(a[0], c[0]), min(a[1], c[1]), max(a[0], c[0]), max(a[1], c[1]))
    sb = Boite(sb.x0 - 0.01, sb.y0 - 0.01, sb.x1 + 0.01, sb.y1 + 0.01)
    return sb.coupe(b)

def controle(D, N, liens, past, double, pages):
    err, avis = [], []
    po = lambda v: f"{v / PT:.2f}"
    ids = list(N)
    # chevauchements
    for i in range(len(ids)):
        for j in range(i + 1, len(ids)):
            if N[ids[i]]["b"].gonfle(3).coupe(N[ids[j]]["b"]):
                err.append(f"les boîtes {ids[i]} et {ids[j]} se touchent (moins de 3 pt)")
    # pli et zone sûre
    for k, X in N.items():
        for b in boites_annexes(X):
            if double and b.x1 > ROG_W - PLI and b.x0 < ROG_W + PLI:
                err.append(f"{k} entre dans la zone du pli ({po(b.x0)} à {po(b.x1)} po ; libre de {po(ROG_W - PLI)} à {po(ROG_W + PLI)})")
            larg = 2 * ROG_W if double else ROG_W
            if b.x0 < SUR or b.x1 > larg - SUR or b.y0 < SUR or b.y1 > ROG_H - SUR:
                err.append(f"{k} sort de la zone sûre de Blurb (0,25 po du rognage)")
            px = ROG_W if (double and b.cx > ROG_W) else 0
            if b.x0 < px + GRILLE[0] - 0.5 or b.x1 > px + ROG_W - GRILLE[0] + 0.5 or b.y0 < GRILLE[1] - 8 or b.y1 > GRILLE[2] + 0.5:
                avis.append(f"{k} déborde du bloc du livre (0,5 po des côtés, 0,75 à 9,25 po en hauteur)")
    for (L, bx) in past:
        if bx is None:
            continue
        if double and bx.x1 > ROG_W - PLI and bx.x0 < ROG_W + PLI:
            err.append(f"la pastille « {L['etiquette']} » ({L['de']} -> {L['vers']}) est dans la zone du pli")
        for k, X in N.items():
            if bx.coupe(X["b"].gonfle(1.5)):
                err.append(f"la pastille « {L['etiquette']} » ({L['de']} -> {L['vers']}) touche la boîte {k}")
    # flèches
    for i, (L1, p1) in enumerate(liens):
        for k, X in N.items():
            for s in segments(p1):
                if seg_boite(s, X["b"].gonfle(-1.0)):
                    err.append(f"la flèche {L1['de']} -> {L1['vers']} traverse la boîte {k}")
                    break
        for j in range(i + 1, len(liens)):
            L2, p2 = liens[j]
            meme = L1["de"] == L2["de"] or L1["vers"] == L2["vers"]
            for s1 in segments(p1):
                for s2 in segments(p2):
                    c = croisement(s1, s2)
                    if c:
                        err.append(f"les flèches {L1['de']} -> {L1['vers']} et {L2['de']} -> {L2['vers']} se croisent "
                                   f"en ({po(c[0])}, {po(c[1])}) po")
                    elif not meme and superpose(s1, s2):
                        err.append(f"les flèches {L1['de']} -> {L1['vers']} et {L2['de']} -> {L2['vers']} se superposent")
        # pastille sur une autre flèche
        for (L2, bx) in past:
            if bx is None or L2 is L1:
                continue
            if L2["de"] == L1["de"]:          # même départ : le tronc commun passe sous les pastilles
                continue
            if any(seg_boite(s, bx.gonfle(-0.5)) for s in segments(p1)):
                err.append(f"la flèche {L1['de']} -> {L1['vers']} passe sous la pastille « {L2['etiquette']} »")
        # segments trop courts pour la pastille ou la pointe
        lg = math.hypot(p1[-1][0] - p1[-2][0], p1[-1][1] - p1[-2][1])
        if lg < POINTE[0] + 4:
            avis.append(f"la flèche {L1['de']} -> {L1['vers']} arrive par un segment de {lg:.0f} pt : la pointe est à l'étroit")
        if double and any(abs(a[0] - b[0]) < 0.01 and ROG_W - PLI < a[0] < ROG_W + PLI for a, b in segments(p1)):
            avis.append(f"la flèche {L1['de']} -> {L1['vers']} longe le pli au lieu de le traverser")
    return err, avis

# ------------------------------------------------------------------ SVG
def construire(D, sans_entete=False):
    global POL
    POL = polices()
    J = jetons(D.get("tome", 1))
    IC = icones()
    ST = styles(J)
    double = D.get("format", "double") == "double"
    if double:
        pages = [("verso", 0.0), ("recto", ROG_W)]
        W, ox = 2 * PAGE_W, FP
    else:
        cote = D.get("cote", "recto")
        pages = [(cote, 0.0)]
        W, ox = PAGE_W, (FP if cote == "verso" else 0.0)
    oy = FP
    N = placer(D, ST)
    liens = [(L, tracer(L, N)) for L in D["liens"]]
    past = []
    # « fleches »: "pointille" : le trait de l'exemple de JP ; plein par défaut (il se lit mieux imprimé, et au pli)
    tirets = ' stroke-dasharray="4 3"' if D.get("fleches") == "pointille" else ""
    corps_liens, corps_pointes, corps_past = [], [], []
    vues = set()
    for L, pts in liens:
        corps_liens.append(f'<path d="{chemin(pts, POINTE[0] - 1)}" fill="none" stroke="{J["--k"]}" stroke-width="{TRAIT}"{tirets} '
                           f'stroke-linejoin="round" stroke-linecap="butt"/>')
        cle = (round(pts[-1][0], 1), round(pts[-1][1], 1))
        if cle not in vues:
            vues.add(cle)
            corps_pointes.append(f'<path d="{pointe(pts)}" fill="{J["--k"]}"/>')
        s, bx = pastille(L, pts, J, IC)
        past.append((L, bx))
        if s:
            corps_past.append(s)
    corps_noeuds = [dessiner_noeud(k, X, J) for k, X in N.items()]
    err, avis = controle(D, N, liens, past, double, pages)
    tete = [] if sans_entete else entete(D, J, pages)
    tr = tranche(D, J, pages, N)
    contenu = "\n".join(
        [f'<rect x="{-ox:.2f}" y="{-oy:.2f}" width="{W:.2f}" height="{PAGE_H:.2f}" fill="#fff"/>']
        + ['<g id="entete">'] + tete + tr + ["</g>", '<g id="liens">'] + corps_liens + ["</g>", '<g id="noeuds">']
        + corps_noeuds + ["</g>", '<g id="pointes">'] + corps_pointes + ["</g>", '<g id="pastilles">'] + corps_past + ["</g>"])
    contenu = f'<g transform="translate({ox:.2f},{oy:.2f})">\n{contenu}\n</g>'
    return dict(contenu=contenu, W=W, H=PAGE_H, double=double, pages=pages, err=err, avis=avis, N=N, J=J)

def svg_complet(R, import_polices=True):
    style = ""
    if import_polices:
        style = ("<style>@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@"
                 "0,400;0,500;0,600;0,700&amp;family=IBM+Plex+Serif:ital,wght@0,400;0,600;1,400&amp;display=block');</style>\n")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{R["W"] / PT:.3f}in" height="{R["H"] / PT:.3f}in" '
            f'viewBox="0 0 {R["W"]:.2f} {R["H"]:.2f}">\n{style}{R["contenu"]}\n</svg>\n')

# ------------------------------------------------------------------ rendu
def faces():
    out = []
    for (fam, w, it), p in POL.items():
        url = "file:///" + os.path.abspath(p).replace("\\", "/").replace(" ", "%20")
        out.append(f"@font-face{{font-family:'{FAM[fam]}';font-weight:{w};font-style:{'italic' if it else 'normal'};"
                   f"font-display:block;src:url('{url}') format('truetype')}}")
    return "\n".join(out)

def nav(args, cible=None, timeout=180):
    prof = tempfile.mkdtemp(prefix="logiprof")
    base = [NAV, "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
            f"--user-data-dir={prof}", "--hide-scrollbars", "--run-all-compositor-stages-before-draw",
            "--virtual-time-budget=8000"] + ([] if os.name == "nt" else ["--no-sandbox"])
    try:
        r = subprocess.run(base + args, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, timeout=timeout)
        return r.stdout.decode("utf-8", "replace")
    finally:
        shutil.rmtree(prof, ignore_errors=True)

def url_de(p):
    return "file:///" + os.path.abspath(p).replace("\\", "/").replace(" ", "%20")

def rendre(R, nom, sortie):
    import pypdf
    from pypdf.generic import RectangleObject
    tmp = tempfile.mkdtemp(prefix="logigramme")
    svg_brut = svg_complet(R, import_polices=False)
    css = (faces() + "\n@page{size:585pt 738pt;margin:0}\nhtml,body{margin:0;padding:0;background:#fff;"
           "-webkit-print-color-adjust:exact;print-color-adjust:exact}\n")
    # PDF : une section par page, le même dessin avec une fenêtre différente
    secs = []
    for i, (cote, px) in enumerate(R["pages"]):
        vx = i * PAGE_W
        s = svg_brut.replace(f'viewBox="0 0 {R["W"]:.2f} {R["H"]:.2f}"', f'viewBox="{vx:.2f} 0 {PAGE_W:.2f} {PAGE_H:.2f}"', 1)
        s = re.sub(r'width="[\d.]+in" height="[\d.]+in"', 'width="585pt" height="738pt"', s, count=1)
        secs.append(f'<div style="width:585pt;height:738pt;overflow:hidden;break-after:page">{s}</div>')
    hp = os.path.join(tmp, "pages.html")
    open(hp, "w", encoding="utf-8").write(f"<!DOCTYPE html><html><head><meta charset='utf-8'><style>{css}</style></head>"
                                          f"<body>{''.join(secs)}</body></html>")
    pdf = os.path.join(sortie, nom + ".pdf")
    brut = os.path.join(tmp, "brut.pdf")
    nav(["--no-pdf-header-footer", "--print-to-pdf-no-header", f"--print-to-pdf={brut}", url_de(hp)])
    if not os.path.exists(brut):
        sys.exit("le navigateur n'a pas écrit le PDF")
    r = pypdf.PdfReader(brut)
    w = pypdf.PdfWriter()
    if len(r.pages) != len(R["pages"]):
        print(f"  ATTENTION : {len(r.pages)} page(s) au PDF pour {len(R['pages'])} attendue(s)")
    for i, pg in enumerate(r.pages[:len(R["pages"])]):
        cote = R["pages"][i][0]
        full = RectangleObject([0, 0, PAGE_W, PAGE_H])
        pg.mediabox = full; pg.cropbox = full; pg.bleedbox = full
        # recto : reliure à gauche, fond perdu à droite ; verso : l'inverse (y : 9 pt en tête et en pied)
        pg.trimbox = RectangleObject([0, FP, ROG_W, PAGE_H - FP] if cote == "recto" else [FP, FP, PAGE_W, PAGE_H - FP])
        w.add_page(pg)
    w.add_metadata({"/Title": f"Logigramme {nom} — Le Manuel du Nord"})
    with open(pdf, "wb") as f:
        w.write(f)
    # PNG : la double page ouverte, rognée, trait fin au pli
    larg = (2 * ROG_W if R["double"] else ROG_W)
    ox = FP if (R["double"] or R["pages"][0][0] == "verso") else 0.0
    pli = (f'<div style="position:absolute;left:{ROG_W}pt;top:0;width:0;height:{ROG_H}pt;border-left:0.75pt solid #9a9a9a"></div>'
           if R["double"] else "")
    vue = (f"<!DOCTYPE html><html><head><meta charset='utf-8'><style>{faces()}\nhtml,body{{margin:0;padding:0;background:#fff}}"
           f"</style></head><body><div style='position:relative;width:{larg}pt;height:{ROG_H}pt;overflow:hidden'>"
           f"<div style='position:absolute;left:{-ox}pt;top:{-FP}pt'>{svg_brut}</div>{pli}</div></body></html>")
    hv = os.path.join(tmp, "vue.html")
    open(hv, "w", encoding="utf-8").write(vue)
    png = os.path.join(sortie, nom + ".png")
    if os.path.exists(png):
        os.remove(png)
    # la fenêtre du mode headless récent perd une bande en hauteur : on l'agrandit, puis on recadre au pixel
    lx, ly = round(larg / PT * 96), round(ROG_H / PT * 96)
    nav([f"--window-size={lx},{ly + 240}", "--force-device-scale-factor=2", f"--screenshot={png}", url_de(hv)])
    if os.path.exists(png):
        from PIL import Image
        im = Image.open(png)
        im.crop((0, 0, 2 * lx, 2 * ly)).save(png, optimize=True)
    # contrôle au rendu : chaque ligne tient dans sa boîte
    verif = (f"<!DOCTYPE html><html><head><meta charset='utf-8'><style>{faces()}</style></head><body>{svg_brut}"
             "<script>document.fonts.ready.then(()=>{const o=[];document.querySelectorAll('text[data-max]').forEach(t=>{"
             "const l=t.getComputedTextLength(),m=+t.dataset.max;if(l>m)o.push([t.textContent,l.toFixed(1),m]);});"
             "const f=[...document.fonts].filter(x=>x.status==='loaded').map(x=>x.family+' '+x.weight+' '+x.style);"
             "const p=document.createElement('pre');p.id='res';p.textContent=JSON.stringify({trop:o,polices:f});"
             "document.body.appendChild(p);});</script></body></html>")
    hc = os.path.join(tmp, "verif.html")
    open(hc, "w", encoding="utf-8").write(verif)
    dom = nav(["--dump-dom", url_de(hc)])
    m = re.search(r'<pre id="res">(.*?)</pre>', dom, re.S)
    rendu = json.loads(html.unescape(m.group(1))) if m else None
    shutil.rmtree(tmp, ignore_errors=True)
    return pdf, png, rendu

def controle_pdf(pdf):
    """Polices incorporées et absence de transparence (masque doux, alpha < 1)."""
    import pypdf
    r = pypdf.PdfReader(pdf)
    fontes, transp = set(), []
    for i, pg in enumerate(r.pages):
        res = pg.get("/Resources") or {}
        for f in (res.get("/Font") or {}).values():
            f = f.get_object()
            fontes.add(str(f.get("/BaseFont")))
        for nm, g in (res.get("/ExtGState") or {}).items():
            g = g.get_object()
            for cle in ("/ca", "/CA"):
                if cle in g and float(g[cle]) < 1:
                    transp.append(f"page {i + 1} {nm} {cle}={g[cle]}")
            if "/SMask" in g and str(g["/SMask"]) != "/None":
                transp.append(f"page {i + 1} {nm} masque doux")
        for nm, x in (res.get("/XObject") or {}).items():
            x = x.get_object()
            if "/SMask" in x:
                transp.append(f"page {i + 1} {nm} image à masque")
    return sorted(fontes), transp

# ------------------------------------------------------------------ main
def main():
    a = sys.argv[1:]
    if not a or a[0].startswith("-"):
        print(__doc__); sys.exit(2)
    src = a[0]
    sortie = a[a.index("--sortie") + 1] if "--sortie" in a else os.path.dirname(os.path.abspath(src))
    os.makedirs(sortie, exist_ok=True)
    nom = os.path.splitext(os.path.basename(src))[0] + ("-livre" if "--sans-entete" in a else "")
    D = json.load(open(src, encoding="utf-8"))
    R = construire(D, sans_entete="--sans-entete" in a)
    svg = os.path.join(sortie, nom + ".svg")
    open(svg, "w", encoding="utf-8").write(svg_complet(R))
    print("svg :", svg)
    err, avis = list(R["err"]), list(R["avis"])
    if "--plan" in a:                  # les boîtes, en pouces : pour régler les rangs
        for k, X in R["N"].items():
            b = X["b"]
            print(f"  {k:12s} x {b.x0 / PT:5.2f} à {b.x1 / PT:5.2f}   y {b.y0 / PT:5.2f} à {b.y1 / PT:5.2f}   h {(b.y1 - b.y0) / PT:4.2f}   {len(X['lignes'])} l.")
    if "--svg" not in a:
        pdf, png, rendu = rendre(R, nom, sortie)
        print("pdf :", pdf)
        print("png :", png, f"({os.path.getsize(png) / 1e6:.2f} Mo)" if os.path.exists(png) else "(absent)")
        if rendu is None:
            avis.append("contrôle au rendu impossible (le navigateur n'a rien rendu)")
        else:
            for t, l, m in rendu["trop"]:
                err.append(f"texte trop long au rendu : « {t} » ({l} pt pour {m})")
        fontes, transp = controle_pdf(pdf)
        etr = [f for f in fontes if "IBMPlex" not in f.replace(" ", "")]
        if etr:
            err.append("polices de secours dans le PDF : " + ", ".join(etr))
        for t in transp:
            err.append("transparence dans le PDF : " + t)
        print("polices du PDF :", ", ".join(fontes))
    for x in avis:
        print("  avis :", x)
    for x in err:
        print("  ERREUR :", x)
    print(f"contrôle : {len(err)} erreur(s), {len(avis)} avis")
    sys.exit(1 if err else 0)

POL = {}
if __name__ == "__main__":
    main()
