# USDA FoodData Central — teneur en eau des champignons frais et séchés

- **Organisme :** U.S. Department of Agriculture, Agricultural Research Service — FoodData
  Central, jeu de données *SR Legacy* (ancienne *National Nutrient Database for Standard
  Reference*)
- **Adresse interrogée :**
  `https://api.nal.usda.gov/fdc/v1/foods/search?query=mushrooms%20raw&dataType=SR%20Legacy`
- **Fiches lisibles :** `https://fdc.nal.usda.gov/food-details/<fdcId>/nutrients`
- **Date de consultation :** 23 septembre 2026
- **Chapitre qui s'en sert :** 59 — Champignons (§ 3, § 9, « Sans balance »)

---

## Valeurs retournées (eau, g pour 100 g de partie comestible)

| fdcId | Description exacte | Eau (g/100 g) |
| --- | --- | --- |
| 168422 | Mushrooms, Chanterelle, raw | 89.8 |
| 168423 | Mushrooms, morel, raw | 89.6 |
| 169242 | Mushrooms, shiitake, raw | 89.7 |
| 168580 | Mushrooms, oyster, raw | 89.2 |
| 169403 | Mushrooms, maitake, raw | 90.4 |
| 169251 | Mushrooms, white, raw | 92.4 |
| 169255 | Mushrooms, portabella, raw | 92.8 |
| **168436** | **Mushrooms, shiitake, dried** | **9.5** |

## Calcul fait pour le chapitre (rapport frais / sec)

Le seul champignon qui a une valeur crue **et** une valeur séchée est le shiitake.

- 100 g de shiitake frais = 100 − 89,7 = **10,3 g de matière sèche**.
- Le shiitake séché contient encore 9,5 % d'eau, donc 90,5 % de matière sèche.
- 10,3 g ÷ 0,905 = **11,4 g de champignon séché** pour 100 g de frais.

Avec la chanterelle (89,8 % d'eau), le même calcul donne 11,3 g. **Arrondi retenu : 1 kg de
champignons frais donne environ 110 g de secs, soit à peu près le neuvième du poids frais.**
Ce chiffre est un calcul fait à partir de ces valeurs, pas une valeur publiée telle quelle ; il
vaut pour un champignon séché jusqu'à être cassant, et il variera d'une espèce à l'autre.
