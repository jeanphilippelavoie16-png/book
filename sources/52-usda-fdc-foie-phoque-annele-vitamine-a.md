# USDA FoodData Central — Foie de phoque annelé : vitamine A (relecture de la fiche 168026)

- **Organisme :** United States Department of Agriculture, Agricultural Research Service,
  FoodData Central, jeu SR Legacy, groupe « American Indian/Alaska Native Foods »
- **Fiche :** « Seal, ringed, liver (Alaska Native) », fdcId 168026, NDB 35072, *Pusa hispida*
- **URL de la fiche :** https://fdc.nal.usda.gov/food-details/168026/nutrients
- **Données lues à :** https://fdc.nal.usda.gov/portal-data/external/168026 (l'API publique
  `DEMO_KEY` répondait `OVER_RATE_LIMIT`)
- **Consultée le :** 24 septembre 2026
- **Copie enregistrée :** `52-usda-fdc-168026-foie-phoque-annele.json` (réponse intégrale)
- **Sert au chapitre :** 52, §5-I point 33 et §8 DANGER (foie de phoque et vitamine A)
- **Complète :** `52-usda-fdc-composition-phoque.md`, `41-usda-fdc-composition-abats.md`

## Valeurs, par 100 g, telles que publiées (extraits intégraux du fichier)

| Nutriment | Valeur | Mode d'obtention (code USDA) | Points de données |
| --- | --- | --- | --- |
| Water | 74,2 g | AI — « Analytical data; from the literature or government; incomplete documentation » | 1 |
| Protein | 18,6 g | AI | 1 |
| Total lipid (fat) | 3,3 g | AI | 1 |
| Iron, Fe | 13,5 mg | AI | 1 |
| **Vitamin A, IU** | **36 600 IU** | **AI — mesure** | **1** |
| **Vitamin A, RAE** | **4 880 µg** | **NR — « Nutrient that is based on other nutrient/s » ; source « Calculated or imputed »** | 0 |

## Le point qui compte : la valeur de 4 880 µg est un calcul, pas une mesure

- La **mesure** est **36 600 UI** (un seul échantillon).
- Les **4 880 µg ÉAR** sont **calculés** par l'USDA à partir de ces UI : 36 600 ÷ 4 880 = 7,5.
- Santé Canada donne le facteur pour la vitamine A **préformée** — celle du foie
  (`sources/26-sante-canada-anref-vitamines.md`) :
  > « Vitamine A : 1 ÉAR = 1 µg rétinol = 3,33 UI rétinol. Dans le cas de la vitamine A
  > préformée, 1 ÉR = 1 ÉAR. »
- Au facteur de Santé Canada : 36 600 ÷ 3,33 ≈ **11 000 µg ÉAR** par 100 g — **2,25 fois** la
  valeur calculée par l'USDA. (Division faite par le livre.)

## Rapports à l'apport maximal tolérable (divisions faites par le livre)

| | Valeur USDA calculée (4 880 µg) | Mesure convertie au facteur de Santé Canada (≈ 11 000 µg) |
| --- | --- | --- |
| Adulte (AMT 3 000 µg/j) | 1,6 fois | **3,7 fois** |
| Enfant de 4 à 8 ans (AMT 900 µg/j) | 5,4 fois | **12 fois** |

## Ce que la fiche NE dit PAS

- Rien sur les phoques du Saint-Laurent (commun, gris, du Groenland, à capuchon) : l'espèce est
  arctique.
- Pas de variation saisonnière ni selon l'âge : un seul échantillon.
- La fiche n'explique pas le facteur 7,5 qu'elle applique.
