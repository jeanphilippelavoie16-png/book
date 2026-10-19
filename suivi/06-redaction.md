> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 09. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Fiche de suivi — Chapitre 9, La liste de 72 heures

- **Tome :** 1 — Tenir
- **Fichier :** `chapitres/09-la-liste-de-72-heures.md`
- **Rédigé le :** 2026-09-20
- **Statut :** RÉD — en attente des portes technique et sécurité
- **Longueur :** environ 5 090 mots utiles (chapitre de référence, tables à la place de la procédure numérotée)
- **Encadré DANGER :** oui — quatre blocs (monoxyde de carbone, froid, botulisme, gibier)

---

## 1. Chiffres marqués `[À VÉRIFIER]`

| # | Chiffre | Section | Ce qui manque | Piste |
| --- | --- | --- | --- | --- |
| 1 | Expansion de l'eau au gel, environ 9 % | §5.3 Eau | Valeur physique de manuel, aucune page officielle enregistrée | NRCan, Environnement Canada, ou manuel de physique cité |
| 2 | Cote de température des sacs de couchage hivernaux | §5.4 Chaleur | Les cotes sont des déclarations de fabricant ; aucune norme de santé publique ne chiffre le poste | Norme EN 13537 / ISO 23537 `[à confirmer]`, ou retirer toute cote et décrire le besoin |
| 3 | Butane inutilisable sous 0 °C ; propane utilisable sous -35 °C | §5.4 Chaleur | Constantes physiques non sourcées dans ce chapitre | À régler au **chapitre 14 — Sans propane**, puis reprendre la valeur ici |
| 4 | Piles au lithium primaire plus performantes au froid | §5.6 Lumière | Donnée de fabricant | Fiche technique du fabricant, ou retirer la mention |
| 5 | Sac chargé à 20 à 25 % du poids corporel | §6 Points de contrôle | Règle d'usage, aucune source officielle | CNESST (manutention de charges) ou retirer et remplacer par « ce qu'on porte 30 minutes, testé » |
| 6 | Trousse de véhicule : 2 L d'eau et 1 jour d'aliments par occupant | §5.10 Véhicule | Déduit de l'arithmétique des quantités officielles ; Québec.ca ne chiffre pas la trousse d'auto | Laisser la déduction mais garder la marque, ou trouver une page de la SAAQ / Québec 511 qui chiffre |

---

## 2. Chiffres sourcés — à ne pas toucher sans retourner à la source

| Chiffre | Source | Fichier |
| --- | --- | --- |
| 6 L d'eau potable par personne (trousse, 3 jours) | Québec.ca, trousse d'urgence | `09-quebec-trousse-urgence.md` |
| 6 L + 6 L par personne pour 72 h | Québec.ca, pénurie d'eau potable | `09-quebec-eau-potable-urgence.md` |
| 2 L + 2 L par personne par jour | Santé Canada | `09-sante-canada-eau-aliments-urgence.md` |
| Environ 4 L par personne par jour | Sécurité publique Canada | `09-securite-publique-canada-trousse.md` |
| 1 minute à gros bouillons | Québec.ca | `09-quebec-eau-potable-urgence.md` |
| 2 gouttes (0,2 mL) de javel 5,25 % non parfumée par litre, repos 30 min | Santé Canada | `09-sante-canada-eau-aliments-urgence.md` |
| Eau bouillie : 3 jours au réfrigérateur, 24 h à la température de la pièce | Québec.ca | `09-quebec-eau-potable-urgence.md` |
| Réfrigérateur 4 à 6 h ; congélateur plein 48 h, à demi 24 h ; 0 à 4 °C | Québec.ca / MAPAQ | `09-quebec-aliments-panne-courant.md` |
| Gibier à **74 °C** à cœur ; volaille entière 82 °C ; poisson 70 °C | Québec.ca / MAPAQ | `09-quebec-cuisson-temperatures-internes.md` |
| Génératrice : au moins 6 m de tout bâtiment ; jamais à l'intérieur ; 1 avertisseur de CO à pile de secours | Santé Canada | `09-sante-canada-monoxyde-carbone.md` |
| Indice -28 à -39 : engelure en 10 à 30 min ; -40 à -47 : 5 à 10 min ; -48 à -54 : 2 à 5 min ; -55 et moins : moins de 2 min | Environnement et Changement climatique Canada | `09-environnement-canada-refroidissement-eolien.md` |
| Hypothermie : 3 stades ; danger grave sous 32 °C ; risque de décès sous 30 °C | Santé Canada | `09-sante-canada-froid-extreme.md` |
| Vérification de la trousse 1 fois par an | Québec.ca et Sécurité publique Canada | deux fichiers |
| Médicaments : quelques semaines | Sécurité publique Canada | `09-securite-publique-canada-trousse.md` |
| 911 · Centre antipoison 1 800 463-5060 · Hydro-Québec 1 800 790-2424 · Québec 511 | Québec.ca | `09-quebec-monoxyde-carbone.md`, `09-quebec-panne-courant.md` |

---

## 3. Points à trancher par le vérificateur technique

1. **Tableau du refroidissement éolien** — relevé sur la version anglaise d'Environnement Canada. La page française existe (`canada.ca/fr/services/environnement/meteo/conditionsdangereuses/indice-refroidissement-eolien.html`) mais n'a pas chargé au moment de la consultation, redirections successives. **Transcrire la formulation française officielle, ne pas traduire maison un tableau de sécurité.**
2. **Seuils de 32 °C et 30 °C** de température corporelle (Santé Canada, froid extrême) — relevés dans une synthèse de la page. Confirmer la formulation exacte.
3. **PDF officiel de la trousse d'urgence** du ministère de la Sécurité publique (Semaine de la sécurité civile 2025) — fichier récupéré mais couche texte non extraite, aucun outil PDF sur le poste de rédaction. Confirmer que la liste imprimée correspond mot à mot à la page web.
4. **Numéros de téléphone** — revalider juste avant l'impression du tome, pas maintenant.
5. **Cohérence avec le chapitre 8** — vérifier que le chapitre 9 ne reprend aucun chiffre du stock permanent, et que la frontière « réserve fixe / trousse portable » est dite de la même manière dans les deux chapitres.

---

## 4. Rappels de sécurité du tableau de `CLAUDE.md` répétés dans ce chapitre

| Règle du tableau | Où elle est reprise |
| --- | --- |
| Cuisson du gibier sauvage à **74 °C** à cœur (MAPAQ) | §5.5 Calories et encadré DANGER, bloc « Gibier dans la trousse » |
| **Jamais le foie ni les reins de cervidés** — cadmium (MAPAQ) | §5.5 et encadré DANGER |
| Trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent | Encadré DANGER, bloc « Gibier dans la trousse » |
| Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence | §7 Signes d'échec et encadré DANGER, bloc « Botulisme » |
| Génératrice : **jamais** dans un bâtiment, un garage ou sous un auvent | Encadré DANGER, bloc « Monoxyde de carbone », avec la distance de 6 m de Santé Canada |

Règles du tableau **non reprises** parce qu'elles ne s'appliquent pas à ce chapitre : tularémie du lièvre, thuyone du cèdre, botulisme de type E à 3 °C (spécifique au poisson, chapitres 70 à 72), mal de caribou (renvoi au chapitre 24 seulement).

---

## 5. Images requises

| # | Sujet | Cadrage | Format | Note |
| --- | --- | --- | --- | --- |
| 1 | La trousse complète étalée : 2 bacs, 4 sacs à dos, tout le contenu sorti et rangé par poste (eau, chaleur, lumière, calories, soins, papiers) | À plat, vue de dessus, plein cadre, lumière diffuse, fond neutre uni. Chaque poste séparé par un espace visible pour permettre le numérotage à la mise en pages | **Pleine page** | Photo de JP. C'est l'image de référence du chapitre : elle doit se lire d'un coup d'œil |
| 2 | Le sac d'un enfant de 4 ans, contenu étalé | À plat, vue de dessus, avec un objet d'échelle (une mitaine, une main) | Quart de page | Photo de JP. Montre que c'est petit et que l'enfant le porte |
| 3 | Les deux bacs en place à côté de la porte du chalet, l'hiver, avec la neige visible dehors | Plan large de la pièce, hauteur d'œil, depuis l'intérieur | Demi-page | Photo de JP. C'est l'image qui dit « près de la porte », pas « au sous-sol » |
| 4 | Un bidon d'eau rigide fendu par le gel, et à côté un bidon rempli aux quatre cinquièmes, couché | Gros plan des deux côte à côte, éclairage rasant pour que la fissure se voie | Quart de page | Photo de JP ou mise en scène. Illustre §7 Signes d'échec |
| 5 | La boîte étanche des papiers, ouverte, contenu visible mais **illisible** | Gros plan en légère plongée. Documents flous ou masqués : aucun numéro d'assurance maladie lisible | Quart de page | **Vie privée : vérifier avant impression qu'aucune donnée personnelle n'est déchiffrable** |

Aucune image prise sur le web pour ce chapitre. Rien à inscrire dans `images/credits.md` tant que ce sont des photos de JP — sinon, auteur, licence et lien obligatoires.

---

## 6. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 1 — Les quatre horloges | La trousse est la traduction matérielle des horloges |
| 2 — Rester ou partir | La décision se prend avant d'ouvrir le bac |
| 3 — Le froid lui-même | Conduite de réchauffement, hypothermie, engelures — le chapitre 9 ne donne aucun geste de soin |
| 7 — Des enfants de 4 et 6 ans | Sac par enfant, seuils de froid pour les enfants |
| 8 — Le stock permanent du chalet | Frontière réserve fixe / trousse portable, à énoncer pareillement dans les deux chapitres |
| 11 — Listes par scénario | Ce qui prolonge la trousse au-delà de 72 heures |
| 13 — Eau : puiser, filtrer, désinfecter | Traitement complet ; le chapitre 9 ne donne que l'appoint |
| 14 — Sans propane | Combustible de la chaufferette, butane contre propane par temps froid |
| 17 — Feu sans allumettes | Écorce de bouleau, gomme d'épinette, variante d'urgence |
| 19 — Communiquer et savoir | Radio, batterie, ce qu'on perd sans elles |
| 20 — Se déplacer et le carburant | Trousse du véhicule |
| 24 — Le mal de caribou | Pourquoi le gras est un poste de la trousse, pas un extra |
| 26 — Ce qu'un corps demande l'hiver | **Le chapitre 9 ne donne volontairement aucun chiffre de calories** : ils sont au 26 |
| 28 — Hygiène et eaux usées | Le poste hygiène de la trousse |
| 29 — Bâtir la pharmacie | **Aucune posologie dans le chapitre 9** : elles sont au 29, validées par un pharmacien |
| 33 — Les enfants, la peur et la routine | Sac préparé avec l'enfant, objet de nuit |
| 41 — Abats et organes | Cadmium, foie et reins de cervidés |
| 66 et 67 — Séchage, pemmican et graisses | Viande séchée et gras de la trousse |
| 69 — Un congélateur plein qui dégèle | Les 48 h et 24 h, développés |
| 73 — Conserves et marinades | Botulisme, procédé de mise en conserve |
| 89 — Savon et chandelles | Chandelles de la variante d'urgence |

Tous les renvois pointent vers des chapitres de la liste des 89. Aucun renvoi inventé.

---

## 7. Relecteur humain

**Aucun relecteur externe obligatoire.** Le chapitre 9 ne figure pas dans la liste des chapitres à relecture humaine obligatoire de `CLAUDE.md`.

**Recommandation** à l'éditeur, non bloquante : faire lire le bloc « froid » de l'encadré DANGER par le relecteur de premiers soins en régions isolées déjà prévu pour le **chapitre 3**, puisque les deux chapitres citent les mêmes seuils d'Environnement Canada et de Santé Canada. Un seuil qui diverge entre deux chapitres du même tome est pire qu'un seuil absent. Le chapitre 3 est en vague 4, donc le relecteur sera disponible d'ici huit semaines : rien à devancer.

---

## 8. Notes pour l'éditeur

- Le chapitre atteint la borne haute de l'ampleur visée. Si le tome 1 déborde les 440 pages, les deux sections les plus compressibles sans perte de sécurité sont **§5.10 la trousse du véhicule** (déplaçable en entier au chapitre 20) et **§5.2 ce que la liste officielle ne prévoit pas** (fusionnable avec §2). L'encadré DANGER et §5.3 Eau ne se coupent pas.
- L'argument central du chapitre est que le « 6 litres » affiché partout au Québec est **la moitié buvable** du besoin réel de 4 L par personne et par jour. C'est la trouvaille du chapitre ; le tableau de §5.3 ne doit pas être réduit à une ligne à la mise en pages.
- La date de consultation des sources, 20 septembre 2026, apparaît dans le corps du chapitre pour les numéros de téléphone. Si l'impression est reportée de plus d'un an, revalider ces quatre numéros et mettre la date à jour.
- L'image 5 contient des documents personnels : contrôle de lisibilité obligatoire à l'épreuve, pas seulement au fichier.

## Notes retirées du chapitre — 23 septembre 2026

- §5.4, en tête : « Aucune liste officielle ne chiffre ce poste, parce qu'aucune ne suppose -35 °C sans chauffage. […] Aucune cote n'est donnée ici, parce qu'aucune source officielle n'en valide une. »
- §5.5 : « Les besoins caloriques chiffrés d'un adulte et d'un enfant l'hiver ne sont **pas** donnés ici : ils appartiennent au **chapitre 26**, qui valide aussi ceux du **chapitre 8**. Un chiffre de calories inventé ici se recopierait ensuite dans tout le livre. » (Le chapitre garde seulement le renvoi au ch. 26.)
- §5.8 : « Numéros à inscrire, vérifiés le 20 septembre 2026 ». La date de vérification des quatre numéros reste ici ; voir la note plus haut sur leur revalidation.
- §5.10 : « La page **ne donne aucune quantité**, et ce chapitre n'en invente pas ». (Page Québec.ca, trousse de voiture.)
- §5.3, tableau des sources de l'eau retiré du chapitre (remplacé par une phrase : 4 L/pers./jour, 2 à boire + 2 pour le reste). Conservé ici pour la traçabilité :

  | Source | Ce qu'elle dit | Ramené au jour |
  | --- | --- | --- |
  | Québec.ca, trousse d'urgence | 6 L par personne (pour les 3 jours) | 2 L/pers./jour |
  | Québec.ca, pénurie d'eau potable | 6 L par personne pour la consommation **+ 6 L supplémentaires** pour la préparation des aliments et l'hygiène, pour au moins 72 h | 4 L/pers./jour |
  | Santé Canada | 2 L/pers./jour pour la consommation **+ 2 L/pers./jour** pour la préparation des aliments et l'hygiène | 4 L/pers./jour |
  | Sécurité publique Canada | «environ quatre litres, par personne et par jour » | 4 L/pers./jour |

  Autres provenances retirées du texte : sept articles essentiels = gouvernement du Québec ; médicaments et argent « pour quelques semaines » et vérification « au moins une fois par an » = Sécurité publique Canada ; 6 m de la génératrice, trois stades de l'hypothermie, dose de javel 0,2 mL/L = Santé Canada ; seuils du refroidissement éolien = Environnement et Changement climatique Canada ; trousse de voiture et « jouets ou jeux » = Québec.ca.

## Passe légal et signes — 23 septembre 2026

**Légal retiré :** rien. Aucune phrase de règlement, de code ou de permis dans le chapitre.
Gardés : « municipalité » au §5.2 (décrit le village desservi, pas une règle) et au §5.8 (numéro
qu'on appelle vraiment, au même titre que le 911 et la ligne de pannes).

**Notes de bas de page ajoutées :**
- [^1], §8 encadré Botulisme : **couvercle qui a perdu son vide** — centre creusé vers le bas et
  immobile sous le doigt = vide tenu ; plat, bombé, qui remonte au relâchement du doigt, ou son
  sourd au coup de cuillère = vide perdu. Provenance :
  `sources/09-nchfp-verifier-scellement-couvercle.md` (National Center for Home Food
  Preservation, « Cooling Jars and Testing Jar Seals »). Aucune page de Santé Canada ou du MAPAQ
  trouvée qui décrive ce test.
- [^2], §9.6 : **mal de caribou** — même note qu'aux ch. 38 et 51. Provenance :
  `sources/09-mal-de-caribou-signes.md` (copie de `38-mal-de-caribou-signes.md`). Délai
  `[À VÉRIFIER]`.

**Doutes de la passe paperasse laissés tels quels :** les quatre (tableau de l'eau, impérial de
la génératrice, citations sans organisme, date des numéros) — ni légal, ni signe.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/09-verifications.md`. Six drapeaux, six appliqués.

- §5.3, le gel : **environ 9 % de volume en plus** en gelant. Confirmé. `sources/09-usgs-densite-glace.md` (+ `09-usgs-water-density.html`)
- §5.4, combustible : **butane bout à -0,5 °C, propane à -42 °C** ; ajouté : isobutane des cartouches de camping, **vers -11 °C**. Confirmé (le texte n'avait pas de valeur). `sources/09-cnesst-reptox-butane.md` ; propane : `sources/14-cnesst-reptox-propane.md` ; isobutane : `sources/17-butane-essence-proprietes.md`
- §5.6, piles : **lithium primaire jusqu'à -40 °C, alcaline s'arrête vers -18 °C** (plages du fabricant). Confirmé. `sources/09-energizer-piles-lithium-alcaline-froid.md` (+ `09-energizer-l91-lithium-fiche-technique.pdf`, `09-energizer-e91-alcaline-fiche-technique.pdf`)
- §6, poids du sac : **20 à 25 % → au plus 30 % du poids corporel, et sous 23 kg (50 lb)**. Corrigé. `sources/09-nps-isle-royale-poids-du-sac.md` (+ `09-nps-isle-royale-packing-guide.html`)
- §6, avertisseur de CO : **remplacer à 7 à 10 ans selon le modèle**, depuis la date de fabrication au dos ; **un bip toutes les 30 secondes** en fin de vie. Confirmé ; « la cellule s'use en veillant et non en sonnant » coupé (aucune source). `sources/09-avertisseurs-co-duree-de-vie.md` (+ `09-kidde-remplacement-avertisseur-co.html`)
- Note [^2], mal de caribou : **« diarrhée vers la fin de la première semaine » → fatigue et nausée en quelques jours, diarrhée au bout d'une semaine à dix jours**. Corrigé. `sources/09-hektoen-mal-de-caribou-delais.md` (+ `09-hektoen-rabbit-starvation.html`) ; `sources/09-mal-de-caribou-signes.md`. Revue de médecine et humanités, aucune page officielle ne décrit le déroulement.
- §9.6, corps du texte : « mortel en deux à trois semaines » → **« mortel en quelques semaines »** (décision du livre ; la source dit « after several weeks », aucune fiche ne porte 2 à 3 semaines). `sources/09-hektoen-mal-de-caribou-delais.md`

Compression §3 et §4 — 27 septembre 2026 : 543 mots → 164 mots ; matériel coupé : étiquettes et marqueur (et l'entaille au couteau sur le bac 1), substituts détaillés des bacs (caisse de lait, glacière, carton double), des sacs (taie d'oreiller ; la couverture roulée, la chaudière et le bandeau de portage restent au §9.1) et de la boîte étanche (pot Mason, sacs scellés à la cire : restent au §9.2), colonnes Quantité / Négociable, phrase de renvoi au ch. 00b, paragraphe sur le rangement près de la porte (déjà au §2) et sur l'eau, les médicaments liquides et les piles gardés hors du froid (déjà aux §5.3, §5.5, §5.6 et §7). §3 : exemples chiffrés (1 L = 1 kg, butane) coupés, déjà au §5 ; renvoi au ch. 1 (horloges) coupé. Aucun fait de sécurité n'était seul au §3 ou au §4.

## Refonte au gabarit final, 19 octobre 2026

Rédacteur (rôle 2), lot 05-06-07 du tome 1 final. Lu avant : `.claude/cadre-agents.md` au complet, `CLAUDE.md`, le
skill `ecriture` et ses tableaux, `gabarit-chapitre.md`, `roles.md`, les ch. 04 et 12 et leurs fiches (`suivi/04-*`,
`suivi/12-*`), `plan/dangers-inventaire.md` (section 1, et section 3, ch. 06), `dangers/partie-1.md` et
`partie-2.md`, `plan/premieres-minutes-inventaire.md` (le ch. 6 est dans « Aucun geste urgent »),
`suivi/plan-de-match.md` (PAUSE du 15 octobre). Les numéros de chapitre de cette section sont les **nouveaux**.

**Consigne de JP pour cette refonte** (19 octobre 2026 : « fuck les sources, on a pas déjà fait ce travail-là ? ») :
aucune recherche nouvelle sur le web. Chaque chiffre gardé a sa source dans les sections 2 et « Levée des
[À VÉRIFIER] » plus haut ; chaque chiffre nouveau vient d'une page **déjà enregistrée** dans `sources/` (liste plus
bas). Aucune page nouvelle enregistrée, aucun fichier `sources/06-…` créé (le préfixe 06 des sources est celui de
l'ancien ch. 06, les retombées).

### Ce qui a changé

- **Sept sections** et « En plus ». La note « --- » entre la ligne de tome et la ligne de lieu est retirée (forme
  des ch. 04 et 12). Ligne de lieu : `**Maison**`, gardée ; l'adaptation au chalet est l'étape 4.
- **Section 2** : seulement quand l'utiliser, avec les étapes. La liste « C'est le mauvais outil quand » sort
  (point 4 de la PAUSE). Ce qu'elle apprenait : « trois jours sont un minimum au chalet » va au tableau de
  l'étape 4 ; « on n'emprunte pas à la trousse » est déjà au section 6 ; « vider l'une pour remplir l'autre est la
  faute la plus courante » (sans source) sort. Coupé aussi : le paragraphe sur la maison qui « a l'aqueduc,
  l'égout et des voisins » (justification que le lecteur connaît) et le cas « la maison reçoit du monde » (la
  trousse est faite pour la famille ; la phrase était une formule).
- **Section 3, Matériel** : les trois contenants, une ligne chacun, « § » remplacé par « section 7 ».
- **Section 4, Procédure** : les sous-sections 5.1 à 5.10 deviennent 31 étapes numérotées, sous sept intertitres
  (ranger et répartir, l'eau, le chaud, la nourriture, la lumière, les soins, les papiers, les enfants, l'auto).
  Chapitre de référence : les tableaux restent dans leur étape (étapes 3, 4, 5, 12, 13).
- **Pas de série orange ni de logigramme** : l'inventaire des premières minutes classe le ch. 6 dans « Aucun geste
  urgent », et rien ne s'y décide en branches (la décision de partir est au ch. 2). Question posée à JP (rapport).
- **Variante d'urgence** gardée au complet, mise en sous-sections à titres de choses ; ce qui redisait la
  procédure ou le ch. 10 devient un renvoi (voir « Ce qui sort » plus bas).
- **« En plus »** : quatre notes, toutes tirées de pages déjà enregistrées.
- Mots : « village » (×4) devient « ville » ou sort ; « enfants de 4 et 6 ans » devient « les enfants », « un jeune
  enfant » ; « § » (×3) devient « section » ; « quad » sort ; « naphta » devient « naphte » (le mot des pages des
  dangers) ; les noms latins sortent (*Alces americanus*, *Betula papyrifera*, *Picea mariana*,
  *Clostridium botulinum*) ; les citations entre guillemets des pages officielles deviennent des phrases du livre.
- Fins de ligne : LF, comme avant (0 CR).

### Où est allé l'ancien « Comment ça marche »

| Ancien bloc | Où il est |
| --- | --- |
| « Une trousse préassemblée remplace une décision par un geste… la capacité de choisir s'effondre » | Coupé (justification, image) ; ce qu'il veut dire est la cible du section 5 : le bac sorti en 2 minutes (étape 1) |
| Ce qui sert à la minute (chaleur, lumière, papiers) et dans la journée (eau, calories, soins) | Étape 2, répartition sacs, bac 1, bac 2, boîte |
| « Ce qui pèse va au bac, pas au dos » | Étape 2 et étape 5 (« On ne porte pas ce poids à pied ») |
| Le froid met hors d'usage l'eau liquide, les piles alcalines et le butane | Étapes 7 (eau), 18 (piles), 10 (butane) ; la formule « une trousse d'hiver n'est pas une trousse d'été… » sort |
| « Une trousse qu'il faut assembler est une trousse qu'on n'a pas… le seul test… » | Maxime coupée ; le test est au section 5 (bac en 2 minutes, souper et nuit sur la trousse) |

### Où est allé l'ancien Danger, et les pictogrammes

| Ancien bloc | Où il est | Pictogramme |
| --- | --- | --- |
| CO : mécanisme (combustion incomplète, sans odeur, hémoglobine, on s'endort) | Page `co` du tome ; pas redit | |
| CO : génératrice dans un bâtiment, 6 m | Page `generatrice` ; la génératrice ne fait pas partie de la trousse | |
| CO : barbecue, réchaud, appareil au charbon à l'intérieur | Étape 11 | `co` |
| CO : un avertisseur à pile dans chaque pièce où on dort ou chauffe | Étape 11 ; essai au changement d'heure : section 5 | `co` |
| CO : le bouton teste la sirène, pas la cellule | Page `co` ; coupé de la ligne du section 5 | |
| CO : s'il sonne, sortir, compter les têtes, ne pas chercher | Page `co` | |
| CO : chandelle de survie dans l'auto fermée, fenêtre entrouverte ; échappement dégagé | Étape 31 et sa puce | `co`, `generatrice` |
| Froid : temps de gel de la peau selon le refroidissement éolien | Page `froid` (mêmes chiffres) ; l'étape 12 garde le tableau des gestes, sans les temps | `froid` |
| Froid : trois stades, « sous 32 °C, sous 30 °C », quelqu'un d'autre décide, l'enfant qui devient tranquille | Page `froid`. Les seuils 32 et 30 °C sortent : la page donne 35, 32,2 et 28 °C, d'une autre source ; on ne garde pas deux jeux de seuils dans le tome | |
| Botulisme : mécanisme, conserve bombée à jeter sans goûter, doute sur la provenance | Page `botulisme` ; la ligne du section 6 renvoie à l'étape 16 | |
| Botulisme : le gel ne détruit pas la toxine ; conserve gelée sortie de la trousse ; note du vide (note 1) ; le botulisme ne change ni l'odeur, ni le goût, ni l'apparence | Étape 16 | `botulisme` |
| Gibier : 74 °C à cœur ; ni sel, ni fumée, ni gel contre la trichine | Étape 14 ; le thermomètre au centre, sans l'os ni le gras : page `cuisson` | `cuisson`, `trichine` |
| Gibier : jamais le foie ni les reins de cervidés, cadmium | Étape 15 | `abats` |

Pictogrammes ajoutés là où le danger se présente, hors de l'ancienne section Danger :

| Où | Pictogramme | Ce qui est propre au chapitre |
| --- | --- | --- |
| Étape 24 | `poison` | La dose d'un enfant se calcule sur son poids, pas sur son âge (la double dose par deux boîtes est dans la page) |
| Section 7, « La roche du poêle » | `projection` | La roche prise au bord de l'eau éclate en chauffant |
| Section 7, « Le combustible de fortune » | `pas-au-feu` | La liste de ce qu'on brûle dans une maison : branches, planches brutes, meubles non vernis ; jamais palettes, bois traité, peint, verni, contreplaqué, carton ciré, plastique |
| Section 7, « Le gras » | `mal-de-caribou` | Quand on rationne, réduire tout le reste avant le gras ; mortel en quelques semaines (rappel du tableau de `CLAUDE.md`) |
| Section 7, « Cuire sans cuisinière » | `co`, `projection` | Le réchaud de fortune dehors seulement ; ouvrir la conserve avant de la chauffer |

Rappels du tableau de `CLAUDE.md` présents : 74 °C (étape 14), foie et reins de cervidés (étape 15), trichine
(étape 14), botulisme sans odeur ni goût (étape 16), mal de caribou (section 7, « Le gras »). La génératrice
(« stock, carburant, électricité ») ne s'applique pas : la trousse n'en a pas ; le moteur de l'auto porte
`generatrice` (étape 31).

### Corrections de fond faites pendant la refonte (contradictions avec d'autres chapitres)

1. **Le combustible de fortune** brûlait « palettes défaites, planches de remise, meubles, clôture ». La page
   `pas-au-feu` interdit au poêle les palettes et le bois traité, peint, verni ou aggloméré. Corrigé : bois sec ni
   traité, ni peint, ni verni, ni collé ; palettes dans la liste de ce qui ne va jamais au poêle. Le carton
   « trempé dans du gras fondu » devient « dans de la cire fondue » (page `mal-de-caribou` : le gras se mange
   quand il manque).
2. **La radio** : « l'écouteur haute impédance … ne se bricole pas avec ce qu'il y a dans une maison », alors que le
   ch. 4 (section 7, « Sans radio à piles ») donne la pastille piézo d'un avertisseur de fumée brisé, et le poste de
   l'auto. Le paragraphe sort de « Ce qui ne se remplace pas » ; « La radio » renvoie au ch. 4.
3. **L'ébullition** : « une minute à gros bouillons » pour toute eau, neige fondue comprise. Le ch. 10 (étape 14)
   donne 5 minutes pour l'eau d'un lac, d'un ruisseau ou de la neige (tularémie). Étape 6 alignée ; source :
   `sources/46-quebec-tularemie.md` (« bouillie pendant cinq minutes »), provenance au `suivi/10-redaction.md`.
4. **L'attente après la javel** : « 30 minutes » partout ; le ch. 10 (étape 21) allonge l'attente dans l'eau
   froide. Étape 6 : « plus longtemps dans une eau froide (ch. 10, étape 21) ». L'odeur de chlore et le redosage
   renvoient au ch. 10, étapes 21 et 22, au lieu de « on recommence ».
5. **La viande séchée d'orignal** « sèche, salée, stable » dans une trousse vérifiée une ou deux fois par année. Le
   ch. 71 (étape 22) : la viande séchée maison se garde deux semaines à la température de la pièce dans un
   contenant fermé. Étape 13 : la garder au congélateur et la mettre dans la trousse au départ.
   Source : `sources/66-nchfp-viande-sechee-palier-de-chaleur.md` (aussi `89b-nchfp-viande-sechee.md`).
6. **Le chauffe-eau** : ajout de « couper le disjoncteur du chauffe-eau électrique, et ne le remettre sous tension
   qu'une fois plein », comme au ch. 3 (étapes 23 et 37 aujourd'hui) ; le reste de la vidange découpé en gestes
   (règle du ch. 3, point 13 de la PAUSE). Le ch. 10, étape 49, renvoie ici pour le vider.
7. **La courroie de front** : la charge « appuyée en haut du dos » devient « au creux des reins », comme le ch. 24
   (étape 15) ; la tête doit pouvoir sortir de la courroie (ch. 24, étape 18). Renvoi au ch. 24.
8. **Le réchaud de fortune** « dehors, ou sous une hotte qui tire » : la hotte de la cuisinière ne tire pas sans
   courant ; « dehors seulement ».

### Chiffres nouveaux et leur source (pages déjà enregistrées)

| Chiffre | Où | Source |
| --- | --- | --- |
| Eau de lac, de ruisseau ou de neige : 5 minutes d'ébullition | Étape 6 | `sources/46-quebec-tularemie.md` ; ch. 10, étape 14 |
| Viande séchée maison : deux semaines à la température de la pièce, contenant fermé | Étape 13 | `sources/66-nchfp-viande-sechee-palier-de-chaleur.md` |
| Pile AA au lithium 15 g, alcaline 23 g ; 25 ans et 10 ans à 21 °C dans l'emballage | En plus, « La pile au lithium » | `sources/09-energizer-l91-lithium-fiche-technique-texte.txt` (« Typical Weight: 15 grams » ; « 25 years at 21°C ») et `09-energizer-e91-alcaline-fiche-technique-texte.txt` (« 23.0 grams » ; « 10 years at 21°C », colonnes réappariées comme le dit la fiche `09-energizer-piles-lithium-alcaline-froid.md`) |
| Toboggans innus : un par personne qui marche, plus petits pour les enfants, bébés dessus dans des peaux, hommes devant à la trace, enfants derrière, la troisième ou la quatrième personne trouve une bonne piste ; 18e siècle (Cartwright, 1786) | En plus, « Un toboggan par personne » | `sources/20b-toboggan-innu-armitage-turner-tipatshimuna.md`, section 1, « Cartwright 1786 » ; l'avertissement (l'enfant refroidit plus vite et ne dit pas qu'il a froid ; regarder joues et nez) : page `froid` |
| Stefansson : explorateur canadien, des années chez les peuples autochtones du Nord ; essai à l'hôpital Bellevue de New York sous des médecins de Cornell ; signes après 3 ou 4 jours de viande maigre, renversés par le gras ; un an ensuite de viande, poisson et gras, en santé | En plus, « L'essai de Stefansson » | `sources/09-hektoen-rabbit-starvation.html` (texte vérifié dans la page enregistrée) et `09-hektoen-mal-de-caribou-delais.md` |
| Pemmican : du cri *pimikan*, « graisse préparée » ; viande séchée en poudre et gras à parts égales, parfois des petits fruits ; dense, riche en énergie, facile à conserver et à expédier ; voyageurs de la traite, surtout l'hiver | En plus, « Le pemmican » | `sources/67-encyclopedie-canadienne-pemmican.md` ; l'ours aussi dangereux que la viande crue : page `trichine` |

Aucun `[À VÉRIFIER]` dans le chapitre.

### Ce qui sort sans être déplacé (et pourquoi)

- « vingt minutes » (×3) pour monter la trousse improvisée : durée sans source ; « dix minutes » de la chaudière
  qui scie l'épaule : idem. Les phrases gardent le geste sans la durée.
- « une lampe qui faiblit a déjà de l'électrolyte dans son compartiment » : sans source, et faux en général (la
  lampe faiblit quand la pile se vide).
- « c'est même celle qui sert le plus souvent » (la trousse improvisée) : sans source.
- La redite du variante sur l'ébullition (« comptée à voix haute jusqu'à soixante… », « 24 heures ») : dite à
  l'étape 6 et au ch. 10.
- Le paragraphe « Faire fondre la neige » : le fond d'eau, la neige folle et la neige tassée sont au ch. 10,
  étape 39 (renvoi) ; reste le truc de la taie d'oreiller, que le ch. 10 n'a pas.
- « L'allumage » de la section 7 : le renvoi au ch. 13 est à l'étape 21.
- « Le gibier, s'il y en a » de la section 7 : redite des étapes 14 et 15.
- La génératrice dans « Cuire sans cuisinière » : hors sujet (page `generatrice`).
- Note 2 (les signes du mal de caribou) : la page `mal-de-caribou` les décrit (« Comment on le reconnaît »).

### Notes « En plus »

| Note | Genre | Étape | Provenance |
| --- | --- | --- | --- |
| Le pemmican | Fait | 14 | `67-encyclopedie-canadienne-pemmican.md` ; page `trichine` |
| La pile au lithium | Fait | 18 | `09-energizer-*` (fiches techniques du fabricant) |
| Un toboggan par personne | Façon des Innus (pourquoi elle marche : la piste tassée par ceux qui vont devant ; ce qui la rend dangereuse : le bébé couché sur le toboggan refroidit plus vite que l'adulte qui tire) | Section 7, « Traîner au lieu de porter » | `20b-toboggan-innu-armitage-turner-tipatshimuna.md` (Cartwright 1786) ; page `froid` |
| L'essai de Stefansson | Fait | Section 7, « Le gras » | `09-hektoen-*` |

Pas de photo : la recherche sur Wikimedia Commons (pile alcaline qui a coulé) a reçu un refus du serveur (429), et
JP a demandé de ne pas relancer le travail de sources. Une photo à ajouter si on la trouve : une pile alcaline
qui a coulé, poudre blanche dans le compartiment (section 6).

### Planches et logigramme

Aucune planche du ch. 6 n'existe (`images/planches-src/06-*`, `validees/`, `a-valider/` : rien ; clé « 06 » de
`placements-tome-1.json` vide) et le texte n'en appelle aucune. Candidate de l'audit (`images/audit-planches/
tomes-1-2.md`, ligne 06, priorité moyenne) : « Traîner : traits aux deux coins, barres rigides, ceinture de
couverture », pour la section 7, « Traîner au lieu de porter ». Pas de logigramme (voir plus haut).

### controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 7 858 | 6 480 |
| Tirets | 56 (dont 2 de forme : titre, ligne de tome) | 2 (les mêmes) |
| Mots bannis | 6 (« village » ×4, « 4 et 6 ans » ×2) | 0 |
| « § » | 3 | 0 |
| Vocabulaire d'IA | 3 (« essentiels ») | 0 |
| Âges à juger | 2 | 0 |
| Tournures | 4 | 1 (« la personne qui la monte oublie… » : le sujet est une personne, faux positif) |
| Mises en relief | 21 | 0 |
| Maximes | 5 | 0 |
| Redites | | 0 |
| Mots vides à juger | 46 | 25 (tous des « tout », « encore », « ainsi » qui portent le sens : « toute la famille », « garde encore de la chaleur », « Tout le contenu ») |

Invariants signalés, chacun justifié :
- chiffres disparus : les temps de gel de la peau (« 10 à 30 minutes », « 5 à 10 », « 2 à 5 », « moins de 2 ») et
  les seuils « 32 °C », « 30 °C » : page `froid` ; « −35 °C » : la phrase « dormir à −35 °C » devient « dormir au
  froid » ; « 4 ans », « 6 ans » : l'âge des enfants de JP ; « 72 heures » (×8) : « trois jours » dans le texte,
  le titre garde 72 heures ; « 1 L », « 6 L », « 24 heures », « 30 minutes », « 74 °C » : une mention de moins
  chacun (redites coupées), le chiffre reste ailleurs ; « 9.3 L » et les « 5.1 » à « 9.8 » : anciens numéros de
  sous-sections ; « 100 » : « revenue à 100 % » devient « tout est remplacé ».
- renvois : ch. 00b, 13, 14, 5 : une mention de moins chacun, le renvoi reste.
- note 2 : page `mal-de-caribou`.
- sécurité : « 74 °C » 3 → 2 et « cadmium » 2 → 1 (l'ancien Danger redisait l'étape) ; « génératrice » 3 → 0 (la
  génératrice n'est pas dans la trousse ; page `generatrice` ; pictogramme à l'étape 31).

### Signalé pour d'autres chapitres

- Ch. 1, étape 5 : l'avertisseur « se remplace 84 mois (7 ans) après l'installation ». Le ch. 6 (section 5) dit 7 à
  10 ans selon le modèle, comptés depuis la **date de fabrication** inscrite au dos
  (`sources/09-avertisseurs-co-duree-de-vie.md`, Kidde). À aligner au ch. 1.
- Ch. 10, l. 320 : « Pour le vider, voir le ch. 6. » peut devenir « voir le ch. 6, section 7 ».

## Corrections après la vérification technique, 19 octobre 2026

Rédacteur (rôle 2). Neuf signalements du vérificateur technique : huit appliqués (cinq avec une forme différente de
celle proposée, dite plus bas), un sans changement au ch. 6 (n° 9, il touche les ch. 1 et 3). Aucune recherche
nouvelle (JP, 19 octobre 2026 : « fuck les sources, on a pas déjà fait ce travail-là ? ») : chaque correction
s'appuie sur une page déjà enregistrée ou sur un chapitre qui a sa source.

| # | Où | Ce qui a changé | Appuyé sur |
| --- | --- | --- | --- |
| 1 | Section 7, « Le combustible de fortune » | « le carton ciré » sort de la liste de ce qu'on ne brûle jamais : le rouleau de carton trempé dans la cire, deux phrases plus haut, est du carton ciré. | `dangers/partie-1.md`, `pas-au-feu`, « Ce qu'on fait », point 1 (ne nomme pas le carton ciré) ; ch. 83, l. 492 (carton d'œufs noyé de gras ou de cire comme allume-feu) |
| 2 | Même paragraphe | « planches brutes d'une remise » sort de la liste de ce qui va au poêle. Ajouté à la fin du paragraphe : « Ne pas brûler non plus le bois de démolition dont on ne connaît pas l'origine : en vieillissant, le bois traité d'une remise, d'une clôture ou d'une terrasse devient gris comme du bois ordinaire, et on ne le reconnaît pas à sa couleur. » Placée après « Ils encrassent aussi le tuyau… (ch. 82) », et non juste après « Ne jamais brûler… » comme proposé, pour que « Ils » garde son sujet (la liste). C'est un fait de la page, mais c'est le piège de ce paragraphe-là : le texte d'avant demandait de juger le bois à l'œil. | `dangers/partie-1.md`, `pas-au-feu`, « Ce qui arrive » et « Ce qu'on fait », point 1 |
| 3 | Étape 14 | « une viande d'ours séchée ou fumée qui n'est pas montée à 74 °C à cœur n'entre pas dans la trousse » devient « mettre la viande d'ours dans la trousse en ragoût ou en pot seulement, jamais en viande séchée (ch. 71) ». Forme plus courte que la proposition (« cuite à 74 °C à cœur, en ragoût ou en pot ») : la première phrase de la même étape dit déjà « Cuire à 74 °C à cœur tout gibier qui entre dans la trousse, en ragoût, en pot… » ; le 74 °C n'est pas redit deux fois dans l'étape. Le désaccord du ch. 52 (ours séché après cuisson) est à régler à sa migration. | `dangers/partie-2.md`, `trichine`, « Ce qu'on fait » ; ch. 71, section 2 ; ch. 72, l. 34 |
| 4 | Étape 6, la javel | Réécrite dans l'ordre des gestes : d'abord l'eau d'un lac, d'un ruisseau ou de la neige au filtre à 1 µm, sinon la bouillir (ch. 10, étape 19) ; puis 2 gouttes (0,2 mL) par litre, et le double, 4 gouttes (0,4 mL), dans une eau froide, un peu trouble ou un peu colorée (ch. 10, étape 20) ; puis 30 minutes au-dessus de 20 °C, au moins 1 heure en eau plus froide, 2 heures ou plus sous 10 °C (ch. 10, étape 21). La condition avant le geste (règle 3 du skill) : le filtre passe en premier, pas en dernier comme dans la proposition. « 4 gouttes » : le double des 2 gouttes de Santé Canada. | Ch. 10, étapes 19 à 21 ; `sources/09-sante-canada-eau-aliments-urgence.md` (« environ 2 gouttes (0,2 millilitre) ») ; provenance des 0,4 mL et des temps en eau froide : `suivi/10-redaction.md` (INSPQ, `sources/10-cawst-2011-fiches-traitement-eau-domicile.md`) |
| 4 bis | Étape 7 | Coupé : « Traiter l'eau de neige comme l'eau d'un lac (ch. 10, étape 41). » L'étape 6 nomme maintenant la neige dans ses deux façons (javel et ébullition) : la phrase redisait l'étape d'avant. | Répétition (skill `ecriture`) |
| 5 | Section 7, « Doser la javel sans compte-gouttes » | Ajouté : « Quand on double la dose (étape 6), mettre 8 mL pour 20 L. » Forme plus courte que la proposition : la règle du double est à l'étape 6, ici seulement la mesure à la cuillère. Le renvoi « L'attente et l'odeur de chlore : ch. 10, étapes 21 et 22 » est gardé tel quel. | Ch. 10, étape 20 ; arithmétique (0,4 mL × 20) |
| 6 | Section 7, « Faire fondre la neige… » | « Pour la faire fondre plus vite sur le poêle, toujours mettre un fond d'eau » devient « Sur le poêle, toujours mettre un fond d'eau dans le chaudron avant d'y mettre la neige : sans eau, le métal surchauffe et la neige roussit au fond (ch. 10, étape 39). » Le texte de la proposition, mot pour mot. | Ch. 10, étape 39, troisième puce |
| 7 | Section 7, « La courroie de front » | Ajouté après « si on tombe » : « Un adulte qui n'a jamais porté au front commence avec une charge légère, sur de courtes distances. Ne pas porter à la courroie de front avec un cou douloureux, des fourmis dans les bras, ou après un coup reçu au cou, et ne jamais mettre une charge d'adulte au front d'un enfant (ch. 24, étapes 17 et 19). » La consigne à l'infinitif plutôt qu'en « Pas de… » (règle 0 : un verbe qui dit le geste). | Ch. 24, étapes 17 et 19 |
| 8 | En plus, « Le pemmican » | « …en ravitaillait ses voyageurs l'hiver » devient « …en ravitaillait ses voyageurs dans les prairies, surtout l'hiver ». Pour garder la note sous 80 mots, « Le pemmican est dense et riche en énergie ; on le gardait et on le transportait facilement, et » devient « Dense et riche en énergie, le pemmican était facile à garder et à transporter : » (même fait). | `sources/67-encyclopedie-canadienne-pemmican.md`, deuxième extrait |
| 9 | Section 5, l'avertisseur de CO | Ch. 6 inchangé. L'alignement va aux ch. 1 et 3 (rapport, « renvois »). | `sources/09-avertisseurs-co-duree-de-vie.md`, sections 1 et 2 |
| 4 ter | Étape 5 (tableau) et section 7, « Filtrer l'eau trouble… » | Deux retouches qui suivent du n° 4, faites au second passage (le texte avait déjà les neuf corrections) : au tableau de l'étape 5, « un filtre » devient « un filtre à 1 µm », le filtre que l'étape 6 demande pour l'eau de lac. En section 7, après « Si l'eau reste trouble, la faire bouillir plutôt que de la chlorer (ch. 10, étape 19). », ajouté : « Le linge, le filtre à café et le bas ne remplacent pas le filtre à 1 µm de l'étape 6. » Sans ça, la variante d'urgence menait à chlorer une eau de lac passée au linge, ce que le ch. 10 (étape 19) interdit. Un renvoi plutôt que la condition redite (une première forme, « ou si elle vient d'un lac, d'un ruisseau ou de la neige », redisait l'étape 6 : le script l'a signalée). | Ch. 10, étape 19 ; aucun chiffre nouveau (1 µm est déjà à l'étape 6) |

Aucun chiffre nouveau sans source : 0,4 mL, 30 min, 1 h, 2 h, 10 °C, 20 °C et 1 µm viennent du ch. 10 (sourcés dans
`suivi/10-redaction.md`) ; 4 gouttes et 8 mL sont de l'arithmétique sur des chiffres sourcés.

### controle.py après les corrections

6 537 mots au compte de `wc` (6 664 au compte du script ; 6 480 avant ces corrections au compte du script). Tirets : 2
(titre et ligne de tome, les mêmes). Mots bannis, « § », vocabulaire d'IA, mises en relief, maximes, redites : 0. Une
tournure (« la personne qui la monte oublie… », faux positif déjà jugé). 25 mots vides, les mêmes qu'avant, tous
jugés. Invariants signalés, justifiés :
- « 74 °C » 2 → 1 (sécurité) : la deuxième mention redisait la première dans la même étape 14 ; le rappel du tableau
  de `CLAUDE.md` reste entier dans la phrase en gras de l'étape 14, et la trichine reste dans sa phrase.
- « 41 » disparu : le renvoi « ch. 10, étape 41 » de la phrase coupée à l'étape 7 (n° 4 bis).

Repassé après le n° 4 ter : 6 557 mots au compte de `wc` (6 687 au compte du script). Tirets : 2 (titre et ligne de
tome). Mots bannis, « § », vocabulaire d'IA, mises en relief, maximes, redites : 0. Tournure : 1, le même faux positif.
Mots vides : 25, les mêmes. Invariants contre le texte d'avant la vérification : les trois mêmes, déjà justifiés.
Fins de ligne LF, 0 CR.

### Signalé, pas changé

- Ch. 10, note 16 de sa fiche : le ch. 10 a sorti « 2 gouttes » au profit de 0,2 mL à la seringue, parce que la
  taille d'une goutte change d'un compte-gouttes à l'autre (on compte les gouttes de son compte-gouttes dans 1 mL). Le
  ch. 6 garde « 2 gouttes (0,2 mL) », la formule de Santé Canada (« environ 2 gouttes »). Le vérificateur ne l'a pas
  relevé ; à trancher si on aligne le ch. 6 sur le ch. 10 (« mesurer 0,2 mL ; compter d'avance combien de gouttes de
  son compte-gouttes font 1 mL »).
- Ch. 1 (l. 52 et 204) et ch. 3 (l. 75 et 283) : la durée de vie de l'avertisseur de CO, à aligner sur le ch. 6
  (n° 9 ; textes dans le rapport).
- Ch. 10, l. 321 : « Pour le vider, voir le ch. 6. » devient « voir le ch. 6, section 7, « Tirer l'eau du
  chauffe-eau » ».
- Ch. 37, l. 344 et 750 : « (ch. 06, section 9) » devient « (ch. 6, section 7) ».
- Ch. 52 : l'ours séché après une cuisson à 74 °C contredit la page `trichine` et les ch. 71 et 72 (n° 3), à régler à
  sa migration.

## Points réglés après l'édition, 19 octobre 2026

Passe « trancher » du lot 05-06-07 : les trois questions que le rédacteur laissait à JP et les six faits que l'éditeur a
signalés sans les changer. Aucune source rouverte pour ce qui était déjà vérifié ; les pages citées sont au dossier.
Rien ne reste pour JP dans ce chapitre.

| N° | Point | Ce qui change | Règle ou source |
| --- | --- | --- | --- |
| 1 | Question à JP : le ch. 6 sans série orange ni logigramme | Rien. | `plan/premieres-minutes-inventaire.md` classe le ch. 6 dans « Aucun geste urgent » (un geste en minutes, qui arrive sans prévenir). Le départ pressé a sa série au ch. 2 (« On part : la première heure », étapes 16 à 24), où renvoie la section 2. |
| 2 | Question à JP : dessiner la planche 06-01 (traîner) | On la dessine. Appel posé dans la section 7, « Traîner au lieu de porter » : « (planche 06-01) » à la fin de la phrase d'ouverture, puis les repères 1 à 4 dans l'ordre des gestes (les cordes aux coins, les barres, la barre qui retient le traîneau dans la descente, la ceinture). | Priorité moyenne de l'audit (`images/audit-planches/tomes-1-2.md`, ligne 06) ; JP a lancé les priorités haute et moyenne (plan de match, PAUSE du 15 octobre, point 1) et le 19 octobre, la phase 2 du tome 1 final reprend « les priorités de images/audit-planches/ pour le tome 1 ». Ancre et brief de la planche rendus à l'orchestrateur. |
| 3 | Question à JP : la javel en gouttes ou à la seringue | Étape 5, tableau : « une seringue de 1 mL » au lieu d'« un compte-gouttes ». Étape 6 : « 0,2 mL… et le double, 0,4 mL » ; « Mesurer la javel à la seringue ; avec un compte-gouttes, compter d'avance combien de ses gouttes font 1 mL » ; « Sans seringue : section 7 ». Section 7 : « Doser la javel sans seringue » ; la paille, avec une ligne de plus : compter les gouttes qui remplissent une cuillère à thé rase (5 mL) et diviser par 25. | Le ch. 10 est le chapitre de référence de la désinfection (le ch. 6 y renvoie pour le détail) ; sa fiche a déjà tranché (`suivi/10-redaction.md`, écart 16 : « Les « 2 gouttes » sortent du texte et du logigramme » ; Matériel du ch. 10 : seringue de 1 mL, ou un compte-gouttes dont on a compté les gouttes dans 1 mL). La dose ne change pas : Santé Canada, « environ 2 gouttes (0,2 millilitre) » (`sources/09-sante-canada-eau-aliments-urgence.md`). 5 mL ÷ 0,2 mL = 25 : arithmétique. |
| 4 | Éditeur 1 : « elle garde sa chaleur plus longtemps que l'eau » (la roche du poêle) | Coupé. | Sans source, et faux à masse égale (l'eau garde environ quatre fois plus de chaleur par kilo). La consigne tient sans elle : une phrase sans source sort quand la consigne tient seule (JP, ch. 10). |
| 5 | Éditeur 2 : remplir au chalet « dès qu'on comprend que le courant ne reviendra pas » | « Au chalet, le faire dès que le courant manque » | Contradiction interne : la même phrase dit que la pompe s'arrête avec le courant et qu'il ne reste que quelques minutes de pression. |
| 6 | Éditeur 3 : la note « Le pemmican » en double avec le ch. 5 | La note sort du ch. 6. Elle est remplacée par « La peau qui gèle au vent » (57 mots, étape 12). | La note redisait l'étape 14 (« jamais en viande séchée » : la trichine), ce que le cadre interdit (« rien de ce que le chapitre dit déjà »), et doublait celle du ch. 5, qui porte en plus l'étape à 71 °C du ch. 72. La nouvelle note vient d'une page déjà au dossier pour ce chapitre : `sources/09-environnement-canada-refroidissement-eolien.md` (« any exposed skin can freeze in 10 to 30 minutes », 5 à 10, 2 à 5, moins de 2 minutes). Le tableau de l'étape 12 donne les gestes ; la note donne le temps. Réserve de la fiche source : le tableau a été relevé sur la version anglaise de la page. |
| 7 | Éditeur 4 : l'attente de la javel, sans condition au ch. 7 | Réglé au ch. 7, étape 8, sur le ch. 10, étape 21 (`suivi/07-redaction.md`). | Ch. 10, étape 21. |
| 8 | Éditeur 5 : le linge plié protège de la corde, pas du rebord | « La corde fait vite mal à l'épaule : glisser un linge plié sous chaque corde. » | Contradiction interne. |
| 9 | Éditeur 6 : étape 7, « il faut du combustible pour le faire dégeler » | La phrase sort (« Un bidon gelé ne donne pas d'eau pendant des heures : il faut du combustible pour le faire dégeler »). | « Pendant des heures » n'a pas de source, et le reste est la conséquence évidente de la phrase d'avant (skill `ecriture`, « la conséquence évidente »). La consigne des quatre cinquièmes tient avec les 9 %. |
| 10 | Cadre : une note dit son étape entre parenthèses | « Un toboggan par personne » finit sur « (section 7, « Traîner au lieu de porter ») » ; « L'essai de Stefansson », sur « (section 7, « Le gras ») ». | `.claude/cadre-agents.md`, les encadrés « En plus » ; les places viennent du tableau des notes plus haut. |

**Signalé pour un autre chapitre** : la note « Combien de temps on garde une pile » du ch. 9 redit « La pile au
lithium » du ch. 6 (25 ans et 10 ans à 21 °C), comme le rédacteur du ch. 9 l'a lui-même noté : rendu à l'intégrateur.

**Ancres.** Nouvelle : la planche 06-01, sur « **Traîner au lieu de porter.** ». Aucune autre planche ni photo.

**controle.py** (contre le texte d'avant cette passe) : 6 656 → 6 680 mots ; 2 tirets (titre et ligne de tome) ; 0 « § »,
0 mot banni, 0 tournure, 0 maxime, 0 redite ; 25 mots vides jugés. Invariants : « trichinellose » 3 → 2 (la note du
pemmican, point 6) ; le rappel reste entier à l'étape 14.
