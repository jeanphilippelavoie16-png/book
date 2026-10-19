# Les couvertures des six tomes (18 octobre 2026)

Mise en page **C, « le ciel fait le tour »**, choisie par JP pour le tome 1, appliquée aux six tomes avec l'image de
titre de chacun (`images/tomes/titre-tome-N.jpg`) : le titre centré sur le devant, le ciel de l'image recadré en
miroir sur la tranche et la quatrième, aux mesures de Blurb de chaque tome (la tranche suit le nombre de pages).

    python3 images/tomes/essais-ia/tome-1/couverture.py --tome N --variantes C --sortie images/tomes/couvertures

À savoir : depuis le 19 octobre 2026, le livre s'imprime chez Lulu en 8,5 × 11 po, couverture rigide (`CLAUDE.md`).
Les couvertures refaites le même jour sont encore aux mesures de Blurb 8 × 10 (`mesures()` de `couverture.py`, `SPINE`
de `build_couvertures_6.py`) : elles seront à reprendre au gabarit de couverture rigide de Lulu.

Le tome 6 : la lune est remontée dans le coin du ciel, en haut à droite, sur l'image même (`essais-ia/tome-6/lune_atelier.py`,
JP : « rajoute la lune dans l'atelier en haut à droite ») ; elle ne touche plus le titre. Son titre centré est remonté
(`CENTRE_BAS` du script) pour rester dans le ciel noir, au-dessus de la colline enneigée.

Deux règles ajoutées au script pour les images des tomes 2 à 6 : le miroir du ciel s'arrête avant la première colonne
qui n'est plus du ciel (les épinettes du tome 4 montaient sur le dos), et avant la première ligne où les collines
commencent (le sommet enneigé du tome 6 faisait des traînées claires sur la quatrième).

Les textes des auteurs, au dos, sont réécrits le 18 octobre 2026 avec les règles d'écriture (JP : « refais nos textes
avec nos règles d'écriture ») : liste `AUTEURS` de `design/directions/1-manuel-de-terrain/outils/build_couvertures_6.py`.

La bulle des photos des auteurs (JP : « travaille la bulle de nos images ») : `BULLES` et `BULLE` de `couverture.py`,
ou `--bulle plate|medaillon|bulle|cuivre`. Par défaut, le médaillon : un filet clair détaché du disque par un mince
anneau du fond, et une ombre. L'étincelle de Claude sourit (JP : « mets-toi un sourire, genre :) mais de l'autre sens ») :
`images/auteurs/claude.svg`, les yeux et le sourire découpés dans le cœur de l'étincelle, agrandi ; elle prend 72 % du
disque au lieu de 62 %.

Sur le devant, « Tome N » est toujours à la même distance sous « Le Manuel du Nord » (JP, 19 octobre 2026 : « colle-le
toujours à la même distance »), le titre juste dessous ; le titre rapetisse s'il descendrait sous 3,95 po, ou sous
`CENTRE_BAS` (tome 2 : le cadre au mur ; tome 6 : la colline enneigée).

Le texte d'ouverture de la quatrième est propre à chaque tome (JP, 19 octobre 2026 : « un différent pour chaque livre,
qui traite du livre ; mentionne c'est quel tome de la séquence de 6 ») : `QUATRIEME` de `couverture.py`. Le sommaire
vient de `SOMMAIRE` de `build_couvertures_6.py` (le ch. 39 s'appelle « Les jeunes enfants »).

## Le dos de chaque tome (19 octobre 2026)

Des éléments de l'image du devant reviennent dans les trous de la quatrième et de la tranche (JP : « j'aime que pour le
tome 1 on retrouve des éléments de la couverture en arrière, fais-le pour les autres » ; « mets-en dans les trous sur la
page en arrière, faut juste pas que ça touche au texte »). Chaque tome a son module `images/tomes/essais-ia/tome-N/dos.py`
(fonction `motif(can, info)`), appelé par `motif_dos()` de `couverture.py` ; on le règle là, jamais dans `couverture.py`.

Devant les six dos, JP a tranché : « J'aime le tome 2 et 6 à date » (et le 3) ; « le tome 4 et 5 seraient à
travailler, c'est les seuls qui manquent d'âme ». Les dos 4 et 5 sont refaits sur le modèle des trois qu'il aime : une
petite scène de l'image du devant, reconnaissable d'un coup d'œil, qui vit (une flamme, un soleil qui se couche, une
lune), posée sur quelque chose (une ligne d'horizon, un filet, une tablette), découpée dans l'image elle-même, à ses
encres. Une scène peut toucher un filet (JP : « si le bois du bas touche à la ligne, c'est correct ») ; jamais une ligne
de texte, une photo ni la barre des tomes.

- **Tome 1** : pas de module. Les étoiles du ciel du devant reviennent avec le miroir du ciel ; celles qui touchent
  une lettre sont retirées.
- **Tome 2**, aimé : sur la tranche, la lampe à huile allumée sur sa tablette, les trois bouquets d'herbes pendus
  dessous, la lueur sur le mur. Sur la quatrième, la corde de bois de sous le poêle **posée sur le filet du sommaire**
  (JP : « le bois, colle-le sur la ligne parce qu'il est coupé »), deux fois plus longue qu'au premier essai, à la même
  hauteur (JP : « plus de bois, pas plus haut, mais sur une plus grande largeur »).
- **Tome 3**, aimé : dans le trou entre le sommaire et « Les auteurs », quatre entailles de gouge du ciel en horizon, le
  soleil orange qui se couche sur la dernière, et le lièvre de la grève assis sur le même horizon.
- **Tome 4**, refait : sur la quatrième, posés sur le filet des auteurs, le séchoir à truites et le feu au pied, sur
  une butte du pré de la rive. Sur la tranche, sous le titre, le soleil qui se couche derrière une île sombre, et ses
  reflets orange sur le lac.
- **Tome 5**, refait : sur la quatrième, à droite de « Dans ce tome » et posée sur son filet, la bande du devant
  réduite d'un bloc : la crête et son liséré orange, la forêt, la longue cabane et sa rangée de pierres, le chalet aux
  fenêtres allumées, le soleil à demi couché sur la colline. Les nuages orange sont retirés.
- **Tome 6**, aimé : dans le grand trou entre le sommaire et « Les auteurs », une bande de paysage : les collines
  enneigées avec leurs traits de gouge, la lisière d'épinettes, le croissant de lune.

## La planche des six

`les-six-couvertures.png`, à refaire à chaque changement d'une couverture (image de titre, nombre de pages, dos, texte).
Fond blanc, marges de 20 px ; chaque couverture complète, fond perdu compris, ramenée à 1300 px de large (Lanczos) ;
au-dessus de chacune, « Tome N » en DejaVu Sans Bold 30 px, noir, à 20 px du bord et 12 px sous le haut de sa bande ;
la couverture 56 px sous le haut de sa bande ; 20 px de blanc sous la dernière. La recette refait au pixel près la
planche du 19 octobre (commit edb7196).
