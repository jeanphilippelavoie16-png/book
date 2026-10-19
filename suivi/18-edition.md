# Édition : Chapitre 18, S'organiser à plusieurs familles

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/18-s-organiser-a-plusieurs.md` après les corrections du rédacteur qui suivent la
  vérification technique (`suivi/18-redaction.md`, « Corrections après la vérification technique, 19 octobre 2026 »),
  du titre à la dernière note « En plus ». Texte d'avant l'édition : celui du commit `22c219c`.
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31),
  `plan/glossaire.md` (chaudière, chaudron, marmite), `suivi/18-redaction.md` (refonte et corrections).
- **Aucune source nouvelle cherchée, aucun chiffre ni aucun fait changé** (JP, 19 octobre 2026 : « fuck les sources,
  on a pas déjà fait ce travail-là ? »). Ce qui touche un fait est signalé plus bas, pas corrigé.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé.
- **Ancres :** le chapitre n'a ni planche ni photo (`placements-tome-1.json`, clé `"18"` vide) ; aucune ancre à rendre.
  Aucune étape renumérotée (1 à 21), aucun intertitre de la section 7 renommé : les renvois des autres chapitres
  tiennent.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 5 503 | 5 610 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes) |
| « § », mots bannis, vocabulaire d'IA, maximes, mises en relief, redites | 0 | 0 |
| Tournures à juger | 0 | 0 (une, apparue en cours d'édition à la section 2, réécrite) |
| Mots vides à juger | 45 | 44 (« exactement » remplacé par « à la lettre » ; les autres portent le sens) |
| Ancres introuvables | 0 | 0 |
| Invariants disparus | | « ch. 10 » une fois : étape 9, « Traiter l'eau à boire selon le ch. 10 : … (ch. 10, étapes 11, 14 et 19) » nommait le chapitre deux fois dans la même phrase ; le renvoi précis reste |

Les tirets du titre et de la ligne de tome sont la forme de tous les chapitres que lit l'assembleur : pas touchés. Les
mots se sont allongés parce que les phrases ont repris leurs verbes et leurs articles (règle 0).

## Deux harmonisations de vocabulaire (règle 6, un seul mot par chose)

- **« ménage » devient « famille »** (15 fois). Le chapitre disait les deux pour la même chose (« Chaque famille arrive
  avec ses appareils » dans l'étape qui parle de « chaque ménage ») ; le titre, la section 2, l'étape 7 et les notes
  « En plus » disent « famille », et c'est le mot de tous les jours (« le ménage », au Québec, c'est d'abord le
  nettoyage). Le ch. 18 était le seul chapitre à employer « ménage » à ce point.
- **« seau » devient « chaudière »** (9 fois : la chaudière d'eau potable, de lavage, d'eaux grises), selon l'arbitrage
  du glossaire (« Garder "chaudière" partout, c'est le mot du lecteur »). Le chapitre disait déjà « chaudières » en
  section 7.
- **« chaudron » devient « marmite »** pour la marmite commune (7 fois). Le chapitre disait « la marmite commune », « la
  règle de la marmite », puis « un chaudron de 20 L », « le gros chaudron du souper », « chacun tasse le chaudron du
  précédent, la marmite passe… » dans la même phrase.

## Les phrases changées, avant et après

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Section 2 | « Il manque au ménage une compétence qu'un autre ménage a » | « Une famille a besoin d'une compétence qu'une autre famille a » | Règle 11, ordre renversé (signalé par le script) ; « au ménage » ne disait pas lequel |
| 2 | Matériel, avertisseur | « le chiffre montre le monoxyde à faible dose, qui donne mal à la tête sans faire sonner. » | « l'écran montre … sans faire sonner l'avertisseur. » | Règle 0 : « sans faire sonner » quoi |
| 3 | Matériel, thermomètre | « s'en sert pour monter le gibier et les restes à 74 °C » | « s'en sert pour vérifier que le gibier et les restes atteignent 74 °C » | Le thermomètre mesure, il ne cuit pas |
| 4 | Étape 1 | « soit 48 L par jour pour douze. » | « … pour douze personnes. » | Règle 0 |
| 5 | Étape 1 | « … ne donnent pas plus d'eau parce qu'on est douze, et la latrine ne grandit pas non plus. » | « … donnent la même quantité d'eau à douze qu'à quatre, et la latrine se remplit plus vite. » | Chute en formule (« ne grandit pas non plus ») : on dit le fait |
| 6 | Étape 2 | « Compter en lisant les tablettes, pas de mémoire » | « Chaque famille doit compter ce qu'elle a en lisant ses tablettes, pas de mémoire » | On sait qui le fait |
| 7 | Étape 3 | « la condition de sortie » (titre, consigne, étape 21) | « ce qui mettra fin au regroupement » ; étape 21 : « la fin du regroupement prévue à l'étape 3 » | Mot de rapport, pas de tous les jours |
| 8 | Étape 3 | « Dire les règles communes avant le départ : la cuisine, l'eau, les mains, les armes » | « … : celles de la cuisine, de l'eau, du lavage des mains et des armes » | Liste de noms à la place d'une phrase |
| 9 | Étape 5 | « Faire entrer chaque arme déchargée, le verrou, la culasse ou le percuteur retiré ou bloqué » | « Décharger chaque arme et retirer ou bloquer sa pièce mobile (le verrou, la culasse ou le percuteur) avant de la faire entrer » | Participes en chaîne ; « pièce mobile » est le mot des sections 5, 6 et 7 |
| 10 | Étape 6 | « Jamais dans un bâtiment, un garage ou un cabanon, ni sous l'appentis… » | « Ne jamais faire tourner une génératrice dans un bâtiment, … » | Phrase sans verbe |
| 11 | Étape 7 | « Le nombre d'avertisseurs change le jour où le groupe arrive » | « Le jour où le groupe arrive, il faut plus d'avertisseurs » | Le fait dit en clair |
| 12 | Étape 8 | « qui décident sans revenir demander » | « qui décident sans avoir à demander aux autres » | Règle 0 : demander à qui |
| 13 | Étape 9 | « Traiter l'eau à boire selon le ch. 10 : … (ch. 10, étapes 11, 14 et 19) » | « Traiter l'eau à boire : … (ch. 10, étapes 11, 14 et 19) » | Le renvoi dit deux fois dans la phrase |
| 14 | Étape 10 | « après la toilette » | « après être allé à la latrine » | « La toilette » peut se lire « se laver » ; au chalet, c'est la latrine |
| 15 | Étape 11 | « Marquer le mètre au sol une fois pour toutes. » | « Tracer une ligne au sol à 1 m du poêle, une fois pour toutes. » | Règle 0 (« le mètre ») |
| 16 | Étape 11 | « Nommer une personne pour les cendres : elle les retire … et les sort dehors » | « Nommer une personne pour les cendres. Elle doit les retirer … et les sortir dehors » | Consigne au présent qui décrit |
| 17 | Étape 14 | « Monter le gibier sauvage … à 74 °C à cœur, en pièce comme haché, la sonde dans la partie la plus épaisse » | « Cuire le gibier sauvage … jusqu'à 74 °C à cœur, en pièce comme haché, en plantant la sonde dans la partie la plus épaisse » | Participe sans verbe ; le geste nommé |
| 18 | Étape 14 | « Réchauffer les restes jusqu'à 74 °C, mesurés. Le 71 °C du bœuf et du porc ne vaut jamais pour le gibier. » | « … mesurés au thermomètre. Les 71 °C qui suffisent pour le bœuf et le porc ne suffisent jamais pour le gibier. » | Code (« le 71 °C du bœuf ») |
| 19 | Étape 15 | « Séparer un chaudron de 20 L en plusieurs plats peu profonds, découverts ou couverts lâchement. » | « Répartir le contenu d'une marmite de 20 L dans plusieurs plats peu profonds, laissés découverts ou couverts sans serrer. » | On ne sépare pas un chaudron ; règle 6 |
| 20 | Étape 15 | « pour descendre le plus vite possible à 4 °C » | « pour que la nourriture descende le plus vite possible à 4 °C » | Qui descend |
| 21 | Étape 15 | « Le chaudron oublié sur le comptoir pendant la nuit, on le jette au matin » | « Le matin, jeter la marmite oubliée sur le comptoir pendant la nuit » | Consigne à l'infinitif dans une étape ; règle 6 |
| 22 | Étape 16 | « Au chalet, il tourne sur la génératrice ou pas du tout. Plein, il garde les aliments gelés 48 heures, à demi plein 24 heures, porte fermée, à partir de l'arrêt » | « Il tourne sur la génératrice, ou pas du tout. Une fois arrêté, un congélateur plein garde les aliments gelés 48 heures, et un congélateur à demi plein 24 heures, si on n'ouvre pas la porte » | Chapitre « Chalet » : « Au chalet » n'apprend rien ; compléments empilés |
| 23 | Étape 16 | « Descendre au froid naturel ce qui doit tenir plus longtemps » | « Mettre dehors au froid ou au caveau ce qui doit tenir plus longtemps » | « Froid naturel » : mot de rapport ; les mots de la section 5 |
| 24 | Étape 17 | « Faire descendre la carcasse à 7 °C » | « Faire descendre la température de la carcasse à 7 °C » | Règle 0 |
| 25 | Étape 17 | « dire à voix haute, pour les gens qui n'ont pas lu le ch. 22, qu'on ne mange ni … : ils accumulent le cadmium. » | « dire à voix haute qu'on ne mange ni … : ils accumulent le cadmium (ch. 22). » | Phrase qui parle du livre ; le renvoi reste |
| 26 | Étape 17 | « Écrire au feutre sur chaque paquet, le jour même, le nom du ménage qui le prend. Un partage qu'on ne peut pas lire sur les paquets, on le rediscute quand le stock baisse. » | « Le jour même, écrire au feutre le nom de la famille sur chaque paquet qu'elle prend. Sans nom sur les paquets, on rediscute le partage quand le stock baisse. » | Règle 11, ordre ; phrase disloquée |
| 27 | Étape 18 | « un deuxième adulte reste à portée de voix » | « un deuxième adulte doit rester à portée de voix » | Consigne au présent qui décrit |
| 28 | Étape 19 | « … à heure fixe** : qui est malade, ce qui manque, qui fait quoi demain, et un coup d'œil à la corde de bois et aux tablettes. Debout et à heure fixe, elle reste courte et elle a lieu tous les soirs. » | « … à heure fixe.** On y dit qui est malade, ce qui manque et qui fait quoi le lendemain, et on jette un coup d'œil à la corde de bois et aux tablettes. On reste debout pour que la réunion reste courte, et on la tient à heure fixe pour qu'elle ait lieu tous les soirs. » | Liste de noms ; la raison dite en clair au lieu d'une formule |
| 29 | Étape 21 | « Décider à partir des chiffres de rester ensemble ou de se séparer. Au rythme mesuré à la réunion » | « Décider, à partir des chiffres, si on reste ensemble ou si on se sépare. Au rythme de consommation mesuré à la réunion du soir » | Ordre ; règle 0 (le rythme de quoi) |
| 30 | Section 5, eau | « soit 48 L pour douze » ; « le nombre de personnes que la source peut fournir » | « soit 48 L pour douze personnes » ; « le nombre de personnes pour qui la source donne assez d'eau » | Une source ne fournit pas des personnes |
| 31 | Section 5, armes | « Toutes les armes entrées, contre le nombre écrit sur le couvercle » | « Le compte des armes donne le nombre écrit sur le couvercle » | Étiquette en raccourci |
| 32 | Section 5, froid | « Sortir les aliments dehors ou au caveau » | « Mettre les aliments dehors ou au caveau » | On ne sort pas au caveau |
| 33 | Section 6, vomissements | Action « Étape 20, pour tous les malades… » | « Faire l'étape 20 pour tous les malades… » | Action sans verbe |
| 34 | Section 6, louche | « Le chemin des selles à la bouche est rouvert » | « Les microbes des selles peuvent passer dans l'eau qu'on boit » | Image (« le chemin … rouvert ») |
| 35 | Section 6, retrait | « un enfant régresse : pipi au lit, colères, cauchemars » ; « Chez l'adulte, le retrait vient avant qu'il cesse de suivre une règle commune » ; « Pour l'enfant : une routine qu'il voit, une place à lui, les mêmes heures qu'avant » | « un enfant recommence à faire pipi au lit, fait des colères ou des cauchemars » ; « L'adulte s'isole avant de cesser de suivre les règles communes » ; « Pour l'enfant : lui donner une routine qu'il voit et une place à lui, et garder les mêmes heures qu'avant » | Mots de métier (« régresse », « le retrait ») ; noms sans verbe |
| 36 | Section 7, cuire dehors | « on ne brûle rien à l'intérieur sauf le poêle » ; « on plante deux fourches » ; « Une personne nommée aère le chalet » | « on ne fait du feu à l'intérieur que dans le poêle » ; « deux branches fourchues » ; « Une personne nommée doit aérer le chalet » | On ne brûle pas le poêle ; « fourche » se lit outil ; consigne au présent qui décrit |
| 37 | Section 7, bouilli | « On passe tout ce qui est douteux en bouilli … dans un liquide qui bout, et qui recommence à bouillir franchement après le dernier morceau ajouté » ; « Le rôti, le grillé et le saisi sortent du menu, parce que… » ; « Sans sonde » ; « le hachage mêle à toute la masse les microbes de la surface » | Deux phrases, le geste d'abord (« Après le dernier morceau ajouté, on attend que le liquide recommence à bouillir franchement ») ; « On ne fait plus de rôti, de grillé ni de saisi : … » ; « Sans thermomètre » ; « le hachage mêle les microbes de la surface à toute la viande » | Une phrase, une information ; le geste au lieu de « sortent du menu » ; règle 11, ordre ; règle 6 (thermomètre) |
| 38 | Section 7, un seul repas | « Sans froid sûr et sans sonde, on ne peut plus vérifier la suite « cuire, refroidir, garder, réchauffer ». On la supprime » ; « Ça brûle plus de bois et ça prend plus de temps, mais on n'a plus besoin de mesurer les restes. » | « Sans endroit froid sûr et sans thermomètre, on ne peut plus vérifier que les restes ont été refroidis, gardés et réchauffés comme il faut. On ne fait donc plus de restes » ; dernière phrase coupée | Étiquette entre guillemets ; **redite** : le bois et le temps sont dans « Ce qu'on perd », « Les restes » |
| 39 | Section 7, refroidir | « un chaudron plein » ; « on cuit pour un seul repas (« Cuire pour un seul repas ») » | « une marmite pleine » ; « on cuit pour un seul repas. » | Règle 6 ; le renvoi redisait la phrase |
| 40 | Section 7, caisse | « On garde le froid dans une caisse » | « On garde les aliments au froid dans une caisse … posée au nord du bâtiment » | Règle 0 |
| 41 | Section 7, eau pour douze | « Deux personnes avec des chaudières et un traîneau rapportent en un voyage… » | « On envoie deux personnes avec des chaudières et un traîneau : elles rapportent en un voyage… » | Consigne, pas constat |
| 42 | Section 7, humidité | « Douze personnes qui respirent, des mitaines …, un chaudron de neige qui fond sans arrêt : toute cette eau passe dans l'air et se condense sur la première surface froide, les têtes de clous, les têtes de vis… À douze, on voit… » ; « hors du mètre autour du poêle » | « Douze personnes qui respirent, les mitaines et les bas qui sèchent et une marmite de neige qui fond sans arrêt mettent beaucoup d'eau dans l'air. Cette eau se condense sur la première surface froide : … On voit alors… » ; « à plus de 1 m du poêle » | Liste de noms en tête de phrase ; « À douze » redit ; règle 0 |
| 43 | Section 7, une seule pièce | « on laisse un jeu au bas de la cloison » | « on laisse un espace au bas de la cloison » | Mot de métier |
| 44 | Section 7, dessus du poêle | « Un seul poêle pour douze personnes : le dessus est bouillant… » ; « pendant que le feu est jeune » ; « chacun tasse le chaudron du précédent, la marmite passe… » | « Avec un seul poêle pour douze personnes, il faut partager le dessus, qui est bouillant… » ; « pendant que le feu est vif » ; « chacun tasse la marmite du précédent : elle passe… » | Phrase sans verbe ; image ; règle 6 |
| 45 | Section 7, relève | « on mesure un quart de garde au bois : une recharge complète du poêle, c'est un quart. La personne qui recharge réveille la suivante et se couche » | « on mesure les quarts de garde avec le poêle : un quart dure le temps d'une recharge complète. La personne de garde qui recharge le poêle doit réveiller la suivante, puis aller se coucher » | Code (« au bois ») ; consigne au présent qui décrit |
| 46 | Section 7, latrine | « on casse le cône au bâton, et à douze, il monte vite. On creuse le trou suivant d'avance, tant que le sol n'est pas gelé, sans attendre que le premier déborde » | « ; à douze, le cône monte vite. On casse le cône au bâton. On creuse le trou suivant d'avance, tant que le sol n'est pas gelé » | Ordre ; « sans attendre que le premier déborde » redit « d'avance » |
| 47 | Section 7, eau de cendre | « Sans rien du tout : eau chaude, brosse, ongles courts et 20 secondes de frottement. » | « Sans rien du tout, on se lave les mains à l'eau chaude et à la brosse, les ongles courts, en frottant 20 secondes. » | Liste de noms à la place d'une action |
| 48 | Section 7, armes | « on retire de chaque arme sa pièce mobile, et une seule personne garde ces pièces … Cette façon ne dépend d'aucun cadenas. » | « on retire la pièce mobile de chaque arme, et une seule personne doit garder ces pièces … » | Règle 11, ordre ; consigne ; la dernière phrase redisait le titre (« sans contenant fermé ») |
| 49 | Ce qu'on perd, la mesure | « Sans sonde, aucune garantie sur le gibier ; sans thermomètre, aucune garantie sur le froid. » | « Sans thermomètre à sonde, on ne peut pas être sûr que le gibier est cuit à cœur ; sans thermomètre dans la caisse, on ne peut pas être sûr que les aliments restent froids. » | Phrase sans verbe ; règle 6 |
| 50 | Ce qu'on perd, la variété | « tant que le ch. 78 n'est pas suivi à la lettre. Un menu qui rétrécit pendant des semaines devient un problème de nutrition » | « qui n'ont pas été faites en suivant le ch. 78 à la lettre. Manger les mêmes quelques aliments pendant des semaines devient un problème de nutrition » | Image (« un menu qui rétrécit ») |
| 51 | Ce qu'on perd, les mains | « … usent la peau, et à douze dans une pièce, une peau fendue s'infecte plus facilement. » | « … usent la peau (« L'eau de cendre à la place du savon »). » | **Redite** : l'infection des mains crevassées à douze est dite dans « L'eau de cendre à la place du savon », où elle décide du geste |

Gardé après examen : « On règle les quatre questions qui suivent » (l'annonce porte la consigne : régler ces questions
avant le départ, à distance) ; « Sans date pour faire le point, le regroupement finit en chicane au lieu de finir par une
décision » (un fait, pas une opposition fabriquée) ; « Ça règle du même coup le feu, la garde et la chicane sur qui a
veillé le plus longtemps » (trois effets du geste) ; « cendre franche » (sens à confirmer, voir plus bas) ; les
« tout, toute, tous » qui veulent dire « tout » ; « Ce qui ne se remplace pas » (titre commun à 32 chapitres) ; les
quatre notes « En plus » (30 à 80 mots, étape dite, rien à reprendre).

## Faits signalés (pas corrigés : ils touchent un fait)

1. **Contradiction, section 7.** « L'ordre sur le dessus du poêle » met « les mitaines et les bottes en dernier, sur la
   partie tiède » du dessus du poêle ; « L'humidité de douze personnes » ({!incendie}, posé après la vérification
   technique) dit de faire sécher le linge « jamais sur le poêle : un bas oublié sur une tôle chaude peut mettre le feu
   au chalet ». L'un des deux doit changer (les mitaines et les bottes au-dessus du poêle, sur un support à plus de 1 m,
   ou une exception dite pour la partie tiède), selon ce que dit la page `incendie`.
2. **Renvoi sans contenu, étape 1.** « Mesurer le débit de la source avant d'inviter (ch. 10) » : le ch. 10 ne dit pas
   comment mesurer le débit d'une source ou d'un puits (« débit » n'y paraît que pour le filtre à sable). Le renvoi était
   déjà là avant la refonte. Soit le ch. 10 reçoit le geste (une chaudière de volume connu et un chronomètre), soit le
   renvoi sort.
3. **Le moment du compte des armes.** Étape 5 : « Refaire le compte à voix haute au départ, pour voir si une arme est
   restée dans le camion, ou si elle est rentrée le soir sans qu'on le dise » ; section 5 : « À l'arrivée, puis chaque
   jour tant qu'il y a des enfants ». « Au départ » (le départ du groupe ? d'un chasseur ?) ne colle ni avec la section 5
   ni avec « rentrée le soir ». À trancher par le rédacteur : arrivée, chaque soir, départ.
4. **« Avec la liste », étape 16.** Le titre ne dit pas de quelle liste il s'agit (ce que contient le congélateur, ou ce
   qu'on en sort ce jour-là). Les deux lectures servent à n'ouvrir qu'une fois ; je n'ai pas choisi.
5. **Une semaine ou deux, étape 20.** « Garder les règles … jusqu'à deux semaines après la fin des signes du dernier
   malade : le groupe est encore contagieux pendant la semaine où tout le monde va mieux ». La raison parle d'une
   semaine, la règle de deux. À aligner sur `sources/23-quebec-gastro-enterite.md`.
6. **« Cendre franche », section 7.** Le mot n'est pas de tous les jours ; s'il veut dire « de la cendre de bois seul,
   sans déchets brûlés », il faut l'écrire ainsi, et c'est un fait (ce qu'on ne doit pas avoir brûlé avec le bois).
7. **Section 5, ligne de la créosote.** La colonne « Moment » (« Selon la quantité de bois brûlé ») redit la cible
   (« plus souvent selon la qualité et la quantité du bois brûlé »), et la colonne « Si c'est hors cible » porte une
   explication (« À douze, on brûle plus de bois… »). Forme du tableau à revoir par le rédacteur ; aucun chiffre en cause.
