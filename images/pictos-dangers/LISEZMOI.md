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
```

`DOSSIER_DES_JSON` contient un `<jeu>.json` par jeu : le fichier `icons.json` du paquet npm
`@iconify-json/<jeu>`, renommé (`https://cdn.jsdelivr.net/npm/@iconify-json/<jeu>/icons.json`). Les jeux
nécessaires : `mdi`, `fa6-solid`, `game-icons`, `pinhead`, `icon-park-solid`, `material-symbols`, `healthicons`,
`twemoji`, `boxicons`. L'aperçu demande Chromium (`/opt/pw-browsers/chromium-*`) et, pour rogner, Pillow.
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
