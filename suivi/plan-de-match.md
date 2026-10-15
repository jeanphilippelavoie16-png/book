# Plan de match

Ce qui reste à faire, dans l'ordre. Refait le 24 septembre 2026, **après le passage à six tomes et
la renumérotation** : tous les numéros ici sont les nouveaux (table : `plan/tomes-6-proposition.md`).
Coût indicatif en tokens : un chapitre neuf complet ≈ 1 M ; une planche dessinée et relue ≈ 150 à 200 k.

## Où on en est

- Six tomes, 114 chapitres (104 écrits ; 6 à écrire au tome 2, 4 d'agriculture au tome 5). Chacun sous 440 pages
  (≈ 366 / 414 / 386 / 383 / 333 / 243).
- Design validé : manuel de terrain, **variante couleur C** (`design/choix.md`). Chapitre témoin
  complet : le 10, L'eau (`design/epreuves-livre/13-C/`, 19 pages).
- 110 planches validées, plus 50 dessinées le 24 septembre (65 pages dans `images/a-valider/`, à relire
  par JP : les 20 des savoirs innus et les 30 du tri et de la fouille). 286 photos sous licence (dont
  les 52 des traces). Plus aucun `[À VÉRIFIER]`.
- Plus de loi, de municipalité, de relecteur, de numéro de téléphone ni de service qui répond
  (exceptions dans CLAUDE.md).

## ⏸ PAUSE du 15 octobre (JP : « à 96 % d'utilisation, pause ; on reprend samedi ») : COMMENT REPRENDRE

Deux chantiers tournaient, lancés le 15 octobre. Les briefs sont copiés dans `_reprise/scratchpad/` (le
scratchpad de la session ne survit pas au conteneur). Tout ce qui était sur le disque est poussé.

1. **Planches manquantes (priorités haute et moyenne, et les 14 à refaire)** : la liste est dans
   `images/audit-planches/` (LISEZMOI.md pour le résumé, `tomes-*.md` pour le détail). Neuf lots par
   chapitres : t1 tome 1, t2 tome 2, t3a et t3b tome 3, t4 tome 4, t5 tome 5, t6a tome 6 sauf 109 à 112,
   t6b ch. 109 et 112, t6c ch. 110 et 111. Brief commun : `_reprise/scratchpad/planches-lot/brief.md`, avec
   en fin **« Le niveau de qualité »** (JP sur la 04-42 : « c'est butcher, ça. Faisons les choses comme il
   faut »). Ce qui reste = les lignes de l'inventaire qui n'ont pas de PNG dans `images/a-valider/`.
   Chaque lot range ses ancrages dans `ancrages-<lot>.json` du scratchpad, copiés à la pause dans
   `_reprise/scratchpad/planches-lot/` (à fusionner dans `design/epreuves-livre/placements-tome-N.json`). **Corrections demandées et pas encore faites au moment de la pause** (à
   vérifier dans le PNG) :
   - 04-42 : le test du boudin sans les mains (le boudin d'argile seul, plié ; le sable qui s'émiette) ;
   - 05-01 : souris propres décalquées ou pas de souris ; l'ombre du flanc qui déborde sous le fond ;
   - 07-01 : un vrai marteau ; le chiffon visible en coupe entre le bouchon et le drain ;
   - 43-04 : vraies empreintes de cervidé au trait ; les trois ovales sans renvoi ; la dernière empreinte ;
   - 77-01 : le poisson dans son papier (paquet) ; une ligne d'eau nette au-dessus ;
   - 70-13 : vrais crochets (pas des cercles barrés) ; des pièces qui se reconnaissent.
2. **Passe d'écriture du tome 1** (skill `ecriture`, modèles ch. 10 et ch. 4) : brief
   `_reprise/scratchpad/passe-t1/brief.md`. Texte d'avant la passe : commit `ef62be7`
   (`git show ef62be7:chapitres/NN-….md`, pour `controle.py --avant`). Lots : p1 (00b, 01, 02), p2 (08, 09,
   10 à vérifier, 16), p3 (17, 18), lancés ; p4 (03, 05, 06), p5 (07, 11, 12), p6 (13, 14, 15) **pas lancés** (JP, 15 oct. : « ceux qui sont pas lancés, lance-les pas ») : à lancer à la reprise, avec le même brief, une fois le lot de planches t1 fini sur ces chapitres.
   Les ancrages proposés par la passe : `_reprise/scratchpad/passe-t1/ancrages-<lot>.json`. Un chapitre est fait quand `controle.py` passe sans tiret ni mot banni et sans invariant disparu, que
   sa série orange est en place si l'inventaire `plan/premieres-minutes-inventaire.md` en demande une, que
   son logigramme est rendu si l'urgence se décide en branches, et que chaque planche est appelée.
3. **Ensuite** : fusionner les ancrages, remonter le tome 1 (`design/outils/assembler-tome.py 1 --hors-ligne`),
   republier le tome 1 dans le lecteur (`_reprise/memoire/lecteur-relecture.md`) pour la relecture de
   validation de JP, et marquer ses anciennes notes. Puis : recomposer toutes les planches avec la légende
   sans tiret ; l'incohérence du fil de l'électroscope (ch. 4) ; la contradiction sur l'iode après 40 ans
   (ch. 4).

État au moment de la pause : voir la ligne « Arrêté » ci-dessous, mise à jour en arrêtant.

**Arrêté** : pas encore (en cours le 15 octobre, 14 h 30).

## ⏸ PAUSE du 28 septembre (JP : « met ça sur pause, token manquant ») — COMMENT REPRENDRE

1. **Corrections des planches : 19 sur 50 faites.** Les 31 restantes : `scratchpad/args-corrections-reste.json`.
   Relancer `.claude/corriger-planches.workflow.js` avec ces args (le prompt lit toujours les modifs dans
   `scratchpad/args-corrections-50.json`, par ref). ≈ 3,5 M.
2. **29-08 en pictogrammes** (règle 8, nouvelle, dans `images/recommandations-planches.md` : JP a trouvé la
   femme enceinte « laide en tabarnak ») : arrêtée avant d'écrire, le fichier est intact. Relancer
   `resumeFromRunId: "wf_972130b5-acd"` sur le script `.../workflows/scripts/refaire-29-08-pictogrammes-wf_972130b5-acd.js`.
   Si JP aime le style : l'appliquer aux autres planches à corps entier (ch. 29 surtout, 24-01, 37-07, 38-01…).
   **89-05b aussi** (JP, 28 sept. : « le bonhomme respecte pas les planches bonhomme », même corrigée) :
   à refaire selon les règles 2 et 8, avec le même lot que la 29-08.
3. Puis les 220 retouches restantes de la passe qualité, et l'épreuve papier.
   **29 sept., LANCÉ (JP : « fait 2, 3, 4 »)** : photos posées, corrections de texte (109 OMS, 101 anglais,
   62 renvois, renvois de notes 37 et 34, lame au rouge 29/34), réassemblage des six tomes et couvertures :
   `.claude/photos-texte-assemblage.workflow.js`, run `wf_d9645c75-fc4`. **FAIT** (≈ 0,7 M) : 10 photos
   de plus posées (la plupart du tri l'étaient déjà), 5 corrections de texte (ch. 101 : sept citations
   anglaises redites en français), six tomes remontés : 332, 416, **334**, 284, 438, 200 ; tranches
   inchangées ; couvertures refaites. **JP, 29 sept.** : photos « à défaut » : crosse (92) et liber (94)
   gardées, les deux cuirs du 102 retirés (`"poser": false`) ; **ch. 62 : « fais les planches, bien
   documentées »** → `.claude/carte-carcasse-62.workflow.js`, run `wf_17e7d292-79f` (documentation à la
   source dans `suivi/62-documentation-planches.md` et `sources/62-*`, références dans
   `images/references/62/`, silhouette commune `images/planches-src/_carcasse-orignal.js`, carte 62-02,
   puis 62-04 à 62-19, puis renvois, placements et tome 4 réassemblé) ; documentation FAITE (9 sources,
   14 références, 17 planches ; 62-03, 62-21, 62-23 jugées inutiles). **À corriger au texte du ch. 62
   ensuite** (règle 1, la documentation le montre) : « merlan » = gracilis dans le chapitre mais chapeau de
   l'intérieur de ronde pour l'ACIA, l'OQLF et la CEE-ONU ; « nerf central » de la noix de ronde sans
   source ; la nappe nerveuse de l'extérieur de ronde est au bord ventral, pas « sur toute la face externe »
   (section 3 de `suivi/62-documentation-planches.md`) ; **planches FAITES** (17, ≈ 6,3 M), posées ;
   tome 4 : 298 pages ; texte aligné sur la documentation (ch. 62, 63, 64, 81, glossaire) avec les choix de
   JP : « chapeau de l'intérieur de ronde » (plus de « merlan »), « haut de surlonge », « paleron » et
   « palette » gardés, extérieur de ronde fendu avant le sel, « un seul muscle, un seul grain » au sel à sec,
   palette pas au sel sec (saumure gardée : à confirmer par JP) ; page 51 du tome 3 (colonne vide à côté du pékan) : **règle de JP, 29 sept.** — une photo seule à côté d'une colonne vide reçoit une deuxième photo qui a de l'allure sur le même sujet (ici, le pékan lui-même), sinon elle passe en demi ; règle écrite dans design/choix.md, à appliquer à tous les tomes au prochain assemblage. Un
   réassemblage efface `livre/tome-N/apercus/`.

Rendu d'une planche corrigée : `scratchpad/rendre-corrigees.sh <refs>` ; surveillance : `guette-planches.js`.

## ▶ REPRIS le 28 septembre (JP : « lance 1/2/3 ») — 1 et 3 dans un seul workflow

- Planches (22) puis mise en pages et couvertures : `.claude/mise-en-pages-2.workflow.js`, run
  `wf_f996c6cc-d23`, args `scratchpad/args-reste-2.json`. **Crédits photo retirés du livre** (JP) :
  copies hors du livre dans `livre/credits/tome-N-credits.md` ; règle ajoutée à CLAUDE.md.
- Photos manquantes : `.claude/chantiers-restants.workflow.js`, `resumeFromRunId wf_7fa3183a-c91`.
- Si ça s'arrête encore : relancer les mêmes avec `resumeFromRunId` (les agents finis reviennent du cache).
- Les 22 planches : FAITES (toutes les planches demandées sont dessinées).
- **Passe qualité sur 100 % des planches** (345 : 112 validées + 233 à valider), examen seulement, rien
  n'est redessiné : `.claude/passe-qualite-planches.workflow.js`, run `wf_5864f42f-569`, 29 lots de 12
  (args `scratchpad/lots-qualite-court.json`). Verdict par planche (bonne / retouches / à refaire) et
  modifs précises dans `images/passe-qualite/lot-NN.md` ; synthèse à faire dans `images/passe-qualite.md`.
  Ensuite : JP tranche, puis on redessine seulement « retouches » et « à refaire ».
  **FAIT** : 10 à refaire, 260 retouches, 75 bonnes (≈ 6 M). Liste : `images/passe-qualite.md` et page
  https://claude.ai/artifact/DHodwAzeS7E7rojPmCP6dm. **JP : « on va toutes les faire, mais pas là »** —
  à lancer quand il aura des jetons (≈ 25 à 30 M), par lots de 10, chaque dessinateur suivant les modifs de
  sa planche.
  **28 sept. : 50 premières lancées** (JP : « corrige 50 planches, on attaque le reste après ») — les 10 à
  refaire + les 40 retouches les plus graves (mains, gestes fins, mécanismes, couches) :
  `.claude/corriger-planches.workflow.js`, run `wf_b3e1f95a-934`, liste et modifs dans
  `scratchpad/args-corrections-50.json`, journal `images/passe-qualite/corrections.md`, sauvegardes
  `scratchpad/backup-corrections/`. Pour la suite (220 retouches) : même workflow, le LISTE pointant vers un
  nouveau fichier des planches restantes (celles qui ne sont pas dans corrections.md).
- **Photos** : FAIT. Tri : 52 fichiers (`images/photos/tri/`, `registre-tri.md`) ; manquantes : 24 fichiers
  (`images/photos/manquantes/`, mildiou et alternariose du 98, ergot du 88, signes du 43, eau du 10…).
  Introuvables sous licence : environ 45 sujets (listes dans les registres), la plupart sans remplacement,
  quelques-uns en vignette de planche. **Ces nouvelles photos ne sont pas encore posées** : à ajouter aux
  `placements-tome-N.json` avant le prochain assemblage (surveiller le tome 5, à 438 pages).
- **Couvertures** : FAIT, six PDF aux dimensions de Blurb (`livre/tome-N/couverture.pdf`), tranches aux vrais
  comptes ; tome 5 écorce, tome 6 fonte ; variantes mousse et rouille archivées. À valider par JP : les
  quatre nouvelles quatrièmes (arc à feu, attelle d'écorce, verveux, fumoir de baril). Si un tome change de
  nombre de pages : mettre à jour PAGES dans `build_couvertures_6.py` et relancer `rendre_couvertures_6.sh`.
  ISBN : à vérifier au téléversement (livre privé, probablement pas requis).
- **Six tomes assemblés** (livre/tome-N/interieur.pdf, crédits hors du livre dans livre/credits/) :
  332, 416, 332, 284, **438** (2 pages sous la limite de 440), 200 pages ; tranches 0,75 / 0,931 / 0,75 /
  0,681 / 1,0 / 0,5 po. À corriger plus tard : ch. 109 cite l'OMS (attribution), ch. 101 citation en
  anglais, ch. 62 renvoie aux planches 62-02, -03, -04, -21, -23 qui n'existent pas ; 34-01 non posée
  (doublon de 28-01).

## ⏸ PAUSE du 27 septembre au soir (JP manque de jetons) — COMMENT REPRENDRE

Tout ce qui est fini est sur le disque. Arrêtés proprement ; à relancer dans cet ordre quand JP dit « reprends » :

1. **Les 22 planches qui restent** (24-11 à 24-16, 28-01, 38-02, 38-04, 96-01 à 96-05, 99-05 à 99-12) :
   Workflow `scriptPath: .claude/planches-reste.workflow.js`, args = contenu de
   `scratchpad/args-reste-2.json`. Le prompt reprend un dessin interrompu s'il en trouve un. ≈ 4,5 M.
2. **Les photos manquantes** (ch. 10, mildiou du 98, trou du renard…, 10 fichiers déjà dans
   `images/photos/manquantes/`) : Workflow `scriptPath: .claude/chantiers-restants.workflow.js`,
   `resumeFromRunId: "wf_7fa3183a-c91"` (les 11 agents finis reviennent du cache ; seul l'agent des
   photos manquantes repart, avec sa consigne de reprise). ≈ 1 M.
3. **La mise en pages avec les choix de JP** (tome 6 en FONTE, tome 5 écorce, chapitres à droite, 00 en
   tête du tome 1, planches à valider posées, 00 et 00b gardés, polices des symboles, numérotation de
   l'encadré danger, assemblage des six tomes, puis couvertures et tranches aux vrais comptes) :
   Workflow `scriptPath: .claude/mise-en-pages-2.workflow.js` (écrit, **jamais lancé**). ≈ 2 à 3 M.
   À lancer **après** le point 1, pour que toutes les planches soient posées.
4. Ensuite : la passe finale sur 100 % des planches (point 4 plus bas), puis l'épreuve papier d'un tome.

Surveillance et envoi des planches : `scratchpad/guette-planches.js` (mettre le nouveau run dans RUNS),
`scratchpad/envoyer-et-noter.sh <refs>`.

**Fait aujourd'hui, à retenir** : 10 chapitres écrits et levés ; compression des §3 et §4 des 112
chapitres (−119 000 mots, ≈ 170 pages ; 0 ancre de figure cassée) ; ≈ 170 planches dessinées ;
placements des six tomes ; 00 et 00b mis en page et mis à jour ; index et glossaire (`livre/index/`) ;
48 photos du tri téléchargées (41 introuvables sous licence) ; outil d'assemblage et essai du tome 6
(184 pages) ; spécifications Blurb (`sources/blurb-specifications.md`) ; couvertures 5 et 6 (JP : écorce
et fonte).

## LANCÉ le 27 septembre (JP : « tous les chapitres manquants et les planches manquantes, en lots de 10 »)

- Deuxième renumérotation faite : agriculture = 96 à 99 ; semences 100, élevage 101 ; tome 6 = 102 à 112
  (`plan/renumerotation-2.json`, table cumulée `plan/renumerotation.json`, sommaire
  `plan/tomes-6-proposition.md`). Vérification faite : 43 renvois manqués corrigés.
- Les 10 chapitres (24, 28, 29, 34, 37, 38, 96, 97, 98, 99) : **écrits, vérifiés, corrigés** (≈ 14 M ;
  10 500 à 15 600 mots chacun). Tome 2 ≈ 300 p. de texte, tome 5 ≈ 290.
- Levée des 47 `[À VÉRIFIER]` : **faite, 0 restant** ; les 10 chapitres rendus en design C et envoyés à JP.
  Décisions de JP notées dans `suivi/28-redaction.md` et `suivi/29-redaction.md`.
- **REPRIS le 27 septembre** : les 109 planches qui restent (25 du lot final + 84 des nouveaux chapitres)
  dans `.claude/planches-reste.workflow.js` (run `wf_9754316c-fb3`, args `scratchpad/args-reste.json`),
  trois groupes en parallèle, lots de 10. État d'avant la reprise :
- **LANCÉ aussi le 27 septembre, les autres chantiers** (`.claude/chantiers-restants.workflow.js`, run
  `wf_7fa3183a-c91`) : photos du tri (deux agents, l'un après l'autre) puis photos manquantes (ch. 10,
  mildiou du 98, trou du renard au 43…) ; placements des figures, un fichier par tome
  (`design/epreuves-livre/placements-tome-N.json`, à fusionner) ; outil d'assemblage des tomes pour Blurb
  (`design/outils/assembler-tome.py`, essai sur le tome 6, spécifications dans `sources/blurb-specifications.md`) ;
  couvertures des tomes 5 et 6 (couleurs proposées + une variante chacune, à valider par JP) et tablette
  des six tomes ; mise en page à part du 00 et du 00b.
- **Deuxième vague** (`.claude/chantiers-restants-2.workflow.js`, run `wf_1fa78873-4ac`) : inventaire de
  ce qui reste de la fouille et du tri, puis dessin (lots de 10) ; le 00 et le 00b mis à jour pour les
  10 nouveaux chapitres ; vérification de leurs renvois (et des renvois vers eux) ; index et glossaire
  par tome (`livre/index/`), table générale des six tomes.
- **Compression des §3 et §4 de 112 chapitres** (JP : « c'est long pour rien ») : `.claude/compresser-3-4.workflow.js`, run `wf_9132dee3-08c`, lots de 10. Format validé par JP (une ligne de 15 à 20 mots par item, §3 en 3 à 5 phrases), inscrit dans `gabarit-chapitre.md` et CLAUDE.md. Essai : 68 (1 349 → 497 mots), 96 (1 392 → 375). Après : vérifier les ancres de figures (`design/epreuves-livre/placements*.json`) et refaire les rendus C.
- Deuxième vague, texte FAIT : 00b (+18 lignes, décisions de JP dans `suivi/00b-redaction.md`), 00
  (renvois vers les nouveaux chapitres), 1 014 renvois vérifiés dans les 10 nouveaux chapitres, 2 corrigés,
  20 renvois ajoutés vers eux dans 14 chapitres voisins (`suivi/renvois-nouveaux-chapitres.md`) ; 95 §9
  (couche chaude) aligné sur le 97 ; coroner coupé au 35. **À relire au montage** : deux renvois vers un
  numéro de note (37 → note 5 du 29 ; 34 → note 4 du 31) ; la lame au rouge (29 §9-C, le cordon) et la lame
  jamais au rouge (34 §9, l'abcès) ne se citent pas.
- ~~EN PAUSE (limite d'usage atteinte)~~ — deux lots de planches arrêtés :
  - lot final (`.claude/planches-lot-final.workflow.js`, run `wf_fda1753f-f80`, args
    `scratchpad/args-lot-final.json`) : **37 sur 62 faites**, bibliothèque de formes faite ;
  - nouveaux chapitres (`.claude/nouveaux-chapitres-suite.workflow.js`, run `wf_11f62022-106`, args
    `{ groupes, planches: scratchpad/args-nouveaux-chapitres.json }`) : levée faite, **5 planches sur 89**
    (24-01, 24-04, 24-08, 24-09, 24-10). 98-11 le mildiou va en photos, 38-03 la culasse sautée.
  - Surveillance : `scratchpad/guette-planches.js` (RUNS = les deux runs), rendu :
    `scratchpad/envoyer-et-noter.sh <refs>`.
  - À marquer pour la passe finale : 24-01 (vues de dessus illisibles), 13-40 (flèche 9), 13-09 (avant-bras).
- La bibliothèque de mains, personnages et corde, puis 62 planches par lots de 10
  (`.claude/planches-lot-final.workflow.js`) : les 3 d'essai refaites (13-09, 13-40, 60-10), 29 du tri,
  1 de la fouille (95-10), et 29 demandées par les chapitres nouveaux (86, 27, 47, 44, 84, 88, et les
  gabarits d'empreintes grandeur nature du 43).

## 1. Écrire les six chapitres du tome 2 (≈ 6 M ; si le budget est serré, 34 et 28 d'abord)

| # | Chapitre | Ce qu'il couvre |
| --- | --- | --- |
| **24** | Le corps qui travaille | Dos, épaules, tendinites, entorses, ampoules ; le portage au front innu ; la routine qui garde le corps capable de bûcher tout l'hiver. |
| **28** | Les maladies ordinaires qui durent | Otite, infection urinaire, gastro, pneumonie, conjonctivite, zona, fièvre qui ne tombe pas : ce qu'on fait sans médecin, les signes qui disent que la vie est en jeu (en note). Complète le 26 (blessures) et le 30 (épidémie). |
| **29** | La santé des femmes | Menstruations sans achat, contraception quand le stock finit, grossesse, accouchement sans hôpital, après l'accouchement, allaitement. |
| **34** | Soigner avec la forêt, par symptôme | Toux, diarrhée, plaie qui s'infecte, brûlure, douleur, insomnie, poux, gale, mycoses : ce qu'on prend dans le bois et comment on le prépare. Usages innus avec pourquoi ils marchent et leur avertissement. Complète le 33 sans le redire. |
| **37** | Le sauna et le bien-être | Le sauna de baril bâti au chalet ; le sommeil et la lumière de l'hiver. La tente de sudation innue reste hors du livre (cérémonielle). Complète le 36. |
| **38** | Le deuil, le choc et la peur des adultes | Perdre quelqu'un, les conflits enfermés un hiver, l'anxiété, reconnaître quelqu'un qui décroche, ce que le territoire fait au moral. Complète le 36. |

Script : `C:\Users\jeanp\.claude\projects\C--Users-jeanp-New-folder\bed7cfe7-8639-429a-8cfe-5f58e5149259\workflows\scripts\neuf-chapitres-nouveaux-wf_ef24bfb7-d4a.js`
(args : num, titre, tome, fichier, lieu, brief, `reprise: true`), puis `.claude/lever-les-a-verifier.workflow.js`
et `.claude/appliquer-verifications.workflow.js`.

## 1b. L'agriculture, trop mince (constat de JP, 24 septembre) — les quatre chapitres confirmés par JP

Aujourd'hui : un seul chapitre de jardin (95), les semences (100) et le petit élevage (101). JP veut
« comment le monde faisait de l'agriculture naturelle, avec nos saisons ». Quatre chapitres proposés,
au tome 5 après le 95 (le tome a ≈ 80 pages de marge), ≈ 1 M chacun, ≈ 4 M en tout. À écrire avec le
même script que les chapitres du tome 2, puis la levée des [À VÉRIFIER]. Numéros donnés le 27 septembre : 96 à 99, entre le jardin (95) et
les semences (100) ; table `plan/renumerotation-2.json`.

| Chapitre | Ce qu'il couvre |
| --- | --- |
| **Faire la terre sans rien acheter** | Le sol vivant : compost, fumier, cendre de bois, algues du fleuve, poisson et os comme engrais, chaux de coquillages, engrais vert, rotation, jachère ; ouvrir un champ (souches, roches, drainage). |
| **Allonger la saison** | Les 90 à 100 jours de la Côte-Nord : la couche chaude au fumier des anciens, le châssis froid, la serre passive, les semis dans la maison, les buttes, le paillis, le mur de pierre qui garde la chaleur, protéger du gel de septembre, lire les dates de gel. |
| **Ce qui nourrit un hiver** | Les cultures de subsistance et leurs quantités pour quatre : la pomme de terre d'abord, choux, navet et rutabaga, carotte, pois, fèves, oignon, courge ; les céréales à la main (orge, seigle, avoine) — semer, faucher, battre au fléau, vanner — pour le pain (88). |
| **Les façons de faire d'autrefois** | Le potager des habitants, les Trois Sœurs des Iroquoiens du Saint-Laurent (pourquoi elles marchent, et pourquoi le maïs peine à cette latitude), les jardins des postes de traite ; les vivaces et les arbustes fruitiers rustiques (rhubarbe, gadelle, camerise, amélanche, argousier) ; le foin et le pâturage pour les bêtes. Méthodes ancestrales avec leur avertissement ; les croyances (la lune) dites comme telles. |

## 2. Planches — JP choisit d'abord

- **La liste de la fouille** (`images/fouille-planches-oubliees.md`, en anciens numéros) : 25 planches,
  39 pages ; les dix premières ≈ 18 pages, ≈ 2,7 à 3,6 M. En tête : la tente à poêle (12), l'arc
  (45), la sciotte à cadre (106), la raquette de sortie (89), le poêle qu'on répare (82).
- FAIT le 24 septembre : l'arc et la flèche (45-01, 45-02), les 20 planches des savoirs innus (12, 89,
  90) et 28 autres du tri et de la fouille. Il reste de la fouille et du tri : `images/fouille-planches-oubliees.md`
  et `images/tri-images.md` (ce qui n'a pas de PNG dans `images/a-valider/` ou `images/validees/`).
- Le tome 6 (≈ 243 pages) et le tome 5 (≈ 333) ont le plus de place pour des planches.

La passe cotes et qualité se fait **une seule fois, à la fin, sur toutes les planches** : voir le point 4.

## 3. Photos

- **Ch. 43, les traces** : FAIT le 24 septembre, 52 photos (`images/photos/35c/`, registre-35c.md).
  Manquent : le gros plan du brout d'orignal (photo à faire par JP), le trou de plongeon du renard.
  Les empreintes grandeur nature restent, avec une règle de 10 cm sur chaque gabarit.
- **Photos du tri** (76 fichiers, `images/tri-images.md`, liste PHOTO) : en pause, voir le point 4.
- **Photos manquantes** : le 10 (l'eau) en voulait six, aucune trouvée ; d'autres chapitres aussi.
- **Passe beauté** : la plus belle photo permise pour chaque case (iNaturalist, agences américaines,
  photos vedettes de Commons, revues en CC BY), nette et en haute résolution.

## 4. Passe globale finale sur 100 % des planches (à la fin, juste avant la mise en pages)

Demandée par JP le 24 septembre : quand toutes les planches seront dessinées, une passe sur **toutes
les planches, sans exception** (les 110 déjà validées comme les nouvelles), avec **toutes ses
recommandations**, tenues dans `images/recommandations-planches.md` (il y ajoute au fil de sa lecture ;
déjà signalées : 13-09, 13-40, 60-10, 50-10, 112-10, 45-01a). Chaque planche est reprise contre toutes
les règles : qualité du trait, mains et personnages, gestes fins, mécanismes lisibles, coupes en
couches, vrais dessins techniques, cotes en mm sur ce qu'on construit (jamais inventées). Celles qui
passent gardent leur dessin et gagnent ce qui leur manque ; les autres se refont.

**Essai en pause (arrêté le 24 septembre, faute de tokens)** : `.claude/test-mains-fil.workflow.js`.
La bibliothèque `.claude/skills/planches/scripts/formes.js` (mains, personnages, fil) était en cours ;
elle est branchée au compositeur (`h.formes`) sans rien changer aux planches existantes (vérifié sur
74-40). Pour reprendre : relancer le workflow avec `resumeFromRunId: "wf_14bdc311-db6"`. Les trois
planches d'essai (13-09, 13-40, 60-10) n'ont pas été refaites.

**Photos du tri en pause** : l'agent avait monté 176 planches-contact de candidates
(`scratchpad/tri/cand/`) sans rien télécharger encore. À relancer avec la même consigne
(`images/tri-images.md`, liste PHOTO).

Environ 180 planches (≈ 225 pages) à ce moment-là. Coût à estimer et à montrer à JP avant de lancer :
≈ 100 à 200 k par planche refaite, bien moins pour une planche qui ne gagne que ses cotes. Tester
d'abord la nouvelle approche des mains et des gestes fins sur deux ou trois planches signalées.

## 5. Mise en pages du livre

- Monter les 104 chapitres dans le design C, tome par tome, avec `build_chapitre.py` (qui lit le tome
  dans `plan/renumerotation.json`).
- Dire où va chaque planche (`placements.json`, ou « planche NN-XX » dans le texte).
- Une mise en page à part pour le 00 (chapitre principal) et le 00b (achat).
- Numérotation continue des pages par tome, sommaire de tome, crédits à la fin de chaque tome, index.
- **Couvertures des tomes 5 et 6** : deux couleurs nouvelles dans la famille nordique, puis les six
  tranches refaites pour la tablette.
- Livraison chez Blurb par « PDF to Book », dans le navigateur, sans logiciel : un PDF d'intérieur et
  un PDF de couverture par tome ; nombre de pages pair ; texte en noir 100 % (vérifier que le noir
  reste une seule encre, sinon convertir) ; largeur de tranche au calculateur de Blurb.

## 6. Lecture par JP

- Les 12 chapitres écrits le 23 et le 24 septembre (nouveaux numéros 12, 27, 43, 44, 45, 47, 81, 84,
  86, 88, 89, 90), à lui renvoyer dans le design C quand ils seront montés.

## 7. Petits points ouverts — FAIT le 24 septembre

Lièvre 45 km/h aux 47 et 48 ; « la tranchée au feu long » (82) contre « la tranchée bâchée » (12) ;
tétras du Canada = *Canachites canadensis* ; hermine gardée *Mustela erminea* (autorités en désaccord,
noté au glossaire) ; renvoi du 90 au 94 aligné ; ambulance et « alerter » coupés (15, 82) ; arc :
22,7 kg pour l'orignal (45) ; munitions « maison → chalet » au 00b. Doublons non coupés : six tomes
donnent la place.

Ce qui était listé :

- Doublons à couper si la place manque : la fonte du gras (écrite dans cinq chapitres), le bloc
  poisson (75 à 77) qui redit la viande (68 à 71).
- La vitesse du lièvre : 45 km/h au 48, « près de 50 » au 47 ; en garder une, selon la source.
- Le 11 (feu de forêt) et le 12 (tente d'hiver) nomment chacun une « tranchée » différente : préciser.
- Noms latins à trancher au glossaire : tétras du Canada (Falcipennis ou Canachites), hermine.
