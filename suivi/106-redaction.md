> **Renuméroté une deuxième fois le 27 septembre 2026** (agriculture au tome 5) : chapitre 102 avant cette date. Table : plan/renumerotation-2.json.

> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 83. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 83, Scie à chaîne et petits moteurs

- **Tome :** 4 — Conserver et réparer
- **Fichier :** `chapitres/83-scie-a-chaine-et-petits.md`
- **Poste :** rédacteur (rôle 2)
- **Date :** 2026-09-20
- **Ampleur :** **environ 7 970 mots utiles**, marquage et URL retirés — dont **6 590** de prose
  et de tableaux, et **1 383** pour la section 10. Répartition : §1 60 · §2 418 · §3 315 ·
  §4 544 · §5 2 596 · §6 514 · §7 484 · §8 970 · §9 512 · §10 1 383 · entête 170.
- **Gabarit :** les dix points, dans l'ordre, avec les titres du gabarit, section 8 titrée
  « Danger » comme au gabarit (et non « DANGER » comme aux ch. 71 et 72). Procédure numérotée
  conservée, **46 étapes**, sous-sections 5-A à 5-I. La 5-I remplace les étapes par un tableau
  machine par machine, parce qu'il n'y a pas de procédure commune à une génératrice et à un
  hors-bord — seulement des différences à connaître.
- **Statut :** premier jet complet. Aucune relecture interne, par principe (`CLAUDE.md`).

---

## 0. L'écart d'ampleur, à trancher par l'éditeur

Le mandat de rédaction demandait **2 500 à 5 000 mots**. Le chapitre en fait **près de 8 000**.
C'est un écart assumé et il est signalé ici plutôt que caché.

**Pourquoi.** Le chapitre couvre trois sujets qui ne se séparent pas proprement : la machine
(entretien, diagnostic, réparation), le geste (abattage directionnel, avec une géométrie
chiffrée par un organisme réglementaire), et cinq mécanismes mortels distincts. Couper l'un
des trois donne un chapitre qui ment par omission.

**Le point de comparaison du livre.** Les chapitres voisins du tome 4 sont à la même hauteur :
ch. 70 à 6 674, ch. 71 à 7 003, ch. 72 à ~7 000, ch. 73 à ~6 900. À 700 mots la page, le
chapitre 83 fait **environ 11 pages** en 8 × 10. Le tome 4 compte 29 chapitres pour un maximum
de 440 pages ; à cette densité, il tient.

**Ce qui se coupe si l'éditeur veut revenir dans la fourchette.** Dans cet ordre, du moins
coûteux au plus coûteux : (a) la section 5-I, les autres petits moteurs, ~330 mots, qui
pourrait devenir un chapitre à part ou un renvoi au ch. 85 ; (b) les questions au relecteur de
la section 10, ~290 mots, qui ont leur place ici, dans le suivi, plutôt que dans le livre
imprimé ; (c) le tableau des trous `[À VÉRIFIER]`, ~700 mots, même raisonnement. Les trois
ensemble ramènent le chapitre à ~6 650 mots. **Rien ne se coupe dans les sections 5-C, 6, 7
et 8 sans perte de sécurité.**

---

## 1. Les chiffres `[À VÉRIFIER]` et les trous assumés

Quatre marqueurs `[À VÉRIFIER]` dans le corps du texte, et **quatorze entrées** au tableau de
la section 10. L'écart entre les deux nombres est voulu : la plupart des trous de ce chapitre
ne sont pas des chiffres douteux publiés, ce sont des **chiffres que le chapitre a refusé de
publier**. Un trou déclaré ne porte pas de marqueur, parce qu'il n'y a rien à marquer.

### Les quatre marqueurs dans le corps

| Où | Ce qui est marqué | Pourquoi |
| --- | --- | --- |
| §5-D étape 25 | « sur environ le tiers » pour la coupe côté comprimé du bois sous tension | Proportion de métier, absente des pages officielles captées |
| §5-G étape 40 | « en quelques minutes de pleine charge » pour le grippage d'un deux temps trop pauvre | Mécanisme certain, durée non sourcée |
| §7, ligne « monte en régime puis retombe » | Même durée, même raison | Répété parce qu'on ouvre le livre à une page |
| §8 point 2 | Le caractère superficiel de l'artère fémorale à la cuisse | Affirmation anatomique du livre, non sourcée. **Dans l'encadré DANGER** |

### Les quatorze trous de la section 10

| # | Ce qui manque | Ce que le chapitre fait | Qui tranche |
| --- | --- | --- | --- |
| 1 | Rapport de mélange deux temps | Aucun rapport publié. Renvoi au bouchon et au manuel | Relecteur humain, Q2 |
| 2 | Angle d'affûtage, hauteur de limiteur, écartement de bougie, couple des écrous de guide | Aucun nombre. Renvoi ch. 82 et manuel | Mécanicien |
| 3 | Durée de vie d'un mélange | Aucune durée publiée | Vérificateur technique |
| 4 | Point d'éclair de l'essence | Mécanisme donné, aucun chiffre. **Le −43 °C qui circule partout n'est sur aucune page captée** | Vérificateur technique |
| 5 | **Divergence CNESST / CCHST** : entaille 1/3 vs 1/4–1/5, distance 22,5 m vs 7,5 m | Retient la CNESST, déclare l'écart au lecteur | **Relecteur humain, Q1** |
| 6 | Proportion et position pour le bois sous tension | Principe des deux temps, `[À VÉRIFIER]` sur le tiers | Relecteur humain, Q3 |
| 7 | Méthode de dégagement d'arbre encroué | **Refuse d'en décrire une** | **Relecteur humain, Q3** |
| 8 | Distance de 6 m captée en anglais seulement | Publie le chiffre, déclare la captation | Vérificateur technique |
| 9 | Dates de transition des normes de pantalon | Aucune date publiée | Vérificateur technique |
| 10 | Anatomie fémorale et délai avant perte de conscience | Aucun chiffre | **Second relecteur médical** |
| 11 | Temps de grippage | `[À VÉRIFIER]` | Mécanicien |
| 12 | Accélération vibratoire d'une scie donnée, en m/s² | Non publiée. Le chapitre dit que sans elle, la limite de 5 m/s² ne permet aucun calcul | Vérificateur technique |
| 13 | Seuil d'abstention pour un opérateur seul | Aucun. Raisonne par prévisibilité, pas par diamètre | **Relecteur humain, Q4** |
| 14 | Rapport de débit godendard / scie à chaîne | Aucun chiffre | Éditeur |

### Le trou n° 5 est le plus lourd du chapitre

**Deux organismes officiels donnent des chiffres différents pour le même geste.**

| | CCHST (fédéral) | CNESST (Québec) | Retenu |
| --- | --- | --- | --- |
| Profondeur d'entaille | 1/4 à 1/5 du diamètre | **minimum 1/3** | CNESST |
| Distance | s'éloigner d'au moins **7,5 m** de l'arbre qui part ; personne à moins de 2 longueurs d'arbre | zone de sécurité **≥ longueur de l'arbre, jamais < 22,5 m** | CNESST |
| Charnière | ~1/10 | ~1/10 sur toute sa longueur | concordent |
| Trait d'abattage | 2,5 à 5 cm plus haut | ≥ 2,5 cm plus haut | concordent |

**Le raisonnement du rédacteur :** la CNESST est l'autorité dont la réglementation s'applique au
Québec, et les deux distances ne mesurent probablement pas la même chose — 7,5 m est un recul
immédiat pendant la chute, 22,5 m est une zone à garder libre de tiers. Mais un lecteur qui n'a
que le CCHST devant lui se croira en sécurité à 7,5 m d'une épinette de 20 m. **Le chapitre
retient 22,5 m et montre l'écart.** Le relecteur doit confirmer cette lecture : c'est le seul
endroit du chapitre où le livre arbitre entre deux sources officielles.

---

## 2. Les images requises

Format d'impression : 8 × 10 po, Blurb photo book, papier standard couleur. Licences selon
`CLAUDE.md` : photos de JP en priorité, Wikimedia Commons filtré par licence, agences fédérales
américaines, planches du domaine public d'avant 1930. **Chaque image entre dans
`images/credits.md`.**

| # | Image | Cadrage | Format |
| --- | --- | --- | --- |
| 1 | **La géométrie d'abattage cotée.** Entaille de direction, charnière, trait d'abattage, avec les quatre cotes de la CNESST portées sur le dessin : ≥ 1/3 du diamètre, ≥ 45°, ≈ 1/10, ≥ 2,5 cm | Coupe de profil du tronc à hauteur de souche, sur fond blanc. Les cotes en chiffres, pas en légende renvoyée ailleurs — c'est la planche qu'on regarde avec les mains pleines | **Pleine page.** C'est la planche maîtresse du chapitre |
| 2 | **Les deux chemins de repli et la zone de sécurité.** Arbre au centre, direction de chute, deux couloirs à 45° vers l'arrière, cercle de 22,5 m coté | Vue de dessus, à l'échelle, avec une silhouette humaine pour donner l'échelle | **Demi-page** |
| 3 | **La zone de rebond.** Le quadrant supérieur du nez du guide en rouge, et l'arc de rotation de la scie autour du point de contact, remontant vers le visage | Vue de profil, opérateur schématique en position de coupe. L'arc doit aboutir visiblement à la tête, sinon l'image ne dit rien | **Demi-page.** À placer dans l'encadré Danger, pas ailleurs |
| 4 | **La gouge et le limiteur de profondeur.** Coupe latérale d'un maillon, avec la marche que forme le limiteur devant la gouge, et le copeau que ça arrache | Macro ou dessin au trait. Montrer les deux états : gouge neuve, et gouge limée dix fois avec un limiteur non abaissé qui ne mord plus | **Quart de page** |
| 5 | **Copeaux contre poudre.** Deux tas côte à côte : copeaux carrés d'une chaîne affûtée, poudre d'une chaîne morte | Photo à plat, même éclairage, même échelle, une pièce de monnaie pour l'échelle. **Photo de JP** — c'est facile à faire et ça ne se trouve pas en banque d'images | **Quart de page** |
| 6 | **Le pantalon de protection en coupe.** Les longues fibres arrachées et entraînées dans le pignon jusqu'au bourrage | Coupe schématique du pignon et du tissu. C'est le mécanisme du §8 point 2 : sans l'image, la consigne « pantalon non modifié » a l'air d'une formalité | **Quart de page** |
| 7 | **Le placement de la génératrice.** Maison, portes, fenêtres, évents, et le rayon de 6 m mesuré depuis les **ouvertures**, pas depuis le mur | Vue en plan. Montrer un placement incorrect à 8 m du mur mais devant une fenêtre | **Quart de page** |
| 8 | **Le démarrage au sol.** Pied dans la poignée arrière, main gauche sur la poignée avant, frein engagé, pouces enroulés **sous** les poignées | Photo, de côté, au niveau du sol. Détail rapproché des pouces en médaillon | **Quart de page** |
| 9 | **Le carburateur à membranes, éclaté.** Les pièces dans l'ordre de démontage, sur linge clair | Vue de dessus, à plat, pièces alignées. **Photo de JP** au moment du premier kit de membranes | **Demi-page** |

**Note au metteur en pages :** les images 1, 2 et 3 ne sont pas décoratives. Si le budget de
pages force un arbitrage, ce sont les trois dernières à sacrifier, et l'image 1 ne se sacrifie
pas du tout.

---

## 3. Les renvois vers d'autres chapitres

Tous vérifiés contre la liste des 89 chapitres et contre `/chapitres`. Aucun renvoi à un
chapitre inventé.

| Chapitre | Où, dans le ch. 83 | Ce que le renvoi porte |
| --- | --- | --- |
| **ch. 19 — Communiquer et savoir** | §4, §8 point 2 | Le moyen de communication porté sur le corps quand on travaille seul |
| **ch. 27 — Soigner quand il n'y a pas de médecin** | §4, §7 (deux fois), §8 point 2 | Hémorragie, syndrome vibratoire, atteinte auditive, intoxication au CO |
| **ch. 82 — Affûter, limer, aiguiser** | §4, §5-F (deux fois), §6, §7 (deux fois) | **Le renvoi le plus chargé.** Toute la géométrie de coupe, les angles, l'avoyage du godendard. Le ch. 83 ne publie aucun angle et compte entièrement sur le ch. 82 |
| **ch. 85 — Le stock de pièces et de consommables** | §4, §5-G, §5-I | Bougies, filtres, kits de membranes, stockage étiqueté par machine |
| **ch. 86 — Leviers, poulies, treuils** | §2, §5-D, §8 point 4 | Le treuil pour l'arbre encroué. Sans ce chapitre, le refus de décrire un dégagement manuel laisse le lecteur sans solution |
| **ch. 87 — Assemblages bois-bois** | §2 | Le bois de construction sorti de la talle |

### Renvois à demander aux rédacteurs des chapitres concernés

- **ch. 82** doit publier l'**avoyage** (écartement latéral des dents) d'une lame de godendard ou
  de sciotte, pas seulement l'affûtage de chaîne. Le ch. 83 §9 l'annonce.
- **ch. 86** doit couvrir le **dégagement d'un arbre encroué au treuil** comme cas d'usage
  nommé. Le ch. 83 y envoie le lecteur trois fois, dont une depuis l'encadré Danger.
- **ch. 85** doit lister le **kit de membranes de carburateur** par machine. Le ch. 83 l'appelle
  « la réparation la plus rentable du chalet ».
- **ch. 27** doit couvrir l'**hémorragie de membre** et le pansement compressif. Le ch. 83
  l'exige dans le matériel non négociable, sur la foi de la CNESST.
- **ch. 84 — Souder, braser, réparer le métal** : les deux chapitres figurent ensemble dans la
  même ligne de la liste de relecture obligatoire de `CLAUDE.md` (« Souder et scie à chaîne »).
  Le ch. 83 ne renvoie pas au ch. 84 ; à vérifier si un renvoi croisé est utile côté 84.

---

## 4. Les rappels de sécurité de `CLAUDE.md` repris dans ce chapitre

Un seul s'applique, et il est repris intégralement.

| Règle du tableau | Où, dans le ch. 83 | Forme |
| --- | --- | --- |
| **Génératrice : jamais dans un bâtiment, un garage ou sous un auvent** | §8 point 3, en gras, et §5-I, et §6 | Reprise mot pour mot, **plus** le mécanisme (fixation sur l'hémoglobine), **plus** le chiffre de Santé Canada (≥ 6 m des portes, fenêtres et évents), **plus** l'extension du livre : la même règle vaut pour une **scie** ou une souffleuse démarrée « le temps qu'elle chauffe » dans le garage — extension appuyée sur Québec.ca, qui nomme les « scies à essence » parmi les sources de CO |

**Les huit autres règles du tableau ne s'appliquent pas à ce chapitre** : cuisson à 74 °C, foie
et reins de cervidés, trichinellose, tularémie, thuyone du cèdre, botulisme de type E,
apparence trompeuse du botulisme, mal de caribou. Aucune n'a été insérée pour faire nombre —
c'est la règle de non-dilution du gabarit appliquée aux rappels comme à l'encadré.

**Nouveau rappel, candidat au tableau de `CLAUDE.md` :** *« Ne jamais siphonner de l'essence à
la bouche — risque d'aspiration mortel »* (CCHST, profil chimique). Il s'appliquerait au moins
aux chapitres 20 et 85. À soumettre à l'éditeur.

---

## 5. L'encadré Danger

**Présent**, section 8, cinq mécanismes. Chacun donne le **mécanisme** et non l'avertissement :

1. **Rebond** — pourquoi la scie pivote vers le visage, et non « attention au rebond ».
2. **Hémorragie fémorale** — pourquoi le pantalon fonctionne (fibres arrachées qui bourrent le
   pignon), donc pourquoi un pantalon modifié ne fonctionne plus.
3. **Monoxyde de carbone** — pourquoi rien n'avertit, et pourquoi les symptômes se confondent
   avec une journée de bûchage.
4. **Arbre encroué** — pourquoi l'énergie part sans le craquement d'une chute normale, et
   pourquoi le troisième interdit de la CNESST protège des tiers plutôt que l'opérateur.
5. **Vapeurs d'essence** — pourquoi elles reviennent chercher la flamme à plusieurs mètres, et
   pourquoi le bidon se pose au sol.

**Le seuil de non-dilution est-il tenu ?** Cinq mécanismes dans un encadré, c'est beaucoup.
Chacun est bien un risque de mort : trois sont documentés comme mortels par les sources
(CO, aspiration d'essence, blessure grave ou mortelle par rebond), deux le sont par
construction (hémorragie, arbre encroué). Aucun ne pouvait aller ailleurs sans perdre sa force.
**Point à confirmer par le vérificateur sécurité :** faut-il scinder l'encadré en deux — les
trois qui tuent l'opérateur, les deux qui tuent la famille — ou le laisser d'un bloc.

---

## 6. Le relecteur humain requis

**Formateur accrédité en abattage manuel sécuritaire (formation reconnue par la CNESST),
doublé d'un mécanicien de petits moteurs.** Marqué en tête du fichier chapitre et nommé à la
section 10.

| Relecteur | Sections | Ce qu'il tranche |
| --- | --- | --- |
| **Formateur en abattage manuel (CNESST)** | §2, §5-C, §5-D, §6, §8 | Questions 1, 3, 4 et 5. Surtout : l'arbitrage CNESST / CCHST, et le refus de décrire un dégagement d'arbre encroué |
| **Mécanicien de petits moteurs** | §3, §5-F, §5-G, §5-H, §5-I, §7 | Question 2 : le refus de publier rapport de mélange, angle d'affûtage et écartement de bougie. Et la justesse du diagnostic en trois branches |
| **Second relecteur médical** (médecin, infirmier ou technicien ambulancier) | §8 point 2, §7 | L'anatomie fémorale, l'absence de délai chiffré, et l'entrée « syndrome des vibrations » |

**Document à obtenir avant l'impression :** le guide technique **« Abattage manuel,
2e édition »** de la CNESST, cité par la page officielle comme référence normative. Il n'a pas
été consulté — il n'était pas accessible en texte à la captation du 2026-09-20, et le PDF
« Parti abattre un arbre, il ne reviendra pas... » (949,8 ko) n'a pas pu être lu faute d'outil
d'extraction sur le poste. **Ce guide pourrait fermer à lui seul les trous 5, 6, 7 et 13.**
C'est la première action à demander au vérificateur technique.

---

## 7. Sources enregistrées

**Quinze fichiers, seize pages officielles** — le fichier des vibrations en couvre deux —
toutes captées de première main le 2026-09-20, toutes en HTTP 200 sauf mention contraire.
Aucune source secondaire — fabricant, blogue, forum — n'a servi à un chiffre du chapitre.

| Fichier | Organisme |
| --- | --- |
| `sources/83-cnesst-abattage-manuel-directionnel.md` | CNESST — **source maîtresse** |
| `sources/83-cnesst-vetements-de-protection.md` | CNESST |
| `sources/83-cchst-scie-a-chaine-rebond.md` | CCHST |
| `sources/83-cchst-scie-a-chaine-entretien.md` | CCHST |
| `sources/83-cchst-scie-a-chaine-epi.md` | CCHST |
| `sources/83-cchst-scie-a-chaine-utilisation-securitaire.md` | CCHST |
| `sources/83-cchst-scie-a-chaine-operations-de-coupe.md` | CCHST — porte le tableau de divergence |
| `sources/83-cchst-scie-a-chaine-maniement.md` | CCHST |
| `sources/83-cchst-limites-exposition-bruit.md` | CCHST |
| `sources/83-cchst-vibrations-main-bras.md` | CCHST |
| `sources/83-quebec-monoxyde-de-carbone.md` | Québec.ca |
| `sources/83-sante-canada-generatrice-distance.md` | Santé Canada — **captée en anglais**, page française HTTP 404 |
| `sources/83-quebec-entreposage-liquides-inflammables.md` | Québec.ca |
| `sources/83-cchst-garages-securite-essence.md` | CCHST |
| `sources/83-cchst-essence-profil-chimique.md` | CCHST |

*(Le CCHST publie ses fiches « Réponses SST » en pages distinctes — rebond, entretien, EPI,
maniement, opérations de coupe, utilisation sécuritaire. Chacune est enregistrée séparément,
parce qu'une page qui disparaît ne doit pas emporter les autres avec elle.)*

**Reproduction.** Les pages du CCHST et de la CNESST sont protégées par le droit d'auteur. Les
fichiers de `/sources` enregistrent les **faits, valeurs, normes et interdits** avec des
citations courtes et attribuées, et non le texte intégral. C'est une différence de méthode avec
les captations des chapitres 70 à 73, qui reprenaient des extraits plus longs de pages
gouvernementales. **À signaler à l'éditeur** : si le livre doit un jour se vendre, cette
question se pose pour tout le dossier `/sources`, pas seulement pour le chapitre 83.

---

## 8. Conventions du livre — vérification

| Règle | État |
| --- | --- |
| Métrique partout | ✔ °C, m, cm, L, kg. Impérial entre parenthèses **uniquement** là où la source officielle le publie elle-même : 3 m (10 pi), 7,5 m (25 pi), 2 m (6 pi), 6 m (20 pi) |
| Pas de chiffre inventé | ✔ Chaque nombre porte son organisme entre parenthèses, ou est marqué `[À VÉRIFIER]`, ou est explicitement refusé |
| Nom latin au moins une fois | ✔ Épinette noire (*Picea mariana*), sapin baumier (*Abies balsamea*), bouleau à papier (*Betula papyrifera*) |
| Pourcentages de sel sur le poids de la viande | s. o. |
| Salpêtre jamais en quantité | s. o. |
| Pas de dates de saison ni de limites de prises | ✔ §2 renvoie explicitement « à la réglementation de l'année en vigueur » pour les permis de coupe et les règles de brûlage, sans en citer aucune |
| Pas de tutoiement du lecteur | ✔ Vérifié. Aucune deuxième personne dans le corps |
| Pas d'introduction ni de conclusion de remplissage | ✔ §1 entre dans le sujet à la première phrase ; le chapitre finit sur la liste des relecteurs |
| Encadré Danger seulement pour le risque de mort | ✔ Voir §5 ci-dessus |
| Variante d'urgence nommant ce qu'on perd | ✔ Trois blocs, chacun avec son « ce qu'on perd » explicite, plus la liste de ce qui **ne se dégrade jamais** |

---

## 9. Ce que le rédacteur signale au vérificateur technique, en priorité

1. **Obtenir « Abattage manuel, 2e édition » de la CNESST.** Quatre trous en dépendent.
2. **Confirmer le 6 m de Santé Canada sur la page française.** Le chiffre est publié dans le
   livre sur la foi d'une captation anglaise.
3. **Confirmer l'arbitrage CNESST / CCHST** sur l'entaille et la distance. Si le vérificateur
   conclut que 7,5 m et 22,5 m mesurent bien deux choses différentes, la formulation de
   l'étape 14 doit être resserrée pour le dire plus clairement qu'elle ne le fait.
4. **Chercher une source officielle canadienne sur le carburant deux temps** : rapport de
   mélange, durée de vie du mélange, effet de l'éthanol sur les petits moteurs. Trois
   recherches n'ont rien donné d'officiel — seulement des fabricants et des blogues. Si rien
   n'existe, le chapitre reste tel quel et l'annexe proposée à la question 2 devient la seule
   sortie.
5. **Point d'éclair de l'essence.** Le −43 °C est partout sauf sur les pages officielles
   captées. Soit une fiche fédérale le publie et il entre, soit il n'entre pas.

## Notes retirées du chapitre — 23 septembre 2026

- Section 5-C, chapeau (avant l'étape 12) :
  Deux organismes publient des chiffres pour ces gestes et ils ne concordent pas partout.
  **Le livre retient les plus prudents**, parce que l'écart se paie en une seule fois : la
  profondeur d'entaille et la zone à vider. Les valeurs retenues sont de la **CNESST**, celles
  du **CCHST** sont signalées où elles diffèrent.
- Section 5-C, étape 14 (zone de sécurité) :
  *Le CCHST donne 7,5 m (25 pi) de recul et personne à moins de deux longueurs d'arbre.*
  **Le livre retient 22,5 m** : [la phrase suivante est restée dans le chapitre]
- Section 5-C, étape 15 (entaille de direction) :
  *Le CCHST écrit 1/4 à 1/5 du diamètre et environ 45°.*

## Passe légal et notes de bas de page — 23 septembre 2026

### Retiré du chapitre

- §5-H, étape 42 : « dans un bidon homologué » devient « dans le bidon à mélange » (le bidon
  étiqueté et hermétique du tableau Matériel). Aucune autre phrase de loi, de règlement, de
  norme ou de permis dans le chapitre.

### Notes de bas de page ajoutées

- **[^1] « quatre-temps » (§7).** Allumage une fois sur deux : Wikipedia, `sources/83-wikipedia-four-stroking.md`.
  Le son (bafouillement saccadé à plein régime) : guides d'atelier non officiels, notés dans la
  même fiche. Aucune source officielle ni de fabricant trouvée. **À signaler au vérificateur
  technique :** la ligne du §7 donne « mélange trop pauvre » en premier diagnostic, alors que
  les guides associent le quatre-temps à un mélange riche. La note ne décrit que le son et ne
  tranche pas la cause.
- **[^2] détresse respiratoire après aspiration d'essence (§8, point 5).** Toux et étouffement
  sur le coup ; toux intense, respiration accélérée, peau bleutée, parfois plusieurs heures
  plus tard : Manuel Merck grand public, `sources/83-merck-intoxication-hydrocarbures.md`.
  « Se surveille pendant les heures qui suivent » : conséquence du délai, rédaction du livre.
  « la détresse » devient « la détresse respiratoire » pour que la note porte sur un état nommé.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts : `suivi/verifications/83-verifications.md` (5 drapeaux : 2 levés, 1 corrigé,
2 introuvables).

- §5, étape 25, bois sous tension : **confirmé** — premier trait du côté comprimé sur le tiers du
  diamètre, puis du côté opposé jusqu'à la rencontre ; « repère de métier » retiré.
  `sources/83-husqvarna-tronconnage-bois-sous-tension.md`.
- §5-G, étape 40, mélange trop pauvre : **délai introuvable** — « en quelques minutes de pleine
  charge » retiré ; reste le mécanisme (surchauffe et manque d'huile). `sources/83-stihl-melange-trop-pauvre.md`.
- §7, tableau, « monte en régime puis retombe » : **délai introuvable**, même traitement, même
  source. Le diagnostic de la ligne (pauvre ou riche) n'est pas tranché : voir la note A du
  fichier de vérifications.
- §8 DANGER, point 2, artère fémorale : **corrigé (précisé)** — superficielle dans le haut de la
  cuisse seulement, sous le pli de l'aine ; plus bas sous le couturier, puis derrière le genou.
  `sources/83-statpearls-artere-femorale-trajet.md`.
- §9, « L'étincelle faible », entrefer de bobine : **valeur ajoutée** — 0,15 à 0,36 mm sur les
  moteurs courants (0,006 à 0,010 po et 0,010 à 0,014 po) ; cale de papier épais fournie avec la
  bobine. `sources/83-briggs-entrefer-bobine-allumage.md`.

Compression §3 et §4 — 27 septembre 2026 : 1 115 mots → 241 mots ; matériel coupé : visière et lunettes (reste l'étape 6), bottes (géométrie de coupe au §9-D), gants, moyen de communication (§8 point 2, le sifflet y est déplacé), levier d'abattage, clé combinée, bidon d'essence pure (fondu dans la ligne du mélange), bouchons en mousse de siège, paragraphe des réserves (ch. 00b, ch. 108) ; §3 : rebond (§8 point 1), membranes (§5-G, §5-H, §9-D), chaîne émoussée (étapes 30 et 32, §7), huile de guide (passée au §4).
