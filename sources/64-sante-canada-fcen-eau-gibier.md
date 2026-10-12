# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN) : teneur en eau du gibier cru

- **Organisme :** Santé Canada, Fichier canadien sur les éléments nutritifs (FCÉN)
- **Interface interrogée :** API publique du FCÉN
  - liste des aliments : https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=en&type=json
  - valeurs nutritives : https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?id=<code>&type=json&lang=fr
- **Consultée le :** 24 septembre 2026
- **Captation :** les réponses de l'API sont enregistrées en entier à côté de cette fiche :
  `64-sante-canada-fcen-3587.json` (orignal), `…-3579.json` (cerf), `…-3577.json` (caribou),
  `…-3595.json` (lapin sauvage). Valeurs relues dans les fichiers.
- **Sert au chapitre :** 64 — Saumure, §5 étape 4 (le facteur 1,33 et la fraction d'eau de 75 %)

---

## Valeurs, pour 100 g de partie comestible crue

| Code FCÉN | Description (telle quelle) | Eau (g) | Lipides totaux (g) | Protéines (g) |
| --- | --- | --- | --- | --- |
| 3587 | « Game meat, native, moose, raw » | **73,0** | 3,0 | 22,0 |
| 3579 | « Game meat, deer (venison), raw » | **73,57** | 2,42 | 22,96 |
| 3577 | « Game meat, native, caribou (reindeer), meat, raw » | **72,5** | 2,6 | 22,5 |
| 3595 | « Game meat, native, rabbit, wild, raw » | **75,5** | 1,05 | 21,5 |

Extrait brut (fichier 3587, ligne de l'eau) : `'nutrient_web_name': 'Eau'`, `'nutrient_value': 73.0`.

## Point de comparaison

FAO, « Guidelines for slaughtering, meat cutting and further processing » (1991), tableau 4 :
viande de première qualité (« Meat I ») **71 %** d'eau, 10 % de gras
(`40-fao-1991-abattage-decoupe-transformation.md`).

## Ce que le chapitre en tire

- Orignal cru : **73 %** d'eau → facteur **1 ÷ 0,73 = 1,37** (division sur la valeur de la source).
- Lièvre (le « lapin sauvage » est l'entrée la plus proche) : **75,5 %** → facteur 1,32.
- Le 75 % du chapitre est la valeur du lièvre, pas celle de l'orignal. L'écart sur le sel pesé
  est d'environ 2 %.
