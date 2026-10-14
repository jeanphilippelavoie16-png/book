---
name: dessin-notice
description: "Mains, têtes et corps des planches : sept méthodes rejetées (12–13 oct. 2026) ; depuis le 13 oct., on calque fidèlement les images de référence de JP (vectoriser.py), usage personnel autorisé par JP"
metadata:
  type: feedback
---

JP a rejeté sept fois les mains, les têtes et les corps (12–13 octobre 2026) : formes.js calculé en 2D, mains enlevées, trois dessinateurs + juge, main 3D au rendu réaliste (« ouff non »), style notice IKEA (« les doigts sont tout croche, les têtes sont laides et le corps aussi »), puis le décalque d'une petite image repassé par le skill `encrage` (« c'est de pire en pire »).

Ce qui marche : **calquer fidèlement** ses images de référence avec `.claude/skills/dessin-notice/scripts/vectoriser.py` (image agrandie, trait coupé à mi-chemin cœur-fond, un gris par trait, potrace). Rien n'est redessiné, symétrisé ni « encré » : le trait reste celui du dessinateur. Ses références (13 oct.) : tableau homme-femme face et dos 123RF, planche de mains de Kibbitzer (DeviantArt), planche de gestes au trait, corps de femme beige.

**Why:** un pouce mal placé ou un trait tremblé, il le voit tout de suite ; aucune construction par calcul n'a tenu. Les images ne sont pas sous licence libre : JP a tranché le 13 oct. (« c'est pour usage personnel, it's all good, calque »).

**How to apply:** pour une main, une tête ou un corps de planche, partir d'un de ces calques (`_reprise/scratchpad/modeles/calque/`), jamais d'une construction. Chaque calque est inscrit dans `images/credits.md` (section des modèles calqués) : usage personnel, à remplacer si le livre se vend ou se donne hors de la famille. Montrer toute feuille à JP avant de toucher aux planches. Voir [[regle-dure-pas-de-categories-echappatoires]] (enlever la main n'était pas la réponse).

**Pose dans les planches (13 oct., suite).** `images/modeles/` + `formes.modele()` ; essai sur 50-40, 25-40, 13-09, 104-40, 27-04 montré à JP. Ses demandes en voyant les premières : « une forme de bras, pas juste un fucking long bras droit, au pire le couper » et « les lignes plus fines pour respecter le style des dessins qu'on a » — d'où le trait choisi à 1,3 et l'avant-bras galbé ou coupé. 28-02 (tête d'enfant de profil, enfant assis) attend une référence.

**13 oct., fin.** JP : « les mains sont pas belles, prends celle-là, pi prends le temps de bien les faire » — une planche de mains de shoo_arts (iStock, trait fin égal). Calquée (modèles s01–s20), posée dans les cinq planches : s11 (poing) pour 104-40, 13-09 (acier) et 50-40 ; s05 (pierre dans le creux de la main) pour 13-09 ; s09 (pince) pour 50-40 et 27-04 ; s03 (main qui pend) pour 25-40. Kibbitzer est écarté.
JP ensuite : « c'est bien mais pas encore parfait, les formes que tu as pas de main, construis-les à partir des formes que tu as déjà pour pouvoir les adapter » → poses construites (modeles.py poses, images/modeles/poses.json) ; s10-plat remplace la main à plat des gestes dans 50-40.


**13 octobre 2026 (soir), après les cinq pilotes des corps simples dans les planches :**
- **La charte.** JP l'a demandée : deux poids de trait, deux gris (`h.a.loin` et `h.a.ombre`) et le rouge `#9B2C1E`. Le rouge
  sert à la flèche du geste, au point à contrôler, à la zone dangereuse et à l'encadré danger. Elle est dans
  `planches/SKILL.md`, section « La charte ».
- **Les profils.** « Les vues de côté sont toutes vraiment belles. Élimine toutes les vues de face et de haut. » Un corps
  ne se montre plus que de profil. Une vue de dessus d'un objet seul reste, sans corps.
- **Les mains en gros plan.** « Les mains, je veux qu'on fasse le même principe qu'on a fait pour les bonhommes de côté,
  agents pis révision, parce que c'est pas acceptable. » Les mains calquées (shoo, Kibbitzer) sont donc refusées elles
  aussi. Une bibliothèque de mains simples est en construction : `planches/scripts/mains/`, `mainSimple()`, quatre
  agents puis un réviseur, brief dans le scratch `mains-lib/brief.md`.
- **14 octobre 2026 : JP valide les 54 planches des cinq lots** de corps simples de profil avec la charte : « toutes
  excellentes » (sans compter les mains). Elles sont passées dans `images/validees/`. Leurs gros plans de mains seront
  refaits avec la bibliothèque `mains/` : chaque planche touchée par ce travail repassera alors « à valider ». Ce que JP a
  tranché : 34-01 passe les zones sur un profil ; 26-08 aura l'écharpe en gros plan, à faire avec les mains ; 28-02
  perd ses vues d'en haut.
- **14 octobre : la charte sur toutes les autres planches** (« oui pour la charte de couleur sur les autres planches »).
  - 253 planches n'ont ni corps ni main : elles passent la charte seule. Le brief est dans le scratch
    `brief-charte.md`, et 6 pilotes sont montrés à JP d'abord.
  - 50 planches ont des gros plans de mains : elles auront la charte en même temps que leurs mains refaites.
- **14 octobre, ce que JP a tranché :**
  - les mains simples : « oui go 3e tour » ;
  - la charte sur les 247 autres planches : go, en 12 lots, 6 agents à la fois (`scratch/charte-lots.json`) ;
  - les 6 pilotes de la charte : validés ;
  - 110-01a : la flèche du chevillage à tire pointe vers le fond de la mortaise, confirmé.
- **14 octobre : « toute est excellent »** (JP, après 13 paquets de la charte). Les 99 planches passées sont validées, avec
  34-01 et 28-02. 28-06 et 29-05 se refont avec la tête de profil. La règle des têtes vaut pour les têtes humaines : les
  têtes d'animaux vues de face restent quand la vue de face montre ce qui compte.
- **14 octobre, choix de JP sur les têtes : le choix 2.** On construit une bibliothèque de têtes de profil (`scripts/tetes/`,
  `teteSimple`, option `visage` du corps simple) dans le style des corps simples : homme, femme, enfants de 6 et 4 ans, bébé,
  avec les expressions. Un agent la construit, puis le réviseur repasse (brief dans le scratch `tetes-lib/brief.md`).
  « All good le reste » : les 78 planches des paquets 19 à 29 sont validées.
- **14 octobre : la charte est passée sur toutes les planches.** JP a dit « all good » sur les derniers paquets ; tout est
  dans `images/validees/`. Les planches à redessiner plus tard (au-delà de la charte) sont listées dans le scratch
  `suivi-charte.md`, section « À redessiner plus tard ».
- **14 octobre, les cinq pilotes des mains (104-40, 50-40, 98-08, 26-08, 13-09) : « 1 go ».** Les mains simples passent
  sur les 68 planches. Et : « les prises que c'est laid, on élimine. Genre quand on tient la roche pour faire du feu,
  trouve une autre façon de le faire. » Une main laide ne s'imprime pas, ni la nouvelle ni l'ancienne calquée : on change
  la prise (la pierre dans le poing plutôt qu'en pince), la vue ou le cadrage, ou on montre l'objet seul avec un renvoi qui
  dit la prise. Ce qui marche : la prise de manche, le poing sur une anse, la pince fine sur un objet mince. Ce qui sort
  laid : la pince latérale épaisse, la main relâchée vue de dos (palette), la main à plat vue par l'auriculaire (lame
  mince), le poing vu de dos (moufle).
- **14 octobre, les têtes de profil (premier tour) : « les têtes sont belles, enlève l'iris pi la commissure ».** L'œil
  est une amande vide, la bouche fermée n'a pas de trait au coin. Le réviseur repasse sans changer le style.
- **14 octobre, après les 10 paquets des mains : « oui go pour les 12, pi tes choix pour les têtes ».** Les 68 planches
  de mains sont migrées. On reprend les mains faibles (13-01, 23-02, 24-16, 27-04, 29-07, 34-01, 38-04, 75-40, 96-07,
  98-08, 103-07, 103-10, 105-40) : pour une pince, gros plan des bouts de doigts coupés par le bord de la vue ; sinon
  une autre prise ; sinon l'objet seul et le renvoi dit la prise. Têtes : la patte devant l'oreille (B), la bouche au
  contour seul (A), pas d'oreille sur une tête couchée (A). La bibliothèque des têtes est figée ; on la passe dans
  28-06, 29-05, 27-03, 38-01, 89-07, 27-05, 13-40, 28-02, 29-06 et 34-01.
- **14 octobre, fin des mains et des têtes : « garde l'ancienne pour 29-05, all good le reste ».** 29-05 garde sa version
  validée d'avant les têtes simples (l'aide penchée et les bébés dessinés dans la planche) : la tête simple de l'aide,
  écrasée à plat sur le bébé, se lisait moins bien. Les 73 autres planches (68 de mains avec les 13 reprises, 5 de
  têtes) sont validées. `a-valider/` est vide ; 363 planches dans `validees/`.
- **14 octobre, le redessin des 34 planches faibles : « oui lance toute », puis « 2 go, continue le reste ».** Cinq essais
  vus et acceptés (48-09 le lièvre de profil, 50-10 le castor dans la coulée, 12-05a la vraie égoïne, 86-04 la vue de
  dessus hiérarchisée, 24-08 la jambe en corps simple). Le lièvre reçoit un cercle rouge sur le cou. Les animaux vivent
  dans `images/planches-src/_animaux.js`. Le réseau de la session bloque Wikimedia : les animaux se calquent sur les
  planches Fuertes du dépôt, ou se construisent. Suivi dans le scratch `suivi-charte.md`.
- **14 octobre, le redessin : « toute est sur la coche a date wow », et « 26-04 on garde avant ».** Les 18 planches
  redessinées montrées sont validées. 26-04 (le garrot) garde sa vue de face validée : de profil, la bande vue sur la
  tranche se lisait comme un piquet planté dans la cuisse. Un gros plan sur un membre peut rester de face quand la face
  montre le geste ; c'est le corps entier qui se montre de profil.
- **14 octobre, fin du redessin des 34 planches faibles : « all good ».** Les 14 dernières sont validées (29-05 avec la
  nuque recollée dans le raté, 60-10a, 60-10b, 62-16 sans le renvoi « chef latéral », 67-10, 80-40, 86-01b, 86-03a,
  89-03, 89-04, 89-05a, 89-06, 95-40a, 96-01). `a-valider/` est vide. Nouveaux modules : `images/planches-src/_animaux.js`
  (lièvre, canard, lagopède, chien) et `_pieds.js` (pied nu à orteils, mukluk souple).
- **14 octobre, 47-03 : « c'est hot le nouveau du canard, même de face c'est hot ».** La tête de l'appelant passe de
  profil en gros plan (calque Fuertes pl. 12, fonction `canard` de `_animaux.js`), la branche loin de la fourche en
  gris et en tireté. Les petites retouches (83-10, 45-01a, 80-40, 12-05a, 89-03) sont validées ; 24-08 garde son blanc
  (aucune vue à ajouter). Plus rien dans `a-valider/`.
- **14 octobre, les couvertures : « la main est bizarre, celle qui tient l'arc pour le feu, prends d'autres images pour
  les tomes », et nos photos et notre texte sur le dos.** Les six quatrièmes changent de dessin (sans main ni corps, un
  objet ou une construction du tome) et reçoivent un bloc « Les auteurs » : la photo de JP (`images/auteurs/jp.jpg`),
  l'étincelle de Claude (`images/auteurs/claude.svg`) et deux textes courts, réécrits plus poétiques à la demande de JP (Baie-Comeau, ville de la Côte-Nord ; adepte de nature ; il dédie le livre à ses deux enfants ; nécessaire, mais il souhaite ne jamais s'en servir). Pas de page des auteurs dans le livre : les
  comptes de pages ne bougent pas (le tome 5 reste à 438). Pilote sur le tome 1 d'abord, montré à JP.
- **14 octobre, la dédicace (JP) : « À Pierre-Alexis et à Louis-Charles, / pour qu'il y ait toujours quelqu'un qui
  sait. »** Page recto après la page de titre, dans les six tomes (`DEDICACE` dans `design/outils/assembler-tome.py`).
  Chaque tome prend 2 pages ; le tome 5 arrive à 440, la limite de Blurb.
- **14 octobre : « c'est parfait le reste, nos bios ».** Tome 1 : la maison de blocs refusée (« non, une autre ») ; le chalet paré aux braises (11-03) à la place ; bloc
  des auteurs, photo en bichromie). Les dessins recommandés pour les autres dos sont pris : 37-03a, 55-08, 70-12, 90-07a,
  110-01a (`CHOIX` dans `build_couvertures_6.py`). Textes des auteurs : la 4ᵉ version. 13-01 : le palier seul (B).
