# Édition : Chapitre 7, Quand on a un préavis

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/07-quand-on-a-un-preavis.md` au gabarit final, après les corrections du rédacteur qui
  suivent la vérification technique (avis météo, orage violent, avertisseurs par pièce, odeur de gaz, tableau des
  points de contrôle), du titre à la dernière note « En plus ». Texte d'avant l'édition : celui du commit `42d036f`.
  Relu au complet, phrase par phrase, à voix haute (règle 0). Le logigramme (`images/logigrammes/07-preavis.json`) n'est
  pas touché : il est en cours de travail dans l'arbre (voir plus bas).
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31),
  `plan/glossaire.md` (chaudière contre seau), `suivi/07-redaction.md`.
- **Aucune source nouvelle cherchée, aucun chiffre changé.** Ce qui touche un fait est signalé plus bas.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé. Les lignes repliées à environ 120
  caractères le restent (quelques paragraphes repliés de nouveau après la retouche).
- **Ancres :** intactes, chacune une seule fois dans le chapitre : le logigramme `07-preavis-livre.svg` sur
  « **Obturateur de drain de plancher** » (dernier item du Matériel, dont la suite seule a changé) et la planche 07-01
  sur « On fabrique l'obturateur avec un bouchon de bois ». Aucune étape renumérotée (1 à 44) : les renvois du
  logigramme (« ch. 7, étapes… ») tiennent. Deux intertitres de la section 7 changent ; aucun renvoi ne les cite
  (vérifié dans les chapitres et les logigrammes) : « Un deuxième système sur une maison déjà en panne » devient « Une
  deuxième tempête sur une maison déjà en panne », « La génératrice qui refuse de partir » devient « La génératrice qui
  ne part pas ». Les intertitres cités par le chapitre (« L'eau qui reste dans la maison », « La caisse froide dehors »,
  « La batterie de l'auto à la place de la génératrice ») n'ont pas bougé.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 7 772 | 7 802 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes, forme que lit l'assembleur) |
| « § », mots bannis, vocabulaire d'IA, âges, maximes | 0 | 0 |
| Mises en relief | 0 | 0 (une, apparue en cours d'édition au Matériel, « c'est le seul moyen », redite sans relief) |
| Tournures à juger | 1 (étape 39, « on les oublie » : faux positif) | 2 (la même, et « rester à la maison les premiers jours », étape 3 : ordre naturel, faux positif) |
| Mots vides à juger | 48 | 48 (« encore », « bien », « déjà » portent le sens) |
| Redites à juger | 7 | 8 (nouvelle : « les réserves d'eau (étapes 6 à 8) », étapes 1 et 26, deux renvois au même geste, comme « le congélateur (étapes 10 et 11) » qui y était déjà ; les autres sont des renvois ou le même nom pour la même chose, règle 6) |
| Invariants disparus | | « 24 h » (section 6 : « Compter 24 heures », la même durée écrite en mots) ; « 8 heures » une fois (étape 20 redisait l'arrêt d'une heure toutes les 8 heures de l'étape 19, qui le garde) |

Les mots montent parce que les phrases reprennent leurs verbes et leurs articles (règle 0).

## Deux harmonisations de vocabulaire (règle 6, un seul mot par chose)

- **« avertisseur de monoxyde » devient « avertisseur de CO »** (3 fois : étape 21, section 7 « Chauffer une seule
  pièce », section 7 « Ce qui ne se remplace pas »). Le Matériel, la section 5 et les ch. 1 à 6 disent « avertisseur
  de CO ». Les étapes 1 et 26 disent maintenant « l'avertisseur de CO » au lieu de « l'avertisseur ».
- **« seau » devient « chaudière »** (5 fois), selon l'arbitrage du glossaire (« Garder "chaudière" partout, c'est le mot
  du lecteur »). Le chapitre disait les deux, parfois dans la même phrase (« par le bouchon de nettoyage…, avec un seau
  dessous ; sinon… au-dessus d'une chaudière »).
- **Le disjoncteur principal** : le chapitre disait « l'interrupteur principal » (étape 18), « l'entrée électrique
  principale » (étape 40) et « l'entrée principale d'électricité » (étape 42) pour le même disjoncteur. Les trois
  disent « le disjoncteur principal », le mot des ch. 2 et 3.
- Et, en passant : « frigo » devient « réfrigérateur » (Matériel), « poste de pompage » devient « station de
  pompage » (section 7, comme la section 6), « eau de Javel » devient « javel » (étape 8, comme le ch. 6).

## Les phrases changées

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Section 1 ; étapes 1, 6, 7, 26 | « remplir l'eau » (section 1, étape 1 deux fois) ; « Remplir l'eau à boire » ; « Remplir l'eau de service à part » ; « faire d'abord l'eau » | « faire des réserves d'eau » ; « Faire la réserve d'eau à boire » ; « Faire une réserve d'eau de service à part » ; « faire d'abord quatre choses : les réserves d'eau… » | On remplit un contenant, pas l'eau (règle 0) |
| 2 | Section 2 et section 7 | « Un deuxième système s'annonce » | « Une deuxième tempête s'annonce » | Mot de météorologue |
| 3 | Matériel | « il porte les 74 °C à cœur » ; « Rallonge… : assez longue pour… » ; « le seul moyen de détecter le monoxyde ; il affiche un chiffre » | « il mesure les 74 °C à cœur » ; « elle doit être assez longue pour… » ; « il est le seul moyen…, et son écran affiche un chiffre » | Le verbe qui dit ce que fait l'objet |
| 4 | Étape 1 | « Faire les gestes qu'on peut défaire…, et attendre l'avertissement pour ceux qui dépensent la réserve » ; « On le lit, et on ne touche pas à la réserve. » | « … pour les gestes qui dépensent la réserve » ; « Le lire, et ne pas toucher à la réserve. » | « ceux qui » ; consigne dite comme une consigne |
| 5 | Étape 2 | « Écrire l'heure d'arrivée prévue » | « Écrire l'heure prévue de l'événement » | L'arrivée de quoi |
| 6 | Étape 3 | « on ne peut pas commencer à la maison et monter au sixième jour » | « on ne peut pas rester à la maison les premiers jours et monter au chalet au sixième jour » | Règle 0 |
| 7 | Étape 7 | « nue, elle se vide » ; « les chaudières, les marmites et les seaux de 20 L » ; « d'une autre couleur que l'eau à boire » | « sans sac, elle se vide » ; « les marmites et les chaudières de 20 L » ; « d'une autre couleur que ceux de l'eau à boire » | Mot de tous les jours ; un seul mot ; le contenant a une couleur, pas l'eau |
| 8 | Étape 10 | « En dégelant, les bidons redeviennent de l'eau à boire (section 7). » | Coupé | Redite de la section 7, « Les bidons du congélateur (étape 10)… redeviennent de l'eau à boire » |
| 9 | Étape 11 | « retarde le dégel d'autant » | « retarde le dégel » | Formule (« d'autant ») |
| 10 | Étape 12 ; section 5 | « Descendre au congélateur » ; « Thermostat au plus froid ; descendre au congélateur… » | « Mettre au congélateur » ; « Mettre le thermostat au plus froid ; mettre au congélateur… » | Le congélateur n'est pas toujours au sous-sol ; consigne avec son verbe |
| 11 | Étape 13 | « la viande qui ne tiendra pas au dégel » ; « l'orignal, l'ours, le lièvre » ; « Une viande cuite se mange froide » | « … si le congélateur dégèle » ; « l'orignal, le lièvre » ; « On peut manger froide une viande cuite » | Règle 0 ; l'ours et ses 74 °C sont le sujet de l'étape 14, qui le garde ; pronominal |
| 12 | Étape 16 | « sera enterré et mouillé par la tempête » | « sera enterré sous la neige et mouillé par la tempête » | Règle 0 |
| 13 | Étape 18 | « à au moins 6 m du bâtiment lui-même, pas de la porte » ; « Ne jamais la mettre » ; « prendre la rallonge à la longueur de cette distance » ; « on ne dégage pas 6 m de neige » | « à au moins 6 m du bâtiment… Mesurer les 6 m depuis le mur le plus proche, pas depuis la porte. » ; « Ne jamais mettre la génératrice » ; « prendre une rallonge assez longue pour couvrir toute la distance » ; « on ne peut plus dégager un passage de 6 m dans la neige » | Règle 0 ; on nomme la chose |
| 14 | Étape 19 | « La faire travailler selon sa puissance » | « Ne pas lui demander plus que sa puissance » | Règle 0 |
| 15 | Étape 20 | « Elle ne correspond pas à la fiche du fabricant, qui suppose une autre charge. L'écrire au feutre… » ; « regarder en combien de temps le thermomètre… remonte vers −18 °C : on la redémarre avant » ; « …et l'arrêt d'une heure toutes les 8 heures empêche de toute façon de la faire tourner sans arrêt » | « La fiche du fabricant donne un autre chiffre, calculé pour une autre charge. Écrire la consommation mesurée au feutre… » ; « noter en combien de temps le thermomètre… remonte jusqu'à −18 °C : il faut la redémarrer avant ce moment » ; « : elle n'a pas besoin de tourner sans arrêt » | Chose qui suppose ; consigne ; redite de l'étape 19 |
| 16 | Étape 21 | « on éloigne la génératrice ou on éteint l'appareil » | « éloigner la génératrice ou éteindre l'appareil » | L'infinitif dans une étape |
| 17 | Étape 25 | « s'agiter sans savoir pourquoi » | « s'agiter et qu'il ne sait pas pourquoi » | Qui ne sait pas : l'enfant |
| 18 | Étape 27 | « Passé ce moment, on ne sort que pour une urgence, jamais pour un oubli. » | « Ne plus sortir que pour une urgence, jamais pour aller chercher un oubli. » | Consigne au présent qui décrit |
| 19 | Étape 34 | « Les conduites qui gèlent les premières longent un mur extérieur… » … « Les conduites des murs extérieurs gèlent bien avant la pièce. » | « Les conduites qui longent un mur extérieur…, gèlent les premières, bien avant la pièce. » | Le même fait dit au début et à la fin du point |
| 20 | Étape 39 | « Y ajouter les clés et l'argent comptant : ils servent tous les jours, hors de la trousse, et on les oublie. » | « Y ajouter les clés et l'argent comptant de tous les jours : ils ne sont pas dans la trousse, et on les oublie. » | Le ch. 6 met des doubles des clés et de l'argent dans la trousse : on dit lesquels |
| 21 | Étape 40 | « autant que dans la toilette » | « comme dans la toilette » | Règle 0 |
| 22 | Étape 42 | « …quand l'eau coule au robinet d'eau chaude : il est plein » | « … : le chauffe-eau est alors plein » | On nomme la chose |
| 23 | Étape 43 | « Rouvrir l'entrée envoie le gaz vers tous les appareils » ; « rouvrir l'entrée lentement » | « Quand on rouvre l'entrée du gaz, le gaz part vers tous les appareils » ; « rouvrir l'entrée du gaz lentement » | Infinitif sujet ; on nomme la chose |
| 24 | Étape 44 | « Si on ne le fait pas, le prochain préavis part d'une réserve vide. » | « Sinon, au prochain préavis, on part d'une réserve vide. » | Chose qui agit |
| 25 | Section 5 | « Veille ou avis : seulement les gestes… » ; « La baignoire sert au service, jamais à boire » ; « Sinon, le retour du courant passe inaperçu la nuit » ; « Sans elle, les comptes de 4 h, 24 h et 48 h ne servent à rien » ; « Plus de givre et centre mou » | « Veille ou avis : faire seulement les gestes… » ; « Ne jamais boire l'eau de la baignoire » ; « En allumer une à chaque étage » ; « L'écrire tout de suite : sans elle, on ne peut pas compter les 4 h, 24 h et 48 h » ; « Sans givre, centre mou » | La colonne « Si c'est hors cible » dit un geste ; « plus de givre » se lisait « davantage de givre » (la section 6 dit « sans givre ») |
| 26 | Section 6 | « Compter l'échéance à partir de 24 h » ; « Le préavis part trop bas » | « Compter 24 heures à partir de l'heure écrite sur la porte » ; « La réserve est trop basse au début du préavis » | Règle 0 |
| 27 | Section 7, deuxième tempête | « …sans attendre le cinquième jour : la maison n'a plus d'eau courante, ni d'égout fiable, ni de recharge, au milieu d'une ville qui n'en a plus non plus, et le chalet a le bois, l'eau et le territoire. » | « …sans attendre le cinquième jour. » | La justification que le lecteur connaît déjà (la règle de bascule, ch. 2) |
| 28 | Section 7, l'eau | « Quatre réserves restent dans la maison. » ; « la broche crève le bouchon » ; « La tuyauterie : on la vide par le robinet le plus bas…, après avoir ouvert le plus haut… » ; « ouvert dans un bac à linge » | « Il reste quatre réserves d'eau dans la maison. » ; « couvert d'un dépôt qui bouche le robinet, et la broche le défait » ; « ouvrir d'abord le robinet le plus haut…, puis vider la tuyauterie par le robinet le plus bas… » ; « déplié dans un bac à linge » | Ordre naturel ; « bouchon » se lisait comme une pièce ; les gestes dans l'ordre |
| 29 | Section 7, neige | « jetée dans un chaudron sec, la neige brûle le fond avant de fondre » | « quand on jette la neige dans un chaudron sec, le fond brûle avant que la neige fonde » | Participe en tête ; la neige ne brûle rien |
| 30 | Section 7, toilette | « Chaque chasse envoie son eau dans un égout qui ne pompe plus. » | « Chaque chasse remplit un peu plus l'égout, qui ne pompe plus. » | Chute en formule |
| 31 | Section 7, glace | « Sans courant, le congélateur ne fait plus de froid : il perd celui qu'il a. Dehors, il gèle. Remplir… » | « Quand il gèle dehors, on peut garder froid le congélateur arrêté. Remplir… » | Évidence ; télégraphe |
| 32 | Section 7, caisse | « Ce qu'on perd : le réglage. » | « Ce qu'on perd : le contrôle de la température. » | Règle 0 |
| 33 | Section 7, génératrice | « Elle passe presque toute l'année arrêtée, et quand elle ne part pas » ; « vider dans un pot » ; « Régler l'écartement » ; « La génératrice en marche et rien d'autre de branché, brancher… » ; « Remplacer la corde du lanceur cassée par… » | « Une génératrice passe presque toute l'année arrêtée. Quand elle ne part pas » ; « vider la cuve dans un pot » ; « Régler l'écart entre les électrodes » ; « Pendant que la génératrice tourne, sans rien d'autre de branché, brancher… » ; « Quand la corde du lanceur casse, la remplacer par… » | Une phrase, une information ; on nomme la chose ; participe absolu |
| 34 | Section 7, une pièce | « Fermer d'abord la cage d'escalier : un escalier ouvert fait cheminée. L'air chaud y monte… » ; « couvrir ses fenêtres » ; « on ne peut plus se fier à lui » | « Fermer d'abord la cage d'escalier : l'air chaud y monte… » ; « couvrir les fenêtres de la pièce » ; « on ne peut plus se fier à l'avertisseur » | Image sans article ; on nomme la chose |
| 35 | Section 7, plomberie | « les tuyaux qui gèlent les premiers fendent (étape 34) » ; « par le bouchon de nettoyage, au bas du coude, quand il y en a un, avec un seau dessous ; sinon à la poire… » ; « À la maison sur l'égout de la ville, un peu de lave-glace au méthanol y abaisse le point de congélation. » | « les tuyaux de l'étape 34 gèlent les premiers et fendent » ; « S'il a un bouchon de nettoyage au bas du coude, mettre une chaudière dessous et dévisser le bouchon ; sinon, aspirer l'eau à la poire… » ; « À la maison, sur l'égout de la ville, y verser un peu de lave-glace au méthanol : il abaisse le point de congélation. » | La condition avant le geste (règle 3) ; consigne au présent qui décrit |
| 36 | Section 7, ce qu'on perd | « les lampes et les communications s'usent au lieu de se recharger, et chaque soir coûte quelque chose qu'on ne remet pas » ; « une pompe à essence sans courant ne vend rien » | « les piles des lampes, des téléphones et des radios se vident, et on ne peut plus les recharger » ; « on ne peut plus faire le plein » | Chute ; redite de l'étape 17 |
| 37 | Section 7, ne se remplace pas | « on ne peut pas estimer les 74 °C à cœur » ; « la seule marge, on la prend avant, en les renouvelant tôt » | « on ne peut pas deviner les 74 °C à cœur à l'œil » ; « la seule marge est de les faire renouveler tôt » | Règle 0 |
| 38 | En plus, Koksoak | « : la bête posée sur des pierres, sous un mur de pierres contre les corbeaux… » | « : ils posaient la bête sur des pierres et montaient un mur de pierres par-dessus contre les corbeaux… » | Participe à la place du geste |

## Faits signalés (pas corrigés)

1. **Étape 22, titre : « boucher les entrées d'égout au lieu de remplir ».** « Au lieu de remplir » ne dit pas quoi
   (les contenants d'eau ? la baignoire ?), ni pourquoi on ne remplirait pas. La formule vient de la première version
   (« obturer au lieu de remplir ») et n'a jamais été expliquée. Si le fait est « pendant une crue, l'eau du robinet
   reste, le geste urgent est l'égout », le dire ; sinon, couper « au lieu de remplir ».
2. **Étape 22 : « Monter à l'étage… en commençant par les bidons d'essence, d'huile usée, d'antigel et de solvant ».**
   Monter l'essence dans la partie habitée de la maison va contre le ch. 5, étape 31 (le carburant dehors) et contre le
   pictogramme `vapeurs`. Le mécanisme (un bidon flotte et se vide) est juste ; la destination est à revoir (dehors, en
   hauteur, attaché).
3. **Étape 7 : l'eau de service « pour la cuisine et pour se laver » et « n'a pas besoin d'être potable ».** L'eau qui
   sert à cuisiner doit être potable, ou bouillie. Le ch. 6 range la cuisine dans les 4 L par personne d'eau propre.
4. **Étape 8 et section 7, « L'eau du dehors » : les durées.** L'étape 8 dit 1 minute d'ébullition et 30 minutes
   d'attente à la javel, pour l'eau du robinet ; la section 7 envoie l'eau du dehors (lac, neige) « comme à l'étape 8 ».
   Le ch. 6 et le ch. 10 disent 5 minutes d'ébullition pour l'eau d'un lac, et 1 à 2 heures d'attente à la javel dans
   une eau froide. À harmoniser : la section 7 devrait renvoyer au ch. 10.
5. **Étape 20 : « Ce temps donne le nombre d'heures de marche par jour. »** Le temps que met le congélateur à remonter
   à −18 °C donne le temps d'arrêt ; pour les heures de marche, il faut aussi le temps qu'il met à redescendre. Le
   calcul est à reprendre par le rédacteur.
6. **Section 5, « Contenants d'eau bouillie » : « sans date, refaire la réserve au troisième jour ».** L'étape 9 donne
   24 heures à la température de la pièce. Sans date, c'est la durée courte qui compte.
7. **Le logigramme** (`07-preavis.json`) dit encore « **Remplir l'eau, charger et rentrer du bois.** » et « **Remplir
   l'eau et le congélateur** » : la même tournure que la ligne 1. Le fichier est modifié dans l'arbre par un autre
   travail en cours ; pas touché ici. À reprendre au prochain rendu.

## Liste de contrôle de l'éditeur (cadre des agents, partie « Le texte »)

- Sept sections, pas de « Comment ça marche », pas de section Danger, pictogrammes dans les étapes : fait (inchangé).
- Rien sous le titre que la ligne de lieu : fait (« **Maison** »).
- Section 2 sans « mauvaise procédure » : fait.
- La série orange (étapes 1 à 5, pastille 30 min) en tête de la Procédure, juste après le logigramme : fait
  (inchangé, retouchée seulement à la phrase : lignes 1, 4, 5, 6).
- Règle 0, phrase par phrase : fait (38 changements ci-dessus, plus les harmonisations).
- Pas de maxime, de chute, d'opposition fabriquée, d'image, de chose qui pense : fait (lignes 9, 15, 24, 27, 30, 31,
  34, 36 ; « refuse de partir » sort).
- Pas de pronominal pour une consigne, pas de « ceux qui », consigne dite comme une consigne, ordre naturel : fait
  (lignes 4, 11, 16, 18, 25, 28, 29, 35).
- Un seul mot par chose (avertisseur de CO, chaudière, disjoncteur principal, réfrigérateur, station de pompage,
  javel) : fait.
- Aucun tiret dans le texte, aucun « § » : fait (les deux tirets restants sont le titre et la ligne de tome).
- Inventaire des faits, un fait une fois : fait pour les redites trouvées (lignes 8, 11, 15, 19, 27, 36).
- Planches appelées, ancres intactes : fait (07-01, logigramme 07).
- controle.py : 0 tiret dans le texte, 0 « § », 0 mot banni ; avis jugés un par un (voir le tableau).
- Aucun chiffre changé, aucune source cherchée : fait.

## Édition des décisions de JP, 19 octobre 2026

Éditeur de la passe « décisions de JP » (`_reprise/scratchpad/tome1-final/decisions-jp.js`). Relu seulement les phrases que la passe a changées (texte d'avant : commit `03525fa`), à voix haute, avec le skill `ecriture` ; aucun fait ni chiffre touché, aucune ancre touchée. `controle.py --avant` (texte d'avant l'édition) : rien n'a disparu.

- Étapes 6 et 7 : « Pour une famille de quatre et sept jours » et « … et trois jours » deviennent « Pour une famille de quatre, pendant sept jours » et « …, pendant trois jours ».
