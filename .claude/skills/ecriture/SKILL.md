---
name: ecriture
description: Écrire, réécrire ou resserrer le texte du Manuel du Nord comme un livre technique professionnel, informatif, qui ne sonne pas écrit par une IA. Utilise ce skill dès qu'on écrit ou retouche un chapitre, un encadré, une étape, une ligne de matériel, une légende ou une note ; dès qu'on lance une passe de style sur un ou plusieurs chapitres ; et chaque fois que JP dit « trop AI », « fils d'la AI », « c'est inutile », « c'est long pour rien », « c'est poétique », « faut que ça soit informatif » ou se plaint des tirets. Il porte la phrase et le mot. Le fond (chiffres, sources, sécurité) est dans CLAUDE.md ; la structure des neuf points, dans gabarit-chapitre.md.
---

# L'écriture : un livre technique, pas un texte d'IA

Le Manuel du Nord se lit à la lampe frontale, dans l'urgence, par quelqu'un de compétent de ses
mains. Chaque phrase doit lui donner un fait, un geste, une mesure ou un signe à reconnaître. Rien d'autre.

## Ce que JP a dit (15 octobre 2026, relecture du tome 1 au crayon)

- « Le texte est écrit bizarrement, trop AI. **Faut que ça soit informatif**, tout le livre. »
- « Ce que j'ai surligné, c'est des exemples de texte inutile. Je veux pas de fils d'la AI. »
- « "Sans perdre la viande **de l'automne**" : "de l'automne" est inutile. C'est des mots comme ça
  qu'il faut éliminer. »
- « Les tournures genre "à attendre un camion qui ne viendra pas", c'est pas beau, c'est inutile,
  c'est poétique mais dégueulasse. »
- « Sans que ça ait l'air d'un AI qui a écrit. Enlève les **—** partout aussi : y a juste les AI qui
  mettent ça dans des phrases. »
- Sur « …les aliments s'appliquent : il n'y a ni entrée électrique, ni aqueduc, ni égout » : « ni
  aqueduc, ni égout, ni blablabla, inutile, on le sait. La phrase peut s'arrêter à "les aliments
  s'appliquent". »
- Sur « un tuyau vide ne fend pas », dans le « Pourquoi ça marche » : « no shit, man ». La conséquence
  évidente d'un mécanisme qu'on vient de dire ne s'écrit pas.
- Sur « Ceux qui étaient dehors laissent à la porte la couche du dessus et les chaussures » : « c'est
  fucking bizarre. Faut plus dire quelque chose comme "Les gens qui étaient à l'extérieur doivent…".
  Je veux plus voir ça nulle part. » Voir la règle 11.
- Sur « Régler dehors : un bol qui revient, du bois de la corde qui se voit. Jamais un contenant
  d'origine » : « personne parle comme ça, c'est fucking pas clair ». Sur l'étiquette « Refus, il a où
  aller » : « wtf ». Et : « c'est pas juste les logigrammes, **c'est la façon de dire les choses**. »
  Voir la règle 0, qui passe avant toutes les autres.

- Sur l'épreuve du tome 1 (28 octobre 2026), la page du danger de la génératrice : « On est tenté de mettre la
  génératrice au garage, dans la remise ou sous l'auvent, porte ouverte, toujours dans les mêmes moments : la panne
  d'hiver, la nuit, la tempête, le soir de l'arrivée au chalet, quand on veut la protéger de la neige ou des voleurs,
  ou garder le congélateur en marche » : « la tournure de phrase est fucking weird ». Voir la règle 12.

- Même épreuve, ch. 1 : « Les quatre horloges, mais on sait même pas c'est quoi les 4 horloges, c'est quoi ça veut
  dire ??? Faut l'expliquer. » Voir la règle 14.
- Même épreuve, ch. 1, section 2 : « Les phrases comme "le courant manque et on ne sait pas quand il reviendra" ;
  "Coupure de courant sans avoir de temps de retour" ; la façon que t'écris c'est pas humain. » Voir la règle 13.

Ses pages annotées sont dans `livre/relecture/notes/` (à régénérer, voir
`design/outils/relecture/LISEZMOI.md`). Le jaune et le rouge, c'est ce qu'il ne veut plus voir.

## Le test

Pour chaque phrase, puis pour chaque mot : **sans lui, le lecteur sait-il moins quoi faire ?** Si non,
il saute. Si oui mais qu'il est mal dit, on le redit simplement, comme on l'expliquerait à quelqu'un
dans le garage.

## Comment s'écrit une phrase du livre

0. **On écrit comme on l'expliquerait à quelqu'un, à voix haute.** C'est la règle qui passe avant les
   autres, et c'est la plus souvent ratée : à force de couper, le texte devient un code que le lecteur
   doit déchiffrer. Couper un mot qui n'apprend rien, oui ; couper ce qui fait une phrase française, non.
   Une phrase du livre a :
   - **un verbe qui dit le geste**, et on sait qui le fait. Pas une liste de noms qui tient lieu d'actions
     (« mains lavées 20 s, couchage des enfants à part, travail partagé ») : « Il se lave les mains 20 s,
     il dort à l'écart des enfants et il aide aux corvées. »
   - **des mots de tous les jours**, avec leurs articles et leurs possessifs. Pas « un contenant
     d'origine », « la couche du dessus », « du bois de la corde qui se voit » : « l'emballage du
     magasin », « ses vêtements du dessus », « du bois fendu ».
   - **le but dit en clair** quand il n'est pas évident. « Un bol qui revient » oblige à deviner ;
     « un de nos bols, qu'on reprend ensuite » se comprend tout de suite. « Jamais un contenant
     d'origine » ne dit pas pourquoi ; « Jamais dans l'emballage du magasin : ça montre qu'on en a
     d'autres » le dit.
   - **pas de participe en chaîne** (« Couché, vêtements mouillés retirés, chaleur sur le tronc ») :
     « Le coucher, lui enlever ses vêtements mouillés et mettre de la chaleur sur son tronc. »
   - **pas d'étiquette en raccourci**, même dans un logigramme ou un tableau. Une branche se lit comme une
     réponse : « Oui », « Non », ou une vraie phrase courte. Pas « Refus, il a où aller » : on pose
     plutôt la question qui se répond par oui ou non (« Il a un endroit où aller ? »).
   Le test : **lis la phrase à voix haute à quelqu'un qui n'a pas lu le chapitre.** S'il doit demander
   « ça veut dire quoi ? », elle se réécrit, même si elle devient plus longue.

1. **Une phrase, une information.** Deux faits, deux phrases.
2. **Le fait d'abord, la raison ensuite**, et seulement si la raison change ce qu'on fait.
   « Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant. »
3. **La condition avant le geste.** « Si l'eau est trouble, la filtrer avant de la désinfecter. »
4. **Les étapes à l'infinitif**, comme le reste du livre : « Couper le disjoncteur principal. » La prose
   (section 2, section 3, section 9 hors étapes numérotées) dit « on » : « On coupe le disjoncteur avant de brancher. »
5. **Le chiffre avec son unité**, en chiffres : 74 °C, 2 gouttes par litre, 48 h. Un chiffre se
   cherche à la source avant d'être écrit (règle 1 de `CLAUDE.md`). À défaut de chiffre, le **repère
   observable** : la couleur, le son, la consistance, ce que ça fait sous le doigt.
6. **Le mot exact, et toujours le même.** Un objet garde son nom d'un bout à l'autre du chapitre ; on
   ne varie pas les synonymes pour faire joli. « Génératrice » partout, pas « groupe », puis
   « appareil », puis « machine ».
7. **La voix active, un sujet concret.** « Le monoxyde endort », pas « l'endormissement est causé par ».
8. **Dire ce qui marche, pas ce qui ne marche pas.** JP : « Je veux pas savoir qu'est-ce qui va pas au
   feu, je veux savoir c'est quoi qui va au feu. » On nomme ce qu'on prend, ce qu'on fait, ce qui
   convient : « Tout contenant de métal va sur le feu. » La liste de ce qui ne convient pas sort, sauf
   quand l'erreur tue et que le réflexe naturel y mène ; elle va alors dans l'encadré danger, une fois.
9. **Un avertissement = le mécanisme + ce qui arrive + quoi faire.** Jamais « attention » tout seul.
10. **Du français québécois clair, pas du télégraphe.** La phrase garde ses articles et ses liaisons.
    Couper n'est pas compresser.
11. **La phrase se dit comme on la dirait à quelqu'un.** JP, sur « Ceux qui étaient dehors laissent à la
    porte la couche du dessus et les chaussures » : « c'est fucking bizarre ». Trois fautes dans une phrase,
    et aucune ne se garde :
    - **Le sujet se nomme.** Pas « ceux qui », « celui qui », « celle qui » en tête de phrase : « les gens
      qui », « la personne qui », « les enfants », « on ».
    - **L'ordre naturel : le verbe, ce qu'on fait, puis où et quand.** Pas « laisser à la porte la couche du
      dessus », mais « laisser ses vêtements du dessus à la porte ». Le complément de lieu ou de temps ne se
      glisse pas entre le verbe et son objet.
    - **Une consigne se dit comme une consigne.** Dans la prose : « doivent laisser », « on laisse ». Dans une
      étape numérotée : l'infinitif, « Laisser… ». Pas le présent qui décrit (« ceux qui étaient dehors
      laissent »), qui se lit comme un constat.
    Avec le possessif et le mot de tous les jours : « Les gens qui étaient à l'extérieur doivent laisser
    leurs vêtements du dessus et leurs chaussures à la porte. »
12. **Une phrase dit qui fait quoi, quand et pourquoi, dans cet ordre-là, sans détour.** JP, sur « On est tenté de
    mettre la génératrice au garage, […] toujours dans les mêmes moments : la panne d'hiver, la nuit, la tempête, le
    soir de l'arrivée au chalet, quand on veut la protéger de la neige ou des voleurs, ou garder le congélateur en
    marche » : « fucking weird ». Trois fautes :
    - **Pas de détour par la tentation ou le sentiment** (« on est tenté de », « on a envie de ») : on dit ce que les
      gens font.
    - **Une liste après deux-points ne mélange pas deux sortes de choses.** Ici, des moments (la nuit, la tempête) et
      des raisons (la protéger, garder le congélateur) dans la même série ; chaque membre doit se lire avec le début
      de la phrase, et « ou garder le congélateur » ne se rattache à rien sans relire.
    - **Pas de formule vague** (« toujours dans les mêmes moments ») : on nomme les moments.
        **La réécriture ne suffisait pas.** JP, sur la version refaite : « Non mais je veux dire un paragraphe de même ça
    veut rien dire lol ». Le paragraphe ne disait rien qu'on doive faire : le danger (la génératrice sous un toit,
    la porte de garage ouverte qui ne suffit pas) était dit juste avant. **Avant de réécrire une phrase que JP
    signale, se demander si elle doit exister** (le test : sans elle, le lecteur sait-il moins quoi faire ?). Si
    non, on la coupe ; on ne la polit pas.
13. **Un titre de situation se dit comme un humain l'écrirait sur une fiche.** JP, sur la section 2 du ch. 1, « Le
    courant manque et on ne sait pas quand il reviendra » : « c'est pas humain » ; lui écrirait « Coupure de courant
    sans avoir de temps de retour ». Dans « Quand l'utiliser », dans les titres et les intertitres :
    - **le nom de la situation, court** : « Panne de courant sans heure de retour », « Génératrice ou propane en panne
      par grand froid », « Congélateur dégelé pendant une absence », « Feu en vue » ;
    - **le mot que les gens emploient** : on dit « une panne de courant », pas « le courant manque » ; « en panne », pas
      « lâche » ; « pour une durée inconnue », pas « on ne sait pas pour combien de temps » ;
    - **une courte phrase reste quand c'est comme ça qu'on le dit** : « Il faut partir vite », « Il manque le judas, la
      lampe ou la barre de porte », « Quelqu'un cogne à la porte ».
    La règle 0 vaut toujours pour la procédure : une étape garde son verbe et son geste. Un titre de situation n'est pas
    une étiquette en raccourci tant qu'il se comprend du premier coup.
14. **Une notion du chapitre s'explique la première fois qu'elle paraît.** JP, sur le ch. 1 : « Les quatre horloges,
    mais on sait même pas c'est quoi les 4 horloges ; faut l'expliquer. » Le titre et la section 1 en parlaient, et la
    réponse n'arrivait qu'à l'étape 16, trois pages plus loin. Un mot que le livre invente (les quatre horloges, la
    bascule, la tournée) se dit en clair dès sa première apparition, avec ce qu'il veut dire concrètement : « Pendant
    une panne de courant, quatre choses s'épuisent en même temps, chacune à sa vitesse : la chaleur du corps…, l'eau
    potable…, le froid du frigo et du congélateur…, les calories et le combustible… Ce sont les quatre horloges. »

## Ce qui sort

### Les phrases

| Ce qui sort | Exemple réel du livre | Ce qu'on écrit |
| --- | --- | --- |
| La phrase qui parle du livre, du chapitre, de la page | « Cette page ne suit pas le gabarit du livre. Elle est faite pour être ouverte à la lampe frontale. » ; « C'est le renversement du chapitre. » | *(rien)* |
| La statistique d'ambiance | « En 2024, le courant a manqué 436 minutes par client alimenté… » | *(rien)*, ou le chiffre s'il change le geste |
| La justification du cadrage | « C'est le scénario du chalet parce que c'est là que sont la scie à chaîne, la hache, l'arme… » | *(rien)* |
| La chute en formule | « …juste une impression. » ; « La plus courte commande. » ; « …pas quand le tuyau siffle. » | La phrase s'arrête au fait |
| L'opposition fabriquée | « Ce qui détruit la plomberie n'est pas le froid mais l'expansion de l'eau. » | « Un tuyau fend parce que l'eau prend du volume en gelant. » |
| L'image, la petite scène, la personnification | « …une famille dans le noir, à attendre un camion qui ne viendra pas. » ; « une maison qui se croit chauffée au mazout » ; « la panique fait manquer » | « Tant que le mât n'est pas réparé, la maison reste sans courant, même quand la rue est rebranchée. » |
| Le superlatif qui ne se mesure pas | « …au ch. 77, le chapitre le plus dangereux de l'ouvrage. » | « …au ch. 77. » |
| La révélation en deux temps | « Le réglage est tout, et il tient en une phrase : la mèche ne dépasse presque pas. » | « La mèche ne dépasse presque pas. » |
| La justification que le lecteur connaît déjà, après les deux-points | « …seules les parties sur le froid, la plomberie et les aliments s'appliquent : il n'y a ni entrée électrique, ni aqueduc, ni égout. » (JP : « inutile, on le sait ») | « …seules les parties sur le froid, la plomberie et les aliments s'appliquent. » |
| La justification collée au geste | « Ne pas rester dans l'auto : la tôle n'arrête rien. » | « Entrer dans un bâtiment. » |
| La conséquence évidente d'un fait qu'on vient de dire | « Un tuyau fend parce que l'eau prend du volume en gelant : un tuyau vide ne fend pas. » (JP : « no shit ») | « Un tuyau fend parce que l'eau prend du volume en gelant. » |
| L'annonce et le résumé | « Voici ce qu'il faut savoir. » ; « En somme… » | *(rien)* |
| La question rhétorique | « Pourquoi ? Parce que… » | Le fait |
| Le code à déchiffrer : noms sans verbe, mots d'institution, but sous-entendu | « Régler dehors : un bol qui revient, du bois de la corde qui se voit. Jamais un contenant d'origine. » (JP : « personne parle comme ça ») | « Lui donner dehors, sans le faire entrer : un repas chaud dans un de nos bols, qu'on reprend ensuite, de l'eau, du bois fendu. Jamais dans l'emballage du magasin : ça montre qu'on en a d'autres. » |
| L'étiquette en raccourci | « Refus, il a où aller » ; « Pas de refus : abri, feu et boisson chaude dehors, ou hébergement. » | La question « Il a un endroit où aller ? », puis « Oui » et « Non » ; « On ne le renvoie pas. Lui faire un abri, un feu et lui donner à boire chaud dehors, ou le loger. » |
| La tournure bizarre : sujet en « ceux qui », ordre renversé, consigne au présent de constat | « Ceux qui étaient dehors laissent à la porte la couche du dessus et les chaussures. » (JP : « fucking bizarre ») | « Les gens qui étaient à l'extérieur doivent laisser leurs vêtements du dessus et leurs chaussures à la porte. » |

### Les mots

| Ce qui sort | Exemple | Après |
| --- | --- | --- |
| Le complément qui décore | « sans perdre la viande **de l'automne** » | « sans perdre la viande » |
| L'adjectif ou l'adverbe qui redit | « un **véritable** danger », « **complètement** gelé » | « un danger », « gelé » |
| Les mots vides | déjà, encore, tout, bien, vraiment, simplement, exactement, précisément, littéralement, en effet, ainsi, d'ailleurs, en réalité | à couper quand ils n'ajoutent rien |
| Le vocabulaire d'IA | crucial, essentiel, clé, primordial, véritable, incontournable, « il est important de noter que » | le fait seul |
| Le tour long | « le fait de », « ce qui permet de », « il convient de », « au niveau de » | la forme courte |
| La précision que le lecteur a déjà | « dans la maison, à l'intérieur » | « dans la maison » |
| « C'est… qui / que » de mise en relief | « C'est la cendre qui tient le mieux. » | « La cendre tient le mieux. » |

### Le réel de l'urgence

JP, sur le logigramme des retombées : « Voir que t'as le temps d'aller chercher la radio de l'auto quand
une bombe nucléaire pète. » ; « La bombe vient de tomber, on n'a pas encore de sas, TOUT EST NOUVEAU. »

- **Un geste urgent se fait avec ce qu'on a sous la main, à ce moment-là**, par quelqu'un qui n'a rien
  préparé. Ce qui demande une préparation (une pièce scellée d'avance, un sas, une trousse) vient après,
  ou dans « Avant », jamais dans les premières minutes.
- **L'ordre réel** : d'abord ce qui sauve dans les secondes et les minutes, ensuite ce qui organise.
  La radio, l'inventaire, le tri viennent quand tout le monde est à l'abri.
- **Les mots de tout le monde.** Pas de jargon que le lecteur ne dirait pas : « sas », « source
  radioactive perdue » (JP : « ça veut rien dire »). Ou on dit la chose simplement, ou elle sort.
- **Le mot général quand le détail n'apporte rien** : « les animaux », pas « les chiens et les poules »
  (JP : « personne a des poules, man »).

### La répétition

JP : « Dans les textes, y a beaucoup de répétition aussi, faut slaquer la répétition. »

- **Un nom ne revient pas à chaque phrase** (JP, 19 octobre 2026, texte de Claude au dos des couvertures : « 4 fois
  Claude en un paragraphe »). Une phrase porte plusieurs verbes (« Claude a fait la recherche, a écrit les chapitres
  et a dessiné les planches »), ou la tournure se passe du sujet (« Chaque chiffre a été vérifié à la source »). Un
  texte qui présente quelqu'un commence par ce qui le rend vivant, pas par une fiche (JP, sur « vit à Baie-Comeau et
  il aime le bois » : « c'est dull » ; il a pris « vit à Baie-Comeau et il est père de deux enfants. Il a écrit ce
  livre pour eux »).

- **Un fait se dit une fois par chapitre**, à l'endroit où il sert. Ailleurs, un renvoi court
  (« étape 12 », « section 8 ») ou rien.
- **Chaque section apporte du neuf.** « En une ligne », « Quand l'utiliser », « Pourquoi ça marche »,
  la procédure, les points de contrôle, le danger et la variante d'urgence ne redisent pas ce qu'une
  autre section a dit. Le section 3 donne le mécanisme ; la procédure ne le réexplique pas, elle s'en sert.
- **Les rappels de sécurité** du tableau de `CLAUDE.md` se disent dans l'étape où ils s'appliquent et
  dans l'encadré du section 8. Pas une troisième fois.
- **Un avertissement se dit une fois.** JP, sur « le barbecue ne rentre pas dans la maison » redit en
  section 9 après le section 8 : « ON LE SAIT, ON L'A DÉJÀ DIT. » Une fois dans l'encadré danger ; ailleurs, rien, pas
  même « (section 8) » au bout d'une phrase qui le redit.
- **Le logigramme et la série orange ne redisent pas les avertissements.** JP, sur l'encadré « le réchaud
  du visiteur : génératrice, réchaud, chaufferette dehors » du logigramme du ch. 17 : « on l'a dit 1000
  fois, ça ». Le logigramme porte les décisions et les gestes ; le danger reste dans l'étape et dans
  l'encadré du section 8. Un encadré danger n'entre dans un logigramme que s'il change la décision (« S'il montre
  une arme ou s'il menace »).
- **Pas de redite d'une phrase à l'autre** : la deuxième phrase qui reformule la première sort.
- **Le même mot pour la même chose** reste (règle 6 plus haut) : on chasse l'idée répétée, pas le terme
  technique.

Le script de contrôle liste les suites de mots qui reviennent dans le chapitre ; chacune se juge.

**Mais la répétition se cherche par idée, pas par mots** (JP, 16 octobre 2026, sur la vitesse du feu de cimes
redite six fois dans le ch. 11 avec des chiffres différents : « on comprend que le feu avance vite, la
première fois tu le dis dans l'orange ; faut arrêter les répétitions, je croyais te l'avoir dit »). Le
script ne voit pas un même fait redit avec d'autres mots ou d'autres chiffres. Avant de rendre :
- **Faire l'inventaire des faits du chapitre** : chaque chiffre, chaque mécanisme, chaque consigne, avec les
  endroits où il est dit (la vitesse du feu, les braises qui allument les bâtiments, la chaleur qui traverse
  les vitres, le feu qui ralentit la nuit…).
- **Un fait qui revient garde une seule place**, la plus utile : l'étape où il sert (la série orange
  d'abord), sinon la section 3 pour un mécanisme et la section 8 pour un danger. Ailleurs, il sort, ou il
  devient un renvoi court (« section 8, point 6 »).
- **Les parties « le détail » et la section 9 n'expliquent que ce qui n'est dit nulle part ailleurs.** C'est
  là que les redites se glissent quand on sort le pourquoi d'une série orange.
- Les tableaux des sections 6 et 7 redonnent les cibles chiffrées, c'est leur travail ; ils ne redisent pas
  un avertissement (la génératrice ne revient pas en ligne de tableau).

### Le tiret

**Aucun tiret (— ou –) comme ponctuation dans une phrase.** Le livre en avait 5 665. Selon le cas :

- la virgule : « Le bois, sec et fendu, se range… » ;
- les deux-points : « Une seule règle : la génératrice dehors. » ;
- les parenthèses, pour un ajout court ;
- le point, pour deux phrases ;
- la réécriture, souvent la meilleure.

Ça vaut aussi pour les lignes de matériel (« **Thermomètre à sonde** : porte les 74 °C à cœur. »), les
titres, les tableaux et les notes. Les intervalles s'écrivent avec « à » (« 4 à 6 h »). Les traits
d'union des mots composés restent.

### Les guillemets

Pas de guillemets d'ironie ni de « mots entre guillemets » pour faire image. Pas de citation de source :
la provenance vit dans `suivi/`, jamais dans le texte. Les guillemets restent pour un mot qu'on dit à
voix haute ou qu'on lit sur une étiquette.

## Les planches se nomment dans le texte

JP : « Il faut mentionner les planches pour les retrouver. » Chaque planche est appelée dans le texte, à
l'endroit où elle sert, par son numéro entre parenthèses : « …deux bâches en chicane (planche 04-40). »
L'appel va dans la phrase d'ancrage de la planche (`design/epreuves-livre/placements-tome-N.json`) ou
juste avant. Une planche que le texte n'appelle pas se perd dans le livre. L'ancrage et l'appel sont le
même paragraphe, pour que la planche s'imprime sur la même page que son appel, ou la suivante (JP :
« faut qu'elle soit intégrée proche de où elle est mentionnée »).

## Ce qui ne sort jamais

- **Un fait, un chiffre, une mesure, une étape, un repère observable.** On coupe le remplissage, pas le
  contenu. Une passe qui fait perdre un fait a échoué, même si le texte est plus court.
- **Les neuf rappels de sécurité** du tableau de `CLAUDE.md`, partout où ils s'appliquent.
- **Le mécanisme d'un danger.** « Le monoxyde n'a ni odeur ni couleur, on s'endort au lieu de sortir. »
- **Le fait qui surprend** le lecteur parce que le réflexe normal est le mauvais.
- **Les notes de bas de page** qui décrivent un signe, **les renvois** (« ch. 74 »), **les appels de
  figure et de planche**.
- **Les phrases d'ancrage des planches.** Les planches se placent après une phrase précise, notée dans
  `design/epreuves-livre/placements-tome-N.json`. Avant de couper une phrase, cherche-la dans ce
  fichier ; si elle y est, garde-la ou déplace l'ancre dans le même mouvement.

## Ce que la relecture du 15 octobre change à la passe

Le 15 octobre après-midi, JP a relu les premiers chapitres et logigrammes sortis de la passe (02, 04, 16, 17).
Ses remarques ne sont pas des cas isolés : chacune montre un défaut de méthode, et la passe le corrige
maintenant partout, chapitre et logigramme.

| Ce que JP a vu | Le défaut de méthode | Ce que la passe fait maintenant |
| --- | --- | --- |
| « Régler dehors : un bol qui revient… » : « personne parle comme ça » ; « Refus, il a où aller » : « wtf » | La passe a mesuré le nombre de mots. À force de couper, le texte est devenu un code. | Elle mesure la clarté (règle 0). Chaque phrase se lit à voix haute ; le nombre de mots peut monter. Une branche de logigramme répond à une question par oui ou non. |
| « Ceux qui étaient dehors laissent à la porte la couche du dessus… » : « fucking bizarre » | Sujet en pronom, ordre renversé, consigne au présent qui décrit. | Règle 11, et le script les signale. |
| Lire le thermomètre et le vent quand on cogne la nuit : « on se fait réveiller, oublie ça le thermomètre » | La série orange a été bâtie depuis les faits du chapitre, pas depuis la scène. | **Jouer la scène** avant d'écrire chaque geste urgent : qui, où, à quelle heure, avec quoi sous la main, réveillé ou pas. Un geste que cette personne ne fera pas à ce moment-là sort de la série orange et va là où il se fait (« Avant, une fois », ou après). |
| « Le porter à bras demande 18 à 24 personnes » : « c'est beaucoup de monde » | Un chiffre sourcé qui ne s'applique pas à une famille. Il ne servait qu'à dire que ça ne marche pas. | Un chiffre reste s'il change ce que **cette famille-là** fait. Sinon on dit ce qui marche (« on le tire en traîneau »). |
| « Sortir tout le monde » devant le CO, pendant les retombées : « on sort même si c'est une bombe nucléaire ? » | Une consigne de sécurité écrite sans source, qui contredisait le danger principal du chapitre. | Chaque consigne de sécurité d'un chapitre d'urgence se confronte aux autres dangers du **même** scénario. Si deux dangers tirent en sens contraire, une source dit lequel gagne et quoi faire ; sinon `[À VÉRIFIER]`. Vérifier aussi que le chapitre n'a pas déjà la solution (le battant du section 9 pour aérer). |
| L'encadré du réchaud du visiteur : « on l'a dit 1000 fois » | Le logigramme redisait un avertissement déjà dans l'étape et dans l'encadré danger. | Le logigramme porte les décisions et les gestes. Un avertissement n'y entre que s'il change une décision. |
| « Restez au poteau ? » puis « je comprends le poteau, c'est en préparation » | Un objet préparé d'avance est utilisé dans l'urgence sans être expliqué. | Quand un geste urgent se sert d'une chose préparée, il la nomme en quelques mots là où il s'en sert (« le poteau planté d'avance à quelques pas de la porte »), ou il nomme un repère qui existe toujours. |
| « Est-ce qu'on a une version de jour, l'été ? » | Un logigramme écrit pour la nuit d'hiver alors que le chapitre vaut à l'année ; une procédure (ch. 16) écrite pour la neige seulement. | Chaque procédure d'urgence vaut à l'année, ou dit pour quand elle est écrite. Ce qui ne vaut que l'hiver ou la nuit se marque « l'hiver », « la nuit ». Il manque la saison ? On l'écrit avec ses sources, d'abord dans le chapitre, ensuite dans le logigramme. |
| « C'est la mauvaise procédure quand : le feu est dans un chaudron » (ch. 11) : « no shit… quand l'utiliser, c'est juste quand l'utiliser, pas besoin d'exemples bidon » | Le gabarit exigeait deux listes ; la deuxième se remplissait de contre-exemples évidents. | La section 2 ne dit que quand on ouvre le chapitre, sans sous-titre ni justification. La liste « mauvaise procédure » sort. Un fait qui retourne un réflexe va dans l'étape ou l'encadré danger. Plus largement : **un contre-exemple qu'aucun lecteur n'aurait confondu ne s'écrit nulle part.** |
| « C'est quoi un change par personne ? » ; « seuil » ; « ce que la famille a écrit avant la saison !?!? » | Des mots de métier ou de rapport, et une urgence qui s'appuie sur une préparation qui n'a peut-être pas eu lieu. | Les mots de tous les jours : « des vêtements de rechange », « une raison de partir ». Dans une série orange ou un logigramme, chaque condition se voit sur place ; ce qui a été préparé d'avance s'ajoute, sans être nécessaire. |
| « Je comprends pas l'ordre chronologique : 1 h, 15 min, 1 min, mais y a 600 mots pour quand le feu passe. Sois plus logique dans la gestion des temps » | La pastille n'avait pas de sens clair, et les trois séries avaient la même longueur (environ 550 mots) pour 1 h, 15 min et 1 min. | **La pastille dit le temps qu'on a pour faire la série**, à partir de ce qui la déclenche. Le titre nomme ce déclencheur (« Un feu est déclaré dans le secteur », « Il faut partir », « Le feu arrive et on ne peut plus partir »), et les séries se suivent dans l'ordre où les choses arrivent. **La longueur suit le temps** : sous « 1 min », quelques lignes, un geste par ligne, lisibles en quelques secondes ; sous « 15 min », une demi-page au plus ; sous « 1 h », une page. Le pourquoi et le détail vont juste après, hors de l'orange, dans une partie « … : le détail » qui reprend les mêmes numéros d'étapes. Pas de durée inventée : la pastille est le temps des gestes, ou un ordre de grandeur qui a sa source. |
| Ch. 15, une seule série orange « Quelqu'un passe à travers la glace » qui couvre se sortir soi-même puis sortir quelqu'un d'autre. JP : « quand on traite deux sujets, on les sépare pour permettre aux planches reliées au sujet d'être plus proches » | Deux sujets dans une série : les planches du premier attendaient la fin du second. | **Un sujet par série orange** : chaque sujet a son intertitre `{.orange …}` et sa pastille (« On passe à travers la glace », « Quelqu'un d'autre passe à travers la glace »). Les numéros d'étapes continuent ; une étape commune aux deux (se réchauffer) va dans la seconde, et la première y renvoie. |
| Ch. 13, la série orange suivie de « Il faut un feu tout de suite : le détail », juste après le logigramme. JP : « le texte en orange et ses explications, c'est comme doublé, surtout qu'on vient de le dire dans le logigramme ; il faut mettre les deux ensemble et que tout soit dans l'encadré orange » | **La série en trois exemplaires** : le logigramme dit le geste, l'orange le redit, « le détail » le redit une troisième fois avec son pourquoi. **Remplace la règle de la ligne précédente qui sortait le détail de l'orange et faisait suivre la longueur au temps.** | **La version courte est le logigramme ; la version détaillée est l'encadré orange.** Plus de partie « … : le détail » : son contenu entre dans l'étape orange qu'il explique, au complet. JP, en précisant : « pas en quelques mots, j'aime ça la version détaillée ; la version compacte, on l'a déjà dans l'arbre de décision ; c'est la place pour creuser et mettre de l'information. » La longueur ne suit plus la pastille ; la pastille dit seulement le temps qu'on a. Ce qui se dit dans l'orange ne se redit nulle part ailleurs dans le chapitre. |
| « Les planches sont pas à la place qu'elles devraient être, proche de quand on en parle » (ch. 11) | Trois planches pleine page appelées sur la même page de la section 9 : elles sortaient une, deux et trois pages plus loin. | **Chaque planche s'appelle là où son geste arrive pour la première fois dans la procédure**, à une page différente des autres ; les autres mentions renvoient à elle. Deux photos du même sujet se montent en une seule image à deux volets. **Après le montage, on vérifie la page de chaque appel et de chaque figure** (pdftotext sur le PDF) : la figure tombe sur la même page ou la suivante, sinon on déplace l'appel. |
| « Une décision qui n'a pas été reprise depuis douze heures ne vaut plus » : « inutile, c'est une sorte de tournure que je veux plus dans mon livre » ; « Le deuxième chargement se fait pendant que le chemin se ferme » : « je comprends pas ça ?? Sois plus clair quand tu dis des affaires de même » | **La maxime** : une phrase qui dit la règle comme un proverbe, souvent en « Un X qui… ne… plus » ou en paradoxe. Soit elle redit la consigne qu'on vient de donner, soit elle cache un fait qu'il faut deviner. | Si elle redit la consigne, elle sort. Si elle cache un fait, on l'écrit en clair : ce qu'on fait, et ce qui arrive sinon. « Partir avec un seul chargement. Ne pas revenir au chalet chercher ce qu'on a oublié : pendant ce voyage, le feu ou la fumée peuvent fermer le chemin, et on reste pris entre les deux. » Le script repère les « Un X qui… ne… plus » ; le paradoxe se trouve à la lecture à voix haute. |
| La section 3 du ch. 3 : « Une maison perd sa chaleur en proportion de l'écart avec le dehors et de la surface exposée : replier la famille dans une pièce réduit la perte. Un corps couché perd sa chaleur vers le plancher bien plus vite que vers l'air… Un tuyau fend parce que… Le danger vient presque toujours de ce qu'on brûle pour se chauffer. » JP : « c'est fucking drôlement dit, on dirait que tu parles en paraboles, arrête ça » ; puis : « les mots, proportion et tout, c'est bon, c'est la façon que le paragraphe est organisé. Moins poétique, plus informatif, en gardant un bon français professionnel » | **Le paragraphe en paraboles** : des vérités générales posées l'une après l'autre, chacune seule, sans lien entre elles ni avec la procédure. Le lecteur doit deviner à quoi chacune sert, et le paragraphe finit sur une chute (« Le danger vient presque toujours de… »). Le vocabulaire n'est pas en cause : « en proportion de », « la surface exposée » sont du bon français technique. | Chaque mécanisme est suivi de ce qu'il change dans la procédure, et de l'étape où ça se fait ; on passe d'un mécanisme à l'autre par un lien qui se lit (« ensuite », « de même », ou un nouvel alinéa). Le registre reste professionnel. « La perte de chaleur d'une maison est proportionnelle à l'écart de température avec l'extérieur et à la surface exposée : regrouper la famille dans une seule pièce et fermer les autres réduit la surface à chauffer (étape 7). Un corps couché perd sa chaleur beaucoup plus vite vers le plancher que vers l'air, parce que le bois la conduit et que l'air immobile la conduit très peu ; l'épaisseur sous le corps compte donc plus que les couvertures au-dessus (étape 9). » Le dernier fait est un fait, avec son renvoi, pas une formule. |
| Ch. 13, section 3, le lendemain de la règle précédente : « Une braise devient flamme quand l'air lui arrive sans arrêt, d'où le souffle continu de l'étape 16 » ; « Dans une fibre mouillée, la chaleur part à évaporer l'eau ». JP : « on avait dit plus de phrases de même ; arrête les tournures de phrase de même » | **La loi en formule** : même défaut que la ligne précédente, resserré dans une seule phrase. La chose est le sujet et fait une action de conte (« la braise devient flamme », « la chaleur part à évaporer »), le nom perd son article (« devient flamme »), et « d'où » fait le lien comme dans un manuel de physique. Corriger l'organisation du paragraphe ne suffit pas : chaque phrase doit se dire à voix haute. | Partir de ce qu'on fait et de ce qu'on voit, avec les articles : « Pour que la braise s'enflamme, il faut lui envoyer de l'air sans arrêt : c'est pour ça qu'on souffle longtemps, sans à-coups (étape 16). » « Le bois mouillé use la chaleur de l'étincelle à sécher l'eau avant de brûler : on le fend jusqu'au cœur sec (étape 12). » Jamais « d'où ». Le script repère « d'où », « devient flamme / feu / braise… » et « part à + verbe ». |
| « La braise ne sait pas… », et les phrases de la même famille (JP, 16 octobre 2026 : « tout ce qu'on a dit pour les phrases genre "la braise ne sait pas" pis des affaires de même ») | **La chose qui pense** : un objet, une matière, le froid ou le corps sujet d'un verbe de l'esprit (savoir, vouloir, attendre, pardonner, se croire, demander, oublier). C'est la personnification de la ligne « l'image, la petite scène », sous sa forme la plus courte, et elle revient dans chaque chapitre. | On dit ce qui arrive et ce qu'on fait : « la braise ne sait pas d'où vient l'air » devient « la braise prend l'air de n'importe quel côté : on souffle du côté où elle rougit » ; « le froid ne pardonne pas » sort, ou devient le fait (« à −30 °C, une peau mouillée gèle en quelques minutes »), avec sa source. Le script repère la chose sujet d'un verbe de l'esprit ; chaque cas se juge. |
| Ch. 3 : « Un message texte passe là où un appel ne passe pas. » JP : « on en avait déjà parlé ; parle pas de même, explique pourquoi ; "là où un appel ne passe pas", ça veut rien dire » (la même phrase avait été corrigée au ch. 11, et la correction n'avait pas été notée ici : le chapitre suivant l'a refaite) | **La formule « X passe là où Y ne passe pas »** : elle donne le résultat et cache la raison, et « là où » ne désigne aucun endroit. Même famille : « il tient là où… », « ça marche là où… ». | On dit le mécanisme : « Un message texte passe sur un signal faible et le téléphone le renvoie tout seul jusqu'à ce qu'il parte ; un appel a besoin que la ligne tienne aux deux bouts, et il coupe quand la tour est saturée. » Le mécanisme a sa source dans `/sources`. **Et toute phrase que JP corrige entre dans ce tableau le jour même**, avec sa correction : sinon, le chapitre suivant la refait. |
| Ch. 3, étape 23 : « Vidanger dans l'ordre. Fermer l'entrée d'eau. Mettre le chauffe-eau électrique hors tension à son disjoncteur. Ouvrir un robinet d'eau chaude à l'étage : sans lui, le chauffe-eau ne se vide pas, et on croit son robinet bouché. Tirer d'abord… ; ensuite seulement, brancher le boyau… » JP : « c'est vraiment pas clair comment faire la vidange ; quand on a des passages comme ça, il faut que ça soit mieux expliqué, surtout qu'une planche est reliée ; faut pousser la chose plus loin » ; « "son robinet" : le robinet du chauffe-eau » | **La procédure tassée dans une étape** : six gestes dans un paragraphe, sans dire où est chaque pièce, comment la reconnaître ni ce qu'on voit quand c'est fait ; le lecteur qui n'a jamais vidangé une maison ne sait pas par où commencer. Et **le possessif qui oblige à chercher** : « son disjoncteur », « son robinet », quand deux choses ont été nommées. | Une étape qui a plusieurs gestes se découpe en sous-étapes, dans l'ordre. Chaque sous-étape dit le geste, **où est la pièce et comment la reconnaître**, et **ce qu'on voit quand c'est fait** (« jusqu'à ce que le boyau ne coule plus »). Quand une planche montre la séquence, chaque sous-étape renvoie à son numéro (« planche 03-10, repère 4 »), et l'ordre du texte est celui des repères. On nomme la chose (« le robinet de vidange du chauffe-eau »), pas « son robinet ». |
| Ch. 3, section 6 : « Carter encore chaud sous la paume au bout de l'heure : allonger l'arrêt. » JP : « c'est quoi ça, "carter" ? » | **Le mot de métier sans besoin** : le nom technique d'une pièce, quand le geste ne demande que de toucher le moteur. | Le mot de tous les jours : « Le moteur est encore chaud quand on pose la main dessus après l'heure : attendre plus longtemps. » Le mot du métier reste seulement quand on ouvre ou répare la pièce, et il s'explique en quelques mots la première fois dans le chapitre. |
| Ch. 3, section 9 : « s'il n'est plus dur au centre, il se cuit tout de suite ou se jette » ; même famille au ch. 3 : « l'eau… se fait bouillir », « un avertisseur… se traite comme absent », « une truite… se jette ». JP : « on doit le cuire, pas il se cuit ; très important pour le livre » | **La consigne au pronominal** : le geste est dit comme si la chose le faisait toute seule, et personne ne le fait. Environ 3 000 « se + verbe » dans les 113 chapitres, à juger un par un. | Quand quelqu'un fait le geste, on dit qui le fait : l'infinitif dans une étape (« le cuire tout de suite ou le jeter »), « on doit », « il faut », « on le fait bouillir ». « Se » reste quand la chose le fait vraiment toute seule : « le puisard se remplit au redoux », « le chauffe-eau ne se vide pas ». |
| Les pages des dangers, 18 octobre 2026 : « Un liquide qui brûle ne brûle pas en liquide : ce sont ses vapeurs qui prennent feu » ; « Le feu ne détruit pas un métal : il le concentre dans la fumée » ; « La couleur dit sa force » ; « La règle se brise dans les mêmes moments » ; « Le seul traitement qu'on peut fabriquer sur place, c'est l'heure de la décision » ; « tant que la route existe » ; « rien ne dit laquelle ira jusqu'au bout ». JP : « j'ai l'impression que tu as recommencé à faire des tournures de phrase bizarres » | Toutes les familles déjà notées, revenues ensemble : **la loi en formule** (« X ne fait pas Y : il fait Z »), **l'opposition fabriquée**, **la chose qui parle** (« la couleur dit »), **la règle qui se brise**, **la chute en image** au bout du paragraphe. Le script `controle.py` ne les voit pas toutes, et l'agent qui a écrit la page ne les voit pas en se relisant. | On dit le fait avec le geste, au présent simple : « L'essence ne brûle pas liquide : ce sont ses vapeurs qui s'allument » devient « Ce sont les vapeurs de l'essence qui prennent feu, pas le liquide. » ; « La couleur dit sa force » devient « On juge la solidité de la glace à sa couleur. » ; « La règle se brise dans les mêmes moments » devient « On met la génératrice à l'abri dans les moments où c'est tentant : … » ; « l'heure de la décision » devient « Ce qu'on peut faire ici, c'est partir tôt. » **Toute page écrite par un agent passe ensuite par un éditeur qui ne l'a pas écrite**, phrase par phrase, avec cette liste sous les yeux ; le script ne suffit pas. |
| « §8, c'est quoi l'affaire avant le 8 ? » | Une notation que le lecteur n'emploie pas. | « section 8 », jamais « § ». Les abréviations s'écrivent en entier la première fois. |

Ces neuf points s'ajoutent aux règles de ce skill ; ils se vérifient à l'étape 6 de la passe, en plus de la
lecture à voix haute.

## La passe sur un chapitre

1. **Lis** `CLAUDE.md`, `gabarit-chapitre.md` et le chapitre en entier. Repère ses ancres de planches.
2. **Passe 1, les phrases.** Le tableau « Les phrases », du début à la fin.
3. **Passe 2, les mots.** Phrase par phrase, le tableau « Les mots ».
4. **Passe 3, les tirets et les tics.** Le script le compte :
   ```bash
   python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-titre.md
   ```
   Il liste les tirets, les mots vides, le vocabulaire d'IA et les tournures en relief qui restent, avec
   leur ligne. Chaque ligne se juge : un « tout » qui veut dire « tout » reste.
5. **Passe 4, les invariants.** Compare l'avant et l'après :
   ```bash
   git show HEAD:chapitres/NN-titre.md > /tmp/avant.md
   python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-titre.md --avant /tmp/avant.md
   ```
   Il dit ce qui a disparu : chiffres avec unité, renvois de chapitre, notes, figures, étapes
   numérotées, rappels de sécurité, ancres de planches. **Tout ce qu'il signale se justifie ou se remet.**
6. **Relis à voix haute**, une section à la fois. Une phrase qui accroche à l'oral se réécrit.
   Puis repasse le tableau « Ce que la relecture du 15 octobre change à la passe », ligne par ligne. Dans
   un chapitre d'urgence : joue la scène de chaque geste orange, confronte chaque consigne de sécurité
   aux autres dangers du scénario, et vérifie la saison et le moment.
7. **Le logigramme**, s'il y en a un, se relit avec les mêmes règles que le chapitre. Il ne dit rien que le
   chapitre ne dit pas, il ne redit pas les avertissements, et ses branches répondent à des questions par
   oui ou non.
8. **Le rapport** : mots avant et après, tirets avant et après, et les coupes dont tu doutes.

## Avant de rendre

- [ ] Plus une seule phrase qui parle du livre, du chapitre ou de la page.
- [ ] Plus d'image, de scène, de personnification, de chute en formule.
- [ ] Zéro tiret de ponctuation.
- [ ] Chaque fait dit une seule fois ; les redites signalées par le script sont réglées.
- [ ] Zéro « village », zéro « char » (on écrit « auto »), zéro « Baie-Comeau », zéro « JP », pas l'âge
      des enfants de JP (« de jeunes enfants ») ; un âge qui est un fait (dose, seuil) reste. Un calcul fait pour la
      famille de JP se dit « pour une famille de quatre », comme un exemple, avec les mêmes chiffres (JP, 19 octobre
      2026 : « oui, c'est bon », pour tout le livre).
- [ ] Le contrôle des invariants ne signale rien d'inexpliqué.
- [ ] Les ancres de planches sont intactes, et chaque planche est appelée dans le texte (« planche NN-NN »).
- [ ] Aucun chiffre nouveau sans source enregistrée dans `/sources`.
- [ ] Le texte se lit d'un trait, en français québécois, sans télégraphe.
- [ ] Les fautes de langue (subjonctif, accords, participes, homophones, anglicismes) relèvent du skill `langue`, qui
      passe après ce skill et avant le montage : un texte qui sort d'ici n'est pas encore corrigé.
