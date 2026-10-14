# Tome 2 · Le corps — rapport d'assemblage

- **Produit le :** 2026-10-14 20:10, par `design/outils/assembler-tome.py 2 --hors-ligne`
- **Fichier :** `livre/tome-2/interieur.pdf` — 414 pages, 245.9 Mo
- **Ouvertures :** toujours au recto (page de droite), une page blanche devant au besoin
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-2.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1 | Page de titre | 1 |
| 3 | Sommaire | 1 |
| 5–16 | ch. 19 — Le mal de caribou | 12 |
| 17–31 | ch. 20 — Le scorbut et l’arbre de vie | 15 |
| 33–44 | ch. 21 — Ce qu’un corps demande l’hiver | 12 |
| 45–60 | ch. 22 — Abats et organes | 16 |
| 61–72 | ch. 23 — Ce que personne ne garde | 12 |
| 73–106 | ch. 24 — Le corps qui travaille | 34 |
| 107–119 | ch. 25 — Le froid lui-même | 13 |
| 121–138 | ch. 26 — Soigner quand il n’y a personne | 18 |
| 139–156 | ch. 27 — Les dents | 18 |
| 157–180 | ch. 28 — Les maladies ordinaires qui durent | 24 |
| 181–214 | ch. 29 — La santé des femmes | 34 |
| 215–228 | ch. 30 — Épidémie | 14 |
| 229–247 | ch. 31 — Hygiène et eaux usées | 19 |
| 249–261 | ch. 32 — Bâtir la pharmacie | 13 |
| 263–293 | ch. 33 — Plantes médicinales boréales | 31 |
| 295–316 | ch. 34 — Soigner avec la forêt, par symptôme | 22 |
| 317–328 | ch. 35 — Ce qu’on ne peut pas soigner | 12 |
| 329–340 | ch. 36 — Tenir le moral tout un hiver | 12 |
| 341–367 | ch. 37 — Le sauna et le bien-être | 27 |
| 369–388 | ch. 38 — Le deuil, le choc et la peur des adultes | 20 |
| 389–400 | ch. 39 — Des enfants de 4 et 6 ans | 12 |
| 401–413 | ch. 40 — Les enfants, la peur et la routine | 13 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 9 |
| | **Total** | **414** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/credits/tome-2-credits.md` et `livre/credits/tome-2-credits.pdf`.

Les chapitres seuls font 403 pages ; 7 blanche(s) servent à faire ouvrir chaque chapitre à droite. Avec `--verso` (un chapitre peut ouvrir à gauche), le tome ferait 406 pages.

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 414 | oui |
| Page 1 | à droite | page de titre | oui |
| Polices incorporées | toutes | 54 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 245.9 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : IBMPlexSansCond-Bold, IBMPlexSansCond-Medium, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, IBMPlexSerif-SemiBoldItalic, LiberationSerif, LiberationSerif-Italic, NotoSansSymbols2-Regular, NotoSerif-Bold, NotoSerif-Regular, Type 3 sans nom (texte des planches)

## Tranche et couverture

Calculateur non interrogé (--hors-ligne). Relevé du 27 septembre 2026 dans `sources/blurb-specifications.md` §2 ; pour 414 pages, prendre la ligne du tableau dont le palier couvre ce nombre, et revérifier au calculateur. [À VÉRIFIER]

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 19 | 19-09 (14, pleine), 19-04 (13) | — | — | 8 (ancien 24) |
| 20 | 25-7a-gencives.jpg (22), 25-7b-hemorragies-perifolliculaires.png (23), 25-6b-camarine-neige.jpg (29), 25-6c-canneberge-hiver.jpg (30), 25-6a-airelle-hiver.jpg (30) | — | — | 5 (ancien 25) |
| 21 | — | — | — | 5 (ancien 26) |
| 22 | 22-40 (48, pleine), 22-poisson-foie-rogue-laitance.jpg (50), 41-5c-lapin-lesions-foyers-blancs.jpg (51), 41-5a-orignal-kystes-hydatiques.jpg (54) | — | — | 6 (ancien 41) |
| 23 | 23-02 (64, pleine), 23-40 (70, pleine) | — | — | 8 (ancien 42) |
| 24 | 24-01 (76, pleine), 24-02 (78, pleine), 24-12 (82, pleine), 24-11 (85, pleine), 24-14 (88, pleine), 24-15 (89, pleine), 24-06b (95, pleine), 24-06a (96, pleine), 24-07 (97, pleine), 24-08 (98, pleine), 24-09 (99, pleine), 24-10 (100, pleine), 24-13 (102, pleine), 24-03 (103, pleine), 24-04 (104, pleine), 24-16 (105, pleine), 24-05 (79) | — | — | 0 (ancien 26b) |
| 25 | 25-01 (117, pleine), 25-40 (118, pleine), 25-gelure-superficielle-cloques.jpg (110), 25-gelure-profonde.png (111) | — | — | 6 (ancien 03) |
| 26 | 26-40 (125, pleine), 26-11 (133, pleine), 26-08 (135, pleine), 26-09b (136, pleine), 26-09a (137, pleine), 26-04 (132), 26-rougeur-cernee-crayon.jpg (127) | — | — | 7 (ancien 27) |
| 27 | 27-04 (143, pleine), 27-03 (146, pleine), 27-05 (151, pleine), 27-01 (154, pleine), 27-06 (156, pleine), 27-02 (153) | — | — | 0 (ancien 27b) |
| 28 | 28-05 (160, pleine), 28-01 (171, pleine), 28-04 (178, pleine), 28-03 (180, pleine), 28-06 (168), 28-02 (177) | — | — | 0 (ancien 27c) |
| 29 | 29-10 (187, pleine), 29-08 (190, pleine), 29-05 (191, pleine), 29-03 (193, pleine), 29-04 (195, pleine), 29-06 (197, pleine), 29-07 (198, pleine), 29-01 (208, pleine), 29-02 (210, pleine), 29-09 (211) | — | — | 0 (ancien 27d) |
| 30 | 30-01 (224, pleine), 30-40 (226, pleine) | — | — | 7 (ancien 05) |
| 31 | 31-01 (233, pleine), 31-08 (243, pleine), 31-40 (246, pleine), 31-04 (244) | — | — | 6 (ancien 28) |
| 32 | — | — | — | 5 (ancien 29) |
| 33 | 55-berce-du-caucase-tige.jpg (265), 53-berce-laineuse-tige-feuille.jpg (265), 54-berce-du-caucase-plant.jpg (266), 52-berce-laineuse-plant.jpg (266), 51-herbe-a-puce-grimpante.jpg (266), 50-herbe-a-puce-rampante.jpg (267), 49-herbe-a-puce-folioles.jpg (267), 48-actee-rouge-port.jpg (268), 47-actee-rouge-fruits.jpg (268), 44-kalmia-fleur.jpg (268), 43-thuya-ecorce-feuillage.jpg (268), 42-thuya-rameau.jpg (268), 40-if-rameau.jpg (268), 41-if-fruit-graine.jpg (269), 38-veratre-plant.jpg (269), 37-veratre-pousses.jpg (269), 33-cicutaire-rhizome-cloisonne.jpg (269), 39-if-arbuste.jpg (270), 35-cicutaire-tige.jpg (271), 32-quatre-temps-verticille.jpg (271), 34-cicutaire-plant-fleur.jpg (272), 63-herbe-a-puce-trois-folioles.jpg (272), 60-if-du-canada-rameau-cones.jpg (272), 63-aralie-a-tige-nue-folioles.jpg (273), 57-prele-des-marais-tige.jpg (273), 59-thuya-occidental-rameaux-dessus.jpg (273), 56-prele-des-champs-tige.jpg (274), 61-cicutaire-maculee-feuille.jpg (274), 59-thuya-occidental-rameaux-dessous.jpg (274), 61-berle-douce-feuille.jpg (275), 61-berce-laineuse-feuille.jpg (275), 61-angelique-pourpre-feuille.jpg (275), 59-sapin-baumier-aiguilles-dessus-dessous.jpg (275), 58-kalmia-dessous-feuille-comparaison.png (276), 58-the-du-labrador-dessus-dessous.jpg (276), 33-quatre-temps-fruits.jpg (276), 31-myrique-station.jpg (276), 29-comptonie-station.jpg (276), 30-myrique-rameau.jpg (277), 28-comptonie-feuille.jpg (277), 27-savoyane-rhizome.jpg (277), 30-21-achillee-corymbe.jpg (277), 26-savoyane-plant.jpg (278), 33-aralie-rhizome.jpg (278), 30-20-achillee-feuilles.jpg (278), 30-24-aralie-planche-1913.png (279), 30-23-plantain-epi.jpg (279), 30-19-the-labrador-kalmia-tourbiere.jpg (279), 30-22-plantain-rosette.jpg (280), 30-18-the-labrador-feuille-dessous.jpg (280), 30-17-the-labrador-plant-fleur.jpg (280), 30-13-aulne-rugueux-feuilles-chatons.jpg (280), 33-saule-talle.jpg (281), 30-15-saule-discolore-rameaux.jpg (281), 30-11-bouleau-papier-ecorce.jpg (281), 30-14-aulne-rugueux-port.jpg (282), 30-12-bouleau-papier-feuille-herbier.jpg (282), 30-09-meleze-rameau-faisceaux.jpg (282), 30-10-meleze-ecorce.jpg (283), 30-08-epinette-noire-port.jpg (283), 30-07-epinette-noire-cones.jpg (283), 30-06-epinette-blanche-port.jpg (283), 30-05-epinette-blanche-rameau.jpg (283), 30-04-sapin-baumier-port.jpg (284), 30-01-sapin-baumier-rameau-dessus.jpg (284), 72-sapin-baumier-vesicules.jpg (290) | — | — | 15 (ancien 30) |
| 34 | 34-05 (298, pleine), 34-04 (299, pleine), 34-02 (304, pleine), 34-03 (312, pleine), 34-06 (315, pleine) | — | — | 0 (ancien 30b) |
| 35 | — | — | — | 6 (ancien 31) |
| 36 | — | — | — | 6 (ancien 32) |
| 37 | 37-01a (344, pleine), 37-01b (345, pleine), 37-04 (348, pleine), 37-07 (353, pleine), 37-03a (359, pleine), 37-03b (360, pleine), 37-08 (362, pleine), 37-05 (364, pleine), 37-02 (365, pleine), 37-06 (366, pleine) | — | — | 0 (ancien 32b) |
| 38 | 38-02 (373, pleine), 38-04 (377, pleine), 38-01 (386, pleine) | — | — | 0 (ancien 32c) |
| 39 | — | — | — | 8 (ancien 07) |
| 40 | 40-40 (410, pleine) | — | — | 5 (ancien 33) |

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/credits/tome-2-credits.md` et `livre/credits/tome-2-credits.pdf`.

| Page | Ch. | Fichier | Auteur | Licence |
| ---: | --- | --- | --- | --- |
| 22 | 20 | 25-7a-gencives.jpg | Centers for Disease Control and Prevention | Domaine public |
| 23 | 20 | 25-7b-hemorragies-perifolliculaires.png | CDC (photographe non nommé) | Domaine public (agence fédérale américaine, voir la fiche) |
| 29 | 20 | 25-6b-camarine-neige.jpg | Ilya Baidakov | CC BY-NC [NC] |
| 30 | 20 | 25-6c-canneberge-hiver.jpg | Robin Holm | CC BY-SA |
| 30 | 20 | 25-6a-airelle-hiver.jpg | Tero Karppinen, de Finlande | CC BY 2.0 |
| 50 | 22 | 22-poisson-foie-rogue-laitance.jpg | yoyo | CC BY 4.0 — Creative Commons Attribution 4.0 |
| 51 | 22 | 41-5c-lapin-lesions-foyers-blancs.jpg | Ammam I. et coll. | CC BY 4.0 (figure de revue, acceptée le 24 sept. 2026) |
| 54 | 22 | 41-5a-orignal-kystes-hydatiques.jpg | Filip-Hutsch K. et coll. | CC BY 4.0 (figure de revue, acceptée le 24 sept. 2026) |
| 110 | 25 | 25-gelure-superficielle-cloques.jpg | Winky from Oxford, UK | CC BY 2.0 — Creative Commons Attribution 2.0 |
| 111 | 25 | 25-gelure-profonde.png | CheckDO | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 127 | 26 | 26-rougeur-cernee-crayon.jpg | John Campbell | CC0 — Creative Commons Zero, Public Domain Dedication |
| 265 | 33 | 55-berce-du-caucase-tige.jpg | Stefan.lefnaer | CC BY-SA 4.0 |
| 265 | 33 | 53-berce-laineuse-tige-feuille.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 266 | 33 | 54-berce-du-caucase-plant.jpg | anastasiiamerkulova | CC BY 4.0 |
| 266 | 33 | 52-berce-laineuse-plant.jpg | Ryan Hodnett | CC BY-SA 4.0 |
| 266 | 33 | 51-herbe-a-puce-grimpante.jpg | Jvlietstra | Public domain |
| 267 | 33 | 50-herbe-a-puce-rampante.jpg | Forest Service Northern Region from Missoula, MT, USA | Domaine public |
| 267 | 33 | 49-herbe-a-puce-folioles.jpg | Judy Gallagher | CC BY 2.0 |
| 268 | 33 | 48-actee-rouge-port.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 268 | 33 | 47-actee-rouge-fruits.jpg | Neal Herbert | Domaine public |
| 268 | 33 | 44-kalmia-fleur.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 268 | 33 | 43-thuya-ecorce-feuillage.jpg | MONGO | Domaine public |
| 268 | 33 | 42-thuya-rameau.jpg | Nomadluap (œuvre dérivée : MPF) | CC BY 3.0 |
| 268 | 33 | 40-if-rameau.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 269 | 33 | 41-if-fruit-graine.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 269 | 33 | 38-veratre-plant.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 269 | 33 | 37-veratre-pousses.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 269 | 33 | 33-cicutaire-rhizome-cloisonne.jpg | Stefan.lefnaer | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 270 | 33 | 39-if-arbuste.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 271 | 33 | 35-cicutaire-tige.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 271 | 33 | 32-quatre-temps-verticille.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 272 | 33 | 34-cicutaire-plant-fleur.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 272 | 33 | 63-herbe-a-puce-trois-folioles.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 272 | 33 | 60-if-du-canada-rameau-cones.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 273 | 33 | 63-aralie-a-tige-nue-folioles.jpg | Fritzflohrreynolds | CC BY-SA 3.0 |
| 273 | 33 | 57-prele-des-marais-tige.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 273 | 33 | 59-thuya-occidental-rameaux-dessus.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 274 | 33 | 56-prele-des-champs-tige.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 274 | 33 | 61-cicutaire-maculee-feuille.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 274 | 33 | 59-thuya-occidental-rameaux-dessous.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 275 | 33 | 61-berle-douce-feuille.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 275 | 33 | 61-berce-laineuse-feuille.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 275 | 33 | 61-angelique-pourpre-feuille.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 275 | 33 | 59-sapin-baumier-aiguilles-dessus-dessous.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 276 | 33 | 58-kalmia-dessous-feuille-comparaison.png | Qwertygiy | CC0 |
| 276 | 33 | 58-the-du-labrador-dessus-dessous.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 276 | 33 | 33-quatre-temps-fruits.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 276 | 33 | 31-myrique-station.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 276 | 33 | 29-comptonie-station.jpg | Rob Routledge, Sault College, Bugwood.org | CC BY 3.0 |
| 277 | 33 | 30-myrique-rameau.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 277 | 33 | 28-comptonie-feuille.jpg | Jomegat | CC BY-SA 3.0 |
| 277 | 33 | 27-savoyane-rhizome.jpg | Charles de Mille-Isles from Mille-Isles, Canada | CC BY 2.0 |
| 277 | 33 | 30-21-achillee-corymbe.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 278 | 33 | 26-savoyane-plant.jpg | Joshua Mayer from Madison, WI, USA | CC BY-SA 2.0 |
| 278 | 33 | 33-aralie-rhizome.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 278 | 33 | 30-20-achillee-feuilles.jpg | NY State IPM Program at Cornell University from New York, USA | CC BY 2.0 |
| 279 | 33 | 30-24-aralie-planche-1913.png | USDA-NRCS PLANTS Database / Britton, N. L., et A. Brown, 1913 | Public domain |
| 279 | 33 | 30-23-plantain-epi.jpg | Sanjay Acharya | CC BY-SA 4.0 |
| 279 | 33 | 30-19-the-labrador-kalmia-tourbiere.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 280 | 33 | 30-22-plantain-rosette.jpg | Lawn Weeds | CC BY 2.0 |
| 280 | 33 | 30-18-the-labrador-feuille-dessous.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 280 | 33 | 30-17-the-labrador-plant-fleur.jpg | Jacob W. Frank | Public domain |
| 280 | 33 | 30-13-aulne-rugueux-feuilles-chatons.jpg | NPS | Public domain |
| 281 | 33 | 33-saule-talle.jpg | (c) John Baur, some rights reserved (CC BY) | CC BY |
| 281 | 33 | 30-15-saule-discolore-rameaux.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 281 | 33 | 30-11-bouleau-papier-ecorce.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 282 | 33 | 30-14-aulne-rugueux-port.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 282 | 33 | 30-12-bouleau-papier-feuille-herbier.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 282 | 33 | 30-09-meleze-rameau-faisceaux.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 283 | 33 | 30-10-meleze-ecorce.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 283 | 33 | 30-08-epinette-noire-port.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 283 | 33 | 30-07-epinette-noire-cones.jpg | Alaska Region U.S. Fish & Wildlife Service | Public domain |
| 283 | 33 | 30-06-epinette-blanche-port.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 283 | 33 | 30-05-epinette-blanche-rameau.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 284 | 33 | 30-04-sapin-baumier-port.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 284 | 33 | 30-01-sapin-baumier-rameau-dessus.jpg | Ayotte, Gilles, 1948- | CC BY-SA 4.0 |
| 290 | 33 | 72-sapin-baumier-vesicules.jpg | Treetime.ca | CC BY-SA 3.0 |

Photos téléchargées pour ces chapitres et non posées (images de référence ou photos à placer) :

- ch. 20 (ancien 25) : `25-gelure-superficielle-cloques.jpg`, `25-gelure-profonde.png`
- ch. 21 (ancien 26) : `26-rougeur-cernee-crayon.jpg`, `26-rougeur-jour1.jpg`, `26-rougeur-jour3.jpg`
- ch. 22 (ancien 41) : `41-1a-langue-boeuf.jpg`, `41-1b-coeur-boeuf.jpg`, `41-1c-poumon-boeuf.jpg`, `41-1d-rate-boeuf.jpg`, `41-1e-intestin-boeuf-etale.jpg`, `41-5b-lievre-cap-lesions-organes.jpg`
- ch. 30 (ancien 05) : `05-boites-rouillees-serti.jpg`, `05-boite-bombee.jpg`
- ch. 33 (ancien 30) : `30-02-sapin-baumier-aiguille-dessous.jpg`, `30-03-sapin-baumier-ecorce-vesicules.jpg`, `46-kalmia-the-labrador-station.jpg`
- ch. 34 (ancien 30b) : `26-savoyane-plant.jpg`, `27-savoyane-rhizome.jpg`, `28-comptonie-feuille.jpg`, `29-comptonie-station.jpg`, `30-myrique-rameau.jpg`, `31-myrique-station.jpg`, `32-quatre-temps-verticille.jpg`, `33-quatre-temps-fruits.jpg`, `34-cicutaire-plant-fleur.jpg`, `35-cicutaire-tige.jpg`, `37-veratre-pousses.jpg`, `38-veratre-plant.jpg`, `39-if-arbuste.jpg`, `40-if-rameau.jpg`, `41-if-fruit-graine.jpg`, `42-thuya-rameau.jpg`, `43-thuya-ecorce-feuillage.jpg`, `44-kalmia-fleur.jpg`, `46-kalmia-the-labrador-station.jpg`, `47-actee-rouge-fruits.jpg`, `48-actee-rouge-port.jpg`, `49-herbe-a-puce-folioles.jpg`, `50-herbe-a-puce-rampante.jpg`
- ch. 40 (ancien 33) : `33-aralie-rhizome.jpg`, `33-cicutaire-rhizome-cloisonne.jpg`, `33-saule-talle.jpg`

## Avertissements

- ch. 22, paginateur : p22-10 : page à moitié vide
- ch. 31, paginateur : p31-11 : page à moitié vide
- ch. 34, paginateur : p34-14 : page à moitié vide
- ch. 35, paginateur : p35-7 : page à moitié vide
- ch. 39, paginateur : p39-6 : page à moitié vide

## À savoir avant de téléverser

- **Onglet de tranche.** Le numéro de chapitre de l'onglet (en haut, au bord extérieur) est imprimé à moins de 0,1 po du rognage, hors de la zone sûre de Blurb (0,25 po) ; la coupe varie de 1/16 po. L'onglet est fait pour déborder, mais le chiffre peut être entamé. À voir sur l'épreuve papier. Pour les chapitres à trois chiffres (100 à 112), le chiffre est à 12 pt au lieu de 15 (à 15 pt, « 102 » dépasse le rognage) : réglage de `couleur.css` depuis le 28 septembre 2026, le même dans les rendus de chapitre seuls.
- **Petit fond.** Le bloc de texte est à 0,5 po de la reliure : conforme au tableau du calculateur (0,5), pas au paragraphe de la même page (0,625). Le livre de 440 pages ouvre mal au centre : à juger sur épreuve.
- **Page du logo Blurb.** Blurb ajoute une page de logo à la fin, hors compte, sauf option payante.
- **Aperçus.** Les PNG de `apercus/` sont pris sur les pages HTML qui ont servi à l'impression, rognées à 8 × 10 po (sans fond perdu).
