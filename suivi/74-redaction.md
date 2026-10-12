> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 69. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 69 : Un congélateur plein qui dégèle

- **Tome :** 4 — Conserver et réparer
- **Fichier :** `chapitres/69-un-congelateur-plein-qui.md`
- **Rôle :** 2 — Rédacteur
- **Date :** 2026-09-20
- **Longueur :** environ 4 600 mots utiles (6 853 mots bruts, syntaxe de tableau incluse)
- **État :** premier jet complet, prêt pour les rôles 3 (vérification technique) et
  4 (vérification sécurité)
- **Relecture humaine externe :** **non obligatoire** selon `CLAUDE.md`, mais **recommandée** —
  voir section 6

---

## 1. Chiffres marqués [À VÉRIFIER]

| # | Valeur | Où | Pourquoi ce n'est pas réglé |
| --- | --- | --- | --- |
| 1 | **Rendement en viande d'un orignal désossé** | §2, §10 | **Aucun chiffre n'a été écrit.** Le texte dit « un orignal désossé remplit à lui seul un coffre de chalet » — c'est une comparaison, pas une masse. Si le vérificateur trouve une source du MFFP, §2 gagne un ordre de grandeur utile pour dimensionner l'effort de sauvetage. Sinon, laisser qualitatif |
| 2 | **Perte de capacité d'une batterie au plomb par grand froid** | §2 | Citée comme cause de panne, **sans pourcentage**. Le chiffre existe chez les fabricants et dépend de la chimie et de la température. À chiffrer au chapitre 85, pas ici : ce chapitre n'a pas besoin du nombre pour fonctionner |
| 3 | **« La toxine botulinique ne change ni l'odeur, ni le goût, ni l'apparence »** | §8 point 3 | **C'est une règle du tableau de `CLAUDE.md` et elle n'a toujours pas d'énoncé officiel général.** Le chapitre s'appuie sur l'équivalent pratique de la page québécoise (« aucun signe de détérioration ») et sur la page de Santé Canada (perte du signal de pourriture sous emballage étanche). Trou identique aux chapitres 1, 12, 42 et 65. **Priorité 1 du vérificateur sécurité :** si l'énoncé général se trouve, il entre dans tous ces chapitres d'un coup |
| 4 | **Durées de conservation au congélateur par type d'aliment** | absent du chapitre | **Aucune durée n'a été écrite.** Le *Thermoguide+* du MAPAQ n'a pas pu être consulté : l'adresse `.../conservation-aliments/thermoguide` a répondu 404. Le chapitre renvoie aux ch. 61 et 68 plutôt que d'inventer des mois. Si le vérificateur ouvre le Thermoguide, c'est un tableau à ajouter au §6, pas une correction |
| 5 | **Conciliation des deux consignes ministérielles sur la recongélation** | §5 phase F étape 24, §10 | La page d'entreposage dit « évitez de recongeler un aliment qui a été décongelé sans l'avoir cuit avant » ; la page de panne autorise la recongélation « si le centre de l'aliment est encore dur ». Le chapitre les concilie en disant qu'un aliment au cœur encore dur **n'est pas un aliment décongelé**. La lecture est cohérente avec les deux pages, **elle est de la rédaction, pas du ministère**. Signalée comme telle dans le texte et ici |
| 6 | **Le tableau des quatre cas (§5 phase B)** | §5 phase B | Ce n'est pas un chiffre mais une **construction du livre**. Les trois seuils (-18 °C, 0-4 °C, 4 °C) sont tous sourcés individuellement ; leur assemblage en grille de décision météo n'est publié nulle part. **À faire valider comme raisonnement, pas comme citation** |
| 7 | **L'ordre de tri par risque (§5 phase D étape 13)** | §5 phase D | Poisson → haché → abats → pièces entières → gras → végétaux. Le raisonnement (surface contaminée par kilo, vitesse de dégradation) est solide et chaque maillon est sourcé ailleurs dans le livre, mais **l'ordre lui-même n'est pas repris d'une source**. À valider |

**Tous les autres chiffres du chapitre portent leur organisme entre parenthèses et leur extrait
intégral dans `/sources` :** 48 h, 24 h, 4 à 6 h, 0 °C, 4 °C, 60 °C, -18 °C, 3 °C, 7 °C,
70 °C, 71 °C, 74 °C, 82 °C, -20 °C pendant 7 jours, -35 °C pendant 15 heures, 6 m (20 pi),
1 avertisseur de CO, 2 à 3 semaines (mal de caribou, repris du ch. 24).

## 2. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau | Reprise ici |
| --- | --- |
| **Cuisson du gibier sauvage à 74 °C à cœur (MAPAQ)** | §5 étape 25, §6 (deux lignes), §8 point 5, §9. Avec **l'angle propre au chapitre 69** : la cuisson de sauvetage porte surtout sur du **gibier haché**, et la valeur du gibier haché est 74 °C, pas 71 °C. Le 71 °C est cité explicitement comme la ligne du bœuf et du porc, pour désamorcer la confusion au lieu de l'ignorer. C'est l'erreur du premier jet du chapitre 63, et elle est plus facile à commettre ici qu'ailleurs parce qu'on lit « haché » avant « gibier » |
| **Jamais le foie ni les reins de cervidés — cadmium (MAPAQ)** | §5 étape 26, §8 point 6. Avec le mécanisme : accumulation dans le rein humain, non éliminable, insensible à la cuisson, au trempage et au dessalage. Angle du chapitre : une panne met les abats sur le comptoir et les fait paraître récupérables |
| **Trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent** | §5 étape 25, §8 point 5. Angle neuf et important : un lecteur qui sort un ours de **six mois** de congélateur croit spontanément que le temps au froid a réglé le problème. Le chapitre dit le contraire en toutes lettres, et bloque les trois routes de sauvetage sans cuisson (salaison, fumage, séchage) pour l'ours et le phoque |
| **Tularémie : gants obligatoires à la manipulation** | §4 (gants, non négociable), §5 étape 27. Angle du chapitre : le dégel de panne est le moment où l'on dépouille vingt lièvres à la chaîne, vite, les mains gercées — c'est-à-dire le moment de risque maximal de la règle |
| **Botulisme de type E : produit sa toxine dès 3 °C, donc au frigo** | §5 étape 13, §6 (ligne poisson), §7, §8 point 2. Avec l'angle du chapitre : **un congélateur en panne se stabilise entre 3 et 8 °C**, c'est-à-dire exactement dans la fenêtre du type E, et il le fait pendant deux jours en donnant l'impression d'être encore froid |
| **Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence** | §7 (ligne « rien d'anormal », qui est une ligne de tableau volontairement construite à l'envers), §8 point 3. Avec l'interdiction explicite de goûter pour décider |
| **Viande maigre seule = mal de caribou, mortel en 2 à 3 semaines** | §5 étape 29, §8 point 8. **L'angle le plus utile du chapitre :** un tri fait sous pression sauve les beaux rôtis et sacrifie le suif, ce qui est exactement l'inverse de ce qu'il faut. Le gras est en plus la matière la plus stable du coffre |
| **Génératrice : jamais dans un bâtiment, un garage ou sous un auvent** | §4 (avertisseur de CO non négociable), §6 (ligne 6 m), §8 point 7. Avec le mécanisme complet et l'angle du chapitre : c'est la nuit d'une panne, rallonge trop courte et -20 °C dehors, que la règle se contourne |

Règle du tableau **volontairement non reprise**, faute de point d'application :
**thuyone du cèdre** (aucune tisane, aucune infusion, aucun conifère dans ce chapitre). Si
l'éditeur ajoute une tisane de conifère à la variante d'urgence, la règle entre avec.

## 3. Dangers de l'encadré, avec leur mécanisme

Huit entrées, chacune avec son mécanisme explicite, aucune « attention » sèche :

1. **Recongeler ce qui a passé 4 °C** — le froid arrête la multiplication sans tuer ; la
   population et les toxines déjà produites traversent le regel ; certaines toxines résistent à
   la cuisson qui tue la bactérie. Point clé : **un congélateur qui vient de dégeler ressemble
   à un congélateur intact.**
2. **Botulisme de type E** — seuil de 3 °C ; anaérobie strict ; le sac de congélation fermé est
   le milieu demandé ; l'avertissement par la pourriture disparaît sous emballage étanche.
3. **Aucun signe sensoriel** — pas de test de cuisine, goûter tue.
4. **Conserves de viande sans autoclave** — aliment peu acide, spores survivant à l'eau
   bouillante, germination en bocal scellé. Renvoi ch. 73 et **refus explicite d'une version
   dégradée**, seul endroit du livre où la section 9 se voit opposer un interdit.
5. **Trichinella insensible au gel, au sel et au fumage** — seule barrière : 74 °C. Avec la
   distinction 74 / 71 sur le haché.
6. **Cadmium des foies et reins de cervidés** — accumulation rénale irréversible.
7. **Monoxyde de carbone de la génératrice** — 6 m, jamais à l'intérieur, symptômes
   indiscernables d'une journée de froid, avertisseur à pile.
8. **Sauver le muscle et jeter le gras** — mal de caribou, mortel en deux à trois semaines, avec
   le garde-manger plein.

Écartés de l'encadré pour ne pas le diluer, et traités ailleurs : brûlure de congélation et
rancissement (§7 — perte de qualité, pas de sécurité), perte du pouvoir germinatif des semences
(§5 étape 30 — perte agricole, pas sanitaire), ours attiré par la pile de rejets (§5 étape 12,
renvoi ch. 48), coupures et dépouillement à la chaîne (§5 étape 27, renvoi ch. 44).

**À surveiller par le vérificateur sécurité :** le point 1 de l'encadré affirme que « certaines
toxines déjà produites résistent à la cuisson ». C'est exact en général (entérotoxine
staphylococcique, notamment) mais **aucune source n'a été enregistrée pour ce chapitre à
l'appui**. Soit on trouve la source, soit on reformule sans l'affirmation. Ne pas la laisser
passer par inertie.

## 4. Images requises

| # | Description | Cadrage | Format |
| --- | --- | --- | --- |
| 1 | **L'arbre de décision complet du chapitre** : température de l'air en entrée, les quatre cas, puis la sonde à cœur, puis les trois piles A / B / C avec leurs seuils (-18 °C, 4 °C) | Diagramme au trait, pleine page, lisible d'un coup d'œil à bout de bras. C'est la page qu'on ouvre en panique : elle doit fonctionner **seule**, sans le texte | **Pleine page** |
| 2 | Le geste de sondage : sonde enfoncée **dans** un paquet de gibier, pas posée dessus, afficheur lisible dans le même cadre | Photo de JP, macro, mains gantées, sur un coffre ouvert | Demi-page |
| 3 | Le tableau des quatre cas rendu en bande graphique : une règle de température de -30 °C à +10 °C avec les trois seuils marqués et ce que chacun autorise | Graphique au trait, horizontal | Quart de page |
| 4 | Les trois piles installées dehors : bac A sous la neige, table B à l'ombre nord, chaudière C fermée et à l'écart | Vue en plan, dessin au trait avec légende numérotée. Une photo ne montrerait pas les distances | Demi-page |
| 5 | Le truc du gobelet d'eau gelée : deux vignettes côte à côte, pièce de monnaie **en surface** / pièce **au fond** | Deux photos, plan très serré, même cadrage exact | Quart de page |
| 6 | Réemballage avant recongélation : le même gibier en un bloc épais à gauche, en paquets plats étiquetés à droite | Photo, vue de dessus, échelle donnée par un couteau | Quart de page |
| 7 | La variante d'urgence d'hiver : coffre débranché sorti du bâtiment, calé côté nord, vides comblés de neige tassée, couvercle fermé et lesté | Photo de JP, plan large, lumière d'hiver | Demi-page |
| 8 | Thermomètre à sonde dans une pièce de gibier en cuisson, affichage **74 °C** lisible | Photo, macro sur l'afficheur | Quart de page |

**Aucune image dans l'encadré DANGER.** Et **aucune photo de viande avariée** : une photo de
viande poisseuse enseigne à décider avec les yeux, ce qui est exactement le réflexe que le
chapitre démonte. Les signes d'échec restent en tableau.

## 5. Renvois vers d'autres chapitres

| Chapitre | Raison |
| --- | --- |
| 3 — Le froid lui-même | Trier dehors la nuit à -25 °C : exposition et jugement |
| 4 — Panne majeure d'Hydro en janvier | Le scénario amont |
| 7 — Des enfants de 4 et 6 ans | La porte laissée ouverte, et la journée de tri avec eux dans les jambes |
| 8 — Le stock permanent du chalet | Répartir plutôt que concentrer |
| 14 — Sans propane | Congélateur à absorption, cuisson de sauvetage |
| 15 — Poêles à bois et rendement | Le combustible de la cuisson de sauvetage |
| 16 — Le feu au chalet | Feu extérieur, chaudrons, claies |
| 18 — Éclairage | Trier à la frontale, et le gras rance comme corps gras |
| 19 — Communiquer et savoir | Joindre le voisinage le jour même |
| 21 — Le voisinage et le groupe de chasse | **La route de sauvetage de plus gros débit du chapitre** |
| 23 — S'organiser à plusieurs familles | Placer un stock dans des congélateurs qui fonctionnent |
| 24 — Le mal de caribou | Le gras sort avant les rôtis |
| 26 — Ce qu'un corps demande l'hiver | Ce que la récolte doit couvrir |
| 33 — Les enfants, la peur et la routine | Une journée de crise tenue devant eux |
| 41 — Abats et organes | Ordre de tri, cadmium |
| 44 — Lièvre d'Amérique | Gants, tularémie, dépouillement à la chaîne |
| 48 — Ours noir | Trichinellose, et la pile de rejets qui attire |
| 51 — Martre, vison, renard, lynx, loup | Appâts de trappe pour le douteux non pourri |
| 52 — Phoque du Saint-Laurent | Trichinellose, même traitement que l'ours |
| 57 — Petits fruits | La pile qui se sacrifie en premier |
| 61 — Pourquoi la viande pourrit | Le mécanisme sous tout le chapitre |
| 62 — Le sel | Le stock qui limite la salaison, et le pourcentage sur le poids de la viande |
| 63 — Salaison à sec | Route de sauvetage |
| 64 — Saumure | Route de sauvetage |
| 65 — Fumage à froid | Route de sauvetage, impossible l'été |
| 66 — Fumage à chaud et séchage | Route de sauvetage |
| 67 — Pemmican et graisses | Le gras, la route la plus stable, et le rance qui gâte un lot |
| 68 — Froid naturel | **Le chapitre à ouvrir quand il fait moins de -18 °C.** Renvoi le plus important |
| 72 — Fumer le poisson | Seule route du poisson qui ne passe pas par la casserole |
| 73 — Conserves et marinades | Autoclave obligatoire pour la viande |
| 75 — Semences | Ne pas ouvrir les sachets froids |
| 76 — Caveau à légumes | Répartition du stock |
| 85 — Le stock de pièces et de consommables | Réparer l'appareil, et la pièce qui manquait |
| 89 — Savon et chandelles | Débouché du gras rance |

**Renvois à ajouter si l'éditeur les juge utiles :** ch. 70 (traiter le poisson à la sortie de
l'eau) et ch. 71 (saler et sécher la truite) ne sont pas cités dans le corps, alors que le §5
phase D et le §5 étape 28 les frôlent. Décision de rédaction : le chapitre 72 suffisait et
l'empilement de renvois nuit à la lisibilité d'une page de panique.

## 6. Relecteur humain

Le chapitre 69 **n'est pas** dans la liste de relecture obligatoire de `CLAUDE.md`.
**Relecture externe recommandée quand même**, par un **inspecteur en salubrité du MAPAQ** ou un
**technologue en sciences des aliments**, pour trois raisons précises :

1. Le chapitre tranche des **décisions de rejet alimentaire** sur des centaines de kilos. Une
   erreur dans un sens intoxique une famille, une erreur dans l'autre lui fait jeter sa récolte
   d'automne. Peu de chapitres ont ce profil des deux côtés.
2. Il oriente vers **six chapitres qui sont, eux, à relecture obligatoire** (62, 63, 64, 65, 72,
   73). Les routes de sauvetage du §5 phase E doivent être cohérentes avec ce que ces chapitres
   disent, et ils ne sont pas tous écrits au moment de ce jet.
3. Trois constructions du livre demandent un œil extérieur : le tableau des quatre cas
   (§5 phase B), l'ordre de tri par risque (§5 phase D étape 13) et la conciliation des deux
   consignes ministérielles (§5 phase F étape 24).

## 7. Notes pour l'éditeur

- **La figure 1 est la vraie sortie du chapitre.** Si la mise en pages ne peut en garder qu'une
  en pleine page dans le tome 4, c'est celle-là. Le chapitre 69 se lit dans une cuisine, une
  frontale sur la tête, à minuit, avec un enfant qui pleure. Un arbre de décision qui tient
  d'un coup d'œil vaut mille mots bien écrits.
- **Ne pas déplacer le §5 phase A avant le §2.** La tentation sera forte de mettre « ne pas
  ouvrir la porte » en exergue au début du chapitre. C'est déjà la première ligne de la
  procédure, et le chapitre a besoin que le lecteur passe d'abord par le tableau des quatre cas,
  sinon il trie à -25 °C un stock qu'il devait simplement sortir dehors.
- **Trois URL officielles ont répondu 404** au moment de la consultation et ont dû être
  remplacées par leur version anglaise : la page « aliments à jeter après une panne », la page
  des températures internes de cuisson de Santé Canada, et le *Thermoguide+*. Les deux premières
  sont **citées six fois entre elles dans ce chapitre**. Les adresses françaises doivent être
  retrouvées et substituées avant impression, et le détail est dans chaque fichier de `/sources`.
- **Le §9 contient un refus.** C'est le seul endroit du livre, à ma connaissance, où une section
  « variante d'urgence » dit qu'une technique **n'a pas** de version dégradée acceptable (la
  conserve de viande sans autoclave). Si l'éditeur uniformise les sections 9 du tome 4, ce refus
  ne doit pas se faire lisser.

## Passe légal et signes — 23 septembre 2026

**Retiré.** Tableau des routes de sauvetage (étape 18), ligne « Appâts de trappe et nourriture
des chiens » : « et la réglementation de l'année » dans la colonne de ce qui arrête la route. Il
reste « La place gelée ».

**Gardé.** « Au village, la collecte ne passe pas pendant une panne générale » (étape 12) : ce
n'est pas une règle municipale, c'est l'absence d'un service, et la phrase porte un mécanisme (la
viande qui tourne trois jours devant la maison). La distance de 6 m de la génératrice : mécanisme
du monoxyde, rappel de sécurité du livre.

**Aucune note de bas de page ajoutée.** Les signes nommés sont décrits là où ils paraissent
(pièce de monnaie au fond du gobelet, surface poisseuse et filante, emballage bombé, gras jaune à
odeur de peinture, brûlure de congélation, fatigue et mauvais caractère du monoxyde chez l'enfant).

Doutes de la passe paperasse sur ce chapitre (lignes préfixées `ea` : étape 31, étape 33, « pas
l'inventaire », libellés « À CUIRE » et « AU SEL », renvoi au ch. 00b) : aucun ne touche au légal
ni à un signe non expliqué, laissés tels quels.

## Levée des [À VÉRIFIER] — 24 septembre 2026

- § 9, témoin d'étage — **confirmé et chiffré** (« gèle beaucoup plus bas » → la saumure ne prend en masse qu'à **-21 °C**, point eutectique à 23 % ; saturée, elle dépose du sel en refroidissant) → `sources/69-fhwa-et-viabilite-hivernale-saumure-point-de-congelation.md`.
- § 9, concentrer par le gel — **confirmé et chiffré** (environ **10 % à -7 °C, 15 % à -11 °C, 20 % à -18 °C, 23 % au plus à -21 °C**) → `sources/69-fhwa-et-viabilite-hivernale-saumure-point-de-congelation.md`.
- § 9, finir au feu — **confirmé et chiffré** (estuaire en surface ≈ **27 g/L**, eau de mer près de **35 g/kg** ; 37 L de fleuve pour 1 kg de sel, calcul 1000 ÷ 27) → `sources/69-salinite-estuaire-maritime-saint-laurent.md`.
- § 9, batteries et onduleur — **confirmé et chiffré** (« plusieurs fois » → **d'ordinaire trois fois** le courant de marche ; onduleur à onde sinusoïdale pure) → `sources/18b-sandia-refrigeration-hors-reseau.md`.
- § 9, génératrice par blocs — **introuvable** : aucun nombre d'heures par jour au dossier ; drapeau retiré, la phrase renvoie déjà à la mesure au min-max. Aucun chiffre ajouté.
- Étape 29 et § 8 point 8, mal de caribou — « deux à trois semaines » → « **en quelques semaines** », décision de la chaîne appliquée à tout le livre (pas de délai chiffré sourcé).
- § 2, nom latin de l'orignal — **corrigé** par propagation du verdict du ch. 43 (*Alces americanus* → ***Alces alces***) → `sources/43-itis-noms-latins-tetras-vison-orignal.md`.

## Renvois vers les chapitres nouveaux — 24 septembre 2026

Renvois seulement, aucun chiffre ajouté.
- §5, étape 4 : la panne au chalet (batteries, panneaux) renvoie au ch. 18b (étape 34).
- §9, « La génératrice par blocs » : les heures par jour se calculent aussi sur la consommation lue au wattmètre (ch. 18b, étapes 3 et 27). La phrase garde la mesure au min-max ; le 18b donne la formule, pas un nombre à copier.
- §9, « Les batteries et l'onduleur » : le banc et ses câbles renvoient au ch. 18b (étapes 20 et 21).

Compression §3 et §4 — 27 septembre 2026 : 942 mots → 201 mots ; matériel coupé : gants jetables, glacières et bacs, neige et glace, bâches et couvertures, grands chaudrons, papier boucherie et marqueur, frontale, les deux paragraphes sous le tableau ; déplacé : « jamais de galvanisé pour ce qui est salé » à l'étape 20, sacs de plastique à défaut de gants à l'étape 27 ; renvoi « non négociable à la section 4 » (§9) corrigé.
