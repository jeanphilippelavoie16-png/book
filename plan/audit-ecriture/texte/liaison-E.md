# Audit de l'écriture : les liens entre les phrases, lot E (tome 4)

28 octobre 2026. Un seul regard : **les liens entre les phrases**, la logique dite ou sous-entendue. À chaque point, le
lecteur sait-il si la phrase suivante est la cause de la précédente, sa conséquence, sa condition, une exception ou un
exemple ? Lot : `chapitres/68-salaison-a-sec.md`, `chapitres/70-fumage-a-froid.md`,
`chapitres/78-conserves-et-marinades.md`, lus au complet. Aucun fichier du livre n'a été modifié. Les réécritures sont
des exemples : aucun fait ni chiffre neuf, seulement les mots qui disent le lien et l'ordre des morceaux. Les citations
sont mot pour mot, sans les marques de gras du markdown ; le numéro est celui de la ligne où la citation commence.

Ce lot est différent du lot A : les trois chapitres n'ont jamais eu de passe de style (un seul commit, celui du
départ). Ils ont encore le gabarit en neuf sections, 171 tirets, des « § » et des pronominaux. Ce qui est jugé ici, ce
n'est que le lien. C'est justement ce qui rend le lot utile : il montre le texte **avant** les passes, et la comparaison
avec le ch. 3 dit ce que les passes ont fait aux liens (section 1).

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | « : » % | fait:csq % | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 68 | 5055 | 306 | 16,5 | 25,8 | 19,9 | 5,1 | 5,9 |
| ch. 70 | 5771 | 302 | 19,1 | 33,8 | 25,8 | 5,2 | 5,0 |
| ch. 78 | 5401 | 316 | 17,1 | 30,4 | 24,4 | 5,6 | 6,0 |
| **le lot** | 16227 | 924 | 17,6 | 30,0 | 23,4 | 5,3 | 5,6 |

### Les mots de liaison, un par un (`tempo.py --json`, nombres réels)

| mot | ch. 68 | ch. 70 | ch. 78 | lot, pour 1000 mots | les 7 références | lot A (tome 1 refait) |
| --- | --- | --- | --- | --- | --- | --- |
| parce que | 5 | 5 | 5 | 0,92 | 0,35 | 0,34 |
| car | 1 | 0 | 1 | 0,12 | 1,50 | 0 |
| donc | 5 | 7 | 7 | 1,17 | 0,64 | 0,29 |
| alors | 3 | 0 | 1 | 0,25 | 0,69 | 0,46 |
| mais | 4 | 4 | 5 | 0,80 | 3,76 | 0,57 |
| sinon | 1 | 3 | 1 | 0,31 | 0 | 0,34 |
| c'est (tous les emplois) | 30 | 39 | 38 | 6,59 | 1,73 | |
| phrases « fait : conséquence » | 19,9 % | 25,8 % | 24,4 % | 23,4 % | 3,1 % | 23,3 % |

Le lot a trois fois plus de « parce que » et quatre fois plus de « donc » que le lot A, qui a passé par les passes de
style. Il a quand même autant de phrases en « fait : conséquence » (23,4 %, contre 3,1 % dans les références), presque
pas de « car » et cinq fois moins de « mais » que les références. Le texte de départ disait déjà une partie de ses liens
avec le deux-points ; les passes ont fait le reste.

### Ce que les passes ont fait aux liens (git, ch. 3)

Le ch. 3 au premier commit (`bc816f4f`, même état que le lot E aujourd'hui) et le ch. 3 d'aujourd'hui, après les passes
de style et d'éditeur :

| ch. 3 | mots | « : » % | fait:csq % | parce que /1000 | donc /1000 | mais /1000 | tirets |
| --- | --- | --- | --- | --- | --- | --- | --- |
| premier commit | 8578 | 32,4 | 23,6 | 1,63 | 1,05 | 0,93 | 70 |
| aujourd'hui | 7757 | 37,6 | 30,0 | 0,52 | 0,39 | 0,64 | 2 |

Les passes ont enlevé deux « parce que » sur trois et presque deux « donc » sur trois, et la part des phrases en
« fait : conséquence » a monté de 6 points. Les 68 tirets enlevés sont allés en bonne partie au deux-points. **Si la
grande passe du tome 4 suit les mêmes règles, les 15 « parce que » et les 19 « donc » de ce lot vont tomber, et ses
tirets de cause vont devenir des deux-points.**

### Ce que portent les tirets du lot (relevé à la main, ch. 68)

Le ch. 68 a 29 tirets dans le texte courant (hors titres, tableaux et lignes de matériel). 13 encadrent une précision ou
une liste (une parenthèse ou un deux-points de liste les remplace sans perte). **10 portent un lien** : 6 une cause
(« il y en aura peu — c'est une bête maigre », ligne 110), 2 une conséquence (ligne 42, ligne 452), 2 une condition ou
un contraste (ligne 115, ligne 261). Les 6 autres font un « c'est-à-dire », une suite ou une chute. La règle du tiret
donne le deux-points comme remplaçant, sans dire qu'un tiret de cause devient « parce que ».

### Ce que fait le deux-points dans les procédures (relevé à la main)

Les 68 phrases à deux-points des trois sections 5 (Procédure), classées selon le mot qu'on dirait à sa place :

| Le deux-points tient lieu de | ch. 68 | ch. 70 | ch. 78 | lot |
| --- | --- | --- | --- | --- |
| une liste, un cas, un calcul, un détail (l'emploi normal) | 14 | 17 | 7 | 38 |
| « parce que » (la cause vient après) | 3 | 8 | 4 | 15 |
| « donc », « c'est pour ça que » (la conséquence vient après) | 2 | 5 | 3 | 10 |
| « à la place » (une consigne remplace l'autre) | 0 | 1 | 2 | 3 |
| « mais » | 0 | 1 | 0 | 1 |
| « si » | 0 | 1 | 0 | 1 |

**30 deux-points sur 68 tiennent lieu d'un mot de lien**, et les deux sens se suivent à quelques lignes : au ch. 70,
ligne 127, ce qui suit le deux-points est la cause (« Pas d'acier galvanisé dans la zone chaude : le zinc se
volatilise. ») ; ligne 144, c'est la conséquence (« L'aulne pousse partout sur la Côte-Nord dans les bords humides :
c'est le bois de fumage le plus disponible du territoire. »). Le lecteur tranche lui-même, chaque fois.

## 2. Le passage du ch. 70 qui ressemble au paragraphe du monoxyde

Ch. 70, étape 19, ligne 200 :

> Ne jamais laisser le foyer sans surveillance la nuit, et ne jamais entrer respirer dans la chambre pour «voir si ça
> fume bien ». Le monoxyde de carbone «ne se voit pas et ne se sent pas » et «n'irrite pas les yeux ni les voies
> respiratoires ». La fumée pique ; le monoxyde ne pique pas.

| Passage | Le lien que le lecteur doit deviner |
| --- | --- |
| phrase 1 → phrase 2 | Aucun mot. Deux consignes, puis une raison : le lecteur ne sait pas si le monoxyde explique la surveillance de nuit, l'entrée dans la chambre, ou les deux. La surveillance de nuit n'a pas de raison dans l'étape. |
| phrase 2 → phrase 3 | Aucun mot. La phrase 3 redit la fin de la phrase 2 (« n'irrite pas les yeux » et « ne pique pas »), et le contraste qui lui donne son sens n'est pas dit ici : on se fie à la fumée qui pique pour juger l'air. Il est à la section 8, point 4 (« la fumée de bois pique les yeux, ce qui donne l'impression qu'on saurait si l'air devenait mauvais »). |
| point-virgule de la phrase 3 | Tient lieu de « mais ». |

Réécriture, mêmes faits :

> Ne jamais laisser le foyer sans surveillance la nuit. Ne jamais entrer dans la chambre pour voir si ça fume bien. On
> croit qu'on s'en rendrait compte si l'air devenait mauvais, parce que la fumée pique les yeux. Mais le monoxyde de
> carbone qui vient avec ne pique pas, ne se voit pas et ne se sent pas.

La première consigne reste seule : sa raison n'est pas dans le chapitre, et ce n'est pas au relecteur des liens d'en
fournir une. La séparer empêche seulement le lecteur de croire que le monoxyde l'explique.

## 3. Les défauts, du plus grave au moins grave

### 3.1 Le deux-points, la virgule ou le tiret à la place de « parce que » et de « donc » (gravité haute)

Le signe ne dit pas dans quel sens va la relation : le lecteur doit décider si ce qui suit explique ce qui précède ou en
découle. À voix haute, le deux-points n'existe pas : on dit le mot. La virgule et le tiret font le même travail quand ils
séparent une consigne de sa raison.

Fréquence : 30 deux-points sur 68 dans les procédures (section 1) ; 23,4 % des phrases du lot en « fait :
conséquence », contre 3,1 % dans les références ; au ch. 68, 10 tirets sur 29 portent une cause, une conséquence ou un
contraste.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| 68, 108 | « Garder la couverture de gras propre du côté extérieur : elle protège la surface du dessèchement en croûte. » | « Garder la couverture de gras propre du côté extérieur, parce qu'elle empêche la surface de sécher en croûte. » |
| 70, 164 | « Le bois doit couver, pas flamber : une flamme dans le foyer fait monter la chambre et sort du procédé. » | « Le bois doit couver sans flamber, parce qu'une flamme dans le foyer fait monter la chaleur de la chambre, et on ne fume plus à froid. » |
| 70, 171 | « Cette pellicule est ce qui fixe la fumée : sur une surface mouillée, la fumée se dilue dans l'eau et coule, et l'eau tiède plus la fumée fait une surface idéale pour la flore de surface. » | « Il faut cette pellicule pour que la fumée tienne sur la pièce. Sur une surface mouillée, la fumée se dilue dans l'eau et coule, et la surface tiède et humide devient idéale pour les microbes. » |
| 78, 180 | « Sur un rond de cuisinière, le réglage se trouve une fois et tient seul : c'est la vraie raison de faire le peu acide à la maison plutôt qu'au chalet, et elle vaut plus que le confort. » | « Sur un rond de cuisinière, on trouve le réglage une fois et il tient tout seul. C'est pour ça qu'on fait le peu acide à la maison plutôt qu'au chalet. » (« elle vaut plus que le confort » n'apprend rien) |
| 78, 201 | « Un pot non scellé n'est pas un pot de conserve : il va au réfrigérateur et se mange dans les jours qui suivent, ou il repasse au traitement complet avec un couvercle neuf, ou il se congèle. » | « On ne garde pas sur la tablette un pot qui n'a pas scellé. On a alors trois choix : le mettre au réfrigérateur et le manger dans les jours qui suivent, le traiter de nouveau au complet avec un couvercle neuf, ou le congeler. » |
| 78, 160 | « les poser sur un linge ou une planche de bois — jamais sur une surface froide, le choc thermique fend le verre. » (le tiret et la virgule) | « les poser sur un linge ou une planche de bois, jamais sur une surface froide, parce que le choc de température fend le verre. » |

Cause, dans nos règles :
- skill `ecriture`, règle 2 : « Le fait d'abord, la raison ensuite », avec pour modèle une phrase en deux-points
  (« Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant. ») : la règle enseigne la forme ;
- `CLAUDE.md` (« Pas de tiret (— ou –) dans une phrase : virgule, deux-points, parenthèses ou point ») et la section
  « Le tiret » du skill `ecriture` donnent le deux-points comme remplaçant, sans dire quoi faire d'un tiret de cause ;
  la mesure du ch. 3 montre où sont allés ses 68 tirets ;
- la preuve dans git : les passes du ch. 3 ont fait passer « parce que » de 1,63 à 0,52 et « donc » de 1,05 à 0,39 pour
  1000 mots ; la grande passe du tome 4 fera la même chose à ce lot si la règle ne change pas.

### 3.2 Le paragraphe de faits posés côte à côte (gravité haute)

La même forme que le paragraphe du monoxyde : trois ou quatre phrases complètes, chacune un fait, sans un mot qui dise
comment la deuxième se rattache à la première. Chaque phrase repart de son propre sujet, et le lecteur refait le
raisonnement que le texte a sauté. À l'oreille, c'est ce qui donne le tempo haché : chaque phrase s'arrête net et la
suivante repart de zéro.

Fréquence, relevée à la main : les trois sections 3 (« Pourquoi ça marche ») et au moins neuf étapes (ch. 68, étapes 10
et 13 ; ch. 70, étapes 8, 19 et 22 ; ch. 78, étapes 4, 5, 10 et 23).

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| 68, 67 | « Le sel sec posé sur la viande fait sortir l'eau des cellules et entre à sa place. Ce qui compte n'est pas la quantité de sel mais l'eau qui reste disponible aux bactéries, l'activité de l'eau ou aw : sous 0,85, la pièce tient sans froid ; avant, c'est le froid qui la tient. Le sel avance lentement, depuis l'extérieur : les jours se comptent au kilogramme, pas à la pièce. Le nitrite, lui, ne sèche rien : il freine les microbes et leurs toxines pendant que le sel avance, et une seule des deux barrières ne fait pas le travail des deux. » (le paragraphe en paraboles que JP a relevé au ch. 3) | « Le sel posé sur la viande fait sortir l'eau des cellules et prend sa place. L'eau qui reste aux bactéries compte donc plus que la quantité de sel ; on l'appelle l'activité de l'eau (aw). Tant que l'aw n'est pas descendue sous 0,85, c'est le froid qui garde la pièce ; sous 0,85, elle se garde sans froid. Comme le sel entre lentement, de l'extérieur vers le centre, on compte les jours au kilogramme de viande, pas à la pièce. Le nitrite fait un autre travail : il ne sèche pas la viande, mais il freine les microbes et leurs toxines pendant que le sel avance. Il faut donc les deux. » |
| 78, 120 | « Compter le bois ou le propane. Un cycle d'autoclave complet — montée en pression, maintien, descente — prend plus de temps que le seul maintien. Un poêle qui tombe à mi-course gâche la fournée entière, et une fournée gâchée est une fournée à jeter, pas à recommencer. Le bois se prépare avant, pas pendant. » | « Compter le bois ou le propane pour tout le cycle. La montée en pression et la descente s'ajoutent au maintien, donc le cycle dure plus longtemps que le seul maintien. Si le poêle baisse à mi-course, toute la fournée est gâchée, et on doit la jeter sans pouvoir la recommencer. C'est pour ça qu'on prépare le bois avant d'allumer, pas pendant. » |
| 68, 136 | « Le sel fait sortir de l'eau ; cette eau se charge de sel et devient une saumure. En salaison à sec, elle s'évacue : la pièce ne trempe pas dedans. Une pièce qui baigne n'est plus au chapitre 68, elle est au chapitre 69, et pas selon le barème du 69. » | « Le sel fait sortir de l'eau de la viande, et cette eau, chargée de sel, devient une saumure. En salaison à sec, on laisse cette saumure s'écouler pour que la pièce ne trempe pas dedans. Si la pièce baigne dans ce liquide, elle est en saumure, mais sans le dosage ni le barème du ch. 69. » |
| 78, 147 | « Poser le couvercle neuf et visser l'anneau du bout des doigts, sans forcer. L'air doit pouvoir sortir pendant le traitement. Un anneau serré à la clé fait sauter des pots. » | « Poser le couvercle neuf et visser l'anneau du bout des doigts, sans forcer, pour que l'air puisse sortir du pot pendant le traitement. Si on serre l'anneau à la clé, des pots sautent. » |

Cause, dans nos règles :
- skill `ecriture`, règle 1 : « Une phrase, une information. Deux faits, deux phrases. » Appliquée à la lettre, elle
  coupe la cause de sa conséquence et ne dit pas de remettre le lien entre les deux phrases ;
- `gabarit-chapitre.md`, section 3 (encore dans le fichier) : « Trois à cinq phrases de principe, 120 mots au plus » :
  une liste de principes, sans place pour les liens ;
- le correctif existe, mais seulement dans une ligne du tableau du skill (le « paragraphe en paraboles » du ch. 3 : « on
  passe d'un mécanisme à l'autre par un lien qui se lit ») ; ce n'est pas une règle, et le tableau parle d'un cas.

### 3.3 Le pourquoi absent, rejeté après coup ou caché dans un « quand » (gravité haute)

L'étape donne le geste ; le but arrive dans une autre phrase, dit par la négative (« Sans courant… »), sous forme de
définition (« Ce n'est pas un bain »), ou caché dans un complément de temps (« quand la pièce a perdu de l'eau » veut dire
« parce que »). Le lecteur doit deviner à quoi sert le geste, donc ce qu'il peut changer quand il lui manque une chose.

Fréquence : relevée à la main dans au moins une étape sur cinq des trois procédures ; « pour que » paraît une fois dans
tout le lot (0,06 pour 1000 mots).

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| 70, 130 | « Entrée d'air en bas, sortie en haut, registre réglable sur la sortie. Sans courant lent et continu, la surface reste humide et la fumée se condense en dépôt amer au lieu de se déposer en couche sèche. » | « Faire une entrée d'air en bas et une sortie en haut, avec un registre sur la sortie, pour que l'air traverse la chambre lentement et sans arrêt. Sinon, la surface de la pièce reste humide, et la fumée s'y condense en dépôt amer au lieu de former une couche sèche. » |
| 70, 96 | « Le «avant ou après » est la seule souplesse, et elle est utile : un congélateur de chalet qui peine à descendre sert mieux après le fumage, quand la pièce a perdu de l'eau. » | « On peut congeler le poisson avant ou après le fumage. Si le congélateur du chalet a du mal à descendre, il vaut mieux congeler après, parce que la pièce a alors perdu de l'eau. » |
| 78, 165 | « Mettre au fond de l'autoclave la quantité d'eau prescrite par le fabricant, pas plus. Ce n'est pas un bain : c'est un générateur de vapeur. » | « Mettre au fond de l'autoclave la quantité d'eau que demande le fabricant, pas plus, parce que cette eau sert seulement à faire la vapeur qui chauffe les pots. » |
| 78, 205 | « Retirer les anneaux avant de ranger. Un anneau laissé en place tient mécaniquement un couvercle qui a lâché et cache exactement le défaut qu'on cherche à voir. » | « Retirer les anneaux avant de ranger les pots, parce qu'un anneau laissé en place retient un couvercle qui a lâché et cache le défaut qu'on cherche à voir. » |
| 70, 213 | « Emballer dans du perméable. Papier boucherie, sac de papier, coton. Pour le poisson fumé réfrigéré, la perméabilité à l'oxygène doit être égale ou supérieure à 2 000 cc/m²/24 h : l'emballage laisse entrer l'oxygène. Le sac sous vide fait exactement le contraire. » (le pourquoi, l'oxygène qui arrête le botulisme de type E, est à la section 8, point 1) | « Emballer dans du papier de boucherie, un sac de papier ou du coton, qui laissent entrer l'oxygène, parce que l'oxygène est la dernière barrière contre le botulisme de type E (section 8, point 1). Pour le poisson fumé gardé au réfrigérateur, l'emballage doit laisser passer au moins 2 000 cc/m²/24 h d'oxygène. Le sac sous vide retire cet oxygène, donc on ne s'en sert jamais ici. » |

Cause, dans nos règles :
- skill `ecriture`, tableau « Ce qui sort » : « La justification collée au geste » (« Ne pas rester dans l'auto : la tôle
  n'arrête rien » devient « Entrer dans un bâtiment ») apprend à couper le pourquoi, sans dire quand il doit rester ;
- règle 2 : « la raison ensuite, et seulement si la raison change ce qu'on fait » : la raison devient une phrase à part,
  après le geste, sans lien ;
- l'ancien gabarit gardait le pourquoi loin des gestes (section 3, section 8). `CLAUDE.md` demande maintenant qu'« un
  mécanisme qui apprend quelque chose va dans l'étape qu'il explique » ; sans mot de lien, il arrivera dans l'étape comme
  un fait de plus, à la fin.

### 3.4 L'ordre de l'information et le saut d'une idée à l'autre (gravité moyenne)

Une étape grossit par ajouts : un chiffre de source, une précision, une autre façon, un avertissement. Chaque ajout va
à la fin, et l'étape finit par aller du geste à la raison, puis à un autre sujet, puis à un autre chiffre. La raison
arrive après un fait qui n'a rien à voir, la consigne arrive après sa justification, et deux sujets se partagent la même
étape sans transition.

Fréquence : relevée à la main dans cinq longs passages (ci-dessous) ; elle touche surtout les étapes de plus de 80 mots.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| 70, 184 | « La température de chambre. La règle est fonctionnelle : la chair ne coagule pas (étape 16). Le plafond chiffré est 32 °C dans la chambre. Au-dessus, on ne tue pas le botulisme — la chaleur d'un fumage à froid n'affaiblit pas ses spores —, on tue les bactéries ordinaires qui auraient gâté le poisson, à l'odeur, avant que la toxine se forme : on enlève l'alarme et on garde le danger. Ce qui est sûr aussi, c'est que la zone de danger va de 4 °C à 60 °C, et entre 35 °C et 45 °C le nombre de bactéries peut doubler toutes les 15 minutes. La conduite qui en découle : garder la chambre le plus bas possible, la lire au thermomètre chaque heure, et si elle s'approche de la plage de doublement rapide, éteindre, sortir les pièces au froid et reprendre le lendemain. Une séance interrompue ne se paie qu'en goût ; une séance tiède se paie autrement. » (deux raisons mêlées, « Ce qui est sûr aussi » au lieu de « ensuite », la consigne à la fin) | « Garder la chambre sous 32 °C, et le plus bas possible. La chair ne doit pas coaguler (étape 16) ; en chiffre, la chambre ne doit pas dépasser 32 °C, pour deux raisons. D'abord, au-dessus de 32 °C, la chaleur n'affaiblit pas les spores du botulisme, mais elle tue les bactéries ordinaires qui auraient fait sentir le poisson mauvais avant que la toxine se forme. On perd donc l'avertissement, et le danger reste. Ensuite, la zone de danger va de 4 à 60 °C, et entre 35 et 45 °C, le nombre de bactéries peut doubler toutes les 15 minutes. Lire le thermomètre de la chambre chaque heure. Si la chambre approche de 35 °C, éteindre, sortir les pièces au froid et reprendre le lendemain, parce qu'une séance interrompue ne coûte que du goût. » |
| 68, 159 | « Rincer le sel de surface à l'eau froide, éponger, remettre au froid sans sel, sous 5 °C, à couvert léger : d'un mois pour une petite pièce jusqu'à trois mois pour une pièce peu salée, le temps que le sel de la couche externe gagne le centre. La pièce y perd encore de 10 à 15 % de son poids. Une pièce qui sort de sa salaison est salée en surface et pas au centre, et la trancher à ce moment-là donne exactement l'impression trompeuse d'un produit fini. » (la raison de l'étape arrive en dernier, après un fait sur le poids) | « À la sortie du sel, la pièce est salée en surface, mais pas encore au centre, même si une tranche a l'air d'un produit fini. Il faut donc laisser au sel de la surface le temps de gagner le centre : rincer le sel à l'eau froide, éponger, et remettre la pièce au froid sans sel, sous 5 °C, à couvert léger, d'un mois pour une petite pièce jusqu'à trois mois pour une pièce peu salée. Pendant ce temps, elle perd encore de 10 à 15 % de son poids. » |
| 78, 179 | « Tenir la chaleur stable. Une pression qui retombe sous la cible oblige à reprendre le compte au complet. Sur un rond de cuisinière, le réglage se trouve une fois et tient seul : c'est la vraie raison de faire le peu acide à la maison plutôt qu'au chalet, et elle vaut plus que le confort. Sur un poêle à bois, cela veut dire une brassée fendue d'avance à portée de main, quelqu'un dans la pièce du début à la fin, et une correction qui se fait en déplaçant la marmite […]. Une pression qui fait des bonds vide les pots de leur liquide. Un autoclave n'est pas un appareil qu'on laisse. » (le choix du lieu au milieu du geste ; la deuxième raison de tenir la pression arrive à la fin, seule) | « Tenir la pression stable, parce qu'une pression qui retombe sous la cible oblige à reprendre le compte au complet, et qu'une pression qui fait des bonds vide les pots de leur liquide. Sur un poêle à bois, il faut donc quelqu'un dans la pièce du début à la fin, avec une brassée de bois fendu à portée de main. On corrige en déplaçant la marmite sur le dessus du poêle plutôt qu'avec la clé d'air, et on corrige avant d'arriver à la pression, parce qu'elle continue de monter un moment après qu'on a retiré de la chaleur. On commence donc à tirer la marmite vers le bord quand il manque encore une dizaine de kPa. » (la phrase sur le rond de cuisinière va à l'étape 4 ou à la ligne de lieu) |
| 70, 147 | Étape 12 : « Pas de résineux vif », puis la souche d'épinette des Innus, son mécanisme, quand elle tourne mal, « Et elle change le bois, pas les barrières : sel, froid et gel du chapitre s'appliquent pareil », puis « Jamais de bois traité, peint, verni ou collé […]. Jamais de bois d'épave de la grève ». Trois sujets, dont le dernier appartient à l'étape 11 (ce qu'on brûle). | Couper en deux étapes : « Ne pas brûler de résineux vif » avec sa raison ; « La vieille souche d'épinette, à la façon des Innus ». Les liens : « Mais la fumée devient mauvaise si on change de bois : une souche encore ferme, une branche verte, du bois qui colle aux doigts, ou le cœur dur, lourd et orangé qui sent la gomme, au centre de certaines vieilles souches, surtout de pin (ce bois est saturé de résine et flambe au lieu de couver). » ; « La souche remplace seulement le bois de fumage, donc le sel, le froid et le gel du chapitre s'appliquent pareil. » Le bois traité et le bois d'épave retournent à l'étape 11. |
| 68, 380 | « Rien de ce qui traîne dans un chalet ne marque le 15,6 °C, et c'est pourtant le seuil qui décide entre manger et jeter. La réponse honnête n'est pas un truc, c'est un calendrier : on ne commence une salaison qu'entre le premier gel sérieux et le dégel, et dans un caveau creusé dans le sol, parce que le sol suit l'air avec du retard. Ce retard est exactement ce qui rend un caveau sûr en octobre et traître en mai — […] Le sol retarde sur l'air d'autant plus qu'on creuse : de l'ordre d'un mois par mètre de profondeur, jusqu'à six mois vers 5 ou 6 m […]. » (la consigne d'abord, le mécanisme du retard en dernier) | « Rien de ce qu'on a au chalet ne marque 15,6 °C, et c'est pourtant ce chiffre qui décide si on mange ou si on jette. On se fie donc au sol. Le sol suit la température de l'air avec du retard, et ce retard grandit avec la profondeur : de l'ordre d'un mois par mètre, jusqu'à six mois vers 5 ou 6 m, où la température ne bouge presque plus de l'année (moins dans un sol humide ou dans le roc, plus dans un sol sec). C'est pour ça qu'on ne commence une salaison qu'entre le premier gel sérieux et le dégel, et dans un caveau creusé dans le sol. Le même retard rend le caveau sûr en octobre, mais traître en mai : la terre est encore froide, mais les journées ne le sont plus, et l'air qui entre quand on ouvre la porte réchauffe la caisse. » |

Cause : une habitude d'écriture plus qu'une règle. Les règles qui touchent l'ordre parlent de la phrase, pas de
l'étape : skill `ecriture`, règle 3 (« La condition avant le geste ») et règle 12 (« qui fait quoi, quand et pourquoi,
dans cet ordre-là »). Aucune ne dit l'ordre d'une étape : le geste, la raison, ce qu'on voit, puis l'autre façon. Le
découpage en sous-étapes du cadre (« Une étape qui a plusieurs gestes se découpe en sous-étapes ») règle les gestes,
pas les raisons.

### 3.5 La condition, la limite ou le contraste qui n'est pas marqué (gravité moyenne)

Le « mais », le « seulement si », le « même si », le « quand même » manquent. Le lecteur lit deux faits qui vont en sens
contraire, ou une règle dont la limite arrive au bout de la phrase, et ne sait pas lequel l'emporte. Dans un livre de
salaison et de conserve, c'est souvent la limite qui fait la sécurité.

Fréquence : « mais » paraît 13 fois dans le lot (0,80 pour 1000 mots), contre 3,76 dans les références ; « même si »,
« quand même » et « seulement si » sont presque absents.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| 70, 11 | « Le fumage à froid traite une pièce déjà salée avec de la fumée à une température qui ne provoque pas de coagulation des protéines : il assèche et assainit la surface, freine le rancissement et donne le goût, mais il ne conserve rien par lui-même — ce qui en sort reste une pièce crue, qui se garde à 4 °C ou moins et au plus 14 jours pour du poisson fumé réfrigéré, ou à -18 °C ou moins. » (les 14 jours valent-ils pour la viande ?) | « Le fumage à froid met une pièce déjà salée dans la fumée, sans la chauffer assez pour cuire la chair. Il sèche et assainit la surface, freine le rancissement et donne le goût, mais il ne conserve rien à lui seul, et la pièce sort crue. On la garde donc au congélateur, à -18 °C ou moins, ou au réfrigérateur, à 4 °C ou moins ; pour le poisson fumé, pas plus de 14 jours au réfrigérateur. » |
| 68, 171 | « Les barèmes de séchage, tous écrits pour le porc : saucissons, 15 jours minimum à 7,3 °C minimum ; capicola, 20 jours à 7,3 °C minimum ; jambons, un tableau qui va de -54,4 °C à 23,9 °C selon la durée. Une pièce qui sèche vite fait une croûte […]. » (le « mais » qui dit au chalet de rester plus froid est à la section 6, ligne 217) | « Les barèmes de séchage sont tous écrits pour le porc : 15 jours au moins à 7,3 °C au moins pour les saucissons, 20 jours à 7,3 °C au moins pour le capicola, et pour les jambons un tableau qui va de -54,4 à 23,9 °C selon la durée. Au chalet, on garde quand même la chambre froide, quitte à sécher plus longtemps (section 6), parce qu'une pièce qui sèche vite fait une croûte : la surface durcit et ferme le passage, et le centre reste humide derrière. » |
| 78, 15 | « La mise en conserve chauffe l'aliment dans un pot qu'elle referme sur lui-même, ce qui le garde environ un an hors froid — mais seulement si la température atteinte correspond à l'acidité de l'aliment, faute de quoi le pot devient le meilleur incubateur à botulisme qu'une cuisine puisse produire. » (la condition après la promesse, « faute de quoi » pour « sinon ») | « La mise en conserve chauffe l'aliment dans un pot qu'on referme, et le pot se garde ensuite environ un an hors du froid. Mais il faut que la température atteinte corresponde à l'acidité de l'aliment ; sinon, le pot fermé donne au botulisme des conditions idéales. » |
| 78, 37 | « Une petite quantité au chalet, enfin, parce que là la dépense se paie en bois : un cycle pour trois pots de perdrix demande le même feu tenu qu'une fournée pleine. À la maison, sur un rond de cuisinière, cet argument-là tombe et une petite fournée se défend. » | « Une petite quantité au chalet, parce que là, on paie en bois : un cycle pour trois pots de perdrix demande le même feu qu'une fournée pleine. Mais à la maison, sur un rond de cuisinière, on ne brûle pas de bois, et une petite fournée vaut la peine. » |
| 70, 61 | « La fumée de bois qui couve, et non qui flambe, dépose sur une surface humide des composés antimicrobiens et antioxydants qui restent dans les premiers millimètres. Le cœur de la pièce, lui, ne dépend que du sel. » (« lui » marque le contraste sans dire la conséquence) | « La fumée de bois qui couve, et non qui flambe, dépose sur une surface humide des composés antimicrobiens et antioxydants qui restent dans les premiers millimètres. Elle n'atteint donc pas le cœur de la pièce, qui ne dépend que du sel. » |

Cause : `CLAUDE.md` (« Saute : […] ce qui ne marche pas, quand on peut dire ce qui marche ») et le skill `ecriture`,
règle 8 (« Dire ce qui marche, pas ce qui ne marche pas ») poussent à dire la consigne seule, sans le contraste ; aucune
règle ne nomme « mais », « même si », « seulement si » comme des mots à garder. Le contraste survit en
« X, lui, … » ou en point-virgule, qui ne se disent pas à voix haute.

### 3.6 La phrase-commentaire en « C'est… » qui donne le lien après coup (gravité moyenne)

L'étape finit sur une phrase qui commente la précédente : « C'est exactement là que ça tourne », « C'est l'erreur qui
rate un lot », « C'est le geste qui distingue… ». Le vrai lien (« parce que », « pour savoir si ») est remplacé par une
phrase de plus, qui pointe vers l'arrière et qu'il faut rattacher. Souvent, elle n'apprend rien.

Fréquence : environ 20 phrases du lot ouvrent sur « C'est », « Ce n'est » ou « Ça » pour commenter la phrase d'avant ;
« c'est » revient 107 fois (6,6 pour 1000 mots, contre 1,73 dans les références).

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| 68, 125 | « Insister là où l'os a été retiré, dans les replis, autour de l'articulation. C'est exactement là que ça tourne. » | « Insister là où l'os a été retiré, dans les replis et autour de l'articulation, parce que la viande tourne à ces endroits-là. » |
| 78, 170 | « L'air qui reste dans l'autoclave fausse le manomètre vers le haut : l'aiguille dit 70 kPa et la vapeur n'est qu'à 105 °C. C'est l'erreur qui rate un lot sans laisser un seul signe visible. » | « Il faut purger parce que l'air qui reste dans l'autoclave fait monter l'aiguille du manomètre : elle marque 70 kPa alors que la vapeur n'est qu'à 105 °C. Le lot est alors raté, et rien ne le montre. » |
| 70, 137 | « Allumer et lire le thermomètre de chambre aux 15 minutes pendant deux heures. C'est cet essai qui dit si le montage tient, pas la première charge. » | « Allumer et lire le thermomètre de chambre aux 15 minutes pendant deux heures, pour savoir si le montage tient avant d'y mettre de la viande. » |
| 68, 143 | « C'est le geste qui distingue une salaison conduite d'une pièce oubliée dans une boîte. » | (rien : la phrase ne dit rien qu'on fasse ; l'étape est complète sans elle) |
| 78, 491 | « Et remplir la marmite, jamais trois pots : le bois brûle pour la marmite, pas pour le pot. Une fournée pleine coûte le même feu qu'une fournée vide, et c'est ça qui décide si l'opération vaut la peine un jour de tempête. C'est le geste qui sauve une récolte de bleuets (Vaccinium angustifolium) et de chicoutai (Rubus chamaemorus) au complet (ch. 91). » (deux « c'est » de commentaire ; « le geste » ne dit pas lequel des deux) | « Remplir la marmite au lieu d'y mettre trois pots, parce qu'une fournée pleine coûte le même feu qu'une fournée vide. C'est en remplissant la marmite qu'on sauve au complet une récolte de bleuets et de chicoutai (ch. 91). » |
| 78, 424 | « C'est exactement le mode de panne de la purge écourtée (§5.4, étape 17), et il ne laisse aucun signe à l'ouverture. » | « Comme avec une purge écourtée (étape 17), le lot est faux, et rien ne le montre à l'ouverture. » |

Cause : le skill `ecriture`, tableau « Les mots », vise la mise en relief dans la phrase (« « C'est… qui / que » de mise
en relief », « C'est la cendre qui tient le mieux. ») et le tableau « Ce qui sort » vise « La chute en formule » au bout
d'un paragraphe ; aucune ligne ne vise la phrase en « C'est… » qui commente la précédente au bout de chaque étape. C'est
une habitude du rédacteur : finir l'étape sur son importance au lieu de dire sa raison.

### 3.7 L'antithèse à la place du lien (gravité moyenne)

« Le sel n'assainit pas, il arrête » ; « ce n'est pas de la prudence, c'est de l'arithmétique ». Le texte corrige une
idée que le lecteur n'avait pas, au lieu de dire le lien réel, qui est presque toujours une cause (« parce que le sel
garde la viande dans l'état où il la trouve »). C'est « l'opposition fabriquée » que `CLAUDE.md` fait sauter, vue sous
l'angle du lien : elle prend la place du « parce que ».

Fréquence : 24 phrases du lot en « ne… pas X, c'est Y » ou « ne… pas X, il Y » (relevé par motif), dont 14 au ch. 68.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| 68, 94 | « Si on ne peut pas l'affirmer, c'est non : la pièce va au ch. 78 ou à la poêle, pas au sel. Le sel n'assainit pas, il arrête. » | « Si on ne peut pas l'affirmer, la pièce ne va pas au sel, mais au ch. 78 ou à la poêle, parce que le sel garde la viande dans l'état où il la trouve, sans rattraper une viande qui a commencé à travailler. » |
| 68, 116 | « Sans nitrite, 2,5 % n'est pas un plancher, c'est un pari. » | « Le plancher de 2,5 % n'est donné qu'avec au moins 100 ppm de nitrite ou de nitrate ; sans nitrite, il ne s'applique donc pas. » |
| 78, 33 | « Tout ce qui est peu acide quand il n'y a pas d'autoclave : dans ce cas-là, la conserve n'est pas un choix médiocre, elle est fermée, et aucune durée de bouillon ne la rouvre. » | « Tout ce qui est peu acide, quand il n'y a pas d'autoclave. On ne le met pas en conserve, même en le faisant bouillir plus longtemps, parce que l'eau qui bout à l'air libre ne dépasse pas 100 °C (section 3). » |
| 78, 437 | « Si l'appareil n'a qu'une aiguille et qu'elle est suspecte — chute, rouille, années sans repère —, le peu acide est fermé. Ce n'est pas de la prudence, c'est de l'arithmétique : un barème appliqué à une pression inconnue n'est plus un barème. » | « Si l'appareil n'a qu'une aiguille et qu'elle est douteuse (chute, rouille, années sans repère), on ne fait pas de peu acide, parce qu'un barème ne vaut que pour la pression qu'il donne, et qu'on ne la connaît plus. » |
| 68, 281 | « Ce n'est pas un excès de goût qui guette, c'est un poison franc — le nitrite change le fer du sang en une forme qui ne fixe plus l'oxygène, et les tissus en manquent. » | « Le nitrite est un poison, parce qu'il change le fer du sang en une forme qui ne fixe plus l'oxygène, et les tissus en manquent. » |
| 70, 23 | « Ce n'est pas une question de date de calendrier, c'est une question de thermomètre. » | « On se fie donc au thermomètre plutôt qu'au calendrier. » |

Cause : `CLAUDE.md` (« Saute : […] l'opposition fabriquée ») et le tableau du skill `ecriture` (une ligne, un exemple) ;
le lot n'a pas encore eu de passe. Mais la règle dit seulement de couper ; elle ne dit pas que, sous l'antithèse, il y a
presque toujours un « parce que » à écrire. Sans cette moitié de la règle, la passe coupe et le lien disparaît avec.

### 3.8 L'étiquette de lien à la place de la phrase qui le dit (gravité moyenne)

« *Mécanisme :* », « Conséquence, sans exception : », « La conduite qui en découle : », « Position du livre : »,
« D'où ». Le texte nomme la relation comme un titre de fiche au lieu de la dire dans la phrase. C'est l'« étiquette en
raccourci » de la règle 0, appliquée à la logique.

Fréquence : 26 étiquettes de lien dans le lot (5 au ch. 68, 15 au ch. 70, 6 au ch. 78), dont 5 « *Mécanisme :* », 3
« Le mécanisme : », 4 « Conséquence… : », 5 « Ce qu'on perd : » et 3 « d'où ».

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| 70, 282 | « Mécanisme : mettre sous vide un produit fumé à froid, c'est retirer l'oxygène, c'est-à-dire retirer la dernière barrière qui empêchait cette bactérie de pousser, tout en croyant en ajouter une. » | « Quand on met sous vide un produit fumé à froid, on lui retire l'oxygène, qui était la dernière barrière contre cette bactérie, et on croit en ajouter une. » |
| 68, 275 | « Conséquence, sans exception : aucune pièce d'ours noir ni de phoque ne se sale à sec pour être mangée crue. Jamais. » | « On ne sale donc jamais à sec une pièce d'ours noir ou de phoque pour la manger crue. » |
| 78, 85 | « En altitude, la même pression lue chauffe moins, d'où le barème corrigé. » | « En altitude, la même pression chauffe moins, et c'est pour ça qu'on suit un barème corrigé. » |
| 78, 391 | « D'où la seule règle qui protège vraiment : on ne part pas de fournée de peu acide quand le vent monte ou quand la ligne est déjà tombée deux fois dans la journée. » | « Alors, on ne part pas de fournée de peu acide quand le vent monte ou quand le courant a déjà manqué deux fois dans la journée. » |
| 70, 443 | « Ce qu'on perd : une barrière, et la couleur rose stable qui vient avec. Conséquence non négociable : le produit est À CUIRE, toujours, et la filière prêt-à-manger est fermée. » | « Sans sel de salaison, la pièce n'a plus que le sel et le froid comme barrières, et elle perd sa couleur rose stable. Le produit est donc toujours À CUIRE, et on ne fait pas de prêt-à-manger. » |
| 70, 310 | « Position du livre : au chalet, un produit fumé à froid se congèle ou se cuit, il ne vieillit pas au réfrigérateur ; et il ne se sert pas cru à une personne enceinte. » | « Au chalet, on congèle ou on cuit donc un produit fumé à froid, sans le laisser vieillir au réfrigérateur, et on ne le sert pas cru à une personne enceinte. » |

Cause, dans nos règles :
- `gabarit-chapitre.md` : « Chaque avertissement donne le mécanisme, jamais juste « attention » » ; le rédacteur l'a pris
  à la lettre et en a fait un intertitre ;
- `cadre-agents.md` : « jamais « d'où » » ; la règle existe, le tome 4 ne l'a pas encore reçue ;
- l'ancienne variante d'urgence en rubriques (« Ce qu'on perd : »), qui est un mode de fiche et non de phrase.

Les sections 8 (Danger) vont disparaître à la migration au gabarit en sept sections. Le risque est que leur contenu
entre dans les étapes avec ses étiquettes.

### 3.9 La reprise floue : le pronom ou le groupe qui ne dit pas ce qu'il reprend (gravité basse)

« Sans cette étape », « la deuxième raison », « la seule limite qui compte », « cet argument-là », « il ne travaille que
l'hiver » : le lien avec la phrase d'avant passe par un mot qui renvoie à une chose que le texte n'a pas nommée sous cette
forme. Le lecteur cherche en arrière.

Fréquence : six relevées à la lecture dans le lot.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| 70, 42 | « […] et aucun congélateur ne peut tenir -20 °C pendant 7 jours ou -35 °C pendant 15 heures. Sans cette étape, la filière est fermée. » (quelle étape ? quelle filière ?) | « Sans ce gel, on ne fait pas de poisson fumé prêt à manger. » |
| 70, 204 | « […] un conduit enterré la supprime au complet, et c'est la deuxième raison de l'enterrer. » (la première n'est pas dans l'étape ; les deux sont à l'étape 6) | (rien : l'étape 6 le dit déjà ; au plus un renvoi « (étape 6) ») |
| 68, 109 | « Sur l'orignal, il y en aura peu — c'est une bête maigre, et c'est la limite du chapitre autant que du ch. 19. » | « Sur l'orignal, il y en aura peu, parce que c'est une bête maigre (le manque de gras est au ch. 19). » |
| 68, 415 | « C'est l'avantage propre de la Côte-Nord sur n'importe quel saunier du Sud, et il ne travaille que l'hiver. » (« il » : l'avantage ou le gel ?) | « C'est un avantage de la Côte-Nord sur les sauniers du Sud, mais on ne l'a que l'hiver, quand il gèle. » |
| 70, 401 | « […] un gras qui ramollit plus haut ne dit rien de la seule limite qui compte. » | « […] un gras qui ramollit plus haut ne dit pas quand la chambre dépasse 32 °C. » |
| 78, 428 | « C'est l'argument qui décide de l'achat : entre deux autoclaves, celui à poids est celui qui dira encore la vérité quand l'autre n'aura plus de repère […]. » | « Entre deux autoclaves, on choisit donc celui à poids, parce qu'il donne encore la bonne pression quand l'aiguille de l'autre n'est plus fiable. » |

Cause : le skill `ecriture`, règle 6 (« Le mot exact, et toujours le même ») et le cadre (« On nomme la chose au lieu du
possessif qui oblige à chercher ») visent le nom ; rien ne vise le pronom ou la périphrase qui reprend une phrase
entière.

### 3.10 Le mot de liaison qui dit le mauvais lien, ou le même lien deux fois (gravité basse)

Le lot a des mots de liaison, mais pas toujours le bon : « donc » pour « c'est-à-dire » ou pour « par exemple », deux
« donc » qui se suivent, un « donc » suivi d'une étiquette « Conséquence : », un « donc » au milieu d'une liste.

Fréquence : cinq relevés à la lecture.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| 68, 168 | « Sous filet ou coton à fromage si les mouches sont une possibilité — donc dès que la chambre remonte au-dessus du gel. » (« donc » pour « c'est-à-dire ») | « Mettre la pièce sous un filet ou un coton à fromage dès que la chambre remonte au-dessus du gel, parce que les mouches peuvent alors venir. » |
| 78, 282 | « la spore de Clostridium botulinum est «répandue dans la nature » — donc sur la viande d'orignal, sur les betteraves du jardin, dans l'eau du lac — » (« donc » pour « par exemple ») | « la spore de Clostridium botulinum est répandue dans la nature, par exemple sur la viande d'orignal, sur les betteraves du jardin et dans l'eau du lac » |
| 78, 336 | « ce taux ne se mesure pas sans laboratoire, donc il ne se sait jamais, donc le poisson fumé ne se met pas en pot » | « […] et ce taux ne se mesure pas sans laboratoire. On ne met donc pas de poisson fumé en pot, ni à la maison avec un autoclave et du courant, ni au chalet. » |
| 70, 439 | « un sel fait soi-même n'a pas de titre connu, donc le pourcentage sur le poids de la viande reste approximatif même quand la pesée est juste. Conséquence : À CUIRE, toujours. » | « […] même quand la pesée est juste. Le produit est donc toujours À CUIRE. » (un seul lien pour une seule conséquence) |
| 68, 487 | « Ce qui remplace la barrière n'est pas un produit mais une conduite tenue sans relâche — le froid, l'oxygène, donc jamais de sac fermé ni de sous-vide sur une pièce qui n'est pas sèche, et la cuisson. » | « Sans nitrite, on doit tenir trois barrières sans relâche : garder la pièce au froid, lui laisser l'oxygène (jamais de sac fermé ni de sous-vide tant qu'elle n'est pas sèche) et la cuire. » |

Cause : une habitude. Quand le texte a des mots de liaison, il les prend dans un stock très court (« donc » couvre
tout) ; nos règles ne disent nulle part quel mot dit quel lien.

## 4. Ce qui marche (modèles)

| Fichier, ligne | Le passage | Pourquoi il marche |
| --- | --- | --- |
| 68, 463 | « Le froid empêche le sel d'avancer — sous 1,7 °C la diffusion s'arrête (§6) — mais il ne l'empêche pas de sécher. L'ordre est donc forcé, et c'est l'inverse de ce qu'on ferait d'instinct : saler d'abord au caveau à 2–4 °C, sécher ensuite dehors dans le froid sec. » | « Mais » dit le contraste, « donc » tire la conséquence, « d'abord » et « ensuite » donnent l'ordre des gestes. Chaque phrase part de ce que la précédente vient de dire. Le lecteur ne devine rien. (Restent un tiret et le commentaire « c'est l'inverse de ce qu'on ferait d'instinct ».) |
| 70, 468 | « Une caisse enfoncée dans un banc de neige du côté nord, couverte d'écorce et lestée de pierres, tient mieux qu'une caisse à l'air libre, parce que la neige coupe le soleil autant que le vent. La lecture ne se prend pas au petit matin, quand tout est bon : elle se prend à l'heure la plus chaude de la journée, en milieu d'après-midi, parce que c'est ce maximum-là qui décide de ce qui pousse. » | Deux « parce que », chacun juste après la consigne qu'il explique, et le pourquoi dit ce qu'il change au geste (l'heure de la lecture). (Reste le pronominal « se prend ».) |
| 68, 339 | « Poser la pièce de viande sur le plateau de gauche. Verser du sable, du gravier ou de la neige tassée sur celui de droite jusqu'à l'équilibre […]. Retirer la viande, laisser le sable en place, puis verser de l'eau dans le même plateau de gauche […] jusqu'à retrouver l'équilibre. La masse d'eau versée est la masse de la viande. Comme la viande et l'eau ont occupé le même plateau au même bras, un bras plus long que l'autre ne change rien au résultat » | Les gestes se suivent avec « puis » et « jusqu'à » ; la conclusion vient après les gestes ; « Comme » donne la cause avant ce qu'elle entraîne, du connu au nouveau. |
| 78, 80 | « Une conserve retire l'oxygène, et c'est justement ce qui réveille la spore de Clostridium botulinum […]. Cette spore survit à l'eau bouillante. Il reste donc deux sorties : acidifier sous pH 4,6, où elle ne germe pas, ou chauffer au-dessus de 100 °C, où elle meurt. » | Un raisonnement en chaîne : chaque phrase reprend le dernier mot de la précédente (« la spore », « Cette spore ») et « donc » tire la conséquence. Le deux-points annonce une liste, son emploi normal. (Le paragraphe finit mal, sur « d'où le barème corrigé ».) |
| 70, 410 | « Un pot d'eau saturée de sel […] ne prend en bloc dur qu'à -21 °C, donc sous le seuil de -20 °C du gel antiparasitaire. Posé au fond du congélateur, il se lit d'un coup de doigt : bloc dur, l'appareil passe sous le seuil ; encore en bouillie, il n'y est pas. Ce qu'on perd, et c'est décisif : le pot dit que l'appareil peut, il ne dit jamais qu'il a tenu. » | « Donc » relie le chiffre à ce qu'il prouve ; les deux cas de lecture sont en parallèle ; et l'opposition de la fin est réelle (« peut » et « a tenu » sont deux choses que le lecteur confondrait). (L'étiquette « Ce qu'on perd, et c'est décisif : » est de trop.) |

## 5. Ce que ces défauts demandent aux règles

Pour la réécriture du skill `ecriture` et pour l'auditeur des liens. Le lot A propose déjà la règle du deux-points ; ce
lot ajoute ce qui suit.

1. **Le deux-points** sert à une liste, un détail, un exemple, un calcul. Jamais entre deux propositions dont l'une est
   la cause ou la conséquence de l'autre : on écrit le mot (« parce que », « donc », « alors », « c'est pour ça que »,
   « sinon », « mais »). Le modèle de la règle 2 devient : « Vidanger avant que la maison descende sous 5 °C, parce
   qu'un tuyau plein fend en gelant. »
2. **La règle 1** se réécrit : « Une phrase, une idée. Le fait et sa raison vont ensemble, attachés par le mot qui dit
   le lien ; deux faits sans rapport, deux phrases. »
3. **Le tiret** se remplace selon ce qu'il porte, pas par habitude : une cause devient « parce que » ; une conséquence,
   « donc » ou « alors » ; un contraste, « mais » ; un exemple, « par exemple » ; une précision, des parenthèses ; une
   liste, le deux-points. Au ch. 68, 10 tirets sur 29 portent un lien.
4. **Les mots de liaison ne sont jamais des mots qui n'apprennent rien.** Le test « sans le mot, le lecteur sait-il
   moins quoi faire ? » ne s'applique pas à « parce que », « donc », « alors », « mais », « sinon », « pour que »,
   « même si », « seulement si » : sans eux, le lecteur sait moins **pourquoi**, donc moins quoi faire quand il lui
   manque une chose.
5. **Le tableau des liens**, à mettre dans le skill : quel mot pour quel lien. Cause : « parce que », « comme » (en
   tête). Conséquence : « donc », « alors », « c'est pour ça que ». But : « pour », « pour que ». Contraste : « mais »,
   « même si », « quand même ». Condition : « si », « seulement si », « tant que », « sinon ». Exemple : « par
   exemple ». Suite : « puis », « ensuite », « d'abord ». « Car » est correct, mais on ne le dit pas : « parce que ».
   « D'où », « faute de quoi », « ainsi » sont des mots de livre.
6. **Sous l'antithèse et sous la phrase-commentaire en « C'est… », il y a un lien à écrire.** Couper l'antithèse ou la
   chute ne suffit pas : on cherche le « parce que » qu'elle cachait, et on l'écrit.
7. **L'ordre d'une étape** : le geste, sa raison, ce qu'on voit quand c'est fait, puis l'autre façon. Un ajout ne va pas
   au bout de l'étape : il va à la place que lui donne cet ordre, ou dans une autre étape.
8. **La migration des sections 3 et 8 dans les étapes** : chaque mécanisme entre dans l'étape avec son lien au geste
   (« parce que », « pour que », « sinon »), jamais comme une phrase de plus à la fin, ni avec son étiquette
   (« Mécanisme : », « Conséquence : »).
9. **La méthode de l'auditeur des liens** : entre chaque paire de phrases, dire à voix haute le mot qui manque. Si ce
   mot est « parce que », « donc », « mais » ou « par exemple » et qu'il n'est pas écrit, on l'écrit. Si aucun mot ne
   va, la deuxième phrase est à la mauvaise place ou dans le mauvais paragraphe.
10. **Le script** (`controle.py` ou `tempo.py`) peut relever : la part des phrases en « fait : conséquence » au-dessus
    de 10 % ; « d'où », « faute de quoi » ; les étiquettes « Mécanisme : », « Conséquence : », « Position du livre : » ;
    « ne… pas X, c'est Y » ; la phrase qui commence par « C'est » après un point ; deux « donc » dans la même phrase.
11. **La grande passe du tome 4** doit garder les 15 « parce que » et les 19 « donc » de ce lot (et en ajouter) : la
    mesure de chaque chapitre avant et après la passe (`tempo.py`) dit si les liens ont tenu.

## 6. Liste de contrôle (`cadre-agents.md`, parties « Pour tout agent », « Le texte » et « La langue », lignes qui touchent l'écriture et la langue)

Pour tout agent
- [x] `CLAUDE.md` prime : chargé dans le contexte, appliqué aux réécritures.
- [x] Le skill de sa partie lu au complet : `ecriture` lu au complet ; `editeur`, `langue` et `gabarit-chapitre.md`
  cherchés par grep sur les liens, les deux-points et le mécanisme, sans lecture complète (le regard ne touche que les
  liens).
- [ ] `suivi/plan-de-match.md`, section « PAUSE du 15 octobre » : pas lu ; aucun chapitre n'est réécrit.
- [x] Règle 1 : aucun chiffre ni fait neuf dans les réécritures ; chaque chiffre vient de la phrase citée ou d'une
  autre ligne du même chapitre, nommée.
- [x] Rien de commité ; un seul fichier écrit, celui-ci.
- [x] Lire seulement ce que la tâche touche : les trois chapitres, les mesures, les règles par grep, un chapitre ancien
  (ch. 3, premier commit) pour la mesure avant et après.

Le texte, la forme du chapitre
- [ ] Sept sections : le lot est encore en neuf (« Pourquoi ça marche », « Danger ») ; hors de ce regard, signalé
  (sections 3.2, 3.8).
- [ ] Rien sous le titre que la ligne de lieu : les ch. 68 (ligne 9) et 78 (ligne 7) ont une note de lieu ; signalé.

Le texte, la phrase
- [x] Règle 0 : chaque réécriture lue à voix haute ; un verbe qui dit le geste, on sait qui le fait.
- [x] Jamais « d'où » : les 3 du ch. 78 sont relevés (3.8) ; aucun dans les réécritures.
- [x] Pas de maxime ni de chute en formule ; pas d'opposition fabriquée : relevées (3.6, 3.7) ; les réécritures
  n'en ajoutent pas.
- [x] Consigne jamais au pronominal dans les réécritures (« on compte », « on la garde », « on ne le met pas ») ; le
  lot en a beaucoup, hors de ce regard.
- [x] La consigne se dit comme une consigne ; le sujet se nomme.
- [x] Le mot qu'on dit : « parce que » plutôt que « car », « sinon » plutôt que « faute de quoi », « on se fie »,
  « vaut la peine » ; pas de joual.
- [x] Aucun tiret dans les réécritures (vérifié par script) ; les tirets qui restent sont dans les citations du livre.
- [x] Un passage repéré comme lourd se juge d'abord : deux phrases proposées à couper (68, 143 ; 70, 204).
- [ ] Points de contrôle et signes d'échec à 5 à 8 lignes : le lot en a 12, 15 et 16 ; hors de ce regard, signalé.
- [x] Le chapitre parle de son sujet : le bois traité et le bois d'épave renvoyés à l'étape 11 (3.4) ; l'étape 20 du
  ch. 70 redit l'étape 6 (3.9).

Le texte, la procédure et la répétition
- [x] Une étape à plusieurs gestes se découpe : proposé pour le ch. 70, étape 12, et le ch. 78, étape 19.
- [x] Un fait garde une seule place : redites relevées quand elles touchent un lien (70, étape 19 et section 8 ; 70,
  étapes 6 et 20).

Avant de rendre
- [x] `controle.py` : sans objet sur les chapitres (aucun n'est modifié) ; lancé sur les réécritures seules : 0 tiret ;
  un ordre renversé, une mise en relief et une maxime corrigés ; les mots vides relevés sont ceux du livre (« déjà
  salée », « encore ferme ») ou ont leur sens.

La langue
- [x] Le français écrit correct dans les réécritures, avec les mots du Québec quand ils sont justes ; ni joual ni
  anglicisme ; une seule série d'alternatives par phrase.
- [x] `langue.py` lancé sur les réécritures seules : 9 avis, 3 corrigés (« il vaut mieux », deux virgules), 6 faux
  positifs (« aw », « cc », « capicola », « chicoutai », « Sud » qui nomme une région, comme dans le livre).
