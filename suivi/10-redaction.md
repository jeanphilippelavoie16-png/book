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
