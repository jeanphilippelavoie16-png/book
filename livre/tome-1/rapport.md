# Tome 1 · Tenir — rapport d'assemblage

- **Produit le :** 2026-10-14 21:37, par `design/outils/assembler-tome.py 1 --hors-ligne`
- **Fichier :** `livre/tome-1/interieur.pdf` — 334 pages, 69.5 Mo
- **Ouvertures :** toujours au recto (page de droite), une page blanche devant au besoin
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-1.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1–26 | ch. 00 — Le chapitre principal | 26 |
| 27 | Page de titre | 1 |
| 29 | Dédicace | 1 |
| 31 | Sommaire | 1 |
| 33–65 | ch. 00b — Acheter par priorité | 33 |
| 67–78 | ch. 01 — Les quatre horloges | 12 |
| 79–90 | ch. 02 — Rester ou partir | 12 |
| 91–108 | ch. 03 — Panne majeure d’Hydro en janvier | 18 |
| 109–123 | ch. 04 — Retombées radioactives | 15 |
| 125–140 | ch. 05 — Le stock permanent du chalet | 16 |
| 141–154 | ch. 06 — La liste de 72 heures | 14 |
| 155–169 | ch. 07 — Quand on a un préavis | 15 |
| 171–183 | ch. 08 — Listes par scénario | 13 |
| 185–198 | ch. 09 — Ce qui manque toujours | 14 |
| 199–216 | ch. 10 — Eau : puiser, filtrer, désinfecter | 18 |
| 217–232 | ch. 11 — Le feu de forêt | 16 |
| 233–256 | ch. 12 — La tente d’hiver et l’abri de neige | 24 |
| 257–272 | ch. 13 — Feu sans allumettes | 16 |
| 273–284 | ch. 14 — Communiquer et savoir | 12 |
| 285–296 | ch. 15 — Se déplacer et le carburant | 12 |
| 297–309 | ch. 16 — Le voisinage et le groupe de chasse | 13 |
| 311–322 | ch. 17 — Qui cogne à la porte | 12 |
| 323–333 | ch. 18 — S’organiser à plusieurs familles | 11 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 9 |
| | **Total** | **334** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/credits/tome-1-credits.md` et `livre/credits/tome-1-credits.pdf`.

Les chapitres seuls font 322 pages ; 6 blanche(s) servent à faire ouvrir chaque chapitre à droite. Avec `--verso` (un chapitre peut ouvrir à gauche), le tome ferait 326 pages.

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 334 | oui |
| Page 1 | à droite | ouverture du chapitre 00 | oui |
| Polices incorporées | toutes | 65 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 69.5 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : IBMPlexSansCond-Bold, IBMPlexSansCond-Italic, IBMPlexSansCond-Medium, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, IBMPlexSerif-SemiBoldItalic, LiberationSerif, LiberationSerif-Italic, NotoSansSymbols2-Regular, NotoSerif-Bold, NotoSerif-Regular, Type 3 sans nom (texte des planches)

## Tranche et couverture

Calculateur non interrogé (--hors-ligne). Relevé du 27 septembre 2026 dans `sources/blurb-specifications.md` §2 ; pour 334 pages, prendre la ligne du tableau dont le palier couvre ce nombre, et revérifier au calculateur. [À VÉRIFIER]

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 00 | — | — | — | 0 (ancien 00) |
| 00b | — | — | — | 0 (ancien 00b) |
| 01 | — | — | — | 6 (ancien 01) |
| 02 | — | — | — | 6 (ancien 02) |
| 03 | 03-09 (100, pleine), 03-08 (103, pleine), 03-10 (104, pleine) | — | — | 7 (ancien 04) |
| 04 | 04-01a (119, pleine), 04-01b (120, pleine), 04-40 (123, pleine), 04-lichen-caribous-tapis.jpg (113) | — | — | 6 (ancien 06) |
| 05 | 05-boite-bombee.jpg (137) | — | — | 5 (ancien 08) |
| 06 | — | — | — | 5 (ancien 09) |
| 07 | — | — | — | 5 (ancien 10) |
| 08 | — | — | — | 6 (ancien 11) |
| 09 | 09-08 (197, pleine) | — | — | 7 (ancien 12) |
| 10 | 10-02 (212, pleine), 10-07 (214, pleine), 10-01 (211), 10-03 (215), 10-hutte-castor.jpg (201) | — | — | 6 (ancien 13) |
| 11 | 11-03 (231, pleine) | — | — | 0 (ancien 16b) |
| 12 | 12-01a (237, pleine), 12-01b (238, pleine), 12-02 (239, pleine), 12-03 (241, pleine), 12-04 (243, pleine), 12-06a (245, pleine), 12-05a (247, pleine), 12-05b (248, pleine), 12-06b (254, pleine) | — | — | 0 (ancien 16c) |
| 13 | 13-40 (260, pleine), 13-08 (266, pleine), 13-07 (269, pleine), 13-09 (270, pleine), 13-01 (272, pleine, à valider), 13-bouleau-ecorce-rubans.jpg (267), 13-gomme-epinette.jpg (267) | — | — | 6 (ancien 17) |
| 14 | 14-01 (282, pleine) | — | — | 7 (ancien 19) |
| 15 | 15-01 (290, pleine) | — | — | 8 (ancien 20) |
| 16 | 16-07 (306, pleine), 16-08 (308, pleine) | — | — | 7 (ancien 21) |
| 17 | 17-06 (320, pleine) | — | — | 6 (ancien 22) |
| 18 | — | — | — | 7 (ancien 23) |

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/credits/tome-1-credits.md` et `livre/credits/tome-1-credits.pdf`.

| Page | Ch. | Fichier | Auteur | Licence |
| ---: | --- | --- | --- | --- |
| 113 | 04 | 04-lichen-caribous-tapis.jpg | (c) mbrenner131, some rights reserved (CC BY-NC) | CC BY-NC |
| 137 | 05 | 05-boite-bombee.jpg | Kat1100 | CC BY 4.0 — Creative Commons Attribution 4.0 |
| 201 | 10 | 10-hutte-castor.jpg | U.S. Fish and Wildlife Service - Midwest Region | Public domain |
| 267 | 13 | 13-bouleau-ecorce-rubans.jpg | usfs_Eastern_Region | Public domain |
| 267 | 13 | 13-gomme-epinette.jpg | S. Rae from Scotland, UK | CC BY 2.0 — Creative Commons Attribution 2.0 |

Photos téléchargées pour ces chapitres et non posées (images de référence ou photos à placer) :

- ch. 03 (ancien 04) : `04-lichen-caribous-tapis.jpg`
- ch. 07 (ancien 10) : `10-barrage-castor.jpg`, `10-gros-bouillons.jpg`, `10-hutte-castor.jpg`, `10-trou-puisage-glace.jpg`
- ch. 10 (ancien 13) : `13-bouleau-ecorce-rubans.jpg`, `13-gomme-epinette.jpg`
- ch. 17 (ancien 22) : `22-poisson-foie-rogue-laitance.jpg`

## Avertissements

- ch. 01, paginateur : p01-8 : page à moitié vide
- ch. 04, paginateur : p04-7 : page à moitié vide
- ch. 05, paginateur : p05-11 : page à moitié vide
- ch. 09, paginateur : p09-8 : page à moitié vide
- ch. 13, paginateur : p13-7 : page à moitié vide
- ch. 14, paginateur : p14-6 : page à moitié vide

## À savoir avant de téléverser

- **Onglet de tranche.** Le numéro de chapitre de l'onglet (en haut, au bord extérieur) est imprimé à moins de 0,1 po du rognage, hors de la zone sûre de Blurb (0,25 po) ; la coupe varie de 1/16 po. L'onglet est fait pour déborder, mais le chiffre peut être entamé. À voir sur l'épreuve papier. Pour les chapitres à trois chiffres (100 à 112), le chiffre est à 12 pt au lieu de 15 (à 15 pt, « 102 » dépasse le rognage) : réglage de `couleur.css` depuis le 28 septembre 2026, le même dans les rendus de chapitre seuls.
- **Petit fond.** Le bloc de texte est à 0,5 po de la reliure : conforme au tableau du calculateur (0,5), pas au paragraphe de la même page (0,625). Le livre de 440 pages ouvre mal au centre : à juger sur épreuve.
- **Page du logo Blurb.** Blurb ajoute une page de logo à la fin, hors compte, sauf option payante.
- **Aperçus.** Les PNG de `apercus/` sont pris sur les pages HTML qui ont servi à l'impression, rognées à 8 × 10 po (sans fond perdu).
