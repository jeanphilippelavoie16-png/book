# Audit de l'écriture : les liens entre les phrases, lot F (tomes 5 et 6)

28 octobre 2026. Un seul regard : **les liens entre les phrases**, la logique dite ou sous-entendue. À chaque point, le
lecteur sait-il si la phrase suivante est la cause de la précédente, sa conséquence, sa condition, une exception ou un
exemple ? Lot : `chapitres/83-poeles-a-bois-et-rendement.md`, `chapitres/95-jardin-nordique.md`,
`chapitres/107-souder-braser-reparer-le-metal.md`, lus au complet. Les trois chapitres sont encore dans l'ancien gabarit
(neuf sections, « Pourquoi ça marche », « Danger », tirets). Aucun fichier du livre n'a été modifié. Les réécritures sont
des exemples : aucun fait ni chiffre neuf, seulement les mots qui disent le lien et l'ordre des morceaux.

Point de départ : JP, sur le paragraphe du monoxyde (`dangers/partie-1.md`) : « le tempo du paragraphe est pas bon, pi
c'est vrai dans tout le livre ». Le ch. 83 contient, dans son encadré danger, le même paragraphe sous une forme plus
ancienne (section 2 de ces notes) : les mêmes trous de logique y sont déjà.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 83 | 5624 | 286 | 19,7 | 33,9 | 23,4 | 3,0 | 2,7 | 5,3 | 5,6 |
| ch. 95 | 6026 | 308 | 19,6 | 39,3 | 25,3 | 5,6 | 10,6 | 8,8 | 4,2 |
| ch. 107 | 5600 | 308 | 18,2 | 37,0 | 25,3 | 4,6 | 6,8 | 7,0 | 5,9 |
| **le lot** | 17250 | 902 | 19,1 | 36,8 | 24,7 | 4,5 | 6,8 | 7,1 | 5,2 |
| tout le livre | 684215 | 36580 | 18,7 | 31,4 | 23,7 | 5,0 | 9,4 | 5,4 | 5,1 |

Le lot a plus de deux-points que la moyenne du livre (36,8 % des phrases contre 31,4 %) ; le ch. 95 est l'un des plus
hauts du livre (39,3 %). Il a un peu plus de mots de liaison (7,1 pour 1000 contre 5,4), mais c'est « puis » et
« donc » qui montent ; « mais » et « parce que » restent rares.

### Les mots de liaison, un par un (`tempo.py --json`, ramenés en nombres réels)

| mot | ch. 83 | ch. 95 | ch. 107 | lot | lot, pour 1000 mots |
| --- | --- | --- | --- | --- | --- |
| parce que | 7 | 6 | 9 | 22 | 1,28 |
| car | 0 | 0 | 0 | 0 | 0 |
| donc | 7 | 14 | 5 | 26 | 1,51 |
| alors | 2 | 5 | 3 | 10 | 0,58 |
| mais | 2 | 6 | 3 | 11 | 0,64 |
| sinon | 2 | 6 | 1 | 9 | 0,52 |
| pour que | 0 | 3 | 3 | 6 | 0,35 |
| puis | 6 | 7 | 14 | 27 | 1,57 |
| ensuite | 3 | 6 | 1 | 10 | 0,58 |
| phrases « fait : conséquence » | 67 | 78 | 78 | 223 | 24,7 % des phrases |

Les lots A et E ont mesuré les sept textes de référence (`plan/audit-ecriture/references/`) : « mais » à 3,76 pour 1000
mots, 3,1 % de phrases en « fait : conséquence ». **Dans ce lot, 11 « mais » pour 17 250 mots, et 223 phrases où le
deux-points porte seul la relation entre deux propositions.**

### Ce que fait le deux-points dans les procédures (relevé à la main)

Les 61 phrases à deux-points des procédures du ch. 83 (phases A à D, étapes 1 à 30) et du ch. 107 (section 5, étapes 1
à 40), classées selon le mot qu'on dirait à voix haute à sa place :

| Le deux-points tient lieu de | Phrases (environ) | Exemple |
| --- | --- | --- |
| « parce que » (la cause vient après) | 20 | 83, l. 112 : « jamais à même le sol : le sol remonte l'humidité » |
| « donc », « alors » (la conséquence vient après) | 8 | 83, l. 104 : « l'écorce est une membrane étanche : elle sèche par les bouts » |
| « si » (une condition) | 3 | 107, l. 177 : « Trop peu : l'électrode colle » |
| un thème posé en tête, sans verbe | 5 | 107, l. 103 : « À l'aimant : l'acier et la fonte répondent » |
| « plutôt », « à la place » | 1 | 83, l. 144 : « ne pas insister : brûler une torche » |
| une antithèse | 1 | 83, l. 141 : « ne brûlent pas en liquide : ils s'évaporent » |
| une liste, un détail, une étiquette de temps (l'emploi normal) | 23 | 107, l. 216 : « Fermer dans l'ordre à la fin : chalumeau, puis… » |

Hors des listes, le deux-points remplace un mot de lien plus de huit fois sur dix (32 sur 38), et les sens se mélangent
à quelques lignes d'écart : au ch. 83, ligne 104, ce qui suit le deux-points est la conséquence ; ligne 112, c'est la cause.

### Ce que portent les tirets (relevé à la main, ch. 107)

Le lot a 175 tirets, dont 25 dans les titres. Au ch. 107, sur 34 tirets dans le texte : 9 sont l'étiquette des lignes de
Matériel, 14 encadrent une liste ou une précision (l'emploi des parenthèses), et **11, à 10 endroits, portent un lien** : une concession
(l. 12, « — au prix d'une fumée »), une conséquence (l. 434, « — et une batterie gelée est finie » ; l. 458,
« — donc une vérification »), une cause (l. 470, « — c'est long »), une consigne contraire (l. 423, « — ne pas tirer
dessus »), une condition (l. 551, « — dehors, et sans personne dans le panache »), une restriction (l. 52, « — **jamais**
près des aliments »). Ces tirets attendent la grande passe ;
la règle actuelle (« Il devient une virgule, deux-points, des parenthèses ou un point ») en fera surtout des deux-points.

### Les renvois et les citations

- 66 renvois « § » ou « section N » dans le lot (ch. 83 : 8 ; ch. 95 : 25 ; ch. 107 : 33), dont 16 « Voir § » qui
  tiennent seuls la place d'une raison.
- 109 lignes portent des guillemets (ch. 83 : 23 ; ch. 95 : 47 ; ch. 107 : 39), presque toutes des phrases de source
  recopiées. Au ch. 95, les étapes 6, 16, 23, 26, 27 et 28 sont faites surtout de citations mises bout à bout.

## 2. Le passage du lot qui ressemble au paragraphe du monoxyde

Ch. 83, l. 249 à 258 (encadré « Le monoxyde de carbone ») :

> **Le mécanisme qui tue :** le CO se fixe sur l'hémoglobine à la place de l'oxygène et ne s'en détache que très
> lentement. Le sang circule, le cœur bat, et il ne transporte plus rien. Le corps ne sonne aucune alarme, parce qu'il ne
> détecte pas le manque d'oxygène : il détecte le gaz carbonique, et celui-là continue d'être évacué normalement. On
> s'endort. C'est pour ça que le CO tue dans le sommeil sans réveiller personne.
>
> Le gaz «ne se voit pas et ne se sent pas. Il n'irrite pas les yeux ni les voies respiratoires ». Sa densité de
> vapeur, **0,96**, est presque exactement celle de l'air : il se mélange. Il n'y a pas de hauteur sûre, pas de coin
> sûr, et se coucher par terre ne sert à rien.

Lu pour ses liens, phrase par phrase :

1. L'étiquette « Le mécanisme qui tue : » tient lieu de la phrase qui dirait pourquoi on lit ça.
2. « Le sang circule, le cœur bat, et il ne transporte plus rien » : le contraste n'est pas dit (il manque « mais »), et
   « il » peut reprendre le cœur.
3. Ici le lien est écrit (« parce que »), et c'est la phrase qui se comprend le mieux. Le deux-points qui suit veut dire
   « il détecte seulement ».
4. « On s'endort. » : trois mots posés seuls. Le lecteur doit trouver de quoi c'est la conséquence.
5. « C'est pour ça que… » : le lien est écrit, mais « ça » reprend la phrase de trois mots, et la phrase redit la 4.
6. et 7. Le nouveau paragraphe revient à « rien ne prévient », que la phrase 3 avait commencé : l'ordre de l'information
   est cassé (les sens d'abord, le corps ensuite, puis le sommeil, aurait suivi le chemin du lecteur).
8. « Sa densité… : il se mélange » : un « fait : conséquence ».
9. La conséquence pratique arrive sans « donc ».

Bilan : 9 phrases, 2 liens écrits, 3 deux-points, 6 phrases qui commencent par « Le » ou « Il ». C'est le même dessin
que le paragraphe de la page du danger que JP a relevé.

Réécriture, mêmes faits :

> Le monoxyde de carbone se fixe sur l'hémoglobine à la place de l'oxygène, et il ne s'en détache que très lentement.
> Le sang continue de circuler et le cœur de battre, mais le sang ne transporte plus d'oxygène. Rien ne prévient, parce
> que le gaz ne se voit pas, ne se sent pas et n'irrite ni les yeux ni les voies respiratoires. Le corps ne donne pas
> l'alarme non plus, parce qu'il ne détecte pas le manque d'oxygène ; il détecte seulement le gaz carbonique, qui
> continue de sortir normalement. On s'endort donc au lieu de sortir, et c'est pour ça que le monoxyde tue dans le
> sommeil, sans réveiller personne. Comme sa densité (0,96) est presque celle de l'air, il se mélange à tout l'air de la
> pièce, donc aucune hauteur ni aucun coin n'est à l'abri, et se coucher par terre ne sert à rien.

Les liens passent de 2 à 7 (« mais », deux « parce que », « non plus », « donc » deux fois, « comme »), il ne reste aucun
deux-points, et chaque phrase part de ce que la précédente vient de dire. À la migration, cet encadré sort du ch. 83
(le mécanisme général est dans la page du danger) ; la correction vaut d'abord pour la page du danger.

## 3. Les défauts, du plus grave au moins grave

### 3.1 Le deux-points et le tiret à tout faire (gravité haute)

Le deux-points, ou le tiret, se met entre deux propositions à la place du mot qui dit la relation. Il veut dire
« parce que » une ligne, « donc » la suivante, « si » ou « plutôt » ailleurs ; le lecteur tranche seul à chaque fois.

Fréquence : 332 phrases sur 902 ont un deux-points (36,8 %), dont 223 en « fait : conséquence » (24,7 %) ; dans les
procédures, environ 32 des 38 deux-points qui ne sont pas des listes tiennent lieu d'un mot de lien. Environ 150 tirets
dans le texte ; au ch. 107, près d'un sur trois porte un lien.

- 83, l. 103 : « Une bûche ronde non fendue garde son écorce, et l'écorce est une membrane étanche : elle sèche par les
  bouts seulement. »
  Réécriture : « Une bûche ronde qu'on ne fend pas garde son écorce, et comme l'écorce est étanche, la bûche ne sèche que
  par les bouts. »
- 83, l. 112 (huit lignes plus bas, le même signe veut dire l'inverse) : « Empiler sur des dosseaux ou des perches,
  jamais à même le sol : le sol remonte l'humidité par capillarité et la pile pourrit par le dessous. »
  Réécriture : « Empiler sur des dosseaux ou des perches, jamais à même le sol, parce que l'humidité du sol remonte dans
  le bois par capillarité et que la pile pourrit par le dessous. »
- 83, l. 105 : « Au fendage, un coin d'acier à tête matraquée s'écaille et projette du métal à hauteur d'œil : lunettes. »
  Réécriture : « Porter des lunettes pour fendre, parce qu'un coin d'acier dont la tête est matraquée s'écaille et
  projette du métal à hauteur d'œil. »
- 107, l. 167 : « Jamais à travers un roulement, une charnière, un vérin, une boîte de vitesses ou un châssis de
  véhicule : le courant cherche le chemin le plus court et brûle ce qu'il traverse. »
  Réécriture : « Ne jamais faire passer le courant par un roulement, une charnière, un vérin, une boîte de vitesses ou un
  châssis de véhicule, parce qu'il prend le chemin le plus court et brûle ce qu'il traverse. »
- 107, l. 434 (tiret) : « Une batterie déchargée gèle, une batterie chargée non — et une batterie gelée est finie. »
  Réécriture : « Une batterie chargée ne gèle pas, mais une batterie déchargée gèle, et une fois gelée, elle est finie. »
- 95, l. 22 (tiret) : « Quelqu'un est au chalet en juillet et en août — un jardin n'est pas un équipement de fin de
  semaine, il est un animal qui boit et qui se fait manger dès qu'on tourne le dos. »
  Réécriture : « Quelqu'un est au chalet en juillet et en août, parce qu'un jardin doit être arrosé et surveillé tout
  l'été, pas seulement les fins de semaine ; dès qu'on s'absente, il sèche ou les bêtes le mangent. »

Cause : le skill `ecriture` l'enseigne. Règle 2, « Le fait d'abord, la raison ensuite », a pour modèle « Vidanger avant
que la maison descende sous 5 °C : un tuyau plein fend en gelant. » Règle 1, « Une phrase, une information. Deux faits,
deux phrases. », écarte la subordonnée en « parce que ». La section « Le tiret » donne pour remplaçants « la virgule »,
« les deux-points : « Une seule règle : la génératrice dehors. » », les parenthèses, le point, jamais le mot de liaison ;
`plan/decisions-jp.md` dit la même chose (« Il devient une virgule, deux-points, des parenthèses ou un point »).
CLAUDE.md, règle 5 (« Écrire dense ») pousse dans le même sens.

### 3.2 Les faits posés côte à côte, sans lien entre eux ni avec le geste (gravité haute)

Un paragraphe aligne des mécanismes vrais, chacun dans sa phrase, et ne dit ni comment ils s'enchaînent ni ce qu'ils
changent à la procédure. C'est le « paragraphe en paraboles » que JP a refusé au ch. 3.

Fréquence : les trois sections 3 « Pourquoi ça marche » du lot (3 sur 3), deux blocs danger (83, l. 249 ; 107, l. 327)
et une dizaine de paragraphes de la variante d'urgence.

- 83, l. 58 à 64 : « Une bûche ne brûle pas d'un bloc : elle évapore son eau, dégage des gaz qui portent l'essentiel de
  son énergie, puis laisse un charbon qui brûle lentement. Ces gaz ne chauffent que s'ils s'enflamment dans le foyer ;
  sinon, ils se condensent en créosote dans le tuyau froid, et la chaleur perdue pour la pièce y attend un allumage. Bois
  humide, air étouffé, petit feu mou dans un gros tuyau : trois façons de les laisser partir sans brûler. Le tirage
  exige que de l'air rentre remplacer celui qui part ; dans un chalet calfeutré, le feu manque d'oxygène et fait du
  monoxyde de carbone. »
  Réécriture : « Une bûche brûle en trois temps : elle évapore d'abord son eau, puis elle dégage des gaz qui portent
  l'essentiel de son énergie, et elle laisse enfin un charbon qui brûle lentement. Ces gaz ne chauffent la pièce que
  s'ils s'enflamment dans le foyer ; sinon, ils se condensent en créosote dans le tuyau froid, la pièce perd cette
  chaleur, et la créosote peut prendre feu plus tard. Ça arrive avec du bois humide, avec un feu qu'on étouffe en
  fermant l'air et avec un petit feu mou sous un gros tuyau ; c'est pour ça qu'il faut du bois sec (étape 13), de l'air
  ouvert (étapes 18 et 20) et des petites charges (étape 19). Le feu a aussi besoin que de l'air entre dans le chalet
  pour remplacer celui qui part par la cheminée ; dans un chalet calfeutré, cet air manque, et le feu fait alors du
  monoxyde de carbone (étape 17). »
- 95, l. 74 à 80 : « La contrainte du Nord n'est pas la lumière, c'est la chaleur : tout le travail revient à gagner des
  degrés et des jours aux deux bouts — sol plus sombre, plus haut, mieux drainé, couvert la nuit. Le podzol de la
  pessière est acide et pauvre : le compost n'y est pas un engrais mais un correcteur, qui retient l'eau dans le sable,
  ouvre le till et assombrit la surface. Par nuit claire et calme, le sol rayonne sa chaleur vers le ciel et l'air froid
  coule dans les creux : d'où la pente, et la toile, qui ne chauffe rien mais bloque le rayonnement. L'eau est le facteur
  limitant, et le paillis est le seul moyen d'en demander moins. »
  (Le paragraphe dit d'abord que la chaleur est la contrainte, puis que l'eau est « le facteur limitant », sans relier
  les deux.)
  Réécriture : « Au Nord, le jardin manque de chaleur plus que de lumière. Tout le travail consiste donc à gagner des
  degrés et des jours au début et à la fin de la saison : on fait un sol plus sombre, plus haut et mieux drainé, et on le
  couvre la nuit. Le sol d'une pessière (le podzol) est acide et pauvre ; on y met du compost moins pour le nourrir que
  pour le corriger, parce que le compost retient l'eau dans le sable, ouvre le till et assombrit la surface (étape 8).
  Par une nuit claire et calme, le sol perd sa chaleur vers le ciel et l'air froid descend dans les creux ; c'est pour
  ça qu'on s'installe sur la pente (étape 3) et qu'on couvre le jardin d'une toile, qui ne chauffe rien, mais empêche le
  sol de perdre sa chaleur vers le ciel (étape 20). L'autre limite, c'est l'eau, parce qu'au chalet, elle se porte à la
  main ; le paillis est le seul moyen d'en demander moins (étape 18). »
- 107, l. 68 à 70 : « Refroidi trop vite (pièce épaisse, gelée ou arrosée), le métal autour du joint durcit, reste tendu
  et fissure des jours plus tard : on préchauffe toute la pièce pour **ralentir** le refroidissement. L'arc brûle l'œil
  et la peau aux ultraviolets, et vaporise le métal avec tout ce qui le couvre. » (La dernière phrase ne se rattache à
  rien et ne dit pas ce qu'on en fait.)
  Réécriture : « Si le joint refroidit trop vite, parce que la pièce est épaisse, gelée ou arrosée, le métal autour
  durcit, reste tendu et fissure des jours plus tard ; c'est pour ça qu'on préchauffe toute la pièce, pour ralentir le
  refroidissement. Enfin, l'arc brûle l'œil et la peau par ses ultraviolets, et il vaporise le métal avec tout ce qui le
  couvre ; on se couvre donc au complet (étape 21) et on décape jusqu'au métal nu (étape 15). »
- 83, l. 439 à 443 : « Au démontage du printemps, les sections ne se remontent pas dans le même ordre. La première,
  au-dessus du poêle, travaille le plus chaud ; le haut du conduit est là où la créosote condense et où la rouille perce.
  On met les sections les plus saines aux endroits qu'on ne voit pas — la traversée de mur, la traversée de toit — et
  les plus usées à hauteur d'œil, là où on les surveille. »
  Réécriture : « Au démontage du printemps, on ne remonte pas les sections dans le même ordre, parce qu'elles ne s'usent
  pas toutes de la même façon : la première, au-dessus du poêle, chauffe le plus, et c'est dans le haut du conduit que
  la créosote se dépose et que la rouille perce. On met donc les sections les plus saines aux endroits qu'on ne voit pas
  (la traversée du mur, la traversée du toit), et les plus usées à hauteur d'œil, pour pouvoir les surveiller. »
- 83, l. 249 à 258 : le bloc du monoxyde, lu à la section 2.

Cause : l'ancien gabarit sépare le mécanisme de l'étape (section 3 « Pourquoi ça marche ») ; le rédacteur y pose les
lois une par une, sans le geste qu'elles commandent. Le skill `ecriture` décrit ce défaut (« des vérités générales
posées l'une après l'autre, chacune seule, sans lien entre elles ni avec la procédure ») et demande « un lien qui se
lit », mais ces chapitres n'ont pas eu leur passe. La règle 1 (« Deux faits, deux phrases ») et le skill `editeur`
(« alterne phrases courtes (percutantes) ») poussent vers la phrase seule. CLAUDE.md coupe la section 3 (« Un
mécanisme qui apprend quelque chose va dans l'étape qu'il explique ») : si la migration copie ces phrases dans les
étapes sans leur « parce que », le défaut change de place sans disparaître.

### 3.3 Le pourquoi absent, détaché ou renvoyé ailleurs (gravité haute)

La consigne est là, sa raison n'y est pas : elle est dans une autre section (« Voir §8 », « section 3 »), dans une phrase
à part qu'aucun mot n'attache, ou nulle part. Le lecteur qui ouvre le livre à cette étape ne sait pas ce qui arrive s'il
ne la fait pas.

Fréquence : 66 renvois « § » ou « section N », dont 16 « Voir § » qui tiennent seuls la place de la raison ; plus une
dizaine d'étapes où la raison suit sans mot de lien.

- 83, l. 97 : « Couper à la longueur du foyer, et toujours à la même longueur si on veut pouvoir compter »
  (pourquoi la même longueur permet de compter : il faut l'avoir compris à l'étape 3).
  Réécriture : « Couper à la longueur du foyer, et toujours à la même longueur, pour que le compte de l'étape 3 (le poids
  moyen d'une bûche multiplié par le nombre de bûches) reste juste. »
- 83, l. 146 : « Entrouvrir en même temps une fenêtre de la pièce du poêle si le chalet est étanche — c'est le problème
  du chalet calfeutré (section 3). »
  Réécriture : « Si le chalet est étanche, entrouvrir en même temps une fenêtre de la pièce du poêle, parce que le feu a
  besoin que de l'air entre pour remplacer celui qui part par le tuyau. »
- 95, l. 137 : « **Aucune planche de vieille terrasse démontée ne rentre dans un bac à légumes** : voir §8. »
  Réécriture : « Ne mettre aucune planche de vieille terrasse démontée dans un bac à légumes, parce qu'elle est
  probablement en bois traité à l'ACC et que ce qui en sort passe dans la terre où poussent les légumes (section 8,
  point 3). »
- 107, l. 203 : « Une baguette d'origine inconnue, trouvée dans un tiroir ou héritée d'un garage, ne s'allume pas. Voir
  §8, bloc 1. »
  Réécriture : « Ne jamais allumer une baguette d'origine inconnue, trouvée dans un tiroir ou héritée d'un garage,
  parce qu'elle peut contenir du cadmium, dont la fumée peut tuer (section 8, point 1). »
- 107, l. 226 : « Mettre la pièce en effort à la main, puis la moitié de sa charge, puis tout. Une réparation qui va
  casser casse presque toujours au premier vrai chargement. »
  Réécriture : « Mettre la pièce en effort petit à petit (à la main, puis à la moitié de sa charge, puis à pleine
  charge), parce qu'une réparation qui va casser casse presque toujours au premier vrai chargement. »
- 83, l. 193 : « noir, dur et luisant, c'est de la créosote vitrifiée — section 7. » (le renvoi tient lieu de ce qu'on
  fait)
  Réécriture : « S'il est noir, dur et luisant, c'est de la créosote vitrifiée, et il ne faut pas rallumer avant de
  l'avoir enlevée (section 7). »

Cause : l'ancien gabarit (section 8 « Danger ») et deux lignes du skill `ecriture` : « Un avertissement se dit une
fois. […] Une fois dans l'encadré danger ; ailleurs, rien, pas même « (section 8) » », et le tableau « Ce qui sort » :
« La justification collée au geste : « Ne pas rester dans l'auto : la tôle n'arrête rien. » → « Entrer dans un
bâtiment. » », qui apprend à couper le pourquoi. CLAUDE.md a changé depuis : « ce qui est propre au chapitre (la
distance, l'épaisseur, la durée) se dit dans cette étape ».

### 3.4 L'antithèse et la phrase-commentaire à la place du lien (gravité moyenne)

« Ce n'est pas X, c'est Y », « X, pas Y », « Il n'y a pas de méthode, il y a une décision » : le texte oppose deux choses
là où il fallait dire pourquoi. Même famille, la phrase en « C'est… » au bout d'un paragraphe, qui commente au lieu de
dire ce qui suit.

Fréquence : environ 34 antithèses relevées à la lecture (ch. 83 : 9 ; ch. 95 : 14 ; ch. 107 : 11), et une dizaine de
phrases-commentaires (83, l. 125, 341, 475 ; 95, l. 441, 458 ; 107, l. 413, 441).

- 107, l. 35 : « Ce n'est pas le liquide qui saute, c'est la vapeur mélangée d'air : le réservoir vidé et séché est plus
  dangereux que le plein. »
  Réécriture : « La vapeur mêlée d'air explose, et un réservoir vidé et séché en garde un fond avec beaucoup d'air ;
  c'est pour ça qu'il est plus dangereux qu'un réservoir plein. »
- 83, l. 345 : « Ce n'est pas le tranchant qui décide, c'est l'avoyage : les dents sont couchées alternativement d'un
  bord et de l'autre du plan de la lame, et c'est ça qui ouvre un trait plus large que le corps de la lame. »
  Réécriture : « Une scie coupe grâce à son avoyage plus qu'à son tranchant. Ses dents sont couchées une d'un bord, une
  de l'autre, ce qui ouvre un trait plus large que la lame ; sans avoyage, la scie coince dans son trait. »
- 95, l. 528 : « Contre l'orignal, ce n'est pas la solidité qui travaille mais l'inconfort : deux rangs de corde ou de
  ligne à pêche tendus à des hauteurs différentes découragent une bête qui ne voit pas où elle met les pattes, alors
  qu'une clôture haute et nette se saute. »
  Réécriture : « Pour l'orignal, deux rangs de corde ou de ligne à pêche tendus à des hauteurs différentes valent mieux
  qu'une clôture haute et nette : il saute la clôture, mais entre les cordes, il ne voit pas où mettre les pattes, et ça
  le décourage. »
- 107, l. 149 à 152 : « Tout recouvrement non métallique — peinture, huile, apprêt, goudron — part dans l'air qu'on
  respire et dans le bain, où il fait des bulles. Le décapage n'est pas une finition, c'est la moitié du joint. »
  Réécriture (la chute sort, la raison s'attache au geste) : « Décaper jusqu'au métal nu et brillant, des deux côtés du
  joint et sur une bonne largeur, parce que tout ce qui recouvre le métal (peinture, huile, apprêt, goudron) part dans
  l'air qu'on respire et dans le bain, où il fait des bulles. »
- 83, l. 47 : « Ce n'est pas un mauvais choix, c'est un choix aveugle : «Seul un avertisseur de monoxyde de carbone peut
  détecter la présence de ce gaz », et aucun sens humain ne prend le relais. »
  Réécriture : « On peut chauffer quand même, mais sans savoir s'il y a du monoxyde, parce que seul un avertisseur
  détecte ce gaz. La section 9 donne la conduite qui réduit le risque sans le mesurer. »
- 83, l. 123 à 125 (phrase-commentaire) : « Tant que la masse baisse, le bois sèche ; quand elle cesse de baisser, le
  bois est aussi sec que le site le permet. C'est l'humidimètre du pauvre, et il ne se brise pas. »
  Réécriture : « Tant que la masse baisse, le bois sèche ; quand elle cesse de baisser, le bois est aussi sec que le
  site le permet. La bûche témoin remplace donc l'humidimètre. »

Cause : les règles existent (skill `ecriture`, « L'opposition fabriquée » ; cadre, « pas de « X ne fait pas Y : il fait
Z » » ; `plan/decisions-jp.md`, « l'opposition fabriquée […] quand elle n'ajoute pas un fait »), mais elles disent quoi
enlever, pas quoi écrire à la place. Une antithèse coupée sans chercher le lien qu'elle cachait laisse deux faits côte à
côte (3.2). Ces chapitres n'ont pas eu leur passe.

### 3.5 La condition cachée dans un participe, un adjectif ou un nom détaché (gravité moyenne)

Un « si » ou un « quand » est sous-entendu dans un mot posé en tête (« Couchée et libre, … », « humides, … »,
« Verre teinté ou lunettes de soleil : … ») ; le lecteur doit reconstruire la condition.

Fréquence : une dizaine relevée à la lecture, surtout dans le Matériel du ch. 107 et les étapes courtes.

- 107, l. 191 : « Couchée et libre, une bouteille roule, et un détendeur arraché en fait un projectile. »
  Réécriture : « Une bouteille couchée qui n'est pas attachée roule, et si son détendeur s'arrache, elle devient un
  projectile. »
- 107, l. 80 : « **Électrodes enrobées, gardées au sec** — humides, elles criblent le joint de trous. »
  Réécriture : « **Électrodes enrobées, gardées au sec** : si elles prennent l'humidité, elles criblent le joint de
  trous. »
- 107, l. 76 : « Verre teinté ou lunettes de soleil : la pupille s'ouvre derrière, l'œil brûle. »
  Réécriture : « Un verre teinté ou des lunettes de soleil ne suffisent pas, parce que la pupille s'ouvre derrière le
  verre sombre et que l'œil brûle. »
- 107, l. 186 : « **Ne jamais souder sur une pièce mouillée, ni debout dans l'eau ou la neige fondante, ni les gants
  humides.** Le corps devient une partie du circuit. »
  Réécriture : « Ne jamais souder sur une pièce mouillée, ni debout dans l'eau ou la neige fondante, ni avec des gants
  humides, sinon le corps de la personne qui soude devient une partie du circuit. »
- 95, l. 257 (note 2) : « Posé sur une terre encore froide, il la garde froide : la pousse ralentit et la récolte
  recule. »
  Réécriture : « Si on le pose sur une terre encore froide, il la garde froide ; la pousse ralentit, et la récolte
  arrive donc plus tard. »

Cause : CLAUDE.md fixe le Matériel à « une ligne par item, 15 à 20 mots », ce qui pousse à comprimer la condition dans un
adjectif. Le skill `ecriture` (règle 0) n'interdit que le « participe en chaîne » ; le participe seul en tête passe.

### 3.6 La citation collée (gravité moyenne)

Des phrases de source, recopiées entre guillemets, sont mises bout à bout (« Et : », « Mélanger, et «conservez» »), sans
lien entre elles ni avec le geste de l'étape. Leur ordre est celui de la source, pas celui du geste, et leur voix
(« Arrosez », « Insérez », « Assurez-vous ») n'est pas celle du livre.

Fréquence : 109 lignes à guillemets ; au ch. 95, six étapes sur 32 sont faites surtout de citations.

- 95, l. 173 : « **Le moment :** «Arrosez en fin d'après-midi, après une nuit fraîche. Pendant les journées chaudes,
  arrosez tôt le matin et en fin d'après-midi. » Et : «Il faut un arrosage modéré, mais fréquent, pour permettre un bon
  développement racinaire des plantes ». »
  Réécriture : « Arroser en fin d'après-midi, après une nuit fraîche ; quand les journées sont chaudes, arroser tôt le
  matin et en fin d'après-midi. Arroser souvent et modérément, pour que les racines se développent bien. »
- 95, l. 119 à 124 : « «Insérez la truelle et prélevez un peu de terre à une profondeur équivalente à la zone racinaire de
  la plante cultivée (environ 15 à 30 cm). » «On recommande de faire 6 prélèvements (plus pour un très grand jardin). »
  Mélanger, et «conservez environ 250 ml (1 tasse) de ce mélange » — pour le laboratoire s'il en reste un, sinon pour
  les trois tests de terrain de la §9, qui se font sur le même échantillon. Pour le pH seul, l'échantillon se prend «à 20
  à 30 centimètres de profondeur ». »
  Réécriture : « Prendre un peu de terre à la truelle à six endroits du jardin (plus pour un très grand jardin), à la
  profondeur des racines de la plante cultivée, soit environ 15 à 30 cm. Mélanger, puis garder environ 250 ml (1 tasse)
  du mélange ; il servira au laboratoire s'il en reste un, sinon aux trois tests de terrain de la section 9, qui se font
  sur le même échantillon. Pour mesurer seulement le pH, prendre la terre à 20 à 30 cm de profondeur. »
- 107, l. 195 à 199 : « Le gaz «peut exploser même en l'absence d'air à une température élevée, à une pression
  manométrique supérieure à 15 livres par pouce carré (lb/po²) [103 kilopascals (kPa)] ». Le mot important est «même en
  l'absence d'air » : au-dessus de ce seuil, l'acétylène ne brûle pas, il se décompose, et retirer l'oxygène ne protège
  de rien. »
  Réécriture : « Ne jamais dépasser 103 kPa (15 lb/po²) au détendeur d'acétylène, parce qu'au-dessus de cette pression,
  l'acétylène chaud peut se décomposer et exploser même sans air ; couper l'oxygène ne protège donc de rien. »
- 83, l. 118 à 121 : « Entreposer la pile loin du chalet : «le bois de chauffage est un corps combustible, il faut donc
  veiller à l'entreposer loin des sources d'inflammation possibles », et n'en rentrer que «quelques brassées à la fois ».
  Une pile collée au mur est un mur combustible, un abri à bestioles et un chemin pour le feu. »
  Réécriture : « Entreposer la pile loin du chalet et n'en rentrer que quelques brassées à la fois, parce que le bois
  brûle ; une pile collée au mur fait un chemin pour le feu, en plus d'un abri à bestioles. »
- 95, l. 224 : « **Les feuilles se coupent le matin** et vont au froid tout de suite : «Assurez-vous que la température du
  réfrigérateur est réglée à 4 °C (40 °F) ou moins ». Au chalet sans frigo, c'est le garde-manger froid ou le caveau
  (ch. 73, ch. 79). »
  Réécriture : « Couper les feuilles le matin et les mettre au froid tout de suite, à 4 °C ou moins ; au chalet, sans
  frigo, les mettre au garde-manger froid ou au caveau (ch. 73, ch. 79). »

Cause : une habitude de la recherche (recopier la phrase de la source pour être sûr de la règle 1). Les règles l'ont
fermée depuis : CLAUDE.md, « La provenance ne s'imprime pas » ; skill `ecriture`, « Pas de citation de source » ; cadre,
« La source sert à vérifier un fait, jamais à copier une forme ». Ces chapitres sont d'avant.

### 3.7 L'étiquette de lien (gravité moyenne)

Le lien devient une étiquette suivie d'un deux-points : « Donc : », « Même raison : », « Même physique que le mur »,
« Critère de décision : », « Le mécanisme : », « idem ». Le mot est là, mais pas la phrase qui le dit.

Fréquence : une vingtaine (« Donc : » ×2 ; « Même raison / physique / logique » ×3 ; « Critère de décision », « Cible »,
« Remplacement », « idem » ; 7 « Le mécanisme… : » et 4 « Ce qu'on fait : » dans les blocs danger des ch. 83 et 107).

- 95, l. 177 à 180 : « l'eau qui touche la feuille est de l'eau qui reste sur la feuille, et l'eau contaminée est une des
  voies de contamination au champ. Donc : **arroser au pied et non sur le feuillage**, et réserver l'eau traitée du
  ch. 10 pour le lavage final. »
  Réécriture : « Pour ce qui se mange cru (laitue, radis, épinard), l'eau qui touche la feuille y reste, et l'eau
  contaminée est une des façons dont un légume se contamine au champ. Il faut donc arroser au pied, pas sur le
  feuillage, et garder l'eau traitée du ch. 10 pour le lavage final. »
- 95, l. 334 : « Il y a un enfant de 4 ans dans ce chalet. Donc : **aucun excrément d'animal au compost** »
  Réécriture : « Les enfants de moins de cinq ans sont parmi les plus exposés ; on ne met donc aucun excrément d'animal
  au compost. »
- 107, l. 182 : « **Travailler par passes courtes en alternant les extrémités** sur une pièce longue, plutôt que d'un
  bout à l'autre. Même raison : répartir la contraction. »
  Réécriture : « Sur une pièce longue, travailler par passes courtes en alternant les bouts plutôt que d'un bout à
  l'autre, pour répartir la contraction, qui tire la pièce hors de l'équerre (étape 23). »
- 95, l. 442 : « Une pierre noire posée entre deux plants, un bidon plein d'eau noirci à la suie, prennent le soleil de
  la journée et le rendent la nuit. Même physique que le mur, à l'échelle du plant. »
  Réécriture : « Une pierre noire posée entre deux plants, ou un bidon plein d'eau noirci à la suie, prend la chaleur du
  soleil pendant la journée et la rend la nuit, comme le mur, mais au pied d'un seul plant. »
- 95, l. 99 : « Critère de décision : 6 h ou plus pour les légumes-fruits et les fines herbes, 4 à 5 h pour les
  feuilles, moins que ça pour les racines qui «tolèrent la mi-ombre ». Sous 4 h, changer de trouée. » (L'étiquette
  cache aussi une contradiction apparente : « moins que ça pour les racines », puis « Sous 4 h, changer de trouée ».)
  Réécriture : « Choisir ce qu'on cultive selon ce compte : 6 h ou plus pour les légumes-fruits et les fines herbes, 4 à
  5 h pour les feuilles. Les racines tolèrent la mi-ombre, mais sous 4 h, il faut changer de trouée, même pour elles. »
- 107, l. 312 : « **Le mécanisme, et c'est lui qui compte :** les premiers symptômes — «toux, fièvre, maux de tête,
  frissons, douleurs musculaires » — arrivent «après un délai de **4 à 10 heures** », donc le soir »
  Réécriture : « Ce qui rend le cadmium si dangereux, c'est le délai : les premiers symptômes (toux, fièvre, maux de
  tête, frissons, douleurs musculaires) arrivent 4 à 10 heures après, donc le soir, à table ou au lit, longtemps après
  l'atelier. »

Cause : le skill `ecriture`, règle 9 (« Un avertissement = le mécanisme + ce qui arrive + quoi faire »), appliquée comme
un formulaire à remplir (« Le mécanisme : », « Ce qu'on fait : ») ; l'étiquette « Ce qu'on perd : » de l'ancienne
variante d'urgence sert de modèle ; l'habitude de comprimer (la règle 10, « pas du télégraphe », ne nomme pas ce cas).

### 3.8 L'ordre de l'information et la reprise floue (gravité moyenne)

La phrase pose le nouveau avant le connu, met la règle avant ses raisons sans « donc », sépare le verbe de son sujet par
une incise de 30 mots, ou reprend par un mot qui ne dit pas ce qu'il reprend (« idem », « Ce qui en tient lieu »,
« ce chiffre-là »). Les deux sections « En une ligne » du lot sont des phrases-fleuves à deux tirets.

Fréquence : les deux « En une ligne » (95 et 107), une dizaine de reprises floues relevées.

- 95, l. 11 à 15 : « Un jardin nordique convertit une trouée de forêt, une saison d'environ 120 jours sans gel sur la
  côte — du 25 mai au 27 septembre en moyenne à Sept-Îles, et une trouée de l'intérieur ne suit pas forcément la
  station — et beaucoup d'eau portée à la main en légumes qui, eux, ne se gardent pas tout seuls : le jardin ne conserve
  rien — il produit ce que le caveau (ch. 79), la fermentation (ch. 80) et la conserve (ch. 78) tiennent ensuite jusqu'au
  printemps. »
  Réécriture : « Avec une trouée de forêt, une saison d'environ 120 jours sans gel sur la côte (du 25 mai au
  27 septembre en moyenne à Sept-Îles, et une trouée de l'intérieur peut s'en écarter) et beaucoup d'eau portée à la
  main, un jardin nordique produit des légumes. Il ne les garde pas, donc on les passe ensuite au caveau (ch. 79), à la
  fermentation (ch. 80) ou en conserve (ch. 78) pour les tenir jusqu'au printemps. »
- 107, l. 10 à 13 : « Souder, braser et réparer le métal rend au chalet un objet qui serait autrement perdu ou à des
  centaines de kilomètres du premier magasin, pour aussi longtemps que la pièce d'origine si le joint est fait sur métal
  nu et chargé dans le bon sens — au prix d'une fumée qui donne le cancer du poumon à la longue, et que seul le
  déplacement d'air règle. »
  Réécriture : « Souder, braser ou réparer le métal sauve au chalet une pièce qu'on perdrait sinon, ou qu'il faudrait
  aller chercher à des centaines de kilomètres. Si le joint est fait sur du métal nu et chargé dans le bon sens, la
  réparation dure aussi longtemps que la pièce d'origine. Mais la fumée donne le cancer du poumon à la longue, et seul un
  courant d'air qui l'emporte règle ce problème. »
- 95, l. 157 : « Ce qui en tient lieu, c'est la toile posée les nuits claires et calmes, aux deux bouts de la saison
  (étape 20). »
  Réécriture : « À la place de la date, on se fie à la toile, posée les nuits claires et calmes au début et à la fin de
  la saison (étape 20). »
- 107, l. 94 : « Si elle contient «sous pression », idem (ch. 78). »
  Réécriture : « Si elle contient « sous pression », on la remplace aussi, sans la souder (ch. 78). »
- 95, l. 23 à 26 : « L'eau est à portée de chaudière : le besoin publié est d'«environ 25 litres d'eau par mètre carré,
  par semaine (incluant l'eau de pluie) », et c'est ce chiffre-là, pas la qualité de la terre, qui plafonne un jardin
  hors réseau. »
  Réécriture : « L'eau est à portée de chaudière. Un jardin a besoin d'environ 25 litres d'eau par mètre carré par
  semaine, pluie comprise, et hors réseau, c'est cette quantité, plus que la qualité de la terre, qui limite la taille
  du jardin. »
- 95, l. 113 à 115 (la maxime prend la place de la conséquence) : « Une surface de 20 m² demande jusqu'à 500 L par
  semaine de sécheresse, soit cinquante chaudières de 10 L. Le jardin qu'on arrose est toujours meilleur que le jardin
  deux fois plus grand qu'on n'arrose pas. »
  Réécriture : « Une surface de 20 m² demande jusqu'à 500 L par semaine de sécheresse, soit cinquante chaudières de
  10 L ; on choisit donc la surface selon le nombre de chaudières qu'on peut porter chaque semaine. »

Cause : la section « En une ligne » demande tout le chapitre en une phrase, qui s'allonge d'incises ; le tiret permet
d'en empiler. Pour la reprise floue, une habitude : le mot court (« idem », « ce chiffre-là ») au lieu de redire la
chose (le cadre le demande déjà pour le possessif : « On nomme la chose au lieu du possessif qui oblige à chercher »).

### 3.9 Le contraste qui manque et le mot de lien de travers (gravité basse)

Le « mais » manque là où deux faits s'opposent pour vrai ; ou le lien est écrit avec un mot de livre (« Or », « là où »
pour « alors que »), ou un « donc » saute une marche du raisonnement.

Fréquence : 11 « mais » dans le lot (0,64 pour 1000 mots, contre 3,76 dans les références) ; 1 « Or » ; 2 « là où » de
contraste ; une poignée de « donc » qui sautent une marche.

- 107, l. 329 : « Un bidon plein n'a pas assez d'air dedans. Le bidon **vidé et rincé**, lui, contient un fond de vapeur
  et beaucoup d'air : c'est exactement le mélange qui détone. »
  Réécriture : « Un bidon plein n'a pas assez d'air dedans pour ça, mais un bidon vidé et rincé contient un fond de
  vapeur et beaucoup d'air, c'est-à-dire exactement le mélange qui détone. »
- 83, l. 443 à 447 : « Un joint qui bâille se reprend à trois vis à tôle et se colmate à l'argile de bord de ruisseau
  malaxée avec du sable fin et un peu de cendre, qui cuit en place au premier feu. **Ce qu'on perd :** du temps, et la
  certitude. Une pièce rapportée sur une perforation ne tient pas : le métal travaille à chaque feu, et un conduit percé
  se raccourcit ou se remplace, il ne se répare pas. »
  Réécriture : « Un joint qui bâille, on le reprend avec trois vis à tôle et on le colmate à l'argile de bord de
  ruisseau malaxée avec du sable fin et un peu de cendre, qui cuit en place au premier feu. Mais on ne peut pas réparer
  une section percée, parce que le métal travaille à chaque feu et qu'une pièce rapportée sur le trou ne tient pas ; on
  raccourcit donc le conduit, ou on remplace la section. »
- 95, l. 160 : « Or la pomme de terre se garde dans un endroit frais, sec et à l'abri de la lumière justement pour
  réduire au minimum la formation de glyco-alcaloïdes — le mécanisme est le même au champ qu'au caveau, la lumière est
  la lumière. »
  Réécriture : « Au champ comme au caveau, la lumière fait former les glyco-alcaloïdes ; c'est pour ça qu'on garde les
  pommes de terre à l'abri de la lumière. »
- 95, l. 417 : « Elle agit très vite, là où la chaux prend six mois ou plus : un surdosage se voit la même saison. »
  Réécriture : « Elle agit très vite, alors que la chaux prend six mois ou plus ; si on en met trop, on le voit donc la
  même saison. »
- 95, l. 108 à 112 : « L'eau de ruissellement qui traverse le site vient de plus haut, donc du bois et des animaux : au
  champ, un légume se contamine par le sol, l'eau contaminée, les animaux sauvages ou domestiques et le fumier mal
  composté. Écarter donc le jardin de l'aval de la latrine et des eaux grises (ch. 31), de l'endroit où on dépèce et où
  on lave les carcasses (ch. 61, ch. 23), et du chemin d'eau qui descend du camp. » (Deux « donc » ; le second conclut
  sur la latrine, dont le raisonnement n'a pas parlé.)
  Réécriture : « Écarter le jardin de trois endroits : l'aval de la latrine et des eaux grises (ch. 31), l'endroit où on
  dépèce et où on lave les carcasses (ch. 61, ch. 23), et le chemin d'eau qui descend du camp. Au champ, un légume se
  contamine par le sol, l'eau contaminée, les animaux sauvages ou domestiques et le fumier mal composté, et l'eau qui
  ruisselle sur le site apporte ce qu'elle a ramassé plus haut, dans le bois et chez les animaux. »
- 107, l. 210 : « parce que le bronze plie là où la fonte casse »
  Réécriture : « parce que le bronze plie au lieu de casser comme la fonte »

Cause : « Or » et « là où » sont des mots de livre, que la règle 15 du skill `ecriture` vise sans les nommer ; le cadre
nomme seulement « X passe là où Y ne passe pas ». Le « mais » manque parce que le deux-points et le « lui, » détaché
(12 dans le lot : 83, l. 337 ; 95, l. 13, 463, 502, 530 ; 107, l. 222, 330, 403, 518…) portent le contraste à sa place.
Le « lui, » est du français parlé et peut rester, mais seulement quand ce qu'il oppose est dans la phrase d'avant.

## 4. Ce qui marche (modèles)

| Fichier, ligne | Le passage | Pourquoi il marche |
| --- | --- | --- |
| 107, 399 | « Une batterie d'auto de 12 V ne fait pas d'arc, mais des batteries **montées en série** additionnent leur tension : deux donnent 24 V, trois donnent 36 V. Plus la tension monte, plus l'arc s'amorce et se tient. Le nombre de batteries se règle sur une chute du même métal : on commence à deux, et on en ajoute une tant que l'arc colle ou s'éteint. » | « Mais » dit un vrai contraste (le lecteur croirait qu'une batterie suffit) ; le deux-points annonce un calcul, son emploi normal ; « plus… plus » dit la relation ; « tant que » donne la condition du geste. Chaque phrase reprend le dernier mot de la précédente (la tension, l'arc, les batteries). |
| 83, 137 | « Le foyer se réchauffe et le tuyau monte en température pendant que les bûches du bas ne dégagent pas encore de gaz ; quand elles s'y mettent, leurs gaz traversent une zone déjà en flammes et brûlent au lieu de s'envoler. » | « Pendant que », « quand », « au lieu de » : l'ordre du temps est le mécanisme, et le mécanisme est dans l'étape qu'il explique, comme le demande CLAUDE.md. (Reste, juste après, « Un allumage par le bas fait l'inverse : … ».) |
| 83, 383 | « Charger en mélange, jamais une pleine charge de vert. Une pièce humide se pose en arrière du foyer, sur le lit de braise, sous le passage des flammes de deux pièces sèches. Elle finit de sécher dans le feu au lieu de l'éteindre, et ses gaz traversent une flamme au lieu de monter froids dans le conduit. » | Le geste, l'endroit, puis ce que le geste donne ; les deux « au lieu de » nomment ce que le geste évite, une vraie alternative et pas une antithèse fabriquée. (Reste le pronominal « se pose ».) |
| 95, 389 | « Une cuillère de terre dans un pot, du vinaigre dessus : si ça pétille, le sol porte du calcaire, donc il penche du côté alcalin. Une autre cuillère, mouillée à l'eau, du bicarbonate dessus : si ça pétille, il est acide. » | « Si… donc » : ce qu'on voit, puis ce qu'on en conclut, dit en mots. Les deux tests sont construits pareil, et ça se dit comme ça à voix haute. |
| 107, 546 | « La seule préparation qui s'attaque à la cause, c'est de **ne pas laisser d'espace de vapeur** : on démonte tout ce qui se démonte, on ouvre toutes les ouvertures, on remplit le réservoir d'eau à ras bord et débordant sous le point à souder, et on travaille sur la tôle avec l'eau contre l'autre face. L'eau chasse la vapeur et tire la chaleur en même temps. » | Le principe, puis les gestes dans l'ordre, avec « on » ; la phrase suivante dit ce que l'eau fait, et elle reprend le dernier mot du geste. Le deux-points annonce une suite de gestes, son emploi normal. |

## 5. Ce que ces défauts demandent aux règles

Les lots A et E proposent la règle du deux-points, le tableau des liens, le test qui ne s'applique pas aux mots de
liaison et la méthode de l'auditeur. Ce lot ajoute :

1. **Le renvoi ne remplace pas le pourquoi.** Une étape qui renvoie (« section 8 », « ch. 109 ») garde sa raison en une
   proposition attachée au geste (« parce que… », « sinon… ») ; le renvoi dit seulement où lire le détail. La ligne
   « La justification collée au geste » du skill `ecriture` se réécrit : elle vise la justification que le lecteur
   connaît, pas la raison qui change ce qu'il fait.
2. **La citation de source se défait** avant la passe de style : on garde le fait et le chiffre, on écrit la phrase du
   livre, à l'infinitif dans une étape, avec ses liens (« quand », « pour que »). Deux citations ne se collent jamais par
   « Et : ».
3. **Les étiquettes de lien sortent** : « Donc : », « Même raison : », « Même physique », « Critère de décision : »,
   « Le mécanisme : », « idem ». Le script peut les relever.
4. **La purge des tirets des tomes 5 et 6** (environ 150 dans ce lot) remplace chaque tiret selon ce qu'il porte : la
   section « Le tiret » du skill et `plan/decisions-jp.md` mettent le mot de liaison en premier dans la liste des
   remplaçants, avant le deux-points.
5. **La migration des sections 3** suit les réécritures de 3.2 : chaque mécanisme entre dans son étape avec le mot qui
   l'attache au geste, et la contradiction apparente (« la chaleur » puis « l'eau est le facteur limitant ») se résout
   en mots avant de déplacer les phrases.
6. **Le Matériel** garde son format (« **Objet** : ce qu'il fait ») ; dans la fonction, pas de second deux-points ni
   d'adjectif qui cache une condition : « si », « sinon », « parce que ».
7. **Une antithèse qu'on coupe laisse un lien à écrire** (lot E, point 6), et la maxime de fin d'étape (95, l. 114 ;
   83, l. 341) aussi : on écrit la conséquence pour le geste (« on choisit donc la surface selon… »).
8. **La mesure** : `tempo.py` sur chaque chapitre avant et après la grande passe. Dans ce lot, « mais » est à 0,64 pour
   1000 mots et les phrases « fait : conséquence » à 24,7 % ; une passe qui ne fait pas monter le premier et descendre le
   second n'a pas touché aux liens.

## 6. Liste de contrôle (`cadre-agents.md`, parties « Pour tout agent », « Le texte » et « La langue », lignes qui touchent l'écriture et la langue)

Pour tout agent
- [x] `CLAUDE.md` prime : chargé dans le contexte, appliqué aux réécritures.
- [x] Le skill de sa partie lu au complet : `ecriture` lu au complet ; `editeur`, `gabarit-chapitre.md` et
  `plan/decisions-jp.md` cherchés par grep sur les liens, les deux-points et le tiret (le regard ne touche que les liens).
- [ ] `suivi/plan-de-match.md`, section « PAUSE du 15 octobre » : pas lu ; aucun chapitre n'est réécrit.
- [x] Règle 1 : aucun chiffre ni fait neuf dans les réécritures ; chaque chiffre vient de la phrase citée ou d'une autre
  ligne du même chapitre (étapes renvoyées par leur numéro).
- [x] Rien de commité ; un seul fichier écrit dans le dépôt, celui-ci (les réécritures ont été contrôlées dans un
  fichier du scratchpad).
- [x] Lire seulement ce que la tâche touche : les trois chapitres, les mesures, les demandes de JP, les règles par grep,
  les titres et la fin du lot E pour la forme.

Le texte, la forme du chapitre
- [ ] Sept sections : les trois chapitres sont encore en neuf (« Pourquoi ça marche », « Danger ») ; hors de ce regard,
  signalé (3.2, 3.3).
- [ ] Rien sous le titre que la ligne de lieu : les ch. 83 (l. 7) et 107 (l. 5) ont une note de lieu ; signalé, hors
  de ce regard.

Le texte, la phrase
- [x] Règle 0 : chaque réécriture lue à voix haute ; un verbe qui dit le geste, on sait qui le fait.
- [x] Jamais « d'où » : celui du ch. 95 (l. 78) est relevé et réécrit (3.2) ; aucun dans les réécritures.
- [x] Pas de maxime ni de chute en formule ; pas d'opposition fabriquée : relevées (3.4, 3.8) ; les réécritures n'en
  ajoutent pas (`controle.py` : trois avis « opposition » jugés, ce sont de vrais contrastes : la batterie chargée et la
  déchargée, le bidon plein et le vide, la chaleur et la lumière).
- [x] Pas de chose qui pense : « l'ennemi des deux », « le courant cherche », « ment », « attend un allumage » ne
  reviennent pas dans les réécritures.
- [x] Consigne jamais au pronominal dans les réécritures (« on la remplace », « les mettre au froid », « on le
  reprend ») ; le lot en a beaucoup, hors de ce regard.
- [x] La consigne se dit comme une consigne ; le sujet se nomme (« la personne qui soude »).
- [x] Le mot qu'on dit : « parce que » plutôt que « car », « alors que » plutôt que « là où », pas de « Or » ; pas de
  joual.
- [x] Aucun tiret dans les réécritures (vérifié par `controle.py` : 0) ; les tirets qui restent sont dans les citations
  du livre.
- [x] Un passage repéré comme lourd se juge d'abord : deux chutes proposées à couper (107, l. 152 ; 83, l. 125) et une
  maxime remplacée par sa conséquence (95, l. 114).
- [ ] Points de contrôle et signes d'échec à 5 à 8 lignes : le lot en a 12, 18 et 17 (points de contrôle), puis 12, 14
  et 15 (signes d'échec) ; hors de ce regard, signalé.
- [x] Le chapitre parle de son sujet : le bloc du monoxyde du ch. 83 redit la page du danger (section 2).

Le texte, la procédure et la répétition
- [x] Une étape à plusieurs gestes se découpe : la citation collée du ch. 95, étape 6, est remise en gestes dans l'ordre.
- [x] Un fait garde une seule place : redites relevées quand elles touchent un lien (le monoxyde au ch. 83 et dans la
  page du danger).

Avant de rendre
- [x] `controle.py` : sans objet sur les chapitres (aucun n'est modifié) ; lancé sur les réécritures seules : 0 tiret ;
  une tournure (« la procédure demande ») et trois mises en relief corrigées ; les mots vides restants ont leur sens
  (« tout l'été », « toute la pièce ») ; deux redites voulues (le même fait cité dans deux exemples).

La langue
- [x] Le français écrit correct dans les réécritures, avec les mots du Québec quand ils sont justes ; ni joual ni
  anglicisme ; une seule série d'alternatives par phrase.
- [x] `langue.py` lancé sur les réécritures seules, avec LanguageTool : 20 avis, 2 corrigés (deux virgules), 18 faux
  positifs (mots du livre : dosseaux, till, ACC, avoyage, humidimètre, glyco-alcaloïdes, latrine ; « Nord » qui nomme la
  région ; « grâce à son », « la rend la nuit », places d'adjectifs et accords justes).
