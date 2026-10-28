# Audit de l'écriture : la densité, lot D (tome 3 : lièvre, ours, truite)

28 octobre 2026. Un seul regard : la densité, trop compressé ou trop délayé. D'un côté le télégraphe (la phrase sans
verbe, la liste de noms à la place des gestes, l'étiquette, le lien logique sous-entendu, le mécanisme serré en
formule) ; de l'autre le remplissage (la redite, la phrase qui parle du livre, de la source ou de la consigne, la
formule qui redit la phrase d'avant). Lot lu au complet : `chapitres/48-lievre-d-amerique.md`,
`chapitres/52-ours-noir.md`, `chapitres/57-truite-et-omble-au-lac.md`. Aucun fichier du livre n'a été modifié. Les
réécritures sont des exemples : aucun fait ni chiffre neuf ; « (rien) » veut dire que la phrase sort.

**Ce lot n'a pas encore eu la passe de style.** Le ch. 48 et le ch. 57 n'ont pas bougé depuis le commit `bc816f4f`
(la reprise) et la pause du 15 octobre ; le ch. 52 n'a reçu que des renvois. Ils sont encore au gabarit à neuf
sections (« Pourquoi ça marche », encadré DANGER, « § », tirets). C'est ce qui rend le lot utile pour l'audit : **il
montre le texte d'avant la passe**, et on peut le comparer au ch. 3, qui l'a eue.

En une phrase : **le lot est plus délayé que compressé, mais il est compressé exactement aux endroits que nos
règles ont formatés** (le Matériel, la section 3, la ligne « En une ligne », les tableaux, la première ligne des
étapes) ; **et la passe faite sur le tome 1 a enlevé le délayage en emportant les liens** (« c'est », « parce que »,
« donc ») qui font le tempo parlé. Si la passe du tome 3 suit les mêmes règles, ce lot perdra ses meilleures phrases
avec ses pires.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 48 | 5670 | 308 | 18,4 | 0,67 | 19,5 | 17,5 | 20,5 | 34,4 | 26,0 | 3,4 | 6,5 | 6,3 | 4,2 |
| ch. 52 | 4850 | 245 | 19,8 | 0,71 | 12,7 | 20,8 | 18,9 | 29,8 | 23,7 | 5,4 | 9,1 | 6,6 | 4,9 |
| ch. 57 | 5447 | 273 | 20,0 | 0,66 | 15,4 | 21,2 | 14,7 | 28,9 | 25,3 | 3,1 | 5,7 | 5,5 | 6,2 |
| **le lot** | 15967 | 826 | 19,3 | 0,68 | 16,1 | 19,7 | 18,1 | 31,2 | 25,1 | 3,9 | 7,0 | 6,1 | 5,1 |
| tout le livre | 684215 | 36580 | 18,7 | 0,65 | 15,5 | 17,3 | 19,9 | 31,4 | 23,7 | 5,0 | 9,4 | 5,4 | 5,1 |
| tome 1 (passé) | 100163 | 4992 | 20,1 | 0,54 | 9,4 | 17,8 | 23,0 | 36,5 | 29,4 | 4,4 | 16,5 | 5,2 | 4,7 |

Phrases de 45 mots et plus : 14 au ch. 48, 12 au ch. 52, 14 au ch. 57 (40 sur 826). La plus longue fait 91 mots
(ch. 52, « La filière minimale »).

### Les marques de densité (script de travail, hors dépôt, sur le texte nettoyé par `tempo.py`)

Pour 1000 mots. Les quatre textes techniques de `plan/audit-ecriture/references/` servent de repère.

| pour 1000 mots | ch. 48 | ch. 52 | ch. 57 | ch. 3 avant la passe | ch. 3 aujourd'hui | Alberta | Ripley | Millet-Robinet | Wikilivres |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| deux-points | 18,9 | 15,5 | 14,5 | 15,2 | 19,2 | 1,5 | 0,4 | 2,3 | 4,9 |
| parenthèses | 6,5 | 9,1 | 5,7 | 2,1 | **17,5** | 0,5 | 0,4 | 0,5 | 16,9 |
| « c'est » | 3,7 | 5,8 | 4,2 | 4,9 | **0,5** | 0,5 | 0 | 3,2 | 0,4 |
| « parce que » | 1,2 | 1,9 | 0,9 | 1,6 | **0,4** | 0 | 0 | 0,9 | 0 |
| « donc » | 0,7 | 1,0 | 1,3 | 0,9 | **0,4** | 0 | 0 | 1,4 | 2,2 |
| « mais » | 1,1 | 0,4 | 0,7 | 0,9 | 0,6 | 0,5 | 1,2 | 1,8 | 2,2 |
| « exactement » | 1,1 | 1,0 | 0,9 | 0,5 | 0 | 0 | 0 | 0,5 | 0 |
| citations « » de la source | 3,9 | 2,7 | 2,6 | 2,4 | 0,8 | | | | |
| méta (le livre, ce chapitre, la consigne, le tableau…) | 2,5 | 3,5 | 1,7 | 0,5 | 0 | 0 | 0 | 0 | 0 |
| renvois « ch. N » | 3,7 | 10,3 | 8,8 | 3,4 | 4,5 | | | | |

« Ch. 3 avant la passe » est la version du commit `bc816f4f` ; « aujourd'hui », celle qui a eu la passe de style, la
passe d'éditeur et la règle 15. Mêmes faits, même sujet, même rédacteur : c'est la meilleure mesure qu'on ait de ce
que la passe fait au texte. Une part des parenthèses ajoutées au ch. 3 sont des appels de planche et des renvois
« (étape N) » ; le reste est du texte qui est passé entre parenthèses.

### Les faits redits dans le lot (lignes où le même fait revient)

| fait | lignes | fois |
| --- | --- | --- |
| ch. 48 : cuire à 74 °C, mesuré à la cuisse | 68, 199, 200, 252, 268, 296, 444, 467 | 8 |
| ch. 48 : le gel ne désinfecte pas | 52, 195, 251, 292, 460, 525 | 6 |
| ch. 48 : la tularémie entre par une gerçure des mains | 38, 49, 65, 161, 244, 279, 284, 529 | 8 |
| ch. 48 : surveiller trois semaines | 186, 214, 218, 221, 249, 254, 269, 518 | 8 |
| ch. 48 : points blancs, ne pas manger | 172, 175, 178, 247, 262, 301, 305 | 7 |
| ch. 48 : gras et féculent à chaque repas | 57, 208, 253, 271, 317, 535 | 6 |
| ch. 48 : javel, 1 volume pour 9 d'eau | 67, 143, 182, 248 | 4 |
| ch. 52 : 74 °C à cœur | 16, 38, 45 à 49, 77, 141, 145, 177, 182, 186, 198, 214 à 216, 271, 323 | 17 |
| ch. 52 : confit et botulisme | 182 à 185, 231, 283 à 291, 401 à 403, 477 | 5 passages |
| ch. 52 : le gras vaut la moitié (ou les trois quarts) de la bête | 306, 393, 448, 458 | 4, avec deux chiffres différents |
| ch. 52 : approcher par l'arrière, en retrait, arme pointée | 87 à 90, 279 à 281 | 2, presque mot pour mot |
| ch. 52 : les restes d'un ours attirent les ours | 57, 102, 439 | 3 |
| ch. 57 : le VFI porté, pas rangé | 35, 64, 111, 164, 212, 354, 474, 476 | 8 |
| ch. 57 : le type E pousse dès 3 °C | 56, 174, 188, 229, 463, 471 | 6 |
| ch. 57 : touladi 2 repas, omble 8 repas | 46, 82, 86, 90, 98, 176 | 6 |

### Ce que les chiffres disent

- **Le lot a encore ses liens parlés**, et le ch. 3 les a perdus à la passe. Au ch. 3, « c'est » est passé de 4,9 à
  0,5 pour 1000 mots, « parce que » de 1,6 à 0,4, « donc » de 0,9 à 0,4 ; les parenthèses ont été multipliées par
  huit (2,1 à 17,5) et la phrase « fait : conséquence » est montée de 23,6 % à 30,0 %. La variation de longueur a
  baissé (0,64 à 0,57) et la monotonie a monté (18,6 % à 23,6 %). La passe a fait ce qu'on lui demandait (zéro
  « exactement », zéro méta, aucun tiret dans les phrases), et elle a fait le reste sans qu'on le lui demande.
- **Le lot porte du délayage que la passe doit enlever** : 15 « exactement », 23 « la seule / le seul » de
  superlatif, une quarantaine de phrases sur le livre, la source ou la consigne, 49 citations de la source entre
  guillemets, et des faits redits de 4 à 17 fois.
- **Le deux-points est déjà là partout** (14,5 à 18,9 pour 1000 mots, contre 0,4 à 4,9 dans les textes techniques) :
  ce n'est pas la passe qui l'a créé, c'est notre façon d'écrire depuis le début. La passe l'a seulement gardé quand
  elle enlevait le reste.
- **Le télégraphe est concentré**, pas répandu : les 12 lignes de Matériel, la section 3 des trois chapitres, la ligne
  « En une ligne », les cases d'action des tableaux et une vingtaine de phrases d'étape ou de variante sans verbe
  (relevé du script de travail). Ce sont exactement les endroits où une règle impose une longueur ou une forme.

## 2. Les défauts, du plus grave au moins grave

### 2.1 Le mécanisme serré en formule (haute)

Le pourquoi tient dans une seule phrase coupée par un deux-points, avec des participes apposés, une chose qui
« décide », un verbe qui fait deux choses à la fois. Il faut relire pour comprendre, et parfois on ne comprend pas :
au ch. 52, l'auditeur lui-même ne sait pas ce que « un haché n'est que du centre » veut dire. C'est le « paragraphe en
paraboles » que JP a refusé au ch. 3 (« c'est fucking drôlement dit »), en plus serré.

Fréquence : les trois sections 3 (5 formules en gras au ch. 48, 2 au ch. 52, 5 mécanismes en 6 phrases au ch. 57), et
une dizaine dans les étapes (« la cuisse décide », 48 l. 205 ; « La peau est un emballage », 48 l. 133 ; « La masse
chaude est dedans, la couverture est dessus », 52 l. 109 ; « Le fumoir remplace le four, il ne remplace pas le
thermomètre », 52 l. 187). Une vingtaine en tout.

Cause : l'ancien gabarit (`gabarit-chapitre.md`, section 3) : « Trois à cinq phrases de principe, **120 mots au
plus** : le mécanisme, pas son histoire ni ses exemples » ; la règle 2 du skill `ecriture` (« Le fait d'abord, la
raison ensuite », avec un exemple bâti sur un deux-points) ; la règle 5 de `CLAUDE.md` (« Écrire dense ») ; et la
ligne « La conséquence évidente d'un fait qu'on vient de dire » du skill, qui fait couper la phrase qui rattachait le
mécanisme au geste. Le skill interdit bien « la loi en formule », mais seulement par ses exemples (« devient flamme »,
« d'où »), que ces phrases n'emploient pas.

| fichier | ligne | citation | réécriture |
| --- | --- | --- | --- |
| 52 | 67 | « Seule la chaleur la tue, et elle entre par la surface : le centre, dernier chauffé, décide, et un haché n'est que du centre. » | « Seule la chaleur tue la larve, et elle entre dans la viande par la surface. Le centre chauffe en dernier, c'est donc là qu'on mesure. Un haché n'a pas de dessus qui chauffe en premier : toute la masse doit atteindre 74 °C, comme le centre d'un rôti. » (La dernière phrase est une lecture ; le rédacteur doit dire si c'est ce que le texte voulait dire : c'est le défaut même.) |
| 48 | 57 | « **Le lièvre est presque uniquement de la protéine** : mangé sans gras ni féculent, il remplit et affame (ch. 19). » | « Le lièvre est presque uniquement de la protéine. Quand on en mange sans gras ni féculent, on a le ventre plein et on maigrit quand même (ch. 19). » |
| 52 | 70 | « **Le gras se conserve par l'absence d'eau, pas par le froid** : chauffé doucement, il perd son eau en vapeur et ses miettes de viande au fond, et il ne lui reste presque rien à faire pourrir. » | « Le gras rendu se garde parce qu'il n'a presque plus d'eau. Quand on le chauffe doucement, son eau part en vapeur et les miettes de viande tombent au fond : il ne reste presque rien qui puisse pourrir. » (« Pas par le froid » sort : l'étape 23 range le gras au froid, et l'opposition se lit comme une contradiction.) |
| 57 | 54 | « Le poisson se dégrade plus vite que la viande rouge : sa flore travaille encore au froid qui ralentit celle de l'orignal, et le botulisme aquatique de type E pousse au-dessus de **3 °C**. » | « Le poisson se gâte plus vite que la viande rouge, parce que ses bactéries continuent de travailler à un froid qui ralentit celles de l'orignal. Celle du botulisme de type E, qui vit dans l'eau, pousse dès qu'on dépasse 3 °C. » |
| 57 | 58 | « Enfin, la truite est une viande maigre : mangée presque seule, elle dépasse ce que le foie évacue d'azote, c'est **mortel en quelques semaines**, et le gras doit venir d'ailleurs (ch. 19, ch. 22, ch. 72). » | « Enfin, la truite est une viande maigre. Quand on ne mange presque que ça, le foie reçoit plus d'azote qu'il ne peut en évacuer, et on en meurt en quelques semaines. Le gras doit donc venir d'ailleurs (ch. 19, ch. 22, ch. 72). » |
| 48 | 99 | « Un collet mal calibré ne rate pas, il **manque** — il glisse sur le corps et l'animal part avec le fil. » | « Si la boucle est mal ajustée, elle glisse sur le corps et l'animal part avec le fil. » |

### 2.2 La consigne sans verbe : noms, participes, étiquettes (haute)

L'étape, la ligne de Matériel ou la case de tableau aligne des noms et des participes au lieu de dire le geste :
« Sonde au centre de la cuisse », « gants aux mains, animal humecté », « foulard mouillé, jamais sec ». C'est
exactement ce que JP a appelé « personne parle comme ça » (« Régler dehors : un bol qui revient… »).

Fréquence : les 12 lignes de Matériel du lot (5, 3 et 4), toutes en fragment après un tiret, dont 8 finissent sur une flèche « (→ §9) » ;
une vingtaine de phrases d'étape ou de variante sans verbe (48 l. 80, 81, 142, 157, 191 ; 52 l. 116, 118, 175, 178 ;
57 l. 139, 256, 264, 386, 418, 453…) ; une bonne part des cases « Si c'est hors cible » et « Action » des tableaux.

Cause : la ligne de Matériel imposée par `gabarit-chapitre.md` et `CLAUDE.md` (« une ligne par item, 15 à 20 mots :
le nom en gras, puis ce qu'il fait ou ce que c'est », « sinon « (→ section 9) » ») et **son exemple même**, qui est un
télégraphe : « **Thermomètre à sonde** : porte les 74 °C à cœur. Ne se fabrique pas. » (repris tel quel au ch. 57,
l. 67). Ensuite l'habitude de la fiche de terrain dans les étapes, et le tableau à quatre colonnes, où la case
d'action n'a la place que d'une étiquette. La règle 0 du skill `ecriture` dit bien « même dans un logigramme ou un
tableau », mais l'exemple du Matériel la contredit.

| fichier | ligne | citation | réécriture |
| --- | --- | --- | --- |
| 52 | 116 | « 8. **Mesurer, pas estimer.** Sonde au centre de la cuisse, loin de l'os. Une lecture à 2 h, une à 6 h, une à 24 h. 9. **Transport et entreposage entre 0 °C et 4 °C**. Congélation à **-18 °C ou moins** — pour la qualité, pas pour le parasite. » | « 8. **Mesurer la température au lieu de l'estimer.** Piquer la sonde au centre de la cuisse, loin de l'os, et prendre une lecture 2 h, 6 h et 24 h après la mort. 9. **Garder la viande entre 0 °C et 4 °C** pendant le transport et l'entreposage. Si on la congèle, c'est à -18 °C ou moins : le gel garde la qualité de la viande, mais il ne tue pas le parasite. » |
| 48 | 141 | « Gants imperméables, lunettes, masque et tablier, tous les quatre. Un seau de solution de javel prêt : **un volume d'eau de Javel pour neuf volumes d'eau**. De l'eau et du savon à portée, pas dans l'autre bâtiment. Le chien attaché ailleurs : ce qu'il mange aux abats, il le rapporte au chalet (§8). » | « Mettre les quatre protections : les gants imperméables, les lunettes, le masque et le tablier. Préparer un seau de javel, un volume d'eau de Javel pour neuf volumes d'eau, et garder de l'eau et du savon à portée de main, pas dans l'autre bâtiment. Attacher le chien ailleurs : s'il mange des abats, il rapporte la maladie au chalet (section 8). » |
| 57 | 139 | « 11. **Au froid, immédiatement.** Poisson couché sur le flanc, cavité vers le bas, **enrobé** de glace et non posé dessus, dans une glacière fermée, à l'ombre, avec un bouchon de vidange ouvert pour que l'eau de fonte s'écoule. » | « 11. **Mettre le poisson au froid tout de suite.** Le coucher sur le flanc, le ventre ouvert vers le bas, et l'enfouir dans la glace au lieu de le poser dessus. Fermer la glacière, la laisser à l'ombre et ouvrir le bouchon de vidange pour que l'eau de fonte s'écoule. » |
| 48 | 66 | « - **Lunettes et masque** — l'œil et l'inhalation sont deux voies d'entrée ; à défaut de masque, foulard mouillé, jamais sec. » | « - **Lunettes et masque** : la bactérie entre aussi par les yeux et par l'air qu'on respire. Sans masque, mettre un foulard mouillé, jamais un foulard sec. » |
| 57 | 67 | « - **Deux thermomètres à sonde** — glacière entre 0 et 4 °C, poisson à 70 °C à cœur. Ne se fabriquent pas. » | « - **Deux thermomètres à sonde** : un pour tenir la glacière entre 0 et 4 °C, l'autre pour vérifier que le poisson atteint 70 °C à cœur. On ne peut pas les fabriquer. » |
| 52 | 209 | « Manquée : la filière conserve est fermée. La viande se cuit et se mange, ou se jette. Voir ch. 66 » (case du tableau, 24 h après la mort) | « Si la viande n'est pas descendue à 7 °C, ne pas la mettre en conserve : la cuire et la manger, ou la jeter (ch. 66). » |

### 2.3 La phrase qui parle de la source, du livre ou de la consigne (haute)

Le texte présente le fait au lieu de le dire : « C'est la consigne la moins connue et l'une des plus importantes : »,
« Le mécanisme, en clair : », « La consigne qui suit est sans nuance : », « le livre retient la plus longue ». Le
plus souvent, la phrase de présentation annonce une citation de la source entre guillemets, dans la langue de
l'administration (« minimiser l'aérosolisation des bactéries »), puis le texte la redit dans ses mots : le même fait
trois fois en trois phrases. C'est le délayage le plus lourd du lot, et c'est lui qui fait « tourner autour du pot ».

Fréquence : une quarantaine (17 au ch. 48, 14 au ch. 52, une dizaine au ch. 57), plus 49 citations de la source entre
guillemets. Le ch. 57 a même une section entière sur ce que le livre n'imprime pas (5-C, l. 154).

Cause : la règle 1 de `CLAUDE.md` (« on cherche la source avant d'écrire ») vécue comme une preuve à montrer : le
rédacteur colle la phrase de la source et la commente. Le skill `ecriture` l'interdit (« Pas de citation de source :
la provenance vit dans `suivi/`, jamais dans le texte » ; « La phrase qui parle du livre, du chapitre, de la page »),
mais le lot n'a pas eu la passe. Le danger à la passe : couper la citation et la présentation, et garder la phrase en
gras qui était entre les deux, sans son « parce que ».

| fichier | ligne | citation | réécriture |
| --- | --- | --- | --- |
| 48 | 147 | « C'est la consigne la moins connue et l'une des plus importantes : **«il est également recommandé de mouiller la fourrure avant toute manipulation afin de minimiser l'aérosolisation des bactéries »**. Le mécanisme, en clair : **«Humectez la fourrure avant d'éviscérer l'animal de façon à diminuer la quantité de poussière. »** Une fourrure sèche qu'on tire et qu'on coupe lance de la poussière, et **l'inhalation est l'une des cinq voies d'infection**. » | « Il faut mouiller le poil parce qu'une fourrure sèche qu'on tire et qu'on coupe lance une poussière qui porte la bactérie, et on la respire. » (56 mots deviennent 23, et le « parce que » entre.) |
| 48 | 174 | « La consigne qui suit est sans nuance : **«il est recommandé de ne pas consommer la viande de tout animal présentant des points blancs sur le foie ou la rate et de le soumettre à un laboratoire »**. Pas «parer autour », pas «bien cuire » : **ne pas consommer**. » | « Si on voit ces points blancs sur le foie ou la rate, on ne mange pas l'animal, même en coupant autour, même bien cuit. » (La même étape le redit une troisième fois, l. 178 : « elle ne change rien à la première consigne, qui est de ne pas manger l'animal ». Le laboratoire relève d'une autre règle, « aucun service qui répond ».) |
| 48 | 218 | « Une étendue plus courte circule aussi — **«de 3 à 5 jours (parfois jusqu'à 14 jours) »** — et le livre retient la plus longue, parce qu'une fenêtre trop courte fait cesser de surveiller trop tôt. » | (rien) La phrase d'avant devient : « Les premiers signes paraissent de trois à six jours après, et jusqu'à trois semaines plus tard : on surveille donc pendant trois semaines. » |
| 52 | 319 | « **Sans thermomètre.** C'est la seule perte qui compte, et elle est grave : **on perd la vérification de la seule barrière qui existe contre la trichinellose.** Le livre ne peut pas prétendre le contraire. Ce qui reste est un raisonnement de physique, pas une mesure : » | « **Sans thermomètre**, on ne peut plus vérifier les 74 °C, qui sont la seule barrière contre la trichinellose. Il reste à se fier à l'eau qui bout : » (la suite de la phrase ne change pas) |
| 52 | 40 | « **Ce chapitre ferme des portes ailleurs dans le livre, et c'est son apport principal.** Pour l'ours noir, et pour aucune autre espèce du tome 3 : » | « Pour l'ours noir, voici ce que permettent les méthodes de conservation des autres chapitres : » |
| 57 | 234 | « Et la seule phrase de ce livre qu'il faut savoir par cœur : **«Le botulisme n'altère pas la couleur, l'odeur ou le goût des aliments »**. » | « Le botulisme ne change ni la couleur, ni l'odeur, ni le goût des aliments. » |

### 2.4 Le même fait redit d'une section à l'autre (haute)

Le même fait revient dans « En une ligne », « Quand l'utiliser », « Pourquoi ça marche », l'étape, le tableau de
contrôle, le tableau d'échec, l'encadré DANGER et la variante d'urgence, parfois avec d'autres chiffres (le gras de
l'ours vaut « la moitié » de la bête aux lignes 393 et 458, « les trois quarts » à la ligne 448). Le lecteur relit ce
qu'il sait, et le fait qui sert se perd dans la masse.

Fréquence : voir le tableau de la section 1 ; 15 faits redits de 4 à 17 fois. Les rappels de sécurité en font la plus
grosse part.

Cause : l'ancien gabarit à neuf sections, où chaque section reprend le chapitre sous un autre angle ; et la règle des
rappels de `CLAUDE.md` (« Ils se répètent dans **chaque** chapitre concerné, dans l'étape qui les concerne ») lue comme
« partout dans le chapitre ». Le cadre (`.claude/cadre-agents.md`, « La répétition ») dit l'inverse : « un fait garde
une seule place ; les rappels de sécurité dans leur étape et à côté de leur pictogramme seulement ». Le nouveau gabarit
à sept sections et les pictogrammes règlent une bonne part du problème, à condition que la passe fasse l'inventaire
des faits.

| fichier | ligne | citation | réécriture |
| --- | --- | --- | --- |
| 48 | 459 | « **Ce qu'on ne gagne jamais, ni avec un congélateur ni sans :** la sécurité. Le gel ne tue pas *F. tularensis*. » | (rien) C'est la cinquième fois ; la place du fait est l'étape 15, où l'on congèle. |
| 48 | 316 | « Chaque repas de lièvre porte du gras et un féculent, sans exception, et les enfants de 4 et 6 ans atteignent le plafond avant les adultes. Le chapitre 19 donne l'arithmétique. » | (rien) C'est l'étape 17, presque mot pour mot. |
| 52 | 279 | « Rester en retrait, arme chargée pointée dans une direction sûre, observer la cage thoracique et l'œil pendant une longue attente avant d'approcher, et approcher par l'arrière. » | (rien) C'est l'étape 1, mot pour mot (l. 87 à 90). |
| 52 | 447 | « Un ours dont on n'a gardé que les steaks a été gaspillé aux trois quarts. » | (rien) L'étape 10 dit déjà que le gras est « le produit le plus précieux de la bête » ; les lignes 306, 393 et 458 le redisent avec un autre chiffre. |
| 57 | 212 | « **C'est pour ça que le VFI se porte, pas se transporte.** Un gilet rangé sous le banc est un objet décoratif. » | (rien ici) Le pourquoi va une fois à l'étape 3 : « 3. **Enfiler les VFI à terre**, avant de pousser l'embarcation : une fois dans l'eau, on n'arrive presque plus à attraper un gilet, encore moins à l'enfiler. » |
| 52 | 175 | « 25. **Congélation à -18 °C ou moins**. C'est la voie de ce qui redescend à la maison, parce que le congélateur est là-bas et pas au chalet. **Elle ne change rien au parasite** : la viande sortie du congélateur devra quand même monter à 74 °C. » | « 25. **Congeler à -18 °C ou moins la viande qui redescend à la maison**, puisque le congélateur est là-bas. » (Le parasite est à l'étape 9.) |

### 2.5 Le lien sous-entendu derrière le deux-points (moyenne)

Deux faits sont posés de part et d'autre d'un deux-points ou d'un point-virgule, et le lecteur doit deviner le lien :
une cause, une conséquence, une condition. À voix haute, on dirait « parce que », « donc », « alors que », « sinon » ;
à l'écrit, on met deux-points. C'est la mesure « fait : conséquence » (23,7 à 26,0 % des phrases du lot) et le
paragraphe du monoxyde que JP a trouvé sans tempo.

Fréquence : deux-points à 14,5 à 18,9 pour 1000 mots contre 0,4 à 4,9 dans les textes techniques ; « donc » et « parce
que » ensemble à 2 à 3 pour 1000 mots. Environ une phrase sur quatre.

Cause : la règle 2 du skill `ecriture`, dont l'exemple enseigne le deux-points comme lien (« Vidanger avant que la
maison descende sous 5 °C : un tuyau plein fend en gelant. ») ; la section « Le tiret » du même skill, qui donne le
deux-points comme remplaçant du tiret ; la ligne « La justification collée au geste » (« Ne pas rester dans l'auto :
la tôle n'arrête rien » devient « Entrer dans un bâtiment »), qui fait couper le « parce que » ; et la ligne
« « C'est… qui / que » de mise en relief », qui fait couper le « c'est » parlé. Au ch. 3, après la passe qui a appliqué ces
lignes, « c'est » est tombé de 4,9 à 0,5 pour 1000 mots et « parce que » de 1,6 à 0,4.

| fichier | ligne | citation | réécriture |
| --- | --- | --- | --- |
| 48 | 55 | « **Le lièvre normal peut être porteur** : la méthode s'applique à chaque prise, sans tri à l'œil. » | « Un lièvre qui a l'air normal peut porter la bactérie. On prend donc les mêmes précautions avec chaque prise, sans essayer de trier à l'œil. » |
| 52 | 64 | « Sa larve, enkystée dans la fibre, ne donne ni odeur, ni couleur, ni lésion : chaque ours se traite comme porteur. » | « La larve vit enfermée dans la fibre du muscle et ne donne ni odeur, ni couleur, ni lésion. Comme on ne peut pas la voir, on traite chaque ours comme s'il la portait. » |
| 48 | 193 | « ou **-18 °C ou moins** dans la cache d'hiver (ch. 73) — le congélateur est à la maison du village, et une prise de janvier n'y descend pas. » | « ou à -18 °C ou moins dans la cache d'hiver (ch. 73). Le congélateur est resté à la maison, en ville : une prise de janvier va donc à la cache. » |
| 57 | 21 | « Un lac se repêche ; un orignal ne se retue pas. » | « On peut retourner pêcher au même lac aussi souvent qu'il le faut, alors qu'un orignal, on ne le tue qu'une fois. » |
| 57 | 117 | « La manipulation hors de l'eau se limite à **moins de 15 secondes** : peser, mesurer, admirer et délibérer prennent plus que ça. Un poisson dont on hésite est un poisson qu'on remet. » | « Un poisson qu'on remet à l'eau doit rester moins de 15 secondes dehors, et ça prend plus de temps que ça pour le peser, le mesurer, l'admirer ou se décider. Donc, quand on hésite, on le remet. » |

### 2.6 La phrase-valise : trop de faits dans une phrase (moyenne)

Une seule phrase porte quatre ou cinq faits, tenus ensemble par des tirets, des parenthèses, des points-virgules et
des participes. Ce n'est pas du délayage : c'est de la compression par empilement, et le lecteur perd le fil avant la
fin. La ligne « En une ligne » des trois chapitres en est une, imposée par le gabarit.

Fréquence : 40 phrases de 45 mots et plus dans le lot (4,8 %), dont 3 de plus de 80 mots ; 19,7 % des phrases à
30 mots et plus, contre 17,3 % pour le livre.

Cause : `gabarit-chapitre.md`, section 1 : « Ce que la technique fait, et combien de temps elle fait durer l'aliment
ou la solution. **Une phrase. Pas deux.** » ; la règle 5 de `CLAUDE.md` (« Écrire dense ») qui pousse à coudre deux
phrases en une plutôt qu'à en ajouter une ; et la règle 1 du skill (« Une phrase, une information ») qui n'est pas
appliquée parce qu'elle allonge le texte.

| fichier | ligne | citation | réécriture |
| --- | --- | --- | --- |
| 48 | 12 | « Le lièvre d'Amérique (*Lepus americanus*) est la seule viande fraîche que la forêt boréale donne tout l'hiver sans munition, sans moteur et sans s'éloigner du chalet — de 1,2 à 1,6 kg sur pattes par prise — et c'est aussi le seul gibier d'ici dont la simple manipulation, avant toute cuisson, peut mettre quelqu'un à l'hôpital. » | « Le lièvre d'Amérique est la seule viande fraîche que la forêt boréale donne tout l'hiver sans munition, sans moteur et sans s'éloigner du chalet ; une prise pèse de 1,2 à 1,6 kg sur pattes. C'est aussi le seul gibier d'ici qui peut rendre gravement malade la personne qui le manipule, avant même la cuisson. » |
| 57 | 11 | « Prendre au lac l'omble de fontaine (truite mouchetée) et le touladi (truite grise), puis les amener du bord de l'eau au froid — 0 à 4 °C jusqu'à la transformation, -18 °C ou moins pour l'hiver — assez vite pour que la chair vaille encore le déplacement, sachant qu'un poisson perd en quelques heures ce qu'un quartier d'orignal met une journée à perdre. » | « Pêcher l'omble de fontaine (la truite mouchetée) et le touladi (la truite grise) dans les lacs, et les mettre au froid vite, parce qu'un poisson perd en quelques heures ce qu'un quartier d'orignal met une journée à perdre. On les garde entre 0 et 4 °C jusqu'à ce qu'on les transforme, et à -18 °C ou moins pour l'hiver. » |
| 57 | 143 | « **Trier à l'arrivée selon la destination**, et pas selon la taille : ce qui se mange bientôt reste au frigo à **0 à 4 °C**, et pas plus de **1 à 2 jours** cru, 5 à 7 jours une fois cuit ; ce qui passe l'hiver descend à **-18 °C ou moins**, où la durée ne change plus la salubrité, seulement le goût ; ce qui s'en va au sel ou au fumoir part **tout de suite** vers le ch. 76 ou le ch. 77, pas le lendemain. » | « **Trier les poissons à l'arrivée selon ce qu'on va en faire**, pas selon leur taille. Le poisson qu'on mange bientôt va au frigo, entre 0 et 4 °C, et on le mange en 1 à 2 jours cru, ou en 5 à 7 jours une fois cuit. Le poisson qui doit passer l'hiver va au congélateur, à -18 °C ou moins ; là, le temps change le goût, pas la salubrité. Le poisson qui va au sel ou au fumoir y passe tout de suite, pas le lendemain (ch. 76, ch. 77). » |
| 57 | 400 | « L'hiver, l'eau se coule dans des chaudières et les blocs démoulés s'empilent **serrés** en cube dans une fosse drainée, creusée à l'ombre du côté nord, les joints bouchés à la neige damée — jamais de bran de scie entre les rangs —, sur 30 cm de bran de scie sec (ch. 73), avec 30 cm autour et dessus (60 cm s'il faut du foin ou de la paille). » | « L'hiver, couler l'eau dans des chaudières et démouler les blocs. Creuser une fosse drainée à l'ombre, du côté nord, et y étendre 30 cm de bran de scie sec (ch. 73). Empiler les blocs serrés, en cube, et boucher les joints avec de la neige damée, jamais avec du bran de scie. Couvrir le tas de 30 cm de bran de scie sur les côtés et dessus ; avec du foin ou de la paille, il en faut 60 cm. » |
| 48 | 184 | « En cas de contact cutané avec un animal suspect, la consigne est plus longue : **nettoyer la région à l'eau courante et au savon pendant au moins dix minutes**, puis surveiller pendant trois semaines : la tularémie peut suivre (§9). » | « Si la peau a touché un animal suspect, laver l'endroit à l'eau courante et au savon pendant au moins dix minutes. Ensuite, surveiller pendant trois semaines les signes de la tularémie (étape 18). » |
| 52 | 452 | « Un ours du début à la fin sans un seul produit du commerce : éviscérer, refroidir, dépouiller, détacher la nappe de gras, fondre le gras au chaudron sur le poêle à bois ou aux pierres chaudes, tordre les cretons, filtrer au linge ou par décantation, couler dans des contenants secs ; couper la viande mince et la faire bouillir à gros bouillons au fur et à mesure des repas ; hacher et sécher **ce qui a d'abord bouilli**, jamais du cru ; piler le sec et le lier au gras pour ce qui doit voyager. » | (rien) C'est le résumé de la section. S'il reste, il devient une liste, un geste par ligne : « 1. Éviscérer, refroidir et dépouiller l'ours. 2. Détacher la nappe de gras et la fondre au chaudron, sur le poêle à bois ou aux pierres chaudes. 3. Tordre les cretons, filtrer au linge ou laisser reposer et couler le clair, puis verser le gras dans des contenants secs. 4. Couper la viande mince et la faire bouillir à gros bouillons, au fil des repas. 5. Ne hacher et ne sécher que ce qui a d'abord bouilli, jamais du cru. 6. Pour ce qui doit voyager, piler la viande sèche et la lier au gras. » |

### 2.7 La phrase-écho : la consigne redite en formule (moyenne)

Après la consigne, une deuxième phrase la redit en tautologie ou en maxime : « Une ligne trop longue […] est une
ligne trop longue », « Un pemmican de viande d'ours crue séchée est un pemmican dangereux ». Elle n'apprend rien, et
elle donne au paragraphe le ton du proverbe que JP a refusé (« une sorte de tournure que je veux plus dans mon
livre »).

Fréquence : 17 dans le lot (11 attrapées par un motif simple, « Un X … est / reste un X … », que `controle.py` ne
cherche pas ; les autres à la lecture : « Le lièvre se cuit, point. », « Un gilet rangé sous le banc est un objet
décoratif », « Une glacière qu'on prépare après la première prise arrive toujours trop tard »).

Cause : l'habitude de la chute en formule. Le skill la fait sortir (« La chute en formule », « la maxime »), mais
`controle.py` ne repère que la forme « Un X qui… ne… plus », pas la tautologie « Un X … est un X ».

| fichier | ligne | citation | réécriture |
| --- | --- | --- | --- |
| 48 | 106 | « **Une ligne trop longue pour être relevée chaque matin est une ligne trop longue** : mieux vaut dix collets visités tous les jours que trente visités aux trois jours. » | « Ne poser que les collets qu'on peut relever chaque matin : mieux vaut dix collets visités tous les jours que trente visités aux trois jours. » |
| 48 | 508 | « Un lièvre malade sur une piste veut dire que la piste a été fréquentée par des lièvres malades. » | (rien) La phrase d'avant dit le geste : déplacer la ligne pour la saison. |
| 48 | 525 | « Le fumage à froid, par définition, ne monte pas à la température qui tue (ch. 70) : un lièvre fumé à froid est un lièvre cru et froid. Le lièvre se cuit, point. » | « Le fumage à froid ne chauffe pas assez pour tuer la bactérie (ch. 70) : il faut cuire le lièvre. » |
| 52 | 198 | « Un pemmican de viande d'ours crue séchée est un pemmican dangereux. » | (rien) La phrase d'avant dit de cuire la viande à 74 °C avant de la sécher. |
| 57 | 379 | « Une eau de bordure à l'ombre reste une eau tiède à l'ombre. » | « L'eau du bord reste tiède, même à l'ombre. » |
| 48 | 82 | « Une station montée à la noirceur avec un lièvre gelé dans une main est une station incomplète. » | (rien) Le titre de l'étape dit déjà de la monter avant d'en avoir besoin. |

### 2.8 L'insistance qui gonfle (basse)

« Exactement », « la seule … et la seule … », « sans exception », « point », « non négociables », « parfaitement » :
des mots qui pèsent sur la phrase sans rien dire de plus. Gravité basse parce qu'ils s'enlèvent sans toucher au sens ;
le risque est à la passe, qui coupe aussi le « seul » qui est un fait (« la seule barrière contre la trichinellose »).

Fréquence : 15 « exactement » (zéro dans les textes techniques de référence, sauf un chez Millet-Robinet) ;
23 « la seule / le seul » de superlatif, dont 5 phrases à deux « seul » ou « seule » ; 3 « sans exception » ; 2 « , point. ».

Cause : une habitude d'écriture. « Exactement » est dans la liste des mots vides du skill ; « la seule » ne l'est pas,
et ne doit pas l'être : il faut juger chaque cas.

| fichier | ligne | citation | réécriture |
| --- | --- | --- | --- |
| 52 | 24 | « parce que la viande et le gras d'une bête abattue par nécessité ont exactement la même valeur alimentaire et exactement le même parasite. » | « parce que la viande et le gras d'une bête abattue par nécessité nourrissent autant et portent le même parasite. » |
| 52 | 178 | « C'est la seule voie qui donne une viande d'ours stable hors du froid, la seule qui ne dépende d'aucune ligne d'Hydro, et c'est pour ces deux raisons la voie recommandée par ce chapitre. Une bête travaillée au chalet finit en pots. » | « C'est la seule façon de garder la viande d'ours hors du froid sans dépendre du courant : une bête travaillée au chalet finit donc en pots. » |
| 52 | 396 | « C'est la seule forme transportable, et la seule qui traverse un hiver sans caveau. » | « C'est la seule forme qu'on peut emporter en voyage et garder tout l'hiver sans caveau. » |
| 48 | 285 | « C'est pourquoi les gants imperméables sont non négociables, pourquoi la fourrure s'humecte avant d'être travaillée — la poussière soulevée s'inhale — et pourquoi un lièvre d'apparence parfaitement normale se manipule comme un lièvre malade » | « C'est pourquoi on porte toujours des gants imperméables, on mouille la fourrure avant de la travailler, parce qu'on respire la poussière qu'elle lâche, et on manipule un lièvre qui a l'air normal comme un lièvre malade. » |
| 57 | 461 | « Le réflexe vient du confit de viande et il est exactement à l'envers ici. » | « Le réflexe vient du confit de viande, et pour le poisson, il est à l'envers. » |

### 2.9 Le renvoi et la notation à la place du geste (basse)

Le lecteur est devant la bête, et le texte l'envoie ailleurs (« La conduite complète est à l'étape 13, et ce qu'on
fait de l'animal ensuite est à la section 9 »), ou lui parle en notation (« (→ §9 : faire bouillir) », « §8, bloc
1 »). Le renvoi court reste (CLAUDE.md le veut) ; ce qui gêne, c'est le renvoi qui remplace un geste de deux lignes,
la cascade de renvois, et la flèche qui tient lieu de phrase.

Fréquence : 119 renvois « ch. N » dans le lot (3,7 à 10,3 pour 1000 mots), 23 « § », 9 flèches « → » (8 dans le Matériel, 1 en tête de tableau), 10 parenthèses
qui alignent deux renvois ou plus.

Cause : l'ancien gabarit (`gabarit-chapitre.md`, Matériel : « Un substitut seulement s'il est vital, sinon
« (→ section 9) » ») ; la règle « Chaque chapitre parle de son sujet » appliquée en renvoyant au lieu de dire le geste
propre au chapitre.

| fichier | ligne | citation | réécriture |
| --- | --- | --- | --- |
| 48 | 123 | « La conduite complète est à l'étape 13, et ce qu'on fait de l'animal ensuite est à la section 9. » | « Ce qu'on fait de l'animal est à la section 9 (« Quand il n'y a personne à appeler »). » (L'étape 13 parle des organes ; elle ne sert pas devant le collet.) |
| 52 | 77 | « - **Thermomètre à sonde numérique** — seule vérification des 74 °C à cœur ; en avoir deux (→ §9 : thermomètre à sirop, multimètre). » | « - **Thermomètre à sonde numérique** : c'est la seule façon de vérifier les 74 °C à cœur ; en avoir deux. Sans lui, un thermomètre à sirop ou un multimètre fait l'affaire (section 9). » |
| 48 | 68 | « - **Thermomètre à sonde** — seul moyen de savoir que la cuisse a atteint 74 °C à cœur (→ §9 : faire bouillir). » | « - **Thermomètre à sonde** : c'est le seul moyen de savoir que la cuisse a atteint 74 °C à cœur. Sans thermomètre, faire bouillir le lièvre (section 9). » |
| 52 | 237 | « **Pour sortir : ch. 14 et 15.** » | « Pour faire sortir la personne malade, voir les ch. 14 et 15. » |
| 52 | 91 | « l'attente et la recherche sont au ch. 44 (étape 18 et §8, bloc 1). » | « pour l'attente et la recherche, voir le ch. 44, étape 18. » |

## 3. Ce qui marche (modèles)

Ces passages ont la densité qu'on cherche : un geste par phrase, avec son verbe ; le mécanisme dit avec ce qu'on voit
et ce qu'on fait ensuite ; des liens qui se disent (« donc », « parce que », « quand », « c'est ») ; des phrases
courtes et longues qui alternent. **Ce sont aussi les phrases que la passe risque d'abîmer** : leur « c'est » et leur
« donc » sont dans la liste de ce qu'elle coupe.

1. **48, l. 328 (le fil à collet).** « Un fil à collet fait trois choses : il garde une boucle ouverte tout seul, il
   coulisse sans plier quand la bête entre dedans, et il encaisse le coup sec d'un animal qui part d'un bond. C'est
   le deuxième point qui décide. Un fil qui garde le pli qu'on lui donne ne se referme pas : la boucle se casse en
   angle, elle reste ovale, et l'animal passe. » Pourquoi : chaque membre de la liste a son verbe et se lit avec le
   début de la phrase ; « C'est le deuxième point qui décide », phrase courte entre deux longues, dit au lecteur où
   regarder ; l'échec se voit (la boucle en angle, ovale). La ligne « « C'est… qui » de mise en relief » du skill
   ferait couper cette phrase courte : il ne faut pas.
2. **48, l. 412 (dépouiller sans couteau).** « Pincer la peau au milieu du dos entre le pouce et l'index des deux
   mains, la soulever et l'ouvrir en tirant les deux prises en sens contraire. Agrandir le trou en travers jusqu'à
   faire un anneau complet autour de l'animal. Tirer ensuite les deux moitiés en sens opposé, comme deux manches qu'on
   retourne : la peau sort en deux morceaux, l'arrière avec les pattes, l'avant avec la tête. » Pourquoi : une
   phrase par geste, à l'infinitif, dans l'ordre, avec où mettre les mains et ce qu'on voit à la fin ; la seule image
   (« comme deux manches qu'on retourne ») est un geste que tout le monde a fait, pas une décoration.
3. **52, l. 158 (la fin du rendu).** « **Lire la fin du rendu sur le chaudron, pas sur une horloge.** Le
   bouillonnement fin et continu, c'est l'eau qui s'en va ; quand il cesse et que la surface devient calme et claire,
   l'eau est partie. Les cretons tombent au fond et brunissent : c'est le signal d'arrêt. » Pourquoi : le signe
   observable remplace le chiffre ; « c'est l'eau qui s'en va » se dit à voix haute ; le deux-points sert ici à
   nommer ce qu'on voit, pas à cacher un lien.
4. **57, l. 331 (viser sous le poisson).** « Le poisson est plus creux qu'il ne paraît : la lumière qui sort de l'eau
   se casse à la surface, et l'œil place le poisson plus haut qu'il n'est. On frappe donc sous le poisson qu'on voit,
   d'autant plus bas qu'il est creux. Le remède le plus simple est de se placer au-dessus de lui : une lumière qui
   traverse la surface à la verticale ne se casse pas, le poisson est juste sous son image, et la foène poussée droit
   vers le bas passe dessus. » Pourquoi : le mécanisme vient d'abord, le geste suit avec « donc », puis la façon de
   corriger ; c'est le modèle de « chaque mécanisme dit ce qu'il change à l'étape », et le mot de la région
   (« creux ») est celui qu'on dit.
5. **57, l. 413 (vider par les ouïes).** « on pince l'ensemble des branchies et on tire d'un coup ferme vers l'arrière
   et vers le bas. Les branchies viennent avec l'œsophage, et les viscères suivent d'un bloc parce qu'ils y sont
   attachés. Le ventre reste fermé, ce qui limite le dessèchement et la saleté. » Pourquoi : « on » et deux verbes de
   geste, puis ce qui arrive dans la main, puis la raison avec « parce que » ; trois phrases, trois longueurs.

## 4. Ce que ce lot apprend pour le skill (propositions de mon regard)

- **Couper le délayage, pas le lien.** La passe doit enlever la méta, la citation de la source, la redite, la
  formule-écho et « exactement » ; elle ne doit pas enlever « parce que », « donc », « alors », « c'est… qui » quand ils
  portent le lien ou le tempo. La ligne « « C'est… qui / que » de mise en relief » du skill et la ligne « La
  justification collée au geste » sont à réécrire en conséquence : au ch. 3, après la passe, « c'est » est tombé de 4,9
  à 0,5 pour 1000 mots.
- **Le deux-points n'est pas un lien.** Quand le lien est une cause, une conséquence ou une condition, il se dit avec
  son mot. L'exemple de la règle 2 (« Vidanger… : un tuyau plein fend en gelant ») est à refaire avec « parce que ».
- **Les formats qui imposent une longueur imposent le télégraphe.** « Une phrase. Pas deux. » (En une ligne), « 15 à
  20 mots » (Matériel), « 120 mots au plus » (l'ancien Pourquoi ça marche), les cases de tableau : chacun donne une
  forme où le verbe et le lien sont les premiers à sauter. L'exemple de Matériel « porte les 74 °C à cœur. Ne se
  fabrique pas. » est lui-même un télégraphe : il faut un exemple avec un sujet et un verbe.
- **La passe d'éditeur ne fait que couper** (`/polir` : « couper, regrouper, remettre l'ordre naturel. Ne rien ajouter
  qui n'était pas dans le texte »). Elle doit avoir le droit d'ajouter un mot de liaison, un sujet, un verbe, un
  article : ce n'est pas un fait neuf.
- **Des auditeurs mesurables pour ce regard**, à lancer avant et après chaque passe : deux-points, parenthèses,
  « c'est », « parce que », « donc » pour 1000 mots (une passe qui fait baisser les liens ou monter les parenthèses
  s'arrête et se relit) ; la tautologie « Un X … est un X » ; les phrases sans verbe hors titres ; la méta (« le
  livre », « ce chapitre », « la consigne », « en clair ») ; les citations entre guillemets de plus de dix mots.

## 5. Hors de mon regard (vu en passant, non jugé)

Le lot est encore au gabarit à neuf sections ; il porte environ 130 tirets, 23 « § », des consignes au pronominal
(« se jette », « se cuit »), « la maison du village » (48 l. 8, 194), l'âge de « 4 et 6 ans » hors des cas où il change
le geste, et des renvois à un médecin et à un laboratoire. Ces points relèvent des autres regards et de la grande
passe.

## 6. Liste de contrôle (ma partie de `.claude/cadre-agents.md`)

Pour tout agent
- [x] `CLAUDE.md` chargé, pas relu.
- [x] Skill `ecriture` lu au complet avec ses tableaux ; `gabarit-chapitre.md` et le skill `editeur` lus par plages.
- [ ] Points de la PAUSE du 15 octobre : pas lus, l'audit ne modifie aucun chapitre.
- [x] Règle 1 : aucun fait ni chiffre neuf dans les réécritures ; une lecture incertaine est signalée (52, l. 67).
- [x] Rien de commité.
- [x] Jetons : un lot précis, trois chapitres lus, sorties de commande coupées.

Le texte (skill `ecriture`)
- [ ] Sept sections : sans objet pour un audit ; noté que le lot est encore au gabarit à neuf.
- [x] Règle 0 : chaque réécriture lue à voix haute ; un verbe de geste, on sait qui le fait, les articles.
- [x] Pas de loi en formule ni de paraboles : c'est le défaut 2.1 ; aucune réécriture n'en porte.
- [x] Pas de « X passe là où Y ne passe pas ».
- [x] Pas de maxime, de chute, d'opposition fabriquée ni d'image : défaut 2.7 ; réécritures sans.
- [x] Pas de chose qui pense ou qui décide : « la cuisse décide », « le centre décide » réécrits.
- [x] Aucune consigne au pronominal dans les réécritures (« la cuire et la manger, ou la jeter »).
- [x] La consigne se dit comme une consigne ; le sujet se nomme (« Ceux qu'on mange » corrigé).
- [ ] Points de contrôle à 5 à 8 lignes : hors de mon regard (tableaux du lot à 10 à 13 lignes).
- [ ] Pages des dangers : pas dans le lot.
- [x] Un passage se juge d'abord : dix réécritures sont « (rien) ».
- [ ] Passe d'éditeur : sans objet.
- [x] Le chapitre parle de son sujet : renvois jugés (défaut 2.9).
- [ ] Notion expliquée dès sa première apparition : hors de mon regard.
- [ ] « Quand l'utiliser » en titres de situation : hors de mon regard.
- [x] Qui fait quoi, quand et pourquoi, sans détour.
- [x] Le mot qu'on dit : « se gâte », « bactéries » pour « flore », « on a le ventre plein et on maigrit ».
- [x] On nomme la chose : « le bouchon de vidange », « le foie », « la larve ».
- [x] Mots de tous les jours : « enkystée », « cavité », « humecté » remplacés.
- [x] Aucun tiret dans les réécritures (`controle.py` : 0) ; « section 8 », jamais « § ».
- [ ] Titres de sous-sections : pas touchés.
- [x] Aucune tournure du 18 octobre dans les réécritures.
- [x] Sous-étapes : les valises du ch. 57 (l. 143 et 400) découpées en gestes.
- [x] Inventaire des faits : tableau des redites, section 1.
- [x] Un nom ne revient pas à chaque phrase, sauf « le poisson » au tri, en parallèle voulu.
- [x] `controle.py` sur les réécritures : 0 tiret ; « Ceux qu'on » et « Prendre au lac » corrigés ; les mots vides
  signalés sont gardés quand ils veulent dire quelque chose (« tout de suite », « tout l'hiver », « bien cuit »).

La langue (skill `langue`)
- [x] `langue.py` avec LanguageTool sur les réécritures : 7 avis jugés ; le double « ou » corrigé ; « VFI »,
  « touladi », « mieux vaut dix collets visités » et « la seule forme qu'on peut » (un fait, donc l'indicatif) jugés
  justes.
- [x] Relu phrase par phrase : « que » et « qui », participes, accords, pronoms.
- [x] Français correct, mots du Québec, ni joual ni anglicisme.
- [x] Pas deux « ou » l'un dans l'autre.
- [ ] Note dans `suivi/NN-redaction.md` : sans objet, aucun chapitre touché.
