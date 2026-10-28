# -*- coding: utf-8 -*-
"""Correcteur de langue du Manuel du Nord : orthographe, grammaire, accords, conjugaison, typographie.

    python3 .claude/skills/langue/scripts/langue.py chapitres/26-soigner-quand-il-n-y-a.md
    python3 .claude/skills/langue/scripts/langue.py --texte "pour qu'il y ait toujours quelqu'un qui sait."
    python3 .claude/skills/langue/scripts/langue.py images/logigrammes/26-soigner.json   (les cases et les flèches)
    python3 .claude/skills/langue/scripts/langue.py DOSSIER/travail/html   (tout ce que l'assembleur imprime : page de
                                                    titre, dédicace, sommaire, pages des dangers, chapitres, légendes)
    python3 .claude/skills/langue/scripts/langue.py --assembleur        (les textes fixes : dédicace, pages de titre,
                                                    dos des couvertures, texte des auteurs, sommaire du dos)
    Plusieurs chemins à la fois se relisent ensemble. L'assembleur (design/outils/assembler-tome.py) lance lui-même la
    relecture sur ses pages HTML et ses logigrammes, et met les avis dans son rapport.

Deux passes :
1. LanguageTool (français), le correcteur libre : accords, participes, conjugaison, subjonctif après une locution,
   homophones, élisions. Il faut Java et `pip install language-tool-python` ; la première fois, il télécharge
   LanguageTool (environ 260 Mo).
2. Nos règles, pour ce que LanguageTool laisse passer. La première vient de la page 2 du tome 1 (JP, 27 octobre 2026) :
   « pour qu'il y ait toujours quelqu'un qui sait » au lieu de « qui sache ». Une relative qui décrit une personne ou
   une chose souhaitée, cherchée, niée ou unique se met au subjonctif ; LanguageTool ne le voit pas.

Chaque avis se juge : un « avis » n'est pas une faute tant qu'on n'a pas vérifié la règle (skill `langue`). Code de
sortie 1 s'il reste un avis.
"""
import os, re, sys

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.abspath(os.path.join(ICI, '..', '..', '..', '..'))

# ---------------------------------------------------------------- le texte imprimé, sans le balisage
def texte_imprime(md):
    """Les paragraphes du Markdown tels qu'ils s'impriment : les lignes coupées d'un même paragraphe ou d'une même puce
    sont recollées (sinon LanguageTool voit des phrases tronquées), sans pictogrammes, marqueurs, appels de note ni liens
    d'image. Rend une liste de (numéro de la première ligne, texte)."""
    blocs, cur, debut = [], [], 0
    for n, ligne in enumerate(md.replace('\r\n', '\n').split('\n'), 1):
        if ligne.lstrip().startswith('|'):                 # tableau : chaque case se lit seule
            if cur:
                blocs.append((debut, ' '.join(cur))); cur = []
            if not re.match(r'^\s*\|[\s|:-]+\|?\s*$', ligne):
                blocs += [(n, nettoie(c).strip()) for c in ligne.strip().strip('|').split('|')]
            continue
        neuf = (not ligne.strip() or re.match(r'^(#|\s*[-*]\s|\s*\d+\.\s|\||\[\^|!\[|---)', ligne))
        if neuf and cur:
            blocs.append((debut, ' '.join(cur))); cur = []
        if ligne.strip():
            if not cur:
                debut = n
            cur.append(nettoie(ligne).strip())
            if ligne.lstrip().startswith(('#', '|', '---')):
                blocs.append((debut, ' '.join(cur))); cur = []
    if cur:
        blocs.append((debut, ' '.join(cur)))
    return [(n, t) for n, t in blocs if t.strip()]

def nettoie(ligne):
    out = []
    for ligne in [ligne]:
        l = ligne
        l = re.sub(r'\{![a-z-]+\}', '', l)                 # pictogrammes {!co}
        l = re.sub(r'\{>[a-z-]+\}', 'renvoi', l)           # renvois des pages des dangers {>co}
        l = re.sub(r'\{\.orange[^}]*\}', '', l)             # marqueurs de série orange
        l = re.sub(r'\[\^[^\]]+\]:?', '', l)                # appels et définitions de notes
        l = re.sub(r'!\[([^\]]*)\]\([^)]*\)', r'\1', l)     # image : on garde la légende
        l = re.sub(r'\*\*|__|(?<![\w*])\*(?!\s)|(?<!\s)\*(?![\w*])', '', l)   # gras et italique
        l = re.sub(r'^#+\s*', '', l)                        # titres
        l = re.sub(r'^\s*[-*]\s+', '', l)                   # puces
        l = re.sub(r'^\s*\d+\.\s+', '', l)                  # numéros d'étapes
        l = re.sub(r'\s+', ' ', l)
        out.append(l)
    return out[0]

def texte_logigramme(chemin):
    """Les mots d'un logigramme (images/logigrammes/*.json) : cases, flèches, en-tête."""
    import json
    d = json.load(open(chemin, encoding='utf-8'))
    blocs = []
    for k, v in (d.get('entete') or {}).items() if isinstance(d.get('entete'), dict) else []:
        if isinstance(v, str):
            blocs.append((f'entete.{k}', v))
    for n in d.get('noeuds', []):
        if n.get('texte'):
            blocs.append((f"case {n.get('id')}", nettoie(n['texte'])))
    for l in d.get('liens', []):
        if l.get('etiquette'):
            blocs.append((f"flèche {l.get('de')}→{l.get('vers')}", nettoie(l['etiquette'])))
    return blocs

def texte_html(chemin):
    """Le texte d'une page HTML de l'assembleur, bloc par bloc (paragraphe, case, titre, légende)."""
    import html as H
    src = open(chemin, encoding='utf-8').read()
    src = re.sub(r'<(style|script|head)\b.*?</\1>', ' ', src, flags=re.S | re.I)
    src = re.sub(r'<svg\b.*?</svg>', ' ', src, flags=re.S | re.I)     # dessins : leurs mots viennent de leur source
    src = re.sub(r'<br\s*/?>', ' ', src, flags=re.I)
    morceaux = re.split(r'</?(?:p|li|td|th|h[1-6]|figcaption|caption|section|article|aside|div|tr|table|ol|ul|dt|dd)\b[^>]*>',
                        src, flags=re.I)
    blocs = []
    for m in morceaux:
        t = H.unescape(re.sub(r'<[^>]+>', ' ', m))     # une balise sépare deux mots (« 5</span>Ne »)
        t = re.sub(r'\s+', ' ', t).strip()
        t = re.sub(r" (?=[,.)\]…])|(?<=[(\[’']) ", '', t)    # sauf devant la ponctuation et après l'apostrophe
        t = t.replace('\u00ad', '')                       # césures possibles
        if len(re.findall(r'[A-Za-zÀ-ÿ]', t)) >= 3:
            blocs.append((f'bloc {len(blocs) + 1}', t))
    return blocs

# ---------------------------------------------------------------- nos règles
# Les formes de l'indicatif qui ne se confondent pas avec le subjonctif (« ils prennent », « ils sortent » sont aussi
# des subjonctifs : ils ne sont pas dans la liste)
INDIC = (r"(?:est|sont|a|ont|sait|savent|peut|peuvent|fait|font|va|vont|veut|veulent|vient|doit|prend|met|dit|voit|"
         r"connaît|connait|tient|reçoit|boit|vit|sert|part|sort|meurt|devient|comprend|suffit|faut|vaut|valent|"
         r"paraît|parait|plaît|plait|craint|éteint|atteint|rejoint|résout)")
# entre le sujet et le verbe : seulement les petits mots qui s'y glissent (« qu'il y ait », « qu'on le sache »)
CLITIQUES = r"(?:(?:ne|n[’']|y|en|le|la|les|l[’']|lui|leur|se|s[’']|me|m[’']|te|t[’']|nous|vous)\s*){0,3}"
DECLENCHEURS = (r"\b(?:pour|afin|avant|bien|sans|à moins|jusqu[’']à ce|en attendant|pourvu|de peur|de crainte|"
                r"il faut|il faudra|il faudrait|faut|faudrait|il suffit|il est temps|il vaut mieux|"
                r"veut|voulait|voudrait|souhaite|aimerait|exige|demande|empêcher|attendre|"
                r"il est (?:possible|nécessaire|important|essentiel|rare|normal|dangereux))\s+qu(?:e\b|[’'])")
SUJET = r"(?:il|elle|on|ils|elles|ça|cela|ce|la personne|l[’']enfant|les enfants|le feu|l[’']eau|la viande|le bois)?\s*"
REGLES = [
    # 1. Le cas de la page 2 : après un déclencheur du subjonctif, la relative qui décrit ce qu'on souhaite
    ('subjonctif-relative',
     re.compile(DECLENCHEURS + r"[^.;:!?]{0,50}?\b(?:quelqu[’']un|quelque chose|une? \w+|des \w+|personne|rien)\s+"
                r"qu(?:i|e|[’'])\s*" + SUJET + CLITIQUES + INDIC + r"\b", re.I),
     "Relative qui décrit une personne ou une chose souhaitée, après un déclencheur du subjonctif : le verbe se met au "
     "subjonctif (« quelqu'un qui sache », « un bois qui soit sec »)."),
    # 2. Le verbe juste après le déclencheur, à l'indicatif
    ('subjonctif-locution',
     re.compile(DECLENCHEURS + r"\s*" + SUJET + CLITIQUES + INDIC + r"\b", re.I),
     "Après cette locution ou ce verbe de volonté, le subjonctif (« pour qu'il y ait », « avant qu'il parte »)."),
    # 3. La relative après une négation ou une question d'existence
    ('subjonctif-negation',
     re.compile(r"\b(?:il n[’']y a|n[’']existe|on ne connaît|on ne trouve|y a-t-il)\s+(?:personne|rien|aucune?|pas de \w+|"
                r"quelqu[’']un|quelque chose)\s+(?:\w+\s+)?qu(?:i|e|[’'])\s*" + CLITIQUES + INDIC + r"\b", re.I),
     "Relative après une négation ou une question d'existence : le subjonctif (« il n'y a rien qui puisse »)."),
    # 4. Ce qu'on cherche ou ce qu'on veut, pas encore trouvé
    ('subjonctif-recherche',
     re.compile(r"\b(?:cherche|cherchent|chercher|veut|veulent|vouloir|voudrait|il faut|il faudra|il faudrait|"
                r"besoin d[’']|qu[’']il y ait|il y ait)\s+(?:quelqu[’']un|quelque chose|une? \w+|des \w+)\s+(?:\w+\s+)?"
                r"qu(?:i|e|[’'])\s*" + CLITIQUES + INDIC + r"\b", re.I),
     "Ce qu'on cherche ou ce qu'on veut, et qui n'est pas encore trouvé : le subjonctif est la forme soignée (« on cherche "
     "quelqu'un qui sache », « il faut une corde qui tienne »). À juger : l'indicatif reste quand la chose existe "
     "(« chercher le voisin qui a une génératrice »)."),
    # 5. « après que » se construit avec l'indicatif
    ('apres-que', re.compile(r"\baprès qu(?:e|[’'])\s*" + SUJET + CLITIQUES + r"(?:ait|aient|soit|soient|fasse|puisse)\b", re.I),
     "« Après que » se construit avec l'indicatif (« après qu'il est arrivé »)."),
    # 6. « si » de condition et le conditionnel (les formes en -erait et les conditionnels irréguliers ; « si on
    #    serrait » est un imparfait, il ne se signale pas)
    ('si-conditionnel',
     re.compile(r"\b(?:si\s+(?:on|elle|elles|je|tu|nous|vous|la personne|l[’']enfant)|s[’']ils?)\s+" + CLITIQUES +
                r"(?:\w+er|aur|ser|fer|pourr|devr|voudr|faudr|saur|ir|viendr|tiendr|verr|enverr|courr|mourr|vaudr)"
                r"(?:ais|ait|aient|ions|iez)\b", re.I),
     "« Si » de condition ne prend jamais le conditionnel (« si on avait su », pas « si on aurait su »). À juger : "
     "« si » d'interrogation indirecte peut le prendre (« on se demande s'il viendrait »)."),
    # 7. Formes fautives, anglicismes
    ('forme', re.compile(r"\bqu[’'](?:il|elle|on) aie\b|\bpallier à\b|\bse rappeler de\b|\bà cause qu(?:e\b|[’'])|"
                         r"\bmalgré qu(?:e\b|[’'])|\ben autant qu(?:e\b|[’'])|\bfaire du sens\b|"
                         r"\bjusqu[’']à date\b|\bà date\s*(?=[.,;:)]|$)|"
                         r"\bde par\b|\bpartir à rire\b|\bsupposé de\b|\bcanceller\b|\bchecker\b|\bsécure\b|"
                         r"\b(?:est|sont|c[’']est|serait)\s+définitivement\s+(?:mieux|plus|meilleure?|pire|le|la|un|une)\b|"
                         r"\b(?:a|ont|ai|as|avons|avez|avait|avaient|aura|auront)\s+(?:résout|dissout|absout)\b", re.I),
     "Forme fautive ou anglicisme (skill langue, « Les formes qui sortent »)."),
    # 8. Les participes des verbes pronominaux
    ('participe-pronominal-cod',
     re.compile(r"\bs(?:e\s+|[’'])(?:sont|est|étaient|était|seront|sera)\s+\w+(?:és|ées|ée|ies|ises|ites|is|ues|us)\s+"
                r"(?:les|la|le|l[’']|des|ses|sa|son|leurs?)\b(?!\s*(?:uns|unes))", re.I),
     "Verbe pronominal suivi de son complément direct : le participe ne s'accorde pas avec le sujet (« ils se sont lavé "
     "les mains », « elle s'est coupé le doigt »). À juger : « la » ou « les » peut être un article d'un complément de "
     "lieu (« ils se sont réfugiés les uns chez les autres »)."),
    ('participe-pronominal-coi',
     re.compile(r"\bs(?:e\s+|[’'])(?:sont|est|étaient|était|seront|sera)\s+(?:"
                + '|'.join(p + f for p in ('parlé', 'téléphoné', 'souri', 'succédé', 'plu', 'nui', 'menti', 'ressemblé',
                                            'suffi', 'ri', 'demandé', 'écrit', 'dit', 'répondu')
                           for f in ('e', 's', 'es'))
                + r"|rendu(?:e|s|es) compte|fai(?:te|ts|tes)\s+\w+(?:er|ir|re)|laiss(?:ée|és|ées)\s+\w+(?:er|ir|re))\b", re.I),
     "Ici « se » n'est pas complément direct (on parle à quelqu'un, on se rend compte) : le participe reste invariable "
     "(« elles se sont parlé », « elle s'est rendu compte », « elle s'est fait opérer »)."),
    ('participe-feminin',
     re.compile(r"\b(?:elle|la personne|une personne|la femme|une femme|la mère|la fille|la blessée)\s+(?:ne\s+)?"
                r"s[’']est\s+(?:\w+\s+)?\w+(?:é|i|u|is|it)\b(?=\s*(?:[.,;:)]|à\b|au\b|aux\b|en\b|dans\b|sur\b|avec\b|"
                r"pendant\b|contre\b|sous\b|$))", re.I),
     "Sujet féminin et verbe pronominal sans complément direct après : le participe s'accorde (« la personne s'est "
     "blessée à la main »)."),
    # 9. Homophones que LanguageTool laisse passer
    ('homophone', re.compile(r"\b(?:faire|fait|faut|doit|doivent|peut|laisser|laisse|va|vont|finir de)\s+(?:le |la |les |l[’'])?"
                             r"cuir\b|\bété\s+cherché\s+(?:du|de la|des|un|une|le|la|les|l[’'])", re.I),
     "Homophone : « faire cuire » (le verbe), « aller chercher du bois » (l'infinitif après « été » ou « allé »)."),
    # 9b. Deux « ou » coup sur coup, à deux niveaux (JP, 28 octobre 2026, page des dangers du tome 1 : « une serre, ou
    #     sous un auvent ou une bâche » ; « Et où 2 fois de suite ») : on ne sait plus ce qui va avec quoi
    ('ou-repete',
     re.compile(r",\s+ou\b(?!\s+(?:moins|plus|non|pas)\b)[^.;:!?()]{1,40}?\bou\b(?!\s+(?:moins|plus|non|pas)\b)|"
                r"\bou\b(?!\s+(?:moins|plus|non|pas)\b)[^.;:!?(),]{1,40}?,\s+ou\b(?!\s+(?:moins|plus|non|pas)\b)", re.I),
     "Deux « ou » coup sur coup, l'un dans l'autre (« une serre, ou sous un auvent ou une bâche ») : le lecteur ne sait "
     "plus ce qui va avec quoi. Une seule série par phrase : « et », « sinon », « on peut aussi », un point-virgule ou "
     "un point (skill langue, section 10)."),
    # 10. Typographie du livre
    ('typo-apostrophe', re.compile(r"\w'\w"), "Apostrophe droite : l'apostrophe typographique ’ est la convention du livre "
     "(à juger : le Markdown du livre utilise l'une ou l'autre ; l'imprimé doit être cohérent)."),
    ('typo-ordinal', re.compile(r"\b\d+(?:ième|ieme|eme|ème)s?\b"), "Ordinal : « 2e », « 3e », jamais « 2ème »."),
    ('typo-majuscule', re.compile(r"(?:^|[.!?]\s+|«\s*)(?:A(?=\s+[a-zàâéèêëîïôûùç])(?!\s+\w+(?:é|i|u|is|it|us|ert|ait|eint|ort|uit)\b)|E(?=[tcpvdgqb][a-zàâéèêëîïôûç])(?!tc\b|quisetum))"),
     "Majuscule sans accent : « À », « É », « Ê » (l'accent se met sur la capitale)."),
]

def nos_regles(lignes):
    avis, faux = [], faux_positifs()
    for i, l in lignes:
        for nom, rx, msg in REGLES:
            if nom == 'typo-apostrophe':
                continue                                   # trop de bruit dans le Markdown ; on le garde pour --texte
            for m in rx.finditer(l):
                autour = l[max(0, m.start() - 40):m.end() + 40].replace('’', "'")
                if any(r == nom and re.search(x, autour) for r, x in faux):
                    continue
                avis.append((i, nom, m.group(0), msg))
    return avis

# ---------------------------------------------------------------- LanguageTool
ECARTES = {
    'WHITESPACE_RULE', 'FRENCH_WHITESPACE', 'APOS_TYP', 'TIRET', 'POINTS_SUSPENSION', 'UPPERCASE_SENTENCE_START',
    'FR_SPLIT_WORDS_HYPHEN', 'COMMA_PARENTHESIS_WHITESPACE', 'DOUBLE_PUNCTUATION', 'ESPACE_UNITES', 'TIRET_LONG_1',
    'FRENCH_WORD_REPEAT_RULE', 'FRENCH_WORD_REPEAT_BEGINNING_RULE', 'TOO_LONG_SENTENCE', 'TOO_LONG_PARAGRAPH',
    'TELEPHONE_POINTS', 'UNPAIRED_BRACKETS', 'NBSP_PONCTUATION', 'APOSTROPHE_TYPOGRAPHIQUE', 'GUILLEMETS_FR',
    # le livre écrit les nombres en chiffres (skill ecriture, règle 5) et ses titres sans point final
    'NOMBRES_EN_LETTRES_2', 'NOMBRES_EN_LETTRES_2_IMPROVED', 'NOMBRES_EN_LETTRES', 'POINT',
}

def mots_du_livre():
    f = os.path.join(ICI, 'mots-du-livre.txt')
    if not os.path.exists(f):
        return set()
    return {l.strip() for l in open(f, encoding='utf-8') if l.strip() and not l.startswith('#')}

def faux_positifs():
    """Les avis déjà jugés justes (faux-positifs.txt : règle de LanguageTool ou des nôtres, tabulation, expression du
    contexte)."""
    f = os.path.join(ICI, 'faux-positifs.txt')
    if not os.path.exists(f):
        return []
    out = []
    for l in open(f, encoding='utf-8'):
        if l.strip() and not l.startswith('#') and '\t' in l:
            r, x = l.rstrip('\n').split('\t', 1)
            out.append((r.strip(), x.strip()))
    return out

def languagetool(lignes):
    try:
        import language_tool_python
    except ImportError:
        return None, "LanguageTool absent : pip install language-tool-python (et Java) ; seules nos règles ont passé."
    outil = language_tool_python.LanguageTool('fr', config={'maxTextLength': 200000})
    connus = mots_du_livre()
    faux = faux_positifs()
    avis = []
    # un seul appel par paquet de blocs (un appel par bloc prend 9 minutes sur un chapitre monté) ; on retrouve le bloc
    # de chaque avis par son décalage
    import bisect
    paquets, cur, taille = [], [], 0
    for i, l in lignes:
        if l.strip():
            cur.append((i, l)); taille += len(l) + 2
            if taille > 40000:
                paquets.append(cur); cur, taille = [], 0
    if cur:
        paquets.append(cur)
    for paquet in paquets:
        debuts, pos = [], 0
        for _, l in paquet:
            debuts.append(pos); pos += len(l) + 2
        tout = '\n\n'.join(l for _, l in paquet)
        for m in outil.check(tout):
            k = bisect.bisect_right(debuts, m.offset) - 1
            i, l = paquet[k]
            off = m.offset - debuts[k]
            if m.rule_id in ECARTES or m.rule_id.startswith('ESPACE') or 'WHITESPACE' in m.rule_id:
                continue
            if m.rule_issue_type == 'style':               # le style, c'est le skill ecriture ; ici, les fautes
                continue
            fragment = l[off:off + m.error_length]
            if m.rule_issue_type == 'misspelling' and (fragment in connus or fragment.lower() in connus):
                continue
            autour = l[max(0, off - 40):off + m.error_length + 40].replace('’', "'").replace('\u202f', ' ').replace('\u00a0', ' ')
            if any(r == m.rule_id and re.search(x, autour) for r, x in faux):
                continue
            prop = ', '.join(m.replacements[:3])
            avis.append((i, 'LT:' + m.rule_id, fragment, m.message + (f' → {prop}' if prop else '')))
    outil.close()
    return avis, None

# ---------------------------------------------------------------- les textes fixes de l'assembleur
def textes_assembleur():
    """Les textes fixes qui s'impriment hors des chapitres : dédicace et sous-titres des pages de titre
    (assembler-tome.py), texte du dos des six couvertures (couverture.py), texte des auteurs et sommaire du dos
    (build_couvertures_6.py)."""
    import ast
    blocs = []
    src = open(os.path.join(RACINE, 'design', 'outils', 'assembler-tome.py'), encoding='utf-8').read()
    for nom in ('DEDICACE', 'SOUS_TITRES'):
        m = re.search(r'^' + nom + r'\s*=\s*', src, re.M)
        if m:
            noeud = ast.parse(src[m.start():].split('\n\n')[0].split('\n#')[0]).body[0].value
            v = ast.literal_eval(noeud)
            textes = [' '.join(v)] if isinstance(v, tuple) else list(v.values())
            blocs += [(f'{nom} {i}', t) for i, t in enumerate(textes, 1)]
    couv = os.path.join(RACINE, 'images', 'tomes', 'essais-ia', 'tome-1', 'couverture.py')
    if os.path.exists(couv):
        arbre = ast.parse(open(couv, encoding='utf-8').read())
        for n in arbre.body:
            if isinstance(n, ast.Assign) and getattr(n.targets[0], 'id', '') == 'QUATRIEME':
                blocs += [(f'dos du tome {k}', t) for k, t in ast.literal_eval(n.value).items()]
    sys.path.insert(0, os.path.join(RACINE, 'design', 'directions', '1-manuel-de-terrain', 'outils'))
    try:
        import build_couvertures_6 as bc
        blocs += [(f"auteurs : {a['nom']}", a['texte']) for a in bc.AUTEURS]
        blocs += [(f'sommaire du dos, tome {k}, ch. {n}', t) for k, l in bc.SOMMAIRE.items() for n, t in l]
    except Exception as x:                                      # noqa: BLE001
        blocs.append(('build_couvertures_6', f'Lecture impossible : {x}'))
    return blocs

def lire(nom, prefixer=False):
    """Les blocs à relire d'un chemin : dossier de pages HTML de l'assembleur, page HTML, logigramme JSON ou Markdown."""
    tag = (lambda i: f'{os.path.basename(nom)} {i}' if prefixer else i)
    if os.path.isdir(nom):
        lignes, vus = [], set()
        for f in sorted(os.listdir(nom)):
            if f.endswith('.html') and not f.startswith('credits'):   # les crédits ne s'impriment pas
                blocs = texte_html(os.path.join(nom, f))
                if tuple(blocs) not in vus:                            # une page en double ne se relit pas
                    vus.add(tuple(blocs))
                    lignes += [(f'{f} {i}', t) for i, t in blocs]
        return lignes
    if nom.endswith('.html'):
        blocs = texte_html(nom)
    elif nom.endswith('.json'):
        blocs = texte_logigramme(nom)
    else:
        blocs = texte_imprime(open(nom, encoding='utf-8').read())
    return [(tag(i), t) for i, t in blocs]

def main(a):
    if not a:
        print(__doc__); return 2
    if a[0] == '--texte':
        lignes, nom = [(1, ' '.join(x for x in a[1:] if not x.startswith('--')))], 'texte'
    elif a[0] == '--assembleur':
        lignes, nom = textes_assembleur(), 'textes fixes (dédicace, pages de titre, couvertures, auteurs)'
    else:
        chemins = [x for x in a if not x.startswith('--')]
        nom, lignes = ', '.join(chemins), []
        for ch in chemins:
            lignes += lire(ch, len(chemins) > 1)
    avis = nos_regles(lignes)
    lt, note = languagetool(lignes) if '--sans-lt' not in a else (None, 'LanguageTool non lancé (--sans-lt).')
    if lt:
        avis += lt
    avis.sort(key=lambda x: ([int(t) if t.isdigit() else t for t in re.split(r'(\d+)', str(x[0]))], x[1]))
    print(f'# Langue : {nom}\n')
    if note:
        print(note + '\n')
    for i, regle, frag, msg in avis:
        print(f'{"l." if isinstance(i, int) else ""}{i} [{regle}] « {frag} » : {msg}')
    print(f'\n{len(avis)} avis à juger')
    return 1 if avis else 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
