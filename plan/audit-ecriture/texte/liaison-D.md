# Audit de l'écriture : les liens entre les phrases, lot D (tome 3)

28 octobre 2026. Un seul regard : **les liens entre les phrases**, la logique dite ou sous-entendue. Entre deux phrases,
le lecteur sait-il si la seconde est la cause de la première, sa conséquence, sa condition, une exception ou la suite ?
Lot : `chapitres/48-lievre-d-amerique.md`, `chapitres/52-ours-noir.md`, `chapitres/57-truite-et-omble-au-lac.md`, lus
au complet. Aucun fichier du livre n'a été modifié.

Les trois chapitres ne sont pas encore refaits : ils ont l'ancien gabarit en neuf sections, 133 tirets (48 : 50 ; 52 :
38 ; 57 : 45), 23 « § » et 58 passages cités entre guillemets. La refonte va tout toucher. Ces notes disent ce que la
refonte doit **ajouter** (le mot qui dit le lien) en enlevant le reste, sinon elle remplacera chaque tiret et chaque
citation par un deux-points et laissera des faits posés côte à côte.

Les réécritures sont des exemples : aucun fait ni chiffre neuf, seulement les mots qui disent le lien et l'ordre des
morceaux. Les citations sont recopiées sans le gras ni l'italique ; le numéro est celui de la ligne où la citation
commence.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | « : » % | fait:csq % | ;/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 48 | 5670 | 308 | 18,4 | 34,4 | 26,0 | 3,4 | 6,3 | 4,2 |
| ch. 52 | 4850 | 245 | 19,8 | 29,8 | 23,7 | 5,4 | 6,6 | 4,9 |
| ch. 57 | 5447 | 273 | 20,0 | 28,9 | 25,3 | 3,1 | 5,5 | 6,2 |
| **le lot** | 15967 | 826 | 19,3 | 31,2 | 25,1 | 3,9 | 6,1 | 5,1 |
| les 7 références | 17297 | 807 | 21,4 | 6,3 | 3,1 | 5,5 | 9,2 | 5,8 |

Les références sont les sept textes de `plan/audit-ecriture/references/` (même script). Dans le lot, **une phrase sur
quatre est en « fait : conséquence »**, huit fois plus que dans les références (Ripley 1946, le texte technique le plus
proche : 1,0 %).

### Les mots de liaison, un par un (`tempo.py --json`, pour 1000 mots)

| mot | ch. 48 | ch. 52 | ch. 57 | le lot | les 7 références |
| --- | --- | --- | --- | --- | --- |
| parce que | 1,23 | 2,06 | 0,92 | 1,38 | 0,35 |
| car | 0,18 | 0 | 0 | 0,06 | 1,50 |
| donc | 0,71 | 1,03 | 1,29 | 1,00 | 0,64 |
| alors | 0,18 | 0,41 | 0 | 0,19 | 0,69 |
| mais | 1,23 | 0,41 | 0,73 | 0,81 | 3,76 |
| sinon | 0 | 0,21 | 0,55 | 0,25 | 0 |
| pour que | 0,35 | 0 | 0,73 | 0,38 | 0,40 |
| et | 30,16 | 37,11 | 31,21 | 32,63 | 26,07 |

Deux constats. Le lot écrit « parce que » et « donc » à peu près autant que les références, mais il pose en plus une
phrase sur quatre en « fait : conséquence » sans aucun mot : la plupart des liens restent tus. Et **« mais » est
4,6 fois plus rare** que dans les références : le contraste passe par la tournure « pas X, Y » (motif 7) au lieu d'un
« mais ».

### Ce que fait le deux-points (relevé à la main, ch. 52)

Les 70 phrases à deux-points de la prose du ch. 52 (hors tableaux), classées selon le mot qu'on dirait à voix haute à
sa place :

| Le deux-points tient lieu de | Phrases | Exemple (ligne) |
| --- | --- | --- |
| « donc », « alors » (la conséquence vient après) | environ 16 | « Elle ne change rien au parasite : la viande sortie du congélateur devra quand même monter à 74 °C. » (176) |
| « parce que » (la cause vient après) | environ 13 | « Le tranchant sert le moins possible : chaque entaille laisse du gras sur le muscle… » (127) |
| une liste, une étiquette, une définition (l'emploi normal) | environ 20 | « Trier le gras cru en deux tas : … » (129) |
| une annonce, une citation, un renvoi | environ 12 | « Il reste une seule barrière : 74 °C à cœur… » (271) |
| le comment, un contraste, une formule | environ 9 | « il y a la chaleur, ou il y a le parasite » (463) |

Quatre fois sur dix, le deux-points remplace un mot de cause ou de conséquence, et les deux sens alternent d'une
phrase à l'autre : le lecteur tranche lui-même à chaque fois.

## 2. Les défauts, du plus grave au moins grave

### Motif 1. La ponctuation à la place du mot de lien (gravité haute)

Le deux-points, le point-virgule et le tiret tiennent lieu de « parce que », « donc », « mais » ou « sinon ». Le sens
change d'une phrase à l'autre dans le même paragraphe, et c'est ce que l'oreille entend comme un mauvais tempo : chaque
phrase s'arrête net, la suivante repart sans dire d'où elle vient. C'est le défaut du paragraphe du monoxyde (« Il
prend la place de l'oxygène dans le sang : on s'endort… »), et il est partout dans le lot.

**Fréquence** : 31,2 % des phrases du lot ont un deux-points, 25,1 % sont en « fait : conséquence » (références :
6,3 % et 3,1 %) ; 3,9 points-virgules et 8,3 tirets pour 1000 mots ; au ch. 52, environ 29 des 70 deux-points valent
« parce que » ou « donc ».

**Cause** : le skill `ecriture` montre lui-même le deux-points comme lien. Sa règle 2 (« Le fait d'abord, la raison
ensuite ») a pour exemple « Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant. » ; sa
section « Le tiret » donne « les deux-points » comme remplacement des 5 665 tirets, et CLAUDE.md aussi (« Pas de
tiret… : virgule, deux-points, parenthèses ou point ») ; son tableau « Ce qui sort » apprend à couper ce qui suit le
deux-points (« La justification collée au geste ») plutôt qu'à dire le lien. Aucune règle ne demande d'écrire
« parce que », « donc » ou « mais » ; la règle 10 parle de « liaisons » sans dire lesquelles.

Exemples :

**57, l. 53** (trois deux-points de suite, trois sens : « alors », « parce que », « parce que »)
> Les ombles sont des poissons d'eau froide et oxygénée : l'eau qui se réchauffe perd son oxygène, et le poisson
> descend vers le fond, les fosses, les sources. Le poisson se dégrade plus vite que la viande rouge : sa flore travaille
> encore au froid qui ralentit celle de l'orignal, et le botulisme aquatique de type E pousse au-dessus de 3 °C. Le
> ventre est le point faible : après la mort, les enzymes digestives attaquent la paroi, et un poisson non vidé se perce
> de l'intérieur.

Réécriture : Les ombles ont besoin d'une eau froide et riche en oxygène. Quand l'eau se réchauffe, elle perd son
oxygène, alors le poisson descend vers le fond, dans les fosses et près des sources. Le poisson se gâte plus vite que
la viande rouge, parce que ses bactéries continuent de travailler à un froid qui ralentit celles de l'orignal, et que
la bactérie du botulisme de type E pousse dès qu'il fait plus de 3 °C. C'est le ventre qui se gâte en premier, parce
qu'après la mort les enzymes de la digestion attaquent la paroi ; un poisson qu'on ne vide pas se perce donc de
l'intérieur.

**57, l. 114** (le deux-points vaut « mais »)
> Plus l'été avance, plus les ombles se tiennent profond, sous l'eau chaude de surface : la profondeur dépend du lac et
> s'apprend d'une année à l'autre.

Réécriture : Plus l'été avance, plus les ombles se tiennent profond, sous l'eau chaude de surface ; mais la profondeur
dépend du lac, et on l'apprend d'une année à l'autre.

**52, l. 127** (« parce que »)
> Le tranchant sert le moins possible : chaque entaille laisse du gras sur le muscle et de la viande dans le gras.

Réécriture : Se servir du tranchant le moins possible, parce que chaque entaille laisse du gras sur le muscle et de la
viande dans le gras.

**52, l. 176** (« donc »)
> Elle ne change rien au parasite : la viande sortie du congélateur devra quand même monter à 74 °C.

Réécriture : Le gel ne tue pas le parasite, donc la viande sortie du congélateur doit quand même monter à 74 °C.

**52, l. 162** (« puisque »)
> Une goutte d'eau dans le contenant, et tout le pot est compromis : c'est de l'eau qu'on vient de passer une heure à
> retirer.

Réécriture : Une seule goutte d'eau dans le contenant suffit à gâter tout le pot, puisque c'est justement l'eau qu'on
vient de passer une heure à faire partir du gras.

**48, l. 192** (le tiret vaut « mais »)
> Sur la Côte-Nord en janvier, c'est gratuit — encore faut-il suspendre la carcasse à l'air libre et non l'empiler dans
> un seau, où le centre du tas reste tiède des heures.

Réécriture : En janvier, sur la Côte-Nord, le froid de l'air suffit, mais seulement si on suspend la carcasse à l'air
libre. Si on empile les lièvres dans un seau, le centre du tas reste tiède pendant des heures.

Même chose avec le tiret en « parce que » : 48, l. 194 (« — le congélateur est à la maison… »), l. 444 (« — l'eau
bouillante est à 100 °C… »), l. 514 (« — une cuvette relave les mains… »).

### Motif 2. Les faits posés côte à côte, sans lien entre eux ni avec le geste (gravité haute)

Un paragraphe aligne des vérités générales, chacune seule, souvent avec sa tête en gras, sans dire comment elles
s'enchaînent ni à quelle étape elles servent. Le lecteur doit trouver lui-même que la troisième explique la cinquième, et
que la première est la raison d'un geste trois pages plus loin. C'est le « paragraphe en paraboles » que JP a refusé au
ch. 3 (« on dirait que tu parles en paraboles ») ; il est intact dans les trois sections 3 du lot.

**Fréquence** : les trois sections 3 « Pourquoi ça marche » (48 : 5 phrases en gras, une par fait ; 52 : 2 faits en
gras, 5 phrases ; 57 : 4 phrases reliées par un seul « Enfin ») ; aucune ne renvoie à l'étape qui se sert du
mécanisme. Aussi : le paragraphe sous le tableau du ch. 57 (l. 85), la série de six « Jamais » du ch. 48 (l. 30 à 40).

**Cause** : l'ancien gabarit (section 3 « Pourquoi ça marche », coupée depuis : CLAUDE.md, « Un mécanisme qui apprend
quelque chose va dans l'étape qu'il explique ») et la règle 1 du skill (« Une phrase, une information. Deux faits, deux
phrases »), appliquée sans la suite que la ligne « paragraphe en paraboles » du tableau du skill demande : « on passe
d'un mécanisme à l'autre par un lien qui se lit ». À la refonte, déplacer ces faits dans les étapes ne suffit pas : il
faut écrire le lien en les déplaçant.

Exemples :

**48, l. 46** (la section 3 au complet)
> Le lièvre transforme en viande ce que personne d'autre ne peut manger, tout l'hiver, et repasse chaque nuit dans les
> mêmes sentiers : c'est ce trait que le collet exploite. La tularémie entre par les mains, pas par la bouche : une
> gerçure, l'œil ou la poussière du poil suffisent, avant que la cuisson n'y puisse rien ; la préparation sert à fermer
> ces portes. Le froid ne désinfecte pas : la bactérie traverse des années de gel ; la chaleur et la javel la tuent. Le
> lièvre normal peut être porteur : la méthode s'applique à chaque prise, sans tri à l'œil. Le lièvre est presque
> uniquement de la protéine : mangé sans gras ni féculent, il remplit et affame (ch. 19).

Réécriture : Le lièvre fait de la viande avec ce que personne d'autre ne peut manger, tout l'hiver. Comme il repasse
chaque nuit dans les mêmes sentiers, on peut le prendre au collet (étapes 3 et 4). La tularémie, la maladie qu'il peut
porter, entre par une gerçure des mains, par l'œil ou par la poussière du poil, avant même que la cuisson puisse y faire
quoi que ce soit. Toute la préparation sert donc à lui fermer ces entrées (étapes 9 à 14). Comme un lièvre qui a l'air
normal peut la porter, on prend ces précautions avec chaque lièvre. Le froid ne la tue pas, parce que la bactérie
survit à des années de gel. Seules la chaleur et la javel la tuent (étapes 14 et 16). Enfin, le lièvre n'est presque
que de la protéine. Si on le mange sans gras ni féculent, il remplit le ventre, mais on maigrit quand même (étape 17 et
ch. 19).

À noter : les phrases 3 et 4 de l'original (l. 52 et 55) se suivent avec deux deux-points de sens contraires (« parce
que », puis « donc »).

**52, l. 64** (la section 3 au complet)
> Le parasite est dans le muscle, et il ne se voit pas. Sa larve, enkystée dans la fibre, ne donne ni odeur, ni couleur,
> ni lésion : chaque ours se traite comme porteur. Sel, fumée, séchage et gel visent des bactéries ; aucun ne tue une
> larve faite pour vivre dans le muscle et, au Nord, pour passer l'hiver gelée. Seule la chaleur la tue, et elle entre
> par la surface : le centre, dernier chauffé, décide, et un haché n'est que du centre.

Réécriture : Le parasite vit dans le muscle, enfermé dans la fibre, et il ne laisse ni odeur, ni couleur, ni marque ;
on doit donc traiter chaque ours comme s'il le portait. Le sel, la fumée, le séchage et le gel servent contre les
bactéries, mais ils ne tuent pas cette larve, qui est faite pour vivre dans le muscle et, dans le Nord, pour passer
l'hiver gelée. Seule la chaleur la tue. Comme la chaleur entre par la surface, c'est le centre du morceau qui chauffe
en dernier, et c'est lui qui doit atteindre 74 °C (section 6). Dans un haché, la surface se retrouve au centre, donc
tout le haché doit y monter.

**57, l. 85** (le paragraphe sous le tableau : l'explication, « grimpe avec la taille », arrive quatre phrases après
le fait qu'elle explique)
> Le gros poisson du lac, le touladi, est le plus restreint des quatre : 2 repas par mois, un repas valant 230 g avant
> cuisson, et le mois compte toutes les espèces ensemble. C'est exactement l'inverse du réflexe de pêche, qui garde le
> gros et remet le petit. Les cinq espèces d'eau douce à 2 repas par mois — doré, brochet, touladi, achigan, maskinongé
> — sont toutes des prédateurs de grande taille. L'omble de fontaine, de son côté, est au palier le moins restreint, 8
> repas par mois. Ces paliers valent pour un lac sans avis propre ; ils ne veulent pas dire «mesuré dans ce lac-ci » :
> la teneur change d'un lac à l'autre et grimpe avec la taille du poisson.

Réécriture : Le touladi, le gros poisson du lac, est le plus limité des quatre : 2 repas par mois, à 230 g avant
cuisson par repas, toutes espèces comptées dans le même mois. L'omble de fontaine, lui, va jusqu'à 8 repas par mois.
C'est le contraire du réflexe de pêche, qui garde le gros et remet le petit, parce que le mercure augmente avec la
taille du poisson. Les cinq espèces d'eau douce limitées à 2 repas par mois (doré, brochet, touladi, achigan,
maskinongé) sont toutes de gros prédateurs. Ces limites valent pour un lac qui n'a pas d'avis à lui, mais elles ne
viennent pas d'une mesure faite dans ce lac-là, et le mercure change d'un lac à l'autre.

**48, l. 35** (six « Jamais » de suite, de six sortes : une durée, un plan, un aliment, un signe de maladie, une
personne, un sujet du livre ; la règle 12 du skill dit qu'une série ne mélange pas deux sortes de choses)
> Jamais sur un lièvre vivant qui se laisse approcher : un animal en bon état de chair qui ne fuit pas est le portrait
> clinique de la tularémie, pas une prise facile. Jamais confié à un enfant de 4 ou 6 ans pour le dépouillement : la
> tularémie entre par une peau de main ouverte, et des mains d'enfant sont gercées et éraflées tout l'hiver. Et ce n'est
> pas un chapitre de peau : la peau de lièvre est trop mince pour le cuir et sert à autre chose (chapitre 102).

Réécriture : chaque fait va à l'étape où il sert, avec son lien. À l'étape 7 : « Un lièvre vivant qui ne se sauve pas
quand on approche, même s'il est bien en chair, montre les signes de la tularémie, donc on ne le prend pas. » À l'étape
11 : « Ne jamais faire dépouiller un lièvre par un enfant, parce que la tularémie entre par une peau ouverte et que les
mains d'un enfant sont gercées et éraflées tout l'hiver. » La peau garde son renvoi (ch. 102) à l'étape 11.

### Motif 3. Le pourquoi renvoyé ailleurs, ou promis sans être dit (gravité haute)

À l'étape où le lecteur doit comprendre pourquoi, le texte dit « voir l'encadré », « la section 8 dit pourquoi »,
« donne la raison ». La consigne reste sans raison, et la raison est trois pages plus loin, ou pas du tout. Un passage
du ch. 48 dit même qu'il faut connaître la raison… sans la donner.

**Fréquence** : 12 renvois de ce genre trouvés par recherche (« Voir l'encadré DANGER », « dit pourquoi », « donne la
raison », « explique pourquoi », « Voir ch. ») : 1 au ch. 48, 6 au ch. 52, 5 au ch. 57 ; une partie renvoie seulement un
détail, ce qui est correct. Dans les cinq exemples, c'est le « parce que » lui-même qui est renvoyé.

**Cause** : la lutte contre la répétition appliquée à la raison elle-même. Skill `ecriture` : « Un fait se dit une
fois par chapitre, à l'endroit où il sert. Ailleurs, un renvoi court » ; « Un avertissement se dit une fois » (JP :
« ON LE SAIT, ON L'A DÉJÀ DIT ») ; CLAUDE.md : « ici, il reste un renvoi court ». Ces règles entrent en conflit avec la
règle 0 (« le but dit en clair quand il n'est pas évident ») et avec CLAUDE.md (« Un mécanisme qui apprend quelque
chose va dans l'étape qu'il explique »). Rien ne dit que le renvoi remplace le détail, jamais le pourquoi.

Exemples :

**48, l. 123**
> Dans ces trois cas : ne pas toucher, ne pas rapporter, ne pas donner au chien. La conduite complète est à l'étape 13,
> et ce qu'on fait de l'animal ensuite est à la section 9. Laisser un animal sur place en hiver quand on en a besoin est
> le geste le plus difficile du chapitre, et c'est pour ça qu'il faut en connaître la raison avant d'être devant.

Réécriture : Dans ces trois cas, ne pas toucher l'animal, ne pas le rapporter et ne pas le donner au chien, parce que
ce sont des signes possibles de la tularémie et que la bactérie entre par une gerçure des mains, par l'œil ou par la
poussière du poil, avant toute cuisson. La conduite est à l'étape 13, et la façon de se débarrasser de l'animal, à la
section 9. (La dernière phrase sort : elle annonce la raison sans la donner.)

**48, l. 30**
> Jamais comme aliment unique, même pour une semaine : la section 8 dit pourquoi, et le chapitre 19 le dit en entier.

Réécriture : Jamais comme seule nourriture, même pendant une semaine. Sa viande n'a presque pas de gras, alors on
maigrit même en mangeant à sa faim (section 8 et ch. 19).

**57, l. 35**
> Il n'y a pas un vêtement de flottaison individuel porté par personne à bord, enfants compris. Pas «à bord » : porté.
> Voir l'encadré DANGER.

Réécriture : Il n'y a pas de VFI porté par chaque personne à bord, enfants compris. Le gilet doit être sur soi, pas
rangé dans l'embarcation, parce qu'une fois dans l'eau froide, on n'arrive presque plus à l'attraper ni à l'enfiler
(section 8).

**57, l. 37** (en plus, le « 1-10-1 » sert de raison deux sections avant d'être expliqué : règle 14 du skill)
> Personne ne reste à terre pour savoir quel lac, quelle baie, quelle heure de retour. Le 1-10-1 de l'encadré DANGER
> donne la raison : la fenêtre utile se compte en minutes, et une recherche qui commence par chercher le lac commence
> trop tard.

Réécriture : Personne ne reste à terre pour savoir sur quel lac, dans quelle baie et à quelle heure on doit revenir.
Dans l'eau froide, on perd l'usage des bras et des jambes en une dizaine de minutes (section 8), donc les gens qui
cherchent arrivent trop tard s'ils doivent d'abord trouver le lac.

**52, l. 183** (la raison donnée est un fait sur le livre ; la vraie raison est renvoyée à l'encadré)
> Ce n'est pas une conserve de tablette : le livre n'a aucune source qui autorise à garder de la viande confite hors du
> froid, et le confit se range entre 0 et 4 °C ou au caveau. Voir l'encadré DANGER.

Réécriture : Il faut garder le confit entre 0 et 4 °C ou au caveau, jamais sur une tablette, parce que la viande
couverte de gras se retrouve sans oxygène, et c'est ce qu'il faut au botulisme (section 8).

Même défaut au ch. 52, l. 401 : « l'encadré DANGER explique pourquoi le gras qui protège de l'air est exactement ce qui
fabrique le terrain du botulisme ».

### Motif 4. L'ordre de l'information : l'annonce avant le fait, le geste noyé, la conclusion à deviner (gravité moyenne)

Le paragraphe ne part pas de ce que le lecteur a en tête (le geste de l'étape, la phrase d'avant). Il pose d'abord une
règle générale ou une annonce, puis le fait, et laisse la conclusion pratique sous-entendue ou dans une concessive
(« encore faut-il »). Le lecteur doit remettre les morceaux dans l'ordre pour savoir quoi faire.

**Fréquence** : relevé à la lecture dans une douzaine d'étapes (48 : étapes 2, 5, 7, 10, 13, 15, 16 ; 52 : étapes 7,
16, 27 et le début de la section 9 ; 57 : étapes 5 et 12).

**Cause** : les règles 2 et 3 du skill (« Le fait d'abord, la raison ensuite », « La condition avant le geste ») règlent
l'ordre dans une phrase, pas d'une phrase à l'autre ; aucune règle ne dit qu'un paragraphe va du connu au nouveau, ni
que la conclusion pour le lecteur se dit avec « donc ». L'habitude : l'étape s'ouvre sur son titre en gras, puis le
corps repart de zéro avec une règle générale qui n'est pas reliée au titre.

Exemples :

**48, l. 102** (étape 5 : deux raisons sans « d'abord » ni « ensuite », « cette fenêtre » renvoie à un mot jamais dit,
et la conclusion tombe en maxime)
> 5. Relever la ligne chaque matin. L'éviscération se fait immédiatement après la mort de l'animal. Un lièvre pris au
> collet est déjà, par construction, hors de cette fenêtre : le froid de janvier rachète une partie du retard, pas tout.
> Et ce qui attend se fait prendre — renard, martre, corneille : une prise laissée deux nuits est rarement encore
> entière. Une ligne trop longue pour être relevée chaque matin est une ligne trop longue : mieux vaut dix collets
> visités tous les jours que trente visités aux trois jours. Le collet à ressort (§9) est la seule réponse connue à une
> ligne qu'on ne peut pas suivre.

Réécriture : Relever la ligne chaque matin, pour deux raisons. D'abord, il faut vider le lièvre tout de suite après sa
mort, alors qu'au collet il attend forcément, et le froid de janvier ne rattrape qu'une partie de ce retard. Ensuite,
le renard, la martre et la corneille mangent la prise qui attend, et une prise laissée deux nuits est rarement encore
entière. Il vaut donc mieux dix collets visités tous les jours que trente visités aux trois jours. Si on ne peut pas
relever la ligne chaque matin, il faut des collets à ressort (section 9).

**52, l. 319** (trois phrases d'annonce avant le fait)
> Sans thermomètre. C'est la seule perte qui compte, et elle est grave : on perd la vérification de la seule barrière
> qui existe contre la trichinellose. Le livre ne peut pas prétendre le contraire. Ce qui reste est un raisonnement de
> physique, pas une mesure : l'eau qui bout est à environ 100 °C, donc un morceau immergé dans une eau à gros bouillons
> a toute sa surface tenue au-dessus de 74 °C, et son centre y monte à mesure que la chaleur pénètre. La conduite
> dégradée en découle :

Réécriture : Sans thermomètre, on ne peut plus vérifier la seule chose qui protège de la trichinellose. On se fie alors
à l'eau qui bout : elle est à environ 100 °C, donc toute la surface d'un morceau plongé dans un gros bouillon dépasse
74 °C, et le centre y monte à mesure que la chaleur entre. Pour donner au centre le temps d'y arriver :

**57, l. 117** (la raison du geste est posée comme une règle à part, puis la conclusion tombe en maxime)
> 5. Décider de garder ou de remettre avant de sortir le poisson de l'eau. La manipulation hors de l'eau se limite à
> moins de 15 secondes : peser, mesurer, admirer et délibérer prennent plus que ça. Un poisson dont on hésite est un
> poisson qu'on remet.

Réécriture : Décider de garder ou de remettre le poisson avant de le sortir de l'eau, parce qu'un poisson qu'on remet
ne doit pas rester plus de 15 secondes hors de l'eau, et qu'on dépasse vite ce temps à le peser, à le mesurer, à
l'admirer ou à se demander quoi faire. Si on hésite, on le remet.

**52, l. 143** (le but arrive en dernier, porté par une chose qui « survit » ; la personne qui ouvre le paquet est
nommée au bout)
> Une étiquette d'ours porte le mot OURS en lettres lisibles par quelqu'un qui n'a pas participé à la chasse. C'est la
> seule manière que la règle des 74 °C survive à un paquet sorti du congélateur de la maison ou à un pot descendu de la
> tablette du chalet trois ans plus tard, par une personne qui ne sait pas ce qu'elle a dans les mains.

Réécriture : Écrire OURS en grosses lettres sur l'étiquette, pour que la personne qui sort le paquet du congélateur, ou
le pot de la tablette trois ans plus tard, sache qu'il faut cuire la viande à 74 °C, même si elle n'était pas à la
chasse.

**57, l. 149** (la conclusion pratique est à deviner)
> Un congélateur à -18 °C n'y arrive pas : c'est au thermomètre qu'on le sait.

Réécriture : Un congélateur réglé à -18 °C n'est pas assez froid pour ça, donc avant d'y mettre ce poisson, il faut
vérifier au thermomètre qu'il descend à -20 °C.

### Motif 5. « Et » à la place de « mais », « donc » ou « ensuite » (gravité moyenne)

Le texte relie par « et » (ou commence la phrase par « Et ») deux faits dont le vrai rapport est un contraste, une
conséquence ou une deuxième raison. Le moule « la seule X…, et c'est aussi la seule Y » ouvre deux chapitres sur trois :
il colle deux faits sans rapport comme s'ils allaient ensemble, au lieu de dire « mais ».

**Fréquence** : « et » 32,6 pour 1000 mots, « mais » 0,81 ; 14 phrases qui commencent par « Et » (48 : 5 ; 52 : 5 ;
57 : 4) ; 23 « et c'est » (7, 9, 7).

**Cause** : la règle 1 du skill (« Deux faits, deux phrases ») fait couper, puis on recolle avec « Et » ; le tableau
« Les mots » range « ainsi », « d'ailleurs », « en effet » parmi les mots vides, et rien ne distingue de ces mots-là
les mots de lien utiles (« donc », « mais », « sinon »).

Exemples :

**48, l. 12** (« et c'est aussi » vaut « mais » ; même moule au ch. 52, l. 15)
> Le lièvre d'Amérique (Lepus americanus) est la seule viande fraîche que la forêt boréale donne tout l'hiver sans
> munition, sans moteur et sans s'éloigner du chalet — de 1,2 à 1,6 kg sur pattes par prise — et c'est aussi le seul
> gibier d'ici dont la simple manipulation, avant toute cuisson, peut mettre quelqu'un à l'hôpital.

Réécriture : Le lièvre d'Amérique est la seule viande fraîche que la forêt boréale donne tout l'hiver sans munition,
sans moteur et sans s'éloigner du chalet, à raison de 1,2 à 1,6 kg sur pattes par prise. Mais c'est aussi le seul
gibier d'ici qui peut rendre gravement malade la personne qui le manipule, avant même la cuisson.

**52, l. 15**
> L'ours noir (Ursus americanus) est la seule bête du territoire qui donne une couche de gras détachable en feuilles, et
> c'est aussi la seule dont chaque bouchée doit passer 74 °C à cœur, parce que ni le sel, ni le fumage, ni le séchage,
> ni le congélateur ne règlent le parasite qu'elle porte.

Réécriture : L'ours noir est la seule bête du territoire qui donne une couche de gras qu'on détache en feuilles. Mais sa
viande doit monter à 74 °C à cœur, à chaque bouchée, parce que ni le sel, ni le fumage, ni le séchage, ni le congélateur
ne tuent le parasite qu'elle porte.

(Le faux parallèle « la seule… aussi la seule » fait dire au texte que l'ours est le seul gibier à cuire à 74 °C, ce
que le rappel de CLAUDE.md contredit pour le lièvre, le castor et l'orignal : la réécriture n'a plus ce « seule ».)

**57, l. 474** (« et » vaut « mais »)
> Un bidon vide bien bouché et sanglé sur la poitrine tient une tête hors de l'eau, et ne fait rien contre la première
> minute, qui est celle du choc thermique et de l'inspiration réflexe.

Réécriture : Un bidon vide bien bouché, attaché sur la poitrine, garde la tête hors de l'eau, mais il ne protège pas de
la première minute, celle du choc thermique, quand on prend une grande respiration sans le vouloir.

**48, l. 458** (« et » vaut « donc »)
> Un redoux de trois jours en février ramène une cache à la température de la viande fraîche, et la carcasse repart du
> refroidissement sans qu'on l'ait vue le faire.

Réécriture : Un redoux de trois jours en février ramène la cache à la température de la viande fraîche, donc la
carcasse est à refroidir de nouveau, sans qu'on s'en soit rendu compte.

**57, l. 369** (« Et » vaut « aussi, pour la même raison »)
> Et on pêche tôt : une prise faite au petit jour a une demi-journée d'avance sur la chaleur qui s'en vient, ce qui est
> un choix de conservation avant d'être un choix de pêche.

Réécriture : On pêche aussi tôt le matin, parce qu'une prise faite au petit jour a une demi-journée d'avance sur la
chaleur du jour.

**48, l. 452** (« Et » vaut « aussi » ; le deux-points vaut « parce que »)
> Et il faut garder le bouillon : le gras qui fond et remonte en surface est une des rares graisses que le lièvre donne,
> et la jeter, c'est jeter le peu qui corrige le mal de caribou.

Réécriture : Il faut aussi garder le bouillon, parce que le gras qui fond et remonte à la surface est une des rares
graisses que le lièvre donne, et que c'est ce peu de gras qui corrige le mal de caribou.

### Motif 6. La phrase-pont qui annonce une citation au lieu de dire le lien (gravité moyenne)

Entre deux faits, la phrase de liaison ne parle pas du geste mais de la source : « C'est la consigne la moins connue »,
« Le mécanisme, en clair : », « Ce qu'on cherche est décrit précisément : », « La consigne qui suit est sans nuance : »,
« la seule phrase de ce livre qu'il faut savoir par cœur : ». Le lien relie le texte à son autorité, pas les faits
entre eux, et la même consigne se dit souvent deux ou trois fois (titre, citation, paraphrase) avant le comment.

**Fréquence** : 58 passages entre guillemets dans le lot (48 : 22 ; 52 : 14 ; 57 : 22), dont au moins 14 annoncés par
une phrase en « … : « ».

**Cause** : le tome 3 a été écrit avant la règle 1 de CLAUDE.md dans sa forme actuelle (« La provenance ne s'imprime
pas : aucune attribution dans le texte ») et avant la ligne du cadre « La source sert à vérifier un fait, jamais à
copier une forme » ; le skill `ecriture` le dit aussi (« Pas de citation de source »). **Le risque à la refonte** :
enlever les guillemets et les phrases-ponts sans écrire le lien laisse les faits côte à côte (motif 2).

Exemples :

**48, l. 147** (étape 10 : la consigne dite trois fois, le pourquoi en quatrième)
> 10. Humecter la fourrure avant de commencer. C'est la consigne la moins connue et l'une des plus importantes : «il est
> également recommandé de mouiller la fourrure avant toute manipulation afin de minimiser l'aérosolisation des
> bactéries ». Le mécanisme, en clair : «Humectez la fourrure avant d'éviscérer l'animal de façon à diminuer la
> quantité de poussière. » Une fourrure sèche qu'on tire et qu'on coupe lance de la poussière, et l'inhalation est
> l'une des cinq voies d'infection.

Réécriture : Mouiller la fourrure avant de commencer. Un poil sec qu'on tire et qu'on coupe lance une poussière
chargée de bactéries, et on peut attraper la tularémie en la respirant. Un peu de neige fondue dans la main suffit. Si
le lièvre est gelé, il faut le laisser dégeler assez pour que le poil se mouille, et c'est une raison de plus pour le
préparer le jour même, avant qu'il gèle.

**48, l. 170** (étape 13)
> Ce qu'on cherche est décrit précisément : «un bon état de chair, souvent accompagné de la présence de petits points
> blancs (de 2 mm ou plus) sur le foie, la rate et les poumons », et parfois un foie, une rate ou des nœuds lymphatiques
> plus volumineux et d'apparence plus pâle. La consigne qui suit est sans nuance : «il est recommandé de ne pas consommer
> la viande de tout animal présentant des points blancs sur le foie ou la rate et de le soumettre à un laboratoire ».
> Pas «parer autour », pas «bien cuire » : ne pas consommer.

Réécriture : On cherche de petits points blancs, de 2 mm ou plus, sur le foie, la rate et les poumons, souvent chez un
lièvre bien en chair, et parfois un foie, une rate ou des ganglions plus gros et plus pâles que d'habitude. S'il y en a,
on ne mange pas l'animal, même en coupant autour ou en le cuisant plus longtemps.

**52, l. 264** (la phrase-pont parle « de ce livre » ; l'explication qui suit est bonne et doit rester. Au passage, la
citation porte une faute : « de n'exterminent ».)
> Quatre procédés de ce livre ne la détruisent pas : «La salaison, le séchage, le fumage ou la cuisson au four à
> micro-ondes de n'exterminent pas toujours les larves infectieuses » et «la plupart des espèces de Trichinella qui ont
> été trouvées dans la nature résistent à la congélation ». Le sel diffuse trop lentement et trop faiblement pour tuer
> une larve enkystée ; la fumée ne travaille qu'en surface ; le séchage retire une eau dont la larve n'a pas besoin ; et
> les espèces du Nord passent l'hiver dans des carcasses gelées.

Réécriture : Le sel, le séchage, la fumée et le gel ne tuent pas à coup sûr les larves. Le sel entre trop lentement et
pas assez fort dans la viande pour tuer une larve enfermée dans le muscle ; la fumée ne travaille qu'en surface ; le
séchage enlève une eau dont la larve n'a pas besoin ; et les espèces du Nord passent l'hiver dans des carcasses gelées.

**57, l. 234**
> Et la seule phrase de ce livre qu'il faut savoir par cœur : «Le botulisme n'altère pas la couleur, l'odeur ou le goût
> des aliments ». Il n'existe aucun geste — sentir, goûter du bout de la langue, regarder, chauffer légèrement — qui
> donne l'information cherchée. La décision se prend sur l'historique de température, jamais sur les sens.

Réécriture : Le botulisme ne change ni la couleur, ni l'odeur, ni le goût du poisson. Aucun geste ne le révèle (ni
sentir, ni goûter du bout de la langue, ni regarder, ni chauffer un peu), donc on décide d'après la température où le
poisson a été gardé, jamais d'après ses sens.

**48, l. 199** (étape 16)
> C'est la valeur pour le gibier, entier et haché, et celle qui vaut pour cette maladie précise : «la température de
> cuisson doit atteindre 74 °C ou 165 °F ». Le point de mesure : «placé dans la partie la plus charnue de la pièce de
> viande, en évitant de piquer près d'un os ou du gras pour éviter une fausse lecture ». Sur un lièvre, la partie la
> plus charnue est la cuisse arrière, et l'os y est à quelques millimètres de la sonde : sur une pièce de ce format,
> l'erreur de placement coûte facilement dix degrés.

Réécriture : C'est la température du gibier, entier ou haché, et c'est aussi celle qu'il faut contre la tularémie.
Piquer la sonde dans la partie la plus charnue, la cuisse arrière, sans toucher l'os ni le gras, parce qu'ils faussent
la lecture. Sur une si petite pièce, l'os est à quelques millimètres de la sonde, et on se trompe facilement de dix
degrés.

### Motif 7. L'opposition fabriquée qui tient lieu de lien (gravité moyenne)

« Pas X, Y », « X n'est pas A, c'est B » : le texte répond à une idée que personne n'a eue. Le lien dit est un
contraste ; le vrai lien (une conséquence, une raison) reste tu. C'est aussi là que passent les « mais » qui manquent
(voir les mesures) : le livre dit le contraste en formule au lieu de le dire avec « mais ».

**Fréquence** : environ 30 tournures en « pas X » ou « n'est pas X, c'est Y » (24 trouvées par recherche, 8 par
chapitre, d'autres à la lecture) ; à la lecture, une douzaine sont fabriquées. Les autres disent un contraste utile
(« pour la qualité, pas pour le parasite », 52, l. 119 ; « pas le lendemain », 57, l. 147) et restent.

**Cause** : CLAUDE.md met « l'opposition fabriquée » dans les « fils d'la AI », le skill a sa ligne (« Ce qui détruit
la plomberie n'est pas le froid mais… ») et le cadre la sienne (« pas de "X ne fait pas Y : il fait Z" »), mais
`controle.py` ne repère ni « n'est pas X, c'est Y » ni « , pas un X. » en fin de phrase, et le tome 3 n'a pas eu la
passe.

Exemples :

**48, l. 23**
> Quand les enfants ont besoin de viande fraîche régulièrement et qu'une bête de 600 kg n'est pas une réponse à ce
> besoin-là — un lièvre, c'est un repas de famille, pas un chantier de débitage.

Réécriture : Quand les enfants ont besoin de viande fraîche souvent. Un lièvre fait un repas de famille, alors qu'une
bête de 600 kg est tout un travail à débiter.

**48, l. 99**
> Un collet mal calibré ne rate pas, il manque — il glisse sur le corps et l'animal part avec le fil.

Réécriture : Si la boucle est mal ajustée, elle glisse sur le corps, et l'animal part avec le fil.

**52, l. 111** (étape 7 : « Conséquence pratique » est une étiquette, et la chute oppose deux mots)
> 7. Conséquence pratique, qui contredit en partie le ch. 61 : la consigne «attendez d'être sorti de la forêt pour
> dépouiller » tient, mais la sortie du bois devient urgente. Dès que la bête est à l'abri des mouches et de la
> poussière, la peau et sa couche de gras s'enlèvent, et le refroidissement reprend son cours normal. Avec un ours, le
> dépouillement n'est pas une opération de confort, c'est une opération de refroidissement.

Réécriture : Il faut donc sortir du bois vite. Le ch. 61 dit d'attendre d'être sorti de la forêt pour dépouiller, et
c'est encore vrai pour l'ours ; mais dès que la bête est à l'abri des mouches et de la poussière, il faut enlever la
peau et sa couche de gras, parce que tant qu'elles sont là, la carcasse refroidit mal.

**57, l. 202**
> Le mécanisme n'est pas la fatigue, c'est une cascade en trois temps, le principe 1-10-1 :

Réécriture : Dans l'eau froide, le danger vient en trois temps, qu'on retient avec le 1-10-1 :

**57, l. 476** (même moule au ch. 52, l. 405 : « C'est une perte de sécurité alimentaire, pas une perte de
salubrité. »)
> Sans VFI pour chacun, l'embarcation reste à terre et on pêche du bord. C'est une perte de territoire, pas une perte de
> sécurité.

Réécriture : Sans VFI pour chacun, l'embarcation reste à terre et on pêche du bord. On a accès à une moins grande partie
du lac, mais on ne prend pas de risque de plus.

**52, l. 296**
> Le mécanisme n'est pas le confort du chien : un chien infecté devient porteur et contamine ensuite la maisonnée par
> ses excréments, par les surfaces, par les mains et par les légumes du jardin

Réécriture : Un chien qui mange de la viande ou des abats crus peut s'infecter, puis contaminer toute la maison par ses
excréments, par les surfaces, par les mains et par les légumes du jardin.

### Motif 8. La maxime en bout de paragraphe à la place du « donc » (gravité moyenne)

Le paragraphe finit sur « Un X qui… est un X… » au lieu de dire ce que le lecteur doit faire. La conclusion pratique
est là, mais déguisée en définition : il faut la traduire. Au ch. 52, deux maximes se contredisent (l'ours « à moitié
perdu », puis « gaspillé aux trois quarts »).

**Fréquence** : une douzaine : 48, l. 33, 82, 106, 508, 527 ; 52, l. 306, 447, 463 ; 57, l. 40, 118, 213, 379, 408.

**Cause** : la ligne « La maxime » du tableau du skill (« Un X qui… ne… plus ») et la ligne « La chute en formule » ;
`controle.py` repère « Un X qui… ne… plus », pas « Un X qui… est un X… ».

Exemples :

**48, l. 82**
> Une station montée à la noirceur avec un lièvre gelé dans une main est une station incomplète.

Réécriture : Il faut la monter d'avance, parce qu'à la noirceur, avec un lièvre gelé dans une main, on oublie quelque
chose.

**57, l. 40**
> Il fait chaud et il n'y a ni glace, ni eau froide courante, ni ombre. Une prise qu'on ne peut pas refroidir est une
> prise qu'on ne garde pas.

Réécriture : Il fait chaud et il n'y a ni glace, ni eau froide qui coule, ni ombre. Sans moyen de refroidir le poisson,
on ne pourra pas le garder.

**57, l. 212**
> C'est pour ça que le VFI se porte, pas se transporte. Un gilet rangé sous le banc est un objet décoratif.

Réécriture : C'est pour ça qu'il faut porter le VFI sur soi, et non le ranger sous le banc.

**52, l. 306** (et l. 447 : « Un ours dont on n'a gardé que les steaks a été gaspillé aux trois quarts. »)
> Un ours dont on jette le gras pour ne garder que le muscle est un ours à moitié perdu.

Réécriture : Il faut donc garder le gras de l'ours, parce que c'est la moitié de la valeur de la bête (section 9).

**48, l. 508**
> Un lièvre malade sur une piste veut dire que la piste a été fréquentée par des lièvres malades.

Réécriture : Faire une entaille de hache sur un arbre à hauteur d'œil, et déplacer la ligne de collets hors de ce
sentier pour la saison, parce que d'autres lièvres malades ont pu passer par la même piste.

### Motif 9. La conséquence accrochée en queue de phrase par « ce qui » ou « sachant que » (gravité basse)

La phrase dit le geste, puis ajoute en queue, par une relative ou un participe, une conséquence ou un jugement qui
aurait dû être une phrase à lui, avec son mot (« donc », « mais », « parce que »). Le lecteur relit pour savoir à quoi
« ce qui » renvoie.

**Fréquence** : 10 « , ce qui / ce que » en queue (48 : 3 ; 52 : 1 ; 57 : 6) ; 2 « sachant que » (57, l. 13 et 271).
Certains sont justes (« ce qui veut dire que », 57, l. 387, vaut « donc »).

**Cause** : habitude d'écriture ; le tableau « Les mots » du skill vise « ce qui permet de », pas « ce qui est ».

Exemples :

**57, l. 11** (« sachant que » vaut « parce que »)
> Prendre au lac l'omble de fontaine (truite mouchetée) et le touladi (truite grise), puis les amener du bord de l'eau
> au froid — 0 à 4 °C jusqu'à la transformation, -18 °C ou moins pour l'hiver — assez vite pour que la chair vaille
> encore le déplacement, sachant qu'un poisson perd en quelques heures ce qu'un quartier d'orignal met une journée à
> perdre.

Réécriture : Prendre au lac l'omble de fontaine (truite mouchetée) et le touladi (truite grise), puis les mettre au
froid vite, parce qu'un poisson perd en quelques heures ce qu'un quartier d'orignal met une journée à perdre : entre 0
et 4 °C jusqu'à la transformation, à -18 °C ou moins pour l'hiver.

**48, l. 388**
> Jamais à une branche morte : elle casse au premier coup et l'animal part avec le fil au cou, ce qui est la pire fin
> pour la bête et la fin de la ligne pour le trappeur.

Réécriture : Ne jamais attacher le collet à une branche morte, parce qu'elle casse au premier coup et que l'animal part
avec le fil au cou ; la bête souffre alors, et on perd le collet.

**48, l. 406**
> En janvier, le déclencheur se retaille à sec et se remonte à chaque tournée, ce qui allonge la tournée d'autant. Une
> ligne de collets à ressort demande moins de visites et plus de minutes par collet.

Réécriture : En janvier, il faut donc retailler le déclencheur à sec et le remonter à chaque tournée. Une ligne de
collets à ressort demande moins de visites, mais plus de temps à chaque collet.

**57, l. 388**
> Par temps lourd, humide et sans vent, la toile ne refroidit rien du tout et se contente d'entretenir une surface
> humide et tiède, ce qui est pire que rien.

Réécriture : Par temps lourd, humide et sans vent, la toile ne refroidit rien et garde le poisson humide et tiède, donc
il vaut mieux s'en passer.

## 3. Les passages qui marchent (modèles)

**57, l. 331, « Viser sous le poisson »**
> Le poisson est plus creux qu'il ne paraît : la lumière qui sort de l'eau se casse à la surface, et l'œil place le
> poisson plus haut qu'il n'est. On frappe donc sous le poisson qu'on voit, d'autant plus bas qu'il est creux. Le remède
> le plus simple est de se placer au-dessus de lui : une lumière qui traverse la surface à la verticale ne se casse pas,
> le poisson est juste sous son image, et la foène poussée droit vers le bas passe dessus. Plus le regard est rasant,
> plus l'erreur grandit. Le coup s'apprend sur une pierre du fond ou une feuille coulée, avant le premier poisson.

Chaque phrase s'appuie sur la précédente : le fait, le mécanisme, la consigne avec « donc » et « d'autant plus », le
remède, la règle de grandeur en « plus… plus », puis comment s'exercer. Les deux deux-points ont le même sens (ce qui
suit explique le comment), et on ne devine rien.

**52, l. 367, « Le bain-marie remplace le feu doux »**
> Un poêle à bois n'a pas de réglage : il a un dessus brûlant et un coin tiède. Un contenant de gras posé dans un
> chaudron d'eau ne peut pas monter plus haut que l'eau qui bout en dessous, donc le gras ne brûle pas et ne brunit pas,
> même sur la fonte du milieu. C'est plus lent, et c'est tout ce que ça coûte.

Le problème, le mécanisme, la conséquence avec « donc », la limite avec « même », puis le coût. Quatre phrases, quatre
rapports différents, chacun dit en mots.

**52, l. 374, les pierres chaudes**
> Les pierres se ramassent au sec, jamais au bord de l'eau ni dans le lit d'un ruisseau : une pierre gorgée d'eau éclate
> et projette ses morceaux, parce que l'eau piégée dedans se change en vapeur sans pouvoir sortir. La pierre lisse et
> ronde du rivage, celle qui a l'air la meilleure, est justement la mauvaise.

La consigne, ce qui arrive sinon, puis le « parce que » du mécanisme, et le fait qui surprend avec « justement ». Le
lien est dit même là où un deux-points aurait suffi. (La consigne au pronominal, « se ramassent », est hors de ce
regard.)

**48, l. 465, sécher le lièvre**
> Le lièvre est la viande du territoire qui sèche le mieux, et pour une raison mécanique : il n'a presque pas de gras,
> et c'est le gras qui rancit. Mais un séchoir de chalet ne monte jamais à 74 °C, donc le séchage ne part jamais d'une
> chair crue sur cet animal-là. L'ordre est inversé par rapport au poisson (ch. 76) : on cuit, puis on sèche.

L'avantage, sa cause, puis « Mais » qui pose la limite et « donc » qui en tire la consigne, et la comparaison avec un
chapitre que le lecteur connaît. C'est le tempo parlé : on entend le raisonnement.

**52, l. 107, étape 6**
> Viser 7 °C à cœur dans les 24 premières heures. C'est le même objectif que pour l'orignal, et il est plus difficile à
> tenir sur un ours, parce que la couche de gras sous la peau est un isolant continu qui enveloppe la carcasse.

Elle part du connu (l'orignal) pour amener le nouveau (l'ours), et le « parce que » dit la cause. L'étape suivante en
tire la conséquence (dépouiller tôt). La phrase d'après dans le texte (« La masse chaude est dedans, la couverture est
dessus. ») redit la même chose en image et peut sortir.

## 4. Ce que ce regard demande au skill et aux auditeurs

1. **Une règle : le lien se dit en mots.** Entre deux phrases, se demander quel mot on dirait à voix haute (parce que,
   donc, alors, mais, sinon, ensuite, pour que, comme). S'il en faut un, l'écrire. Le deux-points garde ses emplois :
   une liste, une définition, une étiquette de tableau, un détail qui précise (« pour deux raisons : »). Jamais deux
   deux-points de sens différents dans le même paragraphe.
2. **Corriger les exemples du skill qui enseignent le contraire** : la règle 2 (« Vidanger… : un tuyau plein fend en
   gelant » devient « …, parce qu'un tuyau plein fend en gelant ») ; la section « Le tiret », qui doit proposer d'abord
   le mot de lien, puis la virgule, le point et les parenthèses, et le deux-points seulement pour une liste ou un
   détail ; l'exemple de la ligne « paragraphe en paraboles », qui met deux deux-points dans sa propre réécriture.
3. **Séparer les mots vides des mots de lien** dans le tableau « Les mots » : « ainsi », « d'ailleurs », « en effet »
   peuvent sortir ; « donc », « mais », « sinon », « parce que » restent quand ils disent le rapport.
4. **Le renvoi remplace le détail, jamais le pourquoi** : la raison en une proposition reste à l'étape, le renvoi
   suit (« parce que…, section 8 »).
5. **Le paragraphe va du connu au nouveau** : il part du geste de l'étape ou de la phrase d'avant ; la conclusion pour
   le lecteur arrive avec « donc », jamais en maxime.
6. **Un auditeur des liens**, qui n'a pas écrit la page : pour chaque paragraphe de trois phrases et plus, il écrit
   entre chaque paire de phrases le rapport (cause, conséquence, condition, contraste, suite, exemple, aucun) et le mot
   qui le porte ; il signale « aucun », « deviné » (porté par un deux-points, un point-virgule, un tiret ou « et ») et
   le paragraphe où le deux-points change de sens. Son outil : `tempo.py` par paragraphe (un paragraphe qui a deux
   « fait : conséquence » et aucun mot de liaison se relit), et dans `controle.py` les formes qu'il ne voit pas
   encore : « n'est pas X, c'est Y », « , pas un X. » en fin de phrase, « Un X qui… est un X… », « sachant que »,
   « Voir l'encadré », « dit pourquoi », « donne la raison », « explique pourquoi », « Et » en tête de phrase,
   « et c'est aussi la seule ». Le seuil chiffré se fixe après mesure ; les références donnent 3,1 % de phrases en
   « fait : conséquence », le lot 25,1 %.

## 5. Liste de contrôle (ma partie de `.claude/cadre-agents.md`)

Pour tout agent et l'économie des jetons
- [x] CLAUDE.md pris comme règle première ; skill `ecriture` lu au complet, avec ses tableaux.
- [x] `suivi/plan-de-match.md` : cherché les ch. 48, 52 et 57 ; rien qui touche les liens entre les phrases.
- [x] Règle 1 : aucune réécriture n'ajoute de chiffre ni de fait ; deux « seule » enlevés (52, l. 15), rien d'ajouté.
- [x] Aucun fichier du livre modifié, rien commité ; seul ce fichier de notes est écrit.
- [x] Lu seulement le lot ; sorties de commande coupées ; aucune image ouverte.

La phrase (vérifié dans mes réécritures, et relevé dans le lot quand c'est mon regard)
- [x] Règle 0 : chaque réécriture lue à voix haute ; un verbe, qui le fait, les mots de tous les jours.
- [x] Pas de loi en formule, jamais « d'où » : aucun dans les réécritures (le lot en a, 52, l. 67 : « le centre,
  dernier chauffé, décide »).
- [x] Pas de « X passe là où Y ne passe pas ».
- [x] Pas de maxime, de chute en formule, d'opposition fabriquée, d'image : motifs 7 et 8 ; aucune dans les
  réécritures.
- [x] Pas de chose qui pense : aucune dans les réécritures (le lot en a : « la règle des 74 °C ne connaît pas les
  saisons », 52, l. 38 ; « celle-là ment », 52, l. 352).
- [x] Consigne jamais au pronominal, dite comme une consigne : les réécritures disent « il faut », « on doit » ou
  l'infinitif (le lot en a beaucoup : « chaque ours se traite », « le confit se range »).
- [ ] Points de contrôle et signes d'échec à 5 à 8 lignes : hors de ce regard ; relevé seulement (48 : 12 et 10 ;
  52 : 11 et 11 ; 57 : 13 et 8).
- [x] Un passage lourd se juge d'abord (doit-il exister ?) : deux phrases proposées à couper (48, l. 125 ; 52,
  l. 320).
- [x] Une notion s'explique à sa première apparition : le « 1-10-1 » de 57, l. 38, relevé (motif 3).
- [x] Le mot qu'on dit : « bien en chair », « un lièvre qui a l'air normal », « on n'arrive presque plus », pas
  « enkystée », « inhalation », « délibérer ».
- [x] On nomme la chose au lieu du possessif ; pas de mot de métier sans besoin ; pas de nom latin.
- [x] Aucun tiret dans les réécritures ; « section N », jamais « § ».
- [x] Une liste après deux-points ne mélange pas deux sortes de choses : la série des « Jamais » du ch. 48 relevée
  (motif 2).

La langue
- [x] Réécritures en français correct, ni joual ni anglicisme ; pas deux « ou » l'un dans l'autre.
- [ ] `langue.py` : non lancé ; ces notes ne s'impriment pas, et les réécritures passeront par le correcteur à la
  refonte des chapitres. Faute vue au passage dans une citation : « de n'exterminent » (52, l. 264).
