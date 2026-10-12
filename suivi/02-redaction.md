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
