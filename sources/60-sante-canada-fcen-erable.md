# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN), produits de l'érable

- **Organisme :** Santé Canada
- **Base de données :** Fichier canadien sur les éléments nutritifs (FCÉN / CNF)
- **Portail :** https://food-nutrition.canada.ca/cnf-fce/?lang=fr
- **Interface interrogée (API publique) :**
  - liste des aliments : `https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&type=json`
  - valeurs nutritives : `https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?lang=fr&type=json&id=<code>`
- **Date de consultation :** 2026-09-20
- **Base de calcul :** toutes les valeurs sont **par 100 g d'aliment**
- **Chapitres qui l'utilisent :** **60 (§2, §3, §6, §9)**, 26 et 67 à venir

## Extrait intégral — code 4326, « Confiseries, sirop d'érable, en vrac »

| Élément nutritif (libellé exact de la base) | Valeur / 100 g | Nombre d'observations |
| --- | --- | --- |
| Eau | **32,15 g** | 90 |
| Glucides | **66,89 g** | 90 |
| Sucres totaux | **59,916 g** | 90 |
| Glucose | 0,651 g | 90 |
| Fructose | 0,336 g | 90 |
| Lipides totaux | **0,244 g** | 90 |
| Protéines | **0,04 g** | 8 |
| Fibres alimentaires totales | 0,0 g | 1 |
| **Vitamine C** | **0,0 mg** | **0** |
| Énergie (kcal) | **260** | 0 |
| Énergie (kJ) | **1 088** | 0 |
| Potassium, K | 224,82 mg | 90 |
| Calcium, Ca | 108,87 mg | 600 |
| Magnésium, Mg | 20,94 mg | 600 |
| Manganèse, Mn | 2,3 mg | 600 |
| Zinc, Zn | 0,7 mg | 600 |
| Sodium, Na | 9,0 mg | 13 |
| Fer, Fe | 0,11 mg | 8 |
| Riboflavine | 1,272 mg | 90 |
| Cendres | 0,713 g | 90 |

## Extrait intégral — code 6175, « Confiseries, sirop d'érable, préemballé »

| Élément nutritif | Valeur / 100 g | Observations |
| --- | --- | --- |
| Eau | 32,095 g | 20 |
| Glucides | 67,215 g | 20 |
| Sucres totaux | 58,59 g | 20 |
| Lipides totaux | 0,145 g | 20 |
| Protéines | 0,0 g | 3 |
| Vitamine C | 0,0 mg | 0 |
| Énergie (kcal) | 270 | 20 |
| Manganèse, Mn | 3,846 mg | 80 |
| Calcium, Ca | 72,788 mg | 80 |
| Potassium, K | 214,55 mg | 20 |
| Riboflavine | 0,732 mg | 20 |

## Extrait intégral — code 6176, « Confiseries, sucre d'érable, granulé »

| Élément nutritif | Valeur / 100 g | Observations |
| --- | --- | --- |
| Eau | **3,492 g** | 45 |
| Glucides | **95,146 g** | 0 |
| Sucres totaux | 85,224 g | 0 |
| Énergie (kcal) | **384** | 0 |
| Vitamine C | 0,0 mg | 0 |
| Calcium, Ca | 161,24 mg | 45 |
| Manganèse, Mn | 1,284 mg | 45 |

## Réserves de captation, à lire avant d'utiliser un de ces chiffres

1. **Les deux entrées de sirop ne concordent pas entre elles.** Le sirop en vrac donne
   66,89 g de glucides et 260 kcal ; le préemballé donne 67,215 g et 270 kcal. L'écart est
   petit mais il est réel, et il rappelle que ces valeurs sont des moyennes d'échantillons du
   commerce, pas une norme. Le chapitre 60 utilise le **sirop en vrac (4326)** partout, parce
   que c'est la forme la plus proche d'un produit fait au chalet, et le dit.
2. **Plusieurs valeurs portent `number_observation` = 0**, dont les deux valeurs d'énergie du
   code 4326 et la quasi-totalité du code 6176 (sucre granulé) : ce sont des valeurs
   **imputées ou calculées**, pas des moyennes d'analyses. Les glucides, les sucres, l'eau et
   les lipides du code 4326, eux, reposent sur 90 observations.
3. **La vitamine C à 0,0 mg repose sur 0 observation.** Le chapitre s'en sert pour dire que le
   sirop n'est pas une source de vitamine C. L'affirmation reste défendable — il n'y a aucune
   raison qu'un sucre concentré à chaud en contienne — mais elle n'est pas mesurée. **Elle est
   marquée dans la fiche de suivi.**
4. Les libellés de la base rangent le sirop d'érable dans « Confiseries ». Ce n'est pas une
   erreur de captation.
5. **Aucune entrée de sève d'érable, de sève de bouleau, de sirop de bouleau, d'écorce ou de
   gomme de conifère n'existe dans le FCÉN.** Recherche faite sur les chaînes « érable » et
   « bouleau » dans la liste complète des 5 690 aliments. C'est la raison pour laquelle le
   chapitre 60 ne chiffre ni la sève, ni l'écorce interne.
