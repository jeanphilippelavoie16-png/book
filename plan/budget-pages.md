# Budget de pages — arbitrage du format

> **Anciens numéros.** Ce document date d'avant les deux renumérotations (six tomes le 24 septembre
> 2026, agriculture au tome 5 le 27 septembre) : ses numéros de chapitre et de tome sont les anciens.
> Correspondance : `plan/renumerotation.json`, puis `plan/renumerotation-2.json`.

**Contrainte :** 8 × 10 po, Blurb photo book, **440 pages maximum par tome**, papier standard couleur.
**Densité de référence :** 700 mots utiles par page (`CLAUDE.md`, calibrée au chapitre 63).

Ce document chiffre. Il ne tranche pas.

---

## 0. Mise à jour du 24 septembre 2026 — les 104 chapitres, mots réels

Les parties 1 à 7 ci-dessous datent du 21 septembre (89 chapitres, mots utiles des fiches,
section 10 comprise). Elles gardent leur valeur de méthode et de leviers, pas leurs chiffres.
Depuis : 104 chapitres écrits (00, 00b, 16b et les douze nouveaux), des chapitres qui ont grossi
aux vérifications et aux corrections, plus de section 10 imprimée, 112 pages de planches validées
et 234 photos téléchargées.

**Méthode.**

- **Texte :** `wc -w` sur chaque fichier de `chapitres/`, le 24 septembre, divisé par 700. `wc`
  compte aussi les barres de tableau et les tirets isolés : c'est un plafond. La colonne « texte,
  mots nets » ne garde que les mots qui portent une lettre ou un chiffre.
- **Planches validées :** les 112 PNG de `images/validees/`, rangés au chapitre de leur numéro, à
  leur format réel : 1360 × 1652 px = pleine page (84), 1360 × 826 = demi-page (25), 680 × 826 =
  quart de page (3).
- **Images demandées :** les 802 lignes d'origine de `images/credits.md`, au format déclaré, avec le
  barème du §2. Les lignes « volet » ajoutées le 24 septembre ne sont pas recomptées. Les 234 photos
  téléchargées remplissent une partie de ces lignes : elles ne s'ajoutent pas, elles sont données
  pour mémoire.
- **Appareil :** les coefficients du §2 sans la section 10 — frais de mise en pages des images
  (+15 % et légende), ouverture au recto (0,5 p. par chapitre), titres de partie (10 / 6 / 8 / 10 p.),
  liminaires (4 p. + 0,12 par chapitre), index (4 % du corps), crédits (45 entrées par page),
  glossaire et conversions (3 p.). Total arrondi au pair supérieur.
- **Tomes :** 00 et 00b au tome 1, qu'ils ouvrent ; chaque chapitre nouveau au tome de son numéro.

| Tome | Ch. | Mots (`wc -w`) | Pages de texte | Texte, mots nets | Planches validées (fichiers · pages) | Images demandées (lignes · pages) | Photos téléchargées | Texte + planches + images | Avec l'appareil | Marge sur 440 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 — Tenir | 32 | 287 265 | 410 | 392 | 27 · 26,0 | 151 · 61,5 | 0 | 498 | **574** | **−134** |
| 2 — Le corps | 11 | 91 500 | 131 | 124 | 10 · 8,5 | 130 · 47,2 | 71 | 186 | **228** | +212 |
| 3 — Prélever | 31 | 257 250 | 368 | 348 | 24 · 20,5 | 297 · 121,5 | 136 | 510 | **596** | **−156** |
| 4 — Conserver et réparer | 30 | 255 912 | 366 | 346 | 51 · 42,2 | 224 · 91,5 | 27 | 499 | **582** | **−142** |
| **Ensemble** | **104** | **891 927** | **1 274** | 1 210 | 112 · 97,2 | 802 · 321,8 | 234 | **1 693** | **1 980** | |

**Le verdict.**

- **Le tome 3 déborde le plus : 596 pages avec l'appareil, 156 de trop.** Le texte seul
  en fait déjà 368 : les quatre chapitres nouveaux (35b, 35c, 35d, 43b) y ajoutent 66
  pages de texte, avant les 57 photos que le 35c demande.
- **Les tomes 4 et 1 débordent aussi**, de 142 et de 134 pages. Aucun des trois ne tient
  même sans l'appareil : texte, planches et images font déjà 498, 510 et 499 pages, et
  encore 479, 490 et 480 en mots nets.
- **Le tome 2 a de la place : 228 pages, 212 de marge.** Les six chapitres prévus (26b,
  27c, 27d, 30b, 32b, 32c), à la moyenne des onze chapitres nouveaux complets (≈ 10 800 mots `wc`),
  ajouteraient ≈ 93 pages de texte, soit ≈ 100 avec l'appareil : le tome 2 resterait sous 440.
- **Le livre entier fait ≈ 1 980 pages** avec l'appareil. Quatre tomes de 440 en portent
  1 760 : aucun déplacement de chapitres entre les quatre tomes ne ferme l'écart. Les leviers de la
  partie 4 (sauf B, la section 10 étant déjà sortie) et la question des cinq volumes (G) sont à
  reprendre avec ces chiffres.

**Ce que ce compte ne prend pas.**

- Les images des quinze chapitres qui n'ont aucune ligne dans `images/credits.md` (00, 00b, 16b et les
  douze nouveaux) : ni les 57 photos et les gabarits grandeur nature du 35c (le plan de match lui
  prête 18 à 25 pages), ni
  les planches que les fiches des chapitres nouveaux demandent (`planchesVoulues`).
- Le recoupement entre planches validées et lignes de `credits.md` : une planche qui remplace une image
  demandée est comptée deux fois. Le total est un plafond de ce côté.
- La densité réelle : 700 mots par page reste le chiffre du pilote. La mesure du §7 (mettre en pages
  trois chapitres pour de vrai) n'est toujours pas faite.

### Le détail par chapitre

| Ch. | Tome | Mots (`wc -w`) | Pages de texte | Planches validées (fichiers · pages) | Images demandées (lignes · pages) | Photos téléchargées |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 00 | 1 | 6 046 | 8,6 | — | — | — |
| 00b | 1 | 14 292 | 20,4 | — | — | — |
| 01 | 1 | 7 597 | 10,9 | — | 6 · 2,75 | — |
| 02 | 1 | 8 065 | 11,5 | — | 6 · 3,00 | — |
| 03 | 1 | 7 143 | 10,2 | 1 · 1,00 | 6 · 3,00 | — |
| 04 | 1 | 11 057 | 15,8 | 3 · 3,00 | 7 · 3,00 | — |
| 05 | 1 | 7 959 | 11,4 | 1 · 1,00 | 7 · 3,00 | — |
| 06 | 1 | 8 006 | 11,4 | 2 · 2,00 | 6 · 2,75 | — |
| 07 | 1 | 7 750 | 11,1 | — | 8 · 2,50 | — |
| 08 | 1 | 9 590 | 13,7 | — | 5 · 2,50 | — |
| 09 | 1 | 8 055 | 11,5 | — | 5 · 2,25 | — |
| 10 | 1 | 10 113 | 14,4 | — | 5 · 1,75 | — |
| 11 | 1 | 8 487 | 12,1 | — | 6 · 2,75 | — |
| 12 | 1 | 8 236 | 11,8 | 1 · 1,00 | 7 · 3,00 | — |
| 13 | 1 | 9 997 | 14,3 | 4 · 3,00 | 6 · 2,25 | — |
| 14 | 1 | 9 238 | 13,2 | 2 · 2,00 | 7 · 2,75 | — |
| 14b | 1 | 9 061 | 12,9 | — | — | — |
| 15 | 1 | 8 126 | 11,6 | 1 · 1,00 | 9 · 3,25 | — |
| 15b | 1 | 11 491 | 16,4 | — | — | — |
| 16 | 1 | 8 273 | 11,8 | 4 · 4,00 | 7 · 3,25 | — |
| 16b | 1 | 10 445 | 14,9 | — | — | — |
| 16c | 1 | 10 730 | 15,3 | — | — | — |
| 17 | 1 | 7 024 | 10,0 | 3 · 3,00 | 6 · 2,75 | — |
| 18 | 1 | 8 472 | 12,1 | — | 7 · 2,50 | — |
| 18b | 1 | 12 103 | 17,3 | — | — | — |
| 19 | 1 | 7 763 | 11,1 | 1 · 1,00 | 7 · 2,50 | — |
| 20 | 1 | 8 973 | 12,8 | 1 · 1,00 | 8 · 3,00 | — |
| 20b | 1 | 11 238 | 16,1 | — | — | — |
| 20c | 1 | 9 346 | 13,4 | — | — | — |
| 21 | 1 | 7 156 | 10,2 | 2 · 2,00 | 7 · 2,25 | — |
| 22 | 1 | 7 753 | 11,1 | 1 · 1,00 | 6 · 2,50 | — |
| 23 | 1 | 7 680 | 11,0 | — | 7 · 2,25 | — |
| 24 | 2 | 8 162 | 11,7 | 2 · 1,50 | 8 · 3,50 | — |
| 25 | 2 | 9 199 | 13,1 | — | 7 · 3,00 | 5 |
| 26 | 2 | 8 551 | 12,2 | — | 5 · 2,50 | — |
| 27 | 2 | 7 755 | 11,1 | 5 · 4,50 | 7 · 4,00 | — |
| 27b | 2 | 8 661 | 12,4 | — | — | — |
| 28 | 2 | 10 185 | 14,6 | 3 · 2,50 | 6 · 3,25 | — |
| 29 | 2 | 8 425 | 12,0 | — | 5 · 1,75 | — |
| 30 | 2 | 6 754 | 9,6 | — | 75 · 23,50 | 66 |
| 31 | 2 | 7 373 | 10,5 | — | 6 · 2,00 | — |
| 32 | 2 | 8 216 | 11,7 | — | 6 · 2,00 | — |
| 33 | 2 | 8 219 | 11,7 | — | 5 · 1,75 | — |
| 34 | 3 | 7 329 | 10,5 | — | 5 · 2,50 | — |
| 35 | 3 | 7 805 | 11,2 | — | 9 · 3,75 | 3 |
| 35b | 3 | 12 804 | 18,3 | — | — | — |
| 35c | 3 | 11 548 | 16,5 | — | — | — |
| 35d | 3 | 11 271 | 16,1 | — | — | — |
| 36 | 3 | 6 799 | 9,7 | 3 · 1,75 | 8 · 3,50 | 2 |
| 37 | 3 | 7 153 | 10,2 | — | 29 · 13,00 | 13 |
| 38 | 3 | 7 287 | 10,4 | — | 9 · 4,25 | 2 |
| 39 | 3 | 7 195 | 10,3 | — | 7 · 3,00 | 1 |
| 40 | 3 | 8 407 | 12,0 | 1 · 1,00 | 8 · 3,25 | 1 |
| 41 | 3 | 8 947 | 12,8 | — | 8 · 3,25 | 8 |
| 42 | 3 | 7 012 | 10,0 | 1 · 1,00 | 8 · 3,25 | — |
| 43 | 3 | 6 105 | 8,7 | — | 9 · 3,75 | — |
| 43b | 3 | 10 768 | 15,4 | — | — | — |
| 44 | 3 | 7 916 | 11,3 | 2 · 1,50 | 7 · 3,00 | 1 |
| 45 | 3 | 7 484 | 10,7 | — | 16 · 6,50 | 4 |
| 46 | 3 | 7 425 | 10,6 | — | 9 · 3,75 | 2 |
| 47 | 3 | 7 078 | 10,1 | — | 7 · 3,00 | — |
| 48 | 3 | 7 030 | 10,0 | — | 7 · 3,00 | — |
| 49 | 3 | 7 176 | 10,3 | — | 8 · 3,25 | 1 |
| 50 | 3 | 8 713 | 12,4 | 1 · 1,00 | 7 · 3,00 | 9 |
| 51 | 3 | 7 679 | 11,0 | 2 · 2,00 | 7 · 3,00 | — |
| 52 | 3 | 8 911 | 12,7 | 2 · 1,50 | 6 · 2,00 | 3 |
| 53 | 3 | 7 726 | 11,0 | 1 · 1,00 | 7 · 3,00 | 4 |
| 54 | 3 | 9 572 | 13,7 | 2 · 1,50 | 8 · 4,00 | — |
| 55 | 3 | 8 993 | 12,8 | 2 · 1,25 | 8 · 3,25 | 3 |
| 56 | 3 | 6 523 | 9,3 | 3 · 3,00 | 7 · 3,00 | — |
| 57 | 3 | 7 931 | 11,3 | — | 8 · 4,00 | 18 |
| 58 | 3 | 10 356 | 14,8 | — | 31 · 11,75 | 24 |
| 59 | 3 | 8 018 | 11,5 | — | 23 · 6,75 | 15 |
| 60 | 3 | 8 289 | 11,8 | 4 · 4,00 | 31 · 11,75 | 22 |
| 61 | 4 | 7 488 | 10,7 | — | 7 · 3,00 | — |
| 62 | 4 | 8 351 | 11,9 | 4 · 4,00 | 8 · 3,50 | — |
| 63 | 4 | 7 546 | 10,8 | 1 · 0,50 | 7 · 3,00 | — |
| 64 | 4 | 6 808 | 9,7 | 1 · 0,50 | 7 · 2,25 | — |
| 65 | 4 | 7 835 | 11,2 | 4 · 4,00 | 9 · 3,75 | — |
| 66 | 4 | 8 152 | 11,6 | 1 · 1,00 | 8 · 3,25 | — |
| 67 | 4 | 7 399 | 10,6 | — | 8 · 3,25 | — |
| 68 | 4 | 8 593 | 12,3 | 1 · 1,00 | 6 · 2,00 | — |
| 69 | 4 | 8 780 | 12,5 | 2 · 2,00 | 9 · 3,50 | — |
| 70 | 4 | 8 813 | 12,6 | 2 · 1,50 | 7 · 3,00 | 4 |
| 71 | 4 | 8 289 | 11,8 | 3 · 2,50 | 8 · 3,50 | — |
| 72 | 4 | 7 760 | 11,1 | — | 8 · 3,25 | — |
| 73 | 4 | 8 547 | 12,2 | — | 7 · 3,00 | — |
| 74 | 4 | 8 813 | 12,6 | 1 · 1,00 | 8 · 3,25 | 4 |
| 75 | 4 | 8 281 | 11,8 | 1 · 0,50 | 8 · 3,25 | 8 |
| 76 | 4 | 8 538 | 12,2 | 3 · 3,00 | 7 · 3,50 | — |
| 77 | 4 | 8 347 | 11,9 | — | 6 · 2,00 | — |
| 78 | 4 | 10 183 | 14,5 | 2 · 1,50 | 7 · 3,25 | — |
| 79 | 4 | 9 395 | 13,4 | 2 · 2,00 | 8 · 3,50 | — |
| 80 | 4 | 8 819 | 12,6 | 4 · 3,25 | 9 · 3,75 | 4 |
| 81 | 4 | 9 034 | 12,9 | 2 · 2,00 | 8 · 3,25 | — |
| 82 | 4 | 8 776 | 12,5 | 3 · 1,50 | 8 · 2,75 | — |
| 83 | 4 | 8 848 | 12,6 | 1 · 0,50 | 9 · 3,75 | 1 |
| 84 | 4 | 9 414 | 13,4 | 4 · 2,00 | 7 · 2,50 | — |
| 85 | 4 | 8 685 | 12,4 | — | 6 · 2,00 | — |
| 86 | 4 | 11 564 | 16,5 | 4 · 3,50 | 7 · 3,00 | — |
| 87 | 4 | 9 779 | 14,0 | 3 · 3,00 | 8 · 3,50 | 4 |
| 88 | 4 | 10 612 | 15,2 | 1 · 1,00 | 10 · 4,00 | 2 |
| 89 | 4 | 9 218 | 13,2 | 1 · 0,50 | 9 · 4,00 | — |
| 89b | 4 | 3 245 | 4,6 | — | — | — |

---

## 1. Le verdict en une ligne

*État du 21 septembre 2026 : 89 chapitres, mots utiles des fiches. Les chiffres à jour sont à la partie 0.*

| Tome | Chapitres | Pages calculées | Marge sur 440 | État |
| --- | --- | --- | --- | --- |
| 1 — Tenir | 23 | **296** | +144 | Large |
| 2 — Le corps | 10 | **172** | +268 | Très large |
| 3 — Prélever | 27 | **422** | **+18** | Marge nulle |
| 4 — Conserver et réparer | 29 | **456** | **−16** | **Dépasse** |
| **Ensemble** | **89** | **1 346** | | |

**Un seul tome dépasse : le tome 4, de 16 pages.** Le tome 3 tient à 422, soit 4 % sous le
plafond. Dans un livre qui n'est ni vérifié, ni édité, ni mis en pages, 4 % n'est pas une marge :
c'est une erreur d'arrondi. Une seule image remontée en pleine page, une seule source ajoutée par
chapitre, et le tome 3 dépasse aussi.

Et le déséquilibre est le vrai problème : **172 pages d'un côté, 456 de l'autre.** Le tome 2 est à
39 % de son plafond pendant que le tome 4 crève le sien. Le gisement de pages n'est pas dans les
images ; il est dans la répartition.

---

## 2. La méthode de calcul

### Ce que j'ai mesuré, et où

| Grandeur | Source | Valeur |
| --- | --- | --- |
| Mots utiles, sections 1 à 9 | `suivi/bilan-redaction.md` (mesure du projet) | 478 642 |
| Mots de la section 10 (Sources) | **mesurés par moi** dans les 89 fichiers | **65 100** |
| Images et formats déclarés | `images/credits.md`, 802 lignes parsées | 802 |
| Renvois entre chapitres | comptés dans le corps des 89 fichiers | 3 779 occurrences |

**Le chiffre que personne n'avait compté : la section 10.** Les 478 642 mots utiles du bilan
couvrent les sections 1 à 9. Les fiches de suivi le disent explicitement (« 4 830 mots utiles pour
les sections 1 à 9, **plus 560 mots d'appareil** »). Les sections 10 pèsent **65 100 mots de plus**,
soit 93 pages à 700 mots — 731 mots par chapitre en moyenne. Le gabarit impose la section 10 dans
chaque chapitre : ces 93 pages s'impriment. C'est 20 % de l'excédent du tome 4 à lui seul.

### Les cinq coefficients, et pourquoi

**1. Texte : 700 mots utiles = 1 page.** Chiffre du projet, calibré sur le chapitre 63 pilote. Je
le reprends tel quel, sans le discuter.

**2. Surface image = fraction de page déclarée.** Pleine page = 1,00 · demi-page = 0,50 · quart de
page = 0,25. Six lignes du registre portent un format non standard, traitées ainsi : `28-3`
(demi-page + page détachable) = 1,00 ; `59-23` (pleine page pour les paires, quart pour les vues
simples) = 0,50 ; `69-9` (« sans objet », l'encadré DANGER sans image) = 0,00 ; `73-1` (pleine page
en ouverture) = 1,00 ; `73-3` (demi-page en bande) = 0,50.

**3. Frais de mise en pages des images : +15 % de la surface, +0,03 page de légende.** Une demi-page
ne coûte pas une demi-page : elle coûte la demi-page, sa légende (25 à 35 mots) et la casse de
colonne autour. Les pleines pages n'ont pas ce frais — une page est une page — je leur compte
0,02 page de légende reportée en marge. Total du poste : 59 pages sur l'ensemble.

**4. Ouverture de chapitre au recto : 0,5 page par chapitre.** Un chapitre qui démarre toujours sur
une page de droite laisse une page blanche une fois sur deux. 89 chapitres = 44,5 pages perdues.
C'est invisible dans un fichier et parfaitement réel à l'impression.

**5. Pages de titre de partie : 2 pages chacune** (titre au recto, verso blanc).

### L'appareil, par tome

- **Liminaires + table des matières :** 4 pages + 0,12 page par chapitre.
- **Index :** 4 % du corps du tome. C'est le taux d'un ouvrage de référence à consultation ponctuelle,
  et ce livre en est un : 89 chapitres, 3 779 renvois internes. Un index mince le rendrait inutilisable.
- **Crédits d'images :** 45 entrées par page. Les 802 images entrent toutes au registre, même les
  photos de JP.
- **Glossaire + tables de conversion :** 3 pages par tome.

### Les parties — une hypothèse, pas une mesure

`plan/plan-maitre.md` **manque toujours** (le bilan le signale). Le découpage en parties n'est donc
écrit nulle part. Une seule trace existe : `suivi/suivi-chapitres.md` dit que les photos d'octobre
(ch. 36 à 42) appartiennent à la **« Partie IX »**. J'ai reconstruit à rebours un découpage
compatible : 5 parties au tome 1, 3 au tome 2 — ce qui fait démarrer le tome 3 à la partie IX.
D'où **5 / 3 / 4 / 5 parties**, soit 10 / 6 / 8 / 10 pages.

**Chaque partie en plus ou en moins déplace le total de 2 pages.** Si le plan maître retrouvé dit
autre chose, corriger d'autant.

### Le tableau complet

| Poste | T1 | T2 | T3 | T4 |
| --- | ---: | ---: | ---: | ---: |
| Texte, sections 1 à 9 | 156,9 | 75,8 | 196,0 | 255,0 |
| Sources, section 10 | 19,4 | 9,7 | 29,0 | 34,9 |
| Surface image nue | 61,5 | 47,2 | 121,5 | 91,5 |
| Frais de mise en pages des images | 11,8 | 9,4 | 21,1 | 16,8 |
| Ouvertures au recto | 11,5 | 5,0 | 13,5 | 14,5 |
| Titres de partie | 10,0 | 6,0 | 8,0 | 10,0 |
| Liminaires + table | 6,8 | 6,0 | 7,2 | 7,5 |
| Index | 11,1 | 6,4 | 15,9 | 17,2 |
| Crédits d'images | 3,4 | 2,9 | 6,6 | 5,0 |
| Glossaire + conversions | 3,0 | 3,0 | 3,0 | 3,0 |
| **TOTAL** | **296** | **172** | **422** | **456** |

Les images coûtent **381 pages sur 1 346, soit 28 % du livre.** C'est un livre de photos : c'est
normal. Ce n'est pas là que se joue le dépassement du tome 4, qui est le tome le moins illustré
par rapport à son texte.

### Ce que le calcul vaut — bande de sensibilité

Le seul chiffre vraiment incertain est la densité. Un texte à tableaux nombreux tient moins de mots
à la page qu'un texte courant, et ce livre est un livre de tableaux.

| Hypothèse | T1 | T2 | T3 | T4 |
| --- | ---: | ---: | ---: | ---: |
| Optimiste — 780 mots/page, frais images 8 % | 280 | 164 | 402 | **428** |
| **Référence — 700 mots/page, frais 15 %** | **296** | **172** | **422** | **456** |
| Pessimiste — 620 mots/page, frais 25 % | 316 | 182 | **448** | **490** |

Dans l'hypothèse pessimiste, **les deux tomes dépassent** : le 4 de 50 pages, le 3 de 8. Dans
l'hypothèse optimiste, les quatre tomes tiennent.

**Ce qui ferme cette incertitude coûte une demi-journée :** mettre en pages pour de vrai trois
chapitres contrastés — un chapitre de procédure (63), un chapitre de référence à tableaux (11) et
un chapitre à planches (58) — et mesurer la densité réelle. Tant que ce n'est pas fait, l'écart
entre 428 et 490 pour le tome 4 reste ouvert, et c'est un écart qui change la décision.

### Ce que le calcul ne couvre pas

- **Les 773 chiffres `[À VÉRIFIER]` ne sont pas résolus.** Chacun finit soit sourcé (une citation de
  plus, quelques mots), soit retiré (quelques mots de moins). Effet net probablement faible, mais non
  nul, et non calculable aujourd'hui.
- **Aucune passe d'édition n'a tourné.** Le rôle 5 n'a pas ramassé les redites. Le texte actuel est un
  premier jet de 89 rédacteurs aveugles les uns aux autres.
- **Le chapitre 59 a un bloc d'images conditionnel.** `59-23` dit : « aucune commande avant la
  signature du mycologue ». Si le mycologue refuse, la section 5-A saute et le chapitre 59 perd des
  pages. Non chiffré ici, parce que c'est une décision humaine en attente.
- **Blurb impose un nombre de pages pair.** Les totaux sont arrondis au pair supérieur.

---

## 3. Qui dépasse, et de combien

**Tome 4 — Conserver et réparer : 456 pages, soit 16 de trop.**
Cause : le plus de texte (255 pages, 53 % de plus que le tome 3) et le plus de chapitres (29). Ses
chapitres sont aussi les plus longs du livre : douze d'entre eux dépassent 9 pages de texte, contre
aucun au tome 1.

**Tome 3 — Prélever : 422 pages, 18 de marge.**
Il ne dépasse pas, mais il n'a pas de marge. Cause : les images. 297 images, 122 pages de surface
nue, dont 38 pleines pages. Cinq chapitres à eux seuls mangent 105 pages — 37 (23,5 p), 58 (24,0 p),
60 (22,7 p), 59 (17,2 p) et 45 (17,4 p) — soit 25 % du tome pour 5 chapitres sur 27.

**Tomes 1 et 2 : aucun problème de plafond, un problème d'équilibre.**
Le tome 2 fait 172 pages. À 10 chapitres et 53 088 mots, c'est la moitié d'un tome. Dans un coffret
de quatre volumes, un volume deux fois et demie plus mince que son voisin se voit, et il se paie :
le dos ne porte pas le titre de la même façon, et le prix unitaire Blurb d'un volume mince n'est pas
proportionnellement plus bas.

---

## 4. Les arbitrages, du moins douloureux au plus douloureux

Gains en pages. Les valeurs sont calculées, pas estimées à vue.

---

### A — Autoriser un chapitre à ouvrir au verso

| | T1 | T2 | T3 | T4 |
| --- | ---: | ---: | ---: | ---: |
| **Gain** | +12 | +6 | **+14** | **+16** |

**Ce qu'on gagne :** 48 pages sur l'ensemble, dont 30 là où elles manquent. C'est, à lui seul, le
levier qui règle le dépassement du tome 4.

**Ce qu'on perd en usage :** le chapitre ne démarre plus toujours sur une page de droite. Dans un
livre qu'on ouvre à une page plutôt qu'à la première — c'est la prémisse de tout le projet — on
retrouve un chapitre en feuilletant. Une ouverture au recto aide ce feuilletage.

**Ce qui compense :** une bande de couleur à fond perdu sur la page d'ouverture, ou une tranche
marquée par partie. Le repérage devient meilleur qu'avec l'ouverture au recto, parce qu'il se fait
tranche fermée. Coût : zéro page.

**C'est le levier le moins cher du lot.** Rien ne se coupe, rien ne rétrécit, rien ne change de tome.

---

### B — Sortir les sources (section 10) en annexe de tome

| | T1 | T2 | T3 | T4 |
| --- | ---: | ---: | ---: | ---: |
| **Gain, version intégrale** (annexe, 2 colonnes petit corps, 1 400 mots/page) | +10 | +6 | +14 | **+18** |
| **Gain, version mixte** (l'essentiel reste au chapitre) | +9 | +5 | +12 | **+16** |

La version mixte rend presque autant que l'intégrale, parce que ce qui pèse dans une section 10
n'est pas la liste des `[À VÉRIFIER]` — c'est l'énumération des fichiers `/sources`.

**Le fait mesuré :** 65 100 mots de sources, 731 par chapitre en moyenne, 93 pages à la densité du
corps. Les plus lourdes : ch. 83, 57, 87, 44, 65 (1 300 à 1 360 mots chacune, 1,9 page).

**Version intégrale :** toute la section 10 part en annexe, composée sur deux colonnes en petit
corps. Une liste de liens et de noms de fichiers se lit très bien à cette densité.

**Version mixte, à préférer si le doute existe :** restent au pied du chapitre les 150 mots qui
servent en usage — **la liste des chiffres `[À VÉRIFIER]` et le nom du relecteur humain requis**.
Part en annexe la liste des URL et des fichiers `/sources`, qui ne sert qu'à qui veut remonter à
la source, et qui le fera assis, pas debout devant un fumoir.

**Ce qu'on perd en usage :** la provenance d'un chiffre n'est plus à la même page que le chiffre.
Pour un livre dont la règle 1 est « ne jamais inventer un chiffre », l'affichage de la source au
même endroit que le chiffre a une valeur qui n'est pas que documentaire : elle est disciplinaire.

**Ce que ça touche :** le point 10 du gabarit. C'est une règle du projet, pas une préférence de
mise en pages. **Décision de JP.**

---

### C — Rétrograder des images pleine page en demi-page

Un aplat de 0,5 page rendu ne coûte pas 0,5 page gagnée : la demi-page reprend son frais de légende
et de casse. **Gain net réel : 0,42 page par image rétrogradée**, arrondi ensuite au pair.

C'est le levier le plus visible et **le moins rentable des quatre premiers.** Il faut rétrograder
douze images pour gagner quatre pages. Dit dans l'autre sens : le lecteur perd douze grandes images
et le budget gagne 1 % d'un tome.

#### C1 — Tome 4 : les schémas de décision (11 images, 4,6 pages de surface)

Onze des 23 pleines pages du tome 4 sont des diagrammes au trait, pas des photographies :

| Image | Sujet |
| --- | --- |
| `61-1` | Le thermomètre des barrières, une échelle verticale −20 → 100 °C |
| `67-2` | La ligne du procédé, de la bête au bloc emballé |
| `69-1` | Arbre de décision du congélateur qui dégèle |
| `70-1` | Arbre de décision, de l'eau à la voie de conservation |
| `71-1` | Arbre des deux produits |
| `72-1` | Les deux voies, de la prise à la table |
| `73-1` | Arbre de décision de la ligne pH 4,6 |
| `75-1` | Arbre de décision, de la fleur au pot |
| `79-1` | Arbre de décision de la peau |
| `80-1` | Arbre de décision de la matière |
| `88-1` | Arbre de décision « cet acier va-t-il durcir ? » |

**Ce qu'on perd :** un arbre de décision est exactement l'image qu'on consulte en vitesse, avec les
mains sales. Le réduire de moitié le rend moins lisible au moment précis où il sert.

**Le tri qui limite la casse :** garder en pleine page les trois arbres les plus ramifiés —
`73-1` (pH 4,6, quatre niveaux et une double sortie), `69-1` (quatre cas plus la sonde) et
`88-1` (aimant, provenance, essai) — et rétrograder les huit autres, qui ont trois à quatre nœuds
et tiennent dans une demi-page horizontale. **Gain : 3,4 pages de surface, +4 au total du tome.**

#### C2 — Tome 3 : les planches qui ne servent pas à identifier (12 images, 5,0 pages de surface, +4 au total)

Candidates : `34-1` (roue de l'année) · `37-3` (sens du grain sur silhouette) · `43-1` (fiche-type
annotée) · `45-12` (recherche des plombs) · `46-1`, `47-1`, `48-1` (images-clés photo, bête posée
avant travail) · `49-3` (trois espèces à la même échelle) · `56-1` (coupe du verveux) ·
`60-11` (couleurs du liber) · `60-12` (inox contre les quatre interdits ACIA) · `35-1` (carte du
territoire).

**Intouchables, et je le dis clairement :**

- **Les quatre planches de confusion mortelle du chapitre 58** — `58-15` cicutaire maculée,
  `58-17` vératre vert, `58-22` herbe à puce, `58-25` comparatif plantain / vératre. Une planche
  d'identification d'un sosie mortel réduite de moitié est une planche qui tue. Même chose pour
  `57-1` (les quatre fruits à ne pas ramasser), `60-1` (bouleau contre cerisier de Pennsylvanie) et,
  au tome 2, `25-1` (clé des quatre conifères) et les planches 30-34, 30-39, 30-46.
- **Les planches d'identification d'espèces** `50-1`, `51-1`, `53-1`, `55-1` : le lecteur y compare
  des silhouettes à la même échelle. L'échelle est l'information.
- **Les six pleines pages anatomiques du chapitre 37** : `37-1` et `37-2` doivent se superposer
  mentalement, à la même échelle — la fiche du chapitre le dit comme « point critique de toute la
  série ». Une seule exception dans le lot : `37-3` (les flèches de sens du grain), qui se lit aussi
  bien en demi-page.

---

### D — Couper les doublons d'images

J'ai passé les 802 sujets du registre au peigne. Les grappes réelles, avec leur poids en pages :

| Sujet répété | Images | T1 | T2 | T3 | T4 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Sonde à cœur, afficheur à 74 / 70 °C | 24 | 1,50 p (ch. 1, 4, 5, 7, 10, 14) | 0,25 (24) | **4,00 p** (37, 39, 41, 43, 44, 45, 50, 51, 52, 53, 54, 55) | 1,00 (63, 64, 69, 72) |
| Étiquette de contenant / congélateur | 51 | 4,50 p | 1,75 | **7,00 p** | 4,75 |
| Balance, pesée au gramme | 13 | — | 0,25 | 2,00 | **3,25 p** (62, 63, 64, 71, 77) |
| Trousse, contenu étalé sur bâche | 12 | **4,00 p** (dont 3 pleines pages) | 1,00 | 2,75 | — |
| Congélateur, vides comblés par bidons | 12 | 2,00 p | — | 1,25 | 0,25 |
| Génératrice bien installée | 8 | **3,25 p** (ch. 1, 2, 4, 10, 11, 19, 20) | — | — | 0,25 |
| Avertisseur de CO en place | 8 | 1,25 p | — | 0,50 | 0,25 |
| Claie de séchage, couche unique | 6 | — | 0,25 | 0,75 | 0,75 |
| « Casse net contre plie » (test du sec) | 4 | — | 0,25 | 0,50 | 0,25 |
| Conserve ou couvercle bombé | 9 | 0,50 | — | 1,00 | 1,50 |
| Moisissure, planche d'échec | 4 | — | 0,25 | 0,50 | 0,25 |

**Gisement mobilisable, après tri raisonnable :**

| | T1 | T2 | T3 | T4 |
| --- | ---: | ---: | ---: | ---: |
| **Gain** | +12 | +2 | **+8** | **+4** |

**La mauvaise nouvelle du tableau :** la moitié du gisement est au tome 1, qui a 144 pages de marge.
Sept photos de génératrice, quatre trousses étalées sur une bâche dont trois en pleine page, six
avertisseurs de CO — c'est visiblement redondant, et ça ne règle aucun dépassement. **Le tome 4,
celui qui dépasse, est celui qui a le moins de doublons : 4 pages.**

**Le cas de la sonde à 74 °C mérite d'être dit explicitement.** Vingt-quatre fois dans le livre, la
même photographie : une sonde plantée dans une pièce de viande, un afficheur lisant 74 °C. Treize
de ces images sont au tome 3. Elles ne diffèrent que par la viande.

> **Couper la photo ne coupe pas la règle.** Les 74 °C restent écrits dans les 50 chapitres
> concernés, dans le texte, aux points de contrôle et dans l'encadré DANGER. `CLAUDE.md` impose la
> répétition du **rappel**, pas la répétition de l'**image**. Un lecteur qui ouvre à la page 312 lit
> « 74 °C à cœur (MAPAQ) » qu'il y ait ou non une photo à côté.

**Ce qu'on perd quand même :** une image d'un afficheur à 74 °C, vue au coin de l'œil, enseigne plus
vite qu'une ligne de texte. C'est l'argument de la fiche du chapitre 36 : « la photo enseigne la
règle de la section 8 sans la répéter ». La répétition visuelle est une pédagogie, pas une
négligence. **Réduire de 24 à 4 est défendable ; réduire à 1 ne l'est pas.**

**Une économie à zéro perte, à prendre d'abord :** les séries de photos d'échec génériques —
claie de séchage, « casse net contre plie », moisissure, couvercle bombé — sont les mêmes d'un
chapitre à l'autre. Les tirer une fois, bien, et les réutiliser. Gain : environ 2 pages, réparties,
et surtout **23 images de moins à acquérir et à créditer.**

---

### E — Réduire les séries d'identification

Trois chapitres portent des séries de planches où le même sujet revient sous quatre angles.

**Chapitre 30 — Plantes médicinales boréales : 75 planches, 23,5 pages d'images pour 6,9 pages de
texte.** Le chapitre fait **36,7 pages à lui seul**, soit 21 % du tome 2. Sa fiche assume le
principe : quatre vues par espèce — rameau, détail de feuille, écorce, port d'ensemble.

**Pas une question de pages :** le tome 2 a 268 pages de marge. **Une question d'acquisition.** 75
images à trouver, à filtrer par licence et à créditer, pour un chapitre qui attend déjà un
biologiste ou un herboriste. Ramener à deux vues par espèce — celle qui identifie et celle qui
situe en station — retire 30 planches du travail d'acquisition sans toucher au plafond. **Ce qu'on
perd :** en botanique, la quatrième vue est parfois celle qui évite l'erreur.

**Chapitres 58, 59 et 60 — 85 images, 30 pages au tome 3.** Là, les pages comptent. Les séries
d'échec (`59-15` à `59-19`, `60-25` à `60-27`) et les photos de procédé (`58-28` à `58-31`)
doublent des images qui existent ailleurs dans le livre : voir la grappe « claie de séchage » et
« casse net contre plie ». **Gain : +3 pages au tome 3, sans toucher à une seule planche
d'identification.**

---

### F — Déplacer des chapitres

J'ai compté les renvois réels dans le corps des chapitres pour mesurer ce que chaque déplacement
casse. Un renvoi qui traverse une frontière de tome est un renvoi que le lecteur ne peut pas suivre
sans aller chercher l'autre volume.

#### F1 — Déplacer 57-60 (petits fruits, plantes comestibles, champignons, sève) du tome 3 au tome 2

| | Avant | Après |
| --- | ---: | ---: |
| Tome 2 — Le corps (+ le végétal) | 172 p, 10 ch. | **256 p, 14 ch.** |
| Tome 3 — Prélever | 422 p, 27 ch. | **338 p, 23 ch.** |

**Le fait mesuré, et il est net :** le bloc 57-60 émet 205 renvois. **Seulement 29 vont au reste du
tome 3.** Il en envoie 47 au tome 2, 71 au tome 4 et 53 au tome 1. En sens inverse, le reste du
tome 3 ne lui renvoie que 7 fois, contre 12 fois depuis le tome 2.

| Frontière | Renvois coupés aujourd'hui | Renvois coupés après |
| --- | ---: | ---: |
| 57-60 ↔ tome 3 (34-56) | 0 | **36** |
| 57-60 ↔ tome 2 (24-33) | **59** | 0 |

**Le déplacement réduit de 23 le nombre de renvois qui traversent une frontière de tome.** Les
chapitres 57 à 60 sont déjà plus attachés au tome 2 qu'au tome 3.

Les dix cibles les plus citées depuis 57-60, dans l'ordre : ch. **73** (15 fois — conserves et
marinades, tome 4), ch. **25** (13 — le scorbut et l'arbre de vie, tome 2), ch. **24** (13 — le mal
de caribou, tome 2), ch. 69 (9), ch. 15 (9), ch. 68 (9), ch. **30** (8 — plantes médicinales,
tome 2), ch. 7 (7), ch. 35 (6), ch. 34 (6). Le suivi note lui-même au chapitre 60 : « source de
vitamine C — **lier au ch. 25** ».

**À dire honnêtement : la cible la plus citée est au tome 4, pas au tome 2.** Le bloc 57-60 envoie
71 renvois au tome 4 (contre 47 au tome 2) : ce qu'on cueille finit en pot, et le pot est au tome 4.
Aucun découpage ne règle ça — c'est la nature du livre. Le déplacement vers le tome 2 reste le
meilleur des découpages possibles, il n'est pas le découpage parfait.

**Ce que ça casse dans la logique des tomes :** « Prélever » cesse de couvrir le végétal. Le tome 3
devient *le gibier et le poisson*, et le tome 2 devient *Le corps et le végétal*. Pour qui part en
cueillette, la cueillette animale et la cueillette végétale se font le même jour, dans le même bois,
avec le même sac. Le titre du tome 3 dit « Prélever », pas « Prélever de la viande ».

**Ce qu'on gagne en usage, et qu'il ne faut pas passer sous silence :** le tome 2 réunirait le
scorbut (25), les plantes médicinales (30), les plantes comestibles (58), la sève et les écorces
(60) et les champignons (59). Quatre chapitres de botanique boréale aujourd'hui dispersés dans deux
volumes. Pour qui identifie une plante, c'est un seul livre à ouvrir au lieu de deux.

#### F2 — Déplacer 82-89 (l'atelier) du tome 4 au tome 1

| | Avant | Après |
| --- | ---: | ---: |
| Tome 1 | 296 p | **426 p** |
| Tome 4 | 456 p | **328 p** |

**Ça marche arithmétiquement et c'est le pire des déplacements.** Il coupe **134 renvois** (71 de
82-89 vers 61-81, 63 en sens inverse) : l'atelier est soudé au tome 4 par les chapitres 79 et 80
(de la peau au cuir, babiche et cordage), qu'il cite 24 fois. Et il ramène le tome 1 à 426 pages,
c'est-à-dire qu'il transfère le problème au lieu de le régler : deux tomes sans marge au lieu d'un
seul qui dépasse. Chiffré ici pour qu'on n'y revienne pas.

#### F3 — Rééquilibrage arithmétique complet

Découpage 1-26 / 27-52 / 53-73 / 74-89 : **332 / 406 / 344 / 264 pages.** Les quatre tiennent.
Coût : les quatre titres sautent, le tome 2 coupe le bloc médical en deux (27-52 mêlerait *soigner
quand il n'y a personne* et *le quartier arrière d'un orignal*), et la structure en quatre gestes —
tenir, le corps, prélever, conserver — disparaît. C'est la solution d'un tableur, pas d'un livre.
Chiffrée pour borner le champ.

---

### G — Scinder un tome en deux volumes

#### G1 — Scinder le tome 4 à 78 / 79 : « Conserver » et « Réparer »

| Volume | Chapitres | Pages |
| --- | --- | ---: |
| 4a — Conserver | 61 à 78 (18 ch.) | **276** |
| 4b — Réparer | 79 à 89 (11 ch.) | **188** |

**Pourquoi cette coupure-là :** le bloc 79-89 est le plus autonome du livre. **61 % de ses renvois
sont internes** (223 sur 368). Il n'en envoie que 58 vers 61-78, et en reçoit 40. Coupure totale :
**98 renvois.** Et le titre actuel du tome, *Conserver et réparer*, annonce déjà deux livres.

**Comparaison avec la coupure à 73 / 74** (Conserver / Le jardin, la peau, l'atelier) : 202 et
262 pages, mais **138 renvois coupés** au lieu de 98. La coupure à 78/79 est la bonne si on scinde.

**Ce que ça coûte :**
- **Un cinquième volume.** Prix unitaire Blurb supplémentaire pour chaque coffret vendu ou imprimé,
  à chaque réimpression.
- **Environ 30 pages d'appareil en double** : liminaires, table, index, glossaire, crédits. Un index
  de 188 pages n'est pas la moitié d'un index de 456 : les entrées transversales se répètent.
- **`CLAUDE.md` change.** « 4 tomes, 89 chapitres » est la première ligne de la définition du projet.
- Un volume de 188 pages à côté d'un de 422 : le déséquilibre se déplace, il ne disparaît pas.

**Ce qu'on gagne en usage :** *Réparer* devient le volume qu'on laisse à l'atelier, avec les mains
grasses dessus, sans traîner 456 pages de conservation alimentaire à côté du poste à souder. Pour un
lecteur qui sait souder et câbler du 12 V, c'est le volume qu'il ouvrira le plus.

#### G2 — Combinaison F1 + G1 : les cinq volumes équilibrés

| Volume | Chapitres | Pages | Marge |
| --- | --- | ---: | ---: |
| 1 — Tenir | 1-23 (23 ch.) | 296 | 144 |
| 2 — Le corps et le végétal | 24-33 + 57-60 (14 ch.) | 256 | 184 |
| 3 — Prélever : gibier et poisson | 34-56 (23 ch.) | 338 | 102 |
| 4 — Conserver | 61-78 (18 ch.) | 276 | 164 |
| 5 — Réparer | 79-89 (11 ch.) | 188 | 252 |

Aucun volume au-dessus de 338 pages. **Tous les leviers de coupe redeviennent facultatifs** : plus
besoin de toucher aux images, aux sources ni au texte. Le coût est entièrement porté par la
structure et par l'impression : cinq volumes, deux titres réécrits, l'appareil en cinq exemplaires.

---

### H — Couper du texte

C'est le dernier de la liste parce que c'est le plus douloureux, et parce que c'est **le moins
rentable des leviers mesurés**.

#### H1 — Les redites que le bilan annonce

Le bilan pointe les redites entre 61-66 et 70-73, et entre 24-26 et 67. Je les ai mesurées, en
recouvrement de 6-grammes littéraux :

| Couple | Recouvrement |
| --- | ---: |
| bloc 61-66 ↔ bloc 70-73 | **3,6 %** du bloc le plus court |
| bloc 24-26 ↔ ch. 67 | **2,2 %** du ch. 67 |

Les couples de chapitres les plus redondants du livre entier plafonnent à 6 % : ch. 43 / ch. 52
(6,0 %), ch. 14 / ch. 23 (6,0 %), ch. 63 / ch. 73 (5,5 %), ch. 8 / ch. 85 (5,1 %), ch. 55 / ch. 71
(4,9 %), ch. 30 / ch. 58 (4,6 %).

**Une passe d'édition dédoublonnante rend 3,5 à 5 pages au tome 4.** C'est tout. La mesure porte sur
la répétition littérale et sous-estime la répétition d'idée, mais l'ordre de grandeur tient : les 89
rédacteurs se sont moins répétés qu'on le craignait. **Il faut faire cette passe — c'est le rôle 5 —
mais il ne faut pas compter dessus pour fermer un budget.**

#### H2 — Couper de la portée

Pour rendre 25 pages au tome 4, il faut retirer 10 % de son texte. Les cibles arithmétiques sont ses
douze chapitres les plus longs, tous au-dessus de 9 pages de texte :

`88` trempe et travail du métal à chaud (10,9 p) · `81` coudre et chausser (10,1) · `89` savon et
chandelles (10,0) · `87` assemblages bois-bois (9,8) · `84` souder et braser (9,4) · `86` leviers,
poulies, treuils (9,4) · `79` de la peau au cuir (9,4) · `78` petit élevage (9,3) · `80` babiche,
tendons, cordage (9,3) · `62` le sel (9,3) · `74` jardin nordique (9,2) · `83` scie à chaîne (9,2).

**Ce qu'on perd :** ces chapitres sont longs parce que leur sujet est long. `CLAUDE.md` demande déjà
d'écrire dense et la densité mesurée tient. Couper 10 % dans un texte déjà sans remplissage, ce
n'est pas couper du gras : c'est couper une étape, une substitution de matériel, une variante
d'urgence. Le gabarit impose « la situation où c'est un mauvais choix » et « la version dégradée » —
ce sont précisément les sections qu'un rédacteur pressé coupe en premier, et ce sont celles qui
servent quand rien ne se passe comme prévu.

**Une piste moins destructrice, à décider à la mise en pages :** neuf des douze sont des chapitres
d'atelier. Si le tome 4 est scindé (G1), ils se retrouvent dans un volume de 188 pages et le
problème disparaît sans qu'une ligne soit coupée.

---

## 5. Combinaisons qui ferment le budget

Chaque ligne est un chemin complet, du moins au plus structurant.

| Combinaison | T1 | T2 | T3 | T4 | Ce que ça coûte |
| --- | ---: | ---: | ---: | ---: | --- |
| **État mesuré** | 296 | 172 | 422 | **456** | — |
| **1.** A seul (ouverture au verso) | 284 | 166 | 408 | **440** | Un repère de feuilletage, compensable par la tranche |
| **2.** A + B mixte | 276 | 162 | 396 | **426** | Idem + les sources à l'arrière du tome |
| **3.** A + C (rétrogradations) | 282 | 166 | 404 | **438** | Idem + 20 grandes images réduites de moitié |
| **4.** A + B mixte + C + D | 262 | 160 | 382 | **418** | Tout ce qui précède + une trentaine d'images coupées |
| **5.** F1 seul (57-60 → tome 2) | 296 | **256** | **338** | **456** | Le tome 4 dépasse toujours ; « Prélever » perd le végétal |
| **6.** F1 + A | 284 | 250 | 326 | **440** | Le tome 4 juste au plafond, zéro marge |
| **7.** F1 + G1 (cinq volumes) | 296 | 256 | 338 | **276 / 188** | Un cinquième volume, 30 p d'appareil, `CLAUDE.md` réécrit |

**Les combinaisons 1 et 6 posent le tome 4 exactement à 440.** Un budget qui ferme à la page près ne
ferme pas : à la mise en pages, il manquera toujours deux pages quelque part.

**Contrôle sous l'hypothèse pessimiste (620 mots/page) :**

| Combinaison | T1 | T2 | T3 | T4 |
| --- | ---: | ---: | ---: | ---: |
| 4 — tous les leviers de coupe | 282 | 170 | 408 | **452** |
| 7 — F1 + scission | 316 | 270 | 360 | **298 / 202** |

**La combinaison 4 ne tient pas si la densité réelle est de 620 mots/page.** Autrement dit : si on
coupe tout ce qui est coupable — les sources, les ouvertures, vingt grandes images et une trentaine
de doublons — et que la densité déçoit, le tome 4 dépasse encore de 12 pages, et il ne reste plus
rien à couper.

**La combinaison 7 tient dans les trois hypothèses de densité, avec 80 pages de marge sur le volume
le plus chargé.** C'est l'argument le plus fort en faveur de la scission, et c'est aussi la raison
pour laquelle **mesurer la densité réelle sur trois chapitres devrait passer avant toute décision.**

---

## 6. Ce que je ne peux pas trancher à la place de JP

1. **Le livre fait-il quatre tomes ou cinq ?** C'est la première ligne de `CLAUDE.md` et la seule
   décision qui rende tous les autres arbitrages facultatifs. Elle coûte un volume de plus à chaque
   impression.

2. **La section 10 reste-t-elle au pied de chaque chapitre ?** C'est le point 10 du gabarit, et
   l'incarnation visible de la règle 1. 93 pages en dépendent.

3. **« Prélever » couvre-t-il le végétal ?** Les renvois mesurés disent que les chapitres 57 à 60
   appartiennent au tome 2. Le titre du tome 3 dit le contraire. Les chiffres ne tranchent pas une
   question de sens.

4. **Combien de fois faut-il montrer un afficheur à 74 °C ?** La règle écrite se répète partout,
   c'est acquis. La photo qui l'accompagne est une pédagogie que seul l'auteur peut doser.
   Aujourd'hui : 24 fois.

5. **Le chapitre 30 garde-t-il ses 75 planches ?** Ça ne coûte pas de pages. Ça coûte 75 licences à
   vérifier et un chapitre qui attend déjà un relecteur externe.

6. **Un chapitre peut-il ouvrir au verso ?** C'est le levier le moins cher et il touche à
   l'apparence du livre, qui est un jugement d'auteur.

---

## 7. Ce qu'il faudrait mesurer avant de décider

- **La densité réelle**, en mettant en pages pour de vrai les chapitres 63, 11 et 58. L'écart entre
  620 et 780 mots/page vaut 62 pages sur le tome 4 — plus que tous les leviers d'images réunis.
  Une demi-journée de travail décide de tout le reste.
- **Le plan maître**, qui manque toujours. Le nombre de parties vaut 2 pages pièce et le découpage
  en parties conditionne la table des matières et l'index.
- **La décision du mycologue sur le chapitre 59**, qui commande un bloc d'images entier.
- **L'échéance d'octobre ne dépend d'aucune de ces décisions.** Les 45 photos du débitage
  (ch. 36 à 42) se prennent dans la fenêtre de la mi-octobre ou pas avant octobre 2027. Aucun
  arbitrage de format ne les retire du tome 3 : ce sont les images-clés de sept chapitres. **Prendre
  les photos d'abord, arbitrer ensuite.**
