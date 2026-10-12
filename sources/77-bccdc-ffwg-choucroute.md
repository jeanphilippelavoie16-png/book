# BCCDC + Groupe de travail national sur les aliments fermentés — Section 3.2, Choucroute

- **Organisme :** Environmental Health Services, **BC Centre for Disease Control**, pour le
  **Fermented Foods Working Group** (groupe national FPT, membres du MAPAQ inclus — voir
  `sources/77-bccdc-ffwg-legumes-fermentes.md` pour la composition)
- **Titre exact :** *Safety of fermented foods* — **Section 3.2 Sauerkraut**
- **Auteur de la section :** Lorraine McIntyre, BC Centre for Disease Control
- **Date affichée :** août 2024, « Updated December 2024 »
- **URL :** https://www.bccdc.ca/resource-gallery/Documents/Educational%20Materials/EH/FPS/Food/Fermented/Fermented%20Foods%20Guideline%20-%203.2%20Sauerkraut.pdf
- **Date de consultation :** 2026-09-20
- **Capture :** de première main, `curl` puis `pdftotext -layout`, HTTP 200, PDF de 1,3 Mo
- **Sert au chapitre :** 77 — Fermentation (sections 1, 2, 3, 5, 6, 7, 9, 10)

---

## L'extrait le plus important du dossier du chapitre 77

C'est la seule source officielle retrouvée qui chiffre la **vitamine C d'une choucroute**, et qui
la relie explicitement au scorbut.

> « Historically, sauerkraut can be traced back to the first century A.D. and gained prominence in
> 1775 when it was acclaimed by Captain James Cook as a food capable of preventing scurvy as
> **sauerkraut is a good source of vitamin C, containing 300 to 700 mg/kg**. »

**Conversion faite par le livre, arithmétique simple et déclarée :** 300 à 700 mg/kg = **30 à
70 mg par 100 g**. Aucune autre transformation n'est appliquée.

**Ce chiffre entre en tension avec le Fichier canadien sur les éléments nutritifs**, qui donne
14,7 mg/100 g pour « Choucroute, conserve, solides et liquide » (code 2201, 184 observations).
Les deux ne décrivent pas le même produit : le FCÉN décrit une **conserve**, donc un produit
pasteurisé ; la section 3.2 parle de la choucroute comme aliment historique de bord, non chauffé.
La tension elle-même est l'argument du chapitre 77 et elle est exposée comme telle, pas gommée.
Voir `sources/77-sante-canada-fcen-vitamine-c-et-sodium-legumes.md`.

---

## Extraits intégraux, relevés le 2026-09-20

### Le sel — la valeur de référence du chapitre

> « Added salt to promote LAB fermentation, **optimal 2.25% w/w** (>0.7% NaCl <3.0% or in 5% salt
> brine solution) »

> « The percentage of salt can vary from 0.7% to 3%, with optimal at 2.25% (w/w). This range is
> important for selection and growth promotion of LAB. »

> « **Salt concentrations above 3.5% should be avoided** as higher amounts are detrimental to
> growth of *Leuconostoc* bacteria at the beginning of the fermentation process. »

> « When salt is added at too high of a concentration, "pink kraut", may result that is a
> discolouration due to formation of a water soluble red pigment. Yeast growth from *Rhodotorula*
> causes the pink colour and creates a slimy sauerkraut from yeast pectinase activity. »

> « When salt concentrations are too low, "soft kraut" may occur, when it takes too long for lactic
> acids to form. »

Tableau « Potential issues » :

> « High salt >3.5% — Slows growth of LAB allowing yeasts to grown, resulting in pink coloured
> sauerkraut and off flavours. »

> « Low salt <0.8% — Pectinases result in slimy sauerkraut. May also favor one type of LAB leading
> to poor flavours. »

### La température

Diagramme des points de contrôle :

> « Time: up to 4 weeks · **Temp: 10°C to 25°C** »

> « Fermentation temperatures should not generally be conducted at temperatures above 25°C or
> below 10°C as these favor the growth of spoilage organisms, affect flavour and may also result in
> poor LAB activity. »

> « High temp >25°C — LAB grows very fast with rapid acid production resulting in very poor
> flavour. During initial stages, before LAB population increase there is also risk of aerobic
> yeasts and moulds that also impart off-flavours before acid environment stops their growth. »

> « Low temp <10°C — Delay in start of fermentation that can lead to spoilage and off flavours.
> **Cabbage should be at room temperature.** »

### Le pH et l'acidité, étape par étape

> « The initial pH of the cabbage and salt brine prior to fermentation beginning is usually 5.9 to
> 6.5; the initial sugar concentration in cabbage is 4 to 5% providing the carbohydrates necessary
> for LAB fermentation. »

> « After one week, sauerkraut may be packaged, as long as the pH is below 4.2 and the total acids
> are >1% lactic acid. At this pH the sauerkraut has a milder flavour. »

> « Extended fermentations from several weeks to several months will result in lower pH to 3.4;
> higher acid content from 1.5% to 2.0% (lactic and acetic acid) and provides a sharper flavour. An
> acidity of 1.5% can occur in as little as 10 days depending on temperature. »

Diagramme des points de contrôle, produit frais :

> « Fresh sauerkraut: pH is <4.2 before packaging & refrigeration · Lactic acid >1.5% total acids »

### Les quatre temps d'une fermentation spontanée (encadré 2)

> « (1) Aerobic bacteria present on the cabbage, e.g., *Pseudomonas*, *Flavobacterium*,
> *Acinetobacteria* will decrease in numbers once the cabbage is tightly packed into a container.
> Oxygen is used up by facultative anaerobic bacteria, after two to three days the pH decreases, as
> various organic acids are released. »

> « *Leucononostoc* bacteria (*Lc. mesenteroides* primarily and also *Lc. fallax*) normally present
> on cabbage leaves in small numbers will rapidly increase in numbers up to 10⁸ CFU/mL in anaerobic
> conditions within 12 to 14 hours, lowering the pH in the brine by release of lactic acid and
> acetic acid bacteria. **Leuconostoc bacteria also release CO2 into the brine establishing an
> anaerobic environment early in this process.** Lactic acid content is usually <1% after one
> week. »

> « In the second week, homofermentative lactobacilli bacteria then predominate (non-gas
> producers), along with streptococci and enterococci, converting the naturally occurring
> carbohydrates, for example, sugars of glucose, fructose and sucrose, to organic acids, for
> example lactic acid. Lactic acid content will be 1.5 to 2%, and pH will be 3.8 to 4.1 (mild
> tasting sauerkraut). »

> « After four or more weeks of fermentation, total acid content of up to 2.5% and pH decreases to
> a low of 3.4 occur (stronger, sharper sauerkraut). »

### La préparation du chou

> « Fresh cabbage (*Brassica oleracea*, many varieties used) is prepared by removing outer soil and
> trimming away damaged leaves. The whole cabbage may be fermented, or it may be cored and sliced
> or shredded. **Generally the cabbage is cored and chopped or sliced to 3 to 5 mm width.** »

> « Slicing releases and makes available the natural sugars in the cabbage that are rapidly
> digested by available bacteria. Following slicing and shredding it is important to add salt
> quickly to promote LAB growth and to create an anaerobic environment to begin the fermentation,
> otherwise spoilage bacteria may take hold. »

> « **Salt will promote release of water from the cabbage, so water is not usually added to the
> ferment.** The cabbage is pressed down, covered and must be submerged below the liquid to prevent
> spoilage (moulds) and to create an anaerobic environment for LAB fermentation. »

> « While sauerkraut fermentation is generally safe, **process experts all agree spoilage issues
> usually occur at the beginning of the process.** »

Diagramme :

> « Use potable water. **Sanitizer not recommended because it will kill natural LAB.** »

> « If more liquid needed, add 5% salt brine. »

> « Initial ferment should begin within 48 hrs. Observe formation of bubbles. »

### Le soulèvement du chou par le gaz — le piège du premier essai

> « Heaving — During initial fermentation (24 to 48 hr), carbon dioxide gas forms and pushes up
> cabbage, causing heaving. When CO2 is not removed or cannot escape (e.g., under the weight of
> plastic liner), cabbage may be pushed into aerobic environment allowing yeasts and moulds to
> grow. **Vent gas, and/or drain brine to lower cabbage.** »

> « Packing and filling is poor — If shredded cabbage is not pushed down enough, two issues occur.
> Air is left between the layers of cabbage and salting doesn't result in water release from
> cabbage. This will allow yeast and mould growth. »

> « Top of ferment container is not covered — When oxygen is not excluded, aerobic environments at
> the surface will allow growth of aerobic yeasts and moulds, causing spoilage. »

> « Fermentation is incomplete — Fresh sauerkraut is stored under refrigerated conditions. If it is
> not given enough time to completely ferment alcohol formation may result through the action of
> cold tolerant yeasts that convert remaining sugars. »

### Conservation et pasteurisation

> « **Fresh packed sauerkraut must be refrigerated**; pasteurized sauerkraut is suitable for room
> temperature storage. Pasteurization should be at least to temperatures of 70°C, with a
> recommended temperature of 74°C in hot brine, then hot-packed. »

> « The brine can be sourced from leftover sauerkraut juice or made with 2 to 3% salt. »

> « As these products have low pH and high acid, up to 2.25% from lactic and acetic acids,
> **boiling water methods are sufficient; pressure canning is unnecessary.** »

> « For sauerkraut sold fresh without pasteurization, operators are recommended to keep the product
> refrigerated after the fermentation period and to hold product for a minimum of two weeks once pH
> levels drop. »

> « Fermentation is progressive lasting from **7 days to several months**. »

### Éclosions

> « No foodborne illnesses or outbreaks were found linked to sauerkraut following reviews of the
> Publically Available International Foodborne Outbreak Database (conducted February 7, 2022). A
> second review of foodborne illness statistics in the Centers for Disease Control database in the
> U.S., found sauerkraut is rarely reported as a food vehicle in illnesses, and **to date no
> pathogens have been identified in sauerkraut**. »

> « No microbiological or chemical hazards were present in sauerkraut recalls. »

Les rappels retrouvés sont des dangers **physiques** — verre, métal, morceaux de tige — et un
rappel d'allergène. Le chapitre 77 s'en sert pour dire que le risque réel d'une choucroute bien
faite n'est pas microbiologique, et que le danger de ce chapitre est ailleurs.

---

## Ce que la page ne dit pas

1. **Elle ne donne pas la teneur en sodium d'une choucroute.** Elle vient du FCÉN, et le calcul
   du sodium d'une choucroute maison est fait par le livre à partir du pourcentage de sel et du
   facteur de conversion des ANREF. C'est de l'arithmétique déclarée, pas une valeur publiée.
2. **Elle ne donne pas la perte de vitamine C à la pasteurisation.** Elle donne une teneur (300 à
   700 mg/kg) sans dire si elle vaut avant ou après chauffage. La comparaison avec la conserve du
   FCÉN est une **inférence du livre**, marquée `[À VÉRIFIER]` au chapitre 77.
3. **Elle ne parle pas de fermentation au froid d'un chalet non chauffé.** Son plancher est 10 °C.
4. **La teneur « 300 à 700 mg/kg » n'a pas de référence primaire vérifiée dans ce dossier.** Elle
   porte l'appel de note 1 du document ; la référence n'a pas été remontée. Le chiffre est utilisé
   au chapitre 77 **avec sa source de second rang nommée**, et il est repris en section 10.
