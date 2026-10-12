# Energizer — plages de température des piles AA, alcaline (E91) et lithium (L91)

- **Organisme :** Energizer (fabricant de piles). **Source de fabricant**, pas une source
  officielle : aucune page gouvernementale consultée ne donne la tenue des piles au froid, et
  c'est le fabricant qui la publie.
- **Documents :**
  - « Product Datasheet — Energizer L91 AA, Ultimate Lithium », formulaire L91GL1222 —
    https://data.energizer.com/pdfs/l91.pdf
  - « Product Datasheet — Energizer E91 AA » (alcaline) — https://data.energizer.com/pdfs/e91.pdf,
    déjà au dossier : `sources/85-energizer-e91-fiche-technique.md` (+ PDF)
- **Date de consultation :** 24 septembre 2026 (L91) ; 23 septembre 2026 (E91)
- **Captation :** de première main, `curl`, HTTP 200. **PDF enregistré** :
  `sources/08-energizer-l91-fiche-technique.pdf` ; texte extrait (`pdftotext -layout`) :
  `sources/08-energizer-l91-fiche-technique-texte.txt`
- **Sert au chapitre :** 08 — Le stock permanent du chalet, §5.7 (éclairage) : « Leur autonomie
  chute au froid `[À VÉRIFIER]` »

---

## Extraits intégraux

### L91 — lithium AA (Li/FeS2)

> « Chemical System: Lithium/Iron Disulfide (Li/FeS2) »

> « Nominal Voltage: 1.5 Volts »

> « Sizing Compatibility E91 NH15 1215 »

> « Storage Temp: -40°C to 60°C (-40°F to 140°F) »

> « Operating Temp: -40°C to 60°C (-40°F to 140°F)* »

> « *All data shown tested at 21°C unless otherwise stated. »

La fiche porte aussi un graphique « Temperature Effects on Capacity » (de -50 à 30 °C, à 25, 250
et 1000 mA), dont les valeurs ne sont pas lisibles dans l'extraction texte : rien n'en est cité.

### E91 — alcaline AA (fiche déjà au dossier)

> « Operating Temp: -18°C to 55°C (0°F to 130°F) »

> « Shelf Life: 10 years at 21°C »

---

## Lecture pour le livre

- **L'alcaline AA est donnée pour fonctionner jusqu'à -18 °C, pas plus bas.** À -30 °C dehors,
  une frontale à alcalines est hors de la plage que son fabricant garantit.
- **La lithium AA, même format, même tension nominale (1,5 V), remplace l'alcaline** (« Sizing
  Compatibility E91 ») et est donnée pour fonctionner jusqu'à **-40 °C**.
- Rien sur le rebond d'une pile froide qu'on réchauffe : le livre n'en dit rien.
- Au dossier aussi : le froid fait « chirper » la pile d'un avertisseur comme si elle était faible
  (`sources/15b-kidde-avertisseur-co-bouton-et-temperature.md`).
