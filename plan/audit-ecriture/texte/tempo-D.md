# Audit de l'écriture : le tempo, lot D (tome 3, ch. 48, 52 et 57)

28 octobre 2026. Un seul regard : le tempo, le texte lu à voix haute comme on l'expliquerait à quelqu'un dans un
garage. Lot : `chapitres/48-lievre-d-amerique.md` (538 lignes), `chapitres/52-ours-noir.md` (477 lignes),
`chapitres/57-truite-et-omble-au-lac.md` (488 lignes), lus au complet. Aucun fichier du livre n'a été modifié ; les
réécritures ci-dessous sont des exemples, sans fait ni chiffre neuf. Dans les citations, le gras du markdown est
enlevé ; les mots sont ceux du livre.

Point de départ : JP, sur le paragraphe du monoxyde (`dangers/partie-1.md`, ligne 3) : « le tempo du paragraphe est
pas bon, pi c'est vrai dans tout le livre ».

État du lot, pour situer : le tome 3 n'est pas encore passé à la grande passe. Les trois chapitres sont à l'ancien
gabarit (neuf sections, « Pourquoi ça marche », encadré DANGER, « § », citations de source entre guillemets) et
portent 133 tirets. Ce qui suit ne juge que le tempo.

## 1. Les mesures

`python3 .claude/skills/ecriture/scripts/tempo.py … --par-fichier`, puis la même mesure sur les sept textes de
`plan/audit-ecriture/references/` et sur le tome 3 entier (`mesures.md`).

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 48 | 5670 | 308 | 18,4 | 0,67 | 19,5 | 17,5 | 20,5 | 34,4 | 26,0 | 3,4 | 6,5 | 6,3 | 4,2 |
| ch. 52 | 4850 | 245 | 19,8 | 0,71 | 12,7 | 20,8 | 18,9 | 29,8 | 23,7 | 5,4 | 9,1 | 6,6 | 4,9 |
| ch. 57 | 5447 | 273 | 20,0 | 0,66 | 15,4 | 21,2 | 14,7 | 28,9 | 25,3 | 3,1 | 5,7 | 5,5 | 6,2 |
| **le lot** | 15967 | 826 | 19,3 | 0,68 | 16,1 | 19,7 | 18,1 | 31,2 | 25,1 | 3,9 | 7,0 | 6,1 | 5,1 |
| tome 3 (20 ch.) | 113743 | 6229 | 18,3 | 0,67 | 17,5 | 17,0 | 19,6 | 29,9 | 22,9 | 4,7 | 7,8 | 5,4 | 5,0 |
| **les sept références** | 17297 | 807 | 21,4 | 0,66 | 13,0 | 23,7 | 27,4 | 6,3 | 3,1 | 5,5 | 2,4 | 9,2 | 5,8 |

Mesures ajoutées pour cet audit (script de travail dans le scratchpad, même nettoyage du markdown que `tempo.py`) :

| | ch. 48 | ch. 52 | ch. 57 | lot | références |
| --- | --- | --- | --- | --- | --- |
| Phrases de 12 à 25 mots | 39,3 % | 39,6 % | 40,7 % | 39,8 % | 42,0 % |
| Phrases de 40 mots et plus | 5,8 % | 6,5 % | 7,7 % | 6,7 % | 11,0 % |
| Phrases qui commencent par un déterminant et un nom (le, la, un, une, ce, sa…) | 43,5 % | 49,4 % | 52,4 % | **48,2 %** | 21,6 % |
| … par un pronom (il, elle, on) | 3,6 % | 4,9 % | 5,5 % | **4,6 %** | 13,0 % |
| … par « C'est », « Ce qui », « Ce que » | 8,1 % | 10,2 % | 8,8 % | **9,0 %** | 1,1 % |
| … par un lien ou une condition (et, mais, donc, alors, puis, quand, si, parce que, pour, avant, après…) | 6,8 % | 2,9 % | 3,7 % | **4,6 %** | 11,8 % |
| Phrases « …, et » suivi d'un nouveau sujet | 40 | 46 | 39 | **125 (15,1 %)** | 26 (3,2 %) |
| Balancier « X, pas Y », « n'est pas X, c'est Y » (pour 1000 mots) | 2,6 | 3,3 | 2,2 | **2,7** | 0,1 |
| Mise en relief « c'est X qui », « ce qui X, c'est » (pour 1000 mots) | 3,4 | 4,1 | 3,3 | **3,6** | 0,7 |
| Paragraphes qui ont 2 phrases « fait : conséquence » ou plus | 22 | 12 | 17 | **51** | |
| Paragraphes de 3 phrases et plus sans aucun lien parlé | 25 sur 52 | 11 sur 35 | 20 sur 43 | 56 sur 130 (43 %) | 42 sur 107 (39 %) |
| Tirets (— ou –) | 50 | 38 | 45 | 133 (8,3 pour 1000 mots) | |

Par section, les trois chapitres ensemble :

| sections | mots | m/phr | « : » % | fait:csq % | liais./1000 | ≥30 % |
| --- | --- | --- | --- | --- | --- | --- |
| 1 à 3 (En une ligne, Quand l'utiliser, Pourquoi ça marche) | 1575 | 21,9 | **43,1** | **34,7** | **3,8** | 22,2 |
| 5 Procédure | 4165 | 17,1 | 26,3 | 21,4 | 6,5 | 16,0 |
| 8 Danger | 1748 | 19,4 | 32,2 | 22,2 | 4,6 | 24,4 |
| 9 Variante d'urgence | 7997 | 20,5 | 32,8 | 27,2 | 6,9 | 21,3 |

### Ce que les chiffres disent

1. **La longueur des phrases n'est pas le problème.** Le lot a la même répartition que les références : 39,8 % de
   phrases de 12 à 25 mots (42,0 %), une variation de 0,68 (0,66), et même moins de très longues phrases (6,7 % contre
   11,0 %). Une règle « faire des phrases plus courtes » ne corrigerait rien : le paragraphe du monoxyde a quatre
   phrases de longueur ordinaire, et JP l'entend quand même.
2. **Le moule de la phrase l'est.** Par rapport aux références, le lot a huit fois plus de phrases « fait :
   conséquence » (25,1 % contre 3,1 %), cinq fois plus de « …, et » qui relance un nouveau sujet (15,1 % contre
   3,2 %), vingt-sept fois plus de balanciers « X, pas Y », cinq fois plus de mises en relief, huit fois plus de
   phrases qui commencent par « C'est » ou « Ce qui ». Deux fois plus de phrases ouvrent sur un nom complet (48 %
   contre 22 %), trois fois moins sur un pronom (4,6 % contre 13 %), deux fois et demie moins sur un lien ou une
   condition (4,6 % contre 11,8 %). Chaque phrase est bâtie seule, en deux temps (un fait, puis un deux-points ou une
   virgule, puis la chute), et repart d'un nom neuf. Aucune ne s'appuie sur celle d'avant, et chacune finit sur un
   accent. C'est ce que JP entend.
3. **Où ça se passe.** Les sections 1 à 3 sont les pires (43 % de deux-points, 35 % de « fait : conséquence », 3,8
   liaisons pour 1000 mots) : ce sont des thèses en gras, une par paragraphe. La variante d'urgence fait la moitié des
   mots du lot (7997 sur 15967) avec 27 % de « fait : conséquence » : la section que CLAUDE.md appelle « le cœur d'un
   chapitre » porte le plus gros volume de mauvais tempo. La procédure s'en tire mieux (17,1 mots par phrase, 21 %).
4. **Ce que les chiffres ne voient pas.** Le nombre de paragraphes sans aucun mot de liaison ne distingue pas le lot
   des références (43 % contre 39 %). Ce qui compte, c'est la façon dont une phrase se raccroche à la précédente (un
   pronom, « alors », « parce que », « quand »), pas la présence d'un mot de liaison quelque part dans le paragraphe.
5. Le tome 3 entier a les mêmes chiffres que le lot : les motifs ci-dessous valent pour tout le tome.

## 2. Le paragraphe du monoxyde a des jumeaux dans le lot

Le paragraphe de JP : une liste de cinq sources « et le poêle en fait plus… » (un fait ajouté après la fin de la
phrase) ; « Le gaz ne se voit pas… » ; « Il prend la place… : on s'endort… » ; « Il se répand… : se coucher par terre
ne protège pas ». Trois phrases sur quatre ouvrent sur « Le » ou « Il », deux sont en « fait : conséquence », aucune
ne dit comment elle découle de la précédente.

Le même moule, dans le lot :

- ch. 52, l. 64 à 68 (section 3) : « Le parasite est dans le muscle, et il ne se voit pas. Sa larve […] ne donne ni
  odeur, ni couleur, ni lésion : chaque ours se traite comme porteur. Sel, fumée, séchage et gel visent des
  bactéries ; […] Seule la chaleur la tue, et elle entre par la surface : le centre, dernier chauffé, décide, et un
  haché n'est que du centre. »
- ch. 57, l. 53 à 60 (section 3) : quatre phrases, quatre « fait : conséquence », quatre sujets neufs (« Les
  ombles… Le poisson… Le ventre… la truite… »).
- ch. 48, l. 298 et 299 : « Sur un animal de 1,4 kg, une sonde appuyée sur l'os donne une lecture fausse de plusieurs
  degrés, et un râble rosé n'est pas cuit. »

Les réécritures sont aux motifs 1, 2 et 3.

## 3. Les motifs, du plus grave au moins grave

### Motif 1. Le deux-points en marteau : « fait : conséquence », phrase après phrase (haute)

**Ce que c'est.** La phrase pose un fait, coupe au deux-points et donne la raison ou la conséquence sans mot de
liaison. Seule, elle passe. Deux ou trois de suite, la voix tombe à chaque deux-points puis repart, comme un marteau.
À voix haute, personne ne dit « deux-points » : on dit « parce que », « alors », « ça fait que », « c'est pour ça
que ».

**Fréquence.** 25,1 % des phrases du lot (ch. 48 : 26,0 ; ch. 52 : 23,7 ; ch. 57 : 25,3), contre 3,1 % dans les
références. 31,2 % des phrases ont un deux-points (références : 6,3 %). 51 paragraphes en ont au moins deux ; le
pire, la section 3 du ch. 57, en a quatre sur quatre phrases. Sections 1 à 3 : 34,7 %.

**Cause.** Le skill `ecriture` donne lui-même ce moule comme modèle : règle 2, « Vidanger avant que la maison descende
sous 5 °C : un tuyau plein fend en gelant » ; la section « Le tiret » propose le deux-points comme premier remplaçant
(« Une seule règle : la génératrice dehors. ») ; CLAUDE.md fait pareil pour les lignes de matériel (« Thermomètre à
sonde : porte les 74 °C à cœur »). Aucune règle ne limite le nombre de deux-points par paragraphe.

**Exemples.**

1. `chapitres/48-lievre-d-amerique.md`, l. 418 à 422 (trois phrases, deux deux-points et un tiret) :
   « Ça ne se fait que sur un animal encore souple : gelé, la peau ne se déchire plus, elle arrache la chair avec elle.
   Gants aux mains et fourrure humectée comme toujours — ce geste-là tire beaucoup de poil, donc beaucoup de poussière
   si le poil est sec. Le couteau reste nécessaire pour l'éviscération : la paroi abdominale ne se déchire pas
   proprement, et c'est exactement ce qu'il ne faut pas percer (étape 12). »
   → « Il faut le faire pendant que l'animal est encore souple, parce qu'une fois gelée, la peau ne se déchire plus et
   arrache la chair avec elle. Ce geste-là tire beaucoup de poil, alors on garde les gants et on mouille la fourrure
   comme toujours, sinon le poil sec lève de la poussière. Pour vider l'animal, il faut quand même un couteau, parce
   que la paroi du ventre ne se déchire pas proprement et qu'il ne faut rien percer à cet endroit (étape 12). »

2. `chapitres/57-truite-et-omble-au-lac.md`, l. 53 à 60 (quatre phrases, quatre « fait : conséquence ») :
   « Les ombles sont des poissons d'eau froide et oxygénée : l'eau qui se réchauffe perd son oxygène, et le poisson
   descend vers le fond, les fosses, les sources. Le poisson se dégrade plus vite que la viande rouge : sa flore
   travaille encore au froid qui ralentit celle de l'orignal, et le botulisme aquatique de type E pousse au-dessus de
   3 °C. Le ventre est le point faible : après la mort, les enzymes digestives attaquent la paroi, et un poisson non
   vidé se perce de l'intérieur. Enfin, la truite est une viande maigre : mangée presque seule, elle dépasse ce que le
   foie évacue d'azote, c'est mortel en quelques semaines, et le gras doit venir d'ailleurs (ch. 19, ch. 22, ch. 72). »
   → « Les ombles ont besoin d'une eau froide et pleine d'oxygène. Quand l'eau se réchauffe, elle perd son oxygène,
   alors le poisson descend vers le fond, dans les fosses et près des sources. Une fois pris, il se gâte plus vite que
   la viande rouge, parce que ses bactéries travaillent encore à un froid qui ralentit celles de l'orignal, et que le
   botulisme de type E pousse dès qu'on dépasse 3 °C. Le ventre lâche en premier : après la mort, les
   enzymes de la digestion attaquent la paroi, et un poisson qu'on n'a pas vidé se perce de l'intérieur. Enfin, la
   truite est maigre. Si on ne mange presque que ça, le foie n'arrive plus à évacuer l'azote, et ça tue en quelques
   semaines. Le gras doit donc venir d'ailleurs (ch. 19, ch. 22, ch. 72). »

3. `chapitres/52-ours-noir.md`, l. 319 à 324 :
   « Sans thermomètre. C'est la seule perte qui compte, et elle est grave : on perd la vérification de la seule
   barrière qui existe contre la trichinellose. Le livre ne peut pas prétendre le contraire. Ce qui reste est un
   raisonnement de physique, pas une mesure : l'eau qui bout est à environ 100 °C, donc un morceau immergé dans une
   eau à gros bouillons a toute sa surface tenue au-dessus de 74 °C, et son centre y monte à mesure que la chaleur
   pénètre. La conduite dégradée en découle : »
   → « Sans thermomètre, on ne peut plus vérifier la seule barrière qui existe contre la trichinellose, et c'est
   grave. Il reste un raisonnement. L'eau qui bout est à environ 100 °C, alors un morceau plongé dans une eau à gros
   bouillons a toute sa surface au-dessus de 74 °C, et son centre y monte à mesure que la chaleur entre. Ça donne
   quatre consignes : »

4. `chapitres/57-truite-et-omble-au-lac.md`, l. 446 à 451 :
   « Ce sel-là fonctionne, avec une limite qui change la méthode. Sa pureté est inconnue, et tous les pourcentages de
   sel du tome 4 se calculent sur le poids de la chair, avec un sel dont on connaît la pureté. Un sel de mer maison ne
   se dose donc pas au pourcentage : il se travaille en salage à saturation — on en remet tant que la chair en prend —
   sur des filets minces et ouverts. Ça donne un poisson de conservation courte, à surveiller, et non une pièce de
   garde. »
   → « Ce sel-là fait l'affaire, mais on ne connaît pas sa pureté. Or tous les pourcentages de sel du tome 4 se
   calculent sur le poids de la chair, avec un sel dont on connaît la pureté. On ne peut donc pas doser au pourcentage
   un sel de mer fait au chalet. On sale plutôt à saturation, sur des filets minces et ouverts, en remettant du sel
   tant que la chair en prend. Le poisson se garde alors peu de temps, et il faut le surveiller. »

### Motif 2. Chaque phrase repart de zéro : le paragraphe en paraboles (haute)

**Ce que c'est.** Dans le paragraphe, chaque phrase reprend un sujet nom complet (« Le lièvre… La tularémie… Le
froid… Le lièvre… »), pose sa vérité et s'arrête. Rien ne dit comment la phrase suivante découle de celle-ci : ni
pronom qui reprend, ni « alors », ni « parce que », ni « quand ». Le paragraphe n'avance pas, il empile, et le
lecteur doit faire lui-même les liens. C'est le « paragraphe en paraboles » que JP a refusé au ch. 3 (skill
`ecriture`, tableau, ligne « La section 3 du ch. 3 » : « on dirait que tu parles en paraboles »), et c'est la seconde
moitié du paragraphe du monoxyde (« Le gaz… Il… Il… »).

**Fréquence.** 48,2 % des phrases du lot commencent par un déterminant et un nom (références : 21,6 %) ; 4,6 % par un
pronom (13,0 %) ; 4,6 % par un lien ou une condition (11,8 %). Liaisons parlées : 6,1 pour 1000 mots (9,2) ; 3,8 dans
les sections 1 à 3. La section 3 du ch. 48 est la forme extrême : cinq paragraphes d'une phrase chacun, cinq thèses en
gras.

**Cause.** Skill `ecriture`, règle 1 : « Une phrase, une information. Deux faits, deux phrases. » La règle coupe, et
rien ne demande ensuite de relier. Règle 6 (« Le mot exact, et toujours le même ») pousse à renommer le sujet au lieu
de le reprendre par « il » ou « on ». L'ancien gabarit demandait des mécanismes en gras, un par paragraphe (section 3
« Pourquoi ça marche »), et le nouveau les met « dans l'étape qu'il explique » sans dire comment les y attacher.

**Exemples.**

1. `chapitres/48-lievre-d-amerique.md`, l. 49 à 55 (trois paragraphes d'une phrase) :
   « La tularémie entre par les mains, pas par la bouche : une gerçure, l'œil ou la poussière du poil suffisent, avant
   que la cuisson n'y puisse rien ; la préparation sert à fermer ces portes. / Le froid ne désinfecte pas : la
   bactérie traverse des années de gel ; la chaleur et la javel la tuent. / Le lièvre normal peut être porteur : la
   méthode s'applique à chaque prise, sans tri à l'œil. »
   → « La tularémie entre par les mains, pas par la bouche. Elle passe par une gerçure, par l'œil ou par la poussière
   du poil, bien avant que la cuisson puisse y faire quoi que ce soit ; c'est pour fermer ces entrées-là qu'on prépare
   le lièvre de cette façon. Comme un lièvre qui a l'air normal peut la porter, on prend les mêmes précautions avec
   chaque prise. Le froid ne la tue pas, parce qu'elle traverse des années de gel ; il faut la chaleur ou la javel. »

2. `chapitres/52-ours-noir.md`, l. 64 à 68 :
   « Le parasite est dans le muscle, et il ne se voit pas. Sa larve, enkystée dans la fibre, ne donne ni odeur, ni
   couleur, ni lésion : chaque ours se traite comme porteur. Sel, fumée, séchage et gel visent des bactéries ; aucun
   ne tue une larve faite pour vivre dans le muscle et, au Nord, pour passer l'hiver gelée. Seule la chaleur la tue, et
   elle entre par la surface : le centre, dernier chauffé, décide, et un haché n'est que du centre. »
   → « Le parasite vit dans le muscle, et on ne peut pas le voir : sa larve, enkystée dans la fibre, ne donne ni odeur,
   ni couleur, ni lésion. Il faut donc traiter chaque ours comme s'il le portait. Le sel, la fumée, le séchage et le
   gel agissent sur les bactéries, mais ils ne tuent pas cette larve, qui est faite pour vivre dans le muscle et, dans
   le Nord, pour passer l'hiver gelée. Seule la chaleur la tue. Comme la chaleur entre par la surface, le centre du
   morceau chauffe en dernier, alors on se fie à la température du centre ; et dans un haché, tout est du centre. »

3. `chapitres/48-lievre-d-amerique.md`, l. 102 à 108 (six phrases, six sujets neufs, une maxime) :
   « Relever la ligne chaque matin. L'éviscération se fait immédiatement après la mort de l'animal. Un lièvre pris au
   collet est déjà, par construction, hors de cette fenêtre : le froid de janvier rachète une partie du retard, pas
   tout. Et ce qui attend se fait prendre — renard, martre, corneille : une prise laissée deux nuits est rarement
   encore entière. Une ligne trop longue pour être relevée chaque matin est une ligne trop longue : mieux vaut dix
   collets visités tous les jours que trente visités aux trois jours. Le collet à ressort (§9) est la seule réponse
   connue à une ligne qu'on ne peut pas suivre. »
   → « Relever la ligne chaque matin. Un animal doit être vidé tout de suite après sa mort, et un lièvre pris au collet
   a forcément attendu ; le froid de janvier rattrape une partie du retard, pas tout. Une prise qui attend se fait
   aussi manger par le renard, la martre ou la corneille : après deux nuits, elle est rarement encore entière. Mieux
   vaut donc dix collets visités tous les jours que trente visités aux trois jours. Si on ne peut pas suivre la ligne
   tous les jours, la seule solution connue est le collet à ressort (section 9). »

4. `chapitres/52-ours-noir.md`, l. 107 à 110 :
   « Viser 7 °C à cœur dans les 24 premières heures. C'est le même objectif que pour l'orignal, et il est plus
   difficile à tenir sur un ours, parce que la couche de gras sous la peau est un isolant continu qui enveloppe la
   carcasse. La masse chaude est dedans, la couverture est dessus. »
   → « Viser 7 °C à cœur dans les 24 premières heures, comme pour l'orignal. Sur un ours, c'est plus difficile à
   tenir, parce que la couche de gras sous la peau fait un isolant tout autour de la carcasse et garde la chaleur
   dedans. »

5. `chapitres/57-truite-et-omble-au-lac.md`, l. 117 à 119 :
   « Décider de garder ou de remettre avant de sortir le poisson de l'eau. La manipulation hors de l'eau se limite à
   moins de 15 secondes : peser, mesurer, admirer et délibérer prennent plus que ça. Un poisson dont on hésite est un
   poisson qu'on remet. »
   → « Décider de garder ou de remettre avant de sortir le poisson de l'eau. Un poisson qu'on remet doit rester moins
   de 15 secondes hors de l'eau, et c'est moins que le temps de le peser, de le mesurer, de le regarder et de se
   décider. Alors, si on hésite, on le remet. »

### Motif 3. La phrase qui repart après sa fin : « …, et » suivi d'un autre fait (haute)

**Ce que c'est.** La phrase est finie ; une virgule et un « et » lancent un second fait, avec un nouveau sujet,
souvent plus important que le premier. À voix haute, la voix est déjà descendue sur le premier fait, et elle doit
remonter pour un ajout qu'on n'attendait plus. C'est l'ouverture du paragraphe du monoxyde (« …font du monoxyde de
carbone, et le poêle en fait plus quand… »). Variantes : « …, et c'est aussi… », « …, sachant que… », « — et c'est
aussi là… ».

**Fréquence.** 125 phrases dans le lot (15,1 %), contre 26 dans les références (3,2 %) ; 40, 46 et 39 par chapitre.
Les trois « En une ligne » du lot sont bâties ainsi, et font 56, 53 et 61 mots ; deux ont exactement le même moule
(« X est la seule…, et c'est aussi la seule… »).

**Cause.** Le gabarit, section 1 : « Une phrase. Pas deux. » Pour tout dire en une phrase, on coud les faits avec
« et ». Dans le texte courant, CLAUDE.md règle 5 (« Écrire dense ») et le skill `ecriture` (« Couper n'est pas
compresser », règle 10, mal appliquée) : on colle le second fait au premier au lieu de lui donner sa phrase ou un lien
qui dit le rapport (« alors », « parce que », « mais »).

**Exemples.**

1. `chapitres/48-lievre-d-amerique.md`, l. 12 à 15 (56 mots) :
   « Le lièvre d'Amérique (Lepus americanus) est la seule viande fraîche que la forêt boréale donne tout l'hiver sans
   munition, sans moteur et sans s'éloigner du chalet — de 1,2 à 1,6 kg sur pattes par prise — et c'est aussi le seul
   gibier d'ici dont la simple manipulation, avant toute cuisson, peut mettre quelqu'un à l'hôpital. »
   → « Le lièvre d'Amérique est la seule viande fraîche que la forêt boréale donne tout l'hiver sans munition, sans
   moteur et sans s'éloigner du chalet, à raison de 1,2 à 1,6 kg sur pattes par prise. C'est aussi le seul gibier
   d'ici qui puisse envoyer quelqu'un à l'hôpital juste parce qu'il l'a manipulé, avant même de le cuire. »

2. `chapitres/52-ours-noir.md`, l. 15 à 17 (53 mots, le même moule) :
   « L'ours noir (Ursus americanus) est la seule bête du territoire qui donne une couche de gras détachable en
   feuilles, et c'est aussi la seule dont chaque bouchée doit passer 74 °C à cœur, parce que ni le sel, ni le fumage,
   ni le séchage, ni le congélateur ne règlent le parasite qu'elle porte. »
   → « L'ours noir est la seule bête du territoire qui donne une couche de gras qu'on détache en feuilles. C'est aussi
   la seule dont chaque bouchée doive avoir passé 74 °C à cœur, parce que ni le sel, ni le fumage, ni le séchage, ni le
   congélateur ne règlent le parasite qu'elle porte. »

3. `chapitres/57-truite-et-omble-au-lac.md`, l. 11 à 14 (61 mots) :
   « Prendre au lac l'omble de fontaine (truite mouchetée) et le touladi (truite grise), puis les amener du bord de
   l'eau au froid — 0 à 4 °C jusqu'à la transformation, -18 °C ou moins pour l'hiver — assez vite pour que la chair
   vaille encore le déplacement, sachant qu'un poisson perd en quelques heures ce qu'un quartier d'orignal met une
   journée à perdre. »
   → « Pêcher au lac l'omble de fontaine (la truite mouchetée) et le touladi (la truite grise), puis les mettre au
   froid assez vite pour que la chair vaille encore le déplacement : de 0 à 4 °C jusqu'à ce qu'on les transforme,
   -18 °C ou moins pour l'hiver. Un poisson perd en quelques heures ce qu'un quartier d'orignal met une journée à
   perdre. »

4. `chapitres/48-lievre-d-amerique.md`, l. 298 et 299 :
   « Sur un animal de 1,4 kg, une sonde appuyée sur l'os donne une lecture fausse de plusieurs degrés, et un râble
   rosé n'est pas cuit. »
   → « Sur un animal de 1,4 kg, une sonde qui touche l'os se trompe de plusieurs degrés. Et un râble encore rosé n'est
   pas cuit. »

5. `chapitres/52-ours-noir.md`, l. 8 et 9 :
   « Le congélateur est resté à la maison, et c'est pour ça que la voie longue de l'ours est le pot et non le paquet. »
   → « Comme le congélateur est resté à la maison, la viande d'ours qu'on veut garder longtemps va en pots. »

6. `chapitres/57-truite-et-omble-au-lac.md`, l. 260 à 262 :
   « Ça pêche les embouchures, les bordures ombragées et les fosses de rive, c'est-à-dire exactement là où l'eau
   froide arrive — et c'est aussi là qu'on pourra garder la prise au frais. »
   → « Avec la perche, on pêche les embouchures, les bordures à l'ombre et les fosses le long de la rive, là où arrive
   l'eau froide. C'est aussi là qu'on pourra garder la prise au frais. »

### Motif 4. La phrase-entrepôt : une liste à étages dans une seule phrase (moyenne)

**Ce que c'est.** Le lot n'a pas trop de longues phrases (6,7 % de 40 mots et plus, contre 11,0 % aux références).
Mais les longues phrases des références avancent : une proposition mène à la suivante, par une relative, un « et
puis », un « parce que ». Les nôtres empilent : un deux-points, une liste de quatre à dix membres, des points-virgules,
un chiffre dans chaque membre, une incise. On ne peut pas la lire d'un souffle, et on ne peut pas la couper au point
sans la réécrire.

**Fréquence.** 55 phrases de 40 mots et plus (18, 16 et 21). Les cinq plus longues font de 66 à 91 mots : ch. 52,
l. 452 (91) et l. 54 (76) ; ch. 57, l. 143 (85) et l. 400 (66) ; ch. 52, l. 293 à 296 (81 au découpage du script, deux citations collées).

**Cause.** Skill `ecriture`, tableau, ligne « La procédure tassée dans une étape » (ch. 3, étape 23) : la règle
demande des sous-étapes pour les gestes, mais rien pour une liste de destinations, de matériaux ou de mesures ; elle
finit donc dans une phrase. La section « Le tiret » offre le deux-points et les parenthèses comme remplaçants, ce qui
rallonge la phrase au lieu de la couper.

**Exemples.**

1. `chapitres/57-truite-et-omble-au-lac.md`, l. 143 à 147 (85 mots) :
   « Trier à l'arrivée selon la destination, et pas selon la taille : ce qui se mange bientôt reste au frigo à 0 à
   4 °C, et pas plus de 1 à 2 jours cru, 5 à 7 jours une fois cuit ; ce qui passe l'hiver descend à -18 °C ou moins, où
   la durée ne change plus la salubrité, seulement le goût ; ce qui s'en va au sel ou au fumoir part tout de suite vers
   le ch. 76 ou le ch. 77, pas le lendemain. »
   → « Trier à l'arrivée selon ce qu'on va faire du poisson, pas selon sa taille. Ce qu'on mange bientôt va au frigo,
   entre 0 et 4 °C : on peut le garder 1 à 2 jours cru, et 5 à 7 jours une fois cuit. Ce qui doit passer l'hiver va à
   -18 °C ou moins ; à cette température, le temps change le goût, mais plus la salubrité. Ce qui va au sel ou au
   fumoir part tout de suite, pas le lendemain (ch. 76, ch. 77). »

2. `chapitres/52-ours-noir.md`, l. 452 à 456 (91 mots) :
   « Un ours du début à la fin sans un seul produit du commerce : éviscérer, refroidir, dépouiller, détacher la nappe
   de gras, fondre le gras au chaudron sur le poêle à bois ou aux pierres chaudes, tordre les cretons, filtrer au linge
   ou par décantation, couler dans des contenants secs ; couper la viande mince et la faire bouillir à gros bouillons
   au fur et à mesure des repas ; hacher et sécher ce qui a d'abord bouilli, jamais du cru ; piler le sec et le lier au
   gras pour ce qui doit voyager. »
   → « Sans un seul produit du commerce, on peut traiter un ours du début à la fin. On le vide, on le laisse refroidir,
   on le dépouille et on détache la nappe de gras. On fond le gras au chaudron, sur le poêle à bois ou aux pierres
   chaudes, puis on tord les cretons, on filtre au linge ou on laisse reposer, et on coule le gras dans des contenants
   secs. La viande, on la coupe mince et on la fait bouillir à gros bouillons au fur et à mesure des repas. On ne
   hache et on ne sèche que ce qui a d'abord bouilli, jamais du cru. Pour ce qui doit voyager, on pile la viande sèche
   et on la lie au gras. »

3. `chapitres/57-truite-et-omble-au-lac.md`, l. 400 à 404 (66 mots) :
   « L'hiver, l'eau se coule dans des chaudières et les blocs démoulés s'empilent serrés en cube dans une fosse drainée,
   creusée à l'ombre du côté nord, les joints bouchés à la neige damée — jamais de bran de scie entre les rangs —, sur
   30 cm de bran de scie sec (ch. 73), avec 30 cm autour et dessus (60 cm s'il faut du foin ou de la paille). »
   → « L'hiver, on coule l'eau dans des chaudières, puis on démoule les blocs. On creuse une fosse drainée, à l'ombre,
   du côté nord, et on met 30 cm de bran de scie sec au fond (ch. 73). On y empile les blocs serrés, en cube, et on
   bouche les joints avec de la neige damée ; on ne met jamais de bran de scie entre les rangs. On couvre ensuite le
   tas de 30 cm de bran de scie sur les côtés et sur le dessus ; avec du foin ou de la paille, il en faut 60 cm. »

4. `chapitres/52-ours-noir.md`, l. 54 à 58 (76 mots) :
   « Ce qui n'est pas dans ce chapitre : l'abattage, la saignée et l'éviscération, qui sont au ch. 61 et s'appliquent
   à l'ours sans modification ; la carte de la carcasse et le démontage des quartiers, aux ch. 62 à 65 ; la peau, au
   ch. 102 ; ce qu'on laisse en forêt et à quelle distance du camp, au ch. 23 — question qui, avec un ours, se pose
   deux fois, parce que les restes d'un ours attirent les autres ours. »
   → « L'abattage, la saignée et l'éviscération se font sur l'ours comme sur les autres bêtes (ch. 61). La carte de la
   carcasse et le démontage des quartiers sont aux ch. 62 à 65, la peau au ch. 102. Ce qu'on laisse en forêt, et à
   quelle distance du camp, est au ch. 23 ; avec un ours, il faut y penser deux fois, parce que ses restes attirent
   les autres ours. »

5. `chapitres/57-truite-et-omble-au-lac.md`, l. 270 et 271 (55 mots) :
   « Fil de tente, fil à coudre en plusieurs brins commis ensemble et frottés de gomme d'épinette (ch. 94) pour qu'ils
   travaillent en un seul, tendon fendu et assoupli, babiche fine (ch. 103) — en sachant que la babiche mouillée
   s'allonge et se ramollit, donc qu'elle fait un corps de ligne et jamais un bas de ligne. »
   → « On peut prendre du fil de tente, ou du fil à coudre : on en tord plusieurs brins ensemble et on les frotte de
   gomme d'épinette (ch. 94) pour qu'ils travaillent comme un seul. Un tendon fendu et assoupli fait aussi l'affaire,
   comme la babiche fine (ch. 103). Mouillée, la babiche s'allonge et ramollit, alors on s'en sert pour le corps de la
   ligne, jamais pour le bas de ligne. »

6. `chapitres/48-lievre-d-amerique.md`, l. 500 à 502 (55 mots, avec une personnification au bout) :
   « Ni enterré près d'un ruisseau ou d'un lac, ni laissé dans un banc de neige au bord du sentier : la bactérie
   «survit plusieurs mois dans un environnement humide et froid tel que l'eau, la boue et les carcasses en
   décomposition », et le printemps ramène à la surface et à l'eau ce que l'hiver avait caché. »
   → « Ne pas l'enterrer près d'un ruisseau ou d'un lac, ni le laisser dans un banc de neige au bord du sentier. La
   bactérie survit plusieurs mois dans l'eau, la boue et les carcasses qui pourrissent, et au printemps, la fonte
   ramène à la surface et jusqu'à l'eau ce qui était sous la neige. »

### Motif 5. Le balancier : « X, pas Y » et « ce n'est pas X, c'est Y » (moyenne)

**Ce que c'est.** La phrase finit sur ce que la chose n'est pas. Le rythme se balance (oui, puis non) et la fin sonne
comme une maxime. Le second membre n'apprend presque jamais rien : personne ne pensait qu'un lièvre était « un
chantier de débitage ». C'est l'« opposition fabriquée » du skill (tableau « Les phrases »), sous sa forme courte, en
fin de phrase, que ni `controle.py` ni `tempo.py` ne comptent.

**Fréquence.** 2,7 pour 1000 mots dans le lot (environ 43 phrases), 0,1 dans les références : c'est le tic le plus
propre à notre texte, vingt-sept fois plus fréquent. Il ferme souvent un paragraphe.

**Cause.** Le skill `ecriture` ne nomme l'opposition fabriquée qu'en tête de phrase (« Ce qui détruit la plomberie
n'est pas le froid mais… »). Les règles sont elles-mêmes écrites en balancier, et le rédacteur prend leur cadence :
règle 8 « Dire ce qui marche, pas ce qui ne marche pas », CLAUDE.md « Un manuel pour survivre […] ; pas un manuel de
la CNESST », « Le mécanisme reste, la conformité saute ». Habitude d'IA connue.

**Exemples.**

1. `chapitres/48-lievre-d-amerique.md`, l. 23 à 28 (deux balanciers dans le même paragraphe) :
   « Quand les enfants ont besoin de viande fraîche régulièrement et qu'une bête de 600 kg n'est pas une réponse à ce
   besoin-là — un lièvre, c'est un repas de famille, pas un chantier de débitage. […] Et comme complément dans une
   ration d'hiver qui repose déjà sur autre chose : le lièvre est un apport, pas un socle. »
   → « Quand les enfants ont besoin de viande fraîche souvent : un lièvre fait un repas pour la famille, alors qu'une
   bête de 600 kg est tout un chantier à débiter. […] Et pour compléter une ration d'hiver qui repose sur autre
   chose. »

2. `chapitres/52-ours-noir.md`, l. 113 à 115 :
   « Dès que la bête est à l'abri des mouches et de la poussière, la peau et sa couche de gras s'enlèvent, et le
   refroidissement reprend son cours normal. Avec un ours, le dépouillement n'est pas une opération de confort, c'est
   une opération de refroidissement. »
   → « Dès que la bête est à l'abri des mouches et de la poussière, enlever la peau et sa couche de gras, pour que la
   viande refroidisse normalement. » (La dernière phrase redit la précédente ; elle sort.)

3. `chapitres/52-ours-noir.md`, l. 405 et 406, et `chapitres/57-truite-et-omble-au-lac.md`, l. 477 (le même moule,
   à deux chapitres de distance) :
   « C'est une perte de sécurité alimentaire, pas une perte de salubrité. » ; « C'est une perte de territoire, pas
   une perte de sécurité. »
   → ch. 52 : « On a moins de réserve pour le printemps, mais la viande n'en est pas moins saine. » ; ch. 57 : couper
   (la phrase d'avant dit déjà « l'embarcation reste à terre et on pêche du bord »).

4. `chapitres/57-truite-et-omble-au-lac.md`, l. 395 à 397 :
   « Ce qui isole n'est pas la matière, c'est l'air immobile qu'elle retient : un bourrage tassé, mouillé ou affaissé
   n'isole plus. »
   → « Le bourrage isole parce qu'il retient de l'air qui ne bouge pas ; tassé, mouillé ou affaissé, il n'isole
   plus. »

5. `chapitres/48-lievre-d-amerique.md`, l. 515 :
   « Ce qui emporte, c'est la dilution et la durée, pas la mousse. »
   → « L'eau emporte la bactérie à condition de couler longtemps et de partir ; la mousse n'y fait rien. »

6. `chapitres/52-ours-noir.md`, l. 186 et 187 :
   « Fumage à chaud (ch. 71) : autorisé, à la condition que la sonde lise 74 °C à cœur avant la sortie du fumoir. Le
   fumoir remplace le four, il ne remplace pas le thermomètre. »
   → « Fumage à chaud (ch. 71) : on peut fumer l'ours à chaud, à condition que la sonde lise 74 °C à cœur avant de
   sortir la viande du fumoir. » (La formule redit la condition ; elle sort.)

### Motif 6. La chute en formule : le paragraphe qui finit sur un coup de tambour (moyenne)

**Ce que c'est.** Le paragraphe a dit son fait et son geste ; une dernière phrase courte le referme en maxime : une
tautologie (« Une ligne trop longue […] est une ligne trop longue »), une image (« un objet décoratif »), un verdict
(« Le lièvre se cuit, point. »). Lue à voix haute, c'est la phrase où le ton change : on passe de l'explication au
sermon. Le paragraphe n'a pas besoin de cette fin ; sa vraie fin, c'est le dernier geste ou le dernier fait utile.

**Fréquence.** Au moins 45 fins de paragraphe relevées à la lecture (14 au ch. 48, 15 au ch. 52, 16 au ch. 57),
surtout en section 9. Le moule le plus fréquent : « Un X qui… est un X… » (ch. 48, l. 82 et 106 ; ch. 57, l. 40, 118
et 379 ; ch. 52, l. 198 et 306). La chute fabrique même des chiffres : le ch. 52 dit du même ours qu'il est « à moitié
perdu » (l. 306) et « gaspillé aux trois quarts » (l. 448) ; la fraction vient du rythme de la phrase, pas d'une
source (règle 1 de CLAUDE.md).

**Cause.** Le skill `editeur` la demande : « alterne phrases courtes (percutantes) et phrases longues (rythmées) »
(section des principes). Le skill `ecriture` l'interdit (« La chute en formule », tableau du 15 octobre « Un X qui… ne…
plus »), mais `controle.py` ne repère que la forme « Un X qui… ne… plus ».

**Exemples.**

1. `chapitres/48-lievre-d-amerique.md`, l. 82 et 83 :
   « Une station montée à la noirceur avec un lièvre gelé dans une main est une station incomplète. »
   → couper : l'étape dit déjà « avant d'en avoir besoin » et « d'avance ».

2. `chapitres/57-truite-et-omble-au-lac.md`, l. 212 et 213 :
   « C'est pour ça que le VFI se porte, pas se transporte. Un gilet rangé sous le banc est un objet décoratif. »
   → « C'est pour ça qu'on met son VFI avant de partir, au lieu de le garder sous le banc. »

3. `chapitres/57-truite-et-omble-au-lac.md`, l. 379 et 380 :
   « La température se mesure, elle ne s'estime pas : la cible reste 0 à 4 °C. Une eau de bordure à l'ombre reste une
   eau tiède à l'ombre. »
   → « On mesure la température, on ne la devine pas : la cible reste de 0 à 4 °C. L'eau du bord reste tiède, même à
   l'ombre. »

4. `chapitres/52-ours-noir.md`, l. 306 et l. 447 et 448 :
   « Un ours dont on jette le gras pour ne garder que le muscle est un ours à moitié perdu. » ; « Un ours dont on n'a
   gardé que les steaks a été gaspillé aux trois quarts. »
   → couper les deux : le fait (« le gras, qui est la moitié de la valeur de la bête ») est dit à la l. 393 et à la
   l. 458, et les deux formules se contredisent.

5. `chapitres/48-lievre-d-amerique.md`, l. 525 à 527 :
   « Ni le gel, ni le sel, ni le fumage à froid ne rendent un lièvre sûr. Le fumage à froid, par définition, ne monte
   pas à la température qui tue (ch. 70) : un lièvre fumé à froid est un lièvre cru et froid. Le lièvre se cuit,
   point. »
   → « Seule la cuisson rend un lièvre sûr. Le gel, le sel et le fumage à froid ne le font pas : le fumage à froid ne
   monte pas à la température qui tue la bactérie (ch. 70), alors un lièvre fumé à froid est encore cru. »

6. `chapitres/57-truite-et-omble-au-lac.md`, l. 327 à 329 :
   « Et elle a une qualité qu'aucun engin du ch. 60 n'a : on voit le poisson avant de le prendre. Le petit passe, le
   poisson de table se frappe. »
   → « Contrairement aux engins du ch. 60, la foène permet de voir le poisson avant de le prendre : on laisse passer
   les petits et on frappe seulement ceux qui sont assez gros pour la table. »

### Motif 7. La série oratoire : l'anaphore et l'accumulation (moyenne)

**Ce que c'est.** Trois, quatre, cinq membres bâtis pareil (« On perd… On perd… On perd… », « Aucun sel, aucune fumée,
aucun froid… », « Rien ne se verra, rien ne se sentira, rien ne se goûtera »). C'est le rythme du discours et de
l'avertissement solennel, pas celui de quelqu'un qui explique dans un garage. La série cache souvent un membre qui
n'apprend rien (« aucune odeur et aucune couleur » ne remplacent pas la cuisson : ce sont des tests, pas des
traitements).

**Fréquence.** Une vingtaine de séries relevées à la lecture, à peu près sept par chapitre, surtout dans l'encadré
DANGER et la section 9 (ch. 48, l. 30 à 40 : cinq « Jamais » de suite ; ch. 52, l. 274 : quatre « pas de » ; l. 464 :
six « aucun » ; ch. 57, l. 481 à 488 : quatre « On perd »). Les rappels de sécurité en « ni…, ni…, ni… » restent :
c'est leur fait. Ce qui sort, c'est l'amplification autour.

**Cause.** Habitude d'écriture (l'insistance par la répétition, tic d'IA reconnu) ; aucune règle ne la nomme. Le
moule « Ce qu'on perd : » de la section 9 (quatre fois au ch. 48) appelle la série.

**Exemples.**

1. `chapitres/57-truite-et-omble-au-lac.md`, l. 481 à 488 :
   « Ce qu'on perd, honnêtement. On perd le volume : sans glacière, une famille ne rapporte pas une journée de pêche,
   elle rapporte un repas et un peu de salaison. On perd le choix de la destination : tout se décide dans l'heure, et
   un poisson qu'on aurait fumé demain se sale aujourd'hui. On perd la marge d'erreur : la chaîne de froid, quand elle
   existe, absorbe une erreur de jugement, et là il n'y a plus rien qui l'absorbe. On perd aussi le gros poisson —
   garder un touladi de 3 kg sans froid n'a pas de sens, et le remettre à l'eau est la bonne décision, pas un
   gaspillage. Et on gagne une seule chose, mais elle est réelle : une source de nourriture fraîche qui ne dépend
   d'aucune machine, d'aucun carburant et d'aucun stock. »
   → « Sans glacière, une famille ne rapporte pas une journée de pêche : elle rapporte un repas et un peu de salaison.
   Tout se décide dans l'heure, alors un poisson qu'on aurait fumé demain, on le sale aujourd'hui. Il n'y a plus de
   chaîne de froid pour rattraper une erreur de jugement. On ne peut pas garder un touladi de 3 kg sans froid : on le
   remet à l'eau. En échange, on a de la nourriture fraîche qui ne dépend d'aucune machine, d'aucun carburant et
   d'aucun stock. »

2. `chapitres/52-ours-noir.md`, l. 463 à 466 :
   « Il n'y a pas de version dégradée de cette règle-là : il y a la chaleur, ou il y a le parasite. Aucun sel, aucune
   fumée, aucun froid, aucune durée de garde, aucune odeur et aucune couleur ne prennent sa place (§3, §8). Tout le
   reste de cette section décrit des manières de contourner un manque ; celle-là ne se contourne pas, elle se subit. »
   → « Rien ne remplace la chaleur contre le parasite : ni le sel, ni la fumée, ni le froid, ni le temps de garde
   (sections 3 et 8). »

3. `chapitres/52-ours-noir.md`, l. 273 à 275 :
   « Un rôti noir dehors peut être cru au milieu. Pas de tartare d'ours, pas d'ours saignant, pas d'ours fumé à froid,
   pas de séché cru. »
   → « Un rôti noir dehors peut être cru au milieu. On ne mange donc jamais l'ours en tartare, saignant, fumé à froid
   ou séché cru. »

4. `chapitres/57-truite-et-omble-au-lac.md`, l. 463 :
   « Rien ne se verra, rien ne se sentira, rien ne se goûtera. »
   → « Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence du poisson. » (le rappel de sécurité dans ses
   mots, une fois)

5. `chapitres/48-lievre-d-amerique.md`, l. 449 à 451 :
   « Ce qu'on perd : tout le reste. Plus de lièvre rôti, plus de lièvre grillé sur la braise, plus de lièvre saisi —
   ce sont exactement les cuissons où la température à cœur est incertaine et où le râble reste rosé. »
   → « Sans thermomètre, on ne fait plus de lièvre rôti, grillé sur la braise ou saisi, parce que ce sont les cuissons
   où on ne peut pas être sûr de la température à cœur et où le râble reste rosé. »

### Motif 8. Le relief : « C'est X qui… », « Ce qui X, c'est Y », « … est ce qui… » (moyenne)

**Ce que c'est.** La phrase se coupe en deux pour mettre un mot en vedette. Une fois, ça souligne ; en série, chaque
phrase a son accent et plus rien ne ressort. À voix haute, on ralentit sur une annonce (« Ce qui reste, et qui ne
s'enlève pas sans ongle ni lame, c'est… ») avant d'arriver au fait.

**Fréquence.** 3,6 pour 1000 mots (environ 57 tournures), contre 0,7 dans les références ; 9,0 % des phrases du lot
commencent par « C'est », « Ce qui » ou « Ce que », contre 1,1 %.

**Cause.** Le skill `ecriture` l'interdit (« Les mots », ligne « "C'est… qui / que" de mise en relief » ; « La
révélation en deux temps »), mais aucun script ne le compte et la passe ne le cherche pas. La règle 2 (« le fait
d'abord, la raison ensuite ») est lue comme « le verdict d'abord ».

**Exemples.**

1. `chapitres/48-lievre-d-amerique.md`, l. 328 à 331 :
   « Un fil à collet fait trois choses : il garde une boucle ouverte tout seul, il coulisse sans plier quand la bête
   entre dedans, et il encaisse le coup sec d'un animal qui part d'un bond. C'est le deuxième point qui décide. Un fil
   qui garde le pli qu'on lui donne ne se referme pas : la boucle se casse en angle, elle reste ovale, et l'animal
   passe. »
   → « Un bon fil à collet garde sa boucle ouverte tout seul, coulisse sans plier quand la bête entre dedans, et
   encaisse le coup sec d'un animal qui part d'un bond. Il doit surtout coulisser sans plier. Un fil qui garde le pli
   qu'on lui donne ne se referme pas, parce que la boucle casse en angle et reste ovale, et l'animal passe. »

2. `chapitres/57-truite-et-omble-au-lac.md`, l. 416 à 418 :
   « Ce qui reste, et qui ne s'enlève pas sans ongle ni lame, c'est la ligne de sang foncée le long de l'arête — et
   c'est elle qui tourne en premier. Méthode pour le poisson du jour, donc, pas pour celui qu'on garde. »
   → « Il reste la ligne de sang foncée le long de l'arête, qu'on ne peut pas enlever sans ongle ni lame, et elle
   tourne avant le reste. On vide donc de cette façon le poisson qu'on mange dans la journée, pas celui qu'on
   garde. »

3. `chapitres/52-ours-noir.md`, l. 151 à 155 :
   « Parer le gras cru de tout ce qui n'est pas gras : membranes, caillots, miettes de viande. Ce sont eux qui
   brunissent, qui donnent le goût et qui abrègent la conservation. […] Plus le morceau est petit, plus le gras sort à
   basse température, et la basse température est ce qui donne un gras blanc et neutre plutôt qu'un gras brun et
   fort. »
   → « Enlever du gras cru tout ce qui n'est pas du gras : les membranes, les caillots et les miettes de viande. Au
   rendu, ils brunissent, donnent du goût et font tourner le gras plus vite. […] Plus les morceaux sont petits, plus
   le gras sort à basse température, et fondu à basse température, il reste blanc et neutre au lieu de brunir et de
   prendre un goût fort. »

4. `chapitres/57-truite-et-omble-au-lac.md`, l. 128 et 129 :
   « Le sang qui reste dans la chair est ce qui prend le goût fort en premier. »
   → « Le sang qui reste dans la chair prend un goût fort avant le reste. »

5. `chapitres/52-ours-noir.md`, l. 144 à 147 :
   « C'est la seule manière que la règle des 74 °C survive à un paquet sorti du congélateur de la maison ou à un pot
   descendu de la tablette du chalet trois ans plus tard, par une personne qui ne sait pas ce qu'elle a dans les
   mains. »
   → « Comme ça, la personne qui sort le paquet du congélateur de la maison, ou qui descend un pot de la tablette du
   chalet trois ans plus tard, sait qu'il faut le cuire à 74 °C, même si elle n'était pas à la chasse. »

### Motif 9. L'incise qui coupe la voix, et ce qui remplacera le tiret (moyenne)

**Ce que c'est.** Une incise s'ouvre au milieu de la phrase (entre tirets, entre virgules ou en longue parenthèse) et
oblige à garder le début en tête pendant un aparté. Le lot porte 133 tirets (8,3 pour 1000 mots), dont la plupart
ouvrent une incise ou un ajout en fin de phrase. Le risque, à la grande passe : remplacer « — » par une virgule ou une
parenthèse, comme le permet la section « Le tiret » du skill, laisse la phrase cassée au même endroit. Pour le tempo,
l'incise sort de la phrase : elle prend sa propre phrase, ou elle saute.

**Fréquence.** 133 tirets (50, 38 et 45) ; 7,0 parenthèses pour 1000 mots (références : 2,4), surtout des renvois
(« ch. 72 », « §9 »).

**Cause.** Le tome 3 n'a pas eu sa passe des tirets. Et la règle qui la guidera (skill `ecriture`, « Le tiret » ;
CLAUDE.md « virgule, deux-points, parenthèses ou point ») donne des remplaçants de ponctuation, sans dire de déplacer
l'incise.

**Exemples.**

1. `chapitres/57-truite-et-omble-au-lac.md`, l. 257 à 259 :
   « Le fil se noue à la pointe, puis se reprend en deux ou trois demi-clés espacées sur le dernier bras de perche :
   quand la pointe casse — et elle casse —, la prise reste tenue par le reste de la perche au lieu de partir avec le
   bout. »
   → « Nouer le fil à la pointe, puis le reprendre par deux ou trois demi-clés espacées sur le dernier bras de la
   perche. La pointe va casser ; quand ça arrive, la prise reste tenue par le reste de la perche au lieu de partir avec
   le bout. »

2. `chapitres/52-ours-noir.md`, l. 470 à 473 :
   « une cocotte qui ferme métal sur métal n'a pas de joint de caoutchouc à perdre, et un régulateur à poids ne dérive
   pas — c'est une masse posée sur un trou —, alors qu'un manomètre à cadran doit se faire vérifier ailleurs, par
   quelqu'un d'autre, avec un appareil qu'on n'a pas. »
   → « Une cocotte qui ferme métal sur métal n'a pas de joint de caoutchouc qu'on pourrait perdre. Un régulateur à
   poids, qui est une simple masse posée sur un trou, ne se dérègle pas ; un manomètre à cadran, lui, doit être vérifié
   ailleurs, par quelqu'un d'autre, avec un appareil qu'on n'a pas. »

3. `chapitres/57-truite-et-omble-au-lac.md`, l. 309 à 311 :
   « Les mâchoires : deux bâtons qui ont déjà la courbe — une branche courbe se trouve plus vite qu'elle ne se cintre
   —, ou deux bandes de fer plat, liées de part et d'autre du manche, écartées au pied et ramenées vers la pointe au
   bout. »
   → « Pour les mâchoires, prendre deux bâtons qui ont déjà la courbe ou deux bandes de fer plat. Une branche courbe
   se trouve plus vite qu'on ne la cintre. Les lier de chaque côté du manche, écartées au pied et ramenées vers la
   pointe au bout. »

4. `chapitres/48-lievre-d-amerique.md`, l. 183 et 184 :
   « Puis retirer les gants, puis seulement laver les mains et les avant-bras au savon — les avant-bras parce que
   c'est la zone qui a frotté l'intérieur de la cage thoracique. »
   → « Retirer ensuite les gants, et seulement après, se laver les mains et les avant-bras au savon. Les avant-bras
   aussi, parce qu'ils ont frotté l'intérieur de la cage thoracique. »

5. `chapitres/52-ours-noir.md`, l. 342 à 345 :
   « Et le multimètre d'atelier : la plupart ont une position température et une sonde à thermocouple — deux fils de
   métaux différents joints bout à bout. Le fil supporte la chaleur du chaudron et du fumoir, la lecture se prend à
   distance, et l'instrument qui sert d'habitude à chercher un court-circuit devient celui qui décide si la viande se
   mange. »
   → « Il y a aussi le multimètre d'atelier : la plupart ont une position température et une sonde à thermocouple,
   faite de deux fils de métaux différents joints bout à bout. Le fil supporte la chaleur du chaudron et du fumoir, et
   on lit la température à distance. » (La fin en image, « devient celui qui décide », sort.)

### Motif 10. Le télégraphe en rafale : des phrases sans verbe, à la suite (basse)

**Ce que c'est.** Dans une étape, après le titre en gras, deux à quatre phrases sans verbe se suivent (« Sonde au
centre de la cuisse, loin de l'os. Une lecture à 2 h, une à 6 h, une à 24 h. »). Le tempo devient saccadé : la voix
pose un objet, s'arrête, pose un autre objet, et le lecteur doit deviner le geste. Une phrase sans verbe isolée,
juste après le verbe de l'étape, passe bien (voir le modèle 4) ; c'est la rafale qui casse le tempo. Les phrases de
6 mots et moins du lot (16,1 %, contre 13,0 %) sont surtout de celles-là, ou des titres d'étape, pas des phrases
courtes qui laissent respirer.

**Fréquence.** Une vingtaine de passages relevés à la lecture, surtout dans les étapes de préparation (ch. 48,
étapes 2 et 9 ; ch. 52, étapes 8 et 9 ; ch. 57, étapes 4 et 10) et dans les « Sans… » de la section 9.

**Cause.** Skill `ecriture`, règle 0 (« Pas une liste de noms qui tient lieu d'actions ») : elle existe, mais la passe
mesure encore les mots coupés (CLAUDE.md règle 5, « Écrire dense ») ; l'ancien format du Matériel (« Objet — glose »)
a déteint sur les étapes.

**Exemples.**

1. `chapitres/52-ours-noir.md`, l. 116 et 117 :
   « Mesurer, pas estimer. Sonde au centre de la cuisse, loin de l'os. Une lecture à 2 h, une à 6 h, une à 24 h. »
   → « Mesurer au lieu d'estimer : piquer la sonde au centre de la cuisse, loin de l'os, et lire la température 2 h,
   6 h et 24 h après la mort. »

2. `chapitres/48-lievre-d-amerique.md`, l. 141 à 145 :
   « Gants imperméables, lunettes, masque et tablier, tous les quatre. Un seau de solution de javel prêt : un volume
   d'eau de Javel pour neuf volumes d'eau. De l'eau et du savon à portée, pas dans l'autre bâtiment. Le chien attaché
   ailleurs : ce qu'il mange aux abats, il le rapporte au chalet (§8). »
   → « Mettre les gants imperméables, les lunettes, le masque et le tablier, les quatre. Préparer un seau de javel
   diluée, un volume d'eau de Javel pour neuf volumes d'eau, et garder de l'eau et du savon à portée de main, pas dans
   l'autre bâtiment. Attacher le chien ailleurs, parce que s'il mange des abats, il rapporte au chalet ce qu'il a
   mangé (section 8). »

3. `chapitres/57-truite-et-omble-au-lac.md`, l. 113 et 114 :
   « Chercher l'eau froide, pas le poisson. Arrivées de ruisseau, sorties de source, fosses, bordures de fond dur, ombre
   des parois. »
   → « Chercher l'eau froide plutôt que le poisson : là où un ruisseau arrive, là où sort une source, dans les fosses,
   le long des fonds durs et à l'ombre des parois. »

4. `chapitres/48-lievre-d-amerique.md`, l. 80 à 82 :
   « Une surface lavable à l'extérieur ou dans un appentis non chauffé, jamais la table de cuisine. Les gants, les
   lunettes, le masque, le savon et la javel rangés ensemble, au même endroit, d'avance. »
   → « Installer une surface qu'on peut laver, dehors ou dans un appentis non chauffé, jamais sur la table de la
   cuisine. Ranger d'avance au même endroit les gants, les lunettes, le masque, le savon et la javel. »

5. `chapitres/52-ours-noir.md`, l. 347 et 348 :
   « Eau à gros bouillons : autour de 100 °C. Verre d'eau bourré de glace fondante : autour de 0 °C. Les deux points
   se prennent le même jour, avec le même geste. »
   → « Pour vérifier une sonde, on la met dans de l'eau à gros bouillons, qui est autour de 100 °C, puis dans un verre
   d'eau bourré de glace qui fond, autour de 0 °C. On prend les deux mesures le même jour, de la même façon. »

6. `chapitres/48-lievre-d-amerique.md`, l. 404 à 406 :
   « Ce que ça coûte : le déclencheur gèle. Neige mouillée, verglas, redoux suivi d'un coup de froid, et les deux
   pièces de bois se soudent ensemble : le montage devient un décor qui ne déclenche plus rien. »
   → « Mais le déclencheur gèle. Avec de la neige mouillée, du verglas ou un redoux suivi d'un coup de froid, les deux
   pièces de bois soudent ensemble, et le collet ne se déclenche plus. »

## 4. Les passages qui marchent, à garder comme modèles

1. `chapitres/52-ours-noir.md`, l. 156 à 166, étapes 19 à 22 (fondre le gras). « Fondre doucement, à feu très bas,
   avec un fond d'eau dans le chaudron au départ pour empêcher le premier gras de coller et de brûler. L'eau part en
   vapeur d'elle-même. » ; « Le bouillonnement fin et continu, c'est l'eau qui s'en va ; quand il cesse et que la
   surface devient calme et claire, l'eau est partie. » ; « Laisser figer sans couvrir, puis couvrir une fois froid.
   Couvrir chaud fait condenser de l'eau sous le couvercle, qui retombe dans le gras. »
   Pourquoi : le geste, puis la raison dite avec « pour » ; une phrase longue, puis une courte qui répond à la
   question qu'on se pose (où va l'eau ?). L'étape 20 se lit comme on parle en regardant le chaudron : ce qu'on voit,
   ce que ça veut dire, « quand » ça change. Les phrases s'enchaînent dans l'ordre du temps.

2. `chapitres/57-truite-et-omble-au-lac.md`, l. 331 à 337 (« Viser sous le poisson »). « On frappe donc sous le
   poisson qu'on voit, d'autant plus bas qu'il est creux. Le remède le plus simple est de se placer au-dessus de
   lui […]. Plus le regard est rasant, plus l'erreur grandit. Le coup s'apprend sur une pierre du fond ou une feuille
   coulée, avant le premier poisson. »
   Pourquoi : le paragraphe avance (ce qu'on voit, pourquoi, « donc » ce qu'on fait, le remède, la nuance, la façon de
   s'exercer) ; le sujet « on » revient ; la dernière phrase est un geste, pas une formule. Un seul deux-points, qui
   annonce une vraie explication.

3. `chapitres/48-lievre-d-amerique.md`, l. 413 à 416 (dépouiller sans couteau). « Pincer la peau au milieu du dos
   entre le pouce et l'index des deux mains, la soulever et l'ouvrir en tirant les deux prises en sens contraire.
   Agrandir le trou en travers jusqu'à faire un anneau complet autour de l'animal. Tirer ensuite les deux moitiés en
   sens opposé, comme deux manches qu'on retourne : la peau sort en deux morceaux, l'arrière avec les pattes, l'avant
   avec la tête. Un couteau, un éclat de pierre ou une dent de scie finissent les pattes et le cou. »
   Pourquoi : un verbe par phrase en tête, les gestes dans l'ordre, « ensuite » qui marque le pas, une comparaison
   qu'on dirait à voix haute et qui montre le geste ; le paragraphe finit sur le dernier geste.

4. `chapitres/57-truite-et-omble-au-lac.md`, l. 124 à 126 (étape 7). « Pour garder : tuer immédiatement. Un coup sec
   et unique sur le dessus de la tête, en arrière des yeux. Un poisson laissé mourir d'asphyxie au fond de la chaloupe
   se débat, chauffe et rougit sa chair. »
   Pourquoi : court, moyen, long ; la phrase sans verbe est seule et répond à « comment ? » juste après le verbe ; la
   dernière porte trois verbes qui se suivent comme ce qu'on voit arriver. Rien à retirer, rien à deviner.

5. `chapitres/57-truite-et-omble-au-lac.md`, l. 264 à 268 (« La ligne à main »). « Ça se lance en faisant tourner le
   leurre au bout d'un bras de fil, et ça se ramène à la main, le fil retombant en boucles lâches aux pieds. Le fil se
   pince entre le pouce et l'index, jamais enroulé autour d'un doigt : un touladi qui plonge referme la boucle sur la
   phalange et ne la rouvre pas. »
   Pourquoi : le « ça » de tous les jours ; le « , et » relie deux temps du même geste (lancer, ramener), pas un fait
   neuf, et c'est la bonne façon de s'en servir (comparer au motif 3) ; l'avertissement suit le geste, avec son
   mécanisme. (Les tournures pronominales « se lance », « se pince » relèvent d'un autre regard.)

## 5. Pistes pour les règles et pour l'auditeur du tempo

Du seul point de vue du tempo, pour la réécriture du skill `ecriture` :

1. **Mesurer le moule, pas la longueur.** Le lot a la longueur des références ; ce qui le sépare, ce sont les
   deux-points, les « …, et » qui relancent, le balancier, le relief et l'attaque nominale. `tempo.py` pourrait compter :
   les phrases « …, et » suivi d'un nouveau sujet ; le balancier (« , pas un/une/le… », « n'est pas…, c'est ») ; la
   mise en relief (« c'est X qui », « ce qui X, c'est ») ; l'attaque (déterminant, pronom, lien) ; et donner à côté
   la valeur des références.
2. **Le paragraphe avance.** Chaque phrase se raccroche à la précédente (un pronom, « alors », « parce que »,
   « quand », « ensuite ») ; un deux-points par paragraphe au plus, et seulement pour annoncer une vraie explication
   ou une liste ; le paragraphe finit sur son dernier geste ou son dernier fait utile.
3. **Une phrase finit où son fait finit.** Un second fait prend sa phrase, ou un lien qui dit le rapport (« alors »,
   « parce que », « mais ») ; jamais « , et » plus un nouveau sujet pour un fait qui n'a rien à voir.
4. **Remplacer un tiret, c'est déplacer l'incise**, pas changer la ponctuation : la section « Le tiret » du skill
   devrait le dire, avant la grande passe du tome 3 (133 tirets dans le lot).
5. **« En une ligne » en deux phrases au plus** : la consigne « Une phrase. Pas deux. » du gabarit produit les trois
   phrases-entrepôts de 53 à 61 mots du lot.
6. **Le skill `editeur` ne demande plus de phrases courtes « percutantes »** : c'est la porte de la chute en formule.
7. **L'auditeur du tempo** lit chaque paragraphe à voix haute et marque, dans cet ordre : le deux-points en série, la
   phrase qui repart après sa fin, la phrase-entrepôt, le balancier, la chute, la série oratoire, le relief, l'incise,
   la rafale sans verbe. Il ne réécrit pas ; il montre la ligne et le moule.

## 6. Liste de contrôle (cadre, lignes qui touchent l'écriture et la langue)

Pour tout agent
- [x] Un agent par sujet : un lot de trois chapitres, un seul regard.
- [x] Lire seulement ce que la tâche touche : les trois chapitres, le cadre, le skill `ecriture`, les mesures, les
  demandes de JP ; le reste par grep.
- [x] Sorties de commande coupées.
- [x] Rapport court qui ne recopie pas le texte : seulement les citations demandées pour les exemples.
- [x] Ne rien commiter ; aucun fichier existant modifié.

Le texte (appliqué aux réécritures ; l'état du lot est noté)
- [ ] Sept sections : le lot est encore à l'ancien gabarit (neuf sections) ; hors regard.
- [x] Règle 0, chaque phrase se comprend à voix haute : les réécritures ont un verbe et un sujet ; le lot manque à
  cette règle aux motifs 2 et 10.
- [x] Pas de loi en formule ni de paragraphe en paraboles : réécritures liées ; le lot en a (motif 2).
- [x] Pas de maxime, de chute, d'opposition fabriquée, d'image : réécritures ; le lot en a (motifs 5 et 6).
- [x] Pas de chose qui pense : réécritures ; le lot en garde (« la règle des 74 °C ne connaît pas les saisons »,
  ch. 52, l. 38 ; « la cuisse décide », ch. 48, l. 205), hors regard.
- [x] Consigne jamais au pronominal : réécritures à l'infinitif ou avec « on » ; le lot en a beaucoup, hors regard.
- [x] Consigne dite comme une consigne, sujet nommé, ordre naturel : réécritures.
- [ ] Points de contrôle et signes d'échec à 8 lignes : le lot en a de 10 à 13 ; hors regard.
- [x] Un passage lourd se juge d'abord : plusieurs réécritures sont des coupes (motifs 5 et 6).
- [x] Le mot qu'on dit : « fait l'affaire », « ça tue », « on le remet », « se trompe de plusieurs degrés ».
- [x] Aucun tiret, « section N » et jamais « § » : réécritures ; le lot a 133 tirets et des « § ».
- [x] Inventaire des faits : aucune réécriture n'ajoute un fait ni un chiffre ; les coupes ne perdent rien qui ne soit
  dit ailleurs dans le chapitre.
- [ ] `controle.py` : non lancé, aucun chapitre n'a été modifié.

La langue
- [x] Français écrit correct, sans joual ni anglicisme, dans les réécritures (relues règle par règle : accords,
  « qui / que », participes).
- [x] `langue.py` lancé (avec LanguageTool) sur les réécritures extraites : 13 avis jugés. Corrigés : deux subjonctifs
  après « le seul », « la seule » (« qui puisse », « dont chaque bouchée doive »), un « ou » dans un « ou », une
  virgule devant « ou ». Les autres sont de faux avis (« touladi », « VFI », « Mieux vaut », « tout seul », « gelée »
  qui s'accorde avec « larve »). Les notes ne s'impriment pas ; une réécriture reprise dans un chapitre repasse par le
  correcteur.
