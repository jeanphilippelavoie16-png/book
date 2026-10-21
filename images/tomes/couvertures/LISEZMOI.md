# Les couvertures des six tomes (18 octobre 2026)

Mise en page **C, « le ciel fait le tour »**, choisie par JP pour le tome 1, appliquée aux six tomes avec l'image de
titre de chacun (`images/tomes/titre-tome-N.jpg`) : le titre centré sur le devant, le ciel de l'image recadré en
miroir sur la tranche et la quatrième. Depuis le 19 octobre 2026, aux mesures de **Lulu, couverture rigide Case Wrap**
(`CLAUDE.md`, « Format d'impression ») ; la tranche suit le nombre de pages.

    python3 images/tomes/essais-ia/tome-1/couverture.py --tome N --variantes C --sortie images/tomes/couvertures
    python3 images/tomes/essais-ia/tome-1/couverture.py --tome 1 --variantes C --sortie images/tomes/couvertures \
            --pdf images/tomes/couvertures/lulu --controle
    python3 images/tomes/essais-ia/tome-1/couverture.py --six --sortie images/tomes/couvertures

La première ligne fait le PNG d'un tome (150 ppp) ; la deuxième, pour le tome 1, fait aussi le PDF à téléverser chez
Lulu et l'image de contrôle sous le gabarit ; la troisième refait la planche des six. `--format blurb` refait les
couvertures souples 8 × 10 de Blurb d'avant, au pixel près (vérifié sur les six le 19 octobre 2026).

## Le format Lulu (19 octobre 2026)

Les mesures sont celles du gabarit que Lulu a donné pour l'intérieur du tome 1 (354 pages) :
`sources/lulu-captures/gabarit-couverture-tome-1-354p.pdf`, résumé dans `sources/lulu-specifications.md`.

| | |
| --- | --- |
| Couverture entière, wrap compris | 19,813 × 12,75 po (1426,54 × 918 pt) pour le tome 1 ; la largeur suit la tranche |
| Wrap (ce qui se replie sur le carton) | 0,625 po sur les quatre bords ; il remplace le fond perdu de Blurb |
| Planches (cartons), quatrième et devant | 8,75 × 11,5 po chacune |
| Tranche | au tableau de Lulu pour la couverture rigide (`LULU_RIGIDE`), selon le nombre de pages |
| Zone sûre | 0,625 po en dedans du bord de chaque planche, du côté de la tranche aussi |
| Zone du code-barres | 3,622 × 1,26 po, en bas à droite de la quatrième, collée au coin de la zone sûre ; rien d'écrit n'y va |

Dans `couverture.py` (`FORMATS`, `css_format`) :
- le bloc de texte de la quatrième est dans la zone sûre (0,625 po des côtés, 0,655 po du haut) et s'arrête 0,03 po
  au-dessus de la zone du code-barres : il garde presque la hauteur de Blurb (8,93 po contre 9), et la bande du bas
  reste vide (les 0,03 po d'air : les boîtes des lettres débordent de leur ligne d'environ 0,02 po) ; le texte
  d'ouverture s'élargit comme le bloc (7,07 po contre 6,6) : il garde ses cinq lignes (quatre au tome 3), et le trou
  entre le sommaire et « Les auteurs » reste assez haut pour les scènes des tomes 3, 4 et 6 ;
- la tranche et le haut du devant gardent les écarts de Blurb ; le titre du devant part d'une taille agrandie comme la
  largeur de la planche (8,75 / 8), puis rapetisse comme avant s'il manque de place ;
- l'image du tome couvre toute la hauteur, wrap compris, centrée sur la planche (`CADRE_X` : le tome 6 est calé à
  droite, pour que le croissant de lune reste sur la planche, à 0,18 po du bord) ; les cotes du devant prises sur la
  couverture Blurb (3,95 po, `CENTRE_BAS`) sont ramenées au même point de l'image (`y_devant` : 3,95 po devient 4,44 po) ;
- chaque rendu mesure toutes les lignes de texte et dit « ATTENTION … hors de la zone sûre » ou « dans la zone du
  code-barres » s'il le faut ; aucune ligne ne sort, sur les six tomes.

Le PDF du tome 1 (`lulu/couverture-tome-1.pdf`) : une page de 1426,54 × 918 pt, RVB, sans transparence. Le fond (l'image,
les filets, les photos, les ombres des médaillons, l'étincelle de Claude) est une image de 300 ppp ; le texte est
par-dessus, en vectoriel, polices incorporées (Chromium). L'image de contrôle (`lulu/controle-tome-1-C-gabarit.png`) pose
le gabarit de Lulu en transparence sur la couverture : le wrap en bleu clair, la bande de sûreté en bleu foncé, la
tranche en violet, la zone du code-barres en jaune ; tout le texte est dans le blanc.

**Provisoire** : les tomes 2 à 6 n'ont pas encore leur gabarit. Leur tranche est lue au tableau de Lulu pour le nombre
de pages de `build_couvertures_6.PAGES` (les intérieurs Blurb 8 × 10 : 416, 334, 300, 440 et 202 pages, soit 1,188,
1, 0,938, 1,25 et 0,75 po). L'intérieur US Letter n'aura pas ces comptes : chaque tome se refait avec son gabarit,
une fois son intérieur téléversé (le compte dans `PAGES_LULU` de `couverture.py`, le gabarit dans `sources/lulu-captures/`).

Le tome 6 : la lune est remontée dans le coin du ciel, en haut à droite, sur l'image même (`essais-ia/tome-6/lune_atelier.py`,
JP : « rajoute la lune dans l'atelier en haut à droite ») ; elle ne touche plus le titre. Son titre centré est remonté
(`CENTRE_BAS` du script) pour rester dans le ciel noir, au-dessus de la colline enneigée. Sur la couverture Lulu, l'image
est calée à droite (`CADRE_X`) ; le wrap de droite, qu'elle ne couvre plus, prolonge le ciel du bord de la planche et
reflète le paysage.

Deux règles ajoutées au script pour les images des tomes 2 à 6 : le miroir du ciel s'arrête avant la première colonne
qui n'est plus du ciel (les épinettes du tome 4 montaient sur le dos), et avant la première ligne où les collines
commencent (le sommet enneigé du tome 6 faisait des traînées claires sur la quatrième). Sur la couverture Lulu, les
filtres de ces règles grandissent avec l'image, et le miroir s'arrête aussi au-dessus d'une pointe sombre qui monte du
bas du carré repris (la cime d'une épinette du tome 4 et le clou du cadre du tome 2 revenaient au dos en petits
triangles).

Les textes des auteurs, au dos, sont réécrits le 18 octobre 2026 avec les règles d'écriture (JP : « refais nos textes
avec nos règles d'écriture ») : liste `AUTEURS` de `design/directions/1-manuel-de-terrain/outils/build_couvertures_6.py`.

La bulle des photos des auteurs (JP : « travaille la bulle de nos images ») : `BULLES` et `BULLE` de `couverture.py`,
ou `--bulle plate|medaillon|bulle|cuivre`. Par défaut, le médaillon : un filet clair détaché du disque par un mince
anneau du fond, et une ombre. L'étincelle de Claude est l'étincelle simple (`images/auteurs/claude.svg`), à 62 % du disque : le sourire essayé le
18 octobre est retiré (JP, 19 octobre 2026 : « enlève le sourire dans le bonhomme de Claude, finalement c'est pas beau »).

Sur le devant, « Tome N » est toujours à la même distance sous « Le Manuel du Nord » (JP, 19 octobre 2026 : « colle-le
toujours à la même distance »), le titre juste dessous ; le titre rapetisse s'il descendrait sous 3,95 po, ou sous
`CENTRE_BAS` (tome 2 : le cadre au mur ; tome 6 : la colline enneigée). Ces cotes sont celles de la couverture Blurb ;
sur la couverture Lulu, elles suivent l'image (voir plus haut).

Le texte d'ouverture de la quatrième est propre à chaque tome (JP, 19 octobre 2026 : « un différent pour chaque livre,
qui traite du livre ; mentionne c'est quel tome de la séquence de 6 ») : `QUATRIEME` de `couverture.py`. « Vitamine C »
ne se coupe pas en fin de ligne (espace insécable, tome 2 : le « C. » tombait seul en tête de ligne). Le sommaire
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

Sur la couverture Lulu, les modules suivent le format par `info` (`motif_dos()` de `couverture.py`) : `bord`, la zone
sûre, et `x_po`, qui ramène une cote prise sur la quatrième de Blurb au même point du bloc de texte (le lièvre du tome 3,
la scène du tome 5, la lune et la fin des collines du tome 6). Ce qui change à l'œil : la corde du tome 2 se pose sur le
filet de « Dans ce tome », à droite de la dernière ligne du texte d'ouverture, un peu plus courte (2,28 × 0,32 po
contre 2,45 × 0,34 : le trou n'a que 2,28 po de large) ; sur la couverture Blurb, elle tombait sur le filet des
auteurs. Le trou doit tenir la corde entière (sinon, à droite du texte d'ouverture, une colonne haute et étroite la
rendait minuscule). La lampe de sa tranche est plus grande (la tranche aussi). Les entailles du tome 3 suivent
l'image, plus grande ; leur trou est plus haut (le texte d'ouverture a une ligne de moins), le soleil et le lièvre
grandissent avec lui. Le séchoir du tome 4 est un peu plus petit (1,40 po de large contre 1,57 : le trou au-dessus des
auteurs aussi).

## La planche des six

`les-six-couvertures.png`, à refaire à chaque changement d'une couverture (image de titre, nombre de pages, dos, texte).
Fond blanc, marges de 20 px ; chaque couverture complète, wrap (ou fond perdu) compris, ramenée à 1300 px de large (Lanczos) ;
au-dessus de chacune, « Tome N » en DejaVu Sans Bold 30 px, noir, à 20 px du bord et 12 px sous le haut de sa bande ;
la couverture 56 px sous le haut de sa bande ; 20 px de blanc sous la dernière. La recette refait au pixel près la
planche du 19 octobre (commit edb7196) ; `couverture.py --six` l'applique (`planche_des_six()`).
