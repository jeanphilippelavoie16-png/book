# Les images des pages de titre des tomes

**Depuis le 18 octobre 2026, la page de titre est l'affiche du Nord, la nuit d'hiver** (choix de JP) :
`titre-tome-N.svg`, une scène dessinée en aplats (ciel, lune, crêtes, fleuve, épinettes, neige, chalet aux fenêtres
orange), en px de la page rognée (768 × 960). L'assembleur l'incorpore telle quelle ; un tome sans scène prend celle
du tome 1. La frise ci-dessous n'est plus posée sur la page de titre.

`frise.py N` compose `tome-N.svg` ; l'assembleur la pose dans la bande blanche de la page de titre (`.tp-frise`).
Les pictogrammes viennent de jeux professionnels sous licence libre, copiés dans `icones/` (paquets npm
`@iconify-json/…`) ; aucun n'est dessiné à la main (JP, 16 octobre 2026, sur l'essai dessiné : « c'est laid »).

| Fichier | Jeu | Auteur | Licence |
| --- | --- | --- | --- |
| `game-icons--mushroom-cloud`, `game-icons--burning-forest` | Game-icons.net | Lorc, Delapouite et contributeurs | CC BY 3.0 |
| `mdi--*` | Material Design Icons | Pictogrammers | Apache 2.0 |
| `fa6-solid--house-fire` | Font Awesome 6 Free | Fonticons (Dave Gandy) | CC BY 4.0 |

Ces lignes vont aussi dans `images/credits.md` (copie hors livre par tome, comme les autres crédits).
