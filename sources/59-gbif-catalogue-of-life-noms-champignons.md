# GBIF (Catalogue of Life, TAXREF) — noms latins acceptés et noms français des champignons du ch. 59

- **Organisme :** Global Biodiversity Information Facility (GBIF), infrastructure
  intergouvernementale dont le Canada est membre. Le référentiel taxonomique du GBIF intègre le
  *Catalogue of Life* (liste mondiale des espèces) ; les noms vernaculaires français viennent du
  Catalogue of Life et de TAXREF (référentiel taxonomique national de la France, Muséum national
  d'Histoire naturelle).
- **Adresses interrogées :**
  - `https://api.gbif.org/v1/species/match?kingdom=Fungi&name=<nom latin>` (statut du nom :
    accepté ou synonyme, et nom accepté)
  - `https://api.gbif.org/v1/species/<clé>/vernacularNames?limit=300` (noms vernaculaires)
  - Fiches lisibles : `https://www.gbif.org/species/<clé>`
- **Date de consultation :** 23 septembre 2026
- **Chapitre qui s'en sert :** 59 — Champignons (§ 5-A, tableau de vocabulaire ; § 9, amadouvier)
- **Enregistrement :** réponses de l'API recopiées intégralement ci-dessous (nom interrogé, nom
  retourné avec auteur, statut, clé, nom accepté, puis tous les noms français et leur source).

**Portée.** Cette source valide **la correspondance entre un nom français et un nom latin**, et le
statut du nom latin (accepté ou ancien). Elle ne dit rien de la comestibilité ni de la toxicité :
pour ça, voir `59-fda-bad-bug-book-toxines-champignons.md`.

---

## Réponses intégrales de l'API

- Coprinus atramentarius | Coprinus atramentarius (Bull.) Fr. | SYNONYM | clé 2534388 | espèce acceptée : Coprinopsis atramentaria (clé 5242740)
    - « Coprin noir d'encre » — Catalogue of Life
- Coprinopsis atramentaria | Coprinopsis atramentaria (Bull.) Redhead, Vilgalys & Moncalvo | ACCEPTED | clé 5242740
    - « Coprin noir d'encre » — Catalogue of Life
- Clitocybe clavipes | Clitocybe clavipes (Pers.) P.Kumm. | SYNONYM | clé 2538871 | espèce acceptée : Ampulloclitocybe clavipes (clé 2538864)
- Ampulloclitocybe clavipes | Ampulloclitocybe clavipes (Pers.) Redhead, Lutzoni, Moncalvo & Vilgalys | ACCEPTED | clé 2538864
    - « Clitocybe faux-squamuleux » — Catalogue of Life
    - « Clitocybe à pied en massue » — Catalogue of Life
    - « Clitocybe à pied renflé » — Catalogue of Life
    - « Tête de moine, Clitocybe à pied en massue » — TAXREF
- Cantharellus cibarius | Cantharellus cibarius Fr. | ACCEPTED | clé 5249504
    - « Chanterelle commune » — Catalogue of Life
    - « Chanterelle » — The IUCN Red List of Threatened Species
    - « Girolle » — Catalogue of Life, TAXREF, IUCN
    - (autres noms régionaux de France : chanterelle à plis pâles, chevrette, fifrelin, gallinace,
      girole, jauniré, jaunotte, mérule chanterelle, roussette, roussotte)
- Hydnum repandum | Hydnum repandum L. | ACCEPTED | clé 2554716
    - « Pied de mouton » — TAXREF
    - « Pied-de-mouton » — Catalogue of Life
- Boletus edulis | Boletus edulis Bull. | ACCEPTED | clé 5954958
    - « Cèpe » — Catalogue of Life, IUCN
    - « Cèpe de Bordeaux, Cèpe du Périgord » — TAXREF
- Tricholoma magnivelare | Tricholoma magnivelare (Peck) Redhead | ACCEPTED | clé 5241741
    - « Tricholome à grand voile » — Catalogue of Life
- Amanita virosa | Amanita virosa Bertill. | ACCEPTED | clé 5240323
    - « Amanite vireuse » — Catalogue of Life
    - « Amanite vireuse, Ange de la mort, Ange destructeur » — TAXREF
- Amanita bisporigera | Amanita bisporigera G.F.Atk. | ACCEPTED | clé 5452051
    - « Amanite bisporigère » — Catalogue of Life
    - « Ange de la mort, Amanite bisporigère » — TAXREF
- Galerina autumnalis | Galerina autumnalis (Peck) A.H.Sm. & Singer | SYNONYM | clé 2533854 | espèce acceptée : Galerina marginata (clé 8118872)
- Galerina marginata | Galerina marginata (Batsch) Kühner | ACCEPTED | clé 8118872
    - « Galère marginée » — Catalogue of Life
    - « Galère marginée, Pholiote marginée » — TAXREF
    - « Galérine marginée » — Catalogue of Life
- Gyromitra esculenta | Gyromitra esculenta Pers. ex Fr. | ACCEPTED | clé 5258510
    - « Gyromitre commun » — Catalogue of Life
    - « Gyromitre fausse morille » — Catalogue of Life
    - « Fausse morille, Gyromitre fausse morille, Moricaude, Cervelot, Gyromitre commune » — TAXREF
- Cortinarius orellanus | Cortinarius orellanus Fr. | ACCEPTED | clé 2528684
    - « Cortinaire couleur de Rocou » — Catalogue of Life
    - « Cortinaire à couleur de rocou, Cortinaire des montagnes » — TAXREF
- Fomes fomentarius | Fomes fomentarius (L.) Fr. | ACCEPTED | clé 8068867
    - « Amadouvier, Polypore allume-feu » — TAXREF

---

## Ce que ça règle au chapitre 59

| Ligne du tableau | Résultat |
| --- | --- |
| Coprin noir d'encre — *Coprinopsis atramentaria* | Correspondance confirmée ; nom latin accepté. *Coprinus atramentarius* (Bad Bug Book) est l'ancien nom |
| Clitocybe à pied renflé — *Ampulloclitocybe clavipes* | Correspondance confirmée ; nom latin accepté. *Clitocybe clavipes* est l'ancien nom |
| Chanterelle commune — *Cantharellus cibarius* | Confirmé |
| Hydne sinué, pied-de-mouton — *Hydnum repandum* | « Pied-de-mouton » confirmé. **« Hydne sinué » n'apparaît dans aucune des deux listes** |
| Bolet comestible, cèpe — *Boletus edulis* | « Cèpe » confirmé. **« Bolet comestible » n'apparaît pas** |
| Matsutaké américain — *Tricholoma magnivelare* | Nom latin accepté. **Le nom français donné est « tricholome à grand voile »** ; « matsutaké américain » n'apparaît pas |
| Amanite vireuse — *Amanita virosa* | Confirmé |
| Amanite bisporigère — *Amanita bisporigera* | Confirmé |
| Galérine marginée — *Galerina marginata* | Confirmé (« galère marginée » est l'autre forme). *Galerina autumnalis* (Bad Bug Book) en est un synonyme |
| Gyromitre comestible, fausse morille — *Gyromitra esculenta* | Nom latin et « fausse morille » confirmés. **« Gyromitre comestible » n'apparaît pas** : les noms donnés sont « gyromitre commun(e) » et « gyromitre fausse morille » |
| Amadouvier — *Fomes fomentarius* (§ 9) | Confirmé |

## Limite

Ces listes sont mondiales ; les noms vernaculaires sont surtout ceux de France. Elles ne disent
pas si une espèce européenne est la même que celle qui pousse sur la Côte-Nord. Le chapitre ne
s'en sert que comme vocabulaire, jamais comme autorisation de manger.
