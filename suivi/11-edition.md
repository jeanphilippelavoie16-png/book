# Édition : Chapitre 11, Le feu de forêt

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/11-feu-de-foret.md` au gabarit final, après la refonte du 19 octobre et les deux passes
  de corrections qui ont suivi la vérification technique (`suivi/11-redaction.md`, « Refonte au gabarit final »,
  « Corrections après la vérification technique » et « Deuxième relecture du vérificateur »). Copie du texte d'avant
  l'édition : `scratchpad/edition-11-13-14-avant/11-feu-de-foret.md`. Tout le chapitre relu, phrase par phrase, à voix
  haute, du titre à la dernière note « En plus ».
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31),
  `plan/glossaire.md` (chaudière, bidon), `suivi/11-redaction.md` (refonte et corrections du 19 octobre), le
  logigramme `images/logigrammes/11-feu-de-foret.json`, `suivi/10-edition.md` et `suivi/18-edition.md` (forme de la
  fiche).
- **Aucune source nouvelle cherchée, aucun chiffre ni aucun fait changé** (JP, 19 octobre 2026 : « fuck les sources,
  on a pas déjà fait ce travail-là ? »). Ce qui touche un fait est signalé plus bas, pas corrigé.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé.
- **Ancres :** aucune touchée. Les cinq débuts de paragraphe rendus par le rédacteur sont intacts, chacun une seule fois
  dans le chapitre : 11-03 « 7. **Remplir tout ce qui tient l'eau** », 11-04 « 35. **Au chalet, l'été, faire une pièce
  d'air propre », 11-05 « **Le râteau à feu.** », la photo des colonnes « **Une colonne qui monte droit et s'élargit
  en chou-fleur** », le logigramme « **Râteau à feu** ». `controle.py` signale encore l'ancienne ancre de 11-03 dans
  `placements-tome-1.json` (« **L'eau et le pourtour (étapes 7 à 9).** ») : c'est la fusion des ancres du rédacteur
  qui la règle. Les trois planches sont appelées. Aucune étape renumérotée (1 à 58).
- **Intertitres renommés** (aucun n'est cité ailleurs, vérifié par `grep` sur `chapitres/`, `images/logigrammes/`,
  `dangers/` et `plan/`) : « Avant la saison : écrire ce qui fera partir » devient « … : écrire les raisons de
  partir » ; « Sortir quand le chemin n'est plus un chemin » devient « Sortir quand le chemin est bloqué ou dans la
  fumée » ; « Parer le bâtiment aux braises avec ce qu'on a » devient « Protéger le bâtiment des braises avec ce qu'on
  a » ; « Au retour, trouver le feu qui reste sans instrument » prend une virgule avant « sans instrument ».
  « Fabriquer les outils », cité par le ch. 99, ne change pas.
- **Logigramme :** rien à changer. Ses boîtes ne reprennent aucune des phrases modifiées (« Fixer l'heure du prochain
  contact » reste).

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 7 749 | 7 863 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes, forme commune que lit l'assembleur) |
| « § », mots bannis, vocabulaire d'IA, maximes, pronominal, mises en relief | 0 | 0 |
| Tournures à juger | 1 (étape 11, « les coucher dans la pièce la mieux fermée » : verbe, objet, lieu, gardée) | 1 (la même) |
| Mots vides à juger | 42 | 40 (les « tout », « déjà », « bien » qui restent portent le sens) |
| Redites à juger | 5 | 7 : les cinq déjà jugées par le rédacteur, plus « dans les 1,5 m autour » (étapes 8 et 49 : le même nom pour la même zone, règle 6) et « passer le dos de la main » (note de bas de page de l'étape 26 et section 7 : la note explique le signe, obligatoire, et renvoie à la section 7) |
| Invariants disparus | | rien |

Les mots montent parce que les phrases ont repris leurs verbes et leurs compléments (règle 0).

## Les phrases changées

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Matériel, carburant | « les bidons restent hors du bâtiment, puis partent dans l'auto » | « on garde les bidons hors du bâtiment, et on les charge dans l'auto au départ » | Consigne au présent qui décrit (règle 11) |
| 2 | Matériel, purificateur | « il fait l'air propre de la chambre » | « il nettoie l'air de la chambre » | Règle 0 ; le verbe de l'étape 32 |
| 3 | Étape 2 | « deux fois ce que prend l'aller » | « deux fois le carburant que prend l'aller » | On nomme la chose |
| 4 | Étape 4 | « avec les gilets » | « avec les gilets de sauvetage » | Le mot complet |
| 5 | Étape 6 | « la fumée se sent dans la maison » ; « ce qui la fait partir » | « on sent la fumée dans la maison » ; « ses raisons de partir » | Pronominal ; le même mot qu'à l'étape 47 |
| 6 | Étape 8 | « tirer le bois de chauffage à plus de 10 m » | « éloigner le bois de chauffage à plus de 10 m » | Le mot de tous les jours |
| 7 | Étape 10 | « avec quelqu'un à l'extérieur » ; « cette personne saura » | « avec une personne hors du secteur » ; « elle saura » | « À l'extérieur » se lisait « dehors » ; le sens du ch. 14 (une personne qui ne vit pas la même urgence) |
| 8 | Étape 12 | « Un adulte reste avec eux. » ; « Un adulte seul installe d'abord les enfants, puis ferme le bâtiment. » | « Un adulte doit rester avec eux. » ; « Un adulte qui est seul doit d'abord installer les enfants, puis fermer le bâtiment. » | Consigne dite comme une consigne |
| 9 | Étape 13 | « tirer ce qui brûle au milieu des pièces » ; « sortir les cendres dans leur contenant de métal » | « tirer ce qui peut brûler… » ; « sortir les cendres dehors, dans un contenant de métal » | « Ce qui brûle » se lisait « ce qui est en feu » ; possessif qui suppose un objet |
| 10 | Étape 14 | « Fermer l'eau avant de partir : un boyau laissé ouvert vide… » | « Un boyau laissé ouvert après le départ vide… » | Le geste est déjà dans le titre de l'étape |
| 11 | Étape 20 | « Sortir de l'auto toujours sous la laine. » | « Sortir de l'auto en restant sous la laine. » | Ordre naturel |
| 12 | Étape 24 | « à 100 m au moins de tout arbre » | « à au moins 100 m de tout arbre » | Ordre naturel |
| 13 | Étape 26 | « Les 200 L d'eau, le râteau et la pelle servent maintenant : gratter jusqu'au sol minéral, retourner, noyer ou couvrir de terre. » | « Prendre les 200 L d'eau, le râteau et la pelle : gratter chaque départ de feu jusqu'au sol minéral, retourner ce qui brûle, puis le noyer ou le couvrir de terre. » | Verbes sans objet (règle 0) |
| 14 | Étape 27 | « avec la radio et la colonne de fumée » | « en écoutant la radio et en regardant la colonne de fumée » | Des noms à la place des gestes |
| 15 | Étape 28 | « dégager un chemin ou aller voir » | « dégager un chemin ou aller en reconnaissance » | « Aller voir » sans objet (le texte d'avant la passe disait « pour aller voir » au sens de reconnaître) |
| 16 | Étape 29 | « …et garder un adulte éveillé. » … « Les adultes doivent veiller à tour de rôle. » | « …et garder un adulte éveillé, à tour de rôle. » | Redite dans l'étape |
| 17 | Étape 33 | « Régler les sorties des enfants sur les particules fines. » ; « pour lui, il reste l'air de la pièce d'air propre » | « Laisser les enfants dehors ou les garder dedans selon les particules fines. » ; « pour le protéger, il faut la pièce d'air propre » | Code à déchiffrer |
| 18 | Étape 34 | « la chaleur passe avant la fumée » | « s'occuper de la chaleur avant la fumée » | Formule ; le titre d'étape dit un geste |
| 19 | Étape 35 | « la fumée qui se sent dans le chalet devient une raison de partir » | « quand on sent la fumée dans le chalet, c'est une raison de partir » | Pronominal |
| 20 | Étape 36 | « à moins de 8 km, les garder dans la pièce » | « si on ne voit plus un repère à 8 km, les garder dans la pièce » | On ne savait pas à quoi se rapportaient les 8 km |
| 21 | Étape 38 | « En rentrant une heure avant la noirceur, on n'a plus la lumière pour les trouver. » | « Si on rentre une heure avant la noirceur, il ne reste pas assez de lumière pour les trouver. » | Règle 0 |
| 22 | Étape 40, et section 6 | « Tirer un chicot brûlé… au treuil…, à distance » ; « le tirer au treuil ou au câble » | « Pour faire tomber un chicot brûlé…, le tirer au treuil…, de loin » ; « le faire tomber en le tirant au treuil ou au câble » | Le but dit en clair |
| 23 | Étape 42 | « Traiter l'eau d'un puits de surface ou d'une prise d'eau dans un lac au bassin brûlé comme une eau trouble » | « Quand le bassin du lac ou du puits a brûlé, traiter comme une eau trouble l'eau d'un puits de surface ou celle qu'on prend dans le lac » | « Au bassin brûlé… comme une eau trouble » se démêlait mal ; la condition vaut pour les deux, comme dans la section 6 |
| 24 | Étape 47, son intertitre et la section 5 | « écrire ce qui fera partir » ; « On l'écrit donc en mesures qu'on vérifie sans débattre » ; « la sortie est plus longue, plus fragile, et elle n'a pas de rechange » | « écrire les raisons de partir, et les afficher… » ; « On écrit donc ces raisons en mesures qu'on peut vérifier sans discuter » ; « le chemin de sortie est plus long, plus fragile, et on n'en a pas d'autre » | Complément manquant (partir qui ?) ; « l' » qui oblige à chercher ; mot de rapport |
| 25 | Étape 48 et section 5 | « Rouler les deux chemins de sortie » ; « Roulés tous les deux » | « Faire chaque année le trajet des deux chemins de sortie » ; « Le trajet fait sur les deux » | « Rouler un chemin » ne se dit pas |
| 26 | Étape 49 | « **Du mur à 1,5 m, rien qui brûle** : du gravier… » | « **Ne rien laisser qui brûle dans les 1,5 m autour des murs** : seulement du gravier ou le sol minéral ; pas de… » | Titre d'étape sans verbe ; les mots de l'étape 8 |
| 27 | Étape 50 | « Vider les gouttières, les noues du toit et le dessous des galeries » | « Vider les gouttières et les noues du toit (les creux où deux pans du toit se rejoignent), et nettoyer le dessous des galeries » | Mot de métier expliqué une fois ; on ne « vide » pas un dessous de galerie |
| 28 | Étape 52 | « Le fermer une fois pour toutes » | « Fermer le dessous de la galerie une fois pour toutes » | Pronom qui oblige à chercher |
| 29 | Étape 57 | « plus aucun travail qui fait des étincelles, ni meulage… » | « ne plus faire aucun travail qui fait des étincelles : ni meulage… » | Un verbe dans la puce |
| 30 | Étape 58 | « pour y voir une colonne » ; « Si une colonne est en vue : étape 1. » | « pour repérer une colonne » ; « Si on voit une colonne, passer à l'étape 1. » | Étiquette en raccourci |
| 31 | Section 5 | « régime de l'étape 57 » ; « réservoir de propane » ; « Fermer, recirculer, HEPA dans la chambre des enfants » ; « Ouvrir » ; « La reprendre avec la radio et la colonne de fumée (étape 27) » ; « Ne pas entrer. Près d'un fil au sol : s'éloigner à très petits pas traînés (étape 39) » | « appliquer l'étape 57 » ; « bouteille de propane » ; « Fermer la maison, mettre l'air en recirculation, faire tourner le purificateur dans la chambre des enfants » ; « Ouvrir les fenêtres » ; « La reprendre (étape 27) » ; « Ne pas entrer (étape 39) » | Mot de rapport ; un seul mot par chose (règle 6) ; étiquettes ; l'avertissement du fil n'est pas redit en tableau |
| 32 | Section 6 | « Un feu assez gros pour porter des débris souffle de ce côté » ; « Les enfants dans la pièce » ; « Ce qui est écrit sur la porte se rediscute » ; « Un réservoir à côté d'un mur » ; « Une couverture de laine par personne dans l'auto » | « Le vent vient d'un feu assez gros pour porter des débris jusqu'ici » ; « Mettre les enfants dans la pièce » ; « On rediscute de vive voix ce qui est écrit sur la porte » ; « Une bouteille à côté d'un mur » ; « Mettre une couverture… » | Le feu ne souffle pas ; actions sans verbe ; pronominal ; règle 6 |
| 33 | Section 7, « Lire le danger » | « Les ruisseaux sont bas, … » ; « on passe au régime de l'étape 57 » ; « La radio à piles, aux heures de bulletin, dit où est le feu » ; « on part au premier signe écrit sur la porte » ; « avance vers où elle penche » ; « sans prévenir » | « Les autres signes : les ruisseaux sont bas, … » ; « on applique l'étape 57 » ; « On apprend où est le feu en écoutant la radio à piles aux heures des bulletins » ; « on part dès qu'une des raisons écrites sur la porte arrive » ; « avance du côté où elle penche » ; « d'un coup » | Lien entre les phrases ; chose qui parle ; les mots de l'étape 47 ; personnification |
| 34 | Section 7, chemin | Intertitre « …quand le chemin n'est plus un chemin » ; « garde l'air d'un chemin intact » ; « le tablier » ; « **Le lac est le deuxième chemin.** » ; « marcher vers lui » ; « Il doit être large et refroidi, parce que… » | « …quand le chemin est bloqué ou dans la fumée » ; « et, vu du chemin, il a l'air intact » ; « le dessus du ponceau » ; « **Partir par le lac.** » ; « y aller » ; « Choisir un brûlis large et refroidi : … » | Titre en formule ; mot de métier ; redite de l'étape 4 ; redite du titre de la puce ; consigne |
| 35 | Section 7, braises | Intertitre « Parer le bâtiment aux braises » ; « sans personne au bout » (deux fois) ; « Pas de bâche de plastique » ; « Visser par-dessus, de l'extérieur, de la tôle… en vissant dans le chambranle » ; « la crépine » ; « Sans maille : une tôle…, un couvercle…, un bout de solin » | « Protéger le bâtiment des braises » ; « sans que personne ait à arroser », « tout seul » ; « Ne pas prendre de bâche de plastique » ; « Visser de la tôle… par-dessus la vitre, de l'extérieur…, dans le chambranle » ; « la crépine (le bout qui aspire) » ; « Sans maille, prendre une tôle…, un couvercle… ou un bout de solin » | Mot littéraire ; image ; ordre naturel et « visser en vissant » ; mot de métier expliqué ; liste de noms |
| 36 | Section 7, outils | « souder un bout de tuyau sur son chant » ; « y enfoncer le manche » ; « Une vieille lame de pelle carrée redressée, bien emmanchée, fait aussi l'affaire » ; « Boulonner… avec deux boulons » ; « sans une goutte d'eau » ; « La tenir avec deux boulons » ; « serrer du fil de fer derrière la fente » | « sur la tranche du fer plat » ; « enfoncer le manche dans le tuyau » ; « Autre façon : redresser une vieille lame de pelle carrée et l'emmancher solidement » ; « Fixer… avec deux boulons » ; « et sans eau » ; « La fixer » ; « autour de la perche, derrière la fente » | Mot de métier et possessif ; l'autre façon dite comme telle (cadre) ; redite ; chute |
| 37 | Section 7, air des enfants | « **Une pièce, pas tout le chalet.** » ; « fermer la clé d'air » ; « Tenir au ruban gommé » ; « ajoute 40 % » ; « poser le ventilateur dessus, qui souffle vers le haut » ; « l'intérieur du moteur a monté de près de 60 °C pendant les essais » ; « le pulseur de chaufferette » ; « Ce qui compte, c'est le débit pour la taille de la pièce » | « **Choisir une seule pièce.** » ; « fermer la clé d'air du poêle » ; « Fixer au ruban gommé » ; « augmente de 40 % l'air nettoyé » ; « poser le ventilateur sur le cube, tourné pour souffler vers le haut » ; « la température à l'intérieur du moteur a monté… pendant des essais » ; « le ventilateur de la chaufferette » ; « Le débit doit suivre la taille de la pièce » | Opposition en titre ; 40 % de quoi (la source : le débit d'air propre) ; ordre ; mot de métier ; mise en relief |
| 38 | Section 7, retour | Intertitre sans virgule ; « **Le dos de la main**, passé au-dessus du sol » ; « **Creuser plutôt que regarder.** » ; « Il reste l'étape 24, dans un creux de sol minéral » | « …le feu qui reste, sans instrument » ; « **Passer le dos de la main** au-dessus du sol » ; « **Creuser là où c'est chaud.** » ; « Sans cet abri, faire comme à l'étape 24 : se coucher dans un creux de sol minéral, loin des arbres debout. » | « Le feu qui reste sans instrument » ; participe à la place du geste ; opposition en titre ; « il reste » |

Gardé après examen : la section 2 et sa ligne sur l'orage (un fait qui n'est dit nulle part ailleurs) ; les trois séries
orange, sauf les phrases ci-dessus ; « Si une des deux raisons est déjà là » ; les oppositions réelles (la pièce d'air
propre contre la fumée, pas contre le front ; « c'est pourtant le plus dangereux des deux », un fait qui retourne un
réflexe) ; « Dans cette zone, le feu qui arrive perd de sa force » et « Une zone éclaircie qu'on n'entretient pas
redevient du combustible en quelques années » (les deux disent pourquoi le geste se fait, avec une durée) ; les cinq
notes « En plus » (vérifiées et corrigées ce matin, rien à reprendre).

## Faits signalés (pas corrigés : ils touchent un fait)

1. **À quelle température ouvrir les fenêtres de la pièce des enfants.** Étape 34 : « le risque monte au-dessus de
   26 °C et devient dangereux au-dessus de 31 °C : ouvrir les fenêtres » (on ne sait pas si on ouvre à 26 ou à 31) ;
   section 5 : cible « sous 26 °C », hors cible « Ouvrir les fenêtres » (donc dès 26) ; section 7 : « Au-dessus de
   31 °C dans la pièce, l'ouvrir (étape 34) ». Trancher à la source, puis écrire le même seuil aux trois endroits.
2. **Étape 54, « un petit tas de service près de la porte pour l'hiver »**, dans une étape sur la saison de feu
   (printemps à fin d'automne) : c'est le bois des jours où le poêle chauffe au printemps et à l'automne (étape 35) ;
   « pour l'hiver » se lit mal ici. À dire selon l'intention du rédacteur.
3. **Étape 15, « Un panneau sous tension dans une maison brûlée et mouillée blesse la personne qui revient »** : au
   présent de certitude. « peut électrocuter » dirait le risque sans l'affirmer pour chaque cas ; à décider selon la
   source.
