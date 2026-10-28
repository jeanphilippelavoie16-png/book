# Audit de l'écriture : la consigne, lot F (tomes 5 et 6)

28 octobre 2026. Un seul regard : la consigne. Qui fait quoi, quand, dans quel ordre ; un geste par phrase ou une étape
qui en entasse cinq ; la condition avant ou après le geste ; le pourquoi qui aide ou qui alourdit ; le chiffre à sa
place ; une étape qu'on suit les mains occupées, à la lampe frontale ; les séries orange, les tableaux Points de
contrôle et Signes d'échec, les lignes de Matériel, les titres de « Quand l'utiliser ».

Lot, lu au complet : `chapitres/83-poeles-a-bois-et-rendement.md`, `chapitres/95-jardin-nordique.md`,
`chapitres/107-souder-braser-reparer-le-metal.md`. Aucun fichier du livre n'a été modifié. Les citations sont mot pour
mot (la mise en gras est retirée, « […] » marque une coupe, les lignes repliées du fichier sont jointes par une
espace) ; les numéros de ligne sont ceux des fichiers au 28 octobre. Les réécritures sont des exemples, sans fait ni
chiffre neuf : quand une réécriture demanderait un fait que le chapitre n'a pas, la place est marquée
`[À VÉRIFIER : …]` pour le rédacteur.

Les trois chapitres sont encore au gabarit à neuf sections (« Pourquoi ça marche », section 8 « Danger », « § »,
tirets) : les tomes 5 et 6 ne sont pas passés à la grande passe. `controle.py` y compte 46, 71 et 44 tirets, et 1, 25
et 33 « § ». Je ne reprends la forme que là où elle casse la consigne. Dans les réécritures, les numéros d'étapes sont
ceux d'aujourd'hui, et « variante d'urgence » remplace « §9 ».

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 83 | 5624 | 286 | 19,7 | 0,59 | 12,6 | 20,6 | 20,7 | 33,9 | 23,4 | 3,0 | 2,7 | 5,3 | 5,6 |
| ch. 95 | 6026 | 308 | 19,6 | 0,69 | 16,9 | 20,8 | 21,2 | 39,3 | 25,3 | 5,6 | 10,6 | 8,8 | 4,2 |
| ch. 107 | 5600 | 308 | 18,2 | 0,66 | 15,9 | 14,9 | 22,1 | 37,0 | 25,3 | 4,6 | 6,8 | 7,0 | 5,9 |
| le lot | 17250 | 902 | 19,1 | 0,65 | 15,2 | 18,7 | 21,3 | 36,8 | 24,7 | 4,5 | 6,8 | 7,1 | 5,2 |

### Le même script, section par section

Extraits faits dans le scratchpad (le script retire les tableaux) : la section 2 (Quand l'utiliser), la section 5
(Procédure) et la section 9 (Variante d'urgence).

| texte | mots | m/phr | ≤6 % | ≥30 % | « : » % | fait:csq % | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 83, section 2 | 357 | 17,0 | 4,8 | 19,0 | 28,6 | 19,0 | 2,8 | **15,0** |
| ch. 95, section 2 | 427 | 15,8 | 18,5 | 25,9 | **59,3** | 18,5 | **0,0** | 11,5 |
| ch. 107, section 2 | 247 | 17,6 | 14,3 | 21,4 | **64,3** | 28,6 | 4,0 | **23,1** |
| ch. 83, procédure | 1557 | 18,8 | 13,3 | 16,9 | 28,9 | 21,7 | 7,7 | 2,4 |
| ch. 95, procédure | 1898 | 17,9 | 17,0 | 15,1 | 36,8 | 26,4 | 7,9 | 1,9 |
| ch. 107, procédure | 1867 | 15,8 | 19,5 | 8,5 | 30,5 | 22,0 | 8,0 | 6,0 |
| ch. 83, variante | 2544 | **20,9** | 12,3 | **25,4** | 37,7 | 25,4 | 4,7 | 6,6 |
| ch. 95, variante | 2607 | 20,1 | 16,9 | 17,7 | 34,6 | 21,5 | **10,0** | 6,2 |
| ch. 107, variante | 2066 | **20,9** | 13,1 | 20,2 | **42,4** | **31,3** | 9,2 | 7,1 |

### La consigne, comptée

Script fait pour cet audit (scratchpad, `etapes-F.py`) : il prend chaque étape numérotée de la section 5, compte ses
mots et ses phrases, les phrases qui commencent par un geste à l'infinitif (« Peser… », « Ne jamais souder… »), les
« se + verbe » (à juger un par un : « le foyer se réchauffe » reste) et les « si » placés après le geste. Les chiffres
sont des ordres de grandeur ; les cas douteux ont été relus à la main.

| texte | étapes | mots par étape | phrases par étape | phrases qui commencent par un geste | étapes de 100 mots et plus | étapes de 70 mots et plus | étapes sans aucune phrase-geste | sous-étapes (a, b, c) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 83 | 30 | 52 | 2,8 | 48 % | 1 (ét. 22 : 103) | 6 | 1 (ét. 18) | 0 |
| ch. 95 | 32 | **59** | 3,2 | **31 %** | 2 (ét. 11 : 143 ; ét. 29 : 120) | **10** | **8** (ét. 14, 16, 17, 22, 23, 24, 26, 30) | 0 |
| ch. 107 | 40 | 47 | 3,0 | 41 % | 2 (ét. 4 : 110 ; ét. 32 : 109) | 5 | 2 (ét. 9, 29) | 0 |

| texte | passages « … » dans les étapes | impératifs en « vous » recopiés | mentions de la source dans le texte | consignes au pronominal (chapitre) | lignes Points de contrôle | lignes Signes d'échec | lignes de Matériel avec tiret / avec « → § » |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 83 | 12 | 3 | 0 | ≈ 20 (surtout en variante) | **12** | **12** | 5 sur 5 / 1 |
| ch. 95 | **25** | **21** | **13** | ≈ 10 | **18** | **14** | 4 sur 4 / 3 |
| ch. 107 | 14 | 1 | 1 | ≈ 15 | **17** | **15** | 9 sur 9 / 3 |

Ce que disent les chiffres, pour mon regard :

- **Dans la procédure, les phrases ne sont pas longues** (15,8 à 18,8 mots) et les mots de liaison y sont même plus
  nombreux que dans le reste du livre (7,7 à 8,0 pour 1000, contre 5,4) : ce sont les « puis » d'une suite de gestes.
  Le défaut de tempo des étapes n'est pas la longueur de la phrase ; c'est **l'ordre dans l'étape** (le pourquoi avant
  le geste, l'avant après l'après) et **la taille de l'étape** (52 à 59 mots, cinq étapes de plus de 100 mots, aucune
  sous-étape dans tout le lot).
- **Moins d'une phrase sur deux commence par un geste** (31 % au ch. 95). Le reste explique, cite ou commente. Dans une
  étape du ch. 95 sur quatre, aucune phrase ne dit ce qu'on fait.
- **La variante d'urgence est l'endroit où la consigne se défait** : les phrases s'y allongent (20 à 21 mots, une sur
  quatre de 30 mots et plus au ch. 83), le « fait : conséquence » y monte (31 % au ch. 107), et les fabrications (la
  truie, le ramonage, le fer à souder) y sont racontées en prose au pronominal au lieu d'être numérotées. Seule la
  partie A du ch. 107 (souder avec des batteries) est en étapes, et c'est la meilleure page du lot.
- **La section 2 est un plaidoyer** : deux phrases sur trois y ont un deux-points aux ch. 95 et 107 (59 % et 64 %), et
  une phrase sur quatre ou cinq y commence comme la précédente (« Quand la pièce… », « Le… »).
- **Les tableaux font 88 lignes pour 48 au plus** (5 à 8 par tableau, six tableaux).

Aucune série orange dans le lot. Pour les ch. 95 et 107, c'est juste. Pour le ch. 83, non : voir le défaut 1.

## 2. Les défauts, du plus grave au moins grave

### Défaut 1. Les gestes d'urgence rangés au bout du chapitre, et dans le désordre (gravité haute)

Le ch. 83 a deux situations où les secondes comptent : l'avertisseur de CO qui sonne, le feu de cheminée. CLAUDE.md
demande pour elles une série orange en tête de la procédure. Ici, les gestes sont au fond de la section 8, après 30
étapes et deux tableaux ; les deux tableaux, eux, n'ont pour action que « Section 8 ». Et dans la section 8, le geste
arrive après 100 à 150 mots de mécanisme, dans un ordre qui n'est pas celui où on le fait : on fait sortir tout le
monde, puis on ferme l'arrivée d'air du poêle (qui est dedans), puis on ne rentre pas ; pour le feu de cheminée, « sortir
tout le monde » est dit deux paragraphes avant le premier geste, qui est de fermer l'air.

Fréquence : ch. 83, deux situations urgentes sur deux hors de la procédure ; trois cases « Section 8 » comme seule
action (l. 232, 234, 235). Le ch. 107 fait la même chose une fois (« Voir §8, bloc 1 », l. 293).

Exemples :

- **ch. 83, l. 234** (Signes d'échec)
  > | Maux de tête ou nausées au lever, chez une ou plusieurs personnes, qui passent une fois dehors | Exposition au CO pendant la nuit. À 200 ppm, le mal de tête arrive après 2 à 3 h : la durée d'une nuit | Section 8. Ne pas attendre que l'avertisseur sonne |

  Réécriture de la case Action : « Sortir tout le monde dehors, sans s'habiller et sans attendre que l'avertisseur
  sonne. »

- **ch. 83, l. 267 à 273** (section 8)
  > Si l'avertisseur sonne : sortir tout le monde dehors immédiatement, sans s'habiller d'abord. C'est contre tous les réflexes à -35 °C, et c'est pourtant l'ordre : les symptômes peuvent apparaître «dans les minutes suivant l'exposition », et deux minutes à chercher des tuques se paient en perte de conscience. On s'habille dehors. Ensuite : fermer l'arrivée d'air du poêle, ouvrir portes et fenêtres depuis l'extérieur, et ne pas rentrer avant que le chalet ait été aéré à fond et que l'avertisseur soit revenu à son état normal, sans aucun chiffre à l'affichage : tout chiffre affiché veut dire du CO.

  Réécriture, en série orange en tête de la procédure (intertitre « L'avertisseur de CO sonne ») :
  « 1. Sortir tout le monde dehors tout de suite, sans s'habiller : on s'habille dehors. Les malaises peuvent venir
  dans les minutes qui suivent, et deux minutes à chercher les tuques peuvent coûter une perte de connaissance.
  2. Ouvrir les portes et les fenêtres, de l'extérieur.
  3. Ne pas rentrer avant que le chalet soit aéré à fond et que l'avertisseur n'affiche plus aucun chiffre : tout
  chiffre affiché veut dire du CO.
  `[À VÉRIFIER : à quel moment fermer l'arrivée d'air du poêle ; le texte la fait fermer quand tout le monde est déjà
  dehors, puis interdit de rentrer.]` »

- **ch. 83, l. 286 à 288, puis l. 294 à 297, puis l. 299 à 303** (section 8, le feu de cheminée)
  > Dans un chalet de bois, hors réseau, sans borne-fontaine et sans caserne, si la fermeture des arrivées d'air ne l'étouffe pas, il ne reste rien pour l'éteindre : la suite est de sortir tout le monde. […] En cours de feu de cheminée : fermer complètement les arrivées d'air du poêle et la clé de tuyau s'il y en a une, pour couper l'alimentation du conduit. Ne jamais jeter d'eau dans un tuyau rougi : la vaporisation instantanée peut fendre le conduit et le projeter. Arroser plutôt le toit et les abords, du dehors. […] On met la main sur la charpente autour du passage, on y retourne dans la soirée, et on y retourne encore une fois la nuit.

  Réécriture, en série orange (intertitre « Feu de cheminée ») :
  « 4. Fermer complètement les arrivées d'air du poêle, et la clé du tuyau s'il y en a une : le conduit n'a plus d'air.
  5. Ne pas jeter d'eau dans le tuyau rougi : l'eau se change en vapeur d'un coup et peut fendre le conduit et le
  projeter.
  6. Si le feu ne s'étouffe pas, sortir tout le monde, puis arroser le toit et les abords, du dehors.
  7. Quand le tuyau a refroidi, mettre la main sur la charpente autour du passage du tuyau dans le mur ou le toit ;
  y retourner dans la soirée, puis encore une fois la nuit : un feu peut y couver des heures sans fumée du côté de la
  pièce. »

Cause : CLAUDE.md, « Les premières minutes, en orange » (« Un chapitre qui a des gestes urgents (retombées, feu,
monoxyde…) ouvre sa procédure sur la série des premières minutes, dans l'ordre où on les fait ») et le cadre (« La série
orange vient tout de suite après le logigramme, en tête de la section 4 Procédure »). Le chapitre date du gabarit à
neuf sections, où le danger vivait dans un encadré de fin. L'habitude derrière : le danger écrit comme un exposé
(mécanisme, repères, puis geste), le geste en dernier.

### Défaut 2. L'étape qui entasse les gestes, dans un autre ordre que celui du travail (gravité haute)

Une étape du lot fait 52 à 59 mots en moyenne, cinq dépassent 100 mots, et aucune n'est découpée en sous-étapes. Dans
ces étapes, plusieurs gestes se suivent dans un paragraphe, sans dire ce qu'on voit quand c'est fait ; parfois l'ordre
du texte n'est pas celui des mains (« Chauffer […]. Avant de chauffer, percer […] »). Le lecteur qui suit à la lampe
frontale doit relire le paragraphe pour trouver le geste suivant.

Fréquence : 21 étapes de 70 mots et plus sur 102 ; 5 de 100 mots et plus (ch. 83, ét. 22 ; ch. 95, ét. 11 et 29 ;
ch. 107, ét. 4 et 32) ; 0 sous-étape dans le lot.

Exemples :

- **ch. 107, l. 209 à 215** (étape 32)
  > Chauffer large et lentement pour la fonte. La fonte fissure quand un point chauffe et que le reste est froid. Au brasage il en faut peu : une centaine de degrés sur toute la pièce suffit presque toujours, parce que le bronze plie là où la fonte casse ; seule une pièce très lourde ou très tourmentée demande plus. Avant de chauffer, percer un petit trou 1,3 à 2,5 cm au-delà de chaque bout de la fissure : si la chaleur la fait courir, elle s'arrête au trou. Braser, puis laisser refroidir à l'abri de l'air ; le lit de cendre ou de sable sec (ch. 111) ne nuit pas.

  Réécriture : « 32. Braser une fonte fissurée.
  a. Percer un petit trou 1,3 à 2,5 cm au-delà de chaque bout de la fissure : si la chaleur la fait courir, elle
  s'arrête au trou.
  b. Chauffer toute la pièce, large et lentement : la fonte fissure quand un point chauffe et que le reste est froid.
  Au brasage, une centaine de degrés suffit presque toujours, parce que le bronze plie, alors que la fonte casse ; une
  pièce très lourde ou très tourmentée demande plus.
  c. Braser.
  d. Laisser refroidir à l'abri de l'air ; on peut enfouir la pièce dans un lit de cendre ou de sable sec (ch. 111). »

- **ch. 95, l. 146 à 154** (étape 11, 143 mots)
  > Partir à l'intérieur ce qui ne tient pas dans la saison — tomates, poivrons, choux — devant la fenêtre la plus au sud. C'est la seule opération du jardin qui se fait mieux à la maison : en avril on y est tous les jours, la pièce est chauffée et l'électricité fait la lumière. Les plants montent au chalet dans une boîte au moment de la transplantation, et un endurcissement progressif dehors, à l'ombre puis au soleil, leur évite de brûler au premier vent du lac. Au chalet, si on éclaire, on éclaire au 12 V (ch. 85). Et si une génératrice tourne pour ça : jamais dans un bâtiment, jamais dans un garage, jamais sous un auvent. Le monoxyde de carbone est inodore et incolore, il ne réveille pas, et il tue des gens qui dorment à côté d'un appareil qu'ils croyaient assez loin (ch. 3).

  Réécriture : « 11. Partir les tomates, les poivrons et les choux à l'intérieur.
  a. En avril, les semer à la maison, devant la fenêtre la plus au sud : on y est tous les jours, la pièce est
  chauffée et l'électricité donne la lumière.
  b. Au moment de les transplanter, monter les plants au chalet dans une boîte.
  c. Les habituer au dehors peu à peu, à l'ombre d'abord, puis au soleil : sinon, ils brûlent au premier vent du lac.
  d. Au chalet, s'il faut de la lumière, éclairer au 12 V (ch. 85). {!generatrice} Une génératrice qui tourne pour ça
  ne va jamais dans un bâtiment, un garage ou sous un auvent. »
  (La phrase du mécanisme du monoxyde sort : elle est sur la page du danger ; le rappel reste.)

- **ch. 83, l. 167 à 173** (étape 22, 103 mots)
  > La nuit, choisir honnêtement. Il n'existe pas, dans un poêle d'acier de format courant, de charge qui donne à la fois huit heures de chaleur et une combustion propre. Étouffer une grosse charge pour passer la nuit est la manœuvre qui fabrique la créosote et le CO. Trois options réelles : accepter un matin froid et rallumer ; ajouter de la masse autour du poêle (brique, pierre, marmite d'eau pleine), qui restitue la chaleur pendant que le feu meurt proprement ; ou se lever une fois pour une petite charge vive. Ce que le chalet perd comme température pendant ces heures-là est au chapitre 25.

  Réécriture : « 22. Pour la nuit, ne pas étouffer une grosse charge : c'est ce qui fabrique la créosote et le CO. Dans
  un poêle d'acier ordinaire, aucune charge ne donne à la fois huit heures de chaleur et un feu propre. Choisir une de
  ces trois façons :
  a. laisser le feu mourir, accepter un matin froid et rallumer ;
  b. mettre de la masse autour du poêle (brique, pierre, marmite d'eau pleine) : elle rend la chaleur pendant que le
  feu meurt proprement ;
  c. se lever une fois dans la nuit pour mettre une petite charge vive.
  Ce que le chalet perd de chaleur pendant ces heures : ch. 25. »

- **ch. 107, l. 103 à 109** (étape 4, 110 mots)
  > Identifier le métal. À l'aimant : l'acier et la fonte répondent, l'aluminium, le cuivre, le laiton et l'inox de certaines nuances ne répondent pas ou peu. À la lime, dans un coin caché : la fonte s'effrite en poudre grise et laisse une trace mate, l'acier fait un copeau. À l'œil : une surface granuleuse de moulage avec des lignes de joint, c'est de la fonte ; une surface brillante gris-bleu qui ne rouille pas, de l'inox ; une surface gris terne qui donne du blanc à la lime, de l'aluminium. Une pièce zinguée est gris clair, souvent avec de grandes paillettes visibles : c'est du galvanisé, et il se décape avant tout (§5.3).

  Réécriture : « 4. Reconnaître le métal, en trois essais.
  a. Approcher un aimant : il colle à l'acier et à la fonte ; il ne colle pas, ou à peine, à l'aluminium, au cuivre,
  au laiton et à certains inox.
  b. Donner un coup de lime dans un coin qui ne se voit pas : la fonte s'effrite en poudre grise et laisse une trace
  mate ; l'acier fait un copeau ; l'aluminium donne du blanc.
  c. Regarder la surface : grenue, avec les lignes du moule, c'est de la fonte ; brillante, gris-bleu et sans rouille,
  de l'inox ; gris terne, de l'aluminium ; gris clair avec souvent de grandes paillettes, du galvanisé, qu'il faut
  décaper avant tout (étape 16). »

Cause : le cadre (« Une étape qui a plusieurs gestes se découpe en sous-étapes : le geste, où est la chose et comment la
reconnaître, ce qu'on voit quand c'est fait ») et le skill `ecriture`, tableau du 15 octobre, ligne « La procédure tassée
dans une étape » (JP sur la vidange du ch. 3 : « faut pousser la chose plus loin »). L'habitude : l'étape écrite comme
un paragraphe d'explication, autour d'un titre en gras ; le gabarit ne dit rien de la taille d'une étape.

### Défaut 3. La source citée à la place de la consigne (gravité haute)

Au lieu de dire le geste, l'étape recopie la phrase de la page officielle entre guillemets, souvent à l'impératif en
« vous » (« Insérez la truelle », « Arrosez », « Lavez à fond », « pour vous assurer »), puis la commente. Le lecteur
lit deux voix dans la même étape (l'infinitif du livre, le « vous » de la source), le chiffre arrive dans la syntaxe
d'un autre texte (« 15 livres par pouce carré (lb/po²) [103 kilopascals (kPa)] »), et l'étape finit par parler de la
source (« La règle publiée est celle-là, mot pour mot », « le livre n'en invente pas », « Règle d'atelier, non
sourcée »). C'est une attribution qui ne dit pas son nom.

Fréquence : 51 passages entre guillemets dans les étapes (12, 25 et 14), 119 dans les trois chapitres ; 25 impératifs
en « vous » recopiés (21 au ch. 95, 3 au ch. 83, 1 au ch. 107) ; 13 mentions de la source dans le texte du ch. 95
(« publié » ou « publiée » 6 fois, « le livre n'en invente pas » 2 fois, « Règle d'atelier, non sourcée » 4 fois).
Les guillemets d'une étiquette (« sans cadmium ») restent : ils sont justes.

Exemples :

- **ch. 95, l. 119 à 124** (étape 6)
  > Prélever pour l'analyse. «Insérez la truelle et prélevez un peu de terre à une profondeur équivalente à la zone racinaire de la plante cultivée (environ 15 à 30 cm). » «On recommande de faire 6 prélèvements (plus pour un très grand jardin). » Mélanger, et «conservez environ 250 ml (1 tasse) de ce mélange » — pour le laboratoire s'il en reste un, sinon pour les trois tests de terrain de la §9, qui se font sur le même échantillon. Pour le pH seul, l'échantillon se prend «à 20 à 30 centimètres de profondeur ».

  Réécriture : « 6. Prélever la terre pour l'analyse. À six endroits du jardin (plus pour un très grand jardin),
  enfoncer la truelle à la profondeur des racines, 15 à 30 cm, et prendre un peu de terre ; pour le pH seul, la prendre
  à 20 à 30 cm. Mélanger les prélèvements et garder environ 250 ml du mélange : il sert au laboratoire s'il en reste
  un, sinon aux trois tests de terrain de la variante d'urgence. »

- **ch. 95, l. 216 à 220** (étape 25)
  > Rendre le tas inaccessible. La règle publiée est celle-là, mot pour mot : «Rendez inaccessible la nourriture à l'extérieur (compost, ordure ménagère, nourriture pour animaux domestiques…) ». Aucune distance minimale n'est publiée, ni par rapport au camp, ni par rapport au jardin : le livre n'en invente pas. Bac fermé, couvercle lesté — un couvercle qui ne tient que par son propre poids s'ouvre à la première patte.

  Réécriture : « 25. Fermer le bac et lester le couvercle : un couvercle qui ne tient que par son poids s'ouvre à la
  première patte. Garder aussi hors de portée les ordures et la nourriture des animaux. »

- **ch. 95, l. 227 à 232** (étape 27)
  > Laver, même ce qu'on pèle. «Lavez à fond les légumes et les fruits à l'eau courante fraîche, même si vous avez l'intention de les peler. » «Utilisez une brosse à légumes et à fruits propre pour frotter les items dont la surface est ferme, comme les oranges, les melons, les pommes de terre, les carottes ». «Eau courante », au chalet, veut dire de l'eau potable qu'on verse et qui s'écoule — pas une chaudière où trente carottes trempent ensemble dans la même eau qui se salit.

  Réécriture : « 27. Laver à fond tous les légumes, même ceux qu'on va peler, sous de l'eau potable qu'on verse et qui
  s'écoule, jamais en les laissant tremper ensemble dans une chaudière. Frotter les légumes fermes, comme les pommes de
  terre et les carottes, avec une brosse propre. »

- **ch. 107, l. 195 à 199** (étape 28)
  > Ne jamais dépasser 103 kPa (15 lb/po²) au détendeur d'acétylène. Le gaz «peut exploser même en l'absence d'air à une température élevée, à une pression manométrique supérieure à 15 livres par pouce carré (lb/po²) [103 kilopascals (kPa)] ». Le mot important est «même en l'absence d'air » : au-dessus de ce seuil, l'acétylène ne brûle pas, il se décompose, et retirer l'oxygène ne protège de rien. «Pousser un peu » pour couper plus vite n'existe pas.

  Réécriture : « 28. Régler le détendeur d'acétylène à 103 kPa (15 lb/po²) au plus, même pour couper plus vite.
  Au-dessus, l'acétylène chaud peut exploser même sans air : fermer l'oxygène ne protège de rien. »

- **ch. 83, l. 183 à 185** (étape 25)
  > Attendre au moins 7 jours avant de transvider, en brassant «pour vous assurer qu'elles sont parfaitement refroidies ». Des braises survivent des jours sous une cendre froide au toucher.

  Réécriture : « 25. Attendre au moins 7 jours avant de vider le contenant, et brasser les cendres pour vérifier
  qu'elles sont froides jusqu'au fond : des braises restent vivantes des jours sous une cendre froide au toucher. »

Cause : CLAUDE.md, règle 1 (« La provenance ne s'imprime pas ») ; skill `ecriture`, « Les guillemets » (« Pas de
citation de source : la provenance vit dans `suivi/`, jamais dans le texte ») ; cadre (« La source sert à vérifier un
fait, jamais à copier une forme ») ; skill `ecriture`, ligne « La justification du cadrage » pour « le livre n'en
invente pas ». L'habitude : le rédacteur colle la phrase officielle pour prouver son chiffre, et la preuve reste dans
le texte au lieu d'aller dans `suivi/NN-redaction.md`.

### Défaut 4. Les tableaux trop longs, qui redisent les étapes, et dont l'action n'est pas un geste (gravité haute)

Les six tableaux du lot font 12 à 18 lignes chacun : 88 lignes pour 48 au plus. La plupart des lignes sont une étape
redite (« Avant d'allumer | Extincteur, seau, pelle | À portée de bras »). La colonne « Si c'est hors cible » ou
« Action » dit souvent autre chose qu'un geste : un renvoi (« Section 8 », « Voir §7 »), une chute (« Le délai n'est pas
négociable »), un service qui n'existe pas dans le livre (« Consulter sans attendre », « Urgence médicale »), ou une
évidence (« On va les chercher », « Compléter »).

Fréquence : Points de contrôle 12, 18 et 17 lignes ; Signes d'échec 12, 14 et 15 lignes. Aux ch. 95 et 107, chaque
ligne de Points de contrôle reprend une étape (18 sur 18, 17 sur 17) ; au ch. 83, 11 sur 12, et la douzième, la seule
qui apporte une cible neuve, n'a d'étape nulle part (défaut 10). Trois actions « Consulter » ou « Urgence médicale » au
ch. 107 (l. 293, 294, 295).

Exemples :

- **ch. 107, l. 259**
  > | Avant d'allumer | Extincteur, seau, pelle | À portée de bras | On va les chercher |

  Réécriture : *(la ligne sort : c'est l'étape 13)*.

- **ch. 95, l. 273 et 274**
  > | Remplissage des bacs | Mélange | ⅓ compost / ⅔ terreau | Rectifier avant de semer |
  > | Culture en pots | Diamètre | ≥ 25 cm | Pot plus grand, ou espèce à racine courte |

  Réécriture : *(les deux lignes sortent : c'est l'étape 9, et ni l'une ni l'autre ne change une décision qu'on ne
  verrait pas venir)*.

- **ch. 83, l. 213**
  > | Avant de rentrer le bois | Humidité, sur face fraîchement fendue | ≤ 20 %. Bois dur : ≥ 6 mois de séchage | Ne pas rentrer, ou brûler en le sachant et resserrer le ramonage. Six mois sous une bâche fermée ne sèchent rien : c'est la mesure qui tranche, pas le calendrier |

  Réécriture : « | Avant de rentrer le bois | L'humidité, sur une face qu'on vient de fendre | 20 % au plus | Le
  laisser sécher. S'il faut le brûler quand même, ramoner plus souvent | »

- **ch. 107, l. 293 et 294**
  > | Les mêmes symptômes, et du brasage à l'argent ou une baguette inconnue a été utilisé | Peut être une intoxication au cadmium, pas une fièvre des fondeurs. Les symptômes se ressemblent ; l'issue, non | Consulter sans attendre d'aller plus mal. Voir §8, bloc 1. |
  > | Toux et difficulté à respirer, jusqu'à 48 heures après | Œdème pulmonaire possible | Urgence médicale |

  Réécriture : « | Les mêmes malaises, après un brasage à l'argent ou avec une baguette inconnue | Peut-être une
  intoxication au cadmium, et non une fièvre des fondeurs : les malaises sont les mêmes, mais le cadmium peut tuer |
  {!vie-en-jeu} Ce signe veut dire que la vie est en jeu, même si la personne a l'air correcte | » ; même case Action
  pour la toux et le souffle court jusqu'à 48 heures après.

- **ch. 95, l. 298**
  > | Vermine, ou un animal a fouillé le tas | Une matière interdite y est entrée : viande, gras, laitier, excréments | Retirer la matière, refermer, lester. C'est un avertissement, pas un incident isolé (§8) |

  Réécriture : « | Un animal a fouillé le tas | Il y a trouvé de la viande, du gras, des produits laitiers ou des
  excréments | Retirer ces restes, refermer le bac et lester le couvercle | »

Pour le ch. 107, les huit lignes de Points de contrôle qui changent une décision ou qu'on ne verrait pas venir, à
garder : l'historique de la pièce ; la mention « sans cadmium » ; l'acétylène qui a voyagé couché ; le détendeur à
103 kPa au plus ; l'avertisseur de CO quand un moteur tourne ; le jeu du joint au brasage ; la montée en charge ; la
surveillance de 60 minutes ou de 3 heures. Les neuf autres ne font que redire leur étape.

Cause : gabarit et CLAUDE.md (« 5 à 8 lignes chacun, au plus […] Seulement ce qui change une décision ou ce qu'on ne
verrait pas venir ; rien qui redise une étape », JP, 28 octobre 2026 : « personne va lire 50 points de contrôle ») ;
CLAUDE.md, « Aucun numéro de téléphone, aucun service qui répond […] Ce que la phrase disait de la gravité reste : « ce
signe veut dire que la vie est en jeu », puis ce qu'on fait ici ». L'habitude : le tableau bâti comme le résumé de la
procédure, une ligne par étape.

### Défaut 5. « Quand l'utiliser » écrit en plaidoyer, avec « le mauvais choix » (gravité haute)

Les trois sections 2 sont des paragraphes qui défendent la méthode : « Le bon choix. […] Le mauvais choix. »,
« La conduite décrite ici est le bon choix quand : », chaque puce suivie de sa justification, de sa citation et de sa
maxime. Aucune ligne n'est un titre de situation qu'on lirait en feuilletant. Les listes « mauvais choix » portent des
consignes de sécurité qui sont aussi dans les étapes et dans la section 8 : au ch. 107, la pièce de levage est dite à
la section 2, à l'étape 1 et à la fin de la variante d'urgence ; le réservoir, à la section 2, à l'étape 2, à la
section 8 et à la variante H.

Fréquence : 3 chapitres sur 3 ; 357, 427 et 247 mots de prose (sans les tableaux) ; trois listes « mauvais choix »
(4 puces au ch. 83, un paragraphe au ch. 95, un tableau de 8 lignes au ch. 107) ; deux paragraphes « Ce qui n'est pas
dans ce chapitre » ; aucun titre de situation court.

Exemples :

- **ch. 83, l. 24 à 29**
  > La conduite décrite ici est le bon choix quand : […] La pile de bois est comptée et il en manque. Le rendement est la seule variable sur laquelle on agit en janvier : on ne fait pas pousser d'épinette en janvier, mais on peut cesser d'en gaspiller le tiers.

  Réécriture de toute la liste : « Le poêle est le seul chauffage » ; « Il manque du bois pour finir l'hiver » ; « Il
  ne reste que du bois vert ou résineux » ; « Le chalet vient d'être calfeutré ».

- **ch. 83, l. 47 à 50**
  > Il n'y a pas d'avertisseur de monoxyde de carbone en état de marche. Ce n'est pas un mauvais choix, c'est un choix aveugle : «Seul un avertisseur de monoxyde de carbone peut détecter la présence de ce gaz », et aucun sens humain ne prend le relais. La conduite qui réduit le risque sans le mesurer est à la section 9.

  Réécriture : *(sort de la section 2 ; l'avertisseur est au Matériel et à l'étape 26, et la conduite sans avertisseur
  est à la fin de la variante d'urgence)*.

- **ch. 95, l. 21 à 26**
  > Le bon choix. Une trouée qui reçoit vraiment le soleil : «minimum de 6 h par jour » pour les légumes-fruits et les fines herbes, «minimum de 4 à 5 h par jour » pour les légumes feuilles. Quelqu'un est au chalet en juillet et en août — un jardin n'est pas un équipement de fin de semaine, il est un animal qui boit et qui se fait manger dès qu'on tourne le dos. L'eau est à portée de chaudière : le besoin publié est d'«environ 25 litres d'eau par mètre carré, par semaine (incluant l'eau de pluie) », et c'est ce chiffre-là, pas la qualité de la terre, qui plafonne un jardin hors réseau.

  Réécriture : « Une trouée qui a au moins 4 h de soleil par jour » ; « Quelqu'un reste au chalet en juillet et en
  août » ; « De l'eau à portée de chaudière ». (Les heures de soleil par groupe sont à l'étape 1, le volume d'eau à
  l'étape 5.)

- **ch. 95, l. 36 et 37**
  > Ce qu'on demande au jardin, et ce qu'on demande ailleurs. Le tableau ferme des illusions, et c'est l'essentiel de la section.

  Réécriture : *(rien)*.

- **ch. 107, l. 19 à 22**
  > Le bon choix. Quand la pièce est en acier, qu'elle porte une charge et qu'aucun boulon ne peut reprendre l'effort : un bras de remorque fendu, un châssis de traîneau, un support de génératrice, une potence à suspendre un orignal (Alces americanus) qui a plié à la première bête, un pied de poêle, un attelage.

  Réécriture de tout le paragraphe : « Une pièce d'acier qui porte une charge a cassé » ; « La pièce n'existe plus
  nulle part » ; « Une tôle, un tuyau ou un réservoir d'eau est percé » ; « Il faut fabriquer un support, une grille
  ou un crochet ».

- **ch. 107, l. 42**
  > | Sous une bâche ou dans un appentis, parce qu'il pleut | C'est le piège du chapitre : la bâche tendue pour souder au sec ferme le local qu'on croyait ouvert, et une génératrice ne va jamais dans un bâtiment, un garage ou sous un auvent. Voir §8 |

  Réécriture : *(la ligne sort de la section 2)* ; à l'étape 14, où elle sert : « {!generatrice} Si une génératrice ou
  un poste à moteur alimente le travail, le mettre dehors, loin des portes et des fenêtres, jamais sous un auvent ni
  sous une bâche tendue pour souder au sec. »

Cause : CLAUDE.md, « Le gabarit » (« « Quand l'utiliser », c'est juste quand l'utiliser : pas de liste « c'est la
mauvaise procédure quand » […] Chaque ligne est un titre de situation, court ») ; skill `ecriture`, règle 13 ;
`plan/demandes-jp-epreuve-tome-1.md`, n° 7 (« Les tomes 2 à 6 à leur refonte »). Les chapitres datent d'avant la règle
du 28 octobre ; l'ancien gabarit demandait deux listes.

### Défaut 6. Le pourquoi qui passe devant le geste, qui le remplace, ou qui le suit en formule (gravité moyenne)

Quatre formes du même défaut. La raison vient avant le geste (« Écarter trois voisinages. L'eau de ruissellement […].
Écarter donc […] »), et le geste arrive après « Donc ». Le pourquoi prend toute l'étape et le comment manque (l'étape du
buttage dit pourquoi butter en 60 mots, et pas comment). Le titre de l'étape est une formule au lieu d'un geste
(« Le sachet fait foi », « Deux bacs, pas un », « Un ventilateur pousse, il ne tire pas vers le visage »). L'étape finit
sur une maxime ou une justification du cadrage (« C'est l'humidimètre du pauvre », « c'est pourquoi le livre met le
défaut à 3 heures »).

Fréquence : 11 étapes sans aucune phrase qui commence par un geste (8 au ch. 95) ; une dizaine de titres d'étapes en
formule ou en opposition (« …, pas de l'envie », « …, pas à l'œil », « …, et ce n'est pas cosmétique », « La nuit,
choisir honnêtement », « Le moment : », « Les proportions : ») et trois intertitres (« la partie que tout le monde
saute », « l'étape qu'on fait quand tout a l'air fini », « qui est une opération de sécurité ») ; une douzaine de fins
d'étapes en maxime.

Exemples :

- **ch. 95, l. 159 à 164** (étape 13 : le comment manque)
  > Butter les pommes de terre au fur et à mesure, et ce n'est pas cosmétique. Un tubercule qui affleure reçoit la lumière et verdit. Or la pomme de terre se garde dans un endroit frais, sec et à l'abri de la lumière justement pour réduire au minimum la formation de glyco-alcaloïdes — le mécanisme est le même au champ qu'au caveau, la lumière est la lumière. Le buttage est la seule opération du jardin qui empêche un poison de se former. Voir §8.

  Réécriture : « 13. Butter les pommes de terre à mesure qu'elles poussent : ramener de la terre au pied des plants
  pour qu'aucun tubercule ne sorte à la lumière. À la lumière, un tubercule verdit et fabrique des glyco-alcaloïdes, un
  poison que la cuisson ne détruit pas. `[À VÉRIFIER : à quelle hauteur des plants on butte, et combien de fois dans
  l'été.]` »

- **ch. 95, l. 108 à 112** (étape 4 : la raison avant le geste)
  > Écarter trois voisinages. L'eau de ruissellement qui traverse le site vient de plus haut, donc du bois et des animaux : au champ, un légume se contamine par le sol, l'eau contaminée, les animaux sauvages ou domestiques et le fumier mal composté. Écarter donc le jardin de l'aval de la latrine et des eaux grises (ch. 31), de l'endroit où on dépèce et où on lave les carcasses (ch. 61, ch. 23), et du chemin d'eau qui descend du camp.

  Réécriture : « 4. Placer le jardin plus haut que la latrine et les eaux grises (ch. 31), loin de l'endroit où on
  dépèce et lave les carcasses (ch. 61, ch. 23), et hors du chemin de l'eau qui descend du camp. L'eau qui ruisselle
  sur le jardin vient de plus haut, et un légume se contamine par le sol, l'eau, les animaux et le fumier mal
  composté. »

- **ch. 95, l. 176 à 180** (étape 17 : le geste après « Donc »)
  > Deux qualités d'eau, deux usages. Pour les racines et pour tout ce qui sera cuit, l'eau du lac fait le travail. Pour ce qui se mange cru — laitue, radis, épinard —, l'eau qui touche la feuille est de l'eau qui reste sur la feuille, et l'eau contaminée est une des voies de contamination au champ. Donc : arroser au pied et non sur le feuillage, et réserver l'eau traitée du ch. 10 pour le lavage final.

  Réécriture : « 17. Arroser au pied des plants, pas sur les feuilles. L'eau du lac suffit pour les racines et pour ce
  qui sera cuit ; sur la laitue, le radis ou l'épinard qu'on mange crus, l'eau qui touche la feuille y reste, et l'eau
  du lac peut être contaminée. Garder l'eau traitée (ch. 10) pour le dernier lavage. »

- **ch. 107, l. 126 à 128** (étape 9 : le titre en formule)
  > Un ventilateur pousse, il ne tire pas vers le visage. Et jamais un ventilateur dirigé sur la zone du bain de fusion en soudage sous protection gazeuse : il souffle le gaz et le joint se remplit de porosité.

  Réécriture : « 9. Placer le ventilateur pour qu'il pousse la fumée loin du visage, jamais vers lui. En soudage sous
  gaz, ne pas le diriger sur le métal fondu : il chasse le gaz, et le joint se remplit de petits trous. »

- **ch. 83, l. 128 à 131** (étape 14 : la fin en maxime)
  > Compter le temps. Il faut «un bois dur qui a séché au moins six mois ». Pour l'épinette, le sapin, le pin et le tremble, coupés, fendus et empilés tôt au printemps, un été suffit : ils sont prêts à l'automne. L'air humide de la côte allonge ce délai sans qu'on sache de combien ; la bûche témoin tranche. Un chalet qui tient deux ans d'avance ne brûle jamais de vert.

  Réécriture : « 14. Compter le temps de séchage : au moins six mois pour un bois dur. L'épinette, le sapin, le pin et
  le tremble coupés, fendus et empilés tôt au printemps sont prêts à l'automne. L'air humide de la côte allonge ce
  délai d'un temps qu'on ne connaît pas : c'est la bûche témoin qui dit quand le bois est sec (étape 12). »

- **ch. 107, l. 237 à 241** (étape 39 : la justification du cadrage)
  > Porter la surveillance à 3 heures ou plus dès qu'il y a du bois, de l'isolant, un vide sanitaire ou un plancher de planches sous ou autour du travail. Une scorie tombée entre deux planches couve sans flamme et sans odeur pendant des heures : quand elle se déclare, on dort. C'est la situation ordinaire d'un chalet, et c'est pourquoi le livre met le défaut à 3 heures plutôt qu'à 60 minutes dès qu'on travaille sur du bois.

  Réécriture : « 39. S'il y a du bois, de l'isolant, un vide sanitaire ou un plancher de planches sous le travail ou
  autour, surveiller 3 heures ou plus : une scorie tombée entre deux planches peut couver des heures sans flamme ni
  odeur, et prendre feu quand tout le monde dort. »

Cause : skill `ecriture`, règle 2 (« Le fait d'abord, la raison ensuite, et seulement si la raison change ce qu'on
fait ») ; tableau « Les phrases » (la chute en formule, l'opposition fabriquée, la justification du cadrage) ; cadre
(« Les titres de sous-sections sont des noms de gestes ou de choses, pas des maximes »). L'habitude : le rédacteur
écrit pour convaincre (la méthode est juste, voici pourquoi) au lieu d'écrire pour faire faire ; le titre en gras sert
de slogan, et la dernière phrase « ferme » l'étape.

### Défaut 7. La consigne au pronominal, surtout dans la variante d'urgence (gravité moyenne)

Le geste est dit comme si la chose le faisait seule (« la pièce se remplace », « il se manipule avec des gants »,
« La porte se découpe au ciseau à froid »). C'est le plus fréquent dans la variante d'urgence, où les fabrications sont
racontées en prose : la section vitrifiée qu'on brûle, la truie, l'écouvillon (ch. 83), la couche chaude (ch. 95), le
fer à souder et le décapant (ch. 107). Un texte qu'on suit les mains occupées a besoin de gestes numérotés ; la seule
fabrication numérotée du lot (souder avec des batteries, ch. 107, partie A) est aussi la plus claire.

Fréquence : environ 45 consignes au pronominal dans le lot (environ 20 au ch. 83, 10 au ch. 95, 15 au ch. 107), dont
plus de la moitié dans les variantes d'urgence ; une seule fabrication sur une dizaine est en étapes numérotées.

Exemples :

- **ch. 83, l. 429 à 434** (variante d'urgence)
  > Une section de tuyau simple paroi vitrifiée se démonte, se transporte loin du bâtiment, se couche sur la roche ou la terre nue, et on y allume un feu de branches sèches. Le dépôt brûle là où le conduit ne traverse plus aucun mur — c'est la seule façon de l'enlever sans produit et sans brosse. Rien d'inflammable à portée, le vent dans le dos, et on reste dessus jusqu'à ce que ce soit froid. La section en ressort bleuie, parfois gauchie : elle se jette si elle ne redevient pas ronde et étanche à l'assemblage, parce qu'un joint qui ne ferme plus fuit les gaz dans la pièce.

  Réécriture : « 1. Démonter la section de tuyau simple paroi vitrifiée. 2. La porter loin du bâtiment et la coucher
  sur la roche ou la terre nue, sans rien d'inflammable autour, le vent dans le dos. 3. Allumer dessus un feu de
  branches sèches : le dépôt brûle loin de tout mur. Rester là jusqu'à ce que tout soit froid. 4. Remonter la section
  seulement si elle redevient ronde et ferme bien au joint ; sinon, la jeter : un joint qui ne ferme plus laisse
  passer les gaz dans la pièce. »

- **ch. 83, l. 453 à 457** (variante d'urgence, la truie)
  > La porte se découpe au ciseau à froid dans un des bouts du baril, et le morceau découpé devient la porte : charnières boulonnées, barre de fermeture à came, et le jeu du pourtour comblé au même mortier d'argile que les joints de tuyau. La sortie se perce à l'autre bout, en haut et non au milieu du dessus : les gaz doivent parcourir toute la longueur du baril avant de partir, sinon la flamme sort directement dans le tuyau et tout ce qu'elle emporte se dépose.

  Réécriture : « 1. Découper la porte au ciseau à froid dans un bout du baril, et garder le morceau : c'est la porte.
  2. Lui boulonner des charnières et une barre de fermeture à came, puis boucher le jeu du pourtour avec le mortier
  d'argile des joints de tuyau. 3. Percer la sortie à l'autre bout, en haut, pas au milieu du dessus : les gaz font
  toute la longueur du baril avant de partir ; sinon la flamme file droit dans le tuyau et y dépose tout ce qu'elle
  emporte. »

- **ch. 107, l. 503 à 505** (variante d'urgence F)
  > Un fer à souder est un bloc de cuivre au bout d'une tige, avec un manche de bois : il se chauffe dans la braise ou sur la plaque du poêle, il se nettoie à la lime, et il s'étame une fois avant de servir.

  Réécriture : « Le fer à souder est un bloc de cuivre au bout d'une tige, avec un manche de bois. Le chauffer dans la
  braise ou sur la plaque du poêle, le nettoyer à la lime, et l'étamer une fois avant de s'en servir. »

- **ch. 95, l. 190 à 194** (étape 21)
  > Si le lièvre finit au collet en bordure du jardin, il se manipule avec des gants étanches — caoutchouc, ou un sac de plastique sur la main, jamais le gant de jardin : la tularémie passe par la peau et les muqueuses au moment du dépouillement, et un jardinier a les mains éraflées (ch. 48).

  Réécriture : « {!tularemie} Si on prend un lièvre au collet près du jardin, le manipuler avec des gants étanches en
  caoutchouc, ou avec un sac de plastique sur la main, pas avec des gants de jardin : la tularémie entre par la peau et
  les muqueuses quand on dépouille la bête, et un jardinier a les mains éraflées (ch. 48). »

- **ch. 107, l. 92 à 94** (étape 1)
  > Si la réponse contient «au-dessus de quelqu'un », la pièce se remplace, elle ne se soude pas (ch. 109). Si elle contient «sous pression », idem (ch. 78).

  Réécriture : « Si la réponse contient « au-dessus de quelqu'un » ou « sous pression », ne pas souder la pièce : la
  remplacer, ou ne plus s'en servir (ch. 109, ch. 78). »

- **ch. 95, l. 224** (étape 26)
  > Les feuilles se coupent le matin et vont au froid tout de suite

  Réécriture : « 26. Couper les légumes feuilles le matin et les mettre au froid tout de suite »

Cause : CLAUDE.md (« Jamais au pronominal quand quelqu'un fait le geste ») ; skill `ecriture`, tableau du 15 octobre,
ligne « La consigne au pronominal » ; gabarit, section 9 (« chaque fois qu'une manière de faire avec rien existe, elle
se trouve ici, détaillée, pas mentionnée »), qui demande le détail sans demander les étapes. L'habitude : le présent de
vérité générale du manuel (« ça se fait comme ça »), et la variante d'urgence pensée comme un texte suivi plutôt que
comme une procédure.

### Défaut 8. Le geste sans verbe : liste de noms, participes en chaîne, série qui mêle noms et verbes (gravité moyenne)

L'étape donne une liste de choses au lieu des gestes (« Étau, serre-joints, pinces-étau, cales »), une chaîne de
participes (« une bûche moyenne, pesée, masse et date écrites dessus au crayon gras, remise au milieu de la pile et
repesée »), ou une série qui commence avec des noms et finit avec des infinitifs (« chalumeau, puis robinets de
bouteilles, puis purger les tuyaux »). Le lecteur doit reconstruire qui fait quoi.

Fréquence : une dizaine d'étapes (ch. 83, ét. 12, 15, 16, 18 ; ch. 95, ét. 23 ; ch. 107, ét. 19, 21, 29, 33, 40).

Exemples :

- **ch. 83, l. 122 à 125** (étape 12)
  > Marquer une bûche témoin : une bûche moyenne, pesée, masse et date écrites dessus au crayon gras, remise au milieu de la pile et repesée une fois par mois. Tant que la masse baisse, le bois sèche ; quand elle cesse de baisser, le bois est aussi sec que le site le permet. C'est l'humidimètre du pauvre, et il ne se brise pas.

  Réécriture : « 12. Choisir une bûche moyenne, la peser, écrire son poids et la date dessus au crayon gras, et la
  remettre au milieu de la pile. La repeser une fois par mois : tant que le poids baisse, le bois sèche ; quand il ne
  baisse plus, le bois est aussi sec qu'il peut l'être à cet endroit. »

- **ch. 83, l. 135 et 136** (étape 15)
  > Allumer par le haut. Deux ou trois grosses bûches au fond, serrées, puis le moyen, puis le menu, puis l'allume-feu au sommet, et on met le feu au sommet.

  Réécriture : « 15. Allumer par le haut. Poser au fond deux ou trois grosses bûches serrées, puis le bois d'allumage
  moyen, puis le menu, et l'allume-feu par-dessus. Allumer l'allume-feu. »

- **ch. 107, l. 172 et 173** (étape 21)
  > S'habiller au complet avant d'amorcer : cuir, manches baissées, col fermé, gants, lunettes sous le masque, pantalon par-dessus les bottes.

  Réécriture : « 21. Avant d'amorcer l'arc, s'habiller au complet : mettre le cuir et les gants, baisser les manches,
  fermer le col, mettre les lunettes sous le masque et le bas du pantalon par-dessus les bottes. »

- **ch. 107, l. 216 et 217** (étape 33)
  > Fermer dans l'ordre à la fin : chalumeau, puis robinets de bouteilles, puis purger les tuyaux, puis détendre les vis de détendeurs.

  Réécriture : « 33. À la fin, fermer le chalumeau, puis les robinets des bouteilles. Ensuite, purger les tuyaux, puis
  desserrer les vis des détendeurs. »

- **ch. 107, l. 200 à 202** (étape 29)
  > Aucune graisse, aucune huile, nulle part sur un raccord d'oxygène, ni sur les gants qui le touchent. «En présence d'oxygène, l'huile et la graisse peuvent s'enflammer facilement et brûler violemment ».

  Réécriture : « 29. Ne mettre ni graisse ni huile sur un raccord d'oxygène, et ne pas y toucher avec des gants gras :
  avec l'oxygène, l'huile et la graisse prennent feu facilement et brûlent violemment. »

- **ch. 83, l. 143** (étape 16)
  > Pare-étincelles en place avant d'allumer, briquet long de type BBQ.

  Réécriture : « Mettre le pare-étincelles en place avant d'allumer, et allumer avec un briquet long, de type BBQ. »

Cause : skill `ecriture`, règle 0 (« un verbe qui dit le geste […] Pas une liste de noms qui tient lieu d'actions » ;
« pas de participe en chaîne ») et règle 12 (« Une liste après deux-points ne mélange pas deux sortes de choses »).
L'habitude : la note d'atelier, la liste à cocher écrite en noms.

### Défaut 9. La condition placée après le geste (gravité moyenne)

Le geste est dit d'abord, la condition qui le déclenche arrive en fin de phrase (« Entrouvrir […] une fenêtre […] si le
chalet est étanche »). Le lecteur fait le geste, puis apprend qu'il ne le fallait peut-être pas. Le cas le plus lourd :
une étape dont le titre en gras dit le geste par défaut, et la phrase suivante donne l'exception (« Travailler dehors.
[…] À l'intérieur seulement si […] »).

Fréquence : une dizaine dans le lot (ch. 83, ét. 6, 17, 20, 29 ; ch. 95, ét. 9 ; ch. 107, ét. 7, 38, 39 ; variante
d'urgence B du ch. 107). Les « seulement quand » courts (ch. 83, ét. 20) se lisent bien et peuvent rester.

Exemples :

- **ch. 83, l. 146 à 148** (étape 17)
  > Entrouvrir en même temps une fenêtre de la pièce du poêle si le chalet est étanche — c'est le problème du chalet calfeutré (section 3).

  Réécriture : « Si le chalet est étanche, entrouvrir en même temps une fenêtre de la pièce du poêle. »

- **ch. 107, l. 118 à 121** (étape 7)
  > Travailler dehors. C'est la règle par défaut du chapitre, et elle règle d'un coup la ventilation, le monoxyde et la moitié du risque d'incendie. À l'intérieur seulement si la pièce ne peut pas sortir, et alors avec porte et fenêtre ouvertes et un courant d'air traversant.

  Réécriture : « 7. Travailler dehors. Si la pièce ne peut pas sortir, travailler à l'intérieur avec la porte et la
  fenêtre ouvertes, pour que l'air traverse. »

- **ch. 107, l. 234 à 236** (étape 38)
  > Surveiller l'aire de travail pendant au moins 60 minutes après l'arrêt du travail, «y compris durant les pauses », et aux niveaux inférieurs si des étincelles ou des scories ont pu tomber.

  Réécriture : « 38. Après le travail, et à chaque pause, surveiller l'endroit où on a travaillé pendant au moins
  60 minutes. Si des étincelles ou des scories ont pu tomber à l'étage du dessous, surveiller aussi en dessous. »

- **ch. 83, l. 97 à 100** (étape 6)
  > Couper à la longueur du foyer, et toujours à la même longueur si on veut pouvoir compter : 30, 40 ou 50 cm. Garder au moins 7,5 cm de jeu par rapport à la dimension intérieure du foyer : une bûche qu'on doit forcer se coince en travers du chargement suivant.

  Réécriture : « 6. Couper toutes les bûches à la même longueur, 30, 40 ou 50 cm selon le foyer, avec au moins 7,5 cm
  de jeu à l'intérieur du foyer : une bûche qu'on doit forcer se coince en travers de la charge suivante. Une seule
  longueur permet de compter la pile. »

- **ch. 95, l. 135 à 137** (étape 9)
  > Monter les bacs, si on en monte. Remplissage : «un tiers de compost à deux tiers de terreau ». En pots, diamètre minimal de «25 cm ». Bois : thuya ou épinette non traités, métal, ou plastique recyclé.

  Réécriture : « 9. Si on monte des bacs, les faire en thuya ou en épinette non traités, en métal ou en plastique
  recyclé, et les remplir d'un tiers de compost pour deux tiers de terreau. Pour cultiver en pots, prendre des pots
  d'au moins 25 cm de diamètre. »

- **ch. 107, l. 452 et 453** (variante d'urgence B)
  > Les trous se percent au vilebrequin à main si la perceuse est morte, ou se poinçonnent au rouge sur une enclume improvisée (ch. 111).

  Réécriture : « Si la perceuse est morte, percer les trous au vilebrequin à main, ou les poinçonner au rouge sur une
  enclume improvisée (ch. 111). »

Cause : skill `ecriture`, règle 3 (« La condition avant le geste. « Si l'eau est trouble, la filtrer avant de la
désinfecter. » »). L'habitude : le verbe en gras en tête d'étape fixe le geste, et la condition s'ajoute ensuite en
rallonge.

### Défaut 10. Le chiffre et l'outil qui ne sont pas à leur place (gravité basse)

Un calcul qu'aucune étape n'utilise (le volume de la corde, au ch. 83) ; une cible de tableau dont l'instrument n'est ni
au Matériel ni dans une étape (le thermomètre du tuyau) ; la dose dans une étape et le geste qui va avec dans la
variante d'urgence (la cendre, au ch. 95) ; le chiffre impérial d'abord, dans la phrase de la source (« 100 pi/min
(0,5 m/s) »). Et les lignes de Matériel, qui ont toutes un tiret au lieu du deux-points, sept flèches « → §9 », et
parfois le danger ou « ni… ni » au lieu de ce que l'objet fait.

Fréquence : 18 lignes de Matériel sur 18 avec un tiret, 7 avec « → § » ; un calcul inutilisé (ch. 83, ét. 1 et 2) ; une
cible sans instrument (ch. 83, l. 215) ; trois chiffres séparés de leur geste.

Exemples :

- **ch. 83, l. 78 à 88** (étapes 1 à 3)
  > Mesurer la pile telle qu'elle est empilée. Une corde est de 4 × 4 × 8 pi, soit 128 pi³ ou 3,6 m³ de volume apparent. Noter la mesure en mètres : hauteur × largeur × longueur. […] Convertir en bois massif. Le bois massif fait «environ 70 p. 100 » du volume empilé, le reste étant les interstices. Une corde contient donc environ 2,5 m³ de bois massif (3,6 × 0,70). […] Peser. Choisir cinq bûches représentatives, les peser une à une, prendre la moyenne, et multiplier par le nombre de bûches estimé dans la pile. C'est le seul chiffre qui veut dire quelque chose […]

  Les étapes 1 et 2 calculent un volume qu'aucune étape n'utilise, et l'étape 3 dit elle-même que seul le poids compte ;
  elle multiplie ensuite par un « nombre de bûches estimé » sans dire comment l'estimer. Réécriture : « 1. Peser cinq
  bûches moyennes de la pile, une à une, et faire la moyenne. 2. La multiplier par le nombre de bûches de la pile :
  c'est la réserve, en kilogrammes. À poids sec égal, les bois de chauffage donnent à peu près la même chaleur : c'est
  le poids qui compte, pas le volume. `[À VÉRIFIER : comment compter ou estimer les bûches d'une pile ; si c'est par
  le volume, les étapes 1 et 2 d'aujourd'hui servent ici, et le calcul se fait jusqu'au bout.]` »

- **ch. 83, l. 215** (Points de contrôle)
  > | En régime | Flammes sur la charge, et température de surface du tuyau | Flammes vives en continu sur la charge, jusqu'au charbon. Pas de fenêtre de température qui vaille pour tous les poêles ; un seul plafond : jamais plus de 460 °C au thermomètre du tuyau pendant plus de quelques minutes — et le thermomètre magnétique lit plus bas que la sonde, donc 460 °C sur la tôle, c'est déjà trop | Charge qui fume sans flamme : rouvrir l'air. Tuyau froid : créosote. Tuyau surchauffé : feu de cheminée |

  Réécriture : « | En régime | Les flammes sur la charge ; le thermomètre posé sur le tuyau | Des flammes vives sur toute la
  charge jusqu'au charbon ; jamais 460 °C plus de quelques minutes (le thermomètre magnétique lit plus bas que la
  sonde) | Charge qui fume sans flamme : rouvrir l'air. `[À VÉRIFIER : le geste quand le tuyau dépasse 460 °C]` | »,
  et le thermomètre du tuyau entre au Matériel et dans une étape qui dit où le poser `[À VÉRIFIER]`.

- **ch. 95, l. 125 à 129** (étape 7)
  > Viser un pH de 6 à 6,5. Un sol de forêt boréale sera plus acide. Aucune dose de chaux n'est donnée ici : elle est calculée dans le rapport d'analyse, en fonction de la texture et du pH mesuré. Le livre n'en invente pas. Sans rapport, on corrige par petites touches et on juge sur ce qui pousse : cendre de poêle, coquilles de la grève concassées, os brûlés — tout ça est à la §9. La cendre a une dose : environ 100 g par mètre carré et par an. La coquille et l'os n'en ont pas.

  Réécriture : « 7. Viser un pH de 6 à 6,5 ; un sol de forêt boréale est plus acide. Avec un rapport d'analyse, mettre
  la chaux à la dose qu'il donne. Sans rapport, corriger par petites touches et juger sur ce qui pousse : mêler à la
  terre, avant de semer, environ 100 g de cendre de poêle par mètre carré et par an, jamais au pied des bleuets ;
  mettre les coquilles concassées et les os brûlés en petite quantité, une fois l'an (variante d'urgence). »

- **ch. 107, l. 122 à 125** (étape 8)
  > Placer le poste de manière que le panache parte de côté. Pas vers le visage, pas vers la porte du chalet. Cible : l'air traverse l'arc «à une vitesse d'au moins 100 pi/min (0,5 m/s) ». Sans anémomètre, le repère utilisable est visuel : le panache doit partir franchement, pas monter mollement. Si on utilise une hotte improvisée, «la distance optimale de la hotte par rapport à l'arc correspond environ au diamètre du conduit d'extraction ».

  Réécriture : « 8. Placer le poste pour que la fumée parte de côté, ni vers le visage ni vers la porte du chalet. Elle
  doit partir franchement, pas monter mollement : c'est le repère quand on n'a pas d'anémomètre (le courant d'air visé
  est d'au moins 0,5 m/s). Avec une hotte improvisée, la placer à une distance de l'arc à peu près égale au diamètre de
  son tuyau. »

- **ch. 83, l. 70** (Matériel)
  > - Contenant à cendres métallique à couvercle — des braises survivent des jours sous la cendre. Ni plastique, ni carton.

  Réécriture : « - **Contenant à cendres en métal, avec couvercle** : garde enfermées les braises qui restent vivantes
  des jours sous la cendre. »

- **ch. 107, l. 84** (Matériel)
  > - Avertisseur de monoxyde — dès qu'un moteur tourne : le gaz n'a ni odeur ni couleur, et rien d'autre ne le détecte.

  Réécriture : « - **Avertisseur de monoxyde** : le seul moyen de savoir qu'il y a du CO quand un moteur tourne. »

Cause : CLAUDE.md, « Le Matériel ne liste que l'indispensable […] une ligne par item » et « Pas de tiret […] Les lignes
de matériel aussi : « Thermomètre à sonde : porte les 74 °C à cœur. » » ; règle 3 de CLAUDE.md (métrique partout) ;
skill `ecriture`, règle 5 (« Le chiffre avec son unité […] À défaut de chiffre, le repère observable »). L'habitude : le
chiffre sourcé posé là où on l'a trouvé, pas là où le geste s'en sert ; les tableaux et le Matériel écrits avant la
procédure et jamais recoupés avec elle.

## 3. Ce qui marche : des modèles

1. **ch. 107, l. 405 à 408** (variante d'urgence A, étape 1)
   > Monter en série, pas en parallèle. Le + de la première va au − de la deuxième, le + de la deuxième au − de la troisième. Il reste un + libre à un bout et un − libre à l'autre : ce sont les deux seules bornes qu'on touche. Deux + réunis, c'est du parallèle : ça donne toujours 12 V et ça ne fera jamais d'arc.

   Le geste, puis comment il se fait borne par borne, puis ce qu'on voit quand c'est fait (deux bornes libres), puis
   l'erreur où mène le réflexe et ce qu'on verra si on la fait. Toute la partie A est en étapes numérotées, chacune
   avec un titre-geste : c'est la seule fabrication du lot qu'on peut suivre les mains occupées.

2. **ch. 107, l. 176 à 181** (étapes 22 et 23)
   > Faire un essai sur une chute du même métal et de la même épaisseur. Régler l'intensité là, pas sur la pièce. Trop peu : l'électrode colle et le cordon reste bombé sans se fondre aux bords. Trop : ça creuse, ça troue, ça projette. […] Pointer d'abord. Quelques points courts et espacés, puis vérifier l'alignement, puis seulement souder en continu. Une pièce qu'on soude d'un trait tire en refroidissant et sort de l'équerre.

   Un geste par phrase, l'ordre dit avec « puis », les deux signes qu'on voit sur la chute pour régler, et un pourquoi
   d'une phrase, après le geste, qui change la façon de faire. Rien qui commente.

3. **ch. 83, l. 160 à 165** (étapes 20 et 21)
   > Réduire l'air seulement quand la charge est pleinement enflammée, jamais au point d'éteindre les flammes. Tant qu'il y a des flammes vives sur toute la charge, les gaz brûlent ; dès qu'il ne reste que de la fumée qui roule sans flamme, ils partent intacts dans le tuyau. […] Brûler la braise avant de recharger. Racler les braises vers l'avant, sous l'arrivée d'air, et poser la charge suivante derrière.

   Le repère qu'on voit par la vitre (des flammes vives, ou de la fumée qui roule) décide du geste ; le second geste dit
   où mettre les braises et où poser la charge. C'est le tempo d'une consigne : geste, repère, geste. (L'étape 21 perd
   sa dernière phrase, la maxime du « charbon […] moitié propre du combustible ».)

4. **ch. 95, l. 481 à 483** (variante d'urgence)
   > Le point de puisage. Creuser un trou dans le bas du terrain jusqu'à ce qu'il se remplisse, le border de pierres pour qu'il ne s'effondre pas, le couvrir d'une planche : trente pas au lieu de trois cents.

   Trois gestes à l'infinitif dans l'ordre où on les fait, le premier avec ce qu'on voit quand c'est fait (« jusqu'à ce
   qu'il se remplisse »), le deuxième avec son but, et le gain dit en pas, dans les mots du lecteur.

5. **ch. 83, l. 302 et 303** (section 8)
   > On met la main sur la charpente autour du passage, on y retourne dans la soirée, et on y retourne encore une fois la nuit.

   Un geste de la main, sur un endroit précis, et le moment de chaque visite dit par les heures de la journée de la
   famille, pas par une durée à calculer. C'est la seule ligne du feu de cheminée qu'on suit sans relire.

## 4. Pour le skill et les auditeurs

Ce que mon lot ajoute, pour le skill réécrit et pour un auditeur « consigne » :

- **La forme d'une étape**, à écrire dans le skill : (la condition) → le geste à l'infinitif, un par phrase → ce qu'on
  voit quand c'est fait. Le pourquoi : une proposition, après le geste, seulement s'il change la façon de faire. Les
  modèles du lot font 30 à 60 mots ; au-delà de 60 mots ou de trois gestes, des sous-étapes a, b, c.
- **Le tempo d'une procédure n'est pas celui d'un paragraphe.** Dans le lot, les phrases des étapes sont courtes et ont
  leurs « puis » ; ce qui casse, c'est l'ordre (le pourquoi d'abord, l'avant après l'après) et la dernière phrase en
  maxime. Le même « fait : conséquence » sans liaison que JP a entendu dans le paragraphe du monoxyde revient dans les
  étapes sous la forme : titre-geste, puis « Fait : conséquence. », puis une chute.
- **La variante d'urgence est une procédure** : toute fabrication de trois gestes et plus s'y écrit en étapes
  numérotées, comme la partie A du ch. 107. Le gabarit dit « détaillée, pas mentionnée » ; il devrait dire aussi « en
  étapes ».
- **Les gestes urgents ne vivent pas dans une page de danger** : quand un chapitre au vieux gabarit a une section 8
  qui contient un geste à faire dans les minutes, la grande passe en fait une série orange en tête de procédure, dans
  l'ordre réel, avant de couper la section 8.
- **Ce qu'un auditeur « consigne » peut compter à la machine**, chapitre par chapitre : mots par étape et étapes de
  70 mots et plus ; part des phrases d'étape qui commencent par un geste ; étapes sans aucune phrase-geste ; passages
  « … » dans une étape et impératifs en « -ez » ; « publié », « non sourcée », « le livre » dans le texte ; « se +
  verbe » en tête de consigne ; « si » placé après le verbe de tête ; lignes des tableaux au-delà de 8 ; cases d'action
  « Section N », « Voir », « Consulter », « Urgence » ; tirets et « → » dans le Matériel ; intertitres avec un tiret.
  Le jugement reste humain : l'ordre des gestes, le comment qui manque, le chiffre qu'aucune étape n'utilise.

## 5. Liste de contrôle (cadre, parties « Pour tout agent », « Le texte » et « La langue »)

- [x] `CLAUDE.md` chargé, pas relu ; cadre lu au complet ; skill `ecriture` et gabarit lus au complet ; mesures et
  demandes de JP sur l'épreuve lues.
- [x] `suivi/plan-de-match.md` : cherché par les numéros neufs (83, 95, 107) et anciens (15, 74, 84) ; seul point :
  la ligne du 00b sur les baguettes sans cadmium (ch. 107), devenue sans objet avec le 00b coupé.
- [x] Règle 1 : aucune réécriture n'ajoute un fait ni un chiffre ; quatre places marquées `[À VÉRIFIER]` (l'arrivée
  d'air du poêle quand l'avertisseur sonne ; la hauteur du buttage ; le compte des bûches d'une pile ; le thermomètre du
  tuyau et le geste au-dessus de 460 °C).
- [x] Rien de commité ; aucun fichier du livre modifié ; seul ce fichier de notes est écrit (scripts de mesure dans le
  scratchpad).
- [x] Lu seulement le lot, les règles et les mesures ; sorties de commande coupées.
- [ ] Sept sections : les trois chapitres sont encore à neuf ; noté, hors de mon regard sauf la section 8 qui garde
  des gestes urgents (défaut 1).
- [x] Section 2 seulement quand l'utiliser, en titres de situation : défaut 5, titres proposés pour les trois chapitres.
- [x] Série orange : manque au ch. 83 (CO, feu de cheminée), série proposée dans l'ordre réel (défaut 1) ; juste de
  ne pas en avoir aux ch. 95 et 107.
- [x] Règle 0 : chaque réécriture relue à voix haute, un verbe par geste, on sait qui le fait.
- [x] Pas de maxime ni de chute : défaut 6 ; aucune dans les réécritures.
- [x] Pas de chose qui pense : relevé en passant (« la surface […] ment », « son zéro veut dire « sous ce que je sais
  lire » », « le courant cherche ») ; hors de mon regard, laissé au regard de la voix.
- [x] Jamais au pronominal : défaut 7 ; réécritures à l'infinitif.
- [x] Consigne dite comme une consigne, ordre naturel, condition avant : défauts 7 et 9.
- [x] Points de contrôle et Signes d'échec à 5 à 8 lignes : défaut 4 ; huit lignes à garder proposées pour le ch. 107.
- [x] Un passage lourd se juge d'abord (doit-il exister ?) : plusieurs réécritures sont des coupes (lignes de tableau,
  « Le tableau ferme des illusions », la puce de l'avertisseur en section 2, les fins en maxime).
- [x] Le chapitre parle de son sujet : la ligne de la bâche (ch. 107) ramenée à l'étape où elle sert ; le mécanisme du
  CO de l'étape 11 du ch. 95 renvoyé à la page du danger, le rappel gardé.
- [x] Qui fait quoi, quand et pourquoi, sans détour : défauts 1, 2 et 6.
- [x] Le mot qu'on dit : « les habituer au dehors » pour « endurcissement », « de petits trous » pour « porosité », « le
  métal fondu » pour « le bain de fusion », « perte de connaissance ».
- [x] On nomme la chose au lieu du possessif (« le robinet » devenu « les robinets des bouteilles », « les vis des
  détendeurs », « le passage du tuyau dans le mur ou le toit »).
- [x] Aucun tiret ni « § » dans les réécritures (« variante d'urgence » au lieu de « §9 »).
- [x] Titres d'étapes : des gestes (défaut 6) ; intertitres en formule relevés.
- [x] Étape à plusieurs gestes en sous-étapes : défaut 2 (aucune planche appelée dans les étapes réécrites).
- [x] Autre façon dite comme une autre façon : les trois façons de passer la nuit (ch. 83, ét. 22) en a, b, c.
- [x] L'urgence ne s'appuie pas sur une préparation : la série du CO commence par sortir, sans rien d'apprêté.
- [x] Inventaire des faits : fait pour les consignes redites entre section 2, étapes, section 8 et variante (ch. 107 :
  pièce de levage, réservoir) ; l'inventaire complet revient au regard de la densité.
- [x] `controle.py` lancé sur les trois chapitres : 46, 71 et 44 tirets ; 1, 25 et 33 « § » ; aucune section
  « pronominal » dans le script (compte fait à la main, défaut 7).
- [ ] `langue.py` : pas lancé, je n'écris aucun texte qui s'imprime ; les réécritures passeront au correcteur.
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures ; accords, « a / à », participes relus.
