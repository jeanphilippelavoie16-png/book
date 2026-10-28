# Audit de l'écriture : la consigne, lot D (tome 3)

28 octobre 2026. Un seul regard : la consigne. Qui fait quoi, quand, dans quel ordre ; un geste par phrase ou une étape
qui en entasse cinq ; la condition avant ou après le geste ; le pourquoi qui aide ou qui alourdit ; le chiffre à sa
place ; une étape qu'on suit les mains occupées, à la lampe frontale ; les séries orange, les tableaux Points de
contrôle et Signes d'échec, les lignes de Matériel, les titres de « Quand l'utiliser ».

Lot, lu au complet : `chapitres/48-lievre-d-amerique.md`, `chapitres/52-ours-noir.md`,
`chapitres/57-truite-et-omble-au-lac.md`. Aucun fichier du livre n'a été modifié. Les citations sont mot pour mot (la
mise en gras est retirée) ; les numéros de ligne sont ceux des fichiers au 28 octobre. Les réécritures sont des
exemples, sans fait ni chiffre neuf : quand une réécriture demanderait un fait que le chapitre n'a pas, la place est
marquée entre crochets pour le rédacteur, avec sa source.

Les trois chapitres sont encore au gabarit à neuf sections (« Pourquoi ça marche », section 8 « DANGER », « § »). Le
tome 3 n'est pas passé à la grande passe. Dans les réécritures, « variante d'urgence » remplace « §9 » pour ne pas
dépendre de la numérotation.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 48 | 5670 | 308 | 18,4 | 0,67 | 19,5 | 17,5 | 20,5 | 34,4 | 26,0 | 3,4 | 6,5 | 6,3 | 4,2 |
| ch. 52 | 4850 | 245 | 19,8 | 0,71 | 12,7 | 20,8 | 18,9 | 29,8 | 23,7 | 5,4 | 9,1 | 6,6 | 4,9 |
| ch. 57 | 5447 | 273 | 20,0 | 0,66 | 15,4 | 21,2 | 14,7 | 28,9 | 25,3 | 3,1 | 5,7 | 5,5 | 6,2 |
| le lot | 15967 | 826 | 19,3 | 0,68 | 16,1 | 19,7 | 18,1 | 31,2 | 25,1 | 3,9 | 7,0 | 6,1 | 5,1 |

### Le même script, section par section

Extraits faits dans le scratchpad : la section 2, la procédure (section 5) et la variante d'urgence (section 9) de
chaque chapitre.

| texte | mots | m/phr | ≤6 % | ≥30 % | « : » % | fait:csq % | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 48, section 2 | 312 | 22,3 | 0,0 | 28,6 | **57,1** | **50,0** | **0,0** | **30,8** |
| ch. 52, section 2 | 361 | **27,8** | 0,0 | **38,5** | 30,8 | 23,1 | 8,3 | 8,3 |
| ch. 57, section 2 | 380 | 13,6 | 21,4 | 0,0 | 25,0 | 14,3 | 0,0 | 0,0 |
| ch. 48, procédure | 1943 | 16,6 | 23,9 | 16,2 | 29,9 | 24,8 | 9,3 | 0,0 |
| ch. 52, procédure | 1337 | 16,5 | 9,9 | 12,3 | 21,0 | 17,3 | 5,2 | 1,2 |
| ch. 57, procédure | 885 | 19,7 | 11,1 | 22,2 | 26,7 | 20,0 | 2,3 | 2,3 |
| ch. 48, variante | 2608 | 19,6 | 16,5 | 15,8 | 35,3 | 24,8 | 6,1 | 3,8 |
| ch. 52, variante | 2064 | 20,6 | 15,0 | 23,0 | 34,0 | 28,0 | 8,2 | 9,1 |
| ch. 57, variante | 3325 | **21,2** | 15,3 | **24,8** | 29,9 | **28,7** | 6,6 | 9,0 |

### La consigne, comptée

Compté avec un petit script (scratchpad, `consigne.py`) et à la lecture.

| | ch. 48 | ch. 52 | ch. 57 | la règle |
| --- | --- | --- | --- | --- |
| Étapes numérotées | 18 | 31 | 13 | |
| Mots par étape, en moyenne | **106** | 45 | 51 | |
| Phrases par étape, en moyenne | **6,1** | 3,6 | 3,6 | |
| Étapes de plus de 80 mots | **13 sur 18** | 1 | 1 (l'étape 12 : 141 mots) | sous-étapes (cadre) |
| Lignes de Points de contrôle | **12** | **11** | **13** | 5 à 8 |
| Lignes de Signes d'échec | **10** | **11**, plus 2 paragraphes | 8 | 5 à 8 |
| Section 2 : titres de situation | 0 (deux paragraphes) | 0 (quatre paragraphes et un tableau) | 0 (13 lignes justifiées, dont 7 « mauvais choix ») | des titres courts |
| Consignes au pronominal, à la lecture | environ 26 | environ 30 | environ 40 | aucune |
| Citations « » dans les étapes | 14, dans 8 étapes sur 18 | 2 étapes | 3, dans 2 étapes | aucune |
| Lignes de Matériel avec tiret | 5 sur 5 | 3 sur 3 | 4 sur 4 | aucune |
| Montages en prose continue (variante) | le verrou : 443 mots | | la foène : 255 mots | sous-étapes |

### Ce que les chiffres disent

- **Le défaut des étapes du ch. 48 n'est pas la longueur de la phrase.** Sa procédure a les phrases les plus courtes du
  lot (16,6 mots, 24 % de 6 mots et moins) et les étapes les plus longues (106 mots, six phrases). Chaque étape porte
  le geste, une citation de source, le mécanisme, un cas particulier et un renvoi : le lecteur qui a un lièvre dans
  les mains ne retrouve pas le geste suivant. Le ch. 52, avec des étapes de 45 mots, se suit le mieux du lot.
- **La variante d'urgence a le tempo le plus lent du lot** (20 à 21 mots par phrase, une phrase sur quatre de 30 mots
  et plus au ch. 57) et près des deux tiers des consignes au pronominal. Elle est écrite comme un traité de
  savoir-faire (« Le fil se noue à la pointe, puis se reprend… »), pas comme une suite de gestes.
- **La section 2 du ch. 48 a le tic du paragraphe du monoxyde, à l'état pur** : la moitié des phrases en « fait :
  conséquence », aucun mot de liaison, et une phrase sur trois qui commence comme la précédente (« Quand… »,
  « Jamais… »).
- **Le tempo d'une consigne qui marche, dans ce lot**, est toujours le même : la condition, le geste, où et comment, ce
  qu'on voit quand c'est fait, puis le pourquoi en une phrase. Les passages de la section 3 ont tous cet ordre. Les
  passages ratés l'inversent : le fait, la citation, le geste au pronominal, puis une maxime.
- **Le script de contrôle ne voit pas la moitié de mon regard.** `controle.py` n'a aucune section « pronominal » (0 avis
  sur une centaine de cas) alors que le cadre demande de juger « chaque avis "tournure", "maxime", "pronominal" » ; il
  relève 1, 4 et 2 maximes là où la lecture en trouve une vingtaine ; il ne compte ni les lignes des tableaux, ni la
  longueur des étapes, ni les citations dans les étapes.

## 2. Les défauts, du plus grave au moins grave

### 1. L'étape qui entasse les gestes (haute)

**Le défaut.** Une étape numérotée porte cinq à huit phrases : plusieurs gestes, une branche « si », le pourquoi, un
renvoi, parfois une citation. Ou bien l'étape n'a plus de verbe : une liste d'états (« Poisson couché sur le flanc,
cavité vers le bas… ») que le lecteur doit retourner en gestes. Les montages de la variante d'urgence (le verrou, la
foène) sont en prose continue : trois gestes par phrase, séparés par des points-virgules.

**Fréquence.** Ch. 48 : 13 étapes sur 18 au-dessus de 80 mots (l'étape 18 : 181 mots ; les étapes 7 et 13 : 166).
Ch. 57 : l'étape 12 (141 mots, quatre destinations, huit chiffres) et l'étape 11 (aucun verbe). Ch. 52 : l'étape 1
(87 mots). Variante : le verrou du ch. 48 (443 mots), la foène du ch. 57 (255 mots).

**La cause.** Le cadre (`.claude/cadre-agents.md`, « La procédure ») : « Une étape qui a plusieurs gestes se découpe en
sous-étapes : le geste, où est la chose et comment la reconnaître, ce qu'on voit quand c'est fait ». Le skill
`ecriture` le dit aussi (tableau, ligne « La procédure tassée dans une étape »). Mais le gabarit, section 5, ne dit
que « Étapes numérotées », sans longueur ni forme. L'habitude : le rédacteur range dans l'étape tout ce qu'il sait du
geste, au lieu de séparer le geste du savoir.

**Exemples.**

- `chapitres/48-lievre-d-amerique.md`, l. 181 à 187 (étape 14) : « Laver la surface de travail au savon puis au
  désinfectant à l'hypochlorite de sodium, un volume de javel pour neuf volumes d'eau. Passer les couteaux et le
  crochet dans la même solution. Puis retirer les gants, puis seulement laver les mains et les avant-bras au savon —
  les avant-bras parce que c'est la zone qui a frotté l'intérieur de la cage thoracique. En cas de contact cutané avec
  un animal suspect, la consigne est plus longue : nettoyer la région à l'eau courante et au savon pendant au moins dix
  minutes, puis surveiller pendant trois semaines : la tularémie peut suivre (§9). »
  Réécriture :
  « 14. Nettoyer dans cet ordre, et retirer les gants en dernier.
  a. Laver la surface de travail au savon, puis avec la javel du seau (étape 9).
  b. Passer les couteaux et le crochet dans la même solution.
  c. Retirer les gants.
  d. Laver au savon les mains et les avant-bras : les avant-bras ont frotté l'intérieur de la cage thoracique.
  e. Si la peau a touché un animal suspect, laver l'endroit à l'eau courante et au savon pendant au moins 10 minutes,
  puis surveiller pendant trois semaines (étape 18). »

- `chapitres/57-truite-et-omble-au-lac.md`, l. 139 à 142 (étape 11) : « Au froid, immédiatement. Poisson couché sur le
  flanc, cavité vers le bas, enrobé de glace et non posé dessus, dans une glacière fermée, à l'ombre, avec un bouchon
  de vidange ouvert pour que l'eau de fonte s'écoule. Le poisson qui baigne dans son eau de fonte se délave et perd sa
  tenue. »
  Réécriture :
  « 11. Mettre le poisson au froid tout de suite.
  a. Le coucher sur le flanc, la cavité vers le bas.
  b. L'enrober de glace, au lieu de le poser dessus.
  c. Fermer la glacière, la mettre à l'ombre et ouvrir le bouchon de vidange : l'eau de fonte doit s'écouler, sinon le
  poisson baigne dedans, se délave et perd sa tenue. »

- `chapitres/57-truite-et-omble-au-lac.md`, l. 143 à 147 (étape 12) : « Trier à l'arrivée selon la destination, et pas
  selon la taille : ce qui se mange bientôt reste au frigo à 0 à 4 °C, et pas plus de 1 à 2 jours cru, 5 à 7 jours une
  fois cuit ; ce qui passe l'hiver descend à -18 °C ou moins, où la durée ne change plus la salubrité, seulement le
  goût ; ce qui s'en va au sel ou au fumoir part tout de suite vers le ch. 76 ou le ch. 77, pas le lendemain. »
  Réécriture :
  « 12. À l'arrivée, trier le poisson selon ce qu'on va en faire, pas selon sa taille.
  a. À manger bientôt : au frigo, entre 0 et 4 °C, 1 à 2 jours au plus s'il est cru, 5 à 7 jours une fois cuit.
  b. Pour l'hiver : au congélateur, à -18 °C ou moins. Le temps y change le goût, pas la salubrité.
  c. Pour le sel ou le fumoir : le préparer tout de suite, pas le lendemain (ch. 76 pour le sel, ch. 77 pour le
  fumoir).
  d. Pour le manger cru, ou le fumer sans atteindre 70 °C à cœur : le congeler d'abord contre les parasites. Il faut
  7 jours au moins à -20 °C, ou 15 heures au moins à -35 °C. Un congélateur à -18 °C n'y arrive pas : vérifier au
  thermomètre. »

- `chapitres/48-lievre-d-amerique.md`, l. 365 à 368 (le verrou de fortune) : « Le montage décide de tout. Passer le bout
  du fil dans le trou d'arrêt, de l'intérieur de l'équerre vers l'extérieur, et l'enrouler sur lui-même juste derrière
  la tôle, côté extérieur, tours serrés et jointifs, jusqu'à ce qu'il ne puisse plus ressortir ; plier le fil d'équerre
  au ras de cet arrêt, contre la face intérieure. »
  Réécriture (la première phrase sort) :
  « a. Passer le bout du fil dans le trou d'arrêt, de l'intérieur de l'équerre vers l'extérieur.
  b. L'enrouler sur lui-même juste derrière la tôle, côté extérieur, en tours serrés et jointifs, jusqu'à ce qu'il ne
  puisse plus ressortir.
  c. Plier le fil d'équerre au ras de cet arrêt, contre la face intérieure. »
  Tout le verrou (l. 357 à 386) se monte ainsi : découper la tôle, percer les deux trous, plier d'équerre, arrêter le
  bout, passer l'autre bout, essayer. Le paragraphe « Pourquoi ce sens-là » (l. 375 à 378) vient après l'essai, en
  une ou deux phrases, ou il sort.

- `chapitres/52-ours-noir.md`, l. 87 à 90 (étape 1) : « Rester en retrait, arme chargée et pointée dans une direction
  sûre, observer la cage thoracique et l'œil. Un œil ouvert et vitreux, sans clignement, et une cage immobile pendant une
  longue observation avant d'approcher. Approcher par l'arrière, jamais par la tête. »
  Réécriture : « Rester en retrait, l'arme chargée et pointée dans une direction sûre. Observer longtemps l'œil et la
  cage thoracique avant d'approcher : l'œil doit rester ouvert et vitreux, sans cligner, et la cage, immobile. Ensuite
  seulement, approcher par l'arrière, jamais par la tête. »

### 2. La consigne au pronominal (haute)

**Le défaut.** Le geste est dit comme si la chose le faisait toute seule : personne ne le fait. C'est la forme de
consigne la plus fréquente du lot, surtout dans les variantes d'urgence, où elle donne le ton d'un traité.

**Fréquence.** Environ 95 consignes au pronominal à la lecture (26 au ch. 48, 30 au ch. 52, 40 au ch. 57), dont près
des deux tiers dans les variantes d'urgence (plus de 30 sur 40 au ch. 57). Les cas où la chose le fait vraiment toute seule
(« la boucle doit se fermer », « le gant se perce ») sont exclus du compte. `controle.py` : 0 avis, il n'a pas de
section pour ça.

**La cause.** `CLAUDE.md` : « Jamais au pronominal quand quelqu'un fait le geste » ; `plan/decisions-jp.md`, l. 290 :
« Ni au pronominal (JP, 16 octobre 2026, « très important pour le livre ») ». Le cadre suppose un avis « pronominal »
du script, qui n'existe pas : rien ne rattrape le cas. L'habitude : la variante d'urgence décrit une technique (« le
fil se noue ») au lieu de donner les gestes.

**Exemples.**

- `chapitres/48-lievre-d-amerique.md`, l. 77 et 78 : « Chaque collet se ferme, puis se tire pour se rouvrir, avant de
  partir : la boucle doit se fermer sans accrocher et ne pas se rouvrir d'elle-même. »
  Réécriture : « Avant de partir, fermer chaque collet, puis tirer pour le rouvrir : la boucle doit se fermer sans
  accrocher et ne pas se rouvrir d'elle-même. »
- `chapitres/48-lievre-d-amerique.md`, l. 112 : « Les gants se mettent sur des mains sèches, avant de se pencher. »
  Réécriture : « Mettre les gants sur des mains sèches, avant de se pencher sur le collet. »
- `chapitres/52-ours-noir.md`, l. 113 et 114 : « Dès que la bête est à l'abri des mouches et de la poussière, la peau et
  sa couche de gras s'enlèvent, et le refroidissement reprend son cours normal. »
  Réécriture : « Dès que la bête est à l'abri des mouches et de la poussière, enlever la peau et la couche de gras : la
  viande se remet alors à refroidir normalement. »
- `chapitres/52-ours-noir.md`, l. 209 (Points de contrôle, case « Si c'est hors cible ») : « Manquée : la filière
  conserve est fermée. La viande se cuit et se mange, ou se jette. Voir ch. 66 »
  Réécriture : « Au-dessus de 7 °C : ne pas mettre la viande en conserve. La cuire et la manger, ou la jeter (ch. 66). »
- `chapitres/57-truite-et-omble-au-lac.md`, l. 257 et 258 : « Le fil se noue à la pointe, puis se reprend en deux ou
  trois demi-clés espacées sur le dernier bras de perche »
  Réécriture : « Nouer le fil à la pointe, puis le reprendre en deux ou trois demi-clés espacées sur le dernier bras de
  perche »
- `chapitres/57-truite-et-omble-au-lac.md`, l. 357 et 358 : « on ne frappe que ce qu'on garde, et un poisson piqué ne
  va pas au vivier — il se saigne et se vide dans la minute. »
  Réécriture : « on ne frappe que ce qu'on garde. Un poisson piqué ne va pas au vivier : le saigner et le vider dans la
  minute. »

### 3. « Quand l'utiliser » écrit en paragraphes de justification (haute)

**Le défaut.** Aucun des trois chapitres n'a un seul titre de situation. Le ch. 48 a deux paragraphes, « le bon choix »
et « pas le bon choix », chaque situation suivie de sa raison ; le ch. 52 parle de lui-même (« Ce chapitre
s'applique », « Ce chapitre ferme des portes ») et pose un tableau de verdicts ; le ch. 57 a deux listes, dont une
« mauvais choix » de sept lignes, chacune justifiée.

**Fréquence.** Les trois chapitres. Ch. 48 : 312 mots, la moitié des phrases en « fait : conséquence », aucune
liaison, 31 % des phrases qui commencent comme la précédente. Ch. 52 : 361 mots, 27,8 mots par phrase. Ch. 57 :
13 lignes, toutes justifiées.

**La cause.** `CLAUDE.md` : « « Quand l'utiliser », c'est juste quand l'utiliser : pas de liste « c'est la mauvaise
procédure quand », pas de contre-exemple évident. Chaque ligne est un titre de situation, court » ; gabarit, section
2 ; skill `ecriture`, règle 13. Les chapitres sont d'avant ces règles (JP, 15 et 28 octobre 2026).

**Exemples.**

- `chapitres/48-lievre-d-amerique.md`, l. 21 et 22 : « Quand le lièvre est le bon choix. En janvier et en février,
  quand l'orignal de l'automne est entamé et que rien de frais n'entre plus. »
  Réécriture : « Plus de viande fraîche en janvier ou en février »
- `chapitres/48-lievre-d-amerique.md`, l. 30 et 31 : « Quand ce n'est pas le bon choix. Jamais comme aliment unique,
  même pour une semaine : la section 8 dit pourquoi, et le chapitre 19 le dit en entier. »
  Réécriture : la ligne sort de la section 2 ; l'étape 17 le dit, au moment de servir.
- `chapitres/52-ours-noir.md`, l. 23 à 25 : « Ce chapitre s'applique à tout ours noir abattu et récupéré. Il s'applique
  intégralement à un ours tiré en défense d'une personne ou d'un bien, parce que la viande et le gras d'une bête abattue
  par nécessité ont exactement la même valeur alimentaire et exactement le même parasite. »
  Réécriture : « Ours noir abattu et récupéré, à la chasse ou pour se défendre »
- `chapitres/52-ours-noir.md`, l. 25 à 27 : « Il s'applique surtout à l'ours d'automne, celui qui a passé l'été à manger
  et qui porte la couche de gras que le chapitre 19 cherche désespérément en février. »
  Réécriture : « Ours d'automne, avec sa couche de gras »
- `chapitres/57-truite-et-omble-au-lac.md`, l. 20 et 21 : « Le chalet a besoin de protéine fraîche à intervalles courts
  sans entamer le stock permanent (ch. 5). Un lac se repêche ; un orignal ne se retue pas. »
  Réécriture : « Poisson frais souvent, sans toucher au stock du chalet »
- `chapitres/57-truite-et-omble-au-lac.md`, l. 35 et 36 : « Il n'y a pas un vêtement de flottaison individuel porté par
  personne à bord, enfants compris. Pas «à bord » : porté. Voir l'encadré DANGER. »
  Réécriture : la ligne sort ; le Matériel et l'étape 3 le disent là où on le fait.

**La section 2 proposée, titres seulement, faits du chapitre.**
- Ch. 48 : « Plus de viande fraîche en janvier ou en février » ; « Munitions à ménager » ; « Un repas de viande
  fraîche, sans débiter un orignal » ; « Année de lièvres : des sentiers battus partout dans le bois ».
- Ch. 52 : « Ours noir abattu et récupéré, à la chasse ou pour se défendre » ; « Ours d'automne, avec sa couche de
  gras » ; « Ours du printemps : la viande seulement, sans gras à fondre ». Le tableau des verdicts (l. 43 à 52) va
  dans « Conserver la viande », où il remplace les étapes 25 à 31 (défaut 6).
- Ch. 57 : « Poisson frais souvent, sans toucher au stock du chalet » ; « Rien pour garder au froid : on mange la prise
  du jour » ; « Du monde pour pêcher, pas de carburant » ; « Sortie de pêche avec les enfants » ; « Du poisson en
  quantité pour le sel ou le fumoir ». Hors de mon regard, pour le vérificateur : la ligne « La viande disponible est
  maigre et l'hiver est long » (l. 30) renvoie à la section 3, qui dit que la truite est maigre aussi.

### 4. Points de contrôle et Signes d'échec : trop de lignes, et des lignes qui redisent les étapes (haute)

**Le défaut.** Les tableaux ont une ligne par étape plutôt qu'une ligne par décision. Environ la moitié des lignes
redisent une étape ou un rappel ; certaines cases « Si c'est hors cible » finissent sur une maxime au lieu de dire quoi
faire.

**Fréquence.** Ch. 48 : 12 et 10 lignes. Ch. 52 : 11 et 11, plus deux paragraphes sous le tableau (l. 237 à 245).
Ch. 57 : 13 et 8. La règle : 5 à 8 chacun.

**La cause.** Gabarit, sections 6 et 7, et skill `editeur` (l. 46 et 47) : « 5 à 8 lignes au plus. Seulement les
moments où une mesure change une décision » (JP, 28 octobre 2026 : « personne va lire 50 points de contrôle »). Les
tableaux sont d'avant la règle.

**Exemples.**

- `chapitres/48-lievre-d-amerique.md`, l. 246 : « Avant dépouillement | Fourrure humectée | Poil mouillé sur toute la
  surface travaillée | Ne pas commencer à sec : l'inhalation est une des cinq voies »
  Réécriture : la ligne sort ; c'est l'étape 10.
- `chapitres/48-lievre-d-amerique.md`, l. 243 : « Avant de sortir | Gants, lunettes, masque, savon, javel à la station |
  2 paires de gants par séance | Ne pas relever la ligne. Un lièvre au collet attendra mieux qu'une station
  improvisée »
  Réécriture : la ligne sort (étapes 2 et 9) ; « 2 paires de gants » va dans l'étape 9 (défaut 10).
- `chapitres/52-ours-noir.md`, l. 214 et 215 : « À chaque cuisson, sans exception | Sonde au point le plus épais, loin
  de l'os | 74 °C à cœur | En dessous : remettre à cuire. Il n'y a pas d'autre option » et « Haché et saucisses | Sonde
  au centre de la masse | 74 °C | Remettre à cuire »
  Réécriture, une seule ligne : « À chaque cuisson, haché et saucisses compris | Sonde au point le plus épais, loin de
  l'os, ou au centre de la masse | 74 °C à cœur | En dessous : remettre à cuire »
- `chapitres/57-truite-et-omble-au-lac.md`, l. 165 : « Avant de partir | Thermomètre à sonde dans l'eau et la glace
  fondante | 0 °C, écart toléré ± 1 °C | Hors tolérance : il sort du chalet. Un thermomètre faux est pire qu'aucun »
  Réécriture : « Avant de partir | Thermomètre à sonde dans l'eau et la glace fondante | 0 °C, à 1 °C près | S'il
  s'écarte de plus de 1 °C, le laisser au chalet ; sans thermomètre juste, on mange dans la journée tout ce qu'on
  prend »
- `chapitres/57-truite-et-omble-au-lac.md`, l. 169 : « Fin de pêche | Éviscération faite | Tous les poissons gardés |
  Non faite : ils passent avant le rangement, avant le dîner, avant tout »
  Réécriture : la ligne sort ; c'est l'étape 9.

**Les lignes à garder, proposées.**
- Ch. 48, Points de contrôle (6) : avant de toucher (les mains) ; au collet (l'animal) ; à l'éviscération (les points
  blancs) ; premières 24 h (7 °C) ; à la cuisson (74 °C, cuisse arrière) ; trois semaines après. Signes d'échec (7) :
  les points blancs, les organes gros et pâles et les granules en une seule ligne ; mort au collet depuis plusieurs
  jours ; mort hors du collet ; vivant, faible, qui se laisse approcher ; râble rosé ; fièvre ou ulcère dans les trois
  semaines, en une ligne ; perte de poids en hiver de lièvre.
- Ch. 52, Points de contrôle (7) : 2 h ; 24 h ; fin du rendu ; gras figé, 24 h après ; chaque cuisson, haché compris ;
  sortie du fumoir ; pot de conserve, 24 h après. Les paragraphes sous les Signes d'échec (l. 237 à 245) entrent dans
  les étapes ou sortent (défaut 9).
- Ch. 57, Points de contrôle (6) : le thermomètre avant de partir ; moins de 15 secondes hors de l'eau ; la glacière à
  0 à 4 °C ; le poisson fumé sous 3 °C ; la cuisson à 70 °C ; le touladi à 2 repas par mois.

### 5. La consigne donnée en citation d'institution (moyenne)

**Le défaut.** L'étape ne donne pas la consigne : elle cite un organisme, entre guillemets, au vouvoiement ou avec « il
est recommandé de ». La consigne se trouve dite deux ou trois fois (le titre de l'étape, la citation, puis « en
clair »), et chaque fois dans une autre voix que celle du livre. « Il est recommandé » affaiblit un geste qui protège
la vie.

**Fréquence.** Ch. 48 : 14 citations dans 8 étapes sur 18 (22 dans le chapitre). Ch. 52 : 2 étapes (14 dans le
chapitre). Ch. 57 : 2 étapes (22 dans le chapitre, dont 7 dans le tableau 5-A).

**La cause.** Skill `ecriture`, « Les guillemets » : « Pas de citation de source : la provenance vit dans `suivi/`,
jamais dans le texte » ; `CLAUDE.md`, règle 1 : « La provenance ne s'imprime pas » ; le cadre : « La source sert à
vérifier un fait, jamais à copier une forme. » L'habitude : le rédacteur colle la source pour prouver le fait.

**Exemples.**

- `chapitres/48-lievre-d-amerique.md`, l. 147 à 151 (étape 10) : « C'est la consigne la moins connue et l'une des plus
  importantes : «il est également recommandé de mouiller la fourrure avant toute manipulation afin de minimiser
  l'aérosolisation des bactéries ». Le mécanisme, en clair : «Humectez la fourrure avant d'éviscérer l'animal de façon
  à diminuer la quantité de poussière. » »
  Réécriture : « 10. Mouiller la fourrure avant d'y toucher. Une fourrure sèche qu'on tire et qu'on coupe lance de la
  poussière chargée de bactéries, et on la respire. De la neige fondue dans la main suffit. »
- `chapitres/48-lievre-d-amerique.md`, l. 131 à 134 (étape 8) : « Rapporter le lièvre entier, non dépouillé, à
  l'extérieur du corps. «Attendez d'être sorti de la forêt pour dépouiller ou faire dépouiller votre gibier, car la
  peau protège la viande des contaminants. » La peau est un emballage. Elle reste en place jusqu'à la station de
  préparation. »
  Réécriture : « 8. Rapporter le lièvre entier, avec sa peau, pendu à l'extérieur du sac ou du manteau. Ne pas le
  dépouiller avant la station de préparation : la peau protège la viande de la contamination. »
- `chapitres/48-lievre-d-amerique.md`, l. 174 à 176 (étape 13) : « La consigne qui suit est sans nuance : «il est
  recommandé de ne pas consommer la viande de tout animal présentant des points blancs sur le foie ou la rate et de le
  soumettre à un laboratoire ». Pas «parer autour », pas «bien cuire » : ne pas consommer. »
  Réécriture : « S'il y a des points blancs sur le foie ou la rate, ne pas manger l'animal, même en coupant autour,
  même bien cuit. »
- `chapitres/52-ours-noir.md`, l. 96 et 97 (étape 3) : « Éviscérer immédiatement. «L'éviscération ou retrait des
  organes internes tels le cœur, le foie, l'estomac et les intestins, doit se faire immédiatement après la mort de
  l'animal ». Le geste complet est au ch. 61 et ne change pas pour l'ours. »
  Réécriture : « 3. Éviscérer tout de suite après la mort. Le geste est au ch. 61 et ne change pas pour l'ours. »
- `chapitres/57-truite-et-omble-au-lac.md`, l. 120 à 123 (étape 6) : « Pour remettre : se rincer les mains avant de
  toucher le poisson, «afin de préserver la couche protectrice de mucus sur son corps » — une main sèche arrache cette
  barrière par friction. Retirer l'hameçon avec les pinces ; «s'il est trop profondément engagé, coupez la ligne au
  plus près de l'hameçon ». »
  Réécriture : « 6. Pour remettre le poisson à l'eau, se rincer les mains avant de le toucher : une main sèche arrache
  le mucus qui le protège. Retirer l'hameçon avec les pinces ; s'il est trop enfoncé, couper la ligne au plus près de
  l'hameçon. »

### 6. Le titre de l'étape n'est pas le geste, ou l'étape est un verdict (moyenne)

**Le défaut.** Le titre en gras dit autre chose que le geste : un commentaire (« Conséquence pratique, qui contredit en
partie le ch. 61 »), un nom (« Congélation à -18 °C ou moins »), un verdict (« Fumage à chaud : autorisé »), une phrase
sur l'étape (« c'est l'étape qu'on ne saute jamais »). Le geste, s'il y en a un, est enterré dans la troisième phrase.
Au ch. 52, les étapes 25 à 31 ne sont pas des gestes : c'est le tableau des verdicts de la section 2 (l. 43 à 52)
redit en sept paragraphes numérotés, avec des phrases sur le livre (« la voie recommandée par ce chapitre », « Le livre
ne donne jamais de quantité de salpêtre »).

**Fréquence.** Ch. 52 : 8 étapes sur 31 (7, 24 à 26, 28 à 31, plus le titre de section « Refroidir — le point où
l'ours diffère d'un cervidé »). Ch. 48 : 4 étapes sur 18 (4, 5, 6, 13). Ch. 57 : les titres « 5-C. Ce que le livre
n'imprime pas » et le tableau qui suit.

**La cause.** Le cadre : « Les titres de sous-sections sont des noms de gestes ou de choses, pas des maximes » ; skill
`ecriture`, tableau « Les phrases » : « La phrase qui parle du livre, du chapitre, de la page » sort ; règle 4 : « Les
étapes à l'infinitif ». L'habitude : une partie de référence (quoi faire de la viande) numérotée comme une procédure.

**Exemples.**

- `chapitres/52-ours-noir.md`, l. 111 à 113 (étape 7) : « Conséquence pratique, qui contredit en partie le ch. 61 : la
  consigne «attendez d'être sorti de la forêt pour dépouiller » tient, mais la sortie du bois devient urgente. »
  Réécriture : « 7. Sortir l'ours du bois sans traîner, et le dépouiller dès qu'il est à l'abri des mouches et de la
  poussière : la peau et le gras gardent la chaleur dans la viande. »
- `chapitres/52-ours-noir.md`, l. 175 et 176 (étape 25) : « Congélation à -18 °C ou moins. C'est la voie de ce qui
  redescend à la maison, parce que le congélateur est là-bas et pas au chalet. »
  Réécriture : « 25. Congeler à -18 °C ou moins la viande qui redescend à la maison. Le gel ne change rien au
  parasite : cette viande devra quand même cuire à 74 °C à cœur. »
- `chapitres/52-ours-noir.md`, l. 186 et 187 (étape 28) : « Fumage à chaud (ch. 71) : autorisé, à la condition que la
  sonde lise 74 °C à cœur avant la sortie du fumoir. »
  Réécriture : « 28. Au fumage à chaud (ch. 71), laisser la viande dans le fumoir jusqu'à ce que la sonde lise 74 °C à
  cœur. »
- `chapitres/52-ours-noir.md`, l. 191 à 193 (étape 30) : « Salpêtre (nitrate de potassium) : les vieilles recettes
  d'ours en réclament. Le livre ne donne jamais de quantité de salpêtre et renvoie systématiquement à sa forme moderne
  équivalente »
  Réécriture : l'étape sort. Le seul fait qui sert entre dans l'étape 29 : « Le sel nitrité ne protège pas mieux : il
  vise des bactéries, pas les larves. »
- `chapitres/48-lievre-d-amerique.md`, l. 102 à 104 (étape 5) : « Relever la ligne chaque matin. L'éviscération se fait
  immédiatement après la mort de l'animal. Un lièvre pris au collet est déjà, par construction, hors de cette fenêtre :
  le froid de janvier rachète une partie du retard, pas tout. »
  Réécriture : « 5. Relever la ligne chaque matin. Un lièvre pris au collet n'a pas été vidé à sa mort : le froid de
  janvier rattrape une partie de ce retard, pas tout. »
- `chapitres/48-lievre-d-amerique.md`, l. 170 (étape 13) : « Inspecter le foie, la rate et les poumons — c'est l'étape
  qu'on ne saute jamais. »
  Réécriture : « 13. Inspecter le foie, la rate et les poumons de chaque lièvre. »

### 7. La condition placée après le geste, ou cachée dans le sujet (moyenne)

**Le défaut.** Le lecteur lit le geste, le fait, puis apprend qu'il ne fallait le faire que dans un cas. Ou la
condition devient le sujet de la phrase (« Le poisson qui se mangera cru… passe d'abord au congélateur »), ou une
parataxe (« Une goutte d'eau dans le contenant, et tout le pot est compromis »), et la consigne disparaît.

**Fréquence.** Une dizaine de cas relevés dans le lot, surtout aux étapes de préparation (ch. 48, ch. 57) et dans les
variantes.

**La cause.** Skill `ecriture`, règle 3 : « La condition avant le geste. « Si l'eau est trouble, la filtrer avant de la
désinfecter. » »

**Exemples.**

- `chapitres/57-truite-et-omble-au-lac.md`, l. 132 à 134 : « Ne pas rincer la cavité à l'eau non traitée si le poisson
  ne s'en va pas directement à la cuisson (ch. 10, ch. 75). »
  Réécriture : « Si le poisson ne va pas directement à la cuisson, ne pas rincer la cavité à l'eau non traitée (ch. 10,
  ch. 75). »
- `chapitres/48-lievre-d-amerique.md`, l. 160 à 162 : « Vérifier la peau des mains avant de commencer, pas après : une
  gerçure ouverte, une coupure fraîche, un ongle arraché imposent une double paire de gants — ou, si la coupure est
  franche, de confier le travail à quelqu'un d'autre. »
  Réécriture : « Si les mains ont une gerçure ouverte, une coupure fraîche ou un ongle arraché, mettre deux paires de
  gants. Si la coupure est franche, confier le travail à quelqu'un d'autre. » (Et la vérification monte à l'étape 6 :
  défaut 9.)
- `chapitres/52-ours-noir.md`, l. 90 à 92 : « Un ours touché qui est parti ne se suit jamais vite, ni dans le couvert à
  la brunante : l'attente et la recherche sont au ch. 44 (étape 18 et §8, bloc 1). »
  Réécriture : « Si l'ours touché est parti, ne pas le suivre vite, et jamais dans le couvert à la brunante (ch. 44,
  étape 18). »
- `chapitres/57-truite-et-omble-au-lac.md`, l. 283 à 285 : « Il tue le poisson — aucune remise à l'eau n'est possible
  —, donc il ne sort que le jour où tout ce qui mord est gardé. »
  Réécriture : « La broche tue le poisson : ne la poser que les jours où on garde tout ce qui mord. »
- `chapitres/52-ours-noir.md`, l. 162 à 164 (étape 21) : « Une goutte d'eau dans le contenant, et tout le pot est
  compromis : c'est de l'eau qu'on vient de passer une heure à retirer. »
  Réécriture : « S'il reste une seule goutte d'eau dans le contenant, tout le pot est compromis. »

### 8. Le pourquoi en maxime, au bout de l'étape (moyenne)

**Le défaut.** L'étape finit sur une formule : une tautologie (« une ligne trop longue est une ligne trop longue »), un
proverbe (« Un poisson dont on hésite est un poisson qu'on remet »), une opposition (« pas une opération de confort,
c'est une opération de refroidissement »). Soit elle redit le titre, soit elle cache une consigne qu'il faut deviner.
C'est le tic du « fait : conséquence » du paragraphe du monoxyde, appliqué à la consigne : le geste, deux-points, une
chute.

**Fréquence.** Une vingtaine dans le lot à la lecture ; `controle.py` en relève 7 (1, 4 et 2).

**La cause.** Skill `ecriture`, tableau de la relecture du 15 octobre, ligne « La maxime » : « Si elle redit la consigne,
elle sort. Si elle cache un fait, on l'écrit en clair » ; le cadre : « Pas de maxime ni de chute en formule ».

**Exemples.**

- `chapitres/57-truite-et-omble-au-lac.md`, l. 118 et 119 : « Un poisson dont on hésite est un poisson qu'on remet. »
  Réécriture : « Dans le doute, le remettre à l'eau. »
- `chapitres/48-lievre-d-amerique.md`, l. 106 à 108 : « Une ligne trop longue pour être relevée chaque matin est une
  ligne trop longue : mieux vaut dix collets visités tous les jours que trente visités aux trois jours. »
  Réécriture : « Poser seulement le nombre de collets qu'on peut visiter chaque matin : dix collets visités tous les
  jours valent mieux que trente visités aux trois jours. »
- `chapitres/48-lievre-d-amerique.md`, l. 82 et 83 : « Une station montée à la noirceur avec un lièvre gelé dans une
  main est une station incomplète. »
  Réécriture : la phrase sort ; « d'avance », dans la phrase d'avant, le dit.
- `chapitres/52-ours-noir.md`, l. 114 et 115 : « Avec un ours, le dépouillement n'est pas une opération de confort,
  c'est une opération de refroidissement. »
  Réécriture : la phrase sort ; l'étape 7 réécrite (défaut 6) dit pourquoi on dépouille vite.
- `chapitres/57-truite-et-omble-au-lac.md`, l. 109 et 110 : « Une glacière qu'on prépare après la première prise arrive
  toujours trop tard. »
  Réécriture : la phrase sort ; le titre de l'étape 2 le dit.
- `chapitres/52-ours-noir.md`, l. 351 à 353 : « Ce qui ne se rattrape pas, c'est celle qui donne trois lectures
  différentes dans la même eau ; celle-là ment sans avertir, et elle est pire que pas de thermomètre du tout, parce
  qu'elle donne une confirmation. »
  Réécriture : « Une sonde qui donne trois lectures différentes dans la même eau ne peut pas être corrigée : la jeter,
  parce qu'on se fierait à une lecture fausse. »

### 9. Le geste au mauvais moment, ou confié à quelqu'un qui n'est pas là (moyenne)

**Le défaut.** Qui et quand. Une vérification arrive après le moment où elle sert (les mains, regardées à l'étape 11,
après qu'on a touché le collet et l'animal) ; la même préparation revient à deux étapes ; un lecteur debout devant le
collet est envoyé à l'étape 13 et à la section 9. Et la consigne est confiée à quelqu'un qui n'existe pas dans le
livre : le médecin, le laboratoire, « Sortir », alors que la variante d'urgence du même chapitre dit ce qu'on fait sur
place. Le lecteur a deux conduites pour le même cas.

**Fréquence.** Ch. 48 : l'ordre des étapes 6 à 11, la station aux étapes 2 et 9, sept renvois en avant dans la procédure ; « consulter »,
« laboratoire » ou « signalement » à 6 endroits. Ch. 52 : « Sortir » ou « Suivi médical » à 4 endroits, plus le
paragraphe l. 237 à 241.

**La cause.** `CLAUDE.md` : « il n'y a personne à appeler » ; « aucun service qui répond » ; « Ce que la phrase disait
de la gravité reste : « ce signe veut dire que la vie est en jeu », puis ce qu'on fait ici, avec ce qu'on a. » Skill
`ecriture`, « Le réel de l'urgence » : l'ordre réel. L'habitude : le chapitre a été écrit avant la règle « personne à
appeler », et la variante d'urgence a reçu la conduite réelle sans que les étapes soient corrigées.

**Exemples.**

- `chapitres/48-lievre-d-amerique.md`, l. 160 (étape 11, Dépouiller) : « Vérifier la peau des mains avant de commencer,
  pas après »
  Réécriture, à l'étape 6 : « 6. Avant de toucher au collet, regarder la peau de ses mains, puis mettre les gants sur
  des mains sèches. » (La branche « si » de l'exemple 7b suit.)
- `chapitres/48-lievre-d-amerique.md`, l. 141 à 143 (étape 9, qui refait l'étape 2) : « Préparer la station et
  s'équiper en entier. Gants imperméables, lunettes, masque et tablier, tous les quatre. Un seau de solution de javel
  prêt : un volume d'eau de Javel pour neuf volumes d'eau. »
  Réécriture : « 9. Mettre les quatre protections : gants imperméables, lunettes, masque et tablier. Préparer un seau
  de javel, 1 volume pour 9 volumes d'eau, avec l'eau et le savon à portée de main. »
- `chapitres/48-lievre-d-amerique.md`, l. 123 à 125 (étape 7) : « Dans ces trois cas : ne pas toucher, ne pas
  rapporter, ne pas donner au chien. La conduite complète est à l'étape 13, et ce qu'on fait de l'animal ensuite est à
  la section 9. »
  Réécriture : « Dans ces trois cas, ne pas toucher l'animal, ne pas le rapporter et ne pas le donner au chien. Couper
  le fil au-dessus de la boucle et brûler l'animal sans l'ouvrir, loin du sentier et de l'eau (variante d'urgence,
  « Quand il n'y a personne à appeler »). »
- `chapitres/48-lievre-d-amerique.md`, l. 176 à 179 (étape 13) : « Mettre l'animal entier dans un sac étiqueté avec la
  date et le lieu, sans le manipuler de nouveau, et désinfecter tout ce qui l'a touché. La suite est à la section 9 —
  et elle ne change rien à la première consigne, qui est de ne pas manger l'animal. »
  Réécriture : « Ne pas manger l'animal. Le brûler entier sur un feu franc, loin du sentier et de l'eau (variante
  d'urgence), et désinfecter tout ce qui l'a touché. »
- `chapitres/48-lievre-d-amerique.md`, l. 220 à 222 (étape 18) : « En cas de symptôme : consulter, et dire au médecin
  qu'il y a eu manipulation de gibier dans les trois semaines précédentes. »
  Réécriture : « Si un de ces signes paraît, la vie peut être en jeu : dire à toute la maisonnée qu'un lièvre a été
  préparé dans les trois semaines. [Ce qu'on fait ici, avec ce qu'on a : au rédacteur, avec sa source.] »
- `chapitres/52-ours-noir.md`, l. 232 (Signes d'échec) : « Diarrhée et malaises abdominaux dans la semaine suivant un
  repas d'ours | Possible trichinellose, phase intestinale | Sortir. Dire qu'il y a eu de la viande d'ours, et quand »
  Réécriture, case Action : « Noter quel morceau d'ours a été mangé, quand, et par qui. [Ce qu'on fait ici, avec ce
  qu'on a : au rédacteur, avec sa source.] »

### 10. Le chiffre loin de l'étape qui s'en sert, et la ligne de Matériel qui dit le danger (basse)

**Le défaut.** Le chiffre dont la procédure a besoin est dans le Matériel ou dans un tableau, pas dans l'étape où on
s'en sert ; ou il est redit à quatre endroits. La ligne de Matériel dit le danger ou ce qui ne marche pas, au lieu de
ce que fait l'objet, avec un tiret et un « (→ §9) ».

**Fréquence.** Ch. 48 : la dilution de la javel 4 fois (l. 67, 142, 182, 248), « trois semaines » 7 fois. Matériel :
12 lignes sur 12 avec un tiret, 8 avec « § », 7 au-dessus de 20 mots.

**La cause.** `CLAUDE.md` : « chaque chapitre dit ce que sa procédure demande, dans son Matériel, et le chiffre dont
elle a besoin (une quantité, une réserve), dans l'étape qui s'en sert » ; « Le Matériel ne liste que l'indispensable
[…] une ligne par item, 15 à 20 mots » ; skill `ecriture` : « **Thermomètre à sonde** : porte les 74 °C à cœur. »

**Exemples.**

- `chapitres/57-truite-et-omble-au-lac.md`, l. 66 : « Glacière et glace — au moins 1 kg de glace pour 2 kg de poisson,
  1 pour 1 s'il fait chaud (→ §9). »
  Réécriture, Matériel : « Glacière et glace : on enrobe le poisson de glace, du lac au chalet. » Étape 2 : « Charger
  la glacière avant les cannes : au moins 1 kg de glace pour 2 kg de poisson prévu, 1 kg pour 1 kg quand il fait
  chaud. »
- `chapitres/48-lievre-d-amerique.md`, l. 243 (Points de contrôle) : « 2 paires de gants par séance »
  Réécriture : le chiffre va dans l'étape 9 : « Mettre les quatre protections : deux paires de gants imperméables par
  séance, des lunettes, un masque et un tablier. »
- `chapitres/48-lievre-d-amerique.md`, l. 182 et 183 (étape 14) : « au savon puis au désinfectant à l'hypochlorite de
  sodium, un volume de javel pour neuf volumes d'eau »
  Réécriture : « au savon, puis avec la javel du seau (étape 9) »
- `chapitres/48-lievre-d-amerique.md`, l. 65 : « Gants imperméables — la tularémie entre par une gerçure des mains, et la
  cuisson arrive trop tard (→ §9). »
  Réécriture : « Gants imperméables : on les met avant de toucher au collet et on les enlève en dernier, après le
  nettoyage. »
- `chapitres/52-ours-noir.md`, l. 79 : « Autoclave à pression — pour la conserve de viande seulement ; la marmite d'eau
  bouillante ne la rend pas sûre. »
  Réécriture : « Autoclave à pression : le seul moyen de mettre la viande d'ours en pots pour la garder hors du
  froid. »
- `chapitres/48-lievre-d-amerique.md`, l. 68 : « Thermomètre à sonde — seul moyen de savoir que la cuisse a atteint
  74 °C à cœur (→ §9 : faire bouillir). »
  Réécriture : « Thermomètre à sonde : lit les 74 °C à cœur dans la cuisse arrière, loin de l'os. Sans lui, faire
  bouillir (variante d'urgence). »

## 3. Ce qui marche : des modèles

1. `chapitres/52-ours-noir.md`, l. 158 à 161 (étape 20) : « Lire la fin du rendu sur le chaudron, pas sur une horloge.
   Le bouillonnement fin et continu, c'est l'eau qui s'en va ; quand il cesse et que la surface devient calme et claire,
   l'eau est partie. Les cretons tombent au fond et brunissent : c'est le signal d'arrêt. »
   Pourquoi : un geste, et ce qu'on voit quand c'est fini, avec les mots qu'on dirait devant le chaudron. Le lecteur
   sait quand arrêter sans thermomètre ni horloge. C'est la sous-étape « ce qu'on voit quand c'est fait » du cadre.
2. `chapitres/52-ours-noir.md`, l. 165 et 166 (étape 22) : « Laisser figer sans couvrir, puis couvrir une fois froid.
   Couvrir chaud fait condenser de l'eau sous le couvercle, qui retombe dans le gras. »
   Pourquoi : deux gestes dans leur ordre, puis un pourquoi d'une phrase qui dit ce qui arrive si on se trompe. Pas de
   deux-points, pas de chute : le tempo d'une consigne parlée.
3. `chapitres/52-ours-noir.md`, l. 126 à 128 (étape 11) : « Détacher la nappe de gras à la main et au dos du couteau,
   lame à plat, en tirant la feuille et en coupant seulement les attaches. Le tranchant sert le moins possible : chaque
   entaille laisse du gras sur le muscle et de la viande dans le gras. »
   Pourquoi : le geste avec ses mains (à la main, au dos du couteau, lame à plat), et un pourquoi qui change la façon
   de tenir la lame.
4. `chapitres/48-lievre-d-amerique.md`, l. 413 à 416 (Dépouiller sans couteau) : « Pincer la peau au milieu du dos entre
   le pouce et l'index des deux mains, la soulever et l'ouvrir en tirant les deux prises en sens contraire. Agrandir le
   trou en travers jusqu'à faire un anneau complet autour de l'animal. Tirer ensuite les deux moitiés en sens opposé,
   comme deux manches qu'on retourne : la peau sort en deux morceaux, l'arrière avec les pattes, l'avant avec la tête. »
   Pourquoi : chaque phrase est un geste à l'infinitif, dans l'ordre, avec où mettre les doigts et ce qu'on voit à la
   fin. La comparaison (« comme deux manches qu'on retourne ») montre le geste, elle ne décore pas. Le modèle de la
   variante d'urgence.
5. `chapitres/57-truite-et-omble-au-lac.md`, l. 124 à 126 (étape 7) : « Pour garder : tuer immédiatement. Un coup sec et
   unique sur le dessus de la tête, en arrière des yeux. Un poisson laissé mourir d'asphyxie au fond de la chaloupe se
   débat, chauffe et rougit sa chair. »
   Pourquoi : la condition d'abord (« Pour garder »), le geste, où frapper, puis ce qui arrive sinon. Trois phrases qui
   se suivent les mains occupées.

## 4. Pour le skill et les auditeurs

Ce qu'un auditeur de la consigne devrait vérifier, et ce qu'un script peut relever (tous ces avis sont « à juger ») :

- **Le pronominal.** Dans une étape, un tableau ou une variante : un nom sujet suivi de « se » et d'un verbe de geste à
  la 3e personne (se cuit, se jette, se mange, se range, se pose, se noue, se fait, se met, se transporte, se retire…).
  `controle.py` n'a rien pour ça, et le cadre suppose le contraire.
- **La longueur de l'étape.** Plus de 80 mots ou plus de 4 phrases : découper en sous-étapes. Une étape sans verbe à
  l'infinitif : la relire.
- **Les tableaux.** Plus de 8 lignes en Points de contrôle ou en Signes d'échec ; une case « Si c'est hors cible » sans
  verbe d'action, ou qui finit sur une maxime.
- **La section 2.** Une ligne de plus de 10 mots, une ligne avec un deux-points, les mots « Jamais », « mauvais choix »,
  « ne s'applique pas », « Ce chapitre ».
- **Les guillemets dans une étape** : une citation de source à redire comme une consigne.
- **La condition après le geste** : un infinitif en tête de phrase suivi plus loin de « si » ou « en cas de ».
- **Le service absent** : consulter, médecin, laboratoire, signaler, « Sortir. », suivi médical.
- **Les maximes** : « Un X qui… est un X… », « X n'est pas…, c'est… », « est pire que », une phrase qui finit un
  paragraphe d'étape sans verbe de geste.
- **Le Matériel** : un tiret, un « § », plus de 20 mots, une ligne qui dit le danger ou ce qui ne marche pas.

Dans le skill `ecriture`, il manque une règle qui dise **le tempo de la consigne** : la condition, le geste, où et
comment, ce qu'on voit quand c'est fait, puis le pourquoi en une phrase, avec « parce que » ou « sinon » plutôt qu'un
deux-points. Les modèles de la section 3 la suivent tous.

Hors de mon regard, vu en passant : « 4 et 6 ans » (ch. 48, l. 37 et 211 ; ch. 57, l. 100) ; « la maison du village »
(ch. 48, l. 8 et 194) ; les citations de source et les attributions hors des étapes (tableau 5-A du ch. 57, encadrés
DANGER) ; la ligne de la section 2 du ch. 57 sur la viande maigre (défaut 3).

## 5. Liste de contrôle (cadre, parties « Pour tout agent », « Le texte » et « La langue »)

- [x] `CLAUDE.md` chargé, pas relu ; skill `ecriture` et gabarit lus au complet.
- [x] `suivi/plan-de-match.md` : aucun point sur les ch. 48, 52 et 57 (recherche par numéro).
- [x] Règle 1 : aucune réécriture n'ajoute un fait ni un chiffre ; deux places marquées entre crochets pour le
  rédacteur.
- [x] Rien de commité ; aucun fichier du livre modifié ; seul ce fichier de notes est écrit.
- [x] Lu seulement le lot, les règles et les mesures ; sorties de commande coupées.
- [x] Sept sections : les trois chapitres sont encore à neuf ; noté, hors de mon regard.
- [x] Section 2 seulement quand l'utiliser, en titres de situation : défaut 3, titres proposés.
- [ ] Série orange : aucune dans le lot ; rien à juger.
- [x] Règle 0 : chaque réécriture relue à voix haute.
- [x] Pas de maxime ni de chute : défaut 8 ; aucune dans les réécritures.
- [x] Pas de chose qui pense : relevé en passant (« le chapitre 19 cherche désespérément », « celle-là ment »).
- [x] Jamais au pronominal : défaut 2 ; réécritures à l'infinitif.
- [x] Consigne dite comme une consigne, ordre naturel, condition avant : défauts 2, 6 et 7.
- [x] Points de contrôle et Signes d'échec à 5 à 8 lignes : défaut 4, lignes à garder proposées.
- [x] Un passage lourd se juge d'abord (doit-il exister ?) : sept réécritures sont des coupes.
- [x] Le chapitre parle de son sujet ; renvois jugés : défaut 9.
- [x] Qui fait quoi, quand et pourquoi, sans détour : défauts 1, 6 et 9.
- [x] Le mot qu'on dit : « tout de suite », « trop enfoncé », « rattrape » dans les réécritures.
- [x] On nomme la chose au lieu du possessif (« la couche de gras »).
- [x] Aucun tiret ni « § » dans les réécritures.
- [x] Titres d'étapes : des gestes (défaut 6).
- [x] Étape à plusieurs gestes en sous-étapes : défaut 1.
- [x] Autre façon dite comme une autre façon : les variantes du lot le font (« Sans gants jetables. »).
- [x] L'urgence ne s'appuie pas sur une préparation : la station d'avance est dans « Avant de poser le premier collet ».
- [x] Inventaire des faits : fait pour les chiffres de la consigne (défaut 10) ; l'inventaire complet revient au regard
  de la densité.
- [x] `controle.py` lancé sur les trois chapitres : 43, 35 et 40 tirets, 13, 8 et 2 « § », aucune section « pronominal ».
- [ ] `langue.py` : pas lancé, je n'écris aucun texte qui s'imprime ; les réécritures passeront au correcteur.
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures ; accords et « a / à » relus.
