# Fiche de suivi — Chapitre 98, Ce qui nourrit un hiver

- **Tome :** 5 — La forêt, le jardin et le chalet (chapitre nouveau du 27 septembre 2026, l'un des
  quatre chapitres d'agriculture demandés par JP : `suivi/plan-de-match.md` §1b)
- **Fichier :** `chapitres/98-ce-qui-nourrit-un-hiver.md`
- **Poste :** rédacteur
- **Date :** 2026-09-27
- **Statut :** CORRIGÉ après les deux vérificateurs (technique et sécurité), le 27 septembre 2026 ;
  à passer à l'éditeur. Sept `[À VÉRIFIER]` restent dans le texte (§2 ci-dessous). Détail des
  corrections et des constats écartés : §7.
- **Lieu :** **Chalet.** La maison sert avant : acheter et garder la semence (ch. 00b, ch. 100) ; un
  terrain du village peut porter les pommes de terre de la première année si la bascule tombe au
  printemps.
- **Ampleur :** 12 416 mots bruts au `wc -w` après correction (Markdown compris) ; 9 sections,
  44 étapes numérotées, 8 notes de bas de page, 7 tableaux. Variante d'urgence d'environ 2 480 mots. Estimation : 14 à
  15 pages en 8 × 10 hors planches (le tome 5 a de la marge : `plan/budget-pages.md`).
- **Gabarit :** les neuf points dans l'ordre, ligne de lieu avant le point 1. La section 5 commence
  par deux tableaux de compte (§5-A) parce que c'est un chapitre de quantités ; la procédure suit.
- **Ce que le chapitre ne refait pas :** le sol, la cendre, le varech, la rotation et la première
  année en poquets (ch. 96, écrit en parallèle et lu avant la rédaction) ; le potager et l'eau
  (ch. 95) ; le foin, la faux et les Trois Sœurs (ch. 99, écrit en parallèle et lu) ; la semence
  (ch. 100) ; le caveau (ch. 79) ; la choucroute (ch. 80) ; la mouture et le pain (ch. 88). Le ch. 97
  (Allonger la saison) n'était pas encore écrit à la rédaction ; il l'est depuis, et les renvois
  ont été relus contre lui le 27 septembre (semis dans la maison, châssis, tunnel, serre).

---

## 1. Provenance de chaque chiffre

Toutes les fiches sont dans `/sources`. « Non officielle » : service universitaire, livre ancien,
encyclopédie, faute de page gouvernementale sur le sujet. Les calculs du livre (conversions,
produits, divisions) sont dits comme tels.

| Valeur dans le chapitre | Où | Fiche source | Type |
| --- | --- | --- | --- |
| 9 500 kcal/jour pour la famille ; 520 g de glucides/jour = 300 kg de pommes de terre par 100 jours ; plafond de protéines 35 % (30 % enfant) | §2, §5-A | ch. 21 §5.2 à 5.4 et leurs fiches (`98-reprises-sources-deja-enregistrees.md`) | Officielle (reprise) |
| Mal de caribou mortel en quelques semaines | §2, §9 | `CLAUDE.md`, ch. 19 | Rappel obligatoire |
| Tableau famille de quatre : longueurs de rang, semence, écartements, jours, rendements (colonne « bon » des légumes) | §2, §5-A, §5-C, §5-E | `98-uaf-16-etapes-jardin-alaska.md` | Non officielle (UAF) |
| Légumes de garde de ce tableau : 302 kg sur environ 99 m² aux écartements donnés, environ 150 000 kcal, **16 jours** de la famille ; « dix à quarante fois plus de terre » = 1 000 à 3 800 m² ÷ 100 m² | §2 | Calcul du livre : tableau UAF × valeurs FCÉN ; chou à 80 % comestible (ch. 80). Le jardin de 93 m² du même guide n'est plus cité : ce sont deux énoncés distincts | Calcul |
| Jardin ordinaire : environ 1 kg/m² de pommes de terre (100 pi de rang à 12 po → 50 lb) | §5-A | `98-uaf-16-etapes-jardin-alaska.md` (texte « POTATOES ») | Non officielle (UAF) |
| kcal au kilo et protéines de chaque culture (pomme de terre 770 ; rutabaga 370 ; navet 280 ; carotte 410 ; betterave 430 ; chou 250 ; oignon 400 ; panais 750 ; orge 3 540 ; avoine 3 890 ; seigle 3 350 ; pois 3 520 ; gourgane 3 410 ; courge 340) ; grain 3 350 à 3 900 ; pomme de terre à 79,3 % d'eau (« quatre cinquièmes ») | §3, tableau 1, §5-E, étape 20 | `98-sante-canada-fcen-cultures.md` (+ JSON) ; orge et avoine recoupées fiche par fiche : `98-usda-fdc-orge-avoine.md` (+ 2 JSON) | Officielle |
| Rendements « prudents » des grains, des pois et de la pomme de terre (Québec 1915-1916 : orge 0,10 à 0,15 kg/m², avoine 0,09 à 0,12, seigle 0,09 à 0,10, pois 0,09 à 0,11, pommes de terre 0,9 à 1,0) | §3, tableau 1, tableau 2 | `98-annuaires-canada-rendements-historiques-quebec.md` (conversion avec les poids au boisseau mesurés ; 60 lb pour la pomme de terre, **confirmé** par le manuel de 1874, p. 218-219 : 14 002 lb = 233 boisseaux) | Officielle (historique) + calcul |
| Rendement prudent du navet et du rutabaga, 1,8 à 2,1 kg/m² (« Navets, etc. », Québec 1915 : 308,25 boiss./acre ; 1916 : 265) ; surface prudente des racines 75 à 85 m² (150 kg ÷ 1,78 à 2,07) | Tableau 1, tableau 2 | Même fiche, ajout du 27 septembre ; 60 lb le boisseau, non imprimé (`98-NON-OBTENUES.md`, point 12) | Officielle (historique) + calcul |
| Rendements modernes de la région 12 (Saguenay–Lac-Saint-Jean–Côte-Nord) : pommes de terre 37 370 kg/ha, orge 2 692, avoine 2 236, seigle 3 027 ; pois secs, province 2 064 | §5-A, tableau 1 | `98-fadq-rendements-reference-2025.md` | Officielle |
| Grain au jardin 5 à 7 lb/100 pi² (0,24 à 0,34 kg/m²) ; semence ¼ lb/100 pi² (12 g/m²) ; rangs de 6 po (15 cm) ; 1,5 à 2,5 po (4 à 6 cm) ; farine complète 95 à 100 % du grain | §3, tableau 1, étapes 2, 32, 44, §9 | `98-uaf-c135-cereales-au-jardin.md` | Non officielle (UAF) |
| Semis à la volée : +10 % de semence, 5 à 10 % de rendement en moins ; norme ancienne 135 kg/ha ; orge vêtue 10 % de balle ; avoine nue −25 à 30 % de poids, sous 10 % d'eau ; seigle le plus rustique, sensible à l'ergot, dur à battre ; vernalisation sous 5 °C ; grain ≤ 60 °C (température du grain, écrite pour le blé ; **étendue** au grain de table). Le « 40 °C semence » du tableau 4-27 est une température **d'air** de séchoir, écrite pour le blé : **retiré du chapitre** le 27 septembre | Tableau 1, étapes 30, 32, 42 | `98-maaaro-guide-agronomique-cereales-ch4.md` | Officielle (Ontario) |
| Semence : jamais plus chaude que la main, 35 °C d'air au plus, loin du poêle, à l'air pendant des semaines | Étape 42, §6, §4, §9 | Ch. 100 §5-G (étape 30) et §9, et leurs fiches | Reprise |
| Orge : 2 à 2,5 boisseaux/acre à la volée ; racines courtes (3-4 po → 8 à 10 cm) ; pourrit en sol froid, attendre la pluie chaude ; **semée en sol froid, « stunted, weak and yellow » et « will never recover lost ground »** (p. 181-182, `98-cfm-1874-manuel-fermier-canadien-extraits.txt`) ; après une culture sarclée ; pluie qui ternit l'orge coupée (le poids perdu, non sourcé, a été **coupé**) ; orge courte en tas | Étapes 3, 31, 37, §7 | `98-cfm-1874-manuel-fermier-canadien.md` | Non officielle (1874) |
| Avoine : 3 boisseaux/acre ; semis clair = rouille | Étape 32, §7 | Idem | Non officielle (1874) |
| Rouille (note [^7]) : pustules allongées, orange clair, poudreuses, surtout sur le limbe ; jaunissement autour ; feuilles tuées | §7 | `98-wikipedia-rouille-couronnee-avoine.md` | Non officielle |
| Pois : 2,5 à 3 boisseaux/acre à la main (17 à 20 g/m²) ; semé tôt, plus de rendement et plus d'insectes | Étape 23 | Idem | Non officielle (1874) |
| Sarrasin : 9 à 10 semaines ; gelée d'automne qui le ruine s'il mûrit tard | Étape 30 | Idem ; « après tout risque de gel » repris du ch. 96 | Non officielle (1874) |
| Pomme de terre : meilleure culture sur terre neuve ; terre brûlée riche en potasse ; suivie d'une forte récolte de grain ; rangs de 28 po (71 cm) ; dernier buttage avant la fleur ; fumier trop riche → tubercules creux ; ne pas laisser les germes s'allonger ; ne pas planter les petits ; fendre de la tête à la queue ; tableau de semence entière/coupée ; yeux plantés, reste mangé ; germes cassés, la semence repousse ; yeux seuls qui pourrissent en terre mouillée ; laisser sécher au sol, 2 h en sol léger ; « sans rien, le tiers » | Étapes 3, 7 à 13, 16, §9 | Idem | Non officielle (1874) |
| Planche paresseuse : planches de 3 à 7 pi, tranchées de 18 po à 3 pi et de 1 pi à 20 po ; morceaux à 9-10 po ; recharge de 2-3 po trois semaines après, contre le chiendent | §9 | Idem ; « on l'a faite à Terre-Neuve, avec du varech » : `98-wikipedia-lazy-bed.md` (« documented in Newfoundland » ; la phrase du « mauvais nom », d'un seul observateur irlandais, est **coupée**) | Non officielle |
| Battage sur perches au-dessus d'une toile, perches à 1-2 po ; nettoyer tout de suite sinon la balle humide chauffe le grain | Étape 41, §9 | Idem (écrit pour le sarrasin ; **étendu** à tout grain battu humide) | Non officielle (1874) |
| Semence du plan : morceaux de 40 à 60 g à 28 cm sur des rangs de 71 à 91 cm = 0,16 à 0,30 kg/m² ; **0,2 à 0,25 kg/m²** à 50 g (0,05 ÷ (0,28 × 0,91) = 0,196 ; 0,05 ÷ (0,28 × 0,71) = 0,252) ; le cinquième au quart d'une récolte de 0,9 à 1,0 kg/m². Tableau 2 : surface prudente 630 ÷ (1,0 − 0,2) = 790 à 630 ÷ (0,9 − 0,25) = 970 m² ; semence 790 × 0,2 = 160 à 970 × 0,25 = 240 kg ; bon : 630 ÷ (2,6 − 0,2 à 0,25) = 265 m², semence 55 à 65 kg. Morceaux du tableau de 1874 : tubercule de 2 oz (57 g) coupé en deux ≈ 28 g, en quatre ≈ 14 g | §3, §4, §6, étapes 8-9, tableau 2, §9 | Calcul sur `98-uaf-pommes-de-terre-alaska.md` et `98-cfm-1874-manuel-fermier-canadien.md` (petits morceaux qui pourrissent en terre froide et mouillée, p. 214-215) | Calcul |
| Pomme de terre : morceaux de 1,5 à 2 oz (40 à 60 g), 2 yeux ; couper au-dessus de 3 oz (85 g) ; laver la lame ; 7 à 10 jours au frais ou une nuit ; rangs 36 po, jamais sous 24-30 po ; 11 po (7-13) ; couvrir 4-6 po (2-4 en sol froid) ; buttes de 2 et 3 pi, 6 pi entre ; butter à 8-12 po ; floraison = moment critique pour l'eau ; pas de fumier non composté ; pH < 5,4 et gale ; défaner 1 à 2 semaines ; creuser à 8-10 po ; blessées mangées tout de suite ; gelées = immangeables ; gel du sol : arracher quand même ; pommes de terre nouvelles ; boules vertes toxiques | Étapes 8 à 17, §8 bloc 4, §9 | `98-uaf-pommes-de-terre-alaska.md` | Non officielle (UAF) |
| Semis jusqu'à deux semaines avant la dernière gelée (pomme de terre, pois, carotte, betterave, navet, rutabaga, panais) ; haricot marginal qui gèle ; courge et haricot sous plastique ; famille du chou et mouche du chou ; rotation contre la mouche ; navet de mi-juillet meilleur pour la garde ; éclaircissage mangeable ; rutabaga éclairci à 8-10 po ; betterave qui monte en graine | §3, étapes 18, 19, 24, 29, §7, §9 | `98-uaf-16-etapes-jardin-alaska.md` | Non officielle (UAF) |
| Saison sans gel 108 à 124 j en moyenne ; 89 à 95 j ou moins une année sur dix ; dernière gelée 25 mai (Sept-Îles), 30 mai (Baie-Comeau) ; une année sur dix après le 9 ou le 11 juin ; « on plante pour 90 » | §3, étape 11 | `34-eccc-normales-saison-sans-gel-cote-nord.md` ; ch. 41 | Officielle (reprise) |
| Côte-Nord pôle de pomme de terre de semence, éloignement et climat frais contre insectes et maladies | §2 | `98-upa-portrait-cote-nord.md` | Non officielle (UPA) |
| Mildiou : champs détruits en quelques jours ; hiverne seulement dans les pommes de terre vivantes ; HR > 90 %, nuits 10-15 °C, jours 16-20 °C ; 7 à 10 jours ; symptômes feuille, tige, tubercule ; odeur vinaigrée ; alternariose arrêtée par les nervures ; tomate plus sensible et transplants ; surface double ; sacs ; rebuts enfouis ; butte profonde ; creux et lisières ; défanage ≥ 2 semaines ; récolte au sol sec ; tubercules mouillés ou meurtris ; ventiler la récolte | Étapes 13 à 17, §6, §7 | `98-mildiou-pomme-de-terre-iriis-gnb.md` | Officielle (Québec, N.-B.) |
| Ergot : sclérote **souvent de la taille et de la forme du grain**, noir violacé dehors, blanc violacé dedans ; toxique pour l'humain **et pour l'animal**, farine et fourrage aussi toxiques que le grain | §7, §8 bloc 1, étape 35 | `14b-ccg-ergot-ble.md` (CCG) ; ch. 88 §5.F et §8 bloc 2 | Officielle |
| Ergot et grossesse : « uterus contractions can be caused even by small intake quantities [...] uterus bleeding and miscarriage » | §8 bloc 1 | `98-cfs-hong-kong-alcaloides-ergot-grossesse.md` (PDF `14b-cfs-hong-kong-ergot-alkaloids.pdf`, p. 10, § 15) | Officielle (Hong Kong) |
| Grain de provende : tolère deux fois et demie plus d'ergot | §9 (semence d'origine inconnue) | ch. 88 §8 bloc 2 (`14b-ccg-ergot-ble.md`) | Reprise |
| Ergot : sclérote noir ou violet, blanc-gris dedans, jusqu'à 10 fois le grain, 2 cm ; seigle, puis orge et blé, avoine rarement ; hiver froid puis printemps mouillé ; floraison fraîche et humide ; miellat en 5 jours ; bords du champ (« typically higher », rendu par « d'habitude le pire ») ; enfouir, rotation 1-2 ans, pas de céréale de printemps à côté du seigle d'automne ; faucher les graminées avant leur fleur ; flottation à 20 % ; alcaloïdes actifs dans la farine ; symptômes ; farine du commerce « at very little risk » ; le grain fait maison doit être vérifié | Étapes 3, 30, 34, 35, §8 bloc 1, §9 | `98-saskatchewan-ergot-cereales.md` ; ordre de sensibilité : `98-uaf-c135-cereales-au-jardin.md` | Officielle (Saskatchewan) |
| Saumure : 250 g de sel par litre d'eau = 20 % du poids ; limitée au seigle, à l'orge et au blé ; aussi avant de semer un grain d'origine inconnue (la source la donne justement pour des lots de semence) | §4, §9, étape 43 | Calcul du livre (250 ÷ 1 250) ; la source ne précise pas la base du 20 % (voir `98-NON-OBTENUES.md`, points 9 et 16) | Calcul |
| Fusariose : masse rosée sur l'épi (UAF) ; grains minces, ratatinés, blanc craie, germe parfois rose, duvet visible surtout à la loupe ; le lot ne se moud pas ; mycotoxines, se développe en entrepôt humide ; grain humide qui moisit au-dessus de 15 % ; toxines qui passent le four ; grain qui chauffe = moisissure qui travaille | Étape 43, §6, §7, §8 bloc 2 | `98-uaf-c135-cereales-au-jardin.md` ; `14b-ccg-fusariose.md` ; `14b-manitoba-mycotoxines.md` ; ch. 88 §3, §5.F, §5.G (étape 45), §7 et §8 | Non officielle + officielle + reprise |
| Stade pâteux dur : épi jaune pâle, ongle qui ne marque plus, 25 à 35 % d'eau ; garde « longtemps » à 13-15 % (« safe, long-term storage » ; le « au moins un an », sans ligne de source, est **remplacé**) ; balle indigeste « by non-ruminant animals or humans » ; terre neuve pauvre en azote ; seigle « long growing season requirement but yields less » ; test du four 60-65 °C, 12 h ; coupe à 3-4 po ; moyettes 7-10 j / 3-4 j ; sacs de papier ou de toile ; marcher sur les sacs ; ne pas trop battre la semence nue ; oies et grues aux bords ; épis versés qui germent ; avoine décortiquée rance en 4 jours sans étuvage 30-60 min à 240 °F (116 °C) ; avoine à pH 5-5,5 et en sol froid ; avoine 7 à 10 j après l'orge ; blé +10 j ou +20-25 j, gelée à l'épiaison ; seigle mal adapté, seigle d'automne semé mi-août, non recommandé en Alaska ; orges à six rangs plus hâtives, plus égales, s'égrènent plus | Étapes 30 à 42, §6, §7, §9 | `98-uaf-c135-cereales-au-jardin.md` | Non officielle (UAF) |
| « Vers 1830 » : 125 à 150 h/ha (250 à 300 h pour 5 acres de blé en 1830, charrue, herse, semis à la main, faucille, fléau) ; fléau : deux bâtons reliés par corde, cuir ou chaîne ; sept boisseaux par jour | Étape 5, §9 | `98-growing-a-nation-heures-de-travail.md` ; 150 à 190 kg = 7 × 48 ou 60 lb (poids au boisseau de 1954) | Non officielle (USDA / Ag in the Classroom) + calcul |
| Gourgane : cultures du XIXe siècle au Saguenay, Charlevoix, Bas-Saint-Laurent ; graine à −3 °C, germination vers 3 °C, jeune plant à −3 °C ; semer tôt, coulure si tardif ; sols lourds égouttés ; 5 à 7 cm ; 200 000 plants/ha ; 175 à 200 kg/ha pour PMG 800-900 g ; germination ≥ 85 % ; 115 à 120 jours, début septembre ; gousses noires ; 13 % d'eau ; verte en juillet ; rendements 2,1 / 3,5 / 3,9 t/ha | Étape 22, tableau 1, §9 | `98-agrinova-guide-gourgane-2017.md` | Non officielle (guide régional) |
| Favisme : lié à l'X, surtout les hommes ; origines africaine, méditerranéenne, asiatique ; fèves parmi les déclencheurs ; la plupart des épisodes légers sans symptôme ; ictère, urine foncée, fatigue, essoufflement, douleurs dorsales ou abdominales ; lésion rénale aiguë ; traitement : retirer le déclencheur, soins de support (rendus au chalet par « repos, à boire, compte des pipis », avec `[À VÉRIFIER]`) ; dépistage familial | §7, §8 bloc 5 | `98-msd-deficit-g6pd.md` ; plus de 8 h sans uriner = la vie en jeu : ch. 28, étapes 5 et 10 | Non officielle (Manuel MSD) + reprise |
| Lectines : en quantité variable dans les légumineuses, le haricot rouge le plus chargé ; 1 à 3 h ; nausées, vomissements, diarrhée ; trempage ≥ 5 h dans 2 à 3 volumes, eau jetée, ≥ 10 min de gros bouillon ; pas de mijoteuse | Étape 26, §7 | `98-sante-canada-lectines-legumineuses.md` (règle écrite pour le haricot rouge, **étendue** par le livre à tout haricot sec et à la gourgane ; l'extension n'est plus dite dans le texte, elle vit ici) | Officielle |
| 115 kg de chou pour six mois de choucroute | Tableau 2, étape 19 | ch. 80 §5-C | Reprise |
| Fournée d'un kilo ≈ 3 600 kcal (demi-fournée = hypothèse du tableau 2) ; grain qui moisit au-dessus de 15 % | Tableau 2, §8 | ch. 88 | Reprise |
| Durées de garde et préconditionnements (pomme de terre 7-8 °C, 4 à 8 mois ; 2 à 3 semaines à 10-15 °C ; courge 30 °C) | Tableau 1, étapes 17, 29 | ch. 79 et ses fiches | Reprise |
| 25 L/m²/semaine | Étapes 4, 13, §6 | ch. 95 et `74-quebec-gestion-eau-potager.md` | Reprise |
| Pesée : 1 kg de grain, écart de 20 g entre 13 et 15 % ; six divisions d'un sac de 1 kg = 15,6 g | §9 | Calcul du livre ; balance à fléau et masses par moitiés : ch. 5 §9 | Calcul |
| « Des pommes de terre sans fumure rendaient le tiers » : sur une terre **déjà cultivée** (J. W. Lang, cité p. 211-212) ; la terre neuve est « very superior » pour la pomme de terre (p. 210) | §9 | `98-cfm-1874-manuel-fermier-canadien-extraits.txt` | Non officielle (1874) |
| Faucille environ cinq fois plus lente que la faux | §9 | ch. 99 §4 | Reprise |
| Tableau 2 : 630 kg de pommes de terre (plancher × 2,1) ; 182 kg de grain ; 50 kg de légumineuses ; 150 kg de racines ; surfaces, semences et kcal/jour. Totaux recalculés le 27 septembre : prudent 790 + 1 400 + 265 + 40 + 75 = 2 570 à 970 + 2 000 + 680 + 40 + 85 = 3 775 → « 2 600 à 3 800 m² » ; bon 265 + 550 + 135 + 40 + 35 = 1 025 à 1 275 → « 1 000 à 1 300 m² » | Tableau 2, §1 | **Trois hypothèses de calcul, dites comme telles dans le texte** (grain, légumineuses, racines) ; le reste est calcul sur les fiches ci-dessus | Calcul |

**Descriptions sans chiffre, non sourcées.** Depuis la correction du 27 septembre, le texte ne
porte plus la mention « règle d'atelier » ni « non sourcée » (la provenance ne s'imprime pas) ; la
liste vit ici : semer en deux passages croisés (note [^4]) ; le fléau — bois franc, liaison qui
tourne, pose des gerbes, geste, lanière de rechange —, et le mécanisme de la blessure (battoir qui
revient sur celui qui bat, lanière usée qui cède et lance le battoir) ; la gerbe frappée sur un
baril ; le second tamis percé au clou « d'un trou juste plus petit que le grain entier », essayé sur
une poignée de bon grain ; « une moustiquaire ne laisse passer que la poussière » (maille plus fine
que le grain) ; la rondelle de chair autour de l'œil ; la bûche roulée pour raffermir. Le test « si
la main ne tient pas à plat sur la claie » et la note 9 sont **coupés** : remplacés par la règle du
ch. 100 (jamais plus chaude que la main).

---

## 2. Chiffres marqués `[À VÉRIFIER]`

**Sept marques dans le texte depuis la correction du 27 septembre 2026**, pour six questions (le
délai du favisme est marqué deux fois, au §7 et au §8). Chacune se lève à la source, ou la phrase
se coupe avant l'impression. Détail des recherches : `sources/98-NON-OBTENUES.md`.

| # | Où | Ce qui manque | Ce qui le lèverait |
| --- | --- | --- | --- |
| 1 | Étape 30 (seigle d'automne) | La date de semis du seigle d'automne pour la Côte-Nord (la mi-août est celle de l'Alaska) | Un guide québécois ou ontarien du nord sur le seigle d'automne |
| 2 | §7 (mal de ventre après des gourganes) et §8 bloc 5 : deux marques | Le délai entre le repas de fèves et les premiers signes du favisme | Une page officielle ou un manuel médical sur le favisme (délai d'hémolyse après les fèves) |
| 3 | §8 bloc 5 | Ce que boire change à une crise d'hémolyse (protection du rein) | Même source |
| 4 | §8 bloc 5 | Si la fève verte ou crue déclenche la crise plus que la sèche cuite | Même source ; si oui, le dire aussi au §9 (gourganes vertes) |
| 5 | §9 (saumure) | Si un grain vêtu, l'avoine surtout, coule dans la saumure à 20 % pendant que l'ergot remonte | Une source sur la flottation des sclérotes dans l'avoine |
| 6 | §9 (ce qu'on perd la première année) | Combien le grain et les racines perdent la première année sur une trouée neuve | Un essai sur terre nouvellement défrichée, sans fumure |

**Points ouverts hors du texte (ne changent aucune consigne) :**

| # | Point | État |
| --- | --- | --- |
| A | Poids du boisseau de pommes de terre (60 lb) | **Levé** : le manuel de 1874 convertit lui-même 14 002 lb en 233 boisseaux et 9 335 lb en 155 boisseaux (p. 218-219) |
| B | Si les valeurs FCÉN de l'orge et de l'avoine sont sans balle | **Resserré** : ce sont les fiches USDA 20004 « Barley, hulled » et 20038 « Oats », enregistrées (`98-usda-fdc-orge-avoine.md`) ; « hulled » = sans balle en usage américain, mais aucune fiche ne l'écrit |
| C | Poids du boisseau de « navets, etc. » (rendement prudent du navet et du rutabaga) | Ouvert : 60 lb pris comme pour la pomme de terre |
| D | Proportion de grains fusariés sous laquelle un lot trié se mangerait | Ouvert ; le chapitre suit le ch. 88 (le lot ne se moud pas) |

---

## 3. Les rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle | Où dans le ch. 98 | Pourquoi ici |
| --- | --- | --- |
| **Viande maigre seule = mal de caribou, mortel en quelques semaines** | §2 (bon choix), §9 (ce qui ne se remplace pas) | C'est la raison nutritionnelle du champ : l'amidon est la moitié du remède, le gras l'autre |
| **Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence** ; légumes peu acides à l'autoclave seulement | Étape 21, §9 | La récolte arrive d'un coup et pousse à la mise en pot |
| **Thuyone du cèdre** — sapin baumier ou épinette pour la vitamine C | §3 | Le chapitre parle de la vitamine C de l'hiver |

**Non repris, parce que hors sujet :** 74 °C du gibier, foie et reins de cervidés, trichinellose,
tularémie (aucun lièvre dans ce chapitre), botulisme de type E, génératrice.

**Encadré DANGER, cinq blocs :** ergot du grain fait maison ; grain rentré humide et fusariose ;
semence traitée ; boules vertes de la pomme de terre (enfants) ; favisme. **Refusés dans
l'encadré** : les lectines des haricots (hospitalisation rare, symptômes courts : §5-D et §7), le
mildiou (perte de récolte, pas d'intoxication : §5-B et §7), la mouche du chou.

---

## 4. Planches voulues

| # | Sujet | Ce qu'elle montre |
| --- | --- | --- |
| 98-01 | **Le fléau** : fabrication et geste | Vue éclatée : manche, battoir, deux boucles, lanière de cuir ou de babiche qui tourne ; puis le geste sur la toile, gerbes en deux rangées épis au milieu |
| 98-02 | **Couper la semence de pomme de terre** | Tubercule fendu de la tête à la queue, morceaux de 40 à 60 g à deux yeux ; en encart, l'œil levé avec sa rondelle de chair (§9) |
| 98-03 | **La butte de pomme de terre en coupe**, et les trois buttages jusqu'à la fleur | Coupe de terre : morceau à 10-15 cm, butte qui monte, tubercules au noir, pluie arrêtée par la butte ; rangs de 71 à 91 cm |
| 98-04 | **La planche paresseuse sur terre neuve** | Coupe : gazon non retourné, varech, morceaux à 23-25 cm, tranchées de 46-91 cm × 30-50 cm, recharge de 5-8 cm à trois semaines |
| 98-05 | **Semer à la volée** | Carré divisé au cordeau, sac de semence pesé par bande, deux passages croisés, geste du bras |
| 98-06 | **Couper, lier, dresser en moyettes** | Faucille à 8-10 cm, lien de paille tordue, moyette en cône et en double rangée |
| 98-07 | **Battre sans fléau** : les perches au-dessus de la toile, et les sacs piétinés | Vue en perspective de l'aire : toile, perches espacées de 2,5-5 cm sur deux traverses, paille dessus, grain dessous |
| 98-08 | **Vanner et tamiser** | Versement de l'épaule dans le vent sur la toile ; les deux tamis empilés, ce qui reste sur chacun : grillage de poulailler dessus, tôle percée au clou d'un trou juste plus petit que le grain dessous |
| 98-09 | **Trier l'ergot à la saumure** | Chaudière, saumure, sclérotes qui flottent, écumoire ; en encart, un épi avec sclérote dépassant des balles, **et une poignée de grain où les sclérotes ont la taille du grain** (c'est la couleur qui les trahit) |
| 98-10 | **Deux séchages** : la claie du grain de table au-dessus du poêle, la moustiquaire de la semence loin de lui | Moustiquaire tendue sur perches, couche mince ; la semence à l'air, dans la pièce du poêle mais loin de lui (ch. 100 §9) |
| 98-11 | **Le mildiou et l'alternariose** (planche d'identification, ou photos sous licence) | Tache qui passe les nervures avec feutrage blanc à l'envers ; tache arrêtée par les nervures ; tubercule coupé, chair marbrée de rouille |

La 98-11 est une identification : c'est peut-être une photo plutôt qu'une planche (règle du skill
planches). Les dix autres montrent un geste ou une chose qu'on fabrique.

---

## 5. Renvois vers d'autres chapitres

Tous vérifiés contre le texte des chapitres existants le 27 septembre 2026. Revérifiés à la
correction du même jour pour les ch. 9, 21, 28, 47, 54, 67, 88, 96, 97, 100 et 101 (§7 ci-dessous).

| Chapitre | Section citée | Ce qu'elle dit vraiment |
| --- | --- | --- |
| 2 | — | La bascule maison → chalet |
| 5 | §9 | La balance à fléau ; le grain séché sur la claie au-dessus du poêle jusqu'à ce qu'il casse net |
| 11 | — | Feu de forêt |
| 16, 18 | — | Le groupe et plusieurs familles |
| 19 | — | Mal de caribou |
| 20 | — | Vitamine C, pomme de terre cuite dans sa pelure ; thuyone |
| 9 | — | Le sel décide de l'hiver de viande (le « denrée qui manque en premier » attribué au ch. 67 est retiré) |
| 21 | §5.2, §5.3, §5.4 | 9 500 kcal ; 35 % de protéines retenus comme limite de sécurité (« on ne dépasse pas », plus « le corps plafonne ») ; plancher de glucides, 300 kg de pommes de terre / 100 j |
| 28 | §5-A, étapes 5 et 10 | Lire un malade ; compter les pipis ; plus de 8 heures sans uriner = la vie en jeu (favisme) |
| 41 | — | « On plante pour 90 » |
| 47 | Étapes 30 à 36 | L'affût à la sauvagine (le ch. 54 y renvoie lui-même) |
| 54 | — | L'outarde, comme gibier |
| 67 | §9 | Tirer du sel du fleuve |
| 72 | — | Le gras |
| 78 | — | Conserves : autoclave pour le peu acide |
| 79 | §1, étapes 8 à 11, §9 | Durées de garde, récolte, tri, préconditionnement, silo de terre, panais au rang |
| 80 | §5-C | 115 kg de chou pour six mois |
| 88 | §3, §5.F, §5.G, §8 blocs 1-3, §9-D | Grain humide, tri et mouture, garde du grain, semence traitée, ergot, grain moisi, pain de grain germé |
| 95 | étapes 11, 13, 15 ; §7 ; §8 ; §9 | Semis dans la maison, buttage, arrosage au volume, pomme de terre verte, mur sud et abris |
| 96 | étapes 16, 27, 28 ; §5-E ; §7 ; §8 ; §9 | Cendre jamais devant les pommes de terre, inoculer les pois, piquet de rotation, rotation, gale, brûlis, poquets et billon de varech |
| 97 | §5-C, §5-D, §5-E, §5-F | **Écrit depuis.** Semis dans la maison, châssis froid, tunnels, serre ; la « cloche » (absente du ch. 97) est remplacée par « le tunnel et la serre » |
| 99 | étape 4, étape 7, étape 54, §4 | Citrouille cueillie avant le froid, grain seulement au printemps, faux réglée sur soi, faucille cinq fois plus lente |
| 100 | §5-D, §5-E (étapes 19, 21), §5-G (étapes 30 et 32), §5-I, §5-K, §5-L, §8, §9 | Maturité des gousses, battage et vannage, règle de température de la semence (jamais plus chaude que la main, 35 °C d'air), test du marteau, étiquettes au crayon de plomb, test de germination, pommes de terre de semence, semence traitée, séchage loin du poêle, semence d'épicerie et graine vraie |
| 101 | — | **Plus cité.** L'« orge vêtue aux bêtes, moulue avec sa balle » est coupée : le ch. 101 n'en parle pas et la balle ne se digère pas chez les non-ruminants |
| 103 | — | Babiche |
| 105, 111 | — | Fil ; trempe et lame de ressort |
| 00b | — | Achats |

---

## 6. Ce qui cloche ailleurs (pour JP, rien n'a été modifié)

1. **Seigle d'automne.** Le ch. 99, étape 7, dit « aucun semis d'automne » et renvoie au ch. 98
   (« la même règle vaut ici, plus fort encore »). Le ch. 98 garde la règle pour le plan, mais
   ouvre une planche d'essai de seigle d'automne (la céréale d'automne la plus rustique), et le
   ch. 96 sème du seigle d'automne en engrais vert qui passe l'hiver. À trancher : planche d'essai
   ou interdiction.
2. **Fumier cru devant les pommes de terre — réglé dans le ch. 96.** Relu le 27 septembre : le
   tableau de l'étape 28 du ch. 96 met maintenant le fumier cru sur la planche des choux et écrit
   « Aucun fumier cru, aucune cendre, aucune coquille » sur celle des pommes de terre. Texte
   d'origine du constat : le ch. 96, tableau de rotation (étape 28), met « fumier
   cru à l'automne d'avant » sur la planche des pommes de terre ; les deux sources du ch. 98
   (Alaska, 1874) disent d'éviter le fumier non composté et le fumier grossier sur la pomme de
   terre (gale, tubercules creux). Le ch. 98 ne dit que « varech à l'automne d'avant ».
3. **La saison de 90 à 100 jours.** Le ch. 79 (§2) et le ch. 00b (ligne des semences) disent encore
   « 90 à 100 jours » ; les ch. 41, 95 et 98 donnent 108 à 124 jours en moyenne et « 90 une année
   sur dix ».
4. **Renvois du ch. 00b non renumérotés ?** La ligne des semences renvoie à « 95, 96 » (96 était
   Semences, maintenant 100) ; la ligne du foyer de forge renvoie à 107 (souder) plutôt qu'à 111
   (trempe). Le ch. 41, ligne de mai, renvoie aussi à « 96 » pour les semis.
5. **Le ch. 101 dit « la Côte-Nord ne fait pas de grain ».** Vrai du commerce ; le ch. 98 montre
   qu'une famille peut en faire à la main (orge nue, avoine). Nuancer en « ne fait presque pas de
   grain » ?
6. **Le mot « quintaux ».** La commande disait « mettre en quintaux » ; le mot n'a pas été trouvé
   dans une source québécoise (le glossaire de 1930 de BAnQ est un PDF d'images). Le chapitre dit
   « moyettes ». Si c'est le mot de JP, il remplace « moyette » partout.
7. **Le ch. 99 renvoie au « ch. 96, §5-H »** pour la jachère ; la jachère du ch. 96 est au §5-E.
8. **Sel qui reste ou qui part.** Le ch. 95 dit que le sel du varech « ne s'en va pas » du sol ; le
   ch. 96 dit que la pluie le lave dans un sable bien arrosé. Le ch. 98 évite la question.

---

## 7. Correction du 27 septembre 2026, après les deux vérificateurs

Trente-six constats reçus (24 du vérificateur technique, 12 du vérificateur sécurité). Trente-cinq
appliqués en tout ou en partie ; un seul écarté en entier (les contradictions à trancher par JP).
Corrigé par Edit, sans réécrire le chapitre.

### Appliqués

**Bloquant**

- **§7, grain qui chauffe ou qui colle.** La ligne disait « trop humide, étaler et sécher » et
  contredisait le §8 bloc 2 et le ch. 88. Elle est coupée en deux : le grain qui chauffe, colle ou
  sent le moisi ou le renfermé est une moisissure qui travaille (ch. 88 §5.G, étape 45) et **sort de
  la cuisine sans qu'on y goûte** ; seul le grain encore froid et sans odeur, qui s'écrase sous
  l'ongle, se sèche.

**Importants**

- **Semence de pomme de terre (une seule taille).** Le plan compte sur des morceaux de 40 à 60 g
  (étape 8) : 0,2 à 0,25 kg/m², le cinquième au quart de la récolte. Recalculés : §3, §2, §4, étape 9,
  tableau 2 (790 à 970 m² prudent, 265 m² bon ; semence 160 à 240 kg et 55 à 65 kg), §6, §1 et le
  total (2 600 à 3 800 m²). Le tableau de 1874 reste, avec ses morceaux de 28 et 14 g dits « sous le
  minimum de l'étape 8 », réservés à l'année où la semence manque, en terre égouttée, sur le billon.
- **Séchage de la semence.** Le 40 °C (température d'air de séchoir, écrite pour le blé) et le test
  « si la main ne tient pas à plat » sont coupés, avec la note 9. La semence suit le ch. 100 : à l'air,
  loin du poêle, jamais plus chaude que la main, 35 °C d'air au plus (étape 42, §4, §6, §9).
- **Rotation.** Le navet et le rutabaga vont sur la planche des choux ; la planche « racines » porte
  carottes, betteraves, panais et oignons, comme au ch. 96 (étape 3, tableau 2).
- **Provenance imprimée.** Retirés : « tel qu'on le conseille […] en Alaska », « le même guide de
  l'Alaska », « aucune mesure n'existe », « rien ne les mesure », « la règle est écrite pour le
  haricot rouge ; le livre l'applique », « en Alaska, où on ne le recommande pas », « la description
  canadienne de 1874 », « la façon de 1874 », « un cultivateur cité en 1874 », « règle d'atelier »,
  « non sourcée » (notes 4, 8, 9). La provenance vit au §1.
- **Colonne « prudent » des légumes.** Les chiffres du jardin passent dans la colonne « bon ». Le navet
  et le rutabaga reçoivent un prudent sourcé : « Navets, etc. », Québec 1915-1916, 1,8 à 2,1 kg/m².
  Racines du tableau 2 : 75 à 85 m² en prudent. Carotte, betterave, chou et oignon : pas de prudent,
  et le texte le dit.
- **Pommes de terre de semence au chaudron (sécurité).** Le geste « planter les yeux, manger le
  reste » est limité aux pommes de terre de table, le reste seulement s'il n'est ni vert ni amer,
  jamais sur une semence achetée (§4, §9, §8 bloc 3).
- **Gourgane et lectines (sécurité).** La ligne du §7 est coupée : haricots secs d'un côté ; mal de
  ventre après des gourganes de l'autre, « cuisson insuffisante ou début de favisme », sans
  resservir, en surveillant urine et blanc des yeux, délai `[À VÉRIFIER]`. Étape 26 : renvoi au §7 et
  au bloc 5.
- **Ergot de la taille du grain (sécurité).** Bloc 1 : souvent la taille et la forme du grain ; c'est
  la couleur qui le trahit (CCG). §7 aussi.
- **Grain des bords et lot chargé (sécurité).** Ni à la table ni aux bêtes, que l'ergot empoisonne
  aussi ; brûlé ou enterré loin des planches (bloc 1, étape 35).
- **Fusariose (sécurité et technique).** Conduite alignée sur le ch. 88 : un lot qui porte des grains
  fusariés ne se moud pas, même s'il ne sent rien. Description harmonisée : se voit parfois (masse
  rosée sur l'épi), pas toujours (grains blanc craie, ratatinés, duvet à la loupe) ; le rose vif et
  égal, c'est la semence traitée (bloc 2, étape 43, §6, §7).
- **Grain à oiseaux ou de provende semé (sécurité).** Il passe à la saumure avant d'être semé, puis
  sèche comme une semence (§9).

**Mineurs retenus**

- 3 350 à 3 900 kcal ; « quatre cinquièmes » d'eau (§3).
- « Dix à quarante fois » ; « environ 100 m² de légumes de garde » au lieu du jardin de 93 m² (§2).
- Étape 20 : « parmi les racines qui mûrissent sûrement dans la saison », panais nommé comme exception.
- Étape 5 : « vers 1830 ».
- Étape 37 : le poids perdu du grain mouillé est coupé (non sourcé).
- Tableau 1, §1, §3 : « au moins un an » remplacé par « longtemps, à 13-15 % d'eau (ch. 88 §5.G) ».
- Seigle de printemps : « demande une saison aussi longue que le blé et rend moins ».
- Le « tiers » sans fumure est rendu à sa terre (déjà cultivée) ; la pomme de terre souffre moins sur
  terre neuve ; la perte du grain et des racines, `[À VÉRIFIER : combien]`.
- Planche paresseuse : « on l'a faite à Terre-Neuve » ; la phrase du « mauvais nom » est coupée.
- Renvois : affût au ch. 47 (étapes 30 à 36) ; « aux bêtes, moulue avec sa balle (ch. 101) » coupé ;
  « cloche » remplacée par « le tunnel et la serre » ; le sel « qui manque en premier » devient le sel
  que la viande réclame aussi (ch. 09) ; la cendre devant l'orge est dite propre à ce chapitre ;
  « on ne dépasse pas 35 % » (ch. 21 §5.3).
- Crayon de plomb au lieu du feutre (étape 6, étape 44, bloc 3), comme au ch. 100 §5-I.
- Second tamis : tôle percée au clou d'un trou juste plus petit que le grain ; la moustiquaire
  n'enlève que la poussière (§4, étape 40, §9).
- Pesée : lot d'au moins 1 kg, masses divisées jusqu'à une quinzaine de grammes, sinon repère grossier.
- §4 : « 0,07 à 0,5 kg/m² ».
- Paraphrases ramenées à la force de la source : « un pôle de la pomme de terre de semence »,
  « d'habitude le pire », « la farine du commerce court très peu de risque », courge et haricot
  « à travers un plastique », haricot qui « rend bien les étés chauds » sous plastique.
- Betterave : étape 18 nuancée (semis tardif contre la montée en graine), renvoi au §7.
- Saumure limitée au seigle, à l'orge et au blé ; `[À VÉRIFIER]` pour le grain vêtu.
- Suivi : boisseau de pommes de terre levé par 1874 ; fiches USDA de l'orge et de l'avoine enregistrées.
- Favisme, fin du bloc 5 : « soins de soutien » remplacé par le repos, à boire, le compte des pipis
  (ch. 28, étapes 5 et 10), `[À VÉRIFIER]` sur l'effet de boire ; l'urine qui diminue puis s'arrête,
  signe visible du rein ; la question à poser devient l'origine de la famille et une crise passée ;
  « la plupart des crises légères ne donnent aucun signe ».
- Gourgane verte : « compte comme la sèche » (§9) ; `[À VÉRIFIER]` sur la fève verte ou crue (bloc 5).
- Épis germés (§7) : seulement sans grain blanc craie ou rosé, sans duvet, sans odeur de moisi.
- Ergot et grossesse : **trouvé** dans une source déjà enregistrée (CFS Hong Kong, p. 10, § 15) ; une
  phrase au bloc 1.
- Fléau : le mécanisme de la blessure (battoir libre qui revient, lanière usée qui lâche le battoir
  sur ceux qui regardent), sans source chiffrée, dans le texte même ; la note 8 est coupée.

**Règles de JP appliquées au chapitre entier**

- Relecture extérieure : aucune mention, ni dans le chapitre ni dans cette fiche.
- Municipalité, code légal : « la farine du commerce est contrôlée » (formule de règlement) devient un
  fait de risque ; rien d'autre trouvé.
- Signes nommés : note [^7] ajoutée pour la rouille (l'avoine « rouillée » du §7) ; la rosette du
  seigle est décrite en apposition ; l'arrêt de l'urine décrit comme signe du rein. Jaunisse devenue
  note [^8].
- Méthodes ancestrales : aucune technique autochtone dans ce chapitre.

### Écartés, et pourquoi

- **Étape 31 et §7, « lève jaune et ne rattrape jamais son retard ».** Le constat le disait introuvable.
  Il est dans le manuel de 1874, p. 181-182 : « the barley sprouted, and slowly showed through the top
  soil ; it was then stunted, weak and yellow, and barley, when once retarded in its early growth, will
  never recover lost ground. » Gardé, provenance ajoutée au §1.
- **Contradictions avec d'autres chapitres (constat « à trancher par JP »).** Rien à corriger dans le
  ch. 98. Le fumier cru devant les pommes de terre est déjà réglé dans le ch. 96 (§6, point 2) ; le
  seigle d'automne du ch. 99 et les « 90 à 100 jours » du ch. 79 et du ch. 00b restent ouverts (§6).
- **« Dire que les 40 °C sont une température d'air, écrite pour le blé. »** Pas dit dans le texte :
  ce serait de la provenance imprimée. Le chiffre est retiré du chapitre et la règle du ch. 100 le
  remplace ; la précision vit au §1.
- **Seuil de proportion pour la fusariose.** Pas de chiffre sourcé en main ; la conduite retenue est
  celle, sourcée, du ch. 88 (le lot ne se moud pas), et le seuil reste ouvert (§2, point D).
- **Maille chiffrée du second tamis (« 2 à 2,5 mm pour l'orge »).** Le chiffre du vérificateur n'a pas
  de source enregistrée : le texte donne la règle (un trou juste plus petit que le grain, essayé sur
  une poignée de bon grain) sans millimètres.

## Levée des [À VÉRIFIER] — 27 septembre 2026

Verdicts de `suivi/verifications/98-verifications.md`, appliqués au chapitre (7 drapeaux, 7 levés).

1. **Seigle d'automne, date de semis (étape 30).** LEVÉ. « Vers la mi-août, au plus tard au début de
   septembre : il doit avoir fait sa touffe avant les neiges. » Date du Saguenay–Lac-Saint-Jean, la
   région agricole la plus proche au nord ; aucune source ne donne de date propre à la Côte-Nord, la
   règle du tallage tranche sur place. Source : `sources/98-laterre-2021-cereales-automne-irda.md`
   (+ copie `.html`). La phrase facultative sur ce qui tue le seigle au Québec (pluie d'hiver puis gel
   rapide, grand froid sans neige, survie moyenne de la moitié) n'est pas ajoutée : laissée à
   l'éditeur.
2. **Délai du favisme, tableau des symptômes (§7).** LEVÉ. « Pendant trois jours : les signes viennent
   surtout le lendemain et le surlendemain. » Source : `sources/98-favisme-delai-cuisson-hydratation.md`
   §1 et §2 (revue des cas publiés, Pavie 2023 ; NORD), copies `98-europepmc-favisme-ages.xml`,
   `98-nord-deficit-g6pd-texte.txt`.
3. **Délai du favisme, DANGER bloc 5 (§8).** LEVÉ. Lendemain ou surlendemain, parfois dans les heures,
   jusqu'à cinq jours chez le nourrisson, après une semaine si on en mange tous les jours ; couleurs de
   l'urine ; fièvre et changement d'humeur chez l'enfant. Même source que le point 2.
4. **Ce que boire change (§8, bloc 5).** LEVÉ. Le pigment des globules éclatés bouche le rein ;
   l'hydratation est la seule protection établie (néphrologie 2024) ; la plupart des crises passent
   d'elles-mêmes (NORD). Aucune source ne chiffre l'effet de l'eau bue : pas de chiffre au texte.
   Source : `sources/98-favisme-delai-cuisson-hydratation.md` §1 à §3, copie
   `98-europepmc-cureus-2024-nephropathie-pigmentaire.xml`.
5. **Gourgane verte ou crue (§8, bloc 5 et §9).** CORRIGÉ. L'ancien texte disait « comme la sèche » :
   la fève crue déclenche plus souvent que la cuite, la verte porte moins de vicine et de convicine
   que la sèche, mais la cuite et la sèche déclenchent aussi (Pavie 2023). Deux phrases changées :
   §8 bloc 5 et §9 « Manger avant la récolte » (« la verte n'est pas sans danger, surtout crue »).
   Aucune autre phrase du chapitre ne s'appuyait sur l'ancienne formule. Source : même fiche, §1.
6. **Avoine vêtue dans la saumure (§9, tri de l'ergot).** LEVÉ, réponse non : avec sa balle, le grain
   d'avoine pèse de 0,96 à 1,03 g/cm³, il remonte dans une saumure avec l'ergot ; l'ergot touche
   rarement l'avoine. Texte : pas de saumure pour l'avoine vêtue, drap blanc à la place ; essai d'une
   poignée pour l'orge vêtue (aucune source sur l'orge vêtue). Sources :
   `sources/98-usda-ars-2008-densite-grain-avoine.md` (+ copie `.html`),
   `sources/98-saskatchewan-ergot-cereales.md`.
7. **Perte du grain et des racines sur terre neuve (§9).** LEVÉ pour le grain : orge sur sable boréal
   défriché de l'année, sans azote, environ le dixième du rendement avec azote (2 q/ha contre 25 la
   première année, 4 contre 31 la deuxième, Alaska intérieur). INTROUVABLE pour les racines : la
   phrase garde « les racines y perdent aussi », sans chiffre. Source :
   `sources/98-michaelson-1982-orge-terre-defrichee-alaska.md` (+ notice Crossref `.json`).

**Reste au chapitre : 0 `[À VÉRIFIER]`.** `sources/98-NON-OBTENUES.md` (points 6, 13, 14, 15, 16, 17)
reste à mettre à jour par le rédacteur.

Compression §3 et §4 — 27 septembre 2026 : 943 mots → 177 mots ; matériel coupé : faucille ou faux, fléau, toile de battage, sacs de toile ou de papier, deux tamis, vent ou ventilateur, sel pour trier l'ergot, contenants à grain, paragraphe d'introduction (renvois ch. 00b, ch. 95, ch. 5 §9) ; gourganes et pois fondus avec le grain en une ligne. §3 : coupés les chiffres de rendement, de kcal et de protéines (tableau 1), les 108 à 124 jours sans gel, les fractions de semence (§2 et étape 9) ; la vitamine C et « jamais le cèdre » passent au §8, bloc 6 (titre de l'encadré complété). Renvoi « (§3) » retiré au §2 (semer sans semence).
