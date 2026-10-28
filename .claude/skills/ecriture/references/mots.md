# Les listes de mots

Ces listes servent à l'oreille du rédacteur et des auditeurs, surtout de A1, et `controle.py` cherche une partie de ces
formes. Un mot de ces listes n'est jamais une faute à lui seul. On juge le mot dans sa phrase, et la phrase dans son
paragraphe (P1). Quand une liste tire contre une autre règle, on suit l'autre règle, parce que les listes viennent en
dernier dans l'ordre de `CLAUDE.md`. Une ligne qui rejetterait le diapason est fausse, et c'est elle qu'on corrige.
Chaque tableau donne la forme qu'on cherche, puis ce qu'on fait à la place.

## 1. Les mots de livre, et ce qu'on dit (P10)

Le mot de gauche est correct, mais on ne le dit pas en parlant. Le mot de métier reste quand le geste en a besoin et
qu'on l'explique la première fois, et le mot du Québec reste quand tout le monde le dit (une auto, la poudrerie, la
glace qui porte). Le mot technique juste reste aussi, comme « en proportion de » et « la surface exposée », que JP a
gardés (P10).

| On l'écrit | On le dit |
| --- | --- |
| on a sommeil ; la somnolence | on a envie de dormir |
| la personne reste lucide | la personne garde toute sa tête |
| il parle et avale avec peine | il a du mal à parler et à avaler |
| une fièvre brutale ; brutalement | une forte fièvre d'un coup ; d'un coup |
| d'apparence normale | qui a l'air normal |
| les maux | le mal de tête, les douleurs (le mot exact) |
| il paralyse l'odorat | on arrête de le sentir |
| on s'effondre après quelques inspirations | on perd connaissance après quelques respirations |
| perdre conscience | perdre connaissance |
| sans s'en apercevoir | sans s'en rendre compte |
| dont on ignore le temps passé au chaud | dont on ne sait pas combien de temps elle est restée au chaud |
| impropre à boire | dangereuse à boire |
| les broches libres sont sous tension, à nu | les broches qui dépassent à l'autre bout sont sous tension |
| quand l'air leur manque | quand il manque d'air (une flamme ne ressent rien) |
| inodore | n'a pas d'odeur |
| aucun signe de détérioration | ne sent pas mauvais et n'a pas l'air gâté |
| encombrer le réseau ; les appels saturent le réseau | prendre de la place sur le réseau ; tout le monde appelle en même temps |
| le service téléphonique est interrompu | les appels sont coupés |
| le courant manque | il y a une panne de courant |
| la couche du dessus ; un change par personne | les vêtements du dessus ; des vêtements de rechange |
| enclenché, pour un disjoncteur | qui n'a pas sauté |
| un seuil | le chiffre lui-même, et ce qu'il fait faire |
| le carter, quand on touche seulement le moteur | le moteur |
| à défaut | sinon |
| lorsque | quand |
| afin de, afin que | pour, pour que |
| davantage | plus |
| demeurer | rester |
| se munir de ; muni de ; doté de ; au moyen de | prendre ; avec |
| effectuer | faire |
| nécessiter | il faut |
| s'avérer ; constituer | être |
| procurer | donner |
| dès lors | alors |
| auparavant | avant |
| néanmoins ; toutefois ; cependant | mais |
| parvenir à | arriver à |
| tenter de | essayer de |
| débuter | commencer |
| posséder | avoir |
| se dérouler | se passer |
| en raison de | à cause de |
| veiller à | faire attention à, s'assurer de |
| ignorer | ne pas savoir |
| guère | pas beaucoup |
| périr ; succomber | mourir |
| aisément | facilement |
| nul ne | personne ne |
| l'aspect | l'air |
| l'humus | la terre noire |

## 2. Les calques et le joual

Le skill `langue` trace la frontière entre le parlé correct et le joual, et il tranche quand on hésite.

| On l'entend | On l'écrit |
| --- | --- |
| partir le camion | faire démarrer le camion |
| garder plus chaud | tenir plus chaud |
| tous les quelques pas | le nombre de pas |
| mettre à OFF, à ON | couper le courant, le remettre |
| y a pu ; y'a ; pis | il n'y a plus ; il y a ; puis |
| un char | une auto |

## 3. Ce qu'on entend de travers (A1, P1)

À voix haute, on entend ces formes de travers, et la personne qui écoute agit sur le mauvais sens.

| On l'écrit | On l'entend ; on écrit plutôt |
| --- | --- |
| le poêle en fait plus | « en fait » ; le poêle en dégage plus |
| le plus de la première va au moins de la deuxième | « au minimum » ; la borne positive, la borne négative |
| ne… jamais que | « jamais » ; seulement…, jamais… |
| à 6 heures, pour une durée | six heures du matin ; après 6 heures |
| « au lieu de » quand ce qu'on ne fait pas n'est pas un choix (« on s'endort… au lieu de sortir ») | on entend un choix ; avant d'avoir pensé à sortir |
| ne se sent pas | l'odeur ou ce qu'on ressent ; n'a pas d'odeur |
| la fabrique, pour une toxine | une usine ; fait sa toxine |
| un complément qui peut aller avec deux mots | on l'accroche au voisin ; le mettre contre son mot, ou faire deux phrases |
| « tout chiffre », « tout signe », sans borne | le 0 ou l'état normal compte-t-il ? ; dire où ça commence |
| « son », « sa », « le » quand deux noms peuvent répondre | lequel ? ; redire le nom (P4) |
| la porte d'entrée, en image | une vraie porte ; nommer la chose (P12) |
| pièce | une chambre, de la viande ou du métal ; un seul sens par chapitre (P11) ; « toute la pièce » du diapason reste, parce qu'une page de danger n'a que ce sens |
| se réveille mal ; répondre mal | on devine ; dire ce qu'on voit, en note (P14) |

## 4. Les mots de liaison qu'on ne coupe jamais (P2, P5)

Ils disent le rapport entre deux faits. Sans eux, le paragraphe devient une suite de constats, et le lecteur invente un
lien qui n'est pas toujours le bon. `controle.py --avant` les compte avant et après une passe, pour voir si elle en a
coupé.

- parce que ; comme ; c'est pour ça que ; ce qui fait que ; donc ; alors
- quand ; si ; sinon ; sauf si ; même si ; tant que
- mais ; au lieu de, quand il y a vraiment deux façons de faire
- puis ; ensuite ; d'abord ; après ; avant de ; avant que ; jusqu'à ce que ; pour ; pour que
- et, quand il lie deux gestes ou deux faits qui vont ensemble
- lui ou elle, quand il oppose deux choses (« Le gras de l'ours, lui, … »)

## 5. Les mots vides, qu'on coupe quand ils n'apprennent rien (P2)

On les coupe seulement quand la phrase dit la même chose sans eux.

- Les chevilles écrites : en effet, d'ailleurs, ainsi, de plus, par ailleurs, en outre, certes, en somme, en réalité.
- L'insistance : vraiment, simplement, exactement, précisément, littéralement, justement, carrément, absolument,
  complètement, véritablement.
- Le vocabulaire d'IA : crucial, essentiel, primordial, « clé » employé comme adjectif (« le point clé »), véritable,
  incontournable, clé de voûte, il est important de, il convient de, force est de, le fait de, ce qui permet de, au
  niveau de.
- Ce qui redit : l'adjectif qui redit le nom (« un véritable danger »), le complément qui décore
  (« la viande de l'automne »), la précision qu'on a déjà donnée.
- À juger un par un, jamais coupés d'office : tout, déjà, encore, bien. Ils sortent quand ils décorent, et ils restent
  quand ils disent le moment (« pendant que la maison est encore chaude ») ou le fait
  (« le monoxyde remplit toute la pièce »).

## 6. Les tics et les formules (à juger)

L'oreille trouve ce que le script ne voit pas.

| La forme | Ce qu'on fait |
| --- | --- |
| « X ne fait pas Y : il fait Z » ; « ce n'est pas X, c'est Y » | dire le fait, sans changer ce que la phrase affirme (P12) |
| « , pas un… » en fin de phrase | garder seulement le « pas X » d'une consigne (P12) |
| la chute à la fin d'un paragraphe (« Un X qui… ne… plus », « … ne sert à rien », « … jamais ») quand elle redit en formule ce qu'on vient de dire | dire le fait caché, ou couper (P12) ; le « ne… rien » et le « jamais » qui disent un fait ou une consigne restent (« On ne se doute de rien », « Ça ne sert à rien de se coucher par terre comme dans la fumée », « jamais dans un bâtiment ») |
| « X passe là où Y ne passe pas » | dire le mécanisme (P3) |
| le « d'où » de conséquence ; « devient flamme » ; « part à » et un verbe | le mot du lien, un verbe, un article (P5) |
| une chose qui sait, veut, attend, pardonne, ment, tranche, se croit, oublie ou « dit » | ce qui arrive (P12) |
| un outil, un lieu ou une méthode comme sujet du geste que la personne fait | « on », « il faut » (P8) |
| l'image et la petite scène (« une maison qui se croit chauffée », « tant que la route existe ») | le fait en clair (P12) |
| la révélation en deux temps (« voici ce qu'il faut savoir », « Pourquoi ? Parce que… », « le point qui décide de tout ») | dire le fait (P12) |
| « on est tenté de » | couper si le détour ne mène à aucun geste (P2) |
| une liste qui mêle deux sortes de choses (des moments et des raisons) | une sorte par liste |
| un fait, un deux-points, sa conséquence, surtout deux fois de suite | le mot du lien (P5, P6) |
| un deuxième fait accroché après « , et » au bout d'une phrase qui parle d'autre chose (« …font du monoxyde de carbone, et le poêle en fait plus… ») | sa phrase à lui ; le « , et » qui mène au fait qui compte, à la fin de la phrase, reste (« On ne se doute de rien, et on s'endort… ») (P7) |
| « Ceux qui », « Celui qui », « Celle qui » en tête | « les gens qui », « la personne qui » (P8) |
| le lieu entre le verbe et son objet (« laisser à la porte la couche du dessus ») | le verbe, ce qu'on fait, puis où (P8) |
| un participe en tête, puis une virgule (« Porte fermée, ») | « si » ou « quand » (P8) |
| un nom à la place du verbe (« à chaque ouverture ») | le verbe (P8) |
| « se » de sens passif dans une étape, quand la chose subit le geste de quelqu'un (« se jette », « se cuit ») | l'infinitif, « on doit », « il faut » ; « se coucher », « se laver » restent, parce que la personne le fait sur elle-même (P8) |
| une consigne au présent qui décrit (« on fait comme si ») | « il faut », l'infinitif (P8) |
| des noms sans verbe à la place d'une phrase, même dans un logigramme | une phrase (P1) |
| « C'est… qui » | couper s'il redit ; garder s'il met en tête le mot qui compte ou dit la cause |
| « publié », « sourcé », « dit honnêtement » | couper (P12) |
| une citation de source ; « vous » ; l'impératif en « -ez » | nos mots (P10) |
| des guillemets d'ironie ou pour faire image | enlever les guillemets ; ils servent seulement au mot qu'on dit à voix haute ou qu'on lit sur une étiquette (P10) |
| « § » | « section » |
| un nom latin | couper (décision 11) |

## 7. Ce qui bloque

Ces règles sont dans `CLAUDE.md` et dans ce skill, et `controle.py` bloque sur ces formes.

- Le tiret long ou moyen dans une phrase. Seules les deux lignes d'en-tête d'un chapitre gardent le leur. On écrit un
  intervalle avec « à » (« 4 à 6 h »), et le trait d'union des mots composés reste.
- « village » ; « char » ; « Baie-Comeau » ; « JP » ; l'âge des enfants de JP, sauf quand l'âge change le geste.
- Un numéro de norme : CSA, CAN/CSA, NF EN, ASTM, ULC, ANSI, ISO ou NFPA, suivi d'un numéro.
- Un service qui répond : 911, Info-Santé, Centre antipoison, Info-pannes, Québec 511, la carte de la SOPFEU, Urgence
  Québec, ou un numéro de téléphone.
- Une attribution : MAPAQ, Santé Canada, ACIA, INSPQ, CNESST. Hydro-Québec reste quand c'est un fait sur le réseau.
- Un nom latin ; un « vous » hors des guillemets (entre guillemets, c'est une citation de source, qui sort par P10) ; le
  signe « § », qu'on remplace par « section ». On écrit une abréviation en entier la première fois.

## 8. Les phrases qui sortent (P2, P12)

On coupe ces phrases (P2), parce qu'elles n'apprennent rien à la personne qui va agir. Les exemples viennent des
versions d'avant du livre.

| La phrase | Ce qu'on fait |
| --- | --- |
| ce que le lecteur sait déjà (« il n'y a ni entrée électrique, ni aqueduc, ni égout », où JP a écrit « inutile, on le sait ») | couper |
| la conséquence évidente du fait qu'on vient de dire (« Un tuyau fend parce que l'eau prend du volume en gelant : un tuyau vide ne fend pas. », où JP a écrit « no shit ») | garder seulement le fait (« Un tuyau fend parce que l'eau prend du volume en gelant. ») |
| la justification du cadrage (« C'est le scénario du chalet parce que c'est là que sont la scie à chaîne, la hache, l'arme… ») | couper |
| la statistique d'ambiance (« En 2024, le courant a manqué 436 minutes par client… ») | couper ; un chiffre reste seulement s'il change ce que la famille fait, sinon on dit ce qui marche (pour « Le porter à bras demande 18 à 24 personnes », on écrit « on le tire en traîneau ») |
| le superlatif qui ne se mesure pas (« …au ch. 77, le chapitre le plus dangereux de l'ouvrage. ») | « …au ch. 77. » |
| le contre-exemple qu'aucun lecteur n'aurait confondu (« C'est la mauvaise procédure quand : le feu est dans un chaudron ») | couper |
| la phrase qui parle du livre, du chapitre ou de la page (« C'est le renversement du chapitre. ») | couper (P12) |
