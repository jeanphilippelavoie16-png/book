# Audit de l'écriture : la voix, lot D (tome 3)

28 octobre 2026. Un seul regard : **la voix**, le mot qu'on dit contre le mot qu'on écrit. Le registre visé : un
Québécois qui explique à son voisin, en français correct (ni joual, ni mot de livre). Lot lu au complet :
`chapitres/48-lievre-d-amerique.md`, `chapitres/52-ours-noir.md`, `chapitres/57-truite-et-omble-au-lac.md`. Aucun
fichier du livre n'est touché. Les citations du texte sont exactes, sans les marques de gras et d'italique. Les
réécritures n'ajoutent aucun fait ni chiffre ; elles sont passées par `controle.py` (0 tiret ; les mots vides restants
portent du sens : « bien en chair », « tout l'été », « encore cru ») et par `langue.py` avec LanguageTool (7 avis,
jugés : « a monté » corrigé en « est montée » ; « une main sèche le lui enlève » est un adjectif, pas un impératif ;
« garde la viande bonne » est un attribut ; VFI, touladi et godendard sont justes).

Ce que je ne juge pas : le tempo, le moule « fait : conséquence », la longueur, la répétition, la structure (ces trois
chapitres n'ont pas eu leur refonte : neuf sections, section Danger, « § », « village », 133 tirets), l'exactitude des
faits. Je les nomme seulement quand ils touchent la voix.

## 1. Les mesures

`tempo.py --par-fichier` sur le lot :

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 48-lievre-d-amerique.md | 5670 | 308 | 18,4 | 0,67 | 19,5 | 17,5 | 20,5 | 34,4 | 26,0 | 6,3 | 4,2 |
| 52-ours-noir.md | 4850 | 245 | 19,8 | 0,71 | 12,7 | 20,8 | 18,9 | 29,8 | 23,7 | 6,6 | 4,9 |
| 57-truite-et-omble-au-lac.md | 5447 | 273 | 20,0 | 0,66 | 15,4 | 21,2 | 14,7 | 28,9 | 25,3 | 5,5 | 6,2 |
| ENSEMBLE | 15967 | 826 | 19,3 | 0,68 | 16,1 | 19,7 | 18,1 | 31,2 | 25,1 | 6,1 | 5,1 |

Les marques de la voix, comptées dans les fichiers (regex Python, puis triées à la lecture ; pour 1000 mots de
`tempo.py` entre parenthèses) :

| marque | ch. 48 | ch. 52 | ch. 57 | lot |
| --- | --- | --- | --- | --- |
| citations de source entre guillemets | 19 | 13 | 19 | 51 (3,2) |
| dont au « vous » ou à l'impératif en -ez | 4 | 3 | 3 | 10 |
| formule, opposition « X, pas Y », chute (triées à la lecture) | 15 | 14 | 18 | 47 (2,9) |
| chose qui décide, cherche, pardonne, ment, travaille (triées) | 7 | 12 | 10 | 29 (1,8) |
| le livre, le chapitre, la page, le lecteur qui parlent d'eux | 7 | 9 | 9 | 25 (1,6) |
| « consommer » / « manipuler, manipulation » | 7 / 10 | 2 / 3 | 1 / 3 | 10 / 16 |
| noms latins | 4 | 4 | 9 | 17 |
| « exactement » | 6 | 5 | 5 | 16 |
| adverbes d'essai (manifestement, intégralement, désespérément, systématiquement, spontanément, honnêtement…) | 5 | 7 | 1 | 13 |
| « ça » | 6 | 5 | 17 | 28 (1,8) |
| « on » | 42 | 17 | 59 | 118 (7,4) |
| « se » + verbe qui décrit (« se cuit », « se dépouille », « se suit ») | 46 | 48 | 78 | 172 (10,8) |
| « parce que » | 7 | 9 | 5 | 21 (1,3) |

`controle.py`, section « Mots de livre » : 9 avis au ch. 48 (« à défaut » quatre fois, « afin de » deux fois,
« d'apparence » trois fois), 5 au ch. 52 (« davantage » trois fois, « d'apparence » deux fois), 4 au ch. 57
(« constituer », « afin de », « à défaut » deux fois). Sur les 29 choses qui pensent, la catégorie « tournure » en
relève 2 (« la cuisse décide », « Le montage décide »). Sur les 47 formules, la catégorie « Maximes » en relève 7.
**Le script voit le mot ; la voix de ces chapitres est dans la tournure.**

Le chiffre qui dit le plus : au ch. 52, il y a presque trois fois plus de « se » + verbe que de « on » (48 contre 17).
Le chapitre décrit des choses qui se font toutes seules (« la bête se laisse où elle est tombée », « un ours touché
[…] ne se suit jamais vite »), et personne ne parle comme ça. Ce défaut appartient au regard « consigne » ; je le
signale parce qu'il fait la moitié de la voix de manuel.

## 2. Ce que j'entends dans ces pages

Trois voix se relaient, et aucune n'est celle du voisin dans le garage.

- **La voix de l'institution**, recopiée telle quelle : « les individus qui en sont affectés ne démontrent souvent
  que des signes de faiblesse ou de léthargie », « afin de minimiser l'aérosolisation des bactéries », « le cas
  échéant », « Humectez », « Évitez », « Vos bras, vos jambes et vos doigts perdront leur motricité ». Une citation
  sur trois paragraphes en moyenne ; dans les étapes 7 à 18 du ch. 48, presque chaque étape en a une, souvent deux.
- **La voix de l'essayiste**, qui finit le paragraphe sur une phrase qui frappe : « le lièvre est un apport, pas un
  socle », « Un ours à terre n'est pas un ours mort », « Un gilet rangé sous le banc est un objet décoratif »,
  « celle-là ne se contourne pas, elle se subit ». C'est la voix que JP appelle « fils d'la AI ».
- **La voix du rapport de laboratoire**, surtout dans les tableaux : « Autolyse avancée », « Dégradation protéique
  installée », « Rupture de chaîne », « Production de gaz dans un pot fermé », « la filière conserve est fermée »,
  « Mortalité de cause inconnue », « Lésions compatibles avec la tularémie ».

Entre les trois, des passages sonnent juste, presque tous dans la variante d'urgence, là où le rédacteur décrit un
geste qu'il voit (section 4). La règle se lit dans le texte : **quand il montre les mains, la voix est bonne ; quand
il explique, justifie ou conclut, elle tombe dans le livre.**

## 3. Les défauts, du plus grave au moins grave

### 3.1 La voix de l'institution recopiée dans le texte (gravité haute)

**Le défaut.** Le texte cite les guides du gouvernement entre guillemets, avec leur langue (« les individus qui en
sont affectés », « le cas échéant », « afin de minimiser l'aérosolisation ») et leur vouvoiement (« Humectez »,
« Évitez », « Ne donnez jamais », « il vous sera presque impossible »). Le livre dit « on » ; la citation dit
« vous ». Le lecteur entend deux personnes parler, et la deuxième est un ministère. La citation fait aussi doublon :
le rédacteur dit le fait, puis le prouve (« Le mécanisme, en clair : »).

**Fréquence.** 51 citations de source dans le lot (19, 13, 19), soit 3,2 pour 1000 mots ; 10 au « vous » ou à
l'impératif en -ez.

**Cause.** `CLAUDE.md`, règle 1 : « La provenance ne s'imprime pas ». `.claude/cadre-agents.md`, l. 21 : « La source
sert à vérifier un fait, jamais à copier une forme. » Skill `ecriture`, « Les guillemets » : « Pas de citation de
source. » Les règles existent ; ces chapitres ont été écrits avant elles et n'ont pas eu leur passe. L'habitude
derrière : le rédacteur veut prouver qu'il a une source, au lieu de dire le fait à sa façon.

| fichier, ligne | texte | réécriture |
| --- | --- | --- |
| 48, l. 117 à 120 | « Il est vivant mais faible, léthargique, et se laisse approcher. C'est exactement le tableau de la maladie : «les individus qui en sont affectés ne démontrent souvent que des signes de faiblesse ou de léthargie et apparaissent en bon état de chair ». Le bon état de chair n'est pas rassurant : il fait partie du tableau. » | « Il est vivant, mais faible et comme endormi, et il se laisse approcher. C'est comme ça qu'un lièvre qui a la tularémie se comporte. Il a souvent l'air bien en chair, et ça ne veut pas dire qu'il est en santé. » |
| 48, l. 147 à 152 | « C'est la consigne la moins connue et l'une des plus importantes : «il est également recommandé de mouiller la fourrure avant toute manipulation afin de minimiser l'aérosolisation des bactéries ». Le mécanisme, en clair : «Humectez la fourrure avant d'éviscérer l'animal de façon à diminuer la quantité de poussière. » » | « Mouiller le poil avant de toucher à la bête. Un poil sec qu'on tire et qu'on coupe lève de la poussière qui porte la bactérie, et on peut attraper la tularémie en la respirant. » |
| 48, l. 174 à 176 | « La consigne qui suit est sans nuance : «il est recommandé de ne pas consommer la viande de tout animal présentant des points blancs sur le foie ou la rate et de le soumettre à un laboratoire ». Pas «parer autour », pas «bien cuire » : ne pas consommer. » | « S'il y a des points blancs sur le foie ou la rate, on ne mange pas la bête : ni en coupant autour, ni en la cuisant plus longtemps. » (Le laboratoire sort aussi : `CLAUDE.md`, aucun service qui répond.) |
| 52, l. 256 à 262 | « Les larves s'enkystent dans les muscles de la bête ; elles ne se voient pas, elles ne se sentent pas, et «l'infection est sans symptômes chez la plupart des animaux ». Avalées vivantes, elles se développent et une nouvelle génération migre dans les muscles de la personne : «L'inflammation du muscle cardiaque et du cerveau, le cas échéant, est grave, voire mortelle ». «Au Québec, l'ours noir est l'animal le plus susceptible de transmettre la maladie à l'humain ». » | « Au Québec, l'ours noir est l'animal qui risque le plus de donner la trichinellose. La larve vit dans les muscles de l'ours, dans un petit kyste, et la plupart des ours qui en ont n'ont pas l'air malades : on ne la voit pas et on ne la sent pas. Quand on avale des larves vivantes, elles se multiplient, et leurs petits vont se loger dans les muscles de la personne. Si le cœur ou le cerveau est atteint, c'est grave, et ça peut tuer. » |
| 57, l. 205 à 208 | « 1 minute — le choc thermique. «Une personne prend une respiration soudaine et profonde, puis commence à faire de l'hyperventilation », avec une respiration «de 600 à 1 000 % plus rapide que la normale ». Une seule de ces inspirations prise sous la surface suffit. «Même un bon nageur peut succomber aux effets d'un choc thermique. » » | « La première minute : le choc du froid. En tombant dans l'eau froide, on prend une grande respiration d'un coup, sans le vouloir, puis on se met à respirer de 600 à 1 000 % plus vite que d'habitude. Il suffit d'une seule de ces respirations la tête sous l'eau. Même un bon nageur peut mourir de ce choc. » |
| 57, l. 120 à 123 | « Pour remettre : se rincer les mains avant de toucher le poisson, «afin de préserver la couche protectrice de mucus sur son corps » — une main sèche arrache cette barrière par friction. Retirer l'hameçon avec les pinces ; «s'il est trop profondément engagé, coupez la ligne au plus près de l'hameçon ». » | « Pour remettre le poisson à l'eau : se mouiller les mains avant de le toucher. Le poisson est couvert d'un mucus qui le protège, et une main sèche le lui enlève en frottant. Enlever l'hameçon avec les pinces ; s'il est avalé trop loin, couper la ligne au ras de l'hameçon. » |

### 3.2 La formule qui oppose ou qui conclut (gravité haute)

**Le défaut.** Le paragraphe finit sur une phrase qui juge ou qui oppose, au lieu de s'arrêter au fait : « X, pas
Y » (« un apport, pas un socle »), la tautologie (« Une ligne trop longue […] est une ligne trop longue »), le
« point. » de conclusion, la chute qui chiffre une perte au hasard (« un ours à moitié perdu », puis, cent quarante
lignes plus loin, « gaspillé aux trois quarts »). C'est la phrase qu'une IA écrit pour « faire style ». Lue à voix
haute, elle sonne comme un slogan, et souvent elle cache le fait qu'il fallait dire (pourquoi le collet manque,
pourquoi on dépouille tôt).

**Fréquence.** 47 dans le lot (15, 14, 18), soit 2,9 pour 1000 mots, à peu près une par paragraphe de prose. Le
script en relève 7.

**Cause.** Skill `ecriture`, tableau « Les phrases » : « La chute en formule », « L'opposition fabriquée » ; tableau
du 15 octobre, ligne « La maxime » ; `.claude/cadre-agents.md`, l. 99 : « Pas de maxime ni de chute en formule ; pas
d'opposition fabriquée. » La regex `MAXIME` ne cherche que « Un X qui… ne… plus/rien/pas ». Toutes les oppositions
ne sont pas fausses : « Faire bouillir, pas mijoter » (52, l. 328) ou « à côté du poêle, pas dessus » (52, l. 357)
corrigent un vrai réflexe et restent. Celle qui sort est celle qu'aucun lecteur n'aurait confondue.

| fichier, ligne | texte | réécriture |
| --- | --- | --- |
| 48, l. 99 à 100 | « Un collet mal calibré ne rate pas, il manque — il glisse sur le corps et l'animal part avec le fil. » | « Un collet mal ajusté glisse sur le corps, et le lièvre part avec le fil. » |
| 48, l. 105 à 107 | « Une ligne trop longue pour être relevée chaque matin est une ligne trop longue : mieux vaut dix collets visités tous les jours que trente visités aux trois jours. » | « Poser seulement les collets qu'on peut visiter chaque matin : c'est mieux d'en avoir dix qu'on visite tous les jours que trente qu'on visite aux trois jours. » |
| 48, l. 525 à 527 | « Le fumage à froid, par définition, ne monte pas à la température qui tue (ch. 70) : un lièvre fumé à froid est un lièvre cru et froid. Le lièvre se cuit, point. » | « Le fumage à froid ne chauffe pas la viande assez pour tuer la bactérie (ch. 70) : un lièvre fumé à froid est encore cru, et il faut le cuire. » |
| 52, l. 113 à 115 | « Dès que la bête est à l'abri des mouches et de la poussière, la peau et sa couche de gras s'enlèvent, et le refroidissement reprend son cours normal. Avec un ours, le dépouillement n'est pas une opération de confort, c'est une opération de refroidissement. » | « Dès que la bête est à l'abri des mouches et de la poussière, enlever la peau et la couche de gras : tant qu'elles sont là, la viande refroidit mal. » |
| 52, l. 306 (et l. 447 à 448) | « Un ours dont on jette le gras pour ne garder que le muscle est un ours à moitié perdu. » ; plus loin : « Un ours dont on n'a gardé que les steaks a été gaspillé aux trois quarts. » | La phrase sort dans les deux cas : celle d'avant dit déjà que le gras empêche le mal de caribou, et ce que le gras devient. La fraction change d'une fois à l'autre parce qu'elle ne mesure rien. |
| 57, l. 212 à 213 | « C'est pour ça que le VFI se porte, pas se transporte. Un gilet rangé sous le banc est un objet décoratif. » | « C'est pour ça qu'on met son VFI avant de monter dans l'embarcation, au lieu de le ranger sous le banc. » |

Autres cas à traiter de la même façon : 48, l. 25 (« un repas de famille, pas un chantier de débitage »), l. 83
(« une station incomplète »), l. 509 (« Un lièvre malade sur une piste veut dire que la piste a été fréquentée par des
lièvres malades ») ; 52, l. 199 (« un pemmican dangereux »), l. 277 (« Un ours à terre n'est pas un ours mort »),
l. 406, l. 466 (« elle se subit ») ; 57, l. 21 (« un orignal ne se retue pas »), l. 107 (« en trois secondes pour un
siècle »), l. 380 (« reste une eau tiède à l'ombre »), l. 408, l. 477, l. 481 (« Ce qu'on perd, honnêtement »),
l. 487 (« mais elle est réelle »).

### 3.3 La chose qui décide, cherche, pardonne, ment (gravité haute)

**Le défaut.** Un morceau de viande, un outil, une méthode ou une bactérie fait une action de personne : « la cuisse
décide », « le centre, dernier chauffé, décide », « la condition que cherche *Clostridium botulinum* », « celle-là ment
sans avertir », « la méthode qui pardonne tout », « il pardonne moins les retards », « la faim pousse exactement là où
la glace porte le moins », « le gel travaille pour le lecteur », « la règle des 74 °C ne connaît pas les saisons ».
Avec elle vient l'image (« Le lac est sa propre glacière », « le montage devient un décor »). C'est exactement la
famille « la braise ne sait pas » que JP a refusée le 16 octobre.

**Fréquence.** 29 dans le lot (7, 12, 10), soit 1,8 pour 1000 mots. Le script en relève 2.

**Cause.** `.claude/cadre-agents.md`, l. 100 à 102 : « Pas de chose qui pense, sait, veut, attend, pardonne ou se
croit » ; skill `ecriture`, tableau du 15 octobre, ligne « La chose qui pense ». La regex `TOURNURE` demande un
article, un nom et un verbe de l'esprit collés ; elle manque « décide » après une virgule, « pardonne » avec « il »,
« ment » avec « celle-là », « cherche » dans une relative (« que cherche X ») et « travaille ».

| fichier, ligne | texte | réécriture |
| --- | --- | --- |
| 48, l. 204 à 206 | « Le râble est mince et monte vite ; la cuisse décide. Un lièvre dont le râble est rosé à cœur n'est pas cuit au sens de cette page. » | « Le râble est mince et cuit plus vite que la cuisse : on prend donc la température dans la cuisse. Si le râble est encore rosé au centre, le lièvre n'est pas cuit. » |
| 52, l. 67 à 68 | « Seule la chaleur la tue, et elle entre par la surface : le centre, dernier chauffé, décide, et un haché n'est que du centre. » | « Seule la chaleur tue la larve, et la viande chauffe de l'extérieur vers le centre : c'est donc au centre qu'on prend la température, et dans le haché, au centre de la masse. » |
| 52, l. 351 à 353 | « Ce qui ne se rattrape pas, c'est celle qui donne trois lectures différentes dans la même eau ; celle-là ment sans avertir, et elle est pire que pas de thermomètre du tout, parce qu'elle donne une confirmation. » | « On ne peut pas corriger une sonde qui donne trois lectures différentes dans la même eau : elle est pire que pas de thermomètre du tout, parce qu'on se fie à ce qu'elle dit. » |
| 57, l. 42 à 44 | « Le poisson demande plus de manipulation par kilogramme entré au saloir que n'importe quelle viande de ce livre, et il pardonne moins les retards. » | « Pour le même poids mis au sel, il y a plus d'ouvrage avec le poisson qu'avec n'importe quelle viande, et il se gâte plus vite quand on tarde. » |
| 57, l. 359 à 362 | « Sur la glace, la bonne pêche est au mauvais endroit. La vase à anguille d'une embouchure est sous une glace que le courant garde mince, et plus la glace est mince, plus le manche fouille loin dans la vase : la faim pousse exactement là où la glace porte le moins. » | « Sur la glace, on pêche l'anguille dans la vase des embouchures, là où le courant garde la glace mince. Plus la glace est mince, plus le manche fouille loin dans la vase : le meilleur endroit pour pêcher est celui où la glace porte le moins. » |
| 57, l. 374 à 375 | « Le lac est sa propre glacière, et la section 3 dit pourquoi : c'est l'eau du fond qui reste froide tout l'été, et c'est pour ça que le touladi s'y tient. » | « Au fond du lac, l'eau reste froide tout l'été (c'est pour ça que le touladi s'y tient) : on peut y garder le poisson au frais. » |

Autres cas : 48, l. 23 (« une ligne de collets travaille la nuit »), l. 330 (« C'est le deuxième point qui
décide »), l. 365 (« Le montage décide de tout »), l. 532 (« le gel travaille pour le lecteur ») ; 52, l. 27 (« que le
chapitre 19 cherche désespérément »), l. 38, l. 285, l. 345 (« devient celui qui décide si la viande se mange »),
l. 380, l. 434 (« c'est le rendu qui le paie »), l. 469, l. 477 (« le montage que cherche le botulisme ») ; 57, l. 55
(« sa flore travaille encore »), l. 193 (« le thermomètre de l'enceinte qui tranche »), l. 350 (« la méthode se
retourne »), l. 389 (« se contente d'entretenir »), l. 463 (« n'a besoin de rien d'autre pour travailler »).

### 3.4 Le registre de rapport : clinique, règlement, fiche de laboratoire (gravité haute)

**Le défaut.** Le texte nomme les choses comme un rapport : « le portrait clinique », « le tableau de la maladie »,
« un apport, pas un socle », « consommer », « la manipulation », « le préparateur », « la filière conserve »,
« Transport et entreposage », « constituer un stock », « à intervalles courts », « hors cible ». Les tableaux en sont
pleins, surtout la colonne « Diagnostic » : des groupes de noms sans verbe (« Autolyse avancée », « Dégradation
protéique installée », « Rupture de chaîne », « Production de gaz dans un pot fermé »). Personne ne dit « je vais
consommer un lièvre » ni « la filière conserve est fermée ».

**Fréquence.** « consommer » 10 fois, « manipuler, manipulation » 16, « tableau » (sens clinique) 5, « voie(s)
d'entrée, d'infection » 5, « filière » 2, « salubrité, sanitaire » 3, « hors cible » 3 ; dans les tableaux des signes
d'échec, 17 cases « Diagnostic » sur 29 n'ont aucun verbe (48 : 7 sur 10 ; 52 : 7 sur 11 ; 57 : 3 sur 8).

**Cause.** Skill `ecriture`, règle 0 : « des mots de tous les jours, avec leurs articles » ; règle 15 : « est-ce que je
le dirais comme ça, à voix haute, à quelqu'un ? » ; cadre, l. 132 à 139. L'habitude : la langue de la source passe
dans le texte même quand on ne la cite pas, et la colonne « Diagnostic » appelle une étiquette.

| fichier, ligne | texte | réécriture |
| --- | --- | --- |
| 48, l. 27 à 28 | « Et comme complément dans une ration d'hiver qui repose déjà sur autre chose : le lièvre est un apport, pas un socle. » | « En plus de ce qu'on mange l'hiver, jamais à la place. » |
| 48, l. 35 à 37 | « Jamais sur un lièvre vivant qui se laisse approcher : un animal en bon état de chair qui ne fuit pas est le portrait clinique de la tularémie, pas une prise facile. » | « Un lièvre vivant qui ne se sauve pas quand on approche se comporte comme un lièvre qui a la tularémie, même s'il a l'air bien en chair : on le laisse là. » |
| 52, l. 118 à 119 | « Transport et entreposage entre 0 °C et 4 °C. Congélation à -18 °C ou moins — pour la qualité, pas pour le parasite. » | « Pendant le transport et en attendant de la travailler, garder la viande entre 0 °C et 4 °C. La congélation, à -18 °C ou moins, garde la viande bonne, mais elle ne tue pas le parasite. » |
| 52, l. 209 | « Manquée : la filière conserve est fermée. La viande se cuit et se mange, ou se jette. » | « Pas descendue à 7 °C : on ne met pas cette viande en conserve. On la cuit et on la mange, ou on la jette. » |
| 57, l. 182 et l. 185 | « Chair molle qui garde l'empreinte du doigt, ne reprend pas sa forme | Autolyse avancée : le poisson a été trop longtemps au chaud ou non vidé » ; « Odeur ammoniaquée ou piquante | Dégradation protéique installée | Rejet. » | « La chair garde la marque du doigt | Le poisson a commencé à se défaire de l'intérieur : il est resté trop longtemps au chaud, ou on ne l'a pas vidé » ; « Ça sent l'ammoniaque ou ça pique au nez | Le poisson pourrit | Le jeter. » |
| 57, l. 20 à 21 | « Le chalet a besoin de protéine fraîche à intervalles courts sans entamer le stock permanent (ch. 5). » | « Avoir du poisson frais souvent, sans toucher à la réserve du chalet (ch. 5). » |

### 3.5 Le mot savant et le nom latin, là où un mot de tous les jours existe (gravité moyenne)

**Le défaut.** Le vocabulaire de la médecine et de la biologie remplace le mot qu'on dit : « léthargique »,
« l'inhalation », « contact cutané ou oculaire », « piqûre d'arthropode », « endémique », « le vecteur »,
« l'anaérobiose », « non protéolytique », « l'enceinte » (pour la glacière ou le congélateur), « sous-cutané »,
« intramusculaire », « anadrome », « la phalange ». Et 17 noms latins, dont une ligne entière de tableau au ch. 57
(« Nom latin »).

**Fréquence.** Mots savants relevés : 37 (léthargique 3, inhalation 4, cutané 4, oculaire 1, aérosolisation 1,
endémique 1, vecteur 1, anaérobiose 1, autolyse 1, protéolytique 2, intramusculaire 1, sous-cutané 1, ammoniaquée 1,
enceinte 3, anadrome 3, salmonidé 2, hypertrophie 1, granules 1, phalange 1, « voies d'infection » et « d'entrée » 5) ;
noms latins 17 (4, 4, 9). Aucun n'est dans la liste « Mots de livre » du script.

**Cause.** `.claude/cadre-agents.md`, l. 138 à 139 : « pas de mot de métier sans besoin […], pas de nom latin » ;
skill `ecriture`, règle 15. Le mot de métier reste quand il n'a pas d'équivalent et qu'il s'explique (« s'écrouit »,
48, l. 343, est expliqué tout de suite : il reste).

| fichier, ligne | texte | réécriture |
| --- | --- | --- |
| 48, l. 66 | « Lunettes et masque — l'œil et l'inhalation sont deux voies d'entrée ; à défaut de masque, foulard mouillé, jamais sec. » | « Lunettes et masque : la bactérie entre aussi par les yeux et quand on la respire. Sans masque, un foulard mouillé, jamais sec. » |
| 48, l. 280 à 282 | « L'humain se contamine par cinq voies : contact cutané ou oculaire, inhalation, piqûre d'arthropode, ingestion de viande insuffisamment cuite ou d'eau contaminée. » | « On l'attrape de cinq façons : par la peau, par les yeux, en la respirant, par une piqûre d'insecte ou de tique, et en l'avalant. On l'avale avec de la viande pas assez cuite ou de l'eau contaminée. » |
| 48, l. 307 à 308 | « Le chien qui mange les abats devient le vecteur qui les ramène dans le chalet. » | « Un chien qui mange les abats ramène la maladie au chalet. » |
| 52, l. 283 à 285 | « La viande confite et la conserve créent l'anaérobiose — c'est le terrain du botulisme. Une viande peu acide, recouverte de gras ou scellée dans un pot, se retrouve sans oxygène. C'est exactement la condition que cherche Clostridium botulinum » | « Sous le gras d'un confit ou dans un pot scellé, une viande peu acide n'a plus d'air, et c'est sans air que le botulisme pousse. » |
| 57, l. 226 à 227 | « Clostridium botulinum non protéolytique, celui des milieux aquatiques, n'a pas besoin d'une conserve pour produire sa toxine » | « Le botulisme de type E, celui qui vit dans l'eau, n'a pas besoin d'une conserve pour faire sa toxine. » |
| 57, l. 171 | « Dans la glacière | Température de l'enceinte » | « Dans la glacière | Température dans la glacière » (et l. 173, « Température du congélateur ») |

### 3.6 La phrase sans verbe et les participes en chaîne, dans les étapes (gravité moyenne)

**Le défaut.** Une étape aligne des noms et des participes au lieu de dire le geste : « Gants imperméables,
lunettes, masque et tablier, tous les quatre. », « À la station, à l'extérieur, gants aux mains, animal humecté. »,
« Poisson couché sur le flanc, cavité vers le bas, enrobé de glace ». Le lecteur doit reconstruire qui fait quoi.
Dans les tableaux, l'action devient une liste d'étiquettes (« Sac, étiquette, laboratoire, signalement »).

**Fréquence.** Une vingtaine de passages relevés à la lecture dans les étapes et la variante d'urgence (48 : étapes 1,
2, 9, 11, 15 ; 52 : étapes 8, 9, 16, 25, 26 ; 57 : étapes 4, 10, 11 ; « La perche », « La ligne à main », « Le jute
mouillé », « Sécher au vent »), plus la colonne « Si c'est hors cible » des points de contrôle.

**Cause.** Skill `ecriture`, règle 0 : « un verbe qui dit le geste, et on sait qui le fait », « pas de participe en
chaîne », « pas d'étiquette en raccourci, même dans un logigramme ou un tableau ».

| fichier, ligne | texte | réécriture |
| --- | --- | --- |
| 48, l. 141 à 145 | « Gants imperméables, lunettes, masque et tablier, tous les quatre. Un seau de solution de javel prêt : un volume d'eau de Javel pour neuf volumes d'eau. De l'eau et du savon à portée, pas dans l'autre bâtiment. Le chien attaché ailleurs : ce qu'il mange aux abats, il le rapporte au chalet (§8). » | « Mettre les quatre : les gants imperméables, les lunettes, le masque et le tablier. Préparer un seau de javel : un volume d'eau de Javel pour neuf volumes d'eau. Garder de l'eau et du savon à côté, pas dans l'autre bâtiment. Attacher le chien ailleurs : s'il mange les abats, il ramène la maladie au chalet (section 8). » |
| 48, l. 157 | « Dépouiller. À la station, à l'extérieur, gants aux mains, animal humecté. » | « Dépouiller le lièvre dehors, à la station, avec les gants et après avoir mouillé le poil. » |
| 48, l. 247 | « Ne pas consommer. Sac, étiquette, laboratoire, signalement » | « Ne pas manger la bête. La mettre dans un sac et écrire la date et l'endroit dessus. » (Laboratoire et signalement sortent : `CLAUDE.md`, aucun service qui répond.) |
| 52, l. 116 à 117 | « Mesurer, pas estimer. Sonde au centre de la cuisse, loin de l'os. Une lecture à 2 h, une à 6 h, une à 24 h. » | « Mesurer la température au lieu de la deviner : piquer la sonde au centre de la cuisse, loin de l'os, après 2 h, après 6 h et après 24 h. » |
| 57, l. 139 à 142 | « Au froid, immédiatement. Poisson couché sur le flanc, cavité vers le bas, enrobé de glace et non posé dessus, dans une glacière fermée, à l'ombre, avec un bouchon de vidange ouvert pour que l'eau de fonte s'écoule. » | « Mettre le poisson au froid tout de suite. Le coucher sur le côté, le ventre ouvert vers le bas, et l'entourer de glace au lieu de le poser dessus. Fermer la glacière, la laisser à l'ombre et ouvrir le bouchon de vidange pour que l'eau de fonte s'en aille. » |
| 57, l. 386 à 387 | « Poisson vidé, ouvert, suspendu à l'ombre dans un courant d'air, enveloppé d'une toile mouillée qu'on remouille. » | « Vider et ouvrir le poisson, le suspendre à l'ombre dans un courant d'air et l'envelopper d'une toile mouillée, qu'on garde mouillée. » |

### 3.7 Le livre qui parle de lui-même, de ses sources et de son lecteur (gravité moyenne)

**Le défaut.** Le texte se commente : « le livre retient la plus longue », « Le livre ne peut pas prétendre le
contraire », « le livre n'a aucune source qui autorise », « la voie recommandée par ce chapitre », « au sens de cette
page », « le geste le plus difficile du chapitre », « la seule phrase de ce livre qu'il faut savoir par cœur », « le
seul cas du chapitre où le gel travaille pour le lecteur », « Ce que le tableau dit et qu'on lit mal ». Pour la voix,
c'est l'auteur qui se met entre le lecteur et la chose, et qui parle de son lecteur à la troisième personne. Le
voisin dans le garage ne dit jamais « ce chapitre ».

**Fréquence.** 25 dans le lot (7, 9, 9), soit 1,6 pour 1000 mots.

**Cause.** Skill `ecriture`, tableau « Les phrases » : « La phrase qui parle du livre, du chapitre, de la page » et
« Le superlatif qui ne se mesure pas » ; `CLAUDE.md` : « La provenance ne s'imprime pas » (« le livre n'a aucune
source » parle des sources).

| fichier, ligne | texte | réécriture |
| --- | --- | --- |
| 52, l. 183 à 185 | « Ce n'est pas une conserve de tablette : le livre n'a aucune source qui autorise à garder de la viande confite hors du froid, et le confit se range entre 0 et 4 °C ou au caveau. » | « On ne garde pas le confit sur la tablette comme une conserve : on le garde entre 0 et 4 °C, ou au caveau. » |
| 52, l. 319 à 323 | « C'est la seule perte qui compte, et elle est grave : on perd la vérification de la seule barrière qui existe contre la trichinellose. Le livre ne peut pas prétendre le contraire. Ce qui reste est un raisonnement de physique, pas une mesure : l'eau qui bout est à environ 100 °C, donc un morceau immergé dans une eau à gros bouillons a toute sa surface tenue au-dessus de 74 °C, et son centre y monte à mesure que la chaleur pénètre. » | « Sans thermomètre, on ne peut plus vérifier que la viande est montée à 74 °C, et c'est la seule chose qui tue le parasite. Il reste l'eau qui bout : elle est à environ 100 °C, alors un morceau qui baigne dans un gros bouillon chauffe de partout, et son centre finit par monter. » |
| 48, l. 218 à 220 | « Une étendue plus courte circule aussi — «de 3 à 5 jours (parfois jusqu'à 14 jours) » — et le livre retient la plus longue, parce qu'une fenêtre trop courte fait cesser de surveiller trop tôt. » | « On surveille trois semaines. » (Que deux sources se contredisent n'aide pas le lecteur ; la durée retenue suffit.) |
| 57, l. 234 à 235 | « Et la seule phrase de ce livre qu'il faut savoir par cœur : «Le botulisme n'altère pas la couleur, l'odeur ou le goût des aliments ». » | « Le botulisme ne change ni la couleur, ni l'odeur, ni le goût du poisson. » |
| 52, l. 40 à 41 | « Ce chapitre ferme des portes ailleurs dans le livre, et c'est son apport principal. Pour l'ours noir, et pour aucune autre espèce du tome 3 : » | « Ce qu'on peut faire, ou pas, avec la viande d'ours dans les chapitres de conservation : » |
| 48, l. 125 à 127 | « Laisser un animal sur place en hiver quand on en a besoin est le geste le plus difficile du chapitre, et c'est pour ça qu'il faut en connaître la raison avant d'être devant. » | La phrase sort : la raison est dite dans l'étape. |

### 3.8 Les mots et les tours de l'écrit que la liste ne connaît pas (gravité moyenne)

**Le défaut.** Hors de la liste du script, un vocabulaire de dissertation : les adverbes d'essai (« par
construction », « par définition », « intégralement », « désespérément », « systématiquement », « spontanément »,
« honnêtement »), les connecteurs (« sachant que », « vis-à-vis du », « de son côté », « en découle »), les verbes
écrits (« rachète une partie du retard », « s'apparentent à », « imposent », « délibérer »), l'adjectif savant
(« inatteignable des deux bords », « non spécifiques »), le « ne » explétif (« avant qu'il ne gèle », « plus haut
qu'il n'est », « plus creux qu'il ne paraît »), et « exactement » mis partout pour appuyer.

**Fréquence.** « Mots de livre » du script : 18 (9, 5, 4). Au-delà de la liste : « exactement » 16 (6, 5, 5),
adverbes d'essai 13 (5, 7, 1), « par définition » ou « par construction » 3, « ne » explétif 6 (1, 0, 5).

**Cause.** Skill `ecriture`, règle 15 (la table « On l'écrit / On le dit » ne compte que 16 lignes) et « Les mots :
Les mots vides » ; l'habitude de l'écrit soigné, qui croit que le mot recherché fait sérieux.

| fichier, ligne | texte | réécriture |
| --- | --- | --- |
| 48, l. 102 à 104 | « L'éviscération se fait immédiatement après la mort de l'animal. Un lièvre pris au collet est déjà, par construction, hors de cette fenêtre : le froid de janvier rachète une partie du retard, pas tout. » | « Vider la bête dès qu'elle est morte. Un lièvre pris au collet est mort depuis un bout de temps quand on arrive : le froid de janvier aide, mais il ne rattrape pas tout le retard. » |
| 52, l. 23 à 27 | « Il s'applique intégralement à un ours tiré en défense d'une personne ou d'un bien, parce que la viande et le gras d'une bête abattue par nécessité ont exactement la même valeur alimentaire et exactement le même parasite. Il s'applique surtout à l'ours d'automne, celui qui a passé l'été à manger et qui porte la couche de gras que le chapitre 19 cherche désespérément en février. » | « Un ours tué pour se défendre ou pour défendre ce qu'on a, on le traite comme les autres : sa viande et son gras nourrissent autant, et il porte le même parasite. L'ours d'automne compte le plus : il a mangé tout l'été et il a la couche de gras qui manque en février (ch. 19). » |
| 52, l. 422 à 426 | « Ce qu'une panne enlève en plus, c'est le repli sur le congélateur de la maison, et le -18 °C devient alors inatteignable des deux bords, donc la viande se conserve moins longtemps et se traite plus vite. Ce n'est pas une perte sanitaire vis-à-vis du parasite, puisque le gel n'agissait pas sur lui de toute façon. » | « Une panne enlève en plus le congélateur de la maison : on n'a plus de -18 °C nulle part, alors il faut traiter la viande plus vite. Pour le parasite, ça ne change rien, puisque le gel ne le tuait pas. » |
| 48, l. 214 à 217 | « Les premiers signes sont non spécifiques et s'apparentent à un syndrome grippal — fièvre, frissons, maux de tête, malaises, douleurs musculaires —, souvent avec une hypertrophie sévère des nœuds lymphatiques du côté de la voie d'entrée » | « Au début, ça ressemble à une grippe : de la fièvre, des frissons, mal à la tête, on se sent mal et on a mal aux muscles. Souvent, un ganglion enfle beaucoup du côté où la bactérie est entrée. » |
| 57, l. 11 à 14 | « Prendre au lac l'omble de fontaine (truite mouchetée) et le touladi (truite grise), puis les amener du bord de l'eau au froid — 0 à 4 °C jusqu'à la transformation, -18 °C ou moins pour l'hiver — assez vite pour que la chair vaille encore le déplacement, sachant qu'un poisson perd en quelques heures ce qu'un quartier d'orignal met une journée à perdre. » | « Pêcher l'omble de fontaine (truite mouchetée) et le touladi (truite grise) au lac, et les mettre au froid assez vite pour que la chair reste bonne : un poisson se gâte en quelques heures autant qu'un quartier d'orignal en une journée. On les garde entre 0 et 4 °C jusqu'à ce qu'on les travaille, à -18 °C ou moins pour l'hiver. » |
| 57, l. 117 à 119 | « La manipulation hors de l'eau se limite à moins de 15 secondes : peser, mesurer, admirer et délibérer prennent plus que ça. Un poisson dont on hésite est un poisson qu'on remet. » | « Le poisson ne doit pas rester hors de l'eau plus de 15 secondes : on n'a pas le temps de le peser, de le mesurer ni de se demander quoi faire. Si on hésite, on le remet à l'eau. » |

### 3.9 L'apposition, l'ordre de l'écrit et le commentaire en « ce qui… » (gravité basse)

**Le défaut.** La phrase se construit comme à l'écrit : le complément glissé entre virgules ou entre tirets avant le
verbe (« Sa larve, enkystée dans la fibre, ne donne… », « Une lame de scie cassée — ruban, godendard, sabre — est… »),
le participe en tête (« meulée en biseau et emmanchée…, elle dépouille »), le sujet repoussé derrière une apposition
(« L'autre hameçon, celui qui ne demande ni lime ni trempe, est la broche avalée »), le complément avant l'objet
(« Prendre au lac l'omble »), et la proposition en « , ce qui… » qui ajoute un commentaire à la fin (« ce qui est la
pire fin pour la bête et la fin de la ligne pour le trappeur », « ce qui est un choix de conservation avant d'être un
choix de pêche »). À voix haute, on dit les choses dans l'ordre où on les fait, une à la fois.

**Fréquence.** « , ce qui » de commentaire : 9 (3, 1, 5). Appositions et participes en tête : plusieurs par page de
variante d'urgence (non comptés un à un).

**Cause.** Skill `ecriture`, règle 11 (« L'ordre naturel : le verbe, ce qu'on fait, puis où et quand ») et règle 0
(« pas de participe en chaîne ») ; tableau « Les mots » : « Le complément qui décore ».

| fichier, ligne | texte | réécriture |
| --- | --- | --- |
| 57, l. 281 à 283 | « L'autre hameçon, celui qui ne demande ni lime ni trempe, est la broche avalée : un bâtonnet d'os ou de bois dur de la longueur d'un pouce, taillé en pointe aux deux bouts, ligaturé en son milieu au fil et enfoui dans l'appât. » | « Il y a un autre hameçon, qui ne demande ni lime ni trempe : la broche avalée. On taille un bâtonnet d'os ou de bois dur, long comme un pouce, en pointe aux deux bouts, on l'attache au fil par le milieu et on le cache dans l'appât. » |
| 52, l. 430 à 431 | « Une lame de scie cassée — ruban, godendard, sabre — est de l'acier qui prend le fil ; meulée en biseau et emmanchée dans du bois fendu et ligaturé, elle dépouille et elle sépare la nappe de gras (ch. 111). » | « Une lame de scie cassée (scie à ruban, godendard, scie sabre) est d'un acier qui prend le fil. On la meule en biseau et on l'emmanche dans un bout de bois fendu qu'on ligature : elle sert à dépouiller et à détacher la nappe de gras (ch. 111). » |
| 48, l. 388 à 390 | « Jamais à une branche morte : elle casse au premier coup et l'animal part avec le fil au cou, ce qui est la pire fin pour la bête et la fin de la ligne pour le trappeur. À un tronc vivant de la grosseur du poignet, ou à un piquet enfoncé jusqu'au dur. » | « Ne jamais attacher le collet à une branche morte : elle casse au premier coup, et le lièvre part avec le fil au cou. L'attacher à un tronc vivant gros comme le poignet, ou à un piquet enfoncé jusqu'au dur. » |
| 57, l. 369 à 370 | « Et on pêche tôt : une prise faite au petit jour a une demi-journée d'avance sur la chaleur qui s'en vient, ce qui est un choix de conservation avant d'être un choix de pêche. » | « Pêcher tôt : un poisson pris au petit jour a une demi-journée d'avance sur la chaleur. » |
| 52, l. 64 à 65 | « Sa larve, enkystée dans la fibre, ne donne ni odeur, ni couleur, ni lésion : chaque ours se traite comme porteur. » | « La larve vit dans un petit kyste, dans le muscle. Elle ne donne ni odeur, ni couleur, ni marque à la viande : il faut traiter chaque ours comme s'il en avait. » |
| 48, l. 153 à 155 | « Sur un lièvre gelé, il faut le laisser dégeler assez pour que le poil se mouille — ce qui est une raison de plus de le préparer le jour même, avant qu'il ne gèle. » | « Si le lièvre est gelé, il faut le laisser dégeler assez pour que le poil se mouille. C'est une raison de plus pour le préparer le jour même, avant qu'il gèle. » |

## 4. Les passages qui marchent

Ce sont les modèles de la voix : on y voit les mains, les mots sont ceux du garage, et le lien entre deux idées se
dit (« parce que », « c'est », « ça »).

1. **Le rendu du gras** (52, l. 158 à 161) : « Le bouillonnement fin et continu, c'est l'eau qui s'en va ; quand il
   cesse et que la surface devient calme et claire, l'eau est partie. Les cretons tombent au fond et brunissent :
   c'est le signal d'arrêt. » Le repère se voit dans le chaudron, la tournure « X, c'est l'eau qui s'en va » est celle
   qu'on emploie en montrant du doigt, et le mot « cretons » est celui de la cuisine d'ici.
2. **Le fil à collet** (48, l. 328 à 329 et 335 à 337) : « Un fil à collet fait trois choses : il garde une boucle
   ouverte tout seul, il coulisse sans plier quand la bête entre dedans, et il encaisse le coup sec d'un animal qui
   part d'un bond. » ; « Le câble de frein de vélo. Un toron d'acier fin, souple, déjà fait pour coulisser dans une
   gaine. Il n'y a rien de mieux, et il y en a sur tous les vélos qui traînent. » Trois verbes de geste, un objet que
   tout le monde a dans le cabanon, « qui traînent » : c'est le voisin qui parle.
3. **Dépouiller sans couteau** (48, l. 413 à 416) : « Pincer la peau au milieu du dos entre le pouce et l'index des
   deux mains, la soulever et l'ouvrir en tirant les deux prises en sens contraire. Agrandir le trou en travers
   jusqu'à faire un anneau complet autour de l'animal. Tirer ensuite les deux moitiés en sens opposé, comme deux
   manches qu'on retourne : la peau sort en deux morceaux, l'arrière avec les pattes, l'avant avec la tête. » Un geste
   par infinitif, dans l'ordre, et une comparaison prise dans la vie de tous les jours (la manche qu'on retourne),
   qui fait voir le geste au lieu de l'orner.
4. **La ligne à main** (57, l. 264 à 268) : « Une planchette fendue en V aux deux bouts, le fil enroulé en huit
   autour des deux fentes. Ça se lance en faisant tourner le leurre au bout d'un bras de fil, et ça se ramène à la
   main, le fil retombant en boucles lâches aux pieds. Le fil se pince entre le pouce et l'index, jamais enroulé
   autour d'un doigt : un touladi qui plonge referme la boucle sur la phalange et ne la rouvre pas. » « Ça se lance »,
   « ça se ramène » : le pronominal de l'oral, celui qui marche. Et l'avertissement est un fait qu'on voit arriver,
   pas une formule (seul « phalange » est de trop : « le doigt »).
5. **Vider par les ouïes** (57, l. 413 à 416) : « Deux doigts crochés sous l'arc branchial d'un côté, le pouce de
   l'autre : on pince l'ensemble des branchies et on tire d'un coup ferme vers l'arrière et vers le bas. Les branchies
   viennent avec l'œsophage, et les viscères suivent d'un bloc parce qu'ils y sont attachés. » « On pince », « on
   tire », « d'un coup ferme », et le pourquoi dit avec « parce que », au lieu d'un deux-points.

## 5. Ce que ce regard apprend pour les règles

- **La citation de source est le premier défaut de voix du tome 3**, avant les mots : elle apporte le « vous », le
  « afin de », le « le cas échéant » et la double phrase (le fait, puis sa preuve). La règle existe (cadre, l. 21) ;
  il lui faut un repère dans `controle.py` (guillemets français de plus de huit mots, ou contenant « vous », « votre »,
  un impératif en -ez) pour que la passe du tome 3 ne la rate pas.
- **La regex des choses qui pensent est trop étroite.** Elle devrait accepter un sujet sans article ou un pronom
  (« il », « elle », « celle-là ») et ajouter « décide », « cherche », « travaille », « tranche », « paie », « pousse »,
  « se contente », « se retourne ». Les faux positifs (« Le poisson demande plus de manipulation ») se jugent.
- **La regex des maximes ne voit ni « X, pas Y », ni la tautologie (« une ligne trop longue est une ligne trop
  longue »), ni « point. » en fin de phrase, ni « Ce qu'on perd, honnêtement ».** Le critère à donner à l'éditeur :
  une opposition reste si un lecteur aurait fait l'erreur ; elle sort si personne ne l'aurait faite.
- **La mise en relief « c'est X qui » n'est pas toujours de l'écrit.** Le skill la range dans « ce qui sort »
  (« C'est la cendre qui tient le mieux »). Or « Le bouillonnement fin et continu, c'est l'eau qui s'en va » est la
  phrase la plus parlée du lot. Ce qui sonne livre, c'est le relief qui résume ou qui solennise (« C'est la pièce qui
  sépare un collet qui tient d'un collet qu'on retrouve ouvert avec du poil dedans ») ; celui qui montre une chose du
  doigt est la voix qu'on cherche. La règle gagnerait à le dire.
- **Le pronominal oral et le pronominal de manuel.** « Ça se lance », « ça se ramène » marchent ; « la bête se laisse
  où elle est tombée », « un ours touché ne se suit jamais vite » ne marchent pas. La différence : avec « ça » et un
  geste qu'on montre, c'est l'oral ; avec un nom et une consigne, c'est le manuel. Au ch. 52, 48 « se » contre 17 « on ».
- **La liste « Mots de livre » doit grandir par familles**, pas mot par mot : le vocabulaire médical (léthargique,
  cutané, inhalation, hypertrophie, endémique, vecteur), les mots de rapport (consommer, manipulation, filière,
  salubrité, enceinte, hors cible, constituer), les adverbes d'essai (par construction, intégralement, désespérément,
  systématiquement, spontanément, honnêtement, vis-à-vis), le « ne » explétif.
- **Les tableaux ont une voix à eux.** La colonne « Diagnostic » appelle l'étiquette de laboratoire. Si le gabarit
  garde cette colonne, sa consigne doit dire : une courte phrase avec un verbe (« Le poisson pourrit »).

## 6. Hors regard, signalé en passant

- Langue (au correcteur) : 52, l. 265, « ou la cuisson au four à micro-ondes de n'exterminent pas » (un « de » de
  trop dans la citation) ; 57, l. 119, « Un poisson dont on hésite » (« sur lequel on hésite ») ; 52, l. 239, « de
  une à trois semaines » (« d'une à trois semaines »).
- `CLAUDE.md`, aucun service : « laboratoire », « signalement », « consulter », « Sortir », « Suivi médical »,
  « dire au médecin » (48, l. 176, 221, 247, 254, 269 ; 52, l. 232 à 241) ; aucun âge des enfants de JP : « enfants de 4 et
  6 ans » (48, l. 37, 211, 317 ; 57, l. 100) ; « village » (48, l. 8, 194).
- Structure : les trois chapitres ont encore neuf sections, une section Danger et « Comment ça marche » ; les sections
  2 gardent les listes « Quand ce n'est pas le bon choix ».
- Faits qui changent selon l'endroit (pour le vérificateur) : le gras « la moitié de la valeur de la bête » (52, l. 393
  et 458) contre « à moitié perdu » (l. 306) et « aux trois quarts » (l. 448).

## 7. Liste de contrôle (cadre, parties « Pour tout agent », « Le texte » et « La langue »)

Voir le rapport rendu à l'orchestrateur : chaque ligne qui touche l'écriture et la langue y est cochée, avec ce que
le lot en montre.
