# Le banc d'essai : les verdicts

28 octobre 2026. Ce fichier sert seulement au juge, qui compare chaque réécriture au goût de JP. Il ne va jamais à
l'agent qui réécrit les passages de `passages.md`, sinon le banc ne mesure plus rien.

Pour chaque passage, on trouve ce que JP en a dit (ses mots exacts, la date, et où ils sont notés), la version qu'il a
approuvée quand il y en a une, puis ce que les neuf lecteurs simulés en ont dit (`plan/audit-ecriture/lecteurs/`,
la synthèse et les fiches), avec leurs lectures à l'envers. Une seule version a été approuvée par JP en toutes
lettres, celle du monoxyde. Les réécritures des lecteurs et les propositions de l'audit sont des pistes, et JP ne les a
pas jugées une à une : il a répondu « ok pour tout » aux onze questions du rapport, pas à chaque exemple.

Quand on écrit « l'ancien skill », c'est `.claude/skills/ecriture/SKILL.md` au commit `7bc9e9f6`, avant sa réécriture
(`git show 7bc9e9f6:.claude/skills/ecriture/SKILL.md`).

## Le diapason

JP, le 28 octobre 2026, sur la version du paragraphe « Ce qui arrive » de la page du monoxyde que les neuf lecteurs
avaient faite ensemble : « j'adore celui-là, comment il est écrit. Sauf la dernière phrase qui a une tournure de phrase
bizarre » (`plan/decisions-jp.md`, section « Le paragraphe du monoxyde, modèle de la voix »). Avec la dernière phrase
refaite, c'est le texte de la page depuis le commit `ad5f74d2` :

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone. Le poêle en dégage plus la
> nuit, quand on ferme l'entrée d'air presque au complet. Ce gaz ne se voit pas et n'a pas d'odeur. Il prend la place
> de l'oxygène dans le sang, alors on a envie de dormir. On ne se doute de rien, et on s'endort avant d'avoir pensé à
> sortir. Ça ne sert à rien de se coucher par terre comme dans la fumée, parce que le monoxyde remplit toute la pièce,
> jusqu'au plancher.

Une réécriture doit sonner comme lui. Un juge qui le rejetterait se trompe, et ses tours ne sont pas des fautes :
« Ce gaz ne se voit pas » dit ce qu'est le gaz, personne n'y fait de geste, et « on a envie de dormir » est le mot
qu'on dit (bases, section 8.1).

## Les décisions de JP qui servent au juge

JP a répondu « ok pour tout, réécrit le skill » le 28 octobre 2026 (`plan/decisions-jp.md`, section « Les bases de
l'écriture, après l'audit »). Les numéros sont ceux de cette section.

- **5.** Une page de danger dit d'abord d'où vient le danger, comme le paragraphe du monoxyde (B1, B2, B10, B13).
- **6.** La série orange garde sa règle (tout y est, sans limite de longueur), mais dans chaque étape le geste vient en
  premier et le pourquoi après, et ce qui ne sert pas au geste sort de l'orange (B12, B14).
- **7.** La langue parlée : « ça », « c'est pour ça que », « on a envie de dormir », oui ; « pis », « pu », « y'a », non.
- **8.** Les ch. 68 et 107 reviennent au ton du livre, en gardant les images qui viennent de la main (« Amorcer comme
  une allumette ») (B9, B11, B15).
- **9.** Le paragraphe du monoxyde reste tel que JP l'a adoré, sans remettre « On ne suffoque pas et on ne tousse pas »
  (B1).
- **11.** Les noms latins sortent partout.

Une réécriture n'ajoute aucun fait ni chiffre (règle 1 de `CLAUDE.md`). Quand le passage d'avant ne dit pas une chose
dont le geste a besoin, la bonne réécriture la laisse au rédacteur ou la marque `[À VÉRIFIER]`, elle ne l'invente pas.

---

## B1. Le monoxyde, « Ce qui arrive »

**Ce que JP en a dit.** Sur ce paragraphe, le 28 octobre 2026 : « le tempo du paragraphe est pas bon pi c'est vrai dans
toute le livre » (`plan/audit-ecriture/bases.md`, section 1, avec « c,est » corrigé ; d'autres notes le citent « le
tempo du paragraphe est pas bon, pi c'est vrai dans tout le livre », par exemple le message du commit `7b0d160e`).
C'est la phrase qui a lancé l'audit.

Le même jour, plus tôt, sur la version condensée qui précédait celle-ci (« Le gaz n'a ni odeur ni couleur et prend la
place de l'oxygène dans le sang : on a sommeil, et on s'endort au lieu de sortir ») : « On a sommeil, qui qui dit ça
dans vrai vie, la façon que tu écris c'est pas bon » (`plan/decisions-jp.md`, section « Le mot qu'on dit »). Le passage
B1 est la version faite après cette remarque (commit `3b26fb90`).

**La version que JP a approuvée.** Le diapason, plus haut. La dernière phrase des lecteurs, que JP a trouvée bizarre :
« Le monoxyde remplit toute la pièce jusqu'au plancher : même couché par terre, comme on le ferait dans la fumée, on le
respire. » (un deux-points, et la comparaison glissée au milieu).

**Les lecteurs** (synthèse, section 4).

- Les neuf : le fait le plus utile pour une famille qui chauffe au bois, le poêle la nuit, est caché au bout de la
  première phrase. « Au lieu de sortir » arrive en queue, comme un oubli, et plusieurs l'entendent comme un choix.
- Cinq : le deux-points entre le sang et le sommeil cache un « alors ».
- Six : « Le gaz… Il… Il… », trois phrases sur le même moule.
- Cinq : « se coucher par terre ne protège pas » répond à une question que personne n'a posée, il faut nommer le
  réflexe de la fumée.
- Quatre : le « presque » de « on ferme presque l'entrée d'air » arrive en retard.
- L'animateur entend « le poêle en fait plus » comme « en fait » ; Langue seconde ne sait pas si « ne se sent pas »
  parle de l'odeur ou de ce qu'on ressent ; le trappeur garde « ne se voit pas et ne se sent pas », qu'il trouve bon.

**À savoir pour juger.** Le diapason garde les faits du passage d'avant, et rien d'autre : « fumée » nomme le réflexe
que la dernière phrase corrigeait déjà. Il ne remet pas « On ne suffoque pas et on ne tousse pas » (décision 9).

## B2. « On est tenté de mettre la génératrice au garage… »

**Ce que JP en a dit.** Sur l'épreuve du tome 1, le 28 octobre 2026 : « la tournure de phrase du paragraphe on est
tenté… est fucking weird » (message du commit `90b0e8e1` ; `plan/demandes-jp-epreuve-tome-1.md`, demande 5).

On a alors poli le paragraphe (commit `90b0e8e1`) :

> Pendant une panne d'hiver, la nuit, dans une tempête ou le soir de l'arrivée au chalet, les gens rentrent souvent la
> génératrice au garage, dans la remise ou sous l'auvent, en laissant la porte ouverte : ils veulent la protéger de la
> neige et des voleurs, ou garder le congélateur en marche. Il est aussi dangereux de démarrer la scie ou la souffleuse
> dans le garage par −30 °C, le temps qu'elle se réchauffe.

JP, sur cette version polie, le même jour : « Non mais je veux dire un paragraphe de même ça veut rien dire lol »
(ancien skill, règle 12 ; message du commit `07f90736`).

**La version que JP a approuvée.** Aucune : le paragraphe a été coupé (commit `3cc726bd`). Dans la même passe, le froid
de −30 °C est passé dans l'étape 4 (« Sortir l'auto, la motoneige, la scie ou la souffleuse du garage avant de la
démarrer, même par −30 °C »), et le reste du paragraphe a disparu. Le danger (la génératrice sous un toit, la porte
ouverte qui ne suffit pas) était dit juste avant, dans « Ce qui arrive ».

**L'histoire** (`plan/audit-ecriture/regles/R2-intention-jp.md`, section 5). C'est la quatrième version d'un paragraphe
qui ne disait rien qu'on doive faire. La première disait « La règle se brise dans les mêmes moments : […] ». Le
18 octobre, JP a dit des pages des dangers en général « tu as recommencé à faire des tournures de phrase bizarres », et
la correction tirée du tableau du skill a donné « On est tenté… », puis la version polie, puis la coupe.

**Les lecteurs.** Ils ne l'ont pas lu : le paragraphe était coupé avant l'échantillon.

**Sur le contexte** (pas sur le passage). Le paragraphe « Ce qui arrive » donné en contexte porte deux défauts que JP
a relevés dans l'épreuve : le renvoi écrit en toutes lettres (« (Pictogramme du monoxyde) c'est tu normal ? ») et deux
« ou » l'un dans l'autre (« Et où 2 fois de suite », sur « une serre, ou sous un auvent ou une bâche », d'après le
cadre) (`plan/demandes-jp-epreuve-tome-1.md`, demandes 3 et 4).

**À savoir pour juger.** La réponse que JP attend, c'est la question « doit-il exister ? » avant de polir (P2). Une
réécriture qui garde le paragraphe en le rendant plus clair refait la faute que JP a reprise. Une réécriture qui le
coupe et garde le −30 °C dans la consigne qui s'en sert est celle qui ressemble à ce qu'on a fait.

## B3. La section 1 du ch. 1, avant l'explication des quatre horloges

**Ce que JP en a dit.** Sur l'épreuve du tome 1, le 28 octobre 2026 : « Les quatre horloges, mais on sait même pas
c'est quoi les 4 horloges, c'est quoi ça veut dire ??? Faut l'expliquer. » (ancien skill, « Ce que JP a dit » ;
`plan/decisions-jp.md`, section « L'écriture : ce que JP a dit et ce que ça a donné »). La notion n'était expliquée
qu'à l'étape 16, trois pages plus loin.

Le même jour, JP a fait du ch. 1 un court chapitre sur les quatre horloges seulement (« les chapitres doivent parler de
ce qu'ils parlent pas des autres », `plan/decisions-jp.md`, section « Chaque chapitre parle de son sujet »).

**La version que JP a approuvée.** Aucune en toutes lettres. La version faite après sa remarque (commit `54397ef8`) :

> Pendant une panne de courant, quatre choses s'épuisent en même temps, chacune à sa vitesse : la chaleur du corps et
> l'air qu'on respire, en minutes ou en heures ; l'eau potable, en heures ou en jours ; le froid du frigo et du
> congélateur, en 4 heures pour le frigo et en 1 à 2 jours pour le congélateur ; les calories et le combustible, en
> semaines ou en mois. Ce sont les quatre horloges : on s'occupe d'abord de celle qui finit le plus tôt, même si elle
> protège moins que les autres.

Elle est dans le chapitre aujourd'hui, avec « une tempête ou une route fermée » en plus. JP ne l'a pas jugée.

**Les lecteurs, sur cette version d'après** (synthèse, section 3, point 2, et section 2.9). Les neuf ont buté
dessus : une « ligne » de plus de 70 mots, quatre choses annoncées qui en font six, le nom de la notion à la fin, et
l'horloge du corps qui protégerait « moins » que le congélateur. Le trappeur : « une horloge, ça s'épuise pas : ça
compte. Faut me dire pourquoi on appelle ça des horloges. » La paramédic propose « même si ce qu'elle protège vaut
moins ». Trois lecteurs (le lecteur type, l'éditrice, la paramédic) voient une contradiction entre les « 4 heures »
de cette phrase et les « 4 à 6 h » du tableau.

**À savoir pour juger.** Ce que JP veut, c'est la notion expliquée dès la première ligne, en clair (P14), avec plus de
mots s'il le faut. Les faits disponibles sont ceux du tableau de l'étape 16, donné en contexte : une réécriture qui
dit « 4 heures » pour le réfrigérateur s'écarte du tableau (« 4 à 6 h »).

## B4. « Quand l'utiliser » du ch. 1

**Ce que JP en a dit.** Sur l'épreuve du tome 1, le 28 octobre 2026 : « Les phrases comme "le courant manque et on ne
sait pas quand il reviendra" ; "Coupure de courant sans avoir de temps de retour" ; la façon que t'écris c'est pas
humain. » (ancien skill, « Ce que JP a dit »). La deuxième phrase entre guillemets est celle que JP écrirait lui-même
(ancien skill, règle 13 : « lui écrirait »). R2 (section 3.5) précise qu'il la donne comme exemple de ce qu'il
dirait, pas comme une forme à copier, et que « la façon que t'écris » vise l'écriture, pas seulement les titres.

**La version que JP a approuvée.** Aucune en toutes lettres. La version faite après sa remarque (commit `85cae1a8`) :

> - **Panne de courant sans heure de retour** (étapes 1 à 15).
> - **Génératrice ou propane en panne par grand froid** (étapes 2 et 6 à 16).
> - **Route fermée ou pont de glace qui ne tient plus, pour une durée inconnue** (étapes 16 et 26 à 29).
> - **Congélateur dégelé pendant une absence** : décider quoi sauver (étapes 15 et 20 à 27).
> - **Eau de l'aqueduc douteuse** (étapes 17 à 19).
> - **On hésite entre rester et partir** (étapes 16 et 29 ; ch. 2).
> - **Ni génératrice, ni thermomètre, ni eau embouteillée** (section 7).

`CLAUDE.md` en donne les modèles : « Panne de courant sans heure de retour », « Feu en vue », « Il faut partir vite ».
L'ancien skill (règle 13) dit aussi le mot que les gens emploient : « une panne de courant », pas « le courant
manque » ; « en panne », pas « lâche » ; « pour une durée inconnue », pas « on ne sait pas pour combien de temps ».

**Les lecteurs.** Ils n'ont pas lu cette version.

**À savoir pour juger.** Le titre se dit comme on l'écrirait à la main sur une fiche ; une courte phrase reste quand
c'est comme ça qu'on le dit (« Il faut partir vite », « On hésite entre rester et partir »).

## B5. La section 3 du ch. 3, « en paraboles »

**Ce que JP en a dit.** Le 16 octobre 2026 : « c'est fucking drôlement dit, on dirait que tu parles en paraboles,
arrête ça » ; puis : « les mots, proportion et tout, c'est bon, c'est la façon que le paragraphe est organisé. Moins
poétique, plus informatif, en gardant un bon français professionnel » (ancien skill, tableau de la relecture, l. 335 ;
`suivi/plan-de-match.md`, point 11).

Le même jour, JP a coupé la section partout : « Comment ça marche, on les enlève toutes finalement. Matériel vient
prendre la place, pour tous les chapitres. C'est important de savoir c'est quoi le matériel avant d'avoir le
logigramme » (R2, section 3.3). Avant, sur le titre « Pourquoi ça marche » : « c'est une tournure de phrase qui marche
pas ». Et le 15 octobre, sur une version plus ancienne du même paragraphe, qui disait « un tuyau vide ne fend pas » :
« no shit, man » (ancien skill, « Ce que JP a dit » ; la phrase a été coupée au commit `262f4c81`).

**La version que JP a approuvée.** Aucune. L'ancien skill proposait de dire chaque mécanisme, puis ce qu'il change dans
la procédure et l'étape où ça se fait, sans en faire une version approuvée. Aujourd'hui, `CLAUDE.md` dit qu'un mécanisme
qui apprend quelque chose va dans l'étape qu'il explique, et le ch. 3 refait (28 octobre) les a mis aux étapes 8 et 10 :

> La perte de chaleur d'une maison est proportionnelle à l'écart de température avec l'extérieur et à la surface
> exposée : en fermant les autres pièces, on réduit la surface à chauffer.

> Un corps couché perd sa chaleur beaucoup plus vite vers le plancher que vers l'air, parce que le bois et le
> contreplaqué la conduisent et que l'air immobile la conduit très peu : il faut plus d'épaisseur sous les corps que
> par-dessus.

JP n'a pas jugé ces phrases.

**Les lecteurs, sur la phrase de l'étape 8** (synthèse, section 2.8). Sept l'entendent comme un bout de cours de
secondaire 4 au milieu des gestes. Tout-le-monde : « J'ai décroché au milieu de la phrase, et la deuxième moitié (fermer
les autres pièces) était la seule chose dont j'avais besoin. »

**À savoir pour juger.** Sur le vocabulaire, les mots de JP passent avant ceux des lecteurs : il a dit que « proportion »
et le reste étaient bons, et que le défaut était l'organisation du paragraphe (des vérités générales posées l'une après
l'autre, sans lien entre elles ni avec la procédure, et une chute au bout, « Le danger vient presque toujours de… »).
Une réécriture qui garde un paragraphe à part fait encore la section que JP a coupée ; celle qui attache chaque
mécanisme à son étape, avec le mot qui dit le lien, va dans le sens de ses décisions.

## B6. La braise du ch. 13

**Ce que JP en a dit.** Le 16 octobre 2026, sur la section 3 du ch. 13, « Une braise devient flamme quand l'air lui
arrive sans arrêt, d'où le souffle continu » : « on avait dit plus de phrases de même ; arrête les tournures de phrase de
même » (`suivi/plan-de-match.md`, point 20 ; ancien skill, tableau de la relecture, l. 336, qui range aussi « Dans une
fibre mouillée, la chaleur part à évaporer l'eau » sous la même remarque). C'était après la remarque sur les paraboles
(B5). Même jour, sur la même famille : « tout ce qu'on a dit pour les phrases genre "la braise ne sait pas" pis des
affaires de même » (ancien skill, l. 337).

**La version que JP a approuvée.** Aucune. L'ancien skill proposait : « Pour que la braise s'enflamme, il faut lui
envoyer de l'air sans arrêt : c'est pour ça qu'on souffle longtemps, sans à-coups (étape 16). » et « Le bois mouillé
use la chaleur de l'étincelle à sécher l'eau avant de brûler : on le fend jusqu'au cœur sec (étape 12). » La section a
ensuite été coupée avec toutes les sections 3 (B5), et le ch. 13 d'aujourd'hui dit la braise dans l'étape 16 :

> Souffler longtemps et en continu, sans à-coups (repère 15). Pour que la braise grossisse et s'enflamme, il faut lui
> envoyer de l'air sans arrêt : chaque fois qu'on arrête pour reprendre son souffle, elle refroidit.

JP n'a pas jugé cette version, et sa dernière demi-phrase est un fait que le passage d'avant ne dit pas.

**Les lecteurs.** Le ch. 13 n'était pas dans leur échantillon.

**À savoir pour juger.** Le point 20 du plan de match dit la direction : chaque phrase part de ce qu'on fait et de ce
qu'on voit, garde ses articles, et ne lie jamais par « d'où ». Toute la section était à refaire ainsi, pas seulement
la braise (« la chaleur part à évaporer l'eau », « une étincelle ne donne qu'un peu de chaleur, assez pour… »).

## B7. La vidange de l'étape 23 du ch. 3

**Ce que JP en a dit.** Le 16 octobre 2026 : « c'est vraiment pas clair comment faire la vidange ; quand on a des
passages comme ça, il faut que ça soit mieux expliqué, surtout qu'une planche est reliée ; faut pousser la chose plus
loin » ; et sur « son robinet » : « "son robinet" : le robinet du chauffe-eau » (ancien skill, tableau de la relecture,
l. 339 ; `suivi/plan-de-match.md`, point 13). « Le robinet du chauffe-eau » est une des réécritures de JP lui-même
(R2, section 6) : il ajoute les mots qui nomment la chose.

**La version que JP a approuvée.** Aucune en toutes lettres. La version imprimée dans l'épreuve du tome 1 (commit
`ce3d931a`, l. 200 à 215) découpe l'étape en sous-étapes, chacune avec son repère de la planche 03-10 :

> 23. **Vidanger dans l'ordre** (planche 03-10).
>  - **Fermer l'entrée d'eau** (repère 1). Elle est au sous-sol, là où le tuyau d'eau entre par le plancher ou par le
>  mur de fondation, souvent près du compteur : une vanne à poignée ronde ou à levier. La tourner jusqu'au bout. Au
>  chalet, arrêter la pompe du puits et vider le réservoir sous pression du puits.
>  - **Mettre le chauffe-eau électrique hors tension** (repère 2) : baisser le disjoncteur du chauffe-eau au panneau
>  électrique. Un élément qui chauffe à sec brûle.
>  - **Ouvrir un robinet d'eau chaude à l'étage** (repère 3), le plus haut de la maison : l'air entre par là. Sans
>  cette entrée d'air, le chauffe-eau ne se vide pas, et on croit que le robinet de vidange du chauffe-eau est bouché.
>  - **Tirer d'abord l'eau à boire** (repère 4) : ouvrir le robinet de vidange du chauffe-eau, au bas de la cuve, et
>  remplir des contenants propres qu'on couvre.
>  - **Brancher ensuite un boyau d'arrosage sur le robinet de vidange du chauffe-eau, et vider le reste au drain de
>  plancher** (repère 5), jusqu'à ce que le boyau ne coule plus.
>  - **Ouvrir tous les robinets de la maison**, eau chaude et eau froide (repère 6), et les laisser ouverts jusqu'à ce
>  qu'ils ne coulent plus.
>  - **Vider les circuits de chauffage à eau chaude**, s'il y en a. Ils se vident mal : il faut parfois défaire un
>  raccord pour vider les points bas.

**Les lecteurs.** Ils n'ont pas lu cette étape.

**À savoir pour juger.** La direction de JP, c'est plus de mots : le geste, où est la pièce et comment la reconnaître,
ce qu'on voit quand c'est fait, et le repère de la planche dans l'ordre des repères (P9). Plusieurs faits de la version
de l'épreuve ne sont pas dans le passage d'avant (où est l'entrée d'eau, la vanne, la pompe du puits au chalet,
l'élément qui brûle à sec, le raccord à défaire). Une réécriture faite sans source ne peut pas les ajouter : elle
nomme ce qui manque ou le marque `[À VÉRIFIER]`.

## B8. « Régler dehors », le logigramme du ch. 17

**Ce que JP en a dit.** Le 15 octobre 2026 : sur « Régler dehors : un bol qui revient, du bois de la corde qui se voit.
Jamais un contenant d'origine » : « personne parle comme ça, c'est fucking pas clair » ; sur l'étiquette « Refus, il a
où aller » : « wtf » ; et : « c'est pas juste les logigrammes, c'est la façon de dire les choses. » (ancien skill,
« Ce que JP a dit » ; `plan/decisions-jp.md`, section « Ce qui ne s'imprime pas »).

**La version que JP a approuvée.** Aucune en toutes lettres. La case refaite le même jour (commit `e2537e33`), que
l'ancien skill et le `CLAUDE.md` du 20 octobre donnaient en modèle :

> **Lui donner dehors**, sans le faire entrer : un repas chaud dans un de nos bols, qu'on reprend ensuite, de l'eau, du
> bois fendu. Jamais dans l'emballage du magasin : ça montre qu'on en a d'autres.

Dans la même passe, la question « Que répondre ? » est devenue « On peut lui donner ce qu'il demande ? », avec des
flèches « Oui » et « Non », puis « Il a un endroit où aller ? » ; et l'autre case est devenue « **Refuser une seule
fois**, sans mentir. Lui dire où aller, à quelle distance, et comment s'y rendre. »

**Les lecteurs.** Ils ne l'ont pas lu.

**À savoir pour juger.** Ce que JP refusait, c'est le code à déchiffrer : des noms sans verbe, une étiquette en
raccourci, un but sous-entendu. Une case de logigramme fait des phrases complètes, avec ses articles, et une question
se répond par oui ou non. Le sens à garder est celui de l'étape 10 du chapitre, donnée en contexte (donner sans
renseigner sur ce qu'on a).

## B9. « On ne tient jamais que le cuir. » (ch. 107)

**Ce que JP en a dit.** Rien sur cette phrase. Pour tout le chapitre, la décision 8 : retour au ton du livre, en
gardant les images qui viennent de la main.

**Les lecteurs.** Lecture à l'envers, cinq lecteurs (l'animateur, l'éditrice, l'ado, le trappeur, Langue seconde) :
ils ont d'abord lu « on ne tient jamais le cuir », donc la main sur le métal. L'ado : « C'est la phrase la plus
dangereuse à mal lire de tout l'échantillon. » Le trappeur : « Le "ne… jamais que", c'est du français de notaire. »
L'animateur ajoute que la phrase d'avant n'a pas de verbe, et que son « qui mord » s'accroche au cuir plutôt qu'à la
pince. Leurs façons de le dire : « Tenir la pince seulement par le cuir. » (l'ado) ; « On tient la pince seulement par
le cuir. » (le trappeur) ; « On tient la pince seulement par le cuir, jamais par le métal. » (Langue seconde) ; « On
tient la pince par le cuir, et jamais ailleurs. » (l'éditrice).

**La proposition de l'audit** (rapport, défaut 1 ; bases, section 8.4) : « Il faut tenir le porte-électrode seulement
par le cuir des poignées, jamais par le métal. » JP ne l'a pas jugée une à une.

**À savoir pour juger.** Une réécriture qui garde « ne… jamais que » garde la lecture à l'envers. « Amorcer comme une
allumette », dans le contexte, est l'image que JP veut garder.

## B10. Le démarreur à distance (page Génératrice)

**Ce que JP en a dit.** Rien sur cette phrase.

**Les lecteurs.** Lecture à l'envers, trois lecteurs (la prof, l'animateur, la paramédic) : « à distance d'une auto »
s'entend « loin d'une auto », et la phrase dit alors le contraire. La paramédic : « Comment je sors l'auto du garage sans
la démarrer ? […] "Lancer le démarreur à distance" : personne ne dit ça ; on démarre l'auto à distance. » Elle laisse
à l'auteur le vrai geste pour l'auto (« je ne l'invente pas »). L'animateur : la consigne la plus importante arrive en
queue d'une phrase déjà longue. La prof : « on ne dégage pas l'échappement de l'intérieur de l'auto ». Leurs façons de
le dire : « et ne jamais faire démarrer à distance une auto restée au garage. Quand une auto est prise dans la neige,
dégager son tuyau d'échappement avant chaque démarrage. » (la prof) ; « Et une auto restée au garage, on ne la démarre
jamais à distance. » (l'animateur).

**À savoir pour juger.** Le geste « sortir l'auto du garage » demande de la démarrer : c'est une question de fond pour
le vérificateur, pas une chose que la réécriture invente.

## B11. « Sans nitrite, 2,5 % n'est pas un plancher, c'est un pari. » (ch. 68)

**Ce que JP en a dit.** Rien sur cette phrase. Pour tout le chapitre, la décision 8.

**Les lecteurs.** Lecture à l'envers : l'ado aurait salé à 2,5 % au lieu de 6 % (« J'aurais pris 2,5 %, parce que
"plancher" me faisait penser au minimum à mettre »). Cinq l'ont relevée (Tout-le-monde, le lecteur type, l'éditrice,
l'ado, le trappeur). Le lecteur type : « Les deux premières phrases de l'étape sont parfaites : 6 %, et 192 g pour une
pièce de 3 200 g. Je peux le faire. Puis ça se gâte. Pourquoi me parler d'un plancher si je mets 6 % ? […] Qui parle,
entre les guillemets ? […] Et "c'est un pari", c'est un slogan. » Il se demande aussi si le 6 % comprend le sel
nitrité. Langue seconde entend l'anglais *floor* dans « plancher » et propose « Le minimum ». Le trappeur : « Le moins
qu'on puisse mettre, c'est 2,5 %, et seulement avec au moins 100 ppm de nitrite ou de nitrate. Sans nitrite, 2,5 % de
sel, ce n'est pas assez sûr. »

**La proposition de l'audit** (bases, section 8.4) : au rédacteur, avec sa source, dire le geste (ce qu'on fait sans
nitrite) avant la mise en garde ; la phrase est aussi une opposition fabriquée.

**À savoir pour juger.** Les guillemets de « avec un minimum de 100 ppm » citent une source, ce que P10 interdit, et
le tiret est interdit partout (P6). Ce qu'on fait sans nitrite n'est pas dans le passage : une réécriture sans source
le laisse au rédacteur ou le marque `[À VÉRIFIER]`.

## B12. « Tout chiffre affiché veut dire qu'il y a du monoxyde » (ch. 3)

**Ce que JP en a dit.** Rien sur cette phrase.

**Les lecteurs.** Lecture à l'envers : l'avertisseur de l'ado affiche 0, et il a cru qu'il y avait du gaz (« Zéro,
c'est un chiffre »). Le lecteur type, l'ado et la paramédic ne savent pas quoi faire ensuite, s'il faut sortir les
enfants (synthèse, section 2.4) ; la paramédic : « une condition sans geste. Je lis 12 sur l'écran à 7 h : je fais
quoi ? » Leurs façons de le dire : « Si l'écran affiche autre chose que 0, il y a du monoxyde dans la pièce. » (l'ado) ;
« Si un chiffre s'affiche, il y a du monoxyde : sortir tout le monde (étapes 12 et 13). S'il ne redescend pas de la
journée, un appareil de la maison en fait. » (la paramédic).

Dans la même étape, une autre lecture à l'envers, sur le titre « Tester l'avertisseur de CO au bouton » : s'il sonne,
l'ado croit que tout va, alors que la page du monoxyde dit que le bouton d'essai vérifie la pile et la sirène, pas la
cellule qui détecte le gaz.

**À savoir pour juger.** Le geste existe dans le livre : le tableau du ch. 1 (l. 91) donne « 0 ppm affiché » comme
cible, sinon « Sortir tout le monde (ch. 3, étapes 12 et 13) ». Une réécriture qui ajoute ce geste avec son renvoi
n'invente rien. La décision 6 vaut ici : dans l'orange, le geste d'abord, le pourquoi après.

## B13. L'eau froide, « Ce qui arrive »

**Ce que JP en a dit.** Rien sur ce paragraphe.

**Les lecteurs.** Six (la prof, Tout-le-monde, le lecteur type, l'animateur, l'éditrice, la paramédic) : le livre
annonce un truc pour retenir, 1, 10, 1, et cache le dernier 1 derrière un point-virgule. La prof : « "retenir par" ne
se dit pas » ; la structure annoncée n'est pas tenue. La paramédic : « Au bout d'environ 1 heure » se compte-t-il depuis
la chute, ou après les 10 minutes ? L'animateur veut justement trois phrases sur le même moule, pour qu'on les retienne :

> Une chute dans l'eau froide se passe en trois temps. On les retient avec trois chiffres : 1, 10, 1. Une minute :
> c'est le choc. On prend une grande inspiration, puis on respire très vite ; si on a la tête sous l'eau à ce
> moment-là, même un bon nageur peut se noyer. Dix minutes : c'est le temps qu'on a pour faire des gestes utiles,
> avant que les bras, les jambes et les doigts perdent leur force. Une heure, environ : c'est le temps avant de perdre
> conscience.

L'éditrice et la paramédic en font une liste de trois lignes.

**La proposition de l'audit** (rapport, défaut 3 ; bases, section 8.3), pour la dernière phrase seulement : « Ensuite,
pendant 10 minutes, les bras, les jambes et les doigts répondent encore, puis ils perdent leur force. Au bout d'environ
1 heure dans l'eau, on perd conscience. » L'heure se compte depuis la chute.

**À savoir pour juger.** Ce qui compte pour JP, ici, c'est que le fait qui sauve ait sa phrase, et que le troisième
temps s'entende. Trois phrases parallèles sont un moule voulu, parce qu'elles servent à retenir les trois chiffres.

## B14. L'entrée électrique, série des 15 minutes (ch. 3)

**Ce que JP en a dit.** Rien sur cette phrase.

**Les lecteurs.** Sept (Tout-le-monde, l'animateur, l'éditrice, l'ado, le trappeur, la paramédic, Langue seconde) :
on entend six noms pour trois pièces, les virgules font deux travaux (séparer les pièces et ouvrir leur définition), et
la phrase passe 60 mots dans une série de 15 minutes. « Enclenché » laisse trois lecteurs dans le doute (le
disjoncteur a-t-il sauté ou non ?). L'ado : « je ne sais pas quoi faire avec ça ». La paramédic : la phrase nomme trois
pièces dont elle n'a pas besoin pour décider, la note « Reconnaître le mât de branchement » peut les porter, et
l'avertissement du fil tombé arrive en dernier, quand on est déjà dehors. Le trappeur : « Ce qui sert, c'est la chose
qu'on voit (le tuyau, le capuchon, le câble), pas son nom. » L'animateur : « penche » et « pend » se répondent, et « qui
y entre pend » se dit mal. Une de leurs façons de le dire (Langue seconde) : « Si le disjoncteur principal n'a pas sauté,
le bris est à l'entrée électrique de la maison. Il y a trois morceaux à regarder. Le mât de branchement est le tuyau de
métal qui sort du toit ou qui monte le long du mur. Le col-de-cygne est le capuchon recourbé au bout du mât, par où
sortent les fils. Le support d'isolateurs est l'endroit où s'attache le câble qui vient du poteau. »

**À savoir pour juger.** La décision 6 vaut ici : dans l'orange, le geste d'abord, et ce qui ne sert pas au geste sort
de l'orange. Les lecteurs lisent tous « enclenché » comme « n'a pas sauté » ; dire « n'a pas sauté » n'est pas un fait
neuf.

## B15. « Vérifier la porte d'entrée. » (ch. 68, étape 1)

**Ce que JP en a dit.** Rien sur cette étape. Pour tout le chapitre, la décision 8.

**Les lecteurs.** C'est le passage qui a fait buter le plus de monde : les neuf (synthèse, section 3, point 1). Huit
ont d'abord pensé à une vraie porte. « La pièce » est une chambre au ch. 3 et un morceau de viande ici. « Si on ne peut
pas l'affirmer » est, pour le lecteur type, « un mot de tribunal », et « c'est non » accroche aussi. « Le sel n'assainit pas,
il arrête » : presque tous demandent ce que le sel arrête, et quatre devinent « il la garde dans l'état où il la
trouve », mais c'est à l'auteur de le dire (synthèse, section 2.2). Le lecteur type : « ça fait quinze ans que je pends
mes orignaux, et je n'ai jamais planté un thermomètre dans une cuisse pendant les 24 premières heures. […] l'étape ne me
dit pas comment vérifier. Je suis éliminé avant d'avoir commencé. » Une de leurs façons de le dire (l'ado) : « 1.
Vérifier d'où vient la viande. Le morceau doit venir d'une bête refroidie à 7 °C dans les 24 premières heures. Si on
n'en est pas sûr, ne pas le saler : le cuire à la poêle, ou suivre le ch. 78. »

**À savoir pour juger.** Ce que le sel arrête, et comment vérifier les 7 °C en 24 heures, ne sont pas dans le passage :
une réécriture sans source ne les invente pas. La devinette des lecteurs (« il la garde dans l'état où il la trouve »)
n'est pas un fait vérifié.

## B16. Le jardin nordique, section 1 (ch. 95)

**Ce que JP en a dit.** Rien sur ce chapitre, qui n'est pas encore refait.

**Les lecteurs.** Ce chapitre n'était pas dans leur échantillon.

**L'audit.** `plan/audit-ecriture/texte/tempo-F.md`, motif 4 (« La phrase longue bâtie par incises : le verbe
attend », gravité haute) : 82 mots, et le verbe « convertit » attend son complément « en légumes » pendant 45 mots ;
le pire cas est la section 1, qui est la première phrase lue du chapitre. La cause donnée : l'ancien gabarit demandait
deux contenus à la section 1 (« ce que la technique fait, et combien de temps elle fait durer ») en « Une phrase. Pas
deux. ». Le rapport en fait le défaut 4, « La phrase-entrepôt ». La façon de le dire proposée par tempo-F, que JP n'a
pas jugée :

> Le jardin nordique fait des légumes avec une trouée de forêt, une saison d'environ 120 jours sans gel et beaucoup
> d'eau portée à la main. Sur la côte, à Sept-Îles, cette saison va en moyenne du 25 mai au 27 septembre ; une trouée à
> l'intérieur des terres ne suit pas forcément ces dates. Le jardin ne conserve rien. Ses légumes se gardent ensuite
> jusqu'au printemps au caveau (ch. 79), en fermentation (ch. 80) ou en conserve (ch. 78).

**À savoir pour juger.** Le sujet et le verbe viennent avant la liste et la parenthèse (P4), et aucun tiret ne reste
(P6). Les faits à garder sont ceux du passage, avec leurs chiffres et leurs renvois.
