# Tome 1 · Tenir — rapport d'assemblage

- **Produit le :** 2026-10-19 01:16, par `design/outils/assembler-tome.py 1 --chapitres 15 --hors-ligne --sortie livre/apercus-ch15`
- **Fichier :** `livre/tome-1/interieur.pdf` — 36 pages, 6.1 Mo
- **Ouvertures :** au recto ou au verso (--verso)
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-1.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1 | Page de titre | 1 |
| 3 | Dédicace | 1 |
| 5 | Sommaire | 1 |
| 6 | Comment le livre fonctionne (1) | 1 |
| 7 | Comment le livre fonctionne (2) | 1 |
| 8–16 | Les dangers | 9 |
| 17–36 | ch. 15 — Se déplacer et le carburant | 20 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 2 |
| | **Total** | **36** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/apercus-ch15/credits/tome-1-credits.md` et `livre/apercus-ch15/credits/tome-1-credits.pdf`.

## Premières minutes (série orange)

Marqueur `{.orange}` sur l'intertitre ### de la série, dans le Markdown (CLAUDE.md, « Les premières minutes, en orange ») : encadré orange, repère orange sur la tranche, colonne orange au sommaire.

| Ch. | Pages du tome |
| --- | --- |
| 15 | 20, 21, 23, 24, 25 |

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 36 | oui |
| Page 1 | à droite | page de titre | oui |
| Polices incorporées | toutes | 24 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 6.1 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : BarlowCondensed-Bold, BarlowCondensed-ExtraBold, BarlowCondensed-Medium, BarlowCondensed-SemiBold, IBMPlexSansCond-Bold, IBMPlexSansCond-Medium, IBMPlexSansCond-Regular, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, LiberationSerif, LiberationSerif-Italic, Type 3 sans nom (texte des planches)

**Caractères tombés hors des polices du livre** (IBM Plex, et les Noto chargées pour ce que Plex n'a pas) : le navigateur les a pris dans une police de secours (incorporée, donc imprimable, mais d'un autre dessin que le texte) :

| Caractère | Unicode | Police de secours | Pages du tome |
| --- | --- | --- | --- |
| ③ | U+2462 | Type 3 sans nom | 7 |

## Tranche et couverture

Calculateur non interrogé (--hors-ligne). Relevé du 27 septembre 2026 dans `sources/blurb-specifications.md` §2 ; pour 36 pages, prendre la ligne du tableau dont le palier couvre ce nombre, et revérifier au calculateur. [À VÉRIFIER]

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 15 | 15-01 (22, pleine, à valider), 15-02 (32, pleine, à valider), 15-03 (28, à valider), 15-05 (29, à valider), 15-06 (34, à valider), 15-04 (35, à valider), 15-se-deplacer-livre (18, double page) | — | — | 8 (ancien 20) |

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/apercus-ch15/credits/tome-1-credits.md` et `livre/apercus-ch15/credits/tome-1-credits.pdf`.

Aucune photo posée dans ce tome. Les photos téléchargées sous les anciens numéros de ces chapitres ne s'impriment pas tant qu'aucun placement ne les pose.

## Avertissements

- ch. 15, paginateur : p15-5 : page à moitié vide
- ch. 15, constructeur : 15-03 : aucun ancrage trouvé, placé à la fin de la procédure
- ch. 15, constructeur : 15-05 : aucun ancrage trouvé, placé à la fin de la procédure

## À savoir avant de téléverser

- **Onglet de tranche.** Le numéro de chapitre de l'onglet (en haut, au bord extérieur) est imprimé à moins de 0,1 po du rognage, hors de la zone sûre de Blurb (0,25 po) ; la coupe varie de 1/16 po. L'onglet est fait pour déborder, mais le chiffre peut être entamé. À voir sur l'épreuve papier. Pour les chapitres à trois chiffres (100 à 112), le chiffre est à 12 pt au lieu de 15 (à 15 pt, « 102 » dépasse le rognage) : réglage de `couleur.css` depuis le 28 septembre 2026, le même dans les rendus de chapitre seuls.
- **Petit fond.** Le bloc de texte est à 0,5 po de la reliure : conforme au tableau du calculateur (0,5), pas au paragraphe de la même page (0,625). Le livre de 440 pages ouvre mal au centre : à juger sur épreuve.
- **Page du logo Blurb.** Blurb ajoute une page de logo à la fin, hors compte, sauf option payante.
- **Aperçus.** Les PNG de `apercus/` sont pris sur les pages HTML qui ont servi à l'impression, rognées à 8 × 10 po (sans fond perdu).
