> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 02. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Fiche de suivi — Chapitre 2 · Rester ou partir

- **Tome :** 1 — Tenir
- **Fichier :** `chapitres/02-rester-ou-partir.md`
- **Rôle :** 2 — Rédacteur
- **Date de rédaction :** 20 septembre 2026
- **Statut proposé :** `RÉD` — à faire passer aux portes 3 (technique) et 4 (sécurité)
- **Ampleur :** environ 4 700 mots utiles, soit à peu près 7 pages en 8 × 10
- **Gabarit :** les 10 points, dans l'ordre, avec les titres du gabarit
- **Encadré DANGER :** 1 seul, section 8, deux mécanismes nommés (monoxyde de carbone,
  trajet)

---

## 1. Chiffres à valider

| # | Valeur dans le texte | Où | Pourquoi c'est en attente |
| --- | --- | --- | --- |
| 1 | Seuil de température intérieure déclenchant le départ — **aucun chiffre donné**, `[À VÉRIFIER — seuil familial]` | § 5 étape 3, § 6 | Aucun seuil officiel d'évacuation lié à la température intérieure n'existe. Le 18 à 24 °C cité est l'étendue de risque minimal de l'OMS pour une personne sédentaire (INSPQ), pas une limite. Le seuil doit être **choisi par JP et sa conjointe**, écrit sur la fiche de décision, et n'a pas à sortir d'une source. Ne pas laisser un vérificateur « compléter » ce trou avec un chiffre. |
| 2 | Distances et autonomies propres au chalet (→ 138, → essence, → hôpital, durée du trajet enneigé, autonomie à −30 °C) | § 4, § 5 étape 5, § 6 | À mesurer une fois, à froid, par JP. Gabarit de saisie déjà préparé dans `sources/02-quebec511-etat-du-reseau.md`. |
| 3 | Jours de bois sec accessible sans machine | § 6, ligne « Bois sec » | Vient du chapitre 15, pas encore écrit. Le chapitre 2 ne doit pas fixer ce chiffre lui-même. |
| 4 | Marquage du bâtiment évacué : X de ruban rouge ou réfléchissant sur la porte, tissu de couleur vive sur la poignée | § 5 étape 9, point 7 | Consigne municipale de sécurité civile relevée en recherche mais **page non enregistrée** dans `/sources`. Marquée `[À VÉRIFIER]` dans le corps du texte. À trouver, enregistrer, puis retirer la mention. |
| 5 | *Alces americanus* pour l'orignal | § 5 étape 3 | Nom latin à confirmer auprès du ministère responsable de la faune ; la nomenclature a bougé (*Alces alces* vs *Alces americanus*). |
| 6 | Article de la LSCRS portant le pouvoir d'ordonner l'évacuation | § 2, § 5 étape 1 | LégisQuébec a refusé la consultation directe (HTTP 403) le 20 septembre 2026. Le texte se limite volontairement à la formulation générale, **sans numéro d'article**. À compléter par le vérificateur technique. |

### Chiffres sourcés, à confirmer mais non bloquants

Tous portent leur source entre parenthèses dans le texte. Le vérificateur technique les
retrouve dans les fiches de `/sources` :

- 72 h / 3 jours d'autonomie attendue, 6 L d'eau par personne, 3 jours de nourriture non
  périssable (Québec.ca)
- Réfrigérateur 4 à 6 h, congélateur plein 48 h (Québec.ca)
- Moteur d'un véhicule immobilisé : une dizaine de minutes par période de 30 minutes
  (Québec.ca)
- Refroidissement éolien : 10 à 30 min / 5 à 10 min / 2 à 5 min / moins de 2 min, pour
  −28 à −39, −40 à −47, −48 à −54, −55 et moins (ECCC)
- Hypothermie : sous 35 °C, légère 32,2 à 35, modérée 28 à 32,2, grave sous 28
  (Québec.ca)
- 18 à 24 °C, risque minimal pour une personne sédentaire (OMS, citée par l'INSPQ)
- Intelli-feu : 0 à 1,5 m, 1,5 à 10 m, 10 à 30 m, espacement 3 m, élagage 2 m
- Cote air santé, échelle de 1 à 10+ (Santé Canada)
- Centre antipoison du Québec, 1 800 463-5060 (Québec.ca)
- Entrée en vigueur de la LSCRS, 28 mai 2024 (Québec.ca)

### Chiffres qui ne sont pas des faits et qui n'ont pas à être sourcés

Ce sont des **règles de conduite** posées par le livre, pas des données. Le vérificateur
technique ne doit pas partir à la chasse d'une source pour elles, et l'éditeur ne doit
pas les transformer en affirmations de fait :

- « chargement du véhicule en moins d'une heure » (§ 6, § 7) — seuil de conduite. Son
  seul but est de couper le moment où on se met à emporter des biens plutôt que des
  personnes.
- « vérifier chacun aux 30 minutes en route » (§ 6) — rythme de surveillance, calé sur
  le cycle moteur de 10 min par 30 min de Québec.ca pour que les deux gestes tombent
  ensemble.
- « reprendre la décision deux fois par jour » (§ 5 étape 10) — rythme justifié dans le
  texte par la clarté du jour, pas par une source.

---

## 2. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau | Reprise ici | Où |
| --- | --- | --- |
| Génératrice : jamais dans un bâtiment, un garage ou sous un auvent | **Oui**, deux fois : en geste de procédure et dans l'encadré DANGER, avec le mécanisme du CO et la citation exacte de Québec.ca | § 5 étape 8, § 8 |

Les autres règles du tableau (74 °C, cadmium des cervidés, trichinellose, tularémie,
thuyone du cèdre, botulisme de type E, mal de caribou) **ne s'appliquent pas** au
chapitre 2 et n'y sont pas répétées. Le seul contact avec la conservation est le
congélateur de 48 heures, traité comme une horloge et renvoyé au chapitre 69.

---

## 3. Images requises

| # | Format | Sujet | Cadrage |
| --- | --- | --- | --- |
| 1 | **Pleine page** | Arbre de décision du chapitre : ordre des autorités → trois cas qui tranchent seuls → quatre horloges → route → décision → révision | Planche à dessiner, pas une photo. Flux vertical, un seul chemin par branche, les deux sorties « rester » et « partir » clairement à la même hauteur pour qu'aucune ne paraisse être la bonne réponse par défaut. Lisible à bout de bras dans une pièce éclairée à la lampe frontale : pas de texte sous 10 pt. |
| 2 | **Demi-page** | Génératrice installée correctement | Prise de l'extérieur, en plan large, hiver. Le bâtiment occupe le tiers gauche, la génératrice le centre, le cordon visible au sol. La porte et la fenêtre les plus proches doivent être dans le cadre pour que la distance se voie. Photo de JP. |
| 3 | **Demi-page** | Tout ce qui monte dans le véhicule, étalé au sol avant le chargement | À plat, à la verticale, sur une bâche ou la neige tapée. Objets espacés, aucun empilement, échelle donnée par la pelle posée en bordure. Photo de JP. |
| 4 | **Quart de page** | La fiche de décision remplie, collée sur la porte intérieure | Gros plan légèrement en biais, écriture à la main lisible, l'heure de la prochaine décision bien visible. Photo de JP. |
| 5 | **Quart de page** | Avertisseur de CO à piles en place | Gros plan, mur ou plafond visible pour situer la hauteur, voyant allumé. Photo de JP. |
| 6 | **Demi-page** | Le chalet dans son peuplement, vu depuis la lisière | Plan large pris à environ 30 m du bâtiment, à hauteur d'homme, montrant l'état réel des trois zones Intelli-feu — ou leur absence. Idéalement deux prises au même endroit, avant et après dégagement, pour servir aussi au chapitre 16. **À prendre avant la neige.** |

Aucune image prise sur le web n'est proposée pour ce chapitre : toutes sont des photos
de JP ou une planche à dessiner. Rien à inscrire dans `images/credits.md` pour l'instant.

---

## 4. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 1 — Les quatre horloges | Les quatre mesures de l'étape 3 y sont définies. Le chapitre 2 les lit, il ne les explique pas. |
| 3 — Le froid lui-même | Regroupement dans une pièce chauffable, effets du froid sur le jugement. |
| 4 — Panne majeure d'Hydro en janvier | Le cas particulier de la panne prolongée, traité en trois lignes ici et au complet là. |
| 7 — Des enfants de 4 et 6 ans | Ce qu'on surveille chez un enfant plutôt que ce qu'on lui demande. |
| 8 — Le stock permanent du chalet | Substitution de la nourriture non périssable de la trousse. |
| 9 — La liste de 72 heures | La trousse elle-même ; le chapitre 2 n'en donne que les deux chiffres qui servent à décider. |
| 10 — Quand on a un préavis | Le cas où il reste du temps avant de trancher. |
| 13 — Eau : puiser, filtrer, désinfecter | Remplir les contenants, désinfection, accès à la source. |
| 15 — Poêles à bois et rendement | Jours de bois sec restants, pièce chauffable. |
| 16 — Le feu au chalet | Aménagement Intelli-feu, défense du bâtiment. Le chapitre 2 ne fait que dire si le chalet est défendable ou non. |
| 19 — Communiquer et savoir | Moyens de joindre le 911 hors réseau, lien coupé. |
| 20 — Se déplacer et le carburant | Autonomie, trousse du véhicule, conduite hivernale. |
| 21 — Le voisinage et le groupe de chasse | Substitut au 911 dans la variante d'urgence. |
| 27 — Soigner quand il n'y a personne | Urgence médicale qui tranche la décision. |
| 29 — Bâtir la pharmacie | Contenu de la trousse de premiers soins. |
| 31 — Ce qu'on ne peut pas soigner | La blessure qui devient une décision de transport. |
| 33 — Les enfants, la peur et la routine | Comportement inhabituel chez un enfant sous stress et sous froid. |
| 69 — Un congélateur plein qui dégèle | Les 48 heures du congélateur, traitées ici comme une horloge seulement. |

Tous ces numéros existent dans la liste des 89 chapitres. Aucun renvoi inventé.

---

## 5. Relecteur humain

**Non obligatoire** selon la liste de `CLAUDE.md` : le chapitre 2 n'y figure pas.

**Recommandé quand même :** un **coordonnateur municipal en sécurité civile de la
Côte-Nord**, sur deux points seulement — la description des pouvoirs d'évacuation d'une
municipalité en état d'urgence local, et la consigne de marquage d'un bâtiment évacué.
Ce sont les deux endroits où le chapitre décrit ce que font les autorités plutôt que ce
que fait la famille, et c'est là qu'une erreur ferait perdre confiance dans le reste du
livre.

---

## 6. Notes pour l'éditeur (rôle 5)

- **Recoupement à surveiller avec le chapitre 1.** Les quatre horloges sont nommées et
  lues ici, mais volontairement non définies. Si le chapitre 1 est écrit après, vérifier
  que les quatre noms restent identiques : chaleur, eau, nourriture, lien.
- **Recoupement avec le chapitre 9.** Les 6 L d'eau et les 3 jours de nourriture
  apparaissent ici parce qu'ils servent à décider. Si le chapitre 9 reprend la liste
  complète, le chapitre 2 ne doit pas être allongé : il garde les deux chiffres et le
  renvoi.
- **Recoupement avec le chapitre 4 et le chapitre 20.** Les consignes du véhicule
  immobilisé (échappement, fenêtre, 10 min par 30 min) sont un rappel de sécurité qui
  doit rester dans les deux chapitres. Ce n'est pas une redite à couper : quelqu'un
  ouvre le livre au chapitre 2 et n'ira pas lire le 20 avant de partir.
- **Vocabulaire fixé ici**, à reprendre tel quel ailleurs : « fiche de décision »,
  « les quatre horloges », « l'horloge la plus courte commande ».
- La citation exacte de Québec.ca est conservée entre guillemets partout où le mécanisme
  dépend du mot juste. Ne pas paraphraser ces passages à l'édition.

## 7. Notes pour le metteur en pages (rôle 6)

- L'encadré DANGER de la section 8 est long parce qu'il porte deux mécanismes. **Ne pas
  le scinder en deux encadrés** : c'est la même décision qui produit les deux risques.
  S'il ne tient pas sur une page, le couper entre le point 1 et le point 2 avec une
  reprise du titre.
- Le tableau des points de contrôle compte 14 lignes. Il gagne à tenir sur une
  double-page ouverte plutôt qu'à être coupé en deux pages consécutives.
- L'image 1 (arbre de décision) doit tomber en page de droite, face au début de la
  section 5.

## Notes retirées du chapitre — 23 septembre 2026

- Étape 9, point 8 (signalement du bâtiment vide, grand X de ruban sur la porte) : « (consigne municipale de sécurité civile, **[À VÉRIFIER]** — source à enregistrer). » Le marqueur **[À VÉRIFIER]** reste dans le chapitre ; la provenance et la note de travail vivent ici.

## Passe « pas de code légal, signes en bas de page » — 23 septembre 2026

### Légal retiré

- Étape 1 : « il vient d'une autorité qui a le pouvoir de l'émettre » — pouvoir légal
  d'émettre l'ordre. Le mécanisme reste : l'ordre tient compte de ce qu'on ne voit pas depuis
  la fenêtre.
- Étape 5, feu de forêt : « et les interdictions de feu à ciel ouvert » (SOPFEU). La SOPFEU
  reste comme service qu'on consulte pour la situation courante. Règle aussi la ligne SOPFEU de
  `suivi/doutes-passe-paperasse.md`.

### Gardé, à trancher par JP

- Les mentions de la municipalité comme **service** (centre de services aux personnes
  sinistrées, diffusion des avis, inscription à l'arrivée, hôtel de ville ou caserne) sont
  gardées : ce ne sont ni une loi ni un règlement, et elles portent la moitié « maison » de la
  bascule. Si « pas de phrase de municipalité » vise aussi celles-là, elles sont aux sections 2,
  4 (fiche), 5 (étapes 1, 3, 4, 9), 7 et 9.
- « couper l'électricité et le gaz si les autorités le demandent » (étape 9.7) et « attendre
  l'autorisation d'un pompier » (points de contrôle) : consignes d'autorité, pas du code
  légal. Laissées.

### Notes de bas de page ajoutées

| Note | Où | Source |
| --- | --- | --- |
| [^1] les quatre signes | Section 4, tableau Matériel, thermomètre médical | `sources/02-quebec-hypothermie.md` (déjà au dossier) |
| [^2] Cote air santé, plages 1-3, 4-6, 7-10, plus de 10 ; à 7, la population en général est visée | Étape 5, fumée sans feu visible | `sources/16b-eccc-cote-air-sante.md` (reprise, ECCC) |

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/02-verifications.md`, appliqués au chapitre. 6 drapeaux, 0 restant.

- § 4 Matériel, seuil familial de température intérieure : aucun seuil officiel unique n'existe ; repère 18 à 24 °C, risque minimal pour une personne sédentaire. Drapeau retiré, parenthèse « sous 18 °C, on n'est plus dans le risque minimal » ajoutée à la ligne — confirmé, `sources/02-inspq-seuils-temperature-interieure.md`.
- § 6 Points de contrôle, même seuil familial : drapeau retiré — confirmé, même fichier.
- § 5, étape 9, point 8, signal de bâtiment vide : le X de ruban rouge ou réfléchissant et le tissu de couleur vive sur la poignée (sans source) deviennent une feuille sous plastique à la porte (PARTIS, noms, nombre, date, heure) ; tissu blanc à la porte = partis, à la fenêtre = quelqu'un est pris — corrigé, `sources/02-msp-aide-memoire-evacuation-porte.md` (+ PDF), `sources/02-doe-y12-evacuation-tissu-blanc-porte.md` (+ `.html`), `sources/02-cedar-rapids-tissu-a-la-fenetre.md` (+ `.html`).
- § 9, code sol-air : V = besoin d'aide, X = besoin de soins médicaux, confirmés ; ajout de la taille, au moins 8 pi = 2,4 m par signe, et d'une matière qui tranche sur le terrain — confirmé, `sources/02-transports-canada-aim-signaux-sol-air.md` (+ `02-transports-canada-aim-2026-1-sar-fr.pdf`).
- § 9, eau gelée dans la conduite : mécanisme confirmé ; dose ajoutée, 355 mL (12 oz) pour 75,7 L (20 gal), arrondie à « environ 350 mL pour un plein de 75 L », un demi pour cent (calcul : 0,47 %), à chaque plein l'hiver ; l'isopropylique à 99 %, celui à 70 % contenant 30 % d'eau (étiquette du produit) — confirmé, `sources/02-gold-eagle-heet-antigel-conduite.md`.
- § 9, avertisseur de CO : délais ajoutés — à 70 ppm, pas d'alarme avant 60 min, alarme au plus tard à 240 min ; à 30 ppm, pas d'alarme avant 30 jours ; fonction première : éviter les décès, pas toute exposition — confirmé, `sources/02-inspq-avertisseurs-co-delais.md` (+ `02-inspq-avertisseurs-co-tableau1.jpg`), recoupé par `sources/14-inspq-avertisseurs-co.md`. Aucun numéro de norme imprimé.
- Décisions de la chaîne (mal de caribou, essai de la gomme d'épinette) : sans objet, le chapitre n'en parle pas.

Compression §3 et §4 — 27 septembre 2026 : 1094 mots → 238 mots ; matériel coupé : carburant du véhicule (le plein reste aux étapes 5 et 9 et en §6, sa raison, l'eau gelée dans la conduite, en §9), antigel de plomberie non toxique (dosage à l'étape 9 ; « jamais d'antigel à moteur » déplacé à l'étape 9, point 5), tableau à remplir de la fiche de décision, paragraphe des trousses de 72 h et du véhicule (ch. 00b, 6, 15), substituts du tableau (déjà en §9) ; note [^1] supprimée avec son appel (les quatre signes restent à l'étape 6) ; renvoi de l'étape 1 au « tableau du matériel » corrigé.

## Passe d'écriture, premières minutes et logigramme — 15 octobre 2026

Numéros de chapitre **nouveaux** dans cette section. Passe du skill `ecriture` sur tout le chapitre (brief
`passe-t1`, lot p1) ; série orange complétée selon `plan/premieres-minutes-inventaire.md` ; logigramme en double page
sur le modèle du ch. 4.

**Mots :** 7 334 avant, 6 056 après (`controle.py`). **Tirets :** 48 avant, 2 après (titre et ligne de tome).

### La structure

- Les étapes 1 et 2 sont **inversées** : l'alarme de CO ouvre la procédure (étape 1, `{.orange 10 min}`), la radio
  passe à l'étape 2. Les étapes 3 à 10 gardent leur numéro, pour que les renvois du ch. 84 (« ch. 2, étape 9 » et
  « étape 9, point 3 ») restent justes : l'étape 9 est toujours « si on part », son point 3 toujours « prévenir des
  proches ».
- Étapes 8 et 9 marquées `{.orange}` (« la première heure » se lit dans le titre) : elles se suivent et font un seul
  encadré. L'étape 1 fait un deuxième encadré, en tête de la procédure. Entre les deux, la décision (étapes 2 à 7)
  reste en noir : on a le temps de la lire.
- Étape 8 remise dans l'ordre réel : la génératrice et ce qui brûle d'abord, la pièce chauffée ensuite.
- Titres « Étape N — … » : le tiret devient deux-points.

### L'étape 1 étoffée : les faits ajoutés et leur source

| Fait au chapitre | Où | Source (fichier dans `sources/`) |
| --- | --- | --- |
| L'alarme de CO : quatre bips rapides et une pause, aux 5 s chez Kidde ; la fumée : trois bips longs ; un bip seul aux 30 s ou à la minute = pile faible ; un groupe de 2 à 5 bips = fin de vie | Note [^1] | `02-kidde-alarme-co-sortir-rentrer.md` (guide P3010L-CO-CA, PDF `15b-kidde-canada-guide-avertisseur-p3010l-co-ca.pdf`) ; `02-first-alert-bips-avertisseur-co.md` (+ `.html`) |
| Plusieurs personnes avec maux de tête, nausée, étourdissements en même temps : CO jusqu'à preuve du contraire | Étape 1, intro ; §7 | Déjà au chapitre (§7) ; symptômes : `02-quebec-monoxyde-de-carbone.md` |
| Sortir à l'air ; la porte reste ouverte ; ne pas s'arrêter pour ouvrir les fenêtres | Point 1 | Kidde (« outdoors or by an open door/window ») ; même consigne qu'aux ch. 3 et 7 |
| Compter les têtes dehors | Point 2 | Kidde (« Do a head count ») |
| Auto comme abri des enfants : échappement dégagé, fenêtre entrouverte, moteur une dizaine de minutes par 30 min | Point 3 ; §8 | Déjà sourcé au chapitre (Québec.ca, véhicule immobilisé) |
| À l'air libre, la moitié du CO est encore dans le sang 3 à 5 h plus tard | Point 4 | `10-msss-monoxyde-demi-vie-cohb.md` (demi-vie de la COHb : 3 à 5 h à l'air ambiant) |
| Chez un enfant, les signes ressemblent à de la fatigue ou à du mauvais caractère | Point 4 | Renvoi au ch. 40 (§8), qui porte le recoupement (symptômes du CO, Québec.ca ; anxiété de l'enfant, SCP) |
| Inconscient qui respire : sur le côté, surveiller la respiration | Point 4 | `27-anzcor-surveillance-personne-gravement-malade.md` (ANZCOR 9.2.3 : « place the person on their side (Recovery Position) […] frequently check breathing ») |
| SOS de la messagerie satellite ou balise | Point 4 | CLAUDE.md, exception du 24 septembre (les appareils pour être trouvé restent) ; ch. 14 |
| Celui qui va couper la source n'est pas celui qui avait mal à la tête, et il marche : l'effort fait respirer plus vite et absorber plus de CO | Point 5 | `10-msss-monoxyde-demi-vie-cohb.md` (la quantité absorbée dépend du degré d'activité) ; même règle au ch. 7 |
| Génératrice : au moins 6 m du bâtiment | Étape 8, point 1 ; §8 ; logigramme | `20-sante-canada-monoxyde-generatrice.md` (« au moins 6 mètres (20 pieds) »), ancien ch. 20 = ch. 15 |
| L'avertisseur reste dedans : il ne mesure que l'air où il est | Point 6 | Déjà au chapitre (§8 d'avant : « cesse de renseigner dès qu'il est sorti avec nous ») |
| Rentrer quand la maison est aérée et l'avertisseur revenu à la normale (voyant seul, sans son) ; bouton : resonne dans les 6 min = CO encore fort ; un chiffre affiché = du CO | Point 7 | Kidde (guide, conditions de retour, « within six minutes », mode normal) ; `15-kidde-reentree-et-affichage-co.md` (affichage) |
| L'appareil fonctionne entre 4,4 et 37,8 °C | Point 7 | Kidde (« Operating Range ») ; recoupé par `15b-quebec-avertisseurs-monoxyde-plage-temperature.md` (ne pas poser sous 4,4 °C) |
| Ne pas rallumer la source avant d'avoir réglé ce qui a fait le CO | Point 8 | Kidde (« Never restart the source of a CO problem until it has been corrected ») |

Vérifiés pour l'inventaire : antigel par appareil (0,5 L, 1 L, 2 L) et 18 °C de remise en service,
`02-quebec-fiche-technique-panne-plomberie.md` ; congélateur plein 48 h, réfrigérateur 4 à 6 h,
`01-quebec-panne-courant-aliments.md` ; ébullition 1 min, `02-inspq-avis-ebullition.md` ; l'avertisseur muet (70 ppm,
30 ppm, fonction première), `02-inspq-avertisseurs-co-delais.md`.

### Corrigé

- **Étape 3 et §6, la réserve d'eau** : « La trousse en contient 6 L par personne » se lisait comme toute l'eau de
  trois jours. Québec.ca dit 6 L pour boire **plus** 6 L pour la cuisine et l'hygiène, pour au moins trois jours, soit
  4 L par personne et par jour dont 2 L à boire (`23-quebec-reserve-eau-trois-jours.md`, recoupé par
  `13-canada-trousse-urgence.md`, « environ quatre litres, par personne et par jour »). Le ch. 00b dit déjà 4 L.
- **Étape 3 et §9, aliment monté au-dessus de 4 °C plus de 2 h** : le texte disait « ça se cuisine tout de suite ou
  ça se jette » (étape 3) et « ça se cuit tout de suite » (§9). La source du chapitre dit rejet
  (`02-quebec-fiche-technique-panne-plomberie.md`), et le ch. 1 aussi (cuire seulement ce qui est resté à 4 °C ou
  moins, `01-quebec-panne-courant-aliments.md`). Le chapitre dit maintenant : plus de 2 h au-dessus de 4 °C, on
  jette ; dégelé mais resté à 4 °C ou moins, on cuit tout de suite (ch. 1). Le §9 renvoie à l'étape 3.

### Ce qui a été retiré ou déplacé

- « village » (×6) : « la ville », ou la phrase sort. « 4 et 6 ans » (×2) et « un enfant de 4 ans » (×2) : « de jeunes
  enfants », « le plus jeune », ou la phrase sort.
- Les citations de Québec.ca entre guillemets (réfrigérateur, congélateur, « au moins 18 °C », moteur « une dizaine
  de minutes… », symptômes « dans les minutes suivant l'exposition », « Seul un avertisseur… ») : le fait reste, les
  guillemets sortent (skill `ecriture`, les guillemets). La note du §6 de cette fiche (« ne pas paraphraser ») est
  donc levée.
- Formules et phrases sur le livre : « C'est le chapitre de la bascule », « La plus courte commande » (CLAUDE.md),
  « c'est un motif de partir que rien de visible ne signale » (CLAUDE.md), « la possibilité de rester est décidée
  des années d'avance par l'aménagement, pas le jour même par le courage », « Une décision collective reprise toutes
  les vingt minutes est une décision qui n'existe pas », « Quelqu'un qui passe sans voir revient rarement »,
  « C'est le coût le plus lourd de la variante, et le moins visible », « le pire bon conseil qui existe », « Le reste
  du chapitre donne un substitut à tout ».
- Redites : le budget de peau (étape 5) n'est plus recopié au §8 ni au §9 (renvoi « étape 5 ») ; les quatre signes
  d'hypothermie ne sont plus qu'à l'étape 6 (renvois depuis le §2, le §6 et le §9) ; 28 à 32,2 °C reste au §8 seul ;
  le congélateur de 48 h n'est plus redit aux étapes 5 et 9 ni au §9 ; « rien qui brûle ne rentre » est à l'étape 8
  et au §8, plus au §9 ; la ligne « durée du chargement » du §6 (doublon du §7) et la ligne « l'eau coule encore »
  du §7 (doublon du §6) sortent ; « ce qui ne se remplace pas, 2. la mesure de la température corporelle » sort
  (c'est le §4 et le §9, « le thermomètre médical → »).
- La chandelle dans l'habitacle passe du §9 à l'encadré du §8, avec le véhicule immobilisé : c'est le fait qui
  surprend (la chandelle est dans toutes les trousses d'auto), il va une fois, dans l'encadré.
- « *Alces americanus* » et « *Picea mariana* » sortent : décor dans un chapitre de décision.

### Le logigramme

`images/logigrammes/02-rester-ou-partir.json` → `.svg`, `.pdf`, `.png` ; version du livre
`02-rester-ou-partir-livre.svg` (`--sans-entete --svg`). Contrôle : 0 erreur, 6 avis (pointes de flèche à
l'étroit, 10 à 12 pt). Page de gauche : l'alarme de CO (étape 1, en orange) et la décision (étapes 2 à 4), avec deux
encadrés à côté (hypothermie, §2 ; moins de clarté que le trajet, §2). Page de droite : la route (étape 5), où aller
(étape 4), la première heure (étapes 8 et 9, en orange), la génératrice et la panne sur la route (§8), la fumée au
chalet (étape 5), la reprise (étapes 7 et 10). Premier geste : zéro question depuis chacun des deux départs. Ancre
proposée (`passe-t1/ancrages-p1.json`) : « Décider en moins d'une heure » (§1), comme le ch. 4.

### Ce qui reste ouvert

- §9, « une trace de motoneige se remplit en une heure de poudrerie » : le chiffre n'avait pas de source notée ; il
  sort, la phrase dit « se remplit dans la poudrerie ».
- §9, « l'écart [plancher, hauteur d'adulte] est plus grand dans un bâtiment qui refroidit que dans un bâtiment
  chauffé » : sans source, et la physique n'est pas évidente (un poêle qui chauffe fait aussi des couches) ; coupé.
- §9, jauge d'essence morte : « le repère de la fiche vaut ce que vaut l'odomètre » était obscur ; réécrit en « la
  distance comptée aux repères du chemin plutôt qu'au compteur ». À relire par JP.
- Ch. 84 renvoie trois fois à « ch. 2, §9 » pour l'échappement dégagé à chaque redémarrage : ce détail est maintenant
  au §8 (le §9 garde « et l'échappement (§8) »). Les renvois tombent encore juste ; « ch. 2, §8 » serait plus précis.

## Refonte au gabarit final, 19 octobre 2026

Rôle 2, rédacteur. Lu avant : `.claude/cadre-agents.md` au complet, `CLAUDE.md`, le skill `ecriture` au complet (avec
ses tableaux), `gabarit-chapitre.md`, `roles.md`, les ch. 04 et 12 et leurs fiches (`suivi/04-edition.md`,
`suivi/12-technique.md`, `suivi/12-redaction.md`), `plan/dangers-inventaire.md` (section 1 et paragraphe du ch. 02),
`dangers/partie-1.md` et `partie-2.md`, `plan/premieres-minutes-inventaire.md` (ligne du ch. 2), `suivi/plan-de-match.md`
(PAUSE du 15 octobre). Numéros de chapitre **nouveaux** dans cette section. Fichier gardé en LF.

**Aucune page nouvelle cherchée** (JP, 19 octobre : « on a pas déjà fait ce travail-là ? ») : les faits nouveaux
viennent de fiches déjà au dossier, recopiées dans `sources/02-reprises-sources-deja-enregistrees.md`.

### Ce qui a changé

- **Sept sections.** « 3. Pourquoi ça marche » et « 8. Danger » sortent ; le Matériel devient la section 3, la
  procédure la 4, les Points de contrôle la 5, les Signes d'échec la 6, la Variante d'urgence la 7 ; « En plus » à la fin.
- **Sous le titre** : « **Les deux** » seul (la phrase « La décision se prend à la maison ou au chalet, et mène de l'une
  à l'autre » sort).
- **Section 2** : une liste de situations, chacune avec ses étapes ; « C'est la bonne procédure quand » et « C'est la
  mauvaise procédure quand » sortent. Les deux faits de la liste « mauvaise » vont dans leur étape : moins de clarté que
  le trajet → étape 35 ; confus, maladroit, parle mal → étape 40. Les deux paragraphes d'ouverture (court à la maison,
  long au chalet ; le trajet inverse) vont à l'étape 32 et à la ligne « Au chalet, un blessé… » de la section 2.
  « La décision a été prise il y a douze heures et rien n'a été remesuré depuis » sort (maxime, point 6 de la PAUSE) ;
  il reste « L'heure fixée pour reprendre la décision arrive (étape 43) ».
- **Étapes numérotées de 1 à 45**, sans « Étape N : » ni points qui recommencent. Les anciennes étapes deviennent des
  intertitres `###` :

| Avant | Après |
| --- | --- |
| Étape 1, points 1 à 8 (alarme de CO) | Étapes 1 à 8, série orange « L'avertisseur de CO sonne » |
| Étape 8, points 1 à 7 (si on reste) | Étapes 9 à 15, série orange « On reste : la première heure » |
| Étape 9, points 1 à 9 (si on part) | Étapes 16 à 24, série orange « On part : la première heure » (point 3 → étape 18 ; point 5 → 20 ; point 8 → 23) |
| Étape 2 (radio) | Étape 25 |
| Étape 3 (quatre horloges) | Étapes 26 à 30 (une horloge par étape) |
| Étape 4 (délai, où aller) | Étapes 31 et 32 |
| Étape 5 (route ; feu, fumée, panne longue) | Étapes 33 à 36 ; 37 à 39 |
| Étape 6 (passagers) | Étape 40 |
| Étape 7 (trancher) | Étapes 41 et 42 |
| Étape 10 (reprendre à heure fixe) | Étape 43 |
| §8, point 2 et §6 (en route, auto prise) | Étapes 44 et 45 |
| §9 | Section 7, avec des intertitres `###` (« Mesurer sans instrument », « Savoir, quand plus rien n'arrive », etc.) ; les flèches « X → Y » deviennent « Sans X : » |

- **Les trois séries orange en tête de la procédure**, juste après le logigramme (cadre, JP du 18 octobre), dans l'ordre
  CO, on reste, on part ; la décision (étapes 25 à 43) suit, en noir. Les séries « on reste » et « on part » viennent
  donc avant les mesures qui y mènent : le logigramme donne le chemin.
- **Les durées des titres** « (2 minutes) », « (15 minutes) », « (10 minutes) » sortent : sans source, et la décision
  demande de toute façon deux relevés à 2 h d'écart (étape 27).
- **Maximes et formules réécrites** : « Une maison qui perd 1 °C à l'heure et une qui en perd 4 ne posent pas la même
  question » (étape 27, le fait en clair) ; « Un plan qui commence par « j'irais chercher » est un déplacement… » (gardé
  dans la section 6, coupé de l'étape 31) ; « Un trajet qu'on ne peut pas défaire se fait avec le plein et de jour, ou ne
  se fait pas » (étape 35) ; « Le trajet du troisième jour… coûte moins cher que celui du huitième » (étape 32) ;
  « Après douze heures sans mesure, elle est périmée » (sort, étape 43) ; « Un silence non planifié ne déclenche
  rien… » (étape 14) ; « La deuxième décide » (étape 36) ; « pendant que la route existe » (étape 37) ; « Celui qui » ×3
  (étapes 5, 45, section 7) ; « la fatigue décide », « l'anxiété décide » (section 6) ; consignes au pronominal (« se
  jette », « se cuit », « se fait bouillir », « ne se fait pas », « se budgète »).

### Où sont allés les blocs de l'ancienne section 3 (Pourquoi ça marche)

| Bloc | Où |
| --- | --- |
| On retient l'option dont le pire scénario est le moins grave | Étape 41 (titre de l'étape) |
| Le chalet autonome et loin ; la maison, voisins et hôpital, dépend de réseaux ; rester = parier sur un délai de réparation | Étape 32 |
| Le trajet est le seul moment sans aucune des deux protections, à chiffrer contre le prix de rester | Étape 33 |
| Chaque heure d'hésitation retire des options : le froid, la noirceur et la neige ferment la route | Étape 42 |

### Où sont allés les blocs de l'ancienne section 8 (Danger)

| Bloc | Où | Pictogramme |
| --- | --- | --- |
| CO : ni couleur, ni odeur ; hémoglobine ; premiers signes ; on se couche et on ne se réveille pas | Sort : page `co` (dangers/partie-1.md) | `co` à l'étape 1 |
| Avertisseur muet : 70 ppm, 1 à 4 h ; 30 ppm, 30 jours ; réglé pour éviter les décès | Sort : page `co` (« à 70 ppm, il peut prendre jusqu'à 4 h… à 30 ppm, il ne sonne pas avant 30 jours ») | |
| Génératrice : jamais dans un bâtiment, un garage ou sous un auvent ; 6 m, loin des portes et des fenêtres | Étape 9 (déjà là ; la redite sort) | `generatrice`, et `electrocution` pour le disjoncteur principal à OFF |
| Aucun appareil à combustible dedans ; dans une tente, un abri ou une auto, il tue plus vite (petit volume) | Étape 10 ; le petit volume va à l'étape 45 (auto) | `co` aux étapes 10 et 45 |
| Auto immobilisée : la neige bouche l'échappement, le CO monte par le plancher ; dégager avant chaque redémarrage, fenêtre opposée au vent, 10 min par 30 min | Étape 3 (première place où l'auto sert, série orange) ; l'étape 45 et la section 7 y renvoient | |
| Pas de chandelle dans l'habitacle ; la flamme ne change pas devant le CO | Étape 45 | |
| Le trajet : la peau qui gèle (étape 5) ; hypothermie sous 35 °C, 28 à 32,2 °C | Sort : page `froid` (les quatre temps de gel de la peau et les stades). L'étape 34 garde « sous −28, moins de 30 minutes », la cible de la section 5 | `froid` aux étapes 34, 40 et 45 |
| Celui qui décide de laisser l'auto pour marcher décide le plus mal ; rester dans l'auto, feux de détresse, lumière intérieure, bouger | Étape 45 (la raison « la personne qui a froid juge mal » est sur la page `froid`) | |

### Pictogrammes posés (étape → id)

| Étape | Id | Ce que l'étape dit de propre au chapitre |
| --- | --- | --- |
| 1 | `co` | Sortir sans chercher la source ; la série entière est celle du CO |
| 9 | `generatrice`, `electrocution` | 6 m ; disjoncteur principal à OFF avant de la démarrer, appareils branchés dans ses prises |
| 10 | `co` | Aucun appareil à carburant dans la maison où on reste |
| 34 | `froid` | Sous −28, la peau exposée gèle en moins de 30 minutes au bord de la route |
| 37 | `feu-de-foret` | Les trois zones (0 à 1,5 m, 1,5 à 10 m, 10 à 30 m, 3 m, 2 m) ; partir tôt |
| 40 | `froid` | Les signes qui empêchent une personne de voyager et de décider |
| 45 | `froid`, `co` | Rester dans l'auto ; moteur et échappement comme à l'étape 3 ; ni chandelle ni réchaud |
| Section 7, « Si on reste : vider le congélateur » | `cuisson`, `abats` | Orignal à 74 °C à cœur ; jamais le foie ni les reins d'un cervidé (rappels de CLAUDE.md) |
| Section 7, « Faire démarrer l'auto » | `projection` | Batterie à plat gelée : ne pas la survolter ni la charger avant de la dégeler |
| Section 7, « Faire démarrer l'auto » | `vapeurs` | Réchauffer la conduite d'essence sans approcher de flamme |

### Les séries orange et leurs pastilles

| Série | Pastille | Étapes | Ce qui fonde la pastille |
| --- | --- | --- | --- |
| L'avertisseur de CO sonne | 1 min | 1 à 8 | Le temps de sortir (temps du geste), comme la même série au ch. 3 (`suivi/03-redaction.md`, « L'avertisseur de CO sonne », 1 min). La pastille du 15 octobre, « 10 min », n'avait pas de source notée |
| On reste : la première heure | 1 h | 9 à 15 | Le temps des gestes, gardé du 15 octobre (inventaire des premières minutes, « étapes 8 et 9 ») |
| On part : la première heure | 1 h | 16 à 24 | Le temps des gestes : la vidange compte une heure ; le chargement en moins d'une heure est une règle de conduite du livre (section 1 de cette fiche) |

Les faits de la série du CO restent ceux du 15 octobre (tableau plus haut, Kidde, First Alert, Québec.ca). Ce que la page
`co` dit déjà sort de la série : la demi-vie de 3 à 5 h (étape 4 garde « même quand ils se sentent mieux »), l'enfant
qui a l'air fatigué ou de mauvais caractère, la liste des sources de CO, l'effort qui fait absorber plus de CO (l'étape 5
garde « en marchant »). L'étape 2 ajoute, comme la page `co` (point 2) : ouvrir grand la porte en restant dehors avant
d'aller chercher quelqu'un. L'étape 7 garde 4,4 °C, parce que le geste en dépend (refermer et laisser la pièce
remonter).

### Le logigramme

`images/logigrammes/02-rester-ou-partir.json` → `.svg`, `.pdf`, `.png`, et `02-rester-ou-partir-livre.svg`
(`--sans-entete --svg`). Contrôle : 0 erreur, 3 avis (pointes de flèche à l'étroit, 9 à 11 pt ; 6 avis avant).
Colonnes et rangs inchangés, colonnes de droite telles quelles (8,9 à 15,5 po, couloir à 8,7 po). Renvois aux étapes
nouvelles, plus de « § ». Pastille « 1 min » ajoutée sur la première boîte du CO ; « 1 h » gardé sur « Si on reste » et
« Avant de partir » ; « 2 min » et « 15 min » retirés des boîtes non orange. La boîte « Si on reste » ne redit plus
l'avertissement de la génératrice et des appareils à combustible ; elle finit sur l'heure écrite sur la porte. La boîte
« En panne sur la route » garde la décision et le geste du moteur. La boîte du CO (co3) ne dit plus « se couche sur le
côté » ; la boîte de l'hypothermie dit « Il ne doit plus prendre la route ni participer aux décisions ».
Ancre : le logigramme passe de « Décider en moins d'une heure » (section 1) au dernier item du Matériel,
« **Fiche de décision remplie d'avance** » (rendu à l'intégrateur).

### Chiffres et faits nouveaux, et leur source

Tous tirés de fiches déjà au dossier (`sources/02-reprises-sources-deja-enregistrees.md`, extraits recopiés) :

| Fait | Où | Fiche |
| --- | --- | --- |
| Congélateur à moitié plein : 24 h | Étape 29 ; section 5 | `01-quebec-panne-courant-aliments.md` |
| Lait maternisé dans les usages de l'eau bouillie | Étape 28 | `02-inspq-avis-ebullition.md` |
| 20 à 14 °C les premières heures, puis beaucoup plus lent ; masse de la maison ; plus l'écart est grand, plus vite | Étape 27 | `10-schl-refroidissement-maisons-panne-verglas-1998.md` |
| L'été, ouvrir si trop chaud : la chaleur fait en général plus de tort que la fumée | Étape 38 | `02-sante-canada-fumee-feux-de-foret.md` |
| −18 °C : 50 % de la capacité ; gel à −69, −15, −7 °C selon la charge | Section 7, « Faire démarrer l'auto » | `18b-trojan-batteries-plomb-froid-et-charge.md` |
| Batterie gelée : ni survoltage ni charge ; parois bombées, ondulées ou fendues | Section 7, « Faire démarrer l'auto » | `15b-travail-securitaire-nb-batterie-gelee.md` |
| Verdure prête, jetée sur le feu dès qu'on voit ou entend l'avion | Section 7, « Savoir » | `02-transports-canada-aim-signaux-sol-air.md` |
| La bande AM plus loin la nuit (le fait était au chapitre sans source notée) | Section 7, « Savoir » | `03-uitr-p1321-ondes-am-nuit.md` |

Repris tels quels, sans rouvrir la source (déjà vérifiés : sections plus haut) : 6 m, 4,4 °C, 6 minutes, 18 à 24 °C,
4 L et 2 L par personne et par jour, 1 minute d'ébullition, 4 à 6 h et 48 h, 2 h au-dessus de 4 °C, 72 h, zones
Intelli-feu, Cote air santé, antigel par appareil et 18 °C, code sol-air et 2,4 m, 350 mL pour 75 L et 99 %,
10 minutes par 30 minutes, −28 et 30 minutes (page `froid`), 35 °C.

**Sans source notée, gardé tel quel** (ni chiffre ni sens changé ; à sourcer si le vérificateur le demande) : la
flamme de la chandelle qui ne change pas devant le CO et ne jaunit que quand l'oxygène manque (étape 45, au chapitre
depuis septembre).

**`[À VÉRIFIER]`** : aucun dans le texte.

### Notes En plus

| Note | Genre | Étape | Provenance |
| --- | --- | --- | --- |
| Le reste du code sol-air (N, Y, flèche ; LL, F, L, W ; 1 à 5 internationaux, 6 à 9 canadiens) | Fait | Section 7, « Savoir » | `02-transports-canada-aim-signaux-sol-air.md`, tableau 4.2 |
| Trois feux en triangle ; un seul grand feu qui fume attire aussi l'attention | Fait | Section 7, « Savoir » | Même fiche, SAR 4.7.1 |
| Les Innus, en petits groupes sur le territoire (neuf mois par année jusqu'aux années 1950, trois à cinq couples ; rassemblements courts où la nourriture abondait ; chacun apporte son travail) ; ce qui la rend dangereuse : une famille de deux adultes seuls n'a pas cette relève | Façon des Innus | Étape 32 | `38n-ward-2021-innu-territoire-et-bien-etre.md` (article fait avec les communautés de Sheshatshiu et Natuashish) |
| L'onde AM, la nuit (absorbée le jour, réfléchie la nuit ; centaines de km, plus de 1 000 km) | Fait | Section 7, « Savoir » | `03-uitr-p1321-ondes-am-nuit.md` |

Pas de photo : aucune image libre du dossier ne montre quelque chose qu'un parent ne reconnaît pas déjà (la photo d'un
avertisseur de CO, `photos/60/14-avertisseur-co.jpg`, CC0, a été regardée et écartée : elle porte « Call 911 » et une
marque, et n'apprend rien). Aucune ligne pour `images/credits.md`.

### Planches

Aucune planche au chapitre, et le texte n'en appelle aucune. L'audit (`images/audit-planches/tomes-1-2.md`) classe le
code sol-air et les trois feux comme des données, pas des gestes.

### controle.py

| | Avant (texte du 15 octobre) | Après |
| --- | --- | --- |
| Mots | 6 066 | 6 483 |
| Tirets | 2 (titre et ligne de tome) | 2 (les mêmes) |
| « § » | 6 | 0 |
| Tournures (« celui qui », « d'où », « la deuxième décide ») | 6 | 0 |
| Maximes | 2 | 0 |
| Mises en relief | 0 | 0 |
| Mots vides à juger | 34 | 37, jugés : « tout de suite », « tout le monde », « tous les robinets », « encore gelé », « tout va bien » (le code sol-air), « bien avant » portent le sens |
| Redites à juger | 3 (génératrice au §5 et au §8) | 4, jugées : la liste des quatre horloges (section 1 et étape 26, le même mot pour la même chose) ; « reprendre la décision à heure fixe » (section 1 et intertitre) ; « section 7, « Savoir, quand plus rien n'arrive » » dans trois notes (renvois) |

Invariants signalés, justifiés : 30 ppm, 70 ppm, « 5 heures » (3 à 5 h), 32,2 °C, 37,8 °C, et les temps de gel de la
peau (10 à 30 min, 5 à 10, 2 à 5, moins de 2 ; −40 à −47, −48 à −54, −55) sont sur les pages `co` et `froid` ; « 2 minutes »,
« 15 minutes », « 10 minutes » des titres d'étape retirés ; « 1 °C » s'écrit « en perd 1 » (étape 27) ; une mention de
« 6 m », de « 35 °C » et de « ch. 40 » en moins (l'encadré Danger et le signe de l'enfant au CO, sur la page `co`) ;
génératrice 6 → 4 mentions (l'encadré Danger).

### Pour l'intégrateur (fichiers communs, non touchés)

Les ancres, les lignes de l'inventaire des dangers, les « Où il revient » et les renvois des autres chapitres sont
rendus à l'orchestrateur dans la réponse de l'agent.

## Corrections après la vérification technique, 19 octobre 2026

Rôle 2, rédacteur, sur le rapport du vérificateur technique (12 points). Relu avant : `.claude/cadre-agents.md`,
`CLAUDE.md`, le skill `ecriture`, `gabarit-chapitre.md`, la page `co` et la page `projection` (`dangers/partie-1.md`).
**Aucune page nouvelle cherchée** (JP, 19 octobre : « on a pas déjà fait ce travail-là ? ») : chaque correction s'appuie
sur une fiche déjà au dossier, citée par le vérificateur et relue ici.

### Appliqué

| # | Où | Avant | Après | Fiche |
| --- | --- | --- | --- | --- |
| 1 | Section 7, « Faire démarrer l'auto », batterie | Parois bombées, ondulées ou fendues : ne pas la survolter ni la charger **avant de l'avoir dégelée** | Parois bombées, ondulées ou fendues : ne plus la survolter ni la charger, **même une fois dégelée** ; une batterie gelée aux parois intactes dégèle au chaud avant | `15b-travail-securitaire-nb-batterie-gelee.md` (CAA-Québec : « Renoncez au survoltage si ses parois sont ondulées ou gonflées » ; « Paroi bombée ou fendue : elle ne sert plus ») ; `18b-trojan-batteries-plomb-froid-et-charge.md` (« irreparable damage ») ; page `projection`, point 4 |
| 3 | Série du CO | Une série « 1 min » sur les étapes 1 à 8 | « L'avertisseur de CO sonne » `{.orange 1 min}` sur les étapes 1 à 4 ; « Tout le monde est dehors : couper la source et rentrer » `{.orange [À VÉRIFIER]}` sur les étapes 5 à 8. Numéros inchangés. La note [^1] (les bips) ferme la première série, près de son appel | 1 min : le temps de sortir, comme au ch. 3 (étapes 12 et 13). Seconde série : aucune fiche ne donne le temps qu'on a pour couper la source, aérer et rentrer (recherche dans les fiches du CO, Kidde, INSPQ, Québec.ca : rien sur la durée d'aération) ; question à JP |
| 4 | Étape 7 | « L'avertisseur ne fonctionne pas sous 4,4 °C » | « L'avertisseur n'est fait pour fonctionner qu'au-dessus de 4,4 °C » | `15b-kidde-avertisseur-co-bouton-et-temperature.md` (« Operating Range » ; « Extreme temperatures may affect the sensitivity ») ; page `co` (« conçu pour fonctionner […] entre 4,4 et 37,8 °C ») |
| 5 | Étape 27 | La masse de la maison seule explique le ralentissement | « l'écart avec le dehors avait diminué, et le béton, le gypse… » | `10-schl-refroidissement-maisons-panne-verglas-1998.md` (« the temperature differential of indoor to outdoor air is now lower. The thermal mass of the house also plays a role ») |
| 6 | Section 7, « Sans radio à piles » | « une batterie qu'on vide gèle » | « une batterie qu'on vide gèle plus facilement » | `18b-trojan-batteries-plomb-froid-et-charge.md` (tableau 1 : −15 °C à 40 %, −7 °C à 20 %) |
| 7 | Étape 37 | « espacés d'au moins 3 m […] (ch. 82) » | « espacés d'au moins 3 m entre les cimes […] (ch. 11, étapes 49 à 56) » | Ch. 11, étapes 49 à 56 (les trois zones ; étape 55 : 3 m entre les cimes). Le ch. 82 est le feu dans le bâtiment |
| 8 | Étape 20 ; section 5 ; logigramme | « L'hiver, vidanger la maison » (ch. 3) | « L'hiver, vidanger le bâtiment qu'on quitte » (ch. 3 pour la maison, ch. 84 pour le chalet) ; ligne de la section 5 « Avant de quitter le bâtiment l'hiver » ; boîte « Avant de partir » du logigramme | Ch. 84, étape 3 (« Vider les points bas ») |
| 9 | Étape 3 | Pas de pictogramme | `{!co}` en tête de l'étape : l'auto immobilisée (la neige rebouche l'échappement) y est le fait propre au chapitre | `plan/dangers-inventaire.md`, 2.1, « L'auto immobilisée » |
| 10 | En plus, « Les Innus, en petits groupes sur le territoire » | « les Innus » | « les Innus du Labrador » (76 mots) | `38n-ward-2021-innu-territoire-et-bien-etre.md` (Sheshatshiu et Natuashish) |

### Appliqué autrement

- **Point 2, la chandelle (étape 45).** La phrase « La flamme d'une chandelle ne change pas devant le CO : elle ne jaunit
  et ne fume que quand l'oxygène manque » est **coupée**, au lieu d'être remplacée par une phrase `[À VÉRIFIER]`. Raisons :
  aucune fiche au dossier ne porte le fait (NON RETROUVÉ, comme au ch. 12, point 84 de `suivi/12-technique.md`) ;
  « ne jaunit » est faux pour une chandelle et contredit `16c-etudes-monoxyde-tentes-et-abris-de-neige.md` (la flamme
  jaune d'un réchaud fait plus de CO) ; le geste de l'étape (« N'allumer ni chandelle ni réchaud dans l'auto : leur
  flamme fait du monoxyde ») ne dépend pas de cette phrase ; et ce qu'elle voulait dire est déjà dit deux fois avec
  source : la page `co` (« On ne peut détecter le gaz qu'avec un avertisseur de monoxyde ») et la section 7 du chapitre
  (« Ce qui ne se remplace pas », 1 : « aucun sens ne le remplace »). Un `[À VÉRIFIER]` de plus aurait bloqué le tome
  pour une phrase qui n'apprend rien au geste.

### Sans objet dans le chapitre (rendu à l'intégrateur)

- **Point 11, les renvois des autres chapitres.** Le ch. 3 est déjà juste dans le fichier de travail (étape 43 ;
  « étapes 4 à 8 du ch. 2 » ; « ch. 2, étape 4 ») : les lignes 163 et 180 citées par le vérificateur n'existent plus. Le
  ch. 7 est juste. Restent ch. 11 (ligne 118), ch. 40 (ligne 283) et ch. 84 (lignes 389, 421, 452, 458, 548, 627, 723) :
  rendus à l'orchestrateur, avec la correction mot pour mot.
- **Point 12, ch. 14, « (ch. 2, « L'onde AM, la nuit ») ».** Le renvoi n'est plus dans le ch. 14 : le fait y est écrit
  (ligne 144). Rien à faire.

### Le logigramme

`images/logigrammes/02-rester-ou-partir.json` → `.svg`, `.pdf`, `.png`, et `02-rester-ou-partir-livre.svg`
(`--sans-entete --svg`). Pastille « 1 min » gardée sur co1 ; co4 porte la pastille `[À VÉRIFIER]` et ouvre la seconde
série (co4 et co5, étapes 5 à 8) ; boîte « Avant de partir » : « L'hiver, vidanger le bâtiment qu'on quitte ».
Contrôle : 0 erreur, 4 avis (pointes de flèche à l'étroit, 9 à 11 pt ; la pastille de co4 allonge la boîte de 4 pt,
d'où l'avis co4 → co5). Regardé à l'image : rien ne déborde.

### Pictogrammes, à jour

Le tableau « Pictogrammes posés » de la refonte reste juste, avec deux lignes changées :

| Étape | Id | Ce que l'étape dit de propre au chapitre |
| --- | --- | --- |
| 3 | `co` | L'auto qui abrite les enfants : dégager l'échappement avant chaque redémarrage, fenêtre entrouverte du côté opposé au vent, une dizaine de minutes par 30 minutes ; la neige rebouche le tuyau et le CO entre par le plancher |
| Section 7, « Faire démarrer l'auto » | `projection` | Parois bombées, ondulées ou fendues : la batterie ne se survolte ni ne se charge plus, même dégelée ; aux parois intactes, la dégeler d'abord |

L'étape 45 garde `froid` et `co` (rester dans l'auto ; ni chandelle ni réchaud ; moteur et échappement comme à
l'étape 3), sans la phrase de la chandelle.

### Les séries orange, à jour

| Série | Pastille | Étapes | Ce qui fonde la pastille |
| --- | --- | --- | --- |
| L'avertisseur de CO sonne | 1 min | 1 à 4 | Le temps de sortir, comme au ch. 3 (étapes 12 et 13, « 1 min ») |
| Tout le monde est dehors : couper la source et rentrer | `[À VÉRIFIER]` | 5 à 8 | Aucune fiche. Le moteur du livre n'imprime pas de pastille quand le marqueur ne donne pas de chiffre (avertissement au montage) ; le logigramme l'imprime. Question à JP |
| On reste : la première heure | 1 h | 9 à 15 | Inchangé |
| On part : la première heure | 1 h | 16 à 24 | Inchangé |

### controle.py

Comparé au texte d'avant ces corrections (`git show 17487ee^:chapitres/02-rester-ou-partir.md`) : 6 483 mots avant,
6 524 après ; 2 tirets (titre et ligne de tome) ; 0 « § » ; 0 tournure, 0 maxime, 0 pronominal, 0 mise en relief.
Mots vides : 38, jugés (le nouveau « Tout le monde est dehors » porte le sens). Redites : 5, jugées ; la nouvelle,
« une batterie qu'on vide gèle plus » (section 7, deux fois), est le renvoi de « Sans radio à piles » vers « Faire
démarrer l'auto », qui porte les chiffres. Invariants : seul « ch. 82 » disparaît (renvoi faux, remplacé par ch. 11).

**`[À VÉRIFIER]`** dans le texte : 1 (la pastille de la seconde série du CO).

### Repassé le 19 octobre 2026 (seconde remise du même rapport)

Le rapport du vérificateur (12 points) est revenu tel quel. Chaque point relu contre le chapitre tel qu'il est
commité : les points 1, 3 à 10 sont dans le texte (tableau « Appliqué »), le point 2 reste coupé (« Appliqué
autrement »), le logigramme porte déjà les deux séries du CO et « le bâtiment qu'on quitte ». Rien de neuf à appliquer.

- **Seul changement au chapitre** : trois paragraphes remis à la ligne (étape 27, 1re puce ; étape 37 ; section 7,
  « Sans radio à piles »), où une ligne avait été coupée au milieu par la correction précédente. Aucun mot changé.
- **Renvois des autres chapitres, revus sur les fichiers d'aujourd'hui** : ch. 3 juste (l. 139 « étape 43 », l. 150
  « étapes 4 à 8 », l. 307 « étape 4 ») ; ch. 7 juste (étapes 25 à 42, 16 à 24, 20) ; ch. 14 sans renvoi à la note
  « L'onde AM, la nuit » (le fait est écrit l. 146). Restent à corriger par l'intégrateur : ch. 11, l. 118 ; ch. 40,
  l. 283 ; ch. 84, l. 389, 421, 452, 458, 548, 627 et 723 (mot pour mot dans la réponse de l'agent).
- **Fichiers communs** (rendus, non touchés) : l'ancre du logigramme (dernier item du Matériel), le paragraphe du
  ch. 02 de `plan/dangers-inventaire.md` (section 3) aux étapes d'aujourd'hui, la colonne « Chapitres » de la
  section 1 (2 ajouté à `electrocution`, `vapeurs`, `feu-de-foret`, `projection`, `cuisson`, `abats`), la section 2.1
  (la chandelle n'est plus au ch. 2), les « Où il revient » des pages concernées, et le point 4 de la page
  `projection`, qui dit encore « Dégeler une batterie avant de la charger ou de la survolter » sans la batterie aux
  parois bombées (même défaut que le point 1 du vérificateur).
- **controle.py** (contre `git show 17487ee^:chapitres/02-rester-ou-partir.md`) : 6 524 mots ; 2 tirets (titre et
  ligne de tome) ; 0 « § » ; 0 tournure, 0 maxime, 0 pronominal, 0 mise en relief ; 38 mots vides jugés ; 5 redites
  jugées (les mêmes qu'à la correction) ; invariants : seul « ch. 82 » disparaît (renvoi faux, remplacé par ch. 11).

**`[À VÉRIFIER]`** dans le texte : 1, la pastille de la seconde série du CO. Question à JP.
