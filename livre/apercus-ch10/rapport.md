# Tome 1 · Tenir — rapport d'assemblage

- **Produit le :** 2026-10-18 14:37, par `design/outils/assembler-tome.py 1 --chapitres 10 --hors-ligne --sortie livre/apercus-ch10`
- **Fichier :** `livre/tome-1/interieur.pdf` — 38 pages, 8.4 Mo
- **Ouvertures :** toujours au recto (page de droite), une page blanche devant au besoin
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-1.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1 | Dédicace | 1 |
| 3 | Page de titre | 1 |
| 5 | Sommaire | 1 |
| 6 | Comment le livre fonctionne (1) | 1 |
| 7 | Comment le livre fonctionne (2) | 1 |
| 8–18 | Les dangers | 11 |
| 19–38 | ch. 10 — Eau : puiser, filtrer, désinfecter | 20 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 2 |
| | **Total** | **38** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/apercus-ch10/credits/tome-1-credits.md` et `livre/apercus-ch10/credits/tome-1-credits.pdf`.

Les chapitres seuls font 20 pages ; 0 blanche(s) servent à faire ouvrir chaque chapitre à droite. Avec `--verso` (un chapitre peut ouvrir à gauche), le tome ferait 24 pages.

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 38 | oui |
| Page 1 | à droite | ouverture du chapitre 00 | oui |
| Polices incorporées | toutes | 20 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 8.4 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : IBMPlexSansCond-Bold, IBMPlexSansCond-Medium, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, IBMPlexSerif-SemiBoldItalic, LiberationSerif, LiberationSerif-Italic, Type 3 sans nom (texte des planches)

**Caractères tombés hors des polices du livre** (IBM Plex, et les Noto chargées pour ce que Plex n'a pas) : le navigateur les a pris dans une police de secours (incorporée, donc imprimable, mais d'un autre dessin que le texte) :

| Caractère | Unicode | Police de secours | Pages du tome |
| --- | --- | --- | --- |
| ③ | U+2462 | Type 3 sans nom | 7 |

## Tranche et couverture

Calculateur non interrogé (--hors-ligne). Relevé du 27 septembre 2026 dans `sources/blurb-specifications.md` §2 ; pour 38 pages, prendre la ligne du tableau dont le palier couvre ce nombre, et revérifier au calculateur. [À VÉRIFIER]

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 10 | 10-02 (33, pleine), 10-07 (35, pleine), 10-01 (24), 10-08 (25, à valider), 10-03 (37), 10-eau-livre (22, double page), 10-hutte-castor.jpg (21) | — | — | 6 (ancien 13) |

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/apercus-ch10/credits/tome-1-credits.md` et `livre/apercus-ch10/credits/tome-1-credits.pdf`.

| Page | Ch. | Fichier | Auteur | Licence |
| ---: | --- | --- | --- | --- |
| 21 | 10 | 10-hutte-castor.jpg | U.S. Fish and Wildlife Service - Midwest Region | Public domain |

Photos téléchargées pour ces chapitres et non posées (images de référence ou photos à placer) :

- ch. 10 (ancien 13) : `13-amadou-ecorce-et-gomme.jpg`, `13-bouleau-ecorce-rubans.jpg`, `13-gomme-epinette.jpg`

## Avertissements

- ch. 10, constructeur : exergue sans ancrage E. Désinfecter

## À savoir avant de téléverser

- **Onglet de tranche.** Le numéro de chapitre de l'onglet (en haut, au bord extérieur) est imprimé à moins de 0,1 po du rognage, hors de la zone sûre de Blurb (0,25 po) ; la coupe varie de 1/16 po. L'onglet est fait pour déborder, mais le chiffre peut être entamé. À voir sur l'épreuve papier. Pour les chapitres à trois chiffres (100 à 112), le chiffre est à 12 pt au lieu de 15 (à 15 pt, « 102 » dépasse le rognage) : réglage de `couleur.css` depuis le 28 septembre 2026, le même dans les rendus de chapitre seuls.
- **Petit fond.** Le bloc de texte est à 0,5 po de la reliure : conforme au tableau du calculateur (0,5), pas au paragraphe de la même page (0,625). Le livre de 440 pages ouvre mal au centre : à juger sur épreuve.
- **Page du logo Blurb.** Blurb ajoute une page de logo à la fin, hors compte, sauf option payante.
- **Aperçus.** Les PNG de `apercus/` sont pris sur les pages HTML qui ont servi à l'impression, rognées à 8 × 10 po (sans fond perdu).
