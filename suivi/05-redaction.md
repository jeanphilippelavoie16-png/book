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

## Refonte au gabarit final, 19 octobre 2026

Rédacteur (rôle 2), lot du tome 1 final (JP : « Monte le reste du tome 1 final »). Texte d'avant :
`git show HEAD:chapitres/05-le-stock-permanent-du-chalet.md`. Les numéros de chapitre de cette section sont **les
nouveaux**. Fin de ligne : LF, comme avant. Aucun autre fichier commun touché.

Règle de JP pour la refonte (19 octobre : « fuck les sources, on a pas déjà fait ce travail-là ? ») : les chiffres qui
ne font que changer de place n'ont pas été rouverts. Seul ce qui est neuf a été vérifié, toujours dans une page déjà
enregistrée dans `/sources` (aucune recherche nouvelle sur le Web ; aucun fichier ajouté à `/sources`).

### Ce qui a changé

- **Sept sections, puis « En plus ».** « Pourquoi ça marche » et la section 8 Danger sortent (où chaque bloc est allé :
  plus bas). La « méthode du stock » (anciennes sous-sections 5.1 à 5.10) devient la section 4, Procédure : 51 étapes
  numérotées d'un bout à l'autre, sous neuf intertitres sans numéro (L'ordre et la place ; Calculer l'eau, les calories
  et la durée ; Choisir les denrées sèches ; Le gras et le sel ; Les conserves, le poisson et le congélateur ; La
  chaleur et le carburant ; La lumière et le feu ; Le stock des enfants ; Ce qui n'est pas de la nourriture ; La
  rotation et le tour du stock). Les tableaux A à E restent, chacun dans l'étape qui s'en sert (étapes 6, 14, 18, 22,
  28), comme le tableau des doses du ch. 4 (étape 13). Plus aucun renvoi « 5.1 », « la 5.8 », « § ».
- **Section 2** : seulement les situations, avec leurs étapes. La liste « C'est le mauvais choix quand » sort ; ce
  qu'elle apprenait est allé : le local qui gèle et le serti → étape 4 ; « un stock à moitié bâti mais complet en eau,
  en gras et en chaleur » → étape 1 ; la trousse de 72 heures et le sac de départ → renvoi court à l'étape 2 ; « le
  stock ne remplace pas le prélèvement, la viande se renouvelle (ch. 41) » coupé (contre-exemple que personne ne
  confond). « Le stock remplace le magasin, pas le frigo » coupé (formule).
- **Matériel** : même six lignes, au format « nom : ce qu'il fait », sans tiret, avec l'étape ou « sans : section 7 ».
  Le thermomètre à sonde ne redit plus 74 °C (étape 26).
- **Le texte s'ouvre à toute famille** : le tableau des calories passe de « Homme 19-30 / Femme 19-30 / Enfant de 6 ans /
  Enfant de 4 ans » à un tableau par tranche d'âge (4-5, 6-7, 8-9, 19-30, 31-50 ans, fille ou femme, garçon ou homme),
  tiré du même tableau 1 de `sources/08-msss-besoins-energetiques.md` ; l'exemple de la famille de quatre reste
  (« un homme et une femme de 19 à 30 ans et deux enfants de 4 à 7 ans », 8 550 à 8 800 kcal ; corrigé après la vérification : « un enfant de 4 ou 5 ans et un enfant de 6 ou 7 ans », plus bas, point 1). « Les deux enfants »
  devient « les enfants ». Le contrôle des âges ne relève plus rien.
- **Les mots** : « village » ×2 (le congélateur « au village ») → « à la maison » ; « Hydro » → « sur le réseau » ;
  « courir un trapline » → « faire la tournée des pièges » ; les noms latins sortent (orignal, souris sylvestre,
  bouleau à papier, épinette noire, sapin baumier, thuya, ours noir, *Clostridium botulinum* ; cadre, « Les mots de
  tous les jours »).
- **Tournures corrigées** : 69 tirets, 3 « § », « d'où », « l'ours et le phoque ne pardonnent pas », 15 mises en relief
  (« c'est… qui »), les citations de source entre guillemets (solvants, « meilleur avant ») redites comme des faits,
  les consignes au pronominal (« se jette », « se rechargent », « se monte »), « l'erreur ne pardonne pas »
  (nitrite).
- **Coupé, sans perte de geste** : « Deux cordes à 20 % battent trois cordes à 35 % » (comparaison chiffrée qu'aucune
  source de la fiche ne donne, et chute en formule) ; « une réserve dix fois plus petite » (multiplicateur sans source,
  faux pour l'exemple de la farine : 38 fois) ; « le chapitre le plus dangereux du livre » (ch. 77) ; « Le plastique
  n'est pas une barrière, c'est un délai » ; « Le congélateur n'est pas un stock, c'est un pari sur le courant » ;
  « Une scie à chaîne sans lime est un manche » ; « Un stock vide reste vide » ; « c'est la panne la plus bête du
  stock » ; « La règle ne change pas parce qu'on est en urgence » (redite de l'étape 51) ; « Un congélateur plein tient
  deux fois plus longtemps » (redite de 48 h et 24 h) ; « (1 po) » au parage d'une moisissure (impérial hors
  construction) ; la phrase d'ouverture de la section 9 (« Ce qui suit, ce sont les gestes… », phrase sur le livre).
- **Corrigé** : Points de contrôle, bois empilé, « Consommation mesurée de l'hiver précédent + 1 corde » → « plus une
  marge ». Le « + 1 corde » avait été retiré du texte le 24 septembre (introuvable, plus haut) et était resté dans le
  tableau.
- **Le 9 000 kcal** (remplacé après la vérification par 9 500 kcal et 855 000 kcal, plus bas, point 3) : « Le ch. 21 fixe la majoration ; d'ici là… » était périmé, le ch. 21 l'a fixée (9 500 kcal par
  jour pour un hiver de travail, `chapitres/21-…`, l. 112 ; provenance dans `suivi/21-redaction.md`). Le stock reste
  bâti sur 9 000 kcal comme minimum, et l'étape 8 renvoie au 9 500 du ch. 21. Les 810 000 kcal de l'étape 11 ne
  changent pas.
- **Fichier canadien sur les éléments nutritifs** (une base en ligne) : gardé comme préparation faite pendant que tout
  marche (CLAUDE.md, exception du 24 septembre) : on y cherche le vrac et on écrit le chiffre sur le contenant
  (étape 10, renvoi à l'étape 48).
- **Ajouté aux Points de contrôle** : une ligne « Jours d'autonomie calculés, 30 jours ou plus » (la cible de
  l'étape 13, qui n'avait pas de ligne).

### Où sont allés les blocs de l'ancien « Pourquoi ça marche »

| Bloc | Où il est allé |
| --- | --- |
| Il rachète du temps et se bâtit dans l'ordre où le corps lâche : chaleur, eau, calories | Étape 1 (renvoi au ch. 1) |
| Il dort au chalet parce que ce qui dure finit là, et que la route se coupe avant (ch. 2) | Étape 2 |
| Il tient parce qu'il est redondant : deux moyens indépendants valent mieux que le double d'un seul | Étape 3, avec la règle de l'indépendance de l'ancienne 5.7 (les trois boîtes d'allumettes dans le même tiroir) |
| Ce qui le détruit, c'est l'oubli : la date, l'humidité, la souris, le gel | Étape 4, troisième puce, qui renvoie aux étapes 47 à 51 |
| Il se lit sans liste : chaque chose à la même place depuis deux ans | Étape 4, quatrième puce, avec « utilisable par quelqu'un d'autre » de l'ancienne section 2 |

### Où sont allés les blocs de l'ancienne section 8, Danger

| Bloc | Où il est allé | Pictogramme |
| --- | --- | --- |
| CO : incolore, inodore, hémoglobine, signes de grippe, le dormeur qui ne se réveille pas | Page `co` (dangers/partie-1.md) | |
| Génératrice jamais dans un bâtiment, un garage, un cabanon, une tente ni sous un auvent ; « au moins 3 mètres » | Étape 33, **à 6 m** du chalet et du cabanon, à découvert ; jamais dans le cabanon ni dans un autre bâtiment, même porte ouverte, ni sous un auvent (corrigé après la vérification, plus bas, point 5 ; le reste : page `generatrice`) | `generatrice` |
| La même règle pour le barbecue, le réchaud, la chaufferette, la laveuse à pression, la scie | Pages `co` et `generatrice` | |
| Avertisseur à chaque étage, dans le corridor, et dans chaque chambre où on dort porte fermée ; 2 m d'un appareil ; pas de pièce humide ; lithium 10 ans ; la cellule meurt avant le boîtier ; date au dos | Étape 34 | `co` |
| Le bouton test ne vérifie pas la cellule | Page `co` ; la ligne des Points de contrôle ne garde que « remplacer l'appareil qui a passé sa date (étape 34) » | |
| Symptômes ou alarme : tout le monde dehors ; le sauveteur qui tombe à côté | Page `co` (« Ce qu'on fait », points 1 et 2) | |
| Vapeurs d'essence plus lourdes que l'air, retour de flamme jusqu'à la flaque | Page `vapeurs` | |
| L'espace vide du bidon (le bidon à moitié vide respire) ; dans le bâtiment, seulement ce qui se brûle dans la journée ; bidons pleins et bouchés, jamais de verre ni de plastique mince ; regarder sous le fond | Étape 31 | `vapeurs` |
| Flaque de carburant en feu : extincteur ou sable, jamais d'eau | Page `vapeurs`, point 6 | |
| Propane debout, dehors, jamais dans un bâtiment ni un cabanon fermé ; la soupape qui crache du liquide couchée | Étape 32 ; le mécanisme : page `vapeurs` (bouteille penchée à plus de 60°) | `vapeurs` |
| Botulisme : milieu humide sans oxygène, toxine des plus puissantes | Page `botulisme` | |
| Ne change ni la couleur, ni l'odeur, ni le goût | Étape 23 (rappel de CLAUDE.md, dit une fois ; la ligne « Une conserve… ne prouve rien » des Signes d'échec sort pour ne pas le dire trois fois) | `botulisme` |
| Signes (note [^4]) et délai de 12 à 36 h | Page `botulisme`, qui donne 12 à 72 h : l'écart noté le 23 septembre (Santé Canada contre ASPC) ne se pose plus dans ce chapitre | |
| pH 4,6, autoclave ; conserves maison dans l'année | Étape 23 (les aliments peu acides nommés, l'autoclave, ch. 78) ; le seuil de pH : page `botulisme` | `botulisme` |
| Végétaux frais dans l'huile maison jetés après 7 jours | Page `botulisme` (7 jours aussi) ; étape 23 : l'huile maison n'entre pas au stock | |
| Boîte bombée, rouillée ou bosselée sur le serti : sans ouvrir ni goûter | Étape 23 et section 6 | |
| Type E dès 3 °C ; poisson fumé ou salé ; ch. 77 | Étape 24 | `botulisme` |

Les autres faits de danger éparpillés dans l'ancien chapitre : le mal de caribou et sa note [^1] (5.4) → étape 19, la
note → page `mal-de-caribou` ; 74 °C, 70 °C, « ce n'est pas 71 °C » (5.5) → étape 26, le 71 °C → page `cuisson` ; foie
et reins (5.5) → étape 27 ; le congélateur et les 4 °C (5.5) → étape 25 ; l'essence qui fait de la vapeur par tout
hiver et les « liquides combustibles » (tableau E) → page `vapeurs` ; la trichinellose et la thuyone (section 9) →
section 7, « Ce qui ne se remplace pas » et « Les fermentés » ; le nitrite « dont l'erreur ne pardonne pas » (section
9, fléau) → étape 21 et section 7, « Peser sans balance » (au dixième de gramme, chiffre de la page `poison`).

### Pictogrammes posés (étape → id)

| Étape | Id | Ce qui est propre au chapitre |
| --- | --- | --- |
| 19 (garder du gras au stock) | `mal-de-caribou` | Le gras du stock fait le lien jusqu'à la graisse de l'automne ; rotation rapide, jamais en réserve de fond |
| 21 (sel nitrité, jamais de salpêtre) | `poison` | Le nitrite entre au stock à côté du sel de table ; il ne se remplace pas cuillère pour cuillère par le salpêtre (la page dit : peser au dixième de gramme, jeter la poudre sans étiquette) |
| 23 (conserves maison dans l'année) | `botulisme` | L'année, l'huile maison hors du stock, la boîte du commerce rouillée ou bosselée sur le serti |
| 24 (le poisson fumé ou salé) | `botulisme` | Gelé, ou sous 3 °C, jamais sur les tablettes du stock ; dès 3 °C ; ch. 76 et 77 (corrigé le 19 octobre, plus bas) |
| 25 (le congélateur de la maison) | `zone-de-danger` | 48 h plein, 24 h à moitié, réfrigérateur 4 à 6 h (compter 4) ; sortir la viande dehors en janvier |
| 26 (cuire le gibier) | `cuisson` | 74 °C le gibier, 70 °C le poisson (rappel de CLAUDE.md) |
| 27 (foie et reins) | `abats` | Ni au congélateur ni en conserve (rappel de CLAUDE.md) |
| 31 (le carburant dans le chalet) | `vapeurs` | Seulement le carburant de la journée ; bidons pleins ; regarder sous le fond |
| 32 (les bouteilles de propane) | `vapeurs` | Debout, dehors, jamais dans un cabanon fermé |
| 33 (la génératrice) | `generatrice` | Dehors, à découvert, à 6 m du chalet et du cabanon ; jamais dans le cabanon ni dans un autre bâtiment, même porte ouverte, ni sous un auvent (corrigé le 19 octobre, plus bas) |
| 34 (les avertisseurs) | `co` | Une par chambre où on dort porte fermée ; 2 m ; pièce humide ; modèle à pile au lithium de 10 ans ; date au dos |
| 51 (le tour des souris) | `hantavirus` | Jeter ce que les souris ont touché ; fente de 10 ¢ |
| Section 7, « Le gras remplace le couvercle » | `botulisme` | La viande sous la graisse reste au froid, jamais sur une tablette tiède (la page `botulisme` range « le confit ou la viande sous une couche de gras » parmi les risques) |
| Section 7, « Les fermentés » | `thuyone` | Sapin baumier ou épinette, jamais le cèdre (rappel de CLAUDE.md) |
| Section 7, « Ce qui ne se remplace pas » | `trichine` | Le thermomètre à sonde : seule la chaleur à cœur tue la trichine de l'ours et du phoque (rappel de CLAUDE.md) |

`huile-en-feu`, que l'inventaire proposait pour la flaque de carburant, n'est pas posé : la flaque en feu est dans la
page `vapeurs` (point 6), et le chapitre ne parle pas de gras de cuisson qui brûle. Ajouts à l'inventaire (colonne
« Chapitres » de la section 1) : `cuisson`, `trichine`, `abats`, `zone-de-danger`, `mal-de-caribou`, `thuyone`,
`hantavirus`, `poison` ; retrait : `huile-en-feu`. Le texte exact est rendu à l'orchestrateur.

### Séries orange et logigramme

Aucune. L'inventaire des premières minutes (`plan/premieres-minutes-inventaire.md`, « Les autres chapitres ») classe le
ch. 5 parmi les chapitres sans geste urgent ; aucune décision du chapitre ne se prend en branches. Aucun logigramme
n'existait (`images/logigrammes/05-*`), aucun n'est fait ; pas de clé `logigramme` dans `placements-tome-1.json`.

### Planches et photo

- **Planche 05-01** (la chaudière à bascule ; `images/planches-src/05-01.js`, PNG dans `images/a-valider/`) : appelée
  une fois, section 7, « Les souris, sans piège ni laine d'acier » : « **La chaudière à bascule** (planche 05-01). »,
  repères 1 à 5 dans l'ordre des gestes, puis 6 et 7 dans « Boucher ». Elle n'avait ni appel ni ancre (clé `"05"`,
  `planches: []`). Ancre rendue : « **La chaudière à bascule** (planche 05-01). ». La correction demandée par JP au
  15 octobre (plan de match, PAUSE, point 1 : « souris propres décalquées ou pas de souris ; l'ombre du flanc qui
  déborde sous le fond ») n'est pas faite : rendue dans « planches », rien redessiné.
- **Photo `images/photos/tri/05-boite-bombee.jpg`** : son ancre (« Toute boîte bombée, rouillée ou bosselée sur le
  serti se jette », dans l'ancien encadré du botulisme) disparaît avec la section 8. Nouvelle ancre : l'étape 23,
  « **Manger les conserves maison dans l'année qui suit la mise en conserve.** », qui nomme la boîte bombée. La légende
  actuelle finit au pronominal (« Elle se jette sans être ouverte et sans être goûtée ») : proposée « Boîte bombée : le
  gaz formé dedans pousse le couvercle. On la jette sans l'ouvrir et sans la goûter. » La note `_photos` de
  `placements-tome-1.json` dit « section 8 » : à mettre à jour (« étape 23 »).

### Chiffres nouveaux, avec leur source

| Fait | Où | Source |
| --- | --- | --- |
| Génératrice à au moins 6 m du bâtiment (remplace les 3 m de Santé Montérégie) | Étape 33 | `sources/10-sante-canada-generatrice-distance.md` (« au moins 6 mètres (20 pieds) entre toute habitation ou tout bâtiment ») ; concorde avec la page `generatrice` ; demandé par `plan/dangers-inventaire.md` (ch. 05 et section 5) |
| Besoins de 8-9 ans (1 850 / 2 000 kcal) et de 31-50 ans (2 250 / 2 900 kcal) | Étape 8, tableau | `sources/08-msss-besoins-energetiques.md`, tableau 1, niveau « actif » (même tableau que les autres lignes) |
| Hiver de travail : environ 9 500 kcal par jour pour la famille ; depuis la vérification, la base du stock (étapes 8 et 11 : 855 000 kcal pour trois mois) | Étapes 8 et 11 | Ch. 21, l. 112 (« Chiffre de planification : 9 500 kcal/jour ») ; provenance dans `suivi/21-redaction.md` |
| Une souris passe par une fente de la taille d'une pièce de 10 ¢ | Étape 51 | `sources/15b-parcs-canada-souris-sylvestres.md` (« toute ouverture de la taille d'une pièce de 10 ¢ ») et `sources/15b-sante-canada-rats-souris.md` (« as small as a dime ») ; remplace « passe partout où son crâne passe », sans source |
| La plupart des bois donnent la même énergie à masse sèche égale ; une corde d'épinette pèse moins qu'une corde de bouleau | Étape 29 | `sources/08-rncan-classes-bois-chauffage.md` (« La plupart des types de bois de chauffage affichent le même contenu en énergie lorsque l'on tient compte de la masse anhydre ») ; ch. 83, l. 86 (« une corde d'épinette et une corde de bouleau ne pèsent pas la même chose ») |
| Le sel nitrité se pèse au dixième de gramme | Section 7, « Peser sans balance » | Page `poison` (dangers/partie-2.md : « le peser au dixième de gramme ») |

Tous les autres chiffres sont ceux d'avant, déplacés sans changer de sens ; leur provenance est plus haut dans cette
fiche (sections 1, « Levée des [À VÉRIFIER] » et la note du 23 septembre) ou dans les fiches des ch. 6 et 21 (4 L par
personne et par jour, 9,8 L). Concordance avec les pages des dangers : génératrice 6 m ; huile maison 7 jours ;
congélateur −18 °C, 4 °C ; 74 °C et 70 °C ; nitrite au dixième de gramme ; aucun écart.

### [À VÉRIFIER]

Aucun dans le texte. Deux formulations à regarder au vérificateur, sans chiffre : étape 29, « et on la brûle plus
vite » (déduit des deux sources de la ligne ci-dessus, pas écrit tel quel) ; étape 36, « Au froid, une pile donne
moins » (la fiche du 24 septembre confirme la plage de fonctionnement, pas une baisse chiffrée).

### Notes « En plus » et leur provenance

| Note | Genre | Mots | Étape | Source |
| --- | --- | --- | --- | --- |
| La bannique des Innus | Façon d'une nation du Nord : pourquoi elle marche (le sable sec garde la chaleur de la braise et cuit lentement, sans four ni chaudron) ; ce qui la rend dangereuse (un galet pris dans l'eau éclate) | 76 | 14 | `sources/14b-bannique-sable-innue.md` (Radio-Canada, Mme Bégin de Mashteuiatsh, trois quarts d'heure ; Tourisme Autochtone Québec ; OQLF) ; le galet qui éclate : ch. 88, section 9-C |
| Le pemmican | Fait, avec ce qui le rend dangereux aujourd'hui | 79 | 19 | `sources/67-encyclopedie-canadienne-pemmican.md` (*pimikan*, « graisse préparée » ; parts égales ; orignal et caribou ; « facilement conservée et expédiée » ; voyageurs de la traite des fourrures) ; 71 °C à cœur pendant 15 s avant le séchage : `chapitres/72-pemmican-et-graisses.md`, étape 15 ; jamais d'ours, le séchage ne tue pas la trichine : page `trichine` |
| Ranger les bocaux sans leur bague | Fait | 64 | 23 | `sources/08-nchfp-entreposage-conserves-maison.md` (« stored without ring bands to keep them dry as well as to allow for easier detection of any broken vacuum seals » ; « Dampness may corrode metal lids ») |
| L'avertisseur qui bipe au froid | Fait | 50 | 34 | `sources/15b-kidde-avertisseur-co-bouton-et-temperature.md` (« the battery… may be affected by the cooler temperature. This can cause the alarm to chirp, indicating a 'Low' battery status » ; plage de 4,4 à 37,8 °C) |

Quatre notes, sans photo. **Écartée** : « Le bocal qui risque de geler » (NCHFP : un bocal qui gèle ne se gâte pas s'il
garde son vide ; l'emballer dans du journal, en carton épais) : elle contredit le ch. 84, étape 9 (« un bocal de
conserve maison qui a gelé se jette, fendu ou non »). Question rendue à JP. **Photo** : aucune ; une photo de souris
sylvestre ou de pyrale des fruits secs demandait une source de description nouvelle (la page du ministère était
inaccessible) et un téléchargement que l'API de Wikimedia Commons refusait (limite de requêtes) : laissé pour ne pas
rouvrir la recherche.

### Renvois vers ce chapitre à corriger ailleurs (rendus à l'orchestrateur, rien touché)

- ch. 84, l. 160 (CRLF) : « la chaudière à bascule du ch. 5 (§9) » → « la chaudière à bascule du ch. 5 (section 7) ».
- ch. 88, l. 247 (CRLF) : « (ch. 5 §9) » → « (ch. 5, section 7) ».
- ch. 98, l. 387, 426, 723 et 731 : « ch. 5 §9 » → « ch. 5, section 7 » (la balance des l. 387 et 731 est le fléau de
  la section 7).
- Les autres renvois au ch. 5 (ch. 3, 6, 8, 9, 11, 18, 20, 21, 30, 33, 36, 57, 66, 74, 76, 84, 88, 92, 95, 98, 100)
  visent le chapitre entier : rien à changer.

### controle.py, avant et après

- **Avant** : 9 032 mots, 81 tirets (69 lignes), 2 mots bannis (« village »), 2 âges (4 et 6 ans), 3 « § », 3
  tournures, 15 mises en relief, 55 mots vides, 8 redites.
- **Après** : 8 212 mots, 2 tirets (titre et ligne de tome, comme aux ch. 4 et 12), 0 mot banni, 0 âge, 0 « § », 0
  mise en relief, 0 maxime, 1 tournure (« On les oublie », étape 44 : faux positif, le sujet est « on »), 43 mots vides
  (jugés : « tout de suite », « tout le reste », « tous les jours », « farine tout usage », « déjà » qui porte le sens),
  2 redites (« tour du printemps et de l'automne » : le même nom pour le même tour, règle 6).
- **Ancre introuvable** : la photo 05-boite-bombee (voir plus haut ; nouvelle ancre rendue).
- **Invariants signalés et justifiés** : « 1 po » (impérial hors construction) ; « 16 L », « 3 jours », « 72 heures »
  (redites dans le même calcul, dits une fois) ; « 36 heures », « 7 jours », « 4,6 » (délai du botulisme, huile
  maison, pH : page `botulisme`) ; « 71 °C » ×2 (page `cuisson`) ; « 74 °C » 3 → 1 (le rappel dit à l'étape 26, avec
  son pictogramme ; le Matériel et la section 7 y renvoient) ; « 4 ans », « 6 ans », « 8 ans » (le tableau par tranches
  d'âge) ; « 8 pi » (la corde, dite une fois, étape 30) ; ch. 00b ×2, ch. 19, ch. 41 (renvois en double, et la liste
  « mauvais choix ») ; notes [^3] et [^4] (renumérotées [^1] et [^2] ; l'ancienne [^1], mal de caribou, et [^4], signes
  du botulisme, sont dans les pages des dangers) ; « 5.1 » à « 5.10 » (numéros des anciennes sous-sections).

## Corrections après la vérification technique, 19 octobre 2026

Rédacteur (rôle 2). Onze points du vérificateur technique sur la refonte ; dix appliqués (deux avec une retouche de
forme), un écarté au profit d'une coupe. Aucune recherche nouvelle (JP, 19 octobre : « fuck les sources, on a pas
déjà fait ce travail-là ? ») : chaque correction s'appuie sur une page déjà dans `/sources` ou sur un autre chapitre.

| # | Où | Ce qui est fait | Appui |
| --- | --- | --- | --- |
| 1 | Étape 8, la famille de l'exemple | **Appliqué** : « un homme et une femme de 19 à 30 ans, un enfant de 4 ou 5 ans et un enfant de 6 ou 7 ans », 8 550 à 8 800 kcal. Avec « deux enfants de 4 à 7 ans », la fourchette allait de 8 350 à 8 950 | `sources/08-msss-besoins-energetiques.md`, tableau 1, « actif » : 3 000 + 2 350 + 1 500 à 1 650 + 1 700 à 1 800 |
| 2 | Étape 4, le local qui gèle | **Appliqué, resserré** : le bocal maison qui a gelé doit être jeté, même s'il n'est pas fendu ; si le local gèle, descendre conserves et bocaux à la maison avant les gels (ch. 84, étape 9) ; ne pas les mettre au caveau, dont l'humidité rouille couvercles et boîtes (ch. 79). « Ni au congélateur, où ils gèlent » n'est pas écrit : la phrase d'avant dit déjà que le bocal gelé se jette, et le congélateur sort avec l'ancienne consigne. Par cohérence, la ligne « Température du local » des Points de contrôle (« jeter les bocaux de conserve maison (étape 4) ») et le témoin de gel de la section 7 (« les bocaux de conserve maison sont à jeter (étape 4) ») renvoient à l'étape 4 | `chapitres/84-ouvrir-et-fermer-le-chalet.md`, étapes 9 et 42 (« un bocal de conserve maison qui a gelé se jette, fendu ou non » ; « Pas au caveau… l'humidité rouille les couvercles et les boîtes jusqu'à défaire le scellé ») |
| 3 | Étapes 8, 10 et 11, le chiffre du stock | **Appliqué** : le stock se bâtit sur **9 500 kcal par jour**, le besoin d'un hiver de travail dur (ch. 21), pris comme un minimum ; trois mois font **855 000 kcal** (90 × 9 500) au lieu de 810 000. Étape 10 : le sac de farine de 2,5 kg (environ 9 100 kcal) devient « presque une journée de la famille ». Question rendue à JP (garder 9 000 ? la phrase de repli du vérificateur est notée dans le rapport). Le ch. 21 (l. 115 à 121), le ch. 88 (l. 29 et 30) et `plan/chiffres-a-valider.md` (ch. 08, point 2) disent encore 9 000 : rendus à l'orchestrateur | `chapitres/21-ce-qu-un-corps-demande-l-hiver.md`, l. 112 et 113 (« Chiffre de planification : 9 500 kcal/jour ») et l. 286 (contrôle au tiers et aux deux tiers de l'hiver : 9 500) ; provenance dans `suivi/21-redaction.md` |
| 4 | Étape 5, les 9,8 L | **Appliqué** : « Un homme, une femme et deux enfants de 4 à 8 ans » | Ch. 21, section 5.5, tableau de l'eau totale (3,7 + 2,7 + 1,7 + 1,7 L) |
| 5 | Étape 33, la génératrice | **Appliqué, en deux phrases** : « Faire tourner la génératrice dehors, à découvert, à au moins 6 m du chalet et du cabanon. Jamais dans le cabanon ni dans un autre bâtiment, même porte ouverte, ni sous un auvent. » Le rappel de `CLAUDE.md` (bâtiment, garage, auvent) est complet ; le monoxyde reste la raison, sans redire la page | `sources/10-sante-canada-generatrice-distance.md` (6 m) ; page `generatrice` (dangers/partie-1.md : « à découvert, sans toit ni bâche au-dessus » ; remise, garage, auvent, porte ouverte) |
| 6 | Étape 24, le poisson | **Appliqué** : « Garder le poisson fumé ou salé gelé, ou sous 3 °C, jamais sur les tablettes du stock » ; renvoi aux ch. 76 et 77 | `chapitres/76-saler-et-secher-la-truite.md`, section I, points 3 et 4 (produit court sous 3 °C, au plus 14 jours ; produit de garde le plus froid possible, de préférence congelé) ; page `botulisme` (type E dès 3 °C) |
| 7 | En plus, « Le pemmican » | **Appliqué, réécrit pour tenir sous 80 mots** : « l'hiver » sort ; la viande est chauffée à 71 °C à cœur pendant 15 secondes avant d'être séchée (ch. 72) ; on n'en fait jamais avec de l'ours, parce que le séchage ne tue pas la trichine. 80 mots | `sources/67-encyclopedie-canadienne-pemmican.md` ; `chapitres/72-pemmican-et-graisses.md`, étape 15 et section 8, point 2 ; page `trichine` |
| 8 | En plus, « La bannique des Innus » | **Appliqué** : « sans galets ramassés dans l'eau autour du feu : une pierre gorgée d'eau éclate à la chaleur (ch. 88) ». « Avec le feu qu'on fait déjà » coupé pour rester sous 80 mots (75) | `chapitres/88-le-pain.md`, section 9-C, étape 1 ; `sources/14b-bannique-sable-innue.md` |
| 9 | Étape 1, « fait vivre la famille » | **Écarté au profit d'une coupe** : la phrase sort au lieu d'être réécrite. La phrase d'avant (« compléter d'abord le bois, les moyens d'allumage, l'eau et le gras, avant d'ajouter de la nourriture ») donne déjà la priorité ; la comparaison proposée (« vaut mieux qu'un gros stock de nourriture sans bois ni allumettes ») la redit en formule (skill `ecriture`, « Pas de redite d'une phrase à l'autre » et « la chute en formule »). L'affirmation sans source disparaît avec elle | Ch. 1 (l'ordre des horloges), déjà renvoyé dans la même étape |
| 10 | Étape 34, les piles au lithium | **Appliqué** : « Choisir un modèle dont la pile au lithium dure 10 ans. Dans un modèle dont on change les piles, mettre des piles au lithium. » Les deux phrases exactes de la page, relevées par le vérificateur le 19 octobre : « Privilégiez les modèles avec des piles au lithium qui ont une durée de vie de 10 ans » ; « Privilégiez des piles longue durée comme celles au lithium et n'utilisez pas de piles rechargeables à moins qu'elles soient recommandées par le fabricant ». L'extrait de la fiche source (« [piles au lithium] durée de vie de 10 ans ») reste ambigu : la fiche gagnerait à porter ces deux phrases (pas touchée ici, rendue à l'orchestrateur) | `sources/08-quebec-avertisseurs-monoxyde-carbone.md` |
| 11 | En plus, « Ranger les bocaux sans leur bague » | **Appliqué** : le renvoi passe de l'étape 48 à l'étape 23 (ce qu'on jette à chaque visite) ; la note se placera près de l'étape 23 | `sources/08-nchfp-entreposage-conserves-maison.md` ; ch. 78, étape 23 |

Tableau des notes « En plus » (plus haut, mis à jour à la reprise) : la bannique a maintenant 76 mots, le pemmican 79
(comptés avec `wc -w`, renvoi compris ; « l'hiver » sort ; la viande chauffée à 71 °C pendant 15 secondes : ch. 72),
la note des bagues renvoie à l'étape 23.

**Reprise du même jour (après le redémarrage du conteneur).** Les onze points étaient déjà appliqués dans le texte
commité ; vérifié un par un contre `git diff 40920d1`. Une retouche de forme : à l'étape 33, la deuxième phrase
n'avait pas de verbe (« Jamais dans le cabanon ni dans un autre bâtiment… ») ; elle devient « Ne jamais la mettre
en marche dans le cabanon ni dans un autre bâtiment, même porte ouverte, ni sous un auvent. » (règle 0). Les
lignes de la refonte que ces corrections rendent fausses (la famille de l'exemple, le 9 000 kcal, l'étape 33 dans le
tableau de l'ancienne section 8, la ligne du 9 500 dans « Chiffres nouveaux », les mots et les étapes des notes
« En plus ») portent maintenant un renvoi à ce tableau.

**controle.py après la reprise** : 8 308 mots, 2 tirets (titre et ligne de tome), 0 mot banni, 0 « § », 0 âge, 0
maxime, 1 tournure (« On les oublie », étape 44 : faux positif), 42 mots vides jugés comme avant, 2 redites (même nom
pour le même tour) ; contre le texte commité, « rien n'a disparu ».

**controle.py après les corrections** (avant la reprise) : 8 303 mots, 2 tirets (titre et ligne de tome), 0 mot banni, 0 « § »,
0 âge, 0 maxime, 1 tournure (« On les oublie », étape 44 : faux positif), 42 mots vides jugés comme avant, 2 redites
(« tour du printemps et de l'automne », même nom pour le même tour). Ancre signalée : la photo 05-boite-bombee, dont
la nouvelle ancre (étape 23) est rendue à l'orchestrateur. Invariants contre la refonte : « ch. 77 » (l'étape 24 dit
« aux ch. 76 et 77 ») ; « 810 » (devenu 855 000 kcal, correction 3).
