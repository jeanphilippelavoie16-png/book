# Audit de l'écriture : la densité, lot A (tome 1 refait)

28 octobre 2026. Un seul regard : la densité, trop compressé ou trop délayé. D'un côté le télégraphe (le lien
logique coupé, la phrase sans verbe, l'étiquette, le sous-entendu qui oblige à relire) ; de l'autre le remplissage
(la redite, la phrase qui parle du livre ou de la recherche). Lot lu au complet : `chapitres/01-les-quatre-horloges.md`,
`chapitres/03-panne-majeure-d-hydro-en.md`, `dangers/partie-1.md`, `dangers/partie-2.md`. Aucun fichier du livre n'a été
modifié. Les réécritures sont des exemples : aucun fait ni chiffre neuf ; quand une réécriture reprend un lien qui
était dans le texte avant la condensation des pages des dangers, elle le dit (commit `e8a62b2a`).

En une phrase : **le lot est trop compressé bien plus qu'il n'est délayé.** La condensation a gardé les faits et les
conclusions, et elle a coupé ce qui les reliait. Le délayage existe, mais il prend presque toujours la forme de la
redite d'un chiffre, pas du bavardage.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | ≤6 % | ≥30 % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 1 | 1337 | 77 | 17,4 | 18,2 | 11,7 | 33,8 | 27,3 | 8,2 | 18,7 | 3,7 |
| ch. 3 | 7757 | 370 | 21,0 | 10,8 | 21,6 | 37,6 | 30,0 | 3,4 | 17,5 | 5,8 |
| dangers, partie 1 | 4305 | 261 | 16,5 | 22,6 | 11,9 | 22,6 | 19,2 | 3,0 | 6,0 | 4,2 |
| dangers, partie 2 | 4101 | 237 | 17,3 | 24,5 | 14,8 | 18,1 | 16,0 | 7,1 | 6,3 | 5,9 |
| **le lot** | 17500 | 945 | 18,5 | 18,1 | 16,4 | 28,3 | 23,3 | 4,5 | 12,2 | 5,3 |

### Mesures ajoutées pour ce regard

Script de travail (dans le dossier de travail de la session, pas dans le dépôt) qui reprend le nettoyage de
`tempo.py` : tableaux, titres et pictogrammes enlevés. Comparaison avec les quatre textes techniques de
`plan/audit-ecriture/references/` (fiches de l'Alberta, Ripley 1946, Millet-Robinet, guide de survie de Wikilivres)
et avec les sept références.

| pour 1000 mots | ch. 1 | ch. 3 | dangers 1 | dangers 2 | **lot** | 4 réf. techniques | 7 réf. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Chiffres, hors renvois et hors tableaux | 25,5 | 13,1 | 12,3 | 27,6 | **17,3** | 10,5 | |
| Deux-points | 20,9 | 19,2 | 13,7 | 10,5 | **15,9** | 2,2 | 3,0 |
| Parenthèses | 18,7 | 17,5 | 6,0 | 6,3 | **12,2** | 4,5 | 2,4 |
| « mais » | 0,0 | 0,6 | 0,5 | 0,7 | **0,6** | 1,4 | 3,8 |
| « c'est » | 0,0 | 0,5 | 0,9 | 0,2 | **0,5** | 1,0 | 1,7 |
| « bien » | 0,7 | 0,4 | 0,5 | 0,5 | **0,5** | 1,1 | 2,5 |
| « tout, tous, toute » | 2,2 | 4,5 | 4,2 | 2,7 | **3,8** | 4,4 | 6,5 |
| « donc » / « parce que » | 0 / 0,7 | 0,4 / 0,4 | 0 / 0,2 | 0,5 / 0 | **0,3 / 0,3** | 0,9 / 0,2 | 0,6 / 0,3 |

La longueur des 36 dangers (mots du bloc, titre compris) : **30 sur 36 tombent entre 220 et 240 mots**, et sept dangers
de la partie 2 font 230 mots pile. Quatre dépassent : le monoxyde (293), l'ours (275), le froid (259), l'incendie (252).
Les paragraphes « Ce qui arrive » les plus chargés : les abats (138 mots, trois dangers différents et cinq chiffres),
le poison avalé (104 mots, six produits), le mal de caribou (99), la trichine (95), le métal et le bois qui empoisonnent
en brûlant (94, trois poisons).

Au ch. 3, **7 « Ce qu'on perd : »**, dont 4 suivis d'un nom seul (lignes 391, 413, 470, 558), et **8 phrases qui ne sont
qu'un renvoi** (« Le voisinage est au ch. 16. »). Au ch. 1 (162 lignes), la durée du frigo et du congélateur revient
**cinq fois** (lignes 13, 47, 63 à 65, 77, 95), et six autres faits deux fois chacun.

### Ce que les chiffres disent

- **Le lot porte beaucoup de faits pour peu de mots** : 17,3 chiffres pour 1000 mots hors tableaux et hors renvois,
  contre 10,5 dans les textes techniques de référence. La partie 2 des dangers (27,6) et le ch. 1 (25,5) en portent
  plus que Ripley, un manuel de défrichage plein de mesures (22,0).
- **Les liens sont passés dans la ponctuation.** Sept fois plus de deux-points que les textes techniques, presque trois
  fois plus de parenthèses, et deux fois moins de « mais » et de « c'est ». Le deux-points et la parenthèse tiennent
  lieu de « parce que », « donc », « mais », « c'est-à-dire » : la phrase est courte, et le lecteur doit refaire le lien
  lui-même.
- **La limite de 150 à 230 mots par danger est devenue une cible.** Les textes ont été serrés jusqu'au plafond, pas
  jusqu'à ce qu'ils se disent bien : 30 sur 36 sont collés au plafond, aucun n'est près du plancher de 150.

## 2. Le paragraphe du monoxyde, lu pour sa densité

`dangers/partie-1.md`, ligne 3 :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus
> quand on ferme presque l'entrée d'air pour la nuit. Le gaz ne se voit pas et ne se sent pas. Il prend la place de
> l'oxygène dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans toute la pièce,
> jusqu'au plancher : se coucher par terre ne protège pas.

Quatre phrases, sept faits, aucun mot qui relie une phrase à l'autre. Lue à voix haute, chaque phrase est une
conclusion :

1. La première phrase porte deux idées (la liste des sources, puis le cas du poêle la nuit), cousues par « , et ».
2. « Le gaz ne se voit pas et ne se sent pas. » Le fait est là, sa conséquence non : on ne dit pas que, pour cette
   raison, rien n'avertit. C'est pourtant ce qui fait le danger.
3. « Il prend la place de l'oxygène dans le sang : on s'endort… » Le deux-points saute du sang au sommeil. Le lecteur
   doit deviner pourquoi on s'endort au lieu de s'étouffer ou de tousser, c'est-à-dire pourquoi on ne se réveille pas
   pour sortir.
4. « se coucher par terre ne protège pas » répond à une question que le paragraphe n'a pas posée : pourquoi on
   voudrait se coucher par terre. Le réflexe vient de la fumée d'un incendie (on sort en restant bas, même page,
   ligne 78), et la phrase ne le nomme pas.

**Ce que la condensation a coupé.** Avant la condensation (commit `e8a62b2a`), le même passage disait : « Le sang
continue de circuler, mais il n'apporte plus d'oxygène aux organes. On ne suffoque pas et on ne tousse pas. On a mal à
la tête, on a sommeil, et on s'endort au lieu de sortir. » et « Le monoxyde a presque le poids de l'air […] : il se
mêle à tout l'air de la pièce. Dormir par terre ou sur la mezzanine ne protège pas. » La condensation a gardé les deux
conclusions (on s'endort, le plancher ne protège pas) et coupé les deux maillons qui les expliquaient (on ne suffoque
pas et on ne tousse pas ; le gaz a presque le poids de l'air). La vérification qui a suivi a compté les faits perdus
(« 65 faits perdus ou changés remis », `plan/demandes-jp-epreuve-tome-1.md`, ligne 19), pas les liens perdus.

**Réécriture, sans fait neuf :**

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font tous du monoxyde de carbone. Le poêle en fait plus
> quand on ferme presque l'entrée d'air pour la nuit. On ne voit pas ce gaz et on ne le sent pas, alors rien
> n'avertit. Il prend la place de l'oxygène dans le sang, et au lieu de se lever pour sortir, on s'endort sans s'en
> rendre compte. Il se répand dans toute la pièce, jusqu'au plancher : se coucher par terre, comme on le fait dans la
> fumée d'un incendie, ne protège donc pas.

Neuf mots de plus, les mêmes faits. Si le vérificateur garde la source de la version d'avant, « on ne tousse pas et on
ne suffoque pas » peut revenir à la place de « rien n'avertit » : c'est le maillon le plus fort.

## 3. Les motifs, du plus grave au moins grave

### Motif 1. Le maillon coupé : la conclusion reste, le raisonnement saute (haute)

La phrase donne le point de départ et le point d'arrivée, et le lien du milieu reste dans la tête du rédacteur. Le
lecteur relit pour reconstruire le « parce que » ou le « donc ». Le pire cas : le maillon coupé était **le fait qui
surprend**, celui que CLAUDE.md demande de garder (« un parent attentif conclut au caractère »).

Fréquence : 7 des 36 paragraphes « Ce qui arrive » (monoxyde, feu de forêt, froid, cuisson, mal de caribou, thuyone,
orignal), et une dizaine de gestes ou d'étapes dans le lot. Trois des sept sont des pertes vérifiables dans le commit
`e8a62b2a`.

| Où | Le texte | Réécriture |
| --- | --- | --- |
| `dangers/partie-1.md`, l. 193 | « Une personne qui arrête de frissonner est passée sous 28 °C, comme un enfant qui se plaignait du froid et devient tranquille : son cœur peut s'arrêter au moindre mouvement brusque. » | « Quand une personne arrête de frissonner, elle ne va pas mieux : elle est passée sous 28 °C, et son cœur peut s'arrêter au moindre mouvement brusque. C'est la même chose quand un enfant qui se plaignait du froid devient tranquille. » (« elle ne va pas mieux » est le texte d'avant la condensation : c'est le réflexe qu'il faut retourner, et il avait sauté.) |
| `dangers/partie-2.md`, l. 152 | « La viande d'orignal, de caribou, de lièvre et de truite a de 71 à 90 % de ses calories en protéines, celle d'ours, de castor et de corégone, de 50 à 69 % : mangée seule, aucune ne passe sous les 35 %. » | « Le gibier d'ici est très maigre. L'orignal, le caribou, le lièvre et la truite tirent de 71 à 90 % de leurs calories des protéines, et même l'ours, le castor et le corégone en tirent de 50 à 69 %. Mangée seule, aucune de ces viandes ne passe sous les 35 %. » (La phrase-thème « Le gibier du territoire est très maigre » et le « même » étaient dans la version d'avant.) |
| `dangers/partie-2.md`, l. 82 | « Le 71 °C qu'on voit souvent vaut pour le porc et le bœuf haché ; on ne mange jamais le gibier saignant. » | « Le 71 °C qu'on voit souvent vaut pour le porc et le bœuf haché, pas pour le gibier : lui doit atteindre 74 °C, et on ne le mange jamais saignant. » |
| `dangers/partie-2.md`, l. 49 | « Mouiller la fourrure. Porter des lunettes et un masque quand on scie ou qu'on secoue une peau. » | « Mouiller la fourrure pour que la poussière de poil ne lève pas, et porter des lunettes et un masque quand on scie la bête ou qu'on secoue une peau. » (La poussière de poil est à la ligne 42 ; le geste ne s'y rattache pas.) |
| `chapitres/01-les-quatre-horloges.md`, l. 80 | « À la maison, ils s'épuisent vite : toute la ville est dans la même situation, avec des réserves prévues pour trois jours. » | « À la maison, ils s'épuisent vite : chaque famille a des réserves pour trois jours, et comme toute la ville est dans la même situation, on ne trouve rien autour pour les refaire. » (La phrase suivante oppose le chalet, où tout est sur place ; c'est ce contraste qui manquait.) |
| `dangers/partie-1.md`, l. 3 | « Le gaz ne se voit pas et ne se sent pas. Il prend la place de l'oxygène dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. » | « On ne voit pas ce gaz et on ne le sent pas, alors rien n'avertit. Il prend la place de l'oxygène dans le sang, et au lieu de se lever pour sortir, on s'endort sans s'en rendre compte. » |

**La cause.** Trois règles qui tirent dans le même sens, plus une habitude de vérification :
- la limite des pages des dangers, « deux dangers par page au moins, 150 à 230 mots chacun »
  (`.claude/cadre-agents.md`, ligne 110 ; skill `editeur`, « 150 à 230 mots par danger »), appliquée à des textes de
  400 à 700 mots avec la consigne « Ce qui ne sort jamais : un fait, un chiffre, une mesure » (skill `ecriture`) : si
  aucun fait ne peut sortir, ce sont les liens qui sortent ;
- dans le skill `ecriture`, le tableau « Ce qui sort » : « La conséquence évidente d'un fait qu'on vient de dire » et
  « La justification collée au geste » (« Ne pas rester dans l'auto : la tôle n'arrête rien. » devient « Entrer dans
  un bâtiment. ») ; la règle ne dit pas où s'arrête l'évidence, et le rédacteur pressé coupe le lien qui n'était
  évident que pour lui ;
- la règle 2 du même skill, « la raison ensuite, et seulement si la raison change ce qu'on fait », qui fait couper la
  raison d'un fait de la section « Ce qui arrive », où il n'y a pas de geste ;
- l'habitude de vérifier une condensation en comptant les faits (« 65 faits perdus ou changés remis ») et jamais les
  liens.

### Motif 2. Le paragraphe-entrepôt : trois dangers ou cinq chiffres dans un paragraphe (haute)

Un paragraphe empile des faits de natures différentes, souvent chiffrés, sans phrase-thème et sans transition. Les
chiffres se suivent dans la même phrase, et la parenthèse sert à loger un fait de plus. À voix haute, on perd le fil
avant la fin de la phrase.

Fréquence : 8 paragraphes « Ce qui arrive » de plus de 80 mots portent deux dangers ou plus, ou trois chiffres ou plus
(abats, poison, mal de caribou, trichine, métal et bois qui empoisonnent, électrocution, arme, thuyone) ; au ch. 3,
les étapes 4, 5 et 27 font chacune plus de 100 mots sur quatre sujets.

| Où | Le texte | Réécriture |
| --- | --- | --- |
| `dangers/partie-2.md`, l. 113 | « Le foie de phoque, de morse et de lotte contient trop de vitamine A : 100 g de foie de phoque annelé en donnent environ 3 700 µg, pour une limite de 3 000 µg par jour chez l'adulte et de 600 µg de 1 à 3 ans. Personne n'a mesuré le foie d'ours noir, et on le traite de la même façon. » (dans un paragraphe de 138 mots qui porte aussi le cadmium et le prion) | Un alinéa par danger (le cadmium, le prion, la vitamine A), et pour le dernier : « Le foie de phoque, de morse et de lotte contient trop de vitamine A. Une portion de 100 g de foie de phoque annelé en donne environ 3 700 µg, alors qu'un adulte ne devrait pas dépasser 3 000 µg par jour, et un enfant de 1 à 3 ans, 600 µg. Le foie d'ours noir n'a jamais été mesuré : on le traite comme celui du phoque. » |
| `dangers/partie-1.md`, l. 125 | « Souder, meuler ou chauffer du métal peint ou galvanisé donne la fièvre des fondeurs : des frissons, de la fièvre et des courbatures, qui passent en 24 à 48 h. Les fumées de cadmium donnent d'abord les mêmes signes, puis peuvent remplir les poumons d'eau jusqu'à 48 h plus tard : environ une personne sur cinq dont les poumons sont atteints en meurt. » | « Quand on soude, qu'on meule ou qu'on chauffe du métal peint ou galvanisé, la fumée donne la fièvre des fondeurs : des frissons, de la fièvre et des courbatures, qui passent en 24 à 48 h. Les fumées de cadmium commencent de la même façon, mais elles peuvent ensuite remplir les poumons d'eau, jusqu'à 48 h plus tard. Environ une personne sur cinq dont les poumons sont atteints en meurt. » |
| `dangers/partie-2.md`, l. 215 | « L'antigel de moteur a un goût sucré ; la personne qui en boit a l'air ivre, puis ses reins lâchent. Le méthanol du lave-glace et de l'antigel peut rendre aveugle de 1 à 72 heures après (30 mL peuvent tuer un enfant). L'acétaminophène en trop ne donne qu'une nausée pendant que le foie s'abîme, et une pile bouton brûle l'œsophage en 2 heures, sans signe. » | « L'antigel de moteur a un goût sucré, et la personne qui en boit a l'air ivre avant que ses reins lâchent. Le méthanol du lave-glace et de l'antigel peut rendre aveugle de 1 à 72 heures après, et 30 mL peuvent tuer un enfant. L'acétaminophène pris en trop ne donne qu'une nausée, pendant que le foie s'abîme. Une pile bouton avalée brûle l'œsophage en 2 heures, sans aucun signe. » (Le fait qui tue un enfant ne reste pas entre parenthèses.) |
| `chapitres/03-panne-majeure-d-hydro-en.md`, l. 60 à 66 | Étape 4 en un bloc de 130 mots : « Sur l'aqueduc, la pression vient des pompes de la ville et tient tant qu'elles ont du courant, d'Hydro-Québec ou d'une génératrice ; rien n'annonce le moment où elle tombe. Quand elle tombe, […] Il faut donc faire bouillir l'eau qui coule après la baisse de pression, au moins 1 minute ; l'eau tirée avant n'a pas besoin de bouillir (ch. 10). Compter au moins 4 L par personne et par jour, dont 2 L à boire, pour au moins 3 jours. Le chauffe-eau est une réserve de plus (étape 23). Au chalet, la pompe du puits s'arrête avec le courant, et il reste quelques minutes de pression. » | En sous-étapes, comme l'étape 23 du même chapitre : « Sur l'aqueduc, la pression vient des pompes de la ville, et elle tient tant qu'elles ont du courant, d'Hydro-Québec ou d'une génératrice. Rien n'annonce le moment où elle tombe. » / « Quand elle tombe, la conduite peut aspirer l'eau du sol par ses joints et ses fuites, et l'eau peut devenir dangereuse à boire sans changer de couleur ni de goût. L'eau tirée avant n'a pas besoin de bouillir, mais celle qui coule après doit bouillir au moins 1 minute (ch. 10). » / « Compter au moins 4 L par personne et par jour, dont 2 L à boire, pour au moins 3 jours. Le chauffe-eau est une réserve de plus (étape 23). » / « Au chalet, la pompe du puits s'arrête avec le courant : il reste quelques minutes de pression. » |
| `dangers/partie-2.md`, l. 192 | « Le plomb vient aussi du vieil équipement d'érablière (soudé au plomb avant 1995, galvanisé d'avant 1994, raccords de laiton et de bronze), de la plomberie d'une vieille maison et de la soudure de récupération. » | « Le plomb vient aussi de la plomberie d'une vieille maison, de la soudure de récupération et du vieil équipement d'érablière : ce qui a été soudé au plomb avant 1995, le galvanisé d'avant 1994, et les raccords de laiton et de bronze. » (La liste longue va à la fin, après les deux sources courtes, au lieu de couper la phrase en deux.) |

**La cause.**
- `plan/decisions-jp.md`, règle 5 : « **Écrire dense.** Environ 700 mots utiles par page en 8 × 10. » La densité y est
  comptée en mots par page ; rien ne dit combien de faits une phrase peut porter.
- La condensation des dangers (`plan/demandes-jp-epreuve-tome-1.md`, ligne 19) : « Les 36 pages des dangers condensées
  par agents, vérifiées (65 faits perdus ou changés remis) ». Les 65 faits sont revenus dans un texte qui avait déjà été
  serré à 230 mots : ils sont entrés en parenthèses et en virgules.
- Le skill `editeur` demande « Ce qui arrive (le mécanisme, en deux ou trois phrases) » : trois phrases pour trois
  dangers (les abats) ou six produits (le poison), c'est un entrepôt.
- Une habitude : recopier la liste de la source au complet (toutes les dates, tous les métaux, tous les produits),
  par peur de perdre un fait.

### Motif 3. L'abstraction à la place du cas (moyenne)

Une règle générale, dite avec des mots abstraits (« ce qu'elle protège vaut moins », « d'une façon douteuse »,
« rien d'ordinaire »), là où le lecteur a besoin du cas. La compression se fait cette fois par le haut : on résume au
lieu de dire. Le cas le plus visible est dans la définition même des quatre horloges, que JP a déjà signalée (« on sait
même pas c'est quoi les 4 horloges »).

Fréquence : 6 relevés dans le lot, dont deux dans la définition de la notion du ch. 1.

| Où | Le texte | Réécriture |
| --- | --- | --- |
| `chapitres/01-les-quatre-horloges.md`, l. 70 | « S'occuper d'abord de l'horloge qui finit le plus tôt, même si ce qu'elle protège vaut moins. Sous le stress, on a le réflexe de sauver le congélateur plein qu'on voit pendant que la maison refroidit. » | « S'occuper d'abord de l'horloge qui finit le plus tôt. Sous le stress, on a le réflexe de sauver le congélateur plein, qu'on a sous les yeux, pendant que la maison refroidit : la chaleur de la pièce passe avant la viande. » (L'exemple contredisait la règle : la maison qui refroidit protège plus, pas moins, que le congélateur.) |
| `chapitres/01-les-quatre-horloges.md`, l. 14 | « Ce sont les quatre horloges : on s'occupe d'abord de celle qui finit le plus tôt, même si elle protège moins que les autres. » | « Ce sont les quatre horloges, et on s'occupe d'abord de celle qui finit le plus tôt (étape 3). » |
| `dangers/partie-2.md`, l. 231 | « Un signe qui ne ressemble à rien d'ordinaire ; une amélioration qu'on n'explique pas ; un enfant qui change de comportement. » | « On le reconnaît à ce qui sort de l'ordinaire : un signe qu'on n'a jamais vu, une personne qui va mieux sans qu'on sache pourquoi, un enfant qui ne se comporte plus comme d'habitude. » |
| `dangers/partie-2.md`, l. 131 | « Jeter sans le goûter un pot bombé, qui coule, qui siffle à l'ouverture ou qui a perdu son vide, et tout pot fait d'une façon douteuse. » | « …et tout pot dont on ne sait pas s'il a été fait comme il faut (ch. 78). » |
| `dangers/partie-1.md`, l. 105 | « Aérer avant d'entrer : ouvrir le haut et le bas, et faire circuler l'air. Dans un trou profond, ouvrir ne suffit souvent pas. » | « Aérer avant d'entrer : ouvrir le haut et le bas, et faire circuler l'air. Dans un trou profond, ouvrir ne suffit souvent pas : il faut faire circuler l'air jusqu'au fond. » (La phrase disait ce qui ne marche pas et s'arrêtait là.) |

Le modèle inverse est dans le même chapitre : l'étape 4 du ch. 1 (ligne 72) pose une règle abstraite, « Compter ce
qu'une horloge coûte aux autres », et la rend concrète dans la phrase suivante (« Faire tourner le congélateur à la
génératrice dépense le carburant de l'horloge 4 pour sauver l'horloge 3 »).

**La cause.** Une habitude de rédaction : le résumé qui coiffe le cas, puis le cas qu'on coupe pour faire court. Les
règles n'en parlent qu'à moitié : la règle 12 du skill `ecriture` interdit « la formule vague (« toujours dans les mêmes
moments ») », et la règle 14 demande d'expliquer une notion « en clair, dès sa première apparition », mais aucune ne
dit qu'une règle générale doit être suivie de son cas, ni qu'un exemple doit illustrer la règle qu'il suit.

### Motif 4. La redite délayée : le même chiffre cinq fois dans quatre pages (moyenne)

Le seul vrai délayage du lot. Un fait chiffré revient dans la section 1, le tableau des horloges, l'étape, les points de
contrôle et les signes d'échec ; un signe déjà décrit dans la page du danger revient dans chaque chapitre, parfois avec
un autre chiffre. Le lecteur relit une deuxième fois ce qu'il sait, et quand le chiffre change d'une fois à l'autre
(« 4 heures », puis « 4 à 6 h »), il ne sait plus lequel croire.

Fréquence : au ch. 1, la durée du frigo et du congélateur cinq fois (l. 13, 47, 63 à 65, 77, 95) ; « 18 à 24 °C »,
« multiplier l'écart », « dont 2 L à boire », « dernier moment où on sait que le courant marchait », « sous 32,2 °C, la
vie est en jeu » et « sortir tout le monde » deux fois chacun. Les signes du monoxyde quatre fois dans le lot (dangers
l. 5, ch. 1 l. 107, ch. 3 l. 147 et l. 330). L'avertisseur lent et le 4,4 °C, deux fois (dangers l. 5, ch. 3 l. 71 et
74).

| Où | Le texte | Réécriture |
| --- | --- | --- |
| `chapitres/01-les-quatre-horloges.md`, l. 13 | « le froid du frigo et du congélateur, en 4 heures pour le frigo et en 1 à 2 jours pour le congélateur » (le tableau, ligne 47, dit « Réfrigérateur 4 à 6 h, congélateur 24 à 48 h ») | « le froid du frigo et du congélateur, en heures ou en jours » : la section 1 donne l'échelle de chaque horloge, comme pour les trois autres, et le tableau donne les chiffres. |
| `chapitres/01-les-quatre-horloges.md`, l. 92 | « Repère : **18 à 24 °C**, risque minimal pour une personne qui bouge peu » ; « Multiplier l'écart par les heures qui restent jusqu'au matin (étape 2). Regrouper la famille pendant qu'il fait clair, et décider du départ avec le ch. 2 » (les deux sont à l'étape 2, l. 55 à 58) | Cible : « Entre **18 et 24 °C** ». Si hors cible : « Étape 2. » |
| `chapitres/01-les-quatre-horloges.md`, l. 90 et 106 | « Compter à partir du dernier moment où on sait que le courant marchait » (points de contrôle) ; « Compter les heures à partir du dernier moment où on sait que le courant marchait » (signes d'échec) | Une seule place : la ligne des signes d'échec (l. 106) garde la consigne ; la ligne 90 sort des points de contrôle, dont elle redit l'étape 1. |
| `chapitres/01-les-quatre-horloges.md`, l. 107 | « Deux personnes ou plus ont mal à la tête, la nausée ou des étourdissements dans la même pièce. Un jeune enfant devient fatigué ou de mauvais caractère. Dans les deux cas, ça passe dehors » (c'est le « Comment on le reconnaît » de la page du monoxyde, `dangers/partie-1.md`, l. 5) | « Plusieurs personnes ont en même temps les signes du monoxyde (page du danger) », et l'action telle quelle. |
| `chapitres/03-panne-majeure-d-hydro-en.md`, l. 74 | « Lire le chiffre affiché matin et soir, sans attendre la sirène : quand il y a peu de monoxyde, l'avertisseur peut ne pas sonner pendant des jours, alors que le mal de tête, la nausée et la fatigue qu'on met sur le compte du froid ont commencé. » (la page du danger dit « des heures, même des semaines ») | « Lire le chiffre affiché matin et soir, sans attendre la sirène : tout chiffre affiché veut dire qu'il y a du monoxyde, et si le chiffre ne redescend pas de la journée, un appareil de la maison en fait. » Le retard de la sirène reste à la page du danger, avec un seul chiffre. |

**La cause.**
- Le gabarit demande les chiffres à trois endroits : l'étape, puis les points de contrôle (« Tableau à structure fixe :
  moment, ce qu'on vérifie, cible chiffrée », `gabarit-chapitre.md`, ligne 70), puis les signes d'échec. La règle
  « aucune ligne qui redit une étape » (même fichier) n'est pas appliquée au ch. 1.
- La règle des rappels de sécurité (« Ils se répètent dans chaque chapitre concerné », CLAUDE.md) s'étend par habitude à
  tout ce qui touche la sécurité, alors que le cadre dit : « Le mécanisme général du danger n'est pas redit : il est dans
  la page du tome » (`.claude/cadre-agents.md`, ligne 48) et le skill `editeur` : « Ce que la page du danger dit déjà se
  renvoie (« page du danger ») ».
- Le ch. 1 a été réduit de moitié (demande n° 9) sans refaire l'inventaire des faits que demande le skill `ecriture`
  (« Faire l'inventaire des faits du chapitre ») : la section 1, ajoutée pour expliquer la notion (règle 14), a repris
  les chiffres du tableau.

### Motif 5. Le télégraphe des cases et des étiquettes (moyenne)

Un nom ou un participe tient lieu de phrase : dans les cases des tableaux qui ne sont pas des chiffres, et derrière
l'étiquette « Ce qu'on perd : ». À voix haute, on ne sait pas qui fait quoi (« Trié à la sonde » : qui trie ? est-ce
fait, ou à faire ?).

Fréquence : au ch. 1, 4 des 8 cases « Cible chiffrée » sont des étiquettes sans chiffre ni verbe (l. 90, 95, 96, 97) ;
au ch. 3, 4 des 7 « Ce qu'on perd : » sont suivis d'un nom seul (l. 391, 413, 470, 558).

| Où | Le texte | Réécriture |
| --- | --- | --- |
| `chapitres/01-les-quatre-horloges.md`, l. 95 | « Trié à la sonde » | « Chaque paquet a été trié à la sonde. » |
| `chapitres/01-les-quatre-horloges.md`, l. 97 | « Reprise avec les quatre horloges » | « On reprend la décision avec les quatre horloges. » |
| `chapitres/01-les-quatre-horloges.md`, l. 96 | « Moins que la réserve » | « La dépense de la semaine est plus petite que la réserve. » |
| `chapitres/03-panne-majeure-d-hydro-en.md`, l. 470 | « **Ce qu'on perd :** le froid constant du congélateur. Le froid du dehors varie avec la météo et ne tient pas à −18 °C » | « **Ce qu'on perd :** le froid du dehors varie avec la météo et ne tient pas à −18 °C comme celui du congélateur. » (L'étiquette suivie d'un nom redisait la phrase d'après.) |
| `dangers/partie-2.md`, l. 48 | « Mettre des gants imperméables avant de ramasser la bête ; sinon, des sacs de plastique serrés aux poignets. » | « Mettre des gants imperméables avant de ramasser la bête. Sans gants, mettre des sacs de plastique et les serrer aux poignets. » |

**La cause.**
- `gabarit-chapitre.md`, ligne 111 : « Nommer honnêtement ce qu'on perd en la choisissant » ; l'étiquette
  « **Ce qu'on perd :** » est devenue une formule à remplir par un nom.
- La colonne « cible chiffrée » du gabarit (ligne 70) appelle un chiffre ; quand il n'y en a pas, le rédacteur met une
  étiquette dans la case au lieu de changer la ligne.
- La règle 0 du skill `ecriture` interdit l'étiquette en raccourci « même dans un logigramme ou un tableau », mais la
  règle 13 tolère le titre court (« Un titre de situation n'est pas une étiquette en raccourci tant qu'il se comprend du
  premier coup ») ; la case de tableau passe entre les deux.

### Motif 6. La trace de la recherche et la statistique d'ambiance (basse)

Une phrase parle de l'état des connaissances (« la limite publiée », « dans une analyse », « un opérateur annonce »,
« aucune température reconnue ») au lieu de dire ce qu'on fait ; ou un pourcentage donne la gravité sans rien changer au
geste. C'est du délayage poli : le lecteur lit le carnet de recherche du rédacteur.

Fréquence : 6 relevés dans le lot.

| Où | Le texte | Réécriture |
| --- | --- | --- |
| `chapitres/01-les-quatre-horloges.md`, l. 58 | « Il n'existe aucune température reconnue à partir de laquelle il faut partir : la famille en décide avec le ch. 2. » | « Aucune température ne dit, à elle seule, quand partir : la famille en décide avec le ch. 2. » |
| `dangers/partie-2.md`, l. 165 | « La limite publiée est de 6 mg par jour pour un adulte, et il n'y en a aucune pour un enfant ; dans une analyse, un gramme de rameaux séchés en contenait 7,6 mg. » | « Un adulte ne devrait pas en prendre plus de 6 mg par jour, et pour un enfant, on n'a aucun chiffre. Et un seul gramme de rameaux séchés peut en contenir 7,6 mg, plus que la limite d'un adulte. » |
| `dangers/partie-2.md`, l. 69 | « Sa toxine empêche les muscles de se relâcher : la maladie tue de 10 à 80 % des personnes non vaccinées, et rien au chalet ne la traite. » | « Sa toxine empêche les muscles de se relâcher. La maladie tue souvent les personnes qui ne sont pas vaccinées, et rien au chalet ne la traite. » (Une fourchette de 10 à 80 % ne change rien au geste : c'est la statistique d'ambiance de CLAUDE.md. À confirmer par le vérificateur.) |
| `chapitres/03-panne-majeure-d-hydro-en.md`, l. 621 | « Sur de grosses batteries, une tour cellulaire tient de 16 à 24 h ; un opérateur annonce de 4 à 10 h pour ses tours, entre les batteries et les génératrices. » (l'étape 6, l. 93, dit « de 2 à 4 heures ») | La note garde l'événement d'Ottawa et renvoie à l'étape 6 ; la durée n'est dite qu'une fois, à l'étape 6, avec le chiffre que le vérificateur retient. |

**La cause.** La règle 1 de CLAUDE.md : « La provenance ne s'imprime pas : aucune attribution dans le texte (ni MAPAQ, ni
Santé Canada…) ». Elle interdit le nom de la source, pas la voix de la source : « publiée », « une analyse », « on a
mesuré », « reconnue » passent le contrôle. Pour la statistique, le skill `ecriture` dit bien « La statistique
d'ambiance […] *(rien)*, ou le chiffre s'il change le geste », mais il ne l'applique qu'aux chiffres de contexte (« En
2024, le courant a manqué 436 minutes ») et pas aux taux de mortalité, que le rédacteur prend pour des faits de
sécurité.

### Motif 7. Les petits mots qui portaient le sens, coupés comme des mots vides (basse)

« Même », « tous », « mais » ne sont pas du gras : ils disent la surprise, le « sans exception », le contraste. Le lot en
a deux fois moins que les textes techniques de référence (« mais » 0,6 contre 1,4 pour 1000 mots), et la condensation
en a coupé (le « même l'ours » du mal de caribou, motif 1).

| Où | Le texte | Réécriture |
| --- | --- | --- |
| `dangers/partie-1.md`, l. 3 | « Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus quand on ferme presque l'entrée d'air pour la nuit. » | « Le poêle, le barbecue, le réchaud, le fanal et les moteurs font tous du monoxyde de carbone. Le poêle en fait plus quand on ferme presque l'entrée d'air pour la nuit. » |
| `dangers/partie-2.md`, l. 30 | « Quand les signes arrivent, aucun traitement ne marche et la personne meurt ; avant, le vaccin empêche la maladie. » | « Une fois que les signes sont là, aucun traitement ne marche et la personne meurt. Mais avant, le vaccin empêche la maladie : c'est pour ça qu'on part le jour même (étape 2). » |
| `dangers/partie-1.md`, l. 86 | « La chaleur rayonnante tue avant les flammes : elle brûle la peau à 100 m et traverse les vitres. » | « La chaleur rayonnante tue avant même que les flammes arrivent : elle brûle la peau à 100 m de distance, et elle passe même à travers les vitres. » |

**La cause.** CLAUDE.md, « L'écriture » : « Saute : […] le complément qui décore, l'adjectif qui redit le nom,
« déjà », « encore », « tout ». » Le skill `ecriture`, tableau « Les mots » : « Les mots vides | déjà, encore, tout,
bien, vraiment, […] ainsi, d'ailleurs […] | à couper quand ils n'ajoutent rien ». La réserve « quand ils n'ajoutent
rien » ne survit pas à une passe de coupe rapide ; et la liste ne dit nulle part quels petits mots portent le lien (même,
tous, mais, donc, alors, c'est pour ça que).

### Motif 8. Le renvoi qui fait une phrase à lui seul (basse)

Une phrase entière pour dire où est autre chose : « Le voisinage est au ch. 16. » C'est une phrase qui parle du livre ;
elle ajoute un temps de lecture sans rien apprendre, et elle casse la fin d'un paragraphe qui finissait sur un fait.

Fréquence : 8 au ch. 3 (l. 117, 227, 244, 264, 389, 558, 564, 570) ;
1 au ch. 1 (l. 68).

| Où | Le texte | Réécriture |
| --- | --- | --- |
| `chapitres/03-panne-majeure-d-hydro-en.md`, l. 244 | « …et un réfrigérateur en panne monte à 6 ou 8 °C. Le poisson fumé est au ch. 77. » | « …et un réfrigérateur en panne monte à 6 ou 8 °C (ch. 77). » |
| `chapitres/03-panne-majeure-d-hydro-en.md`, l. 264 | « …la manger en premier, et pas en rôti. Le froid naturel est au ch. 73, le congélateur qui dégèle pour de bon au ch. 74. » | « …la manger en premier, et pas en rôti (ch. 73 ; si le congélateur dégèle pour de bon, ch. 74). » |
| `chapitres/03-panne-majeure-d-hydro-en.md`, l. 564 | « Dans une rue de maisons froides, il y a souvent un poêle, une génératrice ou un congélateur encore plein. Le voisinage est au ch. 16. » | « …un poêle, une génératrice ou un congélateur encore plein (ch. 16). » |
| `chapitres/03-panne-majeure-d-hydro-en.md`, l. 570 | « Quand les stations de la région sont en panne, c'est souvent la seule façon d'avoir des nouvelles. Pour rétablir les communications : ch. 14. » | « …c'est souvent la seule façon d'avoir des nouvelles (ch. 14). » |
| `chapitres/03-panne-majeure-d-hydro-en.md`, l. 558 | « **Ce qu'on perd :** une lumière sans flamme. Le suif et les chandelles sont au ch. 112. » | La ligne sort : l'avertissement de la ligne 556 dit déjà qu'on n'allume la lampe que dans la pièce du poêle et qu'on l'éteint avant de dormir. Le renvoi va dans la liste des graisses, ligne 547 : « …ou une bande de t-shirt roulée serrée (chandelles : ch. 112). » |

**La cause.** CLAUDE.md, « Le gabarit » : « Un geste, une planche ou une note qui appartient à un autre chapitre y va,
sans doublon ; ici, il reste un renvoi court (« ch. 3, étape 28 ») ». Quand le ch. 1 a été vidé vers le ch. 3 et le
ch. 3 vers les ch. 72 à 77 (demande n° 9), chaque passage parti a laissé une phrase « X est au ch. N » au lieu d'un
renvoi accroché à la phrase qui sert. Le skill `ecriture` sort pourtant « La phrase qui parle du livre, du chapitre, de
la page ».

## 4. Ce qui marche : des modèles

1. `dangers/partie-1.md`, l. 58 : « L'eau jetée sur un chaudron d'huile en feu coule au fond, se change en vapeur d'un
   coup et projette l'huile en feu au visage et au plafond. » Trois verbes dans l'ordre où les choses arrivent :
   le mécanisme est l'avertissement, sans deux-points ni parenthèse, et rien ne manque entre l'eau et le visage.
2. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 102 à 106 : « Si la fumée sort par la porte du poêle à l'allumage, la
   cheminée refoule : après quelques heures sans feu par grand froid, l'air de la cheminée est plus froid et plus lourd
   que celui de la maison, et il descend. Rouler une feuille de papier en torche, l'allumer et la tenir le plus haut
   possible dans le poêle, près de la sortie de fumée, jusqu'à ce que le tirage aspire la flamme ; allumer le petit
   bois seulement à ce moment-là. » Le signe, la cause avec tous ses maillons, le geste, et ce qu'on voit quand c'est
   fait. Dense en faits, et rien à reconstruire.
3. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 272 à 274 : « Du jus figé au fond du bac montre que des paquets ont
   décongelé. Le thermomètre qui mesure l'air du congélateur ne sert pas au tri : quand on ouvre, l'air se réchauffe
   bien avant le cœur d'une pièce épaisse, et quand on referme, il se refroidit avant elle. » Le fait qui surprend,
   puis son explication en deux moitiés qui se répondent ; pas un mot de trop, pas un lien de moins.
4. `chapitres/01-les-quatre-horloges.md`, l. 135 à 139 : « Les signes arrivent dans cet ordre. D'abord, la personne
   frissonne fort et parle bien. Ensuite, elle perd ses gestes fins avant sa force : elle n'arrive plus à attacher un
   bouton, à gratter une allumette ou à ouvrir une fermeture Éclair, alors qu'elle marche droit. » Une étape par phrase,
   les mots qui font l'ordre (« d'abord », « ensuite », « alors que », « après »), et des exemples concrets au lieu
   d'une catégorie (« les gestes fins »).
5. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 464 à 468 : « La neige isole : une viande encore molle qu'on enterre
   dans un banc de neige ne gèle pas dur. Pour la faire geler, on la laisse à l'air, dans des bacs ouverts du côté nord,
   les morceaux séparés les uns des autres, par une nuit claire et venteuse. Une fois la viande gelée, on l'enterre dans
   la neige pour la garder gelée… » Le réflexe retourné d'abord, puis la façon de faire, puis l'étape suivante ;
   « Pour la faire geler » et « Une fois la viande gelée » portent l'ordre sans qu'on ait à le deviner.

Ce que ces passages ont en commun : **un fait par proposition, et chaque proposition reliée à la précédente par un mot
qu'on dirait** (et, pour, une fois, d'abord, ensuite, alors que, quand). Leur densité en faits est aussi forte que celle
des passages fautifs ; ce qui change, c'est que les liens sont écrits.

## 5. Ce que la densité demande aux règles (pistes pour la réécriture du skill)

1. **Mesurer la densité en faits par phrase, pas en mots par page.** La règle 5 (« Écrire dense », « environ 700 mots
   utiles par page ») devient : une phrase porte un fait et son lien ; deux faits font deux phrases, reliées par un mot
   qu'on dit. Un paragraphe porte un sujet.
2. **Condenser coupe des faits, jamais des liens.** Pour les pages des dangers : un danger qui ne tient pas en 230 mots
   avec ses liens perd un fait (qui va au chapitre), pas un « parce que ». La limite est un plafond, pas une cible.
   La vérification d'une condensation compare au texte d'avant (git) et liste aussi les liens perdus : le « parce
   que », le « mais », la phrase-thème, et surtout le fait qui retourne un réflexe (« elle ne va pas mieux »).
3. **Dire où s'arrête l'évidence.** « La conséquence évidente » et « La justification collée au geste » restent, avec
   un contre-test : la raison reste quand, sans elle, le lecteur ferait l'inverse ou ne croirait pas la consigne.
4. **Une liste des petits mots qui portent le sens**, à côté de la liste des mots vides : même, tous, mais, donc,
   alors, parce que, c'est pour ça que, une fois que. On ne les coupe pas quand ils font le lien.
5. **Une règle générale est suivie de son cas** (le modèle de l'étape 4 du ch. 1), et l'exemple illustre la règle qu'il
   suit.
6. **Les cases de tableau** : la cible chiffrée est un chiffre ; toute autre case est une courte phrase avec son verbe.
   « Ce qu'on perd : » est suivi d'une phrase, jamais d'un nom seul.
7. **Un renvoi s'accroche à la phrase qui sert**, entre parenthèses ; jamais « X est au ch. N. » comme phrase.
8. **L'inventaire des faits se fait aussi entre le chapitre et la page du danger** : un chiffre a une place ; ailleurs,
   « page du danger » ou « étape N ». La section 1 donne l'échelle, le tableau donne les chiffres.
9. **Ce qui vient de la recherche reste dans `suivi/`** : ni « publiée », ni « une analyse », ni « reconnue », ni « un
   opérateur annonce » ; et un taux qui ne change pas le geste sort.
10. **Un auditeur « densité »** pour la chaîne, qui n'a pas écrit le texte : il compare une condensation à la version
    d'avant et liste les liens perdus ; il relève les phrases de trois chiffres et plus, les parenthèses qui contiennent
    une liste, les cases de tableau sans verbe, les « Ce qu'on perd : » suivis d'un nom, et les phrases qui ne sont
    qu'un renvoi. Un script peut compter les quatre derniers ; le premier se fait à la lecture, avec `git show`.

## 6. Signalé en passant (hors de ce regard, pour le vérificateur technique)

- La durée des tours cellulaires : « de 2 à 4 heures » (ch. 3, étape 6, l. 93), « de 16 à 24 h » et « de 4 à 10 h »
  (ch. 3, note En plus, l. 621).
- L'avertisseur qui tarde : « pendant des jours » (ch. 3, l. 75) et « des heures, même des semaines » (dangers, l. 5).
- Le frigo : « en 4 heures » (ch. 1, l. 13) et « 4 à 6 h » (ch. 1, l. 47 et 64 ; ch. 3, l. 237).
- Le mal de caribou, l. 159 : « le partager avant la viande » ne dit ni entre qui ni à quel moment ; le sens est à
  confirmer avant toute réécriture.
- L'orignal : « Il fait un détour pour frapper un chien, même en laisse » (l. 3), puis « reculer par où on est venu, le
  chien en laisse » (l. 9) : le lecteur se demande pourquoi garder la laisse ; la raison n'est pas dans la page.

## 7. Liste de contrôle (`.claude/cadre-agents.md`, lignes qui touchent l'écriture et la langue)

Pour tout agent
- [x] CLAUDE.md prime : chargé, pas relu.
- [x] Le skill de ma partie lu au complet (`ecriture`, avec ses tableaux) ; `editeur` lu ; `gabarit-chapitre.md` et
  `plan/decisions-jp.md` lus par plages.
- [ ] `suivi/plan-de-match.md`, PAUSE du 15 octobre : pas lu, sans objet (audit, aucun chapitre modifié).
- [x] Règle 1 : aucun chiffre ni fait neuf dans les réécritures ; les liens repris de la version d'avant sont marqués
  (`e8a62b2a`).
- [x] Rien de commité.
- [x] Rapport en français, avec la liste cochée.
- [x] Un agent, un lot ; lecture limitée au lot et aux règles (grep et plages) ; aucune image ; sorties coupées.
- [x] Le rapport cite le texte seulement là où la tâche le demande (exemples exacts).

La phrase (appliquée aux réécritures et utilisée comme grille d'audit)
- [x] Règle 0 : chaque réécriture lue à voix haute ; verbe, sujet, articles.
- [x] Pas de loi en formule, pas de « d'où », pas de paraboles.
- [x] Pas de maxime, de chute, d'opposition fabriquée ni d'image poétique.
- [x] Pas de chose qui pense.
- [x] Aucune consigne au pronominal dans les réécritures.
- [x] Consigne dite comme une consigne ; sujet nommé ; ordre naturel.
- [x] Points de contrôle et signes d'échec : ch. 1 à 8 et 8 lignes, ch. 3 à 7 et 6 (conforme ; redites relevées au
  motif 4).
- [x] Pages des dangers, 150 à 230 mots : mesuré ; 30 sur 36 collés au plafond, 4 au-dessus (motif 2 et section 1).
- [x] Un passage signalé se juge d'abord (doit-il exister ?) : appliqué (motif 8, ligne 558 ; motif 6, statistique).
- [ ] Passe d'éditeur (/diagnostiquer, /polir) : sans objet, c'est un audit.
- [x] Le chapitre parle de son sujet : redites entre chapitres et pages des dangers relevées (motif 4).
- [x] Notion expliquée à sa première apparition : la définition des horloges est là, mais son abstraction est relevée
  (motif 3).
- [x] « Quand l'utiliser » en titres de situation : vu au ch. 1 et au ch. 3, conforme.
- [x] Qui fait quoi, quand et pourquoi ; une liste après deux-points d'une seule sorte (motif 2, plomb).
- [x] Le mot qu'on dit : réécritures en mots parlés, sans joual.
- [x] La chose nommée au lieu du possessif.
- [x] Mots de tous les jours, sans mot de métier inutile.
- [x] Aucun tiret (— ou –) dans les notes ni dans les réécritures ; jamais « § ».
- [x] Tournures relevées par JP (« X ne fait pas Y : il fait Z », « la couleur dit ») : aucune dans les réécritures.

La répétition
- [x] Inventaire des faits du ch. 1 fait pour ce regard (motif 4).
- [x] Un nom ne revient pas à chaque phrase dans les réécritures.

Avant de rendre
- [ ] `controle.py` sur un chapitre : sans objet, aucun chapitre modifié.

La langue
- [ ] Passage au correcteur (skill `langue`) : sans objet ici ; les réécritures sont des exemples et passeront par
  `langue` à la refonte.
- [x] Relu phrase par phrase : subjonctif et indicatif (« dont on ne sait pas s'il a été fait »), participes, a / à,
  ou / où.
- [x] Français correct, mots du Québec justes, ni joual ni anglicisme.
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures.
