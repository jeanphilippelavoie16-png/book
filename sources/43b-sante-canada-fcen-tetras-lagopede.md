# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN) : tétras du Canada et lagopède, crus et cuits

- **Organisme :** Santé Canada, Fichier canadien sur les éléments nutritifs (FCÉN), interface de
  programmation publique
- **Aliments :**
  - code 5932 « Lagopède, autochtone, viande, crue »
  - code 5933 « Lagopède, autochtone, viande, cuite »
  - code 5934 « Tétras du Canada, autochtone, viande, crue »
  - code 5935 « Tétras du Canada, autochtone, viande, cuite »
- **URL :**
  - teneurs : https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?lang=fr&id=5934&type=json
    (et `id=5932`, `5933`, `5935`)
  - descriptions : https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&id=5934&type=json
    (et les trois autres codes)
  - liste complète des aliments (pour trouver les codes) : https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&type=json
- **Consultée le :** 24 septembre 2026 (HTTP 200)
- **Captation :** réponses intégrales de l'API enregistrées à côté de cette fiche :
  `43b-sante-canada-fcen-5932-teneurs.json`, `…-5932-description.json`, et de même pour 5933,
  5934, 5935.
- **Ce que le FCÉN n'a pas :** aucune entrée « gélinotte » (ni « perdrix », ni « grouse »). La
  liste complète des aliments, interrogée sur « lagop », « tétras », « gélinotte », « perdrix »,
  ne donne que les quatre codes ci-dessus, plus le canard sauvage (667, 668, 5931).
- **Sert au chapitre :** 43b — Chasser le petit gibier (§8, bloc 4 : « la gélinotte et le tétras
  sont maigres eux aussi ») ; utile aux chapitres 24 et 45.

---

## Valeurs intégrales, pour 100 g (telles que servies par l'API)

| Code | Aliment | Protéines | Lipides totaux | Glucides | Eau | Énergie |
| --- | --- | --- | --- | --- | --- | --- |
| 5932 | « Lagopède, autochtone, viande, crue » | 24,0 g | 3,0 g | 0,0 g | 71,5 g | 128 kcal (535 kJ) |
| 5933 | « Lagopède, autochtone, viande, cuite » | 30,0 g | 2,85 g | 0,0 g | 65,5 g | 154 kcal (644 kJ) |
| 5934 | « Tétras du Canada, autochtone, viande, crue » | 24,0 g | 1,0 g | 0,0 g | 73,0 g | 109 kcal (456 kJ) |
| 5935 | « Tétras du Canada, autochtone, viande, cuite » | 27,0 g | 2,0 g | 0,0 g | 69,0 g | 132 kcal (552 kJ) |

Provenance de ces valeurs dans le FCÉN : code 10, « Nutriment provenant de la littérature
scientifique » (même code que le lapin sauvage, `44-sante-canada-fcen-lapin-sauvage.md`).

---

## Calcul fait ici (ce n'est pas une valeur publiée)

Part des calories venant des protéines, à 4 kcal par gramme de protéines :

- **Tétras, cru (5934)** : 24,0 × 4 = 96 kcal sur 109 → **88 %**. Contrôle : 96 + 1,0 × 9 = 105 kcal,
  proche des 109 publiés.
- **Tétras, cuit (5935)** : 27,0 × 4 = 108 kcal sur 132 → **82 %**. Contrôle : 108 + 18 = 126 kcal.
- **Lagopède, cru (5932)** : 24,0 × 4 = 96 kcal sur 128 → **75 %**. Contrôle : 96 + 27 = 123 kcal.
- **Lagopède, cuit (5933)** : 30,0 × 4 = 120 kcal sur 154 → **78 %**. Contrôle : 120 + 25,7 = 146 kcal.

Pour comparaison, même méthode, même base : lapin sauvage cuit, **83 %**
(`44-sante-canada-fcen-lapin-sauvage.md`). Le tétras est aussi maigre que le lièvre ; le lagopède
l'est à peine moins. Les deux sont au double du plafond de 35 % retenu par le livre (ch. 24).
