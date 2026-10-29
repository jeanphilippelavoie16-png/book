# Audit de l'écriture : la voix, lot A (tome 1 refait)

28 octobre 2026. Un seul regard : **la voix**, le mot qu'on dit contre le mot qu'on écrit. Le registre visé : un
Québécois qui explique à son voisin, en français correct (ni joual, ni mot de livre). Lot lu au complet :
`chapitres/01-les-quatre-horloges.md`, `chapitres/03-panne-majeure-d-hydro-en.md`, `dangers/partie-1.md`,
`dangers/partie-2.md`. Aucun fichier du livre n'est touché ; les réécritures ci-dessous n'ajoutent aucun fait ni
chiffre, et elles ont passé `controle.py` (0 tiret) et `langue.py` (les avis restants sont jugés plus bas).

Ce que je ne juge pas ici : le tempo et le moule « fait : conséquence » (voir `tempo-A.md`), la longueur, la
répétition, l'exactitude des faits.

## 1. Les mesures

`tempo.py --par-fichier` sur le lot :

| texte | mots | phr. | m/phr | « : » % | fait:csq % | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01-les-quatre-horloges.md | 1337 | 77 | 17,4 | 33,8 | 27,3 | 3,7 | 5,3 |
| 03-panne-majeure-d-hydro-en.md | 7757 | 370 | 21,0 | 37,6 | 30,0 | 5,8 | 5,7 |
| partie-1.md | 4305 | 261 | 16,5 | 22,6 | 19,2 | 4,2 | 3,5 |
| partie-2.md | 4101 | 237 | 17,3 | 18,1 | 16,0 | 5,9 | 6,4 |
| ENSEMBLE | 17500 | 945 | 18,5 | 28,3 | 23,3 | 5,3 | 5,2 |

Les petits mots de la parole, comptés au `grep` sur les quatre fichiers (environ 17 500 mots) :

| mot | ch. 1 | ch. 3 | partie-1 | partie-2 | lot |
| --- | --- | --- | --- | --- | --- |
| « : » (deux-points dans une phrase) | 31 | 140 | 58 | 52 | **281** |
| « parce que » | 1 | 3 | 1 | 0 | **5** |
| « donc » | 0 | 3 | 0 | 2 | 5 |
| « alors » (avec « alors que ») | 1 | 5 | 1 | 1 | 8 |
| « ça » | 2 | 2 | 3 | 0 | **7** |
| « c'est » | 1 | 5 | 4 | 1 | **11** |

« Ça » et « c'est » sont parmi les mots les plus fréquents du français qu'on parle ; ici, on en trouve un pour
1 500 mots. `controle.py`, section « Mots de livre » : **0 avis** sur les quatre fichiers. L'outil ne voit pas le
problème : les mots de sa liste ont été chassés le 28 octobre, et ce qui reste est dans la **tournure**, pas dans le mot.

## 2. Ce que j'entends dans ces pages

Le vocabulaire est presque partout celui de tous les jours (« le mal de tête passe dehors », « avec ce qui traîne »,
« au complet »). Ce qui sonne écrit, c'est la façon de **monter la phrase** : le participe ou l'adjectif détaché en
tête au lieu du « si » qu'on dirait (« Fermé, le réfrigérateur… ») ; le nom d'action au lieu du verbe (« à chaque
ouverture ») ; l'infinitif en sujet, comme dans un manuel de physique (« se coucher par terre ne protège pas ») ; la
formule recopiée d'une fiche officielle (« s'il n'y a aucun signe de détérioration ») ; la phrase sans verbe dans
les signes à reconnaître ; et l'absence quasi totale de « ça », « c'est », « parce que ». Une phrase à la fois, presque
tout est correct ; mis bout à bout, c'est un texte qu'on lit et qu'on n'entend pas. C'est exactement ce que JP
décrit : « la façon que tu écris c'est pas bon ».

## 3. Les défauts, du plus grave au moins grave

### Motif 1. Le participe ou l'adjectif détaché en tête, à la place du « si » qu'on dirait (haute)

**Ce que c'est.** La phrase commence par un participe ou un adjectif détaché par une virgule (« Fermé, », « Porte
fermée, », « coupée, », « porté dehors, ») qui porte une condition. À voix haute, personne ne dit « Fermé, le frigo
garde le froid » : on dit « Si on ne l'ouvre pas ». Le lecteur doit deviner que le participe veut dire « si » ou
« quand », et qui fait le geste. Le guide de radio cité en L2 le dit : « On ne dirait jamais "D'un naturel plutôt
réservé, Mohammed préfère se taire". On ne parle pas comme ça. »

**Fréquence.** 21 relevés à la lecture (ch. 1 : 3 ; ch. 3 : 8 ; partie-1 : 6 ; partie-2 : 4). Autres cas : ch. 3,
l. 153 « pris dans la neige, il renvoie les gaz » ; l. 519 « déchargée, elle gèle » ; partie-1, l. 147 « gelée, elle
peut exploser » ; partie-2, l. 152 « mangée seule, aucune ne passe » ; l. 185 « écrasée, elle libère du cyanure ».

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 1, l. 63 | « Fermé, le réfrigérateur garde les aliments froids 4 à 6 heures » | « Si on ne l'ouvre pas, le réfrigérateur garde les aliments froids 4 à 6 heures » |
| ch. 3, l. 237 | « Porte fermée, il garde le froid 4 à 6 h, s'il était tenu entre 0 °C et 4 °C. » | « Si on n'ouvre pas la porte, il garde le froid 4 à 6 h, à condition qu'il ait été entre 0 °C et 4 °C avant la panne. » |
| partie-1, l. 167 | « coupée, elle vide le corps de son sang en quelques minutes » | « si elle est coupée, on perd tout son sang en quelques minutes » |
| partie-1, l. 66 | « porté dehors, il peut se renverser sur les jambes » | « si on le porte dehors, il peut se renverser sur les jambes » |
| ch. 3, l. 446 | « jetée au pied du mur, elle revient par le même chemin » | « si on la jette au pied du mur, elle revient par le même chemin » |
| ch. 1, l. 34 | « relevé chaque heure, il dit si la pièce chauffée tiendra jusqu'au matin » | « en le lisant chaque heure, on voit si la pièce chauffée va rester assez chaude jusqu'au matin » |

**Cause.** Une habitude d'écriture que les règles encouragent sans le vouloir. Le « format validé » du Matériel dans
`gabarit-chapitre.md` (l. 50 et 51) donne le modèle : « Dosé selon l'emballage. », et la limite de « 15 à 20 mots »
par ligne pousse à gagner le « si on » ; la règle 5 de `CLAUDE.md`, « **Écrire dense** », et les « 150 à 230 mots par
danger » du skill `editeur` font le reste. La règle 0 du skill `ecriture` ne nomme que le « participe en chaîne »
(« Couché, vêtements mouillés retirés… »), pas le participe seul en tête. L5 (P6) cite l'étude qui mesure chez les
modèles de langue « les propositions participes présentes à un taux de 2 à 5 fois celui des textes humains ».

Un participe court reste quand il se dit bien (« trop longue, elle fume noir », ch. 3, l. 551) : le test est la
voix haute, pas la grammaire.

### Motif 2. Le nom d'action à la place du verbe (haute)

**Ce que c'est.** Un nom tiré d'un verbe (l'ouverture, le retour, l'ébullition, le lavage, le hachage, le dégel, le
titubement) tient la place de la phrase que tout le monde dirait (« quand on ouvre », « quand le courant revient »,
« quand on la fait bouillir »). Le geste perd son sujet, et le lecteur doit refaire la phrase dans sa tête.

**Fréquence.** Au moins 19 dans le lot, dont 14 dans le ch. 3 seul (« à chaque ouverture », « à la première
ouverture », « à chaque démarrage », « à chaque rallumage », « au retour du courant », « à l'allumage », « après le
début de la panne », « pendant l'absence », « le dégel a été partiel », « la cause du doute »). Ailleurs : partie-1,
l. 176 « malgré la pression » ; ch. 1, l. 77 « Refaire le classement » et l. 119 « Les trois autres lectures se font ».

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 3, l. 57 | « chaque ouverture fait entrer de l'air chaud » | « chaque fois qu'on les ouvre, de l'air chaud entre » |
| ch. 3, l. 461 | « On enlève cet isolant au retour du courant : sinon, le compresseur repart sans pouvoir évacuer sa chaleur, et il surchauffe. » | « Quand le courant revient, on enlève tout ça : sinon, le compresseur repart, sa chaleur ne peut pas sortir, et il surchauffe. » |
| ch. 3, l. 278 | « le hachage a mêlé la surface de la viande à toute la masse » | « en hachant la viande, on a mêlé ce qui était à sa surface avec tout le reste » |
| partie-2, l. 198 | « L'ébullition n'enlève pas le plomb. » | « Le plomb reste dans l'eau même quand on la fait bouillir. » |
| partie-2, l. 202 | « le lavage ne les enlève pas des petits fruits ni des légumes » | « on ne les enlève pas en lavant les petits fruits et les légumes » |
| partie-2, l. 32 | « chez lui, on se fie à la bave, au titubement et à l'agressivité » | « chez lui, on regarde s'il bave, s'il titube et s'il est agressif » |

**Cause.** La règle 5 de `CLAUDE.md` (« **Écrire dense** ») et la compression des pages des dangers (skill `editeur`,
« 150 à 230 mots par danger ») : le nom d'action est le moyen le plus court de tasser un « quand on… ». L5 (P6) : les
modèles de langue emploient « les nominalisations à 1,5 à 2 fois » le taux humain, et ce style est « déroutant (par
exemple, dans un texte d'instructions) ». Aucune règle ni aucun outil ne nomme ce défaut ; la règle 7 du skill
(« La voix active, un sujet concret ») ne vise que le passif.

### Motif 3. L'infinitif ou le nom abstrait en sujet : la phrase de manuel de physique (haute)

**Ce que c'est.** Le sujet de la phrase est un geste à l'infinitif ou une notion (« Faire tourner le congélateur…
dépense », « Respirer du chlore… peut couper le souffle », « se coucher par terre ne protège pas »). C'est la phrase
d'un manuel scolaire : elle énonce une loi au lieu de dire à quelqu'un ce qui arrive quand il fait le geste. À voix
haute, on met la personne devant : « Quand on…, on… », « Une personne qui… », « Si on…, ça… ». Le paragraphe du
monoxyde que JP a lu finit sur ce tour.

**Fréquence.** 10 dans le lot : ch. 1, l. 72 (deux fois dans la phrase) ; ch. 3, l. 116 « vidanger la plomberie
[…] coûte moins de bois que de chauffer », l. 287, l. 607 ; partie-1, l. 3, l. 105 « ouvrir ne suffit souvent pas »,
l. 114, l. 125, l. 180.

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 1, l. 72 | « Faire tourner le congélateur à la génératrice dépense le carburant de l'horloge 4 pour sauver l'horloge 3 ; faire bouillir l'eau ou fondre la neige dépense le bois de l'horloge 4 pour l'horloge 2. » | « Quand on fait tourner le congélateur sur la génératrice, on brûle le carburant de l'horloge 4 pour sauver l'horloge 3 ; quand on fait bouillir l'eau ou fondre la neige, on brûle le bois de l'horloge 4 pour l'horloge 2. » |
| partie-1, l. 125 | « Souder, meuler ou chauffer du métal peint ou galvanisé donne la fièvre des fondeurs » | « Quand on soude, qu'on meule ou qu'on chauffe du métal peint ou galvanisé, on attrape la fièvre des fondeurs » |
| partie-1, l. 114 | « Respirer du chlore, de la poudre de chaux ou de soude peut couper le souffle jusqu'à 48 h plus tard, même si la personne va bien le soir même. » | « Une personne qui a respiré du chlore, de la poudre de chaux ou de soude peut manquer de souffle jusqu'à 48 h plus tard, même si elle va bien le soir même. » |
| partie-1, l. 180 | « Faire respirer la vapeur d'un bol d'eau bouillante à un enfant n'aide pas son rhume et peut l'ébouillanter » | « Si on fait respirer la vapeur d'un bol d'eau bouillante à un enfant, ça n'aide pas son rhume, et on peut l'ébouillanter » |
| ch. 3, l. 607 | « Faire fondre 1 kg de glace demande autant de chaleur que réchauffer 1 kg d'eau de 0 à 80 °C » | « Il faut autant de chaleur pour faire fondre 1 kg de glace que pour réchauffer 1 kg d'eau de 0 à 80 °C » |
| ch. 3, l. 287 | « Pour l'insuline ou un médicament qu'on ne peut pas interrompre, s'en passer est aussi un danger (ch. 32). » | « Pour l'insuline ou un médicament qu'on ne peut pas arrêter, s'en passer, c'est dangereux aussi (ch. 32). » |

**Cause.** Aucune règle ne le nomme. Le modèle de correction que JP a accepté pour le vocabulaire au ch. 3 (skill
`ecriture`, tableau du 15 octobre, l. 335 : « La perte de chaleur d'une maison est proportionnelle à l'écart… ») a
un nom abstrait pour sujet ; il est donné comme exemple à suivre, et les agents en copient la forme en plus du
registre. JP avait dit : « les mots, proportion et tout, c'est bon, c'est la façon que le paragraphe est organisé » ;
le mot technique reste, la loi en sujet n'a pas à suivre.

### Motif 4. La tournure d'institution recopiée de la source (haute)

**Ce que c'est.** Une formule de fiche officielle (MAPAQ, Santé Canada, CNESST, Bell) passe telle quelle dans le
livre : « aucun signe de détérioration », « le service téléphonique est interrompu », « un local aéré », « d'origine
inconnue », « au contact des aliments », « toute trace du produit », « Il n'existe aucune température reconnue ».
Le fait est juste ; la voix est celle d'un ministère. C'est la forme exacte de ce que JP appelle « pas humain ».

**Fréquence.** Environ 18 dans le lot. Autres cas : ch. 1, l. 57 « le risque est minimal » ; ch. 3, l. 100 « dont
on connaît la provenance », l. 453 « Remplacer la règle des 4 °C par celle du temps, plus sévère », l. 570 « Pour
rétablir les communications » ; partie-1, l. 52 « dans un local aéré », l. 53 « enlever toute trace du produit » ;
partie-2, l. 152 « la part de protéines recommandée », l. 165 « La limite publiée », l. 190 « On ne connaît aucune
quantité sans effet ».

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 3, l. 241 | « s'il n'y a aucun signe de détérioration » | « s'ils n'ont pas l'air gâtés » |
| ch. 3, l. 94 | « il peut passer quand les appels saturent le réseau, ou quand le service téléphonique est interrompu » | « il peut passer quand le réseau est plein d'appels, ou quand on n'arrive plus à téléphoner » |
| partie-1, l. 50 | « Dans un local qui sent l'essence ou le propane » | « Dans un endroit fermé qui sent l'essence ou le propane » (et l. 52, « dans une pièce où l'air circule ») |
| partie-1, l. 131 | « ni le bois de démolition d'origine inconnue. Ne pas les mettre au compost, en paillis ou au contact des aliments. » | « ni le bois de démolition dont on ne sait pas d'où il vient. Ne pas s'en servir non plus pour le compost, le paillis ou ce qui touche la nourriture. » |
| ch. 1, l. 58 | « Il n'existe aucune température reconnue à partir de laquelle il faut partir : la famille en décide avec le ch. 2. » | « Il n'y a pas de température reconnue où il faut partir : c'est à la famille de décider, avec le ch. 2. » |
| ch. 3, l. 461 | « un appareil arrêté n'a besoin d'aucune ventilation » | « tant qu'il est arrêté, il n'a pas besoin d'air autour » |

**Cause.** La règle 2 de `CLAUDE.md` (les sources officielles priment, on enregistre la page) met la fiche officielle
sous les yeux du rédacteur au moment d'écrire. La règle qui devait l'en protéger existe, sans outil :
`.claude/cadre-agents.md`, l. 21, « La source sert à vérifier un fait, jamais à copier une forme. » La table de la
règle 15 et la liste `LIVRESQUE` de `controle.py` relèvent des mots seuls (« impropre à », « à défaut ») ; une
formule entière (« aucun signe de détérioration ») passe.

### Motif 5. Les mots de la parole qui manquent : « ça », « c'est », la phrase détachée, « parce que » (haute)

**Ce que c'est.** Le côté voix de ce que `tempo-A.md` mesure côté rythme. Quand on explique à quelqu'un, on dit « ça
ne sert à rien », « c'est le gel qui les abîme », « ce gaz, on ne le voit pas », « parce que », « alors ». Le livre
n'emploie presque jamais ces mots (tableau du point 1) : le deux-points les remplace, et le lecteur doit trouver le
lien lui-même. Le paragraphe du monoxyde que JP a lu n'en a aucun.

**Fréquence.** Mesurée : 281 deux-points pour 5 « parce que », 7 « ça » et 11 « c'est » dans 17 500 mots ; 3,7 mots
de liaison pour 1000 mots au ch. 1, 4,2 dans partie-1.

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| partie-1, l. 3 | « Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus quand on ferme presque l'entrée d'air pour la nuit. Le gaz ne se voit pas et ne se sent pas. Il prend la place de l'oxygène dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans toute la pièce, jusqu'au plancher : se coucher par terre ne protège pas. » | « Le poêle, le barbecue, le réchaud, le fanal et les moteurs font tous du monoxyde de carbone, et le poêle en fait plus quand on ferme l'entrée d'air presque au complet pour la nuit. Ce gaz, on ne peut ni le voir ni le sentir. Comme il prend la place de l'oxygène dans le sang, on s'endort sans s'en rendre compte au lieu de sortir. Il se répand dans toute la pièce, jusqu'au plancher, alors ça ne sert à rien de se coucher par terre. » |
| ch. 1, l. 110 | « Faire boire tout le monde sans attendre la soif : elle arrive en retard sur le besoin » | « Faire boire tout le monde sans attendre d'avoir soif, parce qu'on a soif seulement quand on manque déjà d'eau » |
| ch. 3, l. 258 | « Tasser de la neige autour et par-dessus : elle isole et garde gelé ce qui l'est. » | « Tasser de la neige autour et par-dessus : comme la neige isole, ce qui est gelé reste gelé. » |
| partie-2, l. 10 | « S'il charge, courir derrière un gros arbre, une auto ou un rocher : il ne poursuit pas loin, et on tourne autour d'un tronc plus vite que lui. » | « S'il charge, courir derrière un gros arbre, une auto ou un rocher, parce qu'il ne poursuit pas loin et qu'on tourne autour d'un tronc plus vite que lui. » |
| ch. 1, l. 45 | « Non. Elle seule peut tuer le jour même » | « Non. Aucune autre ne peut tuer le jour même » |
| ch. 3, l. 284 | « dans une maison qui refroidit, le danger pour eux est le gel (ch. 32) » | « dans une maison qui refroidit, c'est le gel qui est dangereux pour eux (ch. 32) » |

Dans la réécriture du monoxyde, chaque morceau garde son fait : la liste des cinq sources, l'entrée d'air presque
fermée la nuit, le gaz qu'on ne voit pas et qu'on ne sent pas, l'oxygène du sang, l'endormissement au lieu de sortir,
le gaz jusqu'au plancher. Ce qui change : « Ce gaz, on ne peut ni le voir ni le sentir » met la personne qui voit et
qui sent à la place du pronominal (R1, C9) ; « comme » et « alors » disent le lien ; « ça ne sert à rien » remplace
l'infinitif en sujet (motif 3) ; « presque au complet » remet l'adverbe là où on le dit.

**Cause.** Quatre règles poussent dans le même sens. La règle 2 du skill `ecriture` donne le deux-points comme
modèle de la raison : « Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant. » La règle
des tirets de `CLAUDE.md` (« virgule, deux-points, parenthèses ou point ») a renvoyé 5 665 tirets vers le deux-points.
Le tableau « Les mots » du skill (l. 206) et `RELIEF` de `controle.py` font sortir la mise en relief (« C'est… qui /
que »), qui est un des tours les plus fréquents de la parole (R1, C16). Et le skill `langue`, l. 28, dit « Le joual
et la langue parlée ne s'écrivent pas » sans tracer la frontière entre le joual (« ça fait que », « pu ») et le
français parlé correct (« ça », « c'est pour ça que », la phrase détachée) (R1, C11).

### Motif 6. La phrase sans verbe : les signes en liste de noms, et l'ellipse (moyenne)

**Ce que c'est.** Dans « Comment on le reconnaît », les signes arrivent en suite de noms, sans verbe ni personne
(« de la diarrhée et des maux de ventre ; […] de la fièvre, un visage enflé »). C'est la forme d'un tableau clinique.
À voix haute, on dit ce qui arrive à quelqu'un : « on a la diarrhée », « le visage enfle ». Même famille : le verbe
sous-entendu dans la deuxième moitié de la phrase (« Le froid naturel est au ch. 73, le congélateur […] au ch. 74 »).

**Fréquence.** 9 dans le lot, presque tous dans les pages des dangers : partie-2, l. 102, l. 140, l. 144, l. 154,
l. 171, l. 231 ; partie-1, l. 169 ; ch. 3, l. 264.

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| partie-2, l. 102 | « Dans la semaine qui suit le repas, de la diarrhée et des maux de ventre ; de 5 à 15 jours après, de la fièvre, un visage enflé, des douleurs et une faiblesse dans les muscles. » | « Dans la semaine qui suit le repas, on a la diarrhée et mal au ventre ; de 5 à 15 jours après, on fait de la fièvre, le visage enfle, et les muscles deviennent douloureux et faibles. » |
| partie-2, l. 154 | « Des repas de plus en plus gros, une faim qui revient vite, une envie de gras qui ne lâche pas et un poids qui baisse ; puis la nausée, et, après une semaine à dix jours, une diarrhée que seul le gras arrête. » | « On mange des repas de plus en plus gros, on a faim de nouveau peu après, on a envie de gras tout le temps et on maigrit. Ensuite, on a la nausée, et après une semaine à dix jours, une diarrhée que seul le gras arrête. » |
| partie-2, l. 231 | « Un signe qui ne ressemble à rien d'ordinaire ; une amélioration qu'on n'explique pas ; un enfant qui change de comportement. » | « La personne a un signe qui ne ressemble à rien de ce qu'on connaît, ou elle va mieux sans qu'on sache pourquoi ; un enfant n'agit plus comme d'habitude. » |
| partie-2, l. 140 | « Pas à l'odeur ni à l'apparence : seulement au thermomètre et à l'heure qu'on a notée. » | « On ne le reconnaît ni à l'odeur ni à l'œil, seulement au thermomètre et à l'heure qu'on a notée. » |
| ch. 3, l. 264 | « Le froid naturel est au ch. 73, le congélateur qui dégèle pour de bon au ch. 74. » | « Pour le froid naturel, voir le ch. 73 ; pour le congélateur qui dégèle pour de bon, le ch. 74. » |

**Cause.** La structure des pages des dangers (« Comment on le reconnaît ») appelle une liste de signes, et la limite
de 150 à 230 mots (skill `editeur`) la tasse en noms. La règle 0 du skill (« un verbe qui dit le geste ») est pensée
pour les étapes, pas pour la description d'un malade. Détail d'outil : la regex `les maux` de `LIVRESQUE` ne voit pas
« des maux » (partie-2, l. 102).

### Motif 7. L'inversion et le complément glissé avant l'objet (moyenne)

**Ce que c'est.** Le sujet passe après le verbe (« Après viennent la parole et le jugement », « que donne la radio »,
« où s'attache le câble ») ou un complément se glisse entre le verbe et son objet (« garder à portée de main
l'extincteur »). L'oreille attend le sujet, puis le verbe, puis la chose. Le guide de radio (L2) : « Lorsqu'une phrase
est inversée, il faut attendre d'arriver à la fin de celle-ci pour en comprendre le début. »

**Fréquence.** 10 dans le lot : ch. 1, l. 139 ; ch. 3, l. 46 (deux), l. 164, l. 391 ; partie-1, l. 64, l. 105 ;
partie-2, l. 115, l. 196, l. 204.

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 1, l. 139 | « Après viennent la parole et le jugement » | « Ensuite, la parole et le jugement sont touchés » |
| partie-2, l. 204 | « Des jours plus tard viennent la diarrhée, les crampes et les vomissements. » | « Des jours plus tard, la personne a la diarrhée et des crampes, et elle vomit. » |
| ch. 3, l. 164 | « refroidissement éolien que donne la radio » | « le refroidissement éolien que la radio annonce » |
| partie-1, l. 64 | « garder à portée de main l'extincteur et un couvercle de métal qui ferme le chaudron » | « avoir l'extincteur à portée de main, avec un couvercle de métal qui ferme le chaudron » |
| partie-2, l. 196 | « Donner seulement aux adultes la viande d'une bête tirée au plomb » | « Donner la viande d'une bête tirée au plomb aux adultes seulement » |
| partie-2, l. 115 | « Trop de vitamine A donne, en quelques heures, une grosse envie de dormir et des vomissements. » | « Quelques heures après avoir mangé trop de vitamine A, on a très envie de dormir et on vomit. » |

**Cause.** La règle 11 du skill `ecriture` le dit pour le complément (« Le complément de lieu ou de temps ne se glisse
pas entre le verbe et son objet »), mais `controle.py` ne le cherche pas (la liste `TOURNURE` vise « ceux qui » et
« d'où »). Rien ne parle de l'inversion du sujet après un adverbe ou dans une relative : c'est une habitude d'écrit,
et elle sert à mettre le mot important à la fin.

### Motif 8. L'apposition qui définit au milieu de la phrase (moyenne)

**Ce que c'est.** Une définition entre deux virgules coupe le sujet de son verbe (« L'if du Canada, un arbuste bas
aux aiguilles plates sans bandes blanches dessous, est toxique ») ou s'enchaîne en glossaire (« le col-de-cygne, le
capuchon recourbé au bout du mât, par où sortent les fils »). À voix haute, on définit avec « c'est », dans sa propre
phrase : « Le col-de-cygne, c'est le capuchon… ».

**Fréquence.** Environ 14 : ch. 1, l. 125 ; ch. 3, l. 44 à 46 (trois), l. 413, l. 531 ; partie-1, l. 125, l. 241 ;
partie-2, l. 3, l. 100, l. 125, l. 179 (deux).

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 3, l. 44 | « sur l'une de ces trois pièces : le mât de branchement, le tuyau de métal qui sort du toit ou monte le long du mur ; le col-de-cygne, le capuchon recourbé au bout du mât, par où sortent les fils ; le support d'isolateurs, où s'attache le câble qui vient du poteau. » | « sur l'une de ces trois pièces. Le mât de branchement, c'est le tuyau de métal qui sort du toit ou qui monte le long du mur. Le col-de-cygne, c'est le capuchon recourbé au bout du mât, par où les fils sortent. Le support d'isolateurs, c'est là que le câble qui vient du poteau est attaché. » |
| partie-2, l. 179 | « L'if du Canada, un arbuste bas aux aiguilles plates sans bandes blanches dessous, est toxique en entier, sauf la chair rouge autour de la graine. » | « L'if du Canada est toxique au complet, sauf la chair rouge autour de la graine. C'est un arbuste bas, avec des aiguilles plates sans bandes blanches dessous. » |
| partie-2, l. 179 | « La cicutaire maculée, grande plante des fossés à fleurs blanches en parasol, a des chambres creuses à la base de sa tige coupée en long, et donne des convulsions en moins d'une heure. » | « La cicutaire maculée, c'est une grande plante des fossés, avec des fleurs blanches en parasol. Quand on coupe sa tige en long, on voit des chambres creuses à la base. Elle donne des convulsions en moins d'une heure. » |
| partie-1, l. 125 | « Le bois traité des vieilles terrasses, des clôtures et des modules de jeu, la plupart d'avant 2004, contient de l'arsenic » | « Le bois traité des vieilles terrasses, des clôtures et des modules de jeu contient de l'arsenic ; la plupart datent d'avant 2004 » |
| ch. 3, l. 413 | « le joint d'eau du siphon, la seule barrière contre les gaz de l'égout et de la fosse septique » | « le joint d'eau du siphon : c'est la seule chose qui empêche les gaz de l'égout et de la fosse septique de passer » |

**Cause.** Le « format validé » du gabarit en fait un modèle : « **Sel nitrité** : sel et nitrite de sodium, deuxième
barrière contre le botulisme. » (`gabarit-chapitre.md`, l. 51). La définition en « c'est », la forme parlée, tombe
sous la règle de la mise en relief (skill, l. 206 ; `RELIEF`) : il ne reste que l'apposition.

### Motif 9. La chose ou l'abstraction qui agit (basse)

**Ce que c'est.** Une chose fait un geste de personne : la panne « force », rien « n'annonce », la maison « ne change
pas assez d'air », l'air « a perdu ses premiers degrés », la génératrice « a une cause ». Ce n'est pas la
personnification poétique que le cadre chasse déjà ; c'est une tournure de rédacteur qui évite de dire qui fait quoi.
À garder : un instrument qui « dit » ou « montre » (« son chiffre dit où en est l'air », ch. 1, l. 33) se dit
couramment (« le thermomètre dit 5 degrés ») et n'est pas un défaut.

**Fréquence.** Environ 8 dans le lot.

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| ch. 3, l. 61 | « rien n'annonce le moment où elle tombe » | « on ne peut pas savoir à quel moment elle va tomber » |
| ch. 3, l. 276 | « même quand la panne force à cuire beaucoup de viande vite » | « même quand on a beaucoup de viande à cuire vite à cause de la panne » |
| ch. 3, l. 79 | « une maison fermée à −35 °C ne change pas assez d'air pour sortir le monoxyde d'un appareil qui en fait sans arrêt » | « quand il fait −35 °C et que la maison est fermée, l'air ne se renouvelle pas assez pour sortir le monoxyde d'un appareil qui en fait sans arrêt » |
| ch. 1, l. 159 | « L'air a perdu ses premiers degrés en quelques heures, de 20 à 14 °C » | « En quelques heures, l'air est descendu de 20 à 14 °C » |
| ch. 3, l. 526 | « Elle a souvent l'une de ces quatre causes, qu'on règle sans pièce neuve » | « Le plus souvent, le problème vient d'une de ces quatre causes, et on le règle sans pièce neuve » |

**Cause.** La liste `TOURNURE` de `controle.py` ne cherche que les verbes de l'esprit (sait, veut, pardonne, attend…) ;
le cadre (l. 100 à 102) aussi. Les verbes d'action (forcer, annoncer, perdre, avoir) passent.

### Motif 10. Le mot savant ou médical, et le petit tour de grammaire écrite (basse)

**Ce que c'est.** Des mots qu'on lit dans une fiche de santé et qu'on n'entend pas dans la cuisine (« toux aboyante »,
« température buccale », « plaie souillée », « nourrissons », « teneur », « tissus », « survolter », « les dormeurs »,
« coordination ») et de petits tours qui n'existent qu'à l'écrit (« moins qu'il ne faut », « ce qui l'est », « de même
si », « sans plus mesurer », « ne paraît qu'au dégel », « par une nuit claire », « d'autant plus que »). Chacun seul
est mineur ; ensemble, ils donnent le ton du livre savant.

**Fréquence.** Environ 15 mots et 10 tours dans le lot. Autres cas : ch. 1, l. 136 « gestes fins » ; ch. 3, l. 69
« sans plus mesurer le gaz », l. 133 « Par-dessus les dormeurs », l. 417 « ne paraît qu'au dégel », l. 466 « par une
nuit claire et venteuse », l. 490 « d'autant plus que » ; partie-2, l. 32 « son espèce est nocturne », l. 76
« vacciné enfant », l. 113 « ces tissus », l. 165 « La teneur », l. 190 « Les nourrissons ».

| Fichier, ligne | Le texte | Dit à voix haute |
| --- | --- | --- |
| partie-1, l. 74 | « une toux aboyante » | « une toux qui ressemble à un jappement » |
| ch. 3, l. 331 | « Hypothermie grave (sous 28 °C de température buccale) » | « Hypothermie grave (sous 28 °C dans la bouche) », comme le ch. 1, l. 109 |
| partie-2, l. 75 | « une piqûre ou une plaie souillée » | « une piqûre ou une plaie sale » |
| partie-1, l. 147 | « Dégeler une batterie avant de la charger ou de la survolter » | « Dégeler une batterie avant de la charger ou d'y brancher des câbles de démarrage » |
| ch. 1, l. 110 | « La famille boit moins qu'il ne faut » | « La famille ne boit pas assez » |
| ch. 3, l. 420 | « de même s'il passe dans un mur » | « même chose s'il passe dans un mur » |

**Cause.** La table de la règle 15 et `LIVRESQUE` sont des listes fermées (une quarantaine de mots, presque tous des
verbes et des connecteurs) ; rien sur le vocabulaire médical, qui vient des sources de santé (règle 2 de
`CLAUDE.md`), ni sur le « ne » explétif et le « le » neutre. Le mot de métier reste quand il nomme une chose qu'on
doit reconnaître et qu'il s'explique (le long feu, l'arbre encroué : règle 15) ; JP a aussi gardé « proportionnelle »
et « surface exposée » (« bon français professionnel ») : la voix visée n'est pas le familier, c'est le français
correct qu'on dit.

## 4. Ce qui marche : des modèles

| Fichier, ligne | Le texte | Pourquoi |
| --- | --- | --- |
| partie-1, l. 5 | « Quand deux personnes ont mal à la tête en même temps dans la même pièce, ou quand le mal de tête passe dehors et revient en rentrant, on fait comme si c'était du monoxyde. » | La condition d'abord, avec « quand » ; le sujet est « on » ; « faire comme si » est une tournure qu'on entend. Les signes sont des gestes et des sensations, pas des noms. |
| partie-2, l. 16 | « Une cartouche de 20 qu'on glisse par erreur dans un fusil de 12 se coince dans le canon : on croit l'arme vide, on charge une cartouche de 12, et le canon éclate. » | La scène dans l'ordre où elle arrive, trois verbes avec « on ». Le deux-points ouvre une suite d'actions, pas une loi. |
| ch. 3, l. 190 | « si le moteur est encore chaud quand on pose la main dessus au bout de l'heure, attendre plus longtemps. » | La correction de JP (« carter ») : un repère qu'on sent avec la main, le « si » et le « quand » dits en toutes lettres, le geste à l'infinitif à la fin. |
| partie-1, l. 193 | « Quand la température du corps descend sous 32,2 °C, la personne décide mal sans s'en rendre compte : quelqu'un d'autre doit décider pour elle. » | La personne est le sujet, la consigne se dit avec « doit », et les mots sont ceux de la cuisine (« décide mal », « sans s'en rendre compte »). |
| ch. 3, l. 550 | « Elle doit dépasser à peine de la graisse : trop longue, elle n'éclaire pas plus, elle fume noir, salit tout et brûle la graisse plusieurs fois plus vite. La raccourcir dès que la flamme file et fume. » | Des verbes concrets de quelqu'un qui l'a fait (« fume noir », « salit tout », « la flamme file »). Le détachement « trop longue, » passe ici parce qu'il est court et qu'il se dit. |

Autres phrases dans la même voix : partie-2, l. 134 « noter qui en a mangé : souvent, c'est toute la table » ;
partie-2, l. 5 « quand on voit sa langue, on est beaucoup trop près » ; ch. 3, l. 435 « Ça tient la pression d'une
maison. »

## 5. Ce que ce regard demande au skill (pour la réécriture)

1. **Le test de la voix porte sur la tournure, pas seulement sur le mot.** Avant chaque phrase : est-ce que je la
   commencerais comme ça en parlant ? Un participe ou un adjectif en tête devient « si » ou « quand » ; un nom
   d'action devient « quand on… » ; un infinitif en sujet devient « quand on…, on… » ou « ça… ».
2. **Le français parlé correct s'écrit** : « ça », « c'est », « c'est pour ça que », « parce que », « alors » en tête,
   la phrase détachée (« Ce gaz, on ne peut ni le voir ni le sentir »), la définition en « c'est ». La règle de la
   mise en relief sort seulement la redite (R1, C16) ; le skill `langue` trace la frontière avec le joual (R1, C11).
3. **La source vérifie, elle ne parle pas** : la formule de la fiche officielle se redit avec les mots de la maison
   (cadre, l. 21), et une liste de formules d'institution entre dans l'outil.
4. **Le gabarit change ses modèles** : le « format validé » du Matériel (« Dosé selon l'emballage. », « deuxième
   barrière contre le botulisme ») et la correction du ch. 3 en loi physique ne sont plus des exemples à copier.
5. **L'outil cherche des tournures**, et chaque avis se juge : participe ou adjectif détaché en tête de phrase ;
   « à chaque / à la première / dès la première » + nom d'action ; « au retour du » ; un infinitif sujet suivi de
   « dépense, demande, donne, ne protège, coûte, suffit » ; « viennent » après un adverbe ; « que donne », « où
   s'attache » ; « local », « toute trace », « d'origine inconnue », « aucun signe de », « au contact des » ; « qu'il
   ne faut », « de même si », « par une nuit » ; `des maux` en plus de `les maux`.

## 6. Liste de contrôle (cadre, lignes qui touchent l'écriture et la langue)

Pour tout agent
- [x] `CLAUDE.md` déjà chargé ; cadre lu au complet ; skill `ecriture` lu au complet, avec ses tableaux.
- [ ] `suivi/plan-de-match.md`, « PAUSE du 15 octobre » : pas lu ; audit en lecture seule, aucune décision à appliquer.
- [x] Règle 1 : aucune réécriture n'ajoute de fait ni de chiffre (chaque réécriture garde les chiffres du texte).
- [x] Ne rien commiter ; aucun fichier existant modifié.
- [x] Un lot précis ; lu seulement les quatre fichiers et les règles d'écriture ; aucune image ; sorties coupées.

La phrase (appliquée à mes réécritures)
- [x] Règle 0 : chaque réécriture lue à voix haute se comprend du premier coup.
- [x] Pas de loi en formule, pas de « X passe là où », pas de maxime, pas d'image, pas de chose qui pense.
- [x] Consigne jamais au pronominal ; sujet nommé ; ordre naturel (« Faire respirer la vapeur… à un enfant » remis
  dans l'ordre après l'avis de `controle.py`).
- [x] Le mot qu'on dit : c'est l'objet même de l'audit.
- [x] On nomme la chose au lieu du possessif.
- [x] Aucun tiret (`controle.py` sur les réécritures : 0 tiret). Le « − » de « −35 °C » est le signe moins.
- [x] Les mises en relief (« c'est le gel qui », « c'est le tuyau de métal qui ») signalées par `controle.py` sont
  voulues : elles sont la forme parlée (motif 5).

La langue
- [x] Français correct, sans joual ni anglicisme (pas de « booster », pas de « ça fait que »).
- [x] Pas deux « ou » l'un dans l'autre dans les réécritures.
- [x] `langue.py` sur les réécritures : 3 avis jugés. « C'est la seule qui peut » (subjonctif) : réécrit en « Aucune
  autre ne peut ». « un repas qui a trop de vitamine A » (LanguageTool lisait « à ») : réécrit en « après avoir mangé
  trop de vitamine A ». « Le joint » en tête de ligne : faux positif.
- [ ] Le correcteur (skill `langue`) ne passe pas sur ces notes : elles ne s'impriment pas.
