# Audit de l'écriture : la densité, lot C (tome 2)

28 octobre 2026. Un seul regard : la densité, trop compressé ou trop délayé. D'un côté le télégraphe (la phrase sans
verbe, la liste de noms, l'étiquette, l'article coupé, le lien logique sous-entendu) ; de l'autre le remplissage (la
redite, l'évidence, la phrase qui parle du livre). Lot lu au complet : `chapitres/25-le-froid-lui-meme.md`,
`chapitres/26-soigner-quand-il-n-y-a.md`, `chapitres/39-des-enfants-de-4-et-6-ans.md`. Aucun fichier du livre n'a été
modifié. Les réécritures sont des exemples : aucun fait ni chiffre neuf, aucun tiret, pas de tutoiement.

**Ce qu'il faut savoir avant de lire.** Le lot a deux états. Les ch. 25 et 39 n'ont jamais eu la passe : ils suivent
encore l'ancien gabarit (section 3 « Pourquoi ça marche », section 8 « Danger », liste « C'est le mauvais chapitre
quand »), ils gardent 49 et 42 tirets, « village », « § » et les noms latins. Le ch. 26 a été refait au complet (passe,
montage, « Quand l'utiliser » en titres de situation). La comparaison des deux états est le résultat principal de ce
lot.

En une phrase : **les ch. 25 et 39 sont à la fois trop compressés et trop délayés, souvent dans le même paragraphe** (des
étapes réduites à des listes de noms et à des formules, à côté d'un même fait redit dans quatre sections) ; **le ch. 26
n'a presque plus de télégraphe ni de formule, mais il a perdu ses mots de liaison et sa phrase courte** : c'est le
chapitre le plus monotone du livre.

## 1. Les mesures

### Le tempo du lot (`tempo.py --par-fichier`)

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | ;/1000 | ()/1000 | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch. 25 | 4805 | 243 | 19,8 | 0,79 | 12,8 | 16,5 | 18,6 | 36,2 | 23,5 | 7,7 | 5,2 | 6,0 | 2,9 |
| ch. 26 | 5903 | 275 | 21,5 | 0,54 | 3,6 | 16,7 | 32,1 | 29,5 | 22,9 | 5,1 | 12,2 | 4,6 | 5,5 |
| ch. 39 | 5593 | 312 | 17,9 | 0,63 | 16,0 | 16,0 | 19,9 | 27,2 | 19,6 | 5,9 | 3,8 | 3,2 | 2,9 |
| **le lot** | 16301 | 830 | 19,6 | 0,66 | 11,0 | 16,4 | 23,5 | 30,6 | 21,8 | 6,1 | 7,2 | 4,5 | 3,7 |

Comparé aux 113 chapitres de `plan/audit-ecriture/mesures.md` : le ch. 26 est **le plus monotone du livre** (32,1 % de
paires de phrases voisines de même longueur ; le suivant, le ch. 1, est à 30,3) et celui qui a **le moins de phrases
courtes** (3,6 % ; le suivant, le ch. 7, est à 5,0). Les deux tiers de ses phrases (66 %) font entre 12 et 28 mots,
contre la moitié aux ch. 25 (49 %) et 39 (51 %). Le ch. 25 est au contraire le deuxième plus irrégulier du livre (0,79,
après le ch. 28).

### Mesures ajoutées pour ce regard

Script de travail (dans le dossier de travail de la session, pas dans le dépôt) qui reprend le nettoyage de `tempo.py`
(tableaux, titres, pictogrammes et appels de note enlevés), passé sur le lot et sur les quatre textes techniques de
`plan/audit-ecriture/references/` (fiches de l'Alberta, Ripley 1946, Millet-Robinet, guide de survie de Wikilivres).

| pour 1000 mots | ch. 25 | ch. 26 | ch. 39 | 4 réf. techniques |
| --- | --- | --- | --- | --- |
| Deux-points | 18,9 | 14,2 | 15,6 | 0,4 à 4,9 |
| Parenthèses | 5,2 | 12,2 | 3,8 | 0,4 à 16,9 |
| « mais » | 1,2 (6) | **0,2 (1)** | **0,2 (1)** | 0,5 à 2,2 |
| « parce que » | 1,0 (5) | 0,3 (2) | 0,5 (3) | 0 à 0,9 |
| « donc » | 0,4 (2) | 0 | 0,2 (1) | |
| « c'est » | 5,6 | 1,0 | 3,6 | 0 à 3,2 |
| Chiffres, hors renvois et tableaux | 19,6 | **29,5** | 15,4 | 0 à 22,3 (Ripley) |
| Renvois « ch. N » | 2,7 | 3,9 | 4,6 | |

Comptés à la main :

| | ch. 25 | ch. 26 | ch. 39 |
| --- | --- | --- | --- |
| Étapes dont le corps est une liste de noms, sans verbe | 10 sur 34 | 0 sur 47 | 5 sur 21, et 5 passages de la section 9 |
| Lignes de Matériel en « nom — bout de phrase » | 6 sur 6 | 0 | 6 sur 6 |
| Formules, maximes, oppositions qui tassent un raisonnement | environ 24 | 1 | environ 28 |
| « Ce qu'on perd : » en étiquette | 2 | 9 | 10 |
| Phrases qui ne sont qu'un renvoi (« Voir ch. 22. ») | 2 | 0 | 8 |
| Phrases qui parlent du livre, du chapitre ou de la recherche | 5 | 0 | 8 |
| Fait de sécurité dit dans plus de deux sections | le CO (7 endroits), le réchauffement brusque (6), la réanimation du corps froid (3) | aucun | le VFI (3), le mal de caribou (3), la trichine (2), les 69 % (2) |

**Les phrases courtes des ch. 25 et 39 ne sont presque jamais un geste.** Sur les 31 phrases de six mots et moins du
ch. 25, six sont un geste (« Attendre. », « Étendre la bâche. », « Ne pas nager pour se réchauffer. ») ; les autres sont
des annonces (« Deux pièges. », « Quatre cases : », « Trois repères, du meilleur au pire. »), des étiquettes (« Un : la
précision. »), des formules (« Ça n'a pas besoin de gel. », « Une routine plutôt qu'une consigne. ») et des titres. Au
ch. 39, 8 des 50 sont des renvois seuls (« Voir ch. 48. »). Au ch. 26, il n'en reste que 10, et ce sont des gestes
(« Laisser les cloches fermées. », « Surveiller l'urine. »).

### Ce que les chiffres disent

- **Le lien logique est passé dans la ponctuation.** Quatre à cinq fois plus de deux-points que les textes techniques,
  et presque plus de « mais » : un seul dans chacun des ch. 26 et 39, pour 5 600 à 5 900 mots. Le deux-points tient
  lieu de « parce que », de « mais », de « si » et de « donc », et le lecteur doit deviner lequel (motif 2).
- **Le ch. 26 montre ce que la passe enlève et ce qu'elle n'enlève pas.** Elle a sorti les listes de noms, les formules,
  les phrases sur le livre et les redites entre sections : les quatre motifs les plus fréquents des ch. 25 et 39
  tombent à 0 ou 1. Elle n'a pas remis les mots de liaison (« mais » passe de 1,2 pour 1000 au ch. 25 à 0,2 au ch. 26),
  et elle a fabriqué une phrase type : un geste, puis une raison longue après deux-points, répétée étape après étape.
  Le chiffre monte aussi : 29,5 pour 1000 mots, plus que Ripley (22,3), un manuel de défrichage plein de mesures.
- **Les ch. 25 et 39 sont aux deux bouts en même temps.** Ils compressent dans la phrase (la liste de noms, la formule,
  le mot savant) et délaient dans le chapitre (le même fait dans la procédure, la section 3, les tableaux, la section 8,
  la section 9 et « Ce qui ne se remplace pas »). La migration au gabarit de sept sections réglera la redite ; le risque
  est qu'elle garde le télégraphe des étapes.

## 2. Le paragraphe du monoxyde, lu à côté du lot

Le lot contient trois passages sur le monoxyde qui n'ont pas été condensés, et chacun garde un lien que la page des
dangers a perdu :

- ch. 39, ligne 236 : « Le monoxyde ne monte pas au plafond et ne tombe pas au plancher : il a presque la densité de
  l'air et se mélange partout, **donc** coucher les enfants au ras du sol ou sur la mezzanine ne change rien. » La page
  des dangers dit le même fait sans la raison ni le « donc » : « Il se répand dans toute la pièce, jusqu'au plancher :
  se coucher par terre ne protège pas. »
- ch. 25, ligne 342 : les premiers effets « sont exactement ceux de l'hypothermie et du froid qu'on vient de subir […] :
  la personne intoxiquée croit avoir froid ». C'est la raison pour laquelle on ne sort pas ; la page des dangers la
  remplace par « on s'endort sans s'en rendre compte, au lieu de sortir ».
- ch. 39, ligne 346 : « Il a l'air fatigué, mou, de mauvais caractère ; il chigne, il ne veut plus jouer, il veut se
  recoucher. Un parent attentif conclut au caractère ou à la fatigue de la journée. » Les mots qu'on dit, et le fait qui
  surprend.

Le tempo du paragraphe que JP a pointé tient à trois choses que la condensation a faites ensemble : deux phrases sur
quatre en « fait : conséquence », aucun mot de liaison, trois phrases qui commencent par « Le » ou « Il ». Le lot montre
que le texte d'avant la condensation avait ses liens. Avec les seuls faits du paragraphe :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus quand
> on ferme presque l'entrée d'air pour la nuit. Le gaz ne se voit pas et ne se sent pas. Comme il prend la place de
> l'oxygène dans le sang, on s'endort sans s'en rendre compte, au lieu de sortir. Et il se mélange à l'air de toute la
> pièce, jusqu'au plancher : se coucher par terre ne protège donc pas.

« Comme », « Et », « donc » : trois mots, aucun fait de plus, et les phrases ne commencent plus toutes par le sujet.

## 3. Les motifs, du plus grave au moins grave

### Motif 1. La liste de noms à la place des gestes (haute)

L'étape garde un titre à l'infinitif, puis son corps devient une suite de noms séparés par des points-virgules ou des
virgules : « matelas isolant dessous ; sources de chaleur sur le haut du corps ». Le lecteur doit refaire lui-même le
geste, l'ordre et qui le fait. C'est le défaut que JP a nommé « personne parle comme ça », et c'est le plus fréquent des
ch. 25 et 39.

**Fréquence.** Ch. 25 : 10 des 34 étapes (1, 6, 8, 9, 10, 15, 16, 18, 21, 33), l'encadré de la section 8 (« Donc, sans
exception : horizontale, manipulation douce, aucun massage… ») et les 6 lignes du Matériel. Ch. 39 : 5 des 21 étapes
(4, 6, 7, 9, 17), 5 passages de la section 9 (la balance, le peson, les pics, les glaçons, « Peau contre peau ») et les
6 lignes du Matériel. Ch. 26 : aucune étape.

**Exemples.**

1. `25:93` « **Monter l'enveloppe** : matelas isolant dessous ; le plus d'isolant possible par-dessus, la personne
   **dans** le sac de couchage fermé et non sous un sac ouvert ; sources de chaleur sur le haut du corps ; tuque ou
   capuchon, le visage dégagé pour respirer ; pare-vapeur par-dessus si la personne est sèche, à l'intérieur si elle
   est mouillée. »
   → « **Monter l'enveloppe.** Mettre le matelas isolant sous la personne. La glisser dans le sac de couchage et le
   fermer, au lieu de poser un sac ouvert sur elle, puis mettre par-dessus tout l'isolant qu'on a. Placer les sources de
   chaleur sur le haut du corps. Lui mettre une tuque ou un capuchon, en laissant le visage dégagé pour qu'elle respire.
   Poser le pare-vapeur par-dessus le tout si elle est sèche, et à l'intérieur de l'enveloppe si elle est mouillée. »
2. `25:139` « Dans ce cas : protéger, rembourrer, attelle, aucun frottement, aucune neige, et ne pas marcher sur un pied
   entièrement gelé — marcher sur des orteils gelés pour s'évacuer reste raisonnable. »
   → « Dans ce cas, protéger le membre, le rembourrer et le tenir dans une attelle, sans le frotter et sans y mettre de
   neige. Ne pas marcher sur un pied gelé au complet ; on peut quand même marcher sur des orteils gelés pour se rendre
   aux soins. »
3. `25:149` « **Après le dégel** : sécher à l'air ou par tamponnement, jamais en frottant ; gaze entre les doigts et les
   orteils ; pansement sec et volumineux, posé lâche ; membre surélevé ; boire. »
   → « **Après le dégel**, laisser sécher la peau à l'air ou la tamponner, sans jamais frotter. Mettre de la gaze entre
   les doigts et entre les orteils, puis un gros pansement sec, posé lâche. Garder le membre surélevé et faire boire la
   personne. »
4. `39:169` « **Retirer immédiatement tout ce qui est mouillé.** Bottes, mitaines, bas, pantalon. Séchage à distance du
   poêle, sur une corde, pas sur la tôle. »
   → « **Enlever tout de suite ce qui est mouillé** : les bottes, les mitaines, les bas, le pantalon. Les faire sécher
   sur une corde, loin du poêle, jamais sur la tôle. »
5. `39:318` « Plus court, si un peson à ressort de pêche traîne dans le coffre : l'enfant assis dans un duffel accroché
   au crochet, soulevé à bout de bras par un adulte, lecture prise quand ça arrête d'osciller. »
   → « S'il y a un peson à ressort de pêche dans le coffre, c'est plus rapide : asseoir l'enfant dans un duffel,
   accrocher le duffel au crochet, le soulever à bout de bras et lire le poids quand ça arrête d'osciller. »
   (Le « participe en chaîne » que la règle 0 du skill `ecriture` interdit nommément.)
6. `39:452` « Deux clous de charpente plantés à fond dans deux bouts de manche à balai ou deux morceaux de branche de la
   grosseur d'un manche, la pointe limée courte et bien acérée, sortant à peine de la longueur d'un ongle. Un cordon noué
   d'un pic à l'autre, porté au cou par-dessus le manteau : les pics pendent sur la poitrine, à portée des deux mains
   (planche 15-01). »
   → « Planter à fond un clou de charpente dans chacun de deux bouts de manche à balai, ou de deux morceaux de branche de
   la même grosseur. Limer la pointe courte et bien acérée : elle doit dépasser à peine, de la longueur d'un ongle.
   Nouer un cordon d'un pic à l'autre et le porter au cou, par-dessus le manteau, pour que les pics pendent sur la
   poitrine, à portée des deux mains (planche 15-01). »

**Cause.** Le format du Matériel dans `gabarit-chapitre.md` (section 4) : « une ligne par item, 15 à 20 mots : le nom en
gras, puis ce qu'il fait ou ce que c'est », avec un « format validé » qui n'a pas de sujet
(« **Thermomètre à sonde** : porte les 74 °C à cœur. Ne se fabrique pas. ») ; les étapes ont pris la même forme.
CLAUDE.md, règle 5 « Écrire dense », et `plan/decisions-jp.md` (ligne 179) : « Environ 700 mots utiles par page en
8 × 10 » : la liste de noms est la façon la plus courte de tenir ce compte. Et l'habitude de la fiche de terrain. La
règle 0 du skill `ecriture` l'interdit depuis le 15 octobre (« pas une liste de noms qui tient lieu d'actions », « pas de
participe en chaîne »), mais les ch. 25 et 39 n'ont pas eu la passe ; le ch. 26, qui l'a eue, n'en a plus.

### Motif 2. Le lien logique coupé : le deux-points à la place de « mais », « si », « parce que », « donc » (haute)

Deux faits sont posés côte à côte, reliés par un deux-points, un point-virgule ou un point, alors que leur relation est
une opposition, une condition, une cause ou une conséquence. Le lecteur doit deviner laquelle, et il devine parfois
mal : au ch. 26, ligne 180, le deux-points annonce une raison et donne un inconvénient. C'est aussi ce qui fait le tempo
haché que JP entend : chaque phrase s'arrête là où on dirait « mais » ou « parce que ».

**Fréquence.** « mais » : 6 au ch. 25, 1 au ch. 26, 1 au ch. 39 (0,2 pour 1000 mots aux ch. 26 et 39, contre 0,5 à 2,2
dans les textes techniques de référence) ; « parce que » : 5, 2 et 3 ; « donc » : 2, 0 et 1. En face, 14 à 19 deux-points
pour 1000 mots (0,4 à 4,9 dans les références), et une phrase sur cinq en « fait : conséquence » (23,5 %, 22,9 %,
19,6 %).

**Exemples.**

1. `26:180` « **Laisser ouverte la plaie sale, la plaie profonde, la piqûre et la morsure**, sous une gaze humide qu'on
   change chaque jour : une plaie laissée ouverte coule et guérit lentement. Refermée trop tôt, elle enferme les
   microbes, enfle et s'infecte sans qu'on le voie. »
   → « …sous une gaze humide qu'on change chaque jour. Une plaie laissée ouverte coule et guérit lentement, mais si on la
   referme trop tôt, elle enferme les microbes, enfle et s'infecte sans qu'on le voie. »
2. `39:82` « Modèles à piles dans les deux bâtiments : à la maison, l'électricité tombe exactement quand la génératrice
   se met à tourner ; au chalet, elle n'a jamais été là. »
   → « Prendre des modèles à piles pour les deux bâtiments : à la maison, c'est pendant une panne de courant qu'on fait
   tourner la génératrice, et au chalet, il n'y a jamais eu de courant. »
3. `39:91` « Un seau de plastique, une boîte de carton ou un contenant posé sur une galerie de bois : le plastique fond
   ou la galerie prend, des heures après que le poêle a été vidé et que tout le monde s'est couché. »
   → « Si on vide les cendres dans un seau de plastique ou dans une boîte de carton, le plastique fond et le carton
   brûle ; si on pose le contenant sur une galerie de bois, la galerie prend feu. Ça arrive des heures après qu'on a
   vidé le poêle et que tout le monde s'est couché. »
4. `25:73` « Et les frissons cessent vers 30 °C environ — leur arrêt sans réchauffement est une aggravation, jamais une
   amélioration. »
   → « Les frissons s'arrêtent vers 30 °C : si une personne arrête de frissonner sans s'être réchauffée, c'est qu'elle va
   plus mal, pas mieux. »
5. `39:395` « Froide ou tiède, le centre n'est pas cuit. Assez chaude pour qu'on ne puisse pas la garder appuyée, le
   centre est chaud. »
   → « Si la broche est froide ou tiède, le centre n'est pas cuit. Si elle est assez chaude pour qu'on ne puisse pas la
   garder appuyée, le centre est chaud. »
   (Le « si » coupé laisse aussi un adjectif qui se rapporte au mauvais sujet : c'est la broche qui est froide, pas le
   centre. À signaler au correcteur.)
6. `39:100` « Une bille gèle. […] Les recherches commencent au dernier point connu ; un enfant qui marche s'éloigne de
   la zone où on le cherche. »
   → « Le sifflet doit être sans bille, parce que la bille gèle. […] L'enfant doit rester assis, parce que les recherches
   partent du dernier endroit où on l'a vu : s'il continue de marcher, il s'éloigne de l'endroit où on le cherche. »

**Cause.** Le skill `ecriture`, règle 1 : « Une phrase, une information. Deux faits, deux phrases. » Appliquée à la
lettre, elle sépare deux faits liés et le « mais » tombe entre les deux (exemple 1). La règle 2 : « la raison ensuite,
et seulement si la raison change ce qu'on fait ». CLAUDE.md, « L'écriture » : saute « la conséquence évidente d'un fait
qu'on vient de dire » et « la justification que le lecteur connaît déjà » ; sans test de qui la connaît, la raison
tombe même quand le lecteur ne la connaît pas (exemple 6). Enfin la section « Le tiret » du skill propose le deux-points
comme remplaçant, sans dire qu'il ne remplace pas un mot de liaison : au ch. 25, ligne 74, le tiret est devenu le lien
logique lui-même.

### Motif 3. La formule qui tasse un raisonnement (haute)

La maxime, l'opposition « X, pas Y », le chiasme, la phrase-proverbe : en cinq à dix mots, elle donne la conclusion
d'un raisonnement que le texte ne fait pas. C'est la forme la plus serrée du télégraphe, et c'est aussi du délayage
quand elle redit l'étape en formule. Au ch. 39, une formule dit le contraire des deux tableaux du chapitre.

**Fréquence.** Relevé à la lecture : environ 24 au ch. 25, environ 28 au ch. 39, une seule au ch. 26 (ligne 176 : « La
force du jet décolle la saleté, pas un produit. »).

**Exemples.**

1. `39:178` « Un enfant qui perd du poids deux semaines de suite change le plan, pas la ration. »
   → « Si un enfant perd du poids deux semaines de suite, revoir sa ration et le gras qu'il mange (ch. 19, ch. 21). »
   (On ne sait pas qui « change le plan », et la formule contredit les points de contrôle, ligne 196, « réviser la ration
   et le gras », et les signes d'échec, ligne 219, « Revoir la ration et le gras ». La réécriture suit les tableaux ; le
   vérificateur technique tranche.)
2. `39:141` « La supervision partagée est la supervision absente : dans les noyades mortelles d'enfants au Québec, il
   n'y avait pas d'adulte à proximité dans 69 % des cas. Le relais se fait à voix haute, pas par présomption. »
   → « Quand deux adultes surveillent en même temps, chacun pense que l'autre regarde : dans les noyades mortelles
   d'enfants au Québec, il n'y avait pas d'adulte à proximité dans 69 % des cas. Pour passer la garde, on le dit à voix
   haute à l'autre adulte, sans supposer qu'il l'a prise. »
3. `39:73` « Les deux bâtiments se préparent pareil, et en double : un enfant ne change pas de corps en changeant
   d'adresse, et le jour où on part au chalet, on part avec ce qui est déjà là-bas. »
   → « Préparer les deux bâtiments de la même façon, avec le matériel en double : le jour où on part au chalet, on compte
   sur ce qui s'y trouve déjà. »
4. `25:87` « **L'isoler du sol avant de l'isoler du ciel.** Un matelas ou deux sous elle : beaucoup de chaleur part vers
   le sol par conduction. »
   → « **Mettre un matelas ou deux sous la personne avant de la couvrir.** Elle perd beaucoup de chaleur par le contact
   avec le sol. »
   (« La chaleur part vers » est aussi une tournure que le cadre interdit : « la chaleur part à… ».)
5. `25:437` « Grossier et chaud bat ajusté et froid : quatre doigts ensemble se partagent leur chaleur, cinq doigts
   séparés la perdent chacun par leur propre surface. »
   → « La mitaine est grossière, mais elle garde plus chaud qu'un gant ajusté : les quatre doigts ensemble se partagent
   leur chaleur. » (La raison est déjà aux lignes 263 à 265 : voir le motif 7.)
6. `39:412` « La fièvre se constate, elle ne se mesure pas : une main sur son propre front, puis sur celui de l'enfant,
   puis de nouveau sur le sien. Ce qu'on perd est le chiffre, et le chiffre est ce qui permet de suivre une courbe sur
   trois jours. Ce qui reste est meilleur qu'on pense : chez un enfant, ce qu'il *fait* dit plus que ce qu'il a. »
   → « Sans thermomètre, on juge la fièvre à la main : la poser sur son propre front, puis sur celui de l'enfant, puis de
   nouveau sur le sien. On perd le chiffre, et avec lui la courbe de la fièvre sur trois jours. Mais chez un enfant, ce
   qu'il fait renseigne mieux que sa température : un enfant brûlant qui recommence à jouer… »

**Cause.** Aucune règle ne la demande, et le skill `ecriture` l'interdit depuis le 15 octobre (lignes « La chute en
formule », « L'opposition fabriquée » et « la maxime » de ses tableaux). Elle reste dans les ch. 25 et 39 parce qu'ils
n'ont pas eu la passe, et elle naît de deux consignes qui la récompensent : « Écrire dense » (CLAUDE.md, règle 5), pour
qui la formule est la façon la plus courte de dire un raisonnement, et le skill `editeur`, « alterne phrases courtes
(percutantes) et phrases longues », qui appelle la phrase-choc. Le ch. 26 montre que la passe les enlève : il en reste
une.

### Motif 4. Le mot savant ou le nom abstrait qui tasse une explication (moyenne)

Un terme de métier ou un nom abstrait remplace une phrase entière : « classer par la clinique », « aggrave
l'afterdrop », « drain thermique », « le jugement thermique est atteint ». Le mot est plus court que l'explication, et le
lecteur, qui sait souder mais n'a jamais lu un protocole médical, ne peut pas le déplier. Une partie de ces mots vient
tel quel des sources.

**Fréquence.** Une douzaine au ch. 25 (clinique, convection, afterdrop, conscience altérée trois fois, diurétique,
tamponnement, ampoules hémorragiques qui « signent », station debout, « déclencheur nommé, avec l'acidose, l'hypocapnie
et l'hypoxie »), une dizaine au ch. 39 (marges alimentaires, mangeur, stratifié, drain thermique, jugement thermique,
repli comportemental, souches non protéolytiques inhibées, larves enkystées, hémoglobine, ingérée), presque aucun au
ch. 26 (« en choc » s'y explique entre parenthèses).

**Exemples.**

1. `25:63` « **Classer par la clinique, pas par le thermomètre**. Quatre cases : »
   → « **Classer la personne d'après ce qu'on voit, pas d'après le thermomètre.** Il y a quatre cas : »
2. `25:106` « **Modérée ou grave : rien par la bouche.** La conscience altérée fait avaler de travers. »
   → « **Si l'hypothermie est modérée ou grave, ne rien donner par la bouche** : une personne qui n'a plus toute sa tête
   avale de travers. »
3. `25:111` « Se tenir debout rouvre la circulation des jambes et aggrave l'afterdrop. »
   → « Si elle se lève, le sang froid des jambes repart vers le cœur, et la température de son corps continue de baisser
   même après la sortie du froid. » (« Afterdrop » n'est expliqué nulle part dans le chapitre ; le mécanisme est dans
   l'encadré de la section 8.)
4. `25:104` « Pas de café — diurétique — et **jamais d'alcool**, qui dilate les vaisseaux de la peau et accélère la
   perte, tout en donnant une fausse sensation de chaleur. »
   → « Pas de café, parce qu'il fait uriner. Jamais d'alcool : il ouvre les vaisseaux de la peau, le corps perd sa chaleur
   plus vite, et la personne a l'impression de se réchauffer. »
5. `39:95` « Le coton absorbe la sueur, la garde contre la peau et transforme une couche isolante en drain thermique. »
   → « Le coton boit la sueur et la garde contre la peau : mouillé, il tire la chaleur du corps au lieu de la garder. »
6. `39:217` (signes d'échec, colonne « Diagnostic ») « Le jugement thermique est atteint avant la conscience »
   → « Il ne sent plus qu'il a froid, avant même d'avoir l'air confus. »

**Cause.** Le vocabulaire des sources recopié avec le fait, alors que le cadre le dit (ligne 21 de
`.claude/cadre-agents.md`) : « La source sert à vérifier un fait, jamais à copier une forme. » La règle 15 du skill
`ecriture` (« le mot qu'on dit ») vise le mot isolé (« avoir sommeil », « lucide ») ; elle ne vise pas le nom qui tient
la place d'une phrase, qui est pourtant le même défaut en plus serré. Et « Écrire dense » : le nom abstrait est plus
court que la phrase qu'il remplace.

### Motif 5. L'annonce, l'étiquette et le renvoi qui tiennent lieu de phrase (moyenne)

Trois petites formes du même défaut. L'annonce compte ce qui suit au lieu de le dire (« Deux pièges. », « Quatre
gestes, puis une décision. »). L'étiquette fixe force un bout de phrase sans verbe (« *Ce qu'on perd :* du confort »,
« Cible de la pièce chaude : »). Le renvoi codé remplace l'information (« (→ §9 : sapin baumier) », « Sans
pèse-personne, section 9 : »). Chaque fois, le lecteur doit faire le pont lui-même.

**Fréquence.** « Ce qu'on perd : » : 2 au ch. 25, 9 au ch. 26, 10 au ch. 39. Annonces : 5 au ch. 25, 4 au ch. 39. Renvois
en flèche « (→ §9…) » : 2 au ch. 25, 5 au ch. 39. Phrases qui ne sont qu'un renvoi : 2 au ch. 25, 8 au ch. 39 (« Voir
ch. 52 et ch. 56. », « Voir ch. 22. », « Voir ch. 48. », « Détail complet au ch. 30. »…).

**Exemples.**

1. `25:72` « Deux pièges. Le frisson peut persister sous 32 °C : une personne qui frissonne **avec** la conscience
   altérée se traite comme une modérée, pas comme une légère. »
   → « Une personne peut encore frissonner sous 32 °C : si elle frissonne et qu'elle n'a plus toute sa tête, la traiter
   comme une hypothermie modérée, pas légère. »
2. `25:48` « **Matelas de sol isolant** — sous le corps avant tout : le sol tire la chaleur plus vite que l'air (→ §9 :
   sapin baumier). »
   → « **Matelas de sol isolant** : il va sous le corps avant tout le reste, parce que le sol tire la chaleur plus vite
   que l'air. Sans matelas, des branches de sapin baumier (section 9). »
3. `39:62` « **Sachets de solution de réhydratation orale** — seul dosage sucre-sel garanti ; mal dosée, la solution
   aggrave la déshydratation (→ §9 : recette). »
   → « **Sachets de solution de réhydratation orale** : ce sont les seuls où le sucre et le sel sont dosés à coup sûr, et
   une solution mal dosée aggrave la déshydratation. Sans sachets, la recette est à la section 9. »
4. `39:63` « **Deux thermomètres à viande** — seule preuve des 74 °C à cœur. Sans eux, ni ours ni phoque aux enfants
   (→ §9). »
   → « **Deux thermomètres à viande** : c'est la seule façon de savoir que la viande a atteint 74 °C à cœur. Sans
   thermomètre, on ne sert ni ours ni phoque aux enfants (section 9). »
5. `26:374` « *Ce qu'on perd :* du confort ; le membre est aussi bien immobilisé. »
   → « On y perd seulement du confort : le membre est aussi bien immobilisé. »
6. `39:80` « Sans pèse-personne, section 9 : le poids se fabrique, il ne se devine pas. »
   → « Sans pèse-personne, fabriquer une balance (section 9) plutôt que de deviner le poids. »

**Cause.** `gabarit-chapitre.md`, section 4 : « Un substitut seulement s'il est vital, sinon « (→ section 9) » »,
devenu un code flèche. Section 9 du gabarit : « Nommer honnêtement ce qu'on perd en la choisissant », devenu
l'étiquette fixe « Ce qu'on perd : », 21 fois dans le lot, suivie d'un nom seul une fois sur deux. L'annonce est déjà
dans le tableau du skill `ecriture` (« L'annonce et le résumé », « La révélation en deux temps »), qui n'a pas été passé
sur les ch. 25 et 39.

### Motif 6. Le paragraphe-entrepôt : trop de chiffres et de conditions dans une phrase (moyenne)

Une phrase porte cinq à sept seuils, ou trois conditions avec une parenthèse dans la première. Chaque chiffre est
juste et sourcé ; c'est leur empilement qui se lit mal à voix haute, parce que le lecteur doit garder le début de la
phrase en tête jusqu'à la fin. Dans le ch. 26, qui a peu de télégraphe, c'est la forme que prend la compression.

**Fréquence.** Le ch. 26 porte 29,5 chiffres pour 1000 mots hors tableaux et renvois, le plus chargé du lot, plus que
Ripley (22,3). Phrases de 35 mots et plus avec trois chiffres ou six virgules : 9 au ch. 25, 5 au ch. 26, 7 au ch. 39
(dont quelques listes de la section 2).

**Exemples.**

1. `25:255` « **Seuils de température qui changent l'habillement et l'outillage** : sous 16 °C, un ouvrage de précision
   à mains nues de plus de 10 minutes demande un moyen de réchauffer les mains — c'est sous 16 °C de température cutanée
   que la dextérité tombe ; sous 4 °C, isolation du corps entier et coupe-vent, et on change tout vêtement mouillé ;
   sous 2 °C, quelqu'un de mouillé se traite pour hypothermie ; […] » (une phrase de 155 mots, sept seuils)
   → une ligne par seuil, chacune avec son verbe :
   - Sous 16 °C : pour un travail de précision à mains nues de plus de 10 minutes, prévoir de quoi se réchauffer les
     mains, parce que les doigts perdent leur adresse quand la peau descend sous 16 °C.
   - Sous 4 °C : couvrir tout le corps, mettre un coupe-vent et changer tout vêtement mouillé.
   - Sous 2 °C : traiter pour une hypothermie toute personne mouillée.
   - (et ainsi de suite pour -1 °C, -7 °C et -17,5 °C)
2. `26:185` « Si elle a reçu ses trois doses de base, elle est protégée quand sa dernière dose a moins de 5 ans pour une
   plaie souillée de terre, de poussière, de selles ou de salive, une morsure, un clou, des tissus morts, une gelure,
   une brûlure ou un arrachement, et moins de 10 ans pour une petite plaie propre. »
   → « Si elle a reçu ses trois doses de base, une petite plaie propre est couverte quand la dernière dose a moins de
   10 ans. Pour toutes les autres, la dernière dose doit avoir moins de 5 ans : une plaie souillée de terre, de
   poussière, de selles ou de salive, une morsure, un clou, des tissus morts, une gelure, une brûlure, un arrachement. »
   (Le cas court d'abord, la longue liste à la fin de la phrase, où elle ne sépare plus le sujet de son second
   complément.)
3. `26:106` « Si la route doit prendre plus de 2 heures, on peut desserrer le garrot à trois conditions : la personne
   n'est pas en choc (son pouls ne monte pas, sa peau n'est pas froide et moite, elle n'est ni agitée ni somnolente), le
   garrot n'arrête pas le sang d'un membre arraché, et quelqu'un peut surveiller la plaie. »
   → « Si la route doit prendre plus de 2 heures, on peut desserrer le garrot, mais seulement si les trois conditions
   sont réunies :
   - la personne n'est pas en choc : son pouls ne monte pas, sa peau n'est pas froide et moite, elle n'est ni agitée ni
     à moitié endormie ;
   - le membre n'est pas arraché ;
   - quelqu'un peut surveiller la plaie. »
4. `39:159` « Seuils du livre, plus stricts que ceux des adultes : à -15 °C ou moins, sorties écourtées ; à -27 °C ou
   moins, refroidissement éolien compris, les enfants ne sortent pas. Pour juger de l'exposition : entre -28 et -39, la
   peau exposée peut geler en 10 à 30 minutes ; entre -40 et -47, en 5 à 10 minutes ; entre -48 et -54, en 2 à 5
   minutes ; à -55 et moins, en moins de 2 minutes. Par vents soutenus de plus de 50 km/h, plus vite encore. »
   → « À -15 °C ou moins, écourter les sorties des enfants. À -27 °C ou moins, refroidissement éolien compris, les garder
   à l'intérieur. Ces limites sont plus strictes que pour les adultes. Le temps que met la peau exposée à geler, selon
   l'indice, est au ch. 25. » (Le tableau du ch. 25 était recopié en prose : voir aussi le motif 7.)

**Cause.** La règle 1 de CLAUDE.md pousse à mettre chaque chiffre trouvé, et « Écrire dense » à les mettre dans une
seule phrase. Le cadre demande de découper « une étape qui a plusieurs gestes » en sous-étapes ; rien ne dit quoi faire
de plusieurs seuils, de plusieurs doses ou de plusieurs conditions, ni où placer une longue liste dans une phrase.

### Motif 7. Le même fait dit dans trois ou quatre sections (moyenne)

Le délayage du lot n'est pas du bavardage : c'est le même fait de sécurité redit dans la procédure, la section 3, les
deux tableaux, l'encadré de la section 8, un bloc de la section 9 et « Ce qui ne se remplace pas », parfois mot pour
mot. Le ch. 26, passé au gabarit de sept sections, n'a presque plus de redite.

**Fréquence.** Ch. 25 : le CO à 7 endroits (lignes 51, 293, 307, 339 à 363, 386, 446, 465), le réchauffement trop brusque
à 6 (43, 84, 111, 289, 300, 319 à 331), la réanimation du corps froid 3 fois (113, 309, 333), les mitaines 2 fois. Ch. 39 :
le VFI qui ne se remplace pas 3 fois, le mal de caribou 3 fois, la trichine 2 fois, les 69 % 2 fois, la pièce étagée
2 fois, l'ébullition 2 fois ; le tableau du refroidissement éolien du ch. 25 recopié à l'étape 15, et les pics à glace
fabriqués dans les deux chapitres (planche 15-01, du ch. 15). Ch. 26 : 2 petites redites (« on compte trop vite »,
lignes 85 et 459 ; l'heure sur le front, lignes 103 et 478).

**Exemples.**

1. `25:293` (points de contrôle) « Alarme ou symptômes : tout le monde dehors avant de chercher pourquoi, couper ce qui
   brûle, ouvrir grand. On ne rentre dormir que quand le détecteur reste silencieux la porte refermée », et `25:361`
   (section 8) « Alarme ou symptômes : tout le monde dehors avant de chercher pourquoi, couper ce qui brûle, ouvrir
   grand, et ne rentrer dormir que quand le détecteur reste silencieux la porte refermée. »
   → une seule place, l'étape où l'on allume quelque chose ; dans le tableau, la ligne sort (elle redit une consigne).
2. `25:115` (étape 14) « Continuer aussi longtemps qu'on est capable de continuer, en se relayant : des victimes qui
   semblaient mortes ont été ranimées. », et `25:335` (section 8) « On palpe le pouls carotidien une minute complète,
   puis on fait la RCR aussi longtemps qu'on est capable de la faire : des victimes qui semblaient mortes ont été
   ranimées. »
   → l'étape 14 seulement ; la section 8 n'en garde rien.
3. `25:263` « parce que cinq doigts séparés perdent chacun leur chaleur par leur propre surface quand quatre doigts
   ensemble se la partagent », et `25:437` « quatre doigts ensemble se partagent leur chaleur, cinq doigts séparés la
   perdent chacun par leur propre surface. »
   → la raison une fois (avec les seuils) ; dans la mitaine de la section 9 : « La mitaine est grossière, mais elle
   garde plus chaud qu'un gant ajusté (voir les seuils, plus haut). »
4. `39:126` « L'air d'une pièce chauffée au poêle est stratifié : le lit d'un enfant au plancher est dans une autre pièce
   que le thermomètre posé sur la table. », et `39:420` « L'air d'une pièce chauffée au bois est étagé, et un enfant
   couché au sol dort dans une autre pièce que l'adulte debout. »
   → l'étape 9 seulement, en mots de tous les jours : « Au plancher, l'air est plus froid que sur la table : lire le
   thermomètre à la hauteur du lit des enfants. » ; la section 9 garde le verre d'eau et renvoie à l'étape 9.
5. `39:64` « Ne se remplace pas. », `39:472` « **Le VFI d'enfant ne se remplace pas.** Rien d'improvisé ne tient un corps
   de 20 kg la face hors de l'eau. La seule substitution honnête, c'est de ne pas y aller. », et `39:531` « Le VFI à la
   taille de l'enfant. »
   → une seule fois, à la ligne 472, sans la formule : « Le VFI d'enfant ne se remplace pas : rien d'improvisé ne tient un
   corps de 20 kg la face hors de l'eau. Sans VFI, l'enfant ne va pas sur l'eau. »

**Cause.** L'ancien gabarit, que les ch. 25 et 39 suivent encore : une section 3 « Pourquoi ça marche » et une section 8
« Danger » qui redisent la procédure, et une section 9 où le gabarit demande de « dire ce qui ne se remplace vraiment
pas » dans chaque bloc puis à la fin. Les règles qui l'empêchent existent (skill `ecriture`, « La répétition » ; cadre,
« Inventaire des faits du chapitre » ; CLAUDE.md, « Chaque chapitre parle de son sujet ») ; elles n'ont pas encore été
appliquées à ces deux chapitres.

### Motif 8. La phrase qui parle du livre, du chapitre ou de la recherche (basse)

Une phrase dit comment lire le chapitre, ce que fait le livre, ou d'où vient un chiffre. Elle n'apprend rien sur le
geste.

**Fréquence.** 5 au ch. 25, 8 au ch. 39, aucune au ch. 26.

**Exemples.**

1. `25:79` « Depuis le chalet, elle est normalement oui, et c'est là que l'étape 18 devient une vraie décision plutôt
   qu'une formalité. »
   → « Depuis le chalet, elle est normalement oui (étape 18). »
2. `25:367` « Sans électricité, sans thermomètre, sans rien d'acheté. Tout ce qui précède reste faisable ; ce qui change,
   c'est que la moitié du matériel se fabrique, et qu'aucun de ces montages ne se fait avec des doigts déjà gelés. Une
   partie se prépare l'automne d'avant ou ne servira jamais. »
   → « Ces montages se font avant d'avoir les doigts gelés, et certains se préparent l'automne d'avant. »
3. `25:154` « **Ampoules** : la pratique courante est de vider sélectivement les ampoules claires à l'aiguille et de
   laisser intactes les ampoules hémorragiques, qui signent une atteinte plus profonde — en sachant que les données
   comparatives manquent. »
   → « **Ampoules** : vider les ampoules claires à l'aiguille, et laisser intactes les ampoules pleines de sang, qui
   montrent une gelure plus profonde. »
4. `39:206` « Dans ce chapitre, «échec » ne veut pas dire jeter un aliment. Ça veut dire que le plan de rester, à la
   maison comme au chalet, vient de cesser d'être le bon, ou qu'il faut agir dans la minute. »
   → *(rien)*
5. `39:355` « L'avertissement qui l'accompagne est celui qui compte : «Vous devez utiliser les quantités exactes
   indiquées afin de ne pas risquer d'aggraver votre état. » Le mécanisme explique pourquoi : »
   → « Les quantités doivent être exactes : c'est le rapport entre le sucre et le sel qui fait entrer l'eau à travers la
   paroi de l'intestin. » (La citation d'une source vouvoie le lecteur et montre la provenance : deux règles de
   CLAUDE.md.)
6. `39:129` « Le «6 L par personne » des aimants de frigo ne couvre que la boisson sur trois jours ; le ch. 6 fait le
   calcul complet et arrive aux mêmes 4 L. »
   → *(rien)*

**Cause.** L'habitude du rapport de recherche et de la justification du cadrage, déjà au tableau du skill `ecriture`
(« La phrase qui parle du livre », « La justification du cadrage ») ; les ch. 25 et 39 sont d'avant ce tableau. Le
gabarit y pousse en section 9 : « Nommer honnêtement ce qu'on perd » est devenu au ch. 39, ligne 296, « Ce qu'on perd est
dit chaque fois. »

### Motif 9. Le délayage dans la phrase : la conséquence redite, la scène, l'évidence (basse)

Une phrase redit en fin de course ce qu'elle vient de dire, raconte une scène avant le fait, ou écarte un cas
qu'aucun lecteur n'aurait confondu. C'est le seul vrai remplissage du lot, et il en reste un peu au ch. 26.

**Fréquence.** Une quinzaine dans le lot, dont 4 au ch. 26.

**Exemples.**

1. `26:237` « Quand on veille quelqu'un, on ferme la maison, on chauffe plus fort et on veut du courant pour la
   lumière : c'est le moment où on est tenté de rentrer la génératrice dans un bâtiment, un garage ou sous un auvent. Le
   monoxyde donne mal à la tête, la nausée et le sommeil, et la famille met ça sur le compte de la maladie ou de
   l'inquiétude. »
   → « Le monoxyde donne mal à la tête, mal au cœur et envie de dormir, et la famille met ça sur le compte de la maladie
   ou de l'inquiétude. » (La première phrase est la forme exacte que JP a appelée « fucking weird » puis « un paragraphe
   de même ça veut rien dire » sur la page de la génératrice ; le titre de l'étape dit déjà le geste.)
2. `26:112` « Un corps qui a perdu du sang refroidit vite, et le sang coagule mal dans un corps froid : on la garde au
   chaud pour aider le sang à coaguler. »
   → « Un corps qui a perdu du sang refroidit vite, et le sang coagule mal dans un corps froid. »
3. `26:195` « Pour une égratignure de chauve-souris, même presque invisible, partir le jour même ; une coupure de
   couteau propre, même si elle saigne beaucoup, ne demande pas le vaccin. »
   → « Pour une égratignure de chauve-souris, même presque invisible, partir le jour même. »
4. `25:84` « Ne pas la faire marcher, ne pas la faire s'asseoir, ne pas la masser, ne pas frictionner la peau. Utiliser
   une civière improvisée plutôt que de la faire avancer. »
   → « La déplacer sur une civière improvisée, sans la faire marcher ni s'asseoir, et sans la masser ni lui frotter la
   peau. »
5. `39:180` « Un enfant qui peut faire de la lumière lui-même se lève moins la nuit, et un enfant qui se lève moins la
   nuit ne traverse pas la pièce du poêle dans le noir. »
   → « Un enfant qui peut faire de la lumière lui-même se lève moins la nuit, donc il traverse moins souvent la pièce du
   poêle dans le noir. »
6. `39:147` « Quand l'épisode s'étire, la maison n'est plus qu'un logement sans eau ni égout au milieu d'autres
   logements sans eau ni égout, et le chalet redevient le bon endroit parce que c'est lui qui a le bois, l'eau et le
   territoire (ch. 2). »
   → « Quand l'épisode s'étire, la maison n'a plus d'eau ni d'égout, pas plus que celles des voisins, et le chalet
   redevient le bon endroit, parce qu'il a le bois, l'eau et le territoire (ch. 2). »

**Cause.** CLAUDE.md, « L'écriture » (« la conséquence évidente d'un fait qu'on vient de dire », « la répétition ») et
le skill `ecriture` : règle 12 (« on est tenté de ») et la ligne du tableau de la relecture (« un contre-exemple qu'aucun
lecteur n'aurait confondu ne s'écrit nulle part »). La règle 12 a été écrite le 28 octobre sur la page de la génératrice
et n'a pas été repassée sur le ch. 26, monté avant. L'exemple 5 montre la limite de la règle : la redite se corrige avec
un « donc », pas en coupant le lien.

## 4. Ce qui marche : des modèles

1. **`26:82`, l'appui sur la plaie.** « Appuyer avec la paume, directement sur la plaie, et ne pas relâcher pour regarder
   (planche 26-40, repères 1 et 2). Une personne peut mourir d'une grosse perte de sang en moins de 5 minutes. Chaque
   fois qu'on soulève la main pour regarder, on défait le caillot qui commençait à se former. Appuyer de tout son poids,
   les bras tendus, pendant au moins 5 minutes pleines à la montre avant de regarder : sous le stress, on compte trop
   vite. »
   Pourquoi : chaque phrase a un verbe et quelqu'un qui le fait ; la raison suit le geste qu'elle explique, et elle le
   fait voir (« chaque fois qu'on soulève la main ») ; le seul deux-points annonce une vraie raison, que le lecteur ne
   connaît pas. Les phrases vont de 9 à 25 mots : le tempo vient du geste, pas d'une formule.
2. **`26:149`, la brûlure.** « La peau continue de cuire plusieurs minutes après qu'on l'a retirée de la chaleur, et
   l'eau arrête la cuisson. Le plus tôt est le mieux, mais l'eau aide encore si on commence jusqu'à 3 heures après la
   brûlure. »
   Pourquoi : un mécanisme dit avec ce qu'on voit (« la peau continue de cuire »), puis un « mais » et un « encore »,
   deux petits mots que les règles de coupe auraient pu enlever et qui portent le fait qui surprend.
3. **`26:255`, décider de partir.** « Décider le départ pendant que la personne est stable. On peut alors partir de jour,
   l'auto chargée comme il faut, avec un adulte assis à l'arrière pour la surveiller. Si on attend qu'elle se dégrade,
   le départ peut se faire de nuit, dans la hâte, sur une route d'hiver, avec les enfants dans l'auto (ch. 2, ch. 15). »
   Pourquoi : « alors » et « si » portent le raisonnement ; deux situations concrètes, mises côte à côte, disent ce
   qu'une maxime (« décider à temps ») aurait tassé.
4. **`39:236`, le monoxyde au plancher.** « Le monoxyde ne monte pas au plafond et ne tombe pas au plancher : il a presque
   la densité de l'air et se mélange partout, donc coucher les enfants au ras du sol ou sur la mezzanine ne change
   rien. »
   Pourquoi : le fait, la raison et la conséquence, reliés par « et » et « donc », sur le cas réel de la famille (les
   enfants au ras du sol, la mezzanine). C'est la version du fait que la page des dangers a condensée (section 2).
5. **`39:346`, l'enfant intoxiqué.** « Il a l'air fatigué, mou, de mauvais caractère ; il chigne, il ne veut plus jouer,
   il veut se recoucher. Un parent attentif conclut au caractère ou à la fatigue de la journée. »
   Pourquoi : les mots qu'un parent dit (« mou », « il chigne »), trois verbes qui montrent l'enfant, et le réflexe
   normal nommé, qui est le fait qui surprend (CLAUDE.md, « Le lecteur est un parent compétent »). La suite du passage
   (« C'est le piège complet : le plus petit corps de la maison tombe le premier, et il tombe d'une manière qui n'alarme
   pas. ») est une formule qui redit, et sort.

À côté, au ch. 25, la deuxième moitié de l'enveloppe croisée (lignes 376 à 383) montre la même étape que le motif 1,
exemple 1, bien dite : « Prendre le bord gauche de la couverture du dessus, le rabattre par-dessus le corps et le
border **sous** le flanc droit ; faire l'inverse avec le bord droit », puis le pare-vapeur expliqué en une phrase : « dans
un cas il garde la neige et la pluie dehors, dans l'autre il garde l'humidité du corps loin de la laine ».

## 5. Ce que ça demande aux règles (pour la réécriture du skill)

1. **Dense en faits, pas en mots.** « Écrire dense » (CLAUDE.md, règle 5) et « environ 700 mots utiles par page »
   (`plan/decisions-jp.md`, ligne 179) se lisent comme un compte de mots, et ce compte récompense la liste de noms, la
   formule et le mot savant (motifs 1, 3, 4). Dire plutôt : chaque phrase apprend quelque chose, et elle garde ses
   articles, son verbe et le mot qui la relie à la précédente ; le nombre de pages peut monter.
2. **Une liste des mots qui se gardent.** « mais », « parce que », « donc », « si », « alors », « sinon », « comme ça »,
   « c'est pour ça que », et « encore », « quand même », « déjà » quand ils portent le sens (« l'eau aide encore »). La
   liste des mots vides du skill `ecriture` doit dire qu'ils sortent seulement quand ils n'ajoutent rien.
3. **La règle 1 du skill (« Deux faits, deux phrases ») a une exception** : deux faits liés gardent leur lien dans la
   même phrase (motif 2, exemple 1).
4. **Le deux-points a un seul emploi** : annoncer le détail ou une raison qui suit immédiatement. Une opposition, une
   condition ou une conséquence se dit avec son mot. La section « Le tiret » doit le dire, puisqu'elle propose le
   deux-points comme remplaçant.
5. **« La conséquence évidente » se juge pour un lecteur qui n'a pas lu le chapitre.** Si la raison est nouvelle pour
   lui, elle reste, avec son « parce que ».
6. **Le gabarit, section 4** : le « format validé » du Matériel devient une phrase avec un sujet (« Il porte les 74 °C à
   cœur. »), et le code « (→ section 9) » une phrase courte (« Sans matelas, des branches de sapin, section 9 »).
   **Section 9** : « ce qu'on perd » se dit dans une phrase, pas sous une étiquette fixe.
7. **Le skill `editeur`** : « alterne phrases courtes (percutantes) » devient « la phrase courte dit un geste » ; une
   phrase courte qui n'est pas un geste est presque toujours une formule ou une annonce.
8. **Plusieurs seuils, doses ou conditions** se mettent en liste, une ligne par cas avec son verbe ; une longue liste va
   à la fin de la phrase (motif 6).
9. **La passe sur les tomes 2 à 6** : le ch. 26 montre qu'elle enlève les motifs 1, 3, 5, 7 et 8, mais qu'elle laisse
   un texte uniforme, sans « mais » et sans phrase courte. Elle doit donc aussi remettre les liens et vérifier le tempo
   (`tempo.py` : monotonie et phrases de six mots et moins), pas seulement couper.

## 6. Signalé en passant (hors de ce regard, pour le vérificateur technique et la passe)

- Ch. 39 : la formule de la ligne 178 (« change le plan, pas la ration ») contredit les lignes 196 et 219 (« réviser la
  ration et le gras »).
- Ch. 39 : les pics à glace « pendus aux poignets » au Matériel (ligne 65) et « portés au cou » en section 9 (ligne 453).
- Ch. 39, ligne 477 : « Sans sifflet : un sifflet de métal » ne se comprend pas.
- Ch. 25, lignes 150 à 153 : on ne sait pas si « 12 mg/kg par jour en deux prises » vise l'adulte ou tout le monde.
- Services et soins qui répondent, contraires à CLAUDE.md : « en attendant l'ambulance » (25:12), « on appelle »
  (25:78), « Soins médicaux immédiats » (39:213), « Urgence médicale » (39:215).
- Les ch. 25 et 39 suivent l'ancien gabarit (sections 3 et 8, « C'est le mauvais chapitre quand », note de lieu sous le
  titre) ; ils gardent « village » (25:5, 25:217), « § », 49 et 42 tirets, les noms latins, et le titre du ch. 39 donne
  l'âge des enfants. Points de contrôle et signes d'échec au-dessus de 8 lignes : ch. 25 (9 et 11), ch. 26 (14 et 12),
  ch. 39 (11 et 11).

## 7. Liste de contrôle (`.claude/cadre-agents.md`, les lignes de l'écriture et de la langue)

Pour tout agent
- [x] CLAUDE.md pris comme règle ; le cadre lu au complet.
- [x] Le skill `ecriture` lu au complet, avec ses tableaux ; `editeur`, `gabarit-chapitre.md` et `plan/decisions-jp.md`
  lus par extraits, pour les causes.
- [ ] `suivi/plan-de-match.md`, section PAUSE : pas lu (audit, aucun chapitre touché).
- [x] Règle 1 : aucune réécriture n'ajoute de chiffre ni de fait ; là où le sens d'une formule est incertain, la note le
  dit (motif 3, exemple 1).
- [x] Rien commité ; seul ce fichier est écrit.
- [x] Lu seulement le lot, les règles et les mesures ; sorties de commande coupées.

La phrase
- [x] Règle 0 : chaque réécriture relue à voix haute ; un verbe qui dit le geste, qui le fait, les articles.
- [x] Pas de loi en formule, jamais « d'où », pas de « X passe là où Y ne passe pas » dans les réécritures.
- [x] Pas de maxime, d'opposition fabriquée, d'image ni de chose qui pense dans les réécritures (motif 3 les relève dans
  le texte).
- [x] Consigne jamais au pronominal dans les réécritures ; consigne dite comme une consigne ; sujet nommé.
- [ ] Points de contrôle et signes d'échec à 8 lignes : hors de ce regard, relevé en section 6.
- [ ] Pages des dangers : hors du lot (le paragraphe du monoxyde est seulement comparé, section 2).
- [x] Un passage lourd se juge d'abord : doit-il exister ? Les motifs 7, 8 et 9 proposent de couper, pas de polir.
- [ ] Passe d'éditeur : sans objet (audit).
- [x] Le chapitre parle de son sujet : relevé (ch. 39, étape 15, et les pics à glace, motif 7).
- [x] Une notion s'explique à sa première apparition : relevé (« afterdrop », motif 4).
- [ ] « Quand l'utiliser » en titres de situation : hors de ce regard ; les ch. 25 et 39 ne l'ont pas.
- [x] Pas de « on est tenté de » : relevé au ch. 26, ligne 238 (motif 9).
- [x] Le mot qu'on dit dans les réécritures (« n'a plus toute sa tête », « envie de dormir », « mal au cœur »).
- [x] La chose nommée plutôt qu'un possessif (« le sac de couchage », « la broche »).
- [x] Les mots de tous les jours : le jargon est relevé (motif 4) et remplacé.
- [x] Aucun tiret dans les réécritures ; « section N », jamais « § ».
- [x] Les titres-maximes relevés (« L'isoler du sol avant de l'isoler du ciel », « La prévention est une paire de bas »).
- [x] Les tournures relevées par JP (« X ne fait pas Y : il fait Z », chute en image) : cherchées, motif 3.
- [x] La répétition cherchée par idée, pas par mots (motif 7).
- [x] `controle.py` passé sur les réécritures (fichier de travail de la session) : 0 tiret, 0 « § » ; les avis jugés
  (« vider à l'aiguille les ampoules » remis dans l'ordre, « somnolente » et « c'est lui qui » changés, les « tout »,
  « encore », « déjà » gardés parce qu'ils portent le sens).

La langue
- [ ] Correcteur dans la chaîne : sans objet, rien ne s'imprime.
- [x] Les réécritures relues phrase par phrase : « que » et « qui », participes, « a / à », « ou / où ». `langue.py` passé
  sur elles (avec LanguageTool) : 6 avis, jugés : 4 faux positifs (« à l'air », « et bien acérée », « a moins de 10 ans »,
  « duffel », mot du texte) et la virgule de « d'après ce qu'on voit, pas d'après le thermomètre », gardée.
- [x] Le français écrit correct, les mots du Québec (« chigne », « mal au cœur ») sans joual ni anglicisme.
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures (motif 2, exemple 3, refait pour ça).
