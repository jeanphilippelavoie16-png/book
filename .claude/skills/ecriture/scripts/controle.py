#!/usr/bin/env python3
"""Contrôle d'écriture d'un chapitre ou d'une page des dangers du Manuel du Nord (A0, skill ecriture).

  python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-titre.md
  python3 .claude/skills/ecriture/scripts/controle.py dangers/partie-1.md
      → les avis, en deux groupes : d'abord les bloquants, puis ce qui est à juger.
  python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-titre.md --avant /tmp/avant.md
      → en plus, ce qui a disparu depuis l'ancienne version (chiffres, renvois, notes, figures, étapes, rappels de
        sécurité), et les mots de liaison avant et après la passe.

Un bloquant est exact, parce que le script le trouve sans se tromper et que la règle ne laisse aucun choix. Ce sont le
tiret, le signe « § », les mots bannis, les numéros de norme, les téléphones et les services qui répondent, les
organismes cités comme source, les phrases sur le livre ou sur la recherche, le « vous » hors d'une citation, les noms
latins, la forme du chapitre (les sept sections, la ligne de lieu, 8 lignes au plus par tableau de contrôle, 15 à 20
mots par ligne de Matériel), la longueur et les trois parties d'une page des dangers, les ancres de planches
introuvables, et avec --avant ce qui a disparu. Le code de sortie est 1 tant qu'il reste un bloquant.

Le script compte les mots d'une ligne de Matériel ou d'une page des dangers de la façon la plus favorable au texte.
Une ligne bloque seulement si aucune façon de compter ne la met dans les bornes, que « l'air » compte pour un mot ou
pour deux, avec ou sans les renvois entre parenthèses, avec ou sans les trois étiquettes d'une page des dangers.

Un avis « à juger » demande une oreille. On le juge un par un, et on ne réécrit jamais une phrase seulement pour faire
taire le script. Les mots qu'on ne coupe jamais (parce que, donc, alors, mais, puis, ensuite, sinon, quand, si,
comme, pour que, jusqu'à ce que) ne sont jamais signalés (skill ecriture, P5).
"""
import bisect, glob, json, os, re, sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tempo  # noqa: E402  (le découpage en blocs et en phrases, partagé)

RACINE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))
ESP = "[   ]?"
MOT = r"[\wÀ-ÿ]+(?:['’-][\wÀ-ÿ]+)*"

# Les mots qu'on ne coupe jamais (P5). Aucun motif « à juger » ne doit les signaler, et le script le vérifie au départ.
JAMAIS = ["parce que", "donc", "alors", "mais", "puis", "ensuite", "sinon", "quand", "si", "comme", "pour que",
          "jusqu'à ce que"]
# Les chevilles écrites et les adverbes d'insistance (P5, P2). « déjà », « encore », « tout » et « bien » n'y sont
# plus, parce que le script les signalait aussi quand ils disent le fait (« toute la pièce », « bien avant les
# flammes »). Le mot qui décore relève de P2 (skill ecriture, et sa liste dans references/mots.md), et c'est
# l'oreille de A1 qui le juge.
MOTS_VIDES = ["vraiment", "simplement", "exactement", "précisément", "littéralement", "carrément", "absolument",
              "en réalité", "en effet", "d'ailleurs", "ainsi", "justement", "certes"]
# « de plus » compte seulement en cheville (« De plus, … »), parce que « de plus en plus » et « un jour de plus »
# disent un fait.
CHEVILLES = [(r"(?:^|(?<=[.;:!?]\s)|(?<=,\s))[Dd]e plus\s?,", "de plus")]
VOCAB_IA = ["crucial", "cruciale", "cruciaux", "essentiel", "essentielle", "essentiels", "primordial",
            "véritable", "véritables", "incontournable", "il est important de", "il convient de",
            "force est de", "en somme", "le fait de", "ce qui permet de", "au niveau de", "clé de voûte"]
BANNIS = [r"\bvillages?\b", r"\bchars?\b", r"\bBaie-Comeau\b", r"\bJP\b", r"\b4 et 6 ans\b"]
AGES = [r"\b(?:de|ont|a) [46] ans\b"]   # l'âge des enfants de JP, ou un âge qui est un fait : à juger
# La mise en relief qui redit sort, alors le script relève seulement celle d'un nom qu'on vient de dire dans la phrase
# d'avant (« … la cendre. C'est la cendre qui tient le mieux. »). Celle qui met en tête le mot qui compte (« Ce sont
# les vapeurs qui prennent feu ») reste, comme les tours parlés « c'est ce qui », « c'est là que », « c'est lui qui »,
# et « c'est pour ça que » dit la cause.
RELIEF = re.compile(r"\b(?:[Cc]'est|[Cc]e sont) (?:le|la|les|l['’])\s?(?!seule?s?\b)([\wÀ-ÿ-]+)(?:\s+(?!qui\b|que\b|"
                    r"qu['’])[\wÀ-ÿ'’-]+){0,3}?\s+(?:qui|que|qu['’])")
# Les formules (P12) : « ce n'est pas X, c'est Y », « X ne fait pas Y : il fait Z », et « , pas un + nom » en fin de
# phrase. Le vrai « mais » et le « , pas la baguette » d'une consigne restent, et aucun motif ne les vise.
FORMULES = [r"\b[Cc]e n'est pas\b[^.;:!?]{1,80}?,\s*c'est\b", r"\b[Cc]e ne sont pas\b[^.;:!?]{1,80}?,\s*ce sont\b",
            r"\b(?:ne|n')\s?(?!pas\b)[\wÀ-ÿ'’-]+\s+(?:pas|plus|jamais|rien)\b[^.;:!?]{0,40}?\s?:\s*"
            r"(?:il|elle|ils|elles|on|ça|c'est|ce sont)\b",
            r",\s*pas (?:un|une|des)\s+[\wÀ-ÿ'’-]+(?:\s+[\wÀ-ÿ'’-]+)?\s*[.!](?=\s|$)"]
# la tournure bizarre (JP : « Ceux qui étaient dehors laissent à la porte la couche du dessus ») : le sujet
# en pronom en tête de phrase, et le complément de lieu glissé entre le verbe et son objet
TOURNURE = [r"\b(?:Ceux|Celui|Celle|Celles) qui\b",
            r"\b\w+(?:ent|er|e|ez|ons)\s+(?:à|au|aux|dans|sur|sous|devant|derrière|contre|vers)\s+(?:la|le|les|l'|un|une)\s?"
            r"[\wÀ-ÿ'-]+\s+(?:la|le|les|l'|un|une)\s?(?!plus\b|moins\b|même\b|long\b|temps\b)(?!quel)[\wÀ-ÿ'-]+",
            # la loi en formule (JP, 16 octobre 2026, ch. 13 : « Une braise devient flamme quand l'air lui arrive sans
            # arrêt, d'où le souffle continu » : « on avait dit plus de phrases de même ») : « d'où » suivi d'un nom
            # (pas la question « d'où vient le gaz »), la chose qui « devient » un nom sans article, la chaleur qui
            # « part à » faire quelque chose
            r"\bd['’]où\s+(?:le|la|les|l['’]|un|une|des|son|sa|ses|leur|leurs|ce|cet|cette|ces)\b",
            r"\bdevien(?:t|nent)\s+(?:flamme|feu|braise|cendre|glace|vapeur|eau|poussière)\b",
            r"\bpar(?:t|tent)\s+à\s+[\wÀ-ÿ]+er\b",
            # la chose qui pense, sait, ment, tranche ou pardonne (JP, 16 octobre 2026 : « les phrases genre "la braise
            # ne sait pas" ») : un nom qui n'est pas une personne, sujet d'un verbe de l'esprit
            r"\b(?:(?:[Ll]a|[Ll]e|[Ll]es)\s+|[Ll]['’])(?!enfants?\b|personnes?\b|adultes?\b|bébés?\b|gens\b|famille\b|"
            r"blessée?s?\b|voisins?\b|parents?\b|mère\b|père\b|chasseurs?\b|lecteur\b|malade\b|patient\b|couteau\b|"
            r"lame\b|hache\b|scie\b|ciseaux?\b|sécateur\b|fil\b|tranchant\b|égoïne\b|plane\b|gouge\b)[a-zà-ÿ'-]+\s+"
            r"(?:ne\s+|n')?(?:sait|savent|veut|veulent|pardonne|pardonnent|aime|aiment|déteste|refuse|refusent|demande|"
            r"demandent|ment|mentent|tranche|tranchent|fait foi|font foi|oublie|oublient|se\s+croit|se\s+souvient|"
            r"attend|attendent|décide|décident|comprend|comprennent|connaît)\b"]
# la maxime (JP : « Une décision qui n'a pas été reprise depuis douze heures ne vaut plus » : « inutile ») :
# la règle redite comme un proverbe, en « Un X qui… ne… plus/rien/pas »
MAXIME = [r"(?:^|(?<=[.!?:]\s))(?:Un|Une)\s+(?:[\wÀ-ÿ'’-]+\s+){0,4}qui\s+[^.;:]{3,90}?\s(?:ne|n')\s?[\wÀ-ÿ'’-]+(?:\s+[\wÀ-ÿ'’-]+)?\s+(?:plus|rien|pas|jamais|personne)\b[^.]*\.",
          r"(?:^|(?<=[.!?:]\s))(?:Un|Une)\s+[^.;:]{3,50}?\s(?:ne|n')\s?[\wÀ-ÿ'’-]+\s+(?:plus|rien|jamais|personne)\s*(?:de\s+\w+)?\."]
# le mot de livre (JP, 28 octobre 2026, sur « on a sommeil » : « qui qui dit ça dans vrai vie, la façon que tu écris
# c'est pas bon ») : un mot ou un tour correct qu'on écrit et qu'on ne dit pas ; à côté, ce qu'on dit (P10)
LIVRESQUE = [(r"\b(?:a|ont|avoir|avait|avaient) sommeil\b", "a envie de dormir"),
             (r"\bsomnolen(?:ce|t|te|ts|tes)\b", "envie de dormir, endormi"),
             (r"\blucides?\b", "garde toute sa tête"), (r"\bavec peine\b", "a du mal à"),
             (r"\bà défaut\b", "sinon"), (r"\bd['’]apparence\b", "qui a l'air"),
             (r"\blorsqu(?:e\b|['’])", "quand"), (r"\bafin (?:de|d['’]|que|qu['’])", "pour"),
             (r"\bdavantage\b", "plus"), (r"\bdemeur(?:e|ent|er|é|ée|és|ées)\b", "rester"),
             (r"\bse munir\b|\bmunie?s? d", "prendre, avec"), (r"\beffectu(?:e|er|ent|é|ée|és|ées)\b", "faire"),
             (r"\bnécessit(?:e|er|ent)\b", "il faut, demander"), (r"\bs['’]av[éè]r(?:e|ent|er)\b", "être"),
             (r"\bprocur(?:e|er|ent)\b", "donner"), (r"\bdès lors\b", "alors"), (r"\bauparavant\b", "avant"),
             (r"\bnéanmoins\b|\btoutefois\b|\bcependant\b", "mais"), (r"\bparven(?:ir|ient|u|ue)\b", "arriver à"),
             (r"\btent(?:er|ent) d|\b(?:on|il|elle|ils|elles) tente d", "essayer de"), (r"\bdébut(?:er|e|ent)\b", "commencer"),
             (r"\bposs[eè]d(?:e|er|ent)\b", "avoir"), (r"\bse dérou(?:le|lent|ler)\b", "se passer"),
             (r"\bconstitu(?:e|er|ent)\b", "être, faire"), (r"\ben raison d", "à cause de"),
             (r"\bau moyen d", "avec"), (r"\bdotée?s? d", "avec"), (r"\bveiller à\b", "s'assurer de"),
             (r"\bles maux\b", "le mal de tête, les douleurs"), (r"\bs['’](?:en )?aperç|\bs['’](?:en )?apercev", "se rendre compte"),
             (r"\bignor(?:e|ent|er)\b", "ne pas savoir"), (r"\bguère\b", "pas beaucoup"),
             (r"\bpéri(?:r|t|ssent)\b", "mourir"), (r"\baisément\b", "facilement"), (r"\bnul(?:le)? ne\b", "personne ne"),
             (r"\bpar ailleurs\b|\ben outre\b", "et, aussi"), (r"\bà nu\b", "(dire ce qu'on voit)"),
             (r"\bbrutal(?:e|es|ement)?\b", "d'un coup"), (r"\baspect\b", "l'air, l'apparence"),
             (r"\bodorat\b", "on ne sent plus"), (r"\bimpropres? à\b", "dangereux à, pas bon à"), (r"\bhumus\b", "la terre noire"),
             (r"\bquand l['’]air (?:leur|lui) manque\b", "quand il manque d'air (la chose ne ressent rien)")]
SECURITE = {"74 °C": r"74" + ESP + "°C", "cadmium": r"cadmium", "trichinellose": r"trichin",
            "tularémie": r"tularémie", "thuyone": r"thuyone", "3 °C (botulisme E)": r"\b3" + ESP + "°C",
            "botulisme": r"botulisme", "mal de caribou": r"caribou", "génératrice": r"génératrice"}
UNITES = r"(?:°C|%|kg|mg|g|mL|L|km|cm|mm|m|h|min|s|jours?|j|heures?|minutes?|semaines?|mois|ans?|V|W|Ah|A|kW|ppm|mSv|Sv|psi|kPa|po|pi)\b"

# ---------------------------------------------------------------- ce qui bloque, en plus des tirets et des bannis
# Aucun numéro de norme, même « pour référence » (CLAUDE.md, « Ce que ce livre est »).
NORMES = [r"\b(?:CAN/)?CSA\b", r"\bNF\s?EN\b", r"\bASTM\b", r"\bULC\b", r"\bANSI\b", r"\bISO\s?\d", r"\bNFPA\b",
          r"\bUL\s?\d{2,}", r"\bEN\s?\d{3,}", r"\bnormes? (?:[A-Z]{2,}|n[o°]\s?\d)"]
# Aucun numéro de téléphone, aucun service qui répond (CLAUDE.md, « Ce qui ne s'imprime pas »). Hydro-Québec, la
# balise, le SOS et la VHF restent.
SERVICES = [r"\b(?:1[\s.-])?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b",
            r"(?<![\d,.\s])\s?\b(?:911|811|511)\b"
            r"(?![\s ]?(?:g|kg|mg|mL|L|m|km|cm|mm|°|%|kcal|\$|W|V|h|min|jours?|ans?)\b)",
            r"\bInfo-?(?:Santé|Social|pannes?)\b", r"\bantipoison\b", r"\bUrgence Québec\b", r"\bSOPFEU\b",
            r"\bsanté publique\b", r"\b(?:signaler|avertir|prévenir|appeler|joindre) (?:aux|les) autorités\b",
            r"\b(?:attendre|appeler|joindre|prévenir) les pompiers\b", r"\bpharmacien tranche\b",
            r"\bprofessionnel (?:certifié|qualifié)\b", r"\bfaire appel à un professionnel\b",
            r"\bentrepreneur (?:certifié|licencié|qualifié)\b", r"\bdétenteur d['’]une licence\b"]
# Aucun organisme cité comme source (CLAUDE.md, règle 1).
ATTRIBUTIONS = [r"\b(?:MAPAQ|INSPQ|CNESST|ACIA|USDA|NCHFP|FDA|CDC|OMS|ASPC)\b", r"\bSanté Canada\b",
                r"\bPêches et Océans\b", r"\bAgriculture (?:et Agroalimentaire )?Canada\b",
                r"\bRessources naturelles Canada\b", r"\bStatistique Canada\b", r"\bHealth Canada\b"]
# Aucune phrase sur le livre, ses sources ou la recherche (P12).
RECHERCHE = [r"\bpubli(?:é|ée|és|ées)\b", r"\b(?:non[- ])?sourcée?s?\b", r"\bsources? officielles?\b",
             r"\b(?:aucune|pas de|sans) source\b(?!\s+(?:de|d['’]|du|des|visible)\b)",
             r"\b(?:[Ll]e|[Cc]e|[Dd]u|[Aa]u) livre\b(?!\s+de\b)"]
# Les noms latins sortent partout (décision 11). Le script relève deux mots en italique, le genre avec sa majuscule et
# l'espèce en minuscules.
# E. coli reste, parce que c'est le nom d'usage, celui que donne l'analyse de l'eau.
LATIN_USAGE = {"E. coli"}
LATIN = re.compile(r"(?<![*\w])\*((?:[A-Z][a-zë]+|[A-Z]\.)\s(?:[a-z]+-)?[a-z]{2,}\.?"
                   r"(?:\s(?:var\.|subsp\.|ssp\.|f\.)?\s?[a-z]{3,})?)\*(?![*\w])")
NON_LATIN = set("""le la les l un une des de du d et ou en à au aux ce ces cet cette mon ma mes ton ta tes son sa ses
notre nos votre vos leur leurs qui que quand si où pour par sur sous dans avec sans comment pourquoi tout toute tous
toutes exemple mais puis donc alors comme on il elle ils elles nous je""".split())
# On juge les organismes, les lois, les règlements et les services nommés dans une phrase.
ORGANISMES = [r"\bministère\b", r"\bgouvernement\b", r"\bEnvironnement Canada\b", r"\bSécurité (?:publique|civile)\b",
              r"\bCroix-Rouge\b", r"\bParcs Canada\b", r"\bTransports Canada\b", r"\bmunicipal(?:e|es|ité|ités|aux)?\b",
              r"\brèglements? (?:municipa|provincia|fédér)", r"\b(?:la|une|les|des) lois?\b", r"\bpermis (?:de|d['’])",
              r"\billégal(?:e|es|ement|aux)?\b", r"\bobligation légale\b",
              r"\bcode (?:du bâtiment|de construction|national|criminel|civil)\b",
              r"\b(?:consulter|appeler|voir|joindre) (?:un|une|le|la|son|sa) (?:médecin|pharmacien|vétérinaire|"
              r"dentiste|professionnel|spécialiste|clinique)\b"]

# Les gestes qu'une personne fait. Au pronominal dans une étape, c'est une consigne déguisée (P8, « on doit le cuire »,
# pas « il se cuit »). Les verbes où « se » dit d'abord ce qu'est la chose ou ce qu'elle fait seule n'y sont pas :
# se voir, se sentir, se remplir, se garder et se conserver (« l'eau bouillie se garde 3 jours »), se lire (« la date ne
# se lit plus »), s'ouvrir, se souder, s'ajouter, se changer en, se mettre à.
_ER = """jet:jette,jettent coup cuisin découp tranch sal fum sèch:sèche,sèchent congèl:congèle,congèlent
décongèl:décongèle,décongèlent rang stock entrepos lav rinc nettoi:nettoie,nettoient mélang vers mesur
pès:pèse,pèsent dos fabriqu prépar pos install mont viss tann mang consomm appliqu plac retir
enlèv:enlève,enlèvent plant sèm:sème,sèment récolt taill vérifi contrôl règl:règle,règlent remplac répar affût aiguis lim perc tremp utilis emploi:emploie,emploient transport
administr not calcul compt retourn brass remu filtr""".split()
_FORMES = {"cuit", "cuisent", "fait", "font", "met", "mettent", "boit", "boivent", "coud", "cousent", "prend",
           "prennent", "cueille", "cueillent", "fend", "fendent", "tend", "tendent"}
for _v in _ER:
    if ":" in _v:
        _FORMES.update(_v.split(":")[1].split(","))
    else:
        _FORMES.update({_v + "e", _v + "ent"})
PRONOMINAL = re.compile(r"(?<![\w'’-])(?:(?:ne|n['’])\s?)?(?:se|s['’])\s?("
                        + "|".join(sorted(_FORMES, key=len, reverse=True))
                        + r")\b(?!\s+dans\s+(?:le|la|l['’]|les)\s)", re.I)
# « se met à couver » : se mettre à veut dire commencer
SE_METTRE_A = re.compile(r"\s+(?:alors\s+|vite\s+|tout de suite\s+)?à\s")
# Hors des étapes, seuls les verbes de l'exemple de JP (« il se cuit tout de suite ou se jette », 16 octobre 2026,
# suivi/plan-de-match.md, point 16) sont relevés, parce qu'ailleurs « se » décrit plus souvent la chose.
PRONOMINAL_PARTOUT = re.compile(r"(?<![\w'’-])(?:(?:ne|n['’])\s?)?(?:se|s['’])\s?(cuit|cuisent|jette|jettent)\b"
                                r"(?!\s+dans\s+(?:le|la|l['’]|les)\s)", re.I)
PAS_GESTE_AVANT = re.compile(r"\b(?:question|problème|rivière|ruisseau)\s+$", re.I)
PERSONNE_AVANT = re.compile(r"\b(?:on|personne|enfant|bébé|gens|blessée?|patient|adulte|famille|je|nous|"
                            r"de|d['’]|à|pour|sans|en|qui)\s+(?:ne\s+|n['’])?$", re.I)
# le participe ou l'adjectif en tête de phrase, à la place d'un « si » (P8 : « Fermé, le réfrigérateur garde… »)
PARTICIPE = re.compile(r"(?:^|(?<=[.!?]\s))([A-ZÀ-Ý][a-zà-ÿ]+(?:é|ée|és|ées|i|ie|is|ies|u|ue|us|ues|it|ite|its|ites|"
                       r"ert|erte|erts|ertes|eint|einte|aint|ainte|ait|aite|ort|orte|uit|uite|ise|ises))\s?,\s+"
                       r"(?:le|la|les|l['’]|un|une|ce|cet|cette|ces|son|sa|ses|leur|leurs|il|elle|ils|elles|on)\b")
ADJ_TETE = re.compile(r"(?:^|(?<=[.!?]\s))(Plein|Pleine|Pleins|Pleines|Vide|Vides|Sec|Sèche|Secs|Sèches|Froid|Froide|"
                      r"Froids|Chaud|Chaude|Chauds|Humide|Humides|Seul|Seule|Seuls|Seules|Propre|Sale|Cru|Crue|Crus|"
                      r"Crues|Mince|Épais|Épaisse|Tiède|Neuf|Neuve|Vieux|Vieille|Mouillé|Mouillée)\s?,\s+"
                      r"(?:le|la|les|l['’]|un|une|ce|cet|cette|ces|son|sa|ses|leur|leurs|il|elle|ils|elles|on)\b")
PAS_PARTICIPE = {"Ensuite", "Aussi", "Ainsi", "Puis", "Depuis", "Parmi", "Ici", "Voici", "Oui", "Midi", "Lundi",
                 "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche", "Côté", "Été", "Après", "Assis",
                 "Ceci", "Celui", "Lui", "Tandis", "Jadis", "Parfois", "Toutefois", "Autrefois", "Quelquefois",
                 "Désormais", "Mais", "Surtout", "Partout", "Debout", "Bout", "Tout", "Autant", "Avant", "Pendant",
                 "Durant", "Maintenant", "Cependant", "Néanmoins", "Bref", "Enfin", "Dehors", "Ailleurs", "Plutôt"}
# L'exception dite après le geste (P9). On la déplace avant le geste, sur sa ligne, et elle garde son « si ».
# « À moins de 2 m » dit une distance, alors seul « à moins que » compte.
EXCEPTION_APRES = re.compile(r"\b(?:sauf (?:si|s['’]il|s['’]ils|quand|lorsqu)|à moins (?:que|qu['’]))", re.I)
SECTIONS = ["1. En une ligne", "2. Quand l'utiliser", "3. Matériel", "4. Procédure", "5. Points de contrôle",
            "6. Signes d'échec", "7. Variante d'urgence"]
PARTIES_DANGER = ["Ce qui arrive.", "Comment on le reconnaît.", "Ce qu'on fait."]


def mot(m):
    return re.compile(r"(?<![\w'’-])" + re.escape(m) + r"(?![\w-])", re.I)


def verifie_jamais():
    """Aucun motif « à juger » ne doit signaler un mot qu'on ne coupe jamais (P5)."""
    for w in JAMAIS:
        for v in MOTS_VIDES + VOCAB_IA:
            assert not mot(v).fullmatch(w) and w != v, f"{w} est dans une liste de mots à couper"
        for rx, _ in LIVRESQUE:
            assert not re.fullmatch(rx, w, re.I), f"{w} est un mot de livre"


# ---------------------------------------------------------------------------------------------- le texte

def ligne_structure(l):
    """Les deux lignes que l'outil de mise en pages lit pour le titre (build_chapitre.py), qui exige leur tiret."""
    return bool(re.match(r"^#\s+Chapitre\s+\S+\s+[—–]\s", l)
                or re.match(r"^\*Tome \d+ [—–] [^*]+\*\s*$", l.strip()))


class Positions:
    """Retrouver la ligne d'une position dans le texte entier."""
    def __init__(self, texte):
        self.debuts = [0] + [m.end() for m in re.finditer("\n", texte)]

    def ligne(self, pos):
        return bisect.bisect_right(self.debuts, pos)


def citations(texte):
    """Les passages entre guillemets (« », “ ”) et en italique, sans traverser un paragraphe."""
    spans = []
    for rx in (r"«(?:(?!\n\s*\n)[^»])*»", r"“(?:(?!\n\s*\n)[^”])*”", r"(?<![*\w])\*(?!\*)[^*\n]+\*(?!\*)"):
        spans += [(m.start(), m.end()) for m in re.finditer(rx, texte)]
    return sorted(spans)


def dans(spans, pos):
    i = bisect.bisect_right(spans, (pos, float("inf"))) - 1
    return i >= 0 and spans[i][0] <= pos < spans[i][1]


VOUS = re.compile(r"(?<![\w'’-])(?:vous|votre|vos)(?![\w'’-])", re.I)
EZ = re.compile(r"(?<![\w'’-])([A-Za-zÀ-ÿ]{2,}ez)(?!\w)")
EZ_PAS_VERBE = {"chez", "nez", "assez", "rez"}


def est_verbe_ez(m, texte):
    w = m.group(1)
    if w.lower() in EZ_PAS_VERBE:
        return False
    if texte[m.end():m.end() + 1] == "-" and re.match(r"-(?:vous|passer|faire)\b", texte[m.end():]):
        return False          # rendez-vous, laissez-passer, laissez-faire
    avant = texte[max(0, m.start() - 3):m.start()]
    if w[0].isupper() and re.search(r"[a-zà-ÿ,]\s$", avant):
        return False          # un nom propre au milieu d'une phrase
    return True


# ---------------------------------------------------------------------------------------------- les avis

def tics(L):
    """Les avis ligne par ligne. Chaque avis : (ligne, catégorie, ce qui est trouvé, la ligne entière)."""
    out = []
    for i, l in enumerate(L, 1):
        if re.match(r"^\s*\|?\s*:?-{3,}", l):          # ligne de séparation d'un tableau
            continue
        if not ligne_structure(l):
            n = len(re.findall(r"[—–]", re.sub(r"\|\s*[—–]\s*(?=\|)", "|", l)))   # une case vide marquée « — »
            if n:
                out.append((i, "tiret", f"{n} × ", l))
        for b in BANNIS:
            for m in re.finditer(b, l, re.I):
                out.append((i, "banni", m.group(0), l))
        for r in NORMES:
            for m in re.finditer(r, l):
                out.append((i, "norme", m.group(0), l))
        for r in SERVICES:
            for m in re.finditer(r, l, re.I if "Info" not in r else 0):
                out.append((i, "service", m.group(0).strip(), l))
        for r in ATTRIBUTIONS:
            for m in re.finditer(r, l):
                out.append((i, "attribution", m.group(0), l))
        for r in RECHERCHE:
            for m in re.finditer(r, l, re.I if "livre" not in r else 0):
                out.append((i, "recherche", m.group(0), l))
        for m in LATIN.finditer(l):
            premier = re.split(r"[\s.]", m.group(1))[0].lower()
            if premier in NON_LATIN or any(w.lower() in NON_LATIN for w in m.group(1).split()[1:]) \
                    or m.group(1) in LATIN_USAGE:
                continue
            out.append((i, "latin", m.group(1), l))
        for b in AGES:
            for m in re.finditer(b, l):
                out.append((i, "age", m.group(0), l))
        for w in VOCAB_IA:
            if mot(w).search(l):
                out.append((i, "IA", w, l))
        for w in MOTS_VIDES:
            if mot(w).search(l):
                out.append((i, "vide", w, l))
        for r, w in CHEVILLES:
            if re.search(r, l.lstrip("-*0123456789. ")):
                out.append((i, "vide", w, l))
        for m in re.finditer(r"§\s?\d+", l):
            out.append((i, "section", m.group(0), l))
        if not l.lstrip().startswith("|"):
            for r in TOURNURE:
                for m in re.finditer(r, l):
                    if not re.search(r"\b(?:lequel|laquelle|lesquels|lesquelles)\b", m.group(0)):
                        out.append((i, "tournure", m.group(0)[:50], l))
        for r, dit in LIVRESQUE:
            for m in re.finditer(r, l, re.I):
                out.append((i, "livre", f"{m.group(0)} → {dit}", l))
        for r in FORMULES:
            m = re.search(r, l)
            if m and not re.search(r"\bmais\b", m.group(0), re.I):      # un vrai « mais » dit le contraste
                out.append((i, "relief", m.group(0)[:50], l))
        for r in ORGANISMES:
            for m in re.finditer(r, l):
                out.append((i, "organisme", m.group(0), l))
    return out


def tics_texte(texte, L):
    """Les avis qui demandent le paragraphe entier : le « vous » et les citations, qui peuvent couper une ligne."""
    out = []
    pos = Positions(texte)
    spans = citations(texte)
    for m in VOUS.finditer(texte):
        if not dans(spans, m.start()):
            i = pos.ligne(m.start())
            out.append((i, "vous", m.group(0), L[i - 1]))
    for m in EZ.finditer(texte):
        if est_verbe_ez(m, texte) and not dans(spans, m.start()):
            i = pos.ligne(m.start())
            out.append((i, "vous", m.group(1), L[i - 1]))
    for a, b in spans:
        q = texte[a:b]
        if not q.startswith(("«", "“")):
            continue
        if VOUS.search(q) or any(est_verbe_ez(m, q) for m in EZ.finditer(q)):
            i = pos.ligne(a)
            out.append((i, "citation", re.sub(r"\s+", " ", q)[:90], L[i - 1]))
    return out


def tics_etapes(B):
    """Les avis sur les étapes : le pronominal, l'exception après le geste, la longueur."""
    out = []
    for b in B:
        if b.genre in ("prose", "puce", "note"):
            for s in tempo.phrases(b.texte):
                for m in PRONOMINAL_PARTOUT.finditer(s):
                    if not PERSONNE_AVANT.search(s[:m.start()]):
                        out.append((b.ligne, "pronominal", m.group(0), s))
        if b.genre != "etape":
            continue
        t = b.texte
        for s in tempo.phrases(t):
            for m in PRONOMINAL.finditer(s):
                if PERSONNE_AVANT.search(s[:m.start()]) or PAS_GESTE_AVANT.search(s[:m.start()]):
                    continue
                if m.group(1).lower() in ("met", "mettent") and SE_METTRE_A.match(s[m.end():]):
                    continue
                out.append((b.ligne, "pronominal", m.group(0), s))
            m = EXCEPTION_APRES.search(s)
            if m and len(tempo.mots(s[:m.start()])) >= 3:
                out.append((b.ligne, "exception", m.group(0), s))
        n = len(tempo.mots(t))
        if n > 100:
            quoi = "série orange, la longueur reste et on découpe en gestes" if b.orange else "un geste par étape"
            out.append((b.ligne, "longue", f"{n} mots ({quoi})", t))
    return out


def tics_relief(B):
    """La mise en relief d'un nom déjà dit dans la phrase d'avant (P12 : elle redit)."""
    out = []
    for b in B:
        if b.genre not in ("prose", "etape", "puce", "note"):
            continue
        S = tempo.phrases(b.texte)
        for avant, s in zip([""] + S, S):
            for m in RELIEF.finditer(s):
                nom = m.group(1).lower().rstrip("sx")
                if len(nom) > 2 and re.search(r"\b" + re.escape(nom) + r"[sx]?\b", avant.lower()):
                    out.append((b.ligne, "relief", m.group(0), s))
    return out


def tics_tete(B):
    """Le participe ou l'adjectif en tête de phrase, à la place d'un « si » (P8)."""
    out = []
    for b in B:
        if b.genre not in ("prose", "etape", "puce", "note"):
            continue
        t = b.texte
        for rx in (PARTICIPE, ADJ_TETE):
            for m in rx.finditer(t):
                if m.group(1) in PAS_PARTICIPE:
                    continue
                out.append((b.ligne, "tete", m.group(0), t))
    return out


def nb_mots(t, coupe_apostrophe=False):
    t = re.sub(r"\{[!>][\w-]+\}", "", t)
    t = re.sub(r"\*\*|\*|`", "", t)
    if coupe_apostrophe:
        t = re.sub(r"['’]", " ", t)
    return len(re.findall(MOT, t))


def forme_chapitre(texte, B):
    """La forme du gabarit : ce qui bloque, puis ce qui est à juger."""
    bloque, juger = [], []
    titres = [(b.ligne, tempo.titre_propre(b.lignes[0])) for b in B if b.genre == "titre" and b.niveau == 2]
    noms = [t for _, t in titres]
    attendu = SECTIONS + (["En plus"] if "En plus" in noms else [])
    if noms != attendu:
        manque = [s for s in SECTIONS if s not in noms]
        trop = [f"« {t} » (l. {i})" for i, t in titres if t not in SECTIONS + ["En plus"]]
        if manque:
            bloque.append(("sections", "il manque : " + ", ".join(f"« {s} »" for s in manque)))
        if trop:
            bloque.append(("sections", "hors du gabarit : " + ", ".join(trop)))
        if not manque and not trop:
            bloque.append(("sections", "l'ordre n'est pas celui du gabarit : " + " ; ".join(noms)))
    premiere = titres[0][0] if titres else 10 ** 6
    tete = [b for b in B if b.ligne < premiere and b.genre == "autre" and tempo.LIEU.match(b.lignes[0].strip())]
    if not tete:
        bloque.append(("lieu", "pas de ligne de lieu seule sous le titre (« **Maison** », « **Chalet** » ou "
                               "« **Les deux** »)"))
    for sec in ("5. Points de contrôle", "6. Signes d'échec"):
        dedans = [b for b in B if b.section == sec]
        lignes = 0
        ligne = next((i for i, t in titres if t == sec), None)
        for b in dedans:
            if b.genre == "tableau":
                rangs = [r for r in b.lignes if not re.match(r"^\|?\s*:?-{3,}", r)]
                lignes += max(0, len(rangs) - 1)
            elif b.genre == "puce":
                lignes += 1
        if ligne is None:
            continue
        if lignes > 8:
            bloque.append(("tableau", f"l.{ligne} « {sec[3:]} » : {lignes} lignes (8 au plus)"))
        elif 0 < lignes < 5:
            juger.append(("tableau", f"l.{ligne} « {sec[3:]} » : {lignes} lignes (5 à 8 ; on n'ajoute une ligne que "
                                     f"si elle change une décision)"))
    for b in B:
        if b.section == "3. Matériel" and b.genre == "puce":
            brut = re.sub(r"^[-*+]\s+", "", b.brut)
            sans_par = re.sub(r"\([^)]*\)", "", brut)
            bas, haut = nb_mots(sans_par), nb_mots(brut, coupe_apostrophe=True)
            if haut < 15 or bas > 20:
                n = bas if bas > 20 else haut
                bloque.append(("materiel", f"l.{b.ligne}, ligne de Matériel : {n} mots (15 à 20) "
                                           f"« {tempo.debut(b, 8)} »"))
    return bloque, juger


def forme_dangers(B):
    """Chaque page de danger (titre ##) : 150 à 230 mots, et ses trois parties dans l'ordre."""
    bloque = []
    sections = []
    for b in B:
        if b.genre == "titre" and b.niveau == 2:
            sections.append((b.ligne, tempo.titre_propre(b.lignes[0]), []))
        elif sections and b.genre not in ("titre",):
            sections[-1][2].append(b)
    for ligne, nom, corps in sections:
        brut = "\n".join(b.brut for b in corps)
        sans = re.sub(r"(?m)^\s*\d+[.)]\s+", "", brut)
        bas = nb_mots(re.sub("|".join(re.escape(f"**{p}**") for p in PARTIES_DANGER), "", sans))
        haut = nb_mots(sans, coupe_apostrophe=True)
        if bas > 230 or haut < 150:
            bloque.append(("danger", f"l.{ligne} « {nom} » : {bas} mots (150 à 230)"))
        places = [brut.find(f"**{p}**") for p in PARTIES_DANGER]
        if -1 in places or places != sorted(places):
            manque = [p for p, x in zip(PARTIES_DANGER, places) if x == -1]
            quoi = ("il manque " + ", ".join(f"« {p} »" for p in manque)) if manque \
                else "les parties ne sont pas dans l'ordre"
            bloque.append(("danger", f"l.{ligne} « {nom} » : {quoi} (Ce qui arrive, Comment on le reconnaît, "
                                     f"Ce qu'on fait)"))
    return bloque


VIDES_NGRAM = set("le la les l un une des de du d à au aux et ou en on ne pas que qui qu ce c est se s sur dans par pour avec il elle y a".split())


def redites(L, n=6, ecart=3):
    """Suites de n mots qui reviennent dans le chapitre, à plus de `ecart` lignes l'une de l'autre."""
    vus, out = {}, []
    mots = []
    for i, l in enumerate(L, 1):
        if l.lstrip().startswith("|") or l.startswith("#") or l.startswith("[^"):
            continue
        l = re.sub(r"^\s*(?:>\s*)?(?:[-*+]\s+|\d+[.)]\s+)?", "", l)
        m = tempo.ETIQUETTE.match(l)                  # les étiquettes du gabarit ne sont pas des redites
        if m:
            l = l[m.end():]
        for w in re.findall(r"[\wÀ-ÿ'’]+", l.lower()):
            mots.append((w.replace("’", "'"), i))
    for k in range(len(mots) - n + 1):
        fen = tuple(w for w, _ in mots[k:k + n])
        if sum(w not in VIDES_NGRAM for w in fen) < 3:
            continue
        ligne = mots[k][1]
        if fen in vus and ligne - vus[fen] > ecart:
            out.append((vus[fen], ligne, " ".join(fen)))
        vus.setdefault(fen, ligne)
    # une redite longue donne plusieurs fenêtres : on garde la première de chaque paire de lignes
    vu, res = set(), []
    for a, b, t in out:
        if (a, b) not in vu:
            vu.add((a, b)); res.append((a, b, t))
    return res


def norme(t):
    return re.sub(r"[\s  ]+", " ", t).strip()


def ancres(chemin, texte):
    num = os.path.basename(chemin).split("-")[0]
    perdues = []
    for f in sorted(glob.glob(os.path.join(RACINE, "design", "epreuves-livre", "placements*.json"))):
        d = json.load(open(f, encoding="utf-8"))
        e = d.get(num) or {}
        for p in (e.get("planches") or []) + (e.get("photos") or []):
            a = p.get("apres")
            if a and norme(a) not in norme(texte):
                perdues.append((os.path.basename(f), p.get("id") or p.get("fichier"), a))
    return perdues


def invariants(avant, apres):
    # le texte d'un seul tenant (un nombre et son unité peuvent tomber sur deux lignes), et les renvois
    # « chapitre N » ramenés à « ch. N » pour comparer la chose et non sa forme
    def plat(t):
        t = re.sub(r"[\s  ]+", " ", t)
        return re.sub(r"\bchapitres? (\d+[a-z]?)\b", r"ch. \1", t)
    avant, apres = plat(avant), plat(apres)
    def compte(rx, t):
        return Counter(norme(m) for m in re.findall(rx, t))
    rapports = []
    for nom, rx in [("chiffre avec unité", r"\d+(?:[,.]\d+)?" + ESP + UNITES),
                    ("renvoi", r"\bch\.\s?\d+[a-z]?\b|\bchapitres?\s\d+[a-z]?\b"),
                    ("note", r"\[\^[^\]]+\]"),
                    ("figure", r"!\[[^\]]*\]\([^)]*\)|\bplanche\s\d+-\d+[a-z]?\b")]:
        a, b = compte(rx, avant), compte(rx, apres)
        manque = a - b
        if manque:
            rapports.append((nom, ", ".join(f"{k} (×{v})" if v > 1 else k for k, v in sorted(manque.items()))))
    nombres_a = set(re.findall(r"\b\d+(?:[,.]\d+)?\b", avant))
    nombres_b = set(re.findall(r"\b\d+(?:[,.]\d+)?\b", apres))
    if nombres_a - nombres_b:
        rapports.append(("nombre disparu", ", ".join(sorted(nombres_a - nombres_b, key=lambda x: float(x.replace(",", "."))))))
    pas = lambda t: len(re.findall(r"(?m)^\s*\d+\.\s", t))
    if pas(apres) < pas(avant):
        rapports.append(("étapes numérotées", f"{pas(avant)} → {pas(apres)}"))
    for nom, rx in SECURITE.items():
        na, nb = len(re.findall(rx, avant, re.I)), len(re.findall(rx, apres, re.I))
        if nb < na:
            rapports.append(("sécurité", f"{nom} : {na} → {nb}"))
    return rapports


def liaisons(texte):
    """Les mots de liaison parlés, comptés comme dans tempo.py."""
    m = tempo.mesure(texte)
    return (m["liaisons"], sum(m["liaisons"][k] for k in tempo.PARLEES), m["mots"]) if m else ({}, 0, 0)


# ---------------------------------------------------------------------------------------------- le rapport

BLOQUANTS = [("tiret", "Tirets"), ("banni", "Mots bannis"),
             ("section", "Signes § à écrire « section N » (JP : « c'est quoi l'affaire avant le 8 »)"),
             ("norme", "Numéros de norme (aucun, même pour référence ; on dit ce que la pièce doit faire)"),
             ("service", "Téléphones et services qui répondent (il n'y a personne à appeler ; on dit la gravité, "
                         "puis ce qu'on fait ici)"),
             ("attribution", "Attributions : un organisme cité comme source (la provenance ne s'imprime pas)"),
             ("recherche", "Le livre et la recherche dans le texte (P12 : on dit le fait, pas d'où il vient)"),
             ("vous", "« vous » et impératif en « -ez » hors d'une citation (P10)"),
             ("latin", "Noms latins (décision 11 : ils sortent partout, le nom d'usage reste)")]
A_JUGER = [("IA", "Vocabulaire d'IA (à juger)"),
           ("age", "Âges de 4 ou 6 ans (à juger : l'âge des enfants de JP sort, un âge qui est un fait reste)"),
           ("tournure", "Tournures bizarres : sujet en « ceux qui », ordre renversé, chose qui pense (à juger, P8 et "
                        "P12)"),
           ("livre", "Mots de livre : on l'écrit, on ne le dit pas (à juger, P10 : le mot qu'on dit)"),
           ("relief", "Mises en relief et oppositions (à juger, P12 : la mise en relief qui redit sort ; la formule "
                      "« ce n'est pas X, c'est Y », « X ne fait pas Y : il fait Z » ou « , pas un… » sort si elle "
                      "n'ajoute pas un fait ; un vrai « mais » reste)"),
           ("vide", "Mots vides (à juger)"),
           ("pronominal", "Consignes au pronominal dans une étape, et « se cuit », « se jette » partout (à juger, P8 : "
                          "« on doit le cuire », pas « il se cuit » ; « se » reste quand la chose le fait seule)"),
           ("tete", "Participes ou adjectifs en tête à la place d'un « si » (à juger, P8)"),
           ("exception", "Exceptions dites après le geste dans une étape (à juger, P9 : on dit l'exception avant le "
                         "geste, sur sa ligne, et elle garde son « si »)"),
           ("longue", "Étapes de plus de 100 mots (à juger, P9)"),
           ("citation", "Citations de source entre guillemets (à juger, P10 : la fiche se redit avec nos mots ; une "
                        "parole qu'on dit à quelqu'un reste)"),
           ("organisme", "Organismes, lois, règlements, permis et services nommés (à juger : le mécanisme reste, dit "
                         "comme un fait)")]


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    verifie_jamais()
    chemin = sys.argv[1]
    texte = open(chemin, encoding="utf-8").read()
    imprime = tempo._sans_commentaires(texte)
    L = imprime.split("\n")
    B = tempo.blocs(texte)
    t = tics(L) + tics_texte(imprime, L) + tics_etapes(B) + tics_tete(B) + tics_relief(B)
    base = os.path.basename(chemin)
    est_chapitre = bool(re.match(r"^\d{2,3}[a-z]?-", base)) and "chapitres" in os.path.abspath(chemin).split(os.sep)
    est_dangers = "dangers" in os.path.abspath(chemin).split(os.sep)
    forme_b, forme_j = forme_chapitre(texte, B) if est_chapitre else ([], [])
    if est_dangers:
        forme_b += forme_dangers(B)
    perdues = ancres(chemin, texte)
    plat = re.sub(r"\s+", " ", imprime)
    maximes = [m.group(0) for rx in MAXIME for m in re.finditer(rx, plat)]
    r_redites = redites(L)

    sorties, grave, a_juger = [], 0, 0
    for cat, titre in BLOQUANTS:
        x = [r for r in t if r[1] == cat]
        if x:
            grave += len(x)
            sorties.append((f"## {titre} ({len(x)})",
                            [f"  l.{i} [{m.strip()}] {l.strip()[:110]}" for i, _, m, l in x[:400]]))
    if forme_b:
        grave += len(forme_b)
        sorties.append((f"## Forme du chapitre (gabarit-chapitre.md) ({len(forme_b)})" if not est_dangers else
                        f"## Pages des dangers : longueur et parties (pour condenser, on coupe des phrases entières, "
                        f"jamais les liens, P2 ; le « Ce qui arrive » du monoxyde reste tel que JP l'a adoré, "
                        f"décision 9) ({len(forme_b)})", [f"  {d}" for _, d in forme_b]))
    if perdues:
        grave += len(perdues)
        sorties.append(("## Ancres de planches introuvables", [f"  {i} ({f}) : « {a} »" for f, i, a in perdues]))
    avant_txt = None
    if "--avant" in sys.argv:
        avant_txt = open(sys.argv[sys.argv.index("--avant") + 1], encoding="utf-8").read()
        r = invariants(avant_txt, texte)
        grave += len(r)
        sorties.append((f"## Invariants : {len(avant_txt.split())} mots avant, {len(texte.split())} après",
                        [f"  {nom} : {d}" for nom, d in r] or ["  rien n'a disparu"]))
    for cat, titre in A_JUGER:
        x = [r for r in t if r[1] == cat]
        if x:
            a_juger += len(x)
            sorties.append((f"## {titre} ({len(x)})",
                            [f"  l.{i} [{m.strip()}] {' '.join(l.split())[:110]}" for i, _, m, l in x[:400]]))
    if forme_j:
        a_juger += len(forme_j)
        sorties.append((f"## Forme du chapitre, à juger ({len(forme_j)})", [f"  {d}" for _, d in forme_j]))
    if maximes:
        a_juger += len(maximes)
        sorties.append((f"## Maximes : la règle redite en proverbe (à juger : elle sort ou se dit en clair) "
                        f"({len(maximes)})", [f"  « {m[:140]} »" for m in maximes[:60]]))
    if r_redites:
        a_juger += len(r_redites)
        sorties.append((f"## Redites (à juger : un renvoi, ou on coupe) ({len(r_redites)})",
                        [f"  l.{a} et l.{b} : « {x} »" for a, b, x in r_redites[:60]]))
    if avant_txt is not None:
        (la, na, ma), (lb, nb, mb) = liaisons(avant_txt), liaisons(texte)
        baisses = [f"{k} {la.get(k, 0)} → {lb.get(k, 0)}" for k in tempo.PARLEES if lb.get(k, 0) < la.get(k, 0)]
        lignes = [f"  avant : {na} pour {ma} mots ; après : {nb} pour {mb} mots"]
        if baisses:
            a_juger += 1
            lignes.append("  en baisse (à juger : une phrase coupée en entier emporte son lien, une phrase gardée "
                          "garde le sien) : " + ", ".join(baisses))
        sorties.append(("## Mots de liaison parlés, avant et après la passe", lignes))

    print(f"# Contrôle d'écriture : {chemin}\n")
    tirets = sum(int(m.split()[0]) for _, c, m, _ in t if c == "tiret")
    print(f"{len(texte.split())} mots, {tirets} tirets ; {grave} bloquants, {a_juger} avis à juger\n")
    for titre, lignes in sorties:
        print(titre)
        for l in lignes:
            print(l)
        print()
    sys.exit(1 if grave else 0)


if __name__ == "__main__":
    main()
