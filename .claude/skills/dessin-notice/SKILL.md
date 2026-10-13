---
name: dessin-notice
description: Dessiner les mains, les têtes et les personnages des planches du Grand Livre du Chalet au style « notice de montage » (IKEA) — trait net et sûr, formes simples, positions justes. Utilise ce skill dès qu'une planche montre une main qui tient, pince, appuie ou fait un geste, une tête, un enfant, un bébé ou un personnage entier, dès qu'on parle de refaire les mains, les têtes ou les corps, de la bibliothèque formes.js ou des feuilles d'essai, et chaque fois que JP trouve une main ou une tête « laide », « weird » ou « mal faite ». Il complète le skill planches (qui décide quoi dessiner) : celui-ci dit comment dessiner le corps humain pour que ce soit beau.
---

# Mains, têtes et corps au style notice

Le corps humain est ce que JP regarde en premier sur une planche, et ce qu'il rejette le plus vite.
Six essais ont raté avant celui-ci ; ce skill garde ce qui a marché et pourquoi le reste a échoué.

## Ce qui rend un dessin de notice beau

Une bonne notice se reconnaît à trois choses. Chacune règle un défaut que JP a nommé.

1. **La position est juste avant d'être jolie.** Le pouce part du poignet, côté index, et fait le
   tour de l'objet par l'autre côté ; les doigts s'enroulent jusqu'à ce que chaque phalange touche.
   Un pouce mal placé se voit tout de suite, même par quelqu'un qui ne sait pas dire pourquoi
   (« le pouce est pas à la bonne place »). Dessiner une prise à l'œil, en 2D, rate presque
   toujours : on pose la main en 3D (`scripts/main3d.py`), puis on la regarde sous l'angle voulu.
2. **Le trait est franc.** Un contour se dessine en peu de courbes longues, qui changent de sens
   seulement aux vrais angles. Un trait qui tremble, des bosses parasites, des bouts de ligne hachés :
   c'est ce que JP appelle « laid ». Tout contour passe par `scripts/courbes.py` (lissage, puis
   courbes de Bézier ajustées), jamais tel quel du pixel.
3. **La forme est simplifiée, pas détaillée.** Pas d'ongles, pas de plis, pas de veines, pas
   d'anatomie. Les doigts sont un peu plus pleins et un peu plus courts qu'au naturel ; la paume est
   une masse douce ; un seul trait intérieur entre deux doigts ; la manche de chandail coupe le bras
   au poignet. Plus on ajoute de détail, plus la main a l'air « weird ».

## Les poids de trait

- Silhouette et objets : 1,6. Traits intérieurs (entre les doigts, bord de manche, oreille, cheveux) : 1,05.
- Un trait intérieur s'arrête un peu avant le contour (environ 1 mm) : il « respire » au lieu de buter.
- Un trait de moins de 7 mm ne se dessine pas : c'est du bruit, pas de l'information.
- L'œil est un point plein. Aucun autre détail dans le visage.

## La méthode, par élément

### Une main qui tient, pince ou appuie — `scripts/notice_main.py`

1. Choisis la pose dans `references/mains.md` (prise, pince, boule, appui) ou décris-en une nouvelle
   avec le même langage : l'objet (cylindre, sphère, plan, aiguille) et ce qui doit le toucher.
2. Laisse l'ajustement refermer les doigts (`ajuster_doigts`, `ajuster_doigts_surf`) puis le pouce
   (`ajuster_pouce`, avec une cible pour sa pulpe et au besoin pour son articulation). Ne pose jamais
   les angles à la main pour « faire joli » : c'est ainsi que les pouces se sont retrouvés de travers.
3. Rends sous l'angle qui montre le geste. Les vues qui lisent bien : la prise de trois quarts côté
   pouce, la prise côté paume, la pince de profil et de face, la boule de côté, la main à plat de
   dessus et de profil. La prise « par le bout du manche » se lit mal : évite-la.
4. Regarde le PNG à la taille où il sera imprimé, pas en grand.

### Une tête — `scripts/notice_corps.py`, fonction `tete`

Les têtes se dessinent comme un illustrateur : des repères posés sur la grille du canon, puis une seule
courbe lisse. Le canon (sommet 0, menton 100) est dans `references/tetes-corps.md`. Les essais par
formes géométriques (cercle + ellipse + nez en capsule) ont donné des têtes en boule avec un nez en
crochet : ne reviens pas à cette méthode pour une tête.

### Un personnage — `scripts/notice_corps.py`, fonction `personnage`

Des tubes pleins à contour, empilés dans l'ordre de profondeur : bras loin, jambe loin, cou, tronc,
jambe près, bras près, tête. Chaque pièce est peinte en blanc, ce qui cache le trait de ce qui passe
derrière. Canon : 6,5 têtes de haut, épaules à deux têtes, bras jusqu'à mi-cuisse. Poses : debout,
à genoux, accroupi ; une nouvelle pose = un nouveau jeu d'articulations, pas un nouveau dessin.

## Avant de montrer quoi que ce soit à JP

Regarde la feuille et réponds honnêtement, élément par élément :

- Le pouce part-il du poignet côté index, et touche-t-il l'objet ou les doigts là où il le ferait pour vrai ?
- Un contour tremble-t-il, fait-il une bosse sans raison, ou se casse-t-il en petits bouts ?
- Y a-t-il un détail anatomique (ongle, pli, phalange marquée, lèvre) ? Enlève-le.
- La manche est-elle de la bonne taille, ou mange-t-elle la moitié du dessin ?
- Une tête : le nez est-il une bosse douce (pas un crochet), le crâne déborde-t-il loin derrière l'oreille ?
- Un personnage : deux membres se superposent-ils au point de doubler le trait ? Décale le membre loin.

Dis à JP ce qui reste faible plutôt que de le laisser le trouver. Il préfère un « la boule de face
est encore molle » à une feuille présentée comme finie.

## Les fichiers

- `scripts/main3d.py` — la main 3D : anatomie, ajustement de la prise, rendu en profondeur et en contours.
- `scripts/courbes.py` — du contour tremblé aux courbes de Bézier franches (Schneider).
- `scripts/notice_main.py <pose> [vue]` — pose, rend et écrit SVG + PNG d'une main.
- `scripts/notice_corps.py` — têtes et personnages ; lancé seul, il écrit les feuilles d'essai.
- `references/mains.md` — les poses, leurs objets, leurs cibles, et ce qui a raté.
- `references/tetes-corps.md` — le canon des têtes (adulte, enfant, bébé) et des personnages.

La sortie va dans `$NOTICE_SORTIE` (par défaut `_reprise/scratchpad/modeles/notice/`). Une main validée
par JP se porte ensuite dans la planche : son SVG est un groupe qu'on place et qu'on met à l'échelle,
la main en mm d'adulte (190 mm du poignet au bout du majeur).
