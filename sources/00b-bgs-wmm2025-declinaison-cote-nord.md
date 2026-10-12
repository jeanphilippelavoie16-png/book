# BGS — Déclinaison magnétique le long de la Côte-Nord (modèle magnétique mondial WMM-2025)

- **Organisme :** British Geological Survey (BGS), service web du modèle magnétique mondial
  (WMM), produit conjointement avec la NOAA (États-Unis)
- **URL du service :** https://geomag.bgs.ac.uk/web_service/GMModels/wmm/2025/
- **Requête type :** https://geomag.bgs.ac.uk/web_service/GMModels/wmm/2025/?latitude=49.22&longitude=-68.15&altitude=0&date=2026-09-24&format=json
- **Consultée le :** 24 septembre 2026 (captation par `curl`, réponses JSON)
- **Chapitre qui s'en sert :** 00b — Acheter par priorité, palier 2, section 2.F, ligne
  « Boussole à plaquette transparente, réglable en déclinaison » ; utile aussi aux ch. 18b et 35
- **Pourquoi pas la NOAA :** le calculateur de la NOAA (`sources/18b-noaa-declinaison-magnetique-sept-iles.md`,
  capté le 23 septembre) exige désormais une clé d'accès ; le calculateur de RNCan
  (`geomag.nrcan.gc.ca/calc/mdcal-en.php`) répond 404. Le BGS sert le même modèle sans clé. Pour
  Sept-Îles, les deux donnent la même valeur (-17,185°), ce qui recoupe la captation d'hier.

## Réponse intégrale, Baie-Comeau (49,22° N, 68,15° O), 24 septembre 2026

```
"model": "wmm", "model_revision": "2025", "date": "2026-09-24"
"latitude": 49.22, "longitude": -68.15, "altitude": 0.00 km
"total-intensity": 53704 nT
"declination": -16.467 deg (east)
"inclination": 70.809 deg (down)
"north-intensity": 16929 nT, "east-intensity": -5004 nT, "vertical-intensity": 50719 nT
"horizontal-intensity": 17654 nT
secular-variation "declination": 8.9 arcmin/y (east)
```

## Déclinaison, champs « declination » des réponses (négatif = ouest)

| Lieu | Lat. N | Long. O | Déclinaison au 24 sept. 2026 | Variation annuelle |
| --- | --- | --- | --- | --- |
| Forestville | 48,74 | 69,08 | **-16,07°** (16° O) | +8,3′ par an |
| Baie-Comeau | 49,22 | 68,15 | **-16,47°** (16,5° O) | +8,9′ par an |
| Sept-Îles | 50,22 | 66,38 | **-17,19°** (17° O) | +10,0′ par an |
| Havre-Saint-Pierre | 50,24 | 63,60 | **-17,61°** (17,5° O) | +10,7′ par an |
| Natashquan | 50,19 | 61,82 | **-17,73°** (17,5° O) | +11,0′ par an |

## Lecture

- Sur toute la Côte-Nord habitée, l'aiguille pointe **16 à 18° à l'ouest** du nord vrai.
- La déclinaison **diminue** d'environ **un sixième de degré par an** (8 à 11 minutes d'arc) :
  environ **1,5° en dix ans**. Une valeur écrite sur une carte se refait donc tous les quelques
  ans, pas une fois pour toutes.
- Une boussole non corrigée de 17° envoie à environ **300 m** de côté par kilomètre marché
  (tan 17° ≈ 0,31).
