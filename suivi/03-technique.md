# Vérification technique : Chapitre 3, Panne majeure d'Hydro en janvier

- **Rôle :** 3, vérificateur technique (n'a pas rédigé le chapitre, ne le réécrit pas).
- **Date :** 29 octobre 2026. Première passe de la nouvelle chaîne (rédacteur, A0, vérificateur technique).
- **Texte vérifié :** `chapitres/03-panne-majeure-d-hydro-en.md` tel qu'il est à `HEAD` (3b26fb90), du titre à la
  dernière note « En plus », et son logigramme `images/logigrammes/03-panne-hydro.json`.
- **Contre :** `suivi/03-redaction.md` (toutes les passes), `suivi/01-redaction.md` (ce qui vient du ch. 1 le 28 octobre),
  les fiches de `sources/` qu'elles citent, `dangers/partie-1.md` et `partie-2.md`, les ch. 2, 10, 25 et 39 pour les
  contradictions. Les doutes des lecteurs : `plan/audit-ecriture/lecteurs/synthese.md`, sections 2.4, 2.9 et 3, et la
  liste de la paramédic (`paramedic.md`, « Les faits qui me font lever un sourcil »).
- **Aucune source nouvelle enregistrée.** Une page relue en ligne pour trancher un doute (Purdue, point R2), citée
  plus bas ; aucun fichier de `sources/` touché.

**Bilan.** Environ 110 chiffres et faits vérifiés. **7 écarts** avec la source ou entre chapitres (section 1),
**5 points à préciser** (section 2), **9 NON RETROUVÉ** (section 3), le reste confirmé (section 5). Les neuf rappels de
sécurité qui s'appliquent sont là, chacun dans son étape. Les renvois pointent tous vers le bon chapitre ; un seul est
trop large (étape 39). Aucun nom latin.

---

## 1. Écarts (le texte dit autre chose que la source, ou deux pages se contredisent)

### E1. « Tout chiffre affiché » et la cible « 0 ppm » : le geste du chapitre n'est pas celui de la source

- **Texte :** étape 5 (l. 76-77), « Tout chiffre affiché veut dire qu'il y a du monoxyde ; si le chiffre ne redescend
  pas de la journée, un appareil de la maison en fait. » Points de contrôle (l. 317), « **0 ppm** | Chercher
  l'appareil qui fait du monoxyde (étapes 5 et 7) ».
- **Source :** Kidde, « When Your Carbon Monoxide Alarm Displays a Number with No Alarm »
  (`15-kidde-reentree-et-affichage-co.md`, page 3, et `15-kidde-number-on-display-no-alarm.html`) : « Any time a
  digital unit displays a number with or without an alert, assume it senses carbon monoxide. Leave the home ». La
  source fait sortir ; le chapitre fait chercher l'appareil et attendre la journée.
- **Contradiction entre chapitres :** le ch. 1 (l. 91), même ligne, même cible, dit « Sortir tout le monde (ch. 3,
  étapes 12 et 13) ». Le ch. 3 dit de chercher l'appareil. C'est le doute de trois lecteurs (synthèse, 2.4).
- **Lecture à l'envers (synthèse, 3) :** « 0 » est un chiffre affiché. L'ado a lu 0 comme du gaz. La fiche Kidde
  dit aussi qu'un affichage à zéro ne prouve pas l'absence de CO (ch. 83, l. 273 : « zéro ne veut pas dire rien »).
- **À trancher par le rédacteur :** un chiffre au-dessus de 0 fait sortir tout le monde (étapes 12 et 13), comme au
  ch. 1 et comme le fabricant ; la recherche de l'appareil se fait ensuite (ch. 2, étapes 4 à 8).

### E2. Le bouton d'essai sert de preuve que l'avertisseur mesure le gaz

- **Texte :** étape 5 (l. 67), « **Tester l'avertisseur de CO au bouton** » ; étape 11 (l. 136-137), rester si on a
  « un avertisseur de CO qui répond au bouton » ; Points de contrôle (l. 316), « Il répond au bouton d'essai » ;
  logigramme, nœud « On peut rester à la maison ? » (« un avertisseur qui répond au bouton »).
- **Source :** guide Kidde P3010L-CO-CA (`15b-kidde-avertisseur-co-bouton-et-temperature.md`, section 1) : « The
  alarm will sound if the electronic circuitry, horn, and battery are working. » Le bouton éprouve le circuit, la
  sirène et la pile, à tout âge de l'appareil, jamais la cellule. Le chapitre le dit seulement pour un appareil de
  plus de 7 à 10 ans (l. 68-69) ; ailleurs, la réponse au bouton passe pour une preuve que l'appareil détecte.
- **Doute des lecteurs (synthèse, 2.9 et 3) :** la page du monoxyde ne porte plus la phrase du bouton depuis la
  condensation du 28 octobre, donc la contradiction avec la page est tombée ; le fait, lui, reste vrai, et l'ado
  croit encore que « s'il sonne, tout va ».
- **Ce que la source permet :** le bouton dit que la pile et la sirène marchent ; la date au dos est le seul repère
  sur la cellule. Même correction au logigramme et à la ligne des Points de contrôle.

### E3. La tache blanche et insensible : « engelure qui commence », réchauffée « peu à peu »

- **Texte :** Signes d'échec (l. 332), « Une tache blanche apparaît […], et la personne ne sent plus l'endroit |
  Engelure qui commence | Rentrer, et réchauffer la tache peu à peu, sans frotter ».
- **Source :** WMS (`03-wms-gelures.md`, l. 49-51) : « Rapid rewarming by water bath has been shown to result in
  better outcomes than slow rewarming », eau à 37 à 39 °C ; « still-frozen tissue is hard, pale, and anesthetic »
  (l. 114). Une peau pâle et insensible est déjà du tissu gelé, et la source réchauffe vite, pas peu à peu.
- **Contradictions :** la page `froid` (`dangers/partie-1.md`, l. 202) dégèle « dans de l'eau à 37 à 39 °C » ; le
  ch. 39 (l. 165-168) appelle la peau « blanchâtre, cireuse, brillante et insensible » une **engelure profonde**, et
  la peau « qui rougit et picote » une engelure qui commence.
- **À trancher :** le signe qui sépare les deux (la peau rouge qui picote, puis la peau pâle, insensible et dure) et
  le geste de la page `froid` (eau à 37 à 39 °C, seulement si elle ne regèlera pas).

### E4. Étape 39 : les 5 minutes viennent après la confirmation, pas « d'abord »

- **Texte :** l. 305-307, « Sur un puits inondé ou dont l'eau est douteuse, laisser d'abord couler l'eau au moins
  5 minutes, et continuer de la faire bouillir jusqu'à ce qu'on ait trouvé et réglé la cause du doute (ch. 10). »
- **Source :** Québec.ca, « Panne de courant » (`04-quebec-ca-panne-de-courant.md`, « Eau de puits après un
  sinistre ») : faire analyser, faire bouillir « for at least one minute » jusqu'à la confirmation, puis « Flush pipes
  "for at least five (5) minutes" after confirmation ». Les 5 minutes chassent la vieille eau une fois le puits jugé
  bon ; faire couler d'abord ne rend pas l'eau plus sûre.
- **Renvoi trop large :** pour un puits inondé, le ch. 10 désinfecte le puits au chlore (étapes 27 à 35, surtout
  l'étape 28). Le renvoi « (ch. 10) » devrait nommer ces étapes ; le ch. 3 ne dit pas qu'on chlore le puits.

### E5. Étape 26 : la pompe de relève ne s'arrête pas si elle a sa batterie

- **Texte :** l. 230-231, « La pompe de puisard est électrique, et la pompe dite « de secours » aussi : elles
  s'arrêtent ensemble. »
- **Source :** Ville de Québec (`04-ville-de-quebec-pompe-de-puisard.md`) : « En cas de panne de courant, elles
  doivent être alimentées par une génératrice ou une batterie de secours. » Une pompe de relève sur batterie tourne
  pendant la panne, jusqu'à ce que sa batterie se vide. Le texte est plus fort que la source.

### E6. « Sans thermomètre » : la règle du temps n'est pas « plus sévère » pour le congélateur

- **Texte :** section 7, « Les aliments » (l. 453-455), « Remplacer la règle des 4 °C par celle du temps, plus
  sévère. […] couper chaque paquet : s'il n'est plus dur au centre, on doit le cuire tout de suite ou le jeter. »
- **Sources :** MAPAQ (`04-quebec-ca-aliments-panne-courant.md`) : dégelé à 4 °C ou moins, cuire tout de suite ;
  passé au-dessus de 4 °C, « discard ». Sans thermomètre, on ne sait pas de quel côté de 4 °C est le paquet mou :
  « cuire tout de suite » peut servir une viande que la règle des 4 °C jetterait. Ce n'est donc pas plus sévère pour
  le congélateur (ça l'est pour le réfrigérateur, jeté à 6 h). Le critère sans thermomètre qu'une source officielle
  donne : Santé Canada (`10-sante-canada-salubrite-urgence.md`, l. 34), « Les aliments qui contiennent encore des
  cristaux de glace ou qui sont très froids au toucher peuvent être recongelés », et « En cas de doute, jetez les
  aliments ». La page `zone-de-danger` (point 5) jette aussi ce dont on ne sait pas la température.

### E7. Étape 11 et logigramme : le 5 °C de la plomberie devient une condition pour rester

- **Texte :** étape 11 (l. 136-137), rester « si la pièce chauffée reste au-dessus de 5 °C » ; logigramme, nœud
  « On peut rester à la maison ? », « la pièce chauffée au-dessus de 5 °C ».
- **Source :** le 5 °C est sourcé seulement comme seuil de vidange de la plomberie (Purdue, 40 °F dans la pièce,
  `04-purdue-extension-plomberie-panne-hiver.md`). L'INSPQ (`02-inspq-seuils-temperature-interieure.md`,
  `01-inspq-temperature-interieure.md`) dit qu'aucun seuil n'existe pour décider de partir, et la fiche interdit
  d'écrire « partir sous X °C » sur sa foi. Le chiffre est juste ; c'est le fait qu'on lui attache qui n'a pas de
  source. Le « 10 °C » d'avant a été retiré pour la même raison (`suivi/03-redaction.md`, « Chiffres et affirmations
  retirés »).

---

## 2. À préciser (le chiffre est sourcé, mais la phrase le fait mal lire)

### P1. Les tours cellulaires : trois durées sans le mot qui les sépare

- **Texte :** étape 6 (l. 93-94), « les tours cellulaires tiennent souvent de 2 à 4 heures sur leurs batteries » ;
  note « Les tours cellulaires pendant une panne » (l. 621-624), « Sur de grosses batteries, une tour cellulaire tient
  de 16 à 24 h ; un opérateur annonce de 4 à 10 h ».
- **Source :** CBC 2018 (`19-cbc-2018-batteries-tours-cellulaires.md`) : les trois valeurs y sont, chacune avec sa
  condition. « two hours to four hours » est la durée des batteries **ordinaires** (un chercheur de Simon Fraser) ;
  16 ou 24 h, les grosses batteries ; 4 à 10 h, l'opérateur TELUS, batteries et génératrices ensemble. L'étape a
  perdu « sur des batteries ordinaires » quand la valeur est montée de la note (19 octobre) : lus côte à côte, 2 à 4 h
  et 16 à 24 h se contredisent. Rang : source de presse, aucune valeur officielle au dossier (CRTC illisible).
- **Note, « des milliers de gens ont perdu le cellulaire » :** la page dit « thousands […] with little or no
  cellphone service », et les opérateurs disent que le réseau tenait avec un signal plus faible : « peu ou pas de
  service » plutôt que « perdu ».

### P2. L'hypothermie grave « sous 28 °C de température buccale » (doutes 1 et 2 de la paramédic)

- **Texte :** Signes d'échec (l. 331).
- **Ce qui le porte :** Québec.ca (`04-quebec-ca-hypothermie.md`, source officielle, règle 2) met bien « Arrêt des
  frissons » dans l'hypothermie grave, sous 28 °C de température **buccale** ; la page `froid` dit la même chose.
- **Ce qui le contredit :** WMS (`03-wms-hypothermie.md`, l. 19) : « Shivering ceases at and below a core
  temperature of approximately 30 °C », hypothermie modérée ; « Oral temperatures are useful only to rule out
  hypothermia » (l. 65). Le ch. 25 (l. 69-74) suit la WMS : frissons faibles ou arrêtés = modérée, 28 à 32,2 °C. La
  ligne du ch. 3 mêle aussi les signes de la modérée de Québec.ca (« parle mal », « ne coordonne plus ») à la grave.
- **Ce qui compte pour le geste :** aucun. Le chiffre « buccal » ne se lit pas avec un thermomètre de maison, et le
  geste (la vie est en jeu, ne pas frotter, ch. 25) ne change pas. La contradiction entre le ch. 25 et le couple
  ch. 3 et page `froid` est à régler à une seule place.

### P3. Étape 13 : l'auto et le compte des gens, perdus en route vers le ch. 2

- **Texte :** l. 152-156, « dans l'auto stationnée dehors. Avant de démarrer le moteur, dégager le tuyau
  d'échappement à la pelle […] Ensuite, faire les étapes 4 à 8 du ch. 2 ».
- **Ce qui manque, avec sa source :** le ch. 2, étape 3, donne le fait propre au danger : la neige que le vent
  accumule rebouche le tuyau pendant qu'on est assis dedans ; dégager avant chaque redémarrage, et entrouvrir une
  fenêtre. Le ch. 3 garde seulement le premier dégagement, et à la maison (le ch. 2 met l'auto au chalet). Le compte
  des gens dehors (ch. 2, étape 2 ; Kidde, « Do a head count ») n'est ni dans la série ni dans le renvoi « étapes 4
  à 8 ». Un danger déplacé qui perd son fait propre (cadre, « Le vérificateur technique »).

### P4. Étape 1 : le bris n'est pas forcément sur l'une des trois pièces

- **Texte :** l. 43-44, « S'il est enclenché, le bris est à l'entrée électrique de la maison, sur l'une de ces trois
  pièces ».
- **Source :** Hydro-Québec (`04-hydro-quebec-entree-electrique.md`) dit que le mât, le col-de-cygne et le support
  d'isolateurs sont au client et qu'Hydro-Québec ne rebranche pas avant leur réparation. Elle ne dit pas que le bris
  est forcément là : la fiche note que la page « ne précise pas la propriété des fils de branchement eux-mêmes ». Le
  câble du poteau peut être arraché seul. Le geste (prévoir une longue panne dès qu'on voit le mât brisé) reste juste.

### P5. L'avertisseur qui ne sonne pas : « des jours » ici, « des heures » à la page `co`

- **Texte :** étape 5 (l. 74-75), « l'avertisseur peut ne pas sonner pendant des jours » ; page `co`, « S'il y en a
  peu dans l'air, l'avertisseur peut prendre des heures avant de sonner ».
- **Source :** INSPQ (`02-inspq-avertisseurs-co-delais.md`, tableau 1) : aucune alarme avant 30 jours à 30 ppm ;
  60 à 240 minutes à 70 ppm. Les deux pages ont raison, chacune pour une concentration ; le doute 3 de la paramédic
  vient de l'écart. À dire pareil aux deux places.

---

## 3. NON RETROUVÉ (aucune source au dossier)

| # | Ligne | Chiffre ou fait | Ce qu'on a cherché |
| --- | --- | --- | --- |
| N1 | 12 | « qu'elle dure six heures ou **cinq semaines** » | Fiches du verglas de 1998 (`10-schl-…`, `00-hydro-quebec-indice-de-continuite.md`) : aucune durée de panne |
| N2 | 244 | « un réfrigérateur en panne monte à **6 ou 8 °C** » | Seulement dans la note de rédaction de `04-sante-canada-botulisme-type-e.md` (l. 27-28), pas dans un extrait. Le fait qui compte (le type E pousse dès 3 °C) est sourcé |
| N3 | 66 | « il reste **quelques minutes** de pression » (puits) | Aucune fiche ; la réserve d'un réservoir sous pression est un volume, pas un temps. Même phrase au ch. 6, l. 228 |
| N4 | 124-125 | « **Deux cartons** et une couverture […] plus chaud que **quatre couvertures** » | Déjà « sans source enregistrée » (passe du 16 octobre) ; la planche 03-09 le dessine |
| N5 | 473 | « On la fabrique en **dix minutes** » (marmite) | Aucune fiche ; `14b-anses-bacillus-cereus.md` porte seulement l'avertissement |
| N6 | 540 | « armer le ressort de **deux ou trois tours** » (lanceur) | Aucune fiche de lanceur au dossier |
| N7 | 471 | « un redoux de **trois jours** fait dégeler la réserve » | Aucune fiche ; venait du ch. 1 sans source |
| N8 | 414 | le chiffon « tient **quelques semaines** » | Aucune fiche |
| N9 | 435 | les colliers sur la chambre à air : « Ça tient la pression d'une maison » | Aucune fiche ; pas de chiffre, mais une promesse de tenue |

---

## 4. Rappels de sécurité, dangers croisés, renvois, espèces

**Rappels de `CLAUDE.md` qui s'appliquent : tous là, chacun dans son étape.** 74 °C (étape 31, et l'ours et le
phoque à l'étape 34) ; foie et reins de cervidés, cadmium (étape 31) ; trichine, ni sel ni fumage ni gel (étape 34) ;
tularémie, gants (étape 31) ; botulisme de type E dès 3 °C (étapes 27 et 30) ; le botulisme ne change ni l'odeur ni
l'apparence, sans y goûter (étape 27) ; mal de caribou (étape 34) ; génératrice dehors, jamais au garage ni sous la
galerie, 6 m de tout bâtiment (étape 16 ; étape 5 pour la maison). La thuyone ne s'applique pas.

**Dangers qui tirent en sens contraire, et ce qui tranche :** le feu qu'on fait durer la nuit contre le CO (RNCan,
`16c-rncan-refoulement-braise-effet-de-tirage.md` : l'air reste ouvert) ; l'avertisseur dans la chambre froide
(Kidde et Québec.ca, 4,4 °C : la pièce chauffée) ; la génératrice la nuit (MAPAQ, 24 à 48 h : attendre le jour). Un
seul croisement sans son fait : l'auto contre le froid et le CO (P3). La lampe à graisse (étape 5 et section 7)
repose sur la décision 1 de JP, sans source sur le tirage de la pièce du poêle ; je ne la rouvre pas.

**Renvois :** ch. 2 (étapes 4 à 8, 4, 43), 5, 10 (étapes 38 et 39), 14, 16, 19, 22, 25, 32, 39, 48, 68 à 74, 77, 82,
83, 85, 112 : chacun pointe vers le bon sujet, aux nouveaux numéros. À préciser : étape 39, « (ch. 10) » devrait dire
« ch. 10, étapes 27 à 35 » (E4). Planches 03-08 à 03-13 : les six fichiers existent dans `images/planches-src/`.
La légende de 03-09 dessine le journal « en boules » ; la source (McDonald 1933) dit « a layer ».

**Espèces :** orignal, cervidé, lièvre, ours, phoque, sapin, épinette ; noms d'usage, aucun nom latin.

---

## 5. Confirmé à la source (sans écart)

| Où | Valeur ou fait | Source |
| --- | --- | --- |
| Étape 1 | Hydro-Québec ne répare pas le mât, le col-de-cygne, le support d'isolateurs, et ne rebranche pas avant | `04-hydro-quebec-entree-electrique.md` |
| Étape 2 | Éteindre ce qui marchait ; débrancher l'électronique (surtension) ; une lampe par étage | `04-quebec-ca-panne-de-courant.md` |
| Étape 4 | Conduite sans pression qui aspire par ses fuites ; ébullition 1 min ; 4 L par personne et par jour, dont 2 L à boire, 3 jours | `10-reseau-depressurise-intrusion-par-les-fuites.md` ; `02-inspq-avis-ebullition.md` ; `23-quebec-reserve-eau-trois-jours.md`, `13-canada-trousse-urgence.md` |
| Étape 5 | 7 ans (84 mois), 10 ans (Kidde) ; 2 m ; 4,4 °C ; porte du garage attenant | `04-quebec-ca-plomberie-et-avertisseurs.md` (B, C) ; `15b-kidde-…` ; `15b-quebec-avertisseurs-monoxyde-plage-temperature.md` |
| Étape 6 | Le texto encombre moins, passe quand le service téléphonique est interrompu | `11-isde-rester-connecte-messages-texte.md` |
| Étape 7 | Feu couvant qui fuit même porte fermée, la nuit ; cheminée froide qui refoule ; torche de papier, fenêtre du côté du vent | `16c-rncan-refoulement-braise-effet-de-tirage.md` |
| Étape 10 | Papier journal entre deux couvertures | `03-mcdonald-1933-journal-entre-deux-couvertures.md` |
| Étape 14 | Pelle et chaudière de métal, couvercle, dehors, 1 m de tout, 7 jours | `04-quebec-ca-plomberie-et-avertisseurs.md` (D) ; page `incendie` |
| Étape 16 | 6 m de tout bâtiment, échappement à l'opposé | `10-sante-canada-generatrice-distance.md` |
| Étapes 17, 20 | Disjoncteur à OFF, appareils dans la génératrice ; 1 h d'arrêt par 8 h ; plein moteur froid | `04-quebec-ca-panne-de-courant.md` |
| Étapes 21, 23 | 5 °C (40 °F, 4,4 °C arrondi du côté prudent) pour la vidange ; pompe du puits, réservoir sous pression ; chauffage à eau chaude qui se vide mal | `04-purdue-extension-plomberie-panne-hiver.md` ; `03-tuyaux-geles-pression-et-degel.md` |
| Étape 22 | 14 °C, 1 °C à l'heure, 9 h | Arithmétique juste |
| Étape 24 | 0,5 L réservoir, 1 L cuvette, 2 L laveuse, 1 L lave-vaisselle, 0,5 L par évier, lavabo, baignoire, douche, drain, siphon de laveuse | `02-quebec-fiche-technique-panne-plomberie.md` (voir la remarque R2) |
| Étapes 27, 28, 30, 32 | 0 à 4 °C ; 4 à 6 h ; 6 h ; 48 h plein, 24 h à moitié ; listes à jeter et à garder ; cœur dur, 4 °C ; mijoteuse | `04-quebec-ca-aliments-panne-courant.md` |
| Étapes 27, 30 | Type E dès 3 °C ; plusieurs jours entre 3 et 10 °C (FDA : 2 jours à 6 à 10 °C) | `04-sante-canada-botulisme-type-e.md` ; `65-fda-fumage-a-froid-plafond-32c.md` |
| Étapes 31, 34 | 74 °C ; tularémie qui survit au gel | `04-sante-canada-temperatures-cuisson.md` ; `13-tularemie-inactivation-thermique.md` |
| Étapes 36 à 38 | 18 °C ; ouvrir l'entrée d'eau et les robinets ; chauffe-eau plein avant le courant ; chauffage peu à peu | `02-quebec-fiche-technique-panne-plomberie.md` ; `04-quebec-ca-panne-de-courant.md` |
| Section 7, fenêtres | Double vitrage : 10 fois la perte d'un mur bien isolé ; 2,5 cm ; 10 % au plus ; surtout par la boucle ; 10 cm de chevauchement | `03-cornell-cce-traitements-fenetres-economie-energie.md` et son PDF (p. 1, 2, 4) |
| Section 7, sonde | Deux fois plus épais, quatre fois plus long ; 100 °C au niveau de la mer | `01-fourier-temps-de-chauffe-et-epaisseur.md` ; physique |
| Section 7, 12 V | −18 °C, moitié de la capacité ; 85 %, −52 °C ; 40 %, −15 °C | `18b-trojan-batteries-plomb-froid-et-charge.md` |
| Section 7, nouvelles | Onde AM la nuit, stations à des centaines de kilomètres | `03-uitr-p1321-ondes-am-nuit.md` |
| En plus, maison de neige | Trou près du sommet ; plafond 60 à 90 cm sous le sommet ; 10 à 20 °C, 2 ou 3 °C sans doublure ; côte est de la Terre de Baffin | `03-boas-1888-maison-de-neige-aeration-et-doublure.md` |
| En plus, glace | 1 kg de glace = 1 kg d'eau de 0 à 80 °C (79,8) | `68-openstax-chaleur-latente-fusion-glace.md` (fiche du ch. 1) |
| En plus, gel de la viande | Tunnel à −30 °C, air soufflé ; demi-carcasse 16 à 20 h ; viande en boîte environ 4 h ; gelée à −12 °C au centre | `68-fao-entreposage-frigorifique-viande-congelation.md` |
| En plus, tours | 16 à 24 h, 4 à 10 h, Ottawa, septembre 2018, génératrices amenées aux tours | `19-cbc-2018-batteries-tours-cellulaires.md` et son HTML (voir P1) |

**Remarques :**

- **R1.** Le 2 m de Québec.ca (étape 5) est plus prudent que le guide Kidde (« within 5 ft », 1,5 m) : la source
  officielle prime, le chapitre la suit.
- **R2. Les deux sources de l'antigel ne disent pas la même chose pour la laveuse et le lave-vaisselle.** Purdue,
  relu le 29 octobre 2026 (https://www.purdue.edu/engineering/ABE/INPREPared/protect-your-plumbing-and-appliances-during-a-winter-power-failure,
  section « Appliances ») : « Drain the pumps on the washing machine and the dishwasher. Do not put antifreeze in these
  appliances. » La fiche de Québec.ca donne 2 L et 1 L. Le chapitre suit Québec.ca (règle 2) : rien à changer, mais
  la fiche Purdue du dossier (`04-purdue-…`) cite « Do not put antifreeze in these appliances » sans dire lesquelles.
  Le rédacteur peut y recopier la phrase entière.

---

## Liste de contrôle (cadre, « Le vérificateur technique »)

- [x] **Chaque chiffre, ratio, température, durée et quantité retrouvé dans une page de `/sources`, les officielles
  d'abord.** Fait : section 5 ; les écarts ont leurs deux valeurs (section 1) ; 9 NON RETROUVÉ (section 3).
- [x] **À une refonte, comparer au texte d'avant et vérifier seulement ce qui est neuf ou change de sens.** Fait en
  partie, et volontairement : aucun `suivi/03-technique.md` n'existait, et le brief demandait chaque chiffre, alors
  tout le texte est passé. Les chiffres venus du ch. 1 le 28 octobre ne sont pas rouverts, sauf N7 (sans source au
  ch. 1 non plus).
- [x] **Les rappels de sécurité qui s'appliquent sont là, chacun dans son étape.** Fait : les neuf vérifiés, huit
  s'appliquent, tous présents (section 4).
- [x] **Quand deux dangers tirent en sens contraire, une source dit lequel gagne.** Fait : trois croisements
  tranchés par une source ; un qui perd son fait propre (P3).
- [x] **Chaque renvoi pointe au bon endroit, aux nouveaux numéros ; chaque espèce par son nom d'usage, sans nom
  latin.** Fait : un renvoi trop large (étape 39) ; aucun nom latin.
- [ ] **Doutes de fond de A3.** Rien à faire à ce tour : A3 passe après moi. À reprendre au second passage.
- [ ] **Après l'éditeur, relire seulement ce qui change de sens.** Pas encore à faire (second passage).
- [x] **Les doutes des lecteurs nommés dans le brief.** Faits : « Tout chiffre affiché » (E1), les tours cellulaires
  (P1), le bouton d'essai (E2) ; ceux de la paramédic qui touchent le ch. 3 aussi (P2, P5).
- [x] **Aucun fichier touché sauf ce rapport ; rien de commité.**

---

# Seconde passe, après l'éditeur (29 octobre 2026)

- **Texte relu :** seulement ce qui change entre `/tmp/chaine-03-avant.md` et `chapitres/03-panne-majeure-d-hydro-en.md`
  (diff de 798 lignes), avec la liste « Coupé, et pourquoi » et les réponses de l'éditeur (`suivi/03-redaction.md`,
  « Passe de la chaîne ») et `controle.py --avant`. Les numéros de ligne sont ceux du chapitre réécrit.
- **Sources :** celles du dossier, plus une page lue en ligne pour l'insuline (FDA, S1), pas encore enregistrée dans
  `sources/`. Aucun fichier touché sauf ce rapport.

**Bilan.** Les sept écarts et les cinq points à préciser de la première passe sont réglés, sauf E5, réglé à moitié
(B2). Les coupes N1 à N9 enlèvent les chiffres sans source sans toucher un geste. **Deux changements de sens à
corriger** : l'insuline n'est plus protégée du gel (S1), et le nouveau renvoi de la gelure pointe vers un chapitre qui
dit autre chose (S2). Le logigramme dit encore l'ancien sens (S3). Les neuf rappels qui s'appliquent sont là, les
16 sortes de pictogrammes sont identiques avant et après, les six ancres de planche tiennent, et les renvois des autres
chapitres vers les étapes du ch. 3 (ch. 1, 8, 13, 84, 86) pointent encore au bon endroit.

## A. Changé de sens : à corriger

### S1. Étape 33 : l'insuline reste au réfrigérateur, où elle peut geler

- **Texte (l. 286-291) :** « Mettre les médicaments **qui ne vont pas au réfrigérateur** dans la pièce chauffée » ;
  l'insuline porte `[À VÉRIFIER : le donner ou non quand il n'a pas pu rester au froid.]`.
- **Ce qui a changé :** avant, tous les médicaments allaient dans la pièce chauffée, parce que « le danger pour eux est
  le gel ». Maintenant, ceux du réfrigérateur, l'insuline en tête, restent dans une cuisine fermée (étape 8) qui peut
  descendre sous 0 °C : le chapitre lui-même vidange à 5 °C et prévoit une pièce sous 0 °C (l. 402-403).
- **Source :** FDA, « Information Regarding Insulin Storage and Switching Between Products in an Emergency »
  (https://www.fda.gov/drugs/emergency-preparedness-drugs/information-regarding-insulin-storage-and-switching-between-products-emergency,
  lue le 29 octobre 2026) : les fioles et les cartouches « may be left unrefrigerated at a temperature between 59°F and
  86°F [15 à 30 °C] for up to 28 days » ; insuline gelée : « Do not use » ; « Under emergency conditions, you might
  still need to use insulin that has been stored above 86°F. » Québec.ca (`04-quebec-ca-panne-de-courant.md`) :
  « Avoid taking refrigerated medications if storage was impossible », règle générale, que la FDA précise pour
  l'insuline.
- **Ce que la source permet :** lever le `[À VÉRIFIER]`. L'insuline se garde hors du réfrigérateur entre 15 et 30 °C
  jusqu'à 28 jours, et elle se jette si elle a gelé. Le geste qui la protège est celui d'avant la passe : la pièce
  chauffée. La page est à enregistrer dans `sources/` (règle 1) avant d'écrire ces chiffres.

### S2. Signes d'échec, la gelure : le renvoi ajouté pointe vers le ch. 39

- **Texte (l. 337) :** « Dégeler la peau dans de l'eau à 37 à 39 °C, jamais près du feu, et seulement si elle ne
  risque pas de regeler **(ch. 39)** ». Le geste est juste (WMS, `03-wms-gelures.md`, l. 51 et 66 ; page `froid`,
  point 4).
- **Le renvoi :** le ch. 39 est « Les jeunes enfants ». Sa ligne (l. 213) dit « Réchauffer dans l'eau **tiède**, jamais
  chaude » et appelle la peau blanche et insensible une « engelure profonde ». Le geste de 37 à 39 °C, le regel et
  « aucune autre source de chaleur » sont au **ch. 25, étapes 15 à 22** (section C, « Gelure »), qui vaut pour tout
  le monde. Le renvoi devrait être « ch. 25, étapes 15 à 22 ». L'écart entre « tiède » au ch. 39 et 37 à 39 °C est à
  régler au ch. 39 (pour ailleurs).

### S3. Le logigramme dit encore l'ancien sens

`images/logigrammes/03-panne-hydro.json`, qui s'imprime, contredit maintenant le chapitre : l. 182 « la pièce chauffée
au-dessus de 5 °C » (E7) et « un avertisseur qui répond au bouton », sans la date (E2) ; l. 109, le bouton sans la
date ; l. 236 « rentrer quand l'avertisseur est revenu à la normale », sans les conditions du ch. 2, étapes 4 à 8.
L'éditeur l'a mis « pour ailleurs ». Je le confirme : c'est à corriger avant le montage, sinon la version courte dit
le contraire de la version détaillée.

## B. À préciser (le fait tient, la phrase dit un peu plus que la source)

### B1. « Autre chose que 0 » contre « un chiffre »

- **Texte :** l. 76 et l. 145, « dès que l'afficheur montre autre chose que 0 ».
- **Source :** Kidde (`15-kidde-number-on-display-no-alarm.html`) : « Any time a digital unit displays **a number**
  with or without an alert, assume it senses carbon monoxide. Leave the home ». « Autre chose que 0 » fait aussi
  sortir pour un affichage qui n'est pas un chiffre (un message ou un code, selon le modèle). « Un chiffre plus grand
  que 0 » suit la source mot pour mot. Le geste (sortir, étapes 12 et 13) suit la source et le ch. 1 (l. 91).

### B2. Étape 26 : la pompe de secours, réglé à moitié (E5)

- **Texte (l. 230-232) :** « On compte sur la pompe de secours, mais elle est électrique, elle aussi, et elle s'arrête
  avec l'autre ; seule une pompe sur batterie tourne pendant la panne ».
- **Source :** Ville de Québec (`04-ville-de-quebec-pompe-de-puisard.md`) : en panne, elles « doivent être alimentées
  par une génératrice ou une batterie de secours ». La première moitié dit encore que la pompe de secours s'arrête,
  alors que la pompe de secours la plus courante est justement celle qui a sa batterie. La seconde moitié corrige,
  mais les deux se lisent comme une contradiction : c'est la pompe de secours branchée sur le courant qui s'arrête.

### B3. Remarques sans effet sur un geste

- **l. 506, « l'eau bouillante, à 100 °C » :** « au niveau de la mer » est coupé (A4). Plus haut, l'eau bout un peu
  sous 100 °C ; le fait devient un peu moins juste, sans changer le geste, parce qu'on reste loin au-dessus de 74 °C.
- **l. 103, « Sans cette torche, la cheminée froide refoule » :** le déclencheur passe de « la fumée sort » à « le
  poêle n'a pas chauffé depuis quelques heures ». RNCan (`16c-rncan-…`, p. 40) le permet : sans feu, l'air de la
  cheminée se refroidit, « aucun tirage n'est ainsi possible », et le papier journal la chauffe « jusqu'à ce qu'il
  produise un certain tirage ». La phrase dit « refoule » au lieu de « peut refouler » ; la source décrit une
  installation au sous-sol.
- **l. 302, « rebrancher l'électronique en dernier » :** l'étape passe de 38 à 36, avant l'eau et le chauffe-eau, et
  « en dernier » ne l'est plus. Québec.ca dit seulement « Gradually restore heating equipment » et le chauffe-eau plein
  avant le panneau ; aucun ordre de la source n'est contredit.
- **Tularémie :** le rappel quitte l'étape 31 (la cuisson) pour les étapes 29 et 30 (le premier contact, puis la
  sonde). Il reste dans le chapitre, dans les étapes où on touche le lièvre du congélateur, l'été comme l'hiver
  (l'étape 30 le redit). L'étape 31, où on coupe le lièvre cru pour le cuire, ne le redit plus.

## C. Changé et confirmé à la source

| Où | Ce qui change | Source |
| --- | --- | --- |
| Étape 1 | Seul le mât reste ; Hydro-Québec ne le répare pas et ne rebranche pas avant (P4 réglé) | `04-hydro-quebec-entree-electrique.md` |
| Étape 3 | « Le dernier moment où on sait que le courant marchait » | ch. 1, l. 90 et 106 |
| Étape 4 | « Il ne reste que l'eau du réservoir sous pression » (N3 coupé, sans chiffre) | Purdue, réservoir sous pression |
| Étape 5 | Le bouton vérifie la pile et la sirène, pas la cellule ; date au dos (E2) | `15b-kidde-…`, section 1 (« electronic circuitry, horn, and battery ») |
| Étape 5, série CO, Points de contrôle | Un chiffre affiché fait sortir tout le monde, comme au ch. 1 (E1) | `15-kidde-number-on-display-no-alarm.html` ; ch. 1, l. 91 |
| Étape 5 | « Des heures, et des jours quand il y en a très peu » (P5) | `02-inspq-avertisseurs-co-delais.md` : 60 à 240 min à 70 ppm, aucune alarme avant 30 jours à 30 ppm |
| Étape 5 | « Ni chaufferette, même faite pour l'intérieur », sans avertisseur fiable | Plus strict que Québec.ca (« conçus pour l'intérieur »), dans le seul cas où le CO ne se mesure plus |
| Étape 5 | La condition de la lampe à graisse quitte l'étape | Elle reste à la section 7, l. 571, avec `{!co}`, là où on l'allume |
| Étape 6 | « Sur des batteries ordinaires », 2 à 4 h ; note des tours coupée (P1) | `19-cbc-2018-batteries-tours-cellulaires.md` |
| Série 6 h | L'appareil médical en tête, même contenu | (déjà vérifié) |
| Étape 11 | Le 5 °C sort de la condition pour rester (E7) | `02-inspq-seuils-temperature-interieure.md` |
| Étapes 12 et 13 | Compter les gens ; fenêtre du côté opposé au vent ; tuyau dégagé avant chaque redémarrage ; coucher sur le côté, SOS ou balise (P3) | ch. 2, étapes 2, 3 et 4 (l. 55-65) |
| Étape 19 | « Revienne à −18 °C » | `10-sante-canada-salubrite-urgence.md` (« -18 °C (0 °F) ou moins ») |
| Étape 27 et Points de contrôle | Trier dès 4 °C, ou à 6 h au plus tard | Québec.ca : 0 à 4 °C, 4 à 6 h ; « Pour toute panne de plus de six heures, un tri des aliments s'impose » (`01-`, `10-`, `68-quebec-…aliments`) |
| Étape 27 | Le type E fait sa toxine dès 3 °C, « donc même sous 4 °C » (N2 coupé) | `04-sante-canada-botulisme-type-e.md` ; déduction juste de deux chiffres sourcés |
| Étape 37 | Refermer le robinet de vidange, enlever le boyau, retirer chiffons et sacs, rouvrir l'entrée avec les robinets ouverts | Étape 23 et section 7 du chapitre ; Québec.ca : « Open the leader inlet as well as all the faucets » |
| Étapes 35 à 38 | Le chauffage passe avant l'eau ; 18 °C ; chauffe-eau plein avant le courant | `02-quebec-fiche-technique-panne-plomberie.md` ; `04-quebec-ca-panne-de-courant.md` |
| Étape 39 | Bouillir jusqu'à la confirmation, puis 5 min ; ch. 10, étapes 27 à 35 (E4) | `04-quebec-ca-panne-de-courant.md` ; ch. 10, étapes 27 à 35 (analyse et chlore) |
| Signes d'échec, hypothermie | 28 °C coupé ; gestes de la page `froid` (P2) | `dangers/partie-1.md`, points 1 et 2 |
| Signes d'échec, gelure | « Gelure », 37 à 39 °C, sans regel, jamais près du feu (E3) | `03-wms-gelures.md` ; page `froid`, point 4 (renvoi : S2) |
| Section 7, sans thermomètre | Recongeler si cristaux ou très froid au toucher, sinon jeter (E6) | `10-sante-canada-salubrite-urgence.md` (recongélation, « En cas de doute, jetez ») |
| Section 7, viande dehors | Désosser et couper mince, venu de la note coupée | `68-fao-entreposage-frigorifique-viande-congelation.md` |
| Section 7, eau | Le réservoir de la toilette, seulement avant l'antigel ou le lave-glace | Section 7 du chapitre (le lave-glace va au réservoir, l. 416-418) |
| Coupes N1 à N9, notes, exemple, plaque | Chiffres sans source ou sans geste, retirés ; aucun geste ni rappel perdu | `controle.py --avant` : les chiffres disparus sont exactement ceux de la liste de l'éditeur |
| Partout | Pictogrammes : mêmes 16 sortes, mêmes nombres ; ancres de 03-08 à 03-13 et du logigramme retrouvées | `placements-tome-1.json` |

**Rappels de sécurité.** 74 °C (étapes 31 et 34) ; foie et reins de cervidés (étape 31) ; trichine, ni sel ni fumage
ni gel (étape 34) ; tularémie, gants (étapes 29 et 30) ; type E dès 3 °C (étapes 27 et 30) ; le botulisme ne change
ni l'odeur ni l'apparence, sans y goûter (étape 27) ; mal de caribou (étape 34) ; génératrice jamais au garage ni sous
la galerie (étape 16). Tous là. La thuyone ne s'applique pas.

## D. Réponses aux doutes de fond (A3, et A1)

| Doute (lignes d'avant la passe) | Réponse |
| --- | --- |
| l. 93-94 et 621, les tours | Réglé (P1). |
| l. 60-65, l'eau de la baignoire | NON RETROUVÉ : aucune fiche ne dit si l'eau d'une baignoire se boit sans bouillir. L'étape dit que l'eau tirée avant la baisse n'a pas besoin de bouillir, sans parler de la propreté du contenant. |
| l. 81-83, chandelle contre lampe à graisse | Aucune source au dossier ne compare le monoxyde des deux flammes. La lampe repose sur la décision 1 de JP ; pas rouvert (première passe, section 4). |
| l. 71, la petite pièce sous 4,4 °C | Sans poêle, aucune flamme n'est permise dans la maison (étape 5 ; la lampe seulement dans la pièce du poêle, l. 571), alors l'avertisseur n'y guette que le CO venu du dehors. Le ch. 2, étape 7, dit de laisser la pièce remonter avant de se fier à son silence. Aucun geste propre au dossier : NON RETROUVÉ. |
| l. 76 et 317, ce que l'afficheur montre | Kidde dit « un chiffre » (B1). Aucun extrait au dossier ne donne le seuil sous lequel l'afficheur reste à 0 ; « un zéro ne prouve pas l'absence de CO » est la lecture du rédacteur, pas un extrait. La page Kidde dit seulement que les capteurs ordinaires ne sonnent pas sous 30 ppm et que les « ultra-sensitive » montrent moins. |
| l. 121-134, la distance de l'abri au poêle | NON RETROUVÉ au dossier pour ce chapitre. |
| l. 154, garder dehors à −35 °C | Réglé par le renvoi : le ch. 2, étapes 3 et 4, met les gens au chaud chez un voisin ou dans l'auto, fenêtre entrouverte. |
| l. 191-193, l'essence et le poêle allumé | NON RETROUVÉ : aucune fiche ne dit quoi faire du feu déjà allumé. |
| l. 222, 382, 410, le réservoir et le méthanol | Le réservoir : réglé (l. 387-388). Le lave-glace ne va que dans les siphons et le réservoir, jamais dans un tuyau d'eau à boire (l. 416-418). Le rinçage au rétablissement : NON RETROUVÉ. |
| l. 237-240 et 319, 6 h même à 4 °C ou moins | La source fixe le tri à 6 h sans condition de température (« Pour toute panne de plus de six heures, un tri des aliments s'impose ») ; les listes à jeter sont celles de la même page. L'étape et le tableau ont maintenant le même déclencheur. |
| l. 284-287, l'insuline | S1 : FDA, 15 à 30 °C jusqu'à 28 jours, jamais gelée. |
| l. 120 et 322, les renvois | l. 121, ch. 39 (Les jeunes enfants) : juste pour les joues des enfants. l. 327, ch. 25 : juste. Le renvoi ajouté à la l. 337 est à changer (S2). |
| l. 186 et 299, la normale, le rebranchement, 18 °C | −18 °C : Santé Canada. 18 °C : Québec.ca. Le seuil où on rebranche le congélateur : NON RETROUVÉ ; le seul critère de source est le cœur des paquets « still hard » (Québec.ca). |
| l. 396-397, le verre qui gèle | Écart avec la source : Purdue fixe le seuil à 40 °F (4,4 °C) dans la pièce, parce que le tuyau est plus froid que l'air ; une pellicule de glace dit que la pièce est déjà sous 0 °C, donc après ce seuil. Le repère sans thermomètre arrive tard. Pas un changement de l'éditeur, mais le doute tient. |
| l. 489-491, la durée dans la marmite | NON RETROUVÉ : aucune durée au dossier. L'ANSES (`14b-…`) dit de refroidir vite et de mettre au froid en 2 h, ce que le chapitre remplace par « manger tout de suite ou remettre au bouillon ». |
| l. 507-513, la batterie près du poêle, le fusible, l'adaptateur | L'hydrogène et le fusible : NON RETROUVÉ au dossier. L'adaptateur : un adaptateur qui s'enfiche dans l'allume-cigarette n'a pas de fils à dénuder ; c'est un geste sans chiffre, à régler par le rédacteur. |
| l. 519-521, le repère de 85 % et 40 % | Il est au dossier : Trojan (`18b-trojan-…`, tableau 2), tension à vide au multimètre, 12,62 V à 90 %, 12,50 V à 80 %, 11,96 V à 40 % (tension par élément × 6, comme la source le dit). |
| l. 445-449, la conduite de refoulement gelée | NON RETROUVÉ : aucun signe au dossier. |
| A1, l. 497 contre l. 502 | Pas d'écart de fait : le bouilli n'a pas de durée, et l'ours et le phoque demandent les 74 °C mesurés (rappel de la trichine). Les deux phrases se tiennent. |

## Liste de contrôle, seconde passe (cadre, « Le vérificateur technique »)

- [x] **Comparer au texte d'avant et vérifier à la source seulement ce qui est neuf ou change de sens.** Fait : diff
  complet, liste des coupes, `controle.py --avant` (les chiffres disparus sont ceux que l'éditeur a nommés). Aucun
  chiffre qui change seulement de place n'est rouvert.
- [x] **Chaque chiffre nouveau retrouvé dans une page de `/sources`.** Fait : −18 °C, cristaux de glace, 37 à 39 °C,
  le bouton, 6 h, 4 °C, 5 min. Un seul est hors du dossier : l'insuline (FDA, lue en ligne, à enregistrer).
- [x] **Les rappels de sécurité qui s'appliquent sont là, chacun dans son étape.** Fait : huit sur huit (la
  tularémie passe de l'étape 31 aux étapes 29 et 30, B3).
- [x] **Quand deux dangers tirent en sens contraire, une source dit lequel gagne.** Fait : le froid contre le CO
  dehors (ch. 2) ; un croisement nouveau, l'insuline entre le froid et le gel (S1), tranché par la FDA.
- [x] **Chaque renvoi pointe au bon endroit, aux nouveaux numéros ; aucune espèce sans son nom d'usage.** Fait : un
  renvoi faux, ajouté par la passe (S2) ; ch. 10, étapes 27 à 35, et ch. 2, étapes 2 à 8, justes ; les renvois des
  ch. 1, 8, 13, 84 et 86 vers le ch. 3 tiennent ; aucun nom latin ajouté.
- [x] **Doutes de fond de A3 (et A1) vérifiés à la source.** Fait : section D ; neuf NON RETROUVÉ au dossier.
- [x] **Ancres de planche et pictogrammes.** Fait : six ancres et celle du logigramme retrouvées ; pictogrammes
  identiques. Le logigramme lui-même est à corriger (S3).
- [x] **Aucun fichier touché sauf ce rapport ; rien de commité.**
