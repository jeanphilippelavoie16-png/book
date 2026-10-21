# Chapitre 86 — L'électricité du chalet et le froid mécanique

*Tome 5 — La forêt, le jardin et le chalet*

---

**Chalet.** Au village, le courant vient d'Hydro et la panne se traverse avec une génératrice
dans la cour (ch. 3). Au chalet, il n'y a pas de ligne : le banc de batteries est le réseau, et
c'est là que finit tout événement qui dure (ch. 2). Ce chapitre dimensionne cette installation
et le congélateur qu'elle porte. Deux choses servent aussi à la maison : le calcul du
congélateur selon la température de la pièce (étape 2), et la règle de grouper dans chaque bloc
de génératrice tout ce qui attend du courant (étape 26).

## 1. En une ligne

Un congélateur coffre posé dans la remise non chauffée tient la viande presque toute l'année
sur quelques centaines de watts de panneaux dressés à 60° et un banc gardé au chaud, parce que
sa consommation baisse avec le soleil, alors que le même coffre posé dans la cuisine vide ce
banc presque tous les jours de décembre.

## 2. Quand l'utiliser

**C'est le bon choix quand :**

- La famille est montée au chalet pour de bon et qu'il y a de la viande à tenir d'avril à
  novembre, les mois où l'air du dehors ne le fait pas (ch. 73). De décembre à mars, l'air fait
  l'essentiel du travail gratuitement, et le congélateur n'est plus qu'un appoint.
- Un coin dégagé au sud voit le soleil de midi en décembre. Le 21 décembre, à la latitude de
  Sept-Îles, le soleil de midi n'est qu'à 16° au-dessus de l'horizon : un arbre de 10 m jette une
  ombre de 34 m. Le matin et l'après-midi, il est plus bas encore (étape 15). Un panneau derrière
  une rangée d'épinettes ne produit rien du mois.
- Un ruisseau descend d'au moins un mètre près du chalet. C'est la seule source qui produit la
  nuit sans vent ni essence. En décembre, un petit ruisseau avec quelques mètres de pente bat un
  champ entier de panneaux, mais seulement monté pour l'hiver, conduite enfouie et roue à
  l'abri, et compté sur son débit du creux de l'hiver (section 9 C).

**C'est un mauvais choix quand :**

- **Le coffre est dans la pièce chauffée.** À 20 °C autour de lui, il consomme deux fois et
  demie ce qu'il consomme dans une remise en novembre, et cinq fois en décembre. Ce n'est pas un
  détail d'installation : c'est la différence entre un banc qui passe l'hiver et un banc vide
  85 jours sur 100 en décembre.
- **L'onduleur reste allumé jour et nuit pour un compresseur qui tourne deux heures.** Un
  onduleur mange à vide de 6,5 à 10 W selon sa taille, soit 150 à 240 Wh par jour. En décembre,
  c'est plus que ce que demande le coffre de la remise.
- **On compte sur le soleil seul pour la pire semaine.** Sur onze hivers, la pire suite de sept
  jours a donné le septième de la moyenne de décembre. La réserve de ces jours-là — le banc, la
  génératrice ou le froid du dehors — se décide avant, pas pendant.
- **Le banc au plomb est dans la remise en janvier.** Il n'y rend plus que la moitié de sa
  capacité, et à -35 °C une batterie à 62 % gèle déjà : on la garde au-dessus de 85 %. Ce qui
  reste d'utilisable fait moins du dixième de l'étiquette.
- **Le banc au lithium est dans un bâtiment qui descend sous 5 °C la nuit.** Chargé sous le
  seuil de sa fiche, +5 °C pour celle qu'on a lue, il s'abîme pour de bon. Avec un système de
  gestion qui coupe la charge au froid, le soleil du matin passe pendant que la batterie dit non ;
  sans cette coupure, elle dit oui, et c'est pire (section 7).
- **Le banc est fait de batteries de démarrage.** Elles sont faites pour se vider trois secondes
  et se remplir tout de suite (ch. 85). En décharges profondes répétées, elles meurent bien
  avant leur heure.

## 3. Pourquoi ça marche

**Un congélateur consomme en proportion de l'écart entre ses -18 °C et l'air qui l'entoure** :
dans la remise, il consomme le moins quand le soleil donne le moins.

**Le froid attaque le plomb par trois bouts qui s'enchaînent** : moins de capacité, une charge
incomplète parce qu'une batterie froide demande plus de tension, puis le gel : l'électrolyte
d'une batterie pleine est de l'acide, celui d'une batterie vide presque de l'eau. Le lithium se
décharge au froid, mais s'abîme pour de bon s'il charge sous le seuil de sa fiche.

**Chaque conversion coûte, le plomb surtout quand il est presque plein**, là où l'hiver le
garde. Une génératrice rend plus par litre quand elle travaille fort, d'où les blocs groupés.

## 4. Matériel

- **Thermomètre min-max** — son maximum dit si le coffre a passé -18 °C la nuit (→ ch. 74 : pièce sur la glace).
- **Banc de batteries à décharge profonde** — stocke le soleil pour la nuit ; une batterie de démarrage y meurt vite.
- **Contrôleur de charge à sonde** — coupe le panneau avant que la batterie bouille ; sonde collée à la batterie (→ §9 A).
- **Onduleur à onde sinusoïdale pure** — fait le 120 V du compresseur ; sa pointe doit dépasser trois fois son courant de marche.
- **Voltmètre** — lit l'état de charge au repos et fait le contrôleur quand il manque ; plomb ouvert : aussi le densimètre[^1].
- **Fusible au positif, près de la borne** — sans lui, un câble qui touche la masse fond dans le mur.
- **Avertisseur de CO à pile, affichage en ppm** — le monoxyde n'a ni odeur ni couleur ; un par bâtiment chauffé.

## 5. Procédure

### 5.1 Faire le bilan en wattheures par jour

1. **Lister ce qui tire sur le banc, un appareil à la fois.** L'éclairage se mesure point par
   point comme au ch. 85. La radio a son propre banc et n'entre pas dans ce compte (ch. 14,
   étape 20).

2. **Le coffre : partir de l'étiquette, corriger pour l'endroit.** L'étiquette donne des
   kilowattheures par an mesurés à 32 °C ; divisés par 365, c'est la journée d'un coffre dans une
   pièce à 32 °C. Un coffre moyen vendu au Canada est à 288 kWh par an, soit 0,79 kWh par jour.
   Multiplier par l'écart réel (température de l'air autour, plus 18) et diviser par 50. Pour un
   coffre moyen, avec la température moyenne du mois à Sept-Îles comme température de la remise :

   | Mois | Coffre dans la remise (kWh/j) | Même coffre dans le chalet à 20 °C (kWh/j) | 400 W de panneaux à 60° produisent (kWh/j, avant les pertes du contrôleur et de la batterie) |
   | --- | --- | --- | --- |
   | Janvier | 0,04 | 0,60 | 0,69 |
   | Février | 0,07 | 0,60 | 1,04 |
   | Mars | 0,18 | 0,60 | 1,37 |
   | Avril | 0,29 | 0,60 | 1,52 |
   | Mai | 0,38 | 0,60 | 1,49 |
   | Juin | 0,47 | 0,60 | 1,42 |
   | Juillet | 0,52 | 0,60 | 1,44 |
   | Août | 0,51 | 0,60 | 1,37 |
   | Septembre | 0,44 | 0,60 | 1,26 |
   | Octobre | 0,34 | 0,60 | 1,00 |
   | Novembre | 0,24 | 0,60 | 0,69 |
   | Décembre | 0,12 | 0,60 | 0,54 |

   C'est un calcul, pas une mesure : il ignore les ouvertures, le soleil sur la remise, la
   viande tiède qu'on rentre. Il donne l'ordre de grandeur, et c'est l'ordre de grandeur qui
   décide où va le coffre. La dernière colonne est ce que les panneaux produisent ; ce qui
   ressort de la batterie est d'environ le quart de moins (étape 17).

3. **Mesurer le vrai chiffre, une journée.** Wattmètre entre la prise et le coffre, 24 heures,
   sans ouvrir. Ce chiffre remplace le tableau pour ce coffre-là, à cette saison-là. Il s'écrit
   au feutre sur le couvercle, avec le mois.

4. **Ajouter l'onduleur.** À vide, de l'ordre de 6,5 W pour un appareil de 800 VA et de 10 W
   pour un de 1 200 VA ; celui qu'on a donne le sien sur sa fiche. S'il reste allumé, de 156 à
   240 Wh par jour. En marche, 10 % de pertes au mieux : diviser la consommation du coffre par
   0,9. Certains onduleurs ont un mode économie, à 1 W sur la fiche lue : sous quelques watts de
   charge, l'onduleur s'endort, sonde sa sortie par une impulsion toutes les deux ou trois
   secondes, et repart dès qu'un appareil tire plus que son seuil. Le compresseur qui démarre
   quand le thermostat ferme en est un, et le mode économie remplace alors l'interrupteur qu'on
   actionne à la main entre les blocs. Un appareil qui tire plus que le seuil même au repos —
   afficheur, commande électronique, lampe — le garde éveillé jour et nuit. La journée au
   wattmètre de l'étape 3, onduleur en mode économie, dit si le coffre qu'on a tient -18 °C ainsi.

5. **Additionner.** Novembre, coffre dans la remise : éclairage 60 Wh (quatre points de 3 W,
   cinq heures), coffre 240 Wh ÷ 0,9 = 267 Wh, onduleur allumé seulement pendant les blocs du
   compresseur, quatre heures à 6,5 W = 26 Wh. Total : environ 350 Wh par jour. Décembre, même
   installation : environ 220 Wh. Le même mois de novembre avec le coffre à la cuisine et
   l'onduleur allumé jour et nuit : 60 + 667 + 156, près de 900 Wh.

### 5.2 Placer le coffre

6. **Dans la remise, pas dans le chalet.** Côté nord ou à l'ombre, posé sur des madriers qui
   laissent passer l'air dessous, à quelques centimètres des murs pour que le condenseur respire.
   Une remise au soleil de mars fait un four (ch. 73).

7. **Lire la plage de température du coffre dans son manuel.** Les coffres vendus pour le garage
   sont annoncés jusqu'à -17 °C d'air ambiant. Un coffre ordinaire a sa propre plage, écrite dans
   son manuel ; elle s'écrit au feutre sur le couvercle. Sous sa plage, le compresseur peine ou
   s'arrête en croyant avoir assez froid. Sans manuel, le min-max du coffre le dit : un maximum
   qui remonte au-dessus de -18 °C alors que la remise est plus froide que ça.

8. **Sous la plage du coffre, débrancher** : -17 °C dans la remise pour un coffre de garage,
   à la limite de son manuel pour un coffre ordinaire. Le coffre plein devient la cache du ch. 73, et c'est la
   meilleure qu'on ait. Rebrancher quand le thermomètre du coffre remonte vers -18 °C.
   En janvier, le maximum quotidien moyen tourne autour de -10 °C : la remise ne tient pas -18 °C
   toute la journée, mais un coffre plein et fermé traverse une journée douce sur sa propre
   glace. Au pire, il glisse au Cas 2 du ch. 74 : gelé, sans tenir la consigne.

9. **Refroidir la viande avant de la rentrer.** Un quartier tiède fait tourner le compresseur
   des heures et réchauffe les paquets voisins. La viande se refroidit à l'air de la nuit
   (ch. 73), ou elle entre pendant un bloc de génératrice (étape 26), jamais sur le banc un soir
   gris.

10. **Combler les vides de cruches d'eau** (ch. 74, étape 32). Un coffre plein est sa propre
    réserve.

11. **L'été, un coffre fait aussi un bon réfrigérateur.** Un thermostat extérieur branché entre
    la prise et lui le fait tourner en réfrigérateur, et il garde son froid à l'ouverture comme le
    congélateur. Dans une pièce à 20 °C, il travaille sur un écart d'environ 17 °C au lieu de 38 :
    moins de la moitié d'un congélateur. Le thermostat coupe et repart avec un écart propre à
    l'appareil : réglable au degré près sur un thermostat électronique, plus large sur un
    mécanique. On le règle serré s'il se règle ; c'est le haut de cet écart qui compte, pas le
    chiffre du bouton. S'il a un délai contre les redémarrages rapprochés, on le met à quelques
    minutes : un compresseur qui repart aussitôt arrêté démarre dur et fait sauter sa protection.
    On le règle pour que le **maximum** du min-max
    reste sous 3 °C, et on le vérifie chaque matin. Au-dessus, le botulisme de type E produit sa
    toxine dans un sac de poisson fermé, sans oxygène, et il ne change ni l'odeur, ni le goût,
    ni l'apparence. Le poisson n'y dort pas en sac fermé : emballage qui respire, la semaine pour
    le frais, 14 jours au plus pour le fumé (ch. 75, étape 29 et §8) ; au-delà, le congélateur,
    le sel ou la fumée (ch. 77).

### 5.3 Monter les panneaux

12. **Viser le sud vrai.** Sur la Côte-Nord, l'aiguille de la boussole pointe environ 17° à
    l'ouest du nord vrai : le sud vrai se lit à 197° au cadran, pas à 180°. Sans boussole,
    l'ombre la plus courte de la journée le donne (section 9).

13. **Incliner à 60°, ou plus si la neige est l'ennemie.** À 60°, le panneau perd 5 % de son
    année par rapport à l'inclinaison qui rend le plus, et produit près de trois fois plus qu'à
    plat en décembre. À 75°, décembre est pareil et l'été perd davantage. À la verticale, sur le
    mur sud, décembre ne perd presque rien et la neige ne reste pas.

14. **Le bord bas au-dessus de la plus haute neige probable, et aucun rebord en bas.** À
    Sept-Îles, la neige au sol fait en moyenne un demi-mètre en février, mais les plus hauts
    relevés passent 2 m : 224 cm en janvier, 216 en février. S'y ajoute le tas que fait au pied
    la neige qui glisse du panneau à 60°, et qui monte au-dessus du sol d'alentour. Un panneau
    qu'on dégage à la pelle après chaque neige peut se poser plus bas qu'un panneau laissé seul
    tout l'hiver. Un rebord retient la neige qui glisse et la regèle sur la première rangée de
    cellules.

15. **Dégager l'horizon sud, et plus bas à mesure qu'on s'écarte du sud.** Le 21 décembre, à
    midi, le soleil est à 16° plein sud, et un arbre fait de l'ombre sur trois fois et demie sa
    hauteur. Deux heures avant et après midi, il n'est plus qu'à 12°, à une trentaine de degrés
    du sud ; trois heures avant et après, à 6°, à une quarantaine de degrés. Un arbre qui reste
    sous 16° plein sud mais dépasse 12° une trentaine de degrés plus à l'est ou à l'ouest coupe
    le panneau du matin ou de l'après-midi, et la journée de décembre n'a guère que huit heures. Ce
    qui pousse dans cet arc se coupe à l'automne, pas en décembre dans la neige à la taille. La
    fumée de la cheminée ne passe pas devant non plus.

16. **Les panneaux près du banc.** Le courant d'un panneau est sur son étiquette. Pour une
    douzaine d'ampères, à 15 m du banc, il faut du câble de 25 à 35 mm² ; à 3 m, de 6 mm². Deux
    panneaux en série divisent le cuivre par quatre, mais seulement avec un contrôleur qui suit
    le point de puissance maximale[^2] et accepte la tension double. Un contrôleur ordinaire
    ramène la tension des panneaux à celle de la batterie et perd la différence : la série n'y
    gagne rien.

17. **Dimensionner le champ.** Puissance des panneaux (W) = besoin (Wh/j) ÷ (heures
    d'ensoleillement × 0,77). Le 0,77 compte les pertes du contrôleur et de la batterie. À 60°,
    à Sept-Îles : 1,49 h en décembre, 2,0 en novembre, 1,88 en janvier. Ajouter 15 à 25 % si le
    contrôleur ne suit pas le point de puissance maximale. Novembre, coffre dans la remise :
    350 ÷ (2,0 × 0,77) = 230 W. Décembre : 220 ÷ (1,49 × 0,77) = 190 W. Coffre à la cuisine,
    décembre : 770 W. Le calcul donne la moyenne ; onze hivers simulés donnent la vérité. Avec
    400 W à 60° et un banc de 2,4 kWh tiré jusqu'à la moitié, une demande de 350 Wh par jour
    laisse la batterie vide un jour sur cinq en décembre et en janvier, et presque jamais le
    reste de l'année. À 900 Wh par jour, elle est vide 85 jours sur 100 en décembre, et encore un
    jour sur dix en juillet.

### 5.4 Le banc de batteries

18. **Au chaud, dans un coffre ventilé vers dehors.** Le banc vit dans le volume chauffé, dans un
    coffre fermé côté pièce, couvercle à joint. Une bouche d'au moins 2,5 cm pour deux batteries
    de 12 V chargées doucement part du haut du coffre et traverse le mur, parce que l'hydrogène
    monte. Elle grandit en surface avec le courant : en fin de charge, presque tout le courant qui
    entre dans une batterie pleine devient du gaz. En 12 V, compter environ 9 cm² d'ouverture par
    ampère de fin de charge — un trou de 3,5 cm pour un ampère, de 7 cm pour quatre —, le double
    de surface en 24 V ; faute de connaître ce courant, 40 % du courant maximal du chargeur. Le
    chargeur de 17 A de l'étape 28 demande ainsi un trou de 9 cm. Au-delà d'un petit banc, une
    seconde bouche de même taille au bas du coffre, dehors elle aussi, fait entrer l'air que la
    première fait sortir. Dehors,
    son bout remonte au-dessus de la neige de fin février, coudé vers le bas contre la pluie, et
    se dégage comme les panneaux : la neige contre le mur la bouche, et l'air humide du coffre
    qui sort à -35 °C givre et referme un petit tuyau. Le ch. 108 veut le banc hors de toute pièce
    où l'on dort ; dans un chalet d'une seule pièce, c'est le coffre étanche côté pièce et ventilé
    dehors qui en tient lieu, adossé au mur extérieur, du côté opposé au couchage et loin du
    poêle : on ne charge ni ne manipule une batterie près d'une source de chaleur.
    **Dans le coffre, seulement les batteries, la sonde et le fusible.** L'onduleur, le
    contrôleur, le chargeur, les interrupteurs et les relais font des étincelles en coupant :
    ils restent dehors du coffre, l'onduleur vissé contre sa paroi extérieure pour garder ses
    câbles courts. Seuls les câbles traversent, par un passage bouché serré autour d'eux.
    **Avant de toucher une cosse**, la charge est arrêtée et le couvercle ouvert quelques
    minutes, pour que le gaz accumulé dessous s'en aille avant la première étincelle. L'hiver,
    le bas d'un bâtiment chauffé est en dépression par rapport au dehors : l'air chaud monte et
    fuit par le haut, et le poêle qui tire son air de la pièce creuse encore l'écart. Le coffre
    relié au dehors peut alors aspirer par sa bouche et pousser son air, hydrogène compris, vers
    la pièce par le passage des câbles ; le vent sur le mur fait la même chose. L'essai : poêle allumé,
    charge arrêtée, une bande de papier mince tenue au passage des câbles. Tirée vers la pièce,
    elle dit que le passage fuit : on le rebouche. Faute de place au chaud, un contenant enfoui
    dehors amortit les écarts de température ; il a la même bouche, qui sort au-dessus de la
    neige, et la marge de gel de l'étape 31 s'applique.

19. **Choisir la chimie selon le chauffage.** Chalet habité et chauffé tout l'hiver : plomb ou
    lithium. Chalet qui refroidit sous 5 °C la nuit : plomb, parce que le lithium n'y doit pas
    charger le matin (section 3). Le plomb ouvert coûte le moins, se vérifie au densimètre et
    dégage le plus d'hydrogène. L'AGM en dégage beaucoup moins et ne se vérifie qu'au voltmètre.
    Le lithium-fer-phosphate rend 92 % et ne se répare pas ; il ne dégage de gaz qu'abîmé,
    surchargé, ou rechargé après une décharge trop profonde.

20. **Dimensionner.** Capacité (Ah) = besoin (Wh/j) × jours de réserve ÷ (tension × 0,42). Le
    0,42 compte 85 % de rendement et une décharge limitée à la moitié, sur une batterie autour de
    20 °C. Trois jours de réserve en règle générale. Décembre, coffre dans la remise, 220 Wh par
    jour : 220 × 3 ÷ (12 × 0,42) = 130 Ah à 12 V. Même mois, coffre à la cuisine : 525 Ah. Pour la
    pire semaine, sept jours plutôt que trois, ou la génératrice (étape 32).

21. **Câbler court et gros.** La chute visée est de 0,3 V sur un système de 12 V. Jusqu'à 5 m de
    câble au total, aller et retour, la section en mm² vaut au moins les ampères divisés par 3.
    Au-delà, ampères × longueur totale en mètres ÷ 15. Un onduleur de 800 VA à pleine puissance
    tire environ 60 A à 12 V : 25 mm². La pointe du compresseur passe par les mêmes câbles, et
    c'est elle qui trouve le câble trop mince (section 7).

22. **En parallèle, le courant fait le même chemin pour chaque batterie.** Le plus pris à la
    première batterie, le moins à la dernière — en diagonale —, ou des câbles de même longueur
    jusqu'à deux barres communes. Branché au même bout, c'est la première batterie qui travaille
    et la dernière qui dort. En série, jamais des batteries d'âges ou de capacités différentes :
    la plus faible se fait vider puis surcharger à chaque cycle.

23. **Un fusible au positif, près de la borne.** Il protège le câble qui le suit : il coupe
    quand ce câble se coupe sur une tôle ou touche la masse plus loin. Il ne protège rien de ce
    qui tombe entre deux bornes. Une clé en travers des deux bornes d'une batterie, ou des bornes
    de deux batteries voisines, fait un court-circuit en amont de tout fusible : la clé rougit,
    se soude, crache du métal fondu, et l'étincelle éclate dans le coffre où dort l'hydrogène. Une
    bague ou un bracelet de montre qui touche une borne fait la même chose autour du doigt. Le
    12 V ne se sent pas sur la peau, et c'est ce qui trompe la main habituée : ce n'est pas le
    choc qui blesse, c'est le métal qui chauffe. Avant de travailler au banc, bague et montre
    enlevées, manche de la clé entouré de ruban isolant jusqu'à la tête, borne voisine couverte
    d'un chiffon épais ou d'un bout de caoutchouc. Pour du lithium, qui donne des courants de
    court-circuit énormes, un fusible dont le pouvoir de coupure dépasse le courant de
    court-circuit du banc : un fusible ordinaire peut éclater sans couper.

24. **Régler le contrôleur sur la chimie, et coller sa sonde sur une batterie.** Plomb ouvert :
    absorption de 14,1 à 14,7 V à 25 °C, maintien à 13,5 V. Au froid, la tension de charge du
    plomb monte de 0,03 V par degré sous 25 °C pour une batterie de 12 V, ouverte ou scellée : à
    0 °C, 0,75 V de plus ; à -10 °C, plus d'un volt. **Jamais pour le lithium** : cette
    correction pousserait ses éléments au-delà de la tension où son système de gestion coupe. Une
    sonde laissée au chaud sur le boîtier du contrôleur charge une batterie froide comme si elle
    était tiède : elle ne se remplit jamais, et une batterie jamais pleine est une batterie qui
    gèle.

### 5.5 La génératrice, en blocs chargés à plein

25. **Dehors, toujours.** Jamais dans un bâtiment, jamais dans un garage, jamais dans la remise
    du coffre, jamais sous un auvent ni dans un abri de toile, même pour la protéger de la neige.
    Au moins 6 m de tout bâtiment, l'échappement tourné à l'opposé des portes et des fenêtres.
    La neige se balaie sur la machine arrêtée et froide. Le mécanisme est à la section 8.

26. **Grouper dans le même bloc tout ce qui attend du courant.** Chaque bloc porte le coffre, le
    chargeur de batteries au plus fort courant que le banc accepte, et tout ce qui attendait le
    courant : la pompe, les outils, l'eau à chauffer. La génératrice à onduleur de 1 800 W prise
    en exemple rend 1,6 kWh par litre à pleine charge et 1,0 au quart : plus le bloc est chargé,
    moins le litre coûte. Quand
    il n'y a rien d'autre à brancher, le coffre seul par blocs reste le recours du ch. 74, §9.

27. **Combien d'heures pour le coffre.** Heures par jour = consommation du coffre (kWh/j) ÷
    puissance du compresseur en marche (kW), lue au wattmètre. Si le compresseur tire 100 W :
    6 heures par jour dans un chalet à 20 °C, un peu moins de 3 heures dans une remise à 0 °C, un
    peu plus d'une heure à -10 °C. Ces heures se groupent en un ou deux blocs : un coffre plein
    et fermé travaille le reste du jour sur sa glace. Le thermomètre du coffre décide, pas la montre
    (ch. 3, étape 19).

28. **Charger vite pendant le bloc, finir au soleil.** Le plomb accepte beaucoup de courant quand
    il est bas, et de moins en moins en approchant du plein ; au-dessus de 80 %, chaque litre
    rend la moitié, ou moins. La génératrice monte le banc de la moitié vers 80 %, les panneaux
    finissent. Le chargeur se choisit pour ce que le banc accepte : 10 à 13 % de sa capacité en
    ampères pour du plomb ouvert. Pour le banc de 130 Ah de l'étape 20, 13 à 17 A, soit de
    180 à 250 W environ côté batterie : avec le coffre, le bloc reste sous le quart d'une machine
    de 1 800 W. C'est une raison de plus d'y mettre la pompe, les outils et l'eau à chauffer.

29. **Le moteur froid et le carburant** sont au ch. 15 (les parts de carburant, faire partir un
    moteur gelé) et au ch. 106 (l'entretien des petits moteurs).

### 5.6 Traverser la semaine grise

30. **Avant décembre** : banc plein, panneaux dégagés après chaque neige (ch. 85), coffre dans
    la remise, cruches dans les vides.

31. **Écrire le seuil de bascule sur le coffre à batteries, au feutre.** Banc au chaud :
    génératrice quand il touche la moitié, 12,10 V au repos ou 1,172 au densimètre pour du plomb
    ouvert. Banc au froid : génératrice quand il touche 85 %, 12,56 V au repos ou 1,250 au
    densimètre, parce que c'est là que se décide le gel. Lithium : la batterie ne calcule pas
    elle-même son état de charge ; il se lit à un moniteur de batterie ajouté au banc, et la
    génératrice part à la moitié, comme le plomb au chaud. Sans moniteur, la dernière alarme est
    celle du système de gestion : sur la batterie lue, une alerte à 3,10 V par élément, 12,4 V
    pour une batterie de 12 V, puis la coupure de tout ce qui tire à 2,80 V par élément, 11,2 V,
    au moins 30 secondes plus tard. L'alerte veut dire génératrice tout de suite, pas demain. Les
    réglages de la batterie installée se lisent dans son application ou sa fiche et s'écrivent au
    feutre à côté.

32. **Compter l'essence en kilowattheures manquants.** Au quart de charge, où le bloc groupé de
    l'étape 26 amène la machine, chaque kilowattheure coûte un litre ; le plomb n'en rend que
    80 %, et un bon chargeur 93 % : environ 1,35 L par kilowattheure qui manque, davantage avec
    un vieux chargeur qui chauffe. La pire semaine, coffre dans la remise :
    sept jours à 220 Wh, 1,5 kWh, environ deux litres.
    Coffre à la cuisine : sept jours à près de 900 Wh, plus de 6 kWh, plus de huit litres. Ces
    comptes supposent une semaine sans aucun soleil.

33. **Couper dans cet ordre** : l'onduleur hors des blocs du compresseur, puis l'éclairage
    général (ch. 85, étape 25), et en dernier le coffre, qui reste une cache une fois débranché
    dans une remise froide.

### 5.7 Ce que ça change au ch. 74

34. Le tri du ch. 74 vaut au chalet tel quel. Trois choses changent. La panne se cherche d'abord
    au banc : tension, fusible, onduleur en défaut, sonde du contrôleur, neige sur le panneau. Le
    coffre de la remise est déjà dans l'air froid : l'hiver, il glisse au Cas 1 ou au Cas 2 du
    ch. 74 sans qu'on le déplace. Et les heures de génératrice que le ch. 74 laissait à mesurer
    se calculent à l'étape 27.

## 6. Points de contrôle

| Moment | Ce qu'on vérifie | Cible chiffrée | Si c'est hors cible |
| --- | --- | --- | --- |
| Chaque matin, avant que le soleil touche les panneaux, onduleur et lumières éteints depuis le coucher | Tension du banc au repos, plomb ouvert. Elle ne vaut qu'après six heures au moins sans charge ni décharge : lue le soir après une journée de soleil, elle surestime ; lue sous charge, elle sous-estime | 12,73 V plein ; 12,56 V à 85 % ; 12,50 V à 80 % ; 12,10 V à la moitié | Sous le seuil écrit sur le coffre à batteries : bloc de génératrice aujourd'hui |
| Avant une nuit sous -25 °C, banc non chauffé | État de charge, au densimètre : il se lit le soir, la tension non | 85 % ou plus, soit 1,250 : gel vers -52 °C | À 62 %, soit 1,200, le gel est à -27 °C. Charger ce soir, ou rentrer le banc |
| Chaque semaine, plomb ouvert | Densité de chaque élément. L'acide aux yeux se rince au moins 30 minutes (ch. 108, §8) | 1,277 plein. Toutes sous 1,235 : sous-chargé. Plus de 0,030 d'écart entre éléments : à égaliser | Charge complète au prochain soleil ou bloc. L'écart : égalisation, plomb ouvert seulement, 16,2 V au contrôleur ou au chargeur jusqu'à ce que la densité cesse de monter ; ça bout, couvercle du coffre ouvert, aucune étincelle. L'écart qui reste après : batterie qui finit |
| À chaque lecture de densité | Température de l'électrolyte | Retrancher 0,004 par tranche de 5 °C sous 27 °C | — |
| Chaque matin, toute l'année | Thermomètre min-max du coffre | Branché en congélateur : maximum à -18 °C ou moins. Débranché en cache l'hiver : gelé dur, le Cas 2 du ch. 74 est accepté (étape 8). En réfrigérateur : maximum sous 3 °C (étape 11) | Ch. 74. Au-dessus de 3 °C avec du poisson dedans : section 8, point 3 |
| Chaque matin, hiver | Thermomètre de la remise | Dans la plage du coffre | Sous -17 °C, ou sous la plage du manuel : débrancher (étape 8) |
| Après chaque neige et chaque grand froid | Bouche du coffre à batteries, dehors | Dégagée, sans givre | À la pelle et à la main, tout de suite : une bouche bouchée ne ventile plus rien (étape 18) |
| Après chaque neige | Panneaux | Surface dégagée au complet | Balai (ch. 85). Un panneau couvert produit zéro |
| Chaque bloc de génératrice | Distance au bâtiment | 6 m au moins, échappement à l'opposé des ouvertures | Déplacer la machine, jamais la rapprocher |
| Chaque bloc de génératrice | Avertisseur de CO du chalet | 0 ppm | Arrêter la machine, sortir, chercher d'où ça vient |
| Démarrage du compresseur sur l'onduleur | Tension au banc pendant la pointe | L'onduleur ne coupe pas | Section 7 |
| Après une heure de charge ou d'onduleur | Cosses, à la main, bague et montre enlevées (étape 23) | Froides | Tiède : cosse mal serrée, corrodée ou mal sertie, à refaire |
| À l'installation, puis chaque automne | Sonde du contrôleur | Collée à une batterie du banc | La déplacer |

## 7. Signes d'échec

| Observation | Diagnostic | Action |
| --- | --- | --- |
| Bac bombé, fendu, ondulé, givre sur le dessus | Batterie gelée, donc laissée déchargée au froid | Ne jamais la charger ni la survolter : elle peut exploser. Hors du circuit, au rebut. Elle dit que le banc a été laissé bas (fermeture d'automne : ch. 84, étape 24) |
| Une batterie tiède ou chaude au toucher, seule dans le banc | Un élément en court-circuit : elle prend le courant de toutes les autres, chauffe, bout et dégage de l'hydrogène | Hors du circuit tout de suite, charge arrêtée, couvercle ouvert (étape 18) |
| L'onduleur coupe à chaque démarrage du compresseur, et le coffre ne refroidit jamais | La pointe, souvent trois fois le courant de marche et parfois plus, fait tomber la tension sous le seuil de l'onduleur : câbles minces ou longs, banc bas ou froid, onduleur trop petit | Câbles plus gros et plus courts, banc chargé, onduleur plus gros. Rallonger un fil mince n'y fait rien |
| Sur un onduleur bon marché, le coffre consomme nettement plus que le tableau de l'étape 2, ou peine à descendre | Onde modifiée[^3], pas sinusoïdale : le compresseur y tourne mal | Onduleur à onde pure, ou génératrice branchée directement |
| Le contrôleur affiche « charge » tout l'hiver et le banc n'atteint jamais l'absorption | Sonde au chaud, panneaux trop petits ou ombragés, banc froid qui demande plus | Sonde sur la batterie ; bloc de génératrice jusqu'à 80 % ; dégager l'horizon sud |
| Lithium : panneaux au soleil, courant de charge nul le matin | Batterie sous le seuil de sa fiche, le système de gestion coupe la charge | Réchauffer le coffre à batteries ou déplacer le banc. Ce n'est pas une panne |
| Lithium : un matin froid, le courant de charge entre quand même | Pas de coupure au froid, ou coupure réglée trop bas : la batterie s'abîme pour de bon | Débrancher les sources ; ne charger qu'au-dessus du seuil, à la main (section 3) |
| Le coffre de la remise tourne sans arrêt sans descendre, ou ne repart plus | Remise sous la plage du compresseur, ou joint qui fuit | Débrancher : cache du ch. 73. Le joint : ch. 74, §9 |
| Tension correcte à vide, effondrement dès qu'on branche une charge | Batterie sulfatée ou en fin de vie (ch. 85) | La sortir du banc : une batterie morte en parallèle vide les autres |
| Les batteries d'un même banc ne finissent pas à la même tension | Câbles inégaux, branchement au même bout, ou une batterie qui finit | Recâbler en diagonale ; tester chaque batterie seule |
| Coffre arrêté dans la remise au printemps, poisson dedans | Remontée possible au-dessus de 3 °C sans que rien ne paraisse | Ch. 74, et l'encadré ci-dessous |

## 8. Danger

> ### ⚠ DANGER
>
> **1. La génératrice, le camion et le petit moteur ne tournent jamais dans un bâtiment, un
> garage ou sous un auvent.** Ni dans la remise du coffre, ni dans un abri de toile, ni « juste
> pour la nuit » sous la galerie parce qu'il neige. Au moins 6 m de tout bâtiment,
> l'échappement à l'opposé des portes et des fenêtres. Le monoxyde de carbone n'a ni odeur ni
> couleur, et il prend dans le sang la place de l'oxygène : le sang circule encore et ne
> transporte plus rien. Les premiers signes — mal de tête, fatigue, nausée — sont exactement ceux
> d'une semaine grise au chalet, donc ils n'avertissent personne. On s'endort au lieu de sortir.
> Chez un enfant, ça ressemble à de la fatigue ou à du mauvais caractère, et un parent attentif
> conclut au caractère. Le camion qui recharge le banc au ralenti est un moteur comme les
> autres : un tuyau d'échappement pris dans la neige renvoie le gaz dans la cabine, et personne
> n'attend dedans pour se réchauffer. L'avertisseur à pile est le seul organe qui voie le gaz
> venir.
>
> **2. Un banc au plomb qui charge dégage de l'hydrogène, et l'hydrogène explose sur presque
> toute sa plage.** Il s'enflamme entre 4,1 % et 72 % dans l'air : il n'existe presque pas de
> mélange trop riche pour brûler. Il est léger, il monte, il s'accumule sous le couvercle d'un
> coffre fermé. L'étincelle vient d'un interrupteur, d'un relais, d'une cosse qu'on serre, d'une
> clé ou d'une bague tombée en travers de deux bornes, de la dernière connexion d'un câble de
> survoltage. D'où la bouche en haut du coffre, vers dehors, rien qui coupe le courant dans le
> coffre, le couvercle ouvert avant de toucher une cosse, et la dernière connexion faite loin de
> la batterie (étapes 18 et 23). **Une batterie gelée ne se charge pas et ne se survolte pas** :
> c'est exactement la combinaison — froid, batterie déchargée, survoltage — qui a projeté de
> l'acide et des éclats de plastique au visage d'un bûcheron.
>
> **3. Le congélateur électrique lâche sans bruit, et le poisson ne prévient pas.** Un fusible,
> un onduleur en défaut, un banc vidé par une semaine grise, un compresseur hors de sa plage :
> dans la remise, personne n'entend rien. Le botulisme de type E produit sa toxine dès 3 °C, et
> le sac d'omble de fontaine (truite mouchetée) bien fermé est justement le milieu sans oxygène
> où il travaille. Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence. Le thermomètre
> min-max du coffre se lit chaque matin, toute l'année ; un coffre trouvé au-dessus de 3 °C avec du poisson dedans relève du ch. 74,
> et on ne goûte pas pour décider.

## 9. Variante d'urgence

**Sans chargeur, sans contrôleur, sans onduleur, sans essence achetée pour ça.** Tout ce qui
tourne sur le terrain peut charger une batterie, à condition de lui donner la bonne vitesse : un
aimant qui passe devant une bobine fait du courant, que ce soit dans un alternateur de camion,
un moteur de tapis roulant ou une génératrice. Et quand le contrôleur manque, c'est le lecteur
qui le devient, au voltmètre : il branche, il lit, il débranche à la tension d'absorption.

**L'ordre, le jour où le chargeur ou la génératrice manque.** D'abord le panneau branché direct,
qui ne coûte rien. Ensuite la prise 12 V de la génératrice ou le petit moteur attelé à un
alternateur, qui coûtent de l'essence. Le camion en dernier, parce qu'il en brûle le plus et
qu'il faut qu'il reparte. Le ruisseau est le chantier de la saison qui vient, pas celui de la
soirée : il se mesure l'été et se bâtit avant les glaces. Le vent ne vaut le chantier que sur un
site exposé.

### A. Charger une batterie sans chargeur

**Avant de brancher quoi que ce soit, deux vérifications.**

- **Elle n'a pas gelé.** Une batterie qui a attendu basse au froid a pu geler : à 20 %, elle gèle
  à -7 °C. Bac bombé ou fendu, parois ondulées, givre sur le dessus, et pour le plomb
  ouvert, de la glace ou une bouillie qu'on voit en ouvrant un bouchon : on ne la branche nulle
  part, ni au camion, ni au banc, ni derrière l'ampoule (section 8, point 2). Intacte mais restée
  dehors, elle rentre d'abord dans la pièce, loin du poêle, et dégèle avant qu'on la branche
  (ch. 84, §9).
- **La tension est la même des deux bords.** Tout ce qui suit branche une batterie de 12 V sur
  une source de 12 V : un camion, une autre batterie, la prise de la génératrice. Une batterie de
  6 V seule, branchée sur un circuit de 12 V que l'alternateur tient vers 14 V, prend un courant
  que rien ne limite : elle bout, dégage son hydrogène à côté du moteur, et le câble chauffe. Un
  banc de 6 V se charge par paires, chaque paire restée câblée en série et portée ensemble.

**Au camion.** Un alternateur d'auto ne donne rien sous environ 1 000 tr/min à son arbre, une
partie seulement de son courant au ralenti du moteur, et son courant plein vers 6 000 tr/min.
Quand sa plaque porte deux intensités, comme « 40-70 A », la première est celle d'un régime
proche du ralenti. Une cale sur l'accélérateur, qui tient le moteur au-dessus du ralenti, fait
donc monter le courant. Le camion reste à 6 m du chalet : plutôt que de tirer des câbles minces
sur cette distance, on porte la batterie au camion, une de 12 V ou une paire de 6 V à la fois,
et on la branche en parallèle sur la sienne avec des câbles courts. Une batterie qui charge
monte en état de charge, donc son point de gel descend à mesure : c'est pour ça qu'on la charge,
une fois qu'on l'a vue intacte. Le prix est dans le réservoir : au ralenti, un moteur de 3 L
brûle 1,8 L à l'heure, un moteur de 5 L, 3 L à l'heure — quatre à sept fois ce que brûle une
génératrice de 1 800 W au quart de charge. Le camion est la charge de dernier recours, pas celle de tous les jours.

**À la prise 12 V de la génératrice.** Quand la génératrice en a une, elle sert à ça ; celle de
l'exemple donne 8,3 A. Cinq heures, une quarantaine d'ampères-heures : deux journées de décembre
du coffre dans la remise. Cette prise n'est pas régulée comme un chargeur : le voltmètre décide
de l'arrêt.

**Le panneau branché direct sur la batterie.** Une étiquette de panneau « de 12 V » porte
typiquement autour de 20 V à vide. Branché sur une batterie, il est tenu vers le bas tant
qu'elle se remplit, puis la tension grimpe au-delà de l'absorption, et la batterie bout et perd
son eau. Le lecteur fait le contrôleur : il branche le matin, lit, et débranche quand la
batterie atteint 14,1 à 14,7 V en charge. Au froid, pour le plomb seulement, ce seuil monte :
0,75 V de plus à 0 °C, plus d'un volt à -10 °C (étape 24). Pour le lithium, la tension de sa
fiche, sans correction, et jamais sous le seuil de température de la section 3. La fréquence
des lectures suit le rapport entre le champ et le banc. En décembre, deux lectures, à midi et
au milieu de l'après-midi, suffisent. Au printemps et en été, 400 W de panneaux poussent plus
de 20 A en plein soleil dans un banc de 130 Ah qui n'en veut que 13 à 17 (étape 28) : à
l'approche du plein, on lit toutes les heures, ou on ne branche qu'une partie du champ. La
nuit, le panneau se débranche : sans diode antiretour, il laisse la batterie se vider à l'envers
dans le noir. Ce qu'on perd : les lectures de la journée, et de l'eau dans le plomb ouvert si on
les manque.

**Le chargeur mort.** Quand un vieux chargeur meurt par sa petite électronique ou son redresseur,
son transformateur, lui, est encore bon, et déjà à la bonne tension. Le redresseur se refait
avec les diodes d'un alternateur de ferraille, montées sur deux plaques : trois sur la plaque
positive, trois sur la négative, et trois bornes de phase. Tout dépend du nombre de fils qui
sortent du secondaire, le côté basse tension du transformateur, aux fils les plus gros.

- **Deux fils** : un pont de quatre diodes. Chaque fil va à une borne de phase, deux des trois
  bornes seulement ; la plaque positive va au positif de la batterie, la négative au négatif.
- **Trois fils**, celui du milieu étant un point milieu : deux diodes suffisent. Les deux fils
  des bouts vont à deux bornes de phase, la plaque positive au positif de la batterie, et le fil
  du milieu directement au négatif. La plaque négative reste en l'air, rien n'y est branché.
  Brancher un pont de quatre diodes aux deux bouts d'un tel secondaire double la tension, et
  elle arrive sans aucune régulation dans la batterie.

Avant de brancher la batterie, on lit la tension à vide au voltmètre : elle doit être du même
ordre que celle d'une batterie en charge. Le double, c'est le mauvais montage. Côté 120 V, les
connexions restent dans le boîtier d'origine, isolées avant qu'on branche le cordon, et le fil
de terre du cordon reste vissé au boîtier de métal : un fil du primaire qui touche le boîtier
fait alors sauter le fusible au lieu de mettre le boîtier sous tension. Le fusible reste. On ne
touche pas au primaire tant que le cordon est dans la prise. Il n'y a plus de coupure
automatique : le voltmètre, encore.

**L'ampoule de phare en série.** Pour brancher une batterie très basse sur une source forte — le
camion, surtout —, une ampoule de phare de 12 V en série plafonne le courant à ce qu'elle tire
allumée à pleine tension : ses watts divisés par 12, un peu plus de 4 A pour une ampoule de 55 W.
C'est un plafond, pas le courant de charge. L'ampoule ne voit que l'écart entre la source et la
batterie, deux ou trois volts au camion, et le courant réel n'en est qu'une fraction : la charge
prend des jours, pas des heures. Elle brille quand la batterie est creuse, et pâlit à mesure
qu'elle se remplit : c'est un ampèremètre qu'on lit de l'autre bout de la pièce. Elle réduit
aussi l'étincelle d'une connexion franche sur une batterie creuse. Elle se pose hors du coffre
et loin de la batterie qui charge : elle chauffe, et une batterie qui charge dégage de
l'hydrogène. Sur une autre batterie comme source, même pleine, l'écart est plus petit encore, et
le montage finit comme le paragraphe suivant.

**Deux batteries.** Une batterie pleine branchée en parallèle sur une vide, de même tension, lui
donne jusqu'à ce que les deux aient la même tension, pas plus. On se retrouve avec deux batteries
à moitié : utile pour démarrer, inutile pour remplir. Les batteries des véhicules comme réserve
de courant du terrain sont au ch. 3, section 7.

### B. Le petit moteur et l'alternateur d'auto : un chargeur à essence

Le moteur de la tondeuse, de la souffleuse, ou celui d'une génératrice dont la tête a brûlé, fait
tourner un alternateur d'auto par une courroie. Un alternateur à régulateur intégré sort déjà
14 V régulés : c'est un chargeur tout fait, sans onduleur et sans chargeur 120 V entre les deux.

- **Le bon alternateur.** Celui d'un véhicule plus ancien, à régulateur intégré, dont la fiche
  porte une borne de témoin de charge — marquée L, D+, IND, 15, 61, R ou 1 — et souvent une
  borne S, qui se branche sur la batterie : sans elle, il charge mal. Une borne marquée C, COM,
  LIN, BSS, RC, SIG ou RLO dit un alternateur commandé par l'ordinateur du véhicule. Monté seul,
  un tel alternateur ne produit rien, ou part de lui-même à une tension réglée en usine, entre
  13,5 et 15 V, une fois passé 3 000 à 4 000 tr/min ; rien ne les distingue de l'extérieur.
  L'essai tranche : entraîné vite, voltmètre sur la batterie ; une tension qui monte au-dessus
  de celle de la batterie au repos dit qu'il charge. Une borne DFM, FR, DF, M ou LI ne commande
  rien : elle renseigne l'ordinateur.
- **Le rapport de poulies.** L'alternateur donne tout son courant vers 6 000 tr/min. Si la plaque
  du moteur dit 3 600 tr/min, une poulie de moteur 1,7 fois plus grande que celle de
  l'alternateur l'y amène. Mais un alternateur de 70 A pousse dans un banc bas bien plus que les
  10 à 13 % de sa capacité que demande l'étape 28 : un banc de 130 Ah n'en veut que 13 à 17. Pour
  un petit banc, on vise un régime plus bas, des poulies de même diamètre ou presque, et le
  voltmètre coupe à l'absorption. Une courroie du même profil que la poulie de l'alternateur :
  en V sur une poulie en V, à nervures sur une poulie à nervures. Une poulie récupérée, deux
  arbres alignés au fil tendu.
- **L'excitation.** L'alternateur ne part pas seul : il lui faut un peu de courant de la batterie
  dans son rotor pour commencer à produire. C'est le fil du témoin de charge du tableau de bord.
  Il se branche au positif de la batterie à travers une ampoule témoin et un interrupteur. On
  ouvre l'interrupteur à l'arrêt, sinon le rotor vide la batterie pendant la nuit.
- **La place.** Dehors, à 6 m, l'échappement à l'opposé des ouvertures, comme n'importe quel
  moteur (section 8).

Ce qu'on perd : le rendement de cet assemblage n'est pas chiffré ici, la courroie s'use et se
désaligne, et le bruit est celui d'une tondeuse pendant des heures.

### C. Le courant du ruisseau

C'est la source que personne ne regarde, et en décembre, c'est la meilleure, à une condition :
qu'elle soit montée pour l'hiver, conduite enfouie, prise sous la glace, roue à cuillers et
dynamo à l'abri (plus bas, « L'hiver »), et comptée sur le débit du creux de l'hiver. Un
ruisseau qui remplit encore au milieu de l'hiver une chaudière de 20 L en 4 secondes, soit
5 L/s, et qui descend de 4 m entre la prise et la roue, donne environ 100 W, jour et nuit :
2,4 kWh par jour, plus que 1 000 W de panneaux en décembre. Monté l'été avec une roue à augets à l'air libre, le
même ruisseau ne donne rien de janvier à mars.

**Mesurer d'abord, en basse saison.** Dans le nord du Québec, les petits ruisseaux sont au plus
bas au milieu de l'hiver et au plus haut au printemps. La mesure qui compte est celle de la fin
de l'hiver, ou celle d'une fin d'été sèche.

1. **Le débit, au seau.** Un petit barrage de planches ou de pierres envoie tout le ruisseau dans
   une goulotte, la goulotte dans la chaudière. Litres par seconde = 20 ÷ secondes pour remplir.
   Au-delà d'une chaudière en quelques secondes, un baril de 200 L.
2. **La hauteur de chute, au boyau.** Un boyau transparent plein d'eau, un bout tenu à la surface
   de l'eau à l'endroit de la future prise ; on lève l'autre bout, plus bas, jusqu'à ce que l'eau
   cesse de couler. La hauteur entre ce bout et la surface de l'eau à cet endroit, c'est la chute
   de ce tronçon. On recommence de tronçon en tronçon jusqu'à la roue, on additionne, et on
   retranche 2 à 5 cm par mesure, parce que l'eau pousse encore un peu dans le boyau. Plus rapide
   avec un manomètre au bas d'un boyau plein : 9,8 kPa par mètre de chute, soit environ 1 m par
   10 kPa (0,7 m par livre au pouce carré, si la jauge à pneus n'a que cette échelle).
3. **Le calcul.** Watts ≈ 5 × litres par seconde × mètres de chute. Les pertes de la conduite,
   de la roue et de la dynamo sont dans le 5. Exemples : 20 L/s sur 1 m, 100 W ; 10 L/s sur
   2 m, 100 W ; 5 L/s sur 8 m, 200 W. Sous 1 m de chute ou sous 0,6 L/s, ça ne vaut pas le
   chantier. Un ruisseau où vit la truite garde au moins le dixième de son débit moyen de
   l'année. En basses eaux d'hiver, c'est une bien plus grosse part de ce qui coule : on ne le
   détourne jamais au complet.

**Bâtir.**

- **La prise.** Un petit bassin derrière le barrage, une grille — grillage, tôle percée — devant
  l'entrée de la conduite, qui arrête les feuilles, le bois et la glace. La conduite descend
  vers la roue : un vieux tuyau de puits, le boyau de la pompe, du tuyau de poêle pour une chute
  courte. Plus elle est grosse et courte, moins elle mange de chute ; on vise à perdre moins
  d'un dixième de la hauteur dans le tuyau.
- **La roue à augets, pour une chute d'un mètre environ.** L'eau tombe par-dessus dans des
  augets — chaudières coupées, cruches, planchettes clouées sur deux disques de contreplaqué ou
  sur une roue de vélo — et la roue tourne par le poids. C'est la roue qui rend le plus (jusqu'aux
  trois quarts de l'énergie de l'eau) ; celle que le courant pousse par-dessous rend le moins (du
  quart à un peu moins de la moitié). Mais elle n'exploite que la hauteur de son propre
  diamètre : une roue de vélo ou des disques de contreplaqué plafonnent autour d'un mètre, et le
  reste de la chute est perdu. Les roues se gardent pour les chutes de moins de 3 m ; au-delà
  d'un mètre ou deux, la roue à cuillers prend toute la hauteur. La roue à augets tourne
  lentement, et il faut multiplier la vitesse beaucoup. On compte ses tours à la montre une
  fois montée ; la dynamo en demande des centaines à la minute (plus bas), et le rapport à
  trouver est le quotient des deux : une roue qui fait 20 tours à la minute, pour une dynamo qui
  en veut 800, demande 40 fois. Le pédalier et la roue arrière d'un vélo ne multiplient que par
  le rapport de leurs dents, plateau divisé par pignon, quelques fois seulement : c'est un étage,
  pas le multiplicateur entier. Les autres étages se font en courroies en V et poulies.
- **La roue à cuillers, pour une chute de plus d'un mètre ou deux, et peu d'eau.** Le tuyau se rétrécit en buse au
  bout, et le jet frappe des cuillers ou des demi-tasses boulonnées sur le bord d'un disque, qui
  renvoient l'eau vers l'arrière. C'est le principe de la turbine Pelton. Elle tourne vite, assez
  pour un alternateur avec peu de multiplication, et c'est elle qui passe l'hiver, à l'abri.
- **La dynamo : un moteur à aimants permanents.** Moteur de tapis roulant, de trottinette
  électrique : tourné à la main, il produit. Un moteur à courant continu à aimants permanents
  rend plus de 80 % à pleine charge quand il travaille en dynamo. Sa tension est proportionnelle
  à sa vitesse, et la plaque donne la paire : un moteur marqué 90 V à 5 000 tr/min donne 9 V à
  500 tr/min. Il faut dépasser la tension d'absorption de la batterie, plus la chute de la
  diode : le moteur de l'exemple demande plus de 800 tr/min, à peu près le régime où
  l'alternateur d'auto commence. Son avantage n'est donc pas la vitesse, c'est qu'il ne demande
  aucune excitation : ses aimants produisent dès qu'il tourne, sans fil de témoin ni batterie
  pour l'amorcer. On calcule la vitesse sur la plaque, on choisit les poulies en conséquence. Une
  diode dans le fil positif empêche la batterie de faire tourner la dynamo comme un moteur quand
  l'eau baisse. L'alternateur d'auto marche aussi, mais il lui faut au moins 1 000 tr/min pour
  commencer, 6 000 pour donner tout son courant, et l'excitation de la section B : une roue lente
  ne l'atteint pas sans une cascade de poulies.
- **La charge de délestage, qui n'est pas facultative.** Un panneau solaire se débranche sans
  dommage ; une roue à eau non. Sans charge, la dynamo s'emballe, sa tension grimpe, et la roue
  et les roulements prennent la vitesse qu'aucune pièce n'a été faite pour tenir. La charge est
  résistive : des ampoules de phare en parallèle, douilles au sec au-dessus d'un baril d'eau et
  verre dans l'eau pour que leur chaleur serve. **Elle se branche du côté de la roue, avant le
  fusible et avant le système de gestion d'un banc au lithium**, pour que la roue ne se retrouve
  jamais à vide quand la batterie sort du circuit : un fusible qui saute, un système de gestion
  qui coupe la charge parce que le banc est plein ou froid. Jamais dans le coffre à batteries :
  une ampoule chaude sous un couvercle plein d'hydrogène, c'est l'étincelle de la section 8.
  Chaque ampoule allumée se voit dans le baril ; une ampoule éteinte, c'est une charge en moins,
  et la roue accélère : on la change le jour même.
- **La nuit, personne ne fait le régulateur.** Une source qui produit vingt-quatre heures sur
  vingt-quatre ne se règle pas au voltmètre : le banc plein à minuit reçoit toute la production
  jusqu'au matin, et le plomb ouvert bout toute la nuit dans son coffre. La régulation doit se
  passer de quelqu'un d'éveillé. Deux façons, sans électronique. Soit la roue ne donne au banc
  que ce que le chalet tire en moyenne, bridée à la buse ou à la vanne, et le reste de l'eau
  passe à côté. Soit les ampoules de délestage restent branchées côté roue jour et nuit et
  avalent tout ce qui dépasse la consommation moyenne ; le banc ne reçoit que la différence.
  Dans les deux cas, le banc se juge le matin, au densimètre et au niveau des éléments. Un
  plomb ouvert dont le niveau baisse de jour en jour a bouilli la nuit : une ampoule de plus, ou
  un peu moins d'eau à la buse. Un banc dont la densité baisse de jour en jour manque de
  courant : une ampoule de moins. Ce qui reste pour le banc quand il est plein doit le tenir à
  sa tension de maintien, 13,5 V à 25 °C, corrigée pour le froid comme à l'étape 24, et pas plus
  haut : au-dessus, il bout. Le voltmètre le dit le matin, roue qui tourne, banc plein : à la
  tension de maintien ou sous elle, c'est un filet ; au-dessus, une ampoule de plus.

**L'hiver.** Une roue à eau à l'air libre ne passe pas l'hiver ici : la glace s'y forme et s'y
accumule, et il est pratiquement impossible de l'en empêcher. Ce qui passe l'hiver, c'est une
conduite enfouie sous la ligne de gel, une prise sous la glace dans un trou d'eau qui ne gèle pas
jusqu'au fond, et la roue à cuillers avec sa dynamo dans un petit abri. Un trou d'eau qui ne gèle
pas, c'est une glace mangée par en dessous par le courant ou une source : on n'y va pas sur la
glace pour entretenir la prise, on y va du bord ou pas du tout (ch. 58). Le travail dans le
ruisseau se fait à deux et pas seul : l'eau glacée coupe les mains en minutes (ch. 25, le
1-10-1). Le débit de calcul est celui du milieu de l'hiver, quand le ruisseau est au plus bas.

**Ce qu'on perd :** des jours de chantier, le barrage que la crue du printemps emporte, et un
ruisseau qui baisse au moment où on en a le plus besoin. Ce qu'on gagne : la seule source qui
ne dépend ni du ciel ni du réservoir.

### D. Le vent

Le vent est la plus faible des trois sources autour d'un chalet en forêt, et il faut le dire.
Une éolienne demande une moyenne annuelle d'au moins 15 km/h ; en terrain ouvert, à Sept-Îles,
la moyenne est de 14 km/h, et un chalet sous les arbres en a moins. Elle vaut la peine sur une
pointe exposée au fleuve, au bord d'un grand lac, sur une butte dénudée — et là, elle a deux
qualités que le soleil n'a pas : le vent souffle la nuit, et il souffle plus en hiver (15 km/h en
décembre, 12 en juillet). L'air froid, plus lourd, porte environ 16 % d'énergie de plus à -20 °C
qu'à +20 °C.

- **La puissance est au cube de la vitesse.** 10 % de vent en plus, 30 % de puissance en plus.
  D'où la hauteur : le vent gagne environ 12 % chaque fois qu'on double la hauteur, donc la
  puissance gagne 40 %. Au-dessus des cimes, le vent est plus fort et moins turbulent.
- **Le diamètre compte au carré.** Doubler le diamètre des pales quadruple la puissance.
- **Bâtir.** Le même moteur à aimants permanents qu'au ruisseau, sur une tête qui pivote au bout
  d'un mât haubané, une queue en tôle qui la garde face au vent, des pales taillées dans du bois
  ou dans un gros tuyau de plastique fendu en long. Le moteur se choisit sur sa plaque : ses
  volts divisés par ses tours donnent ce qu'il sort à chaque tour, et il doit dépasser 15 V au
  régime que l'hélice atteint vraiment ; sinon, une multiplication entre les deux. Le moteur de
  l'exemple du ruisseau demande plus de 800 tr/min. Le câble descend de la tête qui pivote au
  mât qui ne pivote pas : laissé lâche en boucle, il se tord à mesure que la tête suit le vent,
  et se détord à la main à chaque visite. La diode, la charge de délestage branchée du côté de
  l'éolienne avant le fusible, le voltmètre et le réglage de nuit du ruisseau, tels quels. Si une
  petite éolienne de voilier ou de camp traîne quelque part, c'est elle qu'on monte : elle a
  déjà ses pales, sa queue et son frein.
- **Le mât.** Un mât qu'on lève ou qu'on couche tombe sur toute sa hauteur : personne dans
  cette longueur, du côté où il penche, pendant la manœuvre. Le mât basculant, monté couché et
  relevé au treuil ou au véhicule, évite de grimper. Un mât de métal au-dessus des cimes devient
  la cible de la foudre sur le terrain, et son câble la conduit jusqu'au coffre à batteries dans
  le chalet : le câble se débranche du banc quand l'orage approche.
- **L'arrêter avant la tempête.** Une petite éolienne s'arrête pour se protéger vers 70 km/h.
  Celle qu'on bâtit n'a pas ce frein : on prévoit de quoi la replier de côté ou attacher les
  pales avant le gros vent, et on l'arrête quand le givre alourdit une pale et la déséquilibre.
  Le givre qui s'en détache est projeté loin. Une pale qui tourne frappe : avant de s'approcher,
  on arrête le rotor. Un moteur à aimants se freine quand on relie ses deux fils de sortie
  ensemble : il s'arrête, ou, par très grand vent, tourne encore lentement. On fait ce
  court-circuit avec un interrupteur au pied du mât, jamais à la main nue sur les fils, et un
  interrupteur qui coupe d'abord la batterie avant de relier les fils : dans l'autre ordre, c'est
  la batterie qu'il met en court-circuit. Le frein sert pour un arrêt court ; pour des jours, ou
  pour la tempête annoncée, on couche le mât ou on attache les pales.

Ce qu'on perd : beaucoup de travail pour peu de courant, sauf sur un site vraiment venteux.

### E. Le froid sans courant

Quand il ne reste ni banc, ni génératrice, ni onduleur, le coffre redevient la meilleure caisse
isolée du terrain, et tout ce qui suit est déjà écrit ailleurs : la cache d'hiver au ch. 73, la
génératrice branchée directement sur le coffre par blocs, le thermostat ponté et le joint refait
au ch. 74, §9, le caveau au ch. 79. Ce qui ne se fait pas au chalet : changer le compresseur de
120 V d'un coffre pour un compresseur de 12 V. Ça s'est déjà fait, mais le circuit est scellé
sous pression, et ce qui manque au chalet n'est pas le brasage : c'est tout ce qui l'entoure. Le
gaz se vide et se récupère avant de couper, au coupe-tube, jamais à la scie ; aucune flamme sur
un circuit qui en contient encore. On purge à l'azote sec avant de braser, on change le filtre
déshydrateur à chaque ouverture, et le circuit ne reste pas ouvert plus d'un quart d'heure :
l'humidité qui y entre fait des bouchons de glace et ronge l'huile. Puis la pompe à vide retire
l'air, et le gaz de la plaque se remet dans la quantité de la plaque, à la balance. Il manque au
chalet l'azote, le filtre, la pompe, la balance et le gaz. Et des
coffres récents tournent à l'isobutane ou au propane, des gaz qui brûlent. La plaque du coffre
nomme son gaz ; sur bien des appareils récents, les tuyaux où il passe sont marqués de rouge et
une étiquette avertit. Sur un circuit à gaz inflammable, aucune flamme ni brasure : le gaz qui
sort d'un tuyau ouvert prend feu au chalumeau.

### F. Trouver le sud sans boussole

Un bâton planté droit dans un sol plat, une pierre au bout de l'ombre tous les quarts d'heure
autour du milieu de la journée. La pierre la plus proche du bâton marque le midi solaire, et la
ligne du bâton à cette pierre pointe le nord vrai ; le sud est à l'opposé. La même ombre donne
l'heure juste du midi, qui ne tombe pas à 12 h à l'horloge.

### G. Ce qui ne se remplace pas

- **La batterie.** Des plaques de plomb et de l'acide ne se fabriquent pas au chalet. Une
  batterie au bac bombé ou fendu est perdue, une batterie gelée intacte l'est d'ordinaire
  (ch. 84, §9), une batterie au lithium gonflée aussi (ch. 108). Tout ce chapitre
  protège le banc avant le reste, parce que c'est la seule pièce qui ne repousse pas.
- **L'onduleur, pour un compresseur de 120 V.** Sans lui et sans génératrice, le coffre est une
  caisse.
- **L'avertisseur de CO.** Aucun montage ne voit le monoxyde. Ce qui le remplace n'est pas un
  objet mais une règle tenue sans exception : aucun moteur dans un bâtiment, 6 m entre le moteur
  et les murs.
- **Le fusible.** Un boulon ou un bout de fil à sa place ne coupe rien : le prochain court-circuit
  fait fondre le câble au lieu du fusible, sous le plancher ou dans le mur.

Souder avec les batteries du banc est au ch. 107 : c'est la même énergie, qu'il faudra recharger.

[^1]: Le densimètre de batterie est une poire de caoutchouc au bout d'un tube de verre, avec un
    flotteur gradué dedans. On ouvre le bouchon d'un élément, on aspire l'électrolyte jusqu'à ce
    que le flotteur flotte sans toucher le fond ni les parois, on vide et on remplit deux ou trois
    fois dans le même élément, puis on lit la graduation au ras du liquide, l'œil à sa hauteur.
    Le chiffre lu est la densité : 1,277 pour un élément plein. L'acide retourne dans l'élément
    d'où il vient, lunettes sur le nez.

[^2]: Il porte « MPPT » sur son étiquette ou sur sa fiche. Un contrôleur marqué « PWM », le plus
    simple, ne le suit pas.

[^3]: Ça se lit sur l'étiquette de l'onduleur ou sur sa boîte : « onde sinusoïdale pure »
    (« pure sine wave ») ou « onde sinusoïdale modifiée » (« modified sine wave »).
