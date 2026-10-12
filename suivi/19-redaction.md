> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 24. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 24, Le mal de caribou

- **Fichier :** `chapitres/24-le-mal-de-caribou.md`
- **Tome :** 2 — Le corps
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (technique) et 4 (sécurité)
- **Ampleur :** ≈ 4 600 mots utiles (5 826 mots bruts, tableaux compris). Procédure numérotée
  en 13 étapes, six tableaux, encadré DANGER à cinq points, variante d'urgence complète.
- **⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE** — marquée en tête du fichier chapitre et
  détaillée à la section 10.

---

## 0. Ce qu'il faut savoir avant de lire le reste

Ce chapitre est celui vers lequel le chapitre 12 avait renvoyé la fixation du chiffre
« mal de caribou : mortel en 2 à 3 semaines » du tableau de CLAUDE.md.

**Le chiffre n'a pas pu être fixé.** Après recherche, aucune source — ni Santé Canada, ni
MAPAQ, ni INSPQ, ni la littérature scientifique consultée — ne chiffre ce délai. Ben-Dor et
coll. (2011) écrivent au contraire, à propos du plafond protéique, qu'ils ne proposent pas de
détérioration physique aiguë. Le chapitre 24 énonce donc le danger **sans le délai**, et
marque le délai `[À VÉRIFIER]`.

**Conséquence pour le reste du livre :** le tableau de CLAUDE.md et tout chapitre qui reprend
« 2 à 3 semaines » diffusent un chiffre non sourcé. À signaler à l'éditeur. Le chapitre 12 le
cite déjà en le renvoyant ici.

**Gain accessoire de cette session :** la page française du MAPAQ sur la viande de gibier
sauvage, que les fiches sources des chapitres 7, 11 et 12 déclaraient en 404, **a répondu le
2026-09-20**. Les citations françaises officielles sont maintenant au dossier dans
`sources/24-mapaq-gibier-sauvage-chasseurs.md`. Les chapitres 7, 11 et 12 peuvent remplacer
leurs citations anglaises.

---

## 1. Les chiffres marqués `[À VÉRIFIER]`

| # | Valeur | Où dans le chapitre | Pourquoi elle n'est pas sourcée | Piste |
| --- | --- | --- | --- | --- |
| 1 | **Délai de mortalité, « 2 à 3 semaines »** | §8, DANGER point 1 | Énoncé du tableau de CLAUDE.md. Introuvable dans toute source consultée. Ben-Dor 2011 dit explicitement ne pas proposer de détérioration aiguë | Littérature clinique sur la *protein poisoning*. Récits de Stefansson et de Speth, à traiter comme des témoignages et non comme des données. **Question n° 3 au relecteur** |
| 2 | **Toute la composition des viandes** : orignal 22,2 g / 0,74 g / 102 kcal ; caribou 22,6 / 3,36 / 127 ; lièvre 21,8 / 2,32 / 114 ; castor 24,0 / 4,8 / 146 ; ours 20,1 / 8,3 / 161 ; moelle 6,7 / 84,4 / 786 ; truite, corégone, éperlan, suif, saindoux, huiles de phoque | §3 (tableau), §5 étape 9, §9 | Valeurs **USDA FoodData Central**, agence américaine. Le Fichier canadien sur les éléments nutritifs de Santé Canada est la source qui doit primer, et son moteur de recherche a répondu 404 sur toutes les adresses testées le 2026-09-20 | FCÉN : https://food-nutrition.canada.ca/cnf-fce/index-eng.jsp — reprendre chaque ligne sur un poste où l'interface répond. **Tâche mécanique, sans jugement, mais longue** |
| 3 | **Facteurs 4 kcal/g (protéines, glucides) et 9 kcal/g (lipides)** | §3, §5 étapes 3, 7, 8 | Facteurs d'Atwater, employés partout dans les calculs. La page d'index des ANREF les publie (« macronutrient energy yield ») mais l'extrait mot à mot n'a pas été capté | Page d'index ANREF : https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables.html |
| 4 | **Pourcentages de calories protéiques par espèce** : 87, 76, 73, 71, 66, 57, 56, 50, 3 % | §3, tableau | Divisions faites par le livre, pas des valeurs publiées. Reconstituer les kcal à partir des macronutriments ne redonne pas exactement la valeur USDA, qui emploie des facteurs propres à chaque aliment (écart de quelques pour cent) | Recalculer une fois les valeurs du FCÉN obtenues. Vérifier si l'écart de reconstitution mérite une note de bas de page |
| 5 | **Toute l'arithmétique de ration de la §5** : 262, 205, 131, 118 g de protéines ; 1 180, 923, 590, 531 g de viande ; 3,2 kg/jour famille ; 3 300 kcal ; déficit 5 400 kcal ; 370 g de gras/jour ; 55 kg et 78 kg pour 150 jours ; 440 g de moelle | §5 étapes 3 à 9, §6 | Arithmétique du livre sur des bornes **sourcées** (ÉVAR de Santé Canada) mais avec des besoins énergétiques et des **poids corporels hypothétiques** (80, 65, 21, 17 kg) | **Question n° 2 au relecteur.** Les poids réels de la famille remplacent les hypothèses dès la première utilisation |
| 6 | **Tableau clinique complet** : faim persistante, diarrhée, fatigue, nausée, mal de tête, dégoût de la viande | §7, tableau entier | **Aucune source clinique retrouvée.** Récits d'explorateurs rapportés dans la littérature anthropologique. L'avertissement en tête de la section 7 le dit au lecteur | **Question n° 3 au relecteur, plus un second avis médical.** Cette section ne doit pas être imprimée telle quelle sans arbitrage |
| 7 | **Besoin en eau associé à une ration protéique haute** | §6, ligne « Chaque jour / eau bue » | Le mécanisme (l'urée s'élimine dans l'urine) est établi, le chiffre ne l'est pas | **Question n° 5 au relecteur.** Croiser avec le ch. 13 |
| 8 | **Seuil de perte de poids hebdomadaire** déclenchant une correction | §6 | Aucun seuil publié retrouvé pour une situation de rationnement | **Question n° 6 au relecteur** |
| 9 | **Moelle rouge et gélatineuse = bête épuisée** | §6, dernière ligne | Observation de terrain, non sourcée. Présentée comme telle dans le tableau | Biologiste de la faune du MELCCFP. L'indice de gras médullaire existe en biologie de la faune : retrouver une publication qui le décrit |
| 10 | **Majoration des besoins énergétiques par le froid extrême** | §5 étape 2, mentionnée pour dire qu'elle n'est **pas** appliquée | Absente des équations de Santé Canada et de toutes les pages consultées | Ch. 26. CNESST travail au froid (`sources/03-cnesst-travail-au-froid.md`) ne la chiffre pas non plus |
| 11 | **Rendement de la graisse d'os** | §9 | Aucun chiffre avancé, volontairement. Le chapitre dit que personne ne peut l'annoncer d'avance | Mesure sur place : peser les os, peser le gras récupéré. **Tâche de terrain pour JP, à l'automne** |
| 12 | **Foie d'ours et de phoque, hypervitaminose A** | Non traité. Signalé en §10 comme question ouverte | Aucune source consultée. Le risque est documenté pour l'ours blanc ; rien de retrouvé pour l'ours noir | Ch. 41, 48, 52. Ne pas écrire avant d'avoir la source |

**Chiffres sourcés et fermes du chapitre** (ne pas les rouvrir sans source contraire) :
protéines **10-35 %** adulte, **10-30 %** de 4 à 18 ans, **5-20 %** de 1 à 3 ans ; lipides
**20-35 %**, **25-35 %**, **30-40 %** ; glucides **45-65 %** ; ANR protéines **0,80 g/kg**
adulte, **0,95 g/kg** de 4 à 8 ans, **1,05 g/kg** de 1 à 3 ans, **71 g/j** grossesse et
allaitement ; ANR glucides **130 g/j** dès 1 an ; AS acide linoléique **17 / 12 / 10 g/j**,
acide α-linolénique **1,6 / 1,1 / 0,9 g/j** ; **aucun AMT** pour les macronutriments ; MRUS
**65 mg N/h/kg^0,75 (55-76)** ; plafond **35 %** et bascule **50 %** de la littérature ;
**74 °C** à cœur ; **cent fois** la limite OMS pour les reins de cervidé ; **7 °C en 24 h** ;
**-18 °C**.

---

## 2. Images requises

| # | Format | Sujet | Cadrage demandé | Source |
| --- | --- | --- | --- | --- |
| 24-01 | **Demi-page** | **L'image clé du chapitre.** Deux os longs d'orignal sciés en long, côte à côte : à gauche une moelle blanche et ferme (bête en réserve), à droite une moelle rouge, gélatineuse et translucide (bête épuisée) | Plongée verticale, les deux os parallèles dans le même cadre, même distance, fond noir mat pour détacher le blanc, éclairage latéral rasant. Règle de 10 cm dans le cadre. **Photographier les deux le même jour, sinon la couleur n'est pas comparable** | Photo de JP. **Fenêtre d'octobre**, à faire en même temps que les photos de débitage des ch. 36 à 42 |
| 24-02 | **Pleine page** | Planche dessinée : barres horizontales de la part des calories venant des protéines, par espèce (orignal 87 % à moelle 3 %), avec une ligne verticale rouge à 35 % (plafond adulte) et une ligne orange à 50 % (bascule) | Planche à dessiner, pas une photo. Barres classées de la plus maigre à la plus grasse. Les deux lignes traversent toute la planche. Légende sous la planche : valeurs USDA, pourcentages calculés | À dessiner. **Ne pas produire avant que les valeurs du FCÉN remplacent celles de l'USDA** (chiffre n° 2) |
| 24-03 | **Demi-page** | Trois assiettes côte à côte : celle qui tue (viande maigre seule), celle qui est corrigée (même viande + graisse fondue + féculent), celle d'un enfant de 4 ans (proportions inversées) | Plongée verticale, trois assiettes identiques, même nappe, même lumière, même distance. Étiquette discrète sous chaque assiette. Les quantités doivent correspondre au tableau de la §5 — **peser avant de photographier** | Photo de JP, l'hiver |
| 24-04 | **Demi-page** | Séquence de la graisse d'os en trois vignettes : os cassés courts dans le chaudron, ébullition, couche de gras figée en surface au matin | Même cadre et même distance pour les trois, trois quarts au-dessus du chaudron, lumière de fenêtre ou lampe fixe. Cuillère dans la dernière vignette pour l'échelle | Photo de JP |
| 24-05 | **Quart de page** | Balance de cuisine avec une ration pesée : d'un côté 1 180 g de viande (le plafond d'un homme), de l'autre 300 g (le plancher) | Plongée verticale, affichage de la balance lisible à l'impression, même assiette dans les deux prises | Photo de JP |
| 24-06 | **Quart de page** | Pots de graisse fondue étiquetés et datés sur une tablette | Frontal à hauteur d'œil, recul de 1,5 m, étiquettes écrites au marqueur épais **avant** la photo, éclairage latéral | Photo de JP. À prendre en même temps que la 12-01 (mur des consommables) |
| 24-07 | **Quart de page** | Thermomètre à sonde lisant 74 °C planté dans un rôti de gibier, pointe dans la partie charnue, loin de l'os | Macro sur l'afficheur, rôti net en second plan, la valeur 74 doit être lisible | Photo de JP |
| 24-08 | **Quart de page** | Le carnet de ration ouvert : les quatre besoins énergétiques et les quatre plafonds protéiques écrits à la main | Plongée à 45°, lumière naturelle, crayon dans le cadre, écriture lisible | Photo de JP |

**Note pour `images/credits.md` :** aucune image de ce chapitre n'est versée. Toutes sont
prévues en photos maison sauf la 24-02, qui est une planche à dessiner. **La 24-01 dépend de
la fenêtre d'octobre** : manquée, elle attend un an, et c'est l'image qui porte le test de
terrain de la section 6.

---

## 3. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 7 | Les enfants de 4 et 6 ans : ils atteignent le plafond protéique avant les adultes |
| 8 | Stock permanent : c'est là que se décident les 55 kg de gras et les 78 kg de glucides. **Vérifier que le ch. 8 ne sous-estime pas le poste gras** |
| 12 | Ce qui manque toujours : le gras y est nommé comme le poste qui manque le premier. Le ch. 12 renvoyait ici pour le délai de mortalité — **il n'a pas pu être fixé, le signaler à l'éditeur** |
| 13 | Eau : l'élimination de l'urée en demande, et l'eau d'hiver coûte du bois |
| 25 | Scorbut : même saison, autre maladie, autre remède. Thuyone du cèdre répétée ici |
| 26 | Besoins énergétiques, équations de Santé Canada, majoration hivernale non résolue. **Les deux chapitres partagent le même relecteur nutritionniste — les envoyer ensemble** |
| 27, 31 | Soigner sur place ; ce qu'on ne peut pas soigner |
| 28 | Écarter une cause infectieuse devant une diarrhée |
| 41 | Abats et organes : cadmium du foie et des reins de cervidés ; question ouverte du foie d'ours et de phoque |
| 42 | Ce que personne ne garde : os, moelle, gras de tête et d'intestins. **Chapitre jumeau pour la récolte du gras** |
| 44 | Lièvre d'Amérique : tularémie, et l'animal qui nomme la maladie |
| 46, 47 | Castor et porc-épic : les deux animaux gras que le piège donne en hiver |
| 48, 52 | Ours noir et phoque : sources de gras, et trichinelle |
| 53, 55 | Truite et éperlan : le poisson maigre pose le même problème, ce que personne n'anticipe |
| 57, 58, 60 | Petits fruits, plantes, sève et écorces : glucides et vitamine C d'hiver |
| 61 | Pourquoi la viande pourrit |
| 67 | **Pemmican et graisses.** Le chapitre jumeau : fonte, coulage, conservation du gras. Le 24 pose le problème, le 67 donne le geste |
| 68, 69 | Froid naturel ; congélateur qui dégèle |
| 71, 72 | Poisson salé et fumé |
| 74, 76, 77 | Jardin nordique, caveau, fermentation : la seule production locale de glucides |

**Vérification faite :** tous les numéros ci-dessus existent dans le plan des 89 chapitres.
Aucun renvoi vers un chapitre inventé.

---

## 4. Rappels de sécurité de CLAUDE.md repris dans ce chapitre

| Règle du tableau de CLAUDE.md | Reprise ici ? | Où |
| --- | --- | --- |
| Viande maigre seule = mal de caribou, mortel | **Oui — c'est le sujet du chapitre**, avec le mécanisme complet (plafond de synthèse de l'urée, bilan énergétique négatif). **Le délai de 2 à 3 semaines est marqué `[À VÉRIFIER]`, pas affirmé** | §1, §3, §8 point 1 |
| Cuisson du gibier sauvage à 74 °C à cœur (MAPAQ) | Oui, deux fois, avec la méthode de mesure (partie charnue, sans toucher l'os) | §5 étape 12, §8 point 4 |
| Jamais le foie ni les reins de cervidés — cadmium (MAPAQ) | Oui, avec le mécanisme (accumulation à vie dans l'organe, cent fois la limite OMS) **et la raison pour laquelle c'est le piège propre à ce chapitre** : quelqu'un qui manque de gras va spontanément au foie | §8 point 3 |
| Trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent | Oui, avec le mécanisme (larves enkystées dans le muscle, seule la chaleur les tue), ours et phoque | §8 point 4 |
| Tularémie : gants obligatoires à la manipulation | Oui, avec le mécanisme (passage cutané à l'écorchage, donc **avant** toute cuisson) | §8 point 5, §4 (matériel) |
| Thuyone du cèdre toxique — sapin baumier ou épinette pour la vitamine C | Oui, avec les trois noms latins | §9 |
| Botulisme de type E : toxine dès 3 °C | **Non repris** | Voir ci-dessous |
| Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence | **Non repris** | Voir ci-dessous |
| Génératrice : jamais dans un bâtiment, un garage ou sous un auvent | **Non repris** | Voir ci-dessous |

**Règles écartées, et pourquoi.** Les deux règles de botulisme ne sont pas reprises parce que
le chapitre ne fait ni conserve, ni fumage, ni salaison : la graisse fondue et coulée de la
section 9 relève du chapitre 67, qui les portera. La règle de la génératrice ne s'applique
d'aucune façon à ce chapitre.

**Écart volontaire à signaler au vérificateur sécurité :** l'encadré DANGER compte cinq
points, ce qui est beaucoup. Les cinq sont retenus parce que la procédure du chapitre **envoie
activement le lecteur** vers les abats, la moelle, l'ours, le castor, le phoque et le lièvre.
Un encadré qui poserait le mal de caribou sans dire où **ne pas** chercher le gras serait
incomplet. À arbitrer par le rôle 4.

---

## 5. Relecteur humain requis

**Oui. Obligatoire, marqué en tête du fichier chapitre.**

**Relecteur principal : diététiste-nutritionniste**, membre de l'Ordre professionnel des
diététistes du Québec, avec si possible une pratique clinique ou une expérience en nutrition
nordique.

**Second avis requis : un médecin**, pour la section 7 seule (tableau clinique).

Les six questions à lui poser sont écrites dans la section 10 du chapitre. Les trois qui
bloquent l'impression :

1. La borne haute des ÉVAR (35 % adulte, 30 % enfant) est-elle le bon plafond **opérationnel**
   en rationnement, sachant qu'aucun AMT n'est publié ? Faut-il descendre pour les enfants,
   la grossesse et l'allaitement ?
2. L'arithmétique de la section 5 tient-elle, de bout en bout ?
3. Le tableau clinique de la section 7 est-il défendable ? **C'est la section la plus fragile
   du chapitre et elle le dit au lecteur.**

Question de fond à ne pas escamoter, la n° 4 de la section 10 : dès que les glucides manquent,
l'arithmétique impose une ration où le gras dépasse 50 % des calories, **au-dessus de la borne
haute de l'ÉVAR des lipides (20-35 %)**. Le livre doit dire honnêtement qu'il sort de
l'étendue recommandée, et pourquoi. C'est un arbitrage professionnel, pas un arbitrage de
rédacteur.

**Envoyer les chapitres 24, 25 et 26 au même relecteur, en un seul envoi.** Ils partagent le
sujet, les sources ANREF et les mêmes pièges, et trois envois séparés produiront trois
réponses incohérentes.

---

## 6. Notes pour l'éditeur

1. **Le chiffre de CLAUDE.md à corriger.** « Mal de caribou, mortel en 2 à 3 semaines » figure
   au tableau des rappels de sécurité. Il n'est pas sourcé et n'a pas pu l'être. Soit on le
   trouve, soit le tableau de CLAUDE.md le retire ou le marque.
2. **La page française du MAPAQ répond de nouveau.** `sources/24-mapaq-gibier-sauvage-chasseurs.md`
   contient les citations françaises officielles. Les chapitres 7, 11 et 12 citent encore la
   version anglaise faute de mieux : passe de substitution à faire.
3. **Le FCÉN n'a pas répondu.** Toute la composition des aliments du chapitre vient de l'USDA.
   C'est le plus gros bloc de `[À VÉRIFIER]` du chapitre et c'est du travail mécanique :
   une session dédiée sur un poste où l'interface du Fichier canadien fonctionne réglerait
   d'un coup le chiffre n° 2 et le n° 4.
4. **Recoupement à surveiller avec le ch. 67 (Pemmican et graisses).** Le 24 dit *pourquoi* il
   faut du gras et *combien*. Le 67 doit dire *comment* le fondre, le couler et le garder.
   Si le 67 se remet à expliquer le mal de caribou, c'est une redite : il renvoie ici.
5. **Recoupement à surveiller avec le ch. 26.** Le 26 porte les besoins énergétiques et la
   majoration par le froid. Le 24 ne fait qu'y renvoyer et ne doit pas se mettre à les
   chiffrer.
6. **Vague de travail.** Le suivi place les ch. 24 à 26 en vague 6. La photo 24-01 (moelle
   blanche contre moelle rouge) dépend de la **fenêtre d'octobre**, qui est en vague 3 :
   la commander maintenant au photographe, même si le chapitre n'est relu qu'après.

## Notes retirées du chapitre — 23 septembre 2026

Passe de nettoyage (paperasse, attributions, notes internes). Notes déplacées telles quelles :

1. En tête de chapitre :

   > ⚠ **RELECTURE HUMAINE EXTERNE OBLIGATOIRE — NUTRITIONNISTE.**
   > Ce chapitre ne part pas à l'impression sans la relecture d'une **diététiste-nutritionniste
   > membre de l'Ordre professionnel des diététistes du Québec**, de préférence ayant une
   > pratique clinique ou une expérience en nutrition nordique. Quatre questions à faire trancher,
   > dans l'ordre : la borne haute de 35 % est-elle le bon plafond en rationnement alors qu'aucun
   > apport maximal tolérable n'est publié ; faut-il descendre pour les enfants, la grossesse et
   > l'allaitement ; l'arithmétique de la section 5 tient-elle de bout en bout ; et le livre a-t-il
   > raison de sortir sciemment de l'étendue recommandée des lipides. **Second avis d'un médecin
   > requis pour la seule section 7.**

2. Section 3, fin du paragraphe « Les deux autres bornes » : « C'est la première question au relecteur. »

3. Section 3, sous le tableau par espèce : « Valeurs de composition USDA `[À VÉRIFIER]`, à remplacer par celles du Fichier canadien sur les éléments nutritifs. Pourcentages calculés par le livre aux facteurs de l'ANREF ; […] »

4. Section 5, étape 2 : « **Aucune majoration pour le froid extrême n'est appliquée ici : ce chiffre n'existe dans aucune source officielle consultée `[À VÉRIFIER]`.** »

5. Section 5, étape 2, provenance de l'exemple de travail : « (valeurs de repère du MSSS, niveau «actif », `sources/08-msss-besoins-energetiques.md`) »

6. Section 5, étape 3, second plafond : « Le seul autre maximum chiffré retrouvé est celui d'une revue de 2006 sur les apports protéiques (Bilsborough et Mann, *Int J Sport Nutr Exerc Metab*) […] `[À VÉRIFIER]` — le texte intégral est derrière un mur payant et seul le résumé a été lu. »

7. Section 5, étape 10, sous le tableau des sources de gras : « Valeurs USDA `[À VÉRIFIER]`, à reprendre dans le Fichier canadien sur les éléments nutritifs. »

8. Section 5, étape 10, acides gras : « La teneur du suif, de la moelle et des huiles de phoque en ces deux acides n'a été retrouvée dans aucune source officielle `[À VÉRIFIER]`. »

9. Section 6, dernière ligne (moelle) : « **Observation de terrain non sourcée `[À VÉRIFIER]`** »

10. Section 7, avertissement sur le tableau :

   > **Avertissement sur ce tableau.** Aucune page de Santé Canada, du MAPAQ ni de l'INSPQ consultée
   > ne décrit le tableau clinique du mal de caribou. Une seule référence de la littérature évaluée
   > par les pairs a été retrouvée qui nomme des symptômes : au-dessus de 35 % des calories en
   > protéines, Bilsborough et Mann (2006) rapportent **la nausée, la diarrhée, et la mort** —
   > résumé seul, texte intégral non lu `[À VÉRIFIER]`. **Les lignes «diarrhée » et «nausée » sont
   > les seules du tableau qui s'appuient sur autre chose que les récits d'explorateurs et
   > d'expéditions rapportés dans la littérature anthropologique.** Tout le reste est `[À VÉRIFIER]`.

11. Section 8, règle 1 : « **Le délai de «2 à 3 semaines » qui circule n'a été retrouvé dans aucune source lors de la rédaction `[À VÉRIFIER]`.** » — le rappel de CLAUDE.md (mortel en 2 à 3 semaines) reste dans le texte avec son drapeau.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/24-verifications.md`. Tous les drapeaux du chapitre sont levés.

- §3 et tableau « Part des calories » — fourchettes aux deux tables : orignal **0,7 à 3 g / 102 à 124 kcal / 71 à 87 %** ; lièvre 1 à 2,3 g / 95 à 114 / 76 à 90 % (énergie FCÉN incohérente, recalculée aux macros) ; truite mouchetée **2,7 g / 110 / 77 %** (l'ancienne ligne « truite 6,61 g » était un mélange d'espèces) ; omble chevalier 2,65 g / 103 / 76 % ; caribou 2,6 à 3,4 g / 122 à 127 / 71 à 74 % ; éperlan 2,42 g / 97 / 73 % (confirmé) ; ours 4 à 8,3 g / 128 à 161 / **50 à 69 %** ; corégone 3,8 à 5,9 g / 114 à 134 / 57 à 67 % ; castor 4,8 à 5 g / 123 à 146 / 62 à 66 % ; moelle d'orignal **44 g / 441 kcal / 8 %** ; moelle de caribou 83 à 84 g / 782 à 786 / 3 à 4 %. §8 règle 1 : orignal « entre 71 et 87 % ». Étapes 6 à 8 : calcul gardé à 102 kcal (valeur basse, qui creuse le trou), une ligne l'annonce. `sources/24-sante-canada-fcen-gibier-poissons-gras.md` (+ `…-donnees.json`) ; `sources/24-usda-fdc-composition-gibier-et-gras.md`.
- §5 étape 10, tableau des sources de gras — moelle de caribou 83 à 84 g / 782 à 786 kcal ; suif 94 à 100 g / 854 à 902 kcal (confirmé) ; **gras d'orignal cru 91 g / 835 kcal** (ajout) ; huile de phoque 99,6 g et plus / 884 à 899 kcal ; **moelle d'orignal 44 g / 441 kcal** (ajout) ; ours, castor en fourchettes ; truite mouchetée et omble chevalier **2,7 g / 103 à 110 kcal**, retirés des sources de gras. Moelle nécessaire pour 370 g de gras : **440 g de caribou ou 840 g d'orignal** (calcul du livre). Même source. Par conséquence, §9 « Ouvrir les os » : « seule source qui approche les 800 kcal » devenu « celle du caribou approche les 800 kcal ; celle de l'orignal la moitié ».
- §5 étape 2 — froid : ration de référence **3 200 → 4 500 kcal/j** (≈ + 40 %) pour l'homme qui travaille dehors ; ne s'applique pas à qui reste au chaud. `sources/24-nasem-1996-besoins-energetiques-au-froid.md` (+ `24-nasem-1996-rations-par-temps-froid-ch5.html`).
- §5 étape 3 et §8 règle 1 — **25 % des calories, 2 à 2,5 g/kg/j** (confirmé). `sources/24-bilsborough-mann-2006-resume-pubmed.md`.
- §5 étape 5 — **720 à 900 g** (homme) et **590 à 730 g** (femme) de viande par jour (confirmé, arithmétique). Même source ; `sources/24-sante-canada-fcen-gibier-poissons-gras.md`.
- §5 étape 5 — poids des enfants : 17 et 21 kg à moins d'un kilo des médianes à 4 et 6 ans (confirmé) ; adultes : exemples. `sources/24-oms-poids-pour-age-enfants.md`.
- §5 étape 9 et §6 « Eau » — urée : **6 à 10 mL d'eau par gramme de protéine**, soit **1,3 à 1,9 L à 200 g/j** contre 0,4 à 0,6 L pour une ration ordinaire (calcul du livre sur 40 à 60 mL par g d'azote uréique). `sources/24-iom-2005-anref-eau-proteines-uree.md` (+ `24-iom-2005-anref-eau-ch4.html`).
- §6 « Poids corporel » — seuil de perte hebdomadaire introuvable (les seuils publiés visent l'amaigrissement volontaire) : phrase coupée.
- §5 étape 10 « Et pas tout du même animal » — linoléique / α-linolénique par 100 g : suif **3,1 / 0,6 g** ; moelle de caribou **0,6 / 0,3 g** ; gras d'orignal **1,9 / 1,8 g** ; huile de phoque **≈ 0,9 / 0,8 g** ; saindoux **10,2 / 1,0 g**. `sources/24-sante-canada-fcen-gibier-poissons-gras.md` (+ `…-donnees.json`).
- §6 « Aspect de la moelle » et §9 « Ouvrir les os » — saine : blanche, ferme, cireuse ; bête qui maigrit : rouge et ferme ; réserves épuisées : rouge ou jaune, gélatineuse, luisante et mouillée ; os de référence : **le fémur**. L'ordre de vidage « des canons vers les fémurs » est introuvable : coupé. `sources/42-adfg-famine-moelle-osseuse.md` ; `sources/34-purdue-addl-moelle-osseuse.md` ; `sources/24-speth-spielmann-1983-gras-de-fin-d-hiver.md` ; `sources/35b-morin-2022-moelle-des-pattes-caribou.md`.
- §7 avertissement — **> 35 % : nausée, diarrhée, mort** (confirmé). `sources/24-bilsborough-mann-2006-resume-pubmed.md`. Tableau tiré des récits d'expédition (confirmé), « dégoût de la viande » introuvable et coupé, « envie de gras qui ne lâche pas » ajouté ; le mal de tête n'est sourcé que de seconde main. `sources/24-stefansson-1936-delais-mal-de-caribou.md` ; `sources/21-speth-spielmann-1983-stefansson-mal-de-caribou.md` ; `sources/51-mal-de-caribou-signes.md`.
- §8 règle 1 — « 2 à 3 semaines » = délai avant de **tomber malade** sur du caribou encore un peu gras ; **deuxième jour** sur viande tout à fait maigre ; remis sur pied en deux ou trois jours par le gras ; la mort « en **quelques semaines** » (décision prise ; source : « after several weeks »). `sources/24-stefansson-1936-delais-mal-de-caribou.md` ; `sources/21-speth-spielmann-1983-stefansson-mal-de-caribou.md`.
- §9 graisse d'os — rendement introuvable ; phrase gardée sans chiffre, avec le mécanisme (bête de fin d'hiver presque vide, moelle comprise). `sources/24-speth-spielmann-1983-gras-de-fin-d-hiver.md` ; `sources/42-adfg-famine-moelle-osseuse.md`.

## Corrections croisées — 24 septembre 2026

- §3, tableau « Part des calories », ligne du lièvre, et §3 « Et le gibier de la Côte-Nord est
  maigre » — **corrigé** : « Lièvre sauvage | 1 à 2,3 g | 95 à 114 | 76 à 90 % » (76 % = valeur
  américaine, lapin sauvage cru ; 90 % = ligne crue du FCÉN recalculée aux macros, énergie publiée
  incohérente) devient « Lièvre sauvage, cuit | 2,1 g | 140 | **83 %** » ; la phrase du §3 passe à
  « le lièvre sauvage, cuit, 2,1 g de lipides pour 140 kcal » ; la note sous le tableau dit
  « cru, sauf le lièvre, cuit ». Valeur canadienne : lapin sauvage cuit (code 3596), 29,0 g de
  protéines, 2,1 g de lipides, 140 kcal pour 100 g, soit 29,0 × 4 / 140 = 83 %. La ligne crue
  (3595) n'est pas retenue : 64 kcal publiées, sous les 86 kcal des seules protéines. Aucun calcul
  du chapitre ne dépendait du 76 % (les étapes 6 à 8 calculent sur l'orignal).
  `sources/44-sante-canada-fcen-lapin-sauvage.md` (+ JSON) ; vérifications
  `suivi/verifications/44-verifications.md` (ligne 9) et `43b-verifications.md` (ligne 8, note D).

Compression §3 et §4 — 27 septembre 2026 : 1 726 mots → 231 mots ; matériel coupé : chaudron à fond épais, passoire et coton à fromage, pots et bidons à graisse, scie à os ou hachette, gants (tularémie : reste au §8, règle 5, et au §9) ; les deux lignes de réserve (glucides, corps gras) gardées en deux lignes courtes. §3 : coupés le débit d'urée chiffré (reste au §8), les étendues des macronutriments (1 à 3 ans, lipides, glucides, absence d'apport maximal tolérable), la borne des lipides franchie sciemment, *rabbit starvation*, la table « Part des calories venant des protéines, par espèce ». Déplacé au §8, règle 1 : aucune viande du territoire ne passe seule sous le plafond, lièvre, caribou, truite et éperlan dans la fourchette de l'orignal, ours, castor et corégone encore entre 50 et 69 %. Renvois corrigés : §5 étape 3 (« borne haute de l'étendue », définie au seul §3, devient 35 % adulte / 30 % enfant) ; §9 intro (« tableau de la section 4 » devient « section 4 »).
