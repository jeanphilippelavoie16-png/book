# Audit de l'écriture : la densité, lot E (tome 4 : salaison à sec, fumage à froid, conserves)

28 octobre 2026. Un seul regard : la densité, trop compressé ou trop délayé. D'un côté le télégraphe (la phrase sans
verbe, la liste de noms, l'étiquette, le lien logique coupé, le sous-entendu qui oblige à relire) ; de l'autre le
remplissage (la redite, l'insistance, la phrase qui parle du livre). Lot lu au complet : `chapitres/68-salaison-a-sec.md`,
`chapitres/70-fumage-a-froid.md`, `chapitres/78-conserves-et-marinades.md`. Aucun fichier du livre n'a été modifié.

Les citations sont mot pour mot ; seuls les astérisques du markdown (gras, italique) sont enlevés. Le numéro est celui de
la première ligne citée. Les réécritures sont des exemples : aucun fait ni chiffre neuf, aucun tiret ; elles ne règlent
que la densité (le tiret, le « § », le gabarit et les autres regards restent à leurs auditeurs).

**L'état du lot.** Les trois chapitres datent de septembre (commit `bc816f4f` du 12 octobre, rien depuis sauf le retrait
du 00b au ch. 78). Ils n'ont passé ni par le skill `ecriture` (156 tirets dans le texte d'après `controle.py` : 44, 58,
54), ni par l'éditeur, ni par le correcteur, et ils suivent l'ancien gabarit en neuf sections (§3 « Pourquoi ça marche »,
§8 « Danger »). **Deux sections seulement ont été compressées**, le 27 septembre : le §3 et le §4
(`suivi/68-redaction.md` l. 306-307, `suivi/70-redaction.md` l. 418, `suivi/78-redaction.md` l. 305). Le lot est donc une
expérience toute faite : on y voit côte à côte ce que la règle de couper a produit (§3, §4) et l'écriture d'origine
qu'elle n'a pas encore touchée (§2, §5, §8, §9).

**En une phrase : le lot est dense en faits et mal réparti en mots.** Il dépense ses mots en insistance, en redites et en
phrases sur le livre, et il économise ceux qui font une phrase française : le sujet, le verbe, « pour » et « si ». Là
où la compression est passée (§3, §4), il ne reste qu'un télégraphe de lois et d'étiquettes. Le remède n'est ni
« couper plus » ni « allonger » : c'est déplacer les mots, de l'insistance vers le lien.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 68 | 5055 | 306 | 16,5 | 0,74 | 24,8 | 16,0 | 19,3 | 25,8 | 19,9 | 3,0 | 5,3 | 5,1 | 5,9 |
| ch. 70 | 5771 | 302 | 19,1 | 0,69 | 20,5 | 21,9 | 21,6 | 33,8 | 25,8 | 3,8 | 6,2 | 5,2 | 5,0 |
| ch. 78 | 5401 | 316 | 17,1 | 0,73 | 21,5 | 16,8 | 15,6 | 30,4 | 24,4 | 1,5 | 7,8 | 5,6 | 6,0 |
| **le lot** | 16227 | 924 | 17,6 | 0,72 | 22,3 | 18,2 | 18,9 | 30,0 | 23,4 | 2,8 | 6,5 | 5,3 | 5,6 |

### Les marques de densité, comparées aux textes techniques de référence

Script de travail (dans le dossier de travail de la session, hors dépôt), sur le texte nettoyé par `tempo.py` (tableaux,
titres et pictogrammes enlevés ; les renvois « ch. N », « étape N » enlevés pour compter les chiffres). Les quatre
textes techniques sont ceux de `plan/audit-ecriture/references/` (fiches de l'Alberta, Ripley 1946, Millet-Robinet,
guide de survie de Wikilivres), comptés avec le même script.

| pour 1000 mots | ch. 68 | ch. 70 | ch. 78 | **lot** | 4 réf. techniques |
| --- | --- | --- | --- | --- | --- |
| Chiffres (hors renvois, hors tableaux) | 29,1 | 15,8 | 18,1 | **20,7** | 11,0 |
| Deux-points | 15,6 | 17,7 | 17,8 | **17,1** | 2,2 |
| « c'est » | 5,9 | 6,8 | 7,0 | **6,6** | 1,0 |
| « pour » (le but) | 2,2 | 3,1 | 3,3 | **2,9** | 11,6 (la plus basse : 8,4) |
| « si », « s'il » (la condition) | 2,0 | 1,7 | 3,0 | **2,2** | 4,9 |
| « mais » | 0,8 | 0,7 | 0,9 | **0,8** | 1,4 |
| « parce que » | 1,0 | 0,9 | 0,7 | **0,9** | 0,2 |
| « donc » | 1,0 | 1,2 | 1,3 | **1,2** | 0,9 |
| « quand » | 0,6 | 1,4 | 2,6 | **1,5** | 0,2 |
| « jamais » | 2,8 | 5,4 | 1,9 | **3,4** | |

### Les sections compressées contre les autres

| section | ch. 68 : mots, m/phr, « : » % | ch. 70 | ch. 78 | « pour » / « parce que » / « quand » dans la section, les trois chapitres |
| --- | --- | --- | --- | --- |
| §1 En une ligne | 50 mots, **1 phrase** | 76 mots, **1 phrase** | 48 mots, **1 phrase** | 1 / 0 / 0 |
| §3 Pourquoi ça marche (compressé) | 100, 25,0, **75 %** | 110, 22,0, 20 % | 99, 19,8, **60 %** | **0 / 0 / 0** |
| §4 Matériel (compressé) | 86, 9,6, 11 % (+ 6 tirets) | 113, 18,8, **83 %** | 130, 10,8, 25 % (+ 7 tirets) | 2 / 0 / 0 (aucun « pour » qui dit le but) |
| §5 Procédure | 1137, 11,7, 20 % | 1965, 17,4, 28 % | 1255, 12,2, 16 % | 19 / 3 / 6 |
| §9 Variante d'urgence | 2372, 20,4, 29 % | 2211, 22,1, 42 % | 2159, 20,2, 36 % | 16 / 8 / 13 |

Le §9 du ch. 68 (2 372 mots, presque la moitié du chapitre) n'a **pas un seul « pour »**.

### Les faits les plus redits (inventaire par idée, pas par mots)

| chapitre | fait | lignes |
| --- | --- | --- |
| 68 | la chambre qui dépasse 15,6 °C | 43, 82, 133, 211, 237, 303, 380, 435 (8) |
| 68 | le salpêtre n'est pas un sel de salaison | 291 à 300, 486 à 487 |
| 68 | 74 °C, « thermomètre planté dans la partie la plus épaisse » | 199, 507 (mot pour mot) |
| 68 | le fumage ne conserve pas à lui seul | 60, 479 |
| 70 | le monoxyde ne se voit pas, ne se sent pas | 74, 201 à 203, 313 à 324, 483 à 487 (4 places) |
| 70 | jamais adossé au chalet, sous un auvent, dans un hangar | 133 à 135, 321 à 322, 484 à 486 (3) |
| 70 | le mécanisme du salpêtre ; « aucune quantité de salpêtre » | 103 à 112 et 326 à 336 (presque mot pour mot) ; 109, 334, 445 |
| 70 | le plafond de 32 °C | 71, 73, 119, 185, 199, 244, 353, 401 (8) |
| 70 | le gel de -20 °C pendant 168 h | 43, 76, 96, 241, 409, 412, 415, 479 (8) |
| 78 | la pression qui baisse fait recommencer le compte | 158, 179, 239, 241, 267, 386, 398 (7) |
| 78 | le manomètre faussé (la purge, le ressort) | 170 à 172, 240, 423 à 425 |
| 78 | « un rond de cuisinière se règle une fois et tient » | 180, 397 |

`controle.py` relève de son côté 11, 32 et 3 « redites » (suites de mots), 10, 9 et 10 « mises en relief et
oppositions », 3, 1 et 2 « maximes ».

### Les « mots vides » de `controle.py`, lus un par un (ch. 68)

Le script en relève 56 au ch. 68 (46 au ch. 70, 52 au ch. 78). Lus un par un au ch. 68 : **47 portent un sens** (le
moment, la quantité, l'ordre des gestes : « déjà cuite », « encore humide », « le sel n'est pas encore arrivé »,
« tous les deux jours », « tout de suite », « tout un hiver ») ; **6 sont vraiment vides** (« exactement » trois fois,
« d'ailleurs » deux fois, « justement » une fois) ; **3 sont de l'insistance** (« du tout » deux fois, « déjà peu »).

### Ce que les chiffres disent

- **Le lot porte beaucoup de faits** : 20,7 chiffres pour 1000 mots, presque le double des textes techniques de
  référence (11,0) ; le ch. 68 (29,1) dépasse Ripley, un manuel de défrichage plein de mesures (22,3).
- **Ce qui manque, c'est le but et la condition, pas la cause.** « Parce que », « donc » et « quand » sont aussi
  fréquents ou plus que dans les références ; « pour » l'est quatre fois moins, « si » deux fois moins. Le
  deux-points (huit fois plus que les références) et « c'est » (six fois plus) prennent leur place : « Trop chaud, on
  rallonge » au lieu de « Si la fumée arrive trop chaude, on rallonge le conduit » ; « Thermomètre à sonde : porte les
  74 °C » au lieu de « pour vérifier que la viande atteint 74 °C ».
- **La compression concentre le télégraphe.** Les §3 compressés n'ont aucun « pour », aucun « parce que », aucun
  « quand », et jusqu'à 75 % de leurs phrases ont un deux-points. Les sections qui n'ont pas été compressées (§5, §9)
  ont leurs liens, et c'est là qu'on trouve les passages qui marchent (section 3 de ces notes).
- **Le tempo a deux extrêmes**, et la densité les explique : 22 % de phrases de six mots et moins (titres d'étapes,
  formules, étiquettes) et 18 % de trente mots et plus (les « En une ligne » d'une seule phrase de 48 à 76 mots, les
  blocs de la variante). Le milieu, la phrase de 12 à 20 mots qui dit un geste et son but, manque.
- **Les mots que le lot dépense en trop** ne sont pas des mots vides : ce sont des phrases entières d'insistance
  (« jamais » 31 fois au ch. 70), de redite (le même chiffre à huit endroits) et de propos sur le livre (11, 13 et 17
  phrases).

## 2. Les défauts, du plus grave au moins grave

### Motif 1. Le but et la condition remplacés par le deux-points (haute)

Le deux-points tient lieu de « pour », de « si » et de « parce que » : on pose deux morceaux côte à côte et le lecteur
doit deviner le lien. C'est la même mécanique que le paragraphe du monoxyde : « fait : conséquence » sans le mot qui dit
pourquoi l'un mène à l'autre.

Fréquence : 17,1 deux-points pour 1000 mots (2,2 dans les références), 30 % des phrases ; « pour » 2,9 pour 1000
(11,6), « si » 2,2 (4,9). Aucun « pour » dans les trois §3 ni dans le §9 du ch. 68.

| où | le texte | réécriture |
| --- | --- | --- |
| 70, l. 119 | « Trop chaud, on rallonge ou on enterre. » | « Si la fumée arrive trop chaude, on rallonge le conduit ou on l'enterre. » |
| 68, l. 98 | « Un hématome au centre d'une pièce est de l'eau, du sang et un abri contre le sel. Il se taille au couteau et il se jette (ch. 23). » | « Un hématome au centre d'une pièce est plein d'eau et de sang, et le sel ne s'y rend pas. Il faut le tailler au couteau et le jeter (ch. 23). » |
| 70, l. 133 | « Jamais adossé au chalet, jamais sous un auvent fermé, jamais dans un hangar, jamais sous une fenêtre de chambre : un appareil à combustion ne s'utilise jamais dans une pièce, un abri ou un véhicule, et un fumoir est un abri. » | « Le feu du fumoir fait du monoxyde de carbone. On ne l'adosse donc pas au chalet, et on ne le met jamais sous un auvent fermé, dans un hangar ou sous une fenêtre de chambre : le gaz entrerait dans le bâtiment. » |
| 68, l. 470 | « Les mouches ne travaillent pas avant le dégel, ce qui règle la question du filet en janvier et la pose autrement : la pièce rentre avant le premier redoux. » | « En janvier, il n'y a pas de mouches, et on n'a pas besoin de filet. Elles reviennent au dégel : il faut donc rentrer la pièce avant le premier redoux. » |
| 78, l. 7 | « L'autoclave se fait à la maison, où le courant tient 70 kPa sans qu'on nourrisse un feu » | « On fait l'autoclave à la maison, parce que sur la cuisinière électrique la pression reste à 70 kPa sans qu'on ait à nourrir un feu » |
| 68, l. 457 | « une pièce qui dessale est une pièce à qui on retire sa barrière, et la réchauffer pendant qu'on la lui retire enlève les deux protections en même temps. » | « pendant qu'on la dessale, la pièce perd son sel, qui la protégeait ; si on la laisse se réchauffer en même temps, elle perd aussi la protection du froid. » |

Cause : la règle 5 de `CLAUDE.md` (« Écrire dense ») et sa mesure dans `plan/decisions-jp.md` l. 179 (« Environ
700 mots utiles par page ») : « pour » et « si » coûtent des mots, le deux-points n'en coûte pas. Le skill `ecriture`
pousse dans le même sens sans le vouloir : la règle 2 (« Le fait d'abord, la raison ensuite, et seulement si la raison
change ce qu'on fait ») a pour seul exemple une phrase bâtie sur le deux-points ; le tableau « Ce qui sort » apprend à
couper ce qui suit le deux-points (« La justification collée au geste », « La justification que le lecteur connaît déjà,
après les deux-points »), jamais à remplacer le deux-points par le mot qui dit le lien. Et la section « Le tiret » met
« les deux-points » en tête des remplaçants : avec 156 tirets dans le lot, dont beaucoup cachent « donc »,
« c'est-à-dire » ou « parce que », la passe qui vient ajoutera des deux-points si la règle ne dit pas de remettre le mot.

### Motif 2. La formule qui cache le fait (haute)

Une consigne ou une conséquence serrée en maxime : « X n'est pas Y, c'est Z », « X ne fait pas Y, il fait Z », la
chute en paradoxe. C'est à la fois trop compressé (le fait reste à deviner : que veut dire « il arrête », « se paie
autrement », « l'appareil peut ») et délayé (la formule redit souvent la consigne qu'on vient de lire). Le lecteur relit
pour décoder, et il ne sait pas plus quoi faire.

Fréquence : « c'est » 6,6 pour 1000 mots (1,0 dans les références) ; 14 tournures « n'est pas X, c'est Y » au script de
travail (10 au ch. 68) ; `controle.py` : 29 mises en relief et oppositions, 6 maximes dans le lot.

| où | le texte | réécriture |
| --- | --- | --- |
| 68, l. 95 | « Le sel n'assainit pas, il arrête. » | « Le sel ne répare pas une viande qui a commencé à se gâter : il la garde dans l'état où elle est quand on la sale. » |
| 68, l. 116 | « Sans nitrite, 2,5 % n'est pas un plancher, c'est un pari. » | « Ce minimum de 2,5 % ne vaut que si le mélange contient du nitrite. Sans nitrite, on ne descend pas à 2,5 %. » |
| 70, l. 187 | « on tue les bactéries ordinaires qui auraient gâté le poisson, à l'odeur, avant que la toxine se forme : on enlève l'alarme et on garde le danger. » | « on tue les bactéries ordinaires qui, en gâtant le poisson, l'auraient fait sentir mauvais avant que la toxine se forme. Le poisson ne sent plus rien, et le botulisme, lui, n'a pas été touché. » |
| 70, l. 192 | « Une séance interrompue ne se paie qu'en goût ; une séance tiède se paie autrement. » | « Une séance arrêtée trop tôt donne seulement moins de goût. Une séance où la chambre reste tiède laisse les bactéries se multiplier. » |
| 70, l. 414 | « le pot dit que l'appareil peut, il ne dit jamais qu'il a tenu. » (et l. 416 : « Le pot sert à disqualifier un appareil, jamais à en qualifier un. ») | « Le pot montre que le congélateur est capable de descendre sous -20 °C, pas qu'il est resté à cette température 168 heures de suite. Un pot encore en bouillie veut dire que l'appareil ne sert pas au gel antiparasitaire ; un pot gelé dur ne suffit pas à dire qu'il sert. » |
| 78, l. 438 | « Ce n'est pas de la prudence, c'est de l'arithmétique : un barème appliqué à une pression inconnue n'est plus un barème. » | « Quand on ne connaît pas la pression réelle, on ne sait pas à quelle température les pots ont chauffé, et le temps du barème ne veut plus rien dire. » |

Cause : une habitude d'écriture du rédacteur (le ch. 68 est le chapitre pilote, `suivi/68-redaction.md` l. 10), que la
règle de densité récompense : une formule de six mots coûte moins qu'une phrase de vingt. Le skill `editeur` l'encourage
aussi : « alterne phrases courtes (percutantes) et phrases longues » (`.claude/skills/editeur/SKILL.md` l. 21) ;
« percutante » appelle la chute. Le skill `ecriture` interdit déjà la chute en formule, l'opposition fabriquée et la
maxime (tableau « Les phrases », tableau du 15 octobre ; cadre l. 95 à 99 et 142 à 146), mais le tome 4 n'est jamais
passé par lui.

### Motif 3. Le « Pourquoi ça marche » compressé en lois (haute)

C'est la trace la plus nette de la règle de couper. Le 27 septembre, les §3 sont passés de 562 à 87 mots en deux passes (ch. 68) et
de 430 à 116 (ch. 70) ; au ch. 78, le §3 et le §4 ensemble sont passés de 1 677 à 243 mots. Ce qui reste est le paragraphe en paraboles que le skill interdit :
des lois posées l'une après l'autre, chacune seule, sans renvoi à l'étape où elles servent, avec des sous-entendus
(« avant, c'est le froid qui la tient », « une seule des deux barrières ne fait pas le travail des deux »), un « d'où »
et un « thermomètre » qui n'en est pas un.

Fréquence : les trois §3 (309 mots en tout) : aucun « pour », aucun « parce que », aucun « quand » ; deux-points dans 75 %
des phrases au ch. 68 et 60 % au ch. 78.

| où | le texte | réécriture |
| --- | --- | --- |
| 78, l. 80 | « Une conserve retire l'oxygène, et c'est justement ce qui réveille la spore de Clostridium botulinum : le vide seul n'est pas une protection, c'est le danger. Cette spore survit à l'eau bouillante. Il reste donc deux sorties : acidifier sous pH 4,6, où elle ne germe pas, ou chauffer au-dessus de 100 °C, où elle meurt. À l'air libre, l'eau ne passe jamais 100 °C, quel que soit le temps : seule la pression de l'autoclave la fait bouillir plus chaud, et la pression est le thermomètre du procédé. En altitude, la même pression lue chauffe moins, d'où le barème corrigé. » | « Quand on ferme un pot, on en retire l'oxygène, et c'est justement sans oxygène que la spore du botulisme peut germer. Cette spore survit à l'eau bouillante. Il reste deux façons de s'en protéger : rendre l'aliment assez acide (pH sous 4,6) pour qu'elle ne germe pas, ou le chauffer au-dessus de 100 °C pour la tuer. Dans une marmite ouverte, l'eau ne dépasse jamais 100 °C, même si on la fait bouillir longtemps ; seule la pression de l'autoclave la fait bouillir plus chaud. C'est pour ça qu'on surveille la pression : elle dit à quelle température sont les pots. En altitude, la même pression donne une température plus basse, et c'est pour ça qu'on prend le barème corrigé (étape 18). » |
| 68, l. 67 | « Ce qui compte n'est pas la quantité de sel mais l'eau qui reste disponible aux bactéries, l'activité de l'eau ou aw : sous 0,85, la pièce tient sans froid ; avant, c'est le froid qui la tient. Le sel avance lentement, depuis l'extérieur : les jours se comptent au kilogramme, pas à la pièce. » | « Ce qui compte, plus que la quantité de sel, c'est l'eau qui reste libre pour les bactéries ; on l'appelle l'activité de l'eau, ou aw. Tant que l'aw est au-dessus de 0,85, il faut garder la pièce au froid ; en dessous, elle se garde sans froid. Comme le sel entre par l'extérieur et avance lentement, on compte les jours de salage au kilogramme de viande, et non à la pièce (étape 12). » |
| 68, l. 73 | « Le nitrite, lui, ne sèche rien : il freine les microbes et leurs toxines pendant que le sel avance, et une seule des deux barrières ne fait pas le travail des deux. » | « Le nitrite ne sèche pas la viande : il freine les microbes et leurs toxines pendant que le sel avance vers le centre. Il faut donc les deux, le sel et le nitrite (étape 6). » |
| 70, l. 64 | « Elle ne chauffe pas : la pièce sort aussi crue qu'elle est entrée, après un long séjour dans la zone de danger, entre 4 et 60 °C. Ce séjour n'est acceptable que si le sel a mis la pièce hors de portée avant qu'elle entre, et que le froid la reprend dès qu'elle sort. » | « La fumée ne cuit pas la pièce : elle en sort aussi crue qu'elle y est entrée, après être restée longtemps entre 4 et 60 °C, là où les bactéries se multiplient. C'est sans danger seulement si la pièce était bien salée avant d'entrer et si on la remet au froid dès qu'elle sort (étapes 1 et 18). » |

Cause : `plan/decisions-jp.md` l. 373 (« le "Pourquoi ça marche" tient en trois à cinq phrases », JP, 27 septembre 2026 :
« c'est long pour rien ») et la compression qui l'a appliquée (`suivi/68-redaction.md` l. 306-307, `suivi/70-redaction.md`
l. 418, `suivi/78-redaction.md` l. 305). La consigne fixait un nombre de phrases ; la compression a gardé les conclusions
et coupé les liens avec les étapes, les « pour » et les sujets. **Le risque qui vient** : le nouveau gabarit coupe le §3
(« Un mécanisme qui apprend quelque chose va dans l'étape qu'il explique », `CLAUDE.md`, « Le gabarit ») ; à la migration
du tome 4, ces formules risquent d'être collées telles quelles dans les étapes, alors qu'il faut les rebâtir avec le
geste et son but.

### Motif 4. La redite délayée (haute)

Le côté « trop délayé » du lot, et le plus coûteux en mots. Le même fait revient à quatre, sept ou huit endroits d'un
chapitre, souvent avec la même insistance, parce que l'ancien gabarit le redit dans chaque section (étape, points de
contrôle, signes d'échec, danger, variante). Chaque redite est plus courte que l'original, donc plus compressée : on finit
avec huit fois le même chiffre et une seule fois son mécanisme.

Fréquence : voir l'inventaire de la section 1 (15,6 °C 8 fois au ch. 68 ; 32 °C et -20 °C 8 fois chacun au ch. 70 ; le
compte qui recommence 7 fois au ch. 78 ; le salpêtre deux fois presque mot pour mot au ch. 70). `controle.py` : 11, 32 et
3 redites.

| où | le texte | réécriture |
| --- | --- | --- |
| 70, l. 483 | « L'avertisseur de monoxyde. Aucun montage, aucun témoin, aucun sens ne le remplace : le gaz «ne se voit pas et ne se sent pas » et «n'irrite pas les yeux ni les voies respiratoires ». Ce qui se substitue à l'appareil, c'est la géométrie et rien d'autre — foyer dehors, conduit dehors, fumoir jamais adossé au chalet, jamais sous un auvent fermé, jamais dans un hangar, personne qui dort sous le panache, et on n'entre jamais respirer dans la chambre pour voir si ça fume bien. » | « L'avertisseur de monoxyde. Rien ne le remplace. Sans lui, on place le fumoir comme à l'étape 9, personne ne dort sous la fumée, et personne n'entre dans la chambre (étape 19). » |
| 70, l. 326 | « Le salpêtre est du nitrate. «Les nitrates sont lentement convertis par l'action bactérienne en nitrite, qui est l'agent de saumurage actif ». Sa forme moderne équivalente est le sel de salaison du commerce, qui contient du nitrite déjà formé et dont l'étiquette déclare la teneur. » (la même chose qu'à l'étape 4, l. 103 à 108) | Dit une fois, à l'étape 4 ; ici : « Le salpêtre et le sel de salaison ne se dosent pas pareil (étape 4). » |
| 68, l. 133 | « Au-dessus de 15,6 °C, la salaison est terminée et la pièce est perdue — pas mise en attente, perdue. » (et l. 211, 237, 307) | À l'étape 9, une seule fois, avec son mécanisme (§8, point 5) : « Si la chambre dépasse 15,6 °C, il faut jeter la pièce, même si elle a l'air normale : une bactérie a pu y laisser une toxine, et le froid revenu ne l'enlève pas. » Ailleurs : « (étape 9) ». |
| 78, l. 397 | « Un rond de cuisinière se règle une fois et tient. Un poêle à bois ne tient pas, et un barème de peu acide ne pardonne pas : chaque creux sous la pression fait recompter le maintien au complet (§5.4, étape 19). » | « Sur un poêle à bois, la pression monte et baisse avec le feu (étape 19). Ce qui la garde égale, c'est la grosseur des morceaux et le rythme où on les ajoute, plus que la clé d'air. » |
| 68, l. 507 | « 4. Le cru. Rien de ce qui sort de cette caisse ne se mange sans cuisson. 74 °C à cœur, thermomètre planté dans la partie la plus épaisse. » (mot pour mot l. 199) | « 4. Le cru. Rien de ce qui sort de cette caisse ne se mange sans être cuit à 74 °C à cœur (étape 19). » (le rappel reste ; la façon de planter la sonde est à l'étape 19) |

Cause : l'ancien gabarit en neuf sections (`gabarit-chapitre.md`, « Neuf points »), où chaque section reprend les
cibles et les dangers ; et la règle des rappels de sécurité (« Ils se répètent dans chaque chapitre concerné […] on ouvre
le livre à une page, pas à la première », `CLAUDE.md`), que le rédacteur a appliquée à l'intérieur du chapitre. Le
ch. 68 le dit en toutes lettres à la l. 399 : « répétée ici parce qu'on n'ouvre pas ce livre à la première page ». Le
skill `ecriture` règle la question (« Un fait se dit une fois par chapitre ») ; le lot lui est antérieur.

### Motif 5. La phrase qui parle du livre, du chapitre ou de la façon de dire (moyenne)

Du remplissage pur : la phrase commente le tableau, l'encadré, le livre, ou la franchise de l'auteur, au lieu de dire
quoi faire. Le livre devient un personnage qui « ferme des portes », « ne certifie pas », « dit : cuite quand même ».

Fréquence : 11, 13 et 17 phrases (« livre », « chapitre », « encadré », « section », « tome » en prose, hors renvois) ;
« honnêtement », « sans adoucir », « sans détour », « en face » : 7 fois dans le lot. Dans tout le livre,
« honnêtement » est dans 41 chapitres et « Ce qu'on perd » revient environ 300 fois.

| où | le texte | réécriture |
| --- | --- | --- |
| 68, l. 45 ; 78, l. 52 | « Ce tableau ferme des portes. » ; « Ce tableau ferme des portes, et c'est l'essentiel de la section. » | *(rien : le titre « Les espèces, une par une » suffit)* |
| 68, l. 399 | « Et la limite qui ne se contourne pas, répétée ici parce qu'on n'ouvre pas ce livre à la première page : ni aluminium, ni fer galvanisé, ni cuivre. » | « Pas d'aluminium, de fer galvanisé ni de cuivre : la saumure les attaque, et ce qu'elle en tire reste dans la viande. » |
| 68, l. 484 | « Deux choses ne se refabriquent pas, et il vaut mieux les regarder en face que broder autour. » | « Deux choses ne se fabriquent pas au chalet : le nitrite et le thermomètre à sonde. » |
| 70, l. 496 | « Ce qu'on perd en tout, dit honnêtement. Dans cette version, le fumage à froid cesse d'être une technique de conservation et redevient ce qu'il est vraiment sans instruments : un traitement de surface — anti-mouches, antioxydant, goût — appliqué à une pièce que le sel et le froid conservent déjà. » | « Ce qu'on perd. Sans instruments, le fumage à froid ne traite que la surface : il éloigne les mouches, ralentit le rancissement et donne le goût. Ce sont le sel et le froid qui conservent la pièce. » |
| 78, l. 281 | « Le mécanisme, au complet, parce que c'est lui qui fait changer de comportement : la spore de Clostridium botulinum est «répandue dans la nature » » | « La spore du botulisme est répandue dans la nature » |
| 78, l. 380 | « Ce qui reste n'est pas une conserve dégradée : c'est un autre chapitre, et il commence par la seule chose qui se fabrique vraiment ici — la conduite d'un feu nourri à la main sous un appareil qui ne pardonne pas. » | « Il reste à conduire à la main le feu sous l'autoclave, sans laisser baisser la pression. » |

Cause : le gabarit lui-même. `gabarit-chapitre.md` l. 111 : « Nommer honnêtement ce qu'on perd en la choisissant […] Et
dire ce qui ne se remplace vraiment pas, sans broder autour. » La consigne au rédacteur est passée telle quelle dans le
texte (« nommé honnêtement », « dit honnêtement », « sans broder autour », « il vaut mieux les regarder en face que
broder autour », « nommé sans adoucir », « dit une fois et sans détour »). `CLAUDE.md` (« L'écriture ») et la première
ligne du tableau du skill `ecriture` interdisent la phrase qui parle du livre ; le lot leur est antérieur.

### Motif 6. Le télégraphe du Matériel et des cases de tableau (moyenne)

Là où la compression est passée en second (le §4, « resserrement au format validé par JP (une ligne par item) »,
`suivi/68-redaction.md` l. 307), le texte est devenu une suite de noms : des « + », des « = », des « → », « 2e », « alu »,
des participes sans sujet (« Dosé selon l'emballage »), et un verbe qui ne dit rien (« porte les 74 °C »). Les cases des
points de contrôle font la même chose avec « = » et « → ».

Fréquence : §4 : 6, 6 et 7 lignes de 13 à 21 mots ; deux « pour », et aucun ne dit le but (« pour le poisson
prêt-à-manger », « filet pour l'anneau ») ; « = » ou « → » : 8, 4 et 5 fois dans le lot.

| où | le texte | réécriture |
| --- | --- | --- |
| 68, l. 84 | « Sel nitrité — sel + nitrite de sodium, 2e barrière contre le botulisme. Dosé selon l'emballage. » | « Sel nitrité : du sel mélangé à du nitrite de sodium, qui ajoute une deuxième protection contre le botulisme. On le dose selon ce qui est écrit sur l'emballage. » |
| 68, l. 85 | « Contenant qui égoutte — plastique, inox ou grès ; ni alu, ni galvanisé, ni cuivre. » | « Contenant qui laisse égoutter : en plastique, en inox ou en grès, jamais en aluminium, en fer galvanisé ou en cuivre, que la saumure attaque. » |
| 68, l. 81 ; 78, l. 97 | « Thermomètre à sonde — porte les 74 °C à cœur. Ne se fabrique pas. » | « Thermomètre à sonde : pour vérifier que la viande atteint 74 °C à cœur. On ne peut pas en fabriquer un. » |
| 78, l. 94 | « Couvercles plats neufs — le joint ne se moule qu'une fois. Un couvercle servi ne ferme qu'un pot qui va au froid. » | « Couvercles plats neufs : leur joint ne se moule bien qu'une fois. Un couvercle qui a déjà servi ne sert plus que pour un pot qu'on garde au froid. » |
| 68, l. 215 et 216 | « Une zone molle au centre = sel non arrivé. » ; « Perte arrêtée tôt = croûte. » | « Si le centre est encore mou, le sel ne s'y est pas rendu. » ; « Si la pièce arrête de perdre du poids trop tôt, une croûte s'est formée. » |
| 78, l. 244 | « Non scellé → réfrigérateur, congélateur ou retraitement complet. Jamais la tablette » | « Si le pot n'a pas scellé, le mettre au réfrigérateur ou au congélateur, ou le traiter de nouveau au complet ; jamais sur la tablette. » |

Cause : `gabarit-chapitre.md` l. 42 à 50 (« une ligne par item, 15 à 20 mots : le nom en gras, puis ce qu'il fait ou ce
que c'est ») ; le « format validé » qu'il donne est lui-même télégraphique (« Sel nitrité : sel et nitrite de sodium,
deuxième barrière contre le botulisme. Dosé selon l'emballage. »), et l'exemple de `CLAUDE.md` (« Thermomètre à sonde :
porte les 74 °C à cœur. ») sert de modèle au verbe qui ne dit rien. La limite de mots n'est pas en cause : chaque
réécriture tient dans 15 à 25 mots ; c'est « le nom, puis ce qu'il fait » sans verbe ni « pour » qui fabrique le code.

### Motif 7. Les mots vides : six vrais, quarante-sept qui portent le moment (moyenne)

Le brief demandait si la règle des « mots vides » (déjà, encore, tout, bien…) avait coupé du sens. Dans ce lot, elle
n'est pas encore passée, et la lecture des 56 avis du ch. 68 montre ce qu'elle couperait : 47 portent le moment ou
l'ordre des gestes, c'est-à-dire la condition qui décide de la sécurité (« déjà cuite », « encore humide », « le sel
n'est pas encore arrivé », « perd encore de 10 à 15 % »). Le défaut actuel du texte est petit (six vrais mots vides) ; le
risque est dans la passe qui vient, sur les 112 chapitres.

Fréquence : `controle.py`, 56, 46 et 52 avis ; au ch. 68, 47 avis qui portent un sens, 6 vrais vides, 3 d'insistance.

| où | le texte | réécriture |
| --- | --- | --- |
| 68, l. 126 | « C'est exactement là que ça tourne. » | « C'est là que la viande commence à se gâter. » (« exactement » sort) |
| 68, l. 162 | « Une pièce qui sort de sa salaison est salée en surface et pas au centre, et la trancher à ce moment-là donne exactement l'impression trompeuse d'un produit fini. » | « À la sortie du sel, la pièce est salée en surface, pas au centre : si on la tranche à ce moment-là, on la croit prête alors qu'elle ne l'est pas. » (« exactement » sort) |
| 68, l. 296 | « Les deux apparaissent d'ailleurs séparément dans le plafond de dose, avec des chiffres différents (62 g contre 186 g par 100 kg). » | « Leurs doses maximales sont différentes : 62 g contre 186 g par 100 kg. » (« d'ailleurs » sort, et la trace de la source avec) |
| 68, l. 162 | « La pièce y perd encore de 10 à 15 % de son poids. » | « Pendant ce temps, elle perd encore de 10 à 15 % de son poids. » (« encore » reste : sans lui, on croirait que la perte totale est de 10 à 15 %, alors que l'étape 16 en demande au moins 18) |
| 68, l. 43 | « Une chambre qui dépasse 15,6 °C pendant que la pièce est encore humide. » | « La chambre a dépassé 15,6 °C pendant que la pièce était encore humide. » (« encore » reste : il dit dans quelle phase le danger compte) |
| 68, l. 256 | « c'est la définition exacte du centre d'une pièce épaisse où le sel n'est pas encore arrivé » | « c'est le cas du centre d'une pièce épaisse où le sel n'est pas encore arrivé » (« encore » reste ; « la définition exacte » sort) |

Cause : le tableau « Les mots » du skill `ecriture` (« Les mots vides : déjà, encore, tout, bien, vraiment… à couper quand
ils n'ajoutent rien ») et la section « Mots vides (à juger) » de `controle.py`, qui mettent sur la même liste des
adverbes d'insistance (exactement, justement, d'ailleurs) et des mots de temps et de quantité (déjà, encore, tout). Sous
la pression de « écrire dense », « à juger » devient « à couper ».

### Motif 8. La phrase-valise (moyenne)

Trop de faits dans une phrase, liés par « ce qui », « faute de quoi », un tiret ou un deux-points, au lieu de deux ou
trois phrases. Le cas le plus net est le « En une ligne », une seule phrase de 48 à 76 mots dans les trois chapitres.

Fréquence : §1 : 50, 76 et 48 mots en une phrase (moyenne du lot : 17,6) ; phrases de 30 mots et plus : 16,0 %, 21,9 % et
16,8 %.

| où | le texte | réécriture |
| --- | --- | --- |
| 70, l. 11 | « Le fumage à froid traite une pièce déjà salée avec de la fumée à une température qui ne provoque pas de coagulation des protéines : il assèche et assainit la surface, freine le rancissement et donne le goût, mais il ne conserve rien par lui-même — ce qui en sort reste une pièce crue, qui se garde à 4 °C ou moins et au plus 14 jours pour du poisson fumé réfrigéré, ou à -18 °C ou moins. » | « Le fumage à froid passe de la fumée sur une pièce déjà salée, sans la chauffer assez pour la cuire. Il sèche la surface, la protège des bactéries, ralentit le rancissement et donne le goût. Il ne conserve pas la pièce pour autant : elle sort crue, et il faut la garder à 4 °C ou moins (au plus 14 jours pour du poisson fumé), ou à -18 °C ou moins. » |
| 68, l. 17 | « La salaison à sec tire l'eau d'une pièce de viande entière par contact direct avec du sel sec, ce qui la garde d'abord quelques semaines au froid, puis, si le séchage se poursuit jusqu'à une activité de l'eau inférieure ou égale à 0,85, plusieurs mois sans froid du tout. » | « La salaison à sec fait sortir l'eau d'une pièce de viande entière en la couvrant de sel sec. La pièce se garde alors quelques semaines au froid. Si on la fait ensuite sécher jusqu'à une activité de l'eau de 0,85 ou moins, elle se garde plusieurs mois sans froid. » |
| 78, l. 15 | « La mise en conserve chauffe l'aliment dans un pot qu'elle referme sur lui-même, ce qui le garde environ un an hors froid — mais seulement si la température atteinte correspond à l'acidité de l'aliment, faute de quoi le pot devient le meilleur incubateur à botulisme qu'une cuisine puisse produire. » | « La mise en conserve chauffe l'aliment dans un pot qu'on ferme, et il se garde ensuite environ un an sans froid. Il faut pour ça que la température atteinte convienne à l'acidité de l'aliment ; sinon, le botulisme peut se développer dans le pot fermé. » |
| 70, l. 155 | « Elle devient mauvaise dès qu'on change le bois : souche encore ferme, branche verte, bois qui colle aux doigts, ou le cœur dur, lourd, orangé, qui sent la gomme, qu'on trouve au centre de certaines vieilles souches, surtout de pin — c'est du bois saturé de résine, qui flambe au lieu de couver. Une souche pourrie détrempée donne la fumée blanche de l'étape 13. Et elle change le bois, pas les barrières : sel, froid et gel du chapitre s'appliquent pareil. » | « La méthode ne marche plus si on change de bois. Une souche encore ferme, une branche verte ou du bois qui colle aux doigts ne conviennent pas. Le cœur dur, lourd et orangé qui sent la gomme, au centre de certaines vieilles souches (surtout de pin), non plus : il est plein de résine, et il flambe au lieu de couver. Une souche pourrie détrempée donne la fumée blanche de l'étape 13. Enfin, la souche ne change que le bois : le sel, le froid et le gel se font comme dans le reste du chapitre. » |
| 68, l. 383 | « Ce retard est exactement ce qui rend un caveau sûr en octobre et traître en mai — la terre est encore froide, mais les journées ne le sont plus, et c'est l'air qui entre à l'ouverture de la porte qui fait monter la caisse. » | « C'est ce retard qui rend le caveau sûr en octobre et dangereux en mai. En mai, la terre est encore froide, mais pas les journées : chaque fois qu'on ouvre la porte, l'air chaud entre et fait monter la température de la caisse. » |

Cause : `gabarit-chapitre.md` l. 14 et 15 (« En une ligne » : « Une phrase. Pas deux. »), qui contredit la règle 1 du
skill `ecriture` (« Une phrase, une information ») dès qu'une technique a deux durées de garde ou une condition ; et
l'habitude d'ajouter une proposition (« ce qui », « faute de quoi », le tiret) plutôt que de commencer une phrase.

### Motif 9. Le mot-étiquette à la place d'une phrase (basse)

Le rédacteur invente un mot (la « porte d'entrée », le « droit d'entrer », la « filière », la « voie », le
« perméable ») ou une étiquette en gras (« Ce qu'on perd : ») et s'en sert comme raccourci. Le lecteur doit savoir ce que
le mot recouvre ; la phrase qui le dirait manque.

Fréquence : une dizaine de cas dans le lot, dont trois titres d'étapes ; « Ce qu'on perd » 5 fois au ch. 70.

| où | le texte | réécriture |
| --- | --- | --- |
| 68, l. 93 | « 1. Vérifier la porte d'entrée. » | « 1. Vérifier que la bête a refroidi assez vite. » |
| 78, l. 110 | « 2. Vérifier qu'on a le droit d'entrer. » | « 2. Vérifier que la viande ou le poisson a été refroidi à temps. » |
| 70, l. 43 | « Sans cette étape, la filière est fermée. » | « Sans ce gel, on ne peut pas faire de poisson fumé à froid qu'on mange sans le cuire. » |
| 70, l. 213 | « 22. Emballer dans du perméable. » | « 22. Emballer dans quelque chose qui laisse passer l'air. » |
| 70, l. 404 | « Ce qu'on perd : un seuil, pas une lecture. Le témoin ne dit pas combien il fait, il dit de quel bord d'un chiffre on se trouve » | « Ce qu'on perd : le témoin ne donne pas la température, il dit seulement si la chambre est au-dessus ou en dessous du point noté. » |
| 68, l. 375 | « Un plat d'eau posé dans la chambre borne le bas » | « Un plat d'eau posé dans la chambre dit si elle descend autour de 0 °C » |

Cause : la règle 0 du skill `ecriture` (« pas d'étiquette en raccourci ») et sa règle 14 (une notion s'explique la
première fois qu'elle paraît) viennent après ces chapitres ; l'étiquette « Ce qu'on perd » vient du gabarit
(l. 111, « Nommer […] ce qu'on perd »), transformée en titre gras suivi d'un nom.

### Motif 10. L'insistance qui gonfle (basse)

Des mots et des bouts de phrase qui redisent la force d'une consigne au lieu d'en donner la raison : « sans exception »,
« sans discussion », « point », « non négociable », « définitivement », « Jamais. », la consigne redite en écho
(« perdue — pas mise en attente, perdue »). Ce sont les mots en trop du lot ; ils prennent la place du mécanisme.

Fréquence : « jamais » 14, 31 et 10 fois (2,8, 5,4 et 1,9 pour 1000 mots) ; « sans exception » 4 fois ; « toujours »,
« point », « sans discussion », « non négociable », « définitivement » au ch. 70.

| où | le texte | réécriture |
| --- | --- | --- |
| 70, l. 182 | « et le produit change de catégorie — il devient À CUIRE, sans discussion. » | « et il faut l'étiqueter À CUIRE. » |
| 70, l. 491 | « Le gel antiparasitaire du poisson. Le froid naturel n'en est pas un substitut : il ne se mesure pas et il ne se maintient pas. La filière prêt-à-manger reste fermée, point. » | « Le gel antiparasitaire du poisson. Le froid naturel ne le remplace pas, parce qu'on ne peut ni le mesurer ni le garder égal. Sans congélateur, pas de poisson fumé à froid qu'on mange sans le cuire. » |
| 70, l. 444 | « Conséquence non négociable : le produit est À CUIRE, toujours, et la filière prêt-à-manger est fermée. Aucun salpêtre de remplacement, aucune quantité improvisée — section 8, point 5. » | « Le produit est donc toujours À CUIRE. On ne remplace pas le sel de salaison par du salpêtre (étape 4). » |
| 68, l. 275 | « Conséquence, sans exception : aucune pièce d'ours noir ni de phoque ne se sale à sec pour être mangée crue. Jamais. » | « On ne sale donc jamais à sec une pièce d'ours noir ou de phoque pour la manger crue. » |
| 78, l. 293 | « Conséquence, sans exception : aucun aliment peu acide ne se met en pot — ni à la maison, ni au chalet — s'il n'y a pas d'autoclave. Pas avec plus de temps, pas avec plus de sel, pas avec un four, pas avec un bain-marie de dix heures. » | « Sans autoclave, on ne met aucun aliment peu acide en pot, à la maison comme au chalet : ni un bouillon plus long, ni plus de sel, ni le four ne remplacent la pression. » |

Cause : l'ancien encadré « Danger » (« Conséquence, sans exception : »), et l'habitude de compenser par la force du ton
un mécanisme qu'on n'a pas donné. Le skill `ecriture` coupe « l'adjectif ou l'adverbe qui redit » ; il ne nomme pas
l'insistance en fin de phrase (« point », « sans discussion », « Jamais. »).

## 3. Ce qui marche (modèles)

Les passages qui suivent sont dans les sections que la compression n'a pas touchées. Ils sont denses (un geste, une
mesure ou une raison dans chaque phrase) sans être compressés : chaque phrase a son sujet, son verbe, et le mot qui dit
le lien.

1. **Ch. 78, l. 182 (étape 19, le poêle à bois).** « Sur un poêle à bois, cela veut dire une brassée fendue d'avance à
   portée de main, quelqu'un dans la pièce du début à la fin, et une correction qui se fait en déplaçant la marmite sur
   le dessus du poêle plutôt qu'à la clé d'air. On corrige avant d'arriver : la pression continue de monter un moment
   après qu'on a retiré de la chaleur, et on commence à tirer la marmite vers le bord quand il manque encore une
   dizaine de kPa. » Pourquoi : on sait qui fait quoi ; le pourquoi est attaché au geste par « après qu' » et
   « quand » ; le seul deux-points annonce une explication complète, avec sujet et verbe ; la phrase longue suit
   l'ordre des gestes. Et le « encore » de « il manque encore » porte le sens.
2. **Ch. 68, l. 339 (la pesée par substitution).** « Poser la pièce de viande sur le plateau de gauche. Verser du sable,
   du gravier ou de la neige tassée sur celui de droite jusqu'à l'équilibre […]. Retirer la viande, laisser le sable en
   place, puis verser de l'eau dans le même plateau de gauche, dans un contenant dont on a mesuré le vide de la même
   façon, jusqu'à retrouver l'équilibre. La masse d'eau versée est la masse de la viande. » Pourquoi : les gestes dans
   l'ordre, « puis » et « jusqu'à » qui disent quand passer au suivant, ce qu'on voit quand c'est fait (l'équilibre),
   et la conclusion en une phrase simple. Les phrases vont de 8 à 30 mots.
3. **Ch. 70, l. 469 (la caisse dans la neige).** « Une caisse enfoncée dans un banc de neige du côté nord, couverte
   d'écorce et lestée de pierres, tient mieux qu'une caisse à l'air libre, parce que la neige coupe le soleil autant que
   le vent. La lecture ne se prend pas au petit matin, quand tout est bon : elle se prend à l'heure la plus chaude de la
   journée, en milieu d'après-midi, parce que c'est ce maximum-là qui décide de ce qui pousse. » Pourquoi : deux
   « parce que » qui donnent la raison qui change le geste (où mettre la caisse, à quelle heure lire), et un « quand »
   qui nomme le réflexe à éviter sans en faire une formule.
4. **Ch. 70, l. 317 (le monoxyde, le réflexe trompé).** « la fumée de bois pique les yeux, ce qui donne l'impression
   qu'on saurait si l'air devenait mauvais. Le monoxyde, lui, ne donne aucun signal — et les symptômes qu'il produit,
   «maux de tête ; fatigue ; nausées ; vomissements ; étourdissements », sont ceux qu'on met sur le compte d'une longue
   journée au fumoir. » Pourquoi : c'est le contraire du paragraphe du monoxyde que JP a relevé. Le fait qui surprend
   est dit avec le réflexe qu'il corrige (« ce qui donne l'impression qu'on saurait ») et la scène réelle où l'erreur
   se fait (« sur le compte d'une longue journée »), au lieu de quatre faits posés côte à côte. À la passe, le tiret
   devient « et », et la citation se dit en mots simples ; la structure reste.
5. **Ch. 78, l. 205 et 209 (les anneaux, l'étiquette).** « Retirer les anneaux avant de ranger. Un anneau laissé en
   place tient mécaniquement un couvercle qui a lâché et cache exactement le défaut qu'on cherche à voir. » ; « Un pot
   sans étiquette est un pot à jeter dans six mois, parce que personne ne saura s'il est passé par l'autoclave. »
   Pourquoi : un geste court, puis une seule raison, qui n'est pas évidente et qui change le geste, dite avec un verbe
   et un « parce que ». (Le « exactement » peut sortir.)

## 4. Ce que la densité demande aux règles (pistes pour la réécriture du skill)

- **Dense en faits, pas en mots.** La règle 5 de `CLAUDE.md` et sa mesure (« 700 mots utiles par page ») poussent à
  couper les petits mots. Il faudrait dire ce qui se coupe (la redite, l'insistance, la phrase sur le livre) et ce qui
  ne se coupe jamais : le sujet, le verbe, l'article, et les mots qui disent le lien (« pour », « si », « parce que »,
  « quand », « donc », « mais »).
- **Le deux-points n'est pas un lien.** Une phrase « fait : conséquence » se relit en mettant le mot qui manque
  (« parce que », « donc », « pour », « si ») ; s'il se met, on l'écrit. Le skill pourrait viser un ordre de grandeur
  proche des textes techniques de référence (2 à 5 deux-points pour 1000 mots, contre 17 ici), mesuré par `tempo.py`.
- **La passe des tirets** (156 dans ce lot) doit d'abord remettre le mot que le tiret cachait (« donc », « c'est-à-dire »,
  « parce que »), avant de penser au deux-points.
- **La liste des mots vides se sépare en deux** : l'insistance qui sort (exactement, justement, d'ailleurs,
  précisément, vraiment) et les mots de temps et de quantité qui restent sauf preuve (déjà, encore, tout, tous, bien
  devant un adjectif). `controle.py` pourrait ne relever que la première.
- **La migration du §3 vers les étapes** : chaque loi du « Pourquoi ça marche » se rebâtit avec le geste qu'elle
  explique et un « pour » ou un « c'est pour ça qu'on… », jamais collée telle quelle.
- **La ligne de matériel** garde ses 15 à 20 mots, mais avec un verbe ou un « pour » : « Thermomètre à sonde : pour
  vérifier que la viande atteint 74 °C à cœur. » Corriger l'exemple de `CLAUDE.md` et le « format validé » du gabarit,
  qui servent de modèle ; interdire « + », « = », « → », « 2e », « alu » dans le texte qui s'imprime, cases comprises.
- **« En une ligne »** : deux ou trois phrases courtes valent mieux qu'une phrase de 70 mots (`gabarit-chapitre.md`
  l. 14-15).
- **Les consignes au rédacteur ne s'écrivent pas dans le livre** : « honnêtement », « sans broder », « sans adoucir »,
  « dit une fois » sortent du gabarit (l. 111-112) ou y sont marqués comme consignes ; le livre ne s'en sert jamais.
- **Le skill `editeur`** : « phrases courtes (percutantes) » appelle la chute ; dire plutôt « courtes quand le geste est
  court ».
- **La redite** : le rappel de sécurité se répète d'un chapitre à l'autre, pas d'une section à l'autre du même chapitre ;
  la raison « on ouvre le livre à une page » vaut entre les chapitres.

## 5. Hors de mon regard (vu en passant, non jugé)

- « village » : 68, l. 11 et 36 ; 78, l. 306 (« Du village, c'est une ambulance », aussi un service qui répond).
- L'âge des enfants : 78, l. 308-309 (« deux adultes et deux enfants de 4 et 6 ans (ch. 39) »).
- Les citations de source entre guillemets (provenance visible) : 8, 19 et 16 ; une en anglais au 78, l. 317-318.
- Un service qui répond : 70, l. 268 (« Consulter. Nommer le produit fumé au soignant »).
- Un chiffre à faire regarder par le vérificateur : 78, l. 238 (« Un rebord souillé rate un scellement sur deux »).
- La trace de la vérification dans le texte : 68, l. 51 (« Cohérent avec le ch. 52 ») ; 68, l. 328-329 (« ce n'est pas
  un chiffre à valider, c'est la définition du litre »).
- Les trois chapitres sont encore à l'ancien gabarit : §3 et §8, « Le bon choix » et « Le mauvais choix » en section 2,
  15, 3 et 12 « § » ; points de contrôle de 12, 15 et 16 lignes ; signes d'échec de 11, 9 et 12 lignes.
- Les choses qui pensent ou parlent : « La fumée ment » (70, l. 501), « un appareil qui ne pardonne pas » (78, l. 382),
  « Un pot d'autoclave, lui, se moque de la température » (78, l. 557).

## 6. Liste de contrôle (ma partie de `.claude/cadre-agents.md` : l'écriture et la langue)

Pour tout agent
- [x] `CLAUDE.md` pris comme déjà chargé, pas relu.
- [x] Le skill de ma partie (`ecriture`) lu au complet ; `editeur`, `gabarit-chapitre.md`, `plan/decisions-jp.md` lus
  par plages.
- [ ] Les points de la PAUSE du 15 octobre dans `suivi/plan-de-match.md` : pas lus ; audit sans modification, aucune
  décision à appliquer.
- [x] Règle 1 : aucun chiffre neuf dans les réécritures (les chiffres cités sont ceux du chapitre).
- [x] Rien commité.
- [x] Rapport en français, liste cochée.

Économiser les jetons
- [x] Un agent, un lot précis (trois chapitres).
- [x] Les trois chapitres lus au complet, comme demandé ; le reste par recherche et par plages.
- [x] Aucune image ouverte.
- [x] Sorties de commande coupées.
- [ ] Le rapport ne recopie pas le texte : exception voulue, la tâche demande des citations exactes ; limitées aux
  exemples.

Le texte, la phrase (appliqué aux réécritures proposées)
- [x] Règle 0 : chaque réécriture relue à voix haute ; un verbe, un sujet, les articles.
- [x] Pas de loi en formule, jamais « d'où » (le seul « d'où » du lot est relevé au motif 3).
- [x] Pas de « X passe là où Y ne passe pas ».
- [x] Pas de maxime, de chute, d'opposition fabriquée ni d'image dans les réécritures (motifs 2 et 10).
- [x] Pas de chose qui pense ; relevées en section 5.
- [x] Consigne jamais au pronominal dans les réécritures (« Il faut le tailler au couteau et le jeter »).
- [x] Consigne dite comme une consigne ; sujet nommé ; ordre naturel.
- [ ] Points de contrôle et signes d'échec à 5 à 8 lignes : sans objet pour un audit ; dépassements signalés (section 5).
- [ ] Pages des dangers : sans objet.
- [x] Un passage lourd se juge d'abord (doit-il exister ?) : plusieurs réécritures sont des coupes (motifs 4 et 5).
- [ ] Passe d'éditeur : sans objet.
- [x] Le chapitre parle de son sujet : rien de neuf à signaler sous ce regard.
- [x] Une notion s'explique à sa première apparition : les étiquettes inventées sont relevées (motif 9).
- [ ] « Quand l'utiliser » en titres de situation : sans objet ; les trois chapitres ont encore « bon choix » et
  « mauvais choix » (section 5).
- [x] Qui fait quoi, sans détour ; aucune liste après deux-points qui mélange deux sortes de choses dans les
  réécritures.
- [x] Le mot qu'on dit : « dangereux » plutôt que « traître », « qui laisse passer l'air » plutôt que « perméable ».
- [x] La chose nommée plutôt que le possessif.
- [x] Mots de tous les jours : « filière », « voie », « porte d'entrée » relevés.
- [x] Aucun tiret dans les réécritures ; « § » signalé (section 5).
- [x] Titres de sous-sections : les titres-maximes sont hors de ce regard, non jugés.
- [x] « X ne fait pas Y : il fait Z » relevé (motif 2).

La procédure
- [ ] Sous-étapes : sans objet pour un audit.

La répétition
- [x] Inventaire des faits du lot fait pour les faits les plus redits (section 1, motif 4).
- [x] Un nom ne revient pas à chaque phrase dans les réécritures.

Avant de rendre
- [x] `controle.py` lancé sur les trois chapitres, pour les mesures (tirets, mots vides, redites, maximes) ; rien à
  corriger ici, aucun fichier du livre touché.

La langue
- [x] Les réécritures relues : accords, subjonctif, participes, « a / à », « ou / où ».
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures.
- [x] Ni joual ni anglicisme.
- [ ] `langue.py` : sans objet, ces notes ne s'impriment pas.
