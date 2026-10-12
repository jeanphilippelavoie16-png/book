# -*- coding: utf-8 -*-
"""Compose couvertures.html (direction 2) : quatre premières de couverture et une
couverture complète du tome 4. Le dessin de chaque couverture est tiré d'une planche
du livre : on n'en garde que le trait (ni renvois, ni légende, ni encadré), recoloré
dans l'encre de la couverture.

    python source/build_couvertures.py
"""
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path

ICI = Path(__file__).resolve().parent
DIR = ICI.parent
RACINE = DIR.parent.parent.parent
IMG = RACINE / "images"
SVGNS = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVGNS)

# Hypothèse de tranche : 440 pages = 220 feuillets de papier standard Blurb (~0,1 mm)
# ≈ 22 mm, plus ~3 mm de carton et de charnière pour la couverture rigide ImageWrap.
TRANCHE_PO = 1.00

TOMES = [
    dict(n=1, titre="Tenir", lignes=["Tenir"], ch="Chapitres 1 à 23", bg="#22364A", ink="#F1E9DA", line="#E4DAC6",
         planche="planche-17-01-arc-feu.svg", vue="monte", drop_small=True),
    dict(n=2, titre="Le corps", lignes=["Le corps"], ch="Chapitres 24 à 33", bg="#7E5230", ink="#F6EEDF", line="#F1E6D2",
         planche="planche-24-04-bouillir-aux-pierres-sans.svg", vue="coupe", drop_small=True),
    dict(n=3, titre="Prélever", lignes=["Prélever"], ch="Chapitres 34 à 60", bg="#2E4636", ink="#F1E9DA", line="#E4DAC6",
         planche="planche-55-03-eperlan-vide-seul-geste.svg", vue="couper", drop_small=True),
    dict(n=4, titre="Conserver et réparer", lignes=["Conserver", "et réparer"], ch="Chapitres 61 à 89", bg="#3A3633",
         ink="#F1E9DA", line="#E4DAC6", planche="planche-65-01-fumoir-froid.svg", vue=None, drop_small=False),
]

NOIRS = {"#1a1a1a", "#000", "#000000", "black"}
BLANCS = {"#fff", "#ffffff", "white"}


def tag(e):
    return e.tag.split("}")[-1]


def dessin(t, pre):
    """Retourne le trait d'une planche, sans texte ni renvoi, recoloré."""
    tree = ET.parse(IMG / t["planche"])
    root = tree.getroot()
    defs = root.find(f"{{{SVGNS}}}defs")
    if t["vue"]:
        cible = next(g for g in root.iter(f"{{{SVGNS}}}g") if g.get("data-vue") == t["vue"])
    else:
        cible = root

    def a_couper(e):
        n = tag(e)
        if n in ("text", "title", "desc", "tspan"):
            return True
        if (e.get("stroke-dasharray") or "").strip() == "3 2.5":          # lignes de rappel
            return True
        if n == "circle":
            r = float(e.get("r", "0"))
            if 8.8 <= r <= 9.2:                                           # pastilles de renvoi
                return True
            if t["drop_small"] and abs(r - 1.8) < 0.05:                   # points d'attache des rappels
                return True
        if "9b2c1e" in (e.get("stroke", "") + e.get("fill", "")).lower():  # encadré danger
            return True
        if n == "rect" and (e.get("fill", "").lower() in BLANCS) and float(e.get("width", "0")) >= 330:
            return True                                                   # fond blanc de la planche
        return False

    def nettoyer(parent):
        for e in list(parent):
            if a_couper(e):
                parent.remove(e)
            else:
                nettoyer(e)

    nettoyer(cible)
    if defs is not None and cible is not root:
        nettoyer(defs)
    # Planche 65-01 : le pied (légende, encadré) commence sous y = 520 ; on le laisse hors cadre par le viewBox.

    def recolorer(e):
        for att in ("stroke", "fill"):
            v = (e.get(att) or "").lower()
            if v in NOIRS:
                e.set(att, t["line"])
            elif v in BLANCS:
                e.set(att, t["bg"])
        sw = e.get("stroke-width")
        if sw:
            e.set("stroke-width", f"{float(sw) * 1.3:.2f}")
        for c in e:
            recolorer(c)

    recolorer(cible)
    if defs is not None:
        recolorer(defs)
    xml = ""
    if defs is not None:
        xml += ET.tostring(defs, encoding="unicode")
    if cible is root:
        xml += "".join(ET.tostring(c, encoding="unicode") for c in root if tag(c) not in ("defs", "title", "desc"))
    else:
        xml += ET.tostring(cible, encoding="unicode")
    # identifiants propres à chaque exemplaire
    ids = set(re.findall(r'id="([^"]+)"', xml))
    for i in sorted(ids, key=len, reverse=True):
        xml = re.sub(rf'id="{re.escape(i)}"', f'id="{pre}-{i}"', xml)
        xml = xml.replace(f"url(#{i})", f"url(#{pre}-{i})").replace(f'href="#{i}"', f'href="#{pre}-{i}"')
    xml = re.sub(r"\sxmlns(:\w+)?=\"[^\"]+\"", "", xml)
    xml = re.sub(r"ns\d+:", "", xml)
    clip = ' data-ymax="520"' if t["planche"].startswith("planche-65-01") else ""
    return f'<svg class="drw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 826" preserveAspectRatio="xMidYMax meet"{clip}><g class="keep">{xml}</g></svg>'


def premiere(t, pre, cls=""):
    titre = "".join(f"<span>{l}</span>" for l in t["lignes"])
    return f'''<div class="front {cls}" style="--bg:{t['bg']};--ink:{t['ink']};--line:{t['line']}">
  <div class="f-serie">Le Grand Livre du Chalet</div>
  <div class="f-tome">Tome {t['n']}</div>
  <h1 class="f-titre n{len(t["lignes"])}">{titre}</h1>
  <div class="f-ch">{t['ch']}</div>
  <div class="f-img">{dessin(t, pre)}</div>
  <div class="f-pied">Conservation, subsistance et autonomie <span>·</span> Côte-Nord</div>
</div>'''


# Chapitres du tome 4, repris des fichiers
CH4 = []
for f in sorted((RACINE / "chapitres").glob("*.md")):
    m = re.match(r"#\s*Chapitre\s+(\d+)\s+—\s+(.+)", f.read_text(encoding="utf-8").splitlines()[0])
    if m and 61 <= int(m.group(1)) <= 89:
        CH4.append((int(m.group(1)), m.group(2).strip()))

t4 = TOMES[3]
liste = "".join(f'<li><b>{n}</b> {html_t}</li>' for n, html_t in CH4)
serie = "".join(
    f'<li class="{"on" if t["n"] == 4 else ""}"><i style="background:{t["bg"]}"></i><b>{t["n"]}</b> {t["titre"]}</li>' for t in TOMES)

quatrieme = f'''<div class="back" style="--bg:{t4['bg']};--ink:{t4['ink']};--line:{t4['line']}">
  <div class="b-serie">Le Grand Livre du Chalet <span>·</span> Tome 4</div>
  <div class="b-titre">Conserver et réparer</div>
  <div class="b-ch">Chapitres 61 à 89</div>
  <ol class="b-liste">{liste}</ol>
  <p class="b-credo">Le test de chaque page&#8239;: il n’y a personne à appeler.</p>
  <ol class="b-serie4">{serie}</ol>
  <div class="b-reserve">zone réservée Blurb [À VÉRIFIER]</div>
</div>'''

dos = f'''<div class="spine" style="--bg:{t4['bg']};--ink:{t4['ink']}">
  <div class="s-num">4</div>
  <div class="s-txt"><span class="s-titre">Conserver et réparer</span><span class="s-serie">Le Grand Livre du Chalet</span></div>
</div>'''

tablette = "".join(
    f'''<div class="spine sh" style="--bg:{t['bg']};--ink:{t['ink']}"><div class="s-num">{t['n']}</div>
<div class="s-txt"><span class="s-titre">{t['titre']}</span><span class="s-serie">Le Grand Livre du Chalet</span></div></div>''' for t in TOMES)

fronts = "\n".join(f'<section class="sheet-front" style="--sbg:{t['bg']}">{premiere(t, f"t{t['n']}")}</section>' for t in TOMES)
wrap = f'''<section class="sheet-wrap" style="--tr:{TRANCHE_PO}in; --bg:{t4['bg']}">
  <div class="wrap-bg"></div>
  <div class="panel p-back">{quatrieme}</div>
  <div class="panel p-spine">{dos}</div>
  <div class="panel p-front">{premiere(t4, "w4", "in-wrap")}</div>
  <div class="guides">
    <i class="g-trim"></i><i class="g-fold g1"></i><i class="g-fold g2"></i>
    <i class="g-safe gs1"></i><i class="g-safe gs2"></i>
    <span class="g-lab l1">quatrième · 8,25 po</span><span class="g-lab l2">tranche · {str(TRANCHE_PO).replace('.', ',')} po</span><span class="g-lab l3">première · 8,25 po</span>
  </div>
</section>'''
shelf = f'<section class="sheet-shelf" style="--tr:{TRANCHE_PO}in"><div class="shelf">{tablette}</div><div class="shelf-lab">Les quatre dos sur la tablette — tranche supposée de {str(TRANCHE_PO).replace(".", ",")} po pour 440 pages</div></section>'

gab = (ICI / "couvertures.gabarit.html").read_text(encoding="utf-8")
gab = gab.replace("/*HACHURES*/", (ICI / "hachures.js").read_text(encoding="utf-8"))
out = gab.replace("<!--FRONTS-->", fronts).replace("<!--WRAP-->", wrap).replace("<!--SHELF-->", shelf)
(DIR / "couvertures.html").write_text(out, encoding="utf-8")
print("couvertures.html écrit,", len(out), "octets")
