> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 19. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Fiche de suivi — Chapitre 19, Communiquer et savoir

- **Tome :** 1 — Tenir
- **Fichier :** `chapitres/19-communiquer-et-savoir.md`
- **Statut :** RÉD (rédigé, aucune porte passée)
- **Date de rédaction :** 20 septembre 2026
- **Ampleur :** environ 5 000 mots utiles, sections 1 à 9, plus la section 10. Estimation de mise
  en pages : 7 pages en 8 × 10 hors images. **Le chapitre est à la limite haute de la fourchette
  du projet** — voir les notes pour l'éditeur, qui indiquent quoi couper si la pagination l'exige.

---

## 1. Le fait qui change le chapitre, à lire en premier

**Le réseau Radio-Météo d'Environnement Canada n'est plus en service.** ECCC affiche en tête de
toutes ses pages : « Avis important : Radio-météo et Bonjour Météo ne sont plus en service. »
(consulté le 20 septembre 2026, enregistré dans `sources/19-eccc-radiometeo.md`).

Conséquence sur le livre entier, pas juste sur ce chapitre : **aucun chapitre ne doit conseiller
l'achat d'un récepteur météo VHF à tonalité d'alerte.** C'était l'item classique des listes de
préparation, il est dans à peu près toutes les listes publiées avant cette année, et il ne capte
plus rien. À vérifier dans les chapitres 8, 9, 10 et 11 avant l'impression, et à signaler au
vérificateur technique comme point de contrôle explicite.

C'est aussi, structurellement, la même erreur que le 71 °C du chapitre pilote : un item plausible,
présent partout, faux. Il n'a été attrapé que parce que la page a été ouverte.

---

## 2. Chiffres marqués `[À VÉRIFIER]`

| # | Valeur | Où | Pourquoi ce n'est pas sourcé | Qui peut trancher |
| --- | --- | --- | --- | --- |
| 1 | Seuil de température sous lequel une batterie au lithium-ion refuse la charge | Section 3 | Fait de chimie connu, mais aucune page officielle consultée ne le chiffre. Le chapitre dit « sous le point de congélation » sans valeur précise | JP, sur la fiche du fabricant des appareils réels. Une photo de la notice règle la question |
| 2 | Couverture cellulaire réelle au chalet et sur le chemin d'accès | Section 5, étape 2 | Aucune donnée publiable : les cartes de couverture des fournisseurs sont commerciales et optimistes | **À mesurer, pas à sourcer.** C'est l'étape 2 de la procédure, et le résultat va au cahier de bord |
| 3 | Longueur utile de l'antenne filaire de réception (« une dizaine de mètres ») | Section 5, étape 3 | Dépend entièrement du site et des arbres disponibles | Le relecteur radioamateur, ou l'essai sur place |
| 4 | Portée réelle des radios portatives exemptes de licence en forêt boréale | Section 4 | Les portées des emballages sont des chiffres de vendeur. Les cahiers des charges (CNR) d'ISDE n'ont pas été consultés | Relecteur radioamateur pour les paramètres, JP pour la mesure. **Ne pas combler avec un chiffre d'emballage** |
| 5 | Code international des signaux sol-air | Section 9 | Aucune source officielle enregistrée. Le chapitre dit explicitement qu'il ne le reproduit pas | À obtenir (Garde côtière, Transports Canada ou manuel IAMSAR) et à enregistrer avant l'impression |
| 6 | Délai de mobilisation d'une équipe SAR sur la Côte-Nord | **Non écrit dans le chapitre** | Écarté volontairement. Le chapitre écrit « des heures » sans chiffrer, dans l'encadré DANGER | Si un chiffre est un jour trouvé, il renforce l'encadré. Tant qu'il n'existe pas, ne pas l'inventer |
| 7 | Puissance et canaux des radios SRF / service général de radiocommunication mobile | **Non écrit dans le chapitre** | Écarté volontairement : les CNR n'ont pas été consultés | À ajouter seulement avec le CNR en main |

**Aucun autre nombre du chapitre n'est sans source.** Tous les autres (162,400 à 162,550 MHz ;
60 km ; 2182 kHz ; 156,800 MHz ; 156,525 MHz ; 406 MHz ; six mois ; 10 minutes par 30 minutes ;
1 800 463-5060 ; 1-800-406-7671 ; 1-877-406-3298 ; 60 $) portent leur organisme entre parenthèses
dans le texte et leur extrait intégral dans `/sources`.

---

## 3. Points de traçabilité à régler avant l'impression

| Problème | Détail | Gravité |
| --- | --- | --- |
| **Le site `alerte.gouv.qc.ca` n'a pas pu être extrait** | La page de Québec En Alerte se construit côté navigateur et ne rend aucun texte lisible. Aucune consigne du chapitre n'en vient — tout passe par `enalerte.ca` | **Faible** pour le contenu, **moyenne** pour la vérification : il faut confirmer si le site offre une inscription, ce qui ajouterait une étape à la section 5 |
| **Aucune date de fin du service Radio-Météo** | ECCC annonce l'arrêt sans dire quand. Le chapitre écrit « n'est plus en service » au présent, sans date | **Faible**, mais à relire si le livre paraît plus d'un an après la rédaction |
| **La publication de la Garde côtière s'adresse aux navigateurs** | MAYDAY, PAN PAN, voie 16, RLS : tout est écrit pour un navire. Le chapitre s'en sert comme gabarit de message, ce qui est légitime, et **ne prétend jamais qu'une obligation maritime s'applique au chalet** | **Moyenne.** C'est exactement le genre de glissement qu'un relecteur pressé introduirait en « simplifiant ». Ne pas laisser réécrire « l'enregistrement est obligatoire » sans la précision « pour les bâtiments » |
| **Le 911 par lien satellite** | Les limites citées valent pour la téléphonie IP et le Wi-Fi. Savoir si un appareil satellite donné joint le 911 dépend du produit et du fournisseur ; le chapitre renvoie au fournisseur | **Moyenne.** Vérifier auprès du fournisseur réel du chalet et écrire la réponse sur la fiche de position |
| **Aucun seuil de CO en ppm dans ce chapitre** | Volontaire : les seuils sont au chapitre 14, avec les fiches CNESST et Santé Canada. Le chapitre 19 donne le mécanisme et la règle, pas la grille | **Faible.** À ne pas « compléter » : la grille en double dans deux chapitres finit par diverger |

---

## 4. Rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

| Règle du tableau | Où elle est dans le chapitre |
| --- | --- |
| **Génératrice : jamais** dans un bâtiment, un garage ou sous un auvent | Section 8, encadré DANGER, partie 1 — avec son mécanisme, la règle du garage de toile, le cas du camion et la conduite à tenir sans service d'incendie. Rappelée aussi aux sections 4, 6 et 7 |

**Écartés volontairement, pour ne pas diluer l'encadré :** cuisson du gibier à 74 °C, cadmium des
cervidés, trichinellose, tularémie, thuyone du cèdre, botulisme de type E, mal de caribou. Aucun
ne touche au sujet du chapitre. Un encadré DANGER qui parlerait de viande dans un chapitre de
communication est exactement ce qui apprend au lecteur à sauter les encadrés.

**Ajouté par le chapitre, hors tableau :** la deuxième partie de l'encadré, sur la fausse
assurance que donne un appareil de secours. Ce n'est pas un rappel du projet, c'est un risque
propre au sujet, et il est formulé avec son mécanisme (l'écart entre le délai du secours et le
délai du corps). **Si quelque chose doit être défendu en relecture, c'est ce passage** : il est
moins concret qu'un chiffre de CO, et c'est pourtant ce qui tue le plus de monde équipé.

---

## 5. Images requises

| # | Sujet | Cadrage | Format | Notes |
| --- | --- | --- | --- | --- |
| 19-1 | **Les trois étages : écouter, joindre, être trouvé** | Schéma en trois bandes horizontales. Bande du bas : récepteur AM/FM, antenne filaire, flèche entrante seulement. Bande du milieu : appareil satellite, flèches dans les deux sens, avec la mention « accusé de réception ». Bande du haut : balise 406 MHz, flèche sortante unique vers un satellite, sans retour. La consommation relative en énergie inscrite sur le côté, du plus petit au plus grand | Demi-page | **Planche dessinée.** C'est la structure de tout le chapitre en une image, et elle montre du premier coup d'œil pourquoi l'écoute survit à l'émission |
| 19-2 | **Pourquoi l'alerte n'arrive jamais au chalet** | Schéma : à gauche, une tour LTE et un téléphone qui reçoit ; à droite, le chalet hors couverture, le même téléphone, la même alerte, et la troisième condition barrée d'un trait rouge avec sa citation (« connecté à un réseau cellulaire LTE lors de l'émission de l'alerte »). En bas, le canal qui reste : un poste de radio à piles | Quart de page | **Planche dessinée.** Contredit visuellement la croyance la plus répandue du lecteur. La citation doit être lisible sur le dessin |
| 19-3 | **La fiche de position, affichée** | Gros plan sur la fiche plastifiée clouée au mur, à hauteur d'œil, à côté du récepteur : coordonnées dans les deux écritures, description de l'accès, aire dégagée, distances. Lumière de jour, texte parfaitement lisible | Quart de page | **Photo de JP.** Le texte doit être lisible à l'impression : c'est un gabarit à copier, pas une illustration d'ambiance |
| 19-4 | **Une page de cahier de bord remplie** | Vue rapprochée d'une page ouverte, écriture au crayon, plusieurs jours visibles : date, heure, température, source entendue, messages envoyés et accusés reçus, décision du jour | Quart de page | **Photo de JP.** Montrer une page **réellement remplie**, ratures comprises. Une page parfaite ne convainc personne de commencer |
| 19-5 | **L'antenne filaire et sa mise à la terre** | Deux vignettes : le fil tendu entre deux épinettes noires, vu de bas en haut pour donner la hauteur ; puis gros plan sur la descente, la borne du récepteur et la tige de mise à la terre enfoncée dans le sol | Demi-page | **Photo de JP, ou planche.** La mise à la terre est ce que tout le monde saute. Elle mérite sa propre vignette |
| 19-6 | **Recharger sans s'intoxiquer** | Génératrice dehors, en terrain dégagé, le plus loin possible des portes et des fenêtres, avec le câble qui entre par une ouverture précise. Cadrage **large**, pour que la distance au bâtiment soit évidente sur l'image elle-même. Avertisseur de CO visible à l'intérieur en arrière-plan si le cadrage le permet | Demi-page | **Photo de JP.** L'image doit contredire d'elle-même l'idée de rapprocher la machine du chalet. Porte l'encadré DANGER, partie 1. Peut voyager avec les ch. 4 et 14 |
| 19-7 | **Le poste à galène** | Planche éclatée : antenne longue, bobine, condensateur variable, détecteur (diode ou lame de rasoir et mine de crayon), écouteur haute impédance, mise à la terre. Chaque pièce nommée, avec la substitution de fortune indiquée à côté | Quart de page | **Planche dessinée.** Sert la section 9. Ne pas embellir : un montage crédible, pas un schéma de manuel scolaire |

**Rien de tout ça ne se copie du web.** Les planches 19-1, 19-2 et 19-7 sont à dessiner ; les
photos 19-3 à 19-6 sont des photos de JP. Voir `images/credits.md`.

---

## 6. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 2 — Rester ou partir | La décision ne se délègue pas à une conversation radio. Le ch. 19 alimente la décision, le ch. 2 la tranche |
| 3 — Le froid lui-même | Le délai du corps contre le délai du secours, dans l'encadré DANGER |
| 4 — Panne majeure d'Hydro en janvier | Suivre l'état du réseau, recharger, génératrice |
| 5 — Épidémie | Discipline d'information pendant un événement long |
| 6 — Retombées radioactives | Le risque radiologique est une catégorie d'alerte d'En Alerte : c'est par la radio que la consigne de mise à l'abri arrive |
| 10 — Quand on a un préavis | Les délais d'avertissement et de veille. **Le ch. 10 cite déjà En Alerte : vérifier que les deux chapitres ne se contredisent pas et que l'un ne renvoie pas à l'autre en boucle** |
| 14 — Sans propane | Les seuils de CO en ppm et le choix de l'avertisseur. Le ch. 19 ne les répète pas |
| 18 — Éclairage | Budget de batterie, arbitrage entre lumière et communication |
| 20 — Se déplacer et le carburant | Carburant de la génératrice, poste du véhicule, envoyer quelqu'un |
| 21 — Le voisinage et le groupe de chasse | Relais humain, horaire de visite convenu |
| 22 — Qui cogne à la porte | Ce qu'on ne dit pas sur les ondes : une radio est une diffusion |
| 23 — S'organiser à plusieurs familles | Horaire de contact partagé entre plusieurs feux |
| 27 — Soigner quand il n'y a personne | Ce qu'on transmet d'un blessé, et ce qu'on fait en attendant |
| 31 — Ce qu'on ne peut pas soigner | La décision d'évacuer et le moment de la prendre |
| 32 — Tenir le moral tout un hiver | L'écoute continue comme habitude destructrice |
| 33 — Les enfants, la peur et la routine | Ce que les enfants entendent, et la valeur d'une réponse reçue |
| 35 — Lire le territoire autour du chalet | Cartes, coordonnées, points de repère de la fiche de position |
| 54 — Pêche blanche | Le cas d'usage type de la fiche de sortie, et l'exemple de la fausse assurance |

Tous vérifiés contre la liste des 89 chapitres. Aucun renvoi inventé.

---

## 7. Relecteur humain requis

**Oui — deux profils, et le chapitre ne part pas à l'impression sans les deux.**

1. **Un opérateur radio certifié** (radioamateur, ou détenteur du CRO-M). Pour les sections 3, 4
   et 5 : la propagation AM/FM/VHF, l'antenne et sa mise à la terre, l'exactitude de ce qui est
   dit des licences et des exemptions, et la formulation des paliers d'alerte. Un rédacteur qui a
   lu des pages officielles n'a jamais fait passer un message dans la tempête.
2. **Une personne du milieu de la répartition d'urgence ou du sauvetage** (centre 911, SCTM,
   équipe de recherche et sauvetage bénévole). Pour la section 5, paliers 1 à 3, et pour l'encadré
   de la section 8. Deux passages en particulier :
   - **Le protocole du correspondant à terre** (étape 5) est une écriture du rédacteur, pas une
     consigne officielle. Il faut valider ce qu'un centre 911 attend réellement d'un appelant qui
     signale un silence, et ce qu'il faut lui dire pour que l'information serve.
   - **Le gabarit de message d'urgence** (étape 16) transpose la structure maritime officielle à un
     message texte. La transposition est raisonnée, elle n'est pas officielle.

**Le chapitre 19 n'est pas dans la liste des relectures obligatoires de `CLAUDE.md`. Il devrait y
être ajouté.** Il peut voyager chez le même relecteur que les chapitres 4, 14 et 16 pour la partie
monoxyde de carbone.

---

## 8. Notes pour l'éditeur

- **Ce qui ne se coupe pas :** l'avis de fin de service de Radio-Météo (section 3) et les trois
  conditions de réception d'En Alerte (section 3). Ce sont les deux seuls endroits du livre où le
  lecteur apprend que les deux moyens auxquels il pense spontanément ne fonctionneront pas chez
  lui. Tout le reste du chapitre découle de ces deux faits.
- **Ce qui se coupe en premier si la pagination l'exige :** le détail des certificats d'ISDE dans
  la section 4 (radioamateur, droits, mentions) peut descendre à deux phrases, et les exemples
  de signaux visuels de la section 9 peuvent se resserrer. Ne pas toucher aux tableaux 6 et 7 :
  ce sont les pages qu'on ouvre en panique.
- **Le chapitre est bâti autour d'une idée que l'éditeur pourrait prendre pour du remplissage :**
  cinq des sept items non négociables ne sont pas des appareils mais du papier — cahier, crayon,
  fiche de position, liste de numéros. C'est voulu et c'est le propos. Un appareil sans protocole
  écrit ne produit aucune communication ; un protocole écrit sans appareil en produit encore un
  peu, par le relais humain de la section 9.
- **Chevauchement à arbitrer avec le ch. 10** (préavis, alertes) et le **ch. 21** (voisinage,
  relais). Le ch. 19 pose les canaux et le protocole ; le ch. 10 pose les délais ; le ch. 21 pose
  les gens. Vérifier qu'aucun des trois ne renvoie aux deux autres pour la même information,
  sinon elle n'existe nulle part.
- **La section 2 nomme explicitement le lien satellite déjà en place au chalet** et dit que le
  livre ne cherche pas à le remplacer. Garder cette honnêteté : elle désarme le réflexe « je l'ai
  déjà, je saute ce chapitre », qui est précisément le réflexe à casser.
- **Un seul encadré DANGER, en deux parties.** Ne pas en faire trois, et surtout ne pas déplacer
  la partie 2 (la fausse assurance) dans le corps du texte : hors de l'encadré, elle se lit comme
  une opinion, et c'est un mécanisme de mort.

## Passe des planches — 23 septembre 2026

**Déclencheur :** relecture de la planche 19-01 (le poste à galène en pièces récupérées). Le
relecteur a noté qu'une pastille piézo seule derrière le détecteur n'a aucune résistance pour se
décharger. Vérifié à la source : confirmé.

**Ce qui a changé** — section « Écouter sans une seule pile », point 4 (l'écouteur), ajout après
la liste de ce qui fonctionne comme écouteur :

- La pastille piézo exige une résistance de 10 à 100 kΩ, tordue ou soudée entre ses deux fils.
  → `sources/19-wikipedia-poste-a-galene-ecouteur.md` (« a 10–100 kΩ resistor must be added in
  parallel with the earphone's input »). Concorde avec `sources/19-wenzel-poste-a-galene.md`
  (montage à 82 kΩ, dans la plage).
- Le piézo est un condensateur, ne passe pas le continu, se charge derrière la diode ; la
  résistance le vide. → Wikipedia (capacité propre de l'écouteur piézo, résistance en mégohms) ;
  Wenzel (« the 82k resistor which discharges the capacitor »).
- Sans la résistance, le poste marche parfois avec une diode au germanium, parce qu'elle fuit, mais
  pas de façon fiable. → Wenzel (« may work somewhat but only because the diode has significant
  leakage and the performance will not be predictable »). C'est exactement ce que le relecteur
  avait soupçonné.
- Où la trouver : toute carte électronique morte (chargeur, vieux poste, appareil ménager). Pas de
  chiffre, pas de source requise : une carte électronique porte des résistances.
- Lire la valeur à l'œil : résistance à quatre bandes, bande dorée à droite, la troisième bande
  compte les zéros ; troisième bande orange = 10 à 99 kΩ. → `sources/19-wikipedia-code-couleurs-resistances.md`
  (multiplicateur = nombre de zéros ; orange = 3 ; exemple avec la bande dorée de tolérance au
  bout). Règle donnée pour quatre bandes seulement ; les résistances de précision à cinq bandes se
  lisent autrement et le chapitre ne s'y aventure pas.
- La capsule de combiné téléphonique, qui est une bobine, laisse passer le courant et se branche
  seule. → Wenzel (« A dynamic earphone may be DC coupled eliminating the need for the resistor » ;
  il cite le vieux récepteur téléphonique comme écouteur). Qu'une capsule de combiné filaire soit un
  écouteur à bobine est une déduction, pas une citation : le relecteur humain peut la confirmer
  d'un coup de multimètre (continuité aux bornes).

**Sources :** aucun organisme officiel ne couvre le poste à galène. Retenus : un ingénieur
électronicien reconnu (Charles Wenzel, techlib.com) et l'article encyclopédique, qui concordent.
Les forums trouvés en chemin (valeurs de 470 kΩ à 2 MΩ citées sur radiomuseum.org) n'ont pas été
retenus et aucune de leurs valeurs n'entre au chapitre.

**Planche 19-01 :** à reprendre — la pastille est dessinée seule sur ses deux fils, dans la vue du
poste et dans la vue du détecteur. Brief transmis au dessinateur (résistance ajoutée dans les
deux vues, nouveau renvoi 11 dans la vue du détecteur, renvois de la vue de l'antenne décalés de
un, de 12 à 15). Le chapitre ne cite aucun numéro de renvoi : rien à renuméroter dans le texte.

## Notes retirées du chapitre — 23 septembre 2026

- Section 4, paragraphe « Les portées annoncées sur les emballages sont des chiffres de vendeur » :
  « Aucune portée n'est donnée ici pour les radios portatives, parce qu'aucune valeur officielle
  n'a été trouvée et qu'un chiffre plausible non sourcé serait une erreur. »

## Passe légal et signes — 23 septembre 2026

- Section 4, paragraphe radioamateur : « Écouter n'exige rien de personne » (allusion à
  l'autorisation radio) devient « Écouter ne demande qu'un poste » ; « La qualification de base
  se passe en septembre » (le certificat d'opérateur) devient « Ça s'apprend en septembre ». La
  source `sources/19-isde-autorisations-radio.md` reste au dossier, elle ne sert plus au texte.
- Gardés : le 911, le Registre canadien des balises et ses numéros, le Centre antipoison, la
  procédure MAYDAY et PAN PAN (des services qu'on appelle et une façon de parler sur les ondes,
  pas du code légal).
- Aucune note de bas de page : les signes nommés (mal de tête, enfant fatigué ou de mauvais
  caractère, grésillement, contact vert) sont déjà décrits ou reconnaissables sans description.
- Aucune ligne « 19 » dans `suivi/doutes-passe-paperasse.md`.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/19-verifications.md` appliqués au chapitre. Plus aucun drapeau dans le texte.

| Chiffre ou fait | Où | Verdict | Provenance |
| --- | --- | --- | --- |
| Autonomie des tours : quelques heures sur batteries, davantage avec génératrice fixe ou amenée en camion ; aucune heure précise (varie selon le site) | §3, « À la maison, les trois conditions sont remplies » | Levé (source de presse) | `sources/19-cbc-2018-batteries-tours-cellulaires.md` |
| Recharge lithium-ion : pas sous 0 °C, certaines cellules pas sous 10 °C ; appareil satellite donné jusqu'à -20 °C | §3, « Le froid attaque la communication par les piles » | Levé | `sources/19-lithium-ion-recharge-au-froid.md` (fiches Garmin et Panasonic) |
| Portée des radios portatives : 26 km sommet-vallée, moins d'un kilomètre entre des maisons, pour la même radio | §4, après le tableau Matériel | Levé | `sources/19-motorola-talkabout-portee.md` |
| Couverture cellulaire au chalet : donnée de terrain, drapeau coupé | §5, étape 2 | Introuvable par nature | — |
| Antenne : une vingtaine de mètres (75 pi) entre isolateurs, 9 m du sol au moins ; tige de terre enfoncée de 1 à 2 m (au lieu d'« une dizaine de mètres ») | §5, étape 3 | Corrigé | `sources/19-nbs-circulaire-120-poste-recepteur.md` |
| Bobine du poste à galène : cylindre de 10 cm, 80 spires, une prise toutes les 10 spires sur 70, puis une par spire sur les 10 dernières | §9, « La bobine » et « L'accord » | Levé | `sources/19-nbs-circulaire-120-poste-recepteur.md` |
| Micro à charbon : 3 V, deux piles en série par appareil ; paire de rechange dans une poche intérieure au froid. Aucune tension sourcée pour la boucle simple : l'essai à l'oreille règle | §9, « Le téléphone de campagne » | Levé pour le micro | `sources/19-us-army-tm11-333-telephone-ee8.md` |
| Code sol-air : V, X, N, Y, flèche ; LL, F, L, W au Canada ; 2,4 m au moins ; LL à 3 m ; trois feux en triangle. « Un `X` piétiné » remplacé par « un `V` piétiné » | §9, « Ce que l'œil attrape d'en haut », fumée, son | Levé | `sources/19-transports-canada-aim-signaux-sol-air.md` |

Non appliqués, faute de drapeau (section « À corriger ailleurs » du fichier de vérifications) : les chiffres de l'antenne et de la terre au §9 (« L'antenne et la mise à la terre… »), la portée de 80 km du poste à galène, et le geste de la paire de rechange au §7.

- Compression §3 et §4 — 27 septembre 2026 : 1676 mots → 198 mots (§3 : 773 → 119 ; §4 : 903 → 79, tableau devenu liste de 4 lignes) ; matériel coupé : piles de rechange (fondues dans la ligne du récepteur), crayon de bois (→ §9 « Écrire quand il n'y a plus de papier »), fiche de position plastifiée (produit de l'étape 4), liste papier des numéros, antenne filaire et fil de terre (fil de récupération, étape 3 et §9), radios portatives et code de sifflet, balise 406 MHz (doublon de l'appareil satellite avec SOS ; reste optionnelle aux étapes 6 et 8), montre ou horloge, substitut « VHF de bateau sur 12 V », paragraphes après le tableau (dédoublement maison/chalet, radioamateur, portées d'emballage 26 km / moins d'un kilomètre, renvoi ch. 85, ch. 42 et chapitre d'achat). §3 : sortent Radio-Météo 162,400-162,550 MHz et 60 km, l'autonomie des tours (quelques heures sur batteries), les trois conditions LTE (déjà au §8), la limite de -20 °C de l'appareil satellite, le détail de la balise. Déplacé : « le signal de la balise ne porte qu'un numéro ; non inscrite, elle alerte sans dire qui appelle » → §5, étape 6. Aucun appel de note, aucun renvoi « section 4 » à corriger ; le renvoi « (section 3) » du §9 (ondes moyennes réfléchies la nuit) reste couvert.
