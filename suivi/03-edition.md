# Édition : Chapitre 3, Panne majeure d'Hydro en janvier

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/03-panne-majeure-d-hydro-en.md` au gabarit final, après les corrections du rédacteur qui
  suivent la vérification technique (`suivi/03-redaction.md`, « Corrections après la vérification technique, 19 octobre
  2026 »), du titre à la dernière note « En plus ». Texte d'avant l'édition : commit `42d036f`.
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31 ; les points 12 à 16 visent ce
  chapitre), `suivi/03-redaction.md` (refonte et corrections du 19 octobre), `plan/glossaire.md` (chaudière contre
  seau), le logigramme `images/logigrammes/03-panne-hydro.json`, boîte par boîte.
- **Aucune source nouvelle cherchée, aucun chiffre ni aucun fait changé**, sauf la parenthèse « (20 pi) » retirée
  (règle 3 de `CLAUDE.md`, no 14). Ce qui touche un fait est signalé plus bas.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé.
- **Ancres :** les six ancres rendues par le rédacteur sont intactes, chacune au début d'un seul paragraphe :
  logigramme « **Thermomètre à sonde** » ; 03-08 « **La marmite norvégienne.** » ; 03-09 « 9. **Avant la nuit, monter un
  abri dans la pièce** » ; 03-10 « 23. **Vidanger dans l'ordre** » ; 03-11 « **Dégeler un tuyau sans flamme.** » ;
  03-12 « **Fermer les fenêtres.** ». `controle.py` signale encore 03-08, 03-09 et 03-10 parce que
  `placements-tome-1.json` porte les anciennes ancres (à reporter par l'orchestrateur, comme le dit
  `suivi/03-redaction.md`). Chaque appel « (planche 03-NN) » et chaque renvoi « repère N » est à sa place, dans l'ordre.
  Aucune étape renumérotée (1 à 40) : les renvois des ch. 8, 13, 84 et 86 ne bougent pas.
- **Logigramme :** pas touché ; ses boîtes disent la même chose que le texte édité.
- **Largeur des lignes :** les paragraphes touchés, et la longue ligne de l'étape 6 (« Sans poêle »), sont remis à la
  largeur du fichier, sans changer un mot ; le Matériel garde une ligne par item.

## controle.py, avant et après

| | Avant (`42d036f`) | Après |
| --- | --- | --- |
| Mots | 8 358 | 8 425 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes) |
| « § », mots bannis, tournures, maximes, mises en relief | 0 | 0 |
| Vocabulaire d'IA | 1 (« au niveau de la mer », au sens propre) | 1 (le même, gardé) |
| Mots vides à juger | 49 | 47 |
| Redites à juger | 5 | 3, gardées : « vidanger la maison (étapes 21 à 25) » (deux renvois), « verre à la pièce de monnaie » et « dans la pièce la plus froide » (le nom de la chose). Les deux « faire bouillir au moins 1 minute » (étapes 4 et 39, deux moments) ne sortent plus en double |
| Ancres introuvables | 3 (03-08, 03-09, 03-10 : `placements-tome-1.json` pas encore à jour) | Les mêmes ; les ancres nouvelles sont dans le texte |
| Invariants disparus | | « 20 pi » (no 14) |

## Les phrases changées, avant et après

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Étape 1 | « On voit de la rue un mât arraché… » ; « on traite la maison comme… : on vidange… et on décide du départ » | « De la rue, on voit un mât arraché… » ; « traiter la maison comme… : vidanger… et décider du départ » | Règle 11 ; consigne à l'infinitif dans une étape |
| 2 | Étape 3 | « Sans elle, on doit traiter… » | « Sans cette heure, on doit traiter… » | « elle » était à deux phrases de l'heure |
| 3 | Étape 4 | « du courant, du réseau ou d'une génératrice » ; « l'eau du réseau » ; « On doit donc faire bouillir au moins 1 minute l'eau qui coule… ; l'eau remplie avant » | « du courant, celui d'Hydro-Québec ou celui d'une génératrice » ; « l'eau de l'aqueduc » ; « Il faut donc faire bouillir l'eau qui coule…, au moins 1 minute ; l'eau tirée avant » | Un seul mot par chose : « réseau » nommait le courant, l'eau et le cellulaire ; règle 11 |
| 4 | Étape 5 | « à faible dose, l'avertisseur peut ne pas sonner avant des jours » ; « …la génératrice. Pas même pour peu de temps, ni avec une fenêtre entrouverte : » ; « ne faire brûler dans la maison que le poêle » | « quand il y a peu de monoxyde, l'avertisseur peut ne pas sonner pendant des jours » ; « (le barbecue…, la génératrice), même pour peu de temps, même avec une fenêtre entrouverte : » ; « n'allumer dans la maison que le poêle » | Mot de métier ; phrase sans verbe ; on ne fait pas brûler un poêle (même verbe qu'au ch. 1) |
| 5 | Étape 6 | « la tenir haute dans le poêle » ; « même porte du poêle fermée » | « la tenir le plus haut possible dans le poêle » ; « même quand la porte du poêle est fermée » | Règle 0 |
| 6 | Étape 6, « Sans poêle » | « …(ch. 2). La maison vidangée peut rester froide sans dégâts pendant que la famille est au chalet. » | « …(ch. 2). » | Redite de l'étape 25 |
| 7 | Étape 7 | « Choisir la pièce pour la chaleur des gens : on protège la plomberie en la vidangeant » | « Choisir la pièce pour garder les gens au chaud : la plomberie, on la protège en la vidangeant » | Règle 0 |
| 8 | Étape 10 | « encombre moins le réseau qu'un appel » | « encombre moins le réseau cellulaire qu'un appel » | On nomme le réseau (no 3) |
| 9 | Étape 11 | « Décider si la famille reste à la maison, au réveil et assez tôt pour partir de jour » ; « Partir pendant que la maison est encore confortable quand la panne touche toute la région… » | « Au réveil, assez tôt pour pouvoir partir de jour, décider si la famille reste à la maison » ; « Quand la panne touche toute la région…, partir pendant que la maison est encore confortable » | La condition avant le geste |
| 10 | Étape 12 | « Prendre au passage les manteaux » | « En passant, prendre les manteaux » | Règle 11 |
| 11 | Étape 16 | « l'échappement tourné à l'opposé des portes…, jamais au garage » | « et tourner l'échappement à l'opposé des portes… Ne jamais l'installer au garage » | Participe ; phrase sans verbe. Le rappel de `CLAUDE.md` reste entier |
| 12 | Étapes 17 à 20 | « dans ses prises » ; « déclencher son disjoncteur » ; « jusqu'à ce que son thermomètre revienne » ; « faire le plein moteur froid » | « dans les prises de la génératrice » ; « déclencher le disjoncteur de la génératrice » ; « jusqu'à ce que le thermomètre du congélateur revienne » ; « faire le plein quand le moteur est froid » | Le possessif qui oblige à chercher ; télégraphe |
| 13 | Étape 21 | « D'ici la vidange » | « En attendant la vidange » | Règle 0 |
| 14 | Étape 16 | « à au moins 6 m (20 pi) de tout bâtiment » | « à au moins 6 m de tout bâtiment » | Règle 3 de `CLAUDE.md` : l'impérial seulement pour les dimensions de construction ; les ch. 1 et 2 disent « 6 m ». Le chiffre métrique ne change pas |
| 15 | Étape 22 | « Deux relevés… donnent la pente, et la pente donne l'heure d'arrivée à 5 °C : une maison… » | « Faire deux relevés… : on en tire le nombre de degrés perdus à l'heure, et donc l'heure où la pièce arrivera à 5 °C. Une maison… » | Loi en formule ; le geste d'abord ; « pente » n'est employé nulle part ailleurs dans le chapitre |
| 16 | Étape 23 | « Sans lui, le chauffe-eau ne se vide pas » | « Sans cette entrée d'air, le chauffe-eau ne se vide pas » | On nomme la chose |
| 17 | Étape 26 | « Le puisard reste calme tant que rien ne dégèle ; il se remplit… » | « Le puisard ne se remplit pas tant que rien ne dégèle ; il se remplit… » | Image (« calme ») |
| 18 | Étapes 29 à 31 | « pour lire les traces de bêtes » ; « À l'ouverture, juger chaque paquet à la sonde, au centre » ; « mesuré à la sonde » | « pour chercher des traces de bêtes » ; « À l'ouverture du congélateur, planter la sonde au centre de chaque paquet » ; « en mesurant avec la sonde » | Règle 0 ; le geste |
| 19 | Étape 33 | « Un médicament gardé au réfrigérateur suit la même horloge que les aliments : se fier à l'heure écrite » | « Pour un médicament gardé au réfrigérateur, compter le temps comme pour les aliments, à partir de l'heure écrite » | Image d'un autre chapitre (« horloge ») |
| 20 | Étape 34 | « restent à cuire à 74 °C » | « doivent être cuits à 74 °C » | Consigne dite comme une consigne |
| 21 | Étape 39 | « faire bouillir au moins 1 minute l'eau à boire et celle des biberons » | « faire bouillir l'eau à boire et celle des biberons au moins 1 minute » | Règle 11 |
| 22 | Signes d'échec, quatre rangées | « ni alcool ni cigarette » ; « La torche de papier, ou une fenêtre entrouverte » ; « Sortir le bidon, aérer ; aucune flamme, aucun interrupteur actionné » ; « Vider à la chaudière » | « ne lui donner ni alcool ni cigarette » ; « Allumer une torche de papier, ou entrouvrir une fenêtre » ; « Sortir le bidon et aérer ; n'allumer aucune flamme et ne toucher à aucun interrupteur » ; « Le vider à la chaudière » | Noms sans verbe |
| 23 | Section 7, « Fermer les fenêtres » | « les lattes bout à bout aux coins » ; « Tenir le bas par sa latte » ; « Les quatre côtés comptent : … 10 % au plus (repère 7). L'air de la pièce entre… » ; « fermé en haut, tenu sur les côtés, touchant le rebord…, et les deux pans croisés » | « en mettant les lattes bout à bout aux coins » ; « Clouer aussi la latte du bas » ; « Fermer les quatre côtés : … 10 % au plus (repère 7), parce que l'air de la pièce entre… » ; « le fermer en haut, le tenir sur les côtés, le laisser toucher le rebord…, et croiser les deux pans » | Participes en chaîne ; le geste ; le lien entre les deux faits dit (signalé, point 7). Ordre des repères inchangé |
| 24 | Section 7, « Les pierres chaudes » | « Le poêle arrête de chauffer quand il s'éteint ; la masse posée dessus continue de chauffer après lui. Des briques… chauffent… Une pierre chaude enveloppée… et glissée… » | « Poser sur le poêle des briques… : ils chauffent… et redonnent leur chaleur…, quand le feu tombe. Envelopper une pierre chaude… et la glisser… : elle le garde chaud… » | Évidence et opposition ; participes |
| 25 | Section 7, pierres et poêle | « ramassées en hauteur » ; « un joint de porte mangé » ; « l'argile, la glaise grise…, mouillées jusqu'à » ; « enrouler par-dessus le joint une bande… » ; « une fissure colmatée se rouvre » | « ramassées sur un terrain haut » ; « un joint de porte usé » ; « l'argile (la glaise grise…), et les mouiller jusqu'à » ; « enrouler une bande… par-dessus le joint » ; « peut se rouvrir » | Règle 0 ; règle 11 |
| 26 | Section 7, « Le sac à fonte » | « Faire fondre la neige dans une marmite occupe le dessus du poêle toute la journée. Prendre plutôt… » ; « Le sac ne prend pas de place sur la plaque, et on le remplit… » ; « Sur la plaque, garder la marmite de neige toujours en partie pleine, pour ne pas brûler le fond » | « Pour faire fondre la neige sans occuper le dessus du poêle, prendre… » ; « On remplit le sac… » ; « Si on fait fondre la neige dans une marmite sur la plaque, garder toujours de l'eau au fond de la marmite, pour ne pas la brûler » | Redite (la plaque dite trois fois) ; règle 0 |
| 27 | Section 7, « Vidanger sans antigel » | « …sous l'évier, avec un seau dessous » ; « un circuit qui reverra l'eau à boire » | « (le bouchon vissé…, sous l'évier), avec une chaudière dessous » ; « un tuyau où passera de l'eau à boire » | Glossaire : « chaudière » partout (le chapitre disait déjà « chaudière » ailleurs) ; chose qui « reverra » |
| 28 | Section 7, « Dégeler un tuyau sans flamme » | « Chauffer à l'eau chaude seulement, jamais à la flamme : » | « Ne jamais chauffer à la flamme : » | Redite (l'eau chaude est au repère 3) |
| 29 | Section 7, « Réparer un tuyau fendu » | « On peut fermer à froid un tuyau » ; « Couper l'eau » ; « replier l'écrasé sur lui-même » ; « Pour souder, … dans la ligne » ; « Rouvrir ensuite l'eau : … par le robinet, qu'on laisse couler longtemps, l'aérateur dévissé » ; « est colmaté, pas réparé » | « On peut colmater un tuyau… sans le souder » ; « Fermer l'entrée d'eau » ; « replier la partie écrasée sur elle-même » ; « Quand on soude, … dans le tuyau » ; « Ensuite, rouvrir l'eau : … par le robinet. Dévisser l'aérateur du robinet et laisser couler longtemps » ; « n'est que colmaté » | Mot de métier ; un seul mot par chose (« l'entrée d'eau », « le tuyau ») ; participe ; opposition |
| 30 | Section 7, « Le puisard sans pompe » | « Un siphon au boyau d'arrosage marche aussi, mais il gèle dès qu'on l'arrête » | « On peut aussi siphonner l'eau avec un boyau d'arrosage, mais le boyau gèle dès qu'on arrête » | « siphon » nomme aussi le coude des éviers dans la même section |
| 31 | Section 7, les aliments | « jeter le périssable » ; « Un verre d'eau gelé, avec une pièce…, laissé dans le congélateur…, montre » ; « Le même verre, sans pièce, posé dans la pièce la plus froide : si une pellicule…, la pièce est sous 0 °C » | « jeter les aliments périssables » ; « Faire geler un verre d'eau, poser une pièce de monnaie sur la glace, et laisser le verre dans le congélateur… : il montre » ; « Sans pièce de monnaie, un verre d'eau posé dans la pièce la plus froide montre si elle descend sous 0 °C : quand une pellicule… » | Participes en chaîne ; « pièce » voulait dire la monnaie et la chambre dans la même phrase |
| 32 | Section 7, « La marmite norvégienne » (paragraphe ancré : début intact) | « : un lit épais au fond (repère 1), et, tout autour de la place de la marmite, de la laine…, bien tassés » ; « couvercle mis » ; « Un tiroir n'a pas de couvercle : la couverture en tient lieu » ; « la maîtrise du temps et la garantie de température » | « : mettre un lit épais au fond (repère 1), et tasser de la laine… tout autour de la place de la marmite » ; « avec son couvercle » ; « Dans un tiroir, qui n'a pas de couvercle, la couverture sert de couvercle » ; « on ne contrôle plus le temps ni la température de cuisson » | Noms sans verbe ; mots de rapport |
| 33 | Section 7, « Cuire sans sonde » | « l'eau bouillante, qui marque 100 °C » ; « Couper la viande petite » | « qui est à 100 °C » ; « Couper la viande en petits morceaux » | Chose qui « marque » ; règle 0 |
| 34 | Section 7, « Le 12 V » | « les bornes dégagées, rien de métallique dessus. Au froid, elle donne moins : à −18 °C… » ; « brancher directement dessus un ruban » ; « l'auto dehors » ; « tirée à fond ne revient jamais complètement » | « sans rien de métallique sur les bornes. À −18 °C… » ; « brancher un ruban… directement sur la batterie » ; « l'auto stationnée dehors » ; « vidée à fond ne se recharge jamais complètement » | Participes ; redite (le chiffre dit la même chose) ; règle 11 ; un seul mot (« vider ») |
| 35 | Section 7, « La génératrice qui ne part pas » | « Quatre causes, qu'on règle… » ; « repartir avec de l'essence fraîche » ; « Le vieux carburant » ; « Le trou est calibré » | « Elle a souvent l'une de ces quatre causes, qu'on règle… » ; « remplir avec de l'essence fraîche » ; « La vieille essence » ; « Le trou a une taille précise » | Phrase sans verbe ; un seul mot (« essence ») ; mot de métier |
| 36 | Section 7, « L'éclairage » | « le bout seulement dehors » ; « Laisser dépasser la mèche à peine » ; « la flamme creuse son bassin de graisse fondue » ; « Faire brûler la lampe » | « en laissant seulement le bout dépasser » ; « La mèche doit dépasser à peine » ; « la flamme fasse fondre un petit bassin de graisse autour de la mèche » ; « Allumer la lampe » | Règle 0 ; image |
| 37 | Section 7, voisins et nouvelles | « Le proposer dès le premier jour » ; « une station…, qu'on n'entend pas à midi, entre après le coucher du soleil » ; « Retrouver le lien : ch. 14 » | « Proposer le regroupement dès le premier jour » ; « après le coucher du soleil, on capte une station…, qu'on n'entend pas à midi » ; « Pour rétablir les communications : ch. 14 » | On nomme la chose ; chose qui « entre » ; étiquette |

Tout le reste a été lu phrase par phrase et gardé, dont les phrases que JP a déjà corrigées et approuvées (étape 7,
« La perte de chaleur d'une maison est proportionnelle… » ; étape 9, « Un corps couché perd sa chaleur… » ; la vidange
de l'étape 23 ; « Le moteur est encore chaud quand on pose la main dessus… » ; « s'il n'est plus dur au centre, on doit le
cuire tout de suite ou le jeter ») et la ligne de Matériel « **Thermomètre à sonde** : il porte les 74 °C » (forme de
l'exemple de `CLAUDE.md`).

## Faits signalés (non touchés)

1. **Étape 10, le message texte arrive en dixième geste** d'une série de 6 h, alors que les tours cellulaires tiennent 2
   à 4 h (« Les tours cellulaires pendant une panne »). Le ch. 1 a monté le même message en tête de sa série (étape 6,
   après la vérification technique). Le monter ici renumérote les étapes 6 à 9, dont l'ancre de la planche 03-09 et
   les renvois des autres chapitres : décision au rédacteur.
2. **Section 7, « Ce qui ne se remplace pas »** : « Une chandelle brûle normalement dans une pièce chargée de
   monoxyde » n'a pas de fiche (NON RETROUVÉ au ch. 12, `suivi/12-technique.md`, point 84) ; la même idée a été coupée
   au ch. 2 pour cette raison.
3. **Étape 9, l'ordre des gestes** : la puce « Coucher tout le monde » (repères 4 à 6) vient avant « Faire le lit en
   couches » (repères 8 à 10). On fait le lit avant de se coucher. Le texte suit l'ordre des repères de la planche
   03-09 ; changer l'un oblige à changer l'autre.
4. **Section 7, « Le verre à la pièce de monnaie »** : « On le prépare en cinq minutes, le premier soir. » Un verre d'eau
   ne gèle pas en cinq minutes ; le ch. 1, étape 15, dit qu'on le fait geler dehors l'hiver.
5. **Section 7, l'huile dans le siphon** : « une tasse d'huile de cuisson », la seule mesure du chapitre qui n'est pas
   en mL ou en L (règle 3).
6. **Le lave-glace (méthanol)** de « Vidanger sans antigel » n'a pas de pictogramme ; l'antigel de moteur de l'étape 24
   porte `{!poison}`.
7. **« Fermer les fenêtres », repères 7 et 8** : les deux faits (la couverture aux bords ouverts réduit la perte de 10 %
   au plus ; l'air de la pièce fait une boucle par le haut et le bas) étaient posés côte à côte. Je les ai liés par
   « parce que ». À confirmer dans `03-cornell-cce-traitements-fenetres-economie-energie.md`.
8. **L'antigel** : étape 24 (« autant qu'il y a d'eau dans le siphon », « 0,5 à 1 L dans la cuvette et dans le
   réservoir ») contre le ch. 2, étape 20 (0,5 L par évier ; 0,5 L au réservoir et 1 L à la cuvette).
9. **`placements-tome-1.json`, clé « 03 »** : 03-08, 03-09 et 03-10 portent encore les ancres d'avant la refonte ; les
   nouvelles sont dans la liste des ancres plus haut.

## Liste de contrôle (cadre des agents, partie « Le texte »)

- [x] Sept sections, plus « En plus » ; pas de « Comment ça marche », pas de section Danger ; renvois « section N » justes.
- [x] Sous le titre, la ligne de lieu seule (`**Maison**`).
- [x] Section 2 : seulement quand l'utiliser (non touchée).
- [x] L'année et la nuit : l'été a sa ligne en section 2 ; « La nuit » marqué aux étapes 6, 15, 16 et dans le chapeau.
- [x] Séries orange : déclencheurs et pastilles (15 min, 6 h, 1 min) non touchés ; l'ordre du message signalé (point 1).
- [x] Le logigramme vient après le Matériel (ancre intacte) ; ses boîtes relues, rien de contraire au texte.
- [x] Encadrés « En plus » : une photo, deux façons des Inuits, un fait ; non touchés.
- [x] Règle 0 : chaque phrase lue à voix haute ; 37 corrections, environ 90 phrases.
- [x] Pas de loi en formule (no 15), de « d'où », de « X passe là où Y » (étape 10 reste dite par son mécanisme).
- [x] Pas de chose qui pense, parle, marque ou entre (nos 17, 19, 27, 33, 37).
- [x] Consigne jamais au pronominal (no 20) ; les « se » qui restent sont des choses qui le font seules.
- [x] Pas de « ceux qui » ; ordre naturel (nos 1, 3, 10, 21, 25, 34) ; consigne à l'infinitif dans une étape (no 1).
- [x] On nomme la chose au lieu du possessif (nos 2, 12, 16).
- [x] Mots de tous les jours ; un seul mot par chose (« réseau », « seau », « siphon », « essence », « l'entrée d'eau »).
- [x] Aucun tiret dans le texte ni dans les titres (les deux du titre et de la ligne de tome sont la forme de l'assembleur).
- [x] Titres de sous-sections : noms de gestes ou de choses (non touchés).
- [x] Procédures découpées en sous-étapes avec leurs repères, dans l'ordre (non touchées ; point 3 signalé).
- [x] Répétition : redites retirées (nos 6, 26, 28, 34).
- [x] Planches : chaque appel « (planche 03-NN) » en place, une fois par phrase ; chaque ancre est un début de paragraphe unique.
- [x] `controle.py` : 0 tiret dans le texte, 0 « § », 0 mot banni ; chaque avis jugé ; invariant « 20 pi » justifié.
- [x] Aucun chiffre nouveau, aucune source cherchée ; rien commité.
