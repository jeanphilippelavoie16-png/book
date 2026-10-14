# Le design retenu

**Choisi par JP le 23 septembre 2026 : la direction 1, Manuel de terrain, avec les couleurs de
la direction 3, Nordique contemporain.**

- **Intérieur :** `directions/1-manuel-de-terrain/interieur.html`, tel quel. IBM Plex Sans
  Condensed et IBM Plex Serif, deux colonnes sur la zone des planches (7 × 8,5 po), sections
  ouvertes par un carré noir numéroté, section 9 en bandeau noir avec sa bande sur la tranche,
  échelle des neuf sections en pied de page. Noir sur blanc, rouge #9B2C1E pour le danger
  seulement.
- **Couvertures :** les six tomes sont dans `directions/1-manuel-de-terrain/couvertures-nordique-6.html`
  (28 septembre 2026, voir plus bas) ; les fichiers à téléverser chez Blurb sont `livre/tome-N/couverture.pdf`.
  `couvertures-nordique.html` (PDF : `couvertures-nordique.pdf`) est la base à quatre tomes du 23 septembre,
  gardée telle quelle. La composition du manuel de terrain — titre en capitales
  étroites, chiffre de tome géant, barre de série — sur les aplats de la direction 3 :

  | Tome | Fond | Encre | Évoque |
  | --- | --- | --- | --- |
  | 1 Tenir | #E2E7EA | #15222B | la neige |
  | 2 Le corps | #5C1A15 | #F3ECE5 | le sang de gibier |
  | 3 Prélever | #1D392E | #E9F0EA | l'épinette |
  | 4 De la bête au garde-manger | #25414F | #EDF2F5 | le fleuve |
  | 5 La forêt, le jardin et le chalet | #4B3A28 | #F2EBDF | l'écorce, le bois de chauffage — **gardé** (28 septembre 2026) |
  | 6 L'atelier | #363432 | #EEEBE6 | la fonte — **choisi par JP** le 28 septembre 2026, à la place de la rouille #7A4424 / #F5ECE2 |

  **Six tomes depuis le 24 septembre 2026** (`plan/tomes-6-proposition.md`) : le tome 4 a changé de nom
  (ancien « Conserver et réparer »), les tomes 5 et 6 sont nouveaux. Leurs couleurs, proposées le 24 septembre
  (tranchées depuis, voir la fin du paragraphe) : même famille nordique que les quatre premières (terre, bois, rouille, écorce), foncées
  et peu saturées, sans rouge vif. L'écorce (teinte ≈ 30°) se distingue du bordeaux du tome 2 (≈ 4°, plus
  saturé) ; la rouille (≈ 22°) reste loin du rouge danger #9B2C1E (≈ 6°), mais par prudence elle suit la
  règle du tome 2 à l'intérieur : aplats, filets et teintes seulement, carrés et section 9 en noir. À
  l'intérieur, le tome 5 prend un brun plus clair (#6B5238) pour les petits éléments, comme le bleu
  glacier du tome 1. Jetons : `variantes-couleur/outils/couleur.css` (t5, t6). Les outils lisent le tome
  dans `plan/renumerotation.json` (tomeDuNouveau), plus jamais dans le numéro du chapitre. **Tranché le
  28 septembre 2026 : écorce pour le 5, fonte pour le 6** (voir « Décisions des 27 et 28 septembre 2026 »).

  **Couvertures des six tomes, au propre (28 septembre 2026), à valider par JP sur les aperçus :**
  `directions/1-manuel-de-terrain/couvertures-nordique-6.html` (+ `couvertures-nordique-6.pdf` : six avants
  puis six couvertures complètes), générées par `outils/build_couvertures_6.py`, rendues par
  `outils/rendre_couvertures_6.sh` (HTML, PDF, découpe, aperçus, d'une traite). **Écorce pour le 5, fonte pour
  le 6** : ce sont les couleurs principales du fichier. Les variantes non retenues (mousse #444A35 pour le 5,
  rouille #7A4424 pour le 6) sortent du fichier et vont dans `directions/1-manuel-de-terrain/archives/` :
  `couvertures-nordique-6-variantes.html` (autonome, dessins incorporés), son PDF, ses aperçus et l'ancienne
  version de l'outil (bloquée : relancée, elle écraserait le fichier principal).

  - **Un PDF par tome, pour Blurb :** `livre/tome-N/couverture.pdf`, une page, aux mesures du calculateur
    (16,25 po + tranche, sur 10,25 po ; TrimBox à 0,125 po du bord). Edge n'imprime pas une page au point près
    (17,181 po sortait à 17,18) : l'outil imprime un peu plus large, puis `--decouper` remet chaque page à la
    mesure exacte et vérifie une page, les dimensions, les polices incorporées (IBM Plex seulement, pas de
    Type 3) et que l'aplat couvre toute la page. Aperçu de chaque couverture rognée : `livre/tome-N/couverture.png`.
  - **Tranches, sur les comptes réels** des tomes réassemblés le 29 septembre (`PAGES` dans l'outil), lues au
    tableau du calculateur (`sources/blurb-specifications.md`, couverture souple, papier Standard) :

    | Tome | Pages | Tranche | Ligne du tableau | PDF de couverture |
    | --- | ---: | ---: | --- | --- |
    | 1 Tenir | 332 | 0,75 po | entre 320 (0,75) et 340 (0,806) : palier de 320 | 17,0 × 10,25 po |
    | 2 Le corps | 414 | 0,931 po | 400 et 420 : 0,931 | 17,181 × 10,25 po |
    | 3 Prélever | 332 | 0,75 po | palier de 320 | 17,0 × 10,25 po |
    | 4 De la bête au garde-manger | 284 | 0,681 po | entre 280 (0,625) et 300 (0,681) : palier de 300 | 16,931 × 10,25 po |
    | 5 La forêt, le jardin et le chalet | 438 | 1,0 po | entre 420 (0,931) et 440 (1,0) : palier de 440 | 17,25 × 10,25 po |
    | 6 L'atelier | 200 | 0,5 po | ligne 200 | 16,75 × 10,25 po |

    Entre deux lignes, le palier est celui de l'une des deux lignes qui encadrent le compte, lu par
    ⌊4,5 × ⌈pages ÷ 28⌉⌋ pt (1/16 po toutes les 28 pages), qui redonne les 23 lignes du tableau ; c'est une
    lecture du tableau, pas une règle de Blurb. Les six tranches sont identiques aux réponses du calculateur
    pour ces comptes exacts (`livre/tome-N/rapport.md`) : l'outil le vérifie, et **s'arrête si un tome
    réassemblé change de nombre de pages** (ou de sommaire) — on remet le compte dans `PAGES` et on relance.
    Sur la tranche la plus mince (tome 6, 0,5 po), le chiffre descend à ≈ 49 pt pour garder 1/16 po de chaque
    côté des plis.
  - **Les quatrièmes des tomes 1 à 4 au format six tomes**, comme les 5 et 6 : le texte de la série, le
    sommaire du tome (titres tels qu'assemblés, 20 à 22 chapitres sur deux colonnes), un dessin, la barre de
    série. Chaque dessin est une vue d'une planche **validée**, sans ses renvois ni sa légende, recolorée à
    l'encre du tome : tome 1, l'arc à feu monté (13-01) ; tome 2, l'attelle d'écorce moulée sur le bras
    (26-08) ; tome 3, le verveux en coupe (60-01) ; tome 4, le fumoir de baril sur conduit enterré (71-02, sans
    sa cote « 2 ou 3 pas ») ; tome 5, le châssis froid (95-09) ; tome 6, souder avec deux batteries (107-09).
    Même échelle que les 5 et 6 (612 unités sur 7 po), réduite quand la vue dépasse 7 × 2,66 po (tomes 1 et 2).
  - **Aperçus refaits :** `apercu-nordique-couvertures-6-avants.png`, `apercu-nordique-tablette-6-tomes.png`,
    `apercu-nordique-couvertures-5-6.png` (écorce et fonte) et `apercu-nordique-couvertures-6-completes.png`
    (les six couvertures complètes).
  - **À surveiller au téléversement :** la page d'aide de Blurb sur le téléversement dit qu'un livre à
    couverture souple ou rigide « require[s] an ISBN » ; la page qui dit où Blurb pose le code-barres sur la
    couverture n'est pas enregistrée dans `sources/`. Si Blurb pose un code-barres sur la quatrième, il faudra
    lui laisser sa place : [À VÉRIFIER] avant de commander.

- **Planche de style validée par JP le 24 septembre 2026** : `planche-de-style/planche-de-style.pdf`
  (couvertures, palette, typographie, grille, pages, notes de bas de page). Refaire : `planche-de-style/construire.sh`.
  Deux retouches restent sur la planche elle-même : l'en-tête dit « 89 chapitres », et un [À VÉRIFIER] traîne sur
  le gris à 70 %.
- **Épreuves de lecture des chapitres** : `node design/outils/rendre-chapitre.js chapitres/NN-….md` → PDF 8 × 10 dans
  `design/epreuves/`, dans les caractères et la grille du livre. Ce n'est pas la mise en pages finale.
- **Couleur et style de l'intérieur : variante C, choisie par JP le 24 septembre 2026**
  (`variantes-couleur/`, CSS `variantes-couleur/outils/couleur.css`, outil `variante.py NN --variante C`).
  La couleur du tome entre dans les pages : ouverture sur l'aplat de la couverture avec chiffre géant,
  carrés de section, filets, numéros d'étape, titre courant, section 9 et onglet numéroté sur la
  tranche dans la couleur du tome ; teinte pâle du tome sous les en-têtes de tableau et les encadrés ;
  pictogrammes au trait (maison, chalet, les deux, danger, minuteur, thermomètre) ; chiffres clés en
  exergue ; trame fine hachurée sur les aplats. Texte courant noir sur blanc ; le rouge #9B2C1E reste
  au danger seul. Tome 1 : bleu glacier #2B5876 (l'encre #15222B paraît noire en petit). Tome 2 : le
  bordeaux ne va qu'aux aplats et aux teintes, carrés et section 9 restent noirs, pour ne pas
  ressembler au rouge du danger. Chapitre témoin complet : `epreuves-livre/13-C/` (19 pages ; c'est
  l'ancien numéro du chapitre Eau, devenu le 10 — `variante.py 10 --variante C`).
- **Format confirmé par JP le 24 septembre 2026 : « 20 × 25 cm »**, choisi à l'écran de l'imprimeur
  (prix en $ CA). Chez Blurb, c'est le nom métrique arrondi du portrait standard 8 × 10 po
  (20,3 × 25,4 cm) : la grille du livre ne change pas. À revérifier si l'imprimeur n'est pas Blurb —
  un vrai 20,0 × 25,0 cm est plus petit de 3 à 4 mm et demanderait de recaler les marges.
- **À régler avant l'impression :** la largeur de tranche (0,95 po supposée pour 440 pages,
  variable `--spine`), à recaler au calculateur de Blurb une fois le nombre de pages connu — **réglé le
  28 septembre 2026** pour les six tomes assemblés (tableau plus haut, `livre/tome-N/couverture.pdf`).
  **Relevé le 27 septembre 2026** (`sources/blurb-specifications.md`) : couverture souple, papier
  Standard, 440 pages → **1,0 po**, pas 0,95 ; la tranche avance par paliers. L'intérieur d'un tome
  s'assemble avec `python design/outils/assembler-tome.py N` → `livre/tome-N/interieur.pdf` ; son
  `rapport.md` donne la tranche du jour pour le nombre de pages exact. **Aucune page de crédits dans le
  livre** (JP, 28 septembre 2026) : l'assembleur en écrit la copie hors du livre, `livre/credits/tome-N-credits.md`
  et `.pdf` (auteur, licence, lien, fichier, page du tome). Tome 6 : 184 → 182 pages, tranche inchangée (0,431 po).

## Décisions des 27 et 28 septembre 2026

- **Couleurs des tomes 5 et 6.** Tome 5 : **écorce** (#4B3A28, encre #F2EBDF, petits éléments #6B5238), gardée
  telle quelle. Tome 6 : **fonte** (#363432, encre pâle #EEEBE6), choisie par JP à la place de la rouille
  (#7A4424). La fonte est un gris de fer chaud, loin du rouge danger : elle va partout comme le bleu du tome 4
  (aplats, filets, carrés de section, bandeau et tranche de la section 9, onglet), plus besoin de la prudence
  « carrés en noir » de la rouille. Teintes pâles dérivées comme pour les autres tomes : encadrés sur l'encre
  (#EEEBE6), en-têtes de tableau sur l'encre mêlée d'environ 9 % de l'aplat (#DDDAD5). Posée dans
  `variantes-couleur/outils/couleur.css` (body.t6), `directions/1-manuel-de-terrain/outils/build_chapitre.py`
  (TOMES, que l'assembleur relit) et `outils/rendre-chapitre.js`. Sur les couvertures (`build_couvertures_6.py`),
  la fonte est devenue la couleur principale du tome 6 le 28 septembre ; mousse et rouille sont aux archives
  (`directions/1-manuel-de-terrain/archives/`).
- **Chaque chapitre ouvre sur une page de droite**, avec une page blanche devant au besoin : choix de JP, défaut
  de l'assembleur (`--verso` n'est qu'un essai).
- **Tome 1 : le chapitre 00 vient avant tout.** Il est la page 1 du livre, avant la page de titre et le
  sommaire : il se trouve sans chercher. La page de titre suit, toujours au recto, puis le sommaire, qui
  mentionne le 00 (page 1) et le dit dans sa note. Les autres tomes commencent par leur page de titre.
- **Le 00 et le 00b ont leur mise en pages à part** (les deux chapitres d'ancrage, CLAUDE.md) : `ancrage.py`
  (appelé par `build_chapitre.build` pour 00 et 00b), `ancrage.css`, `ancrage-00.js` (pages fixes du 00,
  ajustées au corps) et `ancrage-00b.js` (le 00b coule dans le moteur ; seule la finition change), tous dans
  `directions/1-manuel-de-terrain/outils/`. Le 00 en **double page, validé par JP** : la table des onze blocs en
  page 1, puis chaque bloc à gauche face à son « Quand il n'y a rien » à droite, onglet à la hauteur du bloc
  sur les deux pages ; puis le seuil, le danger et le tableau de substitution (26 pages). Deux phrases du
  chapitre décrivaient l'ancien ordre : réécrites (`suivi/00-redaction.md`, 28 septembre). Le 00b : paliers
  en bandeaux à leur intensité, onglets sur la tranche, colonne Lieu en cases à cocher. Rendus :
  `rendre_c.py 00 00b` → `epreuves-livre/C/00/`, `C/00b/`.
- **Les planches à valider sont posées.** L'assembleur pose aussi les planches de `images/a-valider/`
  (`build_chapitre.DOSSIERS_PLANCHES`), aux placements de `epreuves-livre/placements-tome-N.json` (prioritaires)
  et `placements.json` : JP les relit dans les pages. Le rapport de chaque tome les marque « à valider ». Les
  épreuves de chapitre seul ne posent toujours que les validées. Une planche qu'un placement écarte exprès
  porte `"poser": false` (34-01, qui refait la 28-01 : écartée par la note du placement, tenue hors des pages).
- **Aucune page de crédits dans le livre** (JP, 28 septembre 2026 : « enlève les pages crédit photo, garde les
  backup quelque part mais pas dans le livre »). Rien au sommaire. L'assembleur écrit la copie hors du livre,
  tome par tome : `livre/credits/tome-N-credits.md` et `.pdf` (page du tome, chapitre, fichier, auteur, licence,
  lien). `images/credits.md` et les registres de `images/photos/` restent la référence, inchangés.
- **Corrections du premier essai.**
  - *Polices :* ≥ ≤ ≈ → ₂ tombaient dans Georgia ou Times parce que les sous-ensembles de Google retirent ces
    glyphes d'IBM Plex, qui les a : un second lien Google (`text=`) les recharge de Plex. Ce que Plex n'a pas
    (ᵉ ʳ ⁺, Ω α μ, ∅, ⚠) vient de deux familles « Secours Serif » et « Secours Sans », nommées juste après
    Plex dans `--serif` et `--sans` : Noto Serif et Noto Sans pour les exposants, Noto Serif et IBM Plex Sans
    pour le grec, Noto Sans Math pour ∅, Noto Sans Symbols 2 pour ⚠ (SIL OFL). Instances fixes (une fonte
    variable s'incorpore en Type 3), réduites aux seuls caractères voulus, incorporées dans
    `interieur.tpl.html` par `outils/polices-secours.py` (sources dans `design/polices/`).
  - *Danger :* `build_chapitre.danger_story` ne numérote plus que les vrais points : ceux que le texte numérote
    (`**1.`, `**2 —`, `**A —`), sinon ceux des intertitres (`### 1.`, `### 8.1 —`, plusieurs
    `DANGER —`), sinon chaque paragraphe ouvert en gras. Deux encadrés qui se suivent ne se collent plus
    (ch. 43).
  - *Onglet de tranche :* 12 pt pour les chapitres 100 à 112, dans `couleur.css` (`.chn3`, posé par
    `variante.py`) : les rendus de chapitre seul font comme les tomes assemblés.
  - *Débordements vus à l'assemblage :* une photo en hauteur posée en « demi » (ch. 33 : berce du Caucase,
    cicutaire) sortait de la page ; `chapitre.css` plafonne une photo à 5,2 po de haut, centrée. Le sommaire des
    tomes de 20 à 22 chapitres dépassait le bloc : l'assembleur resserre ses rangs jusqu'à ce qu'il tienne.
- **Les six tomes assemblés le 28 septembre 2026** (`python design/outils/assembler-tome.py N`, puis
  `livre/tome-N/interieur.pdf`, `rapport.md` et quatre aperçus dans `apercus/`) : tome 1, 332 pages (tranche
  0,75 po) ; tome 2, 416 (0,931) ; tome 3, 332 (0,75) ; tome 4, 284 (0,681) ; tome 5, 438 (1,0) ; tome 6, 200
  (0,5). Tranches lues au calculateur de Blurb pour chaque compte exact. **Le tome 5 est à 2 pages du plafond
  de 440** en papier Standard : une planche pleine page de plus dans ce tome, et il faut gagner ailleurs (ou
  passer ce tome en `--verso`, 426 pages, au prix des ouvertures à droite).
- **Les six tomes réassemblés le 29 septembre 2026**, après l'ajout de photos aux `placements-tome-N.json` et des
  retouches de texte : tome 1, 332 pages ; tome 2, 416 ; tome 3, **334** (332 le 28) ; tome 4, 284 ; tome 5, 438 ;
  tome 6, 200. Aucun tome ne dépasse 440, aucune photo retirée faute de place. Tranches inchangées (0,75 ; 0,931 ;
  0,75 ; 0,681 ; 1,0 ; 0,5 po), confirmées par le calculateur pour chaque compte exact. Photos nouvelles dans les
  pages : ch. 10 (hutte de castor), ch. 25 (gelure superficielle), ch. 43 (sept : latrine de loutre, piste de pékan,
  réserve du castor, deux pics, deux signes d'ours). La piste du pékan, ancrée au paragraphe du pékan, sautait les
  deux planches pleine page et tombait parmi les oiseaux, trois pages plus loin : rangée avec les mustélidés (p. 51,
  sur le tableau). Aperçus : `livre/tome-N/apercus/photo-*.png` (à refaire après un réassemblage, qui vide le
  dossier). **Couverture du tome 2 :** la planche 26-08 porte depuis le 28 septembre un repère de coupe A–A dans la
  vue « mouler » ; il sortait sur la quatrième (un « A » et sa flèche, en Georgia) : retiré du dessin dans
  `build_couvertures_6.py` (`sans`, comme la cote du tome 4).

## Règle de mise en page — 29 septembre 2026 (JP)

**Une photo ne reste jamais seule à côté d'une colonne vide.** Quand une photo en quart laisse un blanc
à côté d'elle (un tableau qui prend les deux colonnes juste après, par exemple la page 51 du tome 3,
la piste du pékan), on lui met à côté une autre photo **qui a de l'allure et qui apprend quelque chose
sur le même sujet** (l'animal lui-même, la piste d'une espèce voisine pour comparer, le même signe sous
un autre angle), sous licence vérifiée comme les autres. Sinon, la photo passe en demi.
