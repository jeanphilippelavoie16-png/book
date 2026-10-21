> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 13. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 13 : Eau : puiser, filtrer, désinfecter

- **Tome :** 1 — Tenir
- **Fichier :** `chapitres/13-eau-puiser-filtrer-desinfecter.md`
- **Rôle :** 2 — Rédacteur
- **Date :** 2026-09-20
- **Longueur :** environ 4 700 mots utiles (5 377 mots bruts, syntaxe de tableau incluse)
- **État :** premier jet complet, prêt pour les rôles 3 et 4

---

## 1. Chiffres marqués [À VÉRIFIER]

| # | Valeur ou affirmation | Où, dans le chapitre | Pourquoi ce n'est pas sourcé |
| --- | --- | --- | --- |
| 1 | Salinité de surface du Saint-Laurent au large de la Côte-Nord, en g/L | §2, §8 | Pages de Pêches et Océans Canada consultées sans valeur chiffrée. Chercher dans les rapports annuels sur les conditions océanographiques de l'estuaire et du golfe |
| 2 | 30 m d'un système de traitement des eaux usées non étanche ; 15 m si le puits est scellé | §5-A étape 2, §6 | RPEP (RLRQ c. Q-2, r. 35.2) inaccessible : LégisQuébec et CanLII ont renvoyé des refus HTTP 403. Valeurs tirées d'un résumé de recherche, pas du texte réglementaire. **Article à citer** |
| 3 | Doublement de la dose de javel en eau trouble, colorée ou froide | §5-F étape 19 | Pratique répandue dans les guides, aucune source officielle canadienne trouvée. Le chapitre dit déjà de bouillir plutôt que de chlorer devant ce doute |
| 4 | Perte de titre de l'eau de Javel à l'entreposage : taux annuel, durée de fiabilité | §5-F étape 21, §6 | Seules des sources commerciales et européennes trouvées. Chercher du côté de la CNESST / SIMDUT ou d'un fabricant avec fiche technique |
| 5 | Durée d'entreposage recommandée d'une eau traitée en contenant fermé | §5-G étape 23 | Non trouvée sur les pages fédérales et québécoises consultées |
| 6 | Équivalence entre le test visuel de limpidité à 20 cm et une valeur en UTN | §5-D étape 11, §6 | Le seuil de 0,3 UNT est sourcé (INSPQ) ; c'est le test de terrain qui ne l'est pas |
| 7 | Rendement de la fonte de neige (L d'eau par L de neige) et bois consommé par litre bouilli | §5-I étape 33, §9 | Chercher chez Ressources naturelles Canada ou Environnement Canada (densité de la neige, pouvoir calorifique des essences boréales) |
| 8 | Rendement d'un alambic de fortune sur poêle à bois, en L/h | §9 | Aucune source. Possiblement à mesurer plutôt qu'à sourcer |
| 9 | Écart de performance entre charbon de bois de poêle et charbon actif | §9 | Affirmation qualitative sourcée nulle part ; la distinction est réelle mais à documenter |
| 10 | Mécanisme de la méthémoglobinémie du nourrisson liée au nitrate | §8 | La CMA de 10 mg/L en azote est sourcée (Santé Canada) ; la formulation du mécanisme ne l'est pas. Le document technique de Santé Canada sur le nitrate devrait la donner |
| 11 | Répartition des 4 L/personne/jour entre boisson, cuisson et hygiène | §5-G étape 24 | Le total de 4 L est sourcé (Sécurité publique Canada) ; la répartition 2 L + 2 L circule dans d'autres documents fédéraux sans citation retrouvée |

## 2. Contradiction entre deux sources officielles, à trancher

La fiche Manganèse de l'INSPQ affirme qu'« il n'existe pas de norme québécoise pour le
manganèse dans le Règlement sur la qualité de l'eau potable ». Le ministère de
l'Environnement publie une norme de 0,12 mg/L en vigueur depuis le 21 juin 2024. La
fiche INSPQ n'avait pas été mise à jour à la date de consultation.

Le chapitre retient la norme réglementaire de 0,12 mg/L et conserve la valeur guide de
0,06 mg/L de l'INSPQ comme seuil de prudence pour les nourrissons. Le vérificateur
technique doit confirmer la valeur et la date dans le texte même du RQEP, et transcrire
l'extrait dans `sources/13-quebec-manganese.md`.

Trois seuils voisins à ne surtout pas confondre au montage :
0,02 mg/L (esthétique, Santé Canada) · 0,06 mg/L (nourrissons, INSPQ) · 0,12 mg/L
(norme, RQEP).

## 3. Autre piège de vérification

Le nitrate se donne de deux façons — 45 mg/L exprimé en nitrate, 10 mg/L exprimé en
azote — et c'est la même exigence. Le chapitre donne toujours les deux. Ne pas
« simplifier » à une seule valeur à l'édition.

## 4. Rappels de sécurité de `CLAUDE.md` répétés dans ce chapitre

| Règle du tableau | Reprise ici |
| --- | --- |
| Génératrice : jamais dans un bâtiment, un garage ou sous un auvent | Encadré DANGER, premier bloc, avec le mécanisme du CO (gaz qui ne se voit pas, ne se sent pas, n'irrite pas) et l'avertisseur de CO comme seul moyen de détection. Repris aussi à §5-B étape 5 |
| Un contaminant ne change ni l'odeur, ni le goût, ni l'apparence | Transposé à l'eau dans l'encadré DANGER, deuxième bloc : 10 kystes de *Giardia* suffisent à infecter, et aucun sens humain ne les détecte. Même principe que la règle du botulisme, appliqué au bon danger |

Les autres règles du tableau (cuisson à 74 °C, foie et reins de cervidés, trichinellose,
tularémie, thuyone du cèdre, botulisme de type E, mal de caribou) ne s'appliquent pas à
ce chapitre et n'y ont pas été insérées, pour ne pas diluer.

## 5. Dangers nommés dans l'encadré, avec leur mécanisme

1. Monoxyde de carbone de la génératrice ou de la pompe thermique — gaz indétectable
   par les sens, symptômes en quelques minutes, pas de signal d'alarme.
2. Eau contaminée indiscernable d'une eau propre — dose infectieuse de 10 kystes.
3. Chlore presque sans effet sur *Cryptosporidium* — CT requis de 7 000 mg-min/L, paroi
   de l'oocyste résistante à l'oxydation.
4. Ébullition qui concentre les contaminants chimiques — nitrate et nourrisson.
5. Eau de Javel mélangée à un acide ou à de l'ammoniaque — dégagement de chlore gazeux
   et de chloramines.
6. Eau salée — le rein excrète plus d'eau qu'elle n'en apporte.

Le risque de chute à travers la glace est mentionné mais renvoyé au chapitre 54 plutôt
que mis dans l'encadré : il appartient à ce chapitre-là, et six entrées suffisent déjà
à charger l'encadré.

## 6. Relecteur humain

Le chapitre 13 ne figure pas dans la liste de relecture humaine obligatoire de
`CLAUDE.md`. **Relecture externe recommandée quand même**, par un technicien en hygiène
du milieu ou un inspecteur en santé environnementale d'un CISSS/CIUSSS, sur deux
sections précises :

- §5-H, désinfection choc du puits : on y manipule de la javel concentrée et on y
  calcule une dose à partir d'un volume de puits estimé.
- §8, encadré DANGER : formulation du mécanisme de la méthémoglobinémie et du mélange
  javel-acide, tous deux marqués [À VÉRIFIER].

## 7. Images requises

| # | Sujet | Cadrage | Format | Piste de production |
| --- | --- | --- | --- | --- |
| 1 | Puits tubé bien aménagé vs défaillant | Schéma en coupe, deux colonnes comparatives, distances annotées | Demi-page | À dessiner. Vérifier les distances (voir [À VÉRIFIER] n° 2) avant de les inscrire sur la planche |
| 2 | Chaîne des trois chaudières : brute, décantation, transvasement par-dessus le dépôt | Trois vignettes en séquence, vue de trois quarts, mains visibles | Demi-page | Photo de JP au chalet, ou dessin au trait |
| 3 | Échelle comparée organismes / pores de filtre | Planche à échelle logarithmique, fond clair, une couleur d'accent, barre du filtre à 1 µm | Demi-page | À dessiner. Chiffres déjà sourcés (INSPQ) |
| 4 | Trou de puisage sous la glace, couvercle isolé, matelas de neige | Vue de dessus rapprochée, un ustensile pour l'échelle | Quart de page | Photo de JP, l'hiver |
| 5 | Alambic de fortune sur poêle à bois | Coupe simplifiée, flèches de circulation de la vapeur | Quart de page | À dessiner |
| 6 | Contenants d'entreposage étiquetés et bidon de javel daté | Photo, lumière naturelle, étiquettes lisibles | Quart de page | Photo de JP |

Aucune image n'est reprise du web : rien à inscrire dans `images/credits.md` pour
l'instant.

## 8. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 3 — Le froid lui-même | Conduites gelées, protection du puits l'hiver |
| 4 — Panne majeure d'Hydro en janvier | Plus de pompe, plus de pression : on redescend puiser |
| 6 — Retombées radioactives | Ni l'ébullition ni la filtration courante n'enlèvent les radionucléides |
| 7 — Des enfants de 4 et 6 ans | Refus de boire une eau plate ou teintée, déshydratation d'hiver |
| 8 — Le stock permanent du chalet | Javel, cartouches de filtre, bidons : quantités et rotation |
| 9 — La liste de 72 heures | Les 48 L pour quatre personnes |
| 14 — Sans propane | Bouillir quand le réchaud est mort |
| 15 — Poêles à bois et rendement | Coût en bois de chaque litre bouilli |
| 27 — Soigner quand il n'y a personne | Giardiase, réhydratation |
| 28 — Hygiène et eaux usées | L'autre bout du problème : distance fosse-puits |
| 33 — Les enfants, la peur et la routine | Faire boire quand l'eau n'a pas bon goût |
| 46 — Castor | La hutte en amont de la prise d'eau, réservoir de *Giardia* |
| 54 — Pêche blanche | Percer et circuler sur la glace |
| 68 — Froid naturel | Entreposer l'eau sans faire éclater les bidons |
| 89 — Savon et chandelles | Lavage des mains qui protège le contenant d'eau traitée |

Tous ces numéros ont été vérifiés contre la liste des 89 chapitres. Aucun renvoi
vers un chapitre inexistant.

## 9. Notes pour l'éditeur

- Recoupement attendu avec le **chapitre 9** (les 4 L par personne par jour) et le
  **chapitre 8** (javel, filtres). Les deux sont traités ici en renvoi, pas en redite :
  le chapitre 13 dit comment traiter, les chapitres 8 et 9 disent combien stocker. Si
  le chapitre 9 répète le calcul des 48 L, garder celui du 9 et raccourcir ici.
- Recoupement avec le **chapitre 28** sur la distance fosse-puits. Décider lequel des
  deux porte le chiffre réglementaire ; l'autre renvoie.
- Le monoxyde de carbone apparaît déjà dans plusieurs chapitres du tome 1. C'est voulu :
  c'est une règle du tableau de `CLAUDE.md`, qui se répète partout où elle s'applique.
  Ne pas la couper en édition au nom de la non-redite.
- La section 9 comporte trois techniques (chaîne dégradée, filtre à sable, alambic).
  Si la mise en pages déborde, l'alambic peut passer en encadré séparé, mais pas
  disparaître : c'est la seule réponse au sel et à l'arsenic, et le chalet est sur le
  fleuve.

## Notes retirées du chapitre — 23 septembre 2026

Section 5-E, paragraphe d'arbitrage, version d'origine (remplacée dans le chapitre par une version sans attribution) :

> **Une minute ou cinq minutes : l'arbitrage.** Deux organismes officiels publient deux
> durées qui diffèrent d'un facteur cinq. L'INSPQ écrit que «l'ébullition de l'eau à gros
> bouillons pendant au moins 1 minute est la méthode recommandée » et Santé Canada, «faites
> bouillir l'eau pendant 1 minute avant de la boire ». Cette minute est justifiée organisme
> par organisme, et le plus coriace de la liste de l'INSPQ, l'oocyste de *Cryptosporidium*,
> tombe à 73 °C en une minute : 100 °C dépasse toutes ces cibles. La page *Tularémie* du
> gouvernement du Québec écrit, elle : «En forêt, buvez de l'eau embouteillée ou bouillie
> pendant cinq minutes ». Elle ne dit pas pourquoi cinq, et la tularémie ne figure sur
> aucune des listes d'organismes qui justifient la minute : sa bactérie, *Francisella
> tularensis*, «survit plusieurs mois dans un environnement humide et froid tel que l'eau » et «résiste également très bien à la congélation » ; la
> seule donnée de chaleur humide de cette fiche, 121 °C pendant 15 minutes, est une consigne
> d'autoclave, au-dessus du point d'ébullition, et ne se traduit pas en durée à 100 °C
> [À VÉRIFIER : destruction thermique de *F. tularensis* dans l'eau à 100 °C, durée ;
> aucune source officielle canadienne trouvée]. **Le livre retient donc cinq minutes partout
> où la tularémie est nommée** — castor, rat musqué, lièvre, soit le bassin versant décrit à
> la section 2 — non pas parce que cette valeur serait mieux documentée que l'autre, mais
> parce que c'est la plus haute des deux et qu'elle vient de la page qui traite précisément
> de ce risque-là, et que les quatre minutes de plus se paient en bois, pas en risque. Le
> filtre ne remplace pas ces cinq minutes : un pore de 1 µm arrête la plupart des bactéries,
> pas toutes, et la fiche du MELCCFP décrit «un très petit coccobacille ». Devant
> la tularémie, on bout. Les chapitres 44 (lièvre) et 46 (castor) appliquent la même durée.

Provenances retirées du texte (le fait reste imprimé, la source vit ici) :

- Cinq minutes d'ébullition en forêt (tularémie) : gouvernement du Québec, page *Tularémie*.
- Condition « à plus de 20 °C » pour les 30 minutes de javel, échelle de l'iode par température : INSPQ (guide santé-voyage) ; Santé Canada omet la condition de température.
- Colonne d'eau du puits, « Attendre 24 heures », purge jusqu'à disparition de l'odeur, analyses à 1 et 4 semaines : ministère de l'Environnement.
- Vaisselle et mains pendant un avis : Santé Canada les interdit ; Québec.ca et l'INSPQ les autorisent avec savon ou détergent.
- Seuil du manganèse 0,12 mg/L : Québec.
- Cible de 6 L + 6 L par personne par jour : Québec.ca.

## Passe légal et signes — 23 septembre 2026

### Municipal et légal retiré (texte d'origine, pour mémoire)

- Section 2 : « Avis d'ébullition municipal. » devient « Avis d'ébullition. »
- Section 2 : « et il est de précaution — ce qui ne le rend pas facultatif. » devient « et
  c'est ce qui fait sa valeur. » (le mécanisme — l'avis précède la preuve — reste).
- Section 2 : « La municipalité analyse après coup ; la famille boit pendant. » devient
  « L'analyse vient après coup ; la famille boit pendant. »
- Section 2 : « les pompes du réseau municipal » devient « les pompes de l'aqueduc ».
- Étape 37 : « l'eau du robinet n'est pas interdite : elle est interdite pour certains
  usages » devient « l'eau du robinet ne se bout pas pour tout : seulement pour ce qui finit
  dans la bouche ». Le tableau qui suit est inchangé.
- Étape 42 : « un problème d'eau municipale » devient « un problème d'eau de l'aqueduc ».

Gardés, parce que ce sont des mécanismes dits comme des faits et non des règles : les
distances puits–eaux usées (30 m / 15 m, étape 2, toujours `[À VÉRIFIER]`), les seuils
chimiques de l'eau (nitrate, plomb, arsenic…), la consigne de ne pas purger l'eau chlorée
dans la fosse (le mécanisme est écrit). Étape 40 (« l'une interdit… l'autre l'autorise ») :
gardée, ce sont deux consignes de santé, pas un règlement.

### Note de bas de page ajoutée

- [^1] méthémoglobinémie (section 8, nitrate) : peau et lèvres bleutées chez le nourrisson,
  puis troubles de la respiration et de la conscience, puis coma ; sang brun chocolat.
  Source : `sources/13-inspq-nitrates-fiche-methemoglobinemie.md` (INSPQ, fiche Nitrates /
  Nitrites, mise à jour juillet 2003).

### Erreur de fait corrigée au passage

Section 8 : « Le sang reste rouge, la pompe fonctionne, et l'oxygène ne se rend plus. » était
faux — la même fiche de l'INSPQ donne le sang « d'une couleur brun chocolat » comme critère
diagnostique. Remplacé par « Le cœur pompe, les poumons se remplissent, et l'oxygène ne se
rend plus. » La note de bas de page aurait contredit le texte sans cette correction.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/13-verifications.md` (20 drapeaux : 14 levés, 4 corrigés,
2 introuvables). Tous appliqués ; plus aucun drapeau dans le chapitre.

- §2 et §8 DANGER, salinité du fleuve face à la Côte-Nord : **27 à 29 g/L** (27 estuaire
  maritime, 29 golfe), plus douce en surface au printemps — `sources/13-universite-laval-salinite-saint-laurent.md`
- §5-A étape 2 et tableau §6, distances d'un puits : **30 m** d'un système non étanche,
  **15 m** si scellé (trou 10 cm plus large que le tubage, bentonite ou ciment-bentonite sur
  5 m) — `sources/13-rpep-article-17-distances-puits.md`
- §5-D étape 11 et tableau §6, test visuel à 20 cm : **corrigé** — l'œil ne voit un voile
  qu'au-dessus d'environ **5 UNT** ; pas d'équivalence avec 0,3 UNT — `sources/13-inspq-turbidite.md`
- §5-E, tularémie : **corrigé** — dans l'eau, *F. tularensis* meurt en **1 min à 56 °C**,
  aucune survivante après **45 s à 94 °C** ; les cinq minutes restent comme consigne pour
  l'eau bue en forêt — `sources/13-tularemie-inactivation-thermique.md` ; `sources/46-quebec-tularemie.md`
- §5-F étape 19, eau trouble, colorée ou très froide : **dose doublée (4 gouttes/L)** ; de 1
  à 10 UNT, chlore **8 fois** moins efficace — `sources/13-epa-desinfection-urgence-javel.md` ;
  `sources/13-cdc-yellow-book-desinfection-eau.md` ; `sources/13-inspq-turbidite.md`.
  Phrase dépendante corrigée dans « Quand l'eau est froide » (la consigne de doublement
  existe, mais sans durée)
- §5-F étape 21 et tableau §6, garde de la javel : **environ un an** depuis la fabrication,
  au frais et à l'obscurité — `sources/13-fabricant-javel-duree-de-conservation.md` ;
  `sources/13-epa-desinfection-urgence-javel.md`
- §5-F, iode et *Cryptosporidium* : confirmé, inactivation faible aux doses buvables —
  `sources/13-cdc-yellow-book-desinfection-eau.md`
- §5-I étape 34, neige : **4 à 10 %** d'eau, **10 à 25 L** de neige par litre ; fondre
  coûte **80 cal/g**, chauffer de 0 à 100 °C **100 cal/g** (près de deux fois le bois) —
  `sources/13-nsidc-neige-equivalent-en-eau.md` ; `sources/13-usgs-chaleur-latente-eau.md`
- §5-J étape 42, eau chaude et plomb : **corrigé** — le mécanisme est la chaleur, pas la
  stagnation dans le chauffe-eau — `sources/13-sante-canada-plomb-eau-chaude.md`
- §8 DANGER, javel + acide ou ammoniaque : confirmé ; ajouté : atteinte pulmonaire
  retardée de **24 à 48 h** (« severe breathing difficulties ») — `sources/13-canutec-sante-canada-melange-javel.md`
- §9 électrolyse : saumure **25 g/L** → solution **5 g/L** de chlore actif (appareil du
  commerce), à utiliser **dans les 24 h** ; intensité et durée d'un montage de fortune
  introuvables, non chiffrées — `sources/13-sswm-wata-electrolyse-saumure.md`
- §9 filtre à sable : couche biologique **jusqu'à 30 jours**, meurt après **48 h** sans eau
  neuve ; invisible — `sources/13-cawst-couche-biologique-filtre-a-sable.md` (le gel n'y est
  pas : non vérifié, gardé)
- §9 charbon : non activé **2 à < 300 m²/g**, activé à la vapeur (> 800 °C) **750 à
  1 100 m²/g**, **3 à 5 fois** plus d'adsorption — `sources/13-usfs-charbon-de-bois-vs-charbon-actif.md`
- §9 alambic : débit et bois au litre **introuvables** ; gardé le rapport de chaleur
  (vaporiser **540 cal/g**, environ cinq fois chauffer de 0 à 100 °C) — `sources/13-usgs-chaleur-latente-eau.md`
- §9 dessaler par le gel : salinité de la glace de première passe **introuvable** ;
  mécanisme gardé sans chiffre — `sources/13-nsidc-glace-de-mer-saumure.md`
- §9 soleil : **6 h** au moins, **2 jours** si couvert ; verre clair accepté, bouteilles
  teintées exclues (le texte excluait le verre à tort) — `sources/13-cdc-yellow-book-desinfection-eau.md` ;
  `sources/13-ecompendium-sodis.md`. « De novembre à février » non sourcé : remplacé par
  « en hiver »

Compression §3 et §4 — 27 septembre 2026 : 945 mots → 197 mots ; matériel coupé : chaudière de puisage, contenants de décantation, tissu de préfiltration, marmite à couvercle, source de chaleur indépendante, thermomètre de cuisson, contenants d'entreposage, analyse en laboratoire (reste en §5-H, §8, §9), avertisseur de monoxyde (reste en §8 et §9), pompe 12 V ; paragraphes « Le filtre est marqué… » et « À la maison, la moitié de ce tableau… » coupés (deux moyens de désinfecter : §9 et §5-F ; filtre à média qui fixe le plomb : §5-J et §8). §3 : températures létales, tailles des organismes et citation Cryptosporidium coupées (déjà en §5-D, §5-E et §6).

## Passe d'écriture (skill `ecriture`) — 15 octobre 2026

Numéros **actuels** dans cette section (ch. 10 = ancien 13). Texte d'avant la passe : commit
`32994d1`. Contrôle : `controle.py chapitres/10-… --avant <ce texte>`.

### Sources ajoutées

- §9 « Bouillir quand il n'y a pas de marmite », **contenant d'écorce sur les braises** (demande
  de JP : dire ce qui va au feu) : un contenant d'écorce de bouleau plein ne brûle pas ; seul le
  bord au-dessus du liquide est vulnérable ; tenu à l'écart des flammes, un plateau d'écorce a
  tenu **plus de cinq heures** directement sur les braises ; le chauffage direct demande moins de
  bois et de temps que les pierres chaudes (au moins deux fois moins, Holman et Egan 1985) ; un
  grand contenant d'écorce plie — `sources/13-speth-2015-bouillir-dans-l-ecorce.md` (Speth,
  *PaleoAnthropology* 2015, révisé par les pairs) ; recoupé par
  `sources/13-fm21-76-contenants-d-ecorce-et-pierres.md` (« will burn above the waterline unless
  you keep them moist or keep the fire low »).
- §9, **pierres chaudes** : pierres denses et sèches ; une pierre mouillée, poreuse ou à bulles
  d'air (grès, calcaire) éclate au feu — `sources/13-fm21-76-contenants-d-ecorce-et-pierres.md`.
  « Feuilletée » vient du premier jet : non sourcé à part, gardé (même mécanisme : l'eau prise
  entre les couches).
- « Tout contenant de métal va sur le feu (boîte de conserve, chaudière, bac) » : sans chiffre,
  pas de source cherchée.

### Retraits qui touchent au fond

- « à 90 km du premier médecin » (§9, « La marge d'erreur ») : la distance du chalet de JP, non
  sourcée ; coupée (règle du livre ouvert).
- « Un enfant de 4 ans », « les enfants de 4 et 6 ans » : remplacés par « un jeune enfant », « de
  jeunes enfants ». Les âges qui sont des seuils restent (moins de 6 ans pour le plomb, moins de
  3 mois pour le nitrate).
- §7, bougie fendue : « la colle bouche le pore autour et laisse la fissure ouverte » coupé
  (dire ce qui marche : changer de bougie).
- §5-J étape 42 : « un filtre à sédiments, si fin soit-il, ne fait rien contre un métal
  dissous » devient « seul ce média [fait pour réduire le plomb] retient un métal dissous ».
- Les avertissements redits hors de l'encadré (monoxyde au §9, ébullition du plomb à l'étape 42
  et au §7, chlore et *Cryptosporidium* au §2, sel du fleuve au §9) sont coupés ; ils restent
  dans le §8. La génératrice reste à l'étape 5 et au §8 (rappel de `CLAUDE.md`).

### Ajouts sans chiffre

- §2 : « le CT requis (concentration de chlore × temps de contact) » : définition du terme.
- §8 : « les poumons se remplissent **d'air** » : précision, pour qu'on ne lise pas un œdème.

## Appels de planches — 15 octobre 2026 (passe du tome 1, lot p2)

Le chapitre n'est pas repassé : c'est le modèle approuvé par JP. Deux vérifications seulement.

- **Planches appelées dans le texte** : les quatre n'avaient pas d'appel. Posés dans le paragraphe
  d'ancrage de chacune, au §9 : « (planche 10-01) » (« La chaîne complète, version dégradée. », après
  « on laisse refroidir couvert ») ; « (planche 10-02) » (« Puiser un puits… », après le clapet) ;
  « (planche 10-07) » (« Le filtre à sable. », après l'assiette percée) ; « (planche 10-03) »
  (« L'alambic de fortune. », après « tombe dans le bol »). Les ancres de `placements-tome-1.json` ne
  bougent pas.
- **La photo de la hutte de castor** (`images/photos/manquantes/10-hutte-castor.jpg`) est ancrée sur
  l'étape 1, qui nomme la « hutte de castor ». Les photos n'ont pas de numéro d'appel dans le livre (la
  photo du lichen du ch. 4 non plus) : l'appel est le mot de l'étape. Rien à changer.
- **`controle.py --avant`** : rien de nouveau. 7 574 → 7 582 mots (les quatre appels), 2 tirets (titre et
  ligne de tome), la même redite qu'à l'approbation (la génératrice à l'étape 5 et au §8, rappel de
  `CLAUDE.md`), aucun invariant disparu.

## Refonte au gabarit à sept sections, pictogrammes de danger — 18 octobre 2026

Chapitre test demandé par JP avant la refonte du tome 1. Texte d'avant : `git show 8f823ec:chapitres/10-eau-puiser-filtrer-desinfecter.md`.
Contrôle : `controle.py --avant` : 7 582 → 8 230 mots (les sous-étapes de la désinfection du puits, de la buse, du
filtre à sable et de l'alambic ; les planches sont maintenant appelées repère par repère), 2 tirets (titre et ligne de
tome, comme le ch. 15), 0 « § », 0 mot banni.

### Ce qui a changé

- **Sept sections.** « Pourquoi ça marche » coupé : le tamis du filtre va à l'étape 11 ; le chlore qui doit toucher
  le microbe, à l'étape 19 ; la chaleur et le gros bouillon, à l'étape 14 ; ce qui est dissous et l'ébullition qui le
  concentre, à l'étape 27. La section 8 Danger est sortie (voir plus bas, où chaque bloc est allé). La Variante
  d'urgence devient la section 7.
- **Rien sous le titre que `**Les deux**`.** La note de lieu (maison : sous-section J ; chalet : A à I) est sortie ;
  la sous-section « À la maison » et la section 2 disent où vaut chaque étape.
- **Section 2** : seulement les situations, avec leurs étapes. La liste « C'est un mauvais choix » est sortie ; ce
  qu'elle apprenait est allé à l'étape qui sert : le sel du fleuve (étape 1), la contamination chimique (étape 27),
  la chloration seule d'une eau de surface, d'une eau froide ou trouble (étape 19), la suie (étape 39), les
  retombées (étape 1, renvoi au ch. 4).
- **Pas de série orange.** Rien dans ce chapitre ne se joue en minutes (`plan/premieres-minutes-inventaire.md` l'avait
  déjà conclu : « l'avis d'ébullition n'est pas une affaire de minutes ; le remplissage pendant que la pression tient
  est aux ch. 1 et 3 »). La giardiase se déclare de 3 à 25 jours plus tard ; aucune pastille ne se sourcerait.
- **Logigramme neuf** : `images/logigrammes/10-eau.json` (double page, pas orange, boîtes « geste »), rendu en
  `10-eau.svg`, `.pdf`, `.png` et `10-eau-livre.svg` (`--sans-entete --svg`), contrôle 0 erreur. Page de gauche :
  l'eau du robinet (coule-t-elle, avis de non-consommation, avis d'ébullition, sinon le robinet froid de la vieille
  maison). Page de droite : l'eau qu'on puise (eau douce ou fleuve, puiser, décanter, feu, javel, rien). Aucun
  avertissement redit. Ancré sur la dernière ligne du Matériel (`placements-tome-1.json`, clé `"logigramme"`).
- **Procédure découpée** : siphon (étape 10, avec la petite planche 10-08 faite en parallèle), désinfection du puits
  (étapes 28 à 35, une étape par geste, sous-étapes pour verser et mélanger), levée de l'avis (étape 47), buse, filtre
  à sable et alambic en sous-étapes qui suivent les repères des planches refaites le 18 octobre.
- **Repères des planches** (numérotation de l'agent des planches, 18 octobre) : 10-01, repères 1 à 3 aux étapes 8 à 10,
  4 à l'étape 14, 5 à l'étape 15 ; 10-08, repères 1 à 3 à l'étape 10 ; 10-02, repères 1 à 7 dans « Puiser un puits
  quand la pompe est morte » ; 10-07, repères 1 à 12 dans « Le filtre à sable » ; 10-03, repères 1 à 8 dans
  « L'alambic de fortune ». L'étape 14 rappelle « planche 10-01, repère 4 » : la 10-08 a ses propres repères 1 à 3
  entre les deux, et « repère 4 » seul se lirait sur la mauvaise planche.
- **Retiré** : la ligne « avec thermomètre : 73 °C pendant 1 min » des Points de contrôle, parce que le virus de
  l'hépatite A demande environ 85 °C (`13-inspq-avis-ebullition.md`) : 73 °C ne couvre que *Cryptosporidium*. La
  « hutte de castor à 300 m » (exemple sans source). « Un lac boréal est à 4 °C une bonne partie de l'année » (aucune
  source : la fiche INSPQ donne le CT à 3 à 5 °C, pas la température des lacs ; l'étape 19 dit maintenant de mesurer
  l'eau au thermomètre). « Une eau de lac à 8 °C » (exemple). L'avertisseur de CO dans « Ce qui ne se remplace pas » :
  il est dans la page du pictogramme `co`. Le « nœud » de la ficelle lestée : la longueur mouillée donne la colonne
  d'eau directement.
- **Corrigé à la source** : l'iode (étape 23). Le texte disait « contre-indiqué pendant la grossesse (goitre néonatal),
  en cas de maladie thyroïdienne, même contrôlée par médicament » et « moins d'un mois ». La source enregistrée
  (`13-cdc-yellow-book-desinfection-eau.md`) dit : maladie thyroïdienne instable ou allergie connue, jamais ; femme
  enceinte, pas sur une longue période (thyroïde du fœtus) ; tout le monde, quelques semaines au plus (OMS). Le
  texte suit maintenant la source.
- **Volume du puits** : « du puits et de la plomberie » devient « du puits » : le calcul et le tableau du ministère
  ne comptent que la colonne d'eau.

### Chiffres et faits nouveaux, avec leur provenance

| Fait | Où | Source |
| --- | --- | --- |
| Génératrice à au moins 6 m du bâtiment, échappement à l'opposé des portes et fenêtres | Étape 6 | `10-sante-canada-generatrice-distance.md` |
| Bactéries courantes inactivées sous 65 °C en moins d'une minute ; hépatite A vers 85 °C | Étape 14 | `13-inspq-avis-ebullition.md` |
| Désinfection du puits pas à pas : nettoyer le fond à la puisette, verser, mélanger en rinçant la paroi au boyau branché sur le robinet le plus proche, ouvrir les robinets jusqu'à l'odeur, arrêter la pompe, 24 h, purger, rincer chaque robinet | Étapes 31 à 34 | `10-melcc-desinfection-puits-procedure.md` (nouvelle, avec le PDF) ; recoupe `13-melcc-qualite-eau-de-mon-puits.md` |
| Contrôle du calcul : 540 mL de javel pour 30 m d'eau dans 152 mm (le livre : environ 0,5 L pour 28 m dans 150 mm) ; × 5 pour un puits neuf | Étapes 29 et 30 | `10-melcc-desinfection-puits-procedure.md` |
| Avis de non-consommation : bouillir ne règle rien ; l'eau du robinet ne sert qu'à la chasse d'eau | Étape 43 | `10-quebec-contamination-penurie-eau-potable.md` ; `10-quebec-avis-ebullition.md` ; `13-inspq-avis-ebullition.md` (« d'aucune utilité dans la gestion d'une contamination chimique ») |
| Chauffe-eau : 180 à 280 L selon 40 ou 60 gallons | Étape 49 | `10-chauffe-eau-residentiel-volume.md` |
| Filtre à sable : sortie du boyau 5 cm plus haut que le sable ; l'eau s'arrête à la hauteur du bout du boyau | Section 7, « Le filtre à sable » | `13-cawst-couche-biologique-filtre-a-sable.md` et le manuel `13-cawst-2009-biosand-filter-manual.pdf` (section 3.5 et « The standing water layer will be at the same height as the end of the outlet tube ») |
| Alambic : enlève aussi le nitrate | Section 7, « L'alambic de fortune » | `13-sante-canada-traitement-eau-puits.md` (distillation : nitrates, nitrites, arsenic, manganèse) |

Les autres chiffres sont ceux d'avant, déjà sourcés (sections plus haut), redits sans changement.

### Pictogrammes posés (étape → id)

| Étape | Id | Ce qui est propre au chapitre |
| --- | --- | --- |
| 2 (« Puiser en amont ») | `selles` | Castor, rat musqué, orignal en amont ; 10 kystes de *Giardia*, 8 × 14 µm |
| 6 (pompe sur génératrice) | `generatrice` | 6 m, échappement à l'opposé ; jamais dans un bâtiment, un garage ou sous un auvent |
| 19 (juger l'eau avant de chlorer) | `selles` | Chlore contre *Cryptosporidium* : CT 7 000 ; filtre à 1 µm ou ébullition |
| 20 (doser la javel) | `chimie` | Ni vinaigre, détartrant, nettoyant à cuvette, ammoniaque, urine ; seringue et contenant réservés |
| 27 (analyse du puits) | `poison` | Pas de biberon avec un puits jamais analysé ; nitrate 10 mg/L en azote ou 45 en nitrate, avant 3 mois (note) ; bouillir concentre |
| 36 (percer sous la glace) | `glace` | Renvoi aux épaisseurs du ch. 15, étapes 40 à 42 (pas de chiffre redit) |
| 40 (fondre la neige avant de la boire) | `froid` | Manger la neige refroidit (venu de l'ancienne section 9) |
| 48 (vieille maison) | `plomb` | Entrées de service 1940 à 1955, jusqu'aux années 1970 ; 0,005 mg/L ; purge, eau froide, aérateur, filtre, jamais la marmite |
| Section 7, « Bouillir à la maison sans cuisinière » | `co` | Barbecue et réchaud dehors, même pour une longue ébullition |
| Section 7, « Bouillir quand il n'y a pas de marmite » | `pas-au-feu` | Pas de métal galvanisé ni peint sur le feu |
| Section 7, les pierres chaudes | `projection` | Pierre mouillée, poreuse ou feuilletée qui éclate |
| Section 7, hypochlorite de calcium | `chimie` | Granules seuls, loin de l'huile, des guenilles et du carburant |
| Section 7, électrolyse | `vapeurs`, `chimie` | Hydrogène sous un couvercle ; chlore à la surface |

`glace`, `froid`, `co`, `pas-au-feu`, `projection` et `vapeurs` ne sont pas dans la colonne « Chapitres » de
l'inventaire pour le ch. 10 : à ajouter à `plan/dangers-inventaire.md`, section 1.

### Ce que l'ancienne section 8 Danger est devenue

- Génératrice et CO → étape 6 (`generatrice`) ; le barbecue et le réchaud → section 7 (`co`). Le mécanisme du CO
  (sans odeur, pas d'alarme, l'avertisseur seul) → page du pictogramme `co`.
- Eau contaminée qui a l'air propre, 10 kystes → étape 2 (`selles`).
- Chlore et *Cryptosporidium*, CT 7 000 → étape 19 (`selles`).
- Bouillir concentre le chimique ; nitrate et nourrisson, méthémoglobine, note des signes → étape 27 (`poison`, note
  [^1] gardée). Le mécanisme du nitrite dans le sang → page `poison`.
- Le plomb : purge, filtre, jamais la marmite → étape 48 (`plomb`).
- La javel ne se mélange à rien → étape 20 (`chimie`). Le chlore et les chloramines, et l'atteinte des poumons 24 à
  48 h plus tard → page `chimie` (inventaire, section 2.9, qui cite ce chapitre) : pas redits dans l'étape.
  « La javel dans l'eau, jamais l'inverse » → l'étape dit « la verser dans l'eau ».
- L'eau du fleuve → étape 1, sans pictogramme (inventaire, section 4).

### [À VÉRIFIER]

Aucun dans le texte. Deux points pour l'agent des planches :
- 10-08 montre le boyau « couché au fond de la chaudière pleine » ; le texte dit de le plonger sans toucher le dépôt,
  puisque c'est la chaudière qu'on décante.
- 10-01 : la seconde chaudière est posée plus bas que la première (le texte le dit, étape 9) ; vérifier que le dessin
  le montre.

### Renvois corrigés dans les autres chapitres

- ch. 8 : « ch. 10, étape 22 » → 24 (bidon avec vide d'air) ; « étape 12 » → 14 (gros bouillons) ; « étapes 18 et
  19 » → 19 à 21 (javel en eau froide).
- ch. 27 : « ch. 10, section 2 » → étape 2 (castor et rat musqué en amont).
- ch. 29 : « ch. 10, section 8 » → étape 27 (nitrate du puits).
- ch. 37 : « ch. 10, section 9 » → section 7 (pierres chaudes). Fichier en CRLF, écrit tel quel.
- ch. 84 : « 30-I » → étapes 36 à 41 (deux fois) ; « 30-H » → étapes 27 à 35 ; « 30-E et 5-I » → étapes 39 à 41.
  Fichier en CRLF, écrit tel quel.
- `design/epreuves-livre/placements.json` (ancien fichier, clé 10) : les quatre ancres suivent le nouveau texte, format
  compact gardé.

## Corrections après la vérification technique, 18 octobre 2026

Rapport : `suivi/10-technique.md` (18 écarts, 20 NON RETROUVÉ, 3 renvois faux, logigramme). Toutes les corrections
faites à la source. `controle.py` : 8 567 mots, 2 tirets (titre et ligne de tome), 0 « § », 0 mot banni ; un
`[À VÉRIFIER]`.

### Sources ajoutées

- `10-cawst-2011-fiches-traitement-eau-domicile.md` (+ PDF) : décanter, temps de contact de la javel en eau froide,
  filtres à membrane et virus, UV, désinfection solaire, filtre de céramique fêlé.
- `10-montreal-levee-avis-ebullition-2026-03.md` (+ page) : les gestes à la levée de l'avis.
- `10-noaa-cameo-hypochlorite-de-calcium.md` (+ page) : les granules allument le bois, l'huile, les vêtements ; le
  chlore avec un acide ; l'explosif avec l'urine ou l'ammoniaque.
- `10-savemyexams-electrolyse-saumure.md` (+ page) : électrodes de carbone, chlore à une électrode, hydrogène à l'autre.
- `10-eboulements-desinfecter-puits-artesien.pdf` et ajout à `10-melcc-desinfection-puits-procedure.md` : les causes
  de contamination d'un puits ; coliformes totaux au-dessus de 10 par 100 mL.
- Ajout à `13-cawst-couche-biologique-filtre-a-sable.md` : laver le sable sans aller jusqu'à l'eau claire, le test du
  pot, le sable trop lavé, la couche vivante dans le 1 ou 2 cm du dessus, le « swirl & dump ».
- Déjà au dossier, maintenant cités : `10-epa-hypochlorite-calcium-et-redosage.md` (recette, 15 minutes) ;
  `43b-us-army-fm3-05-70-survival-2002-texte.txt` (« Eating snow or ice can reduce body temperature and lead to more
  dehydration. Snow or ice are no purer than the water from which they come ») ;
  `10-sante-canada-avis-ebullition-lignes-directrices.html`, section A.6 (bébés lavés à la débarbouillette ; glace et
  aliments crus jetés) ; `10-melccfp-l-eau-de-mon-puits.pdf` (une eau limpide, inodore et bonne au goût peut contenir
  des substances) ; `13-inspq-sante-voyage-eau.md` (*E. coli*, 0,2 à 0,4 µm).

### Les écarts, point par point

1. **Réserve d'eau (écart grave)** : 6 L + 6 L par personne **pour 72 heures**, soit 4 L par jour. Étape 26 :
   16 L par jour pour quatre, 48 L pour 72 h, 480 L par mois (30 × 16), 24 bidons de 20 L (480 ÷ 20). Points de
   contrôle « Avant l'hiver » : 48 L pour quatre sur 72 h. Buse : 16 L ÷ 2,5 L = 6,4, donc 7 voyages. « Ce qu'on
   perd » : la « deuxième corvée à temps plein » et la bûche (sans source) sortent.
2. **Filtre à 1 µm** (étapes 11 et 14, Matériel) : il arrête *Cryptosporidium* et *Giardia* ; il laisse passer une partie
   des bactéries (*E. coli* 0,5 µm de large, 0,2 à 0,4 µm pour la retenir) et les virus ; on désinfecte toujours après.
3. **Virus** : « les filtres portatifs courants » ne les retiennent pas ; seule l'ultrafiltration (0,01 à 0,1 µm) le
   fait (CAWST). « Ce qui ne se remplace pas » : un filtre contre les virus ne se fabrique pas.
4. **Redosage** : 15 minutes (EPA), étape 22 et Points de contrôle.
5. **Iode, grossesse** : « pas longtemps » (CDC : « for prolonged periods »), sans chiffre.
6. **Javel** : on lit et on écrit la **date de fabrication** (code du fabricant : année sur deux chiffres, puis jour de
   l'année).
7. **999 kystes sur 1 000** retirés (chiffre de l'usine) ; l'étape 12 garde les 0,3 UNT comme condition où la
   filtration retient le mieux, sans pourcentage.
8. **Sable** : laver le gravier jusqu'à l'eau claire, pas le sable ; test du pot ; sable trop lavé.
9. **Débit qui tombe** : paume à plat, en rond, à peine, puis puiser l'eau sale ; plus de grattage de 2 ou 3 cm.
10. **Hypochlorite de calcium** : recette EPA : une cuillère à thé comble (environ 7 g) dans 7,5 L (2 gallons
    américains = 7,57 L) → environ 500 mg/L ; 1 pour 100 (100 mL pour 10 L).
11. **Électrolyse** : « l'utiliser dans les 24 heures ».
12. **Goût** : « une eau limpide, sans odeur et bonne au goût peut en contenir » (au lieu de « aucun des cinq n'a de
    goût », faux pour le manganèse).
13. **Manganèse** : au-dessus de 0,06 mg/L, pas d'eau du puits pour les biberons ; au-dessus de 0,12, pour aucun
    nourrisson.
14. **Bandelettes 0 à 200 mg/L** : le puits neuf (250 mg/L) se lit sur l'eau diluée de moitié avec de l'eau bouillie,
    chiffre doublé (étape 28, Points de contrôle). Arithmétique, pas de source à chercher.
15. **Volume du puits** : arrondi **vers le haut**.
16. **Javel en millilitres** : 0,2 mL par litre (0,4 mL à double dose), à la seringue ; le Matériel dit de compter les
    gouttes d'un compte-gouttes dans 1 mL. Les « 2 gouttes » sortent du texte et du logigramme.
17. **Alambic** : laisse dans la marmite « ce qui ne s'évapore pas ».
18. **Uranium** retiré de la liste de l'alambic (étape 27 et Points de contrôle : « une autre source ; pour le nitrate,
    l'arsenic et le plomb, l'alambic »).

En plus, trouvé dans la fiche CAWST : **javel en eau froide**, 1 h entre 10 et 18 °C, 2 h ou plus sous 10 °C (étape
21, Points de contrôle, logigramme). L'étape 21 dit « au moins 1 heure dans une eau plus froide » que 20 °C : la plage
de 18 à 20 °C, que ni l'INSPQ ni CAWST ne couvrent, prend la plus longue des deux. L'iode devient « quand il n'y a ni feu
ni javel ».

### Les NON RETROUVÉ

| # | Décision |
| --- | --- |
| 1 (20 ou 30 cm) | Chiffre et raison coupés : « sous la surface, sans racler le fond » |
| 2 (12 à 24 h) | Source CAWST : « de quelques heures à un jour, plus si elle est trouble » ; l'argile la plus fine ne tombe pas ; un jour de repos fait mourir une partie des bactéries |
| 3 (trois ou quatre épaisseurs) | « Plié en plusieurs épaisseurs » |
| 4 (2 ou 3 cm au fond) | « Arrêter quand le dépôt commence à monter vers le boyau » |
| 5 (UV) | CAWST : moins de 5 UNT, décantée et filtrée avant, lampe changée chaque année ; « rien ne le signale » et la comparaison sortent |
| 6 (deux ou trois fois) | « Plusieurs fois » |
| 7 (positif deux fois) | Les causes du document municipal (couvercle, scellement, butte, fosse, fumier) |
| 8 (manger la neige) | Manuel de survie de l'armée américaine (`43b-…`) ; la phrase suit la source |
| 9 (levée de l'avis) | Communiqué de Montréal et Santé Canada |
| 10 (plomb) | Chasse d'eau, soudures, raison de l'aérateur : coupés |
| 11 (coliformes totaux) | Document municipal (Lac-Sainte-Marie) : la ligne est réécrite |
| 12 (filtre qui coule plus vite) | CAWST, filtre de céramique : fêlure souvent invisible ; « pli crevé » coupé |
| 13 (une bûche de plus) | Coupé |
| 14 (granules « des années ») | Coupé : aucune durée dans les sources |
| 15 (feu des granules) | NOAA CAMEO ; pictogramme `incendie` (feu), `chimie` (acide, urine) |
| 16 (électrolyse) | Mécanisme et carbone : manuel de chimie. **Le métal d'une électrode d'acier ou de cuivre qui se dissout : `[À VÉRIFIER]`** |
| 17 (« hors gel ») | Coupé |
| 18 (uranium, serpentin) | L'uranium sort ; « on récupère plus de vapeur » sort |
| 19 (soleil) | CAWST : bouteille de plastique, secouée, sur une surface qui renvoie le soleil (et pas une surface sombre), jamais à l'ombre, 6 h ou 2 jours, pas sous la pluie ; méthode faite pour 15 à 35 degrés de latitude ; ne suffit pas contre *Cryptosporidium* |
| 20 (40 mm, 1,5 à 2 m) | Écrit comme un choix de construction (« qui descend librement dans le tubage, par exemple ») ; l'arithmétique suit |

### Renvois

- « ch. 48 (lièvre) et 50 (castor) » devient « Le ch. 50 (castor) applique la même durée ».
- « (rendements : ch. 87) » coupé.
- « (ch. 94) » devient « (lever l'écorce : ch. 94) » : la récolte de l'écorce y est ; le contenant n'est décrit nulle part.

### Noms latins

La règle du cadre gagne : *Castor canadensis*, *Ondatra zibethicus*, *Alces americanus*, *Giardia lamblia* (devient
*Giardia*) et *Francisella tularensis* sortent du texte. Restent les noms de microbes qu'on emploie tels quels :
*Giardia*, *Cryptosporidium*, *E. coli*.

### Pictogrammes

- Hypochlorite de calcium : `incendie` (les granules allument le bois, l'huile, les guenilles) et `chimie` (un acide
  en dégage du chlore ; l'urine ou l'ammoniaque). À ajouter au ch. 10 dans l'inventaire, avec les six de la section
  précédente.
- Serpentin qui gèle et se bouche : aucune source, et le texte ne le dit pas : rien d'ajouté.

### Logigramme

- p1 : « sous la surface, sans racler le fond » ;
- p2 : « Laisser reposer l'eau de quelques heures à un jour… », sans condition ;
- q5o : filtre à 1 µm sans « s'il y en a un », 0,2 mL par litre, 30 min, 1 h, 2 h selon la température ;
- q5n : l'iode ajouté (étape 23) ;
- q2n : « Bouillir ne lui enlève pas le sel » sort.

Régénéré (`10-eau.svg`, `.pdf`, `.png`, `10-eau-livre.svg`), contrôle 0 erreur, PNG regardé.

### Pour l'agent des planches

- **10-01, repère 1** : « laisser reposer de 12 à 24 h » devient « laisser reposer de quelques heures à un jour ».
- **10-07, repère 7** : « recommencer jusqu'à l'eau claire » devient « arrêter quand l'eau est encore un peu sale ».
  Le gravier, lui, se lave jusqu'à l'eau claire (repère 4).
- **10-07, repères 11 et 12** : « gratter à plat 2 ou 3 cm du dessus » et « laisser le lit dessous en place » deviennent
  « frotter à peine le dessus, la paume à plat, en rond » (11) et « puiser l'eau sale » (12). La vue « Quand le débit
  tombe » montre une paume ou un petit contenant qui puise, plus une gratte.
- **10-03, repère 7** : « au lieu de 2 et 3 » devient « au lieu de 1, 2 et 3 » (le serpentin remplace le bol, le
  couvercle à l'envers et son creux).
- **10-08** : le boyau du repère 1 ne touche pas le dépôt ; le seau du bas porte le coton de l'étape 9 (le texte dit
  de descendre le bout « sur le coton de la chaudière du bas »).

## Édition, 18 octobre 2026

Rôle 5, éditeur (n'a pas écrit le chapitre). Lu au complet : `.claude/cadre-agents.md`, `CLAUDE.md`, le skill
`ecriture` (règle 0 et tableau des corrections de JP, dont la ligne du 18 octobre sur les tournures bizarres),
`gabarit-chapitre.md`, `suivi/10-technique.md`, cette fiche. Aucun contenu technique neuf, aucun chiffre changé.

`controle.py` : 8 567 mots avant, 8 740 après (les phrases ont repris leurs verbes et leurs articles) ; 2 tirets
avant et après (titre et ligne de tome, hors texte) ; 0 « § » ; invariants : rien n'a disparu.

**Bilan** : 125 passages touchés, environ 190 phrases réécrites ou coupées. Aucune étape fusionnée ni coupée : la
numérotation 1 à 49 ne bouge pas, et les renvois des autres chapitres (ch. 8, étapes 14 et 24 ; ch. 27, étape 2 ;
ch. 29, étape 27 ; ch. 37, section 7 ; ch. 84, étapes 27 à 35, 36 à 41, 39 à 41) tombent toujours juste. Le
logigramme `images/logigrammes/10-eau.json` n'est pas touché (ses renvois sont justes, ses boîtes sont des phrases).

### Ce qui a été fait, par famille

- **Gabarit** : sept sections dans l'ordre, rien sous le titre que la ligne de lieu, pas de section Danger ;
  chaque pictogramme `{!id}` ouvre la phrase de l'étape où le danger se présente (vérifié un par un).
- **Chose qui pense, parle ou décide** : « l'analyse voit », « la bandelette lit », « l'analyse dit », « ce volume
  quotidien décide », « Demande de l'eau bouillie » (en-tête du tableau), « tous les robinets ont senti le chlore »,
  « une eau qui sent… demande une autre source », « L'hiver donne deux fontes ».
- **Consigne au présent qui décrit ou au pronominal** : l'iode (« n'en boit pas »), la dose double (« reçoit le
  double »), « on ne boit pas l'eau du robinet », « L'eau du robinet ne sert plus qu'à », « l'eau bouillie se
  garde », « les fruits qui se mangent crus », « ne se devine pas », « il ne se fabrique pas ».
- **Ordre pas naturel** : le code de la javel (« après les lettres de l'usine, viennent… »), le nitrate (« porter
  l'oxygène au-delà de 10 mg/L »), l'électrolyse (« tire d'une saumure… une solution »), « Faire bouillir le matin
  l'eau de la journée », « on dose à l'aveugle le chlore fait maison ».
- **Loi en formule, opposition fabriquée, chute** : « Le filtre est un tamis », « Le charbon du poêle n'est pas du
  charbon actif : il offre… », « doubler la dose ne rattrape ni le trouble ni… », « Un nouveau choc ne règle pas la
  cause », « c'est un dosage à l'aveugle, pire que de faire bouillir », « un chronomètre mal parti donne une
  gastro-entérite », « à l'œil, l'eau reste parfaite ».
- **Code et étiquettes** : « sans le reste de la chaîne », « La remplacer par la hauteur », « une main de grosse
  pierre », « attachée deux fois », « sans enfoncer le dessus du sable plus creux », « devant un filtre fin »,
  « Pas de métal galvanisé ni peint » (sans verbe), « pour ce qui ne tient pas la flamme ».
- **Mots de métier et notations** : « CT » (expliqué en mots : la concentration multipliée par le temps),
  « oocyste », « protozoaires », « média », « choc » (devient « la désinfection du puits »), « purger », « colmaté »,
  « à contre-courant », « une fois par période d'usage », « seuil » (mot banni, dans la section 6), « 5 µg/L, soit
  0,005 mg/L » (une seule unité, comme partout ailleurs dans le chapitre).
- **Gloses de quelques mots** (pas de fait neuf) : l'eau brute, le kyste de *Giardia*, l'entrée de service, la
  bougie de céramique.
- **Glossaire** : « seau » devient « chaudière » partout (glossaire, arbitrage *chaudière* contre *seau*).
- **Répétition** : étape 5 (« sans prendre ce qui flotte », déjà à l'étape 4) ; étape 25 (la recontamination dite
  deux fois) ; étape 41 (les 5 minutes, données à l'étape 14 : renvoi seul) ; Matériel et étape 18 (« non parfumée,
  sans épaississant ni détergent » gardé au Matériel seulement ; « perd son chlore » gardé à l'étape 18) ; le
  Matériel des bandelettes (« ne se fabriquent pas », dit dans « Ce qui ne se remplace pas ») ; le filtre à sable
  (« désinfecter l'eau qui sort » pendant le premier mois et après le nettoyage : la puce « Faire bouillir l'eau qui
  sort » le dit pour toujours) ; « On monte la réserve à l'automne » (ligne « Avant l'hiver » des Points de
  contrôle) ; « Le goût » de « Ce qu'on perd » (renvoi à l'étape 17) ; « Sans bandelette… » de l'électrolyse
  (réduit à la consigne, le reste est dans « Ce qui ne se remplace pas ») ; la ligne « Maison sur l'aqueduc bâtie
  entre 1940 et les années 1970 » de la section 6 (aucun signe à observer, redite de l'étape 48 et de la ligne des
  Points de contrôle) ; « qui a un lac et un poêle » (étape 49, justification que le lecteur connaît).
- **Gardé après examen** : « Ce qui ne se remplace pas » (titre commun à 32 chapitres) ; « du côté d'où vient le
  vent » réécrit en « du côté où la fumée ne va pas » (même consigne, sans « d'où ») ; les oppositions réelles
  signalées par le script (les granules ne brûlent pas mais allument ; l'alambic garde ce qui ne s'évapore pas mais
  laisse passer ce qui s'évapore plus vite) ; les « tout / toute » qui veulent dire « tout » ; « de moins de 6 ans »
  (un fait sur le plomb, pas l'âge d'un enfant).

### Ancres

- `design/epreuves-livre/placements-tome-1.json`, clé `"10"`, photo `10-hutte-castor` : « 2. **Puiser en amont de
  tout ce qui vit** » devient « 2. **Puiser en amont de tout ce qui peut salir l'eau** » ; la légende « Toute eau
  prise en aval, glace comprise, bout cinq minutes » (consigne au présent) devient « Faire bouillir cinq minutes
  toute eau prise en aval, glace comprise ». Les cinq ancres des planches et celle du logigramme sont intactes.

### Pour l'agent des planches (rien touché)

- **10-07, repère 3** : la légende dit « poser une main de grosse pierre » ; le texte dit maintenant « une couche
  de grosses pierres » (« une main » ne se comprend pas). **Repère 9** : « un second seau » ; le texte dit « une
  seconde chaudière » (glossaire).

### Avant → après

| Avant | Après |
| douteuse : on la laisse reposer, on la filtre, puis on la désinfecte, et la désinfection est la seule étape qu'on ne saute jamais. | douteuse : on la laisse reposer, on la filtre, puis on la désinfecte. On peut sauter les deux premières étapes, jamais la désinfection. |
| - **Le puits n'a jamais été analysé**, ou il vient de passer une crue, une inondation, un dégel brusque, des travaux d'excavation à côté ou le remplacement de la pompe (étapes 27 à 35). | - **Le puits n'a jamais été analysé**, ou il vient d'y avoir une crue, une inondation, un dégel brusque ou des travaux d'excavation à côté, ou on vient de remplacer la pompe (étapes 27 à 35). |
| - **La pompe ne tourne plus**, et on puise le puits à la main | - **La pompe du puits ne marche plus**, et il faut puiser l'eau à la main |
| - **Eau de Javel non parfumée, 5,25 %** : sans épaississant ni détergent ; datée, parce qu'elle perd son chlore au fil des mois (étape 18). | - **Eau de Javel non parfumée, 5,25 %** : sans épaississant ni détergent, avec sa date de fabrication lue sur le contenant (étape 18). |
| - **Seringue de 1 mL** : dose la javel au dixième de millilitre ; un compte-gouttes convient si on a compté ses gouttes dans 1 mL. | - **Seringue de 1 mL** : dose la javel au dixième de millilitre ; un compte-gouttes convient si on a compté combien de ses gouttes font 1 mL. |
| - **Bandelettes de chlore libre, 0 à 200 mg/L** : seules à mesurer le choc du puits et le chlore fait maison ; ne se fabriquent pas. | - **Bandelettes de chlore libre, 0 à 200 mg/L** : mesurent le chlore dans le puits qu'on désinfecte et dans le chlore fait maison. |
| - **Filtre à 1 µm ou moins** : arrête *Cryptosporidium* et *Giardia* sans faire bouillir ; les bactéries et les virus passent. | - **Filtre à 1 µm ou moins** : arrête *Cryptosporidium* et *Giardia* sans faire bouillir ; une partie des bactéries et les virus passent. |
| fonte. L'ébullition, la javel et le filtre laissent passer le sel ; seules la distillation et l'osmose inverse l'enlèvent. | fonte. Faire bouillir l'eau, la chlorer ou la filtrer n'enlève pas le sel ; seuls l'alambic et l'osmose inverse l'enlèvent. |
| Quand il ne reste que le fleuve, on passe son eau à l'alambic ou on la dessale par le gel (section 7). Après des retombées radioactives, on juge la pluie, la neige et l'eau de surface au ch. 4 : ni l'ébullition ni le filtre de ce chapitre n'enlèvent ce qui est radioactif. | Quand il ne reste que le fleuve, on passe son eau à l'alambic ou on la dessale par le gel (section 7). Après des retombées radioactives, le ch. 4 dit quelle pluie, quelle neige et quelle eau de surface on peut boire : faire bouillir ou filtrer l'eau n'enlève pas ce qui est radioactif. |
| 2. **Puiser en amont de tout ce qui vit** : le camp, la fosse septique, l'enclos, le sentier de motoneige, la hutte de castor. {!selles} Il faut traiter toute eau de surface, même claire, froide et sans odeur. Le castor et le rat musqué portent *Giardia* ; avec l'orignal, ils vivent dans le bassin d'un chalet boréal et font leurs besoins en amont de la prise d'eau. Dix kystes de *Giardia* peuvent suffire à rendre quelqu'un malade, et un kyste mesure 8 × 14 µm : à l'œil, l'eau reste parfaite. | 2. **Puiser en amont de tout ce qui peut salir l'eau** : le camp, la fosse septique, l'enclos, le sentier de motoneige, la hutte de castor. {!selles} Il faut traiter toute eau de surface, même claire, froide et sans odeur. Le castor et le rat musqué portent *Giardia*. Avec l'orignal, ils vivent autour des lacs et des ruisseaux du chalet et font leurs besoins dans l'eau, en amont de l'endroit où on puise. Dix kystes de *Giardia* (la forme sous laquelle le parasite vit dans l'eau) peuvent suffire à rendre quelqu'un malade, et un kyste mesure 8 × 14 µm : une eau qui en contient a l'air parfaitement propre. |
| 3. **Pour un puits, mesurer la distance qui le sépare des eaux usées** : au moins 30 m d'un système de traitement des eaux usées qui n'est pas étanche, ou 15 m si le puits est scellé. | 3. **Pour un puits, mesurer la distance qui le sépare des eaux usées** : il faut au moins 30 m entre le puits et une installation d'eaux usées qui n'est pas étanche, ou 15 m si le puits est scellé. |
| Ce bouchon oblige l'eau de surface à descendre à travers le sol, qui la filtre, au lieu de couler le long du tubage jusqu'à la nappe (les eaux usées : ch. 31). Si le puits est trop proche, ou si on ne sait pas s'il est scellé, on traite son eau comme une eau de surface (étape 14). | Ce bouchon d'argile oblige l'eau de surface à descendre à travers le sol, qui la filtre, au lieu de couler le long du tubage jusqu'à la nappe. Les eaux usées du chalet sont au ch. 31. Si le puits est trop proche des eaux usées, ou si on ne sait pas s'il est scellé, on traite son eau comme une eau de surface (étape 14). |
| 5. **Descendre la chaudière lestée, l'ouverture vers le bas, et la retourner sous l'eau** : elle se remplit sous la surface, sans prendre ce qui flotte. | 5. **Descendre la chaudière lestée l'ouverture vers le bas, et la retourner une fois sous l'eau.** |
| 7. **Rentrer l'eau brute dans des contenants marqués « eau brute »**, qui ne servent jamais à l'eau traitée : un fond d'eau brute laissé dans un bidon suffit à contaminer l'eau traitée qu'on y verse ensuite. | 7. **Rentrer l'eau brute (l'eau qui n'est pas encore traitée) dans des contenants marqués « eau brute »**, qui ne servent jamais à l'eau traitée : un fond d'eau brute laissé dans un bidon suffit à contaminer l'eau traitée qu'on y verse ensuite. |
| 8. **Laisser reposer l'eau dans une chaudière, sans y toucher, couvercle posé, de quelques heures à un jour**, plus longtemps si elle est trouble (planche 10-01, repère 1). Le sable et le limon tombent au fond, avec une partie des parasites ; l'argile la plus fine ne tombe pas. Un jour de repos fait aussi mourir une partie des bactéries. Ce qui reste en suspension abrite les microbes, use la javel avant qu'elle les atteigne et bouche le filtre. | 8. **Laisser reposer l'eau dans une chaudière, sans y toucher, avec le couvercle dessus, de quelques heures à un jour**, plus longtemps si elle est trouble (planche 10-01, repère 1). Le sable et le limon tombent au fond, avec une partie des parasites ; l'argile la plus fine ne tombe pas. En un jour, une partie des bactéries meurt aussi. Ce qui reste en suspension abrite les microbes, use la javel avant qu'elle les atteigne et bouche le filtre. |
| Le coton retient ce que la décantation a laissé ; devant un filtre fin, il fait durer la cartouche. | Le coton retient ce qui n'est pas tombé au fond ; quand on passe ensuite l'eau au filtre fin, la cartouche dure plus longtemps. |
| et arrêter quand le dépôt commence à monter vers lui (repère 3). | et arrêter quand le dépôt commence à monter vers le boyau (repère 3). |
| - **Autre façon, sans boyau.** Verser doucement, d'un seul mouvement, sans redresser la chaudière, et arrêter quand le dépôt arrive au bord. | - **Autre façon, sans boyau.** Verser l'eau doucement sur le coton, d'un seul mouvement, sans redresser la chaudière, et arrêter quand le dépôt arrive au bord. |
| 11. **Passer l'eau au filtre à 1 µm.** Le filtre est un tamis : il retient ce qui est plus gros que ses trous. À 1 µm, il arrête les oocystes de *Cryptosporidium* (4 à 6 µm) et les kystes de *Giardia*. | 11. **Passer l'eau au filtre à 1 µm.** Le filtre retient ce qui est plus gros que ses trous. À 1 µm, il arrête *Cryptosporidium* (4 à 6 µm) et les kystes de *Giardia*. |
| Après un filtre à 1 µm, il faut donc désinfecter l'eau : la faire bouillir, ou la chlorer (étape 19). | Après un filtre à 1 µm, il faut donc désinfecter l'eau : la faire bouillir (étape 14) ou la chlorer (étape 19). |
| Sans appareil de mesure, on regarde une feuille imprimée à travers 20 cm d'eau : on ne doit voir aucun voile. L'œil voit un voile à partir d'environ 5 UNT ; une eau limpide à l'œil peut donc être plusieurs fois au-dessus de 0,3 UNT. | Sans appareil de mesure, regarder une feuille imprimée à travers 20 cm d'eau : on ne doit voir aucun voile. On voit un voile à l'œil à partir d'environ 5 UNT ; une eau qui a l'air limpide peut donc être plusieurs fois au-dessus de 0,3 UNT. |
| 13. **Autre façon, quand il y a du courant : le stérilisateur à ultraviolet.** Il traite les bactéries, les virus et les protozoaires. Les particules dans l'eau bloquent ses rayons : il demande une eau à moins de 5 UNT, qu'on a décantée et filtrée avant, et on change sa lampe chaque année. | 13. **Autre façon, quand il y a du courant : le stérilisateur à ultraviolet.** Il tue les bactéries, les virus, *Giardia* et *Cryptosporidium*. Les particules dans l'eau font de l'ombre à ses rayons : l'eau doit être à moins de 5 UNT, donc décantée et filtrée avant. Changer la lampe chaque année. |
| glace, et pour toute eau bue en forêt sans le reste de la chaîne. | glace, et pour toute eau prise en forêt. |
| - **La minute.** La chaleur tue les microbes bien avant 100 °C, et le gros bouillon prouve, sans thermomètre, qu'on a dépassé toutes les températures qui les tuent : les bactéries courantes de l'eau meurent en moins d'une minute sous 65 °C, l'oocyste de *Cryptosporidium* en une minute à 73 °C, et le virus de l'hépatite A demande environ 85 °C. | - **La minute.** Les microbes meurent bien avant 100 °C. Quand l'eau roule à gros bouillons, on sait sans thermomètre qu'elle a dépassé la température qui les tue : les bactéries courantes de l'eau meurent en moins d'une minute sous 65 °C, *Cryptosporidium* en une minute à 73 °C, et le virus de l'hépatite A vers 85 °C. |
| - **Les cinq minutes.** Elles visent la tularémie, que portent le castor, le rat musqué et le lièvre. Sa bactérie survit des mois dans l'eau froide et résiste au gel, mais pas à la chaleur : dans l'eau, elle meurt en une minute à 56 °C, et il n'en reste aucune vivante après 45 secondes à 94 °C. La consigne pour l'eau bue en forêt, là où la tularémie circule, est quand même de 5 minutes, et on s'y tient. Le filtre ne remplace pas ces 5 minutes : un filtre à 1 µm laisse passer les bactéries (étape 11). Le ch. 50 (castor) applique la même durée. | - **Les cinq minutes.** On fait bouillir 5 minutes l'eau prise en forêt à cause de la tularémie, une maladie que portent le castor, le rat musqué et le lièvre. Sa bactérie survit des mois dans l'eau froide et au gel. Dans l'eau chaude, elle meurt en une minute à 56 °C, et il n'en reste aucune vivante après 45 secondes à 94 °C ; on garde quand même les 5 minutes, la durée donnée pour l'eau des endroits où la tularémie circule. Filtrer l'eau ne dispense pas de ces 5 minutes : le filtre à 1 µm laisse passer des bactéries (étape 11). Le ch. 50, sur le castor, donne la même durée. |
| 18. **Prendre de l'eau de Javel non parfumée, sans épaississant ni détergent**, titrée de 4 à 6 % ; les doses qui suivent sont pour de la javel à 5,25 %. - Trouver la date de fabrication dans le code imprimé sur le contenant. Chez un grand fabricant, après les lettres de l'usine, viennent les deux derniers chiffres de l'année, puis le numéro du jour dans l'année (234 : le 22 août). - Gardée à l'abri de la chaleur et du soleil, la javel tient environ un an depuis sa fabrication, puis elle perd son chlore de plus en plus vite. Écrire la date de fabrication en gros sur le contenant, le garder au frais et à l'obscurité, et le remplacer avant l'année, même plein. | 18. **Prendre une javel titrée de 4 à 6 %, et lire sa date de fabrication** ; les doses qui suivent sont pour de la javel à 5,25 %. - Trouver la date de fabrication dans le code imprimé sur le contenant. Chez un grand fabricant, le code commence par les lettres de l'usine, suivies des deux derniers chiffres de l'année, puis du numéro du jour dans l'année (234, c'est le 22 août). - La javel garde sa force environ un an après sa fabrication, puis elle perd son chlore de plus en plus vite. Écrire la date de fabrication en gros sur le contenant, le ranger au frais et à l'obscurité, et le remplacer avant qu'il ait un an, même s'il est plein. |
| 19. **Juger l'eau avant de la chlorer.** Le chlore tue un microbe en l'oxydant, et il doit le toucher pour le faire : tout ce qui l'use ou cache le microbe lui enlève de la force. | 19. **Juger l'eau avant de la chlorer.** Le chlore tue un microbe en l'oxydant, et il doit le toucher pour le faire : la saleté qui use le chlore ou qui cache le microbe le rend moins efficace. |
| Le chlore ne fait presque rien contre *Cryptosporidium* : il faudrait un CT de 7 000 mg-min/L (la concentration de chlore multipliée par le temps de contact), et aucune eau qu'on peut boire n'en approche. | Le chlore ne fait presque rien contre *Cryptosporidium* : pour le tuer, la concentration de chlore, en mg/L, multipliée par le temps de contact, en minutes, devrait atteindre 7 000 mg-min/L, et aucune eau qu'on peut boire n'en approche. |
| Le froid ralentit le chlore : contre les kystes de *Giardia*, le CT nécessaire est de moins de 12 dans une eau à 25 °C, et de 65 à 360 dans une eau de 3 à 5 °C. Sans feu, mesurer l'eau au thermomètre dans le seau, et allonger l'attente selon sa température (étape 21). | Le froid ralentit le chlore : contre les kystes de *Giardia*, il suffit d'un produit de la concentration par le temps de moins de 12 dans une eau à 25 °C, mais il en faut de 65 à 360 dans une eau de 3 à 5 °C. Sans feu, prendre la température de l'eau dans la chaudière, et allonger l'attente en conséquence (étape 21). |
| de 1 à 10 UNT, le chlore est huit fois moins efficace, et doubler la dose ne rattrape ni le trouble ni *Cryptosporidium*. | de 1 à 10 UNT, le chlore est huit fois moins efficace, et doubler la dose ne suffit ni à compenser le trouble ni à tuer *Cryptosporidium*. |
| Une eau un peu trouble, un peu colorée ou froide reçoit le double, 0,4 mL par litre. | Pour une eau un peu trouble, un peu colorée ou froide, mettre le double : 0,4 mL par litre. |
| 21. **Brasser et laisser reposer, couvercle posé** : | 21. **Brasser et laisser reposer, avec le couvercle dessus** : |
| Sans odeur, la matière organique a consommé le chlore : redoser une fois et attendre encore 15 minutes. Si l'odeur ne revient pas, faire bouillir l'eau. | Si l'eau ne sent pas le chlore, la matière organique l'a consommé : remettre la même dose une fois et attendre 15 minutes de plus. Si l'odeur ne revient pas, faire bouillir l'eau. |
| Une personne qui a une maladie de la thyroïde mal contrôlée ou une allergie à l'iode n'en boit pas ; une femme enceinte n'en boit pas longtemps, à cause de la thyroïde du bébé ; et personne n'en boit plus de quelques semaines. L'iode ne détruit pas *Cryptosporidium* non plus, même en allongeant le contact : on passe d'abord une eau de surface au filtre à 1 µm. | Ne pas donner d'eau traitée à l'iode à une personne qui a une maladie de la thyroïde mal contrôlée ou une allergie à l'iode. N'en donner que peu de temps à une femme enceinte, à cause de la thyroïde du bébé, et pas plus de quelques semaines à personne. L'iode ne tue pas *Cryptosporidium*, même avec une attente plus longue : passer d'abord une eau de surface au filtre à 1 µm. |
| L'opacité empêche les algues de pousser ; le goulot étroit empêche d'y plonger les mains ou une tasse. Dans un contenant qui risque de geler, dans un hangar, une auto ou une remise, laisser un vide d'air et le ranger couché : plein, il fend en gelant, et on le retrouve vide au dégel. | Dans un contenant opaque, les algues ne poussent pas ; un goulot étroit empêche d'y plonger les mains ou une tasse. Si le contenant risque de geler, dans un hangar, une auto ou une remise, laisser un vide d'air et le coucher : plein, il fend en gelant, et on le retrouve vide au dégel. |
| 25. **Écrire la date du traitement sur le contenant.** L'eau traitée n'est pas stérile : le contenant et les mains la recontaminent. L'eau bouillie se garde dans un contenant propre et fermé jusqu'à 3 jours au réfrigérateur, ou 24 h à la température de la pièce ; passé ce temps, la faire bouillir de nouveau avant de la boire. L'eau chlorée dans les règles se garde plus longtemps, parce qu'il lui reste du chlore qui la protège dans le contenant ; l'eau bouillie n'en a pas, et elle redevient douteuse dès qu'une main sale entre dans le bidon. | 25. **Écrire la date du traitement sur le contenant.** Le contenant et les mains recontaminent l'eau traitée. On peut garder l'eau bouillie dans un contenant propre et fermé jusqu'à 3 jours au réfrigérateur, ou 24 h à la température de la pièce ; après, il faut la faire bouillir de nouveau avant de la boire. L'eau chlorée comme aux étapes 20 à 22 reste bonne plus longtemps : il lui reste du chlore, qui tue les microbes qui entrent dans le contenant. L'eau bouillie n'en a pas. |
| On stocke les 72 heures ; on produit le reste chaque jour, et ce volume quotidien décide de la taille de la marmite et de la réserve de bois. | On garde en réserve l'eau de 72 heures et on traite le reste chaque jour ; on choisit la taille de la marmite et la réserve de bois d'après ce volume de chaque jour. |
| 27. **Faire analyser l'eau du puits tant qu'un laboratoire reçoit des échantillons** : seule l'analyse voit ce qui est dissous dans l'eau. | 27. **Faire analyser l'eau du puits tant qu'un laboratoire reçoit des échantillons** : on ne voit ce qui est dissous dans l'eau que par l'analyse. |
| Le nitrate du puits empêche le sang du bébé de porter l'oxygène au-delà de 10 mg/L (exprimé en azote, ou 45 mg/L exprimé en nitrate), surtout avant 3 mois[^1]. | Au-delà de 10 mg/L de nitrate (mesuré en azote, ou 45 mg/L mesuré en nitrate), le nitrate empêche le sang du bébé de porter l'oxygène, surtout avant 3 mois[^1]. |
| La bandelette lit jusqu'à 200 mg/L : pour un puits neuf, mélanger un volume d'eau du puits à un volume d'eau bouillie, lire la bandelette et doubler le chiffre. Mettre de l'eau traitée de côté avant de commencer : on ne boit pas l'eau du robinet pendant les étapes 31 à 34. | La bandelette mesure jusqu'à 200 mg/L : pour un puits neuf, mélanger un volume d'eau du puits à un volume d'eau bouillie, lire la bandelette et doubler le chiffre. Mettre de l'eau traitée de côté avant de commencer : il ne faut pas boire l'eau du robinet pendant les étapes 31 à 34. |
| Descendre une ficelle lestée, attachée deux fois, jusqu'à ce que le poids touche le fond, puis la remonter : la longueur mouillée de la ficelle est la colonne d'eau. | Attacher un poids au bout d'une ficelle par deux nœuds, descendre la ficelle jusqu'à ce que le poids touche le fond, puis la remonter : la longueur mouillée de la ficelle est la colonne d'eau. |
| Arrondir le volume vers le haut : avec moins de javel, l'eau reste sous 50 mg/L, et le choc ne désinfecte pas le puits. | Arrondir le volume vers le haut : avec trop peu de javel, l'eau n'atteint pas 50 mg/L, et le puits n'est pas désinfecté. |
| 34. **Purger loin du puits et de la fosse.** Faire couler le boyau | 34. **Vider l'eau chlorée loin du puits et de la fosse.** Faire couler le boyau |
| L'eau de purge, dosée pour tuer des bactéries, tue aussi celles de la fosse septique, qui traite les eaux usées par des bactéries vivantes et cesse alors de les traiter (ch. 31) ; elle fait la même chose au ruisseau. | La fosse septique traite les eaux usées avec des bactéries vivantes ; l'eau chlorée les tue, et la fosse cesse de traiter les eaux usées (ch. 31). L'eau chlorée fait le même tort au ruisseau. |
| la première analyse dit si le choc a fonctionné, la seconde s'il tient. Si l'analyse redevient positive, chercher la cause et la réparer : un couvercle ou un scellement qui laisse entrer l'eau, un sol qui ne fait pas de butte autour du puits pour éloigner le ruissellement, une fosse septique qui fuit, du fumier épandu à côté. Un nouveau choc ne règle pas la cause. | la première montre si la désinfection a marché, la seconde si le puits reste propre. Si l'analyse redevient positive, chercher la cause et la réparer avant de désinfecter de nouveau : un couvercle ou un scellement qui laisse entrer l'eau, un terrain sans butte autour du puits pour éloigner l'eau de ruissellement, une fosse septique qui fuit, du fumier épandu à côté. |
| 36. {!glace} **Percer la glace à l'écart des courants et des bouches de ruisseau**, là où elle est la plus épaisse et la plus régulière. Mesurer la glace du chemin qui mène au trou avant d'y marcher (ch. 15, étapes 40 à 42) ; percer et entretenir le trou : ch. 58. | 36. {!glace} **Percer la glace à l'écart des courants et de l'embouchure des ruisseaux**, là où elle est la plus épaisse et la plus régulière. Mesurer la glace du chemin qui mène au trou avant d'y marcher (ch. 15, étapes 40 à 42). Pour percer et entretenir le trou, voir le ch. 58. |
| 38. **Prendre la glace du lac avant la neige** : | 38. **Prendre la glace du lac plutôt que la neige** : |
| - La prendre au vent du chalet, loin de la cheminée, d'un moteur ou d'un feu, sous la croûte de surface : la suie ne part ni à l'ébullition ni à la javel. - Mettre toujours un fond d'eau liquide dans la marmite avant la neige : à sec, le métal surchauffe, et la neige brûle au fond avec un goût qui ne part plus. - Compter le bois : fondre la neige demande presque autant de chaleur que l'ébullition qui suit, et un litre de neige bouilli demande près de deux fois le bois d'un litre d'eau du lac. | - La prendre du côté où la fumée ne va pas, loin de la cheminée, d'un moteur ou d'un feu, sous la croûte de surface : faire bouillir l'eau ou la chlorer n'enlève pas la suie. - Toujours mettre un fond d'eau dans la marmite avant d'y mettre la neige : sans eau, le métal surchauffe, et la neige roussit au fond, ce qui donne un goût qui ne part plus. - Prévoir le bois : il faut presque autant de chaleur pour fondre la neige que pour faire bouillir l'eau ensuite, et un litre d'eau de neige bouilli prend près de deux fois le bois d'un litre d'eau du lac. |
| 41. **Faire bouillir la neige et la glace 5 minutes, comme l'eau du lac** (étape 14) : la neige et la glace ne sont pas plus propres que l'eau qui les a formées, et une hutte de castor en amont contamine la glace autant que l'eau. | 41. **Faire bouillir l'eau de neige et de glace comme l'eau du lac** (étape 14) : la neige et la glace ne sont pas plus propres que l'eau qui les a formées, et une hutte de castor en amont contamine la glace autant que l'eau. |
| Une conduite sous pression repousse ce qui l'entoure ; une conduite qui perd sa pression aspire l'eau du sol par ses joints et ses fuites. L'avis arrive donc souvent avant le moindre résultat d'analyse, et l'eau a l'air normale. | Une conduite sous pression repousse ce qui l'entoure ; une conduite qui perd sa pression aspire l'eau du sol par ses joints et ses fuites. C'est pour ça que l'avis est souvent donné avant le moindre résultat d'analyse, alors que l'eau a l'air normale. |
| Ce type d'avis vise un produit chimique, que l'ébullition n'enlève pas. L'eau du robinet ne sert plus qu'à la chasse d'eau de la toilette. | Ce type d'avis vise un produit chimique, que l'ébullition n'enlève pas. Se servir de l'eau du robinet seulement pour la chasse d'eau de la toilette. |
| \| Demande de l'eau bouillie \| N'en demande pas \| | \| Avec de l'eau bouillie \| Avec l'eau du robinet \| |
| La ligne du bain vaut pour un adulte et un grand enfant. Un bébé ou un jeune enfant avale l'eau du bain : le laver à la débarbouillette pendant l'avis. | Un bébé ou un jeune enfant avale l'eau du bain : pendant l'avis, le laver à la débarbouillette au lieu de lui donner un bain. |
| 45. **Faire bouillir le matin l'eau de la journée** : hors du réfrigérateur, l'eau bouillie se garde 24 heures (étape 25). | 45. **Faire bouillir l'eau de la journée le matin** : hors du réfrigérateur, on la garde 24 heures (étape 25). |
| 47. **À la levée de l'avis, rincer la maison de l'eau de l'avis**, qui est encore dans la plomberie. - Ouvrir chaque robinet d'eau froide et laisser couler quelques minutes avant de s'en servir, robinets extérieurs et boyaux compris. | 47. **À la levée de l'avis, chasser de la plomberie l'eau qui y est restée pendant l'avis.** - Ouvrir chaque robinet d'eau froide, les robinets extérieurs et les boyaux compris, et le laisser couler quelques minutes avant de s'en servir. |
| - Le chauffe-eau n'a pas besoin d'être vidé. | - Il n'est pas nécessaire de vider le chauffe-eau. |
| 48. {!plomb} **Dans une vieille maison, purger le robinet froid avant de boire.** Des entrées de service en plomb ont été posées dans des maisons unifamiliales et des immeubles de moins de 8 logements, surtout entre 1940 et 1955, et jusque dans les années 1970 ; seule l'analyse dit s'il y en a. Le plomb se dissout dans l'eau qui stagne la nuit dans l'entrée de service ; la concentration à ne pas dépasser est de 5 µg/L, soit 0,005 mg/L. | 48. {!plomb} **Dans une vieille maison, laisser couler le robinet d'eau froide avant de boire.** Des entrées de service en plomb (le tuyau qui amène l'eau de la rue à la maison) ont été posées dans des maisons unifamiliales et des immeubles de moins de 8 logements, surtout entre 1940 et 1955, et jusque dans les années 1970 ; on ne sait s'il y en a une que par une analyse. Le plomb se dissout dans l'eau qui reste la nuit dans l'entrée de service ; la concentration à ne pas dépasser est de 0,005 mg/L. |
| - Prendre seulement l'eau froide du robinet pour les aliments, les préparations pour nourrissons et les breuvages : | - Prendre seulement l'eau froide du robinet pour les aliments, les biberons et les breuvages : |
| - Prendre une carafe ou un filtre de robinet dont le média est fait pour réduire le plomb : seul ce média retient un métal dissous. - Jamais la marmite : bouillir n'enlève pas le plomb et le concentre (étape 27). | - Prendre une carafe ou un filtre de robinet fait pour retenir le plomb : les autres filtres ne retiennent pas un métal dissous. - Ne pas faire bouillir l'eau pour enlever le plomb : l'ébullition le concentre (étape 27). |
| puis l'eau du chauffe-eau : il en garde de 180 à 280 L selon qu'il fait 40 ou 60 gallons (pour le vider : ch. 6). Si la coupure s'étire, on part au chalet (ch. 2), qui a un lac et un poêle. | puis l'eau du chauffe-eau : il en contient de 180 à 280 L (40 ou 60 gallons). Pour le vider, voir le ch. 6. Si la coupure dure, partir au chalet (ch. 2). |
| [^1]: Chez le nourrisson, la peau et les lèvres prennent une teinte bleutée. Si ça s'aggrave, viennent les troubles de la respiration et de la conscience, puis le coma. Le sang est brun chocolat au lieu de rouge. | [^1]: Chez le nourrisson, la peau et les lèvres prennent une teinte bleutée. Si ça s'aggrave, il respire avec difficulté et réagit de moins en moins, puis il tombe dans le coma. Son sang, quand on le voit, est brun chocolat au lieu de rouge. |
| \| Avant de puiser un puits \| Distance aux eaux usées \| | \| Avant de boire l'eau d'un puits \| Distance aux eaux usées \| |
| \| Avant de chlorer \| Température de l'eau, au thermomètre dans le seau \| | \| Avant de chlorer \| Température de l'eau, au thermomètre dans la chaudière \| |
| \| Chloration, au bout de l'attente \| Odeur, ou bandelette de chlore libre \| Légère odeur de chlore \| Redoser **0,2 mL/L**, attendre 15 min de plus ; sinon, faire bouillir \| | \| Chloration, au bout de l'attente \| Odeur, ou bandelette de chlore libre \| Légère odeur de chlore \| Remettre **0,2 mL/L**, attendre 15 min de plus ; sinon, faire bouillir \| |
| \| Une fois par période d'usage \| Analyse chimique, en mg/L \| | \| Au moins une fois \| Analyse chimique, en mg/L \| |
| \| Une autre source ; pour le nitrate, l'arsenic et le plomb, l'alambic \| | \| Changer de source ; pour le nitrate, l'arsenic et le plomb, l'alambic \| |
| \| Une fois par période d'usage \| Manganèse \| | \| Au moins une fois \| Manganèse \| |
| \| Après le choc \| Durée dans la plomberie \| **24 h** \| Attendre \| \| Purge après le choc \| Chlore libre au robinet \| | \| Après la désinfection du puits \| Durée dans la plomberie \| **24 h** \| Attendre \| \| Vidange de l'eau chlorée \| Chlore libre au robinet \| |
| \| Après le choc \| Analyses de contrôle \| | \| Après la désinfection du puits \| Analyses de contrôle \| |
| \| Maison d'avant les années 1970 \| Robinet froid purgé avant de boire \| Quelques minutes après que l'eau est devenue froide ; plomb **0,005 mg/L** ou moins à l'analyse \| Purger plus longtemps, eau froide seulement, filtre qui retient le plomb, faire analyser \| | \| Maison d'avant les années 1970 \| Robinet d'eau froide qu'on laisse couler avant de boire \| Quelques minutes après que l'eau est devenue froide ; plomb **0,005 mg/L** ou moins à l'analyse \| Laisser couler plus longtemps, prendre l'eau froide seulement, poser un filtre qui retient le plomb, faire analyser l'eau \| |
| \| Ce n'est pas encore une contamination fécale, mais le puits laisse entrer quelque chose \| | \| Le puits laisse entrer quelque chose ; pas encore de contamination fécale \| |
| \| Diarrhée malgré une eau chlorée dans les règles \| | \| Diarrhée alors que l'eau a été chlorée comme il faut \| |
| \| Analyse chimique ; comparer à 0,12 mg/L pour le manganèse \| | \| Faire faire une analyse chimique ; comparer à 0,12 mg/L pour le manganèse \| |
| \| Analyse ; ce seuil est esthétique, sous le seuil de santé \| | \| Faire analyser l'eau ; à ce niveau, le manganèse tache, sans danger pour la santé \| |
| \| Filtre à 1 µm colmaté en quelques jours \| Eau trop trouble avant le filtre \| Décanter plus longtemps et passer au coton. Récurer la bougie de céramique ; rincer la cartouche plissée à contre-courant (section 7) \| | \| Filtre à 1 µm bouché en quelques jours \| Eau trop trouble avant le filtre \| Laisser reposer l'eau plus longtemps et la passer au coton. Récurer la bougie de céramique (le cylindre qui filtre) ; rincer la cartouche plissée à l'envers (section 7) \| |
| \| Changer la bougie ; une fêlure visible la condamne aussi \| | \| Changer la bougie, et aussi quand on y voit une fêlure \| |
| \| Changer de source ; analyse chimique \| | \| Changer de source ; faire faire une analyse chimique \| |
| \| La jeter ; prendre la neige au vent du chalet, sous la croûte (étape 39) \| | \| La jeter ; prendre la neige du côté où la fumée ne va pas, sous la croûte (étape 39) \| |
| \| Maison sur l'aqueduc bâtie entre 1940 et les années 1970, eau sans goût ni couleur anormale \| Entrée de service en plomb possible : le plomb ne se voit pas \| Purger le robinet froid avant de boire, eau froide seulement pour les biberons, faire analyser (étape 48) \| | *(ligne coupée : redite de l'étape 48 et de la ligne « Maison d'avant les années 1970 » des Points de contrôle)* |
| La cuisinière est électrique ; il reste souvent le barbecue ou le réchaud de camping. {!co} On les fait brûler dehors, même pour une longue ébullition par grand froid. Faire bouillir 20 L dehors à −20 °C demande du temps et du combustible : la réserve de l'étape 26 sert ces jours-là. | Quand la cuisinière électrique ne marche plus, on fait bouillir l'eau sur le barbecue ou le réchaud de camping. {!co} On les allume dehors, même pour une longue ébullition par grand froid. Par −20 °C, faire bouillir 20 L dehors prend du temps et du combustible : ces jours-là, on boit la réserve de l'étape 26. |
| {!pas-au-feu} Pas de métal galvanisé ni peint : ses fumées empoisonnent (ch. 111). | {!pas-au-feu} On ne met pas sur le feu un métal galvanisé ou peint : ses fumées empoisonnent (ch. 111). |
| **Le contenant d'écorce.** Un contenant d'écorce de bouleau (lever l'écorce : ch. 94) va sur les braises | **Le contenant d'écorce.** Un contenant d'écorce de bouleau (pour lever l'écorce : ch. 94) va sur les braises |
| **Les pierres chaudes**, pour ce qui ne tient pas la flamme : un fût de plastique, une caisse de bois, une peau tendue dans un trou. | **Les pierres chaudes** servent pour un contenant qui ne va pas sur le feu : un fût de plastique, une caisse de bois, une peau tendue dans un trou. |
| Une pierre mouillée, poreuse (grès, calcaire) ou feuilletée éclate au feu, au visage de la personne penchée dessus : l'eau prise dedans se change en vapeur d'un coup. | Une pierre mouillée, poreuse (grès, calcaire) ou feuilletée peut éclater dans le feu et lancer des éclats au visage de la personne penchée dessus : l'eau prise dans la pierre se change en vapeur d'un coup. |
| - Sortir chaque pierre refroidie avant d'en mettre une autre : sinon le fond se remplit de pierres, et le contenant ne tient plus d'eau. Ce qu'on perd avec les pierres : l'eau fume sans rouler, et sans gros bouillon, rien ne prouve qu'elle a atteint 100 °C ni qu'elle y est restée les 5 minutes d'une eau de surface. | - Sortir chaque pierre refroidie avant d'en mettre une autre : sinon le fond se remplit de pierres, et il ne reste plus de place pour l'eau. Avec les pierres, l'eau fume sans bouillir à gros bouillons : on ne peut pas savoir si elle a atteint 100 °C, ni si elle y est restée les 5 minutes d'une eau de surface. |
| à la remontée, son poids plaque le carré sur le trou (repère 5) | à la remontée, le poids de l'eau plaque le carré sur le trou (repère 5) |
| - **Ce qu'elle remonte.** Un tuyau de 40 mm porte environ 1,2 L par mètre, et une buse de 2 m remonte 2,5 L. Les 16 L d'une journée pour quatre personnes demandent 7 voyages : on fait les voyages d'un coup et on stocke l'eau traitée, plutôt que de puiser au fur et à mesure. | - **Ce qu'elle remonte.** Un tuyau de 40 mm contient environ 1,2 L par mètre, et une buse de 2 m remonte 2,5 L. Pour les 16 L d'une journée pour quatre personnes, il faut 7 voyages : on les fait d'un coup et on garde l'eau traitée, plutôt que de puiser au fur et à mesure. |
| - **Garder le puits propre.** Tout ce qu'on descend dans le tubage finit dans l'eau qu'on boit : la corde, la buse, les mains. Enrouler la corde sur un bâton posé en travers, hors du sol (repère 6). Attacher la corde au haut du tuyau dans deux trous (repère 7) : ce qui tombe au fond d'un puits y reste et y pourrit. | - **Garder le puits propre.** Tout ce qu'on descend dans le tubage touche l'eau qu'on boit : la corde, la buse, les mains. Enrouler la corde sur un bâton posé en travers, hors du sol (repère 6). Attacher la corde au haut du tuyau par deux trous, pour ne pas perdre la buse (repère 7) : ce qui tombe au fond d'un puits y reste et y pourrit. |
| **L'hypochlorite de calcium en granules**, le chlore en granules vendu pour traiter l'eau. - **La solution mère.** Dehors ou dans une pièce aérée, les yeux protégés, dissoudre une cuillère à thé comble de granules (environ 7 g) dans 7,5 L d'eau propre, en brassant jusqu'à ce que les grains disparaissent : la solution contient environ 500 mg de chlore par litre. Jetés tels quels dans l'eau à boire, les granules se dissolvent mal. | **L'hypochlorite de calcium en granules** est le chlore en granules vendu pour traiter l'eau. - **La solution mère.** Dehors ou dans une pièce aérée, en se protégeant les yeux, dissoudre une cuillère à thé comble de granules (environ 7 g) dans 7,5 L d'eau propre, en brassant jusqu'à ce que les grains disparaissent : la solution contient environ 500 mg de chlore par litre. Les granules jetés directement dans l'eau à boire se dissolvent mal. |
| du carburant : ils ne brûlent pas, mais ils peuvent les allumer et attisent un feu. | du carburant : les granules ne brûlent pas eux-mêmes, mais ils peuvent allumer ces matières, et ils activent un feu. |
| **L'électrolyse d'une saumure** fait de l'hypochlorite avec ce qu'il y a au chalet : du 12 V, du sel et deux électrodes de carbone. Le courant fait du chlore à une électrode et de l'hydrogène à l'autre ; le chlore reste dans l'eau salée sous forme d'hypochlorite. - Prendre du carbone aux deux bornes, qui ne réagit pas avec la saumure : les charbons d'une grosse pile sèche, ou des électrodes de gougeage. | **L'électrolyse d'une saumure** fait de l'hypochlorite avec ce qu'il y a au chalet : on fait passer le courant d'une batterie de 12 V dans de l'eau salée, entre deux électrodes de carbone. Le courant fait du chlore à une électrode et de l'hydrogène à l'autre ; le chlore reste dans l'eau salée sous forme d'hypochlorite. - Prendre des électrodes de carbone aux deux bornes, parce que le carbone ne réagit pas avec l'eau salée : les tiges de charbon d'une grosse pile sèche, ou des électrodes de gougeage. |
| - Doser à la bandelette : la force de la solution dépend du sel, du courant et du temps, et ne se devine pas. Un appareil fait pour ça tire d'une saumure à 25 g de sel par litre une solution à 5 g de chlore actif par litre ; un montage de fortune fait moins, sans qu'on sache combien. | - Doser à la bandelette : la force de la solution dépend du sel, du courant et du temps, et on ne peut pas la deviner. Avec une saumure à 25 g de sel par litre, un appareil fait pour ça donne une solution à 5 g de chlore actif par litre ; un montage de fortune donne moins, sans qu'on sache combien. |
| Sans bandelette, c'est un dosage à l'aveugle, pire que de faire bouillir. | Sans bandelette, faire bouillir l'eau plutôt. |
| Un baril debout, rempli de sable, que l'eau traverse lentement de haut en bas (planche 10-07). Il clarifie l'eau ; il ne la désinfecte pas. | Un baril debout, rempli de sable, que l'eau traverse lentement de haut en bas, fait un filtre à sable (planche 10-07). Il rend l'eau claire, mais il ne la désinfecte pas. |
| - **Le fond.** Mettre au fond une main de grosse pierre (repère 3) | - **Le fond.** Mettre au fond une couche de grosses pierres (repère 3) |
| en touchant le fond du seau, et vider l'eau sale (repère 6) | en touchant le fond de la chaudière, et vider l'eau sale (repère 6) |
| - **Le film vivant.** Le travail se fait surtout par un film de microbes qui s'installe à la surface du sable et mange ce qui passe, dans le 1 ou 2 cm du dessus. Il met jusqu'à un mois à se former, et pendant ce temps, il faut désinfecter l'eau qui sort comme le reste. Il ne se voit pas ; le sable qui fonce montre seulement la saleté prise. Il vit tant que le sable reste mouillé et qu'il reçoit de l'eau neuve au moins tous les deux jours : on monte le filtre l'été ou l'automne, avant d'en avoir besoin, et on le nourrit chaque jour. - **Le charbon.** Concasser et rincer du charbon de bois du poêle, et en remplir un second seau percé, posé sous la sortie du filtre, jamais sur le sable (repère 9) : posé sur le sable, il étouffe le film vivant. Ce second seau corrige le goût et la couleur. Le charbon du poêle n'est pas du charbon actif : il offre de quelques m² à 300 m² de surface par gramme, et l'activation, une cuisson à la vapeur au-dessus de 800 °C qui ouvre ses pores, la porte de 750 à 1 100 m², et il retient alors trois à cinq fois plus. | - **Le film vivant.** La plus grande partie du travail est faite par un film de microbes qui se forme dans le 1 ou 2 cm du dessus du sable et qui mange ce qui passe. Il met jusqu'à un mois à se former. On ne le voit pas : quand le sable fonce, c'est seulement la saleté qu'il a retenue. Le film reste vivant tant que le sable reste mouillé et qu'il reçoit de l'eau neuve au moins tous les deux jours : on monte le filtre l'été ou l'automne, avant d'en avoir besoin, et on y verse de l'eau chaque jour. - **Le charbon.** Concasser et rincer du charbon de bois du poêle, et en remplir une seconde chaudière percée, posée sous la sortie du filtre (repère 9). Ne pas le mettre sur le sable : il étouffe le film vivant. Le charbon enlève une partie du goût et de la couleur. Le charbon du poêle a de quelques m² à 300 m² de surface par gramme. Le charbon actif, cuit à la vapeur au-dessus de 800 °C pour ouvrir ses pores, en a de 750 à 1 100 m², et il retient trois à cinq fois plus. |
| Sous un peu d'eau, poser la paume à plat sur le dessus du sable et la tourner en rond, en touchant à peine, sans enfoncer le dessus du sable plus creux (repère 11). | Sous un peu d'eau, poser la paume à plat sur le dessus du sable et la tourner en rond, en touchant à peine le sable, sans le brasser en profondeur (repère 11). |
| Lisser le sable, remettre l'assiette, et recommencer jusqu'à ce que le débit revienne. Le film vivant est dérangé : on désinfecte l'eau qui sort le temps qu'il se refasse. | Lisser le sable, remettre l'assiette, et recommencer jusqu'à ce que le débit revienne. Le film vivant est dérangé et met du temps à se refaire. |
| - **Le couvercle.** Poser un couvercle bombé à l'envers sur la marmite (repère 2), le creux au-dessus du bol (repère 3) : la vapeur monte, frappe le couvercle froid, glisse vers le creux et tombe dans le bol. - **Le joint.** Faire le tour du couvercle avec un boudin de guenille mouillée ou une pâte de farine et d'eau, refait à chaque fois (repère 4). - **Le froid.** Couvrir le couvercle de neige ou d'un linge mouillé, renouvelé pour que la vapeur continue de se condenser (repère 5). | - **Le couvercle.** Poser un couvercle bombé à l'envers sur la marmite (repère 2), le creux au-dessus du bol (repère 3) : la vapeur monte, se change en gouttes sur le couvercle froid, et les gouttes coulent vers le creux et tombent dans le bol. - **Le joint.** Faire le tour du couvercle avec un boudin de guenille mouillée ou une pâte de farine et d'eau, à refaire chaque fois (repère 4). - **Le froid.** Couvrir le couvercle de neige ou d'un linge mouillé, et le renouveler pour que la vapeur continue de se changer en gouttes (repère 5). |
| - **Le bol.** Le sortir à froid, avant qu'il soit plein. | - **Récupérer l'eau.** Sortir le bol quand la marmite a refroidi, avant qu'il soit plein. |
| un bout de tuyau de cuivre branché sur le couvercle (repère 7), et l'enrouler dans un banc de neige (repère 8) : | un bout de tuyau de cuivre branché sur le couvercle (repère 7), et enrouler le tuyau dans un banc de neige (repère 8) : |
| L'alambic mange du bois : faire passer un litre d'eau en vapeur demande plus de cinq fois la chaleur qu'il a fallu pour l'amener à ébullition, donc plus de six fois le bois d'une simple ébullition. On le réserve à l'eau à boire des enfants. Il laisse dans la marmite ce qui ne s'évapore pas, mais il emporte avec la vapeur ce qui bout plus bas qu'elle : une eau qui sent l'essence, le solvant ou le naphte ressort avec son contaminant dans le bol, et il faut changer de source. | L'alambic brûle beaucoup de bois : faire passer un litre d'eau en vapeur demande plus de cinq fois la chaleur qu'il a fallu pour l'amener à ébullition, donc plus de six fois le bois d'une simple ébullition. On le réserve à l'eau à boire des enfants. Ce qui ne s'évapore pas reste dans la marmite, mais ce qui s'évapore plus facilement que l'eau passe avec la vapeur : l'essence, le solvant ou le naphte se retrouvent dans le bol. Si l'eau sent un de ces produits, il faut changer de source. |
| L'hiver donne deux fontes qui ne coûtent rien : | Deux façons de faire fondre la neige sans brûler de bois : |
| avec une pente et une rigole vers un seau ; - un sac souple accroché près du poêle, qui fond la neige à la chaleur perdue pendant qu'on cuisine. | avec une pente et une rigole vers une chaudière ; - un sac souple accroché près du poêle, où la neige fond à la chaleur du poêle pendant qu'on cuisine. |
| En gelant, l'eau forme des cristaux qui laissent le sel de côté : la glace est moins salée que l'eau qu'elle quitte, et la saumure rejetée garde le reste du sel. | Quand l'eau salée gèle, les cristaux de glace laissent le sel de côté : la glace est moins salée que l'eau de départ, et le sel reste dans la saumure qui ne gèle pas. |
| Une eau encore salée au goût est loin d'être buvable. | Une eau qui goûte encore un peu le sel est loin d'être buvable. |
| Le rayonnement du soleil abîme les microbes, et la chaleur y ajoute. | Les rayons du soleil abîment les microbes, et la chaleur aide. |
| - La coucher sur un toit de tôle ou une autre surface qui renvoie le soleil, jamais à l'ombre une partie du jour. | - La coucher sur un toit de tôle ou une autre surface qui renvoie le soleil, à un endroit qui n'est jamais à l'ombre de la journée. |
| Contre *Cryptosporidium*, ça ne suffit pas : il faut la marmite ou le filtre à 1 µm. | Contre *Cryptosporidium*, ça ne suffit pas : il faut faire bouillir l'eau ou la passer au filtre à 1 µm. |
| La récurer sous l'eau propre avec une brosse dure ou le dos d'un couteau : son débit repart. | La récurer sous l'eau propre avec une brosse dure ou le dos d'un couteau : le débit revient. |
| - **Une cartouche plissée.** La rincer à contre-courant, sans brosse : | - **Une cartouche plissée.** La rincer en faisant passer l'eau à l'envers, sans brosse : |
| avec une bande découpée dans un fût du même plastique, le seul qui fond avec lui. | avec une bande découpée dans un fût du même plastique : un autre plastique ne se soude pas avec lui. |
| - **Une pompe 12 V morte.** La remplacer par la hauteur : un baril monté sur une plateforme distribue l'eau par gravité ; on monte l'eau du lac jusqu'au baril à bras. | - **Une pompe 12 V morte.** Monter un baril sur une plateforme : l'eau en descend toute seule dans les tuyaux. On monte l'eau du lac jusqu'au baril à bras. |
| **Les bandelettes de chlore** : sans elles, on dose le chlore fait maison et le choc du puits à l'aveugle. **L'analyse chimique** : aucune de ces méthodes ne voit l'arsenic, l'uranium, le nitrate, le manganèse ni le plomb, et une eau limpide, sans odeur et bonne au goût peut en contenir. **Un filtre qui retient les virus** : il ne se fabrique pas (étape 11). | - **Les bandelettes de chlore** : sans elles, on ne sait pas combien de chlore il y a dans la solution faite maison ni dans l'eau du puits qu'on désinfecte. - **L'analyse chimique** : sans elle, on ne sait pas si l'eau contient de l'arsenic, de l'uranium, du nitrate, du manganèse ou du plomb, et une eau limpide, sans odeur et bonne au goût peut en contenir. - **Un filtre qui retient les virus** : on ne peut pas le fabriquer (étape 11). |
| - **Le volume.** Toute l'eau de la journée (étape 26) passe par la marmite, avec le bois que ça demande en plus du chauffage, et l'hygiène descend au minimum en premier (ch. 31). On monte la réserve à l'automne. - **La protection dans le bidon.** Sans javel, l'eau n'a plus de chlore qui la protège une fois traitée (étape 25). - **Ce qui est dissous.** L'alambic est le seul à y toucher, et il donne très peu d'eau. - **Le goût.** L'eau reste teintée par les tanins et plate, et de jeunes enfants refusent de la boire. Un enfant qui ne boit pas l'hiver se déshydrate (ch. 39 et 40). - **La marge d'erreur.** Avec deux méthodes, on rattrape un oubli. Avec une seule, un chronomètre mal parti donne une gastro-entérite à toutes les personnes qui boivent l'eau. | - **Le volume.** Toute l'eau de la journée (étape 26) doit passer par la marmite, et il faut le bois pour ça en plus du chauffage. On réduit d'abord l'eau de l'hygiène (ch. 31). - **La protection dans le bidon.** Sans javel, l'eau traitée n'a plus de chlore pour la protéger dans le bidon (étape 25). - **Ce qui est dissous.** Seul l'alambic enlève ce qui est dissous, et il donne très peu d'eau. - **Le goût.** L'eau reste teintée par les tanins, et elle est plate (étape 17). Un enfant qui ne boit pas l'hiver se déshydrate (ch. 39 et 40). - **La marge d'erreur.** Quand on traite l'eau de deux façons, l'une rattrape une erreur sur l'autre. Avec une seule façon, une ébullition trop courte rend malades toutes les personnes qui boivent l'eau. |
| Un puits de 40 m dont l'eau commence à 12 m porte 28 m d'eau. | Un puits de 40 m dont l'eau commence à 12 m contient une colonne de 28 m d'eau. |
| Quand tous les robinets ont senti le chlore, arrêter la pompe. | Quand l'eau sent le chlore à tous les robinets, arrêter la pompe. |
| \| **30 m** d'un système non étanche, | \| **30 m** d'une installation d'eaux usées non étanche, |
| \| Continuer à purger avant de boire \| | \| Continuer à faire couler l'eau avant de boire \| |
| \| Redoser une fois ; si ça recommence, faire bouillir \| | \| Remettre la même dose une fois ; si ça recommence, faire bouillir \| |
| Trop lavé, le sable laisse passer l'eau trop vite et filtre mal. | Un sable trop lavé laisse passer l'eau trop vite et filtre mal. |
| - **Une bougie de céramique colmatée.** | - **Une bougie de céramique bouchée.** |
| \| Laver les légumes et les fruits qui se mangent crus \| | \| Laver les légumes et les fruits qu'on mange crus \| |

## Notes En plus, 19 octobre 2026

Rôle 2, rédacteur. Brief : ajouter la section non numérotée « En plus » (4 à 8 notes, 30 à 80 mots, l'étape entre
parenthèses ; la façon d'une nation du Nord, un fait, une photo pour reconnaître ; jamais de planche ni de redite) et
vérifier les règles du cadre ajoutées le 18 octobre. Lu au complet : `.claude/cadre-agents.md`, `CLAUDE.md`, le skill
`ecriture`, `gabarit-chapitre.md`, `roles.md`, les ch. 4 et 12 et leurs fiches, `plan/dangers-inventaire.md`
(sections 1 et 3), `dangers/partie-1.md` et `partie-2.md`, `plan/premieres-minutes-inventaire.md`, la section
« PAUSE du 15 octobre » de `suivi/plan-de-match.md`.

**Aucune source nouvelle cherchée sur le web** (JP, 19 octobre 2026 : « fuck les sources, on a pas déjà fait ce
travail-là ? »). Les six notes sont bâties sur des pages déjà enregistrées au dossier par d'autres chapitres, et les
deux photos sur des fichiers déjà téléchargés, licence relue au téléchargement. Les extraits exacts, note par note,
sont regroupés dans `sources/10-en-plus-notes-2026-10-19.md`. Rien d'autre du chapitre n'a bougé : section ajoutée
après « Ce qu'on perd », fichier gardé en LF, aucune étape renumérotée.

### Les six notes

Comptes : mots et nombres, sans les deux-points ni les points-virgules.

| Note | Genre | Étape | Mots | Faits imprimés | Provenance |
| --- | --- | --- | ---: | --- | --- |
| La sève de bouleau, en mai | La façon des Dénés de Fisherman Lake (T.N.-O.) | 1 (et ch. 94) | 76 | En mai, avant les feuilles ; entaille ; panier d'écorce ; bue. Pourquoi elle marche : presque toute de l'eau, 0,8 à 1,5 % de sucre. Ce qui la rend dangereuse : elle se gâte vite ; sous 5 °C, six jours au plus ; jetée si elle n'est plus claire | Kuhnlein et Turner, FAO (`autochtones/kuhnlein-turner-…`, l. 804) ; UAF FNH-00150 (`60-uaf-entaillage-bouleau.md`, texte intégral l. 88 à 97) |
| Reconnaître un étang de castor | Photo | 2 | 72 | Le barrage retient l'eau en étang, parfois sur une grande étendue ; hutte au milieu de l'étang ou sur la berge ; souches taillées en pointe, traces de dents, gros copeaux ; bâtons écorcés dans l'eau ou sur le bord ; l'orignal y mange l'été les plantes sous l'eau | USDA PNW-GTR-332 (`35c-usda-fs-pnw-gtr-332-…`) ; HWW castor (`46-hww-castor-biologie.md`) et rat musqué (`43b-hww-rat-musque-texte.txt`, l. 111) ; NPS Isle Royale (`35d-agences-us-orignal-…`, section 5) |
| Le seau d'épinette des Naskapis | La façon des Naskapis (Ungava) | 7 | 80 | Planches d'épinette ou de mélèze d'environ 8 mm (un tiers de pouce) ; vapeur ; pliées en rond, bouts qui chevauchent ; cousues de racines fendues ; fond creusé en plat dans une rainure près du bord du bas. Pourquoi elle marche : la vapeur rend le bois environ dix fois plus souple que du bois sec non chauffé. Aucun danger : la façon ne contredit aucune règle du livre | Turner 1894 (`autochtones/turner-1894-…`, l. 6045 à 6056) ; USDA AH125 (`20b-usda-ah125-cintrer-le-bois-massif.md`) |
| Le manganèse et l'arsenic du roc | Fait | 27 | 74 | Présents naturellement dans le sol et la roche, dissous par l'eau souterraine : un puits loin de toute pollution peut en contenir. Plusieurs études ont associé une eau à 0,02 à 0,8 mg/L de manganèse, bue longtemps, à des effets subcliniques chez l'enfant (QI, mémoire, comportement, résultats scolaires, habileté des mains) | Dépliant du ministère de l'Environnement (`10-melccfp-ebullition-concentre-contaminants-chimiques.md`) ; INSPQ, fiche Manganèse (`13-quebec-manganese.md`, source 2) |
| Le rat musqué sous la glace | Photo | 2 et 36 | 77 | Hutte : tas de quenouilles et de joncs séchés mêlés de boue, 0,5 à 1 m, dans un marais. Peu après le gel, trous dans la glace des baies jusqu'à 90 m de la hutte, recouverts de boue et de plantes ; il vit sous la glace l'hiver | HWW rat musqué (`49-hww-rat-musque-et-marmotte-biologie.md` ; `43b-hww-rat-musque-texte.txt`, l. 81, 85, 87, 99) |
| Ce que retient le filtre à sable | Fait | section 7, « Le filtre à sable » | 71 | Sans film vivant, 30 à 70 % des microbes retenus (pris entre les grains ou collés à leur surface) ; avec le film, jusqu'à 99 % ; quelques jours d'adaptation quand l'eau change, donc toujours la même source | CAWST 2009 (`13-cawst-couche-biologique-filtre-a-sable.md`) |

Rien de ces six notes n'est dit dans le chapitre : l'étape 2 nomme le castor, le rat musqué et l'orignal sans dire
comment reconnaître leurs étangs et leurs huttes (la photo de la hutte de castor, déjà posée, n'est pas redite) ;
l'étape 27 donne les valeurs, pas l'origine ni les effets ; « Le film vivant » de la section 7 dit qu'il fait le
travail, sans chiffre ; le *Giardia* du rat musqué n'est pas redit (étape 2).

**Ce qui a été coupé au resserrement** (pour tenir sous 80 mots) : la sève « doit être claire et goûter l'eau à peine
sucrée » (gardé : « la jeter si elle n'est plus claire ») ; le seau « en rond ou en ovale », « des mêmes arbres »,
« minces », « à la température de la pièce » (devient « non chauffé ») ; le rat musqué « au bord d'un lac »,
« compact ». « Un petit tas […] veut donc dire qu'un rat musqué vit dessous » (une chose qui parle) devient « Quand
on voit un petit tas de plantes sur la glace d'une baie, un rat musqué vit dessous ».

**La façon des Dénés, et pas des Cris.** La FAO nomme les Cris des bois parmi les nations qui recueillaient la sève,
mais la façon décrite (mai, rabat en V, panier, sève bue ou mise dans la soupe) est celle des Esclaves de Fisherman
Lake (Lamont 1977), c'est-à-dire des Dénés. Les Cris des bois en faisaient du sirop. La note ne nomme que les Dénés.

### Les deux photos

| Fichier | Fait à partir de | Ce qu'on a fait | Taille |
| --- | --- | --- | --- |
| `images/extras/10-etang-castor.jpg` | `images/photos/manquantes/10-barrage-castor.jpg` (USFWS, domaine public) | Photo entière, ramenée à 1 500 px de haut, sans recadrage ni retouche | 2 247 × 1 500 |
| `images/extras/10-hutte-rat-musque.jpg` | `images/photos/35c/35c-35-rat-musque-hutte.jpg` (Игорь Орлов, CC BY 3.0) | Recadrée en 3 × 2 sur la hutte (boîte 360, 450, 3360, 2450 sur l'original de 3 840 × 2 880), ce qui laisse hors du cadre l'horodatage orange du bas ; ramenée à 2 250 × 1 500 ; aucune autre retouche | 2 250 × 1 500 |

Fait au PIL (`Image.LANCZOS`, JPEG qualité 88). Regardées à l'écran : le barrage de branches au premier plan, l'étang
derrière ; la hutte enneigée dans un marais de quenouilles gelé. Pas de copie dans `images/extras/originaux/` : les
originaux sont déjà au dossier, aux chemins ci-dessus. La photo du rat musqué sert aussi au ch. 43 (même fichier).
La photo du barrage est celle que les placements du 29 septembre avaient laissée de côté (« le chapitre ne parle pas
de barrage ») : la note lui donne sa place.

**Crédits à ajouter à `images/credits.md`** (je n'y ai pas touché, fichier commun) : rendus à l'orchestrateur, section
« Notes « En plus » du chapitre 10 ».

### Lecture par le moteur

`extras_html` de `build_chapitre.py` lit six notes, dont deux avec photo (`extra ximg`) ; étapes relevées : 1 ; 2 ; 7 ;
27 ; 2 et 36 ; aucune pour le filtre à sable (renvoi de section seulement).

**Montage d'essai** (`assembler-tome.py 1 --chapitres 10 --hors-ligne --sortie` dans le scratchpad ; rien dans
`livre/`) : 21 pages de chapitre, ouverture à gauche. Cinq notes posées, une par page : la sève p. 10-1 (sous
« Quand l'utiliser »), l'étang de castor p. 10-2 (à côté du Matériel, avant le logigramme), le manganèse p. 10-9
(après l'étape 26), le rat musqué p. 10-12 (après l'étape 49), le filtre à sable p. 10-21 (sous « Réparer plutôt que
remplacer »). **Le seau d'épinette ne trouve pas de page** (« sans trou où se poser ») : il reste dans la réserve.
Aucune note ne touche le pied de page (regardé à l'image). Les deux avertissements « page à moitié vide » (p. 10-2
et 10-9) ne viennent pas des notes : le moteur les pose dans des pages qui se ferment de toute façon.

**Une planche loin de son appel, dans cet essai** (pas causé par les notes ; au metteur en pages) : 10-07 (pleine
page) et 10-03 sont appelées toutes deux p. 10-18 ; 10-07 tombe p. 10-19, 10-03 p. 10-20, soit deux pages après son
appel. À revoir au montage du tome, où le côté d'ouverture peut changer la coupe.

### Les règles du 18 octobre, vérifiées sur tout le chapitre

- **Série orange** : aucune, et c'est juste (`plan/premieres-minutes-inventaire.md` : « l'avis d'ébullition n'est pas
  une affaire de minutes » ; refonte du 18 octobre, plus haut). Rien à mettre en tête de la section 4.
- **Logigramme** juste après le Matériel (ancre « **Filtre à 1 µm ou moins** ») ; la procédure vient après lui (essai :
  double page p. 10-3 et 10-4, l'étape 1 p. 10-5).
- **Pictogrammes** : douze poses, chacune au début de la phrase de l'étape où le danger se présente, ids tous dans la
  section 1 de l'inventaire : `selles` (étapes 2 et 19), `generatrice` (6), `chimie` (20 ; hypochlorite ; électrolyse),
  `poison` (27), `glace` (36), `froid` (40), `plomb` (48), `co`, `pas-au-feu`, `projection`, `incendie`, `vapeurs`
  (section 7). Aucun dans les notes En plus.
- **Planches appelées** : 10-01 (étapes 8 et 14), 10-08 (étape 10), 10-02 (la buse), 10-07 (le filtre à sable),
  10-03 (l'alambic), chacune une fois par phrase ; chaque ancre est un début de paragraphe unique (contrôle : aucune
  ancre introuvable). La photo de la hutte de castor reste ancrée à l'étape 2.
- **Inventaire des dangers à mettre à jour** (fichiers communs, pas touchés) : la ligne du ch. 10 de la section 3
  donne encore les étapes d'avant la refonte (5, 1 ou 11, 10 et 16, 25, 42, 43), et la colonne « Chapitres » de la
  section 1 n'a pas le 10 pour `vapeurs`, `incendie`, `pas-au-feu`, `projection`, `froid` et `glace` (déjà noté le
  18 octobre). Le texte exact est rendu à l'orchestrateur, avec les lignes « Où il revient » des pages des dangers
  qui ne nomment pas le ch. 10 (`co`, `generatrice`, `vapeurs`, `incendie`, `pas-au-feu`, `projection`, `froid`,
  `glace`).

### controle.py

9 289 mots (8 764 avant les notes) ; 2 tirets (titre et ligne de tome, comme avant) ; 0 « § » ; 0 mot banni ; aucune
tournure, maxime, pronominal ni mise en relief signalé dans la section En plus. Deux mots vides signalés dans les notes,
jugés : « presque toute de l'eau » et « loin de toute pollution » (le mot porte le fait). Aucune redite nouvelle.
Invariants contre la version d'avant les notes : rien n'a disparu.

### Pistes regardées et non retenues

- **La vieille glace de mer** (NSIDC, `13-nsidc-glace-de-mer-saumure.md` : la glace de plusieurs années est presque
  douce, les expéditions polaires en tirent leur eau) : vrai, mais il n'y a pas de glace de plusieurs années devant la
  Côte-Nord, et le reste redit « Dessaler par le gel ».
- **Bouillir dans la panse d'une bête** (Speth 2015, qui cite Skinner sur les Cris) : la source nomme la façon sans la
  décrire ; il aurait fallu une page nouvelle.
- **La marmite de pierre à savon et les seaux de peau de phoque des Inuits** (Turner 1894, l. 3074 à 3108) : les
  pierres chaudes sont déjà dans la section 7.
- **Le thé du Labrador** (`34n-the-du-labrador-toxicite-et-usage.md`) : c'est le ch. 34.
- **Reconnaître une chaudière galvanisée** (photo `images/photos/60/13-chaudiere-galvanisee.jpg`, CC BY-SA 3.0) : aucune
  source au dossier ne dit à quoi on reconnaît le zinc ; le texte aurait été sans source.

## Corrections après la vérification technique, 19 octobre 2026

Rôle 2, rédacteur. Le vérificateur technique a relu la section « En plus » (trois points). **Aucune source nouvelle
cherchée** (JP, 19 octobre 2026 : « fuck les sources, on a pas déjà fait ce travail-là ? ») : les trois points se
règlent avec les pages déjà au dossier, relues ici aux lignes que le vérificateur cite. Les trois sont appliqués ;
aucun n'est écarté.

### 1. Le manganèse (erreur) : appliqué

- **La note « Le manganèse et l'arsenic du roc ».** « une eau qui contient de 0,02 à 0,8 mg/L » devient « une eau qui
  contient **en moyenne** de 0,02 à 0,8 mg/L ». Relu dans `sources/13-quebec-manganese.md`, source 2 (INSPQ, fiche
  Manganèse) : « concentrations **moyennes** dans l'eau potable : 20 – 800 µg/L ». Sans le mot, la note se lisait
  comme si une eau à 0,02 mg/L était liée aux effets chez l'enfant. 76 mots.
- **Section 6, ligne « Taches noires sur la lessive et la porcelaine ».** L'action « Faire analyser l'eau ; à ce
  niveau, le manganèse tache, sans danger pour la santé » devient « Faire analyser l'eau, et comparer le résultat aux
  cibles de santé de la section 5 (0,06 et 0,12 mg/L) ». « Sans danger pour la santé » à 0,02 mg/L n'a pas de
  source : le tableau « Trois seuils » de `sources/13-quebec-manganese.md` donne 0,02 mg/L comme objectif esthétique
  (les taches), et les valeurs de santé à 0,06 mg/L (le bébé au biberon) et 0,12 mg/L. Écart de forme avec la
  correction proposée (« Faire analyser l'eau ; à ce niveau, le manganèse tache ; pour la santé, comparer aux cibles
  de la section 5 (0,06 et 0,12 mg/L) ») : « à ce niveau, le manganèse tache » redisait l'observation de la même
  ligne (« Taches noires sur la lessive »), et trois morceaux entre points-virgules se lisaient en code (règle 0).
  Le fond est le même : plus de « sans danger », renvoi aux deux cibles de santé.
- Ce qui ne bouge pas : la section 5 (« taches sur la lessive dès 0,02 mg/L » ; cibles 0,06 et 0,12 mg/L), déjà juste.
  Aucun autre chapitre ni le logigramme ne disent « sans danger » pour le manganèse (grep).

### 2. Le rat musqué (à préciser) : appliqué

« Quand on voit un petit tas de plantes sur la glace d'une baie, un rat musqué vit dessous (étape 36). » devient « Un
petit tas de plantes posé sur la glace d'une baie couvre donc un de ces trous (étape 36). » Relu dans
`sources/43b-hww-rat-musque-texte.txt` : l. 87, le rat musqué recouvre le trou de boue et de végétaux (la « cloche »)
et « vient s'y reposer ou y manger » quand il sort sous la glace ; l. 99, la glace le confine « à sa hutte (ou
terrier) ». Il ne vit donc pas sous le petit tas. Ce qui sert à l'étape 36 (`{!glace}`), c'est que la glace est
ouverte dessous ; la note le dit maintenant. 76 mots. Le titre « Le rat musqué sous la glace » reste : la note parle
toujours de ce qu'il fait l'hiver sous la glace. D'accord avec le ch. 43 (trous gardés ouverts jusqu'à 90 m de la
hutte) ; `dangers/partie-1.md` ne parle que de la glace mince autour d'une hutte de castor, et la note ne la contredit pas.

### 3. Les crédits des deux photos (à préciser) : rendu à l'orchestrateur

`images/credits.md` est un fichier commun : je n'y touche pas. La section à ajouter, au mot près, est rendue à
l'orchestrateur (« ## Notes « En plus » du chapitre 10 (19 octobre 2026) », deux lignes). Licences relues :
`images/photos/registre-manquantes.md`, l. 43 (USFWS, Courtney Celley, domaine public) ; `images/photos/registre-35c.md`,
l. 71 (Игорь Орлов, CC BY 3.0). La ligne de la hutte de rat musqué nomme l'auteur et dit la modification (recadrée,
réduite), comme la CC BY 3.0 le demande. Tailles relues sur les fichiers : 2 247 × 1 500 et 2 250 × 1 500.

### controle.py

9 294 mots (9 289 avant ces corrections) ; 2 tirets (titre et ligne de tome, comme avant) ; 0 « § » ; 0 mot banni.
Aucun avis nouveau dans les trois lignes touchées ; les avis restants sont ceux déjà jugés aux passes d'avant.
Invariants contre la version d'avant ces corrections : rien n'a disparu. Aucune étape renumérotée, aucune ancre
touchée.

`sources/10-en-plus-notes-2026-10-19.md` suit : note 4, « concentrations moyennes » rendu par « en moyenne » ; note 5,
« Ce que la note en tire » (le petit tas couvre un trou, le rat musqué vit dans sa hutte ou son terrier).

## Décisions de JP, 19 octobre 2026

- Section 7, l'électrolyse : la phrase « Une électrode d'acier ou de cuivre se dissout dans le liquide, et on boit le
  métal [À VÉRIFIER] » est coupée (aucune source) ; la consigne des électrodes de carbone tient sans elle. Le chapitre
  n'a plus de [À VÉRIFIER].
- Étape 49 : « (40 ou 60 gallons) » reste : c'est ce qu'on lit sur l'étiquette du chauffe-eau.

## Points réglés après l'édition, 19 octobre 2026

Rédacteur (rôle 2), sur les points que l'éditeur a laissés parce qu'ils touchent un fait (lot 18-10, `edition.faits`).
Aucune recherche nouvelle ; une page déjà au dossier rouverte pour trancher (désinfection du puits). Fichier en LF, gardé
en LF. Aucune étape renumérotée, aucune ancre touchée (les sept débuts de paragraphe ancrés sont intacts), logigramme
non touché (sa boîte « Il ne reste que le fleuve » dit déjà l'alambic ou le gel).

| # | Où | Ce qui a changé | Règle ou source |
| --- | --- | --- | --- |
| 1 | Étape 1 | Contradiction interne : « seuls l'alambic et l'osmose inverse l'enlèvent », alors que la même étape et la section 7 (« Dessaler par le gel ») enlèvent aussi le sel par le gel. La phrase s'arrête à « n'enlève pas le sel », et la dernière dit les trois façons : « on enlève le sel avec un appareil d'osmose inverse, sinon on passe l'eau à l'alambic ou on la dessale par le gel (section 7) » | Section 7 du chapitre ; aucun chiffre |
| 2 | Section 7, « Ce qu'on perd », « Ce qui est dissous » | Même contradiction : « Seul l'alambic enlève ce qui est dissous » devient « À part le sel, que le gel enlève aussi, seul l'alambic enlève ce qui est dissous » | Section 7, « Dessaler par le gel » |
| 3 | Étape 6 | « à au moins 6 m du chalet ou de la maison » devient « à au moins 6 m de tout bâtiment », comme au ch. 18, étape 6, corrigé le même jour d'après la même source | `sources/10-sante-canada-generatrice-distance.md` (« entre toute habitation ou tout bâtiment ») ; page `generatrice` (« à au moins 6 m (20 pi) de tout bâtiment ») |
| 4 | Étape 35, titre | « une semaine après la désinfection, puis quatre semaines plus tard » (on pouvait lire 1 et 5 semaines) devient « une semaine, puis quatre semaines après la désinfection », comme la section 5 (« une après 1 semaine, une après 4 semaines ») | `sources/10-melcc-desinfection-puits-procedure.md`, en-tête : « analyses à 1 et 4 semaines » (la lecture du dossier ; la phrase du ministère, « une semaine suivant la désinfection et quatre semaines plus tard », est reprise mot pour mot par la municipalité des Éboulements) |
| 5 | Étape 49, « (40 ou 60 gallons) » | Rien : JP l'a gardé (« Décisions de JP, 19 octobre 2026 », plus haut) | Décision de JP |

**Pour l'intégrateur** (fichiers communs, pas touchés) :
- `design/epreuves-livre/placements-tome-1.json`, clé `"10"`, photo `10-hutte-castor`, légende : « Hutte de castor en
  hiver : un dôme de branches sous la neige. Faire bouillir cinq minutes toute eau prise en aval, glace comprise. »
  devient « Hutte de castor en hiver : un dôme de branches sous la neige. » La consigne des 5 minutes est aux étapes 14
  et 41 ; la légende dit ce qu'on voit.
- `images/planches-src/10-07.js`, champ `desc` et en-tête (pas imprimés) : « une main de grosse pierre » devient « une
  couche de grosses pierres » ; « seau » devient « chaudière » ; le sable se lave jusqu'à ce que l'eau soit « encore un
  peu sale » (pas « claire ») ; quand le débit tombe, on frotte le dessus à peine, la paume à plat, en rond (pas « gratter
  à plat sur 20 à 30 mm ») ; plus d'« encadré danger ». Les légendes imprimées collent déjà au texte.

**controle.py** contre `HEAD` (17487ee) : 9 284 → 9 290 mots ; 2 tirets (titre et ligne de tome) ; 0 « § », 0 mot banni.
Les avis à juger sont ceux d'avant, déjà jugés le 18 et à l'édition ; aucun n'est sur une ligne touchée. Invariants :
rien n'a disparu. **Chiffres** : aucun chiffre nouveau ; le 6 m change de référence (de tout bâtiment) sans changer de
valeur ni de source.

## Décisions de JP, 19 octobre 2026 (suite) : la légende de la hutte de castor

Rédacteur de la passe « décisions de JP ». `design/epreuves-livre/placements-tome-1.json`, clé « 10 », photo
`10-hutte-castor` : la légende devient « Hutte de castor en hiver : un dôme de branches sous la neige. », comme demandé
plus haut à l'intégrateur. La consigne des 5 minutes reste aux étapes 14 et 41. Le chapitre n'est pas touché.

### Après la vérification technique (19 octobre 2026)

Corrections du rédacteur sur les points du vérificateur de la passe « décisions de JP ».

| Point | Où | Ce qui a changé | Source ou raison |
| --- | --- | --- | --- |
| Décision 5, « pour quatre personnes » | Étape 26 ; section 5, ligne « Réserve traitée » ; section 7, « Puiser un puits quand la pompe est morte », tiret « Ce qu'elle remonte » | « Pour quatre personnes, ça donne 16 L par jour », « **48 L** pour quatre personnes » et « les 16 L d'une journée pour quatre personnes » disent « une famille de quatre » | Décision 5 (« une famille de quatre » comme exemple), étendue du ch. 00b aux calculs du tome 1 que le vérificateur a relevés : ils supposaient la famille de JP. Les chiffres ne changent pas |

Contrôle : `controle.py --avant` (HEAD) : 9 298 → 9 304 mots ; 2 tirets (titre et ligne de tome) ; rien n'a disparu. Fins de ligne LF.
