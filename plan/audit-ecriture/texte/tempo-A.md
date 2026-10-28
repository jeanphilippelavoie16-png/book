# Audit de l'écriture : le tempo, lot A (tome 1 refait)

28 octobre 2026. Un seul regard : le tempo, le texte lu à voix haute comme on l'expliquerait à quelqu'un dans un
garage. Lot : `chapitres/01-les-quatre-horloges.md`, `chapitres/03-panne-majeure-d-hydro-en.md`,
`dangers/partie-1.md`, `dangers/partie-2.md`, lus au complet. Aucun fichier du livre n'a été modifié ; les réécritures
ci-dessous sont des exemples, sans fait ni chiffre neuf.

Point de départ : JP, sur le paragraphe du monoxyde (`dangers/partie-1.md`, ligne 3) : « le tempo du paragraphe est
pas bon, pi c'est vrai dans tout le livre ».

## 1. Les mesures

`python3 .claude/skills/ecriture/scripts/tempo.py … --par-fichier`, puis la même mesure sur les sept textes de
`plan/audit-ecriture/references/` (fiches de l'Alberta, Ripley 1946, guide de survie de Wikilivres, Hémon, Ringuet,
Beaugrand, Millet-Robinet).

| texte | mots | m/phr | var. | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 1 | 1337 | 17,4 | 0,65 | 11,7 | 30,3 | 33,8 | 27,3 | 8,2 | 18,7 | 3,7 |
| ch. 3 | 7757 | 21,0 | 0,57 | 21,6 | 23,6 | 37,6 | 30,0 | 3,4 | 17,5 | 5,8 |
| dangers, partie 1 | 4305 | 16,5 | 0,64 | 11,9 | 13,1 | 22,6 | 19,2 | 3,0 | 6,0 | 4,2 |
| dangers, partie 2 | 4101 | 17,3 | 0,66 | 14,8 | 19,5 | 18,1 | 16,0 | 7,1 | 6,3 | 5,9 |
| **le lot** | 17500 | 18,5 | 0,62 | 16,4 | 20,1 | 28,3 | 23,3 | 4,5 | 12,2 | 5,3 |
| fiches de l'Alberta | 2011 | 17,5 | 0,48 | 9,6 | 33,3 | 2,6 | 0,0 | 1,5 | 0,5 | 2,0 |
| Ripley 1946 | 2596 | 25,2 | 0,40 | 33,0 | 31,4 | 1,0 | 1,0 | 0,0 | 0,4 | 3,1 |
| **les sept références** | 17297 | 21,4 | 0,66 | 23,7 | 27,4 | 6,3 | 3,1 | 5,5 | 2,4 | 9,2 |

Mesures ajoutées pour cet audit (script de travail, phrases de plus de 3 mots, étiquettes « Ce qui arrive. » enlevées) :

| | ch. 1 | ch. 3 | dangers 1 | dangers 2 | lot |
| --- | --- | --- | --- | --- | --- |
| Paragraphes de 3 phrases et plus | 11 | 48 | 18 | 19 | 96 |
| … sans aucun lien parlé (parce que, donc, alors, puis, ensuite, mais, sinon, pour que, car, d'abord, après) | 7 | 26 | 12 | 8 | **53 (55 %)** |
| Paragraphes avec 2 phrases « fait : conséquence » ou plus | 4 | 19 | 7 | 5 | **35** |
| … dont 3 de suite | l. 135 | l. 54, 92, 445 | l. 86, 125 | | 6 |
| Phrases « , et » + nouveau sujet (sur une ligne) | 5 | 42 | 21 | 19 | **87** |
| Phrases de 40 mots et plus | 2 | 28 | 5 | 4 | 39 |
| Parenthèses de renvoi (ch., étape, planche, repère, section) | 21 | 123 | 2 | 2 | 148 |

### Ce que les chiffres disent

**La longueur des phrases n'est pas en cause.** Le lot fait 18,5 mots par phrase avec une variation de 0,62 ; les
références, 21,4 et 0,66. Il a moins de phrases longues qu'elles (16,4 % contre 23,7 %), et ses phrases voisines de
même longueur ne sont pas plus nombreuses (20,1 % contre 27,4 %). Ripley, qu'on lit sans peine, a 33 % de phrases de
30 mots et plus.

**Ce qui casse le tempo, c'est la forme de la phrase.** Quatre écarts, tous dans le même sens :

- le deux-points : 28 % des phrases du lot, 6 % des références (les fiches de l'Alberta, un texte de consignes comme le
  nôtre : 2,6 %) ;
- la phrase « fait : conséquence » : 23 % contre 3 % (Alberta : 0) ;
- les liens qu'on dit à voix haute : 5,3 pour 1000 mots contre 9,2 (Hémon : 14,7) ;
- les parenthèses : 12,2 pour 1000 mots contre 2,4.

Autrement dit, le livre relie ses faits par la ponctuation (deux-points, point-virgule, parenthèse, « , et ») au lieu
de les relier par des mots. À l'écrit, l'œil voit la ponctuation ; à voix haute, elle ne s'entend pas, et chaque phrase
repart de zéro.

## 2. Le paragraphe du monoxyde, lu à voix haute

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus quand
> on ferme presque l'entrée d'air pour la nuit. Le gaz ne se voit pas et ne se sent pas. Il prend la place de l'oxygène
> dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans toute la pièce, jusqu'au
> plancher : se coucher par terre ne protège pas.

Phrases de 31, 11, 19 et 16 mots ; deux en « fait : conséquence » ; aucun mot de liaison ; trois attaques sur quatre en
« Le » ou « Il ». Ce qui accroche, dans l'ordre de la lecture :

1. **La liste avant le verbe.** Cinq noms à retenir avant d'entendre ce qu'ils font (motif 4).
2. **L'ajout après la virgule.** La voix tombe sur « monoxyde de carbone », puis repart sur un second fait, d'une autre
   sorte (motif 3).
3. **Trois phrases, trois débuts à zéro.** « Le gaz… Il… Il… » : rien ne dit que l'invisibilité et l'oxygène volé
   *produisent* l'endormissement ; le deux-points le laisse deviner (motifs 1, 2 et 7).
4. **La phrase qui compte est au milieu**, coupée en deux par un deux-points. Le fait qui surprend (se coucher par terre
   ne protège pas) arrive juste après, sur le même moule, et le paragraphe s'arrête sans que la voix ait pu se poser
   sur l'un ou l'autre.

Le paragraphe est aussi une **mosaïque de corrections de mots** : trois de ses quatre phrases reprennent mot pour mot
la colonne « On le dit » du tableau de la règle 15 du skill `ecriture` (« le poêle en fait plus quand on ferme presque
l'entrée d'air », « le gaz ne se voit pas et ne se sent pas », « il se répand dans toute la pièce, jusqu'au plancher »).
Chaque phrase a été corrigée seule ; personne n'a relu le paragraphe d'un souffle.

Réécriture, mêmes faits :

> Le monoxyde de carbone vient du poêle, du barbecue, du réchaud, du fanal et des moteurs. Le poêle en fait plus quand
> on ferme presque l'entrée d'air pour la nuit. Ce gaz ne se voit pas et ne se sent pas. Il prend la place de
> l'oxygène dans le sang, alors on s'endort sans s'en rendre compte, au lieu de sortir. Comme il se répand dans toute
> la pièce, jusqu'au plancher, se coucher par terre ne protège pas.

Cinq phrases de 16, 14, 10, 20 et 17 mots (77 mots, comme l'original) ; aucun deux-points ; deux liens parlés
(« alors », « comme ») qui disent la cause et la conséquence ; la liste après le verbe ; la deuxième phrase reprend
le dernier mot de la première (« le poêle ») ; la phrase courte (« Ce gaz ne se voit pas et ne se sent pas. ») tombe
entre deux plus longues, et le paragraphe finit sur le fait qui retourne le réflexe.

## 3. Les motifs, du plus grave au moins grave

### Motif 1. Le moule « fait : conséquence », phrase après phrase (haute)

**Ce que l'oreille entend.** Le deux-points ne se dit pas : la voix s'arrête, puis repart sur une explication. Une fois
par paragraphe, il met un fait en relief. Phrase après phrase, il donne un débit en escalier (constat, arrêt, raison ;
constat, arrêt, raison) et il tait le lien : l'auditeur doit deviner si la deuxième moitié est une cause, une
conséquence, une condition, un exemple ou une consigne.

**Fréquence.** 23,3 % des phrases du lot (ch. 1 : 27,3 % ; ch. 3 : 30,0 % ; dangers 1 : 19,2 % ; dangers 2 : 16,0 %),
contre 3,1 % dans les références. 35 paragraphes en ont deux ou plus ; six en enchaînent trois de suite.

**Exemples.**

1. `dangers/partie-1.md`, l. 3 : « Il prend la place de l'oxygène dans le sang : on s'endort sans s'en rendre compte, au
   lieu de sortir. Il se répand dans toute la pièce, jusqu'au plancher : se coucher par terre ne protège pas. »
   → « Il prend la place de l'oxygène dans le sang, alors on s'endort sans s'en rendre compte, au lieu de sortir. Comme
   il se répand dans toute la pièce, jusqu'au plancher, se coucher par terre ne protège pas. »
2. `dangers/partie-1.md`, l. 86 (trois sur trois) : « Beaucoup de morts sont des gens partis trop tard : la fumée cache
   la route, et le seul chemin peut être fermé avant que le feu arrive. Les braises allument plus de 90 % des maisons
   détruites : le vent les porte jusqu'à 2 km en avant du feu, même par-dessus un lac. La chaleur rayonnante tue avant
   les flammes : elle brûle la peau à 100 m et traverse les vitres. »
   → « Beaucoup de morts sont des gens partis trop tard, parce que la fumée cache la route et que le seul chemin peut
   être fermé avant que le feu arrive. Le vent porte les braises jusqu'à 2 km en avant du feu, même par-dessus un lac,
   et elles allument plus de 90 % des maisons détruites. La chaleur rayonnante tue avant les flammes. Elle brûle la
   peau à 100 m et traverse les vitres. »
3. `chapitres/01-les-quatre-horloges.md`, l. 137 (cinq de suite) : « Ce test des gestes fins est le plus fiable sans
   thermomètre, et on le fait sans le lui dire : on lui tend une allumette et une boîte. Après viennent la parole et le
   jugement : une personne qui répond à côté, qui rit ou qui veut enlever son manteau est plus atteinte qu'une personne
   qui grelotte. On ne peut pas voir le moment où elle passe sous 35 °C : dans le doute, on la traite comme si elle
   était en hypothermie. On peut aussi mettre la main sur son ventre, sous les vêtements : un ventre froid est un signe
   d'alarme, des mains froides non. »
   → « Ce test des gestes fins est le plus fiable sans thermomètre. On le fait sans le lui dire, en lui tendant une
   allumette et une boîte. Après viennent la parole et le jugement. Une personne qui répond à côté, qui rit ou qui veut
   enlever son manteau est plus atteinte qu'une personne qui grelotte. Comme on ne peut pas voir le moment où elle passe
   sous 35 °C, on la traite, dans le doute, comme si elle était en hypothermie. On peut aussi mettre la main sur son
   ventre, sous les vêtements : un ventre froid est un signe d'alarme, des mains froides non. »
   (Le seul deux-points gardé oppose deux choses ; c'est son vrai travail.)
4. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 92 : « L'envoyer avant les autres gestes de cette série : après le
   début de la panne, les tours cellulaires tiennent souvent de 2 à 4 heures sur leurs batteries. Un message texte ou
   un courriel encombre moins le réseau qu'un appel : il peut passer quand les appels saturent le réseau, ou quand le
   service téléphonique est interrompu. »
   → « L'envoyer avant les autres gestes de cette série, parce qu'après le début de la panne, les tours cellulaires
   tiennent souvent de 2 à 4 heures sur leurs batteries. Un message texte ou un courriel encombre moins le réseau qu'un
   appel. Il peut donc passer quand les appels saturent le réseau, ou quand le service téléphonique est interrompu. »
5. `dangers/partie-1.md`, l. 125 : « Le bois traité des vieilles terrasses, des clôtures et des modules de jeu, la
   plupart d'avant 2004, contient de l'arsenic : quand on le brûle, l'arsenic passe dans la fumée et dans la cendre.
   […] Les fumées de cadmium donnent d'abord les mêmes signes, puis peuvent remplir les poumons d'eau jusqu'à 48 h
   plus tard : environ une personne sur cinq dont les poumons sont atteints en meurt. »
   → « Le bois traité […], la plupart d'avant 2004, contient de l'arsenic. Quand on le brûle, l'arsenic passe dans la
   fumée et dans la cendre. […] Les fumées de cadmium donnent d'abord les mêmes signes, puis peuvent remplir les
   poumons d'eau jusqu'à 48 h plus tard. Environ une personne sur cinq dont les poumons sont atteints en meurt. »
   (Le deux-points de « la fièvre des fondeurs : des frissons, de la fièvre et des courbatures » reste : il annonce une
   liste.)
6. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 445 : « On peut aussi siphonner l'eau avec un boyau d'arrosage, à
   vider complètement entre deux usages : il gèle dès qu'on arrête. Si la conduite de refoulement (le tuyau par où la
   pompe envoie l'eau dehors) est prise dans la glace, la pompe pousse dans un tuyau fermé et se détruit, même au retour
   du courant : tant que cette conduite est gelée, laisser la pompe débranchée et continuer à la chaudière. »
   → « On peut aussi siphonner l'eau avec un boyau d'arrosage, mais il faut le vider complètement entre deux usages,
   parce qu'il gèle dès qu'on arrête. Si la conduite de refoulement (le tuyau par où la pompe envoie l'eau dehors) est
   prise dans la glace, la pompe pousse dans un tuyau fermé et se détruit, même au retour du courant. Tant que cette
   conduite est gelée, laisser la pompe débranchée et continuer à la chaudière. »

**Cause.**

- Skill `ecriture`, règle 2 : « Le fait d'abord, la raison ensuite » ; son seul modèle est un deux-points :
  « Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant. » Les rédacteurs ont copié la
  forme, pas le principe.
- Skill `ecriture`, « Le tiret », et `CLAUDE.md` (« Pas de tiret […] : virgule, deux-points, parenthèses ou point ») :
  les 5 665 tirets du livre ont été remplacés selon cette liste, où le deux-points vient en deuxième, et le modèle
  qu'elle en donne est encore une phrase coupée en deux (« Une seule règle : la génératrice dehors. »).
- `CLAUDE.md` et le cadre : chaque étape orange « porte son geste, son pourquoi et le détail » ; règle 9 (« le
  mécanisme + ce qui arrive + quoi faire ») ; la ligne de Matériel « **Thermomètre à sonde** : porte les 74 °C à
  cœur ». Le pourquoi se colle au geste par le moyen le plus court.
- Aucune règle ne nomme les mots qui disent le lien à voix haute (parce que, donc, alors, si, quand, comme).

### Motif 2. Le paragraphe sans liant : des faits posés côte à côte (haute)

**Ce que l'oreille entend.** Chaque phrase est complète en elle-même et rien ne dit comment elle tient à la précédente :
cause, conséquence, contraste, ordre dans le temps, changement de sujet. Lu à voix haute, le paragraphe sonne comme une
liste lue sans puces, sur la même intonation ; l'auditeur doit refaire lui-même la logique. C'est le défaut que JP
appelait déjà le « paragraphe en paraboles » (ch. 3, 15 octobre), revenu sous une forme plus courte.

**Fréquence.** 53 des 96 paragraphes de trois phrases et plus (55 %) n'ont aucun lien parlé ; 5,3 liens pour
1000 mots dans le lot, contre 9,2 dans les références.

**Exemples.**

1. `dangers/partie-1.md`, l. 3 : le paragraphe du monoxyde au complet (section 2 de ces notes, avec sa réécriture).
2. `dangers/partie-1.md`, l. 5 : « Le mal de tête, la fatigue et la nausée font penser à une grippe. Un jeune enfant
   s'intoxique plus vite qu'un adulte, et il a seulement l'air fatigué ou de mauvaise humeur. Quand deux personnes ont
   mal à la tête en même temps dans la même pièce, ou quand le mal de tête passe dehors et revient en rentrant, on fait
   comme si c'était du monoxyde. S'il y en a peu dans l'air, l'avertisseur peut prendre des heures, même des semaines,
   avant de sonner, et il n'est pas fiable sous 4,4 °C. »
   → « Le mal de tête, la fatigue et la nausée font penser à une grippe. Un jeune enfant s'intoxique plus vite qu'un
   adulte, mais il a seulement l'air fatigué ou de mauvaise humeur. Alors, quand deux personnes ont mal à la tête en
   même temps dans la même pièce, ou quand le mal de tête passe dehors et revient en rentrant, on fait comme si c'était
   du monoxyde. L'avertisseur, lui, peut prendre des heures, même des semaines, avant de sonner s'il y en a peu dans
   l'air. Il n'est pas fiable sous 4,4 °C. »
3. `chapitres/01-les-quatre-horloges.md`, l. 54 : « L'hiver, prendre la température de la pièce chauffée chaque heure,
   et noter l'écart avec le relevé de l'heure d'avant. Multiplier cet écart par le nombre d'heures qui restent jusqu'au
   matin : on voit si la pièce restera assez chaude pour la nuit. Si elle doit devenir trop froide, regrouper la famille
   pendant qu'il fait clair. Entre 18 et 24 °C, le risque est minimal pour une personne qui bouge peu. Il n'existe
   aucune température reconnue à partir de laquelle il faut partir : la famille en décide avec le ch. 2. »
   → « L'hiver, prendre la température de la pièce chauffée chaque heure, et noter l'écart avec le relevé de l'heure
   d'avant. Multiplier ensuite cet écart par le nombre d'heures qui restent jusqu'au matin, pour voir si la pièce
   restera assez chaude pour la nuit. Entre 18 et 24 °C, le risque est minimal pour une personne qui bouge peu. Si la
   pièce doit devenir trop froide, regrouper la famille pendant qu'il fait clair. Mais il n'existe aucune température
   reconnue à partir de laquelle il faut partir : la famille en décide avec le ch. 2. »
   (Le repère de 18 à 24 °C passe avant la décision qu'il éclaire.)
4. `dangers/partie-1.md`, l. 30 : deux sujets dans un bloc, sans signal du changement. « Une génératrice renvoie son
   courant dans le réseau quand on la branche par une prise murale, par le panneau sans commutateur de transfert, ou
   avec un câble à deux fiches mâles. Ce courant peut électrocuter les équipes qui réparent la ligne, et les broches qui
   dépassent à l'autre bout du câble sont sous tension. Un fil tombé peut rester sous tension sans bruit ni étincelle,
   et le courant passe dans le sol autour : quand on marche à grands pas, il monte par une jambe et redescend par
   l'autre. »
   → « […] ou avec un câble à deux fiches mâles. Ce courant peut électrocuter les équipes qui réparent la ligne. Et avec
   le câble à deux fiches, les broches qui dépassent à l'autre bout sont sous tension. [alinéa] Un fil tombé, lui, peut
   rester sous tension sans bruit ni étincelle. Le courant passe alors dans le sol autour : quand on marche à grands
   pas, il monte par une jambe et redescend par l'autre. »
5. `dangers/partie-2.md`, l. 113 : trois dangers (cadmium, prion, vitamine A) en six phrases d'un seul bloc de
   141 mots. « Le foie et les reins des cervidés (orignal, caribou, cerf) et de l'ours noir accumulent du cadmium, que
   ni la cuisson, ni le sel, ni le trempage n'enlèvent : ce métal abîme les reins avec les années. Le cerveau, la moelle
   épinière et les ganglions des cervidés peuvent porter un prion […]. Le foie de phoque, de morse et de lotte contient
   trop de vitamine A : […]. Personne n'a mesuré le foie d'ours noir, et on le traite de la même façon. »
   → « Le foie et les reins des cervidés (orignal, caribou, cerf) et de l'ours noir accumulent du cadmium, que ni la
   cuisson, ni le sel, ni le trempage n'enlèvent. Avec les années, ce métal abîme les reins. [alinéa] Chez les
   cervidés, le cerveau, la moelle épinière et les ganglions peuvent aussi porter un prion […]. [alinéa] Le foie de
   phoque, de morse et de lotte, lui, contient trop de vitamine A : […]. Personne n'a mesuré le foie d'ours noir, alors
   on le traite de la même façon. »
   (L'alinéa coûte une ligne ou deux dans une demi-page ; à juger au montage.)

**Cause.**

- Skill `ecriture`, règle 1 : « Une phrase, une information. Deux faits, deux phrases. » La règle coupe, et rien ne dit
  comment les phrases se tiennent ensuite.
- La seule consigne sur les liens est enfouie dans une ligne du tableau des corrections (« on passe d'un mécanisme à
  l'autre par un lien qui se lit (« ensuite », « de même », ou un nouvel alinéa) ») ; elle n'est ni dans les règles 0 à
  15 ni dans « Avant de rendre ».
- La liste des mots vides compte des liens écrits (« ainsi », « en effet », « d'ailleurs »), et rien ne dit par quoi
  les remplacer (« donc », « alors », « parce que »). Le rédacteur coupe le lien au lieu de le changer.
- La règle 15 et son tableau, appliqués phrase par phrase (le paragraphe du monoxyde en est fait) : la relecture se
  fait à l'échelle du mot, jamais du paragraphe.
- Les pages des dangers ramenées à 150 à 230 mots (JP, 28 octobre 2026) : les agents avaient l'ordre de garder tous
  les faits ; les liens, qui n'en sont pas, ont probablement été les premiers coupés (dangers 1 : 4,2 liens pour
  1000 mots).

### Motif 3. La phrase qui finit sur un ajout : « …, et » + un autre fait (haute)

**Ce que l'oreille entend.** La phrase arrive à son point, la voix tombe, puis « , et » relance un second fait, souvent
d'une autre sorte. L'oreille entend la fin deux fois. Et quand ce « et » tient la place d'un « alors », d'un « parce
que » ou d'un « alors que », la logique se perd.

**Fréquence.** 87 phrases du lot (ch. 1 : 5 ; ch. 3 : 42 ; dangers 1 : 21 ; dangers 2 : 19), compte fait sur une seule
ligne de texte, donc par défaut. Toutes ne sont pas fautives : le « et » qui ferme une suite dans le temps (« on charge
une cartouche de 12, et le canon éclate ») marche très bien.

**Exemples.**

1. `dangers/partie-1.md`, l. 3 : « Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de
   carbone, et le poêle en fait plus quand on ferme presque l'entrée d'air pour la nuit. »
   → « Le monoxyde de carbone vient du poêle, du barbecue, du réchaud, du fanal et des moteurs. Le poêle en fait plus
   quand on ferme presque l'entrée d'air pour la nuit. »
2. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 243 : « Jeter aussi, sans y goûter, le poisson fumé ou sous vide,
   même s'il a l'air bon et sent bon : le botulisme de type E, celui du poisson, fait sa toxine dès 3 °C, et un
   réfrigérateur en panne monte à 6 ou 8 °C. »
   → « Jeter aussi, sans y goûter, le poisson fumé ou sous vide, même s'il a l'air bon et sent bon. Un réfrigérateur en
   panne monte à 6 ou 8 °C, alors que le botulisme de type E, celui du poisson, fait sa toxine dès 3 °C. »
   (Le « et » cachait un « alors que » ; la phrase finit maintenant sur le chiffre du rappel de sécurité.)
3. `dangers/partie-1.md`, l. 72 : « La fumée chaude remplit la pièce par le haut, et les enfants qui dorment dans une
   mezzanine sont les premiers touchés. »
   → « La fumée chaude remplit la pièce par le haut, alors les enfants qui dorment dans une mezzanine sont les premiers
   touchés. »
4. `dangers/partie-2.md`, l. 113 : « Personne n'a mesuré le foie d'ours noir, et on le traite de la même façon. »
   → « Personne n'a mesuré le foie d'ours noir, alors on le traite de la même façon. »
5. `dangers/partie-2.md`, l. 30 : « Au Québec, la chauve-souris, le renard, le raton laveur et la mouffette portent la
   rage, et un chien ou un chat infecté la transmet aussi. »
   → « Au Québec, la chauve-souris, le renard, le raton laveur et la mouffette portent la rage. Un chien ou un chat
   infecté la transmet aussi. »
6. `dangers/partie-2.md`, l. 215 : « L'acétaminophène en trop ne donne qu'une nausée pendant que le foie s'abîme, et une
   pile bouton brûle l'œsophage en 2 heures, sans signe. »
   → « L'acétaminophène en trop ne donne qu'une nausée pendant que le foie s'abîme. Une pile bouton brûle l'œsophage en
   2 heures, sans signe. »

**Cause.**

- La compression des pages des dangers (150 à 230 mots) : « , et » est la soudure la moins chère entre deux faits ;
  elle économise un sujet et un point.
- La règle 1 du skill (« Deux faits, deux phrases ») n'a pas de test : rien ne repère la phrase qui en porte deux.
- Skill `langue`, section 10 : pour défaire deux « ou », il propose « « et », « sinon », « on peut aussi », le
  point-virgule ou un point » ; le « et » y devient une soudure à tout faire.
- Habitude d'écriture (de machine surtout) : la phrase balancée en deux moitiés, qui sonne complète à l'œil.

### Motif 4. La liste dans la phrase : avant le verbe ou en parenthèse (moyenne)

**Ce que l'oreille entend.** Une énumération placée avant le verbe oblige à garder quatre ou cinq noms en tête sans
savoir ce qu'ils font ; une liste en parenthèse au milieu de la phrase la coupe en deux. À voix haute, une liste se dit
à la fin, après le verbe, là où la voix peut énumérer puis se poser.

**Fréquence.** Surtout dans les « Ce qui arrive » des dangers, qui ouvrent souvent sur l'inventaire de tout ce qui
cause le danger ; 24 parenthèses explicatives dans chaque partie des dangers, dont beaucoup sont des listes.

**Exemples.**

1. `dangers/partie-1.md`, l. 3 : « Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de
   carbone […] » → « Le monoxyde de carbone vient du poêle, du barbecue, du réchaud, du fanal et des moteurs. »
2. `dangers/partie-1.md`, l. 16 : « Une génératrice ou un moteur à essence (auto, motoneige, scie à chaîne, souffleuse,
   pompe) qui tourne sous un toit remplit l'air de monoxyde de carbone ({>co}), même avec la porte ouverte : le gaz ne
   sort pas assez vite. »
   → « Une génératrice qui tourne sous un toit remplit l'air de monoxyde de carbone ({>co}), même avec la porte
   ouverte, parce que le gaz ne sort pas assez vite. Un moteur à essence fait la même chose : l'auto, la motoneige, la
   scie à chaîne, la souffleuse, la pompe. »
3. `dangers/partie-1.md`, l. 99 (50 mots, deux listes) : « Au fond d'une fosse, d'un caveau, d'une cuve, d'un puits ou
   d'une tranchée, un gaz plus lourd que l'air s'accumule sans qu'on le voie : le gaz carbonique des légumes entreposés
   et de ce qui pourrit, le sulfure d'hydrogène des eaux d'égout et des peaux qui trempent, le propane d'une fuite. »
   → « Un gaz plus lourd que l'air s'accumule sans qu'on le voie au fond d'une fosse, d'un caveau, d'une cuve, d'un
   puits ou d'une tranchée. Ça peut être le gaz carbonique des légumes entreposés et de ce qui pourrit, le sulfure
   d'hydrogène des eaux d'égout et des peaux qui trempent, ou le propane d'une fuite. »
4. `dangers/partie-1.md`, l. 112 (trois parenthèses dans une phrase) : « L'eau de Javel dégage du chlore avec un acide
   (vinaigre, détartrant) et des chloramines avec de l'ammoniaque (nettoyant à vitres, urine) ; le sulfure de sodium du
   tannage dégage du sulfure d'hydrogène avec un acide ({>espace-clos}). »
   → « Mélangée à un acide, comme le vinaigre ou un détartrant, l'eau de Javel dégage du chlore. Mélangée à de
   l'ammoniaque, comme le nettoyant à vitres ou l'urine, elle dégage des chloramines. Et le sulfure de sodium du
   tannage dégage du sulfure d'hydrogène avec un acide ({>espace-clos}). »
5. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 78 (56 mots) : « Ne jamais rentrer les appareils faits pour
   l'extérieur ou le camping (le barbecue, le réchaud, la chaufferette de camping, la génératrice) dans la maison, même
   pour peu de temps, même avec une fenêtre entrouverte : une maison fermée à −35 °C ne change pas assez d'air pour
   sortir le monoxyde d'un appareil qui en fait sans arrêt. »
   → « Ne jamais rentrer un appareil fait pour l'extérieur ou le camping dans la maison, même pour peu de temps, même
   avec une fenêtre entrouverte. C'est vrai pour le barbecue, le réchaud, la chaufferette de camping et la génératrice.
   Une maison fermée à −35 °C ne change pas assez d'air pour sortir le monoxyde d'un appareil qui en fait sans arrêt. »

**Cause.**

- Skill `ecriture`, « Le tiret » : « les parenthèses, pour un ajout court » ; les listes qui étaient entre tirets
  sont passées entre parenthèses, au milieu de la phrase, sans être déplacées.
- Skill `ecriture`, règle 11 : « Le complément de lieu ou de temps ne se glisse pas entre le verbe et son objet. »
  Appliquée à une liste, elle donne « rentrer [quatre appareils] dans la maison » ; la règle ne dit pas quoi faire
  quand l'objet est long (le sortir dans une phrase à lui).
- Le format des dangers : « Ce qui arrive » s'ouvre volontiers sur l'inventaire complet des causes, pour ne rien
  oublier.

### Motif 5. La phrase-fleuve d'étape : geste, condition, raison et exception dans la même phrase (moyenne)

**Ce que l'oreille entend.** Une phrase de 40 à 80 mots n'est pas mauvaise en soi (Ripley en écrit, et on le suit sans
peine) quand elle avance par subordonnées. Celles du lot avancent par empilement : deux-points, point-virgule,
parenthèse, apposition ; elles n'ont pas d'endroit où respirer qui tombe avec le sens, et on perd le geste avant la
fin.

**Fréquence.** 39 phrases de 40 mots et plus (ch. 3 : 28), dont une de 79 mots (dangers 2, l. 231) et une de 61
(ch. 3, l. 43) ; 21,6 % de phrases de 30 mots et plus au ch. 3.

**Exemples.**

1. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 43 (61 mots) : « S'il est enclenché, le bris est à l'entrée électrique
   de la maison, sur l'une de ces trois pièces : le mât de branchement, le tuyau de métal qui sort du toit ou monte le
   long du mur ; le col-de-cygne, le capuchon recourbé au bout du mât, par où sortent les fils ; le support
   d'isolateurs, où s'attache le câble qui vient du poteau. »
   → « S'il est enclenché, le bris est à l'entrée électrique de la maison, sur l'une de ces trois pièces. Le mât de
   branchement est le tuyau de métal qui sort du toit ou monte le long du mur. Au bout du mât, le col-de-cygne est un
   capuchon recourbé, par où sortent les fils. Le support d'isolateurs est l'endroit où s'attache le câble qui vient du
   poteau. »
2. `dangers/partie-2.md`, l. 231 (79 mots) : « Les signes qui trompent : l'abcès dentaire qui cesse d'un coup de faire mal
   (la poche de pus a crevé, mais l'infection reste) ; une douleur à la poitrine, à la mâchoire ou au bras pendant un
   effort, qui passe au repos ; l'enfant qui bave et reste assis penché en avant (sa gorge enfle, et si on le couche, le
   passage de l'air peut se fermer) ; la personne qui a arrêté l'alcool d'un coup et semble aller mieux, avant les
   convulsions. »
   → « Certains signes trompent. Un abcès dentaire peut cesser d'un coup de faire mal parce que la poche de pus a
   crevé, mais l'infection reste. Une douleur à la poitrine, à la mâchoire ou au bras pendant un effort passe au repos.
   Un enfant qui bave et reste assis penché en avant a la gorge qui enfle, et si on le couche, le passage de l'air peut
   se fermer. Et la personne qui a arrêté l'alcool d'un coup semble aller mieux, avant les convulsions. »
3. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 74 (46 mots) : « Lire le chiffre affiché matin et soir, sans attendre
   la sirène : quand il y a peu de monoxyde, l'avertisseur peut ne pas sonner pendant des jours, alors que le mal de
   tête, la nausée et la fatigue qu'on met sur le compte du froid ont commencé. »
   → « Lire le chiffre affiché matin et soir, sans attendre la sirène. Quand il y a peu de monoxyde, l'avertisseur peut
   ne pas sonner pendant des jours. Pendant ce temps, le mal de tête, la nausée et la fatigue commencent, et on les met
   sur le compte du froid. »
4. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 189 (44 mots) : « Arrêter la génératrice 1 h toutes les 8 h de marche,
   et faire le plein quand le moteur est froid, dehors, loin de toute flamme : si le moteur est encore chaud quand on
   pose la main dessus au bout de l'heure, attendre plus longtemps. »
   → « Arrêter la génératrice 1 h toutes les 8 h de marche, et faire le plein quand le moteur est froid, dehors, loin de
   toute flamme. Au bout de l'heure, poser la main sur le moteur. S'il est encore chaud, attendre plus longtemps. »
5. `chapitres/01-les-quatre-horloges.md`, l. 11 (73 mots, la section « En une ligne ») : « Pendant une panne de courant,
   une tempête ou une route fermée, quatre choses s'épuisent en même temps, chacune à sa vitesse : la chaleur du corps
   et l'air qu'on respire, en minutes ou en heures ; l'eau potable, en heures ou en jours ; le froid du frigo et du
   congélateur, en 4 heures pour le frigo et en 1 à 2 jours pour le congélateur ; les calories et le combustible, en
   semaines ou en mois. »
   → « Pendant une panne de courant, une tempête ou une route fermée, quatre choses s'épuisent en même temps, chacune à
   sa vitesse. La chaleur du corps et l'air qu'on respire s'épuisent en minutes ou en heures, l'eau potable en heures
   ou en jours. Le froid tient 4 heures dans le frigo, 1 à 2 jours dans le congélateur. Les calories et le combustible
   durent des semaines ou des mois. »

**Cause.**

- `CLAUDE.md` et le cadre : l'encadré orange est la version détaillée, « chaque étape porte son geste, son pourquoi et
  le détail qui sert à le faire, sans limite de longueur ». La règle vise l'étape ; les rédacteurs l'appliquent à la
  phrase.
- Le cadre : « Une étape qui a plusieurs gestes se découpe en sous-étapes ». Rien de semblable pour la phrase : une
  sous-étape garde le droit de porter trois gestes et deux raisons.
- Les phrases écrites autour de tirets ont gardé leur charpente quand les tirets sont devenus « ; » et « ( ) ».
- La section « En une ligne » du gabarit pousse à tout dire en une phrase.

### Motif 6. Le paragraphe qui s'arrête au lieu de finir (moyenne)

**Ce que l'oreille entend.** La dernière phrase est un renvoi seul, une exception (« Au chalet… ») ou un détail ; le
fait qui compte est au milieu. À voix haute, la voix n'a pas où se poser, et l'auditeur ne sait pas que le paragraphe
est fini. Le skill interdit à bon droit la chute en formule ; il ne dit pas que le paragraphe doit quand même finir sur
son fait le plus lourd, ou sur le geste.

**Fréquence.** 8 paragraphes ou sous-étapes finissent sur une phrase qui n'est qu'un renvoi (ch. 1, l. 69 ; ch. 3,
l. 118, 227, 245, 264, 558, 564, 570) ; d'autres sur une exception ajoutée après coup (ch. 3, l. 65).

**Exemples.**

1. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 112 : « […] Choisir la pièce pour garder les gens au chaud, pas la
   plomberie : vidanger la plomberie (étapes 21 à 25) coûte moins de bois que de chauffer une pièce de plus. Pour fermer
   une fenêtre avec une couverture : section 7. »
   → « Fermer les autres pièces, boucher le bas des portes avec une couverture roulée, et fermer les rideaux au coucher
   du soleil (pour fermer une fenêtre avec une couverture : section 7). Le jour, rouvrir ceux des fenêtres qui reçoivent
   le soleil. La perte de chaleur d'une maison est proportionnelle à l'écart de température avec l'extérieur et à la
   surface exposée, donc en fermant les autres pièces, on réduit la surface à chauffer. Choisir la pièce pour garder les
   gens au chaud, pas la plomberie, parce que vidanger la plomberie (étapes 21 à 25) coûte moins de bois que de chauffer
   une pièce de plus. »
2. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 60 : « […] Compter au moins 4 L par personne et par jour, dont 2 L à
   boire, pour au moins 3 jours. Le chauffe-eau est une réserve de plus (étape 23). Au chalet, la pompe du puits
   s'arrête avec le courant, et il reste quelques minutes de pression. »
   → Le chalet rejoint la pression, dont il parle, et l'étape finit sur ce qu'on fait : « […] l'eau tirée avant n'a pas
   besoin de bouillir (ch. 10). Au chalet, la pompe du puits s'arrête avec le courant, et il reste quelques minutes de
   pression. Compter au moins 4 L par personne et par jour, dont 2 L à boire, pour au moins 3 jours. Le chauffe-eau est
   une réserve de plus (étape 23). »
3. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 562 : « Proposer aux voisins de se regrouper dès le premier jour : on
   partage le bois entre les familles, et une personne peut rester éveillée la nuit. Dans une rue de maisons froides, il
   y a souvent un poêle, une génératrice ou un congélateur encore plein. Le voisinage est au ch. 16. »
   → « Dans une rue de maisons froides, il y a souvent un poêle, une génératrice ou un congélateur encore plein.
   Proposer aux voisins de se regrouper dès le premier jour (ch. 16) : on partage le bois entre les familles, et une
   personne peut rester éveillée la nuit. »
4. `chapitres/01-les-quatre-horloges.md`, l. 66 : « Compter ce qu'on a brûlé en 24 heures (brassées de bois, litres
   d'essence, bonbonnes de propane) et le multiplier par 7 : on obtient la dépense de la semaine. Seule la mesure faite
   dans la maison donne la dépense : elle dépend du volume chauffé et de l'isolation plus que de l'appareil (ch. 83).
   Les calories de la réserve se comptent au ch. 5 (étapes 8 à 11). »
   → « Pour les calories de la réserve, voir le ch. 5 (étapes 8 à 11). Pour le combustible, compter ce qu'on a brûlé en
   24 heures (brassées de bois, litres d'essence, bonbonnes de propane) et le multiplier par 7, pour avoir la dépense
   de la semaine. Il faut faire cette mesure dans la maison : la dépense dépend du volume chauffé et de l'isolation plus
   que de l'appareil (ch. 83). »
   (La dernière phrase d'origine est aussi une consigne au pronominal, « se comptent ».)

**Cause.**

- Skill `ecriture`, « La chute en formule » sort, avec raison ; mais rien ne dit où le paragraphe doit finir, et les
  rédacteurs finissent sur ce qui reste.
- Cadre : « ici, il reste un renvoi court » ; le renvoi s'ajoute à la fin du paragraphe au lieu de s'accrocher à la
  phrase qu'il sert.
- Les retouches successives (ch. 3 refait par la chaîne) ajoutent les faits manquants à la fin de l'étape, là où c'est
  le plus facile.

### Motif 7. L'attaque répétée et le catalogue « Un X…, Un Y… » (basse)

**Ce que l'oreille entend.** Le même sujet redit en tête de chaque phrase (« Le gaz… Il… Il… »), ou une suite de faits
sans rapport qui commencent tous par « Un/Une + nom + verbe » : la voix reprend la même montée à chaque phrase, et rien
ne signale qu'on change de sujet.

**Fréquence.** 5,2 % des phrases du lot commencent par le même mot que la précédente (références : 5,8 %, donc pas
anormal en soi ; beaucoup de ces paires sont de bons parallèles, « Après 6 h… Après 24 h… »). Le défaut est local :
deux paragraphes enchaînent le même sujet en pronom (dangers 1, l. 3 ; dangers 2, l. 3), et quatre paragraphes des
dangers sont des catalogues (dangers 1, l. 139 ; dangers 2, l. 16, 32, 113).

**Exemples.**

1. `dangers/partie-1.md`, l. 3 : « Le gaz ne se voit pas et ne se sent pas. Il prend la place de l'oxygène dans le sang
   : […]. Il se répand dans toute la pièce […] » → « Ce gaz ne se voit pas et ne se sent pas. Il prend la place de
   l'oxygène dans le sang, alors on s'endort […]. Comme il se répand dans toute la pièce […] » (Le deuxième « Il »
   reste ; c'est le troisième, devenu « Comme il », qui change l'attaque.)
2. `dangers/partie-2.md`, l. 3 : « Il fait un détour pour frapper un chien, même en laisse. Il frappe avec les sabots de
   devant, puis piétine la personne tombée. »
   → « Il fait un détour pour frapper un chien, même en laisse. Quand il attaque, il frappe avec les sabots de devant,
   puis piétine la personne tombée. »
3. `dangers/partie-1.md`, l. 139 : « […] Un contenant fermé éclate au feu, comme une pierre ramassée dans l'eau, parce
   que ce qu'il y a dedans prend du volume. Un arbre encroué (tombé sur un autre arbre) se détend d'un coup comme un
   ressort, et un câble tendu qui lâche fouette sur toute sa longueur. »
   → « […] Au feu, un contenant fermé éclate, comme une pierre ramassée dans l'eau, parce que ce qu'il y a dedans prend
   du volume. Un arbre encroué (tombé sur un autre arbre) se détend d'un coup comme un ressort. Et quand un câble tendu
   lâche, il fouette sur toute sa longueur. »
4. `dangers/partie-2.md`, l. 32 : « Une bête peut transmettre le virus plusieurs jours avant d'avoir l'air malade. Une
   bête sauvage qui n'a plus peur, bave, titube, traîne une patte ou sort en plein jour alors que son espèce est
   nocturne : on la soupçonne d'avoir la rage, pas d'être apprivoisée. »
   → « Une bête peut transmettre le virus plusieurs jours avant d'avoir l'air malade. Et quand une bête sauvage n'a plus
   peur, bave, titube, traîne une patte ou sort en plein jour alors que son espèce est nocturne, on la soupçonne
   d'avoir la rage, pas d'être apprivoisée. »

**Cause.**

- Skill `ecriture`, règles 6 et 7 (« Le mot exact, et toujours le même » ; « La voix active, un sujet concret »),
  appliquées phrase par phrase : chaque phrase rouvre sur son sujet.
- Le cadre ne parle que du nom qui revient (« Un nom ne revient pas à chaque phrase ») ; rien sur l'attaque ni sur le
  complément qu'on peut mettre en tête (« Au feu, », « Quand… »).

### Motif 8. Les renvois et les repères qui hachent la phrase (basse)

**Ce que l'oreille entend.** Un « (repère N) » après chaque membre de phrase oblige à s'arrêter trois fois dans la
même phrase ; lu à voix haute, on saute les parenthèses ou on perd le fil.

**Fréquence.** 148 parenthèses de renvoi dans le lot, dont 123 au ch. 3 (15,9 pour 1000 mots) ; onze repères en six
phrases dans l'abri de l'étape 10 (ch. 3, l. 126 à 134). Parenthèses pour 1000 mots : ch. 1, 18,7 ; ch. 3, 17,5 ;
références, 2,4.

**Exemples.**

1. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 131 : « Coucher tout le monde côte à côte sous une même couverture
   (repère 7), sur le lit (repère 8) : les enfants au milieu, un adulte à chaque bout (repère 9). »
   → « Coucher tout le monde côte à côte sur le lit, sous une même couverture, les enfants au milieu et un adulte à
   chaque bout (repères 7 à 9). »
2. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 129 : « Faire le lit sous l'abri, en couches, en partant du plancher :
   des cartons aplatis ou un tapis roulé (repère 4), puis des branches de sapin, un matelas ou des coussins (repère 5),
   puis une couverture sous le corps (repère 6). »
   → « Faire le lit sous l'abri, en couches, en partant du plancher : des cartons aplatis ou un tapis roulé, puis des
   branches de sapin, un matelas ou des coussins, puis une couverture sous le corps (repères 4 à 6). »
3. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 348 : « Clouer une latte de bois par-dessus la couverture, tout le
   long de chaque côté (repère 2), en mettant les lattes bout à bout aux coins (repère 3), pour fermer la lame d'air de
   2,5 cm sur les quatre côtés (repère 4). »
   → « Clouer une latte de bois par-dessus la couverture, tout le long de chaque côté, en mettant les lattes bout à
   bout aux coins, pour fermer la lame d'air de 2,5 cm sur les quatre côtés (repères 2 à 4). »
4. `chapitres/03-panne-majeure-d-hydro-en.md`, l. 352 : « Une couverture accrochée avec les bords ouverts réduit la perte
   de la fenêtre de 10 % au plus (repère 7), surtout parce que l'air de la pièce entre par le haut, se refroidit sur la
   vitre, descend et ressort par le bas, en boucle (repère 8). »
   → « Une couverture accrochée avec les bords ouverts réduit la perte de la fenêtre de 10 % au plus, surtout parce que
   l'air de la pièce entre par le haut, se refroidit sur la vitre, descend et ressort par le bas, en boucle (repères 7
   et 8). »

**Cause.** Le cadre (« chaque sous-étape renvoie au repère de sa planche, dans l'ordre des repères ») et la ligne du
skill sur la vidange du ch. 3, lus comme « un repère par membre de phrase ». Les repères groupés en fin de phrase
gardent l'ordre et le renvoi ; à confirmer avec la règle des planches (le lecteur doit-il trouver chaque repère au mot
près ?).

### Motif 9. Le point-virgule qui coud deux phrases (basse)

**Ce que l'oreille entend.** À voix haute, le point-virgule n'existe pas : on s'arrête, ou on dit le lien. Entre deux
faits complets, il donne une phrase trop longue pour un souffle, sans dire ce qui les relie. Il reste juste dans une
liste de cas (ch. 3, l. 266 à 271) ou de signes.

**Fréquence.** 80 points-virgules hors tableaux (ch. 1 : 11 ; ch. 3 : 27 ; dangers 1 : 13 ; dangers 2 : 29) ;
dangers 2 : 7,1 pour 1000 mots, le double de dangers 1.

**Exemples.**

1. `dangers/partie-2.md`, l. 125 : « Sans air, dans un aliment humide et peu acide, la bactérie du botulisme fabrique sa
   toxine ; ses spores résistent à l'eau bouillante, pas à l'autoclave. »
   → « Sans air, dans un aliment humide et peu acide, la bactérie du botulisme fabrique sa toxine. Ses spores résistent
   à l'eau bouillante, mais pas à l'autoclave. »
2. `dangers/partie-2.md`, l. 202 : « Dans l'eau, les parasites des selles résistent au gel ; le chlore ne suffit pas
   contre eux, surtout dans l'eau froide. »
   → « Dans l'eau, les parasites des selles résistent au gel. Le chlore ne suffit pas contre eux non plus, surtout dans
   l'eau froide. »
3. `dangers/partie-2.md`, l. 57 : « La maladie commence de 1 à 8 semaines plus tard, comme une grippe, et on ne fait pas
   le lien ; si elle passe aux poumons (toux, essoufflement, état de choc), elle tue environ 40 % des personnes
   atteintes. »
   → « La maladie commence de 1 à 8 semaines plus tard, comme une grippe, et on ne fait pas le lien avec le ménage. Si
   elle passe aux poumons (toux, essoufflement, état de choc), elle tue environ 40 % des personnes atteintes. »
4. `dangers/partie-1.md`, l. 60 : « Le beurre fume à partir de 130 °C ; on compte la même chose pour le suif, le
   saindoux et la graisse d'ours. »
   → « Le beurre fume à partir de 130 °C. On compte la même chose pour le suif, le saindoux et la graisse d'ours. »
5. `dangers/partie-2.md`, l. 100 : « Au Québec, l'ours noir est l'animal qui risque le plus de la transmettre ; elle est
   plus fréquente chez les carnivores et les omnivores (renard, loup, lynx, martre, vison), et on l'a trouvée chez le
   phoque. »
   → « Au Québec, l'ours noir est l'animal qui risque le plus de la transmettre. Elle est plus fréquente chez les
   carnivores et les omnivores (renard, loup, lynx, martre, vison). On l'a aussi trouvée chez le phoque. »

**Cause.** Skill `langue`, section 10 (le point-virgule proposé pour défaire deux « ou ») ; le tiret remplacé par
« ; » ; la compression des dangers (deux phrases en une pour gagner une ligne). Le point-virgule est le signe de
l'écrit par excellence, et aucune règle ne le limite.

## 4. Les passages qui marchent, à garder comme modèles

1. **Le récit en trois temps.** `dangers/partie-2.md`, l. 16 : « Une cartouche de 20 qu'on glisse par erreur dans un
   fusil de 12 se coince dans le canon : on croit l'arme vide, on charge une cartouche de 12, et le canon éclate. »
   Les gestes se suivent dans l'ordre où ils arrivent, en trois coups courts sur le même sujet (« on »), et le « et »
   ferme la suite sur la conséquence : la voix ne tombe qu'une fois, à la fin. Ici, le deux-points ouvre une petite
   histoire, pas une raison.
2. **Le paragraphe qui avance dans le temps.** `chapitres/03-panne-majeure-d-hydro-en.md`, l. 464 : « La neige isole :
   une viande encore molle qu'on enterre dans un banc de neige ne gèle pas dur. Pour la faire geler, on la laisse à
   l'air, dans des bacs ouverts du côté nord, les morceaux séparés les uns des autres, par une nuit claire et venteuse.
   Une fois la viande gelée, on l'enterre dans la neige pour la garder gelée, et on plante une perche dans la cache :
   après une bordée, on ne retrouve plus le banc de neige ni ce qu'il contient (ch. 73). » Chaque phrase part de là où
   la précédente s'arrête (« Pour la faire geler », « Une fois la viande gelée ») ; les phrases s'allongent à mesure
   (17, 29, 39 mots) ; le paragraphe finit sur une raison concrète.
3. **L'ordre annoncé, puis suivi.** `chapitres/01-les-quatre-horloges.md`, l. 135 : « Les signes arrivent dans cet
   ordre. D'abord, la personne frissonne fort et parle bien. Ensuite, elle perd ses gestes fins avant sa force : elle
   n'arrive plus à attacher un bouton, à gratter une allumette ou à ouvrir une fermeture Éclair, alors qu'elle marche
   droit. » Une phrase courte annonce, « D'abord » et « Ensuite » disent où on est, et la liste vient à la fin, après
   le verbe. (La suite du même paragraphe retombe dans le motif 1 : l'exemple 3.)
4. **Le pourquoi dit à voix haute, et une fin qui se pose.** `chapitres/03-panne-majeure-d-hydro-en.md`, l. 121 : « La
   tente ou la table couverte garde la chaleur des corps dans un petit volume. Un corps couché perd sa chaleur beaucoup
   plus vite vers le plancher que vers l'air, parce que le bois et le contreplaqué la conduisent et que l'air immobile
   la conduit très peu : il faut plus d'épaisseur sous les corps que par-dessus. Deux cartons et une couverture sous le
   corps gardent plus chaud que quatre couvertures à même le plancher. » Le « parce que » se dit ; la dernière phrase
   est une comparaison qu'on peut faire chez soi, sans formule.
5. **Les trois temps de l'eau froide.** `dangers/partie-1.md`, l. 206 : « Une chute dans l'eau froide se passe en trois
   temps, qu'on retient par 1, 10, 1. Pendant la première minute, le choc fait prendre une grande inspiration, puis
   respirer très vite : si la tête est sous l'eau à ce moment, même un bon nageur peut se noyer. On a ensuite 10 minutes
   de mouvements utiles, avant que les bras, les jambes et les doigts perdent leur force ; on perd conscience au bout
   d'environ 1 heure. » L'annonce, puis le temps qui avance (« Pendant la première minute », « puis », « ensuite ») ;
   le seul deux-points ouvre une condition. Seule faiblesse : le troisième temps, collé par un point-virgule,
   mériterait sa phrase (« Au bout d'environ 1 heure, on perd conscience. »).

Un sixième, plus petit : ch. 3, l. 434 : « Serrer par-dessus deux ou trois colliers de boyau, l'un contre l'autre, qui
mordent de chaque côté de la fente (repère 9). Ça tient la pression d'une maison. » La phrase courte après le geste
long : c'est là qu'une phrase courte sert.

## 5. Pistes pour les règles (du seul point de vue du tempo)

Pour l'agent qui réécrit le skill ; à juger avec les autres regards.

1. **Le paragraphe est l'unité de relecture**, pas la phrase : on le lit d'un souffle, à voix haute, après chaque
   correction de mots.
2. **Le lien se dit avec un mot.** Parce que, donc, alors, si, quand, comme, mais, puis, ensuite, sinon : la liste
   des mots qu'on garde, à côté de celle des mots vides qu'on coupe.
3. **Un deux-points par paragraphe, au plus**, sauf devant une liste ; la phrase « fait : conséquence » devient deux
   phrases ou une phrase liée. Le modèle de la règle 2 se réécrit sans deux-points.
4. **« , et » relie deux choses de la même sorte, ou une suite dans le temps** ; un second fait d'une autre sorte prend
   sa phrase.
5. **La liste va après le verbe**, à la fin de la phrase ; trop longue, elle prend sa phrase (« C'est vrai pour… »).
6. **Le paragraphe finit sur son fait le plus lourd ou sur le geste** ; le renvoi s'accroche à la phrase qu'il sert.
7. **Les repères d'une phrase se groupent à la fin** (« repères 4 à 6 »).
8. **Des seuils pour `tempo.py`**, sur le modèle des références : phrases à deux-points sous 10 %, « fait :
   conséquence » sous 5 %, liens parlés au-dessus de 8 pour 1000 mots, parenthèses sous 5 pour 1000 mots.

## 6. Liste de contrôle (cadre, lignes qui touchent l'écriture et la langue)

- [x] Économiser les jetons : lecture des quatre fichiers du lot, de `cadre-agents.md` et du skill `ecriture` ; le
  reste par `grep` ; sorties de commande coupées.
- [x] Aucun fichier du livre modifié ; seule écriture : ce fichier de notes. Rien de commité.
- [x] Règle 0 : chaque réécriture relue à voix haute.
- [x] Pas de loi en formule, pas de « d'où », pas de maxime, pas de chute en formule, pas d'opposition fabriquée, pas
  d'image poétique, pas de chose qui pense.
- [x] Pas de consigne au pronominal dans les réécritures (le « se comptent » du ch. 1, l. 69, est signalé).
- [x] Le sujet se nomme ; consigne à l'infinitif dans les étapes, « il faut » ou « on » ailleurs.
- [x] Le mot qu'on dit (règle 15) : « ça peut être », « alors », « comme » ; aucun joual.
- [x] Aucun tiret (— ou –) dans les réécritures ni dans ces notes ; « section N », jamais « § ».
- [x] Aucun fait ni chiffre neuf : chaque réécriture garde les faits et les chiffres de la phrase d'origine ; les ajouts
  sont des mots de liaison ou un sujet rendu explicite (« avec le câble à deux fiches », « avec le ménage »).
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures.
- [x] Pas de tutoiement du lecteur.
- [x] `controle.py` sur les 44 réécritures mises bout à bout : 0 tiret ; les « mots vides » relevés (« toute la
  pièce », « tout le monde », « encore plein ») viennent du texte d'origine et veulent dire quelque chose.
  `langue.py` (avec LanguageTool) : 0 avis. `tempo.py` sur les mêmes réécritures : 8 % de phrases à deux-points,
  5,6 % en « fait : conséquence », 16,1 liens parlés pour 1000 mots.
- [x] Citations vérifiées par script contre les quatre fichiers : chaque bout cité existe mot pour mot (au gras près).
- [ ] Une réécriture retenue repasse par la chaîne (éditeur, correcteur) avant d'entrer dans un chapitre : hors de
  cette tâche.
- [x] Rappels de sécurité : non touchés ; les réécritures qui en contiennent un (botulisme de type E dès 3 °C) le
  gardent avec son chiffre.
