# Tome 6 · L’atelier — rapport d'assemblage

- **Produit le :** 2026-09-29 06:53, par `design/outils/assembler-tome.py 6`
- **Fichier :** `livre/tome-6/interieur.pdf` — 200 pages, 33.5 Mo
- **Ouvertures :** toujours au recto (page de droite), une page blanche devant au besoin
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-6.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1 | Page de titre | 1 |
| 3 | Sommaire | 1 |
| 5–21 | ch. 102 — De la peau au cuir | 17 |
| 23–40 | ch. 103 — Babiche, tendons, cordage | 18 |
| 41–58 | ch. 104 — Coudre et chausser | 18 |
| 59–74 | ch. 105 — Affûter, limer, aiguiser | 16 |
| 75–90 | ch. 106 — Scie à chaîne et petits moteurs | 16 |
| 91–107 | ch. 107 — Souder, braser, réparer le métal | 17 |
| 109–122 | ch. 108 — Le stock de pièces et de consommables | 14 |
| 123–145 | ch. 109 — Leviers, poulies, treuils | 23 |
| 147–163 | ch. 110 — Assemblages bois-bois | 17 |
| 165–182 | ch. 111 — Trempe et travail du métal à chaud | 18 |
| 183–199 | ch. 112 — Savon et chandelles | 17 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 7 |
| | **Total** | **200** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/credits/tome-6-credits.md` et `livre/credits/tome-6-credits.pdf`.

Les chapitres seuls font 191 pages ; 5 blanche(s) servent à faire ouvrir chaque chapitre à droite. Avec `--verso` (un chapitre peut ouvrir à gauche), le tome ferait 194 pages.

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 200 | oui |
| Page 1 | à droite | page de titre | oui |
| Polices incorporées | toutes | 49 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 33.5 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : Georgia, Georgia-Italic, IBMPlexSansCond-Bold, IBMPlexSansCond-Medium, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, IBMPlexSerif-SemiBoldItalic, NotoSansSymbols2-Regular, NotoSerif-Regular, Type 3 sans nom (texte des planches)

## Tranche et couverture

Calculateur de Blurb interrogé le 2026-09-29 06:53 pour **200 pages**, papier Standard, couverture **souple** (`softcover`), en pouces :

**Tranche : 0.5 x 10.25 po. PDF de couverture : 16.75 x 10.25 po.**

| Pages (ce PDF) | Pouces |
| --- | --- |
| Final, exported PDF should measure (w x h) | 8.125 x 10.25 |
| Page size / trim line (w x h) | 8.0 x 10.0 |
| Bleed (top, bottom, and outside edges) | 0.125 |
| Inset for Margins / Safe boundary (Top, Bottom, Outside Edge) | 0.25 |
| Inset for Margins / Safe boundary (Binding Edge) | 0.5 |

| Couverture | Pouces |
| --- | --- |
| Final, exported PDF should measure (w x h) | 16.75 x 10.25 |
| Total Page size / trim line (w x h) | 16.5 x 10.0 |
| Bleed (all edges) | 0.125 |
| Flaps (w x h, measured from trim edge to fold) | none |
| Gutter / Spine (w x h) | 0.5 x 10.25 |
| Inset for Margins / Safe boundary (from edge of trim) | 0.25 |

La tranche change par paliers avec le nombre de pages : la couverture se fait **après** le dernier assemblage, avec la mesure du jour.

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 102 | 102-02 (9, pleine), 102-40 (13, pleine, à valider), 102-07 (20, pleine), 102-cuir-chamoise-non-fume.jpg (10), 102-cuir-tanne-vegetal.jpg (10) | — | — | 8 (ancien 79) |
| 103 | 103-40 (27, pleine, à valider), 103-05 (28, pleine), 103-10 (30, pleine), 103-07 (31, pleine), 103-11 (32, pleine) | — | — | 8 (ancien 80) |
| 104 | 104-02 (44, pleine), 104-40 (45, pleine, à valider), 104-04 (47, pleine), 104-15a (49, pleine, à valider), 104-15b (50, pleine, à valider) | — | — | 8 (ancien 81) |
| 105 | 105-40 (71, pleine, à valider), 105-01 (61), 105-07 (64), 105-03 (65) | — | — | 8 (ancien 82) |
| 106 | 106-10a (87, pleine, à valider), 106-10b (88, pleine, à valider), 106-01 (78), 83-09-carburateur-membranes-monte.jpg (80) | — | — | 8 (ancien 83) |
| 107 | 107-10 (106, pleine, à valider), 107-02 (94), 107-03 (97), 107-09 (103), 107-07 (104) | — | — | 7 (ancien 84) |
| 108 | 108-pile-gonflee.jpg (122) | — | — | 6 (ancien 85) |
| 109 | 109-40 (130, pleine, à valider), 109-02 (132, pleine), 109-08 (140, pleine), 109-12 (142, pleine), 109-01 (141), 109-cable-fils-casses.jpg (126), 109-cable-fils-casses-bout.jpg (126) | — | — | 7 (ancien 86) |
| 110 | 110-40 (150, pleine, à valider), 110-01a (152, pleine), 110-03 (154, pleine), 110-01b (161, pleine), 87-07b-bouleau-pourriture-brune.jpg (162), 87-07c-bouleau-pourriture-blanche.jpg (162), 87-07a-pourritures-brune-blanche.jpg (162) | — | — | 7 (ancien 87) |
| 111 | 111-40 (170, pleine, à valider), 111-11 (179, pleine), 88-06a-cassures-acier-1918.jpg (167), 111-revenu-bande.jpg (171), 111-revenu-etalons.jpg (171) | — | — | 9 (ancien 88) |
| 112 | 112-40 (189, pleine, à valider), 112-10a (196, pleine, à valider), 112-10b (197, pleine, à valider), 112-41 (186, à valider), 112-07 (190) | — | — | 9 (ancien 89) |

**Photos sous 150 PPI à la taille imprimée :** 87-07b-bouleau-pourriture-brune.jpg : 147 PPI; 87-07c-bouleau-pourriture-blanche.jpg : 147 PPI

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/credits/tome-6-credits.md` et `livre/credits/tome-6-credits.pdf`.

| Page | Ch. | Fichier | Auteur | Licence |
| ---: | --- | --- | --- | --- |
| 10 | 102 | 102-cuir-chamoise-non-fume.jpg | Johan | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 10 | 102 | 102-cuir-tanne-vegetal.jpg | Fujisun | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 80 | 106 | 83-09-carburateur-membranes-monte.jpg | Markus Säynevirta | CC BY-SA 3.0 |
| 122 | 108 | 108-pile-gonflee.jpg | Encik Tekateki | CC0 — Creative Commons Zero, Public Domain Dedication |
| 126 | 109 | 109-cable-fils-casses.jpg | Nationaal Archief | CC0 — Creative Commons Zero, Public Domain Dedication |
| 126 | 109 | 109-cable-fils-casses-bout.jpg | Flickr.com user "tanakawho" | CC BY 2.0 — Creative Commons Attribution 2.0 |
| 162 | 110 | 87-07b-bouleau-pourriture-brune.jpg | Sten Porse | CC BY-SA 3.0 |
| 162 | 110 | 87-07c-bouleau-pourriture-blanche.jpg | Sten Porse | CC BY-SA 3.0 |
| 162 | 110 | 87-07a-pourritures-brune-blanche.jpg | Mätes | CC BY-SA 3.0 |
| 167 | 111 | 88-06a-cassures-acier-1918.jpg | Carnegie Steel Company | No restrictions (1918) |
| 171 | 111 | 111-revenu-bande.jpg | Zaereth | CC0 — Creative Commons Zero, Public Domain Dedication |
| 171 | 111 | 111-revenu-etalons.jpg | Zaereth | CC0 — Creative Commons Zero, Public Domain Dedication |

Photos téléchargées pour ces chapitres et non posées (images de référence ou photos à placer) :

- ch. 103 (ancien 80) : `80-02a-orignal-silhouette.jpg`, `80-02b-orignal-profil.jpg`, `80-02c-orignal-squelette.jpg`, `80-02d-bovin-planche-muscles.jpg`, `80-choucroute-en-fermentation.jpg`, `80-choucroute-finie.jpg`, `80-choucroute-jour0-salage.jpg`, `80-choucroute-voile-levures.jpg`
- ch. 106 (ancien 83) : `83-chicot-pourri-carpophores.jpg`, `83-conduit-bouche-apres-feu.jpg`, `83-creosote-vitrifiee-conduit.jpg`, `83-creosote-vitrifiee-morceau.jpg`, `83-epinettes-mortes-sur-pied.jpg`, `83-suie-poudreuse.jpg`
- ch. 110 (ancien 87) : `87-07d-bois-sain-coupe.png`
- ch. 111 (ancien 88) : `88-06b-fissures-trempe-jauges-1925.jpg`, `88-ble-traite-rose-melange.jpg`, `88-ergot-dans-le-ble.jpg`, `88-ergot-epi-ble.jpg`, `88-grains-fusaries-temoin.png`

## Avertissements

- aucun

## À savoir avant de téléverser

- **Onglet de tranche.** Le numéro de chapitre de l'onglet (en haut, au bord extérieur) est imprimé à moins de 0,1 po du rognage, hors de la zone sûre de Blurb (0,25 po) ; la coupe varie de 1/16 po. L'onglet est fait pour déborder, mais le chiffre peut être entamé. À voir sur l'épreuve papier. Pour les chapitres à trois chiffres (100 à 112), le chiffre est à 12 pt au lieu de 15 (à 15 pt, « 102 » dépasse le rognage) : réglage de `couleur.css` depuis le 28 septembre 2026, le même dans les rendus de chapitre seuls.
- **Petit fond.** Le bloc de texte est à 0,5 po de la reliure : conforme au tableau du calculateur (0,5), pas au paragraphe de la même page (0,625). Le livre de 440 pages ouvre mal au centre : à juger sur épreuve.
- **Page du logo Blurb.** Blurb ajoute une page de logo à la fin, hors compte, sauf option payante.
- **Aperçus.** Les PNG de `apercus/` sont pris sur les pages HTML qui ont servi à l'impression, rognées à 8 × 10 po (sans fond perdu).
