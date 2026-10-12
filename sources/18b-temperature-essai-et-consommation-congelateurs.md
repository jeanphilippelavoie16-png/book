# Source — La température de l'essai d'étiquette et la dépendance de la consommation à l'écart de température

Deux documents, une seule question : **à quelle température ambiante le chiffre en kWh/an de
l'étiquette a-t-il été mesuré, et comment la consommation change-t-elle quand l'appareil est
ailleurs ?**

- **Date de consultation :** 2026-09-23
- **Sert au chapitre :** 18b (sections 3 et 5.1)

---

## 1. ENERGY STAR (Environmental Protection Agency des États-Unis), méthode d'essai des réfrigérateurs et congélateurs

- **Document :** *ENERGY STAR Draft 1 Test Method for Connected Refrigerators,
  Refrigerator-Freezers and Freezers*
- **URL :** https://www.energystar.gov/sites/default/files/specs/ENERGY_STAR_Draft_1_Test_Method_for_Connected_Refrigerators_Refrigerator_Freezers_and_Freezers.pdf
- **Captation :** `curl`, PDF enregistré : `sources/18b-energy-star-methode-essai-congelateurs.pdf`

> « Unless otherwise specified, all test conditions and requirements shall be identical to
> 10 CFR Part 430 »

> « B) Ambient Temperature: Ambient temperature shall be 90 °F ± 1 °F (32.2 °C ± 0.6 °C). »

## 2. Lawrence Berkeley National Laboratory (département de l'Énergie des États-Unis)

- **Document :** Greenblatt, Hopkins, Letschert (LBNL) et Blasnik, *Energy use of US residential
  refrigerators and freezers: function derivation based on household and climate
  characteristics*, avril 2012
- **URL :** https://www.osti.gov/servlets/purl/1169485
- **Captation :** `WebFetch`, PDF enregistré :
  `sources/18b-lbnl-consommation-refrigerateurs-congelateurs.pdf`, texte extrait par `pdftotext`

> « the conditions of the test procedure are not very realistic [e.g., refrigerators are empty,
> the doors are not opened, and the ambient temperature is maintained at 90 °F (32 °C)] »

> « From thermodynamics, the energy required to maintain a temperature gradient is proportional
> to that gradient, so assuming a 30 °F (17 °C) difference between ambient and interior unit
> temperatures [...] we expect about a 3% impact on electricity use per 1 °F (0.6 °C) change in
> ambient temperature. Previous studies that examined the dependence of energy use on ambient
> temperature found similar sensitivities (e.g., Meier 1995). »

> « A second refrigerator, generally located in a basement or garage, enters a new operating
> environment and may be used less than year-round. »

---

## Ce que le chapitre en tire, et ce qui est du rédacteur

**Sourcé :** l'étiquette est mesurée à 32,2 °C, porte fermée ; la consommation est
proportionnelle à l'écart de température entre l'intérieur de l'appareil et l'air qui
l'entoure.

**Calcul du rédacteur, à présenter comme tel :** avec l'intérieur à -18 °C, l'essai se fait à un
écart de 50 °C. Un coffre moyen à 287,6 kWh/an (0,79 kWh/j) consomme donc environ
0,0157 kWh/j par degré d'écart. D'où le tableau de la section 5.1 :

| Air autour du coffre | Écart | kWh/jour estimés |
| --- | --- | --- |
| 32 °C (étiquette) | 50 °C | 0,79 |
| 20 °C (chalet chauffé) | 38 °C | 0,60 |
| 10 °C | 28 °C | 0,44 |
| 0 °C | 18 °C | 0,28 |
| -3 °C (remise en novembre, Sept-Îles) | 15 °C | 0,24 |
| -10 °C (remise en décembre) | 8 °C | 0,13 |
| -18 °C | 0 | 0 |

**Ce que ce calcul ignore, et que le chapitre dit :** l'ouverture du couvercle, le rendement du
compresseur qui change avec la température, le soleil sur la remise, la viande chaude qu'on
rentre. C'est un ordre de grandeur. La mesure au wattmètre sur une journée le remplace.

**Point à vérifier `[À VÉRIFIER]` :** que l'étiquette ÉnerGuide canadienne est bien mesurée
dans les mêmes conditions (32,2 °C). La page de RNCan sur les règlements renvoie à une norme
canadienne réputée harmonisée avec l'essai américain ; la page du Conseil canadien des normes a
refusé la consultation (HTTP 403). L'ordre de grandeur du chapitre ne change pas si l'essai
canadien diffère de quelques degrés.
