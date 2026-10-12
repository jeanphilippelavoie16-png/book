> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 08. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 8, Le stock permanent du chalet

- **Fichier :** `chapitres/08-le-stock-permanent-du-chalet.md`
- **Tome :** 1 — Tenir
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Mots utiles :** environ 4 590 (hors balisage de tableaux)
- **Type :** chapitre de référence — les tableaux remplacent la procédure numérotée, l'ordre du
  gabarit et l'encadré danger sont conservés
- **Prochaines portes :** rôle 3 (technique) et rôle 4 (sécurité), en parallèle

---

## 1. Chiffres à valider

| # | Chiffre | Où dans le chapitre | Pourquoi il n'est pas sourcé | Ce que le vérificateur doit faire |
| --- | --- | --- | --- | --- |
| 1 | ≈ **4 L/jour/personne**, eau tout usage | 5.1 et tableau A | La valeur circule dans des fiches municipales québécoises; aucune publication provinciale ou fédérale retrouvée | Trouver une source Québec.ca, Sécurité publique Québec, INSPQ ou Sécurité publique Canada. À défaut, **retirer la ligne** et ne garder que les 2 L officiels de consommation |
| 2 | **Majoration calorique** pour le froid et le travail d'hiver | 5.1 | Le document MSSS dit explicitement que ses valeurs sont des approximations pour la population médiane, sans majoration | Renvoyer au chapitre 26 (relecteur nutritionniste). Le chiffre de travail de **9 000 kcal/jour pour la famille** ne va pas à l'impression sans son aval |
| 3 | **Masses par personne-mois** des denrées sèches — riz 4 kg, farine 4 kg, avoine 2 kg, légumineuses 3 kg, pâtes 2 kg, sucre 1 kg, lait en poudre 1 kg | Tableau B | Dérivées de la cible calorique, pas d'une table publiée | Confirmer la densité énergétique de chaque denrée dans le **Fichier canadien sur les éléments nutritifs** (Santé Canada), puis recalculer les masses |
| 4 | **Huile 1 L, saindoux 1 kg, sel de table 0,5 kg** par personne-mois; **sel à salaison 5 à 10 kg** pour la famille | Tableau C | Même problème que le 3 | Même méthode. Le sel à salaison dépend du volume de viande attendu : croiser avec le chapitre 34 |
| 5 | **Cordes de bois par hiver** (« consommation mesurée + 1 corde ») | Tableau E | Dépend du bâtiment, du poêle et de l'hiver | **Ne pas publier de valeur générique.** Le chapitre demande une saison de relevés. Vérifier que la formulation ne laisse pas croire à un chiffre |
| 6 | **Consommation de propane du réchaud** | Tableau E | Aucune mesure faite au chalet | Mesure de JP sur une bouteille complète, en notant les heures d'usage |
| 7 | **Autonomie des piles alcalines au froid** | Tableau F | Affirmé sans chiffre dans le texte, marqué à vérifier | Fiche technique du fabricant ou mesure au chalet. Si aucune donnée, retirer la mention plutôt que d'inventer un pourcentage |
| 8 | **Distance de la génératrice : 3 m contre 7 m** | Section 8 | Santé Montérégie dit 3 m; des documents municipaux disent 7 m | Trancher avec une source provinciale. Si les deux subsistent, garder 3 m comme minimum légal et recommander davantage, tel que rédigé |

### Chiffres sourcés — à confirmer par recoupement, pas à réécrire

| Chiffre | Source | Fichier dans `/sources` |
| --- | --- | --- |
| 2 L/jour/personne, 3 jours de nourriture | Sécurité publique Québec, SC-160 | `08-securite-publique-quebec-trousse-urgence.md` |
| 74 °C gibier · 70 °C poisson · 4 °C · -18 °C · 60 °C | MAPAQ, affiche 25-0015 | `08-mapaq-temperatures-cuisson-conservation.md` |
| 48 h congélateur plein · 24 h à moitié · 4 à 6 h frigo | Québec.ca / MAPAQ | `08-quebec-panne-electricite-aliments.md` |
| 7 jours (végétaux dans l'huile) · parage 2,5 cm | MAPAQ | `08-mapaq-meilleur-avant-bon-apres.md` |
| 30 L / 5 L logement · 50 L / 30 L garage-cabanon | Québec.ca | `08-quebec-produits-dangereux-entreposage.md` |
| 2 m (avertisseur CO) · 10 ans (pile lithium) | Québec.ca | `08-quebec-avertisseurs-monoxyde-carbone.md` |
| 3 m (génératrice) | Santé Montérégie | `08-sante-monteregie-generatrice-monoxyde.md` |
| Corde 3,6 m³ · 70 % massif · ≤ 20 % humidité · < 15 cm | RNCan, bulletin nº 7 | `08-rncan-classes-bois-chauffage.md` |
| 3 000 / 2 350 / 1 800 / 1 650 kcal | MSSS | `08-msss-besoins-energetiques.md` |
| pH 4,6 · 1 an · 12 à 36 h | Santé Canada | `08-sante-canada-conserves-botulisme.md` |

### Alerte au vérificateur technique

L'URL **française** de la page « Quels aliments jeter après une panne de courant ou une
inondation ? » renvoyait une **erreur 404** le 2026-09-20. Seule la version anglaise a été
servie. Retrouver l'adresse française courante et la consigner dans le fichier de source.

---

## 2. Images requises

| # | Sujet | Cadrage | Format | Notes |
| --- | --- | --- | --- | --- |
| 1 | **La réserve du chalet** — l'étagère complète, chargée, en service | Plan large frontal, étagère entière du plancher au plafond, lampe frontale éteinte et éclairage d'appoint pour montrer les étiquettes. Debout à 2 m, à hauteur de poitrine. Les contenants étiquetés doivent être **lisibles à l'impression** | Pleine page | C'est la photo demandée au suivi. Prise au chalet, par JP. Photographier **avant** un inventaire, pas après : on veut la réalité, pas la vitrine |
| 2 | **Le coin carburant extérieur** — bidons d'essence homologués étiquetés, bouteilles de propane debout, à distance du bâtiment | Plan large en plongée légère, le chalet visible en arrière-plan pour donner la distance. Par temps clair, sans neige au sol de préférence | Demi-page | Sert d'illustration directe à l'encadré danger. La distance doit se lire dans l'image |
| 3 | **Séquence de rotation** — trois vues : nouveau contenant étiqueté, insertion par l'arrière de la tablette, contenant le plus vieux ramené à l'avant | Trois cadres serrés, mêmes angle et éclairage, mains visibles | Demi-page, bande de 3 | Les mains rendent le geste lisible; sans mains, on ne comprend pas le sens de circulation |
| 4 | **Conserve à rejeter** — boîte bombée et boîte rouillée sur le serti, côte à côte avec une boîte saine | Macro sur le serti, éclairage rasant pour que la déformation ressorte, fond neutre | Quart de page | Une planche dessinée fait l'affaire si aucune boîte bombée n'est disponible — ne pas en fabriquer une |
| 5 | **Thermomètre min-max du local de réserve** montrant un relevé réel d'hiver | Macro sur l'afficheur, la tablette chargée en arrière-plan flou | Quart de page | À prendre en janvier, pas maintenant. Lié au thermomètre enregistreur déjà prévu au suivi général |

Toutes les images sont des photos de JP : aucune question de licence. Les inscrire quand même
dans `images/credits.md` avec la date de prise.

---

## 3. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 1 — Les quatre horloges | L'ordre des priorités : chaleur, eau, calories |
| 4 — Panne majeure d'Hydro en janvier | Le scénario que le stock couvre en premier |
| 7 — Des enfants de 4 et 6 ans | Le tableau G renvoie au chapitre dédié |
| 9 — La liste de 72 heures | Distinguer le stock permanent de la trousse |
| 10 — Quand on a un préavis | Distinguer le stock du sac de départ |
| 13 — Eau : puiser, filtrer, désinfecter | Tous les dosages de désinfection, et le coût en bois de la fonte de neige |
| 14 — Sans propane | Entreposage et remplacement des bouteilles |
| 15 — Poêles à bois et rendement | Combien de bois pour l'hiver |
| 16 — Le feu au chalet | Le poêle laissé seul, l'extincteur |
| 18 — Éclairage | Huile à lampe, chandelles, lampes |
| 19 — Communiquer et savoir | Radio et lien satellite |
| 24 — Le mal de caribou | Pourquoi le gras est dans le stock |
| 25 — Le scorbut et l'arbre de vie | Vitamine C d'hiver, thuyone du cèdre |
| 26 — Ce qu'un corps demande l'hiver | **Bloquant** : fixe la cible calorique du chapitre 8 |
| 28 — Hygiène et eaux usées | Poste hygiène du tableau H |
| 29 — Bâtir la pharmacie | Trousse de premiers soins et médicaments |
| 33 — Les enfants, la peur et la routine | Le bac de jeux comme routine de panne |
| 34 — Calendrier annuel de prélèvement | Le stock complète le prélèvement, il ne le remplace pas |
| 62 — Le sel | Sel nitrité contre salpêtre, sans dosage ici |
| 63 — Salaison à sec | Variante d'urgence |
| 64 — Saumure | Variante d'urgence |
| 67 — Pemmican et graisses | Le gras du stock et celui de l'automne |
| 68 — Froid naturel | Le coffre extérieur remplace le congélateur |
| 69 — Un congélateur plein qui dégèle | Suite directe du tableau D |
| 71 — Saler et sécher la truite | Variante d'urgence, poisson |
| 72 — Fumer le poisson | Botulisme de type E dès 3 °C |
| 73 — Conserves et marinades | Toute la procédure d'autoclave |
| 76 — Caveau à légumes | Où vont les conserves si le local gèle |
| 77 — Fermentation | Source de vitamine C d'hiver |
| 85 — Le stock de pièces et de consommables | Volet non alimentaire du stock |
| 89 — Savon et chandelles | Poste hygiène et éclairage de la variante d'urgence |

Tous ces numéros ont été vérifiés contre la liste des 89 chapitres. Aucun renvoi inventé.

---

## 4. Relecteur humain

Le chapitre 8 **ne figure pas** dans la liste de relecture humaine obligatoire de `CLAUDE.md`.

Deux réserves quand même :

1. **Dépendance au chapitre 26.** La cible calorique du stock vient d'un chapitre qui, lui, va
   chez un nutritionniste. Le chapitre 8 ne part pas à l'impression avant que le 26 soit validé.
2. **Concentration de risques.** Le rôle 4 le dit lui-même : une liste de provisions concentre
   carburant, propane, génératrice et poêle à bois au même endroit. **Recommandation :
   préventionniste en incendie** pour la section 8 et le tableau E, même si ce n'est pas exigé
   par le plan. Le même relecteur servira aux chapitres 16 et 20.

---

## 5. Notes pour la suite de la chaîne

- **Rôle 3 (technique) :** priorité aux huit chiffres du tableau ci-dessus, puis à l'URL
  française manquante. Vérifier aussi les noms latins : orignal (*Alces americanus*), souris
  sylvestre (*Peromyscus maniculatus*), bouleau à papier (*Betula papyrifera*), épinette noire
  (*Picea mariana*), sapin baumier (*Abies balsamea*), ours noir (*Ursus americanus*).
- **Rôle 4 (sécurité) :** trois encadrés DANGER — monoxyde de carbone, carburants dans le
  bâtiment, botulisme. Question à trancher : est-ce trop pour un seul chapitre ? Le rédacteur
  soutient que non, parce que les trois tuent et que les trois sont physiquement présents dans
  la même pièce. Si l'un doit sauter, ce n'est aucun des trois : c'est le chapitre qui doit être
  scindé.
- **Rôle 5 (éditeur) :** le chapitre 8 répète volontairement les 74 °C du gibier, la règle de la
  génératrice, la phrase sur le botulisme et l'avertissement sur la viande maigre. Ces
  répétitions sont exigées par `CLAUDE.md` et ne sont pas des redites à condenser.
- **Aucune date de saison ni limite de prises** n'apparaît dans le chapitre. Le tableau C renvoie
  au chapitre 34 pour le volume de viande attendu, sans chiffrer une récolte.
- **Aucune quantité de salpêtre** n'est donnée. Le texte nomme le sel nitrité du commerce comme
  forme moderne équivalente et renvoie au chapitre 62.

## Notes retirées du chapitre — 23 septembre 2026

- §5.1, après la majoration calorique : « Le chapitre 26, qui passe par un nutritionniste, fixe la majoration. » (retiré : « qui passe par un nutritionniste »)
- §5.6, bois de chauffage : « Le bulletin de Ressources naturelles Canada ne publie pas de valeur énergétique par essence, et les chiffres en BTU par corde qui circulent viennent de sources commerciales : aucun n'est repris ici. »
- §8, sous l'encadré botulisme : « Tout poisson fumé ou salé du stock relève du chapitre 72, qui est le chapitre le plus dangereux du livre et qui passe par un relecteur externe. » (retiré : « et qui passe par un relecteur externe »)

## Passe « légal et signes nommés » — 23 septembre 2026

**Retiré (norme) :** tableau E, les désignations de classe **M20**, **D2** et **D5** du bois de
chauffage. Le mécanisme reste, dit en clair : humidité **≤ 20 %** au bûchage, bûchettes de
**5 cm et moins** pour l'allumage (D2 = ≤ 2 cm et D5 = 2 à 5 cm, d'où « 5 cm et moins »).
Source inchangée : `sources/08-rncan-classes-bois-chauffage.md`.

**Notes de bas de page ajoutées, et leur provenance :**

- `[^1]` §5.4, **mal de caribou** : perte de poids malgré de grosses portions, faim qui ne part
  pas après le repas, nausée, diarrhée, dégoût de la viande. Nausée et diarrhée :
  `sources/24-bilsborough-mann-2006-plafond-prudent.md` (résumé seulement). Le reste vient du
  tableau du ch. 24 §7, lui-même tiré de récits d'explorateurs. D'où le `[À VÉRIFIER]` sur toute
  la note, comme au ch. 24.
- `[^2]` §7, **serti** et **fermeture verticale** : définitions reprises de
  `sources/08-mapaq-meilleur-avant-bon-apres.md` (« ligne de jonction entre le couvercle et la
  boîte de conserve » ; « ligne métallique verticale qui ferme la boîte de conserve »).
- `[^3]` §7, **couvercle qui a repris du jeu** : les trois tests du scellage (creux au centre,
  couvercle qui remonte sous le pouce, son sourd à la cuillère). Nouvelle source enregistrée :
  `sources/08-nchfp-tester-le-scellage-des-bocaux.md` (NCHFP, USDA). Aucune page québécoise ou
  canadienne consultée ne donne ce geste.
- `[^4]` §8, **symptômes du botulisme** : nausées, vomissements, bouche sèche ; paupières qui
  tombent, vision double ou brouillée, troubles d'élocution, difficulté à avaler, faiblesse du
  visage. Source déjà au dossier : `sources/61-aspc-botulisme-symptomes.md`. Le délai de la
  phrase (12 à 36 h) reste celui de `sources/08-sante-canada-conserves-botulisme.md` ; l'ASPC
  donne 12 à 72 h, et la note ne chiffre pas de délai pour ne pas contredire le texte.
  **Écart à trancher** entre les deux pages.

**Doutes de la passe paperasse (lignes du ch. 8) :** celle des classes M20, D2, D5 est réglée
ci-dessus. « Plancher officiel » (tableau A) n'est ni du légal ni un signe : laissé. Les autres
lignes ne touchent ni le légal ni un signe : laissées.

## Levée des [À VÉRIFIER] — 24 septembre 2026

- §5.1, dépense au froid : **confirmé et chiffré.** 5 000 à 7 000 kcal/jour mesurés chez de
  jeunes hommes entraînés en opérations d'hiver ; déficits d'apport jusqu'à 70 % (nourriture
  gelée, neige à fondre). Aucun pourcentage de majoration pour une famille : le renvoi au ch. 26
  reste. Source : `sources/08-margolis-pasiakos-2023-energie-au-froid.md` (+ texte intégral).
- §5.4, note [^1], signes du mal de caribou : **« dégoût de la viande » introuvable, retiré.**
  Remplacé par ce que disent les récits : faim qui revient à la fin du repas, envie de gras,
  puis nausée et diarrhée. Sources : `sources/21-speth-spielmann-1983-stefansson-mal-de-caribou.md`,
  `sources/09-mal-de-caribou-signes.md`, `sources/24-bilsborough-mann-2006-plafond-prudent.md`.
- §5.4, « mortel en deux à trois semaines » devient « mortel en quelques semaines » (décision
  commune à tous les chapitres).
- §5.6, bois de chauffage « + 1 corde » : **introuvable.** Devient « plus une marge », dans le
  tableau et dans le paragraphe qui suit (« on bûche ce total plus une marge »). Séchage d'au
  moins six mois : `sources/15-melccfp-chauffage-au-bois-qualite-de-lair.md`.
- §5.6, consommation de propane : **introuvable par nature** (dépend du réchaud) ; la cible est
  la mesure au chalet. Aucune source.
- §5.7, piles au froid : **confirmé et chiffré.** Alcaline AA garantie par son fabricant de
  -18 à 55 °C ; lithium AA de -40 à 60 °C. Sources : `sources/08-energizer-piles-au-froid.md`
  (+ PDF L91), `sources/85-energizer-e91-fiche-technique.md`.
- §6, température du local de réserve : **confirmé.** Qualité optimale 10 à 21 °C (20 °C gardé,
  côté prudent) ; jamais au-dessus de 35 °C ni près d'une source de chaleur. Source :
  `sources/08-nchfp-entreposage-conserves-maison.md` (vise les conserves maison en bocal).
- §6 et §8 DANGER, bouton test de l'avertisseur de CO : **confirmé.** Le test éprouve le
  circuit, la sirène et la pile, pas la réponse de la cellule au CO ; « le circuit » ajouté.
  Source : `sources/15b-kidde-avertisseur-co-bouton-et-temperature.md`.
- §9, rapport neige/eau : **chiffré.** Neige fraîche : 4 à 10 % d'eau, soit 10 à 25 L de neige
  pour 1 L d'eau. Source : `sources/13-nsidc-neige-equivalent-en-eau.md`.
- Compression §3 et §4 — 27 septembre 2026 : 1067 mots → 230 mots (§3 : 312 → 116 ; §4 : 755 → 114) ; matériel coupé : étagères ancrées, bidons d'eau alimentaires, étiquettes et marqueur, extincteur ABC, bidons de carburant, pièges à rongeurs et laine d'acier, paragraphes d'introduction et de justification. Déplacé en §8 (DANGER carburants) : jamais de verre ni de plastique mince pour le carburant ; flaque de carburant en feu étouffée à l'extincteur ou au sable, jamais à l'eau. §9 : renvoi « tableau de la section 4 » corrigé.
