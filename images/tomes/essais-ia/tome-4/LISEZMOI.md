# Tome 4, De la bête au garde-manger : essais d'images pour la page de titre et la couverture

Générées le 18 octobre 2026 par AI Horde (gratuit, sans clé) avec `../horde-img2img.py`, 768 × 960, dans le style
de `images/tomes/titre-tome-1.jpg` : linogravure, trois encres (bleu ardoise foncé #25414F, papier blanc cassé,
orange #EE7219 pour le feu et la lumière), grand ciel calme en haut pour le titre, collines basses, scène dans la
moitié du bas. Aucune image n'est agrandie : l'orchestrateur agrandit celle que JP choisit.

Planche de choix : `tome-4-pistes.png` (six candidates, numéro au-dessus). Chaque candidate est dans le dossier sous
le numéro de la planche : `tome-4-1.png` à `tome-4-6.png`, plus `tome-4-4-sans-lune.png`.

## Les deux scènes

- **Le fumoir, les quartiers et le caveau** (la scène proposée) : soir de fin d'automne, première neige, un petit
  fumoir en planches dont la porte entrouverte laisse voir la lueur orange et dont la fumée monte, trois quartiers
  enveloppés dans des sacs de coton blancs suspendus à une perche entre deux épinettes, la porte du caveau creusé
  dans la butte, le chalet plus loin.
- **Le bord du lac au couchant** (deuxième idée) : le séchoir à truites au-dessus du feu, le soleil couché sur les
  collines basses et son reflet orange sur le lac, le canot sur la neige, le chalet sous les épinettes. Elle couvre
  les chapitres du poisson (75 à 77), le séchage et le fumage, et c'est elle qui a donné les images les plus fortes.

## Les candidates

| N° | Fichier d'origine | Comment | Forces | À surveiller |
| --- | --- | --- | --- | --- |
| 1 | `t4-r3-flux-lac-85-0.webp`, signature effacée | Flux, image de départ `t4-depart-lac.png`, force 0,85, `t4-prompt-flux3-lac.txt` | La plus proche du tome 1 : traces de gouge, trois encres, orange réservé au soleil, au feu et à la fenêtre. Ciel calme sur 46 % du haut. | Une fausse signature sur la neige en bas à gauche, recouverte au tampon par la neige voisine (`effacer-signature.py`, zone 18,918 à 166,950). Les épinettes de droite montent jusqu'à 10 % du haut, au bord droit, près de « TOME 4 ». Le ciel (#35545E) est un peu plus clair et plus vert-de-gris que #25414F. |
| 2 | `t4-r4-flux-lacnet-55-0.webp` | Flux sur la n° 1 nettoyée, force 0,55, `t4-prompt-flux4-lac.txt` | La même image refaite par le générateur, sans aucune retouche à la main. Un peu plus de grain dans le ciel. | Comme la 1. |
| 3 | `t4-r4-flux-lacnet-55-1.webp` | Même tâche que la 2 | Quelques étoiles de plus. | Deux petites étoiles tombent dans la zone du titre, en haut à gauche. |
| 4 | `t4-r5-flux-fumoir-84-0.webp` | Flux, image de départ `t4-depart-3.png`, force 0,84, `t4-prompt-flux5-fumoir.txt` | La scène proposée, en gravure populaire : fumoir en planches sombres, porte orange, gros panache de fumée, quatre sacs blancs, chalet allumé, collines basses. Ciel très calme et foncé (#0D2431). | Le croissant de lune est en haut à gauche, sous l'en-tête et le titre : `tome-4-4-sans-lune.png` est la même image sans la lune (ciel recopié à droite, fondu large). La perche est un poteau avec une traverse, qui fait une croix. Une remise en plus du chalet. Le caveau n'est qu'une petite butte sans porte. |
| 5 | `t4-r2-flux-i2i-80-0.webp` | Flux, image de départ `t4-depart-2.png`, force 0,80, `t4-prompt-flux2-fumoir.txt` | Toute la composition imposée est là : fumoir à la porte orange, deux fumées, trois sacs devant le fourré, la porte du caveau dans la butte, le chalet. Ciel #1C3844, proche de la couleur du tome. | Aplat d'illustration plus que linogravure (peu de traces de gouge). Deux barres en croix de chaque côté de la porte du caveau (le générateur a lu les poteaux du muret comme des bâtons). Légères bandes de compression dans le ciel, à surveiller à l'agrandissement. |
| 6 | `t4-r5-flux-texture-60-1.webp` | Flux sur la n° 5, force 0,60, `t4-prompt-flux5-fumoir.txt` | Même composition que la 5, un peu plus de matière ; collines plus marquées. | Mêmes réserves que la 5 ; les collines ont des sommets arrondis, bas (sous 55 % de la hauteur). |

## Recommandation

**La 1** (ou la 2, la même sans retouche à la main). C'est la seule qui a vraiment la main de la linogravure du
tome 1, avec ses trois encres, et le sujet du tome s'y lit d'un coup d'œil : le poisson qui sèche au-dessus du feu,
au chalet, au bord de l'eau. Rien de cru : des truites entières qui sèchent, pas de sang, pas de visage.

Pour la scène proposée (les quartiers et le fumoir), **la 4, dans sa version sans lune**. Elle a le plus d'âme parmi
les versions du fumoir. La 5 est la plus complète (le caveau s'y voit), mais elle est en aplat, plus près de
l'affiche que de la gravure.

## Les tours

Les textes sont dans les fichiers `t4-prompt-*.txt` ; les journaux des tâches (identifiants AI Horde, file
d'attente), dans `journaux/`. L'image de départ est dessinée par `scene_t4.py` (épinettes de `../../scene_titre.py`),
rasterisée par `rasteriser.sh` (Chromium headless).

1. **Tour 1.** Flux à partir du texte seul, les deux scènes (`t4-flux-fumoir-a`, `t4-flux-sechoir-a`) ;
   Juggernaut XL à partir du texte seul (`t4-jugg-texte-fumoir`) ; Juggernaut XL sur `t4-depart-1.png` à 0,72 et
   0,78, et sur `t4-depart-sechoir.png` à 0,75.
2. **Tour 2.** Image de départ corrigée (`t4-depart-2.png` : fourré sombre derrière les sacs, sacs plus gros, fumée
   plus marquée, butte du caveau plus grosse) et textes qui disent le ciel vide. Juggernaut XL à 0,65 et 0,72,
   AlbedoBase XL à 0,70, Flux sur l'image de départ à 0,80 ; Flux à partir du texte seul avec « full-bleed book
   cover », qui a supprimé la marge crème.
3. **Tour 3.** `t4-depart-3.png` (poteaux droits de chaque côté de la porte du caveau) et `t4-depart-lac.png` (le
   lac au couchant). Flux à 0,85 sur les deux ; Juggernaut XL à 0,50 et 0,58 posé sur les Flux du tour 2, pour
   ajouter la gravure.
4. **Tour 4.** Flux à 0,88 sur les deux images de départ avec les mots « book cover illustration in the style of a
   linocut » (sans le mot « print », qui appelle la signature) ; Flux à 0,55 sur la n° 1 nettoyée.
5. **Tour 5.** Flux à 0,84 et 0,90 sur `t4-depart-3.png` avec « exactly three structures, no other buildings » ;
   Flux à 0,60 sur la n° 5. Le conteneur a redémarré pendant ce tour : les trois tâches, déjà acceptées par AI Horde,
   ont été récupérées par leur identifiant avec `horde-reprendre.py`, sans être relancées.

Quarante-quatre images en tout ; les originaux sont gardés en `.webp`, tels que le service les a rendus.

## Ce qui a été écarté, et pourquoi

- **Juggernaut XL, toutes les versions.** À partir du texte seul : de la peinture, pas de la gravure, ni fumoir
  ni perche, une grosse lune orange, une fausse signature (`t4-jugg-texte-fumoir-1`). À partir de l'image de départ :
  le style linogravure est bon (`t4-jugg-i2i-78-0` est la plus belle gravure du lot), mais le ciel est criblé
  d'étoiles, et les sacs, la fumée et le séchoir disparaissent. Le caveau devient une deuxième cabane, le séchoir à
  poisson une clôture. Avec « ciel vide », le ciel devient rayé (`t4-r2-jugg-65`), une flamme orange flotte dans le
  ciel, des lettres apparaissent dans les fenêtres (`t4-r2-jugg-72-0`). Même posé sur une image Flux à 0,50, il
  change les sacs en tentes et la fumée en nuage. Juggernaut ne sait pas garder des quartiers suspendus.
- **AlbedoBase XL** (`t4-r2-albedo-70`) : affiche à plat, trois cabanes en double, aucun sac ni fumée.
- **Flux avec « linocut print » ou « relief print »** (tours 1 et 3) : marge de papier crème et fausse signature
  presque à chaque fois, souvent une date. Les marges en plein ciel (bord droit de `t4-flux-fumoir-a-1`,
  `t4-flux-sechoir-a-1`, `t4-r2-flux-sechoir-0`) ne s'enlèvent pas sans recadrer et agrandir.
- **Objets en double ou bizarres** : trois ou quatre cabanes (`t4-r3-flux-fumoir-85-1`, `t4-r5-flux-fumoir-84-1`,
  `t4-r5-flux-fumoir-90-1`), deux ou trois canots (`t4-flux-sechoir-a-1`, `t4-r3-flux-lac-85-1`), un voilier avec une
  petite silhouette (`t4-flux-sechoir-a-0`), des barques sur le lac (`t4-r4-flux-lac-88-0`), une butte en forme de
  pouding glacé au milieu du premier plan (`t4-r2-flux-fumoir-1`), une marmite et du texte sur un canot
  (`t4-r3-flux-lac-85-1`), un poteau en potence avec une étoile collée à la zone du titre (`t4-r4-flux-lac-88-1`).
- **`t4-r4-flux-fumoir-88-0`, écartée de justesse** : c'est la seule où le caveau se lit sans hésiter (une porte
  ronde creusée dans la butte), mais le fumoir est peint en orange (l'orange doit rester au feu et à la lumière), le
  chalet est doublé d'une seconde cabane et des sacs pendent aussi au mur du fumoir.
- **`t4-r5-flux-fumoir-90-0`** : fausse date « 1945 » en bas à gauche, porte du fumoir éteinte.
- **`t4-r2-flux-i2i-80-1` et `t4-r5-flux-texture-60-0`** : presque pareilles que la 5 ; la seconde a une fenêtre
  allumée dans la porte du caveau.

## Pour l'assemblage

- Les épinettes de droite des n° 1 à 3 montent haut sur le bord droit ; le titre, posé à gauche et au centre comme
  au tome 1, reste dans le ciel libre (46 % du haut).
- Le ciel n'est pas exactement #25414F : plus clair en 1 à 3, plus foncé en 4, proche en 5 et 6. Une teinte globale
  à l'agrandissement peut le rapprocher de la couleur du tome.
- Les étoiles qui tomberaient derrière le texte se retirent comme au tome 1.
