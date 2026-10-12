# Source — PVGIS (Commission européenne, Centre commun de recherche), production photovoltaïque à Sept-Îles, Baie-Comeau et Havre-Saint-Pierre

- **Organisme :** Commission européenne, Centre commun de recherche (JRC), outil PVGIS 5.2
- **Base de rayonnement :** PVGIS-NSRDB (base nord-américaine du National Renewable Energy
  Laboratory des États-Unis), météo ERA5, années 2005 à 2015, relief de l'horizon calculé
- **Date de consultation :** 2026-09-23
- **Captation :** de première main, par l'interface de programmation publique (`curl`), réponses
  JSON enregistrées telles quelles dans `sources/18b-pvgis-donnees-brutes/`
- **Sert au chapitre :** 18b — L'électricité du chalet et le froid mécanique (sections 2, 3, 5.3,
  5.6, 6)

---

## Requêtes (reproductibles)

Production mensuelle, 1 kW crête, pertes du système 14 %, orienté plein sud :

```
https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=50.22&lon=-66.38&peakpower=1&loss=14&angle=<0|35|45|60|75|90>&aspect=0&outputformat=json
https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=50.22&lon=-66.38&peakpower=1&loss=14&optimalangles=1&outputformat=json
```

Série horaire 2005-2015 (fichiers de 9 Mo, **non conservés**, régénérables par la même requête) :

```
https://re.jrc.ec.europa.eu/api/v5_2/seriescalc?lat=50.22&lon=-66.38&pvcalculation=1&peakpower=1&loss=14&angle=60&aspect=0&startyear=2005&endyear=2015&outputformat=json
(idem avec angle=0)
```

Calculateur hors réseau :

```
https://re.jrc.ec.europa.eu/api/v5_2/SHScalc?lat=50.22&lon=-66.38&peakpower=400&batterysize=2400&cutoff=50&consumptionday=1000&angle=60&aspect=0&outputformat=json
```

Autres points de la côte, 60° : Baie-Comeau (49,22 N ; 68,15 O), Havre-Saint-Pierre (50,24 N ; 63,60 O).

---

## Résultats — Sept-Îles, production moyenne par jour, kWh par kW crête (pertes 14 % incluses)

| Mois | À plat (0°) | 35° | 40° (optimum annuel) | 45° | 60° | 75° | 90° (vertical) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Janv. | 0,68 | 1,47 | 1,54 | 1,60 | 1,72 | 1,73 | 1,65 |
| Févr. | 1,36 | 2,36 | 2,44 | 2,50 | 2,60 | 2,55 | 2,35 |
| Mars | 2,46 | 3,38 | 3,43 | 3,46 | 3,43 | 3,21 | 2,80 |
| Avr. | 3,57 | 4,10 | 4,08 | 4,05 | 3,79 | 3,34 | 2,69 |
| Mai | 4,23 | 4,32 | 4,25 | 4,15 | 3,73 | 3,12 | 2,35 |
| Juin | 4,37 | 4,24 | 4,14 | 4,02 | 3,54 | 2,88 | 2,11 |
| Juil. | 4,26 | 4,25 | 4,15 | 4,05 | 3,60 | 2,96 | 2,20 |
| Août | 3,52 | 3,82 | 3,78 | 3,72 | 3,43 | 2,95 | 2,31 |
| Sept. | 2,53 | 3,23 | 3,26 | 3,26 | 3,16 | 2,89 | 2,44 |
| Oct. | 1,49 | 2,34 | 2,40 | 2,44 | 2,49 | 2,40 | 2,17 |
| Nov. | 0,75 | 1,49 | 1,56 | 1,62 | 1,72 | 1,71 | 1,61 |
| **Déc.** | **0,47** | 1,12 | 1,19 | 1,24 | **1,34** | **1,36** | **1,31** |
| **Année (kWh/kWc)** | 906 | 1 099 | **1 103** | 1 099 | 1 051 | 946 | 789 |

## Rayonnement reçu par le panneau (« heures d'ensoleillement maximal », kWh/m²/jour) — Sept-Îles

| Inclinaison | Janv. | Févr. | Mars | Avr. | Mai | Juin | Juil. | Août | Sept. | Oct. | Nov. | Déc. |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0° | 0,87 | 1,63 | 2,87 | 4,22 | 5,13 | 5,45 | 5,40 | 4,45 | 3,17 | 1,90 | 1,00 | 0,65 |
| 60° | 1,88 | 2,88 | 3,91 | 4,50 | 4,57 | 4,47 | 4,61 | 4,37 | 3,92 | 2,99 | 2,00 | **1,49** |
| 75° | 1,89 | 2,82 | 3,66 | 3,97 | 3,85 | 3,69 | 3,84 | 3,79 | 3,59 | 2,88 | 1,99 | 1,51 |
| 90° | 1,80 | 2,60 | 3,21 | 3,25 | 2,99 | 2,80 | 2,95 | 3,04 | 3,07 | 2,61 | 1,87 | 1,45 |

Ces valeurs sont les « heures d'ensoleillement maximal » de la formule de dimensionnement de
Ressources naturelles Canada (`sources/18b-rncan-systemes-photovoltaiques-guide.md`).

## Décembre à 60°, le long de la côte (kWh/kWc/jour)

| Baie-Comeau | Sept-Îles | Havre-Saint-Pierre |
| --- | --- | --- |
| 1,05 | 1,34 | 1,70 |

## Analyse de la série horaire, Sept-Îles, 60°, 2005-2015 (script `analyse-pire-semaine.py`)

Somme des productions horaires par jour UTC (le jour solaire local tombe entier dans un jour UTC).

| Mesure | 60° | À plat |
| --- | --- | --- |
| Moyenne des 341 jours de décembre | 1,34 | 0,47 |
| Pire jour de décembre | 0,02 | 0,03 |
| Jours de décembre sous 0,5 kWh/kWc | 37 % | 55 % |
| Jours de décembre sous 0,25 kWh/kWc | 23 % | 24 % |
| **Pire suite de 7 jours (nov. à janv.), moyenne par jour** | **0,19** (à partir du 10 janv. 2006) | 0,18 |
| Pire suite de 3 jours | 0,07 (à partir du 14 déc. 2010) | 0,10 |
| Pire décembre entier (moyenne) | 0,84 (2005) | 0,41 |
| Température minimale de l'air dans la série (ERA5) | -31,3 °C | — |

## Calculateur hors réseau (400 W crête à 60°, 2 400 Wh de batterie, seuil de coupure 50 %, 1 000 Wh/jour demandés)

| Mois | Énergie livrée moyenne (Wh/j) | Jours où la batterie finit pleine | Jours où la batterie finit vide |
| --- | --- | --- | --- |
| Nov. | 525 | 6 % | 83 % |
| Déc. | 412 | 2 % | 90 % |
| Janv. | 487 | 7 % | 85 % |
| Juil. | 957 | 56 % | 14 % |

### Même système (400 W crête à 60°, 2 400 Wh, coupure à 50 %), quatre consommations — part des jours où la batterie finit vide

Requête identique avec `consumptionday=250`, `350`, `600`, `900` (fichiers
`sept-iles-hors-reseau-400W-2400Wh-<N>Wh-par-jour.json`).

| Demande | Janv. | Févr. | Mars | Avr. | Mai | Juin | Juil. | Août | Sept. | Oct. | Nov. | Déc. |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 250 Wh/j | 4 % | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 % | 1 % | 0 | 3 % |
| 350 Wh/j | 19 % | 3 % | 0 | 0 | 0 | 0 | 0 | 0 | 2 % | 2 % | 4 % | 23 % |
| 600 Wh/j | 53 % | 26 % | 9 % | 5 % | 1 % | 1 % | 2 % | 0 | 5 % | 24 % | 40 % | 64 % |
| 900 Wh/j | 81 % | 56 % | 36 % | 22 % | 16 % | 14 % | 10 % | 11 % | 26 % | 47 % | 76 % | **85 %** |

Le calculateur suppose un profil horaire de consommation par défaut et une batterie à
température constante ; il ne modélise ni le froid sur la batterie, ni la neige sur le panneau.

---

## Limites à connaître

- **PVGIS ne modélise pas la neige posée sur le panneau.** Un panneau enneigé produit zéro ; les
  chiffres supposent un panneau dégagé. L'écart entre 0° et 60° en décembre est donc un minimum :
  à plat, le panneau garde aussi sa neige.
- Les données viennent d'un point de grille, pas d'un chalet sous les arbres. L'ombre locale
  n'y est pas.
- La pire semaine est tirée de 11 hivers seulement. Un hiver plus sombre est possible.

## Chiffres retenus pour le chapitre 18b

| Chiffre | D'où |
| --- | --- |
| Décembre à 60° : 1,34 kWh/kWc/j ; à plat 0,47 ; vertical 1,31 | Tableau 1 |
| Annuel : 60° = 1 051, optimum 40° = 1 103, vertical = 789 kWh/kWc | Tableau 1 |
| Pire semaine : 0,19 kWh/kWc/j, soit environ le septième de la moyenne de décembre | Analyse horaire |
| 1,05 à 1,70 kWh/kWc/j en décembre selon le secteur de la côte | Tableau côte |
| 1,49 h d'ensoleillement maximal en décembre à 60° | Tableau 2 |
