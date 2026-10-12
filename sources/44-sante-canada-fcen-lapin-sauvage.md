# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN) : lapin sauvage, cru et cuit

- **Organisme :** Santé Canada, Fichier canadien sur les éléments nutritifs (FCÉN), interface de
  programmation publique
- **Aliments :** code 3595 « Gibier, viande, autochtone, lapin, sauvage, cru » ; code 3596
  « Gibier, viande, autochtone, lapin, cuit »
- **URL :**
  - teneurs : https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?lang=fr&id=3595&type=json
    et `…&id=3596…`
  - descriptions : https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&id=3595&type=json
    et `…&id=3596…`
  - codes de provenance : https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientsource/?lang=fr&type=json
- **Consultée le :** teneurs téléchargées par le premier passage le 23 septembre 2026 ; descriptions
  et codes de provenance téléchargés le 24 septembre 2026 (HTTP 200). **Le FCÉN répond de nouveau** :
  la panne notée au chapitre 24 et dans `44-reprises-sources-deja-enregistrees.md` (erreur 500 le
  20 septembre) est terminée.
- **Captation :** `44-sante-canada-fcen-lapin-sauvage-cru.json`, `44-sante-canada-fcen-lapin-sauvage-cuit.json`,
  `44-sante-canada-fcen-lapin-descriptions.json`, `44-sante-canada-fcen-sources-des-nutriments.json`
- **Sert au chapitre :** 44 — Lièvre d'Amérique (§8 DANGER, point 4, mal de caribou) ; utile au
  chapitre 24

---

## Valeurs intégrales, pour 100 g (telles que servies par l'API)

| Code | Aliment | Protéines | Lipides totaux | Glucides | Eau | Énergie |
| --- | --- | --- | --- | --- | --- | --- |
| 3595 | « Gibier, viande, autochtone, lapin, sauvage, cru » | 21,5 g | 1,05 g | 0,0 g | 75,5 g | 64 kcal (268 kJ) |
| 3596 | « Gibier, viande, autochtone, lapin, cuit » | 29,0 g | 2,1 g | 0,0 g | 67,5 g | 140 kcal (585 kJ) |

Provenance de ces valeurs dans le FCÉN : code 10, « Nutriment provenant de la littérature
scientifique ».

---

## Calcul fait ici (ce n'est pas une valeur publiée)

Part des calories venant des protéines, à 4 kcal par gramme de protéines :

- **Cuit (3596)** : 29,0 × 4 = 116 kcal de protéines sur 140 kcal → **83 %**. Contrôle : 116 +
  2,1 × 9 (19 kcal de gras) = 135 kcal, proche des 140 publiées : les valeurs se tiennent.
- **Cru (3595)** : l'énergie publiée (64 kcal) est **plus basse que ce que les protéines seules
  donnent** (21,5 × 4 = 86 kcal). La ligne est incohérente dans le fichier ; elle n'est pas
  utilisée pour le pourcentage. Par la somme des macronutriments (86 + 9 = 95 kcal), la part
  protéique serait de 90 %.

## Ce que le chapitre 44 en tire

- Le lièvre est **encore plus maigre** que ne le disait la valeur américaine reprise du chapitre 24
  (76 %) : **plus de 80 % de ses calories viennent des protéines** dans le fichier canadien.
- La règle du chapitre ne change pas : chaque repas de lièvre porte du gras et un féculent.

## Réserve

- L'aliment est un « lapin sauvage » de la section des aliments autochtones ; le fichier ne nomme
  pas l'espèce (*Lepus americanus* ou autre).
