# Source — Ressources naturelles Canada, « Congélateurs » (base de données sur la consommation d'énergie, appareils expédiés en 2019)

- **Organisme :** Ressources naturelles Canada (RNCan), Office de l'efficacité énergétique
- **URL :** https://oee.nrcan.gc.ca/publications/statistiques/afae/2019/congelateurs.cfm?wbdisable=true
- **Date de consultation :** 2026-09-23
- **Captation :** de première main, `WebFetch` et `curl`, page enregistrée :
  `sources/18b-rncan-congelateurs-cue-2019.html`
- **Sert au chapitre :** 18b (sections 3, 5.1, 5.5)

---

## Extraits intégraux

> « Au cours des 20 dernières années, la CUE annuelle moyenne par type de congélateur a fluctué
> entre 213 et 840 kWh/an, en fonction de la préférence des consommateurs pour un type de
> congélateur (coffre, vertical, compact). »

> « Les congélateurs-coffres (type 10 et 18) sont généralement plus efficaces sur le plan
> énergétique, car seule une petite quantité d'air froid s'échappe à l'ouverture du couvercle. »

> « l'air réfrigéré dans un congélateur vertical sort vers le bas lorsque la porte est ouverte. »

### Consommation unitaire d'énergie (CUE) annuelle moyenne, appareils expédiés

| Type | 2017 | 2019 |
| --- | --- | --- |
| Type 8 — vertical à dégivrage manuel | 309,6 kWh/an | 318,6 kWh/an |
| Type 9 — vertical à dégivrage automatique | 466,5 kWh/an | 467,4 kWh/an |
| **Type 10 — coffre** | 297,5 kWh/an | **287,6 kWh/an** |
| Type 18 — coffre compact | 212,6 kWh/an | 226,4 kWh/an |

## Chiffres retenus pour le chapitre 18b

| Chiffre | Calcul |
| --- | --- |
| **287,6 kWh/an** pour un congélateur coffre moyen (2019) | ÷ 365 = **0,79 kWh/jour** aux conditions de l'étiquette |
| Le coffre perd moins de froid à l'ouverture que le vertical | Section 3 et tableau Matériel |

La page ne donne ni la température ambiante de l'essai ni la puissance des compresseurs. La
température d'essai vient de `sources/18b-temperature-essai-et-consommation-congelateurs.md`.
