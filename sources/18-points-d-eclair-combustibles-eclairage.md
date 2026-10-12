# Points d'éclair des combustibles d'éclairage — essence, naphta, kérosène, huile à lampe

- **Date de consultation :** 24 septembre 2026
- **Sert au chapitre :** 18 — Éclairage, section 8, partie 3 (« Les points d'éclair précis
  restent `[À VÉRIFIER]` ») et partie 4 (huile à lampe avalée : aspiration, ne pas faire vomir)

## Documents

1. **NIOSH (National Institute for Occupational Safety and Health, CDC, États-Unis) — *Pocket
   Guide to Chemical Hazards***, fiches révisées le 30 octobre 2019 :
   - Gasoline — https://www.cdc.gov/niosh/npg/npgd0299.html
   - Kerosene — https://www.cdc.gov/niosh/npg/npgd0366.html
   - VM & P Naphtha — https://www.cdc.gov/niosh/npg/npgd0664.html
   - Petroleum distillates (naphtha) — https://www.cdc.gov/niosh/npg/npgd0492.html
   - **Captation :** le serveur du CDC refuse `curl` (HTTP 403, « Access Denied »). Pages lues par
     `WebFetch` ; les extraits ci-dessous sont les valeurs rendues, transcrites telles quelles. **La
     page elle-même n'a pas pu être enregistrée** — si elle disparaît, les valeurs de l'essence et
     du kérosène restent recoupées par les deux fiches de fabricant plus bas pour le naphta et
     l'huile à lampe, pas pour l'essence ni le kérosène.
2. **The Coleman Company, Inc. — Fiche de données de sécurité, *Coleman Camp Fuel*** (le « naphta »
   des fanals), version 5.1, révision du 07/04/2022
   - URL de captation : https://pdf.lowes.com/productdocuments/711459ad-1d09-4fe6-bf94-388642ed144f/74946251.pdf
     (hébergée par un détaillant ; document du fabricant, non modifié)
   - PDF enregistré : `sources/18-coleman-camp-fuel-fds.pdf` ; texte : `sources/18-coleman-camp-fuel-fds-texte.txt`
3. **Lamplight Farms, Inc. — Fiche signalétique, *Ultra Pure Lamp Oil*** (huile à lampe
   paraffinique), révision 3 du 9 janvier 2007
   - URL de captation : https://www.pacwestspfx.com/uploads/b/cb6e2e80-cdf2-11eb-9fd2-3111f6e4ef1b/Lamp%20Oil%20paraffin%20based%20msds.pdf
     (hébergée par un détaillant ; document du fabricant)
   - PDF enregistré : `sources/18-lamplight-ultra-pure-huile-a-lampe-fds.pdf` ; texte :
     `sources/18-lamplight-ultra-pure-huile-a-lampe-fds-texte.txt`

---

## Extraits intégraux

### NIOSH

> Gasoline — Synonyms : « Motor fuel, Motor spirits, Natural gasoline, Petrol » — « Flash Point
> (FLP): -45°F » — « Lower Explosive Limit (LEL): 1.4% » — « Clear liquid with a characteristic odor. »

> Kerosene — Synonyms : « Fuel Oil No. 1, Range oil » — « Flash Point (FLP): 100-162°F »

> VM & P Naphtha — Synonyms : « Ligroin, Painters naphtha, Petroleum ether, Petroleum spirit,
> Refined solvent naphtha, Varnish makers' & painters' naphtha » — « Flash Point: 20-55°F »

> Petroleum distillates (naphtha) — Synonyms : « Aliphatic petroleum naphtha, Petroleum naphtha,
> Rubber solvent » — « Flash Point (FLP): -40 to -86°F » — « Colorless liquid with a gasoline- or
> kerosene-like odor. »

### Coleman Camp Fuel

> « Flash point : < -18 °C (-0.4°F) »

> « Flammability (solid, gas) : Extremely flammable vapour. »

> « Explosion hazard : Vapors are heavier than air and may travel considerable distances to
> ignition sources to flash »

> « P331 - Do NOT induce vomiting. »

> « Aspiration hazard : May be fatal if swallowed and enters airways. »

### Lamplight Ultra Pure Lamp Oil

> « FLASH POINT / METHOD: 207°F (97° C) / PM »

> « Water white, oily liquid. Mild hydrocarbon odor. »

> « INGESTION: Lung exposure to this product either by prolonged breathing of a mist or vomiting
> following ingestion, can lead to serious lung injury and possibly death. »

> « INGESTION: DO NOT INDUCE VOMITING. Seek medical advice immediately. »

> « STORAGE / TRANSPORT TEMPERATURE: Ambient. (Product will freeze at 32° F (0° C)) »

---

## Conversions (calcul du rédacteur, °F → °C)

| Combustible | Point d'éclair publié | En °C |
| --- | --- | --- |
| Essence | -45 °F | **-43 °C** |
| Naphta de camping (Coleman) | < -18 °C | **sous -18 °C** |
| Naphta pétrolier (solvant) | -40 à -86 °F | -40 à -66 °C |
| Naphta VM&P (peintres) | 20 à 55 °F | -7 à 13 °C |
| Kérosène | 100 à 162 °F | **38 à 72 °C** |
| Huile à lampe paraffinique (Lamplight Ultra Pure) | 207 °F | **97 °C** |

## Ce que le chapitre en tire

- Essence et naphta de camping font leur nuage de vapeur **bien sous zéro** : à -18 °C déjà, et
  l'essence à -43 °C. Un bidon ouvert dans une pièce est entouré de vapeur prête à prendre, hiver
  comme été.
- Le kérosène ne fait assez de vapeur pour s'enflammer qu'**au-dessus de 38 °C**, l'huile à lampe
  paraffinique au-dessus de **97 °C** : il faut que la mèche les chauffe.
- **Les huiles à lampe ne sont pas toutes pareilles** : « huile à lampe » couvre des paraffines
  (97 °C pour celle-ci) et des produits proches du kérosène. Le chapitre ne donne pas un chiffre
  unique pour « l'huile à lampe ».
- Fait hors drapeau : **l'huile paraffinique gèle à 0 °C** selon son fabricant — une lampe laissée
  dans un chalet froid ne s'allume pas avant d'avoir réchauffé.
- Aspiration : le fabricant de l'huile à lampe et celui du naphta disent tous deux **ne pas faire
  vomir**, et nomment le poumon comme l'organe atteint.
