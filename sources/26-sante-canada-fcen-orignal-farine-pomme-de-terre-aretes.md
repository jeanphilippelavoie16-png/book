# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN) : orignal, farine, pomme de terre, poisson avec arêtes, foie de phoque

- **Organisme :** Santé Canada, Fichier canadien sur les éléments nutritifs (FCÉN)
- **Interface interrogée :** API publique du FCÉN
  - liste des aliments : https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&type=json
  - teneurs : https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?id=<code>&lang=fr&type=json
  - codes de provenance : https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientsource/?lang=fr&type=json
- **Recherche par aliment (site public) :** https://aliments-nutrition.canada.ca/cnf-fce/?lang=fre
- **Consultée le :** 24 septembre 2026
- **Données brutes enregistrées :** `sources/26-sante-canada-fcen-donnees-2026-09-24.json` (toutes les
  teneurs de chaque aliment ci-dessous, telles que l'API les a rendues)
- **Chapitre :** 26 — sections 5.3, 5.4, 5.6, 8 et 9

## Extraits intégraux — valeurs par 100 g de partie comestible

| Code FCÉN | Description FCÉN (texte intégral) | kcal | Protéines (g) | Lipides (g) | Glucides (g) | Calcium (mg) | Rétinol (µg) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 3587 | « Gibier, viande, autochtone, orignal, cru » | **124** | **22,0** | **3,0** | 0,0 | 6 | 1,5 |
| 4501 | « Grains céréaliers, farine de blé, blanche, tout usage, blanchie » | 364 | 12,1 | 2,5 | **71,4** | 14 | 0 |
| 6642 | « Grains céréaliers, farine de blé, blanche, tout usage, non blanchie » | 366 | 12,2 | 2,2 | **72,3** | 14 | 0 |
| 2505 | « Pomme de terre, chair et pelure, crue » | 77 | 2,0 | 0,09 | **17,5** (amidon 15,4) | 12 | 0 |
| 5284 | « Pomme de terre, Russet, chair et pelure, crue » | 79 | 2,1 | 0,08 | 18,1 (amidon 15,9) | 13 | 0 |
| 3064 | « Poisson, éperlan, arc-en-ciel (d'amérique), cru » | 97 | 17,6 | 2,4 | 0 | 60 | 15 |
| 3065 | « Poisson, éperlan, arc-en-ciel (d'amérique), cuit au four ou grillé » | 124 | 22,6 | 3,1 | 0 | 77 | 17 |
| 3225 | « Poisson, saumon, rose, conserve, chair avec arêtes et liquide, sans sel » | 139 | 19,8 | 6,1 | 0 | **213** | 17 |
| 7082 | « Poisson, saumon, rose, conserve, égoutté, sans peau et os » | 136 | — | — | — | **60** | — |
| 3203 | « Poisson, sardine, Atlantique, conserve, dans l' huile, égoutté avec arêtes » | 208 | 24,6 | 11,5 | 0 | **382** | 32 |
| 2204 | « Algue, varech (kelp, kombu, tangle), crue » | 43 | 1,7 | 0,6 | 9,6 | 168 | 0 |
| 5788 | « Gibier, viande, autochtone, phoque annelé, foie, cru » | 138 | 23,0 | 3,45 | 0,5 | 7 | **3 710** (ÉAR 3 710, 3 observations) |

Provenance déclarée par le FCÉN pour l'orignal cru (3587) et le foie de phoque annelé (5788) :
code 10, « Nutriment provenant de la littérature scientifique ». Pour la farine (4501, 6642) :
code 107. Les autres lignes : code 0, « Provient intégralement de l'USDA », ou 4, « Nutriment
calculé d'après les données de l'USDA ».

**Aucune teneur en iode** n'est donnée pour le varech (2204) ni pour aucune autre algue du FCÉN.

## Lecture

1. **Orignal cru : 22,0 g de protéines, 3,0 g de lipides, 124 kcal aux 100 g.** Le FCÉN donne le
   double du gras que le chapitre supposait (1,5 g). La base USDA, reprise au chapitre 24
   (`sources/24-usda-fdc-composition-gibier-et-gras.md`), donne 0,74 g et 102 kcal : les deux
   bases ne s'accordent pas sur le gras de l'orignal, ce qui est normal pour une bête sauvage dont
   le gras varie avec la saison et le morceau. La règle 2 fait retenir le FCÉN.
2. **Calculs du livre à partir de ces valeurs** (divisions, pas des valeurs publiées) :
   - 300 g de protéines ÷ 22,0 g/100 g = **1,36 kg** d'orignal cru ;
   - 1,36 kg × 124 kcal/100 g = **1 690 kcal** environ ;
   - 3 440 − 1 690 = 1 750 kcal à combler ; ÷ 9 kcal/g = **environ 195 g de gras** ;
   - 1 690 ÷ 3 440 = **49 %** des calories du jour.
3. **Farine tout usage : environ 72 g de glucides aux 100 g. Pomme de terre crue, chair et pelure :
   17,5 g.** Calculs du livre : 130 g de glucides = environ **180 g de farine** ou environ
   **740 g de pommes de terre** par personne et par jour ; 52 kg de glucides = environ **72 kg de
   farine** ou environ **300 kg de pommes de terre**.
4. **Ce sont les arêtes qui portent le calcium.** Le même saumon rose en conserve donne 213 mg de
   calcium aux 100 g avec ses arêtes et 60 mg sans la peau et les os. La sardine en conserve avec
   arêtes : 382 mg. Calculs du livre : 1 000 mg = environ **470 g** de saumon rose en conserve
   avec arêtes, ou environ **260 g** de sardines avec arêtes. L'éperlan (3064, 3065) est donné en
   chair seulement et ne sert pas à chiffrer l'arête.
5. **Foie de phoque annelé cru : 3 710 µg de rétinol aux 100 g.** Contre l'apport maximal tolérable
   (`sources/26-sante-canada-anref-vitamines.md`) : 3 710 ÷ 3 000 = 1,2 fois celui de l'adulte ;
   3 710 ÷ 900 = **4,1 fois** celui de l'enfant de 4 à 8 ans, pour 100 g. La base USDA donne
   4 880 µg ÉAR (`sources/41-usda-fdc-composition-abats.md`). Le phoque annelé n'est pas une espèce
   du Saint-Laurent ; c'est la seule donnée de foie de phoque du FCÉN. **Aucune entrée de foie
   d'ours** dans le FCÉN (seulement « ours, cru », « mijoté », « fumé » et les entrées d'ours
   polaire, viande et gras).
