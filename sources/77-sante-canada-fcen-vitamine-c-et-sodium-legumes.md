# Santé Canada — Fichier canadien sur les éléments nutritifs : vitamine C et sodium des légumes du chapitre 77

- **Organisme :** Santé Canada
- **Base de données :** Fichier canadien sur les éléments nutritifs (FCÉN / CNF)
- **Portail :** https://food-nutrition.canada.ca/cnf-fce/?lang=fr
- **Interfaces interrogées (API publique) :**
  - liste des aliments : `https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=fr&type=json`
  - valeurs d'un aliment : `https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?lang=fr&type=json&id=<code>`
- **Date de consultation :** 2026-09-20
- **Capture :** de première main, `curl`, HTTP 200 sur les quinze appels. Fichier de liste de
  512 187 octets, réponses individuelles de 11 à 20 ko.
- **Base de calcul :** toutes les valeurs sont **par 100 g d'aliment**
- **Sert au chapitre :** 77 — Fermentation (sections 1, 2, 3, 5, 6, 9, 10)
- **Déjà au dossier :** `sources/25-sante-canada-fcen-vitamine-c.md`, qui avait capté la ligne
  « Choucroute » (2201) pour le chapitre 25. Recaptée ici parce que le chapitre 77 a besoin de la
  comparaison **chou cru → choucroute** et de la ligne **sodium**, qui n'avaient pas été relevées.

**Note de méthode, importante.** La fiche source du chapitre 24 déclarait le FCÉN inaccessible
(404 sur l'interface de recherche). **L'API publique répond**, elle, et c'est par elle que ces
valeurs ont été obtenues. La méthode est notée ici pour que les chapitres 24 et 25 puissent
reprendre leurs valeurs manquantes sans refaire la recherche.

---

## Extrait intégral — vitamine C, sodium, fibres, protéines

`nutrient_name_id` 401 (vitamine C), 307 (sodium), 291 (fibres alimentaires totales), 203
(protéines). La colonne « obs » est le `number_observation` renvoyé par la base : **c'est le
nombre d'analyses derrière la valeur, et une valeur à 0 ou 1 observation ne vaut pas une valeur à
180.**

| Code | Description française exacte | Vit. C (mg/100 g) | obs | Sodium (mg/100 g) | obs | Fibres (g) | Prot. (g) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2361 | **Chou, cru** | **36,6** | 4 | 18 | 46 | 1,8 | 1,28 |
| 2362 | Chou, bouilli, égoutté | 37,5 | 4 | 8 | 29 | 1,7 | 1,27 |
| **2201** | **Choucroute, conserve, solides et liquide** | **14,7** | **184** | **661** | **167** | 2,9 | 0,91 |
| 5582 | Choucroute, conserve, faible en sodium | 14,7 | 1 | 308 | 1 | 2,5 | 0,90 |
| 2034 | Chou rouge, cru | 57,0 | **1** | 27 | 4 | 2,1 | 1,43 |
| 2036 / 2395 | Chou vert frisé, cru | 120,0 | **1** | 38 | 6 | 2,44 | 4,28 |
| 6304 | Chou, napa, cru | 25,0 | **0** | 15 | 0 | 0,6 | 1,2 |
| 2385 | Chou-fleur, cru | 48,2 | 28 | 30 | 37 | 1,75 | 1,92 |
| 2444 | Rutabaga (chou-navet), cru | 25,0 | **1** | 12 | 2 | 2,4 | 1,08 |
| 2470 | Navet, cru | 21,0 | **1** | 67 | 2 | 1,8 | 0,90 |
| 2443 | Radis, cru | 14,8 | 16 | 39 | 30 | 1,6 | 0,68 |
| 2380 | Carotte, crue | 5,9 | 21 | 69 | 81 | 2,44 | 0,93 |
| 2500 | Betteraves, crues | 4,9 | 5 | 78 | 13 | 1,91 | 1,61 |
| 2363 | Concombre, cru | 2,8 | 4 | 2 | 54 | 0,73 | 0,65 |

---

## Les deux chiffres qui portent le chapitre 77

### 1. Chou cru 36,6 → choucroute en conserve 14,7 mg/100 g

Perte de **60 %**, calcul du rédacteur : (36,6 − 14,7) / 36,6 = 0,598.

**Ce que ce calcul ne démontre PAS.** Il ne démontre pas que *la fermentation* détruit la
vitamine C. La ligne 2201 décrit une **conserve**, donc un produit qui a été **chauffé**, et le
FCÉN ne porte **aucune entrée pour une choucroute crue, fraîche ou non pasteurisée** — vérifié sur
les deux seules entrées « Choucroute » de la base (2201 et 5582), toutes deux « conserve ».
La perte mesurée ici est donc celle de **la fermentation plus la mise en conserve**, et les deux
parts ne se séparent pas avec cette source.

**Ce qui permet de les séparer**, partiellement : la section 3.2 du guide canadien sur les aliments
fermentés donne, pour la choucroute comme aliment antiscorbutique historique, **« 300 to 700 mg/kg »
soit 30 à 70 mg/100 g** (`sources/77-bccdc-ffwg-choucroute.md`). Cette plage encadre la valeur du
chou cru (36,6) au lieu de la diviser par trois. Les deux sources, lues ensemble, disent que
**c'est la chaleur qui coûte la vitamine C, pas la fermentation** — mais aucune des deux ne le dit
en toutes lettres. Le chapitre 77 le pose comme une inférence, marquée `[À VÉRIFIER]`.

### 2. Sodium de la choucroute : 661 mg/100 g, sur 167 observations

C'est la valeur la mieux étayée de tout le tableau, et c'est celle qui plafonne la ration
quotidienne. À comparer aux AMT en sodium des ANREF (`sources/62-sante-canada-anref-sodium-et-sel.md`) :
2 300 mg/j chez l'adulte, **1 900 mg/j de 4 à 8 ans**, 1 500 mg/j de 1 à 3 ans.

**Attention à la base.** Le 661 mg/100 g est celui d'une **conserve commerciale**, « solides et
liquide ». Il ne décrit pas une choucroute maison à 2,25 % de sel : ce calcul-là est fait par le
livre à partir du pourcentage de sel et du facteur de conversion des ANREF (1 g de sodium =
2,53 g de sel), et il donne une valeur **plus élevée**, environ 890 mg/100 g. Les deux chiffres
sont donnés séparément au chapitre 77, avec leur origine.

---

## Réserves de captation, à lire avant d'utiliser une de ces lignes

1. **Les valeurs à 0 ou 1 observation ne sont pas des mesures.** Chou rouge (57,0), chou vert
   frisé (120,0), rutabaga (25,0), navet (21,0) reposent sur **une seule** observation ; le chou
   napa (25,0) sur **aucune** — c'est une valeur imputée par la base. Le chapitre 77 les emploie
   comme **ordres de grandeur**, jamais comme repères de calcul, et le dit.
2. **Les valeurs solides du tableau** — celles sur lesquelles le chapitre calcule — sont la
   choucroute en conserve (184 et 167 obs), la carotte (21 et 81), le concombre (54), le
   chou-fleur (28 et 37), le radis (16 et 30) et le sodium du chou cru (46). **La vitamine C du
   chou cru ne repose que sur 4 observations** : c'est une faiblesse du chiffre central du
   chapitre et elle est signalée en section 10.
3. **Le FCÉN ne nomme pas la variété ni le cultivar.** « Chou, cru » ne dit pas s'il s'agit d'un
   chou d'été ou d'un chou de garde d'automne, qui est ce qu'un jardin nordique produit. La teneur
   d'un chou de la Côte-Nord récolté en septembre n'est pas connue.
4. **Aucune entrée pour un légume lactofermenté autre que la choucroute.** Ni carotte, ni
   betterave, ni navet, ni radis fermentés. Toutes les teneurs de légumes fermentés autres que le
   chou sont donc **inconnues**, et le chapitre 77 ne les invente pas.
5. **Les unités renvoyées par l'API sont nulles dans le champ `unit`.** Elles ont été reprises du
   nom du nutriment tel que publié par le FCÉN (mg pour la vitamine C et le sodium, g pour les
   fibres et les protéines) et sont conformes aux valeurs déjà captées pour le chapitre 25.
