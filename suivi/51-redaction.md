> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 47. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 47, Porc-épic

- **Fichier :** `chapitres/47-porc-epic.md`
- **Tome :** 3 — Prélever
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (technique) et 4 (sécurité)
- **Ampleur :** ≈ 4 700 mots utiles (6 354 mots bruts, tableaux compris). Procédure numérotée
  en 26 étapes réparties en six blocs, cinq tableaux, encadré DANGER à cinq points, variante
  d'urgence complète avec son tableau de pertes.

---

## 0. Ce qu'il faut savoir avant de lire le reste

**Le budget de recherche web du poste était épuisé à l'ouverture** (200 appels `WebSearch` sur
200), comme au ch. 36. Toute la documentation s'est faite par **récupération directe d'URL**
(`WebFetch`), en descendant l'arbre de Québec.ca page par page. Les pages trouvées sont bonnes,
mais rien ne garantit qu'une meilleure page n'existe pas ailleurs.

**Trouvaille de navigation à conserver pour les ch. 43 à 52 — elle vaut plusieurs heures.**
Les **fiches d'espèce** de Québec.ca sont sous :

```
/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/
  fiches-especes-fauniques/<espece>
```

L'adresse construite à la main `.../fiches-especes-fauniques/porc-epic` répond. La liste compte
**185 entrées paginées par 10** : ne pas la parcourir, construire l'adresse directement à partir
du nom français avec des traits d'union. Aucune fiche d'espèce n'est accessible depuis
`/faune/cohabiter-animaux-sauvages`, contrairement à ce que le nom de la section laisse croire,
ni depuis l'index `/faune`.

**Deuxième trouvaille, pour tous les chapitres d'espèce non chassables (47, 49, 51).** La page
« Quoi faire en présence d'animaux sauvages sur votre propriété » porte la seule règle
officielle retrouvée qui permet d'abattre une bête hors des périodes réglementaires :
`/faune/cohabiter-animaux-sauvages/quoi-faire-presence-animaux-sauvages-propriete`. C'est la
porte légale du porc-épic, de la marmotte et de l'écureuil roux au chalet.

**Refus de captation à signaler à l'éditeur.** La fiche québécoise du porc-épic **n'a pas pu
être reproduite intégralement** : deux tentatives ont été refusées par l'outil de récupération
au motif du droit d'auteur. Les citations au dossier sont courtes, exactes et obtenues par
questions ciblées, **mais la page n'a pas été lue en entier**. Les sections « Maladies » et
« Méthodes de prévention » ne sont captées qu'au chapeau. Un poste humain doit ouvrir la page et
compléter `sources/47-quebec-fiche-porc-epic.md`. C'est une limite nouvelle, qui n'apparaissait
pas aux ch. 36 à 41 et qui va revenir sur toutes les fiches d'espèce.

---

## 1. Les chiffres marqués `[À VÉRIFIER]`

| # | Valeur | Où dans le chapitre | Pourquoi elle n'est pas ferme | Piste |
| --- | --- | --- | --- | --- |
| 1 | **4,5 kg (femelle) et 5,5 kg (mâle)** | §5 étape 20 | Source de **second rang** : Faune et flore du pays, programme conjoint ECCC + Fédération canadienne de la faune, pas un ministère. **La fiche québécoise ne publie aucun poids**, vérifié deux fois | MELCCFP, biologiste de la faune. Ou pesée réelle au chalet à la balance à ressort : une seule bête pesée, et le livre a son chiffre à lui |
| 2 | **Plus de 30 000 piquants** | §2, §3 | Même source de second rang, et la page écrit elle-même « on pense que ». Ce n'est pas un comptage | Faible priorité. Le chiffre sert à donner l'ordre de grandeur, aucun calcul n'en dépend |
| 3 | **Rayon d'environ 100 m autour de la tanière l'hiver** | §1, §2, §3, §9 | Même source. Valeur nord-américaine générale, non mesurée en forêt boréale de la Côte-Nord | **Priorité haute** : c'est le chiffre sur lequel repose tout l'argument « bête localisée et retrouvable ». À confronter à une source de biologie régionale |
| 4 | **Teneur en gras, en protéines et en énergie de la viande** | §3 — **volontairement absente** | L'API de l'USDA FoodData Central a répondu **HTTP 429**, `Retry-After: 11801`, clé `DEMO_KEY` épuisée, probablement par la session du ch. 24. **Le chapitre affirme que la bête est grasse et ne donne aucun nombre** | Fichier canadien sur les éléments nutritifs d'abord (source de premier rang), USDA `SR Legacy` ensuite. **Il se peut qu'aucune entrée « porcupine » n'existe** : dans ce cas la mention reste et le livre assume |
| 5 | **Statut légal exact de l'espèce** | §2 | LégisQuébec a répondu **HTTP 403** sur la loi C-61.1 comme sur le Règlement sur la chasse. Le chapitre s'en tient à deux faits vérifiables : l'absence du porc-épic de la liste du petit gibier, et la voie « dommages à la propriété » | **Priorité la plus haute du chapitre.** Voir §3 |
| 6 | **Le foie et les reins de porc-épic** | Non traités, et le chapitre dit pourquoi | La règle du cadmium du MAPAQ vise les **cervidés**. Aucune source consultée ne dit quoi que ce soit du foie d'un rongeur. Le chapitre ne dit ni de le manger, ni de le jeter | Ch. 41. À trancher là, pas ici |
| 7 | **Bâton de 1,2 m · toile de 2 m × 2 m · corde de 5 m** | §4, tableau du matériel | Valeurs d'atelier, pas des valeurs publiées. Même statut que la corde de 10 m et le bâton écarteur du ch. 36 | À fixer à l'usage et à mesurer au chalet. Une fois mesurées, elles cessent d'être `[À VÉRIFIER]` et deviennent des chiffres du livre |
| 8 | **« mortel en 2 à 3 semaines »** (mal de caribou, §8 point 5) | §3 et §8 | Chiffre **repris du tableau de sécurité de `CLAUDE.md`** et du ch. 24, pas recapté ici | Ch. 24. Si le ch. 24 le révise, le ch. 47 suit |

**Chiffres sourcés et fermes du chapitre** (ne pas les rouvrir sans source contraire) :
**63 à 100 cm** (Québec, fiche d'espèce) · **rang S5** (idem) · **environ un jeune par année**
(idem) · **7 °C en 24 h** (MAPAQ) · **0 à 4 °C** au transport et à l'entreposage (MAPAQ) ·
**-18 °C ou moins** au congélateur (MAPAQ) · **74 °C** à cœur (MAPAQ, confirmé par Santé Canada
pour le petit gibier) · **2 semaines** d'incubation et **10 à 80 %** de mortalité du tétanos
(Québec, MSSS) · **rappel vaccinal à 50 ans** (idem) · **10 à 15 minutes** de lavage après
morsure ou griffure (Québec, rage) · **0,6 cm** de zone d'aiguillons sur le piquant (Faune et
flore du pays) · **1 877 346-6763** (Québec, animaux sur la propriété).

**Aucune date de saison, aucune limite de prises, aucune zone** n'apparaît dans le chapitre.
Vérifié ligne par ligne.

---

## 2. Images requises

Aucune image de ce chapitre ne dépend de la fenêtre d'octobre : le porc-épic se prend l'hiver,
et les images se font en janvier ou en février. **Mais 47-01 et 47-02 demandent une bête
réelle**, donc elles attendent la première prise.

| # | Format | Sujet | Cadrage demandé | Source |
| --- | --- | --- | --- | --- |
| 47-01 | **Pleine page** | **L'image clé du chapitre.** La bête retournée sur le dos, calée entre deux bûches, ventre nu vers l'objectif, avant la première incision. Tous les piquants sont dessous et invisibles | Plongée verticale, la bête remplissant le cadre sur toute la hauteur. Lumière de jour, sans flash direct. **Un couteau posé en travers du bas du cadre sert d'échelle.** L'image doit faire comprendre en une seconde la phrase « le ventre est nu » | Photo de JP, à la première prise |
| 47-02 | **Demi-page** | Séquence en quatre vignettes : le bâton qui retourne la bête sans y mettre la main ; la brosse passée à rebrousse-poil sur la toile ; les piquants versés dans le contenant rigide ; le couvercle fermé | Même cadre, même distance, même angle pour les quatre. Serré sur les mains. **Gants visibles sur les quatre vignettes** — la photo enseigne la règle de la §8 sans la répéter | Photo de JP |
| 47-03 | **Demi-page** | **Planche dessinée : la zone sans piquants.** Silhouette du porc-épic de profil et de dessous, avec le museau, les pattes et tout le dessous du corps tramés dans une couleur, le dos et la queue dans l'autre. La ligne d'incision médiane tracée en rouge | Planche à dessiner, pas une photo : sur une photo de terrain, la limite entre zone piquante et zone nue ne se lit pas. Reprendre le rouge d'incision du ch. 36, planche 36-07 | À dessiner |
| 47-04 | **Quart de page** | **Macro anatomique du piquant.** Le dernier centimètre, aiguillons visibles, avec la cote de **0,6 cm** portée et une flèche indiquant le sens de pénétration | Macro sur fond neutre, éclairage rasant. Un piquant récolté suffit — pas besoin d'une bête. **À prendre dès le premier piquant trouvé au chalet.** C'est l'image du mécanisme de l'encadré DANGER | Photo de JP, ou planche à dessiner si la macro ne donne rien |
| 47-05 | **Quart de page** | **Signature hivernale sur l'arbre.** Un tronc ou une grosse branche de sapin ou d'épinette écorcé en hauteur, bois frais et pâle, brindilles coupées net tombées sur la neige au pied | Contre-plongée depuis le pied de l'arbre, avec la neige et les brindilles dans le bas du cadre. **Un objet d'échelle appuyé au tronc.** Prise possible sans avoir vu l'animal : à faire dès cet hiver | Photo de JP |
| 47-06 | **Quart de page** | Le gras périviscéral et sous-cutané détaché, posé à part sur un linge propre, à côté d'une cuisse dépouillée | Plongée à 45°, gras clairement séparé de la viande dans le cadre. Une main gantée pour l'échelle. **Sert aussi au ch. 24 et au ch. 67** | Photo de JP |
| 47-07 | **Quart de page** | Le retrait d'un piquant à la pince, dans l'axe | Macro, pince et piquant nets, angle montrant clairement que la traction est alignée sur le piquant et non oblique. **Peut se faire sur un morceau de cuir ou de mousse**, pas sur une personne | Photo de JP, ou planche |

**Note pour `images/credits.md` :** aucune image versée. Sept images à produire, toutes par JP
ou à dessiner. **Ne pas aller chercher de photo de porc-épic sur le web pour 47-01 ou 47-03** :
les photos disponibles montrent l'animal vivant, de dos, hérissé — c'est-à-dire exactement la
seule vue qui n'enseigne rien dans ce chapitre.

**Liste de rappel à coller à l'intérieur de la porte du cabanon :** 47-04 et 47-05 se prennent
dès cet hiver, sans bête. Les cinq autres attendent la première prise.

---

## 3. Les trous de documentation

| Question | État | Qui tranche |
| --- | --- | --- |
| **Le statut légal du porc-épic au Québec** | **Non établi.** L'espèce n'est pas sur la liste du petit gibier chassable, n'est pas nommée sur la page d'entrée du piégeage, et **LégisQuébec a refusé la récupération automatique (HTTP 403) sur la loi C-61.1 et sur le Règlement sur la chasse** | **Question n° 1 au relecteur.** Un agent de protection de la faune, ligne 1 877 346-6763. Deux issues : soit le statut se confirme et le chapitre le nomme, soit il reste flou et le chapitre garde sa formulation prudente actuelle. **À régler avant impression** : c'est la première question du lecteur |
| **La liste des animaux à déclaration obligatoire** | **Non ouverte.** La page sur les animaux causant des dommages y renvoie sans donner l'adresse dans le texte capté. Le chapitre ne peut donc pas dire si un porc-épic abattu doit être déclaré | **Question n° 2 au relecteur.** Même interlocuteur, même appel |
| **Le porc-épic est-il un animal à fourrure au sens du règlement** | **Non établi.** La page d'entrée du piégeage est un aiguillage sans liste d'espèces | Même appel. Faible conséquence pratique, mais à fermer |
| **Le retrait d'un piquant planté dans une plaie humaine** | **Aucune source officielle retrouvée.** MSSS, INSPQ, CNESST et Santé Canada couvrent la morsure, la griffure, la plaie souillée et le lavage — **jamais le corps étranger barbelé** | **Question n° 3 au relecteur.** Infirmière ou médecin. Le mécanisme est sourcé (les aiguillons gonflent et font avancer le piquant), le geste ne l'est pas |
| **L'abattage et le dépouillement** | **Aucune source.** Étapes 8 et 15 à 19. La zone sans piquants est sourcée, la séquence de gestes ne l'est pas. C'est écrit tel quel à la §10 du chapitre | Vérificateur technique, puis usage réel. Comme pour la saignée du ch. 36 : soit on trouve la source, soit on assume l'aveu |
| **Composition nutritionnelle** | **HTTP 429 sur l'USDA.** Le chapitre affirme que le porc-épic est gras **sans donner un seul chiffre** | Un poste avec une vraie clé USDA, ou le Fichier canadien sur les éléments nutritifs. Voir aussi ch. 24, même problème d'accès |
| **Le porc-épic et la tularémie** | La page québécoise dit « d'autres petits rongeurs » **sans nommer le porc-épic**. Le chapitre applique la protection sans affirmer le portage | Vérificateur sécurité : la formulation actuelle est-elle assez claire, ou laisse-t-elle croire que le porc-épic est un réservoir établi ? |

---

## 4. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 7 | Les piquants tombés au sol, sur le plancher, dans un vêtement — enfants de 4 et 6 ans |
| 24 | Mal de caribou. **C'est la raison d'être du chapitre** : le porc-épic est la bête grasse de l'hiver |
| 27, 29 | Plaie, tétanos, trousse, statut vaccinal vérifié en octobre |
| 28 | Lavage des mains et des avant-bras après manipulation |
| 34 | Calendrier annuel : le porc-épic est une ressource d'hiver, pas d'automne |
| 35 | Lire le territoire : repérer les arbres écorcés en hauteur et remonter à la tanière |
| 36 | L'éviscération en détail. Le ch. 47 n'en donne que la version courte |
| 41 | Organes. **Le foie et les reins de porc-épic sont une question ouverte à trancher là** |
| 42 | Les restes, et le problème propre à cette espèce : des piquants dans ce qu'on jette |
| 43 | Comment lire une fiche d'espèce |
| 44, 45, 46, 49 | Les autres petites bêtes. Le ch. 44 porte la tularémie de fond |
| 51 | Le pékan, prédateur principal du porc-épic |
| 61 | Pourquoi la viande pourrit — le mécanisme derrière le 7 °C |
| 63, 64, 65 | **Filières fermées si le 7 °C est manqué.** Point à faire respecter par l'éditeur |
| 67 | Fondre et garder le gras. **Le renvoi le plus important du chapitre** |
| 68 | Froid naturel, neige, cave |
| 69 | Congélateur qui dégèle |
| 79, 80 | La peau, la babiche |
| 81 | **Les piquants en ornementation.** Le ch. 47 récolte, le ch. 81 travaille |
| 82 | Affûtage |
| 89 | Savon, pour la variante sans savon acheté |

**Renvois reçus attendus :** le ch. 24 doit pointer ici pour la source de gras d'hiver, le
ch. 81 pour la matière première, le ch. 42 pour les restes piquants, et le ch. 34 doit placer
le porc-épic en janvier-février et non à l'automne.

---

## 5. Relecteur humain

**Non obligatoire** selon la liste de `CLAUDE.md` — le ch. 47 n'y figure pas.

**Requis quand même**, et le chapitre le dit à sa §10, sur deux personnes distinctes :

1. **Un agent de protection de la faune** (1 877 346-6763) — questions n° 1, 2 et 3 de la §3.
   Le statut légal est la première chose que le lecteur voudra savoir et c'est la seule que le
   livre n'a pas pu établir à la source.
2. **Une infirmière ou un médecin** — le retrait d'un piquant et la conduite devant un fragment
   migré. C'est le seul passage du chapitre qui donne un geste médical sans appui officiel.

---

## 6. Points à surveiller aux portes 3 et 4

**Vérificateur technique :**
- Les citations de Faune et flore du pays sont-elles bien signalées comme **source de second
  rang** partout où elles portent un chiffre ? Trois chiffres du chapitre en viennent.
- Le chapitre affirme que le porc-épic est gras **sans aucun nombre**. Est-ce que l'affirmation
  tient sans chiffre, ou faut-il la retirer jusqu'à ce que le chiffre existe ?
- La §2 dit « une absence n'est ni une interdiction ni une permission ». Est-ce assez clair, ou
  est-ce que le lecteur va y lire une permission ?
- L'étape 8 (abattage par la tête) est-elle présentée assez visiblement comme non sourcée ?

**Vérificateur sécurité :**
- **L'encadré DANGER a cinq points.** Chacun porte un risque de mort et chacun donne son
  mécanisme. Le candidat au retrait, s'il en faut un, est le n° 5 (mal de caribou), parce qu'il
  est un danger à retardement dans un encadré de dangers immédiats et qu'il est traité au fond
  au ch. 24. **Il est gardé parce que c'est ici que le geste se fait** : celui qui jette le gras
  le jette à l'étape 14 et nulle part ailleurs. **Décision à prendre, pas à repousser.**
- Le point n° 1 (rage) est en premier volontairement : c'est le seul danger qui se joue **avant**
  que le couteau sorte, et c'est le seul dont le signal d'alerte habituel est neutralisé par la
  biologie de l'espèce. Confirmer l'ordre.
- Le point n° 3 (tularémie) applique une consigne écrite pour « la préparation de gibier » à une
  espèce qui n'est **pas nommée** sur la page. Formulation à valider : elle doit protéger sans
  affirmer un portage que la source n'établit pas.
- Vérifier que nulle part le chapitre ne laisse entendre qu'un piquant peut être laissé en place
  jusqu'au lendemain.

## Notes retirées du chapitre — 23 septembre 2026

- §5, étape 7 (Viser la tête), après « la pire situation du chapitre » : « **Cette étape ne
  repose sur aucune source officielle.** La zone sans piquants est sourcée ; la séquence de
  gestes, non. Elle vient de la pratique, et le livre le dit plutôt que de laisser croire le
  contraire. »

## Passe « pas de code légal, signes expliqués » — 23 septembre 2026

**Retiré du chapitre :** §2, « Le livre ne publie ni dates, ni quotas, ni statut : la
réglementation de l'année tranche. »

**Notes de bas de page ajoutées :**

- [^1] §5 étape 4, « un amas de crottes qui ne trompe pas » : crottes arquées en noix de cajou
  (celles du chevreuil sont rondes), pleines de fibre de bois, en tas devant l'entrée de la
  tanière l'hiver. Source : `sources/47-ny-state-parks-crottes-porc-epic.md` (NY State Parks,
  « What's That? That's SCAT! », consultée le 2026-09-23). Dimensions non retenues : seulement
  sur des sites non officiels.
- [^2] §7, « surface poisseuse » : collante au doigt, bactéries d'altération en surface, souvent
  avec une odeur changée. Source : `sources/47-fsis-viande-gatee-collante.md` (FSIS, « Beef From
  Farm to Table » : « tacky to the touch », « slimy or sticky » ; « Ground Beef and Food
  Safety » : « feeling sticky on the outside » ; consultées le 2026-09-23 par copie d'archive,
  le site direct répondant 403). La comparaison au ruban adhésif est une image du livre.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/47-verifications.md` (4 drapeaux : 2 levés, 2 introuvables).
Tous appliqués ; plus aucun drapeau dans le chapitre.

- §3, valeur nutritive du porc-épic : **introuvable** (absent du Fichier canadien sur les
  éléments nutritifs) — `sources/47-sante-canada-fcen-aucune-entree-porc-epic.md` (+
  `sources/47-sante-canada-fcen-liste-aliments-2026-09-24.json`). Parenthèse « le livre n'a pas
  de chiffre » coupée ; gardé le gras visible sous la peau et autour des viscères
- §5 étape 19, poids de la bête : **5,5 kg** mâle adulte, **4,5 kg** femelle adulte (moyennes)
  — `sources/47-hww-porc-epic.md`
- §9 étape 9, garde du gras fondu : **introuvable** — `sources/47-sante-canada-entreposage-restes-cuits.md`
  (constat d'absence). Phrase « le livre ne donne pas de durée » coupée ; gardé le mécanisme
  (air, chaleur, lumière)
- §9 étape 13, viande cuite gardée sous son gras : **3 à 4 jours** au froid (délai de
  sécurité), le gras ne rallonge rien — `sources/47-sante-canada-entreposage-restes-cuits.md` ;
  milieu sans oxygène sous le gras : `sources/45-reprises-sources-deja-enregistrees.md`.
  « Le gras figé scelle la surface » retiré du début de l'étape
- §3 et §8 rappel 5, mal de caribou : « deux à trois semaines » / « 2 à 3 semaines »
  remplacés par « en quelques semaines » (décision du 24 septembre 2026)

## Renvois vers les chapitres nouveaux — 24 septembre 2026

Renvoi seulement, aucun chiffre ajouté.
- §9, point 2 (perche à collet) : hors de portée de la perche, la flèche mousse (ch. 43b §9, qui renvoie lui-même au ch. 47 §9).
- Pas de renvoi au ch. 35d : il ne traite pas le porc-épic blessé au terrier, et le chapitre règle déjà ce cas (étape 7).

Compression §3 et §4 — 27 septembre 2026 : 1229 mots → 204 mots ; matériel coupé : gants jetables, lunettes de protection, tablier, couteau, pierre à aiguiser, toile, corde, eau chaude et savon, sac pour les restes, lampe frontale, paragraphe « Ce qui n'est pas du matériel » (tétanos et chien, déjà en §5 étape 2, §8 rappel 2 et §9) ; §3 sans l'écorçage (déjà en §5 étapes 3-4) ; §9 « tableau de matériel » → « matériel ».
