# -*- coding: utf-8 -*-
"""Couvertures des six tomes — direction 1, manuel de terrain, couleurs nordiques.

Couleurs retenues par JP le 28 septembre 2026 : écorce pour le tome 5, fonte pour le tome 6. Les variantes non
retenues (mousse, rouille) sont dans archives/ (couvertures-nordique-6-variantes.html, autonome, et son PDF).

Écrit, à côté de couvertures-nordique.html (les quatre tomes du 23 septembre, qu'on ne touche pas) :
  couvertures-nordique-6.html     six avants et six couvertures complètes (quatrième | tranche | avant)
  trait-NN-NN-<couleur>.svg       le dessin de chaque quatrième, tiré d'une planche validée, sans renvois, recoloré

  python build_couvertures_6.py              le HTML et les dessins (python3 hors de Windows)
  python build_couvertures_6.py --decouper   après l'impression par Edge de couvertures-nordique-6.pdf : un PDF
                                             par tome, aux mesures exactes de Blurb -> livre/tome-N/couverture.pdf
  python build_couvertures_6.py --sortie DIR le HTML et les dessins dans DIR, pour un aperçu : rien n'est écrit dans
                                             design/ ni dans livre/
  --photo bichromie|couleur                  la photo de JP au bloc des auteurs (PHOTO par défaut)
  --dessin K:N                               le N-ième candidat (1 à 3, CANDIDATS) pour le tome K, au lieu de CHOIX

Tout le rendu (HTML, PDF, découpe, aperçus) : outils/rendre_couvertures_6.sh
"""
import re, os, sys, math

def _racine_livre():
    # Windows (le PC de JP) : le dossier d'origine ; ailleurs (session dans le nuage) : le dépôt qui contient ce fichier
    if os.name == 'nt':
        return r'C:\Users\jeanp\New folder'
    d = os.path.dirname(os.path.abspath(__file__))
    while d != os.path.dirname(d) and not os.path.exists(os.path.join(d, 'CLAUDE.md')):
        d = os.path.dirname(d)
    return d

ROOT = _racine_livre()
D1 = os.path.join(ROOT, 'design', 'directions', '1-manuel-de-terrain')
IMG = os.path.join(ROOT, 'images')

# ------------------------------------------------------------------ tomes
# fond, encre, nom, nom de fichier (design/choix.md)
COUL = {
    1: ('#E2E7EA', '#15222B', 'neige', 'neige'),
    2: ('#5C1A15', '#F3ECE5', 'sang de gibier', 'sang'),
    3: ('#1D392E', '#E9F0EA', 'épinette', 'epinette'),
    4: ('#25414F', '#EDF2F5', 'fleuve', 'fleuve'),
    5: ('#4B3A28', '#F2EBDF', 'écorce', 'ecorce'),
    6: ('#363432', '#EEEBE6', 'fonte', 'fonte'),
}
# Chapitres : plan/tomes-6-proposition.md (numéros du 27 septembre 2026). Poids de la barre = nombre de chapitres.
TOMES = {
    1: dict(titre='Tenir', h1=['Tenir'], taille=86, ch=('01', '18'), n=18),
    2: dict(titre='Le corps', h1=['Le corps'], taille=86, ch=('19', '40'), n=22),
    3: dict(titre='Prélever', h1=['Prélever'], taille=86, ch=('41', '60'), n=20),
    4: dict(titre='De la bête au garde-manger', h1=['De la bête', 'au garde-manger'], taille=57, ch=('61', '81'), n=21),
    5: dict(titre='La forêt, le jardin et le chalet', h1=['La forêt,', 'le jardin', 'et le chalet'], taille=66, interligne=1.02,
            ch=('82', '101'), n=20),
    6: dict(titre='L’atelier', h1=['L’atelier'], taille=86, ch=('102', '112'), n=11),
}
# Sommaire de la quatrième : les titres des chapitres tels qu'assemblés (livre/tome-N/rapport.md, tableau « Pages »),
# espaces insécables compris (  insécable,   fine devant le deux-points).
# verifier() compare avec le rapport de chaque tome.
SOMMAIRE = {
    1: [('01', 'Les quatre horloges'),
        ('02', 'Rester ou partir'), ('03', 'Panne majeure d’Hydro en janvier'), ('04', 'Retombées radioactives'),
        ('05', 'Le stock permanent du chalet'), ('06', 'La liste de 72 heures'), ('07', 'Quand on a un préavis'),
        ('08', 'Listes par scénario'), ('09', 'Ce qui manque toujours'), ('10', 'Eau : puiser, filtrer, désinfecter'),
        ('11', 'Le feu de forêt'), ('12', 'La tente d’hiver et l’abri de neige'), ('13', 'Feu sans allumettes'),
        ('14', 'Communiquer et savoir'), ('15', 'Se déplacer et le carburant'), ('16', 'Le voisinage et le groupe de chasse'),
        ('17', 'Qui cogne à la porte'), ('18', 'S’organiser à plusieurs familles')],
    2: [('19', 'Le mal de caribou'), ('20', 'Le scorbut et l’arbre de vie'), ('21', 'Ce qu’un corps demande l’hiver'),
        ('22', 'Abats et organes'), ('23', 'Ce que personne ne garde'), ('24', 'Le corps qui travaille'),
        ('25', 'Le froid lui-même'), ('26', 'Soigner quand il n’y a personne'), ('27', 'Les dents'),
        ('28', 'Les maladies ordinaires qui durent'), ('29', 'La santé des femmes'), ('30', 'Épidémie'),
        ('31', 'Hygiène et eaux usées'), ('32', 'Bâtir la pharmacie'), ('33', 'Plantes médicinales boréales'),
        ('34', 'Soigner avec la forêt, par symptôme'), ('35', 'Ce qu’on ne peut pas soigner'),
        ('36', 'Tenir le moral tout un hiver'), ('37', 'Le sauna et le bien-être'),
        ('38', 'Le deuil, le choc et la peur des adultes'), ('39', 'Les jeunes enfants'),
        ('40', 'Les enfants, la peur et la routine')],
    3: [('41', 'Calendrier annuel de prélèvement'), ('42', 'Lire le territoire autour du chalet'),
        ('43', 'Les traces et les signes des animaux'), ('44', 'Pister et retracer une bête'),
        ('45', 'Les armes, les munitions et l’arc'), ('46', 'Comment lire une fiche d’espèce'), ('47', 'Chasser le petit gibier'),
        ('48', 'Lièvre d’Amérique'), ('49', 'Gélinotte huppée et tétras du Canada'), ('50', 'Castor'), ('51', 'Porc-épic'),
        ('52', 'Ours noir'), ('53', 'Rat musqué, écureuil roux, marmotte'), ('54', 'Outarde, canards, oiseaux d’eau'),
        ('55', 'Martre, vison, renard, lynx, loup'), ('56', 'Phoque du Saint-Laurent'), ('57', 'Truite et omble au lac'),
        ('58', 'Pêche blanche'), ('59', 'Éperlan et poisson du fleuve'), ('60', 'Nasses, filets, verveux')],
    4: [('61', 'Abattage, saignée, éviscération'), ('62', 'Carte de la carcasse'), ('63', 'Quartier arrière'),
        ('64', 'Quartier avant'), ('65', 'Le dos'), ('66', 'Pourquoi la viande pourrit'), ('67', 'Le sel'),
        ('68', 'Salaison à sec'), ('69', 'Saumure'), ('70', 'Fumage à froid'), ('71', 'Fumage à chaud et séchage'),
        ('72', 'Pemmican et graisses'), ('73', 'Froid naturel'), ('74', 'Un congélateur plein qui dégèle'),
        ('75', 'Traiter le poisson à la sortie de l’eau'), ('76', 'Saler et sécher la truite'), ('77', 'Fumer le poisson'),
        ('78', 'Conserves et marinades'), ('79', 'Caveau à légumes'), ('80', 'Fermentation'),
        ('81', 'La table aliment → méthode')],
    5: [('82', 'Le feu au chalet'), ('83', 'Poêles à bois et rendement'), ('84', 'Ouvrir et fermer le chalet'), ('85', 'Éclairage'),
        ('86', 'L’électricité du chalet et le froid mécanique'), ('87', 'Sans propane'), ('88', 'Le pain'),
        ('89', 'Raquettes et toboggan'), ('90', 'Le canot : réparer, porter, en refaire un'), ('91', 'Petits fruits'),
        ('92', 'Plantes comestibles boréales'), ('93', 'Champignons'), ('94', 'Sève, gomme, écorces'), ('95', 'Jardin nordique'),
        ('96', 'Faire la terre sans rien acheter'), ('97', 'Allonger la saison'), ('98', 'Ce qui nourrit un hiver'),
        ('99', 'Les façons de faire d’autrefois'), ('100', 'Semences'), ('101', 'Petit élevage')],
    6: [('102', 'De la peau au cuir'), ('103', 'Babiche, tendons, cordage'), ('104', 'Coudre et chausser'),
        ('105', 'Affûter, limer, aiguiser'), ('106', 'Scie à chaîne et petits moteurs'), ('107', 'Souder, braser, réparer le métal'),
        ('108', 'Le stock de pièces et de consommables'), ('109', 'Leviers, poulies, treuils'), ('110', 'Assemblages bois-bois'),
        ('111', 'Trempe et travail du métal à chaud'), ('112', 'Savon et chandelles')],
}
# ------------------------------------------------------------------ tranche
# Blurb : la tranche ne se calcule pas, elle se lit au calculateur, par paliers (sources/blurb-specifications.md §2,
# relevé du 27 septembre 2026 : 8 × 10, couverture souple, papier Standard). (pages, tranche en po)
BLURB_SOUPLE = [(20, .056), (24, .056), (40, .125), (60, .181), (80, .181), (100, .25), (120, .306), (140, .306),
                (160, .375), (180, .431), (200, .5), (220, .5), (240, .556), (260, .625), (280, .625), (300, .681),
                (320, .75), (340, .806), (360, .806), (380, .875), (400, .931), (420, .931), (440, 1.0)]
# Pages par tome : COMPTES RÉELS des six tomes réassemblés le 29 septembre 2026 (livre/tome-N/rapport.md,
# design/outils/assembler-tome.py ; photos ajoutées : tome 3 passe de 332 à 334, les autres ne bougent pas ;
# planches du ch. 62, 29 septembre 10 h 23 : tome 4 passe de 284 à 298, même tranche, 0,681 po ; choix de JP
# sur les noms et le grain, ch. 62 à 64 et 81, réassemblé le même jour : 298, inchangé).
# Un tome réassemblé qui change de nombre de pages arrête l'outil (verifier) : on remet le compte ici, et la
# couverture se refait avec sa nouvelle tranche.
# Réassemblés le 14 octobre 2026 (hors ligne, calculateur non interrogé) : tome 2, 416 -> 414 (entre les lignes 400 et
# 420, toutes deux 0,931 : tranche inchangée) ; tome 3, 334 -> 332 (palier de la ligne 320, 0,75 : inchangée) ; les
# quatre autres ne bougent pas.
PAGES = {1: 308, 2: 416, 3: 334, 4: 300, 5: 440, 6: 202}

def palier(pages):
    """Paliers du tableau : 1/16 po (4,5 pt) toutes les 28 pages, arrondi au point inférieur. Les 23 lignes du
    tableau et les six réponses du calculateur pour les tomes assemblés suivent toutes cette lecture (vérifié
    plus bas) ; ce n'est pas une règle publiée par Blurb."""
    return round(int(4.5 * -(-pages // 28)) / 72, 3)

assert all(palier(n) == t for n, t in BLURB_SOUPLE), 'la lecture des paliers ne redonne plus le tableau de Blurb'

def tranche(pages):
    """Tranche en po, au tableau de Blurb, et la ligne qui la donne. Entre deux lignes, le palier est celui de
    l'une des deux lignes qui encadrent le compte (vérifié), jamais une interpolation."""
    if not 20 <= pages <= 440 or pages % 2:
        raise ValueError('%d pages : Blurb veut un nombre pair de 20 à 440 (papier Standard)' % pages)
    for n, t in BLURB_SOUPLE:
        if pages == n:
            return t, 'ligne %d p. du tableau' % n
    bas = max(l for l in BLURB_SOUPLE if l[0] < pages)
    haut = min(l for l in BLURB_SOUPLE if l[0] > pages)
    t = palier(pages)
    assert t in (bas[1], haut[1]), (pages, t, bas, haut)
    n = bas[0] if t == bas[1] else haut[0]
    return t, 'entre %d p. (%s) et %d p. (%s) du tableau : palier de la ligne %d' % (bas[0], bas[1], haut[0], haut[1], n)

SPINE, PROV = {}, {}
for _k, _p in PAGES.items():
    SPINE[_k], PROV[_k] = tranche(_p)

def rapport_tome(k):
    """(pages, tranche en po) lus dans livre/tome-k/rapport.md (réponse du calculateur), ou None."""
    f = os.path.join(ROOT, 'livre', 'tome-%d' % k, 'rapport.md')
    if not os.path.exists(f):
        return None
    s = open(f, encoding='utf-8').read()
    p = re.search(r'Calculateur de Blurb interrogé .*? pour \*\*(\d+) pages\*\*.*?couverture \*\*souple\*\*', s)
    # un tome assemblé --hors-ligne n'a pas de réponse du calculateur : le compte se lit à la ligne du fichier
    p = p or re.search(r'^- \*\*Fichier :\*\* `[^`]*interieur\.pdf` — (\d+) pages', s, re.M)
    t = re.search(r'\*\*Tranche\s*:\s*([\d.]+)\s*x\s*10\.25 po', s)
    ch = re.findall(r'^\|\s*[\d–]+\s*\|\s*ch\.\s*(\w+)\s*—\s*(.+?)\s*\|', s, re.M)
    return (int(p.group(1)) if p else None, float(t.group(1)) if t else None, ch)

def verifier():
    """Le compte de PAGES, la tranche du tableau et le sommaire contre le rapport d'assemblage de chaque tome."""
    notes, erreurs = [], []
    for k in sorted(PAGES):
        r = rapport_tome(k)
        if not r:
            notes.append('tome %d : pas de rapport d\'assemblage, compte de PAGES pris tel quel' % k)
            continue
        pages, tr, ch = r
        if pages is not None and pages != PAGES[k]:
            erreurs.append('tome %d : %d pages dans PAGES, %d dans livre/tome-%d/rapport.md — remettre le compte' % (k, PAGES[k], pages, k))
        if tr is not None and pages == PAGES[k] and abs(tr - SPINE[k]) > 0.0005:
            erreurs.append('tome %d : tranche %s au tableau, %s au calculateur (rapport)' % (k, SPINE[k], tr))
        if ch:
            du_rapport = [(n, t.replace("'", '’')) for n, t in ch]
            if du_rapport != [(n, t.replace("'", '’')) for n, t in SOMMAIRE[k]]:
                erreurs.append('tome %d : le sommaire ne suit plus le rapport : %s' % (k, du_rapport))
    return notes, erreurs

# ------------------------------------------------------------------ dessins des quatrièmes
# Une vue d'une planche VALIDÉE (images/validees/), sans ses renvois ni sa légende : le groupe data-vue de la planche
# (les renvois sont hors des groupes), ses motifs de hachure, recolorés à l'encre et au fond du tome. Une planche sans
# groupe data-vue (107-09) donne sa vue par deux repères du fichier : « entre » (début compris, fin exclue).
# vb : boîte de la vue en unités de la planche, mesurée le 14 octobre 2026 sur les planches de la charte du
# 12 octobre (getBBox dans Chromium, plus 2,5 de marge pour le trait ; contrôlée au pixel près sur le rendu, flèches
# et bouts de trait compris).
# Échelle : celle du tome 4 d'avant (612 unités sur 7 po), réduite si la vue dépasse 7 × HMAX po. Depuis le bloc
# « Les auteurs » (14 octobre 2026, soir), le dessin n'a plus que 1,8 po de haut au plus (JP : pas sous 1,8 po environ).
# Une vue réduite garde le trait des autres : ses épaisseurs sont multipliées d'autant (_epaissir), sinon l'arc à
# feu sortait à 1,3 pt au contour contre 2 pt sur les tomes 3 à 6.
ECH = 7.0 / 612
LMAX, HMAX = 7.0, 1.8
# Les six vues de la première reprise sur les planches de la charte (14 octobre 2026 : arc à feu, attelle, verveux,
# fumoir, châssis froid, soudure). JP a trouvé bizarre la main de l'arc à feu et demandé d'autres images : gardées ici pour mémoire.
PREMIERS = {
    1: dict(planche='planche-13-01-arc-feu.svg', vue='monte', vb=(53.5, 38.5, 573, 365), fic='trait-13-01',
            cap='Ch. 13 · L’arc à feu'),
    # le repère de coupe A–A (trait mixte, flèches, deux « A » en Georgia), ajouté à la planche le 28 septembre après
    # les couvertures, sort (29 septembre) : il renvoie à la vue « Coupe A–A », absente de la couverture
    2: dict(planche='planche-26-08-attelle-ecorce-moulee-echarpe.svg', vue='mouler', vb=(294.7, 45.5, 328.5, 270.5),
            fic='trait-26-08', cap='Ch. 26 · L’attelle d’écorce moulée',
            sans=[r'x1="114" y1="186" x2="114" y2="272"', r'x1="114" y1="186" x2="114" y2="193"',
                  r'x1="114" y1="186" x2="110" y2="186"', r'd="M110\.5,183 L104,186 L110\.5,189 Z"',
                  r'x="114" y="180"[^>]*>A<', r'x1="114" y1="272" x2="114" y2="265"',
                  r'x1="114" y1="272" x2="110" y2="272"', r'd="M110\.5,269 L104,272 L110\.5,275 Z"',
                  r'x="114" y="287"[^>]*>A<']),
    3: dict(planche='planche-60-01-verveux-cerceaux-monte-pose.svg', vue='coupe', vb=(41.5, 66.1, 544.8, 162.8),
            fic='trait-60-01', cap='Ch. 60 · Le verveux sur cerceaux'),
    # la cote « 2 ou 3 pas » et ses lignes de rappel sortent : une cote sans son chapitre ne dit rien sur une couverture
    4: dict(planche='planche-71-02-fumoir-baril-conduit-enterre.svg', vue='coupe', vb=(37.5, 48.5, 605, 200),
            fic='trait-71-02', cap='Ch. 71 · Le fumoir de baril sur conduit enterré',
            sans=[r'x1="140" y1="112" x2="447" y2="112"', r'x1="140" y1="106" x2="140" y2="118"',
                  r'x1="447" y1="106" x2="447" y2="118"', r'>2 ou 3 pas<', r'x1="140" y1="118" x2="140" y2="136.5"']),
    5: dict(planche='planche-95-09-chassis-froid.svg', vue='monte', vb=(165.3, 65.6, 352.1, 182.9), fic='trait-95-09',
            cap='Ch. 95 · Le châssis froid'),
    # la vue de côté de la planche 107-09 (12 octobre 2026), sans les deux loupes, les lignes de rappel ni les renvois ;
    # elle remplace le trait de l'ancienne planche 84-09 (trait-84-09-clair.svg, gardé pour mémoire)
    6: dict(planche='planche-107-09-soudage-batteries.svg', vue='de côté',
            entre=('<!-- contours extérieurs -->', '<!-- loupe du serre-joint'), vb=(37.5, 39.9, 605, 190.6),
            fic='trait-107-09', cap='Ch. 107 · Souder avec deux batteries'),
}

# Trois candidats par tome (14 octobre 2026, soir) : un objet, une construction ou un montage, en profondeur (perspective ou
# élévation), typique du tome, sans main, ni corps, ni tête. vb mesurée comme plus haut (getBBox + 2,5, ramenée au rendu
# à 1,5 près quand une découpe de la planche cache une partie de la vue). Le premier est celui que je recommande ; CHOIX (ou
# --dessin K:N) en prend un autre. Les marques rouges de contrôle sortent (un cercle sur une couverture ne désigne rien),
# comme les cotes.
CANDIDATS = {
    1: [dict(planche='planche-12-05a-maison-blocs-tailler-monter.svg', vue='spirale', vb=(344.8, 144, 294.4, 190.5), fic='trait-12-05a',
             cap='Ch. 12 · La maison de blocs',
             sans=[r'<circle cx="235" cy="207\.3" r="13" fill="none" stroke="#9B2C1E"']),
        dict(planche='planche-11-03-chalet-pare-aux-braises.svg', vue='chalet', vb=(37.7, 94.8, 604.6, 252.7), fic='trait-11-03',
             cap='Ch. 11 · Le chalet paré aux braises'),
        dict(planche='planche-10-03-alambic-fortune.svg', vue='serpentin', vb=(410.5, 117.5, 227.5, 157), fic='trait-10-03',
             cap='Ch. 10 · L’alambic de fortune')],
    2: [dict(planche='planche-37-03a-bain-vapeur-sous-bache.svg', vue='armature', vb=(61.2, 91.7, 188.6, 131.3), fic='trait-37-03a',
             cap='Ch. 37 · Le bain de vapeur : l’armature'),
        dict(planche='planche-24-03-chevalet-sciage.svg', vue='axo', vb=(95.7, 53.2, 259.1, 261.8), fic='trait-24-03',
             cap='Ch. 24 · Le chevalet de sciage'),
        dict(planche='planche-34-03-sirop-pese-fleau-bras.svg', vue='vide', vb=(44.7, 181, 329.6, 162.8), fic='trait-34-03',
             cap='Ch. 34 · Le fléau à bras égaux'),
        # JP, 14 octobre 2026 : l'armature laissait du vide à droite ; la cabane du sauna à fumée, pendant la chauffe, en
        # coupe (le poêle de pierres, la fumée, le banc), sans son cercle de contrôle ; l'encadré danger est hors de la vue
        dict(planche='planche-37-05-sauna-fumee-poele-pierres.svg', vue='cabane', vb=(37.7, 357.2, 397.6, 199.6), fic='trait-37-05',
             cap='Ch. 37 · Le sauna à fumée, pendant la chauffe',
             sans=[r'<circle cx="305\.4" cy="113\.6" r="11" fill="none" stroke="#9B2C1E"'])],
    3: [dict(planche='planche-55-08-assommoir-sa-gachette-trois.svg', vue='arme', vb=(37.7, 102.5, 359.6, 190.5), fic='trait-55-08',
             cap='Ch. 55 · L’assommoir armé'),
        dict(planche='planche-58-07-brimbale-bois.svg', vue='elevation', vb=(37.7, 26.3, 437.6, 260.5), fic='trait-58-07',
             cap='Ch. 58 · La brimbale de bois',
             sans=[r'<circle cx="259\.8" cy="52\.8" r="12" fill="none" stroke="#9B2C1E"']),
        dict(planche='planche-54-08-glaciere-evaporation.svg', vue='cadre', vb=(45.7, 76.5, 276.3, 226.3), fic='trait-54-08',
             cap='Ch. 54 · La glacière à évaporation')],
    4: [dict(planche='planche-70-12-cage-viande-grillagee.svg', vue='ens', vb=(91, 58.4, 241.8, 298.3), fic='trait-70-12',
             cap='Ch. 70 · La cage à viande grillagée'),
        dict(planche='planche-75-08-glaciere-deux-caisses.svg', vue='eclate', vb=(98, 394.7, 253.9, 268.3), fic='trait-75-08',
             cap='Ch. 75 · La glacière de deux caisses'),
        dict(planche='planche-67-09-fleau-ses-etalons-eau.svg', vue='monte', vb=(45.7, 92.5, 421.6, 170.8), fic='trait-67-09',
             cap='Ch. 67 · Le fléau et ses étalons d’eau')],
    5: [dict(planche='planche-90-07a-canot-ecorce-epinette-seule.svg', vue='cote', vb=(63.5, 61, 553, 106.7), fic='trait-90-07a',
             cap='Ch. 90 · Le canot d’écorce d’épinette'),
        dict(planche='planche-97-04-tunnel-perches.svg', vue='ensemble', vb=(64.7, 72, 567.3, 124.3), fic='trait-97-04',
             cap='Ch. 97 · Le tunnel de perches'),
        dict(planche='planche-94-33b-casseau-ecorce-plie-cousu.svg', vue='monte', vb=(62.9, 157.3, 324.3, 161.7), fic='trait-94-33b',
             cap='Ch. 94 · Le casseau d’écorce')],
    6: [dict(planche='planche-110-01a-mortaise-tenon-mi-bois.svg', vue='mt', vb=(90, 51.2, 361, 304.6), fic='trait-110-01a',
             cap='Ch. 110 · La mortaise et le tenon'),
        dict(planche='planche-110-01b-tenon-passant-cle-enture.svg', vue='enture', vb=(75, 485.7, 534, 173.1), fic='trait-110-01b',
             cap='Ch. 110 · L’enture à mi-bois',
             sans=[r'<line x1="207" y1="176\.4" x2="221"', r'<line x1="207" y1="192\.4" x2="221"',
                   r'<line x1="216" y1="176\.4" x2="216" y2="192\.4"', r'<line x1="210" y1="176\.4" x2="222"',
                   r'<line x1="210" y1="192\.4" x2="222"', r'>½ ép\.<']),
        dict(planche='planche-109-12-tourniquet-espagnol.svg', vue='montage', vb=(45.7, 43.5, 588.6, 166.4), fic='trait-109-12',
             cap='Ch. 109 · Le tourniquet espagnol'),
        # JP, 14 octobre 2026 : la mortaise laissait du vide à droite ; on reprend la soudure aux deux batteries
        dict(PREMIERS[6])],
}
CHOIX = {1: 2, 2: 4, 3: 1, 4: 3, 5: 1, 6: 4}   # tome 1 : le chalet (JP, 14 oct. : « non, une autre » pour la maison de blocs)
# tomes 2, 4 et 6 (JP, 14 oct., sur les six couvertures finales) : dessin trop petit, du vide à droite -> le sauna à fumée,
# le fléau et ses étalons, la soudure aux deux batteries

def choisir(choix=None):
    """TRAIT : le candidat retenu pour chaque tome (CHOIX, ou les choix donnés)."""
    c = dict(CHOIX, **(choix or {}))
    return {k: CANDIDATS[k][c[k] - 1] for k in CANDIDATS}

TRAIT = choisir()

def _sans_commentaires(s):
    return re.sub(r'<!--.*?-->', '', s, flags=re.S)

def _groupe(s, vue):
    """Le <g data-vue="vue"> complet, groupes imbriqués compris."""
    m = re.search(r'<g\b[^>]*\bdata-vue="%s"' % re.escape(vue), s)
    if not m:
        raise ValueError('pas de groupe <g data-vue="%s"> dans la planche' % vue)
    a = m.start()
    d = 0
    for m in re.finditer(r'<(/?)g\b[^>]*?(/?)>', s[a:]):
        if m.group(1):
            d -= 1
        elif not m.group(2):
            d += 1
        if d == 0:
            return s[a:a + m.end()]
    raise ValueError('groupe %s non fermé' % vue)

def _entre(s, debut, fin):
    """Le morceau de la planche entre deux repères (une planche sans groupes data-vue)."""
    if s.count(debut) != 1 or s.count(fin) != 1:
        raise ValueError('repères « %s » / « %s » trouvés %d et %d fois' % (debut, fin, s.count(debut), s.count(fin)))
    a, b = s.index(debut), s.index(fin)
    if b <= a:
        raise ValueError('repère de fin avant le repère de début')
    return '<g>\n%s\n</g>' % s[a:b].strip()

# La charte des planches (12 octobre 2026) sur le fond du tome. Le noir est l'encre, le blanc est le fond ; les deux
# gris sont l'encre posée sur le fond à 10 % (#E6E6E6, ce qui est derrière) et à 20 % (#CFCFCF, la face à l'ombre) :
# essayés à 6/12, 8/16, 10/20 et 12/25 % sur l'épinette, le fleuve et l'écorce (14 octobre 2026), 12/25 faisait une
# tache claire sur les fonds foncés (la face du châssis froid), 10/20 se lit comme une ombre douce. Le rouge #9B2C1E
# prend l'encre : sur une couverture, il ne désigne rien. Toute autre couleur arrête l'outil.
GRIS = (0.10, 0.20)

def _melange(fond, encre, t):
    f, e = ([int(c[i:i + 2], 16) for i in (1, 3, 5)] for c in (fond, encre))
    return '#%02X%02X%02X' % tuple(round(a + (b - a) * t) for a, b in zip(f, e))

def palette(fond, encre, gris=GRIS):
    return {'#1A1A1A': encre, '#000000': encre, '#000': encre, '#9B2C1E': encre,
            '#FFFFFF': fond, '#FFF': fond,
            '#E6E6E6': _melange(fond, encre, gris[0]), '#CFCFCF': _melange(fond, encre, gris[1])}

def _recolorer(s, fond, encre, gris=GRIS):
    table, inconnues = palette(fond, encre, gris), set()
    def couleur(m):
        c = m.group(0).upper()
        if c not in table:
            inconnues.add(c)
            return m.group(0)
        return table[c]
    # les couleurs seulement : pas les renvois url(#…) ni href="#…"
    s = re.sub(r'(?<!url\()(?<!href=")#(?:[0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b', couleur, s)
    if inconnues:
        raise ValueError('couleurs non prévues dans le dessin : %s' % sorted(inconnues))
    return s

def echelle(k, t=None):
    """Pouces par unité de planche pour le dessin du tome k : ECH, ou moins si la vue dépasse la place."""
    t = t or TRAIT[k]
    w, h = t['vb'][2], t['vb'][3]
    return min(ECH, LMAX / w, HMAX / h)

def _epaissir(s, f):
    """Traits (et tiretés) multipliés par f, hors des <marker> (leur dessin suit déjà l'épaisseur du trait qui les
    porte) : une vue réduite pour tenir dans la place garde ainsi le trait des quatre autres quatrièmes."""
    def mul(m):
        v = ' '.join('%g' % round(float(x) * f, 2) for x in re.split(r'[\s,]+', m.group(2).strip()))
        return '%s="%s"' % (m.group(1), v)
    morceaux = re.split(r'(<marker\b.*?</marker>)', s, flags=re.S)
    return ''.join(m if m.startswith('<marker') else re.sub(r'(stroke-width|stroke-dasharray)="([^"]*)"', mul, m)
                   for m in morceaux)

def trait_svg(k, vb=None, t=None):
    """Le SVG du dessin de la quatrième du tome k, recoloré (vb : une autre boîte, pour la mesure ; t : un autre
    candidat que celui retenu)."""
    t = t or TRAIT[k]
    fond, encre = COUL[k][:2]
    s = open(os.path.join(IMG, t['planche']), encoding='utf-8').read()
    titre = re.search(r'<title>(.*?)</title>', s).group(1)
    defs = re.search(r'<defs>.*?</defs>', s, re.S)
    corps = _sans_commentaires(_entre(s, *t['entre']) if 'entre' in t else _groupe(s, t['vue']))
    for motif in t.get('sans', []):
        corps, n = re.subn(r'^.*%s.*\n?' % motif, '', corps, flags=re.M)
        if n != 1:
            raise ValueError('%s : « %s » trouvé %d fois' % (t['planche'], motif, n))
    out = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="%g %g %g %g" role="img">\n'
           '<title>Trait tiré de la %s — vue « %s », sans renvois</title>\n%s\n%s\n</svg>\n') % (
        tuple(vb or t['vb']) + (esc(titre[0].lower() + titre[1:]), t['vue'],
                                _sans_commentaires(defs.group(0)) if defs else '', corps))
    f = ECH / echelle(k, t) if t.get('vb') else 1
    if f > 1.001:
        out = _epaissir(out, f)
    return _recolorer(out, fond, encre, t.get('gris', GRIS))

def traits(dest=None):
    dest = dest or D1
    tailles = {}
    for k, t in TRAIT.items():
        slug = COUL[k][3]
        open(os.path.join(dest, '%s-%s.svg' % (t['fic'], slug)), 'w', encoding='utf-8').write(trait_svg(k))
        e = echelle(k)
        tailles[k] = (t['vb'][2] * e, t['vb'][3] * e)
    return tailles

# ------------------------------------------------------------------ les auteurs (quatrième)
# JP, 14 octobre 2026 : nos deux photos et un court texte sur chacun, au dos de la couverture, à la place d'une page
# « Les auteurs » dans le livre (qui ne se fait pas : les comptes de pages ne bougent pas). Textes de JP (cinquième
# version, 14 octobre 2026), réécrits le 18 octobre 2026 à sa demande (« refais nos textes avec nos règles d'écriture ») :
# sans image ni personnification, sans maxime, sans opposition fabriquée ni chute ; les mêmes faits. Celui de Claude
# allongé le 19 octobre (JP : « ajoute-toi du texte dans ta description ») : les chapitres écrits et les planches
# dessinées avec Jean-Philippe, qui décidait. Refaits le 19 octobre au soir (JP : « il sait que le courant tombera…
# je l'aime pas », « vit à Baie-Comeau et il aime le bois, c'est dull », « 4 fois Claude en un paragraphe ») : JP a
# choisi « Le père » et « Le travail » parmi trois versions de chacun.
AUTEURS = [
    dict(nom='Jean-Philippe Lavoie', qualite='', image='jp',
         texte='Jean-Philippe vit à Baie-Comeau et il est père de deux enfants. Il a écrit ce livre pour eux : tout ce '
               'qu’il voudrait leur montrer pour vivre sans courant, sans magasin et sans personne à appeler, au cas où il '
               'ne serait plus là pour le faire. Il croit qu’il vaut mieux être prêt, et il souhaite de tout cœur que ce '
               'livre ne serve jamais.'),
    dict(nom='Claude', qualite='(intelligence artificielle, Anthropic)', image='claude',
         texte='Claude a fait la recherche, a écrit les chapitres et a dessiné les planches. Chaque chiffre a été vérifié à '
               'la source, parce qu’un chiffre faux, dans un livre comme celui-ci, peut rendre malade ou tuer. Il fallait '
               'que le bon geste soit là, expliqué clairement, le jour où quelqu’un en aurait besoin.'),
]
# La photo de JP (images/auteurs/jp.jpg, fond blanc) : « bichromie » (l'ombre à la couleur sombre du tome, la lumière
# à la claire ; sur la neige, le fond blanc de la photo devient exactement le fond de la couverture) ou « couleur ».
# L'étincelle de Claude (images/auteurs/claude.svg) passe à l'encre du tome. Les deux dans un cercle filé à l'encre.
PHOTO = 'bichromie'

def _rgb(c):
    return tuple(int(c[i:i + 2], 16) for i in (1, 3, 5))

def _clair(c):
    r, g, b = _rgb(c)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def auteurs_fichiers(k, dest, photo=None):
    """Les images du bloc des auteurs pour le tome k, écrites dans dest ; rend {image: nom de fichier}."""
    fond, encre, nom, slug = COUL[k]
    photo = photo or PHOTO
    from PIL import Image
    # recadrée sur le visage (300 px du carré de 400) : dans un cercle de 0,66 po, la photo entière laissait la tête petite
    src = Image.open(os.path.join(IMG, 'auteurs', 'jp.jpg')).crop((45, 5, 345, 305))
    if photo == 'couleur':
        jp = 'auteur-jp.jpg'
        src.convert('RGB').save(os.path.join(dest, jp), quality=95)
    elif photo == 'bichromie':
        im = src.convert('L')
        im = im.point([min(255, round(v * 255 / 245)) for v in range(256)])   # le fond de la photo (≥ 245) au blanc franc
        sombre, clair = sorted((_rgb(fond), _rgb(encre)), key=lambda c: 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2])
        jp = 'auteur-jp-%s.png' % slug
        Image.merge('RGB', [im.point([round(a + (b - a) * v / 255) for v in range(256)]) for a, b in zip(sombre, clair)]
                    ).save(os.path.join(dest, jp), optimize=True)
    else:
        raise ValueError('photo : « bichromie » ou « couleur », pas « %s »' % photo)
    s = open(os.path.join(IMG, 'auteurs', 'claude.svg'), encoding='utf-8').read()
    reste = set(c.upper() for c in re.findall(r'#[0-9A-Fa-f]{6}\b', s)) - {'#D97757'}
    if reste:
        raise ValueError('claude.svg : couleurs non prévues %s' % sorted(reste))
    claude = 'auteur-claude-%s.svg' % slug
    open(os.path.join(dest, claude), 'w', encoding='utf-8').write(re.sub(r'#D97757', encre, s, flags=re.I))
    return {'jp': jp, 'claude': claude}

def auteurs_html(fichiers):
    blocs = []
    for a in AUTEURS:
        img = '<img src="%s" alt="">' % fichiers[a['image']]
        tete = '<b class="nw">%s</b>%s' % (esc(a['nom']), ' ' + esc(a['qualite']) if a['qualite'] else '')
        # insécable devant les tirets et les deux-points (fine, comme au texte de la série) ; aucun mot coupé, pas même
        # au trait d'union (Jean-Philippe, Baie-Comeau)
        texte = esc(a['texte']).replace(' — ', '&nbsp;— ').replace(' :', '&#8239;:').replace(' ;', '&#8239;;')
        texte = re.sub(r'(\S+-\S+)', r'<span class="nw">\1</span>', texte)
        blocs.append('<div class="a"><span class="ph %s">%s</span><p>%s&nbsp;— %s</p></div>' % (a['image'], img, tete, texte))
    return '<div class="auteurs"><h2>Les auteurs</h2><div class="aut">%s</div></div>' % ''.join(blocs)

# ------------------------------------------------------------------ gabarits HTML
esc = lambda s: s.replace('&', '&amp;').replace('<', '&lt;')

def serie(on):
    parts = []
    for k in range(1, 7):
        d = TOMES[k]
        parts.append('<div class="s%d%s"><i>%d</i><small>%s–%s</small></div>' % (k, ' on' if k == on else '', k, d['ch'][0], d['ch'][1]))
    return '<div class="serie">' + ''.join(parts) + '</div>'

def avant_in(k):
    d = TOMES[k]
    style = 'font-size:%gpt' % d['taille'] + (';line-height:%g' % d['interligne'] if 'interligne' in d else '')
    return ('<div class="hd"><span>Le Manuel du Nord</span><span class="r">Tome %d sur 6</span></div>\n'
            '  <div class="num">%d</div>\n'
            '  <div class="ttl"><h1 style="%s">%s</h1><div class="ch"><b>Chapitres %s à %s</b>'
            '<span>Conservation, subsistance et autonomie<br>sur la Côte-Nord</span></div></div>\n  %s') % (
        k, k, style, '<br>'.join(esc(l) for l in d['h1']), d['ch'][0], d['ch'][1], serie(k))

def avant(k):
    return ('<section class="sheet front t%d" id="f%d" data-tome="%d"><div class="panel"><div class="in">\n  %s\n</div></div></section>\n'
            % (k, k, k, avant_in(k)))

def complete(k, tailles, fichiers):
    d = TOMES[k]
    t = TRAIT[k]
    w, h = tailles[k]
    img = '<img src="%s-%s.svg" alt="" style="width:%.3fin;height:%.3fin">' % (t['fic'], COUL[k][3], w, h)
    lis = ''.join('<li><b>%s</b>%s</li>' % (n, esc(x)) for n, x in SOMMAIRE[k])
    return f'''<section class="sheet full t{k}" id="full{k}" data-tome="{k}" style="--spine:{SPINE[k]}in;page:full{k}">
  <div class="panel back"><div class="in">
    <div class="hd"><span>Le Manuel du Nord</span><span class="r">Tome {k} · {esc(d['titre'])}</span></div>
    <div class="txt">
      <p>Six tomes, 114 chapitres sur la conservation des aliments, la subsistance et l’autonomie, faits pour la Côte-Nord&#8239;: forêt boréale, hivers à −35&#8239;°C, saison de jardin de 90 à 100&nbsp;jours, orignal, truite, fleuve salé.</p>
      <p><strong>Le test de chaque page&#8239;: il n’y a personne à appeler.</strong></p>
    </div>
    <div class="toc"><h2>Dans ce tome · chapitres {d['ch'][0]} à {d['ch'][1]}</h2>
      <ol>{lis}</ol>
    </div>
    <div class="bas"><div class="trait">{img}<div class="cap">{t['cap']}</div></div>
      {auteurs_html(fichiers)}</div>
    {serie(k)}
  </div></div>
  <div class="panel spine"><div class="sp"><div class="sn">{k}</div><div class="rule"></div><div class="vt"><b>{esc(d['titre'])}</b><span>Le Manuel du Nord</span></div></div></div>
  <div class="panel fr"><div class="in">
  {avant_in(k)}
  </div></div>
</section>
'''

CSS = r'''
/* =====================================================================
   COUVERTURES DES SIX TOMES — couverture souple Blurb, 8 × 10 po rogné.
   Fond perdu 0,125 po partout sur la couverture complète.
   TRANCHE : variable --spine, posée sur chaque couverture complète par le générateur à partir du nombre de
   pages RÉEL du tome (PAGES, tomes réassemblés le 29 septembre 2026) et du tableau du calculateur de Blurb
   (sources/blurb-specifications.md). Largeur du PDF = 16,25 po + tranche.
   Page d'impression : la couverture plus un demi-point au moins, en points entiers (Edge ne rend pas la
   taille au point près) ; --decouper remet chaque couverture à la mesure exacte de Blurb.
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
.sheet:last-of-type{break-after:auto}
.sheet.front{page:front;width:8.125in;height:10.25in}
/* + 1px : Chrome arrondit la largeur du fond au pixel inférieur (17,181 po -> 1649 px = 17,177 po), ce qui laissait
   un filet blanc de 0,3 pt au bord du fond perdu ; le pixel de plus déborde dans la bande que --decouper retire */
.sheet.full{page:full;width:calc(16.25in + var(--spine) + 1px);height:10.25in}

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
   Le chiffre fait environ 0,55 em de large. Seul le tome 6 descend : 200 p., 0,5 po -> ≈ 49 pt.
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
.back .toc{position:absolute;top:1.9in;left:0;right:0}
.back .toc h2{margin:0 0 5pt;font:700 10pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;padding-bottom:4pt;border-bottom:1.25pt solid var(--ink)}
.back .toc ol{margin:0;padding:0;list-style:none;columns:2;column-gap:0.3in;font:500 10pt/13.2pt var(--sans)}
.back .toc li{display:flex;gap:6pt;break-inside:avoid;border-bottom:0.5pt solid var(--fil)}
.back .toc li b{width:22pt;flex:none;font-weight:700}
/* le dessin et les auteurs (14 octobre 2026) : posés depuis le bas, au-dessus de la barre de série ; le dessin
   (1,8 po de haut au plus) prend ce qui reste sous le sommaire, le blanc en trop va au-dessus de lui. Le sommaire
   remonte de 0,3 po (2,2 -> 1,9 po) pour leur faire de la place ; les textes des auteurs (quatrième version de JP)
   sont en 8 pt, le demi-point de moins que JP a permis, pour tenir sans couper. */
.back .bas{position:absolute;left:0;right:0;top:4.35in;bottom:0.72in;display:flex;flex-direction:column;justify-content:flex-end}
.back .trait{display:flex;flex-direction:column;flex:none}
.back .trait img{display:block;flex:none}
.back .trait .cap{font:600 8pt/1 var(--sans);letter-spacing:.06em;margin-top:4pt}
.back .auteurs{flex:none;margin-top:0.11in}
.back .auteurs h2{margin:0 0 7pt;font:700 10pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;padding-bottom:4pt;border-bottom:1.25pt solid var(--ink)}
.back .aut{display:grid;grid-template-columns:1fr 1fr;column-gap:0.3in}
/* le texte coule autour du cercle, puis sous lui : la colonne garde toute sa largeur sous la photo */
.back .a{display:block}
.back .ph{float:left;shape-outside:circle(50%);shape-margin:0.1in;margin:1pt 0.1in 0 0;width:0.66in;height:0.66in;border-radius:50%;border:0.75pt solid var(--ink);overflow:hidden;box-sizing:border-box;display:flex;align-items:center;justify-content:center}
.back .ph img{display:block;width:100%;height:100%;object-fit:cover}
.back .ph.claude img{width:64%;height:64%}
.back .a p{margin:0;font:400 8pt/10.5pt var(--serif);hyphens:manual}
.back .nw{white-space:nowrap}
.back .a p b{font-weight:700}

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
  .v-six .wrap{zoom:.3;display:grid;grid-template-columns:auto auto;gap:0.5in 0.8in;padding:0.7in 0.9in;justify-content:start;align-items:end}
  .v-six .col{display:flex;flex-direction:column;gap:0.2in}
  .v-six .lab{font-size:52px}
  .v-un .wrap{zoom:.5;padding:0.3in}
}
'''

SCRIPT = r'''
<script>
(function(){
  const faces=['700 10pt "IBM Plex Sans Condensed"','600 10pt "IBM Plex Sans Condensed"','500 10pt "IBM Plex Sans Condensed"','400 10pt "IBM Plex Serif"','700 10pt "IBM Plex Serif"'];
  const NOMS=%NOMS%;
  const HEX=%HEX%;
  const INFO=%INFO%;
  Promise.all(faces.map(f=>document.fonts.load(f,'aéÀ−’→'))).then(()=>document.fonts.ready).then(()=>{
    const h=location.hash;
    const el=(t,c,html)=>{const e=document.createElement(t);if(c)e.className=c;if(html!=null)e.innerHTML=html;return e;};
    const trim=(sheet,kind)=>{const t=el('div','trim '+kind+'-trim');const sp=sheet.style.getPropertyValue('--spine');if(sp)t.style.setProperty('--spine',sp);t.appendChild(sheet);return t;};
    const cl=id=>{const s=document.getElementById(id).cloneNode(true);s.removeAttribute('id');return s;};
    const etagere=()=>{const r=el('div','shelf');[1,2,3,4,5,6].forEach(k=>r.appendChild(trim(cl('full'+k),'spine')));return r;};
    const lab=(k,extra)=>el('div','lab','<b>'+NOMS[k]+'</b> '+HEX[k]+' <i>· tome '+k+', '+INFO[k]+(extra?' · '+extra:'')+'</i>');
    const go=(cls,wrap)=>{document.body.innerHTML='';document.body.className='v '+cls;document.body.appendChild(wrap);};
    let m;
    if(h==='#avants'){
      const w=el('div','wrap');[1,2,3,4,5,6].forEach(k=>w.appendChild(trim(cl('f'+k),'front')));go('v-avants',w);
    } else if(h==='#couvertures-5-6'){
      const w=el('div','wrap');
      [5,6].forEach(k=>{w.appendChild(lab(k,'quatrième | tranche | avant'));w.appendChild(trim(cl('full'+k),'full'));});
      go('v-56',w);
    } else if(h==='#completes'){
      const w=el('div','wrap');
      [1,2,3,4,5,6].forEach(k=>{const c=el('div','col');c.appendChild(lab(k));c.appendChild(trim(cl('full'+k),'full'));w.appendChild(c);});
      go('v-six',w);
    } else if(h==='#tablette'){
      const w=el('div','wrap');w.appendChild(etagere());go('v-tab',w);
    } else if((m=h.match(/^#tome-(\d)$/))){
      const w=el('div','wrap');w.appendChild(trim(cl('full'+m[1]),'full'));go('v-un',w);
    }
    document.documentElement.dataset.ready='1';
  });
})();
</script>
'''

POLICES = ('<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400&display=block" rel="stylesheet">\n'
           # la flèche (ch. 81) n'est pas dans le sous-ensemble latin de Google : second lien, qui la recharge de Plex
           '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400&text=%E2%86%92%E2%88%92&display=block" rel="stylesheet">\n')

def page_edge(pouces):
    """Largeur de page pour Edge, en pt entiers : la couverture et son pixel de débord, plus un demi-point. Edge ne rend pas la
    taille demandée au point près (17,1833 po sort à 17,18 ; 8,125 à 8,1267) ; une page un peu plus large que la
    couverture ne perd rien (la bande en trop est à droite, hors du fond perdu), et --decouper la retire."""
    return math.ceil(pouces * 72 + 0.75 + 0.5)       # le fond déborde d'un pixel (0,75 pt), voir .sheet.full

def main(dest=None, photo=None, choix=None):
    """Le HTML et les dessins dans D1 ; avec dest (--sortie), dans dest, pour un aperçu : les écarts avec les
    rapports d'assemblage y sont signalés sans arrêter (le fichier pour Blurb, lui, s'arrête)."""
    notes, erreurs = verifier()
    for n in notes:
        print('  note :', n)
    if erreurs:
        for e in erreurs:
            print('  ERREUR :' if not dest else '  ATTENTION (aperçu seulement) :', e)
        if not dest:
            sys.exit(1)
    dest = dest or D1
    os.makedirs(dest, exist_ok=True)
    if choix:
        TRAIT.update(choisir(choix))
    tailles = traits(dest)
    fichiers = {k: auteurs_fichiers(k, dest, photo) for k in COUL}
    couleurs = '\n'.join('.t%d{--c:%s;--ink:%s;--fil:%s} /* %s */' % (
        k, f, i, 'rgba(%d,%d,%d,.45)' % tuple(int(i[j:j + 2], 16) for j in (1, 3, 5)), n) for k, (f, i, n, s) in COUL.items())
    pages_full = '\n'.join('@page full%d { size: %dpt 738pt; margin: 0; }  /* tome %d : %d p. -> tranche %s po (%s) ; PDF %.3f po */' % (
        k, page_edge(16.25 + SPINE[k]), k, PAGES[k], SPINE[k], PROV[k], 16.25 + SPINE[k]) for k in sorted(SPINE))
    css = CSS.replace('%COULEURS%', couleurs).replace('%PAGES_FULL%', pages_full)
    corps = ['<!-- ============ LES SIX AVANTS ============ -->\n']
    corps += [avant(k) for k in range(1, 7)]
    corps.append('<!-- ============ COUVERTURES COMPLÈTES : quatrième | tranche | avant ============ -->\n')
    corps += [complete(k, tailles, fichiers[k]) for k in range(1, 7)]
    noms = '{' + ','.join("%d:'%s'" % (k, n.capitalize()) for k, (f, i, n, s) in COUL.items()) + '}'
    hexes = '{' + ','.join("%d:'%s'" % (k, f) for k, (f, i, n, s) in COUL.items()) + '}'
    info = '{' + ','.join("%d:'%d p., tranche %s po'" % (k, PAGES[k], str(SPINE[k]).replace('.', ',')) for k in sorted(SPINE)) + '}'
    html = ('<!DOCTYPE html>\n<html lang="fr-CA">\n<head>\n<meta charset="utf-8">\n'
            '<title>Le Manuel du Nord — couvertures des six tomes</title>\n'
            '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' + POLICES +
            '<!-- Généré par outils/build_couvertures_6.py : ne pas modifier à la main. -->\n'
            '<style>' + css + '\n</style>\n</head>\n<body>\n\n'
            + ''.join(corps) + SCRIPT.replace('%NOMS%', noms).replace('%HEX%', hexes).replace('%INFO%', info) + '</body>\n</html>\n')
    open(os.path.join(dest, 'couvertures-nordique-6.html'), 'w', encoding='utf-8').write(html)
    print(os.path.join(dest, 'couvertures-nordique-6.html'), len(html), 'octets')
    for k in sorted(SPINE):
        print('tome %d : %d p. -> tranche %s po (%s), PDF %.3f x 10.25 po ; dessin %.2f x %.2f po' % (
            k, PAGES[k], SPINE[k], PROV[k], 16.25 + SPINE[k], tailles[k][0], tailles[k][1]))

# ------------------------------------------------------------------ un PDF par tome
def polices_pdf(page):
    """(noms, non incorporées) des polices de la page, formulaires compris."""
    vues, non = set(), set()
    def res(r, seen):
        r = r.get_object() if r is not None else None
        if not r or id(r) in seen:
            return
        seen.add(id(r))
        for f in (r.get('/Font') or {}).values():
            f = f.get_object()
            nom = str(f.get('/BaseFont', 'Type3' if f.get('/Subtype') == '/Type3' else '?'))
            vues.add(nom)
            desc = f.get('/FontDescriptor')
            if f.get('/Subtype') == '/Type0':
                desc = f['/DescendantFonts'][0].get_object().get('/FontDescriptor')
            if f.get('/Subtype') != '/Type3':
                desc = desc.get_object() if desc else {}
                if not any(x in desc for x in ('/FontFile', '/FontFile2', '/FontFile3')):
                    non.add(nom)
        for x in (r.get('/XObject') or {}).values():
            x = x.get_object()
            if x.get('/Subtype') == '/Form':
                res(x.get('/Resources'), seen)
    res(page.get('/Resources'), set())
    return vues, non

def decouper():
    import pypdf
    from pypdf.generic import RectangleObject
    src = os.path.join(D1, 'couvertures-nordique-6.pdf')
    r = pypdf.PdfReader(src)
    if len(r.pages) != 12:
        sys.exit('%s : %d pages, 12 attendues (six avants, six couvertures complètes)' % (src, len(r.pages)))
    lignes = []
    for k in range(1, 7):
        pg_src = r.pages[5 + k]
        W, H = (16.25 + SPINE[k]) * 72, 10.25 * 72
        w0, h0 = float(pg_src.mediabox.width), float(pg_src.mediabox.height)
        if w0 + 0.01 < W or abs(h0 - H) > 0.5:
            sys.exit('tome %d : page imprimée à %.2f x %.2f pt, %.2f x %.2f attendus' % (k, w0, h0, W, H))
        w = pypdf.PdfWriter()
        pg = w.add_page(pg_src)
        full = RectangleObject([0, h0 - H, W, h0])       # le haut de la page imprimée, sa largeur exacte
        pg.mediabox = full; pg.cropbox = full; pg.bleedbox = full
        pg.trimbox = RectangleObject([9, h0 - H + 9, W - 9, h0 - 9])
        w.add_metadata({'/Title': 'Le Manuel du Nord — Tome %d · %s — couverture' % (k, TOMES[k]['titre']),
                        '/Author': 'Le Manuel du Nord',
                        '/Creator': 'design/directions/1-manuel-de-terrain/outils/build_couvertures_6.py'})
        cible = os.path.join(ROOT, 'livre', 'tome-%d' % k, 'couverture.pdf')
        with open(cible + '.tmp', 'wb') as f:
            w.write(f)
        os.replace(cible + '.tmp', cible)
        # contrôle du fichier écrit
        c = pypdf.PdfReader(cible)
        p = c.pages[0]
        mb = [round(float(x), 3) for x in p.mediabox]
        vues, non = polices_pdf(p)
        # le fond de la couverture couvre-t-il toute la page ? premier aplat de couleur du flux d'Edge (en px CSS,
        # 0,75 pt le px) : sa largeur, comparée à la page exacte
        m = re.search(r'rg\s+/NonStruct <</MCID 0 >>BDC\s+0 [\d.]+ ([\d.]+) ([\d.]+) re',
                      p.get_contents().get_data().decode('latin-1'))
        fond = float(m.group(1)) * 0.75 if m else None
        if fond is None:
            print('  tome %d : largeur du fond non lue dans le flux du PDF (à regarder)' % k)
        ok = (len(c.pages) == 1 and abs(float(p.mediabox.width) - W) < 0.01 and abs(float(p.mediabox.height) - H) < 0.01
              and not non and not any('Type3' in v for v in vues) and (fond is None or fond >= W - 0.01))
        if fond is not None and fond < W - 0.01:
            print('  tome %d : le fond s\'arrête à %.2f pt, la page fait %.2f pt' % (k, fond, W))
        lignes.append((k, W / 72, H / 72, len(c.pages), mb, sorted(vues), sorted(non), os.path.getsize(cible), ok))
        print('tome %d : %s — %d page, %.3f x %.3f po, %d Ko, polices %s%s — %s' % (
            k, os.path.relpath(cible, ROOT), len(c.pages), float(p.mediabox.width) / 72, float(p.mediabox.height) / 72,
            os.path.getsize(cible) // 1024, ', '.join(sorted(vues)), (' ; NON INCORPORÉES : ' + ', '.join(sorted(non))) if non else '',
            'conforme' if ok else 'À REVOIR'))
    if not all(l[-1] for l in lignes):
        sys.exit(1)

if __name__ == '__main__':
    if '--decouper' in sys.argv:
        decouper()
    else:
        arg = lambda o: sys.argv[sys.argv.index(o) + 1] if o in sys.argv else None
        choix = dict(map(int, a.split(':')) for i, a in enumerate(sys.argv) if i and sys.argv[i - 1] == '--dessin')
        main(os.path.abspath(arg('--sortie')) if arg('--sortie') else None, arg('--photo'), choix)
