> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 77. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 77, Fermentation

- **Fichier :** `chapitres/77-fermentation.md`
- **Tome :** 4 — Conserver et réparer
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (technique) et 4 (sécurité)
- **Ampleur :** **5 757 mots utiles** dans le corps (§1 à §9), plus 953 pour la §10 ; **7 343 mots
  bruts**, tableaux compris. Structure : les **dix points du gabarit, dans l'ordre et sous leurs
  titres**, sans section ajoutée — les renvois vivent ici et non dans le chapitre, comme aux ch. 24
  et 73. Procédure numérotée en 16 étapes plus trois sous-sections, huit tableaux, encadré DANGER à
  quatre points, variante d'urgence complète.
- **Note d'ampleur, à signaler à l'éditeur :** la consigne vise 2 500 à 5 000 mots utiles. Le corps
  dépasse la borne haute d'environ **15 %**, et le chapitre se situe **au même format que le ch. 73**
  (7 614 mots bruts), qui est son jumeau de structure et de risque. La raison est qu'il porte deux
  sujets qui ne se séparent pas : la procédure de lactofermentation, et la démonstration chiffrée
  qu'elle **ne s'applique pas à la chair**. Si l'éditeur veut couper, la coupe la moins coûteuse est
  la **§5-B** (tableau des autres légumes, ≈ 250 mots), dont tout le contenu est marqué
  `[À VÉRIFIER]` de toute façon. **Ne pas couper la §5-C** : c'est la seule partie du livre qui
  chiffre la production de vitamine C d'hiver, et c'est la raison d'être du chapitre au plan.

---

## 0. Ce qu'il faut savoir avant de lire le reste

**Une source neuve entre au dossier du projet.** Le *Safety of fermented foods* du **Groupe de
travail national sur les aliments fermentés**, publié par le BC Centre for Disease Control, est le
seul document canadien retrouvé qui chiffre la fermentation domestique. Ce n'est pas un document
provincial isolé : la liste de ses membres comprend **quatre personnes du MAPAQ**, Agriculture et
Agroalimentaire Canada, Santé publique Ontario et les ministères de la santé de sept autres
provinces, et le secrétariat FPT en a fourni une traduction française. Quatre sections ont été
captées (1, 3.1, 3.2, 3.5). **Ce dossier servira aussi aux ch. 73, 78 et 89** et vaut un signalement
à l'éditeur.

**Le FCÉN répond, contrairement à ce que déclare la fiche du ch. 24.** L'interface de recherche est
en défaut, mais **l'API publique fonctionne** et a servi ici à extraire quinze aliments. La méthode
est écrite dans `sources/77-sante-canada-fcen-vitamine-c-et-sodium-legumes.md`. **Elle débloque le
chiffre n° 2 du suivi du ch. 24**, qui est le plus gros bloc de `[À VÉRIFIER]` de ce chapitre-là,
et c'est du travail mécanique. À signaler à l'éditeur comme tâche de session dédiée.

**Le chapitre a trouvé une mauvaise nouvelle et l'a gardée.** L'idée de départ, inscrite au suivi —
« source de vitamine C l'hiver » — est vraie mais plafonnée, et le plafond n'est pas celui qu'on
attend : **c'est le sodium, pas la vitamine C**. Une famille ne peut pas manger assez de choucroute
pour couvrir ses besoins en vitamine C sans dépasser l'apport maximal tolérable en sodium. Le
chapitre le calcule, le dit, et renvoie le reste du besoin aux ch. 25, 57, 60 et 76. **Le ch. 25 ne
doit donc pas écrire que la fermentation règle la question**, et le ch. 74 doit savoir qu'un hiver
de choucroute pour quatre représente environ 90 kg de chou paré.

---

## 1. Les chiffres marqués `[À VÉRIFIER]`

| # | Valeur ou affirmation | Où | Pourquoi elle n'est pas fermement sourcée | Piste |
| --- | --- | --- | --- | --- |
| 1 | **« C'est la chaleur, pas la fermentation, qui coûte la vitamine C »** | §3, §5-C | **Déduction du rédacteur** entre deux sources qui ne se parlent pas : 30-70 mg/100 g pour une choucroute non chauffée (BCCDC §3.2) contre 14,7 mg/100 g pour une conserve (FCÉN 2201). Le FCÉN **n'a aucune entrée de choucroute crue** — vérifié sur ses deux seules entrées « Choucroute », toutes deux « conserve ». La déduction est plausible mais non citée | Littérature sur la rétention de l'acide ascorbique en lactofermentation. **Question n° 2 au relecteur.** C'est l'affirmation centrale du chapitre et la plus fragile |
| 2 | **Vitamine C d'une choucroute, 300 à 700 mg/kg** | §1, §3, §5-C | Chiffre publié par une source officielle, mais avec un **appel de note dont la référence primaire n'a pas été remontée**. Plage large d'un facteur 2,3, qui commande tout le tableau de rations | Remonter la note 1 de la section 3.2 du guide. Chercher une valeur au FCÉN pour une choucroute non pasteurisée — **elle n'existe pas aujourd'hui** |
| 3 | **Vitamine C du chou cru, 36,6 mg/100 g** | §3 | FCÉN, mais sur **4 observations seulement**. Ni la variété ni la saison de récolte ne sont précisées, et un chou de garde d'automne n'est pas un chou d'été | Voir si le FCÉN distingue des cultivars. Sinon, accepter comme ordre de grandeur et le dire |
| 4 | **890 mg de sodium par 100 g de choucroute maison** | §5-C | **Arithmétique du rédacteur** : 2,25 % ÷ 2,53. Bornes sourcées, mais suppose que **tout le sel reste dans ce qui est mangé, saumure comprise**. Un égouttage change le résultat et aucune source ne dit de combien | Mesure de terrain possible : peser le sel entré, peser la saumure jetée. **Tâche pour JP** |
| 5 | **Tout le tableau de rations de la §5-C** — 150-200 g, 75-100 g, 45 à 140 mg, 1 330 à 1 780 mg, 58 % à 77 % | §5-C | Arithmétique du rédacteur sur des bornes sourcées (ANR vitamine C, AMT sodium, plage 30-70 mg/100 g), mais **les rations elles-mêmes sont choisies par le rédacteur** pour tenir sous l'AMT en sodium. Ce n'est pas une recommandation publiée | **Question n° 1 à la nutritionniste**, celle qui relit déjà les ch. 24, 25 et 26 |
| 6 | **500 g/jour pour la famille · 90 kg et 2 kg de sel pour l'hiver** | §5-C | Arithmétique sur une **hypothèse de six mois sans légume frais**, déclarée comme telle dans le texte. L'hypothèse n'est pas sourcée | Fixer la durée réelle de la saison sans légume frais avec le ch. 74 et le ch. 76, puis refaire le calcul une fois |
| 7 | **Rendement chou entier → chou paré** | §5-C | **Aucune source consultée ne le donne.** Aucun chiffre n'est avancé, volontairement | Mesure de terrain : peser le chou entier, peser après parage. **Tâche pour JP, à la récolte** |
| 8 | **Saumure à 5 % pour navet, rutabaga, betterave, radis** | §5-B | Betterave et radis sont nommés parmi les légumes couramment fermentés, **sans pourcentage propre** ; navet et rutabaga ne sont pas nommés du tout. Le 5 % vient de la saumure d'appoint du chou et de la plage générale 2-10 % | Chercher des recettes validées au NCHFP pour ces légumes précis. **Si rien n'est trouvé, envisager de retirer la §5-B** plutôt que de publier quatre `[À VÉRIFIER]` |
| 9 | **Saumure à 5 % pour la carotte** | §5-B | Chiffre publié tel quel, **mais couplé dans la source à un lessivage à la soude à 1-2 %** que le livre écarte comme procédé industriel. Découplé du lessivage, ce n'est plus exactement le chiffre publié | Même piste que le n° 8 |
| 10 | **La fermentation ne détruit pas *Trichinella*** | §8, point 3 | **Extension de la règle du tableau de `CLAUDE.md`** à un quatrième procédé — sel, fumage, gel, et maintenant fermentation. Le raisonnement tient (la fermentation acidifie, elle ne chauffe pas ; la règle établit déjà que trois barrières non thermiques échouent) mais **aucune source consultée ne nomme explicitement la fermentation** | **Question n° 3 au vérificateur sécurité.** ACIA, section trichinellose. Si la réponse est non, l'affirmation sort du chapitre |
| 11 | **Résolution des bandelettes de pH** | §4, §9 | Le guide exige de suivre le pH **sans préciser l'instrument**. Le chapitre contourne en visant 4,2 plutôt que 4,6, pour ne pas dépendre d'une lecture fine, mais la précision réelle des bandelettes n'est pas établie | Fiche technique d'un fabricant. Comparer bandelettes à plage étroite et pH-mètre étalonné |
| 12 | **Congélation d'un ferment fini** | §5-A, étape 15 | **Aucune source consultée** ne dit ce qu'un gel-dégel fait à une choucroute, ni côté texture ni côté sécurité. Le chapitre ne traite pas la question et le déclare | **Question n° 6 au relecteur.** Question réelle : un caveau de la Côte-Nord descend sous zéro. Croiser avec le ch. 76 et le ch. 68 |
| 13 | **Incidence du botulisme au Québec, 4 cas/an** | §8, point 3 | Chiffre officiel du MSSS, mais **d'un bulletin de 2006 portant sur 2001-2005**. Non mis à jour | INSPQ, rapports de MADO, portrait des maladies entériques. **Série plus récente à trouver avant impression** |
| 14 | **Base du « 2,5 % de sel » de l'ACIA** | §2 | Viande crue, produit fini ou phase aqueuse ? Le texte capté ne le dit pas. Réserve héritée des ch. 61, 63 et 71 | Réserve commune à quatre chapitres : la régler une fois, pour tous |

**Chiffres sourcés et fermes du chapitre** (ne pas les rouvrir sans source contraire) :
**pH 4,6** · **4,4** · **4,2** · **3,2-3,4** · **5,9-6,5** au départ · sel **2,25 %**, plage
**0,7-3 %**, à éviter au-dessus de **3,5 %** · saumure **5 %** · sucre initial du chou **4-5 %** ·
**3 cm** de saumure · **10-25 °C** et **20-22 °C** · **3 à 4 semaines** · **48 h** pour les bulles ·
**7 jours** pour la descente sous 4,6 · **2 semaines** d'attente · **≤ 4 °C** à l'entreposage ·
tranche de **3-5 mm** · **10⁸ UFC/mL en 12-14 h** · **pH 6-6,5** d'un poisson fermenté, **10 % de
sel**, **aw < 0,97**, **3,3 °C** · **3 °C** (type E) · **6,3 %**, **2 sur 32**, **10 °C** moyen et
**2-23 °C** · **28 malades et 15 hospitalisations** (olives, Italie, 2004) · **12-48 h**
d'incubation · **74 °C** à cœur · **15,6 °C** et **100 ppm** et **2,5 %** (ACIA) · aw **0,85** et
**0,90** · ANR vitamine C **15 / 25 / 75 / 90 mg** · AMT sodium **1 500 / 1 900 / 2 300 mg** ·
facteur **2,53** · FCÉN **36,6 / 14,7 / 661**.

**Arithmétique du rédacteur, vérifiée deux fois, à revérifier par la porte 3 :** 22,5 g de sel par
kg · 8,9 g de sodium par kg · (36,6 − 14,7) / 36,6 = 59,8 % → « 60 % » · 300-700 mg/kg =
30-70 mg/100 g · 90 kg × 2,25 % = 2,03 kg de sel · conversions °F → °C de la fiche NCHFP.

---

## 2. Images requises

| # | Format | Sujet | Cadrage demandé | Source |
| --- | --- | --- | --- | --- |
| 77-01 | **Demi-page** | **L'image clé du chapitre.** Trois pots côte à côte, photographiés le même jour : jour 0 (chou tassé, peu de liquide), jour 7 (saumure trouble, bulles visibles, chou bien sous liquide), jour 28 (saumure éclaircie, couleur passée au jaune paille) | Frontal à hauteur des pots, fond neutre mat, éclairage latéral pour faire lire le niveau de liquide **et les bulles**. Même pot, même quantité, même distance pour les trois. Étiquette de date lisible sur chaque pot. **Les trois prises doivent être faites avec le même éclairage, sinon la couleur ne se compare pas** | Photo de JP. Demande une fournée dédiée sur quatre semaines : **à lancer dès la première récolte de chou** |
| 77-02 | **Quart de page** | La balance affichant le poids du chou paré, et à côté le sel pesé pour ce poids | Plongée verticale, afficheur lisible à l'impression, les deux masses dans le même cadre. C'est l'image qui dit « ce pourcentage se pèse » | Photo de JP |
| 77-03 | **Quart de page** | Une bandelette de pH sortie de la saumure, posée à côté de son nuancier, à une valeur nettement sous 4,2 | Macro, bandelette et nuancier nets tous les deux, lumière du jour neutre — **pas de lumière chaude**, elle fausse la lecture des couleurs à l'impression comme dans la vie | Photo de JP |
| 77-04 | **Quart de page** | Le lestage : le chou sous au moins 3 cm de saumure, avec le poids en place et une règle dans le cadre | De côté, à travers le verre, pour que la hauteur de liquide se voie. Règle graduée en cm appuyée sur le pot | Photo de JP |
| 77-05 | **Demi-page** | **Planche dessinée : les deux fermentations.** À gauche une colonne « légume » avec la courbe de pH descendant de 6,2 à 3,4 en quatre semaines ; à droite une colonne « chair » avec une ligne plate à 6-6,5. Ligne rouge horizontale à 4,6 traversant les deux | Planche à dessiner, pas une photo. Les deux échelles de pH identiques et alignées. La ligne 4,6 traverse toute la planche. Légende : sources sous la planche | À dessiner. **C'est l'image qui porte l'encadré DANGER** — si une seule image du chapitre est produite, c'est celle-là |
| 77-06 | **Quart de page** | Un échec : voile de levures ou moisissure de surface sur un pot mal lesté, avec le chou sorti de la saumure | Plongée verticale dans le pot, lumière rasante pour faire lire le relief du voile. **À photographier quand ça arrive**, pas à provoquer | Photo de JP, opportuniste |

**Note pour `images/credits.md` :** aucune image de ce chapitre n'est versée. Cinq photos maison et
une planche à dessiner. **La 77-01 dépend d'une fournée de quatre semaines suivie du jour 0 au jour
28** : manquée, elle attend la récolte suivante. La commander en même temps que les photos du
ch. 74 et du ch. 76, qui portent sur la même récolte.

---

## 3. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 8 | Stock permanent : le sel, les bandelettes de pH, la balance. **Vérifier que le ch. 8 prévoit les bandelettes** — elles coûtent peu et ce chapitre-ci les déclare non négociables |
| 15 | Poêles à bois : c'est lui qui définit où se trouve la zone à 18-22 °C du chalet, dont dépend toute la §5-D |
| 19, 27 | Communiquer, soigner : conduite en cas de suspicion de botulisme |
| 24 | Mal de caribou : la choucroute apporte des glucides et de la vitamine C, **pas des calories**. Elle ne règle rien de ce chapitre-là et le ch. 77 le dit |
| 25 | **Scorbut. Chapitre jumeau.** Le 25 pose le besoin, le 77 fournit une partie de l'apport. **Les deux doivent être relus ensemble.** La règle du thuya y est répétée intégralement |
| 26 | Ce qu'un corps demande l'hiver : partage la nutritionniste et les sources ANREF |
| 48, 52 | Ours noir et phoque : trichinellose, cuisson à 74 °C, et la porte fermée de la viande fermentée |
| 57, 60 | Petits fruits, sève et écorces : les autres sources de vitamine C d'hiver, sans lesquelles le compte n'y est pas |
| 62 | Le sel : **2 kg pour l'hiver de choucroute d'une famille de quatre**, à ajouter au poste sel. Et le budget sodium partagé avec la salaison |
| 63, 64 | Salaison et saumure : **concurrence directe sur le budget sodium quotidien**. Le ch. 77 le signale, les ch. 63 et 64 devraient le savoir |
| 65, 66 | Fumage : les autres barrières, et pourquoi elles ne sont pas celle-ci |
| 68 | Froid naturel : entreposage du produit fini à ≤ 4 °C |
| 69 | Congélateur qui lâche : **la fermentation est une sortie et le ch. 69 devrait la nommer**. Recoupement à créer |
| 70, 71, 72 | Le poisson se traite à la sortie de l'eau, se sale, se fume. **Il ne se fermente pas** — s'assurer qu'aucun de ces trois chapitres ne laisse entendre le contraire |
| 73 | **Conserves et marinades. Chapitre jumeau.** L'acide versé contre l'acide fabriqué. Les deux partagent la ligne du pH 4,6 et **doivent la dire pareil** |
| 74 | Jardin nordique : c'est lui qui doit fournir les **90 kg de chou paré**, et il faut le lui dire avant les semences |
| 75 | Semences : choisir des choux de garde |
| 76 | Caveau : la fermentation prend le relais quand le caveau lâche. **Question ouverte partagée : que devient un pot qui gèle au caveau ?** |
| 85 | Stock de pièces et consommables : bandelettes de pH en double |

**Vérification faite le 2026-09-20 :** les 27 numéros cités dans le chapitre existent tous, soit
comme fichier dans `/chapitres`, soit dans le plan des 89. **Aucun renvoi vers un chapitre
inventé.**

---

## 4. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau de `CLAUDE.md` | Reprise ici ? | Où, et avec quel mécanisme |
| --- | --- | --- |
| **Botulisme de type E : produit sa toxine dès 3 °C, donc au frigo** | **Oui, et c'est le cœur de l'encadré.** Avec le mécanisme complet et trois sources indépendantes qui donnent le même seuil (Santé Canada, guide FFWG, *IJCH*). Le chapitre va plus loin que la règle : il met le 3 °C **en regard des 10 °C moyens d'un vieillissement de chair marine**, ce qui transforme un seuil abstrait en écart mesuré | §8, point 3 |
| **Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence** | **Oui**, cité mot à mot du MAPAQ, avec le mécanisme : *C. botulinum* n'est pas une bactérie de pourriture, elle ne dégrade pas les protéines en composés odorants, elle fabrique une neurotoxine. D'où la règle opératoire : **on ne goûte jamais pour décider** | §7 (dernière ligne), §8 point 2 |
| **Thuyone du cèdre toxique — sapin baumier ou épinette pour la vitamine C** | **Oui**, en encadré, avec le mécanisme convulsivant, les trois noms latins, et l'explication de pourquoi la règle est une interdiction et non un dosage (doses animales en mg/kg, non convertibles). **Aucun chiffre de thuyone n'est avancé**, conformément à la réserve du ch. 25 | §5-C |
| **Trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent** | **Oui, et étendue** à la fermentation, avec le mécanisme (larves enkystées dans le muscle, seule la chaleur est une barrière ; la fermentation acidifie sans chauffer). **L'extension est marquée `[À VÉRIFIER]`** — voir chiffre n° 10 | §8, point 3 |
| **Cuisson du gibier sauvage à 74 °C à cœur** | **Oui**, avec la méthode de mesure (thermomètre, partie charnue, sans toucher l'os), parce que le chapitre ferme la porte de la viande fermentée et doit dire où mène la porte ouverte | §8, point 3 |
| Jamais le foie ni les reins de cervidés — cadmium | **Non repris** | Voir ci-dessous |
| Tularémie : gants obligatoires | **Non repris** | Voir ci-dessous |
| Viande maigre seule = mal de caribou | **Non repris** comme règle de sécurité ; **renvoi explicite au ch. 24** | Le chapitre dit que la choucroute n'apporte pas de calories et ne règle donc rien du ch. 24 |
| Génératrice : jamais dans un bâtiment | **Non repris** | Voir ci-dessous |

**Règles écartées, et pourquoi.** Le foie et les reins de cervidés, la tularémie du lièvre et la
génératrice n'ont **aucun point de contact** avec un chapitre qui ne traite que de légumes et qui
ferme la porte de toute fermentation de chair. Les reprendre diluerait l'encadré, ce que
`CLAUDE.md` interdit explicitement.

**Avertissement ajouté qui n'est pas au tableau de `CLAUDE.md`, à arbitrer par le rôle 4.**
**L'ail et les herbes dans l'huile** (§8, point 4). Il est retenu parce qu'il est nommé dans la même
phrase du MSSS que les conserves ratées, parce que le guide canadien met en garde contre l'huile
dans une recette de ferment, et surtout parce que **c'est la seule préparation qu'un lecteur de ce
chapitre pourrait confondre avec un ferment**. Si le rôle 4 juge l'encadré trop chargé à quatre
points, **c'est celui-ci qui sort**, pas les trois autres.

**Écart volontaire à signaler au vérificateur sécurité.** L'encadré compte **quatre** points, ce qui
est beaucoup pour un aliment dont la source officielle dit qu'il n'a causé **aucune éclosion au
Canada**. Le chapitre l'assume et le dit en ouverture de l'encadré : les quatre points ne visent pas
la choucroute réussie, ils visent les quatre façons de sortir du procédé. **Le point 3 à lui seul
justifierait l'encadré** — c'est le seul endroit du tome 4 où un lecteur de la Côte-Nord, qui a du
phoque et de la truite à portée, pourrait appliquer un geste qu'il vient d'apprendre à un aliment
qui le tuerait.

---

## 5. Relecteur humain requis

**Oui, et le chapitre demande à être ajouté à la liste obligatoire de `CLAUDE.md`, où il ne figure
pas aujourd'hui.** C'est une recommandation de rédaction à trancher par l'éditeur, pas une décision
prise unilatéralement : elle est écrite en tête du fichier chapitre et argumentée en §10.

L'argument tient en trois lignes. Le ch. 73, qui **est** sur la liste, fabrique les conditions du
botulisme et les détruit par la chaleur. Le ch. 77 fabrique les **mêmes** conditions — aliment peu
acide au départ, prêt à manger, non chauffé, en milieu sans oxygène, à la température de la pièce —
et les contient par l'acide. **La différence est que l'acide, lui, peut ne pas venir**, et que c'est
le lecteur qui doit le vérifier avec un instrument. Un chapitre dont la seule barrière est une
mesure faite par le lecteur appartient à la liste.

**Relecteur principal : technologue en sciences et technologie des aliments, ou inspecteur en
salubrité alimentaire du MAPAQ** — même profil que le ch. 73, et **si possible la même personne**,
parce que les deux chapitres se partagent la ligne du pH 4,6 et doivent la dire pareil. Une piste
existe déjà au dossier du ch. 73 : MAPAQ, Direction générale de la santé animale et de l'inspection
des aliments, 1 800 463-5023.

**Second avis : la diététiste-nutritionniste qui relit déjà les ch. 24, 25 et 26**, pour la seule
§5-C. **Envoyer le 77 avec le 25, dans le même envoi.** Les deux chapitres répondent à la même
question d'hiver et leurs réponses doivent s'additionner sans se contredire.

**Les six questions, dans l'ordre. Les trois premières bloquent l'impression.**

1. **Le tableau de rations de la §5-C tient-il ?** Il place un adulte à 58-77 % de son apport
   maximal tolérable en sodium **pour un seul aliment**, alors que le même hiver apporte de la
   viande salée (ch. 63, 64). Faut-il abaisser les rations, et alors la vitamine C ne suit plus ?
2. **La déduction « c'est la chaleur, pas la fermentation, qui coûte la vitamine C » est-elle
   soutenable telle qu'écrite ?** Elle est marquée `[À VÉRIFIER]`, mais elle structure le chapitre.
3. **La fermentation appartient-elle à la liste « ni le sel, ni le fumage, ni le gel » pour
   *Trichinella* ?** Si la réponse est non, l'affirmation sort.
4. La fenêtre de **18-22 °C** est-elle le bon arbitrage entre le plancher canadien de 10 °C et le
   plancher américain de 15,5 °C, pour un chalet non chauffé la nuit ?
5. Le chapitre **refuse tout protocole de rattrapage** d'un ferment raté et envoie tout à la
   poubelle, comme le ch. 73. Est-ce la bonne position ?
6. **Que devient une choucroute qui gèle au caveau ?** Aucune source. Question réelle sur la
   Côte-Nord.

---

## 6. Notes pour l'éditeur

1. **Une source neuve de portée générale entre au dossier.** Le *Safety of fermented foods* du
   Groupe de travail national sur les aliments fermentés (BCCDC, avec le MAPAQ). Quatre sections
   captées pour le ch. 77 ; le document en compte **quatorze**. Les sections **3.13 Fermented
   sausage** et **3.6 Yogurt / 3.12 Kefir** intéressent directement les ch. 78 et 89, et la
   section 2 (cultures de départ et normes) intéresse le ch. 73.
2. **Il existe une traduction française officielle de ce guide**, mentionnée dans ses
   remerciements ; les PDF captés sont en anglais. **La retrouver remplacerait toutes les citations
   anglaises du ch. 77 par des citations françaises.** C'est la meilleure amélioration possible du
   dossier et c'est mécanique. Le portail francophone du CCNSE a répondu **403** sur les pages de
   blogue, alors que les PDF anglais répondent 200 : essayer depuis un autre poste.
3. **Le FCÉN répond par son API publique.** La fiche du ch. 24 le déclarait inaccessible.
   La méthode est documentée. **Une session dédiée réglerait d'un coup les chiffres n° 2 et n° 4 du
   suivi du ch. 24**, qui est son plus gros bloc de `[À VÉRIFIER]`.
4. **Recoupement à créer avec le ch. 69.** La fermentation est une sortie quand le congélateur
   lâche, et le ch. 69 ne la nomme probablement pas. Passe à faire.
5. **Recoupement à surveiller avec le ch. 74.** Le 77 dit **combien** de chou il faut (≈ 90 kg parés
   pour l'hiver d'une famille de quatre) ; le 74 doit dire si le jardin peut le produire. **Si la
   réponse est non, c'est le ch. 25 qui doit le savoir**, parce que c'est lui qui porte le budget
   vitamine C de l'hiver.
6. **Recoupement à surveiller avec les ch. 62, 63 et 64.** Le budget sodium quotidien est partagé
   entre la choucroute et la viande salée. Aujourd'hui, chaque chapitre le dépense comme s'il était
   seul. **C'est un arbitrage d'éditeur, pas de rédacteur.**
7. **Une piste volontairement non suivie.** Des comptes rendus de deuxième main attribuent à la
   Régie régionale de la santé et des services sociaux du Nunavik une recommandation de commencer le
   vieillissement de la viande de mammifère marin à l'automne. **La page primaire n'a pas pu être
   consultée et la recommandation est donc absente du chapitre**, ce qui est cohérent avec la
   position du chapitre : il ferme la porte, il ne la referme pas à moitié avec des précautions qui
   donneraient l'illusion d'un procédé maîtrisé. Portail à reprendre :
   https://nrbhss.ca/fr/publications-de-la-dsp-nunavik
8. **Vague de travail.** La photo 77-01 demande une fournée suivie sur **quatre semaines**, du jour 0
   au jour 28. Elle dépend de la récolte de chou, donc de la même fenêtre que les photos des ch. 74
   et 76 : **les commander ensemble maintenant**, même si les chapitres ne sont relus qu'après.

## Notes retirées du chapitre — 23 septembre 2026

1. Encadré d'ouverture, retiré tel quel :

> ⚠ **RELECTURE HUMAINE EXTERNE RECOMMANDÉE — TECHNOLOGUE EN SCIENCES ET TECHNOLOGIE DES ALIMENTS
> OU INSPECTEUR EN SALUBRITÉ ALIMENTAIRE DU MAPAQ**, plus un second avis d'une diététiste-
> nutritionniste pour la seule arithmétique de la section 5-C. Ce chapitre **ne figure pas** dans
> la liste de relecture obligatoire de `CLAUDE.md`, et les trois points qui suivent disent pourquoi
> il devrait y être ajouté. À trancher en priorité : (1) le chapitre déduit de deux sources
> indépendantes que **c'est la chaleur, et non la fermentation, qui détruit la vitamine C d'une
> choucroute** — aucune des deux ne le dit en toutes lettres ; (2) il étend la règle
> «ni le sel, ni le fumage, ni le gel ne détruisent *Trichinella* » à un quatrième procédé, la
> fermentation, qu'aucune source consultée ne nomme ; (3) il fixe la fenêtre de fermentation à
> 18-22 °C alors que la source canadienne descend à 10 °C et la source américaine remonte à
> 15,5 °C, et cet écart de cinq degrés tombe exactement sur la température d'un chalet d'automne.

2. §9, première phrase, fin retirée : « et le ch. 69 devrait la nommer le jour où le congélateur
   lâche. » (renvoi à ajouter au ch. 69, pas une phrase pour le lecteur)
3. §5-A, sous le tableau du sel : « *(Arithmétique du livre sur la base sourcée de 2,25 %, arrondie
   au gramme.)* »
4. §5-C, après le calcul du sodium : « *(arithmétique du livre)* »
5. §5-C, en tête du tableau des rations : « *(Arithmétique du livre sur des bornes sourcées.)* »

Provenance des attributions retirées du texte à la même date (pour qui vérifie) : BCCDC / Groupe
de travail national sur les aliments fermentés (pH, sucres, sel 2,25 %, 3 cm de saumure, 30 à
70 mg/100 g, fesikh section 3.5, seuil d'empotage 4,2, critère de rejet à 7 jours, huile et ail) ;
NCHFP (plancher 15,5 °C, plafond 24 °C, texture molle) ; MAPAQ (botulisme sans signe de
détérioration) ; MSSS (cas au Québec, type E, ail dans l'huile, ébullition 10 min des conserves,
incubation 12 à 48 h) ; Leclair et coll., *IJCH*, 2017 (10 °C, pointes à 23 °C, 2 échantillons
sur 32). Au §5-D, « Repère large » = guide canadien (BCCDC), « Repère strict » = NCHFP.

## Passe « pas de code légal, signes en bas de page » — 23 septembre 2026

Rien retiré, rien ajouté. Aucune phrase de règlement, de loi, de norme ou de municipalité dans le
chapitre. Signes relus : le voile (décrit au §7, « blanc, mat, plat en surface », une ligne après
sa première mention au §6), la choucroute rose et gluante (§3), la moisissure duveteuse et
colorée, les premiers signes du botulisme (§8) sont tous décrits dans le texte. Les sept lignes du
fichier de doutes ne touchent ni du légal, ni du municipal, ni un signe non expliqué : laissées
telles quelles.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/77-verifications.md` (9 drapeaux : 5 levés, 4 introuvables).
Il ne reste aucun `[À VÉRIFIER]` au chapitre.

- §5-C point 3, rendement du chou : **20 %** de portion non comestible (feuilles extérieures,
  cœur, parures), donc 90 kg de chou paré ≈ **115 kg de chou entier** (112,5 arrondi vers le
  haut pour planifier). Source : `sources/77-sante-canada-fcen-chou-portion-non-comestible.md`.
- §9, pH du vinaigre : **2,4 à 3,4** ; choucroute finie **3,3 à 3,6**. Source :
  `sources/77-fda-ph-approximatif-des-aliments.md`.
- §9, teintes de l'indicateur de chou rouge : **violet vers pH 4, rose vers 2, rouge vers 1**.
  Sources : `sources/74-rhs-chou-rouge-nuancier-ph.md`, `sources/74-gatech-chou-rouge-indicateur-ph.html`.
  Conséquence dans le paragraphe suivant (« Ce qu'il ne fait pas ») : l'écart 4,2-4,6 est une
  nuance de **violet**, pas de rose (note A du fichier de vérifications) — corrigé.
- §8 Danger, *Trichinella* : seuls cuisson, gel (porc domestique) et irradiation sont reconnus ;
  salaison, séchage, fumage non fiables ; aucun lien entre pH et mort du parasite. « Séchage »
  ajouté à la liste. Source : `sources/77-ict-2019-trichinella-apres-abattage.md`.
- §3, vitamine C : choucroute sortie de fermentation **28,8** contre **20,6 mg/100 g** pour le
  même chou cru ; après **6 mois à 5 °C**, **17,6 et 18,2 mg/100 g** ; la pasteurisation dégrade
  les vitamines. Source : `sources/77-tutulescu-2026-choucroute-vitamine-c.md`. Note B du
  fichier de vérifications non traitée ici : le tableau des rations de §5-C calcule avec
  30 à 70 mg/100 g sans tenir compte de la baisse sur six mois.
- §5-B tableau, navet et rutabaga, betterave et radis, carotte : aucune saumure publiée (la
  carotte l'est à **5 %** après lavage à la soude de **1 à 2 %**) ; 5 % présenté comme un choix
  dans la plage générale **2 à 10 %**, la fournée se jugeant au pH. Source :
  `sources/77-bccdc-ffwg-legumes-fermentes.md`.
- §9, repiquage de la saumure vivante : aucun nombre publié ; remplacé par les critères du guide
  (fournée donneuse en pleine activité, départ en **24 heures**, arrêt de la chaîne sinon). Le
  « garder un fond de pot » du paragraphe précédent contredisait ce critère (note C) : remplacé
  par « lancer la fournée suivante pendant que la précédente travaille encore ». Sources :
  `sources/77-bccdc-ffwg-section-2-cultures-et-repiquage.md`, `sources/77-bccdc-ffwg-legumes-fermentes.md`.

- Compression §3 et §4 — 27 septembre 2026 : 596 + 598 = 1194 mots → 109 + 101 = 210 mots (décompte wc) ; matériel coupé : pH-mètre en option, substituts de la balance (pot étalonné), sel du fleuve et sels iodés « mask spoilage » (sel du fleuve reste en §9), bague Mason/linge/bonde et couvercle entier (« couvrir sans sceller » reste en §5-A et §7), couteau/mandoline et banc à chou (fragments de lame restent en §9), thermomètre d'ambiance (§5-D et §9), bol de malaxage, feutre ; §3 coupé : Leuconostoc 10⁸ en 12-14 h, bords 0,8 %/3,5 % (restent en §6-§7), E. coli/Salmonella (§5-A ét. 16), chiffres vitamine C 36,6/14,7 mg, chiffres de la chair (§2, §8) ; déplacé : Listeria sous pH 4,4 → §5-A étape 12.
