# Édition : Chapitre 17, Qui cogne à la porte

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/17-qui-cogne-a-la-porte.md` au gabarit final (sept sections et « En plus »), du titre à
  la dernière note, relu phrase par phrase à voix haute. Texte d'avant l'édition : le fichier de travail à 02 h 01
  (dernière écriture du rédacteur à 01 h 57, pas encore commitée à ce moment), copie dans le scratchpad de la session.
- **Lu avant :** `.claude/cadre-agents.md`, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` avec ses tableaux,
  `suivi/plan-de-match.md` (PAUSE du 15 octobre, dont les remarques de JP sur le ch. 17 : le thermomètre hors de la
  série orange, le poteau expliqué là où il sert, le réchaud qu'on ne redit pas dans le logigramme),
  `plan/dangers-inventaire.md` (section 1).
- **Aucune source nouvelle, aucun chiffre changé, aucune étape renumérotée** (1 à 29). Ce qui touche un fait est
  signalé plus bas.
- **Fins de ligne :** CRLF avant et après (404 lignes, toutes en CRLF ; 402 avant, deux phrases plus longues),
  saut de ligne final gardé.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 5 747 | 5 795 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes) |
| « § », mots bannis, tournures, maximes, pronominaux | 0 | 0 |
| Mises en relief et oppositions | 2 | 1, jugée : « Une lumière rouge faible n'éblouit pas, mais elle fausse les couleurs » (note En plus) : deux faits vrais, pas une opposition fabriquée |
| Mots vides à juger | 19 | 19 (portent le sens : « encore là au printemps », « bien éveillée et avale bien », « résiste bien ») |
| Redites à juger | 3 | 5, jugées : renvois vers la section 7 (« Réchauffer quelqu'un… », « La porte, et l'endroit… ») ; « dans la maison ou dans un abri dehors » (Matériel et étape 7, l'objet puis le geste) ; « au chalet, quand le chemin est fermé » (étapes 10 et 11, deux décisions) ; « le couchage des enfants » (étape 17 et section 7, qui la détaille) |
| Invariants disparus | | rien (le « 74 °C » de l'étape 21 a été coupé en cours de passe comme redite de l'étape 20, puis remis : c'est le rappel de la trichine) |

## Ce qui a changé

| Où | Avant | Après | Règle |
| --- | --- | --- | --- |
| Section 1 | « …en une conversation courte, voisin compris : » | « …à la porte, même d'un voisin, sans ouvrir et en une conversation courte : » | Étiquette |
| Matériel | « **Lampe de poche puissante** : éclaire le sol devant la personne, tenue loin du corps, la lampe de la pièce éteinte » ; « dedans ou dans un abri dehors » | « : pour éclairer le sol devant le visiteur ; on la tient loin du corps, après avoir éteint la lampe de la pièce » ; « dans la maison ou dans un abri dehors » | Participes en chaîne |
| Étape 1 | « **Ne pas ouvrir, mais répondre à travers la porte…** » | « **Répondre à travers la porte, sans ouvrir, …** » | Opposition en tête de consigne |
| Étape 2 | « Une vitre éclairée du dedans montre la pièce à la personne qui est dehors, et ne renvoie à la personne qui est dedans que son propre reflet » | « Quand la pièce est éclairée, la personne qui est dehors voit l'intérieur par la vitre, et la personne qui est dedans ne voit que son propre reflet » | Chose qui agit |
| Étape 3 | « la pièce du fond, la pièce la plus loin » ; « **Un seul adulte parle ; l'autre… regarde dehors…** » ; « Un adulte seul… ne sort pas : il… donne par une fenêtre » | « la pièce du fond, la plus loin » ; « **Un seul adulte doit parler ; l'autre… surveille dehors…** » ; « ne doit pas sortir : il… donne ce qu'il donne par une fenêtre » | Consigne au présent de constat |
| Étape 5 | « « Reculez » ne dit pas jusqu'où » ; la phrase des virus à 2 m venait après « poser une seule question à la fois » | « « Reculez » ne lui dit pas jusqu'où » ; la phrase des virus suit le repère à 2 m qu'elle justifie | Ordre ; le pourquoi à côté du geste |
| Étape 7 | « Avec un seul de ces signes, » ; « On parlera ensuite. » | « Si elle a un seul de ces signes, » ; « Parler ensuite. » | Règle 0 ; infinitif dans une étape |
| Étape 9 | « Il raconte ensuite » ; « Jamais une caisse, et jamais « prenez ce qu'il vous faut » » ; « jamais le dernier » | « Le visiteur racontera » ; « Ne jamais donner une caisse entière, ni dire « prenez ce qu'il vous faut » » ; « sans donner le dernier » | Noms sans verbe |
| Étape 10 | « **Refuser, quand c'est la réponse : une seule fois, …** » ; « la destination existe presque toujours » ; « Au chalet, le chemin est fermé. Sans destination réelle, on ne refuse pas : on choisit » ; « ce qu'on donne passe par la fenêtre » | « **Si on refuse, le dire une seule fois, …** » ; « la personne a presque toujours un endroit où aller » ; « Au chalet, quand le chemin est fermé et que la personne n'a nulle part où aller, ne pas refuser : choisir » ; « donner ce qu'on donne par la fenêtre » | Étiquette ; le chemin n'est pas toujours fermé ; consigne au présent |
| Étape 11 | « **Si le visiteur ne part pas : rentrer…** » ; « Pendant la conversation, le visiteur voit l'adulte se retourner pour aller la chercher » ; « Au chalet, chemin fermé, » | « **Si le visiteur ne part pas, rentrer…** » ; « Si l'adulte va la chercher pendant la conversation, le visiteur le voit se retourner » (la condition dite) ; « Au chalet, quand le chemin est fermé, » | Règle 0 ; participe |
| Étapes 15 à 18 | « Quand on ne dit pas de durée, le séjour n'a plus de fin » ; « faire porter un masque…, et ne laisser personne s'approcher des enfants avant » ; étape 17, « Sinon, séparer… » placé après la phrase sur les virus ; « **Laisser dehors, à l'air libre, la génératrice…** » | « Si on ne dit pas de durée au départ, on n'arrive plus à faire partir la personne » ; « lui faire porter un masque…, et ne pas la laisser s'approcher des enfants avant » ; « **Loger le visiteur dans un espace séparé si le bâtiment le permet ; sinon, séparer au moins le couchage des enfants…** » puis les virus ; « **Laisser la génératrice, le réchaud et la chaufferette du visiteur dehors, à l'air libre** » | Chute en formule ; « Sinon » se rapportait aux virus ; ordre naturel (le lieu après l'objet) |
| Étape 20 | « **Prendre au thermomètre à sonde la température…** » | « **Prendre la température… au thermomètre à sonde** » | Ordre naturel |
| Étape 25 | « Un baril peint ou un panneau font la même chose » ; « À la maison, le repère est » | « peuvent servir de repère » ; « À la maison, prendre comme repère » | Consigne au présent |
| Section 7, éclairer | « Clouée au poteau de coin, pendue à une branche ou posée sur une souche, elle éclaire » ; « Dirigée sur la neige, la lumière éclaire » ; un deux-points seul en début de ligne | « la clouer au poteau de coin, la pendre à une branche ou la poser sur une souche. Elle éclaire alors » ; « La diriger sur la neige : la lumière éclaire » ; ligne recoupée | Participes en chaîne |
| Section 7, porte | « la barre transmet la poussée au mur, et un support arraché ne tient plus rien » ; « Un coup d'épaule sur la porte se change en compression dans la perche, et une perche d'épinette en prend beaucoup » ; « on peut chasser leurs broches » | « pour que la barre transmette la poussée au mur » ; « Quand quelqu'un donne un coup d'épaule dans la porte, la perche travaille en compression, et une perche d'épinette résiste bien à la compression » ; « quelqu'un dehors peut chasser leurs broches » | Conséquence évidente ; loi en formule ; on sait qui fait le geste |
| Section 7, réchauffer | « **Le sol avant tout.** » ; « Mettre entre la personne et la neige un lit épais… » ; « elles tiennent des heures » ; « servir chaud » | « **Le lit sous la personne.** » ; « Mettre un lit épais… entre la personne et la neige » ; « elles restent chaudes des heures » ; « servir l'infusion chaude » | Titre en maxime ; ordre naturel |
| Section 7, donner, nuit, hygiène | « Donner l'eau chaude, dans la bouteille » ; « Un adulte veille, à tour de rôle » ; « on sert soi-même, et le visiteur a son bol » | « Donner l'eau chaude dans la bouteille » ; « Les adultes veillent à tour de rôle » ; « on sert le visiteur soi-même, et il a son bol » | Règle 0 |
| Section 7, ce qui ne se remplace pas | « Seul avec les enfants, personne ne regarde… pendant qu'on parle » ; « on ne peut ni vérifier une histoire » (contredisait « Vérifier une histoire quand il n'y a rien pour vérifier ») ; « personne ne repart la nuit, parce que personne ne pourra aller le chercher » ; « une infection qui monte avec ce qu'il y a » | « Quand un adulte est seul avec les enfants, personne ne regarde… pendant qu'il parle » ; « on ne peut ni vérifier une histoire auprès des voisins, ni les prévenir » ; « ne laisser personne repartir la nuit, parce que personne ne pourra aller la chercher » ; « On soigne avec ce qu'on a une hypothermie grave, une hémorragie ou une infection qui monte » | Participe sans sujet ; contradiction interne ; ambiguïté |
| En plus | « La personne qui guette à la fenêtre ferme un œil » ; « Avec un inconnu, lui céder sa place, c'est… » (81 mots) | « doit fermer un œil » ; « Céder sa place à un inconnu, c'est… » (80 mots) | Consigne au présent ; longueur |

Longueur des notes En plus : 64, 63, 59, 80 mots.

## Ancres de planches

Intactes, début de paragraphe unique (vérifié) :

| Planche | `apres` |
| --- | --- |
| logigramme 17 | « **Barre de porte** » (dernier item du Matériel). **La clé « 17 » de `placements-tome-1.json` a encore « Régler une visite imprévue sur le seuil », qui n'existe plus** ; elle n'existait déjà plus avant l'édition, et la section 1 dit maintenant « Régler une visite imprévue à la porte, même d'un voisin, … » : à remplacer par « **Barre de porte** » |
| 17-06 | « Une porte cède au chambranle, presque jamais au pêne » (inchangée) |

## Faits signalés (non tranchés par l'éditeur)

1. **Logigramme 17** (`images/logigrammes/17-qui-cogne.json`) relu, non touché (il se rend en image) : trois boîtes ont
   des tournures que le chapitre a perdues : « **Ne pas ouvrir**, mais faire savoir… » (opposition, voir l'étape 1) ;
   « **Un seul adulte parle.** » (présent de constat, voir l'étape 3) ; « **Tout le monde va dans la pièce du fond**, on
   bloque la porte… » (consigne au présent : « Emmener tout le monde dans la pièce du fond, bloquer la porte… »). À
   reprendre au prochain rendu.
2. **Étape 9 et ch. 16, étape 40 : le mal de caribou renvoie à « ch. 19, ch. 21 » ici et à « ch. 19, ch. 72 » au ch. 16.**
   Les deux chapitres existent (ch. 21, ce que le corps demande l'hiver ; ch. 72, pemmican et graisses) ; à
   harmoniser si un seul renvoi est voulu.
3. **Étape 15.** « le séjour n'a plus de fin » est devenu « on n'arrive plus à faire partir la personne » : même sens,
   dit comme un fait ; à confirmer que c'est bien ce que la source ou le rédacteur voulait dire.
4. **Note « Le refroidissement éolien ».** « À partir de −28, chaque plage de valeurs donne le temps que met la peau
   exposée à geler » renvoie à un tableau qui n'est pas dans le chapitre (les temps sont aux étapes 7 et en section 5) ;
   non touché.
5. **Section 7, « Donner sans renseigner ».** « souffler dans le boyau court » puis, juste après, « Ne jamais amorcer le
   siphon à la bouche » : souffler n'est pas aspirer, mais la suite peut faire hésiter. « Une poire de pompe » n'est
   pas le nom qu'emploie le ch. 15 (« une pompe à vélo ou à matelas ») ; non touché.
