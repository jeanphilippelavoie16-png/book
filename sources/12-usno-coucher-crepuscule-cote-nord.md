# USNO — Coucher du soleil et fin du crépuscule civil, Côte-Nord, décembre et janvier

- **Organisme :** United States Naval Observatory (USNO), Astronomical Applications Department
  (observatoire de la marine américaine, éphémérides officielles des États-Unis)
- **Service :** « Complete Sun and Moon Data for One Day », API `rstt/oneday`
- **URL type :** `https://aa.usno.navy.mil/api/rstt/oneday?date=AAAA-MM-JJ&coords=LAT,LON&tz=-5`
- **Date de consultation :** 18 octobre 2026 (vérification technique du ch. 12)
- **Captation :** de première main, `curl`, 30 réponses JSON complètes enregistrées ensemble dans
  `sources/12-usno-coucher-crepuscule-cote-nord-2026-10-18.json` (clé = lieu-date)
- **Heures :** heure normale de l'Est (UTC−5), sans heure avancée
- **Crépuscule civil :** le centre du soleil est à 6° sous l'horizon ; c'est la fin de la clarté où
  l'on voit encore à travailler dehors sans lampe (définition de l'USNO, champ « End Civil Twilight »)
- **Sert au chapitre :** 12 (pastille `{.orange 15 h 20}`, étape 89), vérification technique

Coordonnées utilisées : Sept-Îles 50,21 N, 66,38 O ; Baie-Comeau 49,22 N, 68,15 O ; Tadoussac
48,14 N, 69,72 O ; Havre-Saint-Pierre 50,24 N, 63,60 O ; Natashquan 50,19 N, 61,82 O ; Fermont
52,78 N, 67,09 O.

## Extraits (champs « Rise », « Set », « End Civil Twilight » des réponses)

| Lieu | Date | Lever | Coucher | Fin du crépuscule civil |
| --- | --- | --- | --- | --- |
| Tadoussac | 2026-12-11 | 07:19 | 15:45 | 16:21 |
| Tadoussac | 2026-12-21 | 07:27 | 15:48 | 16:24 |
| Tadoussac | 2027-01-31 | 07:08 | 16:37 | 17:10 |
| Baie-Comeau | 2026-12-11 | 07:18 | 15:34 | 16:11 |
| Baie-Comeau | 2026-12-21 | 07:25 | 15:37 | 16:14 |
| Baie-Comeau | 2027-01-31 | 07:05 | 16:27 | 17:02 |
| Sept-Îles | 2026-12-01 | 07:03 | 15:26 | 16:03 |
| Sept-Îles | 2026-12-11 | 07:15 | 15:23 | 16:01 |
| Sept-Îles | 2026-12-21 | 07:22 | 15:25 | 16:04 |
| Sept-Îles | 2027-01-15 | 07:19 | 15:51 | 16:28 |
| Sept-Îles | 2027-01-31 | 07:01 | 16:17 | 16:52 |
| Havre-Saint-Pierre | 2026-12-11 | 07:04 | 15:11 | 15:50 |
| Havre-Saint-Pierre | 2026-12-21 | 07:11 | 15:14 | 15:52 |
| Havre-Saint-Pierre | 2027-01-31 | 06:50 | 16:06 | 16:41 |
| Natashquan | 2026-12-11 | 06:57 | 15:04 | 15:43 |
| Natashquan | 2026-12-21 | 07:04 | 15:07 | 15:45 |
| Natashquan | 2027-01-31 | 06:43 | 15:59 | 16:34 |
| Fermont | 2026-12-11 | 07:30 | 15:13 | 15:54 |
| Fermont | 2026-12-21 | 07:38 | 15:15 | 15:57 |
| Fermont | 2027-01-31 | 07:13 | 16:11 | 16:49 |

(Les autres dates captées, 1er décembre et 15 janvier pour chaque lieu, sont dans le JSON.)

## Ce qu'on en tire (soustractions faites ici, pas des valeurs de la source)

- À Sept-Îles, l'USNO donne un coucher de 15 h 23 au plus tôt (11 décembre) et 16 h 17 le
  31 janvier : il concorde à 2 minutes près avec `16c-sept-iles-lever-coucher-soleil-hiver.md`
  (15 h 21 et 16 h 16).
- Sur la Côte-Nord, en décembre, le coucher va de 15 h 04 (Natashquan) à 15 h 45 (Tadoussac) :
  « 15 h 20 » est l'heure de Sept-Îles, pas celle de toute la côte (40 minutes d'écart d'un bout à
  l'autre).
- Le crépuscule civil dure de 36 à 41 minutes après le coucher en décembre (Sept-Îles : 38 à 39 min),
  et de 33 à 38 minutes à la fin de janvier.
- Jour le plus court à Sept-Îles : 07 h 22 à 15 h 25, soit 8 h 03.
