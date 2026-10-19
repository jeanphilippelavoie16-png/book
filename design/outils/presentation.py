# -*- coding: utf-8 -*-
"""La présentation du projet en PDF (JP, 19 octobre 2026 : « une présentation du projet en pdf propre et
professionnel dans le style du livre, avec les différents tomes et ce qu'ils traitent »).

    python3 design/outils/presentation.py

Lettre US, 19 pages : la couverture, le projet, la règle du livre, un chapitre, des pages du tome 1, les six tomes, puis
pour chaque tome sa couverture entière (quatrième, tranche et devant, sur une page à l'italienne ; JP, 19 octobre 2026 :
« je veux qu'on voie les pages de couvertures aussi ») et sa page, et enfin la fabrication et les auteurs. Les textes des tomes viennent de là où le livre les tient déjà : le
sommaire (build_couvertures_6.py, SOMMAIRE), le résumé de la quatrième (couverture.py, QUATRIEME) et le sous-titre de
la page de titre (assembler-tome.py, SOUS_TITRES). Les pages d'exemple sont tirées du tome 1 au format Lulu
(livre/tome-1-lulu/), qui doit être assemblé. Sortie : livre/presentation/presentation-manuel-du-nord.pdf ; le
travail (images réduites, HTML) dans livre/presentation/travail/, qui ne se versionne pas.
"""
import ast, glob, html, os, re, subprocess, sys
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
D.update(litteraux(os.path.join(ROOT, 'design/directions/1-manuel-de-terrain/outils/build_couvertures_6.py'),
                   ['SOMMAIRE', 'TOMES']))
D.update(litteraux(os.path.join(ROOT, 'images/tomes/essais-ia/tome-1/couverture.py'), ['QUATRIEME']))
D.update(litteraux(os.path.join(ROOT, 'design/outils/assembler-tome.py'), ['SOUS_TITRES']))

# la couleur de chaque tome à l'intérieur du livre (design/variantes-couleur/outils/couleur.css, --ta et --tp)
TA = {1: '#2B5876', 2: '#5C1A15', 3: '#2B5A45', 4: '#25414F', 5: '#6B5238', 6: '#363432'}
TP = {1: '#E8EDF0', 2: '#F3ECE5', 3: '#E9F0EA', 4: '#EDF2F5', 5: '#F2EBDF', 6: '#EEEBE6'}
# la bande de l'image de titre : la tranche de l'image qu'on garde, en % de la hauteur qui dépasse
BANDE_Y = {1: 74, 2: 66, 3: 64, 4: 78, 5: 63, 6: 58}
ORDINAL = {1: 'premier', 2: 'deuxième', 3: 'troisième', 4: 'quatrième', 5: 'cinquième', 6: 'sixième'}


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


def p(s):
    return '<p>%s</p>' % ty(s)


# ------------------------------------------------------------------ images
def prep_images():
    os.makedirs(TRAV, exist_ok=True)
    for k in range(1, 7):
        im = Image.open(os.path.join(ROOT, 'images/tomes/titre-tome-%d.jpg' % k)).convert('RGB')
        im.thumbnail((1700, 2200))
        im.save(os.path.join(TRAV, 'titre-%d.jpg' % k), quality=86)
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


def pied(n, tome=None):
    cases = ''.join('<i class="%s">%d</i>' % ('on' if k == tome else '', k) for k in range(1, 7))
    return ('<div class="ft"><span class="tomes">%s</span><span class="pg">%d</span></div>' % (cases, n))


def ouverture(titre, chapeau=''):
    return ('<div class="ouv"><div class="trame"></div><h1>%s</h1>%s</div>'
            % (ty(titre), '<div class="chapeau">%s</div>' % ty(chapeau) if chapeau else ''))


def section(n, titre):
    return '<h2><b>%s</b>%s</h2>' % (n, ty(titre))


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
    t = [entete('Le projet'), ouverture('Le projet',
         "Un ouvrage de référence en six tomes et 113 chapitres sur la conservation des aliments, la subsistance "
         "et l'autonomie, écrit pour la Côte-Nord.")]
    t.append('<div class="corps">')
    t.append(section(1, "Ce que c'est"))
    t.append(p("Le Manuel du Nord est un manuel pour survivre et s'adapter après une catastrophe, quand on n'a plus "
               "rien. Il est écrit pour un terrain précis : la forêt boréale, des hivers à −35 °C, une saison de jardin "
               "de 90 à 100 jours, l'orignal, la truite et le fleuve salé."))
    t.append(p("Chaque page passe le même test : <strong>il n'y a personne à appeler.</strong> Pas d'entrepreneur, pas "
               "de concession, pas de quincaillerie ouverte, pas de pièce en commande. Une phrase qui suppose le "
               "contraire ne sert à rien le jour où on ouvre le livre, alors elle n'y est pas."))
    t.append(section(2, 'Pour qui'))
    t.append(p("Une famille avec de jeunes enfants. Le lecteur sait souder, câbler du 12 V et abattre un orignal, mais "
               "il n'a jamais salé une cuisse ni tanné une peau. Le livre est écrit pour quelqu'un de compétent de ses "
               "mains et débutant en conservation : il donne tout le détail là où le geste est nouveau, et il "
               "n'explique pas ce qu'un parent sait déjà."))
    t.append(p("On n'y lit pas de ranger le poison ni de surveiller les enfants près du poêle. On y lit ce qui "
               "surprendrait un parent attentif : un enfant intoxiqué au monoxyde de carbone a l'air fatigué ou de "
               "mauvaise humeur, et le réflexe normal est de croire que c'est son caractère."))
    t.append(section(3, 'Les deux lieux'))
    t.append('<table class="lieux"><tr><th></th><th>La maison</th><th>Le chalet</th></tr>'
             '<tr><td>Services</td><td>Hydro, aqueduc, égout</td><td>Hors réseau</td></tr>'
             '<tr><td>Situation</td><td>En ville, voisins proches</td><td>Isolé</td></tr>'
             '<tr><td>Réserves</td><td>%s</td><td>%s</td></tr>'
             '<tr><td>Territoire</td><td>Aucun</td><td>Chasse, pêche, bois, jardin, caveau</td></tr></table>'
             % (ty('La trousse de 72 heures et le congélateur'),
                ty('La réserve de trois mois : denrées sèches, gras, sel')))
    t.append(p("<strong>Ce qui est court se vit à la maison :</strong> une panne de trois jours, une tempête, une "
               "alerte qui se lève. <strong>Ce qui dure finit au chalet :</strong> quand l'événement s'étire, la maison "
               "devient un lieu sans services au milieu d'autres gens sans services, et c'est le chalet qui a le bois, "
               "l'eau et le territoire. Chaque chapitre dit quel lieu il vise, et le chapitre 2, <em>Rester ou "
               "partir</em>, sert à décider quand on monte."))
    t.append('</div>')
    t.append(pied(n))
    return page(''.join(t))


def la_regle(n):
    t = [entete('La règle du livre'), ouverture('La règle du livre',
         "Le geste, son mécanisme et la façon de le faire avec rien. La conformité, les normes et les numéros à "
         "appeler restent dehors.")]
    t.append('<div class="corps">')
    t.append(section(1, 'Ce qui reste, ce qui sort'))
    lignes = [("« Faire appel à un professionnel certifié »", 'Comment le faire soi-même'),
              ('Tout numéro de norme', 'Ce que la pièce doit faire'),
              ("« Ne tentez pas ceci vous-même »", "Ce qui arrive si on s'y prend mal, et comment s'y prendre bien"),
              ('« Remplacer la pièce »', 'Comment réparer la pièce, ou la fabriquer'),
              ("« Porter l'équipement de protection réglementaire »",
               'Ce que le geste fait au corps, et quoi mettre entre les deux')]
    t.append('<table class="rs"><tr><th>Ça sort</th><th>Ça reste</th></tr>%s</table>'
             % ''.join('<tr><td>%s</td><td>%s</td></tr>' % (ty(a), ty(b)) for a, b in lignes))
    t.append(p("La débrouille est le sujet du livre : souder avec deux batteries d'auto montées en série, remplacer un "
               "joint par du cuir gras, fabriquer l'outil qu'on n'a pas. Quand il existe une façon de faire la chose "
               "avec rien, elle prend plus de place que la façon propre avec le bon matériel."))
    t.append(section(2, 'Chaque chiffre vient d\u2019une source'))
    t.append(p("Aucun chiffre n'est inventé. Avant d'écrire, on cherche la source officielle (MAPAQ, Santé Canada, "
               "ACIA, INSPQ, gouvernement du Québec), on enregistre la page elle-même dans le dossier des sources et on "
               "note la provenance dans la fiche du chapitre. Ce qu'on ne trouve pas porte la mention [À VÉRIFIER] "
               "jusqu'à ce qu'on le trouve ou qu'on le coupe. Le premier jet du chapitre pilote donnait 71 °C pour "
               "cuire le gibier ; la vraie valeur est 74 °C, et seule la vérification à la source l'a attrapé."))
    t.append(p("La provenance ne s'imprime pas : la page donne le chiffre, sans attribution, sans numéro de norme et "
               "sans numéro de téléphone. La trace reste dans les dossiers de travail."))
    t.append(section(3, 'Neuf rappels qui reviennent partout'))
    t.append(p("On ouvre ce livre à une page, pas à la première. Ces rappels se redisent dans chaque chapitre où ils "
               "s'appliquent, dans l'étape qui les concerne."))
    rappels = [("Cuire le gibier sauvage à 74 °C à cœur", 'Ours, phoque, lièvre, orignal, castor'),
               ('Jamais le foie ni les reins des cervidés : le cadmium', 'Abats, orignal'),
               ('La trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent', 'Ours, phoque'),
               ('La tularémie : des gants pour manipuler la bête', 'Lièvre'),
               ('La thuyone du cèdre est toxique : sapin baumier ou épinette pour la vitamine C',
                'Scorbut, tisanes, plantes'),
               ('Le botulisme de type E produit sa toxine dès 3 °C, donc au frigo', 'Tout le poisson, surtout fumé'),
               ("Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence", 'Salaison, conserves, poisson'),
               ('La viande maigre seule donne le mal de caribou, mortel en quelques semaines',
                'Lièvre, orignal, rationnement'),
               ('La génératrice ne tourne jamais dans un bâtiment, un garage ou sous un auvent',
                'Stock, carburant, électricité')]
    t.append('<table class="rappels"><tr><th>Le rappel</th><th>Où il revient</th></tr>%s</table>'
             % ''.join('<tr><td>%s</td><td>%s</td></tr>' % (ty(a), ty(b)) for a, b in rappels))
    t.append('</div>')
    t.append(pied(n))
    return page(''.join(t))


def un_chapitre(n):
    t = [entete('Un chapitre'), ouverture('Un chapitre',
         "Tous les chapitres techniques suivent le même ordre, pour que la même chose soit à la même place d'un "
         "chapitre à l'autre.")]
    t.append('<div class="corps">')
    secs = [('En une ligne', 'Ce que la procédure fait, en une phrase.'),
            ("Quand l'utiliser", 'Les situations qui la déclenchent.'),
            ('Matériel', "L'indispensable de cette procédure, une ligne par item, avec ce que l'item fait."),
            ('Procédure', "Les étapes numérotées, dans l'ordre où on les fait."),
            ('Points de contrôle', "Ce qu'on mesure ou ce qu'on regarde pour savoir que ça marche."),
            ("Signes d'échec", "Ce qui dit que ça ne marche pas, et ce qu'on fait alors."),
            ("Variante d'urgence", "La même chose avec rien. C'est le cœur du chapitre : le jour où on ouvre le "
                                   "livre, le bon matériel n'est pas là.")]
    t.append('<ol class="sept">%s</ol>' % ''.join(
        '<li><b>%d</b><span><strong>%s</strong>%s</span></li>' % (i + 1, ty(a), ty(b)) for i, (a, b) in enumerate(secs)))
    t.append('<div class="deux">')
    t.append('<div class="bloc orange"><h3><span class="pastille">10 min</span>Les premières minutes, en orange</h3>%s</div>'
             % p("Un chapitre qui a des gestes urgents (retombées, feu, monoxyde, blessure, eau froide) ouvre sa "
                 "procédure sur la série des premières minutes, imprimée en orange pour qu'on tombe dessus en "
                 "feuilletant. La pastille dit le temps qu'on a pour la faire, à partir de ce qui la déclenche. Chaque "
                 "étape donne le geste, le pourquoi et le détail qui sert à le faire."))
    t.append('<div class="bloc"><h3>Le logigramme</h3>%s</div>'
             % p("L'arbre de décision du chapitre, sur une double page, juste après le matériel : une question à la "
                 "fois, et chaque case renvoie à l'étape qui la détaille."))
    t.append('<div class="bloc"><h3>Les dangers en pictogrammes</h3>%s<div class="pictos">%s</div></div>'
             % (p("Trente-cinq dangers ont chacun leur pictogramme, expliqué une fois à fond au début de chaque tome. "
                  "Dans un chapitre, le pictogramme s'affiche dans l'étape où le danger se présente, avec ce qui est "
                  "propre à ce chapitre : la distance, l'épaisseur, la durée."),
                ''.join('<img src="%s">' % os.path.join(ROOT, 'images/pictos-dangers/%s.svg' % x) for x in
                        ['co', 'generatrice', 'froid', 'eau-froide', 'glace', 'feu-de-foret', 'botulisme',
                         'trichine', 'abats', 'cuisson', 'mal-de-caribou', 'thuyone', 'tularemie', 'ours',
                         'coupure', 'vie-en-jeu'])))
    t.append('<div class="bloc"><h3>Les planches</h3>%s</div>'
             % p("Des dessins techniques faits pour le livre, en coupe et de près, numérotés et appelés dans le texte "
                 "(planche 04-01A). La planche s'imprime sur la page qui l'appelle ou sur la suivante."))
    t.append('<div class="bloc vert"><h3>En plus : les notes vertes</h3>%s</div>'
             % p("Après la variante d'urgence, des encadrés vert pâle gardent ce qui s'ajoute au geste : la façon "
                 "des Innus, une photo pour reconnaître, un petit dessin. Ils se posent dans les espaces libres en bas "
                 "de page, un seul par page, jamais au travers du texte."))
    t.append('<div class="bloc"><h3>Les photos pleine page</h3>%s</div>'
             % p("Les pages qui resteraient blanches, au dos de la page de titre ou devant l'ouverture d'un "
                 "chapitre, deviennent une photo de la forêt boréale, d'un bord à l'autre."))
    t.append('</div></div>')
    t.append(pied(n))
    return page(''.join(t))


def exemples(n):
    t = [entete('Des pages du tome 1')]
    t.append('<div class="corps ex-corps"><h1 class="petit">Des pages du tome 1</h1>')
    t.append('<p class="ex-intro">%s</p>' % ty("Tirées du tome 1 tel qu'il part à l'impression. Les quatre premières "
                                              "viennent du chapitre 4, Retombées radioactives."))
    ex = [('ex-ouverture', "L'ouverture : le lieu visé, les sept sections et leurs pages, puis les trois premières "
                           "sections."),
          ('ex-logigramme', "Le logigramme : la décision dans l'ordre réel, chaque case renvoie à son étape."),
          ('ex-orange', "Les premières minutes : la pastille du temps qu'on a, puis les gestes dans l'ordre."),
          ('ex-planche', "Une planche de la variante d'urgence : la pompe à volets qui aère l'abri sans courant."),
          ('ex-danger', "Une page des dangers, au début du tome : ce qui arrive, comment le reconnaître, ce qu'on "
                        "fait."),
          ('ex-photo', 'Une page restée blanche devient une photo pleine page.')]
    t.append('<div class="grille">%s</div>' % ''.join(
        '<figure><img src="%s.jpg"><figcaption>%s</figcaption></figure>' % (f, ty(c)) for f, c in ex))
    t.append('</div>')
    t.append(pied(n))
    return page(''.join(t))


def les_six(n):
    t = [entete('Les six tomes'), ouverture('Les six tomes',
         "Le livre suit l'ordre des besoins : tenir les premiers jours, garder le corps en état, prélever sur le "
         "territoire, conserver ce qu'on a pris, vivre au chalet, puis fabriquer et réparer ce qu'on ne peut plus "
         "acheter.")]
    t.append('<div class="corps"><div class="six">')
    for k in range(1, 7):
        T = D['TOMES'][k]
        t.append('<figure><img src="avant-%d.jpg"><figcaption><b>Tome %d · %s</b>'
                 '<span>Chapitres %s à %s · %d chapitres</span></figcaption></figure>'
                 % (k, k, ty(T['titre']), T['ch'][0], T['ch'][1], T['n']))
    t.append('</div></div>')
    t.append(pied(n))
    return page(''.join(t))


def couverture_tome(k, n):
    """La couverture entière du tome, sans le wrap qui se replie sur le carton : quatrième, tranche, devant."""
    T = D['TOMES'][k]
    return page(entete('Tome %d · la couverture' % k)
                + '<div class="cz"><img src="couv-%d.jpg"></div>'
                  '<div class="cz-leg"><b>Tome %d · %s</b>%s</div>'
                % (k, k, ty(T['titre']), ty("De gauche à droite : la quatrième, avec le résumé du tome, ses chapitres "
                                            "et les auteurs ; la tranche ; le devant.") if k == 1 else '')
                + pied(n, k), 'paysage t%d' % k)


def tome(k, n):
    T = D['TOMES'][k]
    resume = D['QUATRIEME'][k].split('. ', 1)[1]          # sans « Le Manuel du Nord compte six tomes… »
    chap = D['SOMMAIRE'][k]
    moitie = (len(chap) + 1) // 2
    col = lambda L: ''.join('<li><b>%s</b>%s</li>' % (a, html.escape(b)) for a, b in L)
    t = ['<div class="bande"><img src="titre-%d.jpg" style="object-position:50%% %d%%"></div>' % (k, BANDE_Y[k]),
         entete('Tome %d' % k, sombre=True),
         '<div class="t-ouv"><div class="t-num">%d</div><div><div class="t-sur">Tome %d</div>'
         '<h1 class="t-titre">%s</h1><div class="t-sous">%s</div></div></div>'
         % (k, k, ty(T['titre']), ty(D['SOUS_TITRES'][k])),
         '<div class="corps t-corps">',
         section(1, 'Ce que le tome traite'), p(resume),
         section(2, 'Les %d chapitres · %s à %s' % (T['n'], T['ch'][0], T['ch'][1])),
         '<div class="chap"><ul>%s</ul><ul>%s</ul></div>' % (col(chap[:moitie]), col(chap[moitie:])),
         '</div>', pied(n, k)]
    return page(''.join(t), 'tome t%d' % k)


def fabrication(n):
    t = [entete('La fabrication et les auteurs'), ouverture('La fabrication et les auteurs')]
    t.append('<div class="corps">')
    t.append(section(1, 'Le livre imprimé'))
    t.append('<table class="fiche">'
             '<tr><td>Format</td><td>%s</td></tr>'
             '<tr><td>Reliure</td><td>Couverture rigide, imprimée d\u2019un seul tenant</td></tr>'
             '<tr><td>Intérieur</td><td>%s</td></tr>'
             '<tr><td>Imprimeur</td><td>Lulu, à la commande, tome par tome</td></tr>'
             '<tr><td>Tome 1</td><td>%s</td></tr></table>'
             % (ty('8,5 × 11 po (lettre US)'), ty('Couleur Premium, papier blanc couché, fini mat'),
                ty('352 pages, monté au format d\'impression et prêt à commander')))
    t.append(p("Les 113 chapitres des six tomes sont écrits. Les tomes 2 à 6 passent au format d'impression après le "
               "tome 1, avec la même mise en pages."))
    t.append(section(2, 'Comment un chapitre est fait'))
    t.append(p("Chaque chapitre passe par quatre mains, dans l'ordre : le rédacteur, le vérificateur technique, "
               "l'éditeur et le metteur en pages. Le vérificateur signale ce qui ne tient pas à la source, il ne "
               "réécrit pas. Les images viennent de licences vérifiées, avec leur auteur et leur lien notés dans un "
               "registre tenu hors du livre."))
    t.append(section(3, 'Les auteurs'))
    jp = os.path.join(ROOT, 'design/directions/1-manuel-de-terrain/auteur-jp-neige.png')
    cl = os.path.join(ROOT, 'design/directions/1-manuel-de-terrain/auteur-claude-neige.svg')
    aut = [(jp, 'Jean-Philippe Lavoie', '',
            "Jean-Philippe vit à Baie-Comeau et il est père de deux enfants. Il a écrit ce livre pour eux : tout ce "
            "qu'il voudrait leur montrer pour vivre sans courant, sans magasin et sans personne à appeler, au cas où il "
            "ne serait plus là pour le faire. Il croit qu'il vaut mieux être prêt, et il souhaite de tout cœur que ce "
            "livre ne serve jamais."),
           (cl, 'Claude', '(intelligence artificielle, Anthropic)',
            "Claude a fait la recherche, a écrit les chapitres et a dessiné les planches. Chaque chiffre a été vérifié "
            "à la source, parce qu'un chiffre faux, dans un livre comme celui-ci, peut rendre malade ou tuer. Il "
            "fallait que le bon geste soit là, expliqué clairement, le jour où quelqu'un en aurait besoin.")]
    t.append('<div class="auteurs">%s</div>' % ''.join(
        '<div class="aut"><div class="rond"><img src="%s"></div><div><div class="nom">%s <span>%s</span></div>%s</div></div>'
        % (img, nom, ty(q), p(txt)) for img, nom, q, txt in aut))
    t.append('</div>')
    t.append(pied(n))
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
    pages = [couverture(), le_projet(2), la_regle(3), un_chapitre(4), exemples(5), les_six(6)]
    for k in range(1, 7):
        pages += [couverture_tome(k, 5 + 2 * k), tome(k, 6 + 2 * k)]
    pages.append(fabrication(19))
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
