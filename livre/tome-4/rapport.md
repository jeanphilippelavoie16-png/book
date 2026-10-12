# Tome 4 · De la bête au garde-manger — rapport d'assemblage

- **Produit le :** 2026-09-29 10:58, par `design/outils/assembler-tome.py 4`
- **Fichier :** `livre/tome-4/interieur.pdf` — 298 pages, 72.3 Mo
- **Ouvertures :** toujours au recto (page de droite), une page blanche devant au besoin
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-4.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1 | Page de titre | 1 |
| 3 | Sommaire | 1 |
| 5–17 | ch. 61 — Abattage, saignée, éviscération | 13 |
| 19–44 | ch. 62 — Carte de la carcasse | 26 |
| 45–56 | ch. 63 — Quartier arrière | 12 |
| 57–68 | ch. 64 — Quartier avant | 12 |
| 69–80 | ch. 65 — Le dos | 12 |
| 81–89 | ch. 66 — Pourquoi la viande pourrit | 9 |
| 91–106 | ch. 67 — Le sel | 16 |
| 107–118 | ch. 68 — Salaison à sec | 12 |
| 119–130 | ch. 69 — Saumure | 12 |
| 131–146 | ch. 70 — Fumage à froid | 16 |
| 147–160 | ch. 71 — Fumage à chaud et séchage | 14 |
| 161–172 | ch. 72 — Pemmican et graisses | 12 |
| 173–186 | ch. 73 — Froid naturel | 14 |
| 187–202 | ch. 74 — Un congélateur plein qui dégèle | 16 |
| 203–218 | ch. 75 — Traiter le poisson à la sortie de l’eau | 16 |
| 219–234 | ch. 76 — Saler et sécher la truite | 16 |
| 235–246 | ch. 77 — Fumer le poisson | 12 |
| 247–260 | ch. 78 — Conserves et marinades | 14 |
| 261–276 | ch. 79 — Caveau à légumes | 16 |
| 277–291 | ch. 80 — Fermentation | 15 |
| 293–298 | ch. 81 — La table aliment → méthode | 6 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 5 |
| | **Total** | **298** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/credits/tome-4-credits.md` et `livre/credits/tome-4-credits.pdf`.

Les chapitres seuls font 291 pages ; 4 blanche(s) servent à faire ouvrir chaque chapitre à droite. Avec `--verso` (un chapitre peut ouvrir à gauche), le tome ferait 294 pages.

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 298 | oui |
| Page 1 | à droite | page de titre | oui |
| Polices incorporées | toutes | 62 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 72.3 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : Georgia, Georgia-Italic, IBMPlexSansCond-Bold, IBMPlexSansCond-Medium, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, IBMPlexSerif-SemiBoldItalic, NotoSansSymbols2-Regular, NotoSerif-Bold, NotoSerif-Regular, Type 3 sans nom (texte des planches)

## Tranche et couverture

Calculateur de Blurb interrogé le 2026-09-29 10:58 pour **298 pages**, papier Standard, couverture **souple** (`softcover`), en pouces :

**Tranche : 0.681 x 10.25 po. PDF de couverture : 16.931 x 10.25 po.**

| Pages (ce PDF) | Pouces |
| --- | --- |
| Final, exported PDF should measure (w x h) | 8.125 x 10.25 |
| Page size / trim line (w x h) | 8.0 x 10.0 |
| Bleed (top, bottom, and outside edges) | 0.125 |
| Inset for Margins / Safe boundary (Top, Bottom, Outside Edge) | 0.25 |
| Inset for Margins / Safe boundary (Binding Edge) | 0.5 |

| Couverture | Pouces |
| --- | --- |
| Final, exported PDF should measure (w x h) | 16.931 x 10.25 |
| Total Page size / trim line (w x h) | 16.681 x 10.0 |
| Bleed (all edges) | 0.125 |
| Flaps (w x h, measured from trim edge to fold) | none |
| Gutter / Spine (w x h) | 0.681 x 10.25 |
| Inset for Margins / Safe boundary (from edge of trim) | 0.25 |

La tranche change par paliers avec le nombre de pages : la couverture se fait **après** le dernier assemblage, avec la mesure du jour.

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 61 | 61-02 (8, pleine), 61-09 (15, pleine), 61-03 (16), 36-01-cerf-evisceration.jpg (9) | — | — | 6 (ancien 36) |
| 62 | 62-02 (22, pleine, à valider), 62-04 (23, pleine, à valider), 62-05 (24, pleine, à valider), 62-06 (25, pleine, à valider), 62-07 (26, pleine, à valider), 62-11 (29, pleine, à valider), 62-13 (30, pleine, à valider), 62-14 (31, pleine, à valider), 62-15 (33, pleine, à valider), 62-16 (34, pleine, à valider), 62-17 (35, pleine, à valider), 62-08 (21, à valider), 62-09 (27, à valider), 62-10 (28, à valider), 62-12 (32, à valider), 62-18 (36, à valider), 62-19 (37, à valider), 37-14-bavette-crue-grain.jpg (20) | — | — | 12 (ancien 37) |
| 63 | 38-09-brulure-congelation-boeuf.jpg (49) | — | — | 7 (ancien 38) |
| 64 | 64-40 (59, pleine, à valider), 64-08 (66, pleine, à valider) | — | — | 6 (ancien 39) |
| 65 | 65-09 (78, pleine) | — | — | 5 (ancien 40) |
| 66 | — | — | — | 7 (ancien 61) |
| 67 | 67-09 (100, pleine), 67-10 (101, pleine), 67-12 (103, pleine), 67-13 (104, pleine) | — | — | 8 (ancien 62) |
| 68 | 68-06 (116) | — | — | 7 (ancien 63) |
| 69 | 69-40 (129, pleine, à valider), 69-03 (128) | — | — | 7 (ancien 64) |
| 70 | 70-01 (134, pleine), 70-01b (141, pleine), 70-09 (142, pleine), 70-12 (145, pleine) | — | — | 9 (ancien 65) |
| 71 | 71-40 (151, pleine, à valider), 71-02 (157, pleine) | — | — | 8 (ancien 66) |
| 72 | 72-40 (164, pleine, à valider), 72-41 (166, pleine, à valider) | — | — | 8 (ancien 67) |
| 73 | 73-07 (178, pleine, à valider), 73-01 (183, pleine) | — | — | 6 (ancien 68) |
| 74 | 74-40 (198, pleine, à valider), 74-10 (199, pleine), 74-11 (202, pleine) | — | — | 9 (ancien 69) |
| 75 | 75-40 (206, pleine, à valider), 75-08 (216, pleine), 75-04 (207), 70-05a-branchies-brochet.jpg (205) | — | — | 6 (ancien 70) |
| 76 | 76-03 (222, pleine), 76-06 (225, pleine), 76-05 (224) | — | — | 8 (ancien 71) |
| 77 | — | — | — | 8 (ancien 72) |
| 78 | 78-40 (251, pleine, à valider) | — | — | 7 (ancien 73) |
| 79 | 79-01a (265, pleine), 79-01b (271, pleine), 79-40 (273, pleine, à valider), 79-06 (275, pleine) | — | — | 6 (ancien 76) |
| 80 | 80-40 (290, pleine, à valider), 80-choucroute-jour0-salage.jpg (279), 80-choucroute-en-fermentation.jpg (280), 80-choucroute-voile-levures.jpg (280) | — | — | 6 (ancien 77) |
| 81 | — | — | — | 0 (ancien 89b) |

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/credits/tome-4-credits.md` et `livre/credits/tome-4-credits.pdf`.

| Page | Ch. | Fichier | Auteur | Licence |
| ---: | --- | --- | --- | --- |
| 9 | 61 | 36-01-cerf-evisceration.jpg | MJCdetroit | CC BY-SA 3.0 (ou GFDL) |
| 20 | 62 | 37-14-bavette-crue-grain.jpg | Kittycataclysm | CC BY-SA 4.0 |
| 49 | 63 | 38-09-brulure-congelation-boeuf.jpg | RolloM | Domaine public (versé par l'auteur) |
| 205 | 75 | 70-05a-branchies-brochet.jpg | User:Uwe Gille | CC BY-SA 3.0 |
| 279 | 80 | 80-choucroute-jour0-salage.jpg | Simon Mannweiler | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 280 | 80 | 80-choucroute-en-fermentation.jpg | Simon Mannweiler | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 280 | 80 | 80-choucroute-voile-levures.jpg | Simon Mannweiler | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |

Photos téléchargées pour ces chapitres et non posées (images de référence ou photos à placer) :

- ch. 61 (ancien 36) : `36-07-projection-visceres-vache.jpg`
- ch. 62 (ancien 37) : `37-02-orignal-squelette.jpg`, `37-03-boeuf-muscles-superficiels-profil.jpg`, `37-04-boeuf-vues-caudales.jpg`, `37-05-ronde-interieure-boeuf.jpg`, `37-09-tarse-boeuf-gaines-synoviales.jpg`, `37-10-boeuf-squelette-profil.jpg`, `37-11-boeuf-vues-dorsales.jpg`, `37-13-filet-boeuf-parties.jpg`, `37-15-boeuf-vues-craniales.jpg`, `37-16-epaule-cervide-desossee.jpg`, `37-17-ligament-nuchal-boeuf.jpg`, `37-19-boeuf-membre-anterieur.jpg`
- ch. 63 (ancien 38) : `38-02-boeuf-membre-posterieur-vue-mediale.jpg`
- ch. 64 (ancien 39) : `39-01-usda-division-epaule.jpg`
- ch. 65 (ancien 40) : `40-02-paroi-thoracique-boeuf-coupe.jpg`
- ch. 75 (ancien 70) : `70-05b-oeil-saumon.jpg`, `70-05c-tetes-poisson.jpg`, `70-05d-branchies-planche-1910.jpg`

## Avertissements

- ch. 63, paginateur : p63-7 : page à moitié vide
- ch. 74, paginateur : p74-15 : page à moitié vide
- ch. 75, paginateur : p75-10 : page à moitié vide
- ch. 76, paginateur : p76-11 : page à moitié vide
- ch. 80, paginateur : p80-8 : page à moitié vide

## À savoir avant de téléverser

- **Onglet de tranche.** Le numéro de chapitre de l'onglet (en haut, au bord extérieur) est imprimé à moins de 0,1 po du rognage, hors de la zone sûre de Blurb (0,25 po) ; la coupe varie de 1/16 po. L'onglet est fait pour déborder, mais le chiffre peut être entamé. À voir sur l'épreuve papier. Pour les chapitres à trois chiffres (100 à 112), le chiffre est à 12 pt au lieu de 15 (à 15 pt, « 102 » dépasse le rognage) : réglage de `couleur.css` depuis le 28 septembre 2026, le même dans les rendus de chapitre seuls.
- **Petit fond.** Le bloc de texte est à 0,5 po de la reliure : conforme au tableau du calculateur (0,5), pas au paragraphe de la même page (0,625). Le livre de 440 pages ouvre mal au centre : à juger sur épreuve.
- **Page du logo Blurb.** Blurb ajoute une page de logo à la fin, hors compte, sauf option payante.
- **Aperçus.** Les PNG de `apercus/` sont pris sur les pages HTML qui ont servi à l'impression, rognées à 8 × 10 po (sans fond perdu).
