# Édition : Chapitre 5, Le stock permanent du chalet

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/05-le-stock-permanent-du-chalet.md` au gabarit final, après les corrections du rédacteur
  qui suivent la vérification technique (`suivi/05-redaction.md`, « Corrections après la vérification technique,
  19 octobre 2026 »), du titre à la dernière note « En plus ». Texte d'avant l'édition : celui du commit `42d036f`.
  Relu au complet, phrase par phrase, à voix haute (règle 0).
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31),
  `plan/glossaire.md` (chaudière, bidon), `suivi/05-redaction.md`.
- **Aucune source nouvelle cherchée, aucun chiffre changé.** Ce qui touche un fait est signalé plus bas, pas corrigé.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé. Les lignes repliées à environ 120
  caractères le restent.
- **Ancres :** intactes, chacune une seule fois dans le chapitre : « **La chaudière à bascule** (planche 05-01). » et
  « **Manger les conserves maison dans l'année qui suit la mise en conserve.** » (photo 05-boite-bombee, ancre rendue
  par le rédacteur, pas encore reportée dans `placements-tome-1.json` : le script la donne introuvable tant que
  l'orchestrateur n'a pas fusionné). Aucune étape renumérotée (1 à 51) ; les autres chapitres renvoient au ch. 5 en
  entier, aucun renvoi extérieur ne vise un intertitre renommé.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 8 308 | 8 129 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes, forme que lit l'assembleur) |
| « § », mots bannis, vocabulaire d'IA, âges, mises en relief | 0 | 0 |
| Maximes | 0 | 0 (une, apparue en cours d'édition à l'étape 4, redite en consigne) |
| Tournures à juger | 1 (« On les oublie », étape 44 : faux positif) | 2 (la même, et « une réserve bâtie surtout sur les légumineuses demande » à l'étape 16 : faux positif, le sujet est « une réserve ») |
| Mots vides à juger | 42 | 38 (les autres portent le sens : « tout de suite », « farine tout usage », « tous les jours ») |
| Redites à juger | 2 | 3 (« vérification du printemps et de l'automne » ×2 : le même nom pour la même vérification, règle 6 ; « le tableau de la valeur nutritive », étapes 10 et 48 : le même nom pour la même chose) |
| Invariants disparus | | « 48 L », « 72 heures » une fois chacun : l'étape 5 les disait, et le tableau de l'étape 6 les redonnait ligne pour ligne ; ils restent dans le tableau |

## Les phrases changées

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Section 1 | « …plusieurs semaines sans route ni magasin : trois mois visés, et au moins un mois même l'année… » | « …sans route ni magasin : on vise trois mois, et elle doit tenir au moins un mois, même l'année… » | Participe en raccourci ; « plusieurs semaines » redisait les mois |
| 2 | Section 2 | « c'est le tour du printemps ou de l'automne » ; partout « le tour du printemps et de l'automne », intertitre « La rotation et le tour du stock » | « la vérification du printemps et de l'automne » ; « La rotation et la vérification du stock » | Règle 0 : « c'est le tour de » se lit « c'est le moment de » ; un seul nom, gardé partout (5 endroits) |
| 3 | Matériel | « (sans : section 7) » ×3 | « (sans contenant neuf / sans thermomètre / sans balance : section 7) » | Étiquette en raccourci |
| 4 | Matériel | « Contenants… : contre l'humidité… » ; « Balance… : pour chiffrer… » ; « ils mesurent la cuisson du gibier à cœur » | « ils arrêtent l'humidité… » ; « elle sert à chiffrer… et à doser… » ; « ils mesurent la température du gibier à cœur » | Un verbe qui dit ce que l'objet fait |
| 5 | Étape 1 | « dans l'ordre où le corps lâche » | « dans l'ordre de ce qui tue le plus vite quand il manque » | Règle 0 : image à déchiffrer |
| 6 | Étape 2 | « …peut déjà être coupée : ce qui n'est pas au chalet ce jour-là n'y arrivera pas. Le stock ne voyage pas. » | « …peut déjà être coupée. » | Conséquence évidente et chute en formule |
| 7 | Étape 3 | « Donner à chaque fonction deux moyens » | « Prévoir pour chaque besoin deux moyens » | Mot de rapport |
| 8 | Étape 4 | « il garde le plus froid et le plus chaud de l'absence » | « il garde en mémoire la température la plus froide et la plus chaude de l'absence » | Règle 0 |
| 9 | Étape 4 | « Une boîte… fait travailler son serti, et un bocal… qui a gelé doit être jeté » | « Quand une boîte… gèle et dégèle, son serti travaille. Jeter un bocal… qui a gelé, même s'il n'est pas fendu. » | Une phrase, une information ; la maxime (« Un bocal qui… ») dite en consigne |
| 10 | Étape 4 | « La date… détruisent plus de réserve que ce que la famille mange : les étapes 47 à 51 les surveillent. » | « La péremption… font perdre plus de réserve que la famille n'en mange : on les surveille aux étapes 47 à 51. » | La date ne détruit rien ; des étapes qui surveillent (chose qui agit) |
| 11 | Étape 4 | « Garder ce rangement d'une année à l'autre : … trouve alors… » | « Avec un rangement qui ne change pas, … trouve… » | Redite du titre de l'étape |
| 12 | Étape 5 | « 2 L à boire » ; « …16 L par jour, et 48 L pour 72 heures. C'est un plancher. » ; « boire presque tout ce 9,8 L » | « 2 L pour boire » ; « …16 L par jour. C'est un minimum : … » ; « boire presque tous ces 9,8 L » | Redite du tableau de l'étape 6 ; « plancher », mot de rapport |
| 13 | Étapes 6, 18, 28 | « Dimensionner » | « Calculer » | Mot d'ingénieur |
| 14 | Étape 6, tableau | « Plancher des 72 heures… Le minimum, pas la cible du chalet » ; « la famille vit du moyen de puiser » ; puis, sous le tableau, « Passé deux semaines, aucune réserve… : la famille boit ce qu'elle puise. » | « Minimum pour 72 heures… Pas assez pour le chalet » ; « la famille boit l'eau qu'elle puise » ; la phrase sous le tableau sort | Redite (le tableau et la phrase disaient la même chose) |
| 15 | Étape 7 | « même bouchés, même à l'autre bout du local » | « même si leurs bidons sont bouchés et à l'autre bout de la tablette » | La phrase se contredisait (même tablette / autre bout du local) ; voir le fait signalé 1 |
| 16 | Étape 7 | « Garder l'eau fermée au frais » | « Garder l'eau fermée » | « au frais » est dans le titre de l'étape |
| 17 | Étape 8 | « coûtent plus cher » ; « la charge s'ajoute » ; « il faut donc un stock prêt à manger, pas seulement un gros stock » | « demandent plus d'énergie » ; « la charge qu'on porte s'ajoute » ; « une partie du stock doit donc être prête à manger » | Image ; opposition fabriquée |
| 18 | Étape 9 | « Une seule denrée qui atteint le total de calories ne nourrit personne pendant trois mois. » ; « Le minimum de chaque jour se compte… » ; « …manque de tout le reste. Une tablette… manque d'abord de gras… » | Phrase coupée ; « Il faut aussi un minimum de protéines, de fer et de fibres chaque jour » ; les deux phrases en une | Maxime ; pronominal ; redite d'une phrase à l'autre |
| 19 | Étape 10 | « Lire le chiffre du tableau comme s'il valait pour le sac fausse tout le calcul. Calculer plutôt : » ; « porte donc » ; « Le calcul reste juste…, ce qu'aucune table… ne garantit. » | Phrase coupée, « Calculer les calories du sac : » ; « contient donc » ; « Faire le calcul avec l'étiquette du sac qu'on a : il reste juste…, alors qu'une table… ne le garantit pas. » | Conséquence évidente ; chute en formule |
| 20 | Étape 11 | « …prend une pièce, pas une étagère, et cette pièce ne doit pas geler (étape 4). » | « il faut y consacrer une pièce entière. » | Opposition fabriquée ; redite de l'étape 4 |
| 21 | Étape 12 | « ces calories sont sur la tablette, mais pas dans l'assiette » ; « pas avec ceux de la cuisine d'été » | « retirer ces calories du calcul » ; « avec les moyens de cuisson qu'on aura l'hiver, pas avec ceux de l'été » | Chute en formule ; « cuisine d'été » se lit comme un bâtiment |
| 22 | Étape 13 | « On vise trois mois, et on garantit un mois. » | Coupé | Redite de la section 1 et du titre |
| 23 | Étape 14 | « Choisir les denrées au gras, au combustible et au goût, pas au prix. » | « Choisir les denrées selon leur gras, le combustible qu'elles demandent et le goût de la famille, pas selon le prix. » | Raccourci |
| 24 | Étape 15 | Titre « Mettre au fond de la réserve les grains sans germe » ; « …un couvercle et un local frais règlent quatre de ces cinq facteurs. » | « Mettre les grains sans germe au fond de la réserve, et les grains entiers en rotation rapide » ; « On ne change pas l'acidité ; un couvercle et un local frais règlent les quatre autres. » | Règle 11, ordre ; le calcul à faire par le lecteur dit en clair |
| 25 | Étape 16 | « ces heures se paient en bois fendu… ; une réserve… coûte plus cher qu'elle en a l'air » ; « Les faire tremper » | « ces heures de cuisson demandent du bois fendu… ; une réserve… demande beaucoup de bois et de travail » ; « Faire tremper les haricots » | Pronominal, chute ; on nomme la chose |
| 26 | Étapes 17, 40, 41 | Étape 17 : « La règle vaut pour les adultes comme pour les enfants (étape 40). » Étape 40 : « …sort du calcul de l'étape 11, même si elle est sur la tablette. » Étape 41 : « Mettre au stock ce que les enfants mangent déjà. Ne pas compter sur une panne… lentilles. Les aliments riches… : les mettre en rotation rapide, pas en réserve de fond » | Étape 17 : « La règle vaut pour les enfants aussi : ne pas compter sur une panne pour leur faire découvrir les lentilles. » Étape 40 : « …sort du calcul (étape 17). » Étape 41 : « Mettre en rotation rapide les aliments riches que les enfants acceptent sans discuter (…) : ils contiennent du gras (étape 15). » | La même règle dite trois fois ; elle garde sa place à l'étape 17, les étapes 40 et 41 n'en gardent que le neuf |
| 27 | Étape 18, tableau | « 20 à 35 % chez l'adulte, 25 à 35 % chez l'enfant » ; « La chaleur, puis le rance » ; « …pas le nombre de personnes (ch. 41) » | « (étape 9) » ; « La chaleur, qui la fait rancir » ; « (étape 20 ; ch. 41) » | Redite du tableau de l'étape 9 et du titre de l'étape 20 |
| 28 | Étape 19 | « Contrairement au sel, il rancit » | « Le gras rancit » | Opposition fabriquée |
| 29 | Étape 20 | « …ce qu'on en a de trop ne se perd jamais » ; « une année creuse le laisse pour la suivante » ; « Tous les pourcentages de sel du livre… se calculent » | Coupé ; « ce qui reste après une année creuse sert l'année suivante » ; « On calcule toujours les pourcentages de sel… » | Conséquence évidente ; chose qui agit ; phrase qui parle du livre ; pronominal |
| 30 | Étape 21 | « ne se dosent pas… et ne se remplacent pas » | « On ne dose pas le salpêtre… comme le sel nitrité…, et on ne remplace pas l'un par l'autre » | Pronominal |
| 31 | Étape 22 | « Mettre chaque réserve là où elle tient. » ; « trois mois visés » ; « La date : » | « Ranger chaque sorte de réserve à l'endroit où elle se garde. » ; « trois mois qu'on vise » ; « Le temps : » | Règle 0 |
| 32 | Étape 23 | « ne se met en conserve qu'à l'autoclave » ; « …n'entre pas au stock » ; « jeter sans l'ouvrir ni la goûter une boîte bombée… » ; « Une conserve peut avoir l'air… et contenir la toxine : le botulisme ne change ni… » | « On ne met en conserve… qu'à l'autoclave » ; « Ne pas mettre au stock d'huile… » ; « chercher les boîtes bombées… et les jeter sans les ouvrir ni les goûter » ; « Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence de la conserve. » | Pronominal ; règle 11 ; redite dans la même phrase (le rappel de sécurité reste mot pour mot). Le début du paragraphe ancré n'a pas bougé |
| 33 | Étape 24 | « La bactérie du botulisme du poisson » | « … du poisson (type E) » | Le même nom qu'au tableau des rappels et au ch. 7 |
| 34 | Étape 25 | « Le congélateur dépend du courant : le garder…, sans faire deux heures de route. Au chalet, la viande gèle dehors » ; « Le réfrigérateur tient » ; « Quand la viande baisse, … cruches » ; « Une panne de moins de deux jours se passe à la maison » ; « Si elle s'installe » | « Garder le congélateur à la maison… : on le surveille… sans faire la route jusqu'au chalet. Au chalet, l'hiver, faire geler la viande dehors » ; « garde les aliments froids » ; « À mesure qu'on mange la viande, … bidons » ; « Pendant une panne de moins de 48 heures, on reste à la maison » ; « Si elle dure » | Évidence ; la distance de JP sort (CLAUDE.md, « un livre ouvert ») ; consigne au présent ; un seul mot (« bidon ») ; pronominal |
| 35 | Étape 28, tableau | « Fendu, empilé, aéré, à l'abri… » ; « Dehors, hors du bâtiment habité » ; « …mesuré | Sans cette mesure, on ne sait pas combien de bouteilles garder » | « Le fendre, l'empiler en laissant passer l'air, et le garder à l'abri… » ; « Dehors » ; « Mesurer combien de jours… | Cette mesure donne le nombre de bouteilles à garder » | Participes en chaîne ; redite ; évidence |
| 36 | Étape 29 | « : un chiffre général serait faux pour ce chalet-là » ; « couper ce total plus une marge : elle couvre… » | Coupé ; « ajouter à ce total une marge qui couvre… » | Justification ; redite du titre |
| 37 | Étape 30 | « Compter en cordes, pas en piles. » ; « (la longueur d'un poêle de chalet) » ; « Trois piles comme celle-là font une corde, pas trois. » | « Convertir les rangées en cordes. » ; « (la longueur qui entre dans un poêle de chalet) » ; coupé | Le titre opposait la corde à la pile qu'il définit ; chute qui redit « le tiers d'une corde » |
| 38 | Étape 31 | « Un bidon à moitié vide respire : il se dilate… » ; « Un bidon plein n'a presque rien à pousser » ; « regarder sous le fond des bidons » ; « …passent la saison au cabanon » | « L'air d'un bidon à moitié vide se dilate… » ; « Un bidon plein a peu d'air, et il pousse peu de vapeur » ; « regarder le plancher sous les bidons » ; « Garder le diesel… au cabanon pour la saison » | Image ; consigne au présent |
| 39 | Étape 34 | « un avertisseur qui sonne pour rien finit débranché » | « on finit par les débrancher » | Maxime |
| 40 | Étape 35 | « La frontale est le moyen ; la lampe de poche sert d'appoint. » | « Garder les lampes de poche pour l'appoint. » | Formule |
| 41 | Étape 37 | « …et elle ne tombe jamais à plat. La communication est au ch. 14. » | « Communiquer : ch. 14. » | Chute qui redit la phrase |
| 42 | Étape 38 | « Un incendie, un sac oublié ou l'humidité n'atteint pas les trois à la fois (étape 3). » | « (étape 3) » | Redite de l'étape 3 |
| 43 | Étape 39 | « Compter l'huile à lampe avec le diesel et le kérosène, dans le même total, au même endroit » | « Compter l'huile à lampe dans le même total que le diesel et le kérosène, et la ranger au même endroit » | « Compter au même endroit » ne se dit pas |
| 44 | Étape 42 | « Ouvert ce jour-là seulement, il leur donne du neuf » ; « Les médicaments des enfants se dosent au poids » ; « le reste est au ch. 39 » | « Si on l'ouvre seulement ce jour-là, les enfants ont du neuf » ; « On dose les médicaments des enfants selon leur poids » ; « le reste de ce qu'il faut pour eux est au ch. 39 » | Participe ; pronominal ; « le reste » de quoi |
| 45 | Étape 43 | « dans un local qui chauffe en juillet et gèle en novembre » | « dans un chalet qui… » | L'étape 4 dit que le local ne gèle jamais ; c'est le chalet qui gèle |
| 46 | Étape 44 | « trois semaines à quatre » | « trois semaines à quatre personnes » | Règle 0 |
| 47 | Étape 47 | « …jamais les deux en désordre : le premier entré est le premier sorti. » | « : on mange alors le plus vieux en premier. » | Formule |
| 48 | Étape 48 | « Écrire au marqueur la date d'entrée » ; « …une conserve maison sans date sort de la rotation le jour où… Jeter une conserve sans étiquette (section 6). » ; « écrire aussi sur le couvercle les calories du sac : …et avec lui le seul chiffre qui dit combien de jours… » | « Écrire la date d'entrée sur le contenant, au marqueur » ; « …il faut jeter une conserve sans étiquette ou sans date lisible (section 6). » ; « écrire aussi les calories du sac sur le couvercle : …et le tableau de la valeur nutritive avec lui » | Règle 11 ; « sort de la rotation » ne disait pas quoi faire ; image |
| 49 | Étape 49 | « Mettre au froid une conserve ouverte » | « Mettre une conserve ouverte au froid » | Règle 11 |
| 50 | Étape 50 | « cette date parle de qualité » ; « On mange un aliment périssable… » ; « remplacer chaque réserve d'urgence chaque année » | « cette date porte sur la qualité, pas sur la sécurité » ; « Manger un aliment périssable… » ; « remplacer les réserves d'urgence chaque année » | Chose qui parle ; consigne ; répétition |
| 51 | Section 5 | « Remplacer tout de suite : les enfants grandissent plus vite que le stock ne tourne » | « Remplacer tout de suite » | Chute en formule |
| 52 | Note [^2] | « Frappé du dos d'une cuillère, un couvercle… » | « Quand on le frappe du dos d'une cuillère, un couvercle… » | Participe en tête |
| 53 | Section 7, joint | « gorge du couvercle » ×2 | « rainure du couvercle » | Mot de métier |
| 54 | Section 7, cire | « Remplir le pot… retourner le pot » ; « La cire épouse le filet » | « le bocal » ; « La cire entre dans le filet » | Un seul mot ; image |
| 55 | Section 7, couvercles | « où il ne fait pas le même travail » ; « ils redeviennent des pots pour le sec » | « qui n'a pas besoin de vide » ; « ils servent encore pour les denrées sèches » | Règle 0 |
| 56 | Section 7, balance | « On monte le fléau » ; « tienne d'aplomb » ; « les suspendre chacune…, de chaque côté » ; « les deux plateaux jusqu'à l'équilibre : chaque côté vaut la moitié » ; « la petite masse » ; « Un fléau » ; « la viande reste en salaison courte » | « On fabrique une balance à fléau » ; « tienne de niveau » ; « une boîte de chaque côté de la latte » ; « les deux boîtes jusqu'à ce que la latte soit de niveau : chaque boîte contient alors la moitié » ; « la précision sur les petites masses » ; « Une balance à fléau » ; « seulement des salaisons courtes » | Mot de métier expliqué ; « d'aplomb » veut dire à la verticale ; un seul mot pour les boîtes |
| 57 | Section 7, intertitre | « Savoir ce que le local a fait pendant l'absence » | « Savoir si le local a gelé ou chauffé pendant l'absence » | Chose qui agit |
| 58 | Section 7, témoins | « les boîtes de conserve ont travaillé » ; « on les passe tout de suite » ; « …et ça suffit pour décider ce qu'on jette et ce qu'on fait tourner. » | « le serti des boîtes de conserve a travaillé » ; « Les passer tout de suite » ; coupé | Ce qui travaille, c'est le serti ; consigne ; chute |
| 59 | Section 7, souris | « **Boucher.** » ; « clouer un bout de boîte de conserve aplati au marteau sur le trou » ; « Le bois neuf, la mousse et la guenille ne bouchent rien. » | « **Boucher les trous.** » ; « aplatir au marteau un bout de boîte de conserve et le clouer sur le trou » ; coupé | Les gestes dans l'ordre ; règle 8 (ce qui ne marche pas sort quand l'erreur ne tue pas ; la phrase d'avant dit le mécanisme) |
| 60 | Section 7, ouvre-boîte | « Ne pas prendre une lame fine : elle casse, et on perd un couteau pour une boîte de tomates. » | « Ne pas prendre un couteau : la lame fine casse. » | Chute |
| 61 | Section 7, sel | « une pièce salée est engagée, et on ne revient pas en arrière » ; « l'eau du fleuve en donne » | « une fois la pièce mise au sel, il faut aller jusqu'au bout de la salaison » ; « on en tire de l'eau du fleuve » | Règle 0 (« engagée ») |
| 62 | Section 7, caveau | « Les céréales et les farines n'y vont pas » | « Ne pas y mettre les céréales ni les farines » | Consigne |
| 63 | Section 7, bois | « Le bois remplace tout le reste, et chaque usage coûte des cordes. … Faire de l'eau coûte cher en bois. » ; « et dix pour un est le meilleur cas » | « Le bois remplace tout le reste. … et chaque usage demande du bois. Faire de l'eau en demande beaucoup. » ; coupé | Image ; redite de « 10 à 25 L » (l'intertitre interne reste, l'étape 6 y renvoie) |
| 64 | Section 7, calories | « Tout ce qui précède garde, déplace ou étire ce qui existe » | « Le froid, le gras, le sel et le caveau gardent la nourriture qu'on a » | Phrase qui parle du chapitre |
| 65 | Section 7, ce qu'on perd | « ce stock se gagne… ces heures se prennent… quand tout se fait en même temps » | « on bâtit ce stock… on prend ces heures… quand tous les travaux tombent en même temps » | Pronominal |
| 66 | En plus, bannique | « Le sable sec garde la chaleur » | « Le sable garde la chaleur » | « sec » est dit deux fois dans la note |
| 67 | En plus, bagues | « rien ne tient plus en place un couvercle… au tour du printemps » | « sans la bague, plus rien ne tient un couvercle… à la vérification du printemps » | Ordre ; un seul nom (point 2) |

## Faits signalés (pas corrigés)

1. **Étape 7, l'eau et les solvants.** La phrase d'avant disait « sur la même tablette…, même à l'autre bout du
   local », ce qui se contredit. Le texte suit maintenant la ligne des Points de contrôle (« Ce qui partage la tablette
   de l'eau ») : « à l'autre bout de la tablette ». La source (`sources/08-sante-canada-eau-embouteillee.md`) dit
   seulement « éloignée des solvants ». Si le rédacteur voulait « pas dans le même local », c'est un autre fait : à
   trancher.
2. **Étape 28, l'humidité du bois.** La même ligne donne « 20 % ou moins » et « environ 25 % est l'humidité idéale ».
   Les deux viennent de la page de RNCan (classe M20 ; « environ 25 p. 100 est idéale »), mais côte à côte, le lecteur
   ne sait pas laquelle viser. La section 5 vise 20 %. Proposition : garder seulement « 20 % ou moins ».
3. **Matériel, « Balance au gramme ».** La section 7 dit que le sel nitrité se pèse au dixième de gramme et qu'il faut
   une « balance fine » pour la salaison longue : une balance au gramme ne suffit pas. Et le renvoi « (étape 21) » du
   dixième de gramme pointe vers une étape qui ne le dit pas (le chiffre vient de la page `poison`).
4. **Étape 2, « le sac de départ au ch. 7 ».** Le ch. 7 n'a pas de sac de départ (il renvoie à la trousse du ch. 6 et
   à la série « On part » du ch. 2). Renvoi à corriger : ch. 2, ou couper.
5. **Étape 8, l'exemple de la famille** (un enfant de 4 ou 5 ans et un de 6 ou 7 ans) reprend les âges des enfants de
   JP. Le vérificateur l'a demandé pour que le total tombe juste ; `CLAUDE.md` (« un livre ouvert ») demande de ne pas
   les écrire. À trancher par JP.
6. **Étape 38, « un dans la remise ».** Le reste du chapitre dit « cabanon ». Si c'est le même bâtiment, un seul mot ;
   si c'est la remise où dort le carburant (étape 31), un moyen d'allumage s'y range mal. Pas changé.
7. **Le pemmican** est aussi une note « En plus » du ch. 6, avec les mêmes faits (*pimikan*, parts égales, traite des
   fourrures, la trichine de l'ours). Un recoupement : en garder une, ou les faire dire chacune autre chose. Le 71 °C
   pendant 15 secondes vient du ch. 72 (préchauffage avant séchage, noté au suivi du rédacteur), il ne contredit pas
   les 74 °C de cuisson.
8. **Section 7, témoin de gel** : « tout ce qui était congelé dehors a dégelé » tire du pot du local une conclusion
   sur le dehors (le coffre). Si le témoin est dans le local, c'est le local qui a dégelé. À vérifier par le rédacteur.

## Liste de contrôle de l'éditeur (cadre des agents, partie « Le texte »)

- Sept sections, pas de « Comment ça marche », pas de section Danger, pictogrammes dans les étapes : fait (inchangé).
- Rien sous le titre que la ligne de lieu : fait (« **Chalet** »).
- Section 2 sans « mauvaise procédure » : fait.
- Règle 0, phrase par phrase : fait (67 changements ci-dessus).
- Pas de loi en formule, de maxime, de chute, d'opposition fabriquée, d'image, de chose qui pense : fait (lignes 5, 6,
  9, 10, 17 à 22, 28, 29, 37 à 40, 47, 51, 57 à 60, 63, 64).
- Pas de pronominal pour une consigne, pas de « ceux qui », ordre naturel : fait (lignes 9, 18, 24, 25, 29, 30, 32, 34,
  42, 44, 48 à 50, 65).
- On nomme la chose ; mots de tous les jours (« dimensionner », « plancher », « gorge », « fléau » expliqué) : fait.
- Aucun tiret dans le texte, aucun « § » : fait (les deux tirets restants sont le titre et la ligne de tome).
- Inventaire des faits, un fait une fois : fait pour les redites trouvées (lignes 6, 12, 14, 18, 22, 26, 27, 36, 37, 41,
  42, 63) ; le pemmican en double avec le ch. 6 est signalé (fait 7).
- Planches appelées, ancres intactes : fait (05-01 et la photo 05-boite-bombee).
- controle.py : 0 tiret dans le texte, 0 « § », 0 mot banni ; avis jugés un par un (voir le tableau).
- Aucun chiffre changé, aucune source cherchée : fait.
