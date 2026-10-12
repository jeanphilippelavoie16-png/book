> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 46. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 46, Castor

- **Fichier :** `chapitres/46-castor.md`
- **Tome :** 3 — Prélever
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (technique) et 4 (sécurité)
- **Ampleur :** ≈ 5 000 mots utiles (6 470 mots bruts, tableaux compris). Procédure numérotée
  en 23 étapes, quatre tableaux, encadré DANGER à six points, variante d'urgence en six volets
  avec pertes nommées.
- **Note du plan :** « Giardia ». Traitée en profondeur aux §3, §5 (étape 21), §6, §7 et §8.

---

## 0. Ce qu'il faut savoir avant de lire le reste

**Le budget de recherche web du poste était déjà épuisé au démarrage** (200 appels `WebSearch`
sur 200, même situation qu'au ch. 36). Toute la documentation a donc été faite par
**récupération directe d'URL** (`WebFetch`), en partant de la carte de navigation laissée par la
fiche du ch. 36 et en descendant l'arbre de Québec.ca page par page. Les sources trouvées sont
bonnes ; **rien ne garantit qu'une meilleure page n'existe pas ailleurs**.

**Correction d'arborescence à diffuser aux ch. 47, 49, 51.** Le piégeage est sous
`/tourisme-loisirs-sport/activites-sportives-et-de-plein-air/piegeage/…`, **pas** sous
`/tourisme-et-loisirs/…`. L'adresse d'accueil en `/tourisme-et-loisirs/` répond encore, mais
**tous** ses liens internes pointent vers l'autre. Partir de la mauvaise fait répondre 404 à
chaque sous-page.

**Confirmation de la carte du ch. 36.** Le chemin
`…/sante-animale/maladies-animales/liste-maladies-animales/<maladie>` tient toujours le
2026-09-20 : `tularemie`, `echinococcose` et `rage-chez-les-animaux` répondent tous les trois.

**Gain pour le reste du livre — deux captations neuves sur des pages déjà au dossier.**
La page tularémie du Québec, déjà utilisée au ch. 36, a livré cette fois **deux éléments jamais
captés** : le délai d'apparition des symptômes (3 à 5 jours, parfois jusqu'à 14) et la consigne
d'eau en forêt (bouillie cinq minutes). La page MAPAQ a livré une phrase nouvelle également :
« Il est recommandé de toujours porter des gants à usage unique lorsqu'on dépouille ou éviscère
un animal », formulée pour **un animal** et non pour le gros gibier. **Les ch. 44, 47, 49, 50 et
51 doivent repartir de `sources/46-quebec-tularemie.md` et `sources/46-mapaq-gibier-sauvage-chasseurs.md`,
pas des fiches antérieures.**

**Trouvaille capitale pour toute la série des fiches d'espèce.** La page de Santé Canada sur les
températures de cuisson contient une ligne « Small game, for example, beaver, muskrat, hare —
74°C », c'est-à-dire **la seule ligne officielle du dossier qui nomme des espèces de petit
gibier**. Elle couvre d'un coup les ch. 44 (lièvre), 46 (castor) et 49 (rat musqué). Elle est
enregistrée dans `sources/46-sante-canada-temperatures-cuisson-petit-gibier.md`.

---

## 1. Les chiffres marqués `[À VÉRIFIER]`

| # | Valeur | Où dans le chapitre | Pourquoi elle n'est pas sourcée | Piste |
| --- | --- | --- | --- | --- |
| 1 | **Rendement en viande utilisable d'un castor de 20 kg** | §5, étape 16 | Aucune page officielle consultée ne donne de rendement en viande pour le castor. Le chapitre donne la masse vive (16 à 32 kg, sourcée) et s'arrête là | Mesure de JP : peser les cinq morceaux à la balance à ressort, une fois, et le livre a son chiffre à lui. **C'est la piste la plus rapide et la plus solide** |
| 2 | **Température et durée de l'échaudage de la queue** | §5, étape 12 | Geste de pratique. Aucune source officielle ne décrit la préparation du castor | Piégeur d'expérience. Ou mesure au chalet : thermomètre dans le seau, chronomètre, une fois |
| 3 | **Teneur en cadmium des abats de castor** | §5, étape 18 | L'interdiction du MAPAQ vise **les cervidés**. Rien n'a été trouvé sur les rongeurs, ni dans un sens ni dans l'autre. Le chapitre ne l'étend donc pas, et ne rassure pas non plus | MELCCFP, ou INSPQ, ou vétérinaire de la faune. **Priorité moyenne** : le chapitre tient sans, parce qu'il applique la règle générale d'apparence anormale |
| 4 | **Conservation et préparation du castoréum comme leurre** | §5, étape 11 | La réglementation autorise « un appât ou un leurre » sans dire lequel ni comment le préparer | Piégeur d'expérience. Aucune urgence : le chapitre ne dépend pas de cette réponse |
| 5 | **Corde de sécurité de 15 m sur la glace** | §4, tableau du matériel | Valeur d'atelier, pas une valeur publiée. La Société de sauvetage nomme la corde sans donner de longueur | À fixer à l'usage. Une fois mesurée, elle cesse d'être `[À VÉRIFIER]` et devient un chiffre du livre |

**Chiffres sourcés et fermes du chapitre** (ne pas les rouvrir sans source contraire) :
**74 °C** à cœur, castor nommé (Santé Canada) et gibier en général (MAPAQ) · **0 à 4 °C** au
réfrigérateur et **-18 °C ou moins** au congélateur (MAPAQ) · **16 à 32 kg** et queue de
**30 × 18 × 4 cm** (Faune et flore du pays) · duvet **2 cm**, jarres **7 cm** (idem) · **3 à 5
jours, jusqu'à 14** pour la tularémie (Québec) · **5 minutes** d'ébullition en forêt (Québec) ·
**10 kystes** de dose infectante, kyste de **8 × 14 μm**, incubation de **3 à 25 jours**
(médiane 7 à 10), CT **< 12** à 25 °C contre **65 à 360** à 3-5 °C, filtration **1 μm**
(INSPQ) · **10 cm** et **12 cm** de glace (Société de sauvetage) · principe **1-10-1** et
hypothermie sous **35 °C** (Transports Canada) · lavage de plaie **10 à 15 minutes**, **811**,
**1 877 346-6763** (Québec) · **1 minute** d'ébullition ordinaire, citée pour nommer l'écart
(INSPQ).

**Aucune date de saison, aucune limite de prises, aucune unité de gestion n'apparaît dans le
chapitre.** Vérifié ligne par ligne. Les pages `periodes-piegeage` et `cartes-ugaf` ont été
délibérément **non citées** : ce sont exactement celles qui portent des dates.

---

## 2. Les deux écarts entre sources officielles — décisions à confirmer

| Écart | Valeurs | Décision prise au chapitre | Qui confirme |
| --- | --- | --- | --- |
| **Cuisson du gibier** | ACIA : 71 °C · Santé Canada et MAPAQ : 74 °C | **74 °C.** Valeur la plus haute, valeur de `CLAUDE.md`, et seule des trois qui nomme le castor. L'écart est nommé à la §10, pas masqué | Vérificateur technique. **Reprise de la décision déjà prise au ch. 40** — cohérence à maintenir |
| **Durée d'ébullition** | Québec, fiche tularémie : **5 minutes** en forêt · INSPQ et Santé Canada : **1 minute** à gros bouillons | **5 minutes au bord d'un étang à castors**, 1 minute au ch. 13 pour l'eau du chalet. Les deux chapitres doivent **dire** qu'ils ne donnent pas la même valeur, sinon ils se contredisent en silence | **Vérificateur technique, en priorité.** C'est un écart nouveau, apparu avec ce chapitre, et il touche un chapitre déjà écrit (le 13) |

Le second point demande peut-être une retouche au ch. 13. **À faire trancher par l'éditeur avant
la mise en pages**, pas après.

---

## 3. Images requises

| # | Format | Sujet | Cadrage demandé | Source |
| --- | --- | --- | --- | --- |
| 46-01 | **Pleine page** | **L'image clé du chapitre.** Le castor entier posé sur la neige, sur le dos, avant tout travail, à côté d'un objet d'échelle | Plongée verticale, l'animal remplissant le cadre sur toute la hauteur. Lumière de jour, sans flash. **Un couteau ou une règle en travers du bas du cadre sert d'échelle** — le lecteur n'a aucune idée de la taille d'un castor de 25 kg | Photo de JP, à la ligne de trappe |
| 46-02 | **Demi-page** | Planche dessinée : la zone des glandes vue de dessous, glandes à huile et sacs de castoréum repérés, avec **la ligne d'incision qui les contourne** tracée en rouge | Planche à dessiner, pas une photo : sur une photo de terrain, ces glandes ne se distinguent pas du reste. **C'est l'image la plus utile du chapitre** — c'est le geste qui décide du goût de tout l'animal | À dessiner |
| 46-03 | **Demi-page** | Séquence du dépouillement ouvert en quatre vignettes : incision médiane, traction de la peau, contournement de la zone des glandes, peau dégagée entière | Même cadre, même distance, même angle pour les quatre. Serré sur les mains. **Gants jetables visibles sur toutes les vignettes** — la photo enseigne la règle de la §8 sans la répéter | Photo de JP |
| 46-04 | **Quart de page** | La queue, avant et après retrait de la peau écailleuse, côte à côte | Deux cadres identiques, fond neutre, règle graduée dans le champ. Sert aussi au ch. 67 | Photo de JP |
| 46-05 | **Quart de page** | La nappe de gras sous-cutané levée à la main, séparée de la viande, dans son sac | Plongée à 45°, gras clairement distinct de la viande dans le cadre. **C'est la réponse visuelle au ch. 24** — la publier aussi là | Photo de JP |
| 46-06 | **Quart de page** | Sonde du thermomètre au centre d'une cuisse arrière cuite, afficheur lisible à **74 °C** | Macro sur l'afficheur, viande nette en second plan. **Le chiffre doit être lisible à l'impression** : c'est le seul chiffre du chapitre qui tue s'il est manqué | Photo de JP |
| 46-07 | **Quart de page** | Les cinq morceaux du débitage alignés et étiquetés : deux cuisses arrière, deux épaules, dos et côtes | Plongée verticale, fond uni, étiquettes lisibles, objet d'échelle | Photo de JP |
| 46-08 | **Demi-page** | Planche dessinée : coupe de l'étang en hiver — hutte, réserve immergée, déversoir, **et les deux zones de glace amincie marquées en rouge** | Planche à dessiner. Les deux zones rouges sont exactement les deux endroits où on pose les pièges. **C'est l'encadré DANGER rendu en image** | À dessiner |
| 46-09 | **Quart de page** | Les pics à glace portés **au cou, par-dessus le manteau**, sur une personne habillée pour la ligne de trappe | Buste, de face. L'erreur à contredire est visuelle : tout le monde les range dans un sac | Photo de JP |

**Note pour `images/credits.md` :** aucune image versée. Sept photos de JP, deux planches à
dessiner. Les photos 46-01 à 46-07 et 46-09 se prennent toutes **le même jour**, à la première
prise de la saison — une seule sortie suffit, contrairement à la fenêtre d'octobre du ch. 36.

---

## 4. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 3 | Le froid lui-même — immersion, hypothermie, mains qui ne ferment plus |
| 7 | Des enfants de 4 et 6 ans — la giardiase est grave chez eux avant de l'être chez l'adulte |
| 13 | Eau : puiser, filtrer, désinfecter. **Renvoi à double sens : l'écart 1 minute / 5 minutes doit être réglé dans les deux chapitres** |
| 20 | Se déplacer — glace, motoneige, épaisseurs |
| 24 | Le mal de caribou — le castor est la seule viande sauvage d'hiver qui arrive avec son remède |
| 27 | Soigner quand il n'y a personne — réhydratation, plaie, fièvre après manipulation |
| 29 | Bâtir la pharmacie — ce qu'il faut avoir pour une plaie reçue sur une carcasse |
| 41 | Abats et organes — le foie, les kystes, la règle du cadmium et sa limite aux cervidés |
| 42 | Ce que personne ne garde — où porter les restes, et pourquoi loin de l'eau |
| 44 | Lièvre — même tularémie, même 74 °C, même ligne de Santé Canada |
| 48 | Ours noir — pour dire que le castor n'hérite **pas** de l'encadré trichinellose |
| 49 | Rat musqué — même étang, même giardia, même tularémie, même température |
| 52 | Phoque — même remarque que pour l'ours |
| 61 | Pourquoi la viande pourrit — le mécanisme derrière le 0 à 4 °C |
| 63, 64 | Salaison à sec et saumure — **les pourcentages de sel sont là, pas ici**. Mention du salpêtre et de sa forme moderne, sans quantité |
| 65, 66 | Fumage à froid, fumage à chaud et séchage |
| 67 | Pemmican et graisses — **destination obligatoire du gras et de la queue** |
| 68 | Froid naturel — la variante d'urgence du refroidissement |
| 69 | Un congélateur plein qui dégèle |
| 79 | De la peau au cuir — la peau se tend en rond, pas sur une planche |
| 82 | Affûter — une lame émoussée force, dérape et perce une glande |

**Renvois reçus attendus :** le ch. 34 (calendrier annuel) doit pointer vers ce chapitre pour la
période froide. Le ch. 24 doit pointer ici pour la source de gras hivernale. Le ch. 13 doit
recevoir la mention de l'écart d'ébullition.

---

## 5. Relecteur humain

**Non obligatoire** selon la liste de `CLAUDE.md` — le ch. 46 n'y figure pas.

**Recommandé**, et le chapitre le dit à sa §10 : un **technicien de la faune du MELCCFP** ou un
**piégeur d'expérience titulaire du certificat**, sur trois points seulement :

1. **Le retrait des glandes** (§5, étapes 9 et 11) et le dépouillement ouvert (étape 10). Aucune
   source officielle ne décrit la préparation du castor. C'est écrit comme de la pratique, et
   c'est présenté comme tel, mais ça reste le cœur technique du chapitre.
2. **La conduite à tenir devant un foie porteur de kystes** (§5 étape 18, §7). C'est la même
   question que celle restée ouverte au ch. 36, et elle se repose ici parce que le foie de castor
   est un organe que le lecteur voudra garder.
3. **Le choix de cinq minutes d'ébullition** contre la minute du ch. 13. Décision éditoriale sur
   un écart entre deux organismes officiels.

---

## 6. Points à surveiller aux portes 3 et 4

**Vérificateur technique :**
- Les citations de Santé Canada sont **en anglais**, l'adresse française répondant 404 depuis le
  ch. 4. La ligne « Small game, for example, beaver, muskrat, hare — 74°C » est-elle reproduite
  exactement, et la traduction donnée dans le texte est-elle fidèle ?
- *Faune et flore du pays* n'est pas une source ministérielle. Son nom apparaît dans le texte à
  chaque chiffre qu'elle porte. **Est-ce suffisant, ou faut-il chercher plus haut ?** Cinq
  chiffres du chapitre en dépendent.
- La page échinococcose nomme « les rongeurs » et jamais le castor. Le chapitre écrit « le
  castor est le plus gros rongeur d'Amérique du Nord » pour faire le pont. **Ce pont est-il
  légitime, ou est-ce une extrapolation ?**
- La page rage ne nomme pas le castor non plus, seulement « tous les mammifères ». Même question.
- L'étape 14 applique au castor une consigne du MAPAQ (« ne rincez pas la carcasse ») écrite pour
  le gros gibier en forêt, sur un animal qui **sort de l'eau**. Le chapitre assume la tension et
  l'explique. À valider.

**Vérificateur sécurité :**
- **L'encadré DANGER a six points. La glace est en premier, volontairement** : c'est le seul
  danger du chapitre qui tue le jour même. Vérifier que l'ordre n'a pas été inversé à l'édition.
- **La giardiase est dans l'encadré alors qu'elle ne tue pas un adulte en santé.** C'est une
  décision assumée : le mécanisme donné est la déshydratation d'un enfant de quatre ans dans un
  chalet hors réseau sans route. **Si un point doit sauter de l'encadré pour éviter la dilution,
  c'est celui-là** — mais alors le chapitre perd le sujet que le suivi maître lui avait assigné.
  Décision à prendre, pas à repousser.
- Vérifier que la **tularémie** donne bien son mécanisme (le contact suffit, la peau gercée est
  une porte) et pas seulement son nom.
- Le chapitre répète **quatre** règles du tableau de `CLAUDE.md` : cuisson à 74 °C, gants
  obligatoires à la manipulation, viande maigre seule et mal de caribou (par la négative — le
  castor est gras), et le cadmium des cervidés (par la limite — la règle ne couvre pas le
  castor). Vérifier qu'aucune n'a été affaiblie en chemin.
- La §9 dit noir sur blanc qu'**il n'existe pas de substitut fiable au thermomètre**. C'est la
  phrase la plus importante de la variante d'urgence. Elle ne doit pas être adoucie à l'édition.

## Notes retirées du chapitre — 23 septembre 2026

- §3, avant la citation sur l'ours : « Aucune source consultée n'associe *Trichinella* au
  castor, alors que l'ours est nommé explicitement ». Le chapitre dit maintenant « Rien ne
  rattache *Trichinella* au castor » : la réserve sur l'étendue des sources consultées ne vit
  plus qu'ici. À confirmer par le vérificateur sécurité.

## Passe « pas de code légal » et notes de bas de page — 23 septembre 2026

**Retiré du chapitre (légal) :**
- §5, en tête de procédure : « Le piégeage est réglementé au Québec. Périodes, engins et
  permis se lisent pour l'année en cours : une date recopiée dans un livre est fausse dès
  l'année suivante. » Coupé en entier, aucun mécanisme derrière.
- §5, étape 20 : « Pour un avis d'ébullition ordinaire » devient « Pour une eau douteuse
  ordinaire ». L'avis d'ébullition est l'avis de la municipalité ; le chiffre (« au moins
  1 minute » à gros bouillons) et sa source ne changent pas.
- Gardés : Info-Santé 811 et la ligne rage (services qu'on appelle), « c'est la durée
  prescrite » à l'étape 22 (consigne de santé, pas de loi).

**Notes de bas de page ajoutées :**
- [^1] §5, étape 8, glandes à huile et sacs de castoréum : où ils sont et à quoi ils
  ressemblent. Sources : `sources/46-gtno-retirer-glandes-castoreum.md` (5 cm au-dessus de
  l'anus, membrane de muscle rose ou rouge, brun clair et écailleux, glandes sébacées laissées
  sur la carcasse), `sources/46-mffp-glandes-castor-tondreux-huileux.md` (deux paires près de
  l'anus, huileux plus petits), `sources/46-fur-harvesters-castoreum.md` (un de chaque côté ;
  source d'industrie). « Plus près de l'orifice » pour les glandes à huile est lu sur le schéma
  des T.N.-O., pas dans une phrase. Ce qu'on sent **à la palpation à travers la peau** n'est
  décrit par aucune source trouvée : la note dit où chercher, pas ce que le doigt sent.
- [^2] §7, « viande poissante au toucher ». Source : `sources/46-penn-state-viande-alteree.md`
  (« sticky or slimy », odeur et couleur inhabituelles). Aucune page québécoise ou canadienne
  ne décrit la texture ; les pages FSIS ont répondu 403. « Là où une viande saine est seulement
  humide » est une contre-description sans source.
- [^3] §7, « foyers blanchâtres au foie ou à la rate » et ganglions gonflés. Sources reprises :
  `sources/49-melccfp-tularemie-fiche-information.md`, `sources/44-quebec-tularemie-maladies-animales.md`
  (voir `sources/46-reprises-sources-deja-enregistrees.md`). Le fait que la bête paraisse « en
  bon état de chair » est de la fiche du MELCCFP.

**Piste trouvée en passant, hors mandat :** la page MFFP des glandes donne une recette de leurre
au castoréum (voir `sources/46-mffp-glandes-castor-tondreux-huileux.md`). Elle comble peut-être
le `[À VÉRIFIER : conservation et préparation du castoréum]` de l'étape 10. Non appliqué.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/46-verifications.md` (6 drapeaux : 4 levés, 2 introuvables).
Plus aucun `[À VÉRIFIER]` dans le chapitre.

- §4 matériel — ligne d'attrape flottante **d'au moins 15 m, d'un seul tenant** : **confirmé**,
  `sources/46-transports-canada-tp511-ligne-attrape.md`.
- §5 étape 10 — séchage du castoréum **15 à 21 °C**, environ **sept jours**, ouvert au 2ᵉ jour,
  retourné aux 4ᵉ et 6ᵉ, gardé au froid en sac de papier ou à mailles, jamais en plastique :
  **valeur fournie**, `sources/46-gtno-retirer-glandes-castoreum.md` (le séchage vise les sacs de
  castoréum ; les glandes à huile restent sur la carcasse, d'où « sacs de castoréum » dans le
  texte). Leurre : tondreux gelés, hachés, **volume égal d'huile minérale**, contenu des huileux,
  pot fermé : **valeur fournie**, `sources/46-mffp-glandes-castor-tondreux-huileux.md`.
- §5 étape 11 — température et durée d'échaudage de la queue : **introuvable**, drapeau coupé,
  critère visible gardé (la peau se décolle). `sources/46-hww-castor-biologie.md` (muet).
- §5 étape 15 — rendement : **20 kg → environ 10 kg à manger** (viande, gras et abats
  ensemble) : **valeur fournie**, `sources/46-gaudzinski-2023-rendement-castor.md` (+ `.xml`).
- §5 étape 17 — cadmium : reins **1,4 à 10 mg/kg** (poids frais, loin des usines), foie **0,2 à
  1 mg/kg**, davantage chez l'adulte ; reins d'orignal de comparaison **12,7 et 21,9 mg/kg**,
  arrondis à 13 à 22 ; tremble et saule en sol acide : **valeur fournie**,
  `sources/46-cadmium-reins-foie-castor.md` (+ `.xml`, `.txt`, deux `.html`). Conséquence : les
  reins du castor ne se mangent pas. Le tableau des points de contrôle (§6, ligne « Au foie et aux
  reins ») s'appuyait sur l'ancienne règle, qui laissait passer un rein d'aspect normal : ligne
  ramenée au foie, avec renvoi à l'étape 17 pour les reins.
- §9 collet de noyade — diamètre de boucle, hauteur au-dessus du fond, masse du lest :
  **introuvables**, drapeau coupé ; réglage dit par la fonction (la tête entre sans toucher le
  câble, ancrage que la bête ne remonte pas). Aucune source nouvelle.

Compression §3 et §4 — 27 septembre 2026 : 1467 mots → 215 mots (§3 : 722 → 112 ; §4 : 745 → 103) ; matériel coupé : sifflet et perche (restent nommés aux étapes 1 et 2), gants jetables (étape 3, §8, §9), lunettes, masque et tablier (§9), couteaux et pierre à aiguiser, chaudron à couvercle, filtre 1 μm (§8), traîneau, sacs à gras, contenant à glandes, eau et savon (étapes 20 et 22), paragraphe de fin (renvoi ch. 00b). §3 : exemples, citations et chiffres de Giardia, du chlore froid et des délais d'incubation coupés (déjà en §7 et §8). Rien à déplacer, aucune note ni renvoi touché.
