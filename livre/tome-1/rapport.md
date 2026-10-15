# Tome 1 · Tenir — rapport d'assemblage

- **Produit le :** 2026-10-15 11:32, par `design/outils/assembler-tome.py 1 --hors-ligne`
- **Fichier :** `livre/tome-1/interieur.pdf` — 306 pages, 67.2 Mo
- **Ouvertures :** toujours au recto (page de droite), une page blanche devant au besoin
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-1.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1 | Dédicace | 1 |
| 3 | Page de titre | 1 |
| 5 | Sommaire | 1 |
| 7–39 | ch. 00b — Acheter par priorité | 33 |
| 41–52 | ch. 01 — Les quatre horloges | 12 |
| 53–64 | ch. 02 — Rester ou partir | 12 |
| 65–81 | ch. 03 — Panne majeure d’Hydro en janvier | 17 |
| 83–97 | ch. 04 — Retombées radioactives | 15 |
| 99–114 | ch. 05 — Le stock permanent du chalet | 16 |
| 115–128 | ch. 06 — La liste de 72 heures | 14 |
| 129–143 | ch. 07 — Quand on a un préavis | 15 |
| 145–157 | ch. 08 — Listes par scénario | 13 |
| 159–172 | ch. 09 — Ce qui manque toujours | 14 |
| 173–188 | ch. 10 — Eau : puiser, filtrer, désinfecter | 16 |
| 189–204 | ch. 11 — Le feu de forêt | 16 |
| 205–228 | ch. 12 — La tente d’hiver et l’abri de neige | 24 |
| 229–244 | ch. 13 — Feu sans allumettes | 16 |
| 245–256 | ch. 14 — Communiquer et savoir | 12 |
| 257–268 | ch. 15 — Se déplacer et le carburant | 12 |
| 269–281 | ch. 16 — Le voisinage et le groupe de chasse | 13 |
| 283–294 | ch. 17 — Qui cogne à la porte | 12 |
| 295–305 | ch. 18 — S’organiser à plusieurs familles | 11 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 10 |
| | **Total** | **306** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/credits/tome-1-credits.md` et `livre/credits/tome-1-credits.pdf`.

Les chapitres seuls font 293 pages ; 7 blanche(s) servent à faire ouvrir chaque chapitre à droite. Avec `--verso` (un chapitre peut ouvrir à gauche), le tome ferait 296 pages.

## Premières minutes (série orange)

Marqueur `{.orange}` sur l'intertitre ### de la série, dans le Markdown (CLAUDE.md, « Les premières minutes, en orange ») : encadré orange, repère orange sur la tranche, colonne orange au sommaire.

| Ch. | Pages du tome |
| --- | --- |
| 01 | 43, 44, 45 |
| 03 | 66, 67 |

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 306 | oui |
| Page 1 | à droite | ouverture du chapitre 00 | oui |
| Polices incorporées | toutes | 58 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 67.2 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : IBMPlexSansCond-Bold, IBMPlexSansCond-Italic, IBMPlexSansCond-Medium, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, IBMPlexSerif-SemiBoldItalic, LiberationSerif, LiberationSerif-Italic, NotoSansSymbols2-Regular, NotoSerif-Bold, NotoSerif-Regular, Type 3 sans nom (texte des planches)

## Tranche et couverture

Calculateur non interrogé (--hors-ligne). Relevé du 27 septembre 2026 dans `sources/blurb-specifications.md` §2 ; pour 306 pages, prendre la ligne du tableau dont le palier couvre ce nombre, et revérifier au calculateur. [À VÉRIFIER]

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 00b | — | — | — | 0 (ancien 00b) |
| 01 | — | — | — | 6 (ancien 01) |
| 02 | — | — | — | 6 (ancien 02) |
| 03 | 03-09 (74, pleine), 03-08 (76, pleine), 03-10 (78, pleine) | — | — | 7 (ancien 04) |
| 04 | 04-01a (93, pleine), 04-01b (94, pleine), 04-40 (97, pleine), 04-lichen-caribous-tapis.jpg (87) | — | — | 6 (ancien 06) |
| 05 | 05-boite-bombee.jpg (111) | — | — | 5 (ancien 08) |
| 06 | — | — | — | 5 (ancien 09) |
| 07 | — | — | — | 5 (ancien 10) |
| 08 | — | — | — | 6 (ancien 11) |
| 09 | 09-08 (171, pleine) | — | — | 7 (ancien 12) |
| 10 | 10-02 (185, pleine), 10-07 (187, pleine), 10-01 (183), 10-03 (186), 10-hutte-castor.jpg (175) | — | — | 6 (ancien 13) |
| 11 | 11-03 (203, pleine) | — | — | 0 (ancien 16b) |
| 12 | 12-01a (209, pleine), 12-01b (210, pleine), 12-02 (211, pleine), 12-03 (213, pleine), 12-04 (215, pleine), 12-06a (217, pleine), 12-05a (219, pleine), 12-05b (220, pleine), 12-06b (226, pleine) | — | — | 0 (ancien 16c) |
| 13 | 13-40 (232, pleine), 13-08 (238, pleine), 13-07 (241, pleine), 13-09 (242, pleine), 13-01 (244, pleine), 13-bouleau-ecorce-rubans.jpg (239), 13-gomme-epinette.jpg (239) | — | — | 6 (ancien 17) |
| 14 | 14-01 (254, pleine) | — | — | 7 (ancien 19) |
| 15 | 15-01 (262, pleine) | — | — | 8 (ancien 20) |
| 16 | 16-07 (278, pleine), 16-08 (280, pleine) | — | — | 7 (ancien 21) |
| 17 | 17-06 (292, pleine) | — | — | 6 (ancien 22) |
| 18 | — | — | — | 7 (ancien 23) |

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/credits/tome-1-credits.md` et `livre/credits/tome-1-credits.pdf`.

| Page | Ch. | Fichier | Auteur | Licence |
| ---: | --- | --- | --- | --- |
| 87 | 04 | 04-lichen-caribous-tapis.jpg | (c) mbrenner131, some rights reserved (CC BY-NC) | CC BY-NC |
| 111 | 05 | 05-boite-bombee.jpg | Kat1100 | CC BY 4.0 — Creative Commons Attribution 4.0 |
| 175 | 10 | 10-hutte-castor.jpg | U.S. Fish and Wildlife Service - Midwest Region | Public domain |
| 239 | 13 | 13-bouleau-ecorce-rubans.jpg | usfs_Eastern_Region | Public domain |
| 239 | 13 | 13-gomme-epinette.jpg | S. Rae from Scotland, UK | CC BY 2.0 — Creative Commons Attribution 2.0 |

Photos téléchargées pour ces chapitres et non posées (images de référence ou photos à placer) :

- ch. 03 (ancien 04) : `04-lichen-caribous-tapis.jpg`
- ch. 07 (ancien 10) : `10-barrage-castor.jpg`, `10-gros-bouillons.jpg`, `10-hutte-castor.jpg`, `10-trou-puisage-glace.jpg`
- ch. 10 (ancien 13) : `13-bouleau-ecorce-rubans.jpg`, `13-gomme-epinette.jpg`
- ch. 17 (ancien 22) : `22-poisson-foie-rogue-laitance.jpg`

## Avertissements

- ch. 04, paginateur : p04-7 : page à moitié vide
- ch. 05, paginateur : p05-11 : page à moitié vide
- ch. 09, paginateur : p09-8 : page à moitié vide
- ch. 10, paginateur : p10-9 : page à moitié vide
- ch. 10, constructeur : exergue sans ancrage E — Désinfecter
- ch. 13, paginateur : p13-7 : page à moitié vide
- ch. 14, paginateur : p14-6 : page à moitié vide

## À savoir avant de téléverser

- **Onglet de tranche.** Le numéro de chapitre de l'onglet (en haut, au bord extérieur) est imprimé à moins de 0,1 po du rognage, hors de la zone sûre de Blurb (0,25 po) ; la coupe varie de 1/16 po. L'onglet est fait pour déborder, mais le chiffre peut être entamé. À voir sur l'épreuve papier. Pour les chapitres à trois chiffres (100 à 112), le chiffre est à 12 pt au lieu de 15 (à 15 pt, « 102 » dépasse le rognage) : réglage de `couleur.css` depuis le 28 septembre 2026, le même dans les rendus de chapitre seuls.
- **Petit fond.** Le bloc de texte est à 0,5 po de la reliure : conforme au tableau du calculateur (0,5), pas au paragraphe de la même page (0,625). Le livre de 440 pages ouvre mal au centre : à juger sur épreuve.
- **Page du logo Blurb.** Blurb ajoute une page de logo à la fin, hors compte, sauf option payante.
- **Aperçus.** Les PNG de `apercus/` sont pris sur les pages HTML qui ont servi à l'impression, rognées à 8 × 10 po (sans fond perdu).
