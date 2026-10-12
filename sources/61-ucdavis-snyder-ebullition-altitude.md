# Étalonnage d'un thermomètre à l'eau bouillante — effet de l'altitude et de la pression (deux documents)

- **Consultés le :** 23 septembre 2026
- **Sert au chapitre 61 pour :** §4 (ligne Eau glacée et eau bouillante) et §9 (Refaire l'échelle
  de température). Corrige les drapeaux 4 et 9 de `suivi/verifications/61-verifications.md`.

La page de l'USDA-FSIS sur la cuisson en altitude (qui donne le même ordre de grandeur) a
répondu **403** à la captation le 23 septembre 2026 ; elle n'est pas citée.

---

## 1. « Boiling Point / Atmospheric Pressure / Altitude Tables »

- **Auteur :** O. Peter Snyder, Jr., Ph. D., Hospitality Institute of Technology and Management
  (St. Paul, Minnesota)
- **Hébergé par :** University of California, Davis — UC Food Safety
- **URL :** https://ucfoodsafety.ucdavis.edu/sites/g/files/dgvnsk7366/files/inline-files/234958_1.pdf
- **Captation :** WebFetch, PDF de 97 Ko **enregistré en entier** à côté de cette fiche :
  `sources/61-ucdavis-snyder-ebullition-altitude.pdf`. Texte extrait avec `pdftotext`.

### Extraits intégraux

> « For example, at sea level, water boils at 212F. However, for every 500 feet above sea level,
> water boils about at 0.9F less. At 1,000 feet, then, water boils at about 210.2; at 2,000 feet,
> about 208.4; at 3,000 feet, about 206.6, etc. »

> « In addition to this correction factor, one must correct for barometric pressure. At a 0-feet
> altitude, if the barometric pressure is 29.921 inches of mercury, water boils at 212F. If the
> barometer is at 29.0, the water boils at 1.53F less than the 212F boiling point, with the
> altitude factor already considered. If the pressure is at 30.8 inches of mercury, one must allow
> for an increase in boiling of 1.43F. »

> « Water with ice cubes or larger chunks of ice will not be at 32F. It will be at 34 to 35F,
> probably. »

### Conversion faite pour le livre (arithmétique, pas une valeur de la source)

- 0,9 °F par 500 pi = **0,5 °C par 152 m**, soit **environ 1 °C par 300 m** d'altitude.
- 1,53 °F et 1,43 °F = **environ 0,8 °C** de part et d'autre de 100 °C selon la météo, au niveau
  de la mer.
- Donc : au bord du fleuve, l'eau bout à **100 °C à environ 1 °C près selon le temps qu'il
  fait** ; à 300 m, vers **99 °C** ; à 600 m, vers **98 °C**.

---

## 2. Penn State Extension — « Thermometer Use and Calibration »

- **Organisme :** Penn State Extension (Pennsylvania State University), présenté par Sharon
  McDonald, M. Ed., R.D., L.D.N.
- **URL :** https://extension.psu.edu/thermometer-use-and-calibration
- **Captation :** WebFetch (transcription de la capsule vidéo publiée sur la page)

### Extraits intégraux

> « Fill a large glass with crushed ice to the top and add water to fill the glass then stir to
> combine. »

> « Please note, elevation will affect the temperature at which water boils. As elevation
> increases, the boiling point of water decreases. »

---

## Ce que ces documents établissent pour le chapitre 61

Le deuxième point fixe **ne se perd pas** sur le plateau : il **se déplace**, d'une quantité
connue (environ 1 °C par 300 m), et la météo le bouge encore d'environ 1 °C. Il reste utilisable
en retranchant l'altitude ; il n'est simplement pas à 100 °C. Le point de glace, lui, ne dépend
pas de l'altitude, d'où l'intérêt de caler d'abord à 0 °C. Le document 1 confirme aussi,
en passant, la consigne de la §9 sur la glace fine : de gros morceaux donnent 1 à 2 °C de trop.
