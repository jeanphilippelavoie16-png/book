> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 66. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 66, Fumage à chaud et séchage

- **Fichier :** `chapitres/66-fumage-a-chaud-et-sechage.md`
- **Tome :** 4 — Conserver et réparer
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (technique) et 4 (sécurité)
- **Ampleur :** ≈ 5 300 mots utiles (6 817 mots bruts, tableaux et citations compris). Procédure
  numérotée en 22 étapes réparties en deux blocs (A — fumage à chaud, B — séchage), six tableaux,
  encadré DANGER à sept points, variante d'urgence complète.
- **Relecture humaine externe : recommandée, non obligatoire.** Le chapitre 66 n'est pas à la
  liste de `CLAUDE.md`. Voir la section 5 ci-dessous.

---

## 0. Ce qu'il faut savoir avant de lire le reste

**Le chapitre repose sur une distinction que le titre ne fait pas.** « Fumage à chaud et séchage »
sonne comme deux façons de conserver. Ce sont deux choses opposées : le fumage à chaud **cuit** et
ne conserve rien, le séchage **conserve** et ne cuit rien. La définition officielle de Santé Canada
— « une température suffisante pour provoquer une coagulation complète des protéines » — est ce qui
permet de l'écrire sans que ce soit une opinion du livre. C'est la trouvaille de la session et
c'est ce qui structure les sections 1, 2 et 3.

**Le trou du dossier.** Aucune page officielle canadienne donnant un palier de chaleur pour la
viande séchée maison n'a été retrouvée. Cinq pistes essayées, toutes documentées dans
`sources/66-nchfp-viande-sechee-palier-de-chaleur.md` :

| Piste | Résultat le 2026-09-20 |
| --- | --- |
| ACIA — contrôles préventifs, produits de viande séchés | **HTTP 410 Gone** |
| USDA FSIS — page « Jerky » | **HTTP 403 Forbidden** |
| USDA AskUSDA — article sur le jerky | échec de certificat TLS |
| Québec.ca — viande de gibier sauvage, chasseurs | répond, **aucune mention de séchage ni de fumage** |
| Québec.ca — températures de cuisson internes | répond, **aucune ligne pour la viande séchée** |

Toute la section 5-B repose donc sur le **NCHFP (University of Georgia)**, un centre universitaire
américain. Le chapitre le dit au lecteur en section 10 plutôt que de faire passer une consigne
américaine pour une consigne canadienne. **C'est la principale faiblesse du chapitre et elle est
réparable par une seule recherche réussie.**

**Contrainte de budget d'appels.** Le budget de `WebSearch` de la session était épuisé avant le
premier appel (200/200). Toutes les sources ont donc été atteintes par `WebFetch` sur des adresses
connues, tirées du dossier `/sources` existant, puis **re-vérifiées de première main le
2026-09-20**. Aucun extrait n'a été recopié d'une fiche antérieure sans confirmation, sauf la fiche
de l'ASPC sur le botulisme, qui est signalée comme telle dans son en-tête. Conséquence : les pistes
de recherche non essayées (MAPAQ, fiches de transformation pour exploitants ; services de
vulgarisation provinciaux hors Québec) restent ouvertes pour une session qui disposera de
`WebSearch`.

**Gain accessoire.** La page française du MAPAQ sur la viande de gibier sauvage a répondu une
seconde fois le 2026-09-20, confirmant le constat de la session du chapitre 24. Les chapitres 7,
11, 12 et 15 citent encore la version anglaise et peuvent maintenant passer au français en
reprenant `sources/66-mapaq-gibier-sauvage-chasseurs.md`.

---

## 1. Les chiffres marqués `[À VÉRIFIER]`

| # | Valeur | Où dans le chapitre | Pourquoi elle n'est pas sourcée | Piste |
| --- | --- | --- | --- | --- |
| 1 | **Taux de sel d'un salage court avant fumage à chaud** | §5-A étape 4, §6 | Aucun barème officiel pour un salage d'assaisonnement avant fumage. Le chapitre **n'avance aucun nombre** et renvoie aux ch. 63 et 64 | À fixer dans les ch. 63 et 64, pas ici. **Vérifier au passage de l'éditeur que le 66 ne se met pas à doser du sel** |
| 2 | **Durée maximale tolérable entre 4 et 60 °C** | §6, ligne « Pendant tout le fumage » | La règle québécoise est une règle de **température**, pas de durée. Aucun nombre d'heures publié retrouvé | **Question n° 2 au relecteur.** Croiser avec le ch. 61, qui a buté sur la même absence |
| 3 | **Perte de poids visée pour une viande séchée stable** | §5-B étape 20, §6 | Aucun barème canadien. Le rapport humidité/protéine employé par le USDA n'a pas pu être capté (HTTP 403) | **Question n° 1 au relecteur.** Mesure de terrain possible : peser un lot témoin à chaque heure et publier la courbe réelle du séchoir de JP |
| 4 | **135 °C (four) et 60 °C (séchoir)** | §5-B étapes 18 et 19 | Conversions de 275 °F et 140 °F du NCHFP. **La conversion n'est pas en cause ; l'origine non canadienne de la valeur l'est** | Remplacer dès qu'un barème canadien est trouvé |
| 5 | **Base de calcul du 9 % de sel de Santé Canada** | §3 | Le texte capté ne dit pas « en phase aqueuse ». Même réserve qu'aux ch. 61 et 62 | Méthode officielle FO-38, à retrouver. **Le chapitre 66 ne convertit rien et ne dose rien avec ce chiffre** |
| 6 | **Transfert de la thuyone du thuya occidental par la fumée** | §8 point 6 | Aucune source. La règle de `CLAUDE.md` sur le cèdre vise les tisanes et les aiguilles, pas la fumée | Présenté dans le chapitre comme **précaution assumée**, pas comme un fait. **Question n° 3 au relecteur** |
| 7 | **Liste des bois interdits** (traité, peint, verni, aggloméré, palette) | §4, §8 point 6 | Mécanisme évident, aucune page officielle retrouvée qui l'énonce pour le fumage alimentaire | Piste : fiches de la CNESST sur la combustion du bois traité ; RBQ |

**Chiffres sourcés et fermes du chapitre** (ne pas les rouvrir sans source contraire) :
**74 °C** à cœur gibier (MAPAQ, Québec.ca) ; **70 °C** poisson (Québec.ca) et « ≥ 70 °C pendant
≥ 1 min » pour les parasites (Santé Canada) ; **82 °C** oiseau entier (Québec.ca) ; **71 °C** de
l'ACIA et du NCHFP, cités pour montrer l'écart, **jamais employés comme cible** ; **63 / 71 /
77 °C** bœuf ; zone de danger **4 à 60 °C** (Québec.ca) ; **3 °C**, pH 5,0 et a_w **0,97** pour
*C. botulinum* non protéolytique ; **10 °C**, pH 4,6 et a_w **0,94** pour les protéolytiques ;
*Listeria* de **-0,4 à 45 °C**, pH ≥ 4,4, a_w ≥ **0,92** (Santé Canada) ; **4 °C** et **14 jours**
pour le poisson fumé réfrigéré (Santé Canada) ; **-18 °C** au congélateur et **7 °C en 24 h** pour
la carcasse (MAPAQ) ; **-20 °C / 7 jours** et **-35 °C / 15 h** pour les parasites du poisson
(Québec.ca, Santé Canada) ; **9 %** de sel (Santé Canada, cité comme ordre de grandeur) ;
**200 ppm**, **120 ppm**, **62 g + 186 g par 100 kg** de nitrite et de nitrate (ACIA) ; **6 mm**
d'épaisseur de lanière et **deux semaines** de conservation (NCHFP) ; **12 à 72 heures**, jusqu'à
**8 jours**, pour le botulisme (ASPC).

---

## 2. Images requises

| # | Format | Sujet | Cadrage demandé | Source |
| --- | --- | --- | --- | --- |
| 66-01 | **Demi-page** | **L'image clé du chapitre.** Deux thermomètres à sonde plantés dans deux pièces de fumoir côte à côte : à gauche l'afficheur lit **45 °C** (la zone de danger), à droite **74 °C** (la cible). Les deux pièces ont **exactement la même couleur rosée** | Macro sur les deux afficheurs, les deux pièces nettes en second plan, même lumière, même distance, prises **dans la même minute**. Aucun filtre, aucune retouche de couleur — c'est la ressemblance des deux viandes qui porte la démonstration, pas les chiffres | Photo de JP. **La plus difficile du chapitre et la plus importante** : elle démolit le jugement à la couleur, qui est l'erreur n° 1 du fumage à chaud |
| 66-02 | **Pleine page** | Planche dessinée : coupe d'un fumoir de baril, foyer séparé, conduit, chambre, grilles, tirage, avec le thermomètre de chambre à hauteur de la viande et un axe vertical des températures qui montre la bande 4-60 °C en rouge et la zone ≥ 60 °C en vert | Planche à dessiner, pas une photo. Vue en coupe de côté. La bande rouge traverse toute la planche. Cotes en mm, l'impérial seulement pour les dimensions de construction | À dessiner. **Ne pas produire avant que le ch. 87 ait fixé les assemblages** |
| 66-03 | **Demi-page** | Séquence du séchage en quatre vignettes : lanières tranchées à 6 mm sur la planche, lanières en marinade au froid, palier de chaleur (thermomètre à 74 °C dans une lanière), lanières séchées sur claie | Même cadre, même distance, même lumière pour les quatre. Règle de 10 cm dans la première vignette. L'afficheur du thermomètre doit être lisible à l'impression dans la troisième | Photo de JP, l'automne |
| 66-04 | **Quart de page** | Deux pots de viande séchée sur le bord d'une fenêtre : l'un clair, l'autre avec de la buée nette sur la paroi | Frontal, contre-jour doux pour révéler la buée, fond neutre, les deux pots identiques et étiquetés. **Photographier 24 h après la mise en pot**, pas plus tard | Photo de JP. Porte à elle seule la ligne « buée = pas sec » du tableau de la §6 |
| 66-05 | **Quart de page** | La claie de séchage à l'air de la §9 : perches écorcées sur quatre fourches, moustiquaire, petit feu fumant en dessous | Trois quarts, recul de 3 m, personne dans le cadre pour l'échelle, fumée visible. Journée de vent et de soleil — une photo de claie par temps gris contredit le texte | Photo de JP, l'été |
| 66-06 | **Quart de page** | La sonde placée correctement : partie la plus épaisse, loin de l'os, loin de la grille — et à côté, la même pièce avec la sonde mal placée contre l'os | Deux vignettes jumelles, plongée à 45°, même pièce, même éclairage | Photo de JP |
| 66-07 | **Quart de page** | Le carnet du fumoir ouvert : une ligne remplie à la main par lot — espèce, date, poids de départ, % de sel, température à cœur atteinte | Plongée à 45°, lumière naturelle, crayon dans le cadre, écriture lisible. Même carnet que la 24-08 pour l'unité graphique | Photo de JP |
| 66-08 | **Quart de page** | Trois échantillons de bois de fumage sur une planche : bouleau à papier, aulne rugueux, cerisier de Pennsylvanie, étiquetés avec le nom français et le nom latin | Plongée verticale, fond neutre, règle de 10 cm, éclairage latéral pour montrer le grain | Photo de JP, ou planche à dessiner si les trois essences ne se ramassent pas en même temps |

**Note pour `images/credits.md` :** aucune image versée. Sept photos maison, une planche à dessiner
(66-02) et une possiblement dessinée (66-08). **La 66-01 exige que les deux pièces soient
photographiées dans la même minute** — deux séances donnent deux couleurs et l'image ne démontre
plus rien.

---

## 3. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 7 | Enfants de 4 et 6 ans : le poisson fumé à chaud est un aliment qu'ils mangent |
| 24 | Mal de caribou : une viande séchée est de la protéine maigre presque pure |
| 25, 30 | Thuyone du cèdre, sapin baumier et épinette noire : la règle vient de là et se répète ici |
| 36 | Abattage et éviscération : c'est là que se décide l'admissibilité d'une pièce au séchage. **Le ch. 36 doit porter le 7 °C en 24 h** |
| 41 | Abats : cadmium du foie et des reins de cervidés. Ni le fumage ni le séchage n'y changent rien |
| 44 | Lièvre d'Amérique : tularémie, gants. Le lièvre est un des meilleurs candidats au séchage, d'où le rappel |
| 48, 52 | Ours noir et phoque : trichinellose. **Les deux chapitres doivent porter le même interdit de séchage que le 66** |
| 53, 55 | Omble de fontaine, éperlan : les espèces du versant poisson |
| 61 | Pourquoi la viande pourrit : barrières, a_w, zone de danger. **Chapitre mère du 66** |
| 62, 63, 64 | Le sel, la salaison à sec, la saumure : **c'est là que se dosent les pourcentages**, pas ici |
| 65 | **Fumage à froid — le chapitre jumeau.** Le 65 conserve sans cuire, le 66 cuit sans conserver. Les deux doivent le dire dans les mêmes termes |
| 67 | Pemmican et graisses : la destination du gras qu'on refuse de sécher, et la correction du mal de caribou |
| 68, 69 | Froid naturel et congélateur qui dégèle : le froid en aval, sans lequel le fumage à chaud ne règle rien |
| 70, 71, 72 | Poisson à la sortie de l'eau, saler et sécher la truite, fumer le poisson. **Recoupement le plus serré du livre : voir la note 3 à l'éditeur** |
| 82 | Affûter : trancher à 6 mm régulier demande un couteau qui coupe |
| 87 | Assemblages bois-bois : la construction du fumoir et de la claie |

**Vérification faite :** tous les numéros ci-dessus existent dans le plan des 89 chapitres. Aucun
renvoi vers un chapitre inventé.

---

## 4. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau de `CLAUDE.md` | Reprise ici ? | Où |
| --- | --- | --- |
| Cuisson du gibier sauvage à **74 °C** à cœur (MAPAQ) | **Oui**, avec la méthode de mesure et, surtout, avec l'avertissement propre à ce chapitre : **la fumée rend la couleur inutilisable comme indice** | §5-A étapes 9 et 10, §6, §7, §8 point 4 |
| Trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent | **Oui — c'est l'interdit central du chapitre**, avec le mécanisme (larve enkystée dans le muscle, le kyste protège de tout sauf de la chaleur) et la conséquence concrète : **on ne sèche ni l'ours ni le phoque**, parce que la viande séchée se mange sèche | §2, §5-B étape 14, §8 point 1, §9 |
| Botulisme de type E : produit sa toxine dès **3 °C**, donc au frigo | **Oui**, avec le mécanisme complet : anaérobiose du sac sous vide + suppression de la pourriture qui aurait averti | §2, §3, §8 point 2 |
| Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence | **Oui**, avec les délais de l'ASPC et les quatre signes neurologiques qui déclenchent la sortie | §7, §8 point 2 |
| **Jamais le foie ni les reins de cervidés** — cadmium (MAPAQ) | **Oui**, hors encadré principal, avec le mécanisme (accumulation à vie, la chaleur n'y change rien) | §8, rappels de fin |
| Tularémie : gants obligatoires à la manipulation | **Oui**, avec le mécanisme (passage cutané à l'écorchage, donc **avant** toute cuisson) et la raison pour laquelle c'est ici : le lièvre est un des meilleurs candidats au séchage | §4 (matériel), §8 point 7 |
| Viande maigre seule = mal de caribou | **Oui**, brièvement, sans délai de mortalité — **le chapitre 24 a établi que ce délai n'est pas sourçable** | §2, §8 rappels de fin, §9 |
| Génératrice : **jamais** dans un bâtiment, un garage ou sous un auvent | **Oui, étendue au fumoir**, avec le mécanisme du CO et le piège propre à ce chapitre : on sent la fumée, donc on croit qu'on sentira le danger | §4, §8 point 5, §9 |
| Thuyone du cèdre toxique — sapin baumier ou épinette | **Oui**, mais **présentée comme une précaution assumée** pour le bois de fumage, parce que le transfert par la fumée n'est pas documenté | §8 point 6, §10 |

**Aucune règle du tableau n'a été écartée.** Les neuf s'appliquent à ce chapitre, ce qui est
inhabituel et s'explique : le chapitre fait du feu dans une boîte, sur de la viande sauvage, pour
en tirer un aliment maigre qu'on mange sans le recuire.

**Écart volontaire à signaler au vérificateur sécurité (rôle 4).** L'encadré DANGER compte **sept
points** plus deux rappels de fin, ce qui est beaucoup et frôle la dilution que le gabarit
interdit. Argument du rédacteur : la procédure **envoie activement** le lecteur vers l'ours, le
phoque, le lièvre, un feu couvert, un sac sous vide et une viande maigre séchée. Un encadré qui
poserait le fumage sans dire où **ne pas** l'appliquer serait incomplet. Les deux rappels de fin
(cadmium, mal de caribou) ont été sortis du corps de l'encadré et regroupés précisément pour que
les sept premiers gardent leur poids. **À arbitrer par le rôle 4** ; si l'encadré doit maigrir, le
point 6 (bois) est le seul candidat, parce que c'est celui dont le mécanisme est le moins létal à
court terme — mais il perd alors sa place et il n'y en a pas d'autre dans le chapitre.

---

## 5. Relecteur humain requis

**Recommandé, non obligatoire.** Le chapitre 66 ne figure pas à la liste des relectures humaines
obligatoires de `CLAUDE.md` — mais les chapitres **65 (Fumage à froid)**, **72 (Fumer le poisson)**,
**62 (Le sel)**, **63 (Salaison à sec)** et **64 (Saumure)** y figurent, et le 66 partage leur
matière.

**Relecteur proposé :** technologue en transformation alimentaire, ou inspecteur en salubrité du
MAPAQ.

Les trois questions sont écrites dans la section 10 du chapitre ; la première bloque la qualité du
chapitre sans bloquer son impression :

1. Existe-t-il un barème **canadien** pour le palier de chaleur et pour la perte de poids d'une
   viande séchée maison ? Si oui, il remplace le NCHFP dans toute la §5-B.
2. La règle de procédé du livre — « la chambre du fumoir est au-dessus de 60 °C, ou la pièce est au
   froid » — est-elle la bonne façon d'énoncer la zone de danger pour un fumage domestique, ou
   existe-t-il une durée tolérée publiée ?
3. Le refus du cèdre comme bois de fumage est-il défendable, ou est-ce une précaution qui ne repose
   sur rien et qu'il vaut mieux retirer que de publier sans appui ?

**Envoyer les chapitres 65, 66 et 72 au même relecteur, en un seul envoi.** Ils partagent la fumée,
les seuils de Santé Canada et le même piège du sous vide. Trois envois séparés donneront trois
réponses incohérentes, exactement comme pour les 24-25-26.

---

## 6. Notes pour l'éditeur

1. **Le titre du chapitre est trompeur et le chapitre le corrige en première ligne.** « Fumage à
   chaud et séchage » laisse croire à deux méthodes de conservation. Ce sont deux choses opposées.
   Si le plan maître permet un sous-titre en page de titre, proposer : *cuire dans la fumée, ou
   retirer l'eau — ce n'est pas la même chose*.
2. **Le chapitre est au-dessus de la fourchette de 2 500 à 5 000 mots utiles** (≈ 5 300). Raison
   assumée : il porte **deux techniques complètes** plus une variante d'urgence, là où les
   chapitres 63, 64 et 65 n'en portent qu'une. Si le tome 4 doit récupérer des pages, le candidat
   est la §5-A, dont les étapes 4 et 5 (sel et salpêtre) pourraient se réduire à un renvoi sec aux
   ch. 62-63-64. **Ne pas couper dans la §8 ni dans la §9.**
3. **Recoupement le plus serré du livre : 66 / 71 / 72.** Le 66 porte le principe (chaleur contre
   retrait d'eau, seuils, palier). Le 71 doit porter le **geste** sur la truite, le 72 le **geste**
   sur le poisson fumé. Si le 71 et le 72 se remettent à expliquer la zone de danger et le
   botulisme de type E, c'est une redite de trois chapitres d'affilée : ils renvoient ici. Même
   avertissement pour le 65, qui doit porter la fumée froide et **seulement** elle.
4. **Le 61 est le chapitre mère et le 66 ne doit pas le doubler.** Le 66 réutilise les seuils
   (3 °C, 0,97, 0,94, 4-60 °C) comme des outils de procédé. Si le 61 et le 66 finissent par
   expliquer deux fois l'activité de l'eau au même niveau de détail, c'est le 66 qui coupe.
5. **La page française du MAPAQ répond de nouveau**, confirmé une seconde fois le 2026-09-20.
   `sources/66-mapaq-gibier-sauvage-chasseurs.md` porte les citations françaises. Les chapitres 7,
   11, 12 et 15 citent encore l'anglais : passe de substitution à programmer, avec le ch. 24 qui
   l'avait déjà signalé.
6. **Budget `WebSearch` épuisé pour la session.** Toutes les sources ont été atteintes par
   `WebFetch` sur des adresses connues et re-vérifiées de première main. Les pistes non essayées
   faute de recherche sont listées au point 0 ci-dessus. **Une session disposant de `WebSearch`
   réglerait probablement le chiffre n° 3 et le n° 7 d'un coup.**
7. **Vague de travail.** La photo 66-01 (deux thermomètres, deux viandes de même couleur) demande un
   fumoir en marche et deux pièces sacrifiées — dont une qui ne se mangera pas, puisqu'elle aura
   séjourné à 45 °C. La commander avec la fenêtre d'automne des ch. 36 à 42, en même temps que la
   24-01.

## Passe légal et signes — 23 septembre 2026

**Aucune phrase de loi, de règlement ou de municipalité** trouvée dans le chapitre. « Gants
obligatoires » (§8, point 7) est le rappel de sécurité du livre, pas une obligation légale : gardé.

**Note de bas de page ajoutée.**

- [^1], §9, « La balance qu'on fabrique », point 2 : **la lanière témoin fendue**, nommée sans
  être décrite (l'étape 20 ne décrivait que le pli). La note dit : refroidir cinq minutes, plier
  en deux, craque sans se casser en deux morceaux ; fendue au couteau, aucune tache humide ni
  partie mal cuite au centre. Sources : Penn State Extension, *Drying Jerky* (M. Zepp, 30 avril
  2024) et NDSU Extension, *Jerky Making: Producing a Traditional Food With Modern Processes*
  (R. Maddock et coll., révisé en mai 2022), captées le 2026-09-23 →
  `sources/66-psu-ndsu-laniere-temoin-test-du-pli.md`. Sources universitaires américaines :
  aucune page canadienne ne décrit ce test. Le geste de fendre la lanière est celui du chapitre ;
  les deux pages disent ce qu'on doit voir au centre.

Doutes de la passe paperasse sur ce chapitre (lignes préfixées `ea` : citation anglaise de
l'étape 22, poids sur l'étiquette de l'étape 20, entaille par lot, palier de 71 °C) : aucun ne
touche au légal ni à un signe non expliqué, laissés tels quels.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/66-verifications.md` (7 drapeaux : 6 levés, 1 introuvable).
Tous appliqués ; plus aucun drapeau dans le chapitre.

- §5-A étape 4 et tableau §6 (fin du salage), salage court du poisson avant fumage à chaud :
  saumure **1 volume de sel de table pour 7 volumes d'eau**, **1 h** pour la plupart des
  filets, **½ h** petit poisson vidé, **2 h** gros morceaux, moins pour maigre ou sans peau —
  `sources/72-osu-pnw238-saumure-et-temperatures.md` (PDF : `sources/65-72-osu-pnw238-smoking-fish-at-home-safely.pdf`).
  Viande : renvoi aux ch. 63 et 64, sans chiffre (le « 3,0 à 3,5 % » du ch. 64 n'est pas
  vérifié : voir la note B des verdicts). Précisé que le pourcentage sur le poids de la
  viande vaut pour le salage à sec, la saumure se dosant en rapport sel/eau
- §5-B étape 20 et tableau §6 (fin du séchage), rendement de la viande séchée : **5 kg frais
  → environ 2 kg** (environ 40 % du poids cru), ordre d'idée et non seuil de sécurité —
  `sources/66-ndsu-rendement-viande-sechee.md` ; test du pli : `sources/66-psu-ndsu-laniere-temoin-test-du-pli.md`
- Tableau §6 (pendant tout le fumage), durée entre 4 et 60 °C : **introuvable** pour la
  viande (règle de température sans durée) — `sources/66-mapaq-zone-de-danger-4-a-60.md` ;
  pour le poisson, cœur **au-dessus de 71 °C en 6 à 8 h** — `sources/72-osu-pnw238-saumure-et-temperatures.md`
- §9 « Le sel du fleuve » : **27 à 29 g/L** de sels dissous en tout ; un kilo de sel demande
  **plus de 35 L** (1 000 ÷ 29 ≈ 34,5) — `sources/13-universite-laval-salinite-saint-laurent.md` ;
  vaporiser coûte **540 cal/g**, plus de cinq fois chauffer de 0 à 100 °C — `sources/13-usgs-chaleur-latente-eau.md`

Compression §3 et §4 — 27 septembre 2026 : 1 465 mots → 242 mots ; matériel coupé : sel à saumure, moustiquaire, grilles et bâtons, contenants hermétiques, papier boucherie, gants, étiquettes et marqueur, couteau et planche, ventilateur, sel nitrite, paragraphe « non négociable ». Gardés : thermomètre à sonde, thermomètre de chambre, fumoir à foyer séparé, bois franc non traité, balance, avertisseur de CO. Déplacé en §8 point 7 : sacs de plastique au poignet faute de gants, et l’écorchure aux mains qui interdit le lièvre.
