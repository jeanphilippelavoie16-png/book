> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 41. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 41 : Abats et organes

- **Tome :** 3 — Prélever
- **Fichier :** `chapitres/41-abats-et-organes.md`
- **Rôle :** 2 — Rédacteur
- **Date :** 2026-09-20
- **Longueur :** environ 4 800 mots utiles (7 285 mots bruts, syntaxe de tableau incluse)
- **État :** premier jet complet, prêt pour les rôles 3 (vérification technique) et
  4 (vérification sécurité)
- **⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE** — chapitre nommé dans la liste de `CLAUDE.md`

---

## 1. Chiffres marqués [À VÉRIFIER]

| # | Valeur | Où | Pourquoi ce n'est pas réglé |
| --- | --- | --- | --- |
| 1 | **4 880 µg ÉAR de vitamine A / 100 g de foie de phoque annelé** | §2, §8 point 2 | Valeur USDA pour *Pusa hispida*, espèce **arctique**. Les phoques du Saint-Laurent — commun, gris, du Groenland — n'ont aucune entrée dans le jeu de données. C'est le chiffre le plus lourd du chapitre : il porte seul l'encadré DANGER point 2 et le calcul de 5,4 fois l'AMT d'un enfant. **Priorité 1 du vérificateur technique.** Chercher côté INSPQ, Régie régionale de la santé du Nunavik, ou littérature canadienne sur les aliments traditionnels |
| 2 | **Teneur en vitamine A du foie d'ours noir** | §8 point 2 | **Aucune valeur trouvée nulle part.** Le chapitre le dit explicitement et applique la prudence par analogie de mécanisme. Ne pas « compléter » ce trou avec une valeur d'ours polaire : ce n'est pas la même espèce ni le même régime |
| 3 | Langue de caribou 22,8 g lip. / 260 kcal ; moelle 84,4 g / 786 kcal ; muscle d'orignal 0,74 g | §1, §2, §3 | Valeurs USDA (SR Legacy). Le FCÉN de Santé Canada n'a pas répondu, même constat qu'au chapitre 24. Le rapport « environ trente fois » (22,8 ÷ 0,74) est une division du livre, pas une valeur publiée, et elle croise deux espèces : langue de caribou contre muscle d'orignal. À reformuler si le FCÉN donne les deux valeurs pour la même espèce |
| 4 | Foie d'orignal braisé : 22,6 mg vit. C, 71 µg B12, 2,79 mg Cu, 6,77 mg Fe ; foie de caribou 15,7 mg Fe | §2, §3 | Idem. **Attention de relecture :** ces valeurs décrivent un organe que le chapitre interdit. Si l'éditeur les trouve trop invitantes, elles peuvent être condensées, mais elles ne doivent pas disparaître : c'est l'argument qui explique pourquoi l'interdit porte sur le foie et le rein et sur rien d'autre |
| 5 | Foies de poisson : 8,0 g lip. (brochet), 4,4 g (grand corégone), 42,0 g (espèce marine) | §5-G étape 49 | Valeurs USDA d'espèces du Pacifique et de l'Arctique. **Aucune donnée pour l'omble de fontaine** (*Salvelinus fontinalis*), qui est pourtant le poisson du chapitre 53 |
| 6 | Pochage de la langue **10 à 15 minutes** avant pelage | §5-C étape 16 | Pratique d'usage, aucune source. À mesurer au chalet plutôt qu'à sourcer, ou à remplacer par le critère observable (« jusqu'à ce que la membrane se décolle à l'ongle ») |
| 7 | « 2 à 3 heures de chaleur au centre » d'une pile d'abats | §6, ligne « Dans l'heure » | Ordre de grandeur non sourcé. Le mécanisme est juste, le chiffre n'est pas mesuré. **À reformuler sans chiffre si rien ne sort** |
| 8 | Douves du foie chez l'orignal | §7, note sous le tableau | Aucune source officielle québécoise retrouvée. Le chapitre s'abstient et le dit. La conduite ne change pas : chez un cervidé le foie part aux refus de toute façon |
| 9 | Récupération et usage du sang | §5-C étape 25 | Aucune source officielle canadienne retrouvée sur le sang de gibier à domicile. Le chapitre ne donne aucune durée ni aucune quantité, seulement le principe de périssabilité maximale |

**Aucun autre chiffre du chapitre n'est sans source.** Les valeurs 74 °C, 70 °C, 7 °C en 24 h,
0 à 4 °C, -18 °C, zone de 4 à 60 °C, seuil de 3 °C, AMT de vitamine A (3 000 / 900 / 600 µg),
seuil de détection de 12 mois et le rapport « cent fois la quantité tolérée par l'OMS » portent
toutes leur organisme entre parenthèses dans le texte et leur extrait intégral dans `/sources`.

## 2. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau | Reprise ici |
| --- | --- |
| **Jamais le foie ni les reins de cervidés — cadmium (MAPAQ)** | C'est le chapitre d'origine de la règle. §1, §2, §5-A étape 6, §5-H étape 54, §6 (ligne « Au tri »), §8 point 1, §9 point 6. Avec le mécanisme complet cité mot à mot : accumulation chez le consommateur, élimination très lente, aucun traitement culinaire n'enlève un métal |
| **Cuisson du gibier sauvage à 74 °C à cœur (MAPAQ)** | §5-C étape 15, §5-E étape 38, §5-F étape 47, §6 (deux lignes), §8 point 4, §9 point 3. L'écart avec les 71 °C de l'ACIA est signalé en §10 et tranché en faveur de 74 °C |
| **Trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent** | §2 (mauvais choix), §5-C étape 15, §5-F étape 47, §8 point 4. Appliquée ici au **cœur et au diaphragme**, qui sont des muscles — c'est l'angle propre au chapitre 41 |
| **Tularémie : gants obligatoires à la manipulation** | §4 (matériel non négociable), §5-A étape 1, §5-F étapes 43-44, §7 (ligne des taches blanches), §8 point 7. Avec le mécanisme : coupure invisible, muqueuses, gouttelettes ; pas besoin de manger l'animal |
| **Botulisme de type E : produit sa toxine dès 3 °C, donc au frigo** | §5-G étape 51, §6 (ligne rogue et foie de poisson), §8 point 6 |
| **Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence** | §8 point 6, en toutes lettres |
| **Viande maigre seule = mal de caribou** | §2 (bon choix), §3, §8 (note de fin d'encadré), renvoi au chapitre 24. Le chapitre 41 est une partie de la solution : langue et moelle |

Règles du tableau **volontairement non reprises** : cuisson du gibier chez le castor et le
lièvre est couverte par la règle générale des 74 °C ; thuyone du cèdre, génératrice, hypothermie
et froid n'ont aucun point d'application ici. Si l'éditeur ajoute une infusion, un chauffage
d'appoint ou un travail extérieur prolongé à la variante d'urgence, la règle correspondante doit
entrer avec.

## 3. Dangers de l'encadré, avec leur mécanisme

Sept entrées, chacune avec son mécanisme explicite :

1. **Cadmium des foies et reins de cervidés** — organe de filtration qui concentre sur des
   années, accumulation chez le mangeur, élimination très lente, aucun symptôme d'alerte, aucun
   traitement culinaire n'agit sur un métal.
2. **Vitamine A du foie de phoque, de morse et d'ours** — rétinol liposoluble, non éliminé par
   l'urine, stocké dans le foie du mangeur, stable à la cuisson. Chiffré contre l'AMT de Santé
   Canada, avec la règle pratique pour les enfants de 4 et 6 ans.
3. **Prion des cervidés (cerveau, moelle épinière, ganglions)** — protéine mal repliée, pas un
   microbe, non détruite par la cuisson ; « en tout temps » ; un test négatif ne vaut pas
   garantie sous 12 mois d'infection.
4. **Trichinelle du cœur et du diaphragme d'ours et de mammifère marin** — larves enkystées dans
   le muscle, résistantes au gel, au sel, au fumage ; seule la chaleur à cœur les tue.
5. **Échinocoque par le chien** — chaîne complète en cinq maillons, chien asymptomatique,
   maladie humaine des années plus tard.
6. **Botulisme de type E dans la rogue et le foie de poisson** — croissance au-dessus de 3 °C,
   donc au réfrigérateur ; toxine invisible, inodore, sans goût.
7. **Tularémie du lièvre** — pénétration par coupure invisible, muqueuses et gouttelettes ;
   signe visible sur le foie et la rate.

Écartés de l'encadré pour ne pas le diluer, et renvoyés : coupures et fatigue (ch. 27 et 36),
froid sur les mains nues (ch. 3), mal de caribou (ch. 24), attrait des refus pour l'ours
(ch. 48), eau de nettoyage de la panse près du puits (ch. 13 et 28).

**À surveiller par le vérificateur sécurité :** le point 2 est le seul de l'encadré dont le
chiffre principal vient d'une espèce voisine et d'une agence étrangère. Il ne faut ni le retirer,
ni le présenter comme une valeur canadienne.

## 4. Images requises

| # | Description | Cadrage | Format |
| --- | --- | --- | --- |
| 1 | Planche : la masse viscérale d'un orignal étalée à plat sur une toile, chaque pièce numérotée et nommée — cœur, langue, diaphragme, foie, reins, rate, poumons, panse, crépine, os longs. **Code couleur en trois tons : on garde / on regarde / jamais.** Le foie, les deux reins, le cerveau, la moelle épinière et les ganglions en ton « jamais » | Vue de dessus, à plat, lumière égale, échelle donnée par un couteau posé dans le cadre. Planche redessinée au trait, pas une photo : le livre se feuillette à table | Pleine page |
| 2 | Séquence du cœur en quatre vignettes : ouverture en croix, retrait des caillots, parage des vaisseaux et du gras dur, pièce parée prête à cuire | Photos de JP, plan serré, fond de planche à découper claire, mains gantées visibles | Demi-page |
| 3 | La langue : pochée, puis pelée à chaud, membrane retirée en une pièce | Deux vignettes côte à côte, plan très serré | Quart de page |
| 4 | Os long fendu à la scie, moelle en place, cuillère posée à côté | Photo, plan serré, sur planche propre | Quart de page |
| 5 | Signes d'arrêt : kyste dans un poumon ou un foie de cervidé, et taches blanches sur le foie et la rate d'un lièvre | Deux photos documentaires. **Licence à vérifier avec soin** — source acceptable : planche vétérinaire du domaine public, agence fédérale américaine, ou photo de JP si le cas se présente. Pas de photo sanglante de pleine page ; format contenu | Demi-page |
| 6 | Thermomètre à sonde planté dans l'épaisseur d'un cœur en cuisson, affichage **74 °C** lisible | Photo, plan macro sur l'afficheur, sonde visible dans la paroi et non dans une cavité | Quart de page |
| 7 | Poisson ouvert : foie, rogue et laitance sortis et posés à côté, sur planche | Photo de JP, vue de dessus | Quart de page |
| 8 | Les trois bassines identifiées au crayon gras — garde / regarde / refus — avec le contenant à couvercle des refus | Photo de JP, montrant la distance physique entre les trois | Quart de page |

Aucune image de la section 8. L'encadré DANGER se lit, il ne s'illustre pas.

## 5. Renvois vers d'autres chapitres

| Chapitre | Raison |
| --- | --- |
| 3 — Le froid lui-même | Travailler dehors les mains mouillées |
| 13 — Eau : puiser, filtrer, désinfecter | L'eau du nettoyage de la panse, loin du puits |
| 24 — Le mal de caribou | La langue et la moelle comme sources de gras |
| 25 — Le scorbut et l'arbre de vie | Vitamine C des organes frais contre celle des conifères |
| 26 — Ce qu'un corps demande l'hiver | Densité énergétique, vitamines |
| 27 — Soigner quand il n'y a personne | Coupures, infections |
| 28 — Hygiène et eaux usées | Lavage des mains et des avant-bras, poste de travail |
| 34 — Calendrier annuel de prélèvement | Quand tombe le travail d'abats |
| 36 — Abattage, saignée, éviscération | Le geste qui précède immédiatement ce chapitre |
| 37 — Carte de la carcasse | Où sont les pièces |
| 42 — Ce que personne ne garde | Les refus et leur disposition |
| 44 — Lièvre d'Amérique | Tularémie, traitement de fond |
| 46 — Castor | Gras, foie permis |
| 48 — Ours noir | Trichinelle, et les refus qui attirent l'ours |
| 52 — Phoque du Saint-Laurent | Foie, vitamine A, contaminants |
| 53 — Truite et omble au lac | Espèces du foie et de la rogue |
| 62, 63, 64 — Le sel, salaison à sec, saumure | Langue et cœur, pourcentages sur le poids de la pièce, salpêtre et sa forme moderne |
| 67 — Pemmican et graisses | Fonte de la moelle et du gras |
| 68 — Froid naturel | Garder les abats sans électricité |
| 69 — Un congélateur plein qui dégèle | Abat dégelé qui ne se recongèle pas |
| 70 — Traiter le poisson à la sortie de l'eau | Viscères en premier |
| 72 — Fumer le poisson | Botulisme de type E |
| 74 — Jardin nordique | Ne rien composter de ces refus |
| 82 — Affûter, limer, aiguiser | Couteau entre les pièces |
| 86 — Leviers, poulies, treuils | Suspendre |

Les 26 numéros ont été vérifiés contre la liste des 89 chapitres. Aucun renvoi vers un chapitre
inexistant.

## 6. Relecteur humain requis

Chapitre **nommé dans la liste de relecture humaine obligatoire** de `CLAUDE.md` (« Abats et
organes »). L'avis est en tête du fichier de chapitre, dans un encadré, avant la section 1.

- **Relecteur principal : médecin vétérinaire en santé de la faune** — sections 5, 7 et 8. Ce
  qu'on lui demande précisément : l'ordre de tri des organes, les signes de kyste et de nodule,
  la conduite à tenir quand un organe est suspect (organe ou bête entière), et la liste des
  organes qui partent aux refus chez chaque espèce.
- **Second avis : toxicologue** (INSPQ ou Centre antipoison du Québec) — encadré DANGER points 1
  et 2 seulement. Ce qu'on lui demande : la formulation du mécanisme du cadmium, et surtout la
  transposition de la valeur de vitamine A du phoque annelé aux phoques du Saint-Laurent et au
  foie d'ours, y compris la règle pratique donnée pour les enfants.

## 7. Notes pour l'éditeur

- **La planche 1 et la section 5-A doivent tomber sur la même double page.** Le tri en trois tas
  est le geste central du chapitre et il se fait les mains pleines : séparer la planche de la
  liste fait perdre l'essentiel.
- **Ne pas fusionner les points 1 et 2 de l'encadré DANGER.** Le cadmium et la vitamine A ne
  visent ni les mêmes espèces ni les mêmes organes, et les confondre produirait exactement
  l'erreur qu'on veut éviter : un lecteur qui croit que « le foie, c'est dangereux » et qui jette
  le foie de castor tout en mangeant celui de l'orignal.
- **Ne pas condenser la chaîne de l'échinocoque en une phrase.** Les cinq maillons sont ce qui
  fait changer de comportement ; « ne pas donner d'abats au chien » tout seul ne convainc
  personne qui a toujours donné des abats à son chien.
- **Ne pas retirer l'étape 57** (ramasser les excréments du chien). C'est la moitié de la règle
  que tout le monde oublie, et elle est dans la source.
- Le chapitre ne donne **aucune date de saison, aucune limite de prises, aucune règle de
  transport**. La MDC mentionne une restriction d'entrée au Québec pour des pièces anatomiques :
  elle est traitée dans le fichier de source, **pas** dans le chapitre, justement pour ne pas
  transformer une règle datée en consigne de livre.
- Salpêtre : traité à l'étape 35, sans aucune quantité, avec sa forme moderne équivalente et le
  renvoi au chapitre 63. Pourcentages de sel : nommés comme se calculant sur le poids de la
  pièce, sans valeur chiffrée ici.
- Noms latins présents : *Alces americanus* (avec la mention de *Alces alces* des bases
  américaines), *Rangifer tarandus*, *Odocoileus virginianus*, *Ursus americanus*, *Pusa
  hispida*, *Lepus americanus*, *Castor canadensis*, *Bonasa umbellus*, *Esox lucius*,
  *Coregonus nasus*, *Salvelinus fontinalis*, *Trichinella*, *Francisella tularensis*,
  *Echinococcus canadensis*, *Echinococcus multilocularis*, *Clostridium botulinum*.
- **Incohérence de nomenclature à trancher au montage du tome :** le livre écrit l'orignal
  *Alces americanus* (chapitre 28), le MAPAQ ne donne pas de nom latin et l'USDA écrit *Alces
  alces*. Le chapitre 41 mentionne les deux une fois. Le glossaire doit trancher pour tout
  l'ouvrage.

## 8. Ce qui reste faible

- **Le sang.** Aucune source officielle canadienne sur sa récupération et son usage à domicile.
  C'est une lacune réelle : le sang est une ressource nutritionnelle importante et le livre n'en
  dit presque rien. Si une source sort, elle mérite plus que l'étape 25 — possiblement une
  section dans le chapitre 67.
- **La panse et les tripes** sont traitées en une étape alors que le nettoyage complet est un
  travail d'une heure et une grosse consommation d'eau. En hiver, à -35 °C, la faisabilité même
  est douteuse et le chapitre ne la tranche pas.
- **Les durées de conservation des abats**, en heures et en jours, n'existent nulle part dans le
  chapitre parce qu'aucune source officielle n'en donne. Tout le contrôle repose donc sur la
  température. C'est défendable, mais un lecteur cherchera « combien de temps » et ne trouvera
  pas. Si le vérificateur technique trouve une source de durées, elle changerait la section 6.
- **Le foie d'ours** reste un trou franc : mécanisme connu, aucune valeur. À reprendre au
  chapitre 48, qui devra soit chiffrer, soit assumer le même refus.

## Notes retirées du chapitre — 23 septembre 2026

Passe de nettoyage (paperasse, attributions, notes internes). Notes retirées telles quelles :

- Encadré de tête :

  > ### ⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE
  >
  > Ce chapitre ne part pas à l'impression sans relecture par une personne compétente
  > extérieure au projet.
  >
  > **Relecteur requis : un médecin vétérinaire en santé de la faune** (secteur Faune du
  > ministère de l'Environnement, de la Lutte contre les changements climatiques, de la Faune
  > et des Parcs, ou faculté de médecine vétérinaire), pour les sections 5, 7 et 8.
  >
  > **Second avis requis sur la section 8, points 1 et 2 : un toxicologue**, sur le cadmium des cervidés et sur la vitamine A des foies de
  > mammifères marins et d'ours.
  >
  > Motif : le chapitre nomme des organes qu'on mange et des organes qui empoisonnent, à partir
  > d'une page ministérielle qui interdit sans chiffrer et de valeurs nutritionnelles
  > américaines faute d'équivalent canadien accessible. Une erreur d'attribution entre deux
  > espèces — un foie d'orignal et un foie d'ours ne se traitent pas pareil — se paie en
  > intoxication, pas en note de bas de page.

- §2, langue de caribou : « division faite par le livre à partir de ces deux valeurs ».
- §5, point 25 (le sang) : « Aucune source officielle canadienne n'a été retrouvée sur sa
  récupération à domicile `[À VÉRIFIER]`. » Le marqueur reste dans le chapitre.
- §7, douves : « aucune source officielle québécoise n'a été retrouvée sur ce point ». Le
  marqueur reste.
- §8, point 2 : « (divisions faites par le livre à partir des deux valeurs ci-dessus) ».

Provenances retirées du texte (pour qui vérifie) :

- MAPAQ : 7 °C en 24 h (§2) ; animal d'apparence anormale (§2) ; intestins non perforés,
  carcasse non rincée (§2) ; « l'interdit du MAPAQ » (§3) ; cadmium, « la phrase suivante de la
  même page » (§8 point 1).
- Santé Canada : apport maximal tolérable de vitamine A (§2 et §8 point 2).
- ACIA : « au moins 71 °C » sur sa fiche trichinose (§5 point 38).
- Organisation mondiale de la santé : « quantité tolérée par l'OMS », rendu par « quantité de
  cadmium jugée tolérable » (§8 point 1).

## Passe légal et signes — 23 septembre 2026

Aucune phrase de loi, de règlement ou de municipalité trouvée dans le chapitre ; rien de retiré.

Notes de bas de page ajoutées, avec leur provenance :

- [^1] « kyste » (§5-A, point 7) : `sources/41-adfg-kyste-hydatique-orignal.md` (Alaska Department
  of Fish and Game). La page québécoise sur l'échinococcose ne décrit pas le kyste. Tailles
  converties des pouces : 2 à 6 cm le plus souvent, jusqu'à 10 cm.
- [^2] « intoxication aiguë à la vitamine A » (§8, point 2) :
  `sources/41-merck-intoxication-vitamine-a.md` (Manuel Merck, édition professionnelle ; la fiche
  du NIH a refusé la lecture). Aucun délai chiffré : la page n'en donne pas.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `verifications/41-verifications.md` appliqués au chapitre. Règle suivie : le Fichier
canadien sur les éléments nutritifs (FCÉN) prime ; l'USDA reste là où le FCÉN n'a pas de valeur.

- §2, langue de caribou : **23,5 g** de lipides et **276 kcal** / 100 g (était 22,8 g / 260 kcal,
  USDA) ; muscle d'orignal cru **3,0 g** (était 0,74 g) ; rapport « trente fois » → « près de huit
  fois » — `sources/41-sante-canada-fcen-abats-gibier.md` (+ `-donnees.json`).
- §2, moelle de caribou : **83,4 g / 782 kcal** (était 84,4 g / 786 kcal) — même fichier.
- §2, vitamine C du foie d'orignal braisé : **22,6 mg** confirmé (USDA, fdcId 167609 ; le FCÉN
  n'a pas de valeur) — `sources/41-usda-fdc-abats-donnees-2026-09-24.json`.
- §2 et §8 point 2, vitamine A du foie de phoque annelé : **3 710 µg ÉAR** (était 4 880 µg) ;
  rapports recalculés : **1,2 fois** le plafond adulte (3 000 µg), **4 fois** celui de 4 à 8 ans
  (900 µg) — `sources/41-sante-canada-fcen-abats-gibier.md`.
- §3, fer du foie de caribou cru : **33 mg** (était 15,7 mg). Note A suivie pour la même phrase :
  foie d'orignal **rôti 23 mg de fer, 2 mg de cuivre** (FCÉN) ; B12 **71 µg** gardée pour le foie
  braisé (USDA seul) — même fichier + `41-usda-fdc-abats-donnees-2026-09-24.json`.
- §3, moelle : **44 g** de lipides chez l'orignal, **83 g** chez le caribou (le texte donnait le
  caribou pour un fémur d'orignal) ; aspect de la moelle d'une bête morte de faim —
  `sources/41-sante-canada-fcen-abats-gibier.md` ; `sources/26-adfg-moelle-osseuse-famine.md`.
- §5 étape 16, pochage de la langue : chiffre « 10 à 15 minutes » **coupé** (introuvable), remplacé
  par le critère de la pointe du couteau. Aucune source.
- §5 étape 25, le sang : principe confirmé (très périssable, milieu de culture, recueil propre) ;
  « le jour même » reste un choix du livre — `sources/41-fao-1991-sang.md`.
- §5 étape 49, foie de poisson : brochet **8,0 g**, grand corégone **4,4 g**, espèces marines
  **42,0 g** confirmés ; ajout lotte **29 g** — `sources/41-sante-canada-fcen-abats-gibier.md`,
  `sources/41-usda-fdc-abats-donnees-2026-09-24.json`.
- §6, pile d'abats : « 2 à 3 heures » **coupé** (introuvable), mécanisme gardé. Aucune source.
- §7, foie d'orignal taché : douves → **larve de ténia** (*Taenia hydatigena*) comme cause courante,
  grande douve décrite, renvoi à [^1] — `sources/41-adfg-kystes-tenia-foie.md`,
  `sources/41-malcicka-2015-grande-douve-du-foie.md`, `sources/41-adfg-kyste-hydatique-orignal.md`.
- §8 point 2, foie d'ours noir : absence de valeur confirmée (FCÉN et USDA) —
  `sources/41-sante-canada-fcen-abats-gibier.md`, `sources/41-usda-fdc-composition-abats.md`.
  Note C suivie : foie de lotte **4 000 µg ÉAR** / 100 g ; la lotte entre dans la règle de famille
  du §8 et dans le point de contrôle « Avant de servir aux enfants » — même fichier FCÉN.
- §9 point 4, glacière : perte **jusqu'à 30 %**, d'où **50 %** de glace en plus ; isolant sec
  **30 cm (12 po)** — `sources/41-usda-farmers-bulletin-1078-glaciere.md`.
- §9 point 15, séchage des abats musculaires : **10 à 24 heures** pour **6 mm** au séchoir à
  **60 °C** ; test « craque en pliant sans casser » ; note D suivie : **5 minutes** de bouillon avant
  de suspendre — `sources/41-nchfp-sechage-viande-jerky.md`.
- §9 point 17, salinité du fleuve devant la Côte-Nord : **24 à 31 g/kg** (23,7 à 31,2), plus douce
  en juillet qu'en octobre — `sources/41-santo-2025-salinite-estuaire-cote-nord.md`.
- §8 (après l'encadré) et §9 point 11, mal de caribou : « mortel en 2 à 3 semaines » → « mortel en
  quelques semaines » (décision prise pour tout le livre ; voir `sources/51-stefansson-1936-adventures-in-diet.md`).

Reste à faire hors de ce chapitre : chapitre 24 (note B — muscle d'orignal 0,74 g et moelle de
caribou 84,4 g à passer au FCÉN), chapitre 12 (note E — salinité), chapitre de la lotte (note F).

Compression §3 et §4 — 27 septembre 2026 : 1092 mots → 132 mots (§3 : 481 → 113 ; §4 : 611 → 19) ; matériel coupé : gants jetables (tularémie et substitut des sacs doublés restent aux étapes 1 et 43, en §8 point 7 et en §9 point 18), couteau à désosser, bassines distinctes (la séparation reste aux étapes 4 et 27 et en §9 point 9), contenant fermé des refus (étapes 53 et 56), sacs de coton, glacière (§9 points 3 à 5), eau et savon (cendre en §9 point 9), papier absorbant, scie à os ou hachette, casserole (pierres rougies en §9 point 10), étiquettes (étape 29), corde, paragraphe de fin (ch. 00b) ; thermomètre de rechange et truc du verre d'eau dans la chambre froide coupés. §3 : chiffres du foie d'orignal et de caribou (fer, cuivre, B12), lipides de la moelle (44 g, 83 g), moelle comme signe de famine, mécanisme cadmium et vitamine A à la cuisson (redit en §8 points 1 et 2) coupés. Rien à déplacer ; aucun renvoi ni aucune note touchés.
