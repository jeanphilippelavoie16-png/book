# ECCC — Normales climatiques canadiennes 1981-2010 : saison sans gel, Côte-Nord

- **Organisme :** Environnement et Changement climatique Canada (ECCC), Normales climatiques
  canadiennes 1981-2010, données de station, section « Frost-Free »
- **URL (Sept-Îles A, climat 7047910, stnID 5742) :**
  https://climate.weather.gc.ca/climate_normals/station_select_1981_2010_e.html?searchType=stnName&txtStationName=Sept&searchMethod=contains
- **URL (Baie-Comeau A, climat 7040440, stnID 5662) :**
  https://climate.weather.gc.ca/climate_normals/station_select_1981_2010_e.html?searchType=stnName&txtStationName=Baie-Comeau&searchMethod=contains
- **URL (Natashquan A, climat 7045400, stnID 5715) :**
  https://climate.weather.gc.ca/climate_normals/station_select_1981_2010_e.html?searchType=stnName&txtStationName=Natashquan&searchMethod=contains
- **Date de consultation :** 24 septembre 2026
- **Captation :** de première main, `curl`, HTTP 200, version anglaise. **Pages enregistrées en
  entier** à côté de cette fiche : `sources/34-eccc-normales-1981-2010-sept-iles-a.html`,
  `sources/34-eccc-normales-1981-2010-baie-comeau-a.html`,
  `sources/34-eccc-normales-1981-2010-natashquan-a.html`. Tableaux lus dans le HTML.
- **Sert au chapitre :** 34 — Calendrier annuel (§5.3, ligne Jardin : « saison de 90 à 100
  jours »). **Règle aussi la dette du ch. 74** (`sources/74-NON-OBTENUES.md`, point 2) et du
  ch. 75 (`sources/75-NON-OBTENUES-et-limites.md`, point 5), qui n'avaient pas pu atteindre ces
  pages.

---

## Extraits intégraux (section « Frost-Free »)

Le gel est défini par la page comme une température minimale **≤ 0 °C** (« Probability of last
temperature in spring <= 0°C »).

### Sept-Îles A — 50°13' N, 66°16' W, 54,9 m

> « Average Date of Last Spring Frost | May 25 | D »
> « Average Date of First Fall Frost | Sept 27 | D »
> « Average Length of Frost-Free Period | 124 Days | D »

| Probabilité | 10 % | 25 % | 33 % | 50 % | 66 % | 75 % | 90 % |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Dernier ≤ 0 °C du printemps, le ou après | 9 juin | 5 juin | 1er juin | 28 mai | 24 mai | 21 mai | 15 mai |
| Premier ≤ 0 °C de l'automne, le ou avant | 5 sept. | 11 sept. | 17 sept. | 20 sept. | 25 sept. | 26 sept. | 10 oct. |
| Saison sans gel égale ou inférieure à (jours) | **89** | 106 | 108 | 113 | 121 | 125 | 139 |

### Baie-Comeau A — 49°08' N, 68°12' W, 21,6 m

> « Average Date of Last Spring Frost | May 30 | C »
> « Average Date of First Fall Frost | Sept 15 | C »
> « Average Length of Frost-Free Period | 108 Days | C »

| Probabilité | 10 % | 25 % | 33 % | 50 % | 66 % | 75 % | 90 % |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Dernier ≤ 0 °C du printemps | 11 juin | 4 juin | 2 juin | 26 mai | 24 mai | 20 mai | 18 mai |
| Premier ≤ 0 °C de l'automne | 4 sept. | 10 sept. | 14 sept. | 17 sept. | 21 sept. | 22 sept. | 30 sept. |
| Saison sans gel ≤ (jours) | **95** | 104 | 107 | 113 | 118 | 120 | 127 |

### Natashquan A — 50°11' N, 61°49' W, 10,7 m

> « Average Date of Last Spring Frost | May 25 | D »
> « Average Date of First Fall Frost | Sept 23 | D »
> « Average Length of Frost-Free Period | 120 Days | D »

| Probabilité | 10 % | 25 % | 33 % | 50 % | 66 % | 75 % | 90 % |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Saison sans gel ≤ (jours) | **93** | 103 | 105 | 109 | 118 | 125 | 134 |

### Légende des codes (mot à mot)

> « B = At least 25 years | C = At least 20 years | D = At least 15 years »

---

## Lecture pour le livre

- **En moyenne**, la saison sans gel des stations de la côte va de **108 jours** (Baie-Comeau)
  à **124 jours** (Sept-Îles) ; la médiane est de 109 à 113 jours.
- **Une année sur dix**, elle tombe à **89 jours ou moins** à Sept-Îles, **95 ou moins** à
  Baie-Comeau, **93 ou moins** à Natashquan.
- Le « 90 à 100 jours » du projet n'est donc **pas la moyenne** : c'est la **mauvaise année**
  des stations côtières. Comme base de planification (variétés de 100 jours), c'est la bonne
  valeur, à condition de la dire comme telle.
- Les trois stations sont des **aéroports au bord de la mer**, à moins de 55 m d'altitude. La
  page ne dit rien de l'intérieur des terres ni d'une trouée en forêt.
- Dernier gel du printemps : en moyenne fin mai, mais **un an sur dix après le 9 à 13 juin**.
  Premier gel d'automne : en moyenne mi à fin septembre, mais **un an sur dix avant le 4 à
  7 septembre**.

---

## Ajout — températures de janvier (même pages, section « Temperature »)

Relevé le 24 septembre 2026 dans les mêmes pages enregistrées, pour le ch. 75 (froid du dehors
comme congélateur) :

| Station | « Daily Average (°C) », janvier | « Daily Minimum (°C) », janvier | février (moy. / min.) |
| --- | --- | --- | --- |
| Sept-Îles A | **-15,3** | **-20,8** | -13,6 / -19,3 |
| Baie-Comeau A | **-14,3** | **-19,9** | -12,7 / -18,6 |

Lecture : en janvier, la nuit moyenne de la côte est au froid d'un congélateur domestique
(-18 °C, `sources/75-fao-normes-banques-de-genes-2014.md`) ; la moyenne du jour reste quelques
degrés au-dessus.
