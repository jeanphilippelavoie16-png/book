# -*- coding: utf-8 -*-
# Construit design/directions/4-almanach-moderne/interieur.html
import re, html, pathlib

OUT = pathlib.Path(r"C:\Users\jeanp\New folder\design\directions\4-almanach-moderne\interieur.html")

NNBSP = "\u202f"; NBSP = "\u00a0"

def typo(s):
    s = s.replace("1 800 463-5060", "1" + NBSP + "800" + NBSP + "463-5060")
    s = s.replace("\u00a7 ", "\u00a7" + NBSP)
    s = s.replace("'", "\u2019")
    s = re.sub(r"«\s*", "«" + NNBSP, s)
    s = re.sub(r"\s*»", NNBSP + "»", s)
    s = re.sub(r"\s*([;!?])", NNBSP + r"\1", s)
    s = re.sub(r"\s*:(?=\s|$|\*)", NNBSP + ":", s)
    s = re.sub(r"(\d) (\d{3})\b", r"\1" + NNBSP + r"\2", s)
    s = re.sub(r"(\d) (\d{3})\b", r"\1" + NNBSP + r"\2", s)
    s = re.sub(r"(\d) (°C|h|kg|g|m|cm|mm|min|L|pi|po|cc|jours|heures|minutes|mois|m²|V)\b", r"\1" + NBSP + r"\2", s)
    s = re.sub(r"(\d) °", r"\1" + NBSP + "°", s)
    s = re.sub(r"(\d) %", r"\1" + NNBSP + "%", s)
    s = re.sub(r"(?<![\w\u2212])-(\d)", "\u2212" + r"\1", s)
    s = re.sub(r"\b([Cc]h|p)\. (\d)", r"\1." + NBSP + r"\2", s)
    s = s.replace(" — ", NBSP + "— ")
    s = s.replace("≥ ", "≥" + NBSP)
    return s

def md(s):
    s = typo(s)
    s = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    s = re.sub(r"`\[À VÉRIFIER\]`", '<span class="av">à vérifier</span>', s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"\*(.+?)\*", r"<em>\1</em>", s)
    return s

def P(t, c=""): return f'<p class="{c}">{md(t)}</p>'
def LI(t): return f'<div class="li"><span class="m"></span>{md(t)}</div>'
def SUBLI(t): return f'<div class="li sub"><span class="m"></span>{md(t)}</div>'
def STEP(n, t): return f'<div class="step"><span class="m">{n}</span>{md(t)}</div>'
def H3(t): return f'<h3 class="sub kwn">{md(t)}</h3>'
def LEAD(t): return f'<p class="lead kwn">{md(t)}</p>'
def SEC(n, t, extra=""): return f'<h2 class="sec kwn {extra}"><span class="n">{n}</span><span class="t">{md(t)}</span></h2>'
def DG(n, t): return f'<div class="dgi"><span class="m">{n}</span>{md(t)}</div>'

# ---------------------------------------------------------------- p. 67
ouv_flow = [
 SEC(2, "Quand l’utiliser"),
 LEAD("C'est le bon choix quand :"),
 LI("La pièce sort d'une salaison terminée et vérifiée (ch. 63 pour le sel sec, ch. 64 pour la saumure). Le fumage à froid est une **finition**, jamais un traitement autonome."),
 LI("L'air extérieur fait le refroidissement tout seul : fin de l'automne, début du printemps. Ce n'est pas une question de date de calendrier, c'est une question de thermomètre."),
 LI("On veut **arrêter le rancissement** d'une pièce grasse qui va sécher ou attendre : lard d'ours noir (*Ursus americanus*), poitrine et flanc d'orignal (*Alces americanus*), saucisse sèche. La fumée est le seul outil du livre qui freine l'oxydation sans froid ni vide."),
 LI("Il faut **tenir les mouches à viande loin** d'une pièce qui sèche à l'air en septembre."),
 LI("La destination est **la cuisson** — bacon d'orignal, lard, épaule, saucisse à griller. Fumé à froid puis cuit à 74 °C à cœur : c'est le cadre le plus sûr du chapitre."),
 LI("Le congélateur ou le froid naturel peuvent recevoir la pièce **le jour même** où elle sort du fumoir (ch. 68, ch. 69)."),
 LEAD("C'est un mauvais choix quand :"),
 LI("La pièce n'a pas été salée, ou l'a été sans que le pourcentage de sel sur le poids de la viande soit noté. Fumer à froid une pièce sous-salée, c'est laisser une pièce tiède des heures dans la zone de danger avec un parfum dessus."),
 LI("Il s'agit d'**ours noir ou de phoque** — phoque commun (*Phoca vitulina*), phoque du Groenland (*Pagophilus groenlandicus*) — et le produit se mangerait sans cuisson. Section 8, ch. 48, ch. 52."),
 LI("Le produit visé est un poisson fumé à froid prêt-à-manger, style gravlax ou saumon fumé, et aucun congélateur ne peut tenir -20 °C pendant 7 jours ou -35 °C pendant 15 heures. Sans cette étape, la filière est fermée."),
 LI("La seule façon d'emballer est le sac sous vide destiné au réfrigérateur : la pire combinaison du chapitre, et celle vers laquelle penche un chalet qui vient d'acheter une scelleuse."),
 LI("La chambre ne peut pas être séparée du foyer. Un fumoir dont la fumée sort d'un feu logé sous les pièces est un fumoir à chaud mal réglé (ch. 66)."),
 LI("On envisage de fumer **le foie ou les reins d'un cervidé**. Ils peuvent contenir un taux de cadmium élevé : un seul repas de reins contaminés peut porter jusqu'à cent fois la quantité tolérable, et le cadmium s'accumule à vie, dans l'animal puis dans le consommateur. Le fumage n'enlève pas un métal. Ch. 41."),
 LI("Le stock de la saison est fait de viande maigre seule. Fumer de l'orignal maigre en lanières donne des calories protéiques et presque pas de gras : c'est le mal de caribou, et il est mortel (ch. 24)."),
 LI("Une personne enceinte, âgée ou immunodéprimée mange à la table. Le poisson fumé est un aliment à risque de listériose, et la bactérie se multiplie de 4 à 10 °C, donc au réfrigérateur."),
 SEC(3, "Pourquoi ça marche"),
 P("La fumée de bois qui couve, et non qui flambe, transporte des phénols, des acides organiques et des composés carbonylés qui se déposent sur une surface humide et y restent. Ils sont antimicrobiens et antioxydants **là où ils se posent**, c'est-à-dire sur les premiers millimètres. Ils ne traversent pas un jambon ni un filet épais, et ils n'atteignent jamais le centre d'une pièce roulée et ficelée. Ce qui se passe au cœur relève du sel, et de lui seul."),
 P("Le deuxième effet est un assèchement de surface — réel, et petit. Le fumage à froid «ne provoque pas de coagulation significative des protéines», mais il abaisse un peu l'activité de l'eau. Un produit de viande fermenté-séché stable est à une aw de **0,85 ou moins** ; un fumage à froid seul ne descend pas là. Le seuil qui compte pour le botulisme non protéolytique — type E, celui du fleuve — est **0,97**, et il s'atteint par le sel, pas par la fumée."),
 P("Le troisième effet est celui qu'on sous-estime. Le gras d'un poisson ou d'un ours rancit à l'air, à la lumière et à la chaleur sans l'aide d'aucune bactérie ; une pièce rance n'est pas avariée au sens microbien, elle est devenue immangeable. Le froid, le noir et la fumée sont les trois choses qui ralentissent cette horloge-là, et la fumée est la seule qui ne coûte que du bois."),
]

# ---------------------------------------------------------------- p. 70 : Matériel
mat_rows = [
 ("Pièce salée, avec son % de sel sur le poids de la viande noté (ch. 63, 64)", "—", "Aucune. C'est l'entrant du chapitre", "Non"),
 ("Thermomètre de chambre, à demeure, à hauteur des pièces", "1", "Un cube de gras dont le point de ramollissement a été mesuré d'avance, posé à hauteur des pièces (§ 9). Il donne un seuil, pas une lecture — et pour ce chapitre, le seuil est presque tout ce qu'on demandait", "Non"),
 ("Thermomètre à sonde, lecture instantanée", "1", "Un thermomètre à cadran remis d'aplomb dans la glace fondante et l'eau bouillante (§ 9). Sans aucune sonde, l'ours et le phoque sortent du chapitre au complet", "Non"),
 ("Thermomètre de congélateur, à demeure", "1 par appareil", "Un pot d'eau saturée de sel, qui ne prend en bloc dur que sous le seuil du gel antiparasitaire (§ 9). Il sert à disqualifier un appareil, jamais à en qualifier un", "Non"),
 ("Avertisseur de CO dans tout bâtiment relié au fumoir ou sous le vent", "1 par bâtiment", "Aucune, et aucun montage non plus : «seul un avertisseur […] peut détecter la présence de ce gaz». Ce qui remplace l'appareil, c'est la géométrie — tout dehors, personne sous le vent (§ 9)", "Non"),
 ("Foyer ou générateur de fumée **séparé de la chambre**", "1", "Serpentin de bran de scie monté en labyrinthe, qui couve sans flamme et se pose dans la chambre elle-même, sans conduit (§ 9) ; ou foyer au sol relié par une tranchée couverte", "Non"),
 ("Conduit foyer-chambre : tôle noire, tuyau de poêle usagé, tranchée couverte", "selon montage", "La tranchée couverte de tôle et de terre refroidit le mieux", "Non"),
 ("Chambre : coffre, armoire, baril, cabane de planches", "1", "Vieux réfrigérateur **vidé de toute mousse et de tout plastique**", "Oui"),
 ("Tringles et crochets inoxydables, ou bâtons de bois franc écorcés", "selon charge", "Bâtons de bois franc écorcés ligaturés à la babiche posée mouillée, qui serre en séchant (ch. 80). Fil inoxydable. Jamais de galvanisé ni de broche à foin dans le circuit", "Non|matériau"),
 ("Bois franc sec, écorcé", "10 à 15 kg/saison `[À VÉRIFIER]`", "Bouleau, érable, aulne, cerisier. **Jamais** de résineux, de bois traité, peint, collé ni d'épave", "Non|essence"),
 ("Coton fromage ou moustiquaire fine", "selon charge", "Vieille moustiquaire de fenêtre découpée et lavée, tulle, vieux drap de coton usé jusqu'à la trame. Ce qui n'a pas de substitut, c'est d'en avoir une si les mouches volent encore", "Oui"),
 ("Papier boucherie et sacs de papier", "selon récolte", "Tout emballage **perméable** : ≥ 2 000 cc/m²/24 h pour le poisson fumé réfrigéré. Coton usé, toile de jute, écorce de bouleau roulée — ou rien du tout, la pièce pendue à l'air dans une caisse grillagée au froid", "Non"),
 ("Registre de fumage et étiquettes", "1 cahier", "Bardeau, planchette ou plaque d'écorce de bouleau, au crayon de plomb, une par pièce, pendue à la même broche qu'elle (§ 9). Le support est libre ; l'écriture ne l'est pas", "Non"),
 ("Balance de 10 kg, précision au gramme", "1", "Fléau à bras égaux et des litres d'eau comme masses (§ 9) : assez pour un pourcentage de sel ordinaire et pour suivre la perte de masse, pas assez pour un sel de salaison nitrité (ch. 62)", "Non"),
 ("Extincteur ou chaudière d'eau au foyer", "1", "Pelle et banc de neige, chaudière de sable", "Non"),
 ("Sel de salaison du commerce, **teneur en nitrite déclarée sur l'étiquette**", "selon recette (ch. 62)", "**Pas de salpêtre au volume.** § 5, étape 4", "Oui|si la teneur est déclarée"),
]
def neg(v):
    a, _, b = v.partition("|")
    s = f'<strong>{a}</strong>' if a == "Non" else a
    if b: s += f'<br><span class="q">{md(b)}</span>'
    return s
mat_table = '<table class="t mat"><colgroup><col style="width:24.5%"><col style="width:10%"><col style="width:53%"><col style="width:12.5%"></colgroup><thead><tr><th>Item</th><th>Quantité</th><th>Substitution possible</th><th>Négociable</th></tr></thead><tbody>' + "".join(
    f'<tr><td class="it">{md(a)}</td><td class="qt">{md(b)}</td><td class="sb">{md(c)}</td><td class="ng">{neg(d)}</td></tr>' for a, b, c, d in mat_rows) + '</tbody></table>'
mat_after = P("Il y a peu de non négociables, et chacun a sa raison. Les thermomètres et l'avertisseur de CO, parce que les seuls chiffres qui protègent ici — 74 °C, 70 °C, 4 °C, -18 °C, -20 °C — ne se devinent pas et que le monoxyde ne se sent pas. La séparation du foyer et de la chambre, parce que c'est **la** définition mécanique du procédé. L'essence du bois, parce qu'un bois traité dépose sur la viande ce qu'on l'a payé à repousser. L'emballage perméable, parce que le sac sous vide est exactement ce que *Clostridium botulinum* attend. Le registre, parce qu'une pièce non datée devient, trois mois plus tard, un morceau dont personne ne sait s'il se mange cru.", "first")

# ---------------------------------------------------------------- p. 71 : Procédure
proc_flow = [
 "@MATAFTER@",
 SEC(5, "Procédure"),
 H3("A — Décider avant d'allumer"),
 STEP(1, "**Vérifier que la salaison est terminée**, pas «bien avancée». Reprendre la fiche du chapitre 63 ou 64 : masse de la pièce à l'entrée, pourcentage de sel sur le poids de la viande, durée, masse à la sortie. Sans ces quatre valeurs écrites, la pièce ne va pas au fumoir : elle retourne au sel ou elle va au congélateur."),
 STEP(2, "**Déclarer la destination du produit, par écrit, avant de fumer.** Deux catégories, et une seule ligne à écrire sur l'étiquette."),
 SUBLI("**À CUIRE** — bacon, lard, épaule, saucisse fraîche fumée, tout produit d'ours ou de phoque, tout produit dont le sel n'a pas été mesuré. Le produit se traite comme de la viande crue jusqu'à la cuisson : 74 °C à cœur pour le gibier, 70 °C pour le poisson."),
 SUBLI("**PRÊT-À-MANGER** — poisson fumé à froid de style saumon fumé, saucisse sèche. Au chalet, cette catégorie est l'exception et elle exige trois choses réunies : un sel mesuré, la congélation antiparasitaire du point 3, et une conservation au congélateur."),
 P("Dans le doute, c'est **À CUIRE**. Une étiquette n'a jamais tué personne.", "stepcont"),
 STEP(3, "**Régler la question des parasites du poisson maintenant.** La consigne : congeler le poisson, **avant ou après le fumage**, à -35 °C ou moins pendant au moins 15 heures, ou à -20 °C pendant au moins 168 heures (7 jours). Le «avant ou après» est la seule souplesse accordée, et elle est utile : un congélateur de chalet qui peine à descendre sert mieux après le fumage, quand la pièce a perdu de l'eau. Vérifier la température **dans** le congélateur, avec un thermomètre, pas sur le cadran. Le congélateur qui tient sa température sept jours d'affilée sans qu'on y pense est celui de la maison, sur le réseau : le gel antiparasitaire se fait souvent là, avant de monter ou au retour. Celui du chalet le fait aussi, mais il se juge au thermomètre et pas à la réputation."),
 STEP(4, "**Le salpêtre et sa forme moderne.** Le salpêtre, c'est du nitrate — de potassium ou de sodium. «Les nitrates sont lentement convertis par l'action bactérienne en nitrite, qui est l'agent de saumurage actif» : le nitrate n'agit qu'après qu'une flore l'ait transformé, à une vitesse qui dépend de la température, du temps et de cette flore. Sa forme moderne équivalente est le **sel de salaison du commerce, qui contient du nitrite déjà formé et dont l'étiquette déclare la teneur**. Les deux ne se dosent pas pareil, et l'écart est au point 5 de la section 8. **Ce livre ne donne aucune quantité de salpêtre, à aucun endroit.** Les teneurs qui circulent sont des teneurs **dans la viande**, pas des dosages de sac : la conversion vers un produit du commerce passe obligatoirement par la teneur déclarée sur son étiquette, et la formule est au chapitre 62. Aucune cuillerée, jamais."),
 H3("B — Monter le fumoir"),
 STEP(5, "**Séparer le foyer de la chambre.** C'est la seule chose qui distingue mécaniquement un fumoir à froid d'un fumoir à chaud : le feu est ailleurs, et la fumée arrive refroidie. Un conduit de 2,5 à 4 m (8 à 13 pi), en pente légère montante vers la chambre, donne assez de tirage et assez de refroidissement. `[À VÉRIFIER]` — dimension de montage non sourcée, à ajuster au premier essai à vide."),
 STEP(6, "**Creuser le conduit dans le sol si le terrain le permet.** Une tranchée couverte de tôle et de terre refroidit mieux que n'importe quel tuyau à l'air libre, ne coûte rien, et supprime d'un coup les quelques mètres de surface brûlante qu'un tuyau aérien laisse en travers de la cour, à hauteur de hanche."),
 STEP(7, "**Monter la chambre en matériaux qui ne rendent rien.** Planches brutes non traitées, acier noir, acier inoxydable. Pas de contreplaqué ni de panneau collé dans le circuit — la colle chauffe et dégaze. Pas d'acier galvanisé dans la zone chaude : le zinc se volatilise. Un vieux réfrigérateur fait une bonne chambre à condition d'en retirer **toute** la mousse isolante, tous les plastiques et tous les joints. Ch. 84, ch. 87."),
 STEP(8, "**Entrée d'air en bas, sortie en haut**, registre réglable sur la sortie. Sans courant lent et continu, la surface reste humide et la fumée se condense en dépôt amer au lieu de se déposer en couche sèche."),
 STEP(9, "**Placer le fumoir à l'écart.** Jamais adossé au chalet, jamais sous un auvent fermé, jamais dans un hangar, jamais sous une fenêtre de chambre : la consigne vise «une pièce, un abri ou un véhicule», et un fumoir est un abri. Orienter selon le vent dominant pour que le panache ne descende pas sur la porte. Ch. 16."),
 STEP(10, "**Essai à vide, sans viande, avant la première charge de la saison.** Allumer, lire le thermomètre de chambre aux 15 minutes pendant deux heures, noter au registre avec la température extérieure. C'est cet essai qui dit si le montage tient, pas la première charge."),
]

# ---------------------------------------------------------------- p. 76 : fin §7 + Danger
echec_rows = [
 ("Emballage sous vide gonflé, bombé", "Production de gaz sous atmosphère sans oxygène", "**Jeter sans ouvrir, sans goûter, sans sentir.** Ne pas mettre au compost accessible aux animaux"),
 ("Rien. Aucun signe. Apparence, odeur et goût normaux", "**Cela ne prouve rien.** La bactérie peut se développer dans le poisson fumé réfrigéré «même s'il ne montre aucun signe de détérioration»", "La sécurité d'un produit fumé à froid se décide **avant**, par le sel, le froid, l'emballage perméable et la date — jamais après, par les sens"),
 ("Une personne tombe malade 3 à 30 jours, voire jusqu'à 70 jours, après un repas", "Fenêtre d'incubation de la listériose", "Consulter. Nommer le produit fumé au soignant : personne ne fait spontanément le lien à deux mois de distance. Garder l'étiquette et le reste de la pièce. Ch. 27"),
]
echec_table = '<table class="t echec"><colgroup><col style="width:30%"><col style="width:33%"><col style="width:37%"></colgroup><thead><tr><th>Observation</th><th>Diagnostic</th><th>Action</th></tr></thead><tbody>' + "".join(
    f'<tr><td class="it">{md(a)}</td><td>{md(b)}</td><td>{md(c)}</td></tr>' for a, b, c in echec_rows) + '</tbody></table>'

danger_flow = [
 DG(1, "**Botulisme de type E — le sac sous vide est le piège, pas la fumée.** *Clostridium botulinum* est «répandue dans les milieux aquatiques» et «se développe uniquement en l'absence d'oxygène, par exemple dans un emballage sous vide». Les souches non protéolytiques, dont le type E, **croissent au-dessus de 3 °C** : un réfrigérateur réglé à 4 °C ne les arrête pas. Un fumage à froid ne comporte **aucune étape de chaleur** — le traitement qui réduit ces spores de six unités logarithmiques est de 90 °C pendant 10 minutes, et un fumoir à froid n'en approche rien. Et la toxine **ne change ni l'odeur, ni le goût, ni l'apparence** : la bactérie peut se développer dans le poisson fumé réfrigéré «même si celui-ci […] ne montre aucun signe de détérioration». *Mécanisme :* mettre sous vide un produit fumé à froid, c'est retirer l'oxygène, c'est-à-dire retirer la dernière barrière qui empêchait cette bactérie de pousser, tout en croyant en ajouter une. **Un produit fumé à froid qui reste au réfrigérateur va dans du papier, jamais sous vide ; sinon, il va au congélateur.**"),
 DG(2, "**Trichinellose — le fumage ne tue pas ce parasite, et le gel non plus.** «La salaison, le séchage, le fumage ou la cuisson au four à micro-ondes ne détruisent pas toujours les larves infectieuses», et «la plupart des espèces de *Trichinella* qui ont été trouvées dans la nature résistent à la congélation». *Mécanisme :* les larves sont enkystées **dans le muscle**, pas en surface. La fumée se dépose sur les premiers millimètres et n'y arrive jamais ; le sel diffuse, mais il ne suffit pas toujours ; le gel, qui règle le problème du poisson, ne règle pas celui-ci. Seule la chaleur au cœur les tue. L'atteinte du muscle cardiaque et du cerveau «est grave, voire mortelle». **L'ours noir (*Ursus americanus*) et le phoque ne sortent jamais d'un fumoir à froid comme produit prêt-à-manger. Ils sortent étiquetés À CUIRE et ils se mangent à 74 °C à cœur.** Ch. 48, ch. 52."),
 DG(3, "**Listériose — la seule bactérie du chapitre que le froid n'arrête pas.** *Listeria monocytogenes* «peut aussi se multiplier à des températures froides (4 à 10 °C), par exemple dans les aliments conservés au réfrigérateur», et les «poissons fumés, comme le saumon» sont parmi les aliments à risque : la bactérie «a fréquemment été détectée dans le poisson fumé». *Mécanisme :* un produit fumé à froid est prêt-à-manger, n'a reçu aucune étape de chaleur, et passe ensuite des semaines au froid — c'est-à-dire précisément les conditions où cette bactérie-là est la seule à pouvoir pousser, sans concurrence. Les symptômes apparaissent «entre 3 et 30 jours après la consommation […] mais parfois même jusqu'à 70 jours après» : personne ne remonte jusqu'au fumoir à deux mois de distance. Les personnes vulnérables sont «les personnes enceintes ; les personnes âgées ; les personnes dont le système immunitaire est affaibli». **Position du livre :** au chalet, un produit fumé à froid se congèle ou se cuit, il ne vieillit pas au réfrigérateur ; et il ne se sert pas cru à une personne enceinte."),
 DG(4, "**Monoxyde de carbone — le fumoir est un appareil à combustion, et c'est un abri.** «Le monoxyde de carbone se dégage lorsque des appareils et des véhicules brûlent un combustible comme le propane, le bois, le mazout», et «c'est un gaz toxique qui ne se voit pas et ne se sent pas. Il n'irrite pas les yeux ni les voies respiratoires». *Mécanisme :* la fumée de bois pique les yeux, ce qui donne l'impression qu'on saurait si l'air devenait mauvais. Le monoxyde, lui, ne donne aucun signal — et les symptômes qu'il produit, «maux de tête ; fatigue ; nausées ; vomissements ; étourdissements», sont ceux qu'on met sur le compte d'une longue journée au fumoir. La consigne vise «une pièce, un abri ou un véhicule» : **un fumoir n'est jamais adossé au chalet, jamais sous un auvent fermé, jamais dans un hangar, et on n'y entre pas respirer.** Avertisseur de CO en fonction dans tout bâtiment relié ou sous le vent. En cas de symptômes : sortir dehors, 9-1-1 ou Centre antipoison du Québec, **1 800 463-5060**."),
 DG(5, "**Salpêtre — jamais une quantité, jamais une cuillerée.** Le salpêtre est du nitrate. «Les nitrates sont lentement convertis par l'action bactérienne en nitrite, qui est l'agent de saumurage actif». Sa forme moderne équivalente est le sel de salaison du commerce, qui contient du nitrite **déjà formé** et dont l'étiquette déclare la teneur. *Mécanisme :* les deux produits n'ont ni le même délai d'action, ni le même rendement, ni la même limite — la limite tient, dans une seule et même phrase, en «62 g de sel de nitrite de sodium et 186 g de sel de nitrate par 100 kg de produit de viande». Trois fois l'écart. Un dosage au volume, à la cuillère ou «comme faisait le grand-père» n'a aucune chance de tomber juste, et le nitrite est actif à des teneurs qui se comptent en parties par million de viande, pas en cuillerées de sac. **Ce livre ne donne aucune quantité de salpêtre nulle part.** La conversion vers un produit du commerce passe par la teneur déclarée sur son étiquette et par la formule du chapitre 62."),
]

# ---------------------------------------------------------------- §9
urg_flow = [
 H3("Le montage, à la pelle et à la hache"),
 P("**Le foyer et la tranchée.** Un trou à feu creusé dans le sol, large comme une chaudière, profond jusqu'au genou, avec une amorce d'entrée d'air du côté du vent dominant. De là part une tranchée de 3 à 4 m (10 à 13 pi) `[À VÉRIFIER]` en pente montante, creusée large et profonde comme un avant-bras, couverte de plaques d'écorce, de pierres plates ou de tôle, puis de terre tassée par-dessus. La terre fait deux métiers en même temps : elle scelle, et c'est elle qui refroidit. Un tuyau aérien perd sa chaleur dans l'air, qui n'en prend pas beaucoup ; une tranchée la perd dans le sol, qui est une masse froide sans fond. Allumer à vide et **marcher la course du conduit** : partout où un filet de fumée sort du couvert, il manque de la terre. Un conduit qui fuit ne tire pas, et un conduit qui ne tire pas laisse la chaleur monter dans la chambre au lieu de la laisser au sol.", "first"),
 P("**La chambre.** Un baril défoncé aux deux bouts posé debout sur la sortie de tranchée ; un tipi de perches habillé d'une toile, d'une bâche ou de peaux ; une caisse de planches brutes ; un vieux réfrigérateur vidé de toute sa mousse, de tous ses plastiques et de tous ses joints, carcasse d'acier percée en bas pour le conduit et en haut pour la sortie. Un couvercle de tôle, une pierre plate ou un bout de toile qu'on glisse sur la sortie du haut fait le registre : c'est le seul réglage du montage, et il suffit. Les pièces pendent à des bâtons de bois franc écorcés — **jamais d'épinette noire (*Picea mariana*) ni de sapin baumier (*Abies balsamea*)**, la résine passe dans la viande — ligaturés à la babiche posée mouillée, qui serre en séchant (ch. 80). Les grilles d'un vieux réfrigérateur ne servent que si elles ne sont ni peintes ni plastifiées ; sinon les bâtons les remplacent."),
 P("**Le générateur de fumée sans feu.** C'est la pièce qui change tout quand il n'y a ni terrain à creuser ni tuyau à poser. Une bande de grillage à mailles fines, pliée en U sur sa longueur et montée en labyrinthe dans un plateau de tôle, les couloirs remplis de bran de scie de feuillu tassé à ras : on allume **un seul bout**, avec une braise ou un bout de chandelle, et le bran de scie couve d'un bout à l'autre du labyrinthe sans jamais flamber. Il n'y a pas de feu, donc pas de source de chaleur : le plateau se pose au fond de la chambre elle-même, à l'écart des pièces, et la chambre ne monte pratiquement pas. C'est le seul montage du chapitre qui fume à froid sans conduit du tout. La vitesse de combustion dépend de la finesse et de l'humidité du bran de scie : elle se mesure une fois, à vide, montre en main, et elle s'écrit au registre — c'est ce chiffre-là qui dit ensuite combien de temps une charge dure, et il n'est pas le même d'une essence à l'autre. Bran de scie de feuillu sec seulement : un atelier qui a scié du bois traité a du bran de scie empoisonné, et ce qui tombe d'une scie à chaîne arrive chargé d'huile de chaîne."),
 H3("Les instruments qu'on n'a pas"),
 P("**Le thermomètre à cadran se remet d'aplomb au lieu de se jeter.** Un cadran qui ment n'est pas mort. L'échelle Celsius donne deux points fixes gratuits : la glace fondante dans son eau est à 0 °C, l'eau qui bout au niveau de la mer est à 100 °C, et la Côte-Nord est au niveau de la mer. Plonger la tige dans un verre de glace pilée noyée d'eau, brasser, attendre que l'aiguille s'arrête ; recommencer dans l'eau bouillante. Sous la tête de la plupart des cadrans se cache un petit écrou à six pans : on tient la tête d'une main, on tourne l'écrou de l'autre jusqu'à ce que l'aiguille tombe sur le point. Un cadran qui n'a pas cet écrou se lit quand même, à condition d'écrire son écart au crayon gras sur le cadran lui-même — «lit 3 de trop» — et de le soustraire chaque fois, sans exception.", "first"),
 P("**La graisse témoin, calibrée pendant qu'on a encore un thermomètre.** Un fumoir sans thermomètre de chambre n'a aucune mesure, et le dos de la main ne distingue pas 25 °C de 38 °C — exactement l'écart qui sépare une chambre acceptable de la plage où le nombre de bactéries «peut doubler toutes les 15 minutes». Ce qui remplace l'instrument, c'est un corps gras dont on connaît le point de ramollissement : suif de rognon d'orignal (*Alces americanus*), lard d'ours noir (*Ursus americanus*), cire d'abeille, bout de chandelle. Le calibrage se fait **avant**, à la maison, pendant que le thermomètre fonctionne encore : chauffer lentement un petit cube au bain-marie avec le thermomètre dans l'eau, noter la température exacte à laquelle le cube perd ses arêtes, écrire cette valeur sur le pot. `[À VÉRIFIER]` — elle dépend du gras et ne se recopie d'aucun livre. Au fumoir, le cube posé sur un éclat de bois à hauteur des pièces devient une alarme muette : arêtes vives, la chambre est sous le point noté ; arêtes arrondies, elle l'a dépassé. **Ce qu'on perd :** un seuil, pas une lecture. Le témoin ne dit pas combien il fait, il dit de quel bord d'un chiffre on se trouve — et dans ce chapitre-là, c'est presque tout ce qu'on demandait au thermomètre."),
 P("**Le témoin de congélateur en saumure saturée.** Sans thermomètre de congélateur, «est-ce que l'appareil descend à -20 °C» n'a pas de réponse à l'œil : la viande est dure comme de la roche bien avant. Un pot d'eau saturée de sel — on en ajoute jusqu'à ce qu'il en reste au fond qui ne se dissout plus — ne prend en bloc dur qu'autour de -21 °C `[À VÉRIFIER]`, donc sous le seuil de -20 °C du gel antiparasitaire. Posé au fond du congélateur, il se lit d'un coup de doigt : bloc dur, l'appareil passe sous le seuil ; encore en bouillie, il n'y est pas. **Ce qu'on perd, et c'est décisif :** le pot dit que l'appareil *peut*, il ne dit jamais qu'il a *tenu*. Le gel antiparasitaire demande 168 heures d'affilée à -20 °C, ou 15 heures à -35 °C, et un congélateur qui ne tourne que pendant les heures de génératrice ne tient rien du tout. Le pot sert à disqualifier un appareil, jamais à en qualifier un."),
 P("**Peser sans balance.** Le pourcentage de sel se calcule sur le poids de la viande : sans masse, il n'y a pas de salaison, donc pas de fumage à froid. Un fléau à bras égaux se fait d'une latte de bois franc, d'une encoche au centre pour le pivot, de deux encoches à distances rigoureusement égales et de deux chaudières suspendues ; les distances se marquent avec une ficelle pliée en deux, pas à l'œil. La masse de référence, c'est l'eau : un litre d'eau pèse un kilogramme, et n'importe quel contenant gradué en litres donne autant de kilogrammes qu'on veut."),
]

# ---------------------------------------------------------------- chapitre principal, bloc 1
cp_points = [
 ("Noter l'heure du début.", "Toute la suite est une soustraction : le réfrigérateur tient 4 à 6 h, le congélateur plein 48 h porte fermée. Sans l'heure de départ, il n'y a plus de mesure, juste une impression.", "1 · 69", False),
 ("Génératrice dehors, à 6 m du bâtiment,", "échappement à l'opposé des portes, fenêtres et prises d'air. Le plein se fait moteur froid, à la lampe de poche.", "4", True),
 ("Trancher la plomberie tout de suite :", "chauffer ou vidanger. La décision se prend pendant qu'il reste de la chaleur dans la maison, pas quand le tuyau siffle.", "4", False),
 ("À la sixième heure, lire les quatre horloges", "— le corps, l'eau, le stock périssable, les calories. La plus courte commande.", "1", False),
]
cp_sansrien = [
 LI("**L'auto est la génératrice.** L'alternateur débite du 12 V tant que le moteur tourne, et la batterie garde ce qu'il a fait. Le moteur tourne dehors, jamais dans le garage même porte ouverte : c'est le même monoxyde que la génératrice, avec un toit dessus."),
 LI("**Charger une batterie d'appoint, pas alimenter un fil qui traîne.** Câbles de survoltage du véhicule à une deuxième batterie, moteur au ralenti le temps de la charge, puis la batterie rentre à l'intérieur et c'est elle qui fournit. On répète. Sur un onduleur, tout ce qui éclaire, communique ou pompe passe : lampes, radio, cellulaire, pompe de puisard, ventilateur de poêle. **Tout ce qui chauffe ne passe pas** — plinthe, bouilloire, grille-pain, fer. Un élément chauffant vide une batterie de char en quelques minutes, parce que la chaleur est ce que l'électricité fait de plus cher (ch. 18, ch. 4)."),
 LI("**Deux batteries de char montées en série font 24 V, et 24 V tirent un arc.** C'est la soudure quand il n'y a plus de soudeuse : positif de la première au négatif de la seconde, la masse mordue solide et propre sur la pièce, une baguette enrobée ou une tige d'acier doux comme électrode. Des points courts, parce que les câbles et les batteries chauffent vite, et une pause entre les points. Un verre de soudeur ou une visière teintée, jamais l'œil nu : l'arc brûle la cornée en quelques secondes et la brûlure ne se sent que des heures plus tard, en pleine nuit (ch. 84, ch. 88)."),
 LI("**Le congélateur devient une glacière** dès qu'il y a de la neige dehors : des chaudières de neige tassée dedans, couvercle fermé, et on cesse de l'ouvrir. Il travaille alors comme un caveau, pas comme un appareil (ch. 68, ch. 69)."),
]

def src(name, blocks): return f'<div class="src" data-flow="{name}">' + "".join(blocks) + '</div>'

def lieu(active):
    opts = ["Maison", "Chalet", "Les deux"]
    s = '<div class="lieu"><span class="lab">Lieu</span>'
    for o in opts:
        s += f'<span class="o{" on" if o == active else ""}">{o}</span>'
    return s + '</div>'

def rh(folio, side, outer, inner, urg=False, opening=False):
    cls = f"rh {side}" + (" urg" if urg else "") + (" opening" if opening else "")
    if opening:
        return f'<header class="{cls}"><span class="fo">{folio}</span></header>'
    if side == "verso":
        return f'<header class="{cls}"><span class="fo">{folio}</span><span class="ou">{md(outer)}</span><span class="in">{md(inner)}</span></header>'
    return f'<header class="{cls}"><span class="in">{md(inner)}</span><span class="ou">{md(outer)}</span><span class="fo">{folio}</span></header>'

def tabs(*kinds): return "".join(f'<div class="tab {k}"></div>' for k in kinds)

somm = [(1,"En une ligne",67),(2,"Quand l’utiliser",67),(3,"Pourquoi ça marche",68),(4,"Matériel",70),(5,"Procédure",71),(6,"Points de contrôle",74),(7,"Signes d’échec",75),(8,"Danger",76),(9,"Variante d’urgence",77)]
somm_html = '<ol class="somm">' + "".join(f'<li class="{"s9" if n==9 else ("s8" if n==8 else "")}"><span class="n">{n}</span><span class="t">{t}</span><span class="d"></span><span class="p">{p}</span></li>' for n,t,p in somm) + '</ol>'

CH = "65 · Fumage à froid"
pages = []

# p. 67 — ouverture
pages.append(f'''<section class="page recto" id="p67" data-folio="67">
{rh(67,"recto","","",opening=True)}
<div class="frame">
 <div class="ouv">
  <div class="tomeline"><span>Tome IV</span><span class="sep">·</span><span>Conserver et réparer</span></div>
  <div class="titre"><div class="num">65</div><div class="tt"><div class="kick">Chapitre soixante-cinq</div><h1>Fumage à froid</h1></div></div>
  <div class="ouvbar">{lieu("Chalet")}{somm_html}</div>
 </div>
 {SEC(1,"En une ligne","one")}
 <p class="uneligne">{md("Le fumage à froid traite une pièce **déjà salée** avec de la fumée à une température qui ne provoque pas de coagulation des protéines : il assèche et assainit la surface, freine le rancissement et donne le goût, mais il ne conserve rien par lui-même — ce qui en sort reste une pièce crue, qui se garde à 4 °C ou moins et au plus 14 jours pour du poisson fumé réfrigéré, ou à -18 °C ou moins.")}</p>
 <div class="cols2 fill"><div class="col" data-slot="ouv"></div><div class="col" data-slot="ouv"></div></div>
</div></section>''')

# p. 70 — Matériel
pages.append(f'''<section class="page verso" id="p70" data-folio="70">
{rh(70,"verso",CH,"4 · Matériel")}
<div class="frame">
 {SEC(4,"Matériel","span")}
 {mat_table}
</div></section>''')

# p. 71 — Procédure
pages.append(f'''<section class="page recto" id="p71" data-folio="71">
{rh(71,"recto",CH,"4 · Matériel — 5 · Procédure")}
<div class="frame">
 <div class="cols2 fill"><div class="col" data-slot="proc"></div><div class="col" data-slot="proc"></div></div>
</div></section>''')

# p. 76 — fin §7 + Danger
pages.append(f'''<section class="page verso" id="p76" data-folio="76">
{tabs("danger")}
{rh(76,"verso",CH,"7 · Signes d’échec — 8 · Danger")}
<div class="frame">
 <div class="suite">7 · Signes d’échec <em>(suite)</em></div>
 {echec_table}
 <div class="danger fillbox">
  <div class="dh"><span class="w">Danger</span><span class="s">{md("cinq mécanismes qui tuent, et aucun ne s'annonce")}</span></div>
  <div class="cols2 dg fill"><div class="col" data-slot="danger"></div><div class="col" data-slot="danger"></div></div>
  <div class="dsuite">suite au recto&nbsp;›</div>
 </div>
</div></section>''')

# p. 77 — suite danger + §9
pages.append(f'''<section class="page recto" id="p77" data-folio="77">
{tabs("danger","urg")}
{rh(77,"recto",CH,"8 · Danger — 9 · Variante d’urgence")}
<div class="frame">
 <div class="danger cont">
  <div class="dh"><span class="w">Danger</span><span class="s">(suite)</span></div>
  <div class="dgb" data-slot="danger" data-take="all"></div>
 </div>
 <div class="urgband"><span class="n">9</span><span class="t">Variante d’urgence</span><span class="s">sans électricité, sans matériel acheté, sans personne à appeler</span></div>
 <div class="cols2 fill"><div class="col" data-slot="urg"></div><div class="col" data-slot="urg"></div></div>
</div></section>''')

# p. 78 — §9 suite
pages.append(f'''<section class="page verso" id="p78" data-folio="78">
{tabs("urg")}
{rh(78,"verso",CH,"**9 · Variante d’urgence**",urg=True)}
<div class="frame">
 <div class="cols2 fill"><div class="col" data-slot="urg"></div><div class="col" data-slot="urg"></div></div>
</div></section>''')

# p. 79 — planche
pages.append(f'''<section class="page recto" id="p79" data-folio="79">
{tabs("urg")}
{rh(79,"recto",CH,"**9 · Variante d’urgence** — planche 65-01",urg=True)}
<div class="frame planche"><img src="../../../images/planche-65-01-fumoir-froid.svg" alt="Planche 65-01, le fumoir à froid"></div>
</section>''')

# p. 5 — chapitre principal, tome I
rows = ""
for lead, expl, ref, dang in cp_points:
    rows += f'<div class="cpr{" dang" if dang else ""}"><div class="cpt"><strong>{md(lead)}</strong> {md(expl)}</div><div class="cpref"><span class="ch">ch.</span> {md(ref)}</div></div>'
pages.append(f'''<section class="page recto cp" id="p5" data-folio="5">
{tabs("principal")}
{rh(5,"recto","Le chapitre principal","Ce qui arrive vraiment — bloc 1 sur 11")}
<div class="frame">
 <div class="cphead">
  <div class="cpnum">1</div>
  <div class="cptit"><h1>Le courant tombe</h1>{lieu("Maison")}
  <p class="cpfact">{md("436 minutes d'interruption par client en 2024, 238 sans les journées d'événements majeurs. L'écart entre les deux chiffres, c'est exactement la panne pour laquelle ce livre existe.")}</p></div>
 </div>
 <div class="cprows">{rows}</div>
 <div class="cpchalet"><span class="lab">Au chalet</span><span>{md("Hors réseau, le chalet ne subit pas cette panne-là. Il subit celle du propane et celle du 12 V.")}</span><span class="cpref"><span class="ch">ch.</span> 14 · 18</span></div>
 <div class="urgband sr"><span class="t">Sans rien</span><span class="s">le courant, sans génératrice</span></div>
 <div class="cols2 fill"><div class="col" data-slot="sr"></div><div class="col" data-slot="sr"></div></div>
</div></section>''')

CSS = (pathlib.Path(__file__).parent / "int.css").read_text(encoding="utf-8")
JS = (pathlib.Path(__file__).parent / "int.js").read_text(encoding="utf-8")

doc = f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Grand Livre du Chalet — intérieur, direction 4 : l’almanach refait</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Vollkorn+SC:wght@400;600;700;900&display=block" rel="stylesheet">
<style>
/* Vollkorn en instances statiques (Fontsource) : le PDF incorpore de vraies polices, pas du Type 3 */
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:400;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-400-normal.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:400;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-ext-400-normal.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF}}
@font-face{{font-family:'Vollkorn';font-style:italic;font-weight:400;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-400-italic.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD}}
@font-face{{font-family:'Vollkorn';font-style:italic;font-weight:400;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-ext-400-italic.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:600;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-600-normal.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:600;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-ext-600-normal.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:700;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-700-normal.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:700;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-ext-700-normal.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF}}
@font-face{{font-family:'Vollkorn';font-style:italic;font-weight:700;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-700-italic.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD}}
@font-face{{font-family:'Vollkorn';font-style:italic;font-weight:700;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-ext-700-italic.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:800;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-800-normal.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:800;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-ext-800-normal.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:900;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-900-normal.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD}}
@font-face{{font-family:'Vollkorn';font-style:normal;font-weight:900;font-display:block;src:url(https://cdn.jsdelivr.net/npm/@fontsource/vollkorn@5/files/vollkorn-latin-ext-900-normal.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF}}
</style>
<style>
{CSS}
</style>
</head>
<body>
<!--
  Direction 4 — l'almanach, refait aujourd'hui.
  Page PDF : 8,125 x 10,25 po (8 x 10 rogné + 0,125 po de fond perdu en tête, en pied et au petit fond ; aucun fond perdu au grand fond).
  Empagement : 7 x 8,5 po, identique à la zone utile des planches. Tête et pied 0,75 po ; grand fond 0,5625 po ; petit fond 0,4375 po.
  Deux colonnes de 3,375 po, gouttière 0,25 po. Corps Vollkorn 9,75/12,75 pt : 48 lignes par colonne.
  Le texte est versé par le script en bas de page (flux par mots, césure du navigateur en français).
  Aperçus : ?contact (planche contact des doubles pages), ?page=78 (une page rognée).
-->
{"".join(pages)}
{src("ouv", ouv_flow)}{src("proc", [mat_after if x=="@MATAFTER@" else x for x in proc_flow])}{src("danger", danger_flow)}{src("urg", urg_flow)}{src("sr", cp_sansrien)}
<script>
{JS}
</script>
</body>
</html>'''
OUT.write_text(doc, encoding="utf-8")
print("ok", len(doc))
