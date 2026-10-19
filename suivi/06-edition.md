# Édition : Chapitre 6, La liste de 72 heures

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/06-la-liste-de-72-heures.md` au gabarit final, avec les deux corrections du rédacteur
  après la vérification technique (le filtre à 1 µm au tableau de l'étape 5 et à la section 7), du titre à la dernière
  note « En plus ». Texte d'avant l'édition : celui du commit `42d036f`. Relu au complet, phrase par phrase, à voix
  haute (règle 0).
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31),
  `plan/glossaire.md`, `suivi/06-redaction.md`.
- **Aucune source nouvelle cherchée, aucun chiffre changé.** Ce qui touche un fait est signalé plus bas.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé ; les paragraphes restent d'une seule
  ligne, comme le fichier les avait.
- **Ancres :** le chapitre n'a ni planche ni photo (`placements-tome-1.json`, clé `"06"` vide) ; aucune ancre à rendre.
  Aucune étape renumérotée (1 à 31). Un intertitre de la section 7 change : « Lumière et piles » devient « La lumière
  et les piles » (les autres intertitres ont leur article) ; aucun renvoi ne le cite. Les renvois internes (« Se garder
  au chaud sans chauffage », « Le gras », « Les piles qu'on croit mortes ») tiennent.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 6 687 | 6 656 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes, forme que lit l'assembleur) |
| « § », mots bannis, vocabulaire d'IA, âges, maximes, mises en relief, redites | 0 | 0 |
| Tournures à juger | 1 (étape 25, « la personne qui la monte oublie ») | 0 (la phrase sort, voir 13) |
| Mots vides à juger | 25 | 25 (« encore », « ainsi » : ils portent le sens) |
| Invariants disparus | | rien |

## Les phrases changées

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Section 1 | « en deux minutes » | « en 2 minutes » | Le chiffre en chiffres, comme à l'étape 1 et à la section 5 |
| 2 | Matériel | « Un sac à dos… : il porte ce qui part à pied » ; « elle garde au sec les papiers, l'argent et la liste » | « on y met ce qu'on emporte à pied » ; « elle garde les papiers, l'argent et la liste des médicaments au sec » | Règle 0 ; règle 11, ordre |
| 3 | Étape 2 | « Dans les sacs à dos : ce qui sert… » ; « Dans le sac d'un adulte : la boîte étanche (étape 26). On la sort… » ; « Dans le bac 1 : … » ; « Dans le bac 2 : … » | « Mettre dans les sacs à dos ce qui sert… : … » ; « Mettre la boîte étanche (étape 26) dans le sac d'un adulte, et la sortir de la maison en premier. » ; « Mettre dans le bac 1 ce qui… : … » ; « Mettre dans le bac 2 ce qui… : … » | Liste de noms à la place des gestes |
| 4 | Étape 4 | « À la maison, il n'y manque qu'une chose l'hiver : de quoi dormir… » | « À la maison, l'hiver, il ne manque à cette liste que de quoi dormir… » | Règle 0 (« il n'y manque ») |
| 5 | Étape 5 | « répartir l'eau en trois » ; tableau « De quoi faire de l'eau » | « répartir l'eau en trois parts » ; « De quoi rendre l'eau buvable » | Règle 0 ; on ne fait pas d'eau, on la rend buvable (le mot de l'étape 6) |
| 6 | Étape 7 | « Un bidon gelé ne donne pas d'eau pendant des heures, et il faut du combustible pour faire fondre de la neige. » | « Un bidon gelé ne donne pas d'eau pendant des heures : il faut du combustible pour le faire dégeler. » | Deux idées sans lien ; voir le fait signalé 6 |
| 7 | Étape 10 | « Un appareil au butane ne sert donc qu'au-dessus de zéro. » | Coupé | Redit la phrase d'avant (« sous zéro, une cartouche de butane ne donne presque plus de gaz ») |
| 8 | Étape 11 | « ils restent dehors, même pour cuire » | « les garder dehors, même pour cuire » | Consigne au présent qui décrit |
| 9 | Étape 13 | « et ce qu'on réchauffe vient en plus » ; tableau « Elle est sèche, salée et légère » | « et les aliments à réchauffer s'ajoutent à ces trois jours » ; « Elle est salée et légère » | Règle 0 ; « sèche » redit « séchée » |
| 10 | Étape 14 | « Ni le sel, ni la fumée, ni le séchage, ni le gel ne tuent la trichine » | « Ni le sel, ni le fumage, ni le séchage, ni le gel domestique ne tuent la trichine » | Le rappel de sécurité dans ses mots (`CLAUDE.md`, tableau des rappels ; les ch. 5 et 7 le disent ainsi) |
| 11 | Étape 20 | « les nouvelles du dehors » | « les nouvelles » | Le complément qui décore |
| 12 | Étape 24 | « deux enfants du même âge ne reçoivent pas la même dose » | « … s'ils n'ont pas le même poids » | Le but dit en clair |
| 13 | Étape 25 | « Faire relire… que celui qui a monté la trousse : la personne qui la monte oublie ce dont elle n'a pas besoin. » | « Faire relire… que celui qui a monté la trousse. » | Redite du titre de l'étape |
| 14 | Étape 31 | « Dégager le tuyau d'échappement de la neige » | « Dégager la neige autour du tuyau d'échappement » | Règle 11, ordre |
| 15 | Section 5 | « Mettre de l'eau dans le bac » ; « Mettre dans la trousse, dès le lendemain, ce qui a manqué » | « Passer de l'eau du sac au bac » ; « Mettre ce qui a manqué dans la trousse dès le lendemain » | Le geste dit en clair ; règle 11 |
| 16 | Section 7, rouleau | « Coucher ce qui part en ligne le long d'un bord » ; « la boîte des papiers » ; « un rouleau lâche se défait au premier arbre, et il faut le refaire à genoux dans la neige » | « Coucher les choses à emporter en ligne, le long d'un bord » ; « les papiers » ; « un rouleau lâche se défait au premier arbre » | « ce qui part en ligne » se lit de travers ; la section n'a pas de boîte étanche ; petite scène |
| 17 | Section 7, courroie | « Un adulte qui n'a jamais porté au front commence avec une charge légère » | « … doit commencer avec une charge légère » | Consigne au présent qui décrit |
| 18 | Section 7, traîner | « Sur la neige, on traîne ce qu'on ne peut pas porter. Prendre un traîneau… » ; « deux traits » ; « les traits et les barres » | « Sur la neige, traîner ce qu'on ne peut pas porter sur un traîneau… » ; « deux cordes de tirage » ; « les cordes et les barres » | Redite du titre ; mot de métier (« trait ») |
| 19 | Section 7, papiers | « écrire le nom et un numéro de téléphone au stylo, à l'intérieur de l'avant-bras de chaque enfant » | « écrire le nom de chaque enfant et un numéro de téléphone à l'intérieur de son avant-bras, au stylo » | Règle 0 (le nom de qui) |
| 20 | Section 7, eau | « : gourdes, chaudrons, bidons, le bain, la cuve…, les chaudières » | « : les gourdes, les chaudrons, les bidons, le bain, la cuve… et les chaudières » | Les articles |
| 21 | Section 7, chauffe-eau | « et ne le remettre sous tension que quand le chauffe-eau est de nouveau plein » ; « Ouvrir le robinet de vidange, au bas du chauffe-eau, au-dessus de contenants propres. » | « et ne remettre le chauffe-eau sous tension que quand il est de nouveau plein » ; « Mettre des contenants propres sous le robinet de vidange, au bas du chauffe-eau, et l'ouvrir. » | « le » visait le disjoncteur ; les gestes dans l'ordre |
| 22 | Section 7, sac à ordures | « On ne peut pas le porter plein, parce qu'il ne tient pas sa forme » | « Sorti de son support, il ne tient pas sa forme, et on ne peut pas le porter plein » | La phrase d'avant le mettait dans un sac à dos |
| 23 | Section 7, filtrer | « qui cache les microbes au chlore » ; « plutôt que de la chlorer » | « qui protège les microbes de la javel » ; « plutôt que d'y mettre de la javel » | Un seul mot (« javel ») dans le chapitre |
| 24 | Section 7, chaud | « Monter ensuite une tente dans la pièce : une couverture par-dessus la table, deux draps tendus…, un matelas debout… » ; « Sous le matelas ou le sac de couchage, étendre du carton… » | « …: étendre une couverture par-dessus la table, tendre deux draps…, et dresser un matelas… » ; « Étendre du carton… sous le matelas ou le sac de couchage » | Noms à la place des gestes ; règle 11 |
| 25 | Section 7, combustible | « Le poêle brûle le bois sec qui n'est ni traité, ni peint, ni verni, ni collé : branches mortes… » puis « Ne jamais brûler les palettes, le bois traité, peint ou verni, le contreplaqué ni le plastique. » | « Mettre au poêle du bois sec et propre : des branches mortes… » puis « Ne jamais brûler de palettes, de bois traité, peint, verni ou collé, de contreplaqué ni de plastique. » | La même liste dite deux fois ; la consigne dite comme une consigne |
| 26 | Section 7, intertitre | « Lumière et piles » | « La lumière et les piles » | Les articles |
| 27 | Section 7, piles | « Une pile alcaline refroidie n'est pas vide : elle reprend quand elle se réchauffe. Une pile qui ne donne plus rien dehors redonne ce qu'il lui reste une fois réchauffée sous les vêtements » | « Une pile alcaline refroidie n'est pas vide : la réchauffer sous les vêtements, et elle redonne ce qu'il lui reste » | Deux phrases qui disaient la même chose |
| 28 | Section 7, gras | « ne suffit pas : c'est le mal de caribou » | « mène au mal de caribou » | Règle 0 ; le rappel reste entier |
| 29 | Section 7, cuire | « Dehors, un feu et trois roches sèches tiennent le chaudron. Un réchaud de fortune, fait de carton… roulé… et noyé…, chauffe… : s'en servir dehors seulement. » | « Dehors, poser le chaudron sur trois roches sèches, au-dessus d'un feu. Pour un réchaud de fortune, rouler serré du carton… et le noyer… : il chauffe une conserve longtemps. S'en servir dehors seulement. » | Participes en chaîne ; les gestes |
| 30 | Section 7, ne se remplace pas | « (étape 22). Rien ne les remplace. » ; « Un trou d'épingle percé dans un carton, tenu contre l'œil, rend l'image plus nette… : le petit trou… » | « (étape 22). » ; « Percer un trou d'épingle dans un carton et le tenir contre l'œil : l'image devient plus nette…, parce que le petit trou… » | Redite de l'intertitre ; participes |
| 31 | Section 7, fin | « Pour que cette version marche le soir où on en a besoin, la répéter… » | « Pour être capable de monter une trousse en une soirée le jour où il le faut, s'exercer… » | Phrase qui parle du chapitre (« cette version ») |
| 32 | En plus, pemmican | « la traite des fourrures en ravitaillait ses voyageurs » | « il ravitaillait les voyageurs de la traite des fourrures » | Règle 0 |
| 33 | En plus, pile au lithium | « Pour les piles de rechange…, la pile au lithium est donc plus légère et se périme moins vite (étape 18). » | « Elle convient donc aux piles de rechange qu'on porte sur soi et qu'on ne vérifie que deux fois par année (étape 18). » | Conclusion qui redit les deux chiffres d'avant |

## Faits signalés (pas corrigés)

1. **Section 7, « La roche du poêle » : « elle garde sa chaleur plus longtemps que l'eau ».** À masse égale, l'eau
   garde plus de chaleur que la pierre (sa chaleur massique est environ quatre fois plus grande). La phrase est peut-être
   juste pour une grosse roche contre une petite bouteille, mais telle quelle, elle dit le contraire du fait physique.
   À sourcer ou à couper.
2. **Section 7, « L'eau quand il n'y a plus de pression » : « Au chalet, le faire dès qu'on comprend que le courant ne
   reviendra pas : la pompe du puits s'arrête avec lui, et il ne reste que quelques minutes de pression. »** Si la
   pompe s'arrête avec le courant, il faut remplir dès que le courant manque, pas quand on comprend qu'il ne reviendra
   pas : à ce moment-là, la pression est déjà partie. À reprendre par le rédacteur.
3. **Le pemmican** est aussi une note « En plus » du ch. 5, avec les mêmes faits. Un recoupement : en garder une, ou
   faire dire à chacune autre chose (voir `suivi/05-edition.md`, fait 7).
4. **Étape 6 et ch. 7, étape 8 : le temps d'attente de la javel.** Le ch. 6 dit 30 minutes au-dessus de 20 °C, 1 heure
   plus froid et 2 heures sous 10 °C ; le ch. 7 dit 30 minutes sans condition pour l'eau du robinet sous avis
   d'ébullition. L'hiver, l'eau du robinet est sous 10 °C. À harmoniser (ch. 10, étape 21).
5. **Section 7, « La chaudière en sac à dos » : « Le rebord fait vite mal à l'épaule : glisser un linge plié sous la
   corde. »** Le linge protège de la corde, pas du rebord ; si c'est la corde qui scie l'épaule, la phrase devrait le
   dire. Pas changé.
6. **Étape 7, le bidon gelé** (ligne 6 du tableau) : la phrase d'avant parlait de faire fondre « de la neige ». Elle dit
   maintenant qu'il faut du combustible pour dégeler le bidon, ce que la première moitié laissait entendre. Si le
   rédacteur voulait dire qu'on doit alors faire fondre de la neige faute d'eau, remettre « de la neige ».

## Liste de contrôle de l'éditeur (cadre des agents, partie « Le texte »)

- Sept sections, pas de « Comment ça marche », pas de section Danger, pictogrammes dans les étapes : fait (inchangé).
- Rien sous le titre que la ligne de lieu : fait (« **Maison** »).
- Section 2 sans « mauvaise procédure » : fait.
- Règle 0, phrase par phrase : fait (33 changements ci-dessus).
- Pas de maxime, de chute, d'opposition fabriquée, d'image, de petite scène, de chose qui pense : fait (lignes 7, 13, 16,
  27, 31, 33).
- Pas de pronominal pour une consigne, consigne dite comme une consigne, ordre naturel : fait (lignes 2, 8, 14, 15, 17,
  21, 24, 25).
- Un seul mot par chose (« javel », « cordes de tirage ») ; les mots de tous les jours (« trait » sort) : fait.
- Aucun tiret dans le texte, aucun « § » : fait (les deux tirets restants sont le titre et la ligne de tome).
- Inventaire des faits, un fait une fois : fait pour les redites dans le chapitre (lignes 7, 13, 18, 25, 27, 30) ; le
  pemmican en double avec le ch. 5 est signalé (fait 3).
- Planches : le chapitre n'en a pas ; rien à appeler.
- controle.py : 0 tiret dans le texte, 0 « § », 0 mot banni, rien de disparu.
- Aucun chiffre changé, aucune source cherchée : fait.
