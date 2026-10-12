# Rolls Battery — « Battery User Manual » : la batterie qui a gelé

- **Organisme :** Rolls Battery / Surrette Battery Company Ltd., fabricant canadien de batteries au
  plomb (Springhill, Nouvelle-Écosse)
- **Titre :** « Battery User Manual — Recommended installation, charging and maintenance procedures
  for Rolls deep cycle Flooded, VRLA AGM & OPzV GEL batteries », version 7.4, 08/24
- **URL :** https://www.rollsbattery.com/wp-content/uploads/2024/09/Rolls-Battery-User-Manual-V7.4-0824.pdf
- **Consultée le :** 24 septembre 2026, `curl`, HTTP 200
- **Captation :** PDF enregistré : `85-rolls-manuel-utilisateur-batteries.pdf` ; texte extrait
  (`pdftotext -layout`) : `85-rolls-manuel-utilisateur-batteries-texte.txt`
- **Sert au chapitre :** 85 (§5.2 ligne « Batteries au plomb du banc 12 V » ; §7 ligne « Boîtier de
  batterie au plomb bombé après un grand froid »)
- **Complète :** `85-rolls-batterie-plomb-entreposage-gel.md` (premier passage : températures de gel
  selon la densité)

---

## Extraits intégraux (anglais, tels qu'imprimés)

### Coffre de batteries, p. 11

> « Batteries will self-discharge when not in use which poses a risk of damage due to freezing in
> cold temperatures. If the enclosure will not be in a climatized space and the system operates in
> very cold temperatures, rigid foam insulation may be installed under the bottom of the enclosure
> and/or around the interior, as well as the space between the batteries to reduce the risk of
> freezing. Insulation should be removed in warmer months to prevent overheating. »

> « 4. SPILL CONTAINMENT: a spill-proof liner should be installed in the enclosure. This will
> contain any electrolyte overflows due to leaks from the batteries in the case of overfilling,
> puncture or cracked cases from freezing. »

### Entreposage (batteries à électrolyte liquide)

> « Stored Flooded batteries should be recharged every 3 months until the battery is put in service
> to avoid sulfation buildup and possible freezing in cold temperatures. »

> « Example: Electrolyte may freeze if the batteries become discharged to approximately 50% SOC at
> -20°C (-4°F). »

Tableau 5, « Specific Gravity vs Freezing » (colonnes décalées dans l'extraction, remises en
paires contre le PDF) : 1,280 → -69 °C ; 1,265 → -57,4 °C ; 1,250 → -52,2 °C ; 1,200 → -26,7 °C ;
1,150 → -15 °C ; 1,100 → -7 °C.

### Charge (AGM et GEL)

> « Never charge a frozen battery. Ideal charging temperatures: 0°C-40°C (32°F-104°F). »

### Dépannage, p. 49-50

> « Battery cases are bulging on the sides. […] Your batteries may have frozen due to excessive
> cold temperatures. A fully charged battery (specific gravity of 1.265) may freeze at -70°C
> (-94°F) or more. A battery at 50% SOC may freeze at -20°C (-4°F). »

> « Battery case has split or cracked originating from the sides. The battery may have frozen in
> the past, which has weakened the case structure. »

---

## Ce que le chapitre 85 en tire

- **Le gel abîme le boîtier :** il bombe, puis fend, parfois bien plus tard (« frozen in the past,
  which has weakened the case structure »), et l'acide coule.
- **Une batterie gelée ne se charge jamais tant qu'elle est gelée.**
- **Au froid, l'isolant autour du coffre** (mousse rigide dessous, autour et entre les batteries)
  réduit le risque de gel — à retirer l'été.
- **Écart interne à la source :** le dépannage donne « -70 °C » pour la densité 1,265, le tableau
  -57,4 °C (et -69 °C à 1,280). Le chapitre retient le tableau, plus prudent.

## Ce que la page NE dit PAS

- Elle ne dit pas en toutes lettres qu'une batterie qui a gelé « ne se répare pas ». Elle dit que le
  boîtier est affaibli et qu'il fend. Le chapitre doit dire ce mécanisme, pas plus.
