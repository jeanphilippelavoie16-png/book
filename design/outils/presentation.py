# -*- coding: utf-8 -*-
"""La présentation du projet en PDF (JP, 19 octobre 2026 : « une présentation du projet en pdf propre et
professionnel dans le style du livre, avec les différents tomes et ce qu'ils traitent »).

    python3 design/outils/presentation.py

Lettre US, 11 pages : la couverture, le projet, un chapitre, les six tomes, la couverture entière de chaque tome
(quatrième, tranche et devant, à l'italienne ; JP : « je veux qu'on voie les pages de couvertures aussi ») avec ce
qu'il traite en une ligne, et le livre et ses auteurs. Peu de texte, des images en grand (JP, 19 octobre 2026 :
« trop lourd, trop de texte »). Ce que chaque tome traite vient du sous-titre de sa page de titre
(assembler-tome.py, SOUS_TITRES). Les pages d'exemple sont tirées du tome 1 au format Lulu
(livre/tome-1-lulu/), qui doit être assemblé. Sortie : livre/presentation/presentation-manuel-du-nord.pdf ; le
travail (images réduites, HTML) dans livre/presentation/travail/, qui ne se versionne pas.
"""
import ast, glob, os, re, subprocess, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'livre', 'presentation')
TRAV = os.path.join(OUT, 'travail')
PDF = os.path.join(OUT, 'presentation-manuel-du-nord.pdf')
CHROME = (sorted(glob.glob('/opt/pw-browsers/chromium-*/chrome-linux/chrome')) or ['chromium'])[-1]


def litteraux(chemin, noms):
    """Les dictionnaires littéraux d'un script du livre, sans l'exécuter."""
    out = {}
    for n in ast.parse(open(chemin, encoding='utf-8').read()).body:
        if isinstance(n, ast.Assign) and isinstance(n.targets[0], ast.Name) and n.targets[0].id in noms:
            # TOMES s'écrit avec dict(...) : on évalue l'expression seule, avec dict pour tout nom
            out[n.targets[0].id] = eval(compile(ast.Expression(n.value), chemin, 'eval'), {'__builtins__': {}, 'dict': dict})
    return out


D = {}
D.update(litteraux(os.path.join(ROOT, 'design/directions/1-manuel-de-terrain/outils/build_couvertures_6.py'), ['TOMES']))
D.update(litteraux(os.path.join(ROOT, 'design/outils/assembler-tome.py'), ['SOUS_TITRES']))



# ------------------------------------------------------------------ typographie
def ty(s):
    """Espaces insécables du français : devant : ; ? ! », derrière «, entre un nombre et son unité."""
    s = s.replace("'", '’')
    s = re.sub(r' ([:»])', '\u00a0\\1', s)
    s = re.sub(r' ([;?!])', '\u202f\\1', s)
    s = re.sub(r'« ', '«\u00a0', s)
    s = re.sub(r'(\d) (°C|po|h|mg|L|V|min|s|pages|chapitres|tomes)\b', '\\1\u00a0\\2', s)
    s = s.replace('-35 °C', '−35\u00a0°C').replace('−35 °C', '−35\u00a0°C')
    return s


# ------------------------------------------------------------------ images
def prep_images():
    os.makedirs(TRAV, exist_ok=True)
    im = Image.open(os.path.join(ROOT, 'images/tomes/titre-tome-1.jpg')).convert('RGB')
    im.thumbnail((1700, 2200))
    im.save(os.path.join(TRAV, 'titre-1.jpg'), quality=86)
    # les photos du bas de page (images/pleine-page/tome-1/, crédits dans images/credits.md)
    for src, nom in (('02-laponie-soleil-de-midi', 'photo-projet'), ('05-aurore-lac-fox', 'photo-livre')):
        im = Image.open(os.path.join(ROOT, 'images/pleine-page/tome-1/%s.jpg' % src)).convert('RGB')
        im.thumbnail((2200, 2200))
        im.save(os.path.join(TRAV, nom + '.jpg'), quality=86)
    for k in range(1, 7):
        # le devant de la couverture : la planche avant, sans le wrap (150 ppp ; images/tomes/couvertures/LISEZMOI.md)
        c = Image.open(os.path.join(ROOT, 'images/tomes/couvertures/couverture-tome-%d-C.png' % k)).convert('RGB')
        w, h = c.size
        wrap, planche = round(0.625 * 150), round(8.75 * 150)
        c.crop((wrap, wrap, w - wrap, h - wrap)).save(os.path.join(TRAV, 'couv-%d.jpg' % k), quality=88)
        c = c.crop((w - wrap - planche, wrap, w - wrap, h - wrap))
        c.thumbnail((700, 900))
        c.save(os.path.join(TRAV, 'avant-%d.jpg' % k), quality=88)
    pages = [('extrait-ch04.pdf', 3, 'ex-ouverture'), ('extrait-ch04.pdf', 4, 'ex-logigramme'),
             ('extrait-ch04.pdf', 6, 'ex-orange'), ('extrait-ch04.pdf', 15, 'ex-planche'),
             ('interieur.pdf', 9, 'ex-danger'), ('interieur.pdf', 218, 'ex-photo')]
    for f, n, nom in pages:
        src = os.path.join(ROOT, 'livre/tome-1-lulu', f)
        base = os.path.join(TRAV, nom)
        subprocess.run(['pdftoppm', '-r', '120', '-jpeg', '-jpegopt', 'quality=88', '-singlefile',
                        '-f', str(n), '-l', str(n), src, base], check=True)


# ------------------------------------------------------------------ morceaux de page
def entete(droite, sombre=False):
    return ('<div class="rh%s"><span>Le Manuel du Nord</span><span>%s</span></div>'
            % (' sombre' if sombre else '', ty(droite)))


def pied(n, tome=None, clair=False):
    cases = ''.join('<i class="%s">%d</i>' % ('on' if k == tome else '', k) for k in range(1, 7))
    return ('<div class="ft%s"><span class="tomes">%s</span><span class="pg">%d</span></div>'
            % (' clair' if clair else '', cases, n))


def photo_bas(nom, haut, y=50):
    """Une photo d'un bord à l'autre au bas de la page, sous le pied."""
    return ('<div class="photo-bas" style="height:%.2fin"><img src="%s.jpg" style="object-position:50%% %d%%"></div>'
            % (haut, nom, y))


def ouverture(titre, chapeau=''):
    return ('<div class="ouv"><div class="trame"></div><h1>%s</h1>%s</div>'
            % (ty(titre), '<div class="chapeau">%s</div>' % ty(chapeau) if chapeau else ''))


def page(contenu, classe=''):
    return '<section class="page %s">%s</section>' % (classe, contenu)


# ------------------------------------------------------------------ les pages
def couverture():
    return page(
        '<img class="plein" src="titre-1.jpg" style="object-position:50%% 100%%">'
        '<div class="cv">'
        '<div class="cv-sur">Présentation du projet</div>'
        '<div class="cv-titre">Le Manuel<br>du Nord</div>'
        '<div class="cv-filet"><span></span>Six tomes · 113 chapitres<span></span></div>'
        '<div class="cv-sous">%s</div>'
        '</div>' % ty("La conservation des aliments, la subsistance et l'autonomie<br>sur la Côte\u2011Nord, "
                      "pour le jour où il n'y a personne à appeler."), 'cover')


def le_projet(n):
    t = [entete('Le projet'), ouverture('Le projet', "Vivre sans courant, sans magasin et sans personne à appeler.")]
    t.append('<div class="corps">')
    t.append('<div class="stats">'
             '<div><b>6</b><span>tomes</span></div>'
             '<div><b>113</b><span>chapitres</span></div>'
             '<div><b>%s</b><span>%s</span></div></div>' % (ty('−35 °C'), ty("l'hiver en forêt boréale")))
    lignes = [('Pour qui', "Une famille avec de jeunes enfants, habile de ses mains, débutante en conservation."),
              ('Le test', "Il n'y a personne à appeler : chaque page dit comment faire soi-même, avec ce qu'on a."),
              ('Les chiffres', "Chacun est vérifié à la source avant d'être écrit.")]
    t.append('<div class="lignes">%s</div>' % ''.join(
        '<div><b>%s</b><span>%s</span></div>' % (ty(a), ty(b)) for a, b in lignes))
    t.append('<div class="lieux2">'
             '<div class="maison"><b>La maison</b><span>%s</span></div>'
             '<div class="chalet"><b>Le chalet</b><span>%s</span></div></div>'
             % (ty("Ce qui est court : une panne de trois jours, une tempête."),
                ty("Ce qui dure : le bois, l'eau, la chasse, la pêche et le jardin.")))
    t.append('</div>')
    t.append(photo_bas('photo-projet', 3.0, 60))
    t.append(pied(n, clair=True))
    return page(''.join(t))


def un_chapitre(n):
    t = [entete('Un chapitre'), ouverture('Un chapitre', 'Sept sections, toujours dans le même ordre.')]
    t.append('<div class="corps">')
    secs = ['En une ligne', "Quand l'utiliser", 'Matériel', 'Procédure', 'Points de contrôle', "Signes d'échec",
            "Variante d'urgence"]
    t.append('<div class="sept2">%s</div>' % ''.join(
        '<div><b>%d</b><span>%s</span></div>' % (i + 1, ty(x)) for i, x in enumerate(secs)))
    ex = [('ex-ouverture', "L'ouverture"), ('ex-logigramme', 'Le logigramme'),
          ('ex-orange', 'Les premières minutes, en orange'), ('ex-planche', 'Les planches'),
          ('ex-danger', 'Les dangers, un pictogramme chacun'), ('ex-photo', 'Les pages vides deviennent des photos')]
    t.append('<div class="grille">%s</div>' % ''.join(
        '<figure><img src="%s.jpg"><figcaption>%s</figcaption></figure>' % (f, ty(c)) for f, c in ex))
    t.append('</div>')
    t.append(pied(n))
    return page(''.join(t))


def les_six(n):
    t = [entete('Les six tomes'), ouverture('Les six tomes', "Dans l'ordre des besoins.")]
    t.append('<div class="corps"><div class="six">')
    for k in range(1, 7):
        T = D['TOMES'][k]
        t.append('<figure><img src="avant-%d.jpg"><figcaption><b>%d · %s</b><span>%d chapitres</span></figcaption></figure>'
                 % (k, k, ty(T['titre']), T['n']))
    t.append('</div></div>')
    t.append(pied(n))
    return page(''.join(t))


def couverture_tome(k, n):
    """La couverture entière du tome, sans le wrap qui se replie sur le carton : quatrième, tranche, devant."""
    T = D['TOMES'][k]
    return page(entete('Tome %d' % k)
                + '<div class="cz"><img src="couv-%d.jpg"></div>'
                  '<div class="cz-leg"><b>Tome %d · %s</b><span>%s</span></div>'
                % (k, k, ty(T['titre']), ty(D['SOUS_TITRES'][k]))
                + pied(n, k), 'paysage t%d' % k)


def fabrication(n):
    t = [entete('Le livre'), ouverture('Le livre')]
    t.append('<div class="corps">')
    specs = [('8,5 × 11 po', 'lettre US'), ('Couverture rigide', 'imprimée chez Lulu'),
             ('Couleur Premium', 'papier blanc mat'), ('352 pages', 'pour le tome 1, prêt à imprimer')]
    t.append('<div class="specs">%s</div>' % ''.join(
        '<div><b>%s</b><span>%s</span></div>' % (ty(a), ty(b)) for a, b in specs))
    jp = os.path.join(ROOT, 'design/directions/1-manuel-de-terrain/auteur-jp-neige.png')
    cl = os.path.join(ROOT, 'design/directions/1-manuel-de-terrain/auteur-claude-neige.svg')
    aut = [(jp, 'Jean-Philippe Lavoie', "A écrit ce livre pour ses enfants."),
           (cl, 'Claude', "A fait la recherche, écrit les chapitres et dessiné les planches.")]
    t.append('<h2 class="h2-aut">Les auteurs</h2>')
    t.append('<div class="auteurs2">%s</div>' % ''.join(
        '<div><div class="rond"><img src="%s"></div><b>%s</b><span>%s</span></div>' % (img, nom, ty(txt))
        for img, nom, txt in aut))
    t.append('</div>')
    t.append(photo_bas('photo-livre', 3.3, 55))
    t.append(pied(n, clair=True))
    return page(''.join(t))


CSS = r'''
@page{size:8.5in 11in;margin:0}
@page paysage{size:11in 8.5in;margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:'IBM Plex Serif',Georgia,serif;font-size:10pt;line-height:1.4;color:#1A1A1A;
     -webkit-print-color-adjust:exact;print-color-adjust:exact;font-variant-numeric:lining-nums}
.page{width:8.5in;height:11in;position:relative;overflow:hidden;break-after:page;background:#fff}
.page:last-child{break-after:auto}
p{margin:0 0 6pt;hyphens:auto;text-align:left}
strong{font-weight:600}
.sc,.rh,.ft,h1,h2,h3,th,.cv-sur,.cv-filet,figcaption b,.t-sur{font-family:'IBM Plex Sans Condensed','Arial Narrow',sans-serif}

/* titre courant et pied, comme dans le livre */
.rh{position:absolute;top:.42in;left:.75in;right:.75in;display:flex;justify-content:space-between;font-size:7.2pt;
    font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#2B5876;z-index:3}
.rh span:first-child{color:#1A1A1A}
.rh.sombre span{color:#fff!important;text-shadow:0 0 6px rgba(0,0,0,.45)}
.ft{position:absolute;bottom:.4in;left:.75in;right:.75in;display:flex;justify-content:space-between;align-items:center;
    font-size:8pt;font-weight:600;color:#1A1A1A}
.tomes{display:flex;gap:2pt}
.tomes i{font-style:normal;width:11pt;height:11pt;border:.8pt solid #2B5876;display:flex;align-items:center;
         justify-content:center;font-size:6.6pt;color:#2B5876}
.tomes i.on{background:var(--ta,#2B5876);border-color:var(--ta,#2B5876);color:#fff}

/* ouverture : la trame grise du titre de chapitre */
.ouv{position:relative;margin:0;padding:.8in .75in .24in;min-height:1.8in}
.trame{position:absolute;inset:0 0 0 0;z-index:0;
  background:repeating-linear-gradient(135deg,color-mix(in srgb,#fff 45%,#DDE3E7) 0 1.1px,#DDE3E7 1.1px 5px)}
.ouv h1{position:relative;z-index:1;margin:0;font-size:36pt;line-height:.95;font-weight:700;text-transform:uppercase;
        color:#2B5876;letter-spacing:-.005em}
.chapeau{position:relative;z-index:1;margin-top:7pt;font-size:10.8pt;line-height:1.4;max-width:6.2in;color:#15222B}
.corps{padding:.16in .75in 0}
h1.petit{margin:.95in 0 4pt;font-size:28pt;line-height:1;font-weight:700;text-transform:uppercase;color:#2B5876}
h2{display:flex;align-items:center;gap:6pt;margin:10pt 0 5pt;padding-top:5pt;border-top:1.2pt solid #1A1A1A;
   font-size:10.5pt;font-weight:700;text-transform:uppercase;letter-spacing:.03em}
h2 b{display:inline-flex;width:14pt;height:14pt;background:var(--ta,#2B5876);color:#fff;align-items:center;
     justify-content:center;font-size:8.5pt}
h2:first-child{margin-top:4pt}
table{border-collapse:collapse;width:100%;margin:2pt 0 7pt;font-size:9.2pt;line-height:1.28}
th{text-align:left;font-size:8pt;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#fff;
   background:#2B5876;padding:3.5pt 6pt}
td{padding:2.6pt 6pt;border-bottom:.6pt solid #C9D3DA;vertical-align:top}
tr:nth-child(odd) td{background:#F2F5F7}
table.lieux td:first-child{font-family:'IBM Plex Sans Condensed',sans-serif;font-weight:600;width:1.1in}
table.lieux th:first-child{background:#fff}
table.rs td:first-child{color:#7A2A20;font-style:italic;width:43%}
table.rs th:first-child{background:#9B2C1E}
table.rappels td:last-child{width:2.05in;font-family:'IBM Plex Sans Condensed',sans-serif;font-size:8.8pt}
table.fiche td:first-child{font-family:'IBM Plex Sans Condensed',sans-serif;font-weight:600;width:1.1in}

/* un chapitre */
ol.sept{list-style:none;margin:2pt 0 9pt;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:5pt 18pt}
ol.sept li{display:flex;gap:7pt;align-items:flex-start;font-size:9.3pt;line-height:1.3}
ol.sept li:last-child{grid-column:1 / 3;background:#F2F5F7;padding:5pt 6pt}
ol.sept li b{flex:none;width:15pt;height:15pt;background:#2B5876;color:#fff;display:flex;align-items:center;
             justify-content:center;font-family:'IBM Plex Sans Condensed',sans-serif;font-size:9pt}
ol.sept li strong{display:block;font-family:'IBM Plex Sans Condensed',sans-serif;font-weight:700;text-transform:uppercase;
                  font-size:9pt;letter-spacing:.03em}
.deux{display:grid;grid-template-columns:1fr 1fr;gap:9pt 16pt}
.bloc{border-top:1.2pt solid #1A1A1A;padding-top:5pt;font-size:9.2pt;line-height:1.34}
.bloc h3{margin:0 0 4pt;font-size:9.8pt;font-weight:700;text-transform:uppercase;letter-spacing:.03em;display:flex;
         align-items:center;gap:6pt}
.bloc.orange{border:1.5pt solid #EE7219;background:#FDE8D8;padding:6pt 8pt}
.bloc.orange h3{color:#1A1A1A}
.pastille{background:#EE7219;color:#1A1A1A;font-size:9pt;padding:1.5pt 5pt;font-weight:700}
.bloc.vert{border:none;background:#EDF4E6;padding:6pt 8pt;
           box-shadow:0 1pt 0 #D2DCCB,0 2pt 0 #DEE6D9,0 3pt 0 #E9EFE5,0 4pt 0 #F3F6F1}
.bloc.vert h3{color:#3F6B35}
.pictos{display:grid;grid-template-columns:repeat(8,1fr);gap:3pt;margin-top:4pt}
.pictos img{width:100%;display:block}

/* exemples */
.ex-intro{font-size:10.6pt;margin-bottom:10pt}
.grille{display:grid;grid-template-columns:repeat(3,1fr);gap:12pt 14pt}
.grille figure{margin:0}
.grille img{width:100%;display:block;border:.6pt solid #B9C3CA;box-shadow:0 2pt 6pt rgba(21,34,43,.18)}
.grille figcaption{font-size:8.3pt;line-height:1.3;margin-top:5pt;color:#333}

/* les six */
.six{display:grid;grid-template-columns:repeat(3,1fr);gap:14pt 16pt;margin-top:6pt}
.six figure{margin:0}
.six img{width:100%;display:block;box-shadow:0 2pt 7pt rgba(21,34,43,.28)}
.six figcaption{margin-top:6pt;font-size:8.6pt;line-height:1.25}
.six figcaption b{display:block;font-size:10.5pt;font-weight:700;text-transform:uppercase;letter-spacing:.02em}
.six figcaption span{font-family:'IBM Plex Sans Condensed',sans-serif;color:#555}

/* une page par tome */
.tome .bande{position:absolute;top:0;left:0;right:0;height:3.85in;overflow:hidden}
.tome .bande img{width:100%;height:100%;object-fit:cover;display:block}
.tome .t-ouv{position:absolute;top:3.85in;left:0;right:0;height:1.42in;background:var(--tp);display:flex;
             align-items:center;gap:14pt;padding:0 .75in;border-top:4pt solid var(--ta)}
.t-num{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:92pt;line-height:.8;color:var(--ta)}
.t-sur{font-size:8pt;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ta)}
.t-titre{margin:1pt 0 3pt;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:34pt;line-height:.95;
         text-transform:uppercase;color:#1A1A1A}
.t-sous{font-size:9.6pt;line-height:1.35;color:#333;max-width:5.4in}
.tome .t-corps{position:absolute;top:5.27in;left:0;right:0;padding-top:.06in}
.tome h2 b{background:var(--ta)}
.chap{display:grid;grid-template-columns:1fr 1fr;gap:0 18pt}
.chap ul{list-style:none;margin:0;padding:0}
.chap li{display:flex;gap:8pt;font-family:'IBM Plex Sans Condensed',sans-serif;font-size:9.4pt;line-height:1.2;
         padding:3.2pt 0;border-bottom:.6pt solid #CCD3D8}
.chap li b{flex:none;width:22pt;font-weight:700;color:var(--ta)}
.t1{--ta:#2B5876;--tp:#E8EDF0}.t2{--ta:#5C1A15;--tp:#F3ECE5}.t3{--ta:#2B5A45;--tp:#E9F0EA}
.t4{--ta:#25414F;--tp:#EDF2F5}.t5{--ta:#6B5238;--tp:#F2EBDF}.t6{--ta:#363432;--tp:#EEEBE6}
.tome .tomes i{border-color:var(--ta);color:var(--ta)}
.tome .tomes i.on{color:#fff}

/* la couverture entière, à l'italienne */
.page.paysage{page:paysage;width:11in;height:8.5in;background:#EEF0F1}
.cz{position:absolute;top:.9in;left:.5in;right:.5in;height:6.25in;display:flex;align-items:center;justify-content:center}
.cz img{max-width:100%;max-height:100%;display:block;box-shadow:0 3pt 12pt rgba(21,34,43,.35)}
.cz-leg{position:absolute;top:7.3in;left:.75in;right:.75in;text-align:center;font-size:9.4pt;color:#333}
.cz-leg b{font-family:'IBM Plex Sans Condensed',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.03em;
          color:var(--ta);margin-right:8pt}
.paysage .tomes i{border-color:var(--ta);color:var(--ta)}
.paysage .tomes i.on{color:#fff}
.paysage .rh span:last-child{color:var(--ta)}

/* pages allégées (JP, 19 octobre 2026 : « trop lourd, trop de texte ») */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14pt;margin:14pt 0 22pt}
.stats div{border-top:3pt solid #2B5876;padding-top:8pt}
.stats b{display:block;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:58pt;line-height:.9;color:#2B5876}
.stats span{font-family:'IBM Plex Sans Condensed',sans-serif;font-size:11pt;font-weight:600;text-transform:uppercase;
            letter-spacing:.06em}
.lignes div{display:grid;grid-template-columns:1.4in 1fr;gap:10pt;padding:9pt 0;border-bottom:.8pt solid #C9D3DA;
            font-size:12pt;line-height:1.35;align-items:baseline}
.lignes div:first-child{border-top:.8pt solid #C9D3DA}
.lignes b{font-family:'IBM Plex Sans Condensed',sans-serif;font-weight:700;text-transform:uppercase;font-size:10.5pt;
          letter-spacing:.04em;color:#2B5876}
.lieux2{display:grid;grid-template-columns:1fr 1fr;gap:14pt;margin-top:24pt}
.lieux2 div{padding:16pt 16pt 18pt;min-height:1.7in}
.lieux2 b{display:block;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:30pt;line-height:1;
          text-transform:uppercase;margin-bottom:8pt}
.lieux2 span{font-size:12pt;line-height:1.35}
.lieux2 .maison{background:#E8EDF0;color:#15222B}
.lieux2 .chalet{background:#15222B;color:#E2E7EA}
.sept2{display:grid;grid-template-columns:repeat(7,1fr);gap:4pt;margin:6pt 0 16pt}
.sept2 div{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4pt;
           font-family:'IBM Plex Sans Condensed',sans-serif;font-size:8.4pt;font-weight:600;line-height:1.15;
           text-transform:uppercase;letter-spacing:.02em}
.sept2 b{width:20pt;height:20pt;background:#2B5876;color:#fff;display:flex;align-items:center;justify-content:center;
         font-size:11pt}
.sept2 div:last-child b{background:#EE7219;color:#1A1A1A}
.grille figcaption{font-family:'IBM Plex Sans Condensed',sans-serif;font-size:9.6pt;font-weight:600}
.six figcaption span{display:block}
.cz-leg b{display:block;font-size:12pt;margin:0 0 3pt}
.cz-leg span{font-size:10.5pt}
.specs{display:grid;grid-template-columns:repeat(2,1fr);gap:14pt;margin:14pt 0 26pt}
.specs div{border-top:3pt solid #2B5876;padding-top:8pt}
.specs b{display:block;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:30pt;line-height:1;
         text-transform:uppercase;color:#15222B}
.specs span{font-size:11pt;color:#444}
.h2-aut{margin-top:6pt}
.photo-bas{position:absolute;left:0;right:0;bottom:0;overflow:hidden}
.photo-bas img{width:100%;height:100%;object-fit:cover;display:block}
.ft.clair{color:#fff;z-index:2}
.ft.clair .tomes i{border-color:#fff;color:#fff}
.auteurs2{display:grid;grid-template-columns:1fr 1fr;gap:20pt;margin-top:12pt}
.auteurs2>div{display:flex;flex-direction:column;align-items:center;text-align:center;gap:6pt}
.auteurs2 .rond{width:1.6in;height:1.6in}
.auteurs2 b{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:20pt;margin-top:4pt}
.auteurs2 span{font-size:11pt;max-width:2.8in}

/* auteurs */
.auteurs{display:grid;grid-template-columns:1fr 1fr;gap:16pt;margin-top:4pt}
.aut{display:flex;gap:12pt;align-items:flex-start;font-size:9.8pt;line-height:1.42}
.rond{flex:none;width:1.15in;height:1.15in;border-radius:50%;overflow:hidden;border:1.4pt solid #15222B;background:#E2E7EA;
      display:flex;align-items:center;justify-content:center}
.rond img{width:100%;height:100%;object-fit:cover}
.rond img[src$=".svg"]{width:62%;height:62%;object-fit:contain}
.nom{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:16pt;margin-bottom:3pt}
.nom span{font-family:'IBM Plex Sans Condensed',sans-serif;font-weight:400;font-size:8pt;color:#555}

/* couverture */
.cover{background:#15222B}
.plein{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.cover::after{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 4.3in .8in at 50% 3.42in,rgba(21,34,43,.97) 50%,rgba(21,34,43,0) 100%)}
.cv{z-index:2}
.cv{position:absolute;top:.6in;left:0;right:0;text-align:center;color:#E2E7EA}
.cv-sur{font-size:10pt;font-weight:600;letter-spacing:.32em;text-transform:uppercase}
.cv-titre{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:88pt;line-height:.86;text-transform:uppercase;
          margin-top:12pt;letter-spacing:.005em}
.cv-filet{display:flex;align-items:center;justify-content:center;gap:12pt;margin-top:15pt;font-size:10pt;font-weight:600;
          letter-spacing:.24em;text-transform:uppercase}
.cv-filet span{display:block;width:.7in;height:.8pt;background:#E2E7EA;opacity:.7}
.cv-sous{margin:11pt auto 0;max-width:5.6in;font-size:11.5pt;line-height:1.4}
'''

POLICES = ('<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800'
           '&family=IBM+Plex+Sans+Condensed:wght@400;500;600;700'
           '&family=IBM+Plex+Serif:ital,wght@0,400;0,600;0,700;1,400&display=block" rel="stylesheet">\n'
           '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400&text=%E2%88%92'
           '&display=block" rel="stylesheet">\n')


def main():
    prep_images()
    pages = [couverture(), le_projet(2), un_chapitre(3), les_six(4)]
    pages += [couverture_tome(k, 4 + k) for k in range(1, 7)]
    pages.append(fabrication(11))
    doc = ('<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Le Manuel du Nord</title>%s'
           '<style>%s</style></head><body>%s</body></html>' % (POLICES, CSS, ''.join(pages)))
    f = os.path.join(TRAV, 'presentation.html')
    open(f, 'w', encoding='utf-8').write(doc)
    r = subprocess.run([CHROME, '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
                        '--run-all-compositor-stages-before-draw', '--virtual-time-budget=30000',
                        '--no-pdf-header-footer', '--print-to-pdf=' + PDF, 'file://' + f],
                       capture_output=True, text=True, timeout=300)
    if not os.path.exists(PDF):
        sys.exit(r.stderr[-2000:])
    print(PDF)


if __name__ == '__main__':
    main()
