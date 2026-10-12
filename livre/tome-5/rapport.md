# Tome 5 · La forêt, le jardin et le chalet — rapport d'assemblage

- **Produit le :** 2026-09-29 06:52, par `design/outils/assembler-tome.py 5`
- **Fichier :** `livre/tome-5/interieur.pdf` — 438 pages, 287.4 Mo
- **Ouvertures :** toujours au recto (page de droite), une page blanche devant au besoin
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-5.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1 | Page de titre | 1 |
| 3 | Sommaire | 1 |
| 5–22 | ch. 82 — Le feu au chalet | 18 |
| 23–37 | ch. 83 — Poêles à bois et rendement | 15 |
| 39–59 | ch. 84 — Ouvrir et fermer le chalet | 21 |
| 61–72 | ch. 85 — Éclairage | 12 |
| 73–96 | ch. 86 — L’électricité du chalet et le froid mécanique | 24 |
| 97–112 | ch. 87 — Sans propane | 16 |
| 113–133 | ch. 88 — Le pain | 21 |
| 135–159 | ch. 89 — Raquettes et toboggan | 25 |
| 161–183 | ch. 90 — Le canot : réparer, porter, en refaire un | 23 |
| 185–200 | ch. 91 — Petits fruits | 16 |
| 201–224 | ch. 92 — Plantes comestibles boréales | 24 |
| 225–238 | ch. 93 — Champignons | 14 |
| 239–261 | ch. 94 — Sève, gomme, écorces | 23 |
| 263–280 | ch. 95 — Jardin nordique | 18 |
| 281–309 | ch. 96 — Faire la terre sans rien acheter | 29 |
| 311–335 | ch. 97 — Allonger la saison | 25 |
| 337–369 | ch. 98 — Ce qui nourrit un hiver | 33 |
| 371–404 | ch. 99 — Les façons de faire d’autrefois | 34 |
| 405–420 | ch. 100 — Semences | 16 |
| 421–437 | ch. 101 — Petit élevage | 17 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 12 |
| | **Total** | **438** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/credits/tome-5-credits.md` et `livre/credits/tome-5-credits.pdf`.

Les chapitres seuls font 424 pages ; 10 blanche(s) servent à faire ouvrir chaque chapitre à droite. Avec `--verso` (un chapitre peut ouvrir à gauche), le tome ferait 428 pages.

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 438 | oui |
| Page 1 | à droite | page de titre | oui |
| Polices incorporées | toutes | 51 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 287.4 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : Georgia, Georgia-Italic, IBMPlexSansCond-Bold, IBMPlexSansCond-Medium, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, IBMPlexSerif-SemiBoldItalic, NotoSerif-Regular, Type 3 sans nom (texte des planches)

## Tranche et couverture

Calculateur de Blurb interrogé le 2026-09-29 06:52 pour **438 pages**, papier Standard, couverture **souple** (`softcover`), en pouces :

**Tranche : 1.0 x 10.25 po. PDF de couverture : 17.25 x 10.25 po.**

| Pages (ce PDF) | Pouces |
| --- | --- |
| Final, exported PDF should measure (w x h) | 8.125 x 10.25 |
| Page size / trim line (w x h) | 8.0 x 10.0 |
| Bleed (top, bottom, and outside edges) | 0.125 |
| Inset for Margins / Safe boundary (Top, Bottom, Outside Edge) | 0.25 |
| Inset for Margins / Safe boundary (Binding Edge) | 0.5 |

| Couverture | Pouces |
| --- | --- |
| Final, exported PDF should measure (w x h) | 17.25 x 10.25 |
| Total Page size / trim line (w x h) | 17.0 x 10.0 |
| Bleed (all edges) | 0.125 |
| Flaps (w x h, measured from trim edge to fold) | none |
| Gutter / Spine (w x h) | 1.0 x 10.25 |
| Inset for Margins / Safe boundary (from edge of trim) | 0.25 |

La tranche change par paliers avec le nombre de pages : la couverture se fait **après** le dernier assemblage, avec la mesure du jour.

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 82 | 82-08a (16, pleine), 82-08b (17, pleine), 82-10a (18, pleine, à valider), 82-10b (19, pleine, à valider), 82-12a (21, pleine), 82-12b (22, pleine), 83-suie-poudreuse.jpg (6), 83-creosote-vitrifiee-conduit.jpg (7), 83-conduit-bouche-apres-feu.jpg (8) | — | — | 7 (ancien 16) |
| 83 | 83-40 (26, pleine, à valider), 83-10 (36, pleine), 83-suie-poudreuse.jpg (27), 83-creosote-vitrifiee-conduit.jpg (28), 83-epinettes-mortes-sur-pied.jpg (32), 83-chicot-pourri-carpophores.jpg (33), 83-creosote-vitrifiee-morceau.jpg (35) | — | — | 9 (ancien 15) |
| 84 | 84-01 (41, pleine, à valider), 84-05 (44, pleine, à valider), 84-02 (53, pleine, à valider), 84-03 (54, pleine, à valider), 84-04 (58, pleine, à valider) | — | — | 0 (ancien 15b) |
| 85 | — | — | — | 7 (ancien 18) |
| 86 | 86-04 (86, pleine, à valider), 86-05 (87, pleine, à valider), 86-01a (89, pleine, à valider), 86-01b (90, pleine, à valider), 86-02 (92, pleine, à valider), 86-03a (93, pleine, à valider), 86-03b (95, pleine, à valider), 86-06 (96, pleine, à valider) | — | — | 0 (ancien 18b) |
| 87 | 87-08a (108, pleine), 87-08b (109, pleine), 87-09 (111, pleine, à valider) | — | — | 7 (ancien 14) |
| 88 | 88-06 (116, pleine, à valider), 88-03 (118, pleine, à valider), 88-02 (120, pleine, à valider), 88-01 (128, pleine, à valider), 88-04 (129, pleine, à valider), 88-07 (130, pleine, à valider), 88-05 (132, pleine, à valider), 88-ergot-dans-le-ble.jpg (119), 88-ble-traite-rose-melange.jpg (121), 88-grains-fusaries-temoin.png (122) | — | — | 0 (ancien 14b) |
| 89 | 89-01a (138, pleine, à valider), 89-02 (139, pleine, à valider), 89-01b (141, pleine, à valider), 89-03 (143, pleine, à valider), 89-04 (145, pleine, à valider), 89-05a (146, pleine, à valider), 89-05b (148, pleine, à valider), 89-41 (154, pleine, à valider), 89-06 (156, pleine, à valider), 89-07 (158, à valider) | — | — | 0 (ancien 20b) |
| 90 | 90-04 (164, pleine, à valider), 90-01 (166, pleine, à valider), 90-06 (167, pleine, à valider), 90-05 (169, pleine, à valider), 90-03 (170, pleine, à valider), 90-02a (177, pleine, à valider), 90-02b (179, pleine, à valider), 90-07a (180, pleine, à valider), 90-07b (181, pleine, à valider) | — | — | 0 (ancien 20c) |
| 91 | 91-11 (198, pleine, à valider), 57-02a-bleuet.jpg (186), 57-02b-airelle.jpg (186), 57-02c-camarine.jpg (187), 57-02d-chicoute.jpg (187), 57-02e-framboise.jpg (187), 57-02f-atoca.jpg (187), 57-01b-actee-rouge-fruits.jpg (189), 57-01c-actee-blanche-plant.jpg (189), 57-01d-actee-blanche-fruits.jpg (190), 57-01e-if-plant.jpg (190), 57-03a-if-arille-graine-en-place.jpg (190), 57-01g-clintonie-plant.jpg (191), 57-07-pots-scelles.jpg (192) | — | — | 3 (ancien 57) |
| 92 | 22-herbe-a-puce-folioles.jpg (203), 01-crosse-fougere-autruche.jpg (205), 92-crosse-sillon.jpg (205), 03-crosse-deroulee.jpg (205), 23b-fougere-aigle-crosse.jpg (206), 23c-osmonde-cannelle-crosse.jpg (206), 04-quenouille-station-epi.jpg (206), 92-quenouille-feuille-coupe.jpg (207), 92-iris-feuille-coupe.jpg (207), 24b-iris-versicolore-feuilles.jpg (207), 07-sapin-baumier-rameau.jpg (208), 26c-if-canada-feuillage.jpg (208), 26b-thuya-rameau-dessus.jpg (209), 18-if-canada-arille.jpg (209), 09-the-labrador-dessous-feuille.jpg (209), 21-apocyn-latex.jpg (210), 17-veratre-jeunes-feuilles.jpg (211), 11-pissenlit-racine-latex.jpg (212), 12-stellaire-ligne-poils.jpg (212), 27b-mouron-rouge.jpg (213), 13-salicorne.jpg (213), 14-laminaire-crampon.jpg (214), 33-cicutaire-rhizome-cloisonne.jpg (214), 15-cicutaire-plant-fleur.jpg (215), 06-quenouille-rhizome.jpg (223) | — | — | 10 (ancien 58) |
| 93 | 93-41 (237, à valider), 93-amanite-deterree-volve.jpg (228), 93-amanite-cueillie-sans-volve.jpg (229) | — | — | 20 (ancien 59) |
| 94 | 94-34 (249, pleine), 94-33a (250, pleine), 94-33b (251, pleine), 94-40 (258, pleine, à valider), 94-31 (259, pleine), 01a-bouleau-tronc.jpg (241), 05-bouleau-feuille-dessus-dessous.jpg (241), 09a-erable-rouge-feuille-dessus.jpg (241), 09b-erable-rouge-feuille-dessous.jpg (242), 10-erable-rouge-ecorce.jpg (242), 06a-thuya-ramule.jpg (242), 06b-epinette-noire-rameau.jpg (242), 07-thuya-ecorce.jpg (243), 04-cerisier-rameau.jpg (243), 08-if-canada-port.jpg (243), 02-bouleau-ecorce.jpg (244), 03-cerisier-ecorce-lenticelles.jpg (244), 28-sapin-baumier-vesicules.jpg (245), 94-seve-tournee.png (246), 23-refractometre.jpg (247), 24-filtration-sirop.jpg (247), 94-liber-bouleau.jpg (252), 94-liber-epinette-noire.jpg (252), 13-chaudiere-galvanisee.jpg (261) | — | — | 12 (ancien 60) |
| 95 | 95-40a (267, pleine, à valider), 95-40b (268, pleine, à valider), 95-09 (277, pleine), 95-10 (278, pleine, à valider), 74-05b-patate-verdissement-leger.jpg (269), 74-05c-patate-verdissement-avance.jpg (269), 74-05d-patate-germes.jpg (269) | — | — | 7 (ancien 74) |
| 96 | 96-02 (284, pleine, à valider), 96-07 (285, pleine, à valider), 96-03a (286, pleine, à valider), 96-03b (288, pleine, à valider), 96-05 (289, pleine, à valider), 96-06 (290, pleine, à valider), 96-08 (298, pleine, à valider), 96-09 (304, pleine, à valider), 96-01 (306, pleine, à valider), 96-11 (308, pleine, à valider), 96-04 (309, pleine, à valider), 96-12 (292, à valider), 95-podzol-profil.png (282) | — | — | 0 (ancien 96) |
| 97 | 97-01a (315, pleine, à valider), 97-01b (316, pleine, à valider), 97-03 (320, pleine, à valider), 97-04 (321, pleine, à valider), 97-05a (323, pleine, à valider), 97-05b (324, pleine, à valider), 97-06 (332, pleine, à valider), 97-02 (333, pleine, à valider) | — | — | 0 (ancien 97) |
| 98 | 98-02 (342, pleine, à valider), 98-03 (344, pleine, à valider), 98-05 (350, pleine, à valider), 98-06 (351, pleine, à valider), 98-08 (353, pleine, à valider), 98-04a (361, pleine, à valider), 98-04b (362, pleine, à valider), 98-01a (363, pleine, à valider), 98-01b (364, pleine, à valider), 98-07 (366, pleine, à valider), 98-10 (367, pleine, à valider), 98-09 (368, pleine, à valider), 98-mildiou-taches-du-bord.jpg (343), 98-mildiou-duvet-blanc.jpg (345), 98-alternariose-pomme-de-terre.jpg (345), 98-mildiou-tubercule-coupe.jpg (346), 88-ergot-epi-ble.jpg (349), 88-ergot-dans-le-ble.jpg (352), 98-baies-pomme-de-terre.jpg (358) | — | — | 0 (ancien 98) |
| 99 | 99-01 (375, pleine, à valider), 99-12 (377, pleine, à valider), 99-11 (378, pleine, à valider), 99-08 (382, pleine, à valider), 99-06 (383, pleine, à valider), 99-07a (384, pleine, à valider), 99-07b (385, pleine, à valider), 99-09a (386, pleine, à valider), 99-10 (388, pleine, à valider), 99-05 (390, pleine, à valider), 99-02a (391, pleine, à valider), 99-02b (392, pleine, à valider), 99-03 (394, pleine, à valider), 99-04 (395, pleine, à valider), 99-09b (403, pleine, à valider) | — | — | 0 (ancien 99) |
| 100 | 100-40 (411, pleine, à valider), 100-05 (418), 75-03d-courge-male-femelle.jpg (408), 75-02a-haricot-gousses-semence.jpg (409), 75-02c-concombre-trop-mur.jpg (409), 75-02d-laitue-fleur-aigrette.jpg (409), 75-03a-courge-fleur-femelle.jpg (418), 75-03b-courge-fleur-male.jpg (419), 75-03e-courge-pollinisation-main.jpg (419) | — | — | 6 (ancien 75) |
| 101 | 101-01 (425, pleine), 101-40 (428, pleine, à valider), 101-07 (424) | — | — | 7 (ancien 78) |

**Photos sous 150 PPI à la taille imprimée :** 04-cerisier-rameau.jpg : 147 PPI

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/credits/tome-5-credits.md` et `livre/credits/tome-5-credits.pdf`.

| Page | Ch. | Fichier | Auteur | Licence |
| ---: | --- | --- | --- | --- |
| 6 | 82 | 83-suie-poudreuse.jpg | Rasbak | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 7 | 82 | 83-creosote-vitrifiee-conduit.jpg | Oskar4432 | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 8 | 82 | 83-conduit-bouche-apres-feu.jpg | Marco77 | CC BY-SA 3.0 de — Creative Commons Attribution-Share Alike 3.0 de |
| 27 | 83 | 83-suie-poudreuse.jpg | Rasbak | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 28 | 83 | 83-creosote-vitrifiee-conduit.jpg | Oskar4432 | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 32 | 83 | 83-epinettes-mortes-sur-pied.jpg | Intermountain Region US Forest Service | Public domain |
| 33 | 83 | 83-chicot-pourri-carpophores.jpg | (c) Jenifer Shapland, some rights reserved (CC BY-NC) | CC BY-NC |
| 35 | 83 | 83-creosote-vitrifiee-morceau.jpg | Mario Hains | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 119 | 88 | 88-ergot-dans-le-ble.jpg | Dominique Jacquin | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 121 | 88 | 88-ble-traite-rose-melange.jpg | The U.S. Food and Drug Administration | Public domain |
| 122 | 88 | 88-grains-fusaries-temoin.png | Alisaac E, Behmann J, Rathgeb A, Karlovsky P, Dehne HW, Mahlein AK | CC BY 4.0 (article sous licence CC BY, lu sur PMC et Europe PMC) |
| 186 | 91 | 57-02a-bleuet.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 186 | 91 | 57-02b-airelle.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 187 | 91 | 57-02c-camarine.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 187 | 91 | 57-02d-chicoute.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 187 | 91 | 57-02e-framboise.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 187 | 91 | 57-02f-atoca.jpg | National Park Service, Alaska Region | Public domain |
| 189 | 91 | 57-01b-actee-rouge-fruits.jpg | Neal Herbert | Public domain |
| 189 | 91 | 57-01c-actee-blanche-plant.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 190 | 91 | 57-01d-actee-blanche-fruits.jpg | Doug McGrady from Warwick, RI, USA | CC BY 2.0 |
| 190 | 91 | 57-01e-if-plant.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 190 | 91 | 57-03a-if-arille-graine-en-place.jpg | Famartin | CC BY-SA 4.0 |
| 191 | 91 | 57-01g-clintonie-plant.jpg | NPS | Public domain |
| 192 | 91 | 57-07-pots-scelles.jpg | Nutrition, Food Safety & Health | CC0 |
| 203 | 92 | 22-herbe-a-puce-folioles.jpg | Ryan Hodnett | CC BY-SA 4.0 |
| 205 | 92 | 01-crosse-fougere-autruche.jpg | The Cosmonaut | CC BY-SA 2.5 ca |
| 205 | 92 | 92-crosse-sillon.jpg | User:Zimmerzute | CC BY 2.5 — Creative Commons Attribution 2.5 |
| 205 | 92 | 03-crosse-deroulee.jpg | Jason Riedy | CC BY 2.0 |
| 206 | 92 | 23b-fougere-aigle-crosse.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 206 | 92 | 23c-osmonde-cannelle-crosse.jpg | Charles de Mille-Isles from Mille-Isles, Canada | CC BY 2.0 |
| 206 | 92 | 04-quenouille-station-epi.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 207 | 92 | 92-quenouille-feuille-coupe.jpg | Stefan.lefnaer | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 207 | 92 | 92-iris-feuille-coupe.jpg | Stefan.lefnaer | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 207 | 92 | 24b-iris-versicolore-feuilles.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 208 | 92 | 07-sapin-baumier-rameau.jpg | NPS | Public domain |
| 208 | 92 | 26c-if-canada-feuillage.jpg | Bill Cook, Michigan State University, Bugwood.org | CC BY-SA 3.0 |
| 209 | 92 | 26b-thuya-rameau-dessus.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 209 | 92 | 18-if-canada-arille.jpg | HardestCard | CC0 |
| 209 | 92 | 09-the-labrador-dessous-feuille.jpg | Forest Service Alaska Region, USDA | Public domain |
| 210 | 92 | 21-apocyn-latex.jpg | Matt Lavin from Bozeman, Montana, USA | CC BY-SA 2.0 |
| 211 | 92 | 17-veratre-jeunes-feuilles.jpg | Murray Foubister | CC BY-SA 2.0 |
| 212 | 92 | 11-pissenlit-racine-latex.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 212 | 92 | 12-stellaire-ligne-poils.jpg | Alex Lockton | CC BY-SA 4.0 |
| 213 | 92 | 27b-mouron-rouge.jpg | Lidine Mia | CC BY-SA 4.0 |
| 213 | 92 | 13-salicorne.jpg | Ecomare/Sytske Dijksen | CC BY-SA 4.0 |
| 214 | 92 | 14-laminaire-crampon.jpg | brewbooks from near Seattle, USA | CC BY-SA 2.0 |
| 214 | 92 | 33-cicutaire-rhizome-cloisonne.jpg | Stefan.lefnaer | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 215 | 92 | 15-cicutaire-plant-fleur.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 223 | 92 | 06-quenouille-rhizome.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 228 | 93 | 93-amanite-deterree-volve.jpg | (c) Thea Chesney, some rights reserved (CC BY) | CC BY |
| 229 | 93 | 93-amanite-cueillie-sans-volve.jpg | (c) Rosemary Curley, some rights reserved (CC BY-NC) | CC BY-NC |
| 241 | 94 | 01a-bouleau-tronc.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 241 | 94 | 05-bouleau-feuille-dessus-dessous.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 241 | 94 | 09a-erable-rouge-feuille-dessus.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 242 | 94 | 09b-erable-rouge-feuille-dessous.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 242 | 94 | 10-erable-rouge-ecorce.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 242 | 94 | 06a-thuya-ramule.jpg | Crusier | CC BY-SA 3.0 |
| 242 | 94 | 06b-epinette-noire-rameau.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 243 | 94 | 07-thuya-ecorce.jpg | USDA-NRCS PLANTS Database / Herman, D. E. et coll., 1996 | Public domain |
| 243 | 94 | 04-cerisier-rameau.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 243 | 94 | 08-if-canada-port.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 244 | 94 | 02-bouleau-ecorce.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 244 | 94 | 03-cerisier-ecorce-lenticelles.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 245 | 94 | 28-sapin-baumier-vesicules.jpg | Treetime.ca | CC BY-SA 3.0 |
| 246 | 94 | 94-seve-tournee.png | AngryBiceps | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 247 | 94 | 23-refractometre.jpg | CEphoto, Uwe Aranas | CC BY-SA 3.0 |
| 247 | 94 | 24-filtration-sirop.jpg | elPadawan | CC BY-SA 2.0 |
| 252 | 94 | 94-liber-bouleau.jpg | (c) Christine Nagy, some rights reserved (CC BY-NC) | CC BY-NC |
| 252 | 94 | 94-liber-epinette-noire.jpg | (c) Rob Routledge, some rights reserved (CC BY-NC) | CC BY-NC |
| 261 | 94 | 13-chaudiere-galvanisee.jpg | Baral | CC BY-SA 3.0 |
| 269 | 95 | 74-05b-patate-verdissement-leger.jpg | SciThreads | CC BY-SA 4.0 |
| 269 | 95 | 74-05c-patate-verdissement-avance.jpg | Rasbak | CC BY-SA 3.0 |
| 269 | 95 | 74-05d-patate-germes.jpg | ZooFari | Public domain |
| 282 | 96 | 95-podzol-profil.png | Amdb73 | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 343 | 98 | 98-mildiou-taches-du-bord.jpg | Jerzy Opioła | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 345 | 98 | 98-mildiou-duvet-blanc.jpg | Björn Andersson (SLU) | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 345 | 98 | 98-alternariose-pomme-de-terre.jpg | (c) Aidan Campos, some rights reserved (CC BY-NC) | CC BY-NC |
| 346 | 98 | 98-mildiou-tubercule-coupe.jpg | USDA Agricultural Research Service (auteur non nommé sur la page) | Public domain (PD-USGov-USDA-ARS) |
| 349 | 98 | 88-ergot-epi-ble.jpg | Dominique Jacquin | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 352 | 98 | 88-ergot-dans-le-ble.jpg | Dominique Jacquin | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 358 | 98 | 98-baies-pomme-de-terre.jpg | Danny S. | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 408 | 100 | 75-03d-courge-male-femelle.jpg | Mad.madrasi | CC BY-SA 3.0 |
| 409 | 100 | 75-02a-haricot-gousses-semence.jpg | Schlaghecken Josef | CC BY-SA 4.0 |
| 409 | 100 | 75-02c-concombre-trop-mur.jpg | Fumikas Sagisavas | CC0 |
| 409 | 100 | 75-02d-laitue-fleur-aigrette.jpg | Forest and Kim Starr | CC BY 3.0 us |
| 418 | 100 | 75-03a-courge-fleur-femelle.jpg | Forest & Kim Starr | CC BY 3.0 |
| 419 | 100 | 75-03b-courge-fleur-male.jpg | Forest & Kim Starr | CC BY 3.0 |
| 419 | 100 | 75-03e-courge-pollinisation-main.jpg | Zenon Sych | CC BY-SA 4.0 |

Photos téléchargées pour ces chapitres et non posées (images de référence ou photos à placer) :

- ch. 91 (ancien 57) : `57-01a-actee-rouge-plant.jpg`, `57-01f-if-arilles.jpg`, `57-01h-clintonie-tor-bay.jpg`, `57-03b-if-arille-dessous.jpg`, `57-08-cueillette-enfants.jpg`
- ch. 92 (ancien 58) : `19-thuya-rameau-ecailles.jpg`, `25a-plantain-feuille.jpg`, `25b-veratre-feuille.jpg`
- ch. 93 (ancien 59) : `59-19-conserve-apparence-normale.jpg`, `59-22-amas-fumier.jpg`, `59-23a-cantharellus-cibarius.jpg`, `59-23b-hydnum-repandum.jpg`, `59-23c-boletus-edulis.jpg`, `59-23d-tricholoma-magnivelare.jpg`, `59-23e-amanita-virosa.jpg`, `59-23f-amanita-bisporigera.jpg`, `59-23g-galerina-marginata.jpg`, `59-23h-gyromitra-esculenta.jpg`, `59-23i-cortinarius.jpg`, `59-23j-coprinopsis-atramentaria.jpg`, `59-23k-ampulloclitocybe-clavipes.jpg`, `59-23l-hygrophoropsis-aurantiaca.jpg`, `59-23m-omphalotus-illudens.jpg`, `59-batture-maree-basse.jpg`
- ch. 94 (ancien 60) : `01b-cerisier-tronc.jpg`, `14-avertisseur-co.jpg`, `18-entaille.jpg`, `20-chaudiere-accrochee.jpg`, `22-ebullition-plein-air.jpg`, `31-pierres-chaudes-auge.jpg`
- ch. 95 (ancien 74) : `74-05a-patate-saine.jpg`
- ch. 98 (ancien 98) : `98-alternariose-cercles-tomate.jpg`
- ch. 100 (ancien 75) : `75-03c-courge-femelle-ovaire-stylo.jpg`

## Avertissements

- ch. 88, paginateur : p88-12 : page à moitié vide
- ch. 90, paginateur : p90-13 : page à moitié vide
- ch. 91, paginateur : p91-10 : page à moitié vide
- ch. 97, paginateur : p97-18 : page à moitié vide
- ch. 98, paginateur : p98-20 : page à moitié vide

## À savoir avant de téléverser

- **Onglet de tranche.** Le numéro de chapitre de l'onglet (en haut, au bord extérieur) est imprimé à moins de 0,1 po du rognage, hors de la zone sûre de Blurb (0,25 po) ; la coupe varie de 1/16 po. L'onglet est fait pour déborder, mais le chiffre peut être entamé. À voir sur l'épreuve papier. Pour les chapitres à trois chiffres (100 à 112), le chiffre est à 12 pt au lieu de 15 (à 15 pt, « 102 » dépasse le rognage) : réglage de `couleur.css` depuis le 28 septembre 2026, le même dans les rendus de chapitre seuls.
- **Petit fond.** Le bloc de texte est à 0,5 po de la reliure : conforme au tableau du calculateur (0,5), pas au paragraphe de la même page (0,625). Le livre de 440 pages ouvre mal au centre : à juger sur épreuve.
- **Page du logo Blurb.** Blurb ajoute une page de logo à la fin, hors compte, sauf option payante.
- **Aperçus.** Les PNG de `apercus/` sont pris sur les pages HTML qui ont servi à l'impression, rognées à 8 × 10 po (sans fond perdu).
