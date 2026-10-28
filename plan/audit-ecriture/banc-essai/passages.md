# Le banc d'essai : les passages

28 octobre 2026. Seize passages du livre, B1 à B16, dans leur version d'avant (`plan/audit-ecriture/bases.md`,
section 9). Pour chacun, on donne d'où il vient, sa sorte, puis le texte. Le texte est recopié mot pour mot, avec son
gras, sa ponctuation et ses retours à la ligne, tel qu'il est dans le fichier à ce commit. Ce qui est entre crochets,
c'est le texte qui l'entoure dans le livre, et « […] » marque un saut : ce contexte aide à comprendre le passage, et
on ne le réécrit pas.

Il y a deux sortes de passages : le paragraphe qu'on lit d'un trait, et l'étape qu'on consulte, avec ce qui se
consulte comme elle (la liste de « Quand l'utiliser », la case de logigramme).

## B1

- **Source** : commit `3b26fb90`, `dangers/partie-1.md`, l. 3 (page Monoxyde de carbone, paragraphe « Ce qui
  arrive »).
- **Sorte** : paragraphe qu'on lit d'un trait (page des dangers).

```text
[## {!co} Monoxyde de carbone]

**Ce qui arrive.** Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus quand on ferme presque l'entrée d'air pour la nuit. Le gaz ne se voit pas et ne se sent pas. Il prend la place de l'oxygène dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans toute la pièce, jusqu'au plancher : se coucher par terre ne protège pas.

[**Comment on le reconnaît.** Le mal de tête, la fatigue et la nausée font penser à une grippe. Un jeune enfant s'intoxique plus vite qu'un adulte, et il a seulement l'air fatigué ou de mauvaise humeur. Quand deux personnes ont mal à la tête en même temps dans la même pièce, ou quand le mal de tête passe dehors et revient en rentrant, on fait comme si c'était du monoxyde. S'il y en a peu dans l'air, l'avertisseur peut prendre des heures, même des semaines, avant de sonner, et il n'est pas fiable sous 4,4 °C. Le bouton d'essai vérifie la pile et la sirène, pas la cellule qui détecte le gaz.]
```

## B2

- **Source** : commit `ce3d931a` (le texte de l'épreuve du tome 1), `dangers/partie-1.md`, l. 29 (page Génératrice et
  moteur sous un toit). Le contexte vient des l. 23 à 39 du même fichier.
- **Sorte** : paragraphe qu'on lit d'un trait (page des dangers).

```text
[## {!generatrice} Génératrice et moteur sous un toit]

[**Ce qui arrive.** Une génératrice, une auto, une motoneige, une scie à chaîne, une souffleuse ou une pompe à essence qui tourne sous un toit ou entre des murs remplit l'air de monoxyde de carbone (pictogramme du monoxyde). Ouvrir la porte du garage ne suffit pas : le gaz ne sort pas assez vite, que le garage soit attenant à la maison, séparé ou en toile. C'est la même chose dans une remise, un abri d'auto, une tente, un vestibule, une serre, ou sous un auvent ou une bâche tendue au-dessus de la machine. Un démarreur à distance qui lance le moteur d'une auto restée au garage fait la même chose.]

[Dehors, la génératrice doit être à au moins 6 m (20 pi) de tout bâtiment, l'échappement tourné à l'opposé des portes et des fenêtres. Les gaz entrent par les portes, les fenêtres et les prises d'air : on ferme celles du côté de la génératrice et celles vers lesquelles le vent pousse l'échappement.]

On est tenté de mettre la génératrice au garage, dans la remise ou sous l'auvent, porte ouverte, toujours dans les mêmes moments : la panne d'hiver, la nuit, la tempête, le soir de l'arrivée au chalet, quand on veut la protéger de la neige ou des voleurs, ou garder le congélateur en marche. Démarrer la scie ou la souffleuse dans le garage à −30 °C, « juste le temps qu'elle chauffe », est aussi dangereux.

[**Comment on le reconnaît.** Tout le monde dans le bâtiment a les signes du monoxyde en même temps, ou l'avertisseur sonne.]

[**Ce qu'on fait.**

1. Poser la génératrice dehors, à 6 m ou plus du bâtiment, sur une surface sèche, à découvert, sans toit ni bâche au-dessus.
2. Tourner l'échappement à l'opposé du bâtiment et fermer les ouvertures de ce côté.
3. Faire le plein moteur arrêté et froid, dehors, à la lampe de poche (pictogramme des vapeurs). Ne jamais faire le plein à la lumière d'une chandelle ou d'un fanal.
4. Sortir l'auto, la motoneige, la scie ou la souffleuse du garage avant de la démarrer. Dans une auto prise dans la neige, dégager le tuyau d'échappement avant chaque démarrage : un tuyau bouché renvoie le gaz dans l'habitacle.
5. Ne jamais brancher la génératrice sur une prise ni sur le panneau électrique de la maison (pictogramme du courant renvoyé).]
```

## B3

- **Source** : commit `ce3d931a` (le texte de l'épreuve du tome 1), `chapitres/01-les-quatre-horloges.md`, l. 11 à 13
  (section 1). Le contexte d'après est l'étape 16 du même chapitre, l. 129 à 142.
- **Sorte** : paragraphe qu'on lit d'un trait (section 1, « En une ligne »).

```text
[## 1. En une ligne]

Classer ce qu'il y a à faire selon quatre horloges qui partent en même temps (le corps, l'eau, le
stock périssable, les calories), et commencer par celle qui finit le plus tôt, du premier quart
d'heure jusqu'au printemps.

[Plus loin dans le même chapitre, l. 129 à 142 :]

[### Les quatre horloges

16. **Classer ce qui reste à faire selon les quatre horloges, et s'occuper d'abord de celle dont
 l'échéance est la plus proche**, même si ce qu'elle protège vaut moins. Sous le stress, on a le réflexe
 de sauver le congélateur plein qu'on voit pendant que la maison refroidit. Souvent, ce qu'on fait pour
 une horloge en use une autre : faire tourner le congélateur à la génératrice dépense le carburant de
 l'horloge 4 pour sauver l'horloge 3.

 | Horloge | Ce qui s'épuise | Vitesse | Ce qui arrive au bout | Peut-on se rattraper ? |
 | --- | --- | --- | --- | --- |
 | **1. Le corps** | La chaleur du corps et l'air qu'on respire | Minutes à heures | Intoxication au CO, hypothermie | Non. Elle seule peut tuer le jour même |
 | **2. L'eau** | L'eau potable, et la pression qui l'amène | Heures à jours | Déshydratation, eau non potable, puis tuyaux éclatés | En partie, en dépensant du combustible pour faire bouillir l'eau ou fondre la neige |
 | **3. Le stock périssable** | Le froid du réfrigérateur et du congélateur | Heures à jours | Réfrigérateur 4 à 6 h, congélateur 24 à 48 h, puis aliments perdus | Non. Ce qui a dégelé doit être cuit ou jeté (étape 20) |
 | **4. Les calories et le combustible** | Le gras, le bois, le propane, le carburant | Semaines à mois | Faim, froid, moteurs arrêtés | Oui, à condition de commencer tôt (étapes 26 à 28) |]
```

## B4

- **Source** : commit `ce3d931a` (le texte de l'épreuve du tome 1), `chapitres/01-les-quatre-horloges.md`, l. 19 à 27
  (section 2).
- **Sorte** : étape qu'on consulte (la liste des situations de la section 2, « Quand l'utiliser »).

```text
[## 2. Quand l'utiliser]

- **Le courant manque et on ne sait pas quand il reviendra** (étapes 1 à 15).
- **La génératrice ou le propane lâche par temps froid** (étapes 2 et 6 à 16).
- **La route ferme, ou le pont de glace ne tient plus**, et on ne sait pas pour combien de temps (étapes 16
 et 26 à 29).
- **Le congélateur a dégelé pendant qu'on était parti**, et il faut décider quoi sauver (étapes 15 et 20 à
 27).
- **L'eau de l'aqueduc devient suspecte** (étapes 17 à 19).
- **On hésite entre rester et partir** (étapes 16 et 29 ; ch. 2).
- **Il n'y a ni génératrice, ni thermomètre, ni eau embouteillée** (section 7).
```

## B5

- **Source** : commit `bd1b3f1e` (16 octobre 2026), `chapitres/03-panne-majeure-d-hydro-en.md`, l. 29 à 34 (section 3,
  « Pourquoi ça marche »). Le contexte d'après est fait des étapes 7 à 9 et 21 du même chapitre
  (l. 112 à 117 et 216 à 218).
- **Sorte** : paragraphe qu'on lit d'un trait (section 3).

```text
[## 3. Pourquoi ça marche]

Une maison perd sa chaleur en proportion de l'écart avec le dehors et de la surface exposée :
replier la famille dans une pièce réduit la perte. Un corps couché perd sa chaleur vers le
plancher bien plus vite que vers l'air, parce que le bois et le contreplaqué la conduisent et que
l'air immobile ne la conduit presque pas. Un tuyau fend parce que l'eau prend du volume en
gelant : la glace bouche le tuyau, et l'eau prise entre la glace et le robinet fermé monte en
pression. Le danger vient presque toujours de ce qu'on brûle pour se chauffer.

[Dans la procédure du même chapitre :]

[7. **Vivre dans une seule pièce : celle du poêle**, ou, sans poêle, la plus petite pièce qui a le
 moins de murs extérieurs. Fermer les autres pièces, boucher le bas des portes avec une couverture
 roulée et fermer les rideaux au coucher du soleil.
8. **Habiller tout le monde en couches, avec une tuque, avant d'avoir froid.**
9. **Avant la nuit, monter un abri dans la pièce** : une tente, ou des couvertures tendues sur une
 table, avec plus d'épaisseur sous les corps que par-dessus.]
[…]
[21. **Vidanger quand la pièce la plus froide descend à 5 °C.** Les tuyaux des murs extérieurs sont
 plus froids que l'air de la pièce. D'ici là, laisser couler un filet d'eau froide aux robinets des
 murs extérieurs : un robinet ouvert empêche la pression de monter (section 3).]
```

## B6

- **Source** : commit `f1dbbf77` (16 octobre 2026), `chapitres/13-feu-sans-allumettes.md`, l. 28 à 34 (section 3,
  « Comment ça marche »). Le contexte d'après est fait des étapes 2, 10, 12, 16 et 17 du même chapitre.
- **Sorte** : paragraphe qu'on lit d'un trait (section 3).

```text
[## 3. Comment ça marche]

Une étincelle ou un fil chauffé ne donne qu'un peu de chaleur, assez pour une matière très fine et très
sèche : on prépare donc le nid et deux grosseurs de petit bois avant la première étincelle, et on
monte d'une grosseur à la fois (étapes 10 et 17). Dans une fibre mouillée, la chaleur part à
évaporer l'eau : on fend le bois jusqu'au cœur sec (étape 12). Une braise devient flamme quand l'air lui arrive
sans arrêt, d'où le souffle continu de l'étape 16. Un briquet jetable ne donne plus de gaz quand il est plus
froid que le point d'ébullition de ce gaz (0 °C pour le butane, −11 °C pour l'isobutane) ; réchauffé
contre le corps, il redonne une flamme (étape 2).

[Dans la procédure du même chapitre :]

[2. **Mettre le briquet au butane qui ne fait plus de flamme sous ses vêtements, contre le ventre.**]
[…]
[10. **Trier le bois en quatre tas, au complet, avant la première étincelle** (planche 13-40) : l'amadou fin
 (planche 13-40, repère 1), le petit bois de moins de 2 cm (repère 2), celui de 2 à 5 cm (repère 3) et les
 bûches de moins de 15 cm (repère 4). Le feu qui vient de prendre meurt pendant qu'on va chercher le tas qui
 manque.]
[…]
[12. **Fendre pour trouver le sec.**
 - Fendre et refendre une bûche mouillée en surface : le cœur est sec. Continuer jusqu'à avoir des
 éclisses grosses comme un doigt.
 - Sur une éclisse, lever au couteau des copeaux en frisure, du haut vers le bas, sans les détacher :
 ces copeaux prennent la flamme du nid.]
[…]
[16. **Faire flamber le nid.**
 - Dès qu'un point rouge apparaît, refermer le nid en boule, sans serrer (repère 13).
 - Le lever devant le visage, à une longueur d'avant-bras, pour que la flamme n'atteigne pas les cils, et
 le tenir par le dessous : la flamme monte (repère 14).
 - Souffler longtemps et en continu, sans à-coups (repère 15). La fumée passe de grise et mince à blanche
 et épaisse, puis la boule flambe d'un coup (repère 16).
 - Porter de la laine ou du coton pour allumer : au-dessus d'un nid en flammes, une manche synthétique fond
 et colle à la peau.
17. **Glisser le nid sous le tipi, par l'ouverture** (repère 17), et ajouter le bois de 2 à 5 cm seulement
 quand le bois fin crépite seul (repère 18).]
```

## B7

- **Source** : commit `bd1b3f1e` (16 octobre 2026), `chapitres/03-panne-majeure-d-hydro-en.md`, l. 222 à 227
  (étape 23). Le contexte vient des l. 214 à 221 et 228 à 231 du même fichier, et des repères 1 à 6 de la planche
  03-10 (`images/planches-src/03-10.js`, l. 208 à 213, au même commit).
- **Sorte** : étape qu'on consulte (étape numérotée de la procédure).

```text
[### La plomberie

21. **Vidanger quand la pièce la plus froide descend à 5 °C.** Les tuyaux des murs extérieurs sont
 plus froids que l'air de la pièce. D'ici là, laisser couler un filet d'eau froide aux robinets des
 murs extérieurs : un robinet ouvert empêche la pression de monter (section 3).
22. **Prévoir l'heure de la vidange.** Deux relevés du même thermomètre, à 2 h d'intervalle,
 donnent la pente, et la pente donne l'heure d'arrivée à 5 °C : une maison qui perd 1 °C à l'heure
 et qui affiche 14 °C laisse neuf heures. Faire la vidange de jour, à deux, les mains chaudes.]
23. **Vidanger dans l'ordre.** Fermer l'entrée d'eau. Mettre le chauffe-eau électrique hors tension
 à son disjoncteur. Ouvrir un robinet d'eau chaude à l'étage : sans lui, le chauffe-eau ne se vide
 pas, et on croit son robinet bouché. Tirer d'abord, au robinet de vidange du chauffe-eau, l'eau
 qu'on veut boire, dans des contenants propres et couverts ; ensuite seulement, brancher le boyau
 et vider le reste au drain. Ouvrir tous les robinets, et vider les circuits de chauffage à eau
 chaude (planche 03-10).
[24. **Verser de l'antigel à plomberie non toxique** : 0,5 à 1 L dans la cuvette et le réservoir de
 la toilette, 2 L dans la laveuse, 1 L dans le lave-vaisselle, et un peu dans chaque siphon d'évier
 et de baignoire. Seulement de l'antigel à plomberie : l'antigel de moteur est toxique et reste dans
 la tuyauterie d'eau potable. Sans antigel : section 9.]

[Les repères de la planche 03-10, « Vidanger la maison dans le bon ordre » :
repère 1 : entrée d’eau fermée
repère 2 : chauffe-eau hors tension
repère 3 : robinet chaud ouvert à l’étage
repère 4 : eau à boire tirée d’abord
repère 5 : puis le boyau au drain
repère 6 : tous les robinets ouverts]
```

## B8

- **Source** : commit `15c1d673` (15 octobre 2026), `images/logigrammes/17-qui-cogne.json`, l. 195 (le texte d'une
  case du logigramme du ch. 17, « Quelqu'un cogne à la porte »). Le contexte vient des l. 185, 206, 217 et 352 à 371
  du même fichier, et de l'étape 10 du chapitre (`chapitres/17-qui-cogne-a-la-porte.md`, l. 98 à 102, au même commit).
- **Sorte** : étape qu'on consulte (une case de logigramme).

```text
[Case de question : Que répondre ?]
[Flèche « On donne », vers la case suivante :]
**Régler dehors** : un bol qui revient, du bois de la corde qui se voit. Jamais un contenant d'origine.
[Flèche « Refus, il a où aller », vers la case : **Refuser une fois**, sans mentir : la destination, la distance, le moyen d'y aller.]
[Flèche « Refus, nulle part où aller », vers la case : **Pas de refus** : abri, feu et boisson chaude dehors, ou hébergement.]

[L'étape 10 du chapitre, que la case résume :
10. **Pour un besoin matériel, régler dehors,** sans faire entrer pour discuter. Donner sous une forme qui ne
 renseigne pas : un repas chaud dans un bol qui revient, de l'eau traitée, du bois fendu, une quantité de
 carburant mesurée d'avance (ch. 15). Jamais un contenant d'origine, qui donne la marque, le format et l'idée
 qu'il y en a d'autres ; jamais une caisse ; jamais « prenez ce qu'il vous faut ». Du gras quand on en a, jamais
 le dernier : la viande maigre seule mène au mal de caribou, mortel en quelques semaines (ch. 19, ch. 21).]
```

## B9

- **Source** : commit `7bc9e9f6`, `chapitres/107-souder-braser-reparer-le-metal.md`, l. 418 à 421 (section 9, Variante
  d'urgence, variante A, « Souder à l'arc avec des batteries d'auto », geste 4). Le contexte vient des
  l. 415 à 417 et 422.
- **Sorte** : étape qu'on consulte (geste numéroté d'une variante).

```text
[3. **Câbler gros et court.** Des câbles de survoltage font l'affaire, mais ils chauffent : plus
 ils sont épais et courts, moins on perd. Un câble qui devient trop chaud pour la main entre
 deux joints est trop petit pour le travail.]
4. **Fabriquer la pince de masse et le porte-électrode.** La masse : un serre-joint en C avec le
 câble coincé sous la vis, mordu sur du métal nu à côté du joint. Le porte-électrode : une
 pince-étau, poignées gainées d'une bande de cuir mouillée puis séchée (ch. 102), qui mord
 l'électrode à un bout. On ne tient jamais que le cuir.
[5. **Amorcer comme une allumette.** …]
```

## B10

- **Source** : commit `7bc9e9f6`, `dangers/partie-1.md`, l. 25 (page Génératrice et moteur sous un toit, « Ce qu'on
  fait », étape 4). Le contexte vient des l. 14 à 26 du même fichier.
- **Sorte** : étape qu'on consulte (étape numérotée d'une page des dangers).

```text
[## {!generatrice} Génératrice et moteur sous un toit]

[**Ce qui arrive.** Une génératrice ou un moteur à essence (auto, motoneige, scie à chaîne, souffleuse, pompe) qui tourne sous un toit remplit l'air de monoxyde de carbone ({>co}), même avec la porte ouverte : le gaz ne sort pas assez vite. C'est vrai dans un garage, une remise, un abri d'auto, une tente ou une serre, et sous un auvent ou une bâche.]

[**Comment on le reconnaît.** Tout le monde dans le bâtiment a les signes du monoxyde en même temps, ou l'avertisseur sonne.]

[**Ce qu'on fait.**]

[1. Poser la génératrice dehors, sur une surface sèche, à au moins 6 m de tout bâtiment, jamais dans un garage, sous un auvent ni sous une bâche.
2. Tourner l'échappement à l'opposé du bâtiment. Fermer les portes, les fenêtres et les prises d'air du côté de la génératrice et du côté où le vent pousse les gaz.
3. Faire le plein moteur arrêté et froid, dehors, à la lampe de poche, jamais à la lueur d'une flamme ({>vapeurs}).]
4. Sortir l'auto, la motoneige, la scie ou la souffleuse du garage avant de la démarrer, même par −30 °C, et ne jamais lancer le démarreur à distance d'une auto restée au garage. Dans une auto prise dans la neige, dégager le tuyau d'échappement avant chaque démarrage.
[5. Brancher les appareils sur la génératrice, jamais la génératrice sur une prise de la maison ni sur le panneau électrique ({>electrocution}).]
```

## B11

- **Source** : commit `7bc9e9f6`, `chapitres/68-salaison-a-sec.md`, l. 114 à 116 (étape 5). Le contexte vient des
  l. 112 et 118 à 122.
- **Sorte** : étape qu'on consulte (étape numérotée de la procédure).

```text
[### 5.2 Le salage]

**5. Calculer.** **6 % du poids de la viande** en sel. Sur une pièce de 3 200 g : 192 g. Le plancher absolu est
**2,5 %**, et il n'est **jamais donné seul** — toujours «avec un minimum de 100 ppm » de
nitrite ou de nitrate. Sans nitrite, 2,5 % n'est pas un plancher, c'est un pari.

[**6. Préparer le mélange.** Sel, plus le sel de salaison nitrité (nitrite de sodium) **dosé selon
son emballage et rien d'autre**. Le mélange doit rester majoritairement du sel : pour les jambons,
les agents de salaison doivent avoir une teneur en sel d'au moins **70 %**. Mélanger à sec, à fond,
dans un bol, **avant** de toucher la viande. Un mélange fait sur la pièce est un mélange
inégal, et un mélange inégal de nitrite est un problème des deux côtés : trop ici, pas assez là.]
```

## B12

- **Source** : commit `7bc9e9f6`, `chapitres/03-panne-majeure-d-hydro-en.md`, l. 74 à 77 (étape 5, dans la série
  orange de 15 minutes). Le contexte vient des l. 40, 67 et 145 à 151 du même fichier.
- **Sorte** : étape qu'on consulte (une puce d'étape, dans une série orange).

```text
[### Le courant vient de manquer {.orange 15 min}]
[…]
[5. {!co} **Tester l'avertisseur de CO au bouton, et le poser dans la pièce chauffée où la famille va dormir.**]
[…]
 - Lire le chiffre affiché matin et soir, sans attendre la sirène : quand il y a peu de monoxyde, l'avertisseur peut
 ne pas sonner pendant des jours, alors que le mal de tête, la nausée et la fatigue qu'on met sur le compte du froid
 ont commencé. Tout chiffre affiché veut dire qu'il y a du monoxyde ; si le chiffre ne redescend pas de la journée,
 un appareil de la maison en fait.
[…]

[Plus loin dans la procédure :]

[### L'avertisseur de CO sonne {.orange 1 min}

Faire la même série quand plusieurs personnes ont mal à la tête, la nausée ou des étourdissements en même temps, avec
ou sans alarme.

12. {!co} **Réveiller et sortir tout le monde, tout de suite, sans chercher la source.** En passant, prendre les
 manteaux, les bottes et les couvertures qui sont sur le chemin, et laisser la porte ouverte derrière soi.]
```

## B13

- **Source** : commit `7bc9e9f6`, `dangers/partie-1.md`, l. 206 (page Eau froide, paragraphe « Ce qui arrive »). Le
  contexte vient des l. 204 et 208.
- **Sorte** : paragraphe qu'on lit d'un trait (page des dangers).

```text
[## {!eau-froide} Eau froide]

**Ce qui arrive.** Une chute dans l'eau froide se passe en trois temps, qu'on retient par 1, 10, 1. Pendant la première minute, le choc fait prendre une grande inspiration, puis respirer très vite : si la tête est sous l'eau à ce moment, même un bon nageur peut se noyer. On a ensuite 10 minutes de mouvements utiles, avant que les bras, les jambes et les doigts perdent leur force ; on perd conscience au bout d'environ 1 heure.

[**Comment on le reconnaît.** Dans l'eau, la personne halète la première minute, puis n'arrive plus à se tenir. Hors de l'eau, elle a les signes de l'hypothermie ({>froid}).]
```

## B14

- **Source** : commit `7bc9e9f6`, `chapitres/03-panne-majeure-d-hydro-en.md`, l. 43 à 47 (étape 1, dans la série
  orange de 15 minutes). Le contexte vient des l. 40 à 42 et 48 à 50, et de la note « En plus » des l. 584 à 589 du
  même fichier.
- **Sorte** : étape qu'on consulte (une puce d'étape, dans une série orange).

```text
[### Le courant vient de manquer {.orange 15 min}]

[1. **Regarder si les maisons voisines et les lampadaires sont éteints aussi.**]
 - Si la rue est éclairée et pas la maison, regarder d'abord le disjoncteur principal du panneau électrique. S'il est
 enclenché, le bris est à l'entrée électrique de la maison, sur l'une de ces trois pièces : le mât de branchement, le
 tuyau de métal qui sort du toit ou monte le long du mur ; le col-de-cygne, le capuchon recourbé au bout du mât, par
 où sortent les fils ; le support d'isolateurs, où s'attache le câble qui vient du poteau. Vu de la rue, un mât
 arraché par la glace penche, ou le câble qui y entre pend.
[ - Hydro-Québec ne répare pas ces pièces, et elle ne rebranche pas la maison tant qu'elles ne sont pas réparées. Dès
 qu'on voit le mât brisé, prévoir une longue panne : vidanger (étapes 21 à 25) et décider du départ (étape 11).
 - {!electrocution} Dehors, rester loin de tout fil tombé, et de tout ce qu'il touche.]

[À la fin du chapitre, dans « En plus » :]

[### Reconnaître le mât de branchement

![Un mât de branchement qui sort d'un toit : en haut, le col-de-cygne ; plus bas, l'isolateur qui retient le câble du poteau](images/extras/03-mat-de-branchement.jpg)

Le mât monte à travers le toit, comme ici, ou le long du mur. Les fils de la maison sortent par le col-de-cygne, en
haut, et font une boucle avant de rejoindre le câble de la rue, retenu plus bas par un isolateur (étape 1).]
```

## B15

- **Source** : commit `7bc9e9f6`, `chapitres/68-salaison-a-sec.md`, l. 93 à 95 (étape 1). Le contexte vient des
  l. 91 et 97 à 100.
- **Sorte** : étape qu'on consulte (étape numérotée de la procédure).

```text
[### 5.1 Avant de sortir le sel]

**1. Vérifier la porte d'entrée.** La pièce vient d'une bête refroidie à **7 °C dans les
24 premières heures**. Si on ne peut pas l'affirmer, c'est non : la pièce
va au ch. 78 ou à la poêle, pas au sel. Le sel n'assainit pas, il arrête.

[**2. Choisir la pièce.** Muscles entiers, séparés proprement à la membrane (ch. 63, 64, 65),
sans caillot, sans esquille d'os, sans plaie de balle ni tissu meurtri. Un hématome au centre
d'une pièce est de l'eau, du sang et un abri contre le sel. Il se taille au couteau et il se
jette (ch. 23).]
```

## B16

- **Source** : commit `7bc9e9f6`, `chapitres/95-jardin-nordique.md`, l. 11 à 15 (section 1, au complet ; chapitre du
  tome 5 pas encore refait).
- **Sorte** : paragraphe qu'on lit d'un trait (section 1, « En une ligne »).

```text
[## 1. En une ligne]

Un jardin nordique convertit une trouée de forêt, une saison d'environ 120 jours sans gel sur
la côte — du 25 mai au 27 septembre en moyenne à Sept-Îles, et une trouée de l'intérieur ne suit
pas forcément la station — et beaucoup d'eau portée à la main en légumes qui, eux, ne
se gardent pas tout seuls : le jardin ne conserve rien — il produit ce que le caveau (ch. 79), la
fermentation (ch. 80) et la conserve (ch. 78) tiennent ensuite jusqu'au printemps.
```
