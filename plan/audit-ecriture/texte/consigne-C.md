# Audit de l'écriture : la consigne, lot C (tome 2)

28 octobre 2026. Un seul regard : la consigne. Qui fait quoi, quand, dans quel ordre ; un geste par phrase ou une étape
qui en entasse cinq ; la condition avant ou après le geste ; le pourquoi qui aide ou qui alourdit ; le chiffre à sa
place ; une étape qu'on suit les mains occupées, à la lampe frontale ; les séries orange, les tableaux Points de
contrôle et Signes d'échec, les lignes de Matériel, les titres de « Quand l'utiliser ».

Lot, lu au complet : `chapitres/25-le-froid-lui-meme.md` (471 lignes), `chapitres/26-soigner-quand-il-n-y-a.md`
(534 lignes), `chapitres/39-des-enfants-de-4-et-6-ans.md` (537 lignes). Aucun fichier du livre n'a été modifié. Les
réécritures sont des exemples, sans fait ni chiffre neuf : ce que le rédacteur doit trancher ou chercher à la source
est marqué [entre crochets]. Les numéros de ligne sont ceux des fichiers au 28 octobre.

À savoir avant de lire : les ch. 25 et 39 n'ont pas encore passé la grande passe (ils ont encore neuf sections, avec
« Pourquoi ça marche » et « Danger », des tirets et des « → §9 ») ; le ch. 26 l'a passée (sept sections, quatre séries
orange). La comparaison sert : le ch. 26 a réglé la moitié des défauts de la consigne (le titre d'étape, la condition
en tête, le pronominal), pas l'autre moitié (l'étape qui entasse, le tableau qui redit, le chiffre mal placé).

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 25 | 4805 | 243 | 19,8 | 0,79 | 12,8 | 16,5 | 18,6 | 36,2 | 23,5 | 7,7 | 5,2 | 6,0 |
| ch. 26 | 5903 | 275 | 21,5 | 0,54 | 3,6 | 16,7 | 32,1 | 29,5 | 22,9 | 5,1 | 12,2 | 4,6 |
| ch. 39 | 5593 | 312 | 17,9 | 0,63 | 16,0 | 16,0 | 19,9 | 27,2 | 19,6 | 5,9 | 3,8 | 3,2 |
| tout le livre | | | 18,7 | 0,65 | 15,5 | 17,3 | 19,9 | 31,4 | 23,7 | 5,0 | 9,4 | 5,4 |

### Le même script, par sorte de texte

Extraits faits dans le scratchpad, par plages de lignes.

| texte | mots | m/phr | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | liais./1000 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 26, séries orange (étapes 1 à 22) | 1800 | 19,1 | 4,3 | 6,4 | 29,0 | 18,1 | 18,1 | 4,4 | 5,0 |
| ch. 26, reste de la procédure (23 à 47) | 1704 | 22,7 | 2,7 | 21,3 | 31,1 | 24,0 | 20,0 | 10,6 | 4,7 |
| **ch. 26, variante d'urgence** | 1829 | **23,8** | **1,3** | **26,0** | **35,5** | **49,4** | **35,1** | 1,6 | 3,8 |
| ch. 25, procédure (1 à 34) | 1703 | 16,7 | 12,7 | 10,8 | 18,8 | 32,4 | 21,6 | 8,8 | 4,1 |
| **ch. 25, tableaux et seuils (l. 220 à 279)** | 492 | **30,8** | 6,2 | 25,0 | 20,0 | **62,5** | 37,5 | 12,2 | 8,1 |
| ch. 25, variante d'urgence | 1517 | 19,4 | 15,4 | 17,9 | 16,9 | 32,1 | 20,5 | 2,0 | 7,3 |
| **ch. 39, procédure (1 à 21)** | 1423 | 16,9 | 16,7 | 14,3 | 16,9 | 22,6 | 14,3 | 9,8 | **0,7** |
| ch. 39, variante d'urgence | 2922 | 19,9 | 10,9 | 19,7 | 21,9 | 30,6 | 24,5 | 3,8 | 4,1 |

Ce que les chiffres disent, pour la consigne :

- **Les étapes du ch. 39 n'ont presque aucun mot de liaison** : 0,7 pour 1000 mots, sept fois moins que la moyenne du
  livre (5,4). Les étapes sont des phrases posées côte à côte (un geste, un nom, un fait, une maxime) sans « pour »,
  « parce que », « puis », « sinon », « alors ». C'est le tempo dont JP se plaint, vu dans la procédure : rien ne dit
  au lecteur comment une phrase mène à la suivante.
- **La variante d'urgence du ch. 26 est le texte le plus lent du lot** : 23,8 mots par phrase, une phrase sur quatre de
  30 mots et plus, presque aucune phrase courte, une phrase sur deux avec deux-points, une sur trois en « fait :
  conséquence ». C'est pourtant là que sont les gestes de débrouille qu'on fait de ses mains (pansement bouilli,
  garrot improvisé, attelle d'écorce) : ils sont écrits en paragraphes de prose, pas en étapes.
- **Le paragraphe des seuils du ch. 25** (l. 255 à 266) tient six seuils de température, chacun avec sa consigne, dans
  une seule phrase : 30,8 mots par phrase et 62,5 % de phrases à deux-points pour cet extrait.
- **Les séries orange du ch. 26 sont le meilleur texte du lot pour la condition** : 28 conditions en tête de phrase,
  2 en queue, 18 % de deux-points. Leur défaut est ailleurs : la longueur des étapes (tableau suivant).

### Les mesures de ce regard (script de travail, approximatif)

| | ch. 25 | ch. 26 | ch. 39 |
| --- | --- | --- | --- |
| étapes numérotées de la procédure | 34 | 47 (22 en orange) | 21 |
| mots par étape, moyenne (médiane) | 54 (52) | orange 84 (59) ; reste 70 (58) | 65 (56) |
| la plus longue étape | 147 mots (ét. 3) | 293 mots, 13 phrases (ét. 9, le garrot, série « 5 min ») | 135 mots (ét. 10) |
| étapes de plus de 120 mots | 1 | 8 | 1 |
| titres d'étape qui ne disent pas de geste | **13 sur 34** (7 étiquettes, 6 constats ou maximes) | 0 sur 47 | 1 sur 21 |
| consignes au pronominal (« se traite », « se porte », « se jette »…), environ | 16 | 0 | 22 |
| tirets dans le texte | 49 | 0 | 42 |
| « → § » | 2 | 0 | 5 |
| lignes Points de contrôle / Signes d'échec (règle : 5 à 8 chacun) | 9 / 11 | 14 / 12 | 11 / 11 |
| séries orange | 0 | 4 | 0 |
| où sont les gestes urgents | séquences A à F par sujet ; l'eau glacée aux étapes 23 à 27 ; « sans signe de vie » à l'étape 14 | en tête de la procédure | section 9 (variante), lignes 450 à 527 d'un fichier de 537 |

Les six tableaux du lot ont 68 lignes ; la règle en permet 48 au plus. Au ch. 26, les 14 lignes des Points de
contrôle redisent chacune une étape (le chapitre est complet, le tableau n'a plus rien à apprendre).

## 2. Les défauts, du plus grave au moins grave

### Motif 1. L'urgence rangée au fond du chapitre, et la décision après les gestes (gravité haute)

Les gestes des premières minutes ne sont pas en tête de la procédure. Au ch. 25, la procédure est rangée par sujet
(A Lire, B Hypothermie, C Gelure, D Glace, E Pied d'immersion, F Enfants) : le premier geste dans l'eau glacée est
l'étape 24, et la personne sans signe de vie est l'étape 14, après « Attendre » (12) et « Ne pas laisser se lever trop
vite » (13). Au ch. 39, les quatre urgences de l'enfant (passé à travers la glace, perdu, refroidi, a avalé quelque
chose) sont dans la variante d'urgence, en section 9, sous des titres qui commencent par « Sans… ». Dans une même
série, la décision qui commande tout (partir, improviser un garrot) vient en dernière phrase, après les gestes ; et la
série « 5 min » du ch. 26 porte des décisions de 2 heures et de 6 heures.

Fréquence : ch. 39, 4 procédures urgentes sur 4 en section 9 et aucune série orange ; ch. 25, aucune série orange,
6 séquences rangées par sujet ; ch. 26, 1 série sur 4 qui porte des décisions de plusieurs heures ; 2 décisions sur 2
placées après les gestes (ch. 39 l. 524, ch. 26 l. 365).

Cause : CLAUDE.md, « Les premières minutes, en orange » (« ouvre sa procédure sur la série des premières minutes, dans
l'ordre où on les fait ») et le cadre (« La série orange vient tout de suite après le logigramme, en tête de la section
4 Procédure, […] jamais dans la variante d'urgence ni plus loin dans la procédure ») ; skill `ecriture`, « Le réel de
l'urgence » (« d'abord ce qui sauve dans les secondes et les minutes, ensuite ce qui organise »). Ces deux chapitres
attendent la grande passe (`suivi/plan-de-match.md`, point 21). L'habitude derrière : ranger par sujet, comme une table
des matières, au lieu de ranger par l'horloge ; et `gabarit-chapitre.md`, qui dit encore « Le jour où l'item n'est pas
là, c'est la variante d'urgence (section 9) qui sert », pousse tout geste écrit « sans X » au fond du chapitre, même
quand ce geste est le plus urgent.

**ch. 39, l. 524** (la fin de « Un enfant a avalé quelque chose », dernière section du chapitre)

> La décision : une pile bouton avalée, un produit caustique, un solvant qui fait tousser, ou n'importe quoi d'inconnu
> chez un enfant de cet âge, ça ne se soigne pas au chalet. C'est un des rares cas du livre où on part (ch. 2), et où
> on part tout de suite plutôt que d'attendre de voir, parce que la brûlure d'une pile se fait pendant que l'enfant a
> l'air correct.

Réécriture (en tête de la procédure, série orange « Un enfant a avalé quelque chose ») :

> 1. **Si l'enfant a avalé une pile bouton, un produit caustique, un solvant qui le fait tousser ou un produit qu'on ne
> connaît pas, partir tout de suite (ch. 2), sans attendre de voir.** Une pile brûle pendant que l'enfant a l'air
> correct. Faire les gestes qui suivent avant de partir et pendant la route.
> 2. **Garder le contenant avec l'enfant**, même vide…

**ch. 39, l. 450** (un titre de la section 9)

> ### Sans pics à glace, et ce qu'on fait quand quelqu'un passe au travers

Réécriture (deux places) :

> En tête de la procédure, série orange : « Un enfant passe à travers la glace » (s'approcher couché, lui tendre une
> perche, une branche, une ceinture ou un manteau tordu ; ne pas courir vers le trou). Dans « Avant » : « Porter les pics
> à glace au cou, par-dessus le manteau (fabrication : ch. 15, section 7). »

**ch. 25, l. 163** (étape 23, la première de la séquence D)

> 23. **Connaître les trois horloges de l'eau froide — le 1-10-1** :

Réécriture (série orange « On passe à travers la glace », en tête de la procédure) :

> 1. **Garder la bouche et le nez hors de l'eau, ne pas bouger et ralentir sa respiration.** Pendant environ une
> minute, le choc du froid fait haleter, et le danger de cette minute est la noyade. Ne pas nager pour se réchauffer.
> 2. **Sortir par où on est entré, dans les 10 minutes qui suivent**, parce qu'après environ 10 minutes, les bras, les
> jambes et les doigts ne répondent plus. On perd connaissance de froid au bout d'environ une heure.

**ch. 25, l. 113** (étape 14, après « Attendre » et « Ne pas laisser se lever »)

> 14. **Sans signe de vie** : palper le pouls carotidien[^1] pendant **une minute complète** avant de conclure, puis RCR
> avec ventilations si rien.

Réécriture (en tête de la séquence B, juste après le triage) :

> 3. **Si la personne ne répond pas et ne respire pas, chercher le pouls au cou pendant une minute complète.** S'il n'y
> en a pas, commencer la RCR avec les insufflations (ch. 26, étape 4).

**ch. 26, l. 106 et 111** (dans la série orange « Ça gicle, ou ça saigne à flot », pastille 5 min)

> - Le membre supporte un garrot qui reste moins de 2 heures. Si la route doit prendre plus de 2 heures, on peut
> desserrer le garrot à trois conditions […]
> - Après 6 heures, ne plus enlever le garrot.

Réécriture : dans l'orange, le garrot s'arrête à « Écrire l'heure de la pose sur le front de la personne. Ne jamais
desserrer le garrot pour voir. » La route de plus de 2 heures et la limite de 6 heures deviennent une étape de
« Surveiller dans le temps » (réécrite au motif 2).

**ch. 26, l. 365** (dernière phrase de « Le garrot », section 7)

> Quand la personne mourrait de son sang sans lui, le poser sans hésiter.

Réécriture (première phrase de la section) :

> **Si la personne va mourir de son sang et qu'il n'y a pas de garrot, en faire un sans hésiter** (planche 26-04).
> Prendre une bande large, qui répartit la pression, jamais une corde, un fil ou une ceinture étroite.

### Motif 2. L'étape qui entasse les gestes (gravité haute)

Une étape qui demande quatre, cinq ou six gestes les tasse dans une phrase, en liste de noms après un deux-points,
séparés par des points-virgules ; ou elle fait d'un paragraphe de prose une suite de gestes qu'il faudrait numéroter.
Le lecteur qui a les mains dans un sac de couchage ou sur une plaie ne retrouve pas où il en était. Deux fois, l'ordre
du texte n'est pas l'ordre des mains (l'enveloppe croisée ferme les côtés avant de remonter les pieds).

Fréquence : ch. 26, 8 étapes de plus de 120 mots (l'étape 9, le garrot, 293 mots et 13 phrases dans une série
« 5 min ») ; ch. 26, section 7 : pansement, garrot, attelle et déplacement écrits en paragraphes (23,8 mots par
phrase) ; ch. 25, 3 étapes (8, 18, 21) en liste de 5 ou 6 gestes après un deux-points, et l'enveloppe croisée en un
paragraphe de 12 phrases sans appel à sa planche (25-01, ancrée là, jamais appelée) ; ch. 39, l'étape 10 qui fait deux
étapes (la réserve, l'ébullition).

Cause : skill `ecriture`, règle 1 (« Une phrase, une information ») et règle 0 (« pas de participe en chaîne ») ; le
cadre, « La procédure » (« Une étape qui a plusieurs gestes se découpe en sous-étapes : le geste, où est la chose et
comment la reconnaître, ce qu'on voit quand c'est fait ; chaque sous-étape renvoie au repère de sa planche ») ; la ligne
« La procédure tassée dans une étape » du tableau du skill (ch. 3, étape 23). Et une règle qui a été lue de travers :
« l'encadré orange est la version détaillée, et tout y est, […] sans limite de longueur » (CLAUDE.md) a servi de
permis pour verser dans une seule étape orange tout ce qui touche le garrot, y compris ce qui se décide deux heures
plus tard. L'habitude derrière : le deux-points et le point-virgule pour compresser (7,7 points-virgules pour 1000 mots
au ch. 25, 10,6 dans la fin de la procédure du ch. 26).

**ch. 25, l. 93** (étape 8)

> 8. **Monter l'enveloppe** : matelas isolant dessous ; le plus d'isolant possible par-dessus, la personne **dans** le
> sac de couchage fermé et non sous un sac ouvert ; sources de chaleur sur le haut du corps ; tuque ou capuchon, le
> visage dégagé pour respirer ; pare-vapeur par-dessus si la personne est sèche, à l'intérieur si elle est mouillée.

Réécriture (le matelas est à l'étape 6 et la chaleur à l'étape 9 : ils ne reviennent pas ici) :

> 8. **Monter l'enveloppe, dans cet ordre :**
> - mettre la personne dans le sac de couchage et le fermer, pas sous un sac ouvert ;
> - lui mettre une tuque ou remonter le capuchon, le visage dégagé pour qu'elle respire ;
> - ajouter par-dessus le plus d'isolant possible ;
> - poser le pare-vapeur : par-dessus le tout si elle est sèche, contre elle si elle est mouillée (étape 7).

**ch. 25, l. 149** (étape 21)

> 21. **Après le dégel** : sécher à l'air ou par tamponnement, jamais en frottant ; gaze entre les doigts et les
> orteils ; pansement sec et volumineux, posé lâche ; membre surélevé ; boire. Ibuprofène si disponible — 12 mg/kg par
> jour en deux prises, jusqu'à 2 400 mg par jour en quatre prises chez l'adulte si la douleur l'exige. Chez l'enfant,
> la dose de l'étiquette pédiatrique, matin et soir : 150 mg à 4-5 ans, 200 mg à 6-8 ans ; jamais plus de 10 mg/kg par
> prise, de 4 prises ni de 40 mg/kg par jour (ch. 32).

Réécriture :

> 21. **Après le dégel :**
> - sécher le membre en tamponnant ou à l'air, sans frotter ;
> - mettre de la gaze entre les doigts ou les orteils ;
> - poser un gros pansement sec, sans serrer ;
> - garder le membre surélevé, et faire boire la personne ;
> - donner de l'ibuprofène si on en a : 12 mg/kg par jour en deux prises ; chez l'adulte, si la douleur l'exige,
> jusqu'à 2 400 mg par jour en quatre prises. Chez l'enfant, la dose de l'étiquette pour enfants, matin et soir
> (150 mg de 4 à 5 ans, 200 mg de 6 à 8 ans), sans dépasser 10 mg/kg par prise, 4 prises ni 40 mg/kg par jour
> (ch. 32).

**ch. 25, l. 376** (« L'enveloppe croisée », section 9 ; planche 25-01 ancrée ici et jamais appelée)

> Prendre le bord gauche de la couverture du dessus, le rabattre par-dessus le corps et le border **sous** le flanc
> droit ; faire l'inverse avec le bord droit. Les deux rabats se croisent sur la poitrine et se verrouillent l'un
> l'autre : une enveloppe croisée ne s'ouvre pas quand on la soulève, une enveloppe simplement repliée s'ouvre toujours
> au pire moment. Remonter le bout des pieds avant de fermer les côtés.

Réécriture (le paragraphe entier, en étapes, dans l'ordre des mains) :

> 1. Étendre la bâche. Poser une couverture en travers, puis la deuxième, décalée d'une demi-largeur pour que les
> jointures ne tombent pas au même endroit (planche 25-01).
> 2. Mettre l'isolant là où ira le corps [sous la bâche ou sur les couvertures : à dire], avant le reste : des branches de
> sapin baumier tassées, pointes en bas, sur une épaisseur de main, un matelas de mousse ou du carton double.
> 3. Coucher la personne au milieu, sur le dos, la tuque ou le capuchon en place.
> 4. Remonter le bout des couvertures sur les pieds.
> 5. Rabattre le bord gauche de la couverture du dessus par-dessus le corps et le border sous le flanc droit, puis le
> bord droit sous le flanc gauche. Croisés sur la poitrine, les deux rabats se tiennent l'un l'autre, et l'enveloppe ne
> s'ouvre pas quand on soulève la personne.
> 6. Refermer la bâche par-dessus et la border dessous, le visage dégagé.

[Le paragraphe dit ensuite « Pare-vapeur par-dessus l'isolant si la personne est sèche, contre elle si elle est
mouillée », alors que la bâche, seul pare-vapeur du montage, a été étendue dessous : la consigne ne dit pas comment
mettre la bâche contre une personne mouillée. À trancher par le rédacteur.]

**ch. 26, l. 106** (étape 9, dans la série « 5 min »)

> Si la route doit prendre plus de 2 heures, on peut desserrer le garrot à trois conditions : la personne n'est pas en
> choc (son pouls ne monte pas, sa peau n'est pas froide et moite, elle n'est ni agitée ni somnolente), le garrot
> n'arrête pas le sang d'un membre arraché, et quelqu'un peut surveiller la plaie. Alors, serrer un pansement compressif
> sur la plaie, puis desserrer le garrot en le laissant en place, lâche, pour le resserrer au premier filet de sang, et
> écrire l'heure du desserrage à côté de celle de la pose.

Réécriture (étape à part, dans « Surveiller dans le temps ») :

> **Si la route prend plus de 2 heures, desserrer le garrot seulement si les trois conditions sont réunies :**
> - la personne n'est pas en choc : son pouls ne monte pas, sa peau n'est pas froide et moite, elle n'est ni agitée ni
> somnolente ;
> - le garrot ne tient pas un membre arraché ;
> - quelqu'un peut surveiller la plaie.
>
> Alors, dans cet ordre : serrer un pansement compressif sur la plaie ; desserrer le garrot sans l'enlever, et le
> laisser lâche autour du membre ; le resserrer au premier filet de sang ; écrire l'heure du desserrage à côté de celle
> de la pose. Après 6 heures, ne plus enlever le garrot.

**ch. 26, l. 340** (« Le pansement », section 7)

> Faire bouillir à gros bouillons du coton propre (un drap, une taie d'oreiller, une chemise), l'essorer sans le tordre
> en boule, le faire sécher sur une corde à l'abri de la poussière et **le plier pendant qu'il sèche**, pas après : une
> fois sec, chaque fois qu'on le manipule, on dépose quelque chose sur la face qui touchera la plaie (planche 26-11,
> repères 1 à 4).

Réécriture [repères à faire correspondre à la planche, dans son ordre] :

> 1. Faire bouillir à gros bouillons du coton propre : un drap, une taie d'oreiller ou une chemise (planche 26-11,
> repère 1).
> 2. L'essorer sans le tordre en boule (repère 2).
> 3. Le faire sécher sur une corde, à l'abri de la poussière, et le plier pendant qu'il sèche (repère 3). Une fois sec,
> chaque fois qu'on le touche, on salit la face qui ira sur la plaie.
> 4. Le ranger dans un sac fermé, le pli vers l'intérieur (repère 4).

**ch. 39, l. 128** (étape 10)

> 10. **Assurer l'eau.** Compter 4 L par personne par jour, boisson et hygiène confondues, pour au moins 72 h. Le «6 L
> par personne » des aimants de frigo ne couvre que la boisson sur trois jours ; le ch. 6 fait le calcul complet et
> arrive aux mêmes 4 L. Pour quatre personnes sur 72 heures : 48 L. À la maison, l'aqueduc coule tant que la station
> de traitement tient ; dès qu'un avis d'ébullition tombe, et au chalet en tout temps, l'eau se porte à gros bouillons
> pendant au moins 1 minute. Cette eau sert aussi au brossage des dents, à la glace, aux breuvages et au lavage des
> aliments qui se mangent crus. L'ébullition tue les bactéries, les virus et les protozoaires ; elle ne retire aucun
> contaminant chimique, elle les concentre.

Réécriture (deux étapes ; l'aimant de frigo sort : il parle d'une autre source et d'un autre chapitre) :

> 10. **Garder une réserve d'eau de 4 L par personne par jour, pour boire et se laver, pour au moins 72 heures**, ce
> qui fait 48 L pour une famille de quatre (calcul au ch. 6).
> 11. **Faire bouillir l'eau à gros bouillons au moins 1 minute**, toujours au chalet, et à la maison dès qu'il y a un
> avis d'ébullition. Faire bouillir aussi l'eau des dents, de la glace, des breuvages et du lavage des aliments qu'on
> mange crus. L'ébullition tue les bactéries, les virus et les protozoaires. Elle ne retire pas les produits
> chimiques, elle les concentre.

### Motif 3. Le titre d'étape qui ne dit pas de geste, et le geste dit par des noms (gravité haute)

Le titre en gras d'une étape est ce qu'on lit en feuilletant. Au ch. 25, 13 titres sur 34 ne disent pas quoi faire :
des étiquettes (« Hypothermie légère seulement », « Ampoules », « Après le dégel »), des constats (« Ça n'a pas besoin de
gel. », « Ils refroidissent plus vite, pour une raison de géométrie. », « Le sauveteur ne marche pas jusqu'au trou. »)
et des maximes (« La prévention est une paire de bas. », « Une routine plutôt qu'une consigne. »). Dans le corps des
étapes, le geste est souvent dit par des noms sans verbe (« Trois questions courtes à chacun », « Séchage à distance du
poêle », « Cible de la pièce chaude : 19 °C »), ou caché dans un participe (« la perche, suspendue par une corde passée
en son milieu »). Et des étapes s'arrêtent au constat, sans dire quoi faire de ce qu'on a vu.

Fréquence : ch. 25, 13 titres sur 34 (38 %), plus « Connaître » (étape 23), qui est un verbe mais pas un geste ; ch. 39,
1 titre sur 21, mais la fabrication des pics (l. 452 à 455) n'a aucun verbe de geste, et l'étape 16 constate sans dire
quoi faire ; ch. 26, aucun (les titres sont des infinitifs ou « Si…, faire… »).

Cause : skill `ecriture`, règle 0 (« un verbe qui dit le geste, et on sait qui le fait. Pas une liste de noms qui tient
lieu d'actions ») et règle 4 (« Les étapes à l'infinitif ») ; le cadre (« Les titres de sous-sections sont des noms de
gestes ou de choses, pas des maximes » ; « Pas de maxime ni de chute en formule »). L'habitude : le titre d'accroche,
qui résume l'idée au lieu de nommer le geste.

**ch. 25, l. 198** (étape 30)

> 30. **La prévention est une paire de bas.** Deux paires sèches par jour en forêt, changées dès qu'elles sont humides,
> bottes ouvertes et séchées chaque soir (ch. 104).

Réécriture :

> 30. **Changer de bas dès qu'ils sont humides.** En forêt, prévoir deux paires sèches par jour, et ouvrir et faire
> sécher les bottes chaque soir (ch. 104).

**ch. 25, l. 214** (étape 34)

> 34. **Une routine plutôt qu'une consigne.** Par grand froid, une rentrée forcée à intervalle fixe, décidé d'avance et
> plus court que celui des adultes, vaut mieux qu'une surveillance au jugé : personne n'a à trancher au moment où tout
> le monde a froid et hâte de finir.

Réécriture :

> 34. **Faire rentrer les enfants à heure fixe.** Par grand froid, décider avant de sortir aux combien de minutes ils
> rentrent se réchauffer, plus souvent que les adultes, et les faire rentrer à l'heure dite, sans attendre qu'ils aient
> froid. Comme c'est décidé d'avance, personne n'a à trancher au moment où tout le monde a froid et a hâte de finir.

**ch. 39, l. 88** (étape 3)

> 3. **Les cendres ne refroidissent pas quand elles ont l'air froides.** Une cendre grise, éteinte et froide au toucher
> garde des braises vivantes en dessous pendant des jours. Elle va dans un contenant de métal à couvercle de métal, posé
> dehors sur le sol nu, et y reste au moins 7 jours avant d'être vidée.

Réécriture :

> 3. **Vider les cendres dans un contenant de métal fermé par un couvercle de métal, posé dehors sur le sol nu, et les y
> laisser au moins 7 jours avant de les jeter.** Une cendre grise, éteinte et froide au toucher garde des braises
> vivantes en dessous pendant des jours. Dans un seau de plastique, elles le font fondre ; dans une boîte de carton ou
> sur une galerie de bois, elles mettent le feu, des heures après qu'on a vidé le poêle.

[Le geste appartient au ch. 82, qui le dit (contenant de métal, 7 jours) ; ici, un renvoi suffirait. Voir le motif 4.]

**ch. 39, l. 452** (« Fabriquer les pics », section 9)

> **Fabriquer les pics.** Deux clous de charpente plantés à fond dans deux bouts de manche à balai ou deux morceaux de
> branche de la grosseur d'un manche, la pointe limée courte et bien acérée, sortant à peine de la longueur d'un ongle.
> Un cordon noué d'un pic à l'autre, porté au cou par-dessus le manteau : les pics pendent sur la poitrine, à portée des
> deux mains (planche 15-01).

Réécriture (à sa place, au ch. 15 ; ici, un renvoi) :

> Planter à fond un clou de charpente dans chacun de deux bouts de manche à balai, ou de deux morceaux de branche de la
> même grosseur. Limer la pointe courte et bien acérée, pour qu'elle sorte à peine de la longueur d'un ongle. Nouer un
> cordon d'un pic à l'autre et le porter au cou, par-dessus le manteau, les pics sur la poitrine, à portée des deux
> mains (planche 15-01).

**ch. 39, l. 304** (la balance, sous-étape 1)

> 1. Une perche d'épinette droite, écorcée, de la longueur des deux bras écartés. Tailler le gros bout à la hache jusqu'à
> ce que la perche, suspendue par une corde passée en son milieu, reste horizontale toute seule. Deux bras de même
> longueur et de même poids : deux charges égales s'équilibrent.

Réécriture :

> 1. Prendre une perche d'épinette droite, écorcée, de la longueur des deux bras écartés. La suspendre par une corde
> attachée en son milieu. Tailler le gros bout à la hache jusqu'à ce qu'elle reste à l'horizontale toute seule. Les deux
> bras ont alors le même poids, donc deux charges égales s'équilibrent.

**ch. 39, l. 165** (étape 16)

> 16. **Inspecter au retour, chaque fois.** Joues, nez, oreilles, bouts de doigts, orteils. Une peau souple, chaude, de
> couleur normale est correcte. Une peau qui rougit et picote est une engelure qui commence ; une peau blanchâtre,
> cireuse, brillante et insensible est une engelure profonde.

Réécriture (le ch. 25 dit « gelure » : un seul mot dans le livre) :

> 16. **Au retour, chaque fois, regarder et toucher les joues, le nez, les oreilles, le bout des doigts et les
> orteils.** Si la peau rougit et picote, la gelure commence, et il faut la réchauffer lentement. Si elle est
> blanchâtre, cireuse, brillante et ne sent plus rien, la gelure est profonde, et on la soigne comme au ch. 25
> (étapes 15 à 22).

### Motif 4. Deux consignes pour un même geste, qui ne disent pas la même chose (gravité haute)

Le même geste est écrit deux fois, dans l'étape et dans la variante, ou dans deux chapitres, avec des détails qui ne se
recoupent pas ; deux fois, les deux versions se contredisent. Le lecteur qui tombe sur l'une ne sait pas que l'autre
existe, et celui qui lit les deux ne sait pas laquelle suivre.

Fréquence : ch. 25, 3 cas (les vêtements mouillés, étapes 7 et 27 ; le bain de gelure, étape 19 et section 9 ; les
pics, section 9 et ch. 39) ; ch. 39, 3 cas (le poids qui baisse, étape 20 et tableau ; l'air étagé, étape 9 et section 9 ;
les cendres, qui sont au ch. 82, et l'eau, aux ch. 6 et 10) ; entre chapitres, la solution de réhydratation (ch. 26 et 39, et le
ch. 30 qu'ils citent).

Cause : skill `ecriture`, « La répétition » (« Un fait se dit une fois par chapitre, à l'endroit où il sert » ; « Un fait
qui revient garde une seule place ») ; CLAUDE.md (« Chaque chapitre parle de son sujet, pas de celui des autres […] sans
doublon ; ici, il reste un renvoi court ») ; cadre, « La répétition » (« Inventaire des faits du chapitre : un fait garde
une seule place ; […] la variante d'urgence n'apprend que du neuf »). L'habitude : la variante écrite comme un texte à
part, qui refait l'étape au lieu de dire seulement ce qui change sans l'objet ; et des chapitres écrits par des agents
différents, chacun complet pour lui-même.

**ch. 25, l. 182** (étape 27), contre l'étape 7 (l. 89 : « si un abri ou un transport est accessible en moins de 30
minutes, envelopper tel quel »)

> Sous 2 °C, quelqu'un de mouillé se traite pour hypothermie même s'il marche et parle normalement : l'eau dans le
> tissu continue de tirer la chaleur longtemps après la sortie de l'eau, et l'habillage sec passe avant tout le reste.

Réécriture :

> Sous 2 °C, traiter pour hypothermie toute personne mouillée, même si elle marche et parle normalement, parce que ses
> vêtements mouillés continuent de lui prendre sa chaleur longtemps après la sortie de l'eau. Pour les vêtements,
> suivre l'étape 7.

[Une seule règle, à trancher par le vérificateur technique : l'étape 7 dit d'envelopper la personne telle quelle si un
abri est à moins de 30 minutes ; l'étape 27 dit que l'habillage sec passe avant tout.]

**ch. 25, l. 410** (section 9), contre l'étape 19 (l. 143)

> Verser l'eau chaude **à côté** du membre, jamais dessus, en brassant. Une glacière de camp comme bassin plutôt qu'un
> chaudron : elle tient la température et oblige à rajouter moins souvent. Le membre ne touche pas les parois.

Réécriture (dans l'étape 19, qui porte tout le bain ; la section 9 ne garde que les repères sans thermomètre : le
poignet, la main du secouriste, la vérification du thermomètre dans la neige fondante) :

> 19. **Si on dégèle, plonger le membre dans un bain d'eau entre 37 et 39 °C, mesurée au thermomètre** (sans
> thermomètre : section 9).
> - Prendre une glacière de camp plutôt qu'un chaudron, parce qu'elle garde la chaleur et qu'il faut rajouter de l'eau
> moins souvent.
> - Tenir le membre loin des parois.
> - Quand l'eau refroidit, verser de l'eau chaude à côté du membre, jamais dessus, en brassant.
> - Sortir le membre quand il est souple et rouge violacé, après environ 30 minutes.

**ch. 39, l. 178** (étape 20), contre le tableau (l. 196 : « Deux semaines de baisse : réviser la ration et le gras »)

> 20. **Peser les enfants chaque semaine dès que les rations sont limitées.** Un enfant qui perd du poids deux semaines
> de suite change le plan, pas la ration.

Réécriture :

> 20. **Peser les enfants chaque semaine dès que les rations sont limitées.** Si un enfant perd du poids deux semaines
> de suite, [revoir sa ration et son gras (ch. 19, ch. 21), comme le dit le tableau ; ou changer de plan : à trancher].

**ch. 25, l. 417** (section 9), contre ch. 39, l. 452 (même objet, deux façons de le porter)

> Percer les deux bouts en travers, passer un cordon assez long pour aller d'une main à l'autre en passant derrière la
> nuque, et les porter **par-dessus** le manteau.

Réécriture (dans les deux chapitres ; la fabrication se dit une fois, au ch. 15, qui l'a en section 7) :

> Porter les pics à glace au cou, par-dessus le manteau (fabrication : ch. 15, section 7).

**ch. 39, l. 363** (section 9), contre ch. 26, l. 443 (« **3 g de sel de table et 18 g de sucre**, pesés, dans un
litre d'eau bouillie et refroidie »)

> il reste le sucre et le sel dissous dans l'eau bouillie refroidie : **2,5 mL de sel et 30 mL de sucre dans 1 L
> d'eau**

Réécriture (dans les deux chapitres) :

> Sans sachet, préparer la solution de réhydratation du ch. 30.

[Les deux recettes sans jus ne se recoupent pas à vue (18 g de sucre pesés au ch. 26, 30 mL à la cuillère au ch. 39) :
au vérificateur technique de garder la bonne, au ch. 30.]

**ch. 39, l. 126** (étape 9), contre la section 9 (l. 418 à 421, le verre d'eau et « L'air d'une pièce chauffée au bois
est étagé »)

> L'air d'une pièce chauffée au poêle est stratifié : le lit d'un enfant au plancher est dans une autre pièce que le
> thermomètre posé sur la table.

Réécriture (une fois, dans l'étape où on pose le thermomètre ; la section 9 garde seulement le verre d'eau) :

> Poser le thermomètre à la hauteur du lit des enfants, pas sur la table, parce que près d'un poêle, l'air est plus
> froid en bas qu'en haut.

### Motif 5. La condition après le geste, et l'exception en queue (gravité moyenne)

Le geste vient d'abord, la condition ensuite (« Garder gelé si… », « boisson chaude…, si la personne est consciente »),
ou l'exception qui change le premier geste arrive après lui (on a couché la personne sur le dos, puis on lit qu'il
fallait la laisser assise). Dans l'urgence, on fait le premier verbe qu'on lit. Même famille : le seuil donné avant de
savoir à quoi il s'applique (« moins de 5 ans pour une plaie souillée… »).

Fréquence : ch. 25, 6 étapes (7, 8, 10, 14, 18, 21) ; ch. 26, peu (28 conditions en tête dans l'orange, 2 en queue),
mais 3 placements qui comptent (étapes 4, 13, 14) et le tétanos (27) ; ch. 39, aucun dans la procédure.

Cause : skill `ecriture`, règle 3 (« La condition avant le geste. "Si l'eau est trouble, la filtrer avant de la
désinfecter." »). L'habitude : écrire la règle générale, puis la nuancer, comme dans un texte qu'on lit assis.

**ch. 25, l. 137** (étape 18)

> 18. **Décider : dégeler ou garder gelé.** Garder gelé si le membre risque de regeler avant les soins, ou si les soins
> sont à moins de deux heures — depuis la maison, c'est le cas ordinaire, et la gelure part à l'hôpital encore gelée.
> Dans ce cas : protéger, rembourrer, attelle, aucun frottement, aucune neige, et ne pas marcher sur un pied entièrement
> gelé — marcher sur des orteils gelés pour s'évacuer reste raisonnable. Ne pas non plus s'acharner à garder le tissu
> gelé : le dégel spontané est normal et il faut le laisser se faire.

Réécriture :

> 18. **Décider si on dégèle le membre ou si on le garde gelé.**
> - Si l'hôpital est à moins de deux heures, ou si le membre risque de geler de nouveau avant d'y arriver, le garder
> gelé. Depuis la maison, c'est le cas ordinaire.
> - Pour le transport, le protéger et le rembourrer, lui poser une attelle, ne pas le frotter et ne pas y mettre de
> neige.
> - Ne pas marcher sur un pied gelé au complet ; on peut marcher sur des orteils gelés pour partir vers l'hôpital.
> - S'il dégèle tout seul en route, le laisser dégeler, c'est normal.
> - Sinon, le dégeler (étape 19).

**ch. 25, l. 102** (étape 10)

> 10. **Hypothermie légère seulement** : boisson chaude sucrée et nourriture riche en glucides, si la personne est
> consciente, réagit et avale bien. Tiède, pas brûlante.

Réécriture :

> 10. **Si l'hypothermie est légère et que la personne est bien réveillée, réagit et avale bien, lui donner une boisson
> sucrée, tiède et pas brûlante, et des aliments riches en glucides.**

**ch. 26, l. 56** (étape 4, série « 1 min »)

> 4. **Si la personne ne répond pas et ne respire pas normalement[^1], comprimer la poitrine tout de suite** (si son
> corps est froid, faire d'abord l'étape 5).

Réécriture (le signe du corps froid, dit à la fin de l'étape 5, monte ici) :

> 4. **Si la personne ne répond pas et ne respire pas normalement[^1] :** si elle est restée au froid (par exemple
> 20 minutes dans la neige à -30 °C), chercher d'abord le pouls au cou pendant une minute pleine (étape 5) ; sinon,
> comprimer la poitrine tout de suite.

**ch. 26, l. 138** (étape 14)

> 14. **Coucher la personne sur le dos et lui relever les jambes.** Si elle respire mal, la laisser assise. Si elle
> vomit ou si elle ne répond plus, la coucher sur le côté.

Réécriture :

> 14. **Placer la personne selon son état** : si elle respire mal, la laisser assise ; si elle vomit ou ne répond plus,
> la coucher sur le côté ; sinon, la coucher sur le dos, les jambes relevées.

**ch. 26, l. 134** (étape 13 : on lit l'enfant après avoir injecté)

> - Tenir l'injecteur en place 3 secondes.
> - Chez un enfant, lui tenir la jambe pour qu'il ne la bouge pas pendant l'injection.

Réécriture (dans l'ordre des mains) :

> - Chez un enfant, lui tenir la jambe pour qu'il ne la bouge pas.
> - Appuyer le bout orange au milieu du côté extérieur de la cuisse et pousser fort jusqu'au déclic.
> - Tenir l'injecteur en place 3 secondes.

**ch. 26, l. 185** (étape 27)

> Si elle a reçu ses trois doses de base, elle est protégée quand sa dernière dose a moins de 5 ans pour une plaie
> souillée de terre, de poussière, de selles ou de salive, une morsure, un clou, des tissus morts, une gelure, une
> brûlure ou un arrachement, et moins de 10 ans pour une petite plaie propre. Sinon, ou si on ne le sait pas, partir
> faire le rappel.

Réécriture :

> Si elle a reçu ses trois doses de base, elle est protégée :
> - pour une petite plaie propre, si sa dernière dose a moins de 10 ans ;
> - pour une plaie souillée de terre, de poussière, de selles ou de salive, une morsure, un clou, des tissus morts, une
> gelure, une brûlure ou un arrachement, si sa dernière dose a moins de 5 ans.
>
> Sinon, ou si on ne sait pas, partir faire le rappel.

### Motif 6. La consigne au présent qui décrit, ou au pronominal (gravité moyenne)

La consigne se lit comme un constat (« Le sauveteur ne marche pas jusqu'au trou », « Elle va dans un contenant de
métal », « aucun appareil […] ne fonctionne dans un espace fermé ») ou comme une chose qui se fait toute seule (« se
traite comme une modérée », « se remplacent, pas se portent », « se cuit ou se jette »). Personne ne fait le geste ; le
lecteur doit traduire en « je dois ».

Fréquence : ch. 25, environ 16 pronominaux de consigne ; ch. 39, environ 22, dont la phrase exacte que JP a corrigée au ch. 3 (« se cuit
ou se jette », l. 431) ; ch. 26, aucun. Les cinq règles du monoxyde du ch. 39 (l. 329 à 337) sont au présent de constat.

Cause : skill `ecriture`, règle 11 (« Une consigne se dit comme une consigne. […] Pas le présent qui décrit ») et le
tableau (« La consigne au pronominal », JP : « on doit le cuire, pas il se cuit ; très important pour le livre ») ;
CLAUDE.md, « La tournure naturelle » (« Jamais au pronominal quand quelqu'un fait le geste »). L'habitude : la forme
impersonnelle des manuels, qui sonne « règle » et ne dit pas qui agit.

**ch. 25, l. 175** (étape 26)

> 26. **Le sauveteur ne marche pas jusqu'au trou.** Tendre une perche, une branche, une corde, une échelle, en restant
> couché et en arrière du bord.

Réécriture :

> 26. **Pour sortir quelqu'un de l'eau, rester couché sur la glace, en arrière du bord, et lui tendre une perche, une
> branche, une corde ou une échelle.** Ne pas marcher jusqu'au trou.

**ch. 25, l. 72** (étape 3)

> Le frisson peut persister sous 32 °C : une personne qui frissonne **avec** la conscience altérée se traite comme une
> modérée, pas comme une légère.

Réécriture :

> Si la personne frissonne mais qu'elle n'a plus toute sa tête, la traiter comme une hypothermie modérée, pas légère,
> parce que le frisson peut continuer sous 32 °C.

**ch. 25, l. 429** (« Le pare-vapeur qu'on porte », section 9)

> **Le pare-vapeur qu'on porte.** Un sac de plastique entre le bas et le chausson de feutre. […] Le sac sort à chaque
> arrêt où il y a de la chaleur, le pied sèche, le bas se change.

Réécriture :

> **Le pare-vapeur qu'on porte.** Mettre un sac de plastique entre le bas et le chausson de feutre. Le pied finit
> mouillé de sa sueur, mais le feutre reste sec et continue d'isoler. Comme la peau macère, blanchit et plisse, ce qui
> est le début du pied d'immersion (étape 28), enlever le sac à chaque arrêt au chaud, laisser sécher le pied et
> changer de bas.

**ch. 39, l. 329** (les cinq règles « Sans avertisseur de monoxyde de carbone », section 9)

> - aucun appareil à combustion — génératrice, réchaud à naphta, poêle d'appoint au propane, moteur, barbecue — ne
> fonctionne dans un espace fermé, à aucun moment, même portes ouvertes ;
> - personne ne dort dans la même pièce qu'un appareil à combustion sans conduit d'évacuation ;
> - une entrée d'air permanente reste ouverte, même à -35 °C. […]
> - la sortie du conduit se vérifie de l'extérieur après chaque bordée et après chaque redoux. […]

Réécriture :

> - Ne jamais faire marcher dans un endroit fermé, même portes ouvertes, un appareil qui brûle quelque chose :
> génératrice, réchaud à naphta, poêle d'appoint au propane, moteur, barbecue.
> - Ne pas dormir dans la pièce d'un appareil qui brûle quelque chose sans tuyau qui sort dehors.
> - Laisser une entrée d'air ouverte en permanence, même à -35 °C, quitte à brûler plus de bois, parce que le poêle
> prend son air dans la pièce et qu'il en manque dans une pièce trop bien calfeutrée.
> - Aller voir dehors la sortie de la cheminée après chaque bordée et chaque redoux. La neige soufflée, la glace de
> pluie et le givre la bouchent par le haut, et la fumée revient alors dans la pièce.

**ch. 39, l. 349** (section 9)

> Un enfant qui devient mou dans une pièce chauffée à la flamme sort dehors avant qu'on cherche pourquoi.

Réécriture :

> Si un enfant devient mou dans une pièce chauffée à la flamme, le sortir dehors d'abord, et chercher pourquoi
> ensuite.

**ch. 39, l. 430** (« Sans réfrigération », section 9)

> Alors la règle se simplifie : tant que le gel tient dehors sans interruption, la caisse tient ; au premier redoux, ce
> qui était fumé ou salé se cuit ou se jette.

Réécriture :

> Garder le poisson fumé ou salé dans la caisse tant que le gel tient dehors sans interruption. Au premier redoux, le
> cuire ou le jeter.

### Motif 7. Le pourquoi qui alourdit : la scène, la statistique, la maxime en bout d'étape (gravité moyenne)

Le pourquoi d'une étape aide quand il change la façon de faire. Ici, il prend souvent la forme d'une petite scène
(« un enfant réveillé à 3 h du matin dans la fumée »), d'une statistique (« 69 % des cas »), d'une histoire (« On a
abandonné le desserrage à heures fixes… »), d'une maxime (« La supervision partagée est la supervision absente ») ou
d'un détour (« on est tenté de »), placé en bout d'étape, après le geste. Le lecteur relit pour trouver ce qu'il doit
faire, et la phrase utile se perd entre deux phrases qui ne le sont pas.

Fréquence : une vingtaine dans le lot. ch. 39, dix étapes sur vingt et une finissent sur une formule (1, 5, 6, 7, 8,
12, 13, 14, 20, 21) ; ch. 25, 6 (étapes 2, 4, 12, 14, 23, 26) ; ch. 26, 4 (étapes 9, 27, 36, 40).

Cause : skill `ecriture`, règle 2 (« Le fait d'abord, la raison ensuite, et seulement si la raison change ce qu'on
fait ») ; le tableau « Les phrases » (statistique d'ambiance, chute en formule, opposition fabriquée, petite scène) ;
règle 12 (« Pas de détour par la tentation ou le sentiment (« on est tenté de ») », la phrase que JP a trouvée
« fucking weird » sur la page de la génératrice, revenue mot pour mot au ch. 26) ; cadre (« Pas de maxime ni de chute en
formule »). L'habitude : finir chaque étape sur une phrase qui « sonne », pour clore.

**ch. 26, l. 236** (étape 36)

> 36. {!co} {!generatrice} **Garder la génératrice, le réchaud et le barbecue dehors pendant qu'on veille un malade.**
> Quand on veille quelqu'un, on ferme la maison, on chauffe plus fort et on veut du courant pour la lumière : c'est le
> moment où on est tenté de rentrer la génératrice dans un bâtiment, un garage ou sous un auvent. Le monoxyde donne mal
> à la tête, la nausée et le sommeil, et la famille met ça sur le compte de la maladie ou de l'inquiétude.

Réécriture :

> 36. {!co} {!generatrice} **Garder la génératrice, le réchaud et le barbecue dehors pendant qu'on veille un malade,
> même quand on a fermé la maison, qu'on chauffe plus fort et qu'on veut de la lumière.** Le monoxyde donne mal à la
> tête, mal au cœur et envie de dormir, et on met ça sur le compte de la maladie ou de l'inquiétude. Si les gens qui
> veillent ont mal à la tête en même temps, ou si ça va mieux dehors, sortir tout le monde, la personne malade enroulée
> dans ses couvertures.

**ch. 39, l. 140** (étape 12)

> 12. **Nommer l'adulte de garde.** À tout moment, un adulte et un seul est responsable des deux enfants, et il le sait.
> La supervision partagée est la supervision absente : dans les noyades mortelles d'enfants au Québec, il n'y avait pas
> d'adulte à proximité dans 69 % des cas. Le relais se fait à voix haute, pas par présomption.

Réécriture [CLAUDE.md coupe la supervision : juger d'abord si l'étape doit exister ; le fait qui surprend, la noyade
silencieuse, est à la ligne 216] :

> 12. **Nommer l'adulte de garde.** À tout moment, un seul adulte est responsable des enfants, et il le sait. Quand un
> autre prend la relève, le lui dire à voix haute.

**ch. 39, l. 112** (étape 7)

> […] un enfant réveillé à 3 h du matin dans la fumée ne fait pas ce qu'il a compris à 14 h. Ce qui se retient à cet
> âge-là, ce n'est pas la consigne, c'est le chemin fait avec le corps.

Réécriture (l'étape entière) :

> 7. **Faire l'exercice d'évacuation au moins une fois par année, et au moins une fois de nuit.** Choisir deux sorties
> et un point de rassemblement qu'on voit bien, à l'abri du vent, et compter les personnes une fois dehors. À cet âge,
> l'enfant retient le chemin qu'il a fait, pas ce qu'on lui a expliqué.

**ch. 26, l. 104** (étape 9)

> - Ne jamais le desserrer pour voir : chaque desserrage rouvre l'artère, et la personne perd encore du sang alors
> qu'il lui en manque déjà. On a abandonné le desserrage à heures fixes parce qu'il vidait les blessés petit à petit.

Réécriture :

> - Ne jamais desserrer le garrot pour voir, parce que chaque desserrage rouvre l'artère et fait perdre du sang à une
> personne qui en manque.

**ch. 39, l. 81** (étape 2)

> 2. **Poser les avertisseurs.** Un avertisseur de monoxyde de carbone dans la pièce où se trouve l'appareil à
> combustion, et un autre près des chambres. Modèles à piles dans les deux bâtiments : à la maison, l'électricité tombe
> exactement quand la génératrice se met à tourner ; au chalet, elle n'a jamais été là. […] Le bouton-test dit que la
> pile, le circuit et la sirène fonctionnent ; il ne dit pas que la cellule voit encore la fumée ou le gaz.

Réécriture :

> 2. **Poser un avertisseur de monoxyde de carbone à piles dans la pièce du poêle, et un autre près des chambres, dans
> les deux bâtiments.** À piles, ils marchent pendant une panne, au moment où on fait tourner la génératrice, et au
> chalet, qui n'a pas le courant. Appuyer sur le bouton-test une fois par mois, et changer les piles à date fixe. Le
> test vérifie la pile, le circuit et la sirène, mais pas le capteur. Il faut donc remplacer l'avertisseur qui a passé
> des années au-dessus d'un poêle à bois, même s'il sonne au test.

[Les avertisseurs de fumée sont au Matériel ; l'étape ne dit pas où les poser.]

**ch. 25, l. 76** (étape 4)

> 4. **Décider tout de suite de l'évacuation** (ch. 2 et 14). Pour une gelure, la question exacte est : les soins
> définitifs sont-ils à plus de deux heures ? Depuis la maison, la réponse est normalement non — on appelle, on protège
> le membre tel quel, on transporte, on ne dégèle rien. Depuis le chalet, elle est normalement oui, et c'est là que
> l'étape 18 devient une vraie décision plutôt qu'une formalité.

Réécriture (« on appelle » sort : CLAUDE.md, aucun service qui répond) :

> 4. **Décider tout de suite si on part vers l'hôpital** (ch. 2 et 14). Pour une gelure, il faut savoir si l'hôpital
> est à plus de deux heures. Depuis la maison, il est en général plus près, alors protéger le membre tel quel et partir
> sans rien dégeler. Depuis le chalet, il est en général plus loin, et on décide à l'étape 18 s'il faut dégeler.

### Motif 8. Le chiffre au mauvais endroit, ou absent là où le geste en a besoin (gravité moyenne)

Trois formes. Le chiffre n'est dans aucune étape : il vit dans le tableau, parfois aussi dans le danger ou la variante
(au ch. 39, les températures de cuisson du gibier à plumes et du poisson, les doses de solution de réhydratation : il
n'y a pas d'étape pour la gastro ni pour la cuisson). Le chiffre est dans l'étape, mais on ne peut pas s'en servir à ce moment-là (une vitesse de
réchauffement en °C par heure sans le thermomètre qui la lit ; des temps de gel de la peau sous -28 °C dans une étape
qui garde les enfants dedans dès -27 °C ; la dose d'un auto-injecteur, choisie à l'achat, lue dans la série « 2 min »).
Ou le geste demande un chiffre et n'en a pas (« à heures fixes », « sorties écourtées », « le temps qu'elle prenne la
chaleur »).

Fréquence : ch. 39, 5 chiffres qui ne sont dans aucune étape (82 °C et 180 à 250 mL par heure ne sont que dans le
tableau ; 70 °C, 5 à 15 mL et les épaisseurs de glace sont dans le tableau et dans la section 8 ou 9) ; 3 étapes avec un chiffre qu'on ne peut pas lire au moment du geste (ch. 25 ét. 12, ch. 39
ét. 15, ch. 26 ét. 13) ; 3 gestes sans leur chiffre (ch. 26 ét. 35, ch. 39 ét. 15 et l. 394).

Cause : skill `ecriture`, règle 5 (« Le chiffre avec son unité ») ; CLAUDE.md, à propos du chapitre d'achat coupé
(« chaque chapitre dit […] le chiffre dont elle a besoin (une quantité, une réserve), dans l'étape qui s'en sert ») ;
le tableau du 15 octobre (« Un chiffre reste s'il change ce que cette famille-là fait »). Et une phrase du skill qui pousse
dans l'autre sens : « Les tableaux des sections 6 et 7 redonnent les cibles chiffrées, c'est leur travail » ; au ch. 39,
le tableau ne les redonne pas, il les donne.

**ch. 39, l. 192** (Points de contrôle ; aucune étape ne dit ces chiffres)

> | Chaque repas de gibier | Thermomètre au cœur de la pièce, loin de l'os et du gras | **74 °C** pour le gibier, y
> compris haché ; 82 °C pour le gibier à plumes entier ; 70 °C pour le poisson | Remettre au feu. Ne pas servir «rosé »
> à un enfant |

Réécriture (une étape de la section C) :

> **Cuire la viande des enfants au thermomètre.** Le planter au cœur de la pièce, loin de l'os et du gras, et attendre
> qu'il lise 74 °C pour le gibier, même haché, 82 °C pour un oiseau sauvage entier et 70 °C pour le poisson. Ne jamais
> servir de gibier rosé à un enfant.

**ch. 39, l. 194** (Points de contrôle ; aucune étape sur la gastro)

> | Pendant une gastro, au début | Solution de réhydratation orale donnée | Débuter à 5 à 15 mL à la fois, à la cuillère
> ou à la seringue | Vomissements qui empêchent de garder même 5 mL : section 7 |

Réécriture (une étape de la section C) :

> **Pendant une gastro, faire boire la solution de réhydratation à la cuillère ou à la seringue, 5 à 15 mL à la fois.**
> Quand elle passe, viser 180 à 250 mL par heure pour un enfant de plus de 2 ans (recette sans sachet : section 9).

**ch. 39, l. 159** (étape 15)

> 15. **Décider de la sortie avant d'ouvrir la porte.** Seuils du livre, plus stricts que ceux des adultes : à -15 °C ou
> moins, sorties écourtées ; à -27 °C ou moins, refroidissement éolien compris, les enfants ne sortent pas. Pour juger
> de l'exposition : entre -28 et -39, la peau exposée peut geler en 10 à 30 minutes ; entre -40 et -47, en 5 à
> 10 minutes ; entre -48 et -54, en 2 à 5 minutes ; à -55 et moins, en moins de 2 minutes.

Réécriture (les temps de gel, sous -28, ne servent à rien dans une étape qui garde les enfants dedans dès -27 ; ils sont
au tableau du ch. 25) :

> 15. **Avant d'ouvrir la porte, décider si les enfants sortent, d'après la température avec le refroidissement
> éolien.** À -15 °C ou moins, raccourcir les sorties [de combien : chiffre à chercher, sinon [À VÉRIFIER]]. À -27 °C ou
> moins, les garder à l'intérieur.

**ch. 25, l. 107** (étape 12)

> 12. **Attendre.** Le rythme sécuritaire est de 1 à 2 °C par heure. Une personne qui ne remonte pas en dix minutes
> n'est pas un échec du traitement.

Réécriture [le chiffre ne se lit qu'au thermomètre à lecture basse, que le Matériel ne nomme pas ; sinon, la conscience
et le frisson, comme dit le tableau] :

> 12. **Attendre, sans chercher à aller plus vite.** Le corps se réchauffe de 1 à 2 °C par heure, donc il faut quelques
> heures. Si la personne ne va pas mieux au bout de dix minutes, continuer pareil.

**ch. 26, l. 137** (étape 13, série « 2 min »)

> L'EpiPen existe en deux doses, 0,15 mg et 0,3 mg, choisies selon le poids de la personne.

Réécriture (dans « Avant, une fois », étape 45) :

> Vérifier que chaque personne qui a besoin d'un auto-injecteur a celui de sa dose, 0,15 mg ou 0,3 mg selon son
> poids.

**ch. 26, l. 233** (étape 35)

> 35. **Après un coup à la tête, réveiller la personne et lui poser les mêmes questions à heures fixes.**

Réécriture :

> 35. **Après un coup à la tête, réveiller la personne toutes les [intervalle : à chercher à la source, sinon
> [À VÉRIFIER]] et lui poser les mêmes questions.**

### Motif 9. Les tableaux trop longs, qui redisent les étapes, avec une colonne Action sans action (gravité moyenne)

Les six tableaux du lot ont 9 à 14 lignes ; la règle en permet 8. La plupart des lignes redisent une étape (au ch. 26,
les 14 lignes des Points de contrôle). La colonne « Si c'est hors cible » ou « Action » ne dit pas toujours quoi faire :
« Recompter », « il ne fallait pas dégeler », « Drainage sélectif possible », « Urgence médicale », « Soins médicaux
immédiats ». Et une colonne Diagnostic tient une maxime (« Un avertisseur de CO ne sonne pas pour rien »).

Fréquence : 68 lignes pour 48 permises (ch. 25 : 9 et 11 ; ch. 26 : 14 et 12 ; ch. 39 : 11 et 11) ; une vingtaine de
lignes qui redisent une étape ; 7 cases d'action sans geste.

Cause : CLAUDE.md (« Les points de contrôle et les signes d'échec : 5 à 8 lignes chacun, au plus […] Seulement ce qui
change une décision ou ce qu'on ne verrait pas venir ; rien qui redise une étape ou la page du danger ») ; gabarit,
sections 6 et 7 ; skill `editeur` (« Pas de ligne qui redit une étape mot pour mot »). En sens contraire, le skill
`ecriture` dit encore « Les tableaux des sections 6 et 7 redonnent les cibles chiffrées, c'est leur travail » : un
rédacteur qui suit cette phrase remplit le tableau avec les étapes. Les tableaux du ch. 26 n'ont pas été condensés
quand le chapitre a été refait.

**ch. 26, l. 302** (Points de contrôle)

> | Brûlure | La durée sous l'eau fraîche | Au moins 20 minutes | Recompter |

Réécriture : *(ligne coupée : elle redit l'étape 17, et « Recompter » ne dit pas quoi faire.)*

**ch. 25, l. 292** (Points de contrôle)

> | Après le bain | Risque de regel d'ici les soins | Zéro | Si le regel est possible, il ne fallait pas dégeler ;
> garder au chaud coûte que coûte |

Réécriture :

> | Après le dégel | Le membre peut-il geler de nouveau avant l'arrivée ? | Non | S'il le peut, le garder au chaud sans
> arrêt jusqu'à l'arrivée |

**ch. 25, l. 303** (Signes d'échec)

> | Ampoules claires après dégel | Atteinte superficielle | Drainage sélectif possible |

Réécriture : *(ligne coupée : une ampoule claire n'est pas un échec, et l'étape 22 dit quoi en faire.)*

**ch. 39, l. 215** (Signes d'échec)

> | L'enfant pleure sans larmes, les yeux semblent enfoncés | Déshydratation modérée à sévère | Urgence médicale. SRO en
> attendant, 5 à 15 mL aux 5 à 15 minutes. Décision d'évacuer : ch. 2 |

Réécriture :

> | L'enfant pleure sans larmes, les yeux enfoncés | Il manque beaucoup d'eau, et sa vie peut être en jeu | Lui donner la
> solution de réhydratation, 5 à 15 mL toutes les 5 à 15 minutes, et partir (ch. 2) |

**ch. 39, l. 222** (Signes d'échec)

> | Un avertisseur de CO qui sonne, même «probablement pour rien » | Un avertisseur de CO ne sonne pas pour rien |
> Sortir. Aérer. Ne pas rentrer avant que la source soit trouvée et arrêtée |

Réécriture :

> | L'avertisseur de CO sonne, même si on pense que c'est pour rien | Du monoxyde dans la pièce, jusqu'à preuve du
> contraire | Sortir tout le monde, aérer, et ne pas rentrer avant d'avoir trouvé et arrêté ce qui le produit |

**ch. 26, l. 307** (Points de contrôle)

> | Personne surveillée | La réponse, la respiration, la peau, le pouls et l'urine, écrits sur la feuille | Sans la
> quitter des yeux tant que c'est grave ou que ça change ; une ligne à chaque changement | Si ça empire : revenir à la
> surveillance continue |

Réécriture : *(ligne coupée : elle redit les étapes 31 et 32.)*

### Motif 10. Les lignes de Matériel et les titres de « Quand l'utiliser » (gravité basse)

Le Matériel des ch. 25 et 39 garde l'ancienne forme : un tiret après le nom, une suite de noms au lieu d'une phrase,
le substitut et le renvoi « → §9 », et parfois un geste de la procédure (« le sauveteur tend depuis le bord, couché »).
Le Matériel du ch. 25 ne nomme pas ce dont la procédure a besoin : le thermomètre du bain (étape 19), le thermomètre à
lecture basse et l'ibuprofène, que la section 9 déclare pourtant irremplaçables. « Quand l'utiliser », aux ch. 25 et 39,
est fait de phrases qui décrivent ou qui justifient, avec une liste « C'est le mauvais chapitre quand » où dorment deux
vraies consignes (le stress au froid, la gelure à moins de deux heures).

Fréquence : ch. 25, 6 lignes de Matériel sur 6 avec tiret, 2 « → §9 », 3 objets de la procédure absents ; ch. 39, 6 sur
6 avec tiret, 4 « → §9 » ; « Quand l'utiliser » : ch. 25, 6 phrases et 4 contre-exemples ; ch. 39, 4 phrases et 1
contre-exemple. Le ch. 26 est au format (5 lignes de Matériel, 8 titres de situation).

Cause : CLAUDE.md (« Le Matériel ne liste que l'indispensable de cette procédure […], une ligne par item, 15 à 20 mots » ;
« "Quand l'utiliser", c'est juste quand l'utiliser : pas de liste "c'est la mauvaise procédure quand" ») ; skill
`ecriture`, règle 13 (le titre de situation) et « Le tiret » (« Ça vaut aussi pour les lignes de matériel ») ; cadre
(« "section N", jamais "§" »). `gabarit-chapitre.md` garde lui-même l'ancienne forme (« Seulement l'indispensable — ce
sans quoi… », « sinon "(→ section 9)" », « Neuf points ») : un rédacteur qui copie le gabarit copie le défaut.

**ch. 25, l. 52**

> - **Perche de 4 m ou corde** — le sauveteur tend depuis le bord, couché ; il ne marche jamais jusqu'au trou.

Réécriture :

> - **Perche de 4 m ou corde** : pour tendre à la personne tombée à l'eau sans s'approcher du trou (étape 26).

**ch. 39, l. 61**

> - **Pèse-personne** — médicament, ration, réhydratation : tout se dose au poids de l'enfant (→ §9 : balance à perche).

Réécriture :

> - **Pèse-personne** : on calcule au poids de l'enfant les doses de médicament, la ration et la solution de
> réhydratation (sans pèse-personne : section 9).

**ch. 25, l. 466** (section 9, « Ce qui ne se remplace pas » ; aucun de ces objets n'est au Matériel, l. 47 à 52)

> Le thermomètre à lecture basse : il n'existe aucune façon de mesurer une température centrale sans lui. L'ibuprofène :
> l'acétaminophène soulage la douleur sans rien faire au tissu.

Réécriture (trois lignes de Matériel) :

> - **Thermomètre** : garde le bain de gelure entre 37 et 39 °C (étape 19 ; sans thermomètre : section 9).
> - **Thermomètre à lecture basse** : seul moyen de mesurer la température du corps et de suivre le réchauffement
> (étape 12).
> - **Ibuprofène** : après le dégel, il agit sur le tissu gelé, pas seulement sur la douleur (étape 21).

**ch. 25, l. 18**

> - quelqu'un rentre de dehors et frissonne fort, parle pâteux, échappe ce qu'il prend, répond à côté de la question ;

Réécriture :

> - Quelqu'un rentre du froid, frissonne fort, parle pâteux, échappe ce qu'il tient ou répond à côté.

**ch. 25, l. 35** (dans « C'est le mauvais chapitre quand »)

> - la personne frissonne mais fonctionne bien et prend soin d'elle-même : c'est du **stress au froid**, pas de
> l'hypothermie. La déshabiller, l'étendre et l'immobiliser lui fait perdre de la chaleur pour rien. On la met au
> chaud, on la nourrit, on la surveille ;

Réécriture (la liste « mauvais chapitre » sort ; cette consigne va à l'étape 3, où l'on classe) :

> Si la personne frissonne mais agit bien et prend soin d'elle-même, c'est du stress au froid, pas de l'hypothermie. La
> mettre au chaud, la faire manger et la surveiller, sans la déshabiller, la coucher ni l'immobiliser, parce qu'elle
> perdrait de la chaleur pour rien.

**ch. 39, l. 25**

> - l'épisode dépasse 72 heures. En deçà, l'improvisation passe ; au-delà, la routine cesse d'être une question de
> confort et devient une question de sécurité (ch. 36, ch. 40) ;

Réécriture :

> - Une panne ou une crise qui dure plus de 72 heures.

## 3. Ce qui marche, à garder comme modèles

**ch. 26, l. 82** (étape 6, série « 5 min »)

> 6. **Appuyer avec la paume, directement sur la plaie, et ne pas relâcher pour regarder** (planche 26-40, repères 1 et
> 2). Une personne peut mourir d'une grosse perte de sang en moins de 5 minutes. Chaque fois qu'on soulève la main pour
> regarder, on défait le caillot qui commençait à se former. Appuyer de tout son poids, les bras tendus, pendant au
> moins 5 minutes pleines à la montre avant de regarder : sous le stress, on compte trop vite. Si ça saigne encore,
> reprendre l'appui et recompter.

Pourquoi : le titre est le geste, avec la faute à ne pas faire (« ne pas relâcher pour regarder ») ; chaque phrase
suivante est soit le geste précisé (de tout son poids, les bras tendus), soit la raison qui change la façon de faire
(le caillot qu'on défait, le compte trop rapide) ; le chiffre est là où on s'en sert, avec l'instrument (« 5 minutes
pleines à la montre ») ; la suite si ça ne marche pas vient en dernier ; la planche est appelée avec ses repères.

**ch. 26, l. 205** (étape 29)

> 29. **Tracer au crayon feutre le bord de la rougeur autour de la plaie, et écrire l'heure à côté.** Le lendemain, on
> regarde si la rougeur a dépassé le trait, sans avoir à se demander si elle a l'air plus rouge.

Pourquoi : un geste qu'on fait avec ce qu'on a, qui remplace un jugement par un repère qu'on voit ; le pourquoi tient en
une demi-phrase et dit ce que le geste permet le lendemain. L'étape suivante (30) dit quoi faire si le trait est
dépassé : la décision suit le repère.

**ch. 25, l. 208** (étape 32)

> 32. **Ne pas leur demander s'ils ont froid : les vérifier.** Un enfant absorbé par son jeu ne demande pas à rentrer,
> et un enfant qui refroidit devient tranquille. Toucher les joues, les oreilles, les doigts, et regarder s'il joue
> encore.

Pourquoi : le titre retourne le réflexe du parent et donne le geste en deux mots ; la raison est un fait qu'un parent
compétent ne devinerait pas (l'enfant qui refroidit devient tranquille) ; la dernière phrase dit où toucher et quoi
regarder. Trois phrases, trois rôles, aucune redite.

**ch. 39, l. 462** (« La sortie », section 9)

> **La sortie.** Sortir par où on est entré : c'est le seul endroit où la glace a déjà porté. Planter les pics, battre
> des jambes jusqu'à se mettre à l'horizontale et se tirer en glissant sur le ventre, pas en se hissant à la verticale.
> Une fois sorti, rouler sur soi-même pour s'éloigner, et ne pas se relever avant plusieurs longueurs de corps.

Pourquoi : les gestes dans l'ordre des mains et du corps (planter, battre des jambes, se tirer, rouler, ne pas se
relever), chacun avec son verbe ; l'erreur à éviter dite à l'endroit exact où on la ferait (« pas en se hissant ») ; un
repère qu'on mesure avec son corps (« plusieurs longueurs de corps »). C'est meilleur que l'étape 25 du ch. 25 sur le
même geste, et c'est ce texte-là qui devrait vivre au ch. 15.

**ch. 39, l. 339** (« Vérifier le tirage sans instrument », section 9)

> **Vérifier le tirage sans instrument.** Porte du poêle fermée, approcher de l'entrée d'air une allumette qui fume ou
> un bout d'écorce de bouleau soufflé. La fumée doit être aspirée vers l'intérieur, franchement. Si elle hésite,
> s'étale ou revient dans la pièce, le conduit ne tire pas.

Pourquoi : le geste avec l'objet qu'on a sous la main, puis ce qu'on voit quand c'est correct, puis ce qu'on voit quand
ça ne l'est pas : la forme exacte d'un point de contrôle, mais dans l'étape. Il lui manque une phrase : quoi faire
quand le conduit ne tire pas (le renvoi à la vérification de la cheminée, quelques lignes plus haut).

Deux autres, en passant : au ch. 26, chaque titre de « Quand l'utiliser » donne ses étapes (l. 20 : « **Un saignement
qui gicle ou qui coule à flot** (étapes 6 à 11). ») ; et la ligne de Matériel de la montre (l. 37) dit en une phrase les
trois gestes qui s'en servent (« sert à compter le pouls, à chronométrer les 5 minutes d'appui et à noter l'heure du
garrot »).

## 4. Ce que ça demande au skill (pour la réécriture)

Les règles existent presque toutes ; ce qui manque, c'est une règle de la consigne qui les tienne ensemble, et un
auditeur qui les compte. Proposition, pour le regard « consigne » :

1. **L'ordre du chapitre suit l'horloge.** Ce qui sauve dans les premières minutes ouvre la procédure, en orange, même
   quand le geste se fait « sans » quelque chose. Une procédure urgente ne vit jamais dans la variante d'urgence ;
   la variante dit seulement ce qui change quand l'objet manque. Retirer de `gabarit-chapitre.md` la phrase qui envoie
   tout geste « sans X » en section 9, et remettre le gabarit aux sept sections (il dit encore « Neuf points » et garde
   « Pourquoi ça marche »).
2. **La décision avant les gestes.** Une étape qui décide (partir, dégeler, improviser) commence par la condition et la
   décision ; les gestes suivent.
3. **Un geste par ligne.** À partir de trois gestes, des sous-étapes, dans l'ordre des mains, chacune avec son repère de
   planche. Une liste après deux-points, dans une phrase, a trois membres au plus, et chaque membre a son verbe. Préciser
   dans CLAUDE.md que « tout est dans l'orange, sans limite de longueur » ne veut pas dire « tout dans une étape » : ce
   qui se décide plus tard que la pastille sort de la série.
4. **Le titre gras d'une étape est un infinitif**, ou « Si…, » suivi d'un infinitif. Jamais un constat, une étiquette
   ni une maxime.
5. **La condition d'abord**, et l'exception qui change le premier geste vient avant lui.
6. **Le chiffre dans l'étape où on s'en sert, au moment où on peut le lire**, avec l'instrument du Matériel. Un tableau
   n'apporte aucun chiffre que la procédure n'a pas. Retirer du skill `ecriture` la phrase « Les tableaux des sections
   6 et 7 redonnent les cibles chiffrées, c'est leur travail », qui contredit la règle des 5 à 8 lignes.
7. **Un geste, une place**, dans le chapitre et dans le livre. Avant d'écrire un geste, chercher (grep) s'il est déjà
   dans un autre chapitre ; si oui, un renvoi.
8. **Le pourquoi tient en une proposition**, après le geste, introduite par « : », « parce que » ou « pour que », et
   seulement s'il change la façon de faire. Jamais une statistique, une scène, une histoire ou une maxime en bout
   d'étape. Et les mots de liaison (« pour », « puis », « sinon », « parce que ») relient les phrases d'une étape :
   0,7 pour 1000 mots, c'est une liste de constats, pas une consigne.
9. **La colonne Action d'un tableau commence par un verbe** ; une ligne qui redit une étape sort.
10. **Toute chose que la procédure ou « Ce qui ne se remplace pas » nomme est au Matériel.**

Ce que l'auditeur peut compter par script (la plupart des mesures de la section 1 l'ont été avec un script de
travail) : la part de titres d'étape qui ne sont pas des infinitifs ; les étapes de plus de 120 mots ; les listes après
deux-points de quatre membres et plus sans verbe ; le « si » qui suit l'infinitif de tête ; les pronominaux de consigne
(« se traite », « se porte », « se jette »…) ; les tableaux de plus de 8 lignes ; les chiffres des tableaux absents des
étapes ; les intertitres de section 7 qui contiennent une urgence (« quand quelqu'un passe au travers », « a avalé »).
Ce qu'il ne peut pas compter, et qu'un lecteur doit faire : jouer la scène, étape par étape, les mains occupées, et
noter l'endroit où il a dû revenir en arrière.

**Les réécritures de ce fichier, passées au même script.** Première version : 40 % de phrases à deux-points et 30 % en
« fait : conséquence », plus que le texte cité (31 % et 21 %). En réglant la consigne, l'auditeur a refait le tic du
livre. Après une deuxième passe (« parce que », « donc », « alors », « comme », ou un point à la place du deux-points) :

| texte | mots | m/phr | ≤6 % | ≥30 % | « : » % | fait:csq % | liais./1000 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| les 60 citations du livre (section 2) | 2332 | 19,8 | 13,6 | 17,8 | 31,4 | 21,2 | 4,3 |
| les 60 réécritures, deuxième passe | 2815 | 19,7 | 7,0 | 16,1 | 16,1 | 10,5 | 12,1 |

Les deux-points restants ouvrent une liste ou la ligne de Matériel (« **Nom** : ce qu'il fait », la forme demandée).
Les phrases courtes ont baissé (7 % contre 13,6 %) : une étape où chaque phrase porte un geste et sa raison se lit en
phrases moyennes, et il faudra garder des phrases courtes pour le geste seul. La leçon pour le skill : **la mesure du
tempo tourne aussi sur la réécriture**, pas seulement sur le texte d'origine ; sinon chaque passe remet le tic.

## 5. Hors de mon regard, vu en passant

Pour les autres auditeurs et le vérificateur technique ; rien de ceci n'entre dans les motifs.

- « village » : ch. 25, l. 5 et 217 (mot banni : « la ville »).
- Un service qui répond : ch. 25, l. 78 (« on appelle ») ; ch. 39, l. 213 (« Soins médicaux immédiats ») et l. 215
  (« Urgence médicale »).
- Une citation de source, au vouvoiement : ch. 39, l. 355 (« Vous devez utiliser les quantités exactes indiquées… »).
- Une marque et un nom de cours : ch. 26, l. 137 (« L'EpiPen ») et l. 272 (« Héros en trente »).
- L'âge des enfants de JP : le nom du fichier 39, ch. 25 l. 26 et l. 202 (« Les enfants de 4 et 6 ans »), ch. 39
  l. 119, l. 141 (« des deux enfants »), l. 480. Les âges de l'étape 14 du ch. 39 changent le geste et restent.
- Les planches 25-01 et 25-40 sont ancrées dans `placements-tome-2.json` et ne sont appelées nulle part dans le ch. 25.
- « fait la job » (ch. 25, l. 100) ; « afterdrop » (ch. 25, l. 112), « convection » (l. 59), « pouls carotidien »
  (l. 113), « clinique » (l. 63), « stratifié » (ch. 39, l. 126), « protocole » (ch. 39, l. 100) : mots de livre.
- Les deux recettes de solution de réhydratation sans jus (ch. 26 l. 443, ch. 39 l. 363) : au vérificateur technique.
- Les ch. 25 et 39 gardent « Pourquoi ça marche », la section Danger, 49 et 42 tirets, et une note de lieu sous le
  titre (ch. 25 l. 5, ch. 39 l. 5).

## 6. Liste de contrôle (cadre, parties « Le texte » et « La langue »)

Voir la liste rendue avec le rapport ; elle est recopiée ici telle quelle.

- [x] Un agent par sujet : un regard, trois chapitres.
- [x] Lire seulement ce que la tâche touche : les trois chapitres au complet (demandé), le skill `ecriture` et le
  gabarit ; le skill `editeur` et `plan/decisions-jp.md` par recherche et par plages.
- [x] Sorties de commande coupées.
- [x] Rien commité ; aucun fichier du livre modifié.
- [x] Sept sections : relevé (ch. 25 et 39 en ont encore neuf), hors regard, section 5.
- [x] Rien sous le titre que la ligne de lieu : relevé (ch. 25 l. 5, ch. 39 l. 5), section 5.
- [x] Section 2, seulement quand l'utiliser : motif 10.
- [ ] Le chapitre couvre l'année : pas jugé, hors regard.
- [x] La série orange joue la scène réelle, d'abord ce qui sauve : motif 1.
- [ ] La pastille dit le temps qu'on a, sourcé : pas vérifié à la source (vérificateur technique).
- [x] L'encadré orange est la version détaillée : jugé (ch. 26) ; les logigrammes ne sont pas dans le lot.
- [ ] Logigramme, En plus, ordre du début du tome, page de droite : hors regard.
- [x] Règle 0 : chaque réécriture lue à voix haute.
- [x] Pas de loi en formule, jamais « d'où » : aucun « d'où » dans les réécritures.
- [x] Pas de « X passe là où Y ne passe pas » : aucun cas dans le lot.
- [x] Pas de maxime, de chute, d'opposition fabriquée, de petite scène : motifs 3 et 7 ; aucune dans les réécritures.
- [x] Pas de chose qui pense ou qui parle : relevé (« le bouton-test dit », « la cellule voit », « la corde parle »,
  « une mitaine ne lit ») ; réécrit au motif 7.
- [x] La consigne jamais au pronominal ; la consigne dite comme une consigne : motif 6 ; réécritures à l'infinitif.
- [x] Points de contrôle et signes d'échec, 5 à 8 lignes : motif 9 (68 lignes pour 48).
- [ ] Pages des dangers : pas dans le lot.
- [x] Un passage lourd se juge d'abord (doit-il exister ?) : appliqué (ch. 39 étape 12, lignes de tableau coupées).
- [ ] La passe d'éditeur : pas mon rôle.
- [x] Le chapitre parle de son sujet : motif 4 (pics, cendres, eau, réhydratation).
- [x] Une notion s'explique dès sa première apparition : « les trois horloges de l'eau froide » et « afterdrop »
  relevés.
- [x] « Quand l'utiliser » en titres de situation : motif 10.
- [x] Pas de « on est tenté de » : relevé, ch. 26 étape 36 (motif 7).
- [x] Le mot qu'on dit : relevé en passant ; réécritures au mot parlé (« mal au cœur », « envie de dormir », « n'a plus
  toute sa tête »).
- [x] Mots de tous les jours, pas de mot de métier sans besoin : section 5.
- [x] Aucun tiret, « section N » jamais « § » : relevé ; aucune réécriture n'a de tiret ni de « § ».
- [x] Les titres sont des gestes ou des choses, pas des maximes : motif 3.
- [x] Les tournures relevées par JP (« X ne fait pas Y : il fait Z ») : relevé (« Ce n'est pas le froid qui tue […],
  c'est la noyade », « un enfant de 4 ans n'entend pas la phrase, il entend la voix »).
- [x] Une étape à plusieurs gestes se découpe en sous-étapes, avec ses repères : motif 2.
- [x] L'urgence ne s'appuie pas sur une préparation qui n'a peut-être pas eu lieu : relevé (les pics « fabriqués
  d'avance » rangés dans la variante ; la solution qui « se prépare une fois pour toutes avant la crise », ch. 39 l. 360).
- [x] Un fait garde une seule place : motif 4, limité à la consigne.
- [x] Chaque planche est appelée : relevé (25-01 et 25-40 jamais appelées).
- [ ] `controle.py` : pas lancé, aucun chapitre modifié ; les réécritures ont été vérifiées sans tiret.
- [ ] Le correcteur (`langue.py`, LanguageTool) : pas lancé, rien d'imprimé n'est produit ; les réécritures passeront
  par le skill `langue` quand elles seront appliquées.
- [x] Le français écrit correct, ni joual ni anglicisme : réécritures relues (« après qu'on a vidé », indicatif) ;
  « fait la job » et « afterdrop » relevés.
- [x] Pas deux « ou » l'un dans l'autre : vérifié dans les réécritures.
