> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 48. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 48, Ours noir

- **Fichier :** `chapitres/48-ours-noir.md`
- **Tome :** 3 — Prélever
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (technique), 4 (sécurité) et de la
  **relecture humaine externe obligatoire**
- **Ampleur :** ≈ 4 700 mots utiles (6 135 mots bruts, tableaux compris). Procédure numérotée
  en 33 étapes réparties en six blocs, quatre tableaux de contrôle, encadré DANGER à quatre
  points, variante d'urgence à cinq volets.
- **Note du suivi maître :** « ⚠ Trichinellose — 74 °C ». Traitée comme l'axe entier du
  chapitre, pas comme un avertissement ajouté à la fin.

---

## 0. Ce qu'il faut savoir avant de lire le reste

**Le budget de recherche web du poste était épuisé au premier appel** (200 `WebSearch` sur 200).
Toute la documentation a été faite par **récupération directe d'URL** (`WebFetch`), en partant
des adresses déjà validées aux dossiers des ch. 24, 36, 37, 41 et 43. Conséquence honnête :
les sources trouvées sont bonnes, **rien ne garantit qu'une meilleure page n'existe pas
ailleurs**, en particulier sur la prévalence de *Trichinella* chez l'ours noir au Québec et sur
le rendu du gras animal. Un poste avec du budget doit refaire une passe sur ces deux sujets.

**Trois adresses ont répondu 404 le 2026-09-20** et ne sont donc pas au dossier :
`.../faune/observation-faune/ours-noir`, `.../faune/cohabiter-faune/ours-noir`,
`.../sante/problemes-de-sante/a-z/trichinellose`, et le PDF
`cdn-contenu.quebec.ca/.../fiche-information-trichinellose.pdf`. **Il n'existe apparemment pas
de fiche d'information faune sur la trichinellose**, contrairement à la tularémie (ch. 44) qui
en a une. Signalé à l'éditeur : c'est une asymétrie de l'appareil gouvernemental, pas un défaut
de recherche.

**Régression confirmée sur l'ACIA, déjà signalée au ch. 36.** L'adresse longue de la fiche
trichinose répond encore **HTTP 200**. Les adresses courtes restent **410 Gone**. La citation
est au dossier, donc le chiffre tient — mais **le lien va mourir**. À revérifier avant impression
pour les ch. 1, 22, 26, 36, 39, 40, 41, 43, 48 et 52.

**Gain majeur pour le reste du livre — à propager.** La page de Santé Canada sur les
températures internes contient une ligne qui **nomme l'ours** :

> « Gros gibier, par exemple, ours, bison, bœuf musqué, morse : 74 °C »

C'est la **deuxième source officielle indépendante** à donner 74 °C pour cette espèce précise,
et elle règle définitivement l'écart avec les 71 °C de l'ACIA. Les ch. 1, 36, 43 et 52 doivent
la reprendre : jusqu'ici le 74 °C ne tenait que sur le MAPAQ.

**Découverte de navigation, à conserver.** Les fiches de gibier de la chasse sportive sont sous
`https://www.quebec.ca/tourisme-loisirs-sport/activites-sportives-et-de-plein-air/chasse-sportive/gibier/<espece>`.
L'adresse `.../gibier/ours-noir` répond. **Les rédacteurs des ch. 44, 45, 46, 47, 49, 50 et 51
partent de là** pour l'enregistrement et les coupons, et des fiches `liste-maladies-animales/`
pour le sanitaire. Les deux arbres ne se croisent jamais.

---

## 1. Les chiffres marqués `[À VÉRIFIER]`

| # | Valeur | Où dans le chapitre | Pourquoi elle n'est pas sourcée | Piste |
| --- | --- | --- | --- | --- |
| 1 | **8,3 g de lipides / 100 g** (ours cru) contre **0,74 g** (orignal) | §3, dernier paragraphe | Valeurs **USDA**, donc américaines, et **recopiées du dossier du ch. 24** : l'API FoodData Central a répondu HTTP 429 (`Retry-After: 11773 s`) le jour de la rédaction. Pas de revalidation de première main | Fichier canadien sur les éléments nutritifs (FCÉN), Santé Canada. Ou reprise de l'API un autre jour, `fdcId` 173845 et 174344 |
| 2 | **20,1 g de protéines, 161 kcal / 100 g** | dossier `48-usda-fdc-composition-ours.md`, **non cité dans le corps** | Même provenance | Idem |
| 3 | **Épaisseur maximale d'un morceau et durée d'ébullition** équivalant à 74 °C à cœur | §9, variante sans thermomètre | **Aucune source.** Le chapitre **refuse explicitement** de donner un couple épaisseur-durée, et écrit pourquoi | Vétérinaire de la faune, ou ingénieur en transfert de chaleur alimentaire. **C'est la question la plus utile du chapitre pour un lecteur sans thermomètre** |

**Chiffres sourcés et fermes du chapitre** (ne pas les rouvrir sans source contraire) :
**74 °C à cœur** (MAPAQ **et** Santé Canada, tous deux en nommant l'ours) · **71 °C** (ACIA,
plancher, écart nommé et non caché) · **7 °C en 24 h** (MAPAQ) · **0 à 4 °C** au transport et à
l'entreposage (MAPAQ) · **-18 °C ou moins** au congélateur (MAPAQ) · **82 °C** pour le gibier à
plumes entier (Santé Canada, cité au dossier seulement) · **48 heures** pour l'enregistrement
(Québec, chasse sportive) · **5 à 15 jours** d'apparition des signes (ACIA) · **1 à 3 semaines**
pour la phase musculaire (Québec) · **10 à 15 minutes** de lavage d'une plaie (Québec, rage) ·
**811** Info-Santé · **1-877-346-6763** signalement d'un animal suspect · **1 800 463-5023**
MAPAQ-DGSAIA.

**Aucune date de saison, aucune limite de prises, aucune zone, aucune période d'appâtage**
n'apparaît dans le chapitre. Vérifié ligne par ligne. La page de chasse de l'ours noir en
contient : elles ont été **volontairement écartées de la captation**, et le fichier de source le
dit. Les 48 heures d'enregistrement sont un délai de procédure, pas une date de saison — à
revérifier tout de même à chaque édition.

**Salpêtre :** mentionné à l'étape 32, **jamais en quantité**, toujours accompagné de sa forme
moderne équivalente (sel de salaison nitrité) et de l'avertissement que les deux ne se dosent
pas pareil. Conforme au gabarit.

**Pourcentages de sel :** aucun pourcentage n'est donné dans ce chapitre. L'étape 31 rappelle
que ceux des ch. 63 et 64 restent calculés **sur le poids de la viande**.

**Nom latin :** *Ursus americanus*, §1. Une seule occurrence, conforme au gabarit.

---

## 2. Images requises

| # | Format | Sujet | Cadrage demandé | Source |
| --- | --- | --- | --- | --- |
| 48-01 | **Pleine page** | **L'image clé du chapitre.** La nappe de gras sous-cutané d'un ours d'automne, détachée en une seule feuille, tenue à deux mains gantées et déployée à contre-jour | Frontal, fond sombre ou neige, la feuille remplissant le cadre sur toute la largeur. La translucidité de la feuille doit être visible : c'est ce qui fait comprendre que c'est un produit et non un déchet. Un couteau posé en bas du cadre pour l'échelle | Photo de JP. **Automne, sur une bête réelle** |
| 48-02 | **Quart de page** | La sonde du thermomètre numérique plantée au point le plus épais d'un morceau d'ours, afficheur lisible à **74 °C** | Macro sur l'afficheur, chiffres nets à l'impression, viande floue en second plan. **Cette photo est l'encadré DANGER en une image.** Elle sert aussi aux ch. 36, 43, 52 et 66 | Photo de JP |
| 48-03 | **Demi-page** | Séquence du rendu en quatre vignettes : gras cru paré en cubes ; premier bouillonnement avec le fond d'eau ; surface calme et cretons tombés au fond ; gras filtré au coton dans un pot de verre | Même cadre, même distance, même angle pour les quatre. Serré sur le chaudron. Les quatre états doivent se distinguer **sans légende** | Photo de JP |
| 48-04 | **Quart de page** | Deux pots de gras figé côte à côte : l'un blanc et net, l'autre avec une couche d'eau trouble visible au fond | Contre-jour latéral, verre transparent, fond neutre. C'est le signe d'échec n° 4 de la §7, et il ne s'explique pas en mots | Photo de JP |
| 48-05 | **Demi-page** | Planche dessinée : coupe d'un morceau de viande avec les isothermes, montrant la surface à 100 °C et le centre encore sous 74 °C | Planche à dessiner, pas une photo. Gradient chaud vers froid, ligne des 74 °C marquée en rouge, point le plus froid repéré par le même symbole que la sonde de 48-02. **C'est l'idée que « à cœur » veut dire quelque chose** | À dessiner |
| 48-06 | **Quart de page** | Planche dessinée : les deux chronologies de la trichinellose — phase intestinale dans la semaine, phase musculaire de 1 à 3 semaines plus tard, fenêtre ACIA de 5 à 15 jours superposée | Planche à dessiner. Deux barres décalées. Le décalage est ce qui fait qu'on ne relie pas le repas à la maladie | À dessiner |
| 48-07 | **Quart de page** | Étiquette de congélateur portant **OURS** en grandes lettres, avec la date et la mention « 74 °C » | Macro sur un paquet réel. Sert l'étape 18 : la règle doit survivre à trois ans de congélateur et à quelqu'un qui n'était pas à la chasse | Photo de JP |

**Note pour `images/credits.md` :** aucune image versée. Cinq photos de JP à prendre, deux
planches à dessiner. **48-01 dépend d'un ours réel et d'une saison** : à inscrire sur la liste
de rappel du coffre du camion, avec les images d'octobre des ch. 36 à 40. **Aucune photo de
gras d'ours ne se trouve sous licence libre** : Wikimedia Commons n'a rien d'utilisable sur ce
sujet, et une photo de gras de porc ne montrerait pas la même chose.

---

## 3. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 19, 20 | L'enregistrement dans les 48 h suppose un réseau qu'un chalet hors réseau n'a pas |
| 22 | L'arme reste chargée tant que la bête n'est pas confirmée morte, puis se décharge avant le couteau |
| 24 | **Renvoi le plus important du chapitre.** Le gras d'ours est le remède au mal de caribou |
| 27 | Griffure, morsure, lavage 10 à 15 min, tétanos |
| 34 | Calendrier — l'ours d'automne contre l'ours de printemps |
| 35 | Présence d'ours autour du chalet |
| 36 | Abattage et éviscération, applicables sans modification |
| 37 à 40 | Démontage. L'ordre se transfère ; la nappe de gras est en plus |
| 41 | Abats. Le cadmium vise les **cervidés**, pas l'ours — le chapitre le dit pour éviter l'extension abusive |
| 42 | Les restes d'un ours attirent d'autres ours. Distance du camp |
| 43 | Fiche d'espèce — modèle de lecture |
| 52 | **Phoque : même parasite, même règle.** Les deux chapitres doivent dire la même chose mot pour mot |
| 61 | Pourquoi la viande pourrit — mécanisme derrière le 7 °C |
| 63, 64 | **Fermés pour l'ours cru.** Ouverts sur viande déjà cuite à 74 °C |
| 65 | **Fermé pour l'ours.** Le fumage à froid ne cuit pas |
| 66 | Ouvert **si** la sonde lit 74 °C avant la sortie du fumoir |
| 67 | Pemmican et graisses — le gras d'ours y est la matière première |
| 68 | Froid naturel. Ne compte pas comme traitement |
| 69 | Congélateur qui dégèle, aggravé ici parce que le gel n'assainissait rien |
| 73 | **Conserves sous pression — la voie recommandée** pour la viande d'ours |
| 76 | Caveau, pour le gras et le confit |
| 79 | La peau |
| 82 | Affûtage |
| 86 | Levage de la carcasse |
| 89 | Savon et chandelles au gras de rebut |

**Renvois reçus attendus :** le ch. 24 doit pointer ici pour le gras. Les ch. 63, 64, 65 et 66
doivent porter **chacun** une ligne d'exclusion de l'ours noir — sinon un lecteur qui ouvre le
ch. 65 directement fume de l'ours à froid. **C'est la demande la plus importante de cette fiche
à l'éditeur.**

---

## 4. Relecteur humain

**OBLIGATOIRE.** Le ch. 48 (« Ours noir ») figure sur la liste de `CLAUDE.md`. Marqué en tête
du fichier chapitre par un bandeau, et détaillé à la §10.

**Profil requis : médecin vétérinaire spécialisé en santé de la faune ou en zoonoses.**
MAPAQ, Direction générale de la santé animale et de l'inspection des aliments (1 800 463-5023),
ou Réseau canadien pour la santé de la faune. En second recours pour la partie humaine, un
microbiologiste-infectiologue.

Sept questions, dans cet ordre :

1. **Bloquante. 74 °C à cœur suffit-il contre les larves de *Trichinella*, et faut-il une durée
   de maintien ?** Aucune source au dossier ne lie explicitement la température au parasite : le
   tableau de Santé Canada est un tableau de salubrité générale et ne nomme aucun parasite ; le
   MAPAQ nomme l'ours et le parasite dans la même page, mais la phrase de cuisson ne dit pas
   qu'elle règle la trichinellose. **Si la réponse est non, les ch. 1, 36, 48 et 52 sont tous
   incomplets.**
2. Prévalence de *Trichinella* chez l'ours noir au Québec — aucun chiffre trouvé.
3. Où et comment faire analyser un échantillon de viande d'ours au Québec, et à quel coût.
4. Le gras d'ours : rendement, point de fusion, durée de conservation du gras fondu. Le
   chapitre décrit le rendu **par repères observables** faute de chiffres. Est-ce suffisant ?
5. Le confit sous gras : le chapitre tranche dans le sens prudent (0 à 4 °C, jamais hors froid)
   faute de source. Est-ce la bonne tranche ?
6. Le foie d'ours est-il consommable ? Le livre s'abstient faute de source.
7. L'ours noir est-il hôte documenté de l'échinococcose, ou porteur de la rage, au Québec ? Il
   n'est nommé sur aucune des deux pages officielles.

---

## 5. Points à surveiller aux portes 3 et 4

**Vérificateur technique :**
- Les onze citations (MAPAQ, ACIA, Santé Canada, Québec santé animale, Québec chasse) sont-elles
  reproduites **mot à mot** ? Deux coquilles de pages officielles sont reproduites telles quelles
  et signalées dans les fichiers de sources : « de n'exterminent » (ACIA) et « original » pour
  orignal (Santé Canada). **Ne pas les corriger dans les citations.**
- L'étape 9 **contredit partiellement le ch. 36** : le MAPAQ dit d'attendre d'être sorti du bois
  pour dépouiller, et le chapitre 48 ajoute que sur un ours il faut se dépêcher d'y arriver,
  parce que la nappe de gras isole. **Ce raisonnement n'est pas sourcé** — c'est une déduction
  physique du livre. Assumée et écrite comme telle, mais à faire trancher.
- Le tableau des chapitres fermés (§2) est le cœur structurel du chapitre. Vérifier que chacun
  des ch. 63, 64, 65, 66, 67, 73 dit bien la même chose de son côté.
- Les phrases « l'ours à terre n'est pas mort » (§5, étape 1, et DANGER n° 2) ne sont **pas
  sourcées** : pratique de terrain, écrite sans chiffre.

**Vérificateur sécurité :**
- **L'encadré DANGER a quatre points.** Chacun porte un risque de mort ou d'intoxication grave,
  chacun donne son mécanisme. Le candidat au retrait, si un point doit sauter, est le n° 4
  (échinococcose par le chien) — mais le mécanisme est réel et le geste se fait ici, à
  l'épluchage des parures, et nulle part ailleurs. **Décision à prendre, pas à repousser.**
- **Vérifier que le n° 1 est bien en tête.** C'est le danger qui définit le chapitre.
- Le n° 3 (botulisme du confit) est un danger **que le chapitre crée lui-même** en proposant le
  confit à l'étape 29. Si le relecteur juge la pratique non documentable, l'étape 29 et le
  DANGER n° 3 sautent ensemble.
- Le rappel du mal de caribou (après l'encadré) est un danger à retardement placé **hors** de
  l'encadré, volontairement, pour ne pas diluer. À confirmer.
- Vérifier qu'aucune formulation ne laisse croire que la congélation, le sel ou le fumage
  « aident un peu » contre le parasite. La position du livre est binaire : ils ne comptent pas.

## Notes retirées du chapitre — 23 septembre 2026

> ⚠ **RELECTURE HUMAINE EXTERNE OBLIGATOIRE — MÉDECIN VÉTÉRINAIRE EN SANTÉ DE LA FAUNE.**
> Ce chapitre ne part pas à l'impression sans la relecture d'un **médecin vétérinaire
> spécialisé en santé de la faune ou en zoonoses** — MAPAQ, Direction générale de la santé
> animale et de l'inspection des aliments (1 800 463-5023), ou Réseau canadien pour la santé
> de la faune. Point à faire trancher en priorité : **74 °C à cœur suffit-il contre les larves
> de *Trichinella*, et faut-il une durée de maintien ?** Aucune des sources officielles au
> dossier ne répond. Deuxième point : la conservation du gras fondu et de la viande confite,
> pour laquelle le livre n'a **aucune** source. Troisième point : l'épaisseur de morceau et la
> durée d'ébullition qui équivalent à 74 °C à cœur, la seule question qui serve à quelqu'un qui
> n'a pas de thermomètre.

(§3, après les citations MAPAQ et Santé Canada sur le 74 °C :)
L'ACIA donne un
plancher plus bas — «au moins 71 °C » — pour tout gibier, porc et cheval confondus. **Le livre
retient 74 °C**, la valeur la plus haute, et la seule que deux sources sur trois donnent en
nommant l'ours. L'écart est écrit ici plutôt que caché, parce qu'un lecteur qui tombera un jour
sur la fiche de l'ACIA doit savoir que le livre l'a vue.

(§7, échantillon congelé de chaque ours :)
Ce n'est prescrit par aucune source officielle au dossier ; c'est une
pratique que le livre recommande

## Passe « légal et signes » — 23 septembre 2026

**Retiré (légal) :**
1. §2, première phrase : « sous la réglementation de l'année — saison, zone, permis, appâtage et
   limites de prise se lisent dans la réglementation en vigueur, jamais dans ce livre. » Reste :
   « Ce chapitre s'applique à tout ours noir abattu et récupéré. »

**Notes de bas de page ajoutées :**
- [^1], §7 : **viande poisseuse** — la surface colle ou accroche sous le doigt, ou glisse,
  visqueuse ; avec l'odeur, c'est ce qui dit l'altération, la couleur seule ne la dit pas.
  Provenance : `sources/48-usda-fsis-couleur-viande-alteration.md` (+ page `.html`). Agence
  fédérale américaine ; aucune source québécoise ou canadienne au dossier ne décrit le toucher.
- [^2], §8 (paragraphe après l'encadré) : **mal de caribou** — même note que ch. 38 et 51.
  Provenance : `sources/48-mal-de-caribou-signes.md` (même fiche que 51 et 38). Aucune source
  officielle ne décrit le tableau : le délai porte `[À VÉRIFIER]`.

**Doutes de la passe paperasse laissés tels quels :** ACIA/71 °C, étape 16 (étiquette OURS),
échantillon congelé, information au soignant, formules « le livre n'a aucune source », Info-Santé
811 : aucun ne concerne du légal ni un signe non expliqué.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/48-verifications.md`, appliqués au chapitre.

- §3, lipides du muscle — **corrigé** : 8,3 g (ours) et 0,74 g (orignal) sont exacts à la table
  américaine, mais l'ours y repose sur une seule analyse ; la table canadienne donne 4,0 g et
  3,0 g. Le texte dit « 4 à 8 g pour l'ours, 0,7 à 3 g pour l'orignal » et le « onze pour un »
  saute. Sources : `sources/48-usda-fdc-ours-orignal-premiere-main.md` (+ 2 JSON),
  `sources/24-sante-canada-fcen-gibier-poissons-gras.md`.
- §8, note [^2], diarrhée du mal de caribou — **confirmé** : entre une semaine et dix jours, que
  seul le gras arrête. Sources : `sources/21-speth-spielmann-1983-stefansson-mal-de-caribou.md`,
  `sources/48-mal-de-caribou-signes.md`.
- §8, mal de caribou « tue en deux à trois semaines » (non marqué) — **corrigé** en « en quelques
  semaines » (« Death will result after several weeks »). Mêmes sources.
- §9, contenant galvanisé — **corrigé** : le critère n'est pas la chaleur mais l'eau et l'acidité
  (le zinc passe dans ce qui est humide, plus vite si c'est acide) ; signes de l'empoisonnement
  ajoutés ; vieille tôle galvanisée = plomb possible. Sources :
  `sources/48-fda-food-code-2022-metal-galvanise.md` (+ PDF), `sources/60-acia-plomb-produits-erable.md`.
- §5, étape 20, température et durée du rendu — **introuvable** : la phrase qui déclarait le trou
  est coupée ; l'étape tient par les signes du chaudron.
- §9, épaisseur de morceau équivalant à 74 °C à cœur — **introuvable** : la phrase qui déclarait
  le trou est coupée ; le mécanisme (mince = centre plus vite chaud) reste.

## Renvois vers les chapitres nouveaux — 24 septembre 2026

Renvoi seulement, aucun chiffre ajouté.
- §5, étape 1 : l'ours touché qui est parti renvoie au ch. 35d (étape 18, attente ; §8, bloc 1, jamais vite, jamais dans le couvert à la brunante). Le 35d renvoie lui-même à cette étape pour l'approche finale.
- Pas de renvoi au ch. 43b : l'ours n'y est pas.

Compression §3 et §4 — 27 septembre 2026 : 1273 mots → 176 mots ; matériel coupé : couteau à désosser, pierre à affûter, passoire et coton, contenants à gras, perche/corde/poulie, gants jetables, bacs à gras cru ; gardés : thermomètre à sonde (deux), chaudron à fond épais, autoclave. §3 : citations, chiffres de lipides, détail du rendu coupés ; rien de vital n'était seul en §3/§4 (74 °C, haché, rôti noir dehors, étalonnage de la sonde : §6, §8, §9).
