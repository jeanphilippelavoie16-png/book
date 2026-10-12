# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN), vitamine C

- **Organisme :** Santé Canada
- **Base de données :** Fichier canadien sur les éléments nutritifs (FCÉN / CNF)
- **Portail :** https://food-nutrition.canada.ca/cnf-fce/?lang=fr
- **Interface interrogée (API publique) :**
  - liste des aliments : `https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&type=json`
  - valeurs nutritives d'un aliment : `https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?lang=fr&type=json&id=<code>`
- **Date de consultation :** 2026-09-20
- **Nutriment :** « Vitamine C, acide ascorbique », `nutrient_name_id` 401
- **Base de calcul :** toutes les valeurs sont **par 100 g d'aliment**
- **Chapitres qui l'utilisent :** **25 (§3, §5-A, §5-B, §6)**, 57, 74, 76, 77 à venir

## Extrait intégral — valeurs captées

| Code FCÉN | Description française exacte | Vitamine C (mg/100 g) | Observations |
| --- | --- | --- | --- |
| 1705 | Bleuet, cru | **9,7** | 4 |
| 1538 | Canneberge, crue | **13,3** | 4 |
| 2201 | Choucroute, conserve, solides et liquide | **14,7** | 184 |
| 2213 | Épinard, cru | **28,1** | 7 |
| 2214 | Épinard, bouilli, égoutté | **9,8** | 12 |
| 2167 | Pomme de terre, bouillie avec la pelure, pelure seulement | **5,2** | 2 |
| 2168 | Pomme de terre, rissolée, faite maison | **13,0** | **0** |

## Réserves de captation, à lire avant d'utiliser un de ces chiffres

1. **Le code 2168 a `number_observation` = 0.** La valeur de 13,0 mg/100 g est une valeur
   imputée par la base, pas une moyenne d'analyses. Elle est utilisée dans le chapitre 25
   **avec cette mention**. Une pomme de terre crue ou bouillie sans pelure serait un meilleur
   repère : les codes n'ont pas pu être isolés, la liste renvoyée par l'API étant tronquée à la
   lecture. Les codes de pommes de terre se situent autour de **2167 à 2187**. **À reprendre.**
2. **Le FCÉN ne nomme pas l'espèce.** « Bleuet, cru » et « Canneberge, crue » ne précisent ni
   *Vaccinium angustifolium* (le bleuet sauvage de la Côte-Nord) ni *Vaccinium macrocarpon*
   (la canneberge cultivée). Les fruits sauvages boréaux ne sont donc **pas** couverts par ces
   entrées : ce sont des repères d'ordre de grandeur, pas des mesures locales.
3. **Aucune entrée de gibier n'a été trouvée** (orignal, lièvre, castor, phoque) ni aucun foie
   de gibier. La teneur en vitamine C de la viande et des abats de gibier sauvage reste donc
   non sourcée.
4. Aucune entrée pour les aiguilles de conifères, les cynorrhodons, la chicouté, l'airelle
   vigne-d'Ida ou la camarine noire.

## Ce que ces chiffres servent à démontrer dans le chapitre 25

- **La perte à la cuisson à l'eau est mesurable et grande :** épinard cru 28,1 → épinard
  bouilli et égoutté 9,8, soit **65 % de perte** (calcul du rédacteur : (28,1 − 9,8) / 28,1).
- **Les meilleures sources d'hiver accessibles au chalet sont modestes**, donc c'est le volume
  quotidien qui compte, pas la richesse de l'aliment.
