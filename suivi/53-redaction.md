> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 49. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 49, Rat musqué, écureuil roux, marmotte

- **Fichier :** `chapitres/49-rat-musque-ecureuil-roux.md`
- **Tome :** 3 — Prélever
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (technique) et 4 (sécurité)
- **Ampleur :** ≈ 4 800 mots utiles (6 100 mots bruts, tableaux compris). Procédure numérotée en
  16 étapes, cinq tableaux, encadré DANGER à trois points, variante d'urgence complète.

---

## 0. Ce qu'il faut savoir avant de lire le reste

**Le budget de recherche web du poste était épuisé avant le premier appel** (200 `WebSearch` sur
200), exactement comme pour le chapitre 36. Toute la documentation a été faite par **récupération
directe d'adresses**, en partant de l'arborescence relevée par le ch. 36 et en descendant page
par page. Les sources trouvées sont bonnes ; **rien ne garantit qu'une meilleure page n'existe
pas ailleurs**. Trois sujets sont restés sans source pour cette raison (§3).

**L'arborescence des maladies de la faune, confirmée une troisième fois.** Le motif donné par le
ch. 36 fonctionne toujours :

```
https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/
  sante-animale/maladies-animales/liste-maladies-animales/<maladie>
```

Adresses vérifiées le 2026-09-20 pour ce chapitre : `tularemie`, `rage-chez-les-animaux`,
`echinococcose`, **`leptospirose`** (nouvelle, non encore au dossier). Les rédacteurs des
ch. 46, 48, 50, 51 et 52 partent de là.

**Le poste ne peut pas lire les PDF.** `pdftoppm` / `pdftotext` ne sont pas installés. Le PDF de
la fiche tularémie du MELCCFP a bien été téléchargé (1,8 Mo) mais **son texte n'a pas pu être
extrait sur ce poste**. Le chapitre s'appuie donc sur la captation intégrale faite le même jour
par le poste du ch. 44 (`sources/44-quebec-fiche-tularemie.md`), recopiée dans
`sources/49-melccfp-tularemie-fiche-information.md` avec cette réserve écrite en tête du fichier.
**Ce n'est pas une captation indépendante.** À signaler à l'éditeur : installer `poppler-utils`
sur les postes de rédaction règle le problème pour les 40 chapitres qui restent.

**Trouvaille utile aux ch. 44 à 52 : la page « Petit gibier » et la page « Périodes de piégeage »
ne contiennent pas les mêmes espèces.** La marmotte commune est du **petit gibier** (chasse) ; le
rat musqué et l'écureuil roux sont des **animaux à fourrure** (piégeage, UGAF). C'est vérifiable
et sans date. `sources/49-quebec-especes-chasse-et-piegeage.md` porte les deux listes complètes.

---

## 1. Les chiffres marqués `[À VÉRIFIER]`

**Aucun.** Le chapitre n'en publie pas un seul, et c'est une décision de rédaction : plutôt que
d'avancer des masses et des rendements plausibles marqués `[À VÉRIFIER]`, il ne les avance pas et
nomme le trou. Ce qui manque :

| # | Ce qui manque | Où ça se ferait sentir | Piste |
| --- | --- | --- | --- |
| 1 | **Masse, longueur et cycle annuel de l'écureuil roux** | §2, §3, §4 | L'index des mammifères de hww.ca ne contient pas l'espèce ; quatre adresses en 404. Chercher du côté du MELCCFP (fiches d'espèces à fourrure) et d'ECCC. **Poste avec budget de recherche requis** |
| 2 | **Nom latin de l'écureuil roux** — *Tamiasciurus hudsonicus* est employé au ch. 49 mais **n'a été confirmé sur aucune page officielle consultée** | Convention du gabarit : nom latin au moins une fois | Une seule page ministérielle suffit. **Priorité haute, c'est une convention du livre** |
| 3 | **Rendement en viande** des trois espèces, donc « combien de bêtes pour un repas de quatre » | §2 | Aucune source officielle n'en donne pour aucun gibier, gros ou petit (même constat qu'au ch. 36 pour l'orignal). **Mesure de JP : peser une carcasse parée et la comparer à la masse vive.** Le livre aurait alors son chiffre à lui |
| 4 | **Masse de gras récupérable sur une marmotte d'automne** | §5 étape 12, §8 point 3, ch. 67 | hww.ca ne chiffre pas la proportion de gras avant hibernation. Même solution : peser une fois |
| 5 | **Prévalence de la tularémie** chez le rat musqué et la marmotte au Québec | §8 | Aucune source. Sans doute inexistante publiquement. Le chapitre tient sans, parce que la consigne est la même à 0,1 % ou à 10 % |
| 6 | **Effet du sel et du fumage sur *Francisella tularensis*** | §5 étape 16, §8 | **Le vrai trou du chapitre.** Le MELCCFP donne la résistance à la congélation (plusieurs années) et l'inactivation par la chaleur, mais **rien sur le sel ni la fumée**. Le chapitre écrit la position prudente — ce ne sont pas des barrières — et le dit explicitement. **Question n° 1 au relecteur** |
| 7 | **« mortel en 2 à 3 semaines » pour le mal de caribou** (§8, point 3) | §8 | Ce délai vient du **tableau de rappels de `CLAUDE.md`**, que le chapitre a l'obligation de répéter. Il n'a **pas** été retrouvé dans les fiches `sources/24-*` consultées, qui portent les plafonds (35 %, 50 %, ÉVAR) mais pas le délai. **À confirmer contre les sources du ch. 24 à la porte 3** : soit le ch. 24 le porte et il faut le citer, soit il faut le retirer d'ici et du tableau |

**Chiffres sourcés et fermes du chapitre** (ne pas les rouvrir sans source contraire) :
**74 °C** à cœur, petit gibier (Santé Canada, MAPAQ, MELCCFP) · **0 à 4 °C** frais et transport,
**-18 °C ou moins** congélateur (MAPAQ) · **1 volume de javel : 9 volumes d'eau**, **10 minutes**
de contact (MELCCFP, Québec.ca) · **au moins 10 minutes** de lavage après contact cutané
(MELCCFP) · **10 à 15 minutes** après morsure ou griffure (Québec.ca) · points blancs de **2 mm
ou plus** (MELCCFP) · **70 à 85 %** forme ulcéroglandulaire (MELCCFP) · **plusieurs années** de
survie à la congélation, **plusieurs mois** en eau, boue et carcasse (MELCCFP) · **121 °C /
15 min**, **160-170 °C / 1 h** (MELCCFP) · incubation **3-6 j jusqu'à 3 semaines** (MELCCFP) vs
**3-5 j jusqu'à 14 j** (Québec.ca) — **les deux sont publiées** · rat musqué **1 kg**, longueur
**≈ 50 cm**, queue **jusqu'à 25 cm**, huttes **0,5 à 1 m** (hww) · marmotte **2 à 4 kg, parfois
plus en automne**, température d'hibernation **jusqu'à 3 °C** (hww) · *Giardia* : **10 kystes**
possibles, **10 à 100** généralement, CT **< 12** à 25 °C contre **65 à 360** à 3-5 °C (INSPQ) ·
plafond protéique **35 %**, bascule **50 %**, ÉVAR **10-30 %** (4-18 ans) et **5-20 %** (1-3 ans)
(ch. 24) · glace **10 cm** à pied, **12 cm** motoneige (Société de sauvetage) · **811** ·
**1 877 346-6763** · mort par rage « dans les **14 jours** » après symptômes (Québec, ch. 27).

**Aucune date de saison, aucune période, aucune limite de prises, aucune UGAF nommée.** Vérifié
ligne par ligne. **Trois mentions de mois subsistent et sont biologiques, pas réglementaires :**
la marmotte qui se terre « à la fin de septembre » et « en octobre » (hww), et les tiques
présentes « de février à octobre », plus actives « vers les mois de mai et de juin » (MELCCFP).
La première porte désormais la mention « comportement de l'animal et non date de saison » dans le
texte. **Point à confirmer à la porte 4** : est-ce suffisant, ou faut-il retirer les mois ?

---

## 2. Images requises

Aucune de ces images ne dépend d'une fenêtre unique comme celle du ch. 36 — le rat musqué et
l'écureuil roux se prennent sur une longue partie de l'année. **Une seule exception : 49-06.**

| # | Format | Sujet | Cadrage demandé | Source |
| --- | --- | --- | --- | --- |
| 49-01 | **Demi-page** | **L'image clé.** Les deux glandes de musc du rat musqué, en place sous la peau près de l'anus, repérées au doigt avant l'excision | Macro, main gantée dans le champ, peau écartée par une pince ou un crochet. Lame posée en travers du bas du cadre pour l'échelle. Lumière rasante : les glandes se lisent en relief, pas en couleur | Photo de JP |
| 49-02 | **Quart de page** | La même glande excisée **en bloc et non percée**, posée à côté de la lame | Macro sur fond neutre. C'est la photo du succès : elle montre ce que veut dire « entière » | Photo de JP |
| 49-03 | **Pleine page** | Planche dessinée : les trois espèces à la **même échelle**, avec leur masse et leur régime administratif (chasse ou piégeage) en légende | Planche à dessiner, silhouettes de profil alignées sur une même ligne de sol, règle graduée en bas. **Ne pas dessiner l'écureuil roux à une taille inventée** : attendre la source du point 1 de la §1 | À dessiner, **après** la levée du trou n° 1 |
| 49-04 | **Demi-page** | Séquence du dépouillage en fourreau du rat musqué, quatre vignettes : cerner les jarrets, décoller le tour de l'anus et de la queue, la peau qui se retourne, le fourreau complet | Même cadre, même distance, même angle pour les quatre. Serré sur les mains. **Gants imperméables visibles sur les quatre** — la photo enseigne la §8 sans la répéter | Photo de JP |
| 49-05 | **Quart de page** | **Foie, rate et poumons SAINS** d'un rat musqué, étalés à plat, fond neutre, lumière franche | Plongée verticale. Règle ou pièce de monnaie pour l'échelle, parce que le critère officiel est « 2 mm ou plus ». C'est l'image de référence du normal : on ne peut pas photographier l'anormal sur commande | Photo de JP |
| 49-06 | **Quart de page** | Le gras sous-cutané d'une **marmotte d'automne**, décollé et resté du côté de la carcasse | Angle à 45°, peau rabattue dans le champ pour montrer que le gras n'est pas parti avec elle. **Fenêtre d'automne seulement** — la marmotte de printemps n'a pas ce gras | Photo de JP, **fenêtre d'automne** |
| 49-07 | **Quart de page** | Le gréement complet porté avant le premier contact : gants imperméables, masque, lunettes, tablier | Plan taille, de face, bête encore dans le sac ou au piège en arrière-plan flou. Sert aussi aux ch. 44 et 46 | Photo de JP |
| 49-08 | **Quart de page** | Sonde du thermomètre plantée dans une cuisse, affichage lisible à **74 °C** | Macro sur l'afficheur, cuisse nette en second plan. **Le 74 doit être lisible à l'impression.** Sert aussi aux ch. 44, 45, 46, 48 | Photo de JP |

**Note pour `images/credits.md` :** aucune image versée. Sept photos de JP, une planche à
dessiner. **Aucune photo de viscères malades ne se cherche sur le web** pour ce chapitre : les
licences sont incertaines et une photo de rongeur d'une autre espèce ou d'un autre continent
enseignerait la mauvaise anatomie. Le livre montre le sain (49-05) et décrit l'anormal en mots.

---

## 3. Les trous de documentation

| Question | État | Qui tranche |
| --- | --- | --- |
| **Le sel et le fumage tuent-ils *Francisella tularensis* ?** | **Aucune source.** Le MELCCFP donne la congélation (résiste, plusieurs années), la chaleur humide et la chaleur sèche. Rien sur le sel, rien sur la fumée. Le chapitre écrit la position prudente et la présente comme telle | **Question n° 1 au relecteur.** Elle touche aussi les ch. 44, 46, 63, 64, 65, 66. Si la réponse est « le sel n'y fait rien », il faut le dire dans chacun |
| **Un rongeur porteur de kystes : la viande reste-t-elle consommable ?** | Même trou qu'au ch. 36, question n° 2, et toujours ouvert. Le MELCCFP tranche pour les points blancs (ne pas consommer) mais pas pour les kystes d'échinococcose | **Question n° 2 au relecteur.** Le chapitre tranche par prudence — rebut — et écrit que c'est une décision du livre, pas une consigne officielle |
| **L'écureuil roux, en entier** | Masse, longueur, cycle, nom latin, statut vis-à-vis de la tularémie : rien de sourcé. Le chapitre le traite comme rongeur et le dit | **Poste avec budget de recherche.** C'est la troisième espèce du titre et c'est celle sur laquelle le livre en dit le moins. **À régler avant l'impression, sinon envisager de la retirer du titre** |
| **Que faire d'une bête suspecte à 300 km d'un laboratoire ?** | La consigne officielle est « le soumettre à un laboratoire ». Personne n'a écrit ce que ça veut dire depuis un chalet hors réseau en février | **Question n° 3 au relecteur.** Vraie question de terrain, et le livre existe pour y répondre |

---

## 4. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 7 | Ce qu'on montre à un enfant de 4 et 6 ans à la table de dépouillage |
| 13 | Eau, *Giardia*, chlore inefficace en eau froide, ébullition et filtration |
| 18 | Éclairage du poste de travail |
| 21 | Terrains sous bail exclusif, groupe, partage |
| 24 | Mal de caribou, plafond protéique — c'est le point 3 du DANGER |
| 29 | Trousse, coupure à la main, antiseptique |
| 34 | Calendrier, UGAF, certificat de piégeur en basse saison |
| 35 | Lire le territoire, épaisseur de la glace sur la ligne de pièges |
| 41 | Abats, cadmium — et la limite de cette consigne, qui porte sur les cervidés |
| 42 | Où porter le rebut, à quelle distance du camp |
| 44 | **Lièvre : la tularémie y est traitée au long.** Renvoi principal du chapitre |
| 45 | Gélinotte, tétras — l'arbitrage du rendement sur un même parcours |
| 46 | Castor : même filière, même maladie, même eau |
| 61 | Pourquoi la viande pourrit |
| 62, 63, 64 | Sel, salaison à sec, saumure — pourcentage sur le poids pesé |
| 65, 66 | Fumage — et le rappel que le fumage à froid ne cuit rien |
| 67 | **Fondre le gras de marmotte.** Le seul gras que ce chapitre produit |
| 68 | Froid naturel, sans congélateur |
| 79 | Peaux de rat musqué et d'écureuil, de la peau au cuir |
| 82 | Affûtage — une lame émoussée coupe le préparateur |

**Renvois reçus attendus :** le ch. 34 (calendrier) doit distinguer la ligne de piégeage (UGAF)
de la chasse au petit gibier (zone). Le ch. 44 doit pointer ici pour le rat musqué et la
marmotte, tous deux nommés dans la même phrase de la fiche tularémie que le lièvre. Le ch. 67
doit pointer ici pour la source de gras d'automne. Le ch. 13 doit pointer ici pour le rat musqué
comme réservoir de *Giardia*.

---

## 5. Relecteur humain

**Non obligatoire** selon la liste de `CLAUDE.md` — le ch. 49 n'y figure pas. Les obligations de
cette famille sont portées par les ch. 44 (lièvre, tularémie), 41 (abats) et 48 (ours noir).

**Recommandé quand même**, et le chapitre le demande à sa §10 : un **technicien de la faune du
MELCCFP ou un piégeur certifié**, sur les trois questions de la §3 et sur la séquence de retrait
des glandes (étape 7), qui est de la technique de terrain qu'aucune source officielle ne décrit.

---

## 6. Points à surveiller aux portes 3 et 4

**Vérificateur technique :**
- Les citations du MELCCFP sont **recopiées d'une captation faite par un autre poste** (voir §0).
  Vérifier au moins trois d'entre elles contre le PDF d'origine, sur un poste capable de le lire.
- L'étape 7 (glandes) est-elle présentée assez clairement comme non sourcée ?
- L'articulation « mouiller la fourrure » (MELCCFP) contre « ne pas rincer la carcasse » (MAPAQ)
  est expliquée en §4. Est-elle claire, ou est-ce que le lecteur risque encore d'inverser ?
- Le tableau du matériel marque **douze** items « non négociables ». C'est beaucoup pour un
  chapitre de petit gibier. La plupart sont nommés dans une consigne officielle — à confirmer
  item par item, et à réduire si certains ne le sont pas.

**Vérificateur sécurité :**
- **L'encadré DANGER a trois points et c'est volontaire.** La leptospirose, l'échinococcose et la
  giardiase en sont exclues faute de source établissant un risque de mort dans les conditions du
  chapitre, et le texte le dit juste sous l'encadré. **Décision à confirmer, pas à repousser.**
- Le point 2 (rage) est le plus délicat du chapitre. La page officielle **ne nomme pas les
  rongeurs** parmi les porteurs au Québec, et le chapitre ne prétend pas le contraire : il déplace
  l'avertissement de l'espèce vers la situation — manipuler une bête vivante ou agonisante.
  **Vérifier que cette nuance tient à la relecture**, parce qu'un lecteur pressé pourrait en
  conclure « la marmotte donne la rage », ce que le livre ne dit pas.
- Le point 3 (mal de caribou) est un danger à retardement dans un encadré de dangers immédiats.
  Assumé : c'est le seul chapitre du tome 3 qui produit du gras d'automne, et la décision de
  garder ou de jeter ce gras se prend ici.
- Vérifier que le 74 °C apparaît bien **quatre fois** (§1, §5 étape 15, §6, §8) et qu'aucun 71 °C
  ne s'est glissé ailleurs que dans la phrase qui explique pourquoi 71 n'est pas la bonne valeur.

## Notes retirées du chapitre — 23 septembre 2026

- §2, après « en octobre elles sont toutes rentrées » : « (Faune et flore du pays, comportement de l'animal et non date de saison) »
- §6, paragraphe sous le tableau (fenêtre d'incubation de la tularémie), remplacé dans le chapitre par la seule fenêtre de trois semaines :

  > Sur la dernière ligne : les deux pages officielles du même gouvernement ne donnent pas la même
  > fenêtre. La fiche PDF du MELCCFP dit «de trois à six jours, mais peut aller jusqu'à trois
  > semaines » ; la page web de Québec.ca dit «de 3 à 5 jours (parfois jusqu'à 14 jours) ». **Le
  > livre publie les deux et surveille trois semaines**, parce que c'est la valeur qui décide quand
  > on a le droit d'arrêter de surveiller.

## Passe municipalité, code légal et signes — 23 septembre 2026

**Retiré du chapitre (légal) :**

- §2, dernier paragraphe : « La marmotte est du petit gibier » ; « sont des animaux à fourrure, et le découpage des terrains de piégeage — souvent loués à droits exclusifs — ne suit pas celui des zones de chasse » ; « Ce livre ne publie ni période, ni date, ni limite de prises : elles changent d'une année à l'autre et d'un territoire à l'autre, et elles se lisent dans la réglementation de l'année. » Reste le fait de terrain : le rat musqué et l'écureuil roux se prennent sur des lignes de pièges, le territoire d'un trappeur ne suit pas celui où l'on chasse, et piéger sur la ligne d'un autre, c'est prendre sa récolte.

**Gardé :** le 1 877 346-6763, le 811 et Info-Santé (services qu'on appelle). « Petit gibier » à l'étape 15 reste : c'est la catégorie de cuisson (74 °C), pas une catégorie légale.

**Corrigé :** « ÉVAR » → **« ÉVAM »** (§8, bloc 3, deux occurrences). Le sigle français officiel de Santé Canada est ÉVAM ; « ÉVAR » venait de la fiche 24-sante-canada-anref-macronutriments.md, relevée en anglais. **À reporter au ch. 24 et à tout chapitre qui écrit « ÉVAR »** (hors de cette passe).

**Notes de bas de page ajoutées, et leur provenance :**

| Note | Où | Ce qu'elle dit | Source |
| --- | --- | --- | --- |
| [^1] morfil | §4, Fusil à aiguiser | Lèvre de métal presque invisible ; se sent au doigt en travers du tranchant, du dos vers le fil, sur la face qu'on ne travaille pas | 49-wikipedia-morfil.md (non officielle ; concorde avec Chroma France) |
| [^2] ganglions | §5, étape 9 | Petit organe en forme de fève ; chez l'humain au cou, sous les bras, à l'aine ; enflé, il grossit, durcit ou suppure | 49-merck-gonflement-ganglions-lymphatiques.md. **Emplacement chez le rongeur : `[À VÉRIFIER]`**, aucune source trouvée |
| [^3] ulcère | §6, dernière ligne | Plaie ouverte douloureuse à l'endroit de l'écorchure, doigt ou main ; ganglions de l'aisselle qui gonflent et font mal, peau qui peut crever et laisser couler du pus | 49-merck-tularemie-grand-public.md ; « ulcère cutané douloureux au site d'entrée » concorde avec 49-melccfp-tularemie-fiche-information.md |
| [^4] poisseuse | §7, chair verdâtre | Colle au doigt, film gluant qui s'étire ; c'est la substance visqueuse des microbes d'altération | 49-mapaq-guide-hygiene-substance-visqueuse.md (+ PDF enregistré) |
| [^5] ÉVAM | §8, bloc 3 | Définition du sigle | 49-sante-canada-evam-definition.md (+ PDF des définitions enregistré) |
| [^6] CT | §9, L'eau, dégradée | Concentration de chlore résiduel (mg/L) × temps de contact (min), avec deux exemples calculés | 49-sante-canada-concept-ct.md (page anglaise ; les exemples sont de l'arithmétique) |

**Hésitations de la passe paperasse :** la ligne « ÉVAR » est réglée (correction + note). Les autres (« on note l'endroit », « aucune source consultée… », fenêtre d'incubation, numéros gardés) ne touchent ni au légal ni à un signe : laissées telles quelles.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/49-verifications.md`. Une ligne par chiffre changé ou confirmé.

- **Ganglions de la bête** (note [^2]) — emplacement chez le rongeur introuvable, retiré. Gardé ce qui est sourcé : noyés dans le gras, que le parage enlève (`sources/42-sac-mdc-aliments-traditionnels.md`) ; plus gros et plus pâles chez un animal atteint de tularémie (`sources/49-melccfp-tularemie-fiche-information.md`) ; chez l'humain, forme de fève, cou, aisselles, aine, dur ou suppurant (`sources/49-merck-gonflement-ganglions-lymphatiques.md`).
- **Lessive de cendres contre *F. tularensis*** (§9) — concentration et temps de contact introuvables ; la phrase-drapeau est coupée, la règle « la lessive dégraisse, la chaleur assainit » reste. Aucune source.
- **Délai mortel du mal de caribou** (§8, bloc 3) — « deux à trois semaines » remplacé par « quelques semaines » (décision du livre ; le récit source dit « several weeks »). `sources/21-speth-spielmann-1983-stefansson-mal-de-caribou.md`.

## Renvois vers les chapitres nouveaux — 24 septembre 2026

Renvoi seulement, aucun chiffre ajouté.
- §2, « Quand ces trois-là sont le bon choix » : la chasse à la .22 de l'écureuil et du rat musqué renvoie au ch. 43b (étapes 24 à 29 et 37 à 39).
- Pas de renvoi au ch. 35d : son étape 44 vise l'oiseau et le lièvre, et le 43b (étape 40) y renvoie déjà.

- Compression §3 et §4 — 27 septembre 2026 : 1 407 mots → 294 mots ; matériel coupé : tablier, savon et eau chaude, eau pour mouiller la fourrure, fusil ou pierre à affûter (le morfil passe sur la ligne du couteau, note [^1] gardée), sécateur, planche réservée, deux contenants, sacs de congélation et marqueur, balance, contenant à gras de marmotte, trousse ; §3 : coupés le 121 °C en chaleur humide, les citations sur le musc et la survie au froid, le calendrier de gras (déjà en §2 et §8) ; « jamais de gant de cuir » passé sur la ligne des gants.
