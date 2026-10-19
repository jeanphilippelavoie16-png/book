# Édition : Chapitre 2, Rester ou partir

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/02-rester-ou-partir.md` au gabarit final, après les corrections du rédacteur qui suivent
  la vérification technique (`suivi/02-redaction.md`, « Corrections après la vérification technique, 19 octobre 2026 »
  et « Repassé le 19 octobre 2026 »), du titre à la dernière note « En plus ». Texte d'avant l'édition : commit
  `dde3673`.
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31), `suivi/02-redaction.md` (refonte et
  corrections du 19 octobre), le logigramme `images/logigrammes/02-rester-ou-partir.json`, boîte par boîte.
- **Aucune source nouvelle cherchée, aucun chiffre ni aucun fait changé.** Ce qui touche un fait est signalé plus bas.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé.
- **Ancres :** l'ancre du logigramme rendue par le rédacteur, « **Fiche de décision remplie d'avance** » (dernier item
  du Matériel), est intacte, au début d'un seul paragraphe. La ligne a changé après son début (no 7), pas son début.
  L'ancienne ancre de `placements-tome-1.json` (« Décider en moins d'une heure ») est aussi encore le début de la
  section 1. Aucune étape renumérotée (1 à 45) : les renvois des ch. 3, 7, 11, 14, 40 et 84 ne bougent pas.
- **Logigramme :** pas touché (hors du fichier relu, et un changement demande de refaire les quatre rendus) ; une
  boîte est signalée plus bas.
- **Largeur des lignes :** les paragraphes touchés sont remis à la largeur du fichier, sans changer un mot ; les lignes
  du Matériel restent d'une ligne par item.

## controle.py, avant et après

| | Avant (`dde3673`) | Après |
| --- | --- | --- |
| Mots | 6 524 | 6 568 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes) |
| « § », mots bannis, vocabulaire d'IA, maximes | 0 | 0 |
| Tournures, mises en relief | 0 | 0 (trois avis nés de l'édition, réglés : nos 20, 50 et 52) |
| Mots vides à juger | 38 | 37 |
| Redites à juger | 5 | 5 : « une batterie qu'on vide gèle plus » réglée (no 44) ; nouvelle, « fermer les portes et les fenêtres » (étape 22, quand on part ; étape 38, sous la fumée : deux gestes, le même mot pour la même chose) ; les trois autres déjà jugées par le rédacteur |
| Ancres introuvables | 0 | 0 |
| Invariants disparus | | rien |

## Les phrases changées, avant et après

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Section 1 | « Décider en moins d'une heure, sur quatre mesures écrites (…), s'il faut rester ou partir » | « Décider en moins d'une heure s'il faut rester ou partir, à partir de quatre mesures écrites (…) » | Règle 11 : rien entre le verbe et son objet. Le début du paragraphe ne change pas |
| 2 | Matériel, avertisseur | « …du monoxyde (étape 11). On ne peut pas le fabriquer. » | « …du monoxyde (étape 11). » | Redite de la section 7, « Ce qui ne se remplace pas », point 1 |
| 3 | Matériel, radio | « donne l'état de la route, du feu et de la panne, qu'on ne voit pas de la fenêtre » | « elle donne l'état de la route, du feu et de la panne » | Redite de l'étape 25 ; un sujet |
| 4 | Matériel, messagerie | « dit qu'on reste ou qu'on part, et où chercher » | « pour dire qu'on reste ou qu'on part, et où nous chercher » | Chose qui parle ; qui cherche qui |
| 5 | Matériel, thermomètre d'intérieur | « deux relevés à 2 h d'écart disent à quelle vitesse la maison refroidit » | « deux relevés à 2 h d'écart donnent la vitesse à laquelle la maison refroidit » | Chose qui parle |
| 6 | Matériel, thermomètre médical | « montre l'hypothermie » | « il montre l'hypothermie » | Un sujet |
| 7 | Matériel, fiche (ligne ancrée, début intact) | « les jours de bois… Une copie à la maison, une au chalet, une dans l'auto. » | « le nombre de jours de bois… En garder une copie à la maison, une au chalet et une dans l'auto. » | Noms sans verbe |
| 8 | Série du CO, chapeau | « Quatre bips rapides, une pause, et ça recommence » | « L'alarme fait quatre bips rapides, une pause, et ça recommence » | Phrase sans verbe |
| 9 | Étape 1 | « Réveiller les gens qui dorment et prendre les enfants ; les animaux suivent. » ; « Prendre au passage les bottes… » | « Réveiller les gens qui dorment, prendre les enfants et faire sortir les animaux. » ; « En passant, prendre les bottes… » | Consigne au présent qui décrit ; règle 11 |
| 10 | Étape 3 | « dégager l'échappement de nouveau… bouche de nouveau le tuyau » | « dégager l'échappement… rebouche le tuyau » | « de nouveau » deux fois |
| 11 | Étape 4 | « Une personne qui se réveille mal, qui est confuse ou qui perd connaissance : sa vie est en jeu. » ; « Si elle ne respire plus normalement : ch. 26, étape 11. » | « Si une personne se réveille mal, est confuse ou perd connaissance, sa vie est en jeu. » ; « …, faire comme au ch. 26, étape 11. » | Étiquette en raccourci ; la forme du ch. 3, étape 13 |
| 12 | Note 1 | « un groupe de deux à cinq bips à la même cadence, la fin de vie de l'appareil » | « … annonce la fin de vie de l'appareil » | Phrase sans verbe |
| 13 | Étape 6 | « et une fois sorti dehors, il se tait sans rien prouver » | « ; si on le sort dehors, il se tait, et ça ne prouve rien sur l'air de la maison » | « sorti dehors » ; la chute dite en clair |
| 14 | Étape 14 | « …et peut venir voir ; sans heure fixée, un silence n'alerte personne. » | « …et peut venir voir. » | Conséquence évidente de la phrase d'avant, en formule |
| 15 | Série « On part », chapeau | « l'essentiel est fait » | « le plus important est fait » | Vocabulaire d'IA |
| 16 | Étape 18 | « : le nombre de personnes à bord, l'heure de départ… » | « : leur dire combien on est à bord, l'heure de départ… » | Noms sans verbe |
| 17 | Étape 20 | « Jamais d'antigel à moteur » | « Ne jamais mettre d'antigel à moteur » | Phrase sans verbe |
| 18 | Étape 21 | « Décider du congélateur » | « Décider quoi faire du congélateur » | Règle 0 |
| 19 | Étape 22 | « le bois retarde l'allumage seulement avec l'eau qu'il a eu le temps d'absorber avant le passage du front » | « le bois mouillé prend feu moins vite seulement s'il a eu le temps d'absorber l'eau avant que le front du feu arrive » | Règle 0 : le sujet fait une action de manuel |
| 20 | Étape 23 | « : sur la porte principale, une feuille sous plastique écrite au marqueur, avec PARTIS… Un tissu blanc à la porte dit la même chose » | « : coller sur la porte principale une feuille sous plastique, écrite au marqueur : PARTIS… Un tissu blanc attaché à la porte a le même sens » | Noms sans verbe ; chose qui parle |
| 21 | Étape 24 | « Partir le réservoir plein » | « Partir avec le réservoir plein » | Règle 0 |
| 22 | Étape 25 | « Elle donne ce qu'on ne voit pas… Au chalet, une radio qui ne dit rien de la région ne prouve pas que tout va bien » | « On y apprend ce qu'on ne voit pas… Au chalet, si la radio ne dit rien de la région, ça ne prouve pas que tout va bien » | La condition avant le fait ; tournure en maxime |
| 23 | Étape 27 | « L'écart donne la pente, en degrés par heure » | « L'écart entre les deux relevés, ramené à une heure, donne la pente en degrés par heure » | Deux relevés à 2 h d'écart ne donnent pas des degrés par heure sans être ramenés à une heure (signalé, point 4) |
| 24 | Étape 27, puces | « Dans des maisons sans chauffage mesurées » ; « rendent leur chaleur » ; « À la maison chauffée à l'électricité » ; « Aucune température reconnue ne dit quand quitter une maison » | « Dans des maisons sans chauffage, mesurées » ; « rendaient leur chaleur » (le temps de la phrase) ; « Dans une maison chauffée à l'électricité » ; « Il n'existe aucune température reconnue à partir de laquelle on doit quitter une maison » | Ponctuation ; temps ; chose qui parle |
| 25 | Étape 28, gras | « compter les litres qu'on a sans sortir, l'accès à la source et de quoi désinfecter » ; « La réserve de la trousse d'urgence compte 4 L » | « compter les litres qu'on a dans la maison, et vérifier qu'on a accès à une source et de quoi désinfecter l'eau » ; « … est de 4 L » | On ne « compte » pas un accès ; « compte » pris dans deux sens |
| 26 | Étape 28 | « un bris du réseau » | « un bris de l'aqueduc » | Un seul mot par chose : « réseau » nomme aussi le courant (étape 39) et le cellulaire (section 7) |
| 27 | Étape 29 | « Le congélateur plein d'orignal est donc une horloge de 48 heures, pas une réserve. » | « Le congélateur plein d'orignal ne compte donc que pour 48 heures. » | Opposition en chute |
| 28 | Étape 30 | « Trois non font du lien l'horloge la plus courte » | « Si la réponse est non aux deux premières et qu'on ne connaît pas la troisième, le lien est l'horloge la plus courte » | La troisième question ne se répond pas par oui ou non |
| 29 | Étape 31, puces | « Plus de 72 h » ; « Moins de 72 h » ; « Moins que la durée du trajet… Plus tard, l'horloge finit avant qu'on arrive. » | « Elle dure plus de 72 h » ; « Elle dure moins de 72 h » ; « Elle dure moins que le trajet… Si on attend, l'horloge finira avant qu'on arrive. » | Étiquettes en raccourci |
| 30 | Étape 32 | « Rester à la maison, c'est compter sur une réparation rapide du réseau : ça tient tant que l'événement est court et que le délai est connu. Dans ce cas, rester… où on a les voisins » | « Quand l'événement est court et que le délai de réparation est connu, rester… où il y a les voisins » | La condition avant le geste ; « réseau » |
| 31 | Étape 32 | « Trois signes disent » ; « c'est une prévision, et deux reports veulent dire qu'on ne connaît plus le délai, bien avant que la maison devienne inhabitable » | « Trois signes montrent » ; « on ne connaît plus le délai, même si la maison est encore habitable » | Chose qui parle ; la même idée en une phrase |
| 32 | Étape 33 | « Pendant le trajet, la famille n'a l'abri ni de la maison ni du chalet : chiffrer le trajet avant de le comparer au prix de rester. » | *(coupée)* | Justification que le lecteur connaît ; le chiffrage est l'étape 35 |
| 33 | Étape 34 | « compté à partir du moment où les mitaines sortent » | « à partir du moment où on enlève ses mitaines » | Règle 0 |
| 34 | Étape 37 | « un chalet dans une forêt serrée d'épinettes noires ne se défend pas » | « on ne peut pas défendre un chalet dans une forêt serrée d'épinettes noires » | Chose qui se défend |
| 35 | Étape 38 | « rester dedans, les portes et les fenêtres fermées, l'air recirculé ou filtré » ; « Un chalet chauffé au bois tire son air de combustion… on ne peut pas le fermer » | « rester à l'intérieur, fermer les portes et les fenêtres, et faire recirculer ou filtrer l'air » ; « Le poêle à bois tire son air de combustion… on ne peut pas fermer le chalet » | Participes en chaîne ; c'est le poêle qui tire l'air |
| 36 | Étape 39 | « Pendant une panne longue du réseau… Le bâtiment est debout, le bois cordé, le congélateur plein, mais l'autonomie baisse chaque jour sans que rien force la décision. » | « Pendant une longue panne de courant… Même quand le bâtiment tient, que le bois est cordé et que le congélateur est plein, les réserves baissent chaque jour sans qu'aucun événement oblige à décider. » | Petite scène en participes ; « réseau » |
| 37 | Étape 40 | « Compter les passagers pour vrai » ; « elle ne fait plus de trajet… et elle ne participe plus à la décision » | « Compter ce que chaque passager peut faire » ; « elle ne doit plus faire de trajet… ni participer à la décision » | Règle 0 ; consigne au présent qui décrit |
| 38 | Étape 42 | « Les deux adultes mesurent, un seul décide, et la décision tient jusqu'à… » | « Prendre les mesures à deux adultes, puis laisser un seul décider, et garder la décision jusqu'à… » | Maxime ; consigne à l'infinitif |
| 39 | Étape 43 | « Reprendre la décision deux fois par jour l'hiver » | « L'hiver, reprendre la décision deux fois par jour » | La condition avant le geste |
| 40 | Points de contrôle, température | « ou pente qui y mène avant la fin de la nuit : regrouper…, trancher » | « ou en voie d'y arriver avant la fin de la nuit : regrouper… et trancher » | Télégraphe |
| 41 | Signes d'échec, deux rangées | « Abri chauffé tout de suite » ; « On emporte des biens, plus des personnes » | « L'amener tout de suite dans un abri chauffé » ; « On charge des biens au lieu de faire partir les gens » | Phrase sans verbe ; « plus des personnes » se lit dans les deux sens |
| 42 | Section 7, chapeau | « sans réseau » | « sans réseau cellulaire » | Un seul mot par chose (no 26) |
| 43 | Section 7, mesurer | « poser un verre d'eau au plancher » ; « L'air chaud monte : mesurer au plancher, plus froid qu'à hauteur d'adulte » ; « au lever, … ce qui laisse le trajet dans la clarté » | « sur le plancher » ; « Mesurer au plancher : l'air chaud monte, et le plancher est plus froid qu'à hauteur d'adulte » ; « au lever du soleil, … : il reste alors assez de clarté pour le trajet » | Le geste d'abord ; règle 0 |
| 44 | Section 7, sans radio | « (une batterie qu'on vide gèle plus facilement : « Faire démarrer l'auto », plus bas) » | « (« Faire démarrer l'auto », plus bas) » | Redite : le fait est dans « Faire démarrer l'auto », avec ses chiffres ; il reste un renvoi court |
| 45 | Section 7, route | « Le compter au tiers : un tiers du carburant et de la clarté pour l'aller… » ; « et on ne revient pas dans ses propres traces » | « Partager le carburant et la clarté en trois : un tiers pour l'aller… » ; « et on ne peut plus suivre ses propres traces au retour » | Règle 0 |
| 46 | Section 7, proches | « écrire en plus, sur la feuille de la porte (étape 23), la destination… La faire en double » | « écrire aussi la destination… sur la feuille de la porte (étape 23). Faire deux feuilles » | Règle 11 |
| 47 | Section 7, se faire voir | « Tracer aussi une forme au pied dans la neige ouverte » | « Tracer aussi un signe en piétinant la neige, dans un endroit dégagé » | Règle 0 |
| 48 | Section 7, sans eau | « fondre de la neige coûte du bois » | « faire fondre de la neige coûte du bois » | Le verbe juste |
| 49 | Section 7, congélateur | « couverte et lestée contre les bêtes. L'hiver, le froid du dehors ne coûte rien et ne tombe pas en panne (ch. 73). Deux choses gâchent la caisse » ; « Un congélateur vidé en une journée de cuisson donne des repas froids » | « et mettre un poids sur le couvercle contre les bêtes (ch. 73). Deux choses font perdre ce qu'il y a dans la caisse » ; « En vidant le congélateur en une journée de cuisson, on a des repas froids » | Participes ; chute en formule ; chose sujet |
| 50 | Section 7, démarrer l'auto | « Décrocher la batterie… suffit souvent » ; « faire pousser l'auto, la deuxième engagée et le contact mis » ; « garder le plein » ; « celui à 70 % contient 30 % d'eau, ce qu'on veut sortir » | « Souvent, il suffit de décrocher la batterie… » ; « mettre le contact, engager la deuxième, faire pousser l'auto » ; « garder le réservoir plein » ; « …30 % d'eau, et il en ajouterait au réservoir » | Les gestes dans l'ordre ; tournure (première correction en « c'est l'eau qu'on… », reprise : mise en relief) |
| 51 | Section 7, conduite | « réchauffer la conduite sans approcher de flamme : il faut savoir où elle passe » | « réchauffer la conduite d'essence sans approcher de flamme ; il faut d'abord savoir où elle passe » | On nomme la chose |
| 52 | Section 7, cric | « glisser dessous une planche courte et large, gardée dans le coffre » | « glisser une planche courte et large sous le cric, et en garder une dans le coffre » | Règle 11 |
| 53 | Section 7, trajet avec rien | « Partir tant qu'il reste, en clarté, le double… La moitié de ce temps paie l'imprévu » ; « Garder dégagés le toit et le capot… et l'échappement » ; « un tissu de couleur à l'antenne, des branches…, le toit nettoyé » | « Partir seulement s'il reste, avant la noirceur, au moins deux fois… La moitié de ce temps sert aux imprévus » ; « Garder le toit et le capot dégagés…, et dégager l'échappement » ; « attacher un tissu de couleur à l'antenne, et poser des branches… » | Image ; règle 11 ; noms sans verbe ; « le toit » redit la puce d'avant |
| 54 | Section 7, ce qu'on perd | « **La révision.** … la décision de 8 h tient encore à 20 h » | « **La révision de la décision.** … on garde à 20 h la décision de 8 h » | Chose qui « tient » ; on nomme la chose |
| 55 | Section 7, ce qui ne se remplace pas | « C'est la raison de choisir la ville quand tout le reste pousse vers le chalet » ; « On n'improvise pas un aller… Le mesurer avant : un dimanche d'été… et l'écrire sur la fiche » | « Ces cas sont une raison de choisir la ville, même quand… » ; « On ne peut pas improviser un trajet… : le faire d'avance, un dimanche d'été puis une fois en janvier, et noter sa durée sur la fiche » | Maxime ; règle 0 |
| 56 | En plus, trois feux | « Le signal de détresse reconnu par les équipes de recherche, au feu, ce sont trois feux en triangle » | « Les équipes de recherche reconnaissent trois feux en triangle comme un signal de détresse » | Règle 0 |

Tout le reste a été lu phrase par phrase et gardé, dont les deux notes de bas de page (sauf le no 12) et trois notes
« En plus ».

## Faits signalés (non touchés)

1. **La pastille `[À VÉRIFIER]`** de la seconde série du CO (« Tout le monde est dehors », étapes 5 à 8) reste ouverte :
   question à JP (`suivi/02-redaction.md`).
2. **L'antigel des siphons et de la toilette.** Étape 20 : 0,5 L dans chaque évier, lavabo, baignoire, douche ; 0,5 L
   dans le réservoir et 1 L dans la cuvette. Le ch. 3, étape 24 : « autant d'antigel qu'il y a d'eau dans le siphon »,
   et « 0,5 à 1 L dans la cuvette et dans le réservoir ». Même écart que celui que le rédacteur du ch. 3 a signalé
   pour le ch. 84.
3. **Jeter après combien de temps au-dessus de 4 °C.** Étape 29 : « plus de 2 heures au-dessus de 4 °C » ; le ch. 1,
   étape 20 : « Jeter un aliment périssable qui a dépassé 4 °C ». Une des deux est à aligner.
4. **Étape 27, la pente.** Le texte disait que l'écart de deux relevés pris à 2 h d'intervalle « donne la pente, en
   degrés par heure ». J'ai écrit « ramené à une heure », sans ajouter de chiffre ; l'exemple qui suit (4 °C et 1 °C à
   l'heure) ne change pas. À confirmer que c'est le sens voulu.
5. **Les quatre horloges.** Étape 26 : « la chaleur, l'eau, la nourriture et le lien (ch. 1) » ; le ch. 1 les nomme
   « le corps, l'eau, le stock périssable, les calories et le combustible ».
6. **La chaufferette d'appoint.** Étape 10 interdit toute chaufferette d'appoint qui brûle un carburant ; le ch. 1,
   étape 7, garde un appareil d'appoint dans la pièce, aérée.
7. **Logigramme, nœud 7** : « Allumer la radio : elle dit ce qu'on ne voit pas de la fenêtre » (chose qui parle ; le
   chapitre dit maintenant « On y apprend ce qu'on ne voit pas de la fenêtre »). Le nœud 21 dit « garder des vêtements
   de rechange pour chacun à portée de main » quand l'étape 16 dit « dans un sac à part ». Pas touché : à reprendre au
   prochain rendu du logigramme.
8. **Étape 39** : « panne longue du réseau » devient « longue panne de courant » ; le congélateur plein de la même
   phrase montre que c'est le courant. À revoir si le rédacteur pensait aussi à l'aqueduc.

## Liste de contrôle (cadre des agents, partie « Le texte »)

- [x] Sept sections, plus « En plus » ; pas de « Comment ça marche », pas de section Danger ; renvois « section N » justes.
- [x] Sous le titre, la ligne de lieu seule (`**Les deux**`).
- [x] Section 2 : seulement quand l'utiliser (non touchée).
- [x] L'année et la nuit : l'hiver marqué là où il change le geste (no 39) ; le reste non touché.
- [x] Séries orange : déclencheurs et pastilles non touchés ; la pastille `[À VÉRIFIER]` signalée (point 1).
- [x] Le logigramme vient après le Matériel (ancre intacte) ; ses boîtes relues, deux points signalés (point 7).
- [x] Encadrés « En plus » : quatre notes, sans planche ; une phrase reprise (no 56).
- [x] Règle 0 : chaque phrase lue à voix haute ; 56 corrections, environ 85 phrases.
- [x] Pas de loi en formule, de « d'où », de « X passe là où Y » ; maximes et chutes reprises (nos 14, 22, 27, 38, 49, 55).
- [x] Pas de chose qui pense, parle ou se défend (nos 4, 5, 20, 31, 34, 54).
- [x] Consigne jamais au pronominal ; les « se » qui restent sont des choses qui le font seules.
- [x] Pas de « ceux qui » ; ordre naturel (nos 1, 9, 46, 52) ; consigne dite comme une consigne (nos 9, 37, 38).
- [x] On nomme la chose (nos 51, 54).
- [x] Mots de tous les jours ; un seul mot par chose (« réseau » : nos 26, 30, 36, 42).
- [x] Aucun tiret dans le texte ni dans les titres (les deux du titre et de la ligne de tome sont la forme de l'assembleur).
- [x] Titres de sous-sections : noms de gestes ou de choses (non touchés).
- [x] Répétition : redites retirées (nos 2, 3, 14, 32, 44, 53).
- [x] Planches : aucune ; l'ancre du logigramme est un début de paragraphe unique.
- [x] `controle.py` : 0 tiret dans le texte, 0 « § », 0 mot banni ; chaque avis jugé ; invariants : rien n'a disparu.
- [x] Aucun chiffre nouveau, aucune source cherchée ; rien commité.
