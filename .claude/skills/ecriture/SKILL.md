---
name: ecriture
description: Écrire, réécrire ou resserrer le texte du Grand Livre du Chalet comme un livre technique professionnel, informatif, qui ne sonne pas écrit par une IA. Utilise ce skill dès qu'on écrit ou retouche un chapitre, un encadré, une étape, une ligne de matériel, une légende ou une note ; dès qu'on lance une passe de style sur un ou plusieurs chapitres ; et chaque fois que JP dit « trop AI », « fils d'la AI », « c'est inutile », « c'est long pour rien », « c'est poétique », « faut que ça soit informatif » ou se plaint des tirets. Il porte la phrase et le mot. Le fond (chiffres, sources, sécurité) est dans CLAUDE.md ; la structure des neuf points, dans gabarit-chapitre.md.
---

# L'écriture : un livre technique, pas un texte d'IA

Le Grand Livre du Chalet se lit à la lampe frontale, dans l'urgence, par quelqu'un de compétent de ses
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
      des enfants de JP (« de jeunes enfants ») ; un âge qui est un fait (dose, seuil) reste.
- [ ] Le contrôle des invariants ne signale rien d'inexpliqué.
- [ ] Les ancres de planches sont intactes, et chaque planche est appelée dans le texte (« planche NN-NN »).
- [ ] Aucun chiffre nouveau sans source enregistrée dans `/sources`.
- [ ] Le texte se lit d'un trait, en français québécois, sans télégraphe.
