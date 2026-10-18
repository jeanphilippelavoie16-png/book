**JP choisit la candidate 3** (18 octobre 2026). Agrandie ×4 ; le croissant de lune, qui tombait derrière « IE » du titre, est déplacé dans le coin du ciel libre, à droite au-dessus des collines ; un aplat papier passe sous le bloc du bas (`TP_BAS_FOND`). Résultat : `images/tomes/titre-tome-6.jpg`.

Puis, même jour (JP : « je veux pas que ça fasse AI ; il y a des détails dans la cabane ») : l'intérieur de l'atelier est redessiné par `retouche_atelier.py` (enclume sur sa bille, forge de pierre avec hotte rivetée et braises, marteau, pinces, tisonnier et lime accrochés, étincelles) ; le chiffon blanc du haut de la porte disparaît.

# Tome 6, L'atelier : essais d'image de titre (18 octobre 2026)

L'image a été générée par AI Horde avec `../horde-img2img.py` (gratuit, sans clé), en 768 × 960. Aucune image n'a été agrandie.

Les images de départ sont dessinées par `scene_atelier.py` et rendues avec Chromium headless. Les épinettes viennent de `images/tomes/scene_titre.py`, importé sans être modifié. Il y a deux idées de scène :

- **A, l'atelier** : l'atelier en planches de face, la porte double ouverte sur la forge à hotte, l'enclume sur sa bille, les outils accrochés, la lueur sur la neige. Autour : le chalet allumé à gauche, une corde de bois, une hache plantée, des raquettes.
- **B, l'appentis** : une forge dehors sous un appentis, avec un forgeron en silhouette lointaine qui frappe.

Les images de départ sont `ref-atelier-A`, `-B`, puis `-A2` et `-B2` pour le deuxième tour (`.svg` et `.png`).

La planche de choix est `tome-6-pistes.png`, avec les candidates 1 à 6 (`candidate-1.png` à `candidate-6.png`).

## La planche

1. **`t6-fA2_84-0-net`** (Flux en img2img, A2, 0,84) : vraie linogravure. Le ciel charbon foncé est vide, sans lune, avec quelques points minuscules ; les collines claires commencent à 43 % de la hauteur. Un grand atelier en rondins a la porte ouverte sur la flamme, l'enclume sur sa bille et les pinces accrochées. On voit aussi le chalet allumé, une corde de bois et une bille. Défauts mineurs : la lueur sur la neige est jaune plutôt qu'orange, le ciel est un peu froid (#282E30 en moyenne) et le faîte du toit monte à 39 % de la hauteur.
2. **`t6-fA2_88-0-net`** (Flux en img2img, A2, 0,88) : vraie linogravure, ciel vide sans lune sur les 40 % du haut. Les collines basses sont taillées en lignes fines. Les portes sont grandes ouvertes sur l'enclume, la forge et une rangée d'outils, avec le chalet allumé. Défaut : le ciel est un gris moyen (#565348), plus pâle que la couleur du tome, et un titre blanc cassé y aura moins de contraste. Il y a aussi un petit emblème sur le pignon.
3. **`t6-fA88-1`** (Flux en img2img, A, 0,88) : très belle gravure. Les portes sont ouvertes sur l'enclume, les pinces et le foyer ; on voit aussi une corde de bois sur un chevalet et une hache plantée. Défauts : un petit croissant en haut à droite, dans la zone du titre, un ciel noir plutôt que charbon, et l'atelier qui monte à 36 % de la hauteur.
4. **`t6-jA2_62-0`** (Juggernaut XL en img2img, A2, 0,62) : ciel charbon calme et vide, étincelles orange qui sortent du tuyau et porte allumée. Défauts : la forge et l'enclume ne se lisent pas dans la porte, et une boule orange est posée bas à gauche, sous la zone du titre. Le rendu est plus sérigraphie que gravure.
5. **`t6-fA80-0`** (Flux en img2img, A, 0,80) : la composition est exacte (ciel vide, forge à hotte, enclume, outils, lueur sur la neige). Défaut : un aplat vectoriel lisse, sans gouge (le risque « ça manque d'âme »). Un petit croissant est bas à droite, sous la zone du titre.
6. **`t6-aA72-0`** (AlbedoBase XL en img2img, A, 0,72) : porte ouverte sur le feu, ciel presque vide. Défauts : un croissant orange à droite, au bas de la zone du titre, et un rendu gouache plus que gravure. Le banc ressemble à une table à pique-nique, et on ne voit pas d'enclume.

**Retouche, et seulement celle-là** : les candidates 1 et 2 portaient une fausse signature de Flux, posée sur la neige unie en bas de l'image. `retirer_signature.py` l'a recouverte avec une pièce de neige vide prise à la même hauteur, juste à côté ; le script vérifie que la pièce ne contient aucun trait. Rien d'autre n'a changé. Les originaux signés sont `t6-fA2_84-0.png` et `t6-fA2_88-0.png`.

## Recommandation

**Candidate 1.** C'est la plus proche de l'image du tome 1 : linogravure, ciel foncé et vide pour le titre, collines basses, et le sujet du tome se lit au premier coup d'œil (la forge, l'enclume, les outils, par la porte ouverte de l'atelier, à côté du chalet).

À l'agrandissement, il faudrait ramener le ciel vers le charbon du tome (#363432) et la lueur jaune vers l'orange #EE7219. Ce sont deux corrections de couleur, pas de dessin.

La **candidate 2** est la deuxième si JP préfère des collines gravées et plus d'air autour de l'atelier. Mais son ciel pâle demanderait d'être foncé pour porter le titre.

## Tout ce qui a été fait

| Fichiers | Modèle, source, force | Texte | Verdict |
| --- | --- | --- | --- |
| `t6-jtxt-0/1` | Juggernaut XL, texte seul | `prompt-forge-sdxl.txt` | écartées : ciel orange, chalet qui monte dans le ciel, bordure, signature |
| `t6-flux-0` | Flux, texte seul | `prompt-forge-flux.txt` | écartée : signature aux deux coins, épinettes jusqu'au quart du haut |
| `t6-flux-1` | idem | idem | écartée : signature, flaque orange sans raison, deux enclumes |
| `t6-fluxB-0/1` | Flux, texte seul, idée B | `prompt-appentis-flux.txt` | écartées : signature, épinettes dans la zone du titre, feu sur une souche au lieu d'une forge |
| `t6-jA70-0/1` | Juggernaut XL, A, 0,70 | `prompt-atelier-img2img.txt` | écartées : porte fermée (plus de forge), croissant orange dans la zone du titre, ciel semé de points, brouette |
| `t6-jA78-0/1` | Juggernaut XL, A, 0,78 | idem | écartées : gros croissant sur le titre, porte fermée (la n° 1 est pourtant la plus belle gravure de Juggernaut) |
| `t6-aA72-0` | AlbedoBase XL, A, 0,72 | idem | **candidate 6** |
| `t6-aA72-1` | idem | idem | écartée : croissant collé au bandeau du haut |
| `t6-jB75-0/1` | Juggernaut XL, B, 0,75 | `prompt-appentis-img2img.txt` | écartées : la fumée devient un éclair orange dans le ciel, un ours, la silhouette disparaît |
| `t6-fA80-0` | Flux, A, 0,80 | `prompt-atelier-flux-img2img.txt` | **candidate 5** |
| `t6-fA80-1` | idem | idem | écartée : une petite bête au bas de l'image |
| `t6-fA88-0` | Flux, A, 0,88 | `prompt-atelier-flux-img2img-2.txt` | écartée : marge crème, signature, croissant dans le titre, ciel réduit au tiers |
| `t6-fA88-1` | idem | idem | **candidate 3** |
| `t6-jA2_62-0` | Juggernaut XL, A2, 0,62 | `prompt-atelier-img2img-2.txt` | **candidate 4** |
| `t6-jA2_62-1` | idem | idem | écartée : porte fermée, aucune forge |
| `t6-jA2_70-0` | Juggernaut XL, A2, 0,70 | idem | écartée : pince géante plantée dans la neige, porte sans forge |
| `t6-jA2_70-1` | idem | idem | écartée : ciel semé de points orange et d'une boule orange |
| `t6-aA2_68-0` | AlbedoBase XL, A2, 0,68 | idem | écartée : soleil orange au milieu du titre, cadre sombre autour du ciel |
| `t6-aA2_68-1` | idem | idem | écartée : lune grise dans la zone du titre, la forge devient un feu sur un tas de bûches |
| `t6-jB2_65-0` | Juggernaut XL, B2, 0,65 | `prompt-appentis-img2img-2.txt` | écartée : trois forgerons au lieu d'une silhouette, constellation dans la zone du titre |
| `t6-jB2_65-1` | idem | idem | écartée : points orange dans tout le ciel, forge qui ne se lit pas |
| `t6-fA2_84-0` | Flux, A2, 0,84 | `prompt-atelier-flux-img2img-3.txt` | **candidate 1** (après retrait de la signature) |
| `t6-fA2_84-1` | idem | idem | écartée : un mot imprimé en bas, hangar à toit plat, ciel pâle |
| `t6-fA2_88-0` | Flux, A2, 0,88 | idem | **candidate 2** (après retrait de la signature) |
| `t6-fA2_88-1` | idem | idem | écartée : ciel trop pâle pour le titre, filet de bordure en bas, épinettes jusqu'au tiers du haut |

## Ce que les essais apprennent (pour les autres tomes)

- **La recette qui marche** : une image de départ dessinée, puis Flux en img2img à 0,84 ou 0,88, avec un texte qui insiste sur la gouge (« rough hand-carved relief print: every shape cut with a gouge, visible gouge strokes… ») et qui dit « no moon ». Avec une image de départ sans marge, Flux n'ajoute pas de marge. Il signe parfois encore, mais petit et sur la neige unie.
- **Flux à partir du texte seul** signe toujours et ajoute une marge crème.
- **La lune**, même demandée « basse à droite », remonte dans la zone du titre. Il faut l'enlever de l'image de départ et du texte.
- **Un long filet de fumée** dans l'image de départ devient un éclair orange ou une comète. Il faut une fumée courte.
- **Juggernaut XL** donne une belle gravure mais ferme la porte et perd la forge, à toutes les forces de 0,62 à 0,78. Il fait mieux pour un paysage que pour un objet précis dans une ouverture.
- **L'idée B** (forgeron dehors) ne donne rien : la silhouette disparaît ou se multiplie.
