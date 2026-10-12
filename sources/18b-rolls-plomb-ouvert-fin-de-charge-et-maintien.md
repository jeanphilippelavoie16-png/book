# Source — Rolls Battery, manuel d'utilisation : le courant de fin de charge (2 % de C20) et la tension de maintien qui tient le banc plein sans le surcharger

- **Organisme :** Rolls Battery Engineering (Surrette Battery Company, fabricant canadien de
  batteries au plomb ouvert à décharge profonde, Springhill, Nouvelle-Écosse)
- **Document :** *Battery User Manual — Recommended installation, charging and maintenance
  procedures for Rolls deep cycle Flooded, VRLA AGM & OPzV GEL batteries*, version 7.4, août 2024
- **URL :** https://www.rollsbattery.com/wp-content/uploads/2024/09/Rolls-Battery-User-Manual-V7.4-0824.pdf
- **Date de consultation :** 24 septembre 2026
- **Captation :** `curl`, HTTP 200, PDF enregistré : `sources/18b-rolls-manuel-batteries.pdf` ;
  texte : `sources/18b-rolls-manuel-batteries-texte.txt`
- **Sert au chapitre :** 18b (section 9 C, « La nuit, personne ne fait le régulateur »). Recherche
  pour le `[À VÉRIFIER — courant de surcharge qu'un banc au plomb ouvert tolère en continu]`.

---

## Extraits intégraux

### Le courant de fin de charge (p. 14)

> « As batteries near full capacity, charge current decreases. End Amps, Return Amps or Tail
> Current refers to the lowest output of current (Amps) flowing to the batteries as they have
> reached full capacity. [...] If the charge current drops, reaching the End Amps/Return Amps/Tail
> Current set point before the programmed Absorption time has completed, this will trigger the
> charger to shut off or switch to the Float voltage phase which holds the battery bank at 100%
> SOC. »

> « The recommended End Amps/Return Amps/Tail Current set point for Rolls Flooded models is 2% of
> the 20 Hr AH rating (C/20) of the battery bank. Typically, when current drops to the 2% set point
> for 1 hour, the battery bank has reached 100% SOC. »

### La tension de maintien (p. 15)

> « When the Absorption charge phase has completed and the batteries have reached 100% SOC, the
> charger will continue to output at a lower voltage setting known as Float. Float voltage
> maintains the battery bank at a constant 100% SOC until the charge output diminishes (Ex: solar)
> and/or a load is applied which begins to discharge the battery bank. [...] To prolong battery
> life, the Float settings on the power supply should be adjusted to the voltage indicated in
> Table 2 (a) & 2 (b) Flooded Charging Parameters. Higher or lower voltage settings may result in
> unnecessary overcharge or sulfation buildup. »

### L'hydrogène commence à la tension de maintien (p. 8)

> « any hydrogen gas generated during charging (produced as cell voltage reaches 2.25 VPC or
> above. Every effort should be made to avoid hydrogen accumulation »

**Concordance au dossier :** le fabricant Trojan donne la tension de maintien du plomb ouvert à
2,25 V par élément, **13,5 V pour 12 V, à 25 °C** (`sources/18b-trojan-entretien-batteries.md`,
et le guide d'utilisation, tableau 4 : « Float Charge (if desired 2.25 VPC) [...] 13.5 »).

---

## Ce que le chapitre en tire

- **Introuvable :** aucun fabricant consulté ne publie un **courant** de surcharge qu'un banc au
  plomb ouvert tolère en continu. Ce que les fabricants règlent pour le long terme, c'est une
  **tension** : la tension de maintien, 13,5 V en 12 V à 25 °C, qui garde le banc plein ; plus
  haut, c'est de la surcharge inutile, et le gaz commence à 2,25 V par élément.
- **Sourcé :** à la tension d'absorption, un banc plein ne prend plus qu'environ 2 % de sa capacité
  en ampères (un banc de 130 Ah : environ 2,6 A, calcul) ; ce courant tenu une heure dit que le
  banc est plein, pas qu'il peut le recevoir toute la nuit.
- **Conséquence pour la nuit du ruisseau (raisonnement de vérification) :** le « filet » se juge
  au voltmètre, banc plein et roue qui tourne : à la tension de maintien ou sous elle, le banc
  reçoit ce qu'il garde ; au-dessus, il bout, et la correction est celle que donne déjà le
  chapitre (une ampoule de plus, un peu moins d'eau à la buse).
