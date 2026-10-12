> **Renuméroté une deuxième fois le 27 septembre 2026** (agriculture au tome 5) : chapitre 107 avant cette date. Table : plan/renumerotation-2.json.

> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 88. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 88, Trempe et travail du métal à chaud

- **Tome :** 4 — Conserver et réparer
- **Fichier :** `chapitres/88-trempe-et-travail-du-metal-a.md`
- **Poste :** rédacteur (rôle 2)
- **Date :** 2026-09-20
- **Ampleur :** **7 401 mots utiles pour les sections 1 à 9**, 8 314 avec la section 10, marquage et
  URL retirés. Mesuré exactement comme les voisins : ch. 82 à 5 492, ch. 80 à 6 334, ch. 73 à 5 895.
  **Au-dessus de la fourchette du mandat (2 500 à 5 000) et au-dessus des voisins.** Justification et
  pistes de coupe en section 7 de cette fiche.
- **Gabarit :** les dix points, dans l'ordre, avec les titres du gabarit. Procédure numérotée
  conservée : 53 étapes en huit sous-sections A à H. Ce n'est pas un chapitre de référence.
- **Encadré DANGER :** oui, six blocs.

---

## 1. Le problème central de ce chapitre, à lire avant le reste

**Aucune source officielle canadienne ne publie les paramètres du traitement thermique.** Ce n'est
pas un défaut de recherche, c'est la structure du corpus : le CCHST, la CNESST, Québec.ca et
Ressources naturelles Canada écrivent sur les **dangers** des procédés industriels, pas sur leurs
**réglages**. La seule page qui traite nommément de la trempe —
`sources/88-cchst-traitement-thermique-trempe.md` — contient **une** valeur numérique dans toute la
fiche : l'huile de trempe qui dépasse 100 °C.

Le détail de ce qui a été cherché et non trouvé est dans
`sources/88-NON-OBTENUES-pages-cherchees-sans-succes.md`, avec les domaines interrogés.

**La décision du rédacteur, et c'est la décision structurante du chapitre :** publier **zéro
température de chauffe**, et remplacer le thermomètre par quatre essais qui se lisent sans
instrument.

| L'instrument qu'on n'a pas | Ce que le chapitre met à la place | Pourquoi ça tient |
| --- | --- | --- |
| Thermomètre / thermocouple | **L'aimant** — l'acier cesse d'y coller au bon moment | Le lecteur n'a pas besoin du nombre, il a besoin du **seuil**, et le seuil se manifeste tout seul |
| Duromètre | **La lime neuve** — elle glisse ou elle mord | Résultat binaire, pas d'interprétation |
| Fiche technique de l'acier | **Le coupon d'essai** sacrifié dans la pièce même | On ne peut pas connaître l'alliage d'une ferraille, on peut le **tester** |
| Four à paliers | **L'ordre des couleurs de revenu** | L'ordre est invariable même si les températures sont inconnues |

**Conséquence à porter à l'éditeur :** si quelqu'un, au montage, trouve une table de températures
« qui traîne partout sur Internet » et l'ajoute pour faire plus complet, il détruit la cohérence du
chapitre **et** il recrée exactement le scénario du 71 °C du ch. 63 — à une différence près, qui
aggrave le cas : au ch. 63, la bonne valeur existait chez le MAPAQ et n'avait pas été cherchée. Ici,
elle n'existe nulle part dans le corpus officiel, et un nombre ajouté aurait toutes les apparences
d'un nombre validé.

## 2. Les chiffres `[À VÉRIFIER]`

Onze entrées, toutes parce que la source officielle **n'existe pas au dossier**, aucune parce qu'elle
n'a pas été cherchée.

| # | Chiffre ou affirmation manquante | Où dans le chapitre | Ce que le chapitre fait à la place | Qui doit trancher |
| --- | --- | --- | --- | --- |
| 1 | **Correspondance couleur ↔ température**, chauffe et revenu | §3, §5-C ét. 16, §5-F ét. 39-40, §6 | Ne publie que l'**ordre** des couleurs, jamais un degré | Forgeron. **C'est le trou le plus gros du chapitre** en volume, et curieusement le moins grave : le travail se fait très bien à la couleur seule |
| 2 | **Point de perte du magnétisme** de l'acier | §3, §5-A ét. 5, §5-E ét. 31 | Utilise le **comportement** comme repère, sans publier de degré | Forgeron ou métallurgiste |
| 3 | **Taux de carbone minimal** pour qu'un acier durcisse | §3 | Dit qu'il existe un seuil et ne le chiffre pas | Métallurgiste |
| 4 | **Composition des aciers de récupération** (ressorts, limes, roulements) | §2, §5-A | Refuse d'affirmer quoi que ce soit et impose le coupon d'essai comme **première** étape | Aucun — ce trou est définitif et assumé. Aucune source ne peut dire ce qu'il y a dans une lame de ressort ramassée au dépotoir |
| 5 | **Nombre de cycles** de normalisation (deux ou trois) et de revenu (deux) | §5-D ét. 25, §5-F ét. 41 | Donne les valeurs d'atelier en les déclarant non sourcées | Forgeron |
| 6 | **Temps de maintien** après le décrochage de l'aimant | §5-E ét. 31 | Écrit « quelques secondes » et marque le chiffre | Forgeron |
| 7 | **Concentration d'une saumure de trempe** | §9 | Donne la **saturation** comme critère — « jusqu'à ce que l'eau refuse d'en dissoudre davantage » — et aucun pourcentage | Éditeur. Voir la note sur la convention du sel, §4 de cette fiche |
| 8 | **Point d'éclair des huiles de trempe** | §3, §4, §8 bloc C | Aucun classement des huiles, aucune température de préchauffage du bain | Vérificateur technique. La page du CCHST qui porte les seuils **n'a pas pu être captée** : trois `WebFetch` renvoient l'index du site, le PDF renvoie HTTP 404. **À recapter en priorité** |
| 9 | **Teinte de verre filtrant** contre l'infrarouge de la forge | §4, §8 bloc E | Ne publie aucune teinte ; exige les lunettes CSA Z94.3 et l'écran facial | Hygiéniste. Les « lunettes de forgeron » du commerce ne sont couvertes par aucune source du dossier |
| 10 | **Rayon de dégagement** des matières combustibles | §5-B ét. 10 | Publie la règle sous sa forme sourcée (vider l'aire) et **refuse** la valeur de 10 m qui circule partout | Aucun. Déjà constaté aux ch. 82 et 84 |
| 11 | **Deux mécanismes affirmés par le livre, pas par les sources** : la tête d'outil non trempée qui s'épate au lieu d'éclater (§5-F ét. 42) ; la pression qui monte dans un volume clos chauffé (§8 bloc D). Plus **l'essai de flexion sur tige de laiton** (§5-G ét. 46) | §5-F, §5-G, §8 bloc D | Les déclare comme affirmations du livre, dans le texte | Vérificateur technique |

**Note au vérificateur technique — le piège de ce chapitre n'est pas dans cette liste.** C'est la
valeur de **100 °C** de l'huile de trempe, qui apparaît **quatre fois** (§4, §5-B ét. 13, §6, §8
bloc C) et qui est la seule vraie valeur de procédé du chapitre. Elle doit être recomptée une par
une contre `sources/88-cchst-traitement-thermique-trempe.md`, et surtout **la formulation** doit
être vérifiée : la source dit « plus de 100 °C » **et** « leur température peut augmenter en cours
de trempe ». Les deux moitiés comptent. Publier « 100 °C » tout court transformerait un plafond
mouvant en une valeur fixe, et c'est le genre de glissement qui a produit le 71 °C du ch. 63.

## 3. Ce que le chapitre affirme et qui doit être recoupé

| Affirmation | Source citée | À recouper parce que |
| --- | --- | --- |
| Le **galvanisé** chauffé à la forge dégage de l'oxyde de zinc | CCHST, fumées de soudage : origine « métal peint et galvanisé » | La page vise le **soudage**. Le chapitre transpose à la **forge** en s'appuyant sur le fait que la source décrit un **état de la pièce** et non un procédé. Transposition signalée dans le chapitre, à valider |
| Le **cadmium** est un risque de forge | CNESST, oxyde de cadmium (via ch. 84) | Même transposition : la fiche parle de brasage et de coupage à la torche. Le chapitre l'applique au chauffage d'une visserie plaquée |
| **20 % de mortalité**, 4 à 10 h, 48 h, 150-300 mg/m³ | CNESST, oxyde de cadmium | Repris du ch. 84, **non recapté**. Vérifier que les deux chapitres écrivent le chiffre de la même façon |
| **5 mg/m³**, 24 à 48 h, perte de la tolérance | CNESST, oxyde de zinc | Recapté de première main pour ce chapitre |
| L'**eau sous toutes ses formes** vise la glace, la neige, la condensation et la pince givrée | CCHST, traitement thermique | La source dit « sous l'une ou l'autre de ses formes ». L'énumération est du rédacteur, appuyée sur la formule. À valider |
| Le mécanisme de la **projection** (l'eau se vaporise sous la surface et projette l'huile vers le haut) | — | **Affirmation du livre.** La source donne « risque d'explosion », pas la physique. Le vérificateur doit dire si la description est juste |
| Les **60 minutes** de surveillance se comptent après l'extinction **du feu** | CCHST, travail à chaud | La source dit « après l'arrêt du travail ». Le chapitre déplace le point de départ, **dans le sens de la sécurité**, et le dit. À valider |
| Le gant qu'il faut près du feu et qu'il ne faut pas près d'une meule | CCHST, deux pages du même organisme | Lecture croisée du rédacteur. Les deux pages existent, la synthèse est du livre |
| Un **volume clos** chauffé monte en pression jusqu'à céder | CCHST, contenants vides (ch. 84) | La source vise les **résidus inflammables**, pas la dilatation. Extension assumée, marquée `[À VÉRIFIER]` dans le texte |
| L'**aimant à froid** sépare le fer de tout le reste | ICC, reconnaître les métaux | Recopié. Vérifier que le chapitre ne fait pas dire à l'ICC quoi que ce soit sur l'aimant **à chaud** : ce sont deux usages différents et la confusion est facile |
| La **silice** des briques réfractaires | CCHST, silicose | Le chapitre transpose du chantier au foyer de forge bâti une fin de semaine |
| Les symptômes du **monoxyde** et ceux du **coup de chaleur** se confondent | CCHST, deux pages | Recoupement du rédacteur, qui en tire une conduite unique (sortir, rester dehors). À valider par le vérificateur sécurité |

## 4. Les rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau | Où dans le ch. 88 |
| --- | --- |
| **Génératrice : jamais dans un bâtiment, un garage ou sous un auvent** | §5-B ét. 9 et **encadré DANGER bloc A**, repris intégralement avec son mécanisme, parce que la soufflerie d'une forge hors réseau tourne sur une génératrice |

**Une seule règle du tableau s'applique, et c'est délibéré.** Les huit autres — cuisson du gibier à
74 °C, foie et reins de cervidés, trichinellose, tularémie, thuyone du cèdre, botulisme de type E et
ses deux lignes, mal de caribou — **ne se présentent jamais** dans ce chapitre : il ne produit aucun
aliment, ne manipule aucun animal et n'entre en contact avec aucune plante. Les répéter ici aurait
dilué l'encadré sans rien apprendre à personne.

**Rappels ajoutés qui ne sont pas au tableau de `CLAUDE.md` :**

- **Monoxyde de carbone** — au-delà de la génératrice. La forge elle-même est une source, et
  Québec.ca nomme le barbecue au charbon dans sa liste. Le mot **abri** de la source porte tout le
  bloc A.
- **Fièvre des fondeurs et cadmium** — le couple zinc/cadmium n'existe qu'ici et au ch. 84. **Les
  deux chapitres doivent porter le même bloc, et il faut vérifier au montage qu'ils le disent de la
  même façon.**
- **Eau dans l'huile chaude** — le ch. 88 est, à la connaissance du rédacteur, le seul chapitre du
  livre qui met un bain d'huile au-dessus de 100 °C entre les mains du lecteur. À confirmer contre
  le ch. 67 (fonte des graisses) et le ch. 89 (savon), qui chauffent peut-être des corps gras :
  **si oui, les trois chapitres doivent dire la même chose sur l'eau et l'huile chaude.**
- **Tétanos** — la calamine chaude produit la petite plaie que la fiche MSSS désigne nommément.
  Chiffre repris du ch. 82, à harmoniser avec les ch. 27, 29, 36 et 80.
- **Silice** — briques réfractaires. Probablement aussi au ch. 15 (poêles) : à vérifier.

**Décision sur l'encadré DANGER : six blocs.** C'est un de plus que le ch. 80 et il a fallu s'en
justifier. Chaque bloc porte un mécanisme distinct de mort ou de cécité, et aucun n'est un cas
particulier d'un autre : **A** un gaz qui tue sans prévenir, **B** deux métaux dont l'un se confond
avec l'autre, **C** une explosion de vapeur, **D** une explosion de pression, **E** une projection
dans l'œil, **F** un poison. Retirer un bloc reviendrait à retirer un mécanisme, pas une redite.

**Ce qui a été volontairement laissé hors de l'encadré, et pourquoi :** la **silice** (grave,
incurable, mais cumulative sur des années — traitée en §4), le **tétanos** (traité sous l'encadré,
en renvoi aux ch. 27 et 29), le **coup de chaleur** (traité au §7 avec le monoxyde, parce que ce qui
compte est qu'on ne peut pas les distinguer), la **cataracte par infrarouge** (§3 et §4) et le
**bruit d'impact** de l'enclume (§4, renvoi ch. 83). Mettre huit ou neuf blocs aurait rendu le bloc
A invisible, et le bloc A est celui qui tue le plus vite.

**Sur la convention du sel.** Le chapitre déroge en apparence à la règle « les pourcentages de sel
se calculent sur le poids de la viande », puisque la §9 propose une saumure de trempe. **Le chapitre
le signale explicitement dans le texte** et ne publie **aucun pourcentage** : il donne la saturation
comme critère. Si l'éditeur préfère supprimer la mention de la dérogation plutôt que de la signaler,
le passage doit être réécrit, pas raccourci. **Le salpêtre n'apparaît nulle part** — aucun nitrate
n'a de rôle en traitement thermique. Signalé pour que le vérificateur ne cherche pas la mention.

## 5. Images requises

| # | Sujet | Cadrage | Format |
| --- | --- | --- | --- |
| 1 | Arbre de décision : « cet acier va-t-il durcir ? » → aimant à froid → provenance (ressort, lime, roulement / armature, tuyau, cornière) → revêtu ou nu → coupon à l'eau → coupon à l'huile, avec les culs-de-sac rouges vers le ch. 85 et le ch. 86 | Schéma vectoriel, pas une photo. Même code de couleur que le reste du tome 4. La branche « pièce de levage » se termine sur un cul-de-sac rouge qui renvoie au ch. 86 | **Pleine page**, en ouverture de chapitre |
| 2 | Le poste de forge vu de haut, annoté : foyer, enclume, bac d'huile **couvert**, extincteur ABC du côté de la sortie, seau d'eau **de l'autre côté du foyer**, poste de meulage à l'écart | Plan au sol dessiné, pas photographié. La séparation eau/huile doit se lire d'un coup d'œil, sans lire la légende | **Demi-page** |
| 3 | L'essai de l'aimant, trois vignettes : (a) pièce rouge sombre, l'aimant colle ; (b) même pièce plus claire, l'aimant tombe ; (c) l'aimant au bout de sa tige, **hors du feu** | Trois cadres identiques, même angle, prise **dans la pénombre** pour que la couleur soit lisible | Quart de page |
| 4 | L'essai de la lime : la lime qui glisse sur un coupon trempé, la lime qui mord sur un coupon mou | Deux gros plans, éclairage rasant, copeau visible dans le second cadre | Quart de page |
| 5 | La planche des couleurs de revenu sur une lame polie : jaune pâle, paille, bronze, violet, bleu, dans l'ordre | Bande horizontale, une seule lame photographiée cinq fois au même endroit. **Aucune température imprimée sur la planche**, sous aucun prétexte : c'est l'image la plus susceptible d'être « complétée » au montage | **Demi-page** |
| 6 | Trois cassures de coupon : grain fin gris mat / grain grossier brillant / cassure montrant une fissure préexistante | Trois vignettes macro, même éclairage, étiquette courte sous chaque. **X rouge sur les deux dernières** | Quart de page |
| 7 | Le geste de trempe : entrée verticale, tranchant en premier, mouvement dans l'axe de la longueur ; flèche latérale **barrée** | Dessin, pas photo — une photo de trempe est floue et on n'y voit ni le bac ni le geste. Écran facial visible sur la silhouette | Quart de page |
| 8 | Le revenu différentiel : tranchant dans un fond d'eau, dos chauffé au chalumeau, la couleur qui rampe vers le fil | Photo de trois quarts, prise à hauteur d'établi | Quart de page |
| 9 | Planche de tri de la ferraille : à gauche les candidats (lame de ressort, lime usée, bague de roulement, barre de torsion, dent de herse) ; à droite les refusés (cornière galvanisée, boulon plaqué jaune-vert, armature, tuyau noir, pièce peinte) | Deux colonnes, fond neutre, même distance. **X rouge sur toute la colonne de droite.** Le galvanisé doit être reconnaissable à sa cristallisation | **Demi-page** |
| 10 | Tête de burin saine contre tête champignonnée, avec l'écaille prête à partir | Deux macros de profil, même angle | Quart de page |

**Licences.** Aucune image de ce chapitre ne peut venir du web sans vérification. Les photos 3, 4, 5,
6, 8, 9 et 10 sont à faire par JP à l'atelier — c'est la seule voie qui donne le bon acier et le bon
équipement. Les schémas 1, 2 et 7 sont à dessiner. Inscrire chaque entrée dans `images/credits.md`.

**Note sur l'image 5.** C'est l'image la plus dangereuse du chapitre, et le danger n'est pas
technique : quelqu'un au montage voudra « compléter » la planche des couleurs avec les températures
correspondantes, parce qu'une planche de couleurs sans nombres a l'air inachevée. Elle ne l'est pas.
**Si les températures apparaissent un jour sur cette image, elles doivent venir de la source de la
§8 de la fiche NON-OBTENUES, citée avec son millésime — ou elles ne paraissent pas.**

**Note sur l'image 2.** Elle fait un travail que le texte ne peut pas faire : montrer que le seau
d'eau et le bac d'huile ne sont pas au même endroit. Un lecteur qui voit le plan retient la
séparation ; un lecteur qui lit le bloc C retient qu'il y a un danger, sans retenir la géométrie.

## 6. Renvois vers d'autres chapitres

Tous vérifiés un par un contre les noms de fichiers réels de `chapitres/` le 2026-09-20. Les
chapitres 83 à 89 existaient au moment de la vérification.

| Chapitre | Pourquoi |
| --- | --- |
| 16 — Le feu au chalet | Permis de brûlage, travail à chaud, surveillance |
| 20 — Se déplacer et le carburant | Génératrice, entreposage du carburant |
| 27 — Soigner quand il n'y a personne | Brûlures, plaies souillées, tétanos |
| 29 — Bâtir la pharmacie | Vaccination antitétanique avant la saison |
| 60 — Sève, gomme, écorces | Destination des grattoirs et gouges forgés ici |
| 67 — Pemmican et graisses | D'où viennent les graisses rendues, utilisées ici contre la rouille |
| 79, 80, 81 — De la peau au cuir, babiche, coudre et chausser | Cuir du soufflet et des gants ; racloirs et couteaux croches à fabriquer |
| 82 — Affûter, limer, aiguiser | **Le renvoi le plus important du chapitre** : le fil se fait après le revenu, et un fil bleui à la meule renvoie ici |
| 83 — Scie à chaîne et petits moteurs | Bruit d'impact, protection auditive |
| 84 — Souder, braser, réparer le métal | Assemblage, contenants, fumées. **Le couple ch. 84 / ch. 88 doit être lu ensemble** |
| 85 — Le stock de pièces et de consommables | Acier, charbon, limes, lunettes, disques — et ce qui s'achète plutôt que de se forger |
| 86 — Leviers, poulies, treuils | **Cul-de-sac assumé** : aucune pièce de ce chapitre ne sert à lever ou à tirer |
| 87 — Assemblages bois-bois | Manches et emmanchements des outils forgés |

**Renvois entrants à créer par l'éditeur :**

- Le **ch. 82** doit pointer ici à l'endroit où il parle du fil brûlé au touret. Il le fait déjà dans
  sa version captée (« Redurcir un acier qu'on a brûlé, ou forger un outil neuf : ch. 88 ») : **à
  confirmer que la formulation a survécu à l'édition.**
- Le **ch. 84** doit porter la réciproque : une pièce trempée qu'on soude perd sa trempe dans la zone
  chauffée. Ce point **n'est traité dans aucun des deux chapitres** au moment d'écrire ces lignes.
  **À signaler comme trou entre les deux.**
- Le **ch. 85** devrait lister l'acier de forge et le charbon dans les stocks, et dire lesquels des
  outils du ch. 88 s'achètent plutôt que de se fabriquer.
- Le **ch. 86** doit porter la réciproque du cul-de-sac : « aucune pièce forgée au ch. 88 n'entre ici
  ».
- Le **ch. 89** (savon) : si le chapitre chauffe des corps gras, il doit porter le même avertissement
  sur l'eau et l'huile chaude. À vérifier au montage.

## 7. Relecteur humain

Le ch. 88 **ne figure pas** dans la liste de relecture obligatoire de `CLAUDE.md`. Le rédacteur juge
la relecture externe **nécessaire**, à deux titres et par deux personnes différentes.

**1. Un forgeron, un maréchal-ferrant ou un technicien en traitement thermique** — sections 3, 5 et
6. Motif : onze entrées du chapitre sont des repères d'atelier non sourcés (§2 de cette fiche), et
seule une personne du métier peut dire lesquelles sont justes. Le chapitre publie volontairement
**zéro température**, ce qui est prudent mais laisse le lecteur travailler entièrement à la couleur
et à l'aimant : un spécialiste doit dire si ce vide est plus sûr ou moins sûr qu'une valeur encadrée.

**2. Un hygiéniste du travail ou un conseiller en prévention CNESST** — section 8 en entier. Motif :
**deux des six blocs reposent sur une transposition** — des fiches écrites pour le soudage à l'arc et
pour un atelier industriel avec four et hotte, appliquées à un foyer de cour arrière. Une personne
qualifiée doit dire si la transposition tient, et si la façon de citer des concentrations en mg/m³
devant un public non professionnel est la bonne. Même réserve qu'au ch. 84.

## 8. Notes pour l'éditeur

- **Longueur : 7 401 mots utiles pour les sections 1 à 9**, au-dessus de la fourchette de 2 500 à
  5 000 du mandat et au-dessus des trois voisins mesurés (5 492, 5 895, 6 334). Le chapitre a déjà
  été resserré de près de 500 mots à la relecture du rédacteur, en supprimant les mécanismes répétés
  deux fois dans le même chapitre (§5 renvoie maintenant aux blocs de l'encadré au lieu de les
  redire). **Si l'éditeur doit couper davantage, dans cet ordre :** les listes du §2, la variante
  d'urgence §9, puis les étapes 44, 48 et 50. **Ne pas couper :** l'encadré §8, la sous-section 5-A
  (le coupon d'essai, qui est ce qui rend le reste possible), le tableau des couleurs de revenu de
  l'étape 40, et le bandeau d'avertissement en tête de chapitre.
- **Le bandeau de tête est une décision, pas un ornement.** Un lecteur qui ouvre ce chapitre à la
  page 4 doit savoir immédiatement qu'il n'y trouvera aucune température. Sans le bandeau, il
  cherchera pendant six pages ce qui n'y est pas, puis il ira le chercher ailleurs sans savoir qu'il
  quitte une zone sourcée.
- **Le chapitre refuse deux opérations complètes** : la cémentation en bain de sels (cyanures) et le
  traitement thermique de toute pièce de levage. Ce sont des fermetures, pas des oublis. Si
  quelqu'un veut les rouvrir, il faut une source, pas un encadré.
- **Aucune date de saison ni limite de prises** n'apparaît. Un seul renvoi réglementaire, en §10, pour
  les permis de feu, sans date.
- **Noms latins :** bouleau à papier (*Betula papyrifera*), orignal (*Alces americanus*), omble de
  fontaine (*Salvelinus fontinalis*). **Trois espèces, trois noms latins**, chacun donné une fois. À
  recompter si des espèces sont ajoutées au montage.
- **Aucune dimension impériale** n'apparaît, parce qu'aucune dimension de construction n'est publiée.
  La seule référence de taille du chapitre est physique et non métrique — « aussi épais qu'une pièce
  de dix cents » — et c'est délibéré : le lecteur a une pièce de dix cents dans sa poche, il n'a pas
  de pied à coulisse au bord de la forge.
- **Deux valeurs ont été retirées du texte à la relecture du rédacteur** parce qu'elles étaient
  plausibles et non sourcées : une masse de marteau « de 1 à 1,5 kg » et un rapport de masse
  enclume/marteau. Les deux donnaient l'apparence d'une mesure et n'apprenaient rien : le §4 donne
  maintenant le critère par le geste. Même réflexe qu'au ch. 70 et au ch. 80.

## Notes retirées du chapitre — 23 septembre 2026

- §3, taux de carbone minimal, après « le taux exact est `[À VÉRIFIER]` » : « aucune source officielle canadienne ne le publie. »
- §5, étape 42 (tête d'outil à frapper) : « Que la tête molle s'épate au lieu d'éclater est une affirmation de ce livre, `[À VÉRIFIER]`. »
- §5, étape 46 (essai de flexion sur tige de laiton) : « C'est un essai d'atelier, non documenté par une source officielle, `[À VÉRIFIER]`. »
- §8, bloc D (volume clos) : « Que la pression monte dans un volume clos est une affirmation de ce livre et non une phrase de la source : `[À VÉRIFIER]`. »

## Passe municipalité, code légal et signes — 23 septembre 2026

**Retiré du chapitre (légal ou municipal) :** rien. Le chapitre ne contient plus de règlement, de permis ni de norme ; le renvoi aux permis de feu mentionné plus haut (« en §10 ») n'existe plus dans le texte. « Extincteur ABC » reste : c'est la fonction de l'appareil (ce qu'il éteint), pas un numéro de norme.

**Note de bas de page ajoutée, et sa provenance :**

| Note | Où | Ce qu'elle dit | Source |
| --- | --- | --- | --- |
| [^1] œdème pulmonaire | §8, bloc B (cadmium) | Les poumons qui se remplissent de liquide : difficulté à respirer et douleur à la poitrine, jusqu'à l'essoufflement extrême, la sensation d'étouffer, l'agitation, la toux à crachats rosés, parfois l'écume à la bouche | Début : 88-cchst-fumees-metalliques-zinc-cadmium-plomb.md (oxydes de cadmium). Suite : 88-merck-oedeme-du-poumon.md (page sur l'œdème d'origine cardiaque ; description de l'œdème chimique lui-même `[À VÉRIFIER]` dans la fiche source) |

Signes examinés et laissés sans note parce que le texte les décrit déjà là où ils apparaissent : aimant qui décroche, lime qui glisse ou mord, grain de cassure, couleurs de revenu, acier brûlé, fissure de trempe au son, huile qui crache, fumée blanche du galvanisé, fièvre des fondeurs (symptômes cités au bloc B), coup de chaleur. « Calamine » et « tête champignonnée » : connus d'un homme qui soude.

**Hésitations de la passe paperasse :** aucune des quatre lignes du ch. 88 ne touche au légal ni à un signe non expliqué : laissées telles quelles.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/88-verifications.md`. Dix-sept drapeaux, dix-sept appliqués ; aucun ne reste. Source principale, citée ci-dessous « Navy » : `sources/88-us-navy-steelworker-traitement-thermique.md` (PDF : `sources/88-us-navy-steelworker-14250-ch1.pdf` ; tableaux en image : `sources/88-us-navy-steelworker-tableaux-2-1-et-2-2.png`, `sources/88-us-navy-steelworker-tableau-2-3.png`).

- **Encadré d'en-tête** — réécrit (note A des vérifications) : « Aucune température de chauffe dans ce chapitre […] La seule valeur du chapitre est celle de l'huile de trempe » était devenu faux ; remplacé par « Les températures de ce chapitre disent ce que l'œil regarde, pas ce qu'on mesure : personne n'a de thermomètre à 800 °C ».
- §3, carbone — **valeur ajoutée** : sous 0,3 % la trempe ne fait rien (seule la cémentation donne une peau), durcit bien dès ~0,45 %, dureté plafonnée vers 0,8 %. Navy.
- §3, aimant — **valeur ajoutée** : ~770 °C (1043 K), au rouge cerise. `sources/88-hyperphysics-temperature-de-curie.md` ; recoupement Navy tableau 2-1 (cerise franc 746 °C, rouge vif 843 °C).
- §3, couleurs de revenu — **valeurs ajoutées** : de ~220 °C (jaune pâle) à un peu plus de 300 °C (bleu pâle 321 °C) ; la couleur fonce aussi avec le temps. Navy tableau 2-3 ; effet du temps : `sources/88-wikipedia-revenu-couleurs-et-usages.md` (second rang).
- §5-C, étape 16 — **valeur ajoutée** : chaleur de forge jaune-orange vers 950 à 1000 °C (orange 940, citron 996) ; perception du cerise variable, la flamme fait paraître le métal plus froid. Navy tableau 2-1.
- §5-D, étape 25 — **introuvable** : « répéter deux ou trois fois », le mécanisme du grain et « cassante même bien trempée » coupés ; gardé : la normalisation enlève les tensions du forgeage avant la trempe. Navy. Même nombre non sourcé retiré au §7 (ligne « Cassure grossière ») : « Normaliser deux ou trois fois » devient « Normaliser (étape 25) ».
- §5-E, étape 31 — **corrigé** : « quelques secondes » devient tenir la pièce à la couleur le temps que le cœur rejoigne la surface ; au four, ½ h pour moins de 2,5 cm (1 po) ; à la forge, le coupon décide. Navy tableau 2-2.
- §5-F, étape 39 — **valeurs ajoutées** : 220 °C à un peu plus de 300 °C ; tourner la pièce en pleine lumière. Navy.
- §5-F, tableau des couleurs — **corrigé en partie** : racloir « paille » devient « jaune pâle à paille » ; ciseau, poinçon, ressort inchangés ; ajouté « Un ciseau qui s'écaille repasse au revenu jusqu'au bleu » (Navy) ; ligne couteau sans couleur propre, renvoi au revenu différentiel de l'étape 43 (aucune source). `sources/88-wikipedia-revenu-couleurs-et-usages.md` (second rang) ; Navy.
- §5-F, étape 41 — **introuvable** : « deux cycles de revenu » remplacé par « au four, tenir au moins une heure, une heure de plus par 2,5 cm au-delà du premier ». Navy. Numéro 41 conservé pour ne pas renuméroter les étapes et leurs renvois.
- §5-F, étape 42 — **mécanisme confirmé**, « en deux minutes » coupé. Navy ; `sources/88-cchst-marteaux-et-outils-a-frapper.md`.
- §5-G, étape 46 — **introuvable** : « se plie et revient » coupé ; l'essai se lit par le mécanisme (s'écaille → trop dur, revenu une couleur plus loin ; reste plié → trop mou, retremper). Navy.
- §8, bloc D — **confirmé** : tout volume clos se met à l'évent avant de chauffer ; « même vide, même propre ». `sources/88-osha-volumes-creux-event.md` (page : `sources/88-osha-1910-252-soudage-coupage.html`).
- §9, charbon en fosse — **valeur ajoutée** : 4,5 kg de bois pour 1 kg de charbon dans une grande fosse, petite fosse pire ; seau d'eau au déterrage. `sources/88-fao-charbon-de-bois-en-fosse.md` (page : `sources/88-fao-charbon-fosses-x5328e06.html`).
- §9, saumure de trempe — **corrigé** : « eau saturée » devient ~90 g de sel par litre (7 à 10 % en poids ; ¾ lb par gallon), bain entre 18 et 38 °C ; « eau saturée de sel » devient « saumure » dans la liste des bains. Navy.
- §9, trempe interrompue — **confirmé** (trempe combinée eau puis huile ; temps selon masse et composition). Drapeau retiré. Navy.
- §9, cémentation, durée — **confirmé sans chiffre** : plusieurs heures, profondeur selon le temps ; **corrigé** : la boîte refroidit lentement (la pièce est recuite), puis on réchauffe la pièce seule et on la trempe. Navy.
- §9, cémentation, profondeur — **introuvable** : chiffre absent, phrase gardée sans valeur ; ajouté : seulement sur acier doux, un acier à haut carbone deviendrait cassant jusqu'au cœur. Navy.
- Compression §3 et §4 — 27 septembre 2026 : 1887 mots → 267 mots (§3 : 727 → 118 ; §4 : 1160 → 149, tableau devenu liste de 7 items). §3 réduit au mécanisme en quatre phrases ; coupés : teneurs en carbone (0,3 / 0,45 / 0,8 %), aimant vers 770 °C, plage 220-300 °C des couleurs (reste à l'ét. 39), angles vifs et épaisseurs (ét. 22-23, 30), acier brûlé (ét. 20-21, §7). Matériel gardé : forge (foyer, soufflerie, charbon réunis), enclume, pinces, aimant, lime, bac à couvercle, huile. Matériel coupé : marteau, extincteur ABC (reste à l'ét. 11, §6, §8 C), avertisseur de CO (§6, §8 A), lunettes et écran facial (§8 E), vêtements, gants (ét. 13), protection auditive, seau d'eau (ét. 12, §8 C), sable sec ou cendre (ét. 26, §9), brosse et papier abrasif (ét. 37, §9), coupon d'essai (ét. 4, §9), étiquettes de fil de fer ; colonnes Quantité, Substitution, Négociable. Déplacés : silice des briques réfractaires (couper mouillé, dehors, jamais balayer à sec) dans la phrase « Deux risques réels » après l'encadré du §8, renvoi « (§4) » retiré ; vêtements (le synthétique fond dans la brûlure, pas de revers) en fin du bloc E du §8 ; renvoi « (§4) » retiré à l'ét. 8.
