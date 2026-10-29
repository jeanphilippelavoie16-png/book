# Audit de l'écriture : la voix, lot F (tomes 5 et 6)

28 octobre 2026. Un seul regard : **la voix**, le mot qu'on dit contre le mot qu'on écrit. Le registre visé : un
Québécois qui explique à son voisin, en français correct (ni joual, ni mot de livre). Lot lu au complet :
`chapitres/83-poeles-a-bois-et-rendement.md`, `chapitres/95-jardin-nordique.md`,
`chapitres/107-souder-braser-reparer-le-metal.md`. Aucun fichier du livre n'est touché. Les réécritures ci-dessous
n'ajoutent aucun fait ni chiffre ; elles ont passé `controle.py` (0 tiret, 3 avis jugés) et `langue.py` avec
LanguageTool (4 avis : « Nord » pour la région, « humidimètre » et « glyco-alcaloïdes » sont justes ; une virgule
avant « ou » est enlevée).

Ce que je ne juge pas ici : le tempo et le moule « fait : conséquence », la longueur, la répétition, la structure du
gabarit, l'exactitude des faits. Les trois chapitres ne sont pas encore passés à la grande passe : ils ont encore neuf
sections, des tirets (161) et des « § » (59). Ce que je relève est ce qui restera après la migration si personne ne
le cherche.

## 1. Les mesures

`tempo.py --par-fichier` sur le lot :

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 83-poeles-a-bois-et-rendement.md | 5624 | 286 | 19,7 | 0,59 | 12,6 | 20,6 | 20,7 | 33,9 | 23,4 | 3,0 | 2,7 | 5,3 | 5,6 |
| 95-jardin-nordique.md | 6026 | 308 | 19,6 | 0,69 | 16,9 | 20,8 | 21,2 | 39,3 | 25,3 | 5,6 | 10,6 | 8,8 | 4,2 |
| 107-souder-braser-reparer-le-metal.md | 5600 | 308 | 18,2 | 0,66 | 15,9 | 14,9 | 22,1 | 37,0 | 25,3 | 4,6 | 6,8 | 7,0 | 5,9 |
| ENSEMBLE | 17250 | 902 | 19,1 | 0,65 | 15,2 | 18,7 | 21,3 | 36,8 | 24,7 | 4,5 | 6,8 | 7,1 | 5,2 |
| tout le livre (`mesures.md`) | 684215 | 36580 | 18,7 | 0,65 | 15,5 | 17,3 | 19,9 | 31,4 | 23,7 | 5,0 | 9,4 | 5,4 | 5,1 |

Les marqueurs de la voix, comptés au `grep` et à la lecture sur les trois fichiers :

| marqueur | ch. 83 | ch. 95 | ch. 107 | lot |
| --- | --- | --- | --- | --- |
| phrases de source recopiées entre guillemets (sur 119 guillemets ouvrants) | 19 | 47 | 31 | **97** |
| impératifs en « -ez » ou « vous » recopiés d'une fiche | 3 | 18 | 1 | **22** |
| le texte qui parle de sa source, du livre ou du chapitre (« publié », « non sourcée », « le livre », « mot pour mot », « du chapitre »…) | 1 | 18 | 9 | **28** |
| « ce n'est pas X, c'est Y » | 3 | 4 | 4 | 11 |
| « X ne fait pas Y : il fait Z » | 3 | 2 | 3 | 8 |
| « c'est X qui / que » (section « relief » de `controle.py`) | 11 | 12 | 9 | 32 |
| marqueurs de franchise ou de mise en scène (« honnêtement », « le vrai danger », « le piège », « il faut le dire »…) | 5 | 3 | 7 | 15 |
| « se » + verbe de geste (grep large) | 33 | 30 | 27 | 90 |
| « Mots de livre » de `controle.py` | 8 | 2 | 7 | 17 |
| « parce que » | 7 | 5 | 10 | 22 |
| « ça » | 8 | 11 | 21 | 40 |
| « c'est » | 40 | 46 | 45 | 131 |

Deux lectures de ces chiffres. D'abord, **une phrase sur neuf du lot contient une phrase de source recopiée** (97
citations pour 902 phrases), avec son vouvoiement et ses mots de fiche ; c'est le défaut le plus lourd du lot, et
aucun outil ne le compte. Ensuite, le lot a plus de mots de liaison que le reste du livre (7,1 pour 1000 mots contre
5,4) et beaucoup de « c'est » (131, soit 7,6 pour 1000 mots, cinq fois plus que le lot A) : les mots de la parole
sont là, mais ils servent surtout la rhétorique. Sur les 131 « c'est », 32 font une mise en relief (« c'est la
capillarité qui tire ») et 11 une opposition fabriquée (« ce n'est pas le liquide qui saute, c'est la vapeur ») ;
les « donc » font des démonstrations en cascade (« il a perdu sa densité, donc sa masse, donc sa chaleur »). Compter
les mots parlés ne suffit pas : il faut regarder ce qu'ils font dans la phrase.

## 2. Ce que j'entends dans ces pages

Trois voix se relaient, et aucune n'est celle du voisin dans le garage. **La voix de l'institution** : la fiche du
ministère recopiée entre guillemets, qui vouvoie le lecteur (« Insérez la truelle », « Assurez-vous que »), parle
d'« items », de « sources d'inflammation possibles » et de « modèle de comportement particulier ». **La voix du
rapport de recherche** : le rédacteur qui rend compte de ses sources au lecteur (« La règle publiée est celle-là, mot
pour mot », « Le livre n'en invente pas », « Règle d'atelier, non sourcée »). **La voix de l'essayiste** : la loi en
formule, l'opposition, la chose qui « ment » ou qui « tranche », la franchise affichée (« La nuit, choisir
honnêtement »), la chute en chiasme (« Un manche rentré le soir est un manche qui existe encore le matin »).

Entre ces trois voix, il y a de très bons passages : les batteries en série du ch. 107, la conduite du feu du ch. 83,
les heures de soleil du ch. 95. Ils ont tous la même forme : un geste à l'infinitif, ce qu'on voit, et le pourquoi en
mots de garage (« font l'affaire », « ça donne toujours 12 V »). Ce sont les modèles de la section 4.

## 3. Les défauts, du plus grave au moins grave

### Motif 1. La voix de l'institution recopiée : la fiche citée entre guillemets (haute)

**Ce que c'est.** Une phrase d'une source officielle est collée telle quelle dans le texte, entre guillemets, avec sa
syntaxe d'origine : le vouvoiement et l'impératif en « -ez », les mots d'administration (« veiller à », « corps
combustible », « sources d'inflammation possibles », « items », « en raison de leur modèle de comportement
particulier »), les parenthèses de fiche (« (1 tasse) », « (40 °F) »). Le lecteur entend un autre auteur, plus
froid, qui ne parle pas comme le livre, et qui le vouvoie dans un livre qui ne le tutoie pas et ne le vouvoie pas.

**Fréquence.** 97 phrases de source recopiées sur 119 guillemets ouvrants (ch. 83 : 19 ; ch. 95 : 47 ; ch. 107 :
31), soit une phrase du lot sur neuf ; 22 impératifs en « -ez » ou « vous ». Les étapes 6, 8, 16, 23, 25, 26, 27 et
28 du ch. 95 sont presque entièrement faites de citations ; les signes d'échec de la pomme de terre (ch. 95, l. 291 à
295) aussi.

| fichier | ligne | le texte | la réécriture |
| --- | --- | --- | --- |
| 95 | 119 | «Insérez la truelle et prélevez un peu de terre à une profondeur équivalente à la zone racinaire de la plante cultivée (environ 15 à 30 cm). » «On recommande de faire 6 prélèvements (plus pour un très grand jardin). » Mélanger, et «conservez environ 250 ml (1 tasse) de ce mélange » | Prendre un peu de terre à la truelle, entre 15 et 30 cm de profondeur environ, là où vont les racines. En prendre à six endroits du jardin (plus si le jardin est très grand), mélanger le tout et en garder environ 250 ml, une tasse. |
| 95 | 227 | «Lavez à fond les légumes et les fruits à l'eau courante fraîche, même si vous avez l'intention de les peler. » «Utilisez une brosse à légumes et à fruits propre pour frotter les items dont la surface est ferme, comme les oranges, les melons, les pommes de terre, les carottes ». | Laver les légumes à fond à l'eau courante fraîche, même ceux qu'on va peler. Frotter ceux qui ont la peau dure, comme les pommes de terre et les carottes, avec une brosse propre. |
| 95 | 347 | «Les enfants sont particulièrement ciblés en raison de leur modèle de comportement particulier. En effet, ils ont souvent tendance à porter les mains à la bouche ». | Les enfants sont plus exposés, parce qu'ils se mettent souvent les mains dans la bouche. |
| 83 | 118 | Entreposer la pile loin du chalet : «le bois de chauffage est un corps combustible, il faut donc veiller à l'entreposer loin des sources d'inflammation possibles », et n'en rentrer que «quelques brassées à la fois ». | Monter la pile loin du chalet et ne rentrer que quelques brassées de bois à la fois. |
| 83 | 189 | lire l'affichage de l'avertisseur de CO sans attendre qu'il sonne, et vérifier le dégagement — «dégagez la zone autour de l'appareil de tout objet et assurez-vous que l'air circule librement ». | lire le chiffre sur l'avertisseur de CO sans attendre qu'il sonne, et regarder autour du poêle : rien ne doit traîner à côté, et l'air doit circuler librement. |
| 107 | 344 | «N'utilisez pas les appareils ou véhicules pouvant dégager du monoxyde de carbone à l'intérieur d'une pièce, d'un **abri** ou d'un véhicule ». Le mot «abri » couvre l'appentis, l'auvent et la bâche tendue pour souder au sec : c'est le geste que la pluie rend tentant. | On ne fait jamais tourner un moteur dans une pièce, une auto ou un abri. Un appentis, un auvent ou une bâche tendue pour souder au sec quand il pleut, c'est un abri. |

Autres cas à reprendre de la même façon : ch. 107, l. 376 (« les femmes enceintes (pour l'enfant à naître) sont
toutefois plus sensibles ») ; ch. 107, l. 292 à 295 (les colonnes « Diagnostic » faites de citations) ; ch. 95,
l. 173 à 175 (« Arrosez en fin d'après-midi… ») ; ch. 95, l. 291 à 295 (« Coupez et jetez toute partie… »).

**La cause.** Une règle écrite, pas appliquée : `cadre-agents.md`, l. 21, « La source sert à vérifier un fait, jamais à
copier une forme » ; `plan/decisions-jp.md` (15 octobre 2026), « Les guides et les études servent à vérifier un fait,
pas à copier une forme » ; skill `ecriture`, « Les guillemets » : « Pas de citation de source : la provenance vit dans
`suivi/`, jamais dans le texte » ; CLAUDE.md, règle 1, « La provenance ne s'imprime pas ». L'habitude derrière : la
règle 1 (ne jamais inventer un chiffre) pousse le rédacteur à recopier la source mot pour mot pour prouver qu'il n'a
rien inventé. La citation sert le vérificateur, pas le lecteur. Aucun outil ne la voit : `controle.py` ne compte ni les
guillemets de plus de quelques mots, ni « vous », ni l'impératif en « -ez ».

### Motif 2. Le texte qui parle de ses sources, du livre et du chapitre (haute)

**Ce que c'est.** Le rédacteur rend compte de son travail au lecteur : ce qui est « publié » et ce qui ne l'est pas,
ce qui est « non sourcé », ce que « le livre n'invente pas », le « mot important » d'une citation, la « variante
maîtresse du chapitre ». C'est la voix d'un rapport de recherche, et elle n'apprend rien sur le geste. Même famille :
les titres de section 2 en langue de rapport (« La conduite décrite ici est le bon choix quand : », ch. 83, l. 24 ;
« Le bon choix. », « Le mauvais choix. », ch. 95 et 107).

**Fréquence.** 28 (ch. 83 : 1 ; ch. 95 : 18 ; ch. 107 : 9). Au ch. 95 : « publié(e) » 6 fois, « Règle d'atelier, non
sourcée » 4 fois, « le livre n'en invente pas » 2 fois, « n'est donnée ici » 3 fois.

| fichier | ligne | le texte | la réécriture |
| --- | --- | --- | --- |
| 95 | 125 | **Aucune dose de chaux n'est donnée ici** : elle est calculée dans le rapport d'analyse, en fonction de la texture et du pH mesuré. Le livre n'en invente pas. | La dose de chaux est dans le rapport d'analyse : le laboratoire la calcule d'après la texture du sol et le pH mesuré. |
| 95 | 216 | La règle publiée est celle-là, mot pour mot : «Rendez inaccessible la nourriture à l'extérieur (compost, ordure ménagère, nourriture pour animaux domestiques…) ». **Aucune distance minimale n'est publiée**, ni par rapport au camp, ni par rapport au jardin : le livre n'en invente pas. | **Mettre le compost hors de portée des bêtes**, comme les ordures et la nourriture des animaux de la maison : un bac fermé, avec un couvercle lesté. |
| 95 | 165 | **L'ail se plante à l'automne** pour la récolte de l'été suivant : il lui faut passer l'hiver en terre. Règle d'atelier, non sourcée. | **Planter l'ail à l'automne** pour le récolter l'été suivant : il doit passer l'hiver en terre. (Faute de source, le fait porte `[À VÉRIFIER]` dans le texte de travail, jamais « non sourcée » à l'impression.) |
| 95 | 36 | **Ce qu'on demande au jardin, et ce qu'on demande ailleurs.** Le tableau ferme des illusions, et c'est l'essentiel de la section. | **Ce que le jardin donne, et ce qu'il faut trouver ailleurs.** (La seconde phrase sort.) |
| 107 | 240 | C'est la situation ordinaire d'un chalet, et c'est pourquoi le livre met le défaut à 3 heures plutôt qu'à 60 minutes dès qu'on travaille sur du bois. | Au chalet, c'est presque toujours le cas : compter 3 heures. |
| 107 | 197 | Le mot important est «même en l'absence d'air » : au-dessus de ce seuil, l'acétylène ne brûle pas, il se décompose, et retirer l'oxygène ne protège de rien. «Pousser un peu » pour couper plus vite n'existe pas. | Au-dessus de cette pression, l'acétylène peut exploser tout seul, même sans air : fermer l'oxygène ne protège de rien. On ne monte pas la pression pour couper plus vite, même un peu. |

**La cause.** CLAUDE.md, « L'écriture » : « Saute : la phrase qui parle du livre ou de la page » ; skill `ecriture`,
tableau « Les phrases », première ligne (« La phrase qui parle du livre, du chapitre, de la page ») ; CLAUDE.md,
règle 1 : « ce qu'on ne trouve pas porte `[À VÉRIFIER]` » (et non « non sourcée » dans le texte) ; CLAUDE.md, « Pas de
relecture extérieure » : ce qui ne se vérifie pas « se lève ou se coupe avant l'impression ». L'habitude : le
rédacteur écrit pour le vérificateur technique et laisse dans le livre ses notes de travail. « Seuil » est aussi un mot
que le cadre interdit (`cadre-agents.md`, l. 138).

### Motif 3. L'opposition fabriquée et la loi en formule (haute)

**Ce que c'est.** La phrase pose ce que la chose ne fait pas avant de dire ce qu'elle fait : « ce n'est pas X, c'est
Y », « X ne fait pas Y : il fait Z », ou elle finit sur « un X, pas un Y » avec deux noms abstraits (« une décision,
pas un réflexe »). C'est la famille exacte que JP a relevée dans les pages des dangers le 18 octobre (« Un liquide qui
brûle ne brûle pas en liquide » ; « tu as recommencé à faire des tournures de phrase bizarres »). Personne ne parle
comme ça pour expliquer un geste : on dit ce qui se passe.

**Fréquence.** 11 « ce n'est pas X, c'est Y » ; 8 « X ne fait pas Y : il fait Z » ; 7 chutes en « un X, pas un Y » de
noms abstraits (ch. 83 : 3 ; ch. 95 : 3 ; ch. 107 : 1). Les « , pas X » de consigne (« chauffer les pièces, pas la
baguette ») sont justes et restent : c'est ce qu'on dit à quelqu'un qui va se tromper.

| fichier | ligne | le texte | la réécriture |
| --- | --- | --- | --- |
| 83 | 141 | L'essence et le naphte ne brûlent pas en liquide : ils s'évaporent, et c'est le nuage de vapeur au-dessus et autour du foyer qui s'allume, donc en dehors du poêle et dans la pièce. | L'essence et le naphte s'évaporent, et c'est leur vapeur qui prend feu, au-dessus et autour du foyer : le feu part dans la pièce, en dehors du poêle. |
| 107 | 35 | Ce n'est pas le liquide qui saute, c'est la vapeur mélangée d'air : le réservoir vidé et séché est plus dangereux que le plein. | Ce qui saute, c'est la vapeur mélangée à l'air. Un réservoir vidé et séché est donc plus dangereux qu'un réservoir plein. |
| 95 | 74 | La contrainte du Nord n'est pas la lumière, c'est la chaleur : tout le travail revient à **gagner des degrés et des jours aux deux bouts** — sol plus sombre, plus haut, mieux drainé, couvert la nuit. | Dans le Nord, le jardin manque de chaleur plus que de lumière. Tout le travail consiste à gagner des degrés et des jours au début et à la fin de la saison : on rend le sol plus sombre, on le monte, on le draine et on le couvre la nuit. |
| 95 | 528 | Contre l'orignal, ce n'est pas la solidité qui travaille mais l'inconfort : deux rangs de corde ou de ligne à pêche tendus à des hauteurs différentes découragent une bête qui ne voit pas où elle met les pattes, alors qu'une clôture haute et nette se saute. | Pour l'orignal, pas besoin d'une clôture solide : deux rangs de corde ou de ligne à pêche, tendus à des hauteurs différentes, le gênent parce qu'il ne voit pas où il met les pattes. Une clôture haute et nette, il la saute. |
| 83 | 53 | Le rendement est une stratégie de saison, pas une consigne d'urgence. | *(la phrase sort : la phrase d'avant dit déjà quoi faire dans l'urgence)* |
| 107 | 113 | Une soudure sur une pièce qu'il faudra un jour déposer est une décision, pas un réflexe. | *(la phrase sort : l'étape vient de dire « Si oui, éclisse boulonnée »)* |

Autres cas : ch. 83, l. 345 (« Ce n'est pas le tranchant qui décide, c'est l'avoyage ») ; ch. 83, l. 213 (« c'est la
mesure qui tranche, pas le calendrier ») ; ch. 83, l. 341 (« C'est une solution de saison, pas un régime ») ; ch. 95,
l. 511 (« un pari de belle année, pas une culture ») ; ch. 107, l. 37 (« Ce n'est pas la réparation qui est fermée,
c'est le plomb ») ; ch. 107, l. 359 (« Ce n'est pas la flamme qui les fabrique : c'est le **rayonnement** ») ;
ch. 107, l. 429 (« Un court-circuit franc […] ne fait pas une étincelle : il fait un câble rouge »).

**La cause.** Skill `ecriture`, tableau « Les phrases », ligne « L'opposition fabriquée », et tableau du 15 octobre,
ligne des pages des dangers du 18 octobre 2026 (« X ne fait pas Y : il fait Z ») ; `cadre-agents.md`, l. 142 à 146.
L'habitude : la rhétorique de l'essai et de l'IA, qui fabrique une surprise avant de donner le fait. `controle.py` ne
voit que les « c'est … qui » (section « relief ») ; il ne repère ni « ne … pas … : il … », ni « , pas un + nom. » en
fin de phrase.

### Motif 4. La chose qui ment, tranche, répond ou décide (haute)

**Ce que c'est.** Un objet, une plante, un appareil ou une matière fait un geste de personne : la bûche « ment », la
bûche témoin « tranche », le sachet « fait foi », ce qui pousse « répond avant tout le monde », une talle « dit le
contraire », un jardin « est un animal qui boit », un conduit « a une échéance », l'avertisseur parle à la première
personne (« sous ce que je sais lire »). C'est la famille « la braise ne sait pas » que JP a interdite le 16 octobre,
avec d'autres verbes que ceux que le script connaît.

**Fréquence.** 18 à la lecture (ch. 83 : 8 ; ch. 95 : 6 ; ch. 107 : 4). `controle.py` en a vu 1 (« tournure », ch. 83,
l. 503).

| fichier | ligne | le texte | la réécriture |
| --- | --- | --- | --- |
| 83 | 126 | Mesurer sur une face **fraîchement fendue** : la surface d'une bûche mouillée sèche en une journée de soleil et ment. | Mesurer sur une face **fraîchement fendue** : la surface d'une bûche mouillée sèche en une journée de soleil, et l'humidimètre y lirait un chiffre trop bas. |
| 83 | 273 | Et zéro ne veut pas dire rien — un avertisseur ordinaire ne sonne pas sous 30 ppm, et son zéro veut dire « sous ce que je sais lire ». | Un zéro à l'affichage ne veut pas dire qu'il n'y a aucun CO : un avertisseur ordinaire ne sonne pas sous 30 ppm, et il affiche zéro quand il y en a trop peu pour qu'il le mesure. |
| 95 | 381 | *Ce qui pousse déjà répond avant tout le monde.* | *Regarder d'abord ce qui pousse déjà.* |
| 95 | 22 | un jardin n'est pas un équipement de fin de semaine, il est un animal qui boit et qui se fait manger dès qu'on tourne le dos. | Il faut arroser le jardin chaque semaine et le surveiller, sinon les bêtes le mangent : on ne peut pas faire un jardin en venant seulement les fins de semaine. |
| 107 | 283 | sans thermomètre, un bâton de pin qui noircit au contact dit 260 à 425 °C | sans thermomètre, si un bâton de pin noircit au contact, la pièce est entre 260 et 425 °C |
| 83 | 508 | un conduit qui traverse du bois sans dégagement n'a pas de variante, il a une échéance. | Un conduit qui traverse du bois sans dégagement finit tôt ou tard par mettre le feu à la charpente. |

Autres cas : ch. 83, l. 131 (« la bûche témoin tranche ») ; ch. 83, l. 125 (« C'est l'humidimètre du pauvre, et il ne
se brise pas ») ; ch. 83, l. 61 (« la chaleur perdue pour la pièce y attend un allumage ») ; ch. 83, l. 503 (« On
chauffe à l'aveugle un gaz qui tue sans prévenir ») ; ch. 95, l. 142 (« **Le sachet fait foi.** ») ; ch. 95, l. 385
(« Une talle d'ortie […] dit le contraire ») ; ch. 107, l. 346 (« le geste que la pluie rend tentant ») ; ch. 107,
l. 414 et l. 567 (« il ne s'annonce pas »).

**La cause.** `cadre-agents.md`, l. 100 à 102 (« Pas de chose qui pense, sait, veut, attend… ») ; skill `ecriture`,
tableau du 15 octobre, lignes « La braise ne sait pas » et « la couleur dit » ; CLAUDE.md, « l'image poétique, la
petite scène, la personnification ». L'habitude : la personnification rend la phrase vivante à peu de frais et
remplace le fait qu'il faudrait dire (ce qu'on mesure, ce qu'on voit). Le script ne connaît que les verbes de l'esprit
(savoir, vouloir…), pas « mentir », « trancher », « répondre », « dire », « décider », « faire foi », « s'annoncer ».

### Motif 5. Le narrateur qui se met en scène : la franchise affichée et la chute en formule (moyenne)

**Ce que c'est.** Le texte annonce sa sincérité ou dramatise au lieu de dire : « choisir honnêtement », « Ce qu'on
perd, honnêtement », « et il faut le dire », « le vrai danger », « le vrai cas », « C'est le piège du chapitre »,
« C'est la variante maîtresse », « et c'est pourtant l'ordre ». Et le paragraphe finit sur une formule qui sonne bien
et n'apprend rien : le chiasme (« Un manche rentré le soir est un manche qui existe encore le matin »), la sentence
(« La confusion **est** le danger »), la tautologie (« la lumière est la lumière »). Un voisin ne dit pas
« honnêtement » avant chaque conseil : c'est un tic d'IA.

**Fréquence.** 15 marqueurs (ch. 83 : 5 ; ch. 95 : 3 ; ch. 107 : 7) et une dizaine de chutes en formule.

| fichier | ligne | le texte | la réécriture |
| --- | --- | --- | --- |
| 83 | 167 | **La nuit, choisir honnêtement.** Il n'existe pas, dans un poêle d'acier de format courant, de charge qui donne à la fois huit heures de chaleur et une combustion propre. | **La nuit, choisir entre la durée et un feu propre.** Dans un poêle d'acier ordinaire, aucune charge ne donne à la fois huit heures de chaleur et un feu qui brûle proprement. |
| 83 | 268 | C'est contre tous les réflexes à -35 °C, et c'est pourtant l'ordre : les symptômes peuvent apparaître «dans les minutes suivant l'exposition », et deux minutes à chercher des tuques se paient en perte de conscience. | À −35 °C, on a le réflexe de s'habiller avant de sortir, et il ne faut pas : les symptômes peuvent arriver en quelques minutes, et deux minutes à chercher des tuques suffisent pour perdre connaissance. |
| 107 | 495 | *Ce qu'on perd, honnêtement :* le contrôle. | *Ce qu'on perd :* le contrôle de la chaleur. |
| 107 | 321 | Dix minutes, c'est la durée d'un joint. | Un seul joint prend une dizaine de minutes. |
| 95 | 457 | Elles demandent quelqu'un au chalet deux fois par jour. C'est le vrai prix d'un jardin d'urgence : pas l'argent, la présence. | Il faut donc quelqu'un au chalet deux fois par jour pour les ouvrir et les fermer. |
| 95 | 531 | Un manche rentré le soir est un manche qui existe encore le matin. | Rentrer les outils le soir, sinon le porc-épic gruge les manches. |

Autres cas : ch. 83, l. 479 (« c'est le choix honnête de l'étape 22 ») ; ch. 83, l. 131 (« Un chalet qui tient deux
ans d'avance ne brûle jamais de vert », relevé comme maxime par `controle.py`) ; ch. 83, l. 475 (« C'est un appareil
de survie temporaire dans un bâtiment qu'on accepte de perdre, pas une installation ») ; ch. 95, l. 162 (« la lumière
est la lumière ») ; ch. 107, l. 350 (« La confusion **est** le danger ») ; ch. 107, l. 413 (« C'est le vrai danger de
cette méthode, et il ne s'annonce pas ») ; ch. 107, l. 554 (« *Ce que ça ne garantit pas, et il faut le dire :* ») ;
ch. 107, l. 561 (« Ça fuit moins que rien, ça se refait, et ça n'a jamais tué personne »).

**La cause.** Skill `ecriture`, tableau « Les phrases », lignes « La chute en formule » et « La révélation en deux
temps » ; `cadre-agents.md`, l. 99 (« Pas de maxime ni de chute en formule ») ; CLAUDE.md, « fils d'la AI ». La liste
« Vocabulaire d'IA » du skill (crucial, essentiel, clé…) ne contient ni « honnêtement », ni « le vrai », ni « le
piège », ni « maîtresse » : les tics de franchise et de mise en scène ne sont nommés nulle part.

### Motif 6. Le style nominal et le mot de rapport (moyenne)

**Ce que c'est.** Des noms à la place des verbes, et des mots de rapport technique que personne ne dit en expliquant :
« Critère de décision », « le facteur limitant », « la seule variable sur laquelle on agit », « une contrainte
permanente que la conduite du feu doit compenser », « au maximum de siccité du site », « Gaz de pyrolyse non brûlés »,
« Fluxer », « une habituation », « neurocomportemental », « chaque poste dit ici ce qu'il coûte ». Et la liste de noms
sans verbe qui tient lieu d'explication (« Bois humide, air étouffé, petit feu mou dans un gros tuyau : trois façons
de… »). Le lecteur doit retrouver tout seul qui fait quoi.

**Fréquence.** Environ 25 à la lecture (ch. 83 : 10 ; ch. 95 : 9 ; ch. 107 : 6), surtout dans les anciennes sections
1 et 3 et dans les colonnes « Diagnostic » des tableaux.

| fichier | ligne | le texte | la réécriture |
| --- | --- | --- | --- |
| 83 | 17 | Tirer d'une corde de bois tout ce qu'elle contient — bois sec sous 20 % d'humidité, charges petites brûlées à l'air ouvert, tuyau propre — allonge nettement la durée d'une pile de bois sans changer d'appareil et supprime en même temps les deux façons dont un poêle tue : la créosote et le monoxyde de carbone. | Avec du bois sec (moins de 20 % d'humidité), de petites charges qui brûlent avec l'air ouvert et un tuyau propre, une pile de bois dure nettement plus longtemps, sans changer de poêle. On évite du même coup les deux choses qui font qu'un poêle tue : la créosote et le monoxyde de carbone. |
| 83 | 61 | Bois humide, air étouffé, petit feu mou dans un gros tuyau : trois façons de les laisser partir sans brûler. | Les gaz partent sans brûler quand le bois est humide, quand on étouffe l'air, ou quand on fait un petit feu mou dans un gros tuyau. |
| 83 | 27 | Le rendement est la seule variable sur laquelle on agit en janvier : on ne fait pas pousser d'épinette en janvier, mais on peut cesser d'en gaspiller le tiers. | En janvier, on ne peut plus faire pousser d'épinette : on peut seulement arrêter d'en gaspiller le tiers en chauffant mieux. |
| 95 | 99 | Critère de décision : 6 h ou plus pour les légumes-fruits et les fines herbes, 4 à 5 h pour les feuilles, moins que ça pour les racines qui «tolèrent la mi-ombre ». | Il faut 6 h de soleil ou plus pour les légumes-fruits et les fines herbes, 4 à 5 h pour les légumes feuilles, et moins pour les légumes racines, qui poussent aussi à la mi-ombre. |
| 83 | 228 | Gaz de pyrolyse non brûlés : combustion étouffée ou trop froide | Les gaz du bois sortent sans brûler : le feu est trop étouffé ou trop froid. |
| 95 | 79 | L'eau est le facteur limitant, et le paillis est le seul moyen d'en demander moins. | La taille du jardin dépend de l'eau, et le paillis est la seule façon d'arroser moins. |

Autres cas : ch. 83, l. 30 à 33 (« une contrainte permanente que la conduite du feu doit compenser ») ; ch. 83, l. 212
(« au maximum de siccité du site », repris au motif 7) ; ch. 95, l. 362 (« Le mécanisme est une habituation ») ;
ch. 95, l. 375 (« chaque poste dit ici ce qu'il coûte ») ; ch. 107, l. 206 (« **Fluxer** la baguette ») ; ch. 107,
l. 374 (« Ce qui s'installe est neurocomportemental »).

**La cause.** CLAUDE.md, « L'écriture » : « Pas de liste de noms à la place des actions » ; skill `ecriture`, règle 0
(« un verbe qui dit le geste ») et règle 7 (« La voix active, un sujet concret ») ; `cadre-agents.md`, l. 138
(« pas de mot de métier sans besoin »). L'habitude : le vocabulaire des sources (agronomie, ingénierie, toxicologie)
passe dans le texte avec le fait, et la colonne « Diagnostic » appelle une étiquette au lieu d'une phrase.

### Motif 7. Le participe ou l'adjectif détaché en tête, la phrase sans verbe, l'incise de livre (moyenne)

**Ce que c'est.** La phrase commence par un participe ou un adjectif détaché (« Refroidi trop vite, », « Couchée et
libre, », « humides, ») qui porte une condition : à voix haute, on dit « si ». Ou la phrase n'a pas de verbe conjugué
(« Une plaque d'acier prise dans la ferraille, percée, posée… ») ; ou elle enchâsse des incises au point qu'on perd le
verbe principal (la section 1 du ch. 95 : le sujet « Un jardin nordique » attend son complément pendant quatre lignes).
C'est le défaut que le lot A a mis en tête ; ici, il est surtout au ch. 107.

**Fréquence.** 14 à la lecture (ch. 83 : 3 ; ch. 95 : 3 ; ch. 107 : 8).

| fichier | ligne | le texte | la réécriture |
| --- | --- | --- | --- |
| 107 | 68 | Refroidi trop vite (pièce épaisse, gelée ou arrosée), le métal autour du joint durcit, reste tendu et fissure des jours plus tard | Si le métal autour du joint refroidit trop vite (une pièce épaisse, gelée ou arrosée), il durcit, reste tendu et fissure des jours plus tard |
| 107 | 191 | Couchée et libre, une bouteille roule, et un détendeur arraché en fait un projectile. | Une bouteille couchée et pas attachée peut rouler, et si son détendeur s'arrache, elle part comme un projectile. |
| 107 | 80 | **Électrodes enrobées, gardées au sec** — humides, elles criblent le joint de trous. Pot fermé à la chaux, au-dessus du poêle. | **Électrodes enrobées, gardées au sec** : si elles prennent l'humidité, elles remplissent le joint de petits trous. Les garder dans un pot fermé avec de la chaux, au-dessus du poêle. |
| 107 | 445 | Une plaque d'acier prise dans la ferraille, percée, posée à cheval sur la cassure et boulonnée de part et d'autre. | On prend une plaque d'acier dans la ferraille, on la perce, on la pose à cheval sur la cassure et on la boulonne des deux côtés. |
| 83 | 212 | Ne baisse plus : le bois est au maximum de siccité du site. Remonte : la pile prend l'eau, revoir la couverture | Si elle ne baisse plus, le bois est aussi sec qu'il peut le devenir à cet endroit. Si elle remonte, la pile prend l'eau : revoir ce qui la couvre. |
| 95 | 11 | Un jardin nordique convertit une trouée de forêt, une saison d'environ 120 jours sans gel sur la côte — du 25 mai au 27 septembre en moyenne à Sept-Îles, et une trouée de l'intérieur ne suit pas forcément la station — et beaucoup d'eau portée à la main en légumes qui, eux, ne se gardent pas tout seuls : le jardin ne conserve rien — il produit ce que le caveau (ch. 79), la fermentation (ch. 80) et la conserve (ch. 78) tiennent ensuite jusqu'au printemps. | Avec une trouée de forêt, une saison d'environ 120 jours sans gel sur la côte (du 25 mai au 27 septembre en moyenne à Sept-Îles ; une trouée dans les terres n'a pas forcément les mêmes dates) et beaucoup d'eau portée à la main, un jardin nordique donne des légumes. Ces légumes ne se gardent pas tout seuls : le caveau (ch. 79), la fermentation (ch. 80) et la conserve (ch. 78) les gardent jusqu'au printemps. |

**La cause.** Skill `ecriture`, règle 0 (« pas de participe en chaîne ») et règle 11 (« L'ordre naturel ») ;
CLAUDE.md, « L'écriture » (« Chaque phrase a un verbe qui dit le geste, on sait qui le fait »). L'habitude : la
compression de l'écrit, qui garde le sens et perd la phrase qu'on dirait ; et les tirets d'incise, qui permettent
d'empiler sans jamais finir la phrase (le ch. 95 en a 71).

### Motif 8. La consigne au pronominal : la chose « se perce », « se jette », « se manipule » (moyenne)

**Ce que c'est.** Le geste est dit comme si la chose le faisait toute seule, et personne ne le fait : « la pièce se
remplace, elle ne se soude pas », « elle se jette », « il se manipule avec des gants », « Le trou suivant se perce ».
C'est la voix du manuel impersonnel. JP l'a corrigée au ch. 3 (« on doit le cuire, pas il se cuit ; très important
pour le livre »).

**Fréquence.** 90 « se + verbe de geste » au `grep` (ch. 83 : 33 ; ch. 95 : 30 ; ch. 107 : 27). Jugés un à un sur les
ch. 83 et 107 : 38 consignes sur 60 relevés (20 sur 31 et 18 sur 29) ; les autres disent ce que la chose peut faire
(« Le tuyau d'un chalet se démonte ») et restent.

| fichier | ligne | le texte | la réécriture |
| --- | --- | --- | --- |
| 83 | 429 | Une section de tuyau simple paroi vitrifiée se démonte, se transporte loin du bâtiment, se couche sur la roche ou la terre nue, et on y allume un feu de branches sèches. | Démonter la section de tuyau simple paroi, l'emporter loin du bâtiment, la coucher sur la roche ou la terre nue et allumer un feu de branches sèches dessus. |
| 83 | 433 | elle se jette si elle ne redevient pas ronde et étanche à l'assemblage | on la jette si elle ne redevient pas ronde et étanche au remontage |
| 107 | 93 | Si la réponse contient «au-dessus de quelqu'un », la pièce se remplace, elle ne se soude pas (ch. 109). Si elle contient «sous pression », idem (ch. 78). | Si la pièce retient une charge au-dessus de quelqu'un, on la remplace, on ne la soude pas (ch. 109). Même chose si elle est sous pression (ch. 78). |
| 107 | 504 | il se chauffe dans la braise ou sur la plaque du poêle, il se nettoie à la lime, et il s'étame une fois avant de servir. | on le chauffe dans la braise ou sur la plaque du poêle, on le nettoie à la lime et on l'étame une fois avant de s'en servir. |
| 95 | 190 | **Si le lièvre finit au collet en bordure du jardin, il se manipule avec des gants étanches** | **Si on prend un lièvre au collet près du jardin, le manipuler avec des gants étanches** |
| 95 | 224 | **Les feuilles se coupent le matin** et vont au froid tout de suite | **Couper les feuilles le matin** et les mettre au froid tout de suite |

**La cause.** CLAUDE.md, « La tournure naturelle » (« Jamais au pronominal quand quelqu'un fait le geste ») ; skill
`ecriture`, tableau du 15 octobre, ligne « s'il n'est plus dur au centre, il se cuit tout de suite ou se jette » ;
`cadre-agents.md`, l. 103. L'habitude : la tournure impersonnelle des recettes et des manuels ; ces chapitres sont
antérieurs à la règle et ne sont pas encore passés à la grande passe. `controle.py` a une catégorie « pronominal »,
mais elle n'a rien relevé ici.

### Motif 9. Les mots et les liaisons de livre (basse)

**Ce que c'est.** Le mot correct qu'on écrit et qu'on ne dit pas, et le connecteur de démonstration : « Or »,
« justement », « sciemment », « idem », « En effet », « toutefois », « à défaut », « lorsque », « transgresser »,
« tourmentée », « affleurer », « jusqu'à preuve du contraire », « ce n'est pas cosmétique », « s'en aperçoive ».

**Fréquence.** `controle.py`, « Mots de livre » : 17 (ch. 83 : 8 ; ch. 95 : 2 ; ch. 107 : 7). À la lecture, une
vingtaine de plus que la liste ne connaît pas (« Or », « justement », « sciemment », « idem », « transgresse »,
« tourmentée », « affleure », « items », « jusqu'à preuve du contraire »).

| fichier | ligne | le texte | la réécriture |
| --- | --- | --- | --- |
| 95 | 159 | **Butter les pommes de terre au fur et à mesure, et ce n'est pas cosmétique.** Un tubercule qui affleure reçoit la lumière et verdit. Or la pomme de terre se garde dans un endroit frais, sec et à l'abri de la lumière justement pour réduire au minimum la formation de glyco-alcaloïdes — le mécanisme est le même au champ qu'au caveau, la lumière est la lumière. | **Butter les pommes de terre au fur et à mesure.** Une pomme de terre qui sort de terre voit la lumière et verdit. Au jardin comme au caveau, la lumière lui fait fabriquer des glyco-alcaloïdes, un poison : c'est pour ça qu'on la garde au frais, au sec et dans le noir. |
| 95 | 351 | le dernier est celui qu'on transgresse sans y penser, parce que les retailles finissent au poêle et que la cendre finit au jardin. | c'est le dernier qu'on oublie, parce que les retailles finissent au poêle et la cendre au jardin. |
| 95 | 354 | **tout bois de démolition d'origine inconnue est traité jusqu'à preuve du contraire.** | **Un bois de démolition dont on ne connaît pas l'origine, on le considère comme traité.** |
| 107 | 441 | C'est un échange qu'on fait sciemment : une batterie contre une pièce de machine. | On le fait en le sachant : on sacrifie une batterie pour sauver une pièce de machine. |
| 107 | 211 | seule une pièce très lourde ou très tourmentée demande plus. | seule une pièce très lourde ou de forme compliquée en demande plus. |
| 83 | 72 | À défaut : romaine, perche sur pivot et poids connu. | Sinon, une balance romaine ou une perche sur un pivot avec un poids connu. |

**La cause.** Skill `ecriture`, règle 15 et sa table « On l'écrit / On le dit » ; `cadre-agents.md`, l. 132 à 136. La
liste de `controle.py` a les mots déjà vus par JP (à défaut, lorsque, davantage, toutefois) ; elle ne peut pas suivre
tous les autres, et les connecteurs de démonstration (« Or », « justement », « de ce fait », « idem ») n'y sont pas.

## 4. Les passages qui marchent : des modèles

1. **Ch. 107, l. 405 à 408.** « **Monter en série, pas en parallèle.** Le **+** de la première va au **−** de la
   deuxième, le **+** de la deuxième au **−** de la troisième. Il reste un **+** libre à un bout et un **−** libre à
   l'autre : ce sont les deux seules bornes qu'on touche. Deux **+** réunis, c'est du parallèle : ça donne toujours
   12 V et ça ne fera jamais d'arc. » *Pourquoi :* le geste dans l'ordre, chaque borne nommée, et l'erreur probable
   dite en mots de garage (« c'est du parallèle », « ça ne fera jamais d'arc »). Le « pas en parallèle » du titre est
   la bonne opposition : celle qui empêche une erreur réelle.
2. **Ch. 107, l. 415 à 417.** « **Câbler gros et court.** Des câbles de survoltage font l'affaire, mais ils chauffent :
   plus ils sont épais et courts, moins on perd. Un câble qui devient trop chaud pour la main entre deux joints est trop
   petit pour le travail. » *Pourquoi :* « font l'affaire », « mais », « plus… moins » : la phrase qu'on dit dans le
   garage ; et le repère se sent à la main, sans instrument.
3. **Ch. 83, l. 160 à 163.** « **Réduire l'air seulement quand la charge est pleinement enflammée**, jamais au point
   d'éteindre les flammes. Tant qu'il y a des flammes vives sur toute la charge, les gaz brûlent ; dès qu'il ne reste
   que de la fumée qui roule sans flamme, ils partent intacts dans le tuyau. » *Pourquoi :* la consigne, puis « tant
   que / dès que » avec ce qu'on voit dans le foyer et ce que ça veut dire. Aucune loi, aucune image : le mécanisme est
   attaché à ce qu'on regarde.
4. **Ch. 83, l. 369 à 371.** « Un vieux pneu posé à plat sur le billot, ou deux tours de corde serrés autour de la
   bille, tient les morceaux debout : la bille se fend au complet sans avoir à se pencher et à remonter chaque quartier
   entre deux coups. » *Pourquoi :* la débrouille avec ce qui traîne, et le gain dit en gestes du corps (« se pencher »,
   « remonter chaque quartier entre deux coups »), avec « au complet », mot d'ici et correct.
5. **Ch. 95, l. 97 à 99.** « **Compter les heures de soleil pour vrai.** Une journée claire de juillet, noter l'heure où
   le soleil frappe le site et l'heure où il le quitte. Refaire le même exercice en août : le soleil descend, et la
   ligne d'ombre des épinettes avance vite. » *Pourquoi :* « pour vrai » est le mot qu'on dit ; le geste se fait avec
   une montre ; la raison tient en mots de tous les jours. Le passage casse à la phrase suivante (« Critère de
   décision : », motif 6) : la même étape montre les deux voix l'une après l'autre.

## 5. Pour l'auditeur de la voix (ce que le skill réécrit pourrait outiller)

Ce que `controle.py` ne voit pas dans ce lot, et qui se cherche à la machine avant la lecture à voix haute :

- **La citation de source** : un passage entre guillemets de plus de quatre mots qui n'est pas une étiquette ni une
  parole ; « vous », « votre », « vos » ; un impératif en « -ez » en tête de guillemets.
- **Le texte qui parle de sa source** : « publié(e)(s) », « non sourcé(e) », « règle d'atelier », « le livre »,
  « du chapitre », « (donné|publié) ici », « mot pour mot », « fait foi », « le mot important ».
- **L'opposition et la loi** : « ne VERBE pas … : (il|elle|ils|elles) VERBE », « ce n'est pas … c'est », et « , pas
  (un|une) NOM. » en fin de phrase quand les deux noms sont abstraits.
- **La chose qui juge** : sujet non humain de « ment », « tranche », « répond », « dit », « décide », « fait foi »,
  « s'annonce », « prévient ».
- **La franchise affichée** : « honnête(ment) », « le vrai (cas|danger|prix) », « le piège », « maîtresse », « il faut
  le dire », « et c'est pourtant ».
- **Le participe en tête** : début de phrase en participe passé ou adjectif suivi d'une virgule (« Refroidi trop
  vite, », « Couchée et libre, »).
- **Les liaisons de démonstration** : « Or », « justement », « de ce fait », « idem », « En effet », « jusqu'à preuve
  du contraire ».

Et une question pour la lecture, que les chiffres de la section 1 imposent : **le mot parlé fait-il ce qu'on ferait en
parlant ?** Un « c'est » de mise en relief ou un « donc » de démonstration n'est pas plus parlé qu'un « lorsque ».

## 6. La liste de contrôle (ma partie du cadre)

Pour tout agent
- [x] Lire au complet le skill de sa partie : `ecriture` lu au complet ; `editeur` et `langue` lus pour les règles citées.
- [x] Règle 1 : aucune réécriture n'ajoute de fait ni de chiffre ; les chiffres repris sont ceux du texte.
- [x] Ne rien commiter.
- [x] Un agent par sujet, un regard : la voix, sur trois chapitres.
- [x] Lire seulement ce que la tâche touche ; sorties de commande coupées.
- [x] Le rapport ne recopie pas le texte au-delà des citations demandées.

La phrase
- [x] Règle 0 : chaque réécriture lue à voix haute ; un verbe qui dit le geste, on sait qui le fait.
- [x] Pas de loi en formule ni de « d'où » : relevé (motif 3), absent des réécritures.
- [x] Pas de maxime, de chute en formule, d'opposition fabriquée, d'image : relevé (motifs 3 et 5), absent des réécritures.
- [x] Pas de chose qui pense ou qui juge : relevé (motif 4), réécrit en fait observable.
- [x] Consigne jamais au pronominal : relevé (motif 8), réécritures à l'infinitif ou avec « on ».
- [x] Le sujet se nomme, l'ordre est naturel : motif 7.
- [x] Le mot qu'on dit (règle 15) : motifs 1, 6 et 9 ; « Mots de livre » de `controle.py` jugés dans mon regard (17).
- [x] Les mots de tous les jours, pas de « seuil » : « au-dessus de ce seuil » relevé (ch. 107, l. 198), réécrit.
- [x] Aucun tiret dans les réécritures (0 au `controle.py`) ; les trois chapitres en ont 161, hors de mon regard.
- [x] « section N », jamais « § » : aucune réécriture n'en a ; les chapitres en ont 59, hors de mon regard.
- [x] Tournures du 18 octobre (« X ne fait pas Y : il fait Z », « la couleur dit ») : motifs 3 et 4.
- [ ] Points de contrôle et signes d'échec à 5 à 8 lignes : hors de mon regard ; noté que le ch. 83 en a 12 et 12, le
  ch. 95, 18 et 14, le ch. 107, 17 et 15.
- [ ] `controle.py` sur les chapitres : lancé ; seuls les avis de la voix sont jugés ici (tirets, « § », redites et
  mots vides : à la passe de chaque chapitre).

La langue
- [x] Réécritures passées à `langue.py` avec LanguageTool : 4 avis jugés (3 justes, une virgule enlevée).
- [x] Français correct, mots du Québec quand ils sont justes (« gruge », « au complet », « pour vrai »), ni joual ni
  anglicisme : « items » relevé (ch. 95, l. 229).
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures.
- [ ] `langue.py` sur les trois chapitres : au correcteur, à la passe de chaque chapitre.
