# Energizer — Les piles au froid : alcalines et lithium AA

- **Organisme :** Energizer Brands, LLC (fabricant de piles)
- **Documents :**
  1. *Alkaline Manganese Dioxide Handbook and Application Manual* (© 2018)
     — URL : https://data.energizer.com/pdfs/alkaline_appman.pdf
     — PDF enregistré : `sources/18-energizer-alcaline-manuel.pdf` ; texte : `sources/18-energizer-alcaline-manuel-texte.txt`
  2. *Cylindrical Primary Lithium Handbook and Application Manual* (Li/FeS2, AA et AAA, formulaire 12004-A)
     — URL : https://data.energizer.com/pdfs/lithiuml91l92_appman.pdf
     — PDF enregistré : `sources/18-energizer-lithium-l91-manuel.pdf` ; texte : `sources/18-energizer-lithium-l91-manuel-texte.txt`
- **Date de consultation :** 24 septembre 2026
- **Captation :** `curl`, HTTP 200, texte extrait par `pdftotext -layout`
- **Sert au chapitre :** 18 — Éclairage, §7 Signes d'échec, ligne « La frontale meurt en quelques
  minutes dehors, puis repart une fois réchauffée »

---

## Extraits intégraux

### Piles alcalines

> « The recommended operating temperature range for alkaline batteries is -18° C to 55° C. However,
> it is important to keep in mind that battery performance is still impacted by temperature within
> the recommended range. »

> « As the temperature is decreased, performance decreases accordingly. The lower temperature limit
> is determined in part by the temperature at which the electrolyte freezes. The Alkaline-Manganese
> Dioxide cell can operate at temperatures as low as -20oC however this performance will be
> significantly lower (fig. 5). »

> « Cold temperatures and their subsequent slowing of the chemical kinetics reactions impact the
> internal resistance (Ri) of the cell. High drain rates in cold environments will cause a large
> voltage drop due to the higher battery Ri. »

> « No capacity is actually lost due to cold temperatures; rather it is more difficult to access the
> full potential of the battery due to the slowing of the electrochemical reactions. »

> « As an example: if a flashlight is stored in a car on a very cold night, the flashlight would not
> be as bright or last as long when used. However, if this flashlight is taken indoors and allowed to
> warm up for several hours, its performance would return to normal. »

### Piles au lithium (lithium-disulfure de fer, format AA et AAA, non rechargeables)

> « The recommended operating temperature range is -40°C to +60°C (-40°F to +140°F). As with all
> battery systems, service life is reduced as the discharge temperature is lowered below room
> temperature (Fig. 2). »

> « Battery capacity is not lost due to cold temperature use, rather it is more difficult to access
> the battery's full potential due to the slowing of the electrochemical reactions, reducing
> capacity at high drain rates. »

> « When comparing cold temperature performance of the LiFeS2 battery versus an alkaline based
> aqueous system, the LiFeS2 system is affected much less across a range of drain rates (Fig. 4) and
> operates at temperatures where alkaline batteries do not run at all. »

---

## Ce que le chapitre en tire

| Fait | Chiffre |
| --- | --- |
| La pile froide n'a rien perdu : elle ne livre plus | « No capacity is actually lost » |
| Réchauffée, elle revient à la normale | quelques heures à l'intérieur pour une lampe laissée au froid |
| Plage de la pile alcaline | -18 à 55 °C ; fonctionne jusqu'à -20 °C, nettement moins bien |
| Plage de la pile au lithium AA/AAA | -40 à +60 °C ; marche là où l'alcaline ne marche plus du tout |
| Ce qui aggrave | un appareil qui tire fort (frontale au maximum) : la chute de tension est plus grande au froid |

**Ce que la source ne dit pas :** combien de minutes une frontale tient à -35 °C. Le chapitre ne
chiffre pas la durée.
