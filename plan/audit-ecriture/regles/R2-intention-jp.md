# R2 : ce que JP veut vraiment, et ce que nos règles en ont fait (28 octobre 2026)

Mandat : reconstruire l'intention de JP à partir de ses propres mots, plainte par plainte, avec la date ; dire si la
règle qu'on en a tirée est fidèle, trop large ou trop étroite ; finir par ses principes, dans ses mots, pour le nouveau
skill. Aucun fichier existant n'a été modifié.

**Lu.** `plan/decisions-jp.md`, `plan/demandes-jp-epreuve-tome-1.md`, `CLAUDE.md`, `.claude/cadre-agents.md`, les
skills `ecriture`, `editeur` et `langue`, `gabarit-chapitre.md`, la section « PAUSE du 15 octobre » de
`suivi/plan-de-match.md`, des extraits de `suivi/04-redaction.md` (par grep), les mémoires de `_reprise/memoire/`,
l'historique git (les messages, et la recherche `git log -S` pour dater l'arrivée de chaque règle), et R1
(`regles/R1-contradictions.md`), pour ne pas refaire son travail.

**Ce que ces notes ajoutent à R1.** R1 compare nos règles entre elles. Ces notes-ci remontent à la source de chaque
règle, et elles apportent trois choses neuves.

1. **Les marques que JP a laissées au crayon dans le lecteur iPad, le 14 octobre au soir** (base `annotations` de
   l'Artifact de relecture, 19 pages du tome 1). C'est la seule trace de JP qui n'est pas passée par nos mots : ses
   notes tapées, telles quelles, et les passages qu'il a surlignés ou barrés, retrouvés en posant ses traits sur les
   pages de l'édition du 14 octobre. Lecture seule ; les images de travail sont restées hors du dépôt.
2. **L'origine de chaque règle** : le commit qui l'a fait entrer, et la phrase de JP qui l'accompagne, s'il y en a une.
   Plusieurs des règles qui pèsent le plus sur le tempo n'ont aucune phrase de JP derrière elles.
3. **Les textes que JP a choisis ou approuvés** (le ch. 11 qu'il a dit « parfait », les textes des auteurs au dos des
   couvertures), mesurés avec `tempo.py`, comme modèles positifs.

Légende des verdicts : **fidèle** ; **trop large** (la règle coupe plus loin que ce que JP visait) ; **trop étroite**
(la règle ne prend qu'un morceau de ce qu'il demandait) ; **déplacée** (la règle vise autre chose que ce qu'il visait) ;
**pas de JP** (aucune phrase de lui derrière la règle).

---

## 1. Ce que disent les mots de JP, en six constats

1. **JP se plaint de la même chose depuis le premier soir, et il dit chaque fois « la façon ».** Le 14 octobre :
   « Le texte est écrit bizarrement trop AI ». Le 15 : « c'est pas juste les logigrammes, c'est la façon de dire les
   choses ». Le 16 : « c'est la façon que le paragraphe est organisé ». Le 18 : « tu as recommencé à faire des
   tournures de phrase bizarres ». Le 28, quatre fois : « la tournure de phrase […] est fucking weird », « la façon que
   t'écris c'est pas humain », « la façon que tu écris c'est pas bon », puis « le tempo du paragraphe est pas bon, pi
   c'est vrai dans tout le livre ». C'est neuf fois la même plainte, et neuf fois nous avons répondu par des formes à
   bannir : un tableau, une règle de phrase, un motif pour le script, une table de mots. Comme la plainte portait sur
   la façon et la réponse sur des formes, le défaut est revenu sous une autre forme, et JP l'a remarqué lui-même, trois
   fois le même jour : « je croyais te l'avoir dit », « on avait dit plus de phrases de même », « on en avait déjà
   parlé » (16 octobre).

2. **Le 14 octobre, JP a marqué des phrases qui parlent pour parler, jamais une phrase qui explique un geste.** Il a
   surligné la page qui parle d'elle-même, la justification de l'ordre des blocs, les statistiques d'ambiance, les
   chutes (« juste une impression », « La plus courte commande », « pas quand le tuyau siffle ») et l'opposition en
   miroir (« Au village, c'est l'aqueduc qui devient suspect. Au chalet, c'est l'état normal de l'eau du lac. »). Sur
   les mêmes pages, il a laissé sans une marque des phrases qui disent le pourquoi d'un geste avec « parce que » ou
   avec un deux-points de mécanisme (section 2). Le tri qu'il fait passe entre ce qui apprend et ce qui fait joli, pas
   entre le court et le long.

3. **Quand JP parle d'explication, il en demande plus, six fois sur six.** « Je veux qu'on décrive les premiers
   minutes mieux » (14 octobre) ; « explique pourquoi » (16) ; « pas en quelques mots, j'aime ça la version détaillée
   […] c'est la place pour creuser et mettre de l'information » (16) ; « il faut que ça soit mieux expliqué […] faut
   pousser la chose plus loin » (16) ; « Sois plus clair quand tu dis des affaires de même » (16) ; « Faut
   l'expliquer » (28). Il coupe le pourquoi dans un seul cas, quand « on le
   sait » (15 octobre). Quatre de nos règles poussent dans l'autre sens, et aucune ne vient de lui (section 4).

4. **Quand JP demande moins, il coupe des blocs, pas des mots.** « La liste de matériel à chaque chapitre, pas
   essentielle » (27 septembre) ; le 00 « fucking long et mal condensés », puis « juste du repetage » (14 octobre) ;
   « moins de texte » pour les notes vertes (18) ; « personne va lire 50 points de contrôle » (28) ; les pages des
   dangers à « condenser à ce qu'on doit vraiment savoir » (28). L'objet est chaque fois une section, une liste, un
   chapitre ou un détour, et le geste demandé est de choisir ce qui reste. Nos règles ont traduit « condenser » par
   des plafonds de mots et de phrases ; sous un plafond, le rédacteur coupe d'abord ce qui ne porte aucun fait, donc
   les liens (R1, C5). JP n'a jamais demandé un nombre de mots, ni des phrases plus courtes.

5. **Une correction faite par morceaux fabrique la plainte suivante.** La phrase « La règle se brise dans les mêmes
   moments », relevée le 18 octobre, a été corrigée en « On est tenté de mettre la génératrice au garage… » ; JP l'a
   trouvée « fucking weird » le 28 ; la version polie a reçu « un paragraphe de même ça veut rien dire », et le
   paragraphe a été coupé (section 5). La page du monoxyde a suivi le même chemin le même jour (R1, section 2). La
   leçon était écrite depuis le 23 septembre, après que JP a vu 80 planches coupées de trop (« c'est tout ça que je
   veux ») : on applique son principe seulement à ce qu'il visait, et on trouve ce principe en cherchant ce que ses
   exemples ont en commun. Elle vit dans une mémoire de session (`_reprise/memoire/regle-dure-…`) qu'aucun agent ne
   lit.

6. **Le seul conseil de rythme du projet vient de JP, et les textes qu'il a approuvés lient leurs phrases.** Le
   28 octobre, il a donné le texte de l'éditeur : « alterne phrases courtes […] et phrases longues […]. Accorde une
   attention critique à l'euphonie. » Le ch. 11 qu'il a dit « parfait » le 15 octobre au soir a 22,6 % de phrases à
   deux-points et 17,6 % de « fait : conséquence » ; le ch. 3, refait par la chaîne le 28 octobre, en a 37,6 % et
   30,0 %. Les deux textes d'auteurs qu'il a choisis le 19 octobre disent « parce que », « pour eux », « au cas où »,
   et ils finissent sur ce qui compte.

---

## 2. La source primaire : ce que JP a marqué le 14 octobre au soir

Les notes et les traits sont du 14 octobre, entre 19 h 17 et 20 h 17, heure du Québec (champ `maj` de chaque page), sur
l'édition des pages du même jour ; ils ont été appliqués le 15, et le skill les date du 15. Les pages 1 à 26 sont le
chapitre 00 de l'époque (le chapitre principal, coupé depuis) ; les autres pages suivent dans le tome 1. Les notes sont recopiées
telles quelles, fautes comprises.

| Page | Ce que JP a écrit ou fait | Le passage marqué | La famille | Ce que nos règles en ont fait |
| --- | --- | --- | --- | --- |
| 1 | Note : « Ce que j'ai surligneur cet des exemple de texte inutile, je veux pas de fils d'la AI » ; « Dans toute les tomes la mention village esta enlever, baie Comeau est une ville ». Huit traits de surligneur | « Cette page ne suit pas le gabarit du livre. Elle est faite pour être ouverte à la lampe frontale, sans avoir été lue d'avance. » ; « L'ordre des onze blocs est celui de la probabilité réelle, pas celui de la peur. La panne de janvier est en premier parce qu'elle arrive tous les ans […] » ; « Rien ici ne remplace un chapitre. […] c'est la page qui sert le plus tard, et le plus longtemps. » ; toute la colonne « Ordre de grandeur » (« 436 min par client en 2024 », « 13,6 résidences par jour au Québec », « le dernier, et c'est motivé ») | La page qui parle d'elle-même ; la justification de l'ordre ; la statistique d'ambiance | Tableau « Les phrases » du skill : **fidèle**, ce sont ses exemples. « Village » : **fidèle** |
| 2 | Sept traits | « En 2024, le courant a manqué 436 minutes par client alimenté […] c'est exactement la panne pour laquelle ce livre existe. » ; « juste une impression. » ; « La décision se prend pendant qu'il reste de la chaleur dans la maison, pas quand le tuyau siffle. » ; « La plus courte commande. » | La statistique d'ambiance ; la chute ; l'opposition en chute | **Fidèle** |
| 3 | Note : « Changer char Pour auto dans tout les tomes » ; « Le texte est écrit bizarrement trop AI FAUT QUE ÇA SOIT INFORMATIF (tout le livre ». Au stylo, « plus » barré et « pas » écrit au-dessus, dans « C'est la soudure quand il n'y a plus de soudeuse » | Le mot juste : il n'y a **pas** de soudeuse, pas « plus » | Le mot exact | « Char » : **fidèle**. « Écrit bizarrement » n'a été retenu que comme « trop AI » : **trop étroite** (constat 1) |
| 5 | Deux « ? » au stylo, dans la marge | « Redonner de la mordance sous les roues motrices : cendre de poêle, sable, litière, branches de sapin cassées court. Ce qui compte est l'arête à mordre, pas l'épaisseur. […] » ; « Dégonfler pour flotter. Un pneu dégonflé s'écrase et allonge son empreinte : il flotte sur la neige au lieu de creuser. […] » | Le code : un mot qu'on ne dit pas (« mordance »), une formule (« l'arête à mordre », « Dégonfler pour flotter ») | Règle 0, le lendemain : **fidèle**. Le « ? » veut dire « je ne comprends pas », pas « trop long » |
| 6 | Cinq traits | Les statistiques des feux (« En 2025, 527 feux ont été combattus […] », les évacuations de juin 2023) ; « La forme ordinaire, c'est la fumée. Le front, c'est la forme rare et rapide. Les deux ne se jouent pas au même endroit. » ; « C'est un motif de partir que rien de visible ne signale. » | La statistique ; la maxime en miroir ; la chute | **Fidèle** |
| 8 | Note : « Le texte que j'ai surligne c'est exactement ce que je veux pas voir dans le Lisvre c'est inutile ». Un trait | « C'est le scénario du chalet parce que c'est là que sont la scie à chaîne, la hache, l'arme, l'arbre encroué et la glace (ch. 106, ch. 105, ch. 109). » | La justification du cadrage | **Fidèle** |
| 15 | Note : « Répétition avec page precedente » ; « Le 00 est fucking long et mal condensés faut revoir la structure complete » | La redite ; la structure du 00 | La répétition ; la structure | Répétition : **fidèle**. « Mal condensés » visait la structure du chapitre, pas la phrase |
| 18 | Un trait | « Au village, c'est l'aqueduc qui devient suspect. Au chalet, c'est l'état normal de l'eau du lac. » | L'opposition en miroir | « L'opposition fabriquée » : **fidèle** |
| 20 | Barré au stylo | « Rare, mais long : c'est le seul scénario de cette page qui se compte en mois et qui se gagne ou se perd sur la discipline plutôt que sur le matériel. » | La phrase sur la page ; la formule | **Fidèle** |
| 22 | Gribouillé au stylo | « Dernier de la liste, et c'est une position motivée : il n'y a plus de réacteur en exploitation au Québec. […] Le scénario reste dans le livre parce qu'un nuage n'a pas besoin d'avoir été produit ici et parce que la conduite à tenir est contre-intuitive. » | La justification du cadrage | **Fidèle** |
| 24 | Barré au stylo | « C'est la charnière du livre, et elle a son chapitre : ch. 2, Rester ou partir. » | La phrase sur le livre | **Fidèle** |
| 26 | La page entière barrée en X | La page « Quand il n'y a rien » du 00 | Le 00 | Coupé |
| 29, 33 | « Ça ça devrait être la première page » ; « Travail les pictigrammes » | | Mise en pages, pictogrammes | Hors écriture |
| 20, 21 | Cercles et flèches autour des renvois « ch. 28 », « (ch. 112) » | | Probablement la place des renvois dans la page | Hors écriture |
| 35 | Un trait sous « […] ne se dose pas, et une bouteille de trois ans a perdu son titre sans changer d'apparence » | | Sens incertain (le mot « titre » ?) | À ne pas interpréter |
| 67 | « de la Côte-Nord » barré dans « la route de la Côte-Nord ferme » | Le complément que le lecteur sait | Le mot qui décore | « Jusqu'au mot » : **fidèle**, même famille que « de l'automne » |
| 71 | Note : « Finalement après analyse je veux pas le 00 c'est juste du repetage » | | | 00 coupé : **fidèle** |
| 110 | Note : « Je veux qu'on décrive les premiers minutes mieux c'est sur qui existe des guide genre detonation- aller sous sol… etc.. mettre la série en orange pour qu'on saute dessus visuellement si ya une urgence . Fait le pour le très chapitres qui ont des éléments urgents » | | Les premières minutes | Séries orange : **fidèle**. « Décrive mieux » demande plus de description, pas moins |

**Ce que JP n'a pas marqué, sur les mêmes pages.** L'absence de marque n'est pas une approbation, parce que JP n'a pas
tout marqué : « Toute la suite est une soustraction », une formule, est restée sans trait sur la page 2. Mais les
passages laissés propres disent quelque chose, parce qu'ils sont juste à côté de ses marques.

- Page 3, sous sa correction de « plus » : « Des points courts, parce que les câbles et les batteries chauffent vite,
  et une pause entre les points. Un verre de soudeur ou une visière teintée, jamais l'œil nu : l'arc brûle la cornée en
  quelques secondes et la brûlure ne se sent que des heures plus tard, en pleine nuit. » Un « parce que », un
  deux-points de mécanisme, une phrase de 30 mots : aucune marque.
- Page 5, entre ses deux « ? » : « Ça porte sur la neige tassée et ça se coupe sur l'asphalte nu : ça se pose pour
  sortir d'un trou, pas pour faire de la route. » Un contraste qui ajoute un fait : aucune marque.
- Page 6 : « Un chalet chauffé au bois tire son air de combustion de la pièce ou d'une prise extérieure : fermer et
  chauffer en même temps est impossible. » Le mécanisme est resté propre ; seule la phrase suivante, la chute, est
  surlignée.

Sur 22 traits de surligneur et cinq passages barrés, aucun ne tombe sur l'explication d'un geste ou d'un danger. Les
« parce que » qui se trouvent dans un passage marqué (deux à la page 1, deux à la page 22) justifient l'ordre des
blocs ou la présence d'un chapitre dans le livre : c'est le cadrage que JP visait, pas le lien.

---

## 3. Chaque plainte et chaque décision, avec son verdict

### 3.1 Avant la relecture (septembre et avant le 12 octobre)

| Date, où | Les mots de JP | L'intention | La règle qu'on en a tirée | Verdict |
| --- | --- | --- | --- | --- |
| 23 sept., les formulaires | « qui va vraiment utiliser ça ? » ; « C'est pas un magasin de pièces que je run, c'est la fin du monde, je veux de quoi pour survivre. » | Le livre sert à quelqu'un d'épuisé, dans le bois | « Pas de paperasse » (mémoire) ; le test « il n'y a personne à appeler » | **Fidèle.** Le même test vaut pour une phrase : qui va vraiment la lire, et pour quoi faire ? |
| 23 sept., 80 planches coupées de trop | « c'est tout ça que je veux » | Appliquer un principe seulement à ce qu'il visait | Mémoire `regle-dure-pas-de-categories-echappatoires.md` ; rien dans les skills ni dans le cadre | **Trop étroite** : la leçon de méthode la plus utile du projet n'est pas là où les agents la liraient |
| 24 sept., les dessins | « je veux toujours que tu me montres les documents pour validation » ; « les dessins je veux pas de relecture, c'est trop coûteux » ; « c'est moi la relecture » | JP juge lui-même ; pas de boucle de relecture coûteuse sur les dessins | `CLAUDE.md`, l. 239 : « on lui montre l'image ou la page […] sans tour de relecture d'agents de plus » | **Trop large** pour le texte (R1, C13), et dépassée par sa demande du 28 octobre (« en ajoutant des auditeurs ») |
| 27 sept., Matériel et « Pourquoi ça marche » | « la liste de matériel à chaque chapitre, pas essentielle… pourquoi ça marche je veux ça compressé, esti que c'est long pour rien » | Retirer l'inessentiel du Matériel ; raccourcir la section qui expliquait en général | Matériel en lignes de 15 à 20 mots ; la section en trois à cinq phrases | **Fidèle** à l'époque (format montré à JP et validé). La section a sauté le 16 octobre |
| Avant le 12 oct. (`CLAUDE.md` d'origine) | Aucune phrase de JP retrouvée | | Règle 5, « Écrire dense », et « environ 700 mots utiles par page en 8 × 10 » | **Pas de JP.** Une cible de compression (R1, M4) |
| Avant le 12 oct. (`CLAUDE.md` d'origine, auteur non établi) | « Ce n'est pas un manuel de la CNESST. […] Quand tu es dans la marde et que tu n'as rien. » ; « Le monoxyde de carbone n'a ni odeur ni couleur, tu t'endors au lieu de sortir » | Le ton du livre : direct, parlé | Gardé dans `CLAUDE.md` comme le modèle du mécanisme | **Fidèle** pour le ton ; le tutoiement du modèle contredit la règle 6 (R1, C9) |

### 3.2 La relecture au crayon (14 octobre au soir) et la conversation du 15 octobre

| Date, où | Les mots de JP | L'intention | La règle qu'on en a tirée | Verdict |
| --- | --- | --- | --- | --- |
| 14 oct., p. 1 et 8 | « Ce que j'ai surligneur cet des exemple de texte inutile, je veux pas de fils d'la AI » ; « c'est exactement ce que je veux pas voir dans le Lisvre c'est inutile » | Couper ce qui sonne bien et n'apprend rien | `CLAUDE.md`, l. 195, « Informatif partout » ; tableau « Les phrases » du skill | **Fidèle** : les exemples du tableau sont ses surlignages |
| 14 oct., p. 3 | « Le texte est écrit bizarrement trop AI FAUT QUE ÇA SOIT INFORMATIF (tout le livre » | Deux plaintes : la façon (« bizarrement ») et le contenu (« informatif ») | La règle a gardé « informatif » ; « bizarrement » est devenu « trop AI », donc une liste de tics | **Trop étroite.** La moitié « écrit bizarrement » est l'ancêtre de la plainte du tempo |
| 15 oct. ; 14 oct., p. 67 | « "Sans perdre la viande de l'automne" : "de l'automne" est inutile. C'est des mots comme ça qu'il faut éliminer. » ; « de la Côte-Nord » barré | Le complément de lieu ou de saison que le lecteur a déjà | « Jusqu'au mot » ; le complément qui décore ; et la liste « déjà, encore, tout, bien, vraiment… » (skill, l. 202 ; `MOTS_VIDES`) | **Fidèle** pour le complément. **Trop large** pour la liste, entrée à la création du skill (`92edc51d`) sans exemple de JP : elle coupe « encore », « déjà », « tout seul », qui disent un moment ou une quantité (R1, C4) |
| 15 oct. | « Les tournures genre "à attendre un camion qui ne viendra pas", c'est pas beau, c'est inutile, c'est poétique mais dégueulasse. » | Pas de mise en scène dramatique | L'image poétique, la petite scène, la personnification | **Fidèle** |
| 15 oct. | « Sans que ça ait l'air d'un AI qui a écrit. Enlève les […] partout aussi : y a juste les AI qui mettent ça dans des phrases. » (le signe montré est le tiret long) | Enlever une marque d'IA | L'interdiction ; et la liste de remplacement « virgule, deux-points, parenthèses ou point » (`CLAUDE.md`, l. 207) | **Fidèle** pour l'interdiction. La liste est de nous ; le deux-points en deuxième place a nourri une autre marque (R1, C3) |
| 15 oct. | « ni aqueduc, ni égout, ni blablabla, inutile, on le sait. La phrase peut s'arrêter à "les aliments s'appliquent". » | Couper la justification que le lecteur sait | `CLAUDE.md` : « la justification que le lecteur connaît déjà » ; skill, l. 188 : « La justification collée au geste » | **Fidèle** dans `CLAUDE.md`. **Trop large** dans le skill : la ligne, ajoutée le même jour (`d4168c0e`) sans phrase de JP, a perdu la condition « on le sait » |
| 15 oct. | « un tuyau vide ne fend pas » : « no shit, man » | Couper la conséquence évidente | « La conséquence évidente d'un fait qu'on vient de dire » | **Fidèle** |
| 15 oct., ch. 4 | « Ceux qui étaient dehors laissent à la porte la couche du dessus et les chaussures » : « c'est fucking bizarre. Faut plus dire quelque chose comme "Les gens qui étaient à l'extérieur doivent…". Je veux plus voir ça nulle part. » | L'ordre, le sujet et le ton d'une consigne dite à voix haute | Règle 11 | **Fidèle.** Le modèle de JP allonge la phrase pour la rendre claire |
| 15 oct., logigrammes | « Régler dehors : un bol qui revient, du bois de la corde qui se voit » : « personne parle comme ça, c'est fucking pas clair » ; « Refus, il a où aller » : « wtf » ; « c'est pas juste les logigrammes, c'est la façon de dire les choses » | Un texte qui se dit, avec ses articles et ses liens, partout | Règle 0 : chaque phrase lue à voix haute se comprend du premier coup | **Fidèle** dans l'esprit, **trop étroite** dans le test : il porte sur la phrase seule, alors que « la façon de dire les choses » porte sur le texte entier |
| 15 oct. | « Dans les textes, y a beaucoup de répétition aussi, faut slaquer la répétition. » ; p. 15 : « Répétition avec page precedente » | Une idée, une fois | Un fait se dit une fois par chapitre | **Fidèle** |
| 15 oct., ch. 10 | « Je veux pas savoir qu'est-ce qui va pas au feu, je veux savoir c'est quoi qui va au feu. » | Dans une liste, nommer ce qu'on prend | Règle 8, « Dire ce qui marche, pas ce qui ne marche pas » | **Fidèle** pour les listes ; **trop large** quand elle s'étend au fait qui retourne un réflexe (R1, C6). JP lui-même parle ici en contraste |
| 15 oct., logigramme du ch. 4 | « Voir que t'as le temps d'aller chercher la radio de l'auto quand une bombe nucléaire pète. » ; « La bombe vient de tomber, on n'a pas encore de sas, TOUT EST NOUVEAU. » ; « il existe déjà des procédures à faire en cas de bombe ou de retombées » | Écrire pour quelqu'un qui n'a rien préparé, dans l'ordre réel | « Le réel de l'urgence » | **Fidèle** |
| 15 oct., ch. 4 | « source radioactive perdue, ça veut rien dire » ; et le sas qu'on n'a pas encore | Ne pas nommer une chose qu'on n'a pas expliquée, ni une préparation qu'on n'a pas faite | Skill, l. 218 : « Pas de jargon […] : « sas » » | **Trop large** pour « sas » : JP emploie le mot et l'accepte hors des premières minutes (`suivi/04-redaction.md`, l. 253 et 488). Il refusait le sas qu'on n'a pas, pas le mot |
| 15 oct., ch. 4 | « personne a des poules, man » | Écrire pour cette famille-là, avec ce qu'elle a | Skill, l. 220 : « Le mot général quand le détail n'apporte rien : « les animaux » » | **Déplacée** : JP visait un détail faux pour la famille, pas le détail. La règle pousse vers le mot abstrait, alors que toutes ses autres demandes poussent vers le concret |
| 15 oct. | « on est en pleine nuit, on se fait réveiller, oublie ça le thermomètre » ; « Le porter à bras demande 18 à 24 personnes » : « c'est beaucoup de monde » ; « on sort même si c'est une bombe nucléaire ? » ; « Est-ce qu'on a une version de jour, l'été ? » | Jouer la scène réelle ; un chiffre qui s'applique à cette famille ; des consignes qui tiennent ensemble ; l'année entière | Tableau du 15 octobre dans le skill | **Fidèles** (fond plus que style) |
| 15 oct. | « on l'a dit 1000 fois » (le réchaud dans le logigramme) ; « ON LE SAIT, ON L'A DÉJÀ DIT » (le barbecue redit) | Ne pas redire un avertissement | Un avertissement se dit une fois | **Fidèle** ; la frontière avec les rappels qui se répètent reste à tracer (R1, C17) |
| 15 oct. | « je comprends le poteau, c'est en préparation, ça fait du sens » | Une chose préparée s'explique là où elle sert | Tableau du 15 octobre | **Fidèle** |
| 15 oct., ch. 11 | « no shit qu'une procédure de feu de forêt couvre pas un feu de chaudron » ; « quand l'utiliser, c'est juste quand l'utiliser, pas besoin de donner des exemples bidon » | Pas de contre-exemple évident | Gabarit, section 2 ; `CLAUDE.md` | **Fidèle** |
| 15 oct. | « C'est quoi un change par personne ? » ; « seuil » ; « ce que la famille a écrit avant la saison !?!? » | Les mots de tous les jours ; pas de préparation supposée | Tableau du 15 octobre ; cadre | **Fidèle** |
| 15 oct., ch. 11 | « Je comprends pas l'ordre chronologique : 1 h, 15 min, 1 min, mais y a 600 mots pour quand le feu passe. Sois plus logique dans la gestion des temps » | La pastille dit le temps qu'on a | Règle de la pastille (refaite le 16) | **Fidèle** |
| 15 oct. | « mon contexte peut changer, et dans 10 ans je veux que ça soit encore lisible » | Un livre ouvert | « Un livre ouvert, pas centré sur JP » | **Fidèle** |
| 15 oct. au soir, ch. 11 | « c'est parfait, on se garde ça pour samedi » | Le ch. 11 est le modèle | Modèle de la refonte pour la structure (séries, pastilles, planches) ; le ch. 3 devient un deuxième modèle le 16 | **Trop étroite** : la seule approbation de JP sur un chapitre entier n'a jamais servi de référence pour la prose (section 6) |

### 3.3 Le 16 octobre

| Où | Les mots de JP | L'intention | La règle qu'on en a tirée | Verdict |
| --- | --- | --- | --- | --- |
| Section 3 de tous les chapitres | « Pourquoi ça marche » : « c'est une tournure de phrase qui marche pas » ; puis « Comment ça marche, on les enlève toutes finalement. Matériel vient prendre la place, pour tous les chapitres. C'est important de savoir c'est quoi le matériel avant d'avoir le logigramme » | Un ordre de chapitre qui sert | Sept sections ; « un mécanisme qui apprend quelque chose va dans l'étape qu'il explique » | **Fidèle** pour la structure. La façon de coller le mécanisme à l'étape (par un deux-points) est de nous |
| Ch. 3, section 3 | « on dirait que tu parles en paraboles, arrête ça » ; « les mots, proportion et tout, c'est bon, c'est la façon que le paragraphe est organisé. Moins poétique, plus informatif, en gardant un bon français professionnel » | L'organisation du paragraphe ; JP dit que le vocabulaire est bon ; un registre professionnel | Une ligne du tableau, des motifs de mots ; aucune règle de paragraphe | **Trop étroite** (R1, C14). JP a dit en toutes lettres que le problème n'était pas les mots |
| Ch. 13, section 3 | « Une braise devient flamme quand l'air lui arrive sans arrêt, d'où le souffle continu » ; « on avait dit plus de phrases de même ; arrête les tournures de phrase de même » | Partir de ce qu'on fait et de ce qu'on voit | « La loi en formule » ; motifs « d'où », « devient flamme », « part à » dans le script | **Fidèle** pour les exemples ; **trop large** dans le script, qui signale « sans chercher d'où vient le gaz » (R1, C4) |
| Ch. 13 | « les phrases genre "la braise ne sait pas" pis des affaires de même » | Pas de chose qui pense | « La chose qui pense » | **Fidèle** |
| Ch. 11 | « Une décision qui n'a pas été reprise depuis douze heures ne vaut plus » : « inutile, c'est une sorte de tournure que je veux plus dans mon livre » ; « Le deuxième chargement se fait pendant que le chemin se ferme » : « je comprends pas ça ?? Sois plus clair quand tu dis des affaires de même » | Pas de proverbe ; le fait caché se dit en clair | « La maxime » ; la correction donnée dit la cause, en plus de mots | **Fidèle** |
| Ch. 11 | « on comprend que le feu avance vite, la première fois tu le dis dans l'orange ; faut arrêter les répétitions, je croyais te l'avoir dit » | Une idée une fois, même dite autrement | « La répétition se cherche par idée » | **Fidèle** |
| Ch. 3, étape 10 | « on en avait déjà parlé ; parle pas de même, explique pourquoi ; "là où un appel ne passe pas", ça veut rien dire » | Dire le mécanisme | Ligne du tableau ; « toute phrase que JP corrige entre au tableau le jour même » | **Fidèle**, mais annulée par la règle 2 (« la raison seulement si elle change ce qu'on fait ») et par « la justification collée au geste » (R1, C2). Et « entre au tableau » est la méthode qui fabrique des morceaux (section 5) |
| Ch. 3, étape 23 | « c'est vraiment pas clair comment faire la vidange ; quand on a des passages comme ça, il faut que ça soit mieux expliqué, surtout qu'une planche est reliée ; faut pousser la chose plus loin » ; « "son robinet" : le robinet du chauffe-eau » | Plus d'explication : où est la pièce, comment la reconnaître, ce qu'on voit | Les sous-étapes ; on nomme la chose | **Fidèle.** La direction est plus de mots |
| Ch. 3, section 6 | « c'est quoi ça, "carter" ? » | Le mot de tous les jours | Le mot de métier sans besoin | **Fidèle** |
| Ch. 3, section 9 | « on doit le cuire, pas il se cuit ; très important pour le livre » | La consigne dit qui fait le geste | `CLAUDE.md` : « Jamais au pronominal quand quelqu'un fait le geste » | **Fidèle** pour la consigne. Le texte de la règle est assez flou pour couvrir la description, et la table de la règle 15 donne en modèle « le gaz ne se voit pas et ne se sent pas », qui ne vient pas de JP (R1, C9) |
| Ch. 3, sous le titre | « useless comme passage » ; « pour la refonte des autres chapitres aussi » | La note de lieu sort | Cadre | **Fidèle** |
| Partout | « §8, c'est quoi l'affaire avant le 8 ? » | Une notation que le lecteur n'emploie pas | « section 8 » | **Fidèle** |
| Ch. 13, l'orange | « le texte en orange et ses explications, c'est comme doublé, surtout qu'on vient de le dire dans le logigramme ; il faut mettre les deux ensemble et que tout soit dans l'encadré orange » ; « pas en quelques mots, j'aime ça la version détaillée ; la version compacte, on l'a déjà dans l'arbre de décision ; c'est la place pour creuser et mettre de l'information » | Pas de doublon ; de la place pour expliquer | L'encadré orange est la version détaillée | **Fidèle** pour l'orange ; **trop étroite** ailleurs : c'est la déclaration la plus nette de son goût pour l'explication, et nos règles ne l'appliquent qu'à l'encadré orange |
| Le cadre des agents | « ça sert à rien de faire ça si on refait toujours les mêmes erreurs » | Que les corrections tiennent | Le cadre collé à chaque agent | **Fidèle** dans le but. Les corrections y entrent comme des formes interdites, et l'erreur revient sous une autre forme (constat 1) |

### 3.4 Du 18 au 20 octobre

| Date, où | Les mots de JP | L'intention | La règle qu'on en a tirée | Verdict |
| --- | --- | --- | --- | --- |
| 18 oct., pages des dangers | « j'ai l'impression que tu as recommencé à faire des tournures de phrase bizarres » | La même plainte qu'au 14 : la façon | Quatre familles de tournures au tableau et au cadre ; « un éditeur qui n'a pas écrit la page la relit phrase par phrase » | **Trop étroite** pour les tournures : JP a donné une impression générale, et rien ne dit qu'il a pointé chaque exemple du tableau ; la correction de l'un d'eux a produit le paragraphe « On est tenté » (section 5). **Fidèle** pour l'éditeur qui n'a pas écrit, mais annulée deux jours plus tard par « sans tour de relecture d'agents » |
| 18 oct., notes vertes | « moins de texte » ; « des notes laissées doucement dans le texte » | Des notes courtes et discrètes | 30 à 80 mots | **Fidèle** |
| 18 oct., textes du dos | « refais nos textes avec nos règles d'écriture » | | Textes refaits | (contexte de la ligne suivante) |
| 19 oct., textes du dos | « 4 fois Claude en un paragraphe » ; « vit à Baie-Comeau et il aime le bois, c'est dull » ; « il sait que le courant tombera… je l'aime pas » ; « ajoute-toi du texte dans ta description » ; puis le choix de « Le père » et « Le travail » parmi trois versions | Un texte qui présente une personne doit avoir de la vie ; pas de nom en boucle ; pas de scène dramatique (« que personne ne viendra ») | « Un nom ne revient pas à chaque phrase », pour tout le livre | **Trop large** : étendu à toutes les choses, il pousse vers le pronom à chaque phrase (R1, C7). Ce que JP a choisi est un texte lié (section 6) |
| 19 oct., planches | « c'est moi le regard qualité » ; « 4 M de jetons pour 6 planches, sérieusement ? » | Pas de boucle de relecture coûteuse sur les planches | `CLAUDE.md`, le 20 : « l'image ou la page » | **Trop large** (R1, C13) |
| 19 oct., la refonte | « fuck les sources, on a pas déjà fait ce travail-là ? » | Ne pas refaire une vérification faite | Le vérificateur ne revérifie que le neuf | **Fidèle** (hors style). Le même esprit vaut pour ce chantier : garder ce qui marche |
| 20 oct., les jetons | « est-ce qu'il y a une façon de réduire le contexte ? » | Économiser | `CLAUDE.md` allégé (`62c3a564`) | Effet de bord : dans le résumé, « l'opposition fabriquée […] quand elle n'ajoute pas un fait » a perdu sa condition, et « l'image » est devenue « l'image ou la page ». Le texte long reste dans `decisions-jp.md`, qu'aucun agent ne lit. **Trop large par perte de condition** |

### 3.5 L'épreuve du tome 1 (27 et 28 octobre)

| Date, où | Les mots de JP | L'intention | La règle qu'on en a tirée | Verdict |
| --- | --- | --- | --- | --- |
| 27 oct., dédicace | « Faut pu jamais que ça arrive une faute de même. Fais toi un skill de langue française (quebecois) mais français bien parlé c'est degeulasse comme faute page 2 » | Aucune faute ; un français québécois **bien parlé** | Skill `langue` : « le français écrit correct » ; l. 28 : « Le joual et la langue parlée ne s'écrivent pas » | **Fidèle** pour les fautes ; **trop large** pour le registre : JP a dit « bien parlé », la règle bannit « la langue parlée ». Elle devrait bannir le joual et garder le parlé correct (R1, C11) |
| 27 oct. | « le texte dans les livres, c'est pas étiré pour que ça soit égal ? » | Le texte justifié | Mise en pages | **Fidèle** |
| 28 oct. | « Point de contrôle faut que ça soit condensé, personne va lire 50 points de contrôle » ; « Même affaire pour les signes d'échec » | Des tableaux qu'on lit | 5 à 8 lignes | **Fidèle** (le nombre est de nous, et raisonnable) |
| 28 oct. | « Les pages danger on passe trop de temps à tourner autour du pot, sérieux on pourrait mettre minimum 2 dangers par page, pi les condenser à ce qu'on doit vraiment savoir. » | Choisir ce qu'il faut savoir ; deux dangers par page | 150 à 230 mots ; skill `editeur`, l. 48 : « le mécanisme, en deux ou trois phrases » | **Fidèle** pour deux par page. **Trop large** dans la forme : « condenser à ce qu'on doit vraiment savoir » est un tri des faits, et le compte de phrases a comprimé la syntaxe (31 paragraphes sur 36 à deux ou trois phrases, R1 section 2) |
| 28 oct. | « Le chapitre sur quoi acheter je veux pu ça c'est pas dans l'âme du livre » | Le livre sert à faire avec rien | Plus de liste d'achat | **Fidèle** (fond) |
| 28 oct., génératrice | « la tournure de phrase du paragraphe on est tenté… est fucking weird » | Un paragraphe qui ne mène à aucun geste | Règle 12 : « Pas de détour par la tentation ou le sentiment (« on est tenté de », « on a envie de ») » | **Déplacée** : la règle nomme une expression, alors que la phrase suivante de JP montre que le défaut était l'inutilité du paragraphe. Elle interdit « on a envie de », que la règle 15 prescrit (R1, C8) |
| 28 oct., génératrice | « Non mais je veux dire un paragraphe de même ça veut rien dire lol » | Avant de polir, se demander si ça doit exister | Skills `ecriture` et `editeur`, cadre | **Fidèle.** C'est la question la plus utile de toutes, et elle vient en dernier dans la passe |
| 28 oct., ch. 1 | « Les quatre horloges, mais on sait même pas c'est quoi les 4 horloges, c'est quoi ça veut dire ??? Faut l'expliquer. » | Une notion s'explique dès qu'elle paraît | Règle 14 | **Fidèle.** La direction est plus d'explication |
| 28 oct., ch. 1, section 2 | « Les phrases comme "le courant manque et on ne sait pas quand il reviendra" ; "Coupure de courant sans avoir de temps de retour" ; la façon que t'écris c'est pas humain. » | La façon d'écrire, montrée sur un titre | Règle 13 : les titres de situation | **Trop étroite** : la règle vise les titres de la section 2, alors que « la façon que t'écris » vise l'écriture. JP donne sa propre formule comme exemple de ce qu'il dirait, pas comme une forme à copier |
| 28 oct., ch. 1 | « Ça c'est dans panne électricité qu'on devrait le savoir, les chapitres doivent parler de ce qu'ils parlent pas des autres » | Chaque chapitre à son sujet | `CLAUDE.md`, « Le gabarit » ; cadre | **Fidèle** |
| 28 oct., génératrice | « une serre, ou sous un auvent ou une bâche » ; « Et où 2 fois de suite » | Une phrase qu'on suit sans relire | Skill `langue`, section 10 | **Fidèle** ; mais ses remèdes comprennent « à défaut », un mot de livre selon la règle 15, et la série au point-virgule |
| 28 oct., monoxyde | « On a sommeil, qui qui dit ça dans vrai vie, la façon que tu écris c'est pas bon » | La façon d'écrire, montrée sur un mot | Règle 15 (« le mot qu'on dit ») et sa table | **Trop étroite** (R1, C10) |
| 28 oct., le texte de l'éditeur | « Interdiction absolue d'utiliser les tics d'écriture d'IA » ; « Évite les métaphores éculées et les adjectifs grandiloquents ou mélodramatiques » ; « Favorise la concision : coupe le gras, élimine les adverbes inutiles en « -ment » » ; « alterne phrases courtes (percutantes) et phrases longues (rythmées). Accorde une attention critique à l'euphonie » ; « sans jamais dénaturer la voix de l'auteur » | Un éditeur qui a de l'oreille | Skill `editeur` ; son adaptation au livre ne garde que les coupes, et le skill perd tout conflit | **Trop étroite** (R1, C12). Prudence : c'est un texte type que JP a fourni, pas écrit pour ce livre (« haute littérature française », « version plus lyrique »). Ce qui recoupe ses autres mots, c'est l'oreille, le rythme, la concision et la voix |
| 28 oct. | « le tempo du paragraphe est pas bon, pi c'est vrai dans tout le livre » ; « Lance un audit d'écriture de texte, repasse toute nos règle et réécrit le skill en lisant de la litérature et en ajoutant des auditeur. Je veux qu'on reparte sur des bonnes bases. » | Le paragraphe ; des relecteurs qui n'ont pas écrit ; repartir sur des bases saines | Aucune règle encore | À faire |

---

## 4. Les règles qui ne viennent pas de JP

Ces règles sont entrées sans phrase de JP derrière elles. Elles ne sont pas fausses pour autant, mais elles n'ont pas
son autorité : le nouveau skill les garde seulement si la littérature ou la mesure les justifie, et jamais au-dessus
d'une demande de JP.

| La règle | Où | Entrée | La phrase de JP la plus proche | Ce qu'elle fait au texte |
| --- | --- | --- | --- | --- |
| « Une phrase, une information. Deux faits, deux phrases. » | Skill, règle 1 | `92edc51d`, 15 oct. | Aucune | Elle sépare la cause de son effet, et le rédacteur les recolle par un deux-points (R1, C1) |
| « Le fait d'abord, la raison ensuite, et seulement si la raison change ce qu'on fait » | Skill, règle 2 | `92edc51d` | « explique pourquoi » (16 oct.), qui va dans l'autre sens | La raison arrive en queue, après un deux-points, ou elle sort |
| La liste des mots vides (« déjà, encore, tout, bien… ») | Skill, l. 202 ; `MOTS_VIDES` | `92edc51d` | « de l'automne », « de la Côte-Nord » : des compléments, pas des adverbes | « encore », « déjà », « donc » coupés (R1, C4) |
| « C'est… qui / que » de mise en relief | Skill, l. 206 ; `RELIEF` | `92edc51d` | Aucune | « c'est pour ça que » coupé |
| « La justification collée au geste » | Skill, l. 188 | `d4168c0e`, 15 oct. | « on le sait » (une condition que la ligne a perdue) | Le fait qui surprend sort avec le reste |
| La liste de remplacement du tiret | `CLAUDE.md`, l. 207 | `92edc51d` | « Enlève les […] partout » : enlever, pas remplacer | Le deux-points prend la place du tiret (R1, C3) |
| « Écrire dense » ; « environ 700 mots utiles par page » | `CLAUDE.md`, règle 5 ; gabarit ; `roles.md` | Avant le 12 oct. | Aucune trouvée | Une cible de compression |
| « 150 à 230 mots » ; « le mécanisme, en deux ou trois phrases » | `CLAUDE.md` ; skill `editeur`, l. 48 | `e8507d6a`, 28 oct. | « condenser à ce qu'on doit vraiment savoir » | La syntaxe comprimée (R1, section 2) |
| « Le mot général quand le détail n'apporte rien » | Skill, l. 220 | `d4168c0e` | « personne a des poules » (autre chose) | Le mot abstrait |
| « sas » rangé dans le jargon | Skill, l. 218 | `d4168c0e` | JP emploie « sas » | Un mot juste interdit |
| Les quatre dernières lignes de la table « On l'écrit / On le dit » | Skill, l. 163 à 166 | `3b26fb90`, 28 oct. | Aucune : ce sont les morceaux de notre correction du monoxyde | Des modèles de phrase, dont un pronominal |
| « Pas de nom latin » | Cadre, l. 139 | Avant le 12 oct. | Non trouvée | Contredit le gabarit (R1, C18) |
| « Un nom ne revient pas à chaque phrase », étendu aux choses | Cadre ; skill, l. 227 | `e9590a31`, 19 oct. | « 4 fois Claude » : une personne, au dos | Le pronom en tête de chaque phrase |
| Le nombre de mots comme mesure du travail | Skill, l. 373 ; les messages de commit (« 9 165 → 7 565 mots ») | 15 oct. | JP n'a jamais demandé un nombre de mots | Le texte le plus court passe pour le meilleur |

---

## 5. Comment une correction par morceaux a fabriqué la plainte suivante

**La génératrice, en quatre versions.**

1. Avant le 18 octobre (`6f36f8e1`) : « La règle se brise dans les mêmes moments : la panne d'hiver, la nuit, la
   tempête, le soir de l'arrivée au chalet, quand on veut protéger la génératrice de la neige ou des voleurs, ou garder
   le congélateur en marche. Le réflexe est alors de la mettre au garage, dans la remise ou sous l'auvent, porte
   ouverte. »
2. Le 18 octobre, JP : « tu as recommencé à faire des tournures de phrase bizarres ». Le tableau du skill donne la
   correction : « On met la génératrice à l'abri dans les moments où c'est tentant : … ».
3. Le même jour, l'édition des pages (`d9440b56`) : « On est tenté de mettre la génératrice au garage, dans la remise
   ou sous l'auvent, porte ouverte, toujours dans les mêmes moments : la panne d'hiver, la nuit, la tempête, […] ou
   garder le congélateur en marche. »
4. Le 28 octobre, JP : « fucking weird ». La règle 12 entre au skill, le paragraphe est réécrit (`90b0e8e1`), et JP
   répond : « Non mais je veux dire un paragraphe de même ça veut rien dire lol ». Le paragraphe est coupé
   (`3cc726bd`).

Trois versions polies d'un paragraphe qui ne disait rien qu'on doive faire, parce que le danger était dit juste avant.
La question que JP posait dès le 18 (« est-ce que ça sert ? »), nous l'avons posée seulement le 28.

**Le monoxyde** a suivi le même chemin (R1, section 2) : la condensation à deux ou trois phrases, puis « on a
sommeil », puis quatre morceaux de notre propre correction versés dans la table de la règle 15, puis « le tempo du
paragraphe ».

**Ce que ces deux chaînes montrent.** JP corrige un exemple pour montrer un défaut. Quand l'exemple devient la règle
(un mot, une expression, un motif pour le script), on garde l'exemple et on perd le défaut. La règle « toute phrase
que JP corrige entre au tableau le jour même » (skill, l. 338) est juste dans son but et fausse dans sa forme : ce qui
doit entrer, c'est le défaut, la condition et un paragraphe entier corrigé, jamais un morceau à substituer.

---

## 6. Ce que JP a aimé ou choisi

**Le ch. 11, « c'est parfait » (15 octobre au soir).** Mesuré avec `tempo.py` sur la version du soir (`ed85c511`), à
côté du ch. 3 refait le 28 octobre par toute la chaîne :

| | mots / phrase | % de phrases à « : » | % « fait : conséquence » | liaisons parlées / 1000 mots |
| --- | --- | --- | --- | --- |
| Ch. 11 approuvé (`ed85c511`) | 17,2 | 22,6 | 17,6 | 4,9 |
| Ch. 3 refait (28 oct.) | 21,0 | 37,6 | 30,0 | 5,8 |
| Tout le livre aujourd'hui | 18,7 | 31,4 | 23,7 | 5,4 |

Prudence : l'approbation de JP portait aussi sur la structure (les trois séries, les pastilles, les planches). Mais
c'est le seul chapitre entier qu'il a approuvé, et c'est encore aujourd'hui le chapitre du tome 1 qui a le moins de
phrases à deux-points (25,1 %, `mesures.md`).

**Les textes des auteurs (19 octobre).** JP a refusé « Il sait qu'un jour le courant tombera, que la route fermera et
que personne ne viendra » (« je l'aime pas ») et « vit à Baie-Comeau et il aime le bois » (« c'est dull »). Il a
choisi ceci :

> Jean-Philippe vit à Baie-Comeau et il est père de deux enfants. Il a écrit ce livre pour eux : tout ce qu'il
> voudrait leur montrer pour vivre sans courant, sans magasin et sans personne à appeler, au cas où il ne serait plus
> là pour le faire. Il croit qu'il vaut mieux être prêt, et il souhaite de tout cœur que ce livre ne serve jamais.
>
> Claude a fait la recherche, a écrit les chapitres et a dessiné les planches. Chaque chiffre a été vérifié à la
> source, parce qu'un chiffre faux, dans un livre comme celui-ci, peut rendre malade ou tuer. Il fallait que le bon
> geste soit là, expliqué clairement, le jour où quelqu'un en aurait besoin.

Six phrases, une seule avec un deux-points (le script la compte en « fait : conséquence », mais ce deux-points annonce
ce que contient le livre), 8,5 mots de liaison pour 1000 mots (l'échantillon est minuscule ; c'est un indice, pas une mesure). On y voit la cause dite par
« parce que », le but par « pour », une phrase courte suivie d'une longue qui déroule, et chaque texte qui finit sur
ce qui compte. C'est un texte qui présente des personnes, pas une procédure : il ne sert pas de modèle d'étape, il
sert de modèle d'oreille.

**Ses propres réécritures.** « Les gens qui étaient à l'extérieur doivent… » (15 octobre), « Coupure de courant sans
avoir de temps de retour » (28 octobre), « le robinet du chauffe-eau » (16 octobre). Chaque fois, JP réécrit en
ajoutant les mots qui nomment et qui disent qui fait quoi ; il n'a jamais réécrit en enlevant un lien.

**Les passages laissés propres le 14 octobre** (section 2) : le pourquoi d'un geste dit avec « parce que » ou avec un
mécanisme, une phrase de 30 mots, un contraste qui apprend quelque chose.

---

## 7. Les principes de JP, dans ses mots, à garder dans le nouveau skill

Chaque principe garde la phrase de JP, sa date, ce qu'il veut dire, et la condition qui l'empêche de couper trop loin.

1. **« Faut que ça soit informatif »** (14 octobre). Chaque phrase apprend quelque chose à quelqu'un qui doit agir.
   Condition : un mot de liaison, un « parce que », un « encore » qui dit le moment n'est pas du remplissage. Ce qui
   sort, ce sont les familles qu'il a surlignées.
2. **« Je veux pas de fils d'la AI »** (14 octobre). Ce qu'il a surligné : la phrase qui parle du livre ou de la page,
   la justification de l'ordre ou du cadrage, la statistique d'ambiance, la chute, l'opposition en miroir ; et, le
   lendemain, la scène poétique (« c'est poétique mais dégueulasse ») et le tiret (« y a juste les AI qui mettent ça
   dans des phrases »).
3. **« c'est la façon de dire les choses »** ; **« personne parle comme ça »** (15 octobre). On écrit comme on
   l'expliquerait à quelqu'un. Condition : ça se juge sur le texte entier, lu d'un trait, pas phrase par phrase.
4. **« c'est la façon que le paragraphe est organisé. Moins poétique, plus informatif, en gardant un bon français
   professionnel »** (16 octobre). Le paragraphe a un ordre et des liens. Les mots techniques justes restent (« les
   mots, proportion et tout, c'est bon »).
5. **« le tempo du paragraphe est pas bon »** (28 octobre). Le paragraphe se lit d'un souffle : ses phrases se suivent,
   se tiennent et varient.
6. **« explique pourquoi »** (16 octobre) ; **« faut pousser la chose plus loin »** (16) ; **« Faut l'expliquer »**
   (28). Le pourquoi est le cœur du livre. Condition : on le coupe seulement quand le lecteur le sait déjà.
7. **« pas en quelques mots, j'aime ça la version détaillée […] c'est la place pour creuser et mettre de
   l'information »** (16 octobre). Une explication a la place qu'il lui faut.
8. **« inutile, on le sait »** ; **« no shit »** (15 octobre). On coupe ce que le lecteur sait déjà et la conséquence
   évidente de ce qu'on vient de dire.
9. **« faut slaquer la répétition »** (15 octobre) ; **« on comprend que le feu avance vite, la première fois tu le
   dis »** (16) ; **« ON LE SAIT, ON L'A DÉJÀ DIT »** (15). Une idée se dit une fois, à l'endroit où elle sert.
10. **« un paragraphe de même ça veut rien dire »** (28 octobre). Avant de réécrire, on se demande si le passage doit
    exister.
11. **« les condenser à ce qu'on doit vraiment savoir »** ; **« personne va lire 50 points de contrôle »** (28
    octobre) ; **« c'est long pour rien »** (27 septembre). Condenser, c'est choisir ce qui reste, pas comprimer ce qui
    reste.
12. **« on doit le cuire, pas il se cuit ; très important pour le livre »** (16 octobre). La consigne dit qui fait le
    geste.
13. **« Les gens qui étaient à l'extérieur doivent… »** (15 octobre). Le sujet se nomme, l'ordre est naturel, la
    consigne se dit comme une consigne.
14. **« On a sommeil, qui qui dit ça dans vrai vie »** (28 octobre) ; **« c'est quoi ça, "carter" ? »** (16) ;
    **« C'est quoi un change par personne ? »** (15) ; **« français bien parlé »** (27). Le mot qu'on dit, en
    français québécois correct ; pas de joual, et pas de mot de livre.
15. **« Je veux pas savoir qu'est-ce qui va pas au feu, je veux savoir c'est quoi qui va au feu »** (15 octobre). Dans
    une liste, on nomme ce qui marche. Condition : le fait qui retourne un réflexe reste, avec son « mais ».
16. **« on dirait que tu parles en paraboles »** (16) ; **« la braise ne sait pas »** (16) ; **« une sorte de tournure
    que je veux plus dans mon livre »** (16, la maxime) ; **« Sois plus clair quand tu dis des affaires de même »**
    (16). Pas de proverbe ni de chose qui pense ; le fait caché derrière la formule se dit en clair.
17. **« TOUT EST NOUVEAU »** ; **« oublie ça le thermomètre »** (15 octobre). L'urgence s'écrit pour quelqu'un qui n'a
    rien préparé, dans l'ordre où les choses arrivent.
18. **« quand l'utiliser, c'est juste quand l'utiliser »** (15 octobre) ; **« c'est pas humain »** (28). Une section
    fait son travail et rien d'autre ; un titre se dit comme on l'écrirait à la main sur une fiche.
19. **« les chapitres doivent parler de ce qu'ils parlent, pas des autres »** (28 octobre).
20. **« mon contexte peut changer, et dans 10 ans je veux que ça soit encore lisible »** (15 octobre).
21. **« alterne phrases courtes […] et phrases longues […]. Accorde une attention critique à l'euphonie »** ;
    **« sans jamais dénaturer la voix de l'auteur »** (28 octobre, le texte de l'éditeur qu'il a donné). L'oreille juge.
22. **« Faut pu jamais que ça arrive une faute de même »** (27 octobre). Aucune faute dans ce qui s'imprime.
23. **« ça sert à rien de faire ça si on refait toujours les mêmes erreurs »** (16 octobre) ; **« je croyais te l'avoir
    dit »** (16). Une correction doit empêcher le défaut, pas seulement la phrase. Avec la leçon du 23 septembre : on
    applique un principe seulement à ce qu'il visait.
24. **« c'est moi le regard qualité »** (19 octobre) ; **« en ajoutant des auditeurs »** (28). JP juge en dernier ; des
    auditeurs qui n'ont pas écrit la page passent avant lui, un seul tour, à un coût qu'on lui dit d'avance (« 4 M de
    jetons pour 6 planches, sérieusement ? »).
25. **« qui va vraiment utiliser ça ? »** (23 septembre). Le test de tout ce qui s'imprime.

**Un essai, pour montrer ces principes sur le paragraphe du monoxyde** (mêmes faits, rien d'ajouté ; il rejoint celui
de R1, section 7). Aujourd'hui :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus
> quand on ferme presque l'entrée d'air pour la nuit. Le gaz ne se voit pas et ne se sent pas. Il prend la place de
> l'oxygène dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans toute la pièce,
> jusqu'au plancher : se coucher par terre ne protège pas.

Avec les principes 3, 5, 6 et 14 :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait encore
> plus la nuit, quand on ferme presque l'entrée d'air. Ce gaz-là, on ne le voit pas et on ne le sent pas. Il prend la
> place de l'oxygène dans le sang, et c'est pour ça qu'on s'endort sans s'en rendre compte, au lieu de sortir. Se
> coucher par terre ne protège pas, parce qu'il se répand dans toute la pièce, jusqu'au plancher.

Ce qui change : le pourquoi est dit par « c'est pour ça que » et « parce que » (principe 6) ; la personne qui voit et
qui sent est le sujet (principe 12, lu avec R1, C9) ; le tour « Ce gaz-là, on… » est du français parlé correct
(principe 14) ; le fait qui retourne le réflexe (se coucher par terre) arrive en tête de sa phrase, et sa cause vient
après (principe 15) ; aucune phrase ne commence comme la précédente (principe 5). `tempo.py` sur les deux versions :
84 mots contre 77 ; aucun deux-points contre deux ; 11,9 mots de liaison pour 1000 contre 0 ; « même début » à 0 %
contre 66,7 %. La variation des longueurs baisse un peu (0,32 contre 0,38) : l'essai lie mieux, il ne varie pas
mieux, et c'est le point qu'un auditeur du souffle relèverait.

Un fait a disparu à la condensation du 28 octobre et mérite d'être regardé par le vérificateur : « On ne suffoque pas
et on ne tousse pas » (version `e8a62b2a`), qui disait pourquoi on ne sort pas (on attend d'étouffer, et ça ne vient
pas). Il est sourcé dans la version d'avant ; il n'est pas dans l'essai, qui n'ajoute rien.

---

## 8. Ce que le nouveau skill doit en faire

1. **En tête, l'intention de JP en trois de ses phrases** : « Faut que ça soit informatif », « c'est la façon de dire
   les choses », « le tempo du paragraphe ». Tout le reste en découle.
2. **Chaque règle porte la phrase de JP, sa date et sa condition** (ce qu'elle ne vise pas). Une règle sans phrase de
   JP le dit, et dit d'où elle vient (la littérature, la mesure) ; elle ne passe jamais devant une demande de JP.
3. **Le pourquoi devient une règle positive**, avec ses formes parlées (« parce que », « c'est pour ça que », « donc »,
   « sinon », « pour ») et sa seule exception (« on le sait »). Les règles 1 et 2, la « justification collée au geste »
   et la liste des mots vides se réécrivent en conséquence (section 4).
4. **Une section sur le paragraphe**, avant les listes : l'ordre de ce qui arrive à la personne, le lien d'une phrase à
   l'autre, les longueurs qui varient, l'oreille sur le paragraphe entier (principes 3 à 5 et 21).
5. **« Condenser » veut dire choisir** : on retire un fait de moindre poids, un exemple, une section, jamais un lien.
   Plus de compte de phrases ; le nombre de mots n'est plus une mesure de réussite.
6. **Le registre des corrections de JP** garde le défaut, la condition et un paragraphe entier corrigé, avec la
   citation et la date ; jamais un morceau à substituer. La table « On l'écrit / On le dit » devient une liste
   d'écoute pour l'auditeur des mots, sans les lignes tirées de notre propre correction.
7. **La leçon du 23 septembre entre dans le skill** : avant d'étendre une correction, reprendre les exemples exacts de
   JP et chercher ce qu'ils ont en commun ; si la règle touche des phrases qui ne leur ressemblent pas, elle est trop
   large.
8. **Un auditeur de l'intention**, à côté de ceux que R1 propose. Il n'a pas écrit la page, ne réécrit rien, et pose
   à chaque coupe et à chaque paragraphe trois questions de JP : est-ce que ça doit exister (« ça veut rien dire ») ?
   est-ce que le pourquoi est là quand on ne le sait pas (« explique pourquoi ») ? est-ce que ça se dit (« qui qui dit
   ça dans vrai vie ») ? Il rend cinq points au plus.
9. **Les modèles positifs** : la version du ch. 11 que JP a approuvée et les textes des auteurs qu'il a choisis, avec
   leurs mesures, à côté des exemples de ce qui sort.
10. **Les règles d'origine** se corrigent à la source : `CLAUDE.md` remet les conditions perdues le 20 octobre
    (« quand elle n'ajoute pas un fait » ; « l'image », pas « la page ») ; le skill `langue` écrit « le joual ne
    s'écrit pas », pas « la langue parlée » ; la ligne « sas » et la ligne « le mot général » sortent ou se
    réécrivent.

---

## 9. Liste de contrôle (ma partie du cadre)

Pour tout agent
- [x] `CLAUDE.md` pris comme règle première, sans le relire.
- [x] Les skills de ma partie lus au complet, avec leurs tableaux (`ecriture`, `editeur`, `langue` en partie).
- [x] Règle 1 : aucun chiffre neuf ; les chiffres cités sont des mesures de `tempo.py`, des comptes faits sur le dépôt
  ou sur les annotations, avec leur méthode.
- [x] Rien commité ; aucun fichier existant modifié ; la base de l'Artifact de relecture lue sans écrire.
- [x] Lu seulement ce que la tâche touche : grep et extraits ; les pages de l'édition du 14 octobre recadrées sur les
  marques de JP, sans ouvrir les tomes.
- [x] Sorties de commande coupées.

Le texte (pour les réécritures de ces notes)
- [x] Règle 0 : l'essai lu à voix haute.
- [x] Pas de loi en formule, pas de « d'où », pas de chose qui pense.
- [x] Pas de maxime, de chute, d'opposition fabriquée, d'image.
- [x] Consigne jamais au pronominal ; sujet nommé ; ordre naturel.
- [x] Le mot qu'on dit, en français correct, sans joual (« ce gaz-là », « c'est pour ça que »).
- [x] Aucun tiret long ni moyen dans mes phrases ni dans l'essai ; dans les citations de JP, le tiret qu'il montrait
  est remplacé par « […] ».
- [x] Aucun fait ni chiffre neuf dans l'essai (vérifié phrase par phrase contre la page imprimée).
- [ ] `controle.py` sur l'essai : non passé (ce sont des notes, pas une page du livre).

La langue
- [x] L'essai et mes phrases relus pour le subjonctif, les accords, les participes, les homophones et les « ou »
  répétés ; les citations de JP gardent ses fautes, telles qu'il les a tapées.
- [ ] `langue.py` avec LanguageTool : non passé sur ces notes (elles ne s'impriment pas).
