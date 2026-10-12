# Transports Québec — Profondeur de gel et de dégel mesurée aux stations météoroutières (Côte-Nord)

- **Organisme :** Gouvernement du Québec, ministère des Transports et de la Mobilité durable
  (MTMD), jeu de données ouvert « Station météoroutière », diffusé sur Données Québec
- **URL du jeu de données :** https://www.donneesquebec.ca/recherche/dataset/d7941cb1-69a8-4e8e-a117-6c0fd12c2037
- **URL du fichier global (CSV) :** https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&request=getfeature&typename=ms:histo_stations_meteoroutieres_tous&outfile=StationMeteoroutiere&outputformat=csv
- **Consultée le :** 24 septembre 2026 (fichier à jour au 30 juin 2026 ; hivers 2008-2009 à
  2025-2026)
- **Fichiers enregistrés :**
  - `76-mtq-profondeur-gel-stations-cote-nord.csv` — toutes les lignes du fichier global pour les
    stations de la Côte-Nord (Port-Cartier, Longue-Rive, Manic-5, Natashquan,
    Rivière-Mouchalagane), sans aucune modification (13 221 lignes). Le fichier global complet
    (215 000 lignes, 17 Mo, toutes les stations du Québec) n'est pas recopié.
  - `76-mtq-profondeur-gel-description-jeu-de-donnees.json` — la description officielle du jeu de
    données (API de Données Québec)
  - `76-mtq-profondeur-gel-guide-utilisation-2018.pdf` — le guide d'utilisation du ministère
- **Sert dans :** chapitre 76 — Caveau à légumes, §5-A étape 2 (profondeur du plancher) et §9
  (« Laisser les racines où elles ont poussé ») ; utilisable aux ch. 10 (eau, tuyaux) et 77
- **Rang :** mesure officielle, sur place, depuis 2008. **Mais c'est le gel sous une chaussée
  déneigée**, pas sous un terrain couvert de neige : voir la dernière section.

---

## Extraits intégraux — description du jeu de données

> « Données de profondeur de gel et de dégel dans les chaussées des routes dont la gestion incombe
> au ministère des Transports et de la Mobilité durable (MTMD). »

> « Depuis la période hivernale 2008-2009, ces données sont calculées à l'aide des mesures de
> température enregistrées par les stations météoroutières réparties sur le réseau routier
> québécois. Ces stations sont notamment munies d'une sonde de 3,0 m de longueur permettant de
> mesurer la température moyenne horaire à différents niveaux dans la chaussée. Des valeurs
> moyennes de profondeur de gel et de dégel sont ensuite calculées sur une base quotidienne. Il
> faut considérer que les données sont propres à l'emplacement et à la date de la mesure
> uniquement. Toute interprétation de la continuité des mesures dans l'espace et dans le temps est
> laissée à l'appréciation de l'utilisateur. »

## Extraits intégraux — guide d'utilisation (mis à jour le 2018-05-31)

> « Les données sont uniquement présentées à l'intérieur d'une période hivernale. Les dates de
> début et de fin d'une période hivernale sont respectivement le 1er novembre et le 30 juin de
> l'année suivante »

> « La mention « ND » signifie une donnée manquante ou jugée non valide. »

## Les stations de la Côte-Nord (colonnes du fichier)

| Station | Latitude | Longitude | Altitude (m) |
| --- | --- | --- | --- |
| Longue-Rive | 48,49 | -69,28 | 26 |
| Port-Cartier | 49,68 | -67,17 | 6 |
| Manic-5 | 50,63 | -68,72 | 237 |
| Natashquan | 50,24 | -61,92 | 18 — aucune valeur valide dans le fichier |
| Rivière-Mouchalagane | 52,08 | -68,07 | 659 — trois hivers seulement, plus au nord que la Côte-Nord habitée |

## Calcul fait sur le fichier enregistré : profondeur de gel maximale de chaque hiver

Pour chaque station et chaque hiver (1er novembre au 30 juin), la plus grande valeur de la colonne
`prof_gel` (en m). Calcul refaisable sur le CSV enregistré.

| Hiver | Port-Cartier | Longue-Rive | Manic-5 |
| --- | --- | --- | --- |
| 2008-2009 | 1,57 | 1,79 | — |
| 2009-2010 | 1,16 | 1,44 | — |
| 2010-2011 | — | 1,74 | — |
| 2011-2012 | 1,47 | 1,74 | 2,88 |
| 2012-2013 | 1,40 | 1,78 | 2,97 |
| 2013-2014 | 1,81 | 1,96 | 2,90 |
| 2014-2015 | 1,79 | 2,03 | 3,00 |
| 2015-2016 | 1,42 | 1,82 | 2,97 |
| 2016-2017 | 1,50 | 1,83 | 2,93 |
| 2017-2018 | 1,58 | 1,94 | 2,93 |
| 2018-2019 | 1,65 | 2,08 | 2,91 |
| 2019-2020 | 1,50 | 1,72 | 3,00 |
| 2020-2021 | 1,20 | 1,58 | 2,70 |
| 2021-2022 | 1,59 | 1,93 | 3,00 |
| 2022-2023 | 1,39 | 1,63 | 2,92 |
| 2023-2024 | 1,22 | 1,48 | 2,60 |
| 2024-2025 | 1,30 | 1,75 | 2,68 |
| 2025-2026 | 1,41 | 1,73 | 3,00 |
| **Étendue** | **1,16 à 1,81** | **1,44 à 2,08** | **2,60 à 3,00** |

- À Manic-5, la valeur de 3,00 m est la longueur de la sonde : le gel a pu descendre plus bas ces
  hivers-là.
- **Quand le gel est au plus profond :** le maximum est atteint le plus souvent entre la mi-février
  et la fin de mars (dates relevées : du 15 février au 9 avril à Longue-Rive ; de la mi-février à
  la fin de mars à Manic-5 ; plusieurs hivers en avril, en mai ou au début de juin à Port-Cartier). Le premier gel entre dans
  la chaussée entre le 1er novembre et la fin de décembre.
- **Le dégel se fait par le haut, lentement** : à Port-Cartier en 2018-2019, le gel a atteint
  1,65 m le 23 avril, et le dégel parti de la surface n'était encore qu'à 1,48 m le 30 juin.

## Ce que la page ne dit pas, et ce qu'il faut en retenir

- **Ce sont des chaussées déneigées.** La neige, qui isole le sol partout ailleurs (« deep snow is
  an excellent insulator », fiche `20b-eau-sous-la-neige-des-lacs.md`), y est enlevée tout l'hiver.
  Ces valeurs sont donc le cas d'un sol découvert : un chemin, une cour ou une entrée qu'on
  déneige. Aucune valeur n'est publiée pour un sol laissé sous la neige.
- **Les valeurs sont propres à l'emplacement** (le ministère le dit lui-même) : elles situent
  l'ordre de grandeur de la région, elles ne remplacent pas le relevé au chalet.
- **Le bord du fleuve gèle moins creux que l'intérieur** : 1,2 à 2,1 m sur la côte (6 et 26 m
  d'altitude), 2,6 à 3 m et plus à Manic-5 (237 m d'altitude, loin dans les terres).
