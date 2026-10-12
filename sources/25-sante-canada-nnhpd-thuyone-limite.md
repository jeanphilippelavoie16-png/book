# Santé Canada (DPSNSO) — la limite de thuyone, enfin une source officielle canadienne

- **Organisme :** Santé Canada, Direction des produits de santé naturels et sans ordonnance
  (DPSNSO / NNHPD)
- **Document :** *Natural Health Product — SAGE · Salvia officinalis · Oral*, monographie
  compendiale, **datée du 10 janvier 2025**
- **URL :** https://webprod.hc-sc.gc.ca/nhpid-bdipsn/dbImages/mono_Sage_Oral_EN.pdf
- **Date de consultation :** 2026-09-21
- **Page enregistrée :** `sources/25-sante-canada-nnhpd-sauge-orale-monographie.pdf`
  (307 677 octets, PDF original tel que servi ; texte extrait au module `pypdf`)
- **Chapitres qui l'utilisent :** **25 (§8 entrée 1)**, et 3, 5, 7, 8, 11, 12, 30 à reprendre
- **État :** ✅ **RÈGLE LA QUESTION DE FOND DU `suivi/25-redaction.md`, §3.**

---

## Pourquoi cette page, et pourquoi elle ne parle pas de cèdre

Le `suivi/25-redaction.md` notait en §3 qu'**aucune source officielle canadienne sur la thuyone
n'existait**, et que la règle du tableau de `CLAUDE.md` (« thuyone du cèdre toxique ») reposait,
pour les six chapitres qui la répètent, sur le seul rapport technique TR-570 du National
Toxicology Program américain — des doses de gavage chez le rat, en mg/kg.

Ont été reconsultées et sont revenues vides ou hors sujet le 2026-09-21 :

| Piste | Résultat |
| --- | --- |
| Monographie *Thuja occidentalis* orale (`atid=thuja.oral.thuya.orale`) | **HTTP 404.** L'identifiant existe dans l'index mais la fiche n'est plus servie |
| Monographie *Thuja occidentalis* topique (`atid=thuja`) | Servie, mais **voie topique seulement**, pour les verrues. Aucune mention de thuyone, aucun chiffre |
| Base de données des ingrédients (BDIPSN) `atid=vitamin.c.vitamine` | HTTP 404 |

**La voie qui a fonctionné passe par une autre plante.** La thuyone n'est pas réglementée au
Canada plante par plante : elle est plafonnée comme **substance**, et le plafond est écrit dans
les monographies des plantes qui en contiennent. La sauge officinale en est une, et sa
monographie est servie, à jour et complète. Le chiffre qu'elle porte est un chiffre de
substance, pas un chiffre de sauge : il vaut pour le thuya, pour l'absinthe et pour l'armoise.

## Extraits intégraux

> « Sage contains thujone. **For adults, the upper limit for total daily intake of thujone from
> health products is 6 mg.** Product licence applications for oral products should include a copy
> of a certificate of analysis or any other equivalent document demonstrating that the thujone
> content of a daily dose of the product is acceptable. **Because thujone content of the herbal
> materials can vary, the thujone content should be determined for each batch during production
> of the product.** »

> Subpopulation(s) : « **Adults 18 years and older** »

> Contraindication(s), all products : « Do not use if you are pregnant or breastfeeding. »
> « **Do not use if you have a seizure disorder such as epilepsy.** »

> Duration(s) of use : « Ask a health care practitioner […] for use beyond 4 weeks. »

## Ce que ça change dans le chapitre 25, et dans cinq autres

**1. Le plafond existe, il est canadien, et il est bas : 6 mg par jour chez l'adulte.**
La règle du livre n'est plus adossée à un seul rapport américain sur le rat. Elle porte
maintenant un chiffre de Santé Canada qu'un pharmacien peut vérifier en deux minutes.

**2. Il n'y a aucune dose pédiatrique.** La monographie s'arrête à « adultes de 18 ans et plus ».
Santé Canada n'autorise donc **aucun** apport quotidien de thuyone chez l'enfant, et ne publie
aucun seuil en dessous duquel ce serait correct. C'est l'argument qui manquait au chapitre 25 :
le livre fait boire des infusions à des enfants de 4 et 6 ans.

**3. La contre-indication « seizure disorder such as epilepsy » corrobore le mécanisme du
NTP TR-570.** Convulsivant chez le rat par gavage, contre-indiqué chez l'épileptique par Santé
Canada : les deux sources disent la même chose par deux chemins.

**4. Et c'est la ligne décisive : Santé Canada exige un certificat d'analyse par lot**, parce
que la teneur en thuyone de la matière végétale **varie**. Un fabricant sous licence ne peut pas
estimer sa teneur — il doit la doser, à chaque lot. Personne, au chalet, ne dose un rameau. Le
plafond de 6 mg est donc **invérifiable à la maison**, et un plafond invérifiable ne se gère pas
par la prudence : il se gère par l'interdiction. C'est exactement la formulation que
`CLAUDE.md` demande — un mécanisme, pas un « soyez prudent ».

## Réserves de captation

1. **Le document est en anglais.** La version française de la monographie
   (`mono_Sage_Oral_FR.pdf`) n'a pas été récupérée. Les traductions employées au chapitre 25
   sont des traductions de travail du rédacteur, à confronter à l'original ci-dessus.
2. **C'est un document d'encadrement de l'industrie**, pas un avis toxicologique : la
   monographie dit à quel plafond un produit peut être homologué, pas à quelle dose une personne
   est intoxiquée. Le chapitre 25 s'en sert pour justifier une interdiction, jamais pour calculer
   une quantité tolérable.
3. **La teneur en thuyone d'un rameau de thuya occidental reste inconnue** et n'a été trouvée
   dans aucune source officielle. C'est précisément pourquoi le chapitre n'en tire pas un dosage.
   `[À VÉRIFIER]` maintenu sur ce point seul.
4. La monographie de *Thuja occidentalis* par voie **orale** existe dans l'index de la BDIPSN
   mais renvoie 404. **À reprendre** : si elle est remise en ligne, elle primera sur celle-ci.
