# Source — Environnement et Changement climatique Canada, normales climatiques 1981-2010, SEPT-ILES A

- **Organisme :** Environnement et Changement climatique Canada (ECCC)
- **Station :** SEPT-ILES A, identifiant climatologique 7047910
- **URL :** https://climat.meteo.gc.ca/climate_normals/results_1981_2010_f.html?searchType=stnName&txtStationName=sept&searchMethod=contains&climate_id=7047910
- **Date de consultation :** 2026-09-23
- **Captation :** de première main, `curl`, page complète enregistrée :
  `sources/18b-eccc-normales-sept-iles-1981-2010.html` et sa version texte
  `sources/18b-eccc-normales-sept-iles-1981-2010-texte.txt`
- **Sert au chapitre :** 18b (sections 3, 5.2, 5.3, 9)

---

## Extraits intégraux (valeurs de la page, mois de janvier à décembre, puis l'année)

### Température

| | Janv. | Févr. | Mars | Avr. | Mai | Juin | Juil. | Août | Sept. | Oct. | Nov. | Déc. | Année |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Moyenne quotidienne (°C) | -15,3 | -13,6 | -6,8 | 0,2 | 6,2 | 11,8 | 15,2 | 14,4 | 9,8 | 3,7 | -2,9 | -10,5 | 1,0 |
| Maximum quotidien (°C) | -9,8 | -7,9 | -1,9 | 4,0 | 10,7 | 16,5 | 19,5 | 19,1 | 14,2 | 7,8 | 1,0 | -5,8 | 5,6 |
| Minimum quotidien (°C) | -20,8 | -19,3 | -11,7 | -3,7 | 1,7 | 7,0 | 10,8 | 9,8 | 5,3 | -0,4 | -6,7 | -15,3 | -3,6 |
| Minimum extrême (°C) | -43,3 | -38,3 | -31,7 | -26,4 | -11,7 | -2,8 | 1,7 | -0,6 | -6,5 | -12,8 | -28,9 | -36,5 | |
| Jours avec minimum < -20 °C | 17,8 | 14,8 | 4,9 | 0,10 | 0 | 0 | 0 | 0 | 0 | 0 | 0,43 | 9,3 | 47,3 |
| Jours avec minimum < -30 °C | 2,9 | 1,3 | 0,15 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0,71 | 5,0 |
| Jours avec maximum ≤ 0 °C | 29,2 | 25,6 | 18,9 | 3,8 | 0 | 0 | 0 | 0 | 0 | 0,25 | 11,9 | 25,7 | 115,2 |

### Neige au sol

| | Janv. | Févr. | Mars | Avr. | Nov. | Déc. |
| --- | --- | --- | --- | --- | --- | --- |
| Couverture de neige moyenne (cm) | 44 | 51 | 46 | 25 | 5 | 22 |
| Couverture de neige, fin de mois (cm) | 50 | 48 | 40 | 3 | 10 | 31 |

### Vent

| | Janv. | Févr. | Mars | Avr. | Mai | Juin | Juil. | Août | Sept. | Oct. | Nov. | Déc. | Année |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Vitesse horaire moyenne (km/h) | 15,1 | 15,0 | 15,9 | 16,3 | 14,2 | 14,1 | 12,1 | 11,5 | 12,4 | 13,6 | 14,5 | 15,3 | 14,2 |

### Insolation effective — extrême quotidien (heures)

| Janv. | Févr. | Mars | Avr. | Mai | Juin | Juil. | Août | Sept. | Oct. | Nov. | Déc. |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 8,4 | 10,3 | 11,9 | 13,8 | 14,9 | 15,8 | 15,4 | 14,6 | 13,2 | 10,5 | 9,0 | **8,1** |

---

## Notes de captation

- **La station est un aéroport**, dégagé, anémomètre en terrain ouvert. Un chalet en forêt a
  moins de vent que ça, et un peu plus de neige au sol. Le chapitre le dit.
- **L'extrême quotidien d'insolation de décembre, 8,1 h,** est le plus grand nombre d'heures de
  soleil franc jamais relevé en une journée de décembre à cette station. C'est une borne
  supérieure de la durée du jour utile, pas une durée du jour astronomique. Il appuie, sans le
  chiffrer exactement, le « 15 à 16 h de noirceur » du ch. 18 (son `[À VÉRIFIER]` n° 1).
- **Une remise non chauffée suit l'air du dehors avec retard.** Le chapitre se sert de la
  température moyenne quotidienne comme ordre de grandeur de la température d'une remise
  ombragée ; c'est une approximation du rédacteur, pas une donnée de la page.

## Chiffres retenus pour le chapitre 18b

| Chiffre | Usage |
| --- | --- |
| Moyennes mensuelles (nov. -2,9 ; déc. -10,5 ; janv. -15,3 °C) | Consommation du congélateur en remise, section 5.1 |
| Maximum quotidien moyen de janvier : -9,8 °C | La remise ne reste pas sous -18 °C le jour, section 5.2 |
| Minimum extrême : -43,3 °C (janvier) | Marge de gel des batteries, section 3 |
| Neige au sol moyenne en février : 51 cm | Hauteur du bord bas du panneau, section 5.3 |
| Vent moyen annuel : 14,2 km/h ; décembre 15,3 ; juillet 12,1 | Éolienne, section 9 |
| Insolation maximale en un jour de décembre : 8,1 h | Section 3 |
