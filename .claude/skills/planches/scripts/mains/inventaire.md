# Inventaire des mains en gros plan dans les planches

Agent 4 de la bibliothèque de mains simples, 14 octobre 2026 (deuxième version : l’inventaire complet et les proportions). Relevé fait sur les sources `images/planches-src/*.js`
(358 planches chargées, chaque vue dessinée à sa taille réelle avec une copie instrumentée de `formes.js` qui note
chaque appel à `main()`, `modele()`, `buste()`, `personnage()`, `corps()`), complété par la lecture des PNG
(`images/validees/`, `images/a-valider/`) pour les mains dessinées à la main dans la planche (« dessin libre »),
que le relevé automatique ne voit pas. Les proportions sont dans `proportions.json` ; les poses se construisent
dans `poses.json` (agent 3) avec les **id** de ce fichier. Scratch : `agent4/` (`releve.js`, `inventaire_data.py`,
`genere.py`, feuilles `vues/vues-NN.png`).

## Vocabulaire

- **Côté vu** : `dos`, `paume`, `pouce` (de profil, côté pouce), `auriculaire` (de profil, côté auriculaire) : les
  quatre vues du moteur. `bout` : l’objet vu par le bout dans le poing, la main de profil (24-12) — c’est une vue
  `pouce` ou `auriculaire` du moteur, tournée.
- **G/D** : la main droite ou gauche *telle que dessinée*. Les modèles de shoo_arts sont des mains **droites**
  (s11 : le poing vu de la paume, le pouce à droite ; s09, s05, s10, s03, s01, s08, s19 aussi) ; `miroir: true`
  en fait une gauche. Les commentaires de quelques planches disent l’inverse (90-04, 26-40) : on suit le dessin.
- **Fonction actuelle** : `sNN` = `formes.modele('sNN')` (calques de shoo_arts, refusés) ; `main pose/vue` =
  `formes.main()` (refusée, « pince de homard ») ; `dessin libre` = des chemins écrits dans la planche.
- **~px** : la longueur de la main sur la planche (poignet → bout du majeur, ou la boîte du modèle), en unités de
  vue (1 px ≈ 1/72 po). Un gros plan, c’est 150 à 400 ; sous 60, c’est la main d’un corps ou un médaillon.
- **Ø** : le diamètre de l’objet tenu, en mm réels. Tiré de la planche (une valeur en mm dans le code ou la cote)
  ou du chapitre ; `~` = une estimation de la planche, pas une valeur sourcée ; `[À VÉRIFIER]` = ni la planche ni
  le chapitre ne le donnent. `—` : pas d’objet tenu (appui, main montrée).

## Les poses nécessaires, par fréquence

Une occurrence = une main dessinée (146 mains, dans 122 vues de 68 planches ; 24 vues ont deux mains).
L’**id** est stable : l’agent 3 les construit dans `poses.json` sous ce nom, et une planche les appellera par lui.
La dernière colonne dit à quelle pose de départ de l’agent 3 chacune répond.

| Rang | id | La pose | Mains | Vues | Planches | Côtés vus relevés | Départ de l’agent 3 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `prise-manche` | le poing fermé autour d’un cylindre de 8 à 45 mm, le pouce refermé sur l’index et le majeur ; l’objet entre d’un côté du poing et ressort de l’autre | 60 | 54 | 13-09, 13-40, 15-01, 22-40, 23-02, 23-40, 24-09, 26-40, 27-05, 28-04, 30-40, 34-05, 34-06, 37-03b, 44-01, 47-01, 47-05, 50-40, 69-40, 75-40, 78-40, 83-40, 86-05, 88-07, 90-04, 94-40, 96-08, 96-12, 98-08, 98-09, 99-04, 99-05, 101-40, 102-02, 103-40, 104-40, 105-40, 112-40 | paume 34, dos 25, pouce 1 | prise de 10 à 90 mm |
| 2 | `pince-fine` | la pulpe du pouce contre la pulpe de l’index ; le majeur, l’annulaire et l’auriculaire repliés derrière, en cascade | 15 | 14 | 23-02, 24-16, 27-04, 30-40, 50-40, 75-40, 90-04, 103-07, 103-40, 111-40 | pouce 13, dos 2 | pince fine |
| 3 | `ouverte` | la main ouverte, les doigts tendus un peu écartés ; posée, montrée ou qui pousse | 12 | 12 | 24-10, 24-11, 24-12, 28-05, 29-06, 30-40 | dos 6, paume 5, pouce 1 | ouverte |
| 4 | `plat` | la main à plat, les doigts tendus serrés, le pouce le long de l’index ; contact par la paume, par le bout des doigts ou par le dos | 12 | 12 | 23-40, 24-02, 24-12, 26-40, 29-04, 50-40, 98-05, 98-10, 99-04, 100-40 | pouce 12 | à plat |
| 5 | `coupe-c` | la main en C : le pouce d’un côté, les doigts de l’autre, autour d’un rond de 60 à 110 mm (sein, mollet, nid) ; ou le creux qui porte du grain | 7 | 7 | 13-40, 24-11, 29-07, 98-05 | pouce 5, auriculaire 1, dos 1 | main en C ou en coupe |
| 6 | `porte` | la paume en l’air, les doigts tendus en léger creux : porter, recevoir, offrir le poignet | 5 | 5 | 28-04, 30-01, 38-04, 79-40 | paume 3, pouce 2 | porte |
| 7 | `relachee` | la main détendue : les doigts mi-fléchis en cascade (l’auriculaire le plus plié), le pouce le long de l’index | 5 | 5 | 25-40, 26-08, 34-04 | paume 2, dos 2, pouce 1 | — (nouvelle) |
| 8 | `crochet` | les doigts repliés en crochet aux deux dernières phalanges, la paume ouverte, le pouce libre : une anse, un bord, un talon | 4 | 4 | 24-11, 30-40, 98-08, 99-11 | dos 2, pouce 1, paume 1 | crochet |
| 9 | `pince-laterale` | la pulpe du pouce contre le côté de l’index plié ou tendu (la prise d’une clé) ; le pouce pousse ou serre | 4 | 4 | 13-09, 96-07 | pouce 4 | appui du pouce |
| 10 | `prise-grosse` | la main autour d’un cylindre de 50 à 90 mm : les doigts et le pouce ne se rejoignent pas, l’objet déborde du poing | 4 | 4 | 24-12, 26-40 | bout 3, paume 1 | prise de 10 à 90 mm |
| 11 | `main-sur-main` | deux mains à plat l’une sur l’autre, les doigts du dessus sur le dos de celle du dessous (celle-ci en gris) | 4 | 2 | 26-40 | dos 4 | main sur main |
| 12 | `pince-ouverte` | le pouce et l’index écartés, les pulpes posées de part et d’autre (tendre la peau, une pâte qui colle) | 3 | 3 | 27-04, 28-01, 34-01 | dos 2, pouce 1 | pince ouverte |
| 13 | `deux-doigts-v` | l’index et le majeur tendus, écartés en V ; l’annulaire et l’auriculaire repliés | 2 | 2 | 61-02 | paume 1, auriculaire 1 | — (nouvelle) |
| 14 | `pointe` | l’index tendu, les autres doigts repliés, le pouce posé sur le majeur ; il montre ou il appuie du bout | 2 | 2 | 28-01, 34-01 | pouce 2 | pointe, appui de l’index |
| 15 | `prise-corde` | le poing serré sur une corde, une racine ou un fil de 3 à 12 mm qui le traverse et tire dans son axe | 2 | 2 | 103-10, 109-01 | paume 2 | corde |
| 16 | `coiffe` | la paume coiffe le bout d’un bâton debout, les doigts repliés autour, et appuie dans son axe | 1 | 1 | 13-01 | dos 1 | — (nouvelle) |
| 17 | `deux-doigts` | l’index et le majeur tendus serrés, l’annulaire et l’auriculaire repliés, le pouce écarté | 1 | 1 | 38-04 | dos 1 | — (nouvelle) |
| 18 | `pince-pointe` | le bout du pouce contre le bout de l’index, ongle contre ongle, pour l’objet très fin (un cheveu, une lente) | 1 | 1 | 34-02 | pouce 1 | pince fine (variante) |
| 19 | `poing` | le poing fermé à vide, le pouce sur l’index et le majeur | 1 | 1 | 29-04 | paume 1 | poing |
| 20 | `prise-pouce-dos` | le poing sur un manche, le pouce allongé sur le dos du manche ou de la lame, qui appuie | 1 | 1 | 103-10 | pouce 1 | appui du pouce |

Les diamètres relevés pour `prise-manche` vont de 12 à 36 mm quand la planche ou le chapitre les donne (bâton 12,
rameau 15, tige de ferrocérium 18, boyau ~20, écumoire 22, baguette 25, couteau 26, bâton 28, bord de chaudière 28,
manche 36, bâton de marche 36) ; les mains des corps vont de 9 à 112 (voir `corps/inventaire.md`). `prise-grosse` :
boîte de conserve 54 mm, bouteille `[À VÉRIFIER]`. `coupe-c` : sein 80 à 82 mm, nid ~97, mollet ~110. `coiffe` : foret de
20 mm. Les chapitres ne cotent presque jamais l’objet tenu : les `[À VÉRIFIER]` du tableau restent tant que la planche
n’a pas sa cote ; une prise de 25 à 35 mm couvre les manches d’outil.

## L’inventaire, main par main

| Planche | Vue | Fonction actuelle | Ce que fait la main | Objet | Ø (mm) | Côté vu | G/D | 2 mains | Pose | ~px | Remarque |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 13-01 | Monté, vu du côté de l’encoche | s05 | coiffe le haut du foret (la paume sur la crapaudine), appuie vers le bas | foret de l’arc à feu | 20 | dos | D |  | `coiffe` | 156 | chapitre 13 : « foret d’environ 25 cm de long et 2 cm de diamètre » |
| 13-09 | Le geste | s05 | tient la pierre, l’amadou pincé sous le pouce, contre le tranchant | silex + amadou | [À VÉRIFIER] | pouce | D | oui | `pince-laterale` | 300 |  |
| 13-09 | Le geste | s11 | tient le briquet d’acier en C, les doigts passés dans la boucle, frappe vers le bas | barre du briquet | [À VÉRIFIER] | dos | G | oui | `prise-manche` | 178 |  |
| 13-09 | Au point de frappe | s05 | idem, en très gros plan (seul le bout des doigts entre dans la vue) | silex + amadou | [À VÉRIFIER] | pouce | D | oui | `pince-laterale` | 660 | main plus grande que la vue : coupée |
| 13-09 | Au point de frappe | s11 | idem, le poing coupé par le bord | barre du briquet | [À VÉRIFIER] | dos | G | oui | `prise-manche` | 400 |  |
| 13-40 | Tirer la tige, pas gratter | main prise/dos | tient la tige de ferrocérium, la pointe au bord du nid, la tire vers l’arrière | tige de ferrocérium | 18 | dos | G | oui | `prise-manche` | 142 | diamètre de la planche (vue / échelle) |
| 13-40 | Tirer la tige, pas gratter | main prise/dos | tient le couteau immobile, le dos de la lame en travers de la tige | manche de couteau | 26 | dos | D | oui | `prise-manche` | 142 |  |
| 13-40 | Refermer et souffler | buste + main boule/profil | tient le nid de fibre devant la bouche, serré lâche | nid de fibre | ~97 | pouce | D |  | `coupe-c` | 57 | main du buste, petite |
| 15-01 | Tenu en poignard | s11 | tient le pic de glace en poignard, le clou vers le bas | manche du pic | [À VÉRIFIER] | paume | D |  | `prise-manche` | 66 |  |
| 22-40 | Pocher | s11 | tient le couteau debout, la pointe enfoncée dans la langue pour l’éprouver | manche de couteau | [À VÉRIFIER] | paume | D |  | `prise-manche` | 58 |  |
| 23-02 | Vider | s09 | pince le boyau entre les pulpes du pouce et de l’index et glisse vers le bout | boyau | [À VÉRIFIER] | pouce | G |  | `pince-fine` | 245 |  |
| 23-02 | Gratter | s11 | tient le couteau par-dessus, le pouce vers la lame, racle le boyau sur la planche | manche de couteau | [À VÉRIFIER] | dos | D |  | `prise-manche` | 95 | vu d’en haut |
| 23-40 | Partager tout de suite, à la louche, en plats bas | s11 | tient la louche par le manche, verse | manche de louche | [À VÉRIFIER] | dos | G |  | `prise-manche` | 76 |  |
| 23-40 | Juste : les plats bas enfoncés dans la neige | s10-plat | appuie le couvercle à plat, enfonce le plat dans la neige | couvercle (surface plane) | — | pouce | G |  | `plat` | 90 |  |
| 24-02 | La hache coincée | s10-plat | la main ouverte, levée au-dessus du bout du manche | bout du manche | — | pouce | D |  | `plat` | 122 |  |
| 24-02 | Le coup de paume | s10-plat | la paume frappe le bout du manche vers le bas, sans le tenir | bout du manche | — | pouce | D |  | `plat` | 122 |  |
| 24-09 | Le bracelet, juste sous le coude | s11 | empoigne un manche vertical ; l’avant-bras entier jusqu’au coude (bracelet sous le coude) | manche | 36 | paume | G |  | `prise-manche` | 163 | avant-bras jusqu’au coude : longueur réelle requise |
| 24-10 | L’attelle de pouce, vue du dos de la main | main appui/dos | main posée à plat, doigts un peu écartés, attelle de pouce et avant-bras | table | — | dos | G |  | `ouverte` | 243 | avant-bras long, sous des bandes |
| 24-10 | L’attelle de poignet de la nuit, vue du dos de la main | main appui/dos | idem, attelle de poignet | table | — | dos | G |  | `ouverte` | 243 |  |
| 24-10 | La même, vue du côté du pouce | main appui/profil | idem de profil, la main sur l’attelle | attelle plane | — | pouce | G |  | `ouverte` | 243 |  |
| 24-11 | Au quatrième ou cinquième jour : le tiroir | s01 | la main ouverte tient le devant du tibia, la paume contre | tibia | ~60 | paume | D | oui | `ouverte` | 176 |  |
| 24-11 | Au quatrième ou cinquième jour : le tiroir | s05 | les doigts enroulés autour du talon le tirent vers l’avant | talon | ~70 | dos | G | oui | `crochet` | 196 |  |
| 24-11 | L’entorse haute : serrer le mollet | dessin libre | la main serre le mollet, le pouce d’un côté, les doigts de l’autre | mollet | ~110 | auriculaire | D |  | `coupe-c` | 60 | seuls le pouce et le bout des doigts dépassent |
| 24-12 | Paume vers le bas : monter en 2 temps | s05 | tient la petite boîte de conserve vue par le bout, l’avant-bras appuyé, le poignet monte | boîte de conserve | 54 | bout | G |  | `prise-grosse` | 177 | l’objet vu par le bout, la main de côté |
| 24-12 | Redescendre en 4 temps | s05 | idem, le poignet redescend | boîte de conserve | 54 | bout | G |  | `prise-grosse` | 177 |  |
| 24-12 | Côté intérieur : paume vers le haut | s05 | idem, paume vers le haut | boîte de conserve | 54 | bout | G |  | `prise-grosse` | 177 |  |
| 24-12 | L’étirement : 30 s, quatre fois | s10-plat | la main étirée : le poignet plié à angle droit, les doigts vers le bas | l’autre main | — | paume | D | oui | `ouverte` | 173 | poignet en flexion forte |
| 24-12 | L’étirement : 30 s, quatre fois | s10-plat | l’autre main, à plat sur les doigts, les tire vers soi | doigts de l’autre main | — | pouce | G | oui | `plat` | 173 |  |
| 24-16 | Le même genou, à la loupe | s09 | pince le bout d’un lacet et tire | lacet de peau | [À VÉRIFIER] | pouce | G | oui | `pince-fine` | 123 |  |
| 24-16 | Le même genou, à la loupe | s09 | pince le bout de l’autre lacet et tire | lacet de peau | [À VÉRIFIER] | pouce | G | oui | `pince-fine` | 123 | les deux en miroir dans le code : deux mains gauches |
| 25-40 | Le bain | s03 | la main plongée dans le bain, doigts vers le bas, pour sentir la chaleur | eau | — | paume | D |  | `relachee` | 156 |  |
| 25-40 | Sans thermomètre | s03 | le poignet plongé, l’intérieur du poignet dans l’eau | eau | — | paume | D |  | `relachee` | 93 |  |
| 26-08 | Mouler et attacher | dessin libre (mainDetendue) | la main détendue au bout de l’avant-bras attelé | — | — | dos | G |  | `relachee` | 110 | avant-bras et coude dans l’attelle |
| 26-08 | L’écharpe | dessin libre (mainDetendue) | la main détendue qui sort de l’écharpe | — | — | dos | D |  | `relachee` | 70 |  |
| 26-40 | Appuyer | s03-dessus-l1 | la main du dessous, à plat sur la compresse, appuie | compresse sur la plaie | — | dos | D | oui | `main-sur-main` | 79 | vu d’en haut ; la main du dessous en gris |
| 26-40 | Appuyer | s03-dessus-l1 | la main du dessus, posée sur la première, pousse | l’autre main | — | dos | G | oui | `main-sur-main` | 79 |  |
| 26-40 | Le sang traverse | s03-dessus-l1 | idem | compresse | — | dos | D | oui | `main-sur-main` | 79 |  |
| 26-40 | Le sang traverse | s03-dessus-l1 | idem | l’autre main | — | dos | G | oui | `main-sur-main` | 79 |  |
| 26-40 | Plaie profonde | s10-plat | le bout des doigts tendus pousse la gaze au fond de la plaie | gaze | — | pouce | D |  | `plat` | 149 | contact au bout des doigts, main verticale |
| 26-40 | Laver | s11 | serre la bouteille souple pour faire jaillir l’eau | bouteille | [À VÉRIFIER] | paume | G |  | `prise-grosse` | 65 | la bouteille plus grosse que le trou du poing |
| 26-40 | Sans bouteille | s11 | tient le sac par le cou tordu au-dessus de la plaie | cou tordu du sac | [À VÉRIFIER] | dos | G |  | `prise-manche` | 56 |  |
| 27-04 | Rouler une boulette | s09 | roule une boulette entre les pulpes du pouce et de l’index | boulette de ciment | [À VÉRIFIER] | pouce | G |  | `pince-fine` | 203 | gros plan des deux bouts de doigts |
| 27-04 | Elle colle | s09 | les pulpes s’écartent, la pâte colle aux deux doigts | pâte | — | pouce | G |  | `pince-ouverte` | 203 |  |
| 27-05 | Casser, sentir | buste + main prise/dos | tient le rameau cassé sous le nez | rameau de bouleau | 15 | dos | D |  | `prise-manche` | 87 | main du buste |
| 27-05 | Mâcher un bout | buste + main prise/dos | tient le rameau entre les dents | rameau de bouleau | 15 | dos | D |  | `prise-manche` | 87 |  |
| 28-01 | 2. Tenir la bosse, viser le centre mou | dessin libre | le pouce et l’index écartés de part et d’autre de la bosse, la tendent | peau | — | dos | G |  | `pince-ouverte` | 220 | vu de dessus |
| 28-01 | 4. Le doigt défait les cloisons | dessin libre | l’index tendu entre dans la poche, tourne | cavité de l’abcès | — | pouce | D |  | `pointe` | 160 | seul l’index entre dans la vue |
| 28-04 | Tremper, essorer | s11 | le poing du haut tord le linge | linge roulé | [À VÉRIFIER] | paume | G | oui | `prise-manche` | 78 |  |
| 28-04 | Tremper, essorer | s11 | le poing du bas tord en sens contraire | linge roulé | [À VÉRIFIER] | paume | G | oui | `prise-manche` | 78 | deux mains gauches dans le code (miroir sur les deux) |
| 28-04 | Tester sur le poignet | s10 | paume en l’air, la compresse posée sur l’intérieur du poignet | compresse | — | pouce | G |  | `porte` | 156 |  |
| 28-05 | Presser le flanc, vu de dessus | s03-dos-l3 | la main ouverte presse le fond du verre contre le flanc | verre | ~70 | dos | G |  | `ouverte` | 222 | la paume sur le fond du verre |
| 28-05 | Sur une peau foncée, regarder où la peau est pâle | s03 | la paume montrée, doigts en haut (les taches) | — | — | paume | D |  | `ouverte` | 112 | la main est le sujet |
| 29-04 | Utérus mou : le frotter | s10-plat | la main à plat sur le ventre frotte en rond | ventre | — | pouce | D |  | `plat` | 88 | aidant en rendu plein (noir) |
| 29-04 | Ça saigne encore : à deux mains, en coupe | s10-plat | la main à plat sur le ventre appuie vers le bas | ventre | — | pouce | D | oui | `plat` | 88 |  |
| 29-04 | Ça saigne encore : à deux mains, en coupe | s11 | le poing fermé, dans le vagin, pousse vers le haut | — | 0 | paume | D | oui | `poing` | 56 | en coupe |
| 29-06 | Attendre la grande bouche | s03-dos-l5 | la main à plat sur le dos du bébé, les doigts vers la nuque | dos du bébé | — | dos | G |  | `ouverte` | 212 |  |
| 29-06 | Puis l’amener au sein | s03-dos-l5 | idem, la main pousse le bébé vers le sein | dos du bébé | — | dos | G |  | `ouverte` | 212 |  |
| 29-07 | 1. Placer | main boule/profil | la main en C autour du sein, le pouce dessus, l’index dessous, à 4 cm de l’aréole | sein | 80 | pouce | D |  | `coupe-c` | 175 |  |
| 29-07 | 2. Enfoncer | main boule/profil | le C pousse vers la cage thoracique | sein | 82 | pouce | D |  | `coupe-c` | 175 |  |
| 29-07 | 3. Pincer, relâcher | main boule/profil | le pouce et l’index se rapprochent, puis relâchent | sein | 82 | pouce | D |  | `coupe-c` | 175 |  |
| 29-07 | 4. Tourner | main boule/profil | le C tourné autour de l’aréole, vu de face | sein | 80 | pouce | D |  | `coupe-c` | 175 | vu de face, le C de biais |
| 30-01 | De côté, le pied appuie | s10 | la paume en l’air sous le filet d’eau | eau | — | pouce | D |  | `porte` | 102 |  |
| 30-40 | Retirer les gants, 1 | dessin libre | la main gantée pince le gant de l’autre au poignet et le tire | bord du gant | ~2 | dos | D | oui | `pince-fine` | 100 | mains gantées |
| 30-40 | Retirer les gants, 1 | dessin libre | l’autre main, gantée, doigts tendus | — | — | paume | G | oui | `ouverte` | 100 |  |
| 30-40 | Retirer les gants, 2 | dessin libre | le gant retiré, roulé dans le poing ganté | gant roulé | ~30 | dos | G | oui | `prise-manche` | 100 |  |
| 30-40 | Retirer les gants, 2 | dessin libre | la main nue | — | — | paume | D | oui | `ouverte` | 100 |  |
| 30-40 | Retirer les gants, 3 | dessin libre | deux doigts nus glissés sous le poignet du second gant | bord du gant | — | dos | D | oui | `crochet` | 100 |  |
| 30-40 | Retirer les gants, 3 | dessin libre | la main gantée qui se laisse dégantée | — | — | dos | G | oui | `ouverte` | 100 |  |
| 30-40 | Retirer les gants, 4 | dessin libre | tient la boule des deux gants retournés au-dessus du sac | gants roulés | ~40 | dos | D |  | `pince-fine` | 80 |  |
| 34-01 | Vu de dessus | dessin libre | le pouce et l’index écartés tendent la peau de part et d’autre de la bosse | peau | — | dos | G |  | `pince-ouverte` | 300 | seuls les bouts des deux doigts entrent dans la vue |
| 34-01 | Le doigt défait les cloisons | dessin libre | l’index tendu (ganté) entre dans la cavité, tourne | cavité | — | pouce | D |  | `pointe` | 300 |  |
| 34-02 | Sans peigne fin : aux ongles | dessin libre | les ongles du pouce et de l’index pincent la lente et la tirent le long du cheveu | lente sur un cheveu | ~0,1 | pouce | D |  | `pince-pointe` | 250 | médaillon (loupe) |
| 34-04 | En place sur l’avant-bras, vu de côté | main appui/profil | la main et l’avant-bras du malade posés à plat sur la table | table | — | pouce | D |  | `relachee` | 160 | avant-bras entier |
| 34-05 | Écraser | s11 | le poing sur le pilon debout, écrase | pilon | [À VÉRIFIER] | paume | G |  | `prise-manche` | 71 |  |
| 34-05 | Filtrer au linge chaud, couler en pot | s11 | tient la casserole par le manche, verse | manche de casserole | [À VÉRIFIER] | dos | G |  | `prise-manche` | 65 |  |
| 34-06 | Ce qui touche la peau : au chaudron | s11 | tient le bâton qui brasse le linge | bâton | 12 | paume | D |  | `prise-manche` | 82 | diamètre du code (12, le bâton du modèle 25 px) |
| 37-03b | Sortir, à la pince de bâtons | s11 | tient un des deux bâtons de la pince | bâton vert | [À VÉRIFIER] | dos | D | oui | `prise-manche` | 61 |  |
| 37-03b | Sortir, à la pince de bâtons | s11 | tient l’autre bâton | bâton vert | [À VÉRIFIER] | dos | G | oui | `prise-manche` | 61 |  |
| 37-03b | Brosser chaque pierre, dehors | s11 | tient la branche debout, brosse | branche | [À VÉRIFIER] | paume | G |  | `prise-manche` | 51 |  |
| 38-04 | Au repos, assis depuis une dizaine de minutes | dessin libre | la main gauche du malade, paume en haut, doigts vers la droite | — | — | paume | G |  | `porte` | 380 | avant-bras entier |
| 38-04 | Deux doigts à plat, compter 15 secondes | dessin libre | la main du malade, paume en haut | — | — | paume | G | oui | `porte` | 200 |  |
| 38-04 | Deux doigts à plat, compter 15 secondes | dessin libre | l’index et le majeur à plat sur le poignet, sous la base du pouce ; les autres repliés | poignet | — | dos | D | oui | `deux-doigts` | 200 |  |
| 44-01 | En marchant la piste | s11 | tient le bâton de marche debout | bâton | 36 | paume | G |  | `prise-manche` | 58 |  |
| 47-01 | De côté, sur ce qui est au sol | s11 | tient le bâton de jet par le bout (médaillon) | bâton de jet | [À VÉRIFIER] | paume | D |  | `prise-manche` | 68 | médaillon |
| 47-01 | Par-dessus l’épaule, sur ce qui est perché | s11 | idem (médaillon) | bâton de jet | [À VÉRIFIER] | paume | G |  | `prise-manche` | 68 | médaillon |
| 47-05 | Le lièvre au bâtonnet | s11-gant-l5 | le poing ganté tient le bâtonnet passé dans les pattes du lièvre | bâtonnet | [À VÉRIFIER] | dos | D |  | `prise-manche` | 65 | gant |
| 50-40 | Au-dessus des braises | s11 | tient la queue de castor par sa base, la tourne au-dessus des braises | base de la queue | [À VÉRIFIER] | paume | D |  | `prise-manche` | 94 | objet aplati |
| 50-40 | La peau pèle | s09 | pince le bord de la peau écailleuse et la soulève | bord de peau | ~3 | pouce | D |  | `pince-fine` | 198 |  |
| 50-40 | La nappe de gras, sur le dos dépouillé | s10-plat | la main à plat, le bout des doigts glisse sous la nappe de gras | nappe de gras | — | pouce | D |  | `plat` | 244 |  |
| 61-02 | Vu de dessus | dessin libre | main gauche paume en haut, l’index et le majeur en V de part et d’autre de la lame, dans le ventre | lame du couteau | — | paume | G |  | `deux-doigts-v` | 330 | doigts loin en pointillé (cachés par la paroi) |
| 61-02 | De côté, la paroi coupée dans l’axe | dessin libre | idem de côté : les doigts en V poussent la paroi vers le haut | paroi du ventre | — | auriculaire | G |  | `deux-doigts-v` | 330 |  |
| 69-40 | Sans injecteur : fendre jusqu’à l’os | s11 | tient le couteau en poignard, la lame vers le bas | manche de couteau | [À VÉRIFIER] | dos | G |  | `prise-manche` | 53 |  |
| 75-40 | Ouvrir le ventre | s11 | tient le couteau, la lame vers le haut | manche de couteau | [À VÉRIFIER] | paume | D |  | `prise-manche` | 76 |  |
| 75-40 | Sortir le bloc | s09 | pince les branchies et tire le bloc vers l’arrière | branchies | [À VÉRIFIER] | pouce | G |  | `pince-fine` | 127 |  |
| 78-40 | Remplir à l’entonnoir | s11 | tient la louche par le manche | manche de louche | [À VÉRIFIER] | paume | G |  | `prise-manche` | 114 |  |
| 78-40 | Chasser les bulles | s11 | tient la baguette plongée dans le bocal | baguette | [À VÉRIFIER] | paume | D |  | `prise-manche` | 148 |  |
| 79-40 | Une poignée serrée, puis ouverte | s08-l5 | la paume en l’air, la terre serrée en boule posée dessus (trois états) | motte de terre | ~50 | paume | G |  | `porte` | 140 | ×3 dans la vue |
| 83-40 | Le montage, porte ouverte | s11 | tient l’allume-feu au fond du poêle | allume-feu | [À VÉRIFIER] | dos | G |  | `prise-manche` | 42 | petit |
| 86-05 | Le bout levé | s11 | tient le bout du boyau debout | boyau | ~20 | paume | D |  | `prise-manche` | 73 |  |
| 88-07 | Le boudin enroulé sur la baguette qu’on tourne | s11 | tient la baguette à l’horizontale et la tourne | baguette | 25 | dos | D |  | `prise-manche` | 151 | diamètre du code ; le chapitre ne le donne pas |
| 88-07 | Au-dessus de la braise, et tournée | s11 | tient la baguette au-dessus de la braise | baguette | 25 | dos | G |  | `prise-manche` | 99 |  |
| 90-04 | Tremper dans la gomme chaude | s11 | tient la languette debout et la trempe | languette (plate) | [À VÉRIFIER] | paume | D |  | `prise-manche` | 102 | objet plat |
| 90-04 | Puis dans l’eau froide du lac | s11 | idem | languette | [À VÉRIFIER] | paume | D |  | `prise-manche` | 102 |  |
| 90-04 | Pliée : elle fend | s11 | tient un bout de la languette pliée en arc | languette | [À VÉRIFIER] | paume | G | oui | `prise-manche` | 85 |  |
| 90-04 | Pliée : elle fend | s11 | tient l’autre bout | languette | [À VÉRIFIER] | paume | D | oui | `prise-manche` | 85 |  |
| 90-04 | Pliée : elle ne fend pas | s11 | tient un bout | languette | [À VÉRIFIER] | paume | G | oui | `prise-manche` | 85 |  |
| 90-04 | Pliée : elle ne fend pas | s11 | tient l’autre bout | languette | [À VÉRIFIER] | paume | D | oui | `prise-manche` | 85 |  |
| 90-04 | La tenir dans la main | s11 | tient la languette dans le poing | languette | [À VÉRIFIER] | paume | D |  | `prise-manche` | 105 |  |
| 90-04 | Elle colle ou part en frottant | s11 | tient la languette à l’horizontale | languette | [À VÉRIFIER] | dos | G | oui | `prise-manche` | 82 |  |
| 90-04 | Elle colle ou part en frottant | s09 | pince et frotte la gomme | gomme | — | pouce | D | oui | `pince-fine` | 107 |  |
| 90-04 | Ni fendue ni collante | s11 | idem | languette | [À VÉRIFIER] | dos | G | oui | `prise-manche` | 82 |  |
| 90-04 | Ni fendue ni collante | s09 | idem | gomme | — | pouce | D | oui | `pince-fine` | 107 |  |
| 94-40 | Au maillet de bois | s11 | tient le maillet par le manche debout, frappe le chalumeau | manche du maillet | [À VÉRIFIER] | paume | D |  | `prise-manche` | 128 |  |
| 96-07 | Pousser le ruban | dessin libre | la pâte entre le pouce et l’index tendu ; le pouce la pousse par-dessus l’index en ruban | ruban de terre | ~15 | pouce | D |  | `pince-laterale` | 250 | les autres doigts repliés |
| 96-07 | Il casse sous son propre poids | dessin libre | idem, le ruban casse | ruban de terre | ~15 | pouce | D |  | `pince-laterale` | 250 |  |
| 96-08 | Écraser les nodules roses dans un peu d’eau | s11 | le poing sur le pilon debout | pilon | [À VÉRIFIER] | paume | G |  | `prise-manche` | 109 |  |
| 96-08 | Rincer les racines | s11 | tient les tiges, secoue les racines dans l’eau | botte de tiges | [À VÉRIFIER] | paume | G |  | `prise-manche` | 44 |  |
| 96-12 | Retirée au bout d’une heure | s11 | empoigne la tige de fer debout | tige de fer | [À VÉRIFIER] | paume | D |  | `prise-manche` | 136 | le chapitre ne donne pas le diamètre |
| 98-05 | Le geste (médaillon) | s05 | le creux de la main plein de grain | grain | — | dos | G | oui | `coupe-c` | 40 | médaillon minuscule |
| 98-05 | Le geste (médaillon) | s10-plat | la main ouverte, le grain part du bout des doigts | grain | — | pouce | D | oui | `plat` | 46 |  |
| 98-08 | Les deux mains | main prise/profil | tient la chaudière par le bord du haut | bord de la chaudière | 28 | pouce | D | oui | `prise-manche` | 84 |  |
| 98-08 | Les deux mains | main prise/profil | tient le coin du fond et bascule la chaudière | coin du fond | 28 | pouce | G | oui | `crochet` | 84 | le corps : « à plat sous le fond » |
| 98-09 | Le grain dans la saumure : brasser | s11 | tient le bâton qui brasse | bâton | 28 | paume | D |  | `prise-manche` | 104 | « un bâton d’un pouce » |
| 98-09 | Laisser remonter, écumer | s11 | tient le manche de l’écumoire | manche d’écumoire | 22 | paume | G |  | `prise-manche` | 82 |  |
| 98-10 | En coupe, en travers de la claie | s10-plat | la main à plat remue le grain en va-et-vient | grain sur la claie | — | pouce | D |  | `plat` | 173 |  |
| 99-04 | Retirée : d’abord le dos de la main | s10-plat | le dos de la main, doigts en haut, contre la tige pour sentir la chaleur | tige de fer | [À VÉRIFIER] | pouce | G |  | `plat` | 129 | contact par le dos |
| 99-04 | Puis l’empoigner | s11 | empoigne la tige | tige de fer | [À VÉRIFIER] | paume | G |  | `prise-manche` | 136 | le chapitre ne donne pas le diamètre |
| 99-05 | La pierre, debout | s11 | tient la pierre à faux contre la lame, les doigts referment le dos de la lame | pierre à faux | [À VÉRIFIER] | paume | D |  | `prise-manche` | 76 |  |
| 99-11 | Secouer au ruisseau | s11 | tient le panier par l’anse et le secoue | anse du panier | [À VÉRIFIER] | paume | D |  | `crochet` | 58 |  |
| 100-40 | Le joint, vérifié sous l’eau | s10-plat | la main à plat appuie sur le fond du pot et le tient sous l’eau | fond du pot | — | pouce | G |  | `plat` | 95 |  |
| 101-40 | La saignée, en gros plan | s11 | tient le couteau, la lame à l’horizontale, tranche le cou | manche de couteau | [À VÉRIFIER] | paume | G |  | `prise-manche` | 141 | médaillon |
| 102-02 | En travers de la poutre | s11 | le poing sur une poignée de la plane, appuie vers le bas | poignée | [À VÉRIFIER] | dos | G | oui | `prise-manche` | 71 |  |
| 102-02 | En travers de la poutre | s11 | le poing sur l’autre poignée | poignée | [À VÉRIFIER] | dos | D | oui | `prise-manche` | 71 |  |
| 103-07 | Plier, puis tordre | s09 | pince les deux brins à leur bout, le pli entre le pouce et l’index | deux brins | [À VÉRIFIER] | pouce | G |  | `pince-fine` | 232 |  |
| 103-07 | Passer par-dessus | s09 | idem, un brin passe par-dessus l’autre | deux brins | [À VÉRIFIER] | pouce | G |  | `pince-fine` | 232 |  |
| 103-10 | Écorcer | s19-poing-l5 | tient le couteau, le pouce couché sur le dos de la lame y pince la racine | manche de couteau | [À VÉRIFIER] | pouce | D | oui | `prise-pouce-dos` | 115 |  |
| 103-10 | Écorcer | s11 | tire le bout écorcé de la racine vers le bas | racine | [À VÉRIFIER] | paume | D | oui | `prise-corde` | 76 | deux mains droites dans le code |
| 103-40 | Défibrer au maillet | s09 | pince le bout du tendon sur la bille | tendon | [À VÉRIFIER] | pouce | G | oui | `pince-fine` | 74 |  |
| 103-40 | Défibrer au maillet | s11 | tient le maillet | manche du maillet | [À VÉRIFIER] | paume | G | oui | `prise-manche` | 46 |  |
| 104-40 | Percer | s11 | tient l’alêne debout, le pommeau dans la paume, pousse vers le bas | manche d’alêne | [À VÉRIFIER] | paume | D |  | `prise-manche` | 139 | le pommeau dépasse du poing en haut |
| 105-40 | Sur un galet de grès mouillé | s11 | tient le couteau, la lame à plat sur le galet, affûte | manche de couteau | [À VÉRIFIER] | dos | G |  | `prise-manche` | 122 |  |
| 109-01 | Le palan | s11 | tient le brin menant et tire vers le bas | corde | [À VÉRIFIER] | paume | D |  | `prise-corde` | 61 |  |
| 111-40 | L’aimant colle : pas prêt | s09 | pince le fil au bout duquel pend l’aimant | fil | ~1 | pouce | G |  | `pince-fine` | 76 |  |
| 111-40 | L’aimant décroche : prêt | s09 | idem | fil | ~1 | pouce | G |  | `pince-fine` | 76 |  |
| 112-40 | Tremper dans le suif | s11 | tient le bâton des mèches par-dessus, au-dessus du pot | bâton | [À VÉRIFIER] | dos | D |  | `prise-manche` | 102 | vu de face, le poing par-dessus |
| 112-40 | Figer dans l’eau froide | s11 | idem | bâton | [À VÉRIFIER] | dos | D |  | `prise-manche` | 102 |  |

**Petites mains (moins de ~60 px), relevées pour mémoire** : elles sont au bout des bras d’un corps (le moteur des
corps et ses mains en moufle, `corps/extremites.js`) ou dans une vignette, pas en gros plan. 04-40 « Le costume / Dans le sas » (main (bras), prise et pince au bout du bras, ~40 px); 24-02 « À l’impact » (main (bras), deux prises sur le manche (34 mm), ~28 px); 24-03 « Du bout » (main (bras), prise sur la poignée de la sciotte (37 mm), ~40 px); 24-04 « Porté contre la jambe » (s11, poing sur les poignées (30 mm), ~42 px); 24-06a « De côté » (s11, poing sur la traverse de la béquille (22 mm), ~61 px); 29-04 « Comprimer l’aorte » (main (bras), poing et appui, ~44 px); 29-08 « À quatre pattes / Sur le dos » (main (bras), appui au sol, prise sous les genoux, ~57 px); 31-40 « Rincer le gravier » (s11, anse, ~26 px); 47-01 « De côté » (s11 + main (bras), bâton de jet au bout du bras, ~20 px); 60-40 « Vu de l’arrière » (s11 ×4, cerceau du verveux, ~39 px); 84-03 « v1, v2, v3 » (s11, torche, ~26 px); 86-05 « Un tronçon » (s11, boyau, ~20 px); 89-05b « Sur le genou / La tête » (main (bras), prise et appui, ~49 px); 90-03 « Seul » (main (bras), plat-bord, ~21 px); 98-01b « De côté » (main (bras), manche du fléau, ~32 px); 98-06 « Couper » (s11, poignée de tiges, ~39 px); 98-08 « Vanner au vent » (main (bras), anse et fond, ~28 px); 99-04 « Enfoncer » (main (bras), tige, ~13 px); 102-02 « Le poste » (main (bras), poignées, ~42 px); 102-40 « quatre vues » (main (bras), peau, bâton, ~25 px); 103-40 « Le poste » (main (bras), racloir, ~36 px); 109-08 « La manœuvre » (main (bras), barre, ~19 px); 109-40 « Au levier » (main prise/dos, perche, ~25 px); 16-08 « En descente » (main (bras), brancards, ~13 px); 37-04 « L’épreuve au feu » (main (bras), perche, ~23 px); 19-04 « En coupe » (dessin libre, poing sur la pince de bâtons (hors du cadre), ~30 px).

## Les vues : ce dont les planches ont besoin, et ce dont elles se passent

Relevé sur les 146 mains : `paume` 50, `dos` 46, `pouce` 45, `bout` 3 (l’objet par le bout, main de profil),
`auriculaire` 2. Aucune planche ne montre une main en trois-quarts franc, par le bout des doigts ou par le poignet.

| Pose | Vues nécessaires (relevées) | Vues interdites ou inutiles, et pourquoi |
| --- | --- | --- |
| `prise-manche` | `paume` (le poing côté doigts : l’objet passe en travers, derrière les doigts repliés, devant la paume ; le pouce devant), `dos` (l’objet sort des deux côtés du poing, caché au milieu par la main), `pouce` (l’objet par le bout : un rond dans le trou du poing, ou l’objet dans le plan, le pouce devant) | `auriculaire` : jamais demandée, garder pour la symétrie de l’API. Par le bout des doigts ou par le poignet : raccourci illisible, interdite. **L’objet derrière toute la main** : interdit dans toutes les vues (le défaut que JP a vu). |
| `prise-grosse` | `pouce` avec l’objet par le bout (24-12), `paume` (26-40 bouteille) | `dos` : la main n’entoure plus l’objet, elle a l’air posée ; à éviter. |
| `prise-corde` | `paume` (la corde traverse le poing dans son axe, tendue des deux côtés) | `pouce` : la corde vient vers l’œil, illisible. |
| `prise-pouce-dos` | `pouce` | `dos`, `paume` : le pouce allongé ne se lit pas. |
| `poing` | `paume` | — |
| `pince-fine` | `pouce` (13 sur 15 : les deux pulpes qui se touchent, l’objet entre elles, les autres doigts repliés derrière) | `dos` : seulement si l’objet sort de la pince vers l’œil (30-40, le bord du gant). `paume` : interdite, les doigts repliés cachent la pince. 99-11 s’en passe : « une pince de profil cache le grain ». |
| `pince-pointe` | `pouce` | les autres : l’objet (un cheveu) disparaît. |
| `pince-laterale` | `pouce` | les autres : le pouce sur le côté de l’index ne se lit que de profil. |
| `pince-ouverte` | `dos` (vu de dessus, les deux bouts de doigts de part et d’autre), `pouce` | `paume`. |
| `coupe-c` | `pouce` (le C de profil, 5), le C vu de face (29-07 « Tourner » : la vue `dos` tournée de 90°) | `paume` : le C se ferme en poing à l’œil. |
| `coiffe` | `dos`, `pouce` | `paume` : la paume est contre l’objet. |
| `crochet` | `pouce` / `auriculaire` (le crochet de profil), `dos` (vu de dessus, l’anse sous les doigts) | `paume` de face : les doigts repliés cachent l’anse. |
| `plat` | `pouce` (12 sur 12 : la ligne de contact droite) ; `dos` vu de dessus (main-sur-main, 24-10) | `paume` : contre la surface, invisible ; interdite. |
| `ouverte` | `dos`, `paume`, `pouce` | — |
| `relachee` | `dos`, `paume`, `pouce` | — |
| `porte` | `paume` (de dessus), `pouce` (de profil) | `dos` : vue d’en dessous, inutile. |
| `pointe`, `deux-doigts` | `pouce`, `dos` | `paume` : les doigts repliés cachent la base de l’index. |
| `deux-doigts-v` | `paume` (de dessus, paume en haut), `auriculaire` (de côté) | — |
| `main-sur-main` | `dos` (vu de dessus) | les autres : à hauteur de corps seulement (26-40 vignette). |

Les rotations `rotation: [rx, ry, rz]` relevées restent petites : la main penchée de 10 à 25° sur sa surface
(s10-plat à 10,7°, 98-05 à 22°), le poing tourné dans le plan à n’importe quel angle (c’est `angle`).

## Ce que les planches actuelles font mal, et que `mainSimple` doit rendre impossible

1. **Deux mains du même côté** quand il en faut une de chaque : 28-04 « Tremper, essorer » (deux gauches),
   24-16 « Le même genou, à la loupe » (deux gauches), 103-10 « Écorcer » (deux droites). `cote` doit être explicite
   dans chaque appel à deux mains.
2. **La main mise à l’échelle de l’objet** : s11 posé avec `echelle = diamètre / 25` (34-06, 37-03b, 96-12, 98-09,
   99-04, 112-40, 101-40, 69-40) : la main grossit ou rapetisse avec le manche. La main garde sa taille (`age`,
   `echelle` de la vue) et c’est la prise qui s’ouvre ou se ferme sur le diamètre.
3. **Le gant manque** : 112-41 s’est passée de main (« l’étape 14 veut des gants, et les mains de la bibliothèque
   sont nues ») ; 30-40 dessine ses gants à la main ; 47-05 a un calque `s11-gant-l5`. Une option `gant` (contour
   gonflé de 2 à 4 mm, sans ongle ni pli, une manchette au poignet) couvre les trois.
4. **L’avant-bras long** : 24-09 (jusqu’au coude, le bracelet juste dessous), 24-10 (sous les bandes de l’attelle),
   34-04, 38-04, 26-08 (dans l’attelle) : `avantbras.longueur` doit aller jusqu’au coude (255 mm chez l’homme, voir
   `proportions.json`) avec la forme du coude au bout.
5. **Des gros plans trop grands pour leur vue** : 13-09 « Au point de frappe » (la main fait ~660 px, coupée) ; et
   des médaillons trop petits (98-05 : ~40 px) qui relèvent plutôt du moteur des corps.

## Ce que deviennent les appels actuels

| Appel actuel | Mains | Pose(s) qui le remplacent |
| --- | --- | --- |
| `modele('s11')` (poing vu de la paume) | 58 | `prise-manche` 53, `prise-corde` 2, `prise-grosse` 1, `poing` 1, `crochet` 1 |
| `modele('s09')` (pince de côté) | 14 | `pince-fine` 13, `pince-ouverte` 1 |
| `modele('s10-plat')` | 13 | `plat` 12, `ouverte` 1 (la main étirée de 24-12) |
| `modele('s05')` (doigts repliés, pouce dessus) | 8 | `prise-grosse` 3, `pince-laterale` 2, `coiffe` 1, `crochet` 1, `coupe-c` 1 |
| `modele('s03…')` (main relâchée) | 10 | `main-sur-main` 4, `ouverte` 4, `relachee` 2 |
| `modele('s10')`, `s08-l5` | 3 | `porte` 3 |
| `modele('s01')`, `s19-poing-l5`, `s11-gant-l5` | 3 | `ouverte`, `prise-pouce-dos`, `prise-manche` + gant |
| `main('prise', …)` (dos, profil, par un buste) | 6 | `prise-manche` 5, `crochet` 1 |
| `main('boule', …)` | 5 | `coupe-c` 5 |
| `main('appui', …)` | 4 | `ouverte` 3, `relachee` 1 |
| dessin libre (9 planches) | 22 | `ouverte` 3, `pince-ouverte` 2, `pointe` 2, `pince-fine` 2, `porte` 2, `deux-doigts-v` 2, `pince-laterale` 2, `relachee` 2, `coupe-c` 1, `prise-manche` 1, `crochet` 1, `pince-pointe` 1, `deux-doigts` 1 |

Le s05 est le calque le plus mal employé : un seul dessin sert à cinq gestes différents (tenir une boîte, une
pierre, coiffer un foret, crocheter un talon, porter du grain). Les 22 mains dessinées à la main sont des gros plans
(100 à 380 px) : ce sont elles qui gagneront le plus à `mainSimple`.

## Les vues qui se passent de main (à ne pas « réparer »)

99-11 « Le grain roulé » (la pince cacherait le grain), 27-03 vue 2 (le bout des doigts cacherait la couronne),
99-12 (les mains cacheraient les croisements), 97-02, 98-02, 99-10, 28-06, 100-05 (la flèche porte le geste),
61-02 (le couteau dans l’autre main, qu’on ne dessine pas). Seule 112-41 s’en passe faute de gant : elle prendra
une main gantée quand l’option existera.

## Source des proportions (`proportions.json`)

- **Adultes** : Greiner T.M. (1991), *Hand Anthropometry of U.S. Army Personnel*, NATICK/TR-92/011 (DTIC ADA244533),
  1304 femmes et 1003 hommes. C’est la seule enquête publique qui donne des **liens d’articulation à articulation**
  (métacarpe, P1, P2, P3 de chaque doigt), les largeurs et les périmètres des articulations, les palmures, le
  poignet et le centre de prise. Table relevée par OCR et rapports réconciliés dans le dépôt GitHub
  `ErnestWang31/hand-kinematics` (licence MIT, données du gouvernement américain), qui documente deux corrections :
  la P1 de l’index (Greiner prend la MCP au pli palmaire) et le pouce (ses liens de pouce sont inutilisables ; le
  pouce anatomique, métacarpe 45, P1 32, P3 27 mm pour une main de 194, est calé sur le bout du pouce au poignet
  mesuré, à −0,2 % chez la femme et −1,8 % chez l’homme ; le métacarpe I de 46,2 mm de Buryanov et Kotiuk, 2010, le
  recoupe).
- **Recoupement** : ANSUR II (2012), fichiers publics de l’armée américaine (4082 hommes, 1986 femmes), statistiques
  calculées par l’agent 4 : main 193,3 / 181,1 mm (Greiner 194,1 / 180,7), largeur 88,3 / 78,2 (90,4 / 79,5),
  paume 116,5 / 108,7. Les deux enquêtes s’accordent à 2 mm près. ANSUR II donne aussi l’avant-bras (radiale-stylion
  267,9 / 241,3 ; périmètre maximal 310,1 / 264,1) et le coude au centre de prise (349,0 / 317,7).
- **Enfants de 6 et 4 ans** : le **facteur** de la main du corps des planches (`corps/proportions.json` : 122,3 / 189
  = 0,647 et 108 / 189 = 0,571), pour que la main de la vitrine des corps et celle du gros plan soient la même ; la
  largeur par le rapport largeur / longueur des garçons de 5 ans (Wen et coll., 2020 : 61,0 / 130,8 = 0,466, le même
  que l’homme) ; le reste, l’homme × facteur `[À VÉRIFIER]`. Recoupements : avant-bras des garçons 145 mm à 4 ans et
  173 mm à 6 ans (NIST AnthroKids, Snyder et coll. 1977) ; main des garçons chinois de 5 ans 130,8 mm (Wen). La main
  de 6 ans du corps est peut-être courte de 4 à 8 % : le tableau « Hand Length » d’AnthroKids tranchera.
- **Déduits, notés comme tels** : l’épaisseur des doigts aux articulations (largeur et périmètre mesurés, section en
  ellipse) ; l’annulaire et l’auriculaire au rapport du majeur ; la largeur de chaque doigt à sa racine (la largeur
  de la main partagée au prorata des périmètres) ; l’épaisseur du poignet et de la paume entre deux bornes (ellipse,
  stade). L’épaisseur de la main sur la MCP du majeur (33 / 28 mm) vient d’un tableau sans en-tête : `[À VÉRIFIER]`.
- **Manquent** (`[À VÉRIFIER]` dans le fichier) : la largeur et l’épaisseur de l’avant-bras près du coude (seul le
  périmètre est sourcé), le bout des doigts, la section de l’IP du pouce, tout ce qui est propre à l’enfant au-delà de
  la longueur et de la largeur.
- **Limite** : le réseau de la session ne joint ni DTIC, ni NIST, ni PMC, ni archive.org ; seuls les fichiers de
  données passés par GitHub ont pu être téléchargés (scratch `agent4/telecharge/`). Aucune page n’est enregistrée
  dans `/sources`. Ces chiffres servent au dessin : rien ne s’imprime.

**Ce que lit le moteur.** `ages.<âge>.main.longueur`, `.main.largeur` et `.avantbras.longueur` sont au repère du
dessin (l’homme à 190 × 88,5, avant-bras 255,5 comme le corps ; femme 176,9 × 77,8 ; enfant de 6 ans 122,9 × 57,3 ;
de 4 ans 108,5 × 50,5) ; toutes les autres cotes sont les moyennes mesurées (× `vers_dessin` = 0,979 pour passer au
repère). `dessin_homme` donne la main de l’homme déjà ramenée à 190, prête pour `ANATOMIE`. Écart avec l’`ANATOMIE`
provisoire du moteur : ses MCP sont 8 à 15 mm trop loin du poignet (majeur 89 contre 81), ses P1 4 à 7 mm trop courtes
(majeur 47 contre 52), ses P2 3 à 4 mm trop longues (29 contre 26) et ses doigts plus serrés (MCP de l’index à l’auriculaire :
53 mm d’écart contre 69, ce dernier chiffre étant un choix de modèle `[À VÉRIFIER]`) ; sa largeur 86 contre 88,5.

Les cotes mesurées de l’homme (femme × 0,931 ; enfant de 6 ans × 0,647 ; de 4 ans × 0,571) :

| | Métacarpe | P1 | P2 | P3 | Largeur IPP | Épaisseur IPP | Largeur IPD |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pouce | 45,0 | 32,0 | — | 27,2 | Ø 23,0 à l’IP | | |
| Index | 84,4 | 47,9 | 22,7 | 27,4 | 23,0 | 20,5 | 19,3 |
| Majeur | 83,9 | 53,4 | 27,0 | 27,4 | 22,5 | 21,8 | 18,7 |
| Annulaire | 76,9 | 52,0 | 24,5 | 28,0 | 21,0 | 20,3 | 17,5 |
| Auriculaire | 73,0 | 40,6 | 17,5 | 25,4 | 18,7 | 18,1 | 15,6 |

Main de l’homme : 194,1 de long (le moteur la dessine à 190), 90,4 de large aux MCP, paume 110,5, palmures à 69,1
(pouce-index), 110,4, 109,9 et 96,6 du pli du poignet ; poignet 65,8 de large, 37 à 44 d’épaisseur ; le centre d’un
manche tenu à 76,0 du poignet et 349,0 du coude ; avant-bras 267,9 (radiale-stylion), Ø moyen 98,7 près du coude.
Contrôle : `agent4/squelettes-mains.png` (les liens sourcés, à 190, contre ceux d’`ANATOMIE` du moteur, et les trois
autres âges). Amplitudes et couplages (IPD ≈ 0,67 × IPP, l’écart qui tombe à 0 à 90° de MCP, l’arche de l’annulaire et de
l’auriculaire) : `proportions.json`, `articulations`.
