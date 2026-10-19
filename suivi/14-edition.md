# Édition : Chapitre 14, Communiquer et savoir

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/14-communiquer-et-savoir.md` au gabarit final, après la refonte du 19 octobre et les deux
  passes de corrections qui ont suivi la vérification technique (`suivi/14-redaction.md`). Copie du texte d'avant
  l'édition : `scratchpad/edition-11-13-14-avant/14-communiquer-et-savoir.md`. Tout le chapitre relu, phrase par phrase,
  à voix haute, du titre à la dernière note « En plus ».
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31),
  `suivi/14-redaction.md`, le logigramme `images/logigrammes/14-communiquer.json`, le ch. 11, étape 16 (le message
  texte, sa source ISDE).
- **Aucune source nouvelle cherchée, aucun chiffre ni aucun fait changé** (JP, 19 octobre 2026). Ce qui touche un fait
  est signalé plus bas.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé. Quatre coupures de ligne au milieu d'une
  phrase (un mot seul sur sa ligne : « le », « la », « la », « le ») refermées ; le rendu ne change pas.
- **Ancres :** aucune touchée. Le logigramme « **Radio VHF maritime portative, sur le fleuve** » (dernier item du
  Matériel) et 14-01 « Le poste à galène n'a besoin d'aucune pile » sont intacts, chacun une seule fois. `controle.py`
  signale encore l'ancienne ancre de 14-01 dans `placements-tome-1.json` (« Côté terre, la règle qui surprend ») : la
  fusion des ancres du rédacteur la règle. La planche est appelée. Aucune étape renumérotée (1 à 30), aucun intertitre
  renommé.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 7 019 | 7 024 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes, forme commune) |
| « § », mots bannis, vocabulaire d'IA, maximes, pronominal, tournures | 0 | 0 |
| Mises en relief à juger | 2 (étape 5, « Si la vie n'est pas en jeu mais que… » : vraie opposition avec l'étape 2) | 2 (la même) |
| Mots vides à juger | 43 | 44 (les deux « exactement » portent le sens : « où exactement », « exactement dans sa forme ») |
| Redites à juger | 3 | 6 : « lancer l'appel de détresse (étape 2) » aux étapes 1 et 8 (un renvoi ; l'ancienne forme était trop courte pour être comptée) ; « quoi faire quand un message manque » aux étapes 5 et 18 et dans « Ce qui ne se remplace pas » (le même mot pour la même chose) ; les trois d'avant (« la fiche de sortie (étape 29) », renvois ; « du caoutchouc, de l'huile ou du plastique », étape 4 orange et section 7, « La fumée », qui donne le choix de la couleur) |
| Invariants disparus | | Un renvoi « ch. 86 » : section 7, poste d'auto, « vide la batterie de communication (ch. 86) » devient « vide la batterie réservée à la radio (étape 20) ». « Batterie de communication » n'est défini nulle part dans le livre (`grep`) ; l'étape 20 met cette batterie en place et renvoie elle-même au ch. 86 |

## Les phrases changées

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Matériel, radio | « ; le soir, la bande AM porte loin » | sorti | Redit à l'étape 15 et à la section 6 |
| 2 | Étapes 1, 2 et 8 | « se réveille mal » ; « déclencher la détresse » (trois fois) ; « Les soins en attendant : ch. 26 ; quand partir vers l'hôpital : ch. 35. » | « est difficile à réveiller » ; « lancer l'appel de détresse » ; « Pour les soins en attendant les secours : ch. 26 ; pour décider quand partir vers l'hôpital : ch. 35. » | Signe qu'on ne sait pas lire ; raccourci ; étiquettes |
| 3 | Étape 2 | « … ni l'heure du prochain message : attendre ne fait que retarder les secours. » | « … ni l'heure du prochain message. » | Conséquence évidente |
| 4 | Étape 3, étape 7, section 6 | « près de la machine » ; « reste en file », « mis en file » | « près de la machine (la motoneige ou le VTT) » ; « reste en attente », « mis en attente » | Le mot expliqué à sa première mention ; mot de métier |
| 5 | Étape 4 | « allumer une lampe frontale… vers le bruit de l'avion » | « pointer une lampe frontale… allumée vers le bruit de l'avion » | Le verbe du geste |
| 6 | Étape 5 | « … au cas où elle empirerait : le temps perdu au début d'une recherche ne se rattrape pas. » | « … au cas où elle empirerait. » | Maxime ; la raison est dite juste avant |
| 7 | Étape 8 | « Si la balise est partie par erreur, … l'heure où elle est partie, … pour qu'il fasse arrêter la recherche : une équipe qui cherche une famille rentrée chez elle ne cherche pas quelqu'un d'autre. » | « Si la balise s'est mise en marche par erreur, … l'heure où elle s'est mise en marche, … pour qu'il fasse arrêter la recherche. » | Maxime « Un X qui… ne… » ; « partie » se lisait « envolée » |
| 8 | Étapes 10, 12, 13 | « compter alors l'heure limite une heure après » ; « ce que dit la fiche de sortie » ; « Laisser au chalet le chemin qu'on prend » ; « garder la lumière et le feu » | « fixer alors l'heure limite à une heure après » ; « ce qui est écrit sur la fiche de sortie » ; « Laisser au chalet, par écrit, le chemin qu'on prend » ; « garder la lumière allumée et le feu » | Règle 0 ; chose qui parle |
| 9 | Étape 14 | « Écrire quatre questions sur une feuille, au mur, à côté de la radio, et la source qui répond à chacune. » ; « Au chalet hors réseau cellulaire, le téléphone ne reçoit pas les alertes d'urgence : il les reçoit seulement s'il est connecté… » | « Écrire quatre questions sur une feuille et l'afficher au mur, à côté de la radio, avec, sous chacune, où trouver la réponse. » ; « Le téléphone reçoit les alertes d'urgence seulement s'il est connecté… : au chalet hors réseau cellulaire, il ne les reçoit pas. » | Geste caché ; révélation en deux temps |
| 10 | Étapes 16 et 17 | « L'hiver, quand on ne peut plus enfoncer la tige : le contrepoids de la section 7. » ; « Pendant une urgence, on lit mal des coordonnées qu'il faut d'abord chercher. » | « …, poser le contrepoids de la section 7. » ; sorti | Étiquette ; justification que le lecteur connaît |
| 11 | Étape 19 | « la balise donne l'alerte sans dire à qui elle appartient » | « les secours reçoivent l'alerte sans savoir à qui appartient la balise » | Chose qui parle |
| 12 | Étape 20 | « …et n'y brancher rien d'autre : une batterie vidée par les outils ne fait plus marcher la radio. » | « …et n'y brancher rien d'autre. » | Conséquence évidente |
| 13 | Étape 22 | « ce qu'elle affiche à −30 °C ne dit pas ce qu'elle vaut une fois réchauffée » ; « Un appareil au lithium-ion ne se recharge pas sous 0 °C, et certaines piles pas sous 10 °C » | « la charge qu'elle affiche à −30 °C est trompeuse : la réchauffer avant de lire sa charge » ; « On ne peut pas recharger un appareil au lithium-ion sous 0 °C, ni certaines piles sous 10 °C » | Chose qui parle ; le geste (déjà dans la section 6) ; pronominal |
| 14 | Étape 25 | « quand le service d'appel est coupé » | « quand le service téléphonique est interrompu » | Le même fait dit avec les mots du ch. 11, étape 16, et de leur source ISDE |
| 15 | Étape 29 | L'envoi de la copie au correspondant venait après la conduite à tenir ; « la personne qui reste suit les étapes 9 à 13 » ; « L'heure à laquelle on doit faire demi-tour : ch. 15, étape 31. » | La copie d'abord ; « la personne qui reste doit suivre les étapes 9 à 13 » ; « Pour l'heure à laquelle faire demi-tour : ch. 15, étape 31. » | Ordre des gestes ; consigne ; étiquette |
| 16 | Sections 5 et 6 | « compter que le correspondant suit sa consigne » ; « Le voyant d'essai répond » ; « Sa consigne n'a pas marché : mal comprise, absence, téléphone fermé » | « compter sur le correspondant pour suivre sa consigne » ; « Le voyant d'essai s'allume » ; « Il n'a pas suivi sa consigne : il l'a mal comprise, il est absent, ou son téléphone est fermé » | Règle 0 ; liste de noms |
| 17 | Section 7, galène | « Une diode au germanium récupérée sur une vieille électronique. Sans diode : une lame… et la pointe d'une mine posée dessus » ; « Pour la valeur, prendre le multimètre » ; « La descente » ; « Le tuyau du poêle ne fait pas une terre, et l'hiver, la tige ne s'enfonce plus dans le sol gelé. Relier alors… » ; « il garde la réception » ; « une seule personne écoute à la fois » | « Prendre une diode au germanium sur un vieil appareil électronique. Sans diode, prendre une lame… et poser dessus la pointe d'une mine de crayon » ; « Pour connaître sa valeur, la mesurer au multimètre » ; « Le fil qui descend vers le poste » ; « Le tuyau du poêle ne fait pas une terre. Quand le sol est gelé, relier… » ; « il permet de capter » ; « une seule personne peut écouter à la fois » | Noms sans verbe ; mot de métier ; redite de l'étape 16 et pronominal |
| 18 | Section 7, poste d'auto | « brancher ensemble le fil qui garde le 12 V clé enlevée et celui qui a le 12 V clé tournée sur le positif d'une batterie de 12 V, et la masse sur le négatif » ; « Relier deux autres fils » ; « dévisser le mât » ; « vide la batterie de communication (ch. 86) » ; « l'écouter moteur coupé : faire tourner le moteur pour l'écouter brûle le carburant (ch. 15) » | « relier ensemble le fil qui a du 12 V même clé enlevée et celui qui a du 12 V seulement clé tournée, et les brancher sur le positif d'une batterie de 12 V ; brancher la masse sur le négatif » ; « Relier une paire de fils de haut-parleur du poste » ; « dévisser le mât de l'antenne de l'auto » ; « vide la batterie réservée à la radio (étape 20) » ; « l'écouter moteur coupé (ch. 15) » | Phrase qui ne se démêlait pas à l'oral ; terme défini nulle part ; conséquence évidente |
| 19 | Section 7, piles | « câblées jusqu'aux bornes de son boîtier » ; « sécher complètement avant de remonter » | « reliées par des fils aux bornes de son boîtier à piles » ; « bien sécher les contacts avant de remettre les piles » | Règle 0 |
| 20 | Section 7, téléphone de campagne | « travaille sur 3 V » ; « comme dans chaque appareil des téléphones de campagne de l'armée » | « marche sur 3 V » ; « comme dans les téléphones de campagne de l'armée » | Mot de tous les jours |
| 21 | Section 7, se faire voir | « répandre à la pelle la cendre du poêle » ; « Le code sol-air se lit comme un message. » ; « un X fait au hasard demande un médecin » ; « Sans soleil, le miroir ne sert à rien : faire de la fumée. » | « répandre la cendre du poêle à la pelle » ; « Le code sol-air sert à dire quelque chose aux avions avec des signes tracés au sol. » ; « un X tracé sans le vouloir se lit comme une demande de médecin » ; « Par temps couvert, faire de la fumée à la place. » | Ordre ; formule ; chose qui parle ; dire ce qui marche |
| 22 | Section 7, écrire et relais | « Graver au couteau, dans le bois du cadre de la porte, ce qui doit résister à l'eau et au temps : … » ; « l'endroit que dit la note » ; « deux maisons voisines font la même chose à cent mètres : elles conviennent… » ; « Envoyer seulement deux personnes » | « Ce qui doit résister à l'eau et au temps (…), le graver au couteau dans le bois du cadre de la porte. » ; « l'endroit écrit sur la note » ; « deux familles qui habitent à cent mètres l'une de l'autre peuvent faire la même chose : elles conviennent… » ; « Envoyer deux personnes ensemble » | Ordre ; chose qui parle ; des maisons qui conviennent et vont cogner ; « seulement deux » se lisait « pas plus de deux » (l'étape 13 dit « à deux ») |
| 23 | Section 7, ce qui ne se remplace pas, ce qu'on perd | « Rien ne l'improvise » ; « Recevoir s'improvise » ; « quoi faire d'un silence » ; « Un relais humain se compte en jours » ; « une recherche peut se faire pour rien, avec des gens sur la route » | « On ne peut pas l'improviser » ; « On peut improviser un récepteur » ; « quoi faire quand un message manque » ; « Avec un relais humain, l'aide arrive en jours » ; « des gens peuvent partir chercher pour rien, sur la route » | Chose sujet d'un verbe d'action ; image ; pronominal |
| 24 | En plus, walkie-talkie | « Ce qu'il porte jusqu'au camp voisin, on le sait seulement en l'essayant » | « Pour savoir s'il porte jusqu'au camp voisin, il faut l'essayer » | Ordre renversé |

Gardé après examen : l'étape 2 sur la VHF (procédure MAYDAY, voie 16) ; l'étape 6 et son tableau ; « Une rumeur se
répand plus vite qu'une nouvelle vérifiée, et elle fait prendre de mauvaises décisions » (étape 27 : la raison de la
consigne, avec ce qu'elle cause) ; « Ne rien dire à la radio qu'on ne dirait pas à un inconnu sur le perron » (une
consigne concrète, pas une maxime) ; « Écrire au feutre, sur la radio, les fréquences qui entrent » (l'ordre inverse
se lisait « les fréquences qui entrent sur la radio ») ; les quatre notes « En plus ».

## Faits signalés (pas corrigés : ils touchent un fait ou un fichier commun)

1. **Le logigramme ne dit plus les mêmes mots que le chapitre** (`images/logigrammes/14-communiquer.json`, rendu
   à refaire ; fichier de l'orchestrateur) : « Déclencher la détresse sans attendre » (boîte de l'étape 2) et « si la
   situation empire, déclencher la détresse » (boîte de l'étape 8) deviennent « Lancer l'appel de détresse » ; la
   précision de la fourche, « se réveille mal », devient « est difficile à réveiller ».
2. **Étape 1, « Dans le doute, avertir quand même (étape 5) »** : le doute porte sur la question de l'étape (la vie
   est-elle en jeu ?). Si on hésite, la phrase fait avertir le correspondant plutôt que lancer l'appel de détresse ;
   c'est peut-être voulu (la note du logigramme dit « dans le doute, on avertit »), mais la consigne prudente se
   trancherait à la source (Recherche et sauvetage). À confirmer ou à préciser.
3. **Section 5, ligne « Chaque message envoyé »** : « Ensuite, compter sur le correspondant pour suivre sa consigne
   (étape 18) » tire dans l'autre sens que l'étape 7 (« Ne rien décider en se disant que le correspondant est au
   courant »). Les deux peuvent tenir (on renvoie une fois, puis on suit sa propre décision), mais pas dits comme ça.
4. **Section 7, poste d'auto, « dévisser le mât de l'antenne de l'auto et le rentrer »** : le texte ne dit pas comment
   brancher le mât au poste une fois sorti de l'auto (la base et le câble restent dans la carrosserie). À préciser à
   la source, ou garder seulement le long fil coincé dans la prise d'antenne.
5. **Section 7, l'accord, « Autre façon de régler plus fin »** avec deux tubes de papier d'aluminium : le texte ne dit
   pas où brancher les deux tubes. À compléter (planche 14-01 ou source du rédacteur).
