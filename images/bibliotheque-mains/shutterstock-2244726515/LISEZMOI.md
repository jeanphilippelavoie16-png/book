# Mains Shutterstock 2244726515 : la base de la nouvelle bibliothèque

Choisie par JP le 16 octobre 2026 : « c'est lui qu'on prend, et on adaptera les planches au besoin ».
Remplace `mainSimple` pour les gros plans de main (plan de match, point 29).

- `shutterstock_2244726515.eps` : le fichier acheté par JP (Illustrator, 3662 × 1499 pt, 32 mains en couleur).
- `couleur.svg` : la conversion directe (716 tracés).
- `au-trait.svg` : la version au style du livre. Chaque tracé est posé deux fois : dessous, rempli et
  contouré en noir (trait 9) ; dessus, rempli de blanc. Il reste le contour extérieur de la main, sans les
  coutures entre les morceaux. L'ombre (#d67048) devient un gris clair (#DCDCDC), les plis (#aa4b2f) restent
  noirs, les ongles (#fdc6a1) gardent un trait fin.
- `eps2svg.py` : le convertisseur (`python3 -I eps2svg.py fichier.eps sortie.svg`).

Licence : licence standard Shutterstock, au nom de JP. À confirmer par JP (impression du livre, nombre
d'exemplaires) ; les crédits vont dans `images/credits.md` au moment où une main entre dans une planche.

Les 32 poses (rangée, rang de gauche à droite) :
- rangée 1 : OK, index levé, deux doigts, trois, quatre, main ouverte, poing de face, « shaka », cornes,
  trois doigts, index et pouce, main de profil (tranche) ;
- rangée 2 : cœur des doigts, pince à deux doigts, main ouverte paume, main en coupe, paume face, prise en C,
  pouce levé de trois quarts, cornes et pouce, deux doigts, pince de côté, doigts croisés, poing de dos ;
- rangée 3 : pouce levé de côté, pouce en bas, index pointé (deux), paume en l'air, main à plat de côté,
  pincée « un peu », main posée à plat.

Ce qui sert aux planches : le poing (manche, hache, tige), la prise en C (bûche, pot), les pinces (amadou,
allumette, fil), la paume en l'air (tenir le nid d'amadou), la main à plat et la tranche (presser, poser),
l'index pointé (montrer). Ce qui manque et s'adaptera : la main de trois quarts qui serre un outil en action
(frotter la tige, tenir la scie), et les deux mains ensemble.
