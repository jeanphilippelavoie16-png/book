# USDA FoodData Central — « Barley, hulled » (SR Legacy 20004) et « Oats » (SR Legacy 20038)

- **Organisme :** United States Department of Agriculture, Agricultural Research Service,
  FoodData Central — officielle (fédérale américaine). C'est la source d'origine déclarée par le
  FCÉN pour l'orge (4485) et l'avoine (4421) : code 0, « Provient intégralement de l'USDA ».
- **URL (API publique) :**
  - https://api.nal.usda.gov/fdc/v1/food/170283 (FDC 170283, NDB 20004, « Barley, hulled »)
  - https://api.nal.usda.gov/fdc/v1/food/169705 (FDC 169705, NDB 20038, « Oats (Includes foods for
    USDA's Food Distribution Program) »)
- **Date de consultation :** 27 septembre 2026 (fiches publiées le 1er avril 2019)
- **Captation :** `curl`, HTTP 200, réponses JSON enregistrées en entier :
  `98-usda-fdc-20004-orge-barley-hulled.json`, `98-usda-fdc-20038-avoine-oats.json`.
- **Sert au chapitre :** 98, tableau 1 (kcal au kilo et protéines de l'orge et de l'avoine) ;
  point ouvert n° 2 de `suivi/98-redaction.md`.

## Valeurs relevées (pour 100 g)

| Fiche | Énergie | Protéines | Eau | Fibres alimentaires totales |
| --- | --- | --- | --- | --- |
| 20004 « Barley, hulled » | 354 kcal | 12,48 g | 9,44 g | 17,3 g |
| 20038 « Oats » | 389 kcal | 16,89 g | 8,22 g | 10,6 g |

Ce sont exactement les valeurs FCÉN 4485 (354 kcal ; 12,48 g ; eau 9,44 g) et 4421 (389 kcal ;
16,89 g ; eau 8,22 g) : la provenance du FCÉN est confirmée fiche par fiche.

## Lecture

- La fiche 20004 s'appelle « hulled », mot qui désigne en usage américain l'orge **débarrassée de
  sa balle** (par opposition à « pearled », perlée). La fiche elle-même ne donne pas de définition :
  la lecture « sans balle » tient par le nom et par les fibres (17,3 g), pas par une phrase de la
  fiche.
- La fiche 20038 « Oats » ne dit rien de la balle ; ses fibres (10,6 g) vont avec un grain
  décortiqué (gruau). Lecture probable, non écrite dans la fiche.
- Le chapitre garde donc « sans balle » pour les deux, et retranche la balle pour le grain vêtu
  battu à la main (10 % pour l'orge, 25 à 30 % pour l'avoine, `98-maaaro-guide-agronomique-cereales-ch4.md`).
