> **Renuméroté une deuxième fois le 27 septembre 2026** (agriculture au tome 5) : chapitre 103 avant cette date. Table : plan/renumerotation-2.json.

> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 84. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 84, Souder, braser, réparer le métal

- **Tome :** 4 — Conserver et réparer
- **Fichier :** `chapitres/84-souder-braser-reparer-le-metal.md`
- **Poste :** rédacteur (rôle 2)
- **Date de la fiche :** 2026-09-20
- **Statut :** premier jet complet, écrit après captation des sources, pas avant. Les dix points
  du gabarit sont présents, dans l'ordre, avec les titres du gabarit. Procédure numérotée
  conservée : **40 étapes en sept sous-sections** (5.1 à 5.7).
- **Ampleur :** **7 416 mots utiles** au total, dont **6 334** dans les sections 1 à 9 et
  **1 082** dans la section 10. Compté marquage et URL retirés, par le même script que les
  chapitres voisins (ch. 73 : 6 785 au total par la même méthode).
- **Relecture humaine :** **obligatoire**, écrite à deux endroits — bandeau en tête de fichier
  avant la section 1, et bloc de questions à la section 10. Détail à la partie 6 ci-dessous.

---

## 0. Le dépassement d'ampleur — à trancher par l'éditeur

La consigne de rédaction visait **2 500 à 5 000 mots utiles**. Le chapitre en fait **6 334** hors
section 10. Le dépassement est déclaré ici plutôt que caché.

**Pourquoi.** Le sujet recouvre trois procédés qui n'ont pas les mêmes règles (soudage à l'arc,
brasage fort, brasage tendre), plus la sécurité des gaz comprimés, plus la sécurité incendie du
travail à chaud, plus **cinq mécanismes mortels distincts** au §8. Chacun de ces blocs est adossé
à une source captée ; aucun n'est du remplissage.

**Ce qui se coupe si l'éditeur veut rentrer dans la fourchette**, par ordre de préférence :

1. **Déplacer l'entreposage et la manutention des bouteilles vers le ch. 85** (stock et
   consommables) : §4 lignes bouteilles, §5.7 étape 40, la moitié de la fiche
   `84-cchst-soudage-gaz-comprimes…`. Économie estimée : 350 à 450 mots. **C'est la coupe la plus
   propre**, parce que le ch. 85 est exactement le chapitre du matériel qui dort.
2. **Sortir le tableau « Signes d'échec — la personne » (§7)** vers une annexe de sécurité
   partagée avec le ch. 83. Économie : environ 500 mots. **Mais ce tableau porte le piège
   cadmium/fièvre des fondeurs**, et une annexe se lit moins qu'une page ouverte au hasard, ce qui
   contredit la règle de répétition de `CLAUDE.md`. À ne faire que si l'annexe est appelée
   nommément depuis le §8.
3. **Réduire le tableau des procédés du §2 à trois lignes.** Économie : 200 mots. Perte réelle de
   valeur de décision.

**Ce qui ne se coupe pas :** l'encadré §8, les étapes 27 à 30 (acétylène, oxygène, cadmium), et
l'étape 38-39 (surveillance d'incendie). Ce sont les seules parties du chapitre dont l'absence
peut tuer quelqu'un.

---

## 1. Les chiffres `[À VÉRIFIER]`

Douze entrées au tableau de la section 10. **Sept d'entre elles ne sont pas des valeurs publiées
avec un point d'interrogation : ce sont des trous que le chapitre déclare en refusant de publier
un chiffre.** L'éditeur doit le savoir, parce qu'ils ne se retrouveront pas en cherchant le
marqueur dans le corps du texte.

| # | Objet | §  | Valeur publiée ? | Position du chapitre | Qui tranche |
| --- | --- | --- | --- | --- | --- |
| 1 | Distance d'éloignement des matières combustibles | 5.2 é.10 ; 6 | **Non** | Règle de portée (« tout ce qui brûle sort, ce qui ne sort pas se couvre »). Les 11 m (35 pi) qui circulent viennent de la **NFPA 51B**, norme américaine payante absente du dossier | Relecteur humain + vérif. sécurité |
| 2 | Teinte du verre filtrant par procédé et intensité | 4 ; 5.4 | **Non** — seule l'échelle « 2 à 14 » est publiée | Le tableau du CCHST est une **image** (`weld2.gif`), non captable en texte. Renvoi à **CSA W117.2** et à l'emballage | Relecteur humain (soudeur) |
| 3 | Intensité par diamètre d'électrode | 5.4 é.22 | **Non** | Renvoi à la boîte + essai obligatoire sur chute de même métal et même épaisseur | Relecteur humain |
| 4 | Préchauffage de la fonte (température, durée) | 5.5 é.32 | **Non** | Principe seulement : chauffer large, refroidir lentement, cendre pour la nuit. Renvoi ch. 88 | Vérif. technique + ch. 88 |
| 5 | Mécanisme de la plage d'inflammabilité (« le réservoir vide est le dangereux ») | 8 bloc 2 | Oui, **comme affirmation du livre, déclarée non citée** | La source CCHST donne la règle, pas la raison. Le chapitre publie la raison parce qu'elle est ce qui change le comportement | **Vérif. technique.** Si le mécanisme est faux, l'encadré perd sa force |
| 6 | Mécanisme de l'heure d'attente (bouteille d'acétylène couchée) | 5.5 é.27 | **Non** — la consigne est sourcée, l'explication ne l'est pas | Le chapitre donne la consigne et s'arrête là. L'explication par le solvant sur masse poreuse n'est **pas** dans l'extrait capté | Vérif. technique |
| 7 | Extension de la règle du plomb, de l'eau potable vers les aliments | 2 ; 8 bloc 5 | Oui, **extension déclarée** | La source Québec.ca ne parle que d'eau potable et de plomberie. Santé Canada ne fournit que le mécanisme (acide et sel tirent le métal). La règle publiée est **restrictive**, donc l'extension est prudente | **Relecteur humain + vérif. sécurité. C'est l'extension la plus lourde du chapitre** |
| 8 | Défaut de surveillance porté de 60 min à 3 h sur plancher de bois | 5.7 é.39 | Oui, **décision du livre déclarée** | Les deux valeurs sont sourcées (CCHST) ; c'est le choix du défaut qui ne l'est pas | Relecteur humain |
| 9 | Perte du traitement thermique d'une chaîne ou d'un crochet soudé | 2 | Oui, sans source | Affirmation du livre. Elle **ferme** une opération, donc côté prudent | Vérif. technique + ch. 86 |
| 10 | Repères d'identification des métaux (aimant, lime, aspect) | 5.1 é.4 | Oui, sans source | Savoir d'atelier. Aucune source officielle au dossier | Relecteur humain |
| 11 | Repère visuel de ventilation (« panache qui part franchement ») | 5.2 é.8 ; 6 | Oui, comme **traduction** de 0,5 m/s | La valeur instrumentée est sourcée ; sa traduction en observation à l'œil ne l'est pas | Vérif. sécurité |
| 12 | Centre antipoison du Québec, **1 800 463-5060** | 7 ; 8 | Oui | Repris du dossier du tome 4, **pas adossé à une fiche `84-`** | Éditeur : à recomposer avant impression |

**Note au vérificateur technique — les chiffres les plus exposés ne sont pas dans cette liste.**
Ce sont les valeurs **sourcées et répétées**, celles qu'une faute de recopie abîmerait sans bruit.
C'est exactement l'erreur du pilote du ch. 63 (71 °C au lieu de 74 °C). À recompter un par un
contre les fiches de `/sources` :

| Chiffre | Où il apparaît | Fiche à ouvrir |
| --- | --- | --- |
| **450 °C** (seuil brasage fort / brasage tendre) | §2 tableau, §3 | `84-cchst-procedes-de-soudage-et-definitions-brasage.md` |
| **103 kPa (15 lb/po²)** acétylène | §5.5 é.28, §6 | `84-cchst-soudage-gaz-comprimes-entreposage-et-types.md` |
| **6,1 m (20 pi)** / **1,5 m (5 pi)** / **une demi-heure** | §5.7 é.40, §6 | idem |
| **48,9 °C (120 °F)** et **51,7 °C (125 °F)** | §5.7 é.40, §6 | idem |
| **1 heure** (bouteille couchée) | §5.5 é.27, §6 | idem |
| **60 minutes** et **3 h** (surveillance) | §5.7 é.38-39, §6 | `84-cchst-soudage-travail-a-chaud.md` |
| **0,5 m/s (100 pi/min)** | §5.2 é.8, §6 | `84-cchst-soudage-fumees-rayonnement-epi-ventilation.md` |
| **teintes 2 à 14** | §4 | idem |
| **200 à 1 400 nm** ; 200-400 / 400-700 / 700-1 400 | §3 | idem |
| **90 % sous 5 microns**, **groupe 1** du CIRC, VEMP **5 mg/m³** | §1, §3, §7 | `84-cnesst-reptox-gaz-et-fumees-de-soudage-et-de-coupage.md` |
| **20 %** de cadmium ; **4 à 10 h** ; **24 à 48 h** ; **48 h** ; **10 min à 150-300 mg/m³** ; **8 h à 5 mg/m³** ; **20 %** de mortalité | §7, §8 bloc 1 | `84-cnesst-reptox-oxyde-de-cadmium.md`. **Sept valeurs dans un seul bloc : c'est le passage le plus exposé du chapitre** |
| **0,2 %** (1989) ; **5 μg/L** ; **moins de 6 ans** | §2, §8 bloc 5 | `84-quebec-plomb-eau-potable-et-soudure.md` |

**Piège de relecture à signaler :** le chiffre **20 %** apparaît deux fois au §8 bloc 1 avec deux
sens différents — 20 % de cadmium dans certains alliages d'apport, et 20 % de mortalité des
atteintes pulmonaires aiguës. Les deux sont exacts et viennent de la même fiche. Ne pas
« corriger » l'un par l'autre.

---

## 2. Ce que le chapitre affirme et qui doit être recoupé

| Affirmation | Source citée dans le texte | À recouper parce que |
| --- | --- | --- |
| Le joint soudé a « les mêmes propriétés que le matériau constitutif » | CCHST | C'est la promesse qui rend une soudure ratée plus dangereuse qu'un boulon lâche. Doit être exacte au mot |
| Un joint brasé est « moins solide qu'un joint de soudure » | CCHST | C'est ce qui ferme le brasage pour tout ce qui porte une charge, **sans** publier de valeur de résistance |
| L'acétylène « peut exploser même en l'absence d'air » | CCHST | Le membre de phrase est le mécanisme. S'il tombe à la relecture, l'interdiction de « pousser un peu » perd son appui |
| Souder à l'arc près de vapeurs de solvant chloré produit du phosgène | CNESST | Vérifier que le texte dit bien **rayonnement**, pas flamme : c'est ce qui rend le danger possible à distance, dans une autre partie de l'atelier |
| Une pièce galvanisée doit être décapée **au-delà** de la ligne du joint | Aucune | **Jugement du rédacteur.** La source dit de souder des pièces exemptes de recouvrement ; la largeur de décapage est une inférence |
| Un ventilateur dirigé sur un bain sous protection gazeuse crée de la porosité | Aucune | Savoir d'atelier, non sourcé. Non listé aux `[À VÉRIFIER]` parce qu'il ne porte aucun risque de sécurité — à ajouter si le vérificateur le juge structurant |
| Le sel et l'acide des procédés du tome 4 tirent le métal hors d'un contenant réparé | Santé Canada | La source parle d'ustensiles de cuisine, **pas** de réparations. Le lien est fait par le chapitre |

---

## 3. Les rappels de sécurité de `CLAUDE.md` repris ici

Une seule ligne du tableau de `CLAUDE.md` s'applique à ce chapitre, et elle y est **répétée trois
fois** conformément à la règle « quelqu'un ouvre le livre à une page, pas à la première » :

| Règle du tableau | Où elle est répétée dans le ch. 84 |
| --- | --- |
| **Génératrice : jamais dans un bâtiment, un garage ou sous un auvent** | §4 (ligne « avertisseur de monoxyde de carbone », non négociable) ; **§5.2 étape 14** (consigne d'installation) ; **§8 bloc 3** (mécanisme complet, avec la citation Québec.ca sur le mot « **abri** ») |

**Pourquoi c'est ce chapitre-là qui en a le plus besoin.** Un poste à souder à l'arc hors réseau
tourne sur une génératrice, ou **est** un moteur à essence, et un atelier de chalet est presque
toujours un garage ou un appentis. Le mot « abri » de la citation couvre la bâche tendue pour
souder au sec — le geste exact que la pluie rend tentant. Le chapitre ajoute le piège propre au
soudage : les symptômes du monoxyde sont ceux qu'un soudeur met spontanément sur le compte des
fumées et de la chaleur.

**Les huit autres lignes du tableau ne s'appliquent pas** (cuisson du gibier, abats de cervidés,
trichinellose, tularémie, thuyone du cèdre, botulisme de type E, botulisme sans signe, mal de
caribou). Elles n'ont **pas** été insérées de force : diluer l'encadré du chapitre avec des règles
d'un autre domaine ferait exactement ce que `CLAUDE.md` interdit. Le §8 bloc 5 fait toutefois une
**analogie** avec les dangers sans signal du tome 4 sans republier aucune de leurs valeurs.

---

## 4. Les images requises

Aucune image n'est produite ni choisie à ce stade. Sept planches sont demandées, avec leur
cadrage. Rien ne se copie du web sans vérifier la licence ; chaque image entrera dans
`images/credits.md` avec auteur, licence et lien (`CLAUDE.md`).

| # | Contenu | Cadrage | Format |
| --- | --- | --- | --- |
| 1 | **Le poste dehors, vue d'ensemble.** Schéma au trait en vue de dessus : soudeur, pièce, sens du vent, panache qui part de côté, écran opaque côté chalet, bouteilles debout et arrimées en retrait, extincteur et seau à portée de bras, génératrice loin des ouvertures. Flèches de vent obligatoires | Vue de dessus, hauteur d'œil implicite, sans perspective. Légendes numérotées renvoyant aux étapes 7 à 14 | **Demi-page** |
| 2 | **Les trois joints en coupe.** Soudure (les deux pièces fondues ensemble, ligne de fusion continue) / brasage fort (film d'apport entre deux pièces intactes, jeu serré) / brasage tendre (même chose, film plus épais). Le seuil de 450 °C écrit entre les deux brasages | Coupe transversale agrandie, trois vignettes alignées, échelle identique | **Demi-page** |
| 3 | **Planche des défauts de cordon.** Six vignettes : cordon sain, manque de fusion (bombé, bords nets), caniveau, porosité, inclusion de laitier, fissure. Dessin au trait ou macrophotographie | Vue de dessus du cordon + une coupe pour le manque de fusion et l'inclusion. Éclairage rasant si photo | **Demi-page** |
| 4 | **L'emballage d'une baguette de brasage portant la mention « sans cadmium » / *cadmium free*.** C'est l'image qui peut sauver quelqu'un : elle montre **où regarder** sur une boîte | Macrophotographie serrée sur le texte de l'emballage, boîte entière en médaillon. Marque à masquer ou à neutraliser | **Quart de page** |
| 5 | **Entreposage des bouteilles.** Oxygène et gaz combustible séparés de 6,1 m, **ou** mur de 1,5 m de hauteur. Les deux solutions côte à côte, cotées | Élévation, schéma coté. Cotes métriques d'abord, impériales entre parenthèses | **Quart de page** |
| 6 | **Décapage du galvanisé.** Avant / après sur la même pièce, la zone décapée débordant nettement de la ligne du joint | Vue rapprochée à plat, même angle pour les deux prises. Ligne du joint tracée à la craie et visible | **Quart de page** |
| 7 | **L'éclisse boulonnée de la variante d'urgence.** Plaque à cheval sur la cassure, boulons décalés, contreplaque de l'autre côté. Montrer aussi le **mauvais** montage : boulons alignés dans l'axe de la fissure | Vue de face + coupe. Deux versions côte à côte, la mauvaise barrée | **Quart de page** |

**Photos de JP à privilégier** pour les planches 3, 4, 6 et 7 : ce sont des prises d'atelier
faisables au chalet, et ça règle la licence.

---

## 5. Les renvois

Tous vérifiés contre la liste des 89 chapitres. **Aucun renvoi vers un chapitre hors liste.**

| Ch. | Raison du renvoi | Réciprocité à demander ? |
| --- | --- | --- |
| 60 | Évaporateur et chaudières de sève : contact alimentaire, §8 bloc 5 | Oui — le ch. 60 doit interdire la réparation à la soudure d'un évaporateur |
| 65 | Conduits, grilles et tôles de fumoir | Oui |
| 71 | Cuves de saumure : sel, contact alimentaire | **Oui, prioritaire** — le sel est nommé par Santé Canada comme facilitant le transfert |
| 72 | Grilles et supports de fumage | Oui |
| 73 | Un autoclave ne se répare pas ; acidité des marinades | **Oui, prioritaire** |
| 76 | Ferrures et tôles de caveau, fabriquées plutôt que réparées | Non |
| 79 | Gants, manches et tablier de cuir du §4 | Non |
| 80 | Ligatures de la variante d'urgence, §9 B | Non |
| 82 | Meule, lime, remise en état d'un tranchant | Non |
| 83 | **Réservoirs de carburant : §8 bloc 2.** Moteurs et supports | **Oui, prioritaire** — et les deux chapitres partagent la même exigence de relecture humaine |
| 85 | Électrodes, baguettes **sans cadmium**, gaz, disques ; la pièce de rechange qu'on ne répare pas | **Oui, prioritaire** — c'est aussi la cible de la coupe n° 1 du §0 |
| 86 | Ce qui lève une charge ne se soude pas | **Oui, prioritaire** |
| 87 | Même logique d'assemblage démontable que l'éclisse boulonnée | Non |
| 88 | Préchauffage, couleurs, refroidissement lent, forge de la variante d'urgence, frettage | **Oui, prioritaire** — le ch. 88 porte les valeurs de chauffe que le ch. 84 refuse de publier |
| 89 | Dégraissage à l'eau savonneuse plutôt qu'au solvant chloré | Oui |

---

## 6. Le relecteur humain requis

**Requis, et écrit dans le chapitre à deux endroits** (bandeau de tête et section 10).

**Profil principal :** compagnon soudeur détenteur d'une qualification reconnue — Bureau canadien
de soudage (**CWB Group**) ou certificat de qualification professionnelle en soudage-montage.
**Profil secondaire, pour la section 8 seulement :** conseiller en prévention de la **CNESST** ou
hygiéniste du travail, pour les valeurs d'exposition au cadmium et aux fumées, et pour la façon
de citer une VEMP devant un public non professionnel.

**Les cinq questions posées dans le chapitre :**

1. Fermer complètement le soudage des réservoirs est-il tenable hors réseau, ou faut-il publier
   une méthode encadrée, et adossée à quoi ?
2. L'interdiction de toute réparation en contact alimentaire ou avec l'eau est-elle correcte, ou
   existe-t-il un apport défendable (étain sans plomb, argent sans cadmium) pour un chaudron ou
   un évaporateur, avec quelle source ?
3. Où un lecteur québécois prend-il **gratuitement** la table des teintes de verre filtrant et les
   distances d'éloignement des combustibles ?
4. Le §2 envoie le lecteur hors réseau vers le brasage plutôt que vers l'arc. Est-ce le bon défaut
   pour un homme qui sait souder mais qui n'a pas de réseau ?
5. La fermeture du soudage de tout organe de levage est-elle formulée assez largement ?

**Question supplémentaire, à poser au relecteur mais volontairement absente du chapitre :** le
chapitre déconseille l'aluminium au débutant et n'en donne aucune méthode. Pour un chalet où les
chaloupes, les échelles et les boîtes de VTT sont en aluminium, est-ce une lacune qui mérite son
propre chapitre, ou la bonne décision ?

---

## 7. État de la chaîne

| Porte | Statut |
| --- | --- |
| Rédacteur (rôle 2) | **Fait** — ce document |
| Vérificateur technique | À faire. Entrer par la partie 1 (chiffres sourcés à recompter) et la partie 2 |
| Vérificateur sécurité | À faire. Entrer par le §8 du chapitre et par les entrées 5, 7 et 11 des `[À VÉRIFIER]` |
| Relecteur humain externe | **Obligatoire.** Partie 6 |
| Éditeur | À faire. Deux décisions l'attendent : le dépassement d'ampleur (partie 0) et le numéro du Centre antipoison (`[À VÉRIFIER]` n° 12) |
| Metteur en pages | À faire. Sept planches, partie 4 |

## Notes retirées du chapitre — 23 septembre 2026

- §5.5, étape 28 : *La valeur impériale est donnée ici, contre la règle générale du livre, parce que le manomètre du détendeur est gradué en lb/po² et que c'est ce cadran-là que le lecteur doit lire.*
- §5.7, étape 39 : *Ce déplacement du défaut est une décision du livre, pas une exigence de la source.*
- §8, bloc 2 : *L'explication de la plage d'inflammabilité est du livre, pas d'une source captée : le chiffre des proportions n'est nulle part ici, et il n'a pas à y être — le geste ne change pas selon le chiffre.*

## Passe légal et signes — 23 septembre 2026

**Aucune modification du chapitre.**

- Légal : aucune phrase de loi, de règlement, de permis ou de municipalité. Les 60 minutes et
  3 heures de surveillance (étapes 38-39), les 6,1 m entre bouteilles (étape 40) et les 103 kPa
  (étape 28) sont dits comme des faits avec leur mécanisme, sans règle : gardés. Le Centre
  antipoison (1 800 463-5060) est un service qu'on appelle : gardé. « SMAW » est un sigle de
  procédé, pas un numéro de norme. « Cancérogène du groupe 1 » est une classification, pas une
  obligation : gardé, comme le doute de la passe paperasse le proposait.
- Signes : fièvre des fondeurs, coup d'arc, porosité, caniveau, inclusion, manque de fusion sont
  des états qu'un homme qui soude reconnaît, et le §7 les décrit tous. Les paillettes du
  galvanisé, la fonte qui s'effrite à la lime, le panache qui part de côté et le banc de
  batteries qui bouillonne sont décrits là où ils sont nommés. Aucune note ajoutée.

Doutes de la passe paperasse sur ce chapitre (lignes préfixées `ea` : les trois trous du §4,
l'étape 1, le groupe 1, les notes déplacées) : aucun ne touche au légal ni à un signe non
expliqué, laissés tels quels.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/84-verifications.md`, appliqués au chapitre. Source unique de
cette passe : `sources/84-us-army-tc9-237-soudage-fonte-flux.md` (+ `84-us-army-tc9-237-welding-theory-1993.pdf`
et `-texte.txt`), US Army, *Welding Theory and Application*, TC 9-237, 1993.

- §3, préchauffage de la fonte — **corrigé** (le texte n'avait aucune valeur) : électrode de fonte
  120 à 425 °C (source : 121-425) ; électrode de cuivre 120 à 200 °C (source : 121-204) ;
  électrode de nickel, pièce tiède (source : 38 °C recommandés, préchauffage non obligé) ;
  brasage, une centaine de degrés (source : 93 °C) ; flamme et baguette de fonte, rouge très
  sombre vu dans le noir ; bâton de pin qui noircit : 260 à 425 °C (source : 260-427, § 7-12,
  acier à haut carbone) ; électrode d'acier ordinaire en dépannage, cordons de 2 à 2,5 cm
  (source : 19 à 25,4 mm) martelés chauds.
- §4, « Les trois trous du chapitre » — **corrigé** en « deux trous » : le préchauffage de la fonte
  est publié, renvoi au §3.
- §5.5, étape 32, préchauffage au brasage — **corrigé** : une centaine de degrés (93 °C) suffit
  presque toujours ; refroidissement « not extremely critical » ; trou d'arrêt de fissure percé
  1,3 à 2,5 cm au-delà de chaque bout (source : 1/2 à 1 po, 1,27 à 2,54 cm — la proposition
  « 1 à 2,5 cm » a été ramenée à la valeur de la source).
- §7, tableau, fissure fine — **corrigé** : trou d'arrêt, puis préchauffage par procédé (renvoi
  §3 ; le fichier de vérifications disait §2 par erreur, le principe thermique est au §3).
- §9-F, décapant au zinc — **corrigé** : pas de proportion, la saturation ; résidu à laver.
- §9-A, nombre de batteries par électrode — **introuvable** : dit sans chiffre, réglé sur une
  chute du même métal (on part de deux, on en ajoute une tant que l'arc colle ou s'éteint).
- §9-C, pâte d'argile et de cendre — **introuvable** : proportions retirées (« épaisse comme un
  mastic »). La recette elle-même n'a toujours aucune source au dossier.

## Corrections croisées — 24 septembre 2026

Conciliation avec le ch. 35b, qui fixe un guidon à la soudure à l'étain vers 250 °C, jamais à la
brasure, avec renvoi au ch. 84.

- §9-F, « Ce qu'on perd » — **précisé** : « Un joint d'étain ferme, il ne tient pas » devient « Un
  joint d'étain posé au fer sur une tôle ferme, il ne tient pas ». **Ajouté** : la petite pièce
  ajustée serré sur de l'acier (guidon sur son canon, ch. 35b) tient à l'étain ; plus l'ajustage
  est serré, plus le joint est solide (« The tighter or closer the fit, the stronger the solder
  bond ») ; un étain à l'argent (96 % étain, 4 % argent) coule vers 250 °C (475 °F), loin du
  brasage, souvent au-delà de 500 °C (« often 1000° F. or more »), qui peut détruire la trempe
  (« can ruin bluing and destroy heat-treating ») ; chaleur sur la pièce la plus massive (« most of
  the heat going onto the barrel (the most massive part) »), jamais sur la soudure, qui fond sans
  coller (« the solder will melt, but it will not adhere ») ; refroidi à l'air, la trempe à l'eau
  affaiblit le joint (« you may cause the solder to crystallize, which will weaken the solder
  joint »).
- §2, tableau des trois procédés, colonne Brasage tendre — « réservé à l'étanchéité et à
  l'électricité » → « … et aux petites pièces ajustées » ; « Le bon usage » reçoit « petite pièce
  ajustée serré sur l'acier (guidon, §9 F) ».
- Ce que la source ne dit pas, et qui n'est pas écrit : si l'étain-plomb de plomberie ou
  d'électricité tient une mire ; à quelle température exacte l'acier perd sa trempe.
- `sources/35b-brownells-soudure-etain-guidon.md` (+ PDF). Notice de fabricant, pas une source
  officielle : aucun ministère ne traite de la réparation d'une mire.

Compression §3 et §4 — 27 septembre 2026 : 1 793 mots → 303 mots (§3 : 613 → 117 ; §4 : 1 180 → 186, tableau de 19 lignes → 9 lignes à puces) ; matériel coupé : gants à crispin, veste et tablier de cuir, bottes et pantalon sans revers, ventilation (étape 8, §6), extincteur-seau-pelle (étape 13), chariot et chaîne des bouteilles (étapes 27 et 40), meuleuse-disques-brosse, marteau à piquer, étau et serre-joints (étape 19, §9 G), eau pour rincer l'œil, paragraphe « Les deux trous du chapitre » ; §3 : spectre de l'arc en nm, taille des particules, préchauffages à l'électrode de cuivre, de nickel et à la baguette de fonte. Déplacé : fibre synthétique qui colle à la peau → étape 21 ; neige qui projette le métal en fusion → étape 13 ; bouteille couchée, détendeur arraché, projectile → étape 27 ; bâton de pin (260 à 425 °C) et électrode d'acier ordinaire sur fonte (cordons de 2 à 2,5 cm martelés) → §7, ligne « Fissure fine », dont le renvoi « §3 : » est retiré.

## Décisions de JP, 19 octobre 2026

Rédacteur de la passe « décisions de JP » (les douze réponses de JP du 19 octobre ; le libellé des décisions est dans
`_reprise/scratchpad/tome1-final/decisions-jp.js`). Aucune recherche refaite sur ce qui était déjà vérifié ; texte d'avant
cette passe : commit `f515e01`.

| Décision | Où | Ce qui a changé | Source ou règle |
| --- | --- | --- | --- |
| 6. Les renvois vers le 00b pointent vers des lignes qui existent | Section 2 ou 3, « Ce qui n'est pas dans ce chapitre » (l. 56) | « Les électrodes, baguettes, gaz et disques à acheter et à garder en stock : le chapitre d'achat (00b) » devient « Le poste, ses électrodes et le chalumeau à acheter : le chapitre d'achat (00b), seul inventaire du livre. » Les électrodes sont maintenant sur la ligne du poste (palier 4) ; les baguettes et les disques n'ont pas de ligne au 00b (rendu à JP dans `suivi/00b-redaction.md`) | Décision 6 |

`controle.py --avant` (f515e01) : celui d'avant ; rien n'a disparu.
