> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 55. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 55 : Éperlan et poisson du fleuve

- **Tome :** 3 — Prélever
- **Fichier :** `chapitres/55-eperlan-et-poisson-du-fleuve.md`
- **Rôle :** 2 — Rédacteur
- **Date :** 2026-09-20
- **Longueur :** environ 4 300 mots utiles (6 350 mots bruts, syntaxe de tableau incluse)
- **État :** premier jet complet, prêt pour les rôles 3 (vérification technique) et
  4 (vérification sécurité)
- **Contrainte de session :** le budget de recherche web (200 appels `WebSearch`) était **épuisé
  dès le premier appel**. Toutes les sources ont été obtenues par `WebFetch` sur des adresses
  devinées ou remontées de page en page, plus les fiches déjà au dossier. Plusieurs trous du
  chapitre sont dus à ça et sont nommés ci-dessous.

---

## 1. Chiffres marqués [À VÉRIFIER]

| # | Valeur | Où | Pourquoi ce n'est pas réglé |
| --- | --- | --- | --- |
| 1 | **25 cm de glace pour une motoneige** (Croix-Rouge) contre 12 cm (Société de sauvetage) | §6, §8 point 4 | Divergence reconduite des chapitres 7, 20 et 35. La page de la Croix-Rouge n'a **jamais** été consultée directement dans ce projet. Le livre retient la valeur la plus prudente et l'écrit. À régler une fois pour tout l'ouvrage, pas chapitre par chapitre |
| 2 | **Concentration maximale d'histamine** dans le poisson | §5-J étape 49, §10 | L'ACIA renvoie explicitement à un tableau de Santé Canada sans le reproduire. Deux adresses Santé Canada essayées le 2026-09-20 (`.../normes-canadiennes-normes-administratives-produits-chimiques-contaminants-aliments.html` et l'index `.../contaminants-chimiques.html`) répondent **404**. Le chapitre ne donne **aucune** valeur et se rabat sur le seul levier contrôlable au chalet : le délai avant le froid |
| 3 | **Effet de la cuisson sur les phycotoxines paralysantes** | §8 point 2 | Ni le manuel du PCCSM ni la page d'entrée du programme ne tranchent. Le chapitre **s'abstient et le dit dans l'encadré**. C'est la première question que va poser un lecteur : elle doit être réglée avant impression |
| 4 | **Recommandations de consommation du poisson de pêche sportive du Saint-Laurent** (mercure, BPC) | §10 | Le guide québécois reste introuvable, comme au chapitre 43. Deux adresses réessayées, 404 les deux. Le chapitre ne transpose **aucune** valeur du thon ou de l'espadon sur l'éperlan ou la morue |
| 5 | **Noms latins des treize espèces** nommées | Tout le chapitre | Aucun n'est tiré d'une page officielle consultée pour ce chapitre. Liste au point 7 ci-dessous. À confirmer un à un |
| 6 | **Durées de conservation sur glace** du poisson frais, en heures ou en jours | Absent du chapitre, signalé en §10 | Aucune source officielle trouvée. Tout le contrôle repose donc sur la température et sur les signes de la §7. Défendable, mais un lecteur cherchera « combien de temps » et ne trouvera rien |
| 7 | **Seuils de fermeture des secteurs coquilliers** : IPM ≥ 80 µg/100 g, IAM ≥ 20 µg/g, IDM ≥ 0,20 µg/g | §10 seulement | Valeurs **sourcées** (ACIA, PCCSM) mais volontairement gardées hors du corps du chapitre : ce sont des seuils de laboratoire, non mesurables au chalet. Si l'éditeur les juge inutiles même en §10, elles peuvent tomber — la consigne ne change pas |

**Tous les autres chiffres du chapitre portent leur organisme entre parenthèses dans le texte et
leur extrait intégral dans `/sources` :** -20 °C × 7 jours et -35 °C × 15 heures (MAPAQ), 3 °C
(Santé Canada), 4 °C et 14 jours (MAPAQ), 9 % de sel et a<sub>w</sub> 0,97 (réglementaires, cités
au dossier et **non transposés** en consigne domestique), 70 °C / 74 °C / 82 °C (Santé Canada),
1-10-1 et 35 °C et « 600 à 1 000 % » (Transports Canada), 10 cm et 12 cm (Société de sauvetage),
plus de 700 stations de marée (MPO).

## 2. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau | Reprise ici |
| --- | --- |
| **Botulisme de type E : produit sa toxine dès 3 °C, donc au frigo** | §2 (mauvais choix), §3, §5-F étape 31, §5-J étape 52, §6 (ligne réfrigérateur), §8 point 1. Avec le mécanisme complet en trois maillons : croissance au-dessus de 3 °C, besoin d'absence d'oxygène, toxine invisible |
| **Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence** | §7 (deux lignes du tableau), §8 point 1, en toutes lettres et avec la citation du MAPAQ sur le gravlax et sur le poisson fumé. Suivie de la consigne qui en découle : **on ne goûte jamais pour vérifier** |
| **Cuisson du gibier sauvage à 74 °C à cœur (MAPAQ)** | §5-H étapes 39 et 40, §6. Reprise **volontairement**, alors que le chapitre porte sur du poisson, parce que les deux tableaux cohabitent dans la même cuisine : poisson 70 °C, gibier 74 °C, oiseau entier 82 °C. Le chapitre dit lequel des deux sens de confusion est grave |
| **Viande maigre seule = mal de caribou, mortel en 2 à 3 semaines** | §2 (mauvais choix), §3, §5-D étape 19, §8 (note de fin d'encadré), §9. C'est l'angle propre au chapitre : la morue et l'éperlan sont des poissons **maigres**, et une famille qui vit de ça sans autre gras est exactement dans le cas du chapitre 24 |
| **Génératrice : jamais dans un bâtiment, un garage ou sous un auvent** | §9, dernier paragraphe. Reprise parce que la §5-G impose un congélateur à -20 °C en continu, ce qui, hors réseau, implique une génératrice. Avec le mécanisme : monoxyde inodore et incolore, qui s'accumule et tue avant de réveiller |

Règles du tableau **volontairement non reprises**, avec la raison : trichinellose, tularémie,
foie et reins de cervidés et thuyone du cèdre n'ont aucun point d'application dans un chapitre de
poisson. **Si l'éditeur ajoute une infusion, un chauffage d'appoint ou un travail prolongé
dehors à la variante d'urgence, la règle correspondante doit entrer avec.**

## 3. Dangers de l'encadré, avec leur mécanisme

Quatre entrées seulement. Chacune tue.

1. **Botulisme de type E** — répandu dans les milieux aquatiques ; les souches non protéolytiques
   croissent au-dessus de 3 °C, donc **dans** la plage d'un réfrigérateur ordinaire ; elles
   exigent l'absence d'oxygène, que le sac sous vide leur fournit ; la toxine ne modifie rien de
   visible. Paralysie des muscles respiratoires, antitoxine hospitalière, rien à faire au chalet.
2. **Phycotoxines des mollusques bivalves** — le mollusque filtre et **accumule** la toxine des
   dinoflagellés ; elle vient de l'eau, pas de la bête ; rien à voir ni à sentir ; décès recensés
   par l'ACIA. Seule barrière documentée : l'état du secteur, publié quotidiennement.
3. **Eau froide et marée** — 1-10-1 ; ce n'est pas le froid qui noie dans la première minute mais
   l'inspiration réflexe ; les dix minutes suivantes ne valent rien si les mains ne tiennent plus ;
   sur une batture, l'eau monte **par l'arrière**, dans les chenaux du chemin de retour.
4. **Glace de marée** — deux mécanismes que les épaisseurs publiées ne couvrent pas : le
   soulèvement deux fois par jour qui fissure la bordure, et le courant qui mange la glace par en
   dessous ; la neige isole et **ralentit** la prise de glace.

**Écartés de l'encadré pour ne pas le diluer, et traités ailleurs dans le chapitre :** parasites
du poisson cru (§5-G — rendent malade, la congélation les règle), histamine (§5-J — délai), mercure
(§10 — dose sur des années), hypothermie de travail dehors (ch. 3), mal de caribou (ch. 24, avec
renvoi explicite sous l'encadré).

**À surveiller par le vérificateur sécurité :** le point 2 est le seul de l'encadré qui **refuse
de répondre à une question**. Le chapitre écrit noir sur blanc qu'il ne sait pas si la cuisson
détruit les phycotoxines. C'est un choix assumé — un « probablement » dans un encadré DANGER est
pire que rien — mais il faut vérifier qu'il ne se lit pas comme « la cuisson règle peut-être le
problème ».

## 4. Images requises

| # | Description | Cadrage | Format |
| --- | --- | --- | --- |
| 1 | Planche des espèces du fleuve, **triées par gras et par maigre**, pas par famille : colonne « gras » — hareng atlantique, maquereau bleu, capelan ; colonne « maigre » — éperlan arc-en-ciel, poulamon atlantique, morue franche ; colonne « pièce à pièce » — omble anadrome, saumon, bar rayé, anguille, plie rouge. Nom français d'usage et nom latin sous chaque poisson. Échelle relative respectée entre les espèces | Planche redessinée au trait, profil gauche, fond clair, une règle graduée en cm dans le cadre. **Le tri gras/maigre est le message de la planche** : il commande la §5-D et ne doit pas être décoratif | Pleine page |
| 2 | Séquence du refroidissement en quatre vignettes : couche de glace, couche de poisson en une seule épaisseur, couche de glace, couvercle opaque fermé | Photos de JP, vue de trois quarts dans une chaudière de 20 L, prises au bord de l'eau et non en cuisine | Demi-page |
| 3 | Éperlan : tête coupée derrière l'ouïe sans traverser, puis tirée — les viscères viennent avec, en une pièce | Deux vignettes, plan très serré sur les mains, poisson posé sur planche claire | Quart de page |
| 4 | Filet avec **peau laissée** contre filet nu, côte à côte, avec la mention de la règle d'identification | Vue de dessus, les deux filets dans le même cadre pour que la comparaison soit immédiate | Quart de page |
| 5 | Thermomètre à sonde dans la partie la plus épaisse d'un filet en cuisson, affichage **70 °C** lisible, sonde visiblement dans la chair et non contre l'arête | Photo, macro sur l'afficheur | Quart de page |
| 6 | Thermomètre de congélateur à demeure affichant **-20 °C**, avec une étiquette de contenant datée dans le même cadre | Photo, plan serré. C'est l'image qui rend concrète la §5-G | Quart de page |
| 7 | Batture à marée basse, avec le chemin de retraite tracé en surimpression et les chenaux qui se remplissent en premier marqués. **Deux états du même lieu** : basse mer et mi-marée montante | Photo de JP depuis un point haut, même cadrage aux deux heures, prises le même jour. Si impossible : croquis au trait | Demi-page |
| 8 | Séchoir à poisson de la variante d'urgence : poissons ouverts suspendus, surélevés, à l'ombre, sous voile anti-mouches, avec le vent indiqué par une flèche | Photo ou croquis, vue de trois quarts, montrant la **circulation d'air** sous et autour | Quart de page |

Aucune image de la section 8. L'encadré DANGER se lit, il ne s'illustre pas. **Aucune photo de
mollusque appétissant nulle part dans le chapitre** : ce serait la seule image du livre qui
contredirait son propre encadré.

## 5. Renvois vers d'autres chapitres

| Chapitre | Raison |
| --- | --- |
| 4 — Panne majeure d'Hydro en janvier | Génératrice et congélateur, monoxyde |
| 7 — Des enfants de 4 et 6 ans | Le tri et le lavage sont un vrai travail d'enfant ; l'eau froide n'en est pas un |
| 8 — Le stock permanent du chalet | La table de marées imprimée et la brochure de l'année sont des articles de stock |
| 13 — Eau : puiser, filtrer, désinfecter | L'eau de lavage du poisson |
| 19 — Communiquer et savoir | État quotidien des secteurs coquilliers, prédictions de marées, bureau du MPO |
| 20 — Se déplacer et le carburant | Eau froide, 1-10-1, génératrice |
| 24 — Le mal de caribou | Morue et éperlan sont maigres. C'est le renvoi le plus important du chapitre |
| 26 — Ce qu'un corps demande l'hiver | Densité énergétique du poisson gras |
| 28 — Hygiène et eaux usées | Eau de lavage, loin du puits |
| 31 — Ce qu'on ne peut pas soigner | Botulisme : antitoxine hospitalière |
| 33 — Les enfants, la peur et la routine | Le travail de tri comme routine familiale |
| 34 — Calendrier annuel de prélèvement | Où tombe le fleuve dans l'année. **Le chapitre 34 renvoyait déjà ici pour les mollusques : la dette est payée** |
| 41 — Abats et organes | Foie et rogue de poisson |
| 42 — Ce que personne ne garde | Viscères, disposition |
| 43 — Comment lire une fiche d'espèce | Structure des fiches, champ contaminants laissé vide |
| 48 — Ours noir | Les viscères en tas près du chalet sont de l'appât |
| 53 — Truite et omble au lac | Le versant eau douce de la même question, autre régime réglementaire |
| 54 — Pêche blanche | La glace, en détail |
| 56 — Nasses, filets, verveux | Les engins, et le poisson-appât |
| 61 — Pourquoi la viande pourrit | Enzymes, flore, oxydation |
| 62 — Le sel | Sel de récupération, qualité du sel |
| 63 — Salaison à sec | Pourcentages sur le poids de la chair, salpêtre et sa forme moderne |
| 64 — Saumure | Poisson gras et pièces entières |
| 66 — Fumage à chaud et séchage | Capelan séché entier |
| 67 — Pemmican et graisses | Le gras des poissons gras |
| 68 — Froid naturel | Congélation dehors, caveau, glace faite d'avance |
| 69 — Un congélateur plein qui dégèle | Panne pendant les sept jours de congélation antiparasitaire |
| 70 — Traiter le poisson à la sortie de l'eau | Le poste de travail complet. Le chapitre 55 ne dit que ce qui est propre au fleuve |
| 71 — Saler et sécher la truite | Les pourcentages de sel eux-mêmes |
| 72 — Fumer le poisson | Le fumage, qui est la voie la plus dangereuse du chapitre |
| 73 — Conserves et marinades | Marinades |
| 82 — Affûter, limer, aiguiser | Couteau à lame souple |

Les 33 numéros ont été vérifiés contre la liste des 89 chapitres. **Aucun renvoi vers un chapitre
inexistant.**

## 6. Relecteur humain requis

Le chapitre **n'est pas** dans la liste de relecture humaine obligatoire de `CLAUDE.md`. Il
devrait l'être, ou du moins ses sections 5-F, 5-G et 8 devraient l'être, pour une raison simple :
il **alimente** trois chapitres qui sont dans la liste — 72 (Fumer le poisson), 63 (Salaison à
sec) et 64 (Saumure) — et il est le seul du livre à traiter les mollusques bivalves.

- **Relecteur demandé : inspecteur des aliments ou microbiologiste alimentaire** (MAPAQ, ACIA ou
  équivalent). Portée : encadré DANGER points 1 et 2, et section 5-G. Ce qu'on lui demande
  précisément : (a) la formulation du seuil de 3 °C par rapport à la consigne de 4 °C, qui sont
  deux choses différentes et que le livre fait cohabiter ; (b) si la congélation domestique à
  -20 °C pendant 7 jours est acceptable comme traitement antiparasitaire hors établissement,
  ou s'il faut refuser la consommation crue au chalet purement et simplement ; (c) **la question
  de la cuisson des phycotoxines**, que le chapitre laisse ouverte.
- **Second avis souhaitable : agent de Pêches et Océans Canada**, bureau régional Côte-Nord.
  Portée : section 5-I et la procédure de vérification d'un secteur coquillier sans Internet.
  Ce qu'on lui demande : est-ce que l'appel au bureau local donne réellement une réponse
  utilisable, et sous quel délai.

## 7. Noms d'espèces employés — à confirmer

Français d'usage et latin, tels qu'écrits dans le chapitre : éperlan arc-en-ciel *Osmerus mordax* ·
capelan *Mallotus villosus* · poulamon atlantique *Microgadus tomcod* · hareng atlantique
*Clupea harengus* · maquereau bleu *Scomber scombrus* · morue franche *Gadus morhua* · plie rouge
*Pseudopleuronectes americanus* · omble de fontaine *Salvelinus fontinalis* · saumon atlantique
*Salmo salar* · bar rayé *Morone saxatilis* · anguille d'Amérique *Anguilla rostrata* · moule bleue
*Mytilus edulis* · mye commune *Mya arenaria* · *Clostridium botulinum*.

Les six thons de la page du MAPAQ sont cités **dans le fichier de source uniquement**, pas dans le
chapitre : aucun n'est pêché à la Côte-Nord.

## 8. Notes pour l'éditeur

- **La planche 1 et la section 5-D doivent tomber sur la même double page.** Le tri gras / maigre
  est le geste central du chapitre et il se fait les mains pleines de poisson.
- **Ne pas fusionner les points 1 et 2 de l'encadré DANGER.** Botulisme et phycotoxines produisent
  une paralysie chacun, mais ni les mêmes aliments, ni la même barrière : le premier se règle par
  la température et l'oxygène, le second par l'état du secteur. Les confondre produirait un
  lecteur qui croit que « congeler règle tout ».
- **Ne pas retirer la phrase « on ne goûte jamais pour vérifier ».** C'est la seule phrase du
  chapitre qui contredit frontalement un réflexe, et c'est celle qui sauve.
- **Ne pas abréger le paragraphe de la marée qui monte par l'arrière.** Dit court, ça devient
  « attention à la marée », qui ne change rien.
- Le chapitre ne donne **aucune date de saison, aucune limite de prises, aucun numéro de zone**,
  alors que la page consultée en portait (relevées dans `sources/55-quebec-peche-eperlan-methodes-especes.md`,
  pas dans le chapitre). Si quelqu'un trouve que le chapitre « manque d'information pratique »,
  c'est exactement ça, et c'est voulu.
- Salpêtre : traité à l'étape 33, **sans aucune quantité**, avec sa forme moderne équivalente
  nommée et le renvoi aux chapitres 63 et 64.
- Pourcentages de sel : nommés comme se calculant **sur le poids de la chair**, sans valeur
  chiffrée ici, renvoi au chapitre 71.
- Le 9 % de sel et l'a<sub>w</sub> de 0,97 sont dans les fiches de source mais **pas** comme
  consigne de salaison domestique. Ce sont des seuils réglementaires. Les chapitres 71 et 72
  devront les traiter avec le relecteur humain.

## 9. Ce qui reste faible

- **Les durées.** Le chapitre ne dit jamais combien de temps un poisson tient sur la glace. Tout
  repose sur la température et sur les six odeurs. C'est honnête mais frustrant, et c'est la
  première chose qu'un lecteur cherchera.
- **Les mollusques sont traités en cinq étapes** alors qu'ils portent le deuxième point de
  l'encadré DANGER. Le déséquilibre se défend — la consigne tient en une ligne, « secteur ouvert
  ou rien » — mais si le livre veut un jour que JP ramasse des myes, ça demande un traitement à
  part, possiblement un ajout au plan du tome 3.
- **Le capelan** est nommé comme la pêche de plage de la Côte-Nord sans qu'aucune source
  officielle consultée ne décrive la roulée sur les plages. La mention reste qualitative et sans
  chiffre ; si le vérificateur technique ne retrouve rien, elle doit être encore atténuée.
- **L'anguille d'Amérique et le bar rayé** sont nommés dans le tri sans un mot de plus. Les deux
  ont des statuts et des règles particulières. Le chapitre ne dit rien plutôt que de dire à moitié,
  mais c'est un trou visible.
- **Aucune source officielle n'a pu être trouvée sur le traitement du poisson à bord** (glace,
  délais, éviscération). La page de l'ACIA sur les exigences applicables aux pêcheurs ne porte que
  licences, contrôles préventifs et traçabilité. Toute la section 5-C repose donc sur le mécanisme
  du chapitre 61, pas sur une consigne publiée.

## Passe « pas de code légal, signes expliqués » — 23 septembre 2026

**Légal retiré.**
- Section 3 : « Les périodes et les engins permis changent par cours d'eau et par année : ce
  livre n'en imprime aucun, et la brochure de l'année se ramasse l'hiver d'avant ».
- Section 4 : la ligne « Brochure de réglementation de l'année ».
- Section 5-A : l'étape 3 « Vérifier les périodes et les engins permis dans la brochure de
  l'année ». Les étapes 4 à 52 de la section 5 sont renumérotées 3 à 51 (aucun renvoi par
  numéro d'étape dans le livre ; la section 9 garde sa propre numérotation).
- Section 5-G, ancienne étape 38 (maintenant 37) : « La seule exemption vise certaines espèces de
  thon… n'est exempté » devient le fait que l'exemption protégeait : seuls certains thons et le
  poisson élevé en milieu strictement contrôlé sont reconnus exempts de parasites, aucun poisson
  sauvage du Saint-Laurent ne l'est. Source inchangée :
  `sources/55-quebec-mapaq-poisson-parasites-botulisme.md`.
- Section 6, ligne « Peau laissée sur les filets » : la conséquence « Non transportable » devient
  « Écrire l'espèce sur le contenant tout de suite, avant que les chairs se mélangent » (même
  geste que l'étape 20, ex-21).
- Gardé : le secteur coquillier ouvert ou fermé. C'est une fermeture administrative, mais c'est
  la seule forme sous laquelle l'information sur les phycotoxines arrive, et le chapitre la
  traite déjà comme une mesure de laboratoire, pas comme une règle.

**Note de bas de page ajoutée :** aucune. Les signes nommés au chapitre (couleur de la glace,
odeurs de décomposition, branchies et œil, saumure trouble, contenant bombé, séchage fini)
sont décrits là où ils sont nommés.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/55-verifications.md`.

- §4, Matériel, table de marées : la pleine mer retarde d'environ **50 minutes** par jour en
  moyenne (jour lunaire de 24 h 50) — valeur insérée. Source : `sources/55-mpo-dohler-marees-jour-lunaire-fiche.md`
  (texte intégral : `sources/55-mpo-dohler-marees-eaux-du-canada-1989-texte.txt`).
- §6, ligne « Sur place, l'hiver », et §8, bloc 4 : épaisseurs de glace **corrigées** — 10 cm à
  pied et 12 cm en motoneige remplacés par les plus prudentes : **15 cm** à pied seul, **20 cm**
  à plusieurs, **25 cm** en motoneige (confirmé). Sources : `sources/35-croix-rouge-securite-sur-la-glace.md` ;
  `sources/07-societe-de-sauvetage-epaisseur-glace.md` (10 et 12 cm, écartés).
- §5, étape 25, sel tiré du fleuve : salinité **27 g/L** face à Pointe-au-Père, **29 g/L** dans le
  golfe (sels dissous totaux) ; d'où **plus de 35 L d'eau par kilo de sel** (1 000 ÷ 29 ≈ 34,5,
  et tout n'est pas du chlorure de sodium). Renvoi au ch. 62 retiré : le ch. 62 ne chiffre pas ce
  volume. Source : `sources/13-universite-laval-salinite-saint-laurent.md`.
- §2, §8 et §5-H : mal de caribou « en quelques semaines » (décision du projet ; était « deux à
  trois semaines », trois occurrences).

## Corrections croisées — 24 septembre 2026

- §8, « Ce qui n'est pas dans cet encadré » — **ajouté**, aligné sur le ch. 54 : « l'éperlan, le
  poulamon et le saumon atlantique sont au palier le moins restreint, 8 repas par mois — un repas,
  c'est 230 g de poisson cru, et le mois compte toutes les espèces ensemble, celles du lac comprises
  (ch. 54) ». Le guide de consommation du poisson de pêche sportive en eau douce, donné introuvable
  au §1 de ce suivi (ligne 4), a été trouvé : recommandations générales,
  « Éperlan arc-en-ciel · Poulamon · Saumon de l'Atlantique » à 8 repas par mois, repas de 230 g
  « avant la cuisson », limite mensuelle « toutes les espèces consommées ». Le hareng, le
  maquereau, le capelan et la morue ne figurent pas au guide (eau douce) : rien n'est écrit pour eux.
  `sources/53-melccfp-guide-consommation-poisson-eau-douce.md` ;
  `suivi/verifications/54-verifications.md` (note B).

Compression §3 et §4 — 27 septembre 2026 : 1121 mots → 224 mots ; matériel coupé : chaudières de 20 L, carrelet ou épuisette (fabrication → §9-F), couteau à lame souple, ciseaux, cuillère à racler, bâche de tri, papier boucherie et caisses (règle de l'emballage respirant déjà en §5, §6, §8, §9), sel à saumure (ch. 67, ch. 76), lampe frontale (§5 étape 3), gants, pics à glace et sifflet (§8, ch. 58), paragraphe « non négociable » ; substituts coupés : piquet de marée, bidons-VFI (déplacés en §9, « Ce qui ne se remplace vraiment pas »), pièce de monnaie et vérification du thermomètre (déjà en §9-C et §9-G) ; §3 : renvois ch. 57, 58 et 66 retirés.
