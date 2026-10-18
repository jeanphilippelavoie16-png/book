# Les images des tomes : le brief

Pour la page de titre et la couverture de chaque tome (plan de match, point 30). Style : celui de
`images/references/style-pages-de-tome.jpg`, des pictogrammes en aplat noir, sans visage, nets, réguliers, de
niveau professionnel. Une seule couleur d'appoint : l'orange du livre (#EE7219), pour le feu seulement.
Fond blanc, aucune ombre, aucun dégradé, aucun texte dans l'image.

Format : une frise horizontale, 7 × 2,1 po (rapport 10:3), pour la page de titre ; la même scène en plus haut pour
la couverture (8 × 10 po, l'image dans la moitié du bas).

## Le texte à donner à un générateur d'images

Tome 1, Tenir :

> Flat black pictogram illustration, professional stock-icon style like Shutterstock pictogram sets: solid black
> stick-figure people with round heads, no faces, thin white gaps between limbs, clean geometric shapes. A family
> of two adults and two young children huddled close together around a small campfire, the adults holding the
> children. Behind them, in light grey silhouettes: a nuclear mushroom cloud, a burning boreal spruce forest, a
> snowstorm, a fallen power line pole. Only the flames are orange (#EE7219). White background, wide horizontal
> banner 10:3, no text, no shading, no gradients, vector look.

Les autres tomes, même début de texte, la scène change :
- Tome 2, Le corps : une personne soigne une autre, assise près d'un poêle à bois ; un enfant à côté.
- Tome 3, Prélever : une file qui revient de la chasse et de la pêche : l'un porte un quartier d'orignal, l'autre
  une canne et des truites, un enfant un panier de petits fruits ; épinettes en gris derrière.
- Tome 4, De la bête au garde-manger : on dépèce un orignal suspendu, un fumoir qui fume, des bocaux et un caveau.
- Tome 5, La forêt, le jardin et le chalet : on fend du bois, une corde de bois, un jardin en rangs, le chalet.
- Tome 6, L'atelier : on soude, une enclume et une forge, un moteur sur un établi.

## La page de titre, nuit d'hiver : repeinte par un générateur (18 octobre 2026)

JP, sur la scène dessinée par `scene_titre.py` : « ce que tu as fait, ça serait parfait à donner à un générateur
d'images ». La scène sert de **composition imposée** : on la donne en image de départ (image-to-image, ou « image de
référence ») avec le texte ci-dessous, et le générateur la repeint sans déplacer les masses. Le ciel du haut reste
calme et foncé : le titre, le sous-titre et la série des tomes se posent par-dessus à l'assemblage.

- Image de départ : `essais-ia/titre-nuit-reference.png` (1536 × 1920, sans texte).
- Texte : `essais-ia/titre-nuit-prompt.txt`.
- Pour l'impression il faut 2400 × 3000 px au moins (8 × 10 po à 300 ppp) : l'image retenue s'agrandit avant
  d'entrer dans le livre.
