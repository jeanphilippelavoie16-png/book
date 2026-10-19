# Les couvertures des six tomes (18 octobre 2026)

Mise en page **C, « le ciel fait le tour »**, choisie par JP pour le tome 1, appliquée aux six tomes avec l'image de
titre de chacun (`images/tomes/titre-tome-N.jpg`) : le titre centré sur le devant, le ciel de l'image recadré en
miroir sur la tranche et la quatrième, aux mesures de Blurb de chaque tome (la tranche suit le nombre de pages).

    python3 images/tomes/essais-ia/tome-1/couverture.py --tome N --variantes C --sortie images/tomes/couvertures

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

Planche : `les-six-couvertures.png`. À refaire à chaque changement d'image de titre ou du nombre de pages d'un tome.
