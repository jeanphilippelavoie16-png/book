# Audit de l'écriture : la consigne, lot A (tome 1 refait)

28 octobre 2026. Un seul regard : la consigne. Qui fait quoi, quand, dans quel ordre ; un geste par phrase ou une étape
qui en entasse cinq ; la condition avant ou après le geste ; le pourquoi qui aide ou qui alourdit ; le chiffre à sa
place ; une étape qu'on suit les mains occupées, à la lampe frontale ; les séries orange, les tableaux Points de
contrôle et Signes d'échec, les lignes de Matériel, les titres de « Quand l'utiliser ».

Lot, lu au complet : `chapitres/01-les-quatre-horloges.md`, `chapitres/03-panne-majeure-d-hydro-en.md`,
`dangers/partie-1.md`, `dangers/partie-2.md`. Aucun fichier du livre n'a été modifié. Les réécritures sont des
exemples, sans fait ni chiffre neuf : quand une réécriture demanderait un fait que le texte n'a pas, la place est
marquée entre crochets pour le rédacteur, avec sa source. Les numéros de ligne sont ceux des fichiers au 28 octobre.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 1 | 1337 | 77 | 17,4 | 0,65 | 18,2 | 11,7 | 30,3 | 33,8 | 27,3 | 8,2 | 18,7 | 3,7 |
| ch. 3 | 7757 | 370 | 21,0 | 0,57 | 10,8 | 21,6 | 23,6 | 37,6 | 30,0 | 3,4 | 17,5 | 5,8 |
| dangers, partie 1 | 4305 | 261 | 16,5 | 0,64 | 22,6 | 11,9 | 13,1 | 22,6 | 19,2 | 3,0 | 6,0 | 4,2 |
| dangers, partie 2 | 4101 | 237 | 17,3 | 0,66 | 24,5 | 14,8 | 19,5 | 18,1 | 16,0 | 7,1 | 6,3 | 5,9 |

### Le même script, découpé par sorte de consigne

Extraits faits dans le scratchpad (la procédure du ch. 3, ses trois séries orange seules, sa section 7, les listes
« Ce qu'on fait » des 36 dangers, et le reste des pages des dangers).

| texte | mots | m/phr | ≤6 % | ≥30 % | « : » % | fait:csq % |
| --- | --- | --- | --- | --- | --- | --- |
| **ch. 3, les trois séries orange** (étapes 1 à 13) | 1876 | **24,1** | **0,0** | **25,6** | **41,0** | **34,6** |
| ch. 3, toute la procédure | 4013 | 21,9 | 6,0 | 21,9 | 36,6 | 30,1 |
| ch. 3, section 7 | 3113 | 19,8 | 17,2 | 20,4 | 39,5 | 30,6 |
| dangers, listes « Ce qu'on fait » | 3761 | 18,3 | 2,9 | 10,2 | 22,0 | 17,1 |
| dangers, « Ce qui arrive » et « Comment on le reconnaît » | 4537 | 17,7 | 29,2 | 17,5 | 22,2 | 20,6 |

**Le texte le plus urgent du lot a le tempo le plus lent.** Les séries orange du ch. 3, celles qu'on lit dans les
premières minutes, ont les phrases les plus longues du lot, aucune phrase courte, et une phrase sur trois bâtie en
« fait : conséquence ». Les listes « Ce qu'on fait » des pages des dangers, elles, se lisent bien : c'est le modèle
à suivre dans les chapitres.

### Les mesures de ce regard (script de travail, approximatif)

Une phrase compte comme consigne si elle s'ouvre sur un infinitif, sur « ne jamais / ne pas / ne rien », sur « il
faut / on doit », ou sur une condition suivie d'un infinitif ; sinon c'est un fait.

| | ch. 1 | ch. 3 | dangers 1 | dangers 2 |
| --- | --- | --- | --- | --- |
| étapes numérotées | 7 | 40 | 82 | 71 |
| mots par étape, moyenne (médiane) | 81 (41) | 101 (89) | 26,8 (26) | 22,7 (22) |
| étape la plus longue | 305 (étape 2) | 327 (étape 5) | 56 | 40 |
| étapes de plus de 100 mots | 1 | 15 | 0 | 0 |
| phrases d'étape qui sont des faits | 13 sur 26 | 56 sur 167 | 20 sur 120 | 12 sur 84 |
| étapes en « geste, fait, geste » | 1 | 12 | 0 | 0 |
| étapes ouvertes par leur condition | 1 | 7 (et 11 sous-étapes) | 31 | 21 |
| « sinon » dans tout le fichier | 0 | 1 | 3 | 2 |

Autres comptes, faits à la main :

- Série orange « 15 min » du ch. 3 : 5 étapes, 803 mots, dont 327 pour l'étape 5. Série « 6 h » : 6 étapes, 916 mots.
- Section 7 du ch. 3 : 14 phrases de consigne en « On + présent » (« On la sort et on la rentre… », « On couvre… »),
  à côté de phrases à l'infinitif dans les mêmes sous-sections.
- « Ce qu'on perd » : 6 blocs sur 8 (ch. 1 et 3) contiennent une consigne.
- Pages des dangers : 8 dangers sur 36 mettent un geste dans « Comment on le reconnaît », dont 5 sont des décisions
  (« on fait comme si », « il faut décider de partir », « on recule »).
- Tableaux des sections 5 et 6 (ch. 1 et 3, 29 lignes) : 6 lignes dont l'action n'est qu'un renvoi ou qu'une
  interdiction, 3 lignes qui redisent une étape, des cellules jusqu'à 44 mots.
- Matériel : les 9 lignes font 22 à 26 mots (la règle dit 15 à 20) ; 3 portent une consigne ou un « il dit ».
- « À la normale » à la place d'un chiffre : 3 fois dans le ch. 3 (lignes 155, 186 et 302).

## 2. Les défauts, du plus grave au moins grave

### Motif 1. L'étape qui entasse les gestes (gravité haute)

Une étape numérotée porte cinq à douze gestes, de moments différents (maintenant, matin et soir, jamais, la nuit, au
chalet), avec des faits glissés entre eux. À la lampe frontale, on ne peut ni cocher l'étape ni reprendre au bon
endroit après une interruption. Le défaut n'est pas la longueur : JP a demandé la version détaillée dans l'orange (« j'aime
ça la version détaillée »). Le défaut est que le détail n'est pas découpé en gestes. La seule étape bien découpée,
l'étape 23 du ch. 3, l'a été parce que JP l'avait signalée.

**Fréquence.** Ch. 3 : 15 étapes sur 40 dépassent 100 mots ; l'étape 5 fait 327 mots dans une série de 15 minutes.
Ch. 1 : l'étape 2 fait 305 mots, plus de la moitié des mots des sept étapes. Pages des dangers : rare (vapeurs, étape 1).

**Exemples.**

1. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 54 à 59 (étape 3, série « 15 min »). Quatre gestes, deux rubans,
   puis « ce ruban » sans qu'on sache lequel ; le geste du titre est refait dans le corps.
   > « **Écrire l'heure sur la porte du congélateur, puis n'ouvrir ni le congélateur ni le réfrigérateur.** L'écrire au
   > crayon ou au marqueur, sur un bout de ruban collé : on compte le temps des aliments à partir de cette heure-là
   > (étapes 27 à 31), et sans elle, on doit traiter tout le congélateur comme décongelé. Coller aussi du ruban à masquer
   > en travers des portes du réfrigérateur et du congélateur, pour que personne ne les ouvre : chaque ouverture fait
   > entrer de l'air chaud. Sur ce ruban, écrire de mémoire, sans ouvrir, ce qu'on triera en premier : ce qui est cru, ce
   > qui est cuit, le poisson (étape 27). »

   Réécriture :
   > 3. **Garder le congélateur et le réfrigérateur fermés, et écrire l'heure sur la porte du congélateur.**
   >    - Coller un bout de ruban à masquer en travers de chaque porte, pour que personne ne l'ouvre : chaque ouverture
   >      fait entrer de l'air chaud.
   >    - Sur le ruban du congélateur, écrire l'heure au crayon ou au marqueur. On compte le temps des aliments à partir
   >      de cette heure-là (étapes 27 à 31) ; sans elle, on doit traiter tout le congélateur comme décongelé.
   >    - Sur le même ruban, écrire de mémoire, sans ouvrir, ce qu'on triera en premier : ce qui est cru, ce qui est
   >      cuit, le poisson (étape 27).

2. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 67 à 83 (étape 5, série « 15 min »). Titre :
   > « **Tester l'avertisseur de CO au bouton, et le poser dans la pièce chauffée où la famille va dormir.** »

   Sous ce titre, cinq sous-étapes mêlent ce qu'on fait dans les 15 minutes (tester, regarder la date, poser), ce qu'on
   fait matin et soir pendant des semaines (« Lire le chiffre affiché matin et soir, sans attendre la sirène »), ce
   qu'on ne fait jamais (« Ne jamais rentrer les appareils faits pour l'extérieur ») et le cas sans avertisseur.

   Réécriture (la forme ; chaque pourquoi du texte reste dans sa sous-étape) :
   > 5. **Tester l'avertisseur de CO au bouton, et le poser dans la pièce chauffée où la famille va dormir.**
   >    - Regarder la date de fabrication inscrite au dos : passé 7 à 10 ans selon le modèle (7 ans si on ne connaît pas
   >      le modèle), faire comme si on n'en avait pas.
   >    - Le poser à au moins 2 m du poêle et de tout appareil de cuisson. S'il y en a un deuxième, le poser près de la
   >      porte du garage attenant.
   >    - Si l'avertisseur ne répond pas au bouton, ou si on n'en a pas, n'allumer dans la maison que le poêle raccordé à
   >      sa cheminée.
   >
   > Et dans la série « 6 h », une étape à elle : « **Lire le chiffre de l'avertisseur matin et soir, sans attendre la
   > sirène.** », avec ce que le texte dit des petites doses et des appareils d'extérieur.

3. `chapitres/01-les-quatre-horloges.md`, lignes 54 à 60 (étape 2, « Le corps »). Trois sujets (l'air, la pièce, les
   personnes), sept gestes et deux faits dans une sous-étape ; la cible (18 °C) arrive après le calcul qu'elle sert à
   juger.
   > « **Le corps.** Lire matin et soir le chiffre de l'avertisseur de CO (ch. 3, étape 5). L'hiver, prendre la
   > température de la pièce chauffée chaque heure, et noter l'écart avec le relevé de l'heure d'avant. Multiplier cet
   > écart par le nombre d'heures qui restent jusqu'au matin : on voit si la pièce restera assez chaude pour la nuit. Si
   > elle doit devenir trop froide, regrouper la famille pendant qu'il fait clair. Entre 18 et 24 °C, le risque est
   > minimal pour une personne qui bouge peu. Il n'existe aucune température reconnue à partir de laquelle il faut
   > partir : la famille en décide avec le ch. 2. Prendre la température dans la bouche d'une personne qui a été dehors
   > ou qui frissonne, et d'un enfant qui devient tranquille (section 5). »

   Réécriture (le 18 °C vient du tableau de la section 5, ligne 92, et de la section 6, ligne 105) :
   > - **L'air.** Lire matin et soir le chiffre de l'avertisseur de CO (ch. 3, étape 5).
   > - **La pièce, l'hiver.** Lire le thermomètre de la pièce chauffée chaque heure, et noter combien de degrés elle a
   >   perdus depuis l'heure d'avant. Multiplier cette perte par le nombre d'heures qui restent jusqu'au matin, et
   >   l'enlever de la température qu'il fait maintenant : on obtient celle qu'il fera au matin. Si elle passe sous
   >   18 °C, regrouper la famille pendant qu'il fait clair. Aucune température ne dit à elle seule qu'il faut partir :
   >   la famille en décide avec le ch. 2.
   > - **Les personnes.** Prendre la température dans la bouche d'une personne qui a été dehors ou qui frissonne, et
   >   d'un enfant qui devient tranquille (section 5).

4. `dangers/partie-1.md`, ligne 50 (vapeurs, étape 1). Six gestes de deux moments (dedans, puis dehors) dans une étape,
   et un « dehors » qui ne dit pas où on est.
   > « Dans un local qui sent l'essence ou le propane, ne rien allumer ni éteindre, sortir, puis ouvrir les portes et les
   > ouvertures du bas en restant dehors. Fermer le robinet de la bouteille, dehors, et chercher la fuite à l'eau
   > savonneuse. »

   Réécriture :
   > 1. Dans un local qui sent l'essence ou le propane, ne rien allumer ni éteindre, et sortir.
   > 2. En restant dehors, ouvrir les portes et les ouvertures du bas, puis fermer le robinet de la bouteille. Chercher
   >    ensuite la fuite à l'eau savonneuse.

**Cause.** CLAUDE.md : « l'encadré orange est la version détaillée, et tout y est : chaque étape porte son geste, son
pourquoi et le détail qui sert à le faire, sans limite de longueur ». La règle dit ce qui entre dans l'étape, pas comment
le découper. La règle du découpage existe (`.claude/cadre-agents.md`, « Une étape qui a plusieurs gestes se découpe en
sous-étapes : le geste, où est la chose et comment la reconnaître, ce qu'on voit quand c'est fait »), mais elle est
rangée sous « La procédure » et n'a été appliquée qu'à l'étape que JP a signalée (tableau du skill `ecriture`, ligne de
l'étape 23). Aucun outil ne mesure les mots par étape.

### Motif 2. Les gestes qui ne suivent pas l'ordre du temps (gravité haute)

La consigne demande un résultat qui n'existe pas encore, l'avertissement arrive après le geste qu'il gouverne, ou la
liste ne suit pas l'ordre où les choses arrivent. Le lecteur qui suit les étapes une à une fait l'erreur avant de lire
la phrase qui l'aurait empêchée.

**Fréquence.** Huit cas dans le ch. 3 (rétablissement, antigel, gants, pierres, odeur d'essence, thermomètre de la
boîte, appareil médical, torche) ; deux pages des dangers (incendie, hantavirus).

**Exemples.**

1. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 298 et 302 (étapes 36 et 38). L'étape 36 attend 18 °C dans la
   pièce ; le chauffage ne revient qu'à l'étape 38.
   > « **Attendre que la pièce soit à au moins 18 °C avant de remettre l'eau.** » … « **Remettre le chauffage peu à peu,
   > et l'électronique en dernier**, une fois les températures revenues à la normale. »

   Réécriture :
   > 35. **Arrêter la génératrice avant de remonter le disjoncteur principal**, et laisser celui du chauffe-eau à OFF
   >     s'il a été vidé.
   > 36. **Remettre le chauffage peu à peu.**
   > 37. **Attendre que la pièce soit à au moins 18 °C avant de remettre l'eau.** Rouvrir l'entrée d'eau, puis tous les
   >     robinets pour laisser sortir l'air.
   > 38. **Remettre le chauffe-eau sous tension seulement quand il est plein**, c'est-à-dire quand l'eau coule au
   >     robinet d'eau chaude (étape 23).
   > 39. **Rebrancher l'électronique en dernier.**

2. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 226 et 227 (étape 24). Le choix du produit vient après les trois
   sous-étapes où on le verse.
   > « {!poison} Prendre seulement de l'antigel à plomberie : l'antigel de moteur est toxique et reste dans la tuyauterie
   > d'eau potable. Sans antigel : section 7. »

   Réécriture (en tête de l'étape, avant les trois sous-étapes) :
   > 24. {!poison} **Verser de l'antigel à plomberie partout où il reste de l'eau, jamais de l'antigel de moteur** : il
   >     est toxique et reste dans la tuyauterie d'eau potable. Sans antigel : section 7.

3. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 281 et 282 (étape 31, la cuisson). On touche le lièvre aux
   étapes 29 (sortir la viande) et 30 (planter la sonde dans chaque paquet) ; les gants n'arrivent qu'à la cuisson.
   > « {!tularemie} Mettre des gants pour toucher le lièvre du congélateur, gelé ou dégelé : le gel ne tue pas la
   > bactérie de la tularémie (ch. 48). »

   Réécriture : la même phrase, en première sous-étape de l'étape 29, avec « avant de » :
   > - {!tularemie} Mettre des gants avant de toucher le lièvre du congélateur, gelé ou dégelé : le gel ne tue pas la
   >   bactérie de la tularémie (ch. 48).

4. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 191 à 193 (étape 20). Les deux gestes qui évitent l'explosion
   viennent après qu'on a marché dans la maison avec le bidon ; la page des vapeurs (`dangers/partie-1.md`, ligne 50)
   les met en premier.
   > « Une odeur d'essence dans la maison vient d'essence renversée, d'un bidon ou de la génératrice placés trop près :
   > sortir le bidon, aérer, n'allumer aucune flamme et ne toucher à aucun interrupteur. »

   Réécriture :
   > Si la maison sent l'essence, n'allumer aucune flamme et ne toucher à aucun interrupteur, puis sortir le bidon et
   > aérer. L'odeur vient d'essence renversée, d'un bidon ou de la génératrice placés trop près.

5. `dangers/partie-1.md`, lignes 78 à 82 (incendie). Le premier moment d'un feu (« commence à peine ») est le dernier
   point ; l'étape 2 ferme la porte du poêle puis jette de la poudre « sur le feu » sans dire par où.
   > « 5. Si le feu commence à peine, le couvrir ou l'éteindre à l'extincteur en balayant la base des flammes ; s'il
   > grandit quand même, sortir. »

   Réécriture (l'ordre où les choses arrivent) :
   > 1. Si le feu commence à peine, le couvrir ou l'éteindre à l'extincteur en balayant la base des flammes.
   > 2. S'il grandit quand même, réveiller tout le monde en criant, sortir en restant bas et fermer les portes derrière
   >    soi, sans jamais retourner à l'intérieur.
   > 3. Pendant un feu de cheminée, fermer la porte et l'arrivée d'air du poêle, et jeter de la poudre d'extincteur, du
   >    bicarbonate ou du sable sur le feu [dire par où, et à quel moment de la porte fermée : au rédacteur, avec sa
   >    source]. Jamais d'eau : la vapeur peut faire exploser le poêle.
   > 4. Pendant la nuit qui suit… 5. Les cendres… (inchangés)

6. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 259 et 260 (étape 29). On couvre la boîte d'une bâche chargée de
   bûches, puis on met le thermomètre dedans.
   > « Couvrir d'une bâche ou d'un contreplaqué chargé de bûches, et mettre un thermomètre ou le témoin de dégel dans la
   > boîte (étape 28). »

   Réécriture :
   > Mettre un thermomètre ou le témoin de dégel dans la boîte (étape 28), puis la couvrir d'une bâche ou d'un
   > contreplaqué chargé de bûches.

**Cause.** CLAUDE.md demande l'ordre du réel seulement pour l'orange (« d'abord ce qui sauve dans les secondes et les
minutes, ensuite ce qui organise »). Rien ne le demande pour le reste de la procédure, ni pour les listes « Ce qu'on
fait » des dangers (le skill `editeur` dit seulement « ce qu'on fait (trois à cinq gestes) »). Les condensations
successives (pages des dangers ramenées à 150 à 230 mots, tableaux à 8 lignes) ont regroupé et déplacé des phrases sans
repasser l'ordre. Et la règle « un avertissement dans l'étape où il sert » ne dit pas : **avant** le geste qu'il gouverne.

### Motif 3. La condition après le geste, l'exception en queue (gravité haute)

« Faire X si Y », « X, sauf si Y », « X seulement si Y », « d'abord » à la fin : le lecteur a fait X avant d'arriver à
Y. Une phrase finit parfois sur une condition qu'on ne sait plus à quoi rattacher. L'autre branche (« sinon ») manque
presque partout.

**Fréquence.** Ch. 3 : 7 étapes sur 40 s'ouvrent sur leur condition ; pages des dangers : 31 sur 82 et 21 sur 71. Le mot
« sinon » paraît une fois dans les 7757 mots du ch. 3. Une douzaine de conditions placées après le geste dans le lot.

**Exemples.**

1. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 140 et 141 (étape 11). Une condition, puis une exception à la
   condition, puis une condition à l'exception. Et c'est un geste « dès le premier soir » rangé dans une étape « Au réveil ».
   > « Partir dès le premier soir si quelqu'un dépend d'un appareil médical électrique, sauf si on l'a essayé avant la
   > panne sur une batterie d'auto et un onduleur, et qu'il marchait. »

   Réécriture (en tête de la série « 6 h », pas au réveil) :
   > Si quelqu'un dépend d'un appareil médical électrique, partir dès le premier soir. On peut rester seulement si on a
   > essayé l'appareil avant la panne sur une batterie d'auto et un onduleur, et qu'il marchait.

2. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 232 et 233 (étape 26). On ne sait pas si « si l'eau monte »
   gouverne toute la phrase ou seulement « avant le congélateur ».
   > « Le vider à la chaudière (section 7), ou brancher la pompe sur la génératrice, avant le congélateur si l'eau monte
   > sur le plancher. »

   Réécriture (la lecture la plus probable, à confirmer par le rédacteur) :
   > Quand le puisard se remplit, le vider à la chaudière (section 7) ou brancher la pompe sur la génératrice. Si l'eau
   > monte sur le plancher, brancher la pompe avant le congélateur.

3. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 102 à 106 (étape 7). La condition est le symptôme (la fumée dans
   la pièce), alors que le geste se fait avant d'allumer (« allumer le petit bois seulement à ce moment-là », « Refaire
   la torche à chaque rallumage ») : on l'apprend quand la pièce est déjà pleine de fumée.
   > « Si la fumée sort par la porte du poêle à l'allumage, la cheminée refoule : après quelques heures sans feu par grand
   > froid, l'air de la cheminée est plus froid et plus lourd que celui de la maison, et il descend. Rouler une feuille
   > de papier en torche, l'allumer et la tenir le plus haut possible dans le poêle, près de la sortie de fumée, jusqu'à
   > ce que le tirage aspire la flamme ; allumer le petit bois seulement à ce moment-là. »

   Réécriture :
   > Quand le poêle est éteint depuis quelques heures par grand froid, réchauffer la cheminée avant d'allumer le petit
   > bois : rouler une feuille de papier en torche, l'allumer et la tenir le plus haut possible dans le poêle, près de la
   > sortie de fumée, jusqu'à ce que le tirage aspire la flamme. Sinon, l'air de la cheminée, plus froid et plus lourd
   > que celui de la maison, descend, et la fumée sort par la porte du poêle. Autre façon : entrouvrir une fenêtre de la
   > pièce, du côté du vent.

4. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 97 et 110 (étape 7). La famille sans poêle lit le titre, puis
   quatre sous-étapes sur le poêle, avant d'arriver à sa branche, la dernière.
   > « **Allumer le poêle à bois, s'il y en a un** » … « **Sans poêle**, réunir la famille dans la plus petite pièce, sous
   > un abri (étape 10), suivre la température (étape 22), vidanger la maison (étapes 21 à 25), puis partir de jour,
   > pendant que la route est ouverte (ch. 2). »

   Réécriture (les deux branches sous le titre, avant les sous-étapes du poêle) :
   > 7. **S'il y a un poêle à bois, l'allumer**, avec du bois sec en petites bûches et assez d'air pour que les flammes
   >    restent vives. **Sans poêle**, réunir la famille dans la plus petite pièce, sous un abri (étape 10), suivre la
   >    température (étape 22), vidanger la maison (étapes 21 à 25), puis partir de jour, pendant que la route est
   >    ouverte (ch. 2).

5. `dangers/partie-1.md`, ligne 9 (monoxyde, étape 1). L'exception vient après la règle, et elle la contredit.
   > « Sortir tout le monde, sans chercher d'où vient le gaz. Pendant des retombées, trouver d'abord ce qui brûle et
   > l'éteindre (ch. 4, étape 18). »

   Réécriture :
   > Sauf pendant des retombées, sortir tout le monde, sans chercher d'où vient le gaz. Pendant des retombées, trouver
   > d'abord ce qui brûle et l'éteindre (ch. 4, étape 18).

6. `dangers/partie-2.md`, ligne 63 (hantavirus, étape 3). « D'abord » arrive à la fin de l'étape, après le geste qu'il
   doit précéder.
   > « Mouiller les crottes, les nids et les surfaces à l'eau de Javel (1 volume pour 9 volumes d'eau) et laisser agir
   > 10 minutes ; l'hiver, chauffer d'abord la pièce au-dessus de zéro. »

   Réécriture :
   > L'hiver, chauffer d'abord la pièce au-dessus de zéro. Mouiller ensuite les crottes, les nids et les surfaces à
   > l'eau de Javel (1 volume pour 9 volumes d'eau), et laisser agir 10 minutes.

Même famille : `dangers/partie-1.md`, ligne 202, « La dégeler seulement si elle ne risque pas de regeler » (« Si la
gelure ne risque pas de regeler, la dégeler… ») ; `dangers/partie-2.md`, ligne 198, « … avant de boire » en fin de
phrase ; `chapitres/03-panne-majeure-d-hydro-en.md`, ligne 420, « ; de même s'il passe dans un mur » (« Si le tuyau est
fendu, renflé ou s'il passe dans un mur, fermer d'abord l'entrée d'eau. »).

**Cause.** La règle existe (skill `ecriture`, règle 3 : « La condition avant le geste. « Si l'eau est trouble, la
filtrer avant de la désinfecter. » »), mais aucun contrôle ne la vérifie, et une autre convention la contredit : le
titre en gras de l'étape doit porter le geste, alors la condition sort du gras et tombe à la fin (« **Allumer le poêle à
bois, s'il y en a un** »). La branche « sinon » n'a pas de règle : le livre la range sous « Autre façon » ou « Sans… »,
souvent loin de sa condition. Le skill `ecriture` (règle 15) remplace « à défaut » par « sinon », et le skill `langue`
(section 10) propose encore « à défaut » : les deux skills se contredisent sur le mot même de l'autre branche.

### Motif 4. Le constat sans geste (gravité haute)

L'étape ou la sous-étape finit sur un fait, une gravité ou une contradiction, et ne dit pas quoi faire. Le lecteur doit
deviner, ou il trouve ailleurs dans le chapitre un geste différent.

**Fréquence.** Une dizaine dans le lot, dont trois sur des signes où la vie est en jeu ou sur un médicament vital.

**Exemples.**

1. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 76 et 77 (étape 5). Le chiffre ne redescend pas : et ensuite ? Le
   tableau (ligne 317) dit « Chercher l'appareil qui fait du monoxyde » ; la page du monoxyde dit « Sortir tout le
   monde, sans chercher d'où vient le gaz ». Le lecteur a deux gestes contraires et l'étape n'en donne aucun.
   > « Tout chiffre affiché veut dire qu'il y a du monoxyde ; si le chiffre ne redescend pas de la journée, un appareil
   > de la maison en fait. »

   Réécriture :
   > Tout chiffre affiché veut dire qu'il y a du monoxyde. Si le chiffre ne redescend pas de la journée, un appareil de
   > la maison en fait : [le geste, et à partir de quel chiffre on sort plutôt que de chercher : au rédacteur, avec sa
   > source ; le tableau de la section 5 et la page du monoxyde disent la même chose].

2. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 286 et 287 (étape 33). Deux consignes contraires, et la décision
   n'est pas prise.
   > « Pour un médicament gardé au réfrigérateur, compter le temps à partir de l'heure écrite sur la porte, comme pour
   > les aliments, et éviter de le prendre s'il n'a pas pu rester au froid. Pour l'insuline ou un médicament qu'on ne
   > peut pas interrompre, s'en passer est aussi un danger (ch. 32). »

   Réécriture (le cas grave d'abord, la décision écrite) :
   > Pour l'insuline ou un médicament qu'on ne peut pas interrompre, [ce qu'on fait quand il n'a pas pu rester au froid :
   > au rédacteur, avec sa source] : s'en passer est aussi un danger (ch. 32). Pour un autre médicament gardé au
   > réfrigérateur, compter le temps à partir de l'heure écrite sur la porte, comme pour les aliments, et éviter de le
   > prendre s'il n'a pas pu rester au froid.

3. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 155 et 156 (étape 13, série « 1 min »). La gravité est dite, le
   geste est dans un autre chapitre. CLAUDE.md demande « ce signe veut dire que la vie est en jeu », **puis ce qu'on
   fait ici**.
   > « Si une personne se réveille mal, est confuse ou perd connaissance, sa vie est en jeu (ch. 2, étape 4). »

   Réécriture (les gestes de la page du monoxyde, étape 3) :
   > Si une personne se réveille mal, est confuse ou perd connaissance, sa vie est en jeu : la garder au repos et au
   > chaud, et suivre le ch. 2, étape 4.

4. `chapitres/03-panne-majeure-d-hydro-en.md`, ligne 71 (étape 5). Un fait, aucun geste.
   > « Dans une pièce qui descend sous 4,4 °C, on ne peut plus se fier à lui. »

   Réécriture (le chapitre donne lui-même, ligne 69, le geste pour un avertisseur auquel on ne peut pas se fier ; lien à
   confirmer par le rédacteur) :
   > Si la pièce descend sous 4,4 °C, on ne peut plus se fier à lui : faire alors comme si on n'en avait pas.

5. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 183 et 184 (étape 18). On ne sait pas quoi faire du chiffre.
   > « La puissance de chaque appareil est écrite sur sa plaque. »

   Réécriture : couper la phrase, ou écrire ce qu'on fait de ce chiffre [au rédacteur, avec sa source].

6. `dangers/partie-1.md`, ligne 105 (espace clos, étape 1). Ce qui ne marche pas, sans ce qui marche.
   > « Aérer avant d'entrer : ouvrir le haut et le bas, et faire circuler l'air. Dans un trou profond, ouvrir ne suffit
   > souvent pas. »

   Réécriture :
   > Aérer avant d'entrer : ouvrir le haut et le bas, et faire circuler l'air. Dans un trou profond, ouvrir ne suffit
   > souvent pas : [comment faire circuler l'air jusqu'au fond : au rédacteur, avec sa source].

**Cause.** CLAUDE.md, « Ce qui ne s'imprime pas » : « Ce que la phrase disait de la gravité reste : « ce signe veut dire
que la vie est en jeu », puis ce qu'on fait ici, avec ce qu'on a » ; la seconde moitié est tombée dans plusieurs passes.
Skill `ecriture`, règle 9 : « Un avertissement = le mécanisme + ce qui arrive + quoi faire » ; le « quoi faire » n'est
pas contrôlé. Et les passes de coupe (« une phrase qui n'apprend rien saute ») gardent le fait et perdent le geste,
parce que c'est le fait qui porte le chiffre que le contrôle des invariants protège.

### Motif 5. Le pourquoi en sandwich (gravité haute : c'est la forme que prend le mauvais tempo dans les étapes)

Le titre en gras dit un but ; viennent deux ou trois phrases de mécanisme en « fait : conséquence » ; le vrai geste, ou
le chiffre dont le geste a besoin, arrive à la fin, ou le geste est dit deux fois autour de son pourquoi. C'est ce que JP
entend : dans une étape, une suite de vérités, et on ne sait pas laquelle fait agir. Plusieurs de ces mécanismes sont le
texte de l'ancienne section « Pourquoi ça marche », versé tel quel dans les étapes quand la section a été coupée (le
paragraphe corrigé dans le tableau du skill `ecriture`, ligne 335, est aujourd'hui dans les étapes 8 et 10 du ch. 3).

**Fréquence.** 12 étapes sur 40 du ch. 3 suivent le patron « geste, fait, geste » ; 34,6 % des phrases des séries
orange sont en « fait : conséquence » (17,1 % dans les listes « Ce qu'on fait » des dangers).

**Exemples.**

1. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 60 à 66 (étape 4, série « 15 min »). On remplit la baignoire ;
   la quantité arrive après trois phrases sur la pression de l'aqueduc, et le cas le plus pressé (le chalet : quelques
   minutes) arrive en dernier.
   > « **Remplir la baignoire et des chaudrons d'eau, tout de suite.** Sur l'aqueduc, la pression vient des pompes de la
   > ville et tient tant qu'elles ont du courant, d'Hydro-Québec ou d'une génératrice ; rien n'annonce le moment où elle
   > tombe. Quand elle tombe, la conduite peut aspirer l'eau du sol par ses joints et ses fuites, et l'eau peut devenir
   > dangereuse à boire sans changer de couleur ni de goût. Il faut donc faire bouillir l'eau qui coule après la baisse
   > de pression, au moins 1 minute ; l'eau tirée avant n'a pas besoin de bouillir (ch. 10). Compter au moins 4 L par
   > personne et par jour, dont 2 L à boire, pour au moins 3 jours. »

   Réécriture :
   > 4. **Remplir tout de suite la baignoire et des chaudrons d'eau : au moins 4 L par personne et par jour, dont 2 L à
   >    boire, pour au moins 3 jours.** Au chalet, la pompe du puits s'arrête avec le courant, et il ne reste que
   >    quelques minutes de pression. Sur l'aqueduc, la pression tient tant que les pompes de la ville ont du courant,
   >    d'Hydro-Québec ou d'une génératrice, et rien n'annonce le moment où elle tombe. L'eau tirée avant la baisse de
   >    pression n'a pas besoin de bouillir. L'eau qui coule après doit bouillir au moins 1 minute : la conduite peut
   >    aspirer l'eau du sol par ses joints et ses fuites, et l'eau peut devenir dangereuse à boire sans changer de
   >    couleur ni de goût (ch. 10). Le chauffe-eau est une réserve de plus (étape 23).

2. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 181 à 184 (étape 18). Le geste est dit deux fois, avant et après
   son pourquoi.
   > « **Démarrer un appareil à la fois.** Un moteur à compresseur demande beaucoup plus de courant au démarrage qu'une
   > fois lancé, et ce pic fait caler la génératrice ou déclencher le disjoncteur de la génératrice : brancher un
   > appareil, attendre que le moteur tourne rond, puis brancher le suivant. »

   Réécriture :
   > 18. **Brancher un appareil à la fois** : brancher un appareil, attendre que son moteur tourne rond, puis brancher
   >     le suivant. Un moteur à compresseur demande beaucoup plus de courant au démarrage qu'une fois lancé, et ce pic
   >     fait caler la génératrice ou déclencher son disjoncteur.

3. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 112 à 118 (étape 8). Le choix de la pièce est coupé en deux par
   le mécanisme : « Vivre dans une seule pièce » au début, « Choisir la pièce pour… » trois phrases plus loin.
   > « La perte de chaleur d'une maison est proportionnelle à l'écart de température avec l'extérieur et à la surface
   > exposée : en fermant les autres pièces, on réduit la surface à chauffer. Choisir la pièce pour garder les gens au
   > chaud, pas la plomberie : vidanger la plomberie (étapes 21 à 25) coûte moins de bois que de chauffer une pièce de
   > plus. »

   Réécriture :
   > 8. **Vivre dans une seule pièce : celle du poêle**, ou, sans poêle, la plus petite pièce qui a le moins de murs
   >    extérieurs. La choisir pour garder les gens au chaud, pas la plomberie : vidanger la plomberie (étapes 21 à 25)
   >    coûte moins de bois que de chauffer une pièce de plus. Fermer les autres pièces et boucher le bas des portes avec
   >    une couverture roulée : la perte de chaleur d'une maison est proportionnelle à l'écart de température avec
   >    l'extérieur et à la surface exposée, et chaque pièce fermée réduit la surface à chauffer. Fermer les rideaux au
   >    coucher du soleil ; le jour, rouvrir ceux des fenêtres qui reçoivent le soleil. Pour fermer une fenêtre avec une
   >    couverture : section 7.

4. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 197 à 201 (étape 21). Le titre demande une vidange qui ne se fait
   qu'à l'étape 23 ; le geste de l'étape (le filet d'eau) est enterré à la fin, après le mécanisme du tuyau qui fend.
   > « **Vidanger quand la pièce la plus froide descend à 5 °C.** Un tuyau fend parce que l'eau prend du volume en
   > gelant : […] En attendant la vidange, laisser couler un filet d'eau froide aux robinets des murs extérieurs, dont
   > les tuyaux sont plus froids que l'air de la pièce : l'eau sort par le robinet ouvert au lieu de monter en pression. »

   Réécriture :
   > 21. **En attendant la vidange, laisser couler un filet d'eau froide aux robinets des murs extérieurs** : leurs
   >     tuyaux sont plus froids que l'air de la pièce, et l'eau sort par le robinet ouvert au lieu de monter en
   >     pression. Un tuyau fend parce que l'eau prend du volume en gelant : la glace bouche le tuyau, et l'eau prise
   >     entre la glace et le robinet fermé monte en pression, souvent jusqu'à fendre le tuyau là où il y a peu de glace.
   > 22. **Prévoir l'heure de la vidange : l'heure où la pièce la plus froide arrivera à 5 °C.** (la suite inchangée)

5. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 121 à 125 (étape 10). Quatre phrases de mécanisme avant les
   sous-étapes ; le fait du plancher sert à une seule sous-étape, « Faire le lit ».
   > « Un corps couché perd sa chaleur beaucoup plus vite vers le plancher que vers l'air, parce que le bois et le
   > contreplaqué la conduisent et que l'air immobile la conduit très peu : il faut plus d'épaisseur sous les corps que
   > par-dessus. Deux cartons et une couverture sous le corps gardent plus chaud que quatre couvertures à même le
   > plancher. »

   Réécriture (dans la sous-étape qui s'en sert) :
   > - Faire le lit sous l'abri, en couches, en partant du plancher : des cartons aplatis ou un tapis roulé (repère 4),
   >   puis des branches de sapin, un matelas ou des coussins (repère 5), puis une couverture sous le corps (repère 6).
   >   Il faut plus d'épaisseur sous les corps que par-dessus : un corps couché perd sa chaleur beaucoup plus vite vers
   >   le plancher que vers l'air, parce que le bois et le contreplaqué la conduisent et que l'air immobile la conduit
   >   très peu. Deux cartons et une couverture sous le corps gardent plus chaud que quatre couvertures à même le
   >   plancher.

6. `chapitres/01-les-quatre-horloges.md`, lignes 137 à 139 (section 7, l'hypothermie). Le test arrive après l'éloge du
   test, en « on + présent ».
   > « Ce test des gestes fins est le plus fiable sans thermomètre, et on le fait sans le lui dire : on lui tend une
   > allumette et une boîte. »

   Réécriture :
   > Pour la tester, lui tendre une allumette et sa boîte, sans lui dire pourquoi : sans thermomètre, c'est le test le
   > plus fiable.

**Cause.** CLAUDE.md, « Le gabarit » : « « Comment ça marche » et la section Danger sont coupés. Un mécanisme qui apprend
quelque chose va dans l'étape qu'il explique. » La règle dit dans quelle étape, pas à quelle place dans l'étape : les
paragraphes de l'ancienne section 3 sont entrés en bloc, souvent entre deux gestes. Le skill `ecriture` a la bonne règle
pour la phrase (règle 2 : « Le fait d'abord, la raison ensuite, et seulement si la raison change ce qu'on fait »), mais
pas pour l'étape. S'y ajoute l'habitude du « fait : conséquence » (24 % des phrases du livre, 34,6 % des séries orange
du ch. 3).

### Motif 6. Le chiffre loin de son geste, ou remplacé par un mot vague (gravité moyenne)

Le chiffre existe dans le chapitre (le tableau, la page du danger, une autre étape), mais l'étape dit « à la normale »,
« un bon moment », « assez », « d'après l'indice » ; ou le calcul est écrit de travers.

**Fréquence.** « À la normale » 3 fois dans le ch. 3 ; une condition de tri qui n'est que dans le tableau ; un calcul
faux dans le ch. 1 ; un indice sans seuil ; une durée vague dans les pages des dangers.

**Exemples.**

1. `chapitres/01-les-quatre-horloges.md`, lignes 61 et 62 (étape 2). Diviser par « 4 L par personne et par jour » donne
   des jours d'eau pour une seule personne : il manque le nombre de personnes.
   > « Compter les litres qu'on a en réserve, et les diviser par 4 L par personne et par jour, dont 2 L à boire : on
   > obtient le nombre de jours d'eau (ch. 3, étape 4 ; ch. 10). »

   Réécriture :
   > Compter les litres d'eau en réserve, et les diviser par 4 L fois le nombre de personnes : c'est le nombre de jours
   > d'eau. Sur ces 4 L par personne et par jour, 2 L sont à boire (ch. 3, étape 4 ; ch. 10).

2. `chapitres/03-panne-majeure-d-hydro-en.md`, ligne 237, et ligne 319 (tableau). La condition qui change la décision
   (au-dessus de 4 °C) n'est que dans le tableau ; l'étape dit seulement « Après 6 h ».
   > « 27. **Après 6 h, trier le réfrigérateur.** » ; tableau : « Au-dessus de 4 °C, ou à 6 h au plus tard : trier
   > (étape 27). »

   Réécriture :
   > 27. **Trier le réfrigérateur dès que son thermomètre passe 4 °C, et au plus tard après 6 h.**

3. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 154 et 155 (étape 13). Le chiffre est dans le tableau, ligne 317
   (0 ppm).
   > « […] et rentrer quand l'avertisseur est revenu à la normale. »

   Réécriture :
   > […] et rentrer quand l'avertisseur affiche 0.

4. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 185 et 186 (étape 19). « À la normale » et « remonte » sans
   chiffre ; le −18 °C du congélateur est dans le chapitre (ligne 471).
   > « Le faire tourner jusqu'à ce que le thermomètre du congélateur revienne à la normale, le débrancher, et le
   > rebrancher quand le thermomètre remonte. »

   Réécriture :
   > Le faire tourner jusqu'à ce que son thermomètre revienne à −18 °C, le débrancher, et le rebrancher quand il remonte
   > à [chiffre : au rédacteur, avec sa source].

5. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 163 et 164 (étape 15). Un indice qu'on écoute, sans seuil ni
   geste qui en dépend.
   > « **Préparer chaque sortie dehors (le bois, les cendres, le plein d'essence) d'après l'indice de refroidissement
   > éolien que donne la radio.** »

   Réécriture : écrire ce qui change selon l'indice et à partir de quel chiffre [au rédacteur, avec sa source] ; sinon,
   garder le geste qui ne dépend pas de l'indice :
   > 15. **Avant chaque sortie dehors (le bois, les cendres, le plein d'essence), mettre les gants et la cagoule avant
   >     d'ouvrir la porte, et tout faire en un seul voyage.**

6. `dangers/partie-2.md`, ligne 12 (orignal, étape 4).
   > « Après le tir, attendre que la bête soit immobile depuis un bon moment, puis approcher par l'arrière, l'arme
   > prête : si son flanc monte et descend, elle peut se relever d'un coup. »

   Réécriture :
   > Après le tir, attendre que la bête soit immobile depuis [durée : au rédacteur, avec sa source], puis approcher par
   > l'arrière, l'arme prête. Si son flanc monte et descend, elle peut se relever d'un coup : [le geste].

Contre-exemple dans le même chapitre : l'étape 22 du ch. 3 (lignes 202 à 204) fait le calcul que le ch. 1 rate, avec un
exemple chiffré.

**Cause.** Skill `ecriture`, règle 5 (« Le chiffre avec son unité ») ne dit rien de sa place. CLAUDE.md demande la
distance, l'épaisseur et la durée « dans cette étape » seulement pour les dangers. Les tableaux ramenés à 8 lignes ont
reçu une colonne « Cible chiffrée » obligatoire (`gabarit-chapitre.md`) : le chiffre est parti dans le tableau, l'étape a
gardé le mot.

### Motif 7. Le geste dit par un mot abstrait ou un raccourci (gravité moyenne)

Un verbe vague (« surveiller », « préparer d'après », « compter ce que ça coûte »), un mot que le chapitre n'a pas
défini (« le classement »), un numéro à retenir (« l'horloge 4 pour sauver l'horloge 3 ») ou une suite de noms à la
place des gestes (« couper la source, aérer »). Le lecteur doit traduire avant d'agir.

**Fréquence.** Une quinzaine dans le lot, surtout au ch. 1 (le vocabulaire des horloges) et dans les renvois de la
série « 1 min » du ch. 3.

**Exemples.**

1. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 153 à 155 (étape 13, série « 1 min »). « Couper la source » vient
   une étape après « sans chercher la source », sans dire qui rentre ni comment.
   > « Ensuite, faire les étapes 4 à 8 du ch. 2 : garder dehors les gens qui ont des symptômes, couper la source, aérer,
   > et rentrer quand l'avertisseur est revenu à la normale. »

   Réécriture :
   > Ensuite, suivre le ch. 2, étapes 4 à 8 : garder dehors les gens qui ont des symptômes ; [qui arrête l'appareil qui
   > fait le gaz, et comment, sans rester dans la maison : ch. 2] ; ouvrir les portes et les fenêtres en restant
   > dehors ; rentrer quand l'avertisseur affiche 0.

2. `chapitres/01-les-quatre-horloges.md`, lignes 72 à 74 (étape 4). Le titre ne dit pas de geste ; le corps ne donne que
   des exemples en numéros d'horloge.
   > « **Compter ce qu'une horloge coûte aux autres.** Faire tourner le congélateur à la génératrice dépense le
   > carburant de l'horloge 4 pour sauver l'horloge 3 ; faire bouillir l'eau ou fondre la neige dépense le bois de
   > l'horloge 4 pour l'horloge 2. »

   Réécriture :
   > 4. **Avant de brûler du carburant ou du bois pour une horloge, regarder ce qu'il en restera pour les autres.**
   >    Faire tourner le congélateur à la génératrice brûle du carburant (horloge 4) pour garder la viande froide
   >    (horloge 3) ; faire bouillir l'eau ou fondre la neige brûle du bois (horloge 4) pour avoir de l'eau (horloge 2).

3. `chapitres/01-les-quatre-horloges.md`, lignes 77 et 78 (étape 6). « Le classement » n'est défini nulle part.
   > « **Refaire le classement à heure fixe** : au début, à 6 heures (le frigo), à 24 et à 48 heures (le congélateur),
   > puis matin et soir tant que la panne dure. »

   Réécriture :
   > 6. **Refaire le tour des quatre horloges à ces heures-là** : au début, 6 heures après (le frigo), 24 et 48 heures
   >    après (le congélateur), puis matin et soir tant que la panne dure.

4. `dangers/partie-2.md`, ligne 7 (orignal). Une consigne qu'il faut retourner en relisant une autre page, et qui est
   fausse pour l'étape 3 (« se rouler en boule… ne plus bouger » ressemble à « faire le mort » devant l'ours).
   > « **Ce qu'on fait.** On fait le contraire de ce qu'on fait devant l'ours ({>ours}). »

   Réécriture : couper la phrase ; les quatre étapes disent quoi faire.

5. `chapitres/03-panne-majeure-d-hydro-en.md`, ligne 230 (étape 26). « Surveiller » ne dit pas quoi regarder.
   > « **Surveiller le puisard au redoux et au retour du chauffage.** »

   Réécriture :
   > 26. **Au redoux et au retour du chauffage, regarder le niveau de l'eau dans le puisard.**

6. `dangers/partie-2.md`, ligne 49 (tularémie, étape 2). Deux mots, sans quand ni pourquoi (la poussière de poil est
   dite à la ligne 42).
   > « Mouiller la fourrure. Porter des lunettes et un masque quand on scie ou qu'on secoue une peau. »

   Réécriture :
   > Mouiller la fourrure avant de dépouiller la bête : la bactérie entre aussi par la poussière de poil qu'on respire.
   > Quand on scie ou qu'on secoue une peau, porter des lunettes et un masque.

**Cause.** Skill `ecriture`, règle 0 : « un verbe qui dit le geste, et on sait qui le fait » ; elle est écrite pour la
phrase, et les titres en gras des étapes y échappent. Le ch. 1 invente une notion (les horloges numérotées) et s'en sert
comme d'un code ; la règle 14 demande de l'expliquer, pas de l'éviter dans la consigne.

### Motif 8. La consigne au présent qui décrit, rangée hors de sa liste (gravité moyenne)

Le livre a trois façons de dire une consigne : l'infinitif dans les étapes, « on + présent » dans la prose de la section
7 et des pages des dangers, et des consignes rangées dans les paragraphes « Ce qu'on perd » et « Comment on le
reconnaît ». Le lecteur qui cherche quoi faire regarde la liste numérotée ou « Ce qu'on fait », et il manque le reste ;
« On la sort et on la rentre » se lit comme une description.

**Fréquence.** Ch. 3, section 7 : 14 phrases de consigne en « On + présent », à côté de l'infinitif dans les mêmes
sous-sections. « Ce qu'on perd » : 6 blocs sur 8 portent une consigne. Pages des dangers : 8 dangers sur 36 mettent un
geste dans « Comment on le reconnaît », dont 5 sont des décisions.

**Exemples.**

1. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 489 à 492. Une consigne de sécurité, avec son pictogramme, rangée
   sous « Ce qu'on perd ».
   > « {!zone-de-danger} **Ce qu'on perd :** on ne contrôle plus le temps ni la température de cuisson. En refroidissant,
   > la marmite reste longtemps tiède, d'autant plus que la boîte isole bien : manger tout de suite ce qui en sort, ou le
   > remettre au feu jusqu'au bouillon avant de le garder ; ne jamais le laisser passer la nuit tiède dans la boîte. »

   Réécriture (une dernière sous-étape de la marmite, puis « Ce qu'on perd » sans geste) :
   > - {!zone-de-danger} En sortant la marmite de la boîte, manger tout de suite ce qu'elle contient, ou le remettre au
   >   feu jusqu'au bouillon avant de le garder. Ne jamais le laisser passer la nuit tiède dans la boîte : en
   >   refroidissant, la marmite reste longtemps tiède, d'autant plus que la boîte isole bien.
   >
   > **Ce qu'on perd :** on ne contrôle plus le temps ni la température de cuisson.

2. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 519 à 522. Deux consignes à la fin de « Ce qu'on perd ».
   > « On ne la vide donc pas à fond : c'est aussi elle qui fait démarrer l'auto le jour du départ. Vider d'abord celle
   > du deuxième véhicule. »

   Réécriture (avec les gestes du 12 V, avant la liste de ce qu'elle alimente) :
   > Vider d'abord la batterie du deuxième véhicule, et ne jamais vider celle de l'auto à fond : elle sert à
   > démarrer l'auto le jour du départ.

3. `chapitres/01-les-quatre-horloges.md`, lignes 148 à 150. Trois consignes sous « Ce qu'on perd », dont une en
   sentiment (« on accepte »).
   > « **L'alerte au CO.** Sans avertisseur, rien n'avertit avant les symptômes. En plus de n'allumer que le poêle, on
   > entrouvre une fenêtre de la pièce chauffée, du côté du vent, et on accepte de chauffer moins. Personne ne doit
   > dormir seul dans une pièce chauffée à la flamme. »

   Réécriture (dans le premier paragraphe de la section 7, ligne 118) :
   > **Sans thermomètre et sans avertisseur de CO.** Sans avertisseur, rien n'avertit avant les symptômes. N'allumer
   > dans la maison que le poêle raccordé à sa cheminée (ch. 3, étape 5), entrouvrir une fenêtre de la pièce chauffée,
   > du côté du vent, même si la pièce chauffe moins, et ne faire dormir personne seul dans une pièce chauffée à la
   > flamme.

4. `dangers/partie-1.md`, ligne 169 (coupure). La décision de partir est dans « Comment on le reconnaît », pas dans
   « Ce qu'on fait ».
   > « Sa vie est alors en jeu : il faut décider de partir pendant qu'elle a encore l'air correcte. »

   Réécriture (cinquième point de « Ce qu'on fait ») :
   > 5. Si le pouls devient rapide et faible, et la peau froide, moite et pâle, partir pendant que la personne a encore
   >    l'air correcte ({>vie-en-jeu}).

5. `dangers/partie-1.md`, ligne 230 (glace). Le geste qui sauve est dans la reconnaissance, au présent.
   > « Sur de la glace blanche, on double ces épaisseurs. Si l'eau déborde du trou, on recule. »

   Réécriture :
   > Sur de la glace blanche, doubler ces épaisseurs. Si l'eau déborde du trou, reculer.

6. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 506 à 508 (section 7, « Le 12 V »).
   > « On la sort et on la rentre dans la pièce chauffée : à −18 °C, une batterie au plomb ne donne que la moitié de sa
   > capacité. On la pose sur une planche, sans rien de métallique sur les bornes. »

   Réécriture :
   > Sortir la batterie de l'auto et la rentrer dans la pièce chauffée : à −18 °C, une batterie au plomb ne donne que la
   > moitié de sa capacité. La poser sur une planche, sans rien de métallique sur les bornes.

Même famille, au pronominal : `chapitres/01-les-quatre-horloges.md`, lignes 68 et 69, « Les calories de la réserve se
comptent au ch. 5 (étapes 8 à 11). » (« Compter les calories de la réserve avec le ch. 5, étapes 8 à 11. »).

**Cause.** Deux règles se contredisent. Skill `ecriture`, règle 4 : « La prose (section 2, section 3, section 9 hors
étapes numérotées) dit « on » : « On coupe le disjoncteur avant de brancher. » ». CLAUDE.md, « L'écriture » : « une
consigne se dit comme une consigne (« doivent », « on doit », « il faut », l'infinitif dans une étape), pas au présent
qui décrit » ; et la règle 11 du même skill rejette « le présent qui décrit […] qui se lit comme un constat ». Le gabarit
(section 9 : « Nommer honnêtement ce qu'on perd ») invite le rédacteur à mettre le remède à côté de la perte. Le format
des dangers (« Ce qui arrive, comment on le reconnaît, ce qu'on fait », skill `editeur`) ne dit pas que tous les gestes
vont dans « Ce qu'on fait ».

### Motif 9. Les tableaux qui redisent l'étape, et la colonne Action sans verbe (gravité moyenne)

Des lignes de Points de contrôle et de Signes d'échec dont l'action n'est qu'un renvoi (« Étapes 12 et 13 ; ch. 2,
étape 4 ») ou qu'une interdiction, une cible qui n'en est pas une (« Trié à la sonde », « Reprise avec les quatre
horloges »), une ligne qui renvoie à l'autre tableau, et des cellules de 20 à 44 mots qu'on ne lit pas d'un coup d'œil.

**Fréquence.** 29 lignes de tableau dans le lot : 6 actions sans geste propre, 3 lignes qui redisent une étape, une
ligne en double, un renvoi qui mène à la mauvaise étape (ch. 1, ligne 111 : « (étape 2) », le volume chauffé est au
ch. 3, étape 8, comme le dit la ligne 96).

**Exemples.**

1. `chapitres/03-panne-majeure-d-hydro-en.md`, ligne 330. Le signe le plus grave a 44 mots d'observation et une action
   sans verbe.
   > « | Plusieurs personnes ont en même temps mal à la tête, la nausée, des étourdissements ou de la fatigue, et ça va
   > mieux dehors. Plus grave : quand quelque chose brûle dans la maison, une personne perd sa coordination, se réveille
   > mal ou perd connaissance | Intoxication au monoxyde de carbone. Dans le cas plus grave, la vie est en jeu | Étapes 12
   > et 13 ; ch. 2, étape 4 | »

   Réécriture (deux lignes, un verbe en tête de chaque action) :
   > | Plusieurs personnes ont en même temps mal à la tête, la nausée ou des étourdissements, et ça va mieux dehors |
   > Monoxyde de carbone | Sortir tout le monde, sans chercher la source, et laisser la porte ouverte (étapes 12 et
   > 13) |
   > | Quand quelque chose brûle dans la maison, une personne perd sa coordination, se réveille mal ou perd connaissance |
   > Monoxyde de carbone : la vie est en jeu | La sortir, la garder au repos et au chaud, et suivre le ch. 2, étape 4 |

2. `chapitres/03-panne-majeure-d-hydro-en.md`, ligne 331. Trois interdictions, aucun geste.
   > « | Une personne cesse de frissonner, parle mal et ne coordonne plus ses gestes | Hypothermie grave (sous 28 °C de
   > température buccale) : la vie est en jeu | Ne pas frotter la peau ; ne lui donner ni alcool ni cigarette (ch. 25) | »

   Réécriture de l'action (les mots du ch. 1, ligne 109) :
   > | … | … | La manipuler doucement, couchée à plat, au sec. Ne pas frotter la peau ; ni alcool ni cigarette (ch. 25) |

3. `chapitres/03-panne-majeure-d-hydro-en.md`, ligne 322. Un tableau qui renvoie à l'autre tableau.
   > « | Deux fois par jour | Chaque personne : les frissons, la parole et les gestes ; chez les enfants, aussi les joues,
   > le nez et les oreilles | La personne frissonne quand elle a froid, parle et bouge normalement ; la peau garde sa
   > couleur | Section 6 ; ch. 25 | »

   Réécriture : couper la ligne (le geste est à l'étape 9, les signes à la section 6).

4. `chapitres/01-les-quatre-horloges.md`, lignes 95 et 97. Une cible qui n'est pas une cible, une action qui n'est qu'un
   renvoi, une ligne qui redit l'étape 7.
   > « | Heures 6, 24 et 48 | Le réfrigérateur, puis le congélateur à moitié rempli, puis le congélateur plein | Trié à
   > la sonde | Ch. 3, étapes 27 et 30 | » ; « | Heure 48 | La décision de rester ou de partir | Reprise avec les quatre
   > horloges | Étape 7 ; ch. 2 | »

   Réécriture : couper la ligne 97 (elle redit l'étape 7) ; la ligne 95 devient :
   > | Heures 6, 24 et 48 | Le cœur des paquets, à la sonde | 4 °C ou moins | Trier (ch. 3, étape 30) |

5. `chapitres/01-les-quatre-horloges.md`, ligne 106. Un diagnostic qui redit l'observation, et la même action qu'à la
   ligne 90 des points de contrôle.
   > « | Personne ne sait à quelle heure le courant a manqué | L'étape 1 a été sautée | Compter les heures à partir du
   > dernier moment où on sait que le courant marchait | »

   Réécriture : couper la ligne ; la ligne 90 dit déjà le geste.

**Cause.** `gabarit-chapitre.md` : « Tableau à structure fixe : moment, ce qu'on vérifie, cible chiffrée, quoi faire si
c'est hors cible ». La colonne « Cible chiffrée » est obligatoire même quand il n'y a pas de chiffre, et la colonne
« quoi faire » n'oblige pas un verbe. La condensation à 5 à 8 lignes (CLAUDE.md : « rien qui redise une étape ou la page
du danger ») a été faite en remplaçant des actions par des renvois plutôt qu'en coupant des lignes.

### Motif 10. Les lignes de Matériel qui portent la procédure, les titres de « Quand l'utiliser » alourdis (gravité basse)

Les lignes de Matériel cachent une consigne dans un participe (« relevé chaque heure », « mis dans la bouche ») ou
redisent l'étape, avec un « il dit » de chose qui parle ; toutes dépassent 20 mots. Quelques titres de « Quand
l'utiliser » portent deux situations ou un renvoi trop large pour aider.

**Fréquence.** 9 lignes de Matériel, de 22 à 26 mots (règle : 15 à 20), dont 3 qui portent une consigne ou un « il
dit ». 13 titres de « Quand l'utiliser », dont 3 trop longs et 1 renvoi à 25 étapes.

**Exemples.**

1. `chapitres/01-les-quatre-horloges.md`, ligne 34.
   > « **Thermomètre de pièce** : relevé chaque heure, il dit si la pièce chauffée tiendra jusqu'au matin (étape 2 ; sans
   > thermomètre : section 7). »

   Réécriture :
   > **Thermomètre de pièce** : pour mesurer chaque heure combien de degrés perd la pièce chauffée (étape 2 ; sans
   > thermomètre : section 7).

2. `chapitres/01-les-quatre-horloges.md`, ligne 33.
   > « **Avertisseur de CO à pile** : rien d'autre ne détecte le monoxyde, et son chiffre dit où en est l'air de la
   > pièce (étape 2). »

   Réécriture :
   > **Avertisseur de CO à pile, à affichage** : rien d'autre ne détecte le monoxyde ; on lit son chiffre matin et soir
   > (étape 2).

3. `chapitres/03-panne-majeure-d-hydro-en.md`, ligne 32. La consigne de l'étape 14, redite.
   > « **Chaudière de métal à couvercle de métal** : on y vide les cendres du poêle, et on la garde dehors (étape 14). »

   Réécriture :
   > **Chaudière de métal à couvercle de métal** : pour les cendres du poêle (étape 14).

4. `chapitres/01-les-quatre-horloges.md`, lignes 22 et 24.
   > « **Route fermée ou pont de glace qui ne tient plus, pour une durée inconnue** (étapes 1 à 7). » ; « **Trop de
   > choses à faire en même temps, sans savoir par où commencer** (étapes 3 et 4). »

   Réécriture :
   > **Route ou pont de glace fermé pour une durée inconnue** (étapes 1 à 7). ; **Trop de choses à faire en même temps**
   > (étapes 3 et 4).

5. `chapitres/03-panne-majeure-d-hydro-en.md`, ligne 20. Un renvoi à 25 étapes ne dit pas par où commencer.
   > « **Génératrice ou banc de batteries en panne au chalet, l'hiver** (étapes 5, 7 à 10, 14 et 21 à 34). »

   Réécriture :
   > **Génératrice ou banc de batteries en panne au chalet, l'hiver** (à partir de l'étape 5 ; la plomberie et les
   > aliments : étapes 21 à 34).

**Cause.** `gabarit-chapitre.md` : « le nom en gras, puis ce qu'il fait ou ce que c'est » ; le rédacteur écrit ce qu'on
en fait, et la consigne de l'étape y entre. Le cadre bannit « la couleur dit » mais pas « son chiffre dit ». La limite de
15 à 20 mots ne compte pas les renvois entre parenthèses, et rien ne la mesure.

## 3. Ce qui marche, à garder comme modèles

1. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 129 à 134 (étape 10, les sous-étapes de l'abri). Un geste par
   ligne, dans l'ordre où on monte le lit, chacun avec son repère de planche, enchaîné par « puis ».
   > « Faire le lit sous l'abri, en couches, en partant du plancher : des cartons aplatis ou un tapis roulé (repère 4),
   > puis des branches de sapin, un matelas ou des coussins (repère 5), puis une couverture sous le corps (repère 6). »

2. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 202 à 204 (étape 22). Le geste, le calcul avec un exemple chiffré,
   puis qui fait la vidange et quand.
   > « Faire deux relevés du même thermomètre, à 2 h d'intervalle : on en tire le nombre de degrés perdus à l'heure, et
   > l'heure où la pièce arrivera à 5 °C. Par exemple, une pièce à 14 °C qui perd 1 °C à l'heure arrive à 5 °C dans 9 h.
   > Faire la vidange de jour, à deux, les mains chaudes. »

3. `chapitres/03-panne-majeure-d-hydro-en.md`, lignes 266 à 271 (étape 30). Ce qu'on voit, puis ce qu'on fait : chaque
   ligne s'ouvre sur sa condition, et on la lit d'un coup d'œil, la sonde à la main.
   > « le cœur est encore dur : recongeler, ou garder dehors ; décongelé, mais à 4 °C ou moins : cuire tout de suite et
   > manger vite, ou cuire puis recongeler ; décongelé et passé au-dessus de 4 °C : jeter ; »

4. `dangers/partie-1.md`, lignes 214 et 215 (eau froide). Les étapes suivent l'ordre du temps, chacune ouverte par son
   moment, et la branche « sinon » est écrite.
   > « 3. La première minute, garder la tête hors de l'eau et ralentir sa respiration, sans essayer de nager. 4. Pendant
   > les 10 minutes suivantes, sortir de l'eau ou grimper sur ce qui flotte. Sinon, rester immobile, les bras serrés sur
   > la poitrine et les genoux remontés. »

5. `dangers/partie-1.md`, ligne 65 (huile en feu). La condition d'abord, un geste par phrase, la façon de faire dans le
   geste, l'autre façon tout de suite après.
   > « Si l'huile prend feu, couper la chaleur sans se pencher au-dessus du chaudron. Glisser le couvercle sur le
   > chaudron, de côté, sans le lever au-dessus des flammes. Sans couvercle, prendre une plaque à biscuits. »

Aussi bons : `chapitres/03-panne-majeure-d-hydro-en.md`, étape 14 (lignes 160 à 162 : les gestes dans l'ordre, les
chiffres sur le geste), étape 16 (lignes 171 à 174 : le geste, la distance, les « jamais », l'exception de nuit avec sa
raison) et étape 12 (lignes 150 et 151 : un geste de série « 1 min ») ; `dangers/partie-2.md`, lignes 22 à 24 (l'arme :
qui fait quoi, « les deux personnes doivent regarder dedans », « 60 secondes avant d'ouvrir l'arme »).

## 4. Ce que ça demande au skill (pour la réécriture)

Seulement ce que ce regard a trouvé.

- **Une sous-étape, un geste**, avec, dans cet ordre : la condition, le geste, le chiffre, ce qu'on voit quand c'est
  fait, puis le pourquoi en une phrase, puis l'autre façon. Le titre en gras peut commencer par la condition (« S'il y a
  un poêle, l'allumer »).
- **Une étape ne finit jamais sur un fait.** Un fait sans geste sort, ou on écrit son geste.
- **Un avertissement vient avant le geste qu'il gouverne**, pas à la fin de l'étape ni à l'étape suivante.
- **Chaque « si » a son « sinon »** quand l'autre branche existe, dans la même étape.
- **La série orange ne porte que les gestes de son moment** ; ce qui se fait matin et soir va dans la série suivante.
- **Toute consigne à l'infinitif ou en « il faut »**, même dans la prose de la variante d'urgence (trancher la règle 4
  du skill contre CLAUDE.md). Aucune consigne dans « Ce qu'on perd » ni dans « Comment on le reconnaît » : celle-ci
  garde les signes et les tests, « Ce qu'on fait » garde tous les gestes.
- **Tableaux** : chaque action commence par un verbe ; pas de ligne qui ne fait que renvoyer ; « Cible » au lieu de
  « Cible chiffrée » quand il n'y a pas de chiffre honnête ; une ligne qui redit une étape sort.
- **Un auditeur de la consigne** (script) : mots par étape (au-dessus de 100), étape qui finit sur une phrase sans
  infinitif, « si / sauf si / seulement si / d'abord » après un infinitif, « à la normale », « un bon moment »,
  infinitif dans « Ce qu'on perd », « on + présent » en tête de phrase hors des étapes, ligne de tableau dont l'action
  n'a pas de verbe, ligne de Matériel au-dessus de 20 mots.
