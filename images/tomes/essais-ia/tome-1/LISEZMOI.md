# Couverture imprimée du tome 1 : trois mises en page (18 octobre 2026)

L'image est celle de la page de titre, choisie par JP : `images/tomes/titre-tome-1.jpg` (linogravure, ciel étoilé,
crêtes orange, chalet dans la neige). Chaque variante est la couverture complète, quatrième, tranche et devant, aux
mesures de Blurb du tome 1. Elle sert de modèle aux cinq autres tomes : le même script les fait avec leur image.

| Fichier | Contenu |
| --- | --- |
| `couverture-tome-1-A.png`, `-B.png`, `-C.png` | La couverture entière, fond perdu compris, 150 ppp (2540 × 1538 px) |
| `tome-1-couvertures.png` | La planche de choix : les trois, rognées, côte à côte, lettre au-dessus, une coche à chaque pli |
| `couverture.py` | Le script qui fait tout (HTML et CSS, rendu par Chromium sans fenêtre) |

## Les dimensions

Tirées de `design/directions/1-manuel-de-terrain/outils/build_couvertures_6.py`, importé tel quel (rien n'y est écrit).

| | Pouces |
| --- | --- |
| Tome 1 | 308 pages (`livre/tome-1/rapport.md`, assemblé le 15 octobre) |
| Tranche | 0,681 (tableau du calculateur de Blurb, palier de la ligne 300 p. ; `sources/blurb-specifications.md`) |
| PDF de couverture | 16,931 × 10,25 (16,25 + tranche ; fond perdu 0,125 sur les quatre bords) ; rogné 16,681 × 10 |
| Quatrième | de 0,125 à 8,125 |
| Tranche | de 8,125 à 8,806 |
| Devant | de 8,806 à 16,806, plus 0,125 de fond perdu |
| Zone sûre | 0,25 en dedans du rognage ; tout le texte est à 0,5 ou plus (0,54 sur le devant, comme la page de titre) |
| Plis | tolérance de coupe de 1/16 de chaque côté : le texte de la tranche reste en dedans |

L'image du devant couvre 8,125 × 10,25 po, centrée en largeur, calée en haut comme sur la page de titre :
3072 px sur 8,2 po, environ 375 ppp à l'impression.

**À surveiller :** le tome 1 va grossir (pages des dangers, « Comment le livre fonctionne », refonte des chapitres :
l'aperçu du ch. 10 en a déjà 14 de plus). Quand il sera réassemblé, on remet le compte dans `PAGES` de
`build_couvertures_6.py` ; la tranche et la largeur de la couverture suivent toutes seules.

## Les trois variantes

Les trois ont la même quatrième (même grille, mêmes textes) ; seules ses couleurs changent. Le devant et le dos se
combinent : un devant A avec le dos de B, par exemple, se fait en changeant une ligne de `VARIANTES`.

**A, l'affiche.** Le devant est la page de titre : « LE MANUEL DU NORD » et « TOME 1 » en tête avec un filet fin,
« TENIR » en Barlow Condensed 800 à 236 px, le sous-titre de la page de titre (`SOUS_TITRES` de
`design/outils/assembler-tome.py`), mêmes cotes au pixel (le sous-titre un peu plus large, en lignes équilibrées). La tranche et la quatrième sont un aplat de la couleur du
ciel, mesurée dans l'image (#0A1A29) : la nuit fait le tour du livre, et le pli entre la tranche et le devant ne se
voit pas, puisque le bord gauche de l'image est sombre du haut en bas. Texte clair sur la quatrième ; la photo de JP en
bichromie (marine et clair) et l'étincelle de Claude, chacune dans un disque clair.

**B, le gros chiffre.** Le devant garde l'image ; « LE MANUEL DU NORD » plus gros en tête, le « 1 » en très grand
(372 px) dans le ciel, couleur cuivre des crêtes (#BE6A3F, médiane mesurée dans l'image), et « TENIR » à côté, sur la
même ligne de base. La tranche et la quatrième sont à la couleur du tome choisie le 28 septembre (neige #E2E7EA, encre
#15222B), comme sur les couvertures actuelles : sur une tablette, les six tranches gardent leurs six couleurs. Le
chiffre dit le tome de loin. Le pli entre la tranche claire et le devant sombre porte la tolérance de coupe : un filet
clair de 1/16 po peut apparaître au bord du devant.

**C, le ciel fait le tour.** Titre centré : « LE MANUEL DU NORD » en tête, « TOME 1 » entre deux filets, « TENIR » posé
au-dessus des crêtes. La tranche et la quatrième portent le vrai ciel de l'image, ses étoiles à la même taille, reflété
au pli (le ciel passe sur la tranche sans raccord) puis en miroir. Les raccords du miroir tombent sur une ligne sans
étoile, et une bande de 0,22 po de chaque côté est vidée, sinon une étoile proche du raccord a sa jumelle collée. Comme
aucune étoile ne touche le texte, il en reste surtout dans les marges, entre les blocs et sur la tranche : la quatrième
ressemble à celle de A avec le grain et quelques étoiles.

## La quatrième

Le contenu de `build_couvertures_6.py` : le texte de présentation, le sommaire du tome (19 chapitres, deux colonnes),
le bloc des auteurs (textes de JP, tels quels), la série des six tomes (numéro et chapitres). Trois écarts, voulus :

- « 114 chapitres » devient **113** : le script compte le sommaire des six tomes (le ch. 00, coupé le 15 octobre,
  était encore dans le compte). CLAUDE.md dit 113.
- Le nom de chaque auteur passe sur sa propre ligne, au-dessus de son texte, au lieu du nom suivi d'un tiret : plus de
  tiret.
- Le dessin au trait (ch. 11, le chalet paré aux braises) sort : la liste demandée ne le nommait pas, et l'image du
  devant fait ce travail. Le sommaire et les textes ont pris la place (12,5 pt et 13 pt au lieu de 10 et 12,5). Il
  revient sans peine dans le blanc entre le sommaire et les auteurs si JP le veut.

## Les étoiles

Aucune étoile derrière une lettre ni contre elle, et les autres restent. Le script mesure dans Chromium la boîte de
chaque texte (la boîte de l'encre pour les gros caractères), puis retire de l'image composée chaque étoile qui touche
une boîte élargie d'une marge : 0,15 à 0,3 po sur la ligne du texte (une étoile au bout d'un mot se lit comme un
point), 0,12 à 0,2 po dessus et dessous ; les blocs de la quatrième (sommaire, auteurs, série) sont protégés en entier,
sinon une étoile entre deux lignes du sommaire se lit comme une puce. Une étoile est une petite tache claire sur fond
sombre : la lune, les crêtes et les traits de neige sont trop grands pour être pris. Le trou se bouche à la moyenne du
ciel autour.

## Comment les refaire

```
python3 images/tomes/essais-ia/tome-1/couverture.py                 # A, B, C du tome 1 et la planche (1 min)
python3 images/tomes/essais-ia/tome-1/couverture.py --guides        # avec rognage, plis, zone sûre, tolérance
python3 images/tomes/essais-ia/tome-1/couverture.py --tome 3 --image images/tomes/titre-tome-3.jpg --variantes A
```

Options : `--ppp` (PNG, 150), `--fond-ppp` (image de fond composée, 300 ; 375 garde l'image du tome 1 à sa pleine
définition), `--accent` (couleur du gros chiffre de B), `--garder DIR` (garde le HTML, les fonds et les portraits),
`--sortie DIR`. Il faut Chromium (`/opt/pw-browsers`) et Google Fonts (Barlow Condensed, IBM Plex Serif).

Pour les tomes 2 à 6 : titre, sommaire, couleur du tome et tranche viennent de `build_couvertures_6.py`. Un titre long
rapetisse jusqu'à tenir dans sa largeur et sous la tête ; essayé avec « De la bête au garde-manger » et « La forêt, le
jardin et le chalet » (trois lignes) sur les trois devants : tout tient. L'image de chaque tome doit garder un ciel
calme et sombre dans le haut, sur 4 po environ, sous lequel le titre se pose. La couleur du dos de A et C se mesure
dans le ciel de l'image ; celle du chiffre de B se donne par `--accent`.

Ce que le script ne fait pas encore : le PDF pour Blurb. Une fois la variante choisie, elle passe dans
`build_couvertures_6.py` (ou le script reçoit un `--pdf`), avec la découpe aux mesures exactes qui existe déjà
(`--decouper`).

## À vérifier sur l'épreuve papier

- Le texte clair sur fond sombre (A et C) : les biographies sont en 8,8 pt avec empattements. Lisible à l'écran ;
  à regarder sur l'épreuve, l'encre peut boucher un petit caractère en réserve.
- Le pli de B (tranche claire contre devant sombre), voir plus haut.
- Le noir du ciel : sRVB ici, converti chez Blurb.

## Recommandation : A

1. C'est la page de titre que JP a choisie : la couverture et la page de titre disent la même chose avec la même
   image et les mêmes cotes.
2. La nuit fait le tour sans couture. Le bord gauche de l'image est sombre du haut en bas, donc la tolérance de coupe
   au pli ne peut pas montrer de filet clair, contrairement à B.
3. La quatrième en aplat est la plus nette sous un texte dense ; C ajoute le grain et quelques étoiles dans les
   marges, pour une différence qui se voit surtout sur la tranche.
4. Comme modèle : la couleur du dos se prend dans le ciel de chaque image, et le titre se pose dans le même ciel.

Ce que B fait mieux, et qui peut se greffer sur A : la couleur du tome sur la tranche, pour que les six se
distinguent sur une tablette si les six ciels se ressemblent, et le gros chiffre. Si JP veut retrouver ses couleurs de
tomes, le bon assemblage est le devant de A avec la tranche et la quatrième de B.
