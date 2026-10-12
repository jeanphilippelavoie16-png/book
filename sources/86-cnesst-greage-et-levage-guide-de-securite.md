# CNESST — Gréage et levage, guide de sécurité

- **Organisme :** Commission des normes, de l'équité, de la santé et de la sécurité du travail
  (CNESST), Québec. Traduction et adaptation du *Hoisting and Rigging Safety Manual* de la
  Construction Safety Association of Ontario, publiée par la CSST/CNESST (ISBN 2-551-19740-6,
  dépôt 2006)
- **Titre :** « GRÉAGE ET LEVAGE — Guide de sécurité »
- **URL :** https://www.cnesst.gouv.qc.ca/sites/default/files/documents/guide-greage-levage.pdf?cid=1734099914
- **Date de consultation :** 2026-09-20
- **Captation :** de première main, `curl` puis extraction du texte des flux PDF (HTTP 200,
  10,7 Mo). Le PDF dépasse la limite de `WebFetch` ; il a donc été téléchargé et décodé
  localement. Encodage des polices : MacRoman.
- **Sert au chapitre :** 86 — Leviers, poulies, treuils (sections 3, 4, 5, 6, 7, 8, 9)

C'est la source principale du chapitre 86. Presque tous les chiffres du chapitre viennent
d'ici. Le document est un manuel complet de gréage de chantier ; le chapitre n'en retient que
ce qui s'applique à un chalet, mais les extraits sont conservés ici au complet parce qu'un
document PDF déplacé sur un site de ministère transforme une citation en affirmation.

---

## Extraits intégraux, relevés le 2026-09-20

### Facteur de sécurité et charge maximale d'utilisation (CMU)

> « Le facteur de sécurité de tous les câbles textiles est de 5 ; il est de 10 lorsqu'on s'en
> sert pour lever ou soutenir des personnes. »

> « Le facteur de sécurité n'offre pas une capacité de levage additionnelle. La charge maximale
> d'utilisation ne doit jamais être dépassée. »

Formule de la figure 2.3 :

> « CMU = Résistance à la rupture / Facteur de sécurité = Résistance à la rupture / 5 »

> « Par exemple, un câble dont la résistance à la rupture est de 1 500 kg a une charge maximale
> d'utilisation de 300 kg »

Sur les élingues en général :

> « il est fortement recommandé d'appliquer un facteur de sécurité d'au moins 5 aux charges
> maximales d'utilisation. Pour ces mêmes raisons, les élingues doivent faire l'objet d'une
> inspection minutieuse avant chaque usage. »

> « Ne jamais surcharger un câble. Appliquer le facteur de sécurité de 5 (ou de 10 si le câble
> doit servir à supporter ou lever des personnes) en se gardant une certaine marge de sécurité
> pour tenir compte de l'âge et de l'état du câble. »

### Les accessoires font partie de la charge

> « Tous les accessoires de gréage doivent être considérés comme faisant partie du poids de la
> charge. »

> « Les charges nominales de la plupart des appareils de levage ne tiennent généralement pas
> compte du poids des poulies, des crochets, des élingues, des palonniers et des autres
> accessoires. Leur poids combiné doit être soustrait de la capacité de levage de l'équipement
> afin de déterminer la charge de levage maximale admissible. »

### Forces dynamiques

> « Les charges maximales d'utilisation de la plupart des équipements de gréage et de levage
> sont calculées à partir des charges statiques, auxquelles le facteur de sécurité approprié est
> appliqué afin de tenir compte des mouvements dynamiques de la charge et de l'équipement. […]
> Il importe en outre d'éviter tout mouvement brusque dans les manœuvres de levage, de rotation
> et d'immobilisation des charges suspendues, car une accélération ou une décélération rapide ne
> peut qu'augmenter les contraintes qui s'exercent sur l'appareil et le palan. »

### Le froid — les deux passages qui commandent tout l'usage hivernal

Conditions climatiques dangereuses :

> « Lorsque la température est sous le point de congélation, le personnel de supervision doit
> veiller à ce qu'aucun élément de l'appareil de levage ou du palan ne soit soumis à des
> tensions brusques ou ne heurte un obstacle, car cela pourrait occasionner une rupture fragile
> de l'acier. »

Méthodes et précautions à prendre avec les câbles métalliques :

> « Ne jamais utiliser un câble gelé. »

Remisage des câbles textiles :

> « Les câbles gelés doivent être complètement dégelés avant de les utiliser, sinon les fibres
> risquent de casser. Laisser les câbles gelés ou mouillés sécher naturellement. »

> « Remiser les câbles textiles dans une pièce fraîche et sèche dotée d'une bonne circulation
> d'air, à une température entre 10 et 21 °C et une humidité relative de 40 à 60 %. »

### Le vent

> « Lorsque le vent souffle entre 40 et 50 km/h, on doit songer à restreindre les manœuvres de
> levage. »

### Angles d'élingage (figure 9)

> « La capacité nominale d'une élingue est fonction de ses dimensions, de sa configuration et
> des angles formés par ses brins par rapport à l'horizontale. Par exemple, si l'on utilise une
> élingue à deux brins pour lever une charge de 1 000 kg, chaque brin supporte un poids de
> 500 kg à un angle de 90°. La charge imposée à chaque brin augmente à mesure que l'angle
> diminue. À un angle de 30°, la charge exercée sur chaque brin sera de 1 000 kg »

> « On doit donc opter dans la mesure du possible pour un angle supérieur à 45°. Les angles
> inférieurs à 30° posent de graves dangers, surtout lorsque l'on sait qu'une erreur de 5°
> seulement dans l'évaluation de l'angle des élingues peut avoir des conséquences
> catastrophiques. »

Valeurs portées sur la figure 9, charge de 1 000 kg sur élingue à deux brins :

| Angle avec l'horizontale | Tension par brin |
| --- | --- |
| 90° | 500 kg |
| 60° | 577 kg |
| 45° | 707 kg |
| 30° | 1 000 kg |

La figure qualifie le 60° de « Meilleur », le 45° de « Bon », le 30° de « Minimum
recommandé », et porte la mention « ÉVITER » sous les angles plus fermés.

Même barème pour les câbles textiles (figure 2.8), charge de 450 kg : 225 kg par brin à 90°,
260 kg à 60°, 320 kg à 45°, 450 kg à 30°.

### La règle d'angle sans rapporteur

> « S'assurer que l'angle formé par l'élingue et l'horizon est supérieur à 45°. Si la distance
> horizontale entre les points d'attache sur la charge est inférieure à la longueur de l'élingue
> la plus courte, l'angle formé par l'élingue est alors supérieur à 60° et ne présente
> généralement pas de danger. »

### Moufle à chape ouvrante (poulie de renvoi) — le doublement de la charge sur l'ancrage

> « Ce type de moufle est normalement utilisé lorsque l'on doit changer le sens de la traction
> d'un câble. La tension exercée sur le moufle varie énormément selon l'angle entre le brin
> d'entraînement et le brin entraîné. Lorsque les deux brins sont parallèles, une tension de
> 450 kg sur le brin d'entraînement se traduit par une tension de 900 kg sur le moufle, le
> crochet et le dispositif de fixation. La tension diminue en proportion de l'augmentation de
> l'angle entre les brins »

> « Pour déterminer la tension exercée sur le moufle, le crochet et le dispositif de fixation,
> multiplier la tension de traction sur le brin d'entraînement ou le poids de la charge levée
> par le facteur approprié du tableau de la figure 57 et ajouter 10 % pour tenir compte de la
> friction sur la poulie. »

Valeurs portées sur la figure de la page 110 (treuils motorisés), pour une traction de
1 000 kg : **2 000 kg**, **1 840 kg**, **1 410 kg**, **760 kg** sur le moufle selon l'angle.
Les étiquettes d'angle de la figure n'ont pas survécu à l'extraction du texte.

### Force exercée sur la structure d'ancrage (page 111)

> « Tension exercée sur le brin menant = Charge ÷ Nombre de brins sous tension »
> « Tension exercée sur la structure = Charge + Tension exercée sur le brin menant »

Exemple A (facteur de sécurité 5:1, charge 500 kg, 1 brin) :
tension sur le brin menant = 500 ÷ 1 = 500 kg ; tension sur la structure = 500 + 500 = 1 000 kg.

Exemple B (facteur de sécurité 5:1, charge 6 000 kg, 4 brins) :
tension sur le brin menant = 6 000 ÷ 4 = 1 500 kg ; tension sur la structure
= 6 000 + 1 500 = 7 500 kg.

> « Les palans, les treuils ordinaires et Tirfor ainsi que les autres appareils de gréage
> doivent être fixés à de solides points d'ancrage. […] Quelle que soit la méthode employée
> toutefois, le gréeur doit connaître les forces qui s'exercent et le genre d'ancrage qu'elles
> nécessitent. »

> « Quelle que soit la méthode de fixation, il importe de savoir que la structure n'est
> habituellement pas conçue pour supporter les efforts additionnels qui y sont exercés. »

### Diamètre des poulies

> « Lorsqu'on utilise un palan, s'assurer d'utiliser un câble de dimension appropriée aux
> poulies. Celles-ci doivent avoir un diamètre égal à au moins six fois, et de préférence
> 10 fois, celui du câble. »

### Charge maximale d'utilisation des câbles textiles — calcul de terrain (page 27)

Pour les câbles **neufs** en nylon, polypropylène, polyester et polyéthylène, lorsqu'il
n'existe pas de tableau de charges :

> « En cas de doute sur le type de câble ou sur son état, éviter de l'utiliser. Il n'existe
> aucun substitut à la sécurité. »

**Câble de manille :** « Diviser le diamètre du câble par 3. Calculer le carré du quotient
arrondi et multiplier le résultat par 10. »
Exemples donnés : 13 mm / 3 = 4,33 → CMU = 4 × 4 × 10 = 160 kg ; 16 mm / 3 = 5,33 →
CMU = 5 × 5 × 10 = 250 kg ; 25 mm / 3 = 8,33 → CMU = 8 × 8 × 10 = 640 kg.

**Câble de nylon :** même méthode, multiplier par 30. Exemple : 13 mm → 4 × 4 × 30 = 480 kg.

**Câble de polypropylène :** même méthode, multiplier par 20. Exemple : 13 mm →
4 × 4 × 20 = 320 kg.

### Nœuds

> « Éviter dans la mesure du possible de faire des nœuds dans les câbles. Les nœuds, les
> raccords et les amarres réduisent considérablement la résistance des câbles. Cette diminution
> du degré de résistance dépend du type de nœud et de la manière dont il est fait. »

Aucun pourcentage de perte n'est publié dans le guide.

### Serre-câbles (figures 46 et 47)

> « Il est recommandé d'opter pour des serre-câbles en acier allié forgé. Toujours s'assurer
> qu'ils sont correctement installés et que l'étrier fait contact avec le brin mort du câble. »

Figure 46 — INSTALLATION DES SERRE-CÂBLES :

| Diamètre du câble (mm) | Nombre minimum de serre-câbles | Longueur du brin mort à partir de la cosse (cm) | Couple (N·m), boulons non lubrifiés |
| --- | --- | --- | --- |
| 8 | 2 | 14 | 40 |
| 10 | 2 | 16 | 61 |
| 11 | 3 | 18 | 88 |
| 13 | 3 | 29 | 88 |
| 14 | 3 | 30 | 129 |
| 16 | 4 | 30 | 129 |
| 19 | 4 | 45 | 176 |
| 22 | 5 | 48 | 305 |

Figure 47 — la méthode en cinq étapes :

> « Étape 1 — INSTALLER LE PREMIER SERRE-CÂBLE à une longueur de selle de l'extrémité du brin
> mort, l'étrier étant placé sur le brin mort et la selle sous l'autre brin. Serrer les écrous
> uniformément au couple recommandé.
> Étape 2 — INSTALLER LE DEUXIÈME SERRE-CÂBLE le plus près possible de la boucle, l'étrier étant
> placé sur le brin mort. Poser les écrous SANS LES SERRER.
> Étape 3 — INSTALLER LES AUTRES SERRE-CÂBLES à égale distance entre les deux premiers et
> l'équivalent de 6 à 7 diamètres de câble entre chacun.
> Étape 4 — APPLIQUER UNE TENSION sur la boucle et serrer tous les écrous au couple recommandé.
> Étape 5 — VÉRIFIER LE COUPLE de serrage après que le câble a été utilisé. »

### Crochets

> « Tous les crochets, à l'exception des crochets grappins et des crochets pélican, doivent être
> munis d'un linguet de sécurité. »

> « Les crochets doivent être en acier allié forgé et leur CMU doit être estampée sur la selle. »

> « La charge doit être suspendue au centre de la selle. Si la charge est suspendue à la pointe
> du crochet, la charge pratique de sécurité en sera réduite considérablement. »

> « Vérifier si le crochet est usé, rouillé, fissuré ou tordu – particulièrement à la pointe – et
> s'il y a des signes d'ouverture de la gorge »

> « Ne jamais charger la pointe d'un crochet à moins qu'il ne soit conçu à cette fin. »

> « Ne jamais enrouler un câble métallique autour d'un crochet. Le rayon de courbure trop
> restreint risque d'endommager l'élingue. »

### Manilles

> « Pour les manœuvres de levage, on doit choisir des manilles en acier allié forgé. »

> « Il ne faut pas remplacer les manillons par des boulons. Les manillons sont conçus en
> fonction de la capacité de la manille. » / « Ne jamais remplacer un manillon par un boulon. La
> charge fera plier le boulon. »

> « Ne pas utiliser de manille si elle doit être tirée ou chargée autrement qu'à la verticale ;
> cela réduit considérablement sa capacité et elle risque de s'ouvrir »

> « Ne pas utiliser de manilles à manillon vissé si ce dernier risque de se dévisser sous
> l'effet du déplacement de la charge. »

> « Lorsque deux câbles ou plus doivent être suspendus à un crochet, utiliser une manille afin
> de limiter l'usure des boucles et des cosses. »

### Chaînes

> « Les chaînes en acier allié de grade 80 doivent porter le chiffre "8", "80" ou "800" ; ceux
> de grade 100 doivent porter le chiffre "10", "100" ou "1000". Ce type de chaîne est le seul
> autorisé pour le déplacement de charges suspendues. »

> « les élingues de chaîne doivent avoir un facteur de sécurité de 5. Les fabricants de chaînes
> nord-américains leur attribuent normalement une charge maximale d'utilisation […] fondée sur
> un facteur de sécurité de 3,5 ou 4. Il importe donc de toujours vérifier auprès du fabricant
> le facteur de sécurité sur lequel se fonde la charge maximale d'utilisation de ses chaînes. »

> « CMU du catalogue x FS du fabricant / 5 = CMU (fondée sur un facteur de sécurité de 5) »

Exemple donné — chaîne en acier allié de 13 mm, CMU du catalogue 5 900 kg, facteur de sécurité
du fabricant 3,5 : 5 900 × 3,5 / 5 = 4 130 kg, ramenée à 4 200 kg pour la construction.

> « il ne faut jamais faire de nœuds dans une élingue de chaîne pour la raccourcir. Utiliser
> plutôt un crochet à chaîne ou une griffe de raccourcissement, qui sont conçus à cette fin. »

### Palans à chaîne

> « La chaîne de levage des palans à chaîne est cémentée afin de réduire son usure superficielle
> et ne peut être utilisée à aucune autre fin. Elle possède un coefficient d'allongement de 3 %
> avant rupture, comparativement à au moins 15 % pour les chaînes en acier allié de nuance 8.
> Les chaînes de levage étant trop cassantes pour servir à d'autres usages, il importe de les
> détruire en les coupant en petites sections inutilisables lorsqu'elles sont mises hors service.
> Il ne faut jamais tenter de réparer soi-même une chaîne de levage ; une soudure détruira le
> traitement thermique de toute la chaîne. »

> « Les palans à chaîne doivent être gréés de manière que les crochets supérieur et inférieur
> soient alignés selon un axe rectiligne. Ils sont conçus pour être utilisés uniquement à la
> verticale ou le plus près possible de la verticale. Si le palan est incliné, la tige du crochet
> supérieur peut être endommagée et la gorge du crochet peut ouvrir. »

> « Examiner le dispositif de freinage en soulevant la charge à quelques centimètres du sol afin
> de examiner s'il y a glissement de la chaîne. » *(faute de frappe du document reproduite
> telle quelle)*

Consignes de la figure 10 : « Éviter de surcharger le palan. » « Ne pas laisser de charge
suspendue sans surveillance. » « Éviter de se tenir sous la charge. » « Ne pas utiliser la
chaîne de levage comme élingue ou comme collier étrangleur. » « Ne pas suspendre la charge à la
pointe du crochet. » « Éviter de lever une charge en diagonale. » « Une chaîne à main unique ne
doit être tirée que par un seul opérateur à la fois. » « S'assurer que l'ancrage et la structure
sont en mesure de supporter la charge. »

### Palans à levier (treuils à cliquet, « come-along »)

> « Les treuils à cliquet sont des appareils portatifs permettant de lever ou de tirer des
> charges sur de courtes distances. Ils peuvent être utilisés pour effectuer des manœuvres à la
> verticale, à l'horizontale ou en diagonale. Tous les autres points abordés à la section sur
> les palans à chaîne s'appliquent également aux treuils à cliquet. »

> « Un treuil à cliquet qui ne peut être manœuvré sans l'aide d'une rallonge ou d'une deuxième
> personne ne convient pas au travail à effectuer. Utiliser un treuil de plus grande
> capacité. »

Consignes : « Ne pas installer de rallonge au levier. » « Ne pas surcharger le palan. La charge
maximale d'utilisation (CMU) doit être inscrite sur l'appareil. » « S'assurer d'avoir un bon
appui des pieds avant de manœuvrer le palan. » « Garder la chaîne du palan droite. » « Se tenir
à bonne distance de la charge et de la trajectoire de la chaîne de levage. »

### Treuils manuels (Tirfor)

> « Les treuils manuels, que l'on appelle communément par leur nom commercial "Tirfor", sont
> utiles pour tirer ou lever des charges sur de longues distances parce qu'ils sont équipés d'un
> câble d'acier en continu. Comme dans le cas des treuils à cliquet, ils s'utilisent dans
> n'importe quelle position. »

> « Les Tirfor ont une capacité de 3/4 à 3 1/2 tonnes et leur câble peut être passé à travers un
> ensemble de moufles afin de profiter de l'avantage mécanique de ce dernier de ces treuils et
> d'accroître la capacité de l'appareil. »

> « Les câbles pour Tirfor sont spécialement conçus pour les pressions de serrage et les efforts
> de traction qu'ils sont appelés à subir. Faits d'acier galvanisé et non lubrifiés, ils ont une
> tolérance de diamètre très serrée. Aucun autre type de câble ne doit être utilisé avec les
> Tirfor. »

> « Il convient de manipuler le câble d'un Tirfor avec précaution afin d'éviter de le tortiller,
> ce qui entraînerait le blocage du mécanisme »

### Treuils motorisés

> « S'assurer que le câble présente un angle descendant à la sortie du tambour et que son
> extrémité non tendue est solidement ancrée. »

> « Les câbles métalliques utilisés avec les chariots tracteurs doivent avoir une âme
> indépendante afin de résister à l'effort de compression exercé par les couches successives de
> câble sur le tambour. »

> « S'assurer que le câble s'enroule convenablement sur le tambour. Ne jamais enrouler plus que
> la longueur de câble appropriée sur un tambour et ne jamais laisser le câble s'enrouler en
> croisé. »

> « Si le tambour ne reçoit pas plus de deux couches de câble, utiliser n'importe quel type de
> câble. Si le tambour doit recevoir plus de deux couches de câble, il y a risque d'écrasement
> et l'on doit utiliser un câble constitué de fils plus gros ou à âme IWRC. »

### Palans électriques — les deux consignes qui touchent la soudure

> « Ne jamais utiliser la chaîne ou le câble du palan comme élingue. »

> « Ne jamais utiliser la chaîne ou le câble du palan comme conducteur de terre pour des travaux
> de soudage et ne jamais toucher la chaîne ou le câble avec une électrode de soudage sous
> tension. »

> « Exercer une traction en ligne droite afin que ni le corps du palan, ni la chaîne ou le câble
> de levage ne forment un angle autour de quoi que ce soit. »

### Crics et vérins

> « Les crics à crémaillère ont habituellement une capacité maximale d'une vingtaine de tonnes
> environ »

> « Ne jamais se servir d'un tuyau pour rallonger le levier d'un cric à crémaillère. Si une
> rallonge est nécessaire, cela signifie que le cric a dépassé sa capacité. »

> « Le levier du vérin ou de la pompe manuelle est conçu de manière à atteindre sans effort
> physique indu la capacité et la pression nominales de l'appareil. Éviter de rallonger le
> levier avec un tuyau »

> « Le vérin ne doit être utilisé qu'en position verticale absolue, sinon la pression latérale
> qui s'exercerait autrement risque de faire frotter le piston contre le bâti. »

> « Les vérins ne doivent jamais servir à supporter une charge pendant une longue période. On
> utilisera plutôt des cales, qui sont beaucoup plus stables et sécuritaires. Dans la mesure du
> possible, la charge doit être calée graduellement à mesure qu'elle est soulevée, afin de parer
> aux imprévus. »

> « On doit toujours soulever une charge par les extrémités, une extrémité à la fois. Ne jamais
> tenter de la soulever latéralement, un côté à la fois, car cette manœuvre occasionne une plus
> grande instabilité de la charge. »

> « Si l'on doit travailler ou y récupérer un objet sous une charge supportée par des vérins,
> installer d'abord des cales de sûreté sous la charge à titre de précaution. »

> « S'assurer que les pièces de bois utilisées comme cales ou comme piles sont assez longues
> pour répartir la charge sur une surface suffisamment importante et offrir une bonne stabilité.
> La hauteur des piles ne doit pas dépasser la longueur des pièces de bois utilisées. »

> « En raison des dimensions relativement restreintes du socle des vérins, il importe de
> s'assurer que le sol sur lequel ils reposent peut supporter les fortes pressions qui
> s'exercent dans ce genre de manœuvre. »

Inspection : « aux six mois ou plus fréquemment si l'on fait pratiquement toujours appel à leur
capacité maximale ». Points vérifiés : « engagement incorrect ou usure extrême du cliquet et de
la crémaillère ; dents de crémaillère fissurées ou cassées ; piston plongeur fissuré ou
endommagé ; fuite de liquide hydraulique ; piston plongeur rayé ou endommagé ; mauvais
fonctionnement de la tête pivotante ».

### Rouler la charge — galets et coefficients de friction

> « il convient à cet égard de toujours fixer à la charge un deuxième dispositif de retenue, tel
> qu'un treuil ordinaire ou de type Tirfor, afin de parer aux imprévus. Les risques de secousses
> brusques doivent aussi être pris en compte dans le choix du treuil devant servir de dispositif
> de protection. »

> « Vérifier l'état du sol avant d'utiliser des galets. La pression aux points d'appui peut être
> réduite par l'emploi d'un plus grand nombre de galets et de grandes feuilles d'aluminium ou de
> tôle qui serviront de tapis pour répartir la pression. »

Tableau 2 — Exemples de coefficients de friction :

| Couple de matériaux | Coefficient |
| --- | --- |
| Acier sur acier | 40–60 % |
| Cuir sur métal | 60 % |
| Bois sur pierre | 40 % |
| Fer sur pierre | 30–70 % |
| Plaques enduites de graisse | 15 % |
| Charge sur roues ou sur galets | 2–5 % |

### Plan incliné

Le guide donne une méthode simplifiée pour un coefficient de friction de 5 %, avec
F = effort requis, H = hauteur, L = longueur, P = poids de la charge. **La formule imprimée
n'a pas été extraite de façon lisible** (le texte du PDF rend « F = P x H/L x 0,50P »), mais le
tableau 1 de la même page donne quatre points concordants :

| Pente | Méthode simplifiée | Effort réel | Erreur |
| --- | --- | --- | --- |
| (1:4) | F = 0,250 P | F = 0,245 P | 2 % |
| | F = 0,383 P | F = 0,364 P | 5 % |
| | F = 0,550 P | F = 0,492 P | 12 % |
| (1:1) | F = 1,050 P | F = 0,742 P | 42 % |

Les quatre valeurs de la colonne « méthode simplifiée » correspondent exactement à
**F = P × H/L + 0,05 P** pour H/L = 0,20 ; 1/3 ; 0,50 et 1,00. C'est la lecture retenue, et
elle est marquée `[À VÉRIFIER]` dans le chapitre 86 parce qu'elle est reconstruite à partir du
tableau et non lue directement sur la formule imprimée.

> « La formule est plus précise pour les faibles inclinaisons (1:5) que pour celles plus raides
> (1:1). »

### Poids des matériaux (tableau 1.2 — poids volumétrique, kg/m³)

> « Le poids de référence est celui d'une plaque d'acier de un mètre carré et de un centimètre
> d'épaisseur, soit environ 78 kg. »

Exemple du guide : « une charge de bois d'épinette de 4 m de longueur sur 1 m de hauteur et
1,5 m de largeur […] le poids par mètre cube de l'épinette est de 450 kg. Le poids total de la
charge est donc de 2 700 kg (4 x 1 x 1,5 x 450). »

**Bois d'œuvre séché à l'air :** cèdre 352 · épinette 449 · pruche 481 · pin 481 · peuplier 481 ·
sapin Douglas sec 545 · sapin Douglas vert 641 · sapin Douglas humide 801.

**Métaux :** acier 7 850 · fer 7 690 · aluminium 2 643 · cuivre 8 971 · plomb 11 374.

**Glace et neige :** glace 897 · neige poudreuse fraîche 128 · neige poudreuse tassée 190–400 ·
neige mouillée 430–640.

**Terre :** terre humide 1 602 · terre sèche 1 202 · sable et gravier humide 1 922 · sable et
gravier sec 1 682 · pierre concassée 1 440–1 760.

**Liquides :** eau 993 · essence 673 · huile 929 · alcool 785.

**Maçonnerie :** béton de pierre 2 307 · béton de pierre armé 2 403 · pierre de taille
2 240–2 560.

> « Le temps consacré au calcul du poids approximatif des charges à lever […] est du temps bien
> employé qui peut permettre d'éviter de graves accidents causés par une sous-estimation de la
> charge à lever. »

### Règles générales de manœuvre

> « Ne jamais enrouler le câble de levage autour de la charge. Attacher la charge au crochet au
> moyen d'élingues ou d'autres dispositifs de gréage appropriés à la charge à lever. »

> « Avant de lever une charge, s'assurer que le câble de levage soit placé verticalement
> au-dessus du centre de gravité de la charge. »

> « Tenir les mains à l'écart des endroits où elles risquent d'être coincées au moment où les
> élingues sont mises en tension. »

> « Porter des gants pour manipuler les câbles métalliques. »

> « Lorsque les élingues sont enlevées, leur crochet peut se coincer sous la charge et se
> dégager brusquement. »

> « Ne jamais travailler sous une charge suspendue à moins qu'elle ne soit convenablement
> supportée par-dessous et que toutes les conditions ne soient approuvées par le superviseur
> responsable des manœuvres. »

> « Ne jamais effectuer de réparations temporaires sur une élingue. »

> « Les charges doivent être déposées de manière sécuritaire et bien calées avant de les
> décrocher et d'enlever les élingues. »

> « Employer des câbles de halage pour guider toutes les charges. »

> « Ne jamais confectionner d'élingues avec des câbles de levage mis au rebut. »

> « Ne jamais utiliser un câble qui a été coupé ou écrasé ou sur lequel des coques se sont déjà
> formées. »

> « S'assurer que les boucles des câbles non tendus ne risquent pas de former des coques en cas
> de tension. Si une boucle se forme, éviter de tirer sur le câble pour la défaire ; il faut
> plutôt la déplier. La formation de coques dans un câble entraîne des dommages permanents et le
> câble présentera toujours un point faible même si la coque semble avoir été bien défaite. »

> « Vérifier la présence de fouettement ou de vibration anormale du câble. »

> « Tenir les élingues en câble métallique à l'écart des travaux de découpage au chalumeau et de
> soudage électrique. »

> « Ne jamais utiliser de câbles textiles à proximité de travaux de soudage ou de découpage au
> chalumeau. Les étincelles et le métal fondu peuvent couper le câble ou l'enflammer. »

> « Les boucles des câbles doivent toujours être munies de cosses »

### Critères de remplacement d'un câble métallique

> « Le câble doit être remplacé lorsque l'usure dépasse le tiers du diamètre des fils. »
> « Lorsque l'usure des fils de surface atteint le tiers ou plus de leur diamètre, le câble doit
> être remplacé. »

> « Les câbles à six torons allongent d'environ 150 mm par 30 m de longueur et ceux à huit
> torons d'environ 250 mm par 30 m. Si l'allongement d'un câble dépasse ce seuil, on doit alors
> le remplacer. »

> « La corrosion présente un grave danger, car elle peut se développer à l'intérieur du câble et
> passer totalement inaperçue. […] Lorsque des piqûres sont observées à la surface, il faut
> alors songer à remplacer le câble. »

> « Les règlements sur la construction qui découlent de la Loi sur la santé et la sécurité au
> travail établissent les critères nécessitant le retrait d'un câble en fonction du nombre de
> fils cassés. »

Le guide **ne publie pas lui-même** le nombre de fils cassés. Ce chiffre vient de la fiche du
CCHST, enregistrée séparément dans `86-cchst-cable-metallique-de-levage.md`.

---

## Notes de captation

**Ce guide est un document de chantier, pas un document de chalet.** Il parle de grues, de
grutiers, de superviseurs et de signaleurs. Le chapitre 86 en retire tout ce qui suppose une
organisation de chantier et garde ce qui est de la physique et de la métallurgie : le facteur 5,
les angles, la charge sur l'ancrage, le froid, les critères de rejet. Ce tri est un choix de
rédaction et il est signalé comme tel dans le chapitre.

**Le passage sur le froid est le plus important du document pour la Côte-Nord.** Deux phrases,
à deux endroits éloignés du guide : « Ne jamais utiliser un câble gelé » et l'avertissement sur
la rupture fragile de l'acier sous le point de congélation. Prises ensemble, elles condamnent le
geste le plus naturel de l'hiver : sortir le treuil du cabanon à −30 °C et donner un coup sec
dessus. Le chapitre 86 en fait une consigne à part entière.

**Le facteur de sécurité 5 n'est pas une marge de manœuvre.** Le guide le dit deux fois, dont
une en toutes lettres : « Le facteur de sécurité n'offre pas une capacité de levage
additionnelle. » C'est la phrase que le chapitre cite, parce que le réflexe du lecteur devant
un treuil marqué « 1 tonne » est exactement de se dire qu'il en tient probablement cinq.

**La charge sur l'ancrage est le chiffre que personne ne calcule.** Une poulie de renvoi avec
les deux brins parallèles met **le double** sur l'arbre ou sur la patte d'attache. C'est le
mécanisme qui arrache les ancrages, et il est contre-intuitif : on croit que la poulie partage
la charge alors qu'elle l'additionne. Le chapitre le met en encadré.

**Les valeurs d'angle de la figure 57 (facteurs de moufle) sont conservées sans leurs
étiquettes d'angle**, qui n'ont pas survécu à l'extraction. Le chapitre publie les facteurs
(2,00 / 1,84 / 1,41 / 0,76) et marque les angles `[À VÉRIFIER]`.

**Les densités de bois sont données pour du bois d'œuvre séché à l'air.** Une bille d'épinette
fraîchement abattue est plus lourde que 449 kg/m³. Le guide ne donne pas la valeur du bois vert
pour l'épinette (seulement pour le sapin Douglas : 545 sec, 641 vert, 801 humide). Le chapitre
ne publie donc aucun chiffre pour l'épinette verte et dit au lecteur de majorer.
