# USDA FoodData Central — Composition de la viande d'ours

- **Organisme :** United States Department of Agriculture, Agricultural Research Service,
  FoodData Central, jeu **SR Legacy**
- **URL du portail :** https://fdc.nal.usda.gov/
- **API interrogée :** `https://api.nal.usda.gov/fdc/v1/foods/search`
- **Chapitre qui l'utilise :** 48 — Ours noir (sections 1, 3, 5, 10)

---

## ⚠ PROVENANCE — à lire avant d'utiliser un seul de ces chiffres

**L'API n'a pas répondu le 2026-09-20 pour la rédaction du chapitre 48 : HTTP 429 Too Many
Requests, `Retry-After: 11773` s** (quota `DEMO_KEY` épuisé pour la journée).

Les valeurs ci-dessous **ne viennent donc pas d'une consultation de première main faite pour
ce chapitre**. Elles sont recopiées du fichier de dossier
`sources/24-usda-fdc-composition-gibier-et-gras.md`, qui les a captées le **2026-09-20** par
appel API réussi, pour le chapitre 24. C'est une source de deuxième main **à l'intérieur du
projet**, ce qui est acceptable — le fichier existe, il est daté, il porte les `fdcId` — mais
ce n'est pas une revalidation.

**Toutes les valeurs de ce fichier sont marquées `[À VÉRIFIER]` dans le chapitre 48.**

De plus, et c'est le point que la vérification technique doit trancher : ce sont des valeurs
**américaines**. Le Fichier canadien sur les éléments nutritifs (FCÉN, Santé Canada,
https://food-nutrition.canada.ca/cnf-fce/index-eng.jsp) devrait primer selon la règle 2 de
`CLAUDE.md` ; son moteur de recherche n'a pas répondu lors de la captation du chapitre 24.

---

## Valeurs recopiées, par 100 g de partie comestible

| Description USDA | fdcId | Protéines (g) | Lipides (g) | Énergie (kcal) |
| --- | --- | --- | --- | --- |
| « Game meat, bear, raw » | 173845 | 20,1 | **8,3** | 161 |
| « Game meat, bear, cooked, simmered » | 173846 | 32,4 | **13,4** | 259 |

### Les maigres, pour la comparaison qui fait tout le chapitre

| Description USDA | fdcId | Protéines (g) | Lipides (g) | Énergie (kcal) |
| --- | --- | --- | --- | --- |
| « Game meat, moose, raw » | 174344 | 22,2 | **0,74** | 102 |
| « Game meat, rabbit, wild, raw » | 174347 | 21,8 | 2,32 | 114 |
| « Game meat, deer, raw » | 173855 | 23,0 | 2,42 | 120 |
| « Game meat, beaver, raw » | 175294 | 24,0 | 4,8 | 146 |

### Corps gras purs, pour situer le gras fondu

| Description USDA | fdcId | Protéines (g) | Lipides (g) | Énergie (kcal) |
| --- | --- | --- | --- | --- |
| « Lard » | 171401 | 0,0 | 100 | 902 |
| « Fat, beef tallow » | 171400 | 0,0 | 100 | 902 |
| « Caribou, bone marrow, raw (Alaska Native) » | 169800 | 6,7 | 84,4 | 786 |

---

## Le rapport qui justifie le chapitre

**8,3 g de lipides pour 100 g de viande d'ours crue contre 0,74 g pour l'orignal** : un
rapport de l'ordre de **11 pour 1**. C'est le chiffre qui fait de l'ours noir la réponse au
chapitre 24, et qui explique pourquoi une bête à peine mangeable sans thermomètre reste une
bête qu'on va chercher.

## ⚠ CE QUE CE FICHIER NE CONTIENT PAS

**Il n'y a AUCUNE entrée pour le gras sous-cutané d'ours, ni pour le gras d'ours fondu, dans
ce qui a été capté.** Les 8,3 g par 100 g sont ceux du **muscle**, pas de la couche de gras
qu'on détache sous la peau — laquelle est évidemment beaucoup plus riche, mais **le livre
n'a aucun chiffre pour elle**. Le chapitre 48 ne doit à aucun moment présenter les 8,3 g
comme la valeur du gras d'ours. Aucune valeur n'est donnée pour :

- la teneur en lipides du gras sous-cutané d'ours ;
- le rendement en gras fondu par kilogramme de gras cru ;
- le point de fusion du gras d'ours ;
- la durée de conservation du gras fondu.

Ces quatre trous sont repris à la section 10 du chapitre et à la fiche de suivi.
