# Source — La température d'essai de l'étiquette canadienne d'un congélateur : 32,2 °C, porte fermée, pour tenir lieu d'une pièce ordinaire où l'on ouvre

Trois documents, une seule question : **le chiffre en kWh/an de l'étiquette canadienne est-il
mesuré à 32 °C, couvercle fermé, comme l'essai américain ?**

- **Date de consultation :** 24 septembre 2026
- **Sert au chapitre :** 18b (section 3, étape 2). Lève le `[À VÉRIFIER — température d'essai de
  l'étiquette canadienne]` de la section 3.

---

## 1. Ressources naturelles Canada — les méthodes d'essai acceptées pour les congélateurs

- **Organisme :** Ressources naturelles Canada (gouvernement du Canada)
- **Page :** « Refrigerators, combination refrigerator-freezers and freezers » (planification et
  rapports, Règlement sur l'efficacité énergétique), date de modification 2025-01-13
- **URL :** https://natural-resources.canada.ca/energy-efficiency/energy-efficiency-regulations/planning-and-reporting/household-refrigerators-combination-refrigerator-freezers-and-freezers/23611
- **Captation :** `curl`, HTTP 200, page enregistrée : `sources/18b-rncan-reglement-refrigerateurs-congelateurs.html`

> « NRCan is considering three acceptable standards as the energy performance testing standards:
> CAN/CSA-C300-18 , entitled Energy performance and capacity of household refrigerators,
> refrigerator-freezers, freezers, and miscellaneous refrigeration products [...] [for freezers]
> Appendix B to Subpart B, Part 430 of Title 10 to the United States Code of Federal Regulations ,
> entitled Uniform Test Method for Measuring the Energy Consumption of Freezers (10 CFR 430.23
> Appendix B) »

> « The United States Code of Federal Regulation s testing standards for refrigerators, combination
> refrigerator-freezers, and freezers are available online: [...] 10 CFR 430.23 Appendix B -
> Freezers »

(Les noms de normes restent ici, jamais dans le livre.)

## 2. Département de l'Énergie des États-Unis — ce que l'essai à température élevée, portes fermées, veut représenter

- **Organisme :** U.S. Department of Energy, Office of Energy Efficiency and Renewable Energy
- **Document :** *Energy Conservation Program: Test Procedures for Consumer Refrigerators,
  Refrigerator-Freezers, and Freezers*, demande d'information, dossier EERE-2017-BT-TP-0004,
  22 juin 2017
- **URL :** https://www.energy.gov/sites/prod/files/2017/06/f35/rf-testprocedure-rfi-6-22-17-cln-nc.pdf
- **Captation :** `curl`, HTTP 200, PDF enregistré : `sources/18b-doe-2017-rfi-essai-refrigerateurs.pdf` ;
  texte : `sources/18b-doe-2017-rfi-essai-refrigerateurs-texte.txt`

> « DOE's test procedures for refrigerators, refrigerator-freezers, and freezers are intended to
> represent operation in typical room conditions with door openings by testing at an elevated
> ambient temperature with no door openings. 10 CFR 430.23(a)(7). The increased thermal load
> from the elevated ambient temperature is intended to represent the thermal load that would be
> associated with both door openings as cool cabinet air mixes with warmer ambient air and the
> loading of warmer items in the cabinet. »

> « Because the DOE test procedure requires testing with the cabinet doors remaining closed, it
> would not reflect the potential energy savings associated with door-in-door features during
> typical consumer operation with door openings. »

## 3. La valeur de la température élevée : 90 °F (32,2 °C)

Déjà au dossier : `sources/18b-temperature-essai-et-consommation-congelateurs.md` (ENERGY STAR,
méthode d'essai qui renvoie à la partie 430) :

> « Unless otherwise specified, all test conditions and requirements shall be identical to
> 10 CFR Part 430 »

> « B) Ambient Temperature: Ambient temperature shall be 90 °F ± 1 °F (32.2 °C ± 0.6 °C). »

Et le laboratoire Lawrence Berkeley (même fiche) : « the doors are not opened, and the ambient
temperature is maintained at 90 °F (32 °C) ».

**Note de captation.** Le texte actuel de l'annexe B de la partie 430 a aussi été enregistré
(`sources/18b-cfr-430-annexe-b-essai-congelateurs.html`, Legal Information Institute, Cornell,
https://www.law.cornell.edu/cfr/text/10/appendix-B_to_subpart_B_of_part_430) : il renvoie les
conditions d'essai à la norme de l'association des fabricants et n'écrit pas lui-même la
température. Le 90 °F se lit dans la méthode ENERGY STAR ci-dessus et dans le rapport du LBNL.
La norme canadienne elle-même (payante) n'a pas été lue.

---

## Ce que le chapitre en tire

- **Sourcé :** le régulateur canadien accepte l'essai américain des congélateurs ; cet essai se
  fait à 32,2 °C, portes fermées. Le 32 °C du chapitre tient.
- **Sourcé, et le chapitre ne le dit pas :** ce 32 °C porte fermée est fait pour **tenir lieu**
  d'une pièce ordinaire où l'on ouvre et où l'on rentre des aliments tièdes. Conséquence
  (raisonnement de vérification) : un coffre dans la remise, qu'on ouvre peu, est bien estimé par
  la règle de l'écart ; un coffre dans le chalet chauffé, ouvert tous les jours, est plus près du
  chiffre de l'étiquette que des 0,60 kWh/j de la colonne « chalet à 20 °C » de l'étape 2.
