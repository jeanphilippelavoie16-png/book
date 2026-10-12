# Le réseau des renvois — cartographie des 89 chapitres

*Passe d'édition. Aucun chapitre n'a été réécrit. Document de travail pour JP et pour l'éditeur.*
*Établi le 21 septembre 2026, sur les 89 chapitres au statut RÉD et leurs 89 fiches de suivi.*

---

## 0. Méthode, et ce qu'elle vaut

Trois couches ont été extraites séparément, parce qu'elles ne disent pas la même chose :

| Couche | Ce que c'est | Renvois |
| --- | --- | --- |
| **Fiche** | Le tableau « Renvois » de `suivi/NN-redaction.md` | 2 195 |
| **Bloc** | Le bloc `Renvois` en fin de chapitre, quand il existe | 1 008 |
| **Corps** | Les « chapitre N » et « ch. N » écrits dans les sections 1 à 9 | 2 022 |
| **Union** | Ce que le livre déclare, toutes couches confondues | 2 294 |

**Seul le corps compte pour le lecteur.** Un renvoi qui n'existe que dans la fiche de suivi
n'existe pas dans le livre imprimé ; un renvoi qui n'est que dans le bloc de fin de chapitre
arrive après la décision. Tous les classements ci-dessous sont donc calculés sur le **corps**,
et l'union sert seulement à juger de la réciprocité.

Il était déjà établi qu'aucun renvoi ne pointe vers un chapitre inexistant. C'est vérifié une
deuxième fois par construction, et c'est vrai. Ce document cherche autre chose.

**Un avertissement sur le comptage.** Le livre écrit ses renvois de quatre façons :
« chapitre 44 » (89 chapitres), « ch. 44 » (83 chapitres), « **44** (raison) » (7 chapitres),
et une **colonne de numéros nus** dans un tableau — `| 36, 37, 38, 39, 40, 41 |` — dans
**27 chapitres**. La quatrième n'est pas un renvoi lisible : un lecteur qui tombe sur `| 51, 63,
64, 65, 67, 79 |` au bout d'une ligne de tableau ne sait pas que ce sont des chapitres, et aucun
index ne peut les ramasser. Les chapitres 34, 35, 37 à 43, 67, 69 et 70 en dépendent lourdement.
C'est une correction de mise en pages, pas de fond, mais elle touche 27 chapitres.

---

## 1. Les aimants — les chapitres socles

Treize chapitres portent le livre. Le classement est par **nombre de chapitres distincts qui les
appellent dans le corps**, pas par nombre de mentions : un chapitre cité 150 fois par 3 chapitres
serait un doublon, pas un socle.

| Rang | Ch. | Titre | Chapitres qui l'appellent | Mentions | Ce qu'il porte pour les autres |
| --- | --- | --- | --- | --- | --- |
| 1 | **67** | Pemmican et graisses | **60 / 88** | 150 | Le gras. Toute la chaîne alimentaire du livre y aboutit |
| 2 | **24** | Le mal de caribou | **58** | 132 | Le plafond protéique et le plancher de gras. Un danger mortel |
| 3 | **7** | Des enfants de 4 et 6 ans | **55** | 86 | Le lecteur type. Tous les seuils s'y rabattent |
| 4 | **68** | Froid naturel | **52** | 114 | La conservation par défaut de huit mois par année |
| 5 | **69** | Un congélateur plein qui dégèle | **47** | 91 | Le tri d'urgence. Le chapitre qu'on ouvre en panique |
| 6 | **27** | Soigner quand il n'y a personne | **46** | 88 | Tout l'accident du livre y renvoie |
| 7 | **63** | Salaison à sec | **45** | 107 | Le pilote. La référence de dosage du sel |
| 8 | **48** | Ours noir | **45** | 66 | Trichinellose, gras, et l'animal qui vient au camp |
| 9 | **41** | Abats et organes | **44** | 71 | Le cadmium des cervidés |
| 10 | **13** | Eau : puiser, filtrer, désinfecter | **40** | 76 | L'eau potable, et donc tout le reste |
| 11 | **82** | Affûter, limer, aiguiser | **40** | 71 | Le couteau. Tout le tome 3 en dépend |
| 12 | **62** | Le sel | **39** | 88 | La convention de pourcentage de tout le livre |
| 13 | **72** | Fumer le poisson | **39** | 66 | Le botulisme de type E |

Deux chapitres complètent la liste sans être des aimants au même sens : **61 — Pourquoi la
viande pourrit** est appelé par 26 chapitres mais surtout il en appelle 36, c'est le chapitre
**explicatif racine** de tout le tome 4 ; et **34 — Calendrier annuel** appelle 33 chapitres,
c'est le carrefour de navigation du tome 3.

**Ordre de lecture proposé.** Pas l'ordre du livre : l'ordre des dépendances.

1. **61** — Pourquoi la viande pourrit *(le mécanisme, avant toute technique)*
2. **62** — Le sel *(la convention de pourcentage, employée par 63, 64, 66, 71, 77)*
3. **24** — Le mal de caribou *(le danger qui commande toutes les rations)*
4. **67** — Pemmican et graisses *(le gras, réponse au 24)*
5. **68** — Froid naturel *(la conservation par défaut)*
6. **13** — Eau *(indépendant, et préalable à tout)*
7. **7** — Des enfants de 4 et 6 ans *(le lecteur, et tous les seuils rabattus)*
8. **27** — Soigner quand il n'y a personne *(ce qui arrive quand le reste échoue)*

Ces huit chapitres, plus **41**, **48**, **63**, **72** et **82**, sont les treize qui **doivent
être irréprochables** : une erreur dans l'un d'eux se propage dans quarante à soixante chapitres.

**Six d'entre eux sont déjà sur la liste à relecture humaine obligatoire de `CLAUDE.md`** — 24,
41, 48, 62, 63, 72. **Sept n'y sont pas : 7, 13, 27, 67, 68, 69 et 82.** Le plus frappant est le
**67 — Pemmican et graisses** : c'est le premier chapitre du livre par le nombre de chapitres qui
en dépendent (60 sur 88), il porte le gras, c'est-à-dire la réponse au mal de caribou, et il ne
passe devant personne d'extérieur au projet. Recommandation : y ajouter **67**, **68 (Froid
naturel)**, **69 (Un congélateur plein qui dégèle)** et **13 (Eau)**. Le 7 et le 27 relèvent plutôt
des relecteurs déjà prévus pour le 26 et le 29 ; le 82 est couvert en partie par le relecteur
prévu pour le 83-84.

---

## 2. Les orphelins

**Aucun chapitre n'est orphelin au sens strict :** le moins appelé l'est encore par six chapitres
si l'on compte les fiches. Mais dans le **corps du livre**, qui est le seul endroit où le lecteur
voit un renvoi, six chapitres sont pratiquement introuvables :

| Ch. | Titre | Appelé dans le corps par | Diagnostic |
| --- | --- | --- | --- |
| **50** | Outarde, canards, oiseaux d'eau | **2** chapitres (5, 45) | Le gibier à plumes entier à 82 °C est une règle du livre, et le chapitre qui la porte n'est appelé par personne dans le tome 4 |
| **51** | Martre, vison, renard, lynx, loup | **2** (69, 79) | Chapitre de piégeage et de fourrure. Ni 34, ni 35, ni 42 ne l'appellent dans leur texte |
| **47** | Porc-épic | **3** (24, 44, 79) | Or le 44 le nomme comme « l'une des rares sources de gras ». Le 67, qui est le chapitre du gras, ne l'appelle pas |
| **56** | Nasses, filets, verveux | **4** (43, 55, 58, 70) | Le 53 et le 54 pêchent sans jamais renvoyer aux engins |
| **49** | Rat musqué, écureuil, marmotte | **4** (36, 46, 47, 78) | Espèce à tularémie, comme le lièvre. Le 44 le déclare en fiche, pas dans le texte |
| **58** | Plantes comestibles boréales | **5** (24, 30, 43, 74, 75) | Le 25 (scorbut) ne l'appelle pas dans son corps alors que les deux partagent le rappel du thuya |

**Le cas le plus grave n'est pas dans ce tableau : c'est le chapitre 43.**

**43 — Comment lire une fiche d'espèce** déclare **47 renvois sortants**, le maximum du livre
après le 34. Il est le chapitre qui définit la grille de lecture de tout le tome 3. Il n'est
appelé dans le corps que par **5 chapitres** : 35, 52, 53, 54 et 62. Aucune des fiches d'espèce
**44, 45, 46, 49, 50, 51, 56, 57, 58, 60** ne le nomme. La fiche de suivi du 44 écrit pourtant :
« Le 44 est la première fiche d'espèce du livre : sa structure doit correspondre à ce que le 43
annonce. » Le 44 le déclare en fiche et dans son bloc de fin — et ne le dit jamais au lecteur.

Un chapitre qui annonce la grille et que la grille n'appelle jamais est soit mal placé, soit à
transformer. Deux issues possibles, à trancher par JP : en faire une **page d'ouverture de
tome 3** plutôt qu'un chapitre numéroté, ou ajouter une ligne d'appel au 43 dans chacune des
17 fiches d'espèce. La deuxième est mécanique ; la première est une décision de plan.

---

## 3. La réciprocité

**1 065 renvois du corps sont à sens unique** : A nomme B dans son texte, et B ne nomme A nulle
part, ni dans son corps, ni dans son bloc, ni dans sa fiche. Sur 2 022 renvois de corps, c'est
plus de la moitié. Une partie est normale — un chapitre de référence n'a pas à citer tous ses
clients. Mais le taux de retour des socles mérite d'être regardé :

| Ch. | Chapitres qui l'appellent | Chapitres qu'il rend | Taux |
| --- | --- | --- | --- |
| 82 — Affûter | 40 | 9 | **22 %** |
| 13 — Eau | 40 | 11 | **28 %** |
| 7 — Des enfants | 55 | 17 | **31 %** |
| 67 — Pemmican | 60 | 20 | **33 %** |
| 72 — Fumer le poisson | 39 | 13 | **33 %** |
| 15 — Poêles à bois | 32 | 8 | 25 % |
| 76 — Caveau | 31 | 8 | 26 % |
| 63 — Salaison à sec | 45 | 25 | 56 % |
| 62 — Le sel | 39 | 23 | 59 % |

Le 63 et le 62 sont le bon modèle : ils savent qui les appelle. Le **82** est l'exemple inverse —
quarante chapitres envoient le lecteur vers l'affûtage, et l'affûtage n'en connaît que neuf.
Concrètement, le 82 ne mentionne nulle part le couteau à dépouiller du 79, ni la lame de hachoir
du 42, ni les hameçons du 53 et du 54 alors que ces trois chapitres l'appellent explicitement.

**Trois asymétries à corriger, choisies parce qu'elles portent une information et pas seulement
une politesse :**

1. **44 et 46 → 13, sur la durée d'ébullition.** Le chapitre 44 (lièvre) écrit dans son bloc de
   renvois : « **13** (eau, et l'écart des cinq minutes) ». Le chapitre 46 (castor) retient
   **5 minutes à gros bouillons**, d'après la page québécoise sur la tularémie qui nomme le
   castor. Le chapitre 13 retient **1 minute** (INSPQ) et **ne mentionne jamais la tularémie**,
   ni l'écart, ni les cinq minutes. Le 13 cite bien le 46 — mais pour la hutte en amont de la
   prise d'eau, pas pour le temps d'ébullition. Le 44 sait que l'écart existe : sa section 10
   porte « Ce n'est pas la durée publiée au chapitre 13. **À arbitrer par l'éditeur.** » Mais son
   bloc de renvois présente l'arbitrage comme s'il était déjà au 13. **Il n'est nulle part.** Un
   lecteur qui manipule un lièvre, ouvre le 13 et fait bouillir une minute applique un barème que
   deux autres chapitres du même livre jugent insuffisant pour ce cas-là. Voir aussi la section 5.
2. **53, 54 → 56.** Les deux chapitres de pêche renvoient aux engins ; le 56 ne les rend pas.
3. **24, 44, 79 → 47.** Le porc-épic est nommé source de gras par trois chapitres ; le 67, qui
   est *le* chapitre du gras, ne le nomme pas.

---

## 4. Les renvois en boucle

C'est le défaut que la mission demandait de chercher sérieusement. La recherche a porté sur les
paires où A et B se citent mutuellement **avec un verbe de report des deux côtés** (« appartient
au », « relève du », « est au ch. », « voir ch. »). Trente paires répondent à ce critère. Vingt-six
sont de **bonnes divisions du travail**, pas des boucles — 39 ↔ 40 (longes contre cou), 37 ↔ 40
(carte contre geste), 27 ↔ 31 (traitable contre intraitable), 62 ↔ 63 (le sel contre la salaison),
73 ↔ 85 (procédure contre stock). Chaque côté garde quelque chose.

**Quatre sont de vraies boucles. L'information n'est nulle part.**

### 4.1 — Le matériel de pansement : qui le date et le remplace ? (27 ↔ 29) — BLOQUANT

Le chapitre **27**, section 4, écrit :

> « Ce qui se stocke, se date et se remplace **appartient au chapitre 29** ; ce tableau dit
> seulement ce qui doit être à portée de main le jour où ça arrive. »

Le chapitre **29**, section 4, écrit dans son propre tableau :

> « Trousse de premiers soins et matériel de pansement | **Voir ch. 27** | Ce chapitre-ci ne
> traite pas du matériel de plaie, seulement des produits »

et plus loin : « Le matériel de pansement **appartient au ch. 27**. »

Le 29 porte tout le système de rotation du livre — deux rotations par an, registre papier, dates
de péremption, contrôle à zéro produit périmé — et il en **exclut explicitement** le matériel de
plaie. Le 27 renvoie ce même matériel au 29. **Personne ne dit quand on remplace une compresse
stérile.** Ce n'est pas théorique : une gaze stérile périmée dans un chalet hors réseau est le
genre de chose qu'on découvre le jour où on en a besoin.

### 4.2 — Le sel tiré du fleuve : combien par litre ? (63 → 62) — BLOQUANT

Le chapitre **63**, section 9, variante d'urgence :

> « L'eau salée du Saint-Laurent bouillie à sec donne du sel (ch. 62). [...] **La teneur en sel
> de l'eau et le rendement en kilos par litre appartiennent au ch. 62 ; aucun chiffre n'est
> avancé ici.** »

Le chapitre **62**, section 10 :

> « **Aucune valeur de salinité** pour l'estuaire du Saint-Laurent au large de la Côte-Nord. [...]
> La section 9 ne donne donc **aucun rendement annoncé** et fait peser le sel obtenu. »

Le 62 est honnête : il nomme le trou. Le 63 ne l'est pas : il affirme au lecteur que le chiffre
est ailleurs, alors qu'il n'est nulle part. C'est exactement le mécanisme décrit dans la mission.
Un lecteur qui décide de bouillir de l'eau de fleuve pour saler un orignal ne peut pas calculer
son coût en bois avant de commencer, ce que le 63 lui demande pourtant de faire.

### 4.3 — La conversion salpêtre → nitrite (39, 41, 50 → 63 ; 37, 40, 70 → 62) — BLOQUANT

Six chapitres envoient le lecteur chercher la conversion du salpêtre des vieilles recettes vers
le sel nitrité moderne. Le chapitre **50** est le plus catégorique :

> « La conversion et les barèmes sont au chapitre 63, et **c'est le seul endroit du livre où ils
> figurent.** »

Le chapitre **39** : « la conversion et les doses sont au chapitre 63. »
Le chapitre **41** : « Les quantités sont au chapitre 63. »

Le chapitre **63**, section 8, point 4, écrit :

> « **Ce livre ne donne aucune quantité de salpêtre, dans aucun chapitre.** »

Et sa fiche : « Le chapitre **ne convertit pas** ce chiffre en consigne domestique. » Le 62 dit la
même chose : « aucune quantité de salpêtre n'apparaît dans ce livre ». **Les deux chapitres cibles
refusent explicitement de publier ce que six chapitres leur attribuent**, et le 50 va jusqu'à
affirmer au lecteur que ça se trouve quelque part. C'est une contradiction directe entre deux
chapitres du même livre, sur un produit qui est un poison à dose modérée.

Note : la conversion qui **existe** est celle du nitrite du commerce (62, étape 21 :
`masse de mélange (g) = 20 × M ÷ T`). Elle est bonne et bien placée. C'est la conversion **du
salpêtre** qui n'existe pas et que le livre promet.

### 4.4 — Le préchauffage de la fonte (84 → 88, trois fois) — BLOQUANT

Le chapitre **84** renvoie trois fois au 88 pour la fonte :

> « la fonte [...] se répare au brasage quand on n'a pas de quoi la préchauffer et l'enterrer dans
> la cendre pour la nuit (**ch. 88**) »
> « **Les températures de préchauffage de la fonte : voir ch. 88** et la liste des `[À VÉRIFIER]`
> au §10. »

Le chapitre **88 — Trempe et travail du métal à chaud** ne contient **pas une seule occurrence du
mot « fonte »**, ni du mot « préchauffage ». Sa section 10 liste huit `[À VÉRIFIER]` : aucun ne
concerne la fonte. Le 88 traite l'acier — forge, recuit, trempe, revenu. La fonte n'est traitée
nulle part dans le livre, et le 84 dirige le lecteur vers un chapitre qui l'ignore, en lui disant
même où regarder dans ce chapitre.

---

## 5. Trente renvois vérifiés dans le chapitre cible

Échantillon pris parmi les renvois les plus chargés, c'est-à-dire ceux qui **nomment un livrable**
(un barème, un calcul, une dose, un rendement, une teneur) et emploient un verbe de report. Pour
chacun, le chapitre cible a été ouvert et fouillé.

**Vingt renvois tiennent.** Le chiffre ou la procédure annoncée est bien là :

| Renvoi | Ce qui était promis | Verdict |
| --- | --- | --- |
| 4 → 13 | Le détail de l'eau après une panne | ✔ 1 minute à gros bouillons, INSPQ |
| 19 → 14 | Les seuils de CO en ppm et le choix de l'avertisseur | ✔ 25 ppm/1 h, 10 ppm/24 h, CAN/CSA-6.19 |
| 14 → 15 | Rendements chiffrés, fendage, séchage | ✔ M20, ≥ 6 mois, bûche témoin |
| 29 → 6 | La posologie de l'iodure de potassium | ✔ Tableau complet par âge, 65 et 130 mg |
| 37 → 21 | Délais d'enregistrement et coupons de transport | ✔ 48 h après la sortie du lieu de chasse |
| 65 → 62 | La formule de conversion vers un produit du commerce | ✔ `20 × M ÷ T`, étape 21 |
| 24 → 26 | Le détail des équations du besoin | ✔ Section 5.3, plancher et plafond |
| 33 → 24 et 26 | Le calcul du plafond protéique de l'enfant | ✔ 35 % de l'énergie, les deux le portent |
| 30 → 25 | La conduite complète du scorbut | ✔ Sections C, D, E |
| 25 → 30 | La place et les limites du thé du Labrador | ✔ Tableaux 1 et 3, confusion avec le kalmia |
| 62 → 63 | Le suivi de perte de masse | ✔ Étape 16, pesée hebdomadaire |
| 63 → 64 | La pièce qui baigne relève de la saumure | ✔ |
| 73 → 85 / 85 → 73 | Joint d'autoclave au stock / procédure complète | ✔ des deux côtés |
| 36 → 41 | Le détail des organes | ✔ |
| 27 → 31 / 31 → 27 | Traitable contre intraitable | ✔ |
| 22 → 48 | Ce qui cogne et qui n'est pas humain | ✔ |
| 76 → 68 et 72 | Ce que le caveau ne tient pas | ✔ 3 °C, botulisme de type E |
| 48 → 86 | Perche, corde et poulie | ✔ |
| 52 → 80 | Récupérer les tendons | ✔ |
| 84 → 82 | Remise en état d'un tranchant | ✔ |

**Dix renvois ne tiennent pas.** Quatre sont les boucles de la section 4. Les six autres :

| # | Renvoi | Ce qui était promis | Ce qu'il y a vraiment |
| --- | --- | --- | --- |
| 1 | **34 → 37** | « le rendement en viande désossée d'une bête **est donné au chapitre 37** et n'est pas chiffré ici » | Le 37 écrit : « ni un rendement en viande. Le livre ne l'invente pas », et met le rendement dans sa liste `[À VÉRIFIER]`. **Le chiffre n'existe pas.** Or le 34 s'en sert pour dire qu'un orignal entier « est un problème, pas une solution » |
| 2 | **3 → 29** | « Ibuprofène (**dose : voir ch. 29**) », dans le tableau Matériel | Le 29 écrit : « **Aucune dose ne figure dans ce chapitre** » et « Toute posologie. Aucune dose, aucun mg, aucun nombre de comprimés, pour aucun produit ». Il nomme de plus l'**acétaminophène** en premier choix, pas l'ibuprofène. Un lecteur en hypothermie cherche une dose et trouve une politique éditoriale |
| 3 | **45 → 73** | « La mise en conserve de la viande relève entièrement du **ch. 73 et de ses barèmes** » | Le 73 : « le chapitre **ne publie aucun barème de durée de traitement**, faute de source canadienne ». Il renvoie au livret fourni avec l'autoclave. La formule « ses barèmes » promet une table qui n'existe pas |
| 4 | **52 → 62** | « Les pourcentages de sel du livre [...] **sont au chapitre 62**, pas ici » | Le 62 porte la **convention** (pourcentage sur le poids de la pièce) et un exemple de calcul à 3 %. Les pourcentages utilisables sont au 63 (6 %, plancher 2,5 %), au 64 et au 71. Un lecteur qui sale du phoque n'a pas de pourcentage. Le 52 est sur la liste à relecture humaine obligatoire |
| 5 | **55 → 71** | « les valeurs [de pourcentage de sel] **sont au chapitre 71** » | Le 71 donne **3 % `[À VÉRIFIER]`** pour un produit court et écrit explicitement : « Pour un produit de garde, le livre **ne donne pas de pourcentage** parce qu'aucune source canadienne n'en publie ». Promesse à moitié tenue, et la moitié manquante est celle qui compte pour l'éperlan gardé tout l'hiver |
| 6 | **30 → 25** | Le tableau 1 du 30 porte « Sapin baumier, aiguilles, apport de vitamine C (ch. 25) » avec la mention **« teneur en vitamine C non sourcée »** | Le 25 donne **270 mg par 100 g** pour l'aiguille de sapin baumier (Durzan). **Les deux chapitres se contredisent sur l'existence même du chiffre.** L'un des deux a tort, et le vérificateur technique doit trancher lequel |

---

## 6. Les corrections, par gravité

### Bloquant — à corriger avant la porte 3

| # | Où | Correction |
| --- | --- | --- |
| 1 | **27 § 4 et 29 § 4** | Attribuer à l'un des deux la datation et le remplacement du matériel de pansement. Recommandation : au **29**, qui porte déjà tout le système de rotation — retirer du 29 la phrase « Ce chapitre-ci ne traite pas du matériel de plaie » et ajouter les compresses et les pansements au registre |
| 2 | **63 § 9** | Retirer « appartiennent au ch. 62 ». Écrire ce que le 62 écrit déjà : aucune valeur de salinité de l'estuaire n'existe au dossier, on pèse le sel obtenu. Ne pas promettre un chiffre absent |
| 3 | **50, 39, 41** | Supprimer les trois promesses de conversion du salpêtre. Le 50 en particulier : « c'est le seul endroit du livre où ils figurent » est faux et doit sauter. Formulation de remplacement, déjà écrite au 63 § 8 : « Ce livre ne donne aucune quantité de salpêtre, dans aucun chapitre » |
| 4 | **84 § 4 et § 5 étape 32** | La fonte n'est traitée nulle part. Soit le 88 reçoit une entrée sur le préchauffage de la fonte, soit le 84 cesse d'y renvoyer et porte lui-même la limite : « le livre ne donne pas de température de préchauffage de la fonte ». Dans les deux cas, ajouter la ligne à un `[À VÉRIFIER]` |
| 5 | **3 § 4** | « Ibuprofène (dose : voir ch. 29) » : le 29 ne donne aucune dose et nomme l'acétaminophène en premier choix. Aligner le 3 sur le 29 ou retirer le renvoi |
| 6 | **13, 44, 46** | L'écart 1 minute (INSPQ) contre 5 minutes (tularémie) doit être arbitré **dans le 13**, qui est le chapitre de l'eau et qui est appelé par 40 chapitres. Le 13 ne nomme aujourd'hui ni la tularémie ni l'écart. C'est un chiffre de sécurité porté par un socle |

### Important — avant la porte 4

| # | Où | Correction |
| --- | --- | --- |
| 7 | **34** | Retirer « le rendement en viande désossée est donné au chapitre 37 ». Le 37 dit explicitement qu'il ne le donne pas |
| 8 | **45, et tout chapitre qui écrit « les barèmes du ch. 73 »** | Le 73 ne publie aucun barème et l'assume. Remplacer par « les barèmes du livret fourni avec l'autoclave, comme l'exige le ch. 73 » |
| 9 | **52** | Donner un pourcentage de sel utilisable pour le phoque, ou nommer le trou. Renvoyer au 62 ne suffit pas : le 62 porte la règle, pas la valeur |
| 10 | **25 et 30** | Trancher la teneur en vitamine C de l'aiguille de sapin baumier. Les deux chapitres se contredisent sur son existence |
| 11 | **43** | Le chapitre qui définit la grille de lecture du tome 3 n'est appelé par aucune des 10 premières fiches d'espèce. Ajouter un appel au 43 dans chaque fiche d'espèce, ou le sortir de la numérotation pour en faire une ouverture de tome |
| 12 | **82** | Quarante chapitres l'appellent, il en rend neuf. Ajouter au moins les trois outils qui l'appellent nommément et qu'il ignore : le couteau à dépouiller du 79, la lame de hachoir du 42, les hameçons du 53 et 54 |
| 13 | **55** | Le pourcentage de sel d'un produit de garde n'existe pas au 71. Le 55 ne doit pas l'y envoyer sans dire que c'est un trou |

### Mineur — mise en pages et confort de lecture

| # | Où | Correction |
| --- | --- | --- |
| 14 | **27 chapitres** | Les colonnes de numéros nus dans les tableaux — `| 36, 37, 38 |` — ne sont pas des renvois lisibles. Titrer la colonne « Chapitres » partout, ou préfixer « ch. ». Touche surtout 34, 35, 37 à 43, 67, 69, 70 |
| 15 | **34 chapitres** | Trente-quatre chapitres n'ont pas de bloc `Renvois` en fin de chapitre, et le gabarit ne l'exige pas. Décision à prendre : soit le bloc entre au gabarit et 34 chapitres en reçoivent un, soit il sort partout. La moitié-moitié actuelle est le pire des deux |
| 16 | **56, 64, 66, 41, 20, 11** | Ces fiches déclarent au total 31 renvois que le chapitre ne fait jamais (69 sur l'ensemble du livre, soit 3 % des renvois déclarés). Le 61 y revient cinq fois : cinq fiches promettent un renvoi vers « Pourquoi la viande pourrit » que le texte ne fait pas |
| 17 | **50, 51, 47, 56, 49, 58** | Six chapitres appelés par deux à cinq chapitres seulement dans le corps. Le seuil qu'ils portent circule sans eux — les 82 °C du gibier à plumes entier sont répétés dans 20 chapitres, et le 50, qui en est le chapitre d'origine, n'est appelé que par le 5 et le 45. Ce sont des chapitres que le plan isole, pas des chapitres inutiles : à replacer, ou à faire appeler par le 34 et le 42 qui les listent déjà en numéros nus |

---

## 7. Ce que je ne peux pas trancher à la place de JP

1. **Le chapitre 43.** Ouverture de tome ou chapitre numéroté. C'est une décision de plan, pas
   d'édition, et elle change la numérotation de 46 chapitres si elle bascule.
2. **Le bloc `Renvois` en fin de chapitre.** Il n'est pas au gabarit et il existe dans 55 chapitres
   sur 89. Le mettre au gabarit ajoute du travail sur 34 chapitres ; le retirer perd un outil de
   navigation que le livre s'est donné tout seul. Dans les deux cas, 440 pages par tome est une
   contrainte réelle et 55 blocs de renvois pèsent.
3. **La liste à relecture humaine obligatoire.** J'ai proposé d'y ajouter 67, 68, 69 et 13 parce
   qu'ils sont des socles. C'est quatre relecteurs de plus à trouver.
4. **La fonte.** Ajouter le préchauffage de la fonte au 88, c'est ouvrir un sujet ; le retirer du
   84, c'est enlever au lecteur une réparation qu'il fera de toute façon. Le 84 est déjà signalé
   en dépassement d'ampleur dans sa propre fiche.
5. **Les barèmes de conserve.** Le 73 a raison de ne rien publier faute de source canadienne. Mais
   tant que la question ouverte du 73 n'est pas tranchée, six chapitres promettent des barèmes qui
   n'existent pas. La correction éditoriale ci-dessus est un pansement ; la vraie réponse est de
   trouver la table qui fait autorité au Québec.
