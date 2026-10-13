# Les poses de main

Repère de la main droite : X vers les doigts, Y vers le pouce, Z vers le dos de la main ; mm.
Main d'homme adulte ; les longueurs et rayons sont dans `DOIGTS` et `POUCE` (main3d.py), et le style
notice les grossit un peu (`RAYON = 1.12`, `LONG = 0.94`).

## Prise (un manche de 32 mm)

- Manche : axe (0,28 ; 1 ; 0), centre (84 ; 2 ; −33), rayon 16. Il traverse la paume en biais,
  de l'hypothénar vers la base de l'index, comme pour vrai.
- Doigts : `ajuster_doigts` les referme jusqu'au contact.
- Pouce : pulpe visée en (106 ; 12 ; −67), articulation en (90 ; 37 ; −57) — il fait le tour par
  le côté de l'index et se couche en travers des 2es phalanges de l'index et du majeur.
- Vues : trois quarts côté pouce (`rot Y 15° · rot X −30°` depuis le dos), côté paume.

## Pince (une aiguille)

- Index (28, 40, 15) ; les trois autres repliés dans la paume (75–82, 95, 50) pour dégager le geste.
- Pouce : pulpe contre la pulpe de l'index (calculée depuis la 3e phalange).
- Vues : profil côté pouce, face.

## Boule (une pierre de 70 mm)

- Sphère de centre (66 ; 0 ; −52), rayon 35, posée dans la paume.
- Doigts : `ajuster_doigts_surf` sur la sphère ; pouce posé sur le dessus, côté radial.
- Vue qui lit le mieux : de côté. La vue de face fait une manche énorme : à reprendre.

## Appui (la main à plat)

- Plan à z = −15,5 (sous la paume) ; doigts presque droits, ajustés au plan ; pouce écarté sur le plan.
- Vues : de dessus, de profil.

## Ce qui a raté, et pourquoi

| Essai | Résultat | Leçon |
| --- | --- | --- |
| Mains construites en 2D par calcul (formes.js) | doigts en saucisses, « pince de homard », pouce mal placé | la position ne se devine pas : poser en 3D |
| Mains enlevées (objet + flèche) | « c'est pas ça que je voulais » | la main reste, elle se dessine bien |
| Trois dessinateurs + juge, en 2D | mieux mais « pas beau » | même limite : pas de vraie position |
| Main 3D rendue en trait réaliste | « ouff non » | juste mais lourde : trop de relief, trait tremblé |
| Main 3D aplatie au style notice | bonne direction, trait encore haché | passer par les courbes de Bézier |
