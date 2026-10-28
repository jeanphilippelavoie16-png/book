# Audit de l'écriture : la consigne, lot B (tome 1)

28 octobre 2026. Un seul regard : la consigne. Qui fait quoi, quand, dans quel ordre ; un geste par phrase ou une étape
qui en entasse cinq ; la condition avant ou après le geste ; le pourquoi qui aide ou qui alourdit ; le chiffre à sa
place ; une étape qu'on suit les mains occupées, à la lampe frontale ; les séries orange, les tableaux Points de
contrôle et Signes d'échec, les lignes de Matériel, les titres de « Quand l'utiliser ».

Lot, lu au complet : `chapitres/02-rester-ou-partir.md`, `chapitres/04-retombees-radioactives.md`,
`chapitres/17-qui-cogne-a-la-porte.md`. Aucun fichier du livre n'a été modifié. Les réécritures sont des exemples,
sans fait ni chiffre neuf. Quand une réécriture demanderait un fait ou une décision que le texte n'a pas, la place est
marquée `[À VÉRIFIER : …]` pour le rédacteur. Les numéros de ligne sont ceux des fichiers au 28 octobre ; une citation
qui couvre plusieurs lignes donne la première.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 2 | 4955 | 253 | 19,6 | 0,55 | 9,1 | 15,0 | 22,6 | **46,6** | **34,4** | 6,3 | 10,7 | 4,6 |
| ch. 4 | 8053 | 375 | 21,5 | 0,55 | 7,2 | 24,3 | 21,1 | 38,9 | 29,9 | 4,8 | 18,0 | 4,5 |
| ch. 17 | 4630 | 214 | 21,6 | 0,49 | 7,9 | 22,4 | 23,0 | 36,9 | 30,4 | 4,3 | 13,6 | 5,0 |
| le lot | 17638 | 842 | 20,9 | 0,54 | 8,0 | 21,0 | 22,0 | 40,7 | 31,4 | 5,1 | 14,8 | 4,6 |
| tout le livre | | | 18,7 | 0,65 | 15,5 | 17,3 | 19,9 | 31,4 | 23,7 | 5,0 | 9,4 | 5,4 |

Le ch. 2 a le plus haut taux de deux-points de tout le livre (46,6 % des phrases) et le plus haut taux de « fait :
conséquence » (34,4 %).

### Le même script sur la procédure seule (extraits dans le scratchpad)

| texte | mots | m/phr | ≤6 % | ≥30 % | « : » % | fait:csq % | liais./1000 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 2, séries orange (étapes 1 à 24) | 1107 | 22,6 | 6,1 | 14,3 | 40,8 | 30,6 | 4,5 |
| ch. 4, séries orange (étapes 1 à 16) | 1818 | **25,6** | 8,5 | **28,2** | 35,2 | 29,6 | **2,8** |
| ch. 17, séries orange (étapes 1 à 12) | 1284 | 24,2 | 5,7 | 20,8 | 37,7 | 30,2 | 7,8 |
| ch. 2, reste de la procédure | 1655 | 22,4 | 9,5 | 24,3 | 45,9 | 32,4 | 4,2 |
| ch. 4, reste de la procédure | 2100 | **27,6** | 5,3 | **32,9** | 38,2 | 32,9 | 3,3 |
| ch. 17, reste de la procédure | 852 | 23,0 | 2,7 | 27,0 | 35,1 | 24,3 | 5,9 |
| **toute la procédure du lot** | 8816 | **24,5** | 6,7 | 25,3 | 39,2 | 30,6 | 4,4 |

**Les étapes ont les phrases les plus longues du lot** : 24,5 mots par phrase, contre 20,9 pour les chapitres
entiers et 18,7 pour le livre. Une phrase d'étape sur quatre fait 30 mots et plus. Les séries orange, celles qu'on lit
sous la pastille « 30 s » ou « 1 min », ne font pas exception : celles du ch. 4 sont à 25,6 mots par phrase, avec
2,8 mots de liaison pour 1000, le plus bas du lot.

### Les mesures de ce regard (script de travail, approximatif)

Une phrase d'étape compte comme consigne si elle s'ouvre sur un infinitif, sur « ne pas / ne jamais / ne rien », sur
« il faut / on doit », ou sur une condition suivie d'un infinitif ; sinon c'est un fait. Les alinéas d'une étape
comptent avec elle.

| | ch. 2 | ch. 4 | ch. 17 | lot |
| --- | --- | --- | --- | --- |
| étapes numérotées | 45 | 35 | 29 | 109 |
| mots par étape, moyenne (médiane) | 64 (50) | 117 (85) | 76 (55) | |
| étape la plus longue | 248 (étape 27) | **774** (étape 18) | 207 (étape 7) | |
| étapes de plus de 100 mots | 6 | 14 | 7 | **27** |
| étapes orange, mots, moyenne | 24 ; 1151 ; 48 | 16 ; 1914 ; 120 | 12 ; 1336 ; 111 | |
| phrases d'étape qui sont des faits | 59 sur 146 | 69 sur 161 | 45 sur 105 | **42 %** |
| étapes en « geste, fait, geste » | 9 | 19 | 10 | **38** |
| consignes ouvertes par leur condition | 25 | 27 | 18 | 70 |
| consignes dont la condition vient après le geste (au moins) | 7 | 6 | 3 | 16 |
| lignes de Points de contrôle (plafond : 8) | 15 | 12 | 9 | 36 |
| lignes de Signes d'échec (plafond : 8) | 12 | 11 | 12 | 35 |
| lignes de Matériel de plus de 20 mots | 6 sur 6 | 4 sur 5 | 4 sur 4 | 14 sur 15 |
| items du Matériel qu'aucune étape n'emploie | 1 | 1 | 0 | 2 |

### Le lien avec le paragraphe du monoxyde

Le paragraphe que JP a relevé (dangers, partie 1) pose quatre faits de suite, deux en « fait : conséquence », sans un
mot de liaison. Dans les étapes du lot, le même tempo se loge **entre les gestes** : on lit un geste, puis deux ou
trois faits joints par des deux-points, puis le geste suivant. Quatre phrases d'étape sur dix sont des faits, et une
étape sur trois alterne geste et fait. Le lecteur qui tient une lampe doit trier ce qu'il fait de ce qu'il apprend.

## 2. Les défauts, du plus grave au moins grave

### Motif 1. L'étape-bloc : plusieurs gestes et plusieurs sujets dans un seul paragraphe (gravité haute)

27 étapes sur 109 dépassent 100 mots. L'étape 18 du ch. 4 fait 774 mots, en neuf alinéas, et porte trois sujets :
boucher la pièce, répondre à l'alarme de CO, décider de sortir. Les tableaux y renvoient pour l'alarme (« Faire l'étape
18 tout de suite », l. 312 et 331), mais sa ligne en gras parle de ruban et de plastique.

**1.1** `chapitres/04-retombees-radioactives.md`, l. 174 et 185 :
« {!co} **Boucher les courants d'air de la pièce d'abri pendant le passage du panache, quelques heures au plus.** »
… « Les premiers signes du monoxyde (le mal de tête, la nausée, l'envie de dormir) ressemblent à ceux de
l'irradiation, et on reste couché au lieu d'agir. Si l'avertisseur sonne, ou si plusieurs personnes ont mal à la tête
ou envie de dormir en même temps, chercher d'abord la source du monoxyde (une flamme, une braise ou un moteur) et
l'éliminer. »

Réécriture (le découpage ; les phrases actuelles restent) :

> 18 a. {!co} **Boucher les courants d'air de la pièce d'abri pendant le passage du panache, quelques heures au
> plus.** (les quatre premiers alinéas actuels : l'avertisseur posé et testé avant, ce qu'on bouche, la pièce du poêle
> qu'on ne bouche pas, l'aération au bout de quelques heures)
>
> 18 b. {!co} **Si l'avertisseur de CO sonne, ou si plusieurs personnes ont mal à la tête ou envie de dormir en même
> temps, chercher la source du monoxyde et l'éliminer.** Les premiers signes du monoxyde ressemblent à ceux de
> l'irradiation, et on reste couché au lieu d'agir. (puis les alinéas actuels : les flammes à éteindre, le caveau, le
> poêle qui refoule)
>
> 18 c. **Une fois la source éliminée, décider s'il faut sortir à l'air libre** (motif 5, exemple 5.1).

Les deux tableaux renvoient alors à l'étape 18 b.

**1.2** `chapitres/02-rester-ou-partir.md`, l. 113 (étape 20, dans la série orange « On part : la première heure »,
161 mots) : « 20. **L'hiver, vidanger le bâtiment qu'on quitte.** Compter une heure (le détail : ch. 3 pour la maison,
ch. 84 pour le chalet). » … « Verser de l'antigel de plomberie, qui n'est pas toxique : 0,5 L dans le réservoir de la
toilette et 1 L dans la cuvette ; 0,5 L dans chaque évier, lavabo, baignoire, douche, drain de plancher et siphon de
laveuse ; 2 L dans la laveuse ; 1 L dans le lave-vaisselle. »

L'étape annonce que le détail est ailleurs, puis le donne : une procédure d'une heure, avec neuf quantités, dans une
série qui dure une heure.

> 20. **L'hiver, vidanger le bâtiment qu'on quitte : compter une heure.** Fermer l'entrée d'eau, ouvrir tous les
> robinets d'eau chaude et d'eau froide, et tirer la chasse de chaque toilette une dernière fois. Vidanger les
> calorifères, les bouilloires et les réservoirs d'expansion du chauffage à eau chaude. Verser de l'antigel de
> plomberie, qui n'est pas toxique, dans chaque renvoi (les quantités par appareil : ch. 3 pour la maison, ch. 84
> pour le chalet). {!poison} Ne jamais mettre d'antigel à moteur : il est toxique et reste dans la tuyauterie d'eau
> potable.

Avant de retirer les quantités d'ici, vérifier que les ch. 3 et 84 les ont.

**1.3** `chapitres/02-rester-ou-partir.md`, l. 142 (étape 27, 248 mots) : « 27. **Chaleur : mesurer la température
intérieure, puis la remesurer 2 heures plus tard.** L'écart entre les deux relevés, divisé par 2, donne le nombre de
degrés que la maison perd à l'heure : une maison qui perd 4 °C à l'heure laisse quatre fois moins de temps qu'une
maison qui en perd 1, même quand les deux affichent la même température. »

Suivent trois alinéas : une étude chiffrée, le calcul pour la maison électrique et le chalet, puis la zone de 18 à
24 °C et la température de départ. La décision (à quelle température on part) est la dernière phrase du troisième
alinéa d'une étape qui s'appelle « mesurer ».

> 27. **Chaleur : mesurer la température intérieure, puis la remesurer 2 heures plus tard.** Diviser par 2 l'écart
> entre les deux relevés : c'est le nombre de degrés que la maison perd à l'heure. Une maison qui perd 4 °C à l'heure
> laisse quatre fois moins de temps qu'une maison qui en perd 1, même si les deux affichent la même température.
> Refaire la mesure à chaque reprise de la décision (étape 43) : la maison perd ses degrés plus vite dans les premières
> heures, puis plus lentement, et plus vite quand il fait plus froid dehors. Au chalet, compter la chaleur en jours de
> bois sec qu'on peut aller chercher sans machine, au rythme où on chauffe (ch. 83).
>
> 27 b. **Fixer la température à laquelle on part.** Prendre celle qui est écrite d'avance sur la fiche de décision,
> choisie en pensant au plus jeune ; sans fiche, les deux adultes doivent la fixer maintenant. Entre 18 et 24 °C, le
> risque est minimal pour une personne qui bouge peu.

Sortent : l'étude chiffrée (motif 8, exemple 8.4) et « Il n'existe aucune température reconnue… » (motif 5,
exemple 5.4).

**1.4** `chapitres/04-retombees-radioactives.md`, l. 117 (étape 12, série orange « 2 h », 165 mots, 11 phrases dont
une seule consigne) : « 12. {!poison} **Donner l'iode seulement contre de l'iode radioactif, et seulement en comprimés
d'iodure de potassium.** Une détonation et le panache d'une centrale nucléaire en apportent. » … « On peut boire l'eau
qu'ils ont désinfectée (ch. 10, étape 23). »

L'étape mêle le mécanisme du comprimé (déjà dans le Matériel, l. 33), ce qu'il ne fait pas, les iodes qui
empoisonnent, et l'eau désinfectée, qui est le sujet du ch. 10.

> 12. {!poison} **Donner seulement des comprimés d'iodure de potassium.** Ne pas avaler de teinture d'iode, de
> povidone iodée (Bétadine) ni de comprimés d'iode pour désinfecter l'eau : ce sont des poisons quand on les avale, et
> ils ne protègent pas la thyroïde. Ne pas en étendre sur la peau non plus : ils protègent moins que le comprimé et
> peuvent faire du mal. Le sel iodé et les suppléments d'iode en contiennent beaucoup trop peu, et en avaler beaucoup
> rend malade. Sans comprimés : section 7.
>
> Le comprimé remplit la thyroïde d'iode ordinaire, et elle ne prend presque plus l'iode radioactif qu'apportent une
> détonation ou le panache d'une centrale. Il ne protège que la thyroïde : il ne fait rien contre le césium, le
> strontium ni le rayonnement de la poussière, et il ne soigne pas l'irradiation.

« On peut boire l'eau qu'ils ont désinfectée » reste au ch. 10, étape 23.

**La cause.** Le cadre dit : « Une étape qui a plusieurs gestes se découpe en sous-étapes » (`.claude/cadre-agents.md`,
« La procédure »), et le skill `ecriture` a la ligne « La procédure tassée dans une étape » (tableau du 15 octobre).
Ces deux règles parlent de plusieurs **gestes**, pas de plusieurs **sujets**, et ne donnent ni plafond ni test (la
ligne en gras dit-elle ce que fait toute l'étape ?). En même temps, `CLAUDE.md` a coupé « Comment ça marche » et la
section Danger : « Un mécanisme qui apprend quelque chose va dans l'étape qu'il explique », et l'orange est « sans
limite de longueur » (`plan/decisions-jp.md`, 16 octobre). Tout ce qui vivait dans ces sections est descendu dans les
étapes, sans règle pour l'y ranger.

### Motif 2. Le geste noyé dans son pourquoi : geste, fait, fait, geste (gravité haute)

38 étapes sur 109 alternent geste et fait. Quatre phrases d'étape sur dix sont des faits. C'est la forme que prend,
dans la procédure, le tempo que JP a relevé : le deuxième geste arrive après deux ou trois faits joints par des
deux-points, et le pourquoi pèse plus que le geste.

**2.1** `chapitres/04-retombees-radioactives.md`, l. 45 (étape 1, pastille 30 s, 104 mots) : « 1. **Dans un bâtiment,
s'éloigner des fenêtres et se coucher à l'abri, tout de suite.** Le souffle de la détonation suit l'éclair : au-delà
de quelques kilomètres, il avance d'environ 1,6 km toutes les 5 secondes, soit 3 secondes par kilomètre, et il met de
quelques secondes à plus de 30 secondes à arriver. Il casse les vitres à des kilomètres, et le verre blesse les gens
qui sont derrière. Pendant ce délai, on a le réflexe d'aller voir à la fenêtre, et on s'y blesse. Se coucher derrière
un mur intérieur, un comptoir ou un meuble lourd, et y rester jusqu'au passage du souffle. »

> 1. **Dans un bâtiment, se coucher tout de suite derrière un mur intérieur, un comptoir ou un meuble lourd, loin des
> fenêtres, et y rester jusqu'au passage du souffle.** Le souffle arrive de quelques secondes à plus de 30 secondes
> après l'éclair (au-delà de quelques kilomètres, il met environ 3 secondes par kilomètre), et il casse les vitres à
> des kilomètres. Pendant ce temps-là, on a
> le réflexe d'aller voir à la fenêtre, et le verre blesse les gens qui sont derrière.

**2.2** `chapitres/17-qui-cogne-a-la-porte.md`, l. 46 (étape 1, pastille 1 min) : « 1. **Répondre à travers la porte,
sans ouvrir, pour que la personne sache qu'il y a quelqu'un.** Certains cambrioleurs cognent pour savoir si la maison
est vide, et entrent quand personne ne répond. Tant que la porte reste fermée, on décide de la distance, du temps que
dure la visite et de ce que la personne voit. Une fois entrée, elle est à un mètre, elle reste le temps qu'elle veut,
et elle a vu la pièce, le poêle et les enfants. »

Un geste, trois phrases de pourquoi ; la dernière redit la troisième à l'envers.

> 1. **Répondre à travers la porte, sans ouvrir, pour que la personne sache qu'il y a quelqu'un.** Certains
> cambrioleurs cognent pour savoir si la maison est vide, et entrent quand personne ne répond. Tant que la porte reste
> fermée, on décide de la distance, de la durée de la visite et de ce que la personne voit.

**2.3** `chapitres/17-qui-cogne-a-la-porte.md`, l. 67 (étape 5) : « Lui nommer un repère qu'il voit, à plus de 2 m de
la porte : le bas de l'escalier, le baril, l'auto, ou le poteau planté d'avance pour ça (étape 25). « Reculez » ne lui
dit pas jusqu'où. Les virus respiratoires passent d'une personne à l'autre à moins de 2 m, quand le contact dure plus
de 15 minutes. Ne pas se présenter, ne pas s'expliquer, et poser une seule question à la fois. »

> Lui nommer un repère qu'il voit, à plus de 2 m de la porte, plutôt que de lui dire « Reculez » : le bas de
> l'escalier, le baril, l'auto, ou le poteau planté d'avance pour ça (étape 25). Poser une seule question à la fois,
> sans se présenter ni s'expliquer. À moins de 2 m, les virus respiratoires passent d'une personne à l'autre quand le
> contact dure plus de 15 minutes.

**2.4** `chapitres/17-qui-cogne-a-la-porte.md`, l. 91 (étape 9) : « 9. **Pour un besoin matériel, donner dehors, sans
faire entrer le visiteur.** Le visiteur racontera ce qu'il a reçu, et la façon dont on donne lui en apprend plus sur
nos réserves que la quantité. Donner un repas chaud dans un de nos bols, qu'on reprend ensuite, de l'eau traitée, du
bois fendu, ou une quantité de carburant mesurée d'avance (ch. 15). Jamais dans l'emballage du magasin : la marque et
le format montrent qu'on en a d'autres. Ne jamais donner une caisse entière, ni dire « prenez ce qu'il vous faut ». »

> 9. **Pour un besoin matériel, donner dehors, sans faire entrer le visiteur** : un repas chaud dans un de nos bols,
> qu'on reprend ensuite, de l'eau traitée, du bois fendu, ou une quantité de carburant mesurée d'avance (ch. 15).
> Jamais dans l'emballage du magasin, jamais une caisse entière, et ne jamais dire « prenez ce qu'il vous faut ». Le
> visiteur racontera ce qu'il a reçu, et la façon dont on donne lui en apprend plus sur nos réserves que la quantité :
> la marque et le format montrent qu'on en a d'autres.

**2.5** `chapitres/04-retombees-radioactives.md`, l. 89 (étape 8) : « 8. **Descendre au sous-sol et se mettre contre un
mur enterré**, loin des fenêtres du sous-sol. Le sous-sol divise la dose par 10 à 20 : la terre derrière le mur et
l'étage au-dessus arrêtent le rayonnement de la poussière posée dehors. Au chalet, aller au caveau (ch. 79). Sans
sous-sol ni caveau, aller dans la pièce du centre, loin du toit et des murs extérieurs, et empiler autour de soi ce
qui est lourd (section 7, « Sans sous-sol ni caveau »). L'abri n'a pas besoin d'être étanche, et des fenêtres cassées
n'enlèvent presque rien à la protection : on reste. »

> 8. **Descendre au sous-sol et se mettre contre un mur enterré, loin des fenêtres du sous-sol.** Au chalet, aller au
> caveau (ch. 79). Sans sous-sol ni caveau, aller dans la pièce du centre, loin du toit et des murs extérieurs, et
> empiler autour de soi ce qui est lourd (section 7, « Sans sous-sol ni caveau »). Rester à l'abri même s'il n'est pas
> étanche ou que des fenêtres sont cassées : ça n'enlève presque rien à la protection. Le sous-sol divise la dose par
> 10 à 20, parce que la terre derrière le mur et l'étage au-dessus arrêtent le rayonnement de la poussière posée
> dehors.

**La cause.** Trois règles s'additionnent. `CLAUDE.md` envoie le mécanisme « dans l'étape qu'il explique » sans dire
où dans l'étape. Le skill `ecriture`, règle 2, dit « Le fait d'abord, la raison ensuite » pour la phrase, et son
exemple modèle est lui-même en « geste : raison » (« Vidanger avant que la maison descende sous 5 °C : un tuyau plein
fend en gelant. ») : appliqué geste par geste, il donne une étape faite de « geste : fait » et de « fait :
conséquence », d'où les 31 % mesurés. Enfin, aucune règle ne demande les mots qui font le lien à voix haute
(« parce que », « pour que », « sinon ») : 4,4 pour 1000 dans la procédure.

### Motif 3. La série qui ne suit pas l'ordre du temps (gravité haute)

Le cadre le demande (« d'abord ce qui sauve, ensuite ce qui organise »), mais l'ordre se casse à l'intérieur des
séries et des étapes : une contre-indication après la dose, un geste pressé après l'installation, un geste du retour
dans la série du départ.

**3.1** `chapitres/04-retombees-radioactives.md`, l. 161 (étape 16, la dernière de la série de l'iode) : « Ne pas en
donner à une personne allergique à l'iode, ou qui a une maladie de la thyroïde (maladie de Basedow, nodules, thyroïdite
de Hashimoto), une dermatite herpétiforme ou une vascularite hypocomplémentémique : le comprimé peut déclencher chez
elle une crise de la thyroïde ou une réaction allergique grave[^1]. »

Elle vient après « Donner à chacun la dose de son âge, en commençant par les enfants » (étape 13, l. 127) et après la
recette de la solution (étape 15). Le moment (« entre 24 heures avant et 2 heures après », étape 14), qui est la
pastille de la série, vient aussi après le tableau des doses. La série suit l'ordre d'une notice de médicament (ce
que c'est, la dose, la préparation, les contre-indications), pas celui des gestes.

> 13. {!poison} **Avant de donner l'iode, mettre à part les personnes qui ne doivent pas en prendre** : une personne
> allergique à l'iode ; une personne qui a une maladie de la thyroïde (maladie de Basedow, nodules, thyroïdite de
> Hashimoto), une dermatite herpétiforme ou une vascularite hypocomplémentémique. Chez elle, le comprimé peut
> déclencher une crise de la thyroïde ou une réaction allergique grave[^1].

Puis, dans l'ordre : le moment (l'étape 14 actuelle), la dose par âge (13), la solution (15), la dose unique (16).

**3.2** `chapitres/04-retombees-radioactives.md`, l. 95 (étape 9) : « 9. **Dans une maison de bois sans sous-sol,
changer d'abri si un meilleur est à moins de 15 minutes** : un sous-sol ou un gros bâtiment de maçonnerie (béton,
brique). Partir au plus tard 30 minutes après l'éclair. »

La décision a une limite de 30 minutes, mais elle vient après « Fermer les portes et les fenêtres » (étape 7) et
« Descendre au sous-sol » (étape 8) : la famille dans une maison de bois a fermé la maison avant de lire qu'elle doit
la quitter. L'étape 4 en parle déjà (« À défaut, entrer dans le bâtiment le plus proche … (étape 9) »).

> (dans l'étape 4) À défaut, entrer dans le bâtiment le plus proche. Si c'est une maison de bois sans sous-sol, qui
> ne divise la dose que par 2 ou 3, et qu'il y a un sous-sol ou un gros bâtiment de maçonnerie (béton, brique) à moins
> de 15 minutes, y aller : partir au plus tard 30 minutes après l'éclair. Sinon, rester : on y est mieux que dehors.

**3.3** `chapitres/04-retombees-radioactives.md`, l. 71 et 75 (étape 4) : « Si les retombées se mettent à tomber,
entrer tout de suite dans le bâtiment le plus proche. » est le troisième alinéa ; « Dehors, se couvrir le nez et la
bouche d'un linge. » est le dernier. On fait le second en premier, et le premier est le cas le plus pressé.

> 4. **Entrer dans le bâtiment le plus solide qu'on peut atteindre en quelques minutes.**
> - Dehors, se couvrir le nez et la bouche d'un linge.
> - Si les retombées tombent déjà, entrer tout de suite dans le bâtiment le plus proche. Après une explosion au sol,
>   elles se voient : du sable fin, une poussière comme du sel de table, de la cendre, ou une pluie. Les retombées
>   d'une explosion en altitude et le panache d'une centrale ne se voient pas : entrer dès l'éclair ou l'alerte, sans
>   attendre de voir quelque chose tomber.
> - Sinon, choisir, dans l'ordre : un sous-sol ; le centre d'un gros bâtiment de béton ou de brique ; un
>   stationnement souterrain.
>
> Après une détonation, les retombées mettent 10 minutes ou plus à arriver, et la poussière radioactive donne plus de
> la moitié de son rayonnement dans la première heure. La terre, le béton et la brique arrêtent ce rayonnement.

**3.4** `chapitres/02-rester-ou-partir.md`, l. 127 (étape 22, avant-dernière de la série « On part ») : « 22.
**Fermer les portes et les fenêtres.** Devant un feu, s'il reste du temps, arroser le terrain et le toit le plus tôt
possible : le bois mouillé prend feu moins vite seulement s'il a eu le temps d'absorber l'eau avant que le front du
feu arrive. »

« Le plus tôt possible » arrive après une vidange d'une heure (étape 20), et « s'il reste du temps » tire dans l'autre
sens.

> (une étape à part, juste après l'étape 17) **Devant un feu, arroser le terrain et le toit dès que les enfants sont
> prêts et les papiers pris** : le bois mouillé prend feu moins vite seulement s'il a eu le temps d'absorber l'eau
> avant que le front du feu arrive.

L'ordre annoncé en tête de la série (« les personnes, les papiers, la chaleur, puis le bâtiment ») le permet ; le
rédacteur tranche s'il garde l'arrosage avec le bâtiment.

**3.5** `chapitres/02-rester-ou-partir.md`, l. 122 (étape 20) : « Au retour, ne rien remettre en eau avant que la pièce
soit à au moins 18 °C : l'eau qu'on remet dans un tuyau encore gelé le fend. »

Un geste du retour, des semaines plus tard, dans la série du départ. Il va là où on rouvre le bâtiment (ch. 3 pour la
maison, ch. 84 pour le chalet), et sort d'ici.

**3.6** `chapitres/17-qui-cogne-a-la-porte.md`, l. 78 (étape 7) : « L'hiver, décider vite : à partir de −28 de
refroidissement éolien, la peau exposée de la personne qui attend peut geler en 10 à 30 minutes, et plus vite quand il
fait plus froid. »

La phrase qui dit de faire vite vient après le geste qu'elle presse (« l'amener couchée … Parler ensuite. »).

> 7. {!froid} **Chercher les signes du froid, même chez une personne qui a l'air ivre ou de mauvaise foi.** L'hiver,
> faire vite : à partir de −28 de refroidissement éolien, la peau exposée de la personne qui attend peut geler en 10 à
> 30 minutes, et plus vite quand il fait plus froid. En hypothermie, on parle mal, on titube, … (la suite actuelle)

**La cause.** La règle de la scène réelle existe (`.claude/cadre-agents.md`, « L'urgence » ; skill `ecriture`, « Le
réel de l'urgence »), mais rien ne fait vérifier l'ordre geste par geste à l'intérieur d'une série et d'une étape.
L'habitude est de ranger par sujet, comme la source (la notice du comprimé d'iode, le guide de vidange), alors que le
cadre dit : « La source sert à vérifier un fait, jamais à copier une forme. »

### Motif 4. La condition ou l'exception après le geste (gravité haute)

Au moins 16 consignes d'étape (7 au ch. 2, 6 au ch. 4, 3 au ch. 17, sans compter les alinéas) donnent le geste, puis
la condition qui dit s'il faut le faire. Les 70 consignes ouvertes par leur condition montrent que la règle est
connue ; elle cède quand l'étape s'ouvre sur son geste en gras.

**4.1** `chapitres/17-qui-cogne-a-la-porte.md`, l. 87 (étape 8) : « Lui donner à boire chaud et sucré, à petites
gorgées, seulement si elle est bien éveillée, qu'elle n'est pas confuse et qu'elle avale bien (ch. 25, étapes 10 et
11). »

> Si elle est bien éveillée, qu'elle n'est pas confuse et qu'elle avale bien, lui donner à boire chaud et sucré, à
> petites gorgées (ch. 25, étapes 10 et 11).

**4.2** `chapitres/02-rester-ou-partir.md`, l. 71 (étape 5) : « 5. **Couper la source, si on sait laquelle et qu'on
l'atteint en quelques secondes.** »

> 5. **Si on sait d'où vient le CO et qu'on peut l'atteindre en quelques secondes, couper la source.**

**4.3** `chapitres/02-rester-ou-partir.md`, l. 206 (étape 37) : « 37. {!feu-de-foret} **Devant un feu de forêt,
rester au chalet seulement si le pourtour a été dégagé d'avance**, en trois zones : … Sans ces trois zones, on ne peut
pas défendre un chalet dans une forêt serrée d'épinettes noires : partir tôt, avant que le feu ou la fumée ferment le
chemin. »

La ligne en gras donne l'exception ; le geste qui vaut pour la plupart des familles est la dernière proposition.

> 37. {!feu-de-foret} **Devant un feu de forêt, partir tôt, avant que le feu ou la fumée ferment le chemin.** Si le
> pourtour du chalet a été dégagé d'avance en trois zones, on peut rester : de 0 à 1,5 m, rien qui brûle ; de 1,5 à
> 10 m, aucune corde de bois ; de 10 à 30 m, des conifères espacés d'au moins 3 m entre les cimes et élagués jusqu'à
> 2 m du sol (ch. 11, étapes 49 à 56). Sans ces zones, on ne peut pas défendre un chalet dans une forêt serrée
> d'épinettes noires. À la maison, décider selon l'avance du feu vers la ville (ch. 11).

**4.4** `chapitres/04-retombees-radioactives.md`, l. 159 (étape 16) : « 16. {!poison} **Ne donner qu'une seule dose,
sans la répéter, à un nouveau-né de moins d'un mois, à une femme enceinte ou qui allaite et à un adulte de plus de 60
ans.** »

Celui qui cherche, la lampe à la main, si sa femme enceinte est concernée doit lire tout le geste avant de trouver les
personnes.

> 16. {!poison} **À un nouveau-né de moins d'un mois, à une femme enceinte ou qui allaite et à un adulte de plus de
> 60 ans, donner une seule dose, sans la répéter.**

**4.5** `chapitres/04-retombees-radioactives.md`, l. 238 (étape 24) : « Rester jusqu'à 48 heures si la radio n'annonce
pas que le rayonnement baisse dans le secteur, ou si l'électroscope (section 7) ne montre pas la baisse. »

> Si la radio n'annonce pas de baisse du rayonnement dans le secteur, ou si l'électroscope (section 7) ne la montre
> pas, rester jusqu'à 48 heures.

**4.6** `chapitres/17-qui-cogne-a-la-porte.md`, l. 140 (étape 17) : « 17. **Loger le visiteur dans un espace séparé si
le bâtiment le permet ; sinon, séparer au moins le couchage des enfants, et dire pourquoi** »

> 17. **Si le bâtiment a un espace séparé, y loger le visiteur ; sinon, séparer au moins le couchage des enfants, et
> dire pourquoi.**

**La cause.** Le skill `ecriture` a la règle 3, « La condition avant le geste ». Elle cède devant l'habitude de
commencer chaque étape par son verbe en gras, et devant le « seulement si » ajouté après coup, quand le rédacteur se
rappelle l'exception.

### Motif 5. La consigne qui ne tranche pas (gravité haute)

Au lieu de dire quoi faire, l'étape pèse des raisons, donne une permission (« on peut »), laisse un choix sans dire
comment choisir, ou contredit son propre tableau. Le lecteur doit décider seul ce que le livre n'a pas décidé.

**5.1** `chapitres/04-retombees-radioactives.md`, l. 201 (étape 18) : « Ensuite, selon la situation, décider s'il faut
sortir à l'air libre, ou rester à l'intérieur en ouvrant la pièce d'abri sur le reste de la maison et en l'aérant avec
la pompe à volets ou l'éventail (section 7). » ; l. 203 : « Ce qui pousse à sortir : on ne trouve pas la source, ou on
ne peut pas l'éliminer ; le chiffre affiché par l'avertisseur ne baisse pas une fois la source éliminée et la pièce
ouverte ; l'abri est une maison de bois sans sous-sol, qui protège peu (étape 4). Si une personne est confuse, ne se
réveille pas bien ou perd connaissance, sa vie est en jeu : on peut la sortir à l'air libre » ; l. 210 : « Ce qui
pousse à rester : … »

Quatre raisons de chaque côté, et rien pour le cas où elles s'opposent (l'avertisseur ne baisse pas, mais les
retombées sont arrivées il y a vingt minutes et on est au sous-sol). La liste « Ce qui pousse à sortir » mêle des
raisons, une permission, un geste (se couvrir le nez) et le retour.

> 18 c. **Une fois la source éliminée, décider s'il faut sortir à l'air libre.**
> - Si une personne est confuse, ne se réveille pas bien ou perd connaissance, sa vie est en jeu : la sortir à l'air
>   libre, comme on quitte l'abri pour une blessure grave (étape 24). [À VÉRIFIER : le texte dit « on peut » ; la
>   consigne devient ferme seulement si la source le dit.]
> - Si on ne trouve pas la source, si on ne peut pas l'éliminer, ou si le chiffre de l'avertisseur ne baisse pas une
>   fois la pièce ouverte, sortir. [À VÉRIFIER : la consigne quand les retombées sont arrivées depuis moins d'une
>   heure et que l'abri est un sous-sol ; le texte donne les raisons des deux côtés sans dire laquelle l'emporte.]
> - Sinon, rester, ouvrir la pièce d'abri sur le reste de la maison et l'aérer avec la pompe à volets ou l'éventail
>   (section 7).
> - Pour sortir, se couvrir le nez et la bouche d'un linge. Rentrer dès que l'abri a été aéré et que l'avertisseur ne
>   sonne plus et n'affiche plus de chiffre ; en rentrant, enlever ses vêtements du dessus et se laver dans le coin de
>   l'entrée (étape 20).

**5.2** `chapitres/04-retombees-radioactives.md`, l. 137 et 139 (étape 13) : le tableau dit « | Plus de 40 ans |
130 mg | 2 | 1 | », puis : « Passé 40 ans, le risque d'un cancer de la thyroïde causé par l'iode radioactif est faible,
le risque d'une mauvaise réaction au comprimé augmente, et le comprimé ne sert que si la thyroïde risque une très
forte dose, assez forte pour la détruire. »

Quand la boîte suffit, donne-t-on les deux comprimés à un adulte de 45 ans ? Le tableau dit oui, le paragraphe dit
« seulement contre une très forte dose », que la famille ne peut pas mesurer.

> | Plus de 40 ans | 130 mg, en dernier (voir plus bas) | 2 | 1 |
>
> Quand la boîte ne suffit pas pour tout le monde, donner les comprimés d'abord aux enfants, aux femmes enceintes ou
> qui allaitent et aux adultes de moins de 40 ans ; s'il en reste, aux adultes de plus de 40 ans. Passé 40 ans, le
> risque d'un cancer de la thyroïde causé par l'iode radioactif est faible, et le risque d'une mauvaise réaction au
> comprimé augmente. [À VÉRIFIER : quand la boîte suffit, donne-t-on la dose aux plus de 40 ans ? Trancher à la
> source.]

**5.3** `chapitres/17-qui-cogne-a-la-porte.md`, l. 105 (étape 10) : « Au chalet, quand le chemin est fermé et que la
personne n'a nulle part où aller, ne pas refuser : choisir entre l'aide à distance (section 7, « Réchauffer quelqu'un
sans le faire entrer ») et l'hébergement (étapes 15 à 21). »

Le choix n'a pas de critère ici ; le chapitre le donne plus loin (« Sans pièce séparée, on ne peut pas à la fois
héberger un inconnu en santé et protéger le couchage des enfants : on l'héberge dehors », l. 376).

> Au chalet, quand le chemin est fermé et que la personne n'a nulle part où aller, ne pas refuser. Si elle est en
> santé et que le bâtiment n'a pas de pièce séparée, l'aider dehors, avec l'abri, le lit de branches et les pierres
> chaudes (section 7, « Réchauffer quelqu'un sans le faire entrer ») ; sinon, la loger (étapes 15 à 21).

**5.4** `chapitres/02-rester-ou-partir.md`, l. 153 (étape 27) : « Il n'existe aucune température reconnue à partir de
laquelle on doit quitter une maison : partir à la température écrite d'avance sur la fiche de décision, choisie en
pensant au plus jeune. »

La consigne s'ouvre sur ce qui n'existe pas : c'est la justification du cadrage, et la décision vient après le
deux-points.

> Partir quand la maison descend à la température écrite d'avance sur la fiche de décision, choisie en pensant au plus
> jeune.

**La cause.** Le skill `ecriture` (tableau du 15 octobre) dit : « Si deux dangers tirent en sens contraire, une source
dit lequel gagne et quoi faire ; sinon `[À VÉRIFIER]`. » Le rédacteur a écrit les raisons des deux côtés au lieu de
marquer le trou ; la prudence devient une liste à peser. La règle 12 du même skill interdit la formule vague (« selon
la situation »), mais ne dit rien de la permission (« on peut ») là où il faut un ordre, ni du choix laissé sans
critère.

### Motif 6. Le constat à la place de la consigne (gravité moyenne)

12 phrases d'étape relevées à la lecture disent un fait au présent et laissent le lecteur en tirer le geste, ou disent
la consigne au présent qui décrit (« les voisins comptent », « l'autre reste »).

**6.1** `chapitres/04-retombees-radioactives.md`, l. 226 (étape 22) : « Au chalet, un puits tubé et fermé est protégé ;
un lac, un ruisseau, un baril de pluie, la neige qui était au sol quand les retombées sont tombées et la neige tombée
pendant le passage ne le sont pas. »

> Au chalet, boire l'eau d'un puits tubé et fermé. Ne pas boire l'eau d'un lac, d'un ruisseau ni d'un baril de
> pluie. Ne pas boire non plus la neige qui était au sol quand les retombées sont tombées, ni celle qui est tombée
> pendant le passage.

**6.2** `chapitres/02-rester-ou-partir.md`, l. 164 (étape 29) : « Le congélateur plein d'orignal ne compte donc que pour
48 heures. Jeter ce qui a dépassé 4 °C ; cuire tout de suite ce qui a dégelé en restant à 4 °C ou moins (ch. 3). Dans
les deux cas, ces aliments sortent du calcul. »

La première phrase est la conséquence de celle qui la précède ; la dernière est la consigne, dite comme un constat.

> Jeter ce qui a dépassé 4 °C ; cuire tout de suite ce qui a dégelé en restant à 4 °C ou moins (ch. 3). Dans les deux
> cas, ne plus compter ces aliments.

**6.3** `chapitres/02-rester-ou-partir.md`, l. 168 (étape 30) : « Si la réponse est non aux deux premières et qu'on ne
connaît pas la troisième, le lien est la mesure la plus courte, même si tout le reste va bien. À la maison, les voisins
comptent dans le lien. »

> Si la réponse est non aux deux premières et qu'on ne connaît pas la troisième, compter le lien comme la plus courte
> des quatre mesures, même si tout le reste va bien. À la maison, compter les voisins dans le lien.

**6.4** `chapitres/17-qui-cogne-a-la-porte.md`, l. 144 (étape 18) : « Les premiers signes du monoxyde (le mal de tête,
la fatigue, la nausée, les étourdissements) sont ceux qu'on attend d'une personne qui arrive d'une longue route en
motoneige par grand froid. Si on les prend pour la fatigue du voyage et qu'on la laisse dormir dans le hangar avec son
réchaud allumé, le monoxyde peut la tuer pendant son sommeil. »

Deux faits et une scène ; la consigne n'est que dans le tableau des signes d'échec (l. 214). La scène suppose le
réchaud allumé dans le hangar, ce que la phrase en gras vient d'interdire.

> Chez un visiteur qui arrive d'une longue route en motoneige par grand froid, penser au monoxyde avant la fatigue du
> voyage : le mal de tête, la fatigue, la nausée et les étourdissements sont les mêmes, et le monoxyde peut tuer la
> personne pendant son sommeil.

**6.5** `chapitres/17-qui-cogne-a-la-porte.md`, l. 55 (étape 3) : « Un seul adulte doit parler ; l'autre reste avec les
enfants et surveille dehors par une autre fenêtre. » ; l. 57 : « Un adulte seul avec les enfants ne doit pas sortir :
il parle à travers la porte et donne ce qu'il donne par une fenêtre entrouverte. »

> Un seul adulte doit parler ; l'autre doit rester avec les enfants et surveiller dehors par une autre fenêtre. …
> Quand un adulte est seul avec les enfants, il ne doit pas sortir : il doit parler à travers la porte et donner par
> une fenêtre entrouverte ce qu'il donne.

**La cause.** Le skill `ecriture`, règle 11 : « Une consigne se dit comme une consigne. … Pas le présent qui décrit » ;
règle 8 : « Dire ce qui marche ». L'habitude est d'écrire le fait et de compter sur le lecteur pour en tirer le geste ;
`controle.py` ne relève que le pronominal, pas le présent qui décrit.

### Motif 7. Les tableaux qui débordent et redisent l'étape (gravité moyenne)

Les six tableaux du lot dépassent le plafond de 8 lignes (`CLAUDE.md`, gabarit ; JP, 28 octobre 2026) : 71 lignes pour
48. La même ligne du monoxyde est dans les trois tableaux des signes d'échec. Des cellules portent des chiffres
qu'aucune étape n'a, ou une règle de décision que la procédure ne donne pas.

**7.1** La ligne du monoxyde, trois fois : `chapitres/02-rester-ou-partir.md`, l. 287 : « | Maux de tête, fatigue,
nausées, vomissements ou étourdissements chez plus d'une personne | Monoxyde de carbone jusqu'à preuve du contraire |
Étapes 1 à 8 | » ; `chapitres/04-retombees-radioactives.md`, l. 331 ; `chapitres/17-qui-cogne-a-la-porte.md`, l. 214.

Au ch. 2, elle redit la première série orange et la section 2. Elle ne reste qu'au ch. 17, où le réflexe normal (la
fatigue du voyage) est le mauvais, et ce fait passe à l'étape 18 (exemple 6.4).

> (ch. 2 : la ligne sort ; ch. 4 : la ligne sort, l'étape 18 b la porte)
>
> (ch. 17) | Plusieurs personnes hébergées ont mal à la tête, sont fatiguées ou ont la nausée en même temps |
> Monoxyde de carbone, même si on croit à la grippe ou à la fatigue du voyage | Sortir tout le monde à l'air libre ;
> ne rentrer qu'après avoir trouvé la source (étape 18 ; ch. 87) |

**7.2** `chapitres/17-qui-cogne-a-la-porte.md`, l. 194 et 195 : « | Toute la visite | La distance de la conversation
dehors | Le repère, jamais à moins de 2 m | … » puis « | Toute la visite | La durée de la conversation dehors | À moins
de 2 m, moins de 15 min. L'hiver, 10 min au plus à partir de −28 de refroidissement éolien, 5 min au plus à partir de
−40 ; à partir de −48, aucune conversation dehors : décider par la fenêtre ; sans thermomètre, décider tout de suite,
par la fenêtre | »

La deuxième ligne permet ce que la première interdit (moins de 2 m), et ses seuils de −40 et −48 n'existent dans
aucune étape. Elle demande de lire le refroidissement éolien quand on vient de se faire réveiller, ce que JP a refusé
le 15 octobre (« on se fait réveiller, oublie ça le thermomètre »).

> | Toute la visite | La distance de la conversation dehors | Au repère, à plus de 2 m | Reprendre la distance en
> nommant le repère, ou rentrer et parler par la fenêtre |
>
> (dans l'étape 7, après « L'hiver, faire vite ») Régler la visite en 10 minutes au plus à partir de −28 de
> refroidissement éolien, en 5 minutes à partir de −40, et par la fenêtre à partir de −48. Sans thermomètre, décider
> tout de suite, par la fenêtre.

La nuit, la phrase qui sert est la dernière ; le rédacteur juge si les seuils restent, puisqu'ils demandent une lecture
que personne ne fera en sortant du lit.

**7.3** `chapitres/02-rester-ou-partir.md`, l. 264 : « | Première heure | Bois sec qu'on atteint sans machine | Nombre
de jours écrit sur la fiche (ch. 83) | Moins que ce nombre : partir pendant que la route est ouverte | »

La procédure décide en comparant la plus courte des quatre mesures à 72 heures et au trajet (étape 31) ; ce tableau
pose une autre règle, pour le bois seul.

> (la ligne sort ; la ligne de la température renvoie à l'étape 31)

**7.4** `chapitres/04-retombees-radioactives.md`, l. 333, colonne Action : « Ne pas le faire vomir. À partir de 4 ans,
deux doses font 130 mg, la dose d'un adulte : c'est sans danger. Écrire l'heure et la quantité sur le cadre de porte,
et donner la dose suivante à l'heure prévue. Ne plus en donner à un bébé de moins d'un mois (étape 16) »

Cinq phrases ; un diagnostic dans la colonne Action ; deux âges dans la même cellule.

> | Un enfant a reçu deux doses d'iode en moins de 24 heures | Une dose de trop. À partir de 4 ans, deux doses font
> 130 mg, la dose d'un adulte : c'est sans danger | Ne pas le faire vomir. Écrire l'heure et la quantité sur le cadre
> de porte. À partir de 4 ans, donner la dose suivante à l'heure prévue ; à un bébé de moins d'un mois, ne plus en
> donner (étape 16) |

**7.5** `chapitres/02-rester-ou-partir.md`, l. 262 : « | 0 à 5 min | Avertisseur de CO | Silencieux | S'il sonne :
étapes 1 à 8 | » ; l. 271 : « | Avant de charger | Carburant | Plein | Faire le plein d'abord, ou rester | »

La première redit la section 2 ; la seconde redit les étapes 24 et 35. Les deux sortent.

**7.6** `chapitres/17-qui-cogne-a-la-porte.md`, l. 193 : « | Toute la visite | Les adultes de la maison qui parlent |
**1** | Le deuxième adulte doit se taire et retourner à la fenêtre | » et l. 207 : « | Les deux adultes se contredisent
devant le visiteur | Les rôles de l'étape 3 ne sont pas tenus | Arrêter la conversation, rentrer, décider à
l'intérieur, puis revenir avec un seul adulte qui parle | »

Le même fait dans les deux tableaux. La ligne des signes d'échec reste (c'est ce qu'on voit quand ça rate) ; celle des
points de contrôle sort.

**La cause.** Le plafond de 8 lignes date du 28 octobre et ces chapitres n'ont pas encore eu leur passe. Mais le skill
`ecriture` a une phrase qui autorise la redite : « Les tableaux des sections 6 et 7 redonnent les cibles chiffrées,
c'est leur travail » (« La répétition »). L'habitude est d'écrire une ligne par étape, puis d'y ajouter ce que
l'étape a oublié.

### Motif 8. Le chiffre loin de son geste, en double, ou sans geste (gravité moyenne)

Le chiffre qui règle un geste arrive après le geste, ou trois fois sous trois formes ; un même fait (la baisse du
rayonnement) revient avec quatre chiffres ; un chiffre d'étude ne change rien à ce qu'on fait.

**8.1** `chapitres/04-retombees-radioactives.md`, l. 272 et 281 (étape 31) : « Couper la viande en morceaux d'environ
200 g, et les faire tremper 2 jours dans une saumure ou dans l'eau » … (trois alinéas plus loin, après un alinéa sur
le poisson) « Compter le sel de ce bain en grammes par litre d'eau, pas en pourcentage du poids de la viande comme dans
les salaisons (ch. 67, ch. 69) : 50 g par litre, quelle que soit la quantité de viande. Prendre du sel ordinaire. »

Le dosage du bain arrive après le trempage, et la viande et le poisson s'alternent dans les alinéas.

> 31. {!zone-de-danger} **Faire tremper la viande avant de la cuire, au froid.**
> - Couper la viande en morceaux d'environ 200 g.
> - Préparer le bain : de l'eau claire, ou une saumure à 50 g de sel ordinaire par litre d'eau, quelle que soit la
>   quantité de viande. Pour ce bain, on compte le sel par litre d'eau, pas en pourcentage du poids de la viande comme
>   dans les salaisons (ch. 67, ch. 69).
> - Faire tremper la viande 2 jours, en tenant le bain entre 0 et 4 °C, comme une saumure de salaison (ch. 69) : dans
>   un bain plus chaud, les bactéries se multiplient pendant les deux jours. Il reste alors moins de la moitié du
>   césium. Deux trempages de 2 jours, en changeant le bain, en laissent environ 20 % ; trois, environ 10 %.
>
> 31 b. {!botulisme} **Faire tremper le poisson au froid.** Le couper en morceaux de 70 à 290 g. Les faire tremper
> 4 heures dans une saumure à 50 g de sel par litre d'eau, puis dans l'eau claire ; ou bien 8 heures à l'eau courante.
> Il en part environ la moitié. Tenir le bain sous 3 °C avec de la glace ou de la neige. Si l'eau courante est plus
> chaude que 3 °C, ne pas y faire tremper le poisson.

**8.2** La baisse du rayonnement, quatre fois, `chapitres/04-retombees-radioactives.md` : l. 64, « la poussière
radioactive donne plus de la moitié de son rayonnement dans la première heure » ; l. 210, « à la première heure après
l'explosion, le rayonnement dehors est environ dix fois plus fort qu'à la septième » ; l. 237, « Environ 80 % de la
dose qu'on recevrait dehors arrive le premier jour » ; l. 637 (En plus), « il est cent fois plus faible au bout de 2
jours qu'à la première heure ».

C'est le cas du feu de cimes du ch. 11 (skill `ecriture` : « on comprend que le feu avance vite, la première fois tu le
dis »). Le chiffre reste là où il décide : l'étape 4 (entrer vite) et l'étape 24 (rester 24 heures). À l'étape 18,
un renvoi.

> (l. 210) les retombées d'une détonation sont arrivées depuis peu (étape 4) ;

**8.3** `chapitres/02-rester-ou-partir.md`, l. 157 (étape 28) : « La réserve de la trousse d'urgence est de 4 L par
personne et par jour, dont 2 L à boire, pour au moins trois jours. »

L'étape 26 demande chaque mesure « en heures ou en jours » ; l'étape de l'eau donne une norme de trousse et ne dit pas
comment tirer des jours de ses litres.

> Diviser les litres par 4, puis par le nombre de personnes : c'est le nombre de jours d'eau (il faut 4 L par personne
> et par jour, dont 2 L à boire). La trousse d'urgence en prévoit pour au moins trois jours.

**8.4** `chapitres/02-rester-ou-partir.md`, l. 145 (étape 27) : « La maison perd ses degrés le plus vite au début. Dans
des maisons sans chauffage, mesurées par environ −8 °C dehors, l'air est passé de 20 à 14 °C dans les premières heures,
puis il a baissé beaucoup plus lentement : l'écart avec le dehors avait diminué, et le béton, le gypse, les meubles et
la terre autour du sous-sol rendaient leur chaleur lentement. »

Un compte rendu d'étude dans une étape ; ce qu'il change au geste (ne pas prolonger la baisse des premières heures)
n'est pas dit.

> Refaire la mesure à chaque reprise de la décision (étape 43) : la maison perd ses degrés plus vite dans les premières
> heures que par la suite, et plus vite quand il fait plus froid dehors.

Les chiffres de l'étude vont en note « En plus », ou sortent ; l'éditeur juge.

**8.5** `chapitres/04-retombees-radioactives.md`, l. 46 (étape 1, pastille 30 s) : « au-delà de quelques kilomètres, il
avance d'environ 1,6 km toutes les 5 secondes, soit 3 secondes par kilomètre, et il met de quelques secondes à plus
de 30 secondes à arriver »

Trois façons de dire le même délai.

> il arrive de quelques secondes à plus de 30 secondes après l'éclair (au-delà de quelques kilomètres, il met environ
> 3 secondes par kilomètre)

À l'inverse, `chapitres/02-rester-ou-partir.md`, l. 163, est le modèle : « Le réfrigérateur reste froid environ 4 à 6
heures : compter 4 heures. » Le chiffre de la source, puis celui qu'on prend pour le geste.

**La cause.** Le skill `ecriture`, règle 5 (« Le chiffre avec son unité ») ne dit pas où le chiffre se place ;
`CLAUDE.md` le dit pour le chapitre d'achat coupé (« le chiffre dont elle a besoin … dans l'étape qui s'en sert »),
pas pour l'étape elle-même. Habitude : recopier le chiffre dans la forme où la source le donne (une norme de trousse,
une vitesse en km par 5 secondes, une étude), au lieu de le donner dans l'unité du geste.

### Motif 9. On ne sait plus qui fait le geste (gravité moyenne)

Des pronoms en chaîne qui changent de personne, un geste demandé à la mauvaise personne, un « laisser un seul
décider » qui ne dit pas lequel.

**9.1** `chapitres/17-qui-cogne-a-la-porte.md`, l. 114 (étape 11) : « Si l'adulte va la chercher pendant la
conversation, le visiteur le voit se retourner, et il peut agir le premier, avant que l'adulte revienne. Devant une
arme montrée, il ne sait pas si elle est chargée, et il réagit comme si elle l'était, sans qu'on puisse prévoir
comment. Il apprend aussi qu'il y a une arme dans la maison, et jusqu'où la famille est prête à aller. »

« la », « le », « il », « elle » : quatre personnes ou choses pour cinq pronoms. L'étape (175 mots) finit en plus sur
une scène qui répond à une question que personne n'a posée (« retenir le visiteur sous la menace oblige à le
nourrir… »).

> Ne pas aller chercher l'arme, et ne pas la montrer. Quand l'adulte se retourne pour aller la chercher, le visiteur
> peut agir le premier, avant son retour. Devant une arme, le visiteur ne sait pas si elle est chargée : il réagit
> comme si elle l'était, et on ne peut pas prévoir comment. Il apprend aussi qu'il y a une arme dans la maison, et
> jusqu'où la famille est prête à aller.

**9.2** `chapitres/17-qui-cogne-a-la-porte.md`, l. 81 (étape 7, alinéa) : « Sinon, ne pas sortir : lui passer par la
fenêtre un sac de couchage et une couverture, et lui dire d'étendre la couverture pliée en deux sur la neige, contre le
mur, à l'abri du vent, de poser le sac de couchage dessus, puis d'entrer dans le sac et de le fermer. »

Cinq gestes demandés, dans une seule phrase au discours indirect, à une personne qui, selon la même étape, parle mal
et devient confuse. L'étape 5 demande pourtant « une seule question à la fois ».

> Sinon, ne pas sortir. Passer par la fenêtre un sac de couchage et une couverture, et lui dire une chose à la fois :
> « Pliez la couverture en deux et étendez-la sur la neige, contre le mur, à l'abri du vent. » « Mettez le sac de
> couchage dessus. » « Entrez dans le sac et fermez-le. »

**9.3** `chapitres/02-rester-ou-partir.md`, l. 55 (étape 2) : « S'il manque quelqu'un, ouvrir grand la porte en
restant dehors. Puis un adulte qui n'a ni mal de tête ni nausée doit aller le chercher en marchant, droit à lui, et
ressortir avec lui. »

Qui ouvre la porte ? « le », « lui », « lui » renvoient à « quelqu'un ». Et « en marchant », geste qui surprend dans
une urgence (on irait en courant), n'a pas son pourquoi ici ni à l'étape 5 (« elle doit y aller en marchant »), alors
que des gestes évidents en ont trois.

> S'il manque quelqu'un, ouvrir grand la porte sans entrer. Puis un adulte qui n'a ni mal de tête ni nausée doit
> entrer chercher la personne en marchant, aller directement à elle et ressortir avec elle. [À VÉRIFIER : pourquoi en
> marchant ; une demi-phrase sourcée, ou rien.]

**9.4** `chapitres/02-rester-ou-partir.md`, l. 236 (étape 42) : « 42. **Prendre les mesures à deux adultes, puis laisser
un seul décider**, et garder la décision jusqu'à l'heure fixée pour la reprendre (étape 43). »

> 42. **Prendre les mesures à deux adultes, puis convenir lequel des deux tranche**, et garder sa décision jusqu'à
> l'heure fixée pour la reprendre (étape 43).

**La cause.** Le skill `ecriture`, règle 0 : « on sait qui le fait » ; le cadre : « On nomme la chose au lieu du
possessif qui oblige à chercher ». La règle vise le possessif, pas le pronom personnel en chaîne, et rien ne demande de
vérifier que la personne à qui l'étape confie un geste est en état de le faire.

### Motif 10. Les lignes de Matériel et les titres de « Quand l'utiliser » (gravité basse)

14 lignes de Matériel sur 15 dépassent 20 mots ; deux items ne servent à aucune étape. Sept titres de « Quand
l'utiliser » sur 24 ajoutent après le deux-points une explication ou un geste.

**10.1** `chapitres/02-rester-ou-partir.md`, l. 39 : « **Thermomètre médical** : il montre l'hypothermie sous 35 °C,
avant les signes de l'étape 40. On ne peut pas le fabriquer. »

Aucune étape ne dit de prendre la température ; la section 7 dit quoi faire sans lui. La procédure doit dire quand
s'en servir, ou la ligne sort.

> (dans l'étape 40 ou 44) Prendre la température de la personne au thermomètre médical : sous 35 °C, c'est
> l'hypothermie, avant même les signes ci-dessus.

**10.2** `chapitres/04-retombees-radioactives.md`, l. 37 : « **Compteur Geiger ou dosimètre à affichage** : mesure le
rayonnement dans la pièce et dehors, et montre quand il a assez baissé pour sortir (sans compteur : section 7). »

L'étape 24, qui décide de sortir, s'appuie sur la radio ou l'électroscope, jamais sur le compteur.

> (étape 24) Si la radio n'annonce pas de baisse du rayonnement dans le secteur, ou si le compteur (sinon l'électroscope,
> section 7) ne la montre pas, rester jusqu'à 48 heures.

**10.3** `chapitres/02-rester-ou-partir.md`, l. 40 : « **Fiche de décision remplie d'avance** : la durée du trajet en
janvier, le nombre de jours de bois, la température intérieure à laquelle on part. En garder une copie à la maison, une
au chalet et une dans l'auto. » (37 mots) ; et l. 37 : « pour dire qu'on reste ou qu'on part, et où nous chercher »

Une étape de préparation dans le Matériel (le ch. 2 n'a pas de section « Avant, une fois », que les ch. 4 et 17 ont) ;
et un « nous » qui change la voix du livre.

> **Fiche de décision remplie d'avance** : la durée du trajet en janvier, le nombre de jours de bois et la température
> intérieure à laquelle on part.
>
> (Messagerie satellite) pour dire qu'on reste ou qu'on part, et où chercher la famille

**10.4** `chapitres/17-qui-cogne-a-la-porte.md`, l. 36 : « **Lampe de poche puissante** : pour éclairer le sol devant
le visiteur ; on la tient loin du corps, après avoir éteint la lampe de la pièce (étape 2). »

La ligne redit le geste de l'étape 2.

> **Lampe de poche puissante** : pour éclairer le sol devant le visiteur sans se montrer (étape 2).

**10.5** `chapitres/04-retombees-radioactives.md`, l. 18 : « **Éclair blanc aveuglant, puis grondement ou onde de
pression** : c'est une détonation, même lointaine (étapes 1 à 3). » ; l. 23 : « **À l'abri depuis quelques heures** :
boire, manger, aérer et décider quand sortir (étapes 17 à 27). »

> **Éclair aveuglant, puis grondement ou onde de pression** (étapes 1 à 3).
>
> **À l'abri depuis quelques heures** (étapes 17 à 27).

**10.6** `chapitres/17-qui-cogne-a-la-porte.md`, l. 21 : « **Une personne arrivée à pied au chalet l'hiver** : loin de
la ville, personne n'y marche par choix ; chercher d'abord les signes du froid (étape 7). » ; l. 26 : « **Une crise qui
dure, et des voisins qui manquent de ce que la maison a encore** : se préparer avant la prochaine visite (étapes 22 à
29). »

> **Quelqu'un arrive à pied au chalet, l'hiver** (étape 7).
>
> **Une crise qui dure : se préparer aux visites** (étapes 22 à 29).

**La cause.** Le gabarit fixe « une ligne par item, 15 à 20 mots », et son propre format y ajoute le renvoi
« (étape N ; sans X : section 7) », qui prend 5 à 8 mots. Aucune règle ne demande que chaque item du Matériel soit
nommé par une étape. Pour « Quand l'utiliser », la règle 13 et le gabarit (« sans justification ») sont là ; l'habitude
du deux-points suivi d'une glose les contourne.

## 3. Ce qui marche, à garder comme modèles

**M1.** `chapitres/02-rester-ou-partir.md`, l. 51 (étape 1) : « {!co} **Sortir tout le monde, tout de suite, sans
chercher la source.** Réveiller les gens qui dorment, prendre les enfants et faire sortir les animaux. Ne pas
s'arrêter pour ouvrir les fenêtres : laisser la porte ouverte derrière soi. En passant, prendre les bottes, les
manteaux et les couvertures qui sont sur le chemin, sans faire de détour par les chambres. »
Un geste par phrase, dans l'ordre où on les fait ; le « ne pas » est suivi tout de suite de ce qu'on fait à la place ;
aucun fait entre deux gestes ; le détail (les bottes) dit où et comment, sans pourquoi inutile.

**M2.** `chapitres/02-rester-ou-partir.md`, l. 173 (étape 31) : « 31. **Comparer la plus courte des quatre mesures à
72 heures et à la durée du trajet.** - Elle dure plus de 72 h : rester, et continuer à mesurer. - Elle dure moins de
72 h : rester seulement avec un plan écrit pour faire durer ce qui va manquer en premier, avec ce qu'on a sur place. -
Elle dure moins que le trajet : partir maintenant, ou décider de rester pour de bon. Si on attend, ce qu'elle mesure
manquera avant qu'on arrive. »
Une décision qui tranche : chaque cas commence par sa condition et finit par un geste ; le seul pourquoi vient à la
fin, là où il sert.

**M3.** `chapitres/04-retombees-radioactives.md`, l. 152 (étape 15) : « - Mettre deux comprimés de 65 mg, ou un
comprimé de 130 mg, dans un petit bol, ajouter 20 mL d'eau (4 cuillères à thé) et laisser tremper 1 minute. - Écraser
avec le dos d'une cuillère jusqu'à ce qu'il ne reste plus de gros morceaux. - Ajouter 20 mL (4 cuillères à thé) de
lait, de lait maternisé, de jus d'orange ou d'eau, et mélanger : le comprimé a très mauvais goût, et la boisson le
cache. - Donner 5 mL (1 cuillère à thé) de la naissance à 1 mois, 10 mL de 1 mois à 3 ans, et 20 mL de 4 à 12 ans. -
Garder le reste au réfrigérateur, ou au froid, et le jeter après 7 jours. »
Une sous-étape par geste, dans l'ordre ; chaque chiffre dans le geste qui s'en sert, avec la mesure de cuisine ; ce
qu'on voit quand c'est fait (« jusqu'à ce qu'il ne reste plus de gros morceaux ») ; un seul pourquoi, court, après son
geste. On le suit avec un bébé dans les bras.

**M4.** `chapitres/17-qui-cogne-a-la-porte.md`, l. 63 (étape 4) : « 4. **Compter à voix haute les personnes, les
véhicules et les traces**, pour que l'autre adulte entende le compte. S'il y a plus de traces ou de véhicules que de
monde en vue, ne pas ouvrir, et demander à travers la porte : « Vous êtes combien ? » »
Le geste, son but en une proposition (« pour que »), la condition avant le geste, et les mots exacts à dire.

**M5.** `chapitres/17-qui-cogne-a-la-porte.md`, l. 121 (étape 12) : « 12. **À tout moment, si le visiteur montre une
arme, menace ou force la porte : arrêter de parler, emmener tout le monde dans la pièce du fond, bloquer la porte de
cette pièce de l'intérieur et y rester.** S'il entre et exige quelque chose, le lui donner, sans discuter ni
résister »
Le déclencheur d'abord, puis quatre gestes courts dans l'ordre, puis le cas suivant, lui aussi condition d'abord.

Autres bons passages, pour mémoire : `chapitres/04-retombees-radioactives.md`, l. 611 à 618 (le retour par l'entrée
en chicane, un geste et un repère par ligne) ; `chapitres/02-rester-ou-partir.md`, l. 163 (« Le réfrigérateur reste
froid environ 4 à 6 heures : compter 4 heures. ») ; `chapitres/02-rester-ou-partir.md`, l. 313 (« « Attache ta
botte », pas « As-tu froid ? » » : un test qu'on fait, au lieu d'un signe à juger).

## 4. Ce que ça demande au skill (pour la réécriture)

1. **L'ordre dans l'étape** : les gestes d'abord, dans l'ordre où on les fait ; le pourquoi après le geste qu'il
   explique, en une phrase, lié par « parce que », « pour que » ou « sinon » quand c'est possible ; jamais un fait
   entre deux gestes. Remplacer l'exemple de la règle 2 (« Vidanger … : un tuyau plein fend en gelant ») par un modèle
   qui ne soit pas en « geste : raison ».
2. **Une étape, un sujet** : la ligne en gras dit ce que fait toute l'étape ; si un alinéa parle d'autre chose (le CO
   dans l'étape du bouchage), c'est une autre étape. Au-delà de 100 mots, l'étape se justifie ou se découpe.
3. **La condition d'abord, même dans la ligne en gras**, et la personne concernée d'abord (« À un nouveau-né…,
   donner… »).
4. **Relire chaque série dans l'ordre du temps**, étape par étape : ce qui interdit le geste avant le geste
   (contre-indications avant la dose), ce qui a une limite de temps avant l'installation, rien du retour dans le
   départ.
5. **Une décision s'écrit en « si … : faire »**, jamais en « ce qui pousse à » ; « on peut » seulement pour une vraie
   option ; un choix a son critère ; un conflit sans source porte `[À VÉRIFIER]`.
6. **Le chiffre dans l'unité du geste**, une seule fois (« compter 4 heures », « diviser par 4 »), et à l'étape qui
   décide ; un fait chiffré qui revient avec un autre chiffre est une redite.
7. **Les tableaux** : retirer « c'est leur travail » de la section « La répétition » ; aucune cellule n'a un chiffre
   ou une règle que la procédure n'a pas ; la colonne Action ne porte que des gestes.
8. **Le Matériel** : chaque item est nommé par une étape ; le renvoi compte dans les 20 mots, ou sort.
9. **Un auditeur de la consigne** (script) : mots par étape, étapes en « geste, fait, geste », part de faits dans les
   étapes, consignes dont la condition suit le geste, lignes de tableau, items du Matériel sans étape. Le script de
   travail est dans le scratchpad de cette session (`consB/etapes.py`) ; il est approximatif (un infinitif se repère à
   sa terminaison) et demande une liste d'exceptions plus longue avant d'entrer dans `.claude/skills/ecriture/scripts/`.

## 5. Liste de contrôle (ma partie de `.claude/cadre-agents.md`)

Pour tout agent
- [x] `CLAUDE.md` en contexte, et il prime.
- [x] Skill de ma partie lu au complet (`ecriture`), avec `gabarit-chapitre.md`, `editeur` et les décisions sur
  l'orange et le Matériel dans `plan/decisions-jp.md`.
- [ ] `suivi/plan-de-match.md`, « PAUSE du 15 octobre » : pas lu ; audit seulement, aucun chapitre touché.
- [x] Règle 1 : aucune réécriture n'ajoute de chiffre ni de fait ; les trous portent `[À VÉRIFIER]`.
- [x] Rien commité ; seul ce fichier de notes est écrit.
- [x] Économie : un lot de trois chapitres, aucune image, aucune source ouverte, sorties coupées.

Le texte : la forme du chapitre
- [x] Sept sections dans les trois chapitres, ligne de lieu seule sous le titre.
- [x] Section 2 : relevé au motif 10 (sept titres glosés).

L'urgence
- [x] La série orange joue la scène réelle, d'abord ce qui sauve : relevé au motif 3.
- [ ] La pastille sourcée : pas vérifié à la source (hors regard).
- [ ] Le logigramme : pas lu (hors lot).
- [ ] Les notes « En plus » : lues, pas jugées (hors regard).

La phrase
- [x] Règle 0 (qui fait le geste) : motif 9.
- [x] Consigne au pronominal : `controle.py` n'en signale aucune dans le lot.
- [x] La consigne se dit comme une consigne, pas au présent qui décrit : motif 6.
- [x] Points de contrôle et signes d'échec, 5 à 8 lignes : les six tableaux dépassent (motif 7).
- [x] Un passage lourd se juge d'abord (doit-il exister ?) : les réécritures coupent avant de polir (2.2, 6.2, 7.5).
- [x] Le chapitre parle de son sujet : antigel (1.2), eau désinfectée (1.4), remise en eau (3.5).
- [x] « Quand l'utiliser » en titres courts : motif 10.
- [x] Qui fait quoi, quand et pourquoi, sans formule vague ; liste après deux-points d'une seule sorte : motifs 5 et 9.
- [ ] Le mot qu'on dit : hors regard ; noté en passant « sédentaire » (réécrit en 1.3).
- [x] Aucun tiret dans mes réécritures. Dans le lot, `controle.py` compte 2 tirets par chapitre : ceux des titres
  (« Chapitre 2 — Rester ou partir », « Tome 1 — Tenir ») ; à vérifier si l'assembleur les remplace.

La procédure
- [x] Une étape à plusieurs gestes se découpe : motif 1.
- [x] Une autre façon se dit comme une autre façon : respecté dans le lot (« Autre façon : », « Sans barre, »).
- [x] L'urgence ne s'appuie pas sur une préparation : le poteau est expliqué (ch. 17, étape 5) ; la fiche de décision
  du ch. 2 a son repli à l'étape 27, pas à l'étape 35.

La répétition
- [x] Inventaire par idée : la baisse du rayonnement (8.2), la ligne du monoxyde (7.1), le mécanisme du comprimé
  (1.4).

La langue
- [x] Pas deux « ou » l'un dans l'autre dans mes réécritures (3.1 et 3.2 corrigent une série emboîtée).
- [x] Français correct, sans joual ni tutoiement du lecteur ; le « vous » de 9.2 est dit au visiteur.
- [ ] `langue.py` : pas passé ; aucun texte du livre n'est modifié.
