# ECCC — Normales climatiques canadiennes 1991-2020 : gel, températures et degrés-jours, Côte-Nord

- **Organisme :** Environnement et Changement climatique Canada (ECCC), *Normales climatiques
  canadiennes 1991-2020*, données de station composite
- **URL type (une par station) :**
  `https://climate.weather.gc.ca/climate_normals/results_1991_2020_e.html?searchType=stnName&txtStationName=Havre&searchMethod=contains&txtCentralLatMin=0&txtCentralLatSec=0&txtCentralLongMin=0&txtCentralLongSec=0&climate_id=NNNNNNN&dispBack=0`
  avec `climate_id` = 7047910 (Sept-Îles), 7040440 (Baie-Comeau), 7045398 (Natashquan),
  7044328 (Longue-Pointe-de-Mingan), 7025250 (Montréal-Trudeau, comparaison seulement)
- **Consultées le :** 27 septembre 2026
- **Captation :** de première main, `curl`, HTTP 200, version anglaise. **Pages enregistrées en
  entier** à côté de cette fiche :
  - `97-eccc-normales-1991-2020-sept-iles.html`
  - `97-eccc-normales-1991-2020-baie-comeau.html`
  - `97-eccc-normales-1991-2020-natashquan.html`
  - `97-eccc-normales-1991-2020-longue-pointe-de-mingan.html`
  - `97-eccc-normales-1991-2020-montreal.html`
- **Sert au chapitre :** 97 — Allonger la saison (§1, §2, §3, §5-A, §6, §9)
- **Complète :** `34-eccc-normales-saison-sans-gel-cote-nord.md` (normales **1981-2010**, déjà au
  dossier, qu'utilisent les ch. 41 et 95). La série 1991-2020 est plus récente ; les deux sont
  données dans la fiche de suivi pour que l'écart se voie.

## Havre-Saint-Pierre

Aucune station de Havre-Saint-Pierre n'a de normales, ni 1981-2010 ni 1991-2020 :
- recherche « Havre » sur le formulaire 1981-2010 : « No station names contain 'Havre' » ;
- API GeoMet (`climate-stations`, QC) : les six stations de Havre-Saint-Pierre portent
  `HAS_NORMALS_DATA = N`.

La station la plus proche qui en a, en 1991-2020, est **Longue-Pointe-de-Mingan** (7044328,
50°16'17" N, 64°13'35" W, 11 m), sur la même côte, à l'ouest de Havre-Saint-Pierre. **Sa page
n'a pas de section « Frost-Free »** : on n'a pour elle que les jours de gel par mois et les
températures. Code de normale **D** (au moins 15 ans) pour les jours de gel ; les degrés-jours
de Longue-Pointe sont incomplets (août à 134,1 au-dessus de 5 °C, sans total annuel) et ne sont
**pas** utilisés.

---

## Extraits intégraux

Le gel est une température minimale **≤ 0 °C** mesurée sous abri, à hauteur d'homme (voir la
fiche FAO, `97-fao-protection-gel-2005.md` : « Stevenson-screen shelter at a height between 1.25
and 2.0 m »).

### Section « Frost-Free »

**Sept-Îles** (composite 7047910 / 7047911 / 7047912 / 7047914 ; la page ne publie **pas** de
date moyenne en 1991-2020, seulement les probabilités) :

> « Probability of last temperature in spring | Jun 11 | Jun 06 | Jun 04 | May 31 | May 24 | May 23 | May 16 »
> « Probability of first temperature in fall | Sep 04 | Sep 09 | Sep 13 | Sep 19 | Sep 24 | Sep 25 | Oct 06 »
> « Probability of frost-free period equal to or less than indicated period (Days) | 87 | 100 | 104 | 111 | 118 | 123 | 138 »

(colonnes : 10 % | 25 % | 33 % | 50 % | 66 % | 75 % | 90 %)

**Baie-Comeau** (composite 7040440 / 7040442) :

> « Average Date of Last Spring Frost | May 29 | D »
> « Average Date of First Fall Frost | Sept 21 | D »
> « Average Length of Frost-Free Period | 114 Days | D »
> « Probability of last temperature in spring | Jun 11 | Jun 04 | Jun 01 | May 27 | May 24 | May 21 | May 18 »
> « Probability of first temperature in fall | Sep 04 | Sep 11 | Sep 14 | Sep 17 | Sep 21 | Sep 23 | Oct 05 »
> « Probability of frost-free period equal to or less than indicated period (Days) | 96 | 104 | 107 | 113 | 118 | 120 | 132 »

**Natashquan** (composite 7045401 / 7045400 / 7045398) :

> « Average Date of Last Spring Frost | May 28 | D »
> « Average Date of First Fall Frost | Sept 20 | D »
> « Average Length of Frost-Free Period | 114 Days | D »
> « Probability of last temperature in spring | Jun 12 | Jun 06 | Jun 04 | May 27 | May 24 | May 23 | May 16 »
> « Probability of first temperature in fall | Sep 06 | Sep 12 | Sep 14 | Sep 18 | Sep 22 | Sep 26 | Oct 02 »
> « Probability of frost-free period equal to or less than indicated period (Days) | 93 | 102 | 105 | 109 | 119 | 125 | 132 »

**Montréal-Trudeau** (comparaison) :

> « Average Date of Last Spring Frost | Apr 29 | C » · « Average Date of First Fall Frost | Oct 14 | C » ·
> « Average Length of Frost-Free Period | 167 Days | C »

### Températures quotidiennes (°C), mai à octobre

| Station | Ligne | Mai | Juin | Juil. | Août | Sept. | Oct. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Sept-Îles | « Daily Average » | 6,0 | 11,6 | 15,1 | 14,6 | 9,8 | 4,3 |
| Sept-Îles | « Daily Maximum » | 10,9 | 16,7 | 19,7 | 19,5 | 14,8 | 8,4 |
| Sept-Îles | « Daily Minimum » | 1,1 | 6,5 | 10,3 | 9,6 | 4,8 | 0,1 |
| Sept-Îles | « Extreme Minimum » (période) | -7,9 | -3,3 | 2,0 | **-1,0** (2006/27) | -4,2 | -13,3 |
| Baie-Comeau | « Daily Minimum » | 2,0 | 7,3 | 10,7 | 9,9 | 5,4 | 0,6 |
| Baie-Comeau | « Extreme Minimum » | -7,5 | -3,0 | 3,0 | **-0,7** (2002/31) | -4,3 | -10,4 |
| Natashquan | « Daily Minimum » | 1,1 | 6,5 | 10,6 | 10,1 | 5,7 | 0,9 |
| Natashquan | « Extreme Minimum » | -7,7 | -3,4 | 2,7 | **-0,6** (2006/27) | -5,8 | -10,7 |
| Longue-Pointe-de-Mingan | « Daily Minimum » | 0,2 | 5,0 | 8,8 | 8,0 | 3,9 | 0,0 |
| Longue-Pointe-de-Mingan | « Extreme Minimum » | -8,3 | -4,4 | 1,1 | **-1,2** (2006/27) | -5,6 | -13,0 |
| Montréal | « Daily Average » | 13,9 | 19,0 | 21,7 | 20,6 | 16,0 | 8,9 |

### Jours avec minimum (moyenne mensuelle du nombre de jours)

| Station | Seuil | Mai | Juin | Juil. | Août | Sept. |
| --- | --- | --- | --- | --- | --- | --- |
| Sept-Îles | « > 10 °C » | 0,07 | 5,2 | 18,3 | 14,5 | 2,9 |
| Sept-Îles | « <= 0 °C » | 12,0 | 1,5 | 0,0 | 0,11 | 3,9 |
| Sept-Îles | « < -2 °C » | 5,7 | 0,46 | 0,0 | 0,0 | 1,2 |
| Baie-Comeau | « > 10 °C » | 0,15 | 7,3 | 18,4 | 15,6 | 4,0 |
| Baie-Comeau | « <= 0 °C » | 9,5 | 0,77 | 0,0 | 0,04 | 3,2 |
| Baie-Comeau | « < -2 °C » | 4,3 | 0,08 | 0,0 | 0,0 | 0,88 |
| Natashquan | « <= 0 °C » | 11,7 | 0,58 | 0,0 | 0,04 | 2,1 |
| Natashquan | « < -2 °C » | 5,4 | 0,08 | 0,0 | 0,0 | 0,58 |
| Longue-Pointe-de-Mingan | « > 10 °C » | 0,0 | 2,6 | 11,2 | 10,4 | 2,7 |
| Longue-Pointe-de-Mingan | « <= 0 °C » | 17,2 | 3,3 | 0,0 | 0,20 | 6,3 |
| Longue-Pointe-de-Mingan | « < -2 °C » | 8,0 | 0,48 | 0,0 | 0,0 | 1,6 |

### Degrés-jours (« Degree Days »)

| Station | Ligne | Mai | Juin | Juil. | Août | Sept. | Oct. | Année |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Sept-Îles | « Above 5 °C » | 56,7 | 195,9 | 309,0 | 296,8 | 149,6 | 30,0 | **1043,7** |
| Sept-Îles | « Above 10 °C » | 6,6 | 66,3 | 154,3 | 142,9 | 36,9 | 1,7 | **408,8** |
| Baie-Comeau | « Above 5 °C » | 79,3 | 233,4 | 336,8 | 316,0 | 166,7 | 36,7 | **1176,2** |
| Baie-Comeau | « Above 10 °C » | 11,8 | 92,9 | 181,8 | 161,5 | 47,9 | 2,4 | **498,4** |
| Natashquan | « Above 5 °C » | 51,6 | 190,2 | 309,8 | 298,8 | 163,2 | 39,6 | **1059,0** |
| Natashquan | « Above 10 °C » | 3,7 | 60,6 | 155,3 | 145,1 | 43,5 | 1,8 | **410,0** |
| Montréal | « Above 5 °C » | 264,0 | 420,7 | 510,2 | 479,8 | 330,5 | 129,7 | **2247,0** |
| Montréal | « Above 10 °C » | 122,4 | 270,7 | 355,2 | 324,8 | 183,7 | 38,4 | **1317,2** |

### Légende (mot à mot)

> « A = WMO "3 and 5 rule" […] B = At least 25 years C = At least 20 years D = At least 15 years »

---

## Lecture pour le livre (calculs faits ici, pas dans la source)

- **Saison médiane** (probabilité 50 %) : 111 jours à Sept-Îles, 113 à Baie-Comeau, 109 à
  Natashquan. **Une année sur dix** : 87 jours ou moins à Sept-Îles, 96 à Baie-Comeau, 93 à
  Natashquan.
- **Dernier gel du printemps, une année sur dix après le** 11 juin (Sept-Îles, Baie-Comeau),
  12 juin (Natashquan). **Premier gel d'automne, une année sur dix avant le** 4 septembre
  (Sept-Îles, Baie-Comeau), 6 septembre (Natashquan).
- **Le gel d'août existe** : minimum extrême d'août sous zéro aux quatre stations dans la
  période 1991-2020 (le 27 août 2006 à trois d'entre elles). **Juillet est le seul mois sans
  gel enregistré** dans la période aux quatre stations.
- **La plupart des nuits de gel de juin et de septembre sont faibles** : à Sept-Îles, sur 3,9
  nuits ≤ 0 °C en septembre, 1,2 descend sous -2 °C ; il en reste donc environ 2,7 entre 0 et
  -2 °C (69 %). Juin : 1,5 nuit ≤ 0 °C, dont 0,46 sous -2 °C. Baie-Comeau, septembre : 3,2 et
  0,88. Soustractions faites ici.
- **Les nuits douces manquent même en été** : à Sept-Îles, 18,3 nuits de juillet sur 31 et 14,5
  d'août sur 31 restent au-dessus de 10 °C ; les autres descendent à 10 °C ou moins.
- **La chaleur utile** : au-dessus de 5 °C, Sept-Îles reçoit 1044 degrés-jours par an contre 2247
  à Montréal (46 %) ; au-dessus de 10 °C, 409 contre 1317 (31 %). Divisions faites ici.
- **Ce que vaut septembre** : 149,6 degrés-jours au-dessus de 5 °C à Sept-Îles, contre 195,9 en
  juin. Le mois qu'un gel précoce ferme vaut les trois quarts de juin (149,6 ÷ 195,9 = 0,76).
- **Havre-Saint-Pierre** (par Longue-Pointe-de-Mingan) : 3,3 nuits ≤ 0 °C en juin et 6,3 en
  septembre, soit deux fois Sept-Îles ; minimum moyen de juin 5,0 °C.

## Écart avec la série 1981-2010 (déjà au dossier, fiche 34)

| Sept-Îles | 1981-2010 | 1991-2020 |
| --- | --- | --- |
| Saison moyenne | 124 jours (moyenne) | pas de moyenne publiée ; médiane 111 jours |
| Dernier gel | 25 mai (moyenne) ; 28 mai (50 %) ; 9 juin (10 %) | 31 mai (50 %) ; 11 juin (10 %) |
| Premier gel | 27 sept. (moyenne) ; 20 sept. (50 %) ; 5 sept. (10 %) | 19 sept. (50 %) ; 4 sept. (10 %) |
| Saison une année sur dix | ≤ 89 jours | ≤ 87 jours |

La série récente ne raccourcit pas la mauvaise année ; elle raccourcit un peu l'année ordinaire.
Le ch. 95 §1 cite la moyenne 1981-2010 (25 mai – 27 septembre, « environ 120 jours ») : voir la
fiche de suivi du ch. 97, décision pour JP.

## Ce que les pages ne disent pas

- Rien de l'intérieur des terres ni d'une trouée de forêt : les cinq stations sont des aéroports
  ou des pointes au bord de l'eau, à moins de 55 m d'altitude (Montréal exceptée).
- Aucune température **au ras du sol** : le gel des normales est mesuré à hauteur d'homme.
