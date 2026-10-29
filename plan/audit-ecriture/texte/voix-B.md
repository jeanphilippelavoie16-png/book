# Audit de l'écriture : la voix, lot B (tome 1 : ch. 2, 4 et 17)

28 octobre 2026. Un seul regard : **la voix**, le mot qu'on dit contre le mot qu'on écrit. Le registre visé : un
Québécois qui explique à son voisin, en français correct (ni joual, ni mot de livre). Lot lu au complet :
`chapitres/02-rester-ou-partir.md`, `chapitres/04-retombees-radioactives.md`, `chapitres/17-qui-cogne-a-la-porte.md`.
Aucun fichier du livre n'est touché. Les réécritures ci-dessous n'ajoutent aucun fait ni chiffre ; elles ont passé
`controle.py` (0 tiret, 0 mot de livre) et `langue.py` (avis jugés à la section 6).

Ce que je ne juge pas ici : la longueur des phrases et la monotonie (tempo), la répétition, l'exactitude des faits, la
structure du gabarit. Le motif 1 touche le tempo : je le prends seulement par le bout des mots qu'on dit.

## 1. Les mesures

`tempo.py --par-fichier` sur le lot :

| texte | mots | phr. | m/phr | « : » % | fait:csq % | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 02-rester-ou-partir.md | 4955 | 253 | 19,6 | **46,6** | **34,4** | 4,6 | 5,2 |
| 04-retombees-radioactives.md | 8053 | 375 | 21,5 | 38,9 | 29,9 | 4,5 | 2,9 |
| 17-qui-cogne-a-la-porte.md | 4630 | 214 | 21,6 | 36,9 | 30,4 | 5,0 | 2,8 |
| lot B | 17638 | 842 | 20,9 | 40,7 | 31,4 | 4,6 | 3,6 |
| tout le livre | 684215 | 36580 | 18,7 | 31,4 | 23,7 | 5,4 | 5,1 |

Le ch. 2 est le chapitre du livre où la phrase porte le plus souvent un deux-points (presque une sur deux).

Les petits mots de la parole, comptés sur le texte brut (tableaux compris) :

| mot | ch. 2 | ch. 4 | ch. 17 |
| --- | --- | --- | --- |
| « ça » | 8 | **1** | 2 |
| « c'est » | 2 | 8 | 4 |
| « parce que » | 2 | **0** | 3 |
| « donc » | 1 | **0** | 1 |
| « deux-points » | 151 | 163 | 93 |
| « dont » | 4 | 2 | 5 |
| « l'on » | 0 | 0 | 3 |
| interrogation inversée (« Peut-on », « sait-il ») | 3 | 0 | 0 |

Au ch. 4, environ 8 000 mots, il y a **un seul « ça »** (l. 77, « Ça enlève jusqu'à 90 % ») et **aucun « parce que »**.
Le deux-points tient la place de tous les mots qui lient deux idées quand on parle.

`controle.py`, section « Mots de livre » : **5 avis** sur les trois chapitres (« davantage » ch. 2 l. 344 ; « À défaut »
ch. 4 l. 69 ; « somnolence » ch. 4 l. 331 ; « à défaut » ch. 17 l. 77 ; « somnolence » ch. 17 l. 192). Les cinq sont
justes et à changer. Mais la lecture en relève plus de quatre-vingts autres : l'outil voit le mot, pas la tournure.

## 2. Ce qu'on entend

Le texte est juste et dense. Il ne sonne pas comme quelqu'un qui parle : il sonne comme une **fiche**. Les choses
font les actions (« le bouchage arrête », « l'autonomie a baissé »), les événements deviennent des noms (« jusqu'au
passage du souffle », « le délai de l'iode »), les liens se font au deux-points, et les tours viennent de l'écrit
(« Peut-on », « où l'on reçoit », « que le trajet n'en demande »). Les endroits qui sonnent juste sont ceux où le texte
**montre une personne qui fait quelque chose et ce qu'elle voit** (section 4).

La page du monoxyde (dangers/partie-1.md), lue avec la même oreille, a les trois défauts du motif 1 et du motif 6 :
quatre phrases dont trois commencent par une chose (« Le poêle… », « Le gaz… », « Il… »), deux deux-points, aucun mot
qui lie. La même page dite à voix haute, sans fait neuf :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font tous du monoxyde de carbone, et le poêle en fait plus
> quand on ferme presque l'entrée d'air pour la nuit. Le problème, c'est que ce gaz ne se voit pas et ne se sent pas. Il
> prend la place de l'oxygène dans le sang, alors on s'endort sans s'en rendre compte au lieu de sortir. Et il se répand
> dans toute la pièce, jusqu'au plancher : se coucher par terre ne protège pas.

« Le problème, c'est que », « alors », « Et » : trois choses que nos règles font couper (motif 1, cause).

## 3. Les défauts, du plus grave au moins grave

### Motif 1. Les mots qui lient quand on parle ont disparu (« ça », « c'est », « parce que », « donc ») (gravité haute)

Quand on explique à quelqu'un, on dit « parce que », « c'est pour ça que », « donc », « ça ». Le livre met un
deux-points, ou pose deux faits côte à côte et laisse le lecteur faire le lien. La phrase est correcte, et personne ne
parle comme ça. C'est ce que JP entend comme un mauvais tempo.

**Fréquence** : au ch. 4, 1 « ça » et 0 « parce que » pour 8 000 mots, et 163 deux-points ; dans le lot, 40,7 % des
phrases ont un deux-points (31,4 % dans le livre), 4,6 mots de liaison pour 1 000 mots.

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 4, l. 48 | « Pendant ce délai, on a le réflexe d'aller voir à la fenêtre, et on s'y blesse. » | « Entre l'éclair et le souffle, le réflexe, c'est d'aller voir à la fenêtre, et c'est là qu'on se blesse. » |
| ch. 4, l. 52 | « La chaleur de l'éclair brûle la peau tournée vers lui, et le souffle projette des débris : à plat ventre, on leur présente le moins de peau possible. » | « La chaleur de l'éclair brûle la peau qui est tournée vers lui, et le souffle projette des débris. C'est pour ça qu'on se couche à plat ventre : c'est comme ça qu'on leur montre le moins de peau. » |
| ch. 2, l. 250 | « Ne pas partir à pied chercher de l'aide : l'auto coupe le vent, et on la voit de loin. » | « Ne pas partir à pied chercher de l'aide, parce que l'auto coupe le vent et qu'on la voit de loin. » |
| ch. 4, l. 93 | « L'abri n'a pas besoin d'être étanche, et des fenêtres cassées n'enlèvent presque rien à la protection : on reste. » | « L'abri n'a pas besoin d'être étanche. Même avec des fenêtres cassées, il protège presque autant, donc on reste. » |
| ch. 4, l. 179 | « Le bouchage arrête la poussière, pas le rayonnement : contre lui, il faut la masse autour de la pièce (étape 8). » | « Boucher, ça arrête la poussière, mais pas le rayonnement. Contre le rayonnement, c'est ce qui est lourd autour de la pièce qui protège (étape 8). » |
| ch. 2, l. 343 | « faire fondre de la neige coûte du bois et donne beaucoup moins d'eau que son volume le laisse croire ; la glace de lac en donne davantage pour le même feu. » | « faire fondre de la neige, ça prend du bois, et ça donne beaucoup moins d'eau qu'on pense ; la glace du lac en donne plus pour le même feu. » |

**Cause** : nos règles coupent ces mots, une par une.
- `.claude/skills/ecriture/SKILL.md`, règle 1 : « **Une phrase, une information.** Deux faits, deux phrases. » La raison
  qui reliait les deux faits saute avec la conjonction.
- Même skill, règle 2, et son exemple : « Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en
  gelant. » Le seul modèle du lien, c'est le deux-points.
- Même skill, tableau « Les mots » : « « C'est… qui / que » de mise en relief | « C'est la cendre qui tient le mieux. » |
  « La cendre tient le mieux. » ». La mise en relief est la tournure la plus courante du français parlé ; la règle la
  chasse partout. `controle.py` la signale (catégorie « Mises en relief et oppositions ») ; mes réécritures ci-dessus
  sont signalées deux fois, exprès.
- `CLAUDE.md`, « Informatif partout, jusqu'au mot » : « sans la phrase ou le mot, le lecteur sait-il moins quoi
  faire ? ». Un « parce que » ou un « donc » ne passe jamais ce test : il n'apprend rien seul, il fait comprendre.
- `.claude/skills/langue/SKILL.md`, « Le registre » : « Le joual et la langue parlée ne s'écrivent pas ». La langue
  parlée y est mise dans le même sac que le joual ; c'est elle qu'on cherche.

### Motif 2. Le nom à la place du verbe : l'événement devient un nom, la notion devient un code (gravité haute)

On ne dit pas « jusqu'au passage du souffle », on dit « jusqu'à ce que le souffle soit passé ». Le livre transforme
chaque chose qui arrive en nom (le passage, l'arrivée, le refus, le don, la recharge), et chaque notion du chapitre en
étiquette (« le lien », « l'aide à distance », « le délai de l'iode »). Le lecteur doit refaire la phrase dans sa tête.

**Fréquence** : ch. 4, « passage » 13 fois au sens d'un événement (« jusqu'au passage du souffle » 3 fois, « pendant
le passage du panache »…), « l'arrivée » 6 fois ; ch. 2, « les quatre mesures » 11 fois, « le lien » 4 fois, « la
clarté » 6 fois, « chiffrer » 9 fois dans les ch. 2 et 4 ; ch. 17, « l'aide à distance » 3 fois, « le refus » 2 fois.

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 4, l. 49 | « Se coucher derrière un mur intérieur, un comptoir ou un meuble lourd, et y rester jusqu'au passage du souffle. » | « Se coucher derrière un mur intérieur, un comptoir ou un meuble lourd, et y rester jusqu'à ce que le souffle soit passé. » |
| ch. 4, l. 114 | « On compte les 24 heures d'abri à partir de l'éclair, et le délai de l'iode à partir de l'arrivée des retombées ou du panache (étape 14). » | « On compte les 24 heures d'abri à partir de l'éclair, et le temps qu'on a pour donner l'iode à partir du moment où les retombées ou le panache arrivent (étape 14). » |
| ch. 4, l. 172 | « On y apprend où va le panache, s'il y a un deuxième rejet et quand l'abri finit. » | « On y apprend où va le panache, s'il y a un deuxième rejet et quand on pourra sortir de l'abri. » |
| ch. 17, l. 162 | « Décider en famille les trois réponses possibles : l'aide tout de suite, l'aide à distance, et le refus avec une destination. » | « Choisir d'avance, en famille, entre trois réponses : aider tout de suite, aider la personne sans la faire entrer, ou dire non en lui disant où aller. » |
| ch. 17, l. 127 | « Sinon, on découvre le don plus tard, comme un manque dans le stock. » | « Sinon, les autres se rendent compte plus tard qu'il manque quelque chose dans les réserves, sans savoir que ça a été donné. » |
| ch. 17, l. 355 | « on change de veilleur à chaque recharge du feu, ce qui donne l'heure de relève sans réveil. » | « on change de veilleur chaque fois qu'on remet du bois dans le feu : comme ça, on sait quand changer, sans réveille-matin. » |

Autres : ch. 2, l. 140, « la chaleur, l'eau, la nourriture et le lien, chacune en heures ou en jours » (« écrire, pour
chacune, combien d'heures ou de jours elle peut durer ») ; ch. 4, l. 73, « entrer dès l'éclair ou l'alerte » ; ch. 4,
l. 82, « On se retrouve après l'abri » ; ch. 4, l. 251, « une partie part au lavage » ; ch. 17, l. 108, « ce qu'on fait
malgré le refus » ; ch. 2, l. 407, « il ne suffit plus de décider des soins : il faut décider du transport ».

**Cause** : l'habitude de compresser. CLAUDE.md dit « Pas de liste de noms à la place des actions », et
`ecriture/SKILL.md`, règle 0, le montre seulement sur des listes en télégraphe (« mains lavées 20 s, couchage des enfants
à part ») ; le nom seul au milieu d'une phrase complète passe. La règle 14 (« Une notion du chapitre s'explique la
première fois qu'elle paraît ») fait expliquer la notion une fois, puis l'étiquette sert de code tout le chapitre.

### Motif 3. La phrase de l'institution : le texte reprend la forme de la source (gravité haute)

Des tournures qui viennent d'un avis de santé publique, d'Hydro-Québec, de Québec 511 ou d'un guide de sécurité
civile. Personne ne dit « le risque est minimal pour une personne sédentaire » à son voisin. Ce sont les phrases que JP
reconnaît comme « pas humaines ».

**Fréquence** : une vingtaine relevées dans le lot. Ch. 2 : « risque minimal », « sédentaire » (2), « aucune
température reconnue », « les plus à risque », « agit de façon inhabituelle », « l'heure de rétablissement », « le
délai de réparation », « en vigueur », « entravée », « praticable », « Auto immobilisée », « des biens », « un
déplacement… dans des conditions qui empirent », « l'autonomie », « aller de reconnaissance ». Ch. 4 : « deuxième
rejet », « en cas de », « foin exposé ». Ch. 17 : « solution hydroalcoolique », « une personne à rechercher », « virus
respiratoires… quand le contact dure ».

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 2, l. 153 | « Entre 18 et 24 °C, le risque est minimal pour une personne sédentaire. Il n'existe aucune température reconnue à partir de laquelle on doit quitter une maison : partir à la température écrite d'avance sur la fiche de décision, choisie en pensant au plus jeune. » | « Entre 18 et 24 °C, il n'y a presque pas de risque pour une personne qui bouge peu. Personne n'a fixé de température à partir de laquelle il faut quitter une maison : partir à la température qu'on a écrite d'avance sur la fiche de décision, en pensant au plus jeune de la famille. » |
| ch. 2, l. 225 | « Les nouveau-nés et les nourrissons sont parmi les plus à risque d'hypothermie. Une personne maladroite, confuse, qui parle avec difficulté ou qui agit de façon inhabituelle a les signes de l'hypothermie modérée » | « Les bébés, nouveau-nés compris, sont parmi les personnes qui risquent le plus l'hypothermie. Quand une personne devient maladroite ou confuse, qu'elle a du mal à parler ou qu'elle n'agit pas comme d'habitude, ce sont les signes de l'hypothermie modérée » |
| ch. 2, l. 185 | « l'heure de rétablissement prévue par Hydro-Québec a été repoussée deux fois » | « Hydro-Québec a repoussé deux fois l'heure où le courant devait revenir » |
| ch. 2, l. 269 | « 138 ouverte, aucun avertissement météo en vigueur \| Fermée ou entravée : rester. » | « La 138 est ouverte et il n'y a pas d'avertissement météo \| Elle est fermée ou bloquée en partie : rester. » |
| ch. 4, l. 237 | « Rester à l'abri 24 heures, sauf en cas de feu, de fuite de gaz, d'effondrement ou de blessure grave. » | « Rester à l'abri 24 heures, sauf s'il y a un feu, une fuite de gaz, si le bâtiment s'écroule ou si quelqu'un est gravement blessé. » |
| ch. 17, l. 196 | « Sur des mains sales, la solution hydroalcoolique à 60 % ne remplace pas le savon » | « Sur des mains sales, le désinfectant à mains à 60 % ne remplace pas le savon » (le mot que le ch. 4, l. 105, emploie déjà) |

**Cause** : `.claude/cadre-agents.md`, « Pour tout agent » : « La source sert à vérifier un fait, jamais à copier une
forme. » La règle existe et rien ne la teste. La règle 1 de CLAUDE.md fait lire la source avant d'écrire, et la
phrase de la source reste collée au chiffre. La liste « Mots de livre » de `controle.py` ne contient aucun mot
d'institution (« en cas de », « en vigueur », « sédentaire », « à risque », « inhabituel », « rétablissement »).

### Motif 4. Les tours qu'on n'entend qu'à l'écrit : inversion, « l'on », « ne » explétif, « quel qu'il soit » (gravité moyenne)

Ce sont des tours corrects du français écrit, que personne ne dit : la question inversée (« Peut-on »), le sujet
après le verbe (« Viennent ensuite », « où guette l'autre adulte »), « l'on », le « ne » qui ne nie rien (« que le
trajet n'en demande »), « quel qu'il soit », « soit », « d'autant plus que », le verbe sous-entendu après une virgule.

**Fréquence** : 3 questions inversées (ch. 2, l. 167-168) ; 2 sujets inversés (ch. 4, l. 259 ; ch. 17, l. 171) ; 3
« l'on » (ch. 17, l. 167, 211, 226) ; 1 « ne » explétif (ch. 2, l. 199) ; « quel qu'il soit » ou « quelle que soit »
3 fois (ch. 2, l. 81 ; ch. 4, l. 20, l. 282) ; « soit » (ch. 4, l. 46) ; « d'autant plus vite que » (ch. 4, l. 430) ;
« qui se savaient allergiques » (ch. 4, l. 166) ; un verbe sous-entendu (ch. 4, l. 605) ; 11 « dont ».

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 2, l. 167 | « Peut-on joindre quelqu'un ? Quelqu'un sait-il où on est ? À quelle heure va-t-il s'inquiéter ? » | « Est-ce qu'on peut joindre quelqu'un ? Est-ce que quelqu'un sait où on est ? À quelle heure est-ce que cette personne va commencer à s'inquiéter ? » |
| ch. 4, l. 258 | « Le caribou, qui mange du lichen l'hiver, vient en tête. Le lichen prend directement la poussière qui tombe dessus. Viennent ensuite les bêtes qui mangent des champignons et des plantes, et en dernier les bêtes nourries de grain entreposé à l'intérieur. » | « Le caribou passe en premier, parce qu'il mange du lichen l'hiver et que le lichen prend directement la poussière qui tombe dessus. Ensuite, il y a les bêtes qui mangent des champignons et des plantes, et en dernier, les bêtes qu'on a nourries avec du grain gardé à l'intérieur. » |
| ch. 17, l. 169 | « … à plus de 2 m (étape 5), et à la vue de la fenêtre où guette l'autre adulte. » | « … à plus de 2 m (étape 5), et à un endroit qu'on voit de la fenêtre où l'autre adulte surveille. » |
| ch. 17, l. 167 | « Ranger les armes hors de la pièce où l'on reçoit » | « Ranger les armes ailleurs que dans la pièce où on reçoit la visite » |
| ch. 2, l. 199 | « S'il reste moins de clarté que le trajet n'en demande, passer la nuit sur place, sauf si un feu approche. » | « S'il ne reste pas assez de clarté pour faire le trajet, passer la nuit sur place, sauf si un feu approche. » |
| ch. 4, l. 429 | « le rayonnement rend l'air conducteur, et les feuilles perdent leur charge, puis se rapprochent, d'autant plus vite que le rayonnement est fort. » | « le rayonnement rend l'air conducteur : les feuilles perdent leur charge et se rapprochent. Plus le rayonnement est fort, plus elles se rapprochent vite. » |

Autre : ch. 2, l. 81, « un chiffre, quel qu'il soit, veut dire qu'il reste du CO » (« n'importe quel chiffre veut dire
qu'il reste du CO »).

**Cause** : `ecriture/SKILL.md`, règle 15, et la liste de `controle.py` visent le **mot** ; la syntaxe de l'écrit n'est
nommée nulle part. `.claude/skills/editeur/SKILL.md` demande un « éditeur de texte chevronné, spécialisé dans la haute
littérature française » qui « travaille la syntaxe » et « l'euphonie » : c'est la direction opposée. Et `langue/SKILL.md`
prend pour norme « le français écrit correct » sans dire que « est-ce que », « on » et la phrase sans inversion sont
aussi corrects.

### Motif 5. La phrase qui s'ouvre ou s'allonge sur un participe ou une apposition (gravité moyenne)

« Plus lourd, le cadre revient… », « Devant une arme montrée, il… », « une fois la source éliminée et la pièce
ouverte » : à l'oral, on dit « comme », « quand », « après que », ou on fait deux phrases. Le participe en tête ou en
chaîne oblige le lecteur à garder la phrase en suspens jusqu'au verbe.

**Fréquence** : une quinzaine relevées à la lecture. Ch. 2, l. 145, 155, 196, 361 ; ch. 4, l. 123, 203, 231, 487, 541,
603 ; ch. 17, l. 48, 116, 263, 267, 306, 389.

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 2, l. 145 | « Dans des maisons sans chauffage, mesurées par environ −8 °C dehors, l'air est passé de 20 à 14 °C dans les premières heures » | « Quand on a mesuré des maisons sans chauffage, par environ −8 °C dehors, l'air est passé de 20 à 14 °C dans les premières heures » |
| ch. 2, l. 361 | « Cuire la viande qui dégèle : cuite, elle se garde plus longtemps que crue et décongelée. » | « Cuire la viande qui dégèle : de la viande cuite se garde plus longtemps que de la viande crue qui a dégelé. » |
| ch. 4, l. 203 | « le chiffre affiché par l'avertisseur ne baisse pas une fois la source éliminée et la pièce ouverte » | « le chiffre de l'avertisseur ne baisse pas, même après qu'on a arrêté la source et ouvert la pièce » |
| ch. 4, l. 487 | « Plus lourd, le cadre revient loin en arrière tout seul quand on lâche la corde. » | « Comme il est plus lourd, le cadre revient loin en arrière tout seul quand on lâche la corde. » |
| ch. 17, l. 116 | « Devant une arme montrée, il ne sait pas si elle est chargée, et il réagit comme si elle l'était, sans qu'on puisse prévoir comment. » | « Quand on lui montre une arme, il ne sait pas si elle est chargée : il réagit comme si elle l'était, et personne ne peut prévoir comment. » |
| ch. 17, l. 263 | « Faute de tire-fonds, des clous de charpente qui traversent et qu'on rive de l'autre côté, la pointe recourbée à plat sur le bois, tiennent mieux que des vis courtes. » | « Sans tire-fonds, prendre des clous de charpente assez longs pour traverser, et les river de l'autre côté en recourbant la pointe à plat sur le bois : ils tiennent mieux que des vis courtes. » |

Autre : ch. 17, l. 306, « Couché ou assis, le corps perd plus de chaleur par le sol que par l'air. » (« Une personne
couchée ou assise perd plus de chaleur par le sol que par l'air. »)

**Cause** : `ecriture/SKILL.md`, règle 0, interdit « le participe en chaîne » seulement sous sa forme télégraphique
(« Couché, vêtements mouillés retirés, chaleur sur le tronc ») ; l'apposition dans une phrase complète n'est nommée
nulle part. L'habitude : on économise un « quand » ou un « comme » en le remplaçant par un participe, et le test « sans
le mot, sait-on moins quoi faire ? » pousse dans ce sens.

### Motif 6. La chose fait l'action à la place des gens : sujet abstrait ou infinitif sujet (gravité moyenne)

Pas la chose qui pense (le script la cherche), mais la chose ou l'idée qui agit : « le contenu n'a rien reçu », « l'huile
demande plus au démarreur », « la dispute porte sur », « Aller le chercher expose », « retenir le visiteur oblige à ».
On dit plutôt qui fait quoi, et ce qui lui arrive.

**Fréquence** : une quinzaine dans le lot. Ch. 2 : l. 78 (« il se tait »), l. 82, l. 183 (« l'événement s'étire »),
l. 237, l. 331 (« ce délai change les soins »), l. 367, l. 416 (« tout le reste pousse vers le chalet ») ; ch. 4 : l. 82,
l. 125 (« en avaler beaucoup rend malade »), l. 223, l. 467 (« un électroscope maison ne voit que »), l. 509 (« un
petit filtre étouffe la pompe ») ; ch. 17 : l. 92, l. 119, l. 150.

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 4, l. 82 | « Aller le chercher expose l'enfant et la personne qui y va. » | « Si quelqu'un va le chercher, ils sont exposés tous les deux, l'enfant et lui. » |
| ch. 17, l. 119 | « retenir le visiteur sous la menace oblige à le nourrir, à le surveiller pendant qu'on dort et à le faire dormir près des enfants. » | « si on garde le visiteur sous la menace, il faut le nourrir, le surveiller pendant qu'on dort et le faire dormir près des enfants. » |
| ch. 17, l. 91 | « Le visiteur racontera ce qu'il a reçu, et la façon dont on donne lui en apprend plus sur nos réserves que la quantité. » | « Le visiteur va raconter ce qu'il a reçu. Il regarde aussi comment on donne, et ça lui en apprend plus sur nos réserves que ce qu'on lui donne. » |
| ch. 17, l. 149 | « Quand un hébergement tourne mal, la dispute porte d'abord sur le travail, avant la nourriture » | « Quand ça tourne mal avec quelqu'un qu'on héberge, on se dispute d'abord pour le travail, ensuite pour la nourriture » |
| ch. 2, l. 82 | « si la maison aérée est descendue plus bas, refermer et laisser la pièce remonter avant de se fier à son silence. » | « si la maison aérée est descendue plus bas, refermer, et attendre que la pièce se réchauffe avant de croire l'avertisseur quand il ne sonne pas. » |
| ch. 2, l. 367 | « Le froid ralentit la chimie de la batterie au moment où l'huile épaissie demande plus au démarreur » | « Au froid, la batterie donne moins de courant, et c'est au moment où le démarreur en demande le plus, parce que l'huile est plus épaisse » |

Autre : ch. 4, l. 223, « Le contenu n'a rien reçu. » (« Ce qu'il y a dedans n'a pas reçu de poussière. »)

**Cause** : `ecriture/SKILL.md`, règle 7 : « **La voix active, un sujet concret.** « Le monoxyde endort », pas
« l'endormissement est causé par ». » Le modèle donné met la chose en sujet ; c'est exactement la page du monoxyde
(« Le gaz… Il prend la place… »). `controle.py` (catégorie « tournure ») ne cherche que les verbes de l'esprit (sait,
veut, pardonne) ; le cadre (« Pas de chose qui pense, sait, veut… ») n'a pas de ligne pour la chose qui agit.

### Motif 7. Le mot qu'on écrit, au-delà de la liste (gravité moyenne)

La liste « Mots de livre » attrape 5 mots dans le lot. La lecture en trouve bien plus : des mots justes que personne
ne dit dans un garage.

**Fréquence** : 5 avis du script, et une trentaine à la lecture. Ch. 2 : « présumer » (l. 301), « ménager la
batterie » (l. 322), « Sous stress » (l. 141), « le pourtour » (l. 206), « trancher sur le terrain » (l. 341), « en
amont » (l. 399), « abondait » (l. 441), « des biens » (l. 289), « se fier » (l. 83, l. 311), « un si petit volume »
(l. 253). Ch. 4 : « s'y vicie » (l. 473), « hermétiquement… irrespirable » (l. 182), « à portée » (l. 83),
« négligeable », « tout repose sur » (l. 425), « Pour trancher » (l. 582), « s'épuiser » (l. 455), « évente » (l. 523),
« abondent » (l. 653), « la masse » (l. 180, l. 294). Ch. 17 : « se désigner » (l. 54, l. 237), « abreuver » (l. 326),
« guette » (l. 171, l. 389), « concordent » (l. 190), « décentré par rapport à » (l. 234), « hors des yeux » (l. 246),
« au jour » (l. 248).

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 4, l. 473 | « Une pièce d'abri pleine de monde devient chaude et humide en quelques heures, l'été surtout, et l'air s'y vicie » | « Quand la pièce d'abri est pleine de monde, elle devient chaude et humide en quelques heures, surtout l'été, et l'air devient mauvais à respirer » |
| ch. 4, l. 182 | « une pièce fermée hermétiquement plus de quelques heures devient irrespirable. » | « après quelques heures, on ne peut plus respirer comme il faut dans une pièce bien bouchée. » |
| ch. 17, l. 237 | « ### Éclairer sans se désigner » (et le renvoi de l. 54) | « ### Éclairer sans se faire voir » |
| ch. 17, l. 324 | « glissée dans un bas, elle le réchauffe sur le chemin du retour en plus de l'abreuver. » | « glissée dans un bas, elle le réchauffe sur le chemin du retour, en plus de lui donner à boire. » |
| ch. 2, l. 301 | « Sans électricité, sans réseau cellulaire, sans satellite et sans radio qui capte : présumer le pire. » | « Quand on n'a plus d'électricité, de réseau cellulaire, de satellite ni de radio qui capte, prévoir le pire. » |
| ch. 2, l. 321 | « par tranches de quelques minutes, en alternant avec l'éclairage pour ménager la batterie » | « quelques minutes à la fois, en alternant avec l'éclairage pour ne pas vider la batterie » |

**Cause** : `ecriture/SKILL.md`, règle 15, et la liste `LIVRESQUE` de `controle.py` remplacent mot pour mot ; la règle
finit sur « l'oreille juge le reste », sans dire comment. `editeur/SKILL.md` (« haute littérature française ») tire vers
le mot choisi plutôt que vers le mot dit.

### Motif 8. Les cases de tableau en langue de rapport (gravité basse)

Les tableaux des sections 5 et 6 se lisent comme un journal de bord ou un dossier médical : « Heure 24 », « Minute 10 »,
« Éblouissement par l'éclair », « Réponses cohérentes de tous ». Le cadre dit pourtant que la règle 0 vaut « même dans
un logigramme ou un tableau ».

**Fréquence** : ch. 4, section 5 : 6 cases « Moment » sur 12 écrites « Secondes 0 à 30 », « Minutes 0 à 10 », « Minute
10 », « Minute 30 », « Heure 2 », « Heure 24 » ; et des participes sans verbe (« L'air du dehors coupé », « Iode donné à
chacun »). Ch. 2, sections 5 et 6 : 5 cases ; ch. 17 : 3 cases.

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 4, l. 306 et l. 314 | « Secondes 0 à 30, après un éclair » ; « Heure 24 » | « Dans les 30 secondes après l'éclair » ; « 24 heures après l'éclair » |
| ch. 4, l. 308 | « \| Minute 10 \| L'air du dehors coupé \| » | « \| 10 minutes après l'éclair \| Plus rien ne fait entrer l'air du dehors \| » |
| ch. 17, l. 190 | « Les comptes concordent » | « Il y a autant de personnes en vue que de traces et de véhicules » |
| ch. 17, l. 191 | « Des phrases suivies, des réponses qui correspondent aux questions » | « Il parle normalement et il répond à ce qu'on lui demande » |
| ch. 2, l. 291 | « Le moment d'aller au chalet est passé sans qu'on le décide ; l'autonomie a baissé tous les jours » | « On a laissé passer le moment d'aller au chalet sans le décider, et chaque jour, on pouvait tenir moins longtemps » |
| ch. 2, l. 293 | « On décide sous le coup de l'inquiétude, sans mesure neuve » | « On décide parce qu'on est inquiet, sans avoir rien mesuré de nouveau » |

Autre : ch. 2, l. 274, « Réponses cohérentes de tous » (« Tout le monde répond comme il faut »).

**Cause** : `gabarit-chapitre.md` : « Tableau à structure fixe : moment, ce qu'on vérifie, cible chiffrée, quoi faire si
c'est hors cible » et « Un tableau observation → diagnostic → action ». Les titres de colonnes (« Cible chiffrée »,
« Diagnostic ») appellent des cases en nom, comme dans une grille d'inspection.

### Motif 9. Les formules du gabarit qui deviennent des codes (« Ce qu'on perd : » + un nom, « En une ligne ») (gravité basse)

Le gabarit demande de « nommer ce qu'on perd » : la réponse vient en nom, parfois sans verbe ni sens clair (« Ce qu'on
perd : l'air sec. » ; « on perd… une protection beaucoup plus faible »). La section 1 « En une ligne », une seule phrase
obligatoire, devient un résumé de rapport tassé.

**Fréquence** : ch. 4, « Ce qu'on perd : » 11 fois, dont 7 suivies d'un nom sans verbe (l. 349, 381, 419, 534, 585, 590,
598). « En une ligne » : les trois chapitres du lot.

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 4, l. 381 | « Ce qu'on perd : une protection beaucoup plus faible qu'un sous-sol de béton, qu'on ne peut pas chiffrer sans compteur, et des heures de travail pour la monter. » | « Ce qu'on perd : on est beaucoup moins protégé que dans un sous-sol de béton, on ne sait pas de combien sans compteur, et ça prend des heures de travail à monter. » |
| ch. 4, l. 534 | « Ce qu'on perd : l'air sec. Les couvertures mouillées mettent de l'humidité dans la pièce fermée, et l'eau condense sur les murs froids. » | « Ce qu'on perd : l'air devient humide, parce que les couvertures mouillées mettent de l'eau dans la pièce fermée, et l'eau condense sur les murs froids. » |
| ch. 4, l. 419 | « Ce qu'on perd : la direction du panache et l'annonce d'un deuxième rejet. » | « Ce qu'on perd : on ne sait plus où va le panache, ni s'il y a un deuxième rejet. » |
| ch. 17, l. 11 | « Régler une visite imprévue à la porte, même d'un voisin, sans ouvrir et en une conversation courte : un seul adulte parle, la personne qui gèle passe avant tout, on donne sans montrer ce qu'on a, et on ne refuse qu'en donnant une destination. » | « Répondre à une visite qu'on n'attendait pas, même d'un voisin, sans ouvrir et sans parler longtemps : un seul adulte parle, la personne qui gèle passe avant tout, on donne sans montrer ce qu'on a, et on ne dit non qu'en disant à la personne où aller. » |
| ch. 2, l. 11 | « Décider en moins d'une heure s'il faut rester ou partir, à partir de quatre mesures écrites (la chaleur, l'eau, la nourriture et le lien), puis reprendre la décision à heure fixe tant que la situation dure. » | « Décider en moins d'une heure s'il faut rester ou partir, en écrivant combien de temps on peut tenir pour quatre choses (la chaleur, l'eau, la nourriture et le lien avec l'extérieur), puis revoir la décision à heures fixes tant que ça dure. » |

**Cause** : `gabarit-chapitre.md`, section 9 : « Nommer honnêtement ce qu'on perd en la choisissant (le rendement, la
durée de garde, la marge d'erreur) » ; les trois exemples sont des noms. Section 1 : « Ce que la technique fait […] Une
phrase. Pas deux. »

## 4. Ce qui marche (les modèles)

Ces passages sonnent comme quelqu'un qui explique. Ils ont tous la même recette : **une personne qui fait quelque
chose, ce qu'elle voit, et le petit mot qui lie** (« quand », « si », « parce que », « ça »).

1. **ch. 17, l. 50** : « Quand la pièce est éclairée, la personne qui est dehors voit l'intérieur par la vitre, et la
   personne qui est dedans ne voit que son propre reflet. Allumer la lumière extérieure, ou tenir une lampe loin du
   corps, et la diriger sur le sol devant la personne, pas sur son visage : on voit ses mains, et elle ne voit pas qui
   tient la lampe. » Le mécanisme est dit par ce que chacun voit, avec des gens comme sujets.
2. **ch. 2, l. 137** : « Ouvrir la radio à piles. On y apprend ce qu'on ne voit pas de la fenêtre : un feu qui tourne,
   un pont fermé, un panache de fumée. Au chalet, si la radio ne dit rien de la région, ça ne prouve pas que tout va
   bien : la nouvelle ne s'est peut-être pas rendue jusqu'à la station. » « Un feu qui tourne », « ça ne prouve pas »,
   « s'est pas rendue jusqu'à » : les mots d'ici, en français correct.
3. **ch. 17, l. 135 et l. 175** : « Si on ne dit pas de durée au départ, on n'arrive plus à faire partir la personne. »
   Et la consigne aux enfants : « personne n'ouvre, on va dans cette pièce, on attend ». La conséquence dite comme on la
   vit, et une consigne qu'un enfant peut répéter.
4. **ch. 2, l. 405 et l. 409** : « Un feu qui tourne ou un pont qui lâche, on l'apprend par la fumée, par un voisin, ou
   trop tard. » ; « Sans information neuve, on garde à 20 h la décision de 8 h, même si tout a changé entre les deux. »
   La première est une phrase de la parole (on nomme la chose, puis « on l'apprend ») ; la deuxième dit l'idée par un
   exemple d'heures plutôt que par un principe.
5. **ch. 4, l. 153 et l. 155** (la solution d'iode) : « Écraser avec le dos d'une cuillère jusqu'à ce qu'il ne reste
   plus de gros morceaux. » ; « le comprimé a très mauvais goût, et la boisson le cache. » Et **ch. 2, l. 313** :
   « « Attache ta botte », pas « As-tu froid ? » ». Le geste, ce qu'on voit quand c'est fait, et la phrase qu'on dit pour
   vrai.

## 5. Ce que ces motifs demandent à nos règles

Les défauts de la voix viennent moins d'un oubli que de **règles qui tirent dans l'autre sens** :

| Règle | Ce qu'elle produit | Ce qu'il faudrait dire |
| --- | --- | --- |
| `ecriture`, règle 1 : « Une phrase, une information » | Des faits posés côte à côte, sans lien (motif 1) | Une phrase peut porter un fait et sa raison, liés par « parce que », « donc », « alors » |
| `ecriture`, règle 2 et son exemple au deux-points | Le deux-points partout (40,7 % des phrases du lot) | Le deux-points est un outil parmi d'autres ; à l'oral, on dit « parce que » |
| `ecriture`, tableau « Les mots » : « C'est… qui / que » de mise en relief sort | La tournure la plus parlée du français chassée (motif 1) | Garder la mise en relief quand c'est comme ça qu'on le dirait ; couper seulement celle qui ne met rien en relief |
| `ecriture`, règle 7 : « Le monoxyde endort » | La chose sujet (motif 6) | Les gens sont sujets quand ils font le geste ; la chose, quand elle fait vraiment l'action |
| `ecriture`, règle 15 et `LIVRESQUE` | Une chasse aux mots qui laisse passer la tournure (motifs 4, 7) | Une liste des **tours** de l'écrit (inversion, « l'on », « ne » explétif, « quel qu'il soit », « soit », « d'autant plus que », participe en tête, « en cas de ») |
| `langue`, « Le joual et la langue parlée ne s'écrivent pas » | Le parlé correct confondu avec le joual (motifs 1, 4) | « Le joual ne s'écrit pas ; le français parlé correct, oui (est-ce que, ça, c'est, on) » |
| `editeur` : « haute littérature française », « euphonie » | La phrase d'auteur (motifs 4, 7) | Un éditeur de livre pratique : la phrase qu'on dirait |
| `cadre-agents` : « jamais copier une forme » (sans test) | La phrase de l'institution (motif 3) | Un test : chaque phrase qui porte un chiffre sourcé se relit contre la phrase de la source |
| `gabarit-chapitre.md`, tableaux et « ce qu'on perd » | Des cases et des pertes en nom (motifs 8, 9) | Les cases et « Ce qu'on perd : » se disent en phrases, avec un verbe |

Ce qu'un auditeur de la voix ferait, en plus du script, sur chaque page : (1) compter les « ça », « c'est », « parce
que », « donc » ; zéro sur une page de prose est un signal ; (2) souligner chaque nom tiré d'un verbe (« le passage »,
« l'arrivée », « le refus ») et le remettre en verbe ; (3) chercher les tours de l'écrit de la liste ci-dessus ; (4)
lire chaque phrase en se demandant « qui fait l'action ? » ; si c'est une chose ou une idée, essayer avec la personne ;
(5) relire chaque phrase qui porte un chiffre contre la page de la source, pour voir si la forme a suivi le chiffre.

## 6. Vérification des réécritures

Toutes les réécritures de ces notes sont dans un fichier d'essai passé aux deux scripts.
- `controle.py` : 0 tiret, 0 mot de livre. Deux avis « mise en relief » (« c'est là qu'on se blesse », « c'est ce qui
  est lourd […] qui protège ») : gardés exprès, c'est le sujet du motif 1. Un avis « maxime » sur la phrase de
  l'hypothermie : faux positif (c'est une définition de signes), réécrite en « Quand une personne devient… ».
- `langue.py` (avec LanguageTool) : 5 avis, tous jugés. « combien d'heures ou de jours elle peut durer » (virgule
  demandée) : juste sans virgule. « Une personne qui […] a les signes » (« a » pris pour « à ») : réécrite en « Quand
  une personne… ce sont les signes ». « vis courtes » : l'ordre du texte d'origine, juste. « Ne pas partir à pied
  chercher de l'aide » (participe demandé) : l'infinitif est juste. « combien de temps on peut tenir » (virgule
  demandée) : juste sans virgule.
- Aucune réécriture n'ajoute un fait ni un chiffre ; « le désinfectant à mains » est le mot que le ch. 4 emploie déjà,
  « le lien avec l'extérieur » reprend la section 2 du ch. 2 (« Plus de contact avec l'extérieur »).

## 7. Liste de contrôle (ma partie du cadre : le texte et la langue)

Pour tout agent
- [x] CLAUDE.md pris comme règle ; skill `ecriture` lu au complet avec ses tableaux ; `editeur`, `langue` (registre),
  `gabarit-chapitre.md` et le cadre lus.
- [ ] `suivi/plan-de-match.md`, « PAUSE du 15 octobre » : pas lu ; l'audit ne modifie aucun chapitre.
- [x] Règle 1 : aucune réécriture n'apporte de chiffre ni de fait.
- [x] Rien de commité ; un seul fichier écrit (ces notes).
- [x] Un agent, un lot ; lu seulement les trois chapitres et les règles ; aucune image ; sorties coupées.

La phrase
- [x] Règle 0 : chaque réécriture se lit à voix haute du premier coup.
- [x] Pas de loi en formule : relevée (électroscope, ch. 4, l. 429) et réécrite.
- [x] Pas de maxime, de chute, d'image : aucune dans les réécritures ; la chute « on reste. » (ch. 4, l. 94) réécrite.
- [x] Pas de chose qui pense : rien dans le lot ; la chose qui **agit** relevée (motif 6), ligne à ajouter au cadre.
- [x] Pas de pronominal dans les réécritures (« on compte », pas « se comptent »).
- [x] La consigne se dit comme une consigne : les réécritures gardent l'infinitif des étapes.
- [x] Le mot qu'on dit : la section « Mots de livre » jugée (5 avis, tous à changer) ; une trentaine d'autres relevés.
- [x] On nomme la chose au lieu du possessif : « sa source » (ch. 4, l. 226) noté, non réécrit (hors des exemples).
- [x] Les mots de tous les jours, pas de mot de métier sans besoin : relevés au motif 7.
- [x] Aucun tiret de ponctuation dans les réécritures ni dans ces notes ; `controle.py` : 0.
- [x] Titres : « Éclairer sans se désigner » relevé (motif 7).
- [ ] Les tournures de la liste du 18 octobre : seules celles de mon regard sont relevées ; le reste est aux autres
  auditeurs.

La langue
- [x] `langue.py` avec LanguageTool sur les réécritures : 5 avis, tous jugés (section 6).
- [x] Français écrit correct, sans joual ni anglicisme : « se chicaner » écarté pour « se disputer », « cadran » pour
  « réveille-matin ».
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures.
- [ ] Le correcteur, le montage, la section Langue de l'assembleur : hors de la tâche.
