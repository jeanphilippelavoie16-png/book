# Hermine — *Mustela erminea* ou *Mustela richardsonii* : deux autorités, deux réponses

Consultées le 24 septembre 2026, `curl`, HTTP 200. Sert au glossaire (entrée Hermine) et au
ch. 43 (les traces et les signes, nouveau numéro).

## 1. ASM Mammal Diversity Database — *Mustela richardsonii*, espèce

- **Organisme :** American Society of Mammalogists, Mammal Diversity Database.
- **URL :** https://www.mammaldiversity.org/taxon/1006533/
- **Captation :** `glossaire-mdd-hermine-mustela-richardsonii.html`

> « Mustela richardsonii — Bonaparte, 1838 »

> « Formerly Mustela erminea, Ermine, Stoat, Short-tailed Weasel. »

> « Tundra and forested regions of Nearctic, except most of Alaska and some Pacific coast islands.
> Most of Canada, northern conterminous USA […] »

> « Taxonomy notes: split from M. erminea » — Colella, J.P. et coll. 2021, *Diversity and
> Distributions* 27(4):747-762, doi:10.1111/ddi.13234.

## 2. ITIS — *Mustela erminea*, espèce ; *richardsonii* rangé comme sous-espèce

- **Organisme :** Integrated Taxonomic Information System (agences fédérales américaines, avec
  partenaires canadiens).
- **Requêtes :** `https://www.itis.gov/ITISWebService/jsonservice/getFullRecordFromTSN?tsn=1086101`
  et `…?tsn=180555`
- **Captation :** `glossaire-itis-hermine-reponses.txt` (les deux réponses JSON, à la suite)

> TSN 1086101 « Mustela richardsonii » — `"taxonUsageRating":"invalid"`,
> `"acceptedName":"Mustela erminea richardsonii"`, mise à jour `2025-09-19`

> TSN 180555 « Mustela erminea » — `"taxonUsageRating":"valid"`, répartition incluant
> `"North America"`

## Ce que ça tranche

Les autorités **ne s'accordent pas** : l'ASM sépare l'hermine d'Amérique du Nord en espèce propre
(*M. richardsonii*) depuis 2021 ; ITIS, révisé en 2025, garde une seule espèce (*M. erminea*) et
fait de *richardsonii* une sous-espèce. Selon la consigne de JP, le livre garde ***Mustela
erminea*** et le glossaire note la question.
