# -*- coding: utf-8 -*-
"""Mise en pages à part des deux chapitres d'ancrage (CLAUDE.md, « Les deux chapitres d'ancrage ») :
le 00, le chapitre principal, et le 00b, acheter par priorité. Ils ne suivent pas le gabarit en neuf
sections : build_chapitre.build() les envoie ici, et tout le reste de la chaîne marche pareil.

    python build_chapitre.py 00 [--rendu]                (noir, comme les autres épreuves)
    python variante.py 00b --variante C                   (couleur du tome, pictogrammes)
    python rendre_c.py 00 00b                             -> design/epreuves-livre/C/00/ et C/00b/

Même page, même grille et même CSS de base que les autres chapitres (interieur.tpl.html et chapitre.css,
non modifiés). Ce qui est propre aux deux chapitres : ancrage.css (les deux), ancrage-00.js (pages fixes
du 00, ajustées au corps) et ancrage-00b.js (le 00b coule dans le moteur chapitre.js, non modifié ; le
fichier ne remplace que la finition des pages). Le texte vient tel quel du Markdown : rien n'est
ajouté ni réécrit. Seuls l'ordre des pages et la hiérarchie typographique appartiennent à la mise en pages.

Le 00 : page 1, l'ouverture et la table (index des onze blocs, avec les onglets). Puis une double page
par catastrophe : à gauche (verso) le bloc — gros titre, lieu, les gestes en gros, renvois en boîte —,
à droite (recto) le même numéro de « Quand il n'y a rien ». Onglet sur la tranche à la hauteur du bloc,
sur les deux pages. Puis le seuil, le danger, et la fin de « Quand il n'y a rien » (tableau de substitution).
APPARIER = False garde l'ordre du Markdown (onze blocs, puis les onze « sans rien »), chaque page gardant
son onglet.

Le 00b : l'ouverture, puis le texte coule. Chaque palier ouvre sur un bandeau plein à son intensité
(1 le plus foncé, 4 au trait) et porte son onglet sur la tranche ; les tableaux d'achat commencent par la
colonne Lieu, une case à cocher par endroit où l'objet doit être (Les deux = deux cases), avec les
pictogrammes maison / chalet de la variante C.
"""
import os, re, sys, json, html
import build_chapitre as bc      # remplacé par le module appelant (build_chapitre.build), voir build()
from md2blocks import load_notes, notes_html

TOOLS = bc.TOOLS
ROOT = bc.ROOT
APPARIER = True          # 00 : chaque bloc face à son « Quand il n'y a rien »
NUMS = ("00", "00b")

# Onglets de tranche (00 : blocs 1 à 11 ; 00b : paliers 1 à 4). Même grille pour les deux chapitres,
# sous l'onglet du chapitre de la variante C (0 à 0,84 po). Coordonnées de la page PDF (fond perdu compris).
TAB_TOP, TAB_PAS = 0.95, 0.78


def tab_top(n):
    return TAB_TOP + (n - 1) * TAB_PAS


def il(s):
    return bc.il(s)


def plain(s):
    return html.unescape(re.sub("<[^>]+>", "", il(s)))


# ------------------------------------------------------------------ lieu et pictogrammes
LIEU_KEYS = {"maison": "m", "chalet": "c", "les deux": "2", "maison → chalet": "mc"}


def picto(k, cls=""):
    return f'<i class="ak ak-{k}{(" " + cls) if cls else ""}" aria-hidden="true"></i>'


def lieu_badge(lieu):
    k = LIEU_KEYS.get(lieu.strip().lower())
    if not k:
        bc.WARN.append(f"lieu inconnu : {lieu}")
        return f'<span class="lieu-b">{il(lieu)}</span>'
    return f'<span class="lieu-b l-{k}">{picto(k)}<b>{html.escape(lieu.strip())}</b></span>'


def lieu_cases(cell, cases=True):
    """Cellule Lieu d'un tableau d'achat : une case par endroit où l'objet doit être, le pictogramme, le
    mot, puis la précision éventuelle (« (partout où il y a un poêle) », « en seaux de 5 kg »)."""
    m = re.match(r"^\*\*(.+?)\*\*[\s,.;]*(.*)$", cell.strip())
    if not m:
        bc.WARN.append(f"cellule Lieu sans mention en gras : {cell[:40]}")
        return il(cell)
    key, rest = m.group(1).strip(), m.group(2).strip()
    k = LIEU_KEYS.get(key.lower())
    if not k:
        bc.WARN.append(f"lieu inconnu dans un tableau : {key}")
        return il(cell)
    bx = '<span class="bx"></span>' if cases else ""
    ar = '<span class="ar">→</span>'
    if k == "m":
        lines = [f'<span class="lx">{bx}{picto("m")}<b>Maison</b></span>']
    elif k == "c":
        lines = [f'<span class="lx">{bx}{picto("c")}<b>Chalet</b></span>']
    elif k == "2":
        lines = [f'<span class="lx">{bx}{picto("m")}<b>Maison</b></span>',
                 f'<span class="lx">{bx}{picto("c")}<b>Chalet</b></span>']
    else:
        lines = [f'<span class="lx">{bx}{picto("m")}<b>Maison</b></span>',
                 f'<span class="lx fl">{ar}{picto("c")}<b>Chalet</b></span>']
    q = f'<span class="lq">{il(rest)}</span>' if rest else ""
    return f'<div class="lcell">{"".join(lines)}{q}</div>'


def refs_html(refs, pre="ch.&nbsp;"):
    return "".join(f'<span class="gr">{pre}{r}</span>' for r in refs)


REFS_FIN = re.compile(r"\s*\(((?:ch\.\s*\d+[a-z]?(?:\s*§\s*\d+)?)(?:\s*,\s*ch\.\s*\d+[a-z]?(?:\s*§\s*\d+)?)*)\)\s*([.:]?)\s*$")


def split_refs(t):
    """« … une impression (ch. 1, ch. 74). » -> (« … une impression. », ['1', '74']). Seuls les renvois
    en fin de puce passent dans la colonne de renvois ; ceux du milieu d'une phrase restent en place."""
    m = REFS_FIN.search(t)
    if not m:
        return t, []
    refs = re.findall(r"ch\.\s*(\d+[a-z]?)", m.group(1))
    return t[:m.start()] + (m.group(2) or ""), refs


def geste(t):
    """Puce « **Amorce** suite » -> (amorce, suite, renvois). La ponctuation qui suit l'amorce (« : », « — »,
    « , », « . ») monte au bout de l'amorce, pour que la suite ne commence pas par elle."""
    t, refs = split_refs(t)
    m = re.match(r"^\*\*(.+?)\*\*\s*(.*)$", t, re.S)
    if not m:
        return None, t, refs
    lead, rest = m.group(1).strip(), m.group(2).strip()
    p = re.match(r"^([:;,.—–]+)\s*(.*)$", rest, re.S)
    if p:
        lead = lead + (" " if p.group(1) in (":", ";") else (" " if p.group(1)[0] in "—–" else "")) + p.group(1)
        rest = p.group(2)
    return lead, rest, refs


def gestes_html(items, cls=""):
    out = []
    for t in items:
        lead, rest, refs = geste(t)
        # le tiret monté au bout de l'amorce reste collé au dernier mot : il() ramène l'insécable à une
        # espace ordinaire, l'entité se pose après lui
        lh = re.sub(r"\s([—–])$", r"&nbsp;\1", il(lead)) if lead else ""
        body = (f'<div class="g-lead">{lh}</div>' if lead else "") + (f'<div class="g-exp">{il(rest)}</div>' if rest else "")
        out.append(f'<li><span class="g-m"></span><div class="g-t">{body}</div>'
                   f'<div class="g-refs">{refs_html(refs)}</div></li>')
    return f'<ol class="gestes{(" " + cls) if cls else ""}">' + "".join(out) + "</ol>"


def paras_html(ps, cls=""):
    out = []
    for t in ps:
        c = cls
        if re.match(r"^«.*»\.?$", t.strip()):
            c = (c + " cite").strip()      # la citation seule sur sa ligne : en exergue
        out.append(f'<p class="{c}">{il(t)}</p>' if c else f"<p>{il(t)}</p>")
    return "".join(out)


def blocs_simples(lines):
    """Paragraphes et puces d'un bloc, dans l'ordre : [('p', txt) | ('li', txt)]."""
    out, cur = [], None
    for l in lines:
        s = l.strip()
        if not s or re.match(r"^-{3,}$", s):
            if cur: out.append(cur); cur = None
            continue
        m = re.match(r"^[-*]\s+(.*)$", s)
        if m and not l.startswith(" "):
            if cur: out.append(cur)
            cur = ["li", m.group(1)]; continue
        if cur:
            cur[1] += " " + s
        else:
            cur = ["p", s]
    if cur: out.append(cur)
    return [tuple(x) for x in out]


# ------------------------------------------------------------------ Markdown -> sections
def lire(num):
    import glob
    cands = sorted(glob.glob(os.path.join(ROOT, "chapitres", f"{num}-*.md")))
    if not cands:
        sys.exit(f"aucun chapitre chapitres/{num}-*.md")
    raw = open(cands[0], encoding="utf-8", newline="").read().replace("\r\n", "\n").replace("\r", "")
    md = load_notes(raw, num)
    lines = md.splitlines()
    title = re.sub(r"^#\s+", "", next(l for l in lines if l.startswith("# ")))
    pre, secs, cur = [], [], None
    for l in lines[1:]:
        m = re.match(r"^##\s+(.*)$", l)
        if m and not l.startswith("###"):
            cur = {"title": m.group(1).strip(), "lines": []}; secs.append(cur); continue
        (cur["lines"] if cur else pre).append(l)
    return dict(path=cands[0], title=title, pre=pre, secs=secs)


def sous_sections(lines):
    """Découpe sur les ### : [(titre|None, lignes)]."""
    out, cur = [], [None, []]
    for l in lines:
        m = re.match(r"^###\s+(.*)$", l)
        if m:
            out.append(tuple(cur)); cur = [m.group(1).strip(), []]; continue
        cur[1].append(l)
    out.append(tuple(cur))
    return [(t, ls) for t, ls in out if t or any(x.strip() and not re.match(r"^-{3,}$", x.strip()) for x in ls)]


def table_rows(lines):
    rows = [bc.split_row(l) for l in lines if l.strip().startswith("|")]
    return rows[0], [r for r in rows[2:] if any(c.strip() for c in r)]


# ------------------------------------------------------------------ commun
def page_html(pid, side, cls, inner, rh=None, ft=None, extra=""):
    return (f'<section class="page {side} anc {cls}" id="{pid}">' + (rh or "") + extra
            + f'<div class="block">{inner}</div>' + (ft or "") + "</section>\n")


def running_head(num, n, title, tome):
    return (f'<div class="rh"><div class="grp"><span class="fo">{num}-{n}</span><span class="ch">{num} · {html.escape(title)}</span></div>'
            f'<span class="to">{tome}</span></div>')


def onglet(n, label=None, cls=""):
    return (f'<div class="ak-tab {cls}" style="top:{tab_top(n):.3f}in"><span>{label if label is not None else n}</span></div>')


def ladder(n_on, total, label, lieu_k, lieu_txt, folio=None, cls_of=None):
    lis = "".join(f'<li class="{"on " if k == n_on else ""}{cls_of(k) if cls_of else ""}">{k}</li>' for k in range(1, total + 1))
    pk = picto(lieu_k) if lieu_k else ""
    return ('<div class="ft">' + (f'<span class="fo-ft">{folio}</span>' if folio else "")
            + f'<div class="lad"><ol>{lis}</ol><span class="lab">{label}</span></div>'
            + f'<span class="lieu-ft">{pk}Lieu · {lieu_txt}</span></div>')


def entete_html(num, title, js_name, meta):
    tpl = open(os.path.join(TOOLS, "interieur.tpl.html"), encoding="utf-8").read()
    head = bc.appliquer_format(tpl[:tpl.index("</style>")])     # le format d'impression (build_chapitre.py, FORMATS)
    head = re.sub(r"<title>.*?</title>", f"<title>{num} — {html.escape(title)} — Le Manuel du Nord</title>", head)
    css = open(os.path.join(TOOLS, "chapitre.css"), encoding="utf-8").read()
    css += open(os.path.join(TOOLS, "ancrage.css"), encoding="utf-8").read()
    css += "\n" + icones() + "\n"
    if num == "00":   # l'onglet du chapitre (variante C) écrit int(num) : « 0 »
        css += 'html body{--chnum:"00"}\n'
    return head + css + "</style>\n</head>\n<body>\n<div id=\"book\">"


def icones():
    """Les pictogrammes de la variante C (variante.py, ICONES), pour qu'ils existent aussi en noir."""
    try:
        sys.path.insert(0, os.path.join(ROOT, "design", "variantes-couleur", "outils"))
        import variante
        return variante.icon_vars()
    except Exception as e:     # le rendu reste lisible sans eux : les mots sont écrits à côté
        bc.WARN.append(f"pictogrammes introuvables ({e})")
        return ""


def pied_html(meta, js):
    tpl = open(os.path.join(TOOLS, "interieur.tpl.html"), encoding="utf-8").read()
    helpers = tpl[tpl.index("const OVER"):tpl.index("/* appels hors cadre")]
    return ('<script type="application/json" id="meta">' + json.dumps(meta, ensure_ascii=False) + "</script>\n"
            + '<pre id="stats"></pre>\n<script>\n(function(){\n' + helpers + js + "\n})();\n</script>\n</body>\n</html>\n")


def ecrire(num, out):
    os.makedirs(bc.OUTD, exist_ok=True)
    dst = os.path.join(bc.OUTD, f"{num}.html")
    open(dst, "w", encoding="utf-8").write(out)
    texte = out[out.find("<body"):]     # le texte seulement : les polices incorporées (base64) contiennent « ACIA »
    for org in ["MAPAQ", "ACIA", "Santé Canada", "INSPQ", "CNESST", "gouvernement du Québec"]:
        if org in texte:
            bc.WARN.append("attribution restante : " + org)
    for w in bc.WARN:
        print("ATTENTION :", w)
    print("ok", dst, len(out))
    return dst


# ================================================================== 00 — le chapitre principal
def build_00():
    num = "00"
    ch = lire(num)
    tn = bc.tome_de(num)
    tome = f"Tome {tn} · {bc.TOMES[tn][0]}"
    title = ch["title"]
    # préambule : sous-titre en italique, puis les paragraphes entre les deux filets
    pre = [l for l in ch["pre"]]
    sous = next((l.strip().strip("*") for l in pre if re.match(r"^\*[^*].*\*$", l.strip())), "")
    intro = [t for k, t in blocs_simples([l for l in pre if not re.match(r"^\*[^*].*\*$", l.strip())]) if k == "p"]

    blocs, table, seuil, danger, rien = {}, None, None, None, None
    for s in ch["secs"]:
        t = s["title"]
        m = re.match(r"^(\d+)\.\s+(.*?)\s+—\s+\*\*(.+?)\*\*\s*$", t)
        if m:
            blocs[int(m.group(1))] = dict(n=int(m.group(1)), title=m.group(2), lieu=m.group(3), items=blocs_simples(s["lines"]))
        elif t.lower().startswith("la table"):
            table = table_rows(s["lines"])
        elif t.lower().startswith("le seuil"):
            seuil = s
        elif "tue le plus vite" in t.lower():
            danger = s
        elif t.lower().startswith("quand il n"):
            rien = s
        else:
            bc.WARN.append(f"00 : section non placée : {t}")
    if sorted(blocs) != list(range(1, 12)):
        bc.WARN.append(f"00 : blocs trouvés {sorted(blocs)}")
    # « Quand il n'y a rien » : intro, onze sous-blocs « N · Titre », puis le tableau de substitution
    rien_intro, sans, subst = [], {}, None
    for st, ls in sous_sections(rien["lines"]):
        if st is None:
            rien_intro = [t for k, t in blocs_simples(ls) if k == "p"]
            continue
        m = re.match(r"^(\d+)\s*·\s*(.*)$", st)
        if m:
            sans[int(m.group(1))] = dict(n=int(m.group(1)), title=m.group(2), items=blocs_simples(ls))
        elif "substitution" in st.lower():
            subst = dict(title=st, intro=[t for k, t in blocs_simples([l for l in ls if not l.strip().startswith("|")]) if k == "p"],
                         table=table_rows(ls))
    short = {n: plain(b["title"]) for n, b in blocs.items()}
    lieu_of = {n: b["lieu"] for n, b in blocs.items()}

    # ---- ordre des pages
    seq = [("ouv", None)]
    if APPARIER:
        for n in range(1, 12):
            seq += [("bloc", n), ("sans", n)]
        seq += [("seuil", None), ("danger", None), ("rien", None)]
    else:
        seq += [("bloc", n) for n in range(1, 12)] + [("seuil", None), ("danger", None), ("rien", None)]
        seq += [("sans", n) for n in range(1, 12)] + [("subst", None)]
    page_of = {}
    for i, (k, n) in enumerate(seq, 1):
        page_of.setdefault((k, n), i)

    pages = []
    lk = lambda l: LIEU_KEYS.get(l.lower(), "2")
    cls_ladder = lambda k: "l-" + lk(lieu_of.get(k, "Les deux"))
    for i, (kind, n) in enumerate(seq, 1):
        side = "recto" if i % 2 else "verso"
        pid = f"p{num}-{i}"
        rh = running_head(num, i, title, tome)
        if kind == "ouv":
            tabs = "".join(onglet(k) for k in range(1, 12))
            head, rows = table
            trs = []
            for r in rows:
                k = int(r[0])
                lieu = re.sub(r"\*", "", r[2]).strip()
                chs = re.findall(r"\d+[a-z]?", r[4])
                pg = page_of[("bloc", k)]
                trs.append(f'<tr><td class="ix-n"><span>{k}</span></td><td class="ix-t">{il(r[1])}</td>'
                           f'<td class="ix-l">{lieu_badge(lieu)}</td><td class="ix-o">{il(r[3])}</td>'
                           f'<td class="ix-c">{refs_html(chs, "")}</td><td class="ix-p">{num}-{pg}</td></tr>')
            th = "".join(f"<th>{il(h)}</th>" for h in head[1:]) + "<th>Page</th>"
            index = (f'<table class="ak-index"><colgroup><col style="width:5.5%"><col style="width:33%"><col style="width:14.5%">'
                     f'<col style="width:27%"><col style="width:11%"><col style="width:9%"></colgroup>'
                     f'<thead><tr><th>{il(head[0])}</th>{th}</tr></thead><tbody>{"".join(trs)}</tbody></table>')
            opening = (f'<header class="open"><div class="open-top"><span>{tome}</span><span>Chapitre</span></div>'
                       f'<div class="open-title"><div class="num">{num}</div><h1>{il(title)}</h1></div></header>')
            inner = (opening + (f'<p class="ouv-sous">{il(sous)}</p>' if sous else "")
                     + f'<div class="ouv-intro">{paras_html(intro)}</div>' + index)
            ft = ladder(0, 11, "La table", "2", "Maison et chalet", folio=f"{num}-{i}", cls_of=cls_ladder)
            pages.append(page_html(pid, side, "a00 ouv", inner, None, ft, tabs))
        elif kind == "bloc":
            b = blocs[n]
            ps_av, lis, ps_ap, seen_li = [], [], [], False
            for k, t in b["items"]:
                if k == "li":
                    lis.append(t); seen_li = True
                else:
                    (ps_ap if seen_li else ps_av).append(t)
            renvoi = ""
            if not APPARIER:
                renvoi = (f'<aside class="bk-sans"><b>Quand il n’y a rien, {n}</b><span>{il(sans[n]["title"])}</span>'
                          f'<span class="bk-sp">page {num}-{page_of[("sans", n)]}</span></aside>')
            inner = (f'<header class="bk-head"><div class="bk-num{" deux" if n > 9 else ""}">{n}</div><div class="bk-tt"><h1>{il(b["title"])}</h1></div>'
                     f'<div class="bk-lieu">{lieu_badge(b["lieu"])}</div></header>'
                     + (f'<div class="bk-intro{" one" if sum(map(len, ps_av)) < 420 else ""}">{paras_html(ps_av)}</div>' if ps_av else "")
                     + gestes_html(lis, "bk")
                     + (f'<div class="bk-outro">{paras_html(ps_ap)}</div>' if ps_ap else "") + renvoi)
            ft = ladder(n, 11, short[n], lk(b["lieu"]), b["lieu"], cls_of=cls_ladder)
            pages.append(page_html(pid, side, f"a00 bloc b{n}", inner, rh, ft, onglet(n)))
        elif kind == "sans":
            s = sans[n]
            ps, lis = [t for k, t in s["items"] if k == "p"], [t for k, t in s["items"] if k == "li"]
            order = [k for k, _ in s["items"]]
            if "p" in order and "li" in order and order.index("p") > order.index("li"):
                bc.WARN.append(f"00 : « sans rien » {n} a un paragraphe après les puces, il passe devant")
            inner = (f'<header class="sr-head"><div class="sr-k">Quand il n’y a rien</div>'
                     f'<div class="sr-t"><span class="sr-n">{n}</span><h2>{il(s["title"])}</h2></div></header>'
                     + (f'<div class="sr-intro">{paras_html(ps)}</div>' if ps else "")
                     + gestes_html(lis, "sr"))
            ft = ladder(n, 11, "Quand il n’y a rien", lk(lieu_of[n]), lieu_of[n], cls_of=cls_ladder)
            pages.append(page_html(pid, side, f"a00 sans b{n}", inner, rh, ft, onglet(n, cls="sr")))
        elif kind == "seuil":
            body = "".join(h for h, _ in bc.render(bc.parse(seuil["lines"])))
            inner = f'<header class="sx-head"><h1>{il(seuil["title"])}</h1></header><div class="sx-body">{body}</div>'
            ft = ladder(0, 11, "Le seuil", "2", "Maison et chalet", cls_of=cls_ladder)
            pages.append(page_html(pid, side, "a00 seuil", inner, rh, ft))
        elif kind == "danger":
            pts, subject = bc.danger_story(danger)
            sub = il(danger["title"])
            inner = (f'<div class="danger full" data-edge="d"><div class="dhead"><svg viewBox="0 0 34 30" aria-hidden="true">'
                     '<path d="M17 1.5 L32.5 28.5 H1.5 Z" fill="#fff"/><path d="M15.2 10 H18.8 L18.1 20.5 H15.9 Z" fill="#9B2C1E"/>'
                     '<rect x="15.4" y="22.3" width="3.2" height="3.2" fill="#9B2C1E"/></svg>'
                     f'<span>Danger — <span class="sj">{sub}</span></span></div>'
                     f'<div class="frame one">{"".join(h for h, _ in pts)}</div></div>')
            ft = ladder(0, 11, "Danger", "2", "Maison et chalet", cls_of=cls_ladder)
            pages.append(page_html(pid, side, "a00 dgr", inner, rh, ft))
        elif kind in ("rien", "subst"):
            with_intro = kind == "rien"
            with_table = (kind == "rien" and APPARIER) or kind == "subst"
            parts = ""
            if with_intro:
                parts += f'<div class="qr-intro">{paras_html(rien_intro)}</div>'
            if with_table and subst:
                h, rows = subst["table"]
                parts += f'<h3 class="sub">{il(subst["title"])}</h3>' + paras_html(subst["intro"], "p0")
                parts += bc.table_html(["|" + "|".join(h) + "|", "|---|"] + ["|" + "|".join(r) + "|" for r in rows], False).replace(
                    '<table class="tspan">', '<table class="tspan subst">')
            head9 = (f'<h2 class="sec s9"><span class="t">{il(rien["title"])}</span></h2>' if with_intro else "")
            inner = f'<div class="s9wrap qr" data-edge="k">{head9}<div class="qr-body">{parts}</div></div>'
            ft = ladder(0, 11, "Quand il n’y a rien", "2", "Maison et chalet", cls_of=cls_ladder)
            pages.append(page_html(pid, side, "a00 rien", inner, rh, ft))

    meta = dict(num=num, title=plain(title), tome=tome, tnum=tn, tfond=bc.TOMES[tn][1], tencre=bc.TOMES[tn][2],
                lieu="Les deux", dsub="", secs={}, apparier=APPARIER)
    js = open(os.path.join(TOOLS, "ancrage-00.js"), encoding="utf-8").read()
    out = entete_html(num, plain(title), "ancrage-00.js", meta) + "\n" + "".join(pages) + "</div>\n"
    out += f'<template id="notes">\n{notes_html()}\n</template>\n' + pied_html(meta, js)
    return ecrire(num, out)


# ================================================================== 00b — acheter par priorité
PALIER_RE = re.compile(r"^Palier\s+(\d)\s+—\s+(.*)$")


def table_achat(head, rows, pal):
    """Item | Quantité | Lieu | Sans ça | Ch.  ->  Lieu (cases) | Item | Quantité | Sans ça | Ch."""
    hl = [h.lower() for h in head]
    try:
        iL = hl.index("lieu"); iI = hl.index("item"); iQ = hl.index("quantité"); iC = hl.index("ch.")
    except ValueError:
        return None
    iS = [j for j in range(len(head)) if j not in (iL, iI, iQ, iC)][0]
    cols = [(iL, "c-lieu", 12.5), (iI, "c-item", 23), (iQ, "c-qte", 17.5), (iS, "c-sans", 40), (iC, "c-ch", 7)]
    cg = "<colgroup>" + "".join(f'<col style="width:{w}%">' for _, _, w in cols) + "</colgroup>"
    th = "".join(f'<th class="{c}">{il(head[j])}</th>' for j, c, _ in cols)
    trs = []
    for r in rows:
        r = (r + [""] * len(head))[:len(head)]
        tds = []
        for j, c, _ in cols:
            v = r[j]
            if c == "c-lieu":
                v = lieu_cases(v)
            elif c == "c-ch":
                v = "".join(f'<span class="gr">{x}</span>' for x in re.findall(r"\d+[a-z]?", v))
            else:
                v = il(v)
            tds.append(f'<td class="{c}">{v}</td>')
        trs.append("<tr>" + "".join(tds) + "</tr>")
    return (f'<table class="tspan achat pal{pal}">{cg}<thead><tr>{th}</tr></thead><tbody>{"".join(trs)}</tbody></table>')


def table_legende(head, rows):
    trs = "".join(f'<tr><td class="c-lieu">{lieu_cases(r[0])}</td><td>{il(r[1])}</td></tr>' for r in rows)
    return (f'<table class="tspan legende"><colgroup><col style="width:17%"><col style="width:83%"></colgroup>'
            f'<thead><tr><th>{il(head[0])}</th><th>{il(head[1])}</th></tr></thead><tbody>{trs}</tbody></table>')


def table_rien(head, rows):
    trs = "".join(f'<tr><td class="c-item">{il(r[0])}</td><td class="c-pal"><span class="pb pal{r[1].strip()}">{r[1].strip()}</span></td>'
                  f'<td>{il(r[2])}</td></tr>' for r in rows)
    return (f'<table class="tspan rien"><colgroup><col style="width:24%"><col style="width:8%"><col style="width:68%"></colgroup>'
            f'<thead><tr>{"".join(f"<th>{il(h)}</th>" for h in head)}</tr></thead><tbody>{trs}</tbody></table>')


def rendu_00b(lines, pal, sec):
    """Blocs d'une section du 00b : le moteur de build_chapitre pour le texte, les tableaux à part."""
    out, run = [], []

    def flush():
        if run:
            out.extend(h for h, _ in bc.render(run))
            run.clear()
    for b in bc.parse(lines):
        if b["k"] == "table":
            flush()
            head, rows = bc.split_row(b["rows"][0]), [bc.split_row(r) for r in b["rows"][2:] if r.strip("| ")]
            hl = [h.lower() for h in head]
            t = None
            if "lieu" in hl and "item" in hl:
                t = table_achat(head, rows, pal or "r")
            elif hl[:1] == ["mention"]:
                t = table_legende(head, rows)
            elif "palier" in hl:
                t = table_rien(head, rows)
            out.append(t or bc.table_html(b["rows"], False))
        elif b["k"] == "h3":
            flush()
            m = re.match(r"^(\d\.[A-Z]|[A-G]\.)\s+(.*)$", b["t"])
            if m:
                out.append(f'<h3 class="sub ss"><span class="ssn pal{pal or "r"}">{m.group(1).rstrip(".")}</span>{il(m.group(2))}</h3>')
            else:
                out.append(f'<h3 class="sub">{il(b["t"])}</h3>')
        else:
            run.append(b)
    flush()
    h = "\n".join(out)
    # « *Ce qu'on perd :* » et parents, au milieu d'un paragraphe : à la ligne, en étiquette
    h = re.sub(r"\s*<em>(Ce qu[’']?(?:on|i)\b[^<]{0,60}?:)</em>", r'<br><em class="perd">\1</em>', h)
    return h


def build_00b():
    num = "00b"
    ch = lire(num)
    tn = bc.tome_de(num)
    tome = f"Tome {tn} · {bc.TOMES[tn][0]}"
    title = ch["title"]
    # ligne de lieu (**Les deux.** …) et le paragraphe qui suit
    pre = blocs_simples(ch["pre"])
    lieu, lieu_txt, intro = "Les deux", "", []
    for k, t in pre:
        m = re.match(r"^\*\*(Maison|Chalet|Les deux)\.?\*\*\.?\s*(.*)$", t)
        if m and not lieu_txt:
            lieu, lieu_txt = m.group(1), m.group(2)
        else:
            intro.append(t)
    story, toc = [], []
    story.append("".join(f'<p class="{"lead0" if i == 0 else ""}">{il(t)}</p>' for i, t in enumerate(intro)))
    for s in ch["secs"]:
        t = s["title"]
        m = PALIER_RE.match(t)
        if m:
            pal = m.group(1)
            key = "p" + pal
            story.append(f'<h2 class="palier pal{pal}" data-sec="{key}"><span class="pn">{pal}</span>'
                         f'<span class="pt2"><small>Palier {pal}</small>{il(m.group(2))}</span></h2>')
            body = rendu_00b(s["lines"], pal, key)
            # le critère reste collé au bandeau du palier
            body = re.sub(r'^<p class="p0 ri">', '<p class="p0 ri crit kh">', body, count=1)
            story.append(body)
            toc.append((key, pal, il(m.group(2))))
        else:
            low = t.lower()
            key = "r" if low.startswith("ce qui remplace") else ("u" if low.startswith("si on n") else "l")
            cls = "sec s9" if key == "r" else "sec"
            story.append(f'<h2 class="{cls}" data-sec="{key}"><span class="t">{il(t)}</span></h2>')
            body = rendu_00b(s["lines"], None, key)
            if key == "l":   # la première phrase, courte, sur toute la largeur plutôt que coupée en deux colonnes
                body = re.sub(r'^<p class="p0 ri">', '<p class="p0 ri span">', body, count=1)
            if key == "u":   # la phrase à retenir, tout en gras : en gros
                body = re.sub(r'^<p class="p0 lab kh"><strong class="runin">(.*?)</strong></p>', r'<p class="une">\1</p>', body, count=1, flags=re.S)
            story.append(body)
            toc.append((key, None, il(t)))
    story_html = "\n".join(story)
    # sommaire de l'ouverture : les paliers portent leur carré, les autres un filet. Le folio porte
    # « 00b-00 » pendant la coulée (ancrage-00b.js l'écrase à la fin) : l'ouverture a déjà sa hauteur
    # finale quand le texte coule dessous, sinon un titre qui passe à deux lignes au dernier moment
    # pousse la fin de la page hors du cadre (au facteur 2, « Les prix » disparaissait de la PNG).
    nw = lambda t: re.sub(r"(\w+(?:-\w+)+)", r'<span class="nw">\1</span>', t)   # « mois-ci » ne se coupe pas au trait
    toc_html = "".join(
        f'<li data-s="{k}" class="{("pal" + p) if p else "hors"}"><span class="n">{p or ""}</span><span class="t">{nw(t)}</span><span class="f">{num}-00</span></li>'
        for k, p, t in toc)
    lieu_opts = "".join(f'<span{" class=\"on\"" if o == lieu else ""}>{o}</span>' for o in ("Maison", "Chalet", "Les deux"))
    opening = (f'<header class="open"><div class="open-top"><span>{tome}</span><span>Chapitre</span></div>'
               f'<div class="open-title"><div class="num">{num}</div><h1>{il(title)}</h1></div>'
               f'<div class="open-meta"><div class="lieu"><b>Lieu</b><div class="opts">{lieu_opts}</div></div>'
               f'<ol class="toc tocb">{toc_html}</ol></div>'
               + (f'<p class="lieu-note">{il(lieu_txt)}</p>' if lieu_txt else "") + "</header>")
    meta = dict(num=num, title=plain(title), tome=tome, tnum=tn, tfond=bc.TOMES[tn][1], tencre=bc.TOMES[tn][2],
                lieu=lieu, dsub="", secs={}, tabtop=TAB_TOP, tabpas=TAB_PAS,
                sections={k: plain(t) for k, p, t in toc})
    engine = open(os.path.join(TOOLS, "chapitre.js"), encoding="utf-8").read()
    fin = open(os.path.join(TOOLS, "ancrage-00b.js"), encoding="utf-8").read()
    out = entete_html(num, plain(title), "ancrage-00b.js", meta) + "</div>\n"
    out += f'<template id="open">{opening}</template>\n'
    out += f'<template id="story-main">\n{story_html}\n</template>\n<template id="story-d">\n</template>\n<template id="story-e">\n</template>\n'
    out += f'<template id="notes">\n{notes_html()}\n</template>\n'
    # ancrage-00b.js vient APRÈS chapitre.js dans la même fonction : ses déclarations de fonctions
    # remplacent celles du moteur (finishPages, checks), sans toucher au fichier du moteur.
    out += pied_html(meta, engine + "\n" + fin)
    return ecrire(num, out)


def build(num, appelant=None):
    """Appelé par build_chapitre.build(num) ; appelant = ce module-là (OUTD, WARN du même objet, même
    quand build_chapitre.py tourne comme __main__)."""
    global bc
    if appelant is not None:
        bc = appelant
    bc.WARN.clear()
    return build_00() if num == "00" else build_00b()
