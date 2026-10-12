# Environnement et Changement climatique Canada — Normales 1981-2010 : période sans gel, Côte-Nord

- **Organisme :** Environnement et Changement climatique Canada (ECCC), *Normales climatiques
  canadiennes 1981-2010*, servies par l'API publique GeoMet-OGC (collection `climate-normals`)
- **URL :** https://api.weather.gc.ca/collections/climate-normals/items?f=json&CLIMATE_IDENTIFIER=7047910
  (Sept-Îles A) et `...CLIMATE_IDENTIFIER=7045400` (Natashquan A)
- **Page équivalente pour un humain :** https://climate.weather.gc.ca/climate_normals/ (formulaire
  par station — c'est lui qui avait bloqué la recherche du 20 septembre, voir `74-NON-OBTENUES.md` §2)
- **Consultée le :** 24 septembre 2026
- **Enregistrement :** `74-eccc-normales-gel-sept-iles-natashquan.json` (même dossier), les six
  enregistrements bruts tels que servis par l'API
- **Sert dans :** chapitre 74, §1 (« saison de 90 à 100 jours sans gel »)
- **Stations cherchées :** aucune station de Baie-Comeau ni de Havre-Saint-Pierre n'a de normales
  1981-2010 dans la collection (`HAS_NORMALS_DATA = N`). Les stations de la Côte-Nord qui en ont :
  Sept-Îles A, Natashquan A, Rivière-au-Tonnerre. Toutes au bord de l'eau ; aucune à l'intérieur.

## Extraits intégraux (champs de l'API, valeurs telles que servies)

**SEPT-ILES A — 7047910 — période 1981-2010, 16 années retenues, code de normale D**

| NORMAL_ID | F_NORMAL_ELEMENT_NAME | VALUE |
| --- | --- | --- |
| 13 | « Date moyenne de la dernière gelée au printemps » | 145 |
| 14 | « Date moyenne de la première gelée à l'automne » | 270 |
| 21 | « Durée moyenne de la période sans gel, en jours » | 124 |

**NATASHQUAN A — 7045400 — période 1981-2010, 16 années retenues, code de normale D**

| NORMAL_ID | F_NORMAL_ELEMENT_NAME | VALUE |
| --- | --- | --- |
| 13 | « Date moyenne de la dernière gelée au printemps » | 145 |
| 14 | « Date moyenne de la première gelée à l'automne » | 266 |
| 21 | « Durée moyenne de la période sans gel, en jours » | 120 |

## Lecture

- Les dates sont des **jours de l'année** : 145 = **25 mai** ; 270 = **27 septembre** ; 266 =
  **23 septembre** (année non bissextile).
- Code de normale **D** : normale calculée sur au moins 15 années de la période ; c'est le rang
  le plus bas publié par ECCC pour ces éléments. Les deux stations sont dans le même rang.
- Une station d'aéroport au bord du golfe n'est pas une trouée de forêt à l'intérieur des terres :
  la valeur est celle de la côte, pas celle du jardin.

## Ce que ça change au livre

La fourchette « 90 à 100 jours » (prémisse de `CLAUDE.md`) ne sort d'aucune source : les deux
stations officielles de la Côte-Nord donnent **120 et 124 jours**.
