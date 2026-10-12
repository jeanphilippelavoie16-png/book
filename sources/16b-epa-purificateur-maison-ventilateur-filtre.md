# EPA — Purificateur d'air maison (ventilateur-boîte et filtre de fournaise) contre la fumée de feu de forêt

- **Organisme :** Environmental Protection Agency des États-Unis (EPA), Office of Research and
  Development
- **Page :** « Research on DIY Air Cleaners to Reduce Wildfire Smoke Indoors » — dernière mise à jour
  le 6 juillet 2026
- **URL :** https://www.epa.gov/air-research/research-diy-air-cleaners-reduce-wildfire-smoke-indoors
- **Date de consultation :** 24 septembre 2026
- **Captation :** `curl`, HTTP 200 ; page enregistrée : `sources/16b-epa-purificateur-maison-ventilateur-filtre.html` ;
  texte extrait : `sources/16b-epa-purificateur-maison-ventilateur-filtre-texte.txt`
- **Sert au chapitre :** 16b — Le feu de forêt, §9 « De l'air pour les enfants, sans purificateur »
  (« Le rendement réel de ce montage n'est pas chiffré `[À VÉRIFIER]` »)
- **Rang :** agence fédérale américaine ; essais en chambre de laboratoire, fumée simulée d'aiguilles
  de pin qui couvent. Aucune source canadienne consultée ne chiffre ce montage
  (`sources/00b-sante-canada-preparation-fumee-feux-foret.md` : « Aucune source ne chiffre la
  capacité de l'appareil »).

---

## Extraits intégraux

> « Do-It-Yourself (DIY) air cleaners, made with a box fan and MERV 13 air filter, are a
> cost-effective method for reducing smoke concentrations. »

> « DIY air cleaners are made by attaching an air filter to a box fan with tape, brackets/clamps, or
> a bungee cord. »

> « The Minimum Efficiency Reporting Value (MERV) rating of the filter strongly impacts the Clean Air
> Delivery Rate (CADR). It is recommended to use a MERV 13 filter(s) to remove the very small
> particles in wildfire smoke. »

> « The CADR is a measure of the volume of filtered air that an air cleaner delivers. [...] The
> Association for Home Appliance Manufacturers suggest using an air cleaner with a CADR equal to the
> square footage of the room to be cleaned. »

### Tableau « Wildfire smoke CADR » (tel que publié ; unités non écrites sur la page, pieds cubes par minute par convention de la mesure)

| Montage | CADR fumée de feu de forêt |
| --- | --- |
| Box fan with one 1" MERV13 filter | 111 ± 1 |
| Box fan with one 1" MERV13 filter and cardboard shroud | 156 ± 4 |
| Box fan with one 4" MERV13 filter and cardboard shroud | 248 ± 15 |
| Box fan with two 1" MERV13 filters and cardboard shroud | 263 ± 22 |
| Corsi-Rosenthal Box with four 1" MERV 13 filters and cardboard shroud | 401 ± 31 |

> « The addition of a cardboard shroud increases the CADR by 40% without any change in the cost or
> physical footprint. »

> « use of a single 4" MERV 13 filter is also highly effective (increased CADR by 123%) »

> « Check the filter daily during a wildfire smoke event. When the filter is dark brown or grey or
> smells like smoke, it is time to change it for a new filter. »

### Sécurité du ventilateur

> « When building a DIY air cleaner, it is recommended to use only NEWER box fans (since 2012), which
> have the added safety features of fused plugs and thermal cutoffs. »

> « EPA does not recommend using DIY air cleaners built with older model box fans (before 2012). If
> they are used, they should not be used unattended or while sleeping. »

> « The highest temperature increase, nearly 60 °C, was observed on the internal fan components with
> a dust laden filter. »

> « Air flow reductions were observed when filters were placed on the fans. »

---

## Conversion (calcul du rédacteur)

La règle « CADR = superficie en pieds carrés » donne la pièce que l'appareil peut traiter
(1 pi² = 0,093 m²) :

| Montage | Pièce traitée, environ |
| --- | --- |
| Ventilateur + 1 filtre, sans carton | **10 m²** (111 pi²) |
| Ventilateur + 1 filtre, carton autour | **14 m²** (156 pi²) |
| Ventilateur + 1 filtre épais (4 po), carton | 23 m² (248 pi²) |
| Cube de 4 filtres (Corsi-Rosenthal), carton | **37 m²** (401 pi²) |

**Ce que la page ne dit pas :** le rendement d'un pulseur de chaufferette de véhicule ou d'un
ventilateur d'ordinateur sur batterie ; le rendement d'un filtre moins fin que MERV 13.
