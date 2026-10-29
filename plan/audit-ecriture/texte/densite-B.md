# Audit de l'écriture : la densité, lot B (tome 1)

28 octobre 2026. Un seul regard : la densité, trop compressé ou trop délayé. D'un côté le télégraphe (le lien
logique coupé, la phrase sans verbe, la liste de noms, l'étiquette, le sous-entendu qui oblige à relire) ; de l'autre
le remplissage (la redite, l'évidence, la phrase qui parle de la recherche). Lot lu au complet :
`chapitres/02-rester-ou-partir.md`, `chapitres/04-retombees-radioactives.md`, `chapitres/17-qui-cogne-a-la-porte.md`.
Aucun fichier du livre n'a été modifié. Les réécritures sont des exemples : aucun fait ni chiffre neuf ; quand une
réécriture rend explicite un lien que le chapitre laisse deviner, le lien vient du chapitre lui-même (l'étape citée).
Quand la raison manque et que le chapitre ne la donne nulle part, la réécriture le dit au lieu de l'inventer.

**En une phrase : le lot est compressé bien plus qu'il n'est délayé, et la compression passe presque toujours par le
deux-points.** Les faits sont là, les gestes aussi ; ce qui manque, ce sont les mots qui disent comment ils tiennent
ensemble (parce que, donc, alors, mais, sinon, comme ça, c'est pour ça que). Le lecteur doit refaire le raisonnement
à chaque phrase, et le tempo devient celui d'une fiche : arrêt, fait, arrêt, fait. Le délayage existe aussi, mais
sous une seule forme : la même chose redite d'une section à l'autre (tableaux trop longs, « Ce qu'on perd », « Ce qui
ne se remplace pas »). Le paragraphe du monoxyde que JP a lu sur l'épreuve a exactement ce profil : deux phrases en
« fait : conséquence », aucun mot de liaison.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`), comparé aux textes de référence

| texte | mots | phr. | m/phr | ≥30 % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 2 | 4955 | 253 | 19,6 | 15,0 | **46,6** | 34,4 | 6,3 | 10,7 | 4,6 |
| ch. 4 | 8053 | 375 | 21,5 | 24,3 | 38,9 | 29,9 | 4,8 | 18,0 | 4,5 |
| ch. 17 | 4630 | 214 | 21,6 | 22,4 | 36,9 | 30,4 | 4,3 | 13,6 | 5,0 |
| **le lot** | 17638 | 842 | 20,9 | 21,0 | **40,7** | **31,4** | 5,1 | 14,8 | **4,6** |
| fiches de l'Alberta | 2011 | 115 | 17,5 | 9,6 | 2,6 | 0,0 | 1,5 | 0,5 | 2,0 |
| Ripley 1946 | 2596 | 103 | 25,2 | 33,0 | 1,0 | 1,0 | 0,0 | 0,4 | 3,1 |
| Millet-Robinet | 2165 | 76 | 28,5 | 42,1 | 6,6 | 6,6 | 14,8 | 0,5 | 12,5 |
| Wikilivres, survie | 2252 | 98 | 23,0 | 24,5 | 10,2 | 4,1 | 0,9 | 16,9 | 10,7 |
| **les références** | 9024 | 392 | 23,0 | 25,8 | **4,8** | **2,6** | 4,1 | 4,5 | **7,0** |

Ce que ça dit pour la densité :

- **La longueur n'est pas le problème.** Les références font des phrases plus longues (23 mots contre 20,9) et plus
  souvent très longues (25,8 % de 30 mots et plus, contre 21 %). Une phrase longue se lit bien quand elle est tenue par
  des « et », des « mais », des « parce que » et des « qui ». Celles du lot sont tenues par des deux-points et des
  points-virgules.
- **Le deux-points est huit fois plus fréquent que dans les références** (40,7 % des phrases contre 4,8 %), et la
  phrase en « fait : conséquence » douze fois plus (31,4 % contre 2,6 %). Le ch. 2 est le plus haut du tome 1 (46,6 %).
- **Les mots de liaison parlés sont un tiers moins nombreux** (4,6 pour 1000 mots contre 7,0). Comptés un par un
  (script de travail sur le même nettoyage que `tempo.py`) : « donc » 0,0 à 0,2 pour 1000 mots dans le lot, contre 1,4
  (Millet-Robinet) et 2,2 (Wikilivres) ; « mais » 0,2 à 0,5 contre 1,2 à 2,2 ; « parce que » 0,0 à 0,9 ; la mise en
  relief « c'est… qui / que » : 0 dans le lot, 2,3 pour 1000 mots chez Millet-Robinet.
- **Les renvois entre parenthèses hachent la phrase** : 270 renvois (« (étape 12) », « (ch. 25, ch. 83) »,
  « (section 7, « … ») ») dans le lot, soit un tous les 65 mots ; 145 au ch. 4 seul, un tous les 56 mots. Les
  références en ont de 0 à 0,9 pour 1000 mots.

### À quoi sert le deux-points dans le lot

Échantillon de 36 phrases à deux-points, tirées au hasard parmi les 341 du lot, et classées à la main selon le mot
qu'on dirait à voix haute à sa place :

| Ce que fait le deux-points | Phrases | Exemple tiré de l'échantillon |
| --- | --- | --- |
| Étiquette : titre de situation, condition, ligne de Matériel, « Ce qu'on perd : », renvoi | 13 | « Lien : répondre à trois questions. » |
| Annonce d'une liste ou d'exemples | 9 | « La moitié de ce temps sert aux imprévus : une route à pelleter, un demi-tour… » |
| **Remplace « parce que »** | 6 | « Ne jamais mettre d'antigel à moteur : il est toxique et reste dans la tuyauterie… » |
| **Remplace « donc » ou « alors »** | 5 | « Le ruisseau qui coule boueux […] est le plus chargé : ne pas y puiser. » |
| Précision : « c'est-à-dire », « par exemple », « comment » | 3 | « Le froid ralentit la chimie de la batterie […] : à −18 °C, une batterie… » |

Le même signe fait cinq travaux différents. Dans près d'un tiers des cas (11 sur 36), il tient la place d'un mot de
liaison qu'on dirait ; à l'échelle du lot, ça fait une centaine de phrases. L'oreille n'entend pas la différence entre
une étiquette, une liste et une cause : elle entend le même arrêt.

## 2. Les défauts, du plus grave au moins grave

### Motif 1. Le deux-points à la place du mot de liaison (gravité haute)

**Ce que c'est.** La raison ou la conséquence est collée au fait par un deux-points, sans le mot qui dit laquelle des
deux c'est. Le lecteur s'arrête, puis reconstruit le lien. Parfois le deux-points cache même une opposition (un
« mais ») et la phrase se lit à l'envers.

**Fréquence.** 40,7 % des phrases du lot ont un deux-points, 31,4 % sont en « fait : conséquence » (références : 4,8 %
et 2,6 %) ; environ une centaine remplacent un « parce que », un « donc » ou un « alors » (échantillon ci-dessus).

| Fichier, ligne | Le texte | La même chose bien dite |
| --- | --- | --- |
| ch. 2, l. 163 | « Le réfrigérateur reste froid environ 4 à 6 heures : compter 4 heures. » | « Le réfrigérateur reste froid environ 4 à 6 heures ; pour ne pas se tromper, on compte 4 heures. » |
| ch. 4, l. 395 | « Une batterie pleine fait marcher le poste longtemps : l'éteindre la nuit. » (le deux-points cache un « mais ») | « Une batterie pleine fait marcher le poste longtemps, mais il faut quand même l'éteindre la nuit pour la ménager. » |
| ch. 4, l. 179 | « Le bouchage arrête la poussière, pas le rayonnement : contre lui, il faut la masse autour de la pièce (étape 8). » | « Le bouchage arrête la poussière, mais pas le rayonnement ; ce qui arrête le rayonnement, c'est la masse autour de la pièce (étape 8). » |
| ch. 4, l. 576 | « La terre ne fait rien contre les microbes : désinfecter l'eau qui sort (ch. 10). » | « La terre n'arrête pas les microbes, alors il faut quand même désinfecter l'eau qui sort du filtre (ch. 10). » |
| ch. 4, l. 93 | « L'abri n'a pas besoin d'être étanche, et des fenêtres cassées n'enlèvent presque rien à la protection : on reste. » | « On y reste même si des fenêtres sont cassées, parce que l'abri n'a pas besoin d'être étanche et que des vitres cassées n'enlèvent presque rien à la protection. » |
| ch. 17, l. 332 | « **Ne jamais amorcer le siphon à la bouche** : on avale de l'essence de travers, et elle passe dans les poumons. » | « **Ne jamais amorcer le siphon à la bouche**, parce qu'on avale de l'essence de travers et qu'elle passe dans les poumons. » |

**La cause.** Aucune règle ne demande le deux-points, mais plusieurs le fabriquent :
- le modèle même de la règle 2 du skill `ecriture` : « Vidanger avant que la maison descende sous 5 °C : un tuyau plein
  fend en gelant. » Le skill enseigne la phrase en « fait : conséquence » comme la bonne phrase ;
- la section « Le tiret » du skill `ecriture` : les 5 665 tirets ont été remplacés, et la deuxième solution proposée est
  « les deux-points : « Une seule règle : la génératrice dehors. » » ; une partie des tirets est devenue des deux-points ;
- la règle 1 du skill `ecriture`, « Une phrase, une information. Deux faits, deux phrases. » : elle interdit le
  « parce que » qui tient deux faits dans une phrase, et le deux-points les recolle ;
- « Écrire dense. Environ 700 mots utiles par page en 8 × 10 » (`plan/decisions-jp.md`, règle 5) : le deux-points est
  le lien le plus court.

### Motif 2. Les faits posés côte à côte, sans lien entre eux ni avec le geste (gravité haute)

**Ce que c'est.** Le paragraphe en paraboles que le skill a déjà nommé (tableau du 15 octobre, ligne du ch. 3), mais en
plus petit, dans une étape : des faits justes, chacun dans sa phrase, et la conclusion (ce qu'on en fait) laissée au
lecteur. Dans le pire cas, la conclusion n'est écrite nulle part : le ch. 4 ne dit pas où se range l'orignal, la bête
qui compte le plus pour le lecteur.

**Fréquence.** Une douzaine de passages relevés à la lecture dans le lot (ch. 2, étapes 26, 27, 39 et 40 ; ch. 4,
étapes 12, 13, 18, 29 et 30 ; ch. 17, étapes 5 et 8).

| Fichier, ligne | Le texte | La même chose bien dite |
| --- | --- | --- |
| ch. 4, l. 258 | « Le caribou, qui mange du lichen l'hiver, vient en tête. Le lichen prend directement la poussière qui tombe dessus. Viennent ensuite les bêtes qui mangent des champignons et des plantes, et en dernier les bêtes nourries de grain entreposé à l'intérieur. L'orignal mange des ramilles toute l'année, et des feuilles et des plantes aquatiques l'été. » | « Le caribou vient en tête, parce qu'il mange du lichen l'hiver et que le lichen prend directement la poussière qui tombe dessus. Viennent ensuite les bêtes qui mangent des champignons et des plantes, et en dernier les bêtes nourries de grain entreposé à l'intérieur. L'orignal, qui mange des ramilles toute l'année, et des feuilles et des plantes aquatiques l'été, se range […] » : le rang de l'orignal manque, il se prend dans la source notée au suivi du ch. 4, sinon `[À VÉRIFIER]`. |
| ch. 2, l. 141 | « Sous stress, on arrondit de mémoire dans le sens de ce qu'on a envie de faire. » (seule, après « Écrire les quatre mesures sur papier ») | « Il faut les écrire, parce que sous le stress, quand on calcule de tête, on arrondit dans le sens de ce qu'on a envie de faire. » |
| ch. 17, l. 68 | « « Reculez » ne lui dit pas jusqu'où. Les virus respiratoires passent d'une personne à l'autre à moins de 2 m, quand le contact dure plus de 15 minutes. » | « Dire « Reculez » ne suffit pas : ça ne lui dit pas jusqu'où. On le garde à plus de 2 m parce qu'à moins de 2 m, les virus respiratoires passent d'une personne à l'autre quand le contact dure plus de 15 minutes. » |
| ch. 4, l. 139 | « Passé 40 ans, le risque d'un cancer de la thyroïde causé par l'iode radioactif est faible, le risque d'une mauvaise réaction au comprimé augmente, et le comprimé ne sert que si la thyroïde risque une très forte dose, assez forte pour la détruire. Quand la boîte ne suffit pas pour tout le monde, donner les comprimés d'abord aux enfants » | « Passé 40 ans, le risque d'un cancer de la thyroïde causé par l'iode radioactif est faible, alors que le risque d'une mauvaise réaction au comprimé augmente ; à cet âge, le comprimé ne sert que si la thyroïde risque une dose assez forte pour la détruire. C'est pour ça que, quand la boîte ne suffit pas pour tout le monde, on donne les comprimés d'abord aux enfants » |
| ch. 4, l. 185 | « Les premiers signes du monoxyde (le mal de tête, la nausée, l'envie de dormir) ressemblent à ceux de l'irradiation, et on reste couché au lieu d'agir. » (le « et » tient la place d'un « alors ») | « Les premiers signes du monoxyde (le mal de tête, la nausée, l'envie de dormir) ressemblent à ceux de l'irradiation : on risque donc de croire au rayonnement et de rester couché au lieu de chercher la source. » |
| ch. 2, l. 148 | « Plus il fait froid dehors, plus la maison perd vite. Refaire la mesure à chaque reprise de la décision (étape 43). » | « La maison perd ses degrés plus vite au début qu'ensuite, et plus vite quand il fait plus froid dehors : la vitesse mesurée le premier soir ne vaut pas pour toute la panne. C'est pour ça qu'on refait la mesure à chaque reprise de la décision (étape 43). » |

**La cause.** La règle 1 du skill `ecriture` (« Une phrase, une information ») sépare les faits ; les lignes « La
justification que le lecteur connaît déjà » et « La conséquence évidente d'un fait qu'on vient de dire » du tableau
« Les phrases » (et `plan/decisions-jp.md`, « no shit ») font couper la phrase qui relie, parce qu'elle a l'air
évidente à la personne qui écrit. Elle ne l'est pas pour la personne qui lit. Le skill nomme le défaut (« le
paragraphe en paraboles ») mais seulement à l'échelle d'une section 3 ; rien ne le cherche à l'échelle de l'étape.

### Motif 3. La notion tassée dans un nom abstrait (gravité haute)

**Ce que c'est.** Un raisonnement entier est rangé dans un nom (« la mesure », « le lien », « l'option », « la dose »,
« le délai de l'iode », « une épaisseur »), puis le nom sert de jeton dans les phrases suivantes. Le lecteur doit
déplier le nom à chaque fois. Au ch. 2, « les quatre mesures » ne sont jamais dites pour ce qu'elles sont : combien de
temps on peut tenir sur la chaleur, l'eau, la nourriture et le lien avec l'extérieur ; une « mesure » qui « dure moins
que le trajet » oblige à relire.

**Fréquence.** « Mesure » ou « mesures » 20 fois au ch. 2 ; « divise la dose par » 5 fois au ch. 4 ; une dizaine
d'autres noms-jetons relevés.

| Fichier, ligne | Le texte | La même chose bien dite |
| --- | --- | --- |
| ch. 2, l. 140 | « **Écrire les quatre mesures sur papier, montre en main : la chaleur, l'eau, la nourriture et le lien**, chacune en heures ou en jours. » | « **Écrire sur papier, montre en main, combien de temps on peut tenir sur quatre choses : la chaleur, l'eau, la nourriture et le lien avec l'extérieur.** On compte chacune en heures ou en jours ; ce sont les quatre mesures. » |
| ch. 2, l. 177 | « Elle dure moins que le trajet : partir maintenant, ou décider de rester pour de bon. Si on attend, ce qu'elle mesure manquera avant qu'on arrive. » | « Si on tient moins longtemps que le trajet : partir maintenant, ou décider de rester pour de bon. Si on attend encore, ce qui manque en premier sera épuisé avant qu'on arrive. » |
| ch. 2, l. 168 | « Si la réponse est non aux deux premières et qu'on ne connaît pas la troisième, le lien est la mesure la plus courte, même si tout le reste va bien. » | « Si on ne peut joindre personne, que personne ne sait où on est et qu'on ne sait pas à quelle heure quelqu'un va s'inquiéter, c'est le lien avec l'extérieur qui manque en premier, même si tout le reste va bien. » |
| ch. 2, l. 350 | « Sans information neuve, choisir l'option qu'on pourra le plus facilement défaire : l'hiver, avec de jeunes enfants et une auto dont on ne peut pas garantir le trajet, c'est presque toujours rester là où on est. » | « Sans information neuve, choisir ce qu'on pourra défaire le plus facilement. L'hiver, avec de jeunes enfants et une auto dont on n'est pas sûr qu'elle fera le trajet, c'est presque toujours de rester là où on est : on pourra encore partir plus tard, alors qu'une fois en route, on ne pourra peut-être ni continuer ni revenir (étape 35). » |
| ch. 4, l. 114 | « On compte les 24 heures d'abri à partir de l'éclair, et le délai de l'iode à partir de l'arrivée des retombées ou du panache (étape 14). » | « On compte les 24 heures d'abri à partir de l'éclair, et le temps qu'on a pour donner l'iode à partir de l'arrivée des retombées ou du panache (étape 14). » |
| ch. 4, l. 372 | « Chaque épaisseur de plus le coupe encore de moitié : cinq épaisseurs le divisent par 32, six par 64. » | « Chaque couche de plus de cette épaisseur (9 cm de terre tassée ou 6 cm de béton) le coupe encore de moitié : cinq couches le divisent par 32, six par 64. » |

**La cause.** La règle 6 du skill `ecriture` (« Le mot exact, et toujours le même ») fige le nom, et la règle 14 ne
demande l'explication qu'à la première apparition d'un « mot que le livre invente ». Rien ne dit qu'un nom qui porte un
raisonnement doit s'expliquer de nouveau quand il revient loin de sa définition. « Diviser la dose par N » vient du vocabulaire
des sources (le facteur de protection) ; le cadre le dit pourtant : « La source sert à vérifier un fait, jamais à
copier une forme. »

### Motif 4. L'ellipse qui oblige à relire : le petit mot de tempo coupé (gravité moyenne)

**Ce que c'est.** Un mot court qui portait le sens a sauté (« déjà », « comme ça », « mais », « pour le faire taire »,
« à la place de »), ou une proposition a perdu son verbe. La phrase reste grammaticale, mais il faut la lire deux fois.

**Fréquence.** Une dizaine de cas relevés dans le lot ; « déjà » apparaît 0 fois au ch. 2 et au ch. 17, 0,2 fois pour
1000 mots au ch. 4.

| Fichier, ligne | Le texte | La même chose bien dite |
| --- | --- | --- |
| ch. 2, l. 104 | « Faire les choses dans cet ordre : les personnes, les papiers, la chaleur, puis le bâtiment. Si on doit partir plus tôt que prévu, le plus important est fait. » | « Faire les choses dans cet ordre : d'abord les personnes, puis les papiers et la chaleur, le bâtiment en dernier. Comme ça, s'il faut partir plus tôt que prévu, le plus important est déjà fait. » |
| ch. 4, l. 420 | « On limite sans doute les sorties et la nourriture trop longtemps, ce qui coûte du poids et du moral, ou pas assez au mauvais moment (ch. 14). » | « Sans nouvelles, on limite sans doute les sorties et la nourriture plus longtemps qu'il le faut, ce qui coûte du poids et du moral ; ou bien on ne les limite pas assez au moment où il le faudrait (ch. 14). » |
| ch. 17, l. 11 | « Régler une visite imprévue à la porte, même d'un voisin, sans ouvrir et en une conversation courte : un seul adulte parle, la personne qui gèle passe avant tout, on donne sans montrer ce qu'on a, et on ne refuse qu'en donnant une destination. » | « Répondre à quelqu'un qui cogne à la porte, même un voisin, sans ouvrir et sans faire durer la conversation : un seul adulte parle, on s'occupe d'abord d'une personne qui gèle, on donne sans montrer ce qu'on a, et si on refuse, on dit à la personne où aller. » |
| ch. 2, l. 80 | « S'il sonne encore, appuyer sur le bouton de l'avertisseur en passant, et ressortir : s'il se remet à sonner dans les 6 minutes, le CO est encore fort. » | « S'il sonne encore, entrer juste le temps d'appuyer sur son bouton pour le faire taire, puis ressortir et attendre : s'il se remet à sonner dans les 6 minutes, le CO est encore fort. » |
| ch. 4, l. 455 | « Jamais de sel ni de chlorure de calcium. » | « Ne jamais mettre de sel ni de chlorure de calcium à la place du gypse. » La raison manque : la prendre dans la source notée au suivi du ch. 4, ou couper la phrase. |
| ch. 17, l. 154 | « un poisson fumé dont on ne sait pas s'il a été gardé à 4 °C ou moins depuis le fumage, et pendant 14 jours au plus. » | « un poisson fumé dont on ne sait pas s'il a toujours été gardé à 4 °C ou moins depuis le fumage, ni s'il a été fumé il y a plus de 14 jours. » |

**La cause.** La liste des « mots vides » du skill `ecriture` (tableau « Les mots » : « déjà, encore, tout, bien… ») et
`plan/decisions-jp.md` (« le « déjà », le « encore », le « tout »… dehors »). La correction de JP visait « de
l'automne », un complément qui décore ; la règle l'a étendue à des mots qui disent le temps (« déjà fait ») ou la
manière. Le même tableau sort aussi « C'est… qui / que » de mise en relief : le lot n'en a plus un seul, alors que c'est
la tournure parlée qui met l'idée principale en avant (« c'est le lien qui manque en premier »).

### Motif 5. La liste de noms à la place des gestes, articles et sujets coupés (gravité moyenne)

**Ce que c'est.** Après un deux-points, une suite de noms tient lieu d'actions (règle 0 du skill, déjà écrite, pas
appliquée) ; les articles tombent (« conserves, pots, sacs sous vide ») ; le sujet tombe dans les lignes de Matériel
(« mesure le rayonnement »). Une liste qui mélange des gens et un arrangement (« le voisin, le camp, une heure de
contact ») ne se lit avec le début de la phrase que pour un de ses membres.

**Fréquence.** Une quinzaine dans le lot, surtout dans le Matériel et en tête d'étape.

| Fichier, ligne | Le texte | La même chose bien dite |
| --- | --- | --- |
| ch. 2, l. 196 | « **Chiffrer le trajet avec la fiche de décision** : la durée mesurée en janvier ; le carburant de l'aller, et celui du retour tant qu'on ne sait pas si la route est ouverte jusqu'au bout ; l'heure d'arrivée, comparée à l'heure du coucher du soleil. » | « **Chiffrer le trajet avec la fiche de décision** : reprendre la durée mesurée en janvier ; compter le carburant de l'aller, et aussi celui du retour tant qu'on ne sait pas si la route est ouverte jusqu'au bout ; calculer l'heure d'arrivée et la comparer à l'heure du coucher du soleil. » |
| ch. 2, l. 92 | « **Ne rentrer aucun appareil fait pour l'extérieur ou le camping** : barbecue au charbon de bois ou au propane, réchaud de camping, chaufferette de camping. » | « **Ne rentrer aucun appareil fait pour l'extérieur ou le camping.** Ça veut dire le barbecue, au charbon de bois comme au propane, le réchaud de camping et la chaufferette de camping. » |
| ch. 4, l. 222 | « **Manger ce qui était dans la maison ou dans un contenant fermé** : conserves, pots, sacs sous vide, seaux à couvercle. Le contenu n'a rien reçu. » | « **Manger ce qui était dans la maison ou dans un contenant fermé** : les conserves, les pots, les sacs sous vide, les seaux à couvercle. La poussière n'a pas pu entrer dedans. » |
| ch. 2, l. 330 | « **Sans secours qui arrive** : compter sur le voisin le plus proche, le camp du groupe de chasse (ch. 16), une heure de contact convenue d'avance. » | « **Sans secours qui arrive** : compter sur le voisin le plus proche, sur le camp du groupe de chasse (ch. 16) et sur l'heure de contact convenue d'avance. » |
| ch. 2, l. 40 | « **Fiche de décision remplie d'avance** : la durée du trajet en janvier, le nombre de jours de bois, la température intérieure à laquelle on part. » | « **Fiche de décision remplie d'avance** : on y écrit la durée du trajet mesurée en janvier, le nombre de jours de bois qu'on a, et la température intérieure à laquelle on part. » |
| ch. 4, l. 37 | « **Compteur Geiger ou dosimètre à affichage** : mesure le rayonnement dans la pièce et dehors, et montre quand il a assez baissé pour sortir » | « **Compteur Geiger ou dosimètre à affichage** : il mesure le rayonnement dans la pièce et dehors, et il montre quand le rayonnement a assez baissé pour sortir. » |

**La cause.** Le modèle de ligne de Matériel de `CLAUDE.md` et du skill `ecriture` n'a pas de sujet :
« **Thermomètre à sonde** : porte les 74 °C à cœur. » ; la règle « une ligne par item, 15 à 20 mots » pousse à
tasser ; « Écrire dense, 700 mots utiles par page ». La règle 0 (« Pas une liste de noms qui tient lieu d'actions ») et
la règle 12 (« Une liste après deux-points ne mélange pas deux sortes de choses ») existent, mais le script ne les voit
pas, et la personne qui écrit ne les relit pas.

### Motif 6. L'étiquette fixe qui force un bout de phrase : « Ce qu'on perd : » (gravité moyenne)

**Ce que c'est.** Une étiquette suivie de deux-points revient à chaque variante d'urgence, et ce qui suit doit entrer
dans la case : un groupe nominal qui se lit avec « on perd ». Quand le contenu n'est pas une perte, la phrase dit le
contraire de ce qu'elle veut dire (« on perd une protection beaucoup plus faible »). Même famille : « Seule
exception : », « Sans quincaillerie : », « Lien : ».

**Fréquence.** « Ce qu'on perd : » 11 fois au ch. 4 ; 6 des 11 ne se lisent pas avec « perdre » : quatre sont des
phrases entières (l. 414, 467, 526, 620), et deux nomment autre chose qu'une perte (l. 381, qui dit le contraire, et l. 590). Le ch. 2 en fait une
section (« ### Ce qu'on perd »).

| Fichier, ligne | Le texte | La même chose bien dite |
| --- | --- | --- |
| ch. 4, l. 381 | « **Ce qu'on perd :** une protection beaucoup plus faible qu'un sous-sol de béton, qu'on ne peut pas chiffrer sans compteur, et des heures de travail pour la monter. » | « Cette protection est beaucoup plus faible que celle d'un sous-sol de béton, on ne peut pas la chiffrer sans compteur, et la monter prend des heures de travail. » |
| ch. 4, l. 590 | « **Ce qu'on perd :** du temps de trempage pour le poisson, et une eau courante froide qu'il faut trouver. » | « Pour le poisson, il faut trouver une eau courante sous 3 °C (étape 31). » (le temps de trempage vient d'être dit) |
| ch. 4, l. 620 | « **Ce qu'on perd :** le costume arrête la poussière et rien d'autre. Il ne rallonge pas d'une minute le temps qu'on peut passer dehors : le rayonnement du sol traverse un sac à ordures. » | « Le costume arrête la poussière, mais pas le rayonnement du sol, qui traverse un sac à ordures : il ne permet pas de rester dehors une minute de plus. » |
| ch. 4, l. 526 | « **Ce qu'on perd :** il faut quelqu'un pour tirer la corde ou éventer, à tour de rôle, même quand tout le monde est fatigué. » | « Il faut quelqu'un pour tirer la corde ou éventer, à tour de rôle, même quand tout le monde est fatigué. » |
| ch. 17, l. 58 | « Seule exception : une personne seule qui a un signe du froid (étape 7). » | « Il ne sort que pour une personne seule qui a un signe du froid (étape 7). » |

**La cause.** `gabarit-chapitre.md`, section 9 (Variante d'urgence) : « Nommer honnêtement ce qu'on perd en la
choisissant […] Et dire ce qui ne se remplace vraiment pas ». La consigne est bonne ; elle est devenue une étiquette
à remplir à chaque sous-section.

### Motif 7. Le renvoi qui tient lieu de raison, et les renvois qui hachent la phrase (gravité moyenne)

**Ce que c'est.** La raison d'un geste n'est pas écrite : un renvoi la remplace (« jamais assis dans l'auto
(étape 3) »), et le lecteur doit tourner les pages pour savoir pourquoi. Ailleurs, deux ou trois renvois tombent dans
la même phrase, souvent au milieu, et coupent le fil.

**Fréquence.** 270 renvois entre parenthèses dans le lot (58 au ch. 2, 145 au ch. 4, 67 au ch. 17), un tous les
65 mots ; références : de 0 à 0,9 pour 1000 mots.

| Fichier, ligne | Le texte | La même chose bien dite |
| --- | --- | --- |
| ch. 4, l. 396 | « Écouter le poste dans l'abri, jamais assis dans l'auto (étape 3). » | « Écouter le poste dans l'abri, jamais assis dans l'auto : on y reçoit plus de la moitié du rayonnement du dehors (étape 3). » |
| ch. 4, l. 285 | « On y perd du goût, et du gras (étape 30). » | « On y perd du goût et aussi du gras, alors qu'il faut garder le gras (étape 30). » |
| ch. 2, l. 321 | « écouter la radio de l'auto, moteur coupé, par tranches de quelques minutes, en alternant avec l'éclairage pour ménager la batterie (« Faire démarrer l'auto », plus bas). » | « écouter la radio de l'auto, moteur coupé, quelques minutes à la fois, et pas en même temps que l'éclairage : la batterie ne peut pas tout faire, et il faut la garder pour démarrer. » |
| ch. 2, l. 22 | « **Feu ou tempête annoncé, avec le temps de choisir** (étapes 25 à 42, et pour le feu, étape 37 ; pour se préparer : ch. 7). » | « **Feu ou tempête annoncé, avec le temps de choisir** (étapes 25 à 42). » (l'étape 37 et le ch. 7 se trouvent depuis l'étape) |
| ch. 17, l. 87 | « Lui donner à boire chaud et sucré, à petites gorgées, seulement si elle est bien éveillée, qu'elle n'est pas confuse et qu'elle avale bien (ch. 25, étapes 10 et 11). » (deuxième renvoi au ch. 25 dans la même étape) | « Lui donner à boire chaud et sucré, à petites gorgées, seulement si elle est bien éveillée, qu'elle n'est pas confuse et qu'elle avale bien. » (le renvoi au ch. 25 reste en tête de l'étape) |

**La cause.** La règle contre la répétition (skill `ecriture`, « Un fait se dit une fois par chapitre […] Ailleurs, un
renvoi court ») et `CLAUDE.md` (« ici, il reste un renvoi court (« ch. 3, étape 28 ») »). La règle visait le fait redit ;
elle a aussi remplacé par un renvoi la raison en quelques mots, qui n'est pas une redite quand elle sert au geste. Rien
ne limite le nombre de renvois par phrase ni par étape.

### Motif 8. Le délayage : la même chose redite d'une section à l'autre (gravité moyenne)

**Ce que c'est.** Le seul vrai remplissage du lot. Les tableaux redisent les étapes, et les cases de fin de variante
(« Ce qu'on perd », « Ce qui ne se remplace pas ») redisent ce qu'on vient de lire. Un même fait revient deux ou trois
fois, parfois dans deux phrases qui se suivent.

**Fréquence.** Les tableaux font 15 et 12 lignes au ch. 2, 12 et 11 au ch. 4, 9 et 12 au ch. 17 : 71 lignes pour 48 au
plus. Une dizaine de faits redits deux ou trois fois (le comprimé que rien ne remplace : 3 fois ; le détecteur de
laboratoire : 3 fois ; l'arme montrée : 2 fois mot pour mot ; l'onde AM le soir : 3 fois).

| Fichier, ligne | Le texte | La même chose bien dite |
| --- | --- | --- |
| ch. 2, l. 266 | « \| Première heure, à la maison \| Eau du robinet \| Ni panne de courant, ni bris, ni baisse de pression \| Un des trois : faire bouillir l'eau à gros bouillons 1 min (étape 28) \| » | Ligne coupée : l'étape 28 le dit, et le tableau a 15 lignes pour 8 au plus. |
| ch. 17, l. 211 | « Le visiteur sait qu'il y a une arme ici, et jusqu'où va la famille » (l'étape 11, l. 117 : « Il apprend aussi qu'il y a une arme dans la maison, et jusqu'où la famille est prête à aller. ») | Dans le tableau, la colonne « Diagnostic » renvoie à l'étape 11, et l'action reste : « Sortir l'arme de la pièce où l'on reçoit (étape 24), et s'attendre à une deuxième visite, pas forcément de la même personne. » |
| ch. 4, l. 343 | « Rien ne remplace le comprimé (étape 12). Il reste à ne pas avaler d'iode radioactif. » (aussi l. 121 : « Aucun autre iode ne le remplace. » ; l. 625 : « **Les comprimés d'iode** (étape 12). ») | « Sans comprimés, il reste à ne pas avaler d'iode radioactif. » La ligne de « Ce qui ne se remplace pas » sort. |
| ch. 4, l. 467 | « un électroscope maison ne voit que les débits élevés. Il ne dira jamais si un lichen, un champignon ou un quartier d'orignal est chargé, et c'est la question des années suivantes : pour elle, il faut le détecteur d'un laboratoire. » (le détecteur de laboratoire est aussi à la section 6, l. 335, et à la l. 626) | « Un électroscope maison ne voit que les débits élevés : il ne dira jamais si un lichen, un champignon ou un quartier d'orignal est chargé (section 6). » |
| ch. 2, l. 323 | « La bande AM porte beaucoup plus loin après le coucher du soleil qu'à midi : on capte parfois à 22 h une station qu'on n'entendait pas à 14 h. Essayer le jour et le soir. » (et la note « L'onde AM, la nuit ») | « La bande AM porte beaucoup plus loin après le coucher du soleil qu'à midi : essayer de nouveau le soir une station qu'on n'a pas captée le jour. » |
| ch. 4, l. 585 | « **Ce qu'on perd :** du temps et du débit. La décantation prend 6 heures, le filtre ralentit, et il faut le refaire. » | Paragraphe coupé : les 6 heures, le débit qui baisse et le filtre à refaire sont dits juste avant (l. 555, 573 à 576). |

**La cause.** `gabarit-chapitre.md`, section 6 (« Tableau à structure fixe : moment, ce qu'on vérifie, cible chiffrée,
quoi faire si c'est hors cible ») : la colonne « Cible chiffrée » oblige à une case même quand il n'y a pas de chiffre
(« Silencieux », « **1** », « Quelques heures au plus »). La limite de 5 à 8 lignes (JP, 28 octobre 2026) n'est appliquée
qu'aux ch. 1 et 3 (`plan/demandes-jp-epreuve-tome-1.md`, demande 10). Et la section 9 du gabarit (« Nommer ce qu'on
perd », « dire ce qui ne se remplace vraiment pas ») se remplit avec ce qui est déjà écrit plus haut.

### Motif 9. Les conditions empilées : la phrase-liste au point-virgule (gravité basse)

**Ce que c'est.** Plusieurs propositions, chacune avec son « et » et son renvoi, empilées au point-virgule après un
deux-points, parfois avec un deux-points dans la liste. La phrase peut dépasser 90 mots ; elle est dense non pas parce
qu'elle est longue, mais parce qu'elle n'a pas de structure qu'on entend.

**Fréquence.** 22 phrases de 45 mots et plus dans le lot (la plus longue : 96 mots, ch. 4, étape 18) ; quelques cases de
tableau qui portent une procédure entière.

| Fichier, ligne | Le texte | La même chose bien dite |
| --- | --- | --- |
| ch. 4, l. 210 | « Ce qui pousse à rester : les retombées d'une détonation sont arrivées depuis peu, et à la première heure après l'explosion, le rayonnement dehors est environ dix fois plus fort qu'à la septième (étape 4) ; le panache passe encore, et dans la maison fermée, on respire beaucoup moins d'iode radioactif que dehors, ce qui compte surtout pour les personnes qui n'ont pas pris de comprimé d'iode (étape 12 ; section 7, « Sans comprimés d'iode ») ; une fois la source éliminée, tout le monde est réveillé et répond ; l'abri est un sous-sol ou le caveau, qui protège beaucoup (étape 8). » | « Ce qui pousse à rester : », puis une puce de liste par raison, sans renvoi au milieu : « les retombées viennent d'arriver : à la première heure après l'explosion, le rayonnement dehors est environ dix fois plus fort qu'à la septième » ; « le panache passe encore : dans la maison fermée, on respire beaucoup moins d'iode radioactif que dehors, et ça compte surtout pour les personnes qui n'ont pas pris de comprimé » ; « une fois la source éliminée, tout le monde est réveillé et répond » ; « l'abri est un sous-sol ou le caveau, qui protège beaucoup ». |
| ch. 17, l. 195 | « À moins de 2 m, moins de 15 min. L'hiver, 10 min au plus à partir de −28 de refroidissement éolien, 5 min au plus à partir de −40 ; à partir de −48, aucune conversation dehors : décider par la fenêtre ; sans thermomètre, décider tout de suite, par la fenêtre » (une case de tableau qui porte des chiffres que les étapes ne disent pas) | Dans l'étape 7, en phrases : « L'hiver, la conversation dehors dure 10 minutes au plus à partir de −28 de refroidissement éolien, et 5 minutes au plus à partir de −40. À partir de −48, ou sans thermomètre, on ne parle plus dehors : on décide tout de suite, par la fenêtre. » |
| ch. 2, l. 185 | « l'heure de rétablissement prévue par Hydro-Québec a été repoussée deux fois : on ne connaît plus le délai, même si la maison est encore habitable ; » (un deux-points dans une liste ouverte par un deux-points) | « l'heure de rétablissement prévue par Hydro-Québec a été repoussée deux fois, et on ne connaît plus le délai, même si la maison est encore habitable ; » |

**La cause.** Pas de règle précise : c'est l'habitude de tout garder dans l'étape (règle « tout est dans l'orange » et
« chaque fait garde une seule place ») sans découper. Le cadre demande pourtant de découper une étape qui a plusieurs
gestes en sous-étapes ; rien ne le demande pour une étape qui a plusieurs raisons.

### Motif 10. La phrase de rapport de recherche (gravité basse)

**Ce que c'est.** Le fait est dit comme dans l'étude d'où il vient : « dans des maisons mesurées », « on a rapporté »,
« il n'existe aucune température reconnue », « les tables qui le font ». C'est du délayage : le lecteur apprend comment
on sait, pas seulement ce qu'il faut faire.

**Fréquence.** Cinq ou six passages dans le lot.

| Fichier, ligne | Le texte | La même chose bien dite |
| --- | --- | --- |
| ch. 2, l. 145 | « Dans des maisons sans chauffage, mesurées par environ −8 °C dehors, l'air est passé de 20 à 14 °C dans les premières heures, puis il a baissé beaucoup plus lentement » | « Par environ −8 °C dehors, une maison sans chauffage peut passer de 20 à 14 °C dans les premières heures, puis elle refroidit beaucoup plus lentement » |
| ch. 2, l. 153 | « Il n'existe aucune température reconnue à partir de laquelle on doit quitter une maison : partir à la température écrite d'avance sur la fiche de décision, choisie en pensant au plus jeune. » | « Aucune température ne dit à elle seule quand partir : on part à celle qu'on a écrite d'avance sur la fiche de décision, en pensant au plus jeune. » |
| ch. 4, l. 164 | « Pour les autres, le risque est très faible : en Pologne, après Tchornobyl, 7 millions d'adultes ont pris de l'iode, et on a rapporté deux réactions graves, chez deux personnes qui se savaient allergiques à l'iode. » | « Pour les autres, le risque est très faible : après Tchornobyl, sur 7 millions d'adultes qui ont pris de l'iode en Pologne, deux seulement ont fait une réaction grave, et les deux se savaient allergiques à l'iode. » |
| ch. 4, l. 464 | « On ne peut pas convertir ces lectures en débit de dose : les tables qui le font ne valent que pour l'appareil qu'elles décrivent, construit à ses dimensions exactes. » | « Ces lectures ne donnent pas de chiffre de dose. » |

**La cause.** `CLAUDE.md` (« la statistique d'ambiance […] la justification du cadrage ») et le cadre (« La source sert
à vérifier un fait, jamais à copier une forme ») le disent, mais le skill `ecriture` n'a pas de ligne « le récit de
l'étude » dans son tableau, et le script ne cherche ni « on a rapporté » ni « il n'existe aucun ».

## 3. Ce qui marche : des passages qui peuvent servir de modèles

1. **Ch. 17, l. 47 (étape 1).** « Tant que la porte reste fermée, on décide de la distance, du temps que dure la visite
   et de ce que la personne voit. Une fois entrée, elle est à un mètre, elle reste le temps qu'elle veut, et elle a vu
   la pièce, le poêle et les enfants. » Deux phrases qui se répondent (« tant que », « une fois »), aucun deux-points,
   des choses qu'on voit, avec leurs articles. La raison du geste arrive comme une image qu'on comprend tout de suite.
2. **Ch. 17, l. 144 (étape 18).** « Les premiers signes du monoxyde (le mal de tête, la fatigue, la nausée, les
   étourdissements) sont ceux qu'on attend d'une personne qui arrive d'une longue route en motoneige par grand froid. Si
   on les prend pour la fatigue du voyage et qu'on la laisse dormir dans le hangar avec son réchaud allumé, le monoxyde
   peut la tuer pendant son sommeil. » Le fait qui surprend, puis un « si… et que… » qui porte toute la logique.
3. **Ch. 2, l. 368.** « Souvent, il suffit de décrocher la batterie, de la rentrer quelques heures près du poêle et de la
   remonter juste avant de partir. Une fois rentrée, elle peut aussi éclairer la maison, mais elle ne fera pas les
   deux : le démarrage passe avant. » « Souvent, il suffit de », trois verbes enchaînés, un « mais » ; un seul
   deux-points, au bout, pour la décision.
4. **Ch. 2, l. 137 (étape 25).** « On y apprend ce qu'on ne voit pas de la fenêtre : un feu qui tourne, un pont fermé,
   un panache de fumée. Au chalet, si la radio ne dit rien de la région, ça ne prouve pas que tout va bien : la nouvelle
   ne s'est peut-être pas rendue jusqu'à la station. » Des mots qu'on dit (« ça ne prouve pas », « peut-être »), une
   liste avec ses articles, et un deux-points qui annonce une explication qu'on attend.
5. **Ch. 4, l. 547.** « Après une détonation, presque tout le danger de l'eau est dans la poussière qui flotte : moins de
   2 % de sa radioactivité se dissout, et enlever la poussière enlève presque tout. Le panache d'une centrale lointaine
   dépose au contraire un césium qui se dissout presque en entier dans l'eau. La terre de la décantation et du filtre
   retient fortement le césium dissous, mais mal l'iode radioactif » Trois faits techniques, tenus par « au contraire »
   et « mais » : on suit le raisonnement sans relire.

## 4. Ce que ça demande aux règles (pour la réécriture du skill)

Propositions tirées de ce lot ; elles ne touchent aucun fait du livre.

1. **Remplacer « Écrire dense » par « écrire plein, avec ses liens ».** Une phrase qui n'apprend rien saute toujours ;
   un mot qui relie deux faits n'est pas un mot vide. Le quota de 700 mots utiles par page sort de la règle de
   l'écriture (il appartient à la mise en pages).
2. **Le deux-points a un seul travail** : annoncer une liste ou une explication qu'on attend. Pour une cause, on écrit
   « parce que » ; pour une conséquence, « donc », « alors », « c'est pour ça que » ; pour une opposition, « mais ».
   Proposition de cible mesurée par `tempo.py` sur un chapitre : moins de 15 % de phrases à deux-points et moins de
   10 % en « fait : conséquence » (références : 4,8 % et 2,6 % ; lot : 40,7 % et 31,4 %). Le modèle de la règle 2
   (« Vidanger avant que… : un tuyau plein fend en gelant ») se réécrit avec « parce que ».
3. **La règle 1 devient « une phrase, une idée, avec ses liens »** : deux faits liés par une cause restent ensemble.
4. **Sortir de la liste des mots vides** les mots qui disent le temps ou la logique : « déjà », « encore », « donc »,
   « alors », « comme ça », et garder la mise en relief « c'est… qui » quand elle porte l'idée principale.
5. **Les renvois** : au plus un par phrase, en fin de phrase ; jamais à la place d'une raison qui tient en quelques
   mots. Le script compte les renvois par 1000 mots.
6. **« Ce qu'on perd »** : une phrase, pas une étiquette. Le gabarit le dit en prose, sans case.
7. **Un nom qui porte un raisonnement** (« la mesure », « le lien », « la dose ») s'explique de nouveau quand il revient loin de
   sa définition.
8. **Un auditeur « densité »** qui ne fait que ça, phrase par phrase : pour chaque deux-points, dire le mot qu'on
   dirait à voix haute à sa place ; pour chaque paragraphe de faits, dire ce que le lecteur en fait, et vérifier que
   c'est écrit.

## 5. Liste de contrôle (cadre-agents.md, les lignes de l'écriture et de la langue)

- [x] `.claude/cadre-agents.md` lu au complet ; skill `ecriture` lu au complet, avec ses tableaux.
- [x] Lire seulement ce que la tâche touche : les trois chapitres du lot, les mesures, les règles par grep.
- [x] Sorties de commande coupées.
- [x] Règle 1 : aucun chiffre ni fait neuf dans les réécritures ; quand la raison manque, elle est signalée, pas inventée.
- [x] Ne rien commiter ; aucun fichier existant modifié : seulement ce fichier.
- [x] Règle 0 : chaque réécriture relue à voix haute.
- [x] Pas de loi en formule, de maxime, de chute ni d'image poétique dans les réécritures.
- [x] Pas de chose qui pense ou qui veut dans les réécritures.
- [x] Consignes à l'infinitif ou en « on », jamais au pronominal ; sujet nommé.
- [ ] Points de contrôle et signes d'échec à 5 à 8 lignes : relevé (motif 8), pas corrigé, ce n'est pas la tâche.
- [x] Un passage repéré se juge d'abord : doit-il exister ? Plusieurs réécritures sont des coupes (motifs 8 et 10).
- [x] Notion expliquée dès sa première apparition : relevé pour « les quatre mesures » (motif 3).
- [x] Le mot qu'on dit : pas de « à défaut », « davantage », « lorsque », « afin de » dans les réécritures.
- [x] Aucun tiret long ni demi-tiret dans les phrases des notes ni des réécritures (les puces markdown ne sont pas des tirets).
- [x] Pas deux séries de « ou » dans une même réécriture.
- [x] Pas de tutoiement, pas de joual dans les réécritures.
- [x] `langue.py` passé sur ce fichier de notes (voir le rapport).
