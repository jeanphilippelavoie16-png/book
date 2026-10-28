# Audit de l'écriture : la densité, lot F (tomes 5 et 6 : poêles à bois, jardin nordique, souder)

28 octobre 2026. Un seul regard : la densité, trop compressé ou trop délayé. D'un côté le télégraphe (la phrase sans
verbe, l'étiquette, le lien logique coupé, le sous-entendu qui oblige à relire) ; de l'autre le remplissage (la redite,
la phrase qui parle du livre ou de la recherche, l'insistance). Lot lu au complet :
`chapitres/83-poeles-a-bois-et-rendement.md`, `chapitres/95-jardin-nordique.md`,
`chapitres/107-souder-braser-reparer-le-metal.md`. Aucun fichier du livre n'a été modifié. Les réécritures sont des
exemples : aucun fait ni chiffre neuf, aucun tiret, pas de pronominal pour une consigne.

**Ce lot n'a pas encore passé la condensation.** Les trois chapitres sont encore au gabarit en neuf sections
(« Pourquoi ça marche », « Danger »), dans leur version du 12 octobre (le ch. 107 n'a reçu depuis que les renvois du
00b). Ils montrent donc la densité telle que le rédacteur l'écrit, avant toute passe. En une phrase : **le lot est
compressé là où le gabarit plafonne les mots (section 1, section 3, Matériel, cases de tableau) et délayé partout
ailleurs, par la trace de la recherche, la redite et l'insistance ; dans les deux cas, ce qui manque, c'est le petit mot
qui dit le but et la condition (« pour », « si »), remplacé par le deux-points.** Le nombre de faits, lui, est normal :
le lot n'est pas plus chargé en chiffres que les textes techniques de référence.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 83 | 5624 | 286 | 19,7 | 0,59 | 12,6 | 20,6 | 20,7 | 33,9 | 23,4 | 3,0 | 2,7 | 5,3 | 5,6 |
| ch. 95 | 6026 | 308 | 19,6 | 0,69 | 16,9 | 20,8 | 21,2 | 39,3 | 25,3 | 5,6 | 10,6 | 8,8 | 4,2 |
| ch. 107 | 5600 | 308 | 18,2 | 0,66 | 15,9 | 14,9 | 22,1 | 37,0 | 25,3 | 4,6 | 6,8 | 7,0 | 5,9 |
| **le lot** | 17250 | 902 | 19,1 | 0,65 | 15,2 | 18,7 | 21,3 | 36,8 | 24,7 | 4,5 | 6,8 | 7,1 | 5,2 |
| tout le livre | 684215 | 36580 | 18,7 | 0,65 | 15,5 | 17,3 | 19,9 | 31,4 | 23,7 | 5,0 | 9,4 | 5,4 | 5,1 |

Le lot a plus de phrases à deux-points que le livre (36,8 % contre 31,4 %) et plus de phrases de 30 mots et plus
(18,7 % contre 17,3 %). Il a aussi plus de mots de liaison parlés (7,1 contre 5,4), surtout au ch. 95 : ils sont dans la
variante d'urgence, la partie la moins contrainte.

### Les marques de densité, comparées aux textes techniques de référence

Script de travail (dans le dossier de travail de la session, hors dépôt), sur le texte nettoyé par `tempo.py` (tableaux,
titres et pictogrammes enlevés ; renvois « ch. N », « § N », « étape N » enlevés pour compter les chiffres). Les quatre
textes techniques sont ceux de `plan/audit-ecriture/references/` (fiches de l'Alberta, Ripley 1946, Millet-Robinet,
guide de survie de Wikilivres), comptés avec le même script. « Pour » ne compte que « pour » suivi d'un verbe ou d'un
mot qui n'est pas un déterminant : il sous-compte des deux côtés, la comparaison reste juste.

| pour 1000 mots | ch. 83 | ch. 95 | ch. 107 | **lot** | 4 réf. techniques (moyenne) | les 4 réf., de … à … |
| --- | --- | --- | --- | --- | --- | --- |
| Chiffres (hors renvois, hors tableaux) | 8,4 | 10,8 | 7,9 | **9,1** | 10,0 | 0 à 22,0 |
| Deux-points | 17,4 | 20,1 | 20,9 | **19,5** | 2,3 | 0,4 à 4,9 |
| « c'est » | 6,2 | 6,3 | 6,8 | **6,4** | 1,0 | 0 à 3,2 |
| « pour » (le but) | 1,4 | 3,2 | 2,0 | **2,2** | 8,8 | 7,5 à 10,8 |
| « si », « s'il » (la condition) | 2,0 | 2,7 | 3,0 | **2,6** | 5,4 | 2,8 à 9,4 |
| « mais » | 0,4 | 1,0 | 0,5 | **0,6** | 1,4 | 0,5 à 2,2 |
| « parce que » | 1,2 | 1,0 | 1,6 | **1,3** | 0,2 | 0 à 0,9 |
| « donc » | 1,2 | 2,3 | 0,9 | **1,5** | 0,9 | 0 à 2,2 |
| « quand » | 2,0 | 0,7 | 1,4 | **1,4** | 0,3 | 0 à 0,5 |
| « jamais » | 3,4 | 3,3 | 3,6 | **3,4** | 0,4 | 0 à 1,0 |

### Les sections compressées contre les autres

| section | ch. 83 : mots, m/phr, « : » % | ch. 95 | ch. 107 | « pour » / « parce que » / « quand » / « si » / « donc », les trois chapitres |
| --- | --- | --- | --- | --- |
| §1 En une ligne | 52 mots, **1 phrase** | 82 mots, **1 phrase** | 65 mots, **1 phrase** | 1 / 0 / 0 / 1 / 0 |
| §2 Quand l'utiliser | 357, 17,0, 29 % | 427, 15,8, 59 % | 247, 17,6, 64 % | 2 / 0 / 8 / 2 / 0 |
| §3 Pourquoi ça marche | 102, 25,5, 50 % | 116, 29,0, **75 %** | 113, 22,6, 60 % | **1 / 0 / 0 / 1 / 0** |
| §4 Matériel | 91, 13,0, 14 % (+ 5 tirets) | 71, 14,2, 20 % (+ 4 tirets) | 173, 14,4, 50 % (+ 9 tirets) | 1 / 0 / 0 / 0 / 0 |
| §5 Procédure | 1557, 18,8, 29 % | 1898, 17,9, 37 % | 1867, 15,8, 31 % | 15 / 7 / 6 / 24 / 8 |
| §8 Danger | 831, 18,9, 39 % | 815, 24,7, 48 % | 1019, 19,6, 33 % | 8 / 2 / 3 / 4 / 5 |
| §9 Variante d'urgence | 2544, 20,9, 38 % | 2607, 20,1, 35 % | 2066, 20,9, 42 % | 10 / 12 / 6 / 12 / 13 |

Les trois sections plafonnées par le gabarit (section 1 : « Une phrase. Pas deux. » ; section 3 : « 120 mots au plus » ;
Matériel : « 15 à 20 mots ») n'ont presque aucun mot de liaison. La variante d'urgence, qui n'a pas de plafond, a ses
« parce que » et ses « donc », et c'est là que se trouvent quatre des cinq modèles de la section 4 de ces notes.

### Les phrases courtes sans verbe

Sur les phrases de six mots et moins (36, 52 et 49), la plupart sont des titres d'étapes ou des intertitres, et elles
marchent. Restent, dans la prose, des phrases sans verbe conjugué : 5 au ch. 83 (« Ni plastique, ni carton. », « À la
hache et aux coins. », « Ce qu'on perd : le temps. »…), 9 au ch. 95 (« Couvercle lesté, sinon l'ours (→ §9). »,
« 25 L/m²/semaine, pluie comprise. » deux fois, « Règle d'atelier, non sourcée. »…), 10 au ch. 107 (« Étau,
serre-joints, pinces-étau, cales. », « Même raison : répartir la contraction. », « Si oui, éclisse boulonnée (§9). »,
« Voir §8. » trois fois, « Voir §8, bloc 1. », « Voir §8, bloc 5. »). « Ce qu'on perd : » revient 24 fois (9, 9, 6), et 13 fois il est suivi d'un nom seul (5, 3, 5).

### Les faits les plus redits (inventaire par idée, pas par mots)

| chapitre | fait | lignes |
| --- | --- | --- |
| 83 | étouffer une grosse charge pour la nuit fait la créosote et le CO | 169, 291, 479 |
| 83 | « Le bois vert ou résineux augmente la formation de créosote » (mot pour mot) | 30, 290 |
| 83 | « Seul un avertisseur de monoxyde de carbone peut détecter… » | 48, 68, 264, 497 |
| 83 | une pièce rapportée ne tient pas sur un conduit, le métal travaille à chaque feu | 238, 445 |
| 83 | l'écorce est une membrane étanche | 104, 380 |
| 95 | 25 L par mètre carré et par semaine, pluie comprise | 24, 113, 170, 275, 304, 471 |
| 95 | la surface se fixe sur l'eau (trois formules) | 113 à 115, 472 à 474, 490 à 492 |
| 95 | le lièvre au collet et la tularémie (presque mot pour mot) | 190 à 194, 532 à 534 |
| 95 | le lièvre dessous, l'orignal par-dessus, le porc-épic gruge | 89, 190, 525 |
| 95 | légume peu acide, sel, vinaigre, botulisme (presque mot pour mot) | 239 à 243, 551 à 554 |
| 95 | « Rendez inaccessible la nourriture à l'extérieur » | 216, 359 |
| 107 | chaudron, cuve de saumure, évaporateur, grille de fumoir | 99 à 102, 379 à 381, 523 à 525 |
| 107 | chauffer les pièces, pas la baguette | 206, 285, 492, 505 |
| 107 | la flamme pilote cachée | 134, 339 |
| 107 | « Quelques secondes d'exposition à un rayonnement UV intense suffisent » | 139, 295 |
| 107 | le réservoir vide plus dangereux que le plein | 35, 327 à 333, 545 |

`controle.py` relève de son côté 7, 29 et 16 « redites » (suites de mots), 11, 12 et 9 « mises en relief et
oppositions », 3, 1 et 0 « maximes ».

### Ce que les chiffres disent

- **Ce n'est pas le nombre de faits qui compresse ce lot.** 9,1 chiffres pour 1000 mots, comme les textes techniques
  (10,0). Au tome 1 (17,3) et au lot E (20,7), la compression venait d'abord des faits entassés ; ici, elle vient de la
  forme de la phrase.
- **Le deux-points prend la place du but et de la condition.** Huit fois plus de deux-points que les références, six
  fois plus de « c'est », quatre fois moins de « pour », deux fois moins de « si ». La cause et le moment sont là
  (« parce que », « quand », « donc » sont aussi fréquents ou plus que dans les références) ; ce qui manque, c'est
  « pour… » et « si… », que le deux-points avale : « Couvercle lesté, sinon l'ours », « : lunettes ».
- **Les sections plafonnées concentrent le télégraphe**, les sections libres concentrent le délayage. Le §3 n'a aucun
  « parce que » ni « quand » ; la variante d'urgence a ses liens, mais aussi les redites, les « Ce qu'on perd : » et les
  formules de fin de paragraphe.
- **« Jamais » huit fois plus que les références** : l'insistance est la forme que prend le délayage dans ce lot, avec
  la trace de la recherche (24, 52 et 43 guillemets ouvrants, la plupart des citations de sources).
- **175 tirets attendent la passe** (49, 79, 47 ; `controle.py` en compte 161 dans le texte). La règle du skill
  propose les deux-points en deuxième remplacement : sans garde, la passe va faire monter le chiffre de la deuxième ligne
  du tableau.

## 2. Le paragraphe du monoxyde, vu depuis le ch. 83

Le ch. 83 garde la version longue, d'avant la condensation, du mécanisme que la page des dangers résume
(`dangers/partie-1.md`, ligne 3). La comparaison montre ce que la coupe a enlevé.

Ch. 83, lignes 249 à 253 :

> Le mécanisme qui tue : le CO se fixe sur l'hémoglobine à la place de l'oxygène et ne s'en détache que très
> lentement. Le sang circule, le cœur bat, et il ne transporte plus rien. Le corps ne sonne aucune alarme, **parce
> qu'il ne détecte pas le manque d'oxygène** : il détecte le gaz carbonique, et celui-là continue d'être évacué
> normalement. On s'endort. C'est pour ça que le CO tue dans le sommeil sans réveiller personne.

Ch. 83, lignes 255 à 258 :

> Sa densité de vapeur, 0,96, est presque exactement celle de l'air : il se mélange. Il n'y a pas de hauteur sûre, pas
> de coin sûr, et se coucher par terre ne sert à rien.

La page des dangers :

> Il prend la place de l'oxygène dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand
> dans toute la pièce, jusqu'au plancher : se coucher par terre ne protège pas.

Deux chaînes de trois maillons chacune (le gaz prend la place de l'oxygène → le corps ne donne pas l'alarme, **parce
qu'il réagit au gaz carbonique** → on s'endort ; le gaz pèse comme l'air → il se mêle partout → le plancher ne protège
pas) sont devenues deux phrases « fait : conséquence » dont on a gardé le premier et le dernier maillon. Le lecteur
n'entend plus pourquoi on s'endort au lieu de sortir : la phrase affirme, elle n'explique plus. C'est le tempo que JP
entend : deux affirmations sèches de même forme, coupées au même endroit par le même deux-points, sans « parce que »
ni « alors ».

Réécriture qui garde seulement les faits du paragraphe et rend les liens :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone. Le poêle en fait plus quand on
> ferme presque l'entrée d'air pour passer la nuit. On ne peut ni voir ni sentir ce gaz. Comme il prend la place de
> l'oxygène dans le sang, on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans toute la pièce,
> jusqu'au plancher, alors se coucher par terre ne protège pas.

Le maillon du milieu (« le corps ne donne pas l'alarme, parce qu'il réagit au gaz carbonique et pas au manque
d'oxygène ») existe dans le livre, au ch. 83 ; s'il revient sur la page des dangers, le vérificateur technique le
confirme à la source d'abord.

## 3. Les motifs, du plus grave au moins grave

### Motif 1. Le lien passé dans le deux-points : le but, la raison ou la condition à deviner (haute)

Le deux-points coupe la phrase en deux et laisse le lecteur trouver le lien : « parce que », « pour que », « sinon »,
« alors ». La seconde moitié est souvent un raccourci ou une figure (« et ment », « tranche ») que le lecteur doit
traduire avant de comprendre la consigne.

Mesure : 19,5 deux-points pour 1000 mots (références : 2,3) ; « pour » 2,2 (8,8) ; « si » 2,6 (5,4) ; 36,8 % des
phrases ont un deux-points, 24,7 % sont en « fait : conséquence ».

| où | le texte | la même chose, dite avec son lien |
| --- | --- | --- |
| ch. 83, l. 126 | « Mesurer sur une face **fraîchement fendue** : la surface d'une bûche mouillée sèche en une journée de soleil et ment. » | « Mesurer sur une face qu'on vient de fendre, parce que la surface d'une bûche mouillée sèche en une journée de soleil, et l'humidimètre y lit alors un bois plus sec qu'il ne l'est. » |
| ch. 83, l. 130 | « L'air humide de la côte allonge ce délai sans qu'on sache de combien ; la bûche témoin tranche. » | « L'air humide de la côte allonge ce délai, et on ne sait pas de combien. Le bois est prêt quand la bûche témoin arrête de perdre du poids (étape 12). » |
| ch. 95, l. 31 | « Dans une trouée qui donne moins de 4 h de soleil — et une trouée peut paraître claire en restant sous la barre : le compte se fait à la montre, pas à l'œil (§5-A). » | « Une trouée peut avoir l'air claire et recevoir quand même moins de 4 h de soleil, alors on compte les heures avec une montre au lieu de juger à l'œil (étape 1). » |
| ch. 95, l. 322 | « **Une bouchée amère se recrache**, et le reste du lot part avec elle : les tubercules d'une même butte ont vu la même lumière, donc la bouchée amère n'est pas un accident isolé, c'est un échantillon. » | « Recracher une bouchée amère et jeter le reste du lot, parce que les tubercules d'une même butte ont reçu la même lumière : si un tubercule est amer, les autres risquent de l'être aussi. » |
| ch. 107, l. 76 | « Verre teinté ou lunettes de soleil : la pupille s'ouvre derrière, l'œil brûle. » | « Un verre teinté ou des lunettes de soleil ne le remplacent pas, parce que la pupille s'ouvre derrière et que l'œil brûle quand même. » |
| ch. 107, l. 164 | « Vérifier l'équerrage maintenant : après, ça se corrige à la meule ou pas du tout. » | « Vérifier l'équerrage avant de souder, parce qu'après, on ne peut plus le corriger qu'en meulant, et parfois plus du tout. » |

Tous les deux-points ne sont pas fautifs : « Refaire le même exercice en août : le soleil descend, et la ligne d'ombre
des épinettes avance vite » (ch. 95, l. 98) se lit à voix haute comme « parce que », sans effort, parce que la seconde
moitié est une phrase complète et concrète. Le défaut, c'est le deux-points qui remplace « pour » ou « si », ou qui
ouvre sur un raccourci.

Cause : le skill `ecriture` en fait le modèle. La règle 2 donne en exemple « Vidanger avant que la maison descende sous
5 °C : un tuyau plein fend en gelant. » ; la section du tiret propose « les deux-points » comme deuxième remplacement ;
la ligne « La justification collée au geste » (« Ne pas rester dans l'auto : la tôle n'arrête rien. » devient « Entrer
dans un bâtiment. ») apprend à couper la raison plutôt qu'à la lier. `plan/decisions-jp.md`, ligne 266, nomme « la
justification que le lecteur connaît déjà, souvent après deux-points », mais aucune règle ne dit l'inverse : la raison
qui change le geste se dit avec « parce que », « pour », « si ».

### Motif 2. Le geste réduit à un nom : la consigne sans verbe (haute)

La consigne arrive au bout de l'explication, réduite à un nom (« : lunettes »), ou la ligne entière est une suite de
noms (« Pare-étincelles en place…, briquet long… »). C'est le défaut que JP a relevé dans « Régler dehors : un bol qui
revient » (règle 0), revenu à la fin des étapes et dans les lignes de Matériel.

Mesure : 5, 9 et 10 phrases courtes sans verbe conjugué dans la prose (section 1) ; 13 des 24 « Ce qu'on perd : »
suivis d'un nom seul ; 18 lignes de Matériel sur 18 bâties en « nom — fragment ».

| où | le texte | la même chose, dite comme une consigne |
| --- | --- | --- |
| ch. 83, l. 105 | « Au fendage, un coin d'acier à tête matraquée s'écaille et projette du métal à hauteur d'œil : lunettes. » | « Porter des lunettes pour fendre, parce qu'un coin d'acier dont la tête est écrasée par les coups s'écaille et projette des éclats de métal à la hauteur des yeux. » |
| ch. 83, l. 143 | « Pare-étincelles en place avant d'allumer, briquet long de type BBQ. » | « Mettre le pare-étincelles en place avant d'allumer, et allumer avec un briquet long, comme celui du barbecue. » |
| ch. 95, l. 87 | « Couvercle lesté, sinon l'ours (→ §9). » | « Leur couvercle doit être lesté, sinon l'ours l'ouvre (section 9). » |
| ch. 95, l. 113 | « 25 L/m²/semaine, pluie comprise. » | « Il faut 25 L d'eau par mètre carré et par semaine, en comptant la pluie. » |
| ch. 107, l. 113 | « Si oui, éclisse boulonnée (§9). » | « Si oui, poser une éclisse boulonnée (section 9, B). » |
| ch. 95, l. 419 | « **Ce qu'on perd :** la réversibilité. Un sol trop acide se corrige ; un sol surchaulé se répare beaucoup plus lentement. » | « On ne revient pas facilement en arrière : on corrige un sol trop acide, mais un sol qui a reçu trop de chaux met beaucoup plus de temps à se rétablir. » |

Même famille : « Pot fermé à la chaux, au-dessus du poêle. » (ch. 107, l. 80 : « On les garde dans un pot fermé avec
de la chaux, au-dessus du poêle. ») ; « Étau, serre-joints, pinces-étau, cales. » (ch. 107, l. 164) ; « Cru maintenant
(ch. 73) · caveau (ch. 79) · fermentation (ch. 80) · conserve (ch. 78). » (ch. 95, l. 237).

Cause : `gabarit-chapitre.md`, Matériel : « une ligne par item, 15 à 20 mots : le nom en gras, puis ce qu'il fait », avec
un modèle sans sujet (« porte les 74 °C à cœur. Ne se fabrique pas. ») et la flèche « (→ section 9) » ; CLAUDE.md,
règle 5, « Écrire dense ». La règle 0 du skill interdit déjà la liste de noms, mais elle ne vise pas la consigne d'un
mot au bout d'une phrase, ni l'étiquette « Ce qu'on perd : » que le gabarit de la variante d'urgence a installée.

### Motif 3. La phrase-entrepôt : un fait, trois incises et un renvoi (haute)

Une phrase porte le fait principal, puis deux ou trois incises entre tirets ou entre parenthèses, puis un renvoi.
Lue à voix haute, on perd le sujet avant d'arriver au verbe. Les trois « En une ligne » sont de ce type : la seule
phrase permise porte tout le chapitre.

Mesure : la section 1 tient en une phrase de 52, 82 et 65 mots ; 18,7 % des phrases ont 30 mots et plus (livre :
17,3 %) ; beaucoup des 175 tirets ouvrent une incise.

| où | le texte | la même chose, en phrases qui se suivent |
| --- | --- | --- |
| ch. 95, l. 11 | « Un jardin nordique convertit une trouée de forêt, une saison d'environ 120 jours sans gel sur la côte — du 25 mai au 27 septembre en moyenne à Sept-Îles, et une trouée de l'intérieur ne suit pas forcément la station — et beaucoup d'eau portée à la main en légumes qui, eux, ne se gardent pas tout seuls : le jardin ne conserve rien — il produit ce que le caveau (ch. 79), la fermentation (ch. 80) et la conserve (ch. 78) tiennent ensuite jusqu'au printemps. » | « Le jardin nordique fait pousser des légumes dans une trouée de forêt, pendant une saison d'environ 120 jours sans gel sur la côte, avec beaucoup d'eau portée à la main. À Sept-Îles, cette saison va en moyenne du 25 mai au 27 septembre, et une trouée de l'intérieur peut s'en écarter. Le jardin ne conserve rien : on garde ses légumes jusqu'au printemps au caveau (ch. 79), en fermentation (ch. 80) ou en conserve (ch. 78). » |
| ch. 83, l. 17 | « Tirer d'une corde de bois tout ce qu'elle contient — bois sec sous 20 % d'humidité, charges petites brûlées à l'air ouvert, tuyau propre — allonge nettement la durée d'une pile de bois sans changer d'appareil et supprime en même temps les deux façons dont un poêle tue : la créosote et le monoxyde de carbone. » | « On brûle du bois sec, sous 20 % d'humidité, en petites charges, avec l'air ouvert et un tuyau propre. La même pile dure alors nettement plus longtemps, sans changer de poêle, et on évite en même temps les deux façons dont un poêle tue, la créosote et le monoxyde de carbone. » |
| ch. 107, l. 10 | « Souder, braser et réparer le métal rend au chalet un objet qui serait autrement perdu ou à des centaines de kilomètres du premier magasin, pour aussi longtemps que la pièce d'origine si le joint est fait sur métal nu et chargé dans le bon sens — au prix d'une fumée qui donne le cancer du poumon à la longue, et que seul le déplacement d'air règle. » | « Une soudure ou un brasage remet en service, au chalet, un objet de métal qu'il faudrait autrement jeter ou aller chercher à des centaines de kilomètres. Si le joint est fait sur du métal nu et chargé dans le bon sens, il dure aussi longtemps que la pièce d'origine. La fumée donne le cancer du poumon à la longue, et seul un courant d'air qui l'emporte protège. » |
| ch. 95, l. 415 | « **La cendre se dose : environ 100 g par mètre carré et par an — un seau de 20 L pour 90 m², à peu près ce que donne une corde de bois —, mêlée à la terre avant de semer, jamais au pied des bleuets.** » | « Mettre environ 100 g de cendre par mètre carré et par an, soit à peu près un seau de 20 L pour 90 m², ce que donne une corde de bois. La mêler à la terre avant de semer, et ne jamais en mettre au pied des bleuets. » |
| ch. 83, l. 201 | « inspecter tuyau et cheminée de bout en bout — joints, solins, chapeau, grillage pare-étincelles, corrosion, section écrasée — inspecter les joints d'étanchéité de la porte et de la vitre, et remplacer le tuyau qui se perce à l'ongle. » | « Inspecter le tuyau et la cheminée d'un bout à l'autre : les joints, les solins, le chapeau et le grillage pare-étincelles, en cherchant la rouille et les sections écrasées. Inspecter aussi les joints d'étanchéité de la porte et de la vitre. Remplacer le tuyau qu'on perce avec l'ongle. » |
| ch. 107, l. 283 (case de tableau) | « préchauffer toute la pièce selon le procédé (120 à 425 °C à l'électrode de fonte, une centaine de degrés au brasage ; sans thermomètre, un bâton de pin qui noircit au contact dit 260 à 425 °C ; à l'électrode d'acier ordinaire, presque sans préchauffage, par cordons de 2 à 2,5 cm martelés chauds, chacun refroidi avant le suivant) » | Une procédure dans une parenthèse, dans une case. Sa place est l'étape 32, en phrases : « Préchauffer toute la pièce, à une température qui dépend du procédé : de 120 à 425 °C à l'électrode de fonte, une centaine de degrés au brasage. À l'électrode d'acier ordinaire, on ne préchauffe presque pas, mais on soude par cordons de 2 à 2,5 cm, qu'on martèle chauds, et on laisse refroidir chaque cordon avant de faire le suivant. Sans thermomètre, on appuie un bâton de pin sur la pièce : s'il noircit, elle est entre 260 et 425 °C. » |

La ligne du ch. 83, l. 201, mélange aussi deux sortes de choses dans une liste (des pièces et des défauts), ce que la
règle 12 du skill interdit.

Cause : `gabarit-chapitre.md`, section 1, « Une phrase. Pas deux. » ; l'habitude de l'incise entre tirets, qui permet de
tout loger dans une phrase ; les cases « Si c'est hors cible » des tableaux, où le rédacteur range la procédure qu'il
n'a pas mise dans l'étape. Le skill dit « Une phrase, une information » (règle 1), mais le gabarit la contredit pour la
première phrase du chapitre.

### Motif 4. La trace de la recherche dans la phrase : citations, « publié », « non sourcée », « le livre n'en invente pas » (haute)

Le texte montre la preuve de la recherche au lieu de dire le geste. Les attributions ont été retirées, mais les
citations sont restées, entre guillemets, avec la voix de l'institution (« Insérez », « Rendez », « Assurez-vous »,
le vouvoiement) ; deux espaces avant le deux-points (ch. 83, l. 31 et 49) marquent encore la place du nom de la source
enlevé. Et le rédacteur écrit dans le texte ce qu'il n'a pas trouvé : « Aucune distance minimale n'est publiée »,
« Règle d'atelier, non sourcée ».

Mesure : 24, 52 et 43 guillemets ouvrants, presque tous des citations de sources ; au ch. 95, 4 « Règle d'atelier, non
sourcée » (l. 166, 246, 386, 509), 4 « n'est donné(e) ici » ou « n'est publiée » (l. 125, 218, 339, 366), 2 « le livre
n'en invente pas » (l. 126, 219), et « publié » 4 fois de plus (l. 24, 48, 216, 398) ; au ch. 107, « Le mot important
est » (l. 197), « Le mot « abri » couvre » (l. 345).

| où | le texte | la même chose, dite par le livre |
| --- | --- | --- |
| ch. 95, l. 216 | « La règle publiée est celle-là, mot pour mot : «Rendez inaccessible la nourriture à l'extérieur (compost, ordure ménagère, nourriture pour animaux domestiques…) ». **Aucune distance minimale n'est publiée**, ni par rapport au camp, ni par rapport au jardin : le livre n'en invente pas. Bac fermé, couvercle **lesté** — un couvercle qui ne tient que par son propre poids s'ouvre à la première patte. » | « Fermer le bac et lester son couvercle, pour qu'aucun animal n'atteigne ce qu'il contient : un couvercle qui ne tient que par son poids s'ouvre au premier coup de patte. » |
| ch. 95, l. 125 | « **Aucune dose de chaux n'est donnée ici** : elle est calculée dans le rapport d'analyse, en fonction de la texture et du pH mesuré. Le livre n'en invente pas. » | « La dose de chaux se lit dans le rapport d'analyse, qui la calcule selon la texture du sol et le pH mesuré. » |
| ch. 95, l. 165 | « **L'ail se plante à l'automne** pour la récolte de l'été suivant : il lui faut passer l'hiver en terre. Règle d'atelier, non sourcée. » | « Planter l'ail à l'automne, pour le récolter l'été suivant : il doit passer l'hiver en terre. [À VÉRIFIER] » (la marque de CLAUDE.md, levée ou coupée avant l'impression ; la note de provenance va dans `suivi/`) |
| ch. 95, l. 119 | « «Insérez la truelle et prélevez un peu de terre à une profondeur équivalente à la zone racinaire de la plante cultivée (environ 15 à 30 cm). » «On recommande de faire 6 prélèvements (plus pour un très grand jardin). » Mélanger, et «conservez environ 250 ml (1 tasse) de ce mélange » » | « Avec une truelle, prendre un peu de terre à six endroits du jardin (plus pour un très grand jardin), à la profondeur des racines de ce qu'on cultive, environ 15 à 30 cm. Mélanger, et garder environ 250 ml (1 tasse) du mélange. » |
| ch. 107, l. 195 | « Le gaz «peut exploser même en l'absence d'air à une température élevée, à une pression manométrique supérieure à 15 livres par pouce carré (lb/po²) [103 kilopascals (kPa)] ». Le mot important est «même en l'absence d'air » : au-dessus de ce seuil, l'acétylène ne brûle pas, il se décompose, et retirer l'oxygène ne protège de rien. «Pousser un peu » pour couper plus vite n'existe pas. » | « Au-dessus de cette pression, l'acétylène chaud peut exploser même sans air, parce qu'il se décompose tout seul, et fermer l'oxygène ne protège de rien. Ne pas monter la pression, même un peu, pour couper plus vite. » |
| ch. 107, l. 344 | « «N'utilisez pas les appareils ou véhicules pouvant dégager du monoxyde de carbone à l'intérieur d'une pièce, d'un **abri** ou d'un véhicule ». Le mot «abri » couvre l'appentis, l'auvent et la bâche tendue pour souder au sec : c'est le geste que la pluie rend tentant. » | « On ne fait jamais marcher un appareil qui peut faire du monoxyde dans une pièce, un véhicule ou un abri. L'appentis, l'auvent et la bâche qu'on tend pour souder au sec quand il pleut sont des abris. » |

Cause : CLAUDE.md, règle 1 : « La provenance ne s'imprime pas », mais la discipline de recherche est si présente dans
les règles (chercher avant d'écrire, enregistrer la page, noter la provenance) que le rédacteur la montre au lecteur
pour prouver qu'il n'invente rien. Le retrait des attributions a enlevé le nom de la source et laissé sa phrase. Le
skill dit « Pas de citation de source » (section « Les guillemets ») et CLAUDE.md dit comment marquer ce qui ne se
vérifie pas (`[À VÉRIFIER]`), mais aucune ligne du tableau « Ce qui sort » ne nomme « la phrase qui dit ce que la
recherche n'a pas trouvé ».

### Motif 5. La redite : le même fait deux à quatre fois dans le chapitre (moyenne)

Le fait revient, souvent mot pour mot, dans la variante d'urgence ou dans le Danger, après avoir été dit dans l'étape.
Le délayage du lot est là plus que dans le bavardage. Voir l'inventaire de la section 1.

Mesure : `controle.py`, 7, 29 et 16 redites ; 16 faits redits dans l'inventaire par idée, dont 6 presque mot pour mot.

| où | le texte | la même chose, dite une fois |
| --- | --- | --- |
| ch. 95, l. 532 (déjà l. 190 à 194) | « **Si le lièvre finit au collet en bordure du jardin, il se manipule avec des gants** — la tularémie passe par la peau et les muqueuses au moment du dépouillement, et un jardinier a les mains éraflées (ch. 48). » | « Manipuler le lièvre pris au collet avec des gants étanches (étape 21). » |
| ch. 95, l. 551 (déjà l. 239 à 243) | « Presque tout ce qui sort d'un jardin est peu acide. Le sel n'y change rien, le vinaigre versé au goût n'y change rien, et **le botulisme ne modifie ni l'odeur, ni le goût, ni l'apparence du pot**. Il n'y a pas de variante d'urgence à ça : ce qui ne peut pas être mis en pot correctement va au caveau (ch. 79) ou en fermentation (ch. 80), et rien d'autre (ch. 78). » | « On ne met pas un légume peu acide en pot sans autoclave (étape 29). Ce qu'on ne peut pas mettre en pot comme il faut va au caveau (ch. 79) ou en fermentation (ch. 80). » |
| ch. 95, l. 114 (et l. 473, l. 491) | « Le jardin qu'on arrose est toujours meilleur que le jardin deux fois plus grand qu'on n'arrose pas. » ; « Un jardin de 10 m² arrosé bat un jardin de 30 m² abandonné en août. » ; « C'est pour ça que la surface se fixe sur les voyages et pas sur l'envie. » | (rien) : l'étape 5 (« Fixer la surface à partir de l'eau ») et la l. 472 (« on réduit la surface jusqu'à ce que le nombre de voyages soit tenable ») le disent. |
| ch. 107, l. 523 (déjà l. 99 à 102 et 379 à 381) | « Et la bobine sans étiquette est au plomb : elle ne s'approche ni d'un chaudron, ni d'une cuve de saumure (ch. 76), ni d'un évaporateur à sève (ch. 94), ni d'une grille qui reçoit du gras (ch. 70, ch. 77). Voir §8, bloc 5. » | « Et la bobine sans étiquette est au plomb : on ne s'en sert jamais sur ce qui touche les aliments ou l'eau (section 8, point 5). » |
| ch. 83, l. 445 (déjà l. 238) | « Une pièce rapportée sur une perforation ne tient pas : le métal travaille à chaque feu, et un conduit percé se raccourcit ou se remplace, il ne se répare pas. » | « On raccourcit ou on remplace un conduit percé (section 7, dernière ligne). » |
| ch. 107, l. 505 (déjà l. 206, 285, 492) | « Le fer ne fond pas la soudure : **il chauffe la pièce, et c'est la pièce qui fond la soudure**. » | « Comme au brasage, on chauffe la pièce avec le fer, et c'est la pièce chaude qui fait fondre la soudure (étape 31). » |

Cause : CLAUDE.md dit qu'un fait se dit une fois par chapitre, mais le gabarit en neuf sections avait une section 8
(Danger) et une section 9 (Variante) qui reprenaient la procédure ; et la règle des rappels de sécurité (« se répètent
dans chaque chapitre concerné ») est lue comme « dans chaque section ». Le cadre le précise (« les rappels de sécurité
dans leur étape et à côté de leur pictogramme seulement »), le texte de ce lot est d'avant.

### Motif 6. Le « Pourquoi ça marche » en lois enchaînées (moyenne)

La section 3 aligne des vérités générales, chacune coupée par un deux-points, sans lien entre elles ni avec la
procédure ; une liste de noms tient lieu de phrase (« Bois humide, air étouffé, petit feu mou… : trois façons ») ; le
lien se fait par « d'où ». C'est le paragraphe en paraboles du tableau du skill. La section 3 disparaît au nouveau
gabarit, mais son contenu doit aller dans les étapes : s'il y va tel quel, le défaut le suit.

Mesure : 102, 116 et 113 mots en 4, 4 et 5 phrases ; 25,5, 29,0 et 22,6 mots par phrase ; 50, 75 et 60 % de phrases
à deux-points ; aucun « parce que » ni « quand » dans les trois.

| où | le texte | la même chose, avec ses liens |
| --- | --- | --- |
| ch. 83, l. 59 | « Ces gaz ne chauffent que s'ils s'enflamment dans le foyer ; sinon, ils se condensent en créosote dans le tuyau froid, et la chaleur perdue pour la pièce y attend un allumage. » | « Ces gaz chauffent la pièce seulement s'ils prennent feu dans le foyer. Sinon, ils se déposent en créosote dans le tuyau froid, et cette créosote peut prendre feu plus tard. » |
| ch. 83, l. 61 | « Bois humide, air étouffé, petit feu mou dans un gros tuyau : trois façons de les laisser partir sans brûler. » | « Ces gaz partent sans brûler quand le bois est humide, quand on étouffe l'air, ou quand le feu est trop petit et trop mou pour un gros tuyau. » |
| ch. 95, l. 74 | « La contrainte du Nord n'est pas la lumière, c'est la chaleur : tout le travail revient à **gagner des degrés et des jours aux deux bouts** — sol plus sombre, plus haut, mieux drainé, couvert la nuit. » | « Dans le Nord, le jardin manque de chaleur plus que de lumière. Tout le travail sert donc à réchauffer le sol et à allonger la saison au printemps et à l'automne : on rend le sol plus sombre, on le monte, on le draine mieux et on le couvre la nuit. » |
| ch. 95, l. 78 | « d'où la pente, et la toile, qui ne chauffe rien mais bloque le rayonnement. L'eau est le facteur limitant, et le paillis est le seul moyen d'en demander moins. » | « C'est pour ça qu'on met le jardin sur la pente et qu'on le couvre d'une toile : elle ne chauffe rien, mais elle empêche la chaleur du sol de partir vers le ciel. C'est l'eau qui limite la taille du jardin, et le paillis est le seul moyen d'arroser moins. » |
| ch. 107, l. 64 | « Un joint tient par l'une de deux choses. **Souder** fond les deux pièces en un seul morceau ; **braser** ne fond que l'apport, tiré par capillarité dans un joint serré : moins fort, mais ça répare la fonte sans la fondre et joint deux métaux différents. » | « Il y a deux façons de faire tenir un joint. Quand on soude, les deux pièces fondent et forment un seul morceau. Quand on brase, seul le métal d'apport fond, et le joint serré l'aspire par capillarité. Le brasage est moins fort, mais il répare la fonte sans la fondre et il joint deux métaux différents. » |
| ch. 107, l. 68 | « Refroidi trop vite (pièce épaisse, gelée ou arrosée), le métal autour du joint durcit, reste tendu et fissure des jours plus tard : on préchauffe toute la pièce pour **ralentir** le refroidissement. » | « Quand le métal autour du joint refroidit trop vite, parce que la pièce est épaisse, gelée ou arrosée, il durcit, reste tendu et fissure des jours plus tard. C'est pour ça qu'on préchauffe toute la pièce : elle refroidit plus lentement. » |

Cause : `gabarit-chapitre.md`, section 3 : « Trois à cinq phrases de principe, 120 mots au plus : le mécanisme, pas son
histoire ni ses exemples. » Le plafond oblige à loger quatre mécanismes en 110 mots ; le rédacteur garde les
mécanismes et coupe les liens. Le skill a la bonne règle (ligne « paragraphe en paraboles » : « on passe d'un mécanisme
à l'autre par un lien qui se lit »), mais le plafond du gabarit la rend impossible à tenir.

### Motif 7. La formule qui tient lieu de fait : chute, maxime, « pas X, c'est Y » (moyenne)

Le paragraphe finit sur une formule qui redit en image ce qu'on vient de dire (délayé), ou qui remplace le fait par
un raccourci à décoder (« il a une échéance ») (compressé). Dans les deux cas, la phrase n'apprend rien de plus.

Mesure : `controle.py`, 11, 12 et 9 mises en relief et oppositions, 3, 1 et 0 maximes ; le motif « pas X, c'est Y »
revient 5, 7 et 9 fois.

| où | le texte | la même chose, sans formule |
| --- | --- | --- |
| ch. 83, l. 508 | « un conduit qui traverse du bois sans dégagement n'a pas de variante, il a une échéance. » | « un conduit qui traverse du bois sans dégagement n'a pas de solution de fortune, et tôt ou tard, un feu de conduit entrera dans la charpente par là. » |
| ch. 83, l. 125 | « C'est l'humidimètre du pauvre, et il ne se brise pas. » | (rien) : la phrase d'avant dit ce que la bûche témoin mesure. |
| ch. 95, l. 457 | « C'est le vrai prix d'un jardin d'urgence : pas l'argent, la présence. » | (rien) : la phrase d'avant le dit (« Elles demandent quelqu'un au chalet deux fois par jour. »). |
| ch. 95, l. 531 | « Un manche rentré le soir est un manche qui existe encore le matin. » | « Rentrer les manches d'outils le soir. » |
| ch. 107, l. 151 | « Le décapage n'est pas une finition, c'est la moitié du joint. » | (rien) : la phrase d'avant dit ce que la peinture et l'huile font au joint. |
| ch. 107, l. 350 | « La confusion **est** le danger. » | (rien) : la phrase d'avant dit que les symptômes sont ceux qu'un soudeur met sur le compte des fumées. |

Cause : une habitude d'écriture, la fin de paragraphe « qui sonne ». Le skill la nomme (« La chute en formule »,
« L'opposition fabriquée », la maxime), mais il la classe dans le style ; sous ce regard, c'est aussi de la densité mal
placée : une phrase de plus qui redit, ou une phrase trop courte qui cache.

### Motif 8. Le mot-code : un verbe figuré ou un mot privé à la place du fait (moyenne)

Un verbe figuré compresse une phrase entière (« se paie », « tranche », « ment », « décroche ») ; un mot ordinaire
prend un sens privé (« fermé » et « ouvert » pour interdit et permis, « poste » pour une plante ou un élément). Le
lecteur doit traduire avant de comprendre.

Mesure : « fermé » ou « ouvert » au sens d'interdit ou permis, 5 fois au ch. 107 (l. 37, 102, 381, 382, 496) ; « se paie » 4 fois (ch. 83, l. 270 ;
ch. 107, l. 51 et 378 ; ch. 95, l. 54 « paie l'hiver ») ; « tranche » 3 fois au ch. 83 ; « poste » 2 fois au ch. 95 ;
« bat », « encaisse », « gagne », « décroche », « ment ».

| où | le texte | la même chose, en clair |
| --- | --- | --- |
| ch. 107, l. 101 | « c'est le plomb et le cadmium qui sont fermés, pas la réparation » | « on peut faire la réparation, mais jamais avec un apport qui contient du plomb ou du cadmium » |
| ch. 95, l. 54 (case) | « C'est le groupe qui paie l'hiver » | « Ce sont les légumes qu'on garde tout l'hiver » |
| ch. 95, l. 59 (case) | « Le groupe qui décroche en premier quand la saison est courte » | « Les premiers à ne pas mûrir quand la saison est courte » |
| ch. 83, l. 268 | « deux minutes à chercher des tuques se paient en perte de conscience » | « si on prend deux minutes pour chercher les tuques, on peut perdre connaissance avant d'être sorti » |
| ch. 107, l. 377 | « Un joint réparé un printemps se paie sur un enfant trois ans plus tard, et rien dans l'intervalle ne fait le lien. » | « Les effets sur un enfant peuvent apparaître trois ans après la réparation, et rien entre les deux ne fait penser au joint. » |
| ch. 95, l. 462 | « la rhubarbe est le seul poste du jardin qui se multiplie sans passer par la graine » | « la rhubarbe est la seule plante du jardin qu'on multiplie sans passer par la graine » |

Cause : une habitude, le raccourci « qui sonne bien ». La règle 15 du skill (le mot qu'on dit) vise le vocabulaire de
livre (« somnolence », « lucide »), pas le verbe figuré ; la ligne « la chose qui pense » attrape « ment » mais pas
« se paie » ni « fermé ». La règle 14 (une notion s'explique à sa première apparition) attrape les mots inventés, pas
un mot ordinaire détourné.

### Motif 9. La phrase qui parle du livre, de la section ou du tableau (basse)

Le texte se commente : ce que vaut le tableau, pourquoi le livre a choisi trois heures, ce qu'est la variante. Le
lecteur n'en sait pas plus sur quoi faire. C'est du délayage pur, et facile à couper.

Mesure : 2 au ch. 83, 5 au ch. 95, 6 au ch. 107 (en comptant les paragraphes « Ce qui n'est pas dans ce chapitre »,
qui sont des listes de renvois).

| où | le texte | ce qui reste |
| --- | --- | --- |
| ch. 95, l. 36 | « Le tableau ferme des illusions, et c'est l'essentiel de la section. » | (rien) |
| ch. 95, l. 374 | « C'est la version qui a nourri la Côte-Nord avant les centres de jardin. Elle marche moins bien, et chaque poste dit ici ce qu'il coûte. » | (rien) |
| ch. 95, l. 242 | « Tout le détail est au ch. 78 ; la règle, elle, se répète ici parce que la récolte arrive d'un coup et que c'est à ce moment-là qu'on improvise. » | « Le détail est au ch. 78. » |
| ch. 107, l. 288 | « Ce tableau-là est plus important que l'autre. » | (rien) |
| ch. 107, l. 240 | « C'est la situation ordinaire d'un chalet, et c'est pourquoi le livre met le défaut à 3 heures plutôt qu'à 60 minutes dès qu'on travaille sur du bois. » | (rien) : l'étape dit déjà « 3 heures ou plus dès qu'il y a du bois ». |
| ch. 107, l. 399 | « C'est la variante maîtresse du chapitre. » | (rien) |

Cause : le skill le nomme (« La phrase qui parle du livre, du chapitre, de la page »), mais le rédacteur défend ses
choix devant un relecteur qu'il imagine. Le gabarit de l'époque y poussait aussi : « chaque poste dit ici ce qu'il
coûte » reprend la consigne « Ce qu'on perd » du gabarit de la variante d'urgence.

### Motif 10. L'insistance qui gonfle (basse)

« Honnêtement », « exactement », « vraiment », « infiniment », « très concrètement », « et il faut le dire »,
« précisément » : des mots qui demandent au lecteur de croire au lieu de lui donner le fait. Le « jamais » répété
(3,4 pour 1000 mots, huit fois les références) est de la même famille quand il ne fait que renforcer une consigne déjà
dite.

Mesure : « exactement » 3, 2, 3 ; « honnête » ou « honnêtement » 2, 0, 2 ; « vraiment » 0, 2, 3 ; « pour vrai »,
« justement », « infiniment », « très concrètement » (ch. 95) ; « précisément », « il faut le dire » (ch. 107).

| où | le texte | la même chose, sans insister |
| --- | --- | --- |
| ch. 107, l. 495 | « *Ce qu'on perd, honnêtement :* le contrôle. » | « Ce qu'on perd : le contrôle de la chaleur. » |
| ch. 83, l. 167 | « **La nuit, choisir honnêtement.** » | « La nuit, choisir entre une longue chaleur et un feu propre. » |
| ch. 107, l. 554 | « *Ce que ça ne garantit pas, et il faut le dire :* » | « Ce que ça ne garantit pas : » |
| ch. 95, l. 541 | « vaut infiniment mieux qu'un couvercle qui ne tient que par son poids. **Ce qu'on perd :** de la sécurité, très concrètement, et c'est le point où la variante d'urgence coûte le plus cher (§8, point 4). » | « vaut mieux qu'un couvercle qui ne tient que par son poids. Ce qu'on perd : de la sécurité, et c'est là que la variante d'urgence coûte le plus cher (section 8, point 4). » |
| ch. 83, l. 388 | « Un feu mou sur du bois humide est exactement la combinaison qui remplit un conduit en une saison. » | « Un feu mou sur du bois humide remplit un conduit en une saison. » |
| ch. 107, l. 349 | « sont précisément ceux qu'un soudeur attribue aux fumées, à la chaleur et à une longue journée » | « sont ceux qu'un soudeur met sur le compte des fumées, de la chaleur et d'une longue journée » |

Cause : le skill met « vraiment, exactement, précisément » dans les mots vides et `controle.py` les relève (41, 56 et 45
avis « mots vides ») ; « honnête » et « il faut le dire » n'y sont pas. Le rédacteur les emploie comme un gage de
franchise, à côté de chaque « Ce qu'on perd ».

## 4. Ce qui marche : des modèles

1. **Le mécanisme dans l'étape qu'il explique, avec des liens de temps** (ch. 83, l. 136) :
   « Le foyer se réchauffe et le tuyau monte en température pendant que les bûches du bas ne dégagent pas encore de
   gaz ; quand elles s'y mettent, leurs gaz traversent une zone déjà en flammes et brûlent au lieu de s'envoler. »
   Aucun deux-points : « pendant que », « quand », « au lieu de » font le tempo, et le mécanisme dit pourquoi on allume
   par le haut, à l'endroit où on allume. C'est ce que le §3 devrait devenir.

2. **Le geste, puis ce qu'on voit, dans les deux cas** (ch. 83, l. 402) :
   « on fend une allumette épaisse dans le cœur d'une bûche et on l'approche d'une flamme. Sèche, elle prend et se
   recroqueville ; humide, elle noircit, siffle par un bout et s'éteint dès qu'on retire la flamme. »
   « Sèche, » et « humide, » sont des raccourcis, mais des raccourcis parlés : la phrase d'avant a posé la question, et
   l'oreille entend « si elle est sèche ».

3. **Le test qui suit les mains, avec « si » et « donc »** (ch. 95, l. 389) :
   « Une cuillère de terre dans un pot, du vinaigre dessus : si ça pétille, le sol porte du calcaire, donc il penche du
   côté alcalin. Une autre cuillère, mouillée à l'eau, du bicarbonate dessus : si ça pétille, il est acide. »
   La phrase commence sans verbe et se comprend du premier coup, parce que les noms suivent l'ordre des gestes ; le
   deux-points ouvre le test, et « si » et « donc » portent la logique. C'est la limite entre le télégraphe et la
   phrase parlée : le nom seul passe quand il est un geste qu'on voit faire.

4. **Le concret qu'on touche, sans abstraction** (ch. 107, l. 405) :
   « Le + de la première va au − de la deuxième, le + de la deuxième au − de la troisième. Il reste un + libre à un bout
   et un − libre à l'autre : ce sont les deux seules bornes qu'on touche. Deux + réunis, c'est du parallèle : ça donne
   toujours 12 V et ça ne fera jamais d'arc. »
   Chaque phrase dit un branchement ou ce qu'on voit sur le banc ; le mot technique (« parallèle ») arrive après la
   chose, expliqué par ce qu'il fait.

5. **Le court qui reste parlé** (ch. 107, l. 176) :
   « Régler l'intensité là, pas sur la pièce. Trop peu : l'électrode colle et le cordon reste bombé sans se fondre aux
   bords. Trop : ça creuse, ça troue, ça projette. »
   « Trop peu : » est le raccourci qu'on dit dans le garage, et il marche parce que la phrase d'avant vient de nommer
   l'intensité. Ce modèle sert à écrire la règle du deux-points : il passe quand ce qui le précède est une condition
   que le lecteur vient d'entendre, et qu'il dit « si c'est trop peu » sans relire.

## 5. Ce que la densité demande aux règles (pistes pour la réécriture du skill)

1. **Nommer ce qui ne se coupe jamais : les mots de liaison.** La règle 0 dit « couper ce qui fait une phrase française,
   non » ; elle devrait dire lesquels : « pour », « parce que », « si », « sinon », « quand », « donc », « alors »,
   « mais ». Couper un « déjà » qui ne dit rien, oui ; couper un « pour » qui dit le but, jamais.
2. **Le deux-points à sa place.** Il annonce une liste ou une explication que la phrase vient de promettre ; il ne
   remplace ni « pour », ni « si », ni « sinon », et il n'ouvre pas sur un mot seul (« : lunettes »). Changer le
   modèle de la règle 2 (« Vidanger avant que la maison descende sous 5 °C, parce qu'un tuyau plein fend en gelant. »)
   et l'ordre de la section du tiret : la réécriture, le point, la virgule, les parenthèses, et les deux-points en
   dernier. Ce lot a 175 tirets à remplacer.
3. **Distinguer deux raisons.** La raison que le lecteur connaît déjà sort (« la tôle n'arrête rien ») ; la raison qui
   change le geste reste, et elle se dit avec « parce que » ou « pour » (« Mesurer sur une face qu'on vient de fendre,
   parce que… »). La ligne « La justification collée au geste » du tableau ne montre que la première.
4. **Le gabarit ne plafonne pas la phrase.** Section 1 : deux ou trois phrases courtes plutôt qu'« Une phrase. Pas
   deux. » ; le Matériel : une ligne qui a un sujet et un verbe (« Thermomètre à sonde : il sert à vérifier les 74 °C à
   cœur. On ne peut pas le fabriquer. ») plutôt que le modèle sans sujet ; plus de flèche « (→ section 9) », un renvoi
   en mots. Quand le contenu de l'ancienne section 3 descend dans les étapes, il y descend avec ses liens.
5. **La trace de la recherche sort.** Une ligne au tableau « Ce qui sort » : la citation de source entre guillemets, le
   vouvoiement d'une institution, « publié », « n'est donné ici », « le livre n'en invente pas », « Règle d'atelier,
   non sourcée ». Ce qui n'est pas vérifié porte `[À VÉRIFIER]` (CLAUDE.md) ; ce qui l'est se dit dans la voix du
   livre.
6. **Un auditeur de la densité**, pour le skill réécrit : mesurer, par chapitre et contre les textes de référence, les
   deux-points, « pour », « si » et « c'est » pour 1000 mots, les phrases de 30 mots et plus, les phrases sans verbe hors
   des titres, les « Ce qu'on perd : » suivis d'un nom seul, les mots-codes (« fermé », « se paie », « tranche »,
   « poste ») et la trace de la recherche ; puis lire à voix haute chaque phrase à deux-points avec une seule question :
   « Quel petit mot manque ici ? ». Les seuils se calent sur les références, pas au jugé.

## 6. Hors de mon regard (vu en passant, non jugé)

- Les trois chapitres sont au gabarit en neuf sections : section 2 avec « bon choix » et « mauvais choix », section 3,
  section 8 Danger, « § » (1, 25, 33), tirets (46, 71, 44 au script), points de contrôle à 12, 18 et 17 lignes, signes
  d'échec à 12, 14 et 15 lignes.
- Ch. 107 : « Consulter sans attendre d'aller plus mal », « Urgence médicale », « Consulter si ça ne rentre pas dans
  l'ordre » (lignes 293 à 295), contraires à « aucun service qui répond » ; « On remplace. » (l. 34).
- Âges des enfants : ch. 95, l. 46 et 335 ; ch. 107, l. 138.
- Noms latins (ch. 95, tableau et variante ; ch. 83 ; ch. 107, l. 21, 573, 574).
- Ch. 95 : quatre « Règle d'atelier, non sourcée » à transformer en `[À VÉRIFIER]` ou à sourcer (règle 1).
- Pronominaux de consigne relevés en passant : « se manipule » (ch. 95, l. 191, 532), « l'échantillon se prend »
  (ch. 95, l. 124), « ne s'allume pas » (ch. 107, l. 204), « se pose » (ch. 83, l. 383), « se rétablit » (ch. 83,
  l. 349).

## 7. Liste de contrôle (ma partie de `.claude/cadre-agents.md` : l'écriture et la langue)

Pour tout agent
- [x] `CLAUDE.md` pris comme déjà chargé, pas relu.
- [x] Le skill de ma partie (`ecriture`) lu au complet ; `gabarit-chapitre.md` et `plan/decisions-jp.md` lus par plages.
- [ ] Les points de la PAUSE du 15 octobre : pas lus ; audit sans modification, aucune décision à appliquer.
- [x] Règle 1 : aucun chiffre neuf dans les réécritures ; le maillon du monoxyde tiré du ch. 83 est signalé pour le
  vérificateur, pas réécrit dans la page des dangers.
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
- [x] Pas de loi en formule, jamais « d'où » (le « d'où » du ch. 95, l. 78, est réécrit au motif 6).
- [x] Pas de « X passe là où Y ne passe pas ».
- [x] Pas de maxime, de chute, d'opposition fabriquée ni d'image dans les réécritures (motif 7 : plusieurs coupes).
- [x] Pas de chose qui pense : « ment », « tranche », « la bûche témoin tranche » réécrits (motifs 1 et 8).
- [x] Consigne jamais au pronominal dans les réécritures (« Manipuler le lièvre… », « On ne met pas un légume peu acide
  en pot… »).
- [x] Consigne dite comme une consigne ; sujet nommé ; ordre naturel.
- [ ] Points de contrôle et signes d'échec à 5 à 8 lignes : sans objet pour un audit ; dépassements signalés
  (section 6).
- [ ] Pages des dangers : sans objet, sauf la lecture du paragraphe du monoxyde (section 2).
- [x] Un passage lourd se juge d'abord (doit-il exister ?) : plusieurs réécritures sont des coupes (motifs 5, 7 et 9).
- [ ] Passe d'éditeur : sans objet.
- [x] Le chapitre parle de son sujet : rien de neuf à signaler sous ce regard.
- [x] Une notion s'explique à sa première apparition : les mots-codes sont relevés (motif 8).
- [ ] « Quand l'utiliser » en titres de situation : sans objet ; les trois chapitres ont encore « bon choix » et
  « mauvais choix » (section 6).
- [x] Qui fait quoi, sans détour ; la liste qui mélange des pièces et des défauts (ch. 83, l. 201) est relevée et
  réécrite (motif 3).
- [x] Le mot qu'on dit : « on perd connaissance », « met sur le compte », « qu'on vient de fendre ».
- [x] La chose nommée plutôt que le possessif.
- [x] Mots de tous les jours : « ultraviolet » plutôt que « UV », « barbecue » plutôt que « BBQ », « chaux » plutôt que
  « surchaulé ».
- [x] Aucun tiret dans les réécritures ; « section N » à la place de « § » dans les réécritures.
- [x] Titres de sous-sections : « La nuit, choisir honnêtement » relevé (motif 10).
- [x] « X ne fait pas Y : il fait Z » relevé et réécrit (ch. 107, l. 505, motif 5).

La procédure
- [ ] Sous-étapes : sans objet pour un audit ; la procédure rangée dans une case de tableau est signalée (motif 3).

La répétition
- [x] Inventaire des faits du lot fait pour les faits les plus redits (section 1, motif 5).
- [x] Un nom ne revient pas à chaque phrase dans les réécritures.

Avant de rendre
- [x] `controle.py` et `tempo.py --par-fichier` lancés sur les trois chapitres, pour les mesures ; aucun fichier du
  livre touché.

La langue
- [x] Les réécritures relues : accords, participes, « a / à », « ou / où », subjonctif.
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures.
- [x] Ni joual ni anglicisme.
