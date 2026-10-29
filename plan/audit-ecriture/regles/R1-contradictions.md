# R1 : nos règles d'écriture, leurs contradictions et leurs effets (28 octobre 2026)

Mandat : lire toutes les règles d'écriture du projet, trouver celles qui se contredisent, celles qui, appliquées à la
lettre, font le mauvais tempo, et celles qui sont mortes ou dépassées ; montrer chaque effet par une phrase réelle du
livre. Aucun fichier existant n'a été modifié.

Lu au complet : `CLAUDE.md`, `.claude/cadre-agents.md`, `.claude/skills/ecriture/SKILL.md`,
`.claude/skills/ecriture/scripts/controle.py`, `.claude/skills/editeur/SKILL.md`, `.claude/skills/langue/SKILL.md`,
`gabarit-chapitre.md`, `roles.md`, `plan/decisions-jp.md`, `plan/demandes-jp-epreuve-tome-1.md`,
`plan/audit-ecriture/mesures.md`, et la section « Où nos règles vont contre la littérature » de L1 à L4. Mesures :
`tempo.py` sur les versions passées des pages (git), et un petit extracteur de phrases (lignes jointes, pour trouver les
exemples) gardé hors du dépôt.

Les notes L1 à L4 comparent nos règles à la littérature. Ces notes-ci les comparent **entre elles** et à leurs
**effets mesurés** ; quand un point recoupe L1 à L4, je le dis et je n'en garde que ce qui est neuf.

---

## 1. Le diagnostic en six points

1. **Toutes nos règles de style portent sur la phrase et sur le mot ; aucune sur le paragraphe.** La seule règle de
   paragraphe est une ligne du tableau du 15 octobre (les « paraboles »), et son exemple corrigé joint ses faits par
   des deux-points. Or JP se plaignait déjà du paragraphe le 15 octobre (« c'est la façon que le paragraphe est
   organisé ») : le « tempo du paragraphe » du 28 octobre est la même plainte, traduite deux semaines plus tôt en
   interdictions de mots.
2. **Une vingtaine de règles coupent ; une seule protège le lien, et elle a perdu.** La règle 10 du skill (« La phrase
   garde ses articles et ses liaisons ») est la seule qui parle des liens. Le test « mot à mot », la liste des mots
   vides, la densité, les plafonds de mots, la « justification collée au geste », la « conséquence évidente » et la
   liste de remplacement du tiret poussent toutes dans l'autre sens. Le livre a 14,2 deux-points pour 1000 mots et
   0,83 « parce que », 0,64 « mais », 0,54 « donc », 0,24 « alors » (tout le texte des chapitres et des dangers).
3. **Deux règles se contredisent, et le rédacteur les réconcilie avec un deux-points.** « Une phrase, une information »
   et « chaque mécanisme dit ce qu'il change à l'étape » ne peuvent pas tenir ensemble sans un joint : le joint choisi
   est le deux-points, qui garde une seule phrase à l'œil et en fait deux à l'oreille. C'est la phrase « fait :
   conséquence » (au tome 1, 24,4 % de toutes les phrases sont des phrases de prose avec un deux-points ; les étiquettes
   du Matériel et des étapes n'en ajoutent que 6 %).
4. **Les corrections de JP perdent leur condition en devenant des règles.** « L'opposition fabriquée, quand elle
   n'ajoute pas un fait » devient « l'opposition fabriquée » ; « la justification que le lecteur connaît déjà » devient
   aussi « la justification collée au geste » ; « 4 fois Claude dans un texte qui présente » devient « un nom ne revient
   pas » ; « le regard qualité, c'est JP » sur les images devient « l'image ou la page ». Sans sa condition, chaque règle
   coupe plus large que ce que JP visait.
5. **La correction se fait par substitution de fragments, et le fragment devient la règle.** Le paragraphe du monoxyde a
   été corrigé dans le même commit (`3b26fb90`) que la table « On l'écrit / On le dit » : chaque ligne de la table est
   un morceau du paragraphe. Personne n'a relu le paragraphe entier ; JP l'a fait, sur papier.
6. **Les règles sont écrites dans le style qu'elles combattent.** Mesure `tempo.py` : `cadre-agents.md` a 78,6 % de
   phrases avec deux-points et 70,2 % en « fait : conséquence » ; le skill `ecriture`, 39,9 % et 27,7 % ; `CLAUDE.md`,
   40,9 % et 30,3 % ; le livre, 31,4 % et 23,7 %. Chaque agent lit le cadre au complet avant d'écrire : c'est le texte
   qu'il a lu le plus souvent, et il l'imite.

---

## 2. Comment des règles font un paragraphe : le monoxyde, version par version

La partie « Ce qui arrive » du danger du monoxyde (`dangers/partie-1.md`), à trois moments :

| Version | Ce qui a agi | Le texte |
| --- | --- | --- |
| `e8a62b2a` (28 octobre, avant la condensation) | rien de neuf | « … Une fois respiré, il se fixe sur l'hémoglobine du sang, qui l'attire 200 à 250 fois plus que l'oxygène. Le sang continue de circuler, **mais** il n'apporte plus d'oxygène aux organes. On ne suffoque pas et on ne tousse pas. On a mal à la tête, on a sommeil, et on s'endort au lieu de sortir. » |
| `3cc726bd` (28 octobre, condensé) | « 150 à 230 mots » (CLAUDE.md) ; « Ce qui arrive (le mécanisme, en deux ou trois phrases) » (skill `editeur`, l. 48) | « Les flammes et les moteurs produisent du monoxyde de carbone quand l'air leur manque : le poêle qu'on étouffe pour la nuit, la braise, le barbecue, le réchaud, le fanal. Le gaz n'a ni odeur ni couleur et prend la place de l'oxygène dans le sang : on a sommeil, et on s'endort au lieu de sortir. Il se mêle à tout l'air de la pièce : dormir par terre ne protège pas. » |
| `3b26fb90` (28 octobre, règle 15) | substitution de fragments ; quatre lignes ajoutées à la table de la règle 15 dans le même commit | « Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus quand on ferme presque l'entrée d'air pour la nuit. Le gaz ne se voit pas et ne se sent pas. Il prend la place de l'oxygène dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans toute la pièce, jusqu'au plancher : se coucher par terre ne protège pas. » |

`tempo.py` sur toute l'entrée du monoxyde (« Ce qui arrive », « Comment on le reconnaît », « Ce qu'on fait ») :

| | mots | m/phr | variation | « fait : csq » % | ; /1000 | liaisons /1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- |
| avant la condensation (`e8a62b2a`) | 668 | 19,6 | 0,67 | 8,8 | 4,5 | 4,5 | 6,1 |
| aujourd'hui | 293 | 16,3 | 0,55 | 16,7 | 0,0 | **0,0** | 11,8 |

La condensation a gardé les faits (vérifiés par agents) et a enlevé tout ce qui n'est pas un fait : le « mais », les
points-virgules, la phrase « On ne suffoque pas et on ne tousse pas » (le réflexe qu'on attend et qui ne vient pas),
et le rythme en trois temps « On a mal à la tête, on a sommeil, et on s'endort ». Le compte de phrases imposé par
l'éditeur a fait le reste : **31 des 36 paragraphes « Ce qui arrive » des pages des dangers ont exactement deux ou trois
phrases**, et 33 % de leurs phrases ont un deux-points (17,6 % pour l'ensemble des pages des dangers).

Honnêteté sur la portée : sur l'ensemble des pages des dangers, la condensation n'a presque pas changé les moyennes
(16,1 % de « fait : conséquence » avant, 17,7 % après). Le monoxyde est le cas où elle a frappé le plus fort, et c'est
celui que JP a lu.

---

## 3. Les règles qui se contredisent

### C1. « Une phrase, une information » contre « chaque mécanisme dit ce qu'il change »

- `.claude/skills/ecriture/SKILL.md`, l. 77 : « **Une phrase, une information.** Deux faits, deux phrases. »
- Même fichier, l. 335 (paraboles) : « Chaque mécanisme est suivi de ce qu'il change dans la procédure […] ; on passe
  d'un mécanisme à l'autre par un lien qui se lit » ; cadre, l. 96-97 : « chaque mécanisme dit ce qu'il change à
  l'étape ».
- Même fichier, l. 95, règle 10 : « La phrase garde ses articles et ses liaisons. »

Un mécanisme et ce qu'il change sont deux faits. La règle 1 les veut dans deux phrases, la règle des paraboles les veut
liés. Le modèle donné par la règle des paraboles tranche avec un deux-points : « La perte de chaleur d'une maison est
proportionnelle à l'écart de température avec l'extérieur et à la surface exposée : regrouper la famille dans une
seule pièce […] réduit la surface à chauffer (étape 7). » Le rédacteur copie le modèle.

Effet (ch. 10, la même phrase avant le skill et aujourd'hui) :
- avant (`bc816f4f`) : « Une eau chlorée dans les règles tient plus longtemps, **parce qu'**il lui reste un résiduel
  (section 9). »
- après la passe du skill (`937d8531`) : « Une eau chlorée dans les règles tient plus longtemps **:** il lui reste un
  résiduel (section 9). »
- aujourd'hui : « L'eau chlorée comme aux étapes 20 à 22 reste bonne plus longtemps : il lui reste du chlore, qui tue
  les microbes qui entrent dans le contenant. »

Recommandation : **réécrire.** Deux règles selon le texte. Dans une étape : un geste par phrase. Dans un texte qui
explique : une idée par phrase, et deux faits dont l'un cause l'autre vont dans la même phrase avec le mot qui dit le
lien (parce que, donc, alors, sinon, comme), ou dans deux phrases dont la seconde commence par ce mot. Le modèle des
paraboles se refait sans deux-points. Rejoint L1 (C1), L2 (3), L3 (1), L4.

> L'eau chlorée comme aux étapes 20 à 22 reste bonne plus longtemps, parce qu'il lui reste du chlore pour tuer les
> microbes qui entrent dans le contenant.

### C2. « La raison seulement si elle change ce qu'on fait » contre « le pourquoi » partout ailleurs

- Skill, l. 78 : « **Le fait d'abord, la raison ensuite**, et seulement si la raison change ce qu'on fait. » Exemple :
  « Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant. »
- Skill, tableau « Les phrases », l. 188 : « La justification collée au geste | « Ne pas rester dans l'auto : la tôle
  n'arrête rien. » | « Entrer dans un bâtiment. » »
- Contre : `CLAUDE.md`, l. 190 et suivantes, « le but est dit quand il n'est pas évident » ; la série orange,
  « chaque étape porte son geste, son pourquoi » ; `gabarit-chapitre.md`, l. 96-97, « Le lecteur change de
  comportement quand il comprend pourquoi » ; JP le 16 octobre, sur le message texte : « parle pas de même, **explique
  pourquoi** ».
- Et deux modèles pour le même geste dans le même skill : la règle 2 joint le fait et sa cause par un deux-points ; la
  ligne de l'opposition fabriquée (l. 183) écrit « Un tuyau fend **parce que** l'eau prend du volume en gelant. »

Le rédacteur ne sait pas si la raison est permise. Il la garde, parce que JP la demande, mais il la colle en queue après
un deux-points, parce que c'est la forme des exemples. Ch. 4, étape 3 (série orange) : « Ne pas repartir avant de voir
clair : les autres conducteurs sont aveuglés aussi, et les routes se remplissent d'accidents. Ensuite, entrer dans un
bâtiment (étape 4) : une auto divise la dose par moins de 2. » La ligne « justification collée au geste » aurait coupé
la seconde raison ; c'est pourtant le fait qui surprend (le réflexe est de rester dans l'auto).

Et quand la ligne est appliquée, elle coupe le mécanisme qui surprend. Ch. 3, passe de style du 15 octobre :
- avant : « Un fil au sol, un poteau brisé, un arbre sur la ligne : personne ne s'approche », puis, après un tiret,
  « un fil tombé met le sol autour de lui sous tension et ne fait aucun bruit, donc il n'y a rien à voir venir et
  rien à entendre. » ;
- après : « Un fil au sol, un poteau brisé, un arbre sur la ligne : personne ne s'approche. »

Recommandation : **réécrire.** Une seule règle : le but va devant, avec « pour » ; la raison vient après le geste, avec
« parce que » ou « sinon », ou dans la phrase suivante ; elle se coupe seulement quand le lecteur la sait déjà (la
condition de JP, « on le sait »). La ligne « justification collée au geste » sort, ou prend cette condition. Rejoint L2
(1), L3 (2, 6).

> Ne pas repartir avant de voir clair, parce que les autres conducteurs sont aveuglés aussi et que les routes se
> remplissent d'accidents. Ensuite, entrer dans un bâtiment (étape 4) ; dans une auto, la dose n'est même pas divisée
> par 2.

### C3. Le tiret banni, remplacé d'abord par la virgule et les deux-points

- `CLAUDE.md`, l. 207 : « **Pas de tiret (— ou –) dans une phrase** : virgule, deux-points, parenthèses ou point. »
- Skill, l. 270-282 : la même liste, avec l'exemple « Une seule règle : la génératrice dehors. »
- JP, 15 octobre : « Enlève les — partout aussi : y a juste les AI qui mettent ça dans des phrases. » JP n'a demandé ni
  deux-points ni virgule ; la liste de remplacement est de nous.

Ce que la passe a fait, ch. 3 (`3be63c94^` contre `aadf53c5`) :
- « Monter le feu […] avec assez d'air pour que les flammes restent vives **—** la combustion complète fume moins et
  encrasse moins la cheminée. » devient « … restent vives **:** la combustion complète fume moins… »
- « En installer un […] près de la porte du garage attenant s'il y en a un **—** c'est par cette porte-là que le gaz
  […] entre dans la maison. » devient « … attenant **:** le gaz d'un moteur qui y tourne, même peu de temps, entre par
  cette porte. » (aujourd'hui, ch. 3, étape 5 : « le poser près de la porte du garage attenant : le gaz d'un moteur qui
  tourne dans le garage entre par cette porte. »)

Mesure de la passe de style sur deux chapitres (avant le skill, puis après sa première passe) :

| | « fait : csq » % | liaisons /1000 | monotonie % | même début % |
| --- | --- | --- | --- | --- |
| ch. 3 avant (`3be63c94^`) → après (`aadf53c5`) | 23,6 → 26,2 | 6,5 → 5,4 | 18,6 → 23,8 | 4,8 → 5,7 |
| ch. 10 avant (`bc816f4f`) → après (`937d8531`) | 26,0 → 28,9 | 6,9 → 5,0 | 20,3 → 22,3 | 4,4 → 8,1 |

L2 a montré que l'habitude du deux-points précède la passe des tirets (30,7 % de phrases à deux-points avant). La
règle ne l'a pas créée ; elle l'a nourrie, dans les deux chapitres mesurés.

Recommandation : **réécrire** la liste, **garder** l'interdiction. Ordre : récrire la phrase avec le mot de liaison
(parce que, donc, alors, mais, quand) ; sinon le point ; sinon la virgule ou la parenthèse. Le deux-points annonce
seulement (une liste, une mesure, ce qu'on lit sur une étiquette). Rejoint L1 (C2), L2 (2), L3 (3), L4.

> Monter le feu avec du bois sec et de petites bûches, et lui laisser assez d'air pour que les flammes restent vives,
> parce qu'un feu qui brûle bien fume moins et encrasse moins la cheminée.

### C4. Le test « mot à mot » et les mots vides contre la règle 10

- `CLAUDE.md`, l. 195-201 : « le complément qui décore, l'adjectif qui redit le nom, « déjà », « encore », « tout ».
  Le test : sans la phrase ou le mot, le lecteur sait-il moins quoi faire ? » ; skill, l. 49 : « Pour chaque phrase,
  puis pour chaque mot ».
- Skill, l. 202, et `controle.py`, l. 19-21 (`MOTS_VIDES`) : « déjà, encore, tout, toute, tous, toutes, bien, […] en
  effet, ainsi, d'ailleurs, en réalité, justement ». `LIVRESQUE`, l. 69 : « par ailleurs, en outre → (rien) ».
- Contre : skill, l. 95, règle 10, « La phrase garde ses articles et ses liaisons. Couper n'est pas compresser. »

Un « parce que », un « donc », un « encore » n'apprennent aucun fait : le test les condamne, et la liste les signale.
La règle 10 les défend, mais elle n'a ni exemple, ni liste, ni alarme dans le script.

Effets (ch. 3 et ch. 10, passe de style du 15 octobre) :
- « la maison est **encore** au-dessus de 10 °C et la courbe descend lentement » devient « la maison est au-dessus de
  10 °C et la courbe descend lentement » : le « encore » disait que ça va changer.
- « À −35 °C au thermomètre avec du vent, on est **déjà** dans la deuxième colonne » devient « on est dans la deuxième
  tranche » : le « déjà » disait qu'il n'en faut pas plus.
- « Ce n'est **donc** pas une méthode de fond : c'est un dépannage de quelques jours, et **c'est pour ça que** la javel
  et la marmite restent les deux moyens du chalet. » devient « … c'est un dépannage de quelques jours, et la javel et la
  marmite restent les deux moyens du chalet. »
- « Un stérilisateur UV couvre « bactéries, virus et protozoaires », **donc** plus large que le chlore » devient « Un
  stérilisateur UV traite les bactéries, les virus et les protozoaires, plus large que le chlore » : sans « donc »,
  « plus large » ne se rattache plus à rien.

Et le bruit : sur `dangers/partie-1.md`, `controle.py` donne 24 « mots vides » à juger, dont « Sortir **tout** le
monde », « la moitié du gaz est **encore** dans son sang », « La fumée arrive **bien** avant les flammes », « il va
prendre feu **tout** seul », et une « tournure » pour « sans chercher **d'où** vient le gaz ». Aucun n'est vide. Un agent
qui doit « juger » 48 avis par chapitre (ch. 3) finit par couper.

Recommandation : **réécrire.** Le test vise les faits, les phrases et les mots qui décorent. Un mot qui dit le lien
entre deux faits, ou qui change la valeur d'un fait (« encore », « déjà », « tout seul », « bien avant »), passe un autre
test : sans lui, le lecteur comprend-il aussi vite le rapport ou le moment ? `MOTS_VIDES` garde seulement les
adverbes d'insistance (vraiment, simplement, exactement, précisément, littéralement, carrément, absolument, en
réalité) ; « par ailleurs, en outre » deviennent « et, aussi », pas « rien ». Et le script gagne l'alarme contraire :
un paragraphe de trois phrases ou plus sans aucun mot de liaison. Rejoint L1 (C3), L2 (4), L3 (4, 5), L4.

### C5. Les plafonds de mots et de phrases contre « le nombre de mots peut monter »

- `CLAUDE.md`, l. 95, règle 5 : « **Écrire dense** » ; `roles.md`, l. 38 et 106 : « ~700 mots utiles par page » ;
  `gabarit-chapitre.md`, l. 174 : « Environ 700 mots utiles par page en 8 × 10 » ; `CLAUDE.md`, l. 120 : « 150 à 230
  mots » par danger ; skill `editeur`, l. 48 : « Ce qui arrive (le mécanisme, **en deux ou trois phrases**) » ; skill
  `ecriture`, l. 373 : « **Le rapport** : mots avant et après, tirets avant et après ».
- Contre : skill `ecriture`, l. 320 : « Elle mesure la clarté (règle 0). Chaque phrase se lit à voix haute ; **le
  nombre de mots peut monter**. » ; règle 0, l. 74-75 : « elle se réécrit, même si elle devient plus longue ».

Le skill dit que le compte de mots n'est pas la mesure, et son propre rapport le demande ; les messages de commit en
font la réussite (« 9 165 → 7 565 mots, 74 → 2 tirets », « 8 313 mots au lieu de 9 827 »). Sous un plafond, les mots
les moins chers à couper sont ceux qui n'apportent pas de fait : les liens. Effet : la section 2 plus haut (le
monoxyde, liaisons 4,5 → 0 pour 1000 mots) ; et le compte de phrases de l'éditeur, suivi à la lettre dans 31
paragraphes sur 36.

Recommandation : **réécrire.** « Dense » veut dire « sans phrase vide », pas « sans mot de lien ». Pour tenir une limite
décidée par JP (150 à 230 mots, 5 à 8 lignes), on coupe un fait de moindre poids ou un exemple, jamais un lien ni une
virgule de souffle. Le compte de phrases (« deux ou trois phrases ») sort : la règle dit ce que la partie contient. Le
rapport donne le tempo avant et après (`tempo.py`), pas les mots. Les « ~700 mots par page » sortent (format changé,
et c'est une cible de compression). Rejoint L1 (C7), L2 (5), L4.

### C6. Le fait qui surprend n'a plus de forme permise

- `CLAUDE.md`, « Le lecteur est un parent compétent » : reste « le fait qui **surprendrait** un parent compétent parce
  que le réflexe normal est le mauvais ».
- Contre, quatre règles qui ferment chacune une forme : skill, l. 90, règle 8, « **Dire ce qui marche, pas ce qui ne
  marche pas** » ; `CLAUDE.md`, l. 199, « l'opposition fabriquée » (sans condition) ; cadre, l. 143, « pas de « X ne
  fait pas Y : il fait Z » » ; `controle.py`, l. 28, le motif `pas … mais` signalé comme opposition.
- La condition d'origine : `plan/decisions-jp.md`, l. 278-279, « l'opposition fabriquée (« pas X, mais Y » […])
  **quand elle n'ajoute pas un fait** ». Elle s'est perdue au passage dans le skill, puis dans CLAUDE.md allégé.
- Et `controle.py` se contredit lui-même : `LIVRESQUE` (l. 61) remplace « cependant, toutefois, néanmoins » par
  « mais », et `RELIEF` (l. 28) signale « pas … mais ».

Corriger un réflexe, c'est dire ce que le lecteur croit et le retourner ; toutes les formes de ce geste sont
signalées. Ce qui reste, c'est la négation collée en queue. Monoxyde : « Il se répand dans toute la pièce, jusqu'au
plancher : se coucher par terre ne protège pas. » Et la condensation a coupé « On ne suffoque pas et on ne tousse pas »,
le seul passage qui disait pourquoi on ne sort pas (on attend d'étouffer, et ça ne vient pas). Le livre a 0,64 « mais »
pour 1000 mots.

Recommandation : **réécrire.** Remettre la condition de JP : sort l'opposition qui contredit une chose que personne ne
croit ; reste le contraste qui corrige un réflexe réel, dit avec « mais » ou « même ». Le motif `pas … mais` sort du
script, ou se limite à « X n'est pas Y, mais Z » en tête de phrase. La règle 8 garde son cas d'origine (la liste de ce
qui ne va pas au feu) et ne s'étend pas au fait qui surprend. Rejoint L3 (9), L4.

> Il se répand dans toute la pièce, jusqu'au plancher, alors se coucher par terre ne protège pas.

### C7. « Un nom ne revient pas » contre « le mot exact, et toujours le même »

- Cadre, l. 159, et skill, l. 227 : « **Un nom ne revient pas à chaque phrase** » (JP, 19 octobre, sur le texte des
  auteurs au dos : « 4 fois Claude en un paragraphe »).
- Skill, l. 86, règle 6 : « **Le mot exact, et toujours le même.** […] on ne varie pas les synonymes ».

Pas le nom, pas de synonyme : il reste le pronom, à chaque phrase. Monoxyde : « Le gaz ne se voit pas […]. Il prend la
place […]. Il se répand […]. » (3 phrases sur 4 commencent par « Le » ou « Il » ; « même début » à 66,7 % dans
`tempo.py`). Ch. 18, la cendre : « il est alcalin, et il dégraisse. Il lave la vaisselle […]. Il est dur pour la
peau […] ». Honnêteté sur la portée : dans les paragraphes de prose du tome 1, seulement 6 alignent quatre phrases qui
commencent par un article ou un pronom ; le défaut est réel, pas massif.

Recommandation : **réécrire** (restreindre). La règle vaut pour le texte qui présente une personne (son cas
d'origine). Pour une chose, le sujet du paragraphe peut revenir, par son nom ou par « ce gaz » ; ce qui sort, c'est la
même attaque à chaque phrase. On varie l'entrée (un lien, un complément de lieu ou de temps, une phrase détachée),
jamais le mot. Rejoint L2 (8), L3 (7), L4.

### C8. « Pas de détour par « on a envie de » » contre « on a envie de dormir »

- Skill, l. 114, règle 12 : « **Pas de détour par la tentation ou le sentiment** (« on est tenté de », « on a envie
  de ») ».
- Skill, l. 151, table de la règle 15 : « on a sommeil ; la somnolence | **on a envie de dormir** ».

Un agent qui applique la règle 12 à la lettre raye ce que la règle 15 prescrit. La page du monoxyde a fini sans l'un ni
l'autre : « on s'endort sans s'en rendre compte, au lieu de sortir », une phrase à deux queues (deux compléments à la
suite après le verbe). La règle 12 visait un paragraphe qui ne menait à aucun geste (« On est tenté de mettre la
génératrice au garage… »), pas l'expression.

Recommandation : **réécrire** la règle 12 : sort le détour qui ne mène à aucun geste ; un sentiment qui est un signe (avoir
envie de dormir, avoir froid) reste, c'est un fait.

### C9. Trois modèles pour une seule phrase, et chacun enfreint une autre règle

Le fait « le monoxyde ne se voit pas, ne se sent pas, et on s'endort » a trois modèles dans nos règles :
- `CLAUDE.md`, l. 64 : « Le monoxyde de carbone n'a ni odeur ni couleur, **tu** t'endors au lieu de sortir » : le
  tutoiement, que la règle 6 de `CLAUDE.md` (l. 96) interdit, dans la phrase même qui sert de modèle.
- Skill, l. 304 : « Le monoxyde n'a ni odeur ni couleur, on s'endort au lieu de sortir. » : la forme que la règle 15
  (l. 164) donne comme « mot qu'on écrit ».
- Skill, l. 164 : « le gaz ne se voit pas et ne se sent pas » : un pronominal où quelqu'un voit et sent, quand
  `CLAUDE.md`, l. 205, dit « **Jamais au pronominal** quand quelqu'un fait le geste ». Même famille dans le gabarit,
  l. 50 : « **Thermomètre à sonde** : porte les 74 °C à cœur. **Ne se fabrique pas.** »

Effet : « Le gaz ne se voit pas et ne se sent pas. » est dans la page imprimée. La règle du pronominal parle de la
consigne (« on doit le cuire », pas « il se cuit ») ; son texte dit « quand quelqu'un fait le geste », ce qui couvre
aussi voir et sentir. Le flou permet les deux lectures.

Recommandation : **réécrire.** Un seul modèle, le même dans `CLAUDE.md` et le skill, sans tutoiement : « Ce gaz, on ne
le voit pas et on ne le sent pas » ou « On ne voit pas ce gaz et on ne le sent pas ». Préciser la règle : jamais de
pronominal pour une consigne ; dans une description, la personne qui voit, sent ou fait est le sujet ; « se » reste
quand la chose agit seule. Le gabarit corrige son exemple (« On ne peut pas le fabriquer. »). Rejoint L2 (6).

### C10. La règle 15 a entendu « le mot » quand JP a dit « la façon »

- JP, 28 octobre : « On a sommeil, qui qui dit ça dans vrai vie, **la façon que tu écris** c'est pas bon ».
- Skill, l. 142 : « **Le mot qu'on dit, pas le mot qu'on écrit.** » ; la table « On l'écrit / On le dit », l. 149-166 ;
  `controle.py`, `LIVRESQUE`, 43 entrées.

La règle a pris la plainte au niveau du mot, et l'a outillée par une table de remplacements. Le commit `3b26fb90` a
réécrit le paragraphe du monoxyde fragment par fragment et a versé chaque fragment dans la table : « le poêle en fait
plus quand on ferme presque l'entrée d'air », « le gaz ne se voit pas et ne se sent pas », « il se répand dans toute la
pièce, jusqu'au plancher », « sans s'en rendre compte ». Les quatre phrases du paragraphe imprimé portent chacune une
ligne de la table. Personne n'a relu le paragraphe entier : JP l'a fait, et c'est le tempo qu'il a entendu. La table
apprend aussi un mot de trop : « tout » (dans « toute la pièce ») est dans `MOTS_VIDES`.

Recommandation : **réécrire** la règle 15 pour couvrir la façon (l'ordre, le lien, le tour de phrase), et **déplacer**
la table vers la liste de l'auditeur qui écoute les mots ; elle n'est plus un modèle de phrase. Une correction de JP
entre dans le skill comme un principe avec son exemple de paragraphe entier, jamais comme un fragment à substituer.

### C11. « La langue parlée ne s'écrit pas » contre « le mot qu'on dit »

- Skill `langue`, l. 28 : « **Le joual et la langue parlée ne s'écrivent pas** ».
- Skill `ecriture`, règle 15, et `CLAUDE.md`, l. 190 : « On écrit comme on l'expliquerait à quelqu'un, à voix haute. »
- Skill `langue`, l. 153, propose « à défaut » comme remède aux deux « ou » ; `controle.py`, l. 55, signale « à
  défaut » comme mot de livre (→ « sinon ») ; la table de la règle 15, l. 162, aussi.

Le correcteur passe après l'écrivain. Avec « la langue parlée ne s'écrit pas », il peut défaire ce que la règle 15
demande : la phrase détachée (« Ce gaz, on ne le voit pas »), « c'est pour ça que », « alors » en tête, « ça ». La
frontière n'est tracée nulle part : le skill `langue` donne la liste du joual (« pu », « y », « ça fait que »,
« pogner »), pas celle du français parlé correct. Pas encore d'exemple d'un correcteur qui défait un tour parlé
(la passe du correcteur commence) ; la contradiction sur « à défaut », elle, est déjà dans les fichiers.

Recommandation : **réécrire** la ligne du registre : « Le joual ne s'écrit pas (liste). Le français parlé correct
s'écrit : la phrase détachée, « c'est pour ça que », « alors », « comme » en tête, « ça ». » Retirer « à défaut » des
remèdes de la section 10. Rejoint L2 (10), L3.

### C12. La seule règle de rythme est dans le skill qui perd les conflits

- Skill `editeur`, l. 21-22, le texte que JP a donné le 28 octobre : « alterne phrases courtes (percutantes) et
  phrases longues (rythmées). Accorde une attention critique à l'**euphonie**. »
- Même skill, description : « Les skills ecriture […] et langue […] **priment** sur ce skill en cas de conflit. »
- Même skill, l. 26-27 : « `/polir` : […] tout en **conservant les mots d'origine** », contre la règle 15 qui demande de
  changer le mot.
- Même skill, l. 12 et 30-31 : « spécialisé dans la haute littérature française », « `/sublimer` […] une version plus
  lyrique », contre le skill `ecriture` (pas d'image, pas de chute).

C'est la seule phrase de tout le système qui parle du rythme et du son, et elle vient de JP. L'adaptation au livre
(l. 35-68) n'en garde rien : son tableau ne contient que des coupes. En cas de conflit, « Une phrase, une information »
l'emporte. Effet : le ch. 3, refait au complet par la chaîne avec l'éditeur le 28 octobre (`3cc726bd`), sort à 37,6 %
de phrases à deux-points et 30,0 % de « fait : conséquence » (mesures.md), au-dessus de la moyenne du livre.

Recommandation : **réécrire.** Le rythme (alterner les longueurs, lier, l'oreille) passe dans le skill `ecriture` comme
principe, avant les listes. L'éditeur devient un éditeur de prose pratique : `/polir` peut changer un mot quand ce
n'est pas celui qu'on dit ; `/sublimer` sort ou ne garde qu'une version « parlée » à côté de l'actuelle. « Percutantes »
sort (il appelle la chute). Rejoint L1 (C6), L4.

### C13. « Sans tour de relecture d'agents » contre « un éditeur qui n'a pas écrit la page », et contre les auditeurs

- `CLAUDE.md`, l. 239-240 : « **Le regard qualité, c'est JP** : on lui montre l'image ou la page dès qu'elle est faite,
  sans tour de relecture d'agents de plus » ; cadre, l. 273 : « Pas de tour de relecture par agents : le regard qualité,
  c'est JP. »
- Contre : skill `ecriture`, l. 342 : « **Toute page écrite par un agent passe ensuite par un éditeur qui ne l'a pas
  écrite** » ; cadre, l. 145, même chose ; `CLAUDE.md`, l. 232-233 : « Un rédacteur qui se relit lui-même trouve ce
  qu'il a voulu écrire, pas ce qu'il a écrit. »
- Et JP, 28 octobre : « réécrit le skill […] **en ajoutant des auditeurs** ».

D'où vient la règle : JP, 19 octobre, sur les **planches** (« c'est moi le regard qualité » ; « 4 M de jetons pour 6
planches, sérieusement ? »). Le cadre l'a notée ce jour-là pour l'image (`c0eb3583` : « on lui montre l'image dès
qu'elle est faite ») ; `CLAUDE.md` allégé l'a étendue à « l'image ou la page » le 20 octobre (`62c3a564`). Effet :
aucun rôle de la chaîne n'a le tempo pour mission, et ce qui n'est la mission de personne est trouvé par JP, sur une
épreuve payée.

Recommandation : **réécrire.** « Le regard qualité final, c'est JP. Pour le texte, des auditeurs qui n'ont pas écrit la
page passent avant qu'on la lui montre : un seul tour, une question chacun, un rapport court, sans réécrire. Pour les
planches, la règle du 19 octobre tient (un seul tour, cinq points au plus). » Le coût se donne à JP avant (règle des
jetons, qui reste).

### C14. Le paragraphe n'a qu'une ligne de tableau, et son remède joint par des deux-points

- Skill, l. 335 (les paraboles), le seul endroit qui parle d'organiser un paragraphe ; cadre, l. 95, l'interdiction
  seule (« pas de paragraphe en paraboles »). Rien dans `CLAUDE.md`. `controle.py` travaille ligne par ligne ; la passe
  (skill, l. 348-373) va de la phrase au mot, et la voix haute vient à l'étape 6, après les coupes.
- Le remède donné : « on passe d'un mécanisme à l'autre par un lien qui se lit (« ensuite », « de même », ou un nouvel
  alinéa) », et un modèle à deux deux-points et deux « (étape N) ».

JP l'avait dit le 15 octobre : « les mots, proportion et tout, c'est bon, c'est **la façon que le paragraphe est
organisé** ». La règle qui en est sortie interdit des tournures de phrase (« d'où », « devient flamme », « part à »)
et ne dit rien de l'ordre ni des joints. Effet, ch. 18 (passé par toute la chaîne) : « Un liquide qui bout à gros
bouillons est à 100 °C : on lit cette température à l'œil, et elle dépasse les 74 °C à cœur du gibier. On cuit tout ce
qui est douteux en bouilli ou en ragoût, coupé mince, dans un liquide qui bout. Après le dernier morceau ajouté, on
attend que le liquide recommence à bouillir franchement : une pièce froide fait redescendre la température de toute la
marmite. On ne fait plus de rôti, de grillé ni de saisi : la surface cuit avant le centre, et on ne voit pas le centre.
Sans thermomètre, on ne sert ni ours (étape 14) ni gibier haché : le hachage mêle les microbes de la surface à toute la
viande. » Cinq phrases, quatre deux-points, aucun mot de liaison parlé (parce que, donc, alors, mais…).

Recommandation : **réécrire** (une section neuve « Le paragraphe », en tête du skill). L'ordre suit ce qui arrive à la
personne ; chaque phrase reprend la précédente ; le lien se dit par un mot ; les longueurs alternent ; deux phrases
voisines ne commencent pas pareil ; la phrase finit sur le mot qui compte. Le test à voix haute se fait sur le
paragraphe entier, pendant l'écriture. « De même » et « nouvel alinéa » sortent de la liste des liens. Rejoint L1 (C4,
C5), L2 (7).

> Après le dernier morceau, on attend que le liquide se remette à bouillir franchement, parce qu'une pièce froide fait
> redescendre la température de toute la marmite. On ne fait plus de rôti, de grillé ni de saisi, puisque la surface
> cuit avant le centre et qu'on ne voit pas le centre.

### C15. Les rappels de sécurité : le fait se répète, la formule du tableau aussi

- `CLAUDE.md`, l. 102-112 : le tableau des neuf rappels, écrit en notes (« Botulisme de type E : produit sa toxine dès
  **3 °C**, donc au frigo » ; « Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence ») ; « Ils se répètent dans
  **chaque** chapitre concerné ».

Le fait doit se répéter ; la règle ne dit pas qu'il se redit dans la phrase de l'étape, et l'agent copie la formule.
« ne change ni l'odeur, ni le goût, ni l'apparence » est dans 34 fichiers ; « donc au frigo » en finale de phrase, dans
3. Ch. 17, étape 21 : « La bactérie du botulisme du poisson fabrique sa toxine dès 3 °C, donc au frigo. » (un
fragment), et juste avant, la conséquence évidente collée au rappel : « Le botulisme ne change ni l'odeur, ni le goût,
ni l'apparence d'un pot : on ne peut pas le juger en l'ouvrant ou en y goûtant. » (la règle « pas de conséquence
évidente » n'a pas suffi contre l'habitude du deux-points).

Recommandation : **réécrire** une ligne sous le tableau : « Le fait se répète, dit dans la phrase de l'étape qui s'en
sert ; la formule du tableau n'est pas un texte à copier. » Le tableau lui-même peut rester en notes : c'est une liste
pour le rédacteur.

> La bactérie du botulisme du poisson fabrique sa toxine dès 3 °C, donc même au frigo.

### C16. La mise en relief interdite, et employée par les corrections

- Skill, l. 206, et `controle.py`, l. 27 (`RELIEF`) : « « C'est… qui / que » de mise en relief | « C'est la cendre qui
  tient le mieux. » | « La cendre tient le mieux. » »
- Les corrections modèles du même skill : l. 342, « **Ce sont** les vapeurs de l'essence **qui** prennent feu, pas le
  liquide. » ; l. 336, « **c'est pour ça qu'**on souffle longtemps ».

La mise en relief est un des tours les plus fréquents du français parlé ; le skill la défend dans ses corrections et
la chasse dans son tableau. Effet, ch. 10 : « **c'est pour ça que** la javel et la marmite restent les deux moyens du
chalet » a sauté à la passe de style (C4).

Recommandation : **réécrire** : la mise en relief sort quand elle redit (« C'est la cendre qui tient le mieux » quand
on vient de parler de la cendre) ; elle reste quand elle met en tête le mot qui compte (« Ce sont les vapeurs qui
prennent feu ») ou quand elle dit la cause (« c'est pour ça que »).

### C17. « Le mécanisme se répète » contre « le mécanisme n'est pas redit »

- `CLAUDE.md`, l. 64-65 : « Le monoxyde de carbone n'a ni odeur ni couleur […] » **reste, et se répète**.
- Cadre, l. 48 : « Le mécanisme général du danger **n'est pas redit** : il est dans la page du tome. » ; skill, l. 234 :
  « Un fait se dit une fois par chapitre ».

Les deux se défendent (le rappel répété, la page des dangers qui porte le mécanisme), mais la règle ne dit pas où passe
la limite, et l'étape finit en consigne nue. Ch. 3, aujourd'hui : « {!electrocution} Dehors, rester loin de tout fil
tombé, et de tout ce qu'il touche. » Le fait qui surprenait (le sol sous tension, sans bruit) n'est plus dans le
chapitre (C2). Pour le tempo : une étape sans son pourquoi n'a rien à lier.

Recommandation : **réécrire** en précisant : le mécanisme complet est dans la page des dangers ; dans l'étape, la
demi-phrase de pourquoi reste quand le réflexe est le mauvais, et les neuf rappels de `CLAUDE.md` restent toujours.

### C18. Le gabarit et `CLAUDE.md` contre le cadre, sur trois points de forme

- **Le dessin dans « En plus »** : `CLAUDE.md`, l. 136-137, « (la façon des Innus, une photo pour reconnaître, **un
  petit dessin**) » ; cadre, l. 69, « **Jamais de planche ni de dessin** (JP : « je veux pas de planche dans les
  affaires vertes : photo, ou faits, ou façon ») ».
- **La place de la note verte** : `gabarit-chapitre.md`, l. 124-125, « glissée après le paragraphe de l'étape dont elle
  parle » ; `CLAUDE.md`, l. 138, « **jamais au travers du texte** ni entre deux paragraphes ».
- **Le nom latin** : `gabarit-chapitre.md`, l. 168, « avec le nom latin au moins une fois par chapitre », et l. 154,
  « un nom latin (*Alces americanus*) » ; cadre, l. 139, « pas de nom latin » ; `roles.md`, l. 61-62, « pas de nom
  latin dans le texte ». Aujourd'hui : aucun nom latin au tome 1, des noms latins dans 91 chapitres des tomes 2 à 6
  (*Alces americanus* 56 fois, *Ursus americanus* 52). La grande passe tombera sur la contradiction.

Recommandation : **réécrire** `CLAUDE.md` (« un petit dessin » sort) et le gabarit (voir M1) ; trancher le nom latin
avec JP s'il le faut, le cadre étant le plus récent.

---

## 4. Les règles mortes ou dépassées

| # | Où | La règle | Pourquoi elle est morte | Quoi faire |
| --- | --- | --- | --- | --- |
| M1 | `gabarit-chapitre.md`, l. 3, 35-38, 45, 60, 83-97, 99, 170 | « Neuf points », « 89 chapitres », « 3. Pourquoi ça marche » (120 mots), « 8. Danger (retiré) », « 9. Variante d'urgence », « (→ section 9) », « repris dans la section 10 » | Le gabarit a sept sections depuis le 18 octobre ; « Comment ça marche » est coupé depuis le 16 ; il n'y a pas de section 10 | Réécrire le gabarit aux sept sections ; il est encore le modèle que lisent les rédacteurs (`roles.md`, rôle 2) |
| M2 | `gabarit-chapitre.md`, l. 146 | « Le relecteur humain requis » | Contraire à « Pas de relecture extérieure » (`CLAUDE.md`) | Couper |
| M3 | `gabarit-chapitre.md`, l. 169 | « Renvoi à la réglementation de l'année » | Contraire à « Pas de municipalité, pas de code légal » ; aucun chapitre ne l'imprime aujourd'hui | Couper |
| M4 | `gabarit-chapitre.md`, l. 174 ; `roles.md`, l. 38, 106 | « Environ 700 mots utiles par page en 8 × 10 » | Le format est 8,5 × 11 depuis le 19 octobre ; la cible pousse à comprimer (C5) | Couper |
| M5 | `gabarit-chapitre.md`, l. 43, 55, 111, 151 | Le gabarit écrit avec des tirets | Le modèle enfreint la règle qu'il porte | Réécrire |
| M6 | `gabarit-chapitre.md`, l. 50-51 | « Ne se fabrique pas. » ; « Dosé selon l'emballage. » | Un pronominal et un participe sans sujet, donnés comme le format validé | Réécrire l'exemple (C9) |
| M7 | Skill `ecriture`, description (l. 3) | « la structure des neuf points » | Sept sections | Réécrire |
| M8 | Skill `ecriture`, l. 82, règle 4 | « (section 2, section 3, section 9 hors étapes numérotées) » | Numéros d'avant le 18 octobre | Réécrire (« la prose hors des étapes ») |
| M9 | Skill `ecriture`, l. 93, règle 8 | « elle va alors dans l'encadré danger, une fois » | Il n'y a plus d'encadré danger | Réécrire (l'étape, avec son pictogramme) |
| M10 | Skill `ecriture`, l. 236-267 (« La répétition ») | « Pourquoi ça marche », « Le section 3 donne le mécanisme », « l'encadré du section 8 », « Les parties « le détail » et la section 9 », « Les tableaux des sections 6 et 7 » | Sections disparues ou renumérotées ; « le détail » est aboli depuis le 16 octobre (l. 332) | Réécrire toute la section |
| M11 | Skill `ecriture`, l. 238, 240, 242, 247, 324 | « **Le** section 3 », « **du** section 8 », « après **le** section 8 », « le battant **du** section 9 » | Le remplacement mécanique de « § » par « section » a laissé des fautes de genre dans le skill qui enseigne la langue | Corriger (skill `langue`) |
| M12 | Skill `ecriture`, l. 330 | La ligne « la longueur suit le temps […] une partie « … : le détail » » | Remplacée par la ligne l. 332, qui le dit elle-même ; les deux restent | Couper la ligne l. 330 |
| M13 | Skill `ecriture`, l. 345 | « Ces neuf points s'ajoutent aux règles de ce skill » | Le tableau a 24 lignes | Couper |
| M14 | `roles.md`, l. 32 | « selon les dix points du gabarit » | Sept sections | Réécrire |
| M15 | `roles.md`, l. 35 | « Chaque nombre porte sa source » | Se lit comme une attribution dans le texte, contraire à la règle 1 (la provenance ne s'imprime pas) | Réécrire (« chaque nombre a sa source notée dans `suivi/` ») |
| M16 | `roles.md`, l. 97 | « Lis CLAUDE.md et tous les chapitres déjà écrits. » | Contraire aux consignes de jetons du cadre (« jamais un chapitre que la tâche ne touche pas ») | Réécrire |
| M17 | `roles.md`, l. 146-152 | « encadrés danger en filet rouge, encadrés variante d'urgence en fond gris », « Légende sous l'image avec crédit et licence » | Pas d'encadré danger ; pas de crédit imprimé | Réécrire |
| M18 | `roles.md`, l. 69-90 | Le prompt du rôle 4 (vérificateur sécurité), gardé en entier | « Plus jamais de vérificateur sécurité » ; le texte parle encore de « relecteur humain » | Couper le prompt, garder la ligne qui dit qu'il est retiré |
| M19 | `CLAUDE.md`, l. 239-240 ; cadre, l. 247-248, 273 | « sans tour de relecture d'agents de plus » | Dépassée par la demande de JP du 28 octobre (C13) | Réécrire |
| M20 | `CLAUDE.md`, l. 136-137 | « un petit dessin » dans « En plus » | Contraire à la décision de JP notée au cadre (C18) | Couper les trois mots |
| M21 | Skill `editeur`, l. 30-31, 39-40 | `/sublimer` et sa « version plus lyrique », qui « sert seulement à montrer à JP ce qu'il ne faut pas faire » | Un mode qui produit ce qu'il faut ne pas faire, à chaque appel | Couper ou réduire (C12) |

---

## 5. Les mots de JP, et ce que nos règles en ont fait

| Ce que JP a dit | Quand, où | Ce qu'il voulait | La règle d'aujourd'hui est-elle fidèle ? |
| --- | --- | --- | --- |
| « Faut que ça soit informatif, tout le livre. » ; « Je veux pas de fils d'la AI. » | 15 oct., relecture au crayon du tome 1 | Couper le texte qui sonne bien et n'apprend rien | En partie : la règle va « jusqu'au mot », et son test mot à mot coupe aussi les liens, qui ne sont pas du remplissage (C4) |
| « "Sans perdre la viande **de l'automne**" : "de l'automne" est inutile. C'est des mots comme ça qu'il faut éliminer. » | 15 oct. | Le complément qui décore | Non : « déjà, encore, tout, bien » ne viennent pas de JP ; ils sont dans la liste depuis la création du skill (`92edc51d`), sans exemple de lui |
| « Enlève les — partout aussi : y a juste les AI qui mettent ça dans des phrases. » | 15 oct. | Enlever une marque d'IA | Oui pour l'interdiction ; la liste de remplacement (deux-points en tête) est de nous et a nourri une autre marque (C3) |
| « ni aqueduc, ni égout, ni blablabla, inutile, **on le sait** » | 15 oct. | Couper la justification que le lecteur sait | En partie : la ligne voisine, « la justification collée au geste », a perdu la condition « on le sait » (C2) |
| « un tuyau vide ne fend pas » : « no shit, man » | 15 oct. | Couper la conséquence évidente | Oui ; l'habitude du deux-points en produit encore (C15) |
| « Ceux qui étaient dehors laissent à la porte la couche du dessus » : « c'est fucking bizarre » | 15 oct. | L'ordre et le sujet du français parlé | Oui (règle 11) |
| « personne parle comme ça, c'est fucking pas clair » ; « c'est pas juste les logigrammes, **c'est la façon de dire les choses** » | 15 oct. | Un texte qui se dit, pas un code | En partie : la règle 0 est juste, mais elle se teste sur la phrase seule ; « la façon de dire » comprend les liens et le tempo |
| « Dans les textes, y a beaucoup de répétition aussi, faut slaquer la répétition. » | 15 oct. | Ne pas redire une idée | Oui pour l'idée ; « un nom ne revient pas » vient d'une autre phrase de JP et va plus loin que celle-ci (C7) |
| « Je veux pas savoir qu'est-ce qui va pas au feu, je veux savoir c'est quoi qui va au feu. » | 15 oct., ch. 10 (`94025ff0`) | Une liste de ce qui convient, pas de ce qui ne convient pas | En partie : la règle 8 s'étend au fait qui surprend, qui est souvent un « ne… pas » (C6) |
| « on dirait que tu parles en paraboles, arrête ça » ; « les mots, proportion et tout, c'est bon, **c'est la façon que le paragraphe est organisé** » | 15-16 oct., ch. 3, section 3 | L'organisation du paragraphe | Non : la règle est devenue une ligne de tableau et des motifs de mots ; aucune règle de paragraphe (C14). C'est la première forme de la plainte du 28 octobre |
| « parle pas de même, **explique pourquoi** ; "là où un appel ne passe pas", ça veut rien dire » | 16 oct., ch. 3 | Dire la raison, le mécanisme | En partie : la ligne du tableau est fidèle ; la règle 2 (« seulement si la raison change ce qu'on fait ») et la « justification collée au geste » la contredisent (C2) |
| « pas en quelques mots, j'aime ça la version détaillée […] c'est la place pour creuser et mettre de l'information » | 16 oct., ch. 13, série orange | De l'explication, de la place | Oui pour l'orange ; les plafonds de mots ailleurs vont contre ce goût (C5) |
| « on doit le cuire, pas il se cuit ; très important pour le livre » | 16 oct., ch. 3 | La consigne dit qui fait le geste | Oui ; mais la table de la règle 15 et le gabarit donnent des pronominaux en modèle (C9) |
| « 4 fois Claude en un paragraphe » ; « c'est dull » | 19 oct., texte des auteurs | Varier un texte qui présente quelqu'un | Non : étendu à tout le livre et à toutes les choses (C7) |
| « c'est moi le regard qualité » ; « 4 M de jetons pour 6 planches, sérieusement ? » | 19 oct., planches | Pas de boucle coûteuse de relecteurs sur les images | Non : étendu à « l'image ou la page » le 20 octobre ; dépassé par la demande d'auditeurs du 28 (C13) |
| « Point de contrôle faut que ça soit condensé, personne va lire 50 points de contrôle » | 28 oct., épreuve | Des tableaux courts | Oui (5 à 8 lignes) |
| « on passe trop de temps à tourner autour du pot ; minimum 2 dangers par page, pi les condenser » | 28 oct., épreuve | Couper les détours et l'accessoire | En partie : « 150 à 230 mots » et « deux ou trois phrases » sont nos chiffres ; la condensation a comprimé la syntaxe au lieu de choisir les faits (section 2, C5) |
| « la tournure de phrase est fucking weird » ; « un paragraphe de même ça veut rien dire » | 28 oct., génératrice | Couper ce qui ne mène à aucun geste | Oui (règle 12 et « doit-il exister ») ; la règle 12 nomme une expression au lieu du défaut (C8) |
| « On a sommeil, qui qui dit ça dans vrai vie, **la façon que tu écris** c'est pas bon » | 28 oct., monoxyde | La façon d'écrire | Non : réduit au mot, outillé par une table de fragments (C10) |
| Le texte de l'éditeur : « alterne phrases courtes […] et phrases longues […]. Accorde une attention critique à l'euphonie. » | 28 oct. | Du rythme | Non : la seule règle de rythme du système, dans le skill qui perd les conflits, et absente de son adaptation (C12) |
| « le tempo du paragraphe est pas bon pi c'est vrai dans tout le livre » ; « réécrit le skill en lisant de la littérature et en ajoutant des auditeurs. Je veux qu'on reparte sur des bonnes bases. » | 28 oct. | Le paragraphe, l'oreille, et des relecteurs qui n'ont pas écrit | Aucune règle encore ; deux règles s'y opposent (C13, C14) |

---

## 6. La structure proposée pour les règles

**Un principe par fichier, et chaque règle à une seule place.** Aujourd'hui la même règle vit dans `CLAUDE.md`, le
cadre, le skill, le gabarit et `decisions-jp.md`, avec cinq rédactions qui divergent (la condition de JP se perd d'une
copie à l'autre). Proposition :

1. **`CLAUDE.md`** garde les règles non négociables et une phrase par sujet, avec le renvoi ; il ne donne plus
   d'exemple de style (ses exemples sont ceux qui se contredisent, C9).
2. **Le skill `ecriture`**, réécrit, dans cet ordre, et écrit lui-même dans le tempo qu'il demande :
   - **L'ordre de priorité en cas de conflit**, en tête : la sécurité et le fait ; puis la clarté à voix haute ; puis
     le tempo du paragraphe ; puis la concision ; puis les listes de mots. Aujourd'hui l'ordre n'est dit nulle part,
     et la règle la plus mécanique gagne.
   - **Deux textes, deux jeux de règles** : l'étape (un geste par phrase, l'infinitif, le but devant) ; la prose qui
     explique (la page des dangers, le mécanisme, la note).
   - **Le paragraphe** (neuf) : l'ordre de ce qui arrive à la personne ; la reprise d'une phrase à l'autre ; le lien
     dit par un mot ; les longueurs qui alternent ; l'entrée de phrase qui change ; la fin sur le mot qui compte ; la
     lecture à voix haute du paragraphe entier, pendant l'écriture.
   - **La phrase** : la règle 0, la règle 11, le pronominal précisé (C9), la raison après le geste (C2).
   - **Le mot** : le mot qu'on dit, avec une frontière tracée entre le français parlé correct et le joual, la même que
     dans le skill `langue` (C11).
   - **La ponctuation** : le tiret banni ; le deux-points pour annoncer ; le point-virgule permis.
   - **Ce qui sort** : les familles d'IA (phrase sur le livre, image, chute, chose qui pense, maxime), en principe
     court avec un exemple chacune, **et la condition de JP écrite avec chaque règle**.
3. **Les tableaux de corrections et la table des mots** sortent du skill de rédaction et deviennent la liste des
   auditeurs (ce qu'on cherche après coup), avec leur date et la phrase de JP. Une correction de JP entre comme un
   principe et un paragraphe entier corrigé, jamais comme un fragment à substituer (C10).
4. **Le cadre** ne recopie plus les règles : sa liste de contrôle renvoie aux numéros du skill. Il est récrit dans le
   tempo demandé (il est le texte que les agents lisent le plus).
5. **Le gabarit** est récrit aux sept sections, sans tiret, sans nom latin ni réglementation, avec des exemples qui
   respectent le skill (M1 à M6).
6. **`roles.md`** suit (M14 à M18) ; l'éditeur devient l'éditeur de prose pratique (C12).
7. **Les scripts** : `controle.py` perd les alarmes qui chassent les liens (`MOTS_VIDES` réduit, `pas … mais`, « par
   ailleurs → rien », « d'où » de la question « d'où vient ») et gagne les alarmes contraires ; `tempo.py` donne les
   mesures par paragraphe, comme des avertissements, jamais des cibles.

**Les auditeurs que ces contradictions appellent** (chacun lit des paragraphes entiers, n'a pas écrit la page, ne
réécrit pas, et rend cinq points au plus) :

| Auditeur | La question | D'où il vient |
| --- | --- | --- |
| Les joints | À chaque deux-points et à chaque frontière de phrase : quel rapport ? Est-il dit par un mot ? | C1, C2, C3, C14 |
| Le souffle | Lu à voix haute d'un trait : où le souffle casse ? Deux phrases voisines ont-elles le même moule ou la même entrée ? | C7, C12, C14 |
| Le gras et les liens | Ce qui est coupé est-il un fait inutile, ou un lien, un « encore », un « mais » ? | C4, C5 |
| Le réflexe | Le fait qui surprend est-il dit comme une correction (ce qu'on croit, puis « mais ») ou comme une queue négative ? | C6, C17 |
| L'oreille | Chaque mot et chaque tour se disent-ils, en français correct, sans joual ? | C10, C11, C16 |
| La condition de JP | Chaque coupe faite au nom d'une règle de JP respecte-t-elle la condition qu'il a posée ? | section 5 |

---

## 7. Essai sur le paragraphe du monoxyde, avec ces règles (mêmes faits, rien d'ajouté)

Aujourd'hui (77 mots ; 2 phrases sur 4 en « fait : conséquence », aucun lien parlé, 3 phrases sur 4 qui commencent
par « Le » ou « Il ») :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus
> quand on ferme presque l'entrée d'air pour la nuit. Le gaz ne se voit pas et ne se sent pas. Il prend la place de
> l'oxygène dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans toute la pièce,
> jusqu'au plancher : se coucher par terre ne protège pas.

Avec les règles proposées (81 mots ; aucun deux-points ; deux liens parlés, « alors » et « comme » ; quatre entrées
de phrase différentes) :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus la
> nuit, quand on ferme presque l'entrée d'air. Ce gaz-là, on ne le voit pas et on ne le sent pas. Il prend la place de
> l'oxygène dans le sang, alors on s'endort sans s'en rendre compte, au lieu de sortir. Et comme il se répand dans
> toute la pièce, jusqu'au plancher, se coucher par terre ne protège pas.

Ce que chaque changement applique : le pronominal remplacé par la personne qui voit (C9) ; la phrase détachée permise
(C11) ; le deux-points de cause remplacé par « alors » (C1, C3) ; le fait qui surprend amené par sa cause en tête
(« Et comme… »), au lieu d'une négation en queue (C6) ; quatre mots de plus (C5). Les essais plus poussés de L1 et L4
montrent d'autres ordres possibles ; celui-ci se limite à ce que les règles proposées demandent.

---

## 8. Liste de contrôle (ma partie du cadre)

Pour tout agent
- [x] `CLAUDE.md` pris comme règle première, sans le relire.
- [x] Le skill de ma partie lu au complet, avec ses tableaux (`ecriture`, `editeur`, `langue`, `controle.py`).
- [x] Règle 1 : aucun chiffre neuf dans les réécritures ; les chiffres cités sont des mesures de `tempo.py` ou des
  comptes faits sur le dépôt, avec leur méthode.
- [x] Rien commité, aucun fichier existant modifié.
- [x] Lu seulement ce que la tâche touche : grep et extraits ; les versions passées par `git show`.
- [x] Sorties de commande coupées.

Le texte (pour les réécritures d'exemples de ces notes)
- [x] Règle 0 : chaque réécriture lue à voix haute.
- [x] Pas de loi en formule, pas de « d'où », pas de chose qui pense.
- [x] Pas de maxime, de chute, d'opposition fabriquée, d'image.
- [x] Consigne jamais au pronominal ; sujet nommé ; ordre naturel.
- [x] Le mot qu'on dit, en français correct, sans joual (« ce gaz-là », « c'est pour ça que », « alors »).
- [x] Aucun tiret (— ou –) dans mes phrases ni dans les réécritures.
- [x] Aucun fait ni chiffre neuf dans les réécritures (vérifié phrase par phrase contre l'original).
- [ ] `controle.py` sur les réécritures : non passé (ce sont des notes, pas une page du livre).

La langue
- [x] Les réécritures relues pour le subjonctif, les accords, les participes, les homophones et les « ou » répétés.
- [ ] `langue.py` avec LanguageTool : non passé sur ces notes (elles ne s'impriment pas).
