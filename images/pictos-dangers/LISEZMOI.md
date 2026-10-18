# Les pictogrammes de danger

36 pictogrammes, un par danger de `plan/dangers-inventaire.md` (section 1), `bete-qui-charge` séparé en `ours`
et `orignal`. Chaque fichier `<id>.svg` est un carré 100 × 100 à coins arrondis, rouge du livre `#9B2C1E`, dessin
blanc plein. Les icônes viennent de jeux professionnels sous licence libre ; aucune n'est dessinée à la main. Trois
signes simples sont tracés par le script : le « Z » de sommeil (`co`), la barre oblique (`abats`) et la plaque de
glace fendue (`glace`).

## Relancer

```
python3 construire.py DOSSIER_DES_JSON            # réécrit les 36 SVG
python3 construire.py DOSSIER_DES_JSON --apercu   # et livre/apercus-palette/pictos-dangers*.png
python3 construire.py DOSSIER_DES_JSON --propositions   # propositions/<id>-a.svg, -b.svg et
                                                        # livre/apercus-palette/pictos-dangers-propositions.png
```

`DOSSIER_DES_JSON` contient un `<jeu>.json` par jeu : le fichier `icons.json` du paquet npm
`@iconify-json/<jeu>`, renommé (`https://cdn.jsdelivr.net/npm/@iconify-json/<jeu>/icons.json`). Les jeux
nécessaires : `mdi`, `fa6-solid`, `game-icons`, `pinhead`, `icon-park-solid`, `material-symbols`, `healthicons`,
`twemoji`, `boxicons`, et pour les propositions `fluent-emoji-flat` et `iconoven`. L'aperçu demande Chromium (`/opt/pw-browsers/chromium-*`) et, pour rogner, Pillow.
Pour changer une icône, on change sa recette dans `RECETTES` (jeu, nom, taille, décalage, ajouts).

## D'où vient chaque icône

| Id | Icône (jeu:nom) | Ajout | Auteur | Licence |
| --- | --- | --- | --- | --- |
| `co` | mdi:cloud | deux « Z » tracés | Pictogrammers | Apache 2.0 |
| `generatrice` | mdi:generator-portable | mdi:home-roof | Pictogrammers | Apache 2.0 |
| `electrocution` | pinhead:utility-pole-with-bolt | | Quincy Morgan | CC0 |
| `vapeurs` | icon-park-solid:petrol | mdi:heat-wave | ByteDance ; Pictogrammers | Apache 2.0 |
| `huile-en-feu` | material-symbols:skillet (la poêle seule, sans la vapeur) | mdi:fire | Google ; Pictogrammers | Apache 2.0 |
| `incendie` | fa6-solid:house-fire | | Fonticons (Dave Gandy) | CC BY 4.0 |
| `feu-de-foret` | mdi:pine-tree-fire | | Pictogrammers | Apache 2.0 |
| `espace-clos` | game-icons:hole-ladder | | Delapouite | CC BY 3.0 |
| `chimie` | fa6-solid:flask | | Fonticons (Dave Gandy) | CC BY 4.0 |
| `pas-au-feu` | mdi:fire-off | | Pictogrammers | Apache 2.0 |
| `projection` | fa6-solid:burst | | Fonticons (Dave Gandy) | CC BY 4.0 |
| `ecrasement` | fa6-solid:weight-hanging | fa6-solid:person | Fonticons (Dave Gandy) | CC BY 4.0 |
| `coupure` | game-icons:dripping-knife | | Lorc | CC BY 3.0 |
| `brulure` | mdi:kettle-steam | | Pictogrammers | Apache 2.0 |
| `froid` | fa6-solid:snowflake | | Fonticons (Dave Gandy) | CC BY 4.0 |
| `eau-froide` | fa6-solid:person-drowning | | Fonticons (Dave Gandy) | CC BY 4.0 |
| `glace` | fa6-solid:person-walking | plaque fendue tracée | Fonticons (Dave Gandy) | CC BY 4.0 |
| `ours` | pinhead:bear | | Quincy Morgan | CC0 |
| `orignal` | twemoji:moose (couleurs ramenées au blanc ; yeux, naseaux et creux des oreilles au rouge) | | Twitter (jdecked/twemoji) | CC BY 4.0 |
| `arme` | mdi:crosshairs | | Pictogrammers | Apache 2.0 |
| `rage` | game-icons:wolf-head | | Lorc | CC BY 3.0 |
| `tularemie` | game-icons:rabbit | | Delapouite | CC BY 3.0 |
| `hantavirus` | mdi:rodent | | Pictogrammers | Apache 2.0 |
| `tetanos` | mdi:nail (penché à 35°) | | Pictogrammers | Apache 2.0 |
| `cuisson` | mdi:thermometer | | Pictogrammers | Apache 2.0 |
| `trichine` | fa6-solid:worm | | Fonticons (Dave Gandy) | CC BY 4.0 |
| `abats` | game-icons:liver | barre oblique tracée | Delapouite | CC BY 3.0 |
| `botulisme` | fa6-solid:jar | | Fonticons (Dave Gandy) | CC BY 4.0 |
| `zone-de-danger` | fa6-solid:hourglass | | Fonticons (Dave Gandy) | CC BY 4.0 |
| `mal-de-caribou` | boxicons:meat-filled | mdi:water (la goutte de gras) | Boxicons ; Pictogrammers | MIT ; Apache 2.0 |
| `thuyone` | mdi:tea-off | | Pictogrammers | Apache 2.0 |
| `plante` | game-icons:cherry | | Delapouite | CC BY 3.0 |
| `plomb` | game-icons:pouch-with-beads | | SeregaCthtuf | CC BY 3.0 |
| `selles` | fa6-solid:poop | | Fonticons (Dave Gandy) | CC BY 4.0 |
| `poison` | healthicons:poison | | Resolve to Save Lives | MIT |
| `vie-en-jeu` | fa6-solid:heart-pulse | | Fonticons (Dave Gandy) | CC BY 4.0 |

Versions des paquets lues le 18 octobre 2026 : mdi 1.2.3, fa6-solid 1.2.4, game-icons 1.2.4, healthicons 1.2.13,
pinhead 1.2.34, icon-park-solid 1.2.4, material-symbols 1.2.95, twemoji 1.2.5, boxicons 1.2.0.

Les licences CC BY demandent l'attribution : elle est dans `images/credits.md` (copie par tome hors du livre),
comme les autres crédits. Aucune n'est non commerciale.

## Propositions du 18 octobre (en attente du choix de JP)

JP : « ils sont beaux, mais modifie-les ; il y en a qui sont bizarres ». Seize pictogrammes ont deux propositions
chacun, dans `propositions/<id>-a.svg` et `<id>-b.svg` (recettes dans `PROPOSITIONS`). Les fichiers `<id>.svg` ne
changent pas tant que JP n'a pas choisi : on copie alors la recette choisie dans `RECETTES` et on relance.
Les signes tracés par le script (toit au trait, fosse en U, planche, billes, baies, « moins » sur la goutte, barre)
sont des formes simples ; le sujet vient toujours d'un jeu d'icônes.

| Proposition | Icône (jeu:nom) | Ajout | Auteur | Licence |
| --- | --- | --- | --- | --- |
| `co-a` dormeur et flamme sous le toit | pinhead:person-sleeping | mdi:fire, toit tracé | Quincy Morgan ; Pictogrammers | CC0 ; Apache 2.0 |
| `co-b` maison fermée, nuage dedans | fa6-solid:house (porte bouchée) | mdi:cloud en creux | Fonticons ; Pictogrammers | CC BY 4.0 ; Apache 2.0 |
| `generatrice-a` | game-icons:power-generator | | Delapouite | CC BY 3.0 |
| `generatrice-b` | game-icons:power-generator | toit tracé | Delapouite | CC BY 3.0 |
| `espace-clos-a` personne au fond | fa6-solid:person | fosse tracée | Fonticons | CC BY 4.0 |
| `espace-clos-b` échelle dans la fosse | mdi:ladder | fosse tracée | Pictogrammers | Apache 2.0 |
| `pas-au-feu-a` bûche barrée | game-icons:log | mdi:fire, barre | Delapouite ; Pictogrammers | CC BY 3.0 ; Apache 2.0 |
| `pas-au-feu-b` feu et fumée toxique | mdi:fire | game-icons:poison-cloud | Pictogrammers ; Sbed | Apache 2.0 ; CC BY 3.0 |
| `abats-a` foie barré | pinhead:liver-with-bile-duct | barre | Quincy Morgan | CC0 |
| `abats-b` rognons barrés | pinhead:kidneys | barre | Quincy Morgan | CC0 |
| `mal-de-caribou-a` | game-icons:ham-shank | mdi:water | Skoll ; Pictogrammers | CC BY 3.0 ; Apache 2.0 |
| `mal-de-caribou-b` | game-icons:ham-shank | mdi:water, « moins » tracé | Skoll ; Pictogrammers | CC BY 3.0 ; Apache 2.0 |
| `thuyone-a` rameau et tasse | game-icons:tree-branch | mdi:tea, barre | Lorc ; Pictogrammers | CC BY 3.0 ; Apache 2.0 |
| `thuyone-b` rameau dans la tasse | game-icons:tree-branch | mdi:tea, barre | Lorc ; Pictogrammers | CC BY 3.0 ; Apache 2.0 |
| `plomb-a` cartouches | game-icons:shotgun-rounds | | Delapouite | CC BY 3.0 |
| `plomb-b` enfant et bille | fa6-solid:child | billes tracées | Fonticons | CC BY 4.0 |
| `tetanos-a` clou dans le pied | game-icons:nailed-foot | | Lorc | CC BY 3.0 |
| `tetanos-b` clou qui sort de la planche | mdi:nail (pointe en haut) | planche tracée | Pictogrammers | Apache 2.0 |
| `orignal-a` tête de profil | fluent-emoji-flat:moose (couleurs ramenées au blanc, naseau et oreille en rouge) | | Microsoft | MIT |
| `orignal-b` tête de face sans les yeux | twemoji:moose | | Twitter (jdecked/twemoji) | CC BY 4.0 |
| `trichine-a` ver dans la viande | boxicons:meat-filled | fa6-solid:worm | Boxicons ; Fonticons | MIT ; CC BY 4.0 |
| `trichine-b` tête d'ours et ver | game-icons:bear-head | fa6-solid:worm | Delapouite ; Fonticons | CC BY 3.0 ; CC BY 4.0 |
| `selles-a` mains sous le robinet | mdi:hand-wash | | Pictogrammers | Apache 2.0 |
| `selles-b` mouche | game-icons:fly | | Delapouite | CC BY 3.0 |
| `arme-a` carabine à levier | game-icons:winchester-rifle (épaissie) | | Skoll | CC BY 3.0 |
| `arme-b` carabine à verrou | game-icons:lee-enfield (épaissie) | | Skoll | CC BY 3.0 |
| `cuisson-a` thermomètre dans le gigot | game-icons:ham-shank | mdi:thermometer | Skoll ; Pictogrammers | CC BY 3.0 ; Apache 2.0 |
| `cuisson-b` sonde à cadran | boxicons:meat-filled | iconoven:meat-thermometer (épaissie) | Boxicons ; Appic Marketing | MIT |
| `botulisme-a` bocal et poisson | fa6-solid:jar | mdi:fish | Fonticons ; Pictogrammers | CC BY 4.0 ; Apache 2.0 |
| `botulisme-b` conserve de poisson | game-icons:canned-fish | | Delapouite | CC BY 3.0 |
| `plante-a` rameau de baies | game-icons:elderberry | | Lorc | CC BY 3.0 |
| `plante-b` feuille et baies | fa6-solid:leaf | baies tracées | Fonticons | CC BY 4.0 |

Versions ajoutées : fluent-emoji-flat 1.2.6, iconoven 1.2.1.

## Le choix de JP (18 octobre 2026)

Sur la planche des propositions, JP a entouré : co A, generatrice A, abats A, mal-de-caribou A, thuyone A, plomb A,
tetanos A, orignal B, trichine B, selles A, arme B, cuisson B, botulisme A, plante A ; espace-clos et pas-au-feu
gardent leur dessin d'origine. Le choix est dans `CHOIX` de `construire.py`.
