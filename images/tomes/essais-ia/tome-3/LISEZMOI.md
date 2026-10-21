**Le lièvre** (JP, 18 octobre 2026 : « reprends la même image mais ajoute un lièvre qui regarde le monde en canot de
loin, à partir du bord de la plage » ; 19 octobre, des trois versions, « la 2 horde »). Un lièvre d'Amérique en
pelage d'été, assis de dos au bord d'une grève de galets, au pied des épinettes de gauche, la tête tournée vers le
canot ; il reste hors du bloc des tomes de la page de titre. Le lièvre et la grève sont repeints par AI Horde
(Juggernaut XL) sur des guides dessinés, ramenés aux encres de l'image ; la forme (croupe, cuisse, grand pied), les
entailles du poil, l'oreille, l'ombre et le joint avec l'épinette sont refaits par le script. Tout est dans `lievre/` :

    python3 lievre/lievre_v2.py lievre/titre-tome-3-sans-lievre.jpg ../../titre-tome-3.jpg

**JP choisit la candidate 1** (18 octobre 2026), « mais le reflet du soleil mieux sur le lac ». Agrandie ×4, l'ovale orange du reflet est remplacé par des tirets taillés à la gouge sur les bandes claires de l'eau, qui rétrécissent vers le bas ; le canot est remonté de 290 px pour dégager la ligne des chapitres ; un aplat papier passe sous le bloc du bas (`TP_BAS_FOND` dans `assembler-tome.py`). Résultat : `images/tomes/titre-tome-3.jpg`.

# Tome 3, Prélever : essais d'images pour la page de titre et la couverture

Faits le 18 octobre 2026 par AI Horde (gratuit, sans clé), avec `../horde-img2img.py`, dans le style choisi par JP
pour le tome 1 (`images/tomes/titre-tome-1.jpg`) : linogravure, trois encres (vert forêt du tome 3 #1D392E, papier
blanc cassé, orange #EE7219), 768 × 960, ciel du haut calme et vide (le titre s'y pose en clair), collines basses,
bas de l'image clair (la série des tomes s'y pose en foncé). Aucune image n'est agrandie.

**Planche de choix : `tome-3-pistes.png`**, candidates `candidate-01.png` à `candidate-10.png`.

## Les scènes

- **Le lac à l'aube d'automne** (la scène proposée) : soleil bas derrière des collines boisées, brume, épinettes
  noires et mélèzes dorés, un canot. L'orignal de la rive d'en face ne survit pas à l'img2img de Juggernaut et
  d'AlbedoBase au-dessus de 0,55 environ (il devient un îlot, un voilier, ou disparaît) ; seul Flux le garde.
- **Le fleuve salé** (deuxième idée) : soleil sur l'horizon d'eau, outardes au ras de l'eau, phoque sur une roche,
  piquets de pêche à fascines, chaloupe sur la grève, varech orange.

## Images de départ (composition imposée)

`scene_tome3.py` (réutilise l'épinette de `images/tomes/scene_titre.py`, importée, pas modifiée), rasterisé par
`rasteriser.sh` (Chromium headless) :
- `depart-lac.png` : soleil à droite, orignal dans l'eau peu profonde, canot tiré sur la grève.
- `depart-lac2.png` : soleil à gauche, orignal et canot plus grands.
- `depart-lac3.png` : canot sur l'eau avec deux silhouettes de dos et une canne à pêche, remonté de 80 px pour
  laisser la place de la série des tomes ; l'eau descend jusqu'en bas.
- `depart-fleuve.png` : la scène du fleuve.

## Textes

`prompt-lac-lino.txt`, `prompt-lac2-lino.txt`, `prompt-lac3-lino.txt`, `prompt-fleuve-lino.txt` (Juggernaut XL et
AlbedoBase XL, img2img, texte négatif après `###`) ; `prompt-lac-flux.txt`, `-flux2`, `-flux3`,
`prompt-fleuve-flux.txt`, `-flux2` (Flux.1-Schnell, à partir du texte seul).

## Les dix candidates

| N° | Fichier d'origine | Modèle, force | Ce qu'on voit | Réserve |
| --- | --- | --- | --- | --- |
| 1 | `r2-jug65-1` | Juggernaut XL, 0,65, `depart-lac` | Soleil derrière les collines boisées, reflet gravé, chaloupe avec deux silhouettes lointaines, l'une pêche à la canne ; épinettes au premier plan | Le canot touche la ligne « Chapitres 41 à 60 » au montage |
| 2 | `r1-jug72-0` | Juggernaut XL, 0,72, `depart-lac` | Le plus proche du tome 1 : ciel vide, traits de gouge, soleil sur la rive, lac gravé | Aucun sujet de prélèvement (paysage seul) |
| 3 | `r2-lac2-alb66-1` | AlbedoBase XL, 0,66, `depart-lac2` | Soleil et reflet à gauche, îlot d'épinettes, remous gravés, deux pagayeurs de dos | Le canot touche la ligne « Chapitres » |
| 4 | `r1-alb70-0` | AlbedoBase XL, 0,70, `depart-lac` | Un pagayeur seul sous le soleil, traits de gouge ; le canot passe au-dessus de la série | Ciel un peu gris (#2B3B2F) |
| 5 | `r3-fluxlac-0` recadrée | Flux, texte seul | Orignal au loin dans l'eau, grand canot d'écorce au premier plan | Plus affiche que gravure ; ciel olive (#34462B) ; le canot passe sous la série au montage ; deux fausses signatures coupées par recadrage (744 × 930) |
| 6 | `r1-fluxlac-1` recadrée | Flux, texte seul | Orignal dans l'eau, canot sur la grève, aviron, mélèze doré | Ciel en dégradé lisse, pas en aplat gravé ; grève de galets foncée sous la série ; marge et signature coupées (740 × 925) |
| 7 | `r2-fluxfleuve-0` recadrée | Flux, texte seul | Fleuve : outardes au ras de l'eau, phoque, piquets de fascine, chaloupe, varech orange | La chaloupe et le varech tombent sous la série ; 4 px de papier coupés au bord droit (764 × 955) |
| 8 | `r1-fluxfleuve-0` retouchée | Flux, texte seul | Fleuve : phoque sur sa roche, soleil sur l'horizon, deux piquets, chaloupe, mélèzes | Deux goélands effacés de la zone du titre (ciel voisin recopié) ; marge et signature coupées (736 × 920) ; ciel presque noir (#19281A) |
| 9 | `r1-jug78-0` | Juggernaut XL, 0,78, `depart-lac` | Soleil sur la rive, eau en remous gravés | Une petite barque floue dans le reflet ; pas de sujet net |
| 10 | `r2-lac2-alb66-0` | AlbedoBase XL, 0,66, `depart-lac2` | Canot vide qui flotte, îlot d'épinettes, soleil à gauche | Le canot frôle la série |

Les recadrages enlèvent seulement la marge crème et les fausses signatures de Flux, au rapport 4:5, sans
agrandir. La couleur du ciel de chaque candidate a été mesurée : toutes restent dans la famille du vert du tome ;
l'image retenue peut être ramenée exactement à #1D392E à l'agrandissement.

`apercu_titre.py` pose le titre, un sous-titre provisoire et la série des tomes avec les règles CSS de la page de
titre de `design/outils/assembler-tome.py` (sans le toucher) : c'est ce qui a montré que le canot de 1, 3, 5, 7 et
10 tombe sous la ligne « Chapitres 41 à 60 ». À l'agrandissement, il faut soit remonter la scène, soit refaire
l'image à partir de `depart-lac3.png`, qui laisse la place.

## Écartées, et pourquoi

- `r1-fluxlac-0`, `r2-fluxlac-0`, `r2-fluxlac-1` : l'orignal est assis dans le canot ; un mot écrit sur la coque
  (`r2-fluxlac-0`) ; signatures.
- `r1-fluxfleuve-1` : soleil et oiseaux dans la zone du sous-titre ; signatures.
- `r2-fluxfleuve-1` : ciel vert moyen, pas l'encre du tome ; marge et signatures.
- `r3-fluxlac-1` : ciel vert moyen ; épinettes qui montent dans la zone du titre ; signature.
- `r1-alb70-1` : cassure nette entre l'aplat du ciel et la bande rayée ; traits noirs plutôt que verts.
- `r2-alb62-0` : soleil blanc ; taches blanches sur l'eau sous la série (gardée en réserve, pas sur la planche).
- `r2-alb62-1` : une demi-lune blanche collée sur le soleil (objet en double).
- `r1-jug72-1` : colline orange plate ; bateau à moteur.
- `r1-jug78-1` : deuxième soleil en haut à gauche, dans la zone du titre.
- `r2-jug65-0` : le soleil devient une colline orange ; le reflet n'a plus de source.
- `r2-lac2-jug68-0` : l'orignal devient un voilier ; soleil en anneau à centre blanc.
- `r2-lac2-jug68-1` : pagayeur au geste bizarre, piquet planté à la pince du canot.
- `r1-jugfleuve72-0` et `-1` : l'horizon remonte (les rayures du ciel prises pour de l'eau) ; soleil dans la zone
  du titre ou du sous-titre ; tache orange plate sur l'eau.
- `r2-albfleuve70-0` : soleil dans la zone du sous-titre ; signature. `r2-albfleuve70-1` : calme mais sans soleil
  ni lumière (gardée en réserve, pas sur la planche).

## Pas regardées

Trois tâches étaient encore dans la file au moment de rendre : `r3-lac2-jug55` (Juggernaut, 0,55, pour garder
l'orignal) et `r3-lac3-jug65`, `r3-lac3-jug70` (Juggernaut sur `depart-lac3.png`, le canot des pêcheurs remonté).
Leurs fichiers `.webp` peuvent arriver dans ce dossier plus tard ; ils n'ont pas été vus.

## Recommandation

**1** (`r2-jug65-1`) : la linogravure la plus proche du tome 1 choisi par JP, ciel calme et foncé, collines
basses, et le seul sujet qui dit « prélever » sans visage ni animal difforme (deux pêcheurs au loin, une canne).
Son canot touche la ligne « Chapitres » : refaire la même image à partir de `depart-lac3.png` (déjà lancé, voir
plus haut) ou remonter la scène à l'agrandissement. **Deuxième choix, 3** (`r2-lac2-alb66-1`), plus riche (îlot,
remous, reflet). Si JP tient à l'orignal : **5** ou **6** (Flux), avec leurs réserves de style. Pour le fleuve
salé : **7**.

## Arrivées après la planche (ajoutées par l'orchestrateur)

`tome-3-pistes-2.png`, candidates 11 à 15 : `r3-lac2-jug55-1` (11), `r3-lac3-jug65-0` et `-1` (12, 13), `r3-lac3-jug70-0` et `-1` (14, 15). Les 13 et 15 ont le canot remonté, au-dessus de la ligne des chapitres : la 15 (deux pêcheurs, soleil et reflet) règle la réserve de la n° 1.
