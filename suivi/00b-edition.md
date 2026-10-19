# Édition : Chapitre 00b, Acheter par priorité

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/00b-acheter-par-priorite.md` tel qu'il était au début de l'édition, c'est-à-dire avec
  les corrections du rédacteur du 19 octobre qui ne sont pas encore commitées (avertisseur de CO, sachets de
  réhydratation, sel nitrité, javel sans seringue, cuisson au bouilli). Relu du titre à la dernière ligne, phrase par
  phrase, cellule par cellule, à voix haute. Copie d'avant l'édition gardée pour `controle.py --avant`.
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31),
  `plan/glossaire.md` (chaudière contre seau), `design/directions/1-manuel-de-terrain/outils/ancrage.py` (`PALIER_RE`).
- **Aucune source nouvelle cherchée, aucun chiffre ni aucun fait changé.** Ce qui touche un fait est signalé plus bas.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé.
- **Ancres :** le chapitre n'a ni planche ni photo (`placements-tome-1.json`, clé `"00b"` vide). Aucun intertitre
  renommé : les paliers, les lettres 1.A à 2.F et A à G restent, puisque le texte et les autres chapitres y renvoient
  (« ligne 1.A », « dernière partie, E »).
- **Les quatre tirets des titres de palier restent** (« ## Palier 1 — À acheter absolument ») : `ancrage.py` les lit
  (`PALIER_RE = ^Palier\s+(\d)\s+—\s+(.*)$`) pour composer l'étiquette du palier. Les enlever casse la mise en pages.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 17 121 | 17 104 |
| Tirets | 4 (titres de palier, lus par `ancrage.py`) | 4 (les mêmes) |
| « § », mots bannis, maximes | 0 | 0 |
| Vocabulaire d'IA | 1 (« Essentiel », nom du palier 2) | 1 (le même) |
| Âges à juger | 1 (« moins de 6 ans », un fait sur le plomb) | 1 (le même) |
| Tournures à juger | 0 | 0 (une, apparue en cours d'édition dans « Sans papier hygiénique », réécrite) |
| Mises en relief à juger | 3 | 3, gardées : la fièvre qui ne devient pas plus dangereuse sans comprimés (fait qui surprend) ; le pantalon de coupe, « la seule pièce qui fait quelque chose » (l'exemple de `CLAUDE.md`) ; la toile de coton, « la seule qu'on peut chauffer au poêle » |
| Mots vides à juger | 58 | 57 |
| Redites à juger | 1 | 1 (« on les fait sécher près du » : les coins de fendage et les carrés de tissu, deux choses) |
| Invariants disparus | | « 1 minute » et « 5 minutes » une fois chacun : les durées d'ébullition étaient dans la ligne de la marmite (1.B) et dans la partie A ; elles restent dans A, et la ligne de la marmite y renvoie |

## Les phrases changées

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Comment lire ; 1.D sel | « quatre seaux de 5 kg » ; « en seaux de 5 kg » | « quatre chaudières de 5 kg » ; « en chaudières de 5 kg » | Glossaire (chaudière) ; un seul mot par chose (« chaudière » à la ligne des cendres). « Seau de nuit » reste : c'est le mot du ch. 31 |
| 2 | 1.B, marmite | « …s'épuise : 1 minute à gros bouillons pour…, 5 minutes pour… » | « …s'épuise ; les durées d'ébullition sont à la dernière partie, A. » | Redite (A dit les durées avec le geste) |
| 3 | 1.C, bois | « l'eau du bois compte plus que l'essence » | « … plus que l'espèce d'arbre » | « Essence » veut dire carburant partout ailleurs dans le chapitre |
| 4 | 1.E, acétaminophène | « et donnée pendant une grippe… » ; « une rupture, une date passée ou un flacon gelé n'en enlève alors qu'un » | « et si on la donne à un enfant pendant une grippe… » ; « si l'un manque, est périmé ou a gelé dans son flacon, il reste l'autre » | Participe inséré ; noms à la place du fait |
| 5 | 1.E, alcool | « Assez pour finir une descente, pas jusqu'à la dernière bouteille » ; « la réserve décide donc si l'arrêt se fait en descente… ou d'un coup » | « Assez pour mener une descente jusqu'au bout sans tomber à court » ; « avec une réserve assez grande, l'arrêt se fait en descente… ; sinon, il se fait d'un coup » | Phrase à déchiffrer ; chose qui décide |
| 6 | 1.E, thermomètre | « La fièvre sépare un enfant qui… » | « En mesurant la fièvre, on distingue un enfant qui… » | Chose qui agit |
| 7 | 1.F, radio | « et quand l'abri finit » | « et le moment où on peut sortir de l'abri » | Règle 0 |
| 8 | 1.G, extincteur | « Les trois lettres disent ce qu'il éteint » | « Chaque lettre désigne ce qu'il éteint » | Chose qui parle (« la couleur dit ») |
| 9 | 1.G, cache | « À −35 °C, on ne survit pas longtemps dehors en pyjama : la cache donne… quand le bâtiment brûle. » | « Quand le bâtiment brûle, l'hiver à −35 °C, la cache donne… » | Évidence |
| 10 | 1.G, trousse | « une trousse à remplir le jour même ne part pas » | « le jour même, on n'a pas le temps de la remplir » | Maxime |
| 11 | 1.G, auto | « la couverture de laine arrête la chaleur sur la peau ; une couverture synthétique ne le fait pas » | « …protège la peau de la chaleur ; une couverture synthétique ne la protège pas » | Règle 0 |
| 12 | 1.H, fiche | « Écrites, n'importe qui peut les lire » | « Si elles sont écrites, n'importe qui peut les lire » | Participe qui ne se rapporte pas au sujet |
| 13 | Ce qui n'est pas au palier 1 | « le moins probable des événements du tome » ; « **Le fumoir, l'autoclave et le jardin** produisent et transforment. Le palier 1 sert… » | « le moins probable des sinistres » ; « … servent à produire et à transformer la nourriture ; le palier 1 sert… » | Phrase qui parle du livre ; verbes sans objet |
| 14 | 2.A, analyse | « Sans elle : dernière partie, A » | « Sans elle, voir la dernière partie, A » | Étiquette |
| 15 | 2.A, génératrice | « La génératrice tourne dehors, jamais… » | « On fait tourner la génératrice dehors, jamais… » | Consigne au présent qui décrit |
| 16 | 2.A, antigel | « Une plomberie qui éclate fait d'une panne de trois jours trois mois de travaux » | « Si la plomberie éclate, une panne de trois jours laisse trois mois de travaux » | Formule |
| 17 | 2.A, hache | « on chauffe le chalet à la hache » | « on fait tout le bois du chalet à la hache » | Image |
| 18 | 2.B, .22 | « et elle craint l'humidité bien plus que les autres » | « et l'humidité l'abîme bien plus que les autres cartouches » | Chose qui pense |
| 19 | 2.B, calibre 12 | « Une seule sorte de grenaille par veste : le plomb de la gélinotte ne voyage jamais avec l'acier du canard » | « On garde une seule sorte de grenaille par veste, pour ne jamais mêler le plomb de la gélinotte à l'acier du canard » | Nom sans verbe ; consigne au présent qui décrit |
| 20 | 2.C, sel nitrité | « Le salpêtre ne le remplace pas » | « Le salpêtre (nitrate de potassium) ne le remplace pas » | La forme moderne du salpêtre (convention du gabarit) passe ici, où le fait reste (voir 31) |
| 21 | 2.C, pH | « et la choucroute est la vitamine C de janvier » | « et en janvier, la choucroute fournit la vitamine C » | Image |
| 22 | 2.D, papier hygiénique | « Le tissu remplace les trois, comme le faisaient les générations d'avant, mais il faut alors laver du linge souillé tout l'hiver : de l'eau chaude, du savon et une corde à linge dans la maison (dernière partie, E). » | « Le tissu remplace les trois, mais il faut alors laver du linge souillé tout l'hiver (dernière partie, E). » | Complément qui décore ; redite (E le dit) |
| 23 | 2.D, gourde | « dans son sac de couchage » | « dans le sac de couchage de l'enfant » | Possessif qui oblige à chercher |
| 24 | 2.D, guide | « et les plantes poussent loin du réseau » | « et on cueille loin du réseau » | Chute en formule |
| 25 | Palier 4, chapeau | « Le confort, ce qui double un autre objet, et ce qu'on peut bricoler autrement. Rien ici ne manque… » | « Ce sont les objets de confort, ceux qui doublent un autre objet, et ceux qu'on peut bricoler autrement. Aucun ne manque… » | Noms sans verbe |
| 26 | Palier 4, arbustes | « Ce qui n'est pas en terre trois ans avant la crise ne nourrit personne pendant la crise » | « Il faut mettre ces plantes en terre au moins trois ans avant la crise pour en manger pendant la crise » | Maxime |
| 27 | Palier 4, poste à souder | « …plusieurs heures après : on a le coup d'arc au souper, pas à l'atelier, et la personne qui passait… » | « Quelques secondes d'arc brûlent l'œil (le coup d'arc), et la douleur arrive plusieurs heures après ; la personne qui passait… » | Opposition en image, redite du « plusieurs heures après » |
| 28 | Dernière partie, chapeau | « Pour chaque objet qui manque : le geste qui le remplace, et ce qu'on y perd en rendement, en durée de garde ou en marge d'erreur. » | *(rien)* ; la phrase sur le tableau G reste | Annonce |
| 29 | A | « **Faire bouillir remplace le filtre, la javel et les bandelettes contre les microbes.** » ; « Il sert avant l'ébullition » ; « consomme le chlore avant les microbes » | « **Faire bouillir l'eau remplace le filtre et la javel contre les microbes, et on n'a plus besoin des bandelettes.** » ; « On le passe avant l'ébullition » ; « consomme le chlore avant qu'il atteigne les microbes » | Les bandelettes ne tuent rien ; règle 0 |
| 30 | B, lampe à graisse | « une mèche de coton torsadé, un bout qui sort de quelques millimètres, appuyé sur le bord » ; « fait fondre le gras…, le gras monte » ; « *Ce qu'on perd :* de la suie sur les murs…, une flamme nue…, et la lumière : … » ; « …il y a du monoxyde, qui ne se voit pas. » | « une mèche de coton, appuyée sur le bord, et on en laisse sortir un bout de quelques millimètres » ; « fait fondre la graisse…, la graisse fondue monte » ; « *Ce qu'on perd :* la lampe à graisse fait de la suie, qui se dépose…; elle met une flamme nue… ; et elle éclaire assez pour… » ; « …quand on voit de la suie, il y a aussi du monoxyde. » | Participes en chaîne ; un seul mot par chose (graisse, et « tressé » de la mèche au paragraphe suivant) ; on ne « perd » pas de la suie ; chute |
| 31 | B, mèche, allumage, bois sec | « Du coton tressé, sans fil… » ; « des retailles de coton dans une boîte…, posée sur les braises…, puis refroidie fermée » ; « Quatre tests qui ne coûtent rien. » ; « Ces tests disent « sec » ou « pas sec », jamais 20 %. » | « On la fait en coton tressé, sans fil… » ; « on met des retailles de coton dans une boîte…, on la pose sur les braises…, puis on la laisse refroidir sans l'ouvrir » ; « On fait quatre tests, qui ne coûtent rien. » ; « Avec ces tests, on sait si le bois est sec ou non, pas s'il est à 20 %. » | Noms et participes à la place des gestes ; chose qui parle |
| 32 | C, balance | « On fait un fléau : une latte…, avec deux plateaux… » ; « une seringue de pharmacie en tire des masses de 100 g et de 10 g » ; « et le chalet a un jeu de poids pour la vie » ; « **Les masses de plomb restent sur le plateau…** » ; « ne lit pas le gramme » ; « Le salpêtre (nitrate de potassium) ne le remplace pas : on ne dose pas les deux de la même façon. » | « On fait un fléau avec une latte…, et deux plateaux… » ; « avec une seringue de pharmacie, on mesure 100 mL et 10 mL d'eau, qui font des masses de 100 g et de 10 g » ; « on a alors un jeu de poids qui ne s'use pas » ; « **On laisse les masses de plomb sur le plateau des poids, et on ne les met jamais en contact avec l'aliment** » ; « ne pèse pas au gramme près » ; *(rien : redite de la ligne 2.C, voir 20)* | Règle 0 ; chute ; consigne au présent qui décrit ; redite |
| 33 | C, thermomètre | « …pas une mesure, et rien ne se voit quand le gibier atteint **74 °C à cœur**. » | « …pas une mesure : rien ne change à l'œil quand le gibier atteint 74 °C. » | « 74 °C à cœur » deux fois dans deux phrases (il reste en gras dans le titre du paragraphe) |
| 34 | C, gambrel | « Une perche de bois franc…, une encoche…, une entaille… » ; « **Personne sous la charge** » | « On taille le gambrel dans une perche de bois franc… : une encoche…, une entaille… » ; « **Personne ne passe sous la charge** » | Noms sans verbe |
| 35 | C, contenants | « …ou un baril de bois franc doublé d'un sac…, comme faisaient les vieux. Le sel humide attaque l'aluminium, le galvanisé, le cuivre et la fonte nue, et ce qui passe dans la saumure passe dans la viande. » | « …ou on double un baril de bois franc d'un sac… On ne prend pas de fonte nue : le sel humide l'attaque comme l'aluminium, le fer galvanisé et le cuivre (ligne 2.C). » | Complément qui décore ; redite de la ligne 2.C (seule la fonte nue est neuve) |
| 36 | C, sel du fleuve | « Pour le tirer, il faut un chantier : puiser…, laisser reposer, faire évaporer…, et arrêter… » | « Pour le tirer, on puise l'eau au large…, on la laisse reposer, on la fait évaporer au feu, et on arrête… » | Image ; infinitifs sans sujet dans la prose |
| 37 | D, souder | « le porte-électrode est une pince-étau… » ; « Quatre règles séparent la réparation de l'accident : » ; « 4. **Garder le masque.** » ; « Cette soudure est une réparation d'urgence : jamais sur… » | « on fait le porte-électrode d'une pince-étau…, ou on prend un vrai porte-électrode… » ; « On suit quatre règles pour ne pas avoir d'accident : » ; « 4. **Porter le masque.** » ; « On ne fait jamais cette soudure d'urgence sur… » | Formule ; consigne dite comme une consigne |
| 38 | D, lime | « Le diamètre est marqué par le fabricant de la chaîne. » | *(rien)* | Redite de la ligne 2.B |
| 39 | E, garrot, gants | « S'il suinte encore » ; « lavés à l'eau savonneuse puis rincés… » | « Si la plaie suinte encore » ; « qu'on lave à l'eau savonneuse puis qu'on rince… » | « Il » sans antécédent ; participes |
| 40 | E, savon | « Des cendres… lessivées à l'eau chaude donnent une lessive… ; cuite avec du suif…, elle donne du savon. On juge la force de la lessive à l'ancienne : un œuf… y flotte en montrant un rond… » ; « *Ce qu'on perd, et il faut le savoir avant de commencer :* » ; « …comme la soude achetée : c'est le même produit, en plus incertain. » | « On fait passer de l'eau chaude à travers des cendres… pour obtenir une lessive…, puis on la cuit avec du suif… pour faire le savon. On juge la force de la lessive avec un œuf… : dans une lessive de bonne force, il flotte, et un rond… dépasse de la surface. » ; « *Ce qu'on perd :* la barre. » ; « …comme la soude achetée, et on connaît moins bien sa force. » | Participes ; décor ; phrase sur la lecture ; « le même produit » contredisait « potassium, pas sodium » deux phrases plus haut |
| 41 | E, réhydratation | « …aggrave la diarrhée : on mesure, on ne devine pas. » ; « *Ce qu'on perd :* rien, si la mesure est exacte. La nuit, quand toute la maison est malade, on se trompe plus facilement de mesure. » | « …aggrave la diarrhée. » ; « *Ce qu'on perd :* rien, si la mesure est exacte (ligne 1.E). » | Chute en formule ; redite de la ligne 1.E |
| 42 | E, papier hygiénique | « dans un seau à couvercle » ; « Le papier hygiénique a l'air facile à remplacer, mais son remplacement demande plus de travail chaque jour que tous les autres de cette partie. » | « dans une chaudière à couvercle » ; « De tous les remplacements de cette partie, celui du papier hygiénique demande le plus de travail chaque jour, même s'il a l'air facile. » | Glossaire ; « les autres » sans nom |
| 43 | F, pics à glace | « On les porte au cou, par-dessus le manteau, avant le premier pas sur la glace : dans l'eau, après quelques minutes, les mains ne trouvent plus des pics rangés dans un sac. » | « On les porte comme ceux du commerce, au cou, par-dessus le manteau, avant le premier pas sur la glace (ligne 1.I). » | Redite de la ligne 1.I |
| 44 | F, perches | « **Sans perche de sondage**, un manche de hache… **Sans perche de sauvetage** de 4 m, une jeune épinette… » | « …, on prend un manche de hache… ; …, on prend une jeune épinette… » | Noms sans verbe |
| 45 | G, verre de lampe | « et elle éclaire moins du tiers » | « et elle donne moins du tiers de sa lumière » | Comparaison sans terme |

## Les faits signalés, sans rien changer

1. **L'ouvre-boîte.** 1.D : « sans lui on n'ouvre plus aucune conserve ». Le ch. 8, section 7, ouvre une boîte sans
   ouvre-boîte en usant le serti sur une pierre. À aligner (ou renvoyer au ch. 8).
2. **La souris.** 1.D : elle « gâte trois mois de farine en une semaine » ; palier 3 : elle « gâte trois mois de réserve
   en une saison ». Deux durées pour le même fait.
3. **Le garrot et la ceinture.** E : « Une corde, un fil ou une ceinture ne serrent pas assez et coupent la peau ». Le
   ch. 8, section 7, prend « une ceinture de nylon » comme sangle large. Contradiction.
4. **Souder avec des batteries.** D : 24 V ne suffit pas pour un arc de travail, trois batteries à préférer. Le ch. 8 et
   le ch. 9 font souder à deux batteries (24 V). À aligner.
5. **Formats de piles.** 1.F : « d'un seul format pour tout le bâtiment ». Ch. 9 : « trois formats plutôt que six ».
6. **Le test de germination.** Palier 3 : « test de 20 graines (ch. 100) ». Ch. 9, section 5 : 10 graines.
7. **La javel.** 1.B : on écrit la date de fabrication et on remplace avant un an. Ch. 9, étape 16 : un an après la date
   d'achat.
8. **Le sel du fleuve.** C : « arrêter avant la fin », et « On ne connaît pas le rendement ». Ch. 9 : évaporation
   complète, et 27 à 29 g de sel par litre. À aligner.
9. **La force de la lessive.** E donne le test de l'œuf ; le ch. 9 dit qu'on n'a pas de moyen de la mesurer.
10. **Les avertisseurs de CO** : le nombre et la fréquence d'essai diffèrent entre les ch. 00b, 6, 8 et 9 (détail dans
    `suivi/08-edition.md`, fait 1).
11. **Le godendard** n'est dans aucune ligne, alors que le ch. 9 dit qu'il « fait partie du stock du ch. 00b ». Pas plus
    d'écumoire, alors que F dit « Sans écumoire ».
12. **Les carabines.** 2.B : « Deux des carabines tirent la .308… La 7 mm et la .303 ont chacune la leur » suppose un
    jeu d'armes précis, celui d'une maisonnée. `CLAUDE.md` (« Un livre ouvert, pas centré sur JP ») : à trancher par JP.
13. **« Aucune application ne marche sans réseau »** (2.D, guide) : des applications de flore marchent hors ligne. Le
    fait est trop fort ; la raison du papier (la pile, le froid, l'écran) reste à dire, avec sa source.
14. **Le bois sec sans humidimètre** (B) : « Pour la salaison et le caveau, où le chiffre compte, ils ne suffisent pas. »
    Les tests portent sur l'humidité du bois de chauffage ; la salaison et le caveau demandent l'humidité de l'air. La
    phrase est à éclaircir par le rédacteur.
15. **Les renvois vers les tomes 2 à 6** gardent l'ancienne numérotation de ces chapitres (neuf sections) : « ch. 27,
    section 8 » pointe vers la section Danger, qui va sortir ; « section 9 » (ch. 24, 27, 29, 32, 34, 37, 45, 97, 98, 99)
    deviendra « section 7 ». À reprendre quand ces tomes passeront au gabarit final.
16. **Mots qui diffèrent d'un chapitre à l'autre** : « stabilisateur de carburant » ici, « stabilisant » au ch. 9 ;
    « brosse de ramonage » ici, « hérisson d'acier » au ch. 9. À harmoniser au glossaire.

## Liste de contrôle du cadre (partie « Le texte »)

- [-] Sept sections : le ch. 00b est le chapitre d'achat, qui a sa propre forme (`CLAUDE.md`, « Le chapitre d'ancrage ») ;
  sa forme n'a pas changé.
- [x] Rien sous le titre que la ligne de lieu. Fait.
- [-] Section 2, série orange, logigramme, En plus : sans objet pour ce chapitre.
- [x] Règle 0, phrase par phrase et cellule par cellule. Fait (45 retouches).
- [x] Pas de loi en formule, de « d'où », de « X passe là où », de maxime, de chute, d'opposition fabriquée, d'image, de
  chose qui pense. Fait.
- [x] Pas de pronominal pour une consigne, pas de « ceux qui », ordre naturel. Fait.
- [x] Possessif qui oblige à chercher : nommé (« le sac de couchage de l'enfant »). Fait.
- [x] Mots de tous les jours, un seul mot par chose (chaudière, graisse, « l'espèce d'arbre » au lieu de « l'essence ») ;
  aucun tiret dans le texte (les quatre des titres de palier sont lus par `ancrage.py`) ; « section N ». Fait.
- [x] Répétition : inventaire fait ; les durées d'ébullition, le salpêtre, le sel qui attaque les métaux, le diamètre de
  la lime, les pics au cou, l'erreur de mesure de nuit et le linge souillé gardent une seule place. Fait.
- [x] Planches : aucune. Fait.
- [x] `controle.py` : 0 tiret dans le texte, 0 « § », 0 mot banni ; l'invariant signalé (« 1 minute », « 5 minutes »)
  est une redite coupée, le fait reste en A. Fait.
