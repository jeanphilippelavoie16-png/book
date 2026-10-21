# Édition : Chapitre 13, Feu sans allumettes

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/13-feu-sans-allumettes.md` au gabarit final, après la refonte du 19 octobre et les
  corrections qui ont suivi les deux vérifications techniques (`suivi/13-redaction.md`, « Refonte au gabarit final »,
  « Corrections après la vérification technique », « Deuxième vérification technique »). Copie du texte d'avant
  l'édition : `scratchpad/edition-11-13-14-avant/13-feu-sans-allumettes.md`. Tout le chapitre relu, phrase par phrase, à
  voix haute, du titre à la dernière note « En plus ».
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31, dont les
  points 20 et 22 sur ce chapitre), `plan/glossaire.md`, `suivi/13-redaction.md`, le logigramme
  `images/logigrammes/13-feu-sans-allumettes.json`, la légende de la planche 13-40 (`images/planches-src/13-40.js`,
  repère 9), le ch. 12 pour les mots du poêle (« l'air » et « la clé »).
- **Aucune source nouvelle cherchée, aucun chiffre ni aucun fait changé** (JP, 19 octobre 2026). Ce qui touche un fait
  est signalé plus bas.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé.
- **Ancres :** aucune touchée. Les neuf débuts de paragraphe rendus par le rédacteur sont intacts, chacun une seule fois :
  le logigramme « **Eau, sable ou terre** » (dernier item du Matériel ; seule la fin de la ligne change), 13-40 « 10.
  **Trier le bois en quatre tas, au complet, avant la première étincelle** », 13-10 « 18. **Préparer la laine
  d'acier.** », 13-07 « 25. **Charger la boîte** (planche 13-07). », 13-08 « **La boîte à braise, pour se déplacer**
  (planche 13-08). », la photo « On ramasse ce qui reçoit l'étincelle toute l'année », 13-09 « Il faut de l'acier au
  carbone et un caillou de grève (planche 13-09). », 13-11 « **Une lentille de glace.** Prendre de la glace de lac
  claire, sans bulles. », 13-01 « L'arc à feu demande plus de pratique que toutes les autres méthodes (planche
  13-01). ». Les sept planches sont appelées. Aucune étape renumérotée (1 à 29), aucun intertitre renommé.
- **Logigramme :** rien à changer ; sa dernière boîte dit déjà « Au poêle, garder l'air ouvert », comme la section 7
  maintenant.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 5 664 | 5 756 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes, forme commune) |
| « § », mots bannis, vocabulaire d'IA, maximes, pronominal, tournures, mises en relief | 0 | 0 (une tournure apparue en cours d'édition, « l'arc demande beaucoup d'effort », réécrite) |
| Mots vides à juger | 23 | 24 (« tout ce travail », étape 3, porte le sens) |
| Redites à juger | 11 | 9 (les renvois « souffler (étape 16) », « la laine avec les deux bornes » entre l'orange et l'étape 19, « un lit de branches vertes » aux étapes 4 et 29 pour deux gestes différents, « le bois de 2 à 5 cm », le même mot pour la même chose) |
| Invariants disparus | | « 2 cm » une fois : étape 10, « la flamme de l'amadou allume le bois de moins de 2 cm » devient « …allume le bois fin », trois lignes sous la définition « le bois fin, de moins de 2 cm (repère 2) ». Les deux autres « 2 cm » retirés en cours d'édition sont remis entre parenthèses (étape 13, section 6) |

## Le mot « bois fin » (règle 6)

Le chapitre disait « bois fin » (étape 17, sections 5 et 6) et « petit bois de moins de 2 cm » ou « bois de moins de
2 cm » (étapes 10 et 13, section 6) pour la même grosseur, alors que le Matériel appelle « petit bois » les deux
grosseurs ensemble. Le nom « bois fin » est maintenant posé avec sa mesure à l'étape 10 (« le bois fin, de moins de
2 cm ») et repris partout ; la mesure reste entre parenthèses là où on lit l'étape ou la ligne seule (étape 13,
section 6). Le logigramme dit « un tas de moins de 2 cm » : pas de conflit.

## Les phrases changées

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Matériel | « (→ section 7) » deux fois ; « **Amadou sec** : ouate, écorce de bouleau, barbe de quenouille, gardés dans un sac fermé ; il reçoit l'étincelle » ; « et ce qui prend dans la mousse » | « (sans tige : section 7) », « (ce qu'on ramasse dehors : section 7) » ; « **Amadou sec** : il reçoit l'étincelle ; de l'ouate, de l'écorce de bouleau ou de la barbe de quenouille, gardées dans un sac fermé » ; « et le feu qui prend dans la mousse » | Notation que le lecteur n'emploie pas (le seul chapitre du tome 1 qui gardait la flèche) ; liste de noms ; accord |
| 2 | Étape 1 | « l'un s'occupe de la personne mouillée » | « l'un doit s'occuper de la personne mouillée » | Consigne |
| 3 | Étape 2 | Une coupure de ligne au milieu de « Sous 0 °C » | Refermée | Mise en forme |
| 4 | Étape 3 | « On peut casser les branches, les trier et fendre le bois avec les mitaines : … Ramasser les branches mortes…, les casser et les trier… » ; « L'amadou qu'on avait sur soi sert en premier. » | Les gestes d'abord, puis « On peut faire tout ce travail avec les mitaines, même fendre le bois : … » ; « Se servir d'abord de l'amadou qu'on avait sur soi. » | Redite dans l'étape ; consigne |
| 5 | Étape 4 | « le sommet reste grand ouvert, la flamme reste claire, et quelqu'un reste éveillé toute la nuit pour la garder » | « le sommet doit rester grand ouvert, la flamme doit rester claire, et quelqu'un doit rester éveillé toute la nuit pour la surveiller » | Consigne dite comme une consigne |
| 6 | Étape 5 | « selon les mains » ; « Sans aucun des trois : section 7. » ; « vers 15 °C de peau » | « selon l'état des mains » ; « Sans pile ni batterie, sans ferrocérium et sans briquet : section 7. » ; « quand la peau descend vers 15 °C » | On ne savait pas quels trois ; notation |
| 7 | Étape 7 | « avec assurance » ; « lui faire arrêter l'essai » | « sûre d'elle » ; « la faire arrêter » | Règle 0 |
| 8 | Étape 8 | « enlever autour tout ce qui brûle » | « enlever tout ce qui brûle autour » | Ordre naturel (règle 11) |
| 9 | Étape 10 | « le petit bois de moins de 2 cm (repère 2), celui de 2 à 5 cm » ; « allume le bois de moins de 2 cm » ; « le feu qui vient de prendre meurt » | « le bois fin, de moins de 2 cm (repère 2), le bois de 2 à 5 cm » ; « allume le bois fin » ; « s'éteint » | Règle 6 ; personnification |
| 10 | Étape 12 | « **Fendre pour trouver le sec.** » | « **Fendre le bois pour atteindre le cœur sec.** » | Nom sans article |
| 11 | Étape 13 | « Dresser le bois de moins de 2 cm » | « Dresser le bois fin (moins de 2 cm) » | Règle 6 |
| 12 | Étape 14 | « Creuser un creux au centre. » ; « : quelques passes douces du couteau sur la tige, sans faire d'étincelle » | « Faire un creux au centre. » ; « , grattée en passant doucement le couteau sur la tige quelques fois, sans faire d'étincelle » | Redite de mot ; noms à la place du geste |
| 13 | Étape 15 | « Poser la pointe de la tige dans le nid, à un doigt au-dessus de l'amadou, sans le toucher » | « Tenir la pointe de la tige au-dessus du creux du nid, à un doigt de l'amadou, sans le toucher » | « Poser dans » et « sans toucher » se contredisaient à l'oral ; la légende de la planche 13-40, repère 9, dit « pointe à un doigt du nid » |
| 14 | Après l'étape 17 | « Sans tige de ferrocérium : le briquet à pierre, la batterie, le soleil ou l'arc à feu (section 7). » | « Sans tige de ferrocérium, on peut allumer au briquet à pierre, à la batterie, au soleil ou à l'arc à feu (section 7). » | Liste de noms |
| 15 | Étapes 19 et 20 | « un avertisseur » ; « à un bras de la batterie, et toucher la laine avec » | « un avertisseur de fumée » ; « à une longueur de bras de la batterie, et toucher la laine avec ces deux bouts » | Le mot complet ; règle 0 |
| 16 | Étapes 25, 28, 29 | « Percer un seul trou d'un clou dans le couvercle » ; « fait sur l'amadou carbonisé un point rouge » ; « Le feu qui a gagné l'humus : étape 8 et section 6. Les cendres du poêle : ch. 82. » | « Percer un seul trou dans le couvercle avec un clou » ; « fait un point rouge sur l'amadou carbonisé » ; « Si le feu est descendu dans l'humus : étape 8 et section 6. Pour les cendres du poêle : ch. 82. » | Ordre naturel ; étiquettes |
| 17 | Section 5 | « Réduire » ; « En poussière : le sortir plus tôt » | « Le réduire » ; « En poussière : sortir la boîte plus tôt la prochaine fois » | Le geste de l'étape 27 |
| 18 | Section 6 | « qui meurent dans l'air » ; « Souffle par à-coups » ; « Remonter le tipi en bois de moins de 2 cm, puis ajouter le 2 à 5 cm » ; « Fumée qui refoule dans la pièce » ; « le feu fait du CO » ; « Ouvrir la clé au maximum » ; « puis ch. 26 » ; « réchauffer contre le corps » | « qui s'éteignent dans l'air » ; « On a soufflé par à-coups » ; « Remonter le tipi en bois fin (moins de 2 cm), puis ajouter le bois de 2 à 5 cm » ; « Fumée qui refoule du poêle dans la pièce » ; « le feu fait du monoxyde » ; « Ouvrir au maximum la clé du tuyau » ; « puis soigner selon le ch. 26 » ; « réchauffer les doigts contre le corps » | Personnification ; un seul mot par chose (« monoxyde ») ; la clé est celle du tuyau, distincte de l'air du poêle (ch. 12) |
| 19 | Section 7, poêle | « on garde l'air ouvert la nuit et on recharge à tour de rôle, sans couvrir le feu ni fermer l'air » | « on ne couvre pas le feu pour la nuit : on garde l'air du poêle ouvert et on recharge à tour de rôle » | L'air dit deux fois dans la phrase |
| 20 | Section 7, relais | « On charge une personne du feu » ; « ne part pas pêcher » ; « on coupe la veille le bois du lendemain » | « On confie le feu à une personne » ; « ne doit pas partir pêcher » ; « on coupe le bois du lendemain la veille » | Mot de tous les jours ; consigne ; ordre |
| 21 | Section 7, boîte à braise | « Percer au clou une boîte de conserve » ; « traverser une mitaine » | « Percer des trous au clou dans une boîte de conserve » ; « brûler à travers une mitaine » | Règle 0 |
| 22 | Section 7, amadou | « la gomme de sapin baumier, crevée à la pointe du couteau dans les cloques de l'écorce » ; « Rouler des carrés de coton serrés » ; « On y trouve du brun et de la poussière à côté du bon noir : on garde le noir. » | « la gomme de sapin baumier, qu'on prend en crevant les cloques de l'écorce à la pointe du couteau » ; « Rouler serré des carrés de coton » ; « Dans le cornet, on trouve du coton brun et de la poussière à côté du bon coton noir : garder seulement le noir. » | On crève la cloque, pas la gomme ; adjectifs sans nom |
| 23 | Section 7, amadouvier | « Trempé dans une solution de salpêtre…, puis séché, il couve seul » ; « On règle la lessive et le salpêtre par essai » | « Si on le trempe dans une solution de salpêtre…, puis qu'on le fait sécher, il couve seul » ; « On trouve la bonne force de la lessive et du salpêtre par essai » | Participes en chaîne ; règle 0 |
| 24 | Section 7, briquets et batterie | « On les fait tomber » ; « un manche de bois percé avec de la gomme » ; « le banc du panneau solaire » ; « on touche avec les deux bouts ce qu'on veut faire chauffer » | « On fait tomber ces étincelles » ; « un manche de bois percé, avec de la gomme » ; « le banc de batteries du panneau solaire » ; « on touche ce qu'on veut faire chauffer avec les deux bouts » | Pronom ambigu ; « percé avec de la gomme » ; ordre |
| 25 | Section 7, arc et allumettes | « Ce qu'on perd : beaucoup d'effort… ; et il échoue » ; « il faut, pour la tête et le grattoir, des produits chimiques (…) qu'on n'y trouve pas » | « Ce qu'on perd : l'effort est grand et coûte de la nourriture l'hiver… ; et l'arc échoue » ; « il faut des produits chimiques pour la tête et le grattoir (…), et on n'en trouve pas au chalet » | Le « il » renvoyait au bois ; ordre |
| 26 | En plus, moustiques | « on le laisse dehors » | « il faut le laisser dehors » | Consigne |

Gardé après examen : « Il faut un soleil franc » à l'étape 23 et dans « Ce qu'on perd » de la section 7 (le gabarit
demande de nommer ce qu'on perd) ; « Le bois mouillé use la chaleur… » (la phrase de JP, ligne du tableau du skill) ;
« On ramasse ce qui reçoit l'étincelle toute l'année », début d'ancre ; « L'arc à feu demande plus de pratique… »,
début d'ancre (« demande » au sens d'« exige », pas une chose qui parle) ; les quatre notes « En plus ».

## Faits signalés (pas corrigés : ils touchent un fait ou un renvoi)

1. **Renvoi circulaire, section 6, dernière ligne** : « Arroser beaucoup et creuser jusqu'à la terre minérale
   (étape 29) ». L'étape 29 ne parle pas de creuser et renvoie elle-même à « étape 8 et section 6 » ; le geste de
   creuser jusqu'à la terre minérale est à l'étape 8. Proposer « (étapes 8 et 29) ».
2. **Étape 8, « Le feu brûle sur ce fond sec, au-dessus de la neige »** : le fond est fait de branches vertes. Si
   « sec » veut dire « hors de la neige », dire « sur ce fond, au-dessus de la neige » ; sinon, à vérifier.
3. **« Les briquets vides »** (section 7) : la phrase sur la tige de ferrocérium trop courte, collée dans un manche,
   n'a pas de rapport avec le titre. Elle irait mieux sous un titre à elle ou à la fin de « Le briquet à pierre ». Pas
   déplacée : ce serait réorganiser le contenu du rédacteur.
