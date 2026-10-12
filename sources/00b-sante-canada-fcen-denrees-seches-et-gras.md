# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN) : denrées sèches et gras de la réserve

- **Organisme :** Santé Canada, Fichier canadien sur les éléments nutritifs (FCÉN)
- **Interface interrogée :** API publique du FCÉN
  - liste des aliments : https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&type=json
  - valeurs par aliment : https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?id=CODE&lang=fr&type=json
  - mesures : https://food-nutrition.canada.ca/api/canadian-nutrient-file/servingsize/?id=CODE&lang=fr&type=json
- **Consultée le :** 24 septembre 2026 (captation par `curl`, réponses JSON)
- **Chapitre qui s'en sert :** 00b — Acheter par priorité, palier 1, section 1.D, lignes
  « Gras acheté » et « Réserve sèche »
- **Pourquoi l'API :** la fiche `sources/08-sante-canada-valeur-nutritive-aliments-usuels.md` n'a
  que la farine ; le riz y est donné cuit, et le sucre, l'huile et le saindoux n'y sont pas.

## Valeurs pour 100 g, telles que rendues par l'API (champs « Énergie (kcal) », « Protéines », « Lipides totaux »)

| Code | Aliment (libellé du FCÉN) | kcal | Protéines (g) | Lipides (g) |
| --- | --- | --- | --- | --- |
| 4472 | Grains céréaliers, riz blanc, grain long, étuvé, sec | 374 | 7,51 | 1,03 |
| 4501 | Grains céréaliers, farine de blé, blanche, tout usage, blanchie | 364 | 12,08 | 2,49 |
| 1462 | Céréale, chaude, avoine (gruau), gros flocons, sèche, Rogers | 389 | 14,2 | 7,0 |
| 3392 | Lentilles, crues | 352 | 24,63 | 1,06 |
| 3383 | Haricots, petits blancs, crus | 337 | 22,33 | 1,5 |
| 3394 | Pois, cassés, crus | 352 | 23,82 | 1,16 |
| 4506 | Pâtes, macaroni (coudes), enrichi, sec | 371 | 13,04 | 1,51 |
| 4318 | Confiseries, sucre, granulé | 387 | 0 | 0 |
| 134 | Lait, en poudre, écrémé | 363 | 36,16 | 0,77 |
| 66 | Lait, poudre, entier | 496 | 26,32 | 26,71 |
| 464 | Gras animal, saindoux (porc) | 902 | 0 | 100 |
| 446 | Shortening, domestique, huile de soya (hydrogénée) et palme | 885 | 0 | 100 |
| 451 | Huile végétale, canola (colza) | 885 | 0 | 100 |

Mesures (servingsize) : canola, **100 mL = 92,1 g** (facteur 0,92139) ; saindoux, 100 mL =
86,6 g (facteur 0,86644).

## Calcul, par personne-mois, avec les quantités de la ligne « Réserve sèche » du ch. 00b

Riz 4 kg, farine 4 kg, avoine 2 kg, légumineuses 3 kg (lentilles), pâtes 2 kg, sucre 1 kg, lait
écrémé en poudre 1 kg :

- **Énergie :** 62 780 kcal par personne-mois, soit **≈ 2 090 kcal par jour** par personne.
- **Protéines :** ≈ 2 430 g par personne-mois, soit ≈ 81 g par jour.
- **Lipides propres aux denrées :** ≈ 350 g par personne-mois.

Ligne « Gras acheté », 1 kg de saindoux + 1 L d'huile de canola (921 g) :

- ≈ 17 160 kcal par personne-mois, soit **≈ 570 kcal par jour** ; pour quatre, **≈ 256 g de
  gras par jour**.

Les deux lignes ensemble :

- **≈ 2 665 kcal par jour par personne**, soit **≈ 10 660 kcal par jour pour quatre** quand
  on compte chaque enfant comme une personne-mois entière.
- Part des lipides dans les calories : **≈ 25 %** ; part des protéines : ≈ 12 %.

## À quoi le comparer (valeurs déjà au livre)

- Besoin de la famille : 8 675 kcal/jour (ch. 24, exemple de travail), 9 000 (ch. 8),
  9 500 en hiver de travail (ch. 26).
- Étendue des lipides : 20 à 35 % des calories chez l'adulte, 25 à 35 % chez l'enfant (ch. 8
  et 24, ANREF de Santé Canada).
- Gras quand on vit de gibier maigre : ≈ 370 g par jour pour quatre (ch. 24, étape 8).
