# USDA FoodData Central — ours et orignal crus, relevé de première main

- **Organisme :** United States Department of Agriculture, Agricultural Research Service,
  FoodData Central, jeu SR Legacy
- **URL :** https://fdc.nal.usda.gov/food-details/173845/nutrients (ours) et
  https://fdc.nal.usda.gov/food-details/174344/nutrients (orignal) ; données servies par
  https://fdc.nal.usda.gov/portal-data/external/173845 et …/174344 (l'API à clé `DEMO_KEY`
  répondait encore HTTP 429)
- **Consultée le :** 24 septembre 2026
- **Pages enregistrées :** `sources/48-usda-fdc-173845-ours-cru.json` et
  `sources/48-usda-fdc-174344-orignal-cru.json` (réponses complètes du portail)
- **Sert à :** ch. 48, §3 — lipides du muscle d'ours et d'orignal. Remplace la recopie de deuxième
  main de `48-usda-fdc-composition-ours.md`.

## Extraits intégraux (par 100 g, champ `value`, champ `dataPoints` = nombre d'analyses)

| fdcId | Description | Eau g | Protéines g | Lipides g | kcal |
| --- | --- | --- | --- | --- | --- |
| 173845 | « Game meat, bear, raw » | 71,2 (n = 1) | 20,1 (n = 1) | **8,3 (n = 1)** | 161 (calculé) |
| 174344 | « Game meat, moose, raw » | 75,6 (n = 36) | 22,2 (n = 35) | **0,74 (n = 37)** | 102 (calculé) |

Les deux fiches portent `"lastUpdated": "4/1/2019"` ; les valeurs nutritives, `"4/1/1989"`.

## Ce que le relevé change

- Les valeurs recopiées au ch. 24 sont **exactes**.
- **La valeur de l'ours repose sur une seule analyse** (`dataPoints: 1`) ; celle de l'orignal sur
  37.
- Le Fichier canadien sur les éléments nutritifs (`24-sante-canada-fcen-gibier-poissons-gras.md`,
  consulté le 24 septembre 2026) donne **ours cru 4,0 g** et **orignal cru 3,0 g** de lipides
  (entrées « autochtone », 0 observation, valeurs reprises d'autres jeux). Le rapport ours/orignal
  y est d'environ 1,3, pas 11.
