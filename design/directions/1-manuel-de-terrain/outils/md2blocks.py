# -*- coding: utf-8 -*-
"""Petit convertisseur Markdown -> blocs HTML pour la maquette (sous-ensemble du livre)."""
import re, html

NNBSP = " "   # espace fine insecable
NBSP = " "

def typo(s):
    # guillemets : espace fine a l'interieur
    s = re.sub(r"«\s*", "«" + NNBSP, s)
    s = re.sub(r"\s*»", NNBSP + "»", s)
    # ; : ! ? precedes d'une fine insecable
    s = re.sub(r"[   ]*([;:!?])(?=[\s<*»]|$)", NNBSP + r"\1", s)
    # nombre + unite
    s = re.sub(r"(\d) (°C|%|kg|g|m|mm|cm|km|h|min|L|pi|po|cc|ppm)(?!\w)", r"\1" + NNBSP + r"\2", s)
    s = re.sub(r"(\d) (jours?|heures?|minutes?|semaines?|mois|fois|ans?)\b", r"\1" + NBSP + r"\2", s)
    s = re.sub(r"(?<=[\s(  ])-(?=\d)", "−", s)
    s = re.sub(r"(\d) (°C)", r"\1" + NNBSP + r"\2", s)
    s = re.sub(r"(-?\d) à (-?\d)", r"\1" + NBSP + "à" + NBSP + r"\2", s)
    s = s.replace(" — ", NBSP + "— ")
    s = s.replace("'", "’")
    return s

# ---------- notes de bas de page ----------
# Le Markdown porte « mot[^1] » et, plus bas, « [^1]: texte » (suite possible sur les lignes
# suivantes). Les notes sont renumérotées par chapitre, dans l'ordre du premier appel.
NOTES = {"ch": None, "num": {}, "defs": {}}
ALL_NOTES = {}   # "65-1" -> html de la note, pour tous les chapitres chargés

def load_notes(md, ch):
    """Retire les définitions de notes du Markdown et fixe le chapitre courant."""
    defs, out, cur = {}, [], None
    for l in md.splitlines():
        m = re.match(r"^\[\^([^\]]+)\]:\s*(.*)$", l)
        if m:
            cur = m.group(1); defs[cur] = [m.group(2)]; continue
        if cur is not None:
            if l.strip() and not re.match(r"^(#|\||>|-{3}|\d+\. |- )", l):
                defs[cur].append(l.strip()); continue
            cur = None
        out.append(l)
    body = "\n".join(out)
    num = {}
    for lab in re.findall(r"\[\^([^\]]+)\]", body):
        if lab not in num:
            num[lab] = len(num) + 1
    NOTES.update(ch=ch, num=num, defs={k: " ".join(v) for k, v in defs.items()})
    for lab, n in num.items():
        if lab in NOTES["defs"]:
            txt = pictos(_inline(NOTES["defs"][lab]))
            ALL_NOTES[f"{ch}-{n}"] = f'<p class="fn" data-fn="{ch}-{n}"><span class="fnn">{n}</span>{txt}</p>'
    return body

def notes_html():
    return "\n".join(ALL_NOTES.values())

def _call(m):
    n = NOTES["num"].get(m.group(1))
    if n is None:
        return ""
    return f'<sup class="fnr" data-fn="{NOTES["ch"]}-{n}">{n}</sup>'

def inline(s):
    s = re.sub(r"\[\^([^\]]+)\]", "\x00FN\\1\x00", s)
    s = _inline(s)
    return re.sub("\x00FN([^\x00]+)\x00", _call, s)

# ---------- pictogrammes de danger ----------
# « {!co} » dans le Markdown : le pictogramme du danger, en ligne, au début de la phrase de l'étape où le danger se
# présente (JP, 18 octobre 2026 : la section Danger sort ; le danger est expliqué une fois dans les pages des
# dangers du tome). Les SVG sont dans images/pictos-dangers/<id>.svg ; un id sans fichier imprime un carré rouge
# marqué de son id, pour qu'il se voie à l'épreuve.
import os
PICTOS_DIR = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "..", "images", "pictos-dangers"))
_PICTOS = {}

def picto_svg(pid, cls="picto"):
    if pid not in _PICTOS:
        f = os.path.join(PICTOS_DIR, pid + ".svg")
        if os.path.exists(f):
            t = re.sub(r"<\?xml[^>]*>\s*", "", open(f, encoding="utf-8").read()).strip()
            _PICTOS[pid] = re.sub(r"<!--.*?-->", "", t, flags=re.S)
        else:
            _PICTOS[pid] = ('<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="14" fill="#9B2C1E"/>'
                            f'<text x="50" y="58" text-anchor="middle" font-size="22" fill="#fff">{pid}</text></svg>')
    return re.sub(r"^<svg\b", f'<svg class="{cls}" data-picto="{pid}" role="img" aria-label="{pid}"', _PICTOS[pid], count=1)

PICTO_RX = re.compile(r"\{!([a-z][a-z-]*)\}")

def _inline(s):
    s = PICTO_RX.sub(lambda m: "\x01" + m.group(1) + "\x01", s)
    s = html.escape(s, quote=False)
    s = s.replace("’", "’")
    # [À VÉRIFIER] entre backticks ou nu
    s = re.sub(r"`\[À VÉRIFIER([^\]]*)\]`", lambda m: '<span class="av">[À&#8239;VÉRIFIER' + m.group(1) + ']</span>', s)
    s = re.sub(r"(?<![\">])\[À VÉRIFIER([^\]]*)\]", lambda m: '<span class="av">[À&#8239;VÉRIFIER' + m.group(1) + ']</span>', s)
    s = s.replace("`", "")
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", s)
    # renvois de chapitre et de section
    s = re.sub(r"\b([Cc]h\. \d+[a-z]?(?:, \d+[a-z]?)*)", lambda m: '<span class="ref">' + m.group(1).replace(" ", NBSP) + "</span>", s)
    s = re.sub(r"(§\s?\d+)", lambda m: '<span class="ref">' + m.group(1).replace(" ", NBSP) + "</span>", s)
    return typo(s)

def pictos(s):
    """Pose les pictogrammes laissés en jalon par _inline. À appeler en dernier (build_chapitre.il) : les retouches
    typographiques qui suivent _inline abîmeraient les chiffres des tracés SVG. Le pictogramme colle au mot qui le suit
    (espace insécable) : il ne reste jamais seul au bout d'une ligne."""
    return re.sub("\x01([a-z-]+)\x01[ \u00a0\u202f]?", lambda m: picto_svg(m.group(1)) + NBSP, s)

def join_lines(lines):
    return " ".join(l.strip() for l in lines if l.strip())

def section(md, start_pat, end_pat=None):
    lines = md.splitlines()
    out, on = [], False
    for l in lines:
        if not on and re.match(start_pat, l):
            on = True
            continue
        if on and end_pat and re.match(end_pat, l):
            break
        if on:
            out.append(l)
    return out

def paragraphs(lines):
    """Regroupe en blocs : ('p', txt) ('li', txt) ('step', n, txt) ('h3', txt) ('sub', txt)."""
    blocks, cur = [], None
    def flush():
        nonlocal cur
        if cur:
            kind, data = cur[0], cur[1:]
            if kind == "step":
                blocks.append(("step", data[0], join_lines(data[1])))
            elif kind == "p" and re.match(r"^\*\*(\d+)\.\s+", join_lines(data[0])):
                # étape écrite « **8. Titre.** suite » : même rendu qu'une liste numérotée
                m = re.match(r"^\*\*(\d+)\.\s+(.*)$", join_lines(data[0]))
                blocks.append(("step", m.group(1), "**" + m.group(2)))
            else:
                blocks.append((kind, join_lines(data[0])))
        cur = None
    for l in lines:
        if not l.strip():
            flush(); continue
        if l.startswith("---"):
            flush(); continue
        m = re.match(r"^### (.*)", l)
        if m:
            flush(); blocks.append(("h3", m.group(1).strip())); continue
        m = re.match(r"^(\d+)\. (.*)", l)
        if m:
            flush(); cur = ["step", m.group(1), [m.group(2)]]; continue
        m = re.match(r"^- (.*)", l)
        if m:
            flush(); cur = ["li", [m.group(1)]]; continue
        m = re.match(r"^\*\*(C'est .*)\*\*\s*$", l)
        if m:
            flush(); blocks.append(("sub", m.group(1))); continue
        if cur is None:
            cur = ["p", [l]]
        else:
            if cur[0] == "step":
                cur[2].append(l)
            else:
                cur[1].append(l)
    flush()
    return blocks

def render(blocks, first_noindent=True):
    out = []
    prev = None
    for b in blocks:
        k = b[0]
        if k == "h3":
            t = inline(b[1])
            out.append(f'<h3 class="sub">{t}</h3>')
        elif k == "sub":
            out.append(f'<h4 class="choix">{inline(b[1])}</h4>')
        elif k == "li":
            out.append(f'<p class="li">{inline(b[1])}</p>')
        elif k == "step":
            out.append(f'<p class="step"><span class="sn">{b[1]}</span>{inline(b[2])}</p>')
        else:
            txt = inline(b[1])
            cls = "p0" if prev in (None, "h3", "sub", "h2") else ""
            # paragraphe a amorce en gras (variante d'urgence) : amorce en sans etroit
            if b[1].startswith("**"):
                txt = re.sub(r"^<strong>(.+?)</strong>", r'<strong class="runin">\1</strong>', txt)
                cls = "p0 ri"
            out.append(f'<p class="{cls}">{txt}</p>' if cls else f"<p>{txt}</p>")
        prev = k
    return "\n".join(out)

def table(lines):
    rows = [l for l in lines if l.startswith("|")]
    head = [c.strip() for c in rows[0].strip("|").split("|")]
    body = []
    for r in rows[2:]:
        body.append([c.strip() for c in r.strip().strip("|").split("|")])
    return head, body
