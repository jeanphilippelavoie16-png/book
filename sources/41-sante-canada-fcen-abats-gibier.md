# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN) : abats de gibier et de mammifères marins

- **Organisme :** Santé Canada, *Fichier canadien sur les éléments nutritifs* (FCÉN), API publique
- **URL de l'API :** https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?id=<code>&lang=fr&type=json
  (liste des aliments : https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&type=json ;
  fiche lisible : https://aliments-nutrition.canada.ca/cnf-fce/ , recherche par code)
- **Fichiers enregistrés :** `41-sante-canada-fcen-abats-gibier-donnees.json` (13 aliments, captés
  le 23 septembre par le premier passage) et `41-sante-canada-fcen-foies-complement-2026-09-24.json`
  (5 aliments, captés le 24 septembre). Réponses intégrales de l'API, tous nutriments.
- **Consultée le :** 24 septembre 2026
- **Sert dans :** chapitre 41, §2, §3, §5, §8 — c'est la source que le premier jet visait
  (`41-usda-fdc-composition-abats.md` : « reprendre chaque ligne dans le FCÉN »). Règle 2 de
  `CLAUDE.md` : la source canadienne prime.
- **Revérification américaine du même jour :** `41-usda-fdc-abats-donnees-2026-09-24.json`
  (USDA FoodData Central, SR Legacy, 9 fiches relues) — toutes les valeurs USDA du chapitre sont
  confirmées telles quelles.

## Extraits intégraux — par 100 g de partie comestible (valeurs de l'API, telles que servies)

| Code FCÉN | Description FCÉN | Lipides (g) | Énergie (kcal) | Fer (mg) | Rétinol / ÉAR (µg) | Vit. C (mg) | Cuivre (mg) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 5817 | « Gibier, viande, autochtone, caribou, (renne), langue, crue » | **23,5** | **276** | 2,35 | 11,4 | — | 0,2 |
| 3587 | « Gibier, viande, autochtone, orignal, cru » | **3,0** | 124 | 3,0 | 1,5 | 4,0 | 0,1 |
| 3641 | « Gibier, viande, autochtone, caribou (renne), moelle osseuse, crue » | **83,4** | **782** | 2,7 | 46,8 | 0,0 | — |
| 5820 | « Gibier, viande, autochtone, orignal, moelle osseuse, crue » | 44,0 | 441 | — | — | — | 0,01 |
| 5828 | « Gibier, viande, autochtone, orignal, foie, cru » | 2,1 | 130 | 22,0 | **4 608** | *aucune valeur* | 2,0 |
| 5829 | « Gibier, viande, autochtone, orignal, foie, rôti » | 2,8 | 170 | **23,0** | **12 000** | *aucune valeur* | 2,0 |
| 5815 | « Gibier, viande, autochtone, caribou, (renne), foie, cru » | 2,7 | 125 | **33,0** | **6 267** | **23,76** | 3,5 |
| 5827 | « Gibier, viande, autochtone, orignal, rognon, cru » | 1,3 | 86 | 5,7 | — | — | — |
| 5788 | « Gibier, viande, autochtone, phoque annelé, foie, cru » | 3,45 | 138 | 49,0 | **3 710** (n = 3) | 7,0 | 1,25 |
| 5903 | « Gibier, viande, autochtone, morse, foie, cru » | 3,0 | 125 | 14,4 | **4 283** | — | — |
| 5877 | « Gibier, viande, autochtone, béluga, foie, cru » | 3,9 | 117 | — | **6 636** | — | — |
| 5803 | « Gibier, viande, autochtone, castor, foie, cru » | 2,2 | 122 | 30,0 | 705 | — | — |
| 5894 | « Poisson, grand brochet, autochtone, foie » | **8,0** | 156 | 2,1 | 258 | — | — |
| 5888 | « Poisson, morue-lingue, autochtone, foie » | **42,0** | 425 | 1,0 | 2 733 | 0,0 | — |
| 5850 | « Poisson, lotte (loche), autochtone, foie, cru » | **29,0** | 370 | 2,0 | **4 000** | — | — |
| 5830 | « Gibier, viande, autochtone, orignal, sang, cru » | 0,5 | 92 | 62,0 | — | — | 0,03 |

« — » : nutriment absent de la réponse de l'API. *Aucune valeur* : absent, à ne pas lire comme zéro.
Source de la plupart des valeurs selon l'API : « Nutriment provenant de la littérature
scientifique » ; brochet et morue-lingue : « Provient intégralement de l'USDA ».

**Absents du FCÉN :** aucune entrée pour le **foie d'ours** (noir ou blanc), ni pour le **foie de
grand corégone**, ni pour le foie d'orignal **braisé** (seulement cru et rôti).

## Comparaison avec les valeurs USDA du chapitre (revérifiées le 24 septembre)

| Chiffre du chapitre 41 | USDA (fdcId) | FCÉN (code) |
| --- | --- | --- |
| Langue de caribou crue : 22,8 g de lipides, 260 kcal | 22,8 g · 260 kcal (168985) | **23,5 g · 276 kcal** (5817) |
| Muscle d'orignal cru : 0,74 g de lipides | 0,74 g (174344) | **3,0 g** (3587) |
| Moelle de caribou crue : 84,4 g, 786 kcal | 84,4 g · 786 kcal (169800) | **83,4 g · 782 kcal** (3641) |
| Foie d'orignal braisé : vit. C 22,6 mg | 22,6 mg (167609) | aucune valeur de vit. C pour le foie d'orignal |
| Foie de phoque annelé : vit. A 4 880 µg ÉAR | 4 880 µg (168026) | **3 710 µg** (5788) |
| Foie de caribou cru : fer 15,7 mg | 15,7 mg (168983) | **33,0 mg** (5815) |
| Foie de brochet : 8,0 g de lipides | 8,0 g (168021) | 8,0 g (5894) |
| Foie de grand corégone : 4,4 g | 4,4 g (167626) | pas d'entrée |
| Foie « d'espèces marines » : jusqu'à 42,0 g | 42,0 g, morue-lingue (169810) | 42,0 g (5888) |
| Foie d'orignal braisé : fer 6,77 mg, cuivre 2,79 mg, B12 71 µg | 6,77 · 2,79 · 71,0 (167609) | foie rôti : fer **23,0**, cuivre **2,0**, pas de B12 (5829) |

## Calculs faits par le vérificateur (pas publiés)

- 23,5 ÷ 3,0 = **7,8** (langue / muscle, FCÉN) ; 22,8 ÷ 0,74 = 30,8 (USDA).
- Phoque annelé, FCÉN : 3 710 ÷ 3 000 = **1,24** ; 3 710 ÷ 900 = **4,12** ; 3 710 ÷ 600 = **6,18**.
