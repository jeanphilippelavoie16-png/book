# Figaro — cellule de CO TGS5042 : ce que le gel fait à la cellule d'un avertisseur

- **Organisme :** Figaro Engineering Inc. (Japon) et Figaro USA, Inc. (Arlington Heights,
  Illinois) — **fabricant de cellules électrochimiques de CO** pour avertisseurs domestiques. Source
  de fabricant, pas une source officielle. Retenue parce qu'aucune page gouvernementale ni aucune
  notice d'avertisseur consultée ne dit ce que le gel fait à la cellule, et que c'est le fabricant de
  la cellule qui le sait.
- **Consultée le :** 24 septembre 2026
- **Sert au chapitre :** 16c — La tente d'hiver (§5, étape 3 du coucher, l'avertisseur de CO)

---

## 1. Fiche produit « TGS 5042 — for the detection of Carbon Monoxide »

- **URL :** https://www.figarosensor.com/product/docs/tgs5042_product%20infomation(fusa)_rev07.pdf
- **Version :** « tgs5042_product infomation(en)_rev07 » (métadonnées du PDF : 13 septembre 2021)
- **Copie enregistrée :** `sources/16c-figaro-tgs5042-fiche-produit-rev07.pdf` ; texte extrait
  avec `pdftotext` : `sources/16c-figaro-tgs5042-fiche-produit-texte.txt`

### Extraits intégraux

> « Applications: * Residential and commercial CO detectors * CO monitors for industrial
> applications * Ventilation control for indoor parking garages * Fire detection »

> « Figaro's TGS5042 is a battery operable electrochemical sensor […] operates in a range from -5°
> and +55°C »

> « Operating temperature(*2,*3) 0°C ~ +50°C (continuous) -5°C ~ +55°C (intermittent) »

> « Storage conditions (*2,*3) -5°C ~ +55°C »

> « (*2) If the water in the reservoir should freeze very rapidly (typically occurs only under
> artifically created conditions), irreversible change to sensor characteristics would occur. To
> avoid this risk, the sensor is recommended to be positioned with its cap (working electrode)
> facing up. »

> « (*3) Please contact Figaro for more information if the required temperature range would exceed
> the specified limits. »

## 2. « Application Notes for CO Detectors using TGS5042 »

- **URL de captation :** https://e2e.ti.com/cfs-file/__key/communityserver-discussions-components-files/14/tgs5042_5F00_application-note_2800_en_29005F00_rev03.pdf
  (copie hébergée sur le forum technique de Texas Instruments ; le document est celui du fabricant,
  en-tête « APPLICATION NOTES FOR TGS5042 », pages « Revised 07/15 »)
- **Copie enregistrée :** `sources/16c-figaro-tgs5042-notes-application-rev03.pdf` (18 pages) ; texte
  extrait : `sources/16c-figaro-tgs5042-notes-application-texte.txt`

### Extraits intégraux

> « 3-1 Position Dependency of the Sensor — TGS5042 has no position dependency in normal usage such
> as in residential CO detectors. However, for applications where ambient temperature can change
> drastically and suddenly to less than -20°C, it is recommended that the sensor should be placed
> in a vertical position with the working electrode upward. If the sensor is positioned
> horizontally or vertically with the working electrode down, the sensor may be structurally
> damaged by large volume expansion if water in the reservoir freezes. »

> « 5-6 Storage of Finished Products — Detectors should be stored in a clean air environment at
> room temperature. »

---

## Ce que le chapitre en tire

- **La cellule de certains avertisseurs domestiques contient une réserve d'eau.** Le fabricant de
  l'une des plus répandues ne la garantit ni en fonctionnement ni en entreposage **sous -5 °C**.
- **Si cette eau gèle, la cellule peut être abîmée pour de bon** (« irreversible change »,
  « structurally damaged »). Le fabricant ne dit nulle part qu'une cellule gelée redevient fiable
  une fois réchauffée.
- Rapproché de la fiche Kidde (`sources/15b-kidde-avertisseur-co-bouton-et-temperature.md`) : le
  bouton d'essai éprouve le circuit, la sirène et la pile, pas la cellule. **Un avertisseur dont la
  cellule a gelé peut donc passer l'essai du bouton et ne plus sentir le CO.**

## Limites

- Une seule marque de cellule. Rien ne dit quelle cellule est dans l'avertisseur du chalet : le
  chapitre écrit « certains avertisseurs », pas « tous ».
- Le fabricant dit que le gel **très rapide** est le cas qui abîme ; il ne chiffre pas la
  vitesse, et dit que la position de la cellule protège en partie. Dans un avertisseur fini, la
  position de la cellule n'est pas visible : le chapitre n'en fait pas une règle.
