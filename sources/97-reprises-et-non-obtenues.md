# Chapitre 97 — Sources reprises du dossier, et sources cherchées sans succès

Date : 27 septembre 2026.

---

## 1. Reprises (fiches déjà au dossier, relues, pas recaptées)

| Fiche | Ce que le ch. 97 en reprend | Où |
| --- | --- | --- |
| `34-eccc-normales-saison-sans-gel-cote-nord.md` | Normales 1981-2010 de Sept-Îles, Baie-Comeau, Natashquan : pour comparer avec 1991-2020 (fiche de suivi seulement) | Suivi |
| `35-usno-altitude-soleil-sept-iles-2026-*.html` | Hauteur du soleil à midi : 39,8° (20 mars), 63,2° (21 juin), 39,9° (22 sept.), 31,1° (15 oct.) — relue dans les HTML, voir `97-serre-solaire-masse-thermique.md` | §3, §5-F |
| `78-usda-nop-fumier-compost-delais.md` | Fumier cru : enfoui au moins 120 jours avant la récolte d'un légume dont la partie mangée touche la terre, 90 jours sinon ; compost en tas : 55 à 77 °C pendant 15 jours, retourné au moins 5 fois | §8, bloc 1 ; §5-B |
| `74-quebec-agriculture-urbaine-compost.md` | Proportion 2 parts de brun pour 1 part de vert (reprise via ch. 95) | §9 (couche sans fumier de cheval) |
| `74-rutgers-njaes-paillis-potager.md`, `74-unh-extension-paillis-moment.md` | Le paillis organique garde le sol froid au printemps ; le poser après la levée, sur sol réchauffé | §3, §5-D |
| `74-inspq-bois-traite-acc.md` | Aucun bois traité à l'ACC autour de ce qui se mange (reprise via ch. 95) | §4 |
| Ch. 101 §5-H (fiche 78 USDA) | Fumier de poule hors du composteur de cuisine, 120 / 90 jours | §5-B, §8 |
| `61-sante-canada-temperatures-cuisson-internes.md` | « Lavez votre thermomètre de cuisson à l'eau chaude savonneuse avant chaque utilisation » (ajout du 27 sept., après vérification) | §4 |
| `80-msss-tetanos.md`, `81-inspq-ciq-plaie-risque-tetanos.md` | Spores du tétanos dans la terre et les selles animales ; plaie souillée de selles ou de terre = plaie à risque (ajout du 27 sept.) | §8, bloc 5 |
| `45-sante-canada-plomb.md` | Jeune enfant : « Ingestion of non-food items containing lead (such as dust, lead-based paint, soil and products) » (ajout du 27 sept.) | §4 |
| `75-osa-guide-semences-2010-texte.txt` | « the hybrid tomato variety `Early Girl' » (l. 72-79) (ajout du 27 sept.) | §5-H |
| `08-nchfp-entreposage-conserves-maison.html`, `57-nchfp-marinades-vinaigre-acidite-texte.txt` | Index NCHFP : aucun procédé d'autoclave pour la courgette ni le concombre ; seulement des marinades (ajout du 27 sept.) | §8 bloc 3, §9 |
| `98-uaf-pommes-de-terre-alaska-texte.txt` (l. 373-378), via ch. 98 étape 15 | Défaner une à deux semaines avant la récolte pour durcir la pelure (ajout du 27 sept.) | §9 |

---

## 2. Cherchées, non obtenues

### 2.1 Normales de gel de Havre-Saint-Pierre — N'EXISTENT PAS

- Formulaire ECCC 1981-2010 : « No station names contain 'Havre' ». API GeoMet : six stations de
  Havre-Saint-Pierre, toutes `HAS_NORMALS_DATA = N`.
- **À la place :** Longue-Pointe-de-Mingan (normales 1991-2020, sans section « Frost-Free ») :
  jours de gel par mois et minimums. Le chapitre dit que c'est la station voisine.

### 2.2 Espace pour la vie (Jardin botanique de Montréal) — BLOQUÉ

- Pages visées : « Période de semis et de plantation », « Le B.A.-BA des semis », « Calendrier de
  semis de légumes ».
- `curl` : page Cloudflare « Just a moment… » ; outil de lecture web : HTTP 403. Seule la page
  « Semis d'intérieur : légumes et annuelles » est passée, et elle ne donne aucun chiffre.
- **À la place :** UMaine, bulletin #2751 (Maine, même fenêtre de dernier gel que la Côte-Nord).

### 2.3 University of Minnesota Extension — BLOQUÉE

- « How and when to start your seeds », « Planting the vegetable garden » : « Access denied ».

### 2.4 University of Missouri G6965 — NON ENREGISTRABLE

- HTTP 403 à `curl` et dans l'Internet Archive. Lue par l'outil de lecture web ; extraits dans
  `97-unl-mu-couches-chaudes-et-chassis.md`. **À recapter dans un navigateur.**

### 2.5 Couche chaude sans fumier de cheval — AUCUNE SOURCE OFFICIELLE

- Recherche : couche chaude au fumier de poule, au gazon coupé, au compost. Seuls résultats :
  couvoir commercial (Meyer Hatchery), blogues de jardinage, forum Permies. Ils donnent tous des
  températures (55 à 70 °C en 24 à 36 h, semer à 24 °C) et un mélange « 1 part de fientes pour 2
  à 3 parts de paille » qu'aucune source officielle ne recoupe. **Non retenus.**
- **À la place :** le chapitre transpose le principe des deux sources officielles (matière
  fraîche, tas assez gros, retourner quand il chauffe, semer quand le thermomètre redescend) et
  le mélange du compost domestique (2 bruns pour 1 vert). La transposition est marquée
  `[À VÉRIFIER]` dans le texte.

### 2.6 Volume d'eau par mètre carré de vitrage dans une serre solaire — AUCUNE SOURCE OFFICIELLE

- Les règles qui circulent (« 2 à 5 gallons par pied carré de vitrage ») viennent de fabricants
  de serres et de blogues. Le bulletin du DOE dit seulement « as many […] drums as your space will
  comfortably allow ». **Aucun ratio publié dans le livre.**

### 2.7 Durée utile d'une couche chaude — NON PUBLIÉE

- Ni 1845, ni 1952, ni UNL, ni MU ne disent combien de semaines une couche reste chaude. 1845
  donne le coup de feu (5 à 6 jours) et dit qu'un mélange de vieux et de neuf « se conserve plus
  longtemps ». Le chapitre ne chiffre pas la durée ; il donne le moyen de la rallonger (réchaud).

### 2.8 Écart de température entre 1,5 m et le ras du sol par nuit claire — NON CHIFFRÉ

- La FAO décrit l'inversion (air plus froid en bas) sans donner d'écart à ces hauteurs. Le
  chapitre dit le sens, pas la grandeur.

### 2.9 Prévision du minimum de la nuit sans instrument — NON TRANSPOSABLE

- Les modèles de la FAO demandent la température et le point de rosée deux heures après le
  coucher du soleil et une calibration sur plusieurs nuits notées. C'est un registre : exclu
  (règle de JP, pas de paperasse). Le chapitre donne une règle de décision sans seuil.

### 2.10 Statut hybride (F1) de 'Tokyo Cross', 'Gold Rush', 'Melody', 'Black Jack' — NON CHERCHÉ

- Demandé par le vérificateur technique le 27 septembre 2026. La page UAF ne marque « Hybrid »
  que 'Golden Acre' ; la fiche OSA confirme 'Early Girl'. Pour les autres, la recherche web n'a
  pas pu se faire (quota de recherche de la session épuisé).
- **À la place :** le texte marque ces trois variétés `[À VÉRIFIER : au sachet]` et limite
  l'étape 48 aux variétés à pollinisation libre. À lever avec une page de semencier ou d'All-America
  Selections, enregistrée ici.
