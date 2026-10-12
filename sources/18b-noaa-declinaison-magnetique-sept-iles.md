# Source — NOAA, National Centers for Environmental Information, calcul de la déclinaison magnétique (modèle magnétique mondial WMM-2025)

- **Organisme :** National Oceanic and Atmospheric Administration (États-Unis), NCEI ; le modèle
  WMM est produit conjointement avec le British Geological Survey
- **URL de la requête :** https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=50.22&lon1=-66.38&startYear=2026&startMonth=9&startDay=23&resultFormat=json
- **Date de consultation :** 2026-09-23
- **Captation :** `curl`, réponse JSON reproduite ci-dessous
- **Sert au chapitre :** 18b (sections 5.3 et 9 — orienter le panneau au sud vrai)

---

## Réponse intégrale (champs utiles)

```
"date": 2026.7261,
"declination": -17.18557,
"declination_sv": 0.16665,
"declination_uncertainty": 0.40625,
"latitude": 50.22,
"longitude": -66.38
"model": "WMM-2025"
```

## Lecture

- Déclinaison **-17,2°**, soit **17° à l'ouest** : à Sept-Îles, l'aiguille de la boussole pointe
  17° à gauche du nord vrai.
- Variation annuelle : +0,17° par an ; la déclinaison diminue lentement.
- Pour viser le sud vrai à la boussole, on vise **197°** au cadran de la boussole (180 + 17), pas
  180°.

Le chapitre donne « environ 17° » et offre la méthode de l'ombre la plus courte, qui ne dépend
d'aucun instrument ni d'aucune date.

`[À VÉRIFIER]` : la valeur ailleurs sur la côte (Baie-Comeau, Havre-Saint-Pierre) ; elle change
de quelques degrés d'un bout à l'autre. Une requête par lieu suffit.
