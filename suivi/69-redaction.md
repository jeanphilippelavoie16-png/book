> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 64. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 64, Saumure

- **Fichier :** `chapitres/64-saumure.md`
- **Tome :** 4 — Conserver et réparer
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (technique) et 4 (sécurité)
- **Ampleur :** ≈ 4 700 mots utiles (6 161 mots bruts, tableaux compris). Procédure numérotée en
  13 étapes, sept tableaux, encadré DANGER à six points, variante d'urgence complète.
- **⚠ RELECTURE HUMAINE EXTERNE OBLIGATOIRE** — marquée en tête du fichier chapitre et détaillée
  à la section 10.

---

## 0. Ce qu'il faut savoir avant de lire le reste

**Contrainte de session : le budget de recherche web était épuisé à l'ouverture** (200/200
WebSearch). Toutes les sources ci-dessous ont donc été obtenues par **WebFetch direct sur des
adresses connues**, à partir des fiches sources déjà au dossier et de l'index des contrôles
préventifs de l'ACIA. Conséquence : deux pistes n'ont pas pu être explorées faute de moteur de
recherche, et elles sont nommées au point 6.

**Trois trouvailles de cette session qui servent à tout le tome 4 :**

1. **La page de l'ACIA sur les nitrites contient les formules d'injection** et l'exemple du gain
   de 15 %. Aucune fiche source antérieure ne les avait relevées. C'est le seul calcul officiel
   au dossier qui relie une saumure à une pièce de viande. Les chapitres 63 et 65 peuvent s'en
   servir.
2. **Deux pages neuves de l'ACIA, jamais captées dans le projet** : le refroidissement des
   produits traités par la chaleur (54 → 27 °C en moins de 2 h ; 54 → 4 °C en moins de 7 h) et
   l'inactivation de *Trichinella spiralis* dans le porc (barèmes complets de congélation, de
   cuisson et de salaison). **La seconde est un piège** : elle vaut pour le porc, jamais pour le
   gibier, et le chapitre la cite uniquement comme contre-exemple.
3. **Le mot « saumuré » a une définition réglementaire** — « du sel avec au moins 100 ppm de
   nitrite ou de nitrate » (ACIA). Il y a donc un **plancher** en plus du plafond de 200 ppm.
   Aucun chapitre du livre ne l'avait relevé.

**Adresse morte à corriger dans le livre :**
`canada.ca/.../conseils-generaux-salubrite-aliments/temperatures-cuisson-securitaires.html`
répond **404** le 2026-09-20. L'adresse vivante est
`canada.ca/fr/sante-canada/services/conseils-generaux-salubrite/temperatures-securitaires-cuisson-interne.html`.

**Les deux adresses de contrôles préventifs de l'ACIA en `/plans-controle-preventif/...` pour le
refroidissement et le traitement thermique répondent 410 Gone.** Les adresses courtes en
`/fr/controles-preventifs/produits-viande/...` répondent. À signaler au metteur en pages : les
liens imprimés doivent être les courts.

---

## 1. Les chiffres marqués `[À VÉRIFIER]`

| # | Valeur | Où dans le chapitre | Pourquoi elle n'est pas sourcée | Piste |
| --- | --- | --- | --- | --- |
| 1 | **Fraction d'eau de la viande, 75 %**, d'où le facteur **1,33** | §5 étape 4 | Valeur d'usage. Aucune source officielle retrouvée. **Toute la formule de saumure d'équilibre en dépend** | Fichier canadien sur les éléments nutritifs (teneur en eau de l'orignal), ou table de composition. **Question n° 1 au relecteur** |
| 2 | **Teneur de 6,25 % en nitrite** du sel de salaison de l'exemple | §5 étape 5 | Valeur d'étiquette prise en exemple, **pas une norme**. Le chapitre le dit deux fois | Photographier l'étiquette du sac réellement acheté et remplacer l'exemple par cette valeur |
| 3 | **Durées d'immersion par épaisseur** : 3-4 j, 5-8 j, 8-14 j | §5 étape 8, tableau | Estimations du livre. Aucune source officielle de durée d'immersion domestique | **Question n° 3 au relecteur.** Le risque est faible en saumure d'équilibre (dépasser ne sale pas plus) mais le chiffre reste non sourcé |
| 4 | **Gain de masse attendu** à la sortie | §6, tableau | Aucun ordre de grandeur sourcé | Mesure de terrain : peser avant et après sur les trois premières pièces, consigner |
| 5 | **Durée de conservation au froid d'une pièce saumurée cuite** | §5 étape 13 | La page du MAPAQ renvoie à **Thermoguide+**, non capté faute de budget de recherche | **Capter Thermoguide+ dans une session dédiée.** Règle aussi des trous des ch. 61, 63, 66 |
| 6 | **Rôle antibotulinique du nitrite** | Absent du texte, signalé en §3 et §10 | **Introuvable dans toutes les pages captées.** L'ACIA encadre le nitrite sans nommer *C. botulinum* une seule fois | **Question n° 6 au relecteur.** Tant que la source manque, le chapitre ne l'affirme nulle part |
| 7 | **Stabilité à la chaleur de la toxine de *S. aureus*** | §8 point 6 | Formulé prudemment (« sans nécessairement défaire »). Aucune source | **Question n° 5 au relecteur.** Phrase la plus fragile de l'encadré |
| 8 | **Test de l'œuf ou de la pomme de terre qui flotte** | §9 | Aucun barème officiel | Présenté sans chiffre. Laisser tel quel si le relecteur ne fournit rien |
| 9 | **Saturation du sel dans l'eau** | §9 | **Volontairement non chiffrée** : la méthode (ajouter jusqu'à ce qu'il en reste au fond) n'a besoin d'aucun nombre | Ne pas chiffrer sans source |
| 10 | **1,15 g de nitrite par kg de saumure d'injection** pour 150 ppm à 15 % de gain | §5 étape 9 | **Calcul du livre** à partir de la formule officielle de l'ACIA | **Question n° 2 au relecteur.** L'arithmétique doit être refaite par une seconde personne avant impression |

**Chiffres sourcés et fermes du chapitre** (ne pas les rouvrir sans source contraire) :
nitrite **200 ppm / 20 g par 100 kg**, bacon de flanc **120 ppm / 12 g**, nitrate en saumurage
lent **200 ppm**, salage à sec sur claies **62 g / 186 g**, définition de « saumuré » à
**100 ppm** minimum, formules d'injection et exemple à **15 %** de gain (ACIA) ; **2,5 % de sel
avec 100 ppm de nitrite**, **aw ≤ 0,85** et **≤ 0,90**, pH **5,3** et **4,6**, seuil **15,6 °C**
(ACIA) ; **74 °C** gibier et restes, **82 °C** oiseau entier, **70 °C** poisson tenu **1 min**,
**71 °C** porc et haché (Santé Canada) ; **4 °C ou moins / 60 °C ou plus**, zone de danger
(MAPAQ) ; **7 °C en 24 h**, **−18 °C** (MAPAQ) ; **3 °C** pour les souches non protéolytiques,
**≤ 14 jours**, **aw < 0,97**, **9 % de sel** méthode FO-38, **90 °C 10 min** pour 6D,
congélation **−35 °C/15 h** ou **−20 °C/168 h** (Santé Canada) ; **54 → 27 °C en < 2 h** et
**54 → 4 °C en < 7 h** (ACIA) ; nitrate et nitrite de potassium à **200 ppm** (Santé Canada,
liste 11) ; barèmes trichinelle du **porc** (ACIA) ; mécanisme de la méthémoglobinémie (INSPQ).

---

## 2. Images requises

| # | Format | Sujet | Cadrage demandé | Source |
| --- | --- | --- | --- | --- |
| 64-01 | **Demi-page** | **L'image clé du chapitre.** La pesée du système : sur la même table, la pièce d'orignal sur la balance (4,0 kg affichés), le seau d'eau mesurée, le tas de sel pesé dans un bol, et la petite pesée de sel de salaison sur une balance à 0,1 g | Plongée à 45°, table dégagée, fond neutre. **Les deux afficheurs doivent être lisibles à l'impression.** Le carnet ouvert avec les quatre chiffres écrits à la main dans le cadre | Photo de JP |
| 64-02 | **Quart de page** | La différence qui tue une saumure : deux sacs côte à côte, sel à marinade et sel de salaison rose, chacun avec son étiquette bien lisible | Frontal, même distance, éclairage égal. **La teinte rose doit ressortir** — c'est le seul repère visuel du lecteur | Photo de JP. Remplace aussi l'exemple de teneur du §5 (chiffre n° 2) |
| 64-03 | **Demi-page** | Le montage d'immersion en coupe : pièce, saumure, assiette renversée, pot d'eau en poids, rien qui dépasse, thermomètre planté dans la saumure | Contenant transparent, prise de vue **de côté à hauteur de la saumure**, pas en plongée : c'est le niveau qu'on doit voir. Règle de 10 cm dans le cadre | Photo de JP, ou planche dessinée si l'eau trouble ne se photographie pas |
| 64-04 | **Quart de page** | Deux tranches de la même pièce côte à côte : une saumurée à cœur (rosé uniforme), une dont le centre est resté gris | Plongée verticale, même assiette, même lumière, **le même jour** sinon la couleur n'est pas comparable | Photo de JP. **Demande de rater volontairement une pièce** — à planifier |
| 64-05 | **Quart de page** | L'injection : seringue à saumure enfoncée le long du fémur d'un cuissot, la main gauche tenant la pièce | Trois quarts, macro sur l'aiguille et la surface, gants visibles | Photo de JP |
| 64-06 | **Quart de page** | Thermomètre à sonde lisant 74 °C dans la partie charnue d'une pièce saumurée cuite, loin de l'os | Macro sur l'afficheur, pièce nette en second plan, **la valeur 74 doit être lisible** | Photo de JP. Même prise de vue que la 24-07 : les grouper |
| 64-07 | **Quart de page** | La saumure filante : le fil continu qui coule d'une cuillère relevée au-dessus du seau | Contre-jour latéral pour détacher le fil, fond sombre. **C'est un défaut à photographier quand il arrive** — le noter dans le carnet de photos et guetter | Photo de JP, opportuniste |

**Note pour `images/credits.md` :** aucune image versée. Toutes sont prévues en photos maison.
La **64-04** et la **64-07** demandent une pièce ratée : les prendre quand ça arrive, ne pas
attendre de les provoquer.

---

## 3. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 4, 18, 20 | Génératrice et monoxyde : garder un frigo ou un congélateur en marche pendant une saumure |
| 8, 12 | Le sel est un poste de **stock permanent**. Le chapitre 64 en consomme beaucoup : vérifier que le ch. 8 prévoit assez de sel à marinade et **un sac de sel de salaison** |
| 13 | Eau : l'eau de saumure doit être potable, bouillie **et refroidie** |
| 36 | Abattage : le 7 °C en 24 h. Une pièce mal refroidie ne se rattrape pas au sel |
| 41 | Abats : langue et cœur se saumurent. **Foie et reins de cervidés, jamais** — cadmium |
| 44 | Lièvre : tularémie et gants, avant le pot |
| 48, 52 | Ours noir et phoque : trichinelle. Le sel ne la tue pas |
| 61 | Pourquoi la viande pourrit : le chapitre amont. Le 64 ne réexplique pas la microbiologie générale |
| 62 | **Le sel.** Types de sel, additifs, salpêtre et sa forme moderne. Le 64 refait le calcul, pas la théorie |
| 63 | **Chapitre jumeau.** Salaison à sec : même sel, autre transport. Partage des sources ACIA sur le nitrite. **Vérifier qu'aucun des deux ne réexplique le nitrite en entier** |
| 65 | **Fumage à froid : c'est lui qui tranche la question du nitrite obligatoire**, pas le 64. Le 64 s'y réfère et ne décide pas à sa place |
| 66 | Fumage à chaud : la sortie normale d'une pièce saumurée sans nitrite |
| 68, 69 | Froid naturel ; congélateur qui dégèle. La saumure dépend entièrement du froid |
| 70, 71, 72 | **Tout le poisson part ici.** Le 64 ne traite pas le poisson : botulisme de type E et seuil de 3 °C |
| 73 | Conserves et marinades : la barrière du pH, pas celle du sel. Frontière à tenir |
| 76 | Caveau à légumes : le lieu de la variante d'urgence |
| 77 | Fermentation : l'autre usage du mot « saumure » dans le livre. **Risque de confusion à surveiller à l'édition** |

**Vérification faite :** tous les numéros ci-dessus existent dans le plan des 89 chapitres.
Aucun renvoi vers un chapitre inventé.

---

## 4. Rappels de sécurité de CLAUDE.md repris dans ce chapitre

| Règle du tableau de CLAUDE.md | Reprise ici ? | Où |
| --- | --- | --- |
| Cuisson du gibier sauvage à **74 °C** à cœur | **Oui**, quatre fois, avec la méthode de mesure et la mise en garde propre à ce chapitre : **la couleur rosée d'une viande nitritée persiste à toute température** | §5 étape 11, §6, §8 points 3 et 4, §9 |
| **Jamais le foie ni les reins de cervidés** — cadmium | **Oui**, dans l'encadré DANGER, avec le mécanisme (accumulation à vie) et le motif propre au chapitre : on saumure la langue et le cœur, le foie est sur la même table | §8 point 5 |
| Trichinellose : ni le sel, ni le fumage, ni le gel domestique | **Oui**, avec les citations exactes de l'ACIA, et la précision que les espèces **sauvages** résistent à la congélation | §2, §8 point 3 |
| Tularémie : gants obligatoires | **Oui**, avec le mécanisme (passage cutané à l'écorchage, donc avant la saumure) | §4 (matériel), §8 hors encadré |
| Botulisme de type E : toxine dès **3 °C** | **Oui**, avec le mécanisme et la conséquence opérationnelle : un frigo à 4 °C ne l'arrête pas | §8 point 1 |
| Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence | **Oui**, deux fois : dans l'encadré et **sous le tableau des signes d'échec**, là où le lecteur vient de lire dix lignes de « ça sent quoi » | §7, §8 point 1 |
| Génératrice : jamais dans un bâtiment, un garage ou sous un auvent | **Oui**, hors encadré, rattaché au cas réel : faire tourner le frigo pendant la saumure | §8, fin |
| Viande maigre seule = mal de caribou | **Non repris** | Sans objet : le chapitre ne porte pas sur la ration |
| Thuyone du cèdre | **Non repris** | Sans objet |

**Écart volontaire à signaler au vérificateur sécurité :** l'encadré DANGER compte **six
points**, ce qui est au-dessus de la moyenne du livre. Justification : le chapitre **envoie
activement** le lecteur manipuler du nitrite, immerger de la viande crue dans un milieu humide
et clos, et traiter de l'ours, du phoque et des abats. Retirer un point reviendrait à
l'autoriser en silence. À arbitrer par le rôle 4.

**Point de sécurité neuf, non couvert par le tableau de CLAUDE.md :** la **saumure d'injection
est beaucoup plus concentrée en nitrite que la saumure d'immersion** (≈ 1,15 g/kg contre
0,15 g/kg dans l'exemple du chapitre). Deux seaux non étiquetés le même jour, et quelqu'un
immerge une pièce dans la saumure d'injection. **Proposition à l'éditeur : ajouter cette ligne
au tableau de CLAUDE.md**, applicable aux ch. 63, 64, 65, 66.

---

## 5. Relecteur humain requis

**Oui. Obligatoire, marqué en tête du fichier chapitre.** Le chapitre 64 figure nommément à la
liste des chapitres à relecture humaine obligatoire de `CLAUDE.md` (« Saumure »).

**Relecteur principal : microbiologiste alimentaire ou technologue en sciences et technologie
des aliments**, avec pratique en salaison ou en charcuterie.

**Second avis : un inspecteur du MAPAQ**, sur la seule question du dosage du nitrite en
contexte domestique.

Les sept questions sont écrites à la section 10 du chapitre. **Les trois qui bloquent
l'impression :**

1. La formule de saumure d'équilibre et sa fraction aqueuse de 75 % (question n° 1). Si elle ne
   tient pas, **toute la section 5 tombe**.
2. Le calcul du nitrite ramené à la masse viande + saumure (question n° 2). La réglementation
   vise le produit de viande, pas le bain : il faut confirmer que l'approche conservatrice du
   chapitre est bien conservatrice.
3. Le rôle antibotulinique du nitrite (question n° 6). Le chapitre ne l'affirme nulle part faute
   de source. Si le relecteur en fournit une, **la section 9 doit être resserrée** : l'urgence
   sans nitrite devient un compromis plus lourd qu'écrit.

**Envoyer les chapitres 62, 63, 64 et 65 au même relecteur, en un seul envoi.** Ils partagent
les sources ACIA sur le nitrite, la règle du salpêtre et les mêmes pièges. Quatre envois
séparés produiront quatre réponses incohérentes.

---

## 6. Notes pour l'éditeur

1. **Deux pistes non explorées, faute de budget de recherche web.** (a) L'outil **Thermoguide+**
   du MAPAQ, qui réglerait le chiffre n° 5 et des trous des ch. 61, 63 et 66. (b) Les entrées
   **nitrate de sodium** et **nitrite de sodium** de la liste 11 de Santé Canada, non captées mot
   à mot (les entrées potassium le sont). Une session dédiée avec du budget règle les deux.
2. **Frontière à tenir avec le chapitre 62.** Le 62 porte le sel, ses types et le salpêtre. Le 64
   ne refait pas la théorie : il applique. Si le 62 se met à donner des formules de saumure, ou
   si le 64 se met à comparer des sels, c'est une redite de deux pages.
3. **Frontière à tenir avec le chapitre 77.** Le mot « saumure » désigne deux choses dans le
   livre : le bain salé pour la viande (ch. 64) et le bain salé de la lacto-fermentation des
   légumes (ch. 77). **Le glossaire doit trancher**, sinon un lecteur appliquera un pourcentage
   de l'un à l'autre.
4. **Le chapitre 65 doit trancher le nitrite obligatoire.** Le 64 lui renvoie explicitement et
   refuse de décider. Si le 65 renvoie au 64 en retour, le livre a un trou sur sa question la
   plus dangereuse. **À vérifier dès que le 65 est écrit.**
5. **Ligne à ajouter au tableau de sécurité de CLAUDE.md** : ne jamais préparer une saumure
   d'injection et une saumure d'immersion le même jour sans étiquette (voir section 4).
6. **Adresses à corriger** : la page des températures de cuisson en
   `.../conseils-generaux-salubrite-aliments/...` est **404** ; les adresses ACIA en
   `/plans-controle-preventif/...` répondent **410** pour le refroidissement et le traitement
   thermique. Passe de substitution à faire dans les fiches sources des chapitres antérieurs.
7. **Vague de travail.** Les images 64-04 (cœur gris) et 64-07 (saumure filante) sont des
   **photos de défaut** : elles ne se commandent pas, elles se guettent. Les inscrire au carnet
   de photos maintenant, même si le chapitre n'est mis en pages que plus tard.

## Notes retirées du chapitre — 23 septembre 2026

- En tête du chapitre, sous le titre du tome :

> ⚠ **RELECTURE HUMAINE EXTERNE OBLIGATOIRE — MICROBIOLOGISTE ALIMENTAIRE OU TECHNOLOGUE EN
> SCIENCES ET TECHNOLOGIE DES ALIMENTS, AVEC PRATIQUE EN SALAISON.**
> Ce chapitre ne part pas à l'impression sans cette relecture. Les points à faire trancher :
> le calcul du nitrite ramené à la masse viande + saumure, la formule de saumure d'équilibre et
> sa fraction aqueuse, les durées d'immersion par épaisseur, la variante d'urgence sans nitrite,
> et trois gestes de la section 9 : la concentration d'une saumure par le gel, la reprise du sel
> d'une saumure usée, et le dessalage d'une pièce en eau courante.

## Passe « pas de code légal, signes expliqués » — 23 septembre 2026

**Légal :** rien à retirer. Les 200 ppm de nitrite restent comme dose (mécanisme de la
méthémoglobine), pas comme règle.

**Note de bas de page ajoutée :**

- [^1] §5 étape 9, « aigreur à l'os » : elle se cherche au nez, avec une aiguille fine (d'os,
  qui retient l'odeur) poussée le long de l'os et dans l'articulation, puis sentie. Source :
  `sources/64-museo-prosciutto-parma-fibula.md` (Museo del Prosciutto di Parma, la fibule en os
  de cheval piquée à l'articulation « pour détecter la putréfaction », consultée le 2026-09-23).
  Les pages d'extension américaines (MSU, Missouri G2526, Virginia Tech 458-223, Kentucky
  ASC-213) ne parlent que de prévention ; FSIS *Hams and Food Safety* refusée (403). La
  description de l'odeur (sure, d'œuf pourri, d'égout) reprend le §7 du chapitre et porte
  `[À VÉRIFIER]`.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/64-verifications.md`. Douze drapeaux, douze appliqués, plus les notes A et C (phrases qui s'appuyaient sur les valeurs corrigées).

- §5 étape 4, fraction d'eau : **75 % (facteur 1,33) → orignal cru 73 % (facteur 1,37)** ; lièvre compté comme le lapin sauvage, 75,5 % (facteur 1,33). Corrigé. Recalculs : formule de l'étape 4 à 1,37 ; exemple 0,030 × 10,85 kg = **326 g** (au lieu de 320 g) ; étape 5 « environ 305 g de sel » (326 − 20,25 g de sel apportés par 21,6 g de poudre à 93,75 % de sel), « pas 326 g plus 21,6 g » ; §9 « Pour peser 326 g de sel : 326 mL d'eau ». `sources/64-sante-canada-fcen-eau-gibier.md` (+ `64-sante-canada-fcen-3577.json`, `-3579`, `-3587`, `-3595`)
- §5 étape 5, poudre de Prague : **6,25 % de nitrite** confirmé ; « sel nitrité » européen environ 0,6 %. `sources/64-acia-nitrites-poudre-de-prague.md` ; 0,6 % : `sources/64-fao-1991-staphylocoque-alteration-sel.md`, `sources/40-fao-1991-abattage-decoupe-transformation.md`
- §5 étape 8, durées d'immersion par épaisseur (phrase et tableau) : introuvables, coupées ; remplacées par le test de la tranche du centre contre la tranche du bord, et la règle « pièce très épaisse ou cuissot avec os : injecter ou désosser » sans seuil. Dépendances ajustées : §4 Matériel (seringue, « sous 10 cm » et « ~15 cm » retirés) ; §9 « La pièce épaisse sans seringue » (renvoi au tableau remplacé par « section 5, étape 8 »). Aucune source (pour mémoire : `sources/72-osu-pnw238-saumure-et-temperatures.md`, `sources/40-fao-1990-viande-sechee-lanieres.md`, `sources/63-acia-trichinella-salaison-sechage-fumage.md`).
- §5 étape 13, conservation : **pièce saumurée cuite, 3 à 4 jours au froid (≤ 4 °C), 2 à 3 mois au congélateur**, comptée comme un jambon cuit. `sources/45-sante-canada-wdfw-garde-volaille-au-frigo.md` (tableau : `sources/45-sante-canada-entreposage-securitaire-fr.html`, `-fr-texte.txt`)
- Note [^1], odeur de l'aigreur à l'os : **« sure, d'œuf pourri ou d'égout » → « sure ou désagréable »**, chair brunâtre autour des gros vaisseaux. Corrigé ; la ligne du §7 (« Odeur d'œuf pourri ou d'égout en piquant près de l'os ») devient « Odeur sure ou désagréable… ». `sources/64-fao-1991-staphylocoque-alteration-sel.md` ; geste de l'aiguille : `sources/64-museo-prosciutto-parma-fibula.md`
- §6, gain de masse à la sortie : sens confirmé (gain, pas perte), sans chiffre. `sources/64-fao-1991-staphylocoque-alteration-sel.md`
- §8 DANGER point 6 : **toxine du staphylocoque stable à la chaleur**, et pas d'odeur ni d'altération. Confirmé. `sources/64-fao-1991-staphylocoque-alteration-sel.md`
- §9, test de l'œuf ou de la pomme de terre : aucun barème, parenthèse retirée, phrase sans chiffre gardée. Aucune source.
- §9, la source : température introuvable pour la Côte-Nord ; mécanisme gardé (sol constant sous 5 à 6 m). `sources/63-cnrc-temperatures-du-sol-retard.md`
- §9, le lac : **« sous quelques mètres » → fond d'un lac profond autour de 4 °C l'été ; pas de fond froid sous 6 m ni dans un étang**. Corrigé ; la puce suivante dit maintenant que le banc de neige **et** le fond d'un lac profond donnent un chiffre. `sources/68-rappel-stratification-hypolimnion.md`
- §9, sel du fleuve : **27 g/L (estuaire maritime) à 29 g/L (golfe)**, moins en surface au printemps ; sous la saumure d'environ 4 % du chapitre. `sources/13-universite-laval-salinite-saint-laurent.md`

## Compression §3 et §4 — 27 septembre 2026 : 1174 mots → 222 mots ; matériel coupé : balance de précision à 0,1 g (fondue dans la balance au gramme), eau potable, poids d'immersion (→ §5 étape 7, §9), seringue à saumure (→ §5 étape 9, §9), gants jetables (tularémie → §8 hors encadré), ruban d'étiquetage (→ §5 étape 7, §9), contenant étiqueté du sel de salaison et paragraphe « salière » (confusion → §8 point 2). §3 : salpêtre déplacé en une phrase à §5 étape 5 ; fenêtre 100–200 ppm (§5, §6, §8), pH 4,6 / 5,3 et saumure saturée (§9) coupés.
