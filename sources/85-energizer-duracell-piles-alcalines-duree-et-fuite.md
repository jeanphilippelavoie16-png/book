# Energizer et Duracell — piles alcalines : durée de conservation, fuite, piles laissées dans l'appareil

- **Organismes :** Energizer et Duracell, fabricants de piles
- **Page 1 :** Energizer, « Energizer® Non-Rechargeable Batteries: Frequently Asked Questions »,
  version 6.2, ©2012 — https://data.energizer.com/pdfs/non-rechargeable_faq.pdf
  — enregistrée : `85-energizer-faq-piles-non-rechargeables.pdf`
- **Page 2 :** Energizer, « Frequently Asked Questions — Alkaline Batteries », ©2004 (version
  antérieure, gardée pour le recoupement) — https://data.energizer.com/pdfs/alkaline_faq.pdf
  — enregistrée : `85-energizer-faq-alcalines.pdf`
- **Page 3 :** Duracell, « Battery FAQs & Answers » — https://duracell.com/faq
  — enregistrée : `85-duracell-faq.html` (texte extrait : `85-duracell-faq-texte.txt`)
- **Consultées le :** 24 septembre 2026, `curl`, HTTP 200 les trois. Texte des PDF extrait avec
  `pdftotext -layout`.
- **Sert au chapitre :** 85 — Le stock de pièces et de consommables (§5.2, ligne « Piles
  alcalines »; §7, ligne « Dépôt blanc poudreux dans un boîtier à piles »)
- **Complète :** `85-energizer-e91-fiche-technique.md` (premier passage, 23 septembre : « Shelf
  Life: 10 years at 21°C » pour la AA E91)

> **Statut.** Fabricants. Aucune source officielle canadienne ne publie de durée de conservation
> des piles alcalines (`85-NON-OBTENUES.md`).

---

## Extraits intégraux — page 1 (Energizer, 2012)

> « 4. How long can I store batteries?
> When stored at room temperature (i.e. 70°F/ 21°C), cylindrical alkaline batteries have a shelf
> life of 5 to 10 years and cylindrical carbon zinc 3 to 5 years. Lithium Cylindrical types can be
> stored from 10 to 15 years. Prolonged storage at elevated temperatures will shorten storage
> life. »

> « 1. Is it a good idea to store batteries in a refrigerator or freezer?
> No, storage in a refrigerator or freezer is not required or recommended for batteries produced
> today. Cold temperature storage can in fact harm batteries if condensation results in corroded
> contacts or label or seal damage due to extreme temperature storage. To maximize performance and
> shelf life, store batteries at normal room temperatures (68°F to 78°F or 20°C to 25°C) with
> moderated humidity levels (35 to 65% RH). »

> « 13. What increases the possibility for alkaline battery leakage?
> Typically alkaline batteries will not leak under normal storage and/or usage conditions. The
> potential for leakage is significantly increased however if the batteries are subjected to
> charging, mixing of battery chemistries, mixing of fresh and used batteries, physical damage,
> extended exposure to high temperature or deep discharged. Alkaline battery leakage is extremely
> caustic and contact with bare skin should be avoided. In the event that battery leakage comes in
> contact with your skin, flush the area for 15 minutes with copious amounts of water and seek
> medical attention. »

> « 2. Why is mixing batteries of different chemistries, brands or age a potential problem? […]
> As the weakest battery becomes exhausted, it will be force discharged by the stronger batteries
> to very low or negative voltage levels which drastically increases the potential for leakage. »

## Extrait intégral — page 2 (Energizer, 2004)

> « 11. How long can I store batteries?
> When stored at room temperature (i.e. 70°F/ 21°C, Cylindrical Alkaline batteries have a shelf
> life of 5 to 7 years and cylindrical Super Heavy-Duty (carbon zinc) 3 to 5 years. Storing the
> batteries at higher temperatures, shortens the shelf life. »

> « 2. Why doesn't my flashlight work well in cold weather?
> Alkaline and carbon zinc batteries contain a water based electrolyte. As the battery temperature
> approaches the freezing point of water (32°F or 0°C) chemical reactions within the battery slow
> down […]. The net result is a reduction in overall performance or run time which can be
> recovered as temperatures approach typical room conditions »

## Extraits intégraux — page 3 (Duracell)

> « DO - Remove batteries from the device as soon as possible after they are depleted. Some
> devices may continue to draw power from exhausted batteries, which may cause the batteries to
> leak. »

> « DON'T - Leave batteries in your device if you suspect it will not be used for several months.
> Many devices don't power off completely when switched off and, after time, may cause the
> batteries inside to leak. »

> « DON'T - Put batteries or battery-powered devices in very warm places. Extreme temperatures
> reduce battery performance and may also lead to leakage. »

> « How do I clean up after a battery leak? […] Work in a well-ventilated area. Wear household
> gloves and glasses. Using a toothbrush or cotton swab, remove battery leakage from the electrical
> contacts. Make sure the electronic device is completely dry before trying a new battery. […] To
> clean any leakage of the following battery types, Alkaline, NiCAD and NiMH batteries, use either
> one tablespoon of boric acid in one gallon of water or a mixture of equal amounts of diluted
> vinegar or lemon juice with water (50/50 ratio). »

---

## Ce que le chapitre 85 en tire

- **Durée :** 5 à 10 ans à 21 °C selon le fabricant (10 ans pour la AA E91 de la fiche technique);
  plus court au chaud. La version 2004 disait 5 à 7 ans : la durée a monté avec les générations de
  piles, la date imprimée par le fabricant reste la référence.
- **Pourquoi elles coulent dans l'appareil :** beaucoup d'appareils ne coupent jamais tout à fait
  le courant; la pile déchargée à fond coule. D'où : **sortir les piles d'un appareil qui dort
  plusieurs mois**. C'est le mécanisme de la phrase du chapitre « Elles coulent dans le boîtier de
  l'appareil où elles dorment ».
- **Le dépôt se nettoie** au vinaigre dilué ou au jus de citron dilué moitié-moitié, à la brosse à
  dents ou au coton-tige, gants et lunettes, appareil séché avant la pile neuve. Contact avec la
  peau : rincer 15 minutes.

## Ce que les pages NE disent PAS

- **Où est imprimée la date.** La FAQ Energizer Canada
  (https://energizer.com/canada/about-batteries/battery-faq/) le dirait d'après le résumé d'un
  moteur de recherche — année « Best If Used By » dans une case blanche en haut de la pile, sur
  l'emballage pour les petites piles —, mais l'adresse répond **HTTP 404** le 24 septembre 2026 :
  page non enregistrée, rien de cette phrase n'est retenu comme source.
