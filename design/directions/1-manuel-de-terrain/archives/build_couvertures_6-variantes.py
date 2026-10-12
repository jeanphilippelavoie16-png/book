# -*- coding: utf-8 -*-
"""Couvertures des six tomes — direction 1, manuel de terrain, couleurs nordiques.

Écrit, à côté de couvertures-nordique.html (les quatre tomes du 23 septembre, qu'on ne touche pas) :
  couvertures-nordique-6.html     six avants, couvertures complètes des tomes 5 et 6 et de leurs variantes
  trait-95-09-<couleur>.svg       dos du tome 5 : le châssis froid (planche 95-09, vue « monté »)
  trait-107-09-<couleur>.svg      dos du tome 6 : souder avec deux batteries (planche 107-09, ex-84-09)

Rendu (PDF et aperçus) : outils/rendre_couvertures_6.sh
"""
import re, os

# ARCHIVE (28 septembre 2026) : version du 27 septembre, avec les variantes mousse et rouille. Ne pas relancer :
# elle écrirait par-dessus couvertures-nordique-6.html. Son rendu est archives/couvertures-nordique-6-variantes.html.
raise SystemExit("archive : ne pas relancer (voir outils/build_couvertures_6.py)")

D1 = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.abspath(os.path.join(D1, '..', '..', '..'))

# ------------------------------------------------------------------ tomes
# fond, encre ; 5 et 6 : proposition de design/choix.md, plus une variante chacun (à choisir par JP)
COUL = {
    't1':  ('#E2E7EA', '#15222B', 'neige'),
    't2':  ('#5C1A15', '#F3ECE5', 'sang de gibier'),
    't3':  ('#1D392E', '#E9F0EA', 'épinette'),
    't4':  ('#25414F', '#EDF2F5', 'fleuve'),
    't5':  ('#4B3A28', '#F2EBDF', 'écorce'),
    't6':  ('#7A4424', '#F5ECE2', 'rouille'),
    't5m': ('#444A35', '#EEF0E4', 'mousse'),
    't6f': ('#363432', '#EEEBE6', 'fonte'),
}
# Chapitres : plan/tomes-6-proposition.md (numéros du 27 septembre 2026). Poids de la barre = nombre de chapitres.
TOMES = {
    1: dict(titre='Tenir', h1=['Tenir'], taille=86, ch=('00', '18'), n=20),
    2: dict(titre='Le corps', h1=['Le corps'], taille=86, ch=('19', '40'), n=22),
    3: dict(titre='Prélever', h1=['Prélever'], taille=86, ch=('41', '60'), n=20),
    4: dict(titre='De la bête au garde-manger', h1=['De la bête', 'au garde-manger'], taille=57, ch=('61', '81'), n=21),
    5: dict(titre='La forêt, le jardin et le chalet', h1=['La forêt,', 'le jardin', 'et le chalet'], taille=66, interligne=1.02,
            ch=('82', '101'), n=20),
    6: dict(titre='L’atelier', h1=['L’atelier'], taille=86, ch=('102', '112'), n=11),
}
SOMMAIRE = {
    5: [(82, 'Le feu au chalet'), (83, 'Poêles à bois et rendement'), (84, 'Ouvrir et fermer le chalet'), (85, 'Éclairage'),
        (86, 'L’électricité du chalet et le froid mécanique'), (87, 'Sans propane'), (88, 'Le pain'),
        (89, 'Raquettes et toboggan'), (90, 'Le canot : réparer, porter, en refaire un'), (91, 'Petits fruits'),
        (92, 'Plantes comestibles boréales'), (93, 'Champignons'), (94, 'Sève, gomme, écorces'), (95, 'Jardin nordique'),
        (96, 'Faire la terre sans rien acheter'), (97, 'Allonger la saison'), (98, 'Ce qui nourrit un hiver'),
        (99, 'Les façons de faire d’autrefois'), (100, 'Semences'), (101, 'Petit élevage')],
    6: [(102, 'De la peau au cuir'), (103, 'Babiche, tendons, cordage'), (104, 'Coudre et chausser'),
        (105, 'Affûter, limer, aiguiser'), (106, 'Scie à chaîne et petits moteurs'), (107, 'Souder, braser, réparer le métal'),
        (108, 'Le stock de pièces et de consommables'), (109, 'Leviers, poulies, treuils'), (110, 'Assemblages bois-bois'),
        (111, 'Trempe et travail du métal à chaud'), (112, 'Savon et chandelles')],
}
# ------------------------------------------------------------------ tranche
# Blurb : la tranche ne se calcule pas, elle se lit au calculateur, par paliers (sources/blurb-specifications.md §2,
# relevé du 27 septembre 2026 : 8 × 10, couverture souple, papier Standard). (pages, tranche en po)
BLURB_SOUPLE = [(20, .056), (24, .056), (40, .125), (60, .181), (80, .181), (100, .25), (120, .306), (140, .306),
                (160, .375), (180, .431), (200, .5), (220, .5), (240, .556), (260, .625), (280, .625), (300, .681),
                (320, .75), (340, .806), (360, .806), (380, .875), (400, .931), (420, .931), (440, 1.0)]
# Pages par tome : ESTIMATIONS de suivi/plan-de-match.md (« ≈ 366 / 414 / 386 / 383 / 333 / 243 »), pas un compte.
# Un tome assemblé (design/outils/assembler-tome.py) remplace son estimation : livre/tome-N/rapport.md donne le
# nombre de pages exact ET la réponse du calculateur de Blurb pour ce nombre (voir rapport_tome).
PAGES = {1: 366, 2: 414, 3: 386, 4: 383, 5: 333, 6: 243}

def rapport_tome(k):
    """(pages, tranche en po) lus dans livre/tome-k/rapport.md, ou None si le tome n'est pas assemblé."""
    f = os.path.join(ROOT, 'livre', 'tome-%d' % k, 'rapport.md')
    if not os.path.exists(f):
        return None
    s = open(f, encoding='utf-8').read()
    p = re.search(r'Calculateur de Blurb interrogé .*? pour \*\*(\d+) pages\*\*.*?couverture \*\*souple\*\*', s)
    t = re.search(r'\*\*Tranche\s*:\s*([\d.]+)\s*x\s*10\.25 po', s)
    return (int(p.group(1)), float(t.group(1))) if p and t else None

def tranche(pages):
    """Tranche en po pour un nombre de pages, (valeur, provenance).
    Ligne du tableau si le nombre y est. Sinon, déduit du tableau : les 24 réponses relevées au calculateur
    (les 23 lignes + 184 pages, rapport du tome 6) suivent toutes floor(4,5 × ceil(pages / 28)) pt, soit un
    palier de 1/16 po toutes les 28 pages. C'est une lecture du tableau, pas une règle publiée par Blurb.
    (L'ancienne règle, « palier supérieur », donnait 0,5 po pour 184 pages ; le calculateur répond 0,431.)"""
    if pages > 440:
        raise ValueError('plus de 440 pages : impossible en papier Standard')
    for n, t in BLURB_SOUPLE:
        if pages == n:
            return t, 'lue au tableau'
    return round(int(4.5 * -(-pages // 28)) / 72, 3), 'déduite du tableau'

SPINE, PROV = {}, {}
for _k, _p in list(PAGES.items()):
    _r = rapport_tome(_k)
    if _r:
        PAGES[_k], SPINE[_k] = _r
        PROV[_k] = 'compte réel, calculateur (livre/tome-%d/rapport.md)' % _k
    else:
        SPINE[_k], _src = tranche(_p)
        PROV[_k] = 'pages ESTIMÉES, tranche %s' % _src

# dessin de la quatrième : fichier, légende ; échelle commune 0,011438 po par unité (celle du tome 4 : 612 unités sur 7 po)
ECH = 7.0 / 612
TRAIT = {5: ('trait-95-09', 'Ch. 95 · Le châssis froid'), 6: ('trait-107-09', 'Ch. 107 · Souder avec deux batteries')}

esc = lambda s: s.replace('&', '&amp;').replace('<', '&lt;')

# ------------------------------------------------------------------ traits (SVG recolorés)
def traits():
    tailles = {}
    # tome 5 : la vue « monté, ouvert le matin » de la planche 95-09, sans renvois ni légende
    s = open(os.path.join(ROOT, 'images', 'planche-95-09-chassis-froid.svg'), encoding='utf-8').read()
    a = s.index('<g transform="translate(40 46)" data-vue="monte">'); b = s.index('</g>', a) + 4
    g = s[a:b]
    vb = (165.3, 65.6, 352.1, 182.9)          # boîte du dessin (127,8–474,9 × 22,1–200 + translate 40 46), marge 2,5
    for cle in ('t5', 't5m'):
        fond, encre, nom = COUL[cle]
        corps = g.replace('#1A1A1A', encre).replace('#FFFFFF', fond)
        out = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="%g %g %g %g" role="img">\n'
               '<title>Trait tiré de la planche 95-09 — le châssis froid, monté</title>\n%s\n</svg>\n') % (vb + (corps,))
        open(os.path.join(D1, 'trait-95-09-%s.svg' % nom.replace('é', 'e')), 'w', encoding='utf-8').write(out)
    tailles[5] = (vb[2] * ECH, vb[3] * ECH)
    # tome 6 : le trait du tome 4 d'avant (planche 84-09, devenue 107-09), déjà nettoyé de ses renvois
    t = open(os.path.join(D1, 'trait-84-09-clair.svg'), encoding='utf-8').read()
    t = t.replace('Trait tiré de la planche 84-09', 'Trait tiré de la planche 107-09')
    for cle in ('t6', 't6f'):
        fond, encre, nom = COUL[cle]
        open(os.path.join(D1, 'trait-107-09-%s.svg' % nom), 'w', encoding='utf-8').write(t.replace('#EDF2F5', encre))
    tailles[6] = (612 * ECH, 208 * ECH)
    return tailles

# ------------------------------------------------------------------ gabarits HTML
def serie(on):
    parts = []
    for k in range(1, 7):
        d = TOMES[k]
        parts.append('<div class="s%d%s"><i>%d</i><small>%s–%s</small></div>' % (k, ' on' if k == on else '', k, d['ch'][0], d['ch'][1]))
    return '<div class="serie">' + ''.join(parts) + '</div>'

def avant_in(k):
    d = TOMES[k]
    style = 'font-size:%gpt' % d['taille'] + (';line-height:%g' % d['interligne'] if 'interligne' in d else '')
    return ('<div class="hd"><span>Le Grand Livre du Chalet</span><span class="r">Tome %d sur 6</span></div>\n'
            '  <div class="num">%d</div>\n'
            '  <div class="ttl"><h1 style="%s">%s</h1><div class="ch"><b>Chapitres %s à %s</b>'
            '<span>Conservation, subsistance et autonomie<br>sur la Côte-Nord</span></div></div>\n  %s') % (
        k, k, style, '<br>'.join(esc(l) for l in d['h1']), d['ch'][0], d['ch'][1], serie(k))

def avant(k, cle, id_):
    return ('<section class="sheet front %s" id="%s" data-tome="%d"><div class="panel"><div class="in">\n  %s\n</div></div></section>\n'
            % (cle, id_, k, avant_in(k)))

def complete(k, cle, id_, tailles):
    d = TOMES[k]; fond, encre, nom = COUL[cle]
    fic, cap = TRAIT[k]
    w, h = tailles[k]
    img = ('<img src="%s-%s.svg" alt="" style="width:%.3fin;height:%.3fin;margin-top:auto">' % (fic, nom.replace('é', 'e'), w, h))
    lis = ''.join('<li><b>%d</b>%s</li>' % (n, esc(t)) for n, t in SOMMAIRE[k])
    return f'''<section class="sheet full {cle}" id="{id_}" data-tome="{k}" style="--spine:{SPINE[k]}in;page:full{k}">
  <div class="panel back"><div class="in">
    <div class="hd"><span>Le Grand Livre du Chalet</span><span class="r">Tome {k} · {esc(d['titre'])}</span></div>
    <div class="txt">
      <p>Six tomes, 114 chapitres sur la conservation des aliments, la subsistance et l’autonomie, faits pour la Côte-Nord&#8239;: forêt boréale, hivers à −35&#8239;°C, saison de jardin de 90 à 100&nbsp;jours, orignal, truite, fleuve salé.</p>
      <p><strong>Le test de chaque page&#8239;: il n’y a personne à appeler.</strong></p>
    </div>
    <div class="toc"><h2>Dans ce tome · chapitres {d['ch'][0]} à {d['ch'][1]}</h2>
      <ol>{lis}</ol>
    </div>
    <div class="trait">{img}<div class="cap">{cap}</div></div>
    {serie(k)}
  </div></div>
  <div class="panel spine"><div class="sp"><div class="sn">{k}</div><div class="rule"></div><div class="vt"><b>{esc(d['titre'])}</b><span>Le Grand Livre du Chalet</span></div></div></div>
  <div class="panel fr"><div class="in">
  {avant_in(k)}
  </div></div>
</section>
'''

CSS = r'''
/* =====================================================================
   COUVERTURES DES SIX TOMES — couverture souple Blurb, 8 × 10 po rogné.
   Fond perdu 0,125 po partout sur la couverture complète.
   TRANCHE : variable --spine, posée sur chaque couverture complète par le générateur à partir du
   nombre de pages du tome (PAGES) et du tableau du calculateur de Blurb (sources/blurb-specifications.md).
   Les pages sont des ESTIMATIONS : refaire quand le tome est assemblé, et revérifier au calculateur.
   Par défaut (:root) : 1,0 po, la tranche de 440 pages. Largeur du PDF = 16,25 po + tranche.
   ===================================================================== */
@page front { size: 585pt 738pt; margin: 0; }
@page full  { size: 1242pt 738pt; margin: 0; }
%PAGES_FULL%
:root{
  --spine:1.0in;
  --sans:'IBM Plex Sans Condensed','Arial Narrow',sans-serif;
  --serif:'IBM Plex Serif',Georgia,serif;
  --ink:#111;
}
%COULEURS%
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff}
body{font-family:var(--sans);color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.sheet{position:relative;overflow:hidden;background:var(--c);color:var(--ink);break-after:page}
.sheet:last-child{break-after:auto}
.sheet.front{page:front;width:8.125in;height:10.25in}
.sheet.full{page:full;width:calc(16.25in + var(--spine));height:10.25in}

/* ---------- panneau (avant ou arrière), 8 × 10 rogné ---------- */
.panel{position:absolute;top:0.125in;width:8in;height:10in}
.front .panel{left:0}
.full .back{left:0.125in}
.full .spine{left:8.125in;width:var(--spine)}
.full .fr{left:calc(8.125in + var(--spine))}
.in{position:absolute;left:0.5in;right:0.5in;top:0.5in;bottom:0.5in}

.hd{display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:6pt;border-bottom:5pt solid var(--ink);
  font:700 13.5pt/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;white-space:nowrap}
.hd .r{font-weight:600;font-size:11pt;letter-spacing:.14em}
.num{position:absolute;right:-0.06in;bottom:0.66in;font:700 420pt/0.72 var(--sans);letter-spacing:-.03em;text-align:right}
.ttl{position:absolute;left:0;right:0;top:0.62in}
.ttl h1{margin:0;font:700 86pt/1.13 var(--sans);text-transform:uppercase;letter-spacing:-.005em;padding-bottom:10pt;border-bottom:2.5pt solid var(--ink);white-space:nowrap}
.ttl .ch{display:flex;justify-content:space-between;align-items:baseline;padding-top:8pt}
.ttl .ch b{font:700 17pt/1 var(--sans);letter-spacing:.04em;text-transform:uppercase}
.ttl .ch span{font:500 11pt/1.2 var(--sans);letter-spacing:.02em;text-align:right}

/* barre de série : les six tomes au prorata des chapitres (20, 22, 20, 21, 20, 11) */
.serie{position:absolute;left:0;right:0;bottom:0.02in;display:flex;gap:3pt}
.serie div{display:flex;flex-direction:column;gap:3pt;min-width:0}
.serie i{display:block;height:0.3in;border:1.25pt solid var(--ink);font:700 12pt/0.28in var(--sans);font-style:normal;padding-left:5pt}
.serie div.on i{background:var(--ink);color:var(--c)}
.serie small{font:600 8pt/1 var(--sans);letter-spacing:.06em;white-space:nowrap}
.s1{flex:20}.s2{flex:22}.s3{flex:20}.s4{flex:21}.s5{flex:20}.s6{flex:11}

/* ---------- tranche ---------- */
/* titre de tranche : 26 pt pour les six (31 pt sur les quatre tomes d'avant) — « La forêt, le jardin et le chalet »
   est le plus long et doit laisser la place au nom de la série en pied */
.spine .sp{position:absolute;inset:0.42in 0 0.45in 0;display:flex;flex-direction:column;align-items:center}
/* chiffre de tranche : 58 pt, réduit sur une tranche mince pour garder 1/16 po de chaque côté des plis (la
   tolérance de coupe de Blurb ; le titre de 26 pt, capitales ≈ 18 pt, garde la même marge sur la plus mince).
   Le chiffre fait environ 0,55 em de large. Seul le tome 6 descend : 184 p., 0,431 po -> ≈ 40 pt.
   Le filet suit : jamais plus court que 70 % de la tranche, la largeur du chiffre sur la plus mince. */
.spine .sn{font:700 58pt/0.8 var(--sans);font-size:min(58pt, calc((var(--spine) - 0.125in) / 0.55));padding-top:4pt;
  height:calc(46.4pt + 4pt);box-sizing:border-box;display:flex;align-items:flex-end}  /* boîte fixe : le filet reste à la même hauteur sur les six */
.spine .rule{width:max(calc(100% - 0.22in), calc(var(--spine) * 0.7));height:0;border-top:3pt solid var(--ink);margin:10pt 0 12pt}
.spine .vt{flex:1;writing-mode:vertical-rl;text-orientation:sideways;display:flex;justify-content:space-between;align-items:center;width:100%}
.spine .vt b{font:700 26pt/1 var(--sans);text-transform:uppercase;letter-spacing:.01em;white-space:nowrap}
.spine .vt span{font:700 8.5pt/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;white-space:nowrap}

/* ---------- quatrième ---------- */
.back .txt{position:absolute;top:0.55in;left:0;right:0.3in;font:400 12.5pt/17pt var(--serif)}
.back .txt p{margin:0 0 8pt}
.back .txt strong{font-weight:700}
.back .toc{position:absolute;top:2.2in;left:0;right:0}
.back .toc h2{margin:0 0 5pt;font:700 10pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;padding-bottom:4pt;border-bottom:1.25pt solid var(--ink)}
.back .toc ol{margin:0;padding:0;list-style:none;columns:2;column-gap:0.3in;font:500 10pt/13.2pt var(--sans)}
.back .toc li{display:flex;gap:6pt;break-inside:avoid;border-bottom:0.5pt solid var(--fil)}
.back .toc li b{width:22pt;flex:none;font-weight:700}
.back .trait{position:absolute;left:0;right:0;top:5.05in;height:2.9in;display:flex;flex-direction:column}
.back .trait img{display:block;flex:none}
.back .trait .cap{font:600 8pt/1 var(--sans);letter-spacing:.06em;margin-top:4pt}

/* ---------- aperçus écran ---------- */
@media screen{
  body.v{background:#cfcfcf;min-height:100vh}
  .trim{position:relative;overflow:hidden;box-shadow:0 1px 0 rgba(0,0,0,.2),0 6px 18px rgba(0,0,0,.18);flex:none}
  .trim .sheet{position:absolute}
  .front-trim{width:8in;height:10in}.front-trim .sheet{left:0;top:-0.125in}
  .full-trim{width:calc(16in + var(--spine));height:10in}.full-trim .sheet{left:-0.125in;top:-0.125in}
  .spine-trim{width:var(--spine);height:10in;box-shadow:inset -6px 0 10px -6px rgba(0,0,0,.35),inset 6px 0 10px -6px rgba(255,255,255,.25)}
  .spine-trim .sheet{left:-8.125in;top:-0.125in}
  .lab{font:600 22px/1.25 var(--sans);color:#2b2b2b;letter-spacing:.02em}
  .lab b{font-weight:700;text-transform:uppercase;letter-spacing:.08em}
  .lab i{font-style:normal;color:#555}
  .shelf{display:flex;align-items:flex-end;gap:0;padding:0.6in 1.2in 0;border-bottom:0.6in solid #6b5a45}
  /* vues */
  .v-avants .wrap{zoom:.25;display:flex;gap:0.7in;padding:0.8in}
  .v-56 .wrap{zoom:.5;display:flex;flex-direction:column;gap:0.55in;padding:0.6in 0.7in}
  .v-56 .lab{font-size:30px}
  .v-tab .wrap{zoom:.5}
  .v-tab .shelf{justify-content:center}
  .v-var .wrap{zoom:.3;padding:0.7in 0.9in;display:flex;flex-direction:column;gap:0.5in}
  .v-var .row{display:flex;gap:0.9in;align-items:flex-start}
  .v-var .col{display:flex;flex-direction:column;gap:0.25in}
  .v-var .lab{font-size:58px}
  .v-var .pair{display:flex;gap:0.35in}
  .v-var .shelf{padding:0.5in 0.9in 0;border-bottom-width:0.45in}
  .v-var .lab.s{font-size:50px}.v-var .lab.s b{text-transform:none;letter-spacing:.01em}
}
'''

SCRIPT = r'''
<script>
(function(){
  const faces=['700 10pt "IBM Plex Sans Condensed"','600 10pt "IBM Plex Sans Condensed"','500 10pt "IBM Plex Sans Condensed"','400 10pt "IBM Plex Serif"','700 10pt "IBM Plex Serif"'];
  const NOMS={t1:'Neige',t2:'Sang de gibier',t3:'Épinette',t4:'Fleuve',t5:'Écorce',t6:'Rouille',t5m:'Mousse',t6f:'Fonte'};
  const HEX=%HEX%;
  const TITRES=%TITRES%;
  const SPINE=%SPINE%;
  Promise.all(faces.map(f=>document.fonts.load(f,'aéÀ−’'))).then(()=>document.fonts.ready).then(()=>{
    const h=location.hash;
    const el=(t,c,html)=>{const e=document.createElement(t);if(c)e.className=c;if(html!=null)e.innerHTML=html;return e;};
    const trim=(sheet,kind)=>{const t=el('div','trim '+kind+'-trim');const sp=sheet.style.getPropertyValue('--spine');if(sp)t.style.setProperty('--spine',sp);t.appendChild(sheet);return t;};
    const cl=id=>{const s=document.getElementById(id).cloneNode(true);s.removeAttribute('id');return s;};
    /* une tranche : copie de la couverture complète du tome 5, recolorée et retitrée */
    const tranche=(k,cle)=>{const s=cl('full5');s.className='sheet full '+cle;s.style.setProperty('--spine',SPINE[k]+'in');
      s.querySelector('.spine .sn').textContent=k;s.querySelector('.spine .vt b').textContent=TITRES[k];return trim(s,'spine');};
    const etagere=cles=>{const r=el('div','shelf');cles.forEach((c,i)=>r.appendChild(tranche(i+1,c)));return r;};
    const lab=(cle,extra)=>el('div','lab','<b>'+NOMS[cle]+'</b> '+HEX[cle]+(extra?' <i>'+extra+'</i>':''));
    const go=(cls,wrap)=>{document.body.innerHTML='';document.body.className='v '+cls;document.body.appendChild(wrap);};
    if(h==='#avants'){
      const w=el('div','wrap');['f1','f2','f3','f4','f5','f6'].forEach(id=>w.appendChild(trim(cl(id),'front')));go('v-avants',w);
    } else if(h==='#couvertures-5-6'){
      const w=el('div','wrap');
      w.appendChild(lab('t5','· tome 5, quatrième | tranche | avant'));w.appendChild(trim(cl('full5'),'full'));
      w.appendChild(lab('t6','· tome 6, quatrième | tranche | avant'));w.appendChild(trim(cl('full6'),'full'));
      go('v-56',w);
    } else if(h==='#tablette'){
      const w=el('div','wrap');w.appendChild(etagere(['t1','t2','t3','t4','t5','t6']));go('v-tab',w);
    } else if(h==='#variantes'){
      const w=el('div','wrap');const r=el('div','row');
      [['t5','f5','proposée'],['t5m','f5m','variante'],['t6','f6','proposée'],['t6f','f6f','variante']].forEach(([c,id,q],i)=>{
        const col=el('div','col');col.appendChild(trim(cl(id),'front'));col.appendChild(lab(c,q));
        if(i%2===0){r.appendChild(el('div','pair'));} r.lastChild.appendChild(col);});
      w.appendChild(r);
      const r2=el('div','row');
      [[['t1','t2','t3','t4','t5','t6'],'Proposées : écorce et rouille'],[['t1','t2','t3','t4','t5m','t6f'],'Variantes : mousse et fonte'],
       [['t1','t2','t3','t4','t5','t6f'],'Écorce et fonte'],[['t1','t2','t3','t4','t5m','t6'],'Mousse et rouille']].forEach(([c,t])=>{
        const col=el('div','col');col.appendChild(etagere(c));col.appendChild(el('div','lab s','<b>'+t+'</b>'));r2.appendChild(col);});
      w.appendChild(r2);go('v-var',w);
    }
    document.documentElement.dataset.ready='1';
  });
})();
</script>
'''

def main():
    tailles = traits()
    couleurs = '\n'.join('.%s{--c:%s;--ink:%s;--fil:%s} /* %s */' % (
        c, f, i, 'rgba(%d,%d,%d,.45)' % tuple(int(i[j:j + 2], 16) for j in (1, 3, 5)), n) for c, (f, i, n) in COUL.items())
    pages_full = '\n'.join('@page full%d { size: %.2fpt 738pt; margin: 0; }  /* tome %d : %d p. -> tranche %s po (%s) */' % (
        k, (16.25 + SPINE[k]) * 72, k, PAGES[k], SPINE[k], PROV[k]) for k in sorted(SPINE))
    css = CSS.replace('%COULEURS%', couleurs).replace('%PAGES_FULL%', pages_full)
    corps = []
    corps.append('<!-- ============ LES SIX AVANTS ============ -->\n')
    for k in range(1, 7):
        corps.append(avant(k, 't%d' % k, 'f%d' % k))
    corps.append('<!-- ============ COUVERTURES COMPLÈTES : quatrième | tranche | avant ============ -->\n')
    corps.append(complete(5, 't5', 'full5', tailles))
    corps.append(complete(6, 't6', 'full6', tailles))
    corps.append('<!-- ============ VARIANTES (à choisir par JP) ============ -->\n')
    corps.append(complete(5, 't5m', 'full5m', tailles))
    corps.append(complete(6, 't6f', 'full6f', tailles))
    corps.append(avant(5, 't5m', 'f5m').replace('class="sheet front', 'class="sheet front screen-only'))
    corps.append(avant(6, 't6f', 'f6f').replace('class="sheet front', 'class="sheet front screen-only'))
    hexes = '{' + ','.join("%s:'%s'" % (c, f) for c, (f, i, n) in COUL.items()) + '}'
    titres = '{' + ','.join("%d:%r" % (k, TOMES[k]['titre']) for k in TOMES) + '}'
    html = ('<!DOCTYPE html>\n<html lang="fr-CA">\n<head>\n<meta charset="utf-8">\n'
            '<title>Le Grand Livre du Chalet — couvertures des six tomes</title>\n'
            '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
            '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400&display=block" rel="stylesheet">\n'
            '<!-- Généré par outils/build_couvertures_6.py : ne pas modifier à la main. -->\n'
            '<style>' + css + '\n@media print{.screen-only{display:none}}\n</style>\n</head>\n<body>\n\n'
            + ''.join(corps) + SCRIPT.replace('%HEX%', hexes).replace('%TITRES%', titres).replace('%SPINE%', '{' + ','.join('%d:%s' % (k, SPINE[k]) for k in SPINE) + '}') + '</body>\n</html>\n')
    open(os.path.join(D1, 'couvertures-nordique-6.html'), 'w', encoding='utf-8').write(html)
    print('couvertures-nordique-6.html', len(html), 'octets ; traits', {k: tuple(round(x, 3) for x in v) for k, v in tailles.items()})
    for k in sorted(SPINE):
        print('tome %d : %d p. -> tranche %s po, PDF %.3f x 10.25 po (%s)' % (k, PAGES[k], SPINE[k], 16.25 + SPINE[k], PROV[k]))

if __name__ == '__main__':
    main()
