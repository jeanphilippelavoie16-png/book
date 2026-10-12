# Tome 3 · Prélever — rapport d'assemblage

- **Produit le :** 2026-09-29 06:54, par `design/outils/assembler-tome.py 3`
- **Fichier :** `livre/tome-3/interieur.pdf` — 334 pages, 218.4 Mo
- **Ouvertures :** toujours au recto (page de droite), une page blanche devant au besoin
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-3.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1 | Page de titre | 1 |
| 3 | Sommaire | 1 |
| 5–17 | ch. 41 — Calendrier annuel de prélèvement | 13 |
| 19–31 | ch. 42 — Lire le territoire autour du chalet | 13 |
| 33–74 | ch. 43 — Les traces et les signes des animaux | 42 |
| 75–93 | ch. 44 — Pister et retracer une bête | 19 |
| 95–114 | ch. 45 — Les armes, les munitions et l’arc | 20 |
| 115–124 | ch. 46 — Comment lire une fiche d’espèce | 10 |
| 125–145 | ch. 47 — Chasser le petit gibier | 21 |
| 147–160 | ch. 48 — Lièvre d’Amérique | 14 |
| 161–172 | ch. 49 — Gélinotte huppée et tétras du Canada | 12 |
| 173–185 | ch. 50 — Castor | 13 |
| 187–198 | ch. 51 — Porc-épic | 12 |
| 199–209 | ch. 52 — Ours noir | 11 |
| 211–221 | ch. 53 — Rat musqué, écureuil roux, marmotte | 11 |
| 223–237 | ch. 54 — Outarde, canards, oiseaux d’eau | 15 |
| 239–254 | ch. 55 — Martre, vison, renard, lynx, loup | 16 |
| 255–269 | ch. 56 — Phoque du Saint-Laurent | 15 |
| 271–282 | ch. 57 — Truite et omble au lac | 12 |
| 283–300 | ch. 58 — Pêche blanche | 18 |
| 301–318 | ch. 59 — Éperlan et poisson du fleuve | 18 |
| 319–334 | ch. 60 — Nasses, filets, verveux | 16 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 11 |
| | **Total** | **334** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/credits/tome-3-credits.md` et `livre/credits/tome-3-credits.pdf`.

Les chapitres seuls font 321 pages ; 10 blanche(s) servent à faire ouvrir chaque chapitre à droite. Avec `--verso` (un chapitre peut ouvrir à gauche), le tome ferait 324 pages.

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 334 | oui |
| Page 1 | à droite | page de titre | oui |
| Polices incorporées | toutes | 56 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 218.4 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : Georgia, Georgia-Italic, IBMPlexSansCond-Bold, IBMPlexSansCond-Medium, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, IBMPlexSerif-SemiBoldItalic, NotoSansMath-Regular, NotoSansSymbols2-Regular, NotoSerif-Bold, Type 3 sans nom (texte des planches)

## Tranche et couverture

Calculateur de Blurb interrogé le 2026-09-29 06:54 pour **334 pages**, papier Standard, couverture **souple** (`softcover`), en pouces :

**Tranche : 0.75 x 10.25 po. PDF de couverture : 17.0 x 10.25 po.**

| Pages (ce PDF) | Pouces |
| --- | --- |
| Final, exported PDF should measure (w x h) | 8.125 x 10.25 |
| Page size / trim line (w x h) | 8.0 x 10.0 |
| Bleed (top, bottom, and outside edges) | 0.125 |
| Inset for Margins / Safe boundary (Top, Bottom, Outside Edge) | 0.25 |
| Inset for Margins / Safe boundary (Binding Edge) | 0.5 |

| Couverture | Pouces |
| --- | --- |
| Final, exported PDF should measure (w x h) | 17.0 x 10.25 |
| Total Page size / trim line (w x h) | 16.75 x 10.0 |
| Bleed (all edges) | 0.125 |
| Flaps (w x h, measured from trim edge to fold) | none |
| Gutter / Spine (w x h) | 0.75 x 10.25 |
| Inset for Margins / Safe boundary (from edge of trim) | 0.25 |

La tranche change par paliers avec le nombre de pages : la couverture se fait **après** le dernier assemblage, avec la mesure du jour.

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 41 | — | — | — | 5 (ancien 34) |
| 42 | 35-08b-barrage-castor.jpg (23), 35-08a-arbre-abattu-castor.jpg (23), 35-05-glace-noire-lac.jpg (24) | — | — | 7 (ancien 35) |
| 43 | 43-01b (36, pleine, à valider), 43-01a (37, pleine, à valider), 43-01e (40, pleine, à valider), 43-01d (41, pleine, à valider), 43-02a (43, pleine, à valider), 43-01c (44, pleine, à valider), 43-03 (53, pleine, à valider), 43-02b (54, pleine, à valider), 35c-08-caribou-crateres.jpg (38), 35c-07-caribou-empreinte.jpg (38), 35c-05-orignal-crottes.jpg (38), 35c-02-orignal-piste.jpg (38), 35c-01-orignal-empreinte.jpg (38), 35c-12-ours-crottes.jpg (39), 35c-09-ours-empreinte-avant.jpg (39), 35c-10-ours-empreinte-arriere.jpg (42), 35c-23-lynx-piste.jpg (45), 35c-22-lynx-empreinte.jpg (45), 35c-21-renard-plongeon.jpg (45), 35c-20-renard-piste.jpg (45), 35c-19-renard-empreinte.jpg (46), 35c-18-coyote-crottes.jpg (46), 35c-17-coyote-empreinte.jpg (46), 35c-16-loup-crottes.jpg (46), 35c-15-loup-piste.jpg (47), 35c-14-loup-empreinte.jpg (47), 35c-30-hermine-piste.jpg (49), 43-loutre-latrine-ecailles.jpg (49), 35c-29-loutre-latrine.jpg (49), 35c-28-loutre-glissade.jpg (49), 35c-27-loutre-empreinte.jpg (49), 35c-26-vison-empreinte.jpg (50), 35c-25-martre-piste.jpg (50), 35c-24-martre-empreinte.jpg (50), 43-pekan-piste-neige.jpg (51), 35c-52-canard-empreinte.jpg (52), 35c-51-outarde-empreinte.jpg (52), 35c-50-lagopede-empreinte.jpg (52), 35c-49-tetras-crottes.jpg (55), 35c-48-tetras-empreinte.jpg (55), 35c-47-gelinotte-crottes.jpg (55), 35c-46-gelinotte-trou-neige.jpg (55), 35c-45-gelinotte-empreinte.jpg (56), 35c-44-ecureuil-amas.jpg (56), 35c-43-ecureuil-piste.jpg (56), 35c-42-lievre-crottes.jpg (56), 35c-40-lievre-empreinte.jpg (57), 35c-39-porc-epic-crottes.jpg (57), 35c-37-porc-epic-piste.jpg (57), 35c-35-rat-musque-hutte.jpg (57), 35c-36-porc-epic-empreinte.jpg (58), 35c-34-rat-musque-empreinte.jpg (58), 43-castor-reserve-branches.jpg (58), 35c-33-castor-hutte.jpg (59), 35c-31-castor-empreinte.jpg (59), 43-pic-macule-puits-seve.jpg (61), 43-grand-pic-trous-rectangulaires.jpg (61), 35c-41-lievre-brout.jpg (61), 35c-38-porc-epic-ecorcage.jpg (62), 35c-32-castor-souche.jpg (62), 43-ours-poils-colles.jpg (63), 43-ours-arbre-frotte.jpg (63), 35c-13-ours-ecorcage.jpg (64), 35c-11-ours-griffades.jpg (64), 35c-06-orignal-frottis.jpg (65), 35c-04-orignal-ecorcage.jpg (65), 35c-03-orignal-brout.jpg (66) | — | — | 0 (ancien 35c) |
| 44 | 44-02 (90, pleine, à valider), 44-01 (91, pleine, à valider) | — | — | 0 (ancien 35d) |
| 45 | 45-01a (108, pleine, à valider), 45-01b (109, pleine, à valider), 45-02 (112, pleine, à valider) | — | — | 0 (ancien 35b) |
| 46 | — | — | — | 9 (ancien 43) |
| 47 | 47-05 (129, pleine, à valider), 47-02 (133, pleine, à valider), 47-03 (134, pleine, à valider), 47-01 (141, pleine, à valider), 47-04 (143, pleine, à valider) | — | — | 0 (ancien 43b) |
| 48 | 48-08 (158, pleine), 48-09 (157), 48-broutage-lievre-coupe.jpg (149), 48-broutage-lievre-neige.jpg (149), 44-01-rat-musque-rate-tularemie.png (151) | — | — | 6 (ancien 44) |
| 49 | 49-17 (171, pleine, à valider), 45-04c-gelinotte-huppee-usfws.jpg (162), 45-04b-tetras-canada-schmierer.jpg (163), 45-04a-gelinotte-tetras-fuertes-pl41.jpg (163), 45-09-jabot-poule-kaupp.jpg (164) | — | — | 11 (ancien 45) |
| 50 | 50-40 (177, pleine, à valider), 50-10 (183, pleine, à valider), 50-castor-entier.jpg (173), 46-02b-castor-glandes-femelle-morgan.jpg (175), 46-02a-castor-glandes-male-morgan.jpg (176) | — | — | 8 (ancien 46) |
| 51 | 51-40 (190, pleine, à valider), 51-piquant-pointe-barbelures.jpg (196) | — | — | 7 (ancien 47) |
| 52 | — | — | — | 7 (ancien 48) |
| 53 | 49-01-rat-musque-glande-musc-zhang.jpg (213), 44-01-rat-musque-rate-tularemie.png (214) | — | — | 5 (ancien 49) |
| 54 | 54-08 (235, pleine), 50-01h-grand-harle-fuertes-pl10.jpg (224), 50-01i-garrot-islande-hines.jpg (224), 50-01g-garrot-oeil-or-fuertes-pl18.jpg (225), 50-01f-macreuses-harelde-fuertes-pl20.jpg (225), 50-01e-eider-fuertes-pl19.jpg (225), 50-01d-sarcelle-fuertes-pl13.jpg (226), 50-01c-canard-noir-colvert-fuertes-pl12.jpg (226), 50-01b-oie-des-neiges-fuertes-pl21.jpg (226), 50-01a-outarde-fuertes-pl22.jpg (226) | — | — | 6 (ancien 50) |
| 55 | 55-03 (244, pleine), 55-40 (246, pleine, à valider), 55-08 (251, pleine), 55-loup-profil.jpg (241), 55-lynx-profil.jpg (241), 55-renard-profil.jpg (241), 55-vison-profil.jpg (241), 55-martre-profil.jpg (241) | — | — | 7 (ancien 51) |
| 56 | 56-09 (267, pleine), 56-02 (260), 52-01c-phoque-gris-tete-noaa.jpg (258), 52-01a-phoques-gris-commun-forillon.jpg (258) | — | — | 5 (ancien 52) |
| 57 | 57-08 (279, pleine), 53-01c-truite-arc-en-ciel-knepp.jpg (273), 53-01d-omble-chevalier-copeland.jpg (273), 53-01b-touladi-knepp.jpg (274), 53-01a-omble-fontaine-knepp.jpg (274) | — | — | 6 (ancien 53) |
| 58 | 58-10a (294, pleine, à valider), 58-10b (295, pleine, à valider), 58-09 (297, pleine), 58-07 (298) | — | — | 8 (ancien 54) |
| 59 | 59-03 (306, pleine), 59-08 (315, pleine), 59-09 (316, pleine, à valider), 59-batture-maree-basse.jpg (303), 55-01c-poulamon.jpg (304), 55-01b-eperlan.jpg (304), 55-01a-capelan.jpg (304) | — | — | 7 (ancien 55) |
| 60 | 60-01 (322, pleine), 60-40 (323, pleine, à valider), 60-08a (329, pleine), 60-08b (330, pleine), 60-10a (332, pleine, à valider), 60-10b (333, pleine, à valider) | — | — | 7 (ancien 56) |

**Photos sous 150 PPI à la taille imprimée :** 50-01i-garrot-islande-hines.jpg : 115 PPI

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/credits/tome-3-credits.md` et `livre/credits/tome-3-credits.pdf`.

| Page | Ch. | Fichier | Auteur | Licence |
| ---: | --- | --- | --- | --- |
| 23 | 42 | 35-08b-barrage-castor.jpg | Cantons-de-l'Est | CC BY-SA 4.0 |
| 23 | 42 | 35-08a-arbre-abattu-castor.jpg | Hans-Jürgen Hübner | CC BY 3.0 (ou GFDL) |
| 24 | 42 | 35-05-glace-noire-lac.jpg | TobiasGr | CC BY 3.0 (ou GFDL) |
| 38 | 43 | 35c-08-caribou-crateres.jpg | Bruce Bennett (brucebennett) | CC BY-NC [NC] |
| 38 | 43 | 35c-07-caribou-empreinte.jpg | NPS | Domaine public |
| 38 | 43 | 35c-05-orignal-crottes.jpg | Горбунова М.С. | CC BY-SA 4.0 |
| 38 | 43 | 35c-02-orignal-piste.jpg | Beeblebrox | CC BY-SA 3.0 |
| 38 | 43 | 35c-01-orignal-empreinte.jpg | peupleloup | CC BY-SA 2.0 |
| 39 | 43 | 35c-12-ours-crottes.jpg | USFWSmidwest | Domaine public |
| 39 | 43 | 35c-09-ours-empreinte-avant.jpg | ShenandoahNPS | Domaine public |
| 42 | 43 | 35c-10-ours-empreinte-arriere.jpg | minokawa | CC BY-NC [NC] |
| 45 | 43 | 35c-23-lynx-piste.jpg | Ryan Sealy (rsealy) | CC BY-NC [NC] |
| 45 | 43 | 35c-22-lynx-empreinte.jpg | Dan Serpiello (dserp) | CC BY-NC [NC] |
| 45 | 43 | 35c-21-renard-plongeon.jpg | Goutham89 | CC BY-SA 4.0 |
| 45 | 43 | 35c-20-renard-piste.jpg | Markus Trienke | CC BY-SA 2.0 |
| 46 | 43 | 35c-19-renard-empreinte.jpg | Garth Harwood (garth_harwood) | CC BY |
| 46 | 43 | 35c-18-coyote-crottes.jpg | Toronto Raptor (torontoraptor) | CC BY-NC [NC] |
| 46 | 43 | 35c-17-coyote-empreinte.jpg | steve b (stevestevens) | CC0 |
| 46 | 43 | 35c-16-loup-crottes.jpg | Jason Hollinger | CC BY 2.0 |
| 47 | 43 | 35c-15-loup-piste.jpg | Yellowstone National Park | Domaine public |
| 47 | 43 | 35c-14-loup-empreinte.jpg | Jakub Pełka (jakubpelka) | CC BY-NC [NC] |
| 49 | 43 | 35c-30-hermine-piste.jpg | U. S. Fish and Wildlife Service - Northeast Region | Domaine public |
| 49 | 43 | 43-loutre-latrine-ecailles.jpg | (c) Laurie DiCesare, some rights reserved (CC BY-NC) | CC BY-NC |
| 49 | 43 | 35c-29-loutre-latrine.jpg | Garth Harwood (garth_harwood) | CC BY |
| 49 | 43 | 35c-28-loutre-glissade.jpg | USFWS Mountain-Prairie | Domaine public |
| 49 | 43 | 35c-27-loutre-empreinte.jpg | USFWSAlaska | Domaine public |
| 50 | 43 | 35c-26-vison-empreinte.jpg | spider99 | CC BY-NC [NC] |
| 50 | 43 | 35c-25-martre-piste.jpg | Matthew Smith (flyersmith) | CC BY-NC [NC] |
| 50 | 43 | 35c-24-martre-empreinte.jpg | Cole Tomlinson (ctomlinson12) | CC BY-NC [NC] |
| 51 | 43 | 43-pekan-piste-neige.jpg | (c) Erin E., some rights reserved (CC BY) | CC BY |
| 52 | 43 | 35c-52-canard-empreinte.jpg | Jonathan Poppele (jonathanpoppele) | CC BY-NC [NC] |
| 52 | 43 | 35c-51-outarde-empreinte.jpg | Kirsten Welge (kirstenwelge) | CC BY-NC [NC] |
| 52 | 43 | 35c-50-lagopede-empreinte.jpg | Alexey V. Ivanov (wkent) | CC BY-NC [NC] |
| 55 | 43 | 35c-49-tetras-crottes.jpg | Gone But Not Forgotten - R.I.P (bert_raccoon) | CC BY-NC [NC] |
| 55 | 43 | 35c-48-tetras-empreinte.jpg | Gone But Not Forgotten - R.I.P (bert_raccoon) | CC BY-NC [NC] |
| 55 | 43 | 35c-47-gelinotte-crottes.jpg | Liam Ragan (liamragan) | CC BY-NC [NC] |
| 55 | 43 | 35c-46-gelinotte-trou-neige.jpg | Cephas | CC BY-SA 3.0 |
| 56 | 43 | 35c-45-gelinotte-empreinte.jpg | wpl500 | CC BY-NC [NC] |
| 56 | 43 | 35c-44-ecureuil-amas.jpg | Yellowstone National Park | Domaine public |
| 56 | 43 | 35c-43-ecureuil-piste.jpg | Séraphin Poudrier (seraphinpoudrier) | CC BY-NC [NC] |
| 56 | 43 | 35c-42-lievre-crottes.jpg | Kyle Jones (kylejones) | CC BY-NC [NC] |
| 57 | 43 | 35c-40-lievre-empreinte.jpg | USFWS Headquarters | Domaine public |
| 57 | 43 | 35c-39-porc-epic-crottes.jpg | Rob Speiden (speiden) | CC BY-NC [NC] |
| 57 | 43 | 35c-37-porc-epic-piste.jpg | Brad Von Blon (bobcatbrad) | CC BY-NC [NC] |
| 57 | 43 | 35c-35-rat-musque-hutte.jpg | Игорь Орлов | CC BY 3.0 |
| 58 | 43 | 35c-36-porc-epic-empreinte.jpg | Nick Kleinschmidt (nick2524) | CC BY |
| 58 | 43 | 35c-34-rat-musque-empreinte.jpg | Adam M. McCosham (amccosham) | CC BY-NC [NC] |
| 58 | 43 | 43-castor-reserve-branches.jpg | (c) Matt Wallace, some rights reserved (CC BY-NC) | CC BY-NC |
| 59 | 43 | 35c-33-castor-hutte.jpg | U.S. Fish and Wildlife Service - Midwest Region | Domaine public |
| 59 | 43 | 35c-31-castor-empreinte.jpg | Chandler Olson (chandlerolson) | CC BY-NC [NC] |
| 61 | 43 | 43-pic-macule-puits-seve.jpg | (c) dysmetria2, some rights reserved (CC BY-NC) | CC BY-NC |
| 61 | 43 | 43-grand-pic-trous-rectangulaires.jpg | (c) laura2ee, some rights reserved (CC BY-NC) | CC BY-NC |
| 61 | 43 | 35c-41-lievre-brout.jpg | Ryan Sealy (rsealy) | CC BY-NC [NC] |
| 62 | 43 | 35c-38-porc-epic-ecorcage.jpg | gdthiker | CC BY-NC [NC] |
| 62 | 43 | 35c-32-castor-souche.jpg | NPS Staff | Domaine public |
| 63 | 43 | 43-ours-poils-colles.jpg | (c) Jess, some rights reserved (CC BY-NC) | CC BY-NC |
| 63 | 43 | 43-ours-arbre-frotte.jpg | (c) woodhaunt, some rights reserved (CC BY-NC) | CC BY-NC |
| 64 | 43 | 35c-13-ours-ecorcage.jpg | Christopher J. Earle (chris_earle) | CC BY-NC [NC] |
| 64 | 43 | 35c-11-ours-griffades.jpg | ShenandoahNPS | Domaine public |
| 65 | 43 | 35c-06-orignal-frottis.jpg | Rob Routledge (rroutledge) | CC BY-NC [NC] |
| 65 | 43 | 35c-04-orignal-ecorcage.jpg | Cephas | CC BY-SA 3.0 |
| 66 | 43 | 35c-03-orignal-brout.jpg | jozien | CC BY-NC [NC] |
| 149 | 48 | 48-broutage-lievre-coupe.jpg | (c) Ryan Sealy, some rights reserved (CC BY-NC) | CC BY-NC |
| 149 | 48 | 48-broutage-lievre-neige.jpg | (c) birdguykai, some rights reserved (CC BY-NC) | CC BY-NC |
| 151 | 48 | 44-01-rat-musque-rate-tularemie.png | CDC / Dr. J.M. Clinton | Domaine public (crédit CDC demandé) |
| 162 | 49 | 45-04c-gelinotte-huppee-usfws.jpg | Courtney Celley, USFWS | Domaine public (œuvre fédérale) |
| 163 | 49 | 45-04b-tetras-canada-schmierer.jpg | Alan Schmierer | CC0 |
| 163 | 49 | 45-04a-gelinotte-tetras-fuertes-pl41.jpg | Louis Agassiz Fuertes, pour E. H. Eaton, 1910 (Commons : « Eaton, Elon Howard ») | Domaine public |
| 164 | 49 | 45-09-jabot-poule-kaupp.jpg | B. F. Kaupp | Domaine public (Internet Archive : NOT_IN_COPYRIGHT ; Commons : Public domain) |
| 173 | 50 | 50-castor-entier.jpg | Vlad Podvorny | CC BY 2.0 — Creative Commons Attribution 2.0 |
| 175 | 50 | 46-02b-castor-glandes-femelle-morgan.jpg | Lewis H. Morgan ; dessin de W. W. Ely | Domaine public (Internet Archive : NOT_IN_COPYRIGHT ; Commons : Public domain) |
| 176 | 50 | 46-02a-castor-glandes-male-morgan.jpg | Lewis H. Morgan ; dessin de W. W. Ely | Domaine public (Internet Archive : NOT_IN_COPYRIGHT ; Commons : Public domain) |
| 196 | 51 | 51-piquant-pointe-barbelures.jpg | (c) Scott Wagner, some rights reserved (CC BY-NC) | CC BY-NC |
| 213 | 53 | 49-01-rat-musque-glande-musc-zhang.jpg | Zhang F., Liu Q., Wang Z., Xie W., Sheng X., Zhang H., Yuan Z., Han Y., Weng Q. | CC BY 4.0 (figure de revue) |
| 214 | 53 | 44-01-rat-musque-rate-tularemie.png | CDC / Dr. J.M. Clinton | Domaine public (crédit CDC demandé) |
| 224 | 54 | 50-01h-grand-harle-fuertes-pl10.jpg | Fuertes, pour Eaton, 1910 | Domaine public |
| 224 | 54 | 50-01i-garrot-islande-hines.jpg | Bob Hines, USFWS, 1978 | Domaine public (Gutenberg : « Public domain in the USA ») |
| 225 | 54 | 50-01g-garrot-oeil-or-fuertes-pl18.jpg | Fuertes, pour Eaton, 1910 | Domaine public |
| 225 | 54 | 50-01f-macreuses-harelde-fuertes-pl20.jpg | Fuertes, pour Eaton, 1910 | Domaine public |
| 225 | 54 | 50-01e-eider-fuertes-pl19.jpg | Fuertes, pour Eaton, 1910 | Domaine public |
| 226 | 54 | 50-01d-sarcelle-fuertes-pl13.jpg | Fuertes, pour Eaton, 1910 | Domaine public |
| 226 | 54 | 50-01c-canard-noir-colvert-fuertes-pl12.jpg | Fuertes, pour Eaton, 1910 | Domaine public |
| 226 | 54 | 50-01b-oie-des-neiges-fuertes-pl21.jpg | Fuertes, pour Eaton, 1910 | Domaine public |
| 226 | 54 | 50-01a-outarde-fuertes-pl22.jpg | Fuertes, pour Eaton, 1910 | Domaine public |
| 241 | 55 | 55-loup-profil.jpg | Mariofan13 | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 241 | 55 | 55-lynx-profil.jpg | Keith Williams | CC BY 2.0 — Creative Commons Attribution 2.0 |
| 241 | 55 | 55-renard-profil.jpg | JannettevanderBoon | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 241 | 55 | 55-vison-profil.jpg | Brendan Lally | CC BY 2.0 — Creative Commons Attribution 2.0 |
| 241 | 55 | 55-martre-profil.jpg | USFWS Midwest Region | Public domain |
| 258 | 56 | 52-01c-phoque-gris-tete-noaa.jpg | Anne Smrcina, NOAA | Domaine public (œuvre fédérale) |
| 258 | 56 | 52-01a-phoques-gris-commun-forillon.jpg | Nanosanchez | CC BY-SA 4.0 |
| 273 | 57 | 53-01c-truite-arc-en-ciel-knepp.jpg | Timothy Knepp, USFWS | Domaine public (œuvre fédérale) |
| 273 | 57 | 53-01d-omble-chevalier-copeland.jpg | Alison Copeland | CC BY 4.0 |
| 274 | 57 | 53-01b-touladi-knepp.jpg | Timothy Knepp, USFWS | Domaine public (œuvre fédérale) |
| 274 | 57 | 53-01a-omble-fontaine-knepp.jpg | Timothy Knepp, USFWS | Domaine public (œuvre fédérale) |
| 303 | 59 | 59-batture-maree-basse.jpg | LeonardoDog | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 304 | 59 | 55-01c-poulamon.jpg | H. L. Todd | Public domain |
| 304 | 59 | 55-01b-eperlan.jpg | H. L. Todd | Public domain |
| 304 | 59 | 55-01a-capelan.jpg | H. L. Todd | Public domain |

Photos téléchargées pour ces chapitres et non posées (images de référence ou photos à placer) :

- ch. 42 (ancien 35) : `35c-01-orignal-empreinte.jpg`, `35c-02-orignal-piste.jpg`, `35c-03-orignal-brout.jpg`, `35c-04-orignal-ecorcage.jpg`, `35c-05-orignal-crottes.jpg`, `35c-06-orignal-frottis.jpg`, `35c-07-caribou-empreinte.jpg`, `35c-08-caribou-crateres.jpg`, `35c-09-ours-empreinte-avant.jpg`, `35c-10-ours-empreinte-arriere.jpg`, `35c-11-ours-griffades.jpg`, `35c-12-ours-crottes.jpg`, `35c-13-ours-ecorcage.jpg`, `35c-14-loup-empreinte.jpg`, `35c-15-loup-piste.jpg`, `35c-16-loup-crottes.jpg`, `35c-17-coyote-empreinte.jpg`, `35c-18-coyote-crottes.jpg`, `35c-19-renard-empreinte.jpg`, `35c-20-renard-piste.jpg`, `35c-21-renard-plongeon.jpg`, `35c-22-lynx-empreinte.jpg`, `35c-23-lynx-piste.jpg`, `35c-24-martre-empreinte.jpg`, `35c-25-martre-piste.jpg`, `35c-26-vison-empreinte.jpg`, `35c-27-loutre-empreinte.jpg`, `35c-28-loutre-glissade.jpg`, `35c-29-loutre-latrine.jpg`, `35c-30-hermine-piste.jpg`, `35c-31-castor-empreinte.jpg`, `35c-32-castor-souche.jpg`, `35c-33-castor-hutte.jpg`, `35c-34-rat-musque-empreinte.jpg`, `35c-35-rat-musque-hutte.jpg`, `35c-36-porc-epic-empreinte.jpg`, `35c-37-porc-epic-piste.jpg`, `35c-38-porc-epic-ecorcage.jpg`, `35c-39-porc-epic-crottes.jpg`, `35c-40-lievre-empreinte.jpg`, `35c-41-lievre-brout.jpg`, `35c-42-lievre-crottes.jpg`, `35c-43-ecureuil-piste.jpg`, `35c-44-ecureuil-amas.jpg`, `35c-45-gelinotte-empreinte.jpg`, `35c-46-gelinotte-trou-neige.jpg`, `35c-47-gelinotte-crottes.jpg`, `35c-48-tetras-empreinte.jpg`, `35c-49-tetras-crottes.jpg`, `35c-50-lagopede-empreinte.jpg`, `35c-51-outarde-empreinte.jpg`, `35c-52-canard-empreinte.jpg`
- ch. 46 (ancien 43) : `43-castor-reserve-branches.jpg`, `43-grand-pic-trous-rectangulaires.jpg`, `43-loutre-latrine-ecailles.jpg`, `43-ours-arbre-frotte.jpg`, `43-ours-poils-colles.jpg`, `43-pekan-piste-neige.jpg`, `43-pic-macule-puits-seve.jpg`, `43-renard-plongeon-trou.jpg`
- ch. 52 (ancien 48) : `48-broutage-lievre-coupe.jpg`, `48-broutage-lievre-neige.jpg`
- ch. 54 (ancien 50) : `50-castor-entier.jpg`
- ch. 55 (ancien 51) : `51-piquant-pointe-barbelures.jpg`, `51-porc-epic-ecorcage-pied-feuillu.jpg`
- ch. 56 (ancien 52) : `52-01b-phoque-commun-tete-epa.jpg`
- ch. 59 (ancien 55) : `55-loup-profil.jpg`, `55-lynx-profil.jpg`, `55-martre-profil.jpg`, `55-renard-profil.jpg`, `55-vison-profil.jpg`

## Avertissements

- ch. 44, paginateur : p44-11 : page à moitié vide
- ch. 48, paginateur : p48-8 : page à moitié vide
- ch. 55, paginateur : p55-10 : page à moitié vide
- ch. 58, paginateur : p58-8 : page à moitié vide
- ch. 60, paginateur : p60-8 : page à moitié vide

## À savoir avant de téléverser

- **Onglet de tranche.** Le numéro de chapitre de l'onglet (en haut, au bord extérieur) est imprimé à moins de 0,1 po du rognage, hors de la zone sûre de Blurb (0,25 po) ; la coupe varie de 1/16 po. L'onglet est fait pour déborder, mais le chiffre peut être entamé. À voir sur l'épreuve papier. Pour les chapitres à trois chiffres (100 à 112), le chiffre est à 12 pt au lieu de 15 (à 15 pt, « 102 » dépasse le rognage) : réglage de `couleur.css` depuis le 28 septembre 2026, le même dans les rendus de chapitre seuls.
- **Petit fond.** Le bloc de texte est à 0,5 po de la reliure : conforme au tableau du calculateur (0,5), pas au paragraphe de la même page (0,625). Le livre de 440 pages ouvre mal au centre : à juger sur épreuve.
- **Page du logo Blurb.** Blurb ajoute une page de logo à la fin, hors compte, sauf option payante.
- **Aperçus.** Les PNG de `apercus/` sont pris sur les pages HTML qui ont servi à l'impression, rognées à 8 × 10 po (sans fond perdu).
