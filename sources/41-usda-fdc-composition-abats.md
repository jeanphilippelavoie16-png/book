# USDA FoodData Central — Composition des abats de gibier et de mammifères marins

- **Organisme :** United States Department of Agriculture, Agricultural Research Service,
  FoodData Central, jeu de données **SR Legacy** (série *American Indian / Alaska Native Foods*)
- **URL du portail :** https://fdc.nal.usda.gov/
- **Interface interrogée :** API publique `https://api.nal.usda.gov/fdc/v1/foods/search`
  (clé DEMO_KEY), jeu `SR Legacy`
- **Date de consultation :** 2026-09-20
- **Chapitre qui l'utilise :** 41 — Abats et organes (sections 1, 3, 5, 8)

## Pourquoi une source américaine ici

Le **Fichier canadien sur les éléments nutritifs** (FCÉN, Santé Canada) est la source canadienne
équivalente et devrait primer selon la règle 2 de `CLAUDE.md`. Son moteur de recherche n'a pas
répondu lors des consultations du 2026-09-20 (même constat qu'au chapitre 24, voir
`sources/24-usda-fdc-composition-gibier-et-gras.md`). Les valeurs ci-dessous viennent donc de
l'USDA — agence fédérale américaine, acceptable mais de second rang.

> **Tâche de vérification :** reprendre chaque ligne dans le FCÉN et substituer les valeurs
> canadiennes. **Toutes les valeurs de ce fichier sont marquées `[À VÉRIFIER]` au chapitre 41.**

---

## Extraits intégraux — par 100 g de partie comestible

| Aliment (description USDA) | fdcId | Nom latin donné | Prot. (g) | Lip. (g) | kcal | Fe (mg) | Autres valeurs relevées |
| --- | --- | --- | --- | --- | --- | --- | --- |
| « Moose, liver, braised (Alaska Native) » | 167609 | *Alces alces* | 24,4 | 4,89 | 155 | 6,77 | **vit. C 22,6 mg** · **B12 71,0 µg** · Cu 2,79 mg · Zn 6,07 mg · Ca 7 mg |
| « Caribou, liver, raw (Alaska Native) » | 168983 | *Rangifer tarandus* | 15,0 | 3,9 | 122 | **15,7** | Ca 4 mg |
| « Caribou, tongue, raw (Alaska Native) » | 168985 | — | 13,7 | **22,8** | **260** | 2,8 | Ca 6 mg |
| « Caribou, bone marrow, raw (Alaska Native) » | 169800 | *Rangifer tarandus* | 6,7 | **84,4** | **786** | 4,5 | — |
| « Seal, ringed, liver (Alaska Native) » | 168026 | *Pusa hispida* | 18,6 | 3,3 | 116 | 13,5 | **vitamine A 4 880 µg ÉAR** · Ca 13 mg |
| « Walrus, liver, raw (Alaska Native) » | 168031 | *Odobenus rosmarus* | 21,0 | 3,0 | 125 | 14,4 | — |
| « Whale, beluga, liver, raw (Alaska Native) » | 168980 | *Delphinapterus leucas* | 18,4 | 3,9 | 117 | — | Ca 11 mg |
| « Fish, pike, northern, liver (Alaska Native) » | 168021 | *Esox lucius* | 16,6 | 8,0 | 156 | 2,1 | Ca 28 mg |
| « Fish, whitefish, broad, liver (Alaska Native) » | 167626 | *Coregonus nasus* | 11,0 | 4,4 | 104 | 8,6 | Ca 53 mg |
| « Fish, lingcod, liver (Alaska Native) » | 169810 | *Ophiodon elongatus* | 5,6 | **42,0** | **424** | 1,0 | vit. C 0,0 mg |
| « Fish, salmon, king, chinook, liver (Alaska Native) » | 167616 | *Oncorhynchus tshawytscha* | 16,6 | 8,0 | 156 | 2,6 | Ca 28 mg |

Rappels repris du fichier du chapitre 24, pour la comparaison :
« Game meat, moose, raw » (fdcId 174344) — 22,2 g de protéines, **0,74 g de lipides**, 102 kcal.

---

## Les trois chiffres qui portent le chapitre 41

1. **Foie de phoque annelé : 4 880 µg ÉAR de vitamine A par 100 g.** À comparer à l'apport
   maximal tolérable de Santé Canada : 3 000 µg/jour chez l'homme de 19-50 ans et **900 µg/jour
   chez l'enfant de 4 à 8 ans** (ANREF, voir `sources/26-sante-canada-anref-vitamines.md`).
   Les rapports **1,6 fois** (adulte) et **5,4 fois** (enfant de 4-8 ans) sont des divisions
   faites par le livre, pas des valeurs publiées : 4 880 ÷ 3 000 = 1,63 et 4 880 ÷ 900 = 5,42.
2. **Langue de caribou : 22,8 g de lipides et 260 kcal par 100 g**, contre 0,74 g de lipides pour
   le muscle d'orignal cru. La langue est un des rares morceaux gras d'un cervidé — le rapport de
   **31 fois** (22,8 ÷ 0,74) est une division du livre.
3. **Foie d'orignal braisé : 22,6 mg de vitamine C par 100 g.** Un abat qui contient de la
   vitamine C là où le muscle n'en a pratiquement pas — et c'est justement l'abat que le MAPAQ
   interdit chez les cervidés à cause du cadmium. Cette tension est le cœur du chapitre 41 et
   elle doit être exposée, pas escamotée.

## Notes de lecture, à ne pas escamoter

1. **Le phoque annelé (*Pusa hispida*) n'est pas le phoque du Saint-Laurent.** Les espèces de
   l'estuaire — phoque commun, phoque gris, phoque du Groenland — n'ont **aucune** entrée dans ce
   jeu de données. La valeur de vitamine A est donc une **approximation d'espèce voisine**, à ce
   titre `[À VÉRIFIER]`, et le chapitre 52 devra la reprendre à la source.
2. **Aucune entrée pour le foie d'ours noir (*Ursus americanus*).** Le chapitre 41 ne donne donc
   aucun chiffre de vitamine A pour l'ours et le dit explicitement.
3. **Aucune entrée pour le rein (rognon) de cervidé**, ni pour la rate, le cœur d'orignal, le
   sang, la panse ou la crépine. Le chapitre ne chiffre aucun de ces morceaux.
4. **Aucune donnée de cadmium** dans FoodData Central. Le cadmium du chapitre vient entièrement
   de la page du MAPAQ, qui ne donne aucune valeur en mg/kg mais un rapport à la quantité tolérée
   par l'OMS.
5. Les valeurs « braised » ou « cooked » sont plus concentrées parce que l'eau est partie, pas
   parce que l'aliment est devenu plus nourrissant.
6. Une absence de valeur dans une case (vitamine A du foie d'orignal, par exemple) signifie
   **donnée manquante**, pas zéro. Ne jamais lire une case vide comme une teneur nulle.
7. Les foies de poisson relevés ici sont des espèces du Pacifique et de l'Arctique. **Aucune
   valeur pour l'omble de fontaine (*Salvelinus fontinalis*) ni pour l'éperlan du Saint-Laurent.**
