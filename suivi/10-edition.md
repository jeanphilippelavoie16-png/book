# Édition : Chapitre 10, Eau : puiser, filtrer, désinfecter

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/10-eau-puiser-filtrer-desinfecter.md` au gabarit final, après les corrections du
  rédacteur qui suivent la vérification technique des notes « En plus » (`suivi/10-redaction.md`, « Corrections après
  la vérification technique, 19 octobre 2026 »), du titre à la dernière note « En plus ». Texte d'avant l'édition :
  celui du commit `22c219c`. Le chapitre avait eu une première édition le 18 octobre (`suivi/10-redaction.md`,
  « Édition, 18 octobre 2026 », environ 190 phrases) ; depuis, la refonte a ajouté l'étape 1 sur les retombées, la ligne
  du manganèse en section 6 et la section « En plus ». Tout le chapitre a été relu, phrase par phrase.
- **Lu avant :** `.claude/cadre-agents.md` au complet, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` au complet
  avec ses tableaux, `gabarit-chapitre.md`, `suivi/plan-de-match.md` (PAUSE du 15 octobre, points 1 à 31),
  `plan/glossaire.md` (chaudière contre seau), `suivi/10-redaction.md` (édition du 18 octobre, notes « En plus »,
  corrections du 19 octobre).
- **Aucune source nouvelle cherchée, aucun chiffre ni aucun fait changé** (JP, 19 octobre 2026 : « fuck les sources,
  on a pas déjà fait ce travail-là ? »). Ce qui touche un fait est signalé plus bas.
- **Fins de ligne :** LF avant et après (aucun CR), saut de ligne final gardé.
- **Ancres :** aucune touchée. Les sept débuts de paragraphe ancrés (`placements-tome-1.json`, clé `"10"` : 10-01,
  10-08, 10-02, 10-07, 10-03, la photo 10-hutte-castor et le logigramme `10-eau-livre.svg` sur « **Filtre à 1 µm ou
  moins** ») sont intacts, chacun une seule fois dans le chapitre. Aucune étape renumérotée (1 à 49), aucun intertitre
  de la section 7 renommé : les renvois des autres chapitres (dont ch. 18, « ch. 10, section 7, « Fondre sans gaspiller
  de bois » ») tiennent.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 9 294 | 9 302 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes) |
| « § », mots bannis, vocabulaire d'IA, maximes | 0 | 0 |
| Âges à juger | 1 (« de moins de 6 ans », un fait sur le plomb) | 1 (le même) |
| Tournures à juger | 1 (étape 16, « la verser dans un contenant lavé, avec des ustensiles propres » : ordre naturel, gardée) | 1 (la même) |
| Mises en relief à juger | 2 (granules, alambic : oppositions réelles, gardées à l'édition du 18) | 2 (les mêmes) |
| Mots vides à juger | 25 | 24 |
| Redites à juger | 7 | 8 (nouvelle : « l'eau au filtre à 1 µm », étapes 9 et 10, le même mot pour la même chose, règle 6 ; les sept autres déjà jugées le 18) |
| Ancres introuvables | 0 | 0 |
| Invariants disparus | | rien |

## Les phrases changées, avant et après

| # | Où | Avant | Après | Règle |
| --- | --- | --- | --- | --- |
| 1 | Section 2 | « dans un contenant dont on ne connaît pas l'histoire » | « dans un contenant dont on ne sait pas ce qu'il a contenu » | Règle 0 : le mot de tous les jours |
| 2 | Étape 1 (ajout de la refonte) | « Après une détonation, la décanter à l'argile et la passer au filtre de terre en enlèvent presque tout » | « Après une détonation, on en enlève presque tout en décantant l'eau avec de l'argile et en la passant au filtre de terre » | Deux infinitifs sujets d'un verbe au pluriel : la phrase se démêle mal à l'oral ; on sait qui fait le geste |
| 3 | Étape 9 | « quand on passe ensuite l'eau au filtre fin » | « … au filtre à 1 µm » | Règle 6 : un seul nom pour le filtre |
| 4 | Étape 12 | « la filtration retient le mieux les kystes » | « le filtre retient le mieux les kystes » | Le nom de la chose, pas du procédé |
| 5 | Étape 14 | « on garde quand même les 5 minutes, la durée donnée pour l'eau des endroits où la tularémie circule. … Le ch. 50, sur le castor, donne la même durée. » | « on garde quand même 5 minutes, la durée recommandée pour l'eau des endroits où la tularémie circule (ch. 50). » | Phrase qui parle du livre ; le renvoi reste, court |
| 6 | Étape 18 | « Prendre une javel titrée de 4 à 6 % » | « Prendre une javel de 4 à 6 % » | Mot de laboratoire |
| 7 | Étape 23 | « et pas plus de quelques semaines à personne » | « et à personne pendant plus de quelques semaines » | « à personne » se lisait « à aucune personne » au bout de la phrase |
| 8 | Étape 26 | « On garde en réserve l'eau de 72 heures et on traite le reste chaque jour ; on choisit la taille de la marmite… » | « Garder en réserve l'eau de 72 heures et traiter le reste chaque jour ; choisir la taille de la marmite… » | Les étapes à l'infinitif (règle 4) |
| 9 | Étape 30 | « Attacher un poids au bout d'une ficelle par deux nœuds » | « … avec deux nœuds » | Règle 0 |
| 10 | Étape 36 | « Mesurer la glace du chemin qui mène au trou » | « Mesurer l'épaisseur de la glace sur le chemin qui mène au trou » | Ce qu'on mesure, dit en clair |
| 11 | Étape 44, tableau | « Boire, et les breuvages » | « Boire, et faire les breuvages » | Nom sans verbe dans une colonne de gestes |
| 12 | Étape 48 | « on ne sait s'il y en a une que par une analyse » | « il faut une analyse pour savoir s'il y en a une » | Règle 0 (« ne … que par » à l'oral) |
| 13 | Section 5, puits | « Une à **1 semaine**, une à **4 semaines** » | « Une après **1 semaine**, une après **4 semaines** » | Règle 0 (voir aussi le fait signalé 2) |
| 14 | Section 6, céramique | « Changer la bougie, et aussi quand on y voit une fêlure » | « Changer la bougie. La changer aussi dès qu'on y voit une fêlure » | Règle 0 |
| 15 | Section 7, buse | « Attacher la corde au haut du tuyau par deux trous » | « … en la passant dans deux trous » | Le geste dit en clair |
| 16 | Section 7, granules | « ils activent un feu » | « ils attisent un feu » | Le mot de tous les jours |
| 17 | Section 7, filtre à sable | « La plus grande partie du travail est faite par un film de microbes qui se forme … et qui mange ce qui passe. » | « Un film de microbes se forme dans le 1 ou 2 cm du dessus du sable, mange ce qui passe et fait la plus grande partie du travail. » | Voix active (règle 7) |
| 18 | Section 7, fondre | « - un prélart noir ou une bâche foncée étalée sur la neige … ; - un sac souple accroché près du poêle, où la neige fond… » | « - Étaler un prélart noir ou une bâche foncée sur la neige, … en lui donnant une pente et une rigole qui mène à une chaudière. - Accrocher un sac souple plein de neige près du poêle : la neige fond… » | Liste de noms à la place des gestes |
| 19 | Section 7, pompe 12 V | « On monte l'eau du lac jusqu'au baril à bras. » | « On monte l'eau du lac à bras jusqu'au baril. » | « baril à bras » se lisait comme un objet |
| 20 | Ce qu'on perd, le goût | « Un enfant qui ne boit pas l'hiver se déshydrate » | « Un enfant qui ne la boit pas se déshydrate, même l'hiver » | La phrase se lisait « qui ne boit pas pendant l'hiver » ; le lien avec l'eau plate est rendu |
| 21 | En plus, sève | « La sève est presque toute de l'eau » | « La sève est presque entièrement de l'eau » | Règle 0 |
| 22 | En plus, castor | « l'orignal vient manger dans l'étang les plantes qui poussent sous l'eau » | « l'orignal vient y manger les plantes qui poussent sous l'eau » | Règle 11 : le lieu ne se glisse pas entre le verbe et l'objet |
| 23 | En plus, Naskapis | Titre « Le seau d'épinette des Naskapis » ; « faisaient leurs seaux à eau » | « La chaudière d'épinette des Naskapis » ; « faisaient leurs chaudières à eau » | Glossaire : « chaudière » partout (arbitrage contre « seau »), comme le reste du chapitre depuis l'édition du 18. Le titre est cité dans `suivi/10-redaction.md` et `sources/10-en-plus-notes-2026-10-19.md` (pas touchés) ; la note se place par « (étape 7) », pas par son titre |
| 24 | En plus, filtre à sable | « remplir le filtre à la même source » | « remplir le filtre avec l'eau de la même source » | Règle 0 |

Gardé après examen : l'étape 1 sur le sel et les retombées (sauf la phrase 2), l'étape 2, les sous-étapes du siphon, les
calculs du puits, le tableau de l'avis d'ébullition, les oppositions réelles (granules, alambic), « Une eau qui goûte
encore un peu le sel est loin d'être buvable » (un fait qui retourne un réflexe), « 7 000 mg-min/L » (expliqué en mots
dans la même phrase depuis le 18), les « tout » qui veulent dire « tout », les notes « En plus » sur le manganèse et le
rat musqué (corrigées ce matin, rien à reprendre).

## Faits signalés (pas corrigés : ils touchent un fait)

1. **« Seuls l'alambic et l'osmose inverse » enlèvent le sel (étape 1)**, alors que la même étape et la section 7
   (« Dessaler par le gel ») donnent le gel comme autre façon. Dire « seuls l'alambic, l'osmose inverse et le gel
   répété », ou dire que le gel n'en enlève qu'une partie, selon la source de « Dessaler par le gel ».
2. **Le moment des analyses après la désinfection du puits.** Étape 35 : « une semaine après la désinfection, puis
   quatre semaines plus tard » (on peut lire 1 et 5 semaines) ; section 5 : « une après 1 semaine, une après
   4 semaines ». À aligner sur la source de l'étape 35.
3. **La distance de la génératrice (étape 6)** : « à au moins 6 m du chalet ou de la maison ». Au ch. 18, la vérification
   technique du 19 octobre a corrigé la même phrase en « de tout bâtiment », d'après la même source
   (`sources/10-sante-canada-generatrice-distance.md` : « entre toute habitation ou tout bâtiment ») et la page
   `generatrice`. Les deux chapitres devraient dire la même chose.
4. **« 180 à 280 L (40 ou 60 gallons) », étape 49.** `CLAUDE.md` (règle 3) ne garde l'impérial entre parenthèses que pour
   les dimensions de construction ; les gallons sont ce qu'on lit sur l'étiquette du chauffe-eau, donc un repère utile.
   Gardé, à trancher par JP.
5. **Légende de la photo 10-hutte-castor** (`placements-tome-1.json`, pas touchée) : « Faire bouillir cinq minutes toute
   eau prise en aval, glace comprise » redit l'étape 14 et l'étape 41 ; la légende pourrait dire seulement ce qu'on voit.
