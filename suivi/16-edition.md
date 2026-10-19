# Édition : Chapitre 16, Le voisinage et le groupe de chasse

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/16-le-voisinage-et-le-groupe-de.md` au gabarit final (sept sections et « En plus »), du
  titre à la dernière note, relu phrase par phrase à voix haute. Texte d'avant l'édition : le fichier de travail à
  02 h 01 (identique à `HEAD` à ce moment), copie dans le scratchpad de la session.
- **Lu avant :** `.claude/cadre-agents.md`, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` avec ses tableaux,
  `suivi/plan-de-match.md` (PAUSE du 15 octobre), `plan/dangers-inventaire.md` (section 1), `suivi/16-redaction.md`
  (en-têtes et dernière passe).
- **Aucune source nouvelle, aucun chiffre changé, aucune étape renumérotée** (1 à 47). Ce qui touche un fait est
  signalé plus bas.
- **Fins de ligne :** CRLF avant et après (498 lignes, toutes en CRLF), saut de ligne final gardé.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 7 414 | 7 430 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes) |
| « § », mots bannis, tournures, maximes, pronominaux, mises en relief | 0 | 0 |
| Mots vides à juger | 46 | 43 (les « tous les foyers », « encore », « bien éveillé » restants portent le sens) |
| Redites à juger | 2 | 3, jugées : « le rouler d'un bloc sur le côté » (étape 2, pour glisser l'isolant ; étape 7, s'il vomit) ; « et l'heure du prochain message » (étape 3, premier message ; étape 12, chaque heure) ; « le même pour tous les foyers » (étape 19 et section 7, qui y renvoie) |
| Invariants disparus | | rien |
| Ancres introuvables dans `placements-tome-1.json` | 16-07, 16-08 | les mêmes (anciennes ancres encore dans le fichier ; les nouvelles plus bas) |

## Ce qui a changé

| Où | Avant | Après | Règle |
| --- | --- | --- | --- |
| Section 2 | « le voisinage, c'est la rue, à pied » ; « **L'automne, avant les neiges** : la tournée des foyers et l'essai radio » | « …c'est la rue, où on va à pied » ; « : on fait la tournée des foyers et l'essai radio » | Étiquettes |
| Matériel | « vérifie les 74 °C… Ne se fabrique pas. » ; « sort un blessé couché » | « pour vérifier les 74 °C… ; on ne peut pas le fabriquer » ; « pour sortir un blessé couché » | Pronominal sans sujet ; étiquette |
| Étape 2 | « on compte tout ce qui suit à partir d'elle » | « on compte à partir de cette heure les délais des soins qui suivent » | Règle 0 |
| Étape 3 | « le message n'arrive pas et il y a deux blessés » | « le message n'arrive pas » | Conséquence évidente |
| Étape 5 | « Si le SOS ou la balise est parti » ; « le faire marcher, soutenu, sans rien porter, avec quelqu'un à côté de lui » ; « …le trajet le plus long, et plus il commence tôt, plus le blessé sort tôt » | « Si on a déclenché le SOS ou la balise » ; « le faire marcher sans rien porter, avec quelqu'un à côté de lui pour le soutenir » ; « …le trajet le plus long » | Participe ; chute en formule |
| Étape 6 | « avec une tuque, le visage dégagé, et un pare-vapeur autour » | « une tuque sur la tête et le visage dégagé, et entourer le sac d'un pare-vapeur » | Noms sans verbe |
| Étape 8 | « Mettre devant une ou deux personnes » ; « qui retient à la corde » ; « une corde seule… le laisse rattraper la personne qui tire… et lui prendre les jambes » ; « À chaque relève, regarder… plus souvent que le délai de gelure du jour » | « Mettre une ou deux personnes devant » ; « qui retient le traîneau à la corde » ; « avec une corde seule, devant, le traîneau rattrape la personne qui tire dans les pentes et la frappe aux jambes » ; « Changer de porteurs souvent…, et plus souvent que le temps que met la peau à geler ce jour-là : à chaque relève, regarder… » | Ordre naturel ; image ; code à déchiffrer |
| Étapes 9, 10 | « plutôt que le plus court » ; « ce qui accroche renverse le traîneau » ; « **laisser le camp tenu** » ; « Épingler à ses vêtements » | « plutôt que le chemin le plus court » ; « le traîneau y accroche et se renverse » ; « **laisser un adulte au camp** » ; « Épingler aux vêtements du blessé » | Règle 0 ; possessif qui oblige à chercher |
| Étape 11 | « sur un matelas, la tête calée, avec une veste de flottaison attachée sur lui » ; « les bras dehors » | « sur un matelas, lui caler la tête et lui attacher une veste de flottaison » ; « en lui laissant les bras dehors » | Participes en chaîne |
| Étape 12 | « Un message manqué devient un signal seulement si son heure était fixée d'avance » | « Si un message n'arrive pas à l'heure annoncée, les gens qui l'attendent savent qu'il y a un problème ; sans heure fixée, ils ne s'aperçoivent de rien » | Maxime |
| Étape 13 | « Vérifier qu'il répond bien » | « Vérifier que le blessé répond clairement » | Règle 0 |
| Étape 15 | « Quand l'événement dure, la maison de la ville n'a plus de services ni de territoire, et le voisinage utile devient le rang » | « Quand l'événement dure, le voisinage utile devient le rang » | Justification que le lecteur connaît |
| Étapes 16, 18, 19 | « c'est la liste de janvier » ; « un horaire, une fréquence et une heure. Chaque jour en crise ; une fois par semaine » ; « est trois coups, une pause, trois coups, et on recommence » ; « Pour un signal qui se voit de loin : trois feux » | « ce sont ceux sur qui on peut compter en janvier » ; « une fréquence et une heure. Tenir la veille chaque jour en crise, et une fois par semaine » (« horaire » et « heure » disaient la même chose) ; « est de trois coups, une pause, puis trois coups ; on le répète » ; « Pour un signal qu'on voit de loin, faire trois feux » | Étiquettes ; redite |
| Étape 21 | « Convenue en septembre, la règle vaut… ; improvisée en février, elle a l'air… » | « Une règle convenue en septembre vaut… ; la même règle improvisée en février a l'air… » | Participes sans sujet |
| Étape 23 | « **Repérer les foyers qui dépendent du réseau électrique pour vivre** : un concentrateur… » ; « l'autonomie…, écrite sur l'appareil » ; « La moitié, parce que » | « **Repérer les foyers où une personne dépend d'un appareil électrique pour vivre** » (la liste est une liste d'appareils) ; « mesurée (étape 17) et écrite sur l'appareil » (fait signalé 1) ; « On prend la moitié parce que » | Règle 0 ; contradiction entre deux étapes |
| Étape 24 | « **Nommer d'avance la machine, le conducteur et la garde des enfants…** » puis, en fin d'étape, « Nommer en même temps la personne qui garde les enfants » ; « La machine est celle qui part à −35 °C sans discussion » ; « Le conducteur est quelqu'un dont… » | « **Nommer d'avance la machine et le conducteur qui sortiront un blessé, et la personne qui gardera les enfants** (ch. 39, ch. 40) » ; « Choisir la machine qui part à −35 °C à coup sûr » ; « Choisir comme conducteur quelqu'un dont… » | Redite dans l'étape ; consigne au présent |
| Étapes 25, 26 | « **Tenir une réunion d'automne, une fois par année** » ; « Une heure au plus » ; « avec la trousse » | « **Tenir une réunion chaque automne** » ; « La garder à une heure au plus » ; « avec la trousse de premiers soins » | Redite ; fragment |
| Étape 31 | « **Poser la génératrice qu'on prête ou qu'on reçoit dehors** » (« qu'on reçoit dehors ») ; « L'erreur arrive avec le service rendu : » | « **Poser dehors la génératrice qu'on prête ou qu'on reçoit** » ; « On fait souvent l'erreur en rendant service : » | Ambiguïté ; formule |
| Étape 32 | « **Dégager un arbre tombé… : regarder les fils avant l'arbre.** » | « **Avant de dégager un arbre tombé chez un voisin après un verglas, regarder où sont les fils.** » | Formule |
| Étape 33 | « **Ne pas convertir en argent.** Le froid d'un chalet est limité : le quartier qu'on donne au voisin va dans son froid à lui » | « **Donner la viande contre une dette, pas contre de l'argent.** Un chalet ne peut garder au froid qu'une quantité limitée de viande : le quartier qu'on donne à un voisin, il le garde au froid chez lui » | Titre sans objet ; image |
| Étape 36 | « même quand c'est évident » ; « À plusieurs, chacun prend la carabine… pour celle d'un autre » ; « Chaque arme du camp a un propriétaire » | « même quand on la croit vide » ; « Quand on est plusieurs, chacun croit que la carabine… est celle d'un autre » ; « doit avoir un propriétaire » | Règle 0 ; consigne au présent |
| Étape 37 | Deux phrases qui disaient chacune que la scène a l'air de braconnage ; « un mot au rendez-vous fixe… évite le malentendu » | Une phrase : « Pour les voisins, des lumières qui balaient le bois la nuit, une carabine et un chien qui court libre ont l'air de braconnage : le dire au rendez-vous fixe avant de partir. Chercher… sans arme. » | Redite dans l'étape |
| Étape 39 | « **Diviser le travail avant de diviser la viande.** Décider du partage au camp, à froid » ; « changer de quartier d'une année à l'autre » | « **Décider du partage au camp, calmement, devant tout le monde, avant de découper** » (le titre ne disait pas ce que l'étape fait ; « à froid » se lisait comme la température de la viande) ; « alterner les quartiers d'une année à l'autre » | Formule ; ambiguïté |
| Étape 40 | « des quartiers partagés en parts égales ne le partagent pas » ; « la viande maigre seule, sans gras » | « en partageant les quartiers en parts égales, on ne partage pas le gras également » ; « la viande maigre mangée seule » | Chose qui agit ; redite |
| Étape 43 | « La personne qui la reçoit peut alors décider en connaissance de cause. » | coupé | Phrase qui n'apprend rien |
| Section 5 | « Plaque : … Confus ou sans frissons : … » ; « l'autonomie écrite sur l'appareil » ; « Personne ne travaille » ; « Tiède : section 6 » ; « Pas d'heure laissée, pas de départ » ; « même quand c'est évident » | « Plaque blanche : … S'il est confus ou ne frissonne plus : … » ; « l'autonomie mesurée et écrite sur l'appareil » ; « Ne pas travailler » ; « S'il arrive tiède : section 6 » ; « Ne pas partir sans l'avoir laissée » ; « même quand on la croit vide » | Étiquettes ; maxime ; contradiction (fait 1) |
| Section 6 | « La bête prise au printemps emporte aussi le petit qu'elle porte » | « Une femelle tuée au printemps porte son petit : on tue les deux » | Chose qui agit |
| Section 7, en ville | « ce qui manque, c'est de savoir » ; « Une marque convenue… dit trois choses » ; « Effacer la marque… celle de la veille ne dit plus rien de vrai » ; « Un tableau commun… dit le reste » | « mais on ne sait pas quelles maisons ont été visitées » ; « On convient d'une marque…, avec trois sens » ; « On efface la marque… celle de la veille n'est plus vraie » ; « On écrit le reste sur un tableau commun » | Mise en relief ; chose qui parle |
| Section 7, rendez-vous | « une absence déclenche la visite » | « si personne ne vient d'un foyer, on va le voir » | Formule |
| Section 7, téléphone | « Le même haut-parleur sert donc de micro d'un côté et d'écouteur de l'autre » ; « l'oreille dessus » ; « le fil garde presque toute la tension » ; « Ses bornes… : 85 et 86 pour la bobine… ; 30 et 87 pour le contact… » ; « le relais ramène… le clac à un déclic » ; « Son isolant » | « Un haut-parleur sert donc aussi de micro : on parle dans l'un, on écoute dans l'autre » ; « l'oreille collée dessus » ; « presque toute la tension se perd dans le fil » ; « Les bornes du relais sont numérotées… Brancher 85 et 86, les bornes de la bobine, … Brancher 30 et 87, les bornes du contact, … » ; « le relais réduit le courant… et on n'entend plus qu'un déclic » ; « L'isolant de ce cuivre » | Étiquettes ; formule ; possessif |
| Section 7, cloche, miroir, balisage | « Un morceau de métal pendu librement sonne ; posé…, il ne sonne pas » ; « assez loin pour qu'une personne n'y soit plus qu'une tache : l'œil voit l'éclat parce que… » ; « un feu seul peut être un feu de camp, deux feux alignés sont un message » ; « à une condition : faire l'entaille… ; un balisage qu'on voit seulement à l'aller ne guide pas au retour » | « On pend le morceau de métal librement : posé…, il ne sonne pas » ; « assez loin pour qu'on voie l'éclat à une distance où une personne n'est plus qu'un point : l'éclat est plus brillant… » ; « un feu seul peut passer pour un feu de camp, et deux feux alignés montrent qu'on envoie un message » ; « à condition qu'on le voie dans les deux sens : faire les entailles… » | Loi en formule ; image ; chute ; conséquence évidente |
| Section 7, boîte aux lettres, signaux | « Le crayon de plomb écrit… l'écorce de bouleau fait la feuille et un tison éteint fait le crayon » ; « Chaque signal veut dire une seule chose » | « On écrit au crayon de plomb, qui écrit… on écrit sur de l'écorce de bouleau avec un tison éteint » ; « On donne à chaque signal un seul sens » | Chose qui agit |
| Section 7, traîneau | « plus longues qu'un homme couché » | « plus longues qu'une personne couchée » | Mot de tous les jours |
| Section 7, ce qu'on perd | « En ville, marcher ne coûte rien, mais la marque sur la porte ne marche que si tous les foyers suivent la même convention : quand un seul foyer invente la sienne, une maison passe pour visitée sans l'avoir été. » | coupé ici ; la conséquence (« une maison passe pour visitée sans l'avoir été ») passe dans « La convention », qui disait déjà le reste | Redite |
| Section 7, ce qui ne se remplace pas | « Rien de ce qui précède ne passe une colline » ; « Entre le moment où quelqu'un tombe et celui où l'autre foyer l'apprend, il y a le temps jusqu'au prochain rendez-vous fixe » | « Aucun de ces moyens ne passe une colline » ; « Sans radio, l'autre foyer apprend qu'il y a un blessé seulement au prochain rendez-vous fixe » | Phrase qui parle du texte ; règle 0 |
| En plus | « Il partait avec de l'écorce » (le canot) ; « garde sa prise au nombre de huttes » | « On partait avec de l'écorce » ; « limite sa prise selon le nombre de huttes » | Chose qui agit ; règle 0 |

Longueur des notes En plus : 78, 65, 69, 64, 80 mots (aucune au-dessus de 80).

## Ancres de planches

Toutes intactes, début de paragraphe unique (vérifié) :

| Planche | `apres` |
| --- | --- |
| logigramme | « **Toboggan ou traîneau** » (dernier item du Matériel) |
| 16-08 | « 6. **L'emballer avant de partir.** » (celle du rédacteur ; `placements-tome-1.json` a encore « *Deux brancards rigides valent mieux qu'une corde.* ») |
| 16-07 | « Deux haut-parleurs et deux fils font un téléphone qui ne demande aucune source de courant » (celle du rédacteur ; le fichier a encore « **Où se prend le fil.** ») |

## Faits signalés (non tranchés par l'éditeur)

1. **Étapes 17 et 23 se contredisaient.** L'étape 17 demande l'autonomie réelle de la batterie, « mesurée une fois,
   montre en main, et non lue sur la boîte » ; l'étape 23 et la section 5 comptaient sur « l'autonomie écrite sur
   l'appareil ». Le texte dit maintenant « mesurée (étape 17) et écrite sur l'appareil » aux deux endroits, ce qui
   suppose qu'on écrit soi-même sur l'appareil l'autonomie mesurée. À confirmer.
2. **Étape 29, l'épidémie.** « Garder le contact sans entrer chez personne », puis « les petits services, comme garder
   des enfants quelques heures… » : garder les enfants d'un autre foyer pendant une épidémie est un contact rapproché.
   La phrase et sa provenance (ch. 30) sont à revoir ; non touchée.
3. **Signaux de feu.** L'étape 19 donne trois feux en triangle comme signal de détresse ; la section 7 (« Le miroir et
   la fumée ») fait de deux feux alignés un message entre voisins. Les deux ne se contredisent pas, mais un lecteur
   peut les confondre ; à harmoniser si on veut un seul signal de feu.
4. **Renvois vers des chapitres au vieux gabarit.** « ch. 35, section 9 » (étape 3) et « ch. 26, section 9 » (étapes 4
   et 7) sont justes aujourd'hui (les ch. 26 et 35 ont encore neuf sections), mais deviendront « section 7 » quand le
   tome 2 passera au gabarit final. Même chose dans le logigramme 16 (champ `source`).
5. **Logigramme 16** (`images/logigrammes/16-sortir-un-blesse.json`) relu, non touché : la boîte « **Le faire
   marcher**, soutenu, sans rien porter » garde le participe que le chapitre a perdu (« avec quelqu'un à côté de lui
   pour le soutenir »). À reprendre au prochain rendu.
