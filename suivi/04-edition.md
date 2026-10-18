# Édition : Chapitre 4, Retombées radioactives

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 18 octobre 2026.
- **Texte édité :** `chapitres/04-retombees-radioactives.md` après les corrections du vérificateur
  (`suivi/04-redaction.md`, section « Corrections du vérificateur, 18 octobre 2026 »), du titre à la dernière note
  « En plus » ; le logigramme `images/logigrammes/04-retombees.json`, boîte par boîte.
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet,
  `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31), `suivi/04-technique.md`,
  `suivi/04-redaction.md` (refonte et corrections), `sources/04-verification-technique-2026-10-18.md` (section 5, ORNL).
- **Aucun chiffre ni aucun fait changé.** Une seule mention retirée parce qu'elle était dite deux fois (les 24 heures de
  protection d'une dose, gardées à l'étape 14). Les fins de ligne restent LF (fichiers en LF, aucun CR).
- **Étape 18 pas touchée** (décision de JP : rester dedans ou sortir quand l'avertisseur de CO sonne), ni ce qui en
  dépend : la ligne du Matériel sur l'avertisseur, les lignes des Points de contrôle et des Signes d'échec qui disent
  « Faire l'étape 18 », et le nœud « co » du logigramme.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 9 098 | 9 094 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes) |
| « § », mots bannis, tournures, maximes, pronominaux, mises en relief | 0 | 0 |
| Âges à juger | 1 (« À partir de 4 ans » : une dose, un fait qui change le geste) | 1 (le même) |
| Mots vides à juger | 46 | 45 (« tout ce qui est faible » coupé ; les autres portent le sens) |
| Redites à juger | 12 | 13 |
| Ancres introuvables | 0 | 0 |
| Invariants disparus | | « 24 heures » (une mention de moins, voir plus haut) |

Les tirets du titre et de la ligne de tome sont la forme de tous les chapitres (« # Chapitre N — Titre »,
« *Tome N — Nom* ») que lit l'assembleur : pas touchés. Redites : deux nouvelles, voulues par la règle 6 (le même mot
pour la même chose) : « radio à piles ou à manivelle » (Matériel et étape 17) et « le sac des vêtements du dehors »
(étapes 10 et 21) ; une ancienne disparue (« sortir peu de temps à la », étape 25 et section 7, comptée deux fois
avant). Les onze autres sont celles que le rédacteur a jugées (deux gestes différents, ou un renvoi).

## Les phrases changées, avant et après

63 phrases ou bouts de phrase changés dans le chapitre, 9 dans le logigramme.

### Sections 1 à 3

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Section 1 | « entrer sous terre ou dans le béton avant que les retombées tombent » | « entrer sous terre ou dans un bâtiment de béton avant que les retombées arrivent » | Règle 0 : le mot de tous les jours avec son article ; « retombées tombent » |
| 2 | Section 2 | « Il manque … le compteur ou l'eau fermée » | « … le compteur ou la réserve d'eau » | Règle 0 (« l'eau fermée » ne se dit pas) ; règle 6 : le mot de l'étape 22 |
| 3 | Matériel, iode | « ils remplissent la thyroïde d'iode ordinaire ; aucun autre iode ne les remplace (étape 12) » | « ils protègent la thyroïde de l'iode radioactif en la remplissant d'iode ordinaire (étape 12) » | Répétition : « aucun autre iode ne le remplace » est dit à l'étape 12 et à la section 7 ; la ligne dit ce que l'objet fait (gabarit) |
| 4 | Matériel, radio | « la seule façon d'apprendre où va le panache et quand l'abri finit (sans radio : section 7) » | « la seule façon d'avoir des nouvelles dans l'abri (étape 17 ; sans radio : section 7) » | Répétition : l'étape 17 dit ce qu'on apprend à la radio |

### Procédure

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 5 | Étape 3 | « une auto ne divise la dose que par moins de 2 » | « une auto divise la dose par moins de 2 » | Règle 0 : « ne… que par moins de » se démêle mal à l'oral |
| 6 | Étape 5 | « Mettre les vêtements dans un sac de plastique fermé, et laisser le sac dehors » | « Mettre les vêtements dans un sac de plastique, fermer le sac et le laisser dehors » | Règle 0 : les gestes dans l'ordre (on ne met rien dans un sac fermé) |
| 7 | Étape 8 | « À la maison, c'est le sous-sol ; au chalet, le caveau (ch. 79). » | « Au chalet, aller au caveau (ch. 79). » | Opposition fabriquée ; le sous-sol vient d'être dit |
| 8 | Étape 9 | « …à moins de 15 minutes**, et partir au plus tard 30 minutes après l'éclair : un sous-sol, ou un gros bâtiment de béton ou de brique. » | « …à moins de 15 minutes** : un sous-sol, ou un gros bâtiment de béton ou de brique. Partir au plus tard 30 minutes après l'éclair. » | Règle 11, ordre naturel : la liste suivait l'heure de départ au lieu de « un meilleur » ; règle 1 |
| 9 | Étape 9 | « rester et empiler la masse (section 7) » | « rester et faire comme à l'étape 8 » | Règle 0 (« la masse ») ; répétition : l'étape 8 dit le geste, renvoi court |
| 10 | Étape 10 | « laver à l'eau et au savon la peau et les cheveux qui étaient découverts » | « savonner et rincer la peau et les cheveux qui étaient découverts » | Règle 11 : le complément ne se glisse pas entre le verbe et l'objet |
| 11 | Étape 10 | « le revitalisant fait coller aux cheveux la poussière qu'on veut rincer » | « le revitalisant fait coller la poussière aux cheveux » | Règle 11, ordre ; le complément qui décore |
| 12 | Étape 10 | « Remettre des vêtements pris dans un tiroir ou une garde-robe fermés. » | « S'habiller avec des vêtements pris dans un tiroir ou une garde-robe fermés. » | Règle 0 : « remettre » fait croire qu'on remet les mêmes |
| 13 | Étape 12 | « La thyroïde ne fait pas la différence entre l'iode ordinaire et l'iode radioactif » | « La thyroïde prend l'iode radioactif aussi bien que l'iode ordinaire » | La chose qui pense ; on dit le fait |
| 14 | Étape 12 | « Il ne protège que la thyroïde, contre l'iode seulement, pendant environ 24 heures : » | « Le comprimé ne protège que la thyroïde, et contre l'iode seulement : » | On nomme la chose (« il » suivait « elle », la thyroïde) ; répétition : les 24 heures sont à l'étape 14, où elles servent à redonner la dose |
| 15 | Étape 12 | « …sont des poisons quand on les avale (on peut boire l'eau qu'ils ont désinfectée : ch. 10, étape 23), et ils ne protègent pas la thyroïde ; étendus sur la peau, ils protègent moins que le comprimé et peuvent faire du mal. » | « …sont des poisons quand on les avale, et ils ne protègent pas la thyroïde. Étendus sur la peau, ils protègent moins que le comprimé et peuvent faire du mal. On peut boire l'eau qu'ils ont désinfectée (ch. 10, étape 23). » | Règle 1 : une phrase, une information ; la parenthèse coupait la phrase en deux |
| 16 | Étape 13 | « Un adolescent de 12 à 18 ans qui a la taille d'un adulte, 70 kg ou plus, prend la dose adulte. » | « Donner la dose adulte à un adolescent de 12 à 18 ans qui a la taille d'un adulte, 70 kg ou plus. » | Règle 11 : la consigne à l'infinitif, pas au présent qui décrit |
| 17 | Étape 13 | « ; un adulte de plus de 40 ans prend sa dose s'il en reste. » | « ; s'il en reste, en donner aux adultes de plus de 40 ans. » | Règle 11, même chose |
| 18 | Étape 16 | « Ce sont surtout des adultes, qui risquent peu le cancer de la thyroïde. » | « Ces personnes sont surtout des adultes, … » | On nomme la chose |
| 19 | Étape 17 | « **Ouvrir la radio qu'on a dans l'abri, à piles ou à manivelle, et la laisser ouverte.** » | « **Ouvrir une radio à piles ou à manivelle dans l'abri, et la laisser ouverte.** » | Règle 11, ordre ; la série ne suppose pas une radio déjà posée dans l'abri |
| 20 | Étape 17 | « C'est par elle qu'arrivent la direction du panache, l'annonce d'un deuxième rejet et la fin de l'abri. » | « On y apprend où va le panache, s'il y a un deuxième rejet et quand l'abri finit. » | Mise en relief « C'est… que » ; des noms à la place des faits |
| 21 | Étape 21 | « mettre le linge dans le sac du dehors » | « … dans le sac des vêtements du dehors » | Règle 6 : le nom de l'étape 10 |
| 22 | Étape 21 | « Ne pas manger ce qui était dehors à découvert. » | *(coupé)* | Conséquence évidente du geste en gras ; dire ce qui marche (le jardin a son étape 27) |
| 23 | Étape 23 | « environ 5 000 cancers de la thyroïde sont venus d'enfants qui avaient bu ce lait » | « … sont apparus chez des enfants qui avaient bu ce lait » | Règle 0 : un cancer ne « vient » pas d'un enfant |
| 24 | Étape 25 | « Les filtres ont pu retenir de la poussière radioactive : les mettre dans un sac fermé et les porter loin du bâtiment. » | « Les vieux filtres ont pu retenir … : les mettre dans un sac, fermer le sac et le porter loin du bâtiment. » | On nomme la chose (vieux ou neufs) ; les gestes dans l'ordre |
| 25 | Étape 25 | « À la maison, l'eau de lavage part à l'égout ; au chalet, la jeter loin du puits et du jardin. » | « Jeter l'eau de lavage à l'égout à la maison, et loin du puits et du jardin au chalet. » | Consigne au présent qui décrit ; opposition en deux temps |
| 26 | Étape 29 | « La bête qui mange du lichen l'hiver vient en tête : le caribou. » | « Le caribou, qui mange du lichen l'hiver, vient en tête. » | La révélation en deux temps |
| 27 | Étape 30 | « ; on ne mange de toute façon jamais le foie ni les reins d'un cervidé, qui accumulent le cadmium (ch. 22). » | « . Même sans retombées, ne jamais manger le foie ni les reins d'un cervidé : ils accumulent le cadmium (ch. 22). » | Le mot vide « de toute façon » dit en clair ; la consigne à l'infinitif. Le rappel du tableau de `CLAUDE.md` reste entier |
| 28 | Étape 33 | « : une maison chauffée tient cette plage, un chalet laissé froid l'hiver ne la tient pas. » | « : dans une maison chauffée, pas dans un chalet laissé froid l'hiver. » | Opposition fabriquée ; « tenir une plage » est un mot de rapport |
| 29 | Étape 34 | « un mur de bois rond arrête peu : prévoir de quoi empiler la masse (section 7) » | « un mur de bois rond arrête peu le rayonnement : prévoir ce qu'on empilera autour de la pièce (section 7) » | Règle 0 : arrête quoi ; « la masse » |
| 30 | Étape 35 | « **Écrire sur la porte de la pièce d'abri la fréquence AM…, le tableau… et la recette… .** » | « **Écrire la fréquence AM…, le tableau… et la recette… sur la porte de la pièce d'abri.** » | Règle 11 : le complément de lieu après l'objet |

### Sections 5 et 6

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 31 | Points de contrôle, minutes 0 à 10 | « Une personne abritée ailleurs y reste » | « Une personne abritée ailleurs doit y rester » | Règle 11 : une consigne se dit comme une consigne |
| 32 | Points de contrôle, minute 30 | « Rester et empiler la masse (section 7) » | « Rester et empiler autour de soi ce qui est lourd (section 7) » | Règle 0 ; les mots de l'étape 8 et du logigramme |
| 33 | Signes d'échec, poussière dans l'abri | « Refaire le déshabillage à l'entrée. » | « Les gens qui arrivent du dehors doivent enlever leurs vêtements du dessus à l'entrée (étape 20). » | Règle 0 : un nom à la place du geste, et on ne sait pas qui le fait |
| 34 | Signes d'échec, nausées | « Rester à l'abri, faire boire et se reposer. » | « Rester à l'abri, faire boire la personne et la faire reposer. » | Règle 0 : on sait qui fait quoi |

### Section 7

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 35 | Titre | « Sans sous-sol ni caveau : empiler la masse » | « Sans sous-sol ni caveau : empiler ce qui est lourd » | Règle 0 ; le renvoi de l'étape 8 (« Sans sous-sol ni caveau ») tombe toujours juste |
| 36 | Sous-titre | « *Le refuge dans le refuge.* » | « *Le refuge sous la table ou contre le mur.* » | Un titre nomme une chose, pas une formule (cadre, « La phrase ») |
| 37 | Poste d'auto | « La radio de l'auto est un récepteur AM complet » | « Le poste de l'auto est un récepteur AM complet » | Règle 6 : « le poste » partout dans la sous-section |
| 38 | Poste d'auto | « Une batterie pleine la fait marcher longtemps » | « Une batterie pleine fait marcher le poste longtemps » | On nomme la chose (« la » renvoyait loin) |
| 39 | Poste à galène | « Un récepteur AM à détection ne consomme rien : il tire sa puissance de l'onde. » | « Le poste à galène ne prend aucune pile : il marche avec l'énergie de l'onde radio. » | Mot de métier sans besoin (« à détection ») |
| 40 | Poste à galène | « du fil de cuivre isolé fin » | « du fil de cuivre fin et isolé » | Règle 0 : l'ordre des adjectifs |
| 41 | Poste à galène | « Promener la pointe jusqu'à ce que la station sorte. » | « Promener la pointe sur la lame jusqu'à ce qu'on entende la station. » | Règle 0 : ce qu'on entend, où on promène |
| 42 | Sans radio | « On restreint sans doute trop longtemps » | « On limite sans doute les sorties et la nourriture trop longtemps » | Règle 0 : restreindre quoi (les deux gestes de la phrase d'avant) |
| 43 | Électroscope, air sec | « L'humidité fait fuir la charge, et l'appareil montre alors du danger là où il n'y en a pas. » | « L'humidité fait fuir la charge : les feuilles se referment comme sous un fort rayonnement, et on croit à un danger qui n'existe pas. » | La formule en « là où » ; on dit ce qu'on voit |
| 44 | Électroscope, lire | « La table qui convertit les millimètres et les minutes en débit de dose ne vaut que pour l'appareil documenté, construit à ses dimensions exactes. » | « On ne peut pas convertir ces lectures en débit de dose : les tables qui le font ne valent que pour l'appareil qu'elles décrivent, construit à ses dimensions exactes. » | Règle 0 : quelle table, quel « appareil documenté » (le KFM n'est plus décrit) ; le fait d'abord |
| 45 | Électroscope, ce qu'on perd | « tout ce qui est faible. Un électroscope maison ne voit que les débits élevés. » | « un électroscope maison ne voit que les débits élevés. » | Redite d'une phrase à l'autre |
| 46 | Sans ruban | « et poser des bandes de papier journal à cheval sur le joint » | « et s'en servir pour coller des bandes de papier journal à cheval sur le joint » | Règle 0 : le lien entre la colle et les bandes |
| 47 | Sans ruban | « elle se décolle à l'eau chaude » | « on l'enlève à l'eau chaude » | Pronominal pour un geste |
| 48 | Sans ruban, ce qu'on perd | « de l'humidité dans une pièce fermée, et de la condensation sur les murs froids » | « l'air sec. Les couvertures mouillées mettent de l'humidité dans la pièce fermée, et l'eau condense sur les murs froids. » | Règle 0 : on ne « perd » pas de l'humidité ; on perd l'air sec |
| 49 | Titre | « Sans eau chaude ni savon » | « Sans eau courante ni savon » | Règle 6 : le mot de l'étape 10 ; le paragraphe traite de l'eau qui manque, pas de l'eau chaude |
| 50 | Sans eau courante | « dos au vent : brosser et frotter la poussière en enlève une partie » | « dos au vent, pour enlever une partie de la poussière » | Redite (« brosser » deux fois) ; le but dit en clair |
| 51 | Sans eau courante (point 1 de la commande) | « Faire fondre de la neige sur le poêle pour se rincer, et jeter l'eau de lavage loin du puits, du jardin et de la porte, pas dans le banc de neige qu'on fera fondre le lendemain. » | « Pour se rincer, faire fondre sur le poêle de la neige tombée après le passage des retombées et ramassée sur une surface qui n'en a pas reçu, comme une bâche étendue après le passage ; sinon, prendre l'eau de la réserve. Jeter l'eau de lavage loin du puits, du jardin et de la porte. » | Alignée sur E7 (`suivi/04-technique.md`) ; détail plus bas |
| 52 | Titre | « Sans eau fermée : décanter et filtrer à la terre » | « Sans réserve d'eau : décanter et filtrer à la terre » | Règle 0 et règle 6, comme au no 2 (« Sans réserve, décanter… », étape 22) |
| 53 | Sans réserve d'eau | « ou ce qui reste d'eau fermée » | « ou ce qui reste de la réserve d'eau » | Même chose |
| 54 | Décanter | « Remplir une chaudière aux trois quarts. » | « Remplir une chaudière d'eau aux trois quarts. » | Règle 0 : de quoi |
| 55 | Trouver l'argile | « Chercher sur une berge de rivière, dans une coupe de chemin ou au fond d'un fossé la couche grise et collante sous la terre noire de surface (repères 7 et 8). » | « Chercher la couche grise et collante sous la terre noire de surface, sur une berge de rivière, dans une coupe de chemin ou au fond d'un fossé (repères 7 et 8). » | Règle 11 : l'objet avant le lieu |
| 56 | Sans sel | « l'eau claire fait le même travail que la saumure : 2 jours dans l'eau enlèvent autant de césium que 2 jours dans la saumure (étape 31). Changer l'eau à chaque trempage. » | « 2 jours dans l'eau claire enlèvent autant de césium que 2 jours dans la saumure (étape 31). » | Redite : le même fait dit deux fois ; changer le bain est à l'étape 31 |
| 57 | Sans aucune viande | « Ne jamais aller jusqu'au lichen, aux champignons ni aux abats. » | « Ne jamais manger de lichen, de champignons ni d'abats. » | Règle 0 : le verbe qui dit le geste |
| 58 | Entrée en chicane | « Tailler le costume de sortie dans un sac à ordures. Porter des lunettes de ski (repère 9) et le poncho à capuchon fendu dans le sac (repère 10), … » | « Pour le costume de sortie, porter des lunettes de ski (repère 9) et un poncho à capuchon taillé dans un sac à ordures (repère 10), … » | Redite (le sac deux fois) ; les lunettes et les bottes ne se taillent pas dans un sac. Ordre des repères gardé |
| 59 | Entrée en chicane, ce qu'on perd | « Il empêche seulement de rentrer la poussière dans la maison. » | *(coupé)* | Redite de « le costume arrête la poussière et rien d'autre », deux phrases plus haut |
| 60 | Ce qui ne se remplace pas | « **Les comprimés d'iode** : les autres iodes ne protègent pas la thyroïde, et plusieurs empoisonnent (étape 12). » | « **Les comprimés d'iode** (étape 12). » | Répétition : le fait est à l'étape 12 et en tête de « Sans comprimés d'iode » ; ici, un renvoi court |
| 61 | Ce qui ne se remplace pas | « **La mesure fine** : un pot de verre à feuilles d'aluminium ne dira jamais si un quartier d'orignal est chargé. » | « **La mesure du césium dans la viande** (section 6). » | Répétition : dit dans « Ce qu'on perd » de l'électroscope et à la section 6 ; « la mesure fine » ne dit pas laquelle |
| 62 | Ce qui ne se remplace pas | « **La réserve fermée constituée avant** » | « **L'eau et la nourriture mises de côté dans des contenants fermés avant l'événement** » | Règle 0 : code à déchiffrer |

### En plus

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 63 | L'estomac du caribou | « mangeaient le contenu de l'estomac du caribou, cru ou bouilli, souvent mêlé au sang de la bête : surtout du lichen à demi digéré. » | « mangeaient le contenu de l'estomac du caribou, surtout du lichen à demi digéré, cru ou bouilli, souvent mêlé au sang de la bête. » | Règle 11 : « surtout du lichen » se rattachait au sang. Mêmes mots, même compte |

Les trois autres notes, la note de bas de page, les tableaux des étapes 13 et les sous-sections qui ne figurent pas
ici ont été lues phrase par phrase et gardées telles quelles.

### Le logigramme

`images/logigrammes/04-retombees.json` ; rendus refaits : `04-retombees.svg`, `.pdf`, `.png` et `04-retombees-livre.svg`
(`--sans-entete --svg`). Contrôle : 0 erreur, 0 avis (avant : 0 et 0). Regardé à l'image : aucune boîte ne grandit
au point de toucher une flèche ; les colonnes et les liens ne bougent pas. Le `_note` du JSON dit l'édition.

| # | Nœud | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| L1 | entrer | « : sous-sol, béton, brique. » | « : un sous-sol, ou un bâtiment de béton ou de brique. » | Étiquette en raccourci (noms sans articles) |
| L2 | absent | « Un enfant à l'école doit y rester : l'école de béton le protège mieux que la maison. » | « Un enfant à l'école doit y rester : il y est mieux protégé qu'à la maison. » | « l'école de béton » supposait une école de béton ; la raison est à l'étape 6. Un premier essai plus long (« une école de béton ou de brique… ») faisait quatre lignes et donnait l'avis « pointe à l'étroit » |
| L3 | changer | « **Y aller**, et partir au plus tard 30 min après l'éclair. » | « **Y aller**, en partant au plus tard 30 min après l'éclair. » | Règle 0 : « y aller, et partir » se lisait comme deux départs |
| L4 | lien ou → changer | « Un abri plus solide à 15 min » | « Un abri plus solide à moins de 15 min » | Le mot de l'étape 9 (« à moins de 15 minutes ») |
| L5 | ki | « On a des comprimés d'iode (KI) ? » | « On a des comprimés d'iode ? » | « KI » n'est employé nulle part dans le chapitre |
| L6 | pas-iode | « pendant 6 à 8 semaines, pas de lait frais, pas d'eau de surface ni de neige fondue, et pas de légumes-feuilles du jardin » | « pendant 6 à 8 semaines, ne pas boire de lait frais, d'eau de surface ni de neige fondue, et ne pas manger les légumes-feuilles du jardin » | Règle 0 : le verbe qui dit le geste |
| L7 | h24, précision | « Avec un électroscope, la baisse se voit dessus » | « Un électroscope montre aussi la baisse » | Pronominal ; « dessus » |
| L8 | sortir | « **Remplacer les filtres de la fournaise** et les sortir dans un sac fermé. » | « **Remplacer les filtres de la fournaise** et sortir les vieux filtres dans un sac fermé. » | On nomme la chose (« les » pouvait être les neufs) |
| L9 | fin-chalet | « le gibier, le poisson et le jardin » | « le gibier, le poisson et les légumes » | On trie ce qu'on mange, pas le jardin. « les légumes du jardin » faisait déborder la boîte du bloc du livre (avis du contrôle) |

Pas touché : le nœud « co » (étape 18, décision de JP).

### La phrase de la neige (point 1 de la commande)

- **La source** (`sources/04-verification-technique-2026-10-18.md`, section 5, ORNL, chap. 8, p. 72, et chap. 2) :
  « Water obtained by melting snow that has fallen through air containing fallout particles, or from snow lying on the
  ground onto which fallout has fallen. Avoid using such water for drinking or cooking, if possible. » ; « Water from
  many sources, such as deep wells and covered reservoirs, tanks, and containers, would not be contaminated. »
- **Ce que la phrase dit maintenant** : la neige tombée après le passage, ramassée sur une surface qui n'a pas reçu
  les retombées ; sinon, l'eau de la réserve. C'est la neige qui n'entre dans aucun des deux cas que la source dit
  d'éviter (tombée dans l'air chargé, ou posée sur un sol qui a reçu la poussière), et l'eau des contenants fermés,
  que la source dit propre. La phrase n'ajoute aucun chiffre.
- **Ce que la source ne dit pas, et que JP peut trancher** :
  1. La source donne la neige à éviter ; elle ne dit pas en toutes lettres que l'autre neige est propre. La phrase
     se lit par le contraire des deux cas de l'ORNL.
  2. La source parle de boire et de cuisiner, pas de se rincer. L'ancien texte rinçait avec n'importe quelle neige ;
     la phrase applique au rinçage la règle de l'eau à boire, ce qui est plus prudent, pas moins.
  3. « Comme une bâche étendue après le passage » est un exemple de surface propre, pas un fait de la source. Il
     suppose une sortie courte après les 24 heures d'abri (étape 25) ; pendant l'abri, il reste l'eau de la réserve.
     Si JP ne veut pas d'exemple, la phrase s'arrête à « ramassée sur une surface qui n'en a pas reçu ».
- **Coupé dans la même phrase** : « pas dans le banc de neige qu'on fera fondre le lendemain ». Depuis E7, la neige
  du sol et du banc ne se fait plus fondre ; la mise en garde ne sert plus.

### Ailleurs

- `plan/dangers-inventaire.md`, section 3, ch. 04 : « `botulisme` n'est posé nulle part » devient « `botulisme` est
  posé à l'étape 31, sur la puce du poisson (bain tenu sous 3 °C, avec de la glace ou de la neige) », avec le renvoi
  à `suivi/04-technique.md`, P15. Le tableau de la section 1 inscrivait déjà le ch. 4 dans la colonne de `botulisme`.
- Ancres de `design/epreuves-livre/placements-tome-1.json` : aucune n'a changé (le logigramme sur « **Compteur Geiger
  ou dosimètre à affichage** », 04-01a, 04-01b, 04-40, 04-41, 04-42, la photo du lichen) ; controle.py : 0 ancre
  introuvable.
- Les anciens titres (« Sans eau fermée », « Sans eau chaude ni savon », « le refuge dans le refuge ») ne restent que
  dans des commentaires de tête de `images/planches-src/04-40.js` et `04-42.js`, dans des fiches anciennes et dans
  `sources/` : aucun renvoi d'un chapitre, d'une page de danger ni de l'index ne les cite.

## Signalé, sans rien changer

1. **Étape 18 et P7** : rester dedans ou sortir devant le CO (P8), et l'avertisseur qui ne lit pas bien sous 4,4 °C au
   caveau (P7) restent à JP ; le Matériel (« le seul moyen de savoir »), les Points de contrôle (« avant chaque
   sommeil ») et le nœud « co » attendent la même décision.
2. **Étape 32** : « Le trempage et la cuisson à l'eau enlèvent du césium, pas les parasites ni les bactéries » se lit
   comme si cuire à l'eau ne tuait pas la trichine, alors que la phrase suivante dit que la chaleur à cœur la tue. Au
   rédacteur : « Le trempage enlève du césium, pas les parasites ni les bactéries ; cuire à l'eau ne les tue que si le
   cœur monte à 74 °C » dirait la même chose sans contradiction apparente. Pas changé : c'est un fait.
3. **Étape 29, l'orignal** : la phrase donne ce qu'il mange (ramilles, feuilles, plantes aquatiques) sans dire sa place
   dans le tri. On devine le deuxième groupe (« les bêtes qui mangent des champignons et des plantes »), mais l'y
   ranger pourrait faire croire qu'il mange des champignons, ce que la refonte a retiré faute de source. Au rédacteur.
4. **Étape 11** : « On compte les 24 heures d'abri à partir de l'éclair. » Après une alerte de centrale, sans éclair,
   le texte ne dit pas d'où on compte (de l'alerte, ou de l'arrivée du panache). Au rédacteur, avec sa source.
5. **Étape 23** : « environ 5 000 cancers » ; la source (CCSN) dit « probablement attribuables » (déjà noté par le
   vérificateur, tableau du confirmé, ligne 32). Le texte l'affirme.
6. **Électroscope** : « Jamais de sel ni de chlorure de calcium » donne l'interdit sans le mécanisme (skill, règle 9).
   La raison est à prendre dans l'ORNL (annexe C) par le rédacteur, ou la phrase reste telle quelle.
7. **Pompe à volets** : « Le doubler : un cadre trop léger ne revient pas assez loin tout seul. » « Doubler le cadre »
   ne dit pas comment (deux épaisseurs de lattes ? deux cadres collés ?). À préciser sur l'annexe B de l'ORNL, avec la
   planche 04-01b à refaire.
8. **Les sacs de terre** : « Remplir aux deux tiers de terre ou de sable (repère 9) des taies d'oreiller… (repère 10) »
   met l'objet après le complément (règle 11). Le remettre dans l'ordre fait passer le repère 10 avant le 9 : à
   corriger avec la planche 04-01a (échanger les repères 9 et 10), pas dans le texte seul.
9. **L'ancre de la planche 04-41** commence par « Sans appareil, on ne sait pas… » ; le reste de la sous-section dit
   « compteur » (règle 6). Pas changé : l'ancre vit dans `placements-tome-1.json`, hors de mes fichiers.
10. **Étape 26** : le geste en gras nomme « la première neige », mais l'étape n'en dit rien de plus (la source P1 parle
    de la pluie ; l'ORNL, p. 72, de la neige tombée dans l'air chargé, pour l'eau à boire). La phrase se comprend ;
    à compléter par le rédacteur s'il a la source.
11. **Section 6, gibier, et électroscope** : le laboratoire est dit deux fois (diagnostic de la section 6, et « Ce
    qu'on perd » de l'électroscope). Gardé : la section 6 dit quoi faire devant une viande, l'électroscope dit ce que
    l'appareil maison ne fait pas. « Ce qui ne se remplace pas » y renvoie seulement.
12. **P19 du vérificateur**, toujours ouvert : les antibiotiques gardés pour la période critique (section 6)
    contredisent le ch. 32 ; le renvoi « rétine (ch. 35) » est faible.
13. **Montage** : les tableaux des sections 5 et 6 débordaient de deux rangées au dernier montage d'essai ; les
    cellules changées ici (nos 31 à 34) ne les raccourcissent pas. Au metteur en pages.

## Liste de contrôle du cadre (`.claude/cadre-agents.md`), pour ma partie

Pour tout agent
- [x] `CLAUDE.md` lu au complet.
- [x] Le skill `ecriture` lu au complet, avec ses tableaux ; le cadre lu au complet ; le rôle 5 de `roles.md`.
- [x] `suivi/plan-de-match.md`, PAUSE du 15 octobre, lu jusqu'au point 31 ; ce qui touche le ch. 4 est appliqué (§,
  section 2, note de lieu, « Comment ça marche », pronominal, chose qui pense : déjà faits par la refonte, vérifiés ici).
- [x] Règle 1 : aucun chiffre ajouté ni changé ; la phrase de la neige s'appuie sur la source déjà enregistrée, et ce
  qu'elle ne dit pas est signalé plus haut.
- [ ] « Ne rien commiter » : la commande de l'orchestrateur demande cette fois le commit et le push de mes fichiers
  seulement ; c'est ce qui est fait.

La forme du chapitre
- [x] Sept sections et « En plus », dans l'ordre ; pictogrammes dans leur étape, aucun déplacé.
- [x] Rien sous le titre que `**Les deux**`.
- [x] Section 2 : seulement quand l'utiliser.
- [x] L'année : rien de changé (la neige, l'hiver, le poêle sont marqués là où ils servent).

L'urgence
- [x] Les trois séries orange relues comme une scène : rien ne suppose une préparation (no 19 : la radio n'est plus
  « celle qu'on a dans l'abri ») ; la consigne de sécurité de l'étape 18 reste à JP.
- [x] Pastilles inchangées (30 s, 10 min, 2 h), sourcées par le vérificateur.
- [x] Le logigramme est la version courte et ne redit aucun avertissement ; ses boîtes sont des phrases (L1, L6).
- [x] La page de droite du logigramme : colonnes non touchées (8,9 à 15,5 po, couloir à 8,7 po).
- [x] Notes « En plus » : quatre, une étape chacune, aucune planche ; une seule retouchée (ordre), compte inchangé.

La phrase
- [x] Règle 0 : chaque phrase lue à voix haute ; 63 changées dans le chapitre, 9 dans le logigramme.
- [x] Pas de loi en formule ni de « d'où » ; la formule en « là où » de l'électroscope est redite en mécanisme (no 43).
- [x] Pas de maxime, de chute, d'opposition fabriquée (nos 7, 25, 28), de révélation en deux temps (no 26).
- [x] La chose qui pense : « la thyroïde ne fait pas la différence » (no 13).
- [x] Pronominal de consigne : « elle se décolle » (no 47), « se voit dessus » (L7) ; les autres « se » sont des
  choses qui le font toutes seules.
- [x] Consigne au présent et « ceux qui » : nos 16, 17, 25, 31 ; aucun « ceux qui ».
- [x] Le possessif ou le pronom qui oblige à chercher : nos 14, 18, 24, 38, L8.
- [x] Mots de métier : « récepteur AM à détection » (no 39) ; « plage » (no 28) ; « l'eau fermée » (nos 2, 52, 53).
- [x] Aucun tiret dans le texte (les deux du titre et de la ligne de tome sont la forme commune) ; aucun « § ».
- [x] Titres de sous-sections : « Le refuge dans le refuge » devient un nom de chose (no 36).
- [x] Tournures des pages des dangers (« X ne fait pas Y : il fait Z », « la couleur dit ») : aucune trouvée.

La procédure
- [x] Sous-étapes et repères : ordre des repères gardé partout (no 58) ; l'exception est signalée (point 8).
- [x] « Autre façon » marquée : inchangé.
- [x] L'urgence ne s'appuie pas sur une préparation : vérifié (no 19 ; la bâche du no 51 est hors des 24 heures).

La répétition
- [x] Inventaire des faits relu : redites coupées ou changées en renvoi (nos 3, 4, 9, 14, 45, 50, 56, 59, 60, 61) ;
  les rappels de sécurité restent dans leur étape, à côté de leur pictogramme.

Les planches dans le texte
- [x] Appels inchangés (04-01a, 04-01b, 04-40, 04-41, 04-42), un par phrase ; ancres intactes.

Avant de rendre
- [x] `controle.py` avant et après (tableau plus haut) : 0 tiret dans le texte, 0 « § », 0 mot banni ; mots vides,
  redites et l'âge jugés un par un.

Les planches, le montage
- [ ] Rôle des planches, du metteur en pages et de l'orchestrateur. Rien dessiné ni monté ici.
- [x] Aucun vérificateur sécurité lancé ni consulté.
