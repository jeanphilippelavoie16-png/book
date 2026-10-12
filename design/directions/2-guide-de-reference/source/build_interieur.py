# -*- coding: utf-8 -*-
"""Compose interieur.html (direction 2, grand guide de reference) a partir des
fichiers de chapitre. Le texte est repris tel quel des .md : rien n'est reecrit,
seule la mise en forme change. Relancer apres chaque modification du chapitre :

    python source/build_interieur.py
"""
import html
import json
import re
from pathlib import Path

ICI = Path(__file__).resolve().parent
DIR = ICI.parent
RACINE = DIR.parent.parent.parent
CH65 = (RACINE / "chapitres" / "65-fumage-a-froid.md").read_text(encoding="utf-8")
CH00 = (RACINE / "chapitres" / "00-le-chapitre-principal.md").read_text(encoding="utf-8")
GABARIT = (ICI / "interieur.gabarit.html").read_text(encoding="utf-8")

# Titres des chapitres cites en renvoi (repris des fichiers eux-memes)
TITRES = {}
for f in sorted((RACINE / "chapitres").glob("*.md")):
    m = re.match(r"#\s*Chapitre\s+(\w+)\s+—\s+(.+)", f.read_text(encoding="utf-8").splitlines()[0])
    if m:
        TITRES[m.group(1).lstrip("0") or "0"] = m.group(2).strip()


# ---------------------------------------------------------------- en ligne
def refs(s):
    """Balise chaque numero de chapitre cite : ch. 63 / ch. 63, 64 / chapitre 62."""
    def one(n):
        return f'<span class="ref" data-ch="{n}">{n}</span>'

    def seq(m):
        mot, nums = m.group(1), m.group(2)
        nums = re.sub(r"\d+[a-z]?", lambda k: one(k.group(0)), nums)
        return f"{mot} {nums}" if mot.lower().startswith("ch.") else f"{mot} {nums}"

    return re.sub(r"\b([Cc]h\.|[Cc]hapitre)\s(\d+[a-z]?(?:(?:,\s|\set\s)\d+[a-z]?)*)", seq, s)


def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r"`\[À VÉRIFIER\]`|\[À VÉRIFIER\]", '<span class="av">[À VÉRIFIER]</span>', s)
    s = re.sub(r"`\[À VÉRIFIER([^\]`]*)\]`|\[À VÉRIFIER([^\]]*)\]",
               lambda m: f'<span class="av">[À VÉRIFIER{m.group(1) or m.group(2)}]</span>', s)
    s = re.sub(r"`([^`]*)`", r"\1", s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<i>\1</i>", s)
    s = refs(s)
    return s


# ---------------------------------------------------------------- sections
def sections(md):
    out, cur, key = {}, [], None
    for line in md.splitlines():
        m = re.match(r"^## (\d+)\. (.+)$", line)
        if m:
            if key:
                out[key] = cur
            key, cur = m.group(1), []
            continue
        if key:
            cur.append(line)
    out[key] = cur
    return out


def paras(lines):
    """Regroupe des lignes en paragraphes (ligne vide = separation)."""
    buf, out = [], []
    for l in lines + [""]:
        if l.strip() == "" or l.strip() == "---":
            if buf:
                out.append(" ".join(x.strip() for x in buf))
                buf = []
        else:
            buf.append(l)
    return out


def blocks_generic(lines):
    """Paragraphes, puces, sous-titres ###, tableaux."""
    out = []
    items = []  # (type, text)
    cur = None
    for l in lines:
        if l.strip() in ("", "---"):
            if cur:
                items.append(cur)
                cur = None
            continue
        if l.startswith("### "):
            if cur:
                items.append(cur)
            items.append(("h3", l[4:].strip()))
            cur = None
        elif l.startswith("|"):
            if cur and cur[0] != "table":
                items.append(cur)
                cur = None
            if not cur:
                cur = ("table", [])
            cur[1].append(l)
        elif re.match(r"^- ", l):
            if cur:
                items.append(cur)
            cur = ("li", l[2:].strip())
        elif l.startswith(" ") and cur and cur[0] == "li":
            cur = ("li", cur[1] + " " + l.strip())
        else:
            if cur and cur[0] == "p":
                cur = ("p", cur[1] + " " + l.strip())
            else:
                if cur:
                    items.append(cur)
                cur = ("p", l.strip())
    if cur:
        items.append(cur)
    for t, v in items:
        if t == "h3":
            out.append(f"<h3>{inline(v)}</h3>")
        elif t == "li":
            out.append(f'<div class="li"><p class="txt">{inline(v)}</p></div>')
        elif t == "table":
            out.append(table(v))
        else:
            if re.fullmatch(r"\*\*[^*]+\*\*", v):
                out.append(f'<p class="kicker">{inline(v[2:-2])}</p>')
            else:
                out.append(f"<p>{inline(v)}</p>")
    return out


def table(rows, cls="tbl"):
    cells = [[c.strip() for c in r.strip().strip("|").split("|")] for r in rows]
    head, body = cells[0], [r for r in cells[2:]]
    kind = {"Item": "t-mat", "Moment": "t-ctl", "Observation": "t-ech"}.get(head[0], "")
    h = "".join(f"<th>{inline(c)}</th>" for c in head)
    b = "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in body)
    return f'<div class="tblw"><table class="{cls} {kind}"><thead><tr>{h}</tr></thead><tbody>{b}</tbody></table></div>'


def procedure(lines):
    out = []
    cur = None  # [type, text, n]

    def flush():
        nonlocal cur
        if not cur:
            return
        t, v, n = cur
        if t == "step":
            out.append(f'<div class="step"><span class="n">{n}</span><p class="txt">{inline(v)}</p></div>')
        elif t == "sub":
            out.append(f'<div class="step-sub"><p class="txt">{inline(v)}</p></div>')
        elif t == "stp":
            out.append(f'<div class="step-p"><p class="txt">{inline(v)}</p></div>')
        cur = None

    for l in lines:
        if not l.strip() or l.strip() == "---":
            flush()
            continue
        m3 = re.match(r"^### ([A-Z]) — (.+)$", l)
        m = re.match(r"^(\d+)\. (.+)$", l)
        ms = re.match(r"^\s+- (.+)$", l)
        if m3:
            flush()
            out.append(f'<h3 class="part"><span class="pl">{m3.group(1)}</span> {inline(m3.group(2))}</h3>')
        elif m:
            flush()
            cur = ["step", m.group(2), m.group(1)]
        elif ms:
            flush()
            cur = ["sub", ms.group(1), None]
        elif l.startswith(" ") and cur:
            txt = l.strip()
            # « Dans le doute… » ferme la liste de l'etape 2 : il revient au fil de l'etape
            if cur[0] == "sub" and txt.startswith("Dans le doute"):
                flush()
                cur = ["stp", txt, None]
            else:
                cur[1] += " " + txt
        else:
            if cur:
                cur[1] += " " + l.strip()
    flush()
    return out


def danger(lines):
    body = [re.sub(r"^>\s?", "", l) for l in lines if l.startswith(">")]
    titre = ""
    pts = []
    buf = []
    for l in body + [""]:
        if l.startswith("### "):
            titre = re.sub(r"^###\s*⚠?\s*", "", l).strip()
            continue
        if l.strip() == "":
            if buf:
                pts.append(" ".join(x.strip() for x in buf))
                buf = []
        else:
            buf.append(l)
    sujet = re.sub(r"^DANGER\s*—\s*", "", titre)
    h = ['<div class="dz">',
         '<div class="dz-head"><span class="dzmark"></span><span class="full">Danger'
         + (f' <span class="dash">—</span> <span class="subj">{inline(sujet)}</span>' if sujet != titre else "")
         + '</span><span class="suite">Danger <span class="subj">(suite)</span></span></div>',
         '<div class="dz-body">']
    for p in pts:
        m = re.match(r"^\*\*(\d+)\.\s(.+?)\*\*\s*(.*)$", p)
        if m:
            h.append(f'<div class="dz-pt"><span class="n">{m.group(1)}</span><p class="txt"><b class="lead">{inline(m.group(2))}</b> {inline(m.group(3))}</p></div>')
        else:
            h.append(f'<div class="dz-pt"><p class="txt">{inline(p)}</p></div>')
    h.append("</div></div>")
    return h


# ---------------------------------------------------------------- chapitre 65
S = sections(CH65)
NOMS = {"1": "En une ligne", "2": "Quand l'utiliser", "3": "Pourquoi ça marche", "4": "Matériel",
        "5": "Procédure", "6": "Points de contrôle", "7": "Signes d'échec", "8": "Danger",
        "9": "Variante d'urgence"}


def h2(n):
    cls = "sec s9" if n == "9" else "sec"
    return f'<h2 class="{cls}" data-n="{n}" data-t="{NOMS[n]}"><span class="sn">{n}</span>{html.escape(NOMS[n])}</h2>'


lieu = re.search(r"^\*\*(Maison|Chalet|Les deux)\.?\*\*", CH65, re.M).group(1)
tome = re.search(r"^\*(Tome \d+ — [^*]+)\*", CH65, re.M).group(1)
titre = re.match(r"#\s*Chapitre\s+\d+\s+—\s+(.+)", CH65).group(1).strip()

FOLIOS = {"1": 213, "2": 213, "3": 215, "4": 216, "5": 217, "6": 220, "7": 221, "8": 222, "9": 223}
som = "".join(
    f'<li class="s{n}"><span class="n">{n}</span><span class="t">{html.escape(NOMS[n])}</span><span class="f">{FOLIOS[n]}</span></li>'
    for n in NOMS)


def lieu_html(l):
    on = {"Maison": ("on", "off"), "Chalet": ("off", "on"), "Les deux": ("on", "on")}[l]
    return f'<span class="lieu"><span class="{on[0]}">Maison</span><span class="{on[1]}">Chalet</span></span>'


ouverture = f'''<header class="ouv">
<span class="bignum">65</span>
<div class="ouv-k">Chapitre 65 <span class="sep">·</span> {html.escape(tome)}</div>
<h1>{html.escape(titre)}</h1>
<div class="ouv-lieu">{lieu_html(lieu)}</div>
<ol class="som">{som}</ol>
</header>'''

s1 = paras(S["1"])[0]
chaine_a = [ouverture, h2("1"), f'<p class="lede">{inline(s1)}</p>', h2("2")] + blocks_generic(S["2"]) \
    + [h2("3")] + blocks_generic(S["3"])
chaine_b = [h2("4")] + blocks_generic(S["4"]) + [h2("5")] + procedure(S["5"])
chaine_c = [h2("8")] + danger(S["8"]) + [h2("9")] + blocks_generic(S["9"])

# Reperes chiffres poses en marge : ils reprennent le texte, ils n'ajoutent rien.
REPERES = [
    # (section, texte exact a trouver dans le fil, valeur, libelle)
    ("1", "au plus 14 jours", "14 jours", "au plus, à 4 °C ou moins : poisson fumé réfrigéré"),
    ("2", "cuit à 74 °C à cœur", "74 °C", "à cœur, tout le gibier"),
    ("2", "-20 °C pendant 7 jours", "−20 °C · 7 j", "ou −35 °C pendant 15 h : gel antiparasitaire"),
    ("3", "est <b>0,97</b>", "a<sub>w</sub> 0,97", "seuil du botulisme de type E"),
    ("3", "90 °C pendant 10 minutes", "90 °C · 10 min", "ce que le fumoir n'atteint jamais"),
]


def poser_reperes(blocs):
    res = []
    for b in blocs:
        for sec, cle, val, lib in REPERES:
            if cle in b and 'class="anc"' not in b.split(cle)[0][-200:]:
                b = b.replace(cle, f'<span class="anc" data-v="{html.escape(val)}" data-l="{html.escape(lib)}"></span>' + cle, 1)
        res.append(b)
    return res


chaine_a = poser_reperes(chaine_a)

# ---------------------------------------------------------------- chapitre principal, bloc 1
bloc = CH00.split("## 1. ")[1].split("\n---")[0]
b_lines = bloc.splitlines()
b_titre = re.sub(r"\s*—\s*\*\*.*$", "", b_lines[0]).strip()
b_lieu = re.search(r"\*\*(Maison|Chalet|Les deux)\*\*", b_lines[0]).group(1)
b_items, b_paras = [], []
cur = None
for l in b_lines[1:]:
    if l.startswith("- "):
        if cur:
            b_items.append(cur)
        cur = l[2:].strip()
    elif l.startswith(" ") and cur is not None:
        cur += " " + l.strip()
    elif l.strip() == "":
        if cur:
            b_items.append(cur)
            cur = None
        b_paras.append("")
    else:
        if cur:
            b_items.append(cur)
            cur = None
        b_paras.append(l.strip())
if cur:
    b_items.append(cur)
pp = [p for p in " ".join(x if x else "\n" for x in b_paras).split("\n") if p.strip()]
contexte, chalet = pp[0].strip(), pp[-1].strip()


def geste(t):
    m = re.match(r"^\*\*(.+?)\*\*\s*([,:—]?)\s*(.*)$", t)
    lead, ponct, reste = m.group(1), m.group(2), m.group(3)
    chs = re.findall(r"ch\. (\d+)", reste)
    reste = re.sub(r"\s*\((?:ch\. \d+(?:, )?)+\)", "", reste).strip()
    return lead + ((" " if ponct == ":" else " ") + ponct if ponct and ponct != "," else ponct), reste, chs


gestes = ""
for i, it in enumerate(b_items, 1):
    lead, reste, chs = geste(it)
    danger_mark = '<span class="gdz"></span>' if lead.lower().startswith("génératrice") else ""
    renv = " ".join(f'<span class="gch">ch. <b>{c}</b> <i>{html.escape(TITRES.get(c, ""))}</i></span>' for c in chs)
    gestes += (f'<li>{danger_mark}<span class="gn">{i}</span><p class="gl">{inline(lead)}</p>'
               f'<p class="gx">{inline(reste)}</p><p class="gr">{renv}</p></li>')

ch_chalet = re.findall(r"ch\. (\d+)", chalet)
chalet_txt = re.sub(r"\s*\((?:ch\. \d+(?:, )?)+\)", "", chalet)
chalet_renv = " ".join(f'<span class="gch">ch. <b>{c}</b> <i>{html.escape(TITRES.get(c, ""))}</i></span>' for c in ch_chalet)

INDEX = ["Le courant", "La tempête", "Feu de forêt", "Blessure", "Monoxyde", "Bâtiment en feu",
         "Congélateur", "La glace", "L'eau", "Épidémie", "Retombées"]
index = "".join(f'<li class="{"on" if i == 1 else ""}" style="--i:{i - 1}"><b>{i}</b> {html.escape(t)}</li>'
                for i, t in enumerate(INDEX, 1))

principal = f'''<section class="page recto principal" data-folio="3">
<div class="trim">
<div class="rh"><span class="t">Le chapitre principal</span><span class="cn">1</span></div>
<ol class="pidx">{index}</ol>
<div class="ptab" style="--i:0"><span>1</span></div>
<div class="pp">
<div class="pp-k">Bloc 1 sur 11 <span class="sep">·</span> du plus probable au moins probable</div>
<h1><span class="ppn">1</span>{inline(b_titre)}</h1>
<div class="ouv-lieu">{lieu_html(b_lieu)}</div>
<p class="pp-ctx">{inline(contexte)}</p>
<ol class="gestes">{gestes}</ol>
<div class="pp-chalet"><span class="lieu"><span class="on">Chalet</span></span><p>{inline(chalet_txt)}</p><p class="gr">{chalet_renv}</p></div>
<p class="pp-rien"><b>Sans génératrice</b> <span class="fl">—</span> « Quand il n'y a rien », 1 · Le courant, sans génératrice</p>
</div>
<div class="folio">3</div>
</div>
</section>'''

page = GABARIT
page = page.replace("<!--CHAINE_A-->", "\n".join(chaine_a))
page = page.replace("<!--CHAINE_B-->", "\n".join(chaine_b))
page = page.replace("<!--CHAINE_C-->", "\n".join(chaine_c))
page = page.replace("<!--PRINCIPAL-->", principal)
planche = (RACINE / "images" / "planche-65-01-fumoir-froid.svg").read_text(encoding="utf-8")
planche = re.sub(r"^<\?xml[^>]*>\s*", "", planche)
page = page.replace("<!--PLANCHE-->", planche)
page = page.replace("/*HACHURES*/", (ICI / "hachures.js").read_text(encoding="utf-8"))
page = page.replace("/*TITRES*/", json.dumps(TITRES, ensure_ascii=False))
import os
if os.environ.get("MESURE"):
    prose = [x for x in blocks_generic(S["3"]) + blocks_generic(S["9"]) if x.startswith("<p>")]
    test = '<section class="page verso" data-folio="998" data-chain="z"><div class="trim"><div class="flow">' + " ".join(prose) + '</div><div class="mcol"></div><div class="rh"></div><div class="folio"></div></div></section>'
    page = page.replace("<!--PRINCIPAL-->", "").replace('<section class="page verso" data-folio="222"', test + '<section class="page verso" data-folio="222"')
    (ICI / "mesure.html").write_text(page.replace("../../../images/", "../../../../images/"), encoding="utf-8")
else:
    (DIR / "interieur.html").write_text(page, encoding="utf-8")
print("interieur.html écrit,", len(page), "octets")
