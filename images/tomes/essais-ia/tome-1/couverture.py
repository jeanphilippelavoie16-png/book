# -*- coding: utf-8 -*-
"""Couverture imprimée d'un tome, autour de l'image de sa page de titre (essai du 18 octobre 2026).

Trois mises en page de la couverture complète (quatrième | tranche | devant), aux mesures de Blurb du tome :
  A  l'affiche : le devant de la page de titre ; la nuit continue en aplat sur la tranche et la quatrième
  B  le gros chiffre : le numéro du tome en grand dans le ciel ; tranche et quatrième à la couleur du tome
  C  le ciel fait le tour : titre centré ; le ciel étoilé de l'image, recadré en miroir, couvre la tranche et
     la quatrième

  python3 couverture.py                      les trois variantes du tome 1 en PNG (150 ppp) et la planche de choix
  python3 couverture.py --tome 3 --image images/tomes/titre-tome-3.jpg --variantes B
  --ppp N        résolution des PNG (150)
  --fond-ppp N   résolution de l'image de fond composée (300 ; 375 garde l'image du tome 1 à sa pleine définition)
  --accent HEX   couleur du gros chiffre (variante B) : une couleur forte de l'image du tome (cuivre des crêtes, tome 1)
  --guides       trace le rognage, les plis, la zone sûre et la tolérance de coupe (pour vérifier)
  --garder DIR   garde le HTML, les fonds et les portraits dans DIR (sinon : dossier temporaire, effacé)
  --sortie DIR   où écrire les PNG (ce dossier par défaut)

Les dimensions (tranche lue au tableau de Blurb pour le nombre de pages du tome), les textes de la quatrième, le
sommaire et les auteurs viennent de design/directions/1-manuel-de-terrain/outils/build_couvertures_6.py, importé
tel quel : rien n'y est écrit. Le sous-titre du devant (variante A) vient de SOUS_TITRES dans
design/outils/assembler-tome.py. Il faut Chromium (/opt/pw-browsers) et l'accès à Google Fonts.

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
FP = 0.125                              # fond perdu, les quatre bords (Blurb, couverture souple)


def mesures(k):
    tr = bc.SPINE[k]
    return dict(tranche=tr, W=16.25 + tr, H=10.25, x_tranche=FP + 8.0, x_devant=FP + 8.0 + tr)


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


def quatrieme(k, fichiers):
    d = bc.TOMES[k]
    lis = ''.join('<li><b>%s</b><span>%s</span></li>' % (n, esc(t)) for n, t in bc.SOMMAIRE[k])
    return f'''<div class="in">
    <div class="hd"><span>Le Manuel du Nord</span><span>Tome {k} · {esc(d['titre'])}</span></div>
    <div class="txt">
      <p>Six tomes, {nb_chapitres()} chapitres sur la conservation des aliments, la subsistance et l’autonomie, faits pour la Côte-Nord&#8239;: forêt boréale, hivers à −35&#8239;°C, saison de jardin de 90 à 100&nbsp;jours, orignal, truite, fleuve salé.</p>
      <p><strong>Le test de chaque page&#8239;: il n’y a personne à appeler.</strong></p>
    </div>
    <div class="toc"><h2>Dans ce tome · chapitres <span class="nc">{d['ch'][0]}</span> à {d['ch'][1]}</h2><ol>{lis}</ol></div>
    <div class="bas">{auteurs(fichiers)}{serie(k)}</div>
  </div>'''


def tranche(k):
    d = bc.TOMES[k]
    return (f'<div class="sp"><div class="sn">{k}</div><div class="rule"></div>'
            f'<div class="vt"><b data-fit-v>{esc(d["titre"])}</b><span>Le Manuel du Nord</span></div></div>')


def devant(v, k):
    d = bc.TOMES[k]
    titre = '<br>'.join(esc(l) for l in d['h1'])
    if VARIANTES[v]['devant'] == 'affiche':
        st = sous_titre(k)
        return (f'<div class="hd hd-a"><span>Le Manuel du Nord</span><span>Tome {k}</span></div>'
                f'<div class="haut" data-boite><h1 class="titre" data-fit data-bas="3.95">{titre}</h1>'
                + (f'<p class="sous">{typo(st)}</p>' if st else '') + '</div>')
    if VARIANTES[v]['devant'] == 'chiffre':
        return (f'<div class="hd hd-b"><span>Le Manuel du Nord</span><span>Tome {k} sur 6</span></div>'
                f'<div class="duo"><div class="num">{k}</div><h1 class="titre" data-fit data-haut=".hd-b">{titre}</h1></div>')
    bas = CENTRE_BAS.get(k)
    return (f'<div class="marque">Le Manuel du Nord</div>'
            f'<div class="centre"{f" style=\"height:{bas}in\"" if bas else ""}><div class="tome"><i></i><span>Tome {k}</span><i></i></div>'
            f'<h1 class="titre" data-fit data-haut=".marque" data-sommet=".tome">{titre}</h1></div>')


# le bas du titre centré (variante C), en pouces depuis le haut du devant rogné, quand l'image du tome monte plus haut
# que 3,95 po (tome 6 : la colline enneigée, sur laquelle le titre crème ne se lit pas ; tome 2 : le cadre au mur)
CENTRE_BAS = {2: 3.1, 6: 3.3}


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
.back .ph.claude img{width:72%;height:72%}
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
.centre{position:absolute;left:0.45in;right:0.45in;top:0;height:3.95in;display:flex;flex-direction:column;justify-content:flex-end;align-items:center}
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
'''

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
      const p=document.createElement('pre'); p.id='mesure'; p.textContent=JSON.stringify(out); document.body.appendChild(p);
    }
    document.documentElement.dataset.ready='1';
  });
})();
</script>'''


def page_html(v, k, m, pal, fichiers, fond, accent, guides=False):
    vars_ = '--encre:%s;--douce:%s;--filet:%s;--fort:%s;--fond:%s;--disque:%s;--accent:%s;--tr:%gin' % (
        pal['encre'], pal['douce'], pal['filet'], pal['fort'], pal['fond'], fichiers['disque'], accent, m['tranche'])
    g = ''
    if guides:
        xs = [FP, m['x_tranche'], m['x_devant'], m['W'] - FP]
        g += ''.join('<div class="g v%s" style="left:%gin"></div>' % (' pli' if x in xs[1:3] else '', x) for x in xs)
        g += ''.join('<div class="g h" style="top:%gin"></div>' % y for y in (FP, m['H'] - FP))
        g += ''.join('<div class="g v tol" style="left:%gin"></div>' % x for x in
                     (m['x_tranche'] - 1 / 16, m['x_tranche'] + 1 / 16, m['x_devant'] - 1 / 16, m['x_devant'] + 1 / 16))
        g += ''.join('<div class="g sur" style="left:%gin;top:%gin;width:%gin;height:%gin"></div>' % (x + .25, FP + .25, 7.5, 9.5)
                     for x in (FP, m['x_devant']))
    return f'''<!DOCTYPE html>
<html lang="fr-CA"><head><meta charset="utf-8">
<title>Le Manuel du Nord, tome {k} : couverture {v}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
{POLICES}<style>{CSS}.back .ph{{{BULLES[BULLE]}}}</style></head>
<body>
<div class="sheet v{v}" style="width:{m['W']:.4f}in;height:{m['H']}in;background-color:{pal['fond']};{('background-image:url(' + fond + ');') if fond else ''}{vars_}">
  <div class="panel back">{quatrieme(k, fichiers)}</div>
  <div class="panel spine" style="left:{m['x_tranche']:.4f}in;width:{m['tranche']}in">{tranche(k)}</div>
  <div class="panel front" style="left:{m['x_devant']:.4f}in">{devant(v, k)}</div>
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
    """Le fond de toute la couverture, fond perdu compris : la quatrième et la tranche (aplat ou ciel étoilé), l'image
    du tome sur le devant (8,125 × 10,25 po, centrée en largeur, calée en haut comme sur la page de titre)."""
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
    can[:, xf:] = grande[:Hp, cx0:cx0 + fw]
    bandes = []
    if VARIANTES[v]['dos'] == 'etoiles':
        # le ciel de l'image, reflété au pli du devant (le ciel passe le pli sans raccord), puis en miroir : les étoiles
        # sont celles de l'image, à la même taille. Les autres raccords du miroir tombent sur une ligne et une colonne
        # sans étoile, sinon une étoile coupée par le raccord se dédouble (deux points collés).
        L = grande[:int(0.42 * rh)].astype(np.float32) @ np.array([.2126, .7152, .0722], np.float32)
        t = int(0.09 * ppp) | 1
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
            lim = int(0.15 * rh) + int(pres[0]) - int(0.04 * ppp)
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
            c_hi = min(c_hi, cx0 + int(0.25 * rw) + int(mauvais[0]) - int(0.06 * ppp))
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


def nettoyer(can, rects, ppp):
    """Retire les étoiles qui touchent une lettre ou un filet : petites taches claires sur fond sombre (chapeau haut
    de forme), dont la tache entière touche la boîte d'un texte élargie d'une marge. Les crêtes, la lune et les traits
    de neige sont trop grands pour être pris. Le trou se bouche à la moyenne locale du ciel sans étoiles."""
    H, W = can.shape[:2]
    k = 0.0104 * ppp                      # 1 px CSS en px de l'image
    zone = np.zeros((H, W), bool)
    po = 96                               # px CSS par pouce
    for x0, y0, x1, y1, fs in rects:
        # marge plus large sur la ligne du texte que dessus et dessous : une étoile au bout d'un mot se lit comme un point
        if fs < 0:
            mx = my = 0
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
    """Les variantes côte à côte, rognées (sans le fond perdu), la lettre au-dessus ; une coche aux deux plis."""
    rog = round(FP * ppp)
    cols = []
    for v, f in pngs:
        im = Image.open(f)
        im = im.crop((rog, rog, im.width - rog, im.height - rog))
        L = 1150
        im = im.resize((L, round(im.height * L / im.width)), Image.LANCZOS)
        nom = 'p-%s.png' % v
        im.save(os.path.join(travail, nom))
        g = 8.0 / (m['W'] - 2 * FP) * 100
        dr = (8.0 + m['tranche']) / (m['W'] - 2 * FP) * 100
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
    h = 56 + 96 + 6 + 36 + 22 + round(1150 * 10 / (m['W'] - 2 * FP)) + 24 + 70 + 60
    chrome(['--window-size=%d,%d' % (w, h + 200), '--screenshot=' + out, 'file://' + f])
    Image.open(out).convert('RGB').crop((0, 0, w, h)).save(out, optimize=True)
    return out


# ------------------------------------------------------------------ main
def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--tome', type=int, default=1)
    ap.add_argument('--image')
    ap.add_argument('--variantes', default='ABC')
    ap.add_argument('--ppp', type=float, default=150)
    ap.add_argument('--fond-ppp', type=float, default=300)
    ap.add_argument('--accent', default=CUIVRE)
    ap.add_argument('--bulle', choices=sorted(BULLES), help='la bulle des photos des auteurs (BULLE par défaut)')
    ap.add_argument('--guides', action='store_true')
    ap.add_argument('--garder')
    ap.add_argument('--sortie', default=ICI)
    o = ap.parse_args()
    global BULLE
    BULLE = o.bulle or BULLE
    k = o.tome
    m = mesures(k)
    image = o.image or os.path.join(ROOT, 'images', 'tomes', 'titre-tome-%d.jpg' % k)
    img = Image.open(image).convert('RGB')
    ciel = couleur_du_ciel(img)
    travail = os.path.abspath(o.garder) if o.garder else tempfile.mkdtemp(prefix='couv-')
    os.makedirs(travail, exist_ok=True)
    os.makedirs(o.sortie, exist_ok=True)
    print('tome %d : %d p., tranche %s po (%s) ; couverture %.3f × %.2f po ; ciel %s' % (
        k, bc.PAGES[k], m['tranche'], bc.PROV[k], m['W'], m['H'], ciel))
    pngs = []
    try:
        for v in o.variantes:
            pal = palette(v, k, ciel)
            fichiers = portraits(v, k, pal, ciel, travail)
            accent = o.accent
            f = os.path.join(travail, 'couverture-%s.html' % v)
            open(f, 'w', encoding='utf-8').write(page_html(v, k, m, pal, fichiers, None, accent))
            rects = mesurer(f, m)
            can, bandes = composer(v, m, img, pal, o.fond_ppp)
            can, n = nettoyer(can, rects + bandes, o.fond_ppp)
            fond = 'fond-%s.jpg' % v
            Image.fromarray(can).save(os.path.join(travail, fond), quality=92, subsampling=0)
            open(f, 'w', encoding='utf-8').write(page_html(v, k, m, pal, fichiers, fond, accent, o.guides))
            png = os.path.join(o.sortie, 'couverture-tome-%d-%s%s.png' % (k, v, '-guides' if o.guides else ''))
            capturer(f, png, m, o.ppp)
            pngs.append((v, png))
            print('  %s : %s (%d étoiles retirées contre le texte)' % (v, os.path.relpath(png, ROOT), n))
        if len(pngs) > 1 and not o.guides:
            print('  planche :', os.path.relpath(planche(k, m, pngs, o.ppp, o.sortie, travail), ROOT))
    finally:
        if not o.garder:
            shutil.rmtree(travail, ignore_errors=True)


if __name__ == '__main__':
    main()
