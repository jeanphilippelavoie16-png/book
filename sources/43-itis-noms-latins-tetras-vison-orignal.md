# ITIS — Noms latins valides : tétras du Canada, vison d'Amérique, orignal

- **Organisme :** Integrated Taxonomic Information System (ITIS), partenariat d'agences
  fédérales des États-Unis et du Canada (Agriculture et Agroalimentaire Canada en est partenaire)
  et du Mexique. Référence de nomenclature des organismes publics nord-américains.
- **URL (service web officiel d'ITIS, réponses JSON) :**
  - https://www.itis.gov/ITISWebService/jsonservice/getTaxonomicUsageFromTSN?tsn=<TSN>
  - https://www.itis.gov/ITISWebService/jsonservice/getAcceptedNamesFromTSN?tsn=<TSN>
  - Fiche HTML de l'orignal : https://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=180703
- **Consultées le :** 24 septembre 2026
- **Copies enregistrées :** `43-itis-noms-latins-reponses.txt` (toutes les réponses JSON, avec
  l'adresse de chaque requête) ; `43-itis-alces-alces.html` (fiche HTML de l'orignal)
- **Sert à :** chapitre 43 — Comment lire une fiche d'espèce, § 5-I (tableau des noms latins)

## Extraits intégraux (réponses du service, 24 septembre 2026)

### Tétras du Canada

> TSN 553896 « Falcipennis canadensis » — `"taxonUsageRating":"invalid"` —
> `"acceptedName":"Canachites canadensis","acceptedTsn":"175783","author":"(Linnaeus, 1758)"`

> TSN 175783 « Canachites canadensis » — `"taxonUsageRating":"valid"`

Recoupement : la fiche de Cornell (`45-cornell-tetras-du-canada.html`,
`43b-cornell-tetras-du-canada-texte.txt`, ligne 46) porte « Spruce Grouse — Canachites
canadensis ».

### Vison d'Amérique

> TSN 726284 « Neovison vison » — `"taxonUsageRating":"invalid"` —
> `"acceptedName":"Neogale vison","acceptedTsn":"1271751","author":"(Schreber, 1777)"`

> TSN 1271751 « Neogale vison » — `"taxonUsageRating":"valid"`

### Orignal

> TSN 898198 « Alces americanus » (Clinton, 1822) — `"taxonUsageRating":"invalid"` —
> `"acceptedName":"Alces alces americana","acceptedTsn":"898970"`

> TSN 180703 « Alces alces » (Linnaeus, 1758) — `"taxonUsageRating":"valid"`

> TSN 898970 — `"combinedName":"Alces alces americana"` (sous-espèce)

Recoupement : la page fédérale Faune et flore du pays (`37-eccc-faune-flore-orignal.md`,
`35d-faune-et-flore-du-pays-orignal.md`) écrit « L'orignal (*Alces alces*) ».

## Ce que le chapitre 43 en tire

| Espèce | Texte du chapitre | Nom valide |
| --- | --- | --- |
| Tétras du Canada | *Falcipennis canadensis* | ***Canachites canadensis*** |
| Vison d'Amérique | *Neogale vison* | ***Neogale vison*** (confirmé ; ancien nom *Neovison vison*) |
| Orignal | *Alces americanus* | ***Alces alces*** (la forme de l'est de l'Amérique : *Alces alces americana*) |

## À propager

*Alces americanus* est aussi employé aux chapitres 24, 36 à 42 et au glossaire (voir les notes de
`37-eccc-faune-flore-orignal.md` et `39-quebec-orignal-biologie.md`). *Falcipennis canadensis*
figure au glossaire et au chapitre 45 (`45-hww-gelinotte-et-lagopedes.md`).
