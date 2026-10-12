# CDC — solutions de chlore : préparation à l'hypochlorite de calcium, et perte de titre

Deux pages des Centers for Disease Control and Prevention (CDC), gouvernement des États-Unis.
Le serveur du CDC refuse `curl` (HTTP 403) : les deux pages ont été enregistrées depuis leurs copies de
l'Internet Archive. Aucune page canadienne consultée ne donne ces valeurs.

- **Consultées le :** 24 septembre 2026
- **Sert à :** chapitre 28 — Hygiène et eaux usées (§ 4, ligne « Eau de Javel » ; § 9, « La
  désinfection devient de l'eau bouillante »)

---

## 1. « Rationale and Considerations for Chlorine Use in Infection Control for Non-U.S. General
## Healthcare Settings »

- **URL d'origine :** https://www.cdc.gov/vhf/ebola/clinicians/non-us-healthcare-settings/chlorine-use.html
  (retirée du site du CDC : HTTP 404 le 24 septembre 2026)
- **Copie enregistrée :** https://web.archive.org/web/20210103055652/https://www.cdc.gov/vhf/ebola/clinicians/non-us-healthcare-settings/chlorine-use.html
  → `sources/28-cdc-chlore-controle-infection.html` (234 318 octets)

### Extraits intégraux

> « Household bleach, which in the United States would be considered NaOCl […], is different from
> either Ca(OCl)2 (for example, HTH, chlorinated lime) or the locally prepared "bleach" products that
> are commonly found in some countries. Understanding which product is being used to make a solution is
> very important, as the amount of dilution needed for a product to be effective will vary. »

> « Other considerations: Chlorine solutions should be prepared fresh daily, as they are light
> sensitive. Most chlorine products require the removal of organic soil prior to their use […].
> Disinfection requires a wet contact time […]. Chlorine odor does not necessarily indicate appropriate
> solution strength, since chlorine odor can be detected even at extremely low concentrations. »

> « Chlorine solutions and other disinfectants are inactivated by the presence of organic matter
> (blood, other proteinaceous material, dirt), heavy metal ions, low temperature, or ultraviolet
> irradiation. »

> « Make a 0.05% (approximately 500 ppm) chlorine solution by adding one tablespoon of HTH granules to
> 20 liters of clean water and stir for 10 seconds. Make a 0.5% (5,250 ppm) hypochlorite solution by
> adding 10 heaping tablespoons of HTH granules to 20 liters of clean water. After mixing, wait 30
> minutes to allow all of the Ca(OCl)2 granules to dissolve. »

> « [% hypochlorite in use solution/% hypochlorite in the granules or powder as indicated on product
> label] x 1000 = amount in grams of granules to add to each liter of water. »

### Calcul pour la solution à 0,1 % du chapitre 28 (arithmétique de la formule, pas une valeur de plus)

- Granules étiquetés 70 % : 0,1 ÷ 70 × 1 000 = **1,4 g par litre**, soit 28 g pour 20 L.
- Granules étiquetés 65 % : 0,1 ÷ 65 × 1 000 = **1,5 g par litre**.
- À la cuillère : la source met **1 c. à soupe dans 20 L pour 0,05 %** ; 0,1 % demande donc **2 c. à
  soupe dans 20 L**.

## 2. « Chemical Disinfectants » — *Guideline for Disinfection and Sterilization in Healthcare
## Facilities* (2008)

- **URL :** https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/chemical-disinfectants.html
- **Copie enregistrée :** https://web.archive.org/web/20260905203312/https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/chemical-disinfectants.html
  → `sources/28-cdc-desinfectants-chimiques.html` (134 240 octets)

### Extraits intégraux

> « Hypochlorites, the most widely used of the chlorine disinfectants, are available as liquid (e.g.,
> sodium hypochlorite) or solid (e.g., calcium hypochlorite). The most prevalent chlorine products in
> the United States are aqueous solutions of 5.25%–6.15% sodium hypochlorite (see glossary), usually
> called household bleach. »

> « Hypochlorite solutions in tap water at a pH >8 stored at room temperature (23°C) in closed, opaque
> plastic containers can lose up to 40%–50% of their free available chlorine level over 1 month. Thus,
> if a user wished to have a solution containing 500 ppm of available chlorine at day 30, he or she
> should prepare a solution containing 1,000 ppm of chlorine at time 0. Sodium hypochlorite solution
> does not decompose after 30 days when stored in a closed brown bottle. »

## Chiffres retenus

| Donnée | Valeur |
| --- | --- |
| Solution diluée, eau du robinet, 23 °C, plastique opaque fermé | perd **jusqu'à 40 à 50 %** de son chlore libre **en 1 mois** |
| Même solution en bouteille brune fermée | **pas de perte** en 30 jours |
| Solution de travail | **à refaire chaque jour** (sensible à la lumière) |
| Solution à 0,1 % à partir de granules | g/L = 0,1 ÷ titre de l'étiquette × 1 000 → 1,4 g/L à 70 % |
| Dissolution des granules | **30 minutes** avant usage |
| Odeur de chlore | **ne prouve pas** que la solution est assez forte |

## Recoupement — javel concentrée (déjà au dossier)

- `13-fabricant-javel-duree-de-conservation.md` (fabricant) : la javel « will last up to a year » à
  l'abri de la chaleur et du soleil ; après un an, la dégradation « rapidly accelerates ».
- `12-epa-javel-desinfection-urgence.md` (EPA) : javel « stored at room temperatures for less than one
  year ».

## Ce que ces pages ne disent pas

- **Aucune durée de garde de l'hypochlorite de calcium en granules** : le « se garde des années » du
  chapitre n'est dans aucune des deux.
- Aucune vitesse de perte **de la javel concentrée** selon la température : seulement « à l'abri de la
  chaleur » (fabricant) et « à la température de la pièce » (EPA).
