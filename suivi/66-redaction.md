> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 61. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 61, Pourquoi la viande pourrit

- **Fichier :** `chapitres/61-pourquoi-la-viande-pourrit.md`
- **Tome :** 4 — Conserver et réparer (chapitre d'ouverture du tome)
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (technique) et 4 (sécurité)
- **Ampleur :** ≈ 4 800 mots utiles (6 706 mots bruts, tableaux compris). Procédure numérotée
  en 28 étapes réparties en cinq blocs, sept tableaux, encadré DANGER à six points, variante
  d'urgence avec bilan de pertes.

---

## 0. Ce qu'il faut savoir avant de lire le reste

**Le budget de recherche web du poste était épuisé à l'ouverture** (200 appels `WebSearch` sur
200), comme aux ch. 36 et 47. Toute la documentation s'est faite par **récupération directe
d'URL** (`WebFetch`), en repartant des adresses déjà validées dans `/sources` par les chapitres
antérieurs et en descendant l'arbre de Québec.ca, de Canada.ca et d'inspection.canada.ca page
par page. Quinze pages officielles ont été ouvertes et archivées. Rien ne garantit qu'une
meilleure page n'existe ailleurs, mais la couverture des quatre organismes prioritaires (MAPAQ,
Santé Canada, ASPC, ACIA) est complète pour le sujet.

**Trouvaille de navigation à conserver pour tout le tome 4.** La section salubrité de Québec.ca
se structure ainsi, et les quatre branches utiles au tome 4 sont toutes sous
`/sante/alimentation/salubrite-aliments-prevention-risques/` :

```
/salubrite-aliments-domicile/conservation-aliments/
    temperatures-conservation · conseils-entreposage-securitaire · duree-conservation
/salubrite-aliments-domicile/preparation-aliments-cuisson-securitaires/
    precautions-manipule-aliments · cuisson-temperatures-internes ·
    conserves-maison · refroidir-rechauffer-decongeler-aliments
/salubrite-aliments-domicile/preparation-aliments-cuisson-securitaires/
    precautions-manipule-aliments/viande-gibier-sauvage-chasseurs
/etablissements-alimentaires/precautions-aliments-dangereux/poisson
```

Les pages **destinées aux établissements** (`/etablissements-alimentaires/`) sont nettement plus
techniques et plus chiffrées que celles destinées au domicile. C'est là que se trouvent les
mécanismes. Les ch. 62 à 73 devraient les ouvrir en premier.

**Deuxième trouvaille, pour les ch. 62 à 67 et 73.** Les fiches de **contrôles préventifs** de
l'ACIA sont la meilleure source chiffrée en français sur la microbiologie de la conservation de
la viande, et deux d'entre elles sont décisives :

```
inspection.canada.ca/fr/salubrite-alimentaire-lindustrie/plans-controle-preventif/
  controles-aliments/produits-viande/fermentes-secs      → aw, pH, degrés-heures, S. aureus
inspection.canada.ca/fr/controles-preventifs/produits-viande/
  refroidissement-traites-chaleur                        → paliers de refroidissement chiffrés
```

**Refus de captation à signaler à l'éditeur.** La page « Durée de conservation » du MAPAQ
(`/conservation-aliments/duree-conservation`) **n'a pas pu être reproduite intégralement** : la
récupération a été refusée au motif du droit d'auteur. La fiche
`sources/61-mapaq-conservation-duree-et-entreposage.md` consigne donc un relevé de faits, pas des
citations. Même limite qu'au ch. 47. Un poste humain doit ouvrir la page.

**Constat d'absence le plus important du chapitre, et il change la ligne éditoriale du tome 4.**
Le MAPAQ **ne publie aucune durée de conservation en jours dans le texte de ses pages** : tout
est renvoyé à l'outil interactif **Thermoguide+**. Le chapitre 61 n'écrit donc aucune durée en
jours, et il le dit à sa §2. **Décision à prendre par l'éditeur avant le ch. 62 :** soit un poste
ouvre Thermoguide+ et en archive les durées avec leur date, soit tout le tome 4 s'interdit
d'écrire « ça se garde X jours ». Les deux sont tenables ; l'entre-deux ne l'est pas.

---

## 1. Les chiffres marqués `[À VÉRIFIER]`

| # | Valeur ou affirmation | Où dans le chapitre | Pourquoi elle n'est pas ferme | Piste |
| --- | --- | --- | --- | --- |
| 1 | **L'autolyse** — les enzymes de l'animal continuent après la mort | §3, 1er mécanisme | **Aucune page officielle consultée ne décrit ce processus.** Le MAPAQ ne parle que de sa conséquence (éviscérer et refroidir vite). C'est un mécanisme de manuel, pas de ministère | Un manuel de technologie des viandes, ou un technologue en transformation alimentaire. **Priorité moyenne** : aucun chiffre n'en dépend, mais c'est le premier paragraphe du chapitre |
| 2 | **Le mécanisme chimique du rancissement** | §3, 3e mécanisme | L'ACIA nomme le défaut (« gras décomposé (rance) ») et **rien du mécanisme** : pas d'oxydation nommée, pas de rôle de l'air, de la lumière ou du métal | Même piste. Le chapitre affirme seulement que ni le sel, ni la fumée, ni le froid ne l'arrêtent — affirmation à faire valider |
| 3 | **La base de calcul du « 9 % de sel » (Santé Canada, méthode FO-38)** | §3, encadré sel | La page écrit « au moins neuf pour cent de sel, déterminé selon la méthode officielle FO-38 » et **ne dit pas « en phase aqueuse »** dans le texte capté. Vérifié par une requête ciblée | **Priorité haute.** Ouvrir la méthode FO-38. Un pourcentage de sel sans sa base est la faute la plus coûteuse possible dans le tome 4 |
| 4 | **La base de calcul du « 2,5 % de sel » (ACIA)** | §3, levier 5 | Même problème : « un minimum de 2.5% de sel », base non nommée | Même piste, même priorité. Concerne directement le ch. 63 et le ch. 65 |
| 5 | **Équivalence perte de poids ↔ activité de l'eau** | §5 étape 23, §6 | **Aucune source retrouvée.** Le chapitre écrit explicitement que la pesée suit une progression et ne prouve pas une aw | Littérature technique. **Priorité haute pour le ch. 63 et le ch. 66** : c'est la seule mesure qu'un chalet peut faire, et le livre vient de dire qu'elle ne prouve rien |
| 6 | **Les moments de relevé 30 min, 2 h, 8 h, 24 h** | §5 étape 13 et tableau de la §6 | Moments d'atelier, pas de source. Seule la cible de 24 h est du MAPAQ ; l'éviscération est prescrite « immédiatement », sans délai chiffré | À fixer à l'usage. Une fois mesurés au chalet, ils deviennent des chiffres du livre |
| 7 | **« Plus de rose au centre »** | §9 | **Aucune source.** Le chapitre le dit pour le démolir, pas pour l'utiliser | Aucune piste nécessaire. À garder tel quel |
| 8 | **Durée d'ébullition détruisant la toxine botulinique** | **Volontairement absente** | Valeur très répandue dans la littérature grand public, **non retrouvée sur une page officielle canadienne** au cours de ce travail. Elle n'est écrite nulle part dans le chapitre | **Question au vérificateur sécurité.** Soit on trouve la page de Santé Canada qui la porte, soit le livre continue de ne pas l'écrire. **Ne pas la réintroduire de mémoire** |
| 9 | **« Mortel en 2 à 3 semaines »** (mal de caribou, §8 point 5) | §8 | Chiffre repris du tableau de `CLAUDE.md` et du ch. 24, **pas recapté ici** | Ch. 24. Si le ch. 24 le révise, le ch. 61 suit |
| 10 | **74 °C appliqué au phoque** | §8 point 3, par renvoi | Santé Canada nomme le **morse**, pas le phoque. Le livre étend par cohérence avec le gros gibier marin | **Ch. 52 doit trancher et le marquer.** Le ch. 61 ne fait que signaler l'écart |

### Chiffres sourcés et fermes du chapitre — ne pas les rouvrir sans source contraire

**MAPAQ :** zone de danger **4 à 60 °C** · doublement possible **toutes les 15 minutes entre
35 et 45 °C** · **7 °C dans les 24 premières heures** pour une carcasse · **0 à 4 °C** au
transport et à l'entreposage · **-18 °C ou moins** au congélateur · **74 °C** à cœur pour le
gibier · **60 °C ou plus** au maintien au chaud · **21 °C ou moins** pour l'eau de décongélation ·
**14 jours** maximum pour le poisson fumé emballé.

**Santé Canada :** tableau complet des températures internes, dont **74 °C** pour tout le gibier
terrestre nommé, **82 °C** pour un oiseau entier, **70 °C** pour le poisson, **71 °C** pour le
bœuf et le porc hachés, **63 °C** et **77 °C** pour les coupes entières de bœuf · **3 °C**
(*C. botulinum* type E non protéolytique) et **10 °C** (protéolytique) · **pH 5,0** et **pH 4,6** ·
**aw 0,97** et **aw 0,94** · *Listeria monocytogenes* de **-0,4 à 45 °C**, **pH 4,4 ou plus**,
**aw 0,92 ou plus** · **70 °C pendant au moins 1 minute** contre les parasites · **-35 °C/15 h**
et **-20 °C/168 h** · **pH 4,6** frontière des aliments peu acides · **100 °C** au niveau de la
mer.

**ASPC :** botulisme alimentaire **de 12 à 72 h**, possiblement **dès 2 h** et **jusqu'à 8 jours**.

**ACIA :** **15,6 °C** seuil de *Staphylococcus aureus* · **pH 5,3** arrêt de *S. aureus* ·
définition des **degrés-heures** · limites de **665, 555 et 500 degrés-heures** · **aw ≤ 0,85** et
**aw ≤ 0,90 avec pH ≤ 5,3** · **100 ppm** de nitrite/nitrate avec **2,5 % de sel** · **200 ppm**
maximum, **120 ppm** pour le bacon de flanc · **6,25 %** de nitrite de sodium dans la Poudre de
Prague · **49 °C à 4 °C** pas plus de **20 h**, surface **49 °C à 20 °C** pas plus de **2 h** ·
trichinellose **de 5 à 15 jours**, cuisson « **au moins 71 °C** ».

**Aucune date de saison, aucune limite de prises, aucune zone, aucune durée de conservation en
jours** n'apparaît dans le chapitre. Vérifié ligne par ligne.

### Le conflit de chiffres que le chapitre traite au lieu de le gommer

**71 °C contre 74 °C.** L'ACIA écrit « au moins 71 °C » sur sa fiche trichinose ; le MAPAQ et
Santé Canada écrivent **74 °C** pour le gibier. Le chapitre garde 74 °C partout, valeur la plus
élevée et valeur québécoise, et explique en une phrase pourquoi les deux ne se contredisent pas.
**C'est la même paire de nombres qui a produit l'erreur du pilote du ch. 63**, et le tableau
complet de Santé Canada est reproduit au chapitre précisément pour montrer que 71 °C existe,
mais sur la ligne du bœuf haché et du porc, jamais sur celle du gibier. À faire respecter par
l'éditeur : **ce passage ne se coupe pas au montage.**

---

## 2. Images requises

Ce chapitre est un chapitre de principes : ses images doivent enseigner des **mécanismes**, pas
des gestes. Aucune ne dépend d'une saison de chasse, sauf 61-02 et 61-06.

| # | Format | Sujet | Cadrage demandé | Source |
| --- | --- | --- | --- | --- |
| 61-01 | **Pleine page** | **L'image clé du chapitre : le thermomètre des barrières.** Une seule échelle verticale de -20 °C à 100 °C, avec en bandes de couleur, à leur hauteur exacte : -18 °C (congélateur), -0,4 °C (*Listeria* pousse encore), 0–4 °C (viande fraîche), 3 °C (seuil *C. botulinum* type E), 4–60 °C (zone de danger), 15,6 °C (*S. aureus* et ses toxines), 35–45 °C (doublement aux 15 min), 70 / 74 / 82 °C (cuisson), 100 °C (eau bouillante) | Planche dessinée verticale, pleine hauteur de page. **Chaque valeur porte son organisme entre parenthèses, sur la planche elle-même** — l'image doit rester juste si elle est photocopiée seule et collée sur la porte du congélateur. Palette : froid en bleu, zone de danger en rouge, cuisson en gris chaud | À dessiner. **C'est l'image la plus utile de tout le tome 4** et elle doit être reprise en vignette dans les ch. 63 à 73 |
| 61-02 | **Demi-page** | **La courbe de refroidissement réelle d'une carcasse.** Graphique temps (0 à 36 h) × température à cœur de cuisse, avec la cible des 7 °C à 24 h tracée, et deux courbes : une carcasse entière et la même fractionnée en quartiers | Graphique tracé à partir de **relevés réels faits au chalet**, pas d'une courbe inventée. Tant que les relevés n'existent pas, **l'image n'est pas produite** : une courbe imaginaire dans un livre qui interdit les chiffres inventés serait une faute | Relevés de JP, première bête. Voir §5 étape 13 du chapitre |
| 61-03 | **Demi-page** | **Les six leviers en tableau visuel.** Une colonne par levier (froid, eau/aw, acide/pH, chaleur, nitrite, absence d'oxygène) avec son seuil publié et, sous chacune, le chapitre qui l'applique | Planche typographique, pas d'illustration. **Le sixième levier est encadré différemment des cinq autres** — c'est le seul qui augmente le risque, et l'image doit le dire sans légende | À dessiner |
| 61-04 | **Quart de page** | **Le carnet de bord d'une pièce, rempli.** Une page de carnet réelle : espèce, date et heure de mort, poids, trois relevés de température, heures cumulées, filière choisie | Photo à plat, lumière égale, écriture au crayon de plomb lisible. **Une vraie page remplie à la main**, pas un formulaire imprimé : l'image doit donner envie de faire pareil avec ce qu'on a | Photo de JP |
| 61-05 | **Quart de page** | **L'étalonnage du thermomètre.** Deux vignettes côte à côte : sonde dans un verre d'eau glacée affichant 0 °C, sonde dans l'eau bouillante affichant 100 °C | Macro sur l'afficheur, chiffres nets et lisibles. Même cadrage pour les deux | Photo de JP. **Se fait aujourd'hui, sans bête et sans saison** |
| 61-06 | **Quart de page** | **La carcasse ouverte et écartée en forêt.** Poitrine maintenue ouverte par des branches, bête suspendue, dégagée du sol | Plan large, au trois quarts arrière, avec le sol visible dans le cadre pour montrer qu'elle n'y touche pas. **Illustre trois consignes du MAPAQ d'un coup** | Photo de JP, prochaine bête |
| 61-07 | **Quart de page** | **Le geste qui se retourne : le sous-vide.** Une pièce de viande scellée sous vide, posée à côté d'un pot ouvert couvert d'un linge | Deux objets, un seul cadre, fond neutre. La légende porte le mécanisme ; l'image porte le contraste | Photo de JP ou planche |

**Note pour `images/credits.md` :** aucune image versée. Sept images à produire, toutes par JP ou
à dessiner. **61-01 est à faire faire en priorité et à traiter comme un élément de charte du
tome 4**, pas comme une illustration de chapitre. **Ne pas aller chercher sur le web un
diagramme de « zone de danger » tout fait** : ceux qui circulent sont américains, en °F, et
donnent des seuils qui ne sont pas ceux du MAPAQ.

**Liste de rappel :** 61-05 se prend aujourd'hui. 61-04 se prend au premier carnet rempli. 61-02
et 61-06 attendent la première bête.

---

## 3. Les trous de documentation

| Question | État | Qui tranche |
| --- | --- | --- |
| **La base de calcul des pourcentages de sel officiels** | **Non établie** pour les deux chiffres cités (9 % Santé Canada / méthode FO-38, 2,5 % ACIA). Le chapitre ne les convertit pas | **Question n° 1 au relecteur.** C'est le trou qui a le plus de conséquences en aval : ch. 62, 63, 64, 71 |
| **Perte de poids ↔ activité de l'eau** | **Aucune source.** Le chalet ne peut mesurer que le poids ; le livre publie des seuils d'aw | **Question n° 2.** Sans réponse, les ch. 63 et 66 donneront des procédures dont le critère de fin n'est pas rattachable à un seuil de sécurité |
| **Durée d'ébullition détruisant la toxine botulinique** | **Non retrouvée** sur une page officielle canadienne. Volontairement absente du chapitre | **Question n° 3 au vérificateur sécurité.** Trancher : on trouve la source, ou le livre continue de se taire |
| **L'autolyse et le rancissement** | **Mécanismes nommés, non sourcés** | Vérificateur technique. Décider si le livre assume l'aveu (comme la saignée du ch. 36) ou retire les passages |
| **Thermoguide+ du MAPAQ** | **Non ouvert.** C'est là que sont toutes les durées de conservation du ministère | **Décision éditoriale à prendre avant le ch. 62.** Voir §0 |
| **Le phoque et le 74 °C** | Santé Canada nomme le morse, pas le phoque | Ch. 52. Le ch. 61 signale l'écart, il ne le comble pas |
| **Paramètres de croissance de *Clostridium perfringens*** | La fiche de l'ACIA le nomme et donne une cible de croissance maximale, **pas ses seuils** de température, de pH ou d'aw | Faible priorité. Le chapitre ne publie aucun seuil pour cette espèce |
| **Le refroidissement d'une carcasse *non cuite*** | Les paliers chiffrés de l'ACIA visent des produits **traités à la chaleur**. Aucune source chiffrée retrouvée pour une carcasse fraîche, à part le « 7 °C en 24 h » du MAPAQ | Vérificateur technique : la juxtaposition des deux chiffres au §5 étape 28 est-elle assez clairement signalée comme deux contextes différents ? |

---

## 4. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 3 | Le froid lui-même — le levier n° 1 du chapitre est gratuit huit mois par année sur la Côte-Nord |
| 4 | Panne d'Hydro en janvier — contexte du point 6 de l'encadré DANGER |
| 7 | Enfants de 4 et 6 ans — forme infantile du botulisme, et le pot de sel nitrité rangé à côté du sel |
| 8, 85 | Le thermomètre à cadran mécanique appartient au stock permanent, pas à la liste de souhaits |
| 24 | **Mal de caribou.** Point 5 de l'encadré DANGER : le rancissement pousse à jeter le gras |
| 27, 31 | Soigner, et ce qu'on ne peut pas soigner — suite du botulisme et de la trichinellose |
| 34 | Calendrier de prélèvement — la §9 dit que la variante d'urgence fait passer l'hiver, pas l'année |
| 36 | Abattage, saignée, éviscération — **le chapitre 61 explique le pourquoi des gestes du ch. 36** |
| 37 à 40 | Découpe — fractionner est la seule variable de refroidissement qu'on contrôle |
| 41 | **Abats.** Cadmium des cervidés, et le fait que les abats s'altèrent en premier |
| 42 | Ce que personne ne garde |
| 44 | Lièvre d'Amérique, tularémie, gants |
| 48, 52 | Ours noir et phoque — trichinelle |
| 53, 54, 55 | Truite, omble, poisson du fleuve — *C. botulinum* type E est une affaire de poisson |
| 62 | **Le sel.** Le ch. 61 pose l'activité de l'eau, le ch. 62 dit ce qu'est le sel |
| 63, 64 | **Salaison à sec et saumure.** Les seuils d'aw et la convention de pourcentage viennent d'ici |
| 65, 66 | **Fumage à froid et à chaud.** Le seuil de 15,6 °C et le sort de *Listeria* au fumage à froid |
| 67 | Pemmican et graisses — le gras se fond et se garde à part |
| 68 | Froid naturel — le levier n° 1 en pratique |
| 69 | **Congélateur qui dégèle.** Point 6 de l'encadré DANGER |
| 70, 71, 72 | Poisson — les trois seuils de *C. botulinum* type E s'appliquent là |
| 73 | **Conserves.** pH 4,6, absence d'oxygène, conserve gonflée |
| 77 | Fermentation — le levier acide |
| 82 | Affûtage — parer au couteau propre plutôt que rincer |

**Renvois reçus attendus.** Les ch. 62 à 73 doivent tous pointer ici pour les seuils, au lieu de
les réécrire. Le ch. 36 doit pointer ici pour le mécanisme derrière le 7 °C. Le ch. 47 pointe
déjà ici (vérifié dans `suivi/47-redaction.md`). Le ch. 8 doit ajouter le thermomètre à cadran
mécanique et le carnet à sa liste.

---

## 5. Relecteur humain

**Non obligatoire** selon la liste de `CLAUDE.md` — le ch. 61 n'y figure pas.

**Requis quand même, et le chapitre le dit à sa §10.** Le motif n'est pas le risque propre de ce
chapitre : c'est qu'il **alimente en chiffres huit chapitres qui sont, eux, à relecture
obligatoire** (62, 63, 64, 65, 72, 73, 48, 52). Une erreur d'attribution de seuil ici se propage
dans tout le tome sans jamais être rattrapée, parce que les chapitres suivants citeront le ch. 61
et non la source.

**Profil demandé :** inspecteur du MAPAQ, technologue en transformation alimentaire ou
vétérinaire. **Une seule question à lui poser**, pour qu'elle reçoive une vraie réponse : *les
seuils d'aw et de pH de la §3 sont-ils correctement attribués à leur microorganisme et à leur
contexte d'origine ?* Les questions n° 1 et n° 2 de la §3 ci-dessus se posent au même
interlocuteur, dans le même appel.

---

## 6. Points à surveiller aux portes 3 et 4

**Vérificateur technique :**

- **Les seuils d'aw et de pH sont empruntés à des documents écrits pour le poisson fumé (Santé
  Canada) et pour les produits de viande fermentés en établissement inspecté (ACIA).** Le
  chapitre les présente comme des seuils de microbiologie générale. Est-ce défendable tel quel,
  ou faut-il une phrase de plus à chaque tableau ?
- **La définition des degrés-heures est empruntée à l'ACIA pour un usage que l'ACIA ne prévoit
  pas** (le principe d'accumulation appliqué à une carcasse). Le chapitre le dit deux fois et ne
  calcule rien. Est-ce assez visible ?
- Le §3 affirme que **ni le sel, ni la fumée, ni le froid n'arrêtent le rancissement**. Non
  sourcé. Tient-il ?
- Le §5 étape 28 met côte à côte une règle domestique du MAPAQ et une règle industrielle de
  l'ACIA. Le lecteur peut-il les confondre ?
- Le tableau de la §4 déclare l'aw-mètre « négociable » avec la mention qu'aucun chalet n'en a.
  Est-ce la bonne façon de dire qu'un seuil publié n'est pas mesurable chez le lecteur ?

**Vérificateur sécurité :**

- **L'encadré DANGER a six points**, chacun avec son mécanisme. Les deux candidats au retrait,
  s'il en faut un, sont le **n° 4 (cadmium)**, traité au fond au ch. 41, et le **n° 6
  (génératrice)**, traité au fond aux ch. 4 et 69. **Ils sont gardés pour deux raisons
  explicites :** le cadmium parce que les abats sont ce qui s'altère en premier et donc ce que
  ce chapitre pousse à traiter en premier ; la génératrice parce que le scénario du congélateur
  qui dégèle est nommé à la §2 et à la §9 et que c'est là que les gens meurent. **Décision à
  prendre, pas à repousser.**
- **Le point n° 1 est en premier volontairement** : c'est le seul danger du livre dont tous les
  signaux d'alerte habituels sont neutralisés, et le seul où un geste de conservation réputé
  propre (sceller) aggrave le risque.
- **Vérifier la formulation du 3 °C contre le 4 °C.** Le chapitre écrit qu'un frigo à la cible
  québécoise de 4 °C est au-dessus du seuil d'inhibition de *C. botulinum* type E. C'est exact et
  sourcé, mais le lecteur ne doit pas en conclure que le MAPAQ se trompe ni qu'il faut baisser
  son frigo sous 3 °C et s'estimer protégé. La phrase « ce n'est pas une contradiction entre
  ministères » suffit-elle ?
- **Vérifier que nulle part le chapitre ne laisse croire qu'une viande qui sent bon est sûre**,
  ni qu'une cuisson prolongée rattrape quoi que ce soit.
- **Vérifier l'absence de la durée d'ébullition antitoxine.** Elle a été volontairement omise
  (§1, chiffre n° 8). Si un poste la réintroduit sans source, c'est exactement l'erreur du
  pilote qui recommence.
- Les huit rappels du tableau de `CLAUDE.md` qui s'appliquent à ce chapitre y sont repris :
  74 °C, foie et reins de cervidés, trichinellose, tularémie, botulisme type E à 3 °C, botulisme
  sans signe, mal de caribou, génératrice. Seul le rappel de la thuyone du cèdre ne s'applique
  pas. Confirmer.

## Notes retirées du chapitre — 23 septembre 2026

- §2, « C'est un mauvais chapitre pour se rassurer » : « Il ne contient pas de durée de conservation en
  jours, pour une raison simple et vérifiée : **les pages de conservation du MAPAQ n'en publient
  pas dans leur texte** et renvoient toutes à l'outil Thermoguide+. Un chiffre du genre «la viande
  fraîche se garde X jours au frigo » n'existe pas dans ce livre tant que personne ne l'a ouvert et
  cité avec sa date. »
- §5, étape 24 : « Un thermomètre qui se trompe de 3 °C est exactement l'erreur du premier jet du
  chapitre pilote, en version matérielle. »
- §8, point 3 (provenance retirée du texte, gardée ici pour la traçabilité) : « L'ACIA écrit «au
  moins 71 °C » ; le MAPAQ et Santé Canada écrivent **74 °C** pour tout le gibier. Le livre garde
  **74 °C** partout, parce que c'est la valeur la plus élevée et qu'elle satisfait les deux. »

## Passe « ni municipal ni code légal » et notes de signes — 23 septembre 2026

**Retiré ou reformulé (point 1) :**

- §3, « Les barrières se combinent » : la citation « le respect rigoureux de la température de
  réfrigération prescrite (c.-à-d., égale ou inférieure à 4 °C) » devient « le froid, à 4 °C ou
  moins, «allié aux paramètres…» ». Le mot « prescrite » est parti ; le 4 °C reste.
- §3, « Le pourcentage de sel » : « déterminé selon la méthode officielle FO-38 » est retiré
  (numéro de méthode réglementaire, voir la ligne 61 de `doutes-passe-paperasse.md`). Remplacé par
  « mesuré sur le contenu de la boîte, en laboratoire », qui garde le seul fait utile : la base
  du 9 % n'est pas le poids de la chair. Provenance inchangée :
  `sources/61-sante-canada-poisson-fume-barrieres.md` (« le contenu contient au moins neuf pour
  cent de sel »).
- §5, étape 9 : « ce n'est pas un seuil légal » est retiré.
- §5, étape 28 : « la règle de l'industrie est que la température interne ne doit pas rester… —
  ce n'est pas une règle domestique » devient un fait : « dans l'industrie, un produit de viande
  cuit ne passe pas plus de 20 heures entre 49 °C et 4 °C à cœur ». Chiffres inchangés,
  `sources/61-acia-refroidissement-produits-viande.md`.

**Note de bas de page ajoutée (point 2) :**

- §7, `[^1]`, « odeur de sulfure d'hydrogène » : l'odeur d'œuf pourri, gaz sans couleur que le
  nez prend à très faible concentration. Source : fiche REPTOX de la CNESST, section « Hygiène
  et sécurité », rubrique « Apparence » — « un gaz incolore possédant, à très faible
  concentration, une odeur caractéristique d'oeufs pourris ». Page enregistrée :
  `sources/61-cnesst-reptox-sulfure-d-hydrogene-odeur.md` (consultée le 2026-09-23).

**Laissé tel quel :** « Organisation mondiale de la santé » dans la citation du cadmium (§8.4) —
c'est un étalon de comparaison, pas du légal ni du municipal. Les autres lignes 61 de
`doutes-passe-paperasse.md` ne touchent ni au légal ni à un signe non expliqué.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/61-verifications.md`, appliqués au chapitre.

- §3, autolyse — nom confirmé (dégradation par les enzymes propres de la bête ; le froid la ralentit, la cuisson les détruit) : `sources/61-fao-autolyse-enzymes-rancissement-viande.md`.
- §3, oxydation du gras — mécanisme confirmé (oxygène sur les acides gras insaturés, surface exposée, chaleur du fumage et du séchage, produits primaires stables au congélateur) ; aucun chiffre ajouté : `sources/61-fao-autolyse-enzymes-rancissement-viande.md`.
- §3, 9 % et 2,5 % de sel — confirmé : le 9 % est une teneur du produit fini, le 2,5 % ne nomme pas sa base : `sources/61-sante-canada-poisson-fume-barrieres.md`, `sources/61-acia-produits-viande-fermentes-secs.md`, `sources/12-quebec-poisson-fume-botulisme.md`.
- §4 (Matériel) et §9 (échelle de température), point d'ébullition — corrigé : il ne se perd pas, il baisse d'environ 1 °C par 300 m d'altitude, ± 0,8 °C selon la pression du jour au niveau de la mer : `sources/61-ucdavis-snyder-ebullition-altitude.md`.
- §4 (Aw-mètre), §5 étape 23, §6 ligne « Séchage » — confirmé : aucune conversion générale entre teneur en eau et aw ; même teneur en eau (~60 %), aw 0,82 contre 0,98 : `sources/61-clemson-activite-eau-teneur-eau.md`.
- §5 étape 13 et §6 lignes « Mort + 2 h » / « Mort + 8 h » — relevés de 2 h et 8 h sans cible publiée ; seule la cible de 24 h (7 °C) est sourcée : `sources/12-quebec-gibier-avis-chasseurs.md`, `sources/34-mapaq-gibier-sauvage-chasseurs.md`. La cible « Sortie de la plage 35–45 °C » de la ligne 8 h, sans source, devient « En descente depuis le relevé de 2 h ».
- §9, capturer la nuit — aucun gain chiffré publié ; le texte renvoie au thermomètre min-max du local, sans chiffre.
- §9, glacière — corrigé : 30 cm (12 po) de bran de scie sec dessous, autour et dessus ; jamais sur la terre nue ni avec du bran humide ; perte à la fonte d'au plus 30 % pour une glacière moyennement bonne, prévoir la moitié de plus que le besoin : `sources/61-usda-fb1078-glaciere-bran-de-scie.md`.
- §9, évaporation — corrigé : au moins 8 °C sous le maximum du jour par temps chaud et sec (plus de 25 °C, moins de 40 % d'humidité) ; ne tient pas une température soutenue sous 20 °C, donc pas la viande : `sources/61-mit-dlab-refroidissement-evaporation.md`.
- §9, séchage au grand froid — aucune durée publiée ; le texte renvoie à la pesée, sans chiffre.
- §9, test de l'œuf — aucune correspondance publiée avec un pourcentage ; phrase coupée (la suite le dit déjà).
- §9, lecture des 74 °C — confirmé : la couleur ne dit pas si la viande est cuite : `sources/61-sante-canada-guide-style-recettes-couleur.md`.
- §8 DANGER, point 5, mal de caribou — « deux à trois semaines » devient « quelques semaines » (décision prise pour tout le livre ; « several weeks » du récit de Stefansson, `sources/21-speth-spielmann-1983-stefansson-mal-de-caribou.md`).

Compression §3 et §4 — 27 septembre 2026 : 2515 mots → 196 mots ; matériel coupé : deuxième sonde, thermomètre de frigo et de congélateur (fondu dans le min-max), crayon gras, balance de 25 à 50 kg, gants, couteau, eau glacée et bouillante d'étalonnage, pH-mètre, aw-mètre. §3 coupé : autolyse et éviscération, oxydation, seuils d'aw et de pH, Listeria, Poudre de Prague, degrés-heures, 9 % et 2,5 % de sel. Déplacé : sac de plastique à défaut de gants (§5 étape 6), eau bouillante qui ne stérilise pas une viande peu acide (§5 étape 22), 70 °C tenus une minute contre les parasites du poisson (§5 étape 25), vieille recette au salpêtre qui ne se convertit pas (§9, renvoi « (§3) » retiré).
