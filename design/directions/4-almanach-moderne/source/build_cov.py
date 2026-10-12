# -*- coding: utf-8 -*-
# Construit design/directions/4-almanach-moderne/couvertures.html
import re, pathlib
IMG = pathlib.Path(r"C:\Users\jeanp\New folder\images")
OUT = pathlib.Path(r"C:\Users\jeanp\New folder\design\directions\4-almanach-moderne\couvertures.html")
NN = "\u202f"

PAPIER = "#F2ECDF"   # étiquette
ENCRE = "#1E1C19"    # texte de l'étiquette

TOMES = [
 dict(k="t1", rn="I",   titre="Tenir",               lignes=["Tenir"],              ch="1 à 23",  c="#22374C",
      desc="Rester ou partir · le froid · l’eau · le feu · la lumière · le groupe",
      svg="planche-13-01-trois-temps-eau.svg", valide=True),
 dict(k="t2", rn="II",  titre="Le corps",            lignes=["Le corps"],           ch="24 à 33", c="#876539",
      desc="Manger l’hiver · soigner · l’hygiène · la pharmacie · le moral",
      svg="planche-24-04-bouillir-aux-pierres-sans.svg", valide=False),
 dict(k="t3", rn="III", titre="Prélever",            lignes=["Prélever"],           ch="34 à 60", c="#2E4636",
      desc="Le gros gibier · le petit gibier · le poisson · la cueillette",
      svg="planche-44-09-collet-ressort-son-declencheur.svg", valide=False, drop='declencheur'),
 dict(k="t4", rn="IV",  titre="Conserver et réparer", lignes=["Conserver", "et réparer"], ch="61 à 89", c="#4A4642",
      desc="Le sel · la fumée · le froid · le jardin · le cuir · le métal",
      svg="planche-65-01-fumoir-froid.svg", valide=True),
]

T4_CHAP = ["Pourquoi la viande pourrit","Le sel","Salaison à sec","Saumure","Fumage à froid","Fumage à chaud et séchage",
 "Pemmican et graisses","Froid naturel","Un congélateur plein qui dégèle","Traiter le poisson à la sortie de l’eau",
 "Saler et sécher la truite","Fumer le poisson","Conserves et marinades","Jardin nordique","Semences","Caveau à légumes",
 "Fermentation","Petit élevage","De la peau au cuir","Babiche, tendons, cordage","Coudre et chausser","Affûter, limer, aiguiser",
 "Scie à chaîne et petits moteurs","Souder, braser, réparer le métal","Le stock de pièces et de consommables",
 "Leviers, poulies, treuils","Assemblages bois-bois","Trempe et travail du métal à chaud","Savon et chandelles"]

def art(t, uid):
    s = (IMG / t["svg"]).read_text(encoding="utf-8")
    body = s[s.index(">", s.index("<svg")) + 1: s.rindex("</svg>")]
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    body = re.sub(r"<title>.*?</title>|<desc>.*?</desc>", "", body, flags=re.S)
    if t.get("drop"):
        body = re.sub(r'<g [^>]*data-vue="%s"[^>]*>.*?</g>' % t["drop"], "", body, flags=re.S)
    body = re.sub(r"<text\b.*?</text>", "", body, flags=re.S)
    body = re.sub(r'<rect x="0" y="0" width="680" height="\d+" fill="#FFFFFF"/>', "", body)
    body = re.sub(r'<circle[^>]*\br="9"[^>]*/>', "", body)
    body = re.sub(r'<(line|path)[^>]*stroke-dasharray="3 2\.5"[^>]*/>', "", body)
    body = re.sub(r'<[^>]*#9B2C1E[^>]*/>', "", body)
    body = re.sub(r'<(line|path)[^>]*stroke="#FFFFFF" stroke-width="3"[^>]*/>', "", body)          # halos des renvois
    body = re.sub(r'<circle[^>]*r="1\.8" fill="#1A1A1A" stroke="#FFFFFF"[^>]*/>', "", body)         # points des renvois
    body = re.sub(r'stroke-width="([\d.]+)"', lambda m: 'stroke-width="%g"' % round(float(m.group(1)) * 1.25, 2), body)
    body = re.sub(r'\bid="([\w-]+)"', lambda m: f'id="{uid}-{m.group(1)}"', body)
    body = re.sub(r'url\(#([\w-]+)\)', lambda m: f'url(#{uid}-{m.group(1)})', body)
    body = re.sub(r'href="#([\w-]+)"', lambda m: f'href="#{uid}-{m.group(1)}"', body)
    body = body.replace("#1A1A1A", t["c"]).replace("#FFFFFF", PAPIER).replace('"#fff"', f'"{PAPIER}"')
    return f'<svg class="art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 826" preserveAspectRatio="xMidYMid meet">{body}</svg>'

def front_panel(t, uid):
    titre = "".join(f"<span>{l}</span>" for l in t["lignes"])
    return f'''<div class="panel"><div class="pin">
  <div class="series">Le Grand Livre du Chalet</div>
  <div class="tome"><span class="r"></span><span class="rn">{t["rn"]}</span><span class="r"></span></div>
  <div class="tomelab">Tome {t["rn"].lower()}</div>
  <h1 class="ti n{len(t["lignes"])}">{titre}</h1>
  <div class="desc">{t["desc"]}</div>
  <div class="vig">{art(t, uid)}</div>
  <div class="foot"><div class="chap">Chapitres {t["ch"]}</div><div class="sub">Conservation, subsistance et autonomie sur la Côte-Nord</div></div>
</div></div>'''

def spine(t):
    return f'''<div class="spine" style="--c:{t["c"]}">
  <div class="slab"><div class="st">Tome</div><div class="srn">{t["rn"]}</div></div>
  <div class="stitle"><span class="a">{t["titre"]}</span><span class="b">Le Grand Livre du Chalet</span></div>
  <div class="sfoot">{t["ch"].replace(" à ", "–")}</div>
</div>'''

def back_panel(t):
    half = (len(T4_CHAP) + 1) // 2
    li = lambda i, n: f'<li><span class="n">{61+i}</span><span class="t">{n}</span></li>'
    colA = "".join(li(i, n) for i, n in enumerate(T4_CHAP[:half]))
    colB = "".join(li(i + half, n) for i, n in enumerate(T4_CHAP[half:]))
    serie = " ".join(f'<span class="{"on" if x["k"]==t["k"] else ""}"><b>{x["rn"]}</b>{x["titre"]}</span>' for x in TOMES)
    return f'''<div class="panel back"><div class="pin">
  <div class="series">Le Grand Livre du Chalet</div>
  <div class="btitle">Tome {t["rn"]} · {t["titre"]}</div>
  <div class="bhead">Ce que contient ce tome</div>
  <div class="toc"><ol>{colA}</ol><ol>{colB}</ol></div>
  <div class="motto">Le test de chaque page{NN}: il n’y a personne à appeler.</div>
  <div class="bnote">Pas d’entrepreneur, pas de concession, pas de quincaillerie ouverte, pas de pièce en commande, pas d’inspecteur.</div>
  <div class="serie">{serie}</div>
</div></div>'''

fronts = "".join(f'<section class="cv front" id="f-{t["k"]}" style="--c:{t["c"]}">{front_panel(t, "a"+t["k"])}</section>' for t in TOMES)
t4 = TOMES[3]
def wrap(guides):
    g = ""
    if guides:
        g = '''<div class="guides">
  <div class="gl v" style="left:0.75in"></div><div class="gl v" style="left:9in"></div><div class="gl v" style="left:10in"></div><div class="gl v" style="left:18.25in"></div>
  <div class="gl h" style="top:0.75in"></div><div class="gl h" style="top:11in"></div>
  <div class="gs" style="left:1.75in;top:1.75in;width:6.25in;height:8.25in"></div>
  <div class="gs" style="left:11in;top:1.75in;width:6.25in;height:8.25in"></div>
  <div class="gh" style="left:8.6in"></div><div class="gh" style="left:10in"></div>
  <div class="gt" style="left:0.8in;top:0.3in">rabat ImageWrap : 0,75 po supposé, à remplacer par le calculateur Blurb</div>
  <div class="gt" style="left:9.05in;top:11.25in">tranche 1,0 po supposée (440 p.)</div>
  <div class="gt" style="left:1.8in;top:10.05in">zone sûre : 1 po du bord</div>
  <div class="gt" style="left:8.2in;top:1.1in;width:0.75in">charnière 0,4 po</div>
  <div class="gt" style="left:10.05in;top:1.1in;width:0.75in">charnière 0,4 po</div>
  <div class="gt" style="left:11in;top:0.3in">quatrième à gauche, première à droite</div>
</div>'''
    return f'''<section class="cv wrap" id="{"w-guides" if guides else "w"}" style="--c:{t4["c"]}">
  <div class="board bk">{back_panel(t4)}</div>
  <div class="sp">{spine(t4)}</div>
  <div class="board fr">{front_panel(t4, "w"+("g" if guides else "") )}</div>
  {g}
</section>'''

shelf = '<section class="shelf" id="tablette"><div class="row">' + "".join(spine(t) for t in TOMES) + '</div><div class="plank"></div></section>'

CSS = (pathlib.Path(__file__).parent / "cov.css").read_text(encoding="utf-8")

doc = f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Grand Livre du Chalet — couvertures, direction 4 : l’almanach refait</title>
<link href="https://fonts.googleapis.com/css2?family=Vollkorn+SC:wght@400;600;700;900&display=block" rel="stylesheet">
<style>
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:400;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-400-normal.woff2) format('woff2')}}
@font-face{{font-family:'Vollkorn';font-style:italic;font-weight:400;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-400-italic.woff2) format('woff2')}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:700;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-700-normal.woff2) format('woff2')}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:800;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-800-normal.woff2) format('woff2')}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:900;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-900-normal.woff2) format('woff2')}}
{CSS}
</style>
</head>
<body>
<!--
  Direction 4 — couvertures. Couverture rigide ImageWrap supposée (la série doit durer).
  Première seule : 8,25 x 10,25 po (face du carton). Couverture complète : 19 x 11,75 po =
  0,75 rabat + 8,25 quatrième + 1,0 tranche + 8,25 première + 0,75 rabat ; hauteur 0,75 + 10,25 + 0,75.
  Le rabat et la tranche sont des HYPOTHÈSES à remplacer par les valeurs du calculateur Blurb.
  Aperçus : ?serie (les quatre premières), ?tablette (les quatre dos), ?wrap (couverture complète).
-->
{fronts}
{wrap(False)}
{wrap(True)}
{shelf}
<script>
(function(){{
  var Q = new URLSearchParams(location.search);
  function crop(){{
    document.querySelectorAll('svg.art').forEach(function(s){{
      var b = s.getBBox(), p = 6;
      s.setAttribute('viewBox', (b.x-p)+' '+(b.y-p)+' '+(b.width+2*p)+' '+(b.height+2*p));
    }});
  }}
  function mode(){{
    var keep = null;
    if (Q.has('serie')) keep = function(e){{ return e.classList.contains('front'); }};
    else if (Q.has('tablette')) keep = function(e){{ return e.id === 'tablette'; }};
    else if (Q.has('wrap')) keep = function(e){{ return e.id === (Q.get('wrap') === 'guides' ? 'w-guides' : 'w'); }};
    else if (Q.has('front')) keep = function(e){{ return e.id === 'f-' + Q.get('front'); }};
    if (!keep) {{ document.getElementById('tablette').remove(); return; }}
    document.body.classList.add('apercu', Q.has('serie') ? 'm-serie' : Q.has('tablette') ? 'm-tab' : 'm-one');
    document.querySelectorAll('body > section').forEach(function(e){{ if (!keep(e)) e.remove(); }});
    var z = Q.get('z'); if (z) document.body.style.zoom = z;
  }}
  Promise.all(['400 12pt Vollkorn','italic 400 12pt Vollkorn','700 12pt Vollkorn','800 12pt Vollkorn','700 12pt "Vollkorn SC"','900 12pt "Vollkorn SC"','600 12pt "Vollkorn SC"'].map(function(f){{ return document.fonts.load(f); }}))
    .then(function(){{ return document.fonts.ready; }})
    .then(function(){{ setTimeout(go, 50); }}, function(){{ setTimeout(go, 50); }});
  var done = false;
  function go(){{ if (done) return; done = true; crop(); mode(); document.body.setAttribute('data-done','1'); }}
  setTimeout(go, 12000);
}})();
</script>
</body>
</html>'''
OUT.write_text(doc, encoding="utf-8")
print("ok", len(doc))
