> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 76. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 76, Caveau à légumes

- **Fichier :** `chapitres/76-caveau-a-legumes.md`
- **Tome :** 4 — Conserver et réparer
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (vérification technique) et 4
  (vérification sécurité)
- **Ampleur :** ≈ 5 700 mots utiles (6 700 mots bruts, tableaux et balises compris). Dix sections
  du gabarit dans l'ordre, procédure en 17 étapes réparties en 3 phases (bâtir / préparer /
  tenir), 7 tableaux, encadré DANGER à 5 mécanismes, variante d'urgence avec tableau des pertes.

---

## 0. Ce qu'il faut savoir avant de lire le reste

**La consigne d'ampleur donnée au rédacteur était de 2 500 à 5 000 mots utiles. Le chapitre sort
à ≈ 5 700, soit 14 % au-dessus.** Le dépassement est assumé et signalé plutôt que réglé en
coupant. Trois raisons : (1) le chapitre couvre **deux sujets qui sont ailleurs dans des chapitres
séparés** — construire un ouvrage enterré, et l'exploiter sur huit mois ; (2) il porte **quatre
mécanismes létaux distincts** (asphyxie, hantavirus, effondrement de paroi, bois traité) plus le
rappel botulisme, et chacun exige son mécanisme, pas juste sa consigne ; (3) les chapitres déjà
écrits qui servent de calibrage — 68 (6 829 mots bruts) et 73 (7 320) — tournent **au-dessus** de
ce chapitre. Autrement dit, 5 700 est déjà sous la densité de la maison. Deux passes de coupe ont
été faites (≈ 600 mots retirés) ; une troisième aurait mordu dans l'encadré DANGER ou les
tableaux de contrôle. **Si l'éditeur veut rentrer dans 5 000, la coupe la moins dommageable est
la §10**, dont le tableau des sources fait doublon avec la présente fiche.

**Le chapitre est bâti sur un renversement qu'il faut valider.** La littérature d'entreposage
suppose un problème : rester assez froid. Sur la Côte-Nord, à -35 °C, le problème est l'inverse —
empêcher le caveau de geler. Ce renversement décide de la construction (isolant, bouchons de
conduits, profondeur) et il est **déduit du climat, pas cité d'une source**. Aucune page
officielle consultée ne traite d'un caveau en climat boréal. Le rôle 3 doit trancher.

**Transposition assumée, comme aux chapitres 68 et 73.** Les seuils d'oxygène et les règles
d'excavation viennent de la **CNESST, qui réglemente le travail**, pas les caveaux familiaux. Le
chapitre emprunte la physiologie et la physique, pas le statut juridique, et **le dit dans
l'encadré**. Le rôle 4 doit valider que cette note suffit et qu'elle ne laisse pas croire à une
obligation légale inexistante.

**Recherche :** WebSearch et WebFetch disponibles, aucune limite atteinte. Trois URL Québec.ca
construites ont répondu **404** avant de trouver le bon chemin (`salubrite-aliments-domicile/`,
retrouvé dans la fiche de sources du chapitre 68). Deux documents utiles étaient des **PDF non
lisibles par WebFetch** et ont dû être téléchargés puis extraits localement (`pdftotext`) : le
document MAPAQ d'entreposage et le plan M-6000.

---

## 1. Piège d'extraction évité — à consigner, parce qu'il se reproduira

Le tableau central du chapitre (températures, humidités et durées par légume) vient d'un PDF
MAPAQ dont **l'extraction texte ordinaire décale les valeurs d'une rangée**. La lecture décalée
est parfaitement plausible et parfaitement fausse : elle donne la **citrouille à 0 °C** (alors
que la bonne valeur est 10 à 13 °C) et la **betterave à 65-70 % d'humidité** (au lieu de
98-100 %). Un caveau bâti sur cette lecture aurait gelé toutes les courges.

L'erreur a été attrapée parce que le tableau décalé était **horticolement incohérent** — la
citrouille et la courge d'hiver, même groupe de culture, se retrouvaient à 0 °C et à 10-13 °C.
Deux extractions indépendantes (`pdftotext -table` et `pdftotext -fixed 2`) donnent le même
alignement corrigé, et c'est celui qui est imprimé. **C'est l'équivalent, pour un tableau, du
71 °C / 74 °C du chapitre pilote.** La méthode est consignée dans
`sources/76-mapaq-conditions-entreposage-legumes.md`.

**Conséquence pour le rôle 3 :** le tableau de la §2 est à revérifier **contre la source
d'origine**, pas contre le texte du chapitre.

---

## 2. Les chiffres marqués `[À VÉRIFIER]`

| # | Valeur ou affirmation | Où | Pourquoi ce n'est pas fermé | Piste |
| --- | --- | --- | --- | --- |
| 1 | **Profondeur de pénétration du gel sur la Côte-Nord**, en mètres | §5 étape 2, §10 | Le CNRC donne 4 150 degrés-jours C pour « le nord du Manitoba et le nord du Québec » — **pas pour la Côte-Nord** — et renvoie la profondeur à une courbe (figure 2, Brown 1964) **non extractible du PDF** et à « l'expérience locale ». **Le chapitre ne publie aucune profondeur** | Bureau municipal (règlement de construction), entrepreneur en excavation régional, ou table de l'indice de gel d'ECCC (Boyd, 1973). **Tâche n° 1 du vérificateur technique** |
| 2 | **Dimensionnement de la ventilation** du caveau — diamètre des conduits, débit, volume d'air par heure | §5 étape 6, §10 | Les sources ne donnent qu'une **vitesse à la zone respiratoire** (0,3 m/s, CNESST, pour un travailleur qui entre) ou des **débits par tonne d'entrepôt commercial** (M-6000, 6 à 30 L/s·t). Ni l'un ni l'autre ne se traduit en diamètre de conduit pour un caveau familial. **Le chapitre donne la géométrie (deux conduits, un bas un haut) et aucun chiffre** | Publication n° 1478 d'Agriculture Canada (voir §5 ci-dessous), ou un technologue en génie du bâtiment. **Tâche n° 2, et c'est une tâche de sécurité, pas de confort** |
| 3 | **Mécanisme du 7 à 8 °C de la pomme de terre de table** | §2 (tableau), §10 | Le MAPAQ **donne le nombre sans l'expliquer**. Le nombre est imprimé et sourcé ; l'explication ne l'est pas et **n'est pas inventée** dans le texte | Littérature sur la conversion amidon-sucre au froid. Sans source, ne rien ajouter au chapitre |
| 4 | **Humidité de la pomme de terre — contradiction de sources** | §2, §10 | **Santé Canada écrit « un endroit frais, sec »** ; **le MAPAQ écrit 95 % d'humidité relative**. Les deux sont officielles. Le chapitre applique le MAPAQ pour la masse en caveau et lit la consigne de Santé Canada comme visant le tubercule gardé en cuisine — **c'est une interprétation éditoriale, pas une citation** | À faire trancher par l'agronome. **Tâche n° 1 du vérificateur de contenu horticole** |
| 5 | **Sort d'un légume grignoté par un rongeur** | §7 (tableau), §10 | Le chapitre dit de **jeter**. Aucune source consultée ne traite du cas. La règle générale « coupez et jetez toutes les parties meurtries ou abîmées » (Santé Canada) ne couvre pas la contamination par salive ou urine | INSPQ ou ASPC, transmission des zoonoses par aliments souillés par des rongeurs |
| 6 | **Ligne de partage du bois traité** (structure enterrée oui, tablettes non) | §4, §5 étape 7, §8 item 3 | Santé Canada écrit « contact direct avec de la nourriture » **sans définir de distance ni de barrière acceptable**. La ligne tracée par le chapitre est une **décision éditoriale** | ARLA, ou une demande écrite à Santé Canada. **Tâche du vérificateur sécurité** |
| 7 | **Le plan M-6000 (1987) recommande explicitement le bois traité à l'ACC** pour les lisses d'entrepôt | §10 | Le feuillet est **antérieur au retrait de l'ACC du résidentiel (2004)**. Le chapitre **ne reproduit pas** cette recommandation et applique la position actuelle de Santé Canada. Désaccord de sources **consigné, pas effacé** | Rien à faire, sinon confirmer que la position retenue est la bonne |

**Chiffres sourcés et fermes** (ne pas les rouvrir sans source contraire) :
**0 °C / 98-100 %** racines du groupe A ; **0 °C / 65-70 %** ail et oignon ; **10-13 °C /
50-70 %** courge et citrouille ; **7-8 °C / 95 %** pomme de terre de table ; durées de 1 à 8 mois
selon l'espèce (toutes : MAPAQ) — **jamais sous 0 °C**, « pas même une fraction de degré »
(MAPAQ) — préconditionnement **10-15 °C, 2 à 3 semaines** pomme de terre, **30 °C** courges,
**32-36 °C** oignons (M-6000) — **20 mg/100 g** (200 mg/kg) glyco-alcaloïdes et **la cuisson ne
les réduit pas** (Santé Canada) — **19,5 %** oxygène minimum en espace clos (CNESST) — **12 %**
perte de conscience, **6 %** décès en quelques minutes, **4 %** quelques inspirations (CNESST) —
**≈ 40 %** létalité du syndrome pulmonaire à hantavirus, **2 à 4 semaines** de délai moyen,
**30 minutes** d'aération, **N95**, **Javel 1 partie pour 9** (CCHST) — **45 degrés** de pente à
partir de moins de **1,2 m** du fond, matériaux à plus de **1,2 m**, machinerie à plus de **3 m**
(CNESST) — **100 mm** de soulèvement en trois semaines, **1 820 kPa** (CNRC) — zone de danger
**4 à 60 °C** (Québec.ca) — **sous 3 °C** pour le poisson fumé, type E (Santé Canada).

---

## 3. Les rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

Le tableau de `CLAUDE.md` impose de répéter certaines règles dans **chaque** chapitre concerné.
Celles qui s'appliquent ici, et où elles sont :

| Règle du tableau | Reprise dans le chapitre |
| --- | --- |
| **Génératrice : jamais dans un bâtiment, un garage ou sous un auvent** | §8, item 1 — reformulée pour le cas du caveau, « un bâtiment enterré, c'est-à-dire le pire cas possible », avec interdiction de toute flamme (chandelle, lanterne, réchaud) parce qu'une flamme consomme l'oxygène qui manque déjà |
| **Botulisme de type E : produit sa toxine dès 3 °C, donc au frigo** | §2 et §8, item 5 — sert à **fermer la porte** au poisson fumé et à la viande, puisqu'un caveau ne tient pas 3 °C de façon vérifiable sur huit mois |
| **Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence** | §8, item 5 — imprimé en toutes lettres |
| Cuisson du gibier à 74 °C ; foie et reins de cervidés ; trichinellose ; tularémie ; thuyone du cèdre ; mal de caribou | **Sans objet ici.** Le chapitre ne traite d'aucun animal et interdit explicitement la viande au caveau (renvois aux ch. 68 et 72) |

**Rappels ajoutés qui ne sont pas au tableau de `CLAUDE.md`, et qui devraient peut-être y entrer :**

1. **Un avertisseur de monoxyde de carbone ne détecte pas le CO2.** Le chalet est équipé en
   avertisseurs de CO (ch. 16) et le lecteur peut croire qu'il est couvert dans le caveau. Il ne
   l'est pas : ce sont deux molécules différentes. **Proposition à l'éditeur : ajouter cette ligne
   au tableau de `CLAUDE.md`**, elle s'appliquerait aussi aux ch. 14, 15, 16 et 69.
2. **Ne jamais balayer à sec un local fréquenté par des rongeurs.** S'applique au caveau, mais
   aussi à un camp fermé qu'on rouvre, à un hangar, à un grenier. **Deuxième proposition d'ajout
   au tableau.**

---

## 4. Images requises

| # | Sujet | Cadrage | Format proposé |
| --- | --- | --- | --- |
| 1 | **Coupe du caveau, les deux conduits** | Coupe technique en élévation, de côté, montrant : la prise d'air **basse** débouchant près du plancher, la sortie **haute** au point le plus élevé du plafond, l'isolant **à l'extérieur** de la structure, le lit de pierre nette et le drain de pied, et la ligne de gel en pointillé (sans cote chiffrée — voir `[À VÉRIFIER]` n° 1). Flèches d'air en deux couleurs : air neuf qui descend, air chargé qui sort en haut | **Pleine page** — c'est la figure qui porte la §3 et la §5 au complet |
| 2 | **Pourquoi un seul conduit tue** | Deux vignettes côte à côte, même coupe simplifiée. À gauche, un conduit en haut : zone grisée de CO2 stagnante dans le bas, à hauteur de genoux d'un adulte penché et à hauteur de tête d'un enfant. À droite, deux conduits : la zone grisée est balayée. **Aucune silhouette d'enfant en danger — silhouettes d'échelle neutres** | **Demi-page**, en regard de l'encadré DANGER |
| 3 | **Les trois climats** | Schéma en plan ou trois blocs, avec pour chacun la température, l'humidité et les légumes. Reprend exactement le tableau de la §2, en visuel | **Demi-page** |
| 4 | **Pomme de terre : ce qu'on coupe, ce qu'on jette** | Photo ou planche : tubercule sain / verdissement léger et localisé (on pare et on pèle) / verdissement avancé et germes (on jette). Trois états côte à côte, légendés sans ambiguïté | **Demi-page.** Photo de JP possible, ou planche botanique du domaine public |
| 5 | **Enfouissement des racines dans le sable humide** | Gros plan en coupe d'une caisse : couches alternées, racines qui ne se touchent pas | **Quart de page** |
| 6 | **Le silo de terre** | Coupe du silo de la §9 : dépression, lit de branches d'épinette, cône de racines, paille, terre, neige, bouchon de paille au sommet qui laisse sortir l'air | **Demi-page** |
| 7 | **Ouvrir en pente, pas à la verticale** | Deux coupes de l'excavation : paroi verticale (barrée) / paroi en pente sous 45° avec la terre déposée en retrait du bord. Cotes de 1,2 m et 3 m indiquées | **Quart de page**, dans la §5-A ou en appui de l'encadré DANGER item 4 |

**Note pour `images/credits.md` :** aucune image n'a été téléchargée à cette étape. Les schémas 1,
2, 3, 6 et 7 sont à **dessiner**, pas à trouver — aucune licence à vérifier. Les images 4 et 5
peuvent venir de photos de JP, ce qui est la voie la plus simple.

---

## 5. Sources — état du dossier

**13 fiches enregistrées** dans `/sources`, toutes avec URL, date de consultation et extraits
intégraux :

`76-mapaq-conditions-entreposage-legumes.md` · `76-agriculture-canada-plan-m6000-entreposage-fruits-legumes.md` ·
`76-sante-canada-glycoalcaloides-pommes-de-terre.md` · `76-acia-toxines-naturelles-fruits-legumes.md` ·
`76-cnesst-gaz-decomposition-asphyxie.md` · `76-cnesst-espaces-clos.md` ·
`76-cnesst-effondrement-parois-creusement.md` · `76-cchst-dioxyde-de-carbone.md` ·
`76-cchst-hantavirus.md` · `76-cnrc-action-du-gel-sur-les-fondations.md` ·
`76-sante-canada-bois-traite.md` · `76-sante-canada-salubrite-fruits-legumes-frais.md` ·
`76-quebec-temperatures-conservation.md`

**Deux fragilités du dossier, à nommer :**

1. **Le document MAPAQ central n'est pas hébergé sur un domaine gouvernemental.** Il est signé par
   un agronome du MAPAQ, porte l'adresse du bureau de Saint-Rémi et le courriel institutionnel de
   l'auteur, mais il est **hébergé sur `agrireseau.net`**. Même chose pour le plan M-6000
   (Agriculture Canada / Service des plans du Canada). Le contenu est officiel, l'hébergement ne
   l'est pas. **Les extraits sont enregistrés intégralement**, ce qui protège le chapitre si les
   PDF disparaissent — mais si une version sur `mapaq.gouv.qc.ca` ou `agriculture.canada.ca`
   existe, elle est préférable. **Tâche du vérificateur technique.**
2. **Le CNRC CBD 182F porte son propre avertissement d'obsolescence** (« série qui a cessé de
   paraître […] archivée en tant que référence historique »). Le chapitre s'en sert pour le
   **mécanisme** du gel — de la physique, qui n'a pas vieilli — et **pas comme référence de
   conception à jour**. L'avertissement est reproduit dans la fiche de source.

**Piste à épuiser avant impression.** Le plan M-6000 renvoie à la **publication n° 1478
d'Agriculture Canada, *Conservation domestique des fruits et des légumes***, « qui décrit de très
petits entrepôts pour les potagers domestiques ». **C'est exactement le document qui manque à ce
chapitre** : il fermerait probablement les `[À VÉRIFIER]` n° 1 et 2. Il n'a pas été retrouvé en
ligne. Pistes : Publications du gouvernement du Canada (`publications.gc.ca`), Bibliothèque et
Archives Canada, bibliothèque d'un ministère provincial de l'agriculture.

---

## 6. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi | Où |
| --- | --- | --- |
| **15** — Poêles à bois et rendement | Les retailles de bois traité **ne vont pas au poêle** | §8, item 3 |
| **16** — Le feu au chalet | Avertisseurs de CO au chalet, et le fait qu'ils **ne couvrent pas** le CO2 du caveau ; interdiction de brûler du bois traité | §8, items 1 et 3 |
| **18** — Éclairage | Frontale ou 12 V, éclairage **de passage** seulement : la lumière artificielle fait verdir la pomme de terre (ACIA) | §4, §5 étape 16 |
| **34** — Calendrier annuel | Quand charger, quand vider, quand faire le ménage | §5 (phases B et C) |
| **68** — Froid naturel | Où va la viande, puisqu'elle ne va pas au caveau | §2, §8 item 5 |
| **69** — Un congélateur plein qui… | Le caveau comme réserve qui ne dépend pas de l'électricité | §2 |
| **72** — Fumer le poisson | Où va le poisson fumé, seuil de 3 °C du type E | §2, §8 item 5 |
| **73** — Conserves et marinades | Ce qui ne descend pas au caveau parce qu'il est blessé | §2, §5 étape 10, §7 |
| **74** — Jardin nordique | D'où vient la récolte, saison de 90 à 100 jours | §2, §5 phase B |
| **75** — Semences | Semence et table **ne se gardent pas pareil** — porte explicitement fermée | §2 |
| **77** — Fermentation | Le chou qui ne se garde pas entier | §2, §5 étape 10 |
| **87** — Assemblages bois-bois | Tablettes, caisses, plancher à claire-voie, conduits en bois | §4 |

**Renvois entrants à prévoir** (pour le metteur en pages et pour les rédacteurs de ces
chapitres) : le ch. 73 renvoie **déjà** au ch. 76 dans son texte (« le caveau du ch. 76 »). Les
ch. 74, 75 et 77 devraient renvoyer ici. Le ch. 68 gagnerait un renvoi vers §8 item 1, parce que
la cache extérieure et le caveau partagent le risque de confinement.

---

## 7. Relecteur humain requis

Le chapitre **ne figure pas** dans la liste de relecture obligatoire de `CLAUDE.md`. **Le
rédacteur demande quand même deux relectures externes**, et la raison est nette : c'est le premier
chapitre du livre qui envoie une famille **creuser une excavation** et **entrer dans un espace
clos**. Les deux mécanismes tuent vite et ne préviennent pas.

| Relecteur | Profil | Ce qu'il doit trancher |
| --- | --- | --- |
| **1 — sécurité** | **Conseiller en prévention de la CNESST**, ou technicien/technologue en santé et sécurité du travail, volet espaces clos et excavation | §5-A (creusage, pente, dépôt des déblais), §6 (protocole d'entrée), §8 items 1, 3 et 4. **Trois questions :** (a) la géométrie « deux conduits, un bas un haut » + 30 minutes d'aération est-elle suffisante sans détecteur d'oxygène, ou faut-il exiger un détecteur ? (b) la note juridique sur le champ d'application de la CNESST est-elle correctement formulée ? (c) la ligne de partage du bois traité tient-elle ? |
| **2 — horticole** | **Agronome en production maraîchère**, ou conseiller du MAPAQ en entreposage | §2 (les trois climats et le tableau), §5-B et §5-C (préconditionnement, chargement, enfouissement). **Deux questions :** (a) **trancher la contradiction sur l'humidité de la pomme de terre** (Santé Canada « sec » vs MAPAQ 95 %) ; (b) confirmer le tableau de la §2 **contre la source d'origine**, à cause du piège d'extraction décrit à la §1 ci-dessus |

**Proposition à l'éditeur :** ajouter **« Caveau à légumes »** à la liste de relecture obligatoire
de `CLAUDE.md`. Le critère de cette liste est le risque, pas le sujet, et ce chapitre porte quatre
mécanismes létaux.

---

## 8. Ce que le rédacteur signale à l'éditeur

1. **Dépassement d'ampleur assumé** (≈ 5 700 mots pour une consigne de 2 500 à 5 000). Voir §0. La
   coupe la moins dommageable, si coupe il faut, est la §10 du chapitre.
2. **Deux ajouts proposés au tableau de sécurité de `CLAUDE.md`** : l'avertisseur de CO ne détecte
   pas le CO2 ; ne jamais balayer à sec un local à rongeurs. Voir §3.
3. **Ajout proposé à la liste de relecture obligatoire** : ce chapitre. Voir §7.
4. **Le chapitre ne publie volontairement aucune profondeur de caveau ni aucun diamètre de
   conduit.** Ce sont des trous visibles, pas des oublis. Un lecteur pressé pourrait les prendre
   pour un manque ; la mise en pages devrait éviter de les faire ressembler à une omission.
5. **Aucune date, aucun quota, aucune limite de prise** dans le chapitre — sans objet, mais
   vérifié.

## Passe « pas de code légal, signes expliqués » — 23 septembre 2026

**Retiré (désignation de norme) :** « (N95) » après « Masque qui filtre les fines particules », au §4 (ligne Matériel) et au §8, point 2. La fonction reste dite deux fois : filtrer les fines particules, et sceller sur le visage. C'est le doute de la ligne 288 de `suivi/doutes-passe-paperasse.md`. La source (`sources/76-cchst-hantavirus.md`, « un respirateur N95 jetable dont l'ajustement a été testé ») garde la désignation pour qui vérifie.

**Gardé après examen :** les pentes et distances de l'étape 3 et du §8 point 4 (45°, 1,2 m, 3 m) et le seuil de 19,5 % d'oxygène sont des valeurs réglementaires dans leur source, mais le chapitre les donne comme des faits, chacune avec son mécanisme ; aucune règle n'y est citée. « Normalement déterminée par l'expérience locale » (étape 2) : dans la source, la phrase continue par « telle qu'elle est reconnue par les règlements de construction », mais le chapitre n'en garde que « l'expérience locale » et renvoie aussitôt à la mesure sur le terrain. À couper si JP y lit encore la municipalité. La marque *HT* / *MB* des palettes : une marque à lire sur l'objet, avec ce qu'elle veut dire.

**Notes de bas de page ajoutées :**

| Note | Où | Ce qu'elle dit | Provenance |
| --- | --- | --- | --- |
| [^1] sol sensible au gel | §4, ligne « Pierre nette » (première mention ; repris aux étapes 1 et 4) | Sol fin, limon ou argile, plus d'un dixième du poids en grains de moins de 0,02 mm ; l'eau y monte et forme des lentilles de glace ; test au toucher : limon onctueux, argile collante qui fait un ruban, sable et gravier granuleux qui ne se moulent pas | `sources/76-sols-sensibles-au-gel.md` (GDT de l'OQLF, APCHQ, IRDA) et `sources/76-irda-estimation-texture-sol-champ.pdf`. Le digeste du CNRC *Congélation du sol et soulèvements dus au gel* a répondu HTTP 503 : `[À CAPTER]` pour doubler la définition |
| [^2] syndrome pulmonaire à hantavirus | §8, point 2 | Commence comme une grippe (fièvre, maux de tête, douleurs musculaires, troubles digestifs), gagne les poumons (toux, essoufflement, respiration difficile), peut s'aggraver rapidement | `sources/75-quebec-hantavirus.md` (Gouvernement du Québec, « Infection au hantavirus »), déjà au dossier. Cette page donne 1 à 8 semaines d'incubation, alors que le chapitre écrit « une à six semaines » (CCHST) : la note ne donne pas de délai pour ne pas contredire le texte, mais l'écart est à trancher |

**Doutes de la passe paperasse :** lignes 285 à 288 (étiquetées « ea: »). Seule la 288 (N95) portait sur une norme : réglée ci-dessus. Les autres laissées telles quelles.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/76-verifications.md` appliqués au chapitre. Plus aucun drapeau dans le texte. Les lignes 1, 2 et 5 du tableau « Les chiffres marqués `[À VÉRIFIER]` » (§2 de cette fiche) sont fermées par ce qui suit.

| Chiffre ou fait | Où | Verdict | Provenance |
| --- | --- | --- | --- |
| Gel sous route déneigée : 1,2 à 2,1 m au bord du fleuve (Port-Cartier 1,16-1,81 ; Longue-Rive 1,44-2,08), 2,6 à 3 m et plus à l'intérieur (Manic-5) ; maximum à la fin de mars ; dégel par le haut, d'où « un relevé de janvier ne vaut rien » au lieu de « après une semaine de redoux ». La neige isole | §5-A, étape 2 | Corrigé (le texte disait que la donnée n'existe pas). Fourchette de l'intérieur écrite « 2,6 à 3 m et plus » plutôt que « 3 m et plus » proposé, pour coller aux 15 hivers de Manic-5 | `sources/76-mtq-profondeur-gel-cote-nord.md` (+ CSV des stations) ; `sources/20b-eau-sous-la-neige-des-lacs.md` |
| Conduits : 30 cm (12 po) de diamètre au moins pour un caveau de 3 × 3,7 × 2,4 m ; deuxième sortie au-delà de 3,7 m ; ouvert la nuit, fermé le jour en début d'automne ; fermés en partie ou complètement par grand froid | §5-A, étape 6 | Corrigé (« aucun diamètre publié ») | `sources/76-usda-agriculture-canada-caveaux-et-racines-en-terre.md` (USDA FB 1939 ; Agriculture Canada pub. 1478) |
| Légume grignoté : jeter entier ; hantavirus par aliment souillé d'urine, d'excréments ou de salive | §7, tableau | Levé | `sources/76-aspc-hantavirus-transmission-prevention.md` |
| Bol d'eau salée à 35 g/L : gèle vers -2 °C ; légumes gèlent vers -1 °C (-0,7 à -1,1 °C) | §9, « Le thermomètre et l'hygromètre qu'on n'a pas » | Levé, avec valeur (point de gel du sel de table déduit de celui de l'eau de mer) | `sources/76-point-de-congelation-eau-salee-et-legumes.md` |
| Racines en terre : panais, salsifis, raifort seulement ; gel sans dégel, paillis retiré puis remis épais ; carotte et céleri-rave rentrés ; poireau retiré de la liste. « Ce qu'on perd » ajusté (plus de « déterrer au pic », qui supposait l'ancienne méthode) | §9, « Laisser les racines où elles ont poussé » | Corrigé | `sources/76-usda-agriculture-canada-caveaux-et-racines-en-terre.md` (USDA 1943, 1960 ; Agriculture Canada pub. 1260) |

Non appliqués, faute de drapeau (section « À corriger ailleurs » du fichier de vérifications) : les recommandations de la publication 1478 (réserve de 3 × 3 m, tablettes à 100 mm, plancher mouillé, aération de 1 à 4 heures), la couverture de terre de 0,6 à 0,9 m, le montage de la fosse conique (8 à 10 cm de terre), le temps de contact de 10 minutes de la javel, et la nuance du panais dans la ligne « Racine vitreuse » du §7.

Compression §3 et §4 — 27 septembre 2026 : 1 770 mots → 253 mots (§3 : 817 → 120 ; §4 : 953 → 133, tableau de 16 lignes → liste de 6) ; matériel coupé : registres et bouchons (fondus dans la ligne des conduits), porte isolée et joint, membrane et drain de pied (restent à l'étape 4), plancher à claire-voie, sable/sciure/sphaigne d'enfouissement, grillage (fondu dans les conduits), masque et eau de Javel (restent au §8, 2), pelle/pic/barre à mine, madriers d'étançonnement (pente de 45° au §5, 3 et au §8, 4), paragraphe final des « quatre fonctions » et renvoi éclairage/ch. 00b ; coupés du §3 : citations, chiffres de soulèvement (100 mm, 1 820 kPa, 4 150 degrés-jours C) et détail des glycoalcaloïdes (§7 le porte).
