# Contrôle d'édition — application des conventions sur les 89 chapitres

- **Rôle :** 5 — Éditeur, passe « conventions » seulement
- **Date :** 2026-09-21
- **Portée :** les sept conventions du tableau de `gabarit-chapitre.md` et les règles 3 et 4 de `CLAUDE.md`
- **Aucun chapitre n'a été réécrit.** Ce document signale, il ne corrige pas.

## Méthode

478 642 mots, lecture intégrale impossible. Chaque convention a été transformée en une
expression régulière passée sur les 89 fichiers, puis les occurrences ont été lues en contexte.
Les conversions chiffrées (métrique ↔ impérial, °C ↔ °F, kPa ↔ lb/po²) ont été recalculées une
à une, pas relues. Les fiches `suivi/NN-redaction.md` ont servi à distinguer ce que le rédacteur
avait déjà signalé de ce qu'il n'avait pas vu.

**Non refait, déjà contrôlé ailleurs :** les trois rappels de sécurité répétés, les 74 °C, le
botulisme de type E à 3 °C, la règle du cadmium.

**Le résultat en une ligne :** cinq conventions sur six tiennent, dont la plus risquée
juridiquement, qui tient parfaitement. La sixième — les noms latins — est cassée dans 64
chapitres sur 89.

---

## 1. Métrique partout

> *Unités — Métrique. Impérial entre parenthèses seulement pour les dimensions de construction,
> parce que le bois se vend en pieds.* (`gabarit-chapitre.md`)

**102 occurrences impériales** dans **31 chapitres** : 73 en pieds/pouces, 17 en livres/onces/
gallons, 12 en °F.

La majorité est défendable : ce sont des citations de Santé Canada, du CCHST ou de la CNESST
où le métrique vient d'abord et l'impérial suit entre parenthèses — les 6 m (20 pi) de la
génératrice, les 3 m (10 pi) du bidon d'essence. Ce n'est pas la lettre de la convention, mais
c'est de la citation fidèle. **Le problème n'est pas là. Il est dans les 24 occurrences où
l'impérial passe devant, ou est seul.**

### 1.1 Impérial seul, sans équivalent métrique — faute franche

| Ch. | Ligne | Ce qui est écrit | Ce qui devrait l'être |
| --- | --- | --- | --- |
| **52** | 112 | « vitesse initiale d'au moins **1 800 pi/s**, énergie initiale d'au moins **1 100 pi-lb** » | **549 m/s (1 800 pi/s)** et **1 491 J (1 100 pi-lb)** |
| **52** | 309 | « **≥ 1 800 pi/s** et **≥ 1 100 pi-lb** » (point de contrôle) | idem |
| **81** | 529 | « **Un clou de 3 po** martelé et limé en losange » | « Un clou de **75 mm (3 po)** » |

Le cas du 52 est le plus exposé : ces deux valeurs sont dans une ligne marquée
**« Non négociable »** du tableau Matériel, et elles sont la condition de conformité à
l'article 28 du règlement fédéral. Un lecteur qui n'a qu'une fiche de munitions en joules ne
peut pas vérifier son arme. La fiche `suivi/52-redaction.md` liste bien ces deux chiffres
parmi les valeurs sourcées, mais **ne les signale pas comme un écart de convention** — le
rédacteur ne l'a pas vu.

Le clou du 81 n'a pas d'excuse : un clou n'est pas une dimension de construction, et 75 mm
se dit aussi bien.

### 1.2 Impérial en premier, métrique en second — ordre inversé

| Ch. | Ligne | Ce qui est écrit | Ce qui devrait l'être |
| --- | --- | --- | --- |
| **87** | 74-77 | « rupture en flexion jusqu'à **8 500 lb/po²**, écrasement parallèle **5 000 lb/po²**, perpendiculaire **450 lb/po²**, cisaillement **1 000 lb/po²** […] En unités du livre : **58,6 · 34,5 · 3,1 · 6,9 MPa** » | Les quatre valeurs en MPa d'abord, chacune avec son impérial entre parenthèses |
| **85** | 212 | « la RBQ plafonne à **5 lb** (environ 2,3 kg) » | « **2,3 kg (5 lb)** » |
| **85** | 387 | « la RBQ plafonne à **5 livres** (environ 2,3 kg) » | idem |
| **76** | 125 | « des mouvements de plus de **4 po (100 mm)** » | « **100 mm (4 po)** » |
| **76** | 126 | « des pressions de **19 tonnes/pi² (1 820 kPa)** » | « **1 820 kPa (19 tonnes/pi²)** » |
| **76** | 127 | « **7 500 degrés-jours F (4 150 degrés-jours C)** » | « **4 150 degrés-jours °C (7 500 degrés-jours °F)** » |
| **15** | 134 | « Une corde est de **4 × 4 × 8 pi**, soit **128 pi³ ou 3,6 m³** » | « Une corde est de **3,6 m³ (4 × 4 × 8 pi, 128 pi³)** » |

Le cas du **87** est le plus gênant à lire. Les quatre valeurs impériales sont nommées une à
une, dans une phrase, et les quatre valeurs métriques arrivent ensuite en bloc séparées par des
points médians. Le lecteur doit apparier quatre nombres à quatre notions par leur position.
Le chapitre sait pourtant écrire correctement : à la ligne 360, l'encadré danger donne
« **1 000 lb/po², soit 6,9 MPa** ». Deux manières de faire dans le même chapitre.

Le **15** contredit le **8** sur le même fait. Chapitre 8, ligne 209 : « Une corde = **3,6 m³**
empilés (4 × 4 × 8 pi, 128 pi³) » — c'est la bonne forme. Chapitre 15, ligne 134 : l'inverse.
**C'est le 15 qui s'aligne sur le 8, pas le contraire.**

Le **76** enchaîne trois inversions dans un seul paragraphe de citation (lignes 125-127), plus
un « degrés-jours C » sans symbole.

### 1.3 Impérial hors construction, en parenthèses — à trancher

| Ch. | Ligne | Ce qui est écrit | Remarque |
| --- | --- | --- | --- |
| **29** | 366 | « **360 ml (12 oz)** de jus d'orange […] ; **600 ml (20 oz)** d'eau bouillie refroidie » | **Voir 1.5 — le cas le plus grave du chapitre 1** |
| **73** | 106, 237, 294 | « **70 kPa (10 lb)** » | Le manomètre de l'autoclave est gradué en lb/po². Même situation qu'au ch. 84, mais **sans la note d'exception** |
| **35** | 95, 445, 574 | « dossard de **2 580 cm² (400 po²)** » | Citation réglementaire. Ce n'est pas une dimension de construction |
| **13** | 94 | « 1 baril de **200 L (45 gal)** » | Un contenant n'est pas une dimension de construction. Et 45 gal impériaux = **204,6 L**, pas 200 |
| **60** | 228 | « **6 cordes de 4 pieds x 8 pieds x 4 pieds** » (Québec.ca) | Métrique donné d'abord (22,5 m³), donc conforme. Mais **« x » au lieu de « × »**, et l'arithmétique ne suit pas : 6 × 128 pi³ = **21,7 m³**, pas 22,5 |
| **82** | 260-273 | « 10 cm (4 po) », « 3 mm (1/8 po) », « 6 mm (1/4 po) » | Réglages d'une meuleuse. Métrique d'abord, conversions exactes. Tolérable |

**Le chapitre 84 est le modèle à copier.** Lignes 250-254 : il donne « 103 kPa (15 lb/po²) »,
puis écrit en clair *« La valeur impériale est donnée ici, contre la règle générale du livre,
parce que le manomètre du détendeur est gradué en lb/po² et que c'est ce cadran-là que le
lecteur doit lire. »* C'est exactement ce qu'il faut : une exception nommée, motivée par
l'instrument. **Les chapitres 73 et 52 sont dans le même cas de figure et ne le disent pas.**

### 1.4 Conversions fausses

Les 24 paires métrique/impérial du livre ont été recalculées. **Toutes sont justes à moins de
2 % près, sauf une.**

| Ch. | Ligne | Ce qui est écrit | Le calcul | Pourquoi ça compte |
| --- | --- | --- | --- | --- |
| **83** | 171 | « deux chemins de repli […] sur **au moins 2 m (6 pi)** dégagés » (CNESST) | 2 m = **6,56 pi**. 6 pi = **1,83 m** | L'arrondi va **du mauvais côté** : le lecteur qui travaille au pied dégage 1,83 m et se retrouve **sous le minimum de la CNESST**. Écrire **2 m (7 pi)** |
| **83** | 336 | « **≥ 2 m (6 pi)** dégagés » (point de contrôle) | idem | idem |

Toutes les autres distances de sécurité arrondissent dans le sens sûr : 6 m → 20 pi vaut
6,096 m ; 3 m → 10 pi vaut 3,048 m ; 7,5 m → 25 pi vaut 7,62 m ; 1,5 m → 5 pi vaut 1,524 m.
Le 2 m → 6 pi est la seule exception, et c'est la seule qui retire de la marge.

Les 12 conversions de température sont exactes (74/165, 116/240, 12,8/55, 48,9/120, 51,7/125,
4/40, 18-35/65-95). Les 5 conversions de pression aussi (70 kPa/10 lb à 1,5 % ; 103 kPa/15 lb
à 0,4 %). Les quatre résistances du bois du ch. 87 sont exactes (8 500 lb/po² = 58,6 MPa,
5 000 = 34,5, 450 = 3,1, 1 000 = 6,9).

### 1.5 Le cas du chapitre 29 — onces dans une solution de réhydratation

Ligne 366 : **« 360 ml (12 oz) de jus d'orange prêt à boire, non sucré ; 600 ml (20 oz) d'eau
bouillie refroidie ; 2,5 ml (½ c. à thé) de sel »**, suivi de la citation de la source :
*« utiliser les quantités exactes indiquées afin de ne pas risquer d'aggraver votre état ».*

Les deux valeurs impériales ne sont pas équivalentes aux valeurs métriques selon le système
employé :

| Écrit | En onces liquides américaines | En onces liquides impériales |
| --- | --- | --- |
| 360 ml (12 oz) | 12,2 oz — concorde | **12,7 oz** — un verre de 12 oz donne **341 ml** |
| 600 ml (20 oz) | 20,3 oz — concorde | **21,1 oz** — un verre de 20 oz donne **568 ml** |

Un lecteur qui mesure au verre gradué impérial — ce qui est le cas de beaucoup de tasses à
mesurer vendues ici — obtient **909 ml de solution au lieu de 960**, avec la même demi-cuillère
de sel : **une concentration saline supérieure d'environ 10 %**, dans la seule préparation du
livre dont la source dit que la quantité exacte compte, et pour un enfant déshydraté.

**Les onces n'ont rien à faire là. Elles se retirent, point.** La convention le disait déjà :
l'impérial est toléré pour le bois, pas pour une posologie.

---

## 2. Pourcentages de sel

> *Sel — Pourcentage du poids de la viande, toujours.* (`gabarit-chapitre.md`, et règle 4 de
> `CLAUDE.md`)

**La convention est appliquée, et elle est appliquée avec soin.** Le chapitre 62 l'énonce deux
fois (l. 231, l. 321). Le 63 la porte dans son tableau Matériel et dans son point de contrôle
de l'étape 5. Le 64 la rappelle avant d'introduire sa formule d'équilibre, ce qui est le
moment où elle risquait le plus de se perdre.

**Deux chapitres font mieux que l'appliquer : ils protègent le lecteur contre la confusion de
base.**

- **Ch. 06, l. 269-272 :** *« Le pourcentage d'une saumure de trempage se calcule sur le volume
  de saumure, **pas** sur le poids de la viande comme partout ailleurs dans ce livre : c'est la
  seule exception, signalée ici parce que se tromper de base donne un bain dix fois trop
  salé. »*
- **Ch. 51, l. 385-388 :** *« Attention à ne pas confondre deux choses différentes : les
  pourcentages de sel du livre — 2,5 %, 3 % — se calculent toujours sur le poids de la viande
  et ne s'appliquent pas ici. Le salage d'une peau n'est pas un pourcentage, c'est une couche
  qui couvre. »*

C'est le bon réflexe, et il devrait être le modèle du chapitre 77.

### Les manquements

| Ch. | Ligne | Ce qui est écrit | Ce qui devrait l'être |
| --- | --- | --- | --- |
| **77** | 221 | Betterave, radis — colonne Saumure : « **5 %** » | La base n'est donnée qu'à la ligne 220 (« 5 % — 50 g de sel par litre »). Répéter la base dans chaque cellule, ou titrer la colonne « Saumure (g de sel par litre d'eau) » |
| **77** | 223 | Concombre — « **3 % à 15 % selon le type** » | idem |
| **77** | 224 | Ail — « **8 %** » | idem |
| **77** | 404 | Encadré **DANGER** : « **L'ail se fermente en saumure à 8 %**, jamais dans l'huile » | **Le plus grave des quatre.** Un pourcentage sans base, seul, dans l'encadré danger d'un chapitre sur le botulisme. Écrire « saumure à 8 % — **80 g de sel par litre d'eau** » |
| **62** | 94 | « Ce qui meurt à **3 % de sel**, ce sont les bactéries d'altération » | Base implicite (milieu aqueux). Dans le chapitre qui *fonde* la règle, une précision d'une ligne éviterait la lecture « 3 % du poids de la viande » |

L'encadré du 77 est le seul endroit du livre où un pourcentage de sel sans base se trouve dans
une consigne de sécurité. Le chapitre sait écrire « 2,25 % **du poids du légume** » sept fois
dans ses autres sections. Il faut la même rigueur ligne 404.

### Le trou de fond, déjà signalé par les chapitres eux-mêmes

Quatre chapitres déclarent en section 10 que la base de calcul du **9 % de sel** de Santé Canada
(art. B.21.025, méthode FO-38) et du **2,5 % de sel** de l'ACIA n'est pas connue — phase aqueuse,
produit fini ou viande crue ? Ch. 61 (point 3), ch. 66 (point 5), ch. 72 (point du §10), ch. 77
(point 14). **Les quatre posent la même question et aucun ne la résout.** C'est cohérent et
honnête, mais ça reste une question ouverte qui traverse six chapitres et qui ne se tranchera
pas chapitre par chapitre. Elle appartient au rôle 3, une fois, pour tout le tome 4.

### Une anomalie que le livre a attrapée seul, et bien

Ch. 63, l. 444 : la page de l'ACIA captée le 2026-09-20 donne *« 4,5 kg de sel pour 100 g de
viande »* — un rapport de **4 500 %**. Le chapitre l'a détecté, l'a déclaré impossible, l'a
consigné dans la fiche source et **ne l'a pas utilisé**. C'est exactement la conduite attendue.
Rien à corriger ; à citer en exemple dans `roles.md`.

---

## 3. Salpêtre

> *Salpêtre — Jamais donné en quantité. Toujours accompagné de sa forme moderne équivalente,
> parce que les deux ne se dosent pas pareil.* (`gabarit-chapitre.md`)

**C'est la convention la mieux tenue du livre.** Le salpêtre est nommé dans **29 chapitres**.
Dans les 29, la phrase « ce livre ne donne aucune quantité de salpêtre » ou son équivalent est
présente, **et** la forme moderne est nommée dans la même phrase ou la suivante. Aucune recette
ne le dose. Les chapitres d'espèces (45, 46, 48, 50, 51, 52, 55) renvoient au 62 sans rien
avancer, ce qui est la bonne conduite.

### Deux endroits où une quantité de nitrate côtoie la phrase « aucune quantité »

| Ch. | Ligne | Ce qui est écrit | Gravité |
| --- | --- | --- | --- |
| **12** | 68 | Cellule **Salpêtre** : « **Aucune quantité n'est donnée dans ce livre.** […] Limites d'incorporation séparées : nitrate en saumurage lent 200 ppm ; salaison à sec sur claies **62 g de sel de nitrite et 186 g de sel de nitrate par 100 kg** (ACIA) » | **Mineur, mais à surveiller** |
| **67** | 275 | « Santé Canada plafonne les deux à **200 ppm** […] **Sur 1 kg de viande, 200 ppm font 0,2 g** — sous la graduation de la balance du chalet. **Aucune quantité n'est donnée ici** » | **Mineur** |

Les mêmes chiffres (62 g / 186 g par 100 kg) apparaissent aussi aux ch. **62** (l. 280-282),
**63** (l. 341) et **65** (l. 165-167), mais là ils sont encadrés : le texte dit explicitement
que ce sont des **limites d'incorporation réglementaires**, « pas des dosages de sac » (ch. 65,
l. 170), et il s'en sert pour *démontrer* que les deux produits ne se dosent pas pareil —
« deux produits qui se doseraient pareil n'auraient pas deux limites ». C'est de la
démonstration, pas de la posologie, et c'est bien fait.

Le **ch. 12** n'a pas cet encadrement. C'est une cellule de tableau de référence, dans un
chapitre qui s'appelle « Ce qui manque toujours », entre deux lignes qui donnent des quantités
à acheter. Un lecteur pressé peut lire « 186 g par 100 kg » comme une dose. **Ajouter la demi-
phrase du ch. 65 : « limites d'incorporation réglementaires, pas des dosages de sac ».**

Le **ch. 67** calcule 0,2 g pour le lecteur juste avant d'écrire qu'il ne donne aucune quantité.
L'intention est bonne — montrer que c'est sous la résolution de la balance — mais la phrase
suivante se contredit. Reformuler : « aucune quantité **de salpêtre** n'est donnée ici ».

---

## 4. Noms latins

> *Espèces — Nom français d'usage, avec le nom latin au moins une fois par chapitre.*
> (`gabarit-chapitre.md`)

**C'est la convention cassée. 170 couples espèce-sans-nom-latin, dans 64 chapitres sur 89.**

Méthode : 24 espèces parmi les plus citées du livre, appariées à leur nom latin tel que le
livre l'écrit ailleurs ; pour chaque chapitre, l'espèce est-elle nommée en français sans que
son latin apparaisse **quelque part dans le même fichier** ? Les faux positifs évidents ont été
écartés (« mal de caribou » n'est pas le caribou ; « loup-marin » n'est pas le loup ; « moteur
à quatre temps » n'est pas la clintonie).

**Le point rassurant d'abord :** aucun chapitre ne manque le nom latin de **sa propre espèce
sujet**. Le 44 porte *Lepus americanus*, le 46 *Castor canadensis*, le 48 *Ursus americanus*,
le 52 ses quatre phoques, le 53 *Salvelinus fontinalis*. La faute est toujours sur les espèces
**secondaires** — celles qu'on cite en passant, en comparaison, ou dans un renvoi.

**25 chapitres sont irréprochables :** 02, 05, 09, 13, 15, 16, 18, 19, 20, 22, 26, 29, 38, 39,
55, 64, 65, 74, 79, 82, 83, 84, 85, 87, 88.

### Par espèce

| Espèce | Nom latin du livre | Chapitres où elle est nommée sans son latin |
| --- | --- | --- |
| Phoque (4 espèces) | *Pagophilus groenlandicus*, *Phoca vitulina*, *Halichoerus grypus*, *Pusa hispida* | **23** |
| Lièvre d'Amérique | *Lepus americanus* | **19** |
| Orignal | *Alces americanus* | **18** |
| Castor | *Castor canadensis* | **16** |
| Cèdre / thuya occidental | *Thuja occidentalis* | **12** |
| Bouleau à papier | *Betula papyrifera* | **12** |
| Ours noir | *Ursus americanus* | **10** |
| Gélinotte huppée | *Bonasa umbellus* | **8** |
| Caribou (l'animal, hors « mal de caribou ») | *Rangifer tarandus* | **7** |
| Rat musqué | *Ondatra zibethicus* | **7** |
| Sapin baumier | *Abies balsamea* | **6** |
| Éperlan arc-en-ciel | *Osmerus mordax* | **5** |
| Martre, loup, aulne, peuplier faux-tremble | *Martes americana*, *Canis lupus*, *Alnus incana*, *Populus tremuloides* | **4** chacun |
| Bernache du Canada, tétras du Canada | *Branta canadensis*, *Falcipennis canadensis* | **3** chacun |
| Grand brochet | *Esox lucius* | **2** |
| Cerf de Virginie, porc-épic, écureuil roux | *Odocoileus virginianus*, *Erethizon dorsatum*, *Tamiasciurus hudsonicus* | **1** chacun |

### Les chapitres les plus touchés

| Ch. | Nb | Espèces nommées sans leur latin |
| --- | --- | --- |
| **45** | 8 | bernache, bouleau, caribou, castor, lièvre, martre, orignal, peuplier |
| **46** | 8 | bouleau, lièvre, loup, orignal, ours noir, phoque, rat musqué, peuplier |
| **72** | 8 | aulne, bouleau, brochet, castor, **cèdre**, orignal, ours noir, phoque |
| **44** | 6 | aulne, bouleau, gélinotte, orignal, phoque, porc-épic |
| **47** | 6 | bouleau, castor, gélinotte, lièvre, orignal, rat musqué |
| **11, 37, 49, 50, 52, 53, 57** | 5 chacun | voir le détail ci-dessus |

### Le sous-ensemble bloquant : le cèdre

Douze chapitres répètent la règle de sécurité **« thuyone du cèdre toxique — sapin baumier ou
épinette pour la vitamine C »** en nommant le cèdre **sans donner *Thuja occidentalis*** :
ch. **08, 11, 35, 63, 71, 72, 73, 75, 76, 78, 86**, et ch. **31** (encadré danger, l. 403-406,
où le texte dit pourtant « le thuya occidental — le "cèdre" d'ici » sans aller jusqu'au latin).

C'est la seule famille de manquements qui touche une consigne de sécurité. « Cèdre » désigne au
Québec le thuya occidental, mais aussi, dans l'usage et dans le commerce du bois, le cèdre
rouge de l'Ouest (*Thuja plicata*) et le genévrier. **Une règle de toxicité qui repose sur
l'identification d'une plante doit nommer la plante.** Le ch. 33 le fait correctement,
l. 264 : « Jamais au cèdre — le thuya occidental (*Thuja occidentalis*) ». Les douze autres
doivent s'aligner.

### Deux noms latins pour l'orignal, jamais tranchés

Le livre emploie **deux** noms latins pour son espèce phare :

- ***Alces americanus*** — 63 occurrences, l'usage dominant
- ***Alces alces*** — 10 occurrences

Six chapitres déclarent la synonymie et la signalent `[À VÉRIFIER]` : ch. **37** (l. 23 et 452),
**38** (l. 425), **39** (l. 438, « à trancher une fois pour tout le livre »), **41** (l. 63),
**43** (l. 259), **86** (l. 18). C'est propre.

**Trois chapitres emploient *Alces alces* tout seul, sans mention de l'autre forme et sans
marque `[À VÉRIFIER]` :**

| Ch. | Ligne | Ce qui est écrit |
| --- | --- | --- |
| **11** | 236 | « Une année de viande d'orignal (Alces alces) » — **et hors italique** |
| **26** | 216, 403 | « viande maigre d'orignal (*Alces alces*) », « Le foie d'orignal (*Alces alces*) » |
| **61** | 12 | « une carcasse d'orignal (*Alces alces*) » |

Un lecteur qui ouvre le 26 puis le 44 voit deux espèces. **À trancher une fois, au rôle 3, et à
propager aux 55 chapitres qui portent un nom latin d'orignal.** Le ch. 39 le demande déjà
explicitement.

Note voisine, correctement traitée : le genre du tétras du Canada (*Falcipennis* ou
*Canachites*) est déclaré incertain au ch. 45 (l. 20 et 446) et au ch. 43 (l. 260). Rien à
faire, c'est signalé.

### Italique

La convention n'est écrite nulle part mais le livre l'applique à 99 % : nom latin en italique,
parenthèses en romain — `(*Alces americanus*)`. Trois écarts :

| Ch. | Ligne | Ce qui est écrit | Forme du livre |
| --- | --- | --- | --- |
| **01** | 24, 73, 154 | `*(Alces americanus)*`, `*(Lepus americanus)*`, `*(Ursus americanus)*` — parenthèses en italique | `(*Alces americanus*)` |
| **11** | 236-237 | `(Alces alces)`, `(Salvelinus fontinalis)` — **aucune italique** | idem |

---

## 5. Saisons et quotas

> *Saisons et quotas — Jamais de dates ni de limites de prises. Renvoi à la réglementation de
> l'année.* (`gabarit-chapitre.md`)

**Zéro manquement. C'est la convention la mieux exécutée du livre, et c'était la plus risquée.**

Aucune date d'ouverture, aucune limite de prises, aucune limite de possession, aucune longueur
légale, aucun nombre de lignes, aucune zone n'apparaît dans les 89 chapitres. Ce qui a été
cherché : dates d'ouverture, plages de mois, nombres de prises, longueurs minimales, quotas,
contingents, limites quotidiennes.

Mieux : **vingt-trois chapitres déclarent l'abstention en clair**, en section 10 ou dans le
corps — ch. 19, 21, 34, 35, 36, 39, 41, 43, 44, 45, 47, 48, 49, 51, 53, 54, 56, 61, 65, 70, 72,
80, 88. Le ch. 43 va plus loin et en fait un signe d'alerte éditorial, l. 287 : *« Une date de
saison ou une limite de prises imprimée dans une fiche → erreur grave d'édition → la page
entière est suspecte. »* C'est une bonne défense à conserver.

Le ch. 52 imprime le **droit de permis de 5 $** dans sa fiche source mais **pas dans le
chapitre**, avec la justification qu'un montant réglementaire vieillit mal. Même logique, bien
appliquée.

### Un point à ne pas confondre avec un quota

Quatre chapitres impriment des nombres qui *ressemblent* à des limites de prises et n'en sont
pas : **2 repas par mois** (touladi, achigan, brochet, doré, maskinongé), **4 repas par mois**
(barbotte, crapet, lotte, meunier, perchaude), **1 repas = 230 g avant cuisson**. Ch. **53**
(l. 127, 136, 247), **70** (l. 223-225), **71** (l. 49, 301, 365), **72** (l. 67-73, 166-168, 296).

Ce sont des **recommandations de consommation liées au mercure**, publiées par Québec.ca secteur
Santé — pas des limites de pêche. Les quatre chapitres emploient l'expression **« limite de
table »** pour les distinguer, et le ch. 72 place la mention « Les dates et les quotas ne sont
pas dans ce livre » (l. 78) à quelques lignes du tableau. La distinction est claire, les
chiffres sont cohérents entre les quatre chapitres, et la source est nommée à chaque fois.
**Rien à corriger.** Signalé ici pour qu'un relecteur pressé ne le prenne pas pour un
manquement.

---

## 6. Températures en °C

> *Températures — °C toujours.* (`gabarit-chapitre.md`, et règle 3 de `CLAUDE.md`)

**Convention tenue.** Aucune température n'est donnée en °F seul. Les 12 occurrences de °F sont
toutes entre parenthèses, après la valeur en °C, et toutes dans des citations de sources
anglophones ou bilingues (ACIA, Santé Canada, ECCC, CCHST). Toutes les conversions sont exactes.

Six écarts, tous typographiques ou mineurs :

| Ch. | Ligne | Ce qui est écrit | Ce qui devrait l'être |
| --- | --- | --- | --- |
| **76** | 61 | « incompatibles de **10 à 13 degrés** et de 30 points d'humidité » | « de **10 à 13 °C** » |
| **76** | 127 | « 4 150 degrés-**jours C** » | « degrés-jours **°C** » |
| **45** | 336-337 | « approximately **74°C** (**165° F**) » | Espace insécable avant °C ; « 165 °F » |
| **66** | 237 | « atteint au moins **71°C** » | « 71 °C » |
| **66** | 321 | « température d'entreposage gardée en deçà de **3°C** » | « 3 °C » |
| **78** | 234 | « internal temperature of at least **74°C (165°F)** » | « 74 °C (165 °F) » |
| **79** | 198 | « au moins 42 jours à une température d'au moins **20°C** » | « 20 °C » |

Les cinq derniers sont à l'intérieur de guillemets de citation : c'est une transcription
littérale de la source, ce qui est défendable. **À trancher au rôle 6 (mise en pages) :
normaliser l'espacement même dans les citations, ou le laisser.** La seule vraie faute est le
ch. 76, l. 61, où « degrés » n'a pas d'unité du tout.

Les 45°, 25 à 30°, 15 à 20° du ch. 82 et du ch. 83 sont des **angles**, pas des températures.
Les 66 °Brix du ch. 60 sont une échelle de concentration. Corrects.

---

## Tableau de synthèse

| Convention | Manquements | Chapitres touchés | Gravité |
| --- | --- | --- | --- |
| **4 — Noms latins : le cèdre dans une règle de sécurité** | **12** | 08, 11, 31, 35, 63, 71, 72, 73, 75, 76, 78, 86 | **Bloquant** |
| **1 — Métrique : onces dans la solution de réhydratation** | **2** | 29 (l. 366) | **Bloquant** |
| **4 — Noms latins : ensemble du corpus** | **170** couples espèce-sans-latin | **64 / 89** | **Important** |
| **1 — Métrique : impérial seul, sans équivalent** | **3** | 52 (l. 112, 309), 81 (l. 529) | **Important** |
| **1 — Métrique : impérial en premier** | **7** | 15, 76 (×3), 85 (×2), 87 | **Important** |
| **1 — Conversion qui arrondit du mauvais côté** | **2** | 83 (l. 171, 336) | **Important** |
| **2 — Sel : pourcentage sans base dans un encadré danger** | **1** | 77 (l. 404) | **Important** |
| **1 — Impérial hors construction, en parenthèses, exception non déclarée** | **9** | 13, 35 (×3), 60, 73 (×3) | **Mineur** |
| **2 — Sel : base implicite** | **4** | 77 (l. 221, 223, 224), 62 (l. 94) | **Mineur** |
| **4 — *Alces alces* / *Alces americanus* non déclaré** | **4** | 11, 26 (×2), 61 | **Mineur** |
| **4 — Italique du nom latin** | **5** | 01 (×3), 11 (×2) | **Mineur** |
| **3 — Salpêtre : quantité de nitrate non encadrée** | **2** | 12 (l. 68), 67 (l. 275) | **Mineur** |
| **6 — Températures : espacement et unité** | **7** | 45, 66 (×2), 76 (×2), 78, 79 | **Mineur** |
| **5 — Saisons et quotas** | **0** | — | **Conforme** |
| **3 — Salpêtre : règle de fond** | **0** sur 29 chapitres | — | **Conforme** |
| **1 — Conversions chiffrées** | **1** sur 24 paires vérifiées | 83 | **Conforme pour le reste** |

**Total : 216 manquements distincts.** Les 12 chapitres du cèdre sont une sous-famille des 170
noms latins, isolée parce qu'elle touche une consigne de sécurité : ils ne s'additionnent pas.

Deux lectures de ce total :

- **Les noms latins à eux seuls font 170 des 216.** C'est un travail de lot, long mais sans
  arbitrage : le livre possède déjà tous les noms qu'il lui manque.
- **Le reste — 46 manquements — se concentre sur 14 chapitres :** 13, 15, 29, 35, 52, 60, 62,
  73, 76, 77, 81, 83, 85, 87. Ce sont ceux à rouvrir un par un.

**Deux corrections ne peuvent pas attendre la passe d'édition générale :** les onces du ch. 29
(l. 366) et les 6 pi du ch. 83 (l. 171 et 336). Les deux font qu'un lecteur qui applique le
livre correctement se retrouve hors de la cible d'une source officielle.

---

## Ce qui se corrige en lot, et ce qui demande une décision

**En lot, mécaniquement, sans arbitrage** (rôle 5 ou 6) :

1. Les 170 noms latins manquants. Le livre contient déjà tous les noms latins voulus ; il s'agit
   de les ajouter à la première mention de chaque espèce dans chaque chapitre. Le tableau par
   espèce ci-dessus donne le nom à employer.
2. Les sept inversions métrique/impérial (1.2).
3. Les sept écarts d'espacement de °C.
4. Les cinq écarts d'italique.
5. Le « x » du ch. 60 l. 228, en « × ».

**À décider, parce que je ne peux pas le faire :**

1. ***Alces alces* ou *Alces americanus*** pour tout le livre. Six chapitres le demandent déjà.
   Ça touche 55 chapitres et c'est une question de nomenclature, pas d'édition.
2. **Les citations impériales de Santé Canada et de la CNESST** — « au moins 6 mètres (20 pieds) »
   revient dans neuf chapitres. Soit on cite la source telle quelle et on déclare l'exception une
   fois dans les conventions, soit on coupe l'impérial des citations. Les deux se défendent ;
   il faut choisir une fois.
3. **La base du 9 % et du 2,5 % de sel** (Santé Canada FO-38, ACIA). Quatre chapitres posent la
   question, aucun ne la tranche. Ça relève du rôle 3 et d'une seule recherche pour tout le tome 4.
4. **L'espacement des °C à l'intérieur des citations** : normaliser ou transcrire littéralement.
5. **Le ch. 52 et le ch. 73** : ajouter la note d'exception du ch. 84 (l'instrument est gradué
   en impérial), ou convertir. Pour le 52, une munition se vend en pi/s ; pour le 73, un
   manomètre d'autoclave se lit en lb/po². La note me paraît la bonne réponse, mais c'est un
   choix éditorial.
