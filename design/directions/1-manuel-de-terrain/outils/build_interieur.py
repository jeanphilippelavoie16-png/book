# -*- coding: utf-8 -*-
import re, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from md2blocks import *

def _racine_livre():
    # Windows (le PC de JP) : le dossier d'origine ; ailleurs (session dans le nuage) : le dépôt qui contient ce fichier
    if os.name == "nt":
        return r"C:\Users\jeanp\New folder"
    d = os.path.dirname(os.path.abspath(__file__))
    while d != os.path.dirname(d) and not os.path.exists(os.path.join(d, "CLAUDE.md")):
        d = os.path.dirname(d)
    return d
ROOT = _racine_livre()
OUT = os.path.join(ROOT, r"design\directions\1-manuel-de-terrain")
md = open(os.path.join(ROOT, r"chapitres\65-fumage-a-froid.md"), encoding="utf-8").read()
cp = open(os.path.join(ROOT, r"chapitres\00-le-chapitre-principal.md"), encoding="utf-8").read()
md73 = open(os.path.join(ROOT, r"chapitres\73-conserves-et-marinades.md"), encoding="utf-8").read()
md = load_notes(md, "65")

# ---------- histoire A : sections 1 a 4 ----------
s1 = paragraphs(section(md, r"^## 1\.", r"^## 2\."))
s2 = paragraphs(section(md, r"^## 2\.", r"^## 3\."))
s3 = paragraphs(section(md, r"^## 3\.", r"^## 4\."))
s4lines = section(md, r"^## 4\.", r"^## 5\.")
head, body = table(s4lines)
after_table = paragraphs([l for l in s4lines if not l.startswith("|")])

def h2(n, title, extra=""):
    return (f'<h2 class="sec{extra}" data-n="{n}"><span class="n">{n}</span>'
            f'<span class="t">{title}</span></h2>')

def neg(cell):
    c = cell.strip()
    m = re.match(r"^\*\*(Non|NON)\*\*\s*(.*)$", c)
    if m:
        rest = inline(m.group(2)) if m.group(2) else ""
        return f'<span class="non">NON</span>' + (f' <span class="negx">{rest}</span>' if rest else "")
    m = re.match(r"^Oui(.*)$", c)
    if m:
        return 'Oui' + (f'<span class="negx">{inline(m.group(1))}</span>' if m.group(1) else "")
    return inline(c)

rows = []
for r in body:
    item, qte, sub, ng = (r + ["", "", "", ""])[:4]
    rows.append(f'<tr><td class="c-item">{inline(item)}</td><td class="c-qte">{inline(qte)}</td>'
                f'<td class="c-sub">{inline(sub)}</td><td class="c-neg">{neg(ng)}</td></tr>')
tbl = ('<table class="t-mat"><colgroup><col style="width:25%"><col style="width:11%">'
       '<col style="width:48%"><col style="width:16%"></colgroup>'
       '<thead><tr><th>Item</th><th>Quantité</th><th>Substitution possible</th><th>Négociable</th></tr></thead>'
       '<tbody>' + "".join(rows) + '</tbody></table>')

lead = inline(join_lines([b[1] for b in s1]))
storyA = "\n".join([
    h2(1, "En une ligne"),
    f'<p class="lead">{lead}</p>',
    h2(2, "Quand l’utiliser"),
    render(s2),
    h2(3, "Pourquoi ça marche"),
    render(s3),
    h2(4, "Matériel"),
    tbl,
    render(after_table),
])

# ---------- histoire B : procedure B, C, D ----------
s5 = section(md, r"^### B — Monter le fumoir", r"^### E —")
storyB = render(paragraphs(["### B — Monter le fumoir"] + s5))

# ---------- histoire D : encadre DANGER ----------
dlines = [re.sub(r"^>\s?", "", l) for l in section(md, r"^## 8\.", r"^## 9\.") if l.startswith(">")]
dtitle = ""
paras, cur = [], []
for l in dlines:
    m = re.match(r"^### ⚠?\s*(.*)", l)
    if m:
        dtitle = m.group(1).strip(); continue
    if not l.strip():
        if cur: paras.append(join_lines(cur)); cur = []
        continue
    cur.append(l)
if cur: paras.append(join_lines(cur))
dblocks = []
for p in paras:
    m = re.match(r"^\*\*(\d+)\.\s*(.+?)\*\*\s*(.*)$", p)
    if m:
        dblocks.append(f'<p class="pt"><span class="pn">{m.group(1)}</span>'
                       f'<strong class="plead">{inline(m.group(2))}</strong> {inline(m.group(3))}</p>')
    else:
        dblocks.append(f'<p class="pt cont0">{inline(p)}</p>')
storyD = "\n".join(dblocks)
dsubject = re.sub(r"^DANGER\s*—\s*", "", dtitle)

# ---------- histoire E : variante d'urgence ----------
s9 = section(md, r"^## 9\.", None)
storyE = render(paragraphs(s9))

# ---------- chapitre principal : bloc 5 ----------
cp = load_notes(cp, "00")
b5 = section(cp, r"^## 5\. Le monoxyde", r"^---")
b5p = paragraphs(b5)
intro = [b for b in b5p if b[0] == "p"]
points = [b for b in b5p if b[0] == "li"]
def split_cmd(txt):
    m = re.match(r"^\*\*(.+?)\*\*\s*(.*)$", txt)
    if not m:
        return txt, ""
    cmd, rest = m.group(1), m.group(2)
    if rest.startswith("."):
        return cmd + ".", rest[1:].strip()
    if rest.startswith(":"):
        # la suite courte fait partie de la consigne
        tail = rest[1:].strip()
        return cmd + " : " + tail, ""
    return cmd, rest
cp_points = []
for p in points:
    cmd, rest = split_cmd(p[1])
    refs = re.findall(r"\(([Cc]h\. [^)]*)\)", cmd + " " + rest)
    rest2 = re.sub(r"\s*\(([Cc]h\. [^)]*)\)", "", rest)
    cmd = re.sub(r"\s*\(([Cc]h\. [^)]*)\)", "", cmd)
    refs = [x.strip() for r in refs for x in re.split(r",\s*", r)]
    refs = [x if x.lower().startswith("ch.") else "ch. " + x for x in refs]
    refs_html = "".join(f'<span>{inline(r).replace("<span class=\"ref\">", "").replace("</span>", "")}</span>' for r in refs)
    # renvois ecrits en toutes lettres (ex. « (ch. 2) » deja retires) ; on garde aussi « ch. 2 » dans le fil
    cp_points.append(f'<li><div class="cmd">{inline(cmd)}</div>' + (f'<div class="exp">{inline(rest2)}</div>' if rest2 else '') +
                     f'<div class="refs">{refs_html}</div></li>')
cp_intro = "\n".join(f'<p>{inline(b[1])}</p>' for b in intro)
b5sans = paragraphs(section(cp, r"^### 5 · Le monoxyde, sans avertisseur", r"^###|^---"))
sans_intro = inline(b5sans[0][1])
sans_pts = "".join(f'<li>{inline(b[1])}</li>' for b in b5sans if b[0] == "li")

# ---------- histoire F : ch. 73, procédure 5.2 et 5.3 (page à note de bas de page) ----------
md73 = load_notes(md73, "73")
storyF = render(paragraphs(section(md73, r"^### 5\.2", r"^## 6\.")))

tpl = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "interieur.tpl.html"), encoding="utf-8").read()
out = (tpl.replace("{{STORY_A}}", storyA)
          .replace("{{STORY_B}}", storyB)
          .replace("{{STORY_D}}", storyD)
          .replace("{{DSUBJECT}}", inline(dsubject))
          .replace("{{STORY_E}}", storyE)
          .replace("{{STORY_F}}", storyF)
          .replace("{{NOTES}}", notes_html())
          .replace("{{CP_INTRO}}", cp_intro)
          .replace("{{CP_POINTS}}", "\n".join(cp_points))
          .replace("{{CP_SANS_INTRO}}", sans_intro)
          .replace("{{CP_SANS_POINTS}}", sans_pts))
open(os.path.join(OUT, "interieur.html"), "w", encoding="utf-8").write(out)
# controle : aucune attribution
for org in ["MAPAQ", "ACIA", "Santé Canada", "INSPQ", "CNESST", "gouvernement du Québec"]:
    if org in out:
        print("ATTRIBUTION RESTANTE :", org)
print("ok", len(out))
