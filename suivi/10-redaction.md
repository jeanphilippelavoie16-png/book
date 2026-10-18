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
