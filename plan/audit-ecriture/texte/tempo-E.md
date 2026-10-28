# Audit de l'écriture : le tempo, lot E (tome 4 : ch. 68, 70, 78)

28 octobre 2026. Un seul regard : le tempo, le texte lu à voix haute comme on l'expliquerait à quelqu'un dans un
garage. Lot : `chapitres/68-salaison-a-sec.md`, `chapitres/70-fumage-a-froid.md`,
`chapitres/78-conserves-et-marinades.md`, lus au complet. Aucun fichier du livre n'a été modifié ; les réécritures
ci-dessous sont des exemples, sans fait ni chiffre neuf.

Ces trois chapitres n'ont pas encore passé la grande passe : ils ont encore « Pourquoi ça marche », la section Danger,
les tirets, les « § » et les noms latins. Une partie de ce qui suit tombera avec la migration (les incises, motif 9) ;
le reste ne tombera pas tout seul, et la migration peut l'aggraver (motif 2).

Le paragraphe du monoxyde que JP a trouvé « pas bon » a trois des défauts de ce lot : une phrase qui repart sur
« , et » avec un nouveau sujet (« …, et le poêle en fait plus quand… », motif 1), deux phrases en « fait : conséquence »
(motif 2), et trois phrases sur quatre qui partent d'un sujet nommé (« Le… Le… Il… Il… »), sans condition ni lien en tête
(motif 3).

## 1. Les mesures

`python3 .claude/skills/ecriture/scripts/tempo.py … --par-fichier`, et la même mesure sur les sept textes de
`plan/audit-ecriture/references/`. Les fiches de l'Alberta et Ripley (1946) sont les deux textes de consignes du corpus,
les plus proches de notre genre.

| texte | mots | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 68 | 5055 | 16,5 | 0,74 | 24,8 | 16,0 | 19,3 | 25,8 | 19,9 | 3,0 | 5,3 | 5,1 | 5,9 |
| ch. 70 | 5771 | 19,1 | 0,69 | 20,5 | 21,9 | 21,6 | 33,8 | 25,8 | 3,8 | 6,2 | 5,2 | 5,0 |
| ch. 78 | 5401 | 17,1 | 0,73 | 21,5 | 16,8 | 15,6 | 30,4 | 24,4 | 1,5 | 7,8 | 5,6 | 6,0 |
| **le lot** | 16227 | 17,6 | 0,72 | 22,3 | 18,2 | 18,9 | **30,0** | **23,4** | 2,8 | 6,5 | 5,3 | 5,6 |
| les sept références | 17297 | 21,4 | 0,66 | 13,0 | 23,7 | 27,4 | 6,3 | 3,1 | 5,5 | 2,4 | 9,2 | 5,8 |
| Alberta et Ripley | 4607 | 21,1 | 0,47 | 4,1 | 20,6 | 32,3 | 1,8 | 0,5 | 0,7 | 0,4 | 2,6 | 9,0 |

Mesures ajoutées pour cet audit (script de travail qui reprend le découpage de `tempo.py` ; phrases de plus de
3 mots) :

| | le lot | sept références | Alberta et Ripley |
| --- | --- | --- | --- |
| Phrases qui repartent sur « , et » + un nouveau sujet | **16,7 %** (134) | 3,3 % | 2,8 % |
| … dont « , et c'est… » en queue | **18** | 0 | 0 |
| Phrases qui commencent par une condition ou un moment (Si, Quand, Avant, Après, Dès, Pendant, Tant, Une fois) | **1,6 %** | 6,8 % | 14,3 % |
| Phrases qui commencent par un lien, une circonstance ou « On » | 8,1 % | 21,7 % | 27,6 % |
| Phrases qui commencent par un article ou un pronom sujet (Le, La, Un, Une, Ce, Il…) | **52,2 %** | 31,1 % | 30,4 % |
| Phrases en « Un X qui… est (un Y) » | 4,2 % | 0,4 % | 0,9 % |
| Phrases « ne… pas X, (c'est / il) Y » | 36 | | |
| Phrases de 40 mots et plus | 54 (jusqu'à 62) | | |
| Paragraphes de 3 phrases et plus sans aucun lien parlé | 53 sur 121 | | |
| Paragraphes avec 2 « fait : conséquence » ou plus | 54 (dont 10 avec 4 ou 5) | | |
| Paragraphes de 7 phrases et plus | 17 | | |
| Tirets / noms latins entre parenthèses / citations « » / renvois « § » | 172 / 46 / 70 / 30 | | |

### Ce que les chiffres disent

**La longueur n'est pas en cause.** Le lot fait 17,6 mots par phrase ; les références, 21,4. Ripley a une phrase sur
trois de 30 mots et plus, ses phrases voisines ont souvent la même longueur (31 %), et il se lit sans peine. La
monotonie de longueur du lot (18,9 %) est plus basse que celle des références.

**La variation est trompeuse.** Elle est haute (0,72), mais elle vient de fragments de 3 à 6 mots (22,3 % des phrases,
contre 13 % et 4 % dans les références) posés à côté de phrases de 40 mots et plus : l'étape 13 du ch. 68 fait 4, 46,
12 et 28 mots : un télégraphe, puis un débordement.

**Les mots de liaison ne manquent pas autant qu'on croit.** Le lot en a 5,3 pour 1000 mots, plus que l'Alberta et
Ripley (2,6). Ces deux textes n'ont pas besoin de « parce que » à chaque phrase : **ils mettent le lien en tête**
(« Quand… », « Si… », « Avant de… », 14,3 % des phrases contre 1,6 % chez nous) et chaque phrase se tient seule. Le
lot met le sujet-chose en tête (52 % des phrases), puis ajoute la condition, la cause ou la conséquence **en queue**,
derrière un deux-points (30 % contre 1,8 %) ou une virgule suivie de « et » et d'un nouveau sujet (16,7 % contre
2,8 %). À voix haute, la voix descend sur la ponctuation comme pour finir, puis elle doit repartir pour un morceau qui
n'a pas dit son lien. C'est ça, le tempo qui accroche.

**La migration peut aggraver le deux-points.** Dans le tome 1, entre la version à tirets et la première version sans
tirets, la part des phrases à deux-points est passée de 31,8 à 35,3 % au ch. 4 et de 28,4 à 34,1 % au ch. 5 (« fait :
conséquence » : 22,2 à 28,2 %) ; la variation a baissé au ch. 5 (0,66 à 0,55) et la monotonie a monté au ch. 11 (20,4 à
24,2 %). Ces versions ont aussi d'autres coupes, mais le sens est clair : le tiret enlevé est devenu un deux-points.
Le lot a 172 tirets.

## 2. Les défauts, du plus grave au moins grave

### Motif 1. La rallonge : « , et » + un nouveau sujet, et sa forme « , et c'est… » (gravité haute)

**Ce qu'on entend.** La phrase dit un fait, la voix descend sur la virgule, puis un deuxième fait arrive avec un autre
sujet, sans dire s'il est une cause, une conséquence ou une opposition. Dans la forme « , et c'est… », la queue est un
commentaire sur ce qu'on vient de dire. C'est le « …, et le poêle en fait plus quand on ferme presque l'entrée d'air »
du paragraphe du monoxyde.

**Fréquence.** 134 phrases sur 803 (16,7 %), contre 2,8 % dans l'Alberta et Ripley. « , et c'est… » : 18 dans le lot
(ch. 68 : 6 ; ch. 70 : 5 ; ch. 78 : 7), aucune dans les 17 000 mots des références.

**68, l. 121** : « Un mélange fait sur la pièce est un mélange inégal, et un mélange inégal de nitrite est un problème
des deux côtés : trop ici, pas assez là. »
→ « Si on mélange sur la pièce, le nitrite se répartit mal : il y en a trop à un endroit et pas assez à l'autre. »

**68, l. 326** : « Une balance à fléau se monte en une heure avec ce qui traîne, et elle se tare à l'eau, parce que
**1 mL d'eau pèse 1 g et 1 L pèse 1 kg** — ce n'est pas un chiffre à valider, c'est la définition du litre. »
→ « On monte une balance à fléau en une heure avec ce qui traîne. Pour la tarer, on se sert d'eau, parce que 1 mL d'eau
pèse 1 g et 1 L pèse 1 kg. »

**70, l. 116** : « C'est la seule chose qui distingue mécaniquement un fumoir à froid d'un fumoir à chaud : le feu est
ailleurs, et la fumée arrive refroidie. »
→ « Dans un fumoir à froid, on fait le feu à l'écart de la chambre pour que la fumée ait refroidi quand elle arrive aux
pièces. C'est la seule différence de montage avec un fumoir à chaud. »

**70, l. 56** : « Le poisson fumé est un aliment à risque de listériose, et la bactérie se multiplie de 4 à 10 °C, donc
au réfrigérateur. »
→ « Le poisson fumé peut donner la listériose. Cette bactérie se multiplie entre 4 et 10 °C, donc même au
réfrigérateur. »

**78, l. 446** : « Un joint sec fend, et un autoclave qui fuit au rebord ne monte jamais : il traite à 100 °C avec l'air
d'en faire plus. »
→ « Un joint sec fend. L'autoclave fuit alors au rebord et ne monte jamais en pression. Les pots ne dépassent donc pas
100 °C, même si l'appareil a l'air de chauffer plus. »

**78, l. 492** : « Une fournée pleine coûte le même feu qu'une fournée vide, et c'est ça qui décide si l'opération vaut
la peine un jour de tempête. »
→ « Un jour de tempête, l'opération vaut la peine seulement si la marmite est pleine, parce qu'une fournée pleine
demande le même feu qu'une fournée vide. »

**Cause.** La règle 1 du skill `ecriture` (« Une phrase, une information. Deux faits, deux phrases. ») est appliquée à
moitié : le deuxième fait reste dans la phrase, soudé par une virgule et « et ». Aucune règle ne demande de dire le
lien entre deux faits ; la règle 5 de `CLAUDE.md` (« Écrire dense ») et la liste des mots vides du skill (« ainsi »,
« en effet », « d'ailleurs ») poussent plutôt à couper les petits mots qui le disaient. La forme « , et c'est… » est
une habitude : le commentaire en queue qui donne du poids à la phrase, tic connu des textes de modèles de langue.

### Motif 2. Le deux-points à la place du lien, en série (gravité haute)

**Ce qu'on entend.** Le deux-points porte la logique (cause, conséquence, exemple, définition) qu'on dirait à voix haute
avec « parce que », « donc », « alors ». À l'oral, il ne s'entend que comme un arrêt. Quand trois à cinq phrases de suite
font la même chose, le paragraphe avance par secousses et chaque phrase repart de zéro. Les étiquettes « *Mécanisme :* »,
« **Ce qu'on perd :** », « **Conséquence :** », « La conduite qui en découle : » ajoutent un arrêt de plus avant même
la phrase.

**Fréquence.** 30,0 % des phrases ont un deux-points (ch. 68 : 25,8 ; ch. 70 : 33,8 ; ch. 78 : 30,4), contre 1,8 % dans
l'Alberta et Ripley ; 23,4 % sont en « fait : conséquence », contre 0,5 %. 54 paragraphes en ont deux ou plus ; dix en
ont quatre ou cinq (ch. 70, l. 149, 367, 392, 418 ; ch. 78, l. 70, 279, 298, 312, 363, 384). 14 étiquettes suivies d'un
deux-points (11 au ch. 70).

**70, l. 184** : « **17. La température de chambre.** La règle est fonctionnelle : la chair ne coagule pas (étape 16).
Le plafond chiffré est **32 °C** dans la chambre. Au-dessus, on ne tue pas le botulisme — la chaleur d'un fumage à froid
n'affaiblit pas ses spores —, on tue les bactéries ordinaires qui auraient gâté le poisson, à l'odeur, **avant** que la
toxine se forme : on enlève l'alarme et on garde le danger. »
→ « **17. Garder la chambre sous 32 °C**, sans que la chair devienne opaque (étape 16). Plus chaud, on ne tue pas le botulisme,
parce que cette chaleur-là n'affaiblit pas ses spores. On tue seulement les bactéries ordinaires, celles qui auraient
gâté le poisson et l'auraient fait sentir mauvais avant que la toxine se forme. Le botulisme reste, mais l'odeur qui
aurait averti n'est plus là. »

**78, l. 80** : « Une conserve retire l'oxygène, et c'est justement ce qui réveille la spore de *Clostridium botulinum* :
le vide seul n'est pas une protection, c'est le danger. Cette spore survit à l'eau bouillante. Il reste donc deux
sorties : acidifier sous pH 4,6, où elle ne germe pas, ou chauffer au-dessus de 100 °C, où elle meurt. À l'air libre,
l'eau ne passe jamais 100 °C, quel que soit le temps : seule la pression de l'autoclave la fait bouillir plus chaud, et
la pression est le **thermomètre** du procédé. En altitude, la même pression lue chauffe moins, d'où le barème
corrigé. »
→ « En fermant le pot, on lui enlève son oxygène. C'est justement ce qui réveille la spore du botulisme, qui survit en
plus à l'eau bouillante. Pour l'arrêter, il reste deux moyens : rendre l'aliment assez acide (pH sous 4,6) pour qu'elle
ne germe pas, ou le chauffer au-dessus de 100 °C pour qu'elle meure. Dans une marmite ouverte, l'eau ne dépasse jamais
100 °C, même si on la fait bouillir longtemps. Pour chauffer plus, il faut la pression de l'autoclave. On lit donc la
pression pour connaître la température. En altitude, la même pression chauffe moins ; c'est pour ça que le barème est
corrigé. »

**70, l. 402** : « Au fumoir, le cube posé sur un éclat de bois à hauteur des pièces devient une alarme muette : arêtes
vives, la chambre est sous le point noté ; arêtes arrondies, elle l'a dépassé. **Ce qu'on perd :** un seuil, pas une
lecture. Le témoin ne dit pas combien il fait, il dit de quel bord d'un chiffre on se trouve — et dans ce chapitre-là,
c'est presque tout ce qu'on demandait au thermomètre. »
→ « Au fumoir, on pose le cube sur un éclat de bois, à la hauteur des pièces. Tant que ses arêtes restent vives, la
chambre est sous la température notée ; quand elles s'arrondissent, elle l'a dépassée. Le cube ne dit pas combien il
fait, seulement si on est au-dessus ou en dessous de ce chiffre. Dans ce chapitre, c'est presque tout ce qu'on demandait
au thermomètre. »

**68, l. 279** : « Le plafond de dose de la salaison à sec est de **62 g de sel de nitrite de sodium et 186 g de sel de
nitrate par 100 kg de produit de viande** : à l'échelle d'une pièce de 3 kg, on parle de **quelques grammes**, pesés,
pas d'une cuillère. Ce n'est pas un excès de goût qui guette, c'est un poison franc — le nitrite change le fer du sang en
une forme qui ne fixe plus l'oxygène, et les tissus en manquent. »
→ « En salaison à sec, on met au plus 62 g de sel de nitrite de sodium et 186 g de sel de nitrate par 100 kg de viande.
Pour une pièce de 3 kg, ça fait quelques grammes, qu'on pèse au lieu de les mesurer à la cuillère. Une dose trop forte
empoisonne, parce que le nitrite change le fer du sang en une forme qui ne porte plus l'oxygène aux tissus. »

**78, l. 315** : « Le mécanisme : ce qui compte n'est pas la présence d'acide mais le pH **final de l'ensemble**, et une
pièce de viande tamponne l'acide au lieu de s'acidifier. »
→ « Le pot compte comme acide seulement si tout ce qu'il contient l'est, une fois mélangé. Une pièce de viande absorbe
l'acide sans devenir acide elle-même. »

**Cause.** Trois règles écrites mènent au deux-points. `CLAUDE.md` (« Pas de tiret… : virgule, deux-points, parenthèses
ou point ») et le skill `ecriture` (« Le tiret » : « les deux-points : "Une seule règle : la génératrice dehors." ») le
donnent comme remplaçant du tiret, avant le point et la réécriture. La règle 2 du skill (« Le fait d'abord, la raison
ensuite ») a pour seul exemple un « fait : conséquence » (« Vidanger avant que la maison descende sous 5 °C : un tuyau
plein fend en gelant. »). La règle 9 (« Un avertissement = le mécanisme + ce qui arrive + quoi faire ») a produit les
étiquettes « *Mécanisme :* » des sections Danger. Le format des lignes de Matériel (« **Thermomètre à sonde** : porte… »)
en fait l'habitude de chaque page.

### Motif 3. Le lien en queue : le sujet-chose en tête, la condition après (gravité haute)

**Ce qu'on entend.** La moitié des phrases commencent par une chose qui sert de sujet (« Le gel… », « Un pot… », « Un
conduit qui… ») ; presque aucune ne commence par la condition ou le moment (« Si… », « Quand… », « Avant de… »). On
entend d'abord une vérité générale, et seulement après, derrière un deux-points ou un « parce que », ce qu'elle change
au geste. La forme extrême est la phrase-définition « Un X qui… est un Y », qui sonne comme un proverbe, et sa
répétition en chaîne (« un mélange inégal, et un mélange inégal… »). C'est aussi le « Le… Le… Il… Il… » du paragraphe
du monoxyde.

**Fréquence.** 52,2 % des phrases commencent par un article ou un pronom sujet, contre 30,4 % dans l'Alberta et Ripley ;
1,6 % par une condition ou un moment, contre 14,3 % ; 0,9 % par « On ». Phrases en « Un X qui… est » : 4,2 %, contre
0,4 % dans les références.

**78, l. 213** : « Le gel fait éclater les pots et rompt les joints : à la maison, une tablette de sous-sol suffit ; dans
un chalet qu'on ne chauffe pas tout l'hiver, il n'y a pas d'endroit sûr, et les pots redescendent à la maison au lieu
de passer janvier sur place. »
→ « Les pots ne doivent pas geler, parce que le gel les fait éclater et rompt les joints. À la maison, une tablette de
sous-sol suffit. Si on ne chauffe pas le chalet tout l'hiver, il n'y a pas d'endroit sûr pour eux, alors on les
redescend à la maison avant janvier. »

**78, l. 200** : « Un couvercle qui claque, qui remonte ou qui se soulève n'a pas scellé. **Un pot non scellé n'est pas
un pot de conserve** : il va au réfrigérateur et se mange dans les jours qui suivent, ou il repasse au traitement
complet avec un couvercle neuf, ou il se congèle. »
→ « Si le couvercle claque, remonte ou se soulève, le pot n'a pas scellé. On le met alors au réfrigérateur pour le
manger dans les jours qui suivent, sinon on le congèle ou on le repasse au traitement complet avec un couvercle neuf. »

**70, l. 222** : « Hors réseau, un réfrigérateur qui cycle avec le soleil ou avec les heures de génératrice ne tient pas
4 °C parce qu'il est branché : c'est le thermomètre dedans qui le dit. Sans cette lecture, la destination est le
congélateur ou la cuisson. »
→ « Hors réseau, quand le réfrigérateur s'arrête et repart avec le soleil ou avec les heures de génératrice, seul un
thermomètre placé dedans dit s'il tient 4 °C. Sans cette lecture, on met la pièce au congélateur ou on la cuit. »

**70, l. 351** : « Un conduit qui fuit ne tire pas, et un conduit qui ne tire pas laisse la chaleur monter dans la
chambre au lieu de la laisser au sol. »
→ « Quand le conduit fuit, il ne tire plus, alors la chaleur monte dans la chambre au lieu de rester dans le sol. »

**78, l. 209** : « Un pot sans étiquette est un pot à jeter dans six mois, parce que personne ne saura s'il est passé
par l'autoclave. »
→ « Dans six mois, on devra jeter un pot sans étiquette, parce que personne ne saura s'il est passé par l'autoclave. »

**68, l. 358** : « Un thermomètre à sonde ne se fabrique pas. **Il se vérifie**, et un thermomètre faux vérifié vaut un
thermomètre juste. »
→ « On ne peut pas fabriquer un thermomètre à sonde, mais on peut le vérifier. Quand on connaît son écart, un
thermomètre qui lit faux sert autant qu'un juste. »

**Cause.** La règle 3 du skill (« La condition avant le geste ») existe, mais elle n'est écrite que pour les étapes
(« Si l'eau est trouble, la filtrer… ») ; la règle 7 (« La voix active, un sujet concret ») pousse à mettre la chose en
sujet. Le tableau des corrections nomme la maxime en « Un X qui… ne… plus », et le script ne cherche que cette forme :
« Un X qui… est un Y » passe. Habitude : le style de définition des fiches et des tableaux (« Observation /
Diagnostic »), recopié dans la prose.

### Motif 4. Le balancier : « ce n'est pas X, c'est Y » et « Ce qui…, c'est… » (gravité haute)

**Ce qu'on entend.** Deux temps de même poids autour d'une négation, l'accent sur le dernier mot. Lue une fois, la
phrase frappe ; revenue 36 fois, elle donne au texte le ton d'un plaidoyer, et le lecteur entend d'abord ce qui est
faux avant ce qui est vrai. La mise en relief « Ce qui tient…, ce n'est pas…, c'est… » retarde le fait d'une
proposition entière. Ces phrases tombent souvent en fin de paragraphe (voir le motif 6).

**Fréquence.** 36 phrases « ne… pas X, (c'est / il) Y » (ch. 68 : 14 ; ch. 70 : 7 ; ch. 78 : 15) ; 9 « Ce qui…,
c'est… » ; et les courtes « pas X, Y » (« perdue — pas mise en attente, perdue », « avant, pas pendant »).

**68, l. 116** : « Sans nitrite, 2,5 % n'est pas un plancher, c'est un pari. »
→ « Sans nitrite, on ne peut pas se fier à 2,5 % de sel. »

**78, l. 438** : « Ce n'est pas de la prudence, c'est de l'arithmétique : un barème appliqué à une pression inconnue
n'est plus un barème. »
→ « On ne peut pas suivre un barème quand on ne sait pas à quelle pression on chauffe. »

**78, l. 166** : « Ce n'est pas un bain : c'est un générateur de vapeur. »
→ « Cette eau sert seulement à faire la vapeur qui chauffe les pots. »

**68, l. 381** : « La réponse honnête n'est pas un truc, c'est un calendrier : on ne commence une salaison qu'entre le
premier gel sérieux et le dégel, et dans un caveau creusé dans le sol, parce que le sol suit l'air avec du retard. »
→ « On se fie donc au calendrier : on commence une salaison seulement entre le premier gel sérieux et le dégel, dans un
caveau creusé dans le sol, parce que le sol se réchauffe et se refroidit en retard sur l'air. »

**78, l. 398** : « Ce qui tient une pression plate, ce n'est pas la clé d'air — c'est **le calibre des morceaux et la
cadence**. »
→ « Pour garder la pression égale, on ajoute des morceaux de la même grosseur à intervalles réguliers ; on ne touche pas à
la clé d'air. »

**Cause.** La règle existe : le tableau « Les phrases » du skill nomme « L'opposition fabriquée » (« Ce qui détruit la
plomberie n'est pas le froid mais l'expansion de l'eau »), le tableau « Les mots » la mise en relief « C'est… qui »,
et le cadre (`.claude/cadre-agents.md`, « pas de "X ne fait pas Y : il fait Z" ») la forme au deux-points. Aucune
n'écrit la forme à la virgule, « n'est pas X, c'est Y », que le script ne repère pas. Le tome 4 n'a pas eu sa passe.
Habitude : tic connu des modèles de langue (« ce n'est pas X, c'est Y »).

### Motif 5. La phrase-fleuve : trois ou quatre propositions dans un seul souffle (gravité haute)

**Ce qu'on entend.** La longueur seule ne gêne pas (voir le passage modèle 4, 58 mots qui se lisent d'un trait). La
phrase gêne quand elle empile des propositions avec deux-points, points-virgules, tirets et « , et », sans lien, souvent
avec un groupe nominal de 30 mots avant le premier verbe. On manque de souffle avant de savoir quoi faire. Les trois
« En une ligne » sont le pire cas, parce que le gabarit y exige une seule phrase.

**Fréquence.** 54 phrases de 40 mots et plus (ch. 68 : 17 ; ch. 70 : 21 ; ch. 78 : 16), jusqu'à 62 mots. Les trois
« En une ligne » font 50, 76 et 48 mots.

**70, l. 11** : « Le fumage à froid traite une pièce **déjà salée** avec de la fumée à une température qui ne provoque pas
de coagulation des protéines : il assèche et assainit la surface, freine le rancissement et donne le goût, mais il ne
conserve rien par lui-même — ce qui en sort reste une pièce crue, qui se garde à 4 °C ou moins et au plus 14 jours pour
du poisson fumé réfrigéré, ou à -18 °C ou moins. »
→ « Le fumage à froid passe à la fumée une pièce déjà salée, sans la chauffer au point où la chair devient opaque. La
fumée sèche et assainit la surface, ralentit le rancissement et donne le goût, mais elle ne conserve pas la pièce, qui
sort crue du fumoir. On la garde ensuite au congélateur, à -18 °C ou moins. Le poisson fumé peut aussi aller au
réfrigérateur, à 4 °C ou moins, pendant 14 jours au plus. »

**70, l. 368** : « Une bande de grillage à mailles fines, pliée en U sur sa longueur et montée en labyrinthe dans un
plateau de tôle, les couloirs remplis de bran de scie de feuillu tassé à ras : on allume **un seul bout**, avec une
braise ou un bout de chandelle, et le bran de scie couve d'un bout à l'autre du labyrinthe sans jamais flamber. »
→ « On plie une bande de grillage à mailles fines en U, sur sa longueur, puis on la monte en labyrinthe dans un plateau
de tôle. On remplit les couloirs de bran de scie de feuillu, tassé à ras. On allume un seul bout, avec une braise ou un
bout de chandelle. Le bran de scie couve alors d'un bout à l'autre du labyrinthe, sans jamais flamber. »

**78, l. 335** : « Dans un contenant fermé hermétiquement, le seul frein qui reste est le sel, et il en faut au moins
**9 % en phase aqueuse** : **ce taux ne se mesure pas sans laboratoire**, donc il ne se sait jamais, donc le poisson
fumé ne se met pas en pot — pas plus à la maison, avec un autoclave et du courant, qu'au chalet. »
→ « Dans un pot fermé, seul le sel freine encore cette bactérie, à condition d'en avoir au moins 9 % dans l'eau du
poisson. On ne peut pas mesurer ce taux sans laboratoire. On ne met donc jamais de poisson fumé en pot, même à la maison
avec un autoclave et du courant. »

**68, l. 179** : « Ce qu'on sait : un jambon sec fini a perdu **au moins 18 %** de son poids frais, et en dessous ce
n'en est pas un ; tant que la pièce perd du poids, elle sèche encore ; quand elle arrête d'en perdre alors que la
chambre n'a pas changé, elle a fini ce qu'elle pouvait faire dans ces conditions-là. »
→ « Un jambon sec fini a perdu au moins 18 % de son poids frais ; s'il a perdu moins, il n'est pas sec. Tant que la
pièce perd du poids, elle sèche encore. Quand elle arrête d'en perdre sans que la chambre ait changé, elle a séché
autant qu'elle pouvait dans ces conditions. »

**70, l. 356** : « **La chambre.** Un baril défoncé aux deux bouts posé debout sur la sortie de tranchée ; un tipi de
perches habillé d'une toile, d'une bâche ou de peaux ; une caisse de planches brutes ; un vieux réfrigérateur vidé de
toute sa mousse, de tous ses plastiques et de tous ses joints, carcasse d'acier percée en bas pour le conduit et en haut
pour la sortie. »
→ « **La chambre.** Ce peut être un baril défoncé aux deux bouts, posé debout sur la sortie de la tranchée. Un tipi de
perches couvert d'une toile, d'une bâche ou de peaux fait aussi l'affaire, comme une caisse de planches brutes. On peut
encore prendre un vieux réfrigérateur : on lui enlève toute sa mousse, tous ses plastiques et tous ses joints, puis on
perce la carcasse en bas pour le conduit et en haut pour la sortie. »

**Cause.** Le gabarit (`gabarit-chapitre.md`, « 1. En une ligne » : « Une phrase. Pas deux. ») force la phrase-valise
dans chaque chapitre. Ailleurs, la règle 1 du skill (« Deux faits, deux phrases ») n'est pas tenue : le deux-points, le
point-virgule et la virgule ont permis de garder plusieurs faits dans une phrase. Habitude : les ajouts du vérificateur
mis au bout d'une phrase existante plutôt que dans une phrase à eux.

### Motif 6. La chute : le paragraphe qui finit sur une formule (gravité moyenne)

**Ce qu'on entend.** Le paragraphe finit sur une phrase courte qui résume en proverbe ou en image. La voix tombe chaque
fois de la même façon, et la dernière chose qu'on entend n'est pas un geste. Deux chapitres finissent un danger sur la
même formule (« … coûte moins cher qu'une évacuation »).

**Fréquence.** 20 paragraphes finissent sur une phrase de 9 mots ou moins (ch. 68 : 7 ; ch. 70 : 4 ; ch. 78 : 9), dont
une douzaine sont des formules (les autres sont des renvois « Voir ch. … ») ; plus les chutes en deux temps au
point-virgule (ch. 70, l. 192 ; ch. 68, l. 337 « Long et léger, il lit fin ; court et massif, il ne lit rien. »).

**70, l. 93** : « Dans le doute, c'est **À CUIRE**. Une étiquette n'a jamais tué personne. »
→ « Dans le doute, on écrit À CUIRE. »

**70, l. 501** : « **La fumée ment sur l'état de ce qu'elle recouvre.** »
→ Couper : la phrase d'avant dit déjà que le produit a l'air, l'odeur et le goût d'un produit fumé de boucherie, sans en
avoir les barrières.

**68, l. 264** : « **Au moindre doute sur une pièce : elle se jette. Une pièce de viande coûte moins cher qu'une
évacuation.** » (ch. 78, l. 310 : « Un pot coûte moins cher qu'une évacuation. »)
→ « Au moindre doute, jeter la pièce. »

**70, l. 192** : « Une séance interrompue ne se paie qu'en goût ; une séance tiède se paie autrement. »
→ « Interrompre une séance gâte seulement un peu le goût. »

**68, l. 125** : « Insister là où l'os a été retiré, dans les replis, autour de l'articulation. C'est exactement là que ça
tourne. »
→ « Insister là où l'os a été retiré, dans les replis et autour de l'articulation, parce que c'est là que la viande
tourne. »

**78, l. 186** : « Une pression qui fait des bonds vide les pots de leur liquide. Un autoclave n'est pas un appareil
qu'on laisse. »
→ « Une pression qui fait des bonds vide les pots de leur liquide. » (La dernière phrase redit « quelqu'un dans la pièce
du début à la fin », trois lignes plus haut.)

**Cause.** La règle existe (skill `ecriture`, tableau « Les phrases », « La chute en formule » ; cadre, « Pas de maxime
ni de chute en formule ») ; le tome 4 n'a pas eu sa passe. Habitude : quand un paragraphe ne finit pas sur un geste (motif
7), le rédacteur lui fabrique une fin.

### Motif 7. Le paragraphe sans unité de souffle : il change de sujet en route et finit ailleurs (gravité moyenne)

**Ce qu'on entend.** Un paragraphe se lit d'un souffle quand il a un sujet, qu'il avance et qu'il finit sur le geste ou
le fait qui le ferme. Ici, des paragraphes passent d'un sujet à l'autre sans prévenir, ou finissent sur un autre lieu
que celui où ils ont commencé. L'auditeur ne sait plus où respirer, ni de quoi parlait le paragraphe.

**Fréquence.** 17 paragraphes de 7 phrases et plus (ch. 68 : 3 ; ch. 70 : 10 ; ch. 78 : 4), dont la moitié dans les
sections Danger que la migration va défaire.

**70, l. 147** (étape 12, 9 phrases, de 6 à 51 mots, cinq « fait : conséquence ») : « **Pas de résineux vif** —
épinette noire (*Picea mariana*), sapin baumier (*Abies balsamea*) : la résine dépose une suie collante et une amertume
qui ne s'enlève pas. **La vieille souche d'épinette fait exception.** Les Innus fument la truite […] Et elle change le
bois, pas les barrières : sel, froid et gel du chapitre s'appliquent pareil. Jamais de bois traité, peint, verni ou
collé — ce qu'on brûle se dépose sur ce qu'on mange. Jamais de bois d'épave de la grève : il a séché chargé de sel et de
tout ce dans quoi il a flotté. » (Mise en gras enlevée dans la coupure.)
→ Deux paragraphes. « **12. Ne pas brûler de résineux vif**, ni épinette noire ni sapin baumier, parce que leur résine
dépose une suie collante et une amertume qui ne part plus. On ne brûle pas non plus de bois traité, peint, verni ou
collé, parce que ce qu'on brûle se dépose sur ce qu'on mange. On laisse aussi le bois d'épave de la grève, qui a séché
chargé de sel et de tout ce dans quoi il a flotté. » Puis, à part : « Autre façon, la vieille souche d'épinette. Les
Innus fument la truite et boucanent les peaux avec de la souche d'épinette sèche et pourrie. On défait le bois pourri à
la main, parce qu'émietté il sèche plus vite et donne plus de boucane, puis on le fait couver sur des pierres chaudes en
surveillant qu'aucun morceau ne prenne en flamme. » (Ensuite, pourquoi ça marche, puis l'avertissement, chacun dans
sa phrase.)

**78, l. 384** : « **La panne qui tombe au milieu d'un cycle, à la maison.** C'est le scénario le plus probable des deux
lieux, […] Ce qui se sauve, c'est le **contenu**, pas la conserve — les pots sortent à la pince, refroidissent, et leur
contenu se traite comme de la viande cuite ordinaire : au froid tout de suite, mangé dans les jours qui suivent, ou
reparti au congélateur s'il tourne encore. D'où la seule règle qui protège vraiment : on ne part pas de fournée de peu
acide quand le vent monte ou quand la ligne est déjà tombée deux fois dans la journée. Au chalet, le poêle ne tombe pas
en panne, mais il faut quelqu'un devant : c'est le même risque payé autrement. »
→ « **Panne de courant au milieu d'un cycle, à la maison.** L'autoclave perd sa pression dès que le rond refroidit.
Sur du peu acide, on ne peut pas reprendre le maintien à mi-chemin, alors le lot ne va pas sur la tablette, même si tous
les couvercles scellent (section 7). On sauve quand même ce qu'il y a dans les pots : on les sort à la pince, on les
laisse refroidir, puis on traite leur contenu comme de la viande cuite ordinaire. On le met au froid tout de suite pour
le manger dans les jours qui suivent, sinon on le remet au congélateur s'il tourne encore.
Pour l'éviter, on ne part pas de fournée de peu acide quand le vent monte ou quand il y a déjà eu deux pannes de
courant dans la journée. » (La phrase sur le chalet va dans le paragraphe du poêle à bois, qui en parle.)

**70, l. 94** (étape 3) : « Congeler le poisson, **avant ou après le fumage**, à -35 °C ou moins pendant au moins
15 heures, ou à -20 °C pendant au moins 168 heures (7 jours). Le «avant ou après » est la seule souplesse, et elle est
utile : un congélateur de chalet qui peine à descendre sert mieux après le fumage, quand la pièce a perdu de l'eau.
Vérifier la température **dans** le congélateur, avec un thermomètre, pas sur le cadran. Le congélateur qui tient sa
température sept jours d'affilée sans qu'on y pense est celui de la maison, sur le réseau : le gel antiparasitaire se
fait souvent là, avant de monter ou au retour. Celui du chalet le fait aussi, mais il se juge au thermomètre et pas à la
réputation. »
→ « Congeler le poisson pendant au moins 15 heures à -35 °C ou plus froid, sinon pendant au moins 168 heures (7 jours) à
-20 °C. On peut le faire avant ou après le fumage. Avec un congélateur de chalet qui a du mal à descendre, c'est mieux
après, quand la pièce a perdu de l'eau. Dans les deux cas, on lit la température dans le congélateur avec un
thermomètre, sans se fier au cadran. Le congélateur de la maison, sur le réseau, tient sa température sept jours
d'affilée sans qu'on y pense : on fait souvent le gel là, avant de monter ou au retour. Celui du chalet peut le faire
aussi, à condition de le vérifier au thermomètre. »

**68, l. 380** : « **Rien de ce qui traîne dans un chalet ne marque le 15,6 °C**, et c'est pourtant le seuil qui décide
entre manger et jeter. La réponse honnête n'est pas un truc, c'est un calendrier : […] Ce retard est exactement ce qui
rend un caveau sûr en octobre et traître en mai — la terre est encore froide, mais les journées ne le sont plus, et
c'est l'air qui entre à l'ouverture de la porte qui fait monter la caisse. **Le sol retarde sur l'air d'autant plus
qu'on creuse : de l'ordre d'un mois par mètre de profondeur**, jusqu'à six mois vers 5 ou 6 m, où la température ne
bouge presque plus de l'année. Moins dans un sol humide ou dans le roc, plus dans un sol sec. »
→ Deux paragraphes, la décision puis la raison. « C'est à 15,6 °C qu'on doit jeter la pièce, mais rien de ce qu'on a au
chalet ne montre cette température. On se fie donc au calendrier : on commence une salaison seulement entre le premier
gel sérieux et le dégel, dans un caveau creusé dans le sol.
Le sol se réchauffe et se refroidit en retard sur l'air, d'environ un mois par mètre de profondeur, jusqu'à six mois
vers 5 ou 6 m, où la température ne bouge presque plus de l'année. Ce retard est moins grand dans un sol humide ou dans
le roc, plus grand dans un sol sec. C'est pour ça qu'un caveau est sûr en octobre et dangereux en mai. En mai, la terre
est encore froide, mais les journées ne le sont plus : chaque fois qu'on ouvre la porte, l'air qui entre réchauffe la
caisse. »

**Cause.** Le cadre demande de découper une étape à plusieurs gestes en sous-étapes (« Une étape qui a plusieurs gestes
se découpe en sous-étapes ») et de marquer l'autre façon (« Une autre façon de faire se dit comme une autre façon ») ;
rien ne dit qu'un paragraphe a un seul sujet et finit sur son geste. Habitude : les passes successives ajoutent les faits
au bout de l'étape qui en parle (l'avertissement en gras sur la souche, la phrase sur le chalet), et personne ne relit
le paragraphe d'un souffle après l'ajout.

### Motif 8. Le télégraphe : fragments sans verbe et listes de noms à la place des gestes (gravité moyenne)

**Ce qu'on entend.** Après le titre en gras de l'étape, la suite reste en style de fiche : « Au gramme, avant tout. »,
« Papier boucherie, sac de papier, coton. », « Pièce pendue, une ficelle par pièce, rien qui se touche ». Lu à voix
haute, c'est une liste qu'on lit sur une feuille, pas une explication ; le rythme saute d'un fragment de 4 mots à une
phrase de 46.

**Fréquence.** 22,3 % des phrases ont 6 mots et moins, contre 4,1 % dans l'Alberta et Ripley (les titres d'étapes y
comptent pour une partie, normale) ; les fragments sans verbe qui suivent un titre se trouvent dans une vingtaine
d'étapes (ch. 68, étapes 2, 3, 14 ; ch. 70, étapes 7, 22 et la variante ; ch. 78, étapes 1, 6, 19…).

**68, l. 167** : « **14. Suspendre.** Pièce pendue, une ficelle par pièce, rien qui se touche, air qui circule des deux
côtés. Sous filet ou coton à fromage si les mouches sont une possibilité — donc dès que la chambre remonte au-dessus du
gel. »
→ « **14. Suspendre.** Pendre chaque pièce à sa ficelle, assez loin des autres pour que rien ne se touche et que l'air
passe des deux côtés. Dès que la chambre remonte au-dessus du gel, les mouches peuvent venir : on couvre alors les
pièces d'un filet ou de coton à fromage. »

**70, l. 125** : « **Monter la chambre en matériaux qui ne rendent rien.** Planches brutes non traitées, acier noir,
acier inoxydable. Pas de contreplaqué ni de panneau collé dans le circuit — la colle chauffe et dégaze. Pas d'acier
galvanisé dans la zone chaude : le zinc se volatilise. »
→ « **Monter la chambre en matériaux qui ne rendent rien** : des planches brutes non traitées, de l'acier noir ou de
l'acier inoxydable. On n'y met ni contreplaqué ni panneau collé, parce que la colle dégage des gaz en chauffant. On n'y
met pas non plus d'acier galvanisé près de la chaleur, parce que le zinc part en vapeur. »

**78, l. 182** : « Sur un poêle à bois, cela veut dire une brassée fendue d'avance à portée de main, quelqu'un dans la
pièce du début à la fin, et une correction qui se fait en **déplaçant la marmite** sur le dessus du poêle plutôt qu'à
la clé d'air. »
→ « Sur un poêle à bois, on fend une brassée d'avance et on la garde à portée de main. Quelqu'un doit rester dans la
pièce du début à la fin. Pour corriger la pression, on déplace la marmite sur le dessus du poêle au lieu de toucher à la
clé d'air. »

**70, l. 213** : « **Emballer dans du perméable.** Papier boucherie, sac de papier, coton. »
→ « **Emballer la pièce dans ce qui laisse passer l'air** : du papier boucherie, un sac de papier ou du coton. »

**68, l. 102** : « **3. Peser, et écrire le poids.** Au gramme, avant tout. Tout ce qui suit est un pourcentage de ce
nombre-là. **Ce poids initial est aussi ce qui permettra, des semaines plus tard, de savoir où en est le séchage** : une
pièce dont on a perdu le poids de départ est une pièce dont on ne saura jamais si elle est prête. Sur l'étiquette
attachée à la pièce : le poids frais et la date de salage. »
→ « **3. Peser la pièce et écrire son poids.** On la pèse au gramme avant toute autre chose, parce que tout ce qui suit
se calcule en pourcentage de ce poids. Des semaines plus tard, ce poids sert aussi à savoir où en est le séchage : sans
lui, on ne saura jamais si la pièce est prête. On écrit donc le poids frais et la date de salage sur une étiquette
attachée à la pièce. »

**Cause.** La règle 0 du skill l'interdit (« pas une liste de noms qui tient lieu d'actions », « pas de participe en
chaîne ») ; le tome 4 n'a pas eu sa passe. Mais le format de l'étape (titre en gras, puis la suite) invite le fragment
comme prolongement du titre, et le format du Matériel (une ligne, un deux-points, 15 à 20 mots) a donné l'habitude des
notes de fiche. La règle 5 de `CLAUDE.md` (« Écrire dense ») pousse dans le même sens.

### Motif 9. L'incise qui coupe le souffle : tirets, noms latins, citations collées, « § » (gravité moyenne)

**Ce qu'on entend.** Au milieu de la phrase, la voix doit baisser pour une parenthèse, puis remonter chercher un sujet
laissé en route. Quatre sortes : le tiret double (« — … — »), le nom latin entre parenthèses, la citation d'un texte
officiel collée dans la phrase (la voix change de registre, une fois en anglais), le renvoi « (§5.4, étape 19) ».

**Fréquence.** 172 tirets (ch. 68 : 50 ; ch. 70 : 62 ; ch. 78 : 60), 46 noms latins entre parenthèses, 70 citations
entre guillemets, 30 renvois « § » ; 6,5 parenthèses pour 1000 mots, contre 2,4 dans les références et 0,4 dans
l'Alberta et Ripley.

**68, l. 25** : « Une pièce entière de gros gibier — orignal (*Alces americanus*) en priorité — qui arrive sur la table
de débitage quand il n'y a plus de place au congélateur, ou plus de courant pour le faire tourner. »
→ « Une pièce entière de gros gibier, surtout d'orignal, qui arrive sur la table de débitage quand le congélateur est
plein ou qu'il n'y a plus de courant pour le faire tourner. »

**70, l. 361** : « Les pièces pendent à des bâtons de bois franc écorcés — **jamais d'épinette noire (*Picea mariana*) ni
de sapin baumier (*Abies balsamea*)**, la résine passe dans la viande — ligaturés à la babiche posée mouillée, qui serre
en séchant (ch. 103). »
→ « On pend les pièces à des bâtons de bois franc écorcés, attachés avec de la babiche posée mouillée, qui serre en
séchant (ch. 103). On ne prend jamais d'épinette noire ni de sapin baumier pour les bâtons, parce que leur résine passe
dans la viande. »

**68, l. 115** : « Le plancher absolu est **2,5 %**, et il n'est **jamais donné seul** — toujours «avec un minimum de
100 ppm » de nitrite ou de nitrate. »
→ « Le minimum de 2,5 % vaut seulement avec au moins 100 ppm de nitrite ou de nitrate. »

**78, l. 317** : « C'est aussi pourquoi une recette de marinade ne se modifie pas : «do not alter vinegar, food, or water
proportions in a recipe or use a vinegar with unknown acidity » , et le vinaigre utilisé est à **5 % d'acidité
déclarée**. »
→ « C'est aussi pour ça qu'on ne change rien à une recette de marinade : on garde les proportions de vinaigre,
d'aliment et d'eau, et on prend un vinaigre à 5 % d'acidité déclarée, jamais un vinaigre d'acidité inconnue. »

**78, l. 281** : « la spore de *Clostridium botulinum* est «répandue dans la nature » — donc sur la viande d'orignal, sur
les betteraves du jardin, dans l'eau du lac — et elle **survit à l'eau bouillante**. »
→ « La spore du botulisme est partout dans la nature : sur la viande d'orignal, sur les betteraves du jardin, dans
l'eau du lac. Elle survit à l'eau bouillante. »

**Cause.** Les règles existent : aucun tiret (`CLAUDE.md`), pas de nom latin (cadre), la provenance ne s'imprime pas
(`CLAUDE.md`, règle 1), « section N », jamais « § » (skill `ecriture`). Le tome 4 n'est pas migré. **Le risque est
dans la façon de migrer** : `CLAUDE.md` donne les remplaçants du tiret dans l'ordre « virgule, deux-points, parenthèses
ou point » ; si la passe prend le deuxième, les 172 tirets du lot deviennent autant de deux-points (motif 2). Le point
et la réécriture doivent passer en premier.

### Motif 10. La litanie : « jamais…, jamais…, jamais… », « pas de…, pas de… » (gravité basse)

**Ce qu'on entend.** Trois à six membres qui commencent par le même mot. À voix haute, c'est un martèlement : on
décroche après le deuxième, et la liste mélange parfois des lieux, des objets et des gestes.

**Fréquence.** 16 phrases avec trois « jamais », « ni » ou « pas de » et plus (ch. 68 : 4 ; ch. 70 : 6 ; ch. 78 : 6).

**70, l. 133** : « Jamais adossé au chalet, jamais sous un auvent fermé, jamais dans un hangar, jamais sous une fenêtre
de chambre : un appareil à combustion ne s'utilise jamais dans une pièce, un abri ou un véhicule, et un fumoir est un
abri. »
→ « On ne l'adosse pas au chalet, et on ne le met ni sous un auvent fermé, ni dans un hangar, ni sous la fenêtre d'une
chambre. »

**78, l. 293** : « **Conséquence, sans exception : aucun aliment peu acide ne se met en pot — ni à la maison, ni au
chalet — s'il n'y a pas d'autoclave. Pas avec plus de temps, pas avec plus de sel, pas avec un four, pas avec un
bain-marie de dix heures.** »
→ « Sans autoclave, on ne met en pot aucun aliment peu acide, à la maison comme au chalet. Le faire bouillir plus
longtemps, le saler plus, le passer au four ou au bain-marie pendant dix heures ne remplace pas l'autoclave. »

**78, l. 549** : « **Toute la moitié peu acide du chapitre.** Pas de viande, pas de poisson, pas de bouillon, pas de
légume du jardin, pas de champignon, pas de plat cuisiné prêt à ouvrir. C'est la perte la plus lourde, et aucune ruse
ne la récupère. »
→ « **Toute la moitié peu acide du chapitre.** On n'a plus de viande, de poisson, de bouillon, de légumes du jardin, de
champignons ni de plats cuisinés prêts à ouvrir. Aucune autre méthode ne rattrape cette perte, la plus lourde. »

**68, l. 319** : « Pas d'électricité, pas de sel de salaison nitrité, pas de balance, pas de thermomètre d'ambiance,
personne à qui demander. »
→ « On n'a plus de courant, plus de sel nitrité, plus de balance ni de thermomètre pour la chambre et personne à qui
demander. »

**Cause.** Habitude d'insistance : la répétition remplace l'accent qu'on mettrait à l'oral. Le skill `langue` (section
10) règle les « ou » l'un dans l'autre, pas l'anaphore ; aucune règle ne la nomme.

## 3. Ce qui marche, comme modèles

**1. La pesée par substitution, ch. 68, l. 339.** « Poser la pièce de viande sur le plateau de gauche. Verser du sable,
du gravier ou de la neige tassée sur celui de droite jusqu'à l'équilibre — peu importe combien, on ne le saura jamais.
**Retirer la viande**, laisser le sable en place, puis verser de l'eau **dans le même plateau de gauche**, dans un
contenant dont on a mesuré le vide de la même façon, jusqu'à retrouver l'équilibre. La masse d'eau versée est la masse
de la viande. »
Pourquoi : chaque phrase est un geste, dans l'ordre où on le fait ; les longueurs changent (10, 24, 34, puis 10 mots) ;
« puis » et « jusqu'à » disent l'enchaînement et la fin du geste ; la phrase courte qui suit donne le résultat, pas une
formule. (Le tiret sort, et la dernière phrase du paragraphe, en « : c'est le seul montage… », se coupe en deux.)

**2. Le bain d'eau bouillante, ch. 78, l. 157.** « **13. Partir la minuterie quand l'eau bout franchement, pas avant.**
Le temps est celui de la recette. Si le bouillon s'arrête en cours de route, le compte **repart à zéro**. »
Pourquoi : un geste par étape, avec son moment (« quand l'eau bout ») ; la condition avant ce qui arrive (« Si… ») ;
des phrases de 6 à 13 mots qui changent de longueur ; aucun deux-points ; l'étape finit sur ce qui arrive. Les
étapes 11 à 14 tiennent toutes ce tempo.

**3. Le cadran remis d'aplomb, ch. 70, l. 385.** « Plonger la tige dans un verre de glace pilée noyée d'eau, brasser,
attendre que l'aiguille s'arrête ; recommencer dans l'eau bouillante. Sous la tête de la plupart des cadrans se cache un
petit écrou à six pans : on tient la tête d'une main, on tourne l'écrou de l'autre jusqu'à ce que l'aiguille tombe sur
le point. »
Pourquoi : une suite de gestes à l'infinitif, chacun son verbe, dans l'ordre où on les fait ; les deux mains, chacune
son geste ; « jusqu'à ce que » dit quand le geste est fini. Le deux-points annonce le geste, il ne porte pas une conclusion.

**4. Le vinaigre, ch. 78, l. 516.** « …on écrase des pommettes, des pommes ou des petits fruits, on laisse le jus
fermenter en alcool avec les levures déjà présentes sur les fruits, puis on laisse cet alcool à l'air libre, au tiède et
à couvert d'un linge, jusqu'à ce qu'il tourne piquant. »
Pourquoi : la phrase entière fait 58 mots et se lit d'un trait, parce que chaque proposition est le geste suivant, avec
« on » et son verbe, « puis » pour l'enchaînement et « jusqu'à ce que » pour la fin. La preuve que la longueur n'est pas
le problème quand l'ordre de la phrase est l'ordre du travail. (Seul le début, « Le vinaigre se fait, et ça vaut la peine
de savoir le faire : », est dans le moule.)

**5. Tenir la pression sur un poêle à bois, ch. 78, l. 401.** « Des morceaux semblables ajoutés à intervalle régulier
donnent une pression plate ; une grosse bûche donne une bosse, puis un creux. » ; « Le dessus d'un poêle a un centre
chaud et des bords tièdes : glisser la marmite vers le bord agit tout de suite. »
Pourquoi : on dit ce qu'on voit et ce qu'on fait, avec des mots du garage (une bosse, un creux, le bord tiède) ; le
point-virgule compare deux cas qui sont vraiment deux cas ; « puis » donne la suite de ce qui arrive. Même chose au
ch. 78, l. 140 : « Trop plein, le pot déborde en traitement et le joint se souille. Trop vide, l'air résiduel empêche le
vide de se faire. » Une vraie symétrie (deux cas), pas une opposition fabriquée.

## 4. Pour les auditeurs du nouveau skill

Ce que ce lot permet de mesurer, avec des seuils tirés de l'Alberta et de Ripley (à confirmer sur les autres lots) :

- phrases à deux-points : au plus 10 % ; au plus une « fait : conséquence » par paragraphe ;
- « , et » + nouveau sujet : au plus 5 % ; « , et c'est… » : aucune ;
- phrases qui commencent par une condition ou un moment : au moins 8 % dans la procédure ;
- « ne… pas X, c'est Y » et « Ce qui…, c'est… » : aucune hors d'un vrai contraste que le lecteur pourrait confondre ;
- phrase de 40 mots et plus : seulement si ses propositions suivent l'ordre des gestes (modèle 4) ;
- dernière phrase de paragraphe de 9 mots et moins : lue une par une (une formule sort, un renvoi reste) ;
- à la migration : un tiret devient un point ou une réécriture d'abord, jamais un deux-points par défaut.

Les réécritures de ce fichier, mesurées avec `tempo.py`, sont dans la section 5.

## 5. Contrôle des réécritures

Les 50 réécritures de la section 2 ont été relues contre les mêmes motifs : aucun tiret, aucun « , et c'est »,
aucun « n'est pas X, c'est Y », aucun « d'où », aucune consigne au pronominal, un seul « ou » par phrase, aucun nom
latin, aucune citation. Deux « , et » restent, avec le même sujet « on » des deux côtés. `langue.py` (avec
LanguageTool) : 5 avis, 2 corrigés (« à intervalles réguliers », une virgule avant « et » en fin de liste), 3 faux
positifs (« verni », « chargé », « entre » pris pour une préposition). Mesurées avec `tempo.py`, à côté des
51 passages d'origine :

| texte | mots | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| passages d'origine | 2229 | 22,3 | 0,72 | 15,0 | 29,0 | 21,2 | 40,0 | 33,0 | 3,6 | 4,0 | 7,2 |
| réécritures | 2244 | 17,8 | 0,46 | 7,9 | 7,1 | 29,6 | 11,1 | 10,3 | 1,8 | 2,2 | 20,5 |
| Alberta et Ripley | 4607 | 21,1 | 0,47 | 4,1 | 20,6 | 32,3 | 1,8 | 0,5 | 0,7 | 0,4 | 2,6 |

Même nombre de mots. Le deux-points tombe de 40 à 11 %, le « fait : conséquence » de 33 à 10 %, les liens parlés
passent de 7 à 20 pour 1000 mots. **La variation baisse (0,72 à 0,46) et la monotonie monte (21 à 30 %)**, au niveau de
l'Alberta et de Ripley : lues à voix haute, ces phrases de longueur voisine passent, parce que leurs attaques changent
(« Si », « Quand », « On », « Pour ») et que chacune dit son lien. Un auditeur du tempo ne doit donc pas chasser la
monotonie de longueur seule ; il doit chasser le deux-points en série, la rallonge et le balancier.
