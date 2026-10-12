> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 62. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 62, Le sel

- **Fichier :** `chapitres/62-le-sel.md`
- **Tome :** 4 — Conserver et réparer
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (technique), 4 (sécurité) et de la
  **relecture humaine externe obligatoire**
- **Ampleur :** ≈ **5 100 mots utiles** (7 580 mots bruts, tableaux et section 10 compris).
  Procédure numérotée en 31 étapes réparties en cinq blocs, six tableaux, encadré DANGER à
  trois points, variante d'urgence à trois volets.
- **Note du suivi maître :** « Salpêtre vs nitrite ». Traitée comme **l'axe structurant du
  chapitre**, pas comme une note en passant : elle occupe le sixième principe de la §3, tout le
  bloc D de la §5, et le premier point de l'encadré DANGER.

---

## 0. Ce qu'il faut savoir avant de lire le reste

**Le budget de recherche web du poste était épuisé au premier appel** (200 `WebSearch` sur 200),
exactement comme au chapitre 48. Toute la documentation s'est faite par **récupération directe
d'URL** (`WebFetch`), en partant des adresses déjà validées aux dossiers des ch. 12, 26, 34 et
42. Conséquence honnête : les six pages captées sont bonnes et de première main, **mais rien ne
garantit qu'une meilleure page n'existe pas**, en particulier sur la toxicité aiguë du nitrite
et sur la salinité du Saint-Laurent. Un poste avec du budget doit refaire une passe sur ces
deux sujets.

**Six adresses ont répondu 404 ou 500 le 2026-09-20** et ne sont donc pas au dossier :
`reptox.cnesst.gouv.qc.ca` (deux tentatives, répertoire toxicologique — **c'était la piste la
plus prometteuse pour une dose toxique de nitrite**),
`dfo-mpo.gc.ca/oceans/publications/soto-rceo/.../estuary-estuaire` (salinité),
`parcs.canada.ca/amnc-nmca/qc/saguenay/nature` (HTTP 500, salinité),
`planstlaurent.qc.ca/fr/le_saint_laurent.html`,
`ressources-naturelles.canada.ca/.../faits-sur-le-sel`, et la page de Santé Canada sur le sodium
(`.../saine-alimentation/sodium.html`), qui répond mais **ne contient aucun chiffre** : ni AMT,
ni apport moyen, ni équivalence sel-sodium. C'est une surprise qu'il faut consigner, parce que
c'est la page vers laquelle un vérificateur ira naturellement.

**Découverte de navigation majeure, à propager.** Le facteur de conversion officiel
**« 1 g sodium = 2,53 g de sel de table »** se trouve dans le PDF des ANREF de Santé Canada, au
tableau des facteurs de conversion et en note 25 du tableau des éléments. Il n'est **pas** sur
les pages HTML sur le sodium. Le PDF n'est pas lisible tel quel par `WebFetch` : il a fallu le
récupérer puis le convertir avec `pdftotext -layout`. **Les ch. 26, 63, 64, 71 et 73 devraient
tous utiliser ce facteur**, et aucun ne l'avait jusqu'ici.

**Correction de méthode pour tout le tome 4.** La page de l'ACIA sur les nitrites donne des
**niveaux d'incorporation dans la viande**, en ppm de viande. Le réflexe naturel — et l'erreur
que le livre a failli commettre — est de lire « 20 g par 100 kg » comme un dosage de sac. Ce
n'en est pas un : le mélange du commerce est du nitrite **dilué dans du sel**, et la conversion
passe obligatoirement par la teneur déclarée sur l'étiquette. Le chapitre donne donc une
**formule** et pas un chiffre, et la teneur est posée comme une variable. **C'est la question
bloquante du relecteur externe.**

**Conventions posées ici pour les ch. 63, 64, 65, 66, 71, 72, 73 et 77.** Le ch. 62 est le
premier écrit du bloc du sel. Cinq décisions sont prises ici et doivent être reprises telles
quelles en aval :
1. Le pourcentage est une **dose appliquée** sur le poids de la viande parée, pas une teneur
   finale. La teneur finale est plus élevée, parce que la pièce perd de l'eau.
2. En saumure, **le pourcentage annoncé se lit contre la viande**, jamais contre le volume
   d'eau. La façon dont la masse d'eau entre dans le calcul est renvoyée au ch. 64, qui doit
   trancher explicitement.
3. **Aucune quantité de salpêtre**, nulle part, et pas de table de conversion nitrate-nitrite.
   Une recette ancienne se refait au mélange moderne ; elle ne se convertit pas.
4. Le **9 % de sel** de Santé Canada et du MAPAQ est un seuil réglementaire de définition de
   produit. Il sert d'ordre de grandeur, **jamais** de cible domestique. Les ch. 71 et 72 sont
   prévenus.
5. Le **dessalage n'est pas facultatif** dès qu'un enfant mange à la table. Le calcul est à
   l'étape 16.

**Demande à l'éditeur.** Le tableau C du ch. 8 porte « 5 à 10 kg pour la famille » de sel de
salaison, marqué `[À VÉRIFIER]`. Le ch. 62 fournit maintenant la **méthode de calcul** qui doit
la remplacer (bloc E, étape 25). Les deux chapitres doivent être harmonisés avant impression :
soit le ch. 8 renvoie au calcul du ch. 62, soit le ch. 62 reprend le chiffre du ch. 8. **Ils ne
peuvent pas rester tous les deux en l'air.**

---

## 1. Les chiffres marqués `[À VÉRIFIER]`

| # | Valeur | Où dans le chapitre | Pourquoi elle n'est pas sourcée | Piste |
| --- | --- | --- | --- | --- |
| 1 | **Teneur de 6,25 % en nitrite de sodium** d'un mélange de salaison du commerce | §5, bloc D, étape 21 | **Aucune source officielle canadienne ne fixe cette teneur.** C'est une composition commerciale, pas une norme. Le chapitre l'emploie uniquement pour illustrer la formule et écrit en toutes lettres que « c'est la formule qui est la règle, pas le 3,2 » | Étiquettes des mélanges vendus au Québec. Fabricants. Le relecteur externe est saisi de la question |
| 2 | **5 à 10 kg de sel de salaison pour la famille** | §5, bloc E, étape 26 | Reprise du tableau C du ch. 8, où elle porte déjà la mention `[À VÉRIFIER]`. Aucune source, aucune provenance | Se remplace par la **mesure réelle** après une saison complète au sel. C'est un chiffre qui se mesure, pas qui se cherche |

**Deux valeurs sont des choix éditoriaux assumés, et le chapitre le dit :** la tolérance de 1 %
sur la vérification de la balance (§5, étape 7, et §6), et la précision de 0,1 point sur le
calcul inverse du pourcentage (§6). Ce ne sont pas des chiffres sourcés et ils ne prétendent pas
l'être.

**Chiffres sourcés et fermes du chapitre** (ne pas les rouvrir sans source contraire) :
**200 ppm de nitrite de sodium, soit 20 g par 100 kg** (ACIA) · **120 ppm** pour le bacon de
flanc (ACIA) · **200 ppm de nitrate de sodium** en saumurage lent (ACIA) · **62 g de nitrite et
186 g de nitrate par 100 kg** au salage à sec sur claies (ACIA) · **200 ppm** pour le nitrate et
le nitrite de potassium (Santé Canada, liste 11) · **13 ppm** de ferrocyanure dans le sel
(Santé Canada, liste 8) · **a_w < 0,97** et **a_w < 0,94** (Santé Canada) · **sous 3 °C** et
**sous 10 °C** (Santé Canada) · **4 °C ou moins** (Santé Canada, MAPAQ) · **9 % de sel, méthode
FO-38** (Santé Canada, MAPAQ) · **≤ 14 jours** (Santé Canada) · **1 g sodium = 2,53 g de sel**
(Santé Canada, ANREF) · **AMT sodium 1 500 / 1 900 / 2 300 mg/j** selon l'âge (Santé Canada,
ANREF) · **74 °C à cœur** (MAPAQ).

**Conversions faites par le livre**, toutes montrées en toutes lettres dans le texte pour être
refaisables : 1,5 × 2,53 = **3,8 g de sel/jour** (1-3 ans) · 1,9 × 2,53 = **4,8 g/jour**
(4-8 ans) · 2,3 × 2,53 = **5,8 g/jour** (adulte) · 1 ÷ 2,53 = **0,395**, donc un sel à
**39,5 % de sodium** · 20 ÷ 6,25 = **3,2 g de mélange par kg de viande**, cette dernière
dépendant du `[À VÉRIFIER]` n° 1.

**Salpêtre :** nommé cinq fois, **jamais en quantité**, toujours accompagné de sa forme moderne
équivalente et du mécanisme qui explique pourquoi les deux ne se dosent pas pareil. Conforme au
gabarit et à `CLAUDE.md`.

**Pourcentages de sel :** toujours sur le poids de la viande. Vérifié ligne par ligne, y compris
dans le cas de la saumure, où le chapitre prend la peine de dire que l'eau n'est pas la
référence.

**Noms latins :** *Alces americanus* (§2), *Ursus americanus* (§2), *Clostridium botulinum*
(§3, §8), *Trichinella* (§8), *Salvelinus fontinalis* (§8). Conforme au gabarit.

**Aucune date de saison, aucune limite de prises, aucune zone.** Vérifié : le chapitre ne parle
d'aucune espèce sous l'angle du prélèvement.

---

## 2. Images requises

| # | Format | Sujet | Cadrage demandé | Source |
| --- | --- | --- | --- | --- |
| 62-01 | **Pleine page** | **L'image clé du chapitre.** Les six sels côte à côte : sel à marinade, gros sel de salaison, sel de table iodé, sel de mer non raffiné, mélange de salaison nitrité, sel de déglaçage | Six carrés égaux, **même éclairage, même distance, même grandissement**, une règle graduée en millimètres traversant le cadre pour l'échelle. Aucune étiquette dans l'image : la légende nomme, l'image montre. **Le message est qu'ils se ressemblent tous** | Photo de JP |
| 62-02 | **Demi-page** | Les deux étiquettes côte à côte, en macro : la liste d'ingrédients d'un sac de sel à marinade (un mot) et celle d'un sel de table (quatre lignes) | Macro, texte **net à l'impression** — c'est la seule exigence, et elle est absolue. Fond neutre, les deux sacs au même angle | Photo de JP |
| 62-03 | **Demi-page** | La pesée complète en un cadre : le quartier sur la grosse balance, le sel dans un contenant taré sur la petite, le carnet ouvert avec le calcul écrit à la main | Plan large en plongée, table de travail. Les trois chiffres doivent être lisibles : poids de viande, poids de sel, pourcentage. **C'est la §5 en une image** | Photo de JP |
| 62-04 | **Demi-page** | Planche dessinée : coupe d'une pièce de viande montrant la diffusion du sel de la surface vers le centre, la couche de gras en barrière, et l'os de l'articulation en écran | Planche à dessiner, pas une photo. Gradient de concentration, **point le plus lent repéré par le même symbole que la sonde du 48-02**, couche de gras en aplat distinct. C'est le quatrième principe de la §3 | À dessiner |
| 62-05 | **Quart de page** | Planche dessinée : l'activité de l'eau en curseur, de 1,00 à 0,90, avec **0,97** et **0,94** marqués et l'organisme inhibé à chaque seuil | Planche à dessiner. Une seule échelle horizontale, deux repères, deux étiquettes. **Les deux valeurs sont sourcées (Santé Canada) : elles doivent être imprimées sur la planche** | À dessiner |
| 62-06 | **Quart de page** | Le contenant de nitrite dans son local séparé : verrouillé, étiqueté en toutes lettres, avec la balance de bijoutier à côté | Photo frontale, étiquette lisible. **C'est l'encadré DANGER en une image** | Photo de JP |
| 62-07 | **Quart de page** | Deux pots de sel blanc identiques dont les étiquettes sont effacées ou décollées | Frontal, fond sombre. C'est le signe d'échec n° 3 de la §7, celui dont la seule réponse est de jeter les deux. **Ne pas mettre de sel rose dans l'image** : le message est que la couleur ne sauve pas | Photo de JP |
| 62-08 | **Quart de page** | Évaporation d'eau de fleuve en quatre vignettes : eau filtrée dans le chaudron large, réduction, premiers cristaux à l'écumoire, sel séché et pesé sur la balance | Même cadre, même distance, même angle pour les quatre. Serré sur le chaudron. La quatrième vignette **doit montrer le chiffre sur la balance** : c'est tout le propos de la §9 | Photo de JP, **projet d'été** |

**Note pour `images/credits.md` :** aucune image versée. Six photos de JP à prendre, deux
planches à dessiner. **62-01 et 62-02 sont les deux images les plus faciles du livre** — six
sacs de sel sur une table, aucune saison, aucune bête, aucun déplacement — et ce sont celles qui
portent le plus de contenu. À faire en premier. **62-08 dépend d'un chantier d'été** et ne
bloque pas le reste. Aucune image de substitution n'a été cherchée sur Wikimedia Commons : une
photo de sel générique ne montrerait pas la comparaison, qui est tout l'intérêt de 62-01.

---

## 3. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 1 | Les quatre horloges — le bois brûlé à évaporer de l'eau de mer est une ponction directe (§9) |
| 8 | **Renvoi à harmoniser.** Tableau C, stock de sel. Voir la demande à l'éditeur en §0 |
| 13 | Fondre la neige et l'eau : même feu, même bois que l'évaporation de la §9 |
| 15 | Poêles et rendement — le coût en bois de la variante d'urgence |
| 26 | **Renvoi important.** Le sel iodé est la seule source d'iode de la maisonnée. Un chalet qui bascule à la salaison la perd sans s'en rendre compte |
| 34 | Calendrier — la commande annuelle de sel passe avant tout le reste, et l'inventaire se fait au même moment |
| 36 | Le 74 °C, et l'abattage en amont de toute salaison |
| 37 | Poids de viande à traiter, pour le calcul du stock (étape 25) |
| 38, 39 | Le démontage décide de l'épaisseur des pièces, donc de la pénétration du sel |
| 43 | Mercure du poisson — le sel ne retire pas un métal |
| 48 | **Ours noir : fermé au sel tant qu'il n'a pas vu 74 °C** |
| 52 | **Phoque : idem.** Les deux chapitres et celui-ci doivent dire la même chose |
| 53 | Recommandations de consommation du poisson |
| 61 | Pourquoi la viande pourrit — le sel arrête ce qui n'a pas commencé, il ne recule pas |
| 63 | Salaison à sec — suivi de perte de masse, dessalage, température de travail |
| 64 | **Saumure — doit trancher explicitement** comment la masse d'eau entre dans le calcul |
| 66 | Fumage à chaud et séchage — barrière de remplacement quand le sel manque |
| 67 | Pemmican et graisses — mise sous graisse, et le risque d'anaérobiose qui va avec |
| 68 | Froid naturel — la vraie variante d'urgence quand le sel manque |
| 71 | Saler et sécher la truite — dessalage, et le 9 % à traiter avec le relecteur |
| 72 | Fumer le poisson — le 3 °C, le 4 °C et le 9 % s'y retrouvent tous les trois |
| 77 | Fermentation — pourcentages sur le poids, et les additifs du sel de table |
| 79 | De la peau au cuir — **le sel des peaux est un stock séparé qui ne revient jamais à la cuisine** |

**Renvois reçus attendus.** Les ch. 63, 64, 65, 66, 71, 72, 73 et 77 doivent **chacun** pointer
ici pour le choix du sel, la pesée et le pourcentage, au lieu de les réexpliquer. Les ch. 48 et
52 doivent porter une ligne disant que le ch. 62 leur est fermé avant 74 °C — c'est déjà le cas
au ch. 48. Le ch. 26 doit pointer ici pour l'iode. **C'est la demande la plus importante de
cette fiche à l'éditeur : sans ces renvois entrants, chaque chapitre du bloc du sel va réécrire
la §5 à sa manière, et c'est exactement ce que le gabarit cherche à empêcher.**

---

## 4. Relecteur humain

**OBLIGATOIRE.** « Le sel » figure sur la liste de `CLAUDE.md`. Marqué en tête du fichier
chapitre par un bandeau, et détaillé à la §10.

**Profil requis : technologue ou ingénieur en sciences et technologie des aliments spécialisé en
transformation des viandes** — Université Laval (sciences et technologie des aliments) ou ITAQ.
À défaut, inspecteur du MAPAQ affecté aux contrôles préventifs en transformation des viandes,
Direction générale de la santé animale et de l'inspection des aliments, 1 800 463-5023. En
second recours, un microbiologiste alimentaire.

Six questions, dans cet ordre, reprises intégralement à la §10 du chapitre :

1. **Bloquante. La formule de conversion de l'étape 21 est-elle juste, et est-elle sécuritaire à
   publier ?** Elle transforme la limite réglementaire de 200 ppm dans la viande en masse de
   mélange du commerce, à partir de la teneur déclarée : masse (g) = 20 × M ÷ T. **Si la
   conversion est fausse ou s'il y manque un facteur, l'étape 21 saute** et le livre renvoie
   à l'étiquette du fabricant sans donner de calcul.
2. Quelle est la teneur réelle en nitrite des mélanges vendus au Québec, et est-elle uniforme ?
3. Le **9 %** de Santé Canada et du MAPAQ : le chapitre l'emploie comme ordre de grandeur et
   jamais comme cible domestique. Est-ce la bonne lecture, et faut-il une teneur cible pour les
   ch. 71 et 72 ?
4. Le gras comme barrière quasi infranchissable et l'os comme point lent d'un quartier sont des
   **déductions de diffusion, non sourcées**. À confirmer ou à retirer.
5. La consigne d'entreposage du nitrite est-elle suffisante, et existe-t-il une consigne
   officielle canadienne qui la double ?
6. Le calcul de charge de sel pour un enfant de 4 à 8 ans (étape 16) est-il correctement
   présenté, l'AMT étant une valeur quotidienne et la salaison n'étant pas la seule source de
   sodium de la journée ?

---

## 5. Points à surveiller aux portes 3 et 4

**Vérificateur technique :**

- Les **quatorze citations** (ACIA, Santé Canada ×3, INSPQ, MAPAQ) sont-elles reproduites **mot
  à mot** ? Deux particularités de source à ne pas « corriger » : Santé Canada écrit « 4oC » et
  « 3°C » avec des espacements irréguliers dans la version française du document sur le poisson
  fumé, et l'ACIA écrit « salés à sec sur des étagères » là où le livre parle de claies — le
  chapitre emploie **claies** dans son texte et **étagères** dans la citation. C'est voulu.
- **La capture de la liste 11 de Santé Canada est tronquée** : elle donne le nitrate et le
  nitrite de **potassium** (entrées P.7 et P.8), pas ceux de **sodium**, qui sont plus loin dans
  la liste alphabétique. Les 200 ppm du sodium viennent de l'ACIA. Les deux sources concordent,
  mais **le fichier de source le dit** et il ne faut pas laisser croire que la liste 11 a été
  captée en entier.
- Vérifier que le chapitre ne fait **jamais** dire à la page des nitrites de l'ACIA qu'elle
  parle de botulisme : elle n'en parle pas. Le lien nitrite-botulisme n'est **pas** fait dans ce
  chapitre, volontairement, faute de source. Si un vérificateur trouve ce lien ailleurs dans le
  livre, il faut le sourcer ou le retirer.
- Le seuil **a_w < 0,94** pour les souches protéolytiques est **nouveau au dossier** : il ne
  figure dans aucune des trois captations antérieures du même document (ch. 7, 22, 42). À
  propager au ch. 72.
- L'affirmation « une tasse de sel fin et une tasse de gros sel ne pèsent pas la même chose »
  (étape 6) n'est **pas chiffrée**, volontairement : aucune masse volumique n'est donnée. Si le
  vérificateur juge qu'un chiffre est nécessaire, il faut une source, pas une estimation.
- Vérifier qu'aucun renvoi ne pointe vers un chapitre inexistant. Les 23 renvois du tableau §3
  ont été vérifiés contre la liste des 89.

**Vérificateur sécurité :**

- **L'encadré DANGER a trois points**, chacun avec son mécanisme : méthémoglobinémie
  (oxydation du fer de l'hémoglobine), trichinellose (larve enkystée dans la fibre, hors de
  portée du sel), botulisme de type E (croissance au-dessus de 3 °C, anaérobiose, toxine
  invisible). Aucun n'est un simple « attention ».
- **Vérifier que le n° 1 est bien en tête.** C'est le danger que le chapitre crée lui-même en
  proposant le nitrite au bloc D. Si le relecteur externe juge la formule de l'étape 21 non
  publiable, **le bloc D et le DANGER n° 1 sautent ensemble** — et le chapitre devient plus
  court et plus prudent, ce qui est acceptable.
- Deux sujets ont été **volontairement tenus hors** de l'encadré pour ne pas le diluer : les
  sels non alimentaires (déglaçage, adoucisseur), traités au bloc A avec une règle nette ; et la
  charge de sodium des enfants, chiffrée à l'étape 16. Ni l'un ni l'autre n'est un risque de
  mort à l'échelle d'un repas. **Décision à confirmer, pas à repousser.**
- Le chapitre **ne donne aucune dose toxique de nitrite**, faute de source canadienne. Vérifier
  que le texte ne laisse pas croire, par prudence excessive ou par formulation vague, qu'une
  quantité précise est connue du livre.
- Vérifier que rien dans le texte ne laisse entendre que le sel « aide un peu » contre la
  trichinellose ou contre le botulisme. La position du livre est binaire pour le parasite et
  graduelle pour la bactérie, et les deux sont énoncées séparément.
- **§9, variante d'urgence :** vérifier que le refus de chiffrer le rendement de l'évaporation
  est bien lisible comme un refus, et non comme un oubli. C'est une décision, et elle est écrite.

## Notes retirées du chapitre — 23 septembre 2026

Bandeau de tête du chapitre :

> ⚠ **RELECTURE HUMAINE EXTERNE OBLIGATOIRE — TECHNOLOGUE OU INGÉNIEUR EN SCIENCES ET
> TECHNOLOGIE DES ALIMENTS, SPÉCIALISÉ EN TRANSFORMATION DES VIANDES.**
> Ce chapitre ne part pas à l'impression sans la relecture d'une personne compétente en
> **salaison des viandes** extérieure au projet — programme de sciences et technologie des
> aliments (Université Laval, ITAQ), ou inspecteur du MAPAQ affecté aux contrôles préventifs
> en transformation des viandes (1 800 463-5023). Point à faire trancher en priorité : **la
> formule de conversion entre la limite réglementaire de 200 ppm et une masse de mélange de
> salaison du commerce** (section 5, bloc D). Deuxième point : **la teneur en nitrite des
> mélanges vendus au Québec**, que le livre refuse de poser comme une constante. Quatre points
> suivent : le 9 % de Santé Canada employé comme ordre de grandeur et jamais comme cible
> domestique, le gras et l'os comme barrières de diffusion (déduction du livre, non sourcée),
> la consigne d'entreposage du nitrite, et le calcul de charge de sel de l'enfant (étape 16).

Étape 26 (bloc E) :

> C'est le présent chapitre qui doit fournir le calcul qui la
> remplace ; tant que le chalet n'a pas fait une saison complète au sel, la fourchette de
> référence reste celle du chapitre d'achat et le chiffre réel se mesure.

## Passe légal et signes — 23 septembre 2026

Retiré du chapitre (règle : pas de code légal, pas de réglementation) :

- §3 : « Les limites réglementaires le confirment : pour les produits salés à sec sur claies, le
  maximum est de « 62 g de sel de nitrite de sodium et 186 g de sel de nitrate par 100 kg de
  produit de viande ». Deux produits interchangeables cuillère pour cuillère n'auraient pas deux
  limites dans la même phrase, dans un rapport de un à trois. » Le mécanisme (le nitrate n'agit
  qu'une fois réduit en nitrite par la flore) reste et porte seul le refus du salpêtre.
- Étape 2 : « ce qui peut **légalement** se trouver », « autorisés comme adjuvant », le plafond
  de **13 ppm** de ferrocyanure et « autorisés comme stabilisant ». Reste ce que contient le sac
  et à quoi sert chaque additif. Source inchangée : `sources/62-sante-canada-additifs-dans-le-sel.md`.
- Étape 5 : « Le livre n'a pas retrouvé de disposition canadienne qui l'exige » (doute de la
  passe paperasse, ligne 62). Reste : le rose est courant, le livre ne compte pas dessus.
- Étape 19 : « les limites réglementaires des deux produits sont fixées séparément — jusqu'à
  62 g … 186 g … pour le salage à sec sur claies ».
- Étape 20 : la citation « la quantité maximale … pouvant être ajoutée » est redite comme un
  plafond de dose (20 g de nitrite de sodium par 100 kg, 200 ppm ; bacon de flanc 12 g par
  100 kg, 120 ppm). Chiffres inchangés, source inchangée : `sources/62-acia-nitrites-saumurage.md`.
- §8, point 1 : « la réglementation plafonne le nitrite à 200 ppm » devient « le plafond de dose
  est de 200 ppm ».

Signes : aucune note ajoutée. Les états nommés (sel en croûte, surface filante, saumure trouble,
fond sirupeux et amer, écume brune) sont décrits là où ils sont nommés.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/62-verifications.md`, appliqués au chapitre. Une ligne par
chiffre changé ou confirmé.

- Bloc D, étape 21 : poudre de Prague à **6,25 %** de nitrite de sodium, confirmé ; calcul
  20 ÷ 6,25 = **3,2 g** par kilogramme de viande refait, juste. `sources/61-acia-nitrites-salpetre.md`
  (même page ACIA que `sources/62-acia-nitrites-saumurage.md`).
- Bloc E, étape 26 : « 5 à 10 kg pour la famille » introuvable, coupé ; l'étape renvoie au
  calcul de l'étape 25, sans renumérotation.
- §9, premier étage (le gel) : limite basse **vers -21 °C** (point eutectique, 23,3 %) ; saumure
  liquide à **-11 °C ≈ 15 %** de sel (source : -11,1 °C), à **-18 °C ≈ 20 %** (source :
  -17,8 °C). `sources/14-fhwa-saumure-point-eutectique.md`.
- §9, « La balance se répare » : plage de température des balances introuvable, dit sans chiffre.
- §9, « Le bois, si on évapore au feu seul » (note A de la fiche, phrase sans drapeau) :
  salinité **27 à 29 g de sels par litre**, donc bien plus de 35 L d'eau par kilo de sel.
  `sources/13-universite-laval-salinite-saint-laurent.md`.

Compression §3 et §4 — 27 septembre 2026 : 1564 mots → 236 mots (§3 : 753 → 120 ; §4 : 811 → 116), format validé par JP (une ligne par item) ; matériel coupé : balance 0 à 50 kg (le fléau et la romaine restent en §9), sel de table iodé (étape 17), contenants hermétiques opaques pour le stock (étape 29), contenant séparé étiqueté pour le nitrite (fait gardé à l'étape 24 et au §8 point 1), palettes et madriers (étape 29), étiquettes et marqueur (les trois nombres du bac restent au §7), les colonnes Quantité / Substitution / Négociable, les rechanges, et le paragraphe « Trois remarques » (le métal reste dans la ligne du bac et au §9). §3 : définition de l'activité de l'eau, seuils 0,97 / 0,94 (0,97 reste au §8, 0,94 au §1), formation spontanée de la saumure (déjà au §7), renvois aux ch. 63-64 et au ch. 68-77 coupés ; le nitrate converti par la flore gardé en une phrase (le §9 y renvoie).
