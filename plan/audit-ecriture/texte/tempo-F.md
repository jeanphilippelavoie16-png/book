# Audit de l'écriture : le tempo, lot F (tomes 5 et 6)

28 octobre 2026. Un seul regard : le tempo, le texte lu à voix haute comme on l'expliquerait à quelqu'un dans un
garage. Lot, lu au complet : `chapitres/83-poeles-a-bois-et-rendement.md`, `chapitres/95-jardin-nordique.md`,
`chapitres/107-souder-braser-reparer-le-metal.md`. Aucun fichier du livre n'a été modifié. Les réécritures plus bas
sont des exemples : aucun fait ni chiffre neuf, aucun tiret.

Point de départ : JP, sur le paragraphe du monoxyde (`dangers/partie-1.md`) : « le tempo du paragraphe est pas bon,
pi c'est vrai dans tout le livre ».

Ces trois chapitres n'ont pas encore eu la grande passe : ils ont encore neuf sections, une section Danger, des
tirets, des « § » et des citations de source. Une partie des chiffres plus bas baissera quand la passe aura enlevé
ce que d'autres règles enlèvent déjà. Le jugement porte sur le tempo seulement.

## 1. Les mesures

`python3 .claude/skills/ecriture/scripts/tempo.py … --par-fichier`, sur le lot et sur les sept textes de
`plan/audit-ecriture/references/`.

| texte | mots | phr. | m/phr | var. | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 83 | 5624 | 286 | 19,7 | 0,59 | 20,6 | 20,7 | 33,9 | 23,4 | 3,0 | 2,7 | 5,3 | 5,6 |
| ch. 95 | 6026 | 308 | 19,6 | 0,69 | 20,8 | 21,2 | 39,3 | 25,3 | 5,6 | 10,6 | 8,8 | 4,2 |
| ch. 107 | 5600 | 308 | 18,2 | 0,66 | 14,9 | 22,1 | 37,0 | 25,3 | 4,6 | 6,8 | 7,0 | 5,9 |
| **le lot** | 17250 | 902 | 19,1 | 0,65 | 18,7 | 21,3 | 36,8 | 24,7 | 4,5 | 6,8 | 7,1 | 5,2 |
| fiches de l'Alberta | 2011 | 115 | 17,5 | 0,48 | 9,6 | 33,3 | 2,6 | 0,0 | 1,5 | 0,5 | 2,0 | 7,6 |
| Ripley 1946 | 2596 | 103 | 25,2 | 0,40 | 33,0 | 31,4 | 1,0 | 1,0 | 0,0 | 0,4 | 3,1 | 10,8 |
| guide de Wikilivres | 2252 | 98 | 23,0 | 0,58 | 24,5 | 30,9 | 10,2 | 4,1 | 0,9 | 16,9 | 10,7 | 5,2 |
| **les sept références** | 17297 | 807 | 21,4 | 0,66 | 23,7 | 27,4 | 6,3 | 3,1 | 5,5 | 2,4 | 9,2 | 5,8 |

Mesures ajoutées pour cet audit (scripts de travail dans le dossier temporaire de la session, pas dans le dépôt ; ils
reprennent le découpage en phrases de `tempo.py`) :

| mesure | ch. 83 | ch. 95 | ch. 107 | références techniques (Alberta, Ripley, Wikilivres, Millet-Robinet) | romans (Hémon, Beaugrand, Ringuet) |
| --- | --- | --- | --- | --- | --- |
| « , et » pour 1000 mots | 11,4 | 10,3 | 10,2 | 0,9 à 3,7 | 2,2 à 8,3 |
| phrases qui finissent sur un ajout « , et » + nouveau sujet | 27 (9,4 %) | 26 (8,4 %) | 26 (8,4 %) | 0 à 4,9 % | 1,4 à 3,8 % |
| phrases en trois membres « A, B, et C » | 28 | 21 | 18 | 2 à 6 par texte | 4 à 13 par texte |
| blocs (paragraphe ou étape) qui finissent en chute | 9 sur 76 | 10 sur 74 | 10 sur 82 | 0 sur 91 | 3 sur 104 |
| blocs de 3 phrases et plus sans aucun mot de liaison et coupés à moitié au deux-points ou au point-virgule | 9 sur 53 | 10 sur 57 | 15 sur 57 | 0 sur 51 | 1 sur 56 |
| phrases de 40 mots et plus | 18 | 26 | 18 | 3 à 23 par texte | 12 à 17 par texte |
| phrases de 30 mots et plus construites avec un tiret, un deux-points ou un point-virgule | 86 % | 89 % | 87 % | Ripley 3 %, Alberta 18 %, Wikilivres 21 % | 30 à 83 % |
| tirets hors titres et tableaux | 41 | 64 | 32 | | |
| guillemets « (citations de source) | 24 | 52 | 43 | | |
| renvois entre parenthèses (ch., §, étape) | 9 | 58 | 30 | | |
| « Ce qu'on perd : » | 8 | 8 | 6 | | |

Ce que les chiffres disent :

- **La longueur n'est pas le problème.** Le lot fait des phrases un peu plus courtes que les références (19,1 mots
  contre 21,4) et il est moins monotone qu'elles (21,3 % contre 27,4 %). Ripley fait des phrases de 25 mots et se lit
  bien à voix haute.
- **Le problème, c'est la façon dont les phrases sont bâties et attachées.** Six fois plus de deux-points que les
  références (36,8 % des phrases contre 6,3 %), huit fois plus de phrases « fait : conséquence » (24,7 % contre 3,1 %),
  trois à dix fois plus de « , et » qu'un texte technique, une phrase sur douze qui finit sur un ajout, un bloc sur
  huit qui finit sur une formule, un bloc sur cinq où rien ne dit le lien entre les phrases.
- **Une phrase longue du lot est presque toujours une phrase cassée** (86 à 89 % passent par un tiret, un deux-points
  ou un point-virgule) ; celle de Ripley avance d'un trait (3 %).

## 2. Les défauts, du plus grave au moins grave

### 1. Le deux-points en charnière (gravité haute)

**Le défaut.** La phrase pose un fait, s'arrête au deux-points, puis repart sur sa raison ou sa conséquence. Lue à
voix haute, elle retombe deux fois : la voix descend au deux-points, remonte, redescend au point. Personne ne parle
comme ça ; on dit « parce que », « donc », « c'est pour ça que ». Quand trois phrases de suite sont coulées dans ce
moule, le paragraphe sonne comme une suite de sentences.

**Fréquence.** Phrases avec deux-points : 97 sur 286 (ch. 83), 121 sur 308 (ch. 95), 114 sur 308 (ch. 107), soit
36,8 % ; références 6,3 % (Ripley 1,0 %, Alberta 2,6 %). Phrases « fait : conséquence » : 67, 78 et 78, soit 223
phrases sur 902 (24,7 %) ; références 3,1 %.

| où | le texte | la même chose bien dite |
| --- | --- | --- |
| ch. 83, l. 112 | « Empiler sur des dosseaux ou des perches, jamais à même le sol : le sol remonte l'humidité par capillarité et la pile pourrit par le dessous. » | « Empiler sur des dosseaux ou des perches, jamais à même le sol, parce que le sol remonte l'humidité par capillarité et que la pile pourrit par le dessous. » |
| ch. 83, l. 126 | « Mesurer sur une face **fraîchement fendue** : la surface d'une bûche mouillée sèche en une journée de soleil et ment. » | « Mesurer sur une face **fraîchement fendue**, parce que le dessus d'une bûche mouillée sèche en une journée de soleil et donne une mesure trop basse. » |
| ch. 95, l. 98 | « Refaire le même exercice en août : le soleil descend, et la ligne d'ombre des épinettes avance vite. » | « Refaire le même exercice en août, parce que le soleil descend et que la ligne d'ombre des épinettes avance vite. » |
| ch. 107, l. 131 | « **Pas de distance en mètres ici :** ce qui décide sur le terrain, c'est où les étincelles retombent : elles roulent, elles rebondissent et elles descendent par les fentes. On dégage jusque-là. » (trois deux-points en une phrase) | « On dégage jusqu'où les étincelles peuvent retomber, en comptant qu'elles roulent, qu'elles rebondissent et qu'elles descendent par les fentes. » |
| ch. 107, l. 448 | « **Avant de percer l'éclisse, percer un trou à chaque bout de la fissure** : une fissure part de sa pointe, qui est un angle vif ; un trou rond au bout enlève la pointe et la fissure s'arrête là. » | « **Avant de percer l'éclisse, percer un trou à chaque bout de la fissure.** Une fissure part de sa pointe, qui est un angle vif. Le trou rond enlève cette pointe, donc la fissure s'arrête au trou. » |

**La cause.** Le skill l'enseigne. Sa règle 2 (`.claude/skills/ecriture/SKILL.md`, l. 78 et 79) donne comme modèle
« Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant », c'est-à-dire le moule exact. La
section « Le tiret » (l. 272 à 277) et `CLAUDE.md` (l. 207 : « virgule, deux-points, parenthèses ou point ») donnent le
deux-points comme remplaçant du tiret, et le livre en avait 5 665 : les incises sont devenues des charnières. La liste
des « mots vides » (l. 202 : « en effet, ainsi, d'ailleurs ») fait couper les mots de liaison ; le deux-points prend
leur place. Enfin, la ligne de matériel (« **Thermomètre à sonde** : porte les 74 °C à cœur ») installe le geste
« nom : explication » partout.

### 2. Le paragraphe qui ne respire pas (gravité haute)

**Le défaut.** C'est exactement le paragraphe du monoxyde : trois à cinq constats de 25 à 35 mots, posés l'un après
l'autre, qui commencent par « Le… Il… La… », sans un mot qui dise le rapport entre eux (donc, parce que, alors,
c'est pour ça que, ensuite), et qui s'arrêtent sur un fait de plus au lieu de finir. Le lecteur doit deviner pourquoi
la phrase suivante vient après celle-ci. Le skill appelle ça « le paragraphe en paraboles » (tableau du 15 octobre) et
ne l'a corrigé que dans la section 3 du ch. 3.

**Fréquence.** Blocs de trois phrases et plus sans aucun mot de liaison et coupés à moitié au deux-points ou au
point-virgule : 9 sur 53 (ch. 83), 10 sur 57 (ch. 95), 15 sur 57 (ch. 107), soit 34 sur 167 (20 %) ; références :
1 sur 107. Les trois sections « Pourquoi ça marche » du lot sont toutes bâties ainsi.

| où | le texte | la même chose bien dite |
| --- | --- | --- |
| ch. 83, l. 255 (le même sujet que la page que JP a lue ; longueurs 11, 9, 15, 20 ; attaques Le, Il, Sa, Il ; aucune liaison) | « Le gaz «ne se voit pas et ne se sent pas. Il n'irrite pas les yeux ni les voies respiratoires ». Sa densité de vapeur, **0,96**, est presque exactement celle de l'air : il se mélange. Il n'y a pas de hauteur sûre, pas de coin sûr, et se coucher par terre ne sert à rien. » | « On ne voit pas ce gaz, on ne le sent pas, il ne pique pas les yeux et ne fait pas tousser. Comme il pèse presque le même poids que l'air (sa densité de vapeur est de 0,96), il se mélange à tout l'air de la pièce. Il n'y a donc aucun endroit sûr, même couché par terre. » |
| ch. 95, l. 74 (section 3 ; longueurs 35, 32, 34, 15 ; trois charnières sur quatre phrases, dont un « d'où » ; mesuré par `tempo.py` : 75 % de « fait : conséquence », 67 % de monotonie) | « La contrainte du Nord n'est pas la lumière, c'est la chaleur : tout le travail revient à **gagner des degrés et des jours aux deux bouts** — sol plus sombre, plus haut, mieux drainé, couvert la nuit. Le podzol de la pessière est acide et pauvre : le compost n'y est pas un engrais mais un correcteur, qui retient l'eau dans le sable, ouvre le till et assombrit la surface. Par nuit claire et calme, le sol rayonne sa chaleur vers le ciel et l'air froid coule dans les creux : d'où la pente, et la toile, qui ne chauffe rien mais bloque le rayonnement. L'eau est le facteur limitant, et le paillis est le seul moyen d'en demander moins. » | « Dans le Nord, ce qui manque au jardin, c'est la chaleur plus que la lumière. Le travail consiste donc à gagner des degrés et des jours au début et à la fin de la saison, avec un sol plus sombre, plus haut et mieux drainé, qu'on couvre la nuit. Dans la pessière, le sol (le podzol) est acide et pauvre. Le compost n'y sert pas d'engrais, mais de correcteur, parce qu'il retient l'eau dans le sable, ouvre le till et fonce la surface. Par une nuit claire et calme, le sol perd sa chaleur vers le ciel pendant que l'air froid descend dans les creux. C'est pour ça qu'on met le jardin sur la pente et qu'on le couvre d'une toile, qui ne chauffe rien mais retient la chaleur qui partirait vers le ciel. Enfin, c'est l'eau qui limite le jardin. Pour en demander moins, il n'y a que le paillis. » (mesuré : 0 % de deux-points, 17 % de monotonie) |
| ch. 83, l. 58 (section 3 ; longueurs 27, 31, 19, 25) | « Une bûche ne brûle pas d'un bloc : elle évapore son eau, dégage des gaz qui portent l'essentiel de son énergie, puis laisse un charbon qui brûle lentement. Ces gaz ne chauffent que s'ils s'enflamment dans le foyer ; sinon, ils se condensent en créosote dans le tuyau froid, et la chaleur perdue pour la pièce y attend un allumage. Bois humide, air étouffé, petit feu mou dans un gros tuyau : trois façons de les laisser partir sans brûler. Le tirage exige que de l'air rentre remplacer celui qui part ; dans un chalet calfeutré, le feu manque d'oxygène et fait du monoxyde de carbone. » | « Une bûche brûle en trois temps : elle évapore d'abord son eau, puis elle dégage des gaz qui portent l'essentiel de son énergie, et à la fin il reste un charbon qui brûle lentement. Ces gaz chauffent la pièce seulement s'ils s'enflamment dans le foyer. Sinon, ils montent et se condensent en créosote dans le tuyau froid, où ils pourront prendre feu plus tard. On les laisse partir sans brûler quand le bois est humide, quand on étouffe l'air ou quand on fait un petit feu mou dans un gros tuyau. Pour que le poêle tire, il faut aussi que de l'air entre remplacer celui qui part par le tuyau. Dans un chalet calfeutré, cet air manque, alors le feu fait du monoxyde de carbone. » (mesuré : monotonie de 33 % à 0 %, liaisons de 19,6 à 32,3 pour 1000 mots) |
| ch. 107, l. 410 (la même forme que la phrase du monoxyde : un fait, « , et elle en dégage davantage quand… ») | « Une batterie garde toujours de l'hydrogène au-dessus de son acide, et elle en dégage davantage quand on la tire fort ou qu'on la recharge. L'hydrogène prend à la moindre étincelle, et ce qui saute alors n'est pas la batterie, c'est l'acide : il part au visage de celui qui est penché dessus. C'est le vrai danger de cette méthode, et il ne s'annonce pas. » | « Une batterie a toujours de l'hydrogène au-dessus de son acide, surtout quand on la tire fort ou qu'on la recharge. Une seule étincelle suffit pour l'allumer. La batterie, elle, ne saute pas : c'est l'acide qui part au visage de la personne penchée dessus. C'est le vrai danger de cette méthode : rien ne prévient. » |
| ch. 107, l. 68 (section 3 : le paragraphe ne finit pas, il s'arrête sur un fait qui n'a rien à voir avec les autres) | « Refroidi trop vite (pièce épaisse, gelée ou arrosée), le métal autour du joint durcit, reste tendu et fissure des jours plus tard : on préchauffe toute la pièce pour **ralentir** le refroidissement. L'arc brûle l'œil et la peau aux ultraviolets, et vaporise le métal avec tout ce qui le couvre. » | « Quand le métal autour du joint refroidit trop vite (une pièce épaisse, gelée ou arrosée), il durcit, il reste tendu et il fissure des jours plus tard. C'est pour ça qu'on préchauffe toute la pièce : elle refroidit plus lentement. » Puis un nouvel alinéa : « L'arc lui-même est dangereux. Ses ultraviolets brûlent l'œil et la peau, et il vaporise le métal avec tout ce qui le couvre. » |

**La cause.** La règle 1 du skill (l. 77 : « Une phrase, une information. Deux faits, deux phrases ») est appliquée à
la lettre : chaque fait devient une phrase autonome, et rien ne demande de dire le lien. La liste des « mots vides »
fait couper les liaisons. La correction du « paragraphe en paraboles » (tableau du 15 octobre, l. 335) demande
« un lien qui se lit (« ensuite », « de même », ou un nouvel alinéa) », mais elle est rangée comme un cas du ch. 3,
pas comme une règle de tout paragraphe, et aucun outil ne la mesure : `tempo.py` donne la moyenne du chapitre, pas le
paragraphe sans liaison.

### 3. La phrase qui finit sur un wagon (« , et » + un nouveau sujet) et le rythme en trois temps (gravité haute)

**Le défaut.** La phrase a dit ce qu'elle avait à dire, puis une virgule et un « et » accrochent un autre fait, avec
un autre sujet : « …font du monoxyde de carbone, et le poêle en fait plus quand… ». La voix est déjà descendue ; il
faut la relancer pour un ajout qu'on n'attendait pas. Le même geste fait le rythme en trois temps « A, B, et C »
(« le tuyau rougit, les joints cèdent, et le feu passe… ») : une cadence d'orateur, avec la virgule devant « et » à
l'anglaise, qui sonne écrit et qui annonce une chute. Le rythme en trois temps reste correct quand il suit des gestes
dans l'ordre (« On fait un cordon, on attend, on recommence », plus bas) ; il accroche quand il aligne des constats.

**Fréquence.** « , et » : 64, 62 et 57, soit 10,2 à 11,4 pour 1000 mots ; textes techniques de référence 0,9 à 3,7,
romans 2,2 à 8,3 : le lot en met plus que *Maria Chapdelaine*. Phrases qui finissent sur un ajout « , et » + nouveau
sujet : 79 sur 902 (8,8 %) ; références techniques 0 à 4,9 %. Phrases « A, B, et C » : 28, 21 et 18.

| où | le texte | la même chose bien dite |
| --- | --- | --- |
| ch. 83, l. 250 | « Le sang circule, le cœur bat, et il ne transporte plus rien. » | « Le cœur bat et le sang circule, mais ce sang ne transporte plus d'oxygène. » |
| ch. 83, l. 284 | « Quand elle s'allume, elle brûle à l'intérieur du conduit, à une température qui n'a rien à voir avec celle d'un feu de bois : le tuyau rougit, les joints cèdent, et le feu passe dans la charpente par le point le plus faible de l'installation. » | « Quand la créosote s'allume, elle brûle dans le conduit, beaucoup plus chaud qu'un feu de bois. Le tuyau rougit, puis les joints cèdent, puis le feu passe dans la charpente par le point le plus faible de l'installation. » |
| ch. 95, l. 152 | « Le monoxyde de carbone est inodore et incolore, il ne réveille pas, et il tue des gens qui dorment à côté d'un appareil qu'ils croyaient assez loin (ch. 3). » | « Le monoxyde de carbone ne se voit pas et ne se sent pas. Des gens qui dorment près d'un appareil qu'ils croyaient assez loin en meurent sans se réveiller (ch. 3). » |
| ch. 95, l. 23 | « L'eau est à portée de chaudière : le besoin publié est d'«environ 25 litres d'eau par mètre carré, par semaine (incluant l'eau de pluie) », et c'est ce chiffre-là, pas la qualité de la terre, qui plafonne un jardin hors réseau. » | « L'eau est à portée de chaudière. Un jardin demande environ 25 litres d'eau par mètre carré et par semaine, pluie comprise. Hors réseau, c'est cette eau-là, plus que la qualité de la terre, qui limite la grandeur du jardin. » |
| ch. 107, l. 566 | « Pas de fabrication maison, pas de substitut : un œil brûlé se répare mal, le monoxyde ne s'annonce pas, et une fumée qu'on respire vingt ans ne se rattrape pas. » | « On ne les fabrique pas et rien ne les remplace, parce qu'un œil brûlé se répare mal, que le monoxyde ne prévient pas et que les poumons ne se remettent pas de vingt ans de fumée. » |

**La cause.** Aucune règle n'en parle. C'est une habitude d'écriture (la virgule devant « et » vient de l'anglais ; le
rythme en trois temps est un tic connu des textes d'IA). Le skill l'a même nourrie : le tableau de la règle 15
(l. 163 à 165) donne des morceaux tout faits (« le poêle en fait plus quand on ferme presque l'entrée d'air », « il
se répand dans toute la pièce, jusqu'au plancher ») ; collés au bout d'une phrase qui existait, ils ont produit la
phrase que JP a pointée. La littérature dit le contraire : la phrase doit monter jusqu'à sa fin (Henry, cité par
Albalat, dans `plan/audit-ecriture/litterature/L1.md` : « Tâchez que le son se soutienne ou même aille en croissant
jusqu'à la fin »).

### 4. La phrase longue bâtie par incises : le verbe attend (gravité haute)

**Le défaut.** Une phrase de 50 à 80 mots dont le sujet et le verbe sont séparés par un tiret, une liste et une
parenthèse ; on arrive au verbe sans se rappeler le sujet. La longueur n'y est pour rien : Ripley fait des phrases
de 40 mots qui se lisent d'un trait parce qu'elles suivent l'ordre du travail. Le pire cas est la section 1, « En une
ligne », qui est la première phrase lue du chapitre.

**Fréquence.** Phrases de 40 mots et plus : 18, 26 et 18 (62 sur 902). Parmi les phrases de 30 mots et plus, 86 à
89 % passent par un tiret, un deux-points ou un point-virgule ; Ripley 3 %, Alberta 18 %, Wikilivres 21 %. Tirets
encore dans le texte : 41, 64 et 32. Les trois « En une ligne » font 52, 82 et 65 mots.

| où | le texte | la même chose bien dite |
| --- | --- | --- |
| ch. 95, l. 11 (82 mots ; le verbe « convertit » attend son complément « en légumes » pendant 45 mots) | « Un jardin nordique convertit une trouée de forêt, une saison d'environ 120 jours sans gel sur la côte — du 25 mai au 27 septembre en moyenne à Sept-Îles, et une trouée de l'intérieur ne suit pas forcément la station — et beaucoup d'eau portée à la main en légumes qui, eux, ne se gardent pas tout seuls : le jardin ne conserve rien — il produit ce que le caveau (ch. 79), la fermentation (ch. 80) et la conserve (ch. 78) tiennent ensuite jusqu'au printemps. » | « Le jardin nordique fait des légumes avec une trouée de forêt, une saison d'environ 120 jours sans gel et beaucoup d'eau portée à la main. Sur la côte, à Sept-Îles, cette saison va en moyenne du 25 mai au 27 septembre ; une trouée à l'intérieur des terres ne suit pas forcément ces dates. Le jardin ne conserve rien. Ses légumes se gardent ensuite jusqu'au printemps au caveau (ch. 79), en fermentation (ch. 80) ou en conserve (ch. 78). » |
| ch. 83, l. 17 (52 mots ; le sujet fait 25 mots avant « allonge ») | « Tirer d'une corde de bois tout ce qu'elle contient — bois sec sous 20 % d'humidité, charges petites brûlées à l'air ouvert, tuyau propre — allonge nettement la durée d'une pile de bois sans changer d'appareil et supprime en même temps les deux façons dont un poêle tue : la créosote et le monoxyde de carbone. » | « Avec du bois sec (sous 20 % d'humidité), de petites charges brûlées à l'air ouvert et un tuyau propre, la même pile de bois dure nettement plus longtemps, sans changer de poêle. On évite du même coup les deux façons dont un poêle tue, la créosote et le monoxyde de carbone. » |
| ch. 107, l. 10 (65 mots) | « Souder, braser et réparer le métal rend au chalet un objet qui serait autrement perdu ou à des centaines de kilomètres du premier magasin, pour aussi longtemps que la pièce d'origine si le joint est fait sur métal nu et chargé dans le bon sens — au prix d'une fumée qui donne le cancer du poumon à la longue, et que seul le déplacement d'air règle. » | « Souder, braser et réparer le métal, c'est garder au chalet un objet qu'on perdrait autrement, ou qu'il faudrait aller chercher à des centaines de kilomètres. Si le joint est fait sur du métal nu et chargé dans le bon sens, la réparation dure aussi longtemps que la pièce d'origine. En échange, la fumée donne le cancer du poumon à la longue, et seul l'air qui bouge l'emporte. » |
| ch. 83, l. 391 (57 mots) | « Monter enfin un support incombustible près du poêle, jamais plus près que le dégagement inscrit sur la plaque de l'appareil, et y garder deux jours de bois en rotation, empilé en croisillon — un rang dans un sens, le rang suivant en travers — plutôt qu'en pile serrée : l'air passe entre chaque bûche au lieu de contourner le tas. » | « Enfin, monter près du poêle un support qui ne brûle pas, jamais plus près que le dégagement inscrit sur la plaque de l'appareil. On y garde deux jours de bois en rotation, empilé en croisillon (un rang dans un sens, le rang suivant en travers) plutôt qu'en pile serrée, pour que l'air passe entre les bûches au lieu de contourner le tas. » |
| ch. 95, l. 160 | « Or la pomme de terre se garde dans un endroit frais, sec et à l'abri de la lumière justement pour réduire au minimum la formation de glyco-alcaloïdes — le mécanisme est le même au champ qu'au caveau, la lumière est la lumière. » | « C'est la même chose qu'au caveau, où on garde les pommes de terre au frais, au sec et à la noirceur pour qu'il se forme le moins possible de glyco-alcaloïdes. » |

**La cause.** Le gabarit (`gabarit-chapitre.md`, l. 15 et 16) demande pour la section 1 deux contenus (« ce que la
technique fait, et combien de temps elle fait durer ») dans « Une phrase. Pas deux. » : la phrase-wagon est la seule
façon d'obéir. Ailleurs, c'est l'habitude de l'apposition et de l'incise, que la règle du tiret déplace vers la
parenthèse et le deux-points au lieu de demander deux phrases.

### 5. La fin de paragraphe en chute (gravité moyenne)

**Le défaut.** Le bloc ne s'arrête pas sur son dernier fait : il retombe sur une formule courte, souvent en deux
temps (« X, pas Y » ; « n'a pas de X, il a Y » ; « C'est le vrai prix… : pas l'argent, la présence »). À voix haute,
c'est une chute de conférencier : la voix appuie, le lecteur n'apprend rien. `CLAUDE.md` et le skill l'interdisent
(« la chute en formule »), et elle revient presque à chaque variante d'urgence.

**Fréquence.** Blocs qui finissent en chute, relevés par motif : 9 sur 76 (ch. 83), 10 sur 74 (ch. 95), 10 sur 82
(ch. 107), soit un bloc sur huit ; le relevé en manque (ch. 95, l. 163 et l. 531 ; ch. 107, l. 450). Références
techniques : 0 sur 91 ; romans : 3 sur 104.

| où | le texte | la même chose bien dite |
| --- | --- | --- |
| ch. 83, l. 52 | « Là, on ouvre tout, on brûle du petit résineux vite, et on accepte le gaspillage. Le rendement est une stratégie de saison, pas une consigne d'urgence. » | « Là, on ouvre tout, on brûle du petit résineux vite et on accepte de gaspiller du bois. » (le bloc finit sur le geste) |
| ch. 83, l. 340 | « **Ce qu'on perd :** un chalet qui vit du mort debout épuise en une ou deux saisons celui qui se trouve à distance de traîne. C'est une solution de saison, pas un régime. » | « **Ce qu'on perd :** en une ou deux saisons, on a brûlé tout le bois mort debout assez proche pour être traîné jusqu'au chalet. » |
| ch. 83, l. 508 | « un conduit qui traverse du bois sans dégagement n'a pas de variante, il a une échéance. » | « un conduit qui traverse du bois sans dégagement finit par mettre le feu à la charpente. » |
| ch. 95, l. 456 | « **Ce qu'on perd :** toutes ces pièces se referment sur la plante, et une pièce fermée oubliée au soleil de midi cuit ce qu'elle a sauvé du gel la nuit d'avant. Elles demandent quelqu'un au chalet deux fois par jour. C'est le vrai prix d'un jardin d'urgence : pas l'argent, la présence. » | « **Ce qu'on perd :** ces abris se referment sur la plante. Si on oublie d'ouvrir celui qui l'a protégée du gel la nuit, le soleil de midi la cuit. Il faut donc quelqu'un au chalet deux fois par jour. » |
| ch. 107, l. 113 | « Si oui, éclisse boulonnée (§9). Une soudure sur une pièce qu'il faudra un jour déposer est une décision, pas un réflexe. » | « Si oui, poser une éclisse boulonnée (section 9) plutôt que de souder. » |
| ch. 107, l. 151 | « Le décapage n'est pas une finition, c'est la moitié du joint. » | (la phrase sort ; l'étape finit sur le fait d'avant : « …part dans l'air qu'on respire et dans le bain, où il fait des bulles. ») |

**La cause.** Le gabarit montre le moule qu'on interdit ailleurs : « **C'est le cœur du chapitre, pas sa queue.** »
(`gabarit-chapitre.md`, l. 101), et « Nommer honnêtement ce qu'on perd » (l. 111) devient une étiquette « Ce qu'on
perd : » qui appelle une formule pour fermer le bloc (le ch. 83 dit même « choisir honnêtement », l. 167, et « le
choix honnête », l. 479). Le skill `editeur` (l. 21) demande d'alterner des « phrases courtes (percutantes) » :
« percutante » pousse à la chute. Le script `controle.py` repère la maxime « Un X qui… ne… plus », pas le « X, pas
Y » de fin de bloc.

### 6. La citation de source collée dans la phrase (gravité moyenne)

**Le défaut.** Au milieu d'une étape, la voix du livre laisse la place à celle d'une brochure : guillemets,
vouvoiement, impératif en « -ez », parfois deux citations de suite avec leur propre ponctuation. À voix haute, on
change de ton deux fois dans la phrase, et la consigne se dit deux fois (l'infinitif du livre, puis l'impératif de la
source). Ce regard recoupe celui de la voix ; il est ici pour ce qu'il fait au rythme.

**Fréquence.** Guillemets ouvrants : 24, 52 et 43 (4,3 ; 8,6 ; 7,7 pour 1000 mots). Au ch. 95, 17 verbes au
vouvoiement ou à l'impératif en « -ez » dans le texte courant (« Insérez », « Arrosez », « Lavez », « Rendez »…).

| où | le texte | la même chose bien dite |
| --- | --- | --- |
| ch. 95, l. 173 | « **Le moment :** «Arrosez en fin d'après-midi, après une nuit fraîche. Pendant les journées chaudes, arrosez tôt le matin et en fin d'après-midi. » Et : «Il faut un arrosage modéré, mais fréquent, pour permettre un bon développement racinaire des plantes ». » | « **Choisir le moment.** Arroser en fin d'après-midi, après une nuit fraîche ; pendant les journées chaudes, arroser tôt le matin et en fin d'après-midi. Arroser souvent, sans trop d'eau à la fois, pour que les racines se développent bien. » |
| ch. 95, l. 119 | « «Insérez la truelle et prélevez un peu de terre à une profondeur équivalente à la zone racinaire de la plante cultivée (environ 15 à 30 cm). » «On recommande de faire 6 prélèvements (plus pour un très grand jardin). » Mélanger, et «conservez environ 250 ml (1 tasse) de ce mélange » » | « Enfoncer la truelle jusqu'à la profondeur des racines de la plante qu'on cultive (environ 15 à 30 cm) et prendre un peu de terre. Faire 6 prélèvements, plus pour un très grand jardin, les mélanger et garder environ 250 ml (1 tasse) du mélange. » |
| ch. 83, l. 183 | « **Attendre au moins 7 jours** avant de transvider, en brassant «pour vous assurer qu'elles sont parfaitement refroidies ». Des braises survivent des jours sous une cendre froide au toucher. » | « **Attendre au moins 7 jours** avant de transvider, en brassant les cendres pour vérifier qu'elles sont bien froides, parce que des braises restent allumées des jours sous une cendre froide au toucher. » |
| ch. 107, l. 195 | « Le gaz «peut exploser même en l'absence d'air à une température élevée, à une pression manométrique supérieure à 15 livres par pouce carré (lb/po²) [103 kilopascals (kPa)] ». Le mot important est «même en l'absence d'air » : au-dessus de ce seuil, l'acétylène ne brûle pas, il se décompose, et retirer l'oxygène ne protège de rien. » | « Au-dessus de cette pression, l'acétylène chaud peut exploser même sans air, parce qu'il ne brûle pas : il se décompose. Fermer l'oxygène ne protège donc de rien. » (la pression est dans le titre de l'étape) |
| ch. 83, l. 30 | « «Le bois vert ou résineux augmente la formation de créosote » : sur la Côte-Nord, ce n'est pas un avertissement qu'on peut suivre en changeant d'essence, c'est une contrainte permanente que la conduite du feu doit compenser. » | « Le bois vert ou résineux fait plus de créosote. Sur la Côte-Nord, on ne peut pas l'éviter en changeant d'essence, alors c'est la façon de conduire le feu qui doit compenser. » |

**La cause.** `CLAUDE.md`, règle 1 : « La provenance ne s'imprime pas » ; le skill (l. 286 à 288) : « Pas de citation de
source ». La citation mot pour mot est une attribution déguisée (« le besoin publié », « La règle publiée est
celle-là, mot pour mot », ch. 95, l. 216) : elle sert à prouver le chiffre, et la preuve appartient à `suivi/`. Ces
chapitres ont été écrits avant ces règles.

### 7. La liste trop longue dans une phrase (gravité moyenne)

**Le défaut.** Cinq à douze membres dans une même phrase, souvent sans verbe, souvent après un deux-points, avec le
membre le plus long au milieu ou au début. À voix haute, on perd le fil au quatrième et on ne sait plus à quoi se
rattache le dernier (la faute que JP a relevée dans « On est tenté… »). Quand chaque membre est un geste, c'est une
procédure tassée dans une phrase.

**Fréquence.** Phrases à six membres et plus : 7 (ch. 83), 13 (ch. 95), 15 (ch. 107), soit 3,9 % ; textes techniques
de référence 0 à 1 %.

| où | le texte | la même chose bien dite |
| --- | --- | --- |
| ch. 83, l. 498 (54 mots, cinq consignes dans une phrase) | « Restent des comportements qui réduisent le risque sans le mesurer : ne jamais étouffer le poêle, ne jamais dormir sur une charge fermée et une arrivée d'air fermée, garder une fenêtre entrouverte du côté du poêle en permanence, dormir le plus loin possible de l'appareil, et sortir au premier mal de tête inexpliqué au lever. » | « Sans avertisseur, on peut seulement réduire le risque, sans le mesurer. Il faut ne jamais étouffer le poêle ni dormir sur une charge et une arrivée d'air fermées, garder en tout temps une fenêtre entrouverte du côté du poêle et dormir le plus loin possible de l'appareil. Au premier mal de tête au lever qu'on ne s'explique pas, on sort. » |
| ch. 107, l. 19 (le membre le plus long au milieu de la série) | « Quand la pièce est en acier, qu'elle porte une charge et qu'aucun boulon ne peut reprendre l'effort : un bras de remorque fendu, un châssis de traîneau, un support de génératrice, une potence à suspendre un orignal (*Alces americanus*) qui a plié à la première bête, un pied de poêle, un attelage. » | « Quand la pièce est en acier, qu'elle porte une charge et qu'aucun boulon ne peut reprendre l'effort. C'est le cas d'un bras de remorque fendu, d'un châssis de traîneau, d'un support de génératrice, d'un pied de poêle, d'un attelage ou d'une potence à orignal qui a plié à la première bête. » (le plus long à la fin : la phrase monte au lieu de retomber) |
| ch. 107, l. 99 (six conditions, une charnière, une opposition, cinq renvois) | « Si de l'eau de consommation, de la nourriture, du sel, une saumure, une marinade ou de la sève passent un jour dessus, aucun étain de récupération et aucune baguette non étiquetée n'entre dans le joint : c'est le plomb et le cadmium qui sont fermés, pas la réparation (§8, §9, ch. 94, ch. 76, ch. 78). » | « Si la pièce va toucher de l'eau à boire, de la nourriture, du sel, une saumure, une marinade ou de la sève, on n'y met ni étain de récupération ni baguette sans étiquette. On peut quand même la réparer, mais sans plomb ni cadmium (sections 8 et 9 ; ch. 76, 78 et 94). » |
| ch. 95, l. 201 (dix membres entre points-virgules, dans une citation) | « Brun : «feuilles mortes ; pain ; marc de café (filtre inclus) ; pâtes alimentaires sans sauce ; riz ; écales de noix ; noyaux ; plantes mortes ; fleurs séchées ; papier journal déchiqueté ». » | « Le brun : les feuilles mortes, les plantes mortes, les fleurs séchées, le papier journal déchiqueté, le marc de café avec son filtre, les écales de noix, les noyaux, le pain, les pâtes sans sauce et le riz. » (regroupés par sorte : le jardin, le papier, la cuisine) |
| ch. 95, l. 460 (quatre membres sans verbe, puis un tiret) | « Semences gardées de l'année d'avant (ch. 100), pommes de terre de semence prélevées sur la récolte, caïeux défaits de la plus belle tête d'ail, plant de rhubarbe (*Rheum rhabarbarum*) divisé à la bêche au printemps — la rhubarbe est le seul poste du jardin qui se multiplie sans passer par la graine. » | « On garde les semences de l'année d'avant (ch. 100). On prend les pommes de terre de semence dans la récolte et les caïeux dans la plus belle tête d'ail. Au printemps, on divise un plant de rhubarbe à la bêche ; c'est le seul légume du jardin qui se multiplie sans passer par la graine. » |

**La cause.** La règle 12 du skill (une liste après deux-points ne mélange pas deux sortes de choses) ne dit rien de
la longueur ni de l'ordre des membres. Le skill ne dit pas qu'une suite de gestes se découpe en phrases dans la prose
comme elle se découpe en sous-étapes dans la procédure (cadre : « Une étape qui a plusieurs gestes se découpe en
sous-étapes »). Habitude : la liste sans verbe paraît dense ; elle se lit comme un inventaire.

### 8. Le tambour : la même étiquette et la même attaque en rafale (gravité basse)

**Le défaut.** Le même mot en tête de bloc à chaque fois : « **Ce qu'on perd :** » à la fin de presque chaque
variante, « **Le mécanisme :** », « **Ce qu'on fait :** » dans les dangers, « Quand… Quand… Quand… Quand… » dans la
section 2 du ch. 107, douze phrases « X : ch. N. » de suite dans la section 2 du ch. 95. Le taux global n'est pas
pire que celui des références (même premier mot : 5,2 % contre 5,8 %) ; ce sont les rafales qui battent la mesure.

**Fréquence.** « Ce qu'on perd : » 22 fois dans le lot (8, 8, 6). Ch. 95, l. 62 : 12 phrases de suite en « X : ch. N. »,
de 4 à 17 mots, dont 11 sur 12 avec un deux-points. Ch. 107, l. 19 à 28 : quatre phrases qui commencent par « Quand »,
chacune suivie d'un deux-points et d'une liste.

| où | le texte | la même chose bien dite |
| --- | --- | --- |
| ch. 95, l. 62 | « **Ce qui n'est pas dans ce chapitre.** Produire et garder ses semences : ch. 100. Entreposer les racines tout l'hiver : ch. 79. Le chou et le navet transformés en acide : ch. 80. Les pots : ch. 78. Les petits fruits sauvages qui poussent sans jardin : ch. 91. […] Les vivaces, le foin et les Trois Sœurs : ch. 99. » | « La récolte se garde au caveau (ch. 79), en fermentation (ch. 80) ou en pots (ch. 78), et les semences se gardent au ch. 100. Ce qui pousse sans jardin est aux ch. 91 (les petits fruits sauvages) et 92 (ce qui se mange en forêt). La terre, la saison plus longue, le champ, les vivaces et le fumier sont aux ch. 96, 97, 98, 99 et 101. » |
| ch. 83, l. 445 | « **Ce qu'on perd :** du temps, et la certitude. Une pièce rapportée sur une perforation ne tient pas : le métal travaille à chaque feu, et un conduit percé se raccourcit ou se remplace, il ne se répare pas. » | « Ça prend du temps, et on n'est jamais sûr du résultat. Une pièce rapportée sur un trou ne tient pas, parce que le métal travaille à chaque feu. Un conduit percé, on le raccourcit ou on le remplace. » |
| ch. 107, l. 437 | « *Ce que ça fait bien :* les cordons courts, l'acier mince à moyen, un support, une patte de poêle, une dent de herse, une ferrure. *Ce qu'on perd :* le réglage fin, donc les tôles très minces et les pièces épaisses ; le rendement, parce qu'on soude deux minutes et qu'on attend ; et de la vie de batterie, parce qu'une batterie de démarrage vidée à fond de cette manière ne revient jamais tout à fait. C'est un échange qu'on fait sciemment : une batterie contre une pièce de machine. » | « Ça marche bien pour les cordons courts et l'acier mince à moyen : un support, une patte de poêle, une dent de herse, une ferrure. Sans réglage fin, les tôles très minces et les pièces épaisses ne se font pas bien. Le travail est lent, parce qu'on soude deux minutes et qu'on attend. Et une batterie de démarrage vidée à fond de cette manière ne revient jamais tout à fait : on échange une batterie contre une pièce de machine. » |
| ch. 107, l. 22 | « Quand la pièce n'existe plus au catalogue : une bielle de commande, une ferrure de porte de grange, un support de moteur de scie (ch. 106). Quand il faut **boucher** plutôt que **tenir** : une tôle de poêle percée par la rouille, un tuyau, un réservoir d'eau — et là, c'est souvent le brasage qui convient, pas la soudure. » | Une ligne par situation, comme le veut la section 2 : « Pièce qui n'existe plus au catalogue (une bielle de commande, une ferrure de porte de grange, un support de moteur de scie, ch. 106) » ; « Tôle de poêle, tuyau ou réservoir d'eau percé à boucher, souvent au brasage plutôt qu'à la soudure ». |

**La cause.** Le gabarit (l. 111, « Nommer honnêtement ce qu'on perd ») lu comme une étiquette à poser à chaque
bloc ; les étiquettes « Le mécanisme : » et « Ce qu'on fait : » de l'ancienne section Danger, coupée par le cadre mais
encore dans ces chapitres. Habitude de l'anaphore (« Quand… Quand… ») pour faire une liste dans la prose.

### 9. Le renvoi qui coupe la phrase ou qui fait une phrase à lui seul (gravité basse)

**Le défaut.** « Voir §8. » au bout d'une étape, deux mots qui arrêtent la lecture ; des renvois entre parenthèses au
milieu de la phrase, jusqu'à cinq dans la même (« (§8, §9, ch. 94, ch. 76, ch. 78) »). À voix haute, on lit « voir
paragraphe huit » ou on saute, et la phrase perd son élan.

**Fréquence.** Renvois entre parenthèses : 9, 58 et 30 (1,6 ; 9,6 ; 5,4 pour 1000 mots). « Voir §… » en phrase seule :
8 au ch. 107. « § » : 1, 25 et 33.

| où | le texte | la même chose bien dite |
| --- | --- | --- |
| ch. 107, l. 97 | « La seule préparation qui rend un contenant soudable est au §9, et elle se fait au complet ou pas du tout. Voir §8. » | « La seule préparation qui rend un contenant soudable se fait au complet ou pas du tout (sections 8 et 9). » |
| ch. 107, l. 144 | « **Si une génératrice ou un poste à moteur alimente le travail** : dehors, loin des portes et des fenêtres, jamais sous un auvent ni une bâche. Voir §8. » | « **Si une génératrice ou un poste à moteur alimente le travail**, le mettre dehors, loin des portes et des fenêtres, jamais sous un auvent ni sous une bâche (section 8). » |
| ch. 95, l. 163 | « Le buttage est la seule opération du jardin qui empêche un poison de se former. Voir §8. » | « Le buttage est la seule opération du jardin qui empêche un poison de se former (section 8). » |
| ch. 95, l. 110 | « Écarter donc le jardin de l'aval de la latrine et des eaux grises (ch. 31), de l'endroit où on dépèce et où on lave les carcasses (ch. 61, ch. 23), et du chemin d'eau qui descend du camp. » | « Mettre donc le jardin à l'écart du chemin d'eau qui descend du camp et de l'endroit où on dépèce et lave les carcasses (ch. 23 et 61), et jamais en bas de la latrine ni des eaux grises (ch. 31). » |

**La cause.** `CLAUDE.md` demande le renvoi court (« ch. 3, étape 28 ») sans dire où il se met dans la phrase ; le
skill bannit « § » (« section N », jamais « § ») mais ces chapitres n'ont pas eu la passe.

## 3. Les passages qui marchent

1. **Ch. 107, l. 463 (la couture de vis).** « On perce un trou d'arrêt à chaque bout de la fissure, puis on perce et
   on taraude un trou le long de la fente, on y visse une vis d'acier doux ou de laiton, on la coupe à ras et on la
   mate au marteau pour qu'elle s'écrase dans le filet. » Une phrase longue qui se lit d'un trait parce qu'elle suit
   les mains : un verbe par geste, dans l'ordre, « puis » pour le passage, « pour que » pour le but, aucun deux-points.
   C'est la façon de Ripley (« Comme le bois de corde se vend généralement en longueurs de 4 pieds, il devrait être
   coupé de cette longueur et empilé entre des piquets, prêt à être charroyé »).
2. **Ch. 107, l. 176 (l'essai sur une chute).** « Régler l'intensité là, pas sur la pièce. Trop peu : l'électrode colle
   et le cordon reste bombé sans se fondre aux bords. Trop : ça creuse, ça troue, ça projette. » Court, long, court.
   Le deux-points marche ici parce qu'il suit une étiquette de deux mots qu'on dit à voix haute (« Trop peu : » veut
   dire « si c'est trop peu ») ; les trois verbes de la fin sont ce qu'on voit, dans l'ordre, sans « , et ».
3. **Ch. 95, l. 389 (le vinaigre et le bicarbonate).** « Une cuillère de terre dans un pot, du vinaigre dessus : si ça
   pétille, le sol porte du calcaire, donc il penche du côté alcalin. Une autre cuillère, mouillée à l'eau, du
   bicarbonate dessus : si ça pétille, il est acide. » Le geste, la condition, la conclusion avec « donc ». Les deux
   phrases ont la même forme parce que les deux tests sont pareils (la répétition sert), et la seconde est plus courte.
4. **Ch. 107, l. 425 (souder aux batteries).** « Le banc chauffe vite. On fait un cordon, on attend, on recommence. »
   Après une phrase de 20 mots, une de 4 et une de 7 : le rythme du travail lui-même. Le rythme en trois temps est
   juste ici parce qu'il aligne des gestes dans l'ordre du temps, avec le même sujet.
5. **Ch. 83, l. 135 (allumer par le haut).** « Le foyer se réchauffe et le tuyau monte en température pendant que les
   bûches du bas ne dégagent pas encore de gaz ; quand elles s'y mettent, leurs gaz traversent une zone déjà en
   flammes et brûlent au lieu de s'envoler. » Le mécanisme est dans l'étape qu'il explique et il suit le temps
   (« pendant que », « quand ») au lieu de sauter au deux-points. Le point-virgule pourrait être un point.

## 4. Ce que ce regard demande aux règles

Pour la réécriture du skill et pour un auditeur du tempo (seuils tirés des textes techniques de référence) :

- **Le lien se dit avec un mot.** La cause et la conséquence passent par « parce que », « comme », « donc », « alors »,
  « c'est pour ça que », « pour que ». Le deux-points reste devant une liste annoncée ou après une étiquette courte
  qu'on dit à voix haute. Le modèle de la règle 2 du skill se réécrit (« Vidanger avant que la maison descende sous
  5 °C, parce qu'un tuyau plein fend en gelant »). Seuil : deux-points dans 10 % des phrases au plus, « fait :
  conséquence » 5 % au plus.
- **Le paragraphe a un fil et une fin.** Chaque phrase reprend quelque chose de la précédente ou dit son lien ; le
  bloc finit sur son dernier fait utile, jamais sur une formule. Seuil : aucun bloc de trois phrases sans liaison,
  aucune chute de fin de bloc.
- **Pas de wagon.** Pas de « , et » qui accroche un nouveau sujet au bout d'une phrase finie : un point, ou une
  subordonnée. Le rythme en trois temps seulement pour des gestes dans l'ordre. Seuil : « , et » sous 4 pour 1000 mots.
- **La phrase monte jusqu'à sa fin.** Dans une série, le membre le plus long va à la fin ; une suite de gestes se
  découpe en phrases. Une phrase longue suit l'ordre du travail et ne se casse pas en incises.
- **Le gabarit et l'éditeur se corrigent** : « En une ligne » en une ou deux phrases courtes au lieu de « Une phrase.
  Pas deux. » ; la phrase modèle « C'est le cœur du chapitre, pas sa queue » réécrite ; « percutantes » retiré du
  skill `editeur` ; « Ce qu'on perd » dit dans la phrase, pas en étiquette à chaque bloc.
- **Les mesures entrent dans `tempo.py`**, par paragraphe et non seulement par chapitre : « , et » pour 1000 mots,
  phrase qui finit sur un ajout, chute de fin de bloc, bloc sans liaison. L'auditeur lit ensuite à voix haute :
  le script trouve les candidats, l'oreille juge.

## 5. Liste de contrôle (la part du cadre qui touche l'écriture et la langue)

- [x] Règle 1 : aucun chiffre ni fait neuf dans les réécritures ; chaque chiffre repris est celui du texte.
- [x] Règle 0 : chaque réécriture lue à voix haute, un verbe par geste, les articles gardés.
- [x] Aucun tiret (— ou –) dans les réécritures ni dans ce texte hors des citations du livre.
- [x] Pas de loi en formule, de maxime, de chute, d'opposition fabriquée, d'image ni de chose qui pense dans les
  réécritures (les oppositions gardées portent un fait : « la batterie ne saute pas, c'est l'acide »).
- [x] Pas de consigne au pronominal dans les réécritures (« on le raccourcit ou on le remplace »).
- [x] Le mot qu'on dit (« à la noirceur », « fonce la surface », « ne fait pas tousser »), sans joual ; pas de
  tutoiement.
- [x] « section N », jamais « § », dans les réécritures.
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures.
- [x] Un passage signalé se juge d'abord (doit-il exister ?) : trois réécritures coupent la phrase au lieu de la polir
  (ch. 83, l. 52 ; ch. 107, l. 113 et l. 151).
- [ ] Passe d'éditeur, correcteur `langue.py`, `controle.py` sur les chapitres : sans objet, aucun chapitre modifié.
- [ ] Sept sections, pictogrammes, points de contrôle à 8 lignes, « Quand l'utiliser » en titres : hors de ce regard ;
  ces trois chapitres ne les ont pas encore (constaté, non corrigé).
- [x] Économiser les jetons : un lot, des lectures ciblées, des sorties coupées ; rien commité.
