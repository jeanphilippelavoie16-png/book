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
