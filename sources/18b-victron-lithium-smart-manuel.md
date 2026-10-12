# Source — Victron Energy, « Lithium Smart Battery Manual » (rev 21, 01/2026)

- **Organisme :** Victron Energy B.V. (fabricant)
- **URL :** https://www.victronenergy.com/upload/documents/Lithium_Battery_Smart/15958-Manual_Lithium_Smart_Battery-pdf-en.pdf
- **Date de consultation :** 2026-09-24
- **Captation :** `curl`, HTTP 200, PDF enregistré : `sources/18b-victron-lithium-smart-manuel.pdf`,
  texte extrait par `pdftotext -layout`
- **Sert au chapitre :** 18b (sections 2, 3, 5.4, 7, 9). Complète la fiche
  `sources/18b-victron-lithium-onduleur-cablage.md`, §1.

---

## Extraits intégraux

### La charge au froid : c'est le système de gestion qui protège, et son seuil se règle

> « 4.7.3. Allowed-To-Charge minimum temperature — This setting defines the lowest temperature at
> which the BMS allows battery charging. A lithium battery cell will sustain permanent damage when
> charged at temperatures below 5°C. The default value is 5°C and the range is -20°C to +20°C. »

> « The temperature range over which the battery can be charged is 5°C to 50°C. Charging the
> battery at temperatures outside this range may cause severe damage to the battery or reduce
> battery life expectancy. »

> « Use only with a Victron Energy-approved BMS. »

> « Overcharge or discharge will seriously damage a lithium battery and may render the battery
> unsafe for continued use. Therefore, the use of an external safety relay is mandatory. »

### Les gaz

> « If charged after the Lithium Battery was discharged below the "Discharge cut-off voltage", or
> when the Lithium Battery is damaged or overcharged, the Lithium Battery can release a harmful
> mixture of gasses such as phosphate. »

### Les bornes, les outils, les bijoux

> « The terminals of a lithium battery are always live, therefore, do not place metallic items or
> tools on top of the battery. »

> « Use insulated tools. »

> « Do not wear any metallic items such as watches, bracelets, etc. »

> « Insulated torque socket wrench M10 (electrical tape can be used to insulate the socket and
> part of the wrench) »

> « The electrical tape is a precaution to prevent a possible short circuit between the positive
> battery terminal and the negative busbar. »

---

## Ce que le chapitre en tire

- **Le refus de charge au froid n'est pas une propriété de la chimie** : c'est une coupure du
  système de gestion, et son seuil se règle (de -20 à +20 °C sur ce modèle, +5 °C par défaut).
  Une batterie sans cette coupure, ou réglée trop bas, prend la charge au froid et s'abîme pour de
  bon. Le seuil à retenir est celui de la batterie installée, lu sur sa fiche ou dans son réglage.
- Le lithium ne dégage pas de gaz en usage normal au sens où le manuel n'en nomme aucun ; il en
  dégage **abîmé, surchargé, ou chargé après une décharge trop profonde**. Le chapitre ne dit plus
  « ne dégage pas d'hydrogène ».
- Outils isolés, ruban sur le manche de la clé, aucune montre ni bracelet : même consigne chez le
  fabricant de plomb (`sources/18b-trojan-batteries-plomb-froid-et-charge.md`).

**Non retenu :** le mécanisme interne du dommage (dépôt de lithium métallique, court-circuit
interne) n'est pas dans ce manuel ; il n'est lu que sur des pages de distributeurs et de forums.
Le chapitre dit « s'abîme pour de bon » et s'arrête là.
