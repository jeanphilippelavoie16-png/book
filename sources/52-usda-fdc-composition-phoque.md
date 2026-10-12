# USDA FoodData Central — Composition du phoque (viande et foie)

- **Organisme :** United States Department of Agriculture, Agricultural Research Service,
  FoodData Central, jeu de données **SR Legacy**, série *American Indian / Alaska Native Foods*
- **Portail :** https://fdc.nal.usda.gov/
- **Interface interrogée :** API publique `https://api.nal.usda.gov/fdc/v1/foods/search` et
  `https://api.nal.usda.gov/fdc/v1/food/{fdcId}`, clé `DEMO_KEY`
- **Date de consultation :** 2026-09-20
- **Chapitre qui l'utilise :** 52 — Phoque du Saint-Laurent (sections 3, 5, 8)

---

## Pourquoi une source américaine, et pourquoi elle est faible ici

Le **Fichier canadien sur les éléments nutritifs** (FCÉN, Santé Canada) est la source
canadienne équivalente et devrait primer selon la règle 2 de `CLAUDE.md`. Son moteur n'a pas
répondu — même constat qu'aux chapitres 24 et 41.

Deuxième faiblesse, plus grave : **l'espèce ne correspond pas**. Les seules entrées de phoque
du jeu SR Legacy portent sur le **phoque annelé (*Pusa hispida*)**, espèce **arctique**. Les
phoques du Saint-Laurent — commun, gris, du Groenland, à capuchon — n'ont **aucune entrée**.
Un phoque annelé du détroit de Davis et un phoque gris du golfe ne mangent pas la même chose,
ne portent pas la même épaisseur de lard et ne vivent pas dans la même eau.

Troisième faiblesse : la clé publique `DEMO_KEY` est partagée et répond par intermittence
(`OVER_RATE_LIMIT`). La récolte du 2026-09-20 est **partielle**.

> **Conséquence, appliquée sans exception au chapitre 52 :** toute valeur de ce fichier porte
> `[À VÉRIFIER]` dans le texte, et aucune n'est présentée comme une valeur canadienne ni comme
> une valeur des phoques du Saint-Laurent.

---

## Extraits, tels que relevés le 2026-09-20

### Viande

| Aliment (description USDA) | fdcId | NDB | Nom latin | Valeurs récupérées, par 100 g |
| --- | --- | --- | --- | --- |
| « Seal, ringed, meat (Alaska Native) » | 168025 | 35071 | *Pusa hispida* | **protéines 28,4 g** · **sodium 110 mg** |

Récolte interrompue par la limite de débit : lipides, énergie et fer de cette entrée
**n'ont pas été obtenus**. Ils sont donc absents du chapitre plutôt qu'estimés.

### Foie — valeur reprise du dossier du chapitre 41

Enregistrée le 2026-09-20 dans `sources/41-usda-fdc-composition-abats.md`, non recapturée ici :

| Aliment | fdcId | Nom latin | Valeurs |
| --- | --- | --- | --- |
| « Seal, ringed, liver (Alaska Native) » | 168026 | *Pusa hispida* | prot. 18,6 g · lip. 3,3 g · 116 kcal · **Fe 13,5 mg** · **vitamine A 4 880 µg ÉAR** · Ca 13 mg |

Pour comparaison, du même fichier : « Walrus, liver, raw » (*Odobenus rosmarus*, fdcId 168031)
— 21,0 g de protéines, 3,0 g de lipides, 125 kcal, **Fe 14,4 mg**.

---

## Le seul calcul que le chapitre 52 fait avec ces chiffres

**Le foie de phoque et la vitamine A.** L'apport maximal tolérable de Santé Canada (ANREF,
`sources/26-sante-canada-anref-vitamines.md`) est de **3 000 µg/jour** chez l'adulte et de
**900 µg/jour chez l'enfant de 4 à 8 ans**.

- 4 880 ÷ 3 000 = **1,63** — une portion de 100 g de foie de phoque annelé dépasse d'une fois
  et demie l'AMT **journalier** d'un adulte.
- 4 880 ÷ 900 = **5,42** — la même portion vaut **plus de cinq fois** l'AMT d'un enfant de
  4 à 8 ans.

Ces deux rapports sont des **divisions faites par le livre**, pas des valeurs publiées. Ils
sont présentés comme tels au chapitre 52, comme ils l'étaient au chapitre 41.

## Ce que le chapitre 52 **ne** fait **pas** avec ces chiffres

- Il **ne donne aucune teneur en gras** pour le phoque, alors que le gras est l'argument
  central du chapitre. La valeur n'a pas été obtenue, et une teneur en lipides plausible et
  non sourcée serait exactement l'erreur du premier jet du chapitre 63.
- Il ne donne **aucun rendement** en viande, en lard ni en huile.
- Il ne transpose pas la valeur du phoque annelé aux espèces du Saint-Laurent **sans le
  dire**. Là où la valeur sert — le foie — le texte nomme l'espèce de la donnée.

## Tâche de vérification

Reprendre chaque ligne dans le FCÉN de Santé Canada et, si une entrée existe pour une espèce
du Saint-Laurent, la substituer. À défaut, chercher du côté des travaux canadiens sur les
aliments traditionnels (Centre for Indigenous Peoples' Nutrition and Environment, Université
McGill) — source universitaire, donc de troisième rang, mais canadienne et portant sur les
bonnes espèces.
