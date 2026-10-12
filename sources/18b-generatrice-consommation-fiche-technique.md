# Source — Honda, fiche technique de la génératrice à onduleur EU2200i (consommation par plein, sortie 12 V)

- **Organisme :** American Honda Motor Co., salle de presse officielle (fabricant)
- **URL :** https://hondanews.com/en-US/power-equipment/releases/release-60f8b86b82a14607a3e13e208c572efc-honda-eu2200i-super-quiet-series-generator-technical-specifications
- **Date de consultation :** 2026-09-23
- **Captation :** `curl` avec agent de navigateur (le `WebFetch` a reçu un 403), page enregistrée :
  `sources/18b-honda-eu2200i-fiche.html`
- **Sert au chapitre :** 18b (sections 3, 5.5, 5.6, 9)

---

## Extraits intégraux (tableau de la fiche)

> « AC Output — 120V / 2200W max. (18.3A); 120 / 1800W rated (15A) »

> « DC Output — 12V, 100W (8.3A) »

> « Fuel Tank Capacity (gal / L) — 0.95 US gal / 3.6 L »

> « Run Time per Tankful — 3.2 hours @ rated load; 8.1 hours @ ¼ load »

> « Engine Speed — 4000 rpm – 4500 rpm (with Eco Throttle® switch off) »

---

## Calcul du rédacteur (arithmétique sur les chiffres de la fiche)

| Charge | Puissance | Consommation | Énergie par litre |
| --- | --- | --- | --- |
| Pleine charge nominale | 1 800 W | 3,6 L ÷ 3,2 h = **1,1 L/h** | 1,8 kWh ÷ 1,1 L = **1,6 kWh/L** |
| Quart de charge | 450 W | 3,6 L ÷ 8,1 h = **0,44 L/h** | 0,45 kWh ÷ 0,44 L = **1,0 kWh/L** |

**Ce qu'on en tire :** une génératrice rend plus de kilowattheures par litre quand elle est
chargée. Faire tourner une machine de 1 800 W pour un compresseur de congélateur seul, c'est
payer au moins le litre du quart de charge pour une fraction de l'énergie. La fiche ne donne
aucun chiffre sous le quart de charge : le chapitre n'en invente pas.

**Ce modèle n'est qu'un exemple.** Le chapitre ne le nomme pas ; il dit « une génératrice à
onduleur de 1 800 W nominaux » et renvoie le lecteur à la plaque et au manuel de sa propre
machine, qui donnent les mêmes deux chiffres (heures par plein à pleine charge et au quart).
