# NIST — Technical Note 2163, *P-Flash* : la définition chiffrée de l'embrasement généralisé

- **Organisme :** National Institute of Standards and Technology (NIST), Fire Research Division,
  département du Commerce des États-Unis
- **Titre :** *P-Flash — A Machine Learning based Flashover Prediction Model to Enable Smart
  Firefighting for Compartment Fires*, NIST Technical Note 2163
- **Auteurs :** Wai Cheong Tam, Richard Peacock, Paul Reneke, Thomas Cleary (NIST) ; Jun Wang,
  Eugene Yujun Fu (Hong Kong Polytechnic University)
- **Date :** juin 2021 — DOI https://doi.org/10.6028/NIST.TN.2163
- **URL de captation :** https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=932165
- **Consultée le :** 23 septembre 2026
- **Captation :** WebFetch, PDF de 1,2 Mo **enregistré en entier** à côté de cette fiche :
  `sources/16-nist-tn2163-embrasement.pdf`. Texte extrait avec `pdftotext`.
- **Sert au chapitre 16 pour :** §3, le délai d'évacuation et l'embrasement de la pièce. Lève le
  drapeau 1 de `suivi/verifications/16-verifications.md`.

---

## Extraits intégraux

> « Although flashover conditions (i.e., hot layer gas temperature approximately 600 C and/or
> average heat flux at the floor level reaching 20 kW/m2) are well known in the fire research
> community, this kind of detailed information about the interior thermal conditions is usually
> unavailable. »

> « In a structural fire, rollover [3] is one possible indicator. Visually, it can be seen as
> flames rolling across the ceiling. When rollover phenomenon is observed, a potential flashover
> is likely to occur. »

> « For actual fire scenarios, heat detectors cannot survive at elevated temperature [7] and would
> fail at temperatures well below the estimated flashover temperature (~ 600 C). »

---

## Complément : USDA Forest Products Laboratory, *Wood Handbook*, ch. 18 (2021)

Enregistré dans `16-usda-fpl-wood-handbook-ch18-bois-chauffe.md`. Il donne la définition
visuelle, sans chiffre :

> « The visual criteria for flashover are full involvement of the compartment contents and flames
> out the door or window (Fig. 18-1). »

---

## Ce que la source établit pour le chapitre 16

Le seuil existe et il est chiffré : **environ 600 °C dans la couche de gaz chauds du plafond**
(ou un rayonnement de 20 kW/m² reçu au plancher). Ce n'est pas la « température d'inflammation »
de la couche elle-même : c'est la chaleur que cette couche **rayonne vers le bas** qui allume
tout ce qui est dans la pièce en même temps. Le signe visible juste avant : des flammes qui
roulent sous le plafond.
