#!/usr/bin/env python3
"""Bâtit les 36 pictogrammes de danger du livre depuis des jeux d'icônes libres (format Iconify JSON).

    python3 construire.py DOSSIER_DES_JSON            # écrit les 36 <id>.svg à côté de ce script
    python3 construire.py DOSSIER_DES_JSON --apercu   # et la planche de revue (PNG) dans livre/apercus-palette/

Le dossier des JSON contient un fichier <jeu>.json par jeu Iconify (paquets npm @iconify-json/<jeu>,
fichier icons.json renommé). Les jeux et les icônes prises sont listés dans LISEZMOI.md.

Le cadre est le même pour tous : carré 100 × 100, coins arrondis (rx 14), rouge du livre #9B2C1E,
dessin blanc plein, centré, environ 70 % du carré. Aucun texte, aucune image incorporée.
"""
import json
import os
import re
import subprocess
import sys
import glob

ROUGE = '#9B2C1E'
BLANC = '#FFFFFF'
ICI = os.path.dirname(os.path.abspath(__file__))
DEPOT = os.path.abspath(os.path.join(ICI, '..', '..'))

# ---------------------------------------------------------------------------------------------
# Les 36 recettes. Chaque recette : l'icône principale (jeu, nom), sa taille dans le carré (en
# unités du viewBox 100), un décalage, et des ajouts (autre icône, barre oblique, « Z »).
#   'sous_chemins' : ne garder que ces sous-chemins (index) du premier <path> de l'icône
#   'couleurs'     : pour une icône en couleur, la couleur de chaque élément (index -> 'b' blanc,
#                    'r' rouge du fond, None retiré)
#   'trait'        : multiplie l'épaisseur des traits (icône au trait)
#   'rotation'     : tourne l'icône principale (degrés) autour du centre
#   'halo'         : épaisseur d'un liseré rouge autour d'un ajout, pour le détacher du dessin
# ---------------------------------------------------------------------------------------------
RECETTES = {
    'co': dict(
        nom='Monoxyde de carbone',
        icone=('mdi', 'cloud'), taille=66, dx=-6, dy=14,
        ajouts=[('z', dict(x=54, y=12, l=22, h=20, e=5.5)), ('z', dict(x=76, y=30, l=12, h=11, e=3.5))]),
    'generatrice': dict(
        nom='Génératrice et moteur sous un toit',
        icone=('mdi', 'generator-portable'), taille=50, dy=14,
        ajouts=[('icone', dict(jeu='mdi', nom='home-roof', taille=84, cx=50, cy=24))]),
    'electrocution': dict(
        nom='Courant renvoyé ou fil tombé',
        icone=('pinhead', 'utility-pole-with-bolt'), taille=70),
    'vapeurs': dict(
        nom='Vapeurs qui prennent feu',
        icone=('icon-park-solid', 'petrol'), taille=66, dx=-9, dy=8,
        ajouts=[('icone', dict(jeu='mdi', nom='heat-wave', taille=40, cx=70, cy=24))]),
    'huile-en-feu': dict(
        nom='Huile ou gras en feu',
        icone=('material-symbols', 'skillet'), sous_chemins=[0], taille=80, dy=16,
        ajouts=[('icone', dict(jeu='mdi', nom='fire', taille=54, cx=38, cy=34))]),
    'incendie': dict(
        nom='Le bâtiment brûle',
        icone=('fa6-solid', 'house-fire'), taille=72),
    'feu-de-foret': dict(
        nom='Feu de forêt',
        icone=('mdi', 'pine-tree-fire'), taille=74),
    'espace-clos': dict(
        nom="L'air qui manque au fond",
        icone=('game-icons', 'hole-ladder'), taille=74),
    'chimie': dict(
        nom='Produit qui brûle ou qui gaze',
        icone=('fa6-solid', 'flask'), taille=66),
    'pas-au-feu': dict(
        nom='Ce qui empoisonne en brûlant',
        icone=('mdi', 'fire-off'), taille=76),
    'projection': dict(
        nom="Ce qui éclate ou part d'un coup",
        icone=('fa6-solid', 'burst'), taille=72),
    'ecrasement': dict(
        nom="Ce qui tombe ou s'effondre",
        icone=('fa6-solid', 'weight-hanging'), taille=36, dy=-24,
        ajouts=[('icone', dict(jeu='fa6-solid', nom='person', taille=46, cx=50, cy=69))]),
    'coupure': dict(
        nom='Coupure qui vide le sang',
        icone=('game-icons', 'dripping-knife'), taille=74),
    'brulure': dict(
        nom='Brûlure qui colle',
        icone=('mdi', 'kettle-steam'), taille=70),
    'froid': dict(
        nom='Hypothermie et gelure',
        icone=('fa6-solid', 'snowflake'), taille=70),
    'eau-froide': dict(
        nom='Eau froide',
        icone=('fa6-solid', 'person-drowning'), taille=72),
    'glace': dict(
        nom='Glace mince',
        icone=('fa6-solid', 'person-walking'), taille=50, dy=-12,
        ajouts=[('glace', {})]),
    'ours': dict(
        nom='Ours',
        icone=('pinhead', 'bear'), taille=76),
    'orignal': dict(
        nom='Orignal',
        icone=('twemoji', 'moose'), taille=76,
        couleurs={0: 'b', 1: 'r', 2: 'b', 3: 'r', 4: 'b', 5: 'b', 6: 'b', 7: 'b', 8: 'r', 9: 'r'}),
    'arme': dict(
        nom='Arme et tir',
        icone=('mdi', 'crosshairs'), taille=72),
    'rage': dict(
        nom='Morsure, griffure, bête enragée',
        icone=('game-icons', 'wolf-head'), taille=72),
    'tularemie': dict(
        nom='Gants sur la bête crue',
        icone=('game-icons', 'rabbit'), taille=72),
    'hantavirus': dict(
        nom='Crottes de souris',
        icone=('mdi', 'rodent'), taille=72),
    'tetanos': dict(
        nom='Petite plaie profonde',
        icone=('mdi', 'nail'), taille=88, rotation=35),
    'cuisson': dict(
        nom='Cuire à cœur, mesuré',
        icone=('mdi', 'thermometer'), taille=72),
    'trichine': dict(
        nom='Ours et phoque : ni sel, ni fumée, ni gel',
        icone=('fa6-solid', 'worm'), taille=66),
    'abats': dict(
        nom='Abats qui ne se mangent pas',
        icone=('game-icons', 'liver'), taille=70,
        ajouts=[('barre', {})]),
    'botulisme': dict(
        nom='Botulisme',
        icone=('fa6-solid', 'jar'), taille=68),
    'zone-de-danger': dict(
        nom='Les heures entre 4 et 60 °C',
        icone=('fa6-solid', 'hourglass'), taille=66),
    'mal-de-caribou': dict(
        nom='Viande maigre seule',
        icone=('boxicons', 'meat-filled'), taille=64, dx=-5, dy=5,
        ajouts=[('icone', dict(jeu='mdi', nom='water', taille=30, cx=76, cy=22, halo=5))]),
    'thuyone': dict(
        nom='Le cèdre ne se boit pas',
        icone=('mdi', 'tea-off'), taille=72),
    'plante': dict(
        nom='Plante, graine ou coquillage qui empoisonne',
        icone=('game-icons', 'cherry'), taille=72),
    'plomb': dict(
        nom='Plomb',
        icone=('game-icons', 'pouch-with-beads'), taille=72),
    'selles': dict(
        nom='Des selles à la bouche',
        icone=('fa6-solid', 'poop'), taille=66),
    'poison': dict(
        nom='Poison avalé',
        icone=('healthicons', 'poison'), taille=74),
    'vie-en-jeu': dict(
        nom='Le signe qui ne s’attend pas',
        icone=('fa6-solid', 'heart-pulse'), taille=72),
}

# L'ordre du tableau de plan/dangers-inventaire.md, section 1 (ours et orignal à la place de bete-qui-charge).
ORDRE = ['co', 'generatrice', 'electrocution', 'vapeurs', 'huile-en-feu', 'incendie', 'feu-de-foret',
         'espace-clos', 'chimie', 'pas-au-feu', 'projection', 'ecrasement', 'coupure', 'brulure', 'froid',
         'eau-froide', 'glace', 'ours', 'orignal', 'arme', 'rage', 'tularemie', 'hantavirus', 'tetanos',
         'cuisson', 'trichine', 'abats', 'botulisme', 'zone-de-danger', 'mal-de-caribou', 'thuyone',
         'plante', 'plomb', 'selles', 'poison', 'vie-en-jeu']

# ---------------------------------------------------------------------------------------------
# Lecture des jeux Iconify
# ---------------------------------------------------------------------------------------------
_jeux = {}


def jeu(dossier, nom):
    if nom not in _jeux:
        with open(os.path.join(dossier, nom + '.json'), encoding='utf-8') as f:
            _jeux[nom] = json.load(f)
    return _jeux[nom]


def icone(dossier, nom_jeu, nom):
    """Rend (corps SVG, left, top, width, height) d'une icône, alias et retournements compris."""
    d = jeu(dossier, nom_jeu)
    W, H = d.get('width', 16), d.get('height', 16)
    hflip = vflip = False
    rot = 0
    n = nom
    while n not in d['icons']:
        a = d.get('aliases', {}).get(n)
        if a is None:
            raise KeyError(f'{nom_jeu}:{nom} introuvable')
        hflip ^= bool(a.get('hFlip')); vflip ^= bool(a.get('vFlip')); rot += a.get('rotate', 0)
        n = a['parent']
    i = d['icons'][n]
    w, h = i.get('width', W), i.get('height', H)
    l, t = i.get('left', d.get('left', 0)), i.get('top', d.get('top', 0))
    hflip ^= bool(i.get('hFlip')); vflip ^= bool(i.get('vFlip')); rot += i.get('rotate', 0)
    corps = i['body']
    if rot % 4:
        corps = f'<g transform="rotate({90 * (rot % 4)} {l + w / 2} {t + h / 2})">{corps}</g>'
    if hflip or vflip:
        sx, sy = (-1 if hflip else 1), (-1 if vflip else 1)
        corps = (f'<g transform="translate({(2 * l + w) if hflip else 0} {(2 * t + h) if vflip else 0}) '
                 f'scale({sx} {sy})">{corps}</g>')
    return corps, l, t, w, h


def garder_sous_chemins(corps, index):
    """Ne garde que certains sous-chemins (M…z) du premier attribut d d'un corps."""
    m = re.search(r'\sd="([^"]+)"', corps)
    morceaux = re.findall(r'[Mm][^Mm]*', m.group(1))
    if any(morceaux[k].startswith('m') for k in index if k > 0):
        raise ValueError('sous-chemin relatif : découpe non prévue')
    garde = ''.join(morceaux[k] for k in index)
    return corps[:m.start(1)] + garde + corps[m.end(1):]


ELEMENT = re.compile(r'<(path|circle|ellipse|rect|polygon)\b([^>]*?)(/>|>)')


def recolorer(corps, couleurs):
    """Icône en couleur : chaque élément reçoit le blanc, le rouge du fond, ou disparaît."""
    sortie, k, pos = [], 0, 0
    for m in ELEMENT.finditer(corps):
        sortie.append(corps[pos:m.start()])
        choix = couleurs.get(k, 'b')
        attrs = re.sub(r'\sfill="[^"]*"', '', m.group(2))
        if choix is None:
            elem = ''
        else:
            elem = f'<{m.group(1)} fill="{BLANC if choix == "b" else ROUGE}"{attrs}{m.group(3)}'
        sortie.append(elem)
        pos = m.end(); k += 1
    sortie.append(corps[pos:])
    return ''.join(sortie)


def peindre(corps, couleur, trait=None):
    corps = corps.replace('currentColor', couleur)
    if trait:
        corps = re.sub(r'stroke-width="([\d.]+)"', lambda m: f'stroke-width="{float(m.group(1)) * trait:g}"', corps)
    return corps


def poser(corps, l, t, w, h, taille, cx, cy, miroir=False):
    s = taille / max(w, h)
    ty = cy - (t + h / 2) * s
    if miroir:
        tx = cx + (l + w / 2) * s
        return f'<g transform="translate({tx:.3f} {ty:.3f}) scale({-s:.5f} {s:.5f})">{corps}</g>'
    tx = cx - (l + w / 2) * s
    return f'<g transform="translate({tx:.3f} {ty:.3f}) scale({s:.5f})">{corps}</g>'


def halo(corps, epaisseur_px, taille, w, h):
    """Le même dessin, en rouge et épaissi, posé sous un ajout pour le détacher du dessin principal."""
    s = taille / max(w, h)
    e = epaisseur_px / s
    c = corps.replace('currentColor', ROUGE)
    return f'<g stroke="{ROUGE}" stroke-width="{e:.2f}" stroke-linejoin="round" fill="{ROUGE}">{c}</g>'


# ---------------------------------------------------------------------------------------------
# Les signes ajoutés (barre, Z, glace fendue)
# ---------------------------------------------------------------------------------------------
def barre():
    return (f'<line x1="20" y1="20" x2="80" y2="80" stroke="{ROUGE}" stroke-width="17" stroke-linecap="round"/>'
            f'<line x1="20" y1="20" x2="80" y2="80" stroke="{BLANC}" stroke-width="7.5" stroke-linecap="round"/>')


def lettre_z(x, y, l, h, e):
    """Un « Z » de sommeil en tracé : barre du haut, diagonale, barre du bas."""
    d = (f'M{x} {y}H{x + l}V{y + e}L{x + e * 1.25} {y + h - e}H{x + l}V{y + h}H{x}V{y + h - e}'
         f'L{x + l - e * 1.25} {y + e}H{x}Z')
    return f'<path fill="{BLANC}" d="{d}"/>'


def glace_fendue():
    """Une plaque de glace fendue sous le personnage : deux dalles séparées par une fente en zigzag."""
    gauche = 'M12 70H50L45 76L52 82L46 88H12Z'
    droite = 'M56 70H88V88H52L58 82L51 76Z'
    return f'<path fill="{BLANC}" d="{gauche}"/><path fill="{BLANC}" d="{droite}"/>'


# ---------------------------------------------------------------------------------------------
def prefixer_ids(svg, prefixe):
    ids = set(re.findall(r'\sid="([^"]+)"', svg))
    for i in ids:
        svg = svg.replace(f'id="{i}"', f'id="{prefixe}-{i}"').replace(f'#{i})', f'#{prefixe}-{i})') \
                 .replace(f'href="#{i}"', f'href="#{prefixe}-{i}"')
    return svg


def construire(dossier, ident):
    r = RECETTES[ident]
    corps, l, t, w, h = icone(dossier, *r['icone'])
    if 'sous_chemins' in r:
        corps = garder_sous_chemins(corps, r['sous_chemins'])
    if 'couleurs' in r:
        corps = recolorer(corps, r['couleurs'])
    corps = peindre(corps, BLANC, r.get('trait'))
    principal = poser(corps, l, t, w, h, r.get('taille', 70), 50 + r.get('dx', 0), 50 + r.get('dy', 0),
                      r.get('miroir', False))
    if r.get('rotation'):
        principal = f'<g transform="rotate({r["rotation"]} 50 50)">{principal}</g>'
    morceaux = [f'<rect width="100" height="100" rx="14" fill="{ROUGE}"/>', principal]
    for genre, o in r.get('ajouts', []):
        if genre == 'barre':
            morceaux.append(barre())
        elif genre == 'z':
            morceaux.append(lettre_z(**o))
        elif genre == 'glace':
            morceaux.append(glace_fendue())
        elif genre == 'icone':
            c, l2, t2, w2, h2 = icone(dossier, o['jeu'], o['nom'])
            if o.get('halo'):
                morceaux.append(poser(halo(c, o['halo'], o['taille'], w2, h2), l2, t2, w2, h2,
                                      o['taille'], o['cx'], o['cy'], o.get('miroir', False)))
            morceaux.append(poser(peindre(c, BLANC, o.get('trait')), l2, t2, w2, h2, o['taille'], o['cx'], o['cy'],
                                  o.get('miroir', False)))
        else:
            raise ValueError(genre)
    sources = [':'.join(r['icone'])] + [f"{o['jeu']}:{o['nom']}" for g, o in r.get('ajouts', []) if g == 'icone']
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">'
           f'<!-- {ident} : {", ".join(sources)} (voir LISEZMOI.md) -->' + ''.join(morceaux) + '</svg>\n')
    svg = prefixer_ids(svg, ident)
    assert '<text' not in svg and '<image' not in svg and 'currentColor' not in svg, ident
    return svg


# ---------------------------------------------------------------------------------------------
# La planche de revue
# ---------------------------------------------------------------------------------------------
BANDE = [
    # Phrases d'essai, reprises de plan/dangers-inventaire.md ; elles servent à juger la taille, pas à être imprimées.
    ('4.', 'generatrice', 'Laisser la génératrice dehors, à 6 m du bâtiment ; ', 'co', 'le monoxyde endort sans odeur ; ',
     'electrocution', 'jamais de génératrice branchée sur la maison ; ', 'vapeurs', 'la vapeur d’essence coule au sol ; ',
     'huile-en-feu', 'couvercle sur le chaudron, jamais d’eau ; ', 'incendie', 'tout le monde dehors en moins de 3 minutes.'),
    ('7.', 'feu-de-foret', 'Partir avant que le chemin se ferme ; ', 'espace-clos', 'ne pas descendre dans la fosse ; ',
     'chimie', 'la lessive brûle en profondeur ; ', 'pas-au-feu', 'le bois traité ne va pas au poêle ; ', 'projection',
     'la meule peut éclater ; ', 'ecrasement', 'personne sous le quartier suspendu.'),
    ('9.', 'coupure', 'La cuisse se vide en quelques minutes ; ', 'brulure', 'le sirop et la poix collent à la peau ; ', 'froid',
     'le frisson qui cesse n’est pas un mieux ; ', 'eau-froide', 'tête hors de l’eau, respirer lentement ; ', 'glace',
     'la glace casse là où elle est mince ; ', 'ours', 'devant l’ours, ne pas courir ; ', 'orignal', 'devant l’orignal, courir et mettre un arbre entre lui et soi.'),
    ('12.', 'arme', 'Savoir ce qu’il y a derrière la cible ; ', 'rage', 'laver la morsure 10 à 15 minutes ; ', 'tularemie',
     'gants pour dépouiller le lièvre ; ', 'hantavirus', 'mouiller les crottes, ne pas balayer ; ', 'tetanos',
     'le vaccin se règle avant la saison ; ', 'cuisson', 'sonder le rôti d’orignal, 74 °C à cœur.'),
    ('15.', 'trichine', 'Ni le sel ni la fumée ne tuent la larve ; ', 'abats', 'jeter le foie et les reins ; ', 'botulisme',
     'le poisson fumé au froid, sous 3 °C ; ', 'zone-de-danger', 'compter les heures entre 4 et 60 °C ; ', 'mal-de-caribou',
     'ajouter du gras à la viande maigre.'),
    ('18.', 'thuyone', 'Sapin baumier ou épinette, jamais le cèdre ; ', 'plante', 'identifier à l’espèce, jamais goûter ; ',
     'plomb', 'le plomb de la grenaille est invisible et sans goût ; ', 'selles', 'laver les mains avant de manger ; ', 'poison',
     'ne pas faire vomir ; ', 'vie-en-jeu', 'partir pendant que la personne a l’air correcte.'),
]


def planche(dossier_svg, sortie_png, sortie_png_bande, scratch):
    def img(ident, cls):
        return f'<img class="{cls}" src="file://{dossier_svg}/{ident}.svg" alt="">'
    cases = ''.join(f'<div class="case">{img(i, "p")}<div class="id">{i}</div>'
                    f'<div class="nom">{RECETTES[i]["nom"]}</div></div>' for i in ORDRE)
    lignes = []
    for ligne in BANDE:
        html = f'<span class="no">{ligne[0]}</span> '
        for morceau in ligne[1:]:
            html += img(morceau, 'enligne') + ' ' if morceau in RECETTES else morceau.replace(' ;', '&nbsp;;') + ' '
        lignes.append(f'<p>{html}</p>')
    bande = f'<div class="bande"><div class="titre">À la taille du texte (10 pt, pictogramme à 1,2 em)</div>{"".join(lignes)}</div>'
    style = '''<style>
      @page { size: 216mm auto; }
      body { margin: 0; background: #fff; font-family: "DejaVu Sans", Arial, sans-serif; }
      .page { width: 210mm; padding: 8mm; box-sizing: border-box; background: #fff; }
      h1 { font: 600 13pt Georgia, "DejaVu Serif", serif; margin: 0 0 5mm; }
      .grille { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4mm 2mm; }
      .case { text-align: center; }
      .p { width: 25mm; height: 25mm; display: block; margin: 0 auto 1.2mm; }
      .id { font: 7pt "DejaVu Sans Mono", monospace; color: #555; }
      .nom { font: 7.5pt Georgia, "DejaVu Serif", serif; line-height: 1.15; color: #111; }
      .bande { margin-top: 8mm; border-top: 0.3mm solid #999; padding-top: 3mm; width: 150mm; }
      .bande .titre { font: 7pt "DejaVu Sans", sans-serif; color: #777; margin-bottom: 2mm; }
      .bande p { font: 10pt/1.45 Georgia, "DejaVu Serif", serif; margin: 0 0 1.2mm; color: #111; }
      .bande .no { font-weight: bold; }
      .enligne { height: 1.2em; width: 1.2em; vertical-align: -0.25em; }
    </style>'''
    html_planche = (f'<!doctype html><html><head><meta charset="utf-8">{style}</head><body><div class="page">'
                    f'<h1>Les 36 pictogrammes de danger</h1><div class="grille">{cases}</div>{bande}</div></body></html>')
    html_bande = (f'<!doctype html><html><head><meta charset="utf-8">{style}<style>.bande{{margin:0;border:0;}}'
                  f'body{{padding:4mm}}</style></head><body>{bande}</body></html>')
    os.makedirs(scratch, exist_ok=True)
    f1, f2 = os.path.join(scratch, 'planche.html'), os.path.join(scratch, 'bande.html')
    open(f1, 'w', encoding='utf-8').write(html_planche)
    open(f2, 'w', encoding='utf-8').write(html_bande)
    chrome = sorted(glob.glob('/opt/pw-browsers/chromium-*/chrome-linux/chrome'))[-1]
    mm = 96 / 25.4
    # planche : environ 200 dpi ; bande : 300 dpi
    for html, png, largeur, hauteur, echelle in [(f1, sortie_png, 210, 420, 200 / 96),
                                                 (f2, sortie_png_bande, 160, 160, 300 / 96)]:
        # La mise à l'échelle passe par CSS zoom : --force-device-scale-factor coupe le rendu en bas.
        texte = open(html, encoding='utf-8').read().replace('<body>', f'<body style="zoom:{echelle:.4f}">', 1)
        open(html, 'w', encoding='utf-8').write(texte)
        subprocess.run([chrome, '--headless', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
                        f'--screenshot={png}',
                        f'--window-size={round(largeur * mm * echelle)},{round(hauteur * mm * echelle)}',
                        'file://' + html],
                       check=True, stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)
        rogner(png, marge=round(6 * mm * echelle))


def rogner(png, marge):
    """Coupe le blanc en trop sous et à droite du contenu (fenêtre prise large exprès)."""
    try:
        from PIL import Image, ImageChops
    except ImportError:
        return
    im = Image.open(png).convert('RGB')
    boite = ImageChops.difference(im, Image.new('RGB', im.size, 'white')).getbbox()
    if boite:
        im.crop((0, 0, min(im.width, boite[2] + marge), min(im.height, boite[3] + marge))).save(png)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    dossier = os.path.abspath(sys.argv[1])
    for ident in ORDRE:
        with open(os.path.join(ICI, ident + '.svg'), 'w', encoding='utf-8') as f:
            f.write(construire(dossier, ident))
    print(f'{len(ORDRE)} pictogrammes écrits dans {ICI}')
    if '--apercu' in sys.argv:
        sortie = os.path.join(DEPOT, 'livre', 'apercus-palette')
        scratch = os.environ.get('PICTOS_TMP', os.path.join('/tmp', 'pictos-dangers-apercu'))
        planche(ICI, os.path.join(sortie, 'pictos-dangers.png'),
                os.path.join(sortie, 'pictos-dangers-taille-texte.png'), scratch)
        print('aperçus écrits dans', sortie)


if __name__ == '__main__':
    main()
