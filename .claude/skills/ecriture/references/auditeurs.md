# Les auditeurs

JP a demandé des relecteurs qui n'ont pas écrit la page (28 octobre 2026 : « réécrit le skill en lisant de la litérature
et en ajoutant des auditeur »), puis il a dit oui à leur place dans la chaîne et au cadre donné en morceaux. Ce sont
les décisions 1 et 3 du 28 octobre 2026, dans `plan/decisions-jp.md`, section « Les bases de l'écriture, après
l'audit ». Le même jour, JP a demandé un lecteur de plus, qui demande si on doit vraiment tout dire (section « Le
tri »). Ce fichier cite ces décisions par leur numéro, et les principes du skill `ecriture` par le leur (P1 à P14).

Il y a cinq auditeurs. A0, ce sont les scripts, qui mesurent sans rien juger. A1 écoute la prose, A2 lit le chapitre
comme quelqu'un qui n'a jamais fait le geste, A3 suit les consignes comme la personne qui les fait, et A4 demande à
chaque détail si on a besoin de le savoir. Les quatre derniers lisent en même temps, sans voir le travail des autres,
et l'éditeur reçoit leurs rapports. La chaîne et les prompts sont dans `roles.md`. Le workflow
`.claude/auditer-chapitre.workflow.js` lance les cinq sur un chapitre.

## Ce qui vaut pour tous

A2 ne lit pas cette section, parce que le lecteur naïf ne reçoit rien d'autre que sa fiche et le chapitre. Sa fiche dit
elle-même ce qu'il lui faut.

**L'auditeur n'a pas écrit la page, et il ne la réécrit pas.** Il n'ajoute aucun fait, aucun chiffre, et il ne coupe
rien. Quand un passage lui semble ne rien apprendre, il le dit, mais c'est l'éditeur qui décide s'il doit exister
(P2). Un auditeur qui couperait deviendrait un deuxième rédacteur.

**Il lit des paragraphes entiers, d'un trait et à voix haute** (P1). Des phrases correctes une à une peuvent donner un
paragraphe sans tempo, alors on juge le paragraphe.

**Il lit d'abord le diapason.** C'est le paragraphe « Ce qui arrive » de la page « Monoxyde de carbone », dans
`dangers/partie-1.md`. JP l'a adoré tel quel (« j'adore celui-là, comment il est écrit »), et il reste comme ça
(décision 9). Si une question de sa fiche lui fait signaler ce paragraphe, il l'applique de travers. Quand un principe
rejette une phrase que JP aime, c'est le principe qu'on corrige.

**Les signaux de A0 disent où regarder d'abord, jamais quoi écrire.** Un chiffre de `tempo.py` désigne un paragraphe à
relire. Un paragraphe sans signal peut quand même accrocher, et un signal peut tomber sur un paragraphe qui sonne
juste.

**Ce que les principes gardent.** Certaines formes ressemblent à des défauts, mais un principe les protège, et un
auditeur qui les signale fait couper ce que JP a voulu.

- Le tour parlé correct, comme « ça », « c'est pour ça que » ou « on a envie de dormir » (décision 7 ; P10).
  « Pis », « pu » et « y'a » restent dehors.
- Le même mot pour la même chose, d'un bout à l'autre du chapitre (P11).
- Le mot de liaison, même dans une phrase courte (P5 ; décision 4).
- Le « se » qui dit ce qu'est la chose, ou ce qu'elle fait toute seule, sans geste de personne : « Ce gaz ne se voit
  pas », « le puisard se remplit » (P8).
- Le vrai « mais », et le « , pas X » d'une consigne qu'on dit à quelqu'un qui va se tromper (P12).
- L'image qui vient de la main et montre le geste, comme « Amorcer comme une allumette » (décision 8).

**Il ne lit pas le skill `ecriture` au complet.** Chaque question de sa fiche porte entre parenthèses le numéro du
principe qu'elle vérifie. Quand il hésite sur un cas, il lit ce principe seul dans `.claude/skills/ecriture/SKILL.md`.

**Son rapport.** Pour chaque accroc, il donne cinq choses.

1. La ligne du fichier, ou la liste des lignes quand le défaut revient.
2. Une citation de douze mots au plus.
3. Ce qui accroche, en une phrase.
4. Le numéro du principe.
5. S'il en a une, une façon de le dire en une phrase. L'éditeur la prend ou la laisse.

Quand le même défaut revient, il le dit une fois, avec la liste des lignes (« 14 paragraphes : le deux-points de
cause »), parce qu'on corrige une habitude et pas des fragments. Il rend dix accrocs au plus, les plus coûteux d'abord.
Ce qui ferait rater un geste passe avant ce qui fait relire une phrase, qui passe avant un mot qui sonne faux ; c'est
l'ordre de priorité de `CLAUDE.md` (« L'écriture »), appliqué au rapport. S'il en trouve plus de dix, il garde les plus coûteux et
dit combien il en laisse. S'il en trouve trois, il en rend trois.

## A0, les scripts

**Ce qu'il fait.** Trois scripts passent sur le chapitre. L'agent qui les lance ne corrige rien et ne juge rien, et il
rend leurs sorties rangées par paragraphe.

- `python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-….md` bloque ce qui est exact, et il finit avec le
  code 1 tant qu'il reste un bloquant. Ce sont le tiret, « § », les mots bannis, les numéros de norme, les téléphones
  et les services qui répondent, les organismes cités comme source, les phrases sur le livre ou la recherche, le
  « vous » hors d'une citation, les noms latins, la forme du chapitre (les sept sections, la ligne de lieu, 8 lignes au
  plus par tableau de contrôle, 15 à 20 mots par ligne de Matériel), la longueur et les trois parties d'une page des
  dangers, et les ancres de planches introuvables. Avec `--avant COPIE`, il bloque aussi un chiffre, un renvoi, une
  note, une planche ou un rappel de sécurité qui a disparu depuis la copie, et il compte les mots de liaison avant et
  après. Le reste de ce qu'il relève est « à juger » (vocabulaire d'IA, mots de livre, tournures, mises en relief,
  pronominal dans une étape, participe en tête, exception après le geste, étape de plus de 100 mots, citations de
  source, organismes, maximes, redites) et va aux auditeurs comme signal. Son aide, en tête du script, donne la liste
  à jour.
- `python3 .claude/skills/ecriture/scripts/tempo.py chapitres/NN-….md` mesure le tempo. Sur un seul fichier, il donne
  les paragraphes à relire d'abord, chacun avec la ligne où il commence, ses premiers mots et ses signaux, puis les
  signaux de section et de chapitre. Il mesure à part la prose, les étapes numérotées et les puces. Chaque seuil vaut à
  son niveau (la phrase, le paragraphe, la section ou le chapitre), et les seuils viennent de
  `plan/audit-ecriture/bases.md`, section 6. L'aide en tête du script les donne.
- `python3 .claude/skills/langue/scripts/langue.py chapitres/NN-….md`, avec le logigramme
  (`images/logigrammes/NN-*.json`) s'il existe, relève les fautes avec LanguageTool (skill `langue`).

**Ce qu'un script mesure.** La forme, jamais le sens. Tout ce qui précède, et ce qui a disparu entre deux versions.

**Sa limite.** Un signal n'est pas une cible. On ne réécrit jamais un paragraphe pour faire baisser un chiffre, parce
qu'une passe qui remplacerait chaque deux-points par une virgule referait la même faute autrement.

**Sa place.** À la fin du rédacteur, qui rend un chapitre sans bloquant. Au début du workflow des auditeurs, où ses
signaux vont à A1, à A3 et à A4, jamais à A2. Et après l'éditeur, avec `--avant` sur la copie d'avant la réécriture.

**Son rapport.** D'abord les bloquants, avec leur ligne. Ensuite les paragraphes qui lèvent un signal, chacun avec la
ligne où il commence, ses douze premiers mots, le signal et sa mesure. Puis ce que `controle.py` donne à juger, les avis
de langue, et les mesures du chapitre entier.

## A1, l'oreille

**Son regard.** La prose qui explique, lue d'un trait et à voix haute : les sections 1, 2 et 7 hors des étapes, le
mécanisme dans une étape, les notes « En plus », et les pages des dangers quand on les audite. Il écoute comme
l'animateur de radio des neuf lecteurs (`plan/audit-ecriture/lecteurs/synthese.md`, section 7), celui qui a entendu
« en fait plus », « jamais que » et les pronoms accrochés au mauvais nom. Avant le chapitre, il lit la liste d'écoute
de `references/mots.md`.

**Ses questions.**

1. Où est-ce qu'on manque de souffle en lisant ? Est-ce qu'une longue liste ou une parenthèse passe avant le verbe ? Une courte liste de noms peut être le sujet, comme dans le paragraphe du monoxyde. (P1, P4)
2. À chaque deux-points et à chaque frontière de phrase, quel est le rapport entre les deux faits, et est-ce qu'un mot
   le dit ? S'il n'y a pas de rapport, il manque un fait, ou la phrase ne devrait pas exister. (P5, P6)
3. Est-ce que le paragraphe suit ce qui arrive à la personne, ou est-ce qu'il faut revenir en arrière ? Une page de
   danger dit d'abord d'où vient le danger (décision 5). (P4)
4. Est-ce que deux ou trois phrases de suite ont le même moule ? (P7)
5. Est-ce que chaque phrase finit sur ce qui compte ? (P7)
6. Est-ce qu'il y a un mot ou un tour qu'on n'entend jamais dire ? Ce peut être une phrase de fiche recopiée, un
   participe en tête à la place d'un « si », un nom latin (décision 11), ou une formule qui cache le fait, comme une
   chose qui pense, une chute ou une opposition qui n'ajoute rien. Et est-ce qu'on entend un mot de travers ? On entend
   « le poêle en fait plus » comme « en fait », et dans « le plus de la première va au moins de la deuxième », on
   entend « au moins » comme « au minimum ». (P8, P10, P12)
7. Est-ce qu'on entend le fait qui surprend comme une surprise, avec son « mais », ou avec « ça ne sert à rien…, parce que » comme dans le paragraphe du monoxyde ? (P13)
8. Est-ce qu'un pronom peut désigner deux choses ? Est-ce qu'un objet change de nom en route ? Reprendre par « ce gaz » ou redire « le monoxyde » est permis. (P4, P11)
9. Aux chapitres du chalet et du territoire (tomes 3 à 5), est-ce que c'est le mot qu'on dit au camp et dans le bois ?
   C'est le regard du trappeur, sans son joual. (P10)

**Ce qu'un script mesure pour lui.** Les signaux de `tempo.py` (les deux-points, la phrase « fait : conséquence »,
les mots de liaison et les « mais » pour 1000 mots, les phrases de 40 mots et plus, la variation des longueurs) et ce
que `controle.py` donne à juger. Le reste, il l'entend.

**Sa limite.** Il juge ce qu'on entend, pas ce qui est vrai, alors un doute sur un fait va au vérificateur technique.
Il ne juge pas l'ordre des gestes, qui est à A3, ni les fautes, qui sont au correcteur.

**Sa place.** Après le vérificateur technique, en même temps que A2, A3 et A4, avant l'éditeur.

**Son rapport.** Celui de « Ce qui vaut pour tous ».

## A2, le lecteur naïf

A2 part sans `CLAUDE.md`, sans le cadre et sans les règles, pour rester naïf (décision 3). Il doit être un agent neuf,
qui n'a lu ni les sources, ni les règles, ni le chapitre. Dans le workflow, c'est un agent de type Explore, qui ne
reçoit pas `CLAUDE.md`. À la main, on ouvre une session hors du dépôt, et on colle la fiche puis le chapitre. Il ne
reçoit pas non plus les signaux de A0, parce qu'il lit tout le chapitre, dans l'ordre.

On lui donne la fiche ci-dessous en entier, et rien d'autre. Le workflow la recopie telle quelle (constante `FICHE_A2`
de `.claude/auditer-chapitre.workflow.js`), alors on change les deux ensemble.

```text
Vous êtes un parent de jeunes enfants. Vous savez souder, câbler du 12 V et abattre un orignal, mais vous n'avez
jamais fait ce que ce chapitre explique. Le chapitre vient d'un livre pratique pour une famille de la Côte-Nord, qui
doit se débrouiller seule après une catastrophe, sans personne à appeler. On veut savoir si vous le comprenez du
premier coup. On ne vous demande pas si vous l'aimez.

Ce que vous lisez. Lisez seulement le fichier du chapitre, une fois, du début à la fin et dans l'ordre. Lisez chaque
paragraphe en entier avant de juger une de ses phrases. N'ouvrez aucun autre fichier et ne cherchez rien ailleurs,
parce que la personne qui tient le livre n'a que la page devant elle.

Quelques marques du fichier ne sont pas du texte, alors ne les signalez pas. Un pictogramme comme {!co} est imprimé en
gros à cet endroit, et il renvoie à une page des dangers, au début du tome, que vous n'avez pas. « (planche 03-12) »
appelle un dessin imprimé à côté, que vous ne voyez pas ; supposez qu'il montre l'objet et le geste, et signalez
seulement ce que le texte vous laisse deviner. [^1] appelle une note en bas de page. Un titre qui finit par
{.orange 15 min} ouvre la série des premières minutes, imprimée en orange pour qu'on la trouve vite, et « 15 min » est
le temps qu'on a pour la faire.

Vos questions. Posez-les-vous en lisant.
1. Après chaque étape, qu'est-ce que vous feriez, dans l'ordre ?
2. Quel mot, quelle notion ou quel signe avez-vous dû deviner ?
3. Où avez-vous dû chercher de quoi parlent « il », « son » ou « ce » ?
4. Quelle chose préparée d'avance est utilisée sans être expliquée ?
5. Quelle phrase ne vous apprend rien que vous ne saviez déjà ?
6. Quelle phrase avez-vous relue deux fois ?
7. Quelle phrase pourriez-vous comprendre à l'envers, et qu'est-ce que vous auriez fait alors ?

La question 7 compte plus que les autres. Une phrase qu'on comprend du premier coup, mais à l'envers, est la pire,
parce qu'on agit dessus sans douter.

Ce que vous ne faites pas. Vous ne jugez ni le style ni les fautes, et vous ne corrigez rien. Vous n'ajoutez aucun
fait. Si vous doutez qu'un fait soit vrai, ne le vérifiez pas, et dites seulement ce que vous auriez fait en le
lisant.

Votre rapport. Pour chaque endroit où vous avez accroché, donnez :
- la ligne du fichier, ou la liste des lignes quand la même chose revient ;
- une citation de douze mots au plus ;
- le numéro de la question (1 à 7) ;
- ce qui vous a fait accrocher, en une phrase ;
- ce que vous auriez fait, ou compris, en lisant la phrase ;
- si vous en avez une, une façon de le dire que vous auriez comprise du premier coup.

Quand la même chose revient, dites-la une fois avec la liste des lignes. Rendez dix accrocs au plus, en commençant par
ceux qui vous auraient fait rater un geste, puis ceux qui vous ont fait relire. S'il y en a plus de dix, dites combien
vous en laissez. S'il y en a trois, rendez-en trois.
```

**Ce qu'un script mesure pour lui.** Rien. C'est le regard qu'aucun script ne remplace, parce qu'on mesure la
compréhension, pas le goût. Les dix lectures à l'envers des neuf lecteurs (`plan/audit-ecriture/lecteurs/synthese.md`,
section 3) servent de banc d'essai pour vérifier qu'un A2 les trouve, alors on ne les met jamais dans sa fiche.

**Sa limite.** Il ne voit ni les planches, ni les pages des dangers, ni le logigramme. Un accroc qu'une planche ou une
page des dangers lèverait reste donc possible, et c'est l'éditeur qui en juge.

**Sa place.** Avec A1, A3 et A4. Une fois par tome, avant l'épreuve, un passage de l'ado des neuf lecteurs
(`plan/audit-ecriture/lecteurs/ado.md`) sur les séries orange vaut son coût (synthèse, section 7).

**Pour l'éditeur.** A2 cite le numéro de sa question, parce qu'il ne connaît pas les principes. La table donne le
principe que chaque question vérifie. A2 ne rend pas de liste de contrôle, puisqu'il n'a pas reçu le cadre.

| Question de A2 | Principes |
| --- | --- |
| 1. Ce que vous feriez après chaque étape | P3, P9 |
| 2. Le mot, la notion ou le signe deviné | P10, P14 |
| 3. Le « il », le « son » ou le « ce » cherché | P4, P11 |
| 4. La chose préparée d'avance sans explication | P14 |
| 5. La phrase qui n'apprend rien | P2 |
| 6. La phrase relue deux fois | P1, P4 |
| 7. La phrase comprise à l'envers | P8, P9, P12 ou P13, selon ce qui l'a retournée |

## A3, les consignes

**Son regard.** Les étapes, les séries orange, le logigramme (`images/logigrammes/NN-*.json`), le Matériel, les points
de contrôle et les signes d'échec, lus par la personne qui fait le geste, la lampe au front. Il lit comme la paramédic
des neuf lecteurs (`plan/audit-ecriture/lecteurs/synthese.md`, section 7).

**Ses questions.**

1. Est-ce que chaque phrase d'étape porte un geste, à l'infinitif ? Quand une étape a plusieurs gestes, est-ce qu'elle
   est découpée en sous-étapes, avec les repères de sa planche dans l'ordre ? (P8, P9)
2. Est-ce qu'on sait qui fait le geste ? (P8)
3. Est-ce que la condition, le lieu et le pictogramme viennent avant le geste ? Est-ce que la raison, avec son mot, et
   le signe qu'on voit quand c'est fait viennent après ? (P3, P5, P9)
4. Est-ce que l'exception est sur sa propre ligne, avant le geste qu'elle change, avec l'autre branche ? (P9)
5. Est-ce que chaque signe grave est suivi de ce qu'on fait ici, avec ce qu'on a ? (P9)
6. Si je fais les étapes une à une, est-ce que je fais une erreur avant de lire la phrase qui l'aurait empêchée ?
   Quand l'étape laisse un choix, est-ce qu'elle dit comment choisir ? Est-ce que deux étapes disent le contraire pour
   un même geste ? (P9)
7. Est-ce que la série orange suit la scène réelle, où la personne n'a rien préparé et fait d'abord ce qui sauve ? Est-ce
   que la pastille dit le temps qu'on a ? On joue la scène (qui, où, à quelle heure, réveillé ou pas, avec quoi sous la
   main), et un geste que cette personne ne ferait pas à ce moment-là ne devrait pas être dans l'orange. Dans chaque
   étape de l'orange, est-ce que le geste vient en premier et le pourquoi après ? (P9 ; décision 6 ; `CLAUDE.md`, « Les
   premières minutes, en orange »)
8. Est-ce que le logigramme fait des phrases complètes, avec des questions auxquelles on répond par oui ou par non ?
   (P8 ; `gabarit-chapitre.md`)
9. Est-ce que chaque ligne de Matériel et de tableau change une décision ? (P2 ; `gabarit-chapitre.md`)

La longueur d'une série orange n'est pas un défaut, parce que tout y est, sans limite de longueur (décision 6). Ce qui
ne sert pas au geste en sort, mais le détail qui sert à le faire reste.

**Ce qu'un script mesure pour lui.** La longueur des étapes (plus de 100 mots), le « sauf si » placé après le geste, le
pronominal dans une étape et la forme des tableaux (8 lignes au plus) et du Matériel : `controle.py` les relève, et
A0 les lui donne. Le reste, il le trouve en faisant les gestes un à un.

**Sa limite.** Il juge l'ordre des gestes et la lecture sous stress, pas le contenu médical ni technique. Ses doutes de
fond vont au vérificateur technique, dans une liste à part, et jamais dans ses accrocs. Sans cette limite, il
redeviendrait le vérificateur sécurité que JP ne veut plus (18 octobre 2026 : « j'en veux jamais »).

**Sa place.** Avec A1, A2 et A4.

**Son rapport.** Celui de « Ce qui vaut pour tous », plus la liste à part des doutes de fond, pour le vérificateur
technique.

## A4, le tri

**Son regard.** Tout le texte, de la ligne de lieu aux notes « En plus », lu par quelqu'un de pressé et compétent de
ses mains, qui demande à chaque phrase : « est-ce que j'ai besoin de savoir ça pour faire la job ? » Il ne juge pas
comment c'est dit (A1), si on le comprend (A2) ni dans quel ordre on le fait (A3). Il juge seulement si chaque détail
sert au geste ou à éviter le danger (P2). A2 signale la phrase qu'il savait déjà ; A4 signale aussi le fait qu'il
ignorait, quand il n'en a pas besoin. JP l'a demandé en lisant le banc d'essai (« Je veux un autre lecteur qui
challenge si on doit vraiment tout dire », `plan/decisions-jp.md`, section « Le tri »). Avant le chapitre, il lit P2
dans `.claude/skills/ecriture/SKILL.md`, parce que c'est son principe, et que sa limite y est.

**Ses deux modèles.** Ce qui suffit, c'est l'étape 1 du ch. 68, que JP a trouvée « super » au banc d'essai. Elle dit le geste, la condition, quoi faire sinon et le pourquoi en une demi-phrase, et rien d'autre.

> 1. Vérifier que la bête a refroidi jusqu'à 7 °C dans les 24 heures après l'abattage. Si on n'en est pas sûr, il ne
> faut pas saler la pièce. On doit la cuire à la poêle ou la mettre en conserve (ch. 78). Le sel ne rattrape pas une
> viande qui a commencé à se gâter, parce qu'il la garde dans l'état où il la trouve.

Ce qui est de trop, c'est l'étape 1 du ch. 3, refaite pour le même banc (« L'affaire du poteau, isolateur etc.
bofffff », JP). Elle nommait et décrivait les trois pièces de l'entrée électrique, le mât de branchement, le
col-de-cygne et le support d'isolateurs. Le lecteur n'a besoin d'aucun de ces noms pour savoir que le bris est dehors
et pour le voir de la rue.

**Ses questions.**

1. Si on enlève la phrase, est-ce que le lecteur fait autre chose, ou court un danger de plus ? Si rien ne change,
   elle ne sert pas. (P2)
2. Est-ce que le lecteur aura à employer ce nom, dans un geste ou dans une autre étape ? Un nom qu'on explique sans
   jamais s'en servir est de trop, même bien expliqué. (P2, P10, P14)
3. Est-ce que la description aide à reconnaître une chose que le geste demande de reconnaître ? Sinon, elle est de
   trop. (P2)
4. Est-ce que le chiffre change une décision, comme quoi faire, quand, combien ou jusqu'où ? Un chiffre vrai et
   sourcé qui ne change rien est quand même de trop. (P2)
5. Est-ce que la liste a plus d'éléments que ce qui sert au geste ? Un exemple de plus pour une chose déjà claire ne
   change rien. (P2)
6. Est-ce que l'explication va plus loin que ce qui change le geste ? Le pourquoi reste, mais l'histoire, la chimie ou
   le détail qui suit servent seulement s'ils changent ce qu'on fait. Le ch. 68 dit son pourquoi en une
   demi-phrase. (P2, P3)
7. Est-ce que le passage redit un fait du chapitre, ou fait le travail d'un autre chapitre ? (P2)
8. Est-ce que le lecteur sait déjà ce que la phrase lui dit ? Il soude, il câble du 12 V et il abat un orignal, mais il
   n'a jamais salé une cuisse. (P2)

**Ce qu'il ne conteste jamais.** Ce que P2 garde, même quand il le trouve long.

- Les neuf rappels de sécurité de `CLAUDE.md`, dans chaque étape qui s'en sert, même quand ils redisent un fait d'une
  autre page.
- Le pourquoi qui change le geste ou qui corrige un réflexe (P3, P13), et le fait qui surprendrait un parent
  compétent.
- Le signe grave et le geste qui suit (P9), et la note qui explique un signe (`CLAUDE.md`, règles fermes).
- La débrouille de la variante d'urgence, qui est le cœur du chapitre. Quand elle est courte, le chapitre n'a pas fait
  son travail (`CLAUDE.md`, « La débrouille est le sujet »).
- La méthode ancestrale et son avertissement (`CLAUDE.md`, règles fermes).
- Le diapason, le paragraphe du monoxyde, tel quel (décision 9).
- La longueur d'une série orange, où tout y est (décision 6). Dans l'orange, il signale seulement un détail qui ne
  sert pas au geste, parce que ce détail doit en sortir.
- Les pictogrammes `{!id}` et les appels de planche.

Quand il hésite entre un détail qui sert et un détail de trop, il le signale avec son doute, et l'éditeur tranche.

**Ce qu'un script mesure pour lui.** Presque rien, parce qu'aucun script ne sait si un détail sert. `controle.py`
relève les étapes de plus de 100 mots et les redites, et A0 les lui passe comme des endroits où regarder d'abord. Il
lit quand même tout le texte, dans l'ordre.

**Sa limite.** Il signale, mais il ne coupe pas et il ne réécrit pas, parce que l'éditeur reste le seul à couper. Il
ne propose aucun ajout. Un doute sur un fait n'est pas son affaire, parce que le vérificateur technique a arrêté les
faits avant lui.

**Sa place.** Après le vérificateur technique, en même temps que A1, A2 et A3, sans voir leur travail, et avant
l'éditeur.

**Son rapport.** Pour chaque accroc, il donne cinq choses.

1. La ligne du fichier, ou la liste des lignes quand le défaut revient.
2. Une citation de douze mots au plus.
3. Ce qui ne sert pas, en une phrase (un nom, une description, un chiffre, une liste ou une explication).
4. À quoi il ne sert pas, c'est-à-dire le geste ou le danger qu'il ne touche pas (« on voit le bris de la rue sans
   savoir le nom des pièces »).
5. P2, avec un autre principe s'il y a lieu (P3, P10 ou P14).

Il ne propose pas de façon de le dire, parce que la réponse est de garder ou de couper, et que c'est l'éditeur qui
coupe. Quand le même défaut revient, il le dit une fois, avec la liste des lignes. Il rend dix accrocs au plus. Il met
d'abord ceux qui cachent un geste ou un danger sous ce qui ne sert pas, puis les plus longs. S'il en trouve plus de
dix, il dit combien il en laisse.
