# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN) : les cultures de subsistance

- **Organisme :** Santé Canada, Fichier canadien sur les éléments nutritifs — officielle
- **Interface interrogée :** API publique du FCÉN (même méthode que `26-sante-canada-fcen-orignal-farine-pomme-de-terre-aretes.md`)
  - liste : https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&type=json
  - teneurs : https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?id=<code>&lang=fr&type=json
- **Date de consultation :** 27 septembre 2026
- **Données brutes enregistrées :** `98-sante-canada-fcen-cultures-donnees.json` (énergie 208,
  protéines 203, lipides 204, glucides 205, fibres 291, vitamine C 401, humidité 255, avec le code
  de provenance de chaque valeur)
- **Sert au chapitre :** 98, §3, §5-A.

## Extraits intégraux — valeurs par 100 g de partie comestible

| Code | Description FCÉN (texte intégral) | kcal | Protéines (g) | Glucides (g) | Eau (g) |
| --- | --- | --- | --- | --- | --- |
| 2505 | « Pomme de terre, chair et pelure, crue » | 77 | 2,02 | 17,47 | 79,34 |
| 2361 | « Chou, cru » | 25 | 1,28 | 5,8 | 92,18 |
| 2444 | « Rutabaga (chou-navet), cru » | 37 | 1,08 | 8,62 | 89,43 |
| 2470 | « Navet, cru » | 28 | 0,9 | 6,43 | 91,87 |
| 2380 | « Carotte, crue » | 41 | 0,93 | 9,58 | 88,29 |
| 2500 | « Betteraves, crues » | 43 | 1,61 | 9,56 | 87,58 |
| 2406 | « Panais, cru » | 75 | 1,2 | 17,99 | 79,53 |
| 2401 | « Oignon, cru » | 40 | 1,1 | 9,34 | 89,11 |
| 2394 | « Ail, cru » | 149 | 6,36 | 33,06 | 58,58 |
| 2305 | « Courge d'hiver, toutes variétés, crues » | 34 | 0,95 | 8,59 | 89,76 |
| 2455 | « Courge d'hiver, hubbard, crue » | 40 | 2,0 | 8,7 | 88,0 |
| 2441 | « Citrouille, crue » | 26 | 1,0 | 6,5 | 91,6 |
| 3394 | « Pois, cassés, crus » | 352 | 23,82 | 63,74 | 8,62 |
| 3387 | « Gourganes (fèves des marais, fava), déshydratées, crues » | 341 | 26,12 | 58,29 | 10,98 |
| 3383 | « Haricots, petits blancs, crus » | 337 | 22,33 | 60,75 | 12,1 |
| 3274 | « Haricots, jaunes (fève), crus » | 345 | 22,0 | 60,7 | 11,1 |
| 4485 | « Grains céréaliers, orge, sec » | 354 | 12,48 | 73,48 | 9,44 |
| 4498 | « Grains céréaliers, seigle » | 335 | 14,76 | 69,76 | 10,95 |
| 4421 | « Grains céréaliers, avoine » | 389 | 16,89 | 66,27 | 8,22 |
| 4436 | « Grains céréaliers, blé de force roux de printemps (blé vitreux roux de printemps) » | 329 | 15,4 | 68,03 | 12,76 |

## Lecture et calculs du livre

- **Le pois sec entier** n'a pas d'entrée crue au FCÉN ; le pois cassé cru (3394) sert de valeur,
  la cassure ne change pas l'énergie du grain.
- Provenance déclarée par le FCÉN pour l'orge (4485), l'avoine (4421), le pois cassé (3394) et la
  gourgane (3387) : code 0, « Provient intégralement de l'USDA » ; pour la pomme de terre (2505) :
  code 4, « Nutriment calculé d'après les données de l'USDA ». La description FCÉN ne dit pas si
  l'orge et l'avoine sont comptées avec ou sans leur balle ; le livre les traite comme du **grain
  sans balle** (orge mondée, gruau d'avoine), ce que suggèrent les fibres (17,3 g et 10,6 g) — lecture
  non confirmée, voir `98-NON-OBTENUES.md`. Pour un grain vêtu battu à la main, l'énergie par kilo
  récolté est donc à réduire : environ 10 % de balle pour l'orge vêtue, 25 à 30 % pour l'avoine
  vêtue (`98-maaaro-guide-agronomique-cereales-ch4.md`).
- **Calculs :** 9 500 kcal ÷ 770 kcal/kg = **12,3 kg** de pommes de terre par jour pour la famille
  s'il n'y avait qu'elles ; 1 kg de grain ≈ 3 350 à 3 550 kcal ; énergie par m² = rendement (kg/m²)
  × kcal/kg (tableau du §5-A du chapitre).
