# Édition : Chapitre 9, Ce qui manque toujours

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/09-ce-qui-manque-toujours.md` au gabarit final, du titre à la dernière note « En plus »,
  relu phrase par phrase à voix haute. Texte d'avant l'édition : celui de `HEAD` (dernier commit qui le touche :
  `17487ee`), identique au fichier de travail au début de l'édition.
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31),
  `plan/glossaire.md`, la légende de la planche 09-08 (`images/planches-src/09-08.js`, pour garder « bois de bout »).
- **Aucune source nouvelle cherchée, aucun chiffre ni aucun fait changé.** Ce qui touche un fait est signalé plus bas.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé.
- **Ancres :** la seule ancre du chapitre, 09-08 sur « **Les joints, dans le cuir gras.** », est intacte (le paragraphe
  n'a pas été touché, une seule occurrence). Aucune ancre nouvelle. Aucune étape renumérotée (1 à 26) ; aucun
  intertitre ni début gras de la section 7 renommé (« Le gras, dans l'animal », « La balance à fléau » restent, ils sont
  appelés ailleurs).

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 7 060 | 7 042 |
| Tirets | 2 (titre et ligne de tome, forme que lit l'assembleur) | 2 (les mêmes) |
| « § », mots bannis, vocabulaire d'IA, tournures, mises en relief, maximes | 0 | 0 |
| Mots vides à juger | 19 | 20 (« Toujours calculer les pourcentages de sel » : le « toujours » est la règle 4 de `CLAUDE.md`) |
| Redites à juger | 2 | 3, toutes des renvois voulus : « sans balance au 0,1 g » et « on fait seulement des salaisons courtes » (le sel du fleuve et le sel nitrité renvoient maintenant à « La balance à fléau ») ; « section 7, « Le gras, dans l'animal » » (renvoi de l'étape 4 et de la note En plus) |
| Ancres introuvables | 0 | 0 |
| Invariants disparus | | rien |

## Les phrases changées

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Section 1 | « quand un article manque quand même, le mesurer, le fabriquer ou faire sans, avec ce qu'on a » | « quand un article ou un instrument de mesure manque quand même, le fabriquer avec ce qu'on a, ou faire sans » | « Mesurer un article qui manque » ne se comprend pas |
| 2 | Section 2 | « **L'hiver finit**, et il faut noter… » | « **L'hiver finit** : on note… » | Même forme que les autres lignes |
| 3 | Section 3, balance | « ; sans balance, le fléau de la section 7, jamais pour le nitrite » | « . Sans balance, on prend le fléau de la section 7, jamais pour le nitrite » | Étiquette en raccourci |
| 4 | Étape 1 | « la famille dit comment calculer » ; « Ces manques viennent plus souvent d'une erreur de famille que d'un oubli. Les familles servent à calculer, pas à choisir quoi acheter d'abord : suivies à la lettre, elles feraient acheter du coton à fromage avant le bois de chauffage. » | « la famille donne la façon de calculer » ; « Mais un article manque plus souvent parce qu'on a calculé sa quantité avec la mauvaise famille que parce qu'on l'a oublié. On n'achète pas dans l'ordre des familles : on achèterait le coton à fromage avant le bois de chauffage. » | Chose qui parle ; « erreur de famille » à déchiffrer, et qui contredisait à l'oreille la phrase d'avant ; redite (« la famille sert à calculer » était dit deux fois) |
| 5 | Étape 2 | « ce qui sert à traiter une masse : calculer sur le poids traité » | « ce qui sert à traiter la nourriture : calculer sur le poids qu'on traite » | Mot abstrait |
| 6 | Étape 2 | « Calculer les pourcentages de sel toujours sur… » | « Toujours calculer les pourcentages de sel sur… » | Ordre naturel |
| 7 | Étape 2, `{!botulisme}` | « …ni l'apparence : goûter la viande ne dit rien. » | « …ni l'apparence. » | Conséquence évidente, chose qui parle |
| 8 | Étape 3 | « sa chaîne et sa lime s'en vont » | « sa chaîne et sa lime s'usent » | Le mot exact |
| 9 | Étape 4 | « calculée sans sa date, la réserve est assez grande, mais périmée » | « si on calcule la réserve sans suivre sa date, on a assez de médicaments, mais ils sont périmés » | Chute en formule |
| 10 | Étape 4, `{!mal-de-caribou}` | « …qui tue en quelques semaines : une réserve de viande d'hiver sans gras ne nourrit pas la famille. » | « …qui tue en quelques semaines. » | Conséquence redite en maxime |
| 11 | Étape 5 | « sans changer d'apparence, qu'on s'en serve ou non » ; « Une liste d'achat donne des quantités, pas des dates : elle ne suffit pas pour cette famille. » | « sans changer d'apparence » ; *(rien)* | Redite du titre de l'étape ; conséquence évidente de « gérer la date » |
| 12 | Étape 6 | « et calculer sa couverture : la quantité… » | « et calculer la couverture de l'article, c'est-à-dire le nombre de jours que dure sa réserve : la quantité… » | Mot de rapport expliqué la première fois |
| 13 | Étape 8 | « la couverture de l'article le plus court » | « la couverture la plus courte d'un article » | « L'article le plus court » ne se comprend pas |
| 14 | Étape 9 | « un manque dure jusqu'à la réouverture du chemin : la réserve doit couvrir tout le temps entre la fermeture du chemin et sa réouverture » | « on ne peut rien racheter avant la réouverture du chemin : la réserve doit couvrir tout le temps où le chemin est fermé » | Redite dans la phrase |
| 15 | Étape 10 | « un bidon qui suinte peut y rester des semaines sans rien faire » | « … sans que rien n'arrive » | Chose qui agit |
| 16 | Étape 11 | « Une boîte sans date n'est pas plus stable qu'une autre » ; « Écrire au marqueur, à l'achat, la date que l'emballage ne donne pas. » | « … ne se garde pas plus longtemps qu'une autre » ; *(rien)* | Mot de laboratoire ; redite du geste de l'étape 11 elle-même |
| 17 | Étape 13 | « Commander quand le bac est vide, c'est rester sans rien… » | « Si on attend que le bac soit vide pour commander, on reste sans rien… » | Formule |
| 18 | Étape 20 | « On ne voit rien. » | « La perte ne se voit pas. » | Phrase à trou |
| 19 | Étape 22 | « et on meurt du monoxyde en dormant » | « et le monoxyde peut la tuer pendant son sommeil » | Le sujet change en cours de phrase |
| 20 | Étape 23 | « La rouille du pied, par en dessous, là où…, amincit la paroi » ; « …requalifiée (…) : la réserve disparaît alors sans qu'une goutte ait brûlé. » | « La rouille amincit la paroi par en dessous, au pied, là où… » ; « …requalifiée (…). » | Sujet séparé de son verbe ; chute en image (la conséquence est à la section 6) |
| 21 | Étape 24 | « la réserve d'eau couvre la panne, pas l'année » | « on garde de l'eau pour la durée d'une panne, pas pour l'année » | Formule |
| 22 | Étape 25 | « …, et le décider avant la fermeture du chemin** » ; « Le transport est leur vrai coût » | « …, avant la fermeture du chemin** » ; « Ils coûtent surtout à transporter » | « Le décider » à chercher ; formule |
| 23 | Étape 26 | « **Garder en double, aux deux endroits, ce qui est…** » | « **Avoir en double ce qui est indispensable et léger, un à chaque endroit** » | Compléments entre le verbe et l'objet |
| 24 | Section 5 | « Article trouvé sans date : le dater… » ; « Boîtier sans date de fabrication lisible : le remplacer » ; « Pièce au fond : le contenu a dégelé » | « Si on trouve un article sans date, le dater… » ; « Si le boîtier n'a pas de date de fabrication lisible, remplacer l'avertisseur » ; « Si la pièce est au fond, le contenu a dégelé » | Étiquettes en raccourci |
| 25 | Section 5, ramonage | « Ramoner avec un hérisson…, par le haut, poêle froid, registre fermé et bas du tuyau bouché » | « Ramoner par le haut avec un hérisson…, le poêle froid, le registre fermé et le bas du tuyau bouché » | Participes sans article |
| 26 | Section 5, germination | « La proportion qui lève est le multiplicateur du semis » ; « 5 graines levées sur 10 : semer… 2 sur 10 : remplacer le lot, parce que… » | « On règle la densité du semis sur la proportion qui lève » ; « Si 5 graines sur 10 lèvent, semer… Si 2 sur 10 seulement lèvent, remplacer le lot : … » | Étiquettes ; voir fait signalé 3 |
| 27 | Section 5, inventaire | « L'article le plus court de la réserve » | « L'article qui a la couverture la plus courte » | Comme le 13 |
| 28 | Section 6, essence | « La brûler mêlée à de l'essence fraîche, à bas régime, dans… » ; « Le chamois ou le feutre enlèvent… » | « La mêler à de l'essence fraîche et la brûler à bas régime dans… » ; « Filtrer l'essence au chamois ou au feutre enlève… » | Participe ; le geste nommé |
| 29 | Section 6, caoutchouc | « la fuite apparaît la nuit où il fait −35 °C » | « et il fuit au grand froid, à −35 °C » | Petite scène |
| 30 | Section 7, fléau | « Pendre à chaque bout une boîte de conserve » ; « une tasse à mesurer donne toute la série (…) en bouteilles » | « Pendre une boîte de conserve à chaque bout » ; « avec une tasse à mesurer, on prépare toute la série de poids (…) dans des bouteilles » | Ordre naturel ; chose qui fait le geste |
| 31 | Section 7, fléau | « **Ce qu'on perd :** le bas de l'échelle. Un fléau de fortune pèse honnêtement… » | « **Ce qu'on perd :** les petites pesées. Un fléau de fortune pèse juste… » | Image ; personnification |
| 32 | Section 7, thermomètre | « Dans un verre bourré de glace pilée et d'eau, brassé, elle doit lire » ; « ces 74 °C font la différence entre une viande d'ours qu'on peut manger et une trichinellose » | « Plantée dans un verre plein de glace pilée et d'eau, qu'on a brassé, elle doit lire » ; « une viande d'ours qui n'a pas atteint 74 °C à cœur peut donner la trichinellose » | Participes en chaîne ; mise en relief |
| 33 | Section 7, pot témoin | « …et un dans la cave » | « …et un dans le caveau » | Un seul mot par chose dans le même paragraphe (« dans le caveau » deux lignes plus haut) |
| 34 | Section 7, sel du fleuve | « Face à la Côte-Nord » ; « le bois coûte celui d'une évaporation complète » ; « …faites à l'abri de l'air : on fait des salaisons courtes, à l'air, et séchées, jamais de pièces emballées serré ni enterrées » | « Le long de la Côte-Nord » ; « il faut le bois d'une évaporation complète » ; « …faite à l'abri de l'air : avec ce sel, on fait seulement des salaisons courtes, à l'air (« La balance à fléau », plus haut) » | Règle 0 ; redite (dite trois fois dans la section : elle garde sa place dans « La balance à fléau ») |
| 35 | Section 7, le gras | « **Prendre la graisse de l'orignal** » ; « **Ce qu'on perd :** on ne trouve pas de gras toute l'année. Il s'accumule à l'automne, et… » | « **Prendre le gras de l'orignal** » ; « … toute l'année : un animal de mars n'en a pas » | Un seul mot par chose ; redite de « On le prend surtout à l'automne » |
| 36 | Section 7, lumière | « faire une lampe à huile avec du gras fondu » | « faire une lampe à gras : du gras fondu et une mèche dans un contenant » | « Lampe à huile » et « lampe à l'huile » nommaient deux lampes différentes dans le même paragraphe |
| 37 | Section 7, savon | « ce savon sert au linge et aux planchers » | « on garde ce savon pour le linge et les planchers » | Consigne dite comme une consigne |
| 38 | Section 7, levain | « **Ce qu'on perd :** la vitesse et la régularité. Le pain lève lentement et de façon irrégulière » | « **Ce qu'on perd :** le pain lève lentement et de façon irrégulière » | Redite |
| 39 | Section 7, glaçage | « une pellicule de glace » ; « la gaine de glace » ; « C'est le glaçage : il protège… » ; « **Ce qu'on perd :** la tolérance. … il coule, et la protection part avec lui. » | « une mince couche de glace » ; « la couche de glace » ; « Ce glaçage protège… » ; « **Ce qu'on perd :** le glaçage tient seulement tant que… il coule. » | « Pellicule » nommait aussi le plastique ; trois mots pour la glace ; mise en relief ; chute |
| 40 | Section 7, coton | « Pas de corde synthétique » ; « il garde l'humidité là où la viande devrait respirer » | « Ne pas prendre de corde synthétique » ; « il garde l'humidité contre la viande » | Nom sans verbe ; image |
| 41 | Section 7, lime | « L'acide ronge l'acier partout à la même vitesse : il amincit la pointe des dents plus vite qu'il n'élargit leur fond » ; « Et ça ne remplace ni une dent arrachée ni une lime ronde du mauvais diamètre. » | « L'acide ronge l'acier à la même vitesse partout, et la pointe des dents, plus mince, s'amincit plus vite que leur fond ne s'élargit » ; « Et le vinaigre ne répare pas une dent arrachée, et il ne change pas le diamètre d'une lime ronde. » | « Partout à la même vitesse » puis « plus vite » se contredisaient à l'oreille ; « ça » vague |
| 42 | Section 7, godendard | « que l'essence est vernie » ; « une lame qui coince manque de voie ; elle n'est pas émoussée » | « que toute l'essence a vieilli » ; « quand elle coince, il faut lui redonner de la voie, pas l'affûter » | Mot d'atelier ; opposition dite comme une consigne |
| 43 | Section 7, sel nitrité | « on ne fait pas de salaison longue, à l'abri de l'air ou emballée serré : on fait court, à l'air, séché, et on cuit… » | « on fait seulement des salaisons courtes, à l'air (« La balance à fléau », plus haut), et on cuit… » | Redite (voir 34) |
| 44 | En plus, Naskapis | « On mangeait… on l'échangeait… on s'en servait » ; « La graisse du dos qu'on faisait sécher… sans la fondre » | « Ils mangeaient…, l'échangeaient et s'en servaient » ; « Le gras du dos qu'ils faisaient sécher… sans le fondre » | Le sujet se nomme ; un seul mot par chose |
| 45 | En plus, babiche | « prennent la peau de caribou, verte et non tannée, grattée puis tendue au piquet » ; « Ils jugent la babiche d'orignal peu résistante : elle ne dure pas comme celle du caribou. » ; « Pour abouter deux bouts » | « prennent de la peau de caribou verte, non tannée, qu'ils grattent puis tendent au piquet » ; « Ils trouvent que la babiche d'orignal dure moins que celle du caribou. » ; « Pour joindre deux bouts » | Participes en chaîne ; redite ; mot de métier |
| 46 | En plus, piles | « On peut garder 10 ans à 21 °C une pile AA alcaline neuve qui ne sert pas, et 25 ans une pile AA au lithium. » | « On peut garder une pile AA alcaline neuve, qui ne sert pas, 10 ans à 21 °C, et une pile AA au lithium, 25 ans. » | Compléments entre le verbe et l'objet |

Les notes En plus restent entre 30 et 80 mots.

## Les faits signalés, sans rien changer

1. **Le godendard n'est pas dans le ch. 00b.** Section 7, « Ce qui ne se remplace pas », carburant : « Le godendard fait
   donc partie du stock du ch. 00b. » Le ch. 00b n'a ni godendard ni sciotte. Ajouter la ligne au ch. 00b, ou couper la
   phrase.
2. **Formats de piles.** Section 7 : « Garder trois formats de piles plutôt que six ». Ch. 00b, 1.F : « Piles de
   rechange, d'un seul format pour tout le bâtiment ». À aligner.
3. **Le test de germination.** Section 5 : 10 graines comptées à 10 jours. Ch. 00b, palier 3 : « test de 20 graines
   (ch. 100) ». Et l'ancienne phrase « La proportion qui lève est le multiplicateur du semis » disait l'inverse du calcul
   (5 sur 10 donne un semis deux fois plus dense : on divise par la proportion) ; l'édition l'a remplacée par « On règle
   la densité du semis sur la proportion qui lève », qui ne dit pas le calcul. Le rédacteur peut écrire la règle exacte
   avec le ch. 100.
4. **Eau de Javel, date d'achat ou date de fabrication.** Étape 16 : « périmée un an après sa date d'achat ». Ch. 00b,
   1.B : « On écrit en gros la date de fabrication sur le contenant », « remplacés avant qu'ils aient un an ».
5. **La pile qui a coulé.** Étape 17 : « on voit la poudre blanche aux bornes quand l'appareil est déjà perdu ».
   Section 6 : l'appareil est perdu seulement « si les contacts sont rongés jusqu'au métal nu piqué ». À aligner.
6. **La force de la lessive.** Section 7, « Le savon, à la cendre » : « tant qu'on n'a pas de moyen de mesurer la force
   de la lessive ». Ch. 00b, E : le test de l'œuf ou de la petite patate la juge. À relier ou à aligner.
7. **Le sel du fleuve, deux façons.** Ici : faire évaporer et récolter le dépôt, et le sel contient les chlorures de
   magnésium et de calcium. Ch. 00b, C : « arrêter avant la fin », parce que ces sels cristallisent en dernier. Le ch.
   00b dit aussi « On ne connaît pas le rendement », quand ce chapitre donne 27 à 29 g par litre. À aligner.
8. **Souder à deux batteries.** « Les électrodes, avec deux batteries » : 24 V, « assez pour tirer un arc et souder de
   l'acier doux ». Ch. 00b, D : 24 V est sous la tension d'un arc de travail ; trois batteries (36 V) sont à préférer.
   Même écart au ch. 8.
9. **La romaine.** Quand on déplace le pivot vers un bout, le bâton vide n'est plus en équilibre ; le texte ne dit pas
   de le rééquilibrer avant de lire le rapport des bras (« une bouteille de 1 L fait équilibre à 3 kg »). À vérifier par
   le vérificateur technique.
10. **Le joint de cuir et la chambre à air.** « Poser le cuir à plat dessus : du cuir de botte, une semelle ou une vieille
    chambre à air (repère 5) ». Une chambre à air est du caoutchouc, pas du cuir, et la suite la fait tremper dans le
    suif. À trancher avec la planche 09-08.
11. **La bouteille de propane requalifiée.** Étape 23 : « Le dépôt ne remplit pas une bouteille… qui n'a pas été
    requalifiée ». C'est une règle de dépôt, donc proche de la « règle légale » que `CLAUDE.md` coupe ; elle sert
    pendant que tout marche (on compte la bouteille comme perdue avant l'automne, section 6). À trancher par JP.
12. **Mots qui diffèrent d'un chapitre à l'autre** (pas d'erreur, à harmoniser au glossaire) : « stabilisant » ici,
    « stabilisateur de carburant » au ch. 00b ; « hérisson d'acier » ici, « brosse de ramonage » au ch. 00b ; « au bord de
    la mer » ici, « au niveau de la mer » au ch. 8.

## Liste de contrôle du cadre (partie « Le texte »)

- [x] Sept sections, plus de « Comment ça marche », plus de section Danger ; pictogrammes dans l'étape. Fait (déjà en place, vérifié).
- [x] Rien sous le titre que la ligne de lieu. Fait.
- [x] Section 2 : seulement quand l'utiliser. Fait.
- [x] L'année : le chapitre suit le calendrier (septembre, avril, novembre…). Fait.
- [-] Série orange, pastille, logigramme : chapitre de planification, sans geste urgent ; rien à faire.
- [x] En plus : quatre notes de 30 à 80 mots, trois genres permis, une photo, sans planche. Fait.
- [x] Règle 0, phrase par phrase. Fait (46 retouches).
- [x] Pas de loi en formule, de « d'où », de « X passe là où », de maxime, de chute, d'opposition fabriquée, d'image, de
  chose qui pense. Fait.
- [x] Pas de pronominal pour une consigne, pas de « ceux qui », ordre naturel. Fait.
- [x] Possessif qui oblige à chercher : nommé. Fait.
- [x] Mots de tous les jours (« abouter », « une masse », « l'essence vernie » sortent) ; aucun tiret dans le texte ;
  « section N ». Fait.
- [x] Répétition : inventaire fait ; « on fait court, à l'air, séché » gardé une fois (« La balance à fléau ») et renvoyé
  ailleurs ; « écrire la date au marqueur » gardé une fois (étape 11). Fait.
- [x] La procédure : sous-étapes de « Les joints, dans le cuir gras » dans l'ordre des repères 1 à 12 de la planche
  09-08, paragraphe non touché. Fait.
- [x] Planche 09-08 appelée une fois, son ancre intacte. Fait.
- [x] `controle.py` : 0 tiret dans le texte, 0 « § », 0 mot banni, 0 ancre perdue, invariants intacts ; chaque redite
  jugée. Fait.
