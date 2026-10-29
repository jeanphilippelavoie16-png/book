# Audit de l'écriture : le tempo, lot C (tome 2, ch. 25, 26 et 39)

28 octobre 2026. Un seul regard : le tempo, le texte lu à voix haute comme on l'expliquerait à quelqu'un dans un
garage. Lot, lu au complet : `chapitres/25-le-froid-lui-meme.md`, `chapitres/26-soigner-quand-il-n-y-a.md`,
`chapitres/39-des-enfants-de-4-et-6-ans.md`. Aucun fichier du livre n'a été modifié. Les réécritures ci-dessous sont
des exemples, sans fait ni chiffre neuf ; elles ont passé `controle.py` (0 tiret, 0 mot de livre) et `langue.py` avec
LanguageTool (2 avis, « VFI » et « bécosse », faux positifs).

Les citations reprennent les mots du livre exactement ; les retours à la ligne et les `**` du markdown sont enlevés, et
« […] » marque une coupe. Le numéro de ligne est celui de la première ligne citée.

**Ce que le lot permet de comparer.** Le ch. 26 a été refait avec les règles actuelles (sept sections, passe
d'écriture et d'éditeur). Les ch. 25 et 39 ne l'ont pas été : ils ont encore neuf sections, une section Danger, des
tirets, des « § » et « village ». Le lot montre donc deux choses : les habitudes d'avant, et ce que les règles
d'aujourd'hui produisent quand on les applique.

## 1. Les mesures

`python3 .claude/skills/ecriture/scripts/tempo.py … --par-fichier`, puis la même mesure sur les textes de
`plan/audit-ecriture/references/`.

| texte | mots | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 25 (pas refait) | 4805 | 19,8 | 0,79 | 12,8 | 16,5 | 18,6 | 36,2 | 23,5 | 7,7 | 5,2 | 6,0 |
| ch. 26 (refait) | 5903 | 21,5 | 0,54 | 3,6 | 16,7 | 32,1 | 29,5 | 22,9 | 5,1 | 12,2 | 4,6 |
| ch. 39 (pas refait) | 5593 | 17,9 | 0,63 | 16,0 | 16,0 | 19,9 | 27,2 | 19,6 | 5,9 | 3,8 | 3,2 |
| **le lot** | 16301 | 19,6 | 0,66 | 11,0 | 16,4 | 23,5 | 30,6 | 21,8 | 6,1 | 7,2 | 4,5 |
| fiches de l'Alberta | 2011 | 17,5 | 0,48 | 3,5 | 9,6 | 33,3 | 2,6 | 0,0 | 1,5 | 0,5 | 2,0 |
| Ripley 1946 | 2596 | 25,2 | 0,40 | 4,9 | 33,0 | 31,4 | 1,0 | 1,0 | 0,0 | 0,4 | 3,1 |
| Hémon | 2723 | 19,9 | 0,78 | 21,2 | 21,9 | 24,3 | 8,8 | 4,4 | 11,0 | 0,0 | 14,7 |
| **les sept références** | 17297 | 21,4 | 0,66 | 13,0 | 23,7 | 27,4 | 6,3 | 3,1 | 5,5 | 2,4 | 9,2 |

Mesures ajoutées pour cet audit (scripts de travail dans le dossier temporaire ; une étape numérotée compte comme un
paragraphe ; « lien parlé » : parce que, car, donc, alors, puis, ensuite, mais, sinon, pour que, d'abord, comme) :

| | ch. 25 | ch. 26 | ch. 39 | Alberta | Ripley | Hémon |
| --- | --- | --- | --- | --- | --- | --- |
| Phrases coupées en deux (deux-points, point-virgule, « , et », tiret) | 59 % | 48 % | 52 % | 8 % | 8 % | 53 % |
| Paragraphes de 3 phrases et plus | 47 | 52 | 60 | 6 | 19 | 20 |
| … sans aucun lien parlé | 31 (66 %) | 34 (65 %) | 50 (83 %) | 100 % | 63 % | 25 % |
| Paragraphes avec 2 phrases « fait : conséquence » ou plus | 13 | 17 | 9 | 0 | 0 | 0 |
| Phrases « , et » + nouveau sujet | 25 | 30 | 34 | | | |
| Phrases de 38 mots et plus (une puce comptée à part) | 16 | 22 | 18 | | | |
| Phrases avec deux deux-points | 2 | 3 | 2 | | | |
| Parenthèses au milieu d'une phrase (pas à la fin) | 8 | 15 | 10 | | | |
| Phrases de 1 à 8 mots | 20,6 % | 5,8 % | 22,4 % | 11,3 % | 8,7 % | 27,7 % |
| Phrases de 14 à 26 mots | 37,0 % | 52,7 % | 40,4 % | 47,8 % | 47,6 % | 30,7 % |

### Ce que les chiffres disent

1. **La longueur des phrases n'est pas en cause.** Le lot fait 19,6 mots par phrase, les références 21,4 ; Ripley,
   qu'on lit sans peine, en fait 25,2 avec un tiers de phrases de 30 mots et plus.
2. **La forme de la phrase l'est.** Une phrase sur deux du lot est coupée en deux moitiés (un fait, un signe, un
   autre fait), contre une sur douze dans les textes techniques de référence (Alberta, Ripley). Hémon coupe autant que
   nous, mais il relie ses moitiés par des mots (14,7 liens parlés pour 1000 mots, trois fois le lot). Nous les
   relions par la ponctuation, qui ne s'entend pas à voix haute.
3. **Le paragraphe sans lien n'est pas le défaut à lui seul.** Ripley a 63 % de paragraphes sans lien parlé et il se
   lit bien, parce que ses phrases suivent l'ordre du travail : l'ordre du geste tient lieu de lien. Ce qui casse, c'est
   le paragraphe sans lien **et** fait de mécanismes fermés, chacun en « fait : conséquence » : 39 paragraphes du lot,
   aucun dans les sept références.
4. **Le ch. 39 relie le moins** : 3,2 liens parlés pour 1000 mots, parmi les six plus bas du livre (le livre : 5,4 ;
   les références : 9,2), et 83 % de paragraphes sans lien.
5. **Le ch. 26, le chapitre refait, a le tempo le plus égal du livre.** Sa monotonie (32,1 %) est la plus haute des
   112 chapitres et des deux parties des dangers ; ses phrases de 6 mots et moins (3,6 %), les plus rares. Plus d'une
   phrase sur deux y fait de 14 à 26 mots. Les fiches de l'Alberta sont aussi égales (33,3 %), mais leurs phrases sont
   simples (8 % de phrases coupées) ; celles du ch. 26 sont de taille égale **et** bâties en deux moitiés de la même
   façon (consigne, deux-points, raison), d'où une seule mélodie répétée. La passe a enlevé les formules et les
   étiquettes ; elle n'a rien mis à la place qui donne le temps fort.
6. **Les phrases courtes des ch. 25 et 39 sont presque toutes de la mauvaise sorte.** Sur 50 phrases de 8 mots et
   moins au ch. 25 et 70 au ch. 39, la plupart sont des titres en gras, des étiquettes (« Quatre cases : »), des
   renvois (« Voir ch. 22. »), des fragments sans verbe (« Bottes, mitaines, bas, pantalon. ») ou des annonces
   (« Deux pièges. », « Trois règles, et elles ne changent pas. », « Quatre gestes, puis une décision. »). La phrase
   courte qui donne le pas à l'oral, la consigne seule (« Si ça saigne encore, reprendre l'appui et recompter. »,
   ch. 26, ligne 85), est rare dans les trois chapitres.

## 2. Le même moule que le paragraphe du monoxyde

Le paragraphe que JP a montré (`dangers/partie-1.md`) : quatre phrases, deux en « fait : conséquence », aucun lien,
trois phrases sur quatre qui commencent par « Le » ou « Il », et une fin sur une négation (« se coucher par terre ne
protège pas »). La première phrase finit sur un ajout (« …, et le poêle en fait plus… »).

Le lot a deux jumeaux de ce paragraphe :

- **ch. 39, ligne 230**, le danger du monoxyde : les mêmes faits (ce qui en produit, le gaz invisible, la place de
  l'oxygène, le gaz partout jusqu'au plancher), le même ordre, deux « fait : conséquence », deux liens
  seulement (« parce que », « donc »), et la phrase sur le plancher en « X ne fait pas Y : il fait Z ».
- **ch. 39, ligne 43**, la section 3 : cinq phrases, cinq « fait : conséquence », aucun lien, le même sujet (l'enfant)
  redit à chaque phrase (« Un petit corps… Ses réserves… Il respire… Toute dose… Et il… »), et une fin en maxime (« la
  barrière physique bat la consigne verbale, toujours »).

Une cause se voit en lisant le skill `ecriture` : trois lignes de la table de la règle 15 (« le poêle en fait plus
quand on ferme presque l'entrée d'air », « le gaz ne se voit pas et ne se sent pas », « il se répand dans toute la
pièce, jusqu'au plancher ») sont mot pour mot les phrases du paragraphe que JP a trouvé mal rythmé. On a changé les
mots un par un, à leur place, et le squelette (fait, et ajout. fait. fait : conséquence. fait : conséquence.) est
resté. Une
correction faite mot par mot ne touche pas au tempo.

## 3. Les motifs, du plus grave au moins grave

### Motif 1. Le paragraphe en briques (haute)

Des mécanismes posés côte à côte, chacun fermé sur lui-même en « fait : conséquence », sans mot qui dise comment l'un
mène à l'autre, souvent avec le même sujet redit. À voix haute, chaque phrase monte jusqu'au deux-points, retombe, et
la suivante repart de zéro : le paragraphe n'avance pas, il s'empile, et il s'arrête sans finir. C'est exactement le
paragraphe du monoxyde.

**Fréquence.** 39 paragraphes du lot ont deux phrases « fait : conséquence » ou plus (13, 17, 9) ; aucun dans les sept
références. 115 des 159 paragraphes de trois phrases et plus n'ont aucun lien parlé (72 %).

**Exemples.**

1. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 43 :
   « Un petit corps a beaucoup de peau pour peu de masse : il se refroidit plus vite qu'un adulte et se réchauffe moins
   bien, faute de muscle pour frissonner. Ses réserves d'eau et de sucre sont petites : une gastro ou un repas sauté
   mènent à la déshydratation ou à l'hypoglycémie[^1] en heures, pas en jours. Il respire plus vite par kilo : à air
   égal, il absorbe plus de monoxyde et de fumée. Toute dose, de poison comme de médicament, se calcule au kilo : ce qui
   indispose un adulte intoxique un enfant. Et il ne se sauve pas seul : la barrière physique bat la consigne verbale,
   toujours. »
   Réécriture : « Un enfant a beaucoup de peau pour le peu qu'il pèse, alors il se refroidit plus vite qu'un adulte. Il
   a aussi moins de muscle pour frissonner, donc il se réchauffe moins bien. Comme ses réserves d'eau et de sucre sont
   petites, une gastro ou un repas sauté le mènent à la déshydratation ou à l'hypoglycémie en quelques heures, pas en
   quelques jours. Il respire plus vite pour son poids, alors dans le même air, il prend plus de monoxyde et de fumée
   qu'un adulte. Toute dose, de poison comme de médicament, se calcule à son poids : la quantité qui rend un adulte un
   peu malade peut intoxiquer un enfant. Enfin, un enfant ne se sauve pas tout seul. Une barrière qu'il ne peut pas
   passer le protège mieux qu'une consigne. »

2. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 230 (le jumeau du paragraphe de JP) :
   « Gaz incolore et inodore produit par toute combustion incomplète : poêle à bois, génératrice, moteur, propane,
   essence, barbecue. Il se fixe sur l'hémoglobine à la place de l'oxygène, et l'enfant en absorbe plus vite parce qu'il
   respire plus vite par kilo. Les premiers symptômes — mal de tête, nausée, fatigue — ressemblent à une grippe et
   arrivent chez lui en premier. […] Le monoxyde ne monte pas au plafond et ne tombe pas au plancher : il a presque la
   densité de l'air et se mélange partout, donc coucher les enfants au ras du sol ou sur la mezzanine ne change rien. Un
   avertisseur à piles est la seule chose qui avertit avant les symptômes. »
   Réécriture : « Le poêle à bois, la génératrice, les moteurs, le propane, l'essence et le barbecue font du monoxyde
   de carbone quand ils brûlent mal. Ce gaz ne se voit pas et ne se sent pas. Il prend la place de l'oxygène dans le
   sang. Comme un enfant respire plus vite qu'un adulte pour son poids, il en absorbe plus vite et il a les premiers
   symptômes : mal de tête, mal au cœur, fatigue, comme une grippe. Le gaz a presque le même poids que l'air, alors il se
   mélange partout dans la pièce. Coucher les enfants au ras du plancher ou dans la mezzanine ne les protège pas. Seul un
   avertisseur à piles sonne avant les symptômes. » (La consigne de la génératrice, coupée ici, garde sa phrase.)

3. `chapitres/25-le-froid-lui-meme.md`, ligne 43 (la section 3) :
   « Le corps tient un bilan : ce que le métabolisme produit, moins ce que le froid soutire par le vent, le contact,
   l'humidité et le souffle. Chaque perte se bouche à part — abri contre le vent, isolant dessous contre le sol,
   pare-vapeur contre l'humidité —, et l'enveloppe ne réchauffe pas : elle empêche de perdre et laisse le frisson
   travailler. Pour protéger le cœur, le corps ferme la circulation des membres, où le sang refroidit ; tout ce qui la
   rouvre trop tôt renvoie ce sang froid au cœur. Dans une gelure, c'est le dégel qui détruit les petits vaisseaux, et
   chaque regel recommence : un membre dégelé qui regèle finit pire que s'il était resté gelé. »
   Réécriture : « Le corps produit sa chaleur, et il la perd par le vent, par ce qu'il touche, par l'humidité et par le
   souffle. On bloque chaque perte à part : un abri contre le vent, un isolant sous la personne contre le sol, un
   pare-vapeur contre l'humidité. L'enveloppe ne réchauffe pas la personne. Elle l'empêche de perdre sa chaleur pendant
   que le frisson la réchauffe. Pour protéger le cœur, le corps ferme la circulation dans les bras et les jambes, où le
   sang refroidit. Si on la rouvre trop tôt, ce sang froid retourne au cœur. Dans une gelure, les petits vaisseaux sont
   abîmés au dégel, et chaque fois que le membre regèle, ça recommence. Un membre qui regèle après avoir dégelé finit
   donc plus abîmé que s'il était resté gelé. »

4. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 122 (étape 9) :
   « Une seule pièce chauffée, portes fermées ailleurs. Cible de la pièce chaude : 19 °C ou plus, lus à la hauteur du
   lit des enfants. Repère qui se lit sans thermomètre : un enfant qui dort les bras sortis de la couverture est assez
   chaud ; un enfant qui dort en boule, tuque enfoncée, ne l'est pas. L'air d'une pièce chauffée au poêle est stratifié :
   le lit d'un enfant au plancher est dans une autre pièce que le thermomètre posé sur la table. »
   Réécriture : « Chauffer une seule pièce et fermer les portes des autres. Viser 19 °C ou plus, mesurés à la hauteur du
   lit des enfants, parce que dans une pièce chauffée au poêle, l'air n'a pas la même température en bas et en haut. Le
   thermomètre posé sur la table ne dit pas la température du lit au plancher. Sans thermomètre, on regarde l'enfant
   dormir. S'il dort les bras sortis de la couverture, il a assez chaud ; s'il dort en boule, la tuque enfoncée, il n'a
   pas assez chaud. » (La raison passe à côté de la cible qu'elle explique, au lieu de venir en dernier, seule.)

5. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 443 (le chapitre refait) :
   « Mélanger 3 g de sel de table et 18 g de sucre, pesés, dans un litre d'eau bouillie et refroidie. Le sucre fait
   passer le sel et l'eau à travers la paroi de l'intestin : l'eau seule, donnée à quelqu'un qui a la diarrhée, ressort
   comme elle est entrée. Sans balance, prendre 360 mL de jus d'orange non sucré, 600 mL d'eau bouillie refroidie et
   2,5 mL de sel, une demi-cuillère à thé (ch. 30). Quand on doute de la mesure, le mélange doit goûter moins salé que
   des larmes : trop de sel ou trop de sucre empire la diarrhée. Le donner par petites gorgées, souvent, jamais à une
   personne somnolente (étape 11). »
   Réécriture : « Mélanger 3 g de sel de table et 18 g de sucre, pesés, dans un litre d'eau bouillie et refroidie. Il
   faut du sucre, parce qu'il fait passer le sel et l'eau à travers la paroi de l'intestin. Chez quelqu'un qui a la
   diarrhée, l'eau seule ressort comme elle est entrée. Sans balance, prendre plutôt 360 mL de jus d'orange non sucré,
   600 mL d'eau bouillie refroidie et 2,5 mL de sel, soit une demi-cuillère à thé (ch. 30). Si on doute de la mesure,
   goûter le mélange : il doit être moins salé que des larmes, parce que trop de sel ou trop de sucre empire la diarrhée.
   Ensuite, le donner par petites gorgées, souvent, mais jamais à une personne à moitié endormie (étape 11). »

**Cause.** Trois règles du skill `ecriture` poussent ensemble vers la brique. La règle 1, « Une phrase, une
information. Deux faits, deux phrases. », sépare les faits sans demander de les relier. La règle 2 donne comme phrase
modèle un « fait : conséquence » : « Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en
gelant. » Et la seule règle de liaison du skill est cachée dans une ligne du tableau du 15 octobre (le paragraphe en
paraboles) : « on passe d'un mécanisme à l'autre par un lien qui se lit (« ensuite », « de même », ou un nouvel
alinéa) » ; le nouvel alinéa n'est pas un lien. Pour les ch. 25 et 39, l'ancienne section « Pourquoi ça marche »
(une suite de mécanismes sans geste) fabrique la brique par sa nature même. Enfin, la table de la règle 15 corrige le
mot à sa place (section 2 ci-dessus).

### Motif 2. La phrase qui finit sur un ajout : « …, et » + un autre sujet (haute)

La phrase dit un fait, puis ajoute « , et » avec un nouveau sujet et un deuxième fait, souvent celui qui compte (la
consigne, le fait qui surprend). À voix haute, la voix retombe à la virgule : le deuxième fait arrive en queue, quand
l'oreille a fini d'écouter. Parfois une troisième queue s'y accroche (« , ce qui… »). C'est la première phrase du
paragraphe de JP : « …font du monoxyde de carbone, et le poêle en fait plus… ».

**Fréquence.** 89 phrases dans le lot (25, 30, 34), 5,5 pour 1000 mots. Toutes ne sont pas fautives : « Un réfrigérateur
à 4 °C ne les arrête pas, et une glacière de chalet encore moins » (ch. 39, ligne 267) se dit très bien, parce que la
deuxième moitié est courte et prolonge la première. Le défaut, c'est le deuxième fait, d'une autre nature, en queue.

**Exemples.**

1. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 169 :
   « Le gel désinfectant doit contenir au moins 60 % d'alcool, et il ne marche pas sur des mains visiblement sales, ce
   qui est le cas la plupart du temps au chalet. »
   Réécriture : « Le gel désinfectant ne marche pas sur des mains visiblement sales. Et au chalet, elles le sont presque
   toujours. Quand on s'en sert, il doit contenir au moins 60 % d'alcool. »

2. `chapitres/25-le-froid-lui-meme.md`, ligne 182 :
   « Sous 2 °C, quelqu'un de mouillé se traite pour hypothermie même s'il marche et parle normalement : l'eau dans le
   tissu continue de tirer la chaleur longtemps après la sortie de l'eau, et l'habillage sec passe avant tout le reste. »
   Réécriture : « Sous 2 °C, on traite pour l'hypothermie toute personne mouillée, même si elle marche et parle
   normalement, parce que l'eau dans le tissu continue de lui tirer sa chaleur longtemps après la sortie de l'eau. Avant
   toute autre chose, l'habiller sec. »

3. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 238 :
   « Le monoxyde donne mal à la tête, la nausée et le sommeil, et la famille met ça sur le compte de la maladie ou de
   l'inquiétude. »
   Réécriture : « Le monoxyde donne mal à la tête, mal au cœur et envie de dormir. Comme on veille un malade, la famille
   met ça sur le compte de la maladie ou de l'inquiétude. » (« Le sommeil » est le mot que JP a relevé sur la page du
   monoxyde.)

4. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 180 :
   « Un enfant qui peut faire de la lumière lui-même se lève moins la nuit, et un enfant qui se lève moins la nuit ne
   traverse pas la pièce du poêle dans le noir. »
   Réécriture : « Avec sa lampe à portée de main, l'enfant se lève moins la nuit, et quand il se lève, il ne traverse pas
   la pièce du poêle dans le noir. »

5. `chapitres/25-le-froid-lui-meme.md`, ligne 117 :
   « Un corps froid consomme peu, et c'est précisément ce qui laisse la fenêtre ouverte. »
   Réécriture : « Comme un corps froid consomme peu, on a plus de temps pour le ranimer. »

6. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 215 :
   « Ces signes ne permettent pas de trouver la maladie ; on s'en sert pour voir si la personne va mieux ou plus mal, et
   ça se voit seulement sur une série écrite : après une grosse peur, on se souvient du pire moment et on oublie comment
   on y est arrivé. »
   Réécriture : « Ces signes ne disent pas quelle est la maladie. Ils montrent si la personne va mieux ou plus mal, mais
   seulement quand on les a écrits l'un après l'autre. Après une grosse peur, on se souvient du pire moment, et on oublie
   comment on y est arrivé. »

**Cause.** Une habitude d'écriture que les règles ne voient pas : la virgule et « et » servent de colle universelle,
surtout depuis que le tiret est banni (le skill `ecriture` propose d'abord la virgule pour remplacer le tiret). La
règle 1 (« deux faits, deux phrases ») est contournée par « , et », que `controle.py` ne relève pas. Aucune règle ne
dit où va le fait qui compte : à la fin d'une phrase courte, ou dans sa propre phrase.

### Motif 3. Le deux-points qui annonce : le roulement de tambour (haute)

Une demi-phrase prépare (« X est celui qui compte : », « C'est le prix : », « Ce que ça vaut : », « Trois règles, et
elles ne changent pas. »), la voix reste en l'air, puis le fait tombe comme une chute. Une fois, ça passe ; en série,
le texte devient une suite de petits effets, et l'oreille entend un vendeur ou un sermon, pas quelqu'un qui explique.
Le compte qui annonce (« Deux pièges. », « Quatre gestes, puis une décision. », « Un : … Deux : … Trois : … ») est la
même figure.

**Fréquence.** Environ 25 dans le lot : neuf au ch. 25 (lignes 63, 72, 195, 198, 344, 404, 437, 442, 457), une
quinzaine au ch. 39 (lignes 300, 332, 348, 355, 356, 374, 390, 401, 414, 430, 431, 482, 511, 532, 536), une
ou deux au ch. 26 (ligne 389). La passe d'écriture du ch. 26 les a presque toutes enlevées : la règle marche quand on
l'applique.

**Exemples.**

1. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 355 :
   « L'avertissement qui l'accompagne est celui qui compte : «Vous devez utiliser les quantités exactes indiquées afin
   de ne pas risquer d'aggraver votre état. » Le mécanisme explique pourquoi : c'est le rapport entre le sucre et le sel
   qui fait entrer l'eau à travers la paroi de l'intestin. »
   Réécriture : « Il faut respecter ces quantités à la lettre, parce que l'eau passe à travers la paroi de l'intestin
   seulement quand le sucre et le sel sont dans le bon rapport. »

2. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 332 :
   « C'est le prix, et il se paie en bois : un poêle tire son air de la pièce, et une pièce bien calfeutrée finit par
   lui en refuser ; »
   Réécriture : « Ça coûte du bois, mais le poêle prend son air dans la pièce, et si la pièce est trop bien calfeutrée,
   il finit par en manquer. »

3. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 401 :
   « Ce que ça vaut : la couleur ment dans les deux sens — un haché de gibier peut brunir avant d'être chaud à cœur, et
   une viande bien cuite peut rester rosée si elle a été fumée ou salée. »
   Réécriture : « Mais on ne peut pas se fier à la couleur, ni dans un sens ni dans l'autre. Un haché de gibier peut
   brunir avant d'être chaud à cœur, et une viande bien cuite peut rester rosée si elle a été fumée ou salée. »

4. `chapitres/25-le-froid-lui-meme.md`, ligne 442 :
   « Trois règles, et elles ne changent pas. L'entrée plus basse que la plateforme où l'on couche — l'air froid tombe et
   reste en bas. »
   Réécriture : « Creuser l'entrée plus bas que la plateforme où l'on couche, parce que l'air froid descend et reste en
   bas. » (Les deux autres règles prennent chacune leur phrase, sans annonce.)

5. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 374 :
   « Et le vrai truc du chalet en hiver : congeler la solution dehors et la donner en éclats de glace à sucer. »
   Réécriture : « L'hiver, on peut aussi congeler la solution dehors et la donner à sucer en éclats de glace. »

6. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 348 :
   « C'est le piège complet : le plus petit corps de la maison tombe le premier, et il tombe d'une manière qui n'alarme
   pas. »
   Réécriture : *(rien)*. Les deux phrases d'avant viennent de le montrer ; le paragraphe passe directement à « Un enfant
   qui devient mou dans une pièce chauffée à la flamme sort dehors avant qu'on cherche pourquoi. »

**Cause.** Le skill `ecriture` interdit « la révélation en deux temps », avec un seul exemple, et `controle.py` ne la
cherche pas. Pire, la section « Le tiret » du même skill donne comme remplacement du tiret un deux-points qui annonce :
« les deux-points : « Une seule règle : la génératrice dehors. » ». Le skill `editeur` demande d'alterner des
« phrases courtes (percutantes) » : la phrase courte devient un effet au lieu d'une consigne.

### Motif 4. La phrase-inventaire : une liste entière dans une phrase (moyenne)

Quatre, cinq ou six membres dans une seule phrase, séparés par des points-virgules, avec parfois une virgule, un tiret
ou une parenthèse à l'intérieur de chaque membre, et souvent sans verbe (télégraphe). On ne peut pas la dire d'un
souffle ; au troisième membre, l'auditeur a perdu le début. À l'oral, une liste se dit en la comptant, ou elle se
découpe.

**Fréquence.** 56 phrases de 38 mots et plus dans le lot (16, 22, 18), dont une quinzaine de listes à points-virgules.
La pire phrase du lot fait 155 mots (ch. 25, ligne 255). Le ch. 26 montre la bonne pratique à l'étape 12 : les signes
de la réaction grave sont en puces, une ligne par signe.

**Exemples.**

1. `chapitres/25-le-froid-lui-meme.md`, ligne 255 (155 mots) :
   « Seuils de température qui changent l'habillement et l'outillage : sous 16 °C, un ouvrage de précision à mains nues
   de plus de 10 minutes demande un moyen de réchauffer les mains — c'est sous 16 °C de température cutanée que la
   dextérité tombe ; sous 4 °C, isolation du corps entier et coupe-vent, et on change tout vêtement mouillé ; sous 2 °C,
   quelqu'un de mouillé se traite pour hypothermie ; sous -1 °C, […] ; à -17,5 °C, les mitaines remplacent les gants et
   l'outil doit se manier avec les mitaines, parce que cinq doigts séparés perdent chacun leur chaleur par leur propre
   surface quand quatre doigts ensemble se la partagent. »
   Réécriture :
   « Ce qui change avec la température :
   - sous 16 °C, prévoir de quoi se réchauffer les mains pour un travail de précision à mains nues de plus de 10 minutes,
     parce que les doigts perdent leur adresse quand la peau descend sous 16 °C ;
   - sous 4 °C, couvrir tout le corps, mettre un coupe-vent et changer tout vêtement mouillé ;
   - sous 2 °C, traiter pour l'hypothermie toute personne mouillée ;
   - sous -1 °C, recouvrir d'un isolant les manches d'outils et les leviers de métal, sinon le métal tire la chaleur de
     la main bien plus vite que l'air ;
   - sous -7 °C, ne plus toucher de métal froid à peau nue, parce que la peau colle et s'arrache ;
   - à -17,5 °C, passer des gants aux mitaines, et prendre des outils qu'on peut manier avec des mitaines.
   Les mitaines gardent mieux la chaleur parce que les quatre doigts ensemble se la partagent, alors que dans un gant,
   chaque doigt la perd par sa propre surface. »

2. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 213 (65 mots) :
   « Chaque fois qu'on vérifie l'état de la personne, écrire une ligne sur n'importe quoi qui partira avec elle : l'heure
   ; si elle répond clairement, mal ou pas du tout ; si elle respire calmement, vite ou avec peine ; si sa peau est
   chaude et sèche, froide et moite, ou bleutée ; si elle a uriné, et la couleur de l'urine ; ce qu'on lui a donné, à
   quelle dose. »
   Réécriture : « Chaque fois qu'on vérifie l'état de la personne, écrire une ligne sur n'importe quoi qui partira avec
   elle. Sur cette ligne, on note :
   - l'heure ;
   - si elle répond clairement, mal ou pas du tout ;
   - si elle respire calmement, vite, ou si elle a du mal à respirer ;
   - si sa peau est chaude et sèche, froide et moite, ou bleutée ;
   - si elle a uriné, et de quelle couleur ;
   - ce qu'on lui a donné, et à quelle dose. »

3. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 482 (70 mots) :
   « Côté adultes, trois gestes qui ne coûtent rien et qui décident de tout : marquer le dernier point connu avant de
   bouger — un bâton planté, un manteau accroché — et y laisser une personne, parce que toutes les recherches y
   reviennent ; chercher en criant puis en se taisant, par cycles, parce qu'un enfant qui répond ne s'entend pas
   par-dessus les appels ; et à la brunante, sortir la lumière plutôt que la voix. »
   Réécriture : « Avant de bouger, les adultes doivent marquer le dernier endroit où l'enfant a été vu, avec un bâton
   planté ou un manteau accroché, et y laisser quelqu'un, parce que toutes les recherches y reviennent. Ensuite, on
   cherche en criant, puis on se tait pour écouter, et on recommence, parce qu'on n'entend pas l'enfant qui répond quand
   tout le monde crie. À la brunante, on sort les lampes plutôt que de crier. »

4. `chapitres/25-le-froid-lui-meme.md`, ligne 93 (53 mots, télégraphe) :
   « Monter l'enveloppe : matelas isolant dessous ; le plus d'isolant possible par-dessus, la personne dans le sac de
   couchage fermé et non sous un sac ouvert ; sources de chaleur sur le haut du corps ; tuque ou capuchon, le visage
   dégagé pour respirer ; pare-vapeur par-dessus si la personne est sèche, à l'intérieur si elle est mouillée. »
   Réécriture : « Monter l'enveloppe :
   - mettre le matelas isolant sous la personne ;
   - la mettre dans le sac de couchage et le fermer, au lieu de poser un sac ouvert sur elle ;
   - ajouter par-dessus le plus d'isolant possible ;
   - placer les sources de chaleur sur le haut du corps ;
   - lui mettre une tuque ou le capuchon, en gardant le visage dégagé pour qu'elle respire ;
   - poser le pare-vapeur par-dessus si elle est sèche, à l'intérieur si elle est mouillée. »

5. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 106 (56 mots, une liste dans une liste) :
   « Si la route doit prendre plus de 2 heures, on peut desserrer le garrot à trois conditions : la personne n'est pas
   en choc (son pouls ne monte pas, sa peau n'est pas froide et moite, elle n'est ni agitée ni somnolente), le garrot
   n'arrête pas le sang d'un membre arraché, et quelqu'un peut surveiller la plaie. »
   Réécriture : « Si la route doit prendre plus de 2 heures, on peut desserrer le garrot, mais seulement si ces trois
   conditions sont réunies :
   - la personne n'est pas en choc : son pouls ne monte pas, sa peau n'est pas froide et moite, et elle n'est ni agitée
     ni à moitié endormie ;
   - le membre n'est pas arraché ;
   - quelqu'un peut surveiller la plaie. »

**Cause.** La règle 1 (« une phrase, une information ») n'est jamais appliquée aux énumérations : une liste passe pour
une seule information. Le skill `langue` (section 10) recommande « le point-virgule pour une liste de signes », ce qui
garde la liste dans la phrase. Aucune règle ne dit qu'une liste de plus de trois membres, ou dont les membres ont
eux-mêmes des virgules, se met en puces. Aux ch. 25 et 39, le tableau de l'ancien gabarit a souvent été réécrit en
prose sans être découpé.

### Motif 5. La même mélodie d'une phrase à l'autre, et la consigne en queue (moyenne)

Surtout au ch. 26, le chapitre refait. Les phrases ont toutes la même taille (14 à 26 mots) et la même forme : une
consigne ou un constat, une virgule ou un deux-points, la raison ou la consigne. Il n'y a presque jamais de phrase
courte qui donne le pas. Et quand la phrase de constat est longue, la consigne arrive en queue, après un « , et » et un
deux-points, au moment où le souffle est fini : le geste à faire, qui devrait sonner fort, est la partie qu'on entend le
moins.

**Fréquence.** Ch. 26 : 52,7 % des phrases entre 14 et 26 mots, 5,8 % de 8 mots et moins, monotonie 32,1 % (la plus
haute du livre). Onze phrases de 20 mots et plus y mettent la consigne après le deux-points final (deux au ch. 25, une
au ch. 39).

**Exemples.**

1. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 112 (étape 10) :
   « Un corps qui a perdu du sang refroidit vite, et le sang coagule mal dans un corps froid : on la garde au chaud pour
   aider le sang à coaguler. »
   Réécriture : « Un corps qui a perdu du sang refroidit vite, et dans un corps froid, le sang coagule mal. Il faut donc
   garder la personne au chaud. »

2. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 245 (étape 37) :
   « Quand tout le monde est épuisé, on sert facilement au malade un rôti à peu près cuit, et c'est la personne la moins
   capable de supporter une intoxication : mesurer au thermomètre, dans la partie la plus épaisse, sans toucher l'os
   (ch. 21, ch. 61). »
   Réécriture : « Quand tout le monde est épuisé, on sert facilement au malade un rôti à peu près cuit. Et le malade est
   la personne qui supporte le moins une intoxication. Mesurer la cuisson au thermomètre, dans la partie la plus
   épaisse, sans toucher l'os (ch. 21, ch. 61). »

3. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 375 (l'attelle) :
   « Un membre cassé enfle pendant des heures, et une attelle bien serrée à la pose finit par serrer comme un garrot :
   vérifier la couleur, la chaleur et la sensibilité des doigts ou des orteils à chaque ligne de la feuille de suivi, et
   desserrer les attaches dès qu'ils blanchissent (section 6). »
   Réécriture : « Un membre cassé enfle pendant des heures, alors une attelle bien serrée à la pose finit par serrer
   comme un garrot. À chaque ligne de la feuille de suivi, vérifier la couleur, la chaleur et la sensibilité des doigts
   ou des orteils. Dès qu'ils blanchissent, desserrer les attaches (section 6). »

4. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 149 (étape 17 ; phrases de 20, 19, 19 et 26 mots) :
   « Mettre tout de suite la brûlure sous l'eau fraîche qui coule, pas froide, et l'y laisser au moins 20 minutes. La
   peau continue de cuire plusieurs minutes après qu'on l'a retirée de la chaleur, et l'eau arrête la cuisson. Le plus
   tôt est le mieux, mais l'eau aide encore si on commence jusqu'à 3 heures après la brûlure. Sans eau courante, prendre
   n'importe quel liquide propre et frais et le verser sur la brûlure, ou en mouiller un linge qu'on change souvent
   (section 7). »
   Réécriture : « Mettre tout de suite la brûlure sous l'eau qui coule, fraîche, mais pas froide. L'y laisser au moins
   20 minutes. Même retirée de la chaleur, la peau continue de cuire pendant plusieurs minutes, tant que l'eau ne l'a
   pas refroidie. Plus on commence tôt, mieux c'est, mais l'eau aide encore jusqu'à 3 heures après la brûlure. Sans eau
   courante, verser sur la brûlure n'importe quel liquide propre et frais, ou en mouiller un linge qu'on change
   souvent (section 7). »

5. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 361 (le garrot de la section 7 ; phrases de 20, 29, 36 et 13 mots) :
   « Prendre une bande large, jamais une corde, un fil ou une ceinture étroite : la largeur répartit la pression
   (planche 26-04). La nouer au-dessus de la plaie, passer un bâton solide dans le nœud, le tourner jusqu'à ce que le
   sang arrête, puis bloquer le bâton avec un deuxième lien. Ce qu'on perd : un garrot improvisé laisse plus souvent un
   bras ou une main qui ne fonctionnera plus comme avant, et plus la bande est étroite, plus elle écrase les nerfs et les
   muscles sous elle. Quand la personne mourrait de son sang sans lui, le poser sans hésiter. »
   Réécriture : « Prendre une bande large, jamais une corde, un fil ou une ceinture étroite (planche 26-04). Plus la
   bande est étroite, plus elle écrase les nerfs et les muscles en dessous. La nouer au-dessus de la plaie. Passer un
   bâton solide dans le nœud et le tourner jusqu'à ce que le sang arrête. Bloquer ensuite le bâton avec un deuxième
   lien. Ce qu'on perd : un garrot improvisé laisse plus souvent un bras ou une main qui ne fonctionnera plus comme
   avant. Mais si la personne va mourir de son sang sans lui, le poser sans hésiter. » (Les gestes sont dans leur
   ordre, un ou deux par phrase ; la raison de la bande large passe avec la bande, au lieu de venir dans « Ce qu'on
   perd ».)

**Cause.** La règle 0 du skill `ecriture` (« couper un mot qui n'apprend rien, oui ; couper ce qui fait une phrase
française, non ») et la règle de l'orange (« chaque étape porte son geste, son pourquoi et le détail ») sont justes,
mais appliquées phrase par phrase, elles donnent à chaque phrase le même contenu (geste + pourquoi + précision), donc
la même taille et la même mélodie. La chasse aux étiquettes en raccourci a enlevé les fragments courts sans rien mettre
à la place. Le skill `editeur` dit « alterne phrases courtes et phrases longues » sans mesure ni exemple, et le skill
`ecriture` ne dit nulle part que la consigne mérite sa propre phrase.

### Motif 6. Le moule répété « Ce qu'on perd : » (moyenne)

Dans la variante d'urgence, chaque bloc finit au même endroit sur la même formule, suivie d'un deux-points ; trois fois
au ch. 26, la formule est suivie d'un deuxième deux-points dans la même phrase. Au ch. 39, elle prend quatre formes
(« Ce qu'on perd est… », « Ce qu'on perd : … », « Ce qu'on perd avec…, c'est… », « Ce qu'on perd sans… : … ») et elle
est annoncée d'avance (« Ce qu'on perd est dit chaque fois. », ligne 296). À la lecture suivie, l'oreille attend la
formule et n'écoute plus ce qui la suit.

**Fréquence.** 9 fois au ch. 26, 10 au ch. 39, 2 au ch. 25. Les trois phrases du ch. 26 qui ont deux deux-points
commencent toutes par « Ce qu'on perd : ».

**Exemples.**

1. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 458 :
   « Ce qu'on perd : la justesse, toujours dans le même sens : on compte trop vite, et l'appui dure moins de 5 minutes
   (étape 6). »
   Réécriture : « Ce qu'on perd : la justesse. On compte toujours trop vite, alors l'appui dure moins de 5 minutes
   (étape 6). »

2. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 421 :
   « Faire bouillir l'eau à gros bouillons, la laisser refroidir à couvert, et la pousser en jet avec une bouteille
   souple percée au clou chauffé (planche 26-11, repères 9 à 12). Ce qu'on perd : rien d'important si l'eau a bouilli à
   gros bouillons et si la bouteille est propre : le jet et la quantité d'eau comptent plus que la stérilité (ch. 10). »
   Réécriture : « Faire bouillir l'eau à gros bouillons et la laisser refroidir à couvert. Percer une bouteille souple
   avec un clou chauffé, puis pousser l'eau en jet (planche 26-11, repères 9 à 12). Ce qu'on perd : rien d'important, si
   l'eau a bouilli à gros bouillons et que la bouteille est propre. Pour rincer une plaie, le jet et la quantité d'eau
   comptent plus que la stérilité (ch. 10). »

3. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 355 :
   « Ce qu'on perd : la stérilité, et le champignon peut entrer par la plaie : regarder sous le sachet chaque jour, et
   partir si une bosse sans douleur paraît près de la plaie dans les 12 semaines. »
   Réécriture : « Ce qu'on perd : la stérilité, et le champignon peut entrer par la plaie. Regarder sous le sachet chaque
   jour. Si une bosse sans douleur paraît près de la plaie dans les 12 semaines, partir. »

4. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 413 :
   « Ce qu'on perd est le chiffre, et le chiffre est ce qui permet de suivre une courbe sur trois jours. »
   Réécriture : « On perd le chiffre, donc on ne peut plus suivre la fièvre sur trois jours. »

5. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 425 :
   « Le poisson fumé et le poisson salé sortent du menu des enfants dès qu'on ne peut plus tenir sous 3 °C. Ce qu'on
   perd est une réserve entière. »
   Réécriture : « Dès qu'on ne peut plus garder le froid sous 3 °C, on arrête de servir aux enfants le poisson fumé et le
   poisson salé. On perd alors toute cette réserve. »

**Cause.** `gabarit-chapitre.md`, section 7 : « Nommer honnêtement ce qu'on perd en la choisissant ». La consigne de
fond est bonne ; elle est devenue une étiquette fixe, à la même place, suivie d'un deux-points, et rien ne dit que ce
qui suit l'étiquette s'écrit en phrases ordinaires.

### Motif 7. Le paragraphe qui finit sur une formule (moyenne)

Le paragraphe n'a pas de vraie fin : il s'arrête sur une phrase qui sonne comme une morale, souvent en « ce n'est pas
X, c'est Y » ou en image. À voix haute, c'est une cadence de conclusion, la voix qui baisse pour faire effet ; le
lecteur qui veut savoir quoi faire reste sans geste. La bonne fin d'un paragraphe de procédure est le dernier geste, ou
la condition qui fait agir (« Si c'est le cas, … : partir. »).

**Fréquence.** Neuf au ch. 39 (lignes 114, 321, 344, 408, 433, 473, 487, 491, 537), sept au ch. 25 (lignes 117, 167,
200, 218, 431, 455, 470), une ou deux au ch. 26 (ligne 479).

**Exemples.**

1. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 113 :
   « Ce qui se retient à cet âge-là, ce n'est pas la consigne, c'est le chemin fait avec le corps. »
   Réécriture : « À cet âge, un enfant retient le chemin qu'il a fait lui-même, plus que la consigne. »

2. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 472 :
   « Rien d'improvisé ne tient un corps de 20 kg la face hors de l'eau. La seule substitution honnête, c'est de ne pas y
   aller. »
   Réécriture : « Rien d'improvisé ne tient un enfant de 20 kg la face hors de l'eau. Sans VFI à sa taille, l'enfant ne
   va pas sur l'eau. »

3. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 489 :
   « Entre les bâtiments, par poudrerie, la corde de guidage parle si on la fait parler : un nœud pour le bûcher, deux
   pour la bécosse, trois pour la porte du chalet. Une mitaine ne lit rien d'autre que des nœuds. »
   Réécriture : « Par poudrerie, faire des nœuds sur la corde de guidage entre les bâtiments : un nœud pour le bûcher,
   deux pour la bécosse, trois pour la porte du chalet. Avec des mitaines, on ne sent rien d'autre que des nœuds. »

4. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 536 :
   « Et une cinquième, qui n'est pas un objet : ce qu'un enfant a avalé ne se traite pas avec ce qu'il y a dans la
   maison. Là, ce qui remplace le matériel, c'est la route. »
   Réécriture : « Ce qu'un enfant a avalé ne se soigne pas avec ce qu'il y a dans la maison : il faut partir tout de
   suite (ch. 2). »

5. `chapitres/25-le-froid-lui-meme.md`, ligne 429 :
   « Le pied finit mouillé de sa propre sueur, mais le feutre reste sec — et un feutre sec isole, un feutre trempé ne
   fait plus rien. C'est l'inverse du réflexe et ça marche. »
   Réécriture : « Le pied finit mouillé de sa propre sueur, mais le feutre reste sec, donc il continue d'isoler. »

**Cause.** Le skill `ecriture` interdit la chute en formule et la maxime, mais `controle.py` ne repère que la forme « Un
X qui… ne… plus » ; la forme « ce n'est pas X, c'est Y » en fin de paragraphe et la chute en image lui échappent. Ces
chutes sont presque toutes dans les deux chapitres pas encore refaits : quand la passe est faite, la règle tient (le
ch. 26 n'en a presque plus).

### Motif 8. La ponctuation qui hache : parenthèse au milieu, flèche, tiret et deux-points dans la même ligne (basse)

Une parenthèse au milieu de la phrase (un renvoi de planche, de section ou de chapitre) coupe la voix en deux : à
l'oral, on baisse le ton, on dit le renvoi, et on doit reprendre la phrase là où on l'avait laissée. Dans les lignes de
Matériel des ch. 25 et 39, un tiret, un deux-points, une flèche, un « § » et un deuxième deux-points se suivent en
vingt mots.

**Fréquence.** Parenthèses pour 1000 mots : 5,2, 12,2 et 3,8 (références : 2,4). Parenthèses au milieu d'une phrase :
8, 15 et 10. Lignes de Matériel avec « (→ §9 : … ) » : 3 au ch. 25, 4 au ch. 39.

**Exemples.**

1. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 387 :
   « Refendre du ruban à conduits en lanières de la largeur d'un doigt, et les coller sur une peau sèche de part et
   d'autre d'une coupure propre, en tirant les deux bords l'un vers l'autre (planche 26-41, repères 1 à 4) : chaque
   lanière croise la coupure en travers ; on n'en pose jamais une dans le long de la coupure. »
   Réécriture : « Refendre du ruban à conduits en lanières de la largeur d'un doigt. Coller chaque lanière en travers
   d'une coupure propre, sur une peau sèche, en tirant les deux bords l'un vers l'autre, jamais dans le long de la
   coupure (planche 26-41, repères 1 à 4). »

2. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 409 :
   « Pour quelques mètres, sans rien : passer les bras sous les aisselles de la personne, sa tête appuyée contre le
   ventre du porteur, et reculer (planche 26-09a, repères 4 à 6) ; jamais la tirer par les poignets ni par le haut de ses
   vêtements. »
   Réécriture : « Pour quelques mètres, sans rien, passer les bras sous les aisselles de la personne et reculer, sa tête
   appuyée contre le ventre du porteur (planche 26-09a, repères 4 à 6). Ne jamais la tirer par les poignets ni par le
   haut de ses vêtements. »

3. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 93 :
   « Sans gaze, prendre le coton bouilli de la section 7 (« Le pansement ») ou le linge le plus propre qu'on a ; sans
   gants, le doigt nu. »
   Réécriture : « Sans gaze, prendre le coton bouilli, sinon le linge le plus propre qu'on a (section 7, « Le
   pansement »). Sans gants, bourrer avec le doigt nu. »

4. `chapitres/25-le-froid-lui-meme.md`, ligne 48 :
   « Matelas de sol isolant — sous le corps avant tout : le sol tire la chaleur plus vite que l'air (→ §9 : sapin
   baumier). »
   Réécriture : « **Matelas de sol isolant** : il passe sous le corps avant tout, parce que le sol tire la chaleur plus
   vite que l'air. Sans matelas, des branches de sapin baumier (section 9). »

5. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 61 :
   « Pèse-personne — médicament, ration, réhydratation : tout se dose au poids de l'enfant (→ §9 : balance à perche). »
   Réécriture : « **Pèse-personne** : le médicament, la ration et la réhydratation se dosent au poids de l'enfant. Sans
   pèse-personne, une balance à perche (section 9). »

**Cause.** `CLAUDE.md` et le skill `ecriture` demandent d'appeler chaque planche « là où elle sert », dans la phrase
d'ancrage : l'appel tombe au milieu de la phrase, juste après le geste. La section « Le tiret » propose les parenthèses
comme remplacement du tiret. Les flèches « (→ §9 : …) » viennent de l'ancien gabarit, pas encore migré dans les
ch. 25 et 39.

## 4. Les passages qui marchent, à garder comme modèles

1. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 82 (étape 6) : « Appuyer avec la paume, directement sur la plaie, et
   ne pas relâcher pour regarder (planche 26-40, repères 1 et 2). Une personne peut mourir d'une grosse perte de sang en
   moins de 5 minutes. Chaque fois qu'on soulève la main pour regarder, on défait le caillot qui commençait à se former.
   Appuyer de tout son poids, les bras tendus, pendant au moins 5 minutes pleines à la montre avant de regarder : sous
   le stress, on compte trop vite. Si ça saigne encore, reprendre l'appui et recompter. Quand ça gicle, appuyer jusqu'à
   ce que le sang arrête, ou jusqu'à ce que le garrot soit posé. »
   Pourquoi : six phrases de 8 à 27 mots, qui avancent : le geste, le danger, ce qui se passe sous la main (« Chaque
   fois qu'on… », une tournure qu'on dit), combien de temps, puis deux conditions courtes qui disent quoi faire ensuite.
   Un seul deux-points. Le paragraphe finit sur un geste.

2. `chapitres/26-soigner-quand-il-n-y-a.md`, ligne 233 (étape 35) : « Après un coup à la tête, réveiller la personne et
   lui poser les mêmes questions à heures fixes. On cherche si elle est plus difficile à réveiller que la fois d'avant,
   ou si elle répond moins bien. Si c'est le cas, elle saigne peut-être dans la tête : partir. »
   Pourquoi : trois phrases dans l'ordre du temps (le geste, ce qu'on cherche, ce qu'on fait si on le trouve), reliées
   par « Si c'est le cas ». Le dernier mot est le geste, en un mot, à l'endroit où la voix frappe.

3. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 443 (fondre la neige) : « Jamais un chaudron rempli de neige
   seule sur une plaque chaude : la neige isole, le fond brûle et le chaudron se perce avant que la neige descende. On
   part d'un fond d'eau, on ajoute la neige par poignées, on brasse. »
   Pourquoi : deux phrases en trois temps, comme on le dirait en montrant le chaudron. « On part d'un fond d'eau, on
   ajoute la neige par poignées, on brasse » : trois gestes courts, le même sujet, aucune ponctuation de plus qu'à
   l'oral.

4. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 462 (la sortie de l'eau) : « Sortir par où on est entré : c'est le
   seul endroit où la glace a déjà porté. Planter les pics, battre des jambes jusqu'à se mettre à l'horizontale et se
   tirer en glissant sur le ventre, pas en se hissant à la verticale. Une fois sorti, rouler sur soi-même pour
   s'éloigner, et ne pas se relever avant plusieurs longueurs de corps. »
   Pourquoi : les gestes dans l'ordre où on les fait, avec un repère de temps qui fait avancer (« Une fois sorti »). La
   seule raison est courte et vient avec le premier geste. Comme chez Ripley, l'ordre du geste sert de lien.

5. `chapitres/39-des-enfants-de-4-et-6-ans.md`, ligne 346 : « Il a l'air fatigué, mou, de mauvais caractère ; il
   chigne, il ne veut plus jouer, il veut se recoucher. Un parent attentif conclut au caractère ou à la fatigue de la
   journée. »
   Pourquoi : on entend quelqu'un parler. Des membres courts, les mots d'ici (« il chigne »), ce qu'on voit, puis
   l'erreur qu'on fait. La phrase suivante (« C'est le piège complet : … », motif 3, exemple 6) casse ce pas : le modèle
   s'arrête avant elle.

## 5. Pistes pour les règles (du seul point de vue du tempo)

1. **Réécrire la règle 1 et le modèle de la règle 2 du skill `ecriture`.** « Une phrase, une information » reste, mais
   deux phrases qui se suivent se relient par un mot quand l'une mène à l'autre (parce que, donc, alors, mais, sinon,
   ensuite, quand, si). Le modèle « Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant »
   devient « …, parce qu'un tuyau plein fend en gelant ». Le deux-points n'est pas un lien.
2. **Enlever de la section « Le tiret » l'exemple « Une seule règle : la génératrice dehors »**, qui enseigne le
   deux-points qui annonce. Remplacer le tiret par un mot de liaison ou un point avant d'essayer le deux-points.
3. **Des seuils, à juger avec JP, mesurés par `tempo.py` sur chaque chapitre avant de le rendre** : au plus un
   « fait : conséquence » par paragraphe ; jamais deux deux-points dans une phrase ; les phrases coupées en deux sous
   le tiers (les références techniques : 8 %) ; les liens parlés vers 8 pour 1000 mots (références : 9,2 ; le lot : 4,5).
   Le seuil sert à trouver les paragraphes à relire, pas à remplacer l'oreille : douze « parce que » sur une page
   feraient un nouveau tic (les réécritures de ce fichier en ont douze en 2100 mots, une par correction ; dans un
   chapitre, il faut varier).
4. **Une liste de plus de trois membres, ou dont les membres ont des virgules, se met en puces**, comme les signes de
   l'étape 12 du ch. 26. À ajouter au skill `ecriture` et à corriger dans la section 10 du skill `langue` (« le
   point-virgule pour une liste de signes »).
5. **La consigne a sa phrase.** Quand la phrase de constat dépasse une vingtaine de mots, la consigne qui suit
   commence une nouvelle phrase. Une étape finit sur un geste ou sur la condition qui fait agir.
6. **La phrase courte est une consigne, jamais un effet.** Dans le skill `editeur`, « phrases courtes (percutantes) »
   devient : « la phrase courte, c'est la consigne seule (« Partir. », « Si ça saigne encore, reprendre l'appui et
   recompter. ») ; jamais l'annonce, la formule ou le fragment sans verbe ».
7. **« Ce qu'on perd » suivi de phrases ordinaires**, sans deuxième deux-points, et pas toujours au même endroit
   (`gabarit-chapitre.md`, section 7).
8. **Corriger par paragraphe, pas par mot.** La table de la règle 15 corrige le mot à sa place ; elle doit dire que le
   paragraphe se relit ensuite à voix haute au complet, parce que le squelette du paragraphe du monoxyde est resté
   après qu'on a changé tous ses mots.
9. **`controle.py` peut relever** « , et » + nouveau sujet en fin de phrase longue, les phrases à deux deux-points, les
   annonces (« X est celui qui compte : », « Trois règles », « Un : … Deux : … ») et « ce n'est pas X, c'est Y » en fin
   de paragraphe.

## 6. Liste de contrôle (cadre, lignes qui touchent l'écriture et la langue)

Pour tout agent
- [x] `CLAUDE.md` pris comme règle ; skill `ecriture` lu au complet, avec ses tableaux ; `gabarit-chapitre.md`,
  skills `editeur` et `langue` lus là où ils touchent le rythme.
- [x] Règle 1 : aucun chiffre ni fait neuf dans les réécritures ; chaque chiffre vient de la phrase citée.
- [x] Rien de commité ; aucun fichier du livre modifié ; seul ce fichier de notes est écrit.
- [x] Lu seulement ce que la tâche touche (les trois chapitres, les règles, les mesures) ; sorties de commande coupées.

La forme du chapitre et l'urgence
- [ ] Sans objet : audit, aucun chapitre n'est réécrit (sept sections, série orange, logigramme, notes « En plus »).

La phrase (appliqué aux réécritures)
- [x] Règle 0 : chaque réécriture lue à voix haute, un verbe qui dit le geste, qui le fait, les articles.
- [x] Pas de loi en formule ni de paragraphe en paraboles : les mécanismes des exemples 1 et 3 du motif 1 sont reliés.
- [x] Pas de « X passe là où Y ne passe pas ».
- [x] Pas de maxime ni de chute : les chutes citées sont coupées ou rendues en geste (motif 7).
- [x] Pas de chose qui pense : « la corde parle », « la couleur ment », « une pièce lui en refuse » sont enlevées.
- [x] Consigne jamais au pronominal (« on traite », « l'habiller sec », « goûter le mélange »).
- [x] Consigne dite comme une consigne ; sujet nommé ; ordre naturel.
- [ ] Points de contrôle et signes d'échec à 5 à 8 lignes : sans objet ici (le ch. 26 en a 14 et 12, les ch. 25 et 39,
  9 à 11 : à la passe de chaque chapitre).
- [ ] Pages des dangers : sans objet (pas dans le lot).
- [x] Passage signalé jugé d'abord : une phrase est rendue par « rien » (motif 3, exemple 6).
- [ ] Passe d'éditeur : sans objet (audit).
- [ ] Le chapitre parle de son sujet : sans objet ; noté au passage que les seuils de gel du ch. 39 (ligne 161) redisent
  le tableau du ch. 25.
- [ ] Notion expliquée à sa première apparition, « Quand l'utiliser » en titres de situation : sans objet (audit).
- [x] Qui fait quoi, sans détour ; une liste après deux-points ne mélange pas deux sortes de choses.
- [x] Le mot qu'on dit : `controle.py` sur les réécritures, section « Mots de livre » vide après correction
  (« somnolente », « avec peine » remplacés ; « le sommeil » du ch. 26 relevé).
- [x] On nomme la chose au lieu du possessif qui oblige à chercher (« le ventre du porteur » gardé).
- [x] Les mots de tous les jours ; pas de « seuil » dans les réécritures.
- [x] Aucun tiret dans les réécritures ni dans mes phrases (`controle.py` : 0) ; « section 9 », jamais « § ».
- [ ] Titres de sous-sections : sans objet.
- [x] Pas de « X ne fait pas Y : il fait Z », pas de « la couleur dit » dans les réécritures.

La répétition
- [ ] Inventaire des faits du chapitre : sans objet (audit).
- [x] Un nom ne revient pas à chaque phrase : le sujet redit du ch. 39, ligne 43, est varié dans la réécriture.

Avant de rendre
- [x] `controle.py` sur le fichier des réécritures : 0 tiret, 0 « § », 0 mot banni ; avis « mots vides » jugés un par
  un (« tout le corps », « tout de suite », « pas du tout » : justes) ; une redite entre deux exemples de chapitres
  différents, sans objet.

La langue
- [x] `langue.py` avec LanguageTool sur les réécritures : 2 avis, jugés faux positifs (« VFI », « bécosse ») ; la
  virgule devant « mais » ajoutée.
- [x] Réécritures relues phrase par phrase : accords, « que / qui », participes, « a / à », « ou / où ».
- [x] Français écrit correct avec les mots du Québec (« mal au cœur », « il chigne », « la brunante », « bécosse ») ;
  ni joual ni anglicisme.
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures.
- [ ] Le correcteur note dans `suivi/NN-redaction.md` : sans objet (aucune correction appliquée au livre).
