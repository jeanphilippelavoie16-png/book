# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN) : gibier, poissons, moelle et corps gras

- **Organisme :** Santé Canada, Fichier canadien sur les éléments nutritifs (FCÉN / CNF)
- **Portail :** https://food-nutrition.canada.ca/cnf-fce/?lang=fr
- **Interface interrogée (API publique) :**
  - liste des aliments : `https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&type=json`
  - valeurs d'un aliment : `https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?lang=fr&type=json&id=<code>`
- **Consultée le :** 24 septembre 2026
- **Page enregistrée :** les réponses brutes de l'API, aliment par aliment, sont au dossier dans
  `sources/24-sante-canada-fcen-gibier-poissons-gras-donnees.json` (l'API sert les accents
  abîmés, « truite mouchet�e » ; les descriptions sont rétablies ci-dessous).
- **Base :** par 100 g de partie comestible. `obs.` = `number_observation` renvoyé par l'API ;
  **0 veut dire valeur empruntée ou imputée par la base, pas une moyenne d'analyses.**
- **Chapitres :** 24 (tableaux des §3 et §5, étape 10 ; acides gras de l'étape 10).
  Remplace, pour le Canada, `24-usda-fdc-composition-gibier-et-gras.md`, dont la note
  demandait de reprendre chaque ligne dans le FCÉN.

---

## Extraits intégraux — protéines (203), lipides totaux (204), énergie kcal (208), 18:2 (618), 18:3 (619)

| Code | Description FCÉN | Prot. g | Lip. g (obs.) | kcal | 18:2 g | 18:3 g |
| --- | --- | --- | --- | --- | --- | --- |
| 3587 | Gibier, viande, autochtone, orignal, cru | 22,0 | 3,0 (0) | 124 | 0,14 | 0,03 |
| 3595 | Gibier, viande, autochtone, lapin, sauvage, cru | 21,5 | 1,05 (0) | **64** | 0,2 | — |
| 3064 | Poisson, éperlan, arc-en-ciel (d'Amérique), cru | 17,63 | 2,42 (52) | 97 | 0,045 | 0,049 |
| 3577 | Gibier, viande, autochtone, caribou (renne), viande, crue | 22,5 | 2,6 (0) | 122 | 0,6 | — |
| 3567 | Gibier, viande, autochtone, castor, cru | 19,0 | 5,0 (0) | 123 | — | — |
| 3208 | Poisson, corégone de lac, autochtone, crues | 19,0 | 3,8 (0) | 114 | 0,2 | 0,1 |
| 3204 | Poisson, truite, espèces diverses, crues | 20,77 | 6,61 (111) | 148 | 0,175 | 0,155 |
| **7234** | **Poisson, truite mouchetée, crue** | 21,23 | **2,73 (3)** | **110** | 0,214 | 0,052 |
| 3230 | Poisson, omble chevalier, autochtone, viande, cru | 19,5 | 2,65 (0) | 103 | 0,013 | 0,0 |
| 3565 | Gibier, viande, autochtone, ours, cru | 22,0 | 4,0 (0) | 128 | — | — |
| 3641 | Gibier, viande, autochtone, caribou (renne), moelle osseuse, crue | 6,9 | 83,4 (0) | 782 | 0,6 | 0,3 |
| **5820** | **Gibier, viande, autochtone, orignal, moelle osseuse, crue** | 9,0 | **44,0 (0)** | **441** | — | — |
| 5822 | Gibier, viande, autochtone, orignal, gras, cru | 2,0 | 91,0 (0) | 835 | 1,9 | 1,8 |
| 5805 | Gibier, viande, autochtone, caribou (renne), gras, cru | 2,9 | 91,0 (0) | 831 | 0,6 | 0,6 |
| 5802 | Gibier, viande, autochtone, castor, queue, rôtie | 11,0 | 43,0 (0) | 437 | — | — |
| 414 | Gras animal, suif de bœuf (gras de bœuf) | 0,0 | 100,0 | 902 | 3,1 | 0,6 |
| 2665 | Bœuf, graisse de rognons (suif), cru | 1,5 | 94,0 (1) | 854 | 2,15 | 0,86 |
| 464 | Gras animal, saindoux (porc) | 0,0 | 100,0 | 902 | 10,2 | 1,0 |
| 535 | Gras animal, autochtone, huile de phoque | 0,0 | 100,0 | 884 | 0,95 | 0,79 |
| 5891 | Gras animal, autochtone, phoque barbu, huile (oogruk) | 0,56 | 99,6 (4) | 899 | 0,873 | 0,855 |

« — » : nutriment absent de la réponse de l'API pour cet aliment.

## Calculs faits par le livre (pas des valeurs publiées)

Part des calories venant des protéines = protéines × 4 ÷ kcal publiées :
orignal 71 % · caribou 74 % · castor 62 % · corégone 67 % · truite espèces diverses 56 % ·
**truite mouchetée 77 %** · omble chevalier 76 % · ours 69 % · éperlan 73 % · moelle de caribou 4 % ·
moelle d'orignal 8 %.

## Réserves, à lire avant d'employer un chiffre

1. **Lapin sauvage (3595) : l'énergie publiée est incohérente.** 21,5 g de protéines font à eux
   seuls 86 kcal ; la base affiche 64 kcal. Ne pas s'en servir pour un pourcentage ; les
   macronutriments seuls donnent 21,5 × 4 + 1,05 × 9 ≈ 95 kcal, soit environ 90 % des calories
   en protéines.
2. Les entrées « autochtone » ont presque toutes 0 observation : ce sont des valeurs reprises
   d'autres jeux, pas des analyses canadiennes. Elles s'écartent de l'USDA pour l'orignal
   (3,0 g de lipides contre 0,74), l'ours (4,0 contre 8,3), le corégone (3,8 contre 5,86). Les
   deux jeux sont officiels ; l'écart est celui d'une bête à l'autre et d'une saison à l'autre.
3. **La truite mouchetée (7234) a sa propre entrée, mesurée (3 observations)** : 2,73 g de
   lipides et 110 kcal, deux fois et demie moins grasse que la « truite, espèces diverses »
   (6,61 g) que le chapitre employait. L'omble chevalier est au même niveau (2,65 g).
4. **La moelle d'orignal (5820) n'est pas la moelle de caribou** : 44 g de lipides et 441 kcal
   par 100 g, contre 83,4 g et 782 kcal pour le caribou.
