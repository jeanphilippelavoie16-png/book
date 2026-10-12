# Source — Trojan Battery Company, guide d'utilisation des batteries à décharge profonde, et livre blanc sur l'entreposage

- **Organisme :** Trojan Battery Company (fabricant de batteries au plomb à décharge profonde)
- **Documents :**
  1. *User's Guide* (32 pages), URL de captation :
     https://www.solaris-shop.com/content/Trojan%20Battery%20Users%20Manual.pdf — PDF enregistré :
     `sources/18b-trojan-guide-utilisateur.pdf`
  2. *Deep-Cycle Battery Storage* (livre blanc, 2 pages, © 2012), URL de captation :
     https://ressupply.com/documents/trojan_battery/Deep_Cycle_Battery_Storage_Guide.pdf — PDF
     enregistré : `sources/18b-trojan-entreposage-batteries.pdf`
- **Date de consultation :** 2026-09-23
- **Captation :** `curl`, texte extrait par `pdftotext`. Les deux PDF sont hébergés par des
  distributeurs, mais ce sont les documents du fabricant, non modifiés.
- **Sert au chapitre :** 18b (sections 3, 5.4, 6, 7, 8, 9)

---

## Extraits intégraux — le froid

> « The recommended operating temperature range is between -4 °F to 122 °F (-20 °C to +50 °C) »

> « When operating batteries at temperatures below 80 °F (27 °C), they will deliver less than
> the rated capacity. For example at 0 °F (-18 °C) the battery will deliver 50% of its capacity
> and at 80 °F (27 °C) it will deliver 100% of its capacity. »

> « Batteries can freeze in cold temperatures if they are not fully charged. If batteries are
> stored during cold winter months, it is critical that they are kept fully charged at all
> times. »

> « Freezing usually results in irreparable damage to the plates and containers. It is
> therefore imperative that batteries that are subjected to freezing temperatures be stored
> fully charged or at a high state of charge. »

### Tableau 1 du livre blanc — point de congélation de l'électrolyte selon l'état de charge (source citée : BCI Battery Service Manual, 1995)

| Densité | État de charge | Congélation (°F) | Congélation (°C, conversion du rédacteur) |
| --- | --- | --- | --- |
| 1,280 | 100 % | -92,0 | **-69** |
| 1,265 | 92 % | -71,3 | -57 |
| 1,250 | 85 % | -62,0 | **-52** |
| 1,200 | 62 % | -16,0 | **-27** |
| 1,150 | 40 % | +5,0 | **-15** |
| 1,100 | 20 % | +19,0 | **-7** |

### Tableau 2 du livre blanc — tension à vide et densité selon l'état de charge (plomb ouvert)

| État de charge | Densité (corrigée à 80 °F) | Tension à vide par élément | Batterie de 12 V (× 6, calcul du rédacteur) |
| --- | --- | --- | --- |
| 100 % | 1,277 | 2,122 V | **12,73 V** |
| 90 % | 1,258 | 2,103 V | 12,62 V |
| 80 % | 1,238 | 2,083 V | **12,50 V** |
| 70 % | 1,217 | 2,062 V | 12,37 V |
| 60 % | 1,195 | 2,040 V | 12,24 V |
| 50 % | 1,172 | 2,017 V | **12,10 V** |
| 40 % | 1,148 | 1,993 V | 11,96 V |
| 30 % | 1,124 | 1,969 V | 11,81 V |
| 20 % | 1,098 | 1,943 V | 11,66 V |
| 10 % | 1,073 | 1,918 V | 11,51 V |

> « Multiply by 3 for 6 volt batteries or 6 for 12 volt batteries to determine unit voltage. »

> « For accurate voltage readings, batteries must remain idle at least 6 hours, preferably up
> to 24 hours. »

> Livre blanc : recharger en entreposage « when the battery voltage drops below 12.4 volts for a
> 12 volt battery ».

### Autodécharge (figure 1 du livre blanc, T-105)

> « .0015 per week loss in S.G. @ 42 F » ; « .005 per week loss in S.G. @ 75 F » ;
> « .0075 per week loss in S.G. @ 86 F »

## Extraits intégraux — la charge

### Tableau 4 — plomb ouvert, réglages du chargeur à 25 °C, système de 12 V

| Étape | Tension |
| --- | --- |
| Bulk (2,47 V/élément) | 14,8 V |
| Absorption (2,35-2,45 V/élément) | **14,1 à 14,7 V** |
| Égalisation (2,70 V/élément) | 16,2 V |
| Maintien (2,25 V/élément) | 13,5 V |

Courant de charge recommandé, plomb ouvert : « 10-13% C20 ». AGM : « 20% C20 ».

### Compensation en température (AGM et gel ; le principe vaut pour le plomb ouvert)

> « 5.0 mV per cell / °C [...] add 0.005 volt per cell for every 1 °C below 25 °C »

Pour une batterie de 12 V (6 éléments) : **+0,03 V par degré sous 25 °C** (calcul du rédacteur).

### Consignes

> « Never charge a frozen battery »

> « Always use largest cable size of shortest length to minimize voltage drop »

> « Never place objects on top of batteries, which can cause a short circuit »

> « Deep-cycle flooded/wet lead acid batteries release small amounts of gas during usage,
> particularly during the charging process. Deep-cycle AGM and gel batteries do release gas, but
> at a much lower rate than the flooded types. It is critical to charge batteries in a properly
> ventilated area. »

> « Do not discharge your battery more than 80%. »

> Contrôle à la densité : « If every cell in the battery set is below 1.235, the batteries may
> be undercharged and require recharging. »

> « If any battery has a specific gravity variation of more than 0.030 between cells, equalize
> the set. » ; « If there is still a variation there may be a failed battery. »

> Égalisation, plomb ouvert seulement : « Equalize Charge (2.70 VPC) [...] 16.2 » (12 V) ;
> « Discontinue the equalization charge when the specific gravity no longer rises. » ;
> « Deep-cycle AGM or gel batteries should NEVER be equalized. »

> « Fill and drain the hydrometer 2 - 3 times before drawing a sample from the battery. »

> Encadré de sécurité du guide : « Always use insulated tools when working on batteries » ;
> « Never wear jewelry or other metal objects when working on or around batteries » ;
> « Always keep sparks and flames away from batteries ».

## Ajout du 2026-09-24 — le seuil de 85 % en tension et en densité (calcul du rédacteur)

Le tableau 1 donne la densité à 85 % : **1,250**. Le tableau 2 ne donne pas 85 % ; interpolation
linéaire entre 90 % (12,62 V) et 80 % (12,50 V) : **12,56 V** au repos pour une batterie de 12 V.
Même méthode à 62 % (entre 60 %, 12,24 V, et 70 %, 12,37 V) : **12,27 V**. Les tensions de 40 %
(11,96 V) et de 20 % (11,66 V) sont lues directement.

**La tension au repos ne vaut qu'après 6 h au moins sans charge ni décharge** (extrait ci-dessus,
repris sur la page d'entretien du fabricant, `sources/18b-trojan-entretien-batteries.md`). Le
chapitre fait lire la tension le matin, avant le soleil, onduleur et lumières éteints depuis le
coucher, et préfère le densimètre pour le plomb ouvert.

## Ajout du 2026-09-24 — la compensation en température du plomb ouvert

La page d'entretien du fabricant (`sources/18b-trojan-entretien-batteries.md`) donne la même
compensation, 0,005 V par élément et par degré, **pour tous les types, plomb ouvert compris**. Le
`[À VÉRIFIER]` de l'étape 24 est levé.

---

## Chiffres retenus pour le chapitre 18b

| Chiffre | Usage |
| --- | --- |
| **50 % de la capacité à -18 °C** | Section 3 |
| Plage d'utilisation -20 à +50 °C | Section 3 |
| Congélation : -52 °C à 85 %, -27 °C à 62 %, -15 °C à 40 %, -7 °C à 20 % | Sections 3, 6, 8 |
| Tension à vide : 12,73 V (100 %), 12,50 (80 %), 12,10 (50 %) | Section 6 |
| Absorption 14,1-14,7 V à 25 °C ; +0,03 V par degré sous 25 °C | Sections 5.4, 9 |
| Jamais charger une batterie gelée | Sections 7, 8 |
| Courant de charge 10-13 % de la capacité (plomb ouvert) | Section 5.5 |

**Ce que le fabricant ne donne pas :** la capacité sous -18 °C. Le chapitre dit « la moitié ou
moins » à -35 °C et ne chiffre pas plus bas.
