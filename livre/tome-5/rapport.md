# Tome 5 · La forêt, le jardin et le chalet — rapport d'assemblage

- **Produit le :** 2026-10-14 21:42, par `design/outils/assembler-tome.py 5 --hors-ligne`
- **Fichier :** `livre/tome-5/interieur.pdf` — 440 pages, 289.8 Mo
- **Ouvertures :** toujours au recto (page de droite), une page blanche devant au besoin
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-5.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1 | Page de titre | 1 |
| 3 | Dédicace | 1 |
| 5 | Sommaire | 1 |
| 7–24 | ch. 82 — Le feu au chalet | 18 |
| 25–39 | ch. 83 — Poêles à bois et rendement | 15 |
| 41–61 | ch. 84 — Ouvrir et fermer le chalet | 21 |
| 63–74 | ch. 85 — Éclairage | 12 |
| 75–98 | ch. 86 — L’électricité du chalet et le froid mécanique | 24 |
| 99–114 | ch. 87 — Sans propane | 16 |
| 115–135 | ch. 88 — Le pain | 21 |
| 137–161 | ch. 89 — Raquettes et toboggan | 25 |
| 163–185 | ch. 90 — Le canot : réparer, porter, en refaire un | 23 |
| 187–202 | ch. 91 — Petits fruits | 16 |
| 203–226 | ch. 92 — Plantes comestibles boréales | 24 |
| 227–240 | ch. 93 — Champignons | 14 |
| 241–263 | ch. 94 — Sève, gomme, écorces | 23 |
| 265–282 | ch. 95 — Jardin nordique | 18 |
| 283–311 | ch. 96 — Faire la terre sans rien acheter | 29 |
| 313–337 | ch. 97 — Allonger la saison | 25 |
| 339–371 | ch. 98 — Ce qui nourrit un hiver | 33 |
| 373–406 | ch. 99 — Les façons de faire d’autrefois | 34 |
| 407–422 | ch. 100 — Semences | 16 |
| 423–439 | ch. 101 — Petit élevage | 17 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 13 |
| | **Total** | **440** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/credits/tome-5-credits.md` et `livre/credits/tome-5-credits.pdf`.

Les chapitres seuls font 424 pages ; 10 blanche(s) servent à faire ouvrir chaque chapitre à droite. Avec `--verso` (un chapitre peut ouvrir à gauche), le tome ferait 428 pages.

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 440 | oui |
| Page 1 | à droite | page de titre | oui |
| Polices incorporées | toutes | 53 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 289.8 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : IBMPlexSansCond-Bold, IBMPlexSansCond-Medium, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, IBMPlexSerif-SemiBoldItalic, LiberationSerif, LiberationSerif-Italic, NotoSerif-Regular, Type 3 sans nom (texte des planches)

## Tranche et couverture

Calculateur non interrogé (--hors-ligne). Relevé du 27 septembre 2026 dans `sources/blurb-specifications.md` §2 ; pour 440 pages, prendre la ligne du tableau dont le palier couvre ce nombre, et revérifier au calculateur. [À VÉRIFIER]

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 82 | 82-08a (18, pleine), 82-08b (19, pleine), 82-10a (20, pleine), 82-10b (21, pleine), 82-12a (23, pleine), 82-12b (24, pleine), 83-suie-poudreuse.jpg (8), 83-creosote-vitrifiee-conduit.jpg (9), 83-conduit-bouche-apres-feu.jpg (10) | — | — | 7 (ancien 16) |
| 83 | 83-40 (28, pleine), 83-10 (38, pleine), 83-suie-poudreuse.jpg (29), 83-creosote-vitrifiee-conduit.jpg (30), 83-epinettes-mortes-sur-pied.jpg (34), 83-chicot-pourri-carpophores.jpg (35), 83-creosote-vitrifiee-morceau.jpg (37) | — | — | 9 (ancien 15) |
| 84 | 84-01 (43, pleine), 84-05 (46, pleine), 84-02 (55, pleine), 84-03 (56, pleine), 84-04 (60, pleine) | — | — | 0 (ancien 15b) |
| 85 | — | — | — | 7 (ancien 18) |
| 86 | 86-04 (88, pleine), 86-05 (89, pleine), 86-01a (91, pleine), 86-01b (92, pleine), 86-02 (94, pleine), 86-03a (95, pleine), 86-03b (97, pleine), 86-06 (98, pleine) | — | — | 0 (ancien 18b) |
| 87 | 87-08a (110, pleine), 87-08b (111, pleine), 87-09 (113, pleine) | — | — | 7 (ancien 14) |
| 88 | 88-06 (118, pleine), 88-03 (120, pleine), 88-02 (122, pleine), 88-01 (130, pleine), 88-04 (131, pleine), 88-07 (132, pleine), 88-05 (134, pleine), 88-ergot-dans-le-ble.jpg (121), 88-ble-traite-rose-melange.jpg (123), 88-grains-fusaries-temoin.png (124) | — | — | 0 (ancien 14b) |
| 89 | 89-01a (140, pleine), 89-02 (141, pleine), 89-01b (143, pleine), 89-03 (145, pleine), 89-04 (147, pleine), 89-05a (148, pleine), 89-05b (150, pleine), 89-41 (156, pleine), 89-06 (158, pleine), 89-07 (160) | — | — | 0 (ancien 20b) |
| 90 | 90-04 (166, pleine), 90-01 (168, pleine), 90-06 (169, pleine), 90-05 (171, pleine), 90-03 (172, pleine), 90-02a (179, pleine), 90-02b (181, pleine), 90-07a (182, pleine), 90-07b (183, pleine) | — | — | 0 (ancien 20c) |
| 91 | 91-11 (200, pleine), 57-02a-bleuet.jpg (188), 57-02b-airelle.jpg (188), 57-02c-camarine.jpg (189), 57-02d-chicoute.jpg (189), 57-02e-framboise.jpg (189), 57-02f-atoca.jpg (189), 57-01b-actee-rouge-fruits.jpg (191), 57-01c-actee-blanche-plant.jpg (191), 57-01d-actee-blanche-fruits.jpg (192), 57-01e-if-plant.jpg (192), 57-03a-if-arille-graine-en-place.jpg (192), 57-01g-clintonie-plant.jpg (193), 57-07-pots-scelles.jpg (194) | — | — | 3 (ancien 57) |
| 92 | 22-herbe-a-puce-folioles.jpg (205), 01-crosse-fougere-autruche.jpg (207), 92-crosse-sillon.jpg (207), 03-crosse-deroulee.jpg (207), 23b-fougere-aigle-crosse.jpg (208), 23c-osmonde-cannelle-crosse.jpg (208), 04-quenouille-station-epi.jpg (208), 92-quenouille-feuille-coupe.jpg (209), 92-iris-feuille-coupe.jpg (209), 24b-iris-versicolore-feuilles.jpg (209), 07-sapin-baumier-rameau.jpg (210), 26c-if-canada-feuillage.jpg (210), 26b-thuya-rameau-dessus.jpg (211), 18-if-canada-arille.jpg (211), 09-the-labrador-dessous-feuille.jpg (211), 21-apocyn-latex.jpg (212), 17-veratre-jeunes-feuilles.jpg (213), 11-pissenlit-racine-latex.jpg (214), 12-stellaire-ligne-poils.jpg (214), 27b-mouron-rouge.jpg (215), 13-salicorne.jpg (215), 14-laminaire-crampon.jpg (216), 33-cicutaire-rhizome-cloisonne.jpg (216), 15-cicutaire-plant-fleur.jpg (217), 06-quenouille-rhizome.jpg (225) | — | — | 10 (ancien 58) |
| 93 | 93-41 (239), 93-amanite-deterree-volve.jpg (230), 93-amanite-cueillie-sans-volve.jpg (231) | — | — | 20 (ancien 59) |
| 94 | 94-34 (251, pleine), 94-33a (252, pleine), 94-33b (253, pleine), 94-40 (260, pleine), 94-31 (261, pleine), 01a-bouleau-tronc.jpg (243), 05-bouleau-feuille-dessus-dessous.jpg (243), 09a-erable-rouge-feuille-dessus.jpg (243), 09b-erable-rouge-feuille-dessous.jpg (244), 10-erable-rouge-ecorce.jpg (244), 06a-thuya-ramule.jpg (244), 06b-epinette-noire-rameau.jpg (244), 07-thuya-ecorce.jpg (245), 04-cerisier-rameau.jpg (245), 08-if-canada-port.jpg (245), 02-bouleau-ecorce.jpg (246), 03-cerisier-ecorce-lenticelles.jpg (246), 28-sapin-baumier-vesicules.jpg (247), 94-seve-tournee.png (248), 23-refractometre.jpg (249), 24-filtration-sirop.jpg (249), 94-liber-bouleau.jpg (254), 94-liber-epinette-noire.jpg (254), 13-chaudiere-galvanisee.jpg (263) | — | — | 12 (ancien 60) |
| 95 | 95-40a (269, pleine), 95-40b (270, pleine), 95-09 (279, pleine), 95-10 (280, pleine), 74-05b-patate-verdissement-leger.jpg (271), 74-05c-patate-verdissement-avance.jpg (271), 74-05d-patate-germes.jpg (271) | — | — | 7 (ancien 74) |
| 96 | 96-02 (286, pleine), 96-07 (287, pleine), 96-03a (288, pleine), 96-03b (290, pleine), 96-05 (291, pleine), 96-06 (292, pleine), 96-08 (300, pleine), 96-09 (306, pleine), 96-01 (308, pleine), 96-11 (310, pleine), 96-04 (311, pleine), 96-12 (294), 95-podzol-profil.png (284) | — | — | 0 (ancien 96) |
| 97 | 97-01a (317, pleine), 97-01b (318, pleine), 97-03 (322, pleine), 97-04 (323, pleine), 97-05a (325, pleine), 97-05b (326, pleine), 97-06 (334, pleine), 97-02 (335, pleine) | — | — | 0 (ancien 97) |
| 98 | 98-02 (344, pleine), 98-03 (346, pleine), 98-05 (352, pleine), 98-06 (353, pleine), 98-08 (355, pleine), 98-04a (363, pleine), 98-04b (364, pleine), 98-01a (365, pleine), 98-01b (366, pleine), 98-07 (368, pleine), 98-10 (369, pleine), 98-09 (370, pleine), 98-mildiou-taches-du-bord.jpg (345), 98-mildiou-duvet-blanc.jpg (347), 98-alternariose-pomme-de-terre.jpg (347), 98-mildiou-tubercule-coupe.jpg (348), 88-ergot-epi-ble.jpg (351), 88-ergot-dans-le-ble.jpg (354), 98-baies-pomme-de-terre.jpg (360) | — | — | 0 (ancien 98) |
| 99 | 99-01 (377, pleine), 99-12 (379, pleine), 99-11 (380, pleine), 99-08 (384, pleine), 99-06 (385, pleine), 99-07a (386, pleine), 99-07b (387, pleine), 99-09a (388, pleine), 99-10 (390, pleine), 99-05 (392, pleine), 99-02a (393, pleine), 99-02b (394, pleine), 99-03 (395, pleine), 99-04 (397, pleine), 99-09b (405, pleine) | — | — | 0 (ancien 99) |
| 100 | 100-40 (413, pleine), 100-05 (420), 75-03d-courge-male-femelle.jpg (410), 75-02a-haricot-gousses-semence.jpg (411), 75-02c-concombre-trop-mur.jpg (411), 75-02d-laitue-fleur-aigrette.jpg (411), 75-03a-courge-fleur-femelle.jpg (420), 75-03b-courge-fleur-male.jpg (421), 75-03e-courge-pollinisation-main.jpg (421) | — | — | 6 (ancien 75) |
| 101 | 101-01 (427, pleine), 101-40 (430, pleine), 101-07 (426) | — | — | 7 (ancien 78) |

**Photos sous 150 PPI à la taille imprimée :** 04-cerisier-rameau.jpg : 147 PPI

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/credits/tome-5-credits.md` et `livre/credits/tome-5-credits.pdf`.

| Page | Ch. | Fichier | Auteur | Licence |
| ---: | --- | --- | --- | --- |
| 8 | 82 | 83-suie-poudreuse.jpg | Rasbak | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 9 | 82 | 83-creosote-vitrifiee-conduit.jpg | Oskar4432 | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 10 | 82 | 83-conduit-bouche-apres-feu.jpg | Marco77 | CC BY-SA 3.0 de — Creative Commons Attribution-Share Alike 3.0 de |
| 29 | 83 | 83-suie-poudreuse.jpg | Rasbak | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 30 | 83 | 83-creosote-vitrifiee-conduit.jpg | Oskar4432 | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 34 | 83 | 83-epinettes-mortes-sur-pied.jpg | Intermountain Region US Forest Service | Public domain |
| 35 | 83 | 83-chicot-pourri-carpophores.jpg | (c) Jenifer Shapland, some rights reserved (CC BY-NC) | CC BY-NC |
| 37 | 83 | 83-creosote-vitrifiee-morceau.jpg | Mario Hains | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 121 | 88 | 88-ergot-dans-le-ble.jpg | Dominique Jacquin | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 123 | 88 | 88-ble-traite-rose-melange.jpg | The U.S. Food and Drug Administration | Public domain |
| 124 | 88 | 88-grains-fusaries-temoin.png | Alisaac E, Behmann J, Rathgeb A, Karlovsky P, Dehne HW, Mahlein AK | CC BY 4.0 (article sous licence CC BY, lu sur PMC et Europe PMC) |
| 188 | 91 | 57-02a-bleuet.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 188 | 91 | 57-02b-airelle.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 189 | 91 | 57-02c-camarine.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 189 | 91 | 57-02d-chicoute.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 189 | 91 | 57-02e-framboise.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 189 | 91 | 57-02f-atoca.jpg | National Park Service, Alaska Region | Public domain |
| 191 | 91 | 57-01b-actee-rouge-fruits.jpg | Neal Herbert | Public domain |
| 191 | 91 | 57-01c-actee-blanche-plant.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 192 | 91 | 57-01d-actee-blanche-fruits.jpg | Doug McGrady from Warwick, RI, USA | CC BY 2.0 |
| 192 | 91 | 57-01e-if-plant.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 192 | 91 | 57-03a-if-arille-graine-en-place.jpg | Famartin | CC BY-SA 4.0 |
| 193 | 91 | 57-01g-clintonie-plant.jpg | NPS | Public domain |
| 194 | 91 | 57-07-pots-scelles.jpg | Nutrition, Food Safety & Health | CC0 |
| 205 | 92 | 22-herbe-a-puce-folioles.jpg | Ryan Hodnett | CC BY-SA 4.0 |
| 207 | 92 | 01-crosse-fougere-autruche.jpg | The Cosmonaut | CC BY-SA 2.5 ca |
| 207 | 92 | 92-crosse-sillon.jpg | User:Zimmerzute | CC BY 2.5 — Creative Commons Attribution 2.5 |
| 207 | 92 | 03-crosse-deroulee.jpg | Jason Riedy | CC BY 2.0 |
| 208 | 92 | 23b-fougere-aigle-crosse.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 208 | 92 | 23c-osmonde-cannelle-crosse.jpg | Charles de Mille-Isles from Mille-Isles, Canada | CC BY 2.0 |
| 208 | 92 | 04-quenouille-station-epi.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 209 | 92 | 92-quenouille-feuille-coupe.jpg | Stefan.lefnaer | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 209 | 92 | 92-iris-feuille-coupe.jpg | Stefan.lefnaer | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 209 | 92 | 24b-iris-versicolore-feuilles.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 210 | 92 | 07-sapin-baumier-rameau.jpg | NPS | Public domain |
| 210 | 92 | 26c-if-canada-feuillage.jpg | Bill Cook, Michigan State University, Bugwood.org | CC BY-SA 3.0 |
| 211 | 92 | 26b-thuya-rameau-dessus.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 211 | 92 | 18-if-canada-arille.jpg | HardestCard | CC0 |
| 211 | 92 | 09-the-labrador-dessous-feuille.jpg | Forest Service Alaska Region, USDA | Public domain |
| 212 | 92 | 21-apocyn-latex.jpg | Matt Lavin from Bozeman, Montana, USA | CC BY-SA 2.0 |
| 213 | 92 | 17-veratre-jeunes-feuilles.jpg | Murray Foubister | CC BY-SA 2.0 |
| 214 | 92 | 11-pissenlit-racine-latex.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 214 | 92 | 12-stellaire-ligne-poils.jpg | Alex Lockton | CC BY-SA 4.0 |
| 215 | 92 | 27b-mouron-rouge.jpg | Lidine Mia | CC BY-SA 4.0 |
| 215 | 92 | 13-salicorne.jpg | Ecomare/Sytske Dijksen | CC BY-SA 4.0 |
| 216 | 92 | 14-laminaire-crampon.jpg | brewbooks from near Seattle, USA | CC BY-SA 2.0 |
| 216 | 92 | 33-cicutaire-rhizome-cloisonne.jpg | Stefan.lefnaer | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 217 | 92 | 15-cicutaire-plant-fleur.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 225 | 92 | 06-quenouille-rhizome.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 230 | 93 | 93-amanite-deterree-volve.jpg | (c) Thea Chesney, some rights reserved (CC BY) | CC BY |
| 231 | 93 | 93-amanite-cueillie-sans-volve.jpg | (c) Rosemary Curley, some rights reserved (CC BY-NC) | CC BY-NC |
| 243 | 94 | 01a-bouleau-tronc.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 243 | 94 | 05-bouleau-feuille-dessus-dessous.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 243 | 94 | 09a-erable-rouge-feuille-dessus.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 244 | 94 | 09b-erable-rouge-feuille-dessous.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 244 | 94 | 10-erable-rouge-ecorce.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 244 | 94 | 06a-thuya-ramule.jpg | Crusier | CC BY-SA 3.0 |
| 244 | 94 | 06b-epinette-noire-rameau.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 245 | 94 | 07-thuya-ecorce.jpg | USDA-NRCS PLANTS Database / Herman, D. E. et coll., 1996 | Public domain |
| 245 | 94 | 04-cerisier-rameau.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 245 | 94 | 08-if-canada-port.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 246 | 94 | 02-bouleau-ecorce.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 246 | 94 | 03-cerisier-ecorce-lenticelles.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 247 | 94 | 28-sapin-baumier-vesicules.jpg | Treetime.ca | CC BY-SA 3.0 |
| 248 | 94 | 94-seve-tournee.png | AngryBiceps | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 249 | 94 | 23-refractometre.jpg | CEphoto, Uwe Aranas | CC BY-SA 3.0 |
| 249 | 94 | 24-filtration-sirop.jpg | elPadawan | CC BY-SA 2.0 |
| 254 | 94 | 94-liber-bouleau.jpg | (c) Christine Nagy, some rights reserved (CC BY-NC) | CC BY-NC |
| 254 | 94 | 94-liber-epinette-noire.jpg | (c) Rob Routledge, some rights reserved (CC BY-NC) | CC BY-NC |
| 263 | 94 | 13-chaudiere-galvanisee.jpg | Baral | CC BY-SA 3.0 |
| 271 | 95 | 74-05b-patate-verdissement-leger.jpg | SciThreads | CC BY-SA 4.0 |
| 271 | 95 | 74-05c-patate-verdissement-avance.jpg | Rasbak | CC BY-SA 3.0 |
| 271 | 95 | 74-05d-patate-germes.jpg | ZooFari | Public domain |
| 284 | 96 | 95-podzol-profil.png | Amdb73 | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 345 | 98 | 98-mildiou-taches-du-bord.jpg | Jerzy Opioła | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 347 | 98 | 98-mildiou-duvet-blanc.jpg | Björn Andersson (SLU) | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 347 | 98 | 98-alternariose-pomme-de-terre.jpg | (c) Aidan Campos, some rights reserved (CC BY-NC) | CC BY-NC |
| 348 | 98 | 98-mildiou-tubercule-coupe.jpg | USDA Agricultural Research Service (auteur non nommé sur la page) | Public domain (PD-USGov-USDA-ARS) |
| 351 | 98 | 88-ergot-epi-ble.jpg | Dominique Jacquin | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 354 | 98 | 88-ergot-dans-le-ble.jpg | Dominique Jacquin | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 360 | 98 | 98-baies-pomme-de-terre.jpg | Danny S. | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 410 | 100 | 75-03d-courge-male-femelle.jpg | Mad.madrasi | CC BY-SA 3.0 |
| 411 | 100 | 75-02a-haricot-gousses-semence.jpg | Schlaghecken Josef | CC BY-SA 4.0 |
| 411 | 100 | 75-02c-concombre-trop-mur.jpg | Fumikas Sagisavas | CC0 |
| 411 | 100 | 75-02d-laitue-fleur-aigrette.jpg | Forest and Kim Starr | CC BY 3.0 us |
| 420 | 100 | 75-03a-courge-fleur-femelle.jpg | Forest & Kim Starr | CC BY 3.0 |
| 421 | 100 | 75-03b-courge-fleur-male.jpg | Forest & Kim Starr | CC BY 3.0 |
| 421 | 100 | 75-03e-courge-pollinisation-main.jpg | Zenon Sych | CC BY-SA 4.0 |

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
