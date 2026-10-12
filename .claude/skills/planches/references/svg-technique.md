# Mécanique SVG des planches

À lire avant la première planche. Le reste du temps, c'est une référence.

## Squelette

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="680" height="440" viewBox="0 0 680 440" role="img">
  <title>Planche 84-09 — Le montage en série</title>
  <desc>Description pour qui n'a pas le dessin sous les yeux.</desc>
  <style> … </style>
  <rect fill="#FFFFFF" x="0" y="0" width="680" height="440"/>
  <!-- couche 1 : contours extérieurs -->
  <!-- couche 2 : contours internes -->
  <!-- couche 3 : détails et hachures -->
  <!-- couche 4 : lignes de rappel -->
  <!-- couche 5 : renvois numérotés -->
  <!-- couche 6 : texte et pied de planche -->
</svg>
```

`width` et `height` en pixels **égaux** au `viewBox` : c'est ce qui garantit qu'une
épaisseur de 0,7 fait bien 0,7 pixel. Un `viewBox` plus petit que la largeur réelle
multiplie toutes les épaisseurs et ruine la hiérarchie.

Le `<rect>` blanc de fond n'est pas décoratif : sans lui, le SVG ouvert dans un visualiseur
en mode sombre devient illisible, et à l'impression un fond transparent peut sortir gris.

## Jamais de bloc `<style>`

**C'est la faute la plus coûteuse du lot, parce qu'elle ne se voit pas chez toi.** Un SVG
dont le style vit dans un `<style>` s'affiche parfaitement dans un navigateur, et
**disparaît complètement** partout où le fichier passe par un nettoyeur : aperçus de
messagerie, cartes de fichier, panneaux de prévisualisation, éditeurs de mise en pages.
Ces outils retirent les blocs `<style>` par sécurité. Il ne reste alors aucun trait, et la
planche s'ouvre sur une page blanche.

Le symptôme : « je ne vois pas la planche ». Le fichier est bon, le dessin est là, et
personne ne peut le regarder.

Donc : **chaque forme porte ses attributs de présentation directement.**

```xml
<path d="M70 230 L150 230 L150 280 L70 280 Z"
      fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linejoin="round"/>
<text x="355" y="301" text-anchor="middle"
      font-family="Georgia, 'Times New Roman', serif" font-size="12" fill="#1A1A1A">deux ou trois pas</text>
```

C'est plus verbeux, et c'est le prix d'un fichier qui s'ouvre partout. Les quatre
épaisseurs restent les mêmes — 2,4 / 1,4 / 0,7 / 0,5 — elles sont juste écrites sur chaque
forme. Le vérificateur contrôle la hiérarchie de toute façon, donc rien n'est perdu côté
relecture.

Vaut aussi pour le marqueur de flèche : mets `stroke="#1A1A1A"` en dur dans le `<path>` du
marqueur plutôt que `context-stroke`, qui n'est pas soutenu partout.

**Table de référence des valeurs à écrire à la main :**

| Rôle | Attributs |
| --- | --- |
| Contour extérieur | `fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linejoin="round"` |
| Arête, contour interne, fil | `fill="none" stroke="#1A1A1A" stroke-width="1.4"` |
| Détail, hachure, cote | `fill="none" stroke="#1A1A1A" stroke-width="0.7"` |
| Ligne de rappel | `fill="none" stroke="#1A1A1A" stroke-width="0.5" stroke-dasharray="3 2.5"` |
| Pastille de renvoi | `fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4"` |
| Filet danger | `fill="none" stroke="#9B2C1E" stroke-width="2"` |
| Texte de légende | `font-family="Georgia, 'Times New Roman', serif" font-size="13" fill="#1A1A1A"` |
| Cote, chiffre de renvoi | `font-family="Georgia, 'Times New Roman', serif" font-size="12" fill="#1A1A1A"` |
| Texte danger | `font-family="Georgia, 'Times New Roman', serif" font-size="13" fill="#9B2C1E"` |

## Les hachures de coupe

Sur un plein coupé, hachures à 45°, espacées de 6, en `.c3`. Jamais de gris plein : un
aplat de gris s'imprime sale sur papier standard et disparaît en photocopie.

```xml
<defs>
  <pattern id="coupe" width="8.5" height="8.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="8.5" stroke="#1A1A1A" stroke-width="0.7"/>
  </pattern>
</defs>
<rect x="200" y="140" width="180" height="60" fill="url(#coupe)" stroke="#1A1A1A" stroke-width="1.4"/>
```

Deux matériaux différents dans la même coupe se distinguent par l'**écartement** des
hachures, pas par leur angle : le bois à 6, le métal à 10. L'angle qui change fait croire à
deux pièces séparées.

## Les cotes

Une cote, c'est une ligne fine avec deux extrémités marquées et un nombre au-dessus, sans
rien qui la coupe.

```xml
<line class="c3" x1="180" y1="300" x2="500" y2="300"/>
<line class="c3" x1="180" y1="294" x2="180" y2="306"/>
<line class="c3" x1="500" y1="294" x2="500" y2="306"/>
<text class="cote" x="340" y="294" text-anchor="middle">3 m</text>
```

Les tirets aux bouts valent mieux que des flèches : à 0,7 d'épaisseur une pointe de flèche
se bouche à l'impression. Le texte se met **au-dessus** de la ligne, jamais dessus.

Ne cote que ce qui décide. Une planche avec sept cotes n'en a aucune qui ressorte.

## Les renvois numérotés

```xml
<line class="rap" x1="268" y1="206" x2="312" y2="244"/>
<circle cx="320" cy="252" r="9" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.4"/>
<text class="num" x="320" y="256">3</text>
```

La ligne part **du bord du cercle** vers l'élément, et s'arrête au contact. Calcule le point
de départ : si le cercle est en (320, 252) de rayon 9 et que la cible est en (268, 206), le
vecteur fait (−52, −46), sa longueur 69,4, donc le départ est à
(320 − 9 × 52/69,4 ; 252 − 9 × 46/69,4) = (313,3 ; 246,0).

Le `y` du texte vaut `cy + 4` pour un corps de 12 : c'est le décalage qui centre
optiquement un chiffre dans un cercle.

## Les flèches, quand il en faut vraiment

Une flèche sert à dire un **mouvement** ou un **sens d'écoulement**. Pour désigner, c'est
un renvoi numéroté. Pour relier, c'est une ligne simple.

```xml
<defs>
  <marker id="fl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M1 1 L9 5 L1 9" fill="none" stroke="context-stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
</defs>
<path class="c2" d="M200 160 L280 160" marker-end="url(#fl)"/>
```

`context-stroke` fait que la pointe prend la couleur de sa ligne. Sans ça, une flèche rouge
se retrouve avec une pointe noire.

## Les pièges

**`fill="none"` sur tout ce qui est un trait.** Le SVG remplit en noir par défaut. Un
`<path>` de fil électrique sans `fill="none"` devient une tache noire de la taille de
l'enveloppe du tracé. C'est la faute numéro un, et elle ne se voit pas dans le code.

**Ne cache jamais une ligne sous un rectangle blanc.** Ça marche à l'écran sur fond blanc et
casse partout ailleurs. Quand une ligne rencontre un objet, coupe-la : trace deux segments
qui s'arrêtent aux bords, en calculant les points.

**Pas de texte pivoté.** Il se lit mal, il casse l'alignement, et sur une planche imprimée
il oblige à tourner le livre. Déplace la cote plutôt que de tourner son étiquette.

**Le SVG ne renvoie pas le texte à la ligne.** Chaque ligne est un `<tspan x="…"
dy="1.25em">`. Si une légende demande plus de deux lignes, elle est trop longue : c'est un
problème de rédaction, pas de mise en pages.

**La typographie française prend une espace avant `;` `:` `!` `?` et avant `»`.** Ne colle
pas ces ponctuations.

**Aucune couleur sauf le rouge `#9B2C1E` des encadrés danger.** Pas de gris de remplissage,
pas de dégradé, pas d'ombre portée. Le livre s'imprime en noir sur papier standard et tout
aplat clair sort soit noir, soit invisible, selon la presse.

**Coordonnées positives.** Le `viewBox` part de 0,0 ; un élément en négatif est simplement
absent du dessin sans que rien ne le signale.

**Calcule la hauteur du `viewBox` après coup** : bas de l'élément le plus bas, plus 40. Une
planche avec 200 unités de vide en bas se centre mal dans la page.

## Vérifier

```bash
node .claude/skills/planches/scripts/verifier-planche.js images/planche-84-09.svg
```

Le script contrôle ce qui ne se voit qu'à l'impression : la hiérarchie des traits, les
`fill` manquants, les couleurs interdites, les corps de texte, les coordonnées hors cadre,
la hauteur du `viewBox`. Il ne juge pas le dessin — ça, c'est l'œil.
