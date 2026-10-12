> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 25. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 25 : Le scorbut et l'arbre de vie

- **Tome :** 2 — Le corps
- **Fichier :** `chapitres/25-le-scorbut-et-l-arbre-de-vie.md`
- **Rôle :** 2 — Rédacteur
- **Date :** 2026-09-20
- **Longueur :** environ 5 480 mots utiles (6 000 mots bruts, syntaxe de tableau incluse)
- **État :** premier jet complet, prêt pour les rôles 3 et 4
- **⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE** — chapitre inscrit à la liste de `CLAUDE.md`
  sous « Le scorbut ». Marquée en encadré en tête de fichier **et** en section 10.

---

## 1. Le relecteur humain requis

**Deux signatures, pas une.**

| Relecteur | Ce qu'il doit signer |
| --- | --- |
| **Biologiste végétal** (botanique boréale, ou technicien forestier avec formation en flore) | La clé d'identification du sapin baumier (§5-C) ; la teneur en vitamine C des aiguilles de sapin et d'épinette (§5-D) ; **la description et la toxicité de l'if du Canada (§8, entrée 2), entièrement non sourcée** ; la présence réelle du thuya occidental sur la Côte-Nord ; les noms latins des fruits de la §9 |
| **Pharmacien** | La distinction entre l'ANR (90 mg) et le plancher anti-scorbut (moins de 10 mg/jour), qui est le pivot de tout le chapitre ; l'AMT chez un enfant de 4 ans et l'arithmétique du comprimé de 500 mg ; le mécanisme de l'excès ; la formulation de l'encadré DANGER sur la thuyone ; **l'absence volontaire de toute posologie de traitement** |

Sans ces deux signatures, le chapitre ne part pas. Le motif est écrit en toutes lettres dans
l'encadré de tête : le chapitre envoie une famille cueillir des aiguilles de conifère et les
faire boire à des enfants de 4 et 6 ans.

## 2. Chiffres marqués `[À VÉRIFIER]`

| # | Valeur ou affirmation | Où | Pourquoi ce n'est pas sourcé |
| --- | --- | --- | --- |
| 1 | Teneur en vitamine C des aiguilles d'**épinette noire** (*Picea mariana*) et d'**épinette blanche** (*Picea glauca*) | §5-C étape 14, §9 | La seule source trouvée (Durzan 2009) chiffre *Picea rubens* (aiguilles) et l'écorce de *Picea glauca*. Or l'épinette rouge est quasi absente de la Côte-Nord. **C'est le trou le plus gênant du chapitre** : l'épinette noire est l'arbre le plus abondant du secteur |
| 2 | Fraction de la vitamine C qui passe de l'aiguille à l'infusion | §5-D étape 19, §9 | Inconnue. Aucune conversion en milligrammes n'a été écrite, précisément pour ça |
| 3 | Température (70 à 80 °C) et durée (10 min) d'infusion | §5-D étape 17, §6 | Aucune source. Repère d'atelier |
| 4 | Test du doigt pour juger une eau sous 50 °C | §4 (tableau matériel) | Repère d'atelier, non sourcé |
| 5 | **Toxicité de l'if du Canada** (*Taxus canadensis*) : taxines, blocage de la conduction cardiaque, arille charnu non toxique, port bas dans le sous-bois | §8, entrée 2 | **Aucune source consultée.** Le Système d'information sur les plantes toxiques du Canada (`www.cbif.gc.ca`) a renvoyé une erreur de certificat TLS (certificat émis pour `*.agr.gc.ca`), puis un nom d'hôte introuvable sur `cbif.agr.gc.ca`. **Priorité absolue de vérification** |
| 6 | Mécanisme de l'excès de vitamine C (diarrhée osmotique) | §5-F étape 29, §7 | L'AMT est sourcé (ANREF) ; la justification physiologique de l'AMT n'a pas été retrouvée sur la page consultée |
| 7 | Pertes au séchage, à la congélation prolongée et à l'entreposage au caveau | §5-B étape 8, §9 | Toutes les valeurs du Fichier canadien retenues sont des valeurs de **cru** ou de **conserve** |
| 8 | Teneurs des petits fruits boréaux sauvages (airelle vigne-d'Ida, camarine noire, chicouté, cynorrhodon) | §9 | Absents du Fichier canadien. De plus, les entrées « Bleuet, cru » et « Canneberge, crue » **ne nomment pas l'espèce** : rien ne garantit qu'il s'agisse de *Vaccinium angustifolium* ni des fruits d'ici |
| 9 | Teneur en vitamine C de la viande et des abats de gibier | §8, entrée 3 | Aucune entrée de gibier trouvée dans le Fichier canadien. Le chapitre s'en sert comme argument (« ce n'est même pas connu ») ; l'argument tombe si une valeur existe ailleurs |
| 10 | Pomme de terre rissolée, 13,0 mg/100 g | §5-A tableau | La base donne cette valeur avec **zéro observation** : valeur imputée, pas mesurée. Le chapitre le dit. À remplacer par une pomme de terre crue ou bouillie sans pelure — codes non isolés, la liste renvoyée par l'API était tronquée. Chercher entre 2167 et 2187 |
| 11 | Délai du mal de caribou, 2 à 3 semaines | §8, entrée 5 | Repris tel quel du chapitre 24, qui porte la vérification. Ne pas le re-sourcer ici, le faire remonter au 24 |

## 3. Le problème de fond à signaler à l'éditeur

**Aucune source officielle canadienne sur la thuyone n'existe.** Ont été consultées et sont
revenues vides : la Liste critique des ingrédients de cosmétiques de Santé Canada, la Liste des
contaminants et autres substances adultérantes dans les aliments de Santé Canada, et le
Règlement sur les aliments et drogues. La règle de sécurité du tableau de `CLAUDE.md` —
« thuyone du cèdre toxique » — repose donc, pour tout le livre, sur le **rapport technique
TR-570 du National Toxicology Program américain**, dont les doses sont des doses de gavage chez
le rat en mg/kg.

C'est une règle du livre qui est déjà écrite dans les chapitres 3, 5, 7, 8, 11 et 12, et le
chapitre 7 a explicitement reporté sa vérification ici (`suivi/07-redaction.md`, ligne
« source à établir là-bas »). **Le chapitre 25 ne peut pas la sourcer mieux que ça.** Deux
issues possibles, à trancher par le relecteur pharmacien :

1. la règle tient, et elle est citée partout avec sa source américaine assumée ;
2. une source canadienne ou européenne meilleure existe (base des ingrédients de produits de
   santé naturels de Santé Canada, avis de l'EFSA de 2012 sur la thuyone — `efsa.europa.eu` et
   Wiley ont renvoyé HTTP 403 le jour de la rédaction), et elle remplace le NTP partout.

Tant que ce n'est pas tranché, **aucun des chapitres 3, 5, 7, 8, 11 et 12 ne doit être imprimé**
avec sa formulation actuelle sur le cèdre, puisqu'ils renvoient tous au 25.

## 4. Documents non récupérés, à reprendre

| Document | Problème | Conséquence dans le chapitre |
| --- | --- | --- |
| OMS, *Scurvy and its prevention and control in major emergencies* (WHO/NHD/99.11), PDF | HTTP 403 sur `iris.who.int` et `apps.who.int` | Le délai de 2 à 3 mois tient à la fiche de publication seule. **Les doses de traitement du scorbut déclaré n'ont pas été obtenues** : la §5-G ne donne aucune posologie et renvoie aux ch. 27 et 31 |
| Santé Canada, PDF français des tableaux ANREF | Déjà signalé au ch. 12, toujours pas extrait | Les libellés français des lignes vitamine C sont une traduction de travail du rédacteur |
| Rapport ANREF, chapitre vitamine C, pages suivantes | Seule la page `chapter/7` a été lue | Les passages sur la destruction par la chaleur et sur la justification de l'AMT manquent |
| Fiches RNCan du thuya occidental, de l'épinette noire, de l'épinette blanche et de l'if du Canada | L'index alphabétique du site revient tronqué à la lettre A ; numéros de fiche introuvables | Seul le sapin baumier a une clé d'identification sourcée. **L'aire de répartition du thuya sur la Côte-Nord reste inconnue** : impossible de dire si le risque de confusion est théorique ou réel |
| Système d'information sur les plantes toxiques du Canada | Erreur de certificat TLS puis hôte introuvable | Voir `[À VÉRIFIER]` n° 5 |

Le budget de recherche web de la session (200 recherches) était épuisé avant le premier appel :
**tout le chapitre a été bâti par accès direct à des URL devinées ou déjà connues**, sans
moteur de recherche. C'est la raison principale des trous ci-dessus, et la première chose à
refaire dans une session où le budget est disponible.

## 5. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau | Reprise ici |
| --- | --- |
| **Thuyone du cèdre toxique** — sapin baumier ou épinette pour la vitamine C | §8 entrée 1, avec le mécanisme convulsivant et les doses animales du NTP ; répétée en §2, §5-C étape 12, §5-D étape 20 et §9. C'est le chapitre porteur de cette règle pour tout le livre |
| **Cuisson du gibier sauvage à 74 °C à cœur** (MAPAQ) | §8 entrée 3. Reprise ici parce que le chapitre crée la tentation : « manger cru pour garder les vitamines » |
| **Jamais le foie ni les reins de cervidés** — cadmium (MAPAQ) | §8 entrée 4, avec le mécanisme d'accumulation. Même motif : le réflexe « les abats pour les vitamines » |
| **Trichinellose : ni le sel, ni le fumage, ni le gel domestique** | §8 entrée 3, ours noir et phoque |
| **Viande maigre seule = mal de caribou, mortel en 2 à 3 semaines** | §8 entrée 5 et §2. Les deux carences arrivent au même moment de l'hiver ; le chapitre dit explicitement qu'il n'en règle qu'une |

Les autres règles du tableau (tularémie du lièvre, botulisme de type E, génératrice et
monoxyde) **ne s'appliquent pas** à ce chapitre et n'y ont pas été insérées, pour ne pas
diluer l'encadré.

## 6. Dangers de l'encadré, avec leur mécanisme

1. **Thuyone du thuya occidental** — convulsivant ; convulsions chez le rat dès 12,5 mg/kg par
   gavage sur deux ans, pigmentation cérébrale, minéralisation rénale, « some evidence of
   carcinogenic activity » chez le rat mâle (NTP TR-570).
2. **If du Canada** — alcaloïdes taxines, blocage de la conduction cardiaque, pas d'antidote.
   `[À VÉRIFIER]`, voir §2 n° 5.
3. **Trichinellose** — enkystement musculaire, libération des larves à l'ingestion, migration ;
   seule barrière la cuisson à 74 °C.
4. **Cadmium des reins et du foie de cervidés** — accumulation dans les organes du mangeur,
   élimination très lente.
5. **Mal de caribou** — charge azotée au-delà de la capacité d'élimination, déficit énergétique
   l'estomac plein.

Cinq entrées, toutes à mécanisme létal ou d'intoxication grave. **Ce qui a été volontairement
laissé hors de l'encadré :** l'excès de vitamine C (AMT dépassé), traité en §5-F et §7 parce
que le risque est une diarrhée, pas une mort — sauf déshydratation chez un enfant, et ce
risque-là appartient aux chapitres 7 et 27.

## 7. Images requises

| # | Sujet | Cadrage | Format | Piste de production |
| --- | --- | --- | --- | --- |
| 1 | **Clé de non-confusion des quatre conifères** : sapin baumier, épinette noire, thuya occidental, if du Canada | Quatre colonnes. Pour chacune : rameau entier, puis macro du dessous d'une aiguille. Bandes blanches du sapin annotées. Colonnes thuya et if barrées d'un X rouge plein, légende « jamais dans une tasse » | **Pleine page** | À dessiner ou à monter à partir de photos de JP prises en été. **Ne pas produire avant la signature du biologiste** (voir §1) |
| 2 | Dessous d'une aiguille de sapin baumier, les 10 à 12 bandes de points blancs | Macro, aiguille tenue entre deux doigts pour l'échelle, lumière rasante | Quart de page | Photo de JP, l'été |
| 3 | Ce que pèsent 10 mg et 90 mg de vitamine C dans l'assiette | Deux assiettes côte à côte, balance visible : 68 g et 612 g de choucroute. Même cadrage, même hauteur | Demi-page | Photo. C'est l'image qui fait comprendre tout le chapitre |
| 4 | Ruban de marquage sur un sapin, en hiver, vu de loin puis de près | Deux vignettes, neige au sol, ruban au-dessus du niveau de neige | Quart de page | Photo de JP, l'hiver |
| 5 | Baril de fermentation en coupe : chou, saumure, poids, joint d'eau | Coupe au trait, niveaux annotés | Quart de page | À dessiner. Coordonner avec le ch. 77 pour ne pas dessiner deux fois le même baril |
| 6 | Fruits gelés sur pied sous la neige : airelle vigne-d'Ida, camarine noire | Macro, main gantée écartant la neige | Quart de page | Photo de JP, l'hiver. Coordonner avec le ch. 57 |
| 7 | Signes cliniques : gencives scorbutiques, hémorragies périfolliculaires, poils en tire-bouchon | Planche médicale, trois vignettes | Demi-page | **Licence à vérifier.** Chercher dans le domaine public d'avant 1930 ou chez une agence fédérale américaine. Rien ne se copie du web sans licence (`CLAUDE.md`). À inscrire dans `images/credits.md` |

Aucune image n'a encore été récupérée : `images/credits.md` reste vide pour le chapitre 25.

## 8. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 2 — Rester ou partir | Un scorbut chez un enfant pèse dans la décision d'évacuer |
| 4 — Panne majeure d'Hydro en janvier | Congélateur mort, légumes perdus |
| 5 — Épidémie | Confinement long sans ravitaillement |
| 6 — Retombées radioactives | Plus de légumes frais ; le ch. 6 renvoie déjà ici |
| 7 — Des enfants de 4 et 6 ans | AMT bas, rangement des comprimés, déshydratation. Le ch. 7 attend la formulation de la thuyone d'ici |
| 8 — Le stock permanent du chalet | Comprimés et fermentés en rotation ; le ch. 8 renvoie déjà ici |
| 12 — Ce qui manque toujours | Reprend l'interdit du cèdre et attend la teneur des aiguilles d'ici |
| 19 — Communiquer et savoir | Joindre le Centre antipoison suppose un lien |
| 24 — Le mal de caribou | Carence voisine, même moment de l'hiver. Porte le délai de 2 à 3 semaines |
| 26 — Ce qu'un corps demande l'hiver | Le besoin global dont la vitamine C n'est qu'une ligne |
| 27 — Soigner quand il n'y a personne | Scorbut déclaré, réhydratation |
| 29 — Bâtir la pharmacie | Réserve de comprimés, rangement sous clé |
| 30 — Plantes médicinales boréales | Thuyone, thé du Labrador |
| 31 — Ce qu'on ne peut pas soigner | Scorbut avancé, enfant qui ne marche plus |
| 41 — Abats et organes | Cadmium du foie et des reins de cervidés |
| 48 — Ours noir · 52 — Phoque du Saint-Laurent | *Trichinella*, cuisson à 74 °C |
| 57 — Petits fruits | Cueillette, congélation crue, fruits gelés sur pied |
| 58 — Plantes comestibles boréales | Identification, espèces du sous-bois |
| 60 — Sève, gomme, écorces | Aiguilles et écorces de conifères ; la teneur de l'écorce de pin blanc appartient aussi là |
| 62 — Le sel | Sel de fermentation |
| 69 — Un congélateur plein qui dégèle | Les fruits congelés crus sont la réserve la plus fragile |
| 73 — Conserves et marinades | Ce qui reste après la chaleur |
| 74 — Jardin nordique · 75 — Semences | Semer pour l'hiver, pas seulement pour l'été |
| 76 — Caveau à légumes | Racines, pertes à l'entreposage |
| 77 — Fermentation | Le baril de choucroute, source la mieux chiffrée du chapitre |

Tous ces numéros ont été vérifiés contre la liste des 89 chapitres. Aucun renvoi vers un
chapitre inexistant.

## 9. Notes pour l'éditeur

- **La longueur dépasse la cible annoncée** (5 480 mots utiles contre 5 000). Elle est alignée
  sur les chapitres 12 et 13 du tome 1 (5 220 et 5 050 mots), mais si une coupe est nécessaire,
  couper dans la §10 (le journal des échecs de recherche peut vivre ici, dans le suivi) et non
  dans la §5-C ni dans l'encadré.
- **Ne pas fusionner les deux nombres de la §3.** L'ANR de 90 mg et le plancher de moins de
  10 mg/jour se ressemblent assez pour qu'un éditeur pressé en garde un seul. Le chapitre ne
  veut rien dire s'il n'en reste qu'un : tout l'arbitrage de l'hiver est entre les deux.
- **Le chapitre ne donne aucune posologie de traitement, et c'est voulu.** Si quelqu'un en
  ajoute une en édition sans source, la leçon du chapitre pilote (71 °C au lieu de 74 °C) est
  répétée, en pire.
- Recoupement attendu avec le **ch. 60** (écorces et aiguilles) et le **ch. 57** (petits
  fruits). Décider qui porte les teneurs : la proposition du rédacteur est que **le 25 porte les
  teneurs de conifères** et que le 57 porte celles des fruits, avec renvoi croisé.
- Recoupement avec le **ch. 77** sur le baril de choucroute. Le 25 dit *pourquoi* ; le 77 dit
  *comment*. Ne pas répéter la procédure ici.
- La **note historique** de fin de §10 est le seul passage du chapitre qui n'est pas
  opérationnel. Elle porte le titre du chapitre et le justifie — le remède qui a sauvé
  110 hommes est attribué sans preuve au seul arbre de la liste dont la toxicité est
  documentée. Si elle doit sauter pour la mise en pages, elle peut devenir un encadré de
  demi-page en ouverture de chapitre, mais elle ne disparaît pas.

## Notes retirées du chapitre — 23 septembre 2026

Encadré d'ouverture du chapitre, retiré tel quel :

> ## ⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE
>
> **Ce chapitre ne part pas à l'impression sans la signature d'un biologiste végétal ou d'un
> pharmacien**, idéalement l'un et l'autre. Le biologiste signe la clé de non-confusion des cinq
> conifères (§5-C) et les teneurs en vitamine C des aiguilles ; le pharmacien signe l'écart entre
> l'apport recommandé et le plancher anti-scorbut, qui est le pivot du chapitre, l'apport maximal
> tolérable chez un enfant de 4 ans, et la formulation de l'interdit du cèdre.
> Motif : le chapitre envoie une famille cueillir des aiguilles de conifère et les faire boire
> à des enfants, dans une forêt où poussent au moins deux espèces à ne pas mettre dans la tasse.

Sous le tableau des teneurs de la §5-A, retiré tel quel :

> Les colonnes de droite sont des divisions du rédacteur, pas des valeurs de la base.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/25-verifications.md`, appliqués au chapitre (22 drapeaux).

- §3, pool de 2 g et enfant — **confirmé** : pool d'adulte ; chez l'enfant, tout est extrapolé de
  l'adulte au poids. `sources/25-nasem-dri-vitamine-c-chapitre-complet.md`.
- §4, Matériel, « le doigt : sous 50 °C » — **introuvable**, coupé.
- §5-A, bleuet et canneberge par espèce — **corrigé** : bleuet fausse-myrtille 14,0 mg/100 g ;
  canneberge sauvage (*V. oxycoccos*) 5,5 mg/100 g, ajoutée au tableau (1 636 g / 509 g / — /
  182 g) ; *V. angustifolium* sans valeur publiée. `sources/25-fao-kuhnlein-turner-aiguilles-et-petits-fruits.md`,
  `sources/25-sante-canada-fcen-vitamine-c.md`.
- §5-B, étape 8, séchage et confiture — **corrigé** : jus bouilli au dixième, moitié perdue, moins
  du septième après un mois à la pièce ; groseilles conservées à l'ancienne, 0 ; germe séché,
  perte de 11 à 26 % (« jusqu'au quart »), puis jusqu'à 80 % après environ 50 jours à 37 °C.
  `sources/25-oms-germination-sechage-robs-biere.md`.
- §5-C, étape 12, thuya sur la Côte-Nord — **corrigé** : présent dans toute la sapinière, absent
  de la seule pessière à mousses ; pousse aussi sur sol acide et au bord de l'eau.
  `sources/25-quebec-comparaison-essences-thuya-occidental.md`.
- §5-C, étape 14, tableau (épinette noire) et §9-A — **corrigé** : aiguille fraîche d'épinette
  noire 120 mg/100 g. `sources/25-fao-kuhnlein-turner-aiguilles-et-petits-fruits.md`.
- §5-C, tableau (épinette blanche) — **introuvable** : « aucune teneur chiffrée pour l'aiguille ».
  `sources/25-fao-kuhnlein-turner-aiguilles-et-petits-fruits.md`, `sources/25-durzan-annedda-coniferes.md`.
- §5-D, étape 17, et §6, « Chaque infusion » — **introuvable** (70 à 80 °C) : remplacé par le
  repère de l'œil (vapeur, aucune bulle du fond). Colonne Hors cible du §6 ramenée à « plus
  pauvre, on la boit quand même », seule lecture appuyée (et cohérente avec le §9-A).
  `sources/25-oms-scorbut-urgences.md`.
- §5-D, étape 19, infusions mesurées sans espèce, préparation ni saison — **confirmé**.
  `sources/25-oms-germination-sechage-robs-biere.md`, `sources/25-oms-scorbut-urgences.md`.
- §5-D, bière d'épinette — **corrigé** : la perte n'est pas imputée à la fermentation elle-même ;
  pour la bière, ce sont l'ébullition avant et le temps après. `sources/25-oms-germination-sechage-robs-biere.md`.
- §5-E et §9-C, germination — **corrigé** : trempage 12 h, pousse en quelques heures, vitamine
  au plus haut vers 30 h (au plus tard 48 h) et stable quatre jours, prêt à 1 à 2,5 cm ; plus
  chaud germe plus vite mais fait moins de vitamine ; légumineuses 30 à 50 mg/100 g de graine
  sèche, blé 8,8. « Tiède près du poêle » devient « température de la pièce ».
  `sources/25-oms-germination-sechage-robs-biere.md`.
- §5-F, étape 28, et §7, tableau — **confirmé** : diarrhée osmotique par la vitamine non
  absorbée, qui cesse à la baisse de dose. `sources/25-nasem-dri-vitamine-c-chapitre-complet.md`.
- §8, bloc 5, mal de caribou — **corrigé** : diarrhée au bout d'une semaine à dix jours, mort « en
  quelques semaines » (« after several weeks ») au lieu de 2 à 3 semaines.
  `sources/21-speth-spielmann-1983-stefansson-mal-de-caribou.md`, `sources/48-mal-de-caribou-signes.md`.
- §9-A, macération froide — **introuvable** : durée dite « une nuit », sans chiffre publié.
- §9-A, infusion de la veille — **introuvable** pour 24 h ; le sens est appuyé par le jus bouilli
  gardé un mois (moins du septième). `sources/25-oms-germination-sechage-robs-biere.md`.
- §9-B, écorce — **introuvable** pour sapin baumier et épinette noire ; écorce d'épinette blanche
  20 à 80 mg ajoutée. `sources/25-durzan-annedda-coniferes.md`.
- §9-E, fruits gelés sur la plante — **introuvable** pour la perte due à l'hiver sur la tige ;
  **corrigé** pour les valeurs par espèce (rosier aciculaire 1 481, chicouté 130, camarine 51,
  airelle vigne-d'Ida 21,2, canneberge sauvage 5,5 mg/100 g) ; la chicouté du corps passe de 80
  à 130. `sources/25-fao-kuhnlein-turner-aiguilles-et-petits-fruits.md`.
- Compression §3 et §4 — 27 septembre 2026 : 1 189 mots → 159 mots (§3 : 714 → 105 ; §4 : 475 → 54) ; matériel coupé : théière ou pot à couvercle, thermomètre de cuisine, sécateur ou couteau, passoire fine, pots ou sacs à aiguilles, paragraphes « ligne non négociable » et « ce qui ne figure pas dans ce tableau » ; §3 : durées du pool, rapport 28/48 mg, table des pertes et nuance enfant coupés (pertes déjà en §5-B, couvercle en §5-D et §9-A, pierres en §9-A, filtre serré du cynorrhodon en §9-E).
