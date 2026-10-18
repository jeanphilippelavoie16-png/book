# Tome 2, Le corps : l'image de la page de titre et de la couverture

**JP choisit la n° 11 du troisième tour** (18 octobre 2026 : « la 11 ») : le mur couleur papier, la table du soin
(bocaux, mortier, bassin qui fume, bandes roulées) et le poêle entier, porte ouverte, avec la bouilloire. Agrandie ×4
par AI Horde (`../horde-agrandir.py`, `tome-2-11-x4.png`), puis retouchée par `retouche_soin.py` : le halo orange flou
sur le mur autour du poêle s'efface ; les points qui flottaient au bout des vapeurs partent ; les griffonnages qui
imitaient une écriture sur le mortier et le pilon, les mouchetures et la fausse étiquette de la bouilloire deviennent
l'aplat de l'objet. Résultat : `images/tomes/titre-tome-2.jpg`. Le fond étant clair, le titre s'imprime à l'encre
brique (`TP_ENCRE` de l'assembleur) et un aplat papier passe sous le bloc du bas (`TP_BAS_FOND`).

Puis (JP : « le tome 2, ajoute des éléments, c'est vide ») `ajouts_soin.py` dessine, dans le style de l'image et
seulement là où le titre et le bloc des tomes ne les cachent pas : le tuyau du poêle avec ses joints et sa clé ; une
tablette sous la table avec du linge plié, un panier de plantes séchées et une cruche de grès ; une chaudière de bois
sur le plancher, à gauche ; des bûches empilées devant le poêle. Chaîne : `retouche_soin.py tome-2-11-x4.png` puis
`ajouts_soin.py`.

Linogravure, trois encres : rouge sang de bœuf #5C1A15, papier blanc cassé, orange #EE7219 pour la lumière et le feu.
768 × 960, rien n'est agrandi. Aucun texte, aucun visage, aucune main, aucun animal.

## Troisième tour (18 octobre 2026) : planche `tome-2-pistes-3.png`

JP retient la direction du n° 4 du deuxième tour (le coin du soin, Flux 0,74) : « Tome 2 la 4, mais donne-moi plus
de choix, rien à mon goût ». Ce tour varie le cadrage, les objets, la lumière, la matière et la couleur du mur, et
écarte tout ce qui « fait AI ».

Les 11 candidates : `tome-2-tour-3-piste-1.png` à `-11.png`, numéros au-dessus de chacune sur la planche.

### Comment

**Huit images de départ** (`scene_soin3.py` → `soin3-A.png` à `soin3-H.png`). La gravure y est dessinée, comme dans
la linogravure du tome 1 : des entailles claires taillées dans les masses foncées (le poêle, la table, le plancher,
le bas du mur), des hachures dans les masses claires (la nappe, le bassin), la vapeur en lignes taillées. Le haut du
mur reste uni : aucune entaille au-dessus de 46 % de la hauteur, aucune vapeur au-dessus de 44 %.

| Image | Mur | Cadrage | Lumière | Objets |
| --- | --- | --- | --- | --- |
| A | sang de bœuf #5C1A15 (celui du n° 4) | large, table et poêle | la lampe et le feu | lampe, 2 bocaux, mortier et pilon, bassin, bandes roulées, sapin, thé du Labrador, bouilloire |
| B | sang de bœuf | près de la table | la lampe seule, poêle froid | lampe, 2 bocaux, grand bassin, linge plié, sapin, thé du Labrador |
| C | plus foncé #3E100C | près de la table | le feu seul | 2 bocaux, mortier, bassin, bandes roulées, sapin, bouilloire |
| D | brique #7B2D21 | large, le poêle entier au centre | le feu seul | tabouret et bassin, bouilloire, linge, bandes, bois cordé |
| E | papier #F1E6D4 | près de la table | la lampe seule | lampe, 2 bocaux, mortier, bassin, linge |
| F | papier | large | le feu seul | 2 bocaux, mortier, bassin, bandes, poêle entier, bouilloire |
| G | plus foncé | large | la lampe et le feu | lampe, bocal, bassin, linge, bande, sapin, thé du Labrador |
| H | brique | près, la lampe au centre | la lampe seule | 3 bocaux, bassin, lampe, mortier, bandes, sapin, thé du Labrador |

Un texte par image (`soin3-X-prompt-flux.txt`, `soin3-X-prompt-lino.txt`) : le style, la couleur du mur, puis la
liste exacte des objets, et « nothing else » (sans liste fermée, le générateur ajoute ce qui manque à son idée d'une
table de soin). Deux réglages :

- **Flux.1-Schnell, image de départ, force 0,66** (et 0,60 en plus sur B, C, G) : il garde chaque objet à sa place et
  les traces de gouge du mur, de la nappe et du plancher ; c'est déjà plus gravé que le n° 4, mais encore lisse.
- **Juggernaut XL, image de départ, force 0,44 à 0,46** : le plus gravé (traits taillés, bords irréguliers, grain).
  À 0,54, il invente déjà (montagnes sur le mur, lampe changée en théière, casserole à manche, cuisinière à boutons).

Une seule retouche : sur la 5, les bouts des deux bandes roulées portaient une spirale qui se lisait comme un « h » ;
`bout-de-bande.py` les redessine en ovales de papier, deux tours d'enroulement et un trou au centre
(`bout-de-bande.py s3-C-flux-i66-0.webp … 447.3,716,5.6,12 477.3,716,6,12`). Aucune signature sur les 11.

### Les candidates

Le haut libre est la part du haut de l'image où il n'y a que le mur ; sur les 11, aucun point dans les deux
cinquièmes du haut.

| N° | Source | Comment | Mur | Cadrage, lumière | Haut libre | Ce qu'on voit | À savoir |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `s3-A-flux-i66-0.webp` | Flux 0,66 | sang de bœuf | large, lampe et feu | 55 % | La lampe, deux bocaux (sapin, fleurs), le mortier et le pilon, le bassin qui fume, deux bandes roulées, sapin et thé du Labrador sur la nappe, la bouilloire qui fume sur le poêle, la porte ouverte | La plus proche du n° 4, avec tout le soin sur la table |
| 2 | `s3-B-flux-i66-0.webp` | Flux 0,66 | sang de bœuf | près, lampe seule | 55 % | Grande lampe, bocaux de sapin et de fleurs séchées, grand bassin, linge plié, poêle froid au bord | La plus calme ; le poêle éteint se lit comme un meuble sombre |
| 3 | `s3-G-jugg-i46-1.webp` | Juggernaut 0,46 | plus foncé | large, lampe et feu | 55 % | Lampe, bocal, bassin, pile de linge, branches sur la nappe, poêle et bouilloire | Gravée ; le halo de la lampe est taillé en un aplat rond derrière les objets |
| 4 | `s3b-C-jugg-i44-0.webp` | Juggernaut 0,44 | plus foncé | près, feu seul | 59 % | Bocaux, mortier, bassin dont la vapeur prend la lumière du feu, bande roulée, poêle et bouilloire | Gravée ; toute la lumière vient du feu |
| 5 | `s3-C-flux-i66-0.webp`, bouts de bandes redessinés | Flux 0,66 | plus foncé | près, feu seul | 59 % | Même scène que la 4, plus lisse ; la vapeur du bassin est orange (la lumière du feu) | Retouchée (les bandes) |
| 6 | `s3-H-jugg-i46-1.webp` | Juggernaut 0,46 | brique | près, la lampe au centre | 52 % | Trois bocaux de plantes, le bassin, la lampe au milieu de son halo, le mortier, une bande roulée, sapin et thé du Labrador | Gravée ; la lampe au centre, la plus « nature morte » |
| 7 | `s3-D-jugg-i46-1.webp` | Juggernaut 0,46 | brique | large, le poêle entier, feu seul | 52 % | Le bassin d'eau chaude sur un tabouret, le poêle entier porte ouverte, la bouilloire qui fume, le bois cordé | Gravée ; pas de table ni de plantes : le soin par l'eau chaude |
| 8 | `s3-D-jugg-i46-0.webp` | Juggernaut 0,46 | brique | large, feu seul | 50 % | Même scène que la 7, avec le halo du feu taillé en arc sur le mur | Gravée |
| 9 | `s3-E-jugg-i46-1.webp` | Juggernaut 0,46 | papier | près, lampe seule | 61 % | La lampe et son halo orange, deux bocaux, le mortier, le bassin, le linge, la table gravée de fil de bois | Gravée ; le mur clair change tout, et se distingue de tous les autres tomes |
| 10 | `s3-E-flux-i66-1.webp` | Flux 0,66 | papier | près, lampe seule | 53 % | Même scène que la 9, plus lisse ; un brin de sapin couché devant les bocaux | |
| 11 | `s3-F-flux-i66-0.webp` | Flux 0,66 | papier | large, feu seul | 55 % | Bocaux, mortier, bassin, bandes roulées sur une table de bois, le poêle entier porte ouverte, la bouilloire | Le dessin le plus net |

Six candidates sur onze sont de Juggernaut (3, 4, 6, 7, 8, 9), nettement plus gravées que le n° 4 ; les cinq de Flux
le sont un peu plus que lui (traces de gouge sur le mur, nappe hachurée, plancher gratté).

### Écartées au troisième tour

Toutes gardées en `.webp` sous leur nom de tâche (`s3-…`, `s3b-…`). Ce qui revient le plus : le brin de thé du
Labrador (feuilles et petites fleurs blanches) devient une souris, un rat, un chien qui court, un oursin, une
brosse ou un couteau ; les bandes roulées deviennent des tasses, des guimauves, des œufs, des gousses d'ail ou des
spirales en forme de lettre.

- Du texte : `s3-A-flux-i66-1` (« balsam » sur un bocal), `s3-E-flux-i66-0` (« Ball 1924 » sur la table),
  `s3b-A-jugg-i44-0` et `-1` (le brin de sapin se lit comme une écriture cursive), `s3-C-flux-i66-1` (un « g » au
  bout d'une bande), `s3-H-flux-i66-0` et `-1` (spirales en « @ » au bout des bandes).
- Un animal ou une forme vivante sur la nappe : `s3-A-jugg-i46-0` et `-1`, `s3-B-flux-i60-0`, `s3-B-flux-i60-1`,
  `s3b-B-jugg-i44-1`, `s3-H-jugg-i46-0` (une limace), `s3-B-jugg-i46-0` et `-1` (une boule à piquants).
- Ce qui pend de la nappe : `s3-C-jugg-i46-0` (le sapin tombe en frange par-dessus le bord).
- Des objets qui n'ont pas de sens ou fondus : `s3-A-jugg-i54-0` (un pichet-bocal, une perche sur la bouilloire),
  `s3-A-jugg-i54-1` et `s3-C-jugg-i54-0` (casserole à manche, louche), `s3-B-jugg-i54-0` (un bassin à anse de tasse),
  `s3-D-jugg-i54-0` (un tuyau qui part de la bouilloire vers une boîte au mur), `s3-D-jugg-i54-1` (une tablette avec
  des boîtes orange), `s3-E-jugg-i54-0` (une chandelle dans le bassin), `s3-G-jugg-i54-0` et `-1` (la lampe changée
  en théière), `s3-H-jugg-i54-1` (une plante dans un arrosoir), `s3-F-jugg-i54-0` et `-1` (un poêle à boutons de
  cuisinière, un brin dans une tasse), `s3-G-flux-i66-0` (une courroie autour du bassin), `s3-G-flux-i66-1` (un « # »
  sur le bassin), `s3-G-flux-i60-0` (un couteau sur la nappe), `s3-G-flux-i60-1` (une brosse), `s3-G-jugg-i46-0` (la
  lampe sans flamme), `s3b-B-jugg-i44-0` (une chandelle dans la lampe), `s3-C-flux-i60-1` (des cubes de sucre, une
  petite marmite sur le poêle), `s3-C-jugg-i46-1` et `s3b-C-jugg-i44-1` (des dents ou des œufs à la place des bandes),
  `s3-E-jugg-i54-1` (bocaux à motifs de poterie, sans plantes).
- Une forme dans le haut ou derrière : `s3-B-jugg-i54-1` et `s3-C-jugg-i54-1` (des montagnes sur le mur).
- Hors des trois encres : `s3-C-flux-i60-0` (herbes vertes, flamme en triangles).
- Trop proches d'une retenue, sans rien de plus : `s3-B-flux-i66-1`, `s3-D-flux-i66-0` et `-1` (et le bois cordé
  montre des bouts en « C »), `s3-E-jugg-i46-0`, `s3-F-flux-i66-1`.

### Recommandation du troisième tour

**6** si JP veut la gravure du tome 1 : la lampe au centre de son halo, trois bocaux, le bassin, le mortier, une
vraie nature morte ; le mur brique est plus chaud que le sang de bœuf. **9** pour le mur de papier : le tome 2
serait le seul tome au fond clair, et la page de titre se lit très bien. **1** si JP veut garder le n° 4 presque
tel quel, avec plus d'objets de soin et un peu plus de gravure. Pour l'agrandissement, l'orchestrateur reprend le
`.webp` (ou, pour la 5, refait `bout-de-bande.py` avec les valeurs multipliées par le même facteur).

---

## Deuxième tour (18 octobre 2026) : planche `tome-2-pistes-2.png`

JP sur le premier tour : « ça ressemble trop au setup du tome 1 » (chalet dans la neige, la nuit, épinettes de chaque
côté, lune). Le deuxième tour ne doit ressembler à aucun autre tome : le 1, chalet dans la neige la nuit ; le 3, lac à
l'aube avec canot ; le 5, chalet l'été au coucher du soleil ; le 6, atelier et forge la nuit. Deux directions.

Les 9 candidates : `tome-2-tour-2-piste-1.png` à `-9.png`, numéros au-dessus de chacune sur la planche.

### (a) Le coin du soin, nature morte d'intérieur (candidates 1 à 4)

Le haut est le mur foncé uni, la place du titre. En bas, sur une table couverte d'une nappe de lin, près du poêle à
bois : la lampe à l'huile (la seule lumière orange avec le feu du poêle), trois bocaux de plantes séchées, le bassin
d'eau chaude qui fume, le linge plié, des branches de sapin baumier et de thé du Labrador, la bouilloire sur le poêle.

Image de départ : `scene_soin.py` → `soin-reference.svg`, rendue en `soin-reference.png`. Elle impose le haut vide
(aucune poutre, fenêtre ni tablette au mur ; rien au-dessus de 56 % de la hauteur, sauf la lueur et la vapeur) : c'est
ce qui manquait au premier essai du poêle (une poutre et un haut chargé). Les tiges dessinées dans les bocaux
remplacent des lignes ondulées que le générateur aurait prises pour des étiquettes.

Le bon réglage : **Flux.1-Schnell en image de départ, force 0,72 à 0,74**, texte `soin-prompt-flux.txt`. Il garde
chaque objet à sa place, le mur vide, et ne signe pas (il n'y a pas de neige ni de papier en bas où poser une
signature). Son rendu est plus à plat que celui du tome 1 (lueur douce, peu de traces de gouge). Une passe de
Juggernaut XL à faible force (0,45) par-dessus le résultat de Flux taille les bocaux en silhouettes plus nettes
(candidate 3) ; à 0,55, elle invente des objets. Le passage aux trois encres (`trois-encres.py`) ne sert pas ici :
il efface la flamme du poêle et change la vapeur en taches noires.

| N° | Source | Comment | Haut libre | Forces | Faiblesses |
| --- | --- | --- | --- | --- | --- |
| 1 | `r3-soin-flux-i74-1.webp` | Flux 0,74 | 57 % | La plus nette : la lampe, les trois bocaux de plantes, le bassin qui fume, le linge, la bouilloire qui fume sur le poêle, de vraies flammes | Rendu un peu à plat ; le thé du Labrador se lit mal |
| 2 | `r2-soin-flux-i72-0.webp` | Flux 0,72 | 52 % | Les branches de sapin et de thé du Labrador avec ses fleurs se lisent ; la vapeur de la bouilloire | Les pattes de la table tournées ; un petit pot noir sur le poêle |
| 3 | `r5-grav-r2-soin-flux-i72-0-i45-0.webp` | Flux 0,72, puis Juggernaut XL 0,45 sur le résultat | 57 % | Les plus beaux bocaux : feuilles taillées en silhouette, comme gravées | Le feu du poêle n'est plus que deux petites flammes ; un brin sec sort de derrière la bouilloire |
| 4 | `r3-soin-flux-i74-0.webp` | Flux 0,74 | 59 % | Le haut le plus vide ; flammes franches dans le poêle | Une casserole à la place de la bouilloire, sans vapeur ; une feuille noire qui pend de la nappe |

### (b) L'été, le sauna au bord du lac (candidates 5 à 9)

Fin de journée d'été, pas de neige ni de nuit : le sauna en rondins sur la rive, à gauche ; un quai de bois qui part
dans l'eau calme ; trois bouleaux à droite ; deux épinettes derrière le sauna ; les herbes hautes de la rive ; les
collines basses de l'autre rive, la crête prise dans la lumière orange.

Image de départ : `scene_ete.py`. Le ciel de **papier** (`ete-reference-clair.png`) marche ; le ciel d'encre
(`ete-reference-fonce.png`) donne un soleil orange en plein dans la place du titre, ou fait disparaître le sauna, foncé
sur l'eau foncée. Le ciel de papier sépare aussi le tome 2 des tomes 1 et 6, qui ont un ciel de nuit.
`ete-reference-clair-2.png` retire la bande orange sur l'eau : le générateur en faisait un soleil couchant posé sur
l'eau, et le coucher de soleil d'été est la scène du tome 5. Textes : `ete-prompt-lino2.txt` (Juggernaut),
`ete-prompt-flux2.txt` (Flux, avec « no sun »).

| N° | Source | Comment | Haut libre | Forces | Faiblesses |
| --- | --- | --- | --- | --- | --- |
| 5 | `r3-ete-clair-jugg-i62-1.webp` | Juggernaut XL 0,62, `ete-reference-clair`, `lino2` | 46 % aux bouleaux, 57 % ailleurs | La plus propre et la plus « linogravure » : la porte orange, le quai, l'herbe gravée, une touche d'orange sur la crête | Pas de vapeur (une vapeur blanche ne se voit pas sur un ciel de papier) ; les bouleaux portent des touffes d'aiguilles plates, un mélange de pin et de bouleau |
| 6 | `r3-ete-clair-jugg-i62-0.webp` | Juggernaut XL 0,62, `lino2` | 46 % / 57 % | Le sauna en gros rondins ronds, très gravé ; le quai | Pas de porte visible ni de vapeur ; aucune lumière orange |
| 7 | `r4-ete-flux-i72-0.webp`, signature effacée (`effacer.py … 6,932,66,957`) | Flux 0,72, `ete-reference-clair-2`, `flux2` | 46 % / 57 % | La vapeur qui monte du sauna, la porte et la fenêtre orange, la lumière de la porte sur l'herbe | Bouleaux sans feuilles ; une vapeur grise, pas gravée |
| 8 | `r4-ete-flux-i72-1.webp`, signature effacée (`effacer.py … 10,884,90,950`) | Flux 0,72, `ete-reference-clair-2`, `flux2` | 46 % / 57 % | La vapeur, la porte orange, la crête orange | Bouleaux sans feuilles ; une tache claire devant la porte |
| 9 | `r2-ete-clair-jugg-i66-1.webp` | Juggernaut XL 0,66, `ete-reference-clair`, `lino` | 36 % aux bouleaux, 57 % ailleurs | Les collines orange, l'eau gravée d'orange, la porte orange | Bouleaux nus qui montent haut à droite : ça fait automne ; pas de vapeur |

### Écartées au deuxième tour

Toutes gardées en `.webp` sous leur nom de tâche.
- Le coin du soin : `r2-soin-jugg-i64-0` (la lampe devient une bouteille avec une flamme blanche, des feuilles orange
  dans un pot, alors que l'orange est réservé à la lumière), `r2-soin-jugg-i64-1` (une fiole de laboratoire, une pile
  d'assiettes, aucune plante), `r2-soin-jugg-i70-0` (le tuyau du poêle monte jusqu'en haut, des branches nues et un
  disque orange derrière la table), `r2-soin-jugg-i70-1` (des filets de vapeur qui montent dans la place du titre),
  `r2-soin-flux-i72-1` (herbes vertes et eau turquoise, hors des trois encres), `r2-soin-flux-i80-0` (bocaux à pois,
  poêle sans flamme ; trop proche de la 1), `r2-soin-flux-i80-1` (du texte sur les bocaux), `r5-grav-…-i74-1-i45`
  (un disque orange derrière les bocaux, un objet blanc au bec de la bouilloire), `r5-grav-…-i74-1-i55` (un gros nuage
  brun sur le bassin), `r5-grav-…-i72-0-i55` (une branche nue entre par le coin haut à droite). Juggernaut seul invente
  des objets à toutes les forces ; Flux en image de départ tient la nature morte.
- L'été : `r2-ete-flux-0` à `-3` (Flux, texte seul : quatre couchers de soleil en dégradé orange, deux avec le disque du
  soleil, un canot, le sauna sur pilotis dans l'eau, signatures ; c'est le tome 5), `r2-ete-fonce-jugg-i66-0` (un
  soleil orange dans la place du titre, deux maisons), `r2-ete-fonce-jugg-i66-1` (le sauna a disparu),
  `r2-ete-clair-jugg-i66-0` (un chalet aux grandes fenêtres orange, pas un sauna), `r3-ete-clair-jugg-i68-0` (un soleil
  orange), `r3-ete-clair-jugg-i68-1` (bonne, mais une bâtisse en planches verticales plutôt qu'en rondins, sans vapeur
  ni porte ; trop proche de la 5), `r3-ete-clair-flux-i72-0` et `-1` (un soleil orange sur l'eau, venu de la bande de
  reflet de l'image de départ), `r4-ete-jugg-i64-0` (un soleil orange malgré le texte), `r4-ete-jugg-i64-1` (une maison
  au toit orange et une rampe étrange).

### Recommandation du deuxième tour

**1** pour le coin du soin : c'est l'image qui dit le mieux « Le corps » (soigner, se laver, se réchauffer, les
plantes), et rien dans les autres tomes ne lui ressemble. Si JP la trouve trop à plat, la **3** a des bocaux plus
gravés. **5** pour l'été : la plus « linogravure » des neuf et la plus propre ; si la vapeur doit se voir, la **7**.

À l'agrandissement, l'orchestrateur reprend le `.webp` de la candidate choisie. Pour la 7 et la 8, il refait
`effacer.py` sur l'image agrandie, avec les rectangles multipliés par le même facteur.

---

## Premier tour (18 octobre 2026) : planche `tome-2-pistes.png`, refusée

JP : « ça ressemble trop au setup du tome 1 ». Ce qui suit reste comme historique.

Même style que l'image retenue pour le tome 1 (`images/tomes/titre-tome-1.jpg`, le n° 4 de
`titre-nuit-pistes-2.png`) : linogravure, trois encres, grand ciel calme en haut pour le titre, collines basses, la
scène dans la moitié du bas. Encre du tome 2 : rouge sang de bœuf #5C1A15 ; papier blanc cassé ; orange #EE7219
pour la lumière et le feu. 768 × 960, rien n'est agrandi (l'image choisie s'agrandit ensuite, comme celle du tome 1).

**Planche de choix : `tome-2-pistes.png`** (7 candidates, numéro au-dessus), chacune en PNG :
`tome-2-piste-1.png` à `tome-2-piste-7.png`.

### La scène

Le soir d'hiver au bord d'un lac gelé de la forêt boréale : le sauna en rondins, la porte entrouverte sur la lueur
orange, la vapeur qui monte du toit ; le chalet aux fenêtres allumées sur l'autre rive ; épinettes enneigées de
chaque côté. Le sauna est au tome 2 (ch. 37, Le sauna et le bien-être) ; il dit « se réchauffer, se laver, se
soigner » sans montrer de corps. Aucun texte, aucun visage, aucun animal.

Deuxième idée essayée : le coin du poêle à bois dans le chalet (la bouilloire qui fume, le bassin d'eau chaude, le
linge plié, un rameau de sapin baumier). Elle n'a rien donné de bon (voir plus bas) : le paysage reste plus fort, et
il fait la série avec le tome 1.

### Deux façons de faire

**A. Juggernaut XL, image de départ (img2img).** `scene_sauna.py` dessine la composition en SVG (même moteur
d'épinettes et de crêtes que `images/tomes/scene_titre.py`, couleurs du tome 2), rendue en PNG par Chromium :
`sauna-reference-2.png`. La première version (`sauna-reference-1.png`) avait une colonne de vapeur jusqu'au tiers du
haut : le générateur la prolongeait jusqu'en haut de la page, en plein dans la place du titre. La vapeur est
maintenant faite de bouffées courtes qui se défont vers la droite. Textes : `sauna-prompt-lino.txt` (1er tour),
`sauna-prompt-lino2.txt` (2e et 4e tours : sauna sans fenêtre, petite bouffée de vapeur, et une liste de refus
après `###` : pics, colonne de fumée, feu dans le ciel, soleil, texte, signature, bleu), `sauna-prompt-lino3.txt`
(3e tour). Force : 0,62 à 0,70 donne le ciel vide et les trois encres ; 0,78 repeint trop loin.

**B. Flux.1-Schnell, texte seul, puis passage aux trois encres.** `sauna-prompt-flux2.txt` (le ciel « presque noir,
d'un seul aplat » ; le 1er texte, `sauna-prompt-flux.txt`, donnait un ciel rouge-orange vif). Flux fait le meilleur
sauna et la meilleure texture d'estampe, mais il signe toujours ses images en bas, ajoute parfois une marge crème,
et son ciel reste en dégradé. `trois-encres.py` ramène l'image aux trois encres, comme une vraie linogravure en trois
passages : chaque pixel prend le papier, l'orange ou le rouge (le rouge en deux valeurs, l'encre et l'encre passée
deux fois, pour que les collines se détachent du ciel et que les rondins gardent leurs traits) ; un filtre enlève
les grains isolés. Les rectangles donnés en argument repeignent d'abord la fausse signature en papier (elle est
posée sur la neige) ; `g9`/`d8` remplacent une marge crème ; `b…` remet en blanc une vapeur teintée d'orange qui se
lirait comme un feu de cheminée. Les commandes exactes sont dans le tableau.

### Les candidates

Le « ciel libre » est la part du haut de l'image où il n'y a que le ciel (mesuré : la première rangée où plus de
4 % des points sont clairs).

| N° | Source | Comment | Ciel libre | Ce qu'on voit | Faiblesses |
| --- | --- | --- | --- | --- | --- |
| 1 | `t4-jugg-i64-1.webp` | A, Juggernaut XL 0,64, `lino2` | 54 % | Aucune étoile dans les deux cinquièmes du haut ; lune basse à gauche, la forêt de la colline prise dans la lumière orange, la vapeur courte, porte et fenêtres orange | Le bâtiment se lit comme un chalet plutôt qu'un sauna ; vapeur grise, pas gravée ; quelques points blancs devant la forêt |
| 2 | `t2-jugg-i66-0.webp` | A, Juggernaut XL 0,66, `lino2` | 54 % | Le plus proche du tome 1 : la crête orange fine sur les collines, la lune basse, épinettes gravées des deux côtés | Fumée grise en dégradé qui coupe la crête ; chalet plutôt que sauna ; pas de chalet au loin |
| 3 | `t2-jugg-i62-1.webp` | A, Juggernaut XL 0,62, `lino2` | 55 % | Lune et son halo, vapeur douce, la lueur de la porte sur la neige, sentier | Étoiles dans tout le ciel (à retirer derrière le titre, comme au tome 1) ; deux bouts de cheminée collés |
| 4 | `t2-jugg-i70-1.webp` | A, Juggernaut XL 0,70, `lino2` | 58 % | Le ciel le plus calme ; le soleil orange qui se couche sur le lac et son reflet ; porte et fenêtres orange | Pas de vapeur : rien ne dit sauna ; eau libre plutôt que lac gelé |
| 5 | `t2-flux-1.webp` | B, Flux, `flux2`, puis `trois-encres.py t2-flux-1.webp … 18,934,116,954 638,934,754,954` | 49 % | Le vrai sauna : la porte orange, la vapeur blanche en volutes, le chalet sur l'autre rive, le lac blanc, la crête orange ; une vraie estampe en trois encres | Crête orange un peu déchiquetée ; une cheminée (un vrai sauna à fumée n'en a pas) |
| 6 | `t3-flux-0.webp` | B, Flux, `flux2`, puis `trois-encres.py … g9 d8 640,926,768,956` | 46 % | Sauna à deux panaches de vapeur, chalet au loin, roches devant la porte, sentier | Aucun orange : la porte est fermée ; ciel libre un peu court |
| 7 | `t3-flux-1.webp` | B, Flux, `flux2`, puis `trois-encres.py … 650,922,768,952 b500,480,620,620` | 51 % | La porte ouverte sur le feu du poêle, la vapeur | Le lac en plaques sombres se lit mal ; la vapeur blanche se confond avec le lac derrière |

### Ce qui a été écarté, et pourquoi

Toutes les images générées sont gardées en `.webp` (le format rendu par le service), sous leur nom de tâche.

- `t1-jugg-txt-0`, `-1` (Juggernaut, texte seul) : orange partout, ciel en tourbillons, une marque dans le coin du 2.
  Juggernaut sans image de départ ne tient ni le ciel calme ni les trois encres.
- `t1-flux-0` à `-3` (Flux, 1er texte) : ciel rouge-orange vif, fausses signatures ; le 2 a un cerf et des pics
  enneigés ; le 0 et le 3, un sentier rouge vif qui se lit comme une traînée de sang. Le 1 passé aux trois encres
  était correct, mais sa fumée virait à l'orange (un feu de cheminée) : écarté.
- `t1-jugg-i70-0`, `-1` (Juggernaut 0,70, 1re image de départ) : la colonne de vapeur monte jusqu'en haut de la page,
  dans la place du titre ; le 1 met une flaque orange devant la porte.
- `t1-jugg-i78-0`, `-1` (Juggernaut 0,78) : une flamme géante dans le ciel ; un ciel de nuages orange et un soleil.
- `t2-flux-0` (lac d'eau libre rouge, qui se lit comme du sang), `t2-flux-2` (marge crème, signature, lac rose),
  `t2-flux-3` (ciel presque noir, tache orange sur la neige).
- `t2-flux-i85-0`, `-1` (Flux en image de départ, 0,85) : marge crème, signatures, un oiseau. Recadrer la marge
  obligerait à agrandir.
- `t2-jugg-i62-0` (colline rose en pointe, hors des trois encres), `t2-jugg-i66-1` (deux dômes gris sur l'horizon),
  `t2-jugg-i70-0` (bande magenta sur l'horizon).
- `t3-flux-2` (horizon de coucher de soleil orange vif, marge, signatures), `t3-flux-3` (deux bâtiments empilés,
  traînées rouges sur la neige).
- `t3-jugg-i66-0`, `-1`, `t3-jugg-i72-0`, `-1` (texte `lino3`) : un pic ou une grosse colline qui monte dans le ciel
  sur les quatre (et des étoiles dans le pic du 2).
- `t4-flux-0` à `-3` (texte `flux3`) : le mot « SAUNA » écrit sur le bâtiment, signatures, eau rouge ou rose, marge.
- `t4-jugg-i64-0` (deux bouffées grises détachées dans le ciel), `t4-jugg-i66-0` (lune orange au milieu de la place
  du titre), `t4-jugg-i66-1` (pic gris).
- La deuxième idée, le coin du poêle : `t1-poele-flux-0`, `-1` (Flux) ont une belle texture de linogravure, mais un
  mur de rondins chargé, des légendes inventées en bas et une marge ; `t2-poele-flux-0`, `-1` (texte refait, mur
  uni) gardent la marge, les signatures et un « TM », et le 1 met du feu dans le bassin ; `t1-poele-jugg-0` est
  chaleureux (le poêle, la fenêtre sur la neige) mais tout le haut est chargé et orange, `-1` met un feu dans une
  baignoire. Avec une image de départ (`scene_poele.py`, `poele-reference.png`, `poele-prompt-lino2.txt`, 0,68) :
  `t2-poele-jugg-i68-0` a le mur calme, mais une poutre monte dans la place du titre et la bouilloire est par terre ;
  `-1` a un tuyau qui crache des étincelles et une colline dans la pièce.

### Recommandation du premier tour

**1** si l'image doit faire la paire avec le tome 1 : même lumière, même lune basse, même gravure des épinettes,
et le haut le plus vide des sept (aucune étoile dans les deux cinquièmes du haut, rien à retirer derrière le
titre). **5** si le sauna doit se lire comme un sauna : c'est la seule où la porte ouverte, la vapeur et le chalet
au loin sont tous là, et c'est la plus « linogravure » des sept (de vraies encres plates).

Pour l'impression : une candidate de la famille A s'agrandit comme celle du tome 1. Pour une candidate de la famille
B, le mieux est d'agrandir le `.webp` de Flux, puis de refaire `trois-encres.py` sur l'image agrandie (rectangles
multipliés par le même facteur) : les aplats restent nets.
