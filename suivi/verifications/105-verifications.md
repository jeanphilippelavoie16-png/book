> **Renuméroté une deuxième fois le 27 septembre 2026** (agriculture au tome 5) : chapitre 101 avant cette date. Table : plan/renumerotation-2.json.

> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 82. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Chapitre 82 — Affûter, limer, aiguiser : levée des `[À VÉRIFIER]`

- **Passe du :** 24 septembre 2026 (reprise après la coupure du 23 au soir)
- **Fichier vérifié :** `chapitres/82-affuter-limer-aiguiser.md` (lu, pas modifié)
- **Drapeaux au chapitre :** 11 (lignes 127, 182, 187, 188, 189, 190, 191, 264, 407, 559, 597)
- **Bilan :** 11 drapeaux — **2 LEVÉS** (avertisseur de CO ; longueurs de lime, le grain restant
  introuvable), **2 CORRIGÉS** (angle de la hache ; dents de nettoyage du godendard),
  **7 INTROUVABLES** (angles des couteaux, du ciseau à bois et du burin, en-tête du tableau,
  vinaigre, vitesse des abrasifs de fortune)

« LEVÉ » couvre aussi les drapeaux où le texte n'avait **pas** de valeur et où la source en
fournit une : la colonne « à faire » donne alors la valeur à insérer. La fiche
`82-oqlf-wikipedia-morfil.md` du 23 au soir sert la note sur le morfil, pas un drapeau.

**Contrainte de la passe :** le budget de recherche web de la session était épuisé avant le
chapitre 82. Les sources ci-dessous ont été obtenues par adresse directe (manuels du Service
forestier américain, retrouvés par leur numéro de publication) ; les pages de fabricants de
couteaux et d'outils de menuiserie n'ont pas pu être cherchées.

| # | Où | Verdict | Source | À faire |
| --- | --- | --- | --- | --- |
| 1 | §8 Danger, bloc 4 (génératrice), l. 406-407 : « un avertisseur muet ne prouve pas qu'il n'y a rien : il tolère une faible concentration un certain temps avant de réagir `[À VÉRIFIER]` » | **LEVÉ** — à **30 ppm**, pas d'alarme **avant 30 jours** ; à **70 ppm**, pas avant **une heure**, au plus tard à **quatre heures** ; à **400 ppm**, entre **4 et 15 minutes** | `sources/02-inspq-avertisseurs-co-delais.md` ; `sources/14-inspq-avertisseurs-co.md` (déjà au dossier ; même levée qu'au ch. 10, ligne 1) | « …il tolère une faible concentration longtemps avant de réagir — à 70 ppm, jusqu'à quatre heures ; à 30 ppm, il ne doit pas sonner avant 30 jours —, et ce temps-là est du temps passé à respirer. » Aucun numéro de norme ✔ appliqué |
| 2 | §5-E « Les dents de scie », l. 262-264 : « La hauteur relative des dents de nettoyage d'un godendard est une spécification du modèle et reste `[À VÉRIFIER]`. » | **CORRIGÉ** — ce n'est pas une spécification du modèle : elle se trouve **par essai**, selon le bois. Les dents de nettoyage se liment **plus bas** que les dents de coupe de **0,008 po (0,2 mm) en bois dur ou sec à 0,030 po (0,76 mm) en bois tendre et élastique** ; **0,012 po (0,3 mm)** pour commencer. Mécanisme : le bois comprimé par les dents de coupe rebondit, la dent de nettoyage doit être plus courte de ce rebond. On mesure avec une règle posée sur les deux dents de coupe voisines et une jauge d'épaisseur | `sources/82-usda-fs-hache-et-godendard-affutage.md` (PDF enregistré : `sources/82-usda-fs-crosscut-saw-manual.pdf`) | « Les dents de nettoyage d'un godendard se liment un peu plus bas que les dents de coupe : environ 0,3 mm pour commencer, moins (0,2 mm) en bois dur ou sec, jusqu'à 0,75 mm en bois tendre qui rebondit. Le bon réglage se trouve à l'essai : trop hautes, elles arrachent un copeau barbu ; trop basses, la scie frotte sans vider. On mesure avec une règle posée sur les deux dents de coupe voisines et une cale d'épaisseur glissée dessous. » ✔ appliqué |
| 3 | §5-A, tableau des angles, ligne **Hache, hachette**, l. 189 : « 25 à 30°, biseau **bombé** `[À VÉRIFIER]` », dans la colonne « Angle par côté » | **CORRIGÉ** — la source donne « about 25 degrees, but is slightly convex » pour **l'angle total du tranchant**, mesuré au gabarit en V qui coiffe les deux joues à la fois : environ **12 à 13° par côté**, pas 25 à 30°. Le **bombé** est confirmé (« keeping a rounded profile », « fan-shaped effect on the cheek »), ainsi que le limage sur 5 à 8 cm (2 à 3 po) derrière le fil | `sources/82-usda-fs-hache-et-godendard-affutage.md` (copies : `sources/82-usda-fs-an-ax-to-grind-affutage.html`, gabarit à l'échelle `sources/82-usda-fs-an-ax-to-grind-gabarit-fig68.jpg`) | « Hache, hachette | Environ 25° **au total**, soit 12 à 13° par côté, biseau **bombé** | Le bombé sort du bois au lieu d'y rester coincé ». Mieux encore : donner le gabarit — une encoche en V de 25° découpée dans un carton ou une plaque de laiton, qui doit coiffer le tranchant exactement (voir la note A) ✔ appliqué (gabarit ajouté au §9 « Fabriquer le guide d'angle ») |
| 4 | §5-A, tableau des angles, ligne **Couteau à fileter, couteau de cuisine**, l. 187 : « 15 à 20° `[À VÉRIFIER]` » | **INTROUVABLE** — aucune source officielle ou technique obtenue dans cette passe ne donne d'angle de couteau (les manuels militaires et forestiers consultés n'en donnent pas) | Aucune nouvelle | Voir la ligne 9 : retirer la colonne des degrés pour les couteaux et garder le compromis, qui porte le sens sans chiffre ✔ appliqué |
| 5 | Même tableau, ligne **Couteau de dépeçage, couteau de ceinture**, l. 188 : « 20 à 25° `[À VÉRIFIER]` » | **INTROUVABLE** — même constat que la ligne 4 | Aucune nouvelle | Voir la ligne 9 ✔ appliqué |
| 6 | Même tableau, ligne **Ciseau à bois, fer de rabot**, l. 190 : « 25 à 30° `[À VÉRIFIER]` » | **INTROUVABLE** — la page du CCHST sur les ciseaux à bois ne donne aucun angle (`sources/82-cchst-ciseaux-a-bois.md`) ; aucun manuel obtenu n'en donne | Aucune nouvelle | Voir la ligne 9 ✔ appliqué |
| 7 | Même tableau, ligne **Burin, ciseau à froid**, l. 191 : « 30 à 35° `[À VÉRIFIER]` » | **INTROUVABLE** — le manuel militaire des outils à main (TM 9-243) décrit le burin sans angle d'affûtage | Aucune nouvelle (manuel lu, rien à citer) | Voir la ligne 9 ✔ appliqué |
| 8 | §4 Matériel, phrase d'en-tête, l. 127 : « Ce tableau ne donne **ni longueur de lime, ni numéro de grain** `[À VÉRIFIER]`. » | **LEVÉ pour les limes, INTROUVABLE pour le grain** — hache : limes plates **bâtardes de 8, 10 et 12 po (20, 25 et 30 cm)**, à denture simple, qui ne coupent qu'en poussant ; godendard : **tiers-point effilé de 7 ou 8 po (18-20 cm)**, **plate bâtarde de 6 po (15 cm)**, lime spéciale de godendard de 7 ou 8 po. Pierres : **combinée grossière et fine** ; pierre naturelle **Washita pour dégrossir, Hard Arkansas pour finir**. **Aucun numéro de grain** dans aucune source | `sources/82-usda-fs-hache-et-godendard-affutage.md` (copies : `sources/82-usda-fs-an-ax-to-grind-affutage.html`, `sources/82-usda-fs-crosscut-saw-manual.pdf`) | Retirer la phrase d'en-tête. Dans le tableau : ligne « Lime bâtarde à denture simple, longue » → « Lime plate bâtarde à denture simple, de 20 à 30 cm (8 à 12 po) » ; ajouter au besoin « tiers-point effilé de 18-20 cm pour les dents de scie » ; ligne « Pierre combinée grossier/fin » inchangée, sans numéro de grain — la face grossière refait le profil et enlève les brèches, la fine finit le fil ✔ appliqué |
| 9 | §5-A, en-tête du tableau des angles, l. 182 : « **Les angles.** Tous `[À VÉRIFIER]`. La vraie référence reste le biseau déjà sur l'outil, révélé par le marqueur. » | **INTROUVABLE** pour l'ensemble du tableau, sauf la hache (ligne 3, CORRIGÉ) | Voir lignes 3 à 7 | Garder la méthode du marqueur comme règle et couper les degrés non sourcés : « **Les angles.** La référence est le biseau déjà sur l'outil, révélé par le marqueur : on le suit, on ne le change pas. Le seul angle chiffré ici est celui de la hache, parce qu'une hache abîmée n'a plus de biseau à suivre. » Tableau : garder la colonne « Compromis » et remplacer la colonne des degrés par un ordre, du plus fin au plus ouvert — couteau à fileter et de cuisine, couteau de dépeçage, ciseau à bois et fer de rabot, burin ; hache : 25° au total, bombé ; chaîne : spécification du fabricant ✔ appliqué |
| 10 | §9 « Ressusciter une lime », puce « La mordre à l'acide », l. 557-559 : « Durée et concentration `[À VÉRIFIER]` — trop longtemps, la denture s'arrondit et la lime est finie pour de bon. » | **INTROUVABLE** — aucune source ne donne de durée ni de concentration ; même constat qu'au ch. 12 (ligne 10 de `suivi/verifications/12-verifications.md`) | Aucune nouvelle | Remplacer le chiffre absent par un critère d'arrêt qu'on voit : « Pas de durée fixe : on sort la lime à intervalles, on la rince, on l'essaie sur un bout d'acier doux, et on arrête dès qu'elle mord — trop longtemps, la denture s'arrondit et la lime est finie pour de bon. Le premier essai se fait sur une vieille lime. » ✔ appliqué |
| 11 | §9 « Ce qu'on perd, honnêtement », puce « La vitesse », l. 596-597 : « tout ça travaille trois à cinq fois plus lentement que l'équivalent acheté `[À VÉRIFIER]` » | **INTROUVABLE** — aucune source ne compare la vitesse d'un abrasif de fortune à celle d'une pierre achetée | Aucune nouvelle | Dire la même chose sans le chiffre : « Le sable sur la vitre, le grès de rivière, le cuir chargé de cendre : tout ça travaille beaucoup plus lentement que l'équivalent acheté. Ce qui se refait en minutes au touret prend une veillée. » (retirer aussi « vingt minutes », qui n'a pas de source non plus) ✔ appliqué |

## Notes hors drapeau

**A — La hache, ailleurs dans le chapitre (§5-B).** La source confirme le geste du §5-B et en
ajoute : limer **en poussant seulement** (« The single–cut file sharpens only on the push
stroke »), garder un **profil arrondi en éventail** sur la joue, limer jusqu'au morfil d'un côté
puis de l'autre, puis la pierre. Elle donne un **gabarit** qu'on fabrique : une encoche en V de
25° dans un carton, une plaque de laiton ou un bout de bois, qui doit coiffer le tranchant
exactement. C'est un outil qu'on fabrique avec rien, dans l'esprit du §9 : il a sa place au
§9 « Fabriquer le guide d'angle », et c'est un candidat de planche (ce qui se fabrique se
dessine).

**B — Le touret et la hache.** La même source interdit le touret rapide à sec pour la hache : il
détrempe l'acier sur au moins 3/16 po (environ 5 mm) derrière le fil, et on le voit parce que
l'acier du fil **bleuit**. Le chapitre dit déjà la couleur (§3, §5-F, §6, §7) ; la source confirme
et ajoute une profondeur : au moins 5 mm d'acier à retirer derrière un fil bleui, ce qui
rejoint l'action « meuler en reculant jusqu'à l'acier non coloré » du §7.

**C — Le godendard : la voie.** Le même manuel chiffre la voie : environ **0,25 mm (0,010 po)**
pour une scie d'abattage, **0,38 mm (0,015 po)** pour une scie de tronçonnage, « only as much as
required to keep it from binding ». Le §9 « Avoyer une scie sans avoyeuse » vérifie à l'œil, ce
qui reste juste ; la valeur peut servir de repère au §5-E.
