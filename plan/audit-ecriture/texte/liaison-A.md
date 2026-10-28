# Audit de l'écriture : les liens entre les phrases, lot A (tome 1 refait)

28 octobre 2026. Un seul regard : **les liens entre les phrases**, la logique dite ou sous-entendue. À chaque point, le
lecteur sait-il si la phrase suivante est la cause de la précédente, sa conséquence, sa condition, une exception ou un
exemple ? Lot : `chapitres/01-les-quatre-horloges.md`, `chapitres/03-panne-majeure-d-hydro-en.md`,
`dangers/partie-1.md`, `dangers/partie-2.md`, lus au complet. Aucun fichier du livre n'a été modifié. Les réécritures
sont des exemples : aucun fait ni chiffre neuf, seulement les mots qui disent le lien et l'ordre des morceaux.

Point de départ : JP, sur le paragraphe du monoxyde (`dangers/partie-1.md`, ligne 3) : « le tempo du paragraphe est
pas bon, pi c'est vrai dans tout le livre ». Une bonne part de ce qu'il entend comme un mauvais tempo, c'est un texte
où les phrases ne se tiennent pas entre elles : chaque phrase s'arrête net, et la suivante repart de zéro.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | « : » % | fait:csq % | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 1 | 1337 | 77 | 17,4 | 33,8 | 27,3 | 3,7 | 5,3 |
| ch. 3 | 7757 | 370 | 21,0 | 37,6 | 30,0 | 5,8 | 5,7 |
| dangers, partie 1 | 4305 | 261 | 16,5 | 22,6 | 19,2 | 4,2 | 3,5 |
| dangers, partie 2 | 4101 | 237 | 17,3 | 18,1 | 16,0 | 5,9 | 6,4 |
| **le lot** | 17500 | 945 | 18,5 | 28,3 | 23,3 | 5,3 | 5,2 |

### Les mots de liaison, un par un (`tempo.py --json`, nombres réels dans le lot)

| mot | ch. 1 | ch. 3 | dangers 1 | dangers 2 | lot, pour 1000 mots | les 7 références, pour 1000 mots |
| --- | --- | --- | --- | --- | --- | --- |
| parce que | 1 | 4 | 1 | 0 | 0,34 | 0,35 |
| car | 0 | 0 | 0 | 0 | 0 | 1,50 |
| donc | 0 | 3 | 0 | 2 | 0,29 | 0,64 |
| alors | 1 | 5 | 1 | 1 | 0,46 | 0,69 |
| mais | 0 | 5 | 2 | 3 | 0,57 | 3,76 |
| sinon | 0 | 1 | 3 | 2 | 0,34 | 0 |
| c'est (dont « c'est pour ça ») | 0 | 4 | 4 | 1 | 0,51 | 1,73 |
| phrases « fait : conséquence » | | | | | 23,3 % des phrases | 3,1 % des phrases |

Les références sont les sept textes de `plan/audit-ecriture/references/`. Les deux textes techniques les plus proches du
livre disent le lien en mots : Ripley 1946 (« car » 0,77, « mais » 1,16 pour 1000 mots, 1 % de phrases en
« fait : conséquence ») et le guide de survie de Wikilivres (« car » 2,22, « donc » 2,22, « mais » 2,22). **Dans tout
le lot, il y a 6 « parce que », 5 « donc », 0 « car » et 10 « mais » pour 17 500 mots. La relation passe par le
deux-points.**

### Ce que fait le deux-points (relevé à la main, pages des dangers)

Les 101 phrases à deux-points des deux pages des dangers, classées selon le mot qu'on dirait à voix haute à sa place :

| Le deux-points tient lieu de | Phrases | Exemple |
| --- | --- | --- |
| « parce que », « car » (la cause vient après) | environ 40 | « jamais à l'eau : l'essence flotte » |
| « donc », « alors », « c'est pour ça que » (la conséquence vient après) | environ 27 | « Il prend la place de l'oxygène dans le sang : on s'endort » |
| une liste, une définition, un détail (l'emploi normal) | environ 15 | « sauf dans trois cas : la femelle… » |
| « par exemple », ou une explication du comment | environ 10 | « un quartier d'orignal pèse autour de 95 kg » |
| « plutôt », « à la place » (une consigne qui remplace l'autre) | environ 8 | « ne jamais faire le mort : se battre » |
| « mais » (un contraste) | 3 | « gris comme du bois ordinaire : on le reconnaît » |

Deux fois sur trois, le deux-points remplace un mot de cause ou de conséquence, et **les deux sens se mélangent sur la
même page** : à la ligne 3 de la partie 1, ce qui suit le deux-points est la conséquence ; à la ligne 93, c'est la
cause. Le lecteur doit trancher lui-même à chaque fois.

### Les paragraphes « Ce qui arrive »

Sur les 36 paragraphes « Ce qui arrive » des deux pages des dangers, **18 n'ont aucun mot de liaison parlé** (parce
que, car, donc, alors, comme, puis, ensuite, mais, sinon, pour que, sauf, au lieu de, même si). Celui du monoxyde n'en
a qu'un, « au lieu de ».

### Le participe qui cache un « si »

12 phrases du lot mettent une condition dans un participe ou un adjectif détaché, presque toujours juste après un
deux-points (« : porté dehors, il », « : gelée, elle », « : coupée, elle », « : écrasée, elle », « : jetée au pied du
mur, elle », « : pris dans la neige, il »). Le deux-points cache le « parce que », le participe cache le « si » : deux
liens à deviner dans la même phrase.

## 2. Le paragraphe du monoxyde, lu pour ses liens

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus quand
> on ferme presque l'entrée d'air pour la nuit. Le gaz ne se voit pas et ne se sent pas. Il prend la place de l'oxygène
> dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans toute la pièce, jusqu'au
> plancher : se coucher par terre ne protège pas.

| Passage | Le lien que le lecteur doit deviner |
| --- | --- |
| phrase 1 → phrase 2 | Aucun mot. La phrase 2 ne dit pas à quoi sert le fait qu'on ne voit pas le gaz : rien ne prévient. |
| phrase 2 → phrase 3 | Aucun mot. Or « on s'endort au lieu de sortir » découle **des deux** phrases ensemble : on ne le voit pas, on ne le sent pas, **et** il endort. Le texte coupe en deux une seule cause. `CLAUDE.md` le dit d'une traite : « Le monoxyde de carbone n'a ni odeur ni couleur, tu t'endors au lieu de sortir ». |
| deux-points de la phrase 3 | Tient lieu de « alors » ou « c'est pour ça que ». |
| phrase 3 → phrase 4 | Aucun mot, et le sujet repart de zéro (« Il… »). |
| deux-points de la phrase 4 | Tient lieu de « donc ». Et le contraste qui donne son sens à la phrase n'est pas dit : pourquoi se coucher par terre ? Parce que c'est le geste devant la fumée d'un incendie (« sortir en restant bas », même page, ligne 78). Sans ce contraste, la phrase répond à une question que le lecteur ne s'est pas posée. |

Trois phrases sur quatre commencent par « Le » ou « Il », et chacune repart du gaz au lieu de reprendre ce que la
phrase d'avant vient d'apporter : quatre faits posés l'un à côté de l'autre.

Réécriture, mêmes faits :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus quand
> on ferme presque l'entrée d'air pour la nuit. On ne voit pas ce gaz, on ne le sent pas, et il prend la place de
> l'oxygène dans le sang. C'est pour ça qu'on s'endort sans s'en rendre compte, au lieu de sortir. Contrairement à la
> fumée d'un incendie, il se répand dans toute la pièce, jusqu'au plancher, alors se coucher par terre ne protège pas.

Le nombre de mots ne bouge presque pas ; ce qui change, ce sont « et », « C'est pour ça que », « Contrairement à »,
« alors ».

## 3. Les défauts, du plus grave au moins grave

### 3.1 Le deux-points à tout faire (gravité haute)

Le deux-points remplace « parce que », « donc », « alors », « c'est pour ça que ». Il ne dit pas dans quel sens va la
relation : le lecteur doit décider si ce qui suit explique ce qui précède ou en découle. À voix haute, il n'existe pas :
on dit le mot.

Fréquence : 23,3 % des phrases du lot sont en « fait : conséquence » (ch. 3 : 30,0 % ; ch. 1 : 27,3 %), contre 3,1 %
dans les références ; dans les pages des dangers, environ 67 des 101 deux-points tiennent lieu d'un mot de cause ou de
conséquence.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| dangers/partie-1.md, 93 | « Habiller tout le monde de laine, de coton épais ou de jean, avec des bottes de cuir : le synthétique fond. » | « Habiller tout le monde de laine, de coton épais ou de jean, avec des bottes de cuir, parce que le synthétique fond. » |
| dangers/partie-1.md, 32 | « On ne voit pas si un fil est sous tension : on fait toujours comme s'il l'était. » | « On ne peut pas voir si un fil est sous tension, alors on fait toujours comme s'il l'était. » |
| dangers/partie-2.md, 138 | « Le froid ralentit les bactéries sans les tuer : les heures passées entre 4 et 60 °C s'additionnent d'un dégel à l'autre. » | « Le froid ralentit les bactéries sans les tuer. C'est pour ça que les heures passées entre 4 et 60 °C s'additionnent d'un dégel à l'autre. » |
| chapitres/03, 70 | « Le poser à au moins 2 m du poêle et de tout appareil de cuisson : plus près, il sonne aux bouffées de l'allumage, et on finit par l'enlever. » | « Le poser à au moins 2 m du poêle et de tout appareil de cuisson, parce que, plus près, il sonne aux bouffées de l'allumage, et on finit par l'enlever. » |
| chapitres/01, 67 | « Seule la mesure faite dans la maison donne la dépense : elle dépend du volume chauffé et de l'isolation plus que de l'appareil (ch. 83). » | « Il faut faire cette mesure dans la maison, parce que la dépense dépend du volume chauffé et de l'isolation plus que de l'appareil (ch. 83). » |
| chapitres/01, 80 | « À la maison, ils s'épuisent vite : toute la ville est dans la même situation, avec des réserves prévues pour trois jours. Au chalet, ils durent plus longtemps, parce que le bois, l'eau et le gibier sont sur place. » (deux phrases parallèles : l'une dit « parce que », l'autre le cache) | « À la maison, ils s'épuisent vite, parce que toute la ville est dans la même situation, avec des réserves prévues pour trois jours. Au chalet, au contraire, ils durent plus longtemps, parce que le bois, l'eau et le gibier sont sur place. » |

Cause, dans nos règles :
- skill `ecriture`, règle 2 : « Le fait d'abord, la raison ensuite », avec pour modèle une phrase en deux-points
  (« Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant. ») ; la règle a appris la forme ;
- le tiret : `CLAUDE.md` (« Pas de tiret […] : virgule, deux-points, parenthèses ou point ») et la section « Le tiret »
  du skill `ecriture` donnent le deux-points comme remplaçant ; les 5 665 tirets enlevés sont en bonne partie devenus
  des deux-points ; le format des lignes de matériel (« **Thermomètre à sonde** : porte les 74 °C à cœur. ») fait le
  reste ;
- skill `ecriture`, tableau « Les mots » : « ainsi », « en effet », « d'ailleurs » sont dans les mots vides, sans que la
  règle donne les mots de liaison parlés à prendre à la place (donc, alors, parce que, c'est pour ça que, mais) ;
- skill `ecriture`, tableau « Ce qui sort » : « La justification collée au geste » et « La conséquence évidente d'un
  fait qu'on vient de dire » ; les mots qui annoncent une raison ou une conséquence sont associés à ce que JP coupe ;
- la limite de 150 à 230 mots par danger (`cadre-agents.md`, skill `editeur`) : le deux-points ne coûte aucun mot,
  « parce que » en coûte deux.

### 3.2 Les faits posés côte à côte (gravité haute)

Un paragraphe aligne des faits complets, chacun dans sa phrase, sans dire comment ils se tiennent : lequel explique
l'autre, lequel est le plus grave, lequel est un autre cas. Chaque phrase repart de son propre sujet (progression à
thème éclaté) au lieu de reprendre ce que la phrase précédente vient d'apporter. C'est le défaut que JP entend comme
un tempo haché.

Fréquence : 18 des 36 paragraphes « Ce qui arrive » sans aucun mot de liaison parlé ; le paragraphe du monoxyde
(section 2 ci-dessus) en est le cas type.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| dangers/partie-1.md, 3 | Le paragraphe du monoxyde (section 2) | Voir la section 2 |
| dangers/partie-1.md, 86 | « Beaucoup de morts sont des gens partis trop tard : la fumée cache la route, et le seul chemin peut être fermé avant que le feu arrive. Les braises allument plus de 90 % des maisons détruites : le vent les porte jusqu'à 2 km en avant du feu, même par-dessus un lac. La chaleur rayonnante tue avant les flammes : elle brûle la peau à 100 m et traverse les vitres. » | « Beaucoup de morts sont des gens partis trop tard, parce que la fumée cache la route et que le seul chemin peut être fermé avant que le feu arrive. Le vent porte les braises jusqu'à 2 km en avant du feu, même par-dessus un lac, et elles allument plus de 90 % des maisons détruites. Plus près, la chaleur rayonnante tue avant les flammes, parce qu'elle brûle la peau à 100 m et traverse les vitres. » |
| dangers/partie-1.md, 125 | « Le bois traité des vieilles terrasses, des clôtures et des modules de jeu, la plupart d'avant 2004, contient de l'arsenic : quand on le brûle, l'arsenic passe dans la fumée et dans la cendre. Souder, meuler ou chauffer du métal peint ou galvanisé donne la fièvre des fondeurs : des frissons, de la fièvre et des courbatures, qui passent en 24 à 48 h. Les fumées de cadmium donnent d'abord les mêmes signes, puis peuvent remplir les poumons d'eau jusqu'à 48 h plus tard : environ une personne sur cinq dont les poumons sont atteints en meurt. » | « Le bois traité des vieilles terrasses, des clôtures et des modules de jeu, la plupart d'avant 2004, contient de l'arsenic, et quand on le brûle, l'arsenic passe dans la fumée et dans la cendre. Souder, meuler ou chauffer du métal peint ou galvanisé rend malade aussi : c'est la fièvre des fondeurs, avec des frissons, de la fièvre et des courbatures qui passent en 24 à 48 h. Les fumées de cadmium donnent d'abord les mêmes signes, mais elles peuvent ensuite remplir les poumons d'eau jusqu'à 48 h plus tard, et environ une personne sur cinq dont les poumons sont atteints en meurt. » |
| dangers/partie-2.md, 202 | « Dans l'eau, les parasites des selles résistent au gel ; le chlore ne suffit pas contre eux, surtout dans l'eau froide. Les œufs de l'échinocoque, un ver, sortent avec les crottes du renard, du loup, du coyote et du chien nourri de gibier cru. Ils survivent jusqu'à un an dehors, et le congélateur ne les tue pas ; le lavage ne les enlève pas des petits fruits ni des légumes, et ils donnent une maladie du foie de 5 à 15 ans plus tard. » | « Dans l'eau, les parasites des selles résistent au gel, et même le chlore ne suffit pas contre eux, surtout dans l'eau froide. Sur les petits fruits et les légumes, il y a aussi l'échinocoque, un ver dont les œufs sortent avec les crottes du renard, du loup, du coyote et du chien nourri de gibier cru. Ces œufs survivent jusqu'à un an dehors, le congélateur ne les tue pas, et le lavage ne les enlève pas. Ils donnent une maladie du foie de 5 à 15 ans plus tard. » |

Cause, dans nos règles :
- skill `editeur`, tableau des demandes (ligne des pages des dangers) : « Ce qui arrive (le mécanisme, en deux ou trois
  phrases) », 150 à 230 mots ; la condensation a gardé les faits et jeté les liens ;
- `plan/demandes-jp-epreuve-tome-1.md`, demande 11 : après la condensation, « 65 faits perdus ou changés remis » par
  des agents ; un fait remis après coup entre comme une phrase autonome, sans rien qui le rattache à ses voisines ;
- skill `ecriture`, règle 1 : « Une phrase, une information. Deux faits, deux phrases. » ; la règle ne dit pas comment
  les deux phrases se tiennent ;
- la seule règle sur le lien est enfouie dans le tableau des corrections du skill `ecriture` (ligne du ch. 3,
  section 3 : « on passe d'un mécanisme à l'autre par un lien qui se lit (« ensuite », « de même », ou un nouvel
  alinéa) ») ; elle compte l'alinéa comme un lien, ce qu'il n'est pas.

### 3.3 Le pourquoi détaché, ou laissé à deviner (gravité haute)

La raison d'un geste est dans la phrase suivante, sans mot qui la rattache, ou dans un autre paragraphe ; ou bien le
texte donne un fait sans dire ce qu'il change à ce qu'on fait. Le lecteur doit faire le pont lui-même. Dans les pages
des dangers, le gabarit sépare le mécanisme (« Ce qui arrive ») du geste (« Ce qu'on fait ») : le geste perd son
« parce que » et le mécanisme perd son « donc ».

Fréquence : au moins un cas par danger dont « Ce qu'on fait » contient un geste sans raison dite à côté ; dans les
chapitres, une quinzaine d'étapes où la raison arrive dans la phrase d'après, sans lien.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| chapitres/01, 70 | « S'occuper d'abord de l'horloge qui finit le plus tôt, même si ce qu'elle protège vaut moins. Sous le stress, on a le réflexe de sauver le congélateur plein qu'on voit pendant que la maison refroidit. » | « S'occuper d'abord de l'horloge qui finit le plus tôt, même si ce qu'elle protège vaut moins. Sous le stress, on a plutôt le réflexe de sauver le congélateur plein qu'on voit pendant que la maison refroidit. » |
| chapitres/03, 48 | « Hydro-Québec ne répare pas ces pièces, et elle ne rebranche pas la maison tant qu'elles ne sont pas réparées. Dès qu'on voit le mât brisé, prévoir une longue panne : vidanger (étapes 21 à 25) et décider du départ (étape 11). » | « Hydro-Québec ne répare pas ces pièces, et elle ne rebranche pas la maison tant qu'elles ne sont pas réparées. Donc, dès qu'on voit le mât brisé, il faut prévoir une longue panne, vidanger (étapes 21 à 25) et décider du départ (étape 11). » |
| chapitres/03, 352 | « Clouer aussi la latte du bas (repère 6). Une couverture accrochée avec les bords ouverts réduit la perte de la fenêtre de 10 % au plus (repère 7), surtout parce que l'air de la pièce entre par le haut, se refroidit sur la vitre, descend et ressort par le bas, en boucle (repère 8). » | « Clouer aussi la latte du bas (repère 6), parce qu'une couverture accrochée avec les bords ouverts réduit la perte de la fenêtre de 10 % au plus (repère 7). Avec les bords ouverts, l'air de la pièce entre par le haut, se refroidit sur la vitre, descend et ressort par le bas, en boucle (repère 8). » |
| chapitres/03, 343 | « Une fenêtre à double vitrage perd dix fois plus de chaleur que la même surface de mur isolé. On la ferme avec une couverture tendue à environ 2,5 cm (1 po) de la vitre » | « Une fenêtre à double vitrage perd dix fois plus de chaleur que la même surface de mur isolé, alors on la ferme avec une couverture tendue à environ 2,5 cm (1 po) de la vitre » |
| dangers/partie-1.md, 5 | « Le bouton d'essai vérifie la pile et la sirène, pas la cellule qui détecte le gaz. » | « Le bouton d'essai vérifie la pile et la sirène, mais pas la cellule qui détecte le gaz, donc un avertisseur qui sonne au bouton peut quand même ne plus mesurer le monoxyde. » (la conséquence est au ch. 3, ligne 68 : « l'avertisseur peut répondre au bouton sans plus mesurer le gaz ») |
| dangers/partie-2.md, 221 | « Ne pas faire vomir. » (la raison est à la ligne 215, dans « Ce qui arrive ») | « Ne pas faire vomir, parce qu'un produit qui ronge (lessive, soude) brûle la gorge une deuxième fois, et qu'un liquide huileux (essence, naphte, huile à lampe) passe dans les poumons, où 2 mL suffisent à les brûler. » La phrase quitte « Ce qui arrive », qui ouvre alors sur « Les signes arrivent tard. » |

Cause, dans nos règles :
- skill `ecriture`, tableau « Ce qui sort », ligne « La justification collée au geste » (« Ne pas rester dans l'auto :
  la tôle n'arrête rien. » devient « Entrer dans un bâtiment. ») : la règle visait une raison inutile, et elle a appris
  à décoller la raison du geste ;
- skill `ecriture`, règle 2 : « la raison ensuite, et seulement si la raison change ce qu'on fait » ; la raison se met
  après, et le lien entre les deux n'est demandé nulle part ;
- le gabarit des pages des dangers (skill `editeur` ; `cadre-agents.md`, ligne des pages des dangers) : « ce qui
  arrive, comment on le reconnaît, ce qu'on fait » en trois blocs ;
- skill `ecriture`, « Un fait se dit une fois par chapitre » : la raison dite une fois ailleurs n'est pas reprise là où
  le geste en a besoin, même en trois mots.

### 3.4 L'exception, la limite ou la condition qui n'est pas marquée (gravité haute)

Deux consignes qui se suivent semblent se contredire, parce que le mot qui dit « sauf », « mais », « sinon »,
« d'abord… s'il grandit » manque. Pour un geste de sécurité, c'est le défaut le plus dangereux du lot : le lecteur qui
ouvre la page en urgence applique la première consigne qu'il lit.

Fréquence : 6 cas relevés dans le lot (les cinq ci-dessous et l'ordre des étapes de l'incendie).

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| dangers/partie-1.md, 9 | « Sortir tout le monde, sans chercher d'où vient le gaz. Pendant des retombées, trouver d'abord ce qui brûle et l'éteindre (ch. 4, étape 18). » | « Sortir tout le monde, sans chercher d'où vient le gaz. Mais pendant des retombées, il faut d'abord trouver ce qui brûle et l'éteindre (ch. 4, étape 18). » |
| dangers/partie-1.md, 82 (et 78) | Étape 5 : « Si le feu commence à peine, le couvrir ou l'éteindre à l'extincteur en balayant la base des flammes ; s'il grandit quand même, sortir. » L'étape 1 dit : « Réveiller tout le monde en criant, sortir en restant bas et fermer les portes derrière soi, sans jamais retourner à l'intérieur. » | Mettre la condition en tête : « 1. Si le feu commence à peine, le couvrir ou l'éteindre à l'extincteur en balayant la base des flammes. 2. S'il grandit quand même, réveiller tout le monde en criant, sortir en restant bas et fermer les portes derrière soi, sans jamais retourner à l'intérieur. » |
| chapitres/03, 285 | « Pour un médicament gardé au réfrigérateur, compter le temps à partir de l'heure écrite sur la porte, comme pour les aliments, et éviter de le prendre s'il n'a pas pu rester au froid. Pour l'insuline ou un médicament qu'on ne peut pas interrompre, s'en passer est aussi un danger (ch. 32). » | « …et éviter de le prendre s'il n'a pas pu rester au froid. Mais pour l'insuline ou un médicament qu'on ne peut pas interrompre, s'en passer est aussi un danger (ch. 32). » |
| chapitres/01, 57 | « Entre 18 et 24 °C, le risque est minimal pour une personne qui bouge peu. Il n'existe aucune température reconnue à partir de laquelle il faut partir : la famille en décide avec le ch. 2. » | « Entre 18 et 24 °C, le risque est minimal pour une personne qui bouge peu. Mais aucune température reconnue ne dit à partir de quand il faut partir, alors la famille en décide avec le ch. 2. » |
| dangers/partie-2.md, 9 (et 3) | Ligne 3 : « Il fait un détour pour frapper un chien, même en laisse. » Ligne 9 : « Au premier de ces signes, reculer par où on est venu, le chien en laisse. » Le lecteur vient de lire que la laisse ne protège pas le chien. | « Au premier de ces signes, reculer par où on est venu, en gardant quand même le chien en laisse. » La raison de la laisse n'est écrite nulle part : la chercher à la source avant de l'écrire ; sinon `[À VÉRIFIER]`. |

Cause : aucune règle ne nomme les mots qui marquent l'exception ou la limite (sauf, mais, sinon, seulement si). La
règle 3 du skill `ecriture` (« La condition avant le geste ») joue dans une phrase, pas entre deux étapes. « Ce qu'on
fait (trois à cinq gestes) » (skill `editeur`) donne des gestes numérotés et indépendants, condensés un à un. La
confrontation des consignes entre elles existe pour la série orange (`cadre-agents.md` : « chaque consigne de sécurité
confrontée aux autres dangers du scénario »), pas pour les pages des dangers.

### 3.5 Le contraste caché : le « mais », le « alors que », le « et même » qui manquent (gravité moyenne)

Deux faits s'opposent, et c'est l'opposition qui apprend quelque chose (ça a l'air normal, mais c'est dangereux ; les
premiers signes sont les mêmes, mais l'un tue). Le texte les colle avec un deux-points, un point-virgule ou la tournure
« X, pas Y ». « Mais » : 0,57 pour 1000 mots dans le lot, 3,76 dans les références, 1,16 à 2,22 dans les deux textes
techniques.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| dangers/partie-1.md, 127 | « Ce bois devient gris comme du bois ordinaire : on le reconnaît à l'âge de la structure et au vert pâle d'une coupe fraîche. » | « Ce bois devient gris comme du bois ordinaire, mais on le reconnaît à l'âge de la structure et au vert pâle d'une coupe fraîche. » |
| dangers/partie-2.md, 190 | « Le plomb n'a pas de goût ni d'odeur, et il ne donne aucun signe le lendemain : il fait baisser l'intelligence de l'enfant et monter un peu la pression de l'adulte. » | « Le plomb n'a pas de goût ni d'odeur, et il ne donne aucun signe le lendemain, mais il fait quand même baisser l'intelligence de l'enfant et monter un peu la pression de l'adulte. » |
| dangers/partie-2.md, 82 | « Le 71 °C qu'on voit souvent vaut pour le porc et le bœuf haché ; on ne mange jamais le gibier saignant. » | « Le 71 °C qu'on voit souvent vaut pour le porc et le bœuf haché, mais pas pour le gibier, qu'on cuit à 74 °C et qu'on ne mange jamais saignant. » (74 °C : tableau de la même page, ligne 86) |
| chapitres/01, 141 | « On peut aussi mettre la main sur son ventre, sous les vêtements : un ventre froid est un signe d'alarme, des mains froides non. » | « On peut aussi mettre la main sur son ventre, sous les vêtements : un ventre froid est un signe d'alarme, alors que des mains froides ne le sont pas. » |
| dangers/partie-2.md, 42 | « Le congélateur ne la tue pas, et la cuisson à 74 °C ({>cuisson}) protège la personne qui mange la viande, pas celle qui dépouille la bête. » | « Le congélateur ne la tue pas, et la cuisson à 74 °C ({>cuisson}) protège la personne qui mange la viande, mais pas celle qui dépouille la bête. » |

Cause : `CLAUDE.md` (« l'opposition fabriquée ») ; skill `ecriture`, tableau « Ce qui sort », ligne « L'opposition
fabriquée » ; `plan/decisions-jp.md` (« pas X, mais Y ») ; `cadre-agents.md` (« pas de « X ne fait pas Y : il fait
Z » »). La règle vise une opposition inventée pour faire de l'effet ; elle a été lue comme une méfiance envers « mais »,
même quand le contraste est vrai et que c'est lui qui protège.

### 3.6 Le chiffre ou l'exemple posé sans dire ce qu'il montre (gravité moyenne)

Après un deux-points, un chiffre ou un cas précis arrive à la place de la raison. Le lecteur ne sait pas si c'est la
raison, un exemple ou une preuve, ni ce qu'il doit en tirer. Au pire, une raison secondaire prend la place de la vraie.

Fréquence : une dizaine de deux-points des pages des dangers (relevé de la section 1).

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| dangers/partie-2.md, 171 | « Pour la vitamine C, prendre des aiguilles de sapin baumier ou d'épinette, jamais de cèdre : 100 g de cèdre frais en donnent 45 mg, et 100 g de sapin baumier, 270 mg. » (le deux-points fait de la vitamine C la raison du « jamais », alors que la raison est la thuyone, dite plus haut) | « Pour la vitamine C, prendre des aiguilles de sapin baumier ou d'épinette, jamais de cèdre. En plus d'être toxique, le cèdre en donne beaucoup moins : 45 mg pour 100 g de cèdre frais, contre 270 mg pour 100 g de sapin baumier. » |
| dangers/partie-1.md, 153 | « Une charge suspendue tombe sans prévenir quand ce qui la tient lâche : un quartier d'orignal pèse autour de 95 kg, et s'il tombe d'un mètre, il écrase une jambe. » | « Une charge suspendue tombe sans prévenir quand ce qui la tient lâche. Par exemple, un quartier d'orignal pèse autour de 95 kg, et s'il tombe d'un mètre, il écrase une jambe. » |
| dangers/partie-2.md, 113 | « Le foie de phoque, de morse et de lotte contient trop de vitamine A : 100 g de foie de phoque annelé en donnent environ 3 700 µg, pour une limite de 3 000 µg par jour chez l'adulte et de 600 µg de 1 à 3 ans. » | « Le foie de phoque, de morse et de lotte contient trop de vitamine A. Par exemple, 100 g de foie de phoque annelé en donnent environ 3 700 µg, plus que la limite de 3 000 µg par jour chez l'adulte, et la limite de 1 à 3 ans n'est que de 600 µg. » |
| dangers/partie-2.md, 75 | « Avant la saison, noter la date de la dernière dose de vaccin de chacun : cette dose protège 5 ans contre une piqûre ou une plaie souillée, et 10 ans contre une petite plaie propre. » | « Avant la saison, noter la date de la dernière dose de vaccin de chacun, pour savoir s'il est encore protégé quand il se blesse : cette dose protège 5 ans contre une piqûre ou une plaie souillée, et 10 ans contre une petite plaie propre. » |

Cause : skill `ecriture`, règle 2 (« la raison ensuite », toujours après un deux-points dans les exemples) appliquée à
des chiffres ; la règle de la statistique d'ambiance (`CLAUDE.md` : « un chiffre reste s'il change ce qu'on fait ») est
bien suivie, mais le texte ne dit pas ce que le chiffre change ; « par exemple » n'apparaît dans aucune règle.

### 3.7 La condition cachée dans un participe détaché (gravité moyenne)

« Porté dehors, il peut se renverser », « gelée, elle peut exploser », « coupée, elle vide le corps ». Le participe en
tête tient lieu de « si on le porte dehors », « si elle est gelée ». Après un deux-points, la phrase cache deux liens à
la fois. À voix haute, on dit « parce que si… ».

Fréquence : 12 dans le lot, presque tous juste après un deux-points (section 1).

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| dangers/partie-1.md, 66 | « Laisser le chaudron en place, couvercle fermé, jusqu'à ce qu'il soit froid : porté dehors, il peut se renverser sur les jambes, et le feu repart si on lève le couvercle trop tôt. » | « Laisser le chaudron en place, couvercle fermé, jusqu'à ce qu'il soit froid, parce que si on le porte dehors, il peut se renverser sur les jambes, et que le feu repart si on lève le couvercle trop tôt. » |
| dangers/partie-1.md, 147 | « Dégeler une batterie avant de la charger ou de la survolter : gelée, elle peut exploser et projeter de l'acide. » | « Dégeler une batterie avant de la charger ou de la survolter, parce qu'une batterie gelée peut exploser et projeter de l'acide. » |
| dangers/partie-1.md, 167 | « L'artère de la cuisse passe sous la peau, juste sous le pli de l'aine : coupée, elle vide le corps de son sang en quelques minutes, et le blessé ne peut pas appuyer lui-même assez fort. » | « L'artère de la cuisse passe sous la peau, juste sous le pli de l'aine. Si elle est coupée, elle vide le corps de son sang en quelques minutes, et le blessé ne peut pas appuyer lui-même assez fort. » |
| dangers/partie-2.md, 185 | « Ne pas manger l'amande des noyaux de cerises sauvages : écrasée, elle libère du cyanure. » | « Ne pas manger l'amande des noyaux de cerises sauvages, parce qu'elle libère du cyanure quand on l'écrase. » |
| chapitres/03, 445 | « Le vider à la chaudière au bout d'une corde, et jeter l'eau loin de la fondation, vers le bas de la pente : jetée au pied du mur, elle revient par le même chemin. » | « Le vider à la chaudière au bout d'une corde, et jeter l'eau loin de la fondation, vers le bas de la pente, parce que si on la jette au pied du mur, elle revient par le même chemin. » |
| chapitres/03, 152 | « Avant de démarrer le moteur, dégager le tuyau d'échappement à la pelle : pris dans la neige, il renvoie les gaz dans l'auto. » | « Avant de démarrer le moteur, dégager le tuyau d'échappement à la pelle, parce que s'il est pris dans la neige, il renvoie les gaz dans l'auto. » |

Cause : habitude de compression. Le skill `ecriture` interdit le « participe en chaîne » (règle 0) mais pas le participe
seul qui cache une condition ; la règle 10 (« Couper n'est pas compresser ») n'a pas d'outil ; `controle.py` ne relève
pas la suite « : participe, il ».

### 3.8 L'ordre de l'information : le nouveau avant le connu, la reprise qui ne dit pas ce qu'elle reprend (gravité basse)

Une phrase commence par une chose que le lecteur ne connaît pas encore, ou finit sur le détail qui aurait dû ouvrir ;
ou un mot de reprise (« de la même façon », « il ») renvoie à quelque chose qu'on ne retrouve pas du premier coup. Le
principe que suivent les bons textes techniques : chaque phrase part de ce qui est déjà dit et finit sur ce qu'elle
apporte (la progression du connu au nouveau).

Fréquence : une dizaine de cas dans le lot.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| dangers/partie-1.md, 11 | « Garder la personne intoxiquée au repos et au chaud : 3 à 5 h plus tard, la moitié du gaz est encore dans son sang, même si elle se sent mieux. » (« même si elle se sent mieux » tombe à la fin, loin du geste qu'il justifie) | « Garder la personne intoxiquée au repos et au chaud, même si elle se sent mieux, parce que 3 à 5 h plus tard, la moitié du gaz est encore dans son sang. » |
| dangers/partie-2.md, 113 | « Personne n'a mesuré le foie d'ours noir, et on le traite de la même façon. » (l'ours noir est déjà nommé dans la phrase du cadmium ; « de la même façon » ne dit pas que quoi) | « Personne n'a mesuré la vitamine A du foie d'ours noir, alors on le traite comme le foie de phoque. » |
| chapitres/03, 121 | « Avant la nuit, monter un abri dans la pièce (planche 03-09). La tente ou la table couverte garde la chaleur des corps dans un petit volume. » (« la tente ou la table » arrive avant que le texte dise que l'abri, c'est ça) | « Avant la nuit, monter un abri dans la pièce, autour d'une table couverte ou avec une tente (planche 03-09), parce qu'il garde la chaleur des corps dans un petit volume. » |
| chapitres/01, 14 | « Ce sont les quatre horloges : on s'occupe d'abord de celle qui finit le plus tôt, même si elle protège moins que les autres. » (la règle est collée à la définition comme si elle en découlait) | « Ce sont les quatre horloges. On s'occupe d'abord de celle qui finit le plus tôt, même si elle protège moins que les autres. » |

Cause : on écrit fait par fait, dans l'ordre où on les trouve à la source, au lieu de suivre le chemin du lecteur.
Aucune règle de nos fichiers ne parle de l'ordre du connu au nouveau ; la règle 6 du skill `ecriture` (« Le mot exact,
et toujours le même ») va dans le bon sens, sans viser la reprise.

## 4. Ce qui marche (modèles)

| Fichier, ligne | Le passage | Pourquoi il marche |
| --- | --- | --- |
| chapitres/01, 135 | « Les signes arrivent dans cet ordre. D'abord, la personne frissonne fort et parle bien. Ensuite, elle perd ses gestes fins avant sa force : elle n'arrive plus à attacher un bouton, à gratter une allumette ou à ouvrir une fermeture Éclair, alors qu'elle marche droit. » | L'ordre est annoncé, puis chaque phrase s'accroche à la précédente (« D'abord », « Ensuite », « Après viennent ») ; « alors qu'elle marche droit » dit le contraste qui piège. Lu à voix haute, ça se suit sans effort. |
| dangers/partie-1.md, 206 | « Une chute dans l'eau froide se passe en trois temps, qu'on retient par 1, 10, 1. Pendant la première minute, le choc fait prendre une grande inspiration, puis respirer très vite : si la tête est sous l'eau à ce moment, même un bon nageur peut se noyer. On a ensuite 10 minutes de mouvements utiles, avant que les bras, les jambes et les doigts perdent leur force ; on perd conscience au bout d'environ 1 heure. » | Le paragraphe a un fil (les trois temps), et chaque phrase en prend un ; « puis », « à ce moment », « ensuite », « avant que » font le lien. Le seul paragraphe « Ce qui arrive » du lot qui se lit comme une explication. |
| chapitres/03, 60 | « Sur l'aqueduc, la pression vient des pompes de la ville et tient tant qu'elles ont du courant, d'Hydro-Québec ou d'une génératrice ; rien n'annonce le moment où elle tombe. Quand elle tombe, la conduite peut aspirer l'eau du sol par ses joints et ses fuites, et l'eau peut devenir dangereuse à boire sans changer de couleur ni de goût. Il faut donc faire bouillir l'eau qui coule après la baisse de pression, au moins 1 minute ; l'eau tirée avant n'a pas besoin de bouillir (ch. 10). » | Chaque phrase reprend la fin de la précédente (« elle tombe. Quand elle tombe »), puis « donc » amène le geste, et la dernière proposition dit la limite. Mécanisme, conséquence, geste, limite : tout le chemin est dit. |
| chapitres/03, 464 | « La neige isole : une viande encore molle qu'on enterre dans un banc de neige ne gèle pas dur. Pour la faire geler, on la laisse à l'air, dans des bacs ouverts du côté nord, les morceaux séparés les uns des autres, par une nuit claire et venteuse. Une fois la viande gelée, on l'enterre dans la neige pour la garder gelée, et on plante une perche dans la cache : après une bordée, on ne retrouve plus le banc de neige ni ce qu'il contient (ch. 73). » | Le fait du début commande les gestes qui suivent, et « Pour la faire geler », « Une fois la viande gelée », « pour la garder gelée » relient chaque geste à son but et à son moment. |
| dangers/partie-2.md, 165 | « La teneur change d'un rameau à l'autre, et comme la dose se compte par kilo de poids, l'enfant qui boit la même tasse que l'adulte en reçoit plusieurs fois plus. » | « Comme » dit la cause avant la conséquence, dans l'ordre où on le dirait à un voisin. Même chose à la ligne 69 (tétanos) : « La bactérie pousse à l'abri de l'air, donc mieux dans une piqûre étroite qui se referme […] que dans une entaille qui saigne. » |

## 5. Ce que ces défauts demandent aux règles

Pour la réécriture du skill, sans fait neuf :

1. **Le deux-points a trois emplois : annoncer une liste, une définition ou un détail.** Une cause se dit « parce que »
   ou « car » ; une conséquence, « donc », « alors », « c'est pour ça que » ; un contraste, « mais », « alors que » ; un
   exemple, « par exemple » ; une exception, « sauf », « mais ». Le modèle de la règle 2 du skill `ecriture` se réécrit
   dans ce sens.
2. **Un paragraphe se lit comme une explication, pas comme une liste.** Chaque phrase part de ce que la précédente a
   apporté, ou d'un mot qui dit le lien. Test : relire le paragraphe en se demandant, à chaque point, « et alors ? »,
   « pourquoi ? », « sauf quand ? ». Si la réponse est dans la phrase suivante, le mot qui l'annonce doit y être.
3. **Le mot de liaison n'est pas du remplissage.** Il ne tombe pas sous « la conséquence évidente » ni sous « la
   justification collée au geste » : ces deux lignes visent une phrase qui n'apprend rien, pas le mot qui relie deux
   phrases utiles. Le tableau des mots vides donne en regard les mots de liaison parlés.
4. **Deux consignes qui semblent se contredire se relisent ensemble** dans les pages des dangers comme dans la série
   orange, et l'exception se marque.
5. **Le geste garde sa raison à côté de lui**, même quand le mécanisme est dit dans « Ce qui arrive » : un « parce
   que » de cinq mots, ou on déplace la phrase.
6. Mesure, pour suivre : `tempo.py` donne déjà le taux de « fait : conséquence » et les liaisons pour 1000 mots ; les
   références sont à 3,1 % et 9,2. Un outil pourrait relever en plus « : participe, il » et les paragraphes de trois
   phrases et plus sans aucun mot de liaison.

Deux garde-fous :
- **Un lien ne s'écrit pas s'il n'est pas sûr.** Au fond d'une fosse (`dangers/partie-1.md`, ligne 99), le texte passe
  de « un gaz plus lourd que l'air s'accumule » à « Quand l'oxygène tombe à 4 % » : écrire que ces gaz font tomber
  l'oxygène serait faux pour le sulfure d'hydrogène, qui est toxique par lui-même. Même chose pour la laisse du chien
  (section 3.4). Le lien se vérifie à la source, sinon `[À VÉRIFIER]`.
- **Les mots de liaison coûtent des mots.** Les réécritures ci-dessus ajoutent de 2 à 6 mots par phrase touchée ; huit
  dangers de la partie 1 dépassent déjà 230 mots. Le prix se paie en coupant un fait redit ailleurs, pas le lien.

## 6. Liste de contrôle (`cadre-agents.md`, parties « Pour tout agent » et « Le texte », lignes qui touchent l'écriture et la langue)

- [x] `CLAUDE.md` déjà chargé, il prime : appliqué aux réécritures.
- [x] Skill `ecriture` lu au complet, avec ses tableaux ; skill `editeur`, `gabarit-chapitre.md` et
  `plan/decisions-jp.md` lus par recherche, aux lignes qui touchent les liens.
- [x] Règle 1 : aucun chiffre ni fait neuf ; les liens qui demandent une source sont marqués (section 5).
- [x] Rien de commité ; seul ce fichier de notes est écrit.
- [x] Lire seulement ce que la tâche touche : les quatre fichiers du lot, les règles par recherche.
- [x] Règle 0 : chaque réécriture lue à voix haute.
- [x] Pas de loi en formule, pas de « d'où », pas de maxime, pas de chute, pas de chose qui pense.
- [x] Consigne jamais au pronominal ; infinitif dans les étapes.
- [x] Le mot qu'on dit (règle 15) : « c'est pour ça que », « alors », « par exemple » plutôt que « ainsi », « en
  effet ».
- [x] Aucun tiret (— ou –) dans ce fichier ni dans les réécritures.
- [ ] Pages des dangers, 150 à 230 mots : les réécritures ajoutent quelques mots ; à compenser à la passe (section 5).
- [x] Un passage signalé par JP se juge d'abord : le paragraphe du monoxyde doit exister (chaque phrase porte un fait
  dont les gestes se servent) ; il se relie, il ne se coupe pas.
- [ ] `controle.py` et `langue.py` sur les chapitres : sans objet pour un audit ; à passer sur toute réécriture qui
  entrera dans le livre.
