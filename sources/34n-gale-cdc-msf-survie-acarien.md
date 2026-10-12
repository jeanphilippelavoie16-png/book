# Gale — survie de l'acarien hors de la peau, chaleur, linge, délai d'apparition, soufre

- **Pages et articles :**
  1. CDC, « About Scabies » — https://www.cdc.gov/scabies/about/index.html
  2. CDC, « Clinical Care of Scabies » — https://www.cdc.gov/scabies/hcp/clinical-care/index.html
  3. Médecins Sans Frontières, *Guide clinique et thérapeutique*, « Gale » —
     `34n-msf-gale-16689640.html`, `-texte.txt`.
  4. Arlian LG, et al. « Survival and infectivity of Sarcoptes scabiei var. canis and var.
     hominis ». *J Am Acad Dermatol* 1984;11(2 Pt 1):210-5. PMID 6434601.
  5. Singalavanija S, et al. « A comparative study between 10 per cent sulfur ointment and 0.3 per
     cent gamma benzene hexachloride gel in the treatment of scabies in children ». *J Med Assoc
     Thai* 2003;86 Suppl 3:S531-6. PMID 14700144.
- **Consultés le :** 27 septembre 2026
- **Captation :** les deux pages des CDC refusent `curl` (HTTP 403) ; elles ont été lues par
  l'outil de lecture web, et les phrases ci-dessous sont celles qu'il a rendues entre guillemets.
  **À recapter en HTML** à la prochaine passe (règle 2). MSF : `curl`, HTTP 200. Résumés 4 et 5 :
  `34n-resumes-pubmed-bugbuster-gale-soufre-miel.txt`.
- **Sert à :** chapitre 34 — §5-J (gale), §6, §7, §9.

## Extraits intégraux

**CDC — About Scabies**
> « Scabies mites generally do not survive more than two to three days away from human skin. »
> « When a person is infested with scabies mites the first time, symptoms typically take 4 – 8
> weeks to develop. »
> « However, a person with an infestation can transmit scabies even if they do not have
> symptoms. »
> « The itching of scabies is due to a hypersensitivity reaction (allergy) to mites and their
> feces, so itching may continue for several weeks after treatment even if all the mites and eggs
> are killed. »
> « Temperatures in excess of 50°C or 122°F for 10 minutes will kill mites and eggs. »
> « Seal items you can't wash or dry-clean in a closed plastic bag for several days to a week. »

**CDC — Clinical Care**
> « Sulfur ointment 5%-10% » — « safe for topical use in children, including infants under 2
> months of age » (rendu par l'outil de lecture).

**MSF**
> « Les personnes en contact étroit avec le patient sont traitées simultanément, même en l'absence
> de signes. Les vêtements et le linge de lit sont changés (entourage compris) après chaque
> traitement. Ils sont, soit lavés à ≥ 60 °C et séchés au soleil, soit exposés 72 heures au
> soleil, soit enfermés dans un sac plastique pendant 72 heures. »
> « Sillons scabieux (fréquents) : lignes de 5 à 15 mm, fines, sinueuses [...] Le dos et le visage
> sont épargnés. »
> « Les démangeaisons peuvent persister 1 à 3 semaines après l'élimination du parasite. »
> « Lésions cutanées secondaires : lésions de grattage (excoriations, croûtes) ou surinfection
> (impétigo). »

**Arlian 1984**
> « S. scabiei var. canis and var. hominis mites were found to survive off the host for 24 to 36
> hours at room conditions (21 degrees C and 40% to 80% relative humidity [RH]), and the canine
> variety survived 19 days at 10 degrees C and 97% RH. [...] Generally, higher RH values and lower
> temperatures favored survival, whereas higher temperature and lower RH led to early death. »

**Singalavanija 2003**
> « After 4 weeks of treatment, there were no statistical differences between the two groups in
> patients assessed cured (92% vs 94%) [...] The adverse effect of foul odor in the sulfur group
> was more common »

## Ce que le chapitre en tire

- Aucun produit de la forêt ne tue l'acarien de façon démontrée ; le chapitre le dit.
- Tout le monde sous le même toit se traite **le même jour**, avec ou sans démangeaison ; la
  première gale met **4 à 8 semaines** à démanger.
- Le linge : plus de **50 °C pendant 10 minutes**, ou **60 °C** et plus ; ou **72 heures** au soleil
  ou en sac. Hors de la peau, l'acarien vit **24 à 36 h à 21 °C** et **bien plus longtemps au froid
  humide** (19 jours à 10 °C pour la variété du chien) : la remise froide n'est pas l'endroit pour
  « laisser mourir » le linge.
- La démangeaison dure **1 à 3 semaines** après la guérison : elle ne prouve pas l'échec.
- L'onguent de soufre à **5 à 10 %** traite l'enfant aussi bien qu'un scabicide du commerce dans
  un essai thaïlandais — c'est un produit de pharmacie, pas de forêt (décision d'achat à JP).

## Captation des pages des CDC — 27 septembre 2026 (correction)

Les deux pages refusent toujours `curl` et PowerShell (HTTP 403). Elles ont été ouvertes dans le
panneau navigateur et leur élément `<main>` enregistré, texte intact :

- `34n-cdc-about-scabies.html` (mise à jour et revue le 9 septembre 2024)
- `34n-cdc-clinical-care-scabies.html` (revue le 18 décembre 2023)

Les phrases citées plus haut s'y retrouvent mot pour mot. Deux phrases de plus, qui changent le
chapitre :

> « Dry-clean items that can't be washed or seal them in a closed plastic bag for at least 72 hours
> to a week. » (About Scabies, « Treatment and recovery »)
> « Sulfur ointment 5%-10%: In the U.S. the ointment must be compounded. Sulfur in an ointment base
> (petrolatum) is safe for topical use in children, including infants under 2 months of age. The
> odor may make it unpleasant to use. » (Clinical Care)
> « Only permethrin or sulfur ointment may be used in infants. » (About Scabies)

**Ce que le chapitre en tire, à la correction :** le linge qui ne se lave pas s'isole **une
semaine** (borne haute des CDC), dans la pièce chauffée et sèche, jamais dehors : les 72 h au soleil
de MSF sont écrites pour un pays chaud, et le froid humide prolonge la survie de l'acarien (Arlian).
L'onguent de soufre est du soufre dans de la vaseline, **5 à 10 %** : il se mêle au chalet s'il y a
du soufre. La page ne dit pas si le pourcentage est en poids, quel soufre, combien de soirs, ni si un
gras animal remplace la vaseline : `[À VÉRIFIER]` au chapitre.
