---
name: canevas
description: Monter et tenir à jour le canevas de relecture des planches du Grand Livre du Chalet — un Artifact de type Design où les planches sont posées côte à côte, à leur taille d'impression, pour être jugées et commentées. Utilise ce skill dès qu'il est question de montrer des planches, d'en faire voir plusieurs ensemble, de monter ou de mettre à jour le canevas, d'ajouter une planche à la vitrine, de regrouper ou de réorganiser des artboards, ou quand quelqu'un dit qu'il ne voit pas une planche. Il porte la mise en page du canevas, pas le dessin des planches — pour ça, c'est le skill planches.
---

# Monter un canevas de relecture

Le canevas n'est pas une galerie. C'est **l'endroit où on décide** : garder, refaire,
couper, commander. Tout ce qui suit sert cette décision, et rien d'autre.

Il ne remplace pas les fichiers. **Le SVG reste la source qui part à l'impression ; le
canevas est la vitrine.** Une planche corrigée l'est dans son `.svg`, puis republiée sur le
canevas — jamais l'inverse.

## Ce qui distingue un canevas professionnel

### 1. On voit la taille d'impression

C'est le défaut qui rend un canevas inutile pour décider : un cadre de 680 × 440 sur un
écran ne dit pas si la planche sera grande comme la main ou comme la page. Or c'est
exactement ce qu'on veut juger — un trait de 0,5 tient en pleine page et disparaît en
quart de page.

**Chaque planche se montre dans l'empreinte de sa page.** Le livre est en 8 × 10 po. À
l'échelle du canevas, 1 po = 68 px, donc la page fait **544 × 680**. On pose la planche
dedans, avec sa marge, et le cadre de l'artboard est la page — pas le dessin.

| Format | Le dessin occupe | Empreinte page |
| --- | --- | --- |
| Pleine page | 476 × 612 environ | 544 × 680 |
| Demi-page | 476 × 300 environ | 544 × 680, moitié haute |
| Quart de page | 230 × 230 environ | 544 × 680, quart |

Une planche demi-page montrée seule, sans la page autour, se juge trop grande. C'est
l'erreur la plus fréquente et la plus coûteuse : on approuve un dessin qui sera illisible.

### 2. Rien n'est posé à l'œil

Toutes les positions sortent d'un calcul, jamais d'une estimation. Le script
`scripts/monter-canevas.js` les produit ; s'il ne convient pas, on l'améliore plutôt que
de placer à la main.

La grille : **80 px entre deux cadres d'une même rangée, 120 px entre deux rangées.** La
hauteur d'une rangée est celle de son cadre le plus haut, et elle se calcule **avant** de
poser la rangée suivante — pas pendant la boucle. Une rangée dont on découvre la hauteur
en la remplissant produit des chevauchements qui ne se voient qu'au zoom arrière.

Toutes les rangées commencent au même `x`. Un canevas dont les colonnes ne s'alignent pas
se lit mal et donne l'impression que personne ne l'a regardé.

### 3. Le regroupement raconte le travail

Trois planches sur un canevas se posent en ligne. Quatre-vingt-sept demandent une
structure, et la structure doit répondre à la question qu'on se pose en ouvrant :
**qu'est-ce qui me reste à faire ?**

Regroupe par **statut** avant de regrouper par sujet :

| Groupe | Ce qu'on y fait |
| --- | --- |
| À refaire | Le plus haut, le plus visible. C'est là que le travail est |
| Prêtes | Validées, on n'y touche plus |
| À commander | Fiches de commande, pas des dessins |
| Nouvelles | Depuis la dernière relecture |

Dans chaque groupe, l'ordre suit l'ordre de travail : les planches mères d'abord, parce
qu'une planche mère sert dans neuf chapitres et se valide avant les autres.

Passé une trentaine d'artboards, utilise les **pages** du canevas (jusqu'à 40) : une page
par tome ou par vague. Un canevas où il faut se perdre en pan-zoom pour retrouver une
planche a cessé d'être un outil de décision.

### 4. Chaque planche dit pourquoi elle existe

Sous chaque cadre, une note courte : **la raison pour laquelle une phrase ne suffisait
pas.** C'est le critère du skill `planches`, et le canevas est l'endroit où il se vérifie.

Si tu ne peux pas écrire cette phrase pour une planche, elle n'a rien à faire sur le
canevas — elle a déjà échoué au test.

La note dit aussi le statut quand il n'est pas « prête » : `À REFAIRE —` suivi du défaut,
en tête de note. Pas de code couleur seul : une couleur ne survit pas à une capture
d'écran en noir et blanc, et quelqu'un qui daltonise ne la lit pas.

### 5. Les titres de groupe sont des repères, pas de la décoration

Un `kind: "title1"` coiffe **plusieurs** artboards, jamais un seul — le cadre porte déjà
son propre nom. Il se pose au moins 223 px au-dessus de sa rangée, et son `maxW` vaut la
largeur de la rangée qu'il coiffe, sinon il déborde sur le vide à droite.

## Les pièges des notes

Ce sont eux qui cassent une mise en page propre, et ils sont silencieux.

**Une note sans `maxH` grandit jusqu'à 4/3 de sa largeur.** Une note de 544 de large peut
donc faire 725 de haut avant de commencer à défiler. Si la rangée suivante est à 120 px
en dessous, elle est mangée. **Fixe toujours `maxH`** sur une note de légende : 72 suffit
pour deux lignes, 100 pour trois.

**Une note se pose dans le couloir, pas sur un cadre.** Garde 24 px entre le bas d'un
artboard et le haut de sa note, et vérifie que `note.y + maxH` reste au-dessus de la
rangée suivante. Le script le calcule ; à la main, on se trompe.

**Une note de légende n'est pas un `title1`.** Le `title1` fait une ligne de 72 px en gras
— énorme. Une légende sous une planche est une note ordinaire avec `size: "s"`.

## Ce qu'on met dans un artboard

Un artboard de ce canevas est **une page du livre**, pas un dessin. Sa structure :

1. Le rectangle de page, 544 × 680, fond blanc, bord fin gris — il représente le papier.
2. Les marges dessinées en trait très fin, pour qu'on voie où le dessin mord.
3. Le SVG de la planche, à son échelle réelle dans la page.
4. Rien d'autre. Pas de titre ajouté, pas de cadre décoratif, pas d'ombre portée.

Le SVG s'insère **tel quel**, sans être retouché : ce qu'on juge doit être exactement ce
qui s'imprimera. Si une planche a l'air mauvaise dans la page, c'est la planche qu'on
corrige, pas sa présentation.

La mécanique du fichier `.dc.html` est dans `references/artboards-et-notes.md`. Les deux
règles qui mordent le plus :

- Garde la ligne `<script src="./support.js"></script>` telle quelle dans le `<head>`.
- Donne au `<div>` racine une taille fixe **égale** au `w`/`h` du cadre, et le même
  `$preview`. Un décalage entre les deux fait flotter le contenu dans son cadre.

## Monter ou mettre à jour

```bash
node .claude/skills/canevas/scripts/monter-canevas.js images/manifeste-canevas.json
```

Le manifeste liste les planches, leur statut, leur groupe et leur justification. Le script
produit `project/canvas.json` et un `.dc.html` par planche, avec les positions calculées.
On publie ensuite le dossier en un seul appel.

**À la mise à jour, on ne renvoie que ce qui a changé.** L'index ne part que si la mise en
page bouge — ajout, retrait, déplacement, changement de titre ou de note. Et il se relit
juste avant l'envoi : quelqu'un a pu déplacer un cadre à la main entre-temps, et son
travail ne s'écrase pas.

## Ce qu'on ne fait pas

- **On ne vérifie pas en ouvrant la page.** Pas de capture, pas de navigateur, pas de
  rendu pour contrôler. Le calcul est déterministe : si le script est juste, la mise en
  page est juste. Ouvrir pour vérifier coûte du temps et ne trouve rien.
- **On ne corrige pas une planche dans l'artboard.** Le `.dc.html` enveloppe le SVG, il ne
  le modifie jamais. Une correction se fait dans `images/planche-NN-NN.svg`, puis on
  remonte le canevas.
- **On ne met pas de commentaire éditorial dans un artboard.** Les raisons, les arbitrages,
  les questions vont dans la réponse ou dans les notes du canevas, jamais dans le dessin.

## Fichiers de ce skill

- `references/artboards-et-notes.md` — la mécanique `.dc.html`, la forme exacte de
  `canvas.json`, les notes, les pages, et les pièges de publication.
- `scripts/monter-canevas.js` — calcule la mise en page et écrit les fichiers.
