# Tome 6, L'atelier : essais d'image de titre (18 octobre 2026)

AI Horde (`../horde-img2img.py`, gratuit, sans clé), 768 × 960, rien d'agrandi. Les images de départ sont dessinées
par `scene_atelier.py` (épinettes importées de `images/tomes/scene_titre.py`, qui n'est pas modifié) et rendues
par Chromium headless : `ref-atelier-A.png` (atelier en planches de face, porte double ouverte sur la forge,
enclume sur sa bille, chalet à gauche, lueur sur la neige), `ref-atelier-B.png` (deuxième idée : appentis ouvert,
forge dehors, forgeron en silhouette lointaine qui frappe), puis `A2` et `B2` (deuxième tour : sans lune, fumée
courte, atelier agrandi). Planche de choix : `tome-6-pistes.png` (candidates `candidate-1.png` à `-6.png`).

## Premier tour : ce qui a été fait

| Fichiers | Modèle, source, force | Texte | Verdict |
| --- | --- | --- | --- |
| `t6-jtxt-0/1` | Juggernaut XL, texte seul | `prompt-forge-sdxl.txt` | écartées : ciel orange, chalet qui monte dans le ciel, bordure, signature |
| `t6-flux-0` | Flux, texte seul | `prompt-forge-flux.txt` | écartée : signature aux deux coins, épinettes jusqu'au quart du haut |
| `t6-flux-1` | idem | idem | **candidate 4** : bel atelier ouvert ; défauts : signature en bas à droite, flaque orange sans raison, deux enclumes |
| `t6-fluxB-0/1` | Flux, texte seul, idée B | `prompt-appentis-flux.txt` | écartées : signature, épinettes dans la zone du titre, feu sur une souche au lieu d'une forge |
| `t6-jA70-0` | Juggernaut XL, ref A, 0,70 | `prompt-atelier-img2img.txt` | **candidate 6** : vraie linogravure ; défauts : porte fermée (plus de forge), croissant orange dans la zone du titre, ciel semé de points |
| `t6-jA70-1` | idem | idem | écartée : mêmes défauts, brouette |
| `t6-jA78-0` | Juggernaut XL, ref A, 0,78 | idem | écartée : croissant dans le titre, porte fermée |
| `t6-jA78-1` | idem | idem | **candidate 5** : la plus belle gravure ; défauts : gros croissant en haut à gauche (sur le titre), porte fermée |
| `t6-aA72-0` | AlbedoBase XL, ref A, 0,72 | idem | **candidate 2** : porte ouverte sur le feu, ciel presque vide ; défauts : croissant orange à droite sous le titre, rendu gouache plus que gravure, un banc qui ressemble à une table à pique-nique |
| `t6-aA72-1` | idem | idem | écartée : croissant collé au bandeau du haut |
| `t6-jB75-0/1` | Juggernaut XL, ref B, 0,75 | `prompt-appentis-img2img.txt` | écartées : la fumée devient un éclair orange dans le ciel, un ours, la silhouette disparaît |
| `t6-fA80-0` | Flux, ref A, 0,80 | `prompt-atelier-flux-img2img.txt` | **candidate 3** : composition exacte (ciel vide, forge, hotte, enclume, outils), sans signature ni marge ; défaut : aplat vectoriel lisse, sans gouge (risque « manque d'âme ») |
| `t6-fA80-1` | idem | idem | écartée : une petite bête au bas de l'image |
| `t6-fA88-0` | Flux, ref A, 0,88 | `prompt-atelier-flux-img2img-2.txt` | écartée : marge crème, signature, croissant dans le titre |
| `t6-fA88-1` | idem | idem | **candidate 1** : vraie gouge, portes ouvertes sur l'enclume, les pinces et le foyer, corde de bois, hache plantée, sans signature ni marge ; défauts : petit croissant en haut à droite, ciel noir plutôt que charbon, l'atelier monte à 36 % de la hauteur (ciel = le tiers du haut, pas plus) |

Ce que le premier tour apprend : la lune, même demandée « basse à droite », remonte dans la zone du titre ; un
long filet de fumée dans l'image de départ devient un éclair ; Juggernaut ferme la porte et perd la forge ; Flux
à partir du texte signe toujours, mais Flux en img2img (image de départ sans marge) ne signe pas, et le texte
« rough hand-carved… gouge strokes » lui donne la gouge.

## Deuxième tour (lancé, pas encore revenu au moment du rapport)

Image de départ `ref-atelier-A2.png` / `B2.png`, textes `prompt-atelier-img2img-2.txt`,
`prompt-appentis-img2img-2.txt` (négatifs : moon, comet, lightning, snowfall, animal, closed door) et
`prompt-atelier-flux-img2img-3.txt` (sans lune). Sorties attendues dans ce dossier, en `.webp` :
`t6-jA2_62-*`, `t6-jA2_70-*` (Juggernaut 0,62 et 0,70), `t6-aA2_68-*` (AlbedoBase 0,68), `t6-jB2_65-*`
(Juggernaut, idée B, 0,65), `t6-fA2_84-*`, `t6-fA2_88-*` (Flux 0,84 et 0,88). Les journaux `log-*.txt` finissent
par `FIN` quand la tâche est rentrée. À regarder une par une avec la même grille, puis à ajouter à la planche.

## Recommandation

Candidate 1 (`t6-fA88-1`) : c'est la seule qui a à la fois la gravure et le sujet du tome (la forge visible par la
porte ouverte, l'enclume, les outils). Il lui manque le ciel calme sans lune et un ciel charbon plutôt que noir :
c'est ce que vise `t6-fA2_88` du deuxième tour, avec la même recette sans lune. Si le deuxième tour ne donne rien,
la candidate 1 reste la meilleure base, et la candidate 3 garde la meilleure composition pour une reprise.
