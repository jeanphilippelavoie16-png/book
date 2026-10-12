# Santé Canada — Fichier canadien sur les éléments nutritifs (FCÉN) : aucune entrée pour le porc-épic

- **Organisme :** Santé Canada, Fichier canadien sur les éléments nutritifs (FCÉN / Canadian
  Nutrient File)
- **Ressource :** liste complète des aliments de l'interface de programmation du FCÉN
- **URL :** https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=en&type=json
- **Copie enregistrée :** `sources/47-sante-canada-fcen-liste-aliments-2026-09-24.json` (la liste
  entière, 471 Ko, telle que reçue)
- **Date de consultation :** 24 septembre 2026
- **Captation :** `curl`, HTTP 200
- **Sert au chapitre :** 47 — Porc-épic (§3, « Il est gras quand tout le reste est maigre »)

---

## Ce qui a été cherché

Les mots « porcupine », « porc », « erethizon » dans la description de chaque aliment de la
liste. **Aucune occurrence de « porcupine ».**

## Entrées de gibier présentes (relevé intégral des descriptions « Game meat »)

> « Game meat, native, bear, raw » ; « Game meat, native, beaver, raw » ; « Game meat, native,
> beaver, roasted » ; « Game meat, native, beaver, meat, dried » ; « Game meat, native, beaver,
> feet, roasted » ; « Game meat, native, beaver, tail, roasted » ; « Game meat, native, beaver,
> liver, raw » ; « Game meat, native, caribou (reindeer), meat, raw » ; « Game meat, native,
> moose, raw » ; « Game meat, native, moose, fat, raw » ; « Game meat, native, muskrat, raw » ;
> « Game meat, muskrat, roasted » ; « Game meat, native, rabbit, wild, raw » ; « Game meat,
> opossum, roasted » ; « Game meat, raccoon, roasted » ; « Game meat, squirrel, raw » ;
> « Game meat, seal, harp, raw » ; « Game meat, native, walrus, meat, raw » ; « Game meat,
> whale, raw » (plus bison, wapiti, cerf, antilope, sanglier, chèvre, cheval, lapin domestique,
> grenouille, et les abats de caribou et d'orignal).

## Autres pistes, sans résultat le même jour

| Adresse | Réponse |
| --- | --- |
| `api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=porcupine` (USDA FoodData Central) | **HTTP 429**, clé publique encore en limite de débit (même échec qu'au premier passage, `47-NON-OBTENUES-pages-cherchees-sans-succes.md`) |
| `traditionalanimalfoods.org` (base des aliments traditionnels des peuples autochtones du Nord, CINE, Université McGill) | **connexion refusée** |

## Ce que ça veut dire pour le chapitre

La table canadienne de référence a le castor, le rat musqué, l'écureuil, le lièvre, l'ours et
l'orignal, **pas le porc-épic**. Aucune valeur de lipides, de protéines ou d'énergie n'est
disponible. Le chapitre ne peut pas chiffrer le gras du porc-épic ; il peut dire ce qui se voit.
