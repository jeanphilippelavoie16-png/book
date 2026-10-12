# Chapitre 52 — Pages cherchées et non obtenues

Le contraire d'une source. Ce fichier existe pour qu'un vérificateur ne refasse pas les mêmes
recherches, et pour que l'absence d'un chiffre au chapitre 52 se lise comme une décision et
non comme un oubli.

**Date des recherches :** 2026-09-20.
**Contrainte de la session :** le budget de recherche par mots-clés était épuisé. Les
recherches se sont faites par **adresse directe** sur les sites officiels, ce qui trouve ce
qui est à l'adresse prévisible et rate ce qui ne l'est pas. Une session avec moteur de
recherche disponible doit reprendre cette liste avant l'impression.

---

## 1. Contaminants dans la chair et le gras des phoques du Saint-Laurent

**Cherché :** mercure, BPC, organochlorés, limites de consommation par groupe de personnes.

| Page tentée | Résultat |
| --- | --- |
| Santé Canada — Mercure (page générale) : https://www.canada.ca/fr/sante-canada/services/aliments-nutrition/salubrite-aliments/contaminants-chimiques/contaminants-environnementaux/mercure.html | Répond, mais **aucune mention** des mammifères marins, du phoque, du foie, des aliments traditionnels ni de la bioaccumulation |
| Santé Canada — Mercure dans le poisson : https://www.canada.ca/fr/sante-canada/services/aliments-nutrition/salubrite-aliments/contaminants-chimiques/contaminants-environnementaux/mercure/mercure-poisson.html | Répond. Donne des limites par groupe (150 g/semaine population générale ; 150 g/mois femme enceinte ; 125 g/mois enfant 5-11 ans ; 75 g/mois enfant 1-4 ans) pour thon frais/congelé, requin, espadon, marlin, hoplostète orange, escolier. **Aucune mention des mammifères marins ni du phoque** |

**Conséquence au chapitre 52 :** le champ « contaminants » de la fiche porte `[À VÉRIFIER]`.
Le chapitre **ne recopie pas** les chiffres de l'espadon sur le phoque — même erreur de
méthode que celle refusée au chapitre 43 pour l'omble de fontaine. Il donne le **gabarit** de
lecture (une limite se lit en masse, par période, par groupe de personnes, et une table de
quatre avec deux enfants de 4 et 6 ans se lit sur trois lignes différentes) sans inventer la
valeur.

**Pistes pour la reprise :** INSPQ ; Institut national de santé publique, section
contaminants et aliments traditionnels ; Régie régionale de la santé et des services sociaux
du Nunavik ; Programme de lutte contre les contaminants dans le Nord (RCAANC) ; MPO, Institut
Maurice-Lamontagne (Mont-Joli) ; Parcs Canada / GREMM pour l'estuaire.

## 2. *Trichinella* chez le phoque — preuve propre à l'espèce

**Cherché :** une page officielle canadienne qui porte sur la trichinelle chez les phoques.

L'ACIA nomme **l'ours et le morse**, pas le phoque
(`52-acia-trichinose.md`). Le tableau de `CLAUDE.md` associe pourtant la règle à « ours,
phoque ». Le chapitre applique la consigne et **dit d'où elle vient** ; la preuve
documentaire propre au phoque reste à trouver.

**Pistes :** Agence de la santé publique du Canada ; Régie régionale de la santé et des
services sociaux du Nunavik (programme de dépistage de la trichinellose du morse) ;
gouvernement du Nunavut ; Canadian Wildlife Health Cooperative ; Institut Maurice-Lamontagne.

## 3. Signalement d'un mammifère marin mort, échoué ou en détresse au Québec

| Page tentée | Résultat |
| --- | --- |
| https://www.dfo-mpo.gc.ca/species-especes/mammals-mammiferes/report-signaler-fra.html | **HTTP 404** |
| https://www.dfo-mpo.gc.ca/species-especes/mammals-mammiferes/index-fra.html | Répond, annonce « Formulaires obligatoires et coordonnées pour signaler une observation ou un incident dans votre région », **sans donner les coordonnées** |

**Conséquence :** le chapitre dit **de signaler** et **à qui** (l'autorité fédérale, MPO),
sans imprimer de numéro de téléphone. Un numéro faux dans un livre est pire que pas de
numéro : il fait perdre les dix minutes où quelqu'un aurait pu chercher. Le numéro provincial
de la faune (1 877 346-6763), qui figure au dossier du chapitre 05 pour les **oiseaux
sauvages**, n'est pas transposé aux mammifères marins.

**À faire avant l'impression :** obtenir le numéro du réseau d'urgences pour les mammifères
marins du Saint-Laurent et celui du bureau régional du MPO pour la Côte-Nord, et les imprimer
au chapitre 19 (communiquer et savoir) plutôt qu'ici.

## 4. Fiche d'espèce détaillée du MPO — masses, longueurs, répartition

La page « Identifier une espèce » du MPO
(https://www.dfo-mpo.gc.ca/fisheries-peches/seals-phoques/species-especes/index-fra.html)
nomme les six espèces mais n'a pas livré son tableau lors de la consultation.

**Conséquence :** **aucune masse et aucune longueur** ne sont imprimées au chapitre 52 sans
`[À VÉRIFIER]`. Les rendements en viande, en gras et en huile ne sont pas chiffrés du tout :
il n'existe au dossier aucune source qui les donne.

## 5. Composition nutritionnelle de la viande de phoque — source canadienne

Le **Fichier canadien sur les éléments nutritifs** (FCÉN, Santé Canada) devrait primer selon
la règle 2 de `CLAUDE.md`. Son moteur n'a pas répondu, comme aux chapitres 24 et 41.
L'API de l'USDA a répondu par intermittence (`OVER_RATE_LIMIT` sur la clé publique partagée),
ce qui a limité la récolte. Voir `52-usda-fdc-composition-phoque.md`.

## 6. Conditions du permis de pêche au phoque à usage personnel au Québec

Le Règlement sur les mammifères marins établit qu'un permis existe et ce qu'il coûte
(`52-justice-canada-reglement-mammiferes-marins.md`, art. 4 et 5). Les **conditions
d'admissibilité, la formation exigée et la démarche** pour la région du Québec n'ont pas été
retrouvées : la page « Pêches commerciales du phoque de l'Atlantique » du MPO
(https://www.dfo-mpo.gc.ca/fisheries-peches/commercial-commerciale/atl-arc/seal-phoque-fra.html)
ne contient qu'une liste de liens et de plans de gestion.

**Conséquence :** conforme à la règle du livre sur la réglementation, le chapitre nomme
**l'autorité** (MPO, bureau régional) et **la rubrique** (permis de pêche, mammifères marins),
et ne décrit aucune démarche.
