# USGS — Sublimation and the Water Cycle (Water Science School)

- **Organisme :** U.S. Geological Survey (USGS), agence fédérale américaine, Water Science School
- **Titre exact :** « Sublimation and the Water Cycle »
- **URL :** https://www.usgs.gov/water-science-school/science/sublimation-and-water-cycle
- **Consultée le :** 23 septembre 2026
- **Captation :** `curl` de la page HTML (le `WebFetch` a d'abord rendu une erreur 504 du
  serveur) ; passage extrait du texte intégral
- **Sert dans :** chapitre 60 — §5-D étape 23 (prévision de bois pour l'évaporation) ; utilisable
  partout où le livre chiffre l'énergie pour faire bouillir ou évaporer de l'eau (ch. 15, 73)

---

## Extrait intégral — section « Can't sublimate without the heat »

> « Water has a physical property called the "heat of vaporization," which is the amount of heat
> required to vaporize water. The heat of vaporization of water is 540 calories/gram, or 2,260
> kilojoules/kilogram. That is a lot more energy than is needed to convert water to ice (the latent
> heat of fusion), which is 80 calories/gram. It is also about five times the energy needed for
> heating water from the freezing point to the boiling point. […] A cubic centimeter (1 gram) of
> water in ice form requires 80 calories to melt, 100 calories to rise to boiling point, and another
> 540 calories to vaporize, a total of 720 calories. »

## Ce que le chapitre en tire

- **2 260 kJ/kg = 2,26 MJ par kilo d'eau évaporée.** La valeur que le chapitre donnait comme non
  sourcée (« environ 2,26 MJ/kg ») est confirmée telle quelle.
- **L'évaporation coûte cinq fois le chauffage de 0 à 100 °C.** C'est le chiffre qui dit pourquoi
  la cryoconcentration (qui n'évapore rien) passe avant le feu.

## Calculs faits pour le chapitre 60 (arithmétique sur des valeurs sourcées)

Masse de sève pour 1 kg de sirop = 0,669 ÷ teneur (0,669 kg de sucre par kg de sirop : fiche
`60-sante-canada-fcen-erable.md`). Eau à évaporer = masse de sève − 1 kg.

| Sève | Sève pour 1 kg de sirop | Eau évaporée | Énergie (× 2,26 MJ/kg) |
| --- | --- | --- | --- |
| 2 % (haut de l'érable rouge) | 33,5 kg | 32,5 kg | 73 MJ |
| 1,5 % (bas de l'érable rouge, haut du bouleau) | 44,6 kg | 43,6 kg | 99 MJ |
| 0,8 % (bas du bouleau) | 83,6 kg | 82,6 kg | 187 MJ |

Ces énergies sont un **plancher** : elles supposent que toute la chaleur du feu passe dans l'eau.
La conversion en bois se fait avec les rendements du chapitre 15, pas ici.
