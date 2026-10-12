# USDA FoodData Central — Composition du gibier, de la moelle et des corps gras

- **Organisme :** United States Department of Agriculture, Agricultural Research Service,
  FoodData Central, jeu de données **SR Legacy** (dont la série *Alaska Native Foods*)
- **URL du portail :** https://fdc.nal.usda.gov/
- **Interface interrogée :** API publique, `https://api.nal.usda.gov/fdc/v1/foods/search`
  (clé DEMO_KEY), jeu `SR Legacy`
- **Date de consultation :** 2026-09-20
- **Chapitre qui l'utilise :** 24 — Le mal de caribou (sections 3, 5, 6, 9)

## Pourquoi une source américaine ici

Le **Fichier canadien sur les éléments nutritifs** (FCÉN, Santé Canada,
https://food-nutrition.canada.ca/cnf-fce/index-eng.jsp) est la source canadienne équivalente
et devrait primer selon la règle 2 de CLAUDE.md. Son moteur de recherche **n'a pas pu être
interrogé** le 2026-09-20 : les adresses de recherche testées ont toutes répondu 404, et la
page d'accueil précise que la publication de 2015 n'est plus mise à jour. Les valeurs
ci-dessous viennent donc de l'USDA — **agence fédérale américaine**, acceptable mais de
second rang.

> **Tâche de vérification :** reprendre chacune de ces lignes dans le FCÉN sur un poste où
> l'interface de recherche répond, et substituer les valeurs canadiennes. Toutes les valeurs
> de ce fichier sont marquées `[À VÉRIFIER]` dans le chapitre 24.

---

## Extraits intégraux — valeurs par 100 g de partie comestible

### Viandes maigres (le problème)

| Aliment (description USDA) | fdcId | Protéines (g) | Lipides (g) | Énergie (kcal) |
| --- | --- | --- | --- | --- |
| « Game meat, moose, raw » | 174344 | 22,2 | **0,74** | 102 |
| « Moose, meat, raw (Alaska Native) » | 167607 | 22,3 | 1,5 | 103 |
| « Game meat, moose, cooked, roasted » | 174345 | 29,3 | 0,97 | 134 |
| « Game meat, caribou, raw » | 173853 | 22,6 | 3,36 | 127 |
| « Game meat, caribou, cooked, roasted » | 173854 | 29,8 | 4,42 | 167 |
| « Game meat, rabbit, wild, raw » | 174347 | 21,8 | 2,32 | 114 |
| « Game meat, deer, raw » | 173855 | 23,0 | 2,42 | 120 |
| « Game meat, elk, raw » | 175301 | 23,0 | 1,45 | 111 |
| « Fish, smelt, rainbow, raw » | 175146 | 17,6 | 2,42 | 97 |

### Sources de gras (la solution)

| Aliment (description USDA) | fdcId | Protéines (g) | Lipides (g) | Énergie (kcal) |
| --- | --- | --- | --- | --- |
| « Caribou, bone marrow, raw (Alaska Native) » | 169800 | 6,7 | **84,4** | **786** |
| « Game meat, beaver, raw » | 175294 | 24,0 | 4,8 | 146 |
| « Game meat, beaver, cooked, roasted » | 175295 | 34,8 | 6,96 | 212 |
| « Game meat, bear, raw » | 173845 | 20,1 | 8,3 | 161 |
| « Game meat, bear, cooked, simmered » | 173846 | 32,4 | 13,4 | 259 |
| « Oil, bearded seal (Oogruk) (Alaska Native) » | 167611 | 0,56 | 99,6 | 899 |
| « Oil, spotted seal (Alaska Native) » | 167641 | 0,0 | 99,3 | 894 |
| « Whale, bowhead, subcutaneous fat (blubber) (Alaska Native) » | 167623 | 0,4 | 96,5 | 870 |
| « Fat, beef tallow » | 171400 | 0,0 | 100 | 902 |
| « Lard » | 171401 | 0,0 | 100 | 902 |
| « Beef, variety meats and by-products, suet, raw » | 170193 | 1,5 | 94,0 | 854 |

### Poissons moins maigres

| Aliment (description USDA) | fdcId | Protéines (g) | Lipides (g) | Énergie (kcal) |
| --- | --- | --- | --- | --- |
| « Fish, trout, mixed species, raw » | 175153 | 20,8 | 6,61 | 148 |
| « Fish, trout, rainbow, farmed, raw » | 173717 | 19,9 | 6,18 | 141 |
| « Fish, whitefish, mixed species, raw » | 173711 | 19,1 | 5,86 | 134 |

---

## Le chiffre qui explique le nom du chapitre

**Caribou, moelle osseuse crue : 84,4 g de lipides et 786 kcal par 100 g.**
La même bête qui donne son nom à la maladie porte le remède dans ses os. Par rapport au
muscle d'orignal cru (0,74 g de lipides et 102 kcal par 100 g), la moelle est **environ
114 fois plus grasse** (84,4 ÷ 0,74 = 114) et **près de 8 fois plus dense en énergie**
(786 ÷ 102 = 7,7). Ces deux rapports sont des divisions faites par le livre à partir des
valeurs USDA du tableau ci-dessus, pas des valeurs publiées.

## Notes de lecture, à ne pas escamoter

1. Ces valeurs sont des **moyennes d'échantillons américains**. Le gras d'un orignal de la
   Côte-Nord varie énormément selon la saison, le sexe, l'âge et la coupe. Une bête d'octobre
   et la même bête en mars ne donnent pas les mêmes chiffres. L'écart saisonnier n'est **pas**
   documenté ici.
2. « Game meat, moose, raw » est un **composite de coupes**. Une poitrine et un filet n'ont
   pas la même teneur en gras.
3. Aucune entrée d'**orignal de la Côte-Nord**, de **lièvre d'Amérique** (*Lepus americanus*)
   ni de **phoque du Saint-Laurent** n'existe dans ce jeu de données. Le « rabbit, wild » de
   l'USDA est une approximation pour le lièvre ; le phoque est approché par les huiles de
   phoque barbu et de phoque tacheté de l'Alaska.
4. Les valeurs « cooked » sont plus concentrées parce que l'eau est partie, **pas** parce que
   l'aliment est devenu plus nourrissant.
5. Aucune donnée de **truite mouchetée** (*Salvelinus fontinalis*) ni d'**omble chevalier**
   n'a été relevée : « trout, mixed species » est un substitut grossier.
