# USNO et NASA JPL — Combien de « mains » le soleil descend en une heure, à Sept-Îles

Deux sources officielles fédérales américaines, croisées par une soustraction. Aucune des deux ne
contient la règle « une main à l'heure » : la règle est **vérifiée** contre elles, pas tirée
d'elles.

---

## 1. U.S. Naval Observatory — hauteur du soleil, heure par heure

- **Organisme :** United States Naval Observatory (USNO), Astronomical Applications Department
  (observatoire de la marine américaine, qui calcule les éphémérides officielles des États-Unis)
- **Service :** « Altitude and Azimuth of the Sun or Moon During One Day »
- **URL type (une par date) :**
  `https://aa.usno.navy.mil/calculated/altaz?body=10&date=AAAA-MM-JJ&reps=145&intv_mag=10&intv_unit=1&lat=50.21&lon=-66.38&label=Sept-Iles&height=0&tz=5&tz_sign=-1&submit=Get+Data`
- **Lieu calculé :** Sept-Îles, « N 50° 13', W 66° 23' », altitude 0 ; heures en « Zone: 5.0 hours
  West of Greenwich »
- **Date de consultation :** 24 septembre 2026
- **Captation :** de première main, HTTP 200 ; les six tableaux sont enregistrés à côté de cette
  fiche : `35-usno-altitude-soleil-sept-iles-2026-03-20.html`, `…-06-21.html`, `…-09-22.html`,
  `…-10-15.html`, `…-11-15.html`, `…-12-21.html`

### Extraits intégraux — la dernière heure avant que le soleil touche l'horizon

Valeurs recopiées des tableaux (colonne « Altitude »), aux dix minutes :

| Date | Une heure avant | Au ras de l'horizon | Descente en 1 h |
| --- | --- | --- | --- |
| 20 mars 2026 | 16:30 « 10.2° » | 17:30 « 1.0° » | 9,2° |
| 21 juin 2026 | 18:30 « 8.6° » | 19:30 « 0.8° » | 7,8° |
| 22 septembre 2026 | 16:20 « 9.4° » | 17:20 « 0.2° » | 9,2° |
| 15 octobre 2026 | 15:30 « 8.9° » | 16:30 « 0.3° » | 8,6° |
| 15 novembre 2026 | 14:30 « 8.4° » | 15:30 « 1.0° » | 7,4° |
| 21 décembre 2026 | 14:20 « 6.8° » | 15:20 « 0.3° » | 6,5° |

(La colonne « Descente en 1 h » est une soustraction faite ici, pas une valeur du tableau.)

---

## 2. NASA JPL — la largeur des doigts à bout de bras

- **Organisme :** NASA, Jet Propulsion Laboratory — Night Sky Network
- **Titre :** « Measure the Night Sky » (daté du 1er décembre 2025 sur la page)
- **URL :** https://nightsky.jpl.nasa.gov/news-display.cfm?News_ID=966
- **Date de consultation :** 24 septembre 2026
- **Captation :** de première main, HTTP 200 ; page enregistrée :
  `35-nasa-jpl-mesurer-le-ciel-a-la-main.html`

### Extraits intégraux

> « Use a combination of your fingers held at arm's length, along with notable objects in the
> night sky, to make smaller measurements. A full Moon measures about half a degree in width - or
> 1/2 of your pinky finger, since each pinky measures 1 degree. »

> « The Dipper's "Pointer Stars," Dubhe and Merak, have 5.5 degrees between them - roughly three
> middle fingers wide. The entire asterism stretches 25 degrees from Dubhe to Alkaid - roughly the
> space between your outstretched thumb and pinky. »

---

## Le croisement

- Une **main** à bout de bras, quatre doigts serrés = trois doigts du milieu (≈ 5,5°) + le petit
  doigt (≈ 1°) ≈ **6,5°**. Addition faite ici.
- À Sept-Îles, la dernière heure avant le coucher, le soleil descend de **6,5° en décembre** à
  **9,2° aux équinoxes** (8,6° à la mi-octobre).
- Donc : **une main ≈ une heure en décembre** ; **une main ≈ trois quarts d'heure de la
  mi-septembre à la mi-octobre et en mars** (6,5 ÷ 9,2 ≈ 0,7 h ; 6,5 ÷ 8,6 ≈ 0,75 h) ; entre les
  deux en juin et en novembre (≈ 50 min).

## Ce que le chapitre 35 en tire

| Point | Statut |
| --- | --- |
| « Environ une main à l'heure » | **juste en décembre seulement** |
| En saison de chasse (septembre-octobre), la même règle promet **un quart de plus** de jour qu'il n'en reste | tiré du croisement |

## Limites

- Calcul fait pour Sept-Îles seulement. Plus au nord, le soleil descend plus lentement ; plus au
  sud, plus vite. Pour un chalet loin de Sept-Îles, refaire la requête avec ses coordonnées.
- La largeur des doigts varie d'une personne à l'autre ; la page de la NASA donne des valeurs
  moyennes. D'où l'intérêt d'étalonner sa propre main un soir clair.
