# Audit de l'écriture : la consigne, lot E (tome 4)

28 octobre 2026. Un seul regard : la consigne. Qui fait quoi, quand, dans quel ordre ; un geste par phrase ou une étape
qui en entasse cinq ; la condition avant ou après le geste ; le pourquoi qui aide ou qui alourdit ; le chiffre à sa
place ; une étape qu'on suit les mains occupées, à la lampe frontale ; les séries orange, les tableaux Points de
contrôle et Signes d'échec, les lignes de Matériel, les titres de « Quand l'utiliser ».

Lot, lu au complet : `chapitres/68-salaison-a-sec.md`, `chapitres/70-fumage-a-froid.md`,
`chapitres/78-conserves-et-marinades.md`. Aucun fichier du livre n'a été modifié. Les citations sont mot pour mot (la
mise en gras est retirée, « […] » marque une coupe) ; les numéros de ligne sont ceux des fichiers au 28 octobre. Les
réécritures sont des exemples, sans fait ni chiffre neuf : quand une réécriture demanderait un fait que le chapitre
n'a pas, la place est marquée `[À VÉRIFIER : …]` pour le rédacteur.

Les trois chapitres sont encore au gabarit à neuf sections (« Pourquoi ça marche », section 8 « Danger », « § »,
tirets) : le tome 4 n'est pas passé à la grande passe. `controle.py` y compte 50, 62 et 60 tirets, et 15, 3 et 12
« § ». C'est hors de mon regard et je ne le reprends pas, sauf quand la forme casse la consigne. Dans les réécritures,
les numéros d'étapes sont ceux d'aujourd'hui.

Aucun des trois chapitres n'a de série orange, et c'est juste : rien ne s'y fait dans les premières minutes. Les deux
urgences qui y passent (le monoxyde du fumoir, un repas qui donne le botulisme) ont leur page de danger.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 68 | 5055 | 306 | 16,5 | 0,74 | 24,8 | 16,0 | 19,3 | 25,8 | 19,9 | 3,0 | 5,3 | 5,1 | 5,9 |
| ch. 70 | 5771 | 302 | 19,1 | 0,69 | 20,5 | 21,9 | 21,6 | 33,8 | 25,8 | 3,8 | 6,2 | 5,2 | 5,0 |
| ch. 78 | 5401 | 316 | 17,1 | 0,73 | 21,5 | 16,8 | 15,6 | 30,4 | 24,4 | 1,5 | 7,8 | 5,6 | 6,0 |
| le lot | 16227 | 924 | 17,6 | 0,72 | 22,3 | 18,2 | 18,9 | 30,0 | 23,4 | 2,8 | 6,5 | 5,3 | 5,6 |

### Le même script, section par section

Extraits faits dans le scratchpad : la section 2 (Quand l'utiliser), la section 5 (Procédure) et la section 9
(Variante d'urgence) de chaque chapitre.

| texte | mots | m/phr | ≤6 % | ≥30 % | « : » % | fait:csq % | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 68, section 2 | 370 | 18,5 | 20,0 | 30,0 | **45,0** | 25,0 | **0,0** | **26,3** |
| ch. 70, section 2 | 475 | 15,8 | 20,0 | 6,7 | 26,7 | 16,7 | 6,3 | 6,9 |
| ch. 78, section 2 | 374 | 19,7 | 10,5 | 31,6 | **57,9** | **31,6** | 5,3 | **27,8** |
| ch. 68, procédure | 1137 | 11,7 | **42,3** | 5,2 | 19,6 | 13,4 | 4,4 | 1,0 |
| ch. 70, procédure | 1965 | 17,4 | 23,9 | 17,7 | 28,3 | 25,7 | 5,1 | 3,6 |
| ch. 78, procédure | 1255 | 12,2 | **35,9** | 8,7 | 15,5 | 10,7 | 4,8 | 4,9 |
| ch. 68, variante | 2372 | 20,4 | 12,9 | 23,3 | 29,3 | 26,7 | 7,2 | 4,3 |
| ch. 70, variante | 2211 | **22,1** | 20,0 | **32,0** | **42,0** | **33,0** | 5,4 | 7,1 |
| ch. 78, variante | 2159 | 20,2 | 11,2 | 21,5 | 35,5 | **31,8** | 4,2 | 6,6 |

### La consigne, comptée

Script fait pour cet audit (scratchpad, `etapes.py`) : il prend chaque étape numérotée de la section 5, compte ses mots
et ses phrases, les phrases qui commencent par un geste à l'infinitif (« Peser… », « Ne jamais laisser… »), les
« se + verbe » (à juger un par un : « le sel se dissout » reste) et les « si » placés après le geste. Les chiffres
sont des ordres de grandeur ; la note de bas de page du ch. 78 tombe dans l'étape 27 et la gonfle.

| texte | étapes | mots par étape | phrases par étape | phrases qui commencent par un geste | étapes de 100 mots et plus | étapes sans aucune phrase-geste | « se + verbe » dans les étapes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 68 | 19 | 56 | 3,8 | **36 %** | 1 (ét. 16 : 122) | 0 | 11 |
| ch. 70 | 25 | **81** | 4,2 | **26 %** | **7** (ét. 2, 3, 4, 12, 17, 18, 23 ; ét. 12 : 257) | **5** (ét. 4, 8, 12, 17, 20) | **23** |
| ch. 78 | 27 | 47 | 2,8 | 43 % | 1 (ét. 19 : 157) | 0 | 13 |

| texte | lignes de Points de contrôle | lignes de Signes d'échec | règle |
| --- | --- | --- | --- |
| ch. 68 | **12** | **11** | 5 à 8 chacun |
| ch. 70 | **15** | 9 | 5 à 8 chacun |
| ch. 78 | **16** | **12** | 5 à 8 chacun |

Planches : sept dessins existent pour le lot (`images/planches-src/` : 68-06, 70-01b, 70-09, 70-12, 70-13, 78-40, 78-41,
et 70-01 au fichier des placements). **Le texte n'en appelle aucune** : pas un seul « (planche NN-NN) » dans les trois
chapitres, et 70-13 et 78-41 n'ont même pas d'ancre dans `placements-tome-4.json`.

Guillemets : 16, 23 et 31 ouvertures dans les trois chapitres, presque toutes des citations de source.

### Ce que les chiffres disent

1. **Dans une étape, la consigne est minoritaire.** Une phrase d'étape sur quatre (ch. 70) à deux sur cinq (ch. 78)
   commence par un geste. Le reste explique, décrit, avertit ou conclut. Au ch. 70, cinq étapes sur vingt-cinq n'ont
   aucune phrase qui dise quoi faire.
2. **Le geste est coupé en morceaux.** Au ch. 68 et au ch. 78, le script trouve 42 % et 36 % de phrases de six mots et
   moins dans la procédure : le titre de l'étape est un fragment (« Peser, et écrire le poids. »), et le corps
   repart sur un autre fragment (« Au gramme, avant tout. »). Le comment, le où et le combien sont dans le second
   fragment, ou trois phrases plus loin.
3. **Le cœur du chapitre est écrit comme un essai.** La variante d'urgence fait 47 %, 38 % et 40 % des mots des trois
   chapitres, et c'est là que les phrases sont les plus longues (21 à 32 % à 30 mots et plus) et les plus souvent en
   « fait : conséquence » (27 à 33 %, contre 11 à 26 % dans la procédure). Les gestes y sont dans des paragraphes de
   raisonnement, sans numéros.
4. **« Quand l'utiliser » raisonne au lieu de nommer.** 45 % et 58 % des phrases ont un deux-points aux ch. 68 et 78,
   et le quart commence comme la précédente (« Le bon choix. », « Le mauvais choix. », « Une pièce… », « Une saison… »).
5. **Les mots qui enchaînent les gestes manquent.** 4,4 à 5,1 mots de liaison pour 1000 dans la procédure : presque pas
   de « puis », « ensuite », « quand », « tant que », « sinon ». L'ordre des gestes se lit par juxtaposition, ou par un
   deux-points qui pose une conséquence.

## 2. Les défauts, du plus grave au moins grave

### 1. L'étape qui n'est pas un geste : le cours ou le constat à la place de la consigne (haute)

**Ce que c'est.** L'étape porte un numéro, mais elle explique un mécanisme, décrit un état ou pose un avertissement ; le
geste, quand il y en a un, arrive en dernier (« La conduite qui en découle : … ») ou n'arrive pas. Le lecteur, les mains
dans le sel, doit lire tout le cours pour trouver quoi faire.

**Fréquence.** 36 %, 26 % et 43 % des phrases d'étape commencent par un geste ; au ch. 70, cinq étapes sur 25 n'en ont
aucun (4, 8, 12, 17, 20).

**Exemples.**

- ch. 70, l. 103 à 112, étape 4 (149 mots, aucun geste) : « Le salpêtre et sa forme moderne. Le salpêtre, c'est du
  nitrate — de potassium ou de sodium. Les nitrates sont lentement convertis par l'action bactérienne en nitrite, qui
  est l'agent de saumurage actif : le nitrate n'agit qu'après qu'une flore l'ait transformé, à une vitesse qui dépend de
  la température, du temps et de cette flore. […] Ce livre ne donne aucune quantité de salpêtre, à aucun endroit. […]
  Aucune cuillerée, jamais. »
  - Réécriture : l'étape sort ; elle parle du salage, qui est le sujet des ch. 67 et 68. Ce qu'elle a d'utile au fumoir
    tient dans l'étape 1 : « 1. Vérifier que la salaison est terminée (ch. 68 ou 69) : le sel pesé sur le poids de la
    viande, le sel de salaison du commerce dosé selon son étiquette (ch. 67), jamais du salpêtre, et le temps de sel
    fait. Sinon, ne pas mettre la pièce au fumoir : la remettre au sel ou la congeler. »
- ch. 70, l. 184 à 192, étape 17 (160 mots ; le geste à la sixième phrase) : « La température de chambre. La règle est
  fonctionnelle : la chair ne coagule pas (étape 16). Le plafond chiffré est 32 °C dans la chambre. Au-dessus, on ne tue
  pas le botulisme — la chaleur d'un fumage à froid n'affaiblit pas ses spores —, on tue les bactéries ordinaires qui
  auraient gâté le poisson, à l'odeur, avant que la toxine se forme : on enlève l'alarme et on garde le danger. […] La
  conduite qui en découle : garder la chambre le plus bas possible, la lire au thermomètre chaque heure, et si elle
  s'approche de la plage de doublement rapide, éteindre, sortir les pièces au froid et reprendre le lendemain. »
  - Réécriture : « 17. Lire le thermomètre de la chambre chaque heure, et garder la chambre le plus froide possible.
    Si elle monte vers 32 °C, éteindre, sortir les pièces au froid et reprendre le lendemain. Au-dessus de 32 °C, la
    chaleur ne tue pas les spores du botulisme : elle tue les bactéries ordinaires qui auraient gâté le poisson et
    l'auraient fait sentir mauvais avant que la toxine se forme. On perd l'avertissement, et le danger reste. »
- ch. 70, l. 204 à 206, étape 20 : « Le conduit est chaud sur toute sa course, pas seulement au foyer. Un tuyau aérien
  est donc plusieurs mètres de surface brûlante à hauteur de hanche, là où on ne regarde pas ; un conduit enterré la
  supprime au complet, et c'est la deuxième raison de l'enterrer. Ch. 39, ch. 82. »
  - Réécriture : l'étape sort. C'est un constat, et l'étape 6 (l. 121 à 124) dit déjà que la tranchée « supprime d'un
    coup les quelques mètres de surface brûlante qu'un tuyau aérien laisse en travers de la cour, à hauteur de hanche ».
- ch. 68, l. 136 à 138, étape 10 : « Égoutter. Le sel fait sortir de l'eau ; cette eau se charge de sel et devient une
  saumure. En salaison à sec, elle s'évacue : la pièce ne trempe pas dedans. Une pièce qui baigne n'est plus au chapitre
  68, elle est au chapitre 69, et pas selon le barème du 69. »
  - Réécriture : « 10. Vider le liquide qui se forme au fond du contenant, ou le laisser s'égoutter dehors : la pièce
    ne doit pas tremper dedans. Une pièce qui baigne dans ce liquide n'est plus salée à sec, et elle n'est pas salée non
    plus selon le barème de la saumure (ch. 69). »
- ch. 68, l. 176 à 182, étape 16 (122 mots ; le repère de fin à la dernière ligne) : « Peser, et peser encore. Chaque
  semaine, à la même balance ; le poids du jour s'écrit sur l'étiquette, sous le poids frais, à la place du précédent.
  La perte de masse est la seule lecture de chantier qu'un chalet puisse faire du séchage. Elle n'est pas une mesure
  d'activité de l'eau, et aucun pourcentage de perte ne garantit un aw de 0,85. Ce qu'on sait : un jambon sec fini a
  perdu au moins 18 % de son poids frais, et en dessous ce n'en est pas un ; tant que la pièce perd du poids, elle sèche
  encore ; quand elle arrête d'en perdre alors que la chambre n'a pas changé, elle a fini ce qu'elle pouvait faire dans
  ces conditions-là. »
  - Réécriture : « 16. Peser la pièce chaque semaine, sur la même balance, et écrire le poids sur l'étiquette, sous le
    poids frais, à la place du précédent. Tant qu'elle perd du poids, elle sèche encore. Quand elle n'en perd plus et que
    la chambre n'a pas changé, elle a séché autant qu'elle le peut dans cette chambre. Un jambon sec fini a perdu au
    moins 18 % de son poids frais ; la pesée ne dit pas pour autant si l'eau qui reste est sous 0,85 (étape 17). »

**Cause.** Une habitude, et deux règles mal appliquées. La section « Comment ça marche » a été coupée et son contenu
versé dans les étapes (CLAUDE.md : « Un mécanisme qui apprend quelque chose va dans l'étape qu'il explique ») ; le
rédacteur a mis le mécanisme **à la place** du geste au lieu de le mettre **après**. Le skill `ecriture` le dit pourtant
(règle 2 : « Le fait d'abord, la raison ensuite, et seulement si la raison change ce qu'on fait » ; règle 4 : « Les
étapes à l'infinitif »), mais rien ne mesure la part de geste dans une étape. L'étape 4 du ch. 70 casse aussi la règle
« Chaque chapitre parle de son sujet, pas de celui des autres » (CLAUDE.md).

### 2. L'étape qui entasse les gestes, qu'on ne suit pas les mains occupées (haute)

**Ce que c'est.** Cinq ou six gestes, leurs conditions, une autre façon de faire et deux avertissements dans le même
paragraphe. Pour un geste qu'on fait en tenant une marmite sous pression ou en surveillant un feu, on ne retrouve pas
où on en était.

**Fréquence.** Au ch. 70, la moyenne est de 81 mots par étape, et 7 étapes sur 25 passent 100 mots ; au ch. 78,
l'étape 19 fait 157 mots ; au ch. 68, les étapes 6, 11, 13 et 16 font de 78 à 122 mots. Aucune n'a de sous-étapes.

**Exemples.**

- ch. 78, l. 179 à 187, étape 19 (157 mots, au moins six gestes) : « Tenir la chaleur stable. Une pression qui retombe
  sous la cible oblige à reprendre le compte au complet. Sur un rond de cuisinière, le réglage se trouve une fois et
  tient seul : c'est la vraie raison de faire le peu acide à la maison plutôt qu'au chalet, et elle vaut plus que le
  confort. Sur un poêle à bois, cela veut dire une brassée fendue d'avance à portée de main, quelqu'un dans la pièce du
  début à la fin, et une correction qui se fait en déplaçant la marmite sur le dessus du poêle plutôt qu'à la clé
  d'air. On corrige avant d'arriver : […] »
  - Réécriture : « 19. Tenir la pression stable jusqu'à la fin du compte.
    a. Si la pression tombe sous la cible, repartir le compte des minutes à zéro.
    b. Sur un rond de cuisinière, chercher le réglage qui tient la pression, puis ne plus y toucher.
    c. Sur un poêle à bois, voir la variante d'urgence, « Tenir 116 °C sur un poêle à bois ». »
    Le poêle est dit deux fois dans le chapitre (ici et l. 395 à 419) ; il garde une place, la variante, qui est plus
    complète. La phrase sur « la vraie raison de faire le peu acide à la maison » sort : c'est la justification du
    cadrage, et la ligne de lieu la porte.
- ch. 70, l. 147 à 162, étape 12 (257 mots, dix phrases, aucune ne commence par un geste) : « Pas de résineux vif —
  épinette noire (Picea mariana), sapin baumier (Abies balsamea) : la résine dépose une suie collante et une amertume qui
  ne s'enlève pas. La vieille souche d'épinette fait exception. Les Innus fument la truite et boucanent les peaux à la
  souche d'épinette sèche et pourrie : […] Et elle change le bois, pas les barrières : sel, froid et gel du chapitre
  s'appliquent pareil. Jamais de bois traité, peint, verni ou collé — ce qu'on brûle se dépose sur ce qu'on mange.
  Jamais de bois d'épave de la grève : il a séché chargé de sel et de tout ce dans quoi il a flotté. »
  - Réécriture : « 12. Ne pas brûler de résineux vif (épinette noire, sapin baumier) : la résine dépose une suie collante
    et une amertume qui ne part plus. Ne jamais brûler de bois traité, peint, verni ou collé, ni de bois d'épave de la
    grève : il a séché chargé de sel et de ce dans quoi il a flotté.
    Autre façon, celle des Innus : la vieille souche d'épinette sèche et pourrie. L'émietter à la main et la faire
    couver sur des pierres chaudes, en surveillant qu'aucun morceau ne prenne en flamme. Le bois qui s'est défait en
    éponge est celui que la résine ne protégeait pas : bien sec, il couve sans flamber et donne la fumée bleutée de
    l'étape 13. Elle ne marche plus si on change de bois : une souche encore ferme, une branche verte, du bois qui colle
    aux doigts, ou le cœur dur et orangé qui sent la gomme, flambent au lieu de couver, et une souche détrempée donne
    une fumée blanche. Le sel, le froid et le gel du chapitre s'appliquent pareil. »
- ch. 70, l. 94 à 102, étape 3 (136 mots ; la condition « poisson prêt-à-manger » n'est jamais dite) : « Régler la
  question des parasites du poisson maintenant. Congeler le poisson, avant ou après le fumage, à -35 °C ou moins pendant
  au moins 15 heures, ou à -20 °C pendant au moins 168 heures (7 jours). Le «avant ou après » est la seule souplesse, et
  elle est utile : un congélateur de chalet qui peine à descendre sert mieux après le fumage, quand la pièce a perdu de
  l'eau. Vérifier la température dans le congélateur, avec un thermomètre, pas sur le cadran. Le congélateur qui tient
  sa température sept jours d'affilée sans qu'on y pense est celui de la maison, sur le réseau : […] »
  - Réécriture : « 3. Pour un poisson PRÊT-À-MANGER, le congeler contre les parasites, avant ou après le fumage.
    a. Choisir le congélateur. Celui de la maison, sur le réseau, tient sa température sept jours sans qu'on y pense :
       faire le gel là, avant de monter au chalet ou au retour. Un congélateur de chalet qui a du mal à descendre sert
       mieux après le fumage, quand la pièce a perdu de l'eau.
    b. Mettre un thermomètre dans le congélateur et lire la température là, pas sur le cadran.
    c. Laisser le poisson au moins 15 heures à -35 °C ou moins, ou au moins 7 jours (168 heures) à -20 °C. »
- ch. 68, l. 159 à 163, étape 13 (92 mots, quatre gestes, une durée, un pourquoi et un avertissement caché dans un
  constat) : « Rincer et laisser égaliser. Rincer le sel de surface à l'eau froide, éponger, remettre au froid sans sel,
  sous 5 °C, à couvert léger : d'un mois pour une petite pièce jusqu'à trois mois pour une pièce peu salée, le temps que
  le sel de la couche externe gagne le centre. La pièce y perd encore de 10 à 15 % de son poids. Une pièce qui sort de sa
  salaison est salée en surface et pas au centre, et la trancher à ce moment-là donne exactement l'impression trompeuse
  d'un produit fini. »
  - Réécriture : « 13. Rincer le sel de surface à l'eau froide et éponger la pièce. La remettre au froid sans sel,
    sous 5 °C, couverte légèrement, pendant un mois pour une petite pièce et jusqu'à trois mois pour une pièce peu
    salée : le sel de la surface a le temps de gagner le centre, et la pièce perd encore 10 à 15 % de son poids. Ne pas
    la trancher avant : elle est salée en surface et pas au centre, et la coupe a l'air d'un produit fini. »
- ch. 78, l. 140, étape 8, la planche qui montre le geste et que le texte n'appelle pas : « Remplir en laissant
  l'espace de tête[^1] prescrit par la recette. »
  - Réécriture : « 8. Remplir le pot en laissant l'espace de tête[^1] que demande la recette (planche 78-40,
    repère [à prendre sur la planche]). » Même chose pour 68-06 (« Presser accélère »), 70-01 (étape 8), 70-01b et 70-09
    (« Le foyer et la tranchée », « La chambre »), 70-12, 70-13 (générateur de fumée) et 78-41 (grille et lève-pots).

**Cause.** Le cadre le dit (« Une étape qui a plusieurs gestes se découpe en sous-étapes : le geste, où est la chose et
comment la reconnaître, ce qu'on voit quand c'est fait ; chaque sous-étape renvoie au repère de sa planche ») et le
skill `ecriture` aussi (tableau, ch. 3, étape 23 : « La procédure tassée dans une étape »), mais la règle date du
19 octobre et n'a été appliquée qu'au tome 1. Ensuite, une habitude : la méthode des Innus est écrite comme une
exception au milieu d'une règle, et non comme une autre façon (cadre : « Une autre façon de faire se dit comme une
autre façon (« Autre façon : », « Sans tige de ferrocérium : ») »). Les planches : CLAUDE.md, « Chaque planche est
appelée dans le texte ».

### 3. Le chiffre loin de l'étape qui s'en sert, ou le même seuil dit deux fois de deux façons (haute)

**Ce que c'est.** Le lecteur fait l'étape avec le chiffre qu'il a sous les yeux. Quand la part, le seuil ou l'action
qui en dépend est dans une autre étape, ou seulement dans le tableau, il se trompe en suivant le texte à la lettre.
C'est grave ici parce que le premier exemple porte sur une dose de nitrite (« Dans ce produit, la dose est la
sécurité », ch. 68, l. 283).

**Fréquence.** Un cas de dose, deux seuils qui commandent le même geste au ch. 70, quatre actions qui ne vivent que dans
les tableaux au ch. 68, un calcul à refaire au lieu d'une règle.

**Exemples.**

- ch. 68, l. 124 à 126 (étape 7) et l. 140 à 141 (étape 11) : « Frotter. «Les tissus musculaires exposés […] devraient
  être recouverts d'agents de salaison ». Recouverts veut dire recouverts : pas une saupoudrée, une couche. » Puis,
  quatre étapes plus loin : « Le mélange de l'étape 6 se partage en trois : un tiers frotté à l'étape 7, les deux autres
  au 3e et au 5e jour. » Le lecteur qui suit l'étape 7 frotte tout le mélange ; au 3e jour, il n'en a plus et en refait,
  avec son nitrite.
  - Réécriture : « 6. […] Partager le mélange en trois parts : une pour aujourd'hui, une pour le 3e jour, une pour le
    5e jour. » « 7. Frotter la première part du mélange sur toute la viande à nu, en couche, pas en saupoudrant.
    Insister là où l'os a été retiré, dans les replis et autour de l'articulation : c'est là que la viande tourne. »
- ch. 70, l. 190 à 192 (étape 17) et l. 199 (étape 18) : « et si elle s'approche de la plage de doublement rapide,
  éteindre, sortir les pièces au froid et reprendre le lendemain » ; puis « Une séance s'arrête de toute façon dès que la
  chambre approche de 32 °C. » Deux déclencheurs pour le même geste, dans deux étapes : la plage de 35 à 45 °C, et 32 °C.
  - Réécriture : un seul seuil, dans l'étape 17 (voir le défaut 1) : « Si elle monte vers 32 °C, éteindre, sortir les
    pièces au froid et reprendre le lendemain. » La phrase de l'étape 18 sort.
- ch. 68, l. 211 (Points de contrôle), action qui n'est dans aucune étape : « Sous 1,7 °C, la diffusion s'arrête et les
  jours ne comptent plus : prolonger. » L'étape 9 (l. 132) dit seulement « Mettre au froid, entre 2 et 4 °C ».
  - Réécriture de l'étape 9 : « 9. Mettre le contenant au froid, entre 2 et 4 °C, et lire le min-max deux fois par jour.
    Sous 1,7 °C, le sel n'avance plus : ces jours-là ne comptent pas dans le barème de l'étape 12. Au-dessus de
    15,6 °C, jeter la pièce, même si elle a l'air normale. »
- ch. 68, l. 171 à 174, étape 15, la température de séchage absente : « Sécher au froid et lentement. Les barèmes de
  séchage, tous écrits pour le porc : saucissons, 15 jours minimum à 7,3 °C minimum ; capicola, 20 jours à 7,3 °C
  minimum ; jambons, un tableau qui va de -54,4 °C à 23,9 °C selon la durée. » Le chiffre que le lecteur cherche (à
  quelle température garder la chambre) n'est nulle part ; le tableau (l. 217) dit seulement « le livre garde la chambre
  froide, quitte à sécher plus longtemps ».
  - Réécriture : « 15. Sécher la pièce dans une chambre froide, à `[À VÉRIFIER : la température visée]`, même si ça
    prend plus longtemps que les barèmes écrits pour le porc (15 à 20 jours à 7,3 °C au moins pour les saucissons et le
    capicola). Ne pas monter la chambre pour aller plus vite : une pièce qui sèche trop vite fait une croûte, l'eau du
    centre ne sort plus, et ça ne se rattrape pas. » Le tableau des jambons (de -54,4 à 23,9 °C) sort : il ne change
    rien au geste.
- ch. 68, l. 153 à 157, étape 12, un calcul à refaire au lieu de la règle : « Pour la pièce de 3 200 g de l'étape 5 :
  3,2 × 3,3 = 11 jours de contact, donc le minimum absolu de 28 jours commande. 3,2 × 4,4 = 14 jours, donc le minimum de
  40 jours commande aussi. Sur des pièces de chalet, ce sont presque toujours les minimums absolus qui gouvernent, pas le
  calcul au kilogramme. Le calcul reprend la main au-dessus d'environ 8,5 kg pour le contact et 9,1 kg pour le total. »
  - Réécriture : « 12. Laisser la pièce au sel au moins 28 jours, et compter au moins 40 jours de salaison en tout.
    Une pièce plus lourde demande plus : 3,3 jours par kilogramme au sel au-dessus de 8,5 kg environ, et 4,4 jours par
    kilogramme en tout au-dessus de 9,1 kg environ. »

**Cause.** Le skill `ecriture` dit où va un chiffre (règle 5, et « Un fait qui revient garde une seule place, la plus
utile : l'étape où il sert ») ; il ne dit pas qu'**une part d'un tout se dit à l'étape où on la prend**, ni qu'**un seuil
qui déclenche un geste n'a qu'une valeur et qu'une étape**. Les tableaux de contrôle, longs, ont servi de dépôt aux
consignes qui n'avaient pas trouvé leur étape. Habitude de rédaction aussi : le barème est donné comme on l'a lu dans la
source (le cas de la source, puis le calcul), et non comme le lecteur l'applique.

### 4. La consigne au pronominal ou au présent qui décrit (haute)

**Ce que c'est.** Le geste est dit comme si la chose le faisait toute seule (« il se jette », « se mange »,
« s'évacue »), ou comme un constat (« Rangement au froid »). Personne ne fait le geste.

**Fréquence.** 11, 23 et 13 « se + verbe » dans les seules étapes des trois chapitres, à juger un par un ; à peu près
autant dans les variantes et les tableaux.

**Exemples.**

- ch. 68, l. 99 à 100, étape 2 : « Il se taille au couteau et il se jette (ch. 23). »
  - Réécriture : « Le tailler au couteau et le jeter (ch. 23). »
- ch. 78, l. 201 à 203, étape 22 : « Un pot non scellé n'est pas un pot de conserve : il va au réfrigérateur et se mange
  dans les jours qui suivent, ou il repasse au traitement complet avec un couvercle neuf, ou il se congèle. Il ne va pas
  sur la tablette. »
  - Réécriture : « Si le pot n'a pas scellé, ne pas le ranger sur la tablette : le mettre au réfrigérateur et le manger
    dans les jours qui suivent, le congeler, ou refaire le traitement au complet avec un couvercle neuf. »
- ch. 70, l. 88 à 89, étape 2 : « Le produit se traite comme de la viande crue jusqu'à la cuisson : 74 °C à cœur pour le
  gibier, 70 °C pour le poisson. »
  - Réécriture : « Le traiter comme de la viande crue jusqu'à la cuisson, et le cuire à 74 °C à cœur pour le gibier,
    à 70 °C pour le poisson. »
- ch. 78, l. 117 à 118, étape 3 : « Si l'aliment n'est pas dans le livret, il ne se met pas en conserve ce jour-là. »
  - Réécriture : « Si l'aliment n'est pas dans le livret, ne pas le mettre en conserve. »
- ch. 68, l. 194 à 197, étape 18 : « Rangement au froid, au-dessus des viandes crues et jamais en dessous, dans un
  contenant qui laisse respirer. Une pièce salée qui n'est pas sèche ne se met pas sous vide ni dans un sac fermé : le
  sac crée le milieu «humide et sans oxygène » où le botulisme se développe. »
  - Réécriture : « La ranger au froid, au-dessus des viandes crues, dans un contenant qui laisse passer l'air. Ne jamais
    mettre une pièce salée qui n'est pas sèche sous vide ni dans un sac fermé : elle y reste humide et sans oxygène, et
    c'est dans ce milieu que le botulisme pousse. »
- ch. 78, l. 417 à 419, variante d'urgence : « Un maintien douteux se traite comme un maintien manqué : le lot descend au
  froid et se mange, il ne monte pas sur la tablette. »
  - Réécriture : « Si on doute que la pression ait tenu, faire comme si elle avait manqué : mettre le lot au froid et le
    manger, sans le ranger sur la tablette. »

**Cause.** Règle de CLAUDE.md (« Jamais au pronominal quand quelqu'un fait le geste ») et de `decisions-jp.md`
(16 octobre 2026, « très important pour le livre »), appliquée au tome 1 seulement. `controle.py` n'a pas de section
qui relève le pronominal (ses sections sur les trois chapitres : tirets, mots bannis, §, mots de livre, mises en
relief, mots vides, maximes, redites), alors que le cadre en parle comme d'un avis du script (« chaque avis
« tournure », « maxime », « pronominal » jugé un par un »).

### 5. « Quand l'utiliser » écrit en raisonnement, avec la liste du mauvais choix (haute)

**Ce que c'est.** Au lieu de titres de situation, des paragraphes qui justifient (« Le bon choix. … », « Le mauvais
choix. … », « Au chalet, et pas à la maison. … »), des tableaux d'espèces et une liste « Ce qui n'est pas dans ce
chapitre ». Au ch. 70, quinze puces : six « bon choix », neuf « mauvais choix ».

**Fréquence.** Les trois chapitres. 45 % et 58 % des phrases de la section ont un deux-points (ch. 68 et 78) ; un quart
commencent comme la précédente.

**Exemples.**

- ch. 68, l. 25 à 27 : « Le bon choix. Une pièce entière de gros gibier — orignal (Alces americanus) en priorité — qui
  arrive sur la table de débitage quand il n'y a plus de place au congélateur, ou plus de courant pour le faire
  tourner. »
  - Réécriture : « Quartier d'orignal ou de caribou à garder, congélateur plein ou sans courant »
- ch. 68, l. 28 à 32 : « Une saison froide : la salaison à sec demande une pièce maintenue entre 1,7 °C et 7,3 °C
  pendant des semaines, ce qui, sur la Côte-Nord, est gratuit de novembre à avril et impossible en juillet sans
  électricité. Un lecteur qui a le temps devant lui : le barème le plus court demande 40 jours de salaison avant même de
  commencer à sécher. »
  - Réécriture : « Saison froide, de novembre à avril ». Le 1,7 à 7,3 °C va à l'étape 9, les 40 jours sont à
    l'étape 12, et « un lecteur qui a le temps devant lui » sort (la phrase parle du lecteur).
- ch. 70, l. 19 à 22 et 25 à 27 : « C'est le bon choix quand : La pièce sort d'une salaison terminée et vérifiée (ch. 68
  pour le sel sec, ch. 69 pour la saumure). Le fumage à froid est une finition, jamais un traitement autonome. […] On
  veut arrêter le rancissement d'une pièce grasse qui va sécher ou attendre : lard d'ours noir (Ursus americanus),
  poitrine et flanc d'orignal (Alces americanus), saucisse sèche. »
  - Réécriture : « Pièce salée (ch. 68 ou 69) à fumer avant de la cuire » ; « Lard d'ours, poitrine d'orignal ou
    saucisse sèche qui doit attendre sans rancir » ; « Mouches sur une pièce qui sèche à l'air, en septembre » ;
    « Saumon fumé ou gravlax maison, avec un congélateur qui tient -20 °C sept jours ».
- ch. 70, l. 34 à 38 : « C'est un mauvais choix quand : La pièce n'a pas été salée, ou l'a été au jugé, sans peser le sel
  sur le poids de la viande. Fumer à froid une pièce sous-salée, c'est laisser une pièce tiède des heures dans la zone de
  danger avec un parfum dessus. »
  - Réécriture : *(la liste sort au complet)*. L'étape 1 dit déjà de vérifier que le sel a été pesé ; l'ours et le
    phoque sont à l'étape 2, le cadmium et le mal de caribou ont leur page de danger, la listériose est au défaut 6.
- ch. 78, l. 24 à 28 : « Le bon choix. Un surplus qui arrive d'un coup et qui ne tient pas : un quartier d'orignal
  (Alces americanus) quand le congélateur est plein ou mort (ch. 74), une récolte de jardin qui sort toute la même
  semaine (ch. 95), une talle de bleuets (Vaccinium angustifolium) ou de chicoutai (Rubus chamaemorus) au mois d'août
  (ch. 91). »
  - Réécriture : « Congélateur plein ou en panne, avec de la viande à garder (ch. 74) » ; « Récolte du jardin qui
    arrive toute la même semaine (ch. 95) » ; « Bleuets ou chicoutai à garder, en août (ch. 91) » ; « Réserve de repas
    pour une longue panne à la maison ».
- ch. 78, l. 33 à 40 : « Le mauvais choix. Tout ce qui est peu acide quand il n'y a pas d'autoclave : dans ce cas-là, la
  conserve n'est pas un choix médiocre, elle est fermée, et aucune durée de bouillon ne la rouvre. […] À la maison, sur
  un rond de cuisinière, cet argument-là tombe et une petite fournée se défend. »
  - Réécriture : *(sort)*. « Sans autoclave, pas de peu acide » est la consigne de l'étape 1.

**Cause.** Gabarit, section 2 : « Seulement quand l'utiliser […] en titre court, comme on l'écrirait à la main sur une
fiche » et « Pas de liste « quand ne pas l'utiliser » » ; skill `ecriture`, règle 13 ; CLAUDE.md. Les trois chapitres
sont antérieurs à la règle du 28 octobre et n'ont pas encore leur passe. Le tableau des espèces et des aliments
(ch. 68, l. 47 à 55 ; ch. 78, l. 45 à 68) n'est pas une liste de situations : c'est la décision de l'étape 1 (« Nommer
l'aliment et sa voie »), et sa place est là.

### 6. Points de contrôle et Signes d'échec : trop de lignes, des lignes qui redisent l'étape, des actions en étiquette (haute)

**Ce que c'est.** 12, 15 et 16 lignes de Points de contrôle, 11, 9 et 12 de Signes d'échec, pour 5 à 8. Beaucoup de
lignes redisent une étape mot pour mot ; la colonne « Si c'est hors cible » est souvent un nom ou une maxime au lieu
d'un geste ; une ligne envoie à un soignant.

**Fréquence.** Les six tableaux dépassent la limite.

**Exemples.**

- ch. 78, l. 235 à 237 : « Étape 3 | Barème écrit sous les yeux | Durée, format de pot, pression | Pas de barème, pas de
  fournée » ; « Étape 5 | Bord des pots | Aucune ébréchure, aucune fêlure | Pot écarté » ; « Étape 6 | Couvercles | Neufs
  | Ne pas réutiliser un couvercle plat »
  - Réécriture : *(les trois lignes sortent ; elles redisent les étapes 3, 5 et 6)*. Pour le ch. 78, les lignes qui
    changent une décision : la voie choisie, le refroidissement de la carcasse, la purge, la pression tenue, l'altitude,
    le scellement, les 74 °C à table (7 lignes).
- ch. 78, l. 235, l'action en maxime : « Pas de barème, pas de fournée »
  - Réécriture (si la ligne restait) : « Ne pas commencer la fournée. »
- ch. 70, l. 248 : « Toute la séance | Personne dans la chambre ni sous le panache ; avertisseur de CO en fonction |
  Zéro | Mal de tête, fatigue, nausée, étourdissements : sortir dehors. C'est une intoxication au monoxyde, pas la fatigue
  de la journée (ch. 26) »
  - Réécriture : *(sort)*. C'est la page du danger du monoxyde ; dans le chapitre, il reste le pictogramme et le fait
    propre au fumoir dans l'étape 19. La « cible chiffrée » « Zéro » est une étiquette.
- ch. 70, l. 268 : « Une personne tombe malade 3 à 30 jours, voire jusqu'à 70 jours, après un repas | Fenêtre
  d'incubation de la listériose | Consulter. Nommer le produit fumé au soignant : personne ne fait spontanément le lien à
  deux mois de distance. Garder l'étiquette et le reste de la pièce. Ch. 26 »
  - Réécriture : « Une personne tombe malade de 3 à 30 jours après un repas de produit fumé, parfois jusqu'à 70 jours |
    La listériose | Penser au produit fumé même deux mois après, garder l'étiquette et le reste de la pièce, et soigner
    comme au ch. 26. » (CLAUDE.md : « aucun service qui répond » ; il n'y a pas de soignant à qui nommer le produit.)
- ch. 68, l. 209 : « Étape 3 | Poids frais sur l'étiquette | Au gramme | Repeser avant de saler. Sans ce nombre, le
  chapitre ne fonctionne pas »
  - Réécriture : *(sort ; l'étape 3 le dit, et « le chapitre ne fonctionne pas » parle du livre)*. Pour le ch. 68, les
    lignes à garder : le refroidissement de la carcasse, la température de la chambre au salage (avec 1,7 et 15,6 °C),
    les jours 28 et 40 en une ligne, la fermeté au pouce, la perte de masse, la coupe avant de trancher, les 74 °C à
    table (7 lignes).
- ch. 68, l. 237, une ligne qui doit rester, mais dont l'action finit en chute : « Rien d'anormal, mais la chambre a
  dépassé 15,6 °C en cours de route | Le seuil critique de S. aureus a été franchi | Jeter. L'absence de signe n'est pas
  une preuve — c'est justement le problème »
  - Réécriture : « Rien d'anormal, mais le min-max a passé 15,6 °C | Les staphylocoques ont pu laisser leur toxine |
    Jeter la pièce, même si elle a l'air normale : la toxine reste après que la bactérie est morte. »

**Cause.** Gabarit, sections 6 et 7, CLAUDE.md et cadre : « 5 à 8 lignes chacun, au plus […] Seulement ce qui change
une décision ou ce qu'on ne verrait pas venir ; rien qui redise une étape ou la page du danger » (JP, 28 octobre 2026).
Règle neuve, pas encore passée au tome 4. Habitude : le tableau a été rempli en suivant les étapes une par une, comme
une liste de vérification d'inspecteur, au lieu de partir des erreurs qu'on ne voit pas venir.

### 7. La variante d'urgence écrite comme un essai : les gestes dans le raisonnement, sans étapes (moyenne)

**Ce que c'est.** La variante est le cœur du chapitre et elle est détaillée, ce qui est bien. Mais elle est écrite en
paragraphes qui mêlent les gestes, leur physique et ce qu'on perd ; les gestes n'ont pas de numéros, et le lecteur qui
creuse une tranchée ou calibre un témoin de gras doit refaire lui-même la liste des gestes.

**Fréquence.** 38 à 47 % des mots des chapitres ; phrases les plus longues du lot (ch. 70 : 22,1 mots par phrase, 32 %
à 30 mots et plus, 33 % en « fait : conséquence »). Seul le poêle à bois du ch. 78 (l. 401 à 415) est en étapes
numérotées.

**Exemples.**

- ch. 70, l. 342 à 354, « Le foyer et la tranchée » (un paragraphe de 200 mots) : « Un trou à feu creusé dans le sol,
  large comme une chaudière, profond jusqu'au genou, avec une amorce d'entrée d'air du côté du vent dominant, et fermé
  d'une tôle posée à plat : l'air n'entre que par l'amorce. Ouvert, le trou tire droit en l'air, […] La terre fait deux
  métiers en même temps : elle scelle, et c'est elle qui refroidit. Un tuyau aérien perd sa chaleur dans l'air, qui n'en
  prend pas beaucoup ; une tranchée la perd dans le sol, qui est une masse froide sans fond. Allumer à vide et marcher la
  course du conduit : […] »
  - Réécriture : « 1. Creuser un trou à feu large comme une chaudière et profond jusqu'au genou, avec une entrée d'air
    du côté du vent dominant.
    2. Fermer le trou avec une tôle posée à plat, pour que l'air n'entre que par l'entrée : un trou ouvert tire droit en
    l'air, et la fumée ne prend pas la tranchée.
    3. À partir du trou, creuser une tranchée de quelques mètres qui monte en pente, large et profonde comme un
    avant-bras.
    4. La couvrir de plaques d'écorce, de pierres plates ou de tôle, puis de terre bien tassée : la terre ferme la
    tranchée et refroidit la fumée.
    5. Allumer à vide et marcher le long de la tranchée : partout où un filet de fumée sort, ajouter de la terre.
    6. Lire la température dans la chambre : la tranchée est assez longue quand la fumée y arrive sous 32 °C. »
- ch. 70, l. 397 à 404, « La graisse témoin » (une procédure de calibrage et de lecture dans un paragraphe) : « Le
  calibrage se fait avant, à la maison, pendant que le thermomètre fonctionne encore : chauffer lentement un petit cube au
  bain-marie avec le thermomètre dans l'eau, noter la température exacte à laquelle le cube perd ses arêtes, écrire cette
  valeur sur le pot. Elle dépend du gras et ne se recopie d'aucun livre. On garde le gras dont le point noté tombe à
  32 °C ou juste en dessous : […] Au fumoir, le cube posé sur un éclat de bois à hauteur des pièces devient une alarme
  muette : arêtes vives, la chambre est sous le point noté ; arêtes arrondies, elle l'a dépassé. »
  - Réécriture : « Avant, à la maison, pendant qu'on a encore un thermomètre :
    1. Chauffer lentement un petit cube de gras au bain-marie, le thermomètre dans l'eau.
    2. Noter la température à laquelle le cube perd ses arêtes, et l'écrire sur le pot. Elle change d'un gras à l'autre.
    3. Garder le gras qui perd ses arêtes à 32 °C ou juste en dessous.
    Au fumoir :
    4. Poser un cube sur un éclat de bois, à la hauteur des pièces.
    5. Si ses arêtes restent vives, la chambre est sous la température notée. Si elles s'arrondissent, elle l'a
       dépassée (étape 17). »
- ch. 78, l. 384 à 392, « La panne qui tombe au milieu d'un cycle, à la maison » (le geste dans le constat, la règle
  après « D'où ») : « C'est le scénario le plus probable des deux lieux, parce que la maison est justement l'endroit où
  on part une fournée sans surveiller le feu. […] Ce qui se sauve, c'est le contenu, pas la conserve — les pots sortent à
  la pince, refroidissent, et leur contenu se traite comme de la viande cuite ordinaire : […] D'où la seule règle qui
  protège vraiment : on ne part pas de fournée de peu acide quand le vent monte ou quand la ligne est déjà tombée deux
  fois dans la journée. »
  - Réécriture : « Ne pas commencer une fournée de peu acide quand le vent se lève ou quand le courant a déjà manqué
    deux fois dans la journée. Si le courant manque pendant le cycle, le lot n'ira pas sur la tablette, même si les
    couvercles scellent : sortir les pots à la pince, les laisser refroidir, puis les mettre au froid et les manger dans
    les jours qui suivent, ou les congeler si le congélateur tourne encore. »
- ch. 68, l. 380 à 383 (9.3) : « Rien de ce qui traîne dans un chalet ne marque le 15,6 °C, et c'est pourtant le seuil
  qui décide entre manger et jeter. La réponse honnête n'est pas un truc, c'est un calendrier : on ne commence une
  salaison qu'entre le premier gel sérieux et le dégel, et dans un caveau creusé dans le sol, parce que le sol suit l'air
  avec du retard. »
  - Réécriture : « Sans thermomètre, rien au chalet ne permet de voir si la chambre passe 15,6 °C. Commencer une
    salaison seulement entre le premier gel sérieux et le dégel, et dans un caveau creusé dans le sol : le sol se
    réchauffe avec du retard sur l'air. »

**Cause.** Le gabarit demande une variante « détaillée, pas mentionnée » et de « nommer honnêtement ce qu'on perd »,
mais il ne dit pas qu'elle s'écrit comme une procédure ; le rédacteur l'a écrite comme un texte d'explication, avec la
physique au milieu des gestes (« La terre fait deux métiers », « une masse froide sans fond ») et des formules d'essai
(« La réponse honnête n'est pas un truc, c'est un calendrier », « D'où la seule règle qui protège vraiment »). Le cadre
(« Une étape qui a plusieurs gestes se découpe en sous-étapes ») vaut pour la variante comme pour la procédure.

### 8. La consigne recopiée de la source, entre guillemets et au vouvoiement (moyenne)

**Ce que c'est.** Au milieu d'une étape à l'infinitif, une phrase de ministère entre guillemets (« Ne modifiez
jamais… », « Évitez de goûter », et même une phrase en anglais), puis le rédacteur la commente (« Recouverts veut dire
recouverts »). Le lecteur entend deux voix, dont une qui le vouvoie, et la consigne sonne comme une citation à
justifier.

**Fréquence.** 16, 23 et 31 ouvertures de guillemets ; au moins une citation de source dans une étape ou un tableau de
chaque chapitre.

**Exemples.**

- ch. 78, l. 116 à 117, étape 3 : « Ouvrir le livret de barèmes à la page de cet aliment-là, et lire le format de pot,
  le temps et la pression avant de commencer. «Ne modifiez jamais le temps de traitement thermique ou les niveaux de
  pression recommandés ». »
  - Réécriture : « 3. Ouvrir le livret de barèmes à la page de l'aliment, et lire le format de pot, le temps et la
    pression avant de commencer. Ne jamais changer le temps ni la pression du livret. »
- ch. 68, l. 124 à 125, étape 7 : « Frotter. «Les tissus musculaires exposés […] devraient être recouverts d'agents de
  salaison ». Recouverts veut dire recouverts : pas une saupoudrée, une couche. »
  - Réécriture : voir le défaut 3 (« Frotter la première part du mélange sur toute la viande à nu, en couche, pas en
    saupoudrant. »).
- ch. 78, l. 317 à 319, encadré de danger : « C'est aussi pourquoi une recette de marinade ne se modifie pas : «do not
  alter vinegar, food, or water proportions in a recipe or use a vinegar with unknown acidity » »
  - Réécriture : « C'est pour ça qu'il ne faut pas changer une recette de marinade : ni les proportions de vinaigre,
    d'aliment ou d'eau, ni le vinaigre pour un vinaigre dont on ne connaît pas l'acidité. »
- ch. 78, l. 247 et 259, tableaux : « Voir §7. «Évitez de goûter » » ; « Jeter. «Évitez de goûter aliment qui n'a pas un
  aspect normal, qui écume ou qui dégage une mauvaise odeur » » (il manque un article dans la citation : « goûter
  aliment »).
  - Réécriture : « Ne pas goûter ; voir les signes d'échec. » ; « Jeter sans goûter. »
- ch. 70, l. 218 à 220, étape 23 : « Congélateur, à -18 °C ou moins. Destination par défaut de ce livre, et c'est ce que
  fait le commerce : le poisson fumé «est souvent vendu congelé » avec la mention «Garder congelé jusqu'à utilisation ». »
  - Réécriture : « Le congeler à -18 °C ou moins : c'est la place par défaut. »
- ch. 68, l. 151, tableau du barème : « et «en aucun cas » moins de 4,4 jours/kg »
  - Réécriture : « et jamais moins de 4,4 jours par kilogramme »

**Cause.** Le cadre : « La source sert à vérifier un fait, jamais à copier une forme » ; CLAUDE.md : « La provenance ne
s'imprime pas » et « Une consigne d'institution ne se réécrit pas, elle se coupe » ; le skill `ecriture`, « Les
guillemets » : « Pas de citation de source ». Habitude : le rédacteur cite pour prouver au vérificateur que le fait est
sourcé, et la preuve reste dans le texte au lieu de vivre dans `suivi/NN-redaction.md`.

### 9. Le titre d'étape en image ou en notion, et la condition placée après le geste (moyenne)

**Ce que c'est.** Le titre de l'étape ne dit pas le geste (« Vérifier la porte d'entrée », « Vérifier qu'on a le droit
d'entrer », « La température de chambre », « Entrée d'air en bas, sortie en haut »), et la condition ou le chiffre qui
décide du geste arrive à la fin de la phrase, une fois le geste lu.

**Fréquence.** Une douzaine de titres d'étapes sans verbe ou en image dans le lot ; « si » placé après le geste dans 2,
4 et 1 étapes.

**Exemples.**

- ch. 68, l. 93 à 95, étape 1 : « Vérifier la porte d'entrée. La pièce vient d'une bête refroidie à 7 °C dans les
  24 premières heures. Si on ne peut pas l'affirmer, c'est non : la pièce va au ch. 78 ou à la poêle, pas au sel. Le sel
  n'assainit pas, il arrête. »
  - Réécriture : « 1. Vérifier que la bête a été refroidie à 7 °C dans les 24 heures après l'abattage. Si on ne peut
    pas l'affirmer, ne pas saler la pièce : la cuire, ou la mettre en pot (ch. 78). Le sel garde la viande dans l'état
    où il la trouve ; il ne rattrape pas une viande qui a commencé à se gâter. »
- ch. 78, l. 110 à 114, étape 2 : « Vérifier qu'on a le droit d'entrer. Pour la viande : la bête a été refroidie à 7 °C
  dans les 24 premières heures (ch. 61). Pour le poisson : il est sorti de l'eau et refroidi le jour même (ch. 75). La
  conserve ne réhabilite rien — elle scelle l'état dans lequel elle trouve l'aliment, et la chaleur qui tue une spore ne
  détruit pas une toxine déjà produite. »
  - Réécriture : « 2. Vérifier que la viande vient d'une bête refroidie à 7 °C dans les 24 heures (ch. 61), ou que le
    poisson a été refroidi le jour où il est sorti de l'eau (ch. 75). Sinon, ne pas le mettre en conserve : la chaleur
    tue la spore, mais elle ne détruit pas une toxine déjà produite. »
- ch. 70, l. 130 à 132, étape 8 : « Entrée d'air en bas, sortie en haut, registre réglable sur la sortie. Sans courant
  lent et continu, la surface reste humide et la fumée se condense en dépôt amer au lieu de se déposer en couche
  sèche. »
  - Réécriture : « 8. Faire l'entrée d'air en bas de la chambre et la sortie en haut, avec un registre sur la sortie
    pour régler le courant (planche 70-01). L'air doit passer lentement et sans arrêt : sinon la surface reste humide et
    la fumée y dépose un dépôt amer. »
- ch. 78, l. 174 à 176, étape 18 : « Monter à la pression du barème et la tenir : 70 kPa (10 lb) pour atteindre les
  116 °C, ou la valeur corrigée pour l'altitude si le lieu où on traite est au-dessus de 305 m. »
  - Réécriture : « 18. Monter à la pression du barème, 70 kPa (10 lb), pour atteindre 116 °C. Au-dessus de 305 m
    d'altitude, prendre la pression corrigée du livret. Partir le compte des minutes quand la pression est atteinte,
    pas quand on allume le feu. »
- ch. 70, l. 169 à 174, étape 14, la température de séchage dite en dernier, après le pourquoi : « Rincer ou faire
  tremper la pièce selon sa salaison (ch. 68, 69), éponger, puis la laisser au froid, à l'air libre et à découvert,
  jusqu'à ce que la surface soit sèche au doigt et légèrement collante. […] Le séchage se fait au froid, à 4 °C ou moins,
  pas sur le comptoir. »
  - Réécriture : « 14. Rincer la pièce, ou la faire tremper, selon sa salaison (ch. 68 ou 69), et l'éponger. La laisser
    ensuite à découvert, à 4 °C ou moins, jusqu'à ce que la surface soit sèche au doigt et un peu collante. Cette
    pellicule retient la fumée ; sur une surface mouillée, la fumée coule avec l'eau, et la surface tiède et mouillée
    fait pousser les bactéries. »
- ch. 78, l. 193, titre de sous-section : « 5.5 Après, et c'est là que ça se joue »
  - Réécriture : « 5.5 Refroidir, vérifier et ranger »

**Cause.** Skill `ecriture`, règle 3 (« La condition avant le geste ») et règle 4 ; cadre : « Les titres de
sous-sections sont des noms de gestes ou de choses, pas des maximes ». Habitude : le titre en gras est écrit comme un
titre de paragraphe d'essai, pour annoncer une idée, et non comme le geste qu'on cherche du doigt dans la page.

### 10. Le pourquoi en maxime au bout de l'étape, et la ligne de Matériel qui sermonne (moyenne à basse)

**Ce que c'est.** L'étape finit sur une formule qui redit la consigne en proverbe, ou qui la remplace ; la ligne de
Matériel dit le danger au lieu de dire ce que fait l'objet.

**Fréquence.** Une à deux par chapitre dans la procédure, plus dans la variante (« La fumée ment sur l'état de ce
qu'elle recouvre », ch. 70, l. 501).

**Exemples.**

- ch. 70, l. 93, étape 2 : « Dans le doute, c'est À CUIRE. Une étiquette n'a jamais tué personne. »
  - Réécriture : « Dans le doute, écrire À CUIRE. »
- ch. 68, l. 143 à 144, étape 11 : « C'est le geste qui distingue une salaison conduite d'une pièce oubliée dans une
  boîte. »
  - Réécriture : *(rien)*
- ch. 70, l. 192 à 193, étape 17 : « Une séance interrompue ne se paie qu'en goût ; une séance tiède se paie
  autrement. »
  - Réécriture : *(rien)* ; ou, si on veut garder le fait : « Interrompre une séance ne coûte que du goût. »
- ch. 78, l. 121 à 123, étape 4 : « Un poêle qui tombe à mi-course gâche la fournée entière, et une fournée gâchée est
  une fournée à jeter, pas à recommencer. Le bois se prépare avant, pas pendant. »
  - Réécriture : « Fendre et empiler tout le bois du cycle avant d'allumer : un poêle qui baisse à mi-course gâche la
    fournée entière. »
- ch. 78, l. 107 à 108, étape 1 : « Si l'aliment n'est dans aucune des deux listes, il est peu acide jusqu'à preuve du
  contraire, et la preuve n'est pas une impression. »
  - Réécriture : « Si l'aliment n'est dans aucune des deux listes, le traiter comme un aliment peu acide : autoclave. »
- ch. 70, l. 72, Matériel : « Bois franc sec, écorcé — ce qu'on brûle, on le mange : jamais de résineux vif, de bois
  traité ni d'épave. »
  - Réécriture : « **Bois franc sec, écorcé** : bouleau, érable, aulne ou cerisier ; sa fumée se dépose sur la viande
    (étape 11). » Même famille : « Barème écrit — […] ; ce chapitre n'en donne pas » (ch. 78, l. 92), qui parle du
    livre ; « Contenant qui égoutte — plastique, inox ou grès ; ni alu, ni galvanisé, ni cuivre » (ch. 68, l. 85), qui
    dit ce qui ne va pas avant ce qui va.

**Cause.** Skill `ecriture`, « La chute en formule » et le tableau des maximes ; cadre : « Pas de maxime ni de chute en
formule ». Skill `ecriture`, règle 8 (« Dire ce qui marche, pas ce qui ne marche pas ») pour le Matériel. Habitude :
le rédacteur ferme chaque étape comme on ferme un paragraphe de rédaction, par une phrase qui « résume ». Le script
relève peu de ces maximes (1 au ch. 70) : elles ne suivent pas le moule « Un X qui… ne… plus ».

## 3. Ce qui marche : des modèles

1. **ch. 78, l. 143 à 148, étapes 9 et 10.** « Chasser les bulles avec une spatule mince passée le long de la paroi,
   puis essuyer le rebord du pot avec un linge propre humide. Une goutte de gras ou un grain de sel sur le rebord suffit
   à rater un scellement. » et « Poser le couvercle neuf et visser l'anneau du bout des doigts, sans forcer. L'air doit
   pouvoir sortir pendant le traitement. Un anneau serré à la clé fait sauter des pots. »
   Pourquoi : le geste d'abord, avec l'outil et la façon (« avec une spatule mince passée le long de la paroi », « du
   bout des doigts »), deux gestes liés par « puis », et un pourquoi d'une phrase qui dit ce qu'on verrait sinon, avec
   des choses qu'on voit (« une goutte de gras ou un grain de sel »). Se lit en tenant le pot.
2. **ch. 78, l. 157 à 158, étape 13.** « Partir la minuterie quand l'eau bout franchement, pas avant. Le temps est celui
   de la recette. Si le bouillon s'arrête en cours de route, le compte repart à zéro. »
   Pourquoi : le moment est un repère qu'on voit (« quand l'eau bout franchement »), la condition est avant la
   conséquence, trois phrases courtes, aucun mot de trop. La seule retouche : « repartir le compte à zéro », pour que
   quelqu'un fasse le geste.
3. **ch. 78, l. 401 à 415, la variante « Tenir 116 °C sur un poêle à bois ».** « Fendre d'avance, au même calibre. Une
   brassée de bûchettes toutes pareilles, fendues, empilées à portée de main avant d'allumer. Des morceaux semblables
   ajoutés à intervalle régulier donnent une pression plate ; une grosse bûche donne une bosse, puis un creux. » […]
   « Corriger en déplaçant la marmite, pas en fermant l'air. Le dessus d'un poêle a un centre chaud et des bords tièdes :
   glisser la marmite vers le bord agit tout de suite. » […] « Deux personnes. Un qui nourrit et lit le manomètre, un
   qui prépare la fournée suivante. »
   Pourquoi : la débrouille en étapes numérotées, un geste par numéro, le mécanisme en une phrase qui sert le geste
   (« une grosse bûche donne une bosse, puis un creux »), et qui fait quoi. C'est la forme que les autres variantes du
   lot devraient prendre.
4. **ch. 68, l. 339 à 343, la pesée par substitution.** « Poser la pièce de viande sur le plateau de gauche. Verser du
   sable, du gravier ou de la neige tassée sur celui de droite jusqu'à l'équilibre […]. Retirer la viande, laisser le
   sable en place, puis verser de l'eau dans le même plateau de gauche, […] jusqu'à retrouver l'équilibre. La masse
   d'eau versée est la masse de la viande. »
   Pourquoi : des infinitifs dans l'ordre où on les fait, chacun avec son repère de fin (« jusqu'à l'équilibre »), la
   matière qu'on a sous la main (sable, gravier, neige tassée), et le résultat dit en une phrase. Il ne manque que les
   numéros, et le tiret à sortir.
5. **ch. 70, l. 137 à 138, étape 10.** « Essai à vide, sans viande, avant la première charge de la saison. Allumer et
   lire le thermomètre de chambre aux 15 minutes pendant deux heures. »
   Pourquoi : quand (avant la première charge de la saison), quoi (allumer, lire), à quel rythme et combien de temps,
   en deux phrases. Le titre gagnerait un verbe (« Faire un essai à vide »), et la phrase qui suit (« C'est cet essai qui
   dit si le montage tient, pas la première charge. ») peut sortir.

## 4. Pour le skill et les auditeurs

Ce que les trois chapitres montrent, au-delà des règles qui existent déjà :

- **Le tempo de la consigne, dans cet ordre** : la condition (« Si… », « Pour un poisson PRÊT-À-MANGER, »), le geste à
  l'infinitif, l'outil et la façon, le repère de fin (« jusqu'à ce que… », « tant que… »), puis le pourquoi en une
  phrase, avec « parce que », « sinon » ou « pour que » plutôt qu'un deux-points. Les cinq modèles ci-dessus le suivent ;
  les défauts 1, 2 et 9 le cassent.
- **Une part d'un tout se dit à l'étape où on la prend** (un tiers du mélange, la première moitié de l'eau). Un seuil qui
  déclenche un geste n'a qu'une valeur et qu'une étape. Aucune consigne ne vit seulement dans un tableau de contrôle.
- **La variante d'urgence s'écrit en étapes numérotées** dès qu'elle a plus de deux gestes, avec « Avant, une fois : »
  pour ce qui se prépare (le calibrage de la graisse témoin) ; ce qu'on perd vient après, en une ligne par perte.
- **Une citation de source n'entre jamais dans une étape ni dans un tableau** ; le vouvoiement des ministères
  (« Ne mangez pas », « Évitez », « Ne modifiez ») se redit à l'infinitif.
- **Ce qu'un script peut relever, à juger** : la part des phrases d'étape qui commencent par un geste (sous 50 %, relire
  l'étape) ; une étape de plus de 80 mots ou de plus de 4 phrases ; une étape sans aucun infinitif ; « se + verbe de
  geste » dans les étapes, les tableaux et la variante (`controle.py` n'a pas de section pour ça) ; une étape qui renvoie
  à « l'étape N » pour une part ou un seuil ; un seuil chiffré qui commande le même verbe (« éteindre », « jeter ») avec
  deux valeurs ; des guillemets dans une étape ; un paragraphe de variante de plus de 120 mots avec trois infinitifs ou
  plus ; un dessin de `images/planches-src/NN-*` que le chapitre NN n'appelle pas.

Hors de mon regard, vu en passant : « Le village n'en a aucun » (ch. 68, l. 11) et « Du village, c'est une ambulance »
(ch. 78, l. 306), alors que CLAUDE.md dit « jamais « village » » ; « deux adultes et deux enfants de 4 et 6 ans
(ch. 39) » (ch. 78, l. 308 à 309), l'âge des enfants de JP ; « Consulter » (ch. 70, l. 268, défaut 6) ; la phrase en
anglais (ch. 78, l. 318) ; « goûter aliment » sans article dans une citation (ch. 78, l. 259).

## 5. Liste de contrôle (cadre, parties « Pour tout agent », « Le texte » et « La langue »)

- [x] `CLAUDE.md` chargé, pas relu ; cadre lu au complet ; skill `ecriture` et gabarit lus au complet.
- [x] `suivi/plan-de-match.md` : aucun point sur les ch. 68, 70 et 78 (recherche par les numéros neufs et anciens :
  63, 65, 73).
- [x] Règle 1 : aucune réécriture n'ajoute un fait ni un chiffre ; une place marquée `[À VÉRIFIER]` (température de
  séchage, ch. 68, étape 15).
- [x] Rien de commité ; aucun fichier du livre modifié ; seul ce fichier de notes est écrit.
- [x] Lu seulement le lot, les règles et les mesures ; sorties de commande coupées.
- [ ] Sept sections : les trois chapitres sont encore à neuf ; noté, hors de mon regard.
- [x] Section 2 seulement quand l'utiliser, en titres de situation : défaut 5, titres proposés pour les trois.
- [ ] Série orange : aucune dans le lot, et c'est juste ; rien à juger.
- [x] Règle 0 : chaque réécriture relue à voix haute.
- [x] Pas de maxime ni de chute : défaut 10 ; aucune dans les réécritures.
- [x] Pas de chose qui pense : relevé en passant (« La fumée ment », « un appareil qui ne pardonne pas »).
- [x] Jamais au pronominal : défaut 4 ; réécritures à l'infinitif.
- [x] Consigne dite comme une consigne, ordre naturel, condition avant : défauts 4 et 9.
- [x] Points de contrôle et Signes d'échec à 5 à 8 lignes : défaut 6, lignes à garder proposées pour les ch. 68 et 78.
- [x] Un passage lourd se juge d'abord (doit-il exister ?) : six réécritures sont des coupes (étapes 4 et 20 du ch. 70,
  lignes de tableau, maximes).
- [x] Le chapitre parle de son sujet : étape 4 du ch. 70 (le salage) renvoyée au ch. 67 ; le poêle du ch. 78 gardé à
  une seule place.
- [x] Qui fait quoi, quand et pourquoi, sans détour : défauts 1, 2 et 7.
- [x] Le mot qu'on dit : « un peu collante », « a du mal à descendre », « sentir mauvais » dans les réécritures.
- [x] On nomme la chose au lieu du possessif (« le thermomètre de la chambre », « le compte des minutes »).
- [x] Aucun tiret ni « § » dans les réécritures.
- [x] Titres d'étapes : des gestes (défaut 9).
- [x] Étape à plusieurs gestes en sous-étapes, avec le repère de planche : défaut 2 (aucune planche appelée dans le
  lot).
- [x] Autre façon dite comme une autre façon : la méthode des Innus du ch. 70 réécrite en « Autre façon » (défaut 2).
- [x] L'urgence ne s'appuie pas sur une préparation : la graisse témoin est marquée « Avant, à la maison » (défaut 7).
- [x] Inventaire des faits : fait pour les chiffres de la consigne (défaut 3) ; l'inventaire complet revient au regard
  de la densité.
- [x] `controle.py` lancé sur les trois chapitres : 50, 62 et 60 tirets, 15, 3 et 12 « § », aucune section
  « pronominal ».
- [ ] `langue.py` : pas lancé, je n'écris aucun texte qui s'imprime ; les réécritures passeront au correcteur.
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures ; accords et « a / à » relus.
