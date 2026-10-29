# Les bases du nouveau skill d'écriture

28 octobre 2026. Ce fichier sert à l'agent qui réécrira `.claude/skills/ecriture/SKILL.md`. Il fait la synthèse de
l'audit, et le rapport pour JP est dans `plan/audit-ecriture/rapport.md`. Rien ici ne s'imprime.

Les notes d'où vient tout ce qui suit, à ouvrir quand un point demande plus de détail :

- `mesures.md`, le tempo de tout le livre, par tome et par chapitre (`tempo.py`) ;
- `regles/R1-contradictions.md` (nos règles qui se contredisent, 21 règles mortes), `R2-intention-jp.md` (ce que JP
  a vraiment demandé, avec ses mots et ses dates) et `R3-architecture.md` (où vivent les règles, la structure
  proposée, les auditeurs et leur coût) ;
- `litterature/L1.md` à `L5.md` (la prose classique française, l'écriture pour l'oreille, le langage clair et les
  consignes, les classiques anglais et les manuels de survie, le corpus de référence et ses mesures) ;
- `texte/` (trente lectures du livre en six lots, sous cinq regards : tempo, voix, liaison, consigne, densité) ;
- `lecteurs/synthese.md` (neuf lecteurs simulés, des agents chacun dans la peau d'un personnage, qui ont lu un
  échantillon : leurs notes, leurs accrocs et leurs réécritures).

Le nouveau skill doit lui-même être écrit dans le tempo qu'il demande. Un agent écrit comme le dernier texte qu'il a
lu, et aujourd'hui le cadre a 78,6 % de phrases à deux-points, `CLAUDE.md` 40,9 % et le skill 39,9 %. Ce fichier-ci
en a encore 19,3 %, surtout devant les citations des sources et dans les tableaux. L'agent reprend donc ses énoncés
dans le ton du skill, sans les recopier.

---

## 1. L'intention de JP, à mettre en tête du skill

Trois phrases de JP portent tout le reste. Elles vont en tête, telles quelles :

- « Faut que ça soit informatif, tout le livre. » (relecture au crayon du tome 1, 14 et 15 octobre 2026)
- « c'est pas juste les logigrammes, c'est la façon de dire les choses. » (15 octobre 2026)
- « le tempo du paragraphe est pas bon pi c'est vrai dans toute le livre » (28 octobre 2026 ; « c,est » corrigé en
  « c'est », faute de frappe)

**L'ordre quand deux règles tirent en sens contraire.** Aujourd'hui, cet ordre n'est écrit nulle part, et la règle la
plus mécanique gagne. Le skill le dit en tête, dans cet ordre :

1. la sécurité et le fait (`CLAUDE.md`, règle 1 et rappels de sécurité) ;
2. être compris du premier coup, à voix haute ;
3. le paragraphe qu'on suit d'un trait, avec ses liens ;
4. la concision (couper ce qui n'apprend rien) ;
5. les listes de mots, en dernier.

**On n'écrit pas une étape comme une explication.** C'est la première distinction de la littérature technique
(ASD-STE100 sépare la procédure et la description ; L3, section 3), et notre skill ne la fait pas. L'étape numérotée,
la série orange, le logigramme, le Matériel et les tableaux sont des textes qu'on consulte. Les pages des dangers, le
mécanisme dans une étape, les sections 1, 2 et 7 hors étapes et les notes « En plus » sont des textes qu'on lit d'un
trait. Chaque principe dit pour lequel des deux il vaut, et on fait les mesures à part (section 6).

---

## 2. La forme du nouveau skill

- **2 000 mots au plus**, contre 8 443 aujourd'hui. L'agent charge le détail quand il en a besoin, dans
  `references/`, comme le skill `planches` le fait déjà.
- **L'histoire déménage.** « Ce que JP a dit » et le tableau « Ce que la relecture du 15 octobre change à la passe »
  font 3 781 mots (45 % du skill). Ils vont dans `plan/decisions-jp.md`, section « L'écriture », chaque ligne avec le
  numéro de la règle qu'elle a faite. Rien ne se perd.
- **Chaque règle est écrite à une seule place.** Les autres fichiers la citent par son numéro, sans la recopier.
  Aujourd'hui, une même règle existe en quatre à neuf copies qui divergent, et la condition de JP se perd d'une copie à
  l'autre.
- **Chaque règle porte cinq choses** : l'énoncé ; la condition (où elle vaut, où elle ne vaut pas, celle que JP avait
  posée) ; un exemple, qui est un paragraphe entier respectant toutes les autres règles ; son contrôle (script, signal
  ou auditeur) ; son origine (les mots de JP ou la source).
- **Aucun pronominal de consigne dans le skill** (« elle se coupe », « se réécrit » : 4,4 pour 1000 mots aujourd'hui).
- **Les tableaux de corrections et la table des mots sortent du skill de rédaction.** Ils deviennent les listes que
  lisent les auditeurs et `controle.py` (`references/mots.md`).
- **Une règle d'aujourd'hui ne doit pas tomber en route** : l'interdit de la citation de source entre guillemets
  (section « Les guillemets » du skill) passe dans P10, avec un contrôle.

La structure de fichiers proposée par R3 (section 7.2) tient. Le skill court, dans cet ordre : le lecteur et la
situation (80 mots), l'ordre de priorité (80 mots), les deux sortes de texte (150 mots), les principes, la méthode
(150 mots), les renvois (50 mots).

---

## 3. Les principes retenus

Chaque principe a son énoncé, sa condition, ses sources et son contrôle. Les sources « JP » renvoient à la section 4 ;
les autres, aux notes L1 à L5 et aux lectures de `texte/`.

### P1. On le dit à voix haute, et on juge le paragraphe entier

**Énoncé.** On dit chaque phrase du livre comme on l'expliquerait à quelqu'un debout à côté de soi. On lit le
paragraphe entier d'un trait, à voix haute, pendant qu'on l'écrit. Des phrases correctes une à une peuvent donner un
paragraphe sans tempo.

**Condition.** C'est la règle 0 d'aujourd'hui, mais on la testait sur la phrase seule. Chaque phrase du paragraphe du
monoxyde passait ce test.

**Sources.** JP, 15 octobre (« c'est la façon de dire les choses ») et 28 octobre (« le tempo du paragraphe »).
Flaubert, préface aux *Dernières Chansons* (1874) : la prose « doit, comme eux, pouvoir être lue tout haut ». BBC News
Styleguide (2003), p. 64 : « Read what you have written with your mouth as well as your eyes. »

**Contrôle.** A1 (l'oreille).

### P2. Le passage doit exister, à sa place, une seule fois

**Énoncé.** Avant de polir un passage, on se demande s'il doit exister. Il apprend quelque chose à la personne qui va
agir, il parle du sujet du chapitre, et on n'y dit chaque fait qu'une fois. Pour condenser, on choisit les faits qu'on
garde et on coupe les autres en entier. Dans les phrases qui restent, on laisse les « parce que » et les « mais ».

**Condition.** Un mot de liaison, un « parce que », un « encore » qui dit le moment ne sont jamais du remplissage. Ce
qui sort, ce sont les familles que JP a surlignées (la phrase sur le livre, la justification du cadrage, la
statistique d'ambiance, la chute, l'opposition en miroir) et ce que le lecteur sait déjà.

Pour le mécanisme d'un danger, il y a une condition de plus (R1, C15 et C17). Le mécanisme complet est dans la page des
dangers. Dans l'étape, la demi-phrase de pourquoi reste quand le réflexe est le mauvais. Les neuf rappels de
`CLAUDE.md` restent toujours, dits dans la phrase de l'étape qui s'en sert, et non recopiés dans la formule du
tableau. Sans cette condition, P2 ferait couper le mécanisme que `CLAUDE.md` veut répété. Au ch. 3, par exemple,
l'étape « rester loin de tout fil tombé » ne dit plus que le sol autour peut être sous tension.

**Sources.** JP, 28 octobre (« un paragraphe de même ça veut rien dire »), 15 octobre (« inutile, on le sait » ;
« no shit » ; « faut slaquer la répétition »), 28 octobre (« les chapitres doivent parler de ce qu'ils parlent, pas
des autres » ; « personne va lire 50 points de contrôle »). `CLAUDE.md` : le mécanisme « reste, et se répète ».
Zinsser : « What does the reader need to know next? » Lanson, *Conseils sur l'art d'écrire* (1898) : la concision
« ne se mesure ni au nombre des mots ni à la longueur des phrases ».

**Contrôle.** L'éditeur (`/diagnostiquer`, seul à couper) ; A2, question 5 ; les redites de `controle.py`.

### P3. Le pourquoi reste

**Énoncé.** On dit pourquoi on fait un geste quand la raison montre un risque qu'on ne verrait pas. Dans une page de
danger, le mécanisme est justement ce qu'on doit expliquer. On le dit avec son mot (« parce que », « c'est pour ça
que », « donc », « sinon », « pour »).

**Condition.** On le coupe dans un seul cas, quand le lecteur le sait déjà. La règle 2 d'aujourd'hui (« seulement si
la raison change ce qu'on fait ») et la « justification collée au geste » ont perdu cette condition.

**Sources.** JP, 16 octobre (« explique pourquoi » ; « pas en quelques mots, j'aime ça la version détaillée » ;
« faut pousser la chose plus loin ») et 28 octobre (« Faut l'expliquer »). Degani et Wiener, NASA (1994) : on suit une
consigne dont on connaît la logique. Google, *Procedures* : la raison après le geste, dans sa phrase.

**Contrôle.** A3, question 3 ; A2, question 1.

### P4. Le paragraphe suit ce qui arrive à la personne, et chaque phrase reprend la précédente

**Énoncé.** Avant d'écrire, on range les faits dans l'ordre où ils arrivent à la personne (d'où vient le danger, ce
qu'il fait au corps, ce qu'on remarque, ce qu'on fait). Chaque phrase commence par ce qu'on vient de dire et finit sur
ce qui est neuf. On reprend le nom plutôt qu'un pronom qui pourrait désigner deux choses (« Ce gaz »). Le sujet et le
verbe viennent avant la liste et la parenthèse ; une longue liste passe après le verbe, ou en liste à part. Un
paragraphe « Ce qui arrive » porte un seul danger.

**Condition.** L'ordre d'une page des dangers (d'abord d'où vient le danger, ou d'abord ce qu'il fait à la personne)
attend la réponse de JP (rapport, question 5).

**Sources.** JP, 16 octobre (« c'est la façon que le paragraphe est organisé »). Buffon, *Discours sur le style*
(1753) : « Le style n'est que l'ordre et le mouvement qu'on met dans ses pensées. » Gopen et Swan (1990) : le connu en
tête, le neuf à la fin. Le Guin : « the chief duty of a sentence is to lead to the next sentence ». Richaudeau,
rapporté en L5 (P9) : dans une phrase longue, les mots du début « ont le plus de chance d'être mémorisés ». L'animateur
(`lecteurs/synthese.md`, section 7) : « le sujet et le verbe avant la liste ou la parenthèse ». tempo-F (motif 4) : au
ch. 95, l. 11, le complément du verbe « convertit » arrive 45 mots plus loin ; aux ch. 83, 95 et 107, 62 phrases sur
902 font 40 mots et plus, et 54 aux ch. 68, 70 et 78 (tempo-E, motif 5). densite-A (motif 2) : huit paragraphes « Ce
qui arrive » de plus de 80 mots portent deux dangers ou trois chiffres.

**Contrôle.** `tempo.py` (phrases de 40 mots et plus, mots avant le premier verbe, à ajouter) ; A1, questions 1 et 3.

### P5. On dit le lien avec un mot

**Énoncé.** Quand deux faits ont un rapport (une cause, une conséquence, une condition, un contraste, une suite), on
dit ce rapport avec le mot qu'on emploierait en parlant : parce que, comme, donc, alors, c'est pour ça que, ce qui
fait que, quand, si, sinon, mais, puis, pour, pour que, jusqu'à ce que. Deux faits liés restent ensemble : dans la
même phrase, ou dans la suivante, qui commence par le mot du lien (« Alors », « C'est pour ça que », « Sinon »).

**Condition.** Le mot de liaison vient seulement quand le rapport existe. Les chevilles écrites (en effet, d'ailleurs,
ainsi, de plus, par ailleurs, certes) restent dehors. Dans une étape, le geste vient d'abord et la raison suit (P9).

**Sources.** Lanson (1898) : « c'est au langage à manifester cette liaison » ; « Chaque phrase tombe isolée, détachée,
indépendante, comme un axiome ou un oracle » ; et, avec le mot de Caligula sur Sénèque qu'il cite, « du gravier sans
ciment ». Albalat, *L'Art d'écrire* : « Les phrases doivent se lier non pas par des amorces factices, mais par la
logique de l'idée ». Savard, *Pour qu'on vous lise… tout simplement*, Revenu Québec (2003), p. 27 : « En
raccourcissant les phrases, on supprime parfois les liens logiques qui donnent tout son sens à la phrase. » Pearson,
rapporté par Richaudeau : une chaîne sans lien dit est rappelée par les sujets « en incluant, en inventant, une
relation cause-effet ». Davison et coll. (1980) : « Clause splitting shortens average sentence length, but may
obscure relations between the parts. » *Federal Plain Language Guidelines* (2011), p. 64, sur les connecteurs entre
les phrases, qu'on oublie parce qu'on connaît trop bien son sujet : « Being too familiar with our own material, we
think they aren't needed. » Commission européenne, *Rédiger clairement* : « n'oubliez pas les charnières ».
ASD-STE100, règle 4.4.

**Contrôle.** `tempo.py` (signaux de la section 6) ; A1, question 2.

### P6. La ponctuation : le deux-points annonce, le point-virgule lie, aucun tiret

**Énoncé.** Le deux-points annonce une liste, un exemple, une autre façon, une question ou la fonction d'une ligne de
Matériel. Il ne remplace pas « alors » ni « parce que ». Dans la prose, on en met un par paragraphe au plus, et jamais
deux dans une phrase. Le point-virgule lie deux phrases qui vont ensemble. Dans une série, le dernier élément prend
« et ». La parenthèse porte un renvoi, une unité ou l'impérial, jamais un fait qui change le geste, parce qu'on la lit
comme un aparté. On n'écrit jamais de tiret (— ou –) dans une phrase. Pour le remplacer, on prend d'abord le mot de
lien, puis la virgule ou le point.

**Sources.** OQLF, Banque de dépannage linguistique : le deux-points « peut en effet, la plupart du temps, être
remplacé par des expressions comme donc, parce que » ; « son emploi, plus percutant, permet d'alléger le texte » ; « Il
est généralement déconseillé d'employer le deux-points plus d'une fois dans la même phrase ». Pour le point-virgule :
« il lie davantage qu'il ne sépare ». Chafe (1987) : les deux-points lus avec la voix qui descend « 95 percent of the
time » (sur deux exemples), les parenthèses lues sans que la voix descende. JP, 15 octobre, sur le tiret : « y a juste
les AI qui mettent ça dans des phrases ».

**Contrôle.** `controle.py` (tiret, bloquant) ; `tempo.py` (deux-points, signal) ; A1, question 2.

### P7. Les longueurs varient avec ce qu'on dit, et la phrase finit sur ce qui compte

**Énoncé.** Un ordre ou un signe tient en quelques mots (« Sortir tout le monde. »). Une explication avec sa cause
prend une phrase plus longue, liée. Deux phrases voisines n'ont pas le même moule. La phrase finit sur le mot qu'on
doit garder en tête, pas sur une queue courte et négative ajoutée après un deux-points ou un « , et ».

**Condition.** On ne fabrique pas la variation. Une phrase courte faite pour frapper devient une maxime, et JP la
refuse. Le texte de l'éditeur que JP a donné (« alterne phrases courtes (percutantes) et phrases longues (rythmées) »)
veut dire, dans le livre, une phrase courte pour un ordre ou un signe, jamais pour une chute.

**Sources.** Albalat : « C'est le mélange seul qui produit la variété. » Le Guin : « The optimum is variety. » BBC
(2003), p. 63 : « Vary the length of your sentences. You are telling a story, not making a proclamation. » Flaubert à
Louise Colet (1854) : « deux coupes trop pareilles à casser ». Henry, cité par Albalat : la phrase « se termine par les
membres les plus étendus et par les mots les plus sonores ». Muñoz-Ortiz et coll. (2024), sur des articles de presse :
les modèles de langue font plus souvent des phrases de 10 à 30 unités que les humains. JP, 28 octobre, le texte de
l'éditeur.

**Contrôle.** `tempo.py` (bande de 10 à 30 mots, variation) ; A1, questions 4 et 5.

### P8. On sait qui fait le geste, et le geste est un verbe

**Énoncé.** On nomme le sujet (« les gens qui », « la personne qui », « on »). L'ordre est naturel : le verbe, ce
qu'on fait, puis où et quand. On dit une consigne comme une consigne (« on doit », « il faut », l'infinitif dans une
étape). Jamais le pronominal quand quelqu'un fait le geste. On dit le geste par un verbe, pas par un nom, et la
condition par « si » ou « quand », pas par un participe ou un adjectif en tête de phrase : « Si on n'ouvre pas le
réfrigérateur, il garde les aliments froids 4 à 6 heures », au lieu de « Fermé, le réfrigérateur garde les aliments
froids 4 à 6 heures » (ch. 1, l. 63).

**Condition.** « Se » reste quand la chose le fait toute seule (« le puisard se remplit »), et quand il dit ce qu'est la
chose, sans geste de personne (« Ce gaz ne se voit pas », dans le paragraphe que JP a adoré, section 8.1). Le gabarit
donne aujourd'hui une consigne au pronominal en modèle (« Ne se fabrique pas. »), alors on la corrige en même temps.

**Sources.** JP, 16 octobre : « on doit le cuire, pas il se cuit ; très important pour le livre ». JP, 15 octobre :
« Les gens qui étaient à l'extérieur doivent… ». BBC (2003), p. 17 : « write sentences with subjects that are doing
things ». voix-A, motifs 1 et 2 : 21 participes ou adjectifs détachés en tête, et au moins 19 noms d'action dont 14
au ch. 3 (« à chaque ouverture ») ; voix-E (motif 8) : environ 14 participes en tête ; consigne-C (motif 3) : au
ch. 25, 13 titres d'étape sur 34 ne disent aucun geste. Reinhart et coll. (2025), rapporté en L5 (P6) : les modèles de
langue emploient les propositions participes présentes à 2 à 5 fois le taux humain, et les nominalisations à 1,5 à
2 fois.

**Contrôle.** `controle.py` (à ajouter : « se » suivi d'un verbe de geste dans une étape ; participe passé ou adjectif
suivi d'une virgule en début de phrase) ; A1, question 6 ; A3, question 2.

### P9. L'étape : un geste, dans l'ordre du temps, la condition avant, le signe après

**Énoncé.** Une étape porte un geste, ou deux gestes qui se suivent sans arrêt, liés par « puis ». Les étapes suivent
l'ordre où on fait les gestes, et l'avertissement vient avant le geste qu'il gouverne. Le but, le lieu, la condition
qui change le geste et le pictogramme viennent avant le geste ; le signe qu'on voit quand c'est fait vient après
(« jusqu'à ce que… »). La raison vient après le geste, avec « parce que », dans la même phrase ou dans la suivante. On
annonce l'exception sur sa propre ligne, avant le geste qu'elle change, et on dit l'autre branche (« sinon »). Quand
l'étape laisse un choix, on dit comment choisir. Un signe grave est toujours suivi de ce qu'on fait. On découpe en
sous-étapes une étape qui a plusieurs gestes.

**Condition.** La série orange garde sa version détaillée (« j'aime ça la version détaillée »). On garde sa longueur,
et on découpe le détail en gestes.

**Sources.** ASD-STE100, règles 5.1 à 5.3 (une instruction par phrase, 20 mots au plus). *Microsoft Writing Style
Guide* et *Google developer documentation style guide*, « Procedures » : la condition avant, le résultat après. UK CAA,
CAP 676 (2006) et Degani et Wiener, NASA (1990) : le plus critique d'abord, peu de gestes à retenir. Millet-Robinet,
*Maison rustique des dames* (1877) : « on en ajoute jusqu'à ce qu'il ne fonde plus ». JP, 15 octobre (« TOUT EST
NOUVEAU » ; « oublie ça le thermomètre ») et 16 octobre (« faut pousser la chose plus loin »). consigne-A (motif 2) :
au ch. 3, les gestes ne suivent pas l'ordre du temps à huit places, et deux pages des dangers font pareil ;
consigne-B (motifs 3 et 5) et consigne-C (motifs 1 et 4) : au ch. 25, le premier geste dans l'eau glacée est
l'étape 24 ; au ch. 39, les quatre urgences sont à la section 9, sans série orange ; ailleurs, une consigne ne tranche
pas, ou deux consignes disent le contraire pour un même geste.

**Contrôle.** A3 ; A2, question 1.

### P10. Le mot qu'on dit, en français correct

**Énoncé.** Chaque mot est celui qu'un Québécois emploierait en l'expliquant à son voisin, en français correct. Le mot
de métier reste quand le geste en a besoin, et on l'explique la première fois. La fiche officielle sert à vérifier un
fait, jamais à donner la forme de la phrase. On ne met aucune citation de source entre guillemets, aucun « vous », et
on redit le fait avec nos mots.

**Condition.** Pas le joual (« y a pu »), et pas le mot de livre (« lucide », « à défaut », « impropre à »). On dit
une seule fois, dans le skill `langue`, où passe la frontière entre la langue parlée correcte et le joual, et ce skill
y renvoie. Le tour parlé correct (« ce gaz-là », « c'est pour ça que », la phrase détachée) attend la réponse de JP
(rapport, question 7). La règle vise la façon de dire, pas seulement le mot.

**Sources.** JP, 28 octobre (« On a sommeil, qui qui dit ça dans vrai vie, la façon que tu écris c'est pas bon »),
16 octobre (« c'est quoi ça, "carter" ? »), 15 octobre (« C'est quoi un change par personne ? »), 27 octobre (« Faut
pu jamais que ça arrive une faute de même »). Albalat : « Il faut écrire comme on parle, à la condition de bien
parler ». Radio-Canada, niveaux de langue (2004) : « Courant : Les termes utilisés à ce niveau sont courants, simples,
mais corrects. » Flaubert, rapporté par Albalat : « Où diable avez-vous rencontré des gens qui disent : « Scellons ce
pacte ? » » Le cadre, l. 21 : « La source sert à vérifier un fait, jamais à copier une forme. » Le skill d'aujourd'hui,
section « Les guillemets » : « Pas de citation de source ». Dans les chapitres pas encore refaits, la fiche est recopiée
entre guillemets : 51 citations aux ch. 48, 52 et 57 (voix-D, 3.1), 53 aux ch. 68, 70 et 78, dont 8 au « vous »
(voix-E, motif 4), et 97 phrases sur 119 guillemets ouvrants aux ch. 83, 95 et 107, avec 22 impératifs en « -ez »
(voix-F, motif 1).

**Contrôle.** `controle.py` (mots de livre, lus dans `references/mots.md` ; à ajouter : guillemets ouvrants, impératif
en « -ez ») ; A1, question 6.

### P11. Le même mot pour la même chose

**Énoncé.** Un objet garde son nom d'un bout à l'autre du chapitre (« génératrice » partout). Ce qu'on chasse, c'est
la redite de l'idée et la répétition du même moule de phrase, pas celle du mot exact.

**Condition.** « Un nom ne revient pas à chaque phrase » vient de « 4 fois Claude en un paragraphe » (JP, 19 octobre),
dans un texte qui présente quelqu'un. Il ne vaut pas pour le terme technique.

**Sources.** Pascal, *Pensées* : les mots répétés qu'on trouve « si propres qu'on gâterait le discours, il les faut
laisser ». Albalat : maintenir les répétitions « lorsqu'elles sont exactes, nettes, lumineuses ».

**Contrôle.** A1 ; A2, question 3.

### P12. Le fait, pas l'effet

**Énoncé.** Aucune phrase ne parle du livre, de la page, de ses sources ou de la recherche, ni de sa propre franchise
(« publié », « non sourcée », « le livre n'en invente pas », « dit honnêtement »). Pas d'image, pas de petite scène,
pas de chute en formule, pas de maxime, pas de chose qui pense, ment, tranche ou pardonne, pas d'opposition fabriquée.
On dit en clair le fait caché derrière la formule, sinon on coupe la phrase.

**Condition.** L'opposition fabriquée sort « quand elle n'ajoute pas un fait » (la condition que JP avait posée, perdue
le 20 octobre). Un vrai « mais » reste, et le « , pas X » d'une consigne aussi, parce que c'est ce qu'on dit à quelqu'un
qui va se tromper (« chauffer les pièces, pas la baguette »).

**Sources.** JP, 14 et 15 octobre (« Je veux pas de fils d'la AI » ; « c'est poétique mais dégueulasse »), 16 octobre
(« on dirait que tu parles en paraboles » ; « La braise ne sait pas » ; « une sorte de tournure que je veux plus dans
mon livre » ; « Sois plus clair quand tu dis des affaires de même »), 18 octobre (« tu as recommencé à faire des
tournures de phrase bizarres »). Lanson, *L'Art de la prose* : « Aimons la prose d'art et n'en faisons jamais. »
Buffon : « Rien ne s'oppose plus à la chaleur que le désir de mettre partout des traits saillants ». Orwell : les
phrases toutes faites « will construct your sentences for you ». Les phrases sur la recherche : une quarantaine au
lot D, 47 lignes au lot E et 28 au lot F (densite-D 2.3, voix-E motif 2, voix-F motif 2, densite-F motif 4).

**Contrôle.** `controle.py` (motifs de chute, d'opposition et de chose qui pense, élargis : « ne … pas … : il … »,
« , pas un + nom » en fin de phrase, verbes « mentir », « trancher », « pardonner », « faire foi » ; à ajouter :
« publié », « sourcé ») ; A1.

### P13. On dit le fait qui surprend comme une correction

**Énoncé.** Quand le réflexe normal est le mauvais, on nomme ce que les gens croient ou font d'habitude, puis on le
corrige avec « mais », puis on dit quoi faire. On ne cache pas le fait qui surprend au bout d'une phrase, derrière un
« ne… pas ».

**Condition.** Dans une liste, on nomme ce qui marche (« je veux savoir c'est quoi qui va au feu »). Le fait qui
corrige un réflexe reste, avec son « mais ».

**Sources.** Hesperian, *Là où il n'y a pas de docteur* : « Vous pensez que donner quelque chose à boire va aggraver la
diarrhée ? […] Mais les liquides ne sont pas la cause de la diarrhée. » Zinsser : « there is no stronger word at the
start ». `CLAUDE.md` : « le fait qui surprendrait un parent compétent parce que le réflexe normal est le mauvais ».

**Contrôle.** A1, question 7 ; `tempo.py` (« mais » pour 1000 mots).

### P14. On explique une notion ou un signe la première fois qu'on en parle

**Énoncé.** On dit en clair un mot que le livre invente (les quatre horloges, la bascule) à sa première apparition. On
explique en note de bas de page un signe que le lecteur ne sait pas reconnaître. On explique une chose préparée
d'avance là où on s'en sert.

**Sources.** JP, 28 octobre (« Les quatre horloges, mais on sait même pas c'est quoi les 4 horloges […] Faut
l'expliquer. »). Pinker, « Why Academics Stink at Writing » (2014), p. 11 : la malédiction du savoir.

**Contrôle.** A2, questions 2 et 4.

---

## 4. Les mots de JP à garder tels quels

Chaque phrase garde sa date et la condition qui l'empêche de couper trop large. Les dates et les mots viennent de
`plan/decisions-jp.md`, du skill `ecriture`, du cadre et de `plan/demandes-jp-epreuve-tome-1.md` (vérifiés par
recherche dans ces fichiers ; R2, section 7, les reprend avec leur contexte).

| Les mots de JP | Quand | Ce qu'ils demandent | La condition |
| --- | --- | --- | --- |
| « Faut que ça soit informatif, tout le livre. » | 14 et 15 oct. | Chaque phrase apprend quelque chose à quelqu'un qui doit agir | Un lien n'est pas du remplissage |
| « Je veux pas de fils d'la AI. » | 14 et 15 oct. | Les familles qu'il a surlignées sortent | Il n'a jamais surligné un pourquoi |
| « c'est pas juste les logigrammes, c'est la façon de dire les choses » ; « personne parle comme ça » | 15 oct. | On écrit comme on l'expliquerait | On juge le texte entier |
| « Enlève les — partout aussi : y a juste les AI qui mettent ça dans des phrases. » | 15 oct. | Aucun tiret | Le remplaçant n'est pas le deux-points |
| « inutile, on le sait » ; « no shit, man » | 15 oct. | Couper ce que le lecteur sait et la conséquence évidente | Seulement si le lecteur le sait |
| « faut slaquer la répétition » ; « ON LE SAIT, ON L'A DÉJÀ DIT » | 15 oct. | On dit une idée une seule fois | L'idée, pas le mot exact |
| « Les gens qui étaient à l'extérieur doivent… » | 15 oct. | Le sujet nommé, l'ordre naturel, la consigne | |
| « Je veux pas savoir qu'est-ce qui va pas au feu, je veux savoir c'est quoi qui va au feu. » | 15 oct. | Nommer ce qui marche | Le fait qui corrige un réflexe reste |
| « TOUT EST NOUVEAU » ; « oublie ça le thermomètre » | 15 oct. | On écrit l'urgence pour quelqu'un qui n'a rien préparé | |
| « quand l'utiliser, c'est juste quand l'utiliser » | 15 oct. | Une section fait son travail et rien d'autre | |
| « on dirait que tu parles en paraboles, arrête ça » ; « c'est la façon que le paragraphe est organisé. Moins poétique, plus informatif, en gardant un bon français professionnel » | 16 oct. | Le paragraphe a un ordre et des liens | Les mots techniques justes restent (« les mots, proportion et tout, c'est bon ») |
| « parle pas de même, explique pourquoi » | 16 oct. | Le pourquoi, le mécanisme | |
| « pas en quelques mots, j'aime ça la version détaillée » ; « faut pousser la chose plus loin » | 16 oct. | Une explication a la place qu'il lui faut | |
| « on doit le cuire, pas il se cuit ; très important pour le livre » | 16 oct. | On sait qui fait le geste | « se » reste quand la chose le fait toute seule |
| « la braise ne sait pas » ; « une sorte de tournure que je veux plus dans mon livre » ; « Sois plus clair quand tu dis des affaires de même » | 16 oct. | Pas de chose qui pense, pas de maxime | On dit en clair le fait caché |
| « ça sert à rien de faire ça si on refait toujours les mêmes erreurs » | 16 oct. | Une correction empêche le défaut, pas seulement la phrase | On applique un principe à ce qu'il visait (leçon du 23 septembre) |
| « j'ai l'impression que tu as recommencé à faire des tournures de phrase bizarres » | 18 oct. | Un regard extérieur | |
| « 4 fois Claude en un paragraphe » | 19 oct. | Varier un texte qui présente quelqu'un | Pas le terme technique |
| « c'est moi le regard qualité » ; « 4 M de jetons pour 6 planches, sérieusement ? » | 19 oct. | JP juge en dernier ; pas de boucle coûteuse | Dit pour les planches |
| « Faut pu jamais que ça arrive une faute de même » | 27 oct. | Aucune faute dans ce qui s'imprime | |
| « Point de contrôle faut que ça soit condensé, personne va lire 50 points de contrôle » | 28 oct. | Des tableaux courts | |
| « on passe trop de temps à tourner autour du pot » ; « condenser à ce qu'on doit vraiment savoir » | 28 oct. | Choisir les faits | « 150 à 230 mots » et « deux ou trois phrases » sont nos chiffres |
| « Non mais je veux dire un paragraphe de même ça veut rien dire » | 28 oct. | Se demander si le passage doit exister | |
| « la façon que t'écris c'est pas humain » | 28 oct. | On écrit un titre comme on l'écrirait à la main sur une fiche | |
| « Les quatre horloges, mais on sait même pas c'est quoi les 4 horloges […] Faut l'expliquer. » | 28 oct. | On explique une notion la première fois | |
| « On a sommeil, qui qui dit ça dans vrai vie, la façon que tu écris c'est pas bon » | 28 oct. | La façon d'écrire | Pas seulement le mot (la table de la règle 15 l'a réduit au mot) |
| « les chapitres doivent parler de ce qu'ils parlent, pas des autres » | 28 oct. | Chaque chapitre parle de son sujet | On répète quand même les rappels de sécurité |
| Le texte de l'éditeur : « alterne phrases courtes (percutantes) et phrases longues (rythmées). Accorde une attention critique à l'euphonie. » ; « sans jamais dénaturer la voix de l'auteur » | 28 oct. | Du rythme, l'oreille | Courte pour un ordre ou un signe, jamais pour une chute |
| « Lance un audit d'écriture de texte, repasse toute nos règle et réécrit le skill en lisant de la litérature et en ajoutant des auditeur. Je veux qu'on reparte sur des bonnes bases. » | 28 oct. | Des règles refaites à partir de principes, et des relecteurs qui n'ont pas écrit | |

**Les modèles que JP a approuvés.** Le ch. 11, « c'est parfait » (15 octobre au soir, version `ed85c511`) : 22,6 % de
phrases à deux-points, 17,6 % de « fait : conséquence », contre 37,6 % et 30,0 % pour le ch. 3 refait le 28 octobre.
Et le texte des auteurs qu'il a choisi le 19 octobre, qui dit la cause par « parce que » :

> « Claude a fait la recherche, a écrit les chapitres et a dessiné les planches. Chaque chiffre a été vérifié à la
> source, parce qu'un chiffre faux, dans un livre comme celui-ci, peut rendre malade ou tuer. Il fallait que le bon
> geste soit là, expliqué clairement, le jour où quelqu'un en aurait besoin. »

---

## 5. Les règles actuelles à couper ou à réécrire

### 5.1 Dans le skill `ecriture`

| La règle aujourd'hui | Ce qu'on en fait | Pourquoi |
| --- | --- | --- |
| Règle 1, « Une phrase, une information. Deux faits, deux phrases. » | Réécrire : règle d'étape seulement. Dans la prose, une idée neuve par morceau, et deux faits liés restent ensemble avec leur mot (P5) | Avec « chaque mécanisme dit ce qu'il change », les rédacteurs la réconcilient par un deux-points (R1, C1) ; Davison : couper les propositions cache les liens |
| Règle 2, « Le fait d'abord, la raison ensuite, et seulement si la raison change ce qu'on fait », avec l'exemple « Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant. » | Réécrire (P3, P9). Nouvel exemple : « Vidanger la plomberie avant qu'il fasse moins de 5 °C dans la maison, parce qu'un tuyau plein d'eau fend quand l'eau gèle dedans. » | L'exemple apprend le moule « fait : conséquence » ; la condition coupe le pourquoi que JP demande |
| Le test « Pour chaque phrase, puis pour chaque mot : sans lui, le lecteur sait-il moins quoi faire ? » | Réécrire : le test vaut pour la phrase et le passage ; un mot de liaison passe toujours | Pris mot à mot, il coupe les liens (R1, C4) |
| Les mots vides (« déjà, encore, tout, bien, vraiment, […] ainsi, d'ailleurs ») | Garder les chevilles écrites ; ajouter la liste des mots qu'on ne coupe jamais (parce que, donc, alors, mais, puis, ensuite, sinon, quand, si, comme, pour que, jusqu'à ce que) ; « encore » qui dit le moment n'est pas un mot vide | « déjà, encore, tout, bien » ne viennent pas de JP ; le script signale « toute » dans « dans toute la pièce », qui est le fait |
| « Le tiret » : remplacé par « la virgule ; les deux-points ; les parenthèses ; le point » | Réécrire (P6) : le mot de lien d'abord | Les 5 665 tirets du livre ont été remplacés selon cette liste, deux-points en deuxième |
| La mise en relief (« C'est la cendre qui tient le mieux » devient « La cendre tient le mieux ») et le motif `RELIEF` de `controle.py` | Réécrire : elle sort quand elle redit ; elle reste quand elle met en tête le mot qui compte (« Ce sont les vapeurs qui prennent feu ») ou quand elle dit la cause (« c'est pour ça que ») | Le skill la chasse dans son tableau et l'emploie dans ses corrections (R1, C16) ; tempo-D (motif 8) et tempo-E (motif 4) relèvent celle qui redit ; ces bases l'emploient aussi (« Ce qui saute, c'est la vapeur… ») |
| « Pas de citation de source » (section « Les guillemets ») | Garder (P10), avec un contrôle dans `controle.py` | 201 citations et phrases recopiées dans neuf chapitres pas encore refaits ; la règle risque de tomber avec les 6 000 mots coupés |
| Règle 8, « Dire ce qui marche », étendue au fait qui surprend ; « l'encadré danger » | Réécrire (P13) | Le fait qui surprend est souvent un « ne… pas » ; il n'y a plus d'encadré danger |
| Règle 12, « Pas de détour par la tentation ou le sentiment (« on est tenté de », « on a envie de ») » | Réécrire : le défaut est le détour qui ne mène à aucun geste, pas l'expression | La table de la règle 15 donne « on a envie de dormir » comme le mot qu'on dit (R1, C8) |
| Règle 15 et sa table « On l'écrit / On le dit » | Garder le principe (P10, la façon et le mot) ; la table devient une liste d'écoute dans `references/mots.md`, sans les trois lignes tirées de notre correction du monoxyde | Le paragraphe du monoxyde est fait de trois lignes de la table (R1, section 2 ; R3, point 5) |
| « Un nom ne revient pas » (cadre, « La répétition ») | Réécrire (P11) | Contredit « le mot exact, et toujours le même » (R1, C7) |
| « L'opposition fabriquée » (tableau « Les phrases ») et « pas de « X ne fait pas Y : il fait Z » » (cadre) | Remettre la condition de JP (P12) | Le motif `pas … mais` de `controle.py` signale les vrais « mais » |
| Le tableau « Ce que la relecture du 15 octobre change à la passe » et « Ce que JP a dit » | Déménager dans `plan/decisions-jp.md` ; les corrections deviennent des paragraphes entiers dans `references/exemples.md` | 45 % du skill ; une correction entrée en fragment devient une règle trop large |
| La ligne de la l. 330 (« la longueur suit le temps […] une partie « … : le détail » ») | Couper | La ligne suivante la remplace et le dit elle-même |
| « Ces neuf points s'ajoutent aux règles de ce skill » (le tableau a 24 lignes) ; « la structure des neuf points » (description) ; « section 2, section 3, section 9 » (règle 4) ; « le section 3 », « du section 8 » | Couper ou corriger | Sections disparues, fautes de genre laissées par le remplacement de « § » (R1, M7 à M13) |

### 5.2 Ailleurs

| Où | La règle | Ce qu'on en fait | Pourquoi |
| --- | --- | --- | --- |
| `CLAUDE.md`, règle 5 ; `plan/decisions-jp.md` | « Écrire dense » | « Écrire utile » (à JP de trancher : rapport, question 4) | Écrire « dense », c'est ce que les modèles de langue font d'eux-mêmes (Reinhart, PNAS 2025 : « noun-heavy, informationally dense », même quand on leur demande d'écrire comme on parle) |
| `CLAUDE.md`, « L'écriture » | « Pas de tiret […] : virgule, deux-points, parenthèses ou point » | « le mot de lien, la virgule ou le point » | P6 |
| `CLAUDE.md`, « Le gabarit », notes « En plus » | « un petit dessin » | Couper les trois mots | Contraire à la décision de JP notée au cadre (« Jamais de planche ni de dessin ») ; R1, M20 et C18 |
| `CLAUDE.md` et cadre | « l'opposition fabriquée » sans condition | Remettre « quand elle n'ajoute pas un fait » | Condition de JP perdue le 20 octobre |
| `CLAUDE.md` et cadre | « sans tour de relecture d'agents de plus » | JP a demandé les auditeurs le 28 : la ligne sort pour le texte et reste pour les planches (à confirmer : rapport, question 1) | Dit pour les planches le 19 octobre |
| `CLAUDE.md` et cadre, l. 9 à 11 | « Toute correction de JP entre le jour même dans le skill concerné et dans ce cadre » | À JP : le jour même, à une seule place (R3, section 7.7) | Chaque correction ajoute deux copies, et la vieille reste |
| `CLAUDE.md` et cadre | Les pages des dangers à « 150 à 230 mots » ; skill `editeur`, « Ce qui arrive (le mécanisme, en deux ou trois phrases) » | Garder la limite de mots, couper le compte de phrases ; condenser en coupant des phrases entières, jamais les liens | 31 des 36 paragraphes « Ce qui arrive » ont exactement deux ou trois phrases, et 33 % de leurs phrases ont un deux-points |
| Skill `editeur` | « spécialisé dans la haute littérature française » ; « sublimer » ; « (percutantes) » ; `/sublimer` et sa version « plus lyrique » | Garder le texte de JP tel quel en tête ; l'adaptation au livre dit « éditeur d'un manuel qu'on doit pouvoir lire à voix haute », la phrase courte pour un ordre ou un signe ; la version lyrique sort | La seule règle de rythme du projet est dans le skill qui perd les conflits, et elle appelle la chute (R1, C12) |
| Skill `editeur`, passe | « `/polir` ensuite » | L'éditeur reçoit les rapports des auditeurs, répond à chaque cas et réécrit une seule fois | R3, section 7.6 |
| `gabarit-chapitre.md` | « Neuf points », « 89 chapitres », « 3. Pourquoi ça marche », « 8. Danger (retiré) », « Le relecteur humain requis », « Renvoi à la réglementation de l'année », « Environ 700 mots utiles par page en 8 × 10 », les tirets, « Ne se fabrique pas. » ; le nom latin exigé (l. 154 et 168) ; la note verte « glissée après le paragraphe de l'étape » (l. 124-125) | Réécrire aux sept sections, sans tiret, sans pronominal ; couper le nom latin, que le cadre, plus récent, interdit (à JP s'il le faut : rapport, question 11) ; la note verte va dans un trou, jamais entre deux paragraphes | R1, M1 à M6 et C18 ; c'est encore le modèle que lisent les rédacteurs ; 91 chapitres des tomes 2 à 6 ont un nom latin |
| `roles.md` | « selon les dix points du gabarit » ; « Chaque nombre porte sa source » ; « Écris dense : ~700 mots utiles par page » ; « Lis CLAUDE.md et tous les chapitres déjà écrits » ; le prompt du rôle 4 ; « encadrés danger en filet rouge » ; « Légende sous l'image avec crédit et licence » | Réécrire ; le rôle 4 garde une ligne qui dit qu'il est retiré | R1, M14 à M18 |
| `controle.py` | `MOTS_VIDES` ; `pas … mais` ; « par ailleurs → rien » ; « d'où » | Réduire ; ajouter les alarmes contraires (paragraphe de quatre phrases sans lien, deux « fait : conséquence » de suite, pronominal dans une étape, participe ou adjectif en tête suivi d'une virgule, chute et opposition élargies) ; ajouter ce qui doit bloquer : les numéros de norme, les numéros de téléphone et les services qui répondent, les attributions (noms d'organismes), les citations de source (guillemets ouvrants, impératif en « -ez »), les phrases sur la recherche (« publié », « sourcé ») et la forme du chapitre (sept sections, 5 à 8 lignes par tableau, 15 à 20 mots par ligne de Matériel, 150 à 230 mots par danger) | Tous nos scripts cherchent ce qui est en trop ; aucun ne signale ce qui manque. Aujourd'hui, `controle.py` ne vérifie ni les normes, ni les téléphones et les services, ni les attributions, ni les citations de source, ni la forme du chapitre |
| `tempo.py` | La colonne « si » ; les alertes « mono % » et « même début % » ; « comme » compté seulement en tête de phrase | Corriger « si » (son motif compte aussi les « s' » de « s'endort ») ; compter « comme » aussi après « Et », « Mais » et « Puis » ; retirer les deux alertes | Elles ne séparent pas le livre du corpus (L5, section 5) ; le script ne voit pas « Et comme » |
| Skill `langue` | « la langue parlée ne s'écrit pas » | « on n'écrit pas le joual » ; on dit une seule fois où passe la frontière avec la langue parlée correcte | Contredit « le mot qu'on dit » (R1, C11) |

---

## 6. Les mesures : des signaux pour choisir quoi relire, jamais des cibles

On ne réécrit jamais pour un chiffre. Davison et coll. (1980) : « Adaptation was found to be most successful when the
adaptor functioned as a conscientious writer rather than as someone trying to make a text fit a readability
formula. » Une passe qui viserait « moins de 15 % de deux-points » en remplaçant chaque deux-points par une virgule
referait la même faute autrement. Les repères viennent du corpus de L5 (sept extraits enregistrés dans
`plan/audit-ecriture/references/`, plus Ringuet en entier, 13 chapitres sur 16 de Hémon, le ch. 15 de Hesperian et la
page Québec.ca « Panne de courant ») et de Lexique 3.83 pour le français de tous les jours.

| Mesure | Le livre | Le repère | Signal (on relit) |
| --- | --- | --- | --- |
| Phrases « fait : conséquence » | 23,7 % (tome 1 : 29,4 %) | 0 à 7 % (ensemble : 3,1 %) ; Hesperian 7,0 % | Plus de 10 % sur une section ; deux de suite dans un paragraphe |
| Phrases avec deux-points, dans la prose | 34,5 % (tout : 31,4 %) | 1,0 à 11,0 % | Plus de 15 % sur une section de prose ; deux dans une phrase |
| Mots de liaison parlés pour 1000 mots | 5,4 | 8 à 14,7 (récits, Millet-Robinet, Wikilivres) ; Hesperian 6,5 ; textes d'institution 2,0 à 3,6 | Moins de 6 dans la prose ; un paragraphe de quatre phrases et plus sans aucun lien |
| « mais » pour 1000 mots | 0,8 | Parlé 5,2, romans 4,5 (Lexique) ; corpus qui sonne bien 1,8 à 8,8 | Aucun « mais » sur 1000 mots de prose |
| « alors » pour 1000 mots | 0,29 | Parlé 1,78 | À suivre, sans seuil |
| Phrases de 10 à 30 mots | 59,7 % (tome 1 : 67,8 %) | 46 à 61 % | Plus de 65 % sur un chapitre |
| Phrases de 40 mots et plus | À mesurer (54 aux ch. 68, 70 et 78 ; 62 sur 902 aux ch. 83, 95 et 107) | 3 à 23 dans les extraits techniques, 12 à 17 dans les romans (tempo-F) | Chacune : A1 regarde si le verbe vient avant la liste |
| Variation de la longueur (écart-type sur moyenne) | 0,65 (tome 1 : 0,54) | Récits 0,75 à 0,80 ; Hesperian 0,67 ; textes d'institution 0,40 à 0,57 | Sous 0,55 sur un chapitre : A1 relit le souffle |
| Parenthèses pour 1000 mots, hors renvois | À mesurer (toutes : 9,5 ; tome 1 : 16,5) | 0 à 0,5 (récits, Millet-Robinet) | Une parenthèse qui porte un fait qui change le geste |
| Mots entre deux signes de ponctuation | 6,0 | 6,5 à 11,6 ; la parole, 5 à 6 (Chafe) | Aucun signal : le livre est déjà haché, il ne faut pas couper plus |
| Mots par phrase | 18,7 | 13,6 à 28,5 | Aucun signal : la longueur moyenne ne sépare rien |

**Ce que `tempo.py` doit changer** (R3, section 6 ; L5, sections 3 et 9) :

- mesurer **par paragraphe**, et donner les signaux par paragraphe ;
- mesurer **à part** les étapes numérotées, les puces et la prose (dans le livre, le moule « fait : conséquence » est
  pareil dans les trois : 23,2 %, 22,4 % et 25,6 %) ;
- ajouter « mais » et « alors » pour 1000 mots, la bande de 10 à 30 mots, les phrases de 40 mots et plus, les mots
  avant le premier verbe, les mots entre deux signes, les parenthèses hors renvois et la suite de deux « fait :
  conséquence » ;
- corriger la colonne « si », et compter « comme » aussi après « Et », « Mais » et « Puis » ;
- retirer « mono % », « même début % » et « attaque liée % » des alertes.

Et `controle.py --avant` compte les mots de liaison avant et après une passe, pour voir si elle en a coupé.

---

## 7. Les auditeurs

### 7.1 Ce qui vaut pour tous

L'auditeur n'a pas écrit la page, et il ne la réécrit pas. Il lit des paragraphes entiers, à voix haute. Pour chaque
cas, il donne la ligne, une citation de douze mots au plus, ce qui accroche, le numéro du principe et, s'il en a une,
une façon de le dire en une phrase, que l'éditeur prend ou laisse. Quand le même défaut revient, il le dit une fois
avec la liste des lignes (« 14 paragraphes : le deux-points de cause »), parce qu'on corrige une habitude et pas des
fragments. Il ne propose aucun fait neuf. Il reçoit `CLAUDE.md`, la partie « Pour tout agent » du cadre, sa fiche et
le texte, sauf A2, qui ne reçoit que sa fiche et le chapitre (à JP : rapport, question 3). Il ne reçoit pas le skill au
complet. Sa fiche a de cinq à neuf questions, et il rend dix accrocs au plus par chapitre, les plus coûteux d'abord.

### 7.2 A0, les mesures (des scripts, pas un agent)

- **Ce qu'il fait.** `controle.py` bloquera ce qui est exact : le tiret, « § », les mots bannis, les numéros de norme,
  les numéros de téléphone et les services qui répondent, les attributions, les citations de source, les ancres de
  planches, la forme du chapitre (les sept sections, 5 à 8 lignes par tableau, Matériel de 15 à 20 mots par ligne,
  dangers de 150 à 230 mots). Aujourd'hui, il n'en vérifie qu'une partie, et le reste est à ajouter (tableau 5.2).
  `tempo.py` donne les signaux de la section 6, par paragraphe. `langue.py` relève les fautes.
- **Ce qu'un script peut mesurer.** Tout ce qui précède, plus les chiffres, renvois et rappels qui disparaissent entre
  deux versions (`controle.py --avant`).
- **Sa place.** À la fin du rédacteur, puis après l'éditeur. Ses signaux disent aux auditeurs quels paragraphes lire
  d'abord.

### 7.3 A1, l'oreille

- **Son regard.** La prose qui explique (pages des dangers, sections 1, 2 et 7 hors étapes, mécanismes dans les
  étapes, notes « En plus »), lue d'un trait, à voix haute. Le lecteur-personnage le plus proche est l'animateur de
  `lecteurs/synthese.md`, celui qui a entendu « en fait plus », « jamais que » et les pronoms accrochés au mauvais nom.
- **Ses questions.**
  1. Où est-ce qu'on manque de souffle en lisant ? Est-ce qu'une liste ou une parenthèse passe avant le verbe ?
  2. À chaque deux-points et à chaque frontière de phrase, quel est le rapport ? Est-ce qu'un mot le dit ? S'il n'y a
     pas de rapport, le fait manque, ou la phrase ne devrait pas exister.
  3. Est-ce que le paragraphe suit ce qui arrive à la personne, ou est-ce qu'il faut revenir en arrière ?
  4. Est-ce que deux ou trois phrases de suite ont le même moule ?
  5. Est-ce que chaque phrase finit sur ce qui compte ?
  6. Est-ce qu'il y a un mot ou un tour qu'on n'entend jamais dire (une phrase de fiche recopiée, un participe en tête
     à la place d'un « si »), ou un mot qu'on entend de travers ? Par exemple, on entend « le poêle en fait plus »
     comme « en fait », et dans « le plus de la première va au moins de la deuxième », on entend « au moins » comme « au
     minimum ».
  7. Est-ce qu'on entend le fait qui surprend comme une surprise, avec son « mais » ?
  8. Est-ce qu'un pronom peut désigner deux choses ?
  9. Aux chapitres du chalet et du territoire (tomes 3 à 5), est-ce que c'est le mot qu'on dit au camp et dans le
     bois ? (le regard du trappeur, sans son joual)
- **Ce qu'un script peut mesurer pour lui.** Les signaux de `tempo.py` ; les mots de livre et les tours connus de
  `controle.py`. Le reste est à l'oreille.
- **Sa place.** Après le vérificateur technique, en même temps que A2 et A3, avant l'éditeur.

### 7.4 A2, le lecteur naïf

- **Son regard.** Tout le chapitre, lu par un parent compétent de ses mains qui n'a jamais fait ce geste. Il doit être
  un agent neuf, qui n'a lu ni les sources, ni les règles, ni le chapitre ; sinon il n'est plus naïf (Pinker, « Why
  Academics Stink at Writing », 2014, p. 15 : « showing a draft to a sample of real readers and seeing if they can
  follow it »). On mesure la compréhension, pas le goût.
- **Ses questions.**
  1. Après chaque étape, qu'est-ce que vous feriez, dans l'ordre ?
  2. Quel mot, quelle notion ou quel signe est-ce que vous avez dû deviner ?
  3. Où est-ce que vous avez dû chercher de quoi parlent « il », « son » ou « ce » ?
  4. Quelle chose préparée d'avance est utilisée sans être expliquée ?
  5. Quelle phrase ne vous apprend rien que vous ne saviez déjà ?
  6. Quelle phrase est-ce que vous avez relue deux fois ?
  7. Quelle phrase est-ce que vous pourriez comprendre à l'envers, et qu'est-ce que vous auriez fait alors ?
- **Ce qu'un script peut mesurer pour lui.** Rien ; c'est le regard qu'aucun script ne remplace. Les dix lectures à
  l'envers de `lecteurs/synthese.md` (section 3) servent de banc d'essai.
- **Sa place.** Avec A1 et A3. Une fois par tome, avant l'épreuve, un passage de l'ado sur les séries orange vaut son
  coût (synthèse, section 7).

### 7.5 A3, les consignes

- **Son regard.** Les étapes, les séries orange, le logigramme, le Matériel et les tableaux, lus par la personne qui
  fait le geste, la lampe au front. Le lecteur-personnage le plus proche est la paramédic. Sa limite : il juge l'ordre
  et la lecture sous stress, pas le contenu médical ni technique ; ses doutes de fond vont au vérificateur technique.
  Sans cette limite, il redevient le vérificateur sécurité que JP ne veut plus.
- **Ses questions.**
  1. Est-ce que chaque phrase d'étape porte un geste, à l'infinitif ?
  2. Est-ce qu'on sait qui fait le geste ?
  3. Est-ce que la condition, le lieu et le pictogramme viennent avant le geste ? Est-ce que la raison, avec son mot,
     et le signe qu'on voit viennent après ?
  4. Est-ce que l'exception est sur sa propre ligne, avant le geste qu'elle change, avec l'autre branche ?
  5. Est-ce que chaque signe grave est suivi de ce qu'on fait ici ?
  6. Si je fais les étapes une à une, est-ce que je fais une erreur avant de lire la phrase qui l'aurait empêchée ?
     Quand l'étape laisse un choix, est-ce qu'elle dit comment choisir ? Est-ce que deux étapes disent le contraire
     pour un même geste ?
  7. Est-ce que la série orange suit la scène réelle (rien de préparé, ce qui sauve d'abord), et est-ce que la
     pastille dit le temps qu'on a ?
  8. Est-ce que le logigramme fait des phrases complètes, avec des questions auxquelles on répond par oui ou non ?
  9. Est-ce que chaque ligne de Matériel et de tableau change une décision ?
- **Ce qu'un script peut mesurer pour lui.** La longueur des étapes (plus de 100 mots), les « sauf si » et « si »
  placés après le geste, le pronominal dans une étape, la forme des tableaux (5 à 8 lignes).
- **Sa place.** Avec A1 et A2.

### 7.6 Ce qui ne devient pas un auditeur

- **L'existence et la place** (est-ce que le passage doit exister, est-ce qu'il est au bon chapitre, est-ce qu'on le
  dit une seule fois) restent à l'éditeur, qui est le seul à couper. Un auditeur qui coupe ferait un deuxième
  rédacteur.
- **L'intention de JP** (R2 proposait un auditeur) entre comme trois questions dans la passe de l'éditeur, posées à
  chaque coupe : est-ce que ça doit exister (« ça veut rien dire ») ? est-ce que le pourquoi est là quand on ne le sait
  pas (« explique pourquoi ») ? est-ce que ça se dit (« qui qui dit ça dans vrai vie ») ?
- **La langue** reste au correcteur. La liste « Les fautes qui reviennent » de la prof peut entrer dans le skill
  `langue`.

### 7.7 La place dans la chaîne (`roles.md`)

```
Rédacteur → A0 → Vérificateur technique → A1 l'oreille       ┐
                                          A2 lecteur naïf    ├→ Éditeur → A0 → Correcteur → Metteur en pages → JP
                                          A3 les consignes   ┘
```

- Les auditeurs passent **après le vérificateur**, sur un texte dont les faits sont arrêtés.
- Ils passent **avant l'éditeur, en même temps, sans voir le travail des autres**. L'éditeur reçoit les trois
  rapports, répond à chaque cas (« fait », ou « non » et pourquoi) et réécrit une seule fois. Il n'y a pas
  d'aller-retour.
- **A0 repasse après l'éditeur**, et le vérificateur relit seulement ce qui a changé de sens.
- Le correcteur passe en dernier sur le texte, parce que l'éditeur réécrit.
- JP reste le regard final.

La synthèse des lecteurs les plaçait plutôt après l'éditeur, avant le correcteur. Avec cet ordre, quelqu'un doit
encore réécrire après eux, ce qui fait une deuxième passe d'éditeur. L'ordre de R3 évite ce retour ; c'est à JP de
trancher (rapport, question 1).

**Le coût**, en mots lus au départ (R3, section 7.6). Aujourd'hui, l'éditeur lit environ 25 000 mots avant d'agir.
Avec la structure proposée, un auditeur en lit environ 9 500, et l'éditeur environ 12 800. Trois auditeurs et
l'éditeur lisent ensemble environ 41 000 mots, 1,6 fois l'éditeur d'aujourd'hui ; si A1 et A3 sont un seul agent qui
fait deux passes, on tombe à environ 32 000, 1,3 fois. On mesure le coût réel sur deux ou trois chapitres, et on le
dit à JP avant la grande passe.

---

## 8. Les exemples avant et après

Tous les « avant » sont des citations exactes du livre (vérifiées par recherche dans `chapitres/` et `dangers/` le
28 octobre 2026). Les « après » n'ajoutent aucun fait ni chiffre. Les rédacteurs vont imiter ces « après », alors
chacun doit lui-même respecter tous les principes.

### 8.1 Le paragraphe du monoxyde (`dangers/partie-1.md`, l. 3)

**Avant la condensation** (`e8a62b2a`), la fin de « Ce qui arrive » :

> « Une fois respiré, il se fixe sur l'hémoglobine du sang, qui l'attire 200 à 250 fois plus que l'oxygène. Le sang
> continue de circuler, mais il n'apporte plus d'oxygène aux organes. On ne suffoque pas et on ne tousse pas. On a mal
> à la tête, on a sommeil, et on s'endort au lieu de sortir. »

**L'épreuve** (77 mots ; deux « fait : conséquence » sur quatre phrases ; aucun mot de liaison ; variation 0,38 ; les
quatre phrases commencent par « Le » ou « Il », soit « Le poêle », « Le gaz », « Il prend » et « Il se répand ») :

> « Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus
> quand on ferme presque l'entrée d'air pour la nuit. Le gaz ne se voit pas et ne se sent pas. Il prend la place de
> l'oxygène dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans toute la pièce,
> jusqu'au plancher : se coucher par terre ne protège pas. »

**Le modèle : la version que JP a adorée** (le 28 octobre : « j'adore celui-là, comment il est écrit », sauf la
dernière phrase, refaite ensuite ; 94 mots en six phrases de 10 à 24 mots ; aucun deux-points ; 21,3 mots de liaison
pour 1000 ; variation 0,27). Elle vient des neuf lecteurs (`lecteurs/synthese.md`, section 4), et elle est dans la page :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone. Le poêle en dégage plus la
> nuit, quand on ferme l'entrée d'air presque au complet. Ce gaz ne se voit pas et n'a pas d'odeur. Il prend la place
> de l'oxygène dans le sang, alors on a envie de dormir. On ne se doute de rien, et on s'endort avant d'avoir pensé à
> sortir. Ça ne sert à rien de se coucher par terre comme dans la fumée, parce que le monoxyde remplit toute la pièce,
> jusqu'au plancher.

**Ce qu'elle montre.** Un fait par phrase, et des longueurs qui changent avec ce qu'on dit. Le poêle de la nuit a sa
phrase à lui. Les liens se disent avec les mots qu'on dit (« alors », « et », « parce que »). Le nom revient (« ce
gaz », « le monoxyde ») quand un « il » serait loin de son nom. « On a envie de dormir » dit ce qu'on sent. « Avant
d'avoir pensé à sortir » remplace « au lieu de sortir », qu'on entendait comme un choix. La fin nomme le réflexe de la
fumée, puis dit pourquoi il ne sert à rien.

**La dernière phrase que JP a trouvée bizarre**, et pourquoi : « Le monoxyde remplit toute la pièce jusqu'au plancher :
même couché par terre, comme on le ferait dans la fumée, on le respire. » Un deux-points de plus, et une comparaison
glissée au milieu de la phrase, qui coupe le souffle.

**La leçon.** Avant que JP la lise, la synthèse de l'audit l'avait classée « à ne pas copier » : elle gardait le
pronominal « ne se voit pas » (P8) et « on a envie de dormir », tiré de la table de la règle 15. Ce sont les principes
qui se trompaient. « Ce gaz ne se voit pas » dit ce qu'est le gaz, et personne n'y fait de geste (voir la condition de
P8) ; « on a envie de dormir » est le mot qu'on dit. Quand un principe rejette une phrase que JP aime, on corrige le
principe. Ce paragraphe est le diapason du skill : un auditeur qui le signalerait se trompe.

**Ce qu'on avait proposé avant** (81 mots, variation 0,21), pour comparer : « Le monoxyde de carbone vient du poêle, du
barbecue, du réchaud, du fanal et des moteurs. […] On le respire même couché par terre, parce qu'il se répand dans
toute la pièce, jusqu'au plancher. » Les longueurs y restaient trop égales, et il n'y avait ni ce qu'on sent ni la
fumée.

### 8.2 Le lien caché

| Avant (citation exacte) | Après |
| --- | --- |
| « Remplir le bidon posé au sol, le bec appuyé contre le métal du bidon : l'essence qu'on verse se charge d'électricité statique. » (`dangers/partie-1.md`, l. 51) | « Poser le bidon par terre pour le remplir, et tenir le bec qui verse l'essence contre le métal du bidon, parce que l'essence qui coule se charge d'électricité statique. » |
| « On ne voit pas si un fil est sous tension : on fait toujours comme s'il l'était. » (`dangers/partie-1.md`, l. 32) | « On ne voit pas si un fil est sous tension, alors il faut toujours faire comme s'il l'était. » |
| « De la fumée monte du gras : s'il continue de chauffer, il va prendre feu tout seul. » (`dangers/partie-1.md`, l. 60) | « Quand le gras se met à fumer et qu'on continue de le chauffer, il va prendre feu tout seul. » |
| « Un jeune enfant s'intoxique plus vite qu'un adulte, et il a seulement l'air fatigué ou de mauvaise humeur. » (`dangers/partie-1.md`, l. 5) | « Un jeune enfant s'intoxique plus vite qu'un adulte, mais il a seulement l'air fatigué ou de mauvaise humeur. » |
| « Beaucoup de morts sont des gens partis trop tard : la fumée cache la route, et le seul chemin peut être fermé avant que le feu arrive. Les braises allument plus de 90 % des maisons détruites : le vent les porte jusqu'à 2 km en avant du feu, même par-dessus un lac. La chaleur rayonnante tue avant les flammes : elle brûle la peau à 100 m et traverse les vitres. » (`dangers/partie-1.md`, l. 86 ; trois phrases sur trois) | « Beaucoup de gens qui meurent sont partis trop tard. Quand on part tard, la fumée cache la route, et le seul chemin peut être fermé avant que le feu arrive. Plus de 90 % des maisons détruites sont allumées par des braises, que le vent porte jusqu'à 2 km en avant du feu, même par-dessus un lac. La chaleur rayonnante tue avant que les flammes soient là, parce qu'elle brûle la peau à 100 m et passe à travers les vitres. » (mêmes faits, mêmes chiffres) |
| L'exemple du skill lui-même : « Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant. » | « Vidanger la plomberie avant qu'il fasse moins de 5 °C dans la maison, parce qu'un tuyau plein d'eau fend quand l'eau gèle dedans. » |

### 8.3 Le fait qui sauve, en fin de phrase

| Avant (citation exacte) | Après |
| --- | --- |
| « On a ensuite 10 minutes de mouvements utiles, avant que les bras, les jambes et les doigts perdent leur force ; on perd conscience au bout d'environ 1 heure. » (`dangers/partie-1.md`, l. 206) | « Ensuite, pendant 10 minutes, les bras, les jambes et les doigts répondent encore, puis ils perdent leur force. Au bout d'environ 1 heure dans l'eau, on perd conscience. » (l'heure se compte depuis la chute, pas depuis la fin des 10 minutes) |
| « Jeter aussi, sans y goûter, le poisson fumé ou sous vide, même s'il a l'air bon et sent bon : le botulisme de type E, celui du poisson, fait sa toxine dès 3 °C, et un réfrigérateur en panne monte à 6 ou 8 °C. » (ch. 3, l. 243) | « Jeter aussi le poisson fumé ou sous vide sans y goûter, même s'il a l'air bon et sent bon. Un réfrigérateur en panne monte à 6 ou 8 °C, et c'est assez chaud pour le botulisme de type E, celui du poisson, qui fait sa toxine dès 3 °C. » |

### 8.4 La consigne

| Avant (citation exacte) | Après |
| --- | --- |
| « Partir dès le premier soir si quelqu'un dépend d'un appareil médical électrique, sauf si on l'a essayé avant la panne sur une batterie d'auto et un onduleur, et qu'il marchait. » (ch. 3, l. 140) | « Quand quelqu'un dépend d'un appareil médical électrique, on peut rester seulement si, avant la panne, on l'a fait marcher sur une batterie d'auto et un onduleur. Sinon, il faut partir dès le premier soir. » |
| « Si la fumée sort par la porte du poêle à l'allumage, la cheminée refoule : après quelques heures sans feu par grand froid, l'air de la cheminée est plus froid et plus lourd que celui de la maison, et il descend. Rouler une feuille de papier en torche […] ; allumer le petit bois seulement à ce moment-là. » (ch. 3, l. 102 ; deux deux-points et un point-virgule dans la même étape) | « Si la fumée sort par la porte du poêle à l'allumage, c'est que la cheminée refoule. Après quelques heures sans feu par grand froid, l'air de la cheminée est plus froid et plus lourd que celui de la maison, alors il descend. Pour réchauffer la cheminée, rouler une feuille de papier en torche, l'allumer et la tenir le plus haut possible dans le poêle, près de la sortie de fumée, jusqu'à ce que le tirage aspire la flamme. Allumer le petit bois seulement à ce moment-là. » (le geste garde son déclencheur ; faire la torche avant toute fumée changerait le moment du geste, et ce serait au vérificateur technique d'en juger) |
| « Sortir tout le monde, sans chercher d'où vient le gaz. Pendant des retombées, trouver d'abord ce qui brûle et l'éteindre (ch. 4, étape 18). » (`dangers/partie-1.md`, étape 1 du monoxyde ; l'exception vient après le geste) | « Sauf pendant des retombées, sortir tout le monde, sans chercher d'où vient le gaz. » Puis, sur la ligne suivante : « Pendant des retombées, trouver d'abord ce qui brûle et l'éteindre (ch. 4, étape 18). » Les trois premiers mots arrêtent la personne qui est dans le cas rare, et les autres lisent leur geste tout de suite |
| « On ne tient jamais que le cuir. » (ch. 107, l. 421 ; le porte-électrode est une pince-étau aux poignées gainées de cuir, à côté de la pince de masse ; cinq lecteurs ont mis la main sur le métal) | « Il faut tenir le porte-électrode seulement par le cuir des poignées, jamais par le métal. » |
| « Sans nitrite, 2,5 % n'est pas un plancher, c'est un pari. » (ch. 68, l. 116 ; l'ado aurait salé à 2,5 %) | Au rédacteur, avec sa source : dire le geste (ce qu'on fait sans nitrite) avant la mise en garde. La phrase est aussi une opposition fabriquée. |

### 8.5 La voix d'un ministère

| Avant (citation exacte) | Après |
| --- | --- |
| « **À garder**, s'il n'y a aucun signe de détérioration : les fromages fermes, le beurre… » (ch. 3, l. 241 ; la même formule est aux ch. 70, 73 à 77 et 80) | « **À garder**, si l'aliment ne sent pas mauvais et n'a pas l'air gâté : les fromages fermes, le beurre… » (le nom vient avant la liste, et l'odeur compte autant que l'apparence) |
| « Un message texte ou un courriel encombre moins le réseau qu'un appel : il peut passer quand les appels saturent le réseau, ou quand le service téléphonique est interrompu. » (ch. 3, l. 94) | « Un message texte ou un courriel prend moins de place sur le réseau qu'un appel, alors il peut passer quand tout le monde appelle en même temps, ou quand on n'arrive plus à téléphoner. » |

### 8.6 La formule

| Avant (citation exacte) | Après |
| --- | --- |
| « C'est pour ça que le VFI se porte, pas se transporte. Un gilet rangé sous le banc est un objet décoratif. » (ch. 57, l. 212) | « C'est pour ça qu'il faut mettre son VFI avant de partir, au lieu de le laisser sous le banc. » |
| « Ce n'est pas le liquide qui saute, c'est la vapeur mélangée d'air : le réservoir vidé et séché est plus dangereux que le plein. » (ch. 107, l. 35) | « Ce qui saute, c'est la vapeur mélangée à l'air. Dans un réservoir vidé et séché, un fond de vapeur qu'on ne voit pas suffit pour le faire sauter, alors il est plus dangereux qu'un réservoir plein. » (le fond de vapeur est dans la même case du ch. 107 ; si la source dit pourquoi le réservoir plein saute moins, le rédacteur l'ajoute, sinon la comparaison sort) |
| « Un ours dont on jette le gras pour ne garder que le muscle est un ours à moitié perdu. » (l. 306) et, plus loin, « Un ours dont on n'a gardé que les steaks a été gaspillé aux trois quarts. » (l. 447 et 448) (ch. 52) | Couper les deux. Le fait est dit aux l. 393 et 458 (« le gras, qui est la moitié de la valeur de la bête »). « À moitié perdu » le redit en formule, et « aux trois quarts » est une fraction que rien n'appuie (règle 1 de `CLAUDE.md`). |

### 8.7 Les passages modèles (la littérature)

- **Millet-Robinet, 1877, la raison avec son mot** : « Il vaut mieux avoir plusieurs saloirs de moindre dimension
  qu'un seul d'une grande contenance ; car, si on laisse un saloir longtemps entamé, le salé peut finir par
  s'altérer. » Le livre aurait écrit « Plusieurs petits saloirs plutôt qu'un gros : un saloir entamé longtemps
  s'altère. »
- **Millet-Robinet, le travail dans son ordre** : « Quelques jours après la salaison, on doit visiter les saloirs et
  les secouer avec précaution pour tasser la viande et faire pénétrer le sel dans les interstices qui pourraient
  exister entre les morceaux; alors, s'il se fait un vide à la surface, on le remplit avec de la saumure. A cet effet,
  on fait dissoudre du sel dans de l'eau, on en ajoute jusqu'à ce qu'il ne fonde plus ». On y entend quand, qui, quel
  geste, pour quoi, puis « alors, s'il… », et la fin est un signe qu'on voit.
- **Hesperian, la croyance corrigée** : « Vous pensez que donner quelque chose à boire va aggraver la diarrhée ? Il est
  facile de croire cela lorsque vous voyez un enfant qui a des diarrhées liquides. Mais les liquides ne sont pas la
  cause de la diarrhée. »
- **FM 21-76, le fait puis « because »** : « Several layers of lightweight clothing are better than one equally thick
  layer of clothing, because the layers have dead-air space between them. »

Les passages complets, avec leurs mesures, sont dans L1 (section 6), L4 (section 4) et L5 (section 7).

---

## 9. Le banc d'essai et l'ordre du travail

**Le banc d'essai** (R3, section 7.8). C'est un dossier des paragraphes que JP a signalés, chacun avec sa version
d'avant, sa version d'après et le verdict de JP : la page du monoxyde, le paragraphe « On est tenté… » de la génératrice
(coupé), les quatre horloges du ch. 1, la section 2 du ch. 1, la section 3 du ch. 3 (les « paraboles »), la braise du
ch. 13, la vidange de l'étape 23 du ch. 3, « Régler dehors » du ch. 17. On y ajoute les dix lectures à l'envers des
lecteurs. Chaque nouvelle version du skill passe par lui. Un agent qui n'a que le skill récrit les versions d'avant,
`tempo.py` les mesure, et JP en lit deux ou trois avant qu'on lance un chapitre.

**L'ordre** (R3, section 7.9), une fois que JP a tranché :

1. Déplacer l'histoire dans `plan/decisions-jp.md`, puis écrire le skill court, `references/` et les fiches des
   auditeurs.
2. Récrire le gabarit aux sept sections, alléger `CLAUDE.md` et le cadre, mettre `roles.md` à jour.
3. Adapter les scripts (section 6 et tableau 5.2).
4. Passer le banc d'essai ; JP lit la page du monoxyde et deux autres paragraphes.
5. Faire passer deux ou trois chapitres du tome 1 par la nouvelle chaîne, avec le coût noté, et les montrer à JP.
6. Le reste du tome 1, puis la grande passe des tomes 2 à 6.

**Les pièges à éviter.**

- Viser un chiffre. Les mesures désignent un paragraphe à relire, elles ne disent pas quoi écrire.
- Saupoudrer des mots de liaison pour « faire parlé ». Le mot vient quand le rapport existe (Albalat).
- Fabriquer la variation. Une phrase courte faite pour frapper devient une maxime.
- Entrer une correction de JP comme un fragment à substituer. On cherche ce que ses exemples ont en commun, on écrit le
  principe à une seule place, et le paragraphe entier entre dans `references/exemples.md`.
- Recopier une règle dans quatre fichiers.
