# Édition : Chapitre 8, Listes par scénario

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/08-listes-par-scenario.md` au gabarit final (sept sections et « En plus »), du titre à
  la dernière note « En plus », relu phrase par phrase à voix haute. Texte d'avant l'édition : celui de `HEAD`
  (commit `03abf7a`, identique au fichier de travail au début de l'édition).
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31),
  `plan/glossaire.md` (chaudière contre seau), `suivi/08-redaction.md`.
- **Aucune source nouvelle cherchée, aucun chiffre ni aucun fait changé.** Ce qui touche un fait est signalé plus bas.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé.
- **Ancres :** le chapitre n'a ni planche ni photo (`placements-tome-1.json`, clé `"08"` vide). Aucun intertitre de la
  section 7 renommé (« L'eau du bâtiment », « Le sang qui coule sans trousse », « Le CO sans avertisseur » restent, ils
  sont appelés ailleurs dans le chapitre). Aucun scénario renuméroté.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 6 723 | 6 867 |
| Tirets | 2 (titre et ligne de tome, forme que lit l'assembleur) | 2 (les mêmes) |
| « § », mots bannis, tournures, mises en relief, redites | 0 | 0 |
| Vocabulaire d'IA | 1 (« au niveau de la mer », une vraie mesure) | 1 (le même) |
| Maximes | 0 | 1, jugée : la note 1, « Un blessé qui cesse de frissonner sans avoir été réchauffé ne va pas mieux : il vient de passer au stade grave. » Ce n'est pas un proverbe, c'est le fait qui retourne la lecture naturelle ; le script la voit depuis que la phrase est coupée en deux |
| Mots vides à juger | 43 | 40 (les « tout », « encore », « bien » restants portent le sens) |
| Invariants disparus | | rien |

## Les phrases changées

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Section 2 | « (section 5 ; rotation : ch. 5 ; achats : ch. 00b) » | « (section 5 ; la rotation du stock est au ch. 5, les achats au ch. 00b) » | Étiquette en raccourci |
| 2 | Section 3, eau | « (sans réserve : section 7…) » | « (si on n'a pas de réserve : section 7…) » | Étiquette en raccourci |
| 3 | Section 4, chapeau | « Choisir le scénario qui ressemble à l'événement sur cinq questions » | « … qui ressemble le plus à l'événement, en se posant cinq questions » | Règle 0 |
| 4 | Chapeaux des scénarios 1, 4, 5, 6, 7, 8, 9 | « *Détaillé au ch. N.* » | « *Le détail est au ch. N.* » | Participe sans sujet |
| 5 | Scénario 1, chapeau | « Au chalet, hors réseau, la génératrice ou le propane s'arrête : scénario 8 et ch. 87. » | « Au chalet, la panne vient de la génératrice ou du propane qui s'arrête : voir le scénario 8 et le ch. 87. » | Précision que le lecteur a déjà (« hors réseau ») ; étiquette |
| 6 | Scénario 1, repère | « Frigo fermé : environ 4 h. Congélateur : scénario 8 » | « Le frigo fermé garde le froid environ 4 h. Pour le congélateur : scénario 8 » | Noms sans verbe |
| 7 | Scénario 1 | « dans la plus petite » | « dans la plus petite pièce » | Règle 0 |
| 8 | Scénario 1 | « Essayer l'avertisseur de CO au bouton » | « Appuyer sur le bouton d'essai de l'avertisseur de CO, puis… » | Le geste dit en clair |
| 9 | Scénario 1, `{!generatrice}` | « l'échappement tourné à l'opposé » | « l'échappement tourné du côté opposé aux bâtiments » | « À l'opposé » de rien |
| 10 | Scénario 2, chapeau | « Débâcle, glissement de terrain, verglas qui dure. Le scénario commence à la maison et… il finit au chalet : décider de monter (ch. 2) pendant que la route passe encore. » | « Une débâcle, un glissement de terrain ou un verglas qui dure coupe la route. On vit le début à la maison ; si la route reste coupée, on finit au chalet : décider de monter (ch. 2) pendant que le chemin du chalet passe encore. » | Liste de noms ; « la route » désignait deux routes dans la même phrase (voir fait signalé 5) |
| 11 | Scénario 2, repères | « 4 personnes pendant 30 jours : 120 jours-personnes » ; « Lac et neige : 5 min… ; robinet et puits : 1 min. Eau bouillie : 3 jours… » | « …, c'est 120 jours-personnes » ; « L'eau de lac et de neige bout 5 min à gros bouillons ; l'eau du robinet et du puits, 1 min. On garde l'eau bouillie 3 jours au frigo, 24 h à la température de la pièce » | Étiquettes en raccourci |
| 12 | Scénario 2, geste du jour 2 | « Au chalet : la puiser… À la maison : faire bouillir… » | « Au chalet, la puiser… À la maison, faire bouillir… » | Règle 0 |
| 13 | Scénario 3, chapeau | « Un feu de forêt qui s'en vient (ch. 7 ; le feu de forêt : ch. 11). L'évacuation part le plus souvent de la maison. Le chalet est une destination possible si… » | « Par exemple, un feu de forêt qui s'en vient. Le départ avec préavis est au ch. 7, le feu de forêt au ch. 11. On part le plus souvent de la maison, et on peut aller au chalet si… » | Nom sans verbe ; étiquette ; mot d'institution |
| 14 | Scénario 3, `{!feu-de-foret}` | « le charger prend les minutes qui servent à partir » | « le charger prend des minutes dont on a besoin pour partir » | Chute en formule |
| 15 | Scénario 4, chapeau | « En ville, on finit la nuit chez un voisin ; au chalet, la famille est dehors, l'hiver à −35 °C. » | « En ville, on finit la nuit chez un voisin. Au chalet, la famille passe la nuit dehors, à −35 °C l'hiver. » | Opposition en balancier, petite scène |
| 16 | Scénario 4, 0 à 3 s | « Décider : éteindre un feu plus petit qu'une poubelle si… » | « Éteindre le feu s'il est plus petit qu'une poubelle et qu'on a l'extincteur en main, avec la sortie dans le dos… Sinon, sortir » | Étiquette « Décider : » |
| 17 | Scénario 4, repère | « Toutes les têtes, comptées à voix haute » | « Compter chaque personne à voix haute » | Participe, image |
| 18 | Scénario 4, 1 à 5 min | « Prévenir les voisins en ville ; au chalet, prévenir par la radio… » | « En ville, prévenir les voisins ; au chalet, donner l'alerte par la radio… » | « Prévenir » sans complément |
| 19 | Scénario 4, `{!incendie}` | « et c'est avec ça qu'on passe la nuit » | « et on passe la nuit avec ce qu'on a mis là » | Mise en relief, chute |
| 20 | Scénario 5, chapeau | « ce qui manque, c'est l'accès… » ; « Le chalet isole sans effort, mais il met des heures entre un malade et les soins. » | « on perd l'accès… » ; « Au chalet, on est isolé sans effort, mais un malade est à des heures des soins. » | Mise en relief ; chose qui agit |
| 21 | Scénario 5 | « Mettre les gants, les masques et le désinfectant à l'entrée » | « Placer… » | « Mettre » se lisait « enfiler » |
| 22 | Scénario 6, chapeau | « Monter au chalet pendant le passage des retombées, c'est passer des heures… » ; « Le territoire du chalet reste atteint le plus longtemps : le lichen… pendant des dizaines d'années » | « On ne monte pas au chalet pendant le passage des retombées : on passerait des heures… » ; « Sur le territoire du chalet, le lichen, les champignons et l'orignal restent atteints pendant des dizaines d'années » | La consigne dite comme une consigne ; comparatif sans terme (« le plus longtemps ») |
| 23 | Scénario 6, 0 à 30 min | « jamais si un appareil y brûle » ; repère « Quelques heures au plus » | « mais jamais si un appareil brûle dans la pièce » ; « Les laisser bouchés quelques heures au plus » | Raccourci |
| 24 | Scénario 6, l'iode | « Personne n'en distribue… » ; « Doses et délai : ch. 4… » | « Personne ne distribue les comprimés d'iode… » ; « Les doses et le délai sont au ch. 4… » | « En » sans antécédent clair ; étiquette |
| 25 | Scénario 7, repère | « Hypothermie modérée ou grave[^1] : la vie est en jeu ; le bouger… » | « En hypothermie modérée ou grave[^1], la vie est en jeu : le bouger… » | Étiquette |
| 26 | Scénario 8, chapeau | « et il la perd en deux jours » | « et on la perd en deux jours quand il s'arrête » | Le congélateur sujet de « perdre » |
| 27 | Scénario 8, tableau | « Plein : environ 48 h ; à moitié plein : environ 24 h » ; « …en ouvrant une seule fois : plein, le congélateur garde le froid deux fois plus longtemps » ; « Pour garder la viande des mois : −18 °C… » | « Plein, il garde le froid environ 48 h ; à moitié plein, environ 24 h » ; « …pour que le congélateur soit plein, en ouvrant une seule fois » ; « Pour la garder des mois, il faut −18 °C ou moins » | Étiquettes ; redite d'une ligne à l'autre (48 h et 24 h, c'est « deux fois plus longtemps ») |
| 28 | Scénario 8, repères | « Gibier : 74 °C à cœur ; poisson : 70 °C tenu 1 min » ; « Encore des cristaux de glace : la recongeler. Dégelée et restée à 4 °C ou moins : la cuire… Passée au-dessus de 4 °C : la jeter » | « Le gibier à 74 °C à cœur ; le poisson à 70 °C, tenu 1 min » ; « S'il reste des cristaux de glace, la recongeler. Si elle a dégelé et qu'elle est restée à 4 °C ou moins, la cuire tout de suite. Si elle a passé 4 °C, la jeter » | Participes en chaîne, étiquettes |
| 29 | Scénario 9, chapeau | « …perd vite sa chaleur : la tôle et le verre n'isolent pas. » | « …perd vite sa chaleur. » | Justification que le lecteur connaît |
| 30 | Scénario 9 | « personne ne cherche un véhicule que personne n'attend » | « sinon, personne ne sait qu'il faut chercher le véhicule, ni où » | Maxime |
| 31 | Scénario 9 | « Se faire voir et entendre : le sifflet, le feu de signalisation, la lampe » | « …avec le sifflet, le feu de signalisation et la lampe » | Liste de noms |
| 32 | Scénario 9, trousse | « Mettre son eau » | « Mettre l'eau de la trousse » | Possessif qui oblige à chercher |
| 33 | Note 1 | « Modérée : gestes maladroits, difficulté à parler, confusion. … perd conscience ; un blessé… » | « Modérée : les gestes deviennent maladroits, la personne a du mal à parler et elle est confuse. … perd conscience. Un blessé… : il vient de passer au stade grave. » | Liste de noms ; une phrase, une information |
| 34 | Section 6 | « Une tablette au lieu de trois » | « On a monté une seule tablette au lieu de trois » | Étiquette |
| 35 | Section 6, CO | « même si l'alarme se tait » | « même si l'avertisseur se tait » | Un seul mot par chose |
| 36 | Section 6, enfants | « C'est la peur, pas du calme » | « Ils ont peur, même s'ils ont l'air calmes » | Opposition en formule |
| 37 | Section 6, sommeil | « Le rationnement s'est fait sur le sommeil » | « Les adultes ont pris sur leur sommeil pour faire tenir le stock » | Pronominal, formule |
| 38 | Note 2 | « …sonne clair, aigu, tapé du dos d'une cuillère ; plat, bombé ou qui sonne sourd, il ne l'est peut-être plus. » | « …et il sonne clair et aigu quand on le tape du dos d'une cuillère. S'il est plat, bombé, ou s'il sonne sourd, le pot n'est peut-être plus scellé. » | Participe inséré ; « il ne l'est » à chercher |
| 39 | Section 7, la neige | « de la neige seule dans un chaudron sec isole le métal du feu » | « de la neige seule, dans un chaudron sec, prend mal la chaleur du métal » | La neige n'est pas entre le métal et le feu : le mécanisme dit à l'endroit |
| 40 | Section 7, javel | « laisser reposer 30 minutes, pour une eau à plus de 20 °C » | « laisser reposer 30 minutes si l'eau est à plus de 20 °C » | Règle 3 |
| 41 | Section 7, une pièce | « Rétrécir encore dans la pièce » ; « Doubler la fenêtre du côté du vent d'une feuille de plastique » ; « les degrés perdus par jour décident du moment de partir » | « Faire un espace plus petit dans la pièce » ; « Doubler la fenêtre exposée au vent avec une feuille de plastique » ; « décider du moment de partir d'après le nombre de degrés perdus par jour » | Règle 0 ; complément entre le verbe et l'objet ; chose qui décide |
| 42 | Section 7, la nuit | « ranger autour des bouteilles et des bidons » ; « sortir les pierres et la fonte… et les rouler dans une couverture au pied du lit » | « ranger des bouteilles et des bidons d'eau autour du poêle » ; « prendre les pierres et le fer de fonte avec des pinces, les rouler dans une couverture et les mettre au pied du lit » | Ordre naturel ; un seul mot par chose |
| 43 | Section 7, lampe à gras | « Le contenant : … » ; « Le gras : … » ; « La mèche : …, tenue au bord… Elle trempe… et dépasse » | « Prendre comme contenant… » ; « Comme combustible, prendre du gras qui a ranci… » ; « Faire la mèche d'une lanière… et la tenir au bord… La laisser tremper… et dépasser à peine » | Liste de noms à la place des gestes ; consigne au présent qui décrit |
| 44 | Section 7, 12 volts | « pour rendre ce qu'on a pris, l'auto dehors… » ; « à −18 °C, elle ne rend que la moitié » | « pour recharger ce qu'on a pris à la batterie, avec l'auto dehors… » ; « à −18 °C, une batterie ne rend que la moitié » | Règle 0 ; « elle » se lisait « la batterie à moitié vide » |
| 45 | Section 7, ouvre-boîte | « (la règle des 2 heures : scénario 1) » ; « la frotter à l'envers, le couvercle sur une pierre plate ou sur du béton, jusqu'à… » | « (la règle des 2 heures est au scénario 1) » ; « la retourner, le couvercle contre une pierre plate ou du béton, et la frotter jusqu'à… » | Étiquette ; le geste dans l'ordre |
| 46 | Section 7, le froid du dehors | « elle garde le contenu gelé, pour qu'il ne dégèle pas puis regèle » ; « Quand le dehors ne suffit plus » | « elle empêche le contenu de dégeler puis de regeler » ; « Quand le froid du dehors ne suffit plus » | Redite dans la phrase ; mot vague |
| 47 | Section 7, se faire trouver | « Pour se faire voir : les feux de détresse, les phares allumés par périodes, le klaxon, un miroir… tourné…, un feu…, un grand X piétiné… » | « Pour se faire voir et entendre, allumer les feux de détresse, et les phares par périodes ; donner des coups de klaxon ; tourner un miroir… ; faire un feu… ; piétiner un grand X… » | Liste de noms à la place des gestes |
| 48 | En plus, Naskapis | « détachaient des os la viande du caribou » | « détachaient la viande des os du caribou » | Ordre naturel |

## Les faits signalés, sans rien changer

1. **Avertisseurs de CO, trois chapitres, trois consignes.** Section 5 : « 1 par étage habité, 1 près du poêle ; chacun
   fabriqué il y a moins de 7 à 10 ans, selon le modèle », essai « chaque automne ». Ch. 9, étape 22 et section 5 : un par
   étage, sous-sol compris, et un dans chaque pièce où quelqu'un dort la porte fermée ; « ou 7 ans quand on ne connaît
   pas le modèle » ; essai « chaque mois ». Ch. 00b, 1.A : 1 par étage habité, 1 par chambre où l'on dort porte fermée,
   1 dans la pièce du poêle, à au moins 2 m de lui. Le ch. 6 dit « deux fois par année ». À aligner.
2. **Le garrot et la ceinture.** Section 7, « Le sang qui coule sans trousse » : « une sangle large : une ceinture de
   nylon… ». Ch. 00b, E : « Une corde, un fil ou une ceinture ne serrent pas assez et coupent la peau ». Contradiction.
3. **Souder à deux batteries.** Section 7, « Le 12 volts de l'auto » : « Deux batteries montées en série donnent 24 V,
   de quoi tirer un arc de soudure (ch. 107) ». Ch. 00b, D : 24 V est sous la tension d'un arc de travail (25 à 35 V),
   l'arc ne tient que très court, et le montage à préférer est à trois batteries (36 V). Même écart au ch. 9.
4. **La mèche de la lampe à gras.** Section 7 : « un lacet de botte ou une ficelle ». Ch. 00b, B : coton seulement,
   la ficelle synthétique fond et bouche la mèche ; un lacet de botte est souvent synthétique.
5. **Scénario 2, « pendant que la route passe encore ».** La phrase disait « si la route reste coupée… pendant que la
   route passe encore » : deux routes sous le même mot. L'édition lit la seconde comme le chemin du chalet. À confirmer
   par le rédacteur.
6. **« Ce qu'on perd » après « Désinfecter sans feu, et clarifier avant ».** Il nomme « le temps et le bois de
   l'ébullition de chaque jour », qui ne s'appliquent pas à une désinfection sans feu ; il vaut pour les trois
   sous-sections de l'eau. À déplacer ou à reformuler par le rédacteur.

## Liste de contrôle du cadre (partie « Le texte »)

- [x] Sept sections, plus de « Comment ça marche », plus de section Danger ; pictogrammes dans l'étape. Fait (déjà en place, vérifié).
- [x] Rien sous le titre que la ligne de lieu. Fait.
- [x] Section 2 : seulement quand l'utiliser. Fait.
- [x] L'année : chaque scénario dit sa saison quand elle change le geste (« L'hiver, … »). Fait.
- [-] Série orange, pastille, logigramme : le chapitre est un chapitre de listes (référence), sans série orange ni
  logigramme ; rien à faire.
- [x] En plus : quatre notes de 36 à 80 mots, trois genres permis, sans planche. Fait.
- [x] Règle 0, phrase par phrase. Fait (48 retouches).
- [x] Pas de loi en formule, de « d'où », de « X passe là où », de maxime, de chute, d'opposition fabriquée, d'image, de
  chose qui pense. Fait.
- [x] Pas de pronominal pour une consigne, pas de « ceux qui », ordre naturel. Fait.
- [x] Possessif qui oblige à chercher : nommé (« l'eau de la trousse »). Fait.
- [x] Mots de tous les jours ; aucun tiret dans le texte (les deux qui restent sont le titre et la ligne de tome, lus
  par l'assembleur) ; « section N ». Fait.
- [x] Répétition : inventaire fait ; la redite « plein, deux fois plus longtemps » sort. Fait.
- [x] Planches : aucune. Fait.
- [x] `controle.py` : 0 tiret dans le texte, 0 « § », 0 mot banni, invariants intacts ; la maxime signalée est jugée. Fait.
