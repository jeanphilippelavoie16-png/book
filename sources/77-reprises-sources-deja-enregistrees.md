# Chapitre 77 — Sources déjà au dossier, reprises et revérifiées

Ce fichier ne remplace pas les fiches originales : il déclare **quelles pages déjà enregistrées le
chapitre 77 cite**, quel extrait précis il en tire, et si la page répondait encore le 2026-09-20.
Le but est qu'un vérificateur n'ait pas à deviner d'où vient un chiffre repris d'un autre chapitre.

---

## 1. Québec.ca / MAPAQ — « Risques associés à la consommation de poisson et exigences »

- **URL :** https://www.quebec.ca/sante/alimentation/salubrite-aliments-prevention-risques/etablissements-alimentaires/precautions-aliments-dangereux/poisson
- **Fiche originale :** `sources/65-mapaq-poisson-botulisme-invisible.md` (aussi 12, 55, 61, 66, 68, 70, 71, 72)
- **Revérifiée le 2026-09-20 :** **oui, HTTP 200**, `WebFetch` de première main.

Extraits repris au chapitre 77 :

> « La bactérie *Clostridium botulinum* est répandue dans les milieux aquatiques. C'est pourquoi
> elle peut se trouver dans les poissons et les fruits de mer. »

> « Cette bactérie se développe uniquement en l'absence d'oxygène, par exemple dans un emballage
> sous vide. »

> « même si celui-ci est conservé au réfrigérateur et qu'il ne montre **aucun signe de
> détérioration** »

**Usage au chapitre 77 :** section 8. C'est la source québécoise, en français, de la règle du
tableau de `CLAUDE.md` selon laquelle le botulisme ne s'annonce pas, et c'est aussi celle qui
situe la bactérie dans le milieu d'où vient le poisson et le phoque du lecteur. Elle est citée mot
à mot ; reformulée, elle perd son tranchant.

---

## 2. Santé Canada — Document d'orientation sur le poisson fumé

- **URL :** https://www.canada.ca/fr/sante-canada/services/aliments-nutrition/legislation-lignes-directrices/documents-reference/poisson-fume.html
- **Fiche originale :** `sources/70-sante-canada-poisson-fume-botulisme-type-e.md` (aussi 01, 54, 61, 62, 64, 67, 68)
- **Revérifiée le 2026-09-20 :** non recaptée dans cette session. **Citée d'après la fiche au
  dossier, qui porte une captation de première main datée du 2026-09-20.**

Extrait repris :

> « une température d'entreposage gardée en deçà de **3 °C**, un pH inférieur à **5,0** ou une
> activité de l'eau inférieure à **0,97** »

**Usage au chapitre 77 :** section 8. C'est la source du 3 °C du tableau de `CLAUDE.md`. Le
chapitre l'emploie pour un point précis : le froid d'un réfrigérateur ordinaire, réglé à 4 °C,
**est au-dessus** de ce seuil.

**Recoupement utile et indépendant :** la section 3.5 du guide canadien sur les aliments fermentés
exige « 3.3°C or lower » pour un poisson fermenté sous emballage hermétique
(`sources/77-bccdc-ffwg-poisson-ferme-fesikh.md`), et l'article de l'*IJCH* donne « the minimum
growth temperature of *C. botulinum* type E (3°C) »
(`sources/77-ijch-botulinum-type-e-viande-de-phoque.md`). **Trois sources indépendantes, le même
seuil.** C'est le chiffre le mieux établi du chapitre.

---

## 3. Santé Canada — ANREF, valeurs de référence relatives aux vitamines (vitamine C)

- **URL :** https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/reference-values-vitamins.html
- **Fiche originale :** `sources/25-sante-canada-anref-vitamine-c.md` (aussi 12, 26)
- **Revérifiée le 2026-09-20 :** non recaptée. Citée d'après la fiche au dossier.

Valeurs reprises (ANR, mg/jour) : **1 à 3 ans 15 · 4 à 8 ans 25 · femmes 19 ans et plus 75 ·
hommes 19 ans et plus 90**. AMT : 1 à 3 ans 400 · 4 à 8 ans 650 · adulte 2 000.

**Réserve héritée, à répéter :** la fiche du chapitre 25 note que **la version française mot à mot
du tableau ANREF n'a pas été extraite**. Le chapitre 77 hérite de cette réserve. Elle est reprise
en section 10.

---

## 4. Santé Canada — ANREF, sodium : apport suffisant, AMT et facteur de conversion

- **URL du PDF :** https://www.canada.ca/content/dam/hc-sc/migration/hc-sc/fn-an/alt_formats/hpfb-dgpsa/pdf/nutrition/dri_tables-fra.pdf
- **Fiche originale :** `sources/62-sante-canada-anref-sodium-et-sel.md`
- **Revérifiée le 2026-09-20 :** non recaptée. Citée d'après la fiche au dossier, qui porte une
  captation de première main en **version française officielle** (« RÉVISÉ NOVEMBRE 2010 »),
  recoupée avec la captation indépendante du chapitre 26.

Extraits repris :

> « 1 g sodium = 2,53 g de sel de table »

> « Grammes de sodium × 2,53 = grammes de sel de table. »

Valeurs reprises (mg/jour) : AS **1 500** de 9 à 50 ans, 1 200 de 4 à 8 ans, 1 000 de 1 à 3 ans ;
AMT **2 300** de 14 à 50 ans, 2 200 de 9 à 13 ans, **1 900 de 4 à 8 ans**, **1 500 de 1 à 3 ans**.

**Usage au chapitre 77 :** sections 3, 5 et 6. C'est ce facteur qui transforme un pourcentage de
sel en charge de sodium, et c'est ce calcul qui plafonne la ration quotidienne de choucroute — la
conclusion la moins intuitive du chapitre.

---

## 5. ACIA — Trichinellose

- **Fiches originales :** `sources/01-acia-trichinose.md`, `sources/05-acia-trichinose.md`
- **Revérifiée le 2026-09-20 :** non recaptée.

**Usage au chapitre 77 :** section 8, un seul point. Le chapitre affirme que **la fermentation ne
détruit pas *Trichinella***, comme ne le font ni le sel, ni le fumage, ni le gel domestique. Cette
affirmation est une **extension** de la règle du tableau de `CLAUDE.md` à un procédé qui n'y est
pas nommé. Elle est logiquement fondée — le mécanisme de la fermentation est l'acidification, pas
la chaleur, et la règle existante dit que trois autres barrières non thermiques échouent — mais
**aucune source consultée ne nomme explicitement la fermentation**. Elle est donc portée au
chapitre 77 comme telle et reprise en section 10 comme point à faire trancher par le vérificateur
sécurité.

---

## 6. Chapitre 25 — thuya occidental et thuyone

- **Fiche originale :** voir `chapitres/25-le-scorbut-et-l-arbre-de-vie.md`, section 8, et les
  fiches sources du chapitre 25.
- **État hérité :** la fiche du chapitre 25 déclare qu'**aucune source officielle canadienne sur la
  thuyone n'a été trouvée** ; le mécanisme convulsivant est établi d'après le rapport TR-570 du
  National Toxicology Program américain, en doses animales en mg/kg qui **ne se convertissent pas
  en tasses**.

**Usage au chapitre 77 :** la règle est **répétée avec son mécanisme**, sans aucun chiffre de
thuyone, et le renvoi au chapitre 25 est explicite. Le chapitre 77 nomme le sapin baumier
(*Abies balsamea*) et les épinettes (*Picea mariana*, *Picea glauca*) comme la voie de la vitamine
C ligneuse, et le thuya occidental (*Thuja occidentalis*) comme l'arbre qu'on ne met pas dans une
tasse.
