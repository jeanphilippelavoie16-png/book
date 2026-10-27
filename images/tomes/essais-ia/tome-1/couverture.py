# -*- coding: utf-8 -*-
"""Couverture imprimée d'un tome, autour de l'image de sa page de titre (essai du 18 octobre 2026).

Trois mises en page de la couverture complète (quatrième | tranche | devant), aux mesures de l'imprimeur (FORMATS :
Lulu, couverture rigide Case Wrap, par défaut ; Blurb, couverture souple 8 × 10, avec --format blurb) :
  A  l'affiche : le devant de la page de titre ; la nuit continue en aplat sur la tranche et la quatrième
  B  le gros chiffre : le numéro du tome en grand dans le ciel ; tranche et quatrième à la couleur du tome
  C  le ciel fait le tour : titre centré ; le ciel étoilé de l'image, recadré en miroir, couvre la tranche et
     la quatrième

  python3 couverture.py                      les trois variantes du tome 1 en PNG (150 ppp) et la planche de choix
  python3 couverture.py --tome 3 --image images/tomes/titre-tome-3.jpg --variantes B
  --ppp N        résolution des PNG (150)
  --fond-ppp N   résolution de l'image de fond composée (300 ; 375 garde l'image du tome 1 à sa pleine définition)
  --accent HEX   couleur du gros chiffre (variante B) : une couleur forte de l'image du tome (cuivre des crêtes, tome 1)
  --format F     lulu (défaut) ou blurb
  --guides       trace les bords des planches, les plis, la zone sûre, la tolérance de coupe et la zone du code-barres
  --pdf DIR      le PDF à téléverser chez l'imprimeur, de la première variante : DIR/couverture-tome-N.pdf (une page à la
                 taille exacte, RVB, le texte en vectoriel, polices incorporées, sans transparence)
  --controle     l'image de contrôle : la couverture sous le gabarit de Lulu du tome (sources/lulu-captures/
                 gabarit-couverture-tome-N-*.pdf), dans le dossier de --pdf ou de --sortie
  --six          refait les-six-couvertures.png avec les six couverture-tome-N-C.png de --sortie, et rien d'autre
  --garder DIR   garde le HTML, les fonds et les portraits dans DIR (sinon : dossier temporaire, effacé)
  --sortie DIR   où écrire les PNG (ce dossier par défaut)

La tranche : Lulu, au tableau de la couverture rigide (LULU_RIGIDE) pour le nombre de pages de PAGES_LULU (le tome 1 :
354 pages, l'intérieur téléversé) ou, faute de gabarit, de build_couvertures_6.PAGES (provisoire) ; Blurb, au tableau
de Blurb (build_couvertures_6.SPINE). Les textes de la quatrième, le sommaire et les auteurs viennent de
design/directions/1-manuel-de-terrain/outils/build_couvertures_6.py, importé tel quel : rien n'y est écrit.
Le sous-titre du devant (variante A) vient de SOUS_TITRES dans design/outils/assembler-tome.py. Il faut Chromium
(/opt/pw-browsers), l'accès à Google Fonts, pypdf et pdftoppm (--pdf, --controle).

Les étoiles : aucune étoile derrière une lettre ni collée contre elle (JP, 18 octobre 2026). On mesure dans Chromium la
boîte de chaque texte, puis on retire de l'image composée les étoiles qui touchent ces boîtes (avec une marge) ; les
autres restent.
"""
import os, sys, re, ast, glob, html, json, shutil, argparse, subprocess, tempfile

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ICI = os.path.dirname(os.path.abspath(__file__))


def _racine():
    d = ICI
    while d != os.path.dirname(d) and not os.path.exists(os.path.join(d, 'CLAUDE.md')):
        d = os.path.dirname(d)
    return d


ROOT = _racine()
sys.dont_write_bytecode = True          # aucun __pycache__ dans les outils partagés
sys.path.insert(0, os.path.join(ROOT, 'design', 'directions', '1-manuel-de-terrain', 'outils'))
import build_couvertures_6 as bc        # noqa: E402

Image.MAX_IMAGE_PIXELS = None

# ------------------------------------------------------------------ mesures (pouces)
# Deux formats (--format). Par défaut, Lulu : couverture rigide Case Wrap, US Letter (JP, 19 octobre 2026), aux mesures
# du gabarit que Lulu a donné pour l'intérieur du tome 1 (sources/lulu-captures/gabarit-couverture-tome-1-354p.pdf,
# 354 pages) : le wrap, ce qui se replie sur le carton, remplace le fond perdu (0,625 po sur les quatre bords) ; les
# planches (cartons) font 8,75 × 11,5 po ; la zone sûre est à 0,625 po en dedans du bord de chaque planche, du côté de
# la tranche aussi ; la zone du code-barres (facultative, 3,622 × 1,26 po) est en bas à droite de la quatrième, collée
# au coin de la zone sûre, du côté de la tranche : rien d'écrit n'y va, Lulu peut y poser un code-barres.
# Blurb (--format blurb) : couverture souple 8 × 10, fond perdu 0,125 po, zone sûre 0,25 po (le rendu d'avant).
#   fp       wrap (Lulu) ou fond perdu (Blurb), sur les quatre bords
#   pw, ph   une planche (Lulu) ou un plat rogné (Blurb)
#   surete   la zone sûre, en dedans du bord de la planche
#   marge    le bloc de texte de la quatrième, en dedans du bord de la planche (Lulu : la zone sûre ; le bas du bloc
#            s'arrête sur la zone du code-barres, ce qui lui laisse la hauteur du bloc de Blurb, 9 po)
#   devant   les côtés du titre du devant, en dedans du bord de la planche, et la descente du haut du devant (Lulu :
#            0,75 po, 0,25 po plus bas que Blurb : le titre du tome 1 tombe au même point de l'image qu'en Blurb)
#   cb       la zone du code-barres (largeur, hauteur), ou None
FORMATS = {
    'lulu': dict(nom='Lulu, couverture rigide Case Wrap', fp=0.625, pw=8.75, ph=11.5, surete=0.625, marge=0.625,
                 devant=0.75, cb=(3.622, 1.26)),
    'blurb': dict(nom='Blurb, couverture souple 8 × 10', fp=0.125, pw=8.0, ph=10.0, surete=0.25, marge=0.5,
                  devant=0.5, cb=None),
}

# La tranche de la couverture rigide, au tableau de Lulu (sources/lulu-specifications.md §3, guide de création, p. 14) :
# (nombre de pages au plus, tranche en po). De 24 à 84 pages : 0,25 po.
LULU_RIGIDE = [(84, .25), (140, .5), (168, .625), (194, .688), (222, .75), (250, .813), (278, .875), (306, .938),
               (334, 1.0), (360, 1.063), (388, 1.125), (416, 1.188), (444, 1.25), (472, 1.313), (500, 1.375),
               (528, 1.438), (556, 1.5), (582, 1.563), (610, 1.625), (638, 1.688), (666, 1.75), (694, 1.813),
               (722, 1.875), (750, 1.938), (778, 2.0), (799, 2.063), (800, 2.125)]
# Les pages de l'intérieur téléversé chez Lulu, tome par tome, quand Lulu a donné le gabarit de sa couverture
# (sources/lulu-captures/gabarit-couverture-tome-N-*.pdf). Un tome absent d'ici prend le compte de
# build_couvertures_6.PAGES (les intérieurs Blurb 8 × 10) : sa tranche est provisoire jusqu'à son propre gabarit.
PAGES_LULU = {1: 354}


def tranche_lulu(pages):
    if not 24 <= pages <= 800:
        raise ValueError('%d pages : la couverture rigide de Lulu va de 24 à 800 pages' % pages)
    return next(t for n, t in LULU_RIGIDE if pages <= n)


def mesures(k, fmt='lulu'):
    f = FORMATS[fmt]
    if fmt == 'blurb':
        pages, tr, prov = bc.PAGES[k], bc.SPINE[k], bc.PROV[k]
    else:
        pages = PAGES_LULU.get(k, bc.PAGES[k])
        tr = tranche_lulu(pages)
        prov = ('gabarit de Lulu' if k in PAGES_LULU else
                'PROVISOIRE : compte Blurb de build_couvertures_6.PAGES, en attendant le gabarit de Lulu')
    fp, pw, ph = f['fp'], f['pw'], f['ph']
    return dict(f, format=fmt, tome=k, pages=pages, prov=prov, tranche=tr, W=2 * fp + 2 * pw + tr, H=ph + 2 * fp,
                x_tranche=fp + pw, x_devant=fp + pw + tr)


def y_devant(m, y):
    """Une cote du devant prise sur la couverture Blurb (po depuis le haut du plat rogné) ramenée au même point de
    l'image du tome sur la couverture de m : l'image est calée en haut et couvre toute la hauteur, fond perdu ou wrap
    compris, dans les deux formats. La crête ou l'objet sous le titre restent ainsi sous lui."""
    if m['format'] == 'blurb':
        return y
    b = FORMATS['blurb']
    iw, ih = m['image']
    s_b = max((b['pw'] + b['fp']) / iw, (b['ph'] + 2 * b['fp']) / ih)       # po par px de l'image (composer)
    s_m = max((m['pw'] + m['fp']) / iw, m['H'] / ih)
    return round((y + b['fp']) / s_b * s_m - m['fp'], 3)


def x_quatrieme(m, x):
    """Une cote de la quatrième prise sur la couverture Blurb (po depuis le bord du fond perdu) ramenée au même point du
    bloc de texte de la quatrième de m (pour les modules des dos)."""
    if m['format'] == 'blurb':
        return x
    b = FORMATS['blurb']
    g_b, d_b = b['fp'] + b['marge'], b['fp'] + b['pw'] - b['marge']
    g_m, d_m = m['fp'] + m['marge'], m['fp'] + m['pw'] - m['marge']
    return g_m + (x - g_b) * (d_m - g_m) / (d_b - g_b)


# ------------------------------------------------------------------ la bulle des photos des auteurs
# JP, 18 octobre 2026 : « travaille la bulle de nos images ». Le disque clair seul faisait une pastille plate.
BULLES = {
    'plate': 'border:0.9pt solid var(--encre)',
    # un filet clair détaché du disque par un mince anneau du fond, et une ombre qui décolle le médaillon
    'medaillon': 'box-shadow:0 0 0 2.4pt var(--fond),0 0 0 3.3pt var(--encre),0 3pt 8pt 2pt rgba(0,0,0,.35),'
                 'inset 0 1.6pt 3.5pt rgba(0,0,0,.28)',
    # une bulle bombée : ombre portée, le bas plus sombre, le haut éclairé
    'bulle': 'box-shadow:0 3pt 7pt rgba(0,0,0,.55),0 0.8pt 1.6pt rgba(0,0,0,.4),inset 0 -2.5pt 5pt rgba(0,0,0,.22),'
             'inset 0 2pt 3pt rgba(255,255,255,.65)',
    # le filet à la couleur d'accent
    'cuivre': 'box-shadow:0 0 0 2.2pt var(--fond),0 0 0 3.8pt var(--accent),0 3pt 8pt 2pt rgba(0,0,0,.35),'
              'inset 0 1.6pt 3.5pt rgba(0,0,0,.25)',
}
BULLE = 'medaillon'


# ------------------------------------------------------------------ couleurs
CLAIR, CLAIR2, FILET_NUIT = '#E2E7EA', '#B9C7D1', '#4A6476'     # celles de la page de titre
CUIVRE = '#BE6A3F'                      # médiane des crêtes orangées de l'image du tome 1 (190, 106, 63)


def rgb(c):
    return tuple(int(c[i:i + 2], 16) for i in (1, 3, 5))


def hexa(t):
    return '#%02X%02X%02X' % tuple(int(round(v)) for v in t)


def rgba(c, a):
    return 'rgba(%d,%d,%d,%g)' % (rgb(c) + (a,))


def couleur_du_ciel(img):
    """Le ciel en haut à gauche de l'image (médiane : les étoiles n'y comptent pas)."""
    a = np.asarray(img)
    h, w = a.shape[:2]
    return hexa(np.median(a[:h // 10, :w // 20].reshape(-1, 3), axis=0))


VARIANTES = {
    'A': dict(nom='L’affiche', dos='nuit', devant='affiche',
              resume='le devant de la page de titre ; la nuit continue en aplat sur la tranche et la quatrième'),
    'B': dict(nom='Le gros chiffre', dos='tome', devant='chiffre',
              resume='le numéro du tome dans le ciel ; tranche et quatrième à la couleur du tome'),
    'C': dict(nom='Le ciel fait le tour', dos='etoiles', devant='centre',
              resume='titre centré ; le ciel étoilé de l’image couvre la tranche et la quatrième'),
}


def palette(v, k, ciel):
    """Couleurs du dos (tranche et quatrième) de la variante v : fond, encre, encre douce, filet."""
    if VARIANTES[v]['dos'] == 'tome':
        fond, encre = bc.COUL[k][:2]
        return dict(fond=fond, encre=encre, douce=encre, filet=rgba(encre, .45), fort=encre)
    return dict(fond=ciel, encre=CLAIR, douce=CLAIR2, filet=rgba(CLAIR, .28), fort=FILET_NUIT)


# ------------------------------------------------------------------ textes (build_couvertures_6.py, tels quels)
def nb_chapitres():
    # le texte de build_couvertures_6.py dit encore « 114 chapitres » (le ch. 00 coupé le 15 octobre y était) : on
    # compte le sommaire des six tomes, 113
    return sum(len(s) for s in bc.SOMMAIRE.values())


def sous_titre(k):
    f = os.path.join(ROOT, 'design', 'outils', 'assembler-tome.py')
    m = re.search(r'^SOUS_TITRES\s*=\s*(\{.*?\})\s*$', open(f, encoding='utf-8').read(), re.M | re.S)
    st = ast.literal_eval(m.group(1)).get(k, '').replace("'", '’') if m else ''
    return st.replace('feu de forêt', 'feu\u00a0de\u00a0forêt')        # le groupe ne se coupe pas en fin de ligne


esc = lambda s: html.escape(s, quote=False)


def typo(s):
    """Espace fine insécable devant le deux-points et le point-virgule ; les insécables du texte restent."""
    return esc(s).replace(' :', '&#8239;:').replace(' ;', '&#8239;;').replace('\u00a0', '&nbsp;')


def serie(k):
    return '<div class="serie">%s</div>' % ''.join(
        '<div style="flex:%d"%s><i>%d</i><small>%s–%s</small></div>' % (
            bc.TOMES[t]['n'], ' class="on"' if t == k else '', t, bc.TOMES[t]['ch'][0], bc.TOMES[t]['ch'][1])
        for t in range(1, 7))


def auteurs(fichiers):
    blocs = []
    for a in bc.AUTEURS:
        q = ' <span class="q">%s</span>' % esc(a['qualite']) if a['qualite'] else ''
        texte = typo(a['texte'])
        texte = re.sub(r'(\S+-\S+)', r'<span class="nw">\1</span>', texte)     # pas de coupure au trait d'union
        blocs.append('<div class="a"><span class="ph %s"><img src="%s" alt=""></span>'
                     '<p><b class="n">%s</b>%s<br>%s</p></div>' % (a['image'], fichiers[a['image']], esc(a['nom']), q, texte))
    return '<div class="auteurs"><h2>Les auteurs</h2><div class="aut">%s</div></div>' % ''.join(blocs)


# Le texte du dos, un par tome (JP, 19 octobre 2026 : « un différent pour chaque livre, qui traite du livre ; mentionne
# c'est quel tome de la séquence de 6 ; enlève la phrase en gras ») : deux rédacteurs, puis l'éditeur ; chaque geste
# nommé est dans un chapitre du tome.
QUATRIEME = {
    1: "Le Manuel du Nord compte six tomes, et celui-ci est le premier. Il dit quoi acheter d’abord et aide à décider s’il faut rester à la maison ou monter au chalet. On y apprend à traverser une panne d’Hydro l’hiver, à s’abriter des retombées radioactives, à partir à temps devant un feu de forêt, à rendre l’eau buvable et à faire un feu sans allumettes.",
    2: "Le Manuel du Nord compte six tomes, et celui-ci est le deuxième. On y apprend pourquoi la viande maigre seule peut tuer en quelques semaines, et comment nourrir la famille tout l’hiver sans manquer de gras ni de vitamine\u00a0C. On y voit comment soigner une gelure, boucher le trou d’un plombage tombé, aider une femme à accoucher et rassurer les enfants avec une routine.",
    3: "Le Manuel du Nord compte six tomes, et celui-ci est le troisième. Il dit quoi chasser et pêcher chaque mois. On y apprend à lire les traces d’une bête, à retracer un orignal blessé, à prendre le lièvre au collet et le porc-épic sans arme à feu, à pêcher sous la glace et à faire un arc de mélèze quand il reste peu de balles.",
    4: "Le Manuel du Nord compte six tomes, et celui-ci est le quatrième. On y apprend à vider un orignal, à refroidir sa viande à 7 °C en 24\u00a0heures, à la découper muscle par muscle et à conserver chaque morceau jusqu’au printemps : salé, séché, gelé dehors ou en pemmican. On y voit comment fumer la truite, faire des conserves et garder les légumes au caveau.",
    5: "Le Manuel du Nord compte six tomes, et celui-ci est le cinquième. On y apprend à chauffer le chalet au bois sans encrasser la cheminée, à faire le pain au levain, à fabriquer des raquettes et à réparer un canot à la gomme d’épinette. On y voit comment cueillir les petits fruits, enrichir la terre avec la cendre et le varech, et garder ses semences.",
    6: "Le Manuel du Nord compte six tomes, et celui-ci est le sixième. On y apprend à fabriquer et à réparer ce qu’on ne peut plus acheter : tanner une peau d’orignal, coudre des mocassins, affûter la hache, faire repartir la scie à chaîne, souder avec des batteries d’auto, transformer un ressort de camion en outil, et faire du savon et des chandelles avec du gras.",
}


def quatrieme(k, fichiers):
    d = bc.TOMES[k]
    lis = ''.join('<li><b>%s</b><span>%s</span></li>' % (n, esc(t)) for n, t in bc.SOMMAIRE[k])
    return f'''<div class="in">
    <div class="hd"><span>Le Manuel du Nord</span><span>Tome {k} · {esc(d['titre'])}</span></div>
    <div class="txt">
      <p>{typo(QUATRIEME[k]).replace(' °C', '&#8239;°C')}</p>
    </div>
    <div class="toc"><h2>Dans ce tome · chapitres <span class="nc">{d['ch'][0]}</span> à {d['ch'][1]}</h2><ol>{lis}</ol></div>
    <div class="bas">{auteurs(fichiers)}{serie(k)}</div>
  </div>'''


def tranche(k):
    d = bc.TOMES[k]
    return (f'<div class="sp"><div class="sn">{k}</div><div class="rule"></div>'
            f'<div class="vt"><b data-fit-v>{esc(d["titre"])}</b><span>Le Manuel du Nord</span></div></div>')


def devant(v, k, m):
    d = bc.TOMES[k]
    titre = '<br>'.join(esc(l) for l in d['h1'])
    if VARIANTES[v]['devant'] == 'affiche':
        st = sous_titre(k)
        return (f'<div class="hd hd-a"><span>Le Manuel du Nord</span><span>Tome {k}</span></div>'
                f'<div class="haut" data-boite><h1 class="titre" data-fit data-bas="{y_devant(m, 3.95)}">{titre}</h1>'
                + (f'<p class="sous">{typo(st)}</p>' if st else '') + '</div>')
    if VARIANTES[v]['devant'] == 'chiffre':
        return (f'<div class="hd hd-b"><span>Le Manuel du Nord</span><span>Tome {k} sur 6</span></div>'
                f'<div class="duo"><div class="num">{k}</div><h1 class="titre" data-fit data-haut=".hd-b">{titre}</h1></div>')
    bas = y_devant(m, CENTRE_BAS.get(k, 3.95))
    return (f'<div class="marque">Le Manuel du Nord</div>'
            f'<div class="centre"><div class="tome"><i></i><span>Tome {k}</span><i></i></div>'
            f'<h1 class="titre" data-fit data-haut=".marque" data-sommet=".tome" data-bas="{bas}">{titre}</h1></div>')


# « Tome N » est toujours à la même distance sous « Le Manuel du Nord » (JP, 19 octobre 2026 : « colle-le toujours à la
# même distance »), et le titre suit dessous ; il rapetisse s'il descend plus bas que 3,95 po depuis le haut du devant
# rogné, ou plus haut quand l'image monte (tome 6 : la colline enneigée, sur laquelle le titre crème ne se lit pas ;
# tome 2 : le cadre au mur). Les cotes sont celles de la couverture Blurb ; y_devant() les ramène au même point de l'image
# sur la couverture Lulu (3,95 po devient 4,44 po du haut de la planche).
CENTRE_BAS = {2: 3.1, 6: 3.3}

# Le cadrage de l'image en largeur sur la planche de Lulu : l'image couvre la hauteur de la couverture, wrap compris, et
# déborde alors de 0,8 po en largeur ; 0 la cale à gauche, 0,5 la centre sur la planche (le défaut), 1 la cale à droite.
# Les 0,1 po du bord droit de l'image ne servent jamais (celle du tome 6 y a un trait sombre) ; le wrap de droite que
# l'image ne couvre plus prolonge le bord de la planche (voir composer). Tome 6 : calée à droite, sinon le croissant de
# lune du coin du ciel passait le bord de la planche et se repliait sur le carton ; il reste à 0,18 po du bord.
CADRE_X = {6: 1.0}
BORD_IMAGE = 0.1                        # po de l'image, au bord droit, qui ne servent pas


# ------------------------------------------------------------------ gabarit
POLICES = ('<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800'
           '&family=IBM+Plex+Serif:ital,wght@0,400;0,700&display=block" rel="stylesheet">\n'
           # le signe moins (−35 °C) n'est pas dans le sous-ensemble latin de Google : second lien qui le recharge
           '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;700'
           '&text=%E2%88%92&display=block" rel="stylesheet">\n')

CSS = r'''
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#777}
body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
:root{--bc:'Barlow Condensed','Arial Narrow',sans-serif;--serif:'IBM Plex Serif',Georgia,serif}
.sheet{position:absolute;left:0;top:0;overflow:hidden;font-family:var(--bc);background-repeat:no-repeat;background-position:0 0;background-size:100% 100%}
.panel{position:absolute;top:0.125in;height:10in}
.back{left:0.125in;width:8in;color:var(--encre)}
.spine{color:var(--encre)}
.front{width:8in;color:#E2E7EA}
.nw{white-space:nowrap}

/* ---------- quatrième ---------- */
.back .in{position:absolute;inset:0.5in;display:flex;flex-direction:column}
.hd{display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:11px;border-bottom:1px solid var(--fort);
  font-weight:600;font-size:16px;line-height:1;letter-spacing:.24em;text-transform:uppercase;white-space:nowrap}
.back .hd{border-bottom:2.5pt solid var(--encre);padding-bottom:8px;font-weight:700}
.back .txt{margin-top:0.3in;font:400 13pt/18pt var(--serif);max-width:6.6in}
.back .txt p{margin:0 0 8pt}
.back .txt strong{font-weight:700}
.back h2{margin:0 0 6pt;padding-bottom:5pt;border-bottom:1.25pt solid var(--encre);font-weight:700;font-size:11pt;line-height:1;
  letter-spacing:.16em;text-transform:uppercase}
.back h2 .nc{text-transform:none}
.back .toc{margin-top:0.28in}
.back .toc ol{margin:0;padding:0;list-style:none;columns:2;column-gap:0.36in;font-weight:500;font-size:12.5pt;line-height:13.5pt}
.back .toc li{display:flex;gap:8pt;break-inside:avoid;padding:4.6pt 0 4.3pt;border-bottom:0.6pt solid var(--filet)}
.back .toc li b{width:24pt;flex:none;font-weight:700}
.back .bas{margin-top:auto}
.back .auteurs h2{margin-bottom:9pt}
.back .aut{display:grid;grid-template-columns:1fr 1fr;column-gap:0.36in}
.back .ph{float:left;shape-outside:circle(50%);shape-margin:0.1in;margin:2pt 0.11in 0 0;width:0.78in;height:0.78in;border-radius:50%;
  overflow:hidden;display:flex;align-items:center;justify-content:center;background:var(--disque)}
.back .ph img{display:block;width:100%;height:100%;object-fit:cover}
.back .ph.claude img{width:62%;height:62%}
.back .a p{margin:0;font:400 8.8pt/11.6pt var(--serif);hyphens:manual}
.back .a .n{font:700 12.5pt/1 var(--bc);letter-spacing:.02em;display:inline-block;margin-bottom:4pt}
.back .a .q{font:500 10pt/1 var(--bc);color:var(--douce)}
.serie{display:flex;gap:4pt;margin-top:0.3in}
.serie div{display:flex;flex-direction:column;gap:3pt;min-width:0}
.serie i{display:block;height:0.3in;border:1.25pt solid var(--encre);font:700 13pt/0.28in var(--bc);font-style:normal;padding-left:5pt}
.serie .on i{background:var(--encre);color:var(--fond)}
.serie small{font:600 8.5pt/1 var(--bc);letter-spacing:.06em;white-space:nowrap}

/* ---------- tranche ---------- */
.spine .sp{position:absolute;inset:0.42in 0 0.45in 0;display:flex;flex-direction:column;align-items:center}
.spine .sn{font:800 52pt/0.8 var(--bc);font-size:min(52pt, calc((var(--tr) - 0.125in) / 0.5));padding-top:4pt}
.spine .rule{width:calc(var(--tr) * 0.55);border-top:2.5pt solid var(--encre);margin:11pt 0 13pt}
.spine .vt{flex:1;min-height:0;writing-mode:vertical-rl;text-orientation:sideways;display:flex;justify-content:space-between;align-items:center;width:100%}
.spine .vt b{font-weight:800;font-size:31pt;line-height:1;text-transform:uppercase;letter-spacing:.02em;white-space:nowrap}
.spine .vt span{font-weight:600;font-size:9.5pt;line-height:1;letter-spacing:.26em;text-transform:uppercase;white-space:nowrap}

/* ---------- devant : A, l'affiche (mêmes cotes que la page de titre, en px de la page rognée) ---------- */
.front .hd{border-bottom:1px solid #4A6476}
.hd-a{position:absolute;left:56px;right:56px;top:52px}
.haut{position:absolute;left:50px;right:56px;top:104px;height:calc(4.45in - 104px);display:flex;flex-direction:column}   /* au-dessus des crêtes */
.titre{margin:0;font-weight:800;line-height:.84;letter-spacing:.01em;text-transform:uppercase;white-space:nowrap}
.haut .titre{font-size:236px}
.sous{margin:26px 0 0 8px;max-width:400px;text-wrap:balance;font-weight:500;font-size:23px;line-height:1.28;letter-spacing:.01em;color:#B9C7D1}

/* ---------- devant : B, le gros chiffre ---------- */
.hd-b{position:absolute;left:56px;right:56px;top:50px;font-weight:700;font-size:25px;letter-spacing:.2em;padding-bottom:14px}
.hd-b span+span{font-weight:600;font-size:16px;letter-spacing:.22em}
.duo{position:absolute;left:40px;right:56px;bottom:calc(10in - 3.92in);display:flex;align-items:last baseline;gap:26px}   /* le chiffre et la dernière ligne du titre sur la même ligne de base */
.duo .num{flex:none;font-weight:800;font-size:372px;line-height:.74;letter-spacing:-.02em;color:var(--accent)}
.duo .titre{flex:1;min-width:0;font-size:196px;line-height:.8}

/* ---------- devant : C, centré ---------- */
.marque{position:absolute;left:0.5in;right:0.5in;top:0.58in;text-align:center;font-weight:700;font-size:30px;line-height:1;
  letter-spacing:.32em;text-indent:.32em;text-transform:uppercase;white-space:nowrap}
.centre{position:absolute;left:0.45in;right:0.45in;top:1.17in;display:flex;flex-direction:column;justify-content:flex-start;align-items:center}
.centre .tome{display:flex;align-items:center;gap:16px;margin-bottom:20px;font-weight:600;font-size:19px;letter-spacing:.3em;text-transform:uppercase;color:#B9C7D1}
.centre .tome i{display:block;width:0.62in;border-top:1px solid #B9C7D1}
.centre .tome span{padding-left:.3em}
.centre .titre{align-self:stretch;font-size:250px;text-align:center;line-height:.8}   /* toute la largeur : un titre long rapetisse */

/* ---------- guides (--guides) ---------- */
.g{position:absolute;pointer-events:none}
.g.v{top:0;bottom:0;border-left:1px solid #00E5FF}
.g.h{left:0;right:0;border-top:1px solid #00E5FF}
.g.pli{border-left:1px dashed #FF00D4}
.g.tol{border-left:1px dotted #FFD000}
.g.sur{border:1px dashed #7CFF4A}
.g.cb{border:1px dashed #FFD000}
'''


def css_format(m):
    """Les cotes du gabarit CSS pour un format autre que Blurb. Le bloc de texte de la quatrième et la tranche
    descendent de d = marge − 0,5 po (la marge de Blurb), le haut du devant de dv = devant − 0,5 po : chacun garde les
    écarts de Blurb. Le bas de la quatrième s'arrête sur la zone du code-barres. Les bas des titres du devant (data-bas) suivent l'image,
    par y_devant(). Le titre du devant part d'une taille agrandie comme la largeur de la planche (e : 8,75 / 8) ; il
    rapetisse ensuite comme avant s'il manque de place (data-fit). Le reste du texte garde sa taille."""
    if m['format'] == 'blurb':
        return ''
    fp, pw, ph, mg, su = m['fp'], m['pw'], m['ph'], m['marge'], m['surete']
    # les boîtes des lettres (la hauteur de la police) débordent de leur ligne d'environ 0,02 po : 0,03 po d'air en haut et
    # en bas du bloc, pour qu'aucune ne passe la ligne de sûreté ni ne touche la zone du code-barres
    air = 0.03
    d = round(mg + air - FORMATS['blurb']['marge'], 4)
    dv, mv = round(m['devant'] - FORMATS['blurb']['devant'], 4), m['devant']
    e = pw / FORMATS['blurb']['pw']
    bas = round(su + m['cb'][1] + air, 4) if m['cb'] else mg + air
    return f'''
/* ---------- format {m['format']} : {m['nom']} ---------- */
.panel{{top:{fp}in;height:{ph}in}}
.back{{left:{fp}in;width:{pw}in}}
.front{{width:{pw}in}}
.back .in{{inset:{mg + air:.4g}in {mg}in {bas}in {mg}in}}
.back .txt{{max-width:{6.6 * (pw - 2 * mg) / (FORMATS['blurb']['pw'] - 2 * FORMATS['blurb']['marge']):.3f}in}}
.spine .sp{{inset:{0.42 + d:.4g}in 0 {max(0.45 + d, su):.4g}in 0}}
.hd-a{{top:calc(52px + {dv}in);left:calc(56px + {dv}in);right:calc(56px + {dv}in)}}
.haut{{top:calc(104px + {dv}in);left:calc(50px + {dv}in);right:calc(56px + {dv}in);height:calc({y_devant(m, 4.45)}in - 104px - {dv}in)}}
.hd-b{{top:calc(50px + {dv}in);left:calc(56px + {dv}in);right:calc(56px + {dv}in)}}
.duo{{left:calc(40px + {dv}in);right:calc(56px + {dv}in);bottom:calc({ph}in - {y_devant(m, 3.92)}in)}}
.marque{{top:{0.58 + dv:.4g}in;left:{mv}in;right:{mv}in}}
.centre{{top:{1.17 + dv:.4g}in;left:{mv - 0.05:.4g}in;right:{mv - 0.05:.4g}in}}
.haut .titre{{font-size:{236 * e:.1f}px}}
.duo .num{{font-size:{372 * e:.1f}px}}
.duo .titre{{font-size:{196 * e:.1f}px}}
.centre .titre{{font-size:{250 * e:.1f}px}}
'''


# Le PDF de l'imprimeur (--pdf) : la couverture en deux couches, sans aucune transparence (Lulu : « Flatten any
# transparent layers », « Vector images should be rasterized »). D'abord une capture à 300 ppp de tout sauf les lettres
# (le fond, les filets, les photos, les ombres des médaillons, l'étincelle de Claude) ; puis Chromium imprime le texte
# seul, en vectoriel, polices incorporées, par-dessus cette capture posée en fond, à la taille exacte de la page.
CSS_SANS_LETTRES = '.sheet *{color:transparent!important;text-shadow:none!important}'
CSS_LETTRES_SEULES = ('.sheet *{border-color:transparent!important;background:none!important;box-shadow:none!important}'
                      '.sheet img,.sheet .g{visibility:hidden!important}')

SCRIPT = r'''<script>
(function(){
  const FACES=['800 40px "Barlow Condensed"','700 40px "Barlow Condensed"','600 40px "Barlow Condensed"',
               '500 40px "Barlow Condensed"','400 12pt "IBM Plex Serif"','700 12pt "IBM Plex Serif"'];
  Promise.all(FACES.map(f=>document.fonts.load(f,'TENIRaéÀ−’01'))).then(()=>document.fonts.ready).then(()=>{
    // un titre trop grand pour sa place rapetisse (titres longs des tomes 4 et 5) : trop large, plus haut que sa boîte
    // (data-boite), descendu sous data-bas (po depuis le haut du devant rogné : la lune), ou monté à moins de 0,25 po
    // de ce qui est au-dessus de lui (data-haut ; data-sommet : le haut de son bloc, s'il porte une étiquette)
    document.querySelectorAll('[data-fit]').forEach(e=>{
      const pan=e.closest('.panel'), boite=e.closest('[data-boite]');
      const haut=e.dataset.haut?pan.querySelector(e.dataset.haut):null;
      const sommet=e.dataset.sommet?pan.querySelector(e.dataset.sommet):e;
      const trop=()=>e.scrollWidth>e.clientWidth+0.5 || (boite && boite.scrollHeight>boite.clientHeight+0.5) ||
        (haut && sommet.getBoundingClientRect().top<haut.getBoundingClientRect().bottom+24) ||
        (e.dataset.bas && e.getBoundingClientRect().bottom-pan.getBoundingClientRect().top>parseFloat(e.dataset.bas)*96);
      let s=parseFloat(getComputedStyle(e).fontSize);
      while(trop() && s>40){s-=2;e.style.fontSize=s+'px';}
    });
    document.querySelectorAll('[data-fit-v]').forEach(e=>{
      const box=e.parentElement; let s=parseFloat(getComputedStyle(e).fontSize);
      while(box.scrollHeight>box.clientHeight+0.5 && s>12){s-=1;e.style.fontSize=s+'px';}
    });
    if(location.hash==='#mesure'){
      // boîtes de tout ce qui est écrit ou tracé sur la couverture, en px CSS depuis le coin du fond perdu
      const out=[], sheet=document.querySelector('.sheet'), o=sheet.getBoundingClientRect();
      const cv=document.createElement('canvas').getContext('2d');
      const w=document.createTreeWalker(sheet,NodeFilter.SHOW_TEXT);
      let n;
      while((n=w.nextNode())){
        if(!n.textContent.trim()) continue;
        const el=n.parentElement, cs=getComputedStyle(el), fs=parseFloat(cs.fontSize);
        const r=document.createRange(); r.selectNodeContents(n);
        for(const b of r.getClientRects()){
          let top=b.top, bot=b.bottom;
          if(fs>=40 && cs.writingMode==='horizontal-tb'){
            // gros caractères : la boîte de l'encre, pas celle de la police (qui monte et descend loin des lettres)
            cv.font=cs.fontWeight+' '+fs+'px '+cs.fontFamily;
            const t=cv.measureText(cs.textTransform==='uppercase'?n.textContent.toUpperCase():n.textContent);
            const base=b.top+t.fontBoundingBoxAscent;
            top=base-t.actualBoundingBoxAscent; bot=base+t.actualBoundingBoxDescent;
          }
          out.push([b.left-o.left,top-o.top,b.right-o.left,bot-o.top,fs]);
        }
      }
      // les blocs de la quatrième entiers : une étoile entre deux lignes du sommaire se lit comme une puce
      sheet.querySelectorAll('img,.ph,.serie i,.rule,.hd,h2,.tome i,.back .txt,.back .toc,.back .auteurs,.back .serie').forEach(e=>{
        const b=e.getBoundingClientRect(); out.push([b.left-o.left,b.top-o.top,b.right-o.left,b.bottom-o.top,0]);
      });
      // le filet sous chaque ligne du sommaire : une étoile posée dessus se lit comme une tache (fs = -1, sans marge)
      sheet.querySelectorAll('.back .toc li').forEach(e=>{
        const b=e.getBoundingClientRect(); out.push([b.left-o.left,b.bottom-2-o.top,b.right-o.left,b.bottom+0.5-o.top,-1]);
      });
      const p=document.createElement('pre'); p.id='mesure'; p.textContent=JSON.stringify(out); document.body.appendChild(p);
    }
    document.documentElement.dataset.ready='1';
  });
})();
</script>'''


def page_html(v, k, m, pal, fichiers, fond, accent, guides=False, couche=None):
    """couche : None (la couverture), 'fond' (tout sauf les lettres) ou 'lettres' (les lettres seules, pour le PDF)."""
    vars_ = '--encre:%s;--douce:%s;--filet:%s;--fort:%s;--fond:%s;--disque:%s;--accent:%s;--tr:%gin' % (
        pal['encre'], pal['douce'], pal['filet'], pal['fort'], pal['fond'], fichiers['disque'], accent, m['tranche'])
    fp, su = m['fp'], m['surete']
    g = ''
    if guides:
        xs = [fp, m['x_tranche'], m['x_devant'], m['W'] - fp]
        g += ''.join('<div class="g v%s" style="left:%gin"></div>' % (' pli' if x in xs[1:3] else '', x) for x in xs)
        g += ''.join('<div class="g h" style="top:%gin"></div>' % y for y in (fp, m['H'] - fp))
        g += ''.join('<div class="g v tol" style="left:%gin"></div>' % x for x in
                     (m['x_tranche'] - 1 / 16, m['x_tranche'] + 1 / 16, m['x_devant'] - 1 / 16, m['x_devant'] + 1 / 16))
        g += ''.join('<div class="g sur" style="left:%gin;top:%gin;width:%gin;height:%gin"></div>' % (
            x + su, fp + su, m['pw'] - 2 * su, m['ph'] - 2 * su) for x in (fp, m['x_devant']))
        if m['cb']:
            g += '<div class="g cb" style="left:%gin;top:%gin;width:%gin;height:%gin"></div>' % (
                m['x_tranche'] - su - m['cb'][0], m['H'] - fp - su - m['cb'][1], m['cb'][0], m['cb'][1])
    css = CSS + css_format(m)
    if m['format'] != 'blurb' or couche:
        # Chromium pose la feuille au 1/64 de px CSS : le bout de pixel qui reste au bord droit prend la couleur du fond
        css += 'html,body{background:%s}' % pal['fond']
    if couche == 'fond':
        css += CSS_SANS_LETTRES
    elif couche == 'lettres':
        css += CSS_LETTRES_SEULES + '@page{size:%.4fin %gin;margin:0}html,body{width:%.4fin;height:%gin;overflow:hidden}' % (
            m['W'], m['H'], m['W'], m['H'])
    return f'''<!DOCTYPE html>
<html lang="fr-CA"><head><meta charset="utf-8">
<title>Le Manuel du Nord, tome {k} : couverture {v}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
{POLICES}<style>{css}.back .ph{{{BULLES[BULLE]}}}</style></head>
<body>
<div class="sheet v{v}" style="width:{m['W']:.4f}in;height:{m['H']}in;background-color:{pal['fond']};{('background-image:url(' + fond + ');') if fond else ''}{vars_}">
  <div class="panel back">{quatrieme(k, fichiers)}</div>
  <div class="panel spine" style="left:{m['x_tranche']:.4f}in;width:{m['tranche']}in">{tranche(k)}</div>
  <div class="panel front" style="left:{m['x_devant']:.4f}in">{devant(v, k, m)}</div>
  {g}
</div>
{SCRIPT}
</body></html>
'''


# ------------------------------------------------------------------ portraits des auteurs
def portraits(v, k, pal, ciel, dest):
    """La photo de JP en bichromie (l'ombre à la couleur sombre, le fond de la photo à la claire) et l'étincelle de
    Claude à la couleur sombre, sur un disque de la couleur claire : les deux cercles se répondent."""
    if VARIANTES[v]['dos'] == 'tome':
        sombre, clair = sorted(bc.COUL[k][:2], key=lambda c: sum(a * b for a, b in zip(rgb(c), (.2126, .7152, .0722))))
    else:
        sombre, clair = ciel, CLAIR
    src = Image.open(os.path.join(ROOT, 'images', 'auteurs', 'jp.jpg')).crop((45, 5, 345, 305)).convert('L')
    src = src.point([min(255, round(x * 255 / 245)) for x in range(256)])     # le fond de la photo au blanc franc
    jp = 'auteur-jp-%s.png' % v
    Image.merge('RGB', [src.point([round(a + (b - a) * x / 255) for x in range(256)]) for a, b in zip(rgb(sombre), rgb(clair))]
                ).save(os.path.join(dest, jp), optimize=True)
    s = open(os.path.join(ROOT, 'images', 'auteurs', 'claude.svg'), encoding='utf-8').read()
    claude = 'auteur-claude-%s.svg' % v
    open(os.path.join(dest, claude), 'w', encoding='utf-8').write(re.sub(r'#D97757', sombre, s, flags=re.I))
    return {'jp': jp, 'claude': claude, 'disque': clair}


# ------------------------------------------------------------------ l'image de fond, composée à plat
def composer(v, m, img, pal, ppp):
    """Le fond de toute la couverture, fond perdu ou wrap compris : la quatrième et la tranche (aplat ou ciel étoilé),
    l'image du tome sur le devant (Blurb : 8,125 × 10,25 po, centrée en largeur ; Lulu : 9,375 × 12,75 po, centrée sur
    la planche), calée en haut comme sur la page de titre."""
    Wp, Hp = round(m['W'] * ppp), round(m['H'] * ppp)
    xf = round(m['x_devant'] * ppp)
    can = np.empty((Hp, Wp, 3), np.uint8)
    can[:, :xf] = rgb(pal['fond'])
    fw = Wp - xf
    iw, ih = img.size
    s = max(fw / iw, Hp / ih)
    rw, rh = round(iw * s), round(ih * s)
    grande = np.asarray(img.resize((rw, rh), Image.LANCZOS))
    cx0 = (rw - fw) // 2
    if m['format'] != 'blurb':
        # le milieu de l'image au milieu de la planche, sous le titre centré, ou calée selon CADRE_X ; ce qui manque au
        # wrap de droite est l'image en miroir
        pwp, utile = round(m['pw'] * ppp), rw - int(BORD_IMAGE * ppp)
        cx0 = max(0, min(utile - pwp, int((rw - pwp) * CADRE_X.get(m['tome'], 0.5))))
        dev = grande[:Hp, cx0:min(cx0 + fw, utile)]
        n = fw - dev.shape[1]
        if n > 0:
            # le wrap de droite que l'image ne couvre plus : le ciel s'étire depuis le bord de la planche (en miroir, le
            # croissant du tome 6 y revenait en double), le paysage s'y reflète ; le ciel s'arrête à la première ligne
            # où le bord de la planche s'écarte de sa couleur (le haut de la colline)
            bord = ndi.median_filter(dev[:, -1].astype(np.float32), size=(int(0.05 * ppp) | 1, 1))
            Lb = bord @ np.array([.2126, .7152, .0722], np.float32)
            Lc = float(np.array(rgb(pal['fond']), np.float32) @ np.array([.2126, .7152, .0722], np.float32))
            hors = np.nonzero(np.abs(Lb - Lc) > 40)[0]
            y_p = int(hors[0]) if len(hors) else Hp
            ajout = dev[:, -n:][:, ::-1].copy()
            ajout[:y_p] = np.clip(np.rint(bord[:y_p]), 0, 255).astype(np.uint8)[:, None, :]
            dev = np.concatenate([dev, ajout], axis=1)
        can[:, xf:] = dev
    else:
        can[:, xf:] = grande[:Hp, cx0:cx0 + fw]
    bandes = []
    if VARIANTES[v]['dos'] == 'etoiles':
        # le ciel de l'image, reflété au pli du devant (le ciel passe le pli sans raccord), puis en miroir : les étoiles
        # sont celles de l'image, à la même taille. Les autres raccords du miroir tombent sur une ligne et une colonne
        # sans étoile, sinon une étoile coupée par le raccord se dédouble (deux points collés).
        L = grande[:int(0.42 * rh)].astype(np.float32) @ np.array([.2126, .7152, .0722], np.float32)
        # les tailles de ce recadrage sont réglées sur l'image de la couverture Blurb ; sur une couverture où l'image
        # est plus grande (Lulu : 1,24 fois), elles grandissent avec elle (zoom), sinon une cime d'épinette fine du
        # tome 4 passait les filtres et revenait au dos en petits traits sombres, répétés par le miroir
        b = FORMATS['blurb']
        zoom = 1.0 if m['format'] == 'blurb' else s / max((b['pw'] + b['fp']) * ppp / iw, (b['ph'] + 2 * b['fp']) * ppp / ih)
        t = int(0.09 * ppp * zoom) | 1
        ch = L - ndi.grey_opening(L, size=(t, t))
        lignes = ch[:, cx0:].max(axis=1)
        r_hi = int(0.33 * rh) + int(np.argmin(lignes[int(0.33 * rh):int(0.39 * rh)]))   # au-dessus de la lune et des crêtes
        # quand les collines montent plus haut (tome 6), le miroir s'arrête au-dessus de leur sommet : la première ligne
        # où le ciel, débarrassé de ses étoiles, s'écarte de sa couleur
        Lr = ndi.grey_closing(ndi.grey_opening(L, size=(t, t)), size=(t, t))
        ciel_r = float(np.median(Lr[:int(0.1 * rh), cx0:cx0 + max(8, int(0.2 * rw))]))
        ecarte = (np.abs(Lr[:, cx0:int(0.94 * rw)] - ciel_r) > 14).mean(axis=1) > 0.002
        pres = np.nonzero(ecarte[int(0.15 * rh):])[0]
        if len(pres):
            lim = int(0.15 * rh) + int(pres[0]) - int(0.04 * ppp * zoom)
            a_ = max(int(0.15 * rh), lim - int(0.05 * rh))
            if a_ < lim < r_hi:          # une cime d'épinette tout en haut (tome 4) : la règle des colonnes s'en charge
                r_hi = a_ + int(np.argmin(lignes[a_:lim]))
        r_lo = int(np.argmin(lignes[:int(0.03 * rh)]))
        colonnes = ch[r_lo:r_hi].max(axis=0)
        c_hi = int(0.94 * rw) + int(np.argmin(colonnes[int(0.94 * rw):]))
        # tout ce qui n'est pas le ciel (une épinette qui monte, la lune) ne passe pas au dos : les petites étoiles
        # s'effacent par une ouverture, puis chaque colonne qui s'écarte du ciel arrête le miroir (tomes 4 et 6)
        Lf = ndi.grey_opening(L[r_lo:r_hi], size=(t, t))
        Lf = ndi.grey_closing(Lf, size=(t, t))
        ciel_L = float(np.median(Lf[:, cx0:cx0 + max(8, int(0.2 * rw))]))
        hors = (np.abs(Lf - ciel_L) > 14).mean(axis=0)
        mauvais = np.nonzero(hors[cx0 + int(0.25 * rw):] > 0.004)[0]
        if len(mauvais):
            c_hi = min(c_hi, cx0 + int(0.25 * rw) + int(mauvais[0]) - int(0.06 * ppp * zoom))
        if m['format'] != 'blurb':
            # une pointe sombre qui monte du bas du carré repris (la cime d'une épinette du tome 4, le clou du cadre du
            # tome 2) reviendrait au dos en petits triangles, répétés par le miroir : le carré s'arrête au-dessus d'elle,
            # sur une ligne sans étoile
            for _ in range(3):
                bloc = L[r_lo:r_hi, cx0:c_hi]
                lab, n = ndi.label(bloc < float(np.median(bloc)) - 25)
                pointes = [sl[0].start for sl in ndi.find_objects(lab) or [] if
                           (sl[0].stop - sl[0].start) * (sl[1].stop - sl[1].start) > 4 and
                           sl[0].stop >= bloc.shape[0] - int(0.15 * ppp * zoom)]
                if not pointes:
                    break
                b_ = r_lo + min(pointes) - int(0.04 * ppp * zoom)
                a_ = max(r_lo + 1, b_ - int(0.05 * rh))
                if b_ <= a_:
                    break
                r_hi = a_ + int(np.argmin(lignes[a_:b_]))
        def aller_retour(z, a, b):            # a, a+1, … b-1, b-1, … a, a, … : miroir entre a et b
            p = b - a
            m_ = np.mod(z, 2 * p)
            return np.where(m_ < p, a + m_, a + 2 * p - 1 - m_)
        y = np.arange(Hp)
        rows = np.where(y < r_hi, y, (r_hi - 1) - (aller_retour(y - r_hi, 0, r_hi - r_lo)))
        cols = aller_retour(xf - 1 - np.arange(xf), cx0, c_hi)
        can[:, :xf] = grande[rows[:, None], cols[None, :]]
        # une étoile proche d'un raccord a sa jumelle à quelques millimètres : on vide une bande de chaque côté des
        # raccords, et du côté tranche du pli (rectangles en px CSS, sans marge : fs = -1)
        q, b_ = 96 / ppp, 0.22 * 96
        p = r_hi - r_lo
        for y0 in range(r_hi, Hp, p):
            bandes.append((0, y0 * q - b_, xf * q, y0 * q + b_, -1))
        xs = xf - (c_hi - cx0)
        if xs > 0:
            bandes.append((xs * q - b_, 0, xs * q + b_, Hp * q, -1))
        bandes.append((xf * q - b_, 0, xf * q, Hp * q, -1))
        print('    ciel recadré : lignes %d à %d, colonnes %d à %d de l\'image agrandie' % (r_lo, r_hi, cx0, c_hi))
    return can, bandes


def motif_dos(k, v, can, rects, m, ppp, img):
    """Des éléments de l'image du devant qui reviennent au dos, comme les étoiles du tome 1 (JP, 19 octobre 2026 :
    « j'aime que pour le tome 1 on retrouve des éléments de la couverture en arrière, les étoiles ; fais-le pour les
    autres »). Chaque tome a son module images/tomes/essais-ia/tome-N/dos.py, avec une fonction motif(can, info) qui
    dessine sur la quatrième et la tranche (colonnes 0 à info['xf'] du fond) et rend le fond. info : xf, xt (début de la
    tranche), H, ppp, rects (les boîtes du texte en px CSS : x0, y0, x1, y1, taille ; 1 px CSS = ppp / 96 px du fond),
    image (le PIL de l'image du devant), tome, variante ; et pour le format : format ('lulu' ou 'blurb'), fp (wrap ou
    fond perdu, po), bord (po du bord du fond jusqu'à la zone sûre : 0,375 en Blurb, 1,25 en Lulu), x_po (une cote de la
    quatrième prise sur la couverture Blurb, en po depuis le bord du fond perdu, ramenée au même point du bloc de texte
    de ce format : l'identité en Blurb). Pas de module : le fond ne change pas."""
    f = os.environ.get('DOS_MODULE') or os.path.join(ROOT, 'images', 'tomes', 'essais-ia', 'tome-%d' % k, 'dos.py')   # DOS_MODULE : un essai
    if VARIANTES[v]['dos'] != 'etoiles' or not os.path.exists(f):
        return can
    import importlib.util
    spec = importlib.util.spec_from_file_location('dos_tome_%d' % k, f)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    info = dict(xf=round(m['x_devant'] * ppp), xt=round(m['x_tranche'] * ppp), H=can.shape[0], ppp=ppp,
                rects=list(rects), image=img, tome=k, variante=v, format=m['format'], fp=m['fp'],
                bord=m['fp'] + m['surete'], x_po=lambda x: x_quatrieme(m, x))
    out = mod.motif(can.copy(), info)
    print('    dos : motif de %s' % os.path.relpath(f, ROOT))
    return out


def nettoyer(can, rects, ppp, serre=False):
    """Retire les étoiles qui touchent une lettre ou un filet : petites taches claires sur fond sombre (chapeau haut
    de forme), dont la tache entière touche la boîte d'un texte élargie d'une marge. Les crêtes, la lune et les traits
    de neige sont trop grands pour être pris. Le trou se bouche à la moyenne locale du ciel sans étoiles.
    serre (tome 1, JP, 19 octobre 2026 : « on peut rajouter des étoiles au travers du texte, tant qu'elles ne touchent
    pas à des mots, sur les côtés du texte et partout ») : les blocs de texte entiers ne comptent plus, seulement
    chaque ligne avec une petite marge, les filets du sommaire et les titres ; les étoiles restent entre les lignes, entre
    les colonnes et autour des blocs."""
    H, W = can.shape[:2]
    k = 0.0104 * ppp                      # 1 px CSS en px de l'image
    zone = np.zeros((H, W), bool)
    po = 96                               # px CSS par pouce
    lignes = [r for r in rects if r[4] > 0]
    for x0, y0, x1, y1, fs in rects:
        if serre and fs == 0 and y1 - y0 > .35 * po and sum(1 for t in lignes if t[0] >= x0 - 3 and t[2] <= x1 + 3
                                                         and t[1] >= y0 - 3 and t[3] <= y1 + 3) >= 2:
            continue                      # un bloc de plusieurs lignes : ses lignes suffisent (un titre et son filet restent)
        # marge plus large sur la ligne du texte que dessus et dessous : une étoile au bout d'un mot se lit comme un point
        if fs < 0:
            mx = my = 0
        elif fs and serre:
            mx, my = min(max(.6 * fs, .08 * po), .15 * po), .03 * po
        elif fs:
            mx, my = min(max(1.0 * fs, .15 * po), .3 * po), min(max(.5 * fs, .12 * po), .2 * po)
        else:
            mx = my = .12 * po
        a, b = max(0, int((y0 - my) * k)), min(H, int(np.ceil((y1 + my) * k)))
        c, d = max(0, int((x0 - mx) * k)), min(W, int(np.ceil((x1 + mx) * k)))
        zone[a:b, c:d] = True
    if not zone.any():
        return can, 0
    ys, xs = np.where(zone)
    p = int(0.3 * ppp)
    a, b, c, d = max(0, ys.min() - p), min(H, ys.max() + p), max(0, xs.min() - p), min(W, xs.max() + p)
    sous = can[a:b, c:d].astype(np.float32)
    L = sous @ np.array([.2126, .7152, .0722], np.float32)
    t = int(0.09 * ppp) | 1
    ouvert = ndi.grey_opening(L, size=(t, t))
    cand = ((L - ouvert) > 12) & (ouvert < 80)
    lab, n = ndi.label(cand)
    if not n:
        return can, 0
    z = zone[a:b, c:d]
    taille = np.bincount(lab.ravel())
    ids = np.unique(lab[z & cand])
    ids = ids[ids > 0]
    objets = ndi.find_objects(lab)
    cote = 0.25 * ppp                     # une grappe de deux ou trois étoiles passe ; une crête ou un trait de neige, non
    garder = [i for i in ids if taille[i] <= (0.12 * ppp) ** 2 and
              (objets[i - 1][0].stop - objets[i - 1][0].start) <= cote and (objets[i - 1][1].stop - objets[i - 1][1].start) <= cote]
    if not garder:
        return can, 0
    masque = ndi.binary_dilation(np.isin(lab, garder), iterations=max(1, round(0.012 * ppp)))
    poids = (~(cand | masque)).astype(np.float32)
    sig = 0.04 * ppp
    den = np.maximum(ndi.gaussian_filter(poids, sig), 1e-3)
    for ch in range(3):
        moy = ndi.gaussian_filter(sous[..., ch] * poids, sig) / den
        sous[..., ch][masque] = moy[masque]
    can[a:b, c:d] = np.clip(np.rint(sous), 0, 255).astype(np.uint8)
    return can, len(garder)


# ------------------------------------------------------------------ Chromium
def chromium():
    c = sorted(glob.glob('/opt/pw-browsers/chromium-*/chrome-linux/chrome'))
    c = c[-1] if c else (shutil.which('chromium') or shutil.which('google-chrome'))
    if not c:
        sys.exit('Chromium introuvable (/opt/pw-browsers/chromium-*/chrome-linux/chrome)')
    return c


def chrome(args, timeout=180):
    prof = tempfile.mkdtemp(prefix='chr-')
    try:
        r = subprocess.run([chromium(), '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
                            '--no-first-run', '--no-default-browser-check', '--user-data-dir=' + prof,
                            '--run-all-compositor-stages-before-draw', '--virtual-time-budget=30000'] + args,
                           capture_output=True, timeout=timeout)
        return r.stdout.decode('utf-8', 'replace')
    finally:
        shutil.rmtree(prof, ignore_errors=True)


def mesurer(fichier, m):
    for essai in range(3):
        dom = chrome(['--window-size=%d,%d' % (int(m['W'] * 96) + 2, int(m['H'] * 96) + 200), '--dump-dom',
                      'file://' + fichier + '#mesure'])
        x = re.search(r'<pre id="mesure">(.*?)</pre>', dom, re.S)
        if x and 'data-ready="1"' in dom:
            return json.loads(html.unescape(x.group(1)))
    sys.exit('mesure impossible : %s (polices de Google non chargées ?)' % fichier)


def capturer(fichier, png, m, ppp):
    """Fenêtre plus haute que la couverture (Chromium sans fenêtre prend une barre sur la hauteur), puis on rogne."""
    for essai in range(3):
        if os.path.exists(png):
            os.remove(png)
        chrome(['--window-size=%d,%d' % (int(m['W'] * 96) + 2, int(m['H'] * 96) + 200),
                '--force-device-scale-factor=%g' % (ppp / 96), '--screenshot=' + png, 'file://' + fichier])
        if os.path.exists(png):
            im = Image.open(png).convert('RGB')
            im.crop((0, 0, round(m['W'] * ppp), round(m['H'] * ppp))).save(png, optimize=True)
            return
    sys.exit('capture impossible : ' + png)


# ------------------------------------------------------------------ planche de choix
def planche(k, m, pngs, ppp, sortie, travail):
    """Les variantes côte à côte, rognées (sans le fond perdu ni le wrap), la lettre au-dessus ; une coche aux deux
    plis."""
    fp, pw = m['fp'], m['pw']
    rog = round(fp * ppp)
    cols = []
    for v, f in pngs:
        im = Image.open(f)
        im = im.crop((rog, rog, im.width - rog, im.height - rog))
        L = 1150
        im = im.resize((L, round(im.height * L / im.width)), Image.LANCZOS)
        nom = 'p-%s.png' % v
        im.save(os.path.join(travail, nom))
        g = pw / (m['W'] - 2 * fp) * 100
        dr = (pw + m['tranche']) / (m['W'] - 2 * fp) * 100
        cols.append(f'''<div class="col"><div class="let">{v}</div><div class="nom">{esc(VARIANTES[v]['nom'])}</div>
<div class="cv"><img src="{nom}" alt="">{''.join('<i class="%s" style="left:%.3f%%"></i>' % (c, x) for x in (g, dr) for c in ('h', 'b'))}</div>
<div class="res">{esc(VARIANTES[v]['resume'][0].upper() + VARIANTES[v]['resume'][1:])}.</div></div>''')
    w = 3 * 1150 + 4 * 70
    doc = f'''<!DOCTYPE html><html lang="fr-CA"><head><meta charset="utf-8">{POLICES}<style>
html,body{{margin:0;background:#D5D9DC}}
.b{{display:flex;gap:70px;padding:56px 70px 60px;width:{w}px;box-sizing:border-box;font-family:'Barlow Condensed',sans-serif;color:#15222B}}
.col{{width:1150px}}
.let{{font-weight:800;font-size:96px;line-height:.9}}
.nom{{font-weight:700;font-size:30px;letter-spacing:.04em;text-transform:uppercase;margin:6px 0 22px}}
.cv{{position:relative;box-shadow:0 2px 0 rgba(0,0,0,.18),0 10px 26px rgba(0,0,0,.22)}}
.cv img{{display:block;width:100%}}
.cv i{{position:absolute;height:12px;border-left:2px solid #15222B;margin-left:-1px}}
.cv i.h{{top:-17px}} .cv i.b{{bottom:-17px}}
.res{{font-weight:500;font-size:24px;line-height:1.25;margin-top:24px}}
</style></head><body><div class="b">{''.join(cols)}</div>
<script>document.fonts.ready.then(()=>document.documentElement.dataset.ready='1')</script></body></html>'''
    f = os.path.join(travail, 'planche.html')
    open(f, 'w', encoding='utf-8').write(doc)
    out = os.path.join(sortie, 'tome-%d-couvertures.png' % k)
    h = 56 + 96 + 6 + 36 + 22 + round(1150 * m['ph'] / (m['W'] - 2 * fp)) + 24 + 70 + 60
    chrome(['--window-size=%d,%d' % (w, h + 200), '--screenshot=' + out, 'file://' + f])
    Image.open(out).convert('RGB').crop((0, 0, w, h)).save(out, optimize=True)
    return out


# ------------------------------------------------------------------ contrôles du format
def hors_zone(m, rects):
    """Les lignes de texte (boîtes mesurées dans Chromium) qui sortent de la zone sûre de leur planche, entrent dans la
    zone du code-barres, ou passent à moins de 1/16 po d'un bord de la tranche. Rend une liste de messages."""
    po = 96.0
    fp, su, W, H = m['fp'], m['surete'], m['W'], m['H']
    xt, xd = m['x_tranche'], m['x_devant']
    haut, bas = fp + su, H - fp - su
    cb = None
    if m['cb']:
        cb = (xt - su - m['cb'][0], H - fp - su - m['cb'][1], xt - su, H - fp - su)
    e = 0.005                                  # po : l'arrondi des boîtes
    out = []
    for x0, y0, x1, y1, fs in rects:
        if fs <= 0:
            continue
        a, b, c, d = x0 / po, y0 / po, x1 / po, y1 / po
        if c <= xt + e:
            zone, g, dr = 'quatrième', fp + su, xt - su
        elif a >= xd - e:
            zone, g, dr = 'devant', xd + su, W - fp - su
        else:
            zone, g, dr = 'tranche', xt + 1 / 16, xd - 1 / 16
        if a < g - e or c > dr + e or b < haut - e or d > bas + e:
            out.append('%s : boîte %.3f, %.3f à %.3f, %.3f po hors de la zone sûre' % (zone, a, b, c, d))
        if cb and zone == 'quatrième' and a < cb[2] - e and c > cb[0] + e and b < cb[3] - e and d > cb[1] + e:
            out.append('quatrième : boîte %.3f, %.3f à %.3f, %.3f po dans la zone du code-barres' % (a, b, c, d))
    return out


def controle_gabarit(png, gabarit, out, ppp):
    """L'image de contrôle : la couverture, avec le gabarit de Lulu par-dessus en transparence (le wrap bleu clair, la
    bande de sûreté bleu foncé, la tranche violette, la zone du code-barres jaune ; le blanc de la zone sûre ne couvre
    rien). Le gabarit doit avoir la taille de la couverture, au pixel près."""
    tmp = tempfile.mkdtemp(prefix='gab-')
    try:
        subprocess.run(['pdftoppm', '-r', '%g' % ppp, '-png', '-singlefile', gabarit, os.path.join(tmp, 'g')], check=True)
        g = np.asarray(Image.open(os.path.join(tmp, 'g.png')).convert('RGB')).astype(np.float32)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    c = np.asarray(Image.open(png).convert('RGB')).astype(np.float32)
    if abs(g.shape[0] - c.shape[0]) > 1 or abs(g.shape[1] - c.shape[1]) > 1:
        sys.exit('le gabarit (%d × %d px) n\'a pas la taille de la couverture (%d × %d px)' % (
            g.shape[1], g.shape[0], c.shape[1], c.shape[0]))
    h, w = min(g.shape[0], c.shape[0]), min(g.shape[1], c.shape[1])
    g, c = g[:h, :w], c[:h, :w]
    # les deux zones sûres sont les grands rectangles blancs : rien de ce qui est dedans (le logo, les notes de Lulu) ne
    # se pose sur la couverture, sauf la zone du code-barres, jaune
    lab, n = ndi.label(g.min(2) > 235)
    dedans = np.zeros((h, w), bool)
    for sl in ndi.find_objects(lab):
        if (sl[0].stop - sl[0].start) * (sl[1].stop - sl[1].start) > (ppp * 1.0) ** 2:
            dedans[sl] = True
    jaune, n = ndi.label((g[..., 0] > 200) & (g[..., 1] > 190) & (g[..., 2] < 80))
    taille = np.bincount(jaune.ravel())
    jaune = np.isin(jaune, [i for i in range(1, n + 1) if taille[i] > (ppp * 0.5) ** 2])   # pas le petit trait jaune
    a = np.where(~dedans | jaune, 0.42, 0.0)[..., None]                                   # de la légende de Lulu
    o = c * (1 - a) + g * a
    Image.fromarray(np.clip(np.rint(o), 0, 255).astype(np.uint8)).save(out, optimize=True)
    return out


def imprimer_pdf(v, k, m, pal, fichiers, fond, accent, travail, pdf):
    """Le PDF à téléverser : une page à la taille exacte de la couverture (wrap compris), RVB, sans transparence. La
    couche sans les lettres est capturée à 300 ppp et posée en fond ; Chromium imprime les lettres par-dessus, en
    vectoriel, polices incorporées (voir CSS_SANS_LETTRES). La boîte de la page est ramenée au centième de point, comme
    celle du gabarit de Lulu (19,813 po : 1426,54 pt)."""
    ppp = 300
    f_fond = os.path.join(travail, 'pdf-fond-%s.html' % v)
    open(f_fond, 'w', encoding='utf-8').write(page_html(v, k, m, pal, fichiers, fond, accent, couche='fond'))
    png = os.path.join(travail, 'pdf-fond-%s.png' % v)
    capturer(f_fond, png, m, ppp)
    jpg = 'pdf-fond-%s.jpg' % v
    Image.open(png).convert('RGB').save(os.path.join(travail, jpg), quality=95, subsampling=0, dpi=(ppp, ppp))
    f_let = os.path.join(travail, 'pdf-lettres-%s.html' % v)
    open(f_let, 'w', encoding='utf-8').write(page_html(v, k, m, pal, fichiers, jpg, accent, couche='lettres'))
    os.makedirs(os.path.dirname(os.path.abspath(pdf)), exist_ok=True)
    brut = os.path.join(travail, 'brut-%s.pdf' % v)
    for essai in range(3):
        if os.path.exists(brut):
            os.remove(brut)
        chrome(['--no-pdf-header-footer', '--print-to-pdf=' + brut, 'file://' + f_let], timeout=300)
        if os.path.exists(brut):
            break
    else:
        sys.exit('impression impossible : ' + pdf)
    import pypdf
    r = pypdf.PdfReader(brut)
    if len(r.pages) != 1:
        sys.exit('le PDF a %d pages au lieu d\'une : %s' % (len(r.pages), brut))
    # Chromium arrondit la largeur de la page au centième de pouce supérieur (19,813 po : 19,82 po, 1427,04 pt) ; la
    # couverture est posée depuis le coin en haut à gauche, à l'échelle 1 : la bande de trop, à droite, est vide, et la
    # boîte de la page la retire
    w, h = round(m['W'] * 72, 2), round(m['H'] * 72, 2)
    p = r.pages[0]
    dw, dh = float(p.mediabox.width) - w, float(p.mediabox.height) - h
    if not (-0.01 <= dw <= 1.0 and -0.01 <= dh <= 1.0) or float(p.mediabox.left) or float(p.mediabox.bottom):
        sys.exit('page de %.3f × %.3f pt au lieu de %.2f × %.2f' % (p.mediabox.width, p.mediabox.height, w, h))
    wr = pypdf.PdfWriter(clone_from=r)
    for b in ('mediabox', 'cropbox', 'trimbox', 'bleedbox'):
        setattr(wr.pages[0], b, pypdf.generic.RectangleObject([0, round(dh, 3), w, round(dh + h, 3)]))
    wr.add_metadata({'/Title': 'Le Manuel du Nord, tome %d : couverture (%s)' % (k, m['nom'])})
    with open(pdf, 'wb') as fo:
        wr.write(fo)
    return pdf


def planche_des_six(dossier, out):
    """La planche des six couvertures (LISEZMOI) : fond blanc, chaque couverture entière (wrap ou fond perdu compris)
    ramenée à 1300 px de large, « Tome N » au-dessus en DejaVu Sans Bold 30 px."""
    from PIL import ImageDraw, ImageFont
    L = 1300
    ims = []
    for k in range(1, 7):
        im = Image.open(os.path.join(dossier, 'couverture-tome-%d-C.png' % k)).convert('RGB')
        ims.append(im.resize((L, round(im.height * L / im.width)), Image.LANCZOS))
    p = Image.new('RGB', (L + 40, sum(56 + im.height for im in ims) + 20), 'white')
    d = ImageDraw.Draw(p)
    police = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 30)
    y = 0
    for k, im in enumerate(ims, 1):
        d.text((20, y + 12), 'Tome %d' % k, font=police, fill='black')
        p.paste(im, (20, y + 56))
        y += 56 + im.height
    p.save(out, optimize=True)
    return out


# ------------------------------------------------------------------ main
def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--tome', type=int, default=1)
    ap.add_argument('--format', choices=sorted(FORMATS), default='lulu')
    ap.add_argument('--image')
    ap.add_argument('--variantes', default='ABC')
    ap.add_argument('--ppp', type=float, default=150)
    ap.add_argument('--fond-ppp', type=float, default=300)
    ap.add_argument('--accent', default=CUIVRE)
    ap.add_argument('--bulle', choices=sorted(BULLES), help='la bulle des photos des auteurs (BULLE par défaut)')
    ap.add_argument('--guides', action='store_true')
    ap.add_argument('--pdf', metavar='DIR', help='le PDF de l\'imprimeur de la première variante : DIR/couverture-tome-N.pdf')
    ap.add_argument('--controle', action='store_true',
                    help='l\'image de contrôle, la couverture sous le gabarit de Lulu du tome (sources/lulu-captures/)')
    ap.add_argument('--six', action='store_true', help='refait les-six-couvertures.png dans --sortie, puis s\'arrête')
    ap.add_argument('--garder')
    ap.add_argument('--sortie', default=ICI)
    o = ap.parse_args()
    if o.six:
        print('planche des six :', os.path.relpath(planche_des_six(o.sortie, os.path.join(o.sortie, 'les-six-couvertures.png')), ROOT))
        return
    global BULLE
    BULLE = o.bulle or BULLE
    k = o.tome
    m = mesures(k, o.format)
    image = o.image or os.path.join(ROOT, 'images', 'tomes', 'titre-tome-%d.jpg' % k)
    img = Image.open(image).convert('RGB')
    m['image'] = img.size
    ciel = couleur_du_ciel(img)
    gabarit = None
    if o.controle:
        g = sorted(glob.glob(os.path.join(ROOT, 'sources', 'lulu-captures', 'gabarit-couverture-tome-%d-*.pdf' % k)))
        if o.format != 'lulu' or not g:
            sys.exit('--controle : pas de gabarit de Lulu pour le tome %d (sources/lulu-captures/)' % k)
        gabarit = g[-1]
    travail = os.path.abspath(o.garder) if o.garder else tempfile.mkdtemp(prefix='couv-')
    os.makedirs(travail, exist_ok=True)
    os.makedirs(o.sortie, exist_ok=True)
    print('tome %d, %s : %d p., tranche %s po (%s) ; couverture %.3f × %.2f po ; ciel %s' % (
        k, m['nom'], m['pages'], m['tranche'], m['prov'], m['W'], m['H'], ciel))
    pngs = []
    try:
        for v in o.variantes:
            pal = palette(v, k, ciel)
            fichiers = portraits(v, k, pal, ciel, travail)
            accent = o.accent
            f = os.path.join(travail, 'couverture-%s.html' % v)
            open(f, 'w', encoding='utf-8').write(page_html(v, k, m, pal, fichiers, None, accent))
            rects = mesurer(f, m)
            for msg in hors_zone(m, rects):
                print('    ATTENTION, ' + msg)
            can, bandes = composer(v, m, img, pal, o.fond_ppp)
            can, n = nettoyer(can, rects + bandes, o.fond_ppp, serre=(k == 1))
            can = motif_dos(k, v, can, rects, m, o.fond_ppp, img)     # après : le nettoyage ne rogne pas les motifs
            fond = 'fond-%s.jpg' % v
            Image.fromarray(can).save(os.path.join(travail, fond), quality=92, subsampling=0)
            open(f, 'w', encoding='utf-8').write(page_html(v, k, m, pal, fichiers, fond, accent, o.guides))
            png = os.path.join(o.sortie, 'couverture-tome-%d-%s%s.png' % (k, v, '-guides' if o.guides else ''))
            capturer(f, png, m, o.ppp)
            pngs.append((v, png))
            print('  %s : %s (%d étoiles retirées contre le texte)' % (v, os.path.relpath(png, ROOT), n))
            if gabarit and not o.guides:
                out = os.path.join(o.pdf or o.sortie, 'controle-tome-%d-%s-gabarit.png' % (k, v))
                os.makedirs(os.path.dirname(out), exist_ok=True)
                print('  contrôle sous le gabarit de Lulu :', os.path.relpath(controle_gabarit(png, gabarit, out, o.ppp), ROOT))
            if o.pdf and len(pngs) == 1:
                pdf = imprimer_pdf(v, k, m, pal, fichiers, fond, accent, travail,
                                   os.path.join(o.pdf, 'couverture-tome-%d.pdf' % k))
                print('  PDF de l\'imprimeur :', os.path.relpath(pdf, ROOT))
        if len(pngs) > 1 and not o.guides:
            print('  planche :', os.path.relpath(planche(k, m, pngs, o.ppp, o.sortie, travail), ROOT))
    finally:
        if not o.garder:
            shutil.rmtree(travail, ignore_errors=True)


if __name__ == '__main__':
    main()
