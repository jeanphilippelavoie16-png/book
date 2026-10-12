> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 53. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 53 : Truite et omble au lac

- **Tome :** 3 — Prélever
- **Fichier :** `chapitres/53-truite-et-omble-au-lac.md`
- **Rôle :** 2 — Rédacteur
- **Date :** 2026-09-20
- **Longueur :** environ 4 300 mots utiles (5 792 mots bruts, syntaxe de tableau incluse)
- **État :** premier jet complet, prêt pour les rôles 3 (vérification technique) et
  4 (vérification sécurité)
- **Relecture humaine externe :** **non obligatoire** selon `CLAUDE.md`, mais deux paragraphes
  en relèvent par héritage — voir la section 6

---

## 1. Chiffres marqués [À VÉRIFIER]

| # | Valeur | Où | Pourquoi ce n'est pas réglé |
| --- | --- | --- | --- |
| 1 | **Teneur en lipides de l'omble de fontaine et du touladi**, en g par 100 g | §3 | Aucune valeur officielle obtenue. Le Fichier canadien sur les éléments nutritifs de Santé Canada n'est pas interrogeable (même constat qu'aux ch. 24 et 41) et l'USDA FoodData Central a répondu **HTTP 429 — Too Many Requests** le 2026-09-20, avec un `Retry-After` de plus de trois heures. **Conséquence assumée :** le chapitre ne promet aucune valeur énergétique et maintient la règle du mal de caribou. C'est le trou le plus utile à combler : il décide si une prise de truites compte comme source de gras ou seulement comme protéine |
| 2 | **Paramètres de congélation contre les parasites** du poisson mangé cru, mariné ou fumé à froid | §5-C, §10 | **Aucun chiffre n'est écrit dans le chapitre**, volontairement. Le couple très répandu « -20 °C pendant 7 jours » circule partout, il est probablement juste, et il n'a été retrouvé sur **aucune** page officielle le 2026-09-20 : les deux adresses de l'ACIA essayées répondent **HTTP 410 — Gone**. Priorité 1 du vérificateur technique, parce que c'est structurant pour les ch. 65 et 72 : la cuisson tue les parasites (Québec.ca), le fumage à froid ne cuit pas |
| 3 | **Ratio de glace par kilogramme de poisson** dans une glacière | §4 | Aucune source. Le chapitre donne le critère observable à la place — « enrobé et non posé dessus » — et la cible de température, qui est mesurable. À laisser tel quel si rien ne sort |
| 4 | **Profondeur de l'eau froide en été** dans un lac boréal | §5-B étape 6 | Aucune valeur générale n'est donnée ni cherchée : ça dépend du lac, de sa profondeur et de son année. Le chapitre renvoie au carnet. **Ne pas "compléter" ce trou** avec une profondeur de thermocline tirée d'un ouvrage de limnologie : le lecteur pêche un lac, pas une moyenne |
| 5 | **Mercure de l'omble de fontaine des lacs de la Côte-Nord** | §5-A | La mention « sans restriction » de Québec.ca est provinciale et porte sur l'espèce, pas sur un plan d'eau. Aucune donnée par lac n'existe au dossier. Le chapitre écrit la nuance explicitement |
| 6 | **Statut au mercure** de l'omble chevalier et de la truite arc-en-ciel, et **masse** de la truite arc-en-ciel | §5-A, tableau | Absents des fiches d'espèces consultées. Cases marquées, pas remplies |
| 7 | **Rendement en filets** en pourcentage de la masse entière | §5-B étape 14, §10 | **Aucun pourcentage n'est imprimé**, conformément à la section 5-E du ch. 43. Le carnet du chalet le construira en trois saisons. Si le vérificateur trouve une source officielle, elle vaudrait une ligne au ch. 70, pas ici |
| 8 | **Durée de conservation du poisson frais**, en jours au réfrigérateur et en mois au congélateur | §5-B étape 15, §10 | La page « Durée de conservation » de Québec.ca renvoie à un outil externe (**Thermoguide+**) qui n'a pas été capté le 2026-09-20. Le chapitre n'écrit donc **aucune durée** et contrôle par la température seule. Une capture du Thermoguide+ réglerait ce trou pour plusieurs chapitres du tome 4 d'un coup |

**Aucun autre chiffre du chapitre n'est sans source.** Les valeurs 70 °C, 74 °C, 82 °C, 0 à 4 °C,
-18 °C, zone de danger 4 à 60 °C, seuil de 3 °C du poisson fumé, 15 secondes hors de l'eau,
2 repas par mois, 230 g par repas, 29 zones, mise à jour aux deux ans, 1er avril 2017, 94 % des
plaisanciers noyés en eau sous 20 °C, 600 à 1 000 %, 35 °C d'hypothermie, 69 % de noyades sans
adulte à proximité, et toutes les tailles et masses d'espèces portent leur organisme entre
parenthèses dans le texte et leur extrait intégral dans `/sources`.

## 2. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau | Reprise ici |
| --- | --- |
| **Botulisme de type E : produit sa toxine dès 3 °C, donc au frigo** | §3 (comme mécanisme explicatif de la vitesse de dégradation du poisson), §6 (ligne « Poisson fumé, entreposage »), §7 (ligne du lot gardé au-dessus de 3 °C), §8 point 2. Avec le mécanisme complet : souche non protéolytique, milieu sans oxygène, seuil **sous** 3 °C et non 4 °C, donc un frigo ordinaire ne suffit pas |
| **Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence** | §8 point 2, cité mot à mot d'après Santé Canada, avec la conséquence pratique : la décision se prend sur l'historique de température, jamais sur les sens |
| **Cuisson du gibier sauvage à 74 °C à cœur (MAPAQ)** | §5-A (tableau), §6, §8 fin d'encadré. Reprise **à l'envers** de son usage habituel : ce chapitre est le seul du tome à porter une constante plus basse (70 °C pour le poisson), et il écrit les deux chiffres côte à côte en expliquant que l'erreur n'est pas symétrique |
| **Trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent** | §8, fin d'encadré, en une phrase, pour empêcher qu'un lecteur applique les 70 °C du poisson à un rôti d'ours ou de castor. Renvois aux ch. 46, 48, 52 |
| **Viande maigre seule = mal de caribou, mortel en 2 à 3 semaines** | §2 (bon choix), §3 (paragraphe complet, avec la mention que le gras de la truite n'est pas mesuré au dossier), renvois ch. 24, 41, 67 |

Règles du tableau **volontairement non reprises**, avec la raison : cadmium du foie de cervidés
et tularémie du lièvre n'ont aucun point d'application sur un salmonidé ; thuyone du cèdre
appartient aux tisanes et aux plantes ; génératrice hors des bâtiments appartient aux ch. 18, 20
et 69. **Si l'éditeur ajoute au chapitre un bout sur le bois de fumage, la règle du cèdre entre
avec** — c'est le seul ajout plausible qui déclencherait une reprise.

**Règle ajoutée par ce chapitre et absente du tableau de `CLAUDE.md` :** l'immersion en eau
froide et le port du VFI. Le mécanisme 1-10-1 est déjà au ch. 3 et au ch. 20, mais il tue dans
ce chapitre-ci et il y est donc répété en entier. **Proposition au rôle 4 :** ajouter au tableau
de `CLAUDE.md` la ligne « VFI porté, jamais rangé — une fois à l'eau, on ne l'enfile plus
(Transports Canada) », avec pour portée les ch. 3, 20, 53, 54, 55, 56.

## 3. Dangers de l'encadré, avec leur mécanisme

Deux entrées seulement, plus un rappel de non-confusion. L'encadré a été tenu court exprès : un
chapitre de pêche au lac se lit en famille et l'encadré doit rester lisible d'un coup d'œil.

1. **Immersion en eau froide** — mécanisme en trois temps, cité de Transports Canada (TP 511,
   2026) : choc thermique à 1 minute (inspiration réflexe, hyperventilation de 600 à 1 000 %),
   perte de motricité à 10 minutes (impossibilité d'enfiler un VFI une fois à l'eau),
   hypothermie sous 35 °C vers 1 heure. Conduite : ne pas nager pour se réchauffer, sortir du
   corps de l'eau, position fœtale ou caucus.
   **Sous-mécanisme enfants :** noyade = première cause de mortalité par traumatisme chez les
   1 à 4 ans, et absence d'adulte à proximité dans 69 % des noyades mortelles (INSPQ). La règle
   qui en découle : un adulte pêche, l'autre surveille, jamais le même.
2. **Botulisme de type E** — souche non protéolytique du milieu aquatique, milieu sans oxygène
   (sac sous vide, huile, poisson fumé emballé, ventre non vidé), croissance au-dessus de 3 °C,
   toxine indétectable par les sens.
3. **Rappel de non-confusion 70 / 74 °C**, avec la trichinellose comme conséquence de l'erreur
   dans le mauvais sens.

Écartés de l'encadré pour ne pas le diluer, et renvoyés ailleurs : mercure (traité en §5-A avec
ses chiffres, ce n'est pas un risque de mort à l'échelle d'un chalet), parasites (traités en §10,
la cuisson à 70 °C les couvre selon la source), coupures au couteau à fileter (ch. 27, ch. 82),
introduction d'espèces envahissantes par les appâts (traitée en §5-B étape 3 avec son mécanisme,
c'est un risque écologique majeur mais pas une intoxication), glace en formation (ch. 54).

## 4. Images requises

| # | Description | Cadrage | Format |
| --- | --- | --- | --- |
| 1 | Planche comparative des quatre salmonidés : omble de fontaine, touladi, omble chevalier, truite arc-en-ciel, de profil, à la même échelle, avec les caractères qui les séparent annotés au trait — marbrures du dos, ponctuations, découpe de la caudale, position des nageoires. Nom français et nom latin sous chaque poisson | Vue latérale stricte, fond neutre, règle graduée en centimètres dans le cadre. Planche redessinée au trait plutôt qu'une photo : les couleurs d'un omble varient trop d'un lac à l'autre pour servir de clé | Pleine page |
| 2 | Séquence du traitement au bord de l'eau en quatre vignettes : coup sur la tête, section de l'arc branchial et saignée, ouverture du cloaque aux branchies, ligne de sang grattée le long de l'arête | Photos de JP, plan serré, mains visibles, planche claire. Le geste, pas le poisson | Demi-page |
| 3 | Le filet **avec la peau laissée** à côté d'un filet nu, avec la légende de la règle d'identification au transport | Deux filets côte à côte sur planche, vue de dessus, plan serré | Quart de page |
| 4 | Glacière ouverte, poissons **enrobés** de glace sur le flanc, bouchon de vidange ouvert visible, thermomètre d'ambiance lisible dans le cadre | Photo de JP, vue plongeante depuis le dessus de la glacière | Quart de page |
| 5 | Schéma du principe **1-10-1** : trois blocs en bande, une minute, dix minutes, une heure, avec ce que le corps fait à chaque phase et ce qu'on fait en retour. Aucune photo de noyade | Bande horizontale sur toute la largeur, typographie forte, pas d'illustration réaliste | Demi-page |
| 6 | Thermomètre à sonde dans l'épaisseur d'un filet en cuisson, affichage **70 °C** lisible | Photo, macro sur l'afficheur, sonde visible dans la partie la plus épaisse | Quart de page |
| 7 | Le vivier de fortune de la variante d'urgence : panier ou chaudière percée immergée dans un courant froid, à l'ombre, attaché à la berge | Photo de JP, plan large montrant le contexte (courant, ombre), pas seulement l'objet | Quart de page |

Aucune image de la section 8. L'encadré DANGER se lit, il ne s'illustre pas — sauf l'image 5,
qui est un schéma de mécanisme et qui doit être **placée ailleurs que dans l'encadré**, de
préférence en §3 ou en vis-à-vis de la §8.

**Licences :** les planches 1 et 5 sont à produire. Pour la planche 1, sources acceptables si on
n'illustre pas soi-même : iNaturalist filtré par licence, planches ichtyologiques du domaine
public d'avant 1930, agences fédérales américaines. Les photos 2, 3, 4, 6 et 7 sont des photos
de JP à faire au chalet : c'est la solution la plus propre et la moins coûteuse en licences.

## 5. Renvois vers d'autres chapitres

| Chapitre | Raison |
| --- | --- |
| 3 — Le froid lui-même | Immersion, hypothermie, 1-10-1 |
| 7 — Des enfants de 4 et 6 ans | Surveillance près de l'eau, VFI de taille enfant |
| 8 — Le stock permanent du chalet | Le poisson frais épargne le stock |
| 13 — Eau : puiser, filtrer, désinfecter | Eau de rinçage de la cavité et des mains |
| 20 — Se déplacer et le carburant | Embarcation, équipement de sécurité exigé |
| 24 — Le mal de caribou | Chair maigre seule, gras non mesuré chez la truite |
| 34 — Calendrier annuel de prélèvement | Où tombe la pêche au lac dans l'année |
| 35 — Lire le territoire autour du chalet | Trouver l'eau froide et les arrivées de ruisseau |
| 41 — Abats et organes | Foie et rogue de poisson |
| 43 — Comment lire une fiche d'espèce | Les douze champs, le socle chiffré, la variante « poisson » |
| 54 — Pêche blanche | Glace, appâts morts permis l'hiver dans certaines eaux |
| 55 — Éperlan et poisson du fleuve | Eaux à marée, autorité fédérale |
| 56 — Nasses, filets, verveux | Engins autres que la ligne |
| 66 — Fumage à chaud et séchage | Transformation immédiate du surplus |
| 67 — Pemmican et graisses | Source de gras venue d'ailleurs |
| 69 — Un congélateur plein qui dégèle | Rupture de chaîne de froid |
| 70 — Traiter le poisson à la sortie de l'eau | Le chapitre-frère : ce chapitre-ci s'arrête où celui-là commence |
| 71 — Saler et sécher la truite | Destination « sel » |
| 72 — Fumer le poisson | Destination « fumoir », botulisme de type E |
| 73 — Conserves et marinades | Destination « pot » |
| 82 — Affûter, limer, aiguiser | Couteau à fileter |
| 85 — Le stock de pièces et de consommables | Deuxième thermomètre, hameçons, ligne |

Les 22 numéros ont été vérifiés contre la liste des 89 chapitres. Aucun renvoi vers un chapitre
inexistant.

**Frontière à tenir avec le ch. 70, à surveiller au montage :** le chapitre 53 décrit le
traitement au bord de l'eau **en tant que décision de pêche** (tuer, saigner, vider, laisser la
peau, mettre au froid) ; le chapitre 70 doit décrire le **traitement complet** (levée des
filets, désarêtage, portions, emballage). Si le rédacteur du ch. 70 recopie les étapes 9 à 13,
c'est le ch. 53 qui doit maigrir, pas le ch. 70.

## 6. Relecteur humain requis

Le chapitre 53 **ne figure pas** dans la liste de relecture humaine obligatoire de `CLAUDE.md`.
Deux passages en relèvent pourtant par héritage, et la fiche le signale plutôt que de s'abriter
derrière la lettre de la règle :

- **Le point 2 de l'encadré DANGER (botulisme de type E)** reprend le fond du ch. 72 — Fumer le
  poisson, qui est à relecture obligatoire. Le même relecteur doit voir ce paragraphe :
  **inspecteur ou technologue en salubrité des aliments**. Ce qu'on lui demande précisément :
  la formulation du seuil de 3 °C contre 4 °C, et la phrase « un frigo ordinaire à 4 °C n'est pas
  un frigo à poisson fumé ».
- **La variante d'urgence (§9)** conduit au ch. 71 — Saler et sécher la truite, également à
  relecture obligatoire. Ce qu'on demande au même relecteur : que « transformer le surplus le
  jour même » ne soit pas lu comme une autorisation d'improviser un fumage à froid.

Un troisième avis serait utile mais n'est pas requis : **un agent de protection de la faune ou
un biologiste des pêches** pour la §5-A et la §5-B, en particulier sur la règle d'identification
au transport et sur la garde du poisson vivant dans un vivier de fortune (§9), dont la légalité
n'a pas pu être vérifiée à une source et que le chapitre renvoie prudemment à la brochure.

## 7. Notes pour l'éditeur

- **Correction à faire au chapitre 43.** Sa section 5-H et sa source
  `43-sante-canada-mercure-poisson.md` affirment que le guide québécois de consommation du
  poisson de pêche sportive en eau douce est introuvable et que le champ « contaminants » des
  fiches 53 à 55 doit rester `[À VÉRIFIER]`. **La page a été retrouvée le 2026-09-20** sous
  `/sante/alimentation/saines-habitudes-alimentaires/consommation-de-poisson-et-sante/recommandations`,
  avec le touladi à 2 repas par mois et le repas défini à 230 g avant cuisson. Le chapitre 53 s'en
  sert. Tant que le ch. 43 n'est pas corrigé, deux chapitres du même tome se contredisent.
- **Deux adresses citées ailleurs dans le livre sont mortes.** `/peche-sportive/pecher-facon-responsable`
  (citée au dossier du ch. 34) et `/peche-sportive/zones-peche` répondent 404 ; les pages ont
  migré. Les adresses vivantes sont dans `sources/53-quebec-zones-de-peche.md` et
  `sources/53-quebec-techniques-peche-responsable.md`.
- **Ne pas fusionner les deux points de l'encadré DANGER.** L'eau froide tue avant la pêche, le
  botulisme tue après ; les confondre donnerait un encadré sur « la pêche, c'est dangereux »,
  qui ne fait changer aucun comportement.
- **Garder le rappel 70 / 74 °C en fin d'encadré, et pas ailleurs.** C'est le seul chapitre du
  tome 3 où la constante de cuisson descend, et c'est exactement là qu'un lecteur mémorise le
  mauvais chiffre.
- **La §5-A et la planche 1 doivent tomber sur la même double page.** L'identification et le
  tableau de mercure se lisent ensemble : c'est la même décision, garder ou remettre.
- Aucune date de saison, aucune limite de prises, aucune taille légale, aucun prix de permis dans
  le chapitre. L'interdiction des poissons appâts vivants depuis le 1er avril 2017 y est, parce
  que c'est une interdiction permanente à l'échelle de la province et non une donnée d'année ;
  elle porte sa source et le renvoi à la brochure reste.
- Aucun pourcentage de sel, aucune quantité de salpêtre. Les deux sont nommés en §5-C comme
  appartenant aux ch. 62, 64 et 71, le salpêtre avec sa forme moderne équivalente (sel nitrité de
  salaison) et la mention qu'ils ne se dosent pas pareil.
- Noms latins présents : *Salvelinus fontinalis*, *Salvelinus namaycush*, *Salvelinus alpinus*,
  *Oncorhynchus mykiss*, *Clostridium botulinum*.
- **Nom d'usage à uniformiser pour tout le tome :** le livre écrit « omble de fontaine » et donne
  « truite mouchetée » comme nom d'usage ; Québec.ca appelle le touladi « truite grise » sur sa
  page santé et « touladi » sur sa fiche d'espèce. Le glossaire doit trancher et les deux noms
  doivent apparaître partout où l'un des deux est utilisé, sinon un lecteur cherchera « truite
  grise » dans l'index et ne trouvera rien.

## 8. Ce qui reste faible

- **Le gras.** C'est la lacune la plus gênante. Le livre passe deux tomes à expliquer que la
  chair maigre seule tue, il nomme la truite comme poisson gras d'après une page de santé
  publique, et il est incapable de dire combien. Tant que ce chiffre manque, la §3 tient un
  raisonnement complet sur une valeur absente.
- **La congélation contre les parasites.** Le chapitre s'en sort en ne l'écrivant pas, mais le
  lecteur qui veut fumer sa truite à froid ira chercher la réponse ailleurs, et « ailleurs »
  c'est un forum. C'est le pire trou du dossier en matière de conséquence.
- **La pêche à la ouananiche** n'est pas traitée : aucune fiche d'espèce officielle trouvée
  (404 sur le répertoire de Québec.ca). Le chapitre n'en dit rien plutôt que d'en dire n'importe
  quoi, mais un lecteur de la Côte-Nord peut en prendre une.
- **Les durées de conservation du poisson frais en jours** n'existent nulle part dans le
  chapitre, parce qu'elles n'existent pas sur les pages de Québec.ca consultées : la page des
  durées renvoie à un outil externe (« Thermoguide+ ») qui n'a pas été capté. Tout le contrôle
  repose donc sur la température. C'est défendable et c'est cohérent avec le ch. 41, mais un
  lecteur cherchera « combien de jours » et ne trouvera pas. Une capture du Thermoguide+
  réglerait ça pour plusieurs chapitres du tome 4 d'un coup.
- **Le lavage des embarcations** entre deux plans d'eau n'a pas de source : la page « Techniques
  de pêche responsables » n'en parle pas dans le contenu capté, et la page des espèces exotiques
  envahissantes de Québec.ca répond 404 à l'adresse essayée. Le chapitre ne dit donc rien
  au-delà du mécanisme porté par la page des appâts. Pour un chalet qui pêche plusieurs lacs,
  c'est une vraie lacune.

## Notes retirées du chapitre — 23 septembre 2026

- §5-A, sous le tableau des quatre salmonidés : « Toutes les valeurs du tableau viennent des
  fiches d'espèces et des recommandations de consommation de poisson. »
- §5-A, après la liste des cinq espèces d'eau douce visées pour le mercure (doré, brochet,
  touladi, achigan, maskinongé — toutes des prédateurs de grande taille) : « la page ne l'écrit
  pas comme un mécanisme, c'est une observation du livre, pas une citation. »

## Passe « pas de code légal, signes expliqués » — 23 septembre 2026

**Retiré du chapitre (règles de pêche, compétence, permis) :**

- §2, mauvais choix : « Le fleuve ne relève pas de la même autorité que le lac » → remplacé par
  « le fleuve, c'est le ch. 55 ».
- §3 : « ne vient donc pas du quota, qui est un plafond légal, mais » (la règle de prélèvement
  par observation du lac reste).
- §4 : la ligne « Brochure des règles de la zone, de l'année en cours ».
- §5-B : l'ancienne étape 1 « Sortir la brochure de la zone » en entier (engins et appâts permis,
  quota collectif « en vertu de votre permis »). Les étapes suivantes sont renumérotées 1 à 13.
- §5-B, poisson appât : « Le mécanisme vaut plus que l'interdiction » (le mécanisme reste).
- §5-B, peau : l'obligation de transport « en laissant sur la chair suffisamment de peau pour
  l'identifier ». La raison réelle reste : la peau dit l'espèce, donc la limite de mercure.
- §5-C : les lignes « Périodes de pêche, limites de prises, limites de possession, tailles
  légales » et « Les eaux où les appâts morts sont permis l'hiver ».
- §6 : « et compte au quota ».
- §9-A : « Ce que la zone permet comme engin se vérifie dans la brochure » et « Ce que la
  brochure permet comme garde de poisson vivant, et le moment où une prise est réputée gardée ».

**Note de bas de page ajoutée :**

- [^1] §7, « traces de gel puis de dégel » : givre ou cristaux de glace = entreposage long ou
  dégel suivi d'un regel ; poisson congelé qui plie = en train de dégeler. Source :
  `sources/53-fda-poisson-congele-givre-cristaux.md` (FDA, « Selecting and Serving Fresh and
  Frozen Seafood Safely », consultée le 2026-09-23). Aucune page canadienne trouvée qui décrit
  ce signe.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/53-verifications.md`, appliqués au chapitre. Une ligne par
chiffre changé ou confirmé.

- §3, lipides de l'omble de fontaine cru : **2,7 g pour 100 g**, 21 g de protéines (valeur
  source : 2,73 g et 21,23 g). `sources/53-cnf-omble-de-fontaine-lipides.md`
  (+ `53-cnf-truites-omble-nutriments.json`). Touladi : aucune valeur au 100 g, dit sans chiffre.
- §3, mal de caribou : « mortel en deux à trois semaines » devient « mortel en quelques
  semaines » (décision prise ; aucun délai trouvé à la source, voir la note D de la fiche).
- §4, Matériel, glace : **1 kg pour 2 kg de poisson**, **1 pour 1** par temps chaud.
  `sources/53-fao-glace-et-poisson-rapport.md`.
- §5-A, masse de la truite arc-en-ciel : introuvable, case mise à « — ».
  `sources/53-quebec-fiches-especes-salmonides.md`.
- §5-A, mercure, omble chevalier : « Non nommé » ; truite arc-en-ciel : sans restriction, sous
  « les autres truites ». `sources/53-quebec-consommation-poisson-recommandations.md`,
  `sources/53-melccfp-guide-consommation-poisson-eau-douce.md`.
- §5-A, « Ce que le tableau dit » : recommandations par plan d'eau pour **près de 1 400 sites** ;
  sans recommandation propre au lac, **8 repas d'omble de fontaine par mois**.
  `sources/53-melccfp-guide-consommation-poisson-eau-douce.md`.
- §5-B, étape 4, profondeur des ombles l'été : introuvable, dit sans chiffre.
  `sources/53-quebec-fiches-especes-salmonides.md`.
- §5-B, étape 12, frigo à 4 °C : **1 à 2 jours** cru, **5 à 7 jours** cuit ; -18 °C : salubre
  sans limite de durée. `sources/53-mapaq-thermoguideplus-poissons.md`
  (+ `53-mapaq-thermoguideplus-aliments.json`).
- §5-B, étape 12, gel contre les parasites : **-20 °C / 7 jours** ou **-35 °C / 15 heures** ;
  sous **70 °C** à cœur, le poisson compte comme cru. Ligne retirée du tableau 5-C.
  `sources/53-quebec-poisson-cru-congelation-parasites.md`.
- §9-B, glacière enterrée : blocs **serrés**, pas de bran de scie entre les rangs, **30 cm** de
  bran dessous, autour et dessus (**60 cm** de foin ou de paille) ; le tas passe l'été, perte
  jusqu'à **30 %**, en empiler la moitié de plus. `sources/53-glaciere-bran-de-scie-bulletins-agricoles.md`.
- §9-D, salinité du fleuve : **27 à 29 g de sels par litre** (Pointe-au-Père, golfe).
  `sources/13-universite-laval-salinite-saint-laurent.md`.

## Corrections croisées — 24 septembre 2026

Alignement sur le ch. 54 (mercure, repas par mois), notes A et B de
`suivi/verifications/53-verifications.md` :

- §2, puce « L'espèce n'est pas certaine » : « sans restriction » d'un côté, 2 repas de l'autre →
  **8 repas par mois** d'un côté, **2** de l'autre.
- §5-A, tableau, ligne Mercure : omble de fontaine « Liste sans restriction » → **8 repas par
  mois** ; truite arc-en-ciel « Sans restriction, sous les autres truites » → **8 repas par mois**,
  sous « les autres truites ». Le guide de l'Environnement, auquel la page santé renvoie, met
  « Omble de fontaine » et « Autres truites (sauf le touladi) » à 8 repas par mois sans avis
  propre au lac ; la page santé les range « sans restriction ». Le livre prend le chiffre le plus
  prudent.
- §5-A, « Ce que le tableau dit » : le touladi n'est plus « le seul à porter une restriction »
  mais « le plus restreint des quatre » ; ajout « le mois compte toutes les espèces ensemble »
  (« la limite de consommation mensuelle doit tenir compte de toutes les espèces consommées ») ;
  « les cinq espèces visées pour le mercure » → « les cinq espèces à 2 repas par mois » ; la phrase
  « sans restriction à l'échelle de la province » devient « ces paliers valent pour un lac sans avis
  propre » ; la dernière phrase (8 repas d'omble sans recommandation) est fondue dans la précédente.
- §5-A, « Pour les enfants » — **corrigé** : « personne ne fait ce choix pour lui… décision de
  famille, pas une donnée » était incomplet. Le guide : les espèces à 2 repas par mois se mangent
  « de manière occasionnelle seulement » chez les jeunes enfants, qui préfèrent les espèces à 4 et
  8 repas. Pas de chiffre, mais une consigne ; la conclusion (omble aux enfants, touladi aux
  adultes) ne change pas.
- `sources/53-melccfp-guide-consommation-poisson-eau-douce.md` ;
  `sources/53-quebec-consommation-poisson-recommandations.md`.

## Ajout — la foène (§9-A) — 24 septembre 2026

Bloc ajouté dans §9-A, entre « Les leurres » et « Le vivier » : **La foène**, **Faire la
foène**, **Où et quand frapper**, **Viser sous le poisson**, **La foène d'hiver**, **Ce qui la
rend sûre, et ce qui la rend dangereuse**. Environ 1 000 mots. Demandé au plan de match (« Ch. 53
(ou 56) — la foène à poisson »). Le 53 plutôt que le 56 : le 56 est le chapitre des engins
passifs, qui pêchent seuls ; la foène est un geste, comme la perche et la ligne à main du même
§9-A. Toutes les sources sont dans `sources/53-foene-nigog-sources.md` (extraits) et les pages
`sources/53-foene-*.html`.

| Fait ou chiffre | Où | Source |
| --- | --- | --- |
| Pointe au milieu, deux bâtons courbes presque joints au bout de la pointe ; ils cèdent au coup et se referment seuls | La foène | Le Jeune 1634 (Montagnais), via Musées numériques Canada ; Tipatshimuna (aînés innus) |
| Le harpon simple perd le poisson quand il n'accroche pas d'os | La foène | Denys 1672 |
| Nigog : mot d'origine mi'kmaq | La foène | Musées numériques Canada ; Répertoire du patrimoine culturel du Québec |
| Manche de **deux ou trois doigts** d'épais | Faire la foène | Le Jeune 1634 |
| Bout du manche refendu, pointe de métal logée au milieu de la fente ; bois, métal, ficelle, babiche ; ligne de peau | Faire la foène | Tipatshimuna, fiche « harpon à mâchoires » |
| Mâchoires à dent (barbe) qui empêchent le poisson de glisser | Faire la foène | Institut culturel Avataq (kakivak) |
| Tête de fer fin XIXe : **25 cm** de mâchoires, **8 cm** de large, aiguille de fer au milieu | Faire la foène | Répertoire du patrimoine culturel du Québec, « Harpon à anguille » |
| Eau peu profonde seulement | Où et quand | Dalhousie/UINR ; Musées numériques Canada |
| La nuit, flambeau d'écorce de bouleau à la pince du canot ; la lumière attire saumon et truite, qui tournent autour du canot et montent | Où et quand | Denys 1672 ; Tipatshimuna ; Répertoire du patrimoine culturel ; Montpetit 1867 via Musées numériques Canada |
| Deux personnes : l'une à l'arrière à l'aviron, l'autre debout à la proue | Où et quand ; Ce qui la rend sûre | Montpetit 1867 via Musées numériques Canada ; MDC (deux personnes, plateforme stable) |
| Fosses de rivière où le poisson se repose entre deux chutes | Où et quand | Denys 1672 |
| Le jour, si l'eau est calme et sans reflet ; on choisit la taille quand on voit | Où et quand | Dalhousie/UINR |
| Avancer lentement sans traîner les pieds : les vibrations alertent le poisson | Où et quand | MDC |
| Le poisson paraît moins creux qu'il n'est ; viser dessous, d'autant plus bas qu'il est creux ; s'exercer sur pierres et feuilles coulées | Viser | MDC ; Science Learning Hub ; HyperPhysics |
| À la verticale, la lumière ne change pas de direction ; plus l'angle est grand, plus la réfraction se voit | Viser | Science Learning Hub, « Refraction of light » |
| Foène d'hiver : trou d'**un demi-mètre**, foène de **3 à 5 m**, dents recourbées vers le haut, coups doux et répétés dans la vase jusqu'à couvrir le cercle, l'anguille sentie dans le manche, puis un autre trou | La foène d'hiver | Atlas des peuples autochtones du Canada (Gregg White, Mi'kmaq) |
| Sous la glace, l'anguille n'est pas visible : tout ce qui est piqué se garde | La foène d'hiver | Dalhousie/UINR |
| L'anguille qui se décroche meurt de ses blessures | Ce qui la rend dangereuse | Dalhousie/UINR |
| Glace mince près du courant = plus de portée dans la vase ; la faim pousse sur la glace | Ce qui la rend dangereuse | Atlas des peuples autochtones du Canada |
| Le coup déplace le centre d'équilibre | Ce qui la rend dangereuse | MDC (« full draw can change your center of balance ») |

**Écarts et choix.**

- **Hache retirée.** La source d'hiver perce à la hache ; le ch. 54 dit que la hache fait éclater
  la glace au lieu de la fendre. Le texte ne nomme pas l'outil et le ch. 54 garde sa règle.
- **Aucune longueur de manche pour l'eau libre** : non trouvée. « Plus longue que l'eau n'est
  creuse » à la place.
- **Aucune essence de bois pour les mâchoires** : non trouvée. « Deux bâtons qui ont déjà la
  courbe », comme dans les sources.
- **L'essai sur un paquet de mousse** vient du mécanisme décrit par Le Jeune (s'ouvrent au coup,
  se referment seules). Ce n'est pas un usage documenté. Au vérificateur technique de dire s'il
  tient.
- **« Le poisson est juste sous son image »** à la verticale : c'est la conséquence de la phrase
  du Science Learning Hub (à 90°, pas de changement de direction), pas une citation.
- **Le flambeau** : fabrication non décrite par les sources de la foène. Le texte renvoie au
  ch. 18 §9, qui a déjà la torche d'écorce et ses fragments enflammés.
- **Nom innu (uashuakanashkᵘ) et noms mi'kmaq (nikoql, natawemkewe'l)** : pas imprimés. Règle 4.2
  de `suivi/idees-savoirs-autochtones.md` : la graphie se vérifie avant d'imprimer un mot innu.
  « Nigog » suffit, c'est le mot français.
- **Truite, saumon et anguille.** Les sources innues et mi'kmaq visent surtout le saumon et
  l'anguille ; Denys nomme la truite. La foène d'hiver ne vise que l'anguille, qui relève plutôt
  du fleuve (ch. 55) et des embouchures. Elle reste ici en un paragraphe, parce que la foène d'été
  est ici.

**Rappels de sécurité.** La section 8 (eau froide, 1-10-1, VFI porté) est reprise pour le canot
de nuit, sans la réécrire. Le ch. 54 est rappelé pour la glace à courant. Aucun nouveau chiffre de
sécurité.

**Renvois ajoutés :** ch. 18 (flambeau d'écorce), ch. 54 (glace à courant), ch. 56 (engins qui ne
choisissent pas), ch. 80 (babiche mouillée), ch. 82 (limer la pointe).

**Planche possible (à valider par JP) :** voir la réponse de l'agent du 24 septembre 2026. Dans
`suivi/idees-savoirs-autochtones.md`, la planche D10 (« La foëne : deux mâchoires qui s'ouvrent
et se referment ») est encore rattachée au ch. 55. Elle passe au 53 si JP garde ce placement.

Compression §3 et §4 — 27 septembre 2026 : 1101 mots → 200 mots (§3 : 465 → 123 ; §4 : 636 → 77) ; matériel coupé : embarcation et avirons, canne et moulinet (fondus dans « ligne et hameçons »), leurres, pinces à long bec, épuisette, couteau à fileter et pierre, thermomètre d'ambiance (doublon de la sonde), balance au gramme et balance romaine improvisée, sacs ou bacs à couvercle, eau propre. §3 : coupés les citations d'habitat, le lac qui se recharge et la règle de prélèvement, le frigo à 5 °C (redit en §8), les chiffres de gras (2,7 g / 21 g) et le touladi plus gras. Rien de vital déplacé : VFI porté, type E sous 3 °C et « aucun signe visuel ne remplace le thermomètre » sont déjà en §6, §8 et §9-E ; le mortel-en-quelques-semaines de la chair maigre reste en §3 (renvoyé par §2).
