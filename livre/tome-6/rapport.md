# Tome 6 · L’atelier — rapport d'assemblage

- **Produit le :** 2026-10-14 21:43, par `design/outils/assembler-tome.py 6 --hors-ligne`
- **Fichier :** `livre/tome-6/interieur.pdf` — 202 pages, 31.2 Mo
- **Ouvertures :** toujours au recto (page de droite), une page blanche devant au besoin
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-6.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1 | Page de titre | 1 |
| 3 | Dédicace | 1 |
| 5 | Sommaire | 1 |
| 7–23 | ch. 102 — De la peau au cuir | 17 |
| 25–42 | ch. 103 — Babiche, tendons, cordage | 18 |
| 43–60 | ch. 104 — Coudre et chausser | 18 |
| 61–76 | ch. 105 — Affûter, limer, aiguiser | 16 |
| 77–92 | ch. 106 — Scie à chaîne et petits moteurs | 16 |
| 93–109 | ch. 107 — Souder, braser, réparer le métal | 17 |
| 111–124 | ch. 108 — Le stock de pièces et de consommables | 14 |
| 125–147 | ch. 109 — Leviers, poulies, treuils | 23 |
| 149–165 | ch. 110 — Assemblages bois-bois | 17 |
| 167–184 | ch. 111 — Trempe et travail du métal à chaud | 18 |
| 185–201 | ch. 112 — Savon et chandelles | 17 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 8 |
| | **Total** | **202** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/credits/tome-6-credits.md` et `livre/credits/tome-6-credits.pdf`.

Les chapitres seuls font 191 pages ; 5 blanche(s) servent à faire ouvrir chaque chapitre à droite. Avec `--verso` (un chapitre peut ouvrir à gauche), le tome ferait 194 pages.

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 202 | oui |
| Page 1 | à droite | page de titre | oui |
| Polices incorporées | toutes | 50 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 31.2 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : IBMPlexSansCond-Bold, IBMPlexSansCond-Medium, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, IBMPlexSerif-SemiBoldItalic, LiberationSerif, LiberationSerif-Italic, NotoSansSymbols2-Regular, NotoSerif-Regular, Type 3 sans nom (texte des planches)

## Tranche et couverture

Calculateur non interrogé (--hors-ligne). Relevé du 27 septembre 2026 dans `sources/blurb-specifications.md` §2 ; pour 202 pages, prendre la ligne du tableau dont le palier couvre ce nombre, et revérifier au calculateur. [À VÉRIFIER]

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 102 | 102-02 (11, pleine), 102-40 (15, pleine), 102-07 (22, pleine), 102-cuir-chamoise-non-fume.jpg (12), 102-cuir-tanne-vegetal.jpg (12) | — | — | 8 (ancien 79) |
| 103 | 103-40 (29, pleine), 103-05 (30, pleine), 103-10 (32, pleine), 103-07 (33, pleine), 103-11 (34, pleine) | — | — | 8 (ancien 80) |
| 104 | 104-02 (46, pleine), 104-40 (47, pleine), 104-04 (49, pleine), 104-15a (51, pleine), 104-15b (52, pleine) | — | — | 8 (ancien 81) |
| 105 | 105-40 (73, pleine), 105-01 (63), 105-07 (66), 105-03 (67) | — | — | 8 (ancien 82) |
| 106 | 106-10a (89, pleine), 106-10b (90, pleine), 106-01 (80), 83-09-carburateur-membranes-monte.jpg (82) | — | — | 8 (ancien 83) |
| 107 | 107-10 (108, pleine), 107-02 (96), 107-03 (99), 107-09 (105), 107-07 (106) | — | — | 7 (ancien 84) |
| 108 | 108-pile-gonflee.jpg (124) | — | — | 6 (ancien 85) |
| 109 | 109-40 (132, pleine), 109-02 (134, pleine), 109-08 (142, pleine), 109-01 (144, pleine), 109-12 (145, pleine), 109-cable-fils-casses.jpg (128), 109-cable-fils-casses-bout.jpg (128) | — | — | 7 (ancien 86) |
| 110 | 110-40 (152, pleine), 110-01a (154, pleine), 110-03 (156, pleine), 110-01b (163, pleine), 87-07b-bouleau-pourriture-brune.jpg (164), 87-07c-bouleau-pourriture-blanche.jpg (164), 87-07a-pourritures-brune-blanche.jpg (164) | — | — | 7 (ancien 87) |
| 111 | 111-40 (172, pleine), 111-11 (181, pleine), 88-06a-cassures-acier-1918.jpg (169), 111-revenu-bande.jpg (173), 111-revenu-etalons.jpg (173) | — | — | 9 (ancien 88) |
| 112 | 112-40 (191, pleine), 112-10a (198, pleine), 112-10b (199, pleine), 112-41 (188), 112-07 (192) | — | — | 9 (ancien 89) |

**Photos sous 150 PPI à la taille imprimée :** 87-07b-bouleau-pourriture-brune.jpg : 147 PPI; 87-07c-bouleau-pourriture-blanche.jpg : 147 PPI

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/credits/tome-6-credits.md` et `livre/credits/tome-6-credits.pdf`.

| Page | Ch. | Fichier | Auteur | Licence |
| ---: | --- | --- | --- | --- |
| 12 | 102 | 102-cuir-chamoise-non-fume.jpg | Johan | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 12 | 102 | 102-cuir-tanne-vegetal.jpg | Fujisun | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 82 | 106 | 83-09-carburateur-membranes-monte.jpg | Markus Säynevirta | CC BY-SA 3.0 |
| 124 | 108 | 108-pile-gonflee.jpg | Encik Tekateki | CC0 — Creative Commons Zero, Public Domain Dedication |
| 128 | 109 | 109-cable-fils-casses.jpg | Nationaal Archief | CC0 — Creative Commons Zero, Public Domain Dedication |
| 128 | 109 | 109-cable-fils-casses-bout.jpg | Flickr.com user "tanakawho" | CC BY 2.0 — Creative Commons Attribution 2.0 |
| 164 | 110 | 87-07b-bouleau-pourriture-brune.jpg | Sten Porse | CC BY-SA 3.0 |
| 164 | 110 | 87-07c-bouleau-pourriture-blanche.jpg | Sten Porse | CC BY-SA 3.0 |
| 164 | 110 | 87-07a-pourritures-brune-blanche.jpg | Mätes | CC BY-SA 3.0 |
| 169 | 111 | 88-06a-cassures-acier-1918.jpg | Carnegie Steel Company | No restrictions (1918) |
| 173 | 111 | 111-revenu-bande.jpg | Zaereth | CC0 — Creative Commons Zero, Public Domain Dedication |
| 173 | 111 | 111-revenu-etalons.jpg | Zaereth | CC0 — Creative Commons Zero, Public Domain Dedication |

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
