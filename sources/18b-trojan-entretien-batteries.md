# Source — Trojan Battery Company, page « Battery Maintenance » (entretien, charge, compensation en température, égalisation)

- **Organisme :** Trojan Battery Company (fabricant de batteries au plomb à décharge profonde)
- **URL :** https://www.trojanbattery.com/resources/battery-maintenance
- **Date de consultation :** 2026-09-24
- **Captation :** `curl` avec agent de navigateur, HTTP 200, page complète enregistrée :
  `sources/18b-trojan-entretien-batteries.html`
- **Sert au chapitre :** 18b (étape 24, section 6, section 9 A). **Lève le `[À VÉRIFIER — valeur
  pour le plomb ouvert]` de l'étape 24.**

---

## Extraits intégraux

### La compensation en température — tous types, plomb ouvert compris

> « Correct the charging voltage to compensate for temperatures above or below 77°F (25°C).
> Subtract 0.0028 volt per cell for every 1°F (0.005 volt per cell for every 1°C) above 77°F
> (25°C) or add 0.0028 volt per cell for every 1°F (0.005 volt per cell for every 1°C) below
> 77°F (25°C). »

Tableau des réglages, lignes « Solar Premium and Signature » (plomb ouvert) :

> « Maximum Charge Current (% of C20) 13% » ; « Absorption Voltage (V/cell) 2.45 » ;
> « Equalization Voltage (V/cell) 2.70 » ; « Float Voltage (V/cell) 2.25 » ;
> « Temperature Compensation (V/cell) [...] Celsium: -5 mV x (Tbattery -25) »

### La lecture de la tension

> « For accurate voltage readings, batteries must remain idle (no charging, no discharging) for
> at least 6 hrs, preferably 24 hrs. »

### Le gel

> « Freezing results in irreparable damage to a battery's plates and container. »

> « The freezing temperature of the electrolyte in a fully charged battery is -92ºF (-69ºC). »

### L'égalisation (plomb ouvert seulement)

> « Trojan only recommends equalizing when low or wide ranging specific gravity (>0.030) are
> detected after fully charging a battery. »

> « Equalization is complete when specific gravity values no longer rise during the gassing
> stage. »

### La charge

> « Charge only in well-ventilated areas. Keep sparks or flames away from a charging battery. »

> « Do not charge a frozen battery. »

---

## Calcul du rédacteur

0,005 V par élément et par degré × 6 éléments = **0,03 V par degré sous 25 °C** pour une batterie
de 12 V, plomb ouvert compris.

| Température de la batterie | Écart à 25 °C | Hausse de la tension de charge (12 V) |
| --- | --- | --- |
| 0 °C | 25 | **+0,75 V** |
| -10 °C | 35 | **+1,05 V** |
| -20 °C | 45 | **+1,35 V** |

## Écart noté entre deux documents du même fabricant

La page donne un gel « approximately 16ºF (-9ºC) » à 40 % de charge ; le livre blanc
d'entreposage (`sources/18b-trojan-batteries-plomb-froid-et-charge.md`, tableau 1, qui cite le
manuel de la BCI) donne -15 °C à 40 %. **Le chapitre garde le tableau du livre blanc**, qui donne
toute la courbe avec les densités, et ne cite pas la valeur de la page. L'écart va dans le sens
de la prudence pour la page : à 40 %, une batterie gèle peut-être dès -9 °C. Le chapitre ne laisse
jamais le banc froid sous 85 %.
