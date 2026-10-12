# Chapitre 71 — Pages cherchées sans succès, et budget de recherche

- **Date des tentatives :** 2026-09-20
- **Sert au chapitre :** 71 — Saler et sécher la truite (section 10)

Cette fiche existe pour qu'un poste ultérieur ne refasse pas les mêmes recherches, et surtout
pour qu'aucun `[À VÉRIFIER]` du chapitre 71 ne soit pris pour de la paresse.

---

## 1. Budget de recherche web épuisé avant le début du chapitre

`WebSearch` a répondu **« this session has used its web search budget (200 of 200 WebSearch
calls) »** dès la première requête du chapitre 71. **Aucune recherche par mots-clés n'a été
possible.** Toutes les sources du chapitre ont été obtenues par `WebFetch` **d'adresses connues
d'avance**, reprises du dossier `/sources` des chapitres 53 à 69, puis relues de première main le
2026-09-20 avec des requêtes propres au chapitre 71.

**Conséquence honnête :** une page officielle qui existerait mais dont l'adresse n'est pas déjà
au dossier n'a pas pu être trouvée. C'est la principale limite de la documentation de ce chapitre.

---

## 2. Pages tentées, réponses obtenues

| Page visée | Adresse essayée | Réponse |
| --- | --- | --- |
| Codex CXS 167-1989, **« Poissons salés et poissons salés séchés »** — la seule norme au dossier qui porterait des paramètres de salaison du poisson, citée par l'ACIA | `fao.org/fao-who-codexalimentarius/…/CXS_167f.pdf` (proxy FAO) | **HTTP 403** |
| Québec.ca — **« Préparation sécuritaire du gravlax »**, lien nommé sur la page « Risques associés à la consommation de poisson » | `…/precautions-aliments-dangereux/preparation-securitaire-gravlax` puis `…/gravlax` | **HTTP 404** aux deux adresses |
| Santé Canada — salubrité des poissons et fruits de mer, conseils généraux | `…/conseils-generaux-salubrite-aliments/salubrite-poissons-fruits-mer.html` | **HTTP 404** |
| Santé Canada — températures internes, adresse longue | `…/conseils-generaux-salubrite-aliments/temperatures-securitaires-cuisson-interne.html` | **HTTP 404** — l'adresse valide est `…/conseils-generaux-salubrite/…`, sans « -aliments » |

---

## 3. Pages consultées qui existent mais qui ne portent pas ce qu'on y cherchait

| Page | Ce qu'on y cherchait | Ce qu'on y a trouvé |
| --- | --- | --- |
| ACIA — **index des contrôles préventifs, poisson** (`inspection.canada.ca/fr/controles-preventifs/poisson`) | une page de salage, de salaison ou de séchage du poisson | **Six pages seulement** : mollusques (×4), poisson fumé prêt-à-manger (renvoi à Santé Canada), qualité organoleptique. **L'ACIA ne publie aucune page de contrôles préventifs sur le poisson salé ou séché.** |
| Santé Canada — **document d'orientation sur le poisson fumé** | le salage à sec, le saumurage, le séchage, la teneur en sel de la phase aqueuse | **Aucun de ces passages n'existe dans le document**, vérifié par une requête les nommant un à un |
| MAPAQ — **risques associés à la consommation de poisson** | le salage, le séchage, la marinade | **Aucune mention**, vérifié par une requête les nommant |
| MAPAQ — **procédés de fabrication à risques spécifiques** | des seuils de pH, d'aw, de sel, de séchage | **Aucun seuil chiffré.** La page nomme les procédés, elle ne les paramètre pas |

---

## 4. Le trou, nommé

**Il n'existe, dans tout le dossier `/sources` du livre au 2026-09-20, aucune source officielle
canadienne ou québécoise qui donne un pourcentage de sel, une durée de salage ou un paramètre de
séchage pour du poisson.**

Les seuls chiffres de salaison au dossier sont ceux de l'ACIA pour **le porc et les produits de
viande** (`63-acia-trichinella-salaison-sechage-fumage.md`, `71-acia-produits-viande-fermentes-secs.md`)
et le **9 % réglementaire** de la définition du poisson fumé de Santé Canada, qui n'est pas une
consigne de fabrication.

**Le chapitre 71 ne comble pas ce trou par un chiffre plausible.** Il donne ses pourcentages de
travail en les marquant `[À VÉRIFIER]`, en nommant d'où ils sont transposés, et il fait reposer la
sécurité du produit sur les trois barrières qui, elles, sont sourcées et vérifiables au chalet :
le froid mesuré, la congélation aux barèmes officiels, la cuisson à 70 °C.

---

## 5. Recherches à refaire en priorité, en une seule session

1. **Codex CXS 167-1989** par une autre voie que le proxy FAO. C'est la pièce qui manque le plus
   au livre : elle règlerait des `[À VÉRIFIER]` aux chapitres 62, 63, 64, 71 et 72 d'un coup.
2. La page **gravlax** de Québec.ca, dont le lien existe sur une page active : c'est la seule
   consigne québécoise connue sur un **poisson salé cru**.
3. Un **barème de correspondance entre perte de masse au séchage et activité de l'eau**. Sans lui,
   le chapitre 71 ne peut donner aucune cible de séchage chiffrée.
4. La **résistance à la chaleur de la toxine de *Staphylococcus aureus*** : affirmée dans une note
   de captation du chapitre 61, jamais citée d'une page officielle.
