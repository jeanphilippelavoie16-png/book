# Source — Johnson Controls, bulletin technique du thermostat électronique A419 : écart (différentiel) réglable de 1 à 30 degrés, délai contre les redémarrages rapprochés

- **Organisme :** Johnson Controls (fabricant de commandes de réfrigération et de chauffage, gamme PENN)
- **Document :** *A419 Series Electronic Temperature Controls with NEMA 1 or NEMA 4X Watertight
  Enclosures*, catalogue LIT-1927385, publié le 13 novembre 2015
- **URL :** https://fwwebbimage.fwwebb.com/ProductInfo/CAT_PDF1927385.pdf (copie du bulletin du
  fabricant chez un distributeur ; le même bulletin est sur docs.johnsoncontrols.com)
- **Date de consultation :** 24 septembre 2026
- **Captation :** `curl`, HTTP 200, PDF enregistré : `sources/18b-johnson-controls-a419-thermostat.pdf` ;
  texte : `sources/18b-johnson-controls-a419-thermostat-texte.txt`
- **Sert au chapitre :** 18b (étape 11, le coffre en réfrigérateur sous thermostat extérieur).
  Recherche pour le `[À VÉRIFIER — écart du thermostat de JP]`.

---

## Extraits intégraux

> « The A419 Controls have heating and cooling modes, adjustable setpoint and differential, an
> adjustable anti-short cycle delay, and a temperature offset (setback) function. The setpoint
> range is -30 to 212°F (-34 to 100°C). »

> « 30° (F° or C°) temperature differential adjustment range allows precise (1F° or C°)
> temperature differential settings that are much tighter than electromechanical controls »

> « Adjustable Anti-Short Cycle Delay (0 to 12 minutes in 1-minute increments) ensures that the
> output relay remains off for a user-set time delay, and helps avoid hard starts, nuisance
> overload outages, and unnecessary equipment wear »

> « Typical applications include: • freezer control in convenience stores • reach-in coolers [...] »

> « Differential Range 1 to 30F° (1 to 30C°) »

---

## Ce que le chapitre en tire

- **Sourcé :** l'écart entre la coupure et la reprise d'un thermostat extérieur est propre à
  l'appareil ; sur un thermostat électronique courant, il se règle de 1 à 30 degrés, et les
  thermostats mécaniques l'ont plus large (« much tighter than electromechanical controls »).
- **Sourcé :** un délai réglable empêche le compresseur de repartir aussitôt arrêté, ce qui évite
  les démarrages durs et les déclenchements de surcharge.
- **Non sourcé, et propre à JP :** l'écart de son thermostat à lui. Il se lit sur l'appareil, ou
  se voit en une journée au min-max, comme le dit déjà le chapitre.
