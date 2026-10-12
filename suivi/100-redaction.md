> **Renuméroté une deuxième fois le 27 septembre 2026** (agriculture au tome 5) : chapitre 96 avant cette date. Table : plan/renumerotation-2.json.

> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 75. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 75, Semences

- **Tome :** 4 — Conserver et réparer
- **Fichier :** `chapitres/75-semences.md`
- **Poste :** rédacteur (rôle 2)
- **Date :** 2026-09-20
- **Ampleur :** environ **5 860 mots utiles** aux sections 1 à 9, plus **670 mots** d'appareil de
  sources à la section 10. Au-dessus de la fourchette de 2 500 à 5 000 mots demandée au
  rédacteur, dans la moyenne des voisins déjà écrits (ch. 70 à 6 700, ch. 61 à 6 451, ch. 55 à
  6 047). **Si l'éditeur doit couper**, les deux blocs compressibles sont le tableau
  espèce-par-espèce de la §2 (qu'on peut réduire aux espèces réellement cultivées sur la
  Côte-Nord) et le tableau des planchers de germination de la §5-K (qu'on peut ramener aux
  quinze espèces du jardin de JP). Aucun des deux ne peut être coupé **sans** être remplacé :
  le premier porte le mode de pollinisation, le second est le seul barème officiel du chapitre.
- **Gabarit :** les dix points, dans l'ordre, avec les titres du gabarit. Procédure numérotée
  conservée (54 étapes, sous-sections A à L) : ce n'est pas un chapitre de référence pur, même
  s'il contient deux gros tableaux.

---

## 1. Les chiffres `[À VÉRIFIER]`

Sept. Aucun n'est un placeholder : chacun correspond à une recherche faite le 20 septembre 2026
et documentée dans `sources/75-NON-OBTENUES-et-limites.md`.

| # | Chiffre manquant ou douteux | Où dans le chapitre | Ce que le chapitre fait à la place | Qui doit trancher |
| --- | --- | --- | --- | --- |
| 1 | **Haricot de jardin et pois de jardin**, tableau XVIII de l'annexe I du *Règlement sur les semences* | §5-K, tableau des planchers ; §10 | Écrit « autour de 80 % » et refuse de publier une valeur ferme | **Vérificateur technique, en priorité.** Trois extractions du même tableau ont donné trois résultats (haricot 80 ou 85 % ; pois 75 ou 80 %). Le tableau doit être ouvert à l'œil |
| 2 | Température maximale de séchage d'une semence | §5-G, étape 30 | Critère de geste (jamais plus chaud que la main) + mécanisme (l'embryon est vivant) | Vérificateur technique. Pistes : AAC, CNSF de Fredericton par courriel |
| 3 | Nombre minimal de plants porte-graine pour une espèce allogame | §5-B étape 8, §6 | Explique la dérive génétique et donne une conduite sans chiffre | Vérificateur technique |
| 4 | Durée de la fermentation des graines de tomate | §5-F étape 24 | Repère visuel — le voile blanc — au lieu d'un nombre de jours | Vérificateur technique |
| 5 | Durée de congélation qui tue un insecte de stockage (bruche du haricot, *Acanthoscelides obtectus*) | §7, ligne « petits trous ronds » | Dit de congeler avant remise en stock, sans durée | Vérificateur technique |
| 6 | Distances d'isolement contre le croisement, au jardin | §5-C, §10 | Aucune distance publiée. Raisonne par mode de pollinisation (autogame / insectes / vent) | Éditeur, si une source non gouvernementale est jugée acceptable |
| 7 | Longévité d'une semence par espèce, en années | Absente du chapitre | Remplacée volontairement par le **test de germination annuel** | Éditeur |

**Note pour le vérificateur technique.** Le chiffre le plus exposé du chapitre n'est pas dans
cette liste : c'est le **3 à 7 % de teneur en eau** du CNSF, qui apparaît trois fois (§1, §3,
§5-G) et qui porte tout le raisonnement du séchage. Il vient d'une page de **Ressources
naturelles Canada portant sur des semences d'arbres forestiers**, transposée au potager par le
livre, qui le dit. À recompter un par un contre
`sources/75-rncan-cnsf-conservation-semences.md`. C'est ici que le ch. 75 peut répéter l'erreur
du pilote du ch. 63.

## 2. Ce que le chapitre affirme et qui doit être recoupé

| Affirmation | Source citée | À recouper parce que |
| --- | --- | --- |
| **3 à 7 %** d'eau, **-20 °C**, **45 à 55 ans → plus de 80 %** | RNCan, CNSF | Source **forestière** appliquée au potager. C'est la transposition la plus exposée du chapitre |
| Tous les planchers de germination de la §5-K | *Règlement sur les semences*, annexe I, tableaux XVI à XX | Tableaux réglementaires denses, extraits par lecture automatique. Les valeurs publiées sont celles qui **concordaient sur deux extractions indépendantes** ; les divergentes ont été retirées ou marquées. À revalider ligne par ligne |
| Ce qui doit figurer sur un sachet (année d'essai, % de germination) | *Règlement*, art. 5(5) et 30 | Seuls les alinéas 30d)(i) et (ii) ont été captés mot à mot. Le reste de l'article est résumé |
| Mention obligatoire des semences traitées, et **23 avril 2020** | ACIA | Vérifier que la formulation française est recopiée exactement : c'est une citation réglementaire |
| **6 mois / 3 mois** entre deux analyses de germination | ACIA | Ce sont des **recommandations à l'industrie**, pas une obligation. Le chapitre le dit ; vérifier qu'il ne durcit pas la source |
| **5 kg / 500 g** à l'importation en petits paquets | ACIA | Marginal pour le lecteur. À couper si la place manque |
| Programme de certification des pommes de terre de semence | ACIA + partie II du *Règlement* | Le chapitre ne nomme **aucune** classe ni génération, faute d'avoir pu lire le PDF de l'ACIA. Vérifier qu'il ne dit pas plus que ce qui est sourcé |
| Les choux sont tous *Brassica oleracea* et croisent entre eux | Aucune source officielle | Botanique élémentaire, présentée comme un fait. Si le vérificateur juge qu'il faut une source, ça devient un `[À VÉRIFIER]` de plus |
| Fermentation de la tomate qui dégrade le gel germinatif | Aucune source officielle | Savoir-faire, pas fait sourcé. Même remarque |
| Cendre de bois et riz comme dessiccants de fortune (§9) | Aucune source | **Explicitement nommés comme du savoir-faire** dans le texte, pas comme des données |

## 3. Les rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau | Où dans le ch. 75 |
| --- | --- |
| Génératrice : jamais dans un bâtiment, un garage ou sous un auvent | **§8, bloc 4**, avec le mécanisme du monoxyde de carbone et la citation de Québec.ca. Repris parce que sécher des semences pendant des semaines et éclairer des semis en mars poussent un chalet hors réseau vers la génératrice |

**Non repris, parce que hors sujet ici :** cuisson du gibier à 74 °C, foie et reins de cervidés,
trichinellose, tularémie, thuyone du cèdre, botulisme de type E, botulisme sans odeur ni goût,
mal de caribou. Aucun de ces huit ne se présente en récoltant de la semence. Les mettre ici
diluerait l'encadré, ce que le gabarit interdit.

**Décision sur l'encadré DANGER :** quatre blocs, et chacun porte un risque de mort ou
d'intoxication grave.

1. **Semences traitées et pommes de terre de semence** — pesticide d'enrobage (mention
   réglementaire de l'ACIA) **et** glyco-alcaloïdes du tubercule verdi ou germé (Santé Canada,
   avec la phrase clé : la cuisson ne les réduit pas). Les deux mécanismes sont réunis dans un
   seul bloc parce qu'ils visent le même geste : manger ce qui était destiné à être planté.
2. **Germes crus et enfants** — Santé Canada nomme les enfants parmi les groupes vulnérables, et
   la maison compte un enfant de 4 ans et un de 6 ans. Le mécanisme publié (bactéries piégées
   dans les fentes et fissures de la graine, conditions de germination qui les multiplient) est
   ce qui rend la consigne applicable : rincer ne sert à rien, cuire fonctionne.
3. **Hantavirus dans le stock de semences** — risque rare (six cas au Québec depuis 2005) mais
   mortel, et le geste dangereux est le balai, pas la souris. Publié **avec** son mécanisme et
   son incubation de 1 à 8 semaines.
4. **Génératrice** — voir ci-dessus.

**Ce qui a été tenu hors de l'encadré, volontairement :** les mauvaises herbes nuisibles des
semences importées (§5-A), la perte de rendement des tubercules non renouvelés (§5-L), et la
moisissure des lots mal séchés (§7). Rien de tout ça ne tue.

## 4. Images requises

| # | Sujet | Cadrage | Format |
| --- | --- | --- | --- |
| 1 | Arbre de décision, de la fleur au pot : autogame ou allogame → isolement nécessaire ou non → maturité de la graine → extraction sèche ou humide → séchage → test de germination → entreposage, avec les renvois aux ch. 69, 74, 76, 77 | Schéma vectoriel, pas une photo. Fond clair. Deux couleurs seulement : la branche autogame et la branche allogame, tenues sur tout le tome | **Pleine page**, en ouverture de chapitre |
| 2 | Planche des stades de maturité de la graine, quatre espèces en colonnes : haricot (gousse verte / jaune / brune papier), tomate (mûre / blette), concombre (vert de table / jaune-brun dur), laitue (fleur / aigrette blanche) | Grille 4 × 2 ou 4 × 3, même éclairage, même distance, échelle en cm dans chaque cadre. Le stade **à récolter** encadré en trait fort | **Demi-page** |
| 3 | Pollinisation à la main d'une courge : fleur femelle avec son ovaire à la base, fleur mâle à tige nue, sac de voile posé la veille, ruban de marquage sur le fruit | Trois vignettes horizontales, gros plan, fond vert sombre. L'ovaire doit être nettement visible sous la fleur femelle | **Demi-page**, bande |
| 4 | Fermentation de la tomate en trois vignettes : pulpe et graines dans le pot ; voile blanc en surface ; flottation, graines pleines au fond et déchets en surface | Trois cadres identiques, vue de trois quarts, verre transparent sur fond neutre | Quart de page |
| 5 | Vannage devant un ventilateur 12 V, en coupe dessinée : trajectoire des débris légers, trajectoire de la graine, position des deux contenants, distance de chute | Schéma technique annoté, pas une photo | Quart de page |
| 6 | Le pot d'entreposage en coupe : sachets de papier étiquetés debout, sachet de dessiccant au fond, joint neuf, couvercle ; le pot lui-même dans une caisse métallique fermée | Coupe technique dessinée, annotations courtes (étiquette double, dessiccant, joint, métal contre les souris) | Quart de page |
| 7 | Test de germination : 20 graines alignées sur un coton humide, coton roulé, rouleau dans un sac, et la fiche de comptage remplie à côté | Vue de dessus, quatre étapes en bande, éclairage uniforme | Quart de page |
| 8 | Sachet de semences **générique, dessiné, sans marque ni logo**, annoté : « F1 » contre « pollinisation libre », le pourcentage de germination, l'année de l'essai, la mention « Ne pas utiliser pour l'alimentation des personnes ou des animaux » et son mot indicateur | Illustration au trait. **Aucune marque de commerce réelle**, aucune reproduction d'un emballage existant | Quart de page |

**Note au metteur en pages :** l'image 1 et le tableau de la §2 se répondent. Si la pleine page
saute, le tableau reste ; si le tableau saute, la pleine page ne suffit pas.

## 5. Renvois vers d'autres chapitres

| Chapitre | Pourquoi |
| --- | --- |
| 8 — Le stock permanent du chalet | Le stock de semences est un stock, avec sa duplication à un deuxième endroit |
| 57 — Petits fruits / 58 — Plantes comestibles boréales | Les graines sauvages et leur cueillette ne sont pas dans le ch. 75 |
| 60 — Sève, gomme, écorces | Les semences d'arbres, et la source RNCan qui sert aux deux chapitres |
| 68 — Froid naturel | L'entreposage sans congélateur, variante d'urgence |
| 69 — Un congélateur plein qui... | Le -20 °C du CNSF, en pratique au chalet |
| 73 — Conserves et marinades | Les pots et les joints, et le surplus de jardin qui ne devient pas semence |
| 74 — Jardin nordique | Le chapitre amont : conduite du jardin, semis, dates, saison |
| 76 — Caveau à légumes | Les bisannuelles à hiverner, les pommes de terre de semence, le 4 °C humide |
| 77 — Fermentation | Le mécanisme de la fermentation des graines de tomate |
| 78 — Petit élevage | Ne jamais donner de semence traitée aux animaux |
| 85 — Le stock de pièces et de consommables | Le double du stock, et le rythme de remplacement |
| 89 — Savon et chandelles | La cire et le suif pour sceller un contenant de fortune |

**Renvois entrants attendus :** le ch. 74 (jardin nordique) doit renvoyer ici pour la semence, et
le ch. 76 (caveau) pour les pommes de terre de semence et les racines porte-graine. À signaler
à l'éditeur pour que les deux renvois soient posés des deux côtés.

## 6. Relecteur humain

Le chapitre **ne figure pas** dans la liste de relecture obligatoire de `CLAUDE.md`, et le
rédacteur ne demande pas de l'y ajouter : aucun procédé du chapitre ne fabrique un risque comme
le fait la mise en conserve.

Une relecture par un **agronome ou un technologue en production maraîchère nordique** est
demandée à l'éditeur sur trois points seulement :

1. les deux lignes du tableau XVIII (haricot, pois) ;
2. la transposition au potager des données du CNSF, qui portent sur des semences d'arbres ;
3. la partie sur la pomme de terre de semence, écrite sans le PDF de l'ACIA, qui n'a pas pu
   être extrait.

Si l'éditeur ne trouve personne, le chapitre part quand même : rien dans son encadré DANGER ne
repose sur un jugement du rédacteur — les quatre blocs sont des citations d'organismes publics.

## 7. Fichiers produits

- `chapitres/75-semences.md`
- `sources/75-acia-semences-traitees-etiquetage.md`
- `sources/75-acia-normes-de-germination.md`
- `sources/75-justice-reglement-semences-annexe-i.md`
- `sources/75-rncan-cnsf-conservation-semences.md`
- `sources/75-sante-canada-germes-crus.md`
- `sources/75-quebec-hantavirus.md`
- `sources/75-acia-importation-semences-petits-paquets.md`
- `sources/75-reprises-sources-deja-enregistrees.md`
- `sources/75-NON-OBTENUES-et-limites.md`
- `suivi/75-redaction.md`

## Passe « pas de code légal, signes en bas de page » — 2026-09-23

- **Légal retiré.** §5-K étape 47 : « Ces valeurs sont les minimums de la semence vendue au
  Canada » (le minimum légal de vente, annexe I du règlement) devient « le plancher de la semence
  neuve du commerce ». Même chiffre, sans la règle. C'était une ligne de
  `suivi/doutes-passe-paperasse.md` (point 3 de la passe).
- **Gardé.** « Cet étiquetage date d'avril 2020 » (§5-A étape 3 et §8 bloc 1) : la phrase ne cite
  aucune loi et porte un fait qui protège — un vieux sachet peut n'avoir aucune mise en garde.
- **Note [^1], §2, l'aigrette de la laitue.** Provenance :
  `sources/75-cetab-wikimaraicher-laitue-semences.md` (CETAB+, Wiki maraîcher, fiche Laitue,
  consultée le 2026-09-23 : pappus en parachute duveteux, floraison échelonnée, fleurs jaunes et
  parachutes en même temps, récolte en secouant la tête dans un bac).
- **Note [^2], §8 bloc 3, les premiers signes du hantavirus.** Provenance :
  `sources/75-aspc-hantavirus-symptomes.md` (Canada.ca, modifiée le 2026-07-29 : frissons, fièvre,
  toux, fatigue, étourdissements, maux de tête, douleurs abdominales, douleurs musculaires,
  nausées, vomissements ; formes graves : essoufflement, détresse respiratoire sévère), recoupée
  par `sources/75-quebec-hantavirus.md`. « La liste d'une grippe » est une lecture du livre.
- **Pour le vérificateur technique, hors mandat de cette passe.** Étape 17 : « Laitue, aneth,
  radis, épinard : la graine est mûre quand l'aigrette est blanche ». Seule la laitue porte une
  aigrette. L'aneth mûrit en ombelle qui brunit, le radis en silique qui sèche, l'épinard en
  glomérule qui brunit [À VÉRIFIER]. La note [^1] ne décrit que la laitue ; l'étape n'a pas été
  réécrite. Même remarque pour la ligne « Récolte » du §6.

## Levée des [À VÉRIFIER] — 24 septembre 2026

- §4, Matériel, substituts du dessiccant (cendre, riz, lait en poudre) : **introuvables, coupés.**
  « Aucun substitut éprouvé » ; quantité précisée : 1 à 2 sachets pour tenir un pot déjà sec, un
  poids de gel de silice égal à celui de la graine pour sécher. Source :
  `sources/75-osa-guide-semences-2010.md` (gel de silice à poids égal, 2 à 7 jours) ;
  `sources/75-fao-normes-banques-de-genes-2014.md` (conservation à 10-25 % d'humidité).
- §5-A, étape 3, couleur de l'enrobage : **mécanisme confirmé** (teinture de couleur non naturelle,
  qui peut manquer) ; « rose, bleu ou rouge vif » retiré, aucune couleur n'étant sourcée. Source :
  `sources/75-ecfr-teinture-semences-traitees.md` (règle américaine, aucun équivalent canadien).
- §5-B, étape 8, et §6, « Marquage au champ », nombre de porte-graine : **chiffré.** Allogames
  ≥ 80 plants récoltés ; carotte, oignon, maïs 200 ; cucurbitacées 10 à 20 ; autogames 10 à 20
  pour la santé de la variété (1 pour la conformité). « Jamais les mêmes lignées » retiré (non
  sourcé). Source : `sources/75-osa-guide-semences-2010.md`. Conséquence au §3 : « un seul plant
  suffit » devient « un seul plant donne une graine conforme ».
- §5-G, étape 30, température de séchage : **chiffré.** Dommage au-dessus de 35 °C d'air ; graine
  foncée au soleil dès 27 °C ; banques de semences 5 à 20 °C. Sources :
  `sources/75-osa-guide-semences-2010.md`, `sources/75-fao-normes-banques-de-genes-2014.md`.
- §5-K, tableau des germinations minimales : **corrigé en partie.** Haricot de jardin 80 %
  (confirmé), pois de jardin **75 %** (au lieu de « autour de 80 % »), catégorie Canada n° 1.
  Source : `sources/75-justice-reglement-semences-tableau-xviii.md` (+ pages HTML FR et EN).
- §7, bruche du haricot, et §9, « L'insecte dans le pot » : **chiffré.** 4 jours à -18 °C, semence
  sèche, pot fermé, retour à la température de la pièce avant ouverture ; la chaleur qui tue
  l'insecte tue l'embryon. Dehors en janvier : nuits moyennes -20 à -21 °C, jours -15 °C. Sources :
  `sources/75-uky-ef612-insectes-denrees.md`, `sources/75-osa-guide-semences-2010.md`,
  `sources/34-eccc-normales-saison-sans-gel-cote-nord.md` (section « Ajout — températures de janvier »).
- §9, étanchéité contre l'insecte : **principe confirmé, délai introuvable.** Le délai et
  « l'insecte finit l'oxygène » retirés. Source : `sources/75-purdue-pics-sacs-hermetiques.md`.
- §9, grain à oiseaux chauffé : **confirmé pour le niger importé** (traitement à la chaleur
  contre les graines de mauvaises herbes). Source : `sources/75-ecfr-graines-niger-traitement-chaleur.md`
  (règle américaine).
- §9, pomme de terre d'épicerie antigerminée : **pratique confirmée** (en entrepôt, jamais sur la
  semence) ; « souvent » retiré, aucune proportion publiée. Source :
  `sources/75-epa-chlorprophame-antigerminatif-pommes-de-terre.md`.
- §9, indicateur au sel : **corrigé.** Le sel ne prend l'eau qu'autour de 75 % d'humidité
  relative : il dit mouillé ou pas mouillé, pas sec. Ajout des tests de l'enveloppe et du marteau.
  Sources : `sources/75-nist-greenspan-1977-sel-et-humidite.md`,
  `sources/75-fao-normes-banques-de-genes-2014.md`, `sources/75-osa-guide-semences-2010.md`.
- §9, « Le dessiccant qu'on fabrique » : **introuvable, paragraphe coupé**, remplacé par « Sans
  dessiccant » (séchage prolongé, test de l'enveloppe, gel de silice récupéré à poids égal).
  Sources : comme au §4.
- §9, graine vraie de la pomme de terre, virus : **introuvable.** Promesse virale coupée ; « la
  lignée repart propre » devient « en gardant toujours les plants les plus vigoureux ». Source à
  côté : `sources/75-fao-normes-banques-de-genes-2014.md` (plantes multipliées par voie
  végétative et virus).
- §9, calibre de la première récolte issue de graine vraie : **introuvable.** Dit comme une
  méthode (récolte de sélection, pas de table), sans calibre ni nombre de saisons. Aucune source.
- §2, « les 90 à 100 jours » devient « la saison courte » : la saison sans gel moyenne de la côte
  est de 108 à 124 jours, 90 à 100 étant la mauvaise année. Source :
  `sources/34-eccc-normales-saison-sans-gel-cote-nord.md`.

Compression §3 et §4 — 27 septembre 2026 : 1067 mots → 150 mots ; matériel coupé : enveloppes ou sachets de papier, étiquettes et crayon de plomb, moustiquaire de séchage, tamis, ventilateur 12 V, bol pour la flottation, contenant métallique (le refus du carton et du plastique passe à la ligne du pot de verre), dessiccant, congélateur, coton et assiette du test de germination, gants et masque (§8, bloc 3 les porte déjà, avec l'aération et le mouillage), sacs de voile. Gardés : semence à pollinisation libre, pot de verre hermétique. §3 réduit à cinq phrases ; le 45 à 55 ans à -20 °C reste parce que §9 y renvoie.
