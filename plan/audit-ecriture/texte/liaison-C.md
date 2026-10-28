# Audit de l'écriture : les liens entre les phrases, lot C (tome 2 : ch. 25, 26 et 39)

28 octobre 2026. Un seul regard : **les liens entre les phrases**, la logique dite ou laissée à deviner. À chaque
passage d'une phrase à la suivante, le lecteur sait-il si la seconde est la cause de la première, sa conséquence, sa
condition, une exception, un exemple ou une autre affaire ? Lot : `chapitres/25-le-froid-lui-meme.md`,
`chapitres/26-soigner-quand-il-n-y-a.md` et `chapitres/39-des-enfants-de-4-et-6-ans.md`, lus au complet. Aucun
fichier du livre n'a été modifié.

L'état du lot compte pour la lecture : les ch. 25 et 39 sont encore au vieux gabarit (neuf sections, « Pourquoi ça
marche », tirets, « village », « § ») ; le ch. 26 est le pilote du tome 2 au gabarit final, passé par le rédacteur, le
vérificateur technique et l'éditeur. Le lot permet donc de voir ce que la refonte fait aux liens.

Les réécritures sont des exemples. Elles n'ajoutent aucun fait ni aucun chiffre : elles ajoutent le mot qui dit le
lien et remettent les morceaux dans l'ordre. Quand le texte ne dit pas quel lien il voulait, la réécriture est marquée
**à trancher** : c'est justement le défaut. Les citations sont mot pour mot ; quand elles tiennent sur plusieurs lignes
du fichier, les retours à la ligne sont remplacés par une espace, le gras et les pictogrammes `{!…}` sont enlevés. Elles
gardent les tirets du texte des ch. 25 et 39 ; les réécritures n'en ont aucun.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | var. | ≤6 % | mono % | « : » % | fait:csq % | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 25 (vieux gabarit) | 4805 | 243 | 19,8 | 0,79 | 12,8 | 18,6 | 36,2 | 23,5 | 6,0 | 2,9 |
| ch. 26 (gabarit final) | 5903 | 275 | 21,5 | 0,54 | 3,6 | 32,1 | 29,5 | 22,9 | 4,6 | 5,5 |
| ch. 39 (vieux gabarit) | 5593 | 312 | 17,9 | 0,63 | 16,0 | 19,9 | 27,2 | 19,6 | 3,2 | 2,9 |
| **le lot** | 16301 | 830 | 19,6 | 0,66 | 11,0 | 23,5 | 30,6 | 21,8 | 4,5 | 3,7 |
| les 7 références (`plan/audit-ecriture/references/`) | 17297 | 807 | 21,4 | 0,66 | 13,0 | 27,4 | 6,3 | 3,1 | 9,2 | 5,8 |

Trois chiffres sortent du lot. Le ch. 39 a 3,2 mots de liaison pour 1000 mots, parmi les plus bas du livre (seuls les
ch. 15, 33 et 47 sont plus bas). Le ch. 26 est le chapitre le plus monotone du livre (32,1 % de phrases voisines de
presque même longueur, le plus haut de `mesures.md`) et celui qui a le moins de phrases courtes (3,6 %, le plus bas).
Toutes ses phrases ont la même forme : un geste, puis sa raison, avec un deux-points ou un point entre les deux.

### Les mots qui disent le lien (`tempo.py --json` et `grep -w`, nombres réels)

| mot | ch. 25 | ch. 26 | ch. 39 | le lot (16 301 mots) | les 7 références (17 297 mots) |
| --- | --- | --- | --- | --- | --- |
| parce que | 6 | 2 | 5 | 13 | 6 |
| car | 0 | 0 | 0 | 0 | 26 |
| donc | 2 | 0 | 1 | 3 | 11 |
| alors | 1 | 3 | 3 | 7 | 12 |
| mais | 6 | 1 | 1 | 8 | 65 |
| sinon | 1 | 3 | 0 | 4 | 0 |
| « comme » qui veut dire « parce que » | 0 | 1 | 0 | 1 | non mesuré |
| c'est pour ça que, par contre, pourtant | 0 | 0 | 1 | 1 | non mesuré |
| deux-points | 91 | 84 | 87 | 262 | 52 |

**Le ch. 26 a un seul « mais » et aucun « donc » en 5 903 mots ; le ch. 39, un « mais » et un « donc » en 5 593 mots.**
Le lot a huit fois moins de « mais » que les références, et cinq fois plus de deux-points.

### Ce que la refonte a fait aux liens du ch. 26 (`git show`, puis `tempo.py`)

| version du ch. 26 | mots | parce que | donc | mais | liais./1000 | « : » % |
| --- | --- | --- | --- | --- | --- | --- |
| avant la refonte (`bc816f4f`) | 5556 | 11 | 4 | 4 | 6,8 | 31,2 |
| pilote au gabarit final (`6acaeb6f`) | 5550 | 3 | 0 | 1 | 4,3 | 30,5 |
| aujourd'hui, après l'éditeur | 5903 | 2 | 0 | 1 | 4,6 | 29,5 |

À longueur égale, la refonte a enlevé huit « parce que » sur onze, tous les « donc » et trois « mais » sur quatre. Le
vieux texte avait d'autres défauts (participes en chaîne, tirets, pronominal), et la refonte les a corrigés ; mais en
refaisant la phrase, elle a remplacé le mot du lien par un deux-points ou par « et ». Quatre exemples, mot pour mot :

| Avant la refonte (`bc816f4f`) | Aujourd'hui |
| --- | --- |
| « plié pendant qu'il sèche et non après, parce qu'une fois sec chaque manipulation ramène quelque chose sur la face qui touchera la plaie » (ligne 373) | « le plier pendant qu'il sèche, pas après : une fois sec, chaque fois qu'on le manipule, on dépose quelque chose sur la face qui touchera la plaie » (ligne 341) |
| « jamais une ceinture étroite, parce que la largeur est ce qui répartit la pression » (ligne 389) | « jamais une corde, un fil ou une ceinture étroite : la largeur répartit la pression » (ligne 361) |
| « roulé d'un bloc sur le côté par deux personnes, parce que quelqu'un d'attaché sur le dos qui vomit s'étouffe avec » (ligne 422) | « d'un bloc sur le côté (repère 8) : une personne attachée sur le dos qui vomit s'étouffe » (ligne 417) |
| « sous stress on compte trop vite, donc une pression directe comptée cinq minutes en dure moins » (ligne 478) | « on compte trop vite, et l'appui dure moins de 5 minutes » (ligne 459) |

La passe d'éditeur (`11a1b638`) a fait la même chose : « Le rythme des compressions se prend avec les mains : la
formation le fait pratiquer » est devenu « On apprend le rythme des compressions avec les mains, et la formation le
fait pratiquer » (ligne 271) ; elle a corrigé le pronominal et remplacé le deux-points par « et », pas par « c'est pour
ça que ».

### Ce que fait le deux-points (relevé à la main, ch. 26)

Le ch. 26 a 87 phrases à deux-points. Hors lignes de Matériel, section 2 et notes qui définissent un mot, il en reste
environ 80, classées ici selon le mot qu'on dirait à voix haute à la place du deux-points :

| Le deux-points tient lieu de | Phrases | Exemple |
| --- | --- | --- |
| « parce que » (la raison vient après) | environ 30 | « La coucher sur le dos, sur le plancher : un matelas plie sous les mains. » (ligne 58) |
| « donc », « alors », « il faut donc » (la conséquence ou le geste vient après) | environ 19 | « Plus de 8 heures sans uriner […] veut dire que la vie est en jeu : partir. » (ligne 229) |
| « mais », « même si », « alors que » | 3 | lignes 180, 242 et 443 (section 3.1) |
| « par exemple » | 1 | « même sans une goutte de sang dehors : une cuisse cassée, un coup au ventre » (ligne 225) |
| une liste, une définition, un détail (l'emploi normal) | environ 15 | « compte comme une morsure dans trois cas : » (ligne 199) |
| une étiquette (« Ce qu'on perd : », « Autre façon : ») | environ 11 | « *Ce qu'on perd :* l'immobilisation du cou et du dos. » (ligne 414) |

Hors étiquettes, **trois deux-points sur quatre remplacent un mot de liaison**, et le même signe annonce tantôt la
raison (ligne 58), tantôt la conséquence (ligne 229), tantôt l'inconvénient (ligne 180). Le lecteur tranche à chaque
fois, et à la ligne 180 il tranche mal (section 3.1).

### Les paragraphes sans aucun mot de lien

Un petit script (dans le brouillon de la session, pas dans le dépôt) a relevé les paragraphes et les étapes de trois
phrases et plus qui n'ont **aucun** mot de lien. La liste est large : parce que, donc, alors, mais, car, sinon, pour
que, c'est pour ça, par contre, sauf, même si, quand même, pourtant, puisque, ensuite, d'abord, puis, au lieu, plutôt,
aussi.

| texte | paragraphes ou étapes de 3 phrases et plus | sans aucun mot de lien |
| --- | --- | --- |
| ch. 25 | 43 | 23 |
| ch. 26 | 50 | 27 |
| ch. 39 | 49 | 37 |
| **le lot** | 142 | **87 (61 %)** |

Six paragraphes sur dix posent leurs phrases l'une à côté de l'autre sans un seul mot qui dise comment elles se
tiennent, même en comptant « puis » et « aussi ».

## 2. Le paragraphe du monoxyde, et sa version du ch. 39

JP a dit du paragraphe du monoxyde (`dangers/partie-1.md`, ligne 3) que « le tempo est pas bon ». Le ch. 39 dit les
mêmes faits, avec les liens :

> Il se fixe sur l'hémoglobine à la place de l'oxygène, et l'enfant en absorbe plus vite parce qu'il respire plus vite
> par kilo. […] Le monoxyde ne monte pas au plafond et ne tombe pas au plancher : il a presque la densité de l'air et se
> mélange partout, donc coucher les enfants au ras du sol ou sur la mezzanine ne change rien. (ch. 39, lignes 231 à 238)

La page des dangers dit : « Il se répand dans toute la pièce, jusqu'au plancher : se coucher par terre ne protège
pas. » La passe des mots (skill `ecriture`, règle 15) a remplacé les mots de livre (« hémoglobine », « densité »,
« incolore et inodore ») par les mots qu'on dit, et elle a perdu le « donc » en route. Le ch. 39 a les liens avec les
mots de livre ; la page des dangers a les mots qu'on dit sans les liens. La bonne version prend les deux :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus quand
> on ferme presque l'entrée d'air pour la nuit. On ne voit pas ce gaz et on ne le sent pas, et il prend la place de
> l'oxygène dans le sang. C'est pour ça qu'on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans
> toute la pièce, jusqu'au plancher, donc se coucher par terre ne protège pas.

Le ch. 39 ajoute la raison (« il a presque la densité de l'air ») ; elle peut entrer dans la page des dangers, mais
c'est un fait de plus pour cette page, à décider avec sa limite de 230 mots.

## 3. Les défauts, du plus grave au moins grave

### 3.1 Le deux-points à tout faire (gravité haute)

**Le défaut.** Le deux-points remplace « parce que », « donc », « mais », « alors que » et « par exemple ». Le même
signe ouvre une raison, une conséquence, un contraste ou un inconvénient, et rien ne dit lequel. Quand la phrase après
le deux-points est un inconvénient ou un contraste, le lecteur la lit comme une raison et comprend de travers.

**Fréquence.** 262 deux-points dans le lot (52 dans les références, à longueur égale) ; 21,8 % des phrases en
« fait : conséquence » (3,1 % dans les références). Au ch. 26, environ 53 deux-points sur 70, hors étiquettes, tiennent
lieu d'un mot de liaison.

| Fichier, ligne | Le texte | Le lien que le lecteur doit deviner | Réécriture |
| --- | --- | --- | --- |
| ch. 26, 180 | « Laisser ouverte la plaie sale, la plaie profonde, la piqûre et la morsure, sous une gaze humide qu'on change chaque jour : une plaie laissée ouverte coule et guérit lentement. Refermée trop tôt, elle enferme les microbes, enfle et s'infecte sans qu'on le voie. » | Le deux-points annonce partout ailleurs la raison du geste ; ici il annonce l'inconvénient du geste. La vraie raison vient dans la phrase suivante, sans mot. Lu vite : « on la laisse ouverte pour qu'elle guérisse lentement ». | « Laisser ouverte la plaie sale, la plaie profonde, la piqûre et la morsure, sous une gaze humide qu'on change chaque jour. Une plaie laissée ouverte coule et guérit lentement, mais si on la referme trop tôt, elle enferme les microbes, enfle et s'infecte sans qu'on le voie. On ne rapproche donc les bords que d'une coupure propre et franche. » |
| ch. 26, 242 | « Le vieux réflexe est de servir du foie à une personne qui a perdu du sang : le foie et les reins d'orignal et de cerf accumulent le cadmium, qui reste ensuite des dizaines d'années dans les reins de la personne qui en mange ; on ne les sert à personne (ch. 22). » | « mais » : le réflexe, puis ce qui le rend dangereux. Le point-virgule tient lieu de « donc ». | « Le vieux réflexe est de servir du foie à une personne qui a perdu du sang, mais le foie et les reins d'orignal et de cerf accumulent le cadmium, qui reste ensuite des dizaines d'années dans les reins de la personne qui en mange. On ne les sert donc à personne (ch. 22). » |
| ch. 39, 282 | « Elle ne bloque rien et ne fait pas mal tout de suite : coincée dans l'œsophage, elle referme un circuit à travers les tissus humides et les brûle par électrolyse en quelques heures. » | « mais » : rien ne paraît, et pourtant elle brûle. Avec le deux-points, la phrase semble expliquer pourquoi elle ne fait pas mal. | « Elle ne bloque rien et ne fait pas mal tout de suite, mais quand elle reste coincée dans l'œsophage, elle referme un circuit à travers les tissus humides et les brûle par électrolyse en quelques heures. » |
| ch. 26, 443 | « Le sucre fait passer le sel et l'eau à travers la paroi de l'intestin : l'eau seule, donnée à quelqu'un qui a la diarrhée, ressort comme elle est entrée. » | « alors que » : un contraste entre l'eau sucrée et l'eau seule. | « Le sucre fait passer le sel et l'eau à travers la paroi de l'intestin, alors que l'eau seule, donnée à quelqu'un qui a la diarrhée, ressort comme elle est entrée. » |
| ch. 26, 52 | « Une personne qui répond clairement respire et a assez de sang au cerveau : passer à ce qui saigne (étape 6), puis à la plaie (étape 23). » | « donc » : parce qu'elle respire, on peut passer au saignement. | « Si elle répond clairement, c'est qu'elle respire et qu'il lui arrive assez de sang au cerveau ; on peut donc passer à ce qui saigne (étape 6), puis à la plaie (étape 23). » |
| ch. 25, 87 | « L'isoler du sol avant de l'isoler du ciel. Un matelas ou deux sous elle : beaucoup de chaleur part vers le sol par conduction. » | « parce que », après une ligne sans verbe. | « Mettre un matelas ou deux sous elle avant de la couvrir, parce que le sol lui prend beaucoup de chaleur par contact. » |

**La cause.** Le skill `ecriture` donne le deux-points comme le modèle de la raison, règle 2 : « Le fait d'abord, la
raison ensuite… "Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant." » C'est le seul
exemple de raison du skill, et il n'a pas de « parce que ». La section « Le tiret » envoie le tiret vers « les
deux-points : "Une seule règle : la génératrice dehors." », sans dire que le tiret portait souvent un lien ; les ch. 25
et 39 en ont encore (« Pas de café — diurétique — », ch. 25, ligne 104 ; « L'entrée plus basse que la plateforme où l'on
couche — l'air froid tombe et reste en bas », ch. 25, ligne 442), et leur refonte en fera des deux-points si la règle ne
change pas. L'historique du ch. 26 (section 1) montre l'habitude à l'œuvre : la refonte et l'éditeur ont changé des
« parce que » et des « donc » en deux-points.

### 3.2 Les faits posés côte à côte (gravité haute)

**Le défaut.** Un paragraphe ou une étape aligne trois, quatre, cinq phrases qui partent chacune de zéro. Chaque phrase
est juste ; c'est leur suite qui ne se lit pas. Le lecteur doit reconstruire que la deuxième explique la première et que
la troisième en est la conséquence. C'est le « paragraphe en paraboles » que JP a refusé au ch. 3, et c'est ce qu'il
entend comme un tempo qui accroche : chaque phrase retombe, la suivante repart.

**Fréquence.** 87 paragraphes ou étapes de trois phrases et plus sur 142 (61 %) n'ont aucun mot de lien.

| Fichier, ligne | Le texte | Le lien que le lecteur doit deviner | Réécriture |
| --- | --- | --- | --- |
| ch. 39, 43 | « Un petit corps a beaucoup de peau pour peu de masse : il se refroidit plus vite qu'un adulte et se réchauffe moins bien, faute de muscle pour frissonner. Ses réserves d'eau et de sucre sont petites : une gastro ou un repas sauté mènent à la déshydratation ou à l'hypoglycémie en heures, pas en jours. Il respire plus vite par kilo : à air égal, il absorbe plus de monoxyde et de fumée. Toute dose, de poison comme de médicament, se calcule au kilo : ce qui indispose un adulte intoxique un enfant. Et il ne se sauve pas seul : la barrière physique bat la consigne verbale, toujours. » | Cinq phrases, cinq deux-points, aucun mot entre les phrases ; la dernière finit en maxime, et son deux-points saute une étape du raisonnement (il ne se sauve pas seul, **donc** il faut une barrière). | « Un petit corps a beaucoup de peau pour peu de masse, alors il se refroidit plus vite qu'un adulte, et comme il a peu de muscle pour frissonner, il se réchauffe moins bien. Ses réserves d'eau et de sucre sont petites aussi, et c'est pour ça qu'une gastro ou un repas sauté le mènent à la déshydratation ou à l'hypoglycémie en quelques heures, pas en quelques jours. Il respire plus vite pour son poids, donc dans le même air, il absorbe plus de monoxyde et de fumée qu'un adulte. Et comme toute dose, de poison ou de médicament, se calcule au kilo, ce qui rend un adulte un peu malade intoxique un enfant. Enfin, un enfant ne se sauve pas seul, alors une barrière qu'il ne peut pas passer le protège toujours mieux qu'une consigne. » |
| ch. 25, 107 | « Attendre. Le rythme sécuritaire est de 1 à 2 °C par heure. Une personne qui ne remonte pas en dix minutes n'est pas un échec du traitement. » | Trois phrases pour un seul raisonnement : on attend **parce que** le corps remonte lentement, **donc** dix minutes sans progrès ne veulent rien dire. | « Attendre, parce que le corps ne remonte sans danger que de 1 à 2 °C par heure. Si la personne n'a pas remonté au bout de dix minutes, ça ne veut donc pas dire que le traitement ne marche pas. » |
| ch. 25, 204 | « Ils refroidissent plus vite, pour une raison de géométrie. Le rapport surface sur volume d'un petit corps est plus grand, et la perte de chaleur est proportionnelle à la surface exposée. À vêtements et à activité égale, un enfant de 4 ans est toujours le premier en difficulté du groupe. » | La conclusion arrive sans « c'est pour ça que » ; le titre annonce la raison au lieu de la dire. | « Un petit corps a plus de surface pour son volume qu'un grand, et comme on perd sa chaleur en proportion de la surface exposée, un enfant refroidit plus vite. C'est pour ça qu'à vêtements et à activité égale, un enfant de 4 ans est toujours le premier du groupe à être en difficulté. » |
| ch. 39, 88 | « Une cendre grise, éteinte et froide au toucher garde des braises vivantes en dessous pendant des jours. Elle va dans un contenant de métal à couvercle de métal, posé dehors sur le sol nu, et y reste au moins 7 jours avant d'être vidée. Un seau de plastique, une boîte de carton ou un contenant posé sur une galerie de bois : le plastique fond ou la galerie prend, des heures après que le poêle a été vidé et que tout le monde s'est couché. » | Le fait, puis le geste sans « donc », puis une liste de noms qui cache un « si on la met dans ». | « Une cendre grise, éteinte et froide au toucher garde des braises vivantes en dessous pendant des jours. On la met donc dans un contenant de métal à couvercle de métal, posé dehors sur le sol nu, et on l'y laisse au moins 7 jours avant de le vider. Si on la met dans un seau de plastique ou une boîte de carton, ou si on pose le contenant sur une galerie de bois, le plastique fond ou la galerie prend feu, des heures après qu'on a vidé le poêle et que tout le monde s'est couché. » |
| ch. 26, 83 | « Une personne peut mourir d'une grosse perte de sang en moins de 5 minutes. Chaque fois qu'on soulève la main pour regarder, on défait le caillot qui commençait à se former. Appuyer de tout son poids, les bras tendus, pendant au moins 5 minutes pleines à la montre avant de regarder : sous le stress, on compte trop vite. Si ça saigne encore, reprendre l'appui et recompter. Quand ça gicle, appuyer jusqu'à ce que le sang arrête, ou jusqu'à ce que le garrot soit posé. » | Deux « 5 minutes » côte à côte qui ne veulent pas dire la même chose ; les raisons ne sont pas collées à leur geste ; la dernière phrase est une exception à la règle des 5 minutes, sans « mais ». | « Appuyer avec la paume, directement sur la plaie, de tout son poids, les bras tendus, parce qu'une personne peut mourir d'une grosse perte de sang en moins de 5 minutes. Ne pas relâcher pour regarder, sinon on défait le caillot qui commençait à se former. Garder l'appui au moins 5 minutes pleines, à la montre, parce que sous le stress, on compte trop vite ; si ça saigne encore, reprendre l'appui et recompter. Mais quand ça gicle, appuyer jusqu'à ce que le sang arrête, ou jusqu'à ce que le garrot soit posé. » |

**La cause.** Skill `ecriture`, règle 1 : « Une phrase, une information. Deux faits, deux phrases. » La règle coupe, et
aucune règle ne dit ensuite comment les deux phrases se tiennent. Le défaut est nommé dans le tableau du 15 octobre
(« Le paragraphe en paraboles : des vérités générales posées l'une après l'autre, chacune seule, sans lien entre elles
ni avec la procédure »), avec son correctif (« on passe d'un mécanisme à l'autre par un lien qui se lit »), mais il ne
vit que dans ce tableau, pas dans les règles 0 à 15 qu'on applique phrase par phrase. `CLAUDE.md`, règle 5 (« Écrire
dense ») pousse dans le même sens. Aux ch. 25 et 39, la section 3 « Pourquoi ça marche » est le lieu même du défaut.

### 3.3 Le pourquoi mal placé ou absent (gravité haute)

**Le défaut.** La raison d'un geste arrive après un autre geste, à la fin de l'étape, dans l'étape suivante ou dans une
autre section. Le lecteur l'attache au geste qui la précède, qui n'est pas le bon, ou ne la trouve pas.

**Fréquence.** Environ 18 relevés à la lecture (7 au ch. 25, 6 au ch. 26, 5 au ch. 39).

| Fichier, ligne | Le texte | Ce qui se passe | Réécriture |
| --- | --- | --- | --- |
| ch. 39, 501 | « 4. Réchauffer le tronc, pas les membres. Bouillotte de fortune sur la poitrine, les aisselles, le creux de l'aine : […] 5. Ne pas frotter, ne pas masser, ne pas asseoir devant le poêle. Réchauffer les bras et les jambes en premier renvoie vers le cœur le sang froid qui stagnait dans les membres. » | La raison de l'étape 4 est à la fin de l'étape 5, où elle semble expliquer « ne pas frotter ». | « 4. Réchauffer le tronc, pas les membres, parce que réchauffer les bras et les jambes en premier renvoie vers le cœur le sang froid qui stagnait dans les membres. […] 5. Pour la même raison, ne pas frotter, ne pas masser, ne pas asseoir l'enfant devant le poêle. » (« Pour la même raison » est la lecture que l'ordre du texte suggère ; à confirmer à la source.) |
| ch. 26, 435 | « Rouler chacune dans deux épaisseurs de linge et la poser aux aisselles, aux plis de l'aine et sur le tronc, pas sur les bras ni sur les jambes. Une autre personne couchée sous les mêmes couvertures réchauffe aussi, plus lentement. Une peau froide ne sent pas la brûlure, et une personne refroidie ou assommée ne retire pas son bras : ce qui est confortable pour une main chaude brûle un corps froid, et on découvre la brûlure le lendemain. » | La raison des deux épaisseurs de linge vient deux phrases plus loin, après « une autre personne », et semble parler de cette personne. | « Rouler chacune dans deux épaisseurs de linge, parce qu'une peau froide ne sent pas la brûlure et qu'une personne refroidie ou assommée ne retire pas son bras : ce qui est confortable pour une main chaude brûle un corps froid, et on ne découvre la brûlure que le lendemain. La poser aux aisselles, aux plis de l'aine et sur le tronc, pas sur les bras ni sur les jambes. Une autre personne couchée sous les mêmes couvertures réchauffe aussi, mais plus lentement. » |
| ch. 26, 88 | « Si le sang traverse la compresse, la laisser en place. En mettre une seule autre par-dessus et appuyer plus fort. Une pile de compresses éloigne la main du point qui saigne, et en retirant la première, on arrache le caillot qui avait pris. » | Deux gestes, puis leurs deux raisons ensemble, dans l'ordre inverse. | « Si le sang traverse la compresse, la laisser en place, parce qu'en la retirant, on arracherait le caillot qui a pris. En mettre une seule autre par-dessus, pas plus, parce qu'une pile de compresses éloigne la main du point qui saigne, et appuyer plus fort. » |
| ch. 39, 123 | « Cible de la pièce chaude : 19 °C ou plus, lus à la hauteur du lit des enfants. Repère qui se lit sans thermomètre : […] ne l'est pas. L'air d'une pièce chauffée au poêle est stratifié : le lit d'un enfant au plancher est dans une autre pièce que le thermomètre posé sur la table. » | La raison de « à la hauteur du lit » arrive après le repère sans thermomètre, qu'elle ne concerne pas. | « Viser 19 °C ou plus dans la pièce chaude, lus à la hauteur du lit des enfants, parce que l'air d'une pièce chauffée au poêle est en couches : un enfant couché au plancher n'a pas la température du thermomètre posé sur la table. Sans thermomètre, un enfant qui dort les bras sortis de la couverture a assez chaud ; un enfant qui dort en boule, la tuque enfoncée, n'a pas assez chaud. » |
| ch. 26, 173 | « Prendre de l'eau bouillie, puis refroidie, et la pousser en jet […]. En pousser 100 à 300 mL, plus pour une grande plaie, et continuer jusqu'à ce qu'on ne voie plus de saleté. La force du jet décolle la saleté, pas un produit. L'eau de puits qui n'a pas bouilli ajoute ses microbes dans la plaie (ch. 10) ; à la maison, l'eau de l'aqueduc convient telle quelle, sauf quand elle est sous avis d'ébullition. » | La raison de l'eau bouillie est la dernière phrase de l'étape, trois phrases après son geste ; elle a été ajoutée en queue d'étape après la vérification technique (`de2c1fb4`). | « Prendre de l'eau bouillie, puis refroidie, parce que l'eau de puits qui n'a pas bouilli ajoute ses microbes dans la plaie (ch. 10) ; à la maison, l'eau de l'aqueduc convient telle quelle, sauf sous avis d'ébullition. La pousser en jet avec une seringue sans aiguille ou une bouteille souple percée d'un trou d'épingle, parce que c'est la force du jet qui décolle la saleté, pas un produit. En pousser 100 à 300 mL, plus pour une grande plaie, et continuer jusqu'à ce qu'on ne voie plus de saleté. » |
| ch. 25, 84 | « Coucher la personne à l'horizontale et l'y garder. Ne pas la faire marcher, ne pas la faire s'asseoir, ne pas la masser, ne pas frictionner la peau. Utiliser une civière improvisée plutôt que de la faire avancer. » | Quatre interdits sans raison ; la raison est à la section 3 (ligne 43) et à la section 8 (ligne 322), deux pages plus loin. | « Coucher la personne à plat et l'y garder, sans la faire marcher ni asseoir, sans la masser ni lui frotter la peau, parce que chacun de ces gestes renvoie vers le cœur le sang froid des membres (section 8). Pour la déplacer, utiliser une civière improvisée. » |

**La cause.** `CLAUDE.md` : « Un mécanisme qui apprend quelque chose va dans l'étape qu'il explique » ; la règle dit
l'étape, pas le geste, et la règle 2 du skill (« le fait d'abord, la raison ensuite ») se lit comme « les gestes
d'abord, les raisons à la fin de l'étape ». Le tableau « Ce qui sort », ligne « La justification collée au geste »
(« Ne pas rester dans l'auto : la tôle n'arrête rien. » devient « Entrer dans un bâtiment. »), apprend à décoller la
raison du geste, sans préciser qu'il vise une raison que le lecteur connaît déjà. Et la chaîne : un fait signalé par le
vérificateur technique s'ajoute au bout de l'étape au lieu d'entrer à côté de son geste.

### 3.4 L'exception, la limite ou le contraste qui n'est pas marqué (gravité haute)

**Le défaut.** Une phrase contredit la précédente, ou en limite la portée, et rien ne le dit : pas de « mais », de
« sauf », de « par contre ». Le lecteur voit deux consignes qui se battent (« ne jamais desserrer », puis « on peut
desserrer »), ou rate la limite.

**Fréquence.** Environ 14 relevés (3 au ch. 25, 8 au ch. 26, 3 au ch. 39). Au ch. 26, deux des dix « Ce qu'on
perd : » de la section 7 cachent aussi un « mais » derrière une virgule ou un point-virgule (« ce tissu est propre, il
n'est pas stérile », ligne 343 ; « du confort ; le membre est aussi bien immobilisé », ligne 374).

| Fichier, ligne | Le texte | Ce qui se passe | Réécriture |
| --- | --- | --- | --- |
| ch. 26, 104 | « Ne jamais le desserrer pour voir : chaque desserrage rouvre l'artère […]. Le membre supporte un garrot qui reste moins de 2 heures. Si la route doit prendre plus de 2 heures, on peut desserrer le garrot à trois conditions : » | Un « jamais », puis un « on peut », sans mot entre les deux. | « […] On a abandonné le desserrage à heures fixes parce qu'il vidait les blessés petit à petit. Mais le membre ne supporte un garrot que moins de 2 heures. Si la route doit prendre plus de 2 heures, on peut donc le desserrer, à trois conditions : » |
| ch. 26, 138 | « Coucher la personne sur le dos et lui relever les jambes. Si elle respire mal, la laisser assise. Si elle vomit ou si elle ne répond plus, la coucher sur le côté. Ne pas la faire asseoir ni lever d'un coup, même quand elle va mieux. » | Trois positions, dont deux exceptions à la première, et une dernière phrase qui semble contredire « la laisser assise ». | « Coucher la personne sur le dos et lui relever les jambes, sauf si elle respire mal : dans ce cas, la laisser assise. Si elle vomit ou ne répond plus, la coucher plutôt sur le côté. Même quand elle va mieux, ne pas la faire asseoir ni lever d'un coup. » |
| ch. 26, 65 | « Chez un enfant, jusqu'à la puberté, enfoncer la poitrine du tiers de son épaisseur […]. Si on sait les donner, faire 2 insufflations toutes les 30 compressions. » | L'alinéa d'avant dit « Chez un adulte, comprimer sans arrêt, sans insufflations » ; l'enfant est l'exception, sans le dire. | « Chez un enfant, par contre, faire 2 insufflations toutes les 30 compressions, si on sait les donner. » |
| ch. 39, 175 | « L'eau du lavage n'a pas besoin d'être bouillie tant qu'elle n'est pas ingérée. » | L'étape 10 (ligne 133) fait bouillir l'eau du brossage des dents et du lavage des aliments ; l'étape 19 fait l'exception sans la marquer. | « L'eau pour se laver les mains, par contre, n'a pas besoin d'être bouillie, tant qu'on ne la boit pas (étape 10). » |
| ch. 25, 135 | « Traiter d'abord l'hypothermie modérée ou grave, ensuite la gelure. Une hypothermie légère se traite en même temps. » | L'exception à l'ordre « d'abord, ensuite » est posée comme une autre règle. | « Traiter d'abord l'hypothermie modérée ou grave, ensuite la gelure. Si l'hypothermie est légère, par contre, la traiter en même temps que la gelure. » |
| ch. 26, 452 | « Il reste le comportement, à noter deux fois par jour : […]. Le comportement montre l'aggravation environ une demi-journée plus tard que le thermomètre. » | La limite du repli est posée comme un fait de plus. | « Il reste le comportement, à noter deux fois par jour : si la personne boit, mange, parle, marche, urine et reconnaît les gens. Mais le comportement montre l'aggravation environ une demi-journée plus tard que le thermomètre. » |

Même défaut au ch. 26, ligne 365 (« Quand la personne mourrait de son sang sans lui, le poser sans hésiter », après
l'inconvénient du garrot improvisé : « Mais quand la personne mourrait de son sang sans lui… ») et au ch. 39, ligne 396
(la limite de la broche : « Mais la broche prend la température de tout le trajet, pas seulement du centre »).

**La cause.** Aucune règle ne demande de marquer l'exception. « Une phrase, une information » (règle 1) met
l'exception dans sa propre phrase, détachée de la règle qu'elle contredit. La liste des mots vides (`CLAUDE.md` :
« "déjà", "encore", "tout" » ; skill `ecriture` : « ainsi, d'ailleurs, en effet… ») rend méfiant envers les petits
mots, et ne donne pas en regard les mots de liaison qui, eux, restent.

### 3.5 Le « et » qui tient lieu de « mais », de « donc » ou de « alors que » (gravité moyenne)

**Le défaut.** Deux propositions jointes par « et » alors que la seconde contredit la première ou en découle. « Et »
ne dit pas le lien, il dit seulement « en plus ». C'est le lien de rechange quand on a enlevé le « donc ».

**Fréquence.** Une dizaine relevés ; « et » est à 29,5 pour 1000 mots dans le lot, contre 26,1 dans les références.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| ch. 26, 194 | « Ce lavage est long et désagréable, et aucun autre geste qu'on peut faire sur place ne réduit autant le risque de mourir de la rage. » | « Ce lavage est long et désagréable, mais aucun autre geste qu'on peut faire sur place ne réduit autant le risque de mourir de la rage. » |
| ch. 25, 400 | « C'est lent, ça salit l'eau de cendre, et c'est la seule manière de remplir une bouillotte quand le seul récipient étanche du camp est en plastique. » | « C'est lent et ça salit l'eau de cendre, mais c'est la seule façon de remplir une bouillotte quand le seul récipient étanche du camp est en plastique. » |
| ch. 26, 245 | « Quand tout le monde est épuisé, on sert facilement au malade un rôti à peu près cuit, et c'est la personne la moins capable de supporter une intoxication : mesurer au thermomètre, dans la partie la plus épaisse, sans toucher l'os (ch. 21, ch. 61). » | « Quand tout le monde est épuisé, on sert facilement au malade un rôti à peu près cuit, alors que c'est la personne la moins capable de supporter une intoxication. Il faut donc mesurer au thermomètre, dans la partie la plus épaisse, sans toucher l'os (ch. 21, ch. 61). » |
| ch. 25, 182 | « Sous 2 °C, quelqu'un de mouillé se traite pour hypothermie même s'il marche et parle normalement : l'eau dans le tissu continue de tirer la chaleur longtemps après la sortie de l'eau, et l'habillage sec passe avant tout le reste. » | « Sous 2 °C, on traite pour hypothermie une personne mouillée, même si elle marche et parle normalement, parce que l'eau dans le tissu continue de tirer la chaleur longtemps après la sortie de l'eau. C'est pour ça qu'il faut l'habiller au sec avant tout le reste. » |
| ch. 26, 271 | « On apprend le rythme des compressions avec les mains, et la formation le fait pratiquer. » | « On apprend le rythme des compressions avec les mains, et c'est pour ça que la formation le fait pratiquer. » |
| ch. 26, 458 | « *Ce qu'on perd :* la justesse, toujours dans le même sens : on compte trop vite, et l'appui dure moins de 5 minutes (étape 6). » | « *Ce qu'on perd :* la justesse, toujours dans le même sens : on compte trop vite, donc l'appui dure moins de 5 minutes (étape 6). » (C'était « donc » avant la refonte.) |

**La cause.** Skill `ecriture`, règle 10 : « La phrase garde ses articles et ses liaisons » ; la règle ne dit pas
lesquelles, et « et » est le seul lien qui ne ressemble pas à du remplissage. La refonte et l'éditeur du ch. 26 ont mis
« et » à la place d'un « donc » (ligne 459) et d'un deux-points (ligne 271).

### 3.6 Le fait posé sans dire ce qu'il change au geste (gravité moyenne)

**Le défaut.** Un mécanisme ou un chiffre est posé, et le paragraphe passe à autre chose sans dire ce qu'on en fait :
le « donc » final manque. Parfois le geste est là, à côté, sans son « donc » ; parfois il n'est nulle part, et le
lecteur doit inventer la décision.

**Fréquence.** 8 relevés, dont 5 à trancher.

| Fichier, ligne | Le texte | Ce qui manque | Réécriture |
| --- | --- | --- | --- |
| ch. 26, 226 | « Aucun geste fait sur place n'arrête ce sang-là. Partir maintenant, pendant qu'elle a encore l'air correcte, en la transportant couchée et couverte, sans rien lui donner par la bouche. » | Le geste est là, sans le « donc » qui le rattache au fait. | « Aucun geste fait sur place n'arrête ce sang-là, alors il faut partir maintenant, pendant qu'elle a encore l'air correcte, en la transportant couchée et couverte, sans rien lui donner par la bouche. » |
| ch. 39, 160 | « à -27 °C ou moins, refroidissement éolien compris, les enfants ne sortent pas. Pour juger de l'exposition : entre -28 et -39, la peau exposée peut geler en 10 à 30 minutes ; […] à -55 et moins, en moins de 2 minutes. » | Les durées commencent à -28, là où les enfants ne sortent plus : pour qui sont-elles ? | **À trancher.** Si elles sont pour l'adulte qui fait la corvée (section 6, ligne 190 : « un adulte la fait seul ») : « Sous -27 °C, les enfants ne sortent pas, et c'est un adulte qui fait la corvée, seul. Pour lui, la peau exposée peut geler en 10 à 30 minutes entre -28 et -39 ; […] » |
| ch. 39, 245 | « la neige n'épaissit pas la glace, elle l'isole et ralentit sa formation. Glace grise ou foncée : il y a de l'eau dedans. » | Deux faits sans leur conséquence pour celui qui mesure la glace. | « Quand la glace est grise ou foncée, c'est qu'il y a de l'eau dedans. » Ce que ces deux faits changent à la mesure de l'épaisseur est **à trancher** à la source. |
| ch. 26, 253 | « Estimer deux durées, en heures : dans combien d'heures l'état de la personne ne pourra plus être rattrapé, et combien d'heures prend la route jusqu'à l'hôpital (étape 46). » | Le texte ne dit pas qu'on compare les deux durées, ni ce qu'on fait selon le résultat. | **À trancher.** Au minimum : « Estimer deux durées, en heures, et les comparer : […] (étape 46). » La décision qui suit (étape 40) se dit ici. |
| ch. 26, 231 | « Chez un blessé, une urine qui diminue et fonce vient d'une circulation qui faiblit, pas de la soif. » | Ce que ça change (ne pas se contenter de faire boire ? partir ?) n'est pas dit. | **À trancher** à la source. |
| ch. 39, 135 | « L'ébullition tue les bactéries, les virus et les protozoaires ; elle ne retire aucun contaminant chimique, elle les concentre. » | Ce qu'on fait d'une eau qui peut avoir un contaminant chimique n'est pas dit. | **À trancher** à la source. |

**La cause.** `CLAUDE.md` le dit pour les chiffres (« un chiffre reste s'il change ce qu'on fait ») et le tableau du
15 octobre pour les mécanismes (« Chaque mécanisme est suivi de ce qu'il change dans la procédure ») ; aucune règle
phrase par phrase ne le demande. L'habitude : on recopie les faits dans l'ordre où la source les donne, et la source
donne le fait, pas la décision.

### 3.7 Le saut d'une affaire à l'autre dans la même étape (gravité moyenne)

**Le défaut.** Une étape passe d'un sujet à un autre sans transition : un fait accroché à la fin, un outil de rechange
glissé sans « autre façon », un retour en arrière. Le lecteur cherche le lien qui n'existe pas.

**Fréquence.** 9 relevés. Au ch. 26, trois viennent de phrases ajoutées au bout d'une étape après la vérification
technique (`de2c1fb4`).

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| ch. 26, 136 | « Les autres modèles d'injecteur et le vaporisateur nasal d'épinéphrine portent leur mode d'emploi en dessin : le lire en sortant l'appareil de l'étui. L'EpiPen existe en deux doses, 0,15 mg et 0,3 mg, choisies selon le poids de la personne. » | Mettre la dose en tête de l'étape 13, avant le geste : « L'EpiPen existe en deux doses, 0,15 mg et 0,3 mg, qu'on choisit selon le poids de la personne. » Puis, à la fin : « Les autres modèles d'injecteur et le vaporisateur nasal, par contre, portent leur mode d'emploi en dessin : le lire en sortant l'appareil de l'étui. » |
| ch. 26, 396 | « Chauffer une aiguille à coudre ou un bout de fil de fer au rouge dans la flamme, et la laisser refroidir à l'air, sans souffler dessus ni l'essuyer. Un hameçon dont on a limé l'ardillon (ch. 105) fait une pince à un seul bec. Ne pas creuser pour aller chercher un objet planté profondément, et ne jamais retirer ce qui traverse : l'objet bouche le vaisseau qu'il a coupé, et si on l'enlève, le vaisseau saigne. » | « […] sans souffler dessus ni l'essuyer. Autre façon : un hameçon dont on a limé l'ardillon (ch. 105) fait une pince à un seul bec. Par contre, ne pas creuser pour aller chercher un objet planté profondément, et ne jamais retirer ce qui traverse, parce que l'objet bouche le vaisseau qu'il a coupé : si on l'enlève, le vaisseau saigne. » |
| ch. 25, 175 | « Tendre une perche, une branche, une corde, une échelle, en restant couché et en arrière du bord. Un sauveteur à l'eau double le problème et divise par deux les mains disponibles. Sur la corde, des nœuds espacés d'une brassée donnent des prises à une main qui ne serre plus, et un bidon bouché noué au bout la fait flotter. » | « Le sauveteur ne marche pas jusqu'au trou, parce qu'un sauveteur à l'eau double le problème et divise par deux les mains disponibles. Il tend une perche, une branche, une corde ou une échelle, en restant couché et en arrière du bord. Si c'est une corde, y faire des nœuds espacés d'une brassée, pour donner des prises à une main qui ne serre plus, et nouer un bidon bouché au bout pour la faire flotter. » |
| ch. 25, 417 | « Percer les deux bouts en travers, passer un cordon […], et les porter par-dessus le manteau. En une dizaine de minutes dans l'eau, les mains ne se ferment plus : ce qui n'est pas déjà accroché au corps ne sortira pas d'une poche. Bouchons de liège ou bouts de boyau sur les pointes pour ne pas se planter en marchant. On plante, on bat des jambes pour se mettre à plat, on se tire, puis on roule — on ne se relève pas. » | La fabrication, la raison, la fabrication encore, puis l'usage. « […] et les porter par-dessus le manteau, parce qu'après une dizaine de minutes dans l'eau, les mains ne se ferment plus et qu'on ne sort plus rien d'une poche. Mettre des bouchons de liège ou des bouts de boyau sur les pointes pour ne pas se planter en marchant. Dans l'eau, on plante les pics, on bat des jambes pour se mettre à plat, on se tire, puis on roule, sans se relever. » |
| ch. 26, 195 | « Pour une égratignure de chauve-souris, même presque invisible, partir le jour même ; une coupure de couteau propre, même si elle saigne beaucoup, ne demande pas le vaccin. » | « Une égratignure de chauve-souris, même presque invisible, demande aussi de partir le jour même. Par contre, une coupure de couteau propre, même si elle saigne beaucoup, ne demande pas le vaccin. » |
| ch. 25, 251 | « Pour un ouvrage léger, où l'on bouge peu, le régime s'applique un cran plus bas : le corps produit moins de chaleur. Fendre du bois et poser des collets ne se gèrent pas pareil. Porter, fendre, scier et pelleter tout l'hiver sans se casser le dos : ch. 24. » | « Pour un ouvrage léger, où l'on bouge peu, on descend d'un cran dans le tableau, parce que le corps produit moins de chaleur : poser des collets, par exemple, n'est pas le même ouvrage que fendre du bois. » Le renvoi au ch. 24 va là où on parle de porter et de fendre, ou sort. |

**La cause.** Les corrections de la chaîne : le vérificateur technique signale un fait qui manque, et la personne qui
corrige l'ajoute au bout de l'étape (`de2c1fb4` a ajouté « L'EpiPen existe en deux doses… », « une coupure de couteau
propre… » et la phrase de l'eau de puits). `cadre-agents.md` demande pourtant qu'« une autre façon de faire se dit
comme une autre façon (« Autre façon : », « Sans tige de ferrocérium : ») », ce que l'hameçon de la ligne 397 ne fait
pas.

### 3.8 Le lien annoncé au lieu d'être fait, et le lien faux (gravité moyenne)

**Le défaut.** Deux formes de la même erreur. D'abord, une tête de phrase nomme la relation (« Deux pièges. », « Le
mécanisme explique pourquoi : », « C'est le piège complet : ») puis pose les faits côte à côte comme avant : on annonce
le lien au lieu de le dire. Ensuite, plus rare et plus grave, un « donc » ou un deux-points affirme un lien que le
texte ne soutient pas.

**Fréquence.** Une dizaine d'annonces aux ch. 25 et 39 (« Deux pièges. », « Trois repères, du meilleur au pire. »,
« Trois règles, et elles ne changent pas. », « Pourquoi ça compte. », « Quatre gestes, puis une décision. », « Ce qui
reste est meilleur qu'on pense : »…), presque aucune au ch. 26. Deux liens faux.

| Fichier, ligne | Le texte | Ce qui se passe | Réécriture |
| --- | --- | --- | --- |
| ch. 25, 72 | « Deux pièges. Le frisson peut persister sous 32 °C : une personne qui frissonne avec la conscience altérée se traite comme une modérée, pas comme une légère. Et les frissons cessent vers 30 °C environ — leur arrêt sans réchauffement est une aggravation, jamais une amélioration. » | « Deux pièges » annonce ; le deux-points et le tiret font le travail du « donc ». | « Le frisson peut continuer sous 32 °C, donc une personne qui frissonne mais qui n'a plus toute sa tête doit être traitée comme une hypothermie modérée, pas légère. Et comme les frissons cessent vers 30 °C environ, des frissons qui s'arrêtent sans qu'on l'ait réchauffée veulent dire qu'elle va plus mal, jamais mieux. » |
| ch. 39, 355 | « L'avertissement qui l'accompagne est celui qui compte : « Vous devez utiliser les quantités exactes indiquées afin de ne pas risquer d'aggraver votre état. » Le mécanisme explique pourquoi : c'est le rapport entre le sucre et le sel qui fait entrer l'eau à travers la paroi de l'intestin. Trop de sel et l'eau repart dans l'autre sens, dans l'intestin, et la déshydratation s'aggrave en donnant à boire. » | Deux annonces (« celui qui compte », « explique pourquoi ») et une citation à la place de la consigne. | « Il faut mesurer exactement ces quantités, sinon on risque d'aggraver la déshydratation, parce que c'est le rapport entre le sucre et le sel qui fait entrer l'eau à travers la paroi de l'intestin. S'il y a trop de sel, l'eau repart dans l'autre sens, dans l'intestin, et l'enfant se déshydrate plus à mesure qu'on le fait boire. » |
| ch. 39, 348 | « C'est le piège complet : le plus petit corps de la maison tombe le premier, et il tombe d'une manière qui n'alarme pas. Un enfant qui devient mou dans une pièce chauffée à la flamme sort dehors avant qu'on cherche pourquoi. » | L'étiquette tient lieu de « donc », et la consigne finale n'a pas son « c'est pour ça que ». | « Le plus petit corps de la maison tombe donc le premier, et d'une façon qui n'inquiète personne. C'est pour ça qu'on sort dehors un enfant qui devient mou dans une pièce chauffée à la flamme, avant de chercher pourquoi. » |
| ch. 25, 442 | « Trois règles, et elles ne changent pas. L'entrée plus basse que la plateforme où l'on couche — l'air froid tombe et reste en bas. Un trou d'aération percé au plafond et rouvert chaque fois qu'on se réveille, parce que le givre le referme tout seul. Et de l'isolant sous le corps, encore : couché à même la neige, on se réveille trempé. » | Une annonce, puis trois façons de dire « parce que » en trois phrases (tiret, « parce que », deux-points), sur des lignes sans verbe. | « Creuser l'entrée plus bas que la plateforme où l'on couche, parce que l'air froid descend et reste en bas. Percer un trou d'aération au plafond et le rouvrir chaque fois qu'on se réveille, parce que le givre le referme tout seul. Mettre aussi de l'isolant sous le corps, sinon on se réveille trempé. » |
| ch. 25, 348 | « Donc, dans une maison en panne comme dans un chalet froid, tout ce qui brûle quelque chose pour donner de la chaleur est un émetteur » | **Lien faux.** Le paragraphe d'avant dit que les symptômes ressemblent à ceux du froid ; il n'en découle pas que tout ce qui brûle fait du monoxyde. | « Dans une maison en panne comme dans un chalet froid, tout ce qui brûle quelque chose pour chauffer fait du monoxyde : […] » |
| ch. 39, 141 | « La supervision partagée est la supervision absente : dans les noyades mortelles d'enfants au Québec, il n'y avait pas d'adulte à proximité dans 69 % des cas. Le relais se fait à voix haute, pas par présomption. » | **Lien faux.** Le deux-points donne le chiffre comme la preuve de la maxime ; le chiffre dit qu'il n'y avait pas d'adulte à proximité, pas que la surveillance était partagée. | « Dans 69 % des noyades mortelles d'enfants au Québec, il n'y avait pas d'adulte à proximité. C'est pour ça qu'à tout moment, un adulte et un seul est responsable des deux enfants, et qu'il le sait ; quand on passe la garde, on le dit à voix haute. » (Le lien entre le chiffre et la consigne se vérifie à la source.) |

**La cause.** Le skill `ecriture` interdit « La révélation en deux temps » (« Le réglage est tout, et il tient en une
phrase : ») et « L'annonce et le résumé », sans dire que l'annonce prend la place du lien ; les ch. 25 et 39 n'ont pas
encore eu leur passe. Le lien faux vient de l'habitude d'ouvrir un paragraphe par « Donc » comme on ouvre un nouveau
temps, et de la maxime (`cadre-agents.md` : « Pas de maxime ni de chute en formule ») qu'on soutient par un chiffre
collé après un deux-points.

### 3.9 La condition cachée dans un participe ou une ligne de noms (gravité basse)

**Le défaut.** Un « si » se cache dans un participe détaché (« percée, elle… »), un adjectif en tête (« Plus salée que
ça, … ») ou un nom suivi de « et » (« Trop de sel et… »). À l'oral, ça se dit ; à l'écrit, sans l'intonation, le
lecteur doit refaire la condition.

**Fréquence.** 6 relevés.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| ch. 26, 159 | « La peau de la cloche protège la plaie en dessous comme un pansement stérile ; percée, elle laisse entrer les microbes. » | « La peau de la cloche protège la plaie en dessous comme un pansement stérile, mais si on la perce, elle laisse entrer les microbes. » |
| ch. 39, 366 | « la solution doit goûter moins salée que des larmes. Plus salée que ça, elle est refaite. » | « la solution doit goûter moins salée que des larmes. Si elle est plus salée, la refaire. » |
| ch. 39, 357 | « Trop de sel et l'eau repart dans l'autre sens, dans l'intestin, et la déshydratation s'aggrave en donnant à boire. » | « S'il y a trop de sel, l'eau repart dans l'autre sens, dans l'intestin, et l'enfant se déshydrate plus à mesure qu'on le fait boire. » |
| ch. 39, 477 | « Sans sifflet : un sifflet de métal, ou du côté de l'adulte une casserole frappée à la cuillère, qui porte loin et ne fatigue personne. » | **À trancher.** L'étiquette cache une condition qui se lit comme une contradiction (sans sifflet, un sifflet). Si elle veut dire « sans le sifflet sans bille cousu au manteau » : « Si l'enfant n'a pas son sifflet sans bille, un sifflet de métal fait l'affaire ; de son côté, l'adulte peut frapper une casserole à la cuillère, qui porte loin et ne fatigue personne. » |

**La cause.** L'habitude de compresser (« si on la perce » devient « percée »). Le skill `ecriture`, règle 0, interdit
le « participe en chaîne » ; il ne dit rien du participe seul qui cache un « si ».

### 3.10 L'ordre : le nouveau avant le connu, la condition après, la reprise floue (gravité basse)

**Le défaut.** La phrase pose une chose que le lecteur ne connaît pas encore, ou la condition qui décide du geste
arrive après lui ; ou bien un « c'est », un « en », un « il » reprend on ne sait quoi.

**Fréquence.** 8 relevés.

| Fichier, ligne | Le texte | Réécriture |
| --- | --- | --- |
| ch. 26, 70 | « Si le corps est froid, manipuler la personne doucement […]. Quand la température du corps est sous 28 °C, le mouvement peut suffire à faire partir le cœur en fibrillation. Une personne blessée qui est restée 20 minutes dans la neige à −30 °C est aussi en hypothermie. » | La condition « corps froid » se précise en dernier. « Si le corps est froid, et c'est aussi le cas d'une personne blessée restée 20 minutes dans la neige à −30 °C, manipuler la personne doucement, à l'horizontale, sans la plier, la secouer ni la frictionner, parce que sous 28 °C, le mouvement peut suffire à faire partir le cœur en fibrillation. » |
| ch. 26, 414 | « *Ce qu'on perd :* l'immobilisation du cou et du dos. Pour s'en approcher le plus possible, coucher la personne sur une surface dure » | « *Ce qu'on perd :* l'immobilisation du cou et du dos. Pour immobiliser quand même le cou et le dos le mieux possible, coucher la personne sur une surface dure » |
| ch. 25, 147 | « Le tissu gelé est anesthésié : il brûle sans que personne le sente. C'est la manière la plus courante de transformer une gelure récupérable en amputation. » | « Ne mettre le membre près d'aucune autre source de chaleur, parce que le tissu gelé ne sent rien et qu'il brûle sans que personne s'en rende compte. Brûler une gelure de cette façon est la manière la plus courante de faire finir en amputation une gelure qu'on aurait pu sauver. » |
| ch. 25, 233 | « Avec des vents soutenus de plus de 50 km/h, la gelure survient en moins de temps que ce que le tableau annonce. L'indice se lit sur la température mesurée et sur le vent à 10 m : […] Faute d'anémomètre : […] » | L'exception vient avant la façon de lire l'indice. Dire d'abord comment on lit l'indice, puis comment on estime le vent sans anémomètre, puis : « Mais avec des vents soutenus de plus de 50 km/h, la peau gèle plus vite que ce que le tableau annonce. » |
| ch. 39, 82 | « Modèles à piles dans les deux bâtiments : à la maison, l'électricité tombe exactement quand la génératrice se met à tourner ; au chalet, elle n'a jamais été là. » | L'ordre des causes est renversé (on fait tourner la génératrice parce que le courant tombe), et la vraie raison reste à deviner. « Prendre des modèles à piles dans les deux bâtiments, parce qu'à la maison, un avertisseur branché sur le courant ne marche plus pendant la panne, justement quand on fait tourner la génératrice ; au chalet, il n'y a jamais eu de courant. » (C'est le lien que le texte laisse deviner ; à confirmer.) |

**La cause.** Skill `ecriture`, règle 3 (« La condition avant le geste »), qui ne vise pas la définition de la
condition (ch. 26, ligne 70) ; `cadre-agents.md` (« On nomme la chose au lieu du possessif qui oblige à chercher »),
qui vise le possessif, pas « en », « c'est » ni « il ».

## 4. Ce qui marche (modèles)

| Fichier, ligne | Le passage | Pourquoi il marche |
| --- | --- | --- |
| ch. 39, 231 et 236 | « Il se fixe sur l'hémoglobine à la place de l'oxygène, et l'enfant en absorbe plus vite parce qu'il respire plus vite par kilo. » ; « Le monoxyde ne monte pas au plafond et ne tombe pas au plancher : il a presque la densité de l'air et se mélange partout, donc coucher les enfants au ras du sol ou sur la mezzanine ne change rien. » | Les mêmes faits que le paragraphe du monoxyde que JP a trouvé mal rythmé, avec la cause (« parce qu'il ») et la conséquence (« donc ») dites. Le chemin complet se lit d'un souffle : le fait, la raison, ce que ça change au geste. Reste à y mettre les mots qu'on dit (règle 15). |
| ch. 26, 255 | « Décider le départ pendant que la personne est stable. On peut alors partir de jour, l'auto chargée comme il faut, avec un adulte assis à l'arrière pour la surveiller. Si on attend qu'elle se dégrade, le départ peut se faire de nuit, dans la hâte, sur une route d'hiver, avec les enfants dans l'auto (ch. 2, ch. 15). » | La consigne, puis ses deux branches : « alors » pour ce qu'on gagne, « Si on attend » pour ce qu'on risque. La raison n'est jamais dite en formule ; elle se voit dans les deux scènes mises en regard. |
| ch. 39, 482 | « marquer le dernier point connu avant de bouger […] et y laisser une personne, parce que toutes les recherches y reviennent ; chercher en criant puis en se taisant, par cycles, parce qu'un enfant qui répond ne s'entend pas par-dessus les appels ; et à la brunante, sortir la lumière plutôt que la voix. Un enfant voit une lampe frontale de bien plus loin qu'il n'entend un nom. » | Chaque geste porte sa raison collée à lui, par « parce que », dans la même phrase. Rien n'est à rattacher de loin. (Le tiret du passage est à changer en parenthèses à la refonte.) |
| ch. 39, 428 | « […] mais sans thermomètre, on ne prouve pas qu'on est sous 3 °C, et un redoux de trois jours suffit à tout perdre sans que rien ne change d'odeur, de goût ni d'apparence. Alors la règle se simplifie : tant que le gel tient dehors sans interruption, la caisse tient ; au premier redoux, ce qui était fumé ou salé se cuit ou se jette. » | « mais » pose la limite, « Alors » amène la règle, « tant que » et « au premier redoux » donnent ses deux bornes. Le raisonnement se suit comme on le dirait. (Le pronominal « se cuit ou se jette » est à corriger : « on doit le cuire ou le jeter ».) |
| ch. 26, 382 | « Le pan tient le bras aussi bien qu'un foulard en triangle, et comme rien ne passe par-dessus la tête, on ne bouge pas l'épaule blessée. » | Le seul « comme » de cause du lot : la cause avant la conséquence, dans l'ordre où on l'explique à un voisin. Même tenue au ch. 25, ligne 390 : « Elle ne coule pas si le tissu lâche et elle se moule sur une aisselle, mais elle se vide de sa chaleur plus vite que l'eau et il faut la réchauffer plus souvent. » |

## 5. Ce que ces défauts demandent aux règles

Pour la réécriture du skill, sans fait neuf :

1. **Le deux-points a trois emplois** : annoncer une liste, une définition ou un détail. Une raison se dit « parce
   que » ou « comme » (devant) ; une conséquence, « donc », « alors », « c'est pour ça que » ; un contraste, « mais »,
   « alors que » ; une concession, « même si » ; une exception, « sauf », « par contre » ; un exemple, « par exemple ».
   Le modèle de la règle 2 se réécrit : « Vidanger avant que la maison descende sous 5 °C, parce qu'un tuyau plein fend
   en gelant. »
2. **Le tiret qui portait un lien devient le mot du lien**, pas un deux-points. À appliquer à la refonte des ch. 25 et
   39, qui ont encore leurs tirets : « Pas de café — diurétique — » devient « Pas de café, parce qu'il fait uriner ».
3. **La raison se colle au geste qu'elle explique**, dans la même phrase ou dans la suivante, jamais au bout de l'étape
   après un autre geste. La ligne « La justification collée au geste » du tableau se restreint : elle vise la raison que
   le lecteur connaît déjà, pas toute raison.
4. **Une exception à « jamais », « toujours », « seulement », « d'abord » se marque** (« mais », « sauf », « par
   contre ») dans la phrase qui la donne.
5. **Un paragraphe se lit comme une explication, pas comme une liste.** Test à chaque point : « pourquoi ? », « et
   alors ? », « sauf quand ? ». Si la réponse est dans la phrase suivante, le mot qui l'annonce doit y être. La règle 1
   (« Deux faits, deux phrases ») garde sa coupe, et gagne sa suite : la deuxième phrase dit comment elle tient à la
   première.
6. **Les mots de liaison ne sont pas des mots vides.** Le tableau des mots vides donne en regard ceux qui restent :
   parce que, donc, alors, mais, sinon, par contre, c'est pour ça que, même si, quand même.
7. **La chaîne** : un fait ajouté après la vérification technique entre à côté de son geste, avec son lien, pas au bout
   de l'étape ; l'éditeur (skill `editeur`) qui enlève un deux-points ou un pronominal le remplace par le mot du lien,
   pas par « et ».
8. **Mesure** : `tempo.py` pourrait compter les paragraphes de trois phrases et plus sans aucun mot de lien (61 % dans
   ce lot) ; la cible se fixe sur les références.

Trois garde-fous :
- **Un lien est une affirmation.** Le « Donc » du ch. 25 (ligne 348) et le chiffre du ch. 39 (ligne 141) montrent qu'un
  lien ajouté sans vérifier peut être faux. Un lien de cause se vérifie à la source comme un chiffre, sinon
  `[À VÉRIFIER]`.
- **Pas un « parce que » par phrase.** Les modèles ont un lien toutes les une ou deux phrases, et ils varient le mot
  (parce que, sinon, alors, mais, comme). Trois « parce que » de suite font un autre tempo monotone.
- **Les liens coûtent des mots** (de 2 à 6 par phrase touchée). Le prix se paie en coupant un fait redit ailleurs,
  jamais le lien.

## 6. Liste de contrôle (`.claude/cadre-agents.md`, parties « Pour tout agent », « Le texte » et « La langue », lignes qui touchent l'écriture et la langue)

- [x] `CLAUDE.md` déjà chargé, il prime : appliqué aux réécritures (aucun chiffre neuf, aucun tiret, pas de tutoiement).
- [x] Skill `ecriture` lu au complet, avec ses tableaux ; skills `editeur`, `langue`, `gabarit-chapitre.md` et
  `plan/decisions-jp.md` lus par recherche, aux lignes qui touchent les liens.
- [x] Règle 1 : aucun chiffre ni fait neuf ; les liens qui demandent une source sont marqués « à trancher » ou « à
  confirmer ».
- [x] Rien de commité ; seul ce fichier de notes est écrit.
- [x] Lire seulement ce que la tâche touche : les trois chapitres du lot au complet, les règles par recherche,
  l'historique du ch. 26 par `git show`.
- [x] Sorties de commande coupées ; le rapport ne recopie pas les chapitres.
- [x] Règle 0 : chaque réécriture lue à voix haute.
- [x] Pas de loi en formule, pas de « d'où », pas de maxime, pas de chute, pas de chose qui pense dans les réécritures
  (la maxime du ch. 39, ligne 141, et la chute du ch. 39, ligne 43, sont remplacées par le fait et son lien).
- [x] Consigne jamais au pronominal dans les réécritures (« la refaire », « on la met », « on le dit ») ; infinitif
  dans les étapes.
- [x] Le sujet se nomme, l'ordre est naturel : vérifié dans chaque réécriture.
- [x] Le mot qu'on dit (règle 15) : « c'est pour ça que », « alors », « par contre », « sinon » plutôt que « ainsi »,
  « en effet », « par conséquent » ; « par contact » pour « par conduction », « en couches » pour « stratifié ».
- [x] Aucun tiret (— ou –) dans les réécritures ni dans le texte de ce fichier ; les citations gardent ceux du livre,
  signalés.
- [x] Un passage repéré comme lourd se juge d'abord : les réécritures gardent seulement les phrases qui portent un
  fait ; aucune n'est polie pour rien.
- [ ] Le chapitre parle de son sujet : hors de ce regard. Le ch. 25 (étapes 31 à 34) et le ch. 39 (section 3, étapes
  9 et 15, « Réchauffer un enfant ») disent les mêmes faits sur le froid de l'enfant ; à régler à la refonte.
- [ ] Points de contrôle et signes d'échec à 8 lignes : hors de ce regard (ch. 25 : 9 et 11 lignes ; ch. 26 : 14 et
  12 ; ch. 39 : 11 et 12).
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures (skill `langue`, section 10).
- [ ] `controle.py` et `langue.py` sur les chapitres : sans objet pour un audit ; à passer sur toute réécriture qui
  entrera dans le livre.
