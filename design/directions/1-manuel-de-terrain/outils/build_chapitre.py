# -*- coding: utf-8 -*-
"""Constructeur général d'un chapitre, direction 1 (manuel de terrain).

    python build_chapitre.py 10            -> design/epreuves-livre/10.html   (numéros NOUVEAUX, six tomes)
    python build_chapitre.py 10 --rendu    -> + 10/page-XX.png (768 x 960, x2) + 10.pdf (8,125 x 10,25 po)

Lit chapitres/NN-*.md (gabarit en neuf sections), réutilise md2blocks.py pour le texte
(typographie, notes, renvois) et reprend tel quel le CSS et le paginateur de
interieur.tpl.html, qui ne sont pas modifiés : les pages sont créées à la volée par
le script de la page, autant qu'il en faut.

Planches : images/validees/planche-NN-*.png (validées), dessinées depuis images/*.svg.
Hauteur du SVG : 826 = pleine page, 413 = demi-page. Placement : design/epreuves-livre/
placements.json (« apres » : début du paragraphe qui en parle), sinon la première mention
« planche NN-0K » du texte, sinon fin de la section 5 (avec un avertissement).
Photos : même fichier, clé « photos » (fichier, apres, taille quart|demi, legende).
Logigramme en double page : même fichier, clé « logigramme » (fichier : le SVG de design/outils/logigramme.py
--sans-entete ; apres ; orange) ; chapitre.js le pose sur la première page de gauche qui suit l'ancre.
"""
import re, sys, os, glob, json, html, subprocess, time, tempfile, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from md2blocks import inline, load_notes, notes_html, join_lines, pictos

def _racine_livre():
    # Windows (le PC de JP) : le dossier d'origine ; ailleurs (session dans le nuage) : le dépôt qui contient ce fichier
    if os.name == "nt":
        return r"C:\Users\jeanp\New folder"
    d = os.path.dirname(os.path.abspath(__file__))
    while d != os.path.dirname(d) and not os.path.exists(os.path.join(d, "CLAUDE.md")):
        d = os.path.dirname(d)
    return d
ROOT = _racine_livre()
TOOLS = os.path.dirname(os.path.abspath(__file__))
OUTD = os.path.join(ROOT, "design", "epreuves-livre")
EDGE = (r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" if os.name == "nt"
        else (sorted(glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome")) or ["chromium"])[-1])
REL_ROOT = "../../"          # depuis design/epreuves-livre/ vers la racine du livre

# Six tomes (24 septembre 2026). Le tome se lit dans plan/renumerotation.json (tomeDuNouveau), jamais
# dans le numéro. Les photos de images/photos/ gardent l'ancien numéro : on les retrouve par l'inverse
# de la table (ANCIEN). Couleurs : couverture (fond, encre) de design/choix.md ; tome 6 en fonte depuis le
# 28 septembre 2026 (JP), à la place de la rouille #7A4424 / #F5ECE2.
RENUM = json.load(open(os.path.join(ROOT, "plan", "renumerotation.json"), encoding="utf-8"))
TOME_DU = RENUM["tomeDuNouveau"]
ANCIEN = {n: a for a, n in RENUM["ancienVersNouveau"].items()}
TOMES = {1: ("Tenir", "#E2E7EA", "#15222B"),
         2: ("Le corps", "#5C1A15", "#F3ECE5"),
         3: ("Prélever", "#1D392E", "#E9F0EA"),
         4: ("De la bête au garde-manger", "#25414F", "#EDF2F5"),
         5: ("La forêt, le jardin et le chalet", "#4B3A28", "#F2EBDF"),
         6: ("L’atelier", "#363432", "#EEEBE6")}

def tome_de(num):
    t = TOME_DU.get(num)
    if t is None:
        sys.exit(f"chapitre {num} absent de plan/renumerotation.json (tomeDuNouveau)")
    return t

def photos_du_chapitre(num):
    """Photos du chapitre, cherchées sous son ANCIEN numéro : un dossier à un seul numéro (« 30a »,
    « 58 ») appartient en entier à ce chapitre ; ailleurs (lots, « 57-59 »), le préfixe du fichier le dit."""
    a = ANCIEN.get(num, num)
    base = os.path.join(ROOT, "images", "photos")
    out = []
    for d in sorted(os.listdir(base)) if os.path.isdir(base) else []:
        pd = os.path.join(base, d)
        if not os.path.isdir(pd):
            continue
        chaps = re.findall(r"\d+[a-d]?", d) if re.match(r"^\d", d) else []
        noms = sorted(n for n in os.listdir(pd) if os.path.isfile(os.path.join(pd, n)))
        if len(chaps) == 1:
            if re.fullmatch(rf"{re.escape(a)}[a-d]?", d):
                out += [os.path.join(pd, n) for n in noms]
        else:
            out += [os.path.join(pd, n) for n in noms if n.startswith(a + "-")]
    return out

def chemin_photo(p, num):
    """« fichier » depuis la racine du livre, ou un nom court (« 30-01 », « 01-crosse ») cherché sous l'ancien numéro."""
    f = p["fichier"]
    if os.path.exists(os.path.join(ROOT, f)):
        return f
    cands = [c for c in photos_du_chapitre(num) if os.path.basename(c).startswith(f)]
    if cands:
        return os.path.relpath(cands[0], ROOT).replace("\\", "/")
    WARN.append(f"photo introuvable sous l'ancien numéro {ANCIEN.get(num, num)} : {f}")
    return f

SECNAMES = {1: "En une ligne", 2: "Quand l’utiliser", 3: "Pourquoi ça marche", 4: "Matériel",
            5: "Procédure", 6: "Points de contrôle", 7: "Signes d’échec", 8: "Danger",
            9: "Variante d’urgence"}
WARN = []

def fix_refs(s):
    # « §5-J » : md2blocks n'enveloppe que « §5 »
    return re.sub(r'(<span class="ref">§[^<]*)</span>(-[A-Z]\b)', r"\1\2</span>", s)

UNITS = r"mg/L|µg/L|g/L|mg-min/L|L/m|L/jour|mg|µm|mL|UNT|m²|gal|V|W|Ah|ppm"
def il(s):
    s = fix_refs(inline(s))
    # typo() de md2blocks passe après l'échappement HTML : « &gt; » devient « &gt ; »
    s = re.sub("&(gt|lt|amp)[\u202f\u00a0 ];", r"&\1;", s)
    s = re.sub(rf"(\d) ({UNITS})(?![\w/])", "\\1\u202f\\2", s)
    s = re.sub(r"(?<![\d,])(\d{1,3}) (\d{3})(?![\d,])", "\\1\u202f\\2", s)   # 7 000, 1 440
    return pictos(s)

# ------------------------------------------------------------------ premières minutes (la série orange)
# CLAUDE.md, « Les premières minutes, en orange » (JP, 15 octobre 2026). Dans le Markdown, la série se marque
# sur son intertitre : « ### Les quinze premières minutes {.orange} ». Chaque intertitre marqué ouvre une partie
# de la série, qui court jusqu'au prochain intertitre ### non marqué ou au prochain ## ; deux parties marquées
# qui se suivent font un seul encadré. L'heure du titre sort en gros sur une pastille (« 15 MIN », « 0–1 H ») :
# elle se lit dans le titre (« Heure 0 à heure 1 », « Les six premières heures », « La première heure »), ou
# se donne dans le marqueur quand le titre n'en dit pas (« {.orange 15 min} »).
MARQUE_OR = re.compile(r"\s*\{\s*\.orange\b([^}]*)\}\s*$")
NOMBRES = {"un": 1, "une": 1, "deux": 2, "trois": 3, "quatre": 4, "cinq": 5, "six": 6, "sept": 7, "huit": 8,
           "neuf": 9, "dix": 10, "douze": 12, "quinze": 15, "vingt": 20, "trente": 30, "vingt-quatre": 24,
           "quarante-huit": 48, "soixante-douze": 72}

def marque_orange(t):
    """« Titre {.orange} » -> (« Titre », "") ; « Titre {.orange 15 min} » -> (« Titre », "15 min") ; sans marqueur : (t, None)."""
    m = MARQUE_OR.search(t)
    if not m:
        return t, None
    return t[:m.start()].rstrip(), m.group(1).strip()

def repere_heure(titre, donne=""):
    """-> (chiffre, unité, reste du titre) ; chiffre vide si le titre ne dit pas l'heure."""
    if donne:
        m = re.match(r"^([\d–\-→+ ]*\d[+]?)\s*(.*)$", donne)
        return (m.group(1).strip(), m.group(2).strip(), titre) if m else ("", donne, titre)
    m = re.match(r"^[Hh]eure\s+(\d+)\s+à\s+heure\s+(\d+)\s*(?:[—–:]\s*(.*))?$", titre)
    if m:
        return f"{m.group(1)}–{m.group(2)}", "h", m.group(3) or titre
    m = re.search(r"\b(?:[Ll]es|[Ll]a)\s+(?:([\w-]+)\s+)?premi[eè]res?\s+(demi-heure|minutes?|heures?|secondes?)\b", titre)
    if m:
        mot, unite = (m.group(1) or "").lower(), m.group(2)
        n = int(mot) if mot.isdigit() else NOMBRES.get(mot)
        if unite == "demi-heure":
            return "30", "min", titre
        if n is None and unite in ("heure", "minute", "seconde"):   # « La première heure »
            n = 1
        if n is not None:
            return str(n), {"m": "min", "h": "h", "s": "s"}[unite[0]], titre
    return "", "", titre

def h3_orange(t, donne):
    chiffre, unite, reste = repere_heure(t, donne)
    if not chiffre:
        WARN.append(f"série orange : aucune heure lisible dans « {t} » (la donner dans le marqueur : {{.orange 15 min}})")
    tag = (f'<span class="otag">{html.escape(chiffre)}<small>{html.escape(unite)}</small></span>' if chiffre else "")
    return f'<h3 class="sub or">{tag}<span class="ot">{il(reste)}</span></h3>'

def segments_orange(items):
    """Coupe une histoire [(html, src)] en parties [(orange?, items)] aux intertitres de la série. Une figure
    posée par place() reste dans la partie de son ancre."""
    segs, cur, etat = [], [], False
    for h, src in items:
        if h.startswith("<h2"):
            nv = False
        elif h.startswith('<h3 class="sub or"'):
            nv = True
        elif h.startswith("<h3"):
            nv = False
        else:
            nv = etat
        if nv != etat and cur:
            segs.append((etat, cur)); cur = []
        etat = nv
        cur.append((h, src))
    if cur:
        segs.append((etat, cur))
    return segs

# ------------------------------------------------------------------ blocs
def parse(lines):
    """Markdown d'une section -> blocs. Gère les étapes numérotées, les puces (et les puces,
    tableaux et paragraphes indentés sous une étape), les tableaux, les encadrés >, ### et ####."""
    blocks, cur, ctx = [], None, None
    def flush():
        nonlocal cur
        if cur:
            cur["t"] = join_lines(cur["t"]); blocks.append(cur); cur = None
    i, n = 0, len(lines)
    while i < n:
        l = lines[i]; s = l.strip(); ind = bool(s) and l[0] in " \t"
        if not s:
            flush(); i += 1; continue
        if re.match(r"^-{3,}$", s) and not ind:
            flush(); ctx = None; i += 1; continue
        if s.startswith("|"):
            flush(); rows = []
            while i < n and lines[i].strip().startswith("|"):
                rows.append(lines[i].strip()); i += 1
            blocks.append({"k": "table", "rows": rows, "nested": ind and ctx == "step"}); continue
        if s.startswith(">"):
            flush(); q = []
            while i < n and lines[i].strip().startswith(">"):
                q.append(re.sub(r"^\s*>\s?", "", lines[i])); i += 1
            blocks.append({"k": "quote", "lines": q}); continue
        m = re.match(r"^(#{3,4})\s+(.*)", l)
        if m:
            flush(); ctx = None
            t, orange = marque_orange(m.group(2).strip())
            b = {"k": "h3" if len(m.group(1)) == 3 else "h4", "t": t}
            if orange is not None:
                b["or"] = orange
            blocks.append(b); i += 1; continue
        m = re.match(r"^(\d+)\.\s+(.*)", l)
        if m:
            flush(); cur = {"k": "step", "n": m.group(1), "t": [m.group(2)]}; ctx = "step"; i += 1; continue
        m = re.match(r"^\s*[-*]\s+(.*)", l)
        if m:
            flush(); cur = {"k": "li", "lvl": 1 if (ind and ctx == "step") else 0, "t": [m.group(1)]}; i += 1; continue
        m = re.match(r"^\*\*(C'est .*)\*\*\s*$", s)
        if m:
            flush(); ctx = None; blocks.append({"k": "h4", "t": m.group(1)}); i += 1; continue
        if cur:
            cur["t"].append(s); i += 1; continue
        cur = {"k": "p", "t": [s], "stepc": ind and ctx == "step"}
        if not ind:
            ctx = None
        i += 1
    flush()
    return blocks

def split_row(r):
    return [c.strip() for c in r.strip().strip("|").split("|")]

def neg(cell):
    c = cell.strip()
    m = re.match(r"^\*\*(Non|NON)\*\*[,\s]*(.*)$", c)
    if m:
        rest = il(m.group(2)) if m.group(2) else ""
        return '<span class="non">NON</span>' + (f' <span class="negx">{rest}</span>' if rest else "")
    return il(c)

def table_html(rows, nested):
    head = split_row(rows[0])
    body = [split_row(r) for r in rows[2:] if r.strip("| ")]
    nc = len(head)
    body = [(r + [""] * nc)[:nc] for r in body]
    col = nested or nc <= 2
    if [h.lower() for h in head[:4]] == ["item", "quantité", "substitution possible", "négociable"]:
        widths = [25, 11, 48, 16] + [10] * (nc - 4)
    else:
        w = []
        for j in range(nc):
            L = [len(re.sub(r"[*`]", "", r[j])) for r in body] + [len(head[j])]
            w.append(max(sum(L) / len(L), 7) ** 0.72)
        widths = [round(100 * x / sum(w), 1) for x in w]
    negc = [j for j, h in enumerate(head) if h.lower().startswith("négociable")]
    cg = "<colgroup>" + "".join(f'<col style="width:{x}%">' for x in widths) + "</colgroup>"
    th = "".join(f"<th>{il(h)}</th>" for h in head)
    trs = []
    for r in body:
        tds = []
        for j, c in enumerate(r):
            cls = ' class="c-item"' if (j == 0 and not col) else ""
            tds.append(f"<td{cls}>{neg(c) if j in negc else il(c)}</td>")
        trs.append("<tr>" + "".join(tds) + "</tr>")
    cls = "tcol" + (" nest" if nested else "") if col else "tspan"
    return f'<table class="{cls}">{cg}<thead><tr>{th}</tr></thead><tbody>{"".join(trs)}</tbody></table>'

PICTO_SVG = re.compile(r'<svg class="picto"[^>]*>.*?</svg>[\u00a0 ]?', re.S)

_NOMS_DANGERS = None

def nom_danger(pid):
    """Le nom court d'un danger, tiré des pages des dangers (dangers/*.md : « ## {!id} Nom »)."""
    global _NOMS_DANGERS
    if _NOMS_DANGERS is None:
        import glob as _g
        _NOMS_DANGERS = {}
        for f in _g.glob(os.path.join(ROOT, "dangers", "*.md")):
            for m in re.finditer(r"^##\s+\{!([a-z-]+)\}\s*(.+)$", open(f, encoding="utf-8").read(), re.M):
                _NOMS_DANGERS[m.group(1)] = m.group(2).strip()
    return _NOMS_DANGERS.get(pid, pid)

def marge(h):
    """Les pictogrammes de danger d'un paragraphe sortent dans sa marge de gauche, en gros, l'un sous l'autre (JP,
    18 octobre 2026 : « j'aimerais mieux les pictogrammes en gros dans la marge »). Le paragraphe prend la classe pc."""
    if 'class="picto"' not in h or not h.startswith("<p"):
        return h
    pics = PICTO_SVG.findall(h)
    h = PICTO_SVG.sub("", h)
    m = re.match(r'<p( class="([^"]*)")?>', h)
    cls = ((m.group(2) or "") + " pc").strip()
    def item(x):
        pid = re.search(r'data-picto="([a-z-]+)"', x).group(1)
        # sous le pictogramme, la page du danger dans le tome (l'assembleur la passe dans l'URL : TOME.dg)
        return ('<span class="pi">' + x.rstrip("\u00a0 ") + f'<span class="pnum" data-pg="{pid}">p.\u00a000</span>'
                '<span class="pnom">' + html.escape(nom_danger(pid)) + "</span></span>")
    items = "".join(item(x) for x in pics)
    return f'<p class="{cls}" style="--np:{len(pics)}"><span class="pmarge">' + items + "</span>" + h[m.end():]

def render(blocks, lead=False):
    """-> liste de (html, texte source) ; le texte source sert à ancrer planches et photos."""
    return [(marge(h), t) for h, t in _render(blocks, lead)]

def _render(blocks, lead=False):
    out, prev = [], None
    for b in blocks:
        k = b["k"]
        if "or" in b:
            out.append((h3_orange(b["t"], b["or"]), b["t"]))
        elif k == "h3":
            out.append((f'<h3 class="sub">{il(b["t"])}</h3>', b["t"]))
        elif k == "h4":
            out.append((f'<h4 class="choix">{il(b["t"])}</h4>', b["t"]))
        elif k == "li":
            out.append((f'<p class="li{" l2" if b["lvl"] else ""}">{il(b["t"])}</p>', b["t"]))
        elif k == "step":
            out.append((f'<p class="step"><span class="sn">{b["n"]}</span>{il(b["t"])}</p>', f'{b["n"]}. {b["t"]}'))
        elif k == "table":
            out.append((table_html(b["rows"], b["nested"]), ""))
        elif k == "quote":
            inner = render(parse(b["lines"]))
            out.append(('<div class="encadre">' + "".join(h for h, _ in inner) + "</div>",
                        " ".join(t for _, t in inner)))
        else:
            t = b["t"]
            m = re.match(r"^\*\*(\d+)\.\s+(.*)$", t)
            if m and not b.get("stepc"):
                out.append((f'<p class="step"><span class="sn">{m.group(1)}</span>{il("**" + m.group(2))}</p>', t))
            elif lead and prev is None:
                out.append((f'<p class="lead">{il(t)}</p>', t))
            elif b.get("stepc"):
                out.append((f'<p class="stepc">{il(t)}</p>', t))
            elif re.match(r"^\*\*[^*]+\*\*\s*$", t):
                x = re.sub(r"^<strong>(.+?)</strong>", r'<strong class="runin">\1</strong>', il(t))
                out.append((f'<p class="p0 lab kh">{x}</p>', t))
            elif t.startswith("**"):
                x = re.sub(r"^<strong>(.+?)</strong>", r'<strong class="runin">\1</strong>', il(t))
                out.append((f'<p class="p0 ri">{x}</p>', t))
            else:
                cls = "p0" if prev in (None, "h3", "h4", "table", "quote") else ""
                out.append((f'<p class="{cls}">{il(t)}</p>' if cls else f"<p>{il(t)}</p>", t))
        prev = k
    return out

def h2(n, title):
    if n is None:
        return f'<h2 class="sec"><span class="t">{il(title)}</span></h2>'
    return f'<h2 class="sec" data-n="{n}"><span class="n">{n}</span><span class="t">{il(title)}</span></h2>'

# ------------------------------------------------------------------ chapitre
def load_chapter(num):
    cands = sorted(glob.glob(os.path.join(ROOT, "chapitres", f"{num}-*.md")))
    if not cands:
        sys.exit(f"aucun chapitre chapitres/{num}-*.md")
    path = cands[0]
    # retours chariot égarés au milieu d'une phrase : newline="" pour que Python n'en fasse pas des sauts de ligne
    raw = open(path, encoding="utf-8", newline="").read().replace("\r\n", "\n").replace("\r", "")
    lines = raw.splitlines()
    m = next((re.match(r"^#\s+Chapitre\s+(\S+)\s+—\s+(.*)$", l) for l in lines if l.startswith("# ")), None)
    title = m.group(2).strip() if m else re.sub(r"^#\s+", "", lines[0])
    t = tome_de(num)
    tome = f"Tome {t} · {TOMES[t][0]}"
    ligne = next((l.strip() for l in lines if re.match(r"^\*Tome \d", l.strip())), "")
    if ligne and not ligne.startswith(f"*Tome {t} "):
        WARN.append(f"la ligne de tome du chapitre ({ligne}) contredit la table : tome {t}")
    # ligne de lieu : **Maison.** / **Chalet.** / **Les deux.** + suite éventuelle du paragraphe
    lieu, lieu_txt = "", ""
    for i, l in enumerate(lines):
        if l.startswith("## "):
            break
        mm = re.match(r"^\*\*(Maison|Chalet|Les deux)\.?\*\*\.?\s*(.*)$", l.strip())
        if mm:
            lieu = mm.group(1); rest = [mm.group(2)]
            for l2 in lines[i + 1:]:
                if not l2.strip():
                    break
                rest.append(l2)
            lieu_txt = join_lines(rest)
            break
    md = load_notes(raw, num)
    # sections
    secs, cur = [], None
    for l in md.splitlines():
        mm = re.match(r"^##\s+(?:(\d+)\.\s+)?(.*)$", l)
        if mm and not l.startswith("###"):
            cur = {"n": int(mm.group(1)) if mm.group(1) else None, "title": mm.group(2).strip(), "lines": []}
            secs.append(cur); continue
        if cur is not None:
            cur["lines"].append(l)
    return dict(path=path, num=num, title=title, tome=tome, lieu=lieu, lieu_txt=lieu_txt, secs=secs)

# Un point du danger s'ouvre sur son numéro en gras : « **1. », « **2 — », « **A — ».
MARQUE_PT = re.compile(r"^\*\*\s*(\d{1,2}|[A-H])\s*(?:\.(?!\d)|[—–])\s*(.+?)\*\*\s*(.*)$", re.S)
# Un intertitre qui porte lui-même le numéro du point : « ### 1. … », « ### 8.1 — … », « ### A. … ».
MARQUE_TITRE = re.compile(r"^(?:\d{1,2}(?:\.\d{1,2})?|[A-H])\s*[.—–]\s")

NUM_PROC = 5

def sec_num(ch, motif):
    """Le numéro de la section dont le titre commence par ce motif (sans tenir compte de la casse), ou None."""
    for sc in ch["secs"]:
        if sc["n"] and re.match(motif, html.unescape(re.sub("<[^>]+>", "", sc["title"] or "")).strip(), re.I):
            return sc["n"]
    return None

def danger_story(sec):
    """Section 8 -> blocs de l'encadré danger. Ne numérote que les vrais points (28 septembre 2026 ; avant,
    chaque paragraphe ouvert en gras prenait un numéro : au ch. 102, les points faisaient 1, 2, 3, 2) :
      - le texte numérote ses points (« **1. », « **2 — », « **A — ») : eux seuls sont numérotés, avec leur
        propre numéro ; les autres amorces en gras (« **Conduite.** », « **Rage.** ») restent des amorces ;
      - les points sont des intertitres (« ### 1. », « ### 8.1 — », « ### A. », ou plusieurs « DANGER — … ») :
        aucun paragraphe n'est numéroté ;
      - sinon (aucune marque), chaque paragraphe ouvert en gras est un point, numéroté dans l'ordre."""
    # une ligne vide entre deux citations les sépare : sans elle, le dernier paragraphe d'un encadré et le
    # premier du suivant se collaient (ch. 43 : le point 2 disparaissait dans le paragraphe d'avant)
    ql, rest = [], []
    for l in sec["lines"]:
        if l.strip().startswith(">"):
            ql.append(re.sub(r"^\s*>\s?", "", l))
        elif not l.strip():
            ql.append(""); rest.append("")
        else:
            rest.append(l)
    # « ## ⚠ DANGER » écrit dans l'encadré (ch. 79) : c'est le titre de l'encadré, pas une ligne de texte
    ql = [re.sub(r"^#{1,2}(\s+⚠?\s*DANGER)", r"###\1", l, flags=re.I) for l in ql]
    qb = parse(ql) + parse(rest)
    dangers = [b for b in qb if b["k"] in ("h3", "h4") and "DANGER" in b["t"].upper()]
    plusieurs = len(dangers) > 1
    marques = any(b["k"] == "p" and MARQUE_PT.match(b["t"]) for b in qb)
    titres = plusieurs or any(b["k"] in ("h3", "h4") and MARQUE_TITRE.match(b["t"]) for b in qb)
    subject, out, k = "", [], 0
    for b in qb:
        if b["k"] in ("h3", "h4") and "DANGER" in b["t"].upper():
            sj = re.sub(r"^⚠?\s*DANGER\s*([—–:]\s*)?", "", b["t"], flags=re.I).strip()
            if plusieurs:        # plusieurs dangers : chacun devient un intertitre de l'encadré
                if sj:
                    out.append((f'<h3 class="sub">{il(sj)}</h3>', sj))
            else:
                subject = sj
            continue
        if b["k"] == "p":
            t = b["t"]
            mm = MARQUE_PT.match(t)
            mg = re.match(r"^\*\*(.+?)\*\*\s*(.*)$", t, re.S)
            if mm and not titres:
                lab = mm.group(1)
                out.append((f'<p class="pt"><span class="pn">{lab}</span><strong class="plead">{il(mm.group(2))}</strong> {il(mm.group(3))}</p>', t))
            elif mg and not marques and not titres:
                k += 1
                out.append((f'<p class="pt"><span class="pn">{k}</span><strong class="plead">{il(mg.group(1))}</strong> {il(mg.group(2))}</p>', t))
            elif mg:             # amorce en gras qui n'est pas un point : elle reste dans le texte du point
                x = re.sub(r"^<strong>(.+?)</strong>", r'<strong class="runin">\1</strong>', il(t))
                out.append((f'<p class="pt cont0">{x}</p>', t))
            else:
                out.append((f'<p class="pt cont0">{il(t)}</p>', t))
        else:
            out.extend(render([b]))
    return out, subject

# ------------------------------------------------------------------ planches et photos
def svg_titre(p, pid):
    """Le titre de la planche, pris dans le <title> du SVG (« Planche 13-01. L'arc à feu »), sans le numéro."""
    try:
        m = re.search(r"<title>(.*?)</title>", open(p, encoding="utf-8").read(4000), re.S)
    except OSError:
        return ""
    if not m:
        return ""
    t = html.unescape(m.group(1)).strip()
    t = re.sub(rf"^Planche\s+{re.escape(pid)}[.\s]*", "", t)
    return t.rstrip(". ")

def svg_size(p):
    head = open(p, encoding="utf-8").read(600)
    w = re.search(r'width="([\d.]+)"', head); h = re.search(r'height="([\d.]+)"', head)
    return (float(w.group(1)), float(h.group(1))) if (w and h) else (680.0, 826.0)

# Dossiers d'où figures() prend les planches, dans l'ordre (pour un même numéro, le premier dossier gagne).
# Les épreuves ne posent que les validées ; l'assembleur de tome ajoute « a-valider » : JP relit ces
# planches dans les pages (28 septembre 2026).
DOSSIERS_PLANCHES = ["validees"]

def figures(num):
    figs, vus = [], set()
    for dos in DOSSIERS_PLANCHES:
        for png in sorted(glob.glob(os.path.join(ROOT, "images", dos, f"planche-{num}-*.png"))):
            base = os.path.basename(png)[:-4]
            mm = re.match(rf"planche-({num}-\d+[a-z]?)", base)
            if not mm or mm.group(1) in vus:
                continue
            pid = mm.group(1)
            vus.add(pid)
            svg = os.path.join(ROOT, "images", base + ".svg")
            src = svg if os.path.exists(svg) else png
            w, h = svg_size(svg) if src == svg else (680.0, 826.0)
            # trois tailles (JP, 16 octobre 2026) : pleine page, demi-page sur les deux colonnes, petite planche d'une colonne
            size = "petite" if w <= 400 else "full" if h / w > 0.9 else "demi"
            rel = REL_ROOT + os.path.relpath(src, ROOT).replace("\\", "/")
            titre = svg_titre(svg, pid) if src == svg else ""
            figs.append(dict(id=pid, src=rel, size=size, ratio=h / w, dossier=dos, titre=titre))
    # l'ordre des numéros, quel que soit le dossier (deux planches ancrées au même paragraphe gardent leur ordre)
    figs.sort(key=lambda f: [int(x) if x.isdigit() else x for x in re.findall(r"\d+|[a-z]+", f["id"])])
    return figs

def pl_tete(f):
    """Le numéro et le titre de la planche, en évidence au-dessus du dessin (JP, 16 octobre 2026 : « là, ils sont
    comme tout cachés »). L'étiquette rouge reprend le rouge de l'appel fléché du texte."""
    t = f'<span class="pl-titre">{html.escape(f["titre"])}</span>' if f.get("titre") else ""
    return f'<div class="pl-tete"><span class="pl-num">Planche {f["id"]}</span>{t}</div>'

def fig_html(f):
    if f["size"] == "full":
        return (f'<figure class="fig plf" data-plate="full" data-id="{f["id"]}" data-src="{f["src"]}" '
                f'data-titre="{html.escape(f.get("titre", ""), quote=True)}"></figure>')
    if f["size"] == "petite":
        return (f'<figure class="fig pl petite" data-id="{f["id"]}">{pl_tete(f)}<img src="{f["src"]}" alt="Planche {f["id"]}">'
                f'</figure>')
    return (f'<figure class="fig pl demi" data-id="{f["id"]}">{pl_tete(f)}<img src="{f["src"]}" alt="Planche {f["id"]}" '
            f'style="height:{7 * f["ratio"]:.3f}in"></figure>')

def photo_html(p):
    rel = REL_ROOT + p["fichier"].replace("\\", "/")
    cap = f'<figcaption>{il(p.get("legende", ""))}</figcaption>' if p.get("legende") else ""
    return f'<figure class="fig ph {p.get("taille", "quart")}"><img src="{rel}" alt="">{cap}</figure>'

POSEE = "\x00"   # source d'une figure posée par place() avec en_ordre : aucune ancre ne la reconnaît

def place(stories, items, num, en_ordre=False):
    """items : [(html, anchor|None, label)] ; stories : {kind: [(html, src)]}
    Sans en_ordre, chaque figure se pose juste après son ancre : plusieurs figures au même bloc sortent donc
    en ordre INVERSE, et les placements existants (photos listées à rebours) sont réglés là-dessus. Avec
    en_ordre (« en_ordre »: true dans l'entrée du chapitre, placements ; ch. 62, 29 septembre 2026), elles
    sortent dans l'ordre des items : numéros de planche, puis photos dans l'ordre du fichier."""
    for h, anchor, label in items:
        done = False
        pats = [anchor] if anchor else []
        m = re.match(rf"({num}-\d+[a-z]?)", label)
        if not anchor and m:
            pats = [rf"[Pp]lanche {re.escape(m.group(1))}\b"]
        for kind in ("main", "d", "e"):
            for i, (bh, src) in enumerate(stories[kind]):
                if any((re.search(p, src) if p.startswith("[") else src.replace("’", "'").startswith(p.replace("’", "'")) or p in src)
                       for p in pats):
                    j = i + 1
                    while en_ordre and j < len(stories[kind]) and stories[kind][j][1] == POSEE:
                        j += 1
                    stories[kind].insert(j, (h, POSEE if en_ordre else "")); done = True; break
            if done:
                break
        if not done:
            # repli : fin de la procédure
            idx = next((i for i, (bh, _) in enumerate(stories["main"]) if f'data-n="{NUM_PROC + 1}"' in bh), len(stories["main"]))
            stories["main"].insert(idx, (h, ""))
            WARN.append(f"{label} : aucun ancrage trouvé, placé à la fin de la procédure")

# ------------------------------------------------------------------ assemblage
def build(num):
    if num in ("00", "00b"):   # les deux chapitres d'ancrage ont leur mise en pages à part : ancrage.py
        import ancrage
        return ancrage.build(num, sys.modules[__name__])
    ch = load_chapter(num)
    stories = {"main": [], "d": [], "e": []}
    dsubject = ""
    # la Danger et la variante d'urgence se reconnaissent à leur titre, pas à leur numéro : 8 et 9 dans le gabarit
    # à neuf sections, 7 et 8 depuis que « Comment ça marche » est coupé (JP, 16 octobre 2026)
    nd, nv = sec_num(ch, r"^danger"), sec_num(ch, r"^variante d.urgence")
    global NUM_PROC
    NUM_PROC = sec_num(ch, r"^proc[ée]dure") or 5
    for s in ch["secs"]:
        n = s["n"]
        if n and n == nd:
            stories["d"], dsubject = danger_story(s)
        elif n and n == nv:
            stories["e"] = render(parse(s["lines"]))
        else:
            stories["main"].append((h2(n, s["title"]), ""))
            stories["main"].extend(render(parse(s["lines"]), lead=(n == 1)))
    # planches et photos
    cfg_path = os.path.join(OUTD, "placements.json")
    cfg = json.load(open(cfg_path, encoding="utf-8")).get(num, {}) if os.path.exists(cfg_path) else {}
    anchors = {p["id"]: p.get("apres") for p in cfg.get("planches", [])}
    # « poser »: false dans placements : la planche existe mais ne va pas dans ce chapitre (ex. 34-01, qui refait
    # la 28-01) ; utile depuis que l'assembleur pose aussi les planches à valider
    exclues = {p["id"] for p in cfg.get("planches", []) if p.get("poser") is False}
    figs = [f for f in figures(num) if f["id"] not in exclues]
    items = [(fig_html(f), anchors.get(f["id"]), f["id"]) for f in figs]
    photos = [dict(p, fichier=chemin_photo(p, num)) for p in cfg.get("photos", [])]
    items += [(photo_html(p), p.get("apres"), p["fichier"]) for p in photos]
    # logigramme en double page (15 octobre 2026) : « logigramme »: {"fichier": SVG de design/outils/logigramme.py
    # --sans-entete, "apres": ancre, "orange": true}. Le SVG va dans un gabarit, en ligne (en <img>, il perdrait ses
    # polices) ; chapitre.js le pose sur deux pages « spread », un verso puis un recto
    spreads = []
    lg = cfg.get("logigramme")
    for k, g in enumerate([lg] if isinstance(lg, dict) else (lg or [])):
        chemin = os.path.join(ROOT, g["fichier"])
        if not os.path.exists(chemin):
            WARN.append(f"logigramme introuvable : {g['fichier']}")
            continue
        svg = open(chemin, encoding="utf-8").read()
        svg = re.sub(r"<style>@import[^<]*</style>\s*", "", svg)          # le gabarit charge déjà IBM Plex
        svg = re.sub(r'\sid="[^"]*"', "", svg)                             # le dessin sert deux fois
        tid = f"spread-{num}-{k + 1}"
        nom = os.path.splitext(os.path.basename(g["fichier"]))[0]
        spreads.append(f'<template id="{tid}">{svg}</template>')
        dor = ' data-or="1"' if g.get("orange") else ""
        items.append((f'<figure class="fig spread" data-plate="spread" data-tpl="{tid}" data-id="{html.escape(nom)}"{dor}>'
                      '</figure>', g.get("apres"), "logigramme " + nom))
    place(stories, items, num, en_ordre=cfg.get("en_ordre") is True)
    dispo = photos_du_chapitre(num)
    if dispo:
        print(f"photos sous l'ancien numéro {ANCIEN.get(num, num)} : {len(dispo)} fichier(s), {len(photos)} placée(s)")

    # la série orange : le texte courant et la variante d'urgence se coupent en parties, chacune son histoire
    # (story-main, story-o1, story-main2…), que chapitre.js coule dans l'ordre de « flux » ; sans série, rien ne
    # change (pas de « flux » : main, d, e comme avant)
    flux, n_or = [], 0
    for kind in ("main", "d", "e"):
        segs = segments_orange(stories[kind]) if kind != "d" else []
        if len(segs) <= 1 or not any(o for o, _ in segs):
            flux.append([kind, kind, 0])
            continue
        del stories[kind]
        k_suite = 0
        for est_or, its in segs:
            if est_or:
                n_or += 1; sid, sk = f"o{n_or}", "o"
            else:
                k_suite += 1; sid, sk = (kind if k_suite == 1 else f"{kind}{k_suite}"), kind
            stories[sid] = its
            flux.append([sid, sk, 1 if (sk == kind and k_suite > 1) else 0])
    # les planches appelées dans une série orange ne coupent pas la série (JP, 18 octobre 2026 : « premières minutes est
    # scindé, il doit se suivre » ; « après le orange c'est les planches, et ensuite on commence l'essence ; laisse des
    # trous au pire ») : elles sortent de l'orange, se posent tout de suite après, et un saut de page les suit
    for i, (sid, sk, _) in enumerate(flux):
        if sk != "o":
            continue
        figs_or = [x for x in stories[sid] if x[0].lstrip().startswith("<figure") and 'data-plate="spread"' not in x[0]]
        if not figs_or:
            continue
        stories[sid] = [x for x in stories[sid] if x not in figs_or]
        saut = ('<div class="saut" data-plate="saut"></div>', "")
        suite = next((f for f in flux[i + 1:] if f[1] != "o"), None)
        if suite:
            stories[suite[0]][0:0] = figs_or + [saut]
        else:
            stories[sid].extend(figs_or)
    if any('class="sub or"' in h for h, _ in stories.get("d", [])):
        WARN.append("marqueur {.orange} dans la section 8 : le titre sort en orange, sans encadré")
    present = {s["n"] for s in ch["secs"] if s["n"]}
    # le sommaire d'ouverture prend le titre de la section 3 tel que le chapitre l'écrit (« Comment ça marche »
    # remplace « Pourquoi ça marche », JP, 16 octobre 2026)
    noms = {}
    for sc in ch["secs"]:
        if not sc["n"]:
            continue
        t = html.unescape(re.sub("<[^>]+>", "", il(sc["title"] or ""))).strip()
        noms[sc["n"]] = ("Danger" if re.match(r"(?i)danger", t) else t[:1].upper() + t[1:].lower() if t.isupper() else t) or SECNAMES.get(sc["n"], "")
    tn = tome_de(num)
    meta = dict(num=num, title=html.unescape(re.sub("<[^>]+>", "", il(ch["title"]))), tome=ch["tome"],
                tnum=tn, tfond=TOMES[tn][1], tencre=TOMES[tn][2],
                lieu=ch["lieu"] or "Les deux", dsub=il(dsubject) if dsubject else "",
                secs={str(k): v for k, v in noms.items() if k in present}, nd=nd or 8, nv=nv or 9)
    if n_or:
        meta["flux"] = flux     # [id de l'histoire, genre (main, o, d, e), 1 si c'est la suite d'une histoire coupée]
    lieu_opts = "".join(f'<span{" class=\"on\"" if o == meta["lieu"] else ""}>{o}</span>' for o in ("Maison", "Chalet", "Les deux"))
    toc = "".join(
        f'<li class="{"d" if k == nd else "h" if k == nv else ""}" data-n="{k}"><span class="n">{k}</span>'
        f'<span class="t">{v}</span><span class="f"></span></li>' for k, v in noms.items() if k in present)
    lieu_note = f'<p class="lieu-note">{il(ch["lieu_txt"])}</p>' if ch["lieu_txt"] else ""
    opening = (f'<header class="open"><div class="open-top"><span>{ch["tome"]}</span><span>Chapitre</span></div>'
               f'<div class="open-title"><div class="num">{int(num) if num.isdigit() else num}</div><h1>{il(ch["title"])}</h1></div>'
               f'<div class="open-meta"><div class="lieu"><b>Lieu</b><div class="opts">{lieu_opts}</div></div>'
               f'<ol class="toc">{toc}</ol></div>{lieu_note}</header>')

    tpl = open(os.path.join(TOOLS, "interieur.tpl.html"), encoding="utf-8").read()
    head = tpl[:tpl.index("</style>")]
    head = re.sub(r"<title>.*?</title>", f"<title>{num} — {html.escape(meta['title'])} — Le Grand Livre du Chalet</title>", head)
    js0 = tpl.index("const OVER"); js1 = tpl.index("/* appels hors cadre")
    helpers = tpl[js0:js1]
    eng = open(os.path.join(TOOLS, "chapitre.css"), encoding="utf-8").read()
    engine = open(os.path.join(TOOLS, "chapitre.js"), encoding="utf-8").read()
    st = lambda k: "\n".join(h for h, _ in stories[k])
    out = (head + eng + "</style>\n</head>\n<body>\n<div id=\"book\"></div>\n"
           + f'<template id="open">{opening}</template>\n'
           + "".join(f'<template id="story-{sid}">\n{st(sid)}\n</template>\n' for sid, _, _ in flux)
           + "".join(t + "\n" for t in spreads)
           + f'<template id="notes">\n{notes_html()}\n</template>\n'
           + '<script type="application/json" id="meta">' + json.dumps(meta, ensure_ascii=False) + "</script>\n"
           + '<pre id="stats"></pre>\n<script>\n(function(){\n' + helpers + engine + "\n})();\n</script>\n</body>\n</html>\n")
    os.makedirs(OUTD, exist_ok=True)
    dst = os.path.join(OUTD, f"{num}.html")
    open(dst, "w", encoding="utf-8").write(out)
    texte = out[out.find("<body"):]     # le texte seulement : les polices incorporées (base64) contiennent « ACIA »
    for org in ["MAPAQ", "ACIA", "Santé Canada", "INSPQ", "CNESST", "gouvernement du Québec"]:
        if org in texte:
            WARN.append("attribution restante : " + org)
    for w in WARN:
        print("ATTENTION :", w)
    print("ok", dst, len(out), "planches:", [f["id"] + "/" + f["size"] for f in figs])
    return dst

# ------------------------------------------------------------------ rendu
def url(dst, frag=""):
    return "file:///" + dst.replace("\\", "/").replace(" ", "%20") + frag

def edge(args, target, timeout=120):
    prof = tempfile.mkdtemp(prefix="edgeprof")
    common = ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
              f"--user-data-dir={prof}", "--hide-scrollbars", "--run-all-compositor-stages-before-draw",
              "--virtual-time-budget=20000"] + ([] if os.name == "nt" else ["--no-sandbox"])
    p = subprocess.Popen([EDGE] + common + args, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    return p, prof

def rendu(num, dst):
    # --dump-dom ne sort rien sous Windows (Edge n'a pas de console) : le nombre de pages vient du PDF
    import pypdf
    from pypdf.generic import RectangleObject
    pdf = os.path.join(OUTD, f"{num}.pdf")
    if os.path.exists(pdf):
        os.remove(pdf)
    p, prof = edge(["--no-pdf-header-footer", "--print-to-pdf-no-header", f"--print-to-pdf={pdf}", url(dst)], pdf)
    p.wait(timeout=240)
    for _ in range(60):
        if os.path.exists(pdf) and os.path.getsize(pdf) > 0:
            break
        time.sleep(1)
    time.sleep(1); shutil.rmtree(prof, ignore_errors=True)
    r = pypdf.PdfReader(pdf); w = pypdf.PdfWriter()
    for i, pg in enumerate(r.pages):
        W, H = 585, 738
        pg.mediabox = RectangleObject([0, 0, W, H]); pg.cropbox = RectangleObject([0, 0, W, H])
        pg.bleedbox = RectangleObject([0, 0, W, H])
        pg.trimbox = RectangleObject([0, 9, 576, 729] if i % 2 == 0 else [9, 9, 585, 729])
        w.add_page(pg)
    w.add_metadata({"/Title": f"Chapitre {num} — Le Grand Livre du Chalet (épreuve de mise en pages)"})
    npages = len(r.pages)
    with open(pdf, "wb") as f:
        w.write(f)
    pdir = os.path.join(OUTD, num); os.makedirs(pdir, exist_ok=True)
    for f in glob.glob(os.path.join(pdir, "page-*.png")):
        os.remove(f)
    jobs = list(range(1, npages + 1)); running = []
    while jobs or running:
        while jobs and len(running) < 4:
            k = jobs.pop(0); t = os.path.join(pdir, f"page-{k:02d}.png")
            p, prof = edge(["--force-device-scale-factor=2", "--window-size=768,960", f"--screenshot={t}",
                            url(dst, f"#page=p{num}-{k}")], t)
            running.append((p, prof, t, time.time()))
        time.sleep(0.5)
        for r_ in running[:]:
            # Edge rend la main avant d'avoir écrit : on attend le fichier, pas le processus
            if (os.path.exists(r_[2]) and os.path.getsize(r_[2]) > 0 and r_[0].poll() is not None) or time.time() - r_[3] > 120:
                time.sleep(0.3); shutil.rmtree(r_[1], ignore_errors=True); running.remove(r_)
    ctl = os.path.join(tempfile.gettempdir(), f"controle-{num}.png")
    if os.path.exists(ctl):
        os.remove(ctl)
    p, prof = edge(["--force-device-scale-factor=1", "--window-size=768,960", f"--screenshot={ctl}", url(dst, "#stats")], ctl)
    p.wait(timeout=120)
    for _ in range(90):
        if os.path.exists(ctl) and os.path.getsize(ctl) > 0:
            break
        time.sleep(1)
    time.sleep(1); shutil.rmtree(prof, ignore_errors=True)
    print("contrôle (avertissements du paginateur) :", ctl)
    print("pdf :", pdf, npages, "pages | png :", len(glob.glob(os.path.join(pdir, "page-*.png"))), "dans", pdir)

if __name__ == "__main__":
    num = sys.argv[1] if len(sys.argv) > 1 else sys.exit("usage : build_chapitre.py NN [--rendu]")
    dst = build(num)
    if "--rendu" in sys.argv:
        rendu(num, dst)
