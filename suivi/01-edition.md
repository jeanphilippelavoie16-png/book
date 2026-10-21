# Édition : Chapitre 1, Les quatre horloges

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/01-les-quatre-horloges.md` au gabarit final, après les corrections du rédacteur qui
  suivent la vérification technique (`suivi/01-redaction.md`, « Corrections après la vérification technique, 19 octobre
  2026 »), du titre à la dernière note « En plus ». Texte d'avant l'édition : commit `de8aac6`.
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31), `suivi/01-redaction.md` (refonte et
  corrections du 19 octobre), `plan/glossaire.md` (chaudière contre seau), `plan/dangers-inventaire.md` (section 1, ids).
- **Aucune source nouvelle cherchée, aucun chiffre ni aucun fait changé.** Ce qui touche un fait est signalé plus bas.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé.
- **Ancres :** le chapitre n'a pas de planche posée ni de logigramme. La note de `placements-tome-1.json` (01-01, « après
  1. **Écrire l'heure sur la porte du congélateur.** ») tient : l'étape 1 garde son numéro et son début. Aucune étape
  renumérotée (1 à 29). Trois intertitres en gras de la section 7 renommés (nos 27, 31, 36) et le titre d'une note
  « En plus » (no 37) : aucun autre fichier ne les cite (`grep` sur `chapitres/`, `images/logigrammes/`, `dangers/`,
  `plan/`, `design/epreuves-livre/`, `livre/index/`).
- **Largeur des lignes :** les paragraphes que les corrections avaient allongés sont remis à la largeur du fichier
  (environ 108 signes), sans changer un mot (vérifié mot pour mot par le script). Les lignes du Matériel restent d'une
  ligne par item.

## controle.py, avant et après

| | Avant (`de8aac6`) | Après |
| --- | --- | --- |
| Mots | 5 514 | 5 631 |
| Tirets | 2 (titre et ligne de tome, forme lue par l'assembleur) | 2 (les mêmes) |
| « § », mots bannis, vocabulaire d'IA, tournures, maximes, mises en relief | 0 | 0 |
| Mots vides à juger | 33 | 34 (« tout le reste », « tout le monde » des Signes d'échec : ils portent le sens) |
| Redites | 0 | 0 |
| Ancres introuvables | 0 | 0 |
| Invariants disparus | | rien |

## Les phrases changées, avant et après

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Section 1 | « Trier une urgence par les quatre comptes à rebours qui partent ensemble (…) et agir dans l'ordre des échéances » | « Classer ce qu'il y a à faire selon quatre horloges qui partent en même temps (…), et commencer par celle qui finit le plus tôt » | Règle 0 ; un seul mot par chose (« horloge » dans tout le chapitre) |
| 2 | Section 2 | « Le courant tombe » | « Le courant manque » | Le mot des intertitres orange |
| 3 | Section 2 | « Le congélateur a coulé pendant une absence » | « Le congélateur a dégelé pendant qu'on était parti » | Règle 0 |
| 4 | Section 2, étapes 17 à 19, intertitre, Points de contrôle, Signes d'échec | « l'eau du réseau » (8 fois), « un bris du réseau », « Le réseau a un problème » | « l'eau de l'aqueduc », « un bris de l'aqueduc », « L'aqueduc a un problème » | Un seul mot par chose : « réseau » nommait aussi la ligne électrique (étape 10) ; « aqueduc » est le mot de l'étape 4 |
| 5 | Matériel, thermomètre médical | « pris dans la bouche » | « mis dans la bouche » | Règle 0 |
| 6 | Étape 1 | « Les délais des décisions des deux jours qui suivent partent de cette heure » | « On prend les décisions des deux jours suivants en comptant les heures depuis ce moment » | Règle 0 : un sujet, un verbe qui dit le geste |
| 7 | Étape 2, gras | « préparer l'avertisseur de CO et choisir l'appareil » | « vérifier et placer l'avertisseur de CO, puis choisir l'appareil » | Le verbe qui dit les gestes des puces |
| 8 | Étape 2 | « …respirée pendant des jours : pendant des jours de chauffage improvisé, son silence… » | « …même respirée pendant des jours : quand on chauffe avec un appareil improvisé, son silence… » | « pendant des jours » deux fois de suite |
| 9 | Étape 2 ; Points de contrôle (2 rangées) ; section 7, « L'alerte au CO » | « ne rien brûler dans la maison d'autre que le poêle », « Ne brûler dans la maison que le poêle », « ne brûler que le poêle » | « n'allumer dans la maison que le poêle… », « N'allumer… », « n'allumer que le poêle » | On ne brûle pas un poêle ; le même verbe que la puce suivante (« N'allumer dans la maison et dans le garage… ») |
| 10 | Étape 4 ; section 7, « L'eau quand la pression tombe » | « les seaux », « dans un seau » | « les chaudières », « dans une chaudière » | Glossaire : « chaudière » partout |
| 11 | Étape 6 | « aller voir les voisins : savoir lequel… » | « aller voir les voisins pour savoir lequel… » | Le but dit en clair |
| 12 | Étape 7 | « rouler une couverture au bas des portes » ; « Si un poêle ou un appareil d'appoint brûle dans la pièce » | « boucher le bas des portes avec une couverture roulée » ; « Si on chauffe la pièce avec un poêle ou un appareil d'appoint » | Le geste et son but ; « brûle » se lisait comme un appareil en feu |
| 13 | Étape 9 | « Jamais dans un bâtiment, un garage… » | « Ne jamais la faire tourner dans un bâtiment, un garage… » | Phrase sans verbe. Le rappel de `CLAUDE.md` reste entier |
| 14 | Étape 10 | « coller dessus un ruban écrit au marqueur » ; « relier la maison au réseau et à la génératrice » | « coller dessus un bout de ruban avec un mot au marqueur, pour que personne ne le remonte » ; « relier la maison à la ligne de la rue et à la génératrice » | Code à déchiffrer, but non dit ; le mot de la phrase d'avant |
| 15 | Étape 11 | « vérifier pendant l'arrêt le niveau d'huile » | « et, pendant l'arrêt, vérifier le niveau d'huile » | Règle 11 : rien entre le verbe et l'objet |
| 16 | Étape 12 | « : le bois à portée de la porte, les bonbonnes et les bidons dehors, sous un abri » | « : empiler le bois près de la porte, et ranger les bonbonnes et les bidons dehors, sous un abri » | Noms sans verbe |
| 17 | Étape 13 ; Points de contrôle, rangée de l'écart | « noter l'écart avec l'heure d'avant. En prolongeant cet écart jusqu'au matin, on voit si… ; sinon, regrouper » ; « Le prolonger jusqu'au matin. Si la pièce ne restera pas assez chaude » | « noter l'écart avec le relevé de l'heure d'avant. Multiplier cet écart par le nombre d'heures qui restent jusqu'au matin : on voit si… Si elle doit devenir trop froide, regrouper » ; « Le multiplier par les heures qui restent jusqu'au matin (étape 13). Si la pièce doit devenir trop froide » | Le geste dit en clair ; « si… ne restera pas » ne se dit pas |
| 18 | Étape 14 | « Faire l'inventaire du froid… De mémoire, … Écrire en trois mots, sur le ruban de la porte, ce qui passera en premier au tri » | « Faire l'inventaire du réfrigérateur et du congélateur… Le faire de mémoire, … Écrire sur le ruban de la porte, en trois mots, ce qu'on triera en premier » | « l'inventaire du froid » : étiquette ; règle 11 |
| 19 | Étape 16 | « Sauver une horloge en coûte souvent à une autre » | « Souvent, ce qu'on fait pour une horloge en use une autre » | Formule |
| 20 | Étape 20 | « trier le réfrigérateur au thermomètre, planté au cœur de l'aliment » ; « quand il arrive au bout de son temps (étape 3) » ; « Le thermomètre d'air » | « trier le réfrigérateur en plantant le thermomètre au cœur de chaque aliment » ; « au bout de ses 24 ou 48 heures (étape 3) » ; « Le thermomètre qui mesure l'air » | Participe accroché ; « son temps » oblige à chercher (les chiffres sont ceux de l'étape 3, sans rien de neuf) |
| 21 | Étape 21 | « ce qui a le moins de marge » | « ce qui se gâte le plus vite » | Mot de rapport |
| 22 | Étape 25 | « : dans des bacs fermés, à l'ombre, du côté nord, surélevés » | « : le mettre dans des bacs fermés et surélevés, à l'ombre, du côté nord » | Participes en chaîne |
| 23 | Étape 26 | « Refaire le calcul du combustible pour la semaine » | « Calculer le combustible qu'il faut pour la semaine » | Aucun calcul n'est fait avant |
| 24 | Points de contrôle, eau suspecte | « Ne pas la boire. La douche, les mains, la vaisselle et la lessive n'ont pas besoin d'eau bouillie » | « Ne pas la boire » | Redite de l'étape 17 |
| 25 | Signes d'échec, six rangées | « Ne pas juger le reste à l'œil : tout trier au thermomètre » ; « Faire boire avant d'avoir soif : la soif arrive en retard » ; « Le bois part deux fois plus vite que le calcul » ; « Remplir tout de suite » ; « surveiller la diarrhée et les vomissements » ; « Partir de la dernière heure dont on est sûr, et arrondir du côté le moins favorable » | « Trier tout le reste au thermomètre, sans se fier à l'œil » ; « Faire boire tout le monde sans attendre la soif : elle arrive en retard » ; « On brûle le bois deux fois plus vite que prévu » ; « Remplir les contenants tout de suite (étape 4) » ; « surveiller s'il a de la diarrhée ou des vomissements » ; « Compter les heures à partir du dernier moment où on sait que le courant marchait » | Dire ce qui marche ; qui fait le geste ; chose qui « part » ; quoi remplir ; « arrondir du côté le moins favorable » ne se comprend pas à l'oral |
| 26 | Section 7, premier paragraphe | « On vit dans la pièce de l'étape 7, les lits rapprochés, et on ferme les pièces vides : elles isolent… il reste l'eau des tuyaux et du chauffe-eau (plus bas), et les voisins (ch. 16, ch. 18), qui en manquent en même temps » | « Dans la pièce de l'étape 7, on rapproche les lits ; les pièces vides qu'on a fermées autour l'isolent… il reste l'eau des tuyaux et du chauffe-eau (plus bas). Les voisins (ch. 16, ch. 18) manquent d'eau en même temps » | Redite de l'étape 7 (fermer les pièces) ; « il reste… les voisins, qui en manquent » se contredisait |
| 27 | Section 7, intertitre en gras | « **La pente sans thermomètre.** Remplir le même chaudron… Si le deuxième relevé va nettement plus vite… (une vitre, un joint de porte, un feu qui baisse) » | « **Le refroidissement sans thermomètre.** Remplir un chaudron… Refaire la mesure plus tard avec le même chaudron… Si l'eau devient tiède nettement plus vite… (une fenêtre qui laisse entrer le froid, un joint de porte qui laisse passer l'air, un feu qui baisse) » | « pente » n'est employé nulle part ailleurs dans le chapitre (l'étape 13 dit « l'écart ») ; « le même chaudron » avant la première mesure ; noms sans ce qu'ils font |
| 28 | Section 7, « L'hypothermie sans thermomètre » | « On regarde la personne, dans cet ordre » ; « Ce test est le plus fiable » ; « On ne voit pas les 35 °C » | « Les signes arrivent dans cet ordre » ; « Ce test des gestes fins est le plus fiable » ; « On ne peut pas voir le moment où elle passe sous 35 °C » | On nomme la chose ; « voir les 35 °C » ne se dit pas |
| 29 | Section 7, « Le 74 °C sans sonde » | « Le test de la lame aide sans prouver » ; « cuite dehors et crue dedans » | « Le test de la lame donne une indication » ; « cuite en surface et crue au centre » | Formule (la phrase suivante dit la limite) ; les mots du chapitre (« au centre ») |
| 30 | Section 7, « Remplir le congélateur arrêté » | « L'air d'un vide sort à chaque ouverture ; un bloc de glace garde son froid » ; « le compresseur repart étouffé et chauffe » | « À chaque ouverture, l'air froid des vides s'échappe, alors qu'un bloc de glace garde son froid » ; « repart sans pouvoir évacuer sa chaleur, et il surchauffe » | Règle 0 ; « étouffé » est une image |
| 31 | Section 7, intertitre en gras | « **La neige isole.** Une viande qu'on enterre encore molle… on l'expose : des bacs ouverts au nord, les morceaux séparés… une bordée efface un banc de neige et ce qu'il contient » | « **Faire geler la viande dehors.** La neige isole : une viande encore molle qu'on enterre… on la laisse à l'air, dans des bacs ouverts du côté nord, les morceaux séparés les uns des autres… après une bordée, on ne retrouve plus le banc de neige ni ce qu'il contient » | Titre en maxime ; noms sans verbe ; image (« efface ») |
| 32 | Section 7, « Rentrer la batterie » | « Sortie de l'auto et rentrée dans la maison, la batterie fait marcher… » | « On sort la batterie de l'auto et on la rentre dans la maison : elle fait marcher… » | Participes en chaîne |
| 33 | Section 7, `{!generatrice}` | « Réchauffer les enfants dans l'auto, moteur en marche, stationnée dehors, jamais… » ; « Chaque heure au ralenti dépense l'essence qui servira à partir » | « Réchauffer les enfants dans l'auto, moteur en marche, seulement si elle est stationnée dehors, jamais… » ; « Chaque heure de moteur au ralenti use de l'essence qui servira au départ » | Participes ; « qui servira à partir » se lit mal |
| 34 | Section 7, « L'eau quand la pression tombe » | « son robinet de vidange » | « le robinet de vidange du chauffe-eau » | Le possessif qui oblige à chercher |
| 35 | Section 7, Ce qu'on perd, 74 °C | « Le bain qui bout règle le cas des morceaux, pas celui des grosses pièces rôties… : là, on juge » | « L'eau bouillante règle le cas des morceaux. Pour les grosses pièces rôties…, on juge » | Opposition ; un seul mot (« eau bouillante ») |
| 36 | Section 7, Ce qu'on perd | « **Le rendement du congélateur.** Le froid naturel suit la météo et ne garde pas les -18 °C » | « **Le froid constant du congélateur.** Le froid du dehors varie avec la météo et ne tient pas à −18 °C » | Ce qu'on perd, nommé ; le mot du chapitre (« le froid du dehors ») |
| 37 | En plus, titre | « La maison refroidit vite, puis lentement » | « Le refroidissement d'une maison sans chauffage » | Titre en phrase |
| 38 | Points de contrôle, section 7, En plus | « -18 °C », « -8 °C », « -30 °C », « -12 °C » (trait d'union) | « −18 °C », « −8 °C », « −30 °C », « −12 °C » | Le signe moins des autres chapitres du tome 1 |

Tout le reste a été lu phrase par phrase et gardé : la série orange, les tableaux des étapes 16, les Points de
contrôle et les Signes d'échec non cités, les notes « En plus » (sauf le titre du no 37).

## Faits signalés (non touchés)

1. **Deux règles pour le même tri.** Étape 20 : « Jeter un aliment périssable qui a dépassé 4 °C. » Le ch. 2, étape 29,
   dit : « Jeter ce qui a passé plus de 2 heures au-dessus de 4 °C. » Une des deux est à aligner sur la source.
2. **Les quatre horloges ne sont pas les mêmes dans les deux chapitres.** Ici : le corps, l'eau, le stock périssable,
   les calories et le combustible (étape 16). Le ch. 2, étape 26, écrit « la chaleur, l'eau, la nourriture et le lien
   (ch. 1) ». Le lecteur qui suit le renvoi ne retrouve pas ses quatre mots.
3. **L'appareil d'appoint dans la pièce.** Étape 7 : « Si on chauffe la pièce avec un poêle ou un appareil d'appoint, la
   garder aérée. » Le ch. 2, étape 10 : « Ne rentrer aucun appareil qui brûle un carburant : chaufferette d'appoint… ».
   Les deux chapitres ne disent pas la même chose d'une chaufferette d'appoint faite pour l'intérieur.
4. **Étape 10, le ruban sur le disjoncteur** : « pour que personne ne le remonte » dit le but, qui était sous-entendu ;
   aucun fait nouveau, mais c'est une phrase de plus à voir.

## Liste de contrôle (cadre des agents, partie « Le texte »)

- [x] Sept sections, plus « En plus » ; pas de « Comment ça marche », pas de section Danger ; renvois « section N » justes.
- [x] Sous le titre, la ligne de lieu seule (`**Maison**`).
- [x] Section 2 : seulement quand l'utiliser (liste inchangée sauf les mots, nos 2 à 4).
- [x] L'année et la nuit : « L'hiver » et « La nuit » marqués (non touchés).
- [x] Série orange : déclencheurs et pastilles (15 min, 6 h) non touchés ; l'ordre réel tenu (le message d'abord).
- [x] Pas de logigramme dans ce chapitre (choix du rédacteur, `suivi/01-redaction.md`).
- [x] Encadrés « En plus » : quatre notes, sans planche ; le texte non touché, un titre changé (no 37).
- [x] Règle 0 : chaque phrase lue à voix haute ; 38 corrections, une soixantaine de phrases.
- [x] Pas de loi en formule, de « d'où », de « X passe là où Y » ; maximes et chutes reprises (nos 19, 29, 31).
- [x] Pas de chose qui pense ou qui parle.
- [x] Consigne jamais au pronominal ; les « se » qui restent sont des choses qui le font seules (« se gâte », « se voit »).
- [x] Pas de « ceux qui » ; ordre naturel (nos 15, 18).
- [x] On nomme la chose (nos 20, 28, 34).
- [x] Mots de tous les jours ; un seul mot par chose (nos 1, 4, 10, 27, 35).
- [x] Aucun tiret dans le texte ni dans les titres (les deux du titre et de la ligne de tome sont la forme de l'assembleur).
- [x] Titres de sous-sections en noms de choses ou de gestes (nos 31, 37).
- [x] Répétition : redites retirées (nos 8, 24, 26) ; rappels de sécurité à leur étape et à leur pictogramme seulement.
- [x] Planches : aucune posée dans ce chapitre ; la note 01-01 de `placements-tome-1.json` tient.
- [x] `controle.py` : 0 tiret dans le texte, 0 « § », 0 mot banni ; avis jugés un par un ; invariants : rien n'a disparu.
- [x] Aucun chiffre nouveau, aucune source cherchée ; rien commité.
