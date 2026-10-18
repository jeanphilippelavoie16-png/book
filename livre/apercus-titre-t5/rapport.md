# Tome 5 · La forêt, le jardin et le chalet — rapport d'assemblage

- **Produit le :** 2026-10-18 22:23, par `design/outils/assembler-tome.py 5 --chapitres 82 --hors-ligne --sortie livre/apercus-titre-t5`
- **Fichier :** `livre/tome-5/interieur.pdf` — 24 pages, 9.0 Mo
- **Ouvertures :** au recto ou au verso (--verso)
- **Placements :** design/epreuves-livre/placements.json, design/epreuves-livre/placements-tome-5.json
- **Exigences de Blurb :** `sources/blurb-specifications.md` (relevées le 27 septembre 2026)

## Pages

| Pages du tome | Contenu | Pages |
| --- | --- | ---: |
| 1 | Page de titre | 1 |
| 3 | Dédicace | 1 |
| 5 | Sommaire | 1 |
| 6–24 | ch. 82 — Le feu au chalet | 19 |
| | Pages blanches (verso de la page de titre, avant les ouvertures, fin du tome) | 2 |
| | **Total** | **24** |

Aucune page de crédits (JP, 28 septembre 2026) : copie hors du livre dans `livre/apercus-titre-t5/credits/tome-5-credits.md` et `livre/apercus-titre-t5/credits/tome-5-credits.pdf`.

## Contrôle Blurb

| Exigence | Valeur voulue | Ce fichier | Conforme |
| --- | --- | --- | --- |
| Taille de chaque page | 585 × 738 pt (8,125 × 10,25 po) | 585.0 × 738.0 pt | oui |
| Rognage (TrimBox) | 8 × 10 po, fond perdu au bord extérieur | recto : reliure à gauche ; verso : à droite | oui |
| Nombre de pages | pair, de 20 à 440 (papier Standard) | 24 | oui |
| Page 1 | à droite | page de titre | oui |
| Polices incorporées | toutes | 19 police(s), 0 non incorporée(s) | oui |
| Taille du fichier | 2 Go au plus | 9.0 Mo | oui |
| Marques d'imprimeur | aucune | aucune | oui |
| Couleur | CMJN ou sRVB, sans ton direct | sRVB (Edge) | oui |
| Noir du texte | 100 % K | noir sRVB (0, 0, 0) : la conversion est faite chez Blurb | à juger sur épreuve |
| PDF/X | plus exigé en 2026 (le guide de 2010 le demandait) | PDF 1.4 d'Edge, pas PDF/X | à surveiller au téléversement |

Polices du fichier : BarlowCondensed-Bold, BarlowCondensed-ExtraBold, BarlowCondensed-Medium, BarlowCondensed-SemiBold, IBMPlexSansCond-Bold, IBMPlexSansCond-Medium, IBMPlexSansCond-SemiBold, IBMPlexSansCond-SemiBoldItalic, IBMPlexSerif-Bold, IBMPlexSerif-Italic, IBMPlexSerif-Regular, IBMPlexSerif-SemiBold, LiberationSerif, LiberationSerif-Italic

## Tranche et couverture

Calculateur non interrogé (--hors-ligne). Relevé du 27 septembre 2026 dans `sources/blurb-specifications.md` §2 ; pour 24 pages, prendre la ligne du tableau dont le palier couvre ce nombre, et revérifier au calculateur. [À VÉRIFIER]

## Figures

Les planches de `images/a-valider/` sont posées comme les validées (JP les relit dans les pages) : elles portent « à valider » dans la colonne des figures posées.

| Ch. | Posées (page du tome) | Mentionnées dans le texte sans planche dessinée | À valider, non posées | Photos demandées encore à acquérir (credits.md) |
| --- | --- | --- | --- | ---: |
| 82 | 82-08a (17, pleine), 82-08b (18, pleine), 82-10a (19, pleine), 82-10b (21, pleine), 82-12a (22, pleine), 82-12b (23, pleine), 83-creosote-vitrifiee-conduit.jpg (8), 83-suie-poudreuse.jpg (8), 83-conduit-bouche-apres-feu.jpg (9) | — | — | 7 (ancien 16) |

## Crédits des images — hors du livre

Rien ne s'imprime (JP, 28 septembre 2026). Copie de sauvegarde : `livre/apercus-titre-t5/credits/tome-5-credits.md` et `livre/apercus-titre-t5/credits/tome-5-credits.pdf`.

| Page | Ch. | Fichier | Auteur | Licence |
| ---: | --- | --- | --- | --- |
| 8 | 82 | 83-creosote-vitrifiee-conduit.jpg | Oskar4432 | CC BY-SA 4.0 — Creative Commons Attribution-Share Alike 4.0 |
| 8 | 82 | 83-suie-poudreuse.jpg | Rasbak | CC BY-SA 3.0 — Creative Commons Attribution-Share Alike 3.0 |
| 9 | 82 | 83-conduit-bouche-apres-feu.jpg | Marco77 | CC BY-SA 3.0 de — Creative Commons Attribution-Share Alike 3.0 de |

## Avertissements

- aucun

## À savoir avant de téléverser

- **Onglet de tranche.** Le numéro de chapitre de l'onglet (en haut, au bord extérieur) est imprimé à moins de 0,1 po du rognage, hors de la zone sûre de Blurb (0,25 po) ; la coupe varie de 1/16 po. L'onglet est fait pour déborder, mais le chiffre peut être entamé. À voir sur l'épreuve papier. Pour les chapitres à trois chiffres (100 à 112), le chiffre est à 12 pt au lieu de 15 (à 15 pt, « 102 » dépasse le rognage) : réglage de `couleur.css` depuis le 28 septembre 2026, le même dans les rendus de chapitre seuls.
- **Petit fond.** Le bloc de texte est à 0,5 po de la reliure : conforme au tableau du calculateur (0,5), pas au paragraphe de la même page (0,625). Le livre de 440 pages ouvre mal au centre : à juger sur épreuve.
- **Page du logo Blurb.** Blurb ajoute une page de logo à la fin, hors compte, sauf option payante.
- **Aperçus.** Les PNG de `apercus/` sont pris sur les pages HTML qui ont servi à l'impression, rognées à 8 × 10 po (sans fond perdu).
