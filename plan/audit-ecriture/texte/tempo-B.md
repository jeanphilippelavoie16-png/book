# Audit de l'écriture : le tempo, lot B (tome 1, ch. 2, 4 et 17)

28 octobre 2026. Un seul regard : le tempo, le texte lu à voix haute comme on l'expliquerait à quelqu'un dans un
garage. Lot : `chapitres/02-rester-ou-partir.md`, `chapitres/04-retombees-radioactives.md`,
`chapitres/17-qui-cogne-a-la-porte.md`, lus au complet. Aucun fichier du livre n'a été modifié ; les réécritures
ci-dessous sont des exemples, sans fait ni chiffre neuf, avec les renvois et les repères de planche gardés.

Point de départ : JP, sur le paragraphe du monoxyde (`dangers/partie-1.md`) : « le tempo du paragraphe est pas bon,
pi c'est vrai dans tout le livre ».

## 1. Les mesures

`python3 .claude/skills/ecriture/scripts/tempo.py chapitres/02-… chapitres/04-… chapitres/17-… --par-fichier`, puis la
même mesure sur les sept textes de `plan/audit-ecriture/references/` (fiches de l'Alberta, Ripley 1946, guide de
survie de Wikilivres, Hémon, Ringuet, Beaugrand, Millet-Robinet).

| texte | mots | m/phr | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 2 | 4955 | 19,6 | 15,0 | 22,6 | 46,6 | 34,4 | 6,3 | 10,7 | 4,6 | 5,2 |
| ch. 4 | 8053 | 21,5 | 24,3 | 21,1 | 38,9 | 29,9 | 4,8 | 18,0 | 4,5 | 2,9 |
| ch. 17 | 4630 | 21,6 | 22,4 | 23,0 | 36,9 | 30,4 | 4,3 | 13,6 | 5,0 | 2,8 |
| **le lot** | 17638 | 20,9 | 21,0 | 22,0 | **40,7** | **31,4** | 5,1 | **14,8** | **4,6** | 3,6 |
| les sept références | 17297 | 21,4 | 23,7 | 27,4 | 6,3 | 3,1 | 5,5 | 2,4 | 9,2 | 5,8 |
| fiches de l'Alberta | 2011 | 17,5 | 9,6 | 33,3 | 2,6 | 0,0 | 1,5 | 0,5 | 2,0 | 7,6 |
| Hémon, *Maria Chapdelaine* | 2723 | 19,9 | 21,9 | 24,3 | 8,8 | 4,4 | 11,0 | 0,0 | 14,7 | 1,5 |

Mesures ajoutées pour cet audit (script de travail dans le scratchpad, qui reprend les fonctions de `tempo.py` ;
une étape numérotée et une puce comptent chacune comme un paragraphe ; phrases de plus de 3 mots) :

| | ch. 2 | ch. 4 | ch. 17 | lot |
| --- | --- | --- | --- | --- |
| Phrases de plus de 3 mots | 246 | 373 | 204 | 823 |
| Paragraphes de 3 phrases et plus | 32 | 56 | 35 | 123 |
| … sans aucun lien parlé (parce que, donc, alors, puis, ensuite, mais, sinon, pour que, car, d'abord, après) | 13 | 19 | 14 | **46 (37 %)** |
| Paragraphes avec 2 phrases « fait : conséquence » ou plus | 17 | 22 | 16 | **55** |
| Phrases qui finissent sur « …, et » + un deuxième fait (il, elle, on, le, la, les, un, ce, ça…) | 22 | 51 | 27 | **100 (12 %)** |
| Phrases à deux deux-points | 6 | 2 | 5 | 13 |
| Renvois et repères entre parenthèses (étape, ch., section, repère, planche) | 49 | 130 | 56 | 235 |
| Titres d'étape en gras de 25 mots et plus | 0 sur 45 | 5 sur 35 | 4 sur 29 | 9 |
| Phrases qui commencent par « Sans » | 20 | 9 | 15 | 44 |

Les sections les plus chargées en deux-points (phrases à deux-points, puis « fait : conséquence ») : ch. 17,
« Éclairer sans se désigner » (71 % et 71 %) ; ch. 2, « Choisir : rester ou partir » (60 % et 60 %), « Savoir, quand
plus rien n'arrive » (70 % et 60 %), « Faire démarrer l'auto » (53 % et 53 %, avec 56 % de monotonie) ; ch. 17,
« Vérifier une histoire » (57 % et 57 %) ; ch. 4, « Ventiler la pièce d'abri » (49 % et 43 %, et 40 % de phrases de
30 mots et plus). La section 3 (Matériel) est à 75 à 100 % de deux-points par sa forme même.

### Ce que les chiffres disent

- **La longueur n'est pas le problème.** Le lot fait 20,9 mots par phrase, les références 21,4 ; il a moins de phrases
  de 30 mots et plus (21,0 % contre 23,7 %) et il est moins monotone par la longueur (22 % contre 27 %). Raccourcir les
  phrases ou « alterner courtes et longues » ne réglerait pas ce que JP entend.
- **Le problème, c'est la façon dont les phrases s'attachent.** Six fois plus de phrases à deux-points que dans les
  références (40,7 % contre 6,3 %), dix fois plus de « fait : conséquence » (31,4 % contre 3,1 %), deux fois moins de
  mots de liaison parlés (4,6 contre 9,2 pour 1000 mots), six fois plus de parenthèses (14,8 contre 2,4).
- **Lu à voix haute, le deux-points ne fait pas de son.** La voix s'arrête, puis repart sur un deuxième énoncé, et
  celui qui écoute doit deviner le lien : une cause, une conséquence, un exemple, une condition ? Quand presque chaque
  phrase est bâtie comme ça, toutes ont la même forme en deux temps, et c'est ce balancier que JP entend. Celui qui
  explique dans un garage dit « parce que », « donc », « alors », « sinon », « mais », « fait que » : le livre les a
  remplacés par un signe muet.
- **Les réécritures de la section 3, mesurées à leur tour** (`tempo.py` sur les 1900 mots réécrits) : 18,2 mots par
  phrase, 8,6 % de phrases à deux-points, 6,7 % en « fait : conséquence », 15,7 liaisons parlées pour 1000 mots. Les
  mêmes faits, les mêmes chiffres et les mêmes renvois, avec le mot de liaison à la place du deux-points : le texte
  passe du côté des références sans perdre un fait. `controle.py` : 0 tiret ; `langue.py` : les avis restants sont des
  mots du texte d'origine (povidone, Basedow) ou de faux positifs (« ce sont des poisons »).

## 2. Le même moule que le paragraphe du monoxyde

Le paragraphe que JP a pointé a cinq traits, et on les retrouve tous dans le lot :

1. une liste de cinq sujets avant le verbe (« Le poêle, le barbecue, le réchaud, le fanal et les moteurs font… ») :
   motif 5 ;
2. une phrase qui finit sur un ajout (« …, et le poêle en fait plus quand… ») : motif 3 ;
3. deux phrases de suite en « fait : conséquence », de même longueur, qui commencent toutes deux par « Il » : motifs 1
   et 9 ;
4. aucun mot de liaison sur quatre phrases : motif 2 ;
5. une fin sur ce qui ne marche pas (« se coucher par terre ne protège pas ») au lieu du geste : motif 7.

## 3. Les motifs, du plus grave au moins grave

### Motif 1. Le deux-points muet à la place du mot de liaison (« fait : conséquence ») (haute)

Le deux-points tient lieu de « parce que », « donc », « alors », « sinon », « si » ou « pour que ». À l'oral, il ne
s'entend pas : la phrase se casse en deux énoncés posés l'un à côté de l'autre, et la relation entre eux reste à
deviner. Répété phrase après phrase, il donne à tout le texte la même cadence en deux temps.

Fréquence : 40,7 % des phrases du lot ont un deux-points (ch. 2 : 46,6 % ; ch. 4 : 38,9 % ; ch. 17 : 36,9 %), contre
6,3 % dans les références ; 31,4 % sont en « fait : conséquence », contre 3,1 % ; liaisons parlées 4,6 pour 1000 mots,
contre 9,2.

| Où | Le texte | Réécrit |
| --- | --- | --- |
| ch. 17, l. 241 | « La diriger sur la neige : la lumière éclaire la personne par en dessous, mains comprises. Ne pas regarder sa propre lampe : on perdrait sa vision de nuit. » | « La diriger sur la neige, pour que la lumière éclaire la personne par en dessous, mains comprises. Ne pas regarder sa propre lampe, sinon on perd sa vision de nuit. » |
| ch. 2, l. 174 | « Elle dure plus de 72 h : rester, et continuer à mesurer. » / « Elle dure moins de 72 h : rester seulement avec un plan écrit pour faire durer ce qui va manquer en premier, avec ce qu'on a sur place. » / « Elle dure moins que le trajet : partir maintenant, ou décider de rester pour de bon. Si on attend, ce qu'elle mesure manquera avant qu'on arrive. » | « Si elle dure plus de 72 h, rester et continuer à mesurer. » / « Si elle dure moins de 72 h, rester seulement avec un plan écrit pour faire durer ce qui va manquer en premier, avec ce qu'on a sur place. » / « Si elle dure moins que le trajet, partir maintenant ou décider de rester pour de bon, parce que si on attend, ce qu'elle mesure va manquer avant qu'on arrive. » |
| ch. 2, l. 369 | « Une fois rentrée, elle peut aussi éclairer la maison, mais elle ne fera pas les deux : le démarrage passe avant. » | « Une fois rentrée, elle peut aussi éclairer la maison, mais elle ne fera pas les deux, alors on la garde d'abord pour le démarrage. » |
| ch. 2, l. 384 | « Prendre l'isopropylique **à 99 %** : celui à 70 % contient 30 % d'eau, et il en ajouterait au réservoir. » | « Prendre l'isopropylique **à 99 %**. Celui à 70 % contient 30 % d'eau, donc il en ajouterait au réservoir. » |
| ch. 4, l. 477 | « Ses volets se ferment quand on tire et s'ouvrent au retour : l'air avance dans un seul sens. » | « Ses volets se ferment quand on tire et s'ouvrent au retour, donc l'air avance toujours dans le même sens. » |

Cause :
- Skill `ecriture`, règle 2 : « **Le fait d'abord, la raison ensuite**… « Vidanger avant que la maison descende sous
  5 °C : un tuyau plein fend en gelant. » » Le seul modèle donné pour dire une raison est un deux-points.
- Le tiret : « Aucun tiret… Le livre en avait 5 665. Selon le cas : la virgule ; les deux-points : « Une seule règle :
  la génératrice dehors. » ; les parenthèses ; le point ; la réécriture » (skill `ecriture`), et CLAUDE.md : « Pas de
  tiret (— ou –) dans une phrase : virgule, deux-points, parenthèses ou point. » Aucune des deux listes ne nomme le mot
  de liaison : les milliers de tirets sont devenus des deux-points.
- Le format du Matériel (gabarit : « le nom en gras, puis ce qu'il fait ») a déteint sur la prose des étapes.
- La liste des mots vides (« en effet, ainsi, d'ailleurs ») et « jamais « d'où » » ont enlevé les liaisons écrites
  sans nommer les liaisons parlées qui les remplacent.
- La règle 10 (« La phrase garde ses articles et ses liaisons ») existe, mais rien ne la mesure : `controle.py`
  compte les tirets, pas les deux-points.

### Motif 2. Le paragraphe-chapelet : des faits posés côte à côte, sans lien (haute)

Chaque phrase part sur un nouveau sujet et s'arrête. On reçoit cinq faits justes et il faut reconstruire soi-même
lequel explique lequel, et lequel commande le geste. À voix haute, la voix retombe à chaque point à la même hauteur ;
rien n'annonce la phrase suivante. C'est le paragraphe du monoxyde : quatre phrases, aucun lien.

Fréquence : 46 des 123 paragraphes de trois phrases et plus (37 %) n'ont aucun mot de liaison parlé (ch. 2 : 13 sur
32 ; ch. 4 : 19 sur 56 ; ch. 17 : 14 sur 35) ; 55 paragraphes ont deux phrases « fait : conséquence » ou plus.
L'étape 12 du ch. 4 en a dix de suite (14, 10, 24, 32, 6, 28, 15, 11, 18 et 4 mots), sans un seul lien.

| Où | Le texte | Réécrit |
| --- | --- | --- |
| ch. 4, l. 120 | « Le comprimé ne protège que la thyroïde, et contre l'iode seulement : il ne fait rien contre le césium, le strontium ni le rayonnement de la poussière, et il ne soigne pas l'irradiation. Aucun autre iode ne le remplace. La teinture d'iode, la povidone iodée (Bétadine) et les comprimés d'iode pour désinfecter l'eau sont des poisons quand on les avale, et ils ne protègent pas la thyroïde. Étendus sur la peau, ils protègent moins que le comprimé et peuvent faire du mal. On peut boire l'eau qu'ils ont désinfectée (ch. 10, étape 23). Le sel iodé et les suppléments d'iode en contiennent beaucoup trop peu, et en avaler beaucoup rend malade. » | « Le comprimé protège seulement la thyroïde, et seulement contre l'iode : il ne fait rien contre le césium, le strontium ni le rayonnement de la poussière, et il ne soigne pas l'irradiation. Mais aucun autre iode ne le remplace. Ne pas avaler de teinture d'iode, de povidone iodée (Bétadine) ni de comprimés d'iode pour désinfecter l'eau, parce que ce sont des poisons et qu'ils ne protègent pas la thyroïde. Étendus sur la peau, ils protègent moins que le comprimé, et ils peuvent faire du mal. On peut quand même boire l'eau qu'ils ont désinfectée (ch. 10, étape 23). Le sel iodé et les suppléments d'iode ne le remplacent pas non plus : ils en contiennent beaucoup trop peu, et en avaler beaucoup rend malade. » |
| ch. 4, l. 237 | « **Rester à l'abri 24 heures, sauf en cas de feu, de fuite de gaz, d'effondrement ou de blessure grave.** Environ 80 % de la dose qu'on recevrait dehors arrive le premier jour. Rester jusqu'à 48 heures si la radio n'annonce pas que le rayonnement baisse dans le secteur, ou si l'électroscope (section 7) ne montre pas la baisse. » | « **Rester à l'abri 24 heures, sauf en cas de feu, de fuite de gaz, d'effondrement ou de blessure grave.** On reste tout ce temps parce qu'environ 80 % de la dose qu'on recevrait dehors arrive le premier jour. Après ces 24 heures, si la radio n'annonce pas que le rayonnement baisse dans le secteur, ou si l'électroscope (section 7) ne montre pas la baisse, rester jusqu'à 48 heures. » |
| ch. 2, l. 250 | « Ne pas partir à pied chercher de l'aide : l'auto coupe le vent, et on la voit de loin. Allumer les feux de détresse, et la lumière intérieure la nuit pour être vu ; bouger pour ne pas s'endormir. Faire tourner le moteur et dégager l'échappement comme à l'étape 3. N'allumer ni chandelle ni réchaud dans l'auto : leur flamme fait du monoxyde, qui monte vite dans un si petit volume. Pour garder la chaleur et sortir l'auto de la neige : ch. 15. » | « Ne pas partir à pied chercher de l'aide, parce que l'auto coupe le vent et qu'on la voit de loin. Allumer les feux de détresse, et la nuit, la lumière intérieure, pour être vu. Bouger pour ne pas s'endormir. Faire tourner le moteur et dégager l'échappement comme à l'étape 3, mais n'allumer ni chandelle ni réchaud dans l'auto : leur flamme fait du monoxyde, et dans un si petit volume, il monte vite. Pour garder la chaleur et sortir l'auto de la neige : ch. 15. » |
| ch. 17, l. 306 | « Couché ou assis, le corps perd plus de chaleur par le sol que par l'air. Mettre un lit épais de branches de sapin baumier croisées, un vieux matelas de mousse, des planches ou un tapis de traîneau entre la personne et la neige : ça compte plus qu'une couverture posée sur elle. Une personne qui a les signes de l'étape 7 doit rester couchée sur ce lit, pas assise (étape 8). » | « Couché ou assis, le corps perd plus de chaleur par le sol que par l'air, donc ce qu'on met sous la personne compte plus qu'une couverture posée sur elle. Mettre un lit épais de branches de sapin baumier croisées, un vieux matelas de mousse, des planches ou un tapis de traîneau entre elle et la neige. Si elle a les signes de l'étape 7, elle doit rester couchée sur ce lit, pas assise (étape 8). » |

Cause :
- Skill `ecriture`, règle 1 : « **Une phrase, une information.** Deux faits, deux phrases. » Elle dit de séparer, et
  jamais comment relier les deux phrases.
- Le tableau « Ce qui sort » (« La justification collée au geste », « La conséquence évidente d'un fait qu'on vient
  de dire ») et les passes de coupe : « La passe a mesuré le nombre de mots. À force de couper, le texte est devenu un
  code » (relecture du 15 octobre). Les propositions de liaison partent les premières quand on coupe.
- Le remède existe, mais caché dans une ligne de tableau sur la section 3 du ch. 3 : « on passe d'un mécanisme à
  l'autre par un lien qui se lit (« ensuite », « de même », ou un nouvel alinéa) ». Ce n'est pas une règle de la
  phrase, et rien ne la mesure.
- CLAUDE.md : « Un mécanisme qui apprend quelque chose va dans l'étape qu'il explique. » Les mécanismes sont venus
  s'empiler après le geste, chacun en phrase isolée.

### Motif 3. La phrase qui finit sur un ajout : « …, et » + un deuxième fait (haute)

La phrase dit un fait, la voix descend à la virgule comme à la fin, puis il faut repartir avec un nouveau sujet pour un
deuxième fait, souvent celui qui compte le plus. Répété dans deux ou trois phrases de suite, le paragraphe boite.
C'est la première phrase du monoxyde (« …, et le poêle en fait plus quand… »).

Fréquence : 100 phrases sur 823 (12 %) ; ch. 4 : 51, ch. 17 : 27, ch. 2 : 22. Dans la série orange « Un éclair
aveuglant » (30 s), trois phrases de suite.

| Où | Le texte | Réécrit |
| --- | --- | --- |
| ch. 4, l. 45 | « Le souffle de la détonation suit l'éclair : au-delà de quelques kilomètres, il avance d'environ 1,6 km toutes les 5 secondes, soit 3 secondes par kilomètre, et il met de quelques secondes à plus de 30 secondes à arriver. Il casse les vitres à des kilomètres, et le verre blesse les gens qui sont derrière. Pendant ce délai, on a le réflexe d'aller voir à la fenêtre, et on s'y blesse. » | « Le souffle de la détonation arrive de quelques secondes à plus de 30 secondes après l'éclair. Au-delà de quelques kilomètres, il avance d'environ 1,6 km toutes les 5 secondes, soit 3 secondes par kilomètre. Il casse les vitres à des kilomètres. Pendant ce délai, on a le réflexe d'aller voir à la fenêtre, et on se fait blesser par le verre. » |
| ch. 4, l. 63 | « Après une détonation, les retombées mettent 10 minutes ou plus à arriver, et les premières heures comptent le plus : la poussière radioactive donne plus de la moitié de son rayonnement dans la première heure. » | « Après une détonation, les retombées mettent 10 minutes ou plus à arriver. Les premières heures comptent le plus, parce que la poussière radioactive donne plus de la moitié de son rayonnement dans la première heure. » |
| ch. 17, l. 114 | « Si l'adulte va la chercher pendant la conversation, le visiteur le voit se retourner, et il peut agir le premier, avant que l'adulte revienne. Devant une arme montrée, il ne sait pas si elle est chargée, et il réagit comme si elle l'était, sans qu'on puisse prévoir comment. Il apprend aussi qu'il y a une arme dans la maison, et jusqu'où la famille est prête à aller. » | « Si l'adulte va la chercher pendant la conversation, le visiteur le voit se retourner et peut agir le premier, avant que l'adulte revienne. Devant une arme qu'on lui montre, le visiteur ne sait pas si elle est chargée, alors il réagit comme si elle l'était, et on ne peut pas prévoir comment. En plus, il sait maintenant qu'il y a une arme dans la maison, et jusqu'où la famille est prête à aller. » |
| ch. 4, l. 256 | « Le césium radioactif met 30 ans à perdre la moitié de sa force, et les champignons en prennent dans le sol plus que les plantes, année après année (ch. 93). » | « Le césium radioactif met 30 ans à perdre la moitié de sa force. Pendant tout ce temps, les champignons en prennent dans le sol plus que les plantes, année après année (ch. 93). » |
| ch. 2, l. 59 | « Faire tourner le moteur une dizaine de minutes par période de 30 minutes, et dégager l'échappement avant chaque redémarrage : la neige que le vent accumule derrière l'auto rebouche le tuyau pendant qu'on est assis dedans, et le monoxyde entre alors par le plancher. » | « Faire tourner le moteur une dizaine de minutes par période de 30 minutes. Avant chaque redémarrage, dégager l'échappement de nouveau, parce que la neige que le vent accumule derrière l'auto rebouche le tuyau pendant qu'on est assis dedans, et le monoxyde entre alors par le plancher. » |
| ch. 4, l. 139 | « Passé 40 ans, le risque d'un cancer de la thyroïde causé par l'iode radioactif est faible, le risque d'une mauvaise réaction au comprimé augmente, et le comprimé ne sert que si la thyroïde risque une très forte dose, assez forte pour la détruire. » | « Passé 40 ans, le comprimé sert seulement si la thyroïde risque une très forte dose, assez forte pour la détruire. À cet âge, le risque d'un cancer de la thyroïde causé par l'iode radioactif est faible, mais le risque d'une mauvaise réaction au comprimé augmente. » |

Cause : une habitude d'écriture, et la plus visible des textes de machine : coordonner par « , et » au lieu de finir la
phrase, là où le tiret servait avant à accrocher une remarque. La règle 1 (« Deux faits, deux phrases ») le défend,
mais aucune règle ne dit sur quoi une phrase doit finir (sur le mot qui compte) ; le tableau « La chute en formule »
dit seulement ce qu'elle ne doit pas être.

### Motif 4. La phrase-fleuve en cascade : points-virgules et deux-points emboîtés (moyenne)

Ce n'est pas la longueur qui accroche (le lot a moins de phrases de 30 mots et plus que les références), c'est la
construction : des données et des conditions agrafées par « ; » et « : », un deux-points dans une liste qu'un
deux-points ouvre déjà, sans un mot qu'on dirait pour passer de l'une à l'autre. Lue à voix haute, on perd le fil
avant la fin, et on ne sait plus à quoi se rattache le dernier morceau.

Fréquence : 13 phrases à deux deux-points ; la plus longue du lot fait 96 mots (ch. 4, l. 210) ; la section « Les
heures d'abri » du ch. 4 a 32,6 % de phrases de 30 mots et plus.

| Où | Le texte | Réécrit |
| --- | --- | --- |
| ch. 4, l. 210 | « Ce qui pousse à rester : les retombées d'une détonation sont arrivées depuis peu, et à la première heure après l'explosion, le rayonnement dehors est environ dix fois plus fort qu'à la septième (étape 4) ; le panache passe encore, et dans la maison fermée, on respire beaucoup moins d'iode radioactif que dehors, ce qui compte surtout pour les personnes qui n'ont pas pris de comprimé d'iode (étape 12 ; section 7, « Sans comprimés d'iode ») ; une fois la source éliminée, tout le monde est réveillé et répond ; l'abri est un sous-sol ou le caveau, qui protège beaucoup (étape 8). » | Une liste de quatre lignes, chacune en phrases complètes : « Ce qui pousse à rester : » / « Les retombées d'une détonation sont arrivées depuis peu. À la première heure après l'explosion, le rayonnement dehors est environ dix fois plus fort qu'à la septième (étape 4). » / « Le panache passe encore. Dans la maison fermée, on respire beaucoup moins d'iode radioactif que dehors, ce qui compte surtout pour les personnes qui n'ont pas pris de comprimé d'iode (étape 12 ; section 7, « Sans comprimés d'iode »). » / « Une fois la source éliminée, tout le monde est réveillé et répond. » / « L'abri est un sous-sol ou le caveau, qui protège beaucoup (étape 8). » |
| ch. 2, l. 340 | « Le code sol-air est international : **V** pour « besoin d'aide », **X** pour « besoin de soins médicaux », chaque signe d'**au moins 2,4 m** de long, dans une matière qui tranche sur le terrain : des branches de sapin sur la neige, de la neige piétinée jusqu'au sol. » | « Le code sol-air est international : **V** veut dire « besoin d'aide », et **X**, « besoin de soins médicaux ». Chaque signe doit faire **au moins 2,4 m** de long, dans une matière qui tranche sur le terrain, comme des branches de sapin sur la neige, ou de la neige piétinée jusqu'au sol. » |
| ch. 2, l. 185 | « l'heure de rétablissement prévue par Hydro-Québec a été repoussée deux fois : on ne connaît plus le délai, même si la maison est encore habitable ; » | « l'heure de rétablissement prévue par Hydro-Québec a été repoussée deux fois, donc on ne connaît plus le délai, même si la maison est encore habitable ; » |
| ch. 4, l. 595 | « Prendre, dans cet ordre, du moins exposé au plus exposé : les conserves et les réserves fermées d'avant l'événement ; les animaux de petit élevage nourris de grain entreposé à l'intérieur (ch. 101) ; le poisson du fleuve plutôt que celui d'un lac de tête ; le gibier trempé et bouilli, bouillon jeté. » | « Prendre la viande du moins exposé au plus exposé : d'abord les conserves et les réserves fermées d'avant l'événement, puis les animaux de petit élevage nourris de grain entreposé à l'intérieur (ch. 101), puis le poisson du fleuve plutôt que celui d'un lac de tête, et en dernier le gibier trempé et bouilli, bouillon jeté. » |
| ch. 2, l. 145 | « Dans des maisons sans chauffage, mesurées par environ −8 °C dehors, l'air est passé de 20 à 14 °C dans les premières heures, puis il a baissé beaucoup plus lentement : l'écart avec le dehors avait diminué, et le béton, le gypse, les meubles et la terre autour du sous-sol rendaient leur chaleur lentement. » | « Dans des maisons sans chauffage, mesurées par environ −8 °C dehors, l'air est passé de 20 à 14 °C dans les premières heures. Ensuite, il a baissé beaucoup plus lentement, parce que l'écart avec le dehors avait diminué et que le béton, le gypse, les meubles et la terre autour du sous-sol rendaient leur chaleur peu à peu. » |

Cause : le tiret enlevé sans remplacement parlé (motif 1) ; la règle 1 appliquée à l'envers (on garde tout dans une
phrase et on la coud au point-virgule pour ne pas « répéter le sujet ») ; et aucune règle ne dit qu'un deux-points
n'en suit pas un autre dans la même phrase. La règle `ou-repete` du skill `langue` (section 10) existe pour les
« ou » ; il n'y a pas son équivalent pour « : » et « ; ».

### Motif 5. La liste dans la phrase : avant le verbe, ou emboîtée (moyenne)

Quand la liste vient avant le verbe, celui qui écoute garde cinq choses en tête sans savoir ce qui va leur arriver ;
le verbe tombe à la fin, essoufflé. Quand une liste en contient une autre (une parenthèse de noms dans une série de
noms), la voix ne sait plus où elle est. C'est l'attaque du paragraphe du monoxyde.

Fréquence : relevé à la lecture, sans mesure automatique ; trois exemples nets dans le lot, et la même construction
revient dans les étapes à conditions (« Même quand…, que… et que…, … »).

| Où | Le texte | Réécrit |
| --- | --- | --- |
| ch. 4, l. 226 | « Au chalet, un puits tubé et fermé est protégé ; un lac, un ruisseau, un baril de pluie, la neige qui était au sol quand les retombées sont tombées et la neige tombée pendant le passage ne le sont pas. » | « Au chalet, un puits tubé et fermé est protégé. Un lac, un ruisseau et un baril de pluie ne le sont pas, pas plus que la neige qui était au sol quand les retombées sont tombées et celle qui est tombée pendant le passage. » |
| ch. 4, l. 161 | « Ne pas en donner à une personne allergique à l'iode, ou qui a une maladie de la thyroïde (maladie de Basedow, nodules, thyroïdite de Hashimoto), une dermatite herpétiforme ou une vascularite hypocomplémentémique : le comprimé peut déclencher chez elle une crise de la thyroïde ou une réaction allergique grave[^1]. » | « Ne pas en donner à une personne allergique à l'iode. Ne pas en donner non plus à une personne qui a une maladie de la thyroïde (maladie de Basedow, nodules, thyroïdite de Hashimoto), une dermatite herpétiforme ou une vascularite hypocomplémentémique. Chez ces personnes, le comprimé peut déclencher une crise de la thyroïde ou une réaction allergique grave[^1]. » |
| ch. 2, l. 216 | « Même quand le bâtiment tient, que le bois est cordé et que le congélateur est plein, les réserves baissent chaque jour sans qu'aucun événement oblige à décider. » | « Les réserves baissent chaque jour sans qu'aucun événement oblige à décider, même quand le bâtiment tient, que le bois est cordé et que le congélateur est plein. » |

Cause : la règle 3 (« La condition avant le geste ») appliquée à des conditions en série, qui retardent le verbe ;
l'habitude de compter juste (on énumère tout pour ne rien oublier) ; aucune règle sur la place du verbe ni sur le
nombre de choses qu'une oreille peut porter avant lui.

### Motif 6. Le titre d'étape en gras qui porte tout le paragraphe (moyenne)

Le gras est ce qu'on lit en premier en feuilletant ; c'est l'attaque de l'étape. Quand il porte la condition,
l'exception, la liste et le détail, il fait 30 à 45 mots d'un seul souffle, sans point où se poser, et la suite de
l'étape n'a plus rien à dire de neuf.

Fréquence : 9 titres en gras de 25 mots et plus (ch. 4 : 5 sur 35 étapes, dont l'étape 11 à 37 mots ; ch. 17 : 4 sur
29, dont l'étape 21 à 45 mots) ; le ch. 2 n'en a aucun sur 45 (médiane de 10 mots), ce qui montre que c'est faisable.

| Où | Le texte | Réécrit |
| --- | --- | --- |
| ch. 4, l. 113 | « **Écrire au crayon l'heure de l'éclair ou de l'alerte sur le cadre de la porte de l'abri, et dessous, l'heure où les retombées ont commencé à tomber ou celle que la radio donne pour l'arrivée du panache.** On compte les 24 heures d'abri à partir de l'éclair, et le délai de l'iode à partir de l'arrivée des retombées ou du panache (étape 14). » | « **Écrire deux heures au crayon sur le cadre de la porte de l'abri.** Écrire l'heure de l'éclair ou de l'alerte en haut. Dessous, écrire l'heure où les retombées ont commencé à tomber, ou celle que la radio donne pour l'arrivée du panache. On compte les 24 heures d'abri à partir de la première, et le délai de l'iode à partir de la deuxième (étape 14). » |
| ch. 17, l. 153 | « **Refuser poliment deux aliments qu'on reçoit en échange : une conserve maison faite d'une façon qu'on ne connaît pas, et un poisson fumé dont on ne sait pas s'il a été gardé à 4 °C ou moins depuis le fumage, et pendant 14 jours au plus.** » | « **Refuser poliment deux aliments qu'on reçoit en échange.** Le premier, c'est une conserve maison faite d'une façon qu'on ne connaît pas. Le deuxième, c'est un poisson fumé, sauf si on sait qu'il a été fumé il y a 14 jours au plus, et gardé à 4 °C ou moins depuis. » |
| ch. 17, l. 121 | « **À tout moment, si le visiteur montre une arme, menace ou force la porte : arrêter de parler, emmener tout le monde dans la pièce du fond, bloquer la porte de cette pièce de l'intérieur et y rester.** » | « **Si le visiteur montre une arme, menace ou force la porte, arrêter de parler.** Ça vaut à tout moment de la visite. Emmener tout le monde dans la pièce du fond, bloquer la porte de cette pièce de l'intérieur et y rester. » |
| ch. 4, l. 245 | « **Ne pas jardiner ni laisser jouer les enfants aux endroits où la pluie amène la poussière ; l'hiver, ne pas les laisser jouer dans la neige qui a reçu les retombées (étape 22).** » | « **Ne pas jardiner ni laisser jouer les enfants là où la pluie amène la poussière.** L'hiver, ne pas les laisser jouer non plus dans la neige qui a reçu les retombées (étape 22). » |
| ch. 17, l. 99 | « **Si on refuse, le dire une seule fois, sans se justifier et sans mentir, en disant à la personne où aller, à quelle distance, et comment s'y rendre.** » | « **Si on refuse, le dire une seule fois, sans se justifier et sans mentir.** Dire en même temps à la personne où aller, à quelle distance c'est, et comment s'y rendre. » |

Cause : le gabarit ne fixe aucune longueur à l'étape (« Étapes numérotées », section 5) ; la règle 3 (« La condition
avant le geste ») met la condition en tête du gras ; le cadre (« Une étape qui a plusieurs gestes se découpe en
sous-étapes ») vise le corps de l'étape, pas son titre.

### Motif 7. Le paragraphe qui n'avance pas et ne finit pas (moyenne)

Un paragraphe parlé va quelque part : le geste, comment, pourquoi, et il se pose sur le geste ou sur le fait qui le
commande. Ici, la raison est souvent loin du geste qu'elle explique, une autre consigne arrive en dernier comme un
oubli, ou l'étape finit sur une étiquette de renvoi de quatre mots (« Sans radio : section 7. ») qui se lit comme un
code.

Fréquence : six étapes ou paragraphes finissent sur une étiquette de renvoi (ch. 4, l. 125 et 172 ; ch. 17, l. 54, 96
et 265 ; ch. 2, l. 254) ; les fins sur un ajout se relèvent à la lecture, une dizaine dans le lot.

| Où | Le texte | Réécrit |
| --- | --- | --- |
| ch. 17, l. 67 | « Lui nommer un repère qu'il voit, à plus de 2 m de la porte : le bas de l'escalier, le baril, l'auto, ou le poteau planté d'avance pour ça (étape 25). « Reculez » ne lui dit pas jusqu'où. Les virus respiratoires passent d'une personne à l'autre à moins de 2 m, quand le contact dure plus de 15 minutes. Ne pas se présenter, ne pas s'expliquer, et poser une seule question à la fois. » | « Lui nommer un repère qu'il voit, à plus de 2 m de la porte : le bas de l'escalier, le baril, l'auto ou le poteau planté d'avance pour ça (étape 25). « Reculez » ne lui dit pas jusqu'où. On garde ces 2 m parce que les virus respiratoires passent d'une personne à l'autre à moins de 2 m, quand le contact dure plus de 15 minutes. Ensuite, poser une seule question à la fois, sans se présenter et sans s'expliquer. » |
| ch. 4, l. 80 | « **Ne pas ressortir chercher quelqu'un.** Un enfant qui est à l'école ou à la garderie doit y rester : l'école a un plan pour garder les enfants à l'abri, et un bâtiment de béton ou de brique les protège mieux qu'une maison de bois. Aller le chercher expose l'enfant et la personne qui y va. On se retrouve après l'abri. Rentrer les animaux qui sont à portée, sans aller les chercher loin. » | « **Ne pas ressortir chercher quelqu'un.** Rentrer les animaux qui sont à portée, sans aller les chercher loin. Un enfant qui est à l'école ou à la garderie doit y rester, parce que l'école a un plan pour garder les enfants à l'abri, et qu'un bâtiment de béton ou de brique les protège mieux qu'une maison de bois. Aller le chercher expose l'enfant et la personne qui y va. On se retrouve après l'abri. » |
| ch. 17, l. 267 | « Le contrefort tient plus que la barre et ne demande qu'une perche d'épinette, coupée à la bonne longueur et appuyée en biais sous la poignée (repère 8), le pied calé dans une encoche taillée dans le plancher ou contre un bloc vissé au plancher (repère 9). Quand quelqu'un donne un coup d'épaule dans la porte, la perche travaille en compression, et une perche d'épinette résiste bien à la compression. Pour une fenêtre coulissante, couper un bâton à la longueur du rail et le poser dans le rail. » | Les deux premières phrases inchangées, puis un nouvel alinéa pour la fenêtre : « Pour une fenêtre coulissante, couper un bâton à la longueur du rail et le poser dans le rail. » |
| ch. 4, l. 172 | « **Ouvrir une radio à piles ou à manivelle dans l'abri, et la laisser ouverte.** On y apprend où va le panache, s'il y a un deuxième rejet et quand l'abri finit. Sans radio : section 7. » | « **Ouvrir une radio à piles ou à manivelle dans l'abri, et la laisser ouverte.** On y apprend où va le panache, s'il y a un deuxième rejet et quand l'abri finit. Sans radio à piles, on peut monter le poste de l'auto dans l'abri, ou faire un poste à galène (section 7). » |

Cause : CLAUDE.md (« Chaque chapitre parle de son sujet… ici, il reste un renvoi court ») et le format du Matériel
(« sans radio : section 7 ») ont fait du renvoi une phrase à lui seul, posée en dernier ; le cadre fixe l'ordre d'une
sous-étape (« le geste, où est la chose et comment la reconnaître, ce qu'on voit quand c'est fait ») mais aucune
règle ne dit où va la raison (juste après le geste qu'elle explique) ni sur quoi le paragraphe finit.

### Motif 8. Les renvois et les repères entre parenthèses qui coupent la phrase (basse)

Les renvois et les repères sont obligatoires (cadre, CLAUDE.md) ; le problème est leur place. Au milieu d'une phrase,
surtout avec un titre de section entre guillemets, la parenthèse fait un détour assez long pour qu'on perde le verbe.
Quatre repères dans une phrase la hachent en morceaux de cinq mots.

Fréquence : 14,8 parenthèses pour 1000 mots dans le lot (ch. 4 : 18,0), contre 2,4 dans les références ; 235 renvois
et repères entre parenthèses dans les trois chapitres.

| Où | Le texte | Réécrit |
| --- | --- | --- |
| ch. 17, l. 75 | « Si elle a un seul de ces signes, l'amener couchée, sans la faire marcher, jusque dans la maison ou dans un abri dehors (section 7, « Réchauffer quelqu'un sans le faire entrer ») : la porter, ou la tirer sur un traîneau, à défaut sur une couverture. » | « Si elle a un seul de ces signes, l'amener couchée jusque dans la maison ou dans un abri dehors, sans la faire marcher (l'abri dehors : section 7, « Réchauffer quelqu'un sans le faire entrer »). La porter ou la tirer sur un traîneau, sinon sur une couverture. » |
| ch. 4, l. 607 | « Pour le costume de sortie, porter des lunettes de ski (repère 9) et un poncho à capuchon taillé dans un sac à ordures (repère 10), rubaner serré les poignets et les chevilles (repère 11), et mettre des bottes de caoutchouc (repère 12). » | « Pour le costume de sortie, porter des lunettes de ski (repère 9) et un poncho à capuchon taillé dans un sac à ordures (repère 10). Serrer les poignets et les chevilles avec du ruban (repère 11), puis mettre des bottes de caoutchouc (repère 12). » |
| ch. 2, l. 22 | « **Feu ou tempête annoncé, avec le temps de choisir** (étapes 25 à 42, et pour le feu, étape 37 ; pour se préparer : ch. 7). » | « **Feu ou tempête annoncé, avec le temps de choisir** (étapes 25 à 42, et l'étape 37 pour le feu ; ch. 7 pour se préparer). » |

Cause : le cadre (« chaque sous-étape renvoie au repère de sa planche, dans l'ordre des repères ») et CLAUDE.md
(« Chaque planche est appelée dans le texte ») disent qu'il faut le renvoi, jamais où le mettre dans la phrase.

### Motif 9. L'attaque répétée et le titre redit (basse)

Globalement, le lot ne répète pas son premier mot plus que les références (3,6 % contre 5,8 %) ; le défaut est
concentré. Dans les variantes d'urgence, le « Sans… » des titres de puce passe dans la prose ; un intertitre en
italique est suivi d'une phrase qui le redit ; deux consignes de suite partent du même verbe. À l'oral, c'est une
litanie, et la deuxième phrase sonne comme une redite même quand elle apprend quelque chose.

Fréquence : 44 phrases commencent par « Sans » (ch. 2 : 20 sur 253 ; ch. 17 : 15 sur 214 ; ch. 4 : 9 sur 375).

| Où | Le texte | Réécrit |
| --- | --- | --- |
| ch. 2, l. 301 | « **Sans électricité, sans réseau cellulaire, sans satellite et sans radio qui capte : présumer le pire.** Sans information, la route est peut-être coupée et personne ne sait qu'on est là. » | « **Quand il n'y a plus d'électricité, de réseau cellulaire, de satellite ni de radio qui capte, présumer le pire.** La route est peut-être coupée, et personne ne sait qu'on est là. » |
| ch. 2, l. 350 | « Sans information neuve, choisir l'option qu'on pourra le plus facilement défaire : l'hiver, avec de jeunes enfants et une auto dont on ne peut pas garantir le trajet, c'est presque toujours rester là où on est. Sans information, ne pas partir pour le chalet : on ne peut plus chiffrer le trajet. » | « Sans information neuve, choisir l'option qu'on pourra le plus facilement défaire. L'hiver, avec de jeunes enfants et une auto dont on ne peut pas garantir le trajet, c'est presque toujours rester là où on est. Et ne pas partir pour le chalet, parce qu'on ne peut plus chiffrer le trajet. » |
| ch. 4, l. 399 | « *Le poste à galène, quand il n'y a plus de pile.* Le poste à galène ne prend aucune pile : il marche avec l'énergie de l'onde radio. Il a cinq pièces. » | « *Le poste à galène, quand il n'y a plus de pile.* Il marche avec l'énergie de l'onde radio, sans aucune pile. On le monte avec cinq pièces. » |
| ch. 2, l. 361 | « Cuire la viande qui dégèle : cuite, elle se garde plus longtemps que crue et décongelée. Cuire l'orignal à **74 °C à cœur**. » | « Cuire la viande à mesure qu'elle dégèle, parce qu'une fois cuite, elle se garde plus longtemps que crue et décongelée. L'orignal, il faut le cuire à **74 °C à cœur**. » |

Cause : le cadre (« Une autre façon de faire se dit comme une autre façon (« Autre façon : », « Sans tige de
ferrocérium : ») ») donne le « Sans… : » comme modèle de titre, et il a déteint sur les phrases ; la règle 6 (« Le mot
exact, et toujours le même ») pousse à reprendre le nom au lieu du pronom, même juste après un titre qui le porte.

## 4. Les passages qui marchent, à garder comme modèles

1. **ch. 17, l. 47** : « Tant que la porte reste fermée, on décide de la distance, du temps que dure la visite et de
   ce que la personne voit. Une fois entrée, elle est à un mètre, elle reste le temps qu'elle veut, et elle a vu la
   pièce, le poêle et les enfants. » Deux phrases qui se répondent, chacune en trois temps ; la condition en tête ; pas
   un deux-points ; la fin tombe sur le mot qui pèse, « les enfants ». C'est une opposition réelle (porte fermée,
   porte ouverte), pas fabriquée.
2. **ch. 17, l. 295 et l. 338** : « Par grand froid, la neige crisse et on entend un pas de loin ; par redoux, sur la
   neige molle, une personne peut arriver à pied sans un bruit. » ; « Une personne qui a vécu ce qu'elle raconte le
   redit dans le désordre, avec des détails nouveaux ; une histoire apprise revient dans le même ordre, avec les mêmes
   mots. » Le point-virgule sert de balance entre deux moitiés de même poids ; chaque moitié a son verbe ; ça se dit
   d'un souffle.
3. **ch. 2, l. 232** (étape 41) : « Dire à voix haute deux phrases, une par option : « Si on reste et que ça tourne mal,
   voici ce qui arrive, et voilà ce que je fais. » « Si on part et que ça tourne mal, voici ce qui arrive, et voilà ce
   que je fais. » Retenir l'option dont la phrase finit par une action possible. Si aucune ne finit ainsi, retenir
   celle qui laisse au chaud, dans un endroit connu, avec de l'eau. » Le paragraphe avance (la règle, comment la faire,
   le choix, le cas où rien ne marche) et il a une fin ; les longueurs alternent ; le « Si » porte la condition à voix
   haute ; la dernière phrase se pose sur trois choses concrètes.
4. **ch. 17, l. 127** (étape 13) : « Le soir même, dire aux autres adultes ce qu'on a donné et ce qu'on a promis. Sinon,
   on découvre le don plus tard, comme un manque dans le stock. » La raison commence par un mot qu'on dit (« Sinon »),
   et la deuxième phrase, plus courte, ferme l'étape. C'est le geste qui manque partout ailleurs.
5. **ch. 2, l. 358** : « Deux choses font perdre ce qu'il y a dans la caisse : le soleil de midi d'une journée douce,
   qui fait dégeler, et la pluie verglaçante, qui recongèle les paquets en bloc. » Le bon usage du deux-points : il
   annonce, et on sait combien de choses attendre ; les deux membres sont bâtis pareil, chacun avec son effet.

Aussi : ch. 17, l. 50, « Quand la pièce est éclairée, la personne qui est dehors voit l'intérieur par la vitre, et la
personne qui est dedans ne voit que son propre reflet. » Ici, le « , et » ne colle pas un deuxième fait : il joint les
deux moitiés d'une même scène vue des deux côtés de la vitre.

## 5. Pistes pour les règles (du seul point de vue du tempo)

- **Ne pas viser la longueur.** La consigne du skill `editeur` (« alterne phrases courtes (percutantes) et phrases
  longues (rythmées) ») ne touche pas le défaut mesuré ; le lot est déjà aussi varié que les références.
- **Le mot de liaison d'abord.** Règle 1 : « Deux faits, deux phrases, et le mot qui les lie quand il y a un lien
  (parce que, donc, alors, sinon, mais, puis, ensuite, pour que). » Le modèle de la règle 2 se réécrit avec « parce
  que ». Dans la liste qui remplace le tiret, le premier choix devient la réécriture avec le mot qu'on dirait.
- **Le deux-points annonce, il n'explique pas.** Il ouvre une liste, une citation, ou un compte annoncé (« Deux
  choses… : ») ; un seul par phrase ; pas deux phrases de suite en « fait : conséquence ».
- **Une phrase finit sur ce qui compte.** Pas de « , et » qui accroche un deuxième fait après la fin : un point, ou un
  lien (« parce que », « alors »).
- **Le paragraphe va quelque part.** Le geste, puis comment, puis pourquoi, juste après ce qu'il explique ; la fin sur
  le geste ou le fait qui le commande, jamais sur une étiquette de renvoi ni sur une consigne oubliée.
- **Le renvoi va au bout de la proposition**, jamais entre le verbe et son complément ; pas de titre de section entre
  guillemets au milieu d'une phrase.
- **Le titre d'étape en gras tient en une respiration** : le geste, et la condition si elle est courte ; le reste dans
  le corps de l'étape.
- **Le test à voix haute, outillé** : lire le paragraphe à voix haute ; si on ajoute en lisant « parce que », « donc »
  ou « fait que », c'est qu'il manque à l'écrit. `controle.py` pourrait reprendre les mesures de `tempo.py` par
  paragraphe (phrases à deux-points, « fait : conséquence », paragraphes sans lien, « , et » + deuxième fait, titres
  en gras trop longs) et signaler les paragraphes qui dépassent une cible que JP fixera, avec les références comme
  repère.

## 6. Liste de contrôle (cadre, lignes qui touchent l'écriture et la langue)

Pour tout agent
- [x] CLAUDE.md pris comme chargé, pas relu.
- [x] Skill de sa partie lu au complet (`ecriture`, avec ses tableaux) ; règles d'`editeur`, du gabarit et de
  `decisions-jp.md` lues par recherche et par plages.
- [ ] `suivi/plan-de-match.md`, PAUSE du 15 octobre : pas lu ; audit sans réécriture du livre, aucune décision à y
  appliquer.
- [x] Règle 1 : aucune réécriture n'ajoute un chiffre ou un fait ; les chiffres cités sont ceux du texte.
- [x] Rien de commité.
- [x] Rapport en français, avec la liste cochée.

Économiser les jetons
- [x] Un agent pour un lot précis (trois chapitres).
- [x] Lu seulement ce que la tâche touche : les trois chapitres au complet (demandé), le reste par recherche.
- [x] Aucune image ouverte.
- [x] Sorties de commande coupées.
- [ ] Le rapport ne recopie pas le texte : il cite, parce que la tâche demande des citations mot pour mot.

La phrase (dans les réécritures proposées)
- [x] Règle 0 : chaque réécriture lue à voix haute ; verbe qui dit le geste, sujet connu, articles gardés.
- [x] Pas de loi en formule, jamais « d'où ».
- [x] Pas de « X passe là où Y ne passe pas ».
- [x] Pas de maxime, de chute, d'opposition fabriquée ni d'image.
- [x] Pas de chose qui pense.
- [x] Consigne jamais au pronominal (« se garde » reste : la viande le fait toute seule).
- [x] Consigne dite comme une consigne ; sujet nommé ; ordre naturel (pas de complément entre le verbe et l'objet).
- [ ] Points de contrôle et signes d'échec à 5 à 8 lignes : hors du regard, mais les trois chapitres dépassent
  (ch. 2 : 15 et 12 ; ch. 4 : 12 et 11 ; ch. 17 : 9 et 12).
- [ ] Pages des dangers : hors du lot.
- [x] Passage jugé avant d'être réécrit (doit-il exister ?) : aucun exemple retenu n'est un passage à couper.
- [ ] Passe d'éditeur : sans objet (audit).
- [ ] Le chapitre parle de son sujet ; notion expliquée à sa première apparition ; « Quand l'utiliser » en titres :
  hors du regard.
- [x] Qui fait quoi, quand et pourquoi, sans détour.
- [x] Le mot qu'on dit : « à défaut » devient « sinon » (ch. 17, l. 75) ; « lorsque », « afin de », « davantage »
  absents des réécritures.
- [x] La chose nommée au lieu du possessif (« avant que l'adulte revienne », pas « avant son retour »).
- [x] Mots de tous les jours.
- [x] Aucun tiret (— ou –) ; « section N ».
- [x] Pas de « X ne fait pas Y : il fait Z » ni de tournure relevée par JP.

La procédure et la répétition
- [x] Étape à plusieurs gestes : relevé côté tempo (motif 6, titres en gras) ; rien appliqué.
- [x] Une autre façon se dit comme une autre façon (gardé).
- [ ] Inventaire des faits du chapitre : hors du regard.
- [x] Un nom qui revient à chaque phrase : relevé (motif 9).
- [x] Appels de planche et repères gardés dans toutes les réécritures, dans l'ordre des repères.
- [ ] `controle.py` sur le chapitre : sans objet (aucun chapitre modifié) ; les réécritures vérifiées sans tiret.

La langue
- [x] Réécritures relues règle par règle : subjonctifs (« avant que l'adulte revienne », « pour que la lumière
  éclaire », « avant qu'on arrive »), participes, « a / à », « ou / où ».
- [x] Une seule série d'alternatives par phrase dans chaque réécriture (skill `langue`, section 10).
- [x] Français écrit correct, mots du Québec, ni joual ni anglicisme.
- [ ] `langue.py` sur les chapitres : sans objet (aucun chapitre modifié).
