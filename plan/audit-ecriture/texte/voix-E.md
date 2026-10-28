# Audit de l'écriture : la voix, lot E (tome 4)

28 octobre 2026. Un seul regard : **la voix**, le mot qu'on dit contre le mot qu'on écrit. Le registre visé : un
Québécois qui explique à son voisin, en français correct (ni joual, ni mot de livre ; le niveau « courant » de
Radio-Canada, `litterature/L2.md`, P8). Lot lu au complet : `chapitres/68-salaison-a-sec.md`,
`chapitres/70-fumage-a-froid.md`, `chapitres/78-conserves-et-marinades.md`. Aucun fichier du livre n'est touché. Les
réécritures ci-dessous n'ajoutent aucun fait ni chiffre ; elles ont passé `langue.py` (LanguageTool et nos règles :
0 avis) et `controle.py` (0 tiret, 0 mot banni).

Ce que je ne juge pas ici : le tempo et le moule « fait : conséquence », la longueur, la répétition, la consigne au
pronominal, la forme du chapitre, l'exactitude des faits. Ce que j'ai vu en passant dans ces domaines est noté à la
section 6, pour les autres auditeurs.

**Une précision sur le lot.** Ces trois chapitres datent du 12 octobre et n'ont pas eu la grande passe (point 21 du plan
de match) : ils ont encore les neuf sections, la section Danger, 156 tirets, 30 « § », « village » et l'âge des
enfants. Leur voix est donc celle du premier jet, avant les règles du 15 au 28 octobre. C'est utile : on y voit ce que
le rédacteur fait quand rien ne l'arrête, et ce que la passe aura à défaire dans les 112 chapitres.

## 1. Les mesures

`tempo.py --par-fichier` sur le lot :

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 68-salaison-a-sec.md | 5055 | 306 | 16,5 | 0,74 | 24,8 | 16,0 | 19,3 | 25,8 | 19,9 | 3,0 | 5,3 | 5,1 | 5,9 |
| 70-fumage-a-froid.md | 5771 | 302 | 19,1 | 0,69 | 20,5 | 21,9 | 21,6 | 33,8 | 25,8 | 3,8 | 6,2 | 5,2 | 5,0 |
| 78-conserves-et-marinades.md | 5401 | 316 | 17,1 | 0,73 | 21,5 | 16,8 | 15,6 | 30,4 | 24,4 | 1,5 | 7,8 | 5,6 | 6,0 |
| ENSEMBLE | 16227 | 924 | 17,6 | 0,72 | 22,3 | 18,2 | 18,9 | 30,0 | 23,4 | 2,8 | 6,5 | 5,3 | 5,6 |

Le tempo du lot est proche de la moyenne du livre (18,7 mots par phrase, 31 % de deux-points, 5,4 liaisons pour 1000
mots). Les petits mots de la parole, comptés au `grep` sur les trois fichiers :

| marque | ch. 68 | ch. 70 | ch. 78 | lot | pour 1000 mots |
| --- | --- | --- | --- | --- | --- |
| « : » dans une phrase | 84 | 106 | 105 | 295 | 18,2 |
| « parce que » | 5 | 5 | 4 | 14 | 0,9 |
| « ça » | 7 | 5 | 10 | 22 | 1,4 |
| « c'est » | 33 | 41 | 47 | 121 | 7,5 |
| dont « c'est » pris dans un moule (« ce n'est pas X, c'est Y », « C'est le… qui ») | 21 | 16 | 27 | **64** | 3,9 |
| « on » | 36 | 50 | 40 | 126 | 7,8 |
| noms latins en italique | 18 | 21 | 36 | **75** | 4,6 |
| citations de source (4 mots et plus, entre guillemets) | 12 | 15 | 26 | **53** | 3,3 |

Le chiffre qui parle : plus de la moitié des « c'est » du lot ne sont pas des « c'est » de conversation. Ils servent à
monter une formule (« Ce n'est pas de la prudence, c'est de l'arithmétique »), et le mot oral habille une tournure
écrite. `controle.py`, section « Mots de livre » : 14 avis sur le lot (« aspect », « lorsque », « nécessitent »,
« à défaut »), dont 5 dans des citations de source. L'outil ne voit aucun des dix motifs ci-dessous en entier.

## 2. Ce que j'entends dans ces pages

Trois voix se relaient, et aucune n'est celle du voisin dans le garage :

- **la voix du ministère**, recopiée entre guillemets ou à peine retouchée : on y vouvoie (« Ne mangez pas », « Évitez
  de goûter »), on « consomme » des « aliments », on parle de « coagulation des protéines », de « dégradation
  enzymatique » et d'orignal (*Alces americanus*) ;
- **la voix de l'essai à effet**, qui donne aux choses un caractère (« La fumée ment », « un appareil qui ne pardonne
  pas », « un pot d'autoclave se moque de la température ») et ferme les paragraphes sur une formule (« Une étiquette
  n'a jamais tué personne », « le 74 °C devient une opinion ») ;
- **la voix du rédacteur qui parle de son livre** et de sa propre franchise (« Ce que cette version coûte, nommé sans
  adoucir », « Position du livre », « Ce tableau ferme des portes »).

Entre elles, il y a de très bons passages : quand le texte décrit un geste à l'atelier ou au poêle (l'autoclave sur le
poêle à bois, le vinaigre, le tartre au fond du chaudron), il dit « on », il enchaîne avec « puis » et « jusqu'à ce
que », il donne ce qu'on voit, et il sonne juste (section 5). La voix existe ; elle ne tient pas d'un bout à l'autre.

## 3. Les défauts, du plus grave au moins grave

### Motif 1. La chose qui parle, qui ment, qui pardonne, qui commande (haute)

**Ce que c'est.** Un objet, une règle ou un chiffre devient sujet d'un verbe de personne : mentir, pardonner, se moquer,
dire la vérité, ne pas le dire, commander, gouverner, reprendre la main, réveiller, réhabiliter, faire deux métiers.
Personne ne parle d'un manomètre qui « ment » pour dire qu'il lit faux. La personnification cache le mécanisme : le
lecteur doit traduire « le barème ne pardonne pas » en « il faut recommencer à compter ».

**Fréquence.** Environ 28 à la lecture (ch. 68 : 8 ; ch. 70 : 7 ; ch. 78 : 13). `controle.py` en voit 2 (« La fumée
ment », « le manomètre ment »). Autres cas : 70:501 « La fumée ment sur l'état de ce qu'elle recouvre » ; 78:421 (titre)
« Quand le manomètre ment » ; 78:382 « un appareil qui ne pardonne pas » ; 78:417 « il rate sans le dire » ; 78:423
« dérive en silence » ; 78:428 « celui qui dira encore la vérité » ; 68:228 « Le sel n'a pas pris la main » ; 70:348
« La terre fait deux métiers » ; 70:403 « une alarme muette » ; 78:42 « La ligne qui décide de tout » ; 78:112 « La
conserve ne réhabilite rien ».

**Exemples.**

1. `78:397` « Un rond de cuisinière se règle une fois et tient. Un poêle à bois ne tient pas, et un barème de peu acide
   ne pardonne pas : chaque creux sous la pression fait recompter le maintien au complet »
   → « Sur un rond de cuisinière, on trouve le bon réglage une fois et la pression reste stable. Sur un poêle à bois,
   elle varie, et chaque fois qu'elle descend sous la cible, il faut recommencer à compter le maintien au complet
   (étape 19). »
2. `78:557` « Un pot d'autoclave, lui, se moque de la température. »
   → « Un pot passé à l'autoclave, lui, n'a pas besoin de froid. »
3. `68:155` « **Sur des pièces de chalet, ce sont presque toujours les minimums absolus qui gouvernent, pas le calcul au
   kilogramme.** Le calcul reprend la main au-dessus d'environ 8,5 kg pour le contact et 9,1 kg pour le total. »
   → « Pour les pièces qu'on sale au chalet, on suit presque toujours les minimums de 28 et de 40 jours. Le calcul au
   kilogramme donne plus long seulement quand la pièce pèse plus d'environ 8,5 kg (pour le contact) ou 9,1 kg (pour le
   total). »
4. `78:80` « Une conserve retire l'oxygène, et c'est justement ce qui réveille la spore de *Clostridium botulinum* : le
   vide seul n'est pas une protection, c'est le danger. »
   → « Quand on ferme un pot, on enlève l'oxygène, et c'est justement sans oxygène que la spore du botulisme peut
   germer. »
5. `78:498` « La deuxième fois, il ne remplit plus les mêmes creux — et il ne le dit pas : le couvercle a l'air scellé,
   il est creux sous le doigt, et il reprend de l'air trois semaines plus tard sur la tablette. »
   → « La deuxième fois, il ne remplit plus les mêmes creux, et on ne peut pas le voir : le couvercle a l'air scellé et
   il est creux sous le doigt, mais il reprend de l'air trois semaines plus tard sur la tablette. »
6. `70:382` « Un cadran qui ment n'est pas mort. »
   → « Un thermomètre à cadran qui lit faux peut encore servir. »

**Cause.** La règle existe : `.claude/cadre-agents.md`, l. 100 à 102 (« Pas de chose qui pense, sait, veut, attend,
pardonne ou se croit ») et le skill `ecriture`, tableau du 15 octobre, lignes « La chose qui pense » et « la couleur
dit ». Elle ne mord pas pour deux raisons : le chapitre n'a pas eu sa passe, et le script ne connaît que les verbes de
l'esprit (savoir, vouloir, attendre…), pas ceux de la parole et du pouvoir (mentir, dire, se moquer, commander,
gouverner, reprendre la main). L'habitude derrière : le raccourci de l'essayiste, qui prête un caractère à l'objet pour
ne pas avoir à dire ce qui arrive.

### Motif 2. Le texte qui parle de lui-même et qui annonce sa franchise (haute)

**Ce que c'est.** La phrase parle du livre, du chapitre, de la section ou de « cette version » au lieu de parler du sel
et de la viande ; ou elle annonce qu'elle va être franche (« nommé sans adoucir », « dit honnêtement », « dit une fois et
sans détour », « il vaut mieux les regarder en face que broder autour »). L'annonce de franchise est une des marques
les plus reconnaissables d'un texte d'IA : on promet la vérité au lieu de la dire. JP l'a nommé autrement : « on tourne
autour du pot ».

**Fréquence.** 47 lignes nomment le livre, le chapitre, la section ou la version (ch. 68 : 17 ; ch. 70 : 12 ; ch. 78 :
18), sans compter les renvois (« ch. 73 »), qui restent. 6 annonces de franchise. Autres cas : 68:110 « c'est la
limite du chapitre autant que du ch. 19 » ; 68:209 « Sans ce nombre, le chapitre ne fonctionne pas » ; 68:326 « Sans
pesée, le chapitre n'existe plus » ; 70:218 « Destination par défaut de ce livre » ; 78:52 « Ce tableau ferme des
portes, et c'est l'essentiel de la section » ; 78:347 « un des rares objets de ce livre qui n'a aucun usage sûr ».

**Exemples.**

1. `70:496` « **Ce qu'on perd en tout, dit honnêtement.** Dans cette version, le fumage à froid cesse d'être une
   technique de conservation et redevient ce qu'il est vraiment sans instruments : un **traitement de surface** »
   → « Sans instruments, le fumage à froid ne conserve plus rien : il éloigne les mouches, ralentit le rancissement et
   donne le goût à une pièce que le sel et le froid conservent. »
2. `68:495` « Ce que cette version coûte, nommé sans adoucir : »
   → « Ce qu'on perd quand on sale sans courant, sans nitrite et sans instruments : »
3. `68:399` « Et la limite qui ne se contourne pas, répétée ici parce qu'on n'ouvre pas ce livre à la première page :
   **ni aluminium, ni fer galvanisé, ni cuivre**. »
   → « Jamais d'aluminium, de fer galvanisé ni de cuivre : la saumure les attaque, et ce qu'elle en tire passe dans la
   viande et n'en ressort plus. »
4. `70:310` « **Position du livre :** au chalet, un produit fumé à froid se congèle ou se cuit, il ne vieillit pas au
   réfrigérateur ; et il ne se sert pas cru à une personne enceinte. »
   → « Au chalet, on congèle ou on cuit un produit fumé à froid, on ne le laisse pas vieillir au réfrigérateur, et on ne
   le sert jamais cru à une personne enceinte. »
5. `78:281` « Le mécanisme, au complet, parce que c'est lui qui fait changer de comportement : la spore de *Clostridium
   botulinum* est «répandue dans la nature » »
   → « La spore du botulisme est partout dans la nature : sur la viande d'orignal, sur les betteraves du jardin, dans
   l'eau du lac. »
6. `68:192` (ligne de tableau) « | Statut dans ce livre | Le cas normal au chalet | Le cas que le livre ne peut pas
   certifier | »
   → « | Au chalet | C'est le cas normal | On ne peut pas le vérifier | »

**Cause.** Deux causes, dont une vit encore dans nos règles. (1) La règle contre la phrase qui parle du livre existe
(skill `ecriture`, tableau « Les phrases », première ligne ; `CLAUDE.md`, « Saute : la phrase qui parle du livre ou de
la page »), mais le chapitre n'a pas eu sa passe. (2) **L'annonce de franchise vient du gabarit lui-même** :
`gabarit-chapitre.md`, l. 111 et 112, « Nommer honnêtement ce qu'on perd en la choisissant […]. Et dire ce qui ne se
remplace vraiment pas, sans broder autour. » Le rédacteur a recopié la consigne dans le texte : « nommé honnêtement »
(78:547), « dit honnêtement » (70:496), « Ce qui ne se remplace vraiment pas » (78:540), « que broder autour »
(68:484). « Ce qu'on perd » revient 399 fois dans `chapitres/`, et les formules de franchise sont dans 13 chapitres.
Aucune règle n'interdit l'annonce de franchise ; `controle.py` ne la cherche pas.

### Motif 3. L'opposition fabriquée : « ce n'est pas X, c'est Y » (haute)

**Ce que c'est.** La phrase écarte une idée que personne n'avait (« ce n'est pas de la prudence », « pas un
pis-aller », « pas une consolation ») pour poser la vraie en contraste. Le moule donne un ton d'assurance sans apprendre
rien de plus ; à voix haute, il sonne comme un slogan. Il faut le distinguer de la négation qui sauve (« dans le
congélateur, pas sur le cadran » ; « au froid, pas sur le comptoir ») : celle-là répond à un réflexe réel, elle reste.

**Fréquence.** 42 phrases taillées dans ce moule (ch. 68 : 17 ; ch. 70 : 12 ; ch. 78 : 13), dont environ 22 où le
« pas X » ne répond à aucun réflexe du lecteur. `controle.py` en voit 5 (la forme « n'est pas X mais Y »). Autres
cas : 68:95 « Le sel n'assainit pas, il arrête » ; 68:281 « Ce n'est pas un excès de goût qui guette, c'est un poison
franc » ; 70:23 « Ce n'est pas une question de date de calendrier, c'est une question de thermomètre » ; 78:531 « c'est
la vraie réponse, pas une consolation » ; 78:563 « ne sont pas des accompagnements, ils sont ce qui tient ».

**Exemples.**

1. `68:116` « Sans nitrite, 2,5 % n'est pas un plancher, c'est un pari. »
   → « Sans nitrite, on ne descend jamais à 2,5 %. »
2. `68:381` « La réponse honnête n'est pas un truc, c'est un calendrier : on ne commence une salaison qu'entre le premier
   gel sérieux et le dégel »
   → « Il faut donc choisir le moment : on ne commence une salaison qu'entre le premier gel sérieux et le dégel »
3. `78:438` « Ce n'est pas de la prudence, c'est de l'arithmétique : un barème appliqué à une pression inconnue n'est plus
   un barème. »
   → « Le barème ne vaut que pour la pression qu'il indique ; si on ne peut pas se fier à l'aiguille, on ne sait pas si
   on l'a suivi. »
4. `78:522` « Un vinaigre d'acidité inconnue est un goût, pas une barrière »
   → « Un vinaigre dont on ne connaît pas l'acidité donne du goût, mais il ne protège pas contre le botulisme »
5. `70:453` « **Ce qui ne se remplace pas :** l'épinette vive, la branche verte et le cœur de résine d'une vieille souche
   ne sont pas un pis-aller, c'est un autre produit — suie collante et amertume qui ne s'enlève plus. »
   → « L'épinette vive, la branche verte et le cœur de résine d'une vieille souche ne remplacent pas le bon bois : ils
   couvrent la viande d'une suie collante et lui donnent une amertume qui ne part plus. »
6. `78:380` « Ce qui reste n'est pas une conserve dégradée : c'est **un autre chapitre**, et il commence par la seule
   chose qui se fabrique vraiment ici — la conduite d'un feu nourri à la main sous un appareil qui ne pardonne pas. »
   → « Sans courant, ce qu'on peut encore faire, c'est tenir l'autoclave sur un poêle à bois, avec un feu qu'on nourrit
   à la main tout le long du cycle. »

**Cause.** Skill `ecriture`, tableau « Les phrases », ligne « L'opposition fabriquée » ; `.claude/cadre-agents.md`,
l. 99 (« pas d'opposition fabriquée ») et l. 142 (« pas de "X ne fait pas Y : il fait Z" »). Le script ne voit que
« n'est pas X mais Y » et « ne fait pas Y : il fait Z » ; il ne voit pas « X, pas Y » ni « n'est pas X, c'est Y ». Le
skill `editeur` pousse dans le même sens sans le vouloir : « alterne phrases courtes (percutantes) et phrases longues »
(l. 21). Une phrase courte qu'on veut « percutante » devient une opposition ou une chute.

### Motif 4. La voix d'institution, recopiée entre guillemets (haute)

**Ce que c'est.** La phrase du ministère entre dans le texte telle quelle, entre guillemets : son vouvoiement (« Ne
mangez pas », « Ne modifiez jamais », « Évitez de goûter »), ses mots (« consommer », « aliments », « extrémités »,
« agents de salaison »), une fois en anglais. Au milieu d'un texte au « on », c'est une autre personne qui parle, et
c'est celle que le livre ne veut pas être. La citation sert de preuve à la place du fait dit avec nos mots.

**Fréquence.** 53 citations de source de 4 mots et plus (ch. 68 : 12 ; ch. 70 : 15 ; ch. 78 : 26), dont 8 à
l'impératif en « vous » et 1 en anglais. Les citations font aussi entrer la moitié des « mots de livre » que
`controle.py` relève (« lorsque », « nécessitent », « aspect »). Autres cas : 68:124 « «Les tissus musculaires exposés
[…] devraient être recouverts d'agents de salaison » » ; 70:300 « «peut aussi se multiplier à des températures froides
(4 ° à 10 °C), par exemple dans les aliments conservés au réfrigérateur » » ; 78:259 « «Évitez de goûter aliment qui n'a
pas un aspect normal, qui écume ou qui dégage une mauvaise odeur » ».

**Exemples.**

1. `68:54` « «Ne mangez pas le foie ni les reins de cervidés car ils peuvent contenir un taux de cadmium élevé ». Le
   cadmium ne sort pas au salage. »
   → « On ne mange jamais le foie ni les reins d'un cervidé (orignal, caribou) : ils peuvent contenir beaucoup de
   cadmium, et le sel ne l'enlève pas. »
2. `78:117` « «Ne modifiez jamais le temps de traitement thermique ou les niveaux de pression recommandés ». Si l'aliment
   n'est pas dans le livret, il ne se met pas en conserve ce jour-là. »
   → « On ne change jamais le temps ni la pression du livret. Si l'aliment n'y est pas, on ne le met pas en conserve ce
   jour-là. »
3. `78:317` « «do not alter vinegar, food, or water proportions in a recipe or use a vinegar with unknown acidity » »
   → « on ne change pas les quantités de vinaigre, de légumes et d'eau de la recette, et on ne prend pas un vinaigre dont
   on ne connaît pas l'acidité »
4. `78:256` « «Il ne faut jamais consommer d'aliments provenant de conserves qui fuient ou dont les extrémités sont
   gonflées ou bosselées » »
   → « On ne mange jamais ce qui sort d'un pot qui fuit ou dont le couvercle est gonflé ou bosselé. »
5. `70:314` « «Le monoxyde de carbone se dégage lorsque des appareils et des véhicules brûlent un combustible comme le
   propane, le bois, le mazout », et «c'est un gaz toxique qui ne se voit pas et ne se sent pas. Il n'irrite pas les
   yeux ni les voies respiratoires ». »
   → « Le bois qui brûle fait du monoxyde de carbone, comme le propane et le mazout. On ne le voit pas, on ne le sent
   pas, et il ne pique ni les yeux ni la gorge. »
6. `78:301` « La consigne tient en trois mots : «évitez de goûter ». »
   → « On ne goûte jamais pour vérifier. »

**Cause.** La règle est claire et elle n'est pas outillée : skill `ecriture`, « Les guillemets » (« Pas de citation de
source : la provenance vit dans `suivi/`, jamais dans le texte ») ; `CLAUDE.md`, règle 1 (« La provenance ne s'imprime
pas ») ; `.claude/cadre-agents.md`, l. 21 (« La source sert à vérifier un fait, jamais à copier une forme »).
`controle.py` ne compte pas les guillemets. L'habitude : le rédacteur cite pour se protéger d'une erreur de fait, et
la sécurité du fait se paie en voix.

### Motif 5. La chute en proverbe (moyenne)

**Ce que c'est.** Le paragraphe ou l'étape finit sur une phrase-formule qui redit la consigne en proverbe, ou qui la
cache dans une devinette (« une séance tiède se paie autrement »). Personne ne parle comme ça à son voisin ; on l'entend
dans une publicité.

**Fréquence.** `controle.py` en voit 6 (« Maximes ») ; à la lecture, environ 18. Autres cas : 78:310 « Un pot coûte moins
cher qu'une évacuation » ; 68:358 « un thermomètre faux vérifié vaut un thermomètre juste » ; 70:405 « dans ce
chapitre-là, c'est presque tout ce qu'on demandait au thermomètre » ; 78:187 « Un autoclave n'est pas un appareil qu'on
laisse » ; 78:537 « **Un quartier d'orignal (*Alces americanus*) en novembre n'a jamais eu besoin d'un pot.** ».

**Exemples.**

1. `70:93` « Dans le doute, c'est **À CUIRE**. Une étiquette n'a jamais tué personne. »
   → « Dans le doute, on écrit À CUIRE. »
2. `70:192` « Une séance interrompue ne se paie qu'en goût ; une séance tiède se paie autrement. »
   → « Arrêter une séance en plein milieu ne change que le goût ; laisser la chambre tiédir, c'est laisser les
   bactéries se multiplier. »
3. `68:264` « **Au moindre doute sur une pièce : elle se jette. Une pièce de viande coûte moins cher qu'une
   évacuation.** »
   → « Au moindre doute, on jette la pièce. »
4. `68:491` « S'il n'en reste plus un seul au chalet, le 74 °C devient une opinion. »
   → « S'il ne reste plus un seul thermomètre à sonde au chalet, on n'a plus aucun moyen de savoir si la viande a
   atteint 74 °C à cœur. »
5. `70:202` « La fumée pique ; le monoxyde ne pique pas. »
   → « La fumée pique les yeux, mais le monoxyde ne pique pas, et on ne se rend compte de rien. »
6. `78:392` « Au chalet, le poêle ne tombe pas en panne, mais il faut quelqu'un devant : c'est le même risque payé
   autrement. »
   → « Au chalet, le poêle ne tombe pas en panne, mais quelqu'un doit rester devant. »

**Cause.** Skill `ecriture`, tableau « Les phrases », ligne « La chute en formule », et tableau du 15 octobre, ligne
« La maxime » ; `.claude/cadre-agents.md`, l. 99. Le script repère les « Un X qui… ne… plus » et quelques moules ; il ne
voit pas la devinette (« se paie autrement ») ni la formule de bilan (« coûte moins cher que »). Même pression que le
motif 3 : la phrase courte « percutante » du skill `editeur`.

### Motif 6. Les mots de rapport et de laboratoire, le nom latin, le mot fabriqué (moyenne)

**Ce que c'est.** Des mots qu'on lit dans un rapport et qu'on n'entend jamais au chalet : « assainit », « coagulation
des protéines », « calories protéiques », « consommateur », « immunodéprimée », « ensemencé », « dégradation
enzymatique », « contamination fongique », « toxinogène », « filière », « catégorie », « destination », « ordre
d'attribution », « maisonnée », « le cas échéant », « administrée en milieu hospitalier », « majoritairement »,
« dégaze », « se volatilise », « seuil » ; le nom latin de chaque bête et de chaque arbre ; et trois mots qui
n'existent pas : « ne se cuillère pas », « il amertume », « une saupoudrée ».

**Fréquence.** 75 noms latins (ch. 68 : 18 ; ch. 70 : 21 ; ch. 78 : 36) ; « seuil » 10 fois ; environ 35 mots de rapport
relevés à la lecture ; 3 mots fabriqués. `controle.py` en voit 14, dont 5 dans des citations.

**Exemples.**

1. `70:11` « Le fumage à froid traite une pièce **déjà salée** avec de la fumée à une température qui ne provoque pas de
   coagulation des protéines : il assèche et assainit la surface, freine le rancissement et donne le goût »
   → « Le fumage à froid, c'est mettre une pièce déjà salée dans la fumée sans la chauffer assez pour qu'elle cuise : la
   fumée sèche la surface, y tue des microbes, ralentit le rancissement et donne le goût »
2. `70:56` « Une personne enceinte, âgée ou immunodéprimée mange à la table. »
   → « Quelqu'un à la table est enceinte, âgé ou a un système immunitaire affaibli. »
3. `68:284` « Il se pèse et ne se cuillère pas, parce que le même volume de cristaux fins et de cristaux gros n'a pas la
   même masse. »
   → « On le pèse, on ne le mesure jamais à la cuillère, parce qu'une cuillerée de cristaux fins et une cuillerée de
   gros cristaux ne pèsent pas la même chose. »
4. `70:231` « Gratter le dépôt goudronneux des parois et des tringles — il rancit, il amertume la charge suivante et il
   porte la flore de la précédente. »
   → « Gratter le dépôt goudronneux des parois et des tringles : il rancit, il rend amère la charge suivante et il garde
   les microbes de la précédente. »
5. `70:262` « Dégradation enzymatique. Fréquent sur du poisson mis au fumoir trop longtemps après la sortie de l'eau
   (ch. 75) »
   → « Le poisson s'est défait par lui-même : ça arrive souvent quand il a attendu trop longtemps entre la sortie de
   l'eau et le fumoir (ch. 75) »
6. `70:142` « Bouleau à papier (*Betula papyrifera*), bouleau jaune (*Betula alleghaniensis*), érable à sucre (*Acer
   saccharum*), aulne rugueux (*Alnus incana* subsp. *rugosa*), cerisier de Virginie (*Prunus virginiana*). »
   → « Bouleau blanc, merisier, érable à sucre, aulne, cerisier de Virginie. » (« merisier » est le nom qu'on donne au
   bouleau jaune au Québec ; aucun arbre ne change.)

**Cause.** `.claude/cadre-agents.md`, l. 138 et 139 (« pas de mot de métier sans besoin, pas de "seuil", […] pas de nom
latin ») ; skill `ecriture`, règle 15 (« le mot qu'on dit, pas le mot qu'on écrit »). La liste « Mots de livre » de
`controle.py` est faite de mots de tous les registres soutenus (lorsque, afin de) ; elle ne connaît ni le vocabulaire
de laboratoire, ni les noms latins, ni « seuil », que le cadre interdit pourtant. L'habitude : le mot de la source passe
tel quel, et le mot fabriqué vient de la compression (« ne se cuillère pas » pour « ne se mesure pas à la cuillère »).

### Motif 7. L'image à la place de la chose : les portes, les filières, ce qui « se paie » (moyenne)

**Ce que c'est.** Une métaphore d'administration ou de commerce remplace le fait : une étape qui s'appelle « la porte
d'entrée », un tableau qui « ferme des portes », une « filière » qui est fermée, une dépense qui « se paie », un
argument qui « tombe », une fournée qui « se défend ». Le lecteur doit traduire l'image avant de savoir quoi faire. Un
titre d'étape qui est une image, c'est le défaut que JP a relevé dans « Quand l'utiliser » (« c'est pas humain »).

**Fréquence.** Environ 20 (portes et entrée : 6 ; « filière » : 4 ; « se paie », « payé », « se paye » : 5 ; « pari » :
2 ; « argument », « se défend », « deux métiers » : 3).

**Exemples.**

1. `68:93` « **1. Vérifier la porte d'entrée.** La pièce vient d'une bête refroidie à **7 °C dans les 24 premières
   heures**. »
   → « **1. Vérifier que la bête a refroidi à temps.** La pièce doit venir d'une bête refroidie à 7 °C dans les
   24 premières heures. »
2. `78:110` « **2. Vérifier qu'on a le droit d'entrer.** »
   → « **2. Vérifier que la viande ou le poisson a été refroidi à temps.** »
3. `78:33` « Tout ce qui est peu acide quand il n'y a pas d'autoclave : dans ce cas-là, la conserve n'est pas un choix
   médiocre, elle est **fermée**, et aucune durée de bouillon ne la rouvre. »
   → « Sans autoclave, on ne met pas en conserve un aliment peu acide, même en le faisant bouillir plus longtemps. »
4. `70:43` « Sans cette étape, la filière est fermée. »
   → « Sans ce gel, on ne fait pas de poisson fumé prêt à manger. »
5. `78:37` « Une petite quantité **au chalet**, enfin, parce que là la dépense se paie en bois : un cycle pour trois pots de
   perdrix demande le même feu tenu qu'une fournée pleine. À la maison, sur un rond de cuisinière, cet argument-là tombe
   et une petite fournée se défend. »
   → « Au chalet, on ne fait pas une petite quantité : trois pots demandent autant de bois qu'une fournée pleine. À la
   maison, sur un rond de cuisinière, on ne brûle pas de bois, et une petite fournée vaut la peine. »
6. `70:348` « La terre fait deux métiers en même temps : elle scelle, et c'est elle qui refroidit. »
   → « La terre bouche les fuites et refroidit la fumée en même temps. »

**Cause.** Skill `ecriture`, tableau « Les phrases », ligne « L'image, la petite scène, la personnification » ;
`CLAUDE.md`, « Saute : […] l'image poétique » ; `.claude/cadre-agents.md`, l. 141 (« Les titres de sous-sections sont
des noms de gestes ou de choses »). Ces images-là ne sont pas « poétiques » : elles sont administratives, et nos règles
pensent à l'image belle, pas à l'image de bureau. Aucune ne mentionne la porte, la filière ou le « se paie ».

### Motif 8. Le participe ou l'adjectif détaché en tête, et l'inversion (moyenne)

**Ce que c'est.** La phrase commence par un participe ou un adjectif détaché (« Trop plein, », « Posé au fond du
congélateur, », « Long et léger, ») qui porte une condition, ou par une construction absolue (« arêtes vives, la chambre
est… »), ou elle inverse le sujet (« Sous la tête… se cache un petit écrou »). À voix haute, on dit « si » ou « quand »,
et on met le sujet devant. Une fois sur trois, le participe ne se rattache même pas au bon sujet : « Trop chaud, on
rallonge » dit que c'est la personne qui a trop chaud.

**Fréquence.** Environ 14 (participe ou adjectif en tête : 9 ; construction absolue : 3 ; inversion : 2). Autres cas :
70:154 « Séché à fond, il couve sans flamber » ; 70:344 « Ouvert, le trou tire droit en l'air » ; 70:29 « Fumé à froid
puis cuit à 74 °C à cœur : c'est le cadre le plus sûr du chapitre » ; 68:419 « Vient ensuite le gros du sel ».

**Exemples.**

1. `70:119` « Trop chaud, on rallonge ou on enterre. »
   → « Si la fumée arrive trop chaude, on rallonge le conduit ou on l'enterre. »
2. `78:140` « Trop plein, le pot déborde en traitement et le joint se souille. Trop vide, l'air résiduel empêche le vide
   de se faire. »
   → « Si on remplit trop, le pot déborde pendant le traitement et salit le joint. Si on ne remplit pas assez, il reste
   trop d'air et le vide ne se fait pas. »
3. `70:412` « Posé au fond du congélateur, il se lit d'un coup de doigt : bloc dur, l'appareil passe sous le seuil ;
   encore en bouillie, il n'y est pas. »
   → « On met le pot au fond du congélateur et on le touche du doigt : s'il est pris en bloc dur, l'appareil descend
   sous -20 °C ; s'il est encore en bouillie, il n'y descend pas. »
4. `68:337` « Long et léger, il lit fin ; court et massif, il ne lit rien. »
   → « Plus le fléau est long et léger, plus il montre les petites différences de poids ; s'il est court et lourd, il ne
   les montre pas. »
5. `70:386` « Sous la tête de la plupart des cadrans se cache un petit écrou à six pans »
   → « La plupart des cadrans ont un petit écrou à six pans sous la tête »
6. `70:402` « Au fumoir, le cube posé sur un éclat de bois à hauteur des pièces devient une alarme muette : arêtes vives,
   la chambre est sous le point noté ; arêtes arrondies, elle l'a dépassé. »
   → « Au fumoir, on pose le cube sur un éclat de bois, à la hauteur des pièces, et on le surveille : tant que ses
   arêtes restent vives, la chambre est sous la température notée ; quand elles s'arrondissent, elle l'a dépassée. »

**Cause.** Skill `ecriture`, règle 0 (« pas de participe en chaîne ») ; rien sur le participe seul en tête, ni sur
l'inversion. La littérature est nette (`litterature/L2.md`, S4, manuel de radio : « Les phrases inversées sont une
habitude de l'écrit […] On ne dirait jamais "D'un naturel plutôt réservé, Mohammed préfère se taire". On ne parle pas
comme ça. »). L'habitude : la compression ; le participe épargne un « si on » et deux mots.

### Motif 9. La phrase sans verbe, l'étiquette (moyenne)

**Ce que c'est.** Une suite de noms ou de participes tient lieu de geste (« Pièce pendue, une ficelle par pièce, rien qui
se touche »), ou une étiquette de rapport ouvre la phrase (« *Mécanisme :* », « Conséquence non négociable : »,
« Destination par défaut de ce livre »). C'est le défaut que JP a relevé le 15 octobre (« Régler dehors : un bol qui
revient » : « personne parle comme ça »), revenu ici dans la prose et les étapes.

**Fréquence.** Une vingtaine hors tableaux (ch. 68 : 7 ; ch. 70 : 10, dont 5 « *Mécanisme :* » ; ch. 78 : 3). Autres
cas : 68:129 « Pièces à plat dans le contenant, gras vers le bas sauf la dernière, gras vers le haut. » ; 68:275
« **Conséquence, sans exception : […]** » ; 70:434 « Pièce sans planchette : **À CUIRE**. » ; 70:404 « **Ce qu'on
perd :** un seuil, pas une lecture. »

**Exemples.**

1. `68:167` « Pièce pendue, une ficelle par pièce, rien qui se touche, air qui circule des deux côtés. »
   → « Pendre chaque pièce à sa ficelle, sans qu'elles se touchent, pour que l'air passe des deux côtés. »
2. `68:194` « Rangement au froid, **au-dessus** des viandes crues et jamais en dessous, dans un contenant qui laisse
   respirer. »
   → « La ranger au froid, au-dessus des viandes crues, jamais en dessous, dans un contenant qui laisse passer l'air. »
3. `70:85` « Deux catégories, une seule ligne. »
   → « Il y a deux choix, et on en écrit un seul sur la pièce. »
4. `70:229` « Pièce non marquée : À CUIRE. »
   → « Une pièce qui n'est pas marquée, on la cuit. »
5. `70:443` « **Ce qu'on perd :** une barrière, et la couleur rose stable qui vient avec. Conséquence non négociable :
   **le produit est À CUIRE**, toujours, et la filière prêt-à-manger est fermée. »
   → « On perd une barrière, et la couleur rose qui tient avec elle. Le produit est donc toujours À CUIRE, et on ne fait
   rien de prêt à manger. »
6. `68:434` « Caisse préparée comme en 9.4, dans le caveau (ch. 79) ou dans le trou de froid du ch. 73, à un endroit qui
   se tient sous **4 °C** »
   → « Préparer une caisse comme en 9.4 et la mettre dans le caveau (ch. 79) ou dans le trou de froid (ch. 73), à un
   endroit qui reste sous 4 °C »

**Cause.** Skill `ecriture`, règle 0 (« un verbe qui dit le geste », « pas d'étiquette en raccourci ») et tableau
« Le code à déchiffrer ». Le gabarit d'origine (neuf sections, Danger avec « Mécanisme ») a posé les étiquettes ;
l'habitude de compresser a fait le reste. Le script ne cherche pas la phrase sans verbe.

### Motif 10. Les mots qui insistent (basse)

**Ce que c'est.** « Exactement », « précisément », « au sens exact », « la définition exacte », « sans exception »,
« non négociable », « sans discussion », « point. », « sans relâche ». Ils montent le ton sans ajouter de fait ; dans la
bouche d'un voisin, ils sonnent comme quelqu'un qui veut avoir raison.

**Fréquence.** 15 « exactement / précisément / au sens exact / définition exacte » ; 13 « sans exception / non
négociable / sans discussion / point / sans relâche / honnêtement ». `controle.py` les range dans « Mots vides » (154
avis sur le lot, trop pour qu'on les lise).

**Exemples.**

1. `68:125` « Insister là où l'os a été retiré, dans les replis, autour de l'articulation. C'est exactement là que ça
   tourne. »
   → « Insister là où l'os a été retiré, dans les replis et autour de l'articulation : c'est là que la viande tourne. »
2. `70:233` « Ne jamais remettre une pièce fumée sur une grille qui vient de porter une pièce crue : c'est de la
   contamination croisée au sens exact. »
   → « Ne jamais remettre une pièce fumée sur une grille qui vient de porter une pièce crue : les microbes de la pièce
   crue passeraient sur la pièce fumée. »
3. `70:492` « La filière prêt-à-manger reste fermée, point. »
   → « On ne fait donc pas de poisson fumé prêt à manger. »
4. `78:205` « Un anneau laissé en place tient mécaniquement un couvercle qui a lâché et cache exactement le défaut qu'on
   cherche à voir. »
   → « Un anneau qu'on laisse en place peut tenir un couvercle qui a lâché, et on ne voit plus le défaut qu'on cherche. »
5. `78:371` « Un cycle d'autoclave dure plus d'une heure : c'est exactement le genre de durée qui fait rentrer un brûleur
   au chaud quand il vente. »
   → « Un cycle d'autoclave dure plus d'une heure, et le brûleur reste dehors tout ce temps-là, même quand il vente. »

**Cause.** Skill `ecriture`, « Les mots », ligne « Les mots vides » (« exactement, précisément… ») ; rien sur « sans
exception », « non négociable », « point ». L'habitude d'IA : l'insistance remplace la raison.

## 4. Ce qui relie ces dix motifs

Les dix motifs ont une source commune : **le rédacteur écrit pour convaincre un lecteur sceptique, pas pour montrer un
geste à quelqu'un qui est là.** D'où la preuve entre guillemets (motif 4), la franchise annoncée (motif 2), l'insistance
(motif 10), l'objet qui « ment » ou « ne pardonne pas » pour faire peur (motif 1), l'opposition et la chute pour que ça
frappe (motifs 3 et 5). Quand le texte décrit ce qu'on fait de ses mains, ces tics disparaissent d'eux-mêmes (section 5).
La règle à écrire n'est donc pas une liste de mots de plus : c'est **parler à la personne qui fait le geste, et lui dire
ce qu'elle fait, ce qu'elle voit et pourquoi**, avec « on », « si », « quand », « parce que », « puis ».

Ce que nos règles et nos outils ne voient pas aujourd'hui :

1. **Le gabarit dicte la formule** : « Nommer honnêtement ce qu'on perd […] sans broder autour » (`gabarit-chapitre.md`,
   l. 111 et 112) est recopié dans les chapitres (« nommé honnêtement », « dit honnêtement », « que broder autour »).
   Une consigne au rédacteur ne doit pas se dire avec des mots qu'il pourrait recopier.
2. **La citation de source n'est pas comptée** : la règle existe (« Pas de citation de source »), aucun outil ne la
   vérifie ; 53 citations dans trois chapitres.
3. **La personnification est cherchée par une liste de verbes de l'esprit** ; mentir, dire, se moquer, commander,
   gouverner, pardonner (hors « le froid ne pardonne pas ») passent.
4. **L'opposition est cherchée sous deux formes** (« n'est pas X mais Y », « ne fait pas Y : il fait Z ») ; « X, pas
   Y » et « ce n'est pas X, c'est Y » passent.
5. **Les mots de laboratoire, le nom latin et « seuil »** sont interdits par le cadre, et la liste « Mots de livre » ne
   les contient pas.
6. **Le participe détaché en tête et l'inversion** n'ont pas de règle.
7. **Le skill `editeur` demande des phrases courtes « percutantes »** : c'est la porte d'entrée de la chute et de
   l'opposition.
8. **Un auditeur de voix** devrait lire une étape à voix haute en se demandant « est-ce que je le dirais comme ça à
   quelqu'un qui est à côté de moi ? », et chercher en plus : la chose sujet d'un verbe de personne ; le livre, le
   chapitre ou la version sujet d'une phrase ; « honnête », « sans détour », « en face » ; la citation entre guillemets ;
   le nom latin ; le participe en tête ; la phrase sans verbe. Le compte des « c'est » pris dans un moule (64 sur 121
   ici) est une bonne mesure de la voix fabriquée.

## 5. Ce qui marche (des modèles)

1. `78:184` « On corrige **avant** d'arriver : la pression continue de monter un moment après qu'on a retiré de la
   chaleur, et on commence à tirer la marmite vers le bord quand il manque encore une dizaine de kPa. »
   Pourquoi : « on » fait le geste ; la raison se dit comme on la dit, avec un verbe (« la pression continue de monter
   un moment ») ; le moment d'agir est un repère qu'on lit sur place ; les mots sont ceux du poêle (tirer la marmite vers
   le bord).
2. `78:516` « on écrase des pommettes, des pommes ou des petits fruits, on laisse le jus fermenter en alcool avec les
   levures déjà présentes sur les fruits, puis on laisse cet alcool à l'air libre, au tiède et à couvert d'un linge,
   jusqu'à ce qu'il tourne piquant. »
   Pourquoi : les gestes dans leur ordre, liés par « puis » et « jusqu'à ce que » ; la fin est ce qu'on sent (« il tourne
   piquant »), dans le mot qu'on emploie. C'est une recette qu'on donnerait de vive voix.
3. `78:440` « on le regarde à contre-jour, on doit voir le jour au travers, et on le débouche avec un fil fin ou une soie
   de brosse. »
   Pourquoi : un test qu'on fait à l'œil, dit avec les mots de l'atelier (« voir le jour au travers », « une soie de
   brosse ») ; trois gestes, un seul souffle. (Le début de la phrase, « L'évent se vérifie », est au pronominal : c'est
   l'affaire de l'auditeur de la consigne.)
4. `68:418` « En réduisant, la saumure dépose d'abord un tartre blanc qui colle au fond du chaudron : il y reste, on ne le
   racle pas dans le sel. »
   Pourquoi : ce qu'on voit (un tartre blanc qui colle), puis ce qu'on fait ; la négation sert, parce que le réflexe
   serait de racler. Même voix à 68:411 (« Jeter la glace, garder le liquide, recommencer tant que le froid tient. »).
5. `70:385` et `70:387` « Plonger la tige dans un verre de glace pilée noyée d'eau, brasser, attendre que l'aiguille
   s'arrête ; recommencer dans l'eau bouillante. » ; « on tient la tête d'une main, on tourne l'écrou de l'autre jusqu'à
   ce que l'aiguille tombe sur le point. »
   Pourquoi : des gestes vrais, à la bonne taille (brasser, attendre que l'aiguille s'arrête), et « d'une main… de
   l'autre » qu'on entend dans un garage. (Entre les deux, l'inversion « Sous la tête […] se cache un petit écrou » est
   le motif 8.)

## 6. Hors de mon regard (pour les autres auditeurs et la grande passe)

- Le lot n'a pas eu sa passe : 156 tirets, 30 « § », neuf sections avec « Pourquoi ça marche » et Danger, « Le bon
  choix » / « Le mauvais choix » en section 2, « village » (68:11, 68:36, 78:306), l'âge des enfants (78:309).
- La consigne au pronominal est partout (« se cuit ou se met en pot », 68:37 ; « Il se taille au couteau et il se
  jette », 68:99 ; « se congèle ou se cuit », 70:310) : regard « consigne ».
- Les répétitions de faits entre sections (le salpêtre dit trois fois au ch. 70 : étape 4, Danger 5, variante) : regard
  « densité ».
- Des renvois de services (« Consulter. Nommer le produit fumé au soignant », 70:268) contraires à « il n'y a personne à
  appeler » : regard du fond.

## 7. Liste de contrôle (ma partie du cadre : le texte et la langue)

Pour tout agent
- [x] `CLAUDE.md` chargé, pas relu ; le skill `ecriture` lu au complet, avec ses tableaux.
- [x] Règle 1 : aucune réécriture n'ajoute un fait ou un chiffre ; « merisier » nomme le même arbre.
- [x] Rien commité ; aucun fichier du livre touché ; seul ce fichier de notes est écrit.
- [x] Lu seulement le lot, les mesures, le cadre, les règles et une partie de `litterature/L2.md`.

La phrase (appliquée à mes réécritures, et relevée dans le lot)
- [x] Règle 0 : chaque réécriture se lit à voix haute du premier coup, avec un verbe et quelqu'un qui fait le geste.
- [x] Pas de loi en formule, pas de « d'où », pas de « X passe là où Y ne passe pas » dans les réécritures. Dans le lot :
  « d'où » à 78:85 (relevé par le script).
- [x] Pas de maxime ni de chute, pas d'opposition fabriquée, pas d'image : réécritures propres ; dans le lot, motifs 3, 5
  et 7.
- [x] Pas de chose qui pense, ment ou pardonne : réécritures propres ; dans le lot, motif 1 (environ 28).
- [x] Consigne jamais au pronominal dans les réécritures (« on le pèse », « on jette la pièce ») ; le lot en est plein
  (section 6).
- [x] Sujet nommé, ordre naturel, consigne dite comme une consigne : réécritures propres.
- [ ] Points de contrôle et signes d'échec à 5 à 8 lignes : hors de mon regard ; le lot en a 9 à 17 par tableau.
- [x] Le mot qu'on dit (règle 15) : c'est le sujet de l'audit ; « Mots de livre » de `controle.py` jugée (14 avis, dont 5
  dans des citations).
- [x] Pas de « seuil », pas de nom latin, pas de mot de métier sans besoin dans les réécritures ; dans le lot, motif 6.
- [x] Aucun tiret dans les réécritures (`controle.py` : 0) ; le lot en a 156 (hors de mon regard).
- [x] On nomme la chose au lieu du possessif : « le conduit », « la fumée », « le pot » dans les réécritures.

La langue
- [x] Réécritures passées à `langue.py` avec LanguageTool : 0 avis (un avis de virgule sur une première version, réglé
  en refaisant la phrase).
- [x] Français écrit correct, sans joual ni anglicisme ; « ça » et « c'est » seulement où on les dit.
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures.
