# La mécanique du canevas

Référence. À lire avant le premier montage, puis en cas de doute.

## L'index : `project/canvas.json`

```json
{
  "v": 3,
  "createdOnFiles": { "v": 1, "at": "2026-09-23T12:00:00Z" },
  "title": "Planches — Le Grand Livre du Chalet",
  "launch": { "view": "canvas" },
  "pages": [{ "id": "tome1", "name": "Tome 1 — Tenir" }],
  "boards": {
    "P84_09.dc.html": {
      "x": 0, "y": 0, "w": 544, "h": 680,
      "title": "84-09 — Souder avec deux batteries",
      "page": "tome4"
    }
  },
  "order": ["P84_09.dc.html"],
  "notes": {},
  "designSystems": []
}
```

- `x`, `y`, `w`, `h` sont le **cadre sur le canevas**, en pixels CSS. `w` et `h` entre 40
  et 8000.
- `order` liste les mêmes clés, de l'arrière vers l'avant. Le premier artboard se nomme
  `Main.dc.html` quand le canevas en a un qui sert d'entrée ; une vitrine de planches n'en
  a pas besoin.
- `title` sur un cadre s'affiche dans son bandeau de nom. Mets-y **le numéro de planche
  d'abord** : `84-09 — Souder avec deux batteries`. C'est ce qui permet de retrouver le
  fichier source sans chercher.
- `page` range le cadre dans une page ; sans lui, il va sur la première.
- `createdOnFiles` : on l'écrit une seule fois, à la création, et on le **recopie tel quel**
  à chaque mise à jour. Le perdre casse l'index.
- Toute clé qu'on ne change pas se recopie exactement comme on l'a lue.

**Nom de fichier d'artboard** : commence par une lettre, un chiffre ou `_`, puis seulement
ça plus `.` et `-`, jamais d'espace. Donc pas `84-09.dc.html` — il commence par un
chiffre, ce qui passe, mais `P84_09.dc.html` se lit mieux et évite les surprises de tri.

## Un artboard : le squelette

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>84-09 — Souder avec deux batteries</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<style>
body{margin:0;font-family:Georgia,'Times New Roman',serif;background:#FFFFFF}
</style>
</helmet>
<div style="width: 544px; height: 680px; box-sizing: border-box; background: #FFFFFF; position: relative">
  <!-- la page, ses marges, puis le SVG de la planche -->
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":544,"height":680}}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>
</body>
</html>
```

Ce qui casse en silence :

- **La ligne `support.js` se garde exactement.** La retirer ou la déplacer ne produit
  aucune erreur visible, juste un artboard vide.
- **Le `<div>` racine a une taille fixe égale au `w`/`h` du cadre, et le même
  `$preview`.** Un écart fait flotter le contenu ou le fait rogner.
- **Le bloc `<script type="text/x-dc" data-dc-script>` est obligatoire**, même sans
  logique. `class Component extends DCLogic`, JS classique, aucun `import`.
- **Tout attribut se ferme et se met entre guillemets**, tout élément non vide se ferme.
- `data-props` s'écrit entre **apostrophes simples**, et son contenu est du JSON : `&amp;`
  pour `&`, `&#39;` pour une apostrophe, `\"` pour un guillemet dans une chaîne. L'UTF-8
  brut passe très bien — accents, tirets cadratins, points médians.
- Pas de `<iframe>`, pas de réseau sauf une police Google dans `<helmet>`.

## Insérer le SVG d'une planche

Le SVG s'insère **tel quel**, collé dans le `<div>` racine. Il porte déjà ses attributs de
présentation sur chaque forme — c'est la règle du skill `planches` — donc il n'a besoin
d'aucune feuille de style de la part de l'artboard.

Trois précautions :

1. **Retirer la déclaration `<?xml …?>`** si elle est là : elle n'a rien à faire au milieu
   d'un document HTML.
2. **Ne pas toucher au `viewBox`.** C'est lui qui garantit que 0,5 d'épaisseur fait bien
   0,5. Pour changer la taille affichée, on agit sur `width`/`height` du `<svg>`, jamais
   sur le `viewBox`.
3. **Un seul `id` par canevas.** Deux planches sur la même page qui déclarent chacune un
   marqueur `id="fl"` se marchent dessus : le second écrase le premier. Chaque artboard
   étant un document séparé, le risque ne se pose que si on met deux SVG dans un même
   artboard — dans ce cas, préfixer les `id` par le numéro de planche.

## Montrer la page d'impression

Le livre est en 8 × 10 po. À 68 px par pouce, la page fait **544 × 680** sur le canevas.

```html
<div style="width: 544px; height: 680px; box-sizing: border-box; background: #FFFFFF; position: relative">
  <!-- marges : 0,75 po en tête et pied, 0,875 po au petit fond -->
  <div style="position: absolute; left: 34px; top: 51px; width: 476px; height: 578px;
              border: 0.5px dashed #C8C8C8"></div>
  <!-- la planche, posée dans la zone utile -->
  <div style="position: absolute; left: 34px; top: 51px; width: 476px">
    <svg …>…</svg>
  </div>
</div>
```

Le rectangle en pointillé gris est la **zone utile**. Il ne s'imprime pas : il sert à voir
si le dessin mord dans la marge. Une planche qui dépasse ce rectangle est une planche à
rétrécir, et c'est précisément ce qu'on veut apercevoir au premier coup d'œil.

Le SVG reçoit `width: 476px` — sa largeur réelle dans la page — et sa hauteur suit toute
seule si le `viewBox` est correct. Une planche demi-page occupe alors un peu moins de la
moitié de la hauteur utile, et **ça se voit**.

## Les notes

```json
"notes": {
  "t1":  { "x": 0, "y": -250, "text": "À refaire", "kind": "title1", "maxW": 1832 },
  "j84": { "x": 0, "y": 704,  "text": "Montage. Une topologie.", "w": 544, "maxH": 72, "size": "s" }
}
```

- **`x`, `y` et `text` sont obligatoires.** 200 notes au maximum. Les identifiants
  n'acceptent que `[A-Za-z0-9_-]`, 40 caractères.
- **`kind: "title1"`** est un titre de groupe : une ligne en gras de 72 px. Il coiffe
  plusieurs artboards, jamais un seul. Il se pose **au moins 223 px au-dessus** de sa
  rangée, son `maxW` vaut la largeur de la rangée, et rien ne doit passer par-dessus.
- **Sans `kind`, c'est une note ordinaire.** On fixe `w`, et **on fixe `maxH`** : sans lui
  elle grandit jusqu'à 4/3 de `w` avant de défiler. Une note de 544 de large peut donc
  faire 725 de haut et manger la rangée suivante. `maxH: 72` tient deux lignes en `size:
  "s"`, `100` en tient trois.
- `size` prend `s`, `m`, `l`, `xl`, `xxl` ou un nombre de pixels. `bold`, `italic`,
  `color` et `fill` existent aussi — `fill` accepte gray, red, orange, green, teal, blue,
  purple, pink.

**Une couleur ne remplace jamais un mot.** Un statut se lit dans le texte de la note
(`À REFAIRE — …`), pas seulement dans la teinte du papillon : une capture en noir et blanc
ou un œil daltonien perdent la couleur et gardent le texte.

## Les pages

```json
"pages": [
  { "id": "meres",  "name": "Planches mères" },
  { "id": "atelier","name": "Tome 4 — L'atelier" }
]
```

40 pages au maximum, identifiants en `[A-Za-z0-9_-]`. Chaque cadre porte `"page": "<id>"` ;
sans ça, il va sur la première page.

Au-delà d'une trentaine d'artboards, les pages cessent d'être un confort : un canevas
où il faut se perdre en pan-zoom pour retrouver une planche a cessé d'être un outil de
décision.

## Publier

Écrire tous les fichiers sous **un seul dossier**, chacun à son chemin de canevas
(`project/canvas.json`, `project/P84_09.dc.html`), puis **un seul appel** :

```
url        l'adresse du canevas
root       le dossier
file_path  le chemin absolu de project/canvas.json
files      tous les autres, chemin de canevas → chemin sous root
```

À la mise à jour :

- **On n'envoie que les fichiers changés.** Un fichier absent de l'appel reste tel quel.
- **L'index ne part que si la mise en page change** — ajout, retrait, déplacement,
  redimensionnement, titre, notes, pages. Un simple changement de dessin ne le touche pas.
- **On relit l'index juste avant de l'envoyer.** Quelqu'un a pu déplacer un cadre à la
  main : son travail ne s'écrase pas. Si la publication est refusée parce que quelqu'un a
  sauvegardé entre-temps, on relit, on refait l'édition sur la version fraîche, une fois.
- **`"project/X.dc.html": null`** retire un fichier. Retirer un artboard demande aussi de
  l'ôter de `boards` et de `order`.
- On ne publie **jamais** `index.html`, `SKILL.md`, ni quoi que ce soit sous
  `artifact-type/` : ces fichiers appartiennent au type et l'envoi serait refusé.

## Ne pas vérifier en ouvrant

Le calcul de mise en page est déterministe. Si le script est juste, le canevas est juste.
Ouvrir la page, faire une capture ou lancer un navigateur pour contrôler coûte du temps et
ne trouve rien qu'une relecture du manifeste n'aurait pas trouvé.

La seule vérification utile est en amont : **est-ce que deux cadres se chevauchent, et
est-ce qu'une note déborde sur la rangée suivante ?** Le script répond aux deux, et il le
dit avant d'écrire.
