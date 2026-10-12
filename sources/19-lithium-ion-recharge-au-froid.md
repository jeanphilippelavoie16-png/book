# Lithium-ion : plage de température de recharge — fabricants (Garmin, Panasonic)

Trois documents de fabricant enregistrés ensemble : le manuel d'un appareil de messagerie
satellite courant, et deux fiches de la cellule lithium-ion la plus répandue (18650).

- **Sert dans :** chapitre 19 — Communiquer et savoir, §3 « Le froid attaque la communication par
  les piles » ; utilisable aux ch. 18 (batterie et panneau) et 20.
- **Consultée le :** 24 septembre 2026
- **Rang :** documentation de fabricant (appareil et cellule). Les deux fiches Panasonic sont
  hébergées par des revendeurs ; ce sont les documents du fabricant, reproduits tels quels.

---

## Source A — Garmin, *inReach Mini 2 Owner's Manual*

- **Organisme :** Garmin Ltd. (fabricant de l'appareil)
- **URL, « Specifications » :** https://www8.garmin.com/manuals/webhelp/GUID-802DEF62-EBB2-463C-8C51-C58FB29F89E3/EN-US/GUID-5D201E16-5AA1-4AB7-8BAA-9C5786B518FE.html
- **URL, « Charging the inReach Device » :** https://www8.garmin.com/manuals/webhelp/GUID-802DEF62-EBB2-463C-8C51-C58FB29F89E3/EN-US/GUID-DA5C22BF-7FF5-406B-B318-C0DFD61BE764.html
- **Fichiers enregistrés :** `19-garmin-inreach-mini2-specifications.html`,
  `19-garmin-inreach-mini2-recharge.html` (pages HTML complètes, version « v8 September 2026 »)

### Extraits intégraux — Specifications

> « Battery type — Rechargeable, built-in lithium-ion battery »
>
> « Battery capacity — 1,250 mAh »
>
> « Operating temperature range — From -20° to 60°C (from -4° to 140°F) »
>
> « Charging temperature range — From 0° to 45°C (from 32° to 113°F) »

### Extraits intégraux — Charging the inReach Device

> « NOTE: The device does not charge when it is outside the approved temperature range
> (Specifications). »

> « NOTICE: To prevent corrosion, thoroughly dry the USB port, the weather cap, and the surrounding
> area before charging or connecting to a computer. »

## Source B — Panasonic, fiche produit NCR-18650B

- **Organisme :** Panasonic (fabricant de la cellule)
- **URL :** https://baterie18650.pl/wp-content/uploads/2023/12/panasonic_ncr18650b.pdf
- **Fichier enregistré :** `19-panasonic-ncr18650b-fiche-produit.pdf`

### Extraits intégraux — tableau « Specifications »

> « Nominal Voltage 3.6V »
>
> « Ambient Temperature — Charge +10~+45 [°C] — Discharge -20~+60 [°C] — Storage -20~+50 [°C] »

(Le symbole « ~ » et l'unité « °C » tombent à l'extraction du texte ; la colonne est en degrés
Celsius, comme le reste de la fiche.)

## Source C — Panasonic (SANYO), *Specifications of Lithium Ion battery (Cylindrical Type)*, NCR18650B

- **Organisme :** Panasonic / SANYO (fabricant de la cellule), spécification pour assembleurs de
  blocs-piles
- **URL :** https://www.dnkpower.com/wp-content/uploads/2022/08/NCR18650B-datasheet.pdf
- **Fichier enregistré :** `19-panasonic-sanyo-ncr18650b-specifications.pdf`

### Extraits intégraux

> « (3) Charging Temperature Range — Charging temperature range is regulated between 0 and 40.
> Do not charge the battery out of the specified temperature range. Otherwise, it may cause heat
> generation, leakage or a serious damage. Also, it might cause deterioration of the battery's
> characteristics and battery life. »

> « The charging temperature range should be set between 0 to +40 . »
>
> « The discharge temperature should be between -20 to 60 . »

(Les unités °C tombent à l'extraction du texte.)

---

## Ce que le chapitre en tire

- **Seuil de recharge : 0 °C** pour l'appareil satellite courant et pour la cellule selon la
  spécification d'assemblage ; **+10 °C** selon la fiche produit de la même cellule. Aucune source
  ne permet la recharge sous le point de congélation.
- **L'appareil ne charge pas, sans rien dire de plus** hors de la plage (Garmin) : un appareil
  branché au froid reste vide.
- **Recharger hors plage abîme la cellule** : chaleur, fuite, « serious damage », durée de vie
  réduite (Panasonic/SANYO). Le mécanisme (dépôt de lithium métallique au froid) n'est pas dans
  ces fiches et n'est pas imprimé.
- **L'appareil satellite lui-même n'est donné que jusqu'à -20 °C** en fonctionnement : à -30 °C,
  il est hors de sa plage, pas seulement sa pile.
