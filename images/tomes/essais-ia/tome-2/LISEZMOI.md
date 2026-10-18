# Tome 2, Le corps : l'image de la page de titre et de la couverture (essais du 18 octobre 2026)

Même style que l'image retenue pour le tome 1 (`images/tomes/titre-tome-1.jpg`, le n° 4 de
`titre-nuit-pistes-2.png`) : linogravure, trois encres, grand ciel calme en haut pour le titre, collines basses, la
scène dans la moitié du bas. Encre du tome 2 : rouge sang de bœuf #5C1A15 ; papier blanc cassé ; orange #EE7219
pour la lumière et le feu. 768 × 960, rien n'est agrandi (l'image choisie s'agrandit ensuite, comme celle du tome 1).

**Planche de choix : `tome-2-pistes.png`** (7 candidates, numéro au-dessus), chacune en PNG :
`tome-2-piste-1.png` à `tome-2-piste-7.png`.

## La scène

Le soir d'hiver au bord d'un lac gelé de la forêt boréale : le sauna en rondins, la porte entrouverte sur la lueur
orange, la vapeur qui monte du toit ; le chalet aux fenêtres allumées sur l'autre rive ; épinettes enneigées de
chaque côté. Le sauna est au tome 2 (ch. 37, Le sauna et le bien-être) ; il dit « se réchauffer, se laver, se
soigner » sans montrer de corps. Aucun texte, aucun visage, aucun animal.

Deuxième idée essayée : le coin du poêle à bois dans le chalet (la bouilloire qui fume, le bassin d'eau chaude, le
linge plié, un rameau de sapin baumier). Elle n'a rien donné de bon (voir plus bas) : le paysage reste plus fort, et
il fait la série avec le tome 1.

## Deux façons de faire

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

## Les candidates

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

## Ce qui a été écarté, et pourquoi

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

## Recommandation

**1** si l'image doit faire la paire avec le tome 1 : même lumière, même lune basse, même gravure des épinettes,
et le haut le plus vide des sept (aucune étoile dans les deux cinquièmes du haut, rien à retirer derrière le
titre). **5** si le sauna doit se lire comme un sauna : c'est la seule où la porte ouverte, la vapeur et le chalet
au loin sont tous là, et c'est la plus « linogravure » des sept (de vraies encres plates).

Pour l'impression : une candidate de la famille A s'agrandit comme celle du tome 1. Pour une candidate de la famille
B, le mieux est d'agrandir le `.webp` de Flux, puis de refaire `trois-encres.py` sur l'image agrandie (rectangles
multipliés par le même facteur) : les aplats restent nets.
