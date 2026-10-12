> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 28. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 28 : Hygiène et eaux usées

- **Tome :** 2 — Le corps
- **Fichier :** `chapitres/28-hygiene-et-eaux-usees.md`
- **Rôle :** 2 — Rédacteur
- **Date :** 2026-09-20
- **Longueur :** environ 4 600 mots utiles (6 866 mots bruts, syntaxe de tableau incluse)
- **État :** premier jet complet, prêt pour les rôles 3 (vérification technique) et
  4 (vérification sécurité)

---

## 1. Chiffres marqués [À VÉRIFIER]

| # | Valeur ou affirmation | Où, dans le chapitre | Pourquoi ce n'est pas sourcé |
| --- | --- | --- | --- |
| 1 | Consommation annuelle de savon pour 4 personnes (12 pains/an) | §4, tableau matériel | Aucune source officielle. À remplacer par une mesure réelle sur une saison, ou à retirer du tableau et laisser « réserve de 12 mois » sans chiffre |
| 2 | Volume de sciure, de tourbe ou de terre sèche par usage de bécosse | §5-D étape 22 | Aucune source officielle canadienne trouvée. Chiffre utile pour dimensionner le baril et la récolte d'automne. Chercher du côté des guides de parcs (SEPAQ, Parcs Canada) ou d'un manuel d'assainissement autonome |
| 3 | Part de l'urine dans le volume quotidien, en L/personne/jour | §5-E étape 28 | Le guide technique du ministère donne les charges de DBO₅ et de MES par personne et par jour, pas la répartition urine/fèces. Chercher dans la littérature d'assainissement écologique |
| 4 | Effet d'une colonne de ventilation peinte en noir sur le tirage d'une fosse sèche | §5-C étape 19 | Pratique répandue, mécanisme plausible (tirage thermique), aucune mesure trouvée. Reformuler ou retirer si rien ne sort |
| 5 | Volume d'eau d'une toilette complète à l'éponge (2 à 4 L) et volume de rinçage des cheveux (4 L) | §5-G étapes 38 et 41 | Aucune source. Ce sont des ordres de grandeur d'usage, pas des mesures. À mesurer au chalet plutôt qu'à sourcer |
| 6 | Seuils d'oxygène et de sulfure d'hydrogène dans un espace clos type fosse ou fosse de rétention | §8, encadré DANGER, point 5 | **Le plus important des sept.** Le mécanisme est décrit sans chiffre, ce qui est acceptable, mais la CNESST publie des seuils et une méthode d'entrée en espace clos. Chercher CNESST / Reptox / règlement sur la santé et la sécurité du travail, section espaces clos |
| 7 | Nom latin du pou de tête, *Pediculus humanus capitis* | §5-J étape 58 | La page Québec.ca consultée ne donne pas le nom latin. Il vient de la nomenclature courante. À confirmer, ou à remplacer par une espèce dont le nom latin est sourcé |

**Aucun autre chiffre du chapitre n'est sans source.** Toutes les valeurs
réglementaires, toutes les durées, toutes les températures et toutes les concentrations
portent leur organisme entre parenthèses dans le texte.

## 2. Le point réglementaire, à traiter en priorité

Le texte même du **Règlement sur l'évacuation et le traitement des eaux usées des
résidences isolées** (RLRQ, chapitre Q-2, r. 22) a répondu **HTTP 403** sur LégisQuébec le
jour de la consultation, en HTML comme en PDF — même symptôme que celui rencontré au
chapitre 13 avec le RPEP.

Toutes les valeurs réglementaires du chapitre 28 proviennent donc du **guide technique
officiel du ministère**, édition de janvier 2009 révisée en mars 2015, qui cite le
Règlement article par article. Le guide est une source ministérielle, pas un blogue, et
il est enregistré intégralement dans
`sources/28-melccfp-guide-eaux-usees-residences-isolees.md`. Mais il a deux faiblesses :

1. **Il date de 2015.** Le Règlement a pu changer depuis. Le vérificateur technique doit
   confirmer chaque valeur dans le texte réglementaire en vigueur et **noter le numéro
   d'article en regard de chaque chiffre**.
2. **Il ne remplace pas la municipalité.** Le permis est municipal et la municipalité peut
   être plus sévère. Le chapitre le dit à l'étape 12 et le répète en section 10 ; ne pas
   supprimer ce rappel à l'édition pour gagner des lignes.

Valeurs réglementaires à confirmer une par une :

- Terrain récepteur : sol perméable ou très perméable, nappe/roc à plus de 1,2 m, pente
  inférieure à 30 %
- Fosse : 1,2 m × 1,2 m × 1 m minimum ; fond à au moins 60 cm au-dessus du roc ou de la
  nappe
- Soubassement de 10 cm × 10 cm ; remblai maximal de 60 cm ; pente de remblai de 1 : 2
- Ventilation : diamètre d'au moins 10 cm, dépassant de 60 cm au-dessus du toit
- Usage : combler à 40 cm de la surface et déplacer l'abri
- Tableau B.4.2 : 30 m, 15 m, 15 m, 5 m, 3 m, 2 m
- Cas « camp de chasse ou de pêche » (ch. 17) : remblai de 90 cm, pente de tertre de 50 %,
  nappe/roc entre 60 et 120 cm
- Puits absorbant et puits d'évacuation : 1,2 m de diamètre ou 1 m de côté, 60 cm de
  profondeur, 30 cm de gravier à la base, 15 cm aux parois, pierre de 1,5 à 6 cm,
  recouvrement de 60 cm, 3 chambres à coucher ou moins, résidence habitée moins de
  180 jours par année
- Fosse septique réduite de 2,3 m³ pour les eaux ménagères d'une résidence alimentée sous
  pression

## 3. Rappels de sécurité de `CLAUDE.md` répétés dans ce chapitre

| Règle du tableau | Reprise ici |
| --- | --- |
| **Génératrice : jamais dans un bâtiment, un garage ou sous un auvent** | §8, encadré DANGER, point 1, avec le mécanisme complet (gaz qui ne se voit pas, ne se sent pas, n'irrite pas ; symptômes qui ressemblent à une grippe ; avertisseur de CO comme seul moyen de détection). Repris au tableau §4 et au point de contrôle hivernal §6. Le chapitre 28 fait chauffer de grands volumes d'eau : c'est exactement le contexte où la génératrice rentre à l'abri du vent |
| **Cuisson du gibier sauvage à 74 °C à cœur (MAPAQ)** | §5-H, encadré de rappel après l'étape 49, et point de contrôle §6. Justifié ici parce que la section traite de la contamination croisée entre le débitage du gibier et les repas de la famille, dans la même pièce |
| **Tularémie : gants obligatoires à la manipulation (lièvre)** | §5-A, encadré de rappel après l'étape 7, et point de contrôle §6. Avec la consigne du MAPAQ de ne pas rincer la carcasse à l'eau, qui étale la contamination |
| **Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence** | Transposé au bon danger : §8, point 2, une eau contaminée est indiscernable d'une eau propre, avec les doses infectieuses réelles (10 à 100 kystes, DI50 de 132 oocystes, 1 coliforme fécal/100 mL). Même principe, danger différent. Le botulisme lui-même n'est pas dans ce chapitre |

Règles du tableau **volontairement non reprises**, pour ne pas diluer :

- *Jamais le foie ni les reins de cervidés (cadmium)* — la page MAPAQ enregistrée en
  contient l'extrait, mais c'est une question d'abats, pas d'hygiène. Appartient aux
  chapitres 41 et 36.
- *Trichinellose* — appartient aux chapitres 48 et 52.
- *Thuyone du cèdre* — la règle vise l'ingestion (tisanes, vitamine C). Le chapitre 28
  n'ingère rien de végétal. Si l'éditeur ajoute une infusion de conifère à la variante
  d'urgence, la règle devra être insérée avec elle.
- *Botulisme de type E à 3 °C*, *mal de caribou* — hors sujet ici.

## 4. Dangers nommés dans l'encadré, avec leur mécanisme

Six entrées, chacune avec son mécanisme, aucune sans :

1. **Monoxyde de carbone** en chauffant l'eau de lavage — gaz indétectable par les sens,
   symptômes confondus avec une grippe.
2. **Eau contaminée indiscernable d'une eau propre** — doses infectieuses microscopiques,
   un seul coliforme fécal/100 mL déclenche un avis d'ébullition.
3. **Le gel ne stérilise pas** — oocystes viables après congélation à -22 °C, infectieux
   jusqu'à 31 jours, survie d'au moins six mois dans l'environnement.
4. **Javel mélangée à un acide ou à de l'ammoniaque** — chlore gazeux et chloramines dans
   une pièce qu'on ne peut pas aérer à -35 °C.
5. **Descente dans une fosse ou un puits** — consommation d'oxygène, gaz lourds qui
   stagnent au fond, perte de conscience avant toute sensation d'étouffement, effet de
   cascade sur le sauveteur.
6. **Se laver à l'eau froide dehors l'hiver** — conduction et évaporation, rapport
   surface/masse plus élevé chez l'enfant.

Écartés de l'encadré pour ne pas le diluer, et traités en texte courant :
la chute d'un enfant dans une fosse ouverte pendant les travaux (mentionnée à la
construction, appartient au chapitre 7), la brûlure à l'eau chaude de lessive (appartient
au chapitre 27), l'attrait des déchets alimentaires pour l'ours noir (renvoyé au
chapitre 48).

**Point 5 à surveiller par le vérificateur sécurité :** c'est le seul danger de l'encadré
dont le mécanisme est décrit sans aucun chiffre, faute de source trouvée. Il ne faut ni
inventer un seuil, ni retirer l'avertissement.

## 5. Images requises

| # | Description | Cadrage | Format |
| --- | --- | --- | --- |
| 1 | Coupe technique du cabinet à fosse sèche, cotée : fosse de 1,2 × 1,2 × 1 m, fond à 60 cm au-dessus du roc ou de la nappe, soubassement de 10 × 10 cm, plancher étanche, siège à couvercle, colonne de ventilation de 10 cm dépassant de 60 cm au-dessus du toit, tertre et remblai maximal de 60 cm, pente 1 : 2 | Coupe verticale de face, sol en hachures, roc et nappe indiqués, toutes les cotes en mètres et centimètres. Redessiner d'après la figure B.14.3 du guide technique, ne pas reproduire la figure elle-même | Pleine page |
| 2 | Plan de localisation : le chalet, le puits, le lac, la bécosse et le puits d'évacuation, avec les six distances du tableau B.4.2 tracées en arcs cotés (30 m, 15 m, 15 m, 5 m, 3 m, 2 m) | Vue en plan, échelle indiquée, ligne des hautes eaux tracée, sens d'écoulement de la nappe indiqué par une flèche | Demi-page |
| 3 | Les cinq étapes du lavage des mains, reprises de l'affiche MAPAQ : mouiller, savonner, frotter ongles-mains-poignets, rincer, sécher, avec la mention « au moins 20 secondes » | Pictogrammes au trait, sur fond clair, assez gros pour être lisible affiché au mur au-dessus de la station de lavage. **Prévoir une version à découper, page impaire, sans texte au verso** | Demi-page + une page détachable en annexe |
| 4 | Coupe du puits d'évacuation des eaux ménagères : 1,2 m de diamètre ou 1 m de côté, 60 cm de profondeur, 30 cm de gravier à la base, 15 cm aux parois, recouvrement de 60 cm de sol perméable, ouverture de visite, piège à graisse en amont | Coupe verticale, matériaux distingués par trame | Quart de page |
| 5 | La station de lavage de mains du chalet : bidon à robinet, savon, bassine dédiée, serviettes identifiées par personne | Photo de JP, plan rapproché, lumière naturelle, au niveau des yeux d'un enfant de 4 ans pour montrer la hauteur d'installation | Quart de page |
| 6 | Dilution de la javel : cuillère de 5 mL et contenant gradué de 250 mL côte à côte, étiquetés | Photo à plat, fond neutre, les deux graduations lisibles | Quart de page |

Aucune image de contenu de fosse, aucune photo de matière fécale. Le chapitre traite le
sujet sans images de ce genre, et le livre se feuillette à table.

## 6. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 3 — Le froid lui-même | Se laver et se mouiller par grand froid ; refroidissement d'un corps humide |
| 5 — Épidémie | Régime de crise complet, isolement, sas |
| 7 — Des enfants de 4 et 6 ans | Refroidissement plus rapide de l'enfant, sécurité autour d'une fosse ouverte, apprentissage du lavage |
| 13 — Eau : puiser, filtrer, désinfecter | Traitement complet de l'eau, doses de javel, effet du froid sur la chloration |
| 15 — Poêles à bois et rendement | Humidité intérieure du séchage du linge, ventilation |
| 27 — Soigner quand il n'y a personne | Diarrhée, déshydratation, brûlures |
| 29 — Bâtir la pharmacie | Corps gras, soins des mains fissurées, traitement des poux |
| 36 — Abattage, saignée, éviscération | Hygiène de la manipulation du gibier, gants |
| 41 — Abats et organes | Foie et reins de cervidés, cadmium |
| 44 — Lièvre d'Amérique | Tularémie, traitement de fond |
| 48 — Ours noir | Déchets alimentaires et rejets qui attirent l'ours |
| 67 — Pemmican et graisses | Récupération de la graisse du piège à graisse |
| 76 — Caveau à légumes | Le froid conserve au lieu de détruire : même biologie, usage inverse |
| 89 — Savon et chandelles | Fabrication du savon, lessive de cendre, dosage et épreuves |

Tous les numéros ont été vérifiés contre la liste des 89 chapitres. Aucun renvoi vers un
chapitre inexistant.

## 7. Relecteur humain

Le chapitre 28 **ne figure pas** dans la liste de relecture humaine obligatoire de
`CLAUDE.md`.

**Relecture externe recommandée quand même**, par un **inspecteur municipal en
installations septiques** ou un **technicien en hygiène du milieu**, portant sur les
sections 5-B à 5-F et sur le tableau des distances. Motif : le chapitre transcrit des
normes réglementaires à partir d'un guide d'interprétation, sans avoir pu accéder au
texte du Règlement, et une erreur de transcription sur une distance ou sur une profondeur
se traduit par une contamination de la nappe qui ne se voit pas avant des années.

## 8. Notes pour l'éditeur

- **Le tableau des distances (§5-B, étape 9) doit tenir sur une seule page avec l'image
  2.** Séparer la liste des distances du plan qui les montre fait perdre la moitié de
  l'utilité.
- **L'affiche du lavage des mains (image 3) devrait être une page détachable**, en fin de
  tome ou en annexe : c'est le seul élément du livre destiné à sortir du livre et à
  finir cloué au-dessus d'un bidon.
- **Ne pas fusionner les trois méthodes anti-poux** en une seule phrase. Le chapitre les
  garde séparées parce qu'une seule des trois fonctionne sans électricité, et c'est
  l'information utile.
- **Ne pas « simplifier » les 20 secondes** en « bien se laver les mains ». La durée est
  la consigne ; sans elle, la phrase ne dit plus rien.
- Le chapitre ne donne **aucune date de saison ni aucune limite de prises**, conformément
  à la règle du gabarit. Les seules échéances sont celles des consignes sanitaires
  (48 heures, 14 jours, 10 jours) et elles sont toutes sourcées.
- Salpêtre : sans objet dans ce chapitre. Pourcentages de sel : sans objet.
- Nom latin présent au moins une fois : *Giardia lamblia*, *Cryptosporidium*,
  *Alces americanus*, *Castor canadensis*, *Ondatra zibethicus*, *Sphagnum* spp. et
  *Pediculus humanus capitis* (ce dernier à confirmer, voir §1 point 7).

## 9. Ce qui reste faible et qu'il faudra peut-être écrire ailleurs

- **Le cabinet à terreau (toilette à compostage) est traité en trois lignes.** Le guide
  technique en donne la composition et les difficultés d'usage, mais le chapitre le
  disqualifie rapidement pour un bâtiment non chauffé à -35 °C. Si JP envisage un
  bâtiment chauffé en permanence, cette section mérite un développement, avec la question
  non résolue du **délai avant que le terreau soit sans danger** — aucune source
  officielle canadienne trouvée sur ce délai, et le guide se contente de renvoyer à un
  « traitement, une valorisation ou une élimination conforme à la Loi ».
- **Le devenir des matières du seau et de la fosse au printemps** n'est traité que par
  l'interdiction de descendre dans la fosse et par la règle du comblement à 40 cm. Il n'y
  a pas de procédure de vidange, parce qu'aucune source officielle consultée n'en donne
  une pour un particulier. C'est probablement un métier, pas une procédure de livre.
- **La question de l'eau chaude en quantité** (lessive, trempage à 65 °C, bain complet)
  touche au bois et au rendement du poêle ; elle est renvoyée au chapitre 15 sans que le
  coût en bois soit chiffré nulle part dans le livre. À vérifier au montage des tomes.

## Passe « pas de code légal, signes en bas de page » — 23 septembre 2026

**Retiré (légal) :**
- Tableau des distances (point 9), dernière ligne : « Limite de terrain » retiré. Une
  limite de propriété ne protège aucune eau ; la ligne devient « Conduite d'eau de
  consommation, arbre | 2 m ».

**Gardé après examen :** le reste du tableau des distances, les dimensions de la fosse, le
2,3 m³ du point 34 et les 60 cm de sol filtrant. Ils viennent du guide réglementaire, mais le
chapitre les écrit comme des faits et en donne le mécanisme (filtre, sens de la nappe,
volume à décanter). Aucune phrase du chapitre ne nommait un règlement, un permis ou une
obligation.

**Notes de bas de page ajoutées, et leur provenance :**

| Note | Signe | Source |
| --- | --- | --- |
| [^1] (point 8) | Sol perméable ou très perméable : le test du trou | Protocole : `sources/28-melccfp-guide-technique-annexe-b-evaluation-terrain.md` (tableau 3 : trou de 15 à 25 cm, saturation au moins 4 h, imbibition 12 à 18 h, 15 cm d'eau). Seuils 4 et 25 min/cm : `sources/28-q2r22-definitions-permeabilite.md` (copie municipale du règlement, LégisQuébec inaccessible : à revérifier sur le texte consolidé) |
| [^2] (point 8) | Niveau de la nappe lu dans la paroi du trou | `sources/28-melccfp-guide-technique-annexe-b-evaluation-terrain.md` (couleur brune uniforme, gris foncé, taches, limite supérieure des marbrures ; trou d'essai d'au moins 1,8 m). La couleur des marbrures n'est pas décrite par la source et n'est pas donnée |
| [^3] (tableau du point 9) | Ligne des hautes eaux | `sources/28-melccfp-aide-memoire-limite-du-littoral.md` (méthode botanique ; lichens gris et mousses aquatiques côté sud ; écorce usée, ligne de débris, bas de la litière) |
| [^4] (titre de la section J) | La gale | `sources/28-cisss-laval-sante-estrie-gale.md` (dépliant du CISSS de Laval, mai 2024, et page de Santé Québec Estrie ; la fiche Québec.ca « gale » répond 404) |
| [^5] (section 7) | Poux et lentes | `sources/28-quebec-poux-lentes-reperage.md` (Québec.ca : taille d'une graine de sésame, lentes vivantes à moins de 6 mm, mortes plus blanches et plus loin, poux sans démangeaison) |

**Signalé, pas corrigé :** la section J nomme la gale dans son titre, mais le chapitre ne
donne aucun traitement du linge contre elle. La note [^4] ne fait que la décrire.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/28-verifications.md`, appliqués au chapitre. Une ligne par chiffre
changé ou confirmé.

- § 4 Matériel, javel, colonne Substitution — javel liquide : « perd son titre en quelques mois » →
  **se garde jusqu'à un an** à l'abri de la chaleur et du soleil, puis se dégrade vite ; hypochlorite
  de calcium : dose ajoutée, **2 c. à soupe dans 20 L = 1,4 g/L** pour un produit à 70 %, dissous
  30 min, refait chaque jour ; « se garde des années » retiré (aucune source) :
  `sources/28-cdc-chlore-solutions-et-stabilite.md`, `sources/13-fabricant-javel-duree-de-conservation.md`,
  `sources/12-epa-javel-desinfection-urgence.md`.
- § 5-C étape 19 — tirage de la colonne : mécanisme solaire confirmé sans mesure, **le vent** donné
  comme moteur principal (colonne au-dessus du toit, loin des arbres, ouverture face au vent) :
  `sources/28-oms-fiche-3-5-latrines-vip.md`.
- § 5-D étape 22 — volume de matériau de couverture : **introuvable**, drapeau retiré (la poignée
  reste la mesure) ; ajouté le coût sourcé (la couche sèche remplit la fosse plus vite) :
  `sources/28-oms-fiche-3-4-latrines-simples.md`.
- § 5-E étape 28 — urine : **0,8 à 2 L par adulte et par jour** ajouté ; « et de l'odeur » retiré
  (aucune source) : `sources/28-medlineplus-volume-urine.md`.
- § 5-G étape 38 — toilette à l'éponge : « 2 à 4 L » → **2 à 6 L par personne et par jour pour
  l'hygiène de base, lavage des mains compris** (pas de volume propre à l'éponge) :
  `sources/28-oms-note-technique-9-quantite-eau.md`.
- § 5-G étape 41 — « 4 L de rinçage » : **introuvable**, chiffre retiré, la consigne reste (eau de
  rinçage prête avant de mouiller la tête).
- § 8 DANGER, entrée 5 — seuils ajoutés : oxygène **21 %** normal, symptômes à **19,5 %**, perte de
  conscience en quelques minutes ; sulfure d'hydrogène qui paralyse l'odorat vers **100 à 150 ppm**,
  mortel au-delà de **1 000 ppm** ; **six morts sur dix** en espace clos sont des sauveteurs :
  `sources/28-cchst-espaces-clos-oxygene.md`, `sources/79-cnesst-sulfure-d-hydrogene.md`.
- § 9, sol gelé, étape 4 — épaisseur dégelée par feu : **introuvable** ; remplacée par le critère
  (on la mesure au premier cycle).
- § 9, désinfection à l'eau bouillante — javel : **jusqu'à un an** en bouteille ; diluée, **jusqu'à la
  moitié** du chlore perdue en un mois en plastique opaque fermé ; solution à 0,1 % refaite chaque
  jour : `sources/28-cdc-chlore-solutions-et-stabilite.md`, `sources/13-fabricant-javel-duree-de-conservation.md`.
- Compression §3 et §4 — 27 septembre 2026 : environ 1 230 mots → 227 mots ; matériel coupé : bassine dédiée, solution hydroalcoolique, contenant gradué et cuillère à javel, papier hygiénique, pelle et pic réservés, gants de caoutchouc, gants jetables, cuve de lessive et planche à laver, thermomètre de cuisson, sacs de 60 L, serviettes identifiées, paragraphes « non négociable » et renvoi au ch. 00b. §3 : coupés le castor et le rat musqué (ch. 10), les doses infectieuses chiffrées (§8), le dosage de javel (étape 47), les CT de *Giardia* à froid, l'incubation de 3 à 25 jours (médiane en §7). Aucun fait de sécurité perdu : 74 °C (encadré § 5-H et § 9), CO (§8), tularémie (encadré § 5-A), 60 % d'alcool (étape 7), pic réservé (étape 25).
