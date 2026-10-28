# Audit de l'écriture : les liens entre les phrases, lot B (ch. 2, 4 et 17)

28 octobre 2026. Un seul regard : **les liens entre les phrases**, la logique dite ou laissée à deviner. À chaque
passage d'une phrase à la suivante : le lecteur sait-il si la seconde est la cause de la première, sa conséquence, sa
condition, une exception, un exemple ou une autre affaire ? Lot : `chapitres/02-rester-ou-partir.md`,
`chapitres/04-retombees-radioactives.md` et `chapitres/17-qui-cogne-a-la-porte.md`, lus au complet. Aucun fichier du
livre n'a été modifié.

Les réécritures sont des exemples. Elles n'ajoutent aucun fait ni aucun chiffre : elles ajoutent le mot qui dit le
lien (« parce que », « donc », « alors », « mais », « sauf », « quand même », « par contre », « pour que »,
« d'abord », « ensuite ») et remettent les morceaux dans l'ordre. Trois d'entre elles devaient choisir entre deux
lectures : elles sont marquées « à trancher », parce que c'est justement le défaut (le texte ne dit pas le lien, et
celui qui le relit peut se tromper de lien).

Les citations sont mot pour mot. Quand elles tiennent sur plusieurs lignes du fichier, les retours à la ligne sont
remplacés par une espace et le gras (`**`) est enlevé.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | « : » % | fait:csq % | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 2 | 4955 | 253 | 19,6 | 46,6 | 34,4 | 4,6 | 5,2 |
| ch. 4 | 8053 | 375 | 21,5 | 38,9 | 29,9 | 4,5 | 2,9 |
| ch. 17 | 4630 | 214 | 21,6 | 36,9 | 30,4 | 5,0 | 2,8 |
| **le lot** | 17 638 | 842 | 20,9 | 40,7 | 31,4 | 4,6 | 3,6 |
| les 7 références (`plan/audit-ecriture/references/`) | 17 297 | 807 | 21,4 | 6,3 | 3,1 | 9,2 | 5,8 |

Le ch. 2 est le chapitre du tome 1 qui a le plus de phrases à deux-points (46,6 %, près d'une phrase sur deux).

### Les mots qui disent le lien (`tempo.py --json`, vérifié au `grep`, prose seulement)

Les références font presque la même longueur que le lot (17 297 mots contre 17 638) : les nombres se comparent tels quels.

| mot | ch. 2 | ch. 4 | ch. 17 | le lot | les 7 références |
| --- | --- | --- | --- | --- | --- |
| parce que | 1 | 0 | 4 | 5 | 6 |
| car | 0 | 0 | 0 | 0 | 26 |
| donc | 1 | 0 | 1 | 2 | 11 |
| alors | 5 | 4 | 1 | 10 | 12 |
| mais | 1 | 4 | 2 | 7 | 65 |
| c'est pour ça que, alors que, par contre | 0 | 0 | 0 | 0 | non mesuré |
| quand même | 2 | 1 | 0 | 3 | non mesuré |
| deux-points | 126 | 148 | 86 | 360 | 52 |

**Le ch. 4 n'a ni « parce que », ni « donc », ni « car » en 8 053 mots. Le ch. 2 a un seul « mais » en 4 955 mots.**
Dans le lot, il y a neuf fois moins de « mais » que dans les références, et sept fois plus de deux-points.

### Ce que fait le deux-points (relevé à la main, ch. 2 et 17)

`tempo.py` compte 152 phrases en « fait : conséquence » dans les ch. 2 et 17 (87 et 65). Je les ai classées une à une
selon le mot qu'on dirait à voix haute à la place du deux-points.

| Le deux-points tient lieu de | ch. 2 | ch. 17 | ensemble | Exemple |
| --- | --- | --- | --- | --- |
| « parce que » (la cause vient après) | 22 | 13 | 35 | « Chiffrer surtout la deuxième partie : personne n'y déneige et personne n'y passe. » (ch. 2, ligne 202) |
| « donc », « alors » (la conséquence vient après) | 17 | 10 | 27 | « Par grand froid, personne ne marche à côté d'une piste battue : la visite arrive par ce chemin. » (ch. 17, ligne 282) |
| « c'est-à-dire », « par exemple » | 12 | 7 | 19 | « Une personne blessée ou qui gèle passe avant la conversation : on la soigne d'abord » (ch. 17, ligne 72) |
| « plutôt », « mais » | 2 | 6 | 8 | « Sans lampe du tout, on n'ouvre pas la nuit : on répond par la fenêtre » (ch. 17, ligne 246) |
| « pour que » | 2 | 5 | 7 | « La diriger sur la neige : la lumière éclaire la personne par en dessous » (ch. 17, ligne 241) |
| impossible à trancher | 0 | 1 | 1 | ch. 17, ligne 356 (voir le motif 1) |
| un emploi normal : liste, exemples, définition, ligne de Matériel, renvoi | 32 | 23 | 55 | « Écrire ce qu'on ne donne jamais : les médicaments (ch. 32)… » (ch. 17, ligne 165) |

**97 phrases sur 152 confient le lien au deux-points.** Dans les mêmes deux chapitres, le texte écrit « parce que »
5 fois et « donc » 2 fois. Et la direction change d'une phrase à l'autre : 42 fois, ce qui suit le deux-points est la
raison du geste ; 27 fois, c'est sa conséquence. À la ligne 198 du ch. 2, le fait vient avant et la consigne après le
deux-points ; à la ligne 202, quatre lignes plus bas, c'est l'inverse. Le lecteur doit trancher à chaque phrase.

## 2. Ce que JP entend comme un mauvais tempo

Le paragraphe du monoxyde (`dangers/partie-1.md`) est fait comme le lot : quatre constats, deux deux-points qui veulent
dire « donc », aucun mot de liaison. Dans les trois chapitres, le même moule revient à chaque étape : un constat, une
pause, un autre constat, un point ; puis la phrase suivante repart de zéro, souvent avec un nouveau sujet. Une personne
qui explique à voix haute ne parle pas comme ça : elle dit « parce que », « fait que », « mais », « sauf que »,
« d'abord », « après ça », et c'est ce qui donne à l'oral son mouvement. Le texte du livre a le contenu de ces
liens, mais pas les mots : il les remplace par le deux-points, le point-virgule ou « et ». Ça donne un rythme haché,
toujours pareil, et c'est le lecteur qui doit refaire le raisonnement.

## 3. Les défauts, du plus grave au moins grave

### 3.1 Le deux-points à tout faire (gravité haute)

Le deux-points remplace le mot qui dit le lien. Il veut dire « parce que » dans une phrase, « donc » dans la suivante,
« mais » ou « plutôt » dans une autre, et le lecteur devine le sens à chaque fois. Chaque phrase tombe en deux
morceaux, et le livre prend partout le même rythme.

**Fréquence.** 40,7 % des phrases du lot ont un deux-points, contre 6,3 % dans les références ; 31,4 % sont en
« fait : conséquence », contre 3,1 % (dix fois plus). Dans les ch. 2 et 17, 97 deux-points sur 152 remplacent un mot
de liaison (section 1).

| Fichier, ligne | Le texte | La réécriture |
| --- | --- | --- |
| ch. 2, lignes 84-85 | « Si la source était le chauffage, la maison restera chaude moins longtemps : reprendre la décision à l'étape 25. » | « Si la source était le chauffage, la maison restera chaude moins longtemps, alors il faut reprendre la décision à l'étape 25. » |
| ch. 2, lignes 198-199 | « Une fois en route, on ne pourra peut-être ni continuer ni revenir : partir avec le plein et de jour, sinon rester. » | « Partir seulement avec le plein et de jour, sinon rester, parce qu'une fois en route, on ne pourra peut-être ni continuer ni revenir. » (la consigne d'abord, la raison ensuite, comme dans le reste de l'étape) |
| ch. 4, lignes 93-94 | « L'abri n'a pas besoin d'être étanche, et des fenêtres cassées n'enlèvent presque rien à la protection : on reste. » | « Comme l'abri n'a pas besoin d'être étanche et que des fenêtres cassées n'enlèvent presque rien à la protection, on reste. » |
| ch. 4, ligne 395 | « Une batterie pleine fait marcher le poste longtemps : l'éteindre la nuit. » | « Une batterie pleine fait marcher le poste longtemps, mais il faut quand même l'éteindre la nuit pour la ménager. » (ici, le deux-points cachait un « mais » : le fait et la consigne vont en sens contraire) |
| ch. 17, lignes 282-283 | « Par grand froid, personne ne marche à côté d'une piste battue : la visite arrive par ce chemin. » | « Par grand froid, personne ne marche à côté d'une piste battue, donc la visite arrive par ce chemin. » |
| ch. 17, lignes 355-357 | « Faire sécher les bottes et les mitaines du visiteur près du poêle : personne ne repart la nuit sans ses bottes, ni dans des bottes gelées. » | « Faire sécher les bottes et les mitaines du visiteur près du poêle, pour que personne ne reparte la nuit sans ses bottes ni dans des bottes gelées. » **À trancher** : le deux-points permet aussi de lire une règle de la maison (« et ne laisser personne repartir la nuit… »). Le rédacteur choisit, et l'écrit. |

**Cause.** Trois règles poussent vers le deux-points, et aucune ne demande le mot de liaison :
- `CLAUDE.md`, section « L'écriture » : « Pas de tiret (— ou –) dans une phrase : virgule, deux-points, parenthèses ou
  point. » Le skill `ecriture` (section « Le tiret ») donne le deux-points comme deuxième remplaçant, avec l'exemple
  « Une seule règle : la génératrice dehors. » Les 5 665 tirets du livre sont devenus, pour une bonne part, des
  deux-points.
- Le skill `ecriture`, règle 2, donne comme modèle une phrase où la cause suit un deux-points : « Vidanger avant que la
  maison descende sous 5 °C : un tuyau plein fend en gelant. » La règle (« le fait d'abord, la raison ensuite ») est
  bonne ; l'exemple apprend à dire « parce que » avec un deux-points.
- Le format des lignes de Matériel (« **Thermomètre à sonde** : porte les 74 °C à cœur. », `CLAUDE.md`) installe le
  moule « nom : explication » dans chaque chapitre, et l'œil s'y habitue.
- En face, rien : aucune règle ne dit « le lien se dit avec un mot », et `controle.py` (ligne 20) compte « ainsi »,
  « en effet » et « d'ailleurs » parmi les mots vides, et refuse « d'où ». Les mots de liaison écrits sont punis ; le
  deux-points, jamais.

### 3.2 L'étape qui aligne les constats (gravité haute)

Dans les étapes longues, quatre à huit phrases déclaratives se suivent, chacune vraie et sourcée, sans dire laquelle
explique quel geste ni dans quel ordre on raisonne. Le lecteur reçoit les pièces et doit monter le raisonnement
lui-même. C'est le « paragraphe en paraboles » que JP a refusé au ch. 3 (« c'est la façon que le paragraphe est
organisé »), mais à l'intérieur des étapes.

**Fréquence.** 14 étapes ou paragraphes relevés à la lecture : au ch. 2, les étapes 27, 38 et 40 et le paragraphe
« Faire démarrer l'auto » ; au ch. 4, les étapes 4, 6, 12, 13 (la note sous le tableau), 16, 29 et 30 ; au ch. 17, les
étapes 5, 9 et 11.

| Fichier, ligne | Le texte | La réécriture |
| --- | --- | --- |
| ch. 17, lignes 67-70 (étape 5) | « Lui nommer un repère qu'il voit, à plus de 2 m de la porte : le bas de l'escalier, le baril, l'auto, ou le poteau planté d'avance pour ça (étape 25). « Reculez » ne lui dit pas jusqu'où. Les virus respiratoires passent d'une personne à l'autre à moins de 2 m, quand le contact dure plus de 15 minutes. Ne pas se présenter, ne pas s'expliquer, et poser une seule question à la fois. » | « Lui nommer un repère qu'il voit, parce que « Reculez » ne lui dit pas jusqu'où : le bas de l'escalier, le baril, l'auto ou le poteau planté d'avance pour ça (étape 25). Ce repère doit être à plus de 2 m de la porte, parce que les virus respiratoires passent d'une personne à l'autre à moins de 2 m quand le contact dure plus de 15 minutes. Pendant la conversation, ne pas se présenter, ne pas s'expliquer, et poser une seule question à la fois. » |
| ch. 4, lignes 258-261 (étape 29) | « Le caribou, qui mange du lichen l'hiver, vient en tête. Le lichen prend directement la poussière qui tombe dessus. Viennent ensuite les bêtes qui mangent des champignons et des plantes, et en dernier les bêtes nourries de grain entreposé à l'intérieur. L'orignal mange des ramilles toute l'année, et des feuilles et des plantes aquatiques l'été. » | « Le caribou vient en tête, parce qu'il mange du lichen l'hiver et que le lichen prend directement la poussière qui tombe dessus. Viennent ensuite les bêtes qui mangent des champignons et des plantes, comme l'orignal, qui mange des ramilles toute l'année, et des feuilles et des plantes aquatiques l'été. En dernier viennent les bêtes nourries de grain entreposé à l'intérieur. » **À trancher** : le texte ne dit pas où se range l'orignal ; la réécriture le met là où les phrases le suggèrent, et le vérificateur technique confirme. |
| ch. 17, lignes 114-119 (étape 11) | « Ne pas aller chercher l'arme, et ne pas la montrer. Si l'adulte va la chercher pendant la conversation, le visiteur le voit se retourner, et il peut agir le premier, avant que l'adulte revienne. Devant une arme montrée, il ne sait pas si elle est chargée, et il réagit comme si elle l'était, sans qu'on puisse prévoir comment. Il apprend aussi qu'il y a une arme dans la maison, et jusqu'où la famille est prête à aller. Une personne qu'on a fait reculer avec une arme peut revenir à une autre heure, et pas forcément seule. » | « Ne pas aller chercher l'arme, et ne pas la montrer. D'abord, si l'adulte va la chercher pendant la conversation, le visiteur le voit se retourner et peut agir le premier, avant que l'adulte revienne. Ensuite, devant une arme montrée, il ne sait pas si elle est chargée, alors il réagit comme si elle l'était, sans qu'on puisse prévoir comment ; il apprend aussi qu'il y a une arme dans la maison, et jusqu'où la famille est prête à aller. Enfin, une personne qu'on a fait reculer avec une arme peut revenir à une autre heure, et pas forcément seule. » |
| ch. 4, lignes 118-121 (étape 12) | « Une détonation et le panache d'une centrale nucléaire en apportent. La thyroïde prend l'iode radioactif aussi bien que l'iode ordinaire : le comprimé la remplit d'iode ordinaire, et elle ne prend presque plus l'iode radioactif. Le comprimé ne protège que la thyroïde, et contre l'iode seulement : il ne fait rien contre le césium, le strontium ni le rayonnement de la poussière, et il ne soigne pas l'irradiation. » | « Une détonation et le panache d'une centrale nucléaire apportent de l'iode radioactif. Comme la thyroïde le prend aussi bien que l'iode ordinaire, on la remplit d'iode ordinaire avec le comprimé, et elle ne prend presque plus l'iode radioactif. Mais le comprimé ne protège que la thyroïde, et contre l'iode seulement : il ne fait rien contre le césium, le strontium ni le rayonnement de la poussière, et il ne soigne pas l'irradiation. » |
| ch. 4, lignes 63-66 (étape 4) | « Après une détonation, les retombées mettent 10 minutes ou plus à arriver, et les premières heures comptent le plus : la poussière radioactive donne plus de la moitié de son rayonnement dans la première heure. Ce rayonnement vient de la poussière qui se pose sur le sol et sur les toits ; la terre, le béton et la brique l'arrêtent. » | « Après une détonation, les retombées mettent 10 minutes ou plus à arriver : c'est le temps qu'on a pour se mettre à l'abri. Les premières heures comptent le plus, parce que la poussière radioactive donne plus de la moitié de son rayonnement dans la première heure. Ce rayonnement vient de la poussière qui se pose sur le sol et sur les toits, et comme la terre, le béton et la brique l'arrêtent, on choisit l'abri dans cet ordre : » (suit la liste de l'étape) |

**Cause.**
- Le skill `ecriture`, règle 1 : « Une phrase, une information. Deux faits, deux phrases. » Appliquée à la lettre,
  elle coupe le raisonnement en morceaux et ne demande jamais de recoudre.
- `CLAUDE.md`, règle 5, et `plan/decisions-jp.md` (règle 5, « Écrire dense », « environ 700 mots utiles par page ») :
  le mot de liaison passe pour un mot de trop.
- Le gabarit : « Comment ça marche » est coupé et « un mécanisme qui apprend quelque chose va dans l'étape qu'il
  explique » (`CLAUDE.md`, « Le gabarit ») ; puis la section Danger est sortie à son tour. Les mécanismes et les faits
  de ces sections ont été versés dans les étapes, à la suite de la consigne, sans qu'on écrive le lien.
- L'habitude du rédacteur qui écrit depuis ses fiches de sources (règle 1 : « on cherche la source avant d'écrire ») :
  une phrase par fait vérifié, dans l'ordre de la fiche, pas dans l'ordre du raisonnement.

### 3.3 L'exception ou la nuance qu'on ne marque pas (gravité haute)

Une phrase limite, nuance ou contredit la précédente (une exception à la consigne, un « oui, mais », un « au
contraire ») et rien ne l'annonce : ni « mais », ni « sauf », ni « quand même », ni « par contre ». Le lecteur lit deux
consignes qui semblent se contredire, ou prend l'exception pour la règle. Dans un livre qu'on ouvre en urgence, c'est
le défaut de liaison qui peut le plus tromper.

**Fréquence.** « mais » 7 fois dans le lot (0,4 pour 1000 mots), contre 65 dans les références (3,8 pour 1000) ;
« par contre », « alors que » et « c'est pour ça que » : 0 ; « quand même » : 3. Une quinzaine de nuances non marquées
relevées à la lecture (ch. 2 : lignes 131, 153, 211 à 215, 343, 375 ; ch. 4 : lignes 71, 85, 124, 222, 233, 284 ;
ch. 17 : lignes 105, 157).

| Fichier, ligne | Le texte | La réécriture |
| --- | --- | --- |
| ch. 2, lignes 211-215 (étape 38) | « Devant une fumée sans feu visible, rester à l'intérieur, fermer les portes et les fenêtres, et faire recirculer ou filtrer l'air ; la radio donne la Cote air santé[^2]. L'été, s'il fait trop chaud dedans, ouvrir les fenêtres : la chaleur fait en général plus de tort que la fumée. Le poêle à bois tire son air de combustion de la pièce ou du dehors : on ne peut pas fermer le chalet à la fumée et le chauffer en même temps. Sous une fumée épaisse, quand il faut chauffer, partir vers la maison, qu'on peut fermer sans couper le chauffage. » | « Devant une fumée sans feu visible, rester à l'intérieur, fermer les portes et les fenêtres, et faire recirculer ou filtrer l'air ; la radio donne la Cote air santé[^2]. L'été, s'il fait trop chaud dedans, ouvrir quand même les fenêtres, parce que la chaleur fait en général plus de tort que la fumée. Quand il faut chauffer au poêle à bois, on ne peut pas non plus fermer le chalet à la fumée, parce que le poêle tire son air de combustion de la pièce ou du dehors. Alors, sous une fumée épaisse, quand il faut chauffer, partir vers la maison, qu'on peut fermer sans couper le chauffage. » |
| ch. 4, lignes 85-88 (étape 7) | « L'hiver, on peut garder allumé le poêle à bois qui chauffe la maison. Il envoie l'air de la maison dehors par son tuyau, et le même volume d'air du dehors entre par les fentes, assez lentement pour n'apporter presque pas de poussière (étape 18). » | « L'hiver, on peut quand même garder allumé le poêle à bois qui chauffe la maison. Il envoie bien l'air de la maison dehors par son tuyau, et le même volume d'air du dehors entre par les fentes, mais assez lentement pour n'apporter presque pas de poussière (étape 18). » |
| ch. 4, lignes 71-74 (étape 4) | « Après une explosion au sol, elles se voient : du sable fin, une poussière comme du sel de table, de la cendre, ou une pluie. Les retombées d'une explosion en altitude et le panache d'une centrale ne se voient pas : entrer dès l'éclair ou l'alerte, sans attendre de voir quelque chose tomber. » | « Après une explosion au sol, elles se voient : du sable fin, une poussière comme du sel de table, de la cendre ou une pluie. Mais les retombées d'une explosion en altitude et le panache d'une centrale ne se voient pas, donc il faut entrer dès l'éclair ou l'alerte, sans attendre de voir quelque chose tomber. » |
| ch. 4, lignes 284-285 (étape 32) | « Jeter le liquide de cuisson enlève environ la moitié du césium, et cuire à l'eau en enlève plus que griller. On y perd du goût, et du gras (étape 30). » | « Jeter le liquide de cuisson enlève environ la moitié du césium, et cuire à l'eau en enlève plus que griller. Mais on y perd du goût, et le gras qu'il faut garder (étape 30). » |
| ch. 4, lignes 223-224 (étape 21) | « Le contenu n'a rien reçu. Essuyer le contenant avec un linge humide avant de l'ouvrir, et mettre le linge dans le sac des vêtements du dehors. » | « Le contenu n'a rien reçu, mais il faut quand même essuyer le contenant avec un linge humide avant de l'ouvrir, et mettre le linge dans le sac des vêtements du dehors. » |
| ch. 17, lignes 157-158 (étape 21) | « La viande sauvage qu'on reçoit, même salée, séchée, fumée ou gelée, peut porter la trichine : on doit la cuire à 74 °C à cœur (étape 20 ; l'ours : ch. 52). » | « Pour la viande sauvage qu'on reçoit, c'est différent : même salée, séchée, fumée ou gelée, elle peut porter la trichine, alors on doit la cuire à 74 °C à cœur (étape 20 ; l'ours : ch. 52). » (l'étape annonce « deux aliments » à refuser ; la viande sauvage est un troisième cas, qu'on cuit au lieu de le refuser, et rien ne le disait) |

**Cause.**
- Le skill `ecriture`, tableau « Les phrases » : « L'opposition fabriquée » sort (« Ce qui détruit la plomberie n'est
  pas le froid mais l'expansion de l'eau ») ; le cadre (`.claude/cadre-agents.md`, « La phrase ») ajoute « pas
  d'opposition fabriquée » et « pas de "X ne fait pas Y : il fait Z" ». La règle visait la fausse opposition ; les
  rédacteurs ont cessé d'écrire aussi les vraies. Aucune règle ne dit qu'une vraie exception se marque avec « mais »,
  « sauf », « quand même » ou « par contre ».
- Le skill `ecriture`, règle 8 : « Dire ce qui marche, pas ce qui ne marche pas. » Elle fait sortir la moitié
  négative des nuances, et l'autre moitié reste sans son « mais ».

### 3.4 Le pourquoi détaché de son geste (gravité moyenne)

La raison existe, mais elle arrive une ou deux phrases plus loin, après un autre geste, ou dans une autre section (le
tableau des signes d'échec), sans mot qui la rattache. Le lecteur l'accroche au geste qui la précède immédiatement,
qui n'est pas le bon, ou il relit pour trouver ce qu'elle justifie.

**Fréquence.** Une douzaine de cas relevés à la lecture (ch. 2 : lignes 140, 236, 306 à 310, 356 à 359 ; ch. 4 :
lignes 45 à 50, 55 à 58, 237 ; ch. 17 : lignes 67 à 70, 91, 143 à 148, 290, 324).

| Fichier, ligne | Le texte | La réécriture |
| --- | --- | --- |
| ch. 2, lignes 306-310 | « Sans thermomètre du tout, poser un verre d'eau sur le plancher, là où dorment les enfants : quand une pellicule de glace s'y forme, le plancher est à 0 °C, et l'épaisseur de la glace d'un relevé au suivant montre si la pièce refroidit vite ou lentement. Mesurer au plancher : l'air chaud monte, et le plancher est plus froid qu'à hauteur d'adulte. » | « Sans thermomètre du tout, poser un verre d'eau sur le plancher, là où dorment les enfants, parce que l'air chaud monte et que le plancher est plus froid qu'à hauteur d'adulte. Quand une pellicule de glace se forme dans le verre, le plancher est à 0 °C, et l'épaisseur de la glace d'un relevé au suivant montre si la pièce refroidit vite ou lentement. » (la raison rejoint son geste, et la redite « Mesurer au plancher » tombe) |
| ch. 17, lignes 147-148 (étape 18) | « Un abri de toile retient le gaz comme une pièce fermée, surtout quand la neige en bouche les ouvertures pendant la nuit. » (la dernière phrase de l'étape ; la consigne « ni sous une toile ou un auvent » est quatre lignes plus haut) | « Laisser la génératrice, le réchaud et la chaufferette du visiteur dehors, à l'air libre : jamais dans la maison, le hangar, le garage ou un véhicule, ni sous une toile ou un auvent, parce qu'un abri de toile retient le gaz comme une pièce fermée, surtout quand la neige en bouche les ouvertures pendant la nuit. » |
| ch. 4, lignes 55-58 (étape 3) | « En auto, freiner, s'arrêter et se baisser sous les vitres jusqu'au passage du souffle. L'éclair aveugle même la personne qui ne regardait pas dans sa direction : quelques secondes le jour, 5 à 10 minutes la nuit, puis une tache sombre reste dans la vue pendant plusieurs minutes. Ne pas repartir avant de voir clair : les autres conducteurs sont aveuglés aussi, et les routes se remplissent d'accidents. » | « En auto, freiner, s'arrêter et se baisser sous les vitres jusqu'au passage du souffle. Ne pas repartir avant de voir clair, parce que l'éclair aveugle même la personne qui ne regardait pas dans sa direction (quelques secondes le jour, 5 à 10 minutes la nuit, puis une tache sombre reste dans la vue pendant plusieurs minutes), et que les autres conducteurs sont aveuglés aussi : les routes se remplissent d'accidents. » (placée juste après « se baisser », la phrase sur l'éclair se lisait comme la raison de se baisser) |
| ch. 2, lignes 140-141 (étape 26) | « Écrire les quatre mesures sur papier, montre en main : la chaleur, l'eau, la nourriture et le lien, chacune en heures ou en jours. Sous stress, on arrondit de mémoire dans le sens de ce qu'on a envie de faire. » | « Écrire les quatre mesures sur papier, montre en main : la chaleur, l'eau, la nourriture et le lien, chacune en heures ou en jours. Il faut les écrire parce que, sous stress, on arrondit de mémoire dans le sens de ce qu'on a envie de faire. » |
| ch. 2, lignes 236-237 (étape 42) | « Prendre les mesures à deux adultes, puis laisser un seul décider, et garder la décision jusqu'à l'heure fixée pour la reprendre (étape 43). » (la raison est à la ligne 293, dans le tableau des signes d'échec : « On décide sous le coup de l'inquiétude, sans mesure neuve ») | « Prendre les mesures à deux adultes, puis laisser un seul décider, pour que la décision ne change pas sous le coup de l'inquiétude ; la garder jusqu'à l'heure fixée pour la reprendre (étape 43). » |
| ch. 17, lignes 290-291 | « Le soir, effacer le sentier d'un coup de branche d'épinette. Au matin, la neige montre ce qui est passé : » | « Le soir, effacer le sentier d'un coup de branche d'épinette, pour qu'au matin la neige montre ce qui est passé pendant la nuit : » (suit la liste) |

**Cause.**
- Le skill `ecriture`, tableau « Les phrases » : « La justification collée au geste » sort (« Ne pas rester dans
  l'auto : la tôle n'arrête rien. » devient « Entrer dans un bâtiment. »). Les rédacteurs ont appris à se méfier de la
  raison placée juste après le geste ; elle survit, mais en phrase à part, plus loin.
- La règle 2 du même skill (« Le fait d'abord, la raison ensuite ») vaut pour la phrase ; rien ne dit qu'aucun autre
  geste ne doit passer entre un geste et sa raison.
- La migration des sections « Comment ça marche », « Danger » et « … : le détail » vers les étapes : les raisons ont
  été collées en fin d'étape, après tous les gestes.

### 3.5 L'ordre : le nouveau avant le connu, la condition après le geste, la reprise floue (gravité moyenne)

Une phrase commence par ce que le lecteur ne sait pas encore et finit par ce qu'il sait ; une condition arrive après
la consigne qu'elle déclenche ; un mot de reprise (« alors », « aussi », « avant », « le risque », « en ») ne dit pas
ce qu'il reprend. Le lecteur doit garder une phrase en tête pour comprendre la suivante.

**Fréquence.** Neuf cas relevés (ch. 2 : lignes 159, 179 à 187 ; ch. 4 : lignes 45 à 50, 164, 268, 420, 460 ;
ch. 17 : lignes 137, 169 à 173).

| Fichier, ligne | Le texte | La réécriture |
| --- | --- | --- |
| ch. 2, lignes 159-161 (étape 28) | « À la maison, l'eau du robinet peut couler et ne plus être potable : une panne de courant, un bris de l'aqueduc ou une baisse de pression suffisent, et rien ne se voit au robinet. Faire alors bouillir l'eau à gros bouillons au moins 1 minute pour la boire, » | « À la maison, après une panne de courant, un bris de l'aqueduc ou une baisse de pression, l'eau du robinet peut couler et ne plus être potable, sans que rien ne se voie au robinet. Dans ces trois cas, faire bouillir l'eau à gros bouillons au moins 1 minute pour la boire, » (« alors » ne disait pas quand : dès qu'un des trois arrive, ou quand on a un doute ?) |
| ch. 2, lignes 180-183 (étape 32) | « Quand on ne sait plus combien de temps ça va durer, aller au chalet : la maison devient un bâtiment sans services parmi d'autres, et le chalet a le bois, l'eau et le territoire. […] Trois signes montrent que l'événement s'étire, même s'il n'empire pas : » | « Trois signes montrent que l'événement s'étire, même s'il n'empire pas : [les trois signes]. Quand on les voit, on ne sait plus combien de temps ça va durer : aller au chalet, parce que la maison devient un bâtiment sans services parmi d'autres, alors que le chalet a le bois, l'eau et le territoire. » (les signes qui déclenchent la décision viennent avant elle, pas quatre lignes après) |
| ch. 4, lignes 164-166 (étape 16) | « Ces personnes sont surtout des adultes, qui risquent peu le cancer de la thyroïde. Pour les autres, le risque est très faible : en Pologne, après Tchornobyl, 7 millions d'adultes ont pris de l'iode, et on a rapporté deux réactions graves, chez deux personnes qui se savaient allergiques à l'iode. » | « Ces personnes sont surtout des adultes, qui risquent peu le cancer de la thyroïde : on perd donc peu à ne pas leur en donner. Pour toutes les autres, le risque d'une réaction grave au comprimé est très faible : en Pologne, […] » **À trancher** pour la première phrase (le texte ne dit pas à quoi elle sert ; la réécriture propose le lien qu'elle semble vouloir dire). Pour la deuxième, il n'y a rien à trancher : « le risque » suit un autre risque (le cancer) et parle en fait de la réaction au comprimé ; on le nomme. |
| ch. 4, lignes 460-463 | « Une mesure de référence prise avant l'événement, avec le même pot, la même charge et le même temps, montre aussi si l'électroscope fuit : dans une pièce sans retombées, les feuilles doivent garder presque le même écartement pendant 3 heures. Avec cette référence et la même mesure refaite chaque jour, on sait si le rayonnement monte ou baisse, et à peu près dans quel rapport : » | « Une mesure de référence prise avant l'événement, avec le même pot, la même charge et le même temps, sert de point de comparaison : avec elle et la même mesure refaite chaque jour, on sait si le rayonnement monte ou baisse, et à peu près dans quel rapport, assez pour décider de rester une journée de plus ou de sortir. Cette mesure montre aussi si l'électroscope fuit : dans une pièce sans retombées, les feuilles doivent garder presque le même écartement pendant 3 heures. » (« aussi » venait avant le premier usage) |
| ch. 17, lignes 137-139 (étape 16) | « À l'entrée, dès que les soins de l'étape 8 le permettent, lui faire laver les mains au savon pendant 20 secondes, lui faire porter un masque si une maladie circule (ch. 30), et ne pas la laisser s'approcher des enfants avant. » | « …, et ne pas la laisser s'approcher des enfants avant qu'elle se soit lavé les mains et, si une maladie circule, qu'elle ait mis son masque. » (« avant » ne disait pas avant quoi) |
| ch. 4, lignes 420-421 | « On limite sans doute les sorties et la nourriture trop longtemps, ce qui coûte du poids et du moral, ou pas assez au mauvais moment (ch. 14). » | « On limite sans doute les sorties et la nourriture trop longtemps, ce qui coûte du poids et du moral, ou au contraire pas assez longtemps, au mauvais moment (ch. 14). » (le « ou » se rattachait à « trop longtemps », deux propositions plus haut) |

**Cause.**
- Le skill `ecriture`, règle 3 (« La condition avant le geste ») est écrite pour une phrase seule ; personne ne
  l'applique au paragraphe (les signes de l'étape 32 du ch. 2).
- L'habitude d'écrire dans l'ordre où on a trouvé ou vérifié les faits (la décision, puis sa raison, puis ce qui la
  déclenche), et non dans l'ordre où le lecteur en a besoin.
- La règle de la densité (`CLAUDE.md`, règle 5) : le mot qui nomme la reprise (« le risque d'une réaction grave au
  comprimé ») se coupe en « le risque ».

### 3.6 Le mécanisme ou le fait posé sans dire ce qu'il change au geste (gravité moyenne)

Un mécanisme est énoncé comme une loi (« Deux feuilles de métal… se repoussent », « Un réflecteur… renvoie la
lumière »), ou un fait reste seul au bout d'une étape, et rien ne dit ce qu'il change à ce qu'on fait. Le lecteur sait
quelque chose de vrai, mais ne sait pas quoi en faire. C'est le défaut que le skill a nommé au ch. 3 (« chaque
mécanisme est suivi de ce qu'il change dans la procédure »), revenu ailleurs.

**Fréquence.** Dix cas relevés (ch. 2 : lignes 145 à 149, 157, 225, 367 à 369 ; ch. 4 : lignes 251, 265, 429 ;
ch. 17 : lignes 102 à 104, 244 à 246, 295).

| Fichier, ligne | Le texte | La réécriture |
| --- | --- | --- |
| ch. 4, lignes 429-430 | « Deux feuilles de métal mince qui portent la même charge se repoussent et s'écartent ; le rayonnement rend l'air conducteur, et les feuilles perdent leur charge, puis se rapprochent, d'autant plus vite que le rayonnement est fort. » | « Dans le pot, deux feuilles de métal mince qui portent la même charge se repoussent et s'écartent. Le rayonnement rend l'air conducteur, alors les feuilles perdent leur charge et se rapprochent, d'autant plus vite que le rayonnement est fort : c'est cette vitesse qu'on lit (« Lire », plus bas). » |
| ch. 17, lignes 244-246 | « Un réflecteur placé derrière la flamme renvoie la lumière vers l'avant, au lieu de la laisser partir vers l'arrière : un couvercle de conserve, une feuille d'aluminium collée sur un carton, une assiette blanche derrière une chandelle. Il garde aussi la flamme hors des yeux de la personne qui la tient. » | « Pour éclairer avec une flamme, mettre un réflecteur derrière elle : un couvercle de conserve, une feuille d'aluminium collée sur un carton, une assiette blanche derrière une chandelle. Il renvoie la lumière vers l'avant au lieu de la laisser partir vers l'arrière, et il garde la flamme hors des yeux de la personne qui la tient. » (le geste d'abord, ses deux effets ensuite ; la loi ne parle plus toute seule) |
| ch. 2, lignes 148-149 (étape 27) | « Plus il fait froid dehors, plus la maison perd vite. Refaire la mesure à chaque reprise de la décision (étape 43). » | « Comme la vitesse change avec les heures et avec le froid du dehors (plus il fait froid dehors, plus la maison perd vite), refaire la mesure à chaque reprise de la décision (étape 43). » |
| ch. 4, ligne 265 (étape 30) | « Le césium se répartit dans toute la viande, comme le potassium ; » | « Le césium se répartit dans toute la viande, comme le potassium : c'est pour en enlever qu'on fait tremper la viande (étape 31). » (sans ce lien, la phrase se lit comme une raison de ne pas prendre la viande, alors que l'étape dit de la prendre) |
| ch. 2, lignes 367-369 | « Le froid ralentit la chimie de la batterie au moment où l'huile épaissie demande plus au démarreur : à −18 °C, une batterie au plomb ne donne plus que la moitié de sa capacité. Souvent, il suffit de décrocher la batterie, de la rentrer quelques heures près du poêle et de la remonter juste avant de partir. » | « Le froid ralentit la chimie de la batterie au moment où l'huile épaissie demande plus au démarreur : à −18 °C, une batterie au plomb ne donne plus que la moitié de sa capacité. C'est pour ça que, souvent, il suffit de décrocher la batterie, de la rentrer quelques heures près du poêle et de la remonter juste avant de partir. » |
| ch. 2, lignes 225-226 (étape 40) | « Les nouveau-nés et les nourrissons sont parmi les plus à risque d'hypothermie. » | « Compter aussi que les nouveau-nés et les nourrissons sont parmi les plus à risque d'hypothermie. » (la phrase se rattache au geste de l'étape, « Compter ce que chaque passager peut faire » ; ce que ce risque change au trajet, le texte ne le dit pas, et ce serait un fait neuf à sourcer) |

**Cause.**
- Le skill `ecriture` a la bonne correction, mais dans un cas particulier : la ligne « La section 3 du ch. 3 » du
  tableau « Ce que la relecture du 15 octobre change à la passe » (« Chaque mécanisme est suivi de ce qu'il change
  dans la procédure, et de l'étape où ça se fait »). Elle n'est pas montée dans les règles 0 à 15, et elle vise une
  section qui n'existe plus.
- Le même skill fait sortir « La conséquence évidente d'un fait qu'on vient de dire » (JP : « no shit »). Les
  rédacteurs coupent aussi la conséquence qui n'est pas évidente.

### 3.7 Le « et » à tout faire (gravité basse)

« Et » relie deux propositions dont la seconde est en fait la conséquence (« alors »), le contraste (« mais ») ou la
deuxième prémisse d'un raisonnement (« et comme »). La phrase se lit comme une addition, et le lecteur ne voit pas le
lien.

**Fréquence.** « Et » revient 28,5 fois pour 1000 mots dans le lot, contre 26,1 dans les références : presque la même
fréquence, mais dans le lot, il fait le travail que les références donnent à « mais » et à « car ». Une dizaine de cas
relevés (ch. 2 : lignes 77, 181 ; ch. 4 : lignes 63, 185, 210, 378 ; ch. 17 : lignes 91, 269).

| Fichier, ligne | Le texte | La réécriture |
| --- | --- | --- |
| ch. 2, lignes 77-78 (étape 6) | « Laisser l'avertisseur à l'intérieur : il ne mesure que l'air de la pièce où il est ; si on le sort dehors, il se tait, et ça ne prouve rien sur l'air de la maison. » | « Laisser l'avertisseur à l'intérieur, parce qu'il ne mesure que l'air de la pièce où il est. Si on le sort dehors, il se tait, mais ça ne prouve rien sur l'air de la maison. » |
| ch. 4, lignes 185-186 (étape 18) | « Les premiers signes du monoxyde (le mal de tête, la nausée, l'envie de dormir) ressemblent à ceux de l'irradiation, et on reste couché au lieu d'agir. » | « Les premiers signes du monoxyde (le mal de tête, la nausée, l'envie de dormir) ressemblent à ceux de l'irradiation, alors on reste couché au lieu d'agir. » |
| ch. 17, lignes 91-92 (étape 9) | « Le visiteur racontera ce qu'il a reçu, et la façon dont on donne lui en apprend plus sur nos réserves que la quantité. » | « Comme le visiteur racontera ce qu'il a reçu, et que la façon dont on donne lui en apprend plus sur nos réserves que la quantité, on donne sans rien montrer : » (suivent le repas dans un de nos bols, l'eau traitée, le bois fendu ; la phrase justifie ces gestes, pas « donner dehors », qu'elle suit) |
| ch. 17, lignes 269-270 | « Quand quelqu'un donne un coup d'épaule dans la porte, la perche travaille en compression, et une perche d'épinette résiste bien à la compression. » | « Quand quelqu'un donne un coup d'épaule dans la porte, la perche travaille en compression, et comme une perche d'épinette résiste bien à la compression, elle tient. » |
| ch. 4, lignes 378-379 | « L'hiver, le sol est gelé, et la neige fond dans une pièce chauffée : monter plutôt la neige dehors, en banc contre les murs (repère 2). » | « L'hiver, on ne peut pas remplir ces sacs : le sol est gelé, et la neige fond dans une pièce chauffée. Monter plutôt la neige dehors, en banc contre les murs (repère 2). » (les deux faits disaient chacun pourquoi une matière ne marche pas ; le « plutôt » supposait que le lecteur avait fait la déduction) |

**Cause.**
- Le skill `ecriture`, règle 1 (« Deux faits, deux phrases ») tire dans un sens, et la densité (`CLAUDE.md`, règle 5)
  dans l'autre : pour ne pas faire deux phrases, on colle les deux faits avec « et », le mot le plus court, qui ne
  dit pas de lien.
- `controle.py` (ligne 20) compte « ainsi » et « en effet » parmi les mots vides : il reste « et ».

### 3.8 Le saut d'un sujet à l'autre en fin d'étape (gravité basse)

Une étape finit sur une phrase qui parle d'autre chose (un geste d'un autre ordre, une prévention au milieu d'un
remède, un cas voisin), sans transition. Souvent, c'est la trace d'un fait déplacé d'une section coupée.

**Fréquence.** Six cas relevés (ch. 2 : lignes 218, 380 à 383 ; ch. 4 : lignes 82, 104 ; ch. 17 : lignes 119, 270).

| Fichier, ligne | Le texte | La réécriture |
| --- | --- | --- |
| ch. 2, lignes 216-218 (étape 39) | « Même quand le bâtiment tient, que le bois est cordé et que le congélateur est plein, les réserves baissent chaque jour sans qu'aucun événement oblige à décider. Manger d'abord ce qui dégèle (ch. 3, ch. 74). » | « Même quand le bâtiment tient, que le bois est cordé et que le congélateur est plein, les réserves baissent chaque jour sans qu'aucun événement oblige à décider. Dans ces réserves, manger d'abord ce qui dégèle (ch. 3, ch. 74). » |
| ch. 4, lignes 82-83 (étape 6) | « Aller le chercher expose l'enfant et la personne qui y va. On se retrouve après l'abri. Rentrer les animaux qui sont à portée, sans aller les chercher loin. » | « Aller le chercher expose l'enfant et la personne qui y va : on se retrouvera après l'abri. Pour les animaux, c'est pareil : rentrer ceux qui sont à portée, sans aller les chercher loin. » |
| ch. 2, lignes 381-383 | « Cette eau vient de la condensation dans un réservoir à moitié vide : garder le réservoir plein de novembre à avril. L'antigel de conduite est de l'alcool : l'alcool à brûler du réchaud ou l'alcool isopropylique de la pharmacie font le même travail. » | « Cette eau vient de la condensation dans un réservoir à moitié vide : pour l'éviter, garder le réservoir plein de novembre à avril. On peut aussi mettre de l'antigel de conduite : c'est de l'alcool, et l'alcool à brûler du réchaud ou l'alcool isopropylique de la pharmacie font le même travail. » (la prévention et le produit se suivaient sans qu'on sache si l'alcool sert à prévenir ou à réparer) |
| ch. 17, lignes 270-271 | « Pour une fenêtre coulissante, couper un bâton à la longueur du rail et le poser dans le rail. » (la phrase suit l'explication de la perche en compression) | « On bloque une fenêtre coulissante de la même façon : couper un bâton à la longueur du rail et le poser dans le rail. » |
| ch. 17, lignes 119-120 (étape 11) | « Au chalet, quand le chemin est fermé, retenir le visiteur sous la menace oblige à le nourrir, à le surveiller pendant qu'on dort et à le faire dormir près des enfants. » (personne n'a parlé de retenir le visiteur) | « Et au chalet, quand le chemin est fermé, retenir le visiteur sous la menace oblige à le nourrir, à le surveiller pendant qu'on dort et à le faire dormir près des enfants. » (avec le « Et », la phrase se lit comme la dernière raison de ne pas montrer l'arme, à la suite de la réécriture du motif 3.2) |

**Cause.**
- Les décisions de JP des 16 et 18 octobre 2026 (`plan/decisions-jp.md`, « Le gabarit ») : « Comment ça marche » et
  « Danger » sont sortis, et leurs faits sont allés dans les étapes. La règle « un fait se dit une fois par chapitre,
  là où il sert » (skill `ecriture`, « La répétition ») a fait déplacer des phrases sans qu'on écrive la transition.

### 3.9 Le participe détaché qui cache un « comme », un « si » ou un « une fois » (gravité basse)

Un participe ou un adjectif en tête de phrase porte une cause ou une condition (« Plus lourd, le cadre… »,
« Étendus sur la peau, ils… »). C'est du français correct, mais écrit : à voix haute, on dirait « comme il est plus
lourd », « si on les étend ». Le lecteur pressé lit une description au lieu d'une raison.

**Fréquence.** Cinq cas relevés (ch. 2 : ligne 361 ; ch. 4 : lignes 123, 487 ; ch. 17 : lignes 306, 325).

| Fichier, ligne | Le texte | La réécriture |
| --- | --- | --- |
| ch. 4, lignes 486-488 | « La face tournée vers la pièce devient plate, et les volets ferment bien contre elle. Plus lourd, le cadre revient loin en arrière tout seul quand on lâche la corde. » | « La face tournée vers la pièce devient plate, et les volets ferment bien contre elle. Et comme le cadre est plus lourd, il revient loin en arrière tout seul quand on lâche la corde. » |
| ch. 4, lignes 123-124 (étape 12) | « Étendus sur la peau, ils protègent moins que le comprimé et peuvent faire du mal. » | « Si on les étend sur la peau, ils protègent moins que le comprimé et peuvent faire du mal. » |
| ch. 2, ligne 361 | « Cuire la viande qui dégèle : cuite, elle se garde plus longtemps que crue et décongelée. » | « Cuire la viande qui dégèle, parce qu'une fois cuite, elle se garde plus longtemps que crue et décongelée. » |
| ch. 17, ligne 306 | « Couché ou assis, le corps perd plus de chaleur par le sol que par l'air. » | « Quand on est couché ou assis, le corps perd plus de chaleur par le sol que par l'air. » |

**Cause.** L'habitude de la compression : le skill `ecriture` interdit le « participe en chaîne » (règle 0), mais pas
le participe seul qui remplace « comme » ou « si », et la règle 10 (« Couper n'est pas compresser ») n'a pas d'exemple
de ce cas.

## 4. Ce qui marche (modèles)

1. **ch. 17, lignes 47-49 (étape 1).** « Tant que la porte reste fermée, on décide de la distance, du temps que dure
   la visite et de ce que la personne voit. Une fois entrée, elle est à un mètre, elle reste le temps qu'elle veut, et
   elle a vu la pièce, le poêle et les enfants. » Les deux phrases sont construites en miroir (« Tant que… », « Une fois
   entrée… ») et reprennent les mêmes trois choses dans le même ordre : la distance, le temps, ce qu'on voit. Le
   contraste se lit sans « mais », parce qu'il est dans la construction.
2. **ch. 4, lignes 547-551.** « Après une détonation, presque tout le danger de l'eau est dans la poussière qui flotte :
   moins de 2 % de sa radioactivité se dissout, et enlever la poussière enlève presque tout. Le panache d'une centrale
   lointaine dépose au contraire un césium qui se dissout presque en entier dans l'eau. La terre de la décantation et du
   filtre retient fortement le césium dissous, mais mal l'iode radioactif : pendant les six à huit semaines où il en
   reste, boire d'abord l'eau d'un puits tubé et fermé, ou ce qui reste de la réserve d'eau. » Chaque phrase part de ce
   que la précédente vient de poser (la poussière, puis ce qui est dissous, puis ce que la terre retient), les deux
   virages sont marqués (« au contraire », « mais »), et le raisonnement finit sur le geste.
3. **ch. 17, lignes 371-374.** « Sans radio ni téléphone, on ne peut ni vérifier une histoire auprès des voisins, ni
   les prévenir qu'une personne est repartie à pied. À la maison, les voisins sont à côté : on vérifie une histoire en
   marchant jusque chez eux. Au chalet, la réponse doit être plus généreuse : ne laisser personne repartir la nuit,
   parce que personne ne pourra aller la chercher. » Le problème, puis les deux lieux en parallèle, puis la consigne
   avec son « parce que » au bout : la raison suit le geste qu'elle justifie, sans rien entre les deux.
4. **ch. 2, lignes 446-449 (« L'onde AM, la nuit »).** « Le jour, l'onde d'une station AM voyage au ras du sol, et le
   haut de l'atmosphère absorbe la part qui monte. Après le coucher du soleil, cette absorption cesse, et l'onde rebondit
   sur le haut de l'atmosphère : on entend alors des stations à des centaines de kilomètres, parfois à plus de
   1 000 km » Le mécanisme se raconte dans l'ordre du temps (« Le jour », « Après le coucher du soleil »), la reprise dit
   ce qu'elle reprend (« cette absorption ») et « alors » marque la conséquence, même après le deux-points.
5. **ch. 17, lignes 127-128 et 135-136.** « Le soir même, dire aux autres adultes ce qu'on a donné et ce qu'on a
   promis. Sinon, on découvre le don plus tard, comme un manque dans le stock. » ; « Si on ne dit pas de durée au
   départ, on n'arrive plus à faire partir la personne. » La consigne, puis « Sinon » ou « Si on ne… pas », et ce qui
   arrive. Deux phrases, un mot de liaison : le lecteur sait pourquoi sans rien deviner. Même moule au ch. 2, lignes 344-345
   (« Mettre un fond d'eau dans le chaudron avant d'y jeter la neige : sinon, la neige du fond roussit et l'eau en
   prend le goût. »).

Ce qui est commun aux cinq : un mot ou une construction dit le lien (« tant que / une fois », « au contraire »,
« mais », « parce que », « alors », « sinon »), et chaque phrase commence par ce que la précédente a posé.

## 5. Ce que ces défauts demandent aux règles

Pour la réécriture du skill `ecriture` et pour l'auditeur des liens :

1. **La règle 1 change.** « Une phrase, une information. Deux faits, deux phrases. » devient : deux faits qui n'ont
   pas de lien, deux phrases ; deux faits liés, une phrase ou deux, **avec le mot qui dit le lien**.
2. **Le deux-points garde ses emplois** (la liste, l'exemple, la définition, la ligne de Matériel, la citation). Il ne
   remplace plus « parce que », « donc », « alors » ni « mais ». Cible mesurable avec `tempo.py` : moins de 10 % de
   phrases en « fait : conséquence » par chapitre (références : 3,1 % ; lot : 31,4 %). L'exemple de la règle 2 se
   réécrit : « Vidanger avant que la maison descende sous 5 °C, parce qu'un tuyau plein fend en gelant. »
3. **Le tiret devient d'abord un point ou un mot de liaison**, ensuite seulement une virgule, des parenthèses ou un
   deux-points (`CLAUDE.md` et la section « Le tiret » du skill).
4. **Une vraie exception se marque** : « mais », « sauf », « quand même », « par contre », « au contraire ». La règle
   contre l'opposition fabriquée reste, et dit qu'elle ne vise que l'opposition qui n'existe pas dans les faits.
5. **Aucun geste entre un geste et sa raison.** La raison va dans la phrase du geste, ou dans la suivante avec un mot
   qui la rattache (« il faut les écrire parce que… »).
6. **Un mécanisme dit ce qu'il change** au geste et renvoie à l'étape où ça se fait : la ligne « La section 3 du
   ch. 3 » du tableau devient une règle numérotée.
7. **Les mots de liaison ne sont pas des faits.** Le skill `editeur` (« Ne rien ajouter qui n'était pas dans le
   texte ») le précise : l'éditeur ajoute « parce que », « mais », « alors » quand le lien est dans le texte sans y
   être dit. `controle.py` ne compte plus « ainsi » et « en effet » comme vides quand ils lient deux phrases (ou ne
   les signale qu'en tête de phrase décorative).
8. **Le mot de liaison qu'on dit** : « parce que », « donc », « alors », « mais », « sinon », « pour que », « c'est
   pour ça que », « d'abord », « ensuite », « enfin ». Pas « car », « ainsi », « or », « en effet », « si bien que »,
   qui sont des mots de livre (règle 15).
9. **L'auditeur des liens**, pour chaque paragraphe de trois phrases et plus : écrire en marge, entre chaque paire de
   phrases, le lien (cause, conséquence, condition, exception, exemple, suite dans le temps, autre sujet). Si on a
   dû l'écrire en marge, le texte doit le dire. Une phrase marquée « autre sujet » demande une transition, ou une autre
   place. `tempo.py` donne la mesure de départ (deux-points, « fait : conséquence », mots de liaison pour 1000 mots).

## 6. Liste de contrôle (`.claude/cadre-agents.md`, lignes qui touchent l'écriture et la langue)

Pour tout agent
- [x] `CLAUDE.md` pris comme règle première (chargé dans le contexte).
- [x] Skill de ma partie lu au complet : `ecriture`, avec ses tableaux. `editeur` et `langue` : seulement les passages
  qui touchent les liens (recherche et plages), pour économiser les jetons.
- [ ] `suivi/plan-de-match.md`, PAUSE du 15 octobre : non lu. Sans objet pour un audit qui ne modifie aucun chapitre.
- [x] Règle 1 : aucune réécriture n'ajoute de chiffre ni de fait. Les trois qui devaient choisir une lecture sont
  marquées « à trancher » (ch. 17, ligne 356 ; ch. 4, lignes 258 et 164).
- [x] Rien de commité ; un seul fichier écrit, celui-ci.
- [x] Rapport en français, avec cette liste cochée.
- [x] Un agent par sujet (un regard, un lot de trois chapitres) ; lecture limitée aux trois chapitres demandés et,
  pour le reste, à des recherches et des plages ; aucune image ouverte ; sorties de commande coupées.

Le texte, la phrase
- [x] Règle 0 : chaque réécriture se lit à voix haute et se comprend du premier coup.
- [x] Pas de loi en formule, jamais « d'où » : les réécritures du motif 3.6 partent du geste.
- [x] Pas de « X passe là où Y ne passe pas ».
- [x] Pas de maxime, de chute en formule, d'opposition fabriquée ni d'image : les « mais » ajoutés marquent des
  exceptions qui sont dans les faits du texte.
- [x] Pas de chose qui pense, sait ou veut dans les réécritures.
- [x] Consigne jamais au pronominal (« on bloque une fenêtre coulissante », pas « elle se bloque »).
- [x] Consigne dite comme une consigne, sujet nommé, ordre naturel.
- [ ] Points de contrôle et signes d'échec à 8 lignes au plus : hors de mon regard. Constaté en passant : ch. 2,
  15 et 12 lignes ; ch. 4, 12 et 11 ; ch. 17, 9 et 12.
- [x] Un passage se juge d'abord (doit-il exister ?) : les exemples choisis apprennent quelque chose ; au ch. 2,
  ligne 309, la phrase « Mesurer au plancher » est une redite et tombe dans la réécriture.
- [x] Une notion du chapitre s'explique dès sa première apparition : « les quatre mesures » du ch. 2 sont nommées dès
  la section 1.
- [ ] « Quand l'utiliser » en titres de situation : hors de mon regard.
- [x] Qui fait quoi, quand et pourquoi, sans détour : c'est le cœur des motifs 3.4 et 3.5.
- [x] Le mot qu'on dit : les mots de liaison proposés sont ceux de l'oral (« parce que », « alors », « mais », « par
  contre », « c'est pour ça que ») ; aucun « car », « ainsi », « or », « en effet ».
- [x] On nomme la chose au lieu de la reprise floue (« le risque d'une réaction grave au comprimé », « avant qu'elle se
  soit lavé les mains »).
- [x] Aucun tiret dans mes phrases ni dans les réécritures (vérifié au `grep`) ; le seul endroit du fichier où il y a des tirets est la citation de la règle de `CLAUDE.md` (section 3.1).
- [x] Pas de « X ne fait pas Y : il fait Z » dans les réécritures.
- [ ] `controle.py` sur les chapitres : sans objet, aucun chapitre modifié.

La langue
- [x] Les réécritures passées à `langue.py` (avec LanguageTool) : 6 avis, jugés un par un. « restera » après « Si la source était » (un fait passé, pas une hypothèse : le futur est juste), « recirculer » et une virgule demandée dans « (plus il fait froid dehors, plus… » sont de faux avis. Deux virgules devant le dernier « ou » d'une énumération (« l'auto, ou le poteau », ch. 17, ligne 68 ; « de la cendre, ou une pluie », ch. 4, ligne 72) viennent du livre : enlevées dans les réécritures, à signaler au correcteur. Le « soit… soit » d'une réécriture, mal lu par LanguageTool et lourd à l'oral, est remplacé par « ou au contraire ». Puis relues règle par règle :
  subjonctif après « avant que » et « pour que » (« avant qu'elle se soit lavé les mains », « pour que personne ne
  reparte »), participe passé du pronominal suivi de son complément (« lavé », invariable).
- [x] Français écrit correct, sans joual ni anglicisme.
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures.
